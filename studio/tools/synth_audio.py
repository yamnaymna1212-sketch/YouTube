"""Original, procedurally generated audio for EP02 (no samples, no licences needed).

Outputs (48 kHz, 16-bit stereo WAV) to studio/public/sayed/audio/:
  music_ep02.wav   – calm dark ambient bed, D minor, ~130 s (one continuous take so
                     consecutive parts can pick it up at an offset and stay seamless)
  sfx_*.wav        – whoosh, impact, sub_hit, riser, tick, type, click, paper, shimmer

Run:  python3 -I studio/tools/synth_audio.py
"""
import os
import wave
import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sayed', 'audio')
rng = np.random.default_rng(7)


def write(name, x):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    peak = np.max(np.abs(x)) or 1.0
    x = x / peak * 0.89  # normalise to about -1 dBFS; levels are set in the mix
    pcm = (x * 32767).astype('<i2')
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f'{name}: {len(x) / SR:.1f}s')


def fft_filter(x, lo=None, hi=None, slope=2.0):
    """Static band filter with soft (Butterworth-like) edges, applied in the frequency domain."""
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    g = np.ones_like(f)
    if hi:
        g *= 1 / np.sqrt(1 + (f / hi) ** (2 * slope))
    if lo:
        g *= 1 / np.sqrt(1 + (lo / np.maximum(f, 1e-3)) ** (2 * slope))
    return np.fft.irfft(X * g, n)


def reverb_ir(sec=4.0, seed=1, damp=3500):
    r = np.random.default_rng(seed)
    t = np.arange(int(sec * SR)) / SR
    ir = r.standard_normal(len(t)) * np.exp(-t * 6.9 / sec)  # -60 dB at `sec`
    ir = fft_filter(ir, hi=damp)
    ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))  # pre-delay softness
    return ir / np.sqrt(np.sum(ir ** 2))


def convolve(x, ir):
    n = len(x) + len(ir) - 1
    N = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[: len(x)]


def stereo_verb(x, sec=4.0, wet=0.35, damp=3500):
    l = convolve(x, reverb_ir(sec, 11, damp)); r = convolve(x, reverb_ir(sec, 23, damp))
    return np.stack([x * (1 - wet) + l * wet, x * (1 - wet) + r * wet], axis=1)


def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na) ** 2
    e[n - nr:] *= np.linspace(1, 0, nr) ** 2
    return e


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


# ---------------------------------------------------------------- MUSIC
def music(total=132.0):
    n = int(total * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)

    # 1) sub drone on D (D1 + D2), slow breathing, gentle saturation
    breath = 0.75 + 0.25 * np.sin(2 * np.pi * t / 19.0)
    drone = (np.sin(2 * np.pi * midi(26) * t) * 0.55 + np.sin(2 * np.pi * midi(38) * t + 0.4 * np.sin(2 * np.pi * 0.05 * t)) * 0.35)
    out += np.tanh(drone * 1.4) * breath * 0.55

    # 2) pad: slow minor progression, detuned additive voices through a dark lowpass
    prog = [  # (bass-free voicings, MIDI)
        [50, 57, 62, 65],  # Dm
        [46, 53, 58, 62],  # Bb
        [43, 50, 55, 58],  # Gm
        [45, 52, 57, 61],  # A (no 3rd → sus-ish with C#)
    ]
    seg = 12.0  # seconds per chord, long crossfades
    pad = np.zeros(n)
    k = 0
    start = 0.0
    while start < total:
        chord = prog[k % len(prog)]
        s0, s1 = int(start * SR), int(min(total, start + seg + 4.0) * SR)
        tt = t[s0:s1] - start
        v = np.zeros(s1 - s0)
        for m in chord:
            for det in (-0.07, 0.0, 0.06):
                f0 = midi(m + det)
                ph = rng.uniform(0, 2 * np.pi)
                for h, amp in ((1, 1.0), (2, 0.32), (3, 0.12), (4, 0.05)):
                    v += amp * np.sin(2 * np.pi * f0 * h * tt + ph * h)
        v *= env_adsr(len(v), 4.0, 4.0)
        pad[s0:s1] += v
        start += seg; k += 1
    pad = fft_filter(pad, lo=90, hi=900, slope=1.5)
    pad *= 0.8 + 0.2 * np.sin(2 * np.pi * t / 7.3)  # slow swell
    out += pad / np.max(np.abs(pad)) * 0.42

    # 3) air: very quiet filtered noise
    air = fft_filter(rng.standard_normal(n), lo=1800, hi=6000, slope=1.0)
    out += air / np.max(np.abs(air)) * 0.035 * (0.6 + 0.4 * np.sin(2 * np.pi * t / 11.0))

    # 4) sparse soft piano-ish notes (D minor pentatonic), with long echoes
    scale = [62, 65, 67, 69, 72, 74, 77]
    notes = np.zeros(n)
    tt0 = 6.0
    while tt0 < total - 6:
        m = scale[rng.integers(len(scale))]
        f0 = midi(m)
        L = int(5.0 * SR)
        s0 = int(tt0 * SR)
        L = min(L, n - s0)
        tl = np.arange(L) / SR
        tone = (np.sin(2 * np.pi * f0 * tl) + 0.25 * np.sin(2 * np.pi * 2 * f0 * tl) + 0.06 * np.sin(2 * np.pi * 3 * f0 * tl))
        tone *= np.exp(-tl * 1.1) * (1 - np.exp(-tl * 300))
        notes[s0:s0 + L] += tone * rng.uniform(0.6, 1.0)
        tt0 += rng.uniform(4.5, 9.0)
    # tape-style echo (2 taps)
    d = int(0.75 * SR)
    echo = notes.copy()
    echo[d:] += notes[:-d] * 0.38
    echo[2 * d:] += notes[:-2 * d] * 0.15
    echo = fft_filter(echo, hi=2600)
    out += echo / np.max(np.abs(echo)) * 0.16

    st = stereo_verb(out, sec=5.5, wet=0.42, damp=2800)
    # 4 s fade in, 6 s fade out
    st *= env_adsr(n, 4.0, 6.0)[:, None]
    write('music_ep02.wav', st)


