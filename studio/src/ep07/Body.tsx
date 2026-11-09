import React from 'react';
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BellRing, Building2, Landmark, Radio, ShieldCheck, TrendingDown, TrendingUp, Megaphone, BookOpen, Check, X } from 'lucide-react';
import { Door, NightUS } from '../brand/Brand';
import { Barrel, Car, Globe, GulfMap, HORMUZ_XY, Pump, Refinery, Station, Tanker, Van } from '../ep05/props';
import { FlipCalendar } from '../ep05/parts';
import { EP_DUR, HOOK_DUR, MUSIC, VO_FILE, paraT, wordT } from './t';
import {
  At, Apartment, B, Chrome, Cinema, Clock24, CloseUp, Crowd, Flash, FullFilm, Heli, HorizonCloud, IllusTag, Jake, LiveJake, MapPin,
  NameTag, Phone, PoliceCar, PortNight, SAM_OUTFIT, Sam, SirenWash, Stamp, atW, cond, display, easeIO, easeO, F, fr, kk, spr,
} from './kit';

// EP07 · BODY (paragraphs 3–19, 0:44 → end). Same cinematic grammar as the hook: letterbox, dark grade, siren light,
// a new shot every ~2–4 s, Sam and Jake act on the words. Sam = official guidance only (get inside / stay inside / stay
// tuned; middle of the building or basement; officials decide). Jake = the money doors. Nothing graphic.
const W = wordT;
const BASE = HOOK_DUR;

// ---------- shared scenery
const Dark: React.FC<{ children?: React.ReactNode; wash?: number; src?: string; shakeAt?: number }> = ({ children, wash = 0.25, src, shakeAt }) => (
  <Cinema shakeAt={shakeAt}>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, #1B2433 0%, #07090E 75%)' }}>
      <SirenWash k={wash} />
      {children}
    </AbsoluteFill>
    <Chrome src={src} />
  </Cinema>
);
const Big: React.FC<{ children: React.ReactNode; y?: number; at?: number; size?: number; color?: string }> = ({ children, y = 170, at = 0, size = 96, color = B.nightText }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 16, 130);
  return <div style={{ position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: size, color, opacity: s, transform: `translateY(${(1 - s) * 30}px)`, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{children}</div>;
};
const Kick: React.FC<{ children: React.ReactNode; y?: number; at?: number; color?: string }> = ({ children, y = 130, at = 0, color = B.gold }) => {
  const f = useCurrentFrame();
  return <div style={{ position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 12, color, opacity: kk(f, at, at + 8) }}>{children}</div>;
};
const Pop: React.FC<{ x: number; y: number; at: number; children: React.ReactNode; rot?: number }> = ({ x, y, at, children, rot = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 170);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${rot}deg)` }}>{children}</div>;
};
const Chip: React.FC<{ children: React.ReactNode; tone?: 'red' | 'gold' | 'bone' | 'pine'; size?: number }> = ({ children, tone = 'bone', size = 64 }) => {
  const bg = tone === 'red' ? B.red : tone === 'gold' ? B.amber : tone === 'pine' ? B.pine : B.bone;
  const fg = tone === 'bone' || tone === 'gold' ? B.ink : B.bone;
  return <div style={{ background: bg, color: fg, border: `6px solid ${B.ink}`, padding: '6px 26px', fontFamily: display, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '10px 10px 0 rgba(0,0,0,.4)' }}>{children}</div>;
};
/** running clock chip (top right) that moves from hour h0 to h1 between frames a..b */
const ClockRun: React.FC<{ h0: number; h1?: number; a?: number; b?: number }> = ({ h0, h1 = h0, a = 0, b = 30 }) => {
  const f = useCurrentFrame();
  const h = h0 + (h1 - h0) * easeIO(kk(f, a, b));
  return <div style={{ position: 'absolute', right: 160, top: 210 }}><Clock24 x={0} y={0} r={74} hour={h} at={0} label={`HOUR ${String(Math.round(h)).padStart(2, '0')}`} /></div>;
};
/** inner hallway (Sam's shelter): concrete walls, closed doors, one dim lamp */
const Hallway: React.FC<{ children?: React.ReactNode; dawn?: number }> = ({ children, dawn = 0 }) => {
  const f = useCurrentFrame();
  const flick = 0.85 + 0.15 * Math.sin(f / 4) * Math.sin(f / 11);
  return (
    <AbsoluteFill style={{ background: '#151A22', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 860, background: 'linear-gradient(#2A313C, #1C222B)' }} />
      {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 170, top: 0, width: 3, height: 860, background: 'rgba(0,0,0,.25)' }} />)}
      {[260, 820, 1380].map((x) => <div key={x} style={{ position: 'absolute', left: x, top: 330, width: 230, height: 530, background: '#3B3328', border: '8px solid #0E1116' }}><div style={{ position: 'absolute', right: 26, top: 260, width: 18, height: 18, borderRadius: 9, background: '#9A8F7A' }} /></div>)}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, bottom: 0, background: '#0E1218', borderTop: '6px solid #07090C' }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 960px 120px, rgba(255,230,170,${0.32 * flick}), transparent 55%)` }} />
      <div style={{ position: 'absolute', left: 930, top: 60, width: 60, height: 26, borderRadius: 8, background: `rgba(255,236,190,${flick})`, boxShadow: '0 0 60px rgba(255,230,170,.6)' }} />
      {dawn > 0 && <AbsoluteFill style={{ background: `linear-gradient(90deg, rgba(255,190,120,${0.25 * dawn}), transparent 40%)` }} />}
      {children}
    </AbsoluteFill>
  );
};
/** battery radio prop with sound waves */
const RadioProp: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${s})` }}>
      {[0, 1, 2].map((i) => { const k = ((f + i * 14) % 42) / 42; return <div key={i} style={{ position: 'absolute', left: 90 - 60 - k * 120, top: 30 - 60 - k * 120, width: 120 + k * 240, height: 120 + k * 240, borderRadius: '50%', border: `4px solid rgba(232,182,76,${0.7 * (1 - k)})` }} />; })}
      <svg width={180} height={130} viewBox="0 0 180 130" style={{ position: 'relative', overflow: 'visible' }}>
        <line x1={150} y1={30} x2={176} y2={-40} stroke="#0B0E14" strokeWidth={5} />
        <rect x={6} y={30} width={168} height={96} rx={14} fill="#3A3F4A" stroke="#0B0E14" strokeWidth={6} />
        <circle cx={56} cy={78} r={30} fill="#1C2028" stroke="#0B0E14" strokeWidth={4} />
        {Array.from({ length: 5 }).map((_, i) => <line key={i} x1={34} y1={64 + i * 7} x2={78} y2={64 + i * 7} stroke="#555B66" strokeWidth={3} />)}
        <rect x={100} y={50} width={58} height={24} rx={4} fill="#E8B64C" opacity={0.8 + 0.2 * Math.sin(f / 5)} />
        <circle cx={114} cy={98} r={9} fill="#0B0E14" /><circle cx={144} cy={98} r={9} fill="#0B0E14" />
      </svg>
    </div>
  );
};
/** tab card for the three official sentences */
const Tabs: React.FC<{ on: number[]; y?: number; s?: number }> = ({ on, y = 560, s = 1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const L = ['GET INSIDE', 'STAY INSIDE', 'STAY TUNED'];
  return (
    <>
      {L.map((t, i) => {
        const k = spr(f, on[i], fps, 12, 170);
        const lit = f >= on[i];
        return (
          <div key={i} style={{ position: 'absolute', left: 960 + (i - 1) * 560 * s, top: y, transform: `translate(-50%,-50%) scale(${(0.85 + 0.15 * k) * s}) rotate(${(i - 1) * 2}deg)`, width: 500, padding: '30px 0', textAlign: 'center', background: lit ? B.bone : 'rgba(246,241,228,.12)', border: `7px solid ${lit ? B.ink : 'rgba(246,241,228,.3)'}`, boxShadow: lit ? '0 0 50px rgba(232,182,76,.35), 14px 14px 0 rgba(0,0,0,.5)' : 'none' }}>
            <div style={{ fontFamily: F.mono, fontSize: 40, color: lit ? B.red : 'rgba(246,241,228,.4)' }}>{i + 1}</div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: lit ? B.ink : 'rgba(246,241,228,.35)' }}>{t}</div>
          </div>
        );
      })}
    </>
  );
};
const RedX: React.FC<{ x: number; y: number; at: number; s?: number }> = ({ x, y, at, s = 1 }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, at, at + 8));
  return (
    <svg width={400 * s} height={400 * s} viewBox="0 0 400 400" style={{ position: 'absolute', left: x - 200 * s, top: y - 200 * s, overflow: 'visible' }}>
      <path d="M60 60 L340 340" stroke={B.red} strokeWidth={46} strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.min(1, k * 2)} 1`} />
      <path d="M340 60 L60 340" stroke={B.red} strokeWidth={46} strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.max(0, k * 2 - 1)} 1`} />
    </svg>
  );
};
/** cross-section of a building: floors light by role */
const Section: React.FC<{ mid: number; base: number; win: number }> = ({ mid, base, win }) => {
  const f = useCurrentFrame();
  const floors = 7;
  return (
    <div style={{ position: 'absolute', left: 560, top: 150, width: 800, height: 840 }}>
      {Array.from({ length: floors }).map((_, i) => {
        const isMid = i === 3, isBase = i === floors - 1;
        const glow = isMid ? kk(f, mid, mid + 10) : isBase ? kk(f, base, base + 10) : 0;
        return (
          <div key={i} style={{ position: 'absolute', left: 0, top: i * 112, width: 800, height: 104, background: isBase ? '#2A2F38' : '#3A4150', border: '6px solid #0B0E14', boxShadow: glow ? `inset 0 0 0 9999px rgba(232,182,76,${0.55 * glow})` : 'none' }}>
            {!isBase && [30, 690].map((x) => <div key={x} style={{ position: 'absolute', left: x, top: 22, width: 80, height: 56, background: '#8FB3CF', border: '4px solid #0B0E14', opacity: 0.8 }} />)}
            {isMid && glow > 0.2 && <div style={{ position: 'absolute', left: 300, top: 14, fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 6, color: B.ink }}>MIDDLE</div>}
            {isBase && glow > 0.2 && <div style={{ position: 'absolute', left: 260, top: 14, fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 6, color: B.ink }}>BASEMENT</div>}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: -60, right: -60, top: 6 * 112 - 8, height: 10, background: '#5B4E38' }} />
      {win >= 0 && f >= win && [0, 1, 2, 4, 5].map((i) => <div key={i} style={{ position: 'absolute', left: 20, top: i * 112 + 6, width: 760, height: 90 }}><RedX x={70} y={46} at={win + i * 2} s={0.22} /><RedX x={730} y={46} at={win + i * 2 + 1} s={0.22} /></div>)}
    </div>
  );
};
/** generic columned building (exchange / bank / Fed), night */
const Columns: React.FC<{ label: string; x?: number; y?: number; s?: number; lit?: number; open?: number }> = ({ label, x = 960, y = 900, s = 1, lit = 0.4, open = 0 }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${s})`, transformOrigin: '50% 100%', width: 900, height: 620 }}>
    <svg width={900} height={620} viewBox="0 0 900 620">
      <path d="M40 170 L450 40 L860 170 Z" fill="#2A3242" stroke="#0B0E14" strokeWidth={8} />
      <rect x={60} y={170} width={780} height={50} fill="#323B4E" stroke="#0B0E14" strokeWidth={8} />
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={95 + i * 128} y={220} width={60} height={330} fill="#3B4458" stroke="#0B0E14" strokeWidth={6} />)}
      <rect x={30} y={550} width={840} height={70} fill="#262D3B" stroke="#0B0E14" strokeWidth={8} />
      <rect x={385} y={330} width={130} height={220} fill={open ? `rgba(255,214,140,${0.4 + 0.5 * open})` : '#0B0E14'} stroke="#0B0E14" strokeWidth={6} />
    </svg>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 176, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 10, color: `rgba(243,238,226,${0.4 + lit * 0.6})` }}>{label}</div>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 230, height: 320, background: `radial-gradient(ellipse at 50% 100%, rgba(255,214,140,${0.25 * lit}), transparent 70%)` }} />
  </div>
);
/** line chart that draws (down or up), with a big label */
const LineChart: React.FC<{ a: number; b: number; up?: boolean; spike?: boolean; color?: string }> = ({ a, b, up, spike, color = B.red }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, a, b));
  const pts = Array.from({ length: 40 }, (_, i) => {
    const x = 160 + i * 40;
    const base = 520 + Math.sin(i * 1.3) * 18;
    let y = base;
    if (spike) y = i > 26 ? base - (up ? 1 : -1) * 300 * Math.min(1, (i - 26) / 2) : base;
    else y = base + (up ? -1 : 1) * Math.max(0, i - 18) * 14;
    return `${x},${y}`;
  });
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={160} x2={1760} y1={260 + i * 110} y2={260 + i * 110} stroke="rgba(243,238,226,.08)" strokeWidth={2} />)}
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" pathLength={1} strokeDasharray={`${k} 1`} style={{ filter: `drop-shadow(0 0 14px ${color})` }} />
    </svg>
  );
};
const AppCard: React.FC<{ title: string; value: string; delta?: string; red?: boolean; at?: number }> = ({ title, value, delta, red, at = 0 }) => (
  <Phone x={1300} y={560} scale={0.95} rot={-3}>
    <div style={{ background: B.blue, color: B.bone, padding: '70px 26px 18px', fontFamily: cond, fontWeight: 800, fontSize: 32, letterSpacing: 3 }}>{title}</div>
    <div style={{ padding: '36px 26px' }}>
      <div style={{ fontFamily: F.mono, fontSize: 78, color: red ? B.red : B.ink }}>{value}</div>
      {delta && <div style={{ marginTop: 20, display: 'inline-block', background: red ? B.red : B.pine, color: B.bone, fontFamily: display, fontWeight: 800, fontSize: 54, padding: '2px 16px' }}>{delta}</div>}
    </div>
  </Phone>
);
const YardStamp: React.FC<{ year: string; at?: number }> = ({ year, at = 0 }) => <Stamp text={`YARDSTICK · ${year}`} x={960} y={190} at={at} size={64} color={B.gold} rot={-3} />;

