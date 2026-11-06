import React from 'react';
import { AbsoluteFill, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { KeyRound, Car, Building2, Bird, Zap, Droplets, Plane, Fuel, type LucideIcon } from 'lucide-react';
import { Card, P, Pawn } from './PaperWorld';

// EP03 style frames — one look across story (cartoon), explainer (paper map) and proof (real material).
// Shared language: ink outline + hard shadow, paper grain over everything, WHAT IF badge, time chip, warm grade on real media.

const Grain: React.FC<{ k?: number }> = ({ k = 0.07 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 1 }}>
      {Array.from({ length: 70 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: random('g' + i + (f % 3)) * 1920, top: random('h' + i + (f % 3)) * 1080, width: 18 + random('w' + i) * 30, height: 2, background: '#fff', opacity: k * 2, transform: `rotate(${random('r' + i) * 180}deg)` }} />
      ))}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,0.42) 100%)' }} />
    </AbsoluteFill>
  );
};

const WhatIf: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ position: 'absolute', left: 48, top: 40, display: 'flex', gap: 12, alignItems: 'center', fontFamily: F.mono, fontSize: 22, letterSpacing: 2 }}>
    <span style={{ background: P.red, color: P.bone, padding: '6px 12px', border: `3px solid ${P.ink}`, fontWeight: 500 }}>WHAT IF</span>
    <span style={{ color: dark ? 'rgba(246,241,228,.75)' : P.ink }}>HYPOTHETICAL SCENARIO</span>
  </div>
);

const TimeChip: React.FC<{ t: string; label: string; dark?: boolean }> = ({ t, label, dark }) => (
  <div style={{ position: 'absolute', right: 48, top: 36, textAlign: 'right' }}>
    <div style={{ fontFamily: F.mono, fontSize: 54, color: dark ? P.bone : P.ink, letterSpacing: 2 }}>{t}</div>
    <div style={{ fontFamily: F.mono, fontSize: 20, color: dark ? 'rgba(246,241,228,.65)' : '#6b6250', letterSpacing: 3 }}>{label}</div>
  </div>
);

const Bug: React.FC<{ dark?: boolean; left?: boolean }> = ({ dark, left }) => (
  <div style={{ position: 'absolute', ...(left ? { left: 48 } : { right: 48 }), bottom: 36, fontFamily: F.sans, fontWeight: 700, fontSize: 22, color: dark ? 'rgba(246,241,228,.6)' : 'rgba(27,34,48,.55)', letterSpacing: 1 }}>DOLLARLY</div>
);

const Src: React.FC<{ children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }> = ({ children, dark, style }) => (
  <div style={{ position: 'absolute', fontFamily: F.mono, fontSize: 18, color: dark ? 'rgba(246,241,228,.75)' : '#5c5444', letterSpacing: 1, ...style }}>{children}</div>
);

