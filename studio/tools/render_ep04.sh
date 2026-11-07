#!/bin/bash
# Render EP04 parts one after another (no GPU: ~5-7 min each). Usage: tools/render_ep04.sh Hook Part02 Part03 ...
cd "$(dirname "$0")/.."
OUT=${OUT:-/home/user/YouTube/episodes/ep04-congress/renders/parts}
mkdir -p $OUT
while pgrep -f "remotion render src/index.ts EP04" >/dev/null; do sleep 15; done
for n in "$@"; do
  id="EP04$n"
  echo "== $id $(date +%T)"
  npx remotion render src/index.ts $id $OUT/$id.mp4 --browser-executable=/opt/pw-browsers/chromium --concurrency=4 > $OUT/$id.log 2>&1; tail -c 120 $OUT/$id.log | tr '\r' '\n' | tail -1
  echo "== done $id $(date +%T)"
done