// ================================ SHOTS ================================
type ShotFn = (s: number, e: number) => React.ReactNode;
const sh: [number, ShotFn][] = [];
const add = (t: number, fn: ShotFn) => sh.push([t, fn]);

// ---------- P3 · Sam, hour zero: the three official sentences
add(paraT(3), (s) => { const a = atW(s); return (
  <Cinema shakeAt={a(3, 'buzzes')} shake={5}>
    <CloseUp who="sam" seed="b1" face={{ brow: 0.9, smile: -0.5, talk: 0.2 }} beats={[]} light="rgba(255,90,70,.35)" bg="#120C10">
      <SirenWash />
    </CloseUp>
    <Pop x={1500} y={600} at={a(3, 'phone') - 3} rot={8}><Phone x={0} y={0} scale={0.6} rot={0}><div style={{ background: B.red, color: B.bone, padding: '70px 20px 16px', display: 'flex', gap: 10, alignItems: 'center' }}><BellRing size={44} color={B.bone} /><span style={{ fontFamily: cond, fontWeight: 800, fontSize: 38 }}>ALERT</span></div><div style={{ padding: 24, fontFamily: display, fontWeight: 800, fontSize: 54, color: B.ink }}>Shelter now.</div></Phone></Pop>
    <ClockRun h0={0} /><IllusTag x={210} y={150} /><Chrome />
  </Cinema>); });
add(W(3, 'The'), (s) => { const a = atW(s); return (
  <Dark src="Source: CDC, Radiation emergencies · Ready.gov, Nuclear explosion">
    <Pop x={960} y={540} at={a(3, 'official') - 4} rot={-1.5}>
      <div style={{ width: 1100, background: B.bone, border: `8px solid ${B.ink}`, boxShadow: '20px 20px 0 rgba(0,0,0,.5)' }}>
        <div style={{ background: B.blue, color: B.bone, padding: '18px 34px', display: 'flex', gap: 18, alignItems: 'center' }}><ShieldCheck size={60} color={B.bone} /><span style={{ fontFamily: cond, fontWeight: 800, fontSize: 48, letterSpacing: 6 }}>U.S. GOVERNMENT · SAFETY GUIDANCE</span></div>
        <div style={{ padding: '30px 40px' }}>{[0.95, 0.7, 0.88, 0.62, 0.8].map((w, i) => <div key={i} style={{ height: 22, width: `${w * 100}%`, background: 'rgba(27,34,48,.16)', marginBottom: 20 }} />)}</div>
      </div>
    </Pop>
  </Dark>); });
