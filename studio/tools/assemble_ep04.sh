#!/bin/bash
# Join EP04 parts into one preview. Without VO: music only. With VO: rerun after re-timing (tools/ep04_est.py --words ...)
# and add the two-pass loudnorm from assemble_ep03.sh.
cd "$(dirname "$0")/.."
P=/home/user/YouTube/episodes/ep04-congress/renders/parts
OUT=/home/user/YouTube/episodes/ep04-congress/renders
LIST=$(mktemp)
for n in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do echo "file '$P/EP04$n.mp4'" >> $LIST; done
ffmpeg -v error -y -f concat -safe 0 -i $LIST -c copy $OUT/ep04-full-v1-novo.mp4
ffmpeg -v error -y -i $OUT/ep04-full-v1-novo.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k $OUT/ep04-full-v1-novo-preview720.mp4
rm -f $LIST
ls -la $OUT/ep04-full-v1-novo*.mp4
