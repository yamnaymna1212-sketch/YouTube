#!/bin/bash
# One command on a Mac: renders every EP04 part and joins them into one video at YouTube loudness.
# Usage (inside the YouTube folder):   bash studio/tools/render_mac.sh
set -e
cd "$(dirname "$0")/.."
git pull || true
npm ci
OUT=../episodes/ep04-congress/renders
mkdir -p $OUT/parts
for p in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do
  echo "== rendering EP04$p"
  npx remotion render src/index.ts EP04$p $OUT/parts/EP04$p.mp4
done
for p in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do echo "file 'parts/EP04$p.mp4'"; done > $OUT/list.txt
cd $OUT
npx --prefix ../../../studio remotion ffmpeg -y -f concat -safe 0 -i list.txt -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k ep04-full.mp4
rm list.txt
echo "DONE: episodes/ep04-congress/renders/ep04-full.mp4"
open . 2>/dev/null || true
