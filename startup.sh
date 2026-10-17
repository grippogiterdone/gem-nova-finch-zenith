#!/bin/sh
# Revive the Waystone preview. Idempotent: exit if the dev server is already up.
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev > /tmp/waystone-dev.log 2>&1 &
