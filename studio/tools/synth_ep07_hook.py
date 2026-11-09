"""EP07 hook sound kit, generated in code (numpy, no samples, no licences). User asked (9 Nov 2026) for a scary,
film-like hook: heartbeat, loud clock, deep boom, ear ring, helicopter, police siren, dark tension bed.
Outputs to studio/public/ep07/audio/ (48 kHz WAV). Run with any python that has numpy + soundfile."""
import os, numpy as np, soundfile as sf
SR = 48000
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'ep07', 'audio')
rng = np.random.default_rng(7007)
t_ = lambda d: np.arange(int(d * SR)) / SR
def lp(x, a):  # one-pole low-pass, a in (0,1)
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)):
        acc += a * (x[i] - acc); y[i] = acc
    return y
def lpf(x, hz):  # FFT low-pass (fast)
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[f > hz] *= np.exp(-(f[f > hz] - hz) / (hz * 0.3)); return np.fft.irfft(X, len(x))
def hpf(x, hz):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[f < hz] *= (f[f < hz] / hz) ** 2; return np.fft.irfft(X, len(x))
def fconv(x, h):
    n = len(x) + len(h); N = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(h, N), N)[:len(x)]
def verb(x, sec=2.5, wet=0.35):
    n = int(sec * SR); ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.9 / sec)
    L = fconv(x, ir * 0.02); R = fconv(x, np.roll(ir, 777) * 0.02)
    return np.stack([x * (1 - wet) + L * wet, x * (1 - wet) + R * wet], 1)
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def w(name, x, peak=0.9):
    x = norm(x, peak); x = x if x.ndim == 2 else np.stack([x, x], 1); sf.write(os.path.join(OUT, name), x.astype(np.float32), SR); print(name, round(len(x) / SR, 2))

def heartbeat():
    t = t_(0.9); x = np.zeros_like(t)
    for st, a in ((0.0, 1.0), (0.24, 0.7)):
        tt = np.clip(t - st, 0, None); env = (t >= st) * np.exp(-tt * 18) * (1 - np.exp(-tt * 400))
        x += a * env * np.sin(2 * np.pi * (52 + 30 * np.exp(-tt * 30)) * tt)
    return x
def clock():  # tick ... tock, dry and close
    t = t_(1.0); x = np.zeros_like(t)
    for st, f0 in ((0.0, 3100), (0.5, 2300)):
        tt = np.clip(t - st, 0, None); env = (t >= st) * np.exp(-tt * 260)
        x += env * (np.sin(2 * np.pi * f0 * tt) + 0.6 * rng.standard_normal(len(t)) * np.exp(-tt * 500))
    return hpf(x, 600)
def boom():  # deep distant boom + long rumble tail
    t = t_(6.0); n = rng.standard_normal(len(t))
    sub = np.sin(2 * np.pi * (38 + 40 * np.exp(-t * 5)) * t) * np.exp(-t * 0.9) * (1 - np.exp(-t * 60))
    rum = lpf(n, 160) * np.exp(-t * 0.55) * (1 - np.exp(-t * 8)) * 3
    crack = lpf(n, 1800) * np.exp(-t * 9) * 0.6
    return verb(sub * 1.4 + rum + crack, 3.5, 0.3)
def tinnitus():
    t = t_(3.5); return np.sin(2 * np.pi * 4300 * t) * np.minimum(1, t * 6) * np.exp(-t * 0.9) * 0.6
def heli(d=10.0):  # rotor chop ~ 5.3 Hz + turbine whine, slow doppler swell
    t = t_(d); n = rng.standard_normal(len(t))
    chop = (0.5 + 0.5 * np.cos(2 * np.pi * 5.3 * t)) ** 6
    body = lpf(n, 420) * chop * 3 + np.sin(2 * np.pi * 21 * t) * chop * 0.6
    whine = np.sin(2 * np.pi * (1650 + 20 * np.sin(2 * np.pi * 0.2 * t)) * t) * 0.03
    swell = np.sin(np.pi * t / d) ** 1.2
    return verb((body + whine) * swell, 1.5, 0.25)
def police(d=8.0):  # US wail: sweep 650→1400 Hz, ~4 s cycle, then yelp for the last part
    t = t_(d)
    fwail = 1025 + 375 * np.sin(2 * np.pi * t / 4.0 - np.pi / 2)
    fyelp = 1025 + 375 * np.sign(np.sin(2 * np.pi * 3.2 * t)) * np.abs(np.sin(2 * np.pi * 3.2 * t)) ** 0.5
    f0 = np.where(t < d * 0.6, fwail, fyelp)
    ph = 2 * np.pi * np.cumsum(f0) / SR
    x = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.15 * np.sin(3 * ph)
    x = lpf(np.tanh(x * 1.4), 3500) * np.minimum(1, t * 2) * np.minimum(1, (d - t) * 2)
    return verb(x, 1.8, 0.45)
def bed(total=44.2, cut=5.55):  # dark tension bed: drone + dissonant high cluster + riser to the flash, silence, then dread pulse
    t = t_(total); x = np.zeros_like(t)
    drone = (np.sin(2 * np.pi * 41.2 * t) + 0.5 * np.sin(2 * np.pi * 43.65 * t) + 0.3 * np.sin(2 * np.pi * 82.4 * t))
    swell = np.minimum(1, t / 3) * (0.7 + 0.3 * np.sin(2 * np.pi * t / 9))
    x += np.tanh(drone * 1.3) * swell * 0.55
    cl = sum(np.sin(2 * np.pi * f * t + 2 * np.sin(2 * np.pi * (4.5 + i) * t) * 0.02) for i, f in enumerate((659.3, 698.5, 932.3)))
    x += lpf(cl, 2500) * 0.06 * np.minimum(1, t / 4)
    n = rng.standard_normal(len(t))
    ris = (t > 2.6) * (t < cut) * np.clip((t - 2.6) / (cut - 2.6), 0, 1) ** 2.5
    x += hpf(lpf(n, 6000), 900) * ris * 0.35 + np.sin(2 * np.pi * (200 + 900 * ris) * t) * ris * 0.12
    gate = np.where(t < cut, 1.0, np.clip((t - cut - 1.6) / 2.0, 0, 1))  # hard cut at the flash, back after ~1.6 s
    x *= gate
    pulse = np.zeros_like(t)
    for st in np.arange(cut + 2.0, total, 60 / 68):
        tt = np.clip(t - st, 0, None); pulse += (t >= st) * np.exp(-tt * 9) * np.sin(2 * np.pi * 48 * tt)
    x += pulse * 0.5
    x *= np.minimum(1, (total - t) * 1.5)
    return verb(x, 4.0, 0.35)

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    w('sfx_heart.wav', heartbeat()); w('sfx_clock.wav', clock(), 0.7); w('sfx_boom.wav', boom(), 0.95)
    w('sfx_tinnitus.wav', tinnitus(), 0.25); w('sfx_heli.wav', heli(), 0.8); w('sfx_police.wav', police(), 0.7)
    import sys
    if 'dread' in sys.argv:
        w('dread_bed.wav', bed(total=252.0, cut=-10.0), 0.8)  # body of the episode: drone + slow dread pulse, no riser
    else:
        w('hook_bed.wav', bed(), 0.8)
