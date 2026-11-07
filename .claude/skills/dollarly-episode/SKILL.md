---
name: dollarly-episode
description: Make a full Dollarly YouTube episode end to end (idea → research → script → narrator VO → Remotion animation in the Dollarly paper-world brand → render → thumbnail → upload text). Use whenever the user asks for a new Dollarly video/episode, a hook, a script, the next episode idea, a re-render with a new voice, or anything for the Dollarly channel ("Your Money. Decoded."), even if they only say "next video", "new episode", "do the hook", "make the voice" or write in Arabic.
---

# Dollarly episode

Dollarly = US personal finance + financial news + economic trends, in English, for American viewers (TV-first: ~48% watch on a TV). Slogan "Your Money. Decoded." Host/character: **Jake (26)**, drawn in code (`studio/src/host/LiveJake.tsx`). Talk to the user in **Arabic**; everything on screen and in the VO is **English**.

Read first, every time: `references/rules.md` (non-negotiable user rules) and `docs/HANDOFF.md` (latest state). The brand is in `style/BRAND-v5-dollarly.md`; the reference episode is **EP04** (`episodes/ep04-congress/`, code `studio/src/ep04/`).

## The 8 steps (one commit + push after each)

1. **Idea** — fresh US news with a money angle; titles that start with a power word/name ("Trump Just Lost Congress. 3 Things Happen to Your Money."). Check what is working for competitors (if the TubeAlfred plugin is authorized use `tubealfred-youtube:youtube-competitor` / `youtube-keyword-ideas`; otherwise web search). Test the hook with `social-media-skills:hook-writer`. Give the user 2–5 options, recommend one, let them pick.
2. **Research** — every fact gets a status in `research.md`: ✔ primary · ◐ secondary (confirm before VO) · ⚠ don't use. Never invent a number. Neutral: state both sides, "could happen / who decides", never a prediction.
3. **Script** — `scripts/new_episode.sh epNN slug` scaffolds the folder. Write `vo-clean.txt` (paragraphs separated by a blank line; ≈ 1,500–1,700 words ≈ 9–10 min; **hook in the first paragraph = date/stakes in second 0**), and `script.md` with one shot table per paragraph run. Structure that works: hook → reality check → 3 "doors" (one per money impact) → who it hits (illustrative people) → one calendar → 3 things to do → disclaimer → end card.
4. **Voice-over** — default: generate it locally (`references/pipeline.md` §VO, Kokoro `am_michael`, US male). Every pause is cut (silence > 0.20 s → 0.14 s), VO loud (−15 LUFS), word timings written straight into `studio/src/epNN/cues.json`. If the user sends their own ElevenLabs take, use `tighten_vo.py` + faster-whisper instead (same cues.json shape). Never generate through an ElevenLabs connector that is not the user's own account.
5. **Animation** — Remotion in `studio/src/epNN/` copying the EP04 kit (`references/shot-kit.md`). One part per paragraph run (Hook, Part02…PartNN); every element fires on its spoken word via `wordT(paragraph, 'word')`. Respect the mix and the no-dead-second rule. Check stills (`node tools/render_stills.mjs ID:frame`) before any full render and fix what looks empty, cut off or overlapping.
6. **Sound** — calm dark ambient music (generate per episode with `tools/synth_ep04.py` as the model) at 0.07 under the VO; soft SFX only (tick/type/counter/paper, ≤ 0.1). **No hiss/room-tone beds.** For sound-only changes render `--codec=wav` per part and mux onto the existing video instead of re-rendering pictures.
7. **Render** — on the user's Mac M3 by default (`bash studio/tools/render_mac.sh` pattern, output to the Desktop); on the cloud server only as a backup, detached (`setsid nohup …`), and tell the user the real ETA (~1 h for 9 min on the server). Generic: `tools/render_episode.sh EPNN ../episodes/epNN-slug Hook Part02 …`.
8. **Package** — thumbnail from the template `studio/src/brand/Thumb.tsx` (2 giant words + ink strip + REAL official photo in a print frame + one paper prop + logo tab; no AI-altered face); `youtube-upload.md` with title, description, **chapters from cues.json**, sources, tags, settings (Education, not for kids, AI narration disclosed), and a "re-check before upload" list.

## Before you finish any turn
- Everything committed and pushed to the working branch (the repo has a stop hook that checks).
- Tell the user, in Arabic: what changed, what is still estimated/unverified, and the one next action for them.
