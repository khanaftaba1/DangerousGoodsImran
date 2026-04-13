#!/usr/bin/env bash
# Start backend + frontend. Frees stale listeners on 3000/5000 (Linux: fuser).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if command -v fuser >/dev/null 2>&1; then
  fuser -k 3000/tcp 2>/dev/null || true
  fuser -k 5000/tcp 2>/dev/null || true
  sleep 1
fi

exec npx concurrently -k -n backend,frontend -c blue,green \
  "npm run dev --prefix backend" \
  "npm run dev --prefix frontend"
