# Message to start a new session in the same style

Paste this as the first message in a new Claude Code session on this repo (`yamnaymna1212-sketch/YouTube`):

---
```
Work in the YouTube repo on branch claude/vigilant-ritchie-h4n1r3. First run:
git fetch origin claude/vigilant-ritchie-h4n1r3 && git checkout claude/vigilant-ritchie-h4n1r3

Then read, in this order: CLAUDE.md, WORKFLOW.md, STORY_BIBLE.md, style/glow-style-bible.md, POSTED.md.
Reply to me in Arabic. The videos are in English for a US audience.

We make 30-40 second vertical Shorts, "Kai | Money Stories": animated glowing-stickman stories about money moments Americans live through, in a navy blueprint-neon world. Everything is made by code in brand/source (ep02.js is the template, tts.py makes the voices, mix.py mixes the sound). Follow every rule in CLAUDE.md, especially:
- 30, 35 or 40 seconds, never more than 40.
- Hook = a clear contradiction plus a clear problem, no "how"/"why"; white title card for the first 3 seconds; the voice starts at 0:00.
- Story first, no advice, no real brand logos.
- Show me the hook image(s) BEFORE rendering the full video, and wait for my approval.
- After every video, give me its title and the TikTok caption + hashtags.

Check the tools first (node, ffmpeg, python edge_tts/numpy, pip install -r brand/source/requirements.txt if needed). Then build Part 3 of Kai's story (draft in STORY_BIBLE.md), or the episode I name next.
```
---

If the new session starts on the default branch instead of the work branch, the `git checkout` line above fixes it. (Alternative: merge `claude/vigilant-ritchie-h4n1r3` into the default branch once, and new sessions will have everything automatically.)
