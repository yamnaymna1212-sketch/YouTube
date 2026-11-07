"""Dollarly narrator voice-over (any episode), generated locally with Kokoro-82M (Apache-2.0, hexgrad/Kokoro-82M).
Default voice am_michael (US male). Run with a Python 3.12 venv that has `kokoro soundfile` (+ torch CPU):
  python tools/dollarly_tts.py --episode ../episodes/ep05-slug --code src/ep05 --vo public/ep05/vo [--voice am_michael] [--speed 1.0]
       [--gap-after 4:1.25,9:0.6]   (paragraph index:seconds; longer gaps after the hook / chapter titles)
Then polish: ffmpeg … loudnorm=I=-15 (see SKILL.md) → vo_<ep>.mp3
- one paragraph of episodes/ep04-congress/vo-clean.txt at a time (natural phrasing)
- every silence longer than MAX_SIL inside a paragraph is cut to KEEP (clean, even pauses)
- fixed gaps between paragraphs (longer after the hook and after chapter titles)
- word times come from Kokoro's own token timestamps, remapped through the cuts
Writes studio/public/ep04/vo/vo_raw.wav (48 kHz) and studio/src/ep04/cues.json (mode "tts")."""
import json, os, re
import numpy as np, soundfile as sf
from kokoro import KPipeline

import argparse
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser()
ap.add_argument('--episode', required=True); ap.add_argument('--code', required=True); ap.add_argument('--vo', required=True)
ap.add_argument('--voice', default='am_michael'); ap.add_argument('--speed', type=float, default=1.0)
ap.add_argument('--gap-after', default='')
A = ap.parse_args()
VO = os.path.join(A.episode, 'vo-clean.txt')
VOICE, SPEED, SR = A.voice, A.speed, 24000
KEEP, MAX_SIL, EDGE = 0.14, 0.20, 0.03      # every silence > 0.20 s inside a paragraph is cut to 0.14 s
GAP = 0.30                                   # between paragraphs
GAP_AFTER = {int(k): float(v) for k, v in (x.split(':') for x in A.gap_after.split(',') if x)}
paras = [p.strip() for p in open(VO).read().split('\n\n') if p.strip()]
norm = lambda w: re.sub(r"[^a-z0-9']", '', w.lower())

pipe = KPipeline(lang_code='a', repo_id='hexgrad/Kokoro-82M')


def tighten(a, toks):
    """cut silences > MAX_SIL to KEEP; return new audio + remapped token times."""
    hop = int(0.01 * SR)
    env = np.array([np.sqrt(np.mean(a[i:i + hop] ** 2)) for i in range(0, len(a), hop)])
    quiet = env < max(0.006, env.max() * 0.02)
    segs, i = [], 0  # list of (src_start, src_end) to keep
    keep_from = 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]: j += 1
            if (j - i) * 0.01 > MAX_SIL or i == 0 or j == len(quiet):
                pad = EDGE if (i == 0 or j == len(quiet)) else KEEP / 2
                s0 = i * hop + int(pad * SR) if i > 0 else None
                if i == 0:
                    keep_from = max(0, j * hop - int(EDGE * SR))
                else:
                    segs.append((keep_from, min(len(a), i * hop + int(pad * SR))))
                    keep_from = max(0, j * hop - int(pad * SR)) if j < len(quiet) else len(a)
            i = j
        else:
            i += 1
    if keep_from < len(a): segs.append((keep_from, len(a)))
    out, mp, pos = [], [], 0
    for s, e in segs:
        out.append(a[s:e]); mp.append((s / SR, e / SR, pos / SR)); pos += e - s
    def remap(t):
        for s, e, n in mp:
            if t <= e: return n + max(0.0, t - s)
        return pos / SR
    new = np.concatenate(out) if out else a
    return new, [(tx, remap(st), remap(en)) for tx, st, en in toks]


audio, cues, t = [], [], 0.0
for pi, text in enumerate(paras):
    pa, ptoks, off = [], [], 0.0
    for r in pipe(text, voice=VOICE, speed=SPEED):
        a = r.audio.numpy() if hasattr(r.audio, 'numpy') else np.asarray(r.audio)
        toks = [(tk.text, off + (tk.start_ts or 0), off + (tk.end_ts or 0)) for tk in r.tokens if norm(tk.text)]
        pa.append(a); ptoks += toks; off += len(a) / SR
    a = np.concatenate(pa)
    a, ptoks = tighten(a, ptoks)
    # align vo-clean words to Kokoro tokens (same order; tokens may split/merge a few words)
    words, j = [], 0
    for w in text.split():
        nw = norm(w); k = j
        while k < len(ptoks) and norm(ptoks[k][0]) != nw and k < j + 4: k += 1
        if k < len(ptoks) and norm(ptoks[k][0]) == nw: j = k
        tk = ptoks[min(j, len(ptoks) - 1)]
        words.append([w, round(t + tk[1], 3), round(t + tk[2], 3)]); j = min(j + 1, len(ptoks) - 1) if norm(ptoks[min(j, len(ptoks) - 1)][0]) == nw else j
    cues.append({'i': pi, 't': round(t, 3), 'words': words})
    audio.append(a); t += len(a) / SR
    g = GAP_AFTER.get(pi, GAP)
    audio.append(np.zeros(int(g * SR))); t += g
    print(pi, round(t, 1), flush=True)

full = np.concatenate(audio)
os.makedirs(A.vo, exist_ok=True)
out = os.path.join(A.vo, 'vo_raw.wav')
sf.write(out, full, SR)
json.dump({'mode': 'tts', 'voice': VOICE, 'speed': SPEED, 'dur': round(t + 2.0, 2), 'paras': cues}, open(os.path.join(A.code, 'cues.json'), 'w'))
print('done', round(t / 60, 2), 'min')
