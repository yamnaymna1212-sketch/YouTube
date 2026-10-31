import numpy as np, wave, json
from scipy import signal
SR=44100; DUR=35.0; N=int(SR*DUR)
rng=np.random.default_rng(7)
L=np.zeros(N); R=np.zeros(N); SL=np.zeros(N); SR_=np.zeros(N)   # dry L/R, reverb-send L/R
def env_ad(n,a,d):
    t=np.arange(n)/SR; e=np.minimum(t/max(a,1e-4),1)*np.exp(-t/max(d,1e-4)); return e
def add(sig,t0,gain=1.0,pan=0.0,send=0.0):
    i=int(t0*SR); 
    if i>=N: return
    x=sig[:N-i] if i>=0 else sig[-i:]; i=max(i,0); n=len(x)
    gl=gain*np.sqrt(.5*(1-pan)); gr=gain*np.sqrt(.5*(1+pan))
    L[i:i+n]+=x*gl; R[i:i+n]+=x*gr; SL[i:i+n]+=x*gl*send; SR_[i:i+n]+=x*gr*send
def sos(kind,fc,order=2): return signal.butter(order,fc,kind,fs=SR,output='sos')
def bp(x,lo,hi): return signal.sosfilt(signal.butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
def norm(x,pk=1.0): m=np.max(np.abs(x))+1e-9; return x/m*pk
# ---------- synth ----------
def boom(dur=1.6,f0=70,f1=32):
    t=np.arange(int(dur*SR))/SR; f=f1+(f0-f1)*np.exp(-t*6); ph=2*np.pi*np.cumsum(f)/SR
    x=np.sin(ph)*np.exp(-t*2.2)+.35*signal.sosfilt(sos('low',160),rng.normal(size=len(t)))*np.exp(-t*9)
    return norm(x)
def whoosh(dur=.8,up=True,lo=300,hi=6000):
    n=int(dur*SR); x=rng.normal(size=n); out=np.zeros(n); blk=int(.02*SR)
    for b in range(0,n,blk):
        u=b/n; u=u if up else 1-u; c=lo*(hi/lo)**(np.sin(np.pi*u*.5)**1.0)
        seg=x[b:b+blk]; out[b:b+blk]=signal.sosfilt(signal.butter(2,[c*.7,min(c*1.4,SR/2-100)],'band',fs=SR,output='sos'),seg)
    e=np.sin(np.pi*np.linspace(0,1,n))**1.6; return norm(out*e)
def tock(f=220):
    n=int(.18*SR); t=np.arange(n)/SR
    body=np.sin(2*np.pi*f*t*(1+.3*np.exp(-t*60)))*np.exp(-t*38)
    wood=bp(rng.normal(size=n),900,3200)*np.exp(-t*90)
    click=signal.sosfilt(sos('high',3500),rng.normal(size=n))*np.exp(-t*400)
    return norm(body*.9+wood*.8+click*.25)
def ping(f,dur=2.0,bright=1.0):
    t=np.arange(int(dur*SR))/SR; x=np.zeros_like(t)
    for k,(m,a,d) in enumerate([(1,1,1.6),(2.76,.5*bright,.9),(5.4,.28*bright,.45),(8.9,.12*bright,.25)]):
        x+=a*np.sin(2*np.pi*f*m*t)*np.exp(-t/(d*dur*.5))
    x*=np.minimum(t/.003,1); return norm(x)
def tick():
    n=int(.03*SR); t=np.arange(n)/SR; return norm(signal.sosfilt(sos('high',2500),rng.normal(size=n))*np.exp(-t*350)+.4*np.sin(2*np.pi*3400*t)*np.exp(-t*300))
def crack(dur=.9):
    n=int(dur*SR); t=np.arange(n)/SR; x=np.zeros(n)
    x+=signal.sosfilt(sos('high',2000),rng.normal(size=n))*np.exp(-t*30)*.8
    for _ in range(14):
        i=int(rng.uniform(0,.5)*SR); f=rng.uniform(2500,9000); m=int(.12*SR); tt=np.arange(m)/SR
        x[i:i+m]+=np.sin(2*np.pi*f*tt)*np.exp(-tt*rng.uniform(25,70))*rng.uniform(.15,.5)
    x+=np.sin(2*np.pi*90*t*np.exp(-t*3))*np.exp(-t*10)*.7
    return norm(x)
def riser(dur=1.5,f0=200,f1=3000):
    n=int(dur*SR); t=np.arange(n)/SR; u=t/dur; f=f0*(f1/f0)**u; ph=2*np.pi*np.cumsum(f)/SR
    x=np.sin(ph)*.5+signal.sosfilt(sos('high',1500),rng.normal(size=n))*.5*u
    return norm(x*u**2.2*np.minimum((dur-t)/.03,1))
def rumble(dur=1.6):
    n=int(dur*SR); t=np.arange(n)/SR; u=t/dur
    x=signal.sosfilt(sos('low',180),rng.normal(size=n))*u**1.5+np.sin(2*np.pi*np.cumsum(320*np.exp(-u*1.8))/SR)*.25*u
    return norm(x*np.minimum((dur-t)/.1,1))
def stamp():
    n=int(.7*SR); t=np.arange(n)/SR
    return norm(np.sin(2*np.pi*55*t*(1+.6*np.exp(-t*25)))*np.exp(-t*7)+bp(rng.normal(size=n),300,1800)*np.exp(-t*30)*.6)
def choir(dur=4.0,root=261.63):
    n=int(dur*SR); t=np.arange(n)/SR; x=np.zeros(n)
    for f,a in [(root,1),(root*1.189,.7),(root*1.498,.8),(root*2,.6),(root*2.378,.35)]:
        for d in (-1.2,0,1.2):
            vib=1+.004*np.sin(2*np.pi*(5+d*.3)*t+d)
            x+=a*np.sin(2*np.pi*(f+d)*t*vib)/3
    e=np.minimum(t/1.1,1)*np.minimum((dur-t)/1.6,1); return norm(signal.sosfilt(sos('low',2800),x)*e)
def reverb_ir(sec,lo=1500):
    n=int(sec*SR); t=np.arange(n)/SR; irs=[]
    for _ in range(2):
        ir=rng.normal(size=n)*np.exp(-t*(6.9/sec)); ir=signal.sosfilt(sos('low',lo),ir); ir[:int(.02*SR)]*=np.linspace(0,1,int(.02*SR)); irs.append(ir/np.sqrt(np.sum(ir**2)))
    return irs
# ---------- voice ----------
VO={'l1':.30,'l2':2.25,'l3':4.70,'l4':5.30,'l5':9.50,'l6':12.50,'l7':17.00,'l8':20.30,'l9':24.60,'l10':28.10,'l11':31.60}
def load_voice(k):
    w=wave.open(f'voices/{k}.wav'); a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
    a=signal.resample_poly(a,2,1); a=signal.sosfilt(sos('high',75),a)
    low=signal.sosfilt(sos('low',240),a); a=a+.5*low
    a=np.tanh(a*2.2)/np.tanh(2.2)*0.95; return norm(a,.9)
voices={k:load_voice(k) for k in VO}
for k,t0 in VO.items(): add(voices[k],t0,gain=1.0,pan=0,send=.16)
def echo_word(k,offs,lens=.55):
    v=voices[k]; nz=np.where(np.abs(v)>.03)[0]; end=nz[-1]; i0=max(end-int(lens*SR),0)
    seg=v[i0:min(end+int(.05*SR),len(v))].copy(); seg*=np.minimum(np.arange(len(seg))/(.03*SR),1); start=VO[k]+i0/SR
    for j,(d,g,fc) in enumerate(zip(offs,[.5,.28,.15],[4200,3000,2000])):
        add(signal.sosfilt(sos('low',fc),seg)*g,start+d,gain=1,pan=.55*(1 if j%2==0 else -1),send=.5)
echo_word('l2',[.5,1.0],.55)           # "rich." echoes x2
echo_word('l11',[.55,1.1,1.65],.6)     # "brains." echoes x3
# ---------- sfx timeline ----------
add(boom(2.2,75,30),0.0,.85,0,.5)
add(crack(),1.55,.55,-.2,.4); add(boom(.9,90,40),2.62,.5,-.2,.3)
add(ping(1568,2.8),3.30,.32,.2,.7); add(ping(2349,2.5),3.32,.16,-.2,.7); add(boom(1.4,70,35),3.20,.55,0,.4)
add(boom(1.1,90,38),4.68,.8,0,.35); add(whoosh(.5,False,200,5000),4.35,.35,0)
add(whoosh(.7,True),5.05,.45,0,.3); add(tock(150),5.5,.35,0,.3)
for t0,f in [(7.0,880),(8.2,988),(10.4,1175),(11.3,1318)]: add(ping(f,.9,.6),t0,.13,.3,.4); add(tick(),t0,.25)
add(whoosh(.7,True,300,5000),9.05,.4,.3); add(whoosh(.6,False,200,4000),12.15,.35,0)
add(whoosh(.8,True,250,6000),12.95,.5,-.4); add(boom(.8,90,45),14.2,.5,0,.3)
add(rumble(1.7),14.4,.7,0,.25); add(riser(1.4,900,80),14.5,.18)
add(crack(),15.3,.7,-.3,.4); add(stamp(),16.4,.95,0,.3)
for t0,f,i in [(17.5,200,0),(18.5,225,1),(19.4,250,2)]: add(tock(f),t0,.75,.25,.15); add(ping(1320+i*220,1.2,.7),t0,.16,.25,.5)
add(whoosh(.8,True,200,5000),20.0,.4,0,.3)
K=34
for k in range(K):
    u=(k/K)**.75; add(tick(),22.5+1.75*u,.2+.25*u,(-1)**k*.2)
add(ping(2093,3.5),24.25,.45,0,.7); add(ping(3136,3.0),24.27,.22,.2,.7); add(ping(4186,2.5),24.3,.1,-.2,.7); add(boom(1.2,80,40),24.25,.5,0,.3)
add(whoosh(.7,False,300,6000),24.35,.3,0)
for t0,f in [(25.0,660),(25.4,784),(25.8,988)]: add(ping(f,1.3,.6),t0,.18,(f-780)/900,.6)
for t0,f in [(28.1,300),(28.65,340),(29.2,380)]: add(tock(f),t0,.85,.2,.15)
add(riser(1.6,400,5000),28.95,.5,0,.3)
add(boom(2.8,80,28),30.55,1.0,0,.5)
for f,g in [(1046.5,.3),(1244.5,.24),(1568,.26),(2093,.2)]: add(ping(f,3.6),30.57,g,(f-1300)/1500,.8)
add(choir(4.4,261.63),30.4,.42,0,.6); add(whoosh(.9,False,500,9000),30.55,.3,0)
add(boom(1.0,80,40),31.6,.4,0,.3)
# ---------- music bed ----------
t=np.arange(N)/SR; bed=np.zeros(N)
for f,a in [(65.41,1),(98.0,.55),(130.81,.5),(155.56,.4),(196.0,.25)]:
    lfo=.75+.25*np.sin(2*np.pi*(.07+.013*f/100)*t+f); bed+=a*np.sin(2*np.pi*f*t+1.3*np.sin(2*np.pi*.05*t))*lfo
bed=signal.sosfilt(sos('low',700),bed); bed=norm(bed)*np.minimum(t/2.5,1)*np.minimum((DUR-t)/2.0,1)
pulse=.55+.45*np.sin(2*np.pi*(1.0)*t)**8; bed*=(.75+.25*pulse)
add(bed,0,.10,0,.2)
# ---------- reverb + master ----------
irl,irr=reverb_ir(2.4)
wl=signal.fftconvolve(SL,irl)[:N]; wr=signal.fftconvolve(SR_,irr)[:N]
oL=L+wl*.9; oR=R+wr*.9
st=np.vstack([oL,oR]); pk=np.max(np.abs(st)); st=st/pk*0.89
st=np.tanh(st*1.15)/np.tanh(1.15)*0.95
fade=np.minimum(t/.05,1)*np.minimum((DUR-t)/.4,1); st*=fade
pcm=(np.clip(st.T,-1,1)*32767).astype(np.int16)
with wave.open('mix.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
rms=np.sqrt(np.mean(st**2)); print('peak',np.max(np.abs(st)).round(3),'rms_db',round(20*np.log10(rms),1),'dur',N/SR)
