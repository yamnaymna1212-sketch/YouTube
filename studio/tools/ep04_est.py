#!/usr/bin/env python3
"""EP04 timing: writes studio/src/ep04/cues.json with a start time for every word of vo-clean.txt.
Mode 1 (now, no VO): ESTIMATE at 3.0 words/s, +0.25 s after a sentence, +0.45 s between paragraphs; parts are contiguous
on this clock (each part = a run of paragraphs).
Mode 2 (VO arrives): pass --words vo.words.json (faster-whisper word list [[word,start,end],...] on the TIGHT take);
words are aligned in order and every paragraph/word gets its real time. Same JSON shape, so no code changes."""
import json, re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
vo = open(os.path.join(ROOT, '..', 'episodes', 'ep04-congress', 'vo-clean.txt')).read()
paras = [p.strip() for p in vo.split('\n\n') if p.strip()]
norm = lambda w: re.sub(r"[^a-z0-9$%']", '', w.lower())
out = []
if '--words' in sys.argv:
    real = json.load(open(sys.argv[sys.argv.index('--words') + 1]))
    j = 0
    for i, p in enumerate(paras):
        ws = []
        for w in p.split():
            k = j
            while k < len(real) and norm(real[k][0]) != norm(w) and k < j + 6: k += 1
            if k < len(real) and norm(real[k][0]) == norm(w): j = k
            r = real[min(j, len(real) - 1)]
            ws.append([w, round(r[1], 3), round(r[2], 3)]); j += 1
        out.append({'i': i, 't': ws[0][1], 'words': ws})
    dur = real[-1][2] + 2.0
else:
    t = 0.0
    for i, p in enumerate(paras):
        ws = []
        for w in p.split():
            ws.append([w, round(t, 3), round(t + 0.30, 3)])
            t += 1 / 3.0 + (0.25 if re.search(r'[.?!:]$', w) else 0.0)
        out.append({'i': i, 't': ws[0][1], 'words': ws})
        t += 0.45
    dur = t + 2.0
json.dump({'mode': 'words' if '--words' in sys.argv else 'estimate', 'dur': round(dur, 2), 'paras': out}, open(os.path.join(ROOT, 'src', 'ep04', 'cues.json'), 'w'))
print('paras', len(out), 'dur', round(dur, 1))
