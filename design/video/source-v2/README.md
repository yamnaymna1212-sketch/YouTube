# Case File 001 — v2 (the published Short)

Rebuild the video from scratch:

```bash
# 0) fonts: put Cormorant Garamond (corm-1..4.ttf) and Inter (inter-1..4.ttf) in ../fonts/
#    (Google Fonts, OFL). See HANDOFF.md for the exact files.
pip install piper-tts numpy scipy            # + Playwright (node) and ffmpeg
# voice: download en_US-ryan-high.onnx(+.json) from rhasspy/piper-voices (huggingface) to voices/
python3 tts2.py 1.1 0.12      # narration -> l1..l13.wav + timing.js  (speed 1.1, gap 0.12s)
python3 audio2.py             # sound design + clean voice -> mix2.wav
node render2.js 0 4 & node render2.js 1 4 & node render2.js 2 4 & node render2.js 3 4 ; wait   # 1005 frames -> frames/
ffmpeg -framerate 30 -i frames/%05d.jpg -i mix2.wav -vf format=yuv420p \
  -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v libx264 -preset slow -crf 21 -c:a aac -b:a 192k -t 33.5 out.mp4
```

- `anim2.html` — the whole animation. `window.renderAt(t)` draws second `t`. Characters, icons, camera spline and captions are all here. Timing comes from `timing.js` (narration), so changing the script re-times everything automatically.
- To make Case File 002: edit the `LINES` in `tts2.py`, then change the story beats / icons / texts in `anim2.html` (search the word triggers like `w('l7','borrowed')`) and the SFX list in `audio2.py`.
- `preview-frames.js` + `sheet.sh` = quick check of a few frames (`node preview-frames.js 1.2 5 12`).