// Real photo shown as a taped print, with slow handheld drift and warm grade.
const Print: React.FC<{ src: string; x: number; y: number; w: number; h: number; rot?: number; caption?: string; at?: number; pos?: string }> = ({ src, x, y, w, h, rot = 0, caption, at = 0, pos = '50% 50%' }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 15, stiffness: 120 } });
  const dx = noise2D('px' + src, f / 80, 0) * 4, dy = noise2D('py' + src, f / 80, 1) * 4;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, transform: `translate(${dx}px,${dy + (1 - s) * 40}px) rotate(${rot}deg)`, opacity: s, background: P.bone, padding: 14, paddingBottom: caption ? 50 : 14, border: `3px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.25)' }}>
      <div style={{ width: '100%', height: h, overflow: 'hidden', border: `2px solid ${P.ink}` }}>
        <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: 'sepia(.28) saturate(.8) contrast(1.06)', transformOrigin: '50% 0%', transform: `scale(${1.04 + f / 3000})` }} />
      </div>
      {caption && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12, fontFamily: F.mono, fontSize: 16, color: P.ink, lineHeight: 1.25 }}>{caption}</div>}
      <div style={{ position: 'absolute', left: -18, top: -14, width: 90, height: 30, background: 'rgba(217,164,65,.55)', transform: 'rotate(-28deg)' }} />
      <div style={{ position: 'absolute', right: -18, top: -14, width: 90, height: 30, background: 'rgba(217,164,65,.55)', transform: 'rotate(28deg)' }} />
    </div>
  );
};

const Skyline: React.FC<{ y: number; color: string; lit?: boolean; seed?: string; h?: number }> = ({ y, color, lit, seed = 'sk', h = 1 }) => (
  <>
    {Array.from({ length: 14 }).map((_, i) => {
      const w = 60 + random(seed + 'w' + i) * 70, hh = (120 + random(seed + 'h' + i) * 260) * h, x = i * 55 + random(seed + 'x' + i) * 20;
      return (
        <div key={i} style={{ position: 'absolute', left: x, top: y - hh, width: w, height: hh, background: color, borderTop: `3px solid ${P.ink}` }}>
          {lit && Array.from({ length: 8 }).map((__, j) => random(seed + i + 'l' + j) > 0.6 && (
            <div key={j} style={{ position: 'absolute', left: 8 + (j % 3) * 18, top: 14 + Math.floor(j / 3) * 26, width: 9, height: 12, background: '#E9C46A', opacity: 0.85 }} />
          ))}
        </div>
      );
    })}
  </>
);

// ---------- 1 · 4:00 AM — the siren
export const SF1Siren: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = (Math.sin(f / 7) + 1) / 2;
  return (
    <AbsoluteFill style={{ background: '#121B2C' }}>
      {/* wall + floor */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 180, background: '#0C1320', borderTop: `4px solid ${P.ink}` }} />
      {/* window */}
      <div style={{ position: 'absolute', left: 980, top: 130, width: 760, height: 620, border: `10px solid ${P.bone}`, outline: `5px solid ${P.ink}`, overflow: 'hidden', background: `linear-gradient(#1D2B4A, #3A3150)` }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 75%, rgba(180,69,47,${0.25 + pulse * 0.45}), transparent 60%)` }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 760 }}><Skyline y={620} color="#18223A" lit seed="w1" /></div>
        {[0, 1, 2].map((k) => {
          const r = ((f / 40 + k / 3) % 1);
          return <div key={k} style={{ position: 'absolute', left: 540 - r * 400, top: 470 - r * 400, width: r * 800, height: r * 800, borderRadius: '50%', border: `3px solid rgba(246,241,228,${0.5 * (1 - r)})` }} />;
        })}
        <div style={{ position: 'absolute', left: 372, top: 0, width: 10, height: 620, background: P.bone, borderLeft: `3px solid ${P.ink}`, borderRight: `3px solid ${P.ink}` }} />
      </div>
      {/* curtain */}
      <div style={{ position: 'absolute', left: 1700, top: 100, width: 120, height: 720, background: '#2E3E5E', border: `4px solid ${P.ink}`, borderRadius: '0 0 30px 30px', transform: `skewX(${noise2D('cur', f / 60, 0) * 2}deg)` }} />
      {/* nightstand + clock + phone */}
      <div style={{ position: 'absolute', left: 120, top: 760, width: 300, height: 150, background: '#2A2335', border: `4px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 150, top: 680, width: 170, height: 80, background: '#0A0E16', border: `4px solid ${P.ink}`, borderRadius: 10, fontFamily: F.mono, fontSize: 52, color: '#E5483B', textAlign: 'center', lineHeight: '74px', textShadow: '0 0 14px rgba(229,72,59,.8)' }}>4:00</div>
      <div style={{ position: 'absolute', left: 340, top: 728, width: 64, height: 30, background: P.bone, border: `3px solid ${P.ink}`, borderRadius: 6, boxShadow: `0 0 ${20 + pulse * 30}px rgba(246,241,228,.7)`, transform: `rotate(${Math.sin(f / 2) * 3}deg)` }} />
      {/* Jake at the window */}
      <div style={{ position: 'absolute', left: 60, top: 900, width: 620, height: 120, background: '#3B3350', border: `4px solid ${P.ink}`, borderRadius: 14 }} />
      <div style={{ position: 'absolute', left: 80, top: 860, width: 200, height: 60, background: P.bone, border: `4px solid ${P.ink}`, borderRadius: 30 }} />
      <LiveJake pose="stand" seed="sf1" face={{ look: 1 }} beats={[{ at: 40, r: 'surprise', hold: 40 }, { at: 80, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 640, top: 230, height: 860 }} />
      {/* red pulse over the room */}
      <AbsoluteFill style={{ background: `rgba(180,69,47,${pulse * 0.12})` }} />
      <Card x={420} y={190} at={20} size={40} rot={-1.5}>A siren. At 4 a.m.</Card>
      <WhatIf dark /><TimeChip t="04:00:00" label="DAY 0 · JAKE'S APARTMENT" dark /><Bug dark />
      <Grain />
    </AbsoluteFill>
  );
};

// ---------- 2 · 4:00:05 — noise in the sky, the alert
export const SF2Sky: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const alert = spring({ frame: f - 30, fps, config: { damping: 13, stiffness: 150 } });
  const shake = noise2D('sh', f / 3, 0) * 3;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#0E1424 0%, #2B2546 60%, #5A3140 100%)', transform: `translate(${shake}px, ${shake / 2}px)` }}>
      {/* searchlights + streaks */}
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: 'absolute', left: 300 + k * 600, bottom: 200, width: 60, height: 1100, transformOrigin: '50% 100%', transform: `rotate(${Math.sin(f / 40 + k * 2) * 25}deg)`, background: 'linear-gradient(transparent, rgba(246,241,228,.16))' }} />
      ))}
      {[0, 1].map((k) => {
        const t = ((f / 120 + k * 0.5) % 1);
        return <div key={k} style={{ position: 'absolute', left: -300 + t * 2400, top: 120 + k * 140 - t * 60, width: 340, height: 4, background: 'linear-gradient(90deg, transparent, rgba(246,241,228,.8))', transform: 'rotate(-6deg)' }} />;
      })}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920 }}><Skyline y={1080} color="#151C2E" lit seed="w2" h={1.6} /></div>
      {/* Jake's building + window */}
      <div style={{ position: 'absolute', left: 160, top: 360, width: 560, height: 720, background: '#2A3550', border: `5px solid ${P.ink}` }}>
        <div style={{ position: 'absolute', left: 120, top: 90, width: 320, height: 300, background: '#E9C46A', border: `6px solid ${P.ink}`, overflow: 'hidden' }}>
          <LiveJake pose="shrug" seed="sf2" beats={[{ at: 20, r: 'worry', hold: 200 }]} face={{ lookY: -0.8 }} style={{ position: 'absolute', left: 70, top: 20, height: 520 }} />
        </div>
      </div>
      {/* noise marks */}
      {['?', '!', '?'].map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: 760 + i * 95, top: 300 + Math.sin(f / 10 + i) * 14, fontFamily: F.serif, fontSize: 110, color: P.bone, opacity: 0.85 }}>{c}</div>
      ))}
      {/* phone alert (story element) */}
      <div style={{ position: 'absolute', left: 1080, top: 240, width: 640, transform: `scale(${alert}) rotate(2deg)`, background: P.bone, border: `5px solid ${P.ink}`, boxShadow: '12px 12px 0 rgba(0,0,0,.35)', padding: '24px 30px', borderRadius: 26 }}>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 26, color: P.red, letterSpacing: 2 }}>⚠ EMERGENCY ALERT</div>
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 40, color: P.ink, lineHeight: 1.15, marginTop: 10 }}>Seek shelter now.<br />Stay inside. Await instructions.</div>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: '#6b6250', marginTop: 14 }}>story element · not a real alert</div>
      </div>
      <Card x={1400} y={760} at={50} size={44} rot={-1}>Five seconds later: a roar overhead</Card>
      <WhatIf dark /><TimeChip t="04:00:05" label="DAY 0 · OUTSIDE" dark /><Bug dark />
      <Grain />
    </AbsoluteFill>
  );
};

// ---------- 3 · Bunker — watching the city on screens (real NASA night imagery on the monitors)
const Monitor: React.FC<{ x: number; y: number; w: number; h: number; src?: string; label: string; off?: number; flicker?: boolean }> = ({ x, y, w, h, src, label, off = 0, flicker }) => {
  const f = useCurrentFrame();
  const fl = flicker ? (random('fl' + Math.floor(f / 3)) > 0.75 ? 0.35 : 1) : 1;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: '#05070B', border: `8px solid #2B2F38`, outline: `4px solid ${P.ink}`, overflow: 'hidden' }}>
      {src ? <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fl, filter: 'saturate(.85) contrast(1.1)', transform: `scale(${1.1 + (f + off) / 2500}) translateX(${-(f + off) / 20}px)` }} />
        : <AbsoluteFill style={{ background: `repeating-linear-gradient(0deg, #1a1d24 0 3px, #2c3038 3px 6px)`, opacity: 0.4 + random('st' + f) * 0.3 }} />}
      <AbsoluteFill style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 2px, transparent 2px 4px)' }} />
      <div style={{ position: 'absolute', left: 10, bottom: 8, fontFamily: F.mono, fontSize: 16, color: '#cfd6e2', background: 'rgba(0,0,0,.55)', padding: '2px 8px' }}>{label}</div>
      <div style={{ position: 'absolute', right: 10, top: 8, width: 12, height: 12, borderRadius: 6, background: P.red, opacity: (f % 30) < 15 ? 1 : 0.2 }} />
    </div>
  );
};

