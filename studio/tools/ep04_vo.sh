#!/bin/bash
# EP04 voice-over pipeline (run when the user's Flint take is in studio/public/ep04/vo/vo_full.mp3).
#  1. cut every pause to a clean, even 0.16 s (keeps a natural breath)   -> tight/vo_full.mp3 (+ .json time map)
#  2. polish + LOUDER: high-pass, gentle de-ess, compressor, loudness -15 LUFS / peak -1.5 dB -> tight/vo_clean.mp3
#  3. word timings (faster-whisper) -> tight/vo_clean.words.json
#  4. re-time the whole episode on the real words -> src/ep04/cues.json
# Then set VO in src/ep04/parts.tsx + Hook.tsx (VO_FILE) and render.
set -e
cd "$(dirname "$0")/.."
V=public/ep04/vo
VO_DIR=$V python3 -I tools/tighten_vo.py vo_full
ffmpeg -v error -y -i $V/tight/vo_full.mp3 -af "highpass=f=80,deesser=i=0.35,acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=3,loudnorm=I=-15:TP=-1.5:LRA=7" -ar 48000 -b:a 192k $V/tight/vo_clean.mp3
pip install -q faster-whisper >/dev/null 2>&1 || true
python3 - <<'PY'
from faster_whisper import WhisperModel
import json
m = WhisperModel('small.en', device='cpu', compute_type='int8')
segs, _ = m.transcribe('public/ep04/vo/tight/vo_clean.mp3', word_timestamps=True, vad_filter=False)
words = [[w.word.strip(), round(w.start, 3), round(w.end, 3)] for s in segs for w in s.words]
json.dump(words, open('public/ep04/vo/tight/vo_clean.words.json', 'w'))
print('words', len(words), 'dur', words[-1][2])
PY
python3 tools/ep04_est.py --words $V/tight/vo_clean.words.json
echo "VO ready: public/ep04/vo/tight/vo_clean.mp3 — mix: VO 1.0, music 0.07 (≈ -16 dB under the voice), final assembly loudnorm -14 LUFS"
