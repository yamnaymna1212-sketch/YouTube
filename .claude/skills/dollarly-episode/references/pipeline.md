# Dollarly pipeline — commands

All paths from the repo root. Server-only flags in [brackets].

## Scaffold
`bash .claude/skills/dollarly-episode/scripts/new_episode.sh ep05 my-slug` → `episodes/ep05-my-slug/` (templates) + `studio/src/ep05/` (EP04 kit copied, paths renamed) + `studio/public/ep05/{footage,real,vo,audio}`.

## Real material (cloud server)
- archive.org works: `https://archive.org/advancedsearch.php?q=...&output=json`, files via `/metadata/<id>`, download `/download/<id>/<file>`. Prefer explicit public-domain licences (Prelinger collection).
- Cut on the film's own shot boundaries: `ffmpeg -ss A -t D -i film.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null -` (use `-hide_banner`, not `-v error`, or showinfo prints nothing), then `-ss start -to end -an -vf scale=960:720` → `studio/public/epNN/footage/`.
- whitehouse.gov official portraits (US gov work). Wikimedia/loc.gov are blocked from the server.

## VO (default: local Kokoro)
```
python3.12 -m venv /tmp/tts && . /tmp/tts/bin/activate
pip install torch --index-url https://download.pytorch.org/whl/cpu && pip install kokoro soundfile
cd studio && python tools/dollarly_tts.py --episode ../episodes/epNN-slug --code src/epNN --vo public/epNN/vo --gap-after 4:1.25,9:0.6
ffmpeg -i public/epNN/vo/vo_raw.wav -af "aresample=48000:resampler=soxr,highpass=f=70,deesser=i=0.3,acompressor=threshold=-22dB:ratio=2.5:attack=6:release=110:makeup=2,loudnorm=I=-15:TP=-1.5:LRA=7" -b:a 256k public/epNN/vo/vo_epNN.mp3
```
Voices tested: am_michael (default), am_fenrir, am_puck, am_onyx. ~3 min for 9 min of audio on 4 CPUs. Python 3.13 fails (spacy) → use 3.12.
User's own ElevenLabs take instead: `VO_DIR=public/epNN/vo python3 -I tools/tighten_vo.py vo_full` → faster-whisper words → `tools/ep04_est.py --words` pattern.

## Timing
`src/epNN/t.ts`: `paraT(i)`, `paraEnd(i)`, `wordT(i, 'word', nth)` read `cues.json`. Before a VO exists, `tools/ep04_est.py` writes an estimate (3 words/s). Watch out: `wordT` matches substrings (`'no'` also hits "now"; use the nth argument or a neighbouring word).

## Stills check (before every full render)
`cd studio && OUT_DIR=/some/dir node tools/render_stills.mjs EP05Part03:300 EP05Part03:900` [server: uses /opt/pw-browsers/chromium inside]

## Render
- Mac M3 (default): `bash studio/tools/render_mac.sh` (make an epNN copy) → `~/Desktop/Dollarly-EPNN/`.
- Any machine: `cd studio && tools/render_episode.sh EP05 ../episodes/ep05-slug Hook Part02 Part03 …` [`BROWSER=/opt/pw-browsers/chromium`; run detached: `setsid nohup bash -c "…" &`].
- Server speed: ≈ 6–7 min per minute of video (no GPU). Sound-only fix: `npx remotion render … --codec=wav` per part (~1.5 min) + `ffmpeg -i part.mp4 -i part.wav -map 0:v -map 1:a -c:v copy -c:a aac` .

## Music
Model: `studio/tools/synth_ep04.py` (numpy, no samples, no licence): drone + 20 s minor pads + high shimmer + rare bells + wide reverb, one take as long as the episode. Change key/chords per episode.
