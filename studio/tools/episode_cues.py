#!/usr/bin/env python3
"""Generic Dollarly timing: align vo-clean.txt (script words) to a faster-whisper word list and write cues.json.

  python3 tools/episode_cues.py --text ../episodes/ep05-elsayed-gas/vo-clean.txt \
      --words public/ep05/vo/vo_ep05.words.json --out src/ep05/cues.json

Same JSON shape as ep04_est.py ({mode, dur, paras:[{i, t, words:[[word, start, end]]}]}), so t.ts / wordT() work unchanged.
Alignment = difflib on normalised tokens; numbers are spelled out on both sides ("$62" -> "sixty two dollars") so
digits from Whisper match words in the script. Unmatched script words get times interpolated between matched neighbours.
Prints the match rate and any long unmatched runs (a line the narrator skipped, or a repeated/extra take).
"""
import argparse, difflib, json, re

ONES = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = 'zero ten twenty thirty forty fifty sixty seventy eighty ninety'.split()


def spell(n):
    n = int(n)
    if n < 20: return ONES[n]
    if n < 100: return TENS[n // 10] + ('' if n % 10 == 0 else ' ' + ONES[n % 10])
    if n < 1000: return ONES[n // 100] + ' hundred' + ('' if n % 100 == 0 else ' ' + spell(n % 100))
    if 1900 <= n <= 2099:  # years
        hi, lo = divmod(n, 100)
        if hi == 20 and lo < 10: return 'two thousand' + ('' if lo == 0 else ' ' + ONES[lo])
        return spell(hi) + ' ' + ('hundred' if lo == 0 else spell(lo))
    if n < 1_000_000: return spell(n // 1000) + ' thousand' + ('' if n % 1000 == 0 else ' ' + spell(n % 1000))
    return spell(n // 1_000_000) + ' million' + ('' if n % 1_000_000 == 0 else ' ' + spell(n % 1_000_000))


def tokens(word):
    """One printed word -> list of normalised spoken tokens."""
    w = word.lower().replace('-', ' ').replace('—', ' ')
    out = []
    for part in w.split():
        m = re.fullmatch(r"(\$?)([0-9][0-9,]*)(?:\.([0-9]+))?(%|m|b)?[.,!?;:]*", part)
        if m:
            dollar, num, dec, suf = m.groups()
            num = num.replace(',', '')
            out += spell(num).split()
            if dec: out += ['point'] + [ONES[int(d)] for d in dec]
            if suf == '%': out.append('percent')
            if dollar: out.append('dollars')
            continue
        part = re.sub(r"[^a-z0-9']", '', part).replace("'", '')
        if part: out.append(part)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--text', required=True); ap.add_argument('--words', required=True); ap.add_argument('--out', required=True)
    a = ap.parse_args()
    paras = [p.strip() for p in open(a.text).read().split('\n\n') if p.strip()]
    real = json.load(open(a.words))

    # script side: (para, word index, printed word) per token
    s_tok, s_ref, printed = [], [], []
    for i, p in enumerate(paras):
        for k, w in enumerate(p.split()):
            printed.append((i, k, w))
            for t in tokens(w): s_tok.append(t); s_ref.append(len(printed) - 1)
    # whisper side
    r_tok, r_ref = [], []
    for j, (w, st, en) in enumerate(real):
        for t in tokens(w): r_tok.append(t); r_ref.append(j)

    sm = difflib.SequenceMatcher(None, s_tok, r_tok, autojunk=False)
    times = [None] * len(printed)
    matched = 0
    for blk in sm.get_matching_blocks():
        for d in range(blk.size):
            pi = s_ref[blk.a + d]; rj = r_ref[blk.b + d]
            if times[pi] is None: times[pi] = [real[rj][1], real[rj][2]]
            else: times[pi][1] = max(times[pi][1], real[rj][2])
            matched += 1
    # report long gaps
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal': continue
        if i2 - i1 >= 4:
            print(f'  script not heard ({tag}, {i2 - i1} tokens): "{" ".join(s_tok[i1:i2])[:120]}"')
        if j2 - j1 >= 4:
            t0 = real[r_ref[j1]][1]
            print(f'  audio not in script @ {t0:.1f}s ({tag}, {j2 - j1} tokens): "{" ".join(r_tok[j1:j2])[:120]}"')
    # interpolate unmatched printed words
    known = [k for k, t in enumerate(times) if t]
    for k in range(len(times)):
        if times[k]: continue
        prev = max([q for q in known if q < k], default=None); nxt = min([q for q in known if q > k], default=None)
        if prev is None: times[k] = [real[0][1], real[0][1] + 0.2]; continue
        if nxt is None: times[k] = [times[prev][1], times[prev][1] + 0.2]; continue
        f = (k - prev) / (nxt - prev)
        t = times[prev][1] + f * (times[nxt][0] - times[prev][1])
        times[k] = [t, t + 0.2]

    out = []
    for i, p in enumerate(paras):
        ws = [[w, round(times[n][0], 3), round(times[n][1], 3)] for n, (pi, k, w) in enumerate(printed) if pi == i]
        out.append({'i': i, 't': ws[0][1], 'words': ws})
    dur = real[-1][2] + 2.0
    json.dump({'mode': 'words', 'dur': round(dur, 2), 'paras': out}, open(a.out, 'w'))
    print(f'paras {len(out)} · script tokens {len(s_tok)} · matched {matched} ({100 * matched / len(s_tok):.1f}%) · dur {dur:.1f}s')


if __name__ == '__main__':
    main()
