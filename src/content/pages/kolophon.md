---
title: 'Kolophon'
description: 'Astro als statische Seite, ausgeliefert über GitHub Pages — die komplette Konfiguration.'
---

achis.blog wird als statische Seite gebaut und über GitHub Pages ausgeliefert. Kein eigener Server, kein Reverse Proxy, kein systemd-Service — der Build läuft komplett in GitHub Actions.

## Stack

- **Astro** im statischen Output-Modus
- **GitHub Actions** baut die Seite bei jedem Push auf `main`
- **GitHub Pages** liefert das Ergebnis aus, inklusive Custom Domain und automatischem HTTPS-Zertifikat

## Deploy-Workflow

Der Workflow baut die Seite mit `withastro/action` und veröffentlicht das Ergebnis über die offiziellen GitHub-Pages-Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 22
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

## Custom Domain

Eine `CNAME`-Datei in `public/` sorgt dafür, dass GitHub Pages die Seite unter `achis.blog` statt der `github.io`-Subdomain ausliefert. DNS zeigt per A-Records auf die GitHub-Pages-IPs, das SSL-Zertifikat stellt GitHub automatisch über Let's Encrypt aus.

## Ablauf von vorne bis hinten

1. Push auf `main`
2. GitHub Actions baut `dist/` mit `astro build`
3. `actions/deploy-pages` veröffentlicht `dist/` auf GitHub Pages
4. Die Seite ist innerhalb weniger Minuten unter achis.blog aktualisiert