export const SF3Bunker: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 30) * 4;
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      {/* concrete wall blocks */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: (i % 8) * 250 - ((Math.floor(i / 8) % 2) * 125), top: Math.floor(i / 8) * 130, width: 246, height: 126, background: '#24272E', border: '2px solid #15171B' }} />
      ))}
      {/* bulb */}
      <div style={{ position: 'absolute', left: 960, top: 0, width: 4, height: 150, background: P.ink, transformOrigin: '50% 0', transform: `rotate(${sway}deg)` }}>
        <div style={{ position: 'absolute', left: -16, top: 150, width: 36, height: 44, borderRadius: '50% 50% 45% 45%', background: '#F2D488', boxShadow: '0 0 120px 60px rgba(242,212,136,.22)' }} />
      </div>
      {/* monitor wall: real NASA night photos + archive + signal lost */}
      <Monitor x={300} y={180} w={620} h={360} src="sayed/real/nasa_iss074e0334264.jpg" label="CAM 01 · CITY (NASA ISS photo)" />
      <Monitor x={960} y={180} w={620} h={360} src="sayed/real/nasa_iss075e0227352.jpg" label="CAM 02 · REGION (NASA ISS photo)" off={200} />
      <Monitor x={300} y={570} w={620} h={300} label="CAM 03 · SIGNAL LOST" />
      <Monitor x={960} y={570} w={620} h={300} src="iran/hormuz_s04-37-716.jpg" label="FEED · STRAIT OF HORMUZ (NASA)" off={400} flicker />
      {/* desk */}
      <div style={{ position: 'absolute', left: 200, top: 890, width: 1520, height: 190, background: '#2D2A26', borderTop: `5px solid ${P.ink}` }} />
      {/* key on hook */}
      <div style={{ position: 'absolute', left: 1690, top: 300, transform: `rotate(${Math.sin(f / 12) * 12}deg)`, transformOrigin: '50% 0' }}><KeyRound size={64} color={P.amber} strokeWidth={2.2} /></div>
      {/* Jake (back-lit by the screens) */}
      <LiveJake pose="think" seed="sf3" face={{ look: -0.2, lookY: -0.5 }} beats={[{ at: 40, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 1500, top: 380, height: 760, filter: 'brightness(.85)' }} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(120,150,200,.10), transparent 60%)' }} />
      <Card x={620} y={110} at={20} size={40} rot={-1}>The city, through four screens</Card>
      <WhatIf dark /><TimeChip t="04:07" label="DAY 0 · THE BUNKER" dark /><Bug dark />
      <Grain />
    </AbsoluteFill>
  );
};

