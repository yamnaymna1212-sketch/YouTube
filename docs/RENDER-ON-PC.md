# Render Dollarly episodes on your own PC (Windows / Mac)

Your PC is usually 3–10× faster than the cloud server (no GPU there). Same code, same result.

## 1 · One-time setup
1. Install **Node.js 20 LTS** (nodejs.org) and **Git** (git-scm.com).
2. Open PowerShell (Windows) or Terminal (Mac) and run:
```
git clone https://github.com/yamnaymna1212-sketch/YouTube.git
cd YouTube
git checkout claude/wizardly-fermi-6y2fgr
cd studio
npm ci
```
Remotion downloads its own headless Chrome and FFmpeg the first time you render. Nothing else to install.

## 2 · Every time (get the latest work)
```
cd YouTube
git pull
cd studio
npm ci
```

## 3 · Preview in the browser (optional)
```
npm run studio
```
Opens Remotion Studio at http://localhost:3000. Pick `EP04Hook`, `EP04Part02` … `EP04Part09` and scrub.

## 4 · Render the parts
One part:
```
npx remotion render src/index.ts EP04Part02 ../episodes/ep04-congress/renders/parts/EP04Part02.mp4
```
All parts, PowerShell (Windows):
```
foreach ($p in "Hook","Part02","Part03","Part04","Part05","Part06","Part07","Part08","Part09") { npx remotion render src/index.ts "EP04$p" "../episodes/ep04-congress/renders/parts/EP04$p.mp4" }
```
All parts, Mac / Linux:
```
for p in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do npx remotion render src/index.ts EP04$p ../episodes/ep04-congress/renders/parts/EP04$p.mp4; done
```
Tip: add `--concurrency=50%` if the PC gets too hot/slow; add `--gl=angle` on Windows if a part renders black.

## 5 · Join the parts into one video
From `studio/`, PowerShell:
```
"Hook","Part02","Part03","Part04","Part05","Part06","Part07","Part08","Part09" | % { "file '../episodes/ep04-congress/renders/parts/EP04$_.mp4'" } | Set-Content list.txt
npx remotion ffmpeg -f concat -safe 0 -i list.txt -c copy ../episodes/ep04-congress/renders/ep04-full.mp4
```
Mac / Linux:
```
for p in Hook Part02 Part03 Part04 Part05 Part06 Part07 Part08 Part09; do echo "file '../episodes/ep04-congress/renders/parts/EP04$p.mp4'"; done > list.txt
npx remotion ffmpeg -f concat -safe 0 -i list.txt -c copy ../episodes/ep04-congress/renders/ep04-full.mp4
```

## 6 · When the voice-over is ready
Send the Flint MP3 to Claude in the chat (or put it in `studio/public/ep04/vo/`). Claude tightens the pauses, gets the word times and pushes the re-timed code; then you `git pull` and repeat steps 4–5. The final loudness pass (−14 LUFS) is added in that step.
