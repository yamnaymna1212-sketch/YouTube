import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, staticFile, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { Fuel, HeartPulse, Landmark, ShoppingCart, ShieldCheck, Scale, Home, Vote, Gavel, Check, KeyRound, Moon } from 'lucide-react';
import { Badge, Stamp as _S } from '../brand/Brand';
import { Barrel, GulfMap, Pump, Station, Caverns, Receipt } from '../ep05/props';
import { Stamp } from '../ep05/parts';
import { EP_DUR, MUSIC, VO_FILE, paraT, wordT } from './t';
import { At, Apartment, B, Chrome, Cinema, Clock24, Jake, NameTag, IllusTag, Phone, cond, display, easeIO, easeO, F, fr, kk, spr } from '../ep07/kit';

// EP08 · "Your Life After El-Sayed Became President" — the BEST-CASE what-if (labelled IMAGINE) vs REALITY CHECK.
// Dream scenes: warm gold light, "IMAGINE" tag. Reality scenes: grey paper, "REALITY CHECK" stamp. Jake lives one day (7 a.m.→10 p.m.).
const W = wordT;
const atW = (s: number) => (p: number, w: string, n = 0) => fr(wordT(p, w, n) - s);
const CUT = 'sayed/cut_elsayed.png';
const PH = 'Photo: Conlan Houston, CC BY-SA 4.0 (Wikimedia Commons)';

// ---------- backgrounds
const Dream: React.FC<{ children?: React.ReactNode; tag?: boolean; hour?: number; label?: string }> = ({ children, tag = true, hour, label }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const t = spr(f, 0, fps, 16, 130);
  return (
    <Cinema grade="saturate(1.12) brightness(1.03)">
      <AbsoluteFill style={{ background: 'linear-gradient(#FFEBC2 0%, #F8C58A 55%, #EE9C73 100%)' }}>
        <AbsoluteFill style={{ opacity: 0.35, background: `conic-gradient(from ${f * 0.25}deg at 50% 120%, transparent 0 8%, rgba(255,255,255,.8) 9% 11%, transparent 12% 20%, rgba(255,255,255,.6) 21% 23%, transparent 24% 36%, rgba(255,255,255,.7) 37% 39%, transparent 40% 100%)` }} />
        {Array.from({ length: 26 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: random('dm' + i) * 1920, top: ((random('dy' + i) * 1200 - f * (0.4 + random('ds' + i))) % 1200 + 1200) % 1200 - 60, width: 6 + random('dz' + i) * 10, height: 6 + random('dz' + i) * 10, borderRadius: '50%', background: 'rgba(255,255,255,.7)', filter: 'blur(1px)', opacity: 0.3 + 0.5 * Math.abs(Math.sin(f / 30 + i)) }} />)}
        {children}
        {tag && <div style={{ position: 'absolute', left: 48, top: 130, transform: `scale(${t})`, transformOrigin: '0 0', background: B.ink, color: '#FFE9B0', fontFamily: cond, fontWeight: 800, fontSize: 54, letterSpacing: 12, padding: '4px 26px', border: '5px solid #FFE9B0', boxShadow: '0 0 40px rgba(255,220,140,.7)' }}>IMAGINE</div>}
        {hour !== undefined && <div style={{ position: 'absolute', right: 150, top: 140 }}><Clock24 x={0} y={0} r={74} hour={hour} at={0} dark={false} label={label} /></div>}
      </AbsoluteFill>
      <Chrome dark={false} />
    </Cinema>
  );
};
const Real: React.FC<{ children?: React.ReactNode; src?: string }> = ({ children, src }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const t = spr(f, 0, fps, 12, 170);
  return (
    <Cinema grade="saturate(.55) contrast(1.05)">
      <AbsoluteFill style={{ background: 'linear-gradient(#D8DCE2, #B7BEC9)' }}>
        {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 170, top: 0, width: 2, height: 1080, background: 'rgba(0,0,0,.05)' }} />)}
        {children}
        <div style={{ position: 'absolute', left: 48, top: 130, transform: `scale(${t}) rotate(-3deg)`, transformOrigin: '0 0', border: `7px solid ${B.red}`, color: B.red, fontFamily: cond, fontWeight: 800, fontSize: 54, letterSpacing: 8, padding: '0 22px', background: 'rgba(246,241,228,.85)' }}>REALITY CHECK</div>
      </AbsoluteFill>
      <Chrome dark={false} src={src} />
    </Cinema>
  );
};
const Big: React.FC<{ children: React.ReactNode; y?: number; at?: number; size?: number; color?: string }> = ({ children, y = 170, at = 0, size = 96, color = B.ink }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 16, 130);
  return <div style={{ position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: size, color, opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>{children}</div>;
};
const Pop: React.FC<{ x: number; y: number; at: number; children: React.ReactNode; rot?: number }> = ({ x, y, at, children, rot = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 170);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${rot}deg)` }}>{children}</div>;
};
const Chip: React.FC<{ children: React.ReactNode; tone?: 'red' | 'gold' | 'bone' | 'pine'; size?: number }> = ({ children, tone = 'bone', size = 64 }) => {
  const bg = tone === 'red' ? B.red : tone === 'gold' ? B.amber : tone === 'pine' ? B.pine : B.bone;
  const fg = tone === 'bone' || tone === 'gold' ? B.ink : B.bone;
  return <div style={{ background: bg, color: fg, border: `6px solid ${B.ink}`, padding: '6px 26px', fontFamily: display, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '10px 10px 0 rgba(27,34,48,.3)' }}>{children}</div>;
};
const Money: React.FC<{ x: number; y: number; v: number; at: number; label?: string; color?: string; size?: number }> = ({ x, y, v, at, label, color = B.pine, size = 150 }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, at, at + 24));
  return (
    <Pop x={x} y={y} at={at}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.mono, fontSize: size, color, textShadow: '0 4px 0 rgba(255,255,255,.5)' }}>${Math.round(v * k).toLocaleString('en-US')}</div>
        {label && <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: B.ink }}>{label}</div>}
      </div>
    </Pop>
  );
};
const Wad: React.FC<{ x: number; y: number; at: number; n?: number; s?: number }> = ({ x, y, at, n = 7, s = 1 }) => {
  const f = useCurrentFrame();
  return <>{Array.from({ length: n }).map((_, i) => { const k = easeO(kk(f, at + i * 3, at + i * 3 + 18)); return <div key={i} style={{ position: 'absolute', left: x + (i - n / 2) * 60 * s, top: y - k * 150 + Math.sin(f / 9 + i) * 6, width: 150 * s, height: 70 * s, background: '#A8CB93', border: `4px solid ${B.ink}`, borderRadius: 6, opacity: k, transform: `rotate(${(i % 3 - 1) * 8}deg)` }}><div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 40 * s, color: B.ink, lineHeight: `${70 * s}px` }}>$</div></div>; })}</>;
};
const Key: React.FC<{ x: number; y: number; at: number; label: string; lit?: number; s?: number }> = ({ x, y, at, label, lit = -1, s = 1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const k = spr(f, at, fps, 12, 170);
  const on = lit >= 0 && f >= lit;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${k * s})`, textAlign: 'center' }}>
      <KeyRound size={230} color={on ? B.amber : '#6E7686'} strokeWidth={2.2} style={{ filter: on ? 'drop-shadow(0 0 30px rgba(232,182,76,.9))' : 'none' }} />
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 60, color: B.ink }}>{label}</div>
    </div>
  );
};