add(W(3, 'is', 0) - 0.05, (s) => { const a = atW(s); return (
  <Dark wash={0.3}>
    <Kick y={200} at={0}>THREE SHORT SENTENCES</Kick>
    <Tabs on={[a(3, 'Get') - 2, a(3, 'Stay') - 2, a(3, 'Stay', 1) - 2]} />
  </Dark>); });
add(W(3, 'Get', 1), (s) => { const f = useCurrentFrame(); const a = atW(s); const run = easeO(kk(f, 0, a(3, 'away') + 6)); return (
  <Cinema shakeAt={0} shake={4}>
    <PortNight tower={kk(f, a(3, 'solid') - 4, a(3, 'solid') + 8)} alarm={0} push={0.12} dim={0.2}>
      <HorizonCloud at={-400} x={700} y={800} s={1.1} />
      <Heli x0={1800} x1={900} y={220} dur={90} />
      <Crowd n={14} y={1040} seed="b4" scale={1.7} speed={1.4} />
      <Sam x={300 + run * 1050} y={1015} h={760} seed="b4s" walk beats={[{ at: 0, r: 'worry', hold: 400 }]} />
      <SirenWash />
    </PortNight>
    <Pop x={1420} y={260} at={a(3, 'solid') - 2}><Chip tone="gold">SOLID BUILDING</Chip></Pop>
    <Chrome />
  </Cinema>); });
add(W(3, 'car') - 0.15, (s) => { const a = atW(s); return (
  <Cinema>
    <PortNight alarm={0} dim={0.3} push={0.08}><Car x={960} y={1010} color={B.blue} scale={2.4} /><SirenWash /></PortNight>
    <RedX x={960} y={780} at={a(3, 'shelter') - 4} s={1.3} />
    <Big y={150} at={a(3, 'count') - 4} size={86}>A car is not shelter</Big>
    <Chrome />
  </Cinema>); });
add(W(3, 'Neither'), (s) => { const a = atW(s); return (
  <Cinema>
    <PortNight alarm={0} dim={0.35} push={0.1}><Crowd n={12} y={1040} seed="b6" scale={1.8} speed={1.5} /><SirenWash /></PortNight>
    <RedX x={960} y={640} at={a(3, 'street') - 4} s={1.2} />
    <Big y={150} at={0} size={86}>Neither is the street</Big>
    <Chrome />
  </Cinema>); });
add(W(3, 'You') - 0.1, (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema shakeAt={a(3, 'minutes')} shake={6}>
    <CloseUp who="sam" seed="b7" face={{ brow: 1, smile: -0.6, talk: 0.3 }} beats={[]} light="rgba(255,60,60,.4)" bg="#140A0C"><SirenWash /></CloseUp>
    <div style={{ position: 'absolute', left: 1420, top: 560, transform: 'translate(-50%,-50%)' }}>
      <svg width={360} height={360} viewBox="0 0 360 360"><circle cx={180} cy={180} r={150} fill="rgba(0,0,0,.6)" stroke="rgba(243,238,226,.25)" strokeWidth={18} /><circle cx={180} cy={180} r={150} fill="none" stroke={B.red} strokeWidth={18} pathLength={1} strokeDasharray={`${1 - kk(f, 0, 50)} 1`} transform="rotate(-90 180 180)" /></svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 64, color: B.nightText }}>minutes</div>
    </div>
    <Chrome />
  </Cinema>); });

// ---------- P4 · where inside; tunnels; Sam waits
add(paraT(4), (s) => { const a = atW(s); return (
  <Dark wash={0.15} src="Source: CDC shelter-in-place guidance · Ready.gov">
    <Section mid={a(4, 'middle') - 2} base={a(4, 'basement') - 2} win={a(4, 'windows') - 6} />
    <Pop x={1600} y={330} at={a(4, 'doors') - 2}><Chip tone="red" size={52}>AWAY FROM WINDOWS</Chip></Pop>
  </Dark>); });
add(W(4, 'What'), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Dark wash={0.1}>
    <div style={{ position: 'absolute', left: 960, top: 620, transform: 'translate(-50%,-50%)', width: 900, height: 520, borderRadius: '450px 450px 0 0', background: 'radial-gradient(ellipse at 50% 80%, #000 30%, #1A1F28 80%)', border: '22px solid #3A4150' }} />
    {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 960 - 200 + i * 80, top: 840, width: 40, height: 10, background: 'rgba(232,182,76,.4)', opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 10 + i)) }} />)}
    <Pop x={960} y={560} at={a(4, 'subway') - 4}><div style={{ fontFamily: display, fontWeight: 800, fontSize: 300, color: B.gold, textShadow: '0 0 40px rgba(232,182,76,.5)' }}>?</div></Pop>
    <Kick y={180} at={a(4, 'tunnel') - 2}>TUNNEL · SUBWAY</Kick>
  </Dark>); });
add(W(4, 'Official'), (s) => { const a = atW(s); return (
  <Dark wash={0.1} src="We found no official rule for tunnels in CDC / Ready.gov guidance">
    <Big y={330} at={0} size={110}>No official rule.</Big>
    <Stamp text="WE WON'T INVENT ONE" x={960} y={640} at={a(4, 'invent') - 4} size={90} color={B.red} rot={-5} />
  </Dark>); });
add(W(4, 'Sam'), (s) => { const f = useCurrentFrame(); const a = atW(s); const k = easeO(kk(f, 0, 45)); return (
  <Cinema>
    <AbsoluteFill style={{ background: '#11151C' }}>
      {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 300 + i * 150 - k * 150, top: 900 - i * 90 + k * 90, width: 170, height: 24, background: '#3A4150', border: '5px solid #07090C' }} />)}
      <div style={{ position: 'absolute', left: 200, top: 120, width: 1500, height: 30, background: '#2A303A', transform: 'rotate(-31deg)', transformOrigin: '0 0' }} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 60% 30%, rgba(255,230,170,.18), transparent 50%)' }} />
      <Sam x={760 + k * 80} y={860 - k * 60} h={720} seed="b11" walk beats={[{ at: 0, r: 'worry', hold: 400 }]} />
    </AbsoluteFill>
    <Pop x={1480} y={300} at={a(4, 'middle') - 2}><Chip tone="gold">MIDDLE FLOOR</Chip></Pop>
    <Chrome />
  </Cinema>); });
add(W(4, 'sits'), (s) => { const a = atW(s); return (
  <Cinema>
    <Hallway><Sam x={960} y={1010} h={760} seed="b12" beats={[{ at: 0, r: 'think', hold: a(4, 'Nothing') }, { at: a(4, 'Nothing'), r: 'nod', hold: 40 }]} /></Hallway>
    <Pop x={1500} y={300} at={a(4, 'inner') - 2}><Chip tone="bone">INNER HALLWAY</Chip></Pop>
    <Big y={150} at={a(4, 'Nothing') - 2} size={90}>Nothing.</Big>
    <Chrome />
  </Cinema>); });
add(W(4, 'Sam', 1), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema>
    <Hallway><Sam x={760} y={1010} h={760} seed="b13" pose="phone" beats={[{ at: 0, r: 'worry', hold: 400 }]} /><RadioProp x={1240} y={1000} s={1.3} /></Hallway>
    <ClockRun h0={0} h1={1} a={0} b={fr(3)} />
    <Pop x={1240} y={560} at={a(4, 'tuned') - 2}><Chip tone="gold" size={54}>STAY TUNED</Chip></Pop>
    <Chrome />
  </Cinema>); });
