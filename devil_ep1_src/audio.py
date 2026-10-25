import numpy as np, wave, json
TL=json.load(open('timeline.json')); D=TL['END']; SR=44100; N=int(SR*D)
rng=np.random.default_rng(11); L=np.zeros(N); R=np.zeros(N); t=np.arange(N)/SR
B={b['id']:b['t0'] for b in TL['beats']}; B['b1']=0.0
LN={l['id']:l for l in TL['lines']}
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
# ---------- calm cinematic ambient music ----------
def pc(freqs,a,b,amp=1.):
    s=sum(np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*1.004*t+1)+.25*np.sin(2*np.pi*f*2*t) for f in freqs)
    e=np.clip((t-a)/3.0,0,1)*np.clip((b-t)/3.0,0,1); return s*e*amp
Am=[110,164.8,220,261.6];F=[87.3,130.8,174.6,261.6];C=[130.8,196,261.6,329.6];G=[98,146.8,196,246.9];Dm=[73.4,110,146.8,220];E7=[82.4,123.5,164.8,207.7]
prog=[(0,12,Am),(11,23,F),(22,34,C),(33,45,G),(44,56,Am),(55,67,Dm),(66,78,E7),(77,89,Am),(88,100,F),(99,111,C),(110,122,G),(120,D,C)]
music=sum(pc(f,a,min(b,D)) for a,b,f in prog)*.0105
sub=(np.sin(2*np.pi*55*t)*.5+np.sin(2*np.pi*82.4*t)*.3)*.010*np.clip(t/5,0,1)*(.6+.4*np.sin(2*np.pi*.07*t))
shimmer=bp(noise(D),2500,7000)*.0016*(1+np.sin(2*np.pi*.11*t))
music=music*(.75+.25*np.sin(2*np.pi*.06*t))+sub+shimmer
L+=music; R+=np.roll(music,int(.014*SR))
notes=[220,261.6,329.6,392,329.6,261.6]
k=0
for a in np.arange(3.0,D-6,5.2):
    add(piano(notes[k%6],4.5,.06),a,(k%5-2)*.12,1.0);k+=1
# ---------- soft sfx ----------
def pop(t0,p=0.): add(mix(tone(520,.12,.002,.04)*.5,tone(780,.1,.002,.03)*.3),t0,p,.35)
def thud(t0,g=1.): add(mix(tone(70,.5,.003,.14)*.7,bp(noise(.3),80,900)*env(int(.3*SR),.002,.07)*.45),t0,0,.55*g)
def swish(t0,d=.35,p=0.): n=noise(d); add(bp(n,1200,6000)*np.sin(np.linspace(0,np.pi,len(n)))*.18,t0,p,.5)
def ding(t0,f=1318): add(mix(bell(f,1.0)*.22,tone(f*1.5,.4,.002,.12)*.1),t0,.2,.5)
def buzz(t0): add(bp(noise(.4),90,240)*env(int(.4*SR),.01,.3)*.45,t0,.3,.5)
def frost(t0): add(bp(noise(.8),3500,9000)*env(int(.8*SR),.01,.35)*.16,t0,0,.5)
# b1 typing + card X
for i in range(60):
    tt=.05+i/30
    if tt<1.5 and i%5!=4: add(mix(bp(noise(.04),1500,7000)*env(int(.04*SR),.001,.008)*.35,tone(180,.04,.001,.01)*.2),tt,((i%5)-2)*.08,.5)
pop(.1); thud(B['b1']+1.8,.9)
# b2
for i,o in enumerate([.5,1.75,3.0]): pop(B['b2']+o,(i-1)*.4)
add(bp(noise(1.4),50,160)*env(int(1.4*SR),.1,.8)*.5,B['b2']+4.4,0,.4)
# b3
thud(B['b3']+.2); swish(B['b3']+1.4,.3)
for i,o in enumerate([2.2,3.4,4.6]): pop(B['b3']+o,-.2)
# b4
swish(B['b4']+.8,.4,.3); ding(B['b4']+1.2)
# b5
thud(B['b5']+1.0,.8)
for i in range(14): add(tone(900-i*35,.05,.001,.02)*.28,B['b5']+1.7+i*.17,.2,.5)
# b6
for i in range(10): add(tone(1000,.03,.001,.012)*.18,B['b6']+1+i*.5,.3,.5)
for o in np.arange(.5,7,1.6): add(bp(noise(1.2),200,500)*env(int(1.2*SR),.3,.5)*.05,B['b6']+o,-.4,1)
# b7
for o in [.5,1.6,2.7]: buzz(B['b7']+o); pop(B['b7']+o+.45,.3)
frost(B['b7']+3.3)
# b8
thud(B['b8']+1.8,1.1)
cb=LN['b8b']['t0']
for i in range(10): add(tone(rng.uniform(900,2000),.12,.002,.04)*.12,cb+.1+i*.07,rng.uniform(-.6,.6),.5)
# b9
swish(B['b9']+.4,.5,-.5); thud(B['b9']+4.8,1.1); thud(B['b9']+5.05,.8)
# b10
swish(B['b10']+1.6,.6,.2); frost(B['b10']+4.2); thud(B['b10']+5.2,.8)
# b11
no=LN['b11b']['t0']
for o in [.6,.75,.9]: add(mix(tone(1200,.5,.002,.25)*.1,tone(1800,.4,.002,.15)*.05),B['b11']+o,0,.5)
swish(no-.1,.5); thud(no+.25,1.2); swish(no+3.2,.4)
# b12
for o in [.8,1.8,2.8]: pop(B['b12']+o)
add(mix(tone(300,4.5,.1,3)*.05,tone(450,4.5,.1,3)*.03),B['b12']+3.2,0,.6)
# b13
for o in [.6,2.6,4.4]: pop(B['b13']+o)
swish(B['b13']+8.0,.4)
# b14
d=LN['b14a']; dur=d['t1']-d['t0']
for fr in [.12,.26,.42,.58,.74,.92]: ding(d['t0']+dur*fr-.3,880)
# b15 ringback + success + end swell
rb=lambda d_: (np.sin(2*np.pi*440*np.arange(int(d_*SR))/SR)+np.sin(2*np.pi*480*np.arange(int(d_*SR))/SR))*.04
add(bp(rb(1.8),300,3400),B['b15']+.8,.3,.7); add(bp(rb(1.0),300,3400),B['b15']+2.9,.3,.7)
ding(B['b15']+4.0,1568)
thud(LN['b15c']['t0']+.2,.7)
# ---------- voices + ducking ----------
PAN={'jay':0.,'devil':-.35,'angel':.3}
vL=np.zeros(N); vR=np.zeros(N); duck=np.ones(N)
for l in TL['lines']:
    v=read(f"vo/{l['id']}.wav"); g=.95 if l['spk']=='jay' else .88
    add(v,l['t0'],PAN[l['spk']],g,(vL,vR)); i=int(l['t0']*SR); duck[max(0,i-4000):i+len(v)+4000]=.38
k=np.hanning(13231); k/=k.sum(); duck=np.convolve(duck,k,'same')
L=L*duck+vL; R=R*duck+vR
fade=np.minimum(t/.4,1)*np.clip((D-t)/1.2,0,1); L*=fade; R*=fade
pk=max(abs(L).max(),abs(R).max()); L=np.tanh(L/pk*1.2)*.9; R=np.tanh(R/pk*1.2)*.9
o=np.empty(N*2,np.int16); o[0::2]=(L*32767).astype(np.int16); o[1::2]=(R*32767).astype(np.int16)
with wave.open('audio.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(o.tobytes())
print('audio ok',D)