// ================================ SHOTS ================================
type ShotFn = (s: number, e: number) => React.ReactNode;
const sh: [number, ShotFn][] = [];
const add = (t: number, fn: ShotFn) => sh.push([t, fn]);

// ---- P0 · hook: IMAGINE
add(0, (s) => { const a = atW(s); const f = useCurrentFrame(); return (
  <Dream tag={false} hour={7} label="7:00 AM">
    <div style={{ position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 330, color: '#FFF6DC', textShadow: '0 12px 0 rgba(120,50,20,.45), 0 0 80px rgba(255,235,170,.9)', transform: `scale(${1 + 0.04 * Math.sin(f / 20)})` }}>IMAGINE</div>
    <Big y={700} at={a(0, 'Seven') - 2} size={90}>Seven a.m.</Big>
  </Dream>); });
add(W(0, 'Abdul') - 0.1, (s) => { const a = atW(s); const f = useCurrentFrame(); const { fps } = useVideoConfig(); const k = spr(f, 0, fps, 14, 120); return (
  <Dream hour={7} label="BEST CASE">
    <div style={{ position: 'absolute', left: 560, top: 120, width: 760, height: 960, transform: `translateY(${(1 - k) * 400}px)` }}><Img src={staticFile(CUT)} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: '50% 100%' }} /></div>
    <Pop x={1450} y={560} at={a(0, 'president') - 3} rot={4}><Chip tone="bone" size={64}>PRESIDENT · WHAT IF</Chip></Pop>
    <Pop x={1500} y={700} at={a(0, 'works') - 4} rot={-3}><Chip tone="gold" size={60}>IF IT ALL WORKS</Chip></Pop>
    <div style={{ position: 'absolute', left: 48, bottom: 70, fontFamily: F.mono, fontSize: 16, color: 'rgba(60,40,20,.7)' }}>{PH}</div>
  </Dream>); });
add(W(0, 'Every'), (s) => { const a = atW(s); return (
  <Dream hour={7} label="BEST CASE">
    {['EVERY BILL', 'EVERY PROMISE'].map((t, i) => <Stamp key={t} text={`${t} · PASSED`} x={960} y={420 + i * 220} at={a(0, i ? 'promise' : 'bill') - 3} size={86} color={B.pine} rot={i ? 3 : -3} />)}
  </Dream>); });
add(W(0, 'Jake'), (s) => { const a = atW(s); return (
  <Cinema grade="saturate(1.1) brightness(1.05)">
    <Apartment dawn tv={<AbsoluteFill style={{ background: 'linear-gradient(#FFE9B0, #F6B67A)' }} />}>
      <Jake x={420} y={1050} h={760} seed="e1" pose="cheer" beats={[{ at: 6, r: 'smile', hold: 400 }]} />
      <div style={{ position: 'absolute', left: 48, top: 130, background: B.ink, color: '#FFE9B0', fontFamily: cond, fontWeight: 800, fontSize: 54, letterSpacing: 12, padding: '4px 26px', border: '5px solid #FFE9B0' }}>IMAGINE</div>
    </Apartment>
    <Chrome />
  </Cinema>); });
add(W(0, 'Today'), (s) => { const f = useCurrentFrame(); const a = atW(s); const h = 7 + 15 * easeIO(kk(f, a(0, 'hour') - 4, a(0, 'hour') + 40)); return (
  <Dream hour={h} label="ONE DREAM DAY">
    <Big y={420} at={0} size={150} color={B.ink}>One dream day</Big>
    <Big y={640} at={a(0, 'real') - 6} size={80} color={B.red}>…then, how much is real?</Big>
  </Dream>); });