add(W(4, 'Officials'), (s) => { const a = atW(s); return (
  <Dark wash={0.2}>
    <Pop x={700} y={560} at={0}><div style={{ width: 300, height: 300, borderRadius: '50%', background: B.bone, border: `8px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Megaphone size={170} color={B.ink} /></div></Pop>
    <div style={{ position: 'absolute', left: 950, top: 440 }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: B.nightText, lineHeight: 1 }}>Officials</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: B.gold, lineHeight: 1.1, opacity: kk(useCurrentFrame(), a(4, 'decide') - 4, a(4, 'decide') + 4) }}>decide.</div>
    </div>
  </Dark>); });

// ---------- P5 · Jake, door one: stocks
add(paraT(5), (s) => { const a = atW(s); return (
  <Cinema>
    <Apartment tv={<TvArchive trim={300} label="BREAKING · THE GULF" />}><Jake x={420} y={1050} h={760} seed="b15" beats={[{ at: 0, r: 'worry', hold: 400 }]} /></Apartment>
    <ClockRun h0={0} h1={6} a={a(5, 'zero')} b={a(5, 'six') + 10} />
    <Chrome />
  </Cinema>); });
add(W(5, 'Door'), (s) => { const a = atW(s); return (
  <Dark wash={0.15}>
    <Door x={960} y={900} n={1} I={TrendingDown} label="STOCKS" at={0} openAt={a(5, 'Stocks') - 2} w={330} color={B.red} />
    <Big y={140} at={0} size={110}>Door 1 · Stocks</Big>
  </Dark>); });
add(W(5, 'Sunday') - 0.2, (s) => { const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#060A16, #121C36)' }}><Columns label="STOCK EXCHANGE" lit={0.25} /><SirenWash k={0.15} /></AbsoluteFill>
    <Big y={150} at={a(5, 'dark') - 6} size={84}>Not fully dark</Big>
    <Chrome />
  </Cinema>); });
add(W(5, 'Futures'), (s) => { const a = atW(s); return (
  <Dark wash={0.1}>
    <LineChart a={0} b={fr(2.5)} />
    <Pop x={360} y={220} at={0}><Chip tone="red">FUTURES ▼</Chip></Pop>
    <Kick y={880} at={a(5, 'evening') - 4} color={B.nightText}>BETS ON MONDAY'S OPEN</Kick>
  </Dark>); });
add(W(5, 'and', 0), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, #1C2D30 0%, ${B.night} 75%)` }}>
      <div style={{ opacity: 0.45 }}><NightUS x={200} y={300} w={700} at={0} /></div>
      {[[1500, 420, 'TOKYO'], [1390, 520, 'HONG KONG'], [1660, 560, 'SYDNEY']].map(([x, y, l], i) => <MapPin key={i} x={x as number} y={y as number} label={l as string} at={a(5, 'Asian') - 4 + i * 5} color={B.gold} />)}
      <Big y={820} at={a(5, 'sleeps') - 4} size={70}>…while America sleeps</Big>
    </AbsoluteFill>
    <Chrome src="Illustrative map · exchange hours vary" />
  </Cinema>); });
add(W(5, 'So'), (s) => { const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: '#0E1220' }}>
      <Jake x={480} y={1080} h={900} seed="b19" pose="phone" beats={[{ at: 0, r: 'worry', hold: 400 }]} />
      <AppCard title="FUTURES · S&P 500" value="▼ ▼ ▼" delta="a bet" red />
      <SirenWash k={0.1} />
    </AbsoluteFill>
    <Kick y={150} at={a(5, 'world') - 4} color={B.nightText}>THE WORLD IS WATCHING</Kick>
    <Chrome />
  </Cinema>); });