// ---------- 4 · Explainer — Ring Zoom over real NASA imagery
export const SF4Rings: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const rings = [{ r: 170, t: 'HOUR 1' }, { r: 330, t: 'WEEK 1' }, { r: 520, t: 'MONTH 1' }];
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      {/* map plate: real NASA photo inside a paper frame */}
      <div style={{ position: 'absolute', left: 70, top: 120, width: 1300, height: 860, border: `5px solid ${P.ink}`, overflow: 'hidden', boxShadow: '12px 12px 0 rgba(27,34,48,.22)' }}>
        <Img src={staticFile('iran/hormuz_s04-37-716.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.45) saturate(.7) contrast(1.05) brightness(1.05)', transform: `scale(${1.15 + f / 1500})` }} />
        <AbsoluteFill style={{ background: 'rgba(237,230,211,.22)' }} />
        {rings.map((g, i) => {
          const s = spring({ frame: f - 15 - i * 18, fps, config: { damping: 16, stiffness: 90 } });
          return (
            <React.Fragment key={i}>
              <div style={{ position: 'absolute', left: 650 - g.r * s, top: 470 - g.r * s, width: g.r * 2 * s, height: g.r * 2 * s, borderRadius: '50%', border: `5px dashed ${i === 2 ? P.red : P.ink}`, background: i === 0 ? 'rgba(180,69,47,.18)' : 'transparent' }} />
              <div style={{ position: 'absolute', left: 650 + g.r * 0.72 * s, top: 470 - g.r * 0.72 * s - 20, fontFamily: F.mono, fontSize: 22, background: P.bone, border: `3px solid ${P.ink}`, padding: '2px 10px', opacity: s, color: P.ink }}>{g.t}</div>
            </React.Fragment>
          );
        })}
        {/* tankers moving through the strait */}
        {[0, 1, 2, 3].map((k) => {
          const t = ((f / 150 + k / 4) % 1);
          return <div key={k} style={{ position: 'absolute', left: 1120 - t * 900, top: 600 - t * 300 + Math.sin(t * 6) * 20, width: 46, height: 16, background: P.amber, border: `3px solid ${P.ink}`, borderRadius: 8, transform: 'rotate(-18deg)' }} />;
        })}
        <Src dark style={{ left: 16, bottom: 12, background: 'rgba(0,0,0,.45)', padding: '2px 8px' }}>NASA · Space Shuttle photo S04-37-716 (1982), public domain</Src>
      </div>
      <Card x={420} y={260} at={30} size={40}>Iran</Card>
      <Card x={1110} y={860} at={36} size={36}>Oman</Card>
      <Card x={760} y={700} at={42} size={36} rot={-2}>Strait of Hormuz</Card>
      {/* right panel: ring counter + stat + Jake PiP */}
      <div style={{ position: 'absolute', left: 1420, top: 140, width: 440 }}>
        <div style={{ fontFamily: F.mono, fontSize: 22, color: '#6b6250', letterSpacing: 3 }}>RING</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ flex: 1, height: 18, background: i <= 2 ? P.red : P.sand, border: `3px solid ${P.ink}` }} />)}
        </div>
        <div style={{ fontFamily: F.serif, fontSize: 64, color: P.ink, marginTop: 18, lineHeight: 1 }}>Ring 2 · The region</div>
        <div style={{ marginTop: 28, background: P.bone, border: `4px solid ${P.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.22)', padding: '18px 22px' }}>
          <div style={{ fontFamily: F.serif, fontSize: 96, color: P.ink, lineHeight: 1 }}>≈ 1 in 5</div>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, color: P.ink, marginTop: 6 }}>barrels of the world's oil pass through here</div>
          <div style={{ fontFamily: F.mono, fontSize: 16, color: '#6b6250', marginTop: 10 }}>Source: U.S. EIA · verify figure before publish</div>
        </div>
        <div style={{ marginTop: 30, position: 'relative', height: 300, background: '#1A1C21', border: `4px solid ${P.ink}`, overflow: 'hidden' }}>
          <LiveJake pose="stand" seed="sf4" beats={[{ at: 60, r: 'doubt', hold: 300 }]} style={{ position: 'absolute', left: 110, top: 20, height: 600 }} />
          <div style={{ position: 'absolute', left: 10, top: 8, fontFamily: F.mono, fontSize: 16, color: '#cfd6e2' }}>JAKE · BUNKER · 04:19</div>
        </div>
      </div>
      {/* paper citizens on the map edge */}
      <Pawn x={1490} y={1040} base={P.blue} scale={0.5} seed="c1" hop={50} />
      <Pawn x={1570} y={1040} base={P.red} scale={0.5} seed="c2" glasses />
      <WhatIf /><Bug />
      <Grain k={0.05} />
    </AbsoluteFill>
  );
};

// ---------- 5 · Proof board — real archive film, the law, a real precedent, Jake's wallet
export const SF5Proof: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const meter = interpolate(spring({ frame: f - 60, fps, config: { damping: 20 } }), [0, 1], [4.15, 4.15]);
  return (
    <AbsoluteFill style={{ background: '#D9CBA6' }}>
      {/* cork-like board texture */}
      {Array.from({ length: 160 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: random('cx' + i) * 1920, top: random('cy' + i) * 1080, width: 6, height: 6, borderRadius: 3, background: '#B9A57A', opacity: 0.5 }} />)}
      <Print src="iran/crossroads_baker_column.jpg" pos="50% 0%" x={90} y={170} w={760} h={420} rot={-2.5} at={0} caption={'"Baker" test, Bikini Atoll, 25 July 1946 · from Operation Crossroads (1949), U.S. govt film · public domain'} />
      {/* the law, typed */}
      <div style={{ position: 'absolute', left: 900, top: 120, width: 620, transform: `rotate(1.5deg) translateY(${(1 - spring({ frame: f - 12, fps, config: { damping: 15 } })) * 40}px)`, background: '#FBF8EF', border: `3px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.25)', padding: '26px 30px' }}>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: '#6b6250', letterSpacing: 2 }}>50 U.S.C. § 1541(c) · WAR POWERS RESOLUTION, 1973</div>
        <div style={{ fontFamily: F.serif, fontSize: 30, color: P.ink, lineHeight: 1.3, marginTop: 12 }}>
          "…are exercised only pursuant to (1) a declaration of war, (2) specific statutory authorization, or (3) a national emergency created by attack upon the United States…"
        </div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 150, height: 40, background: 'rgba(217,164,65,.35)' }} />
      </div>
      {/* real precedent: Hawaii false alert */}
      <div style={{ position: 'absolute', left: 940, top: 560, width: 560, transform: `rotate(-1.5deg) translateY(${(1 - spring({ frame: f - 24, fps, config: { damping: 15 } })) * 40}px)`, background: P.ink, border: `3px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.25)', padding: '22px 26px' }}>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: P.amber, letterSpacing: 2 }}>REAL PRECEDENT · HAWAII · 13 JAN 2018</div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: P.bone, lineHeight: 1.2, marginTop: 10 }}>"BALLISTIC MISSILE THREAT INBOUND TO HAWAII. SEEK IMMEDIATE SHELTER. THIS IS NOT A DRILL."</div>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: 'rgba(246,241,228,.7)', marginTop: 12 }}>A false alarm. It took 38 minutes to correct. · FCC report</div>
      </div>
      {/* red string */}
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        <path d="M 820 300 C 870 260 880 240 910 230" stroke={P.red} strokeWidth="4" fill="none" />
        <path d="M 780 640 C 860 700 900 690 945 660" stroke={P.red} strokeWidth="4" fill="none" />
        {[[820, 300], [910, 230], [780, 640], [945, 660]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="10" fill={P.red} stroke={P.ink} strokeWidth="3" />)}
      </svg>
      {/* Jake reacting + wallet meter */}
      <LiveJake pose="think" seed="sf5" face={{ look: -0.9 }} beats={[{ at: 50, r: 'doubt', hold: 300 }]} style={{ position: 'absolute', left: 1500, top: 330, height: 780 }} />
      <div style={{ position: 'absolute', left: 120, bottom: 70, background: P.bone, border: `4px solid ${P.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.25)', padding: '14px 24px', fontFamily: F.mono, fontSize: 28, color: P.ink }}>
          JAKE'S WALLET · GAS <b>${meter.toFixed(2)}</b> → <span style={{ color: P.red }}>?</span>
      </div>
      <Card x={1240} y={1000} at={40} size={34} rot={1}>Proof, not panic</Card>
      <WhatIf /><Bug left />
      <Grain k={0.05} />
    </AbsoluteFill>
  );
};

