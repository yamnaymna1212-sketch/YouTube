#!/bin/bash
# usage: sheet.sh out.jpg cols files...
out=$1; cols=$2; shift 2
n=$#; inputs=(); fc=""; i=0
for f in "$@"; do inputs+=(-i "$f"); fc+="[$i]scale=360:-1[a$i];"; i=$((i+1)); done
rows=$(( (n+cols-1)/cols ))
lab=""; r=0
for ((r=0;r<rows;r++)); do
  row=""; cnt=0
  for ((c=0;c<cols;c++)); do idx=$((r*cols+c)); if [ $idx -lt $n ]; then row+="[a$idx]"; cnt=$((cnt+1)); fi; done
  fc+="${row}hstack=${cnt},pad=$((cols*360)):640[r$r];"
done
stack=""; for ((r=0;r<rows;r++)); do stack+="[r$r]"; done
if [ $rows -gt 1 ]; then fc+="${stack}vstack=${rows}"; else fc="${fc%;}"; fi
ffmpeg -v error -y "${inputs[@]}" -filter_complex "$fc" "$out"
