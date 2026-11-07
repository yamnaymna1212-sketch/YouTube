#!/bin/bash
# One command on a Mac (Apple Silicon M1/M2/M3): renders every EP04 part and joins them into one video at YouTube loudness.
# Output goes to ~/Desktop/Dollarly-EP04/ (outside the repo, so `git pull` never conflicts).
# Usage (inside the YouTube folder):   bash studio/tools/render_mac.sh
set -e
cd "$(dirname "$0")/.."
git pull || true
npm ci
OUT="$HOME/Desktop/Dollarly-EP04"
mkdir -p "$OUT/parts"
START=$(date +%s)
for p in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do
  echo "== rendering EP04$p  ($(date +%H:%M))"
  npx remotion render src/index.ts EP04$p "$OUT/parts/EP04$p.mp4" --concurrency=75%
done
for p in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do echo "file '$OUT/parts/EP04$p.mp4'"; done > "$OUT/list.txt"
npx remotion ffmpeg -y -f concat -safe 0 -i "$OUT/list.txt" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k "$OUT/ep04-full.mp4"
rm "$OUT/list.txt"
echo "DONE in $(( ($(date +%s) - START) / 60 )) min: $OUT/ep04-full.mp4"
open "$OUT"