// =====================================================================
// v2 — TV rules: one idea per screen, giant type, map-first, icons in badges, motion that carries into the next shot.

const Headline: React.FC<{ kicker?: string; children: React.ReactNode; dark?: boolean; at?: number; x?: number; y?: number; size?: number }> = ({ kicker, children, dark, at = 0, x = 70, y = 130, size = 92 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 18, stiffness: 120 } });
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translateY(${(1 - s) * 30}px)`, opacity: s }}>
      {kicker && <div style={{ fontFamily: F.mono, fontSize: 28, letterSpacing: 4, color: dark ? P.amber : P.red }}>{kicker}</div>}
      <div style={{ fontFamily: F.serif, fontSize: size, lineHeight: 1, color: dark ? P.bone : P.ink, marginTop: 6, textShadow: dark ? '0 4px 24px rgba(0,0,0,.6)' : 'none' }}>{children}</div>
    </div>
  );
};

// Icon badge for the paper world: bone disc, ink ring, spring pop; `hit` turns it red with a slash.
const Badge: React.FC<{ I: LucideIcon; x: number; y: number; at?: number; hit?: number; label?: string; size?: number }> = ({ I, x, y, at = 0, hit = -1, label, size = 92 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 11, stiffness: 160 } });
  const h = hit >= 0 ? spring({ frame: f - hit, fps, config: { damping: 14, stiffness: 140 } }) : 0;
  const float = Math.sin(f / 20 + x) * 4;
  return (
    <div style={{ position: 'absolute', left: x, top: y + float, transform: `translate(-50%,-50%) scale(${s})` }}>
      <div style={{ width: size, height: size, borderRadius: '50%', background: h > 0.5 ? P.red : P.bone, border: `5px solid ${P.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <I size={size * 0.52} color={h > 0.5 ? P.bone : P.ink} strokeWidth={2.4} />
        {h > 0 && <div style={{ position: 'absolute', width: size * 0.9 * h, height: 6, background: h > 0.5 ? P.bone : P.red, transform: 'rotate(-45deg)', borderRadius: 3 }} />}
      </div>
      {label && <div style={{ position: 'absolute', top: size + 10, left: '50%', transform: 'translateX(-50%)', fontFamily: cond2, fontWeight: 700, fontSize: 30, color: P.ink, background: P.bone, border: `3px solid ${P.ink}`, padding: '0 10px', whiteSpace: 'nowrap', letterSpacing: 1 }}>{label}</div>}
    </div>
  );
};
const cond2 = 'Barlow Condensed, Inter, sans-serif';

