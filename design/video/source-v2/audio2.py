import numpy as np, wave, json, re
from scipy import signal
SR=44100; DUR=33.5; N=int(SR*DUR); rng=np.random.default_rng(11)
VO=json.loads(open('timing.js').read()[9:-1])
Ls={}
for o in VO:
    ws=o['text'].split(' '); wt=[len(w)+1+(2 if re.search(r'[.,]$',w) else 0) for w in ws]; tot=sum(wt); acc=0; out=[]
    for w,x in zip(ws,wt):
        out.append((re.sub(r"[^a-z0-9']","",w.lower()),o['t']+.03+(o['d']-.06)*acc/tot)); acc+=x
    o['words']=out; Ls[o['k']]=o
def W(k,f,n=0):
    c=[t for w,t in Ls[k]['words'] if w.startswith(f)]; return c[n] if n<len(c) else c[0]
S=lambda k:Ls[k]['t']; E=lambda k:Ls[k]['t']+Ls[k]['d']
L=np.zeros(N); R=np.zeros(N); SL=np.zeros(N); SRr=np.zeros(N)
def add(sig,t0,gain=1.0,pan=0.0,send=0.0):
    i=int(t0*SR)
    if i>=N or i+len(sig)<0: return
    x=sig if i>=0 else sig[-i:]; i=max(i,0); x=x[:N-i]; n=len(x)
    gl=gain*np.sqrt(.5*(1-pan)); gr=gain*np.sqrt(.5*(1+pan))
    L[i:i+n]+=x*gl; R[i:i+n]+=x*gr; SL[i:i+n]+=x*gl*send; SRr[i:i+n]+=x*gr*send
sos=lambda k,fc,o=2: signal.butter(o,fc,k,fs=SR,output='sos')
bp=lambda x,lo,hi: signal.sosfilt(signal.butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
def norm(x,pk=1.0): return x/(np.max(np.abs(x))+1e-9)*pk
def tt(d): return np.arange(int(d*SR))/SR
def boom(d=1.6,f0=70,f1=32):
    t=tt(d); f=f1+(f0-f1)*np.exp(-t*6); return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*2.4)+.3*signal.sosfilt(sos('low',150),rng.normal(size=len(t)))*np.exp(-t*9))
def whoosh(d=.45,lo=300,hi=6000):
    n=int(d*SR); x=rng.normal(size=n); out=np.zeros(n); b=int(.015*SR)
    for i in range(0,n,b):
        c=lo*(hi/lo)**np.sin(np.pi*i/n); out[i:i+b]=signal.sosfilt(signal.butter(2,[c*.7,min(c*1.4,20000)],'band',fs=SR,output='sos'),x[i:i+b])
    return norm(out*np.sin(np.pi*np.linspace(0,1,n))**1.5)
def pop(f=520):
    t=tt(.09); f_=f*(1+1.2*np.minimum(t/.04,1)); return norm(np.sin(2*np.pi*np.cumsum(f_)/SR)*np.exp(-t*45)*np.minimum(t/.002,1)+.3*signal.sosfilt(sos('high',3000),rng.normal(size=len(t)))*np.exp(-t*300))
def ping(f,d=1.4,b=1.0):
    t=tt(d); x=sum(a*np.sin(2*np.pi*f*m*t)*np.exp(-t/(dd*d*.5)) for m,a,dd in [(1,1,1.4),(2.76,.45*b,.8),(5.4,.25*b,.4)]); return norm(x*np.minimum(t/.003,1))
def clink(f=None):
    f=f or rng.uniform(2600,3600); t=tt(.25); return norm(sum(np.sin(2*np.pi*f*m*t)*np.exp(-t*k) for m,k in [(1,18),(1.51,26),(2.37,40)])*np.minimum(t/.001,1))
def tock(f=200):
    t=tt(.16); return norm(np.sin(2*np.pi*f*t*(1+.3*np.exp(-t*60)))*np.exp(-t*38)+.7*bp(rng.normal(size=len(t)),900,3200)*np.exp(-t*90))
