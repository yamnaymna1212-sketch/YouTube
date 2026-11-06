"""Find when each script shot starts in the tightened EP03 VO.

Reads episodes/ep03-iran/script.md (shot rows), the word timings of the raw take (vo_full.words.json, faster-whisper)
and the tighten map (vo/tight/vo_full.json). Writes studio/src/ep03/cues.json:
  {"dur": tight_seconds, "shots": [{"id": "2", "part": "vo_00", "t": tight_start_s, "words": [[word, tight_s, tight_e], ...]}, ...]}
"""
import json, re, difflib
ROOT = '/home/user/YouTube'
script = open(f'{ROOT}/episodes/ep03-iran/script.md').read()
words = [w for s in json.load(open(f'{ROOT}/studio/public/iran/vo/vo_full.words.json')) for w in s['words']]
tmap = json.load(open(f'{ROOT}/studio/public/iran/vo/tight/vo_full.json'))

def tight(t):
    m = tmap['map']
    for a, b, n in m:
        if t < a: return n  # inside a removed pause: snap to next phrase start
        if t <= b: return n + (t - a)
    return tmap['dur']

NUM = {'1960s': 'nineteen sixties', '28th': 'twenty eighth', '10': 'ten', '29': 'twenty nine', '440': 'four hundred and forty',
       '412': 'four twelve', '8': 'eight', '000': 'thousand', '780': 'seven hundred and eighty', '7': 'seven', '81': 'eighty one', '38': 'thirty eight',
       '1945': 'nineteen forty five', '1946': 'nineteen forty six', '1973': 'nineteen seventy three', '1983': 'nineteen eighty three', '2018': 'twenty eighteen'}
norm = lambda t: re.sub(r"[^a-z0-9' ]", ' ', t.lower()).split()
said = []  # (token, word_index)
for i, w in enumerate(words):
    for tok in norm(w['w']):
        for sub in norm(NUM.get(tok, tok)): said.append((sub, i))
stoks = [s for s, _ in said]

shots, part = [], None
for line in script.splitlines():
    m = re.match(r'^## (vo_\d\d)', line)
    if m: part = m.group(1)
    m = re.match(r'^\| (\d+[a-z]?) \| (.*?) \| (.*) \|$', line)
    if m and part:
        vo = re.sub(r'\s*\[[^\]]*\]|\*\([^)]*\)\*|🔁', '', m.group(3)).strip()
        shots.append({'id': m.group(1), 'part': part, 'shot': m.group(2), 'vo': vo})

# align full script token stream to spoken stream once
ref, owner = [], []
for k, s in enumerate(shots):
    for tok in norm(s['vo']):
        for sub in norm(NUM.get(tok, tok)): ref.append(sub); owner.append(k)
sm = difflib.SequenceMatcher(None, ref, stoks, autojunk=False)
r2s = {}
for a, b, n in sm.get_matching_blocks():
    for j in range(n): r2s[a + j] = b + j
first, toks_of = {}, {}
for ri, k in enumerate(owner):
    if ri in r2s:
        wi = said[r2s[ri]][1]
        first.setdefault(k, wi); toks_of.setdefault(k, []).append(wi)
out = []
prev_t = 0.0
for k, s in enumerate(shots):
    if k in first:
        t = tight(words[first[k]]['s'])
        ws = sorted(set(toks_of[k]))
        wl = [[words[i]['w'].strip(), round(tight(words[i]['s']), 3), round(tight(words[i]['e']), 3)] for i in ws]
    else:
        t, wl = prev_t, []
    prev_t = t
    out.append({'id': s['id'], 'part': s['part'], 't': round(t, 3), 'shot': s['shot'], 'words': wl})
json.dump({'dur': tmap['dur'], 'shots': out}, open(f'{ROOT}/studio/src/ep03/cues.json', 'w'), indent=0)
for o in out: print(o['part'], o['id'].rjust(4), f"{o['t']:7.2f}", o['shot'][:60])