// ---------- 4v2 · Map, TV-legible: one fact, giant number, map fills the frame
export const SF4MapTV: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const zoom = 1.12 + f / 1600;
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <Img src={staticFile('iran/hormuz_s04-37-716.jpg')} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.5) saturate(.65) contrast(1.08) brightness(.9)', transform: `scale(${zoom})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.82) 0%, rgba(12,13,16,.35) 45%, transparent 70%)' }} />
      {/* the shipping lane: one thick animated route through the strait */}
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        <path id="lane" d="M 1880 980 C 1600 820 1450 640 1300 560 C 1150 480 1000 470 860 380" fill="none" stroke={P.amber} strokeWidth="14" strokeDasharray="34 22" strokeDashoffset={-f * 3} strokeLinecap="round" opacity="0.95" />
      </svg>
      {[0, 1, 2].map((k) => {
        const t = ((f / 120 + k / 3) % 1);
        const x = interpolate(t, [0, 1], [1850, 880]), y = interpolate(t, [0, 0.5, 1], [960, 560, 390]);
        return <div key={k} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', opacity: interpolate(t, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}><Badge I={Fuel} x={0} y={0} size={70} /></div>;
      })}
      <Card x={1330} y={470} at={10} size={52} rot={-2}>Strait of Hormuz</Card>
      <Headline kicker="RING 2 · THE REGION" dark at={4} y={330} size={210}>1 in 5</Headline>
      <div style={{ position: 'absolute', left: 74, top: 590, fontFamily: F.sans, fontWeight: 700, fontSize: 64, color: P.bone, lineHeight: 1.1, opacity: spring({ frame: f - 14, fps, config: { damping: 18 } }) }}>of the world's oil<br />sails through here.</div>
      <Src dark style={{ left: 74, bottom: 46 }}>U.S. EIA ⚠ verify · Map: NASA STS-4 photo S04-37-716 (1982), public domain</Src>
      <WhatIf dark /><Bug dark />
      <Grain k={0.05} />
    </AbsoluteFill>
  );
};

