# Case File 003 narration — Microsoft Neural "Christopher" (deep, clear US), every pause cut.
# usage: python3 tts-003.py   -> v003/l*.wav (44.1k mono) + timing-003.js
import asyncio, ssl, json, subprocess, os, numpy as np, wave
import edge_tts, edge_tts.communicate as c
c._SSL_CTX = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE","/root/.ccr/ca-bundle.crt"))
VOICE, RATE, PITCH = "en-US-ChristopherNeural", "-4%", "-8Hz"
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
SR, GAP, MAXSIL, KEEP = 44100, 0.06, 0.07, 0.05
os.makedirs("v003", exist_ok=True)
async def synth():
    for k, txt in LINES:
        await edge_tts.Communicate(txt, VOICE, rate=RATE, pitch=PITCH).save(f"v003/{k}.mp3")
asyncio.run(synth())
def load(p):
    raw = subprocess.run(["ffmpeg","-v","error","-i",p,"-ac","1","-ar",str(SR),"-f","f32le","-"],capture_output=True,check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()
def cut_pauses(a):
    hop = int(.01*SR); n = len(a)//hop
    rms = np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)) for i in range(n)])
    thr = max(.006, .06*np.percentile(rms, 95)); loud = rms > thr
    idx = np.where(loud)[0]; a0, a1 = max(idx[0]-2,0), min(idx[-1]+5,n)   # trim head/tail
    out, i = [], a0
    while i < a1:
        if loud[i]: out.append(a[i*hop:(i+1)*hop]); i += 1; continue
        j = i
        while j < a1 and not loud[j]: j += 1
        run = j - i
        keep = run if run*hop/SR <= MAXSIL else int(KEEP*SR/hop)          # long inner silence -> 50 ms
        seg = a[i*hop:(i+keep)*hop]
        if keep < run: seg = seg*np.linspace(1,0,len(seg))**.5            # soft edge
        out.append(seg); i = j
    return np.concatenate(out)
t, timing = 0.12, []
for k, txt in LINES:
    a = cut_pauses(load(f"v003/{k}.mp3")); a = a/np.max(np.abs(a))*.95
    with wave.open(f"v003/{k}.wav","wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((a*32767).astype(np.int16).tobytes())
    d = len(a)/SR; timing.append({"k":k,"t":round(t,3),"d":round(d,3),"text":txt}); t += d + GAP
print(round(t,2))
open("timing-003.js","w").write("const VO="+json.dumps(timing)+";")
