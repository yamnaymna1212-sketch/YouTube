# Sound design for the Episode 1 hook, mixed under the narrator.
# Original sounds only (no copyrighted ringtones). Usage:
#   python3 hook_audio.py <vo.mp3> <vo_offset_s> <out.wav> <ring_end> <whoosh> <hit>
import subprocess, sys, wave
import numpy as np

SR = 48000
DUR = 5.0
vo_path, vo_off, out = sys.argv[1], float(sys.argv[2]), sys.argv[3]
RING_END, WHOOSH, HIT = map(float, sys.argv[4:7])  # call accepted / phone zooms in / caller name lands
t = np.arange(int(SR * DUR)) / SR
mix = np.zeros_like(t)
rng = np.random.default_rng(7)

def env(x, a, d):  # attack / exponential decay envelope
    return np.clip(x / a, 0, 1) * np.exp(-np.maximum(x - a, 0) / d)

# 1. Urgent digital ring: alternating 1400/1800 Hz beeps, 4 pairs, then a short gap
ring = np.zeros_like(t)
cycle = 0.70
for start in np.arange(0, RING_END, cycle):
    for k in range(8):
        s0 = start + k * 0.062
        idx = (t >= s0) & (t < s0 + 0.055)
        f = 1400 if k % 2 == 0 else 1800
        x = t[idx] - s0
        ring[idx] += np.sign(np.sin(2 * np.pi * f * x)) * 0.25 + np.sin(2 * np.pi * f * x) * 0.5
ring *= (t < RING_END)

# 2. Phone vibrating on a wooden nightstand: 160 Hz buzz + rattle, 0.4 s on / 0.3 s off
buzz_on = ((t % 0.7) < 0.4) & (t < RING_END)
buzz = (np.sin(2 * np.pi * 160 * t) + 0.5 * np.sign(np.sin(2 * np.pi * 320 * t))) * 0.22
rattle = np.convolve(rng.standard_normal(len(t)), np.ones(40) / 40, mode='same') * 0.6
vib = (buzz + rattle * np.sin(2 * np.pi * 160 * t)) * buzz_on
vib = np.convolve(vib, np.ones(30) / 30, mode='same')  # soften clicks

# 3. Whoosh: noise swept up through a moving low-pass, 0.55 s
wx = t - WHOOSH
w_idx = (wx >= 0) & (wx < 0.55)
noise = rng.standard_normal(w_idx.sum())
k = np.linspace(80, 6, w_idx.sum()).astype(int)
smooth = np.array([noise[max(0, i - k[i]):i + 1].mean() for i in range(len(noise))])
whoosh = np.zeros_like(t)
whoosh[w_idx] = smooth * np.sin(np.pi * wx[w_idx] / 0.55) ** 2 * 1.6

# 4. Bass hit when the name lands: 60 -> 38 Hz drop + click
hx = t - HIT
hit = np.where(hx >= 0, np.sin(2 * np.pi * (60 - 22 * np.clip(hx / 0.4, 0, 1)) * hx) * env(np.maximum(hx, 0), 0.005, 0.35), 0)
hit += np.where((hx >= 0) & (hx < 0.01), rng.standard_normal(len(t)) * 0.4, 0)

# 5. Accept click + two heartbeats after the ring stops
cx = t - RING_END
click = np.where((cx >= 0) & (cx < 0.012), np.sin(2 * np.pi * 2500 * cx) * 0.5, 0)
beat = np.zeros_like(t)
for b in (4.35, 4.62, 5.05):
    bx = t - b
    beat += np.where(bx >= 0, np.sin(2 * np.pi * 52 * bx) * env(np.maximum(bx, 0), 0.004, 0.09), 0) * 0.9

# 6. Low tension drone (A minor), fades in fast
drone = sum(np.sin(2 * np.pi * f * t + p) * a for f, p, a in [(55, 0, 0.5), (82.4, 1, 0.3), (110.3, 2, 0.25), (130.8, 0.5, 0.15)])
drone *= np.clip(t / 0.3, 0, 1) * (0.85 + 0.15 * np.sin(2 * np.pi * 0.7 * t)) * 0.18

# narrator
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vo_path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout
vo = np.frombuffer(raw, dtype=np.int16).astype(np.float64) / 32768
voice = np.zeros_like(t)
o = int(vo_off * SR)
if o < 0: vo, o = vo[-o:], 0
n = min(len(vo), len(t) - o)
voice[o:o + n] = vo[:n]
# duck the ring and buzz under the voice
vo_env = np.convolve(np.abs(voice), np.ones(2400) / 2400, mode='same')
duck = 1 - 0.6 * np.clip(vo_env / (vo_env.max() + 1e-9) * 3, 0, 1)

# The narrator always leads: effects sit ~12 dB under the voice and duck further while he speaks
voice /= np.max(np.abs(voice)) + 1e-9
sfx = ring * 0.32 + vib * 0.55 + whoosh * 0.35 + hit * 0.9 + click + beat * 0.7 + drone
speaking = vo_env > vo_env.max() * 0.15
v_rms = np.sqrt(np.mean(voice[speaking] ** 2))
sfx *= v_rms * 0.25 / (np.sqrt(np.mean(sfx ** 2)) + 1e-9)
sfx *= min(1, 0.45 / (np.max(np.abs(sfx)) + 1e-9))
mix = voice + sfx * duck
mix *= np.clip((DUR - t) / 0.25, 0, 1)  # short fade-out at the end
mix = mix / np.max(np.abs(mix)) * 0.92
with wave.open(out, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('wrote', out)