def tick():
    t=tt(.03); return norm(signal.sosfilt(sos('high',2500),rng.normal(size=len(t)))*np.exp(-t*350))
def crack(d=.8):
    t=tt(d); x=signal.sosfilt(sos('high',2000),rng.normal(size=len(t)))*np.exp(-t*30)*.8
    for _ in range(12):
        i=int(rng.uniform(0,.4)*SR); s=tt(.1); f=rng.uniform(2500,8000); seg=np.sin(2*np.pi*f*s)*np.exp(-s*rng.uniform(25,70))*rng.uniform(.15,.5); x[i:i+len(s)]+=seg[:len(x)-i]
    return norm(x+np.sin(2*np.pi*90*t)*np.exp(-t*10)*.7)
def rumble(d=1.4):
    t=tt(d); u=t/d; return norm(signal.sosfilt(sos('low',170),rng.normal(size=len(t)))*u**1.4+np.sin(2*np.pi*np.cumsum(300*np.exp(-u*2))/SR)*.3*u)*np.minimum((d-t)/.08,1)
def riser(d=1.0,f0=300,f1=2500):
    t=tt(d); u=t/d; return norm((np.sin(2*np.pi*np.cumsum(f0*(f1/f0)**u)/SR)*.5+signal.sosfilt(sos('high',1500),rng.normal(size=len(t)))*.5*u)*u**2)
def brush(d=.35):
    t=tt(d); return norm(bp(rng.normal(size=len(t)),1500,6000)*np.sin(np.pi*t/d)**2)
def stamp():
    t=tt(.6); return norm(np.sin(2*np.pi*55*t*(1+.6*np.exp(-t*25)))*np.exp(-t*7)+.6*bp(rng.normal(size=len(t)),300,1800)*np.exp(-t*30))
def chain(d=.5):
    x=np.zeros(int(d*SR))
    for i in range(7):
        c=clink(rng.uniform(1800,2600))*.5; j=int(i*d/7*SR); x[j:j+len(c)]+=c[:len(x)-j]
    return norm(x)
# ---- voice: clean & natural ----
for o in VO:
    w=wave.open(f"{o['k']}.wav"); a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
    a=signal.resample_poly(a,2,1); a=signal.sosfilt(sos('high',70),a); a=norm(a,.92)
    add(a,o['t'],1.0,0,0.0)
