#!/bin/bash
# Render any Dollarly episode's parts one after another, then join them at YouTube loudness (-14 LUFS).
# Usage (from studio/):  tools/render_episode.sh EP05 ../episodes/ep05-slug Hook Part02 Part03 ...
# On the cloud server add: BROWSER=/opt/pw-browsers/chromium   (a Mac/PC needs nothing)
set -e
cd "$(dirname "$0")/.."
ID=$1; EP=$2; shift 2
OUT=$EP/renders; mkdir -p $OUT/parts
BX=${BROWSER:+--browser-executable=$BROWSER}
for p in "$@"; do
  echo "== $ID$p $(date +%T)"
  npx remotion render src/index.ts $ID$p $OUT/parts/$ID$p.mp4 $BX --concurrency=${CONC:-75%} > $OUT/parts/$ID$p.log 2>&1
  tail -c 120 $OUT/parts/$ID$p.log | tr '\r' '\n' | tail -1
done
L=$OUT/list.txt; : > $L
for p in "$@"; do echo "file '$(cd $OUT/parts && pwd)/$ID$p.mp4'" >> $L; done
npx remotion ffmpeg -v error -y -f concat -safe 0 -i $L -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k $OUT/full.mp4
npx remotion ffmpeg -v error -y -i $OUT/full.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k $OUT/full-preview720.mp4
rm -f $L; echo "DONE $OUT/full.mp4"
