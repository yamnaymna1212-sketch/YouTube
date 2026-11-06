#!/bin/bash
# Join EP03 parts 1..10 into one episode, normalise loudness to YouTube level (-14 LUFS, TP -1.5 dB).
set -e
IN=/tmp/claude-0/ep03
OUT=/home/user/YouTube/episodes/ep03-iran/renders
mkdir -p $OUT
: > $IN/list.txt
for n in 01 02 03 04 05 06 07 08 09 10; do echo "file '$IN/EP03Part$n.mp4'" >> $IN/list.txt; done
ffmpeg -loglevel error -y -f concat -safe 0 -i $IN/list.txt -c copy $IN/ep03-joined.mp4
# two-pass loudnorm
J=$(ffmpeg -hide_banner -i $IN/ep03-joined.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
mi=$(echo "$J" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['input_i'],d['input_tp'],d['input_lra'],d['input_thresh'],d['target_offset'])")
read I TP LRA TH OFF <<< "$mi"
ffmpeg -loglevel error -y -i $IN/ep03-joined.mp4 -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$I:measured_TP=$TP:measured_LRA=$LRA:measured_thresh=$TH:offset=$OFF:linear=true" \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart $OUT/ep03-full-v1.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT/ep03-full-v1.mp4
ls -la $OUT/ep03-full-v1.mp4
# small preview for the repo (GitHub 100 MB file limit): 720p, ~1.1 Mbps
ffmpeg -loglevel error -y -i $OUT/ep03-full-v1.mp4 -vf scale=1280:-2 -c:v libx264 -b:v 1000k -maxrate 1200k -bufsize 2400k -preset medium -c:a aac -b:a 96k -movflags +faststart $OUT/ep03-full-v1-preview720.mp4
ls -la $OUT/ep03-full-v1-preview720.mp4