# ---- sfx timeline (mirrors anim2.html) ----
kB,kR=W('l1','broke'),W('l2','rich')
add(boom(1.8,70,30),0.0,.55,0,.3); add(pop(600),W('l1','smart')-.02,.3,-.3)
for i in range(3): add(clink(),W('l1','smart')+.2+.12*i,.12,-.4)
add(crack(),kB,.45,-.4,.3)
for i in range(3): add(clink(rng.uniform(1500,2200)),kB+.55+i*.08,.12,-.4)
for i in range(9): add(clink(),kR-.15+i*.07+.5,.16,.35,.2)
add(ping(1568,2.0),kR,.22,.3,.4); add(boom(1.2,70,35),kR,.35,0,.2)
add(whoosh(.4),S('l3')-.25,.25,.3); add(pop(700),W('l3','ronald'),.28,.4)
tG,tS=W('l4','pumped'),W('l4','swept'); add(pop(450),tG-.12,.3,-.3); add(tock(140),tG+.1,.35,-.3)
for i in range(4): add(brush(),tS+i*.7,.22,.2)
add(whoosh(.45),6.72,.32,-.4); add(riser(.8,200,1200),W('l5','wall')-.1,.18,0,.2)
for f,x in [('degrees',-.3),('salary',.3),('mansion',0)]: add(pop(560),W('l6',f)-.02,.3,x)
add(boom(1.0,60,30),W('l6','mansion'),.3,0,.2)
tB=W('l7','borrowed'); add(pop(380),tB-.12,.28,-.5); add(chain(.6),tB+.1,.25,-.3); add(pop(620),W('l7','big'),.28,.4)
add(whoosh(.45),13.45,.32,.4)
tSv=W('l8','saved')
for i in range(6): add(clink(),tSv+i*.28+.38,.2,(-1)**i*.15)
for i in range(3): add(pop(650+i*80),W('l8','stocks')-.05+i*.18,.25,.4)
add(whoosh(.5),16.88,.3,0)
add(boom(1.4,80,35),W('l9','2008'),.5,0,.3); add(rumble(1.3),W('l9','market')-.3,.45,0,.15); add(crack(),W('l9','crashed'),.4,0,.3); add(boom(1.0,60,30),W('l9','crashed'),.5)
add(whoosh(.45),19.85,.3,-.4)
tL=W('l10','lost'); add(crack(),tL,.5,-.2,.3); add(stamp(),tL+.12,.7,0,.2); add(boom(1.0,55,28),tL+.4,.5,-.2)
add(whoosh(.45),21.9,.3,.4)
add(pop(600),S('l11')-.05,.28,0); add(whoosh(.25,1500,8000),W('l11','sell'),.25,0)
tW=W('l11','waited'); add(whoosh(.5,300,3000),tW,.25,-.4); add(pop(520),tW-.05,.25,.4)
for i in range(6): add(tick(),tW+i*(E('l11')+.25-tW)/6,.3,.4)
tD=W('l12','died'); add(riser(.9,150,600),tD-.3,.15,0,.3)
kE=W('l12','eight')
for k in range(28):
    u=(k/28)**.8; add(tick(),kE-.1+1.2*u,.12+.18*u,(-1)**k*.15)
add(ping(2093,2.2),kE+1.1,.3,0,.5); add(ping(3136,1.8),kE+1.12,.14,.2,.5)
for f,fr in [('hospital',988),('library',1318)]: add(pop(560),W('l12',f)-.15,.3,.4); add(ping(fr,1.4,.6),W('l12',f),.14,.4,.4)
add(boom(1.2,70,32),W('l13','behavior'),.35); add(tock(260),W('l13','beats'),.3)
add(ping(1046.5,2.6),W('l13','brains'),.28,0,.6); add(ping(1568,2.4),W('l13','brains')+.02,.16,.2,.6); add(boom(2.0,65,28),W('l13','brains'),.45,0,.3)
# ---- music bed ----
t=tt(DUR)[:N]; bed=np.zeros(N)
for f,a in [(65.41,1),(98.0,.55),(130.81,.45),(155.56,.35),(196.0,.22)]: bed+=a*np.sin(2*np.pi*f*t+1.2*np.sin(2*np.pi*.05*t))*(.75+.25*np.sin(2*np.pi*.08*t+f))
bed=signal.sosfilt(sos('low',650),bed); bed=norm(bed)*np.minimum(t/1.5,1)*np.minimum((DUR-t)/1.5,1)
pulse=signal.sosfilt(sos('low',120),np.sin(2*np.pi*55*t))*(np.sin(2*np.pi*1.0*t)>.92)
add(bed,0,.09,0,.15); add(norm(pulse),0,.05)
# ---- reverb (sfx only) + master ----
n=int(2.0*SR); tr=np.arange(n)/SR; irs=[]
for _ in range(2):
    ir=signal.sosfilt(sos('low',1800),rng.normal(size=n)*np.exp(-tr*3.4)); irs.append(ir/np.sqrt(np.sum(ir**2)))
oL=L+signal.fftconvolve(SL,irs[0])[:N]*.8; oR=R+signal.fftconvolve(SRr,irs[1])[:N]*.8
st=np.vstack([oL,oR]); st=st/np.max(np.abs(st))*.95
st*=np.minimum(t/.02,1)*np.minimum((DUR-t)/.4,1)
with wave.open('mix2.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(st.T,-1,1)*32767).astype(np.int16).tobytes())
print('ok', DUR)