add(paraT(6), (s) => { const f = useCurrentFrame(); const a = atW(s); const k = easeO(kk(f, a(6, 'switch') - 4, a(6, 'switch') + 10)); return (
  <Dark wash={0.1} src="Rule: NYSE / Nasdaq market-wide circuit breakers (SEC-approved)">
    <div style={{ position: 'absolute', left: 620, top: 300, width: 220, height: 420, background: '#2A3242', border: `10px solid ${B.ink}`, borderRadius: 20 }}>
      <div style={{ position: 'absolute', left: 80, top: 40, width: 40, height: 330, background: '#0B0E14', borderRadius: 20 }} />
      <div style={{ position: 'absolute', left: 30, top: 40 + k * 230, width: 140, height: 100, background: B.red, border: `8px solid ${B.ink}`, borderRadius: 18 }} />
    </div>
    <Pop x={1250} y={520} at={a(6, 'written') - 2} rot={3}><div style={{ width: 520, padding: 30, background: B.bone, border: `8px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(0,0,0,.5)' }}><BookOpen size={90} color={B.ink} /><div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: B.ink }}>The rulebook</div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: B.red }}>WRITTEN IN ADVANCE</div></div></Pop>
    <Kick y={160} at={0}>A SAFETY SWITCH</Kick>
  </Dark>); });
const Stairs: React.FC<{ s: number; steps: [string, number][]; close?: number }> = ({ steps, close = -1 }) => {
  const f = useCurrentFrame();
  return (
    <>
      {steps.map(([l, at], i) => {
        const k = easeO(kk(f, at - 4, at + 8));
        return <div key={i} style={{ position: 'absolute', left: 260 + i * 470, top: 300 + i * 170, width: 440, height: 150, background: k > 0.5 ? B.red : '#2A3242', border: `8px solid ${B.ink}`, opacity: 0.3 + 0.7 * k, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 90, color: B.bone }}>{l}</div>;
      })}
      {close >= 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: 96, height: 888 * easeO(kk(f, close - 4, close + 14)), background: 'repeating-linear-gradient(#2B3140 0 40px, #1E232E 40px 46px)', borderBottom: `14px solid ${B.red}` }}><div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 120, letterSpacing: 20, color: B.red }}>CLOSED FOR THE DAY</div></div>}
    </>
  );
};
add(W(6, 'If'), (s) => { const f = useCurrentFrame(); const a = atW(s); const st = a(6, 'stops'); return (
  <Dark wash={0.1}>
    <Kick y={160} at={0}>S&amp;P 500, ONE DAY</Kick>
    <Stairs s={s} steps={[['−7%', a(6, 'seven')]]} />
    <Pop x={1300} y={720} at={st - 2}><div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><Chip tone="red">HALT</Chip><div style={{ fontFamily: F.mono, fontSize: 110, color: B.nightText }}>{`${String(Math.max(0, 15 - Math.floor(kk(f, st, st + 60) * 15))).padStart(2, '0')}:00`}</div></div></Pop>
  </Dark>); });
add(W(6, 'At'), (s) => { const a = atW(s); return (
  <Dark wash={0.1}>
    <Kick y={160} at={0}>THEN</Kick>
    <Stairs s={s} steps={[['−7%', -10], ['−13%', a(6, 'thirteen')], ['−20%', a(6, 'twenty')]]} close={a(6, 'over') - 2} />
  </Dark>); });
add(paraT(7), (s) => { const a = atW(s); return (
  <Dark wash={0} src="NYSE, AMEX, Nasdaq closed Sep 11 – Sep 17, 2001 (PBS NewsHour)">
    <YardStamp year="2001" at={0} />
    <FlipCalendar x={960} y={560} dates={[['SEP', '11'], ['SEP', '12'], ['SEP', '13'], ['SEP', '14'], ['SEP', '17']]} from={a(7, 'September')} to={a(7, 'days') + 6} size={1.1} />
    <Pop x={1500} y={600} at={a(7, 'four') - 2}><Chip tone="red">CLOSED 4 DAYS</Chip></Pop>
  </Dark>); });
add(W(7, 'When'), (s) => { const f = useCurrentFrame(); const a = atW(s); const v = Math.round(684 * easeO(kk(f, a(7, 'six') - 4, a(7, 'points') + 4))); return (
  <Dark wash={0} src="Dow −684.81 (−7.1%) on Sep 17, 2001 · PBS NewsHour">
    <LineChart a={0} b={a(7, 'points') + 4} />
    <Pop x={1450} y={300} at={a(7, 'fell') - 4}><div style={{ fontFamily: F.mono, fontSize: 150, color: B.red, textShadow: '0 0 30px rgba(229,72,59,.6)' }}>−{v}</div></Pop>
    <Pop x={1450} y={470} at={a(7, 'percent') - 6}><Chip tone="red" size={70}>−7%+</Chip></Pop>
    <Kick y={160} at={0}>THE DOW · FIRST DAY BACK</Kick>
  </Dark>); });
add(W(7, 'ten') - 0.25, (s) => { const f = useCurrentFrame(); const a = atW(s); const v = 10000 - 700 * easeO(kk(f, a(7, 'seven', 1) - 4, a(7, 'dollars') + 4)); return (
  <Cinema>
    <AbsoluteFill style={{ background: '#0E1220' }}>
      <Jake x={480} y={1080} h={900} seed="b26" pose="phone" beats={[{ at: a(7, 'seven', 1), r: 'worry', hold: 400 }]} />
      <AppCard title="RETIREMENT · 401(k)" value={`$${Math.round(v).toLocaleString('en-US')}`} delta={f > a(7, 'seven', 1) ? '−$700' : undefined} red={f > a(7, 'seven', 1)} />
    </AbsoluteFill>
    <IllusTag x={210} y={150} /><Chrome src="Illustrative: $10,000 × 7%" />
  </Cinema>); });
add(W(7, 'paper') - 0.3, (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema>
    <CloseUp who="jake" seed="b27" beats={[{ at: 0, r: 'think', hold: a(7, 'sell') - 4 }, { at: a(7, 'sell'), r: 'nod', hold: 40 }]} light="rgba(140,180,230,.3)" />
    <Pop x={1450} y={600} at={6}><div style={{ background: '#1B2230', border: `6px solid ${B.bone}`, padding: '20px 60px', fontFamily: cond, fontWeight: 800, fontSize: 80, letterSpacing: 10, color: B.bone, opacity: 0.5 + 0.3 * Math.sin(f / 8) }}>SELL?</div></Pop>
    <Big y={150} at={0} size={86}>On paper.</Big>
    <Chrome />
  </Cinema>); });

// ---------- P8–10 · door two: oil and the pump
add(paraT(8), (s) => { const a = atW(s); return (
  <Dark wash={0.15}>
    <Door x={960} y={900} n={2} I={TrendingUp} label="OIL · THE PUMP" at={0} openAt={a(8, 'pump') - 2} w={330} color={B.amber} />
    <Big y={140} at={0} size={110}>Door 2 · Oil &amp; the pump</Big>
    <ClockRun h0={6} h1={12} a={a(8, 'six') - 2} b={a(8, 'twelve') + 10} />
  </Dark>); });
add(W(8, 'About'), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema grade="saturate(.8) contrast(1.1)">
    <GulfMap labels zoom={1.15 + f / 3000} at={a(8, 'Hormuz') - 6} />
    <Pop x={960} y={190} at={a(8, 'million') - 4}><Chip tone="gold">20 MILLION BARRELS / DAY</Chip></Pop>
    <Chrome src="EIA: ~20 million b/d through Hormuz in 2024" />
  </Cinema>); });
add(W(8, 'Roughly'), (s) => { const f = useCurrentFrame(); const a = atW(s); const k = easeO(kk(f, a(8, 'fifth') - 4, a(8, 'fifth') + 14)); return (
  <Dark wash={0} src="EIA: ≈ 20% of world petroleum liquids consumption">
    <Globe x={760} y={560} r={300} at={0} />
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}><path d={`M760 560 L760 260 A300 300 0 0 1 ${760 + 300 * Math.sin(2 * Math.PI * 0.2 * k)} ${560 - 300 * Math.cos(2 * Math.PI * 0.2 * k)} Z`} fill="rgba(229,72,59,.75)" stroke={B.ink} strokeWidth={6} /></svg>
    <Pop x={1400} y={560} at={a(8, 'fifth') - 2}><div style={{ fontFamily: display, fontWeight: 800, fontSize: 220, color: B.red }}>1/5</div></Pop>
  </Dark>); });
add(W(8, 'Oil', 2), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#0A1220, #0D1B26 60%, #060C12)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 700, bottom: 0, background: 'linear-gradient(#0D1B26, #04080C)' }} />
      <div style={{ transform: `translateX(${-kk(f, 0, a(8, 'shock')) * 200}px)` }}><Tanker x={700} y={760} scale={1.8} flag={B.red} /></div>
      <Pop x={1450} y={430} at={a(8, 'price') - 4}><Chip tone="red">OIL PRICE ▲</Chip></Pop>
      <div style={{ position: 'absolute', left: 0, top: 0, opacity: kk(f, a(8, 'American') - 6, a(8, 'American') + 4) }}><Pump x={1500} y={1000} scale={0.6} night sale="$4.15" hose="holster" glow={1} /></div>
      <SirenWash k={0.15} />
    </AbsoluteFill>
    <Kick y={150} at={a(8, 'one') - 2} color={B.nightText}>ONE WORLD PRICE</Kick>
    <Chrome />
  </Cinema>); });
add(paraT(9), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema shakeAt={a(9, 'hit')} shake={6}>
    <AbsoluteFill style={{ background: 'linear-gradient(#0B0F1A 0%, #2A1F28 70%, #3B2A22 100%)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#1E1714' }} />
      <Refinery x={960} y={840} scale={1.6} />
      <HorizonCloud at={a(9, 'hit') - 2} x={1000} y={860} s={0.9} />
      <YardStamp year="2019" at={0} />
    </AbsoluteFill>
    <Kick y={880} at={a(9, 'biggest') - 4} color={B.nightText}>SAUDI ARABIA · BIGGEST OIL PLANT</Kick>
    <Chrome src="Abqaiq attack, 14 Sep 2019 · 5.7M b/d knocked out (EIA)" />
  </Cinema>); });
add(W(9, 'Monday') - 0.2, (s) => { const f = useCurrentFrame(); const a = atW(s); const v = (14.6 * easeO(kk(f, a(9, 'fourteen') - 4, a(9, 'percent') + 4))).toFixed(1); return (
  <Dark wash={0} src="Brent settled +14.6% on 16 Sep 2019, largest one-day % gain since at least 1988 (Reuters)">
    <LineChart a={0} b={a(9, 'fourteen') + 6} up spike color={B.amber} />
    <Pop x={1450} y={300} at={a(9, 'closed') - 4}><div style={{ fontFamily: F.mono, fontSize: 160, color: B.amber, textShadow: '0 0 30px rgba(217,164,65,.6)' }}>+{v}%</div></Pop>
    <Kick y={160} at={0}>BRENT CRUDE · MONDAY</Kick>
  </Dark>); });
add(W(9, 'That'), (s) => { const f = useCurrentFrame(); const a = atW(s); const z = 1.9 - 0.8 * easeIO(kk(f, a(9, 'whole') - 10, a(9, 'region') + 10)); return (
  <Cinema grade="saturate(.8) contrast(1.15)">
    <GulfMap labels={false} zoom={z} red={a(9, 'whole') - 4} />
    <Big y={150} at={a(9, 'whole') - 4} size={90}>A whole region</Big>
    <Chrome />
  </Cinema>); });
add(paraT(10), (s) => { const f = useCurrentFrame(); const a = atW(s); const drop = easeO(kk(f, a(10, 'gas') - 4, a(10, 'cents') + 4)); return (
  <Dark wash={0} src="42 gallons per barrel → $1 ≈ 2.4¢ a gallon (rule of thumb)">
    <Barrel x={620} y={820} scale={1.6} tag="+$1" at={a(10, 'dollar') - 4} />
    <div style={{ position: 'absolute', left: 900 + drop * 300, top: 500 + drop * 200, width: 70, height: 70, borderRadius: 35, background: B.amber, border: `6px solid ${B.ink}`, opacity: kk(f, a(10, 'gas') - 4, a(10, 'gas')) }} />
    <Pop x={1400} y={560} at={a(10, 'two') - 4}><Chip tone="gold" size={90}>+2.4¢ / gal</Chip></Pop>
    <Kick y={160} at={0}>RULE OF THUMB</Kick>
  </Dark>); });
add(W(10, 'Twenty'), (s) => { const f = useCurrentFrame(); const a = atW(s); const v = (7.2 * easeO(kk(f, a(10, 'seven') - 4, a(10, 'twenty', 1) + 6))).toFixed(2); return (
  <Cinema>
    <Station night price="4.15"><Jake x={1180} y={1000} h={720} seed="b37" pose="pump" beats={[{ at: a(10, 'seven'), r: 'worry', hold: 400 }]} /></Station>
    <Pop x={720} y={330} at={a(10, 'forty-eight') - 4}><Chip tone="red">+48¢ / gal</Chip></Pop>
    <Pop x={720} y={480} at={a(10, 'seven') - 4}><Chip tone="gold">15 gal · +${v}</Chip></Pop>
    <IllusTag x={210} y={150} /><Chrome src="Illustrative: +$20/bbl × 2.4¢ × 15 gal" />
  </Cinema>); });
add(W(10, 'His'), (s) => { const f = useCurrentFrame(); const a = atW(s); const v = 62.3 + 7.2 * easeO(kk(f, a(10, 'sixty-nine') - 6, a(10, 'fifty') + 6)); return (
  <Cinema>
    <AbsoluteFill style={{ background: '#0B0F18' }}>
      <div style={{ position: 'absolute', left: 960, top: 560, transform: 'translate(-50%,-50%)', background: '#05070A', border: '12px solid #2A3242', padding: '30px 80px', boxShadow: '0 0 80px rgba(232,182,76,.25)' }}>
        <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: B.gold }}>JAKE'S TANK</div>
        <div style={{ fontFamily: F.mono, fontSize: 230, color: f > a(10, 'sixty-nine') ? '#FF5A4A' : '#9BE59B', textShadow: '0 0 30px currentColor' }}>${v.toFixed(2)}</div>
      </div>
    </AbsoluteFill>
    <Chrome src="EIA regular $4.153 (week of 2 Nov 2026) × 15 gal = $62.30 · illustrative" />
  </Cinema>); });
add(W(10, 'Not'), (s) => { const f = useCurrentFrame(); const a = atW(s); const r = easeO(kk(f, a(10, 'rocket') - 6, a(10, 'rocket') + 10)), fe = kk(f, a(10, 'feather') - 4, a(10, 'feather') + 80); return (
  <Dark wash={0} src="Pump prices tend to rise faster than they fall (St. Louis Fed, FTC)">
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      <polyline points={`200,820 600,820 ${600 + 160 * r},${820 - 520 * r}`} fill="none" stroke={B.red} strokeWidth={12} />
      <path d={`M ${760} 300 C 900 ${300 + fe * 160}, 1000 ${300 + fe * 260}, ${760 + fe * 900} ${300 + fe * 500}`} fill="none" stroke={B.nightText} strokeWidth={8} strokeDasharray="20 14" opacity={fe > 0 ? 1 : 0} />
    </svg>
    <Big y={150} at={0} size={84}>Not tonight.</Big>
    <Kick y={880} at={a(10, 'feather') - 2} color={B.nightText}>UP LIKE A ROCKET · DOWN LIKE A FEATHER</Kick>
  </Dark>); });

// ---------- P11 · Sam, hour twelve
add(paraT(11), (s) => { const a = atW(s); return (
  <Cinema>
    <Hallway><Sam x={760} y={1010} h={760} seed="b40" beats={[{ at: 0, r: 'think', hold: 60 }, { at: a(11, 'Stay'), r: 'nod', hold: 40 }]} /><RadioProp x={1240} y={1000} s={1.3} /></Hallway>
    <ClockRun h0={1} h1={12} a={0} b={a(11, 'twelve') + 8} />
    <Pop x={1240} y={480} at={a(11, 'Stay') - 2}><div style={{ background: '#05070A', border: `6px solid ${B.gold}`, padding: '14px 34px', fontFamily: F.mono, fontSize: 60, color: B.gold }}>“STAY WHERE YOU ARE.”</div></Pop>
    <Chrome />
  </Cinema>); });
add(W(11, 'No'), (s) => { const a = atW(s); return (
  <Cinema>
    <CloseUp who="sam" seed="b41" face={{ brow: 0.3, smile: 0.1 }} beats={[{ at: a(11, 'point'), r: 'nod', hold: 30 }]} light="rgba(255,230,170,.25)" bg="#151A22" />
    <Big y={150} at={a(11, 'boring') - 6} size={80}>One boring instruction</Big>
    <Chrome />
  </Cinema>); });

// ---------- P12–13 · door three: the bank
add(paraT(12), (s) => { const a = atW(s); return (
  <Dark wash={0.15}>
    <Door x={960} y={900} n={3} I={Landmark} label="YOUR BANK" at={0} openAt={a(12, 'bank') - 2} w={330} color={B.blue} />
    <Big y={140} at={0} size={110}>Door 3 · Your bank</Big>
    <ClockRun h0={12} h1={24} a={a(12, 'twelve') - 2} b={a(12, 'twenty-four') + 10} />
  </Dark>); });
add(W(12, 'March') - 0.15, (s) => { const f = useCurrentFrame(); const a = atW(s); const v = 42 * easeO(kk(f, a(12, 'forty-two') - 6, a(12, 'billion') + 10)); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#060A16, #121C36)' }}>
      <Columns label="A BANK" x={700} lit={0.3} s={0.9} />
      {Array.from({ length: 16 }).map((_, i) => { const t = ((f * 1.6 + i * 23) % 160) / 160; return <div key={i} style={{ position: 'absolute', left: 820 + t * 800, top: 600 - Math.sin(t * Math.PI) * 260 + (i % 4) * 20, width: 70, height: 34, background: '#9DBF8A', border: `3px solid ${B.ink}`, opacity: f > a(12, 'pull') - 6 ? 1 - t * 0.6 : 0 }} />; })}
      <Pop x={1500} y={300} at={a(12, 'forty-two') - 6}><div style={{ fontFamily: F.mono, fontSize: 140, color: B.red, textShadow: '0 0 30px rgba(229,72,59,.6)' }}>${v.toFixed(0)}B</div></Pop>
      <Pop x={1500} y={460} at={a(12, 'eight') - 4}><Chip tone="red">IN 8 HOURS</Chip></Pop>
      <YardStamp year="2023" at={0} />
    </AbsoluteFill>
    <Chrome src="Silicon Valley Bank, 9 Mar 2023: ≈ $42B withdrawal requests (California DFPI)" />
  </Cinema>); });
add(W(12, 'About'), (s) => { const f = useCurrentFrame(); const a = atW(s); const k = easeO(kk(f, a(12, 'quarter') - 4, a(12, 'held') + 6)); return (
  <Dark wash={0}>
    <div style={{ position: 'absolute', left: 760, top: 240, width: 400, height: 640, border: `10px solid ${B.bone}`, background: '#0B0E14' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${100 - 25 * k}%`, background: '#9DBF8A' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: `${25 * k}%`, background: 'repeating-linear-gradient(45deg, rgba(229,72,59,.35) 0 12px, transparent 12px 24px)' }} />
    </div>
    <Pop x={1420} y={330} at={a(12, 'quarter') - 2}><Chip tone="red" size={90}>≈ 1/4 GONE</Chip></Pop>
  </Dark>); });