# ---------------------------------------------------------------- SFX
def tv_lowpass(x, fc):
    """Time-varying one-pole lowpass (fc in Hz per sample)."""
    y = np.zeros_like(x); s = 0.0
    a = 1 - np.exp(-2 * np.pi * np.asarray(fc) / SR)
    for i in range(len(x)):
        s += a[i] * (x[i] - s); y[i] = s
    return y


def whoosh(dur=0.9, up=True):
    n = int(dur * SR); tl = np.linspace(0, 1, n)
    curve = np.sin(np.pi * tl) ** 1.5
    fc = 300 + 5200 * (tl if up else 1 - tl) ** 1.6
    x = tv_lowpass(rng.standard_normal(n), fc) - tv_lowpass(rng.standard_normal(n), fc * 0.25) * 0.5
    x *= curve
    return stereo_verb(x, sec=1.6, wet=0.3, damp=6000)


def impact(dur=2.2):
    n = int(dur * SR); tl = np.arange(n) / SR
    f = 62 * np.exp(-tl * 2.2) + 32
    ph = 2 * np.pi * np.cumsum(f) / SR
    boom = np.sin(ph) * np.exp(-tl * 2.4)
    click = fft_filter(rng.standard_normal(n), lo=800, hi=5000) * np.exp(-tl * 60) * 0.5
    x = np.tanh((boom + click) * 1.6)
    return stereo_verb(x, sec=3.0, wet=0.35, damp=2500)


def sub_hit(dur=1.4):
    n = int(dur * SR); tl = np.arange(n) / SR
    f = 48 * np.exp(-tl * 3) + 30
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tl * 3.2) * (1 - np.exp(-tl * 400))


def riser(dur=2.0):
    n = int(dur * SR); tl = np.linspace(0, 1, n)
    fc = 200 + 7000 * tl ** 2.5
    x = tv_lowpass(rng.standard_normal(n), fc) * tl ** 2
    tone = np.sin(2 * np.pi * np.cumsum(110 + 330 * tl ** 2) / SR) * tl ** 3 * 0.25
    x = (x + tone) * np.concatenate([np.ones(n - 600), np.linspace(1, 0, 600)])
    return stereo_verb(x, sec=2.0, wet=0.35)


def tick(dur=0.06, f=2600):
    n = int(dur * SR); tl = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tl) * np.exp(-tl * 160) + fft_filter(rng.standard_normal(n), lo=2000) * np.exp(-tl * 400) * 0.3


def typing(dur=1.6, rate=13):
    n = int(dur * SR); x = np.zeros(n)
    t0 = 0.02
    while t0 < dur - 0.05:
        k = tick(0.04, rng.uniform(1800, 3200)) * rng.uniform(0.4, 1.0)
        s = int(t0 * SR); x[s:s + len(k)] += k[: n - s]
        t0 += rng.uniform(0.6, 1.4) / rate
    return stereo_verb(fft_filter(x, hi=7000), sec=0.6, wet=0.12)


def counter(dur=2.2):
    """Gas-pump counter ticking, slowing down at the end."""
    n = int(dur * SR); x = np.zeros(n)
    t0 = 0.0; gap = 0.035
    while t0 < dur - 0.1:
        k = tick(0.03, 3400) * 0.6
        s = int(t0 * SR); x[s:s + len(k)] += k[: n - s]
        t0 += gap; gap *= 1.035
    ding = np.sin(2 * np.pi * 1320 * np.arange(int(0.8 * SR)) / SR) * np.exp(-np.arange(int(0.8 * SR)) / SR * 6) * 0.5
    s = int((dur - 0.25) * SR); x[s:] += ding[: n - s]
    return stereo_verb(x, sec=0.8, wet=0.15)


def paper(dur=0.5):
    n = int(dur * SR); tl = np.arange(n) / SR
    x = fft_filter(rng.standard_normal(n), lo=900, hi=7000)
    am = np.abs(fft_filter(rng.standard_normal(n), hi=40))
    return x * am / am.max() * np.sin(np.pi * tl / dur)


def shimmer(dur=2.5):
    n = int(dur * SR); tl = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * midi(m) * tl) for m in (74, 81, 86)) * np.exp(-tl * 1.6) * (1 - np.exp(-tl * 30))
    return stereo_verb(x, sec=3.5, wet=0.55)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    write('sfx_whoosh.wav', whoosh())
    write('sfx_whoosh_short.wav', whoosh(0.45))
    write('sfx_impact.wav', impact())
    write('sfx_sub.wav', sub_hit())
    write('sfx_riser.wav', riser())
    write('sfx_tick.wav', tick(0.08))
    write('sfx_type.wav', typing())
    write('sfx_counter.wav', counter())
    write('sfx_paper.wav', paper())
    write('sfx_shimmer.wav', shimmer())
    music(480.0)  # whole episode (~8 min) as one continuous take