// ---------- 6 · Ring 0 — the first ten seconds, on the map (illustrative city, no gore)
export const SF6Ring0: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const rings = [
    { r: 110, c: '#F6F1E4', label: 'FIREBALL', fill: 'rgba(246,241,228,.85)' },
    { r: 250, c: P.red, label: 'BLAST', fill: 'rgba(180,69,47,.28)' },
    { r: 400, c: P.amber, label: 'HEAT', fill: 'rgba(217,164,65,.16)' },
  ];
  const cx = 760, cy = 650;
  return (
    <AbsoluteFill style={{ background: '#E4DAC0' }}>
      {/* drawn city map: blocks, river, roads */}
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        <rect width="1920" height="1080" fill="#E4DAC0" />
        {Array.from({ length: 26 }).map((_, i) => Array.from({ length: 15 }).map((__, j) => (
          <rect key={i + '-' + j} x={20 + i * 74} y={20 + j * 72} width={60} height={58} rx={6} fill={random('b' + i + j) > 0.2 ? '#D3C7A7' : '#B9C9A3'} stroke="#B8AA86" strokeWidth="2" />
        )))}
        <path d="M -20 820 C 300 760 520 900 860 860 C 1200 820 1400 980 1940 900" fill="none" stroke="#8FA9B8" strokeWidth="60" opacity="0.9" />
        <path d="M 0 300 L 1920 420 M 1180 0 L 1060 1080" stroke={P.bone} strokeWidth="22" />
      </svg>
      {/* fallout plume, downwind */}
      <div style={{ position: 'absolute', left: cx, top: cy - 120, width: 1100 * spring({ frame: f - 40, fps, config: { damping: 30, stiffness: 40 } }), height: 240, background: 'linear-gradient(90deg, rgba(90,80,70,.45), rgba(90,80,70,0))', borderRadius: '0 50% 50% 0', transformOrigin: '0 50%', transform: 'rotate(-12deg)' }} />
      <div style={{ position: 'absolute', left: 1500, top: 300, fontFamily: cond2, fontWeight: 700, fontSize: 34, color: '#4b4338', letterSpacing: 2, transform: 'rotate(-12deg)' }}>FALLOUT · DOWNWIND →</div>
      {rings.slice().reverse().map((g, i) => {
        const s = spring({ frame: f - 6 - (2 - i) * 6, fps, config: { damping: 18, stiffness: 70 } });
        return (
          <React.Fragment key={g.label}>
            <div style={{ position: 'absolute', left: cx - g.r * s, top: cy - g.r * s, width: g.r * 2 * s, height: g.r * 2 * s, borderRadius: '50%', background: g.fill, border: `6px solid ${g.c === '#F6F1E4' ? P.ink : g.c}` }} />
            <div style={{ position: 'absolute', left: cx + Math.cos([-0.5, 2.6, -0.75][2 - i]) * g.r * s - 60, top: cy + Math.sin([-0.5, 2.6, -0.75][2 - i]) * g.r * s - 26, fontFamily: cond2, fontWeight: 700, fontSize: 34, background: P.bone, border: `4px solid ${P.ink}`, padding: '0 12px', color: P.ink, opacity: s, letterSpacing: 2 }}>{g.label}</div>
          </React.Fragment>
        );
      })}
      {/* what happens, as icon states (no casualty imagery) */}
      <Badge I={Building2} x={cx - 190} y={cy + 40} at={20} hit={40} />
      <Badge I={Zap} x={cx + 330} y={cy + 120} at={26} hit={50} label="POWER OUT" />
      <Badge I={Car} x={cx - 330} y={cy + 200} at={32} hit={60} label="ROADS STOP" />
      <Badge I={Bird} x={cx - 120} y={cy - 300} at={38} label="BIRDS FLEE" />
      <Badge I={Droplets} x={cx - 520} y={cy - 160} at={44} hit={70} label="WATER UNSAFE" />
      {/* one headline only */}
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 250, background: P.ink, borderBottom: `5px solid ${P.ink}`, boxShadow: '0 8px 0 rgba(27,34,48,.2)' }} />
      <Headline kicker="RING 0 · THE FIRST 10 SECONDS" dark x={70} y={110} size={84}>Three rings. Ten seconds.</Headline>
      {/* Jake PiP — always reacting */}
      <div style={{ position: 'absolute', right: 60, bottom: 60, width: 420, height: 300, background: '#1A1C21', border: `5px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.3)', overflow: 'hidden' }}>
        <LiveJake pose="stand" seed="sf6" beats={[{ at: 10, r: 'surprise', hold: 30 }, { at: 45, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 100, top: 10, height: 620 }} />
        <div style={{ position: 'absolute', left: 10, top: 8, fontFamily: F.mono, fontSize: 18, color: '#cfd6e2' }}>JAKE · BUNKER · 04:12</div>
      </div>
      <Src style={{ left: 420, bottom: 30, background: 'rgba(246,241,228,.9)', padding: '2px 8px' }}>Illustration · ring sizes depend on weapon yield ⚠ (Glasstone & Dolan; NUKEMAP)</Src>
      <WhatIf dark /><Bug left />
      <Grain k={0.04} />
    </AbsoluteFill>
  );
};

// ---------- Transition demo: the bunker screen IS the map (zoom-through match cut)
export const SFTransition: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => x * x * (3 - 2 * x) });
  // monitor 4 in SF3 is at x 960..1580, y 570..870 → centre (1270, 720), width 620
  const k = interpolate(t, [0, 1], [1, 1920 / 620]);
  const ox = interpolate(t, [0, 1], [0, 960 - 1270 * (1920 / 620)]);
  const oy = interpolate(t, [0, 1], [0, 540 - 720 * (1920 / 620)]);
  const mapIn = interpolate(f, [34, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <AbsoluteFill style={{ transformOrigin: '0 0', transform: `translate(${ox}px, ${oy}px) scale(${k})` }}><SF3Bunker /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: mapIn }}><SF4MapTV /></AbsoluteFill>
    </AbsoluteFill>
  );
};