add(W(12, 'Deposit', 1), (s) => { const a = atW(s); return (
  <Dark wash={0} src="FDIC: $250,000 per depositor, per insured bank, per ownership category">
    <Pop x={560} y={560} at={0}><ShieldCheck size={380} color={B.gold} strokeWidth={1.6} /></Pop>
    <Pop x={1250} y={330} at={a(12, 'hundred') - 4}><div style={{ fontFamily: display, fontWeight: 800, fontSize: 180, color: B.nightText }}>$250,000</div></Pop>
    {['PER PERSON', 'PER BANK', 'PER CATEGORY'].map((t, i) => <Pop key={t} x={1250} y={540 + i * 120} at={a(12, ['person', 'bank', 'category'][i], i === 1 ? 2 : 0) - 2}><Chip tone="gold" size={56}>{t}</Chip></Pop>)}
  </Dark>); });
add(W(12, 'Checking'), (s) => { const a = atW(s); const items: [string, string, boolean][] = [['CHECKING', 'Checking', true], ['SAVINGS', 'savings', true], ['CDs', 'Ds', true], ['STOCKS', 'stocks', false], ['BONDS', 'bonds', false]]; return (
  <Dark wash={0} src="FDIC covers deposits; stocks and bonds are not deposits">
    {items.map(([l, w, ok], i) => (
      <Pop key={l} x={260 + i * 350} y={560} at={a(12, w) - 3}>
        <div style={{ width: 300, padding: '30px 0', textAlign: 'center', background: ok ? B.bone : '#2A3242', border: `7px solid ${B.ink}` }}>
          {ok ? <Check size={110} color={B.pine} strokeWidth={3} /> : <X size={110} color={B.red} strokeWidth={3} />}
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 4, color: ok ? B.ink : B.nightText }}>{l}</div>
        </div>
      </Pop>
    ))}
  </Dark>); });
