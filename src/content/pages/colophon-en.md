---
title: 'Colophon'
description: 'Astro with the Node adapter, Caddy as a reverse proxy, and systemd on a self-hosted server — the full setup.'
lang: 'en'
---

achis.blog runs on a self-hosted VPS. No managed hosting, no Vercel, no Netlify — instead a server, a reverse proxy, and a systemd service. Here's how it all fits together.

## Stack

- **Astro** with `@astrojs/node` in `standalone` mode as the SSR server
- **Caddy** as reverse proxy (automatic HTTPS via Let's Encrypt)
- **systemd** to manage the Node process
- **rsync + npm** as the deploy mechanism

## Astro: Node Adapter

In `standalone` mode, Astro builds its own HTTP server that can be started directly with Node:

```js
// astro.config.mjs
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://achis.blog',
  adapter: node({ mode: 'standalone' }),
});
```

After `astro build`, the server lives at `dist/server/entry.mjs`.

## systemd Service

The Node process runs as a systemd service that restarts automatically on a crash:

```ini
[Unit]
Description=achis.blog Astro Node server
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/opt/achis-blog
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=127.0.0.1
Environment=SITE_ORIGIN=https://achis.blog
ExecStart=/usr/bin/node ./dist/server/entry.mjs
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`HOST=127.0.0.1` ensures the Node server is only reachable locally — Caddy is the only thing exposed externally.

## Caddy as Reverse Proxy

Caddy handles TLS and forwards requests to the local Node server. `www` permanently redirects to the apex domain:

```caddy
www.achis.blog {
    redir https://achis.blog{uri} permanent
}

achis.blog {
    reverse_proxy 127.0.0.1:3000
}
```

Caddy fetches the TLS certificate automatically from Let's Encrypt — no manual certificate management needed.

## Deploy Script

A simple shell script builds locally, syncs the output to the server, and restarts the service:

```bash
#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="yaksha"
REMOTE_DIR="/opt/achis-blog"
SERVICE="achis-blog"

cd "$(dirname "$0")/.."

echo "==> Building..."
npm run build

echo "==> Syncing dist/, package.json, package-lock.json..."
rsync -az --delete dist/ "$REMOTE_HOST:$REMOTE_DIR/dist/"
rsync -az package.json package-lock.json "$REMOTE_HOST:$REMOTE_DIR/"

echo "==> Installing production deps and restarting service..."
ssh "$REMOTE_HOST" "cd $REMOTE_DIR && npm ci --omit=dev && sudo systemctl restart $SERVICE"

echo "==> Done."
```

The build happens locally — only the finished `dist/` plus `package.json` is copied to the server. `npm ci --omit=dev` installs only the production dependencies there.

## End-to-end Flow

1. Run `bash scripts/deploy.sh` locally
2. Astro builds `dist/`
3. rsync transfers `dist/`, `package.json`, `package-lock.json`
4. `npm ci --omit=dev` on the server
5. `systemctl restart achis-blog` restarts the Node process
6. Caddy immediately routes new requests to the fresh process
