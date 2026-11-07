"""EP04 narrator voice-over, generated locally with Kokoro-82M (Apache-2.0, hexgrad/Kokoro-82M), voice am_michael (US male).
Run with a Python 3.12 venv that has `kokoro soundfile` (+ torch CPU):  python tools/ep04_tts.py
- one paragraph of episodes/ep04-congress/vo-clean.txt at a time (natural phrasing)
- every silence longer than MAX_SIL inside a paragraph is cut to KEEP (clean, even pauses)
- fixed gaps between paragraphs (longer after the hook and after chapter titles)
- word times come from Kokoro's own token timestamps, remapped through the cuts
Writes studio/public/ep04/vo/vo_raw.wav (48 kHz) and studio/src/ep04/cues.json (mode "tts")."""
import json, os, re
import numpy as np, soundfile as sf
from kokoro import KPipeline

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VO = os.path.join(ROOT, '..', 'episodes', 'ep04-congress', 'vo-clean.txt')
VOICE, SPEED, SR = 'am_michael', 1.0, 24000
KEEP, MAX_SIL, EDGE = 0.14, 0.20, 0.03
GAP = 0.30                                   # between paragraphs
GAP_AFTER = {4: 1.25, 9: 0.6, 20: 0.6, 29: 0.6, 44: 0.45}  # hook → part 2 (door fly), after chapter titles, before disclaimer
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
out = os.path.join(ROOT, 'public', 'ep04', 'vo', 'vo_raw.wav')
sf.write(out, full, SR)
json.dump({'mode': 'tts', 'voice': VOICE, 'speed': SPEED, 'dur': round(t + 2.0, 2), 'paras': cues}, open(os.path.join(ROOT, 'src', 'ep04', 'cues.json'), 'w'))
print('done', round(t / 60, 2), 'min')
