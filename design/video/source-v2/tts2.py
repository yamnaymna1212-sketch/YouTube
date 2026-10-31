import sys, json, wave, numpy as np
from piper import PiperVoice, SynthesisConfig
voice = PiperVoice.load("voices/en_US-ryan-high.onnx")
LINES = [
 ("l1","Smart people go broke."),
 ("l2","Janitors die rich."),
 ("l3","This is Ronald Read."),
 ("l4","He pumped gas. Then he swept floors."),
 ("l5","This is a Wall Street executive."),
 ("l6","Top degrees. Big salary. A huge mansion."),
 ("l7","He borrowed money to live big."),
 ("l8","Ronald saved every dollar he could, and bought stocks."),
 ("l9","Then, in 2008, the market crashed."),
 ("l10","The executive lost everything."),
 ("l11","Ronald didn't sell. He just waited."),
 ("l12","When he died, he left eight million dollars. Most of it went to his town's hospital and library."),
 ("l13","Behavior beats brains."),
]
scale=float(sys.argv[1]); GAP=float(sys.argv[2])
cfg=SynthesisConfig(length_scale=scale, noise_scale=0.55, noise_w_scale=0.6)
sr=voice.config.sample_rate; t=0.15; out=[]; allv=[]
for k,txt in LINES:
    a=np.concatenate([c.audio_float_array for c in voice.synthesize(txt, syn_config=cfg)])
    nz=np.where(np.abs(a)>0.015)[0]; a=a[max(nz[0]-int(.02*sr),0):min(nz[-1]+int(.06*sr),len(a))]   # trim silence
    a16=(np.clip(a,-1,1)*32767).astype(np.int16)
    with wave.open(f"v2/{k}.wav","wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(a16.tobytes())
    d=len(a)/sr; out.append({"k":k,"t":round(t,3),"d":round(d,3),"text":txt}); t+=d+GAP
    if k in ("l2","l4","l7","l10","l12"): t+=0.08   # tiny breath only after key beats
print(round(t,2))
open("v2/timing.js","w").write("const VO="+json.dumps(out)+";")
