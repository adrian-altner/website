#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="yaksha"
REMOTE_DIR="/opt/achis-blog"
SERVICE="achis-blog"

cd "$(dirname "$0")/.."

echo "==> Building..."
npm run build

echo "==> Syncing dist/, package.json, package-lock.json..."
rsync -az --delete \
  dist/ "$REMOTE_HOST:$REMOTE_DIR/dist/"
rsync -az \
  package.json package-lock.json "$REMOTE_HOST:$REMOTE_DIR/"

echo "==> Installing production deps and restarting service..."
ssh "$REMOTE_HOST" "cd $REMOTE_DIR && npm ci --omit=dev && sudo systemctl restart $SERVICE"

echo "==> Done."
