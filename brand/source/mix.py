# Generic episode mixer: voice clips + synthesized effects from a JSON timeline.
# The voice always leads: effects sit ~12 dB under it and duck further while someone speaks.
# Usage: python3 mix.py <timeline.json> <out.wav>
import json, subprocess, sys, wave
import numpy as np

SR = 48000
spec = json.load(open(sys.argv[1]))
DUR = spec['dur']
t = np.arange(int(SR * DUR)) / SR
rng = np.random.default_rng(7)

def env(x, a, d):
    return np.clip(x / a, 0, 1) * np.exp(-np.maximum(x - a, 0) / d)
def lp(x, n):  # cheap low-pass
    return np.convolve(x, np.ones(n) / n, mode='same')
def at(s):
    return t - s

def ring(s, e):
    out = np.zeros_like(t)
    for st in np.arange(s, e, 0.7):
        for k in range(8):
            s0 = st + k * 0.062; idx = (t >= s0) & (t < min(s0 + 0.055, e)); f = 1400 if k % 2 == 0 else 1800; x = t[idx] - s0
            out[idx] += np.sign(np.sin(2 * np.pi * f * x)) * 0.25 + np.sin(2 * np.pi * f * x) * 0.5
    return out * 0.32
def vib(s, e, gain=0.55):
    on = (((t - s) % 0.7) < 0.4) & (t >= s) & (t < e)
    buzz = np.sin(2 * np.pi * 160 * t) + 0.5 * np.sign(np.sin(2 * np.pi * 320 * t))
    return lp(buzz * on * 0.22 + lp(rng.standard_normal(len(t)), 40) * 0.6 * np.sin(2 * np.pi * 160 * t) * on, 30) * gain
def whoosh(s, d=0.55):
    x = at(s); idx = (x >= 0) & (x < d); n = rng.standard_normal(idx.sum()); k = np.linspace(80, 6, idx.sum()).astype(int)
    sm = np.array([n[max(0, i - k[i]):i + 1].mean() for i in range(len(n))]); out = np.zeros_like(t)
    out[idx] = sm * np.sin(np.pi * x[idx] / d) ** 2 * 1.6; return out * 0.35
def hit(s, f0=60):
    x = at(s); xp = np.maximum(x, 0)
    return np.where(x >= 0, np.sin(2 * np.pi * (f0 - 22 * np.clip(xp / 0.4, 0, 1)) * xp) * env(xp, 0.005, 0.35), 0) * 0.9
def click(s):
    x = at(s); return np.where((x >= 0) & (x < 0.012), np.sin(2 * np.pi * 2500 * x) * 0.5, 0)
def beat(s):
    x = at(s); xp = np.maximum(x, 0); return np.where(x >= 0, np.sin(2 * np.pi * 52 * xp) * env(xp, 0.004, 0.09), 0) * 0.63
def rain(s, e):
    n = lp(rng.standard_normal(len(t)), 3) - lp(rng.standard_normal(len(t)), 60)
    drops = (rng.random(len(t)) < 0.0009) * rng.random(len(t)); drops = lp(drops, 8) * 6
    g = np.clip((t - s) / 0.2, 0, 1) * np.clip((e - t) / 0.2, 0, 1)
    return (n * 0.35 + drops) * g * 0.6
def crash(s):
    x = at(s); xp = np.maximum(x, 0)
    thud = np.where(x >= 0, np.sin(2 * np.pi * 90 * xp) * env(xp, 0.002, 0.08), 0)
    plastic = np.where(x >= 0, lp(rng.standard_normal(len(t)), 2) * env(xp, 0.001, 0.05), 0)
    rattle = sum(np.where(x >= d, lp(rng.standard_normal(len(t)), 3) * env(np.maximum(x - d, 0), 0.001, 0.02), 0) * a for d, a in [(0.12, 0.5), (0.2, 0.3), (0.26, 0.2)])
    return (thud * 1.2 + plastic * 0.8 + rattle) * 0.9
def text_tone(s):
    out = np.zeros_like(t)
    for d, f in [(0, 1318.5), (0.09, 1760)]:
        x = at(s + d); xp = np.maximum(x, 0); out += np.where(x >= 0, (np.sin(2 * np.pi * f * xp) + 0.3 * np.sin(4 * np.pi * f * xp)) * env(xp, 0.003, 0.12), 0)
    return out * 0.5
def knock(s):
    x = at(s); xp = np.maximum(x, 0)
    return np.where(x >= 0, (np.sin(2 * np.pi * 110 * xp) * 0.8 + lp(rng.standard_normal(len(t)), 6) * 0.9) * env(xp, 0.001, 0.045), 0) * 1.4
