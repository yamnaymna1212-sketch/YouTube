import sys, json, wave, numpy as np
from piper import PiperVoice, SynthesisConfig
voice = PiperVoice.load("voices/en_US-ryan-high.onnx")
LINES = [
 ("l1","Psychology says: if you hate losing,"),
 ("l2","you lose more."),
 ("l3","Meet two investors."),
 ("l4","Each owns two stocks. One is up. One is down."),
 ("l5","The first hates losing. So he sells the winner."),
 ("l6","And he holds the loser. Hoping it comes back."),
 ("l7","The second follows a rule. Not his feelings."),
 ("l8","In 1998, a study tracked ten thousand brokerage accounts."),
 ("l9","Investors sold winners one and a half times more often than losers."),
 ("l10","A loss hurts about twice as much as a gain feels good."),
 ("l11","Fear of losing costs you winners."),
 ("l12","Decide your sell rule before you buy."),
 ("l13","Pain is a bad advisor."),
]
scale=float(sys.argv[1]); GAP=float(sys.argv[2])
cfg=SynthesisConfig(length_scale=scale, noise_scale=0.55, noise_w_scale=0.6)
sr=voice.config.sample_rate; t=0.15; out=[]; allv=[]
for k,txt in LINES:
    a=np.concatenate([c.audio_float_array for c in voice.synthesize(txt, syn_config=cfg)])
    nz=np.where(np.abs(a)>0.015)[0]; a=a[max(nz[0]-int(.02*sr),0):min(nz[-1]+int(.06*sr),len(a))]   # trim silence
    a16=(np.clip(a,-1,1)*32767).astype(np.int16)
    with wave.open(f"v003/{k}.wav","wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(a16.tobytes())
    d=len(a)/sr; out.append({"k":k,"t":round(t,3),"d":round(d,3),"text":txt}); t+=d+GAP
    if k in ("l2","l4","l7","l10","l12"): t+=0.08   # tiny breath only after key beats
print(round(t,2))
open("v003/timing-003.js","w").write("const VO="+json.dumps(out)+";")
