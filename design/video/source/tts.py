import sys, json, wave, numpy as np
from piper import PiperVoice, SynthesisConfig
voice = PiperVoice.load("voices/en_US-ryan-high.onnx")
LINES = {
 "l1":"Smart people go broke.",
 "l2":"Janitors die rich.",
 "l3":"Why?",
 "l4":"One was a Wall Street executive, with every degree, and every title.",
 "l5":"The other pumped gas, and swept floors.",
 "l6":"The executive borrowed big. Then the market crashed, and he went bankrupt.",
 "l7":"The janitor just saved. Invested. And waited.",
 "l8":"When Ronald Read died, he left behind eight million dollars.",
 "l9":"Getting rich isn't about being smart. It's about staying in the game.",
 "l10":"One square at a time, even a pawn becomes a queen.",
 "l11":"Behavior beats brains.",
}
scale = float(sys.argv[1]) if len(sys.argv)>1 else 1.12
cfg = SynthesisConfig(length_scale=scale, noise_scale=0.6, noise_w_scale=0.7)
out = {}
for k,t in LINES.items():
    chunks = [c.audio_float_array for c in voice.synthesize(t, syn_config=cfg)]
    a = np.concatenate(chunks); sr = voice.config.sample_rate
    a16 = (np.clip(a,-1,1)*32767).astype(np.int16)
    with wave.open(f"voices/{k}.wav","wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(a16.tobytes())
    out[k]=round(len(a)/sr,2)
print(sr, json.dumps(out), "sum", round(sum(out.values()),1))