add(paraT(13), (s) => { const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#050812, #101A30)' }}><Columns label="FEDERAL RESERVE" lit={0.9} /><SirenWash k={0.1} /></AbsoluteFill>
    <Big y={150} at={a(13, 'Sunday') - 6} size={84}>Sunday nights, before</Big>
    <Chrome />
  </Cinema>); });
add(W(13, 'Sunday', 1) - 0.2, (s) => { const f = useCurrentFrame(); const a = atW(s); const r = 1.25 * (1 - easeO(kk(f, a(13, 'cut') - 4, a(13, 'zero') + 8))); return (
  <Dark wash={0} src="Federal Reserve, Sun 15 Mar 2020: target 0–0.25%, ≥ $700B purchases">
    <YardStamp year="2020" at={0} />
    <FlipCalendar x={560} y={580} dates={[['MAR', '13'], ['MAR', '14'], ['MAR', '15']]} from={0} to={a(13, 'fifteenth') + 6} size={1} />
    <div style={{ position: 'absolute', left: 1300, top: 560, transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 8, color: B.gold }}>FED RATE</div>
      <div style={{ fontFamily: F.mono, fontSize: 200, color: B.nightText }}>{r.toFixed(2)}%</div>
    </div>
  </Dark>); });
add(W(13, 'and', 1), (s) => { const f = useCurrentFrame(); const a = atW(s); const v = 700 * easeO(kk(f, a(13, 'seven') - 6, a(13, 'billion') + 10)); return (
  <Dark wash={0}>
    {Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 520 + (i % 2) * 8, top: 840 - i * 42 * kk(f, a(13, 'seven') - 6 + i, a(13, 'seven') + i), width: 380, height: 40, background: '#9DBF8A', border: `4px solid ${B.ink}` }} />)}
    <Pop x={1300} y={480} at={a(13, 'seven') - 6}><div style={{ fontFamily: F.mono, fontSize: 170, color: B.nightText }}>${Math.round(v)}B</div></Pop>
    <Pop x={1300} y={660} at={a(13, 'Monday') - 6}><Chip tone="gold">BEFORE MONDAY'S OPEN</Chip></Pop>
  </Dark>); });
add(W(13, 'emergency') - 0.1, (s) => { const f = useCurrentFrame(); const a = atW(s); const k = easeO(kk(f, 0, 20)); return (
  <Dark wash={0.1}>
    <div style={{ position: 'absolute', left: 960, top: 620, transform: `translate(-50%,-50%) perspective(1400px) rotateX(${(1 - k) * 60}deg)`, width: 1100, height: 580, background: B.bone, border: `10px solid ${B.ink}`, display: 'flex' }}>
      <div style={{ flex: 1, borderRight: `6px solid ${B.ink}`, padding: 50 }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 6, color: B.red }}>EMERGENCY</div>{[0.9, 0.7, 0.8, 0.6].map((w, i) => <div key={i} style={{ height: 20, width: `${w * 100}%`, background: 'rgba(27,34,48,.18)', marginTop: 26 }} />)}</div>
      <div style={{ flex: 1, padding: 50 }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 6, color: B.red }}>SUNDAY MOVE</div>{[0.8, 0.9, 0.5, 0.7].map((w, i) => <div key={i} style={{ height: 20, width: `${w * 100}%`, background: 'rgba(27,34,48,.18)', marginTop: 26 }} />)}</div>
    </div>
    <Big y={110} at={a(13, 'playbook') - 6} size={84}>Already in the playbook</Big>
  </Dark>); });

