# How to make an episode (full production manual)

Everything needed to make a new Short in the exact same style is in this repo. Read `CLAUDE.md` (rules), `STORY_BIBLE.md` (what already happened) and `style/glow-style-bible.md` (how it looks) first.

## 1. The pipeline in one picture

```
story beats (script.md)
   -> voice lines  (brand/source/tts.py)         -> audio/*.mp3 + *.words.json (word timings)
   -> scene renderer (brand/source/epNN.js)      -> SVG frames drawn by headless Chromium, 30 fps
   -> sound mix (brand/source/mix.py)            -> narrator + effects, effects ~12 dB under the voice
   -> ffmpeg                                     -> episodes/<name>/<name>.mp4 (1080x1920, H.264 + AAC)
   -> checks (length 30-40 s, loudness, frame strip)
   -> title + TikTok caption/hashtags + publish
```

There is no video editor, no stock footage and no image model. Every frame is code, which is why every episode looks identical in style and costs almost nothing.

## 2. Tools and versions (this is what worked)

| Tool | Version | Used for |
|------|---------|----------|
| Node.js | 22 | scene renderers (`*.js`) |
| Playwright + Chromium | 1.63 (pre-installed; `require('playwright')` works from any folder) | renders each SVG frame to PNG |
| Python | 3.13 | `tts.py`, `mix.py`, `hook_audio.py` |
| `edge-tts` | 7.3.1 (`pip install -r brand/source/requirements.txt`) | voices + word timings (needs internet) |
| `numpy` | 2.x | synthesized sound effects, mixing |
| FFmpeg | 6.1 | encode video, mix check, contact sheets |
| Fonts | Inter, Caladea (serif), JetBrains Mono, Noto Color Emoji | captions, props, emoji (all present in the container image; check with `fc-list`) |

First thing in a new session: `node -v; ffmpeg -version | head -1; python3 -c "import edge_tts, numpy"; fc-list | grep -c Inter` and `pip install -r brand/source/requirements.txt` if `edge_tts` is missing.

## 3. Files in `brand/source/`

| File | What it does |
|------|--------------|
| `glow.js` | The characters. `character(key, x, feetY, scale, opts)` draws a glowing stickman with a face. Cast: kai, rosa, mint, gold, brooke, gray. `opts`: `pose`, `face` (happy, tired, shocked, determined, thinking, sad, crying, hopeful, firm, asleep), `glow`, `color`, `droop`, `speed`, `dir`. Also `walkPose`, `runPose`, `STAND`. |
| `world.js` | The Blueprint Neon world: palette `P`, `svgDoc()` (navy grid background + vignette), the street (home, gas station, market, burgers, bank), `PROPS` (phone, alarm clock, wall clock, card, receipt, pump display, calendar, bill, balance, fuel gauge), `AMERICANA` (flag, bills, coins, paycheck, burger, coffee, keys), LED digits `led()`. Running it directly re-renders the world stills and the street motion test. |
| `ep01.js` | Shared scene helpers (`line`, `neon`, `soft`, `blur`, `bedroom`, `phoneBody`, `PINK`, ...) + the Episode 1 storyboard frames. |
| `hook.js`, `hook_audio.py` | The Episode 1 hook (ringing phone, zoom on the phone only). |
| `ep01_full.js` | Part 1 renderer (30.6 s). Older structure. |
| **`ep02.js`** | **Part 2 renderer (31.2 s). Use this as the template for new episodes.** |
| `mix.py` | Audio mixer. Reads a timeline JSON (voices + effects), outputs one WAV. |
| `tts.py` | Voice lines to mp3 + word timings, with retries and proxy support. |
| `avatar.js` | Profile pictures. |
| `build.js` | v1 brand art (archived). |

## 4. Making a new episode, step by step

1. **Write the beats** in `episodes/<name>/script.md`: a table of time, picture, voice line, sound, caption. Rules: 30, 35 or 40 s max; hook = contradiction + problem (no "how/why"); story, not advice; money is the hidden problem; end with a cliffhanger and the funny follow/share line.
2. **Generate the voice lines** (one clip per line, so timings are exact):
   ```bash
   cd brand/source
   python3 tts.py en-US-AndrewNeural "+8%" ../../episodes/<name>/audio/hook.mp3 ../../episodes/<name>/audio/hook.words.json "At 5 AM, the door bangs."
   ```
   Voices used: narrator **en-US-AndrewNeural** (rate +6% to +10%), Brooke **en-US-AvaNeural** (rate -4% to +4%). Kai's own lines use Andrew at +0%. Short ID check: `ffprobe -v error -show_entries format=duration -of csv=p=0 file.mp3`.