def drone(s, e, gain=0.18, root=55):
    d = sum(np.sin(2 * np.pi * f * t + p) * a for f, p, a in [(root, 0, 0.5), (root * 1.498, 1, 0.3), (root * 2.005, 2, 0.25), (root * 2.378, 0.5, 0.15)])
    g = np.clip((t - s) / 0.3, 0, 1) * np.clip((e - t) / 0.4, 0, 1)
    return d * g * (0.85 + 0.15 * np.sin(2 * np.pi * 0.7 * t)) * gain
def pad(s, e, gain=0.14):  # dreamy flashback pad
    d = sum(np.sin(2 * np.pi * f * t) * a * (1 + 0.3 * np.sin(2 * np.pi * 0.25 * t + f)) for f, a in [(220, 0.4), (277.2, 0.3), (329.6, 0.3), (440, 0.15)])
    g = np.clip((t - s) / 0.4, 0, 1) * np.clip((e - t) / 0.4, 0, 1)
    return lp(d, 4) * g * gain

def bang(s):  # heavy fist on a wooden door
    x = at(s); xp = np.maximum(x, 0)
    thud = np.sin(2 * np.pi * 65 * xp) * env(xp, 0.002, 0.2) * 1.5
    wood = lp(rng.standard_normal(len(t)), 3) * env(xp, 0.001, 0.07) * 1.1
    frame = np.sin(2 * np.pi * 180 * xp) * env(xp, 0.003, 0.12) * 0.5
    rattle = sum(np.where(x >= d, lp(rng.standard_normal(len(t)), 5) * env(np.maximum(x - d, 0), 0.002, 0.05), 0) * a for d, a in [(0.05, 0.35), (0.11, 0.2)])
    return np.where(x >= 0, thud + wood + frame, 0) + rattle
def slide(s, d=0.6):  # paper sliding across a floor
    x = at(s); idx = (x >= 0) & (x < d)
    out = np.zeros_like(t); n = lp(rng.standard_normal(idx.sum()), 14) * 3
    out[idx] = n * np.sin(np.pi * x[idx] / d) ** 1.5
    return out * 0.7

def creak(s, d=0.9):  # old door hinge opening
    x = at(s); idx = (x >= 0) & (x < d); out = np.zeros_like(t); xi = x[idx]
    f = 180 + 120 * np.sin(np.pi * xi / d) + 25 * np.sin(2 * np.pi * 9 * xi)
    tone = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (0.5 + 0.5 * np.sin(2 * np.pi * 23 * xi) ** 2)
    out[idx] = lp(tone, 6) * np.sin(np.pi * xi / d) ** 0.7
    return out * 0.45
def step(s, gain=1.0):  # soft footstep on a hallway floor
    x = at(s); xp = np.maximum(x, 0)
    return np.where(x >= 0, np.sin(2 * np.pi * 80 * xp) * env(xp, 0.004, 0.05) + lp(rng.standard_normal(len(t)), 8) * env(xp, 0.002, 0.03) * 0.6, 0) * 0.8 * gain

FX = dict(creak=creak, step=step, bang=bang, slide=slide, ring=ring, vib=vib, whoosh=whoosh, hit=hit, click=click, beat=beat, rain=rain, crash=crash, text_tone=text_tone, knock=knock, drone=drone, pad=pad)
sfx = np.zeros_like(t)
for e in spec['sfx']:
    sfx += FX[e['fx']](*e.get('args', []))

voice = np.zeros_like(t)
for v in spec['voices']:
    af = ['-af', v['filter']] if v.get('filter') else []
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', v['file'], *af, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout
    vo = np.frombuffer(raw, dtype=np.int16).astype(np.float64) / 32768
    vo = vo / (np.max(np.abs(vo)) + 1e-9) * v.get('gain', 1)
    o = int(v['at'] * SR)
    if o < 0: vo, o = vo[-o:], 0
    n = min(len(vo), len(t) - o); voice[o:o + n] += vo[:n]

vo_env = lp(np.abs(voice), 2400)
duck = 1 - 0.6 * np.clip(vo_env / (vo_env.max() + 1e-9) * 3, 0, 1)
speaking = vo_env > vo_env.max() * 0.15
v_rms = np.sqrt(np.mean(voice[speaking] ** 2))
sfx *= v_rms * 0.25 / (np.sqrt(np.mean(sfx ** 2)) + 1e-9)
sfx *= min(1, 0.45 / (np.max(np.abs(sfx)) + 1e-9))
mix = voice + sfx * duck
mix *= np.clip((DUR - t) / 0.4, 0, 1)
mix = mix / np.max(np.abs(mix)) * 0.92
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('wrote', sys.argv[2])