// ---------- P14 · daily life · Maya · Luis
add(paraT(14), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Dark wash={0.1}>
    <div style={{ position: 'absolute', left: 0, top: 0, transform: `translateX(${-kk(f, a(14, 'Shipping') - 4, a(14, 'Shipping') + 60) * 300}px)` }}><Tanker x={600} y={460} scale={1.2} /></div>
    {['$', '$$', '$$$'].map((t, i) => <Pop key={i} x={1100 + i * 230} y={720} at={a(14, 'grocery') - 4 + i * 4}><div style={{ width: 190, height: 230, background: B.bone, border: `6px solid ${B.ink}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 30, color: B.muted }}>GROCERY</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: B.red }}>{t}▲</div></div></Pop>)}
    <Kick y={160} at={0}>DAILY LIFE CHANGES TOO</Kick>
  </Dark>); });
add(W(14, 'Maya'), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#0F1A2B, #1E2C45 60%, #2A2836)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#1A1D24' }} />
      {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: ((i * 300 - f * 14) % 2400 + 2400) % 2400 - 200, top: 900, width: 140, height: 12, background: 'rgba(243,238,226,.5)' }} />)}
      <div style={{ transform: `translateY(${Math.sin(f / 4) * 3}px)` }}><Car x={900} y={890} color={B.pine} scale={2.2} /></div>
    </AbsoluteFill>
    <NameTag x={1450} y={300} name="Maya" sub="40 MILES EACH WAY" at={a(14, 'Maya') - 2} dark />
    <Pop x={1450} y={520} at={a(14, 'twice') - 4}><Chip tone="red">2× THE PUMP</Chip></Pop>
    <IllusTag x={210} y={150} /><Chrome />
  </Cinema>); });
add(W(14, 'Luis'), (s) => { const f = useCurrentFrame(); const a = atW(s); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'linear-gradient(#0F1A2B, #1E2C45 60%, #2A2836)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#1A1D24' }} />
      <div style={{ transform: `translateX(${-200 + kk(f, 0, 140) * 300}px)` }}><Van x={760} y={900} scale={2} /></div>
    </AbsoluteFill>
    <NameTag x={1450} y={300} name="Luis" sub="DIESEL DELIVERY VAN" at={a(14, 'Luis') - 2} dark />
    <Pop x={1450} y={520} at={a(14, 'diesel') - 4}><Chip tone="red">DIESEL $6+</Chip></Pop>
    <Pop x={1450} y={660} at={a(14, 'shelf') - 6}><Chip tone="gold">→ GROCERY SHELF</Chip></Pop>
    <IllusTag x={210} y={150} /><Chrome src="EIA diesel $6.292 (week of 2 Nov 2026)" />
  </Cinema>); });

// ---------- P15 · hour twenty-four
add(paraT(15), (s) => { const a = atW(s); return (
  <Cinema>
    <Hallway dawn={1}><Sam x={760} y={1010} h={760} seed="b55" beats={[{ at: 0, r: 'think', hold: a(15, 'Stay') }, { at: a(15, 'Stay'), r: 'nod', hold: 40 }]} /><RadioProp x={1240} y={1000} s={1.3} /></Hallway>
    <ClockRun h0={12} h1={24} a={0} b={a(15, 'twenty-four') + 10} />
    <Pop x={1240} y={480} at={a(15, 'Stay') - 2}><div style={{ background: '#05070A', border: `6px solid ${B.gold}`, padding: '14px 34px', fontFamily: F.mono, fontSize: 70, color: B.gold }}>“STAY.”</div></Pop>
    <Chrome />
  </Cinema>); });
add(W(15, "Jake's"), (s) => { const a = atW(s); return (
  <Cinema>
    <Apartment dawn tv={<TvArchive trim={330} label="MARKETS RATTLED" />}><Jake x={420} y={1050} h={760} seed="b56" beats={[{ at: 0, r: 'worry', hold: a(15, 'But') }, { at: a(15, 'insured'), r: 'smile', hold: 60 }]} /></Apartment>
    <Pop x={800} y={330} at={a(15, 'Gas') - 3}><Chip tone="red" size={54}>GAS ▲</Chip></Pop>
    <Pop x={800} y={450} at={a(15, 'market') - 3}><Chip tone="red" size={54}>MARKET ▼</Chip></Pop>
    <Pop x={800} y={570} at={a(15, 'bank') - 3}><Chip tone="pine" size={54}>BANK OPEN ✓</Chip></Pop>
    <Chrome />
  </Cinema>); });

// ---------- P16 · three things worth knowing
add(paraT(16), (s) => { const a = atW(s); return (
  <Dark wash={0}>
    <Kick y={160} at={0}>THREE THINGS WORTH KNOWING · 1</Kick>
    <Tabs on={[a(16, 'Get') - 2, a(16, 'stay') - 2, a(16, 'stay', 1) - 2]} />
  </Dark>); });
add(W(16, 'Two'), (s) => (
  <Dark wash={0}>
    <Kick y={160} at={0}>2</Kick>
    <Pop x={960} y={500} at={0}><ShieldCheck size={300} color={B.gold} strokeWidth={1.6} /></Pop>
    <Big y={720} at={4} size={96}>Know what's insured</Big>
  </Dark>));
add(W(16, 'Three', 2), (s) => { const a = atW(s); return (
  <Dark wash={0}>
    <Kick y={160} at={0}>3</Kick>
    <Big y={380} at={a(16, 'paper') - 4} size={96}>A paper loss isn't a loss…</Big>
    <Big y={560} at={a(16, 'pump') - 4} size={80} color={B.gold}>The pump moves over weeks</Big>
  </Dark>); });

// ---------- P17 · back to Sunday 6 p.m.
add(paraT(17), (s) => { const f = useCurrentFrame(); return (
  <Cinema>
    <PortNight push={0.1}><Clock24 x={960} y={420} r={190} hour={18} at={0} label="SUN · 6:00 PM" /></PortNight>
    <Big y={860} at={atW(s)(17, 'happened') - 4} size={70}>Nothing has happened.</Big>
    <Chrome />
  </Cinema>); });
add(W(17, 'But'), (s) => { const a = atW(s); return (
  <Dark wash={0}>
    {[['GUIDANCE', 'guidance'], ['RULES', 'rules'], ['YARDSTICKS', 'yardsticks']].map(([t, w], i) => <Stamp key={t} text={`${t} · REAL`} x={960} y={330 + i * 200} at={a(17, w) - 3} size={84} color={i === 2 ? B.gold : B.red} rot={[-4, 3, -2][i]} />)}
  </Dark>); });
add(W(17, 'Panic'), (s) => { const f = useCurrentFrame(); const a = atW(s); const p = easeO(kk(f, 0, 12)), q = kk(f, a(17, 'Prices') - 4, a(17, 'Prices') + 60); return (
  <Dark wash={0.2}>
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      <polyline points={`200,700 ${200 + 300 * p},${700 - 380 * p} ${200 + 360 * p},700`} fill="none" stroke={B.red} strokeWidth={12} />
      <path d={`M1000 700 Q 1300 ${700 - 120 * q} ${1000 + 700 * q} ${700 - 200 * q}`} fill="none" stroke={B.gold} strokeWidth={12} />
    </svg>
    <div style={{ position: 'absolute', left: 160, top: 790, fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 12, color: B.red }}>PANIC IS FAST</div>
    <div style={{ position: 'absolute', left: 1000, top: 790, fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 12, color: B.gold, opacity: kk(f, a(17, 'Prices') - 2, a(17, 'Prices') + 6) }}>PRICES ARE SLOW</div>
  </Dark>); });

// ---------- P18 · disclaimer · P19 · end card
add(paraT(18), (s) => { const a = atW(s); return (
  <Dark wash={0}>
    <div style={{ position: 'absolute', left: 260, right: 260, top: 260 }}>
      {[['Education only.', 'education'], ['Not safety instructions.', 'safety'], ['Not financial advice.', 'financial'], ['In an emergency: follow local officials.', 'follow'], ['Hypothetical · built from public records.', 'hypothetical']].map(([t, w], i) => {
        const f = useCurrentFrame(); const o = kk(f, a(18, w) - 6, a(18, w) + 4);
        return <div key={i} style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: i === 3 ? B.gold : B.nightText, opacity: o, transform: `translateY(${(1 - o) * 20}px)`, marginBottom: 26 }}>{t}</div>;
      })}
    </div>
  </Dark>); });
add(paraT(19), (s) => { const f = useCurrentFrame(); const { fps } = useVideoConfig(); const k = spr(f, 0, fps, 16, 120); return (
  <Cinema>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, #1B2433 0%, #07090E 75%)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', transform: `scale(${k})` }}>
        <Img src={staticFile('brand/logo.png')} style={{ width: 170, height: 170 }} />
        <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 96, letterSpacing: 16, color: B.nightText, marginTop: 10 }}>DOLLARLY</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 56, color: B.gold }}>Your Money. Decoded.</div>
      </div>
      {[560, 1360].map((x, i) => <div key={x} style={{ position: 'absolute', left: x - 300, top: 700, width: 600, height: 200, border: `5px dashed rgba(243,238,226,.35)`, opacity: kk(f, 20, 30), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: 'rgba(243,238,226,.5)' }}>{i ? 'SUBSCRIBE' : 'WATCH NEXT · IRAN'}</div>)}
    </AbsoluteFill>
  </Cinema>); });

// TV showing the 1946 archival test film
function TvArchive({ trim = 60, label }: { trim?: number; label: string }) {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <OffthreadVideo src={staticFile('iran/crossroads_baker_1946.mp4')} muted trimBefore={trim} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.15)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, background: B.red, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 110, padding: '10px 60px', letterSpacing: 6 }}>{label}</div>
      <div style={{ position: 'absolute', left: 60, top: 60, fontFamily: F.mono, fontSize: 48, color: '#fff', background: 'rgba(0,0,0,.6)', padding: '4px 16px' }}>ARCHIVE 1946</div>
    </AbsoluteFill>
  );
}

// ================================ composition ================================
sh.sort((x, y) => x[0] - y[0]);
const END = EP_DUR;
export const EP07_BODY_FRAMES = fr(END - BASE);
const A = (p: string) => staticFile('ep07/audio/' + p);
const Sfx: React.FC<{ at: number; src: string; vol: number; dur?: number }> = ({ at, src, vol, dur = 2 }) => (
  <Sequence from={fr(at - BASE)} durationInFrames={fr(dur)} layout="none"><Audio src={src} volume={vol} /></Sequence>
);
export const EP07Body: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {sh.map(([t, fn], i) => {
      const nx = i < sh.length - 1 ? sh[i + 1][0] : END;
      const C: React.FC = () => <>{fn(t, nx)}</>;
      return <At key={i} from={t} to={i < sh.length - 1 ? nx + 0.2 : nx} base={BASE} name={`b${i + 1}`}><C /></At>;
    })}
    <Audio src={staticFile(VO_FILE)} trimBefore={fr(BASE)} volume={1} />
    <Audio src={staticFile(MUSIC)} volume={0.06} />
    <Audio src={A('dread_bed.wav')} volume={(f) => 0.16 * Math.min(1, f / 60) * (f > fr(paraT(18) - BASE) ? Math.max(0, 1 - (f - fr(paraT(18) - BASE)) / 90) : 1)} />
    {/* sirens + police under Sam's scenes, clock ticks on hour jumps, heartbeat on the hardest beats */}
    <Sfx at={paraT(3)} src={staticFile('iran/sfx/siren_manual_wail.mp3')} vol={0.08} dur={8.8} />
    <Sfx at={W(3, 'Get', 1)} src={A('sfx_police.wav')} vol={0.07} dur={8} />
    <Sfx at={W(3, 'Get', 1)} src={A('sfx_heli.wav')} vol={0.08} dur={10} />
    {[W(3, 'You'), W(3, 'You') + 0.85, W(3, 'You') + 1.7, W(7, 'fell'), W(7, 'fell') + 0.85, W(12, 'forty-two'), W(12, 'forty-two') + 0.85].map((t, i) => <Sfx key={'h' + i} at={t} src={A('sfx_heart.wav')} vol={0.32} dur={0.9} />)}
    {[paraT(3), W(4, 'Sam', 1), paraT(5), paraT(8), paraT(11), paraT(12), paraT(15)].map((t, i) => <Sfx key={'c' + i} at={t} src={A('sfx_clock.wav')} vol={0.18} dur={1} />)}
    {[W(3, 'Get'), W(3, 'Stay'), W(3, 'Stay', 1), W(4, 'invent'), W(6, 'stops'), W(6, 'over'), W(12, 'Checking'), W(16, 'Get'), W(17, 'guidance'), W(17, 'rules'), W(17, 'yardsticks')].map((t, i) => <Sfx key={'p' + i} at={t} src={staticFile('iran/audio/sfx_paper.wav')} vol={0.08} dur={1.5} />)}
  </AbsoluteFill>
);
