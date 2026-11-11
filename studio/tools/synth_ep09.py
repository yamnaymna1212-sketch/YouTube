"""EP09 calm dark ambient music (minor, no hiss), generated in code from the EP06 model."""
import importlib.util, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('sa', os.path.join(here, 'synth_audio.py'))
sa = importlib.util.module_from_spec(spec); spec.loader.exec_module(sa)
SR = sa.SR
sa.OUT = os.path.join(here, '..', 'public', 'ep09', 'audio')
rng = np.random.default_rng(909)


def music(total):
    n = int(total * SR); t = np.arange(n) / SR
    out = np.zeros(n)
    breath = 0.7 + 0.3 * np.sin(2 * np.pi * t / 23.0)
    drone = np.sin(2 * np.pi * sa.midi(26) * t) * 0.5 + np.sin(2 * np.pi * sa.midi(38) * t + 0.5 * np.sin(2 * np.pi * 0.03 * t)) * 0.3
    out += np.tanh(drone * 1.2) * breath * 0.5
    prog = [[50, 57, 62, 65], [46, 53, 58, 62], [53, 60, 65, 69], [48, 55, 60, 64]]  # Dm  Bb  F  C (calm, dark)
    seg = 20.0
    pad = np.zeros(n); k = 0; start = 0.0
    while start < total:
        ch = prog[k % 4]
        s0, s1 = int(start * SR), int(min(total, start + seg + 8.0) * SR)
        tt = t[s0:s1] - start; v = np.zeros(s1 - s0)
        for m in ch:
            for det in (-0.08, 0.0, 0.07):
                f0 = sa.midi(m + det); ph = rng.uniform(0, 6.28)
                for h, a in ((1, 1.0), (2, 0.25), (3, 0.08)):
                    v += a * np.sin(2 * np.pi * f0 * h * tt + ph * h)
        v *= sa.env_adsr(len(v), 7.0, 8.0)
        pad[s0:s1] += v; start += seg; k += 1
    pad = sa.fft_filter(pad, lo=80, hi=700, slope=1.5)
    pad *= 0.75 + 0.25 * np.sin(2 * np.pi * t / 13.0)
    out += pad / np.max(np.abs(pad)) * 0.40
    # high shimmer: soft sine cluster two octaves up, slow tremolo
    sh = np.zeros(n)
    for m, sp in ((84, 17.0), (87, 21.0), (91, 26.0)):
        sh += np.sin(2 * np.pi * sa.midi(m) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * t / sp + m))
    sh = sa.fft_filter(sh, hi=5000)
    out += sh / np.max(np.abs(sh)) * 0.035
    # rare soft bells (C minor pentatonic), long echoes
    scale = [69, 72, 74, 77, 81]  # D minor pentatonic
    notes = np.zeros(n); t0 = 9.0
    while t0 < total - 8:
        f0 = sa.midi(scale[rng.integers(len(scale))]); s0 = int(t0 * SR); L = min(int(6 * SR), n - s0)
        tl = np.arange(L) / SR
        tone = (np.sin(2 * np.pi * f0 * tl) + 0.2 * np.sin(2 * np.pi * 2.01 * f0 * tl)) * np.exp(-tl * 0.9) * (1 - np.exp(-tl * 120))
        notes[s0:s0 + L] += tone * rng.uniform(0.5, 0.9); t0 += rng.uniform(8.0, 15.0)
    d = int(0.9 * SR); echo = notes.copy(); echo[d:] += notes[:-d] * 0.4; echo[2 * d:] += notes[:-2 * d] * 0.18
    echo = sa.fft_filter(echo, hi=2400)
    out += echo / np.max(np.abs(echo)) * 0.10
    st = sa.stereo_verb(out, sec=6.5, wet=0.5, damp=2600)
    st *= sa.env_adsr(n, 3.0, 8.0)[:, None]
    sa.write('music_ep09.wav', st)



if __name__ == '__main__':
    os.makedirs(sa.OUT, exist_ok=True)
    music(315.0)
