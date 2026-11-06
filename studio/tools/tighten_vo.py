"""Shorten the pauses in the VO takes so the narration flows (keeps a natural breath).

For each studio/public/sayed/vo/vo_XX.mp3 writes vo/tight/vo_XX.mp3 and vo/tight/vo_XX.json:
  {"dur": new_seconds, "map": [[old_start, old_end, new_start], ...]}  (speech segments)
The video code remaps every cut/cue frame through this map, so pictures stay on the words.
Run: python3 -I studio/tools/tighten_vo.py
"""
import json, os, re, subprocess, sys
import numpy as np

SR = 48000
VO = os.environ.get('VO_DIR') or os.path.join(os.path.dirname(__file__), '..', 'public', 'sayed', 'vo')  # VO_DIR=studio/public/iran/vo for EP03
OUT = os.path.join(VO, 'tight')
KEEP = 0.16      # pause kept between phrases (s)
EDGE = 0.04      # silence kept at the very start/end (s)
MIN_SIL = 0.18   # only pauses longer than this are shortened
THRESH = '-38dB'
# Editorial cuts (original-take seconds to KEEP). vo_01: after HOOK v2 the cold open no longer repeats
# "what if he became president?", the Gas/Health/Paychecks/Taxes promise or the "one number" loop.
# Extra silence inserted before the first phrase that starts at/after an original-take time (s): room for a sound effect.
# EP03 vo_full: after "It's four in the morning. A siren." the real siren plays alone.
GAPS = {
    'vo_full': [(2.44, 2.8)],
}
KEEP_RANGES = {
    'vo_01': [(0.0, 15.0), (22.0, 26.2)],  # "This is Jake … first Muslim senator …" + "So forget the politics … Jake's wallet."
}


def silences(path):
    log = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-af', f'silencedetect=noise={THRESH}:d={MIN_SIL}', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', log)]
    en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', log)]
    return list(zip(st, en + [None] * (len(st) - len(en))))


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype='<f4')


def main(names):
    os.makedirs(OUT, exist_ok=True)
    for name in names:
        src = os.path.join(VO, f'{name}.mp3')
        x = decode(src); dur = len(x) / SR
        sil = [(a, b if b is not None else dur) for a, b in silences(src)]
        # speech segments = complement of silences
        segs, t = [], 0.0
        for a, b in sil:
            if a > t: segs.append([t, a])
            t = b
        if t < dur: segs.append([t, dur])
        if name in KEEP_RANGES:  # drop everything outside the editorial keep ranges
            segs = [[max(a, ka), min(b, kb)] for a, b in segs for ka, kb in KEEP_RANGES[name] if min(b, kb) - max(a, ka) > 0.05]
        out, mp, cur = [], [], 0.0
        fade = int(0.006 * SR)
        for i, (a, b) in enumerate(segs):
            pad = EDGE if i == 0 else KEEP
            for gt, gl in GAPS.get(name, []):
                if i > 0 and segs[i - 1][0] < gt <= a:  # first phrase after the gap point
                    pad += gl
            out.append(np.zeros(int(pad * SR), dtype='<f4')); cur += pad
            s, e = int(a * SR), int(b * SR)
            chunk = x[s:e].copy()
            if len(chunk) > 2 * fade:
                chunk[:fade] *= np.linspace(0, 1, fade); chunk[-fade:] *= np.linspace(1, 0, fade)
            out.append(chunk); mp.append([round(a, 4), round(b, 4), round(cur, 4)]); cur += (e - s) / SR
        out.append(np.zeros(int(EDGE * SR), dtype='<f4')); cur += EDGE
        y = np.concatenate(out)
        dst = os.path.join(OUT, f'{name}.mp3')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '192k', dst], input=y.tobytes(), check=True)
        json.dump({'dur': round(cur, 4), 'map': mp}, open(os.path.join(OUT, f'{name}.json'), 'w'))
        print(f'{name}: {dur:.2f}s -> {cur:.2f}s ({len(segs)} phrases)')


if __name__ == '__main__':
    main(sys.argv[1:] or [f'vo_0{i}' for i in range(8)])