3. **Copy the template:** `cp brand/source/ep02.js brand/source/ep03.js`. Edit:
   - the `clip('name', lead, tail)` lines (they chain the voice clips back to back; `lead`/`tail` add dramatic beats),
   - the `SCENES` array (one drawing function per scene; each gets `t` seconds, `u` seconds into the scene, `d` scene length),
   - `timeline()` (which sound effects happen at which times),
   - the output file name at the bottom.
4. **Preview stills (always before the full render):**
   ```bash
   TIMES=0,1.2,1.5,2.0 node brand/source/ep03.js episodes/<name> --test /some/output/dir
   ```
   This prints every scene end time and the total duration, and saves `p0.png, p1.png, ...`. Build a contact strip with ffmpeg `hstack` and look at it. **Show the owner the hook image(s) and wait for approval before rendering.**
5. **Full render in the background** (about 8-9 minutes for 30 s, 900 frames): run `node brand/source/ep03.js episodes/<name>` with `run_in_background`, and you are notified when it ends. (Foreground `sleep` is blocked in this harness; use background runs or `until <check>; do sleep 5; done`.)
6. **Verify:** `ffprobe` duration is 30-40 s (the script throws above 40), `ffmpeg -af volumedetect` (mean about -18 dB, max about -0.7 dB), and a contact strip from the final mp4 (`select='eq(n,25)+eq(n,50)...'` + `tile`).
7. **Commit and push** (including the mp4 and the audio folder), then send the owner the video **plus title, TikTok caption and hashtags** (rule 13 in `CLAUDE.md`), and save them in the episode's `script.md`.
8. **Publish** (section 7) only when the owner asks.

## 5. Sound effects available in `mix.py` (all synthesized, no copyrighted sounds)

`ring(s,e)` urgent digital ring · `vib(s,e,gain)` phone vibrating on wood · `whoosh(s,d)` · `hit(s,f0)` bass hit · `click(s)` · `beat(s)` heartbeat · `rain(s,e)` · `crash(s)` phone hitting a wall · `text_tone(s)` · `knock(s)` · `bang(s)` heavy fist on a door · `slide(s,d)` paper sliding · `drone(s,e,gain,root)` low tension · `pad(s,e)` dreamy flashback pad.
Add a new one: write a function returning an array the length of `t`, register it in the `FX` dict.
Mix law: the voice always leads. Effects are normalized to about 25% of the voice level (about -12 dB) and duck another 60% while someone speaks.
Voice filters used in `timeline()`: crying through a door = `vibrato=f=5.5:d=0.18,tremolo=f=5:d=0.2,highpass=f=140,lowpass=f=2400`.

## 6. Visual rules (details in `style/glow-style-bible.md`)

- 1080x1920, ground line at y=1450 in street scenes, text inside the Shorts safe zones.
- Navy blueprint background with a grid, one neon color per place, Kai (blue) is always the brightest thing.
- Captions: Inter Black, ALL CAPS, white with black outline at y=470, one short group at a time, each word pops in when spoken, key words colored (money green, danger red, Brooke pink).
- **Hook:** white title card in the first 3 seconds, voice starts at 0:00, first sound effect on the hook's key word, zoom only the main object.
- **End card:** "+ FOLLOW" pill gets tapped, then a share icon with a joke about the story, synced to the closing voice line.
- Never real brand logos; money drawn as neon line art, not copies of real bills.

## 7. Publishing

- **YouTube** (done through the Metricool connector when its tools are available): call `getBrandSettings` to get the brand id and time zone, then `createScheduledPost` with `providers: [{network: "youtube"}]`, `youtubeData: {type: "short", privacy: "public", madeForKids: false, isAiGeneratedContent: false, title, tags, category: "FILM_ANIMATION"}`, a description with hashtags, and `firstCommentText`. The media must be a **public URL**: the pushed file works through `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<path>.mp4` because this repo is public. `publicationDate` uses the brand's time zone. The date cannot be in the past. Owner's pattern: two videos a day, **6 PM and 10 PM Tunisia time** (Africa/Tunis).
- **TikTok:** not connected to Metricool; the owner uploads manually. Give them the caption and hashtags (`brand/tiktok/hashtags.md`).
- Posted videos and links: `POSTED.md`.
- Do not write personal data (emails, account ids) into this public repo.

## 8. Gotchas we hit

- `tts.py` sometimes prints "No audio was received": it retries by itself; if all 6 fail, run again.
- Behind the session proxy, `edge-tts` fails TLS unless it trusts `/root/.ccr/ca-bundle.crt` (already handled in `tts.py`).
- `rm -f $VAR/*.png` is blocked by the safety check; use a literal path or `"${VAR:?}"/...`.
- Inline word timings drive captions: if you change a voice line, regenerate its `words.json` and re-run the test strip.
- The phone, door and panels are drawn in local coordinates then scaled; if something looks tiny in a 9:16 frame, scale the group, not the numbers inside it.
- One render of a 30 s episode produces about 900 PNG frames in a temp folder, deleted at the end.
