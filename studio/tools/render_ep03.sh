#!/bin/bash
# Render EP03 parts one after another (no GPU: each part takes ~20 min). Usage: tools/render_ep03.sh 3 4 5 ...
cd "$(dirname "$0")/.."
OUT=/tmp/claude-0/ep03
mkdir -p $OUT
while pgrep -f "remotion render src/index.ts EP03Part" >/dev/null; do sleep 15; done
for n in "$@"; do
  id=$(printf "EP03Part%02d" $n)
  echo "== $id $(date +%T)"
  npx remotion render src/index.ts $id $OUT/$id.mp4 --browser-executable=/opt/pw-browsers/chromium --concurrency=4 > $OUT/$id.log 2>&1; tail -2 $OUT/$id.log
  echo "== done $id $(date +%T)"
done
