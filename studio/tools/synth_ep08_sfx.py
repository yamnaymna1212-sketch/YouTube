"""EP08 everyday sound effects, generated in code (numpy; no samples, no licences): register ding, receipt printer,
pump beep + fuel flow, store door chime, coins, cash rustle, card-reader beep, alarm clock, soft whoosh, page turn.
Output: studio/public/ep08/audio/sfx_*.wav (48 kHz)."""
import os, numpy as np, soundfile as sf
SR = 48000
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'ep08', 'audio')
rng = np.random.default_rng(88)
T = lambda d: np.arange(int(d * SR)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[(f < lo) | (f > hi)] = 0; return np.fft.irfft(X, len(x))
def room(x, sec=0.6, wet=0.18):
    n = int(sec * SR); ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 9 / sec) * 0.03
    N = 1 << (len(x) + n).bit_length(); y = np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[:len(x)]
    return x * (1 - wet) + y * wet
def w(name, x, peak=0.8):
    x = room(x); x = x / (np.max(np.abs(x)) + 1e-9) * peak
    sf.write(os.path.join(OUT, name), np.stack([x, x], 1).astype(np.float32), SR); print(name, round(len(x) / SR, 2))
def bell(f0, d=1.4, parts=((1, 1), (2.76, .5), (5.4, .25), (8.9, .12))):
    t = T(d); return sum(a * np.sin(2 * np.pi * f0 * m * t) * np.exp(-t * (3 + m * 1.5)) for m, a in parts) * (1 - np.exp(-t * 800))
def ding():  # register: drawer clunk + bell
    t = T(1.6); clunk = bp(rng.standard_normal(len(t)), 80, 900) * np.exp(-t * 30) * 1.2
    b = np.pad(bell(2093), (int(0.06 * SR), 0)); b = np.pad(b, (0, max(0, len(t) - len(b))))[:len(t)]
    return clunk + b * 0.9
def printer():  # receipt printer: fast stepped buzz bursts
    t = T(1.3); x = np.zeros_like(t)
    for k in range(18):
        st = int(k * 0.06 * SR); L = int(0.045 * SR)
        x[st:st + L] += bp(rng.standard_normal(L), 1500, 6000) * np.hanning(L) * (0.6 + 0.4 * rng.random())
    x += np.sin(2 * np.pi * 340 * t) * 0.08 * (t < 1.1)
    return x
def beep(f=1850, d=0.12):
    t = T(d + 0.05); return np.sign(np.sin(2 * np.pi * f * t)) * 0.3 * (t < d) * np.minimum(1, (d - t) * 200 + 0.01)
def pumpbeeps(): return np.concatenate([beep(), np.zeros(int(0.08 * SR)), beep(), np.zeros(int(0.08 * SR)), beep(2400, 0.2)])
def fuel(d=3.0):  # fuel flow: low gurgle + hiss swell
    t = T(d); n = rng.standard_normal(len(t))
    flow = bp(n, 200, 2500) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * t) ** 2) + np.sin(2 * np.pi * 95 * t) * 0.15
    return flow * np.minimum(1, t * 4) * np.minimum(1, (d - t) * 4)
def chime(): return np.concatenate([bell(1318, 0.5), bell(1046, 1.2)])
def coins():
    t = T(1.0); x = np.zeros_like(t)
    for k in range(6):
        st = int((0.02 + k * 0.07 + rng.random() * 0.03) * SR); y = bell(3000 + rng.random() * 2500, 0.4, ((1, 1), (2.4, .6), (4.1, .3)))
        x[st:st + len(y)] += y[:len(x) - st] * (0.5 + 0.5 * rng.random())
    return x
def cash():  # banknotes rustle/flick
    t = T(0.8); x = np.zeros_like(t)
    for k in range(7):
        st = int(k * 0.1 * SR); L = int(0.07 * SR)
        x[st:st + L] += bp(rng.standard_normal(L), 2500, 9000) * np.exp(-np.arange(L) / SR * 50)
    return x
def card(): return np.concatenate([beep(1600, 0.09), np.zeros(int(0.05 * SR)), beep(2100, 0.14)])
def alarm():
    seg = np.concatenate([beep(2600, 0.09), np.zeros(int(0.06 * SR))] * 4 + [np.zeros(int(0.35 * SR))])
    return np.tile(seg, 3)
def whoosh(d=0.6):
    t = T(d); n = rng.standard_normal(len(t)); env = np.sin(np.pi * t / d) ** 2
    lo = bp(n, 300, 1800) * env; return lo * 0.7
def page(): t = T(0.35); return bp(rng.standard_normal(len(t)), 1200, 7000) * np.exp(-((t - 0.12) / 0.06) ** 2)
def stamp(): t = T(0.5); return bp(rng.standard_normal(len(t)), 60, 1200) * np.exp(-t * 25) + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 18)
def gavel(): t = T(0.9); return (bp(rng.standard_normal(len(t)), 300, 3000) * np.exp(-t * 40) + np.sin(2 * np.pi * 180 * t) * np.exp(-t * 10) * 0.6)
if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for n, x, p in [('ding', ding(), .7), ('printer', printer(), .5), ('pumpbeep', pumpbeeps(), .35), ('fuel', fuel(), .5), ('chime', chime(), .5),
                    ('coins', coins(), .5), ('cash', cash(), .45), ('card', card(), .3), ('alarm', alarm(), .4), ('whoosh', whoosh(), .3),
                    ('page', page(), .4), ('stamp', stamp(), .6), ('gavel', gavel(), .6)]:
        w(f'sfx_{n}.wav', x, p)
