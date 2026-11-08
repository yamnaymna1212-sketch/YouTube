#!/bin/bash
# One command on a Mac (Apple Silicon): renders every EP06 part and joins them into one video at YouTube loudness.
# Output: ~/Desktop/Dollarly-EP06/ep06-full.mp4 (outside the repo, so `git pull` never conflicts).
# Usage (inside the repo folder):   bash studio/tools/render_mac_ep05.sh
# Optional: render only some parts again, e.g.  bash studio/tools/render_mac_ep05.sh Part03 Part07   (then it re-joins all parts)
set -e
cd "$(dirname "$0")/.."
# (no git pull: renders the working tree as is)
# a private npm cache avoids the "EACCES … ~/.npm/_cacache" error when ~/.npm has root-owned files
[ -d node_modules/remotion ] || npm ci --cache "$HOME/.dollarly-npm-cache"
OUT="$HOME/Desktop/Dollarly-EP06"
mkdir -p "$OUT/parts"
ALL="Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09 Part10"
PARTS="${*:-$ALL}"
START=$(date +%s)
for p in $PARTS; do
  echo "== rendering EP06$p  ($(date +%H:%M))"
  npx remotion render src/index.ts EP06$p "$OUT/parts/EP06$p.mp4" --concurrency=6 --log=error
done
for p in $ALL; do echo "file '$OUT/parts/EP06$p.mp4'"; done > "$OUT/list.txt"
npx remotion ffmpeg -y -f concat -safe 0 -i "$OUT/list.txt" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k "$OUT/ep06-full.mp4"
rm "$OUT/list.txt"
echo "DONE in $(( ($(date +%s) - START) / 60 )) min: $OUT/ep06-full.mp4"
open "$OUT" 2>/dev/null || true