// ---- P1 · what this is
add(paraT(1), (s) => { const a = atW(s); return (
  <Real>
    <Stamp text="WHAT IF · BEST CASE" x={960} y={500} at={a(1, 'what-if') - 4} size={120} color={B.red} rot={-4} />
  </Real>); });
add(W(1, 'November'), (s) => { const a = atW(s); const f = useCurrentFrame(); const { fps } = useVideoConfig(); const k = spr(f, 0, fps, 15, 130); return (
  <Real src="ClickOnDetroit · SAN · results per AP, Nov 3–4, 2026">
    <div style={{ position: 'absolute', left: 420, top: 120, width: 560, height: 900, opacity: 0.95 }}><Img src={staticFile(CUT)} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: '50% 100%', filter: 'grayscale(.6)' }} /></div>
    <Pop x={1330} y={380} at={a(1, 'Senate') - 4}><Chip tone="bone" size={60}>U.S. SENATE · MICHIGAN</Chip></Pop>
    <Pop x={1330} y={540} at={a(1, 'first') - 3}><Chip tone="gold" size={44}>FIRST MUSLIM ELECTED TO THE SENATE</Chip></Pop>
    <div style={{ position: 'absolute', left: 48, bottom: 70, fontFamily: F.mono, fontSize: 16, color: 'rgba(40,40,40,.7)' }}>{PH}</div>
  </Real>); });
add(W(1, 'President'), (s) => { const a = atW(s); const f = useCurrentFrame(); const k = easeO(kk(f, 0, 30)); return (
  <Real>
    <Big y={260} at={0} size={110}>President is a bigger job…</Big>
    <svg width={1920} height={400} style={{ position: 'absolute', left: 0, top: 480 }}><line x1={300} y1={200} x2={300 + 1320 * k} y2={200} stroke={B.ink} strokeWidth={10} strokeLinecap="round" /><circle cx={300} cy={200} r={22} fill={B.red} /><circle cx={300 + 1320 * k} cy={200} r={22} fill={B.ink} /></svg>
    <Pop x={300} y={720} at={4}><Chip tone="red" size={54}>SENATOR-ELECT</Chip></Pop>
    <Pop x={1620} y={720} at={a(1, 'years') - 3}><Chip tone="bone" size={54}>YEARS AWAY</Chip></Pop>
  </Real>); });
