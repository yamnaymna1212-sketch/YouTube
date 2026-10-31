# Video source — Case File 001 (35s test)

1. `tts.py` — narration with Piper TTS (voice `en_US-ryan-high` from rhasspy/piper-voices, put in `voices/`).
2. `audio.py` — sound design (boom, crack, tock, tick, chime, riser, choir, drone), echo on last words, reverb, mix → `mix.wav`.
3. `anim.html` — the whole animation (chess board with 3D camera, pieces, threads, captions). `window.renderAt(t)` draws second `t`.
4. `render.js` — renders 1050 frames (30 fps) with Playwright: `node render.js <worker> <workers>`.
5. Encode: `ffmpeg -framerate 30 -i frames/%05d.jpg -i mix.wav -af loudnorm=I=-14:TP=-1.5 -c:v libx264 -crf 22 -pix_fmt yuv420p -c:a aac out.mp4`

Fonts (Cormorant Garamond, Inter) go in `fonts/` next to `anim.html`.
