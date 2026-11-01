import sys, json, wave, numpy as np
from piper import PiperVoice, SynthesisConfig
voice = PiperVoice.load("voices/en_US-ryan-high.onnx")
LINES = [
 ("l1","Doing nothing made her millions."),
 ("l2","This is Grace Groner."),
 ("l3","She was a secretary at Abbott Laboratories for forty-three years."),
 ("l4","In 1935, she spent one hundred eighty dollars on three shares."),
 ("l5","This is a trader."),
 ("l6","He bought. He sold. He checked the price every day."),
 ("l7","Grace reinvested every dividend. And never sold."),
 ("l8","She bought her clothes at rummage sales."),
 ("l9","Recessions came. Markets crashed."),
 ("l10","The trader sold in a panic."),
 ("l11","Grace just waited."),
 ("l12","When she died at one hundred, she left seven million dollars to her college."),
 ("l13","Time beats effort."),
]
scale=float(sys.argv[1]); GAP=float(sys.argv[2])
cfg=SynthesisConfig(length_scale=scale, noise_scale=0.55, noise_w_scale=0.6)
sr=voice.config.sample_rate; t=0.15; out=[]; allv=[]
for k,txt in LINES:
    a=np.concatenate([c.audio_float_array for c in voice.synthesize(txt, syn_config=cfg)])
    nz=np.where(np.abs(a)>0.015)[0]; a=a[max(nz[0]-int(.02*sr),0):min(nz[-1]+int(.06*sr),len(a))]   # trim silence
    a16=(np.clip(a,-1,1)*32767).astype(np.int16)
    with wave.open(f"v002/{k}.wav","wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(a16.tobytes())
    d=len(a)/sr; out.append({"k":k,"t":round(t,3),"d":round(d,3),"text":txt}); t+=d+GAP
    if k in ("l1","l4","l7","l10","l12"): t+=0.08   # tiny breath only after key beats
print(round(t,2))
open("v002/timing-002.js","w").write("const VO="+json.dumps(out)+";")
