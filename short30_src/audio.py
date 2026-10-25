import numpy as np, wave, json
TL=json.load(open('timeline.json')); D=TL['END']; SR=44100; N=int(SR*D)
rng=np.random.default_rng(3); L=np.zeros(N); R=np.zeros(N); t=np.arange(N)/SR
B={b['id']:b['t0'] for b in TL['beats']}; LN={l['id']:l for l in TL['lines']}
def pad(a,n): return a[:n] if len(a)>=n else np.pad(a,(0,n-len(a)))
def mix(*s): n=max(len(a) for a in s); return sum(pad(a,n) for a in s)
def add(sig,t0,pan=0.,g=1.,dst=None):
    i=int(round(t0*SR)); n=min(len(sig),N-i)
    if n<=0 or i<0: return
    gl=np.sqrt(.5*(1-pan))*1.414; gr=np.sqrt(.5*(1+pan))*1.414
    d=dst or (L,R); d[0][i:i+n]+=sig[:n]*g*gl; d[1][i:i+n]+=sig[:n]*g*gr
def noise(d): return rng.standard_normal(int(d*SR))
def bp(s,lo,hi):
    F=np.fft.rfft(s); f=np.fft.rfftfreq(len(s),1/SR)
    return np.fft.irfft(F*np.clip((f-lo)/(lo*.3+5),0,1)*np.clip((hi-f)/(hi*.3+5),0,1),len(s))
def env(n,a,d): tt=np.arange(n)/SR; return np.minimum(tt/a,1)*np.exp(-tt/d)
def tone(f,d,a=.004,dec=.3): tt=np.arange(int(d*SR))/SR; return np.sin(2*np.pi*f*tt)*env(len(tt),a,dec)
def bell(f,d=1.2): return mix(tone(f,d,.002,.45),tone(f*2.01,d,.002,.25)*.4,tone(f*3.02,d,.002,.12)*.2)
def piano(f,d=4.0,v=1.):
    tt=np.arange(int(d*SR))/SR
    return v*sum(np.sin(2*np.pi*f*k*tt)*np.exp(-tt*(.9+k*.6))/k**1.4 for k in range(1,7))*np.minimum(tt/.006,1)
def read(p):
    with wave.open(p) as w: return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
def pc(freqs,a,b):
    s=sum(np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*1.004*t+1)+.25*np.sin(2*np.pi*f*2*t) for f in freqs)
    return s*np.clip((t-a)/2.0,0,1)*np.clip((b-t)/2.0,0,1)
Am=[110,164.8,220,261.6];F=[87.3,130.8,174.6,261.6];C=[130.8,196,261.6,329.6];G=[98,146.8,196,246.9]
music=(pc(Am,0,9)+pc(F,8,17)+pc(C,16,25)+pc(G,24,D))*.012
music+=(np.sin(2*np.pi*55*t)*.5+np.sin(2*np.pi*82.4*t)*.3)*.010*np.clip(t/3,0,1)+bp(noise(D),2500,7000)*.0016
L+=music; R+=np.roll(music,int(.014*SR))
for k,a in enumerate(np.arange(2.0,D-4,3.3)): add(piano([220,261.6,329.6,392][k%4],4,.06),a,(k%5-2)*.12)
def pop(t0,p=0.): add(mix(tone(520,.12,.002,.04)*.5,tone(780,.1,.002,.03)*.3),t0,p,.35)
def thud(t0,g=1.): add(mix(tone(70,.5,.003,.14)*.7,bp(noise(.3),80,900)*env(int(.3*SR),.002,.07)*.45),t0,0,.55*g)
def ding(t0,f=1318): add(mix(bell(f,1.0)*.22,tone(f*1.5,.4,.002,.12)*.1),t0,.2,.5)
for i in range(45):
    tt=.05+i/30
    if tt<1.4 and i%5!=4: add(mix(bp(noise(.04),1500,7000)*env(int(.04*SR),.001,.008)*.35,tone(180,.04,.001,.01)*.2),tt,((i%5)-2)*.08,.5)
pop(.1); thud(1.9,.9)
for i in range(14): add(tone(900-i*35,.05,.001,.02)*.28,B['s2']+.8+i*.12,.2,.5)
for i in range(8): add(tone(1000,.03,.001,.012)*.18,B['s3']+.7+i*.35,.3,.5)
for o in [.4,1.9,3.4]: pop(B['s4']+o)
add(bp(noise(.5),90,240)*env(int(.5*SR),.01,.3)*.4,B['s4']+.2,.3,.5)
no=LN['s5b']['t0']
for o in [.2,.35]: add(mix(tone(1200,.5,.002,.25)*.1,tone(1800,.4,.002,.15)*.05),B['s5']+o,0,.5)
thud(no+.25,1.2)
rb=lambda d_: (np.sin(2*np.pi*440*np.arange(int(d_*SR))/SR)+np.sin(2*np.pi*480*np.arange(int(d_*SR))/SR))*.04
add(bp(rb(1.4),300,3400),B['s6']+.3,.3,.7); ding(B['s6']+2.2,1568); thud(LN['s6c']['t0']+.2,.7)
PAN={'jay':0.,'devil':-.35,'angel':.3}
vL=np.zeros(N); vR=np.zeros(N); duck=np.ones(N)
for l in TL['lines']:
    v=read(f"vo/{l['id']}.wav"); add(v,l['t0'],PAN[l['spk']],.95 if l['spk']=='jay' else .88,(vL,vR)); i=int(l['t0']*SR); duck[max(0,i-4000):i+len(v)+4000]=.38
k=np.hanning(13231); k/=k.sum(); duck=np.convolve(duck,k,'same'); L=L*duck+vL; R=R*duck+vR
fade=np.minimum(t/.3,1)*np.clip((D-t)/.8,0,1); L*=fade; R*=fade
pk=max(abs(L).max(),abs(R).max()); L=np.tanh(L/pk*1.2)*.9; R=np.tanh(R/pk*1.2)*.9
o=np.empty(N*2,np.int16); o[0::2]=(L*32767).astype(np.int16); o[1::2]=(R*32767).astype(np.int16)
with wave.open('audio.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(o.tobytes())
print('audio ok')