add(W(1, 'Every'), (s) => { const a = atW(s); return (
  <Real>
    <Pop x={560} y={500} at={a(1, 'imagine') - 3} rot={-2}><div style={{ width: 640, padding: 34, background: '#FFF1CF', border: `7px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(0,0,0,.3)' }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 58, letterSpacing: 8, color: B.amber }}>“IMAGINE”</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: B.ink }}>= a dream</div></div></Pop>
    <Pop x={1360} y={500} at={a(1, 'numbers') - 3} rot={2}><div style={{ width: 640, padding: 34, background: B.bone, border: `7px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(0,0,0,.3)' }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 58, letterSpacing: 8, color: B.pine }}>NUMBERS</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: B.ink }}>= real math</div></div></Pop>
    <Pop x={960} y={820} at={a(1, 'promises') - 3}><Chip tone="red" size={64}>OUTCOMES ≠ PROMISES</Chip></Pop>
  </Real>); });
add(W(1, 'Supporters'), (s) => { const a = atW(s); return (
  <Real>
    <div style={{ position: 'absolute', left: 959, top: 280, width: 6, height: 330, background: B.ink }} />
    <Pop x={500} y={420} at={a(1, 'Supporters') - 2}><Chip tone="pine" size={80}>SUPPORTERS</Chip></Pop>
    <Pop x={1420} y={420} at={a(1, 'critics') - 2}><Chip tone="red" size={80}>CRITICS</Chip></Pop>
    <Big y={640} at={a(1, 'say') - 2} size={84}>Both get their say</Big>
  </Real>); });

// ---- P2 · meet Jake
add(paraT(2), (s) => { const a = atW(s); return (
  <Cinema grade="saturate(1.1) brightness(1.05)">
    <Apartment dawn tv={<AbsoluteFill style={{ background: 'linear-gradient(#FFE9B0, #F6B67A)' }} />}>
      <Jake x={420} y={1050} h={760} seed="e2" beats={[{ at: 6, r: 'smile', hold: 400 }]} />
      <NameTag x={800} y={380} name="Jake · 26" at={a(2, 'Jake') - 2} />
      <IllusTag x={210} y={150} at={a(2, 'Illustrative')} />
      <Pop x={900} y={560} at={a(2, 'Single') - 2}><Chip tone="bone" size={54}>SINGLE</Chip></Pop>
      <Pop x={1180} y={560} at={a(2, 'fifteen') - 2}><Chip tone="gold" size={54}>15 gal</Chip></Pop>
      <Pop x={1070} y={680} at={a(2, 'health') - 2}><Chip tone="bone" size={54}>EMPLOYER HEALTH PLAN</Chip></Pop>
    </Apartment>
    <Chrome />
  </Cinema>); });

// ---- P3 · 7:15 health
add(paraT(3), (s) => { const a = atW(s); const f = useCurrentFrame(); const gone = kk(f, a(3, 'gone') - 4, a(3, 'gone') + 10); return (
  <Dream hour={7.25} label="7:15 AM">
    <Jake x={440} y={1060} h={820} seed="e3" pose="read" stub="$1,440 / yr" beats={[{ at: 4, r: 'think', hold: a(3, 'gone') }, { at: a(3, 'gone') + 4, r: 'cheer', hold: 400 }]} />
    <Pop x={1250} y={430} at={a(3, 'pay') - 3} rot={-2}>
      <div style={{ width: 760, background: '#FBF8F1', border: `7px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(0,0,0,.25)', padding: 30 }}>
        <div style={{ fontFamily: F.mono, fontSize: 30, letterSpacing: 6, color: '#7A7260' }}>PAY STUB</div>
        {['Gross pay', 'Federal tax', 'Payroll tax'].map((t, i) => <div key={t} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 42, color: B.ink, marginTop: 10 }}><span>{t}</span><span>—</span></div>)}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 42, marginTop: 10, color: B.red, opacity: 1 - gone, textDecoration: gone > 0.2 ? 'line-through' : 'none' }}><span>Health insurance</span><span>$55.38</span></div>
      </div>
    </Pop>
  </Dream>); });
add(W(3, 'Right'), (s) => { const a = atW(s); const f = useCurrentFrame(); const v = 1440 * easeO(kk(f, a(3, 'fourteen') - 4, a(3, 'year') + 8)); return (
  <Dream hour={7.3} label="7:20 AM">
    <Wad x={960} y={820} at={a(3, 'stays') - 6} n={8} />
    <Money x={960} y={400} v={v} at={0} label="BACK IN JAKE'S POCKET" />
    <Pop x={960} y={190} at={a(3, 'single') - 4}><Chip tone="bone" size={56}>A SINGLE WORKER'S SHARE · KFF</Chip></Pop>
  </Dream>); });
add(W(3, 'Fewer'), (s) => { const a = atW(s); return (
  <Dream hour={7.5} label="7:30 AM">
    <Jake x={560} y={1060} h={800} seed="e3b" beats={[{ at: 4, r: 'smile', hold: 400 }]} />
    <Pop x={1300} y={420} at={a(3, 'card') - 4} rot={-3}><div style={{ width: 560, height: 340, background: B.blue, border: `7px solid ${B.ink}`, borderRadius: 24, boxShadow: '14px 14px 0 rgba(0,0,0,.25)', padding: 30 }}><HeartPulse size={90} color={B.bone} /><div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: B.bone }}>ONE CARD</div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 32, letterSpacing: 6, color: '#BFD2F0' }}>FOR EVERYONE</div></div></Pop>
    <Pop x={1300} y={720} at={a(3, 'changes') - 4}><Chip tone="pine" size={56}>NEW JOB? SAME PLAN</Chip></Pop>
  </Dream>); });

// ---- P4 · reality check one: cost and Congress
add(paraT(4), (s) => { const a = atW(s); return (
  <Real src="Mercatus ($32.6T) and Urban ($34T) 10-year estimates — see description; confirm primaries">
    <Pop x={560} y={500} at={a(4, 'thirty-two') - 4} rot={-2}><div style={{ textAlign: 'center' }}><div style={{ fontFamily: F.mono, fontSize: 200, color: B.red }}>$32T</div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: B.ink }}>OUTSIDE STUDY</div></div></Pop>
    <Pop x={1360} y={500} at={a(4, 'thirty-four') - 4} rot={2}><div style={{ textAlign: 'center' }}><div style={{ fontFamily: F.mono, fontSize: 200, color: B.red }}>$34T</div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: B.ink }}>OVER 10 YEARS</div></div></Pop>
  </Real>); });
add(W(4, 'Supporters'), (s) => { const a = atW(s); return (
  <Real>
    <div style={{ position: 'absolute', left: 959, top: 200, width: 6, height: 700, background: B.ink }} />
    <Pop x={500} y={420} at={a(4, 'Supporters') - 2}><div style={{ textAlign: 'center' }}><Chip tone="pine" size={70}>SUPPORTERS</Chip><div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: B.ink, marginTop: 24 }}>replaces money<br />we already spend</div></div></Pop>
    <Pop x={1420} y={420} at={a(4, 'Critics') - 2}><div style={{ textAlign: 'center' }}><Chip tone="red" size={70}>CRITICS</Chip><div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: B.ink, marginTop: 24 }}>taxes would<br />rise a lot</div></div></Pop>
  </Real>); });
add(W(4, 'And'), (s) => { const a = atW(s); const f = useCurrentFrame(); const gain = kk(f, a(4, 'gain') - 6, a(4, 'gain') + 8); return (
  <Real>
    <Key x={420} y={500} at={0} label="CONGRESS" lit={a(4, 'Congress') - 2} />
    <Pop x={1250} y={380} at={a(4, 'real') - 3} rot={-2}>
      <div style={{ width: 720, background: '#FBF8F1', border: `7px solid ${B.ink}`, padding: 28, boxShadow: '14px 14px 0 rgba(0,0,0,.25)' }}>
        <div style={{ fontFamily: F.mono, fontSize: 28, letterSpacing: 6, color: '#7A7260' }}>PAY STUB · REAL LIFE?</div>
        <div style={{ fontFamily: F.mono, fontSize: 40, color: B.ink, textDecoration: 'line-through', opacity: 0.5, marginTop: 8 }}>Health insurance —</div>
        <div style={{ fontFamily: F.mono, fontSize: 40, color: B.red, marginTop: 8, opacity: gain, transform: `translateX(${(1 - gain) * 80}px)` }}>New tax line  ?</div>
      </div>
    </Pop>
    <Big y={820} at={a(4, 'tax') - 6} size={74}>The stub loses a line… and may gain one</Big>
  </Real>); });

// ---- P5 · 8 a.m. peace in the Gulf
add(paraT(5), (s) => { const a = atW(s); const f = useCurrentFrame(); return (
  <Dream hour={8} label="8:00 AM">
    <div style={{ position: 'absolute', inset: 0, opacity: 0.55 }}><GulfMap labels={false} zoom={1.2 + f / 3000} at={0} /></div>
    <AbsoluteFill style={{ background: 'linear-gradient(rgba(255,235,194,.55), rgba(238,156,115,.25))' }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 740, height: 200, background: 'rgba(255,246,220,.82)' }} /><Big y={760} at={a(5, 'Peace') - 3} size={130} color={B.ink}>Peace in the Gulf</Big>
  </Dream>); });
add(W(5, 'The'), (s) => { const a = atW(s); return (
  <Dream hour={8.1} label="8:05 AM">
    <Stamp text="IRAN WAR · OVER" x={960} y={470} at={a(5, 'over') - 4} size={120} color={B.pine} rot={-4} />
    <Pop x={960} y={740} at={a(5, 'illegal') - 3}><Chip tone="bone" size={56}>EL-SAYED CALLED THE WAR ILLEGAL · SEPT 2026 STATEMENT</Chip></Pop>
  </Dream>); });
add(W(5, 'Oil'), (s) => { const a = atW(s); const f = useCurrentFrame(); const v = 98 - 20 * easeO(kk(f, a(5, 'twenty') - 4, a(5, 'barrel') + 10)); return (
  <Dream hour={8.2} label="8:10 AM">
    <Barrel x={520} y={820} scale={1.8} tag={`$${Math.round(v)}`} at={0} />
    <Pop x={1250} y={380} at={a(5, 'twenty') - 4}><Chip tone="pine" size={110}>−$20 / barrel</Chip></Pop>
    <Pop x={1250} y={560} at={a(5, 'Here') - 2}><Chip tone="bone" size={56}>ARITHMETIC, NOT A FORECAST</Chip></Pop>
  </Dream>); });
add(W(5, 'One'), (s) => { const a = atW(s); const f = useCurrentFrame(); const v = 0.48 * easeO(kk(f, a(5, 'twenty', 1) - 4, a(5, 'forty-eight') + 8)); return (
  <Dream hour={8.3} label="8:15 AM">
    <Pop x={420} y={480} at={a(5, 'dollar') - 3}><Chip tone="bone" size={90}>$1 / barrel</Chip></Pop>
    <Pop x={960} y={480} at={a(5, 'two') - 3}><Chip tone="gold" size={90}>= 2.4¢ / gal</Chip></Pop>
    <Pop x={1500} y={480} at={a(5, 'forty-eight') - 3}><Chip tone="pine" size={90}>$20 = 48¢</Chip></Pop>
    <Money x={960} y={820} v={374} at={a(5, 'three') - 4} label="A YEAR OF DRIVING · 780 GAL" />
  </Dream>); });
add(W(5, 'Picture'), (s) => { const a = atW(s); const f = useCurrentFrame(); return (
  <Cinema grade="saturate(1.1) brightness(1.05)">
    <Station night={false} price="3.67"><Jake x={1180} y={1000} h={720} seed="e5" pose="pump" beats={[{ at: 6, r: 'smile', hold: 400 }]} /></Station>
    <div style={{ position: 'absolute', left: 48, top: 130, background: B.ink, color: '#FFE9B0', fontFamily: cond, fontWeight: 800, fontSize: 54, letterSpacing: 12, padding: '4px 26px', border: '5px solid #FFE9B0' }}>IMAGINE</div>
    <Chrome dark={false} src="Illustrative price" />
  </Cinema>); });

// ---- P6 · gas falls a whole $1.65 (a bigger dream, labelled NOT A PROMISE)
add(paraT(6), (s) => { const a = atW(s); const f = useCurrentFrame(); const p = 4.15 - 1.65 * easeO(kk(f, a(6, 'falls') - 4, a(6, 'gallon') + 10)); return (
  <Cinema grade="saturate(1.1) brightness(1.05)">
    <Station night={false} price={p.toFixed(2)}><Jake x={1180} y={1000} h={720} seed="e6" pose="pump" beats={[{ at: a(6, 'falls'), r: 'surprise', hold: 30 }, { at: a(6, 'falls') + 34, r: 'cheer', hold: 400 }]} /></Station>
    <div style={{ position: 'absolute', left: 48, top: 130, background: B.ink, color: '#FFE9B0', fontFamily: cond, fontWeight: 800, fontSize: 54, letterSpacing: 12, padding: '4px 26px', border: '5px solid #FFE9B0' }}>IMAGINE</div>
    <Pop x={560} y={420} at={a(6, 'dollar') - 3}><Chip tone="pine" size={96}>−$1.65</Chip></Pop>
    <Chrome dark={false} src="Starting point: EIA regular $4.153 (week of 2 Nov 2026) · illustrative" />
  </Cinema>); });
add(W(6, 'Jake'), (s) => { const a = atW(s); const f = useCurrentFrame(); const v = 62.3 - 24.8 * easeO(kk(f, a(6, 'drops') - 4, a(6, 'fifty') + 8)); return (
  <Dream hour={8.4} label="8:20 AM">
    <div style={{ position: 'absolute', left: 960, top: 520, transform: 'translate(-50%,-50%)', background: '#0B0F18', border: '12px solid #2A3242', padding: '30px 90px', boxShadow: '0 0 80px rgba(255,220,140,.5)' }}>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: B.gold }}>JAKE'S TANK · 15 GAL</div>
      <div style={{ fontFamily: F.mono, fontSize: 230, color: '#9BE59B', textShadow: '0 0 30px currentColor' }}>${v.toFixed(2)}</div>
    </div>
    <Pop x={960} y={880} at={a(6, 'sixty-two') - 3}><Chip tone="bone" size={60}>$62.30 → ≈ $37.50</Chip></Pop>
  </Dream>); });
add(W(6, 'Over'), (s) => { const a = atW(s); return (
  <Dream hour={8.5} label="8:30 AM">
    <Wad x={960} y={820} at={0} n={9} />
    <Money x={960} y={400} v={1287} at={a(6, 'twelve') - 6} label="A YEAR · 780 GAL × $1.65" />
    <Stamp text="NOT A PROMISE" x={1400} y={640} at={a(6, 'promise') - 4} size={80} color={B.red} rot={-8} />
  </Dream>); });
add(W(6, 'Picture'), (s) => { const a = atW(s); return (
  <Cinema grade="saturate(1.1) brightness(1.05)">
    <Station night={false} price="2.50"><Jake x={1180} y={1000} h={720} seed="e6b" pose="cheer" beats={[{ at: 4, r: 'cheer', hold: 400 }]} /></Station>
    <Chrome dark={false} src="Illustrative" />
  </Cinema>); });

// ---- P7 · reality check two
add(paraT(7), (s) => { const a = atW(s); return (
  <Real src="U.S. Constitution, Art. I §8 (Congress declares war) · EIA: crude ≈ 51% of the pump price">
    <Pop x={500} y={470} at={a(7, 'world') - 4} rot={-2}><div style={{ textAlign: 'center' }}><div style={{ width: 300, height: 300, borderRadius: '50%', background: B.blue, border: `8px solid ${B.ink}`, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 110, color: B.bone }}>🌍</div><Chip tone="bone" size={46}>THE WORLD SETS THE PRICE</Chip></div></Pop>
    <Pop x={1420} y={470} at={a(7, 'Congress') - 4} rot={2}><div style={{ textAlign: 'center' }}><Landmark size={300} color={B.ink} strokeWidth={1.8} /><Chip tone="gold" size={46}>CONGRESS DECLARES WAR</Chip></div></Pop>
  </Real>); });
add(W(7, 'Peace'), (s) => { const a = atW(s); return (
  <Real>
    <Big y={300} at={0} size={110}>Peace can lower oil.</Big>
    <Big y={470} at={a(7, "doesn't") - 4} size={110} color={B.red}>It doesn't set the pump price.</Big>
  </Real>); });

// ---- P8 · noon groceries
add(paraT(8), (s) => { const a = atW(s); const f = useCurrentFrame(); const h = 340 - 150 * easeO(kk(f, a(8, 'shorter') - 4, a(8, 'shorter') + 20)); return (
  <Dream hour={12} label="NOON">
    <Receipt x={960} y={520} lines={[['Milk', 0], ['Eggs', 8], ['Bread', 16], ['TOTAL  lower?', 26]]} at={0} title="JAKE · GROCERIES" w={760} />
    <Jake x={1560} y={1060} h={780} seed="e8" flip beats={[{ at: a(8, 'twice'), r: 'surprise', hold: 30 }, { at: a(8, 'twice') + 36, r: 'smile', hold: 400 }]} />
  </Dream>); });
add(W(8, 'Be'), (s) => { const a = atW(s); return (
  <Real src="Supreme Court, Learning Resources v. Trump (20 Feb 2026) — IEEPA tariffs">
    {['TARIFFS', 'TRUCKS', 'WAGES', 'COMPETITION'].map((t, i) => <Pop key={t} x={330 + i * 420} y={440} at={a(8, ['tariffs', 'trucks', 'wages', 'competition'][i]) - 3} rot={[-3, 2, -2, 3][i]}><Chip tone={i % 2 ? 'bone' : 'gold'} size={60}>{t}</Chip></Pop>)}
    <Pop x={960} y={720} at={a(8, 'Court') - 4}><div style={{ display: 'flex', alignItems: 'center', gap: 24 }}><Gavel size={160} color={B.ink} /><Chip tone="red" size={64}>SCOTUS STRUCK THE EMERGENCY TARIFFS</Chip></div></Pop>
  </Real>); });
add(W(8, 'Nothing'), (s) => (
  <Real>
    <Big y={420} at={0} size={130} color={B.ink}>Nothing here moves in a day.</Big>
  </Real>));

// ---- P9 · 6 p.m. taxes
add(paraT(9), (s) => { const a = atW(s); return (
  <Dream hour={18} label="6:00 PM">
    {[['BILLIONAIRES PAY MORE', 'Billionaires'], ['PAYROLL TAX CAP LIFTED', 'payroll'], ['NO TAX ON SOCIAL SECURITY', 'Seniors']].map(([t, w], i) => <Pop key={t} x={1130} y={330 + i * 190} at={a(9, w) - 3} rot={[-2, 2, -1][i]}><Chip tone={i === 2 ? 'pine' : 'bone'} size={54}>{t}</Chip></Pop>)}
    <Jake x={420} y={1060} h={780} seed="e9" beats={[{ at: 6, r: 'think', hold: 400 }]} />
  </Dream>); });
add(W(9, 'Jake'), (s) => { const a = atW(s); return (
  <Dream hour={18.3} label="6:15 PM">
    <Pop x={960} y={470} at={0} rot={-2}><div style={{ width: 820, background: '#FBF8F1', border: `7px solid ${B.ink}`, padding: 34, boxShadow: '14px 14px 0 rgba(0,0,0,.25)' }}><div style={{ fontFamily: F.mono, fontSize: 30, letterSpacing: 6, color: '#7A7260' }}>MONTHLY CHECK</div><div style={{ fontFamily: F.mono, fontSize: 130, color: B.pine }}>$1,650 <span style={{ fontSize: 70, color: B.pine }}>▲</span></div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: B.ink }}>JAKE'S GRANDMOTHER · ILLUSTRATIVE</div></div></Pop>
  </Dream>); });
add(W(9, 'Supporters'), (s) => { const a = atW(s); return (
  <Real src="Eastern Echo, Oakland Post, campaign site — verify before upload">
    <div style={{ position: 'absolute', left: 959, top: 200, width: 6, height: 700, background: B.ink }} />
    <Pop x={500} y={440} at={a(9, 'Supporters') - 2}><div style={{ textAlign: 'center' }}><Chip tone="pine" size={70}>SUPPORTERS</Chip><div style={{ fontFamily: display, fontWeight: 800, fontSize: 66, color: B.ink, marginTop: 24 }}>money pays<br />for services</div></div></Pop>
    <Pop x={1420} y={440} at={a(9, 'Critics') - 2}><div style={{ textAlign: 'center' }}><Chip tone="red" size={70}>CRITICS</Chip><div style={{ fontFamily: display, fontWeight: 800, fontSize: 66, color: B.ink, marginTop: 24 }}>slows investment<br />and hiring</div></div></Pop>
  </Real>); });
add(W(9, 'rent') - 0.35, (s) => { const a = atW(s); return (
  <Real>
    <Pop x={760} y={470} at={a(9, 'rent') - 3} rot={-2}><div style={{ width: 460, height: 520, background: B.bone, border: `7px solid ${B.ink}`, textAlign: 'center', paddingTop: 40, boxShadow: '14px 14px 0 rgba(0,0,0,.25)' }}><Home size={190} color={B.ink} /><div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, color: B.ink }}>RENT</div></div></Pop>
    <Stamp text="STATE & CITY LAW" x={1300} y={470} at={a(9, 'Mostly') - 3} size={70} color={B.red} rot={-6} />
    <Big y={850} at={a(9, 'cap') - 4} size={70}>A president can't cap rent</Big>
  </Real>); });

// ---- P10 · the three keys
add(paraT(10), (s) => { const a = atW(s); const f = useCurrentFrame(); return (
  <Real>
    <Big y={240} at={0} size={90}>A big law needs three yeses</Big>
    <Key x={420} y={540} at={a(10, 'House') - 3} label="HOUSE" lit={a(10, 'House') + 4} />
    <Key x={960} y={540} at={a(10, 'Senate') - 3} label="SENATE · 60" lit={a(10, 'sixty') + 4} />
    <Key x={1500} y={540} at={a(10, 'signature') - 6} label="PRESIDENT" lit={a(10, 'signature') + 2} />
    <Pop x={1500} y={880} at={a(10, 'one') - 2}><Chip tone="gold" size={60}>HE HOLDS ONE OF THREE</Chip></Pop>
  </Real>); });

// ---- P11 · 9 p.m. add it up
add(paraT(11), (s) => { const a = atW(s); const f = useCurrentFrame(); const tot = 2727 * easeO(kk(f, a(11, 'Add') - 4, a(11, 'twenty-seven') + 14)); return (
  <Dream tag={false} hour={21} label="9:00 PM">
    <div style={{ position: 'absolute', left: 120, top: 300, width: 1000 }}>
      {[['HEALTH CARE', '$1,440', 'if Congress passes it · maybe a new tax', 'fourteen'], ['GAS', '$1,287', 'nobody promised this · war piece inside', 'twelve']].map(([t, v, n, w], i) => {
        const k = spr(f, a(11, w) - 4, 30, 14, 150);
        return <div key={t} style={{ marginBottom: 34, opacity: k, transform: `translateX(${(1 - k) * -200}px)`, background: B.bone, border: `6px solid ${B.ink}`, padding: '14px 34px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '10px 10px 0 rgba(0,0,0,.25)' }}><div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 6, color: B.ink }}>{t}</div><div style={{ fontFamily: F.mono, fontSize: 24, color: '#7A7260' }}>{n}</div></div><div style={{ fontFamily: F.mono, fontSize: 90, color: B.pine }}>{v}</div></div>;
      })}
    </div>
    <div style={{ position: 'absolute', right: 130, top: 330, textAlign: 'center', width: 640 }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 8, color: B.ink }}>THE BEST CASE</div><div style={{ fontFamily: F.mono, fontSize: 150, color: B.pine, textShadow: '0 4px 0 rgba(255,255,255,.6)' }}>${Math.round(tot).toLocaleString('en-US')}</div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: B.ink }}>A YEAR</div></div>
    <Pop x={960} y={900} at={a(11, 'half') - 4}><Chip tone="red" size={64}>NOT HALF OFF EVERYTHING</Chip></Pop>
    <Jake x={1680} y={1070} h={560} seed="e11" flip beats={[{ at: 20, r: 'nod', hold: 400 }]} />
  </Dream>); });

// ---- P12 · 10 p.m. the dream ends
add(paraT(12), (s) => { const a = atW(s); const f = useCurrentFrame(); const dark = easeO(kk(f, a(12, 'light') - 4, a(12, 'light') + 10)); return (
  <Cinema grade="saturate(.9)">
    <Apartment dawn={false} lamp={1 - dark} tvOn={0.4 * (1 - dark)} tv={<AbsoluteFill style={{ background: '#F6B67A' }} />}>
      <Jake x={420} y={1050} h={760} seed="e12" beats={[{ at: 4, r: 'smile', hold: a(12, 'light') }, { at: a(12, 'alarm') + 2, r: 'surprise', hold: 400 }]} />
      <AbsoluteFill style={{ background: `rgba(0,0,0,${0.7 * dark * (f < a(12, 'alarm') ? 1 : 0.3)})` }} />
      <Pop x={1250} y={420} at={a(12, 'quiet') - 4}><div style={{ background: 'rgba(14,21,23,.9)', border: `5px solid ${B.gold}`, padding: '10px 30px', fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 8, color: B.nightText }}>NO SIRENS · NO ALERTS</div></Pop>
      <Pop x={1250} y={620} at={a(12, 'alarm') - 2}><Chip tone="red" size={64}>MONDAY · ⏰</Chip></Pop>
    </Apartment>
    <Chrome />
  </Cinema>); });
add(W(12, 'And'), (s) => (
  <Real>
    <Big y={380} at={0} size={130}>The Senate hasn't voted yet.</Big>
    <Pop x={960} y={700} at={10}><Vote size={220} color={B.ink} strokeWidth={1.8} /></Pop>
  </Real>));

// ---- P13 · the honest size
add(paraT(13), (s) => { const a = atW(s); return (
  <Real>
    <Big y={260} at={0} size={110}>Real money. Worth talking about.</Big>
    <Big y={470} at={a(13, 'Every') - 4} size={96} color={B.red}>Every dollar needs votes.</Big>
    <Big y={680} at={a(13, 'Which') - 4} size={70}>…the people who vote on every bill</Big>
  </Real>); });

// ---- P14 · comment question
add(paraT(14), (s) => { const a = atW(s); return (
  <Dream hour={22} label="YOUR TURN">
    {[[HeartPulse, 'HEALTH CARE', 'Health'], [ShieldCheck, 'PEACE', 'peace'], [Fuel, 'GAS', 'gas'], [ShoppingCart, 'GROCERIES', 'groceries']].map(([I, t, w], i) => <Badge key={t as string} I={I as any} x={340 + i * 410} y={500} at={a(14, w as string) - 3} size={210} label={t as string} />)}
    <Big y={250} at={0} size={90}>Which would you want first?</Big>
  </Dream>); });

// ---- P15 · disclaimer · P16 end card
add(paraT(15), (s) => { const a = atW(s); return (
  <Real>
    <div style={{ position: 'absolute', left: 260, right: 260, top: 250 }}>
      {[['A hypothetical best case.', 'hypothetical'], ['Public records + simple math.', 'records'], ['Not a prediction.', 'prediction'], ['Not a promise by anyone.', 'promise'], ['Not an endorsement.', 'endorsement'], ['Not financial advice.', 'financial']].map(([t, w], i) => {
        const f = useCurrentFrame(); const o = kk(f, a(15, w) - 6, a(15, w) + 4);
        return <div key={i} style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: B.ink, opacity: o, transform: `translateY(${(1 - o) * 20}px)`, marginBottom: 22 }}>{t}</div>;
      })}
    </div>
  </Real>); });
add(paraT(16), (s) => { const f = useCurrentFrame(); const { fps } = useVideoConfig(); const k = spr(f, 0, fps, 16, 120); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#FFEBC2, #F8C58A 60%, #EE9C73)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', transform: `scale(${k})` }}>
        <Img src={staticFile('brand/logo.png')} style={{ width: 170, height: 170 }} />
        <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 96, letterSpacing: 16, color: B.ink, marginTop: 10 }}>DOLLARLY</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 56, color: B.red }}>Your Money. Decoded.</div>
      </div>
      {[560, 1360].map((x, i) => <div key={x} style={{ position: 'absolute', left: x - 300, top: 700, width: 600, height: 200, border: '5px dashed rgba(27,34,48,.4)', opacity: kk(f, 20, 30), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: 'rgba(27,34,48,.55)' }}>{i ? 'SUBSCRIBE' : 'WATCH NEXT'}</div>)}
    </AbsoluteFill>
  </Cinema>); });

// ================================ composition ================================
sh.sort((x, y) => x[0] - y[0]);
const END = EP_DUR;
export const EP08_FRAMES = fr(END);
export const EP08: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {sh.map(([t, fn], i) => {
      const nx = i < sh.length - 1 ? sh[i + 1][0] : END;
      const C: React.FC = () => <>{fn(t, nx)}</>;
      return <At key={i} from={t} to={i < sh.length - 1 ? nx + 0.2 : nx} base={0} name={`s${i + 1}`}><C /></At>;
    })}
    <Audio src={staticFile(VO_FILE)} volume={1} />
    <Audio src={staticFile(MUSIC)} volume={0.1} />
    {[W(0, 'works'), W(3, 'gone'), W(5, 'over'), W(6, 'dollar'), W(11, 'twenty-seven'), W(12, 'alarm')].map((t, i) => <Sequence key={i} from={fr(t)} durationInFrames={60} layout="none"><Audio src={staticFile('iran/audio/sfx_paper.wav')} volume={0.09} /></Sequence>)}
    {[W(3, 'fourteen'), W(5, 'twenty'), W(6, 'twelve'), W(11, 'Add')].map((t, i) => <Sequence key={'c' + i} from={fr(t)} durationInFrames={60} layout="none"><Audio src={staticFile('iran/audio/sfx_counter.wav')} volume={0.08} /></Sequence>)}
  </AbsoluteFill>
);
