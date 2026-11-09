import React from 'react';
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { At, Sound, fr, type Cue } from '../ep05/kit';
import { B, Bug, Grain, cond, display } from '../brand/Brand';
import { NightCity } from '../ep03/Real';
import { LiveJake, type Beat } from '../host/LiveJake';
import type { BodyPose } from '../host/FullBody';
import { F } from '../theme';
import { MUSIC, VO_FILE, paraT, wordT } from './t';

// EP07 kit: the 24-hour CLOCK, the night PORT (Sam's world), Sam (Jake's body in a hi-vis delivery vest),
// split screen (Sam | Jake), the white flash (the only image of the event: no cloud, no damage), alert phone.
export { At, Enter, FlyInto, Push, fr } from '../ep05/kit';
export { Stamp, BigLine } from '../ep05/parts';
import { WhatIfTag } from '../ep05/props';
export { WhatIfTag };
export { Phone, Illus } from '../ep06/kit';
export { Apartment, TV_BOX } from '../ep05/Story';
export { B, Bug, Grain, cond, display, F, LiveJake };

const clampX = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const kk = (f: number, a: number, b: number) => (b <= a ? (f >= a ? 1 : 0) : interpolate(f, [a, b], [0, 1], clampX));
export const easeO = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeIO = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/** frame (local to a shot that starts at s seconds) of word w in paragraph p */
export const atW = (s: number) => (p: number, w: string, n = 0) => fr(wordT(p, w, n) - s);
export const spr = (f: number, at: number, fps: number, damping = 14, stiffness = 160) => spring({ frame: f - at, fps, config: { damping, stiffness } });

// ---------- Part frame (shots [from, to, el(start)] on the episode clock; every shot overlaps the next by 0.5 s)
export type Shot = [number, number, (start: number) => React.ReactNode, string?];
export const partFrames = (first: number, next: number) => fr(paraT(next) - paraT(first));
export const PartShell: React.FC<{ first: number; shots: Shot[]; cues?: Cue[] }> = ({ first, shots, cues = [] }) => {
  const base = paraT(first);
  return (
    <AbsoluteFill style={{ background: B.night }}>
      {shots.map(([a, b, el, name], i) => <At key={i} from={a} to={i < shots.length - 1 ? b + 0.5 : b} base={base} name={name ?? `shot ${i + 1}`}>{el(a)}</At>)}
      <Sound base={base} vo={VO_FILE} music={MUSIC} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Sam: same drawn body as Jake, orange hi-vis delivery vest, khaki trousers
export const SAM_OUTFIT = { coat: '#D9692A', coatLit: '#EE7E36', coatDeep: '#A94F1C', trouser: '#5A5140', trouser2: '#4E4636', shirt: '#2C3442', stripes: '#E4E8EA' };
export const Sam: React.FC<{ x: number; y: number; h?: number; beats?: Beat[]; pose?: BodyPose; walk?: boolean; flip?: boolean; seed?: string }> = ({ x, y, h = 620, beats = [], pose = 'stand', walk, flip, seed = 'sam' }) => (
  <LiveJake pose={pose} walk={walk} seed={seed} beats={beats} outfit={SAM_OUTFIT}
    style={{ position: 'absolute', left: x - h * 0.33, top: y - h, height: h, transform: flip ? 'scaleX(-1)' : undefined }} />
);
export const Jake: React.FC<{ x: number; y: number; h?: number; beats?: Beat[]; pose?: BodyPose; walk?: boolean; flip?: boolean; seed?: string; stub?: string }> = ({ x, y, h = 620, beats = [], pose = 'stand', walk, flip, seed = 'jake7', stub }) => (
  <LiveJake pose={pose} walk={walk} seed={seed} beats={beats} stub={stub}
    style={{ position: 'absolute', left: x - h * 0.33, top: y - h, height: h, transform: flip ? 'scaleX(-1)' : undefined }} />
);

/** small name tag that follows a character */
export const NameTag: React.FC<{ x: number; y: number; name: string; sub?: string; at?: number; dark?: boolean }> = ({ x, y, name, sub, at = 0, dark }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 13, 170);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(-2deg)`, background: dark ? 'rgba(14,21,23,.92)' : B.bone, border: `5px solid ${dark ? B.gold : B.ink}`, padding: '6px 22px 8px', boxShadow: '8px 8px 0 rgba(0,0,0,.25)', textAlign: 'center' }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: dark ? B.nightText : B.ink, lineHeight: 1 }}>{name}</div>
      {sub && <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: dark ? B.gold : B.red, marginTop: 4 }}>{sub}</div>}
    </div>
  );
};

// ---------- THE CLOCK: paper dial with 24 ticks, an hour hand, and a digital HOUR chip
export const Clock24: React.FC<{ x: number; y: number; r?: number; hour: number; at?: number; dark?: boolean; label?: string; ring?: number }> = ({ x, y, r = 200, hour, at = 0, dark = true, label, ring = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 13, 150);
  const ang = (hour / 24) * 360;
  const fg = dark ? B.nightText : B.ink;
  const prog = Math.min(1, Math.max(0, hour / 24));
  const pulse = ring >= 0 ? Math.sin(Math.min(1, Math.max(0, (f - ring) / 16)) * Math.PI) : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s * (1 + pulse * 0.08)})` }}>
      <svg width={r * 2 + 40} height={r * 2 + 40} viewBox={`${-r - 20} ${-r - 20} ${r * 2 + 40} ${r * 2 + 40}`} style={{ overflow: 'visible', display: 'block' }}>
        <circle r={r} fill={dark ? 'rgba(14,21,23,.92)' : B.bone} stroke={dark ? B.gold : B.ink} strokeWidth={r * 0.05} />
        <circle r={r * 0.86} fill="none" stroke={B.red} strokeWidth={r * 0.07} pathLength={1} strokeDasharray={`${prog} 1`} transform="rotate(-90)" opacity={0.9} />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2, big = i % 6 === 0;
          return <line key={i} x1={Math.cos(a) * r * (big ? 0.66 : 0.72)} y1={Math.sin(a) * r * (big ? 0.66 : 0.72)} x2={Math.cos(a) * r * 0.78} y2={Math.sin(a) * r * 0.78} stroke={fg} strokeWidth={big ? r * 0.035 : r * 0.016} strokeLinecap="round" opacity={i / 24 <= prog + 0.001 ? 1 : 0.45} />;
        })}
        {[0, 6, 12, 18].map((h) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
          return <text key={h} x={Math.cos(a) * r * 0.5} y={Math.sin(a) * r * 0.5 + r * 0.07} textAnchor="middle" fontFamily={F.mono} fontSize={r * 0.17} fill={fg} opacity={0.8}>{h === 0 ? 24 : h}</text>;
        })}
        <g transform={`rotate(${ang})`}>
          <line x1={0} y1={r * 0.12} x2={0} y2={-r * 0.74} stroke={B.red} strokeWidth={r * 0.045} strokeLinecap="round" />
          <circle cy={-r * 0.74} r={r * 0.04} fill={B.red} />
        </g>
        <circle r={r * 0.07} fill={dark ? B.gold : B.ink} />
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: r * 2 + 30, transform: 'translateX(-50%)', whiteSpace: 'nowrap', background: B.red, border: `4px solid ${B.ink}`, color: B.bone, fontFamily: F.mono, fontSize: r * 0.2, padding: `2px ${r * 0.08}px` }}>
        {label ?? `HOUR ${String(Math.floor(hour)).padStart(2, '0')}`}
      </div>
    </div>
  );
};

/** Top-right clock chip (running device) */
export const ClockChip: React.FC<{ hour: number; at?: number; label?: string }> = ({ hour, at = 0, label }) => (
  <div style={{ position: 'absolute', right: 150, top: 140 }}><Clock24 x={0} y={0} r={70} hour={hour} at={at} label={label} /></div>
);

// ---------- the night PORT (Sam's world): city + gantry cranes + container stacks + water + Sam's concrete building
const Crane: React.FC<{ x: number; y: number; s?: number; seed: string }> = ({ x, y, s = 1, seed }) => {
  const f = useCurrentFrame();
  const trolley = 60 + (Math.sin(f / 70 + random(seed) * 6) * 0.5 + 0.5) * 180;
  return (
    <svg style={{ position: 'absolute', left: x, top: y - 420 * s, overflow: 'visible' }} width={360 * s} height={420 * s} viewBox="0 0 360 420">
      <g fill="none" stroke="#0A1020" strokeWidth={10} strokeLinejoin="round">
        <path d="M60 420 L80 120 M160 420 L140 120 M70 300 L150 300 M75 200 L145 200" />
        <path d="M0 110 L360 110 L360 130 L0 130 Z" fill="#0A1020" />
        <path d="M110 110 L110 40 L40 110 M110 40 L300 110" />
      </g>
      <rect x={trolley} y={130} width={36} height={22} fill="#0A1020" />
      <line x1={trolley + 18} y1={152} x2={trolley + 18} y2={240} stroke="#0A1020" strokeWidth={3} />
      <circle cx={340} cy={104} r={6} fill={B.glow} opacity={0.4 + 0.6 * (Math.floor(f / 20) % 2)} />
    </svg>
  );
};
export const PortNight: React.FC<{ children?: React.ReactNode; push?: number; tower?: number; alarm?: number; dim?: number }> = ({ children, push = 0.05, tower = 0, alarm = -1, dim = 0 }) => {
  const f = useCurrentFrame();
  const drift = push * (1 - Math.exp(-f / 200));
  const red = alarm >= 0 && f >= alarm ? 0.12 + 0.08 * Math.sin((f - alarm) / 5) : 0;
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: B.night }}>
      <AbsoluteFill style={{ transform: `scale(${1 + drift})`, transformOrigin: '50% 60%' }}>
        <NightCity red={red} />
        {/* Sam's concrete building (lights up when it matters) */}
        <div style={{ position: 'absolute', left: 1240, top: 300, width: 360, height: 640, background: '#202B45', border: '5px solid #0A1020', boxShadow: tower ? `0 0 ${80 * tower}px rgba(232,182,76,${0.5 * tower})` : 'none' }}>
          {Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 26 + (i % 5) * 66, top: 30 + Math.floor(i / 5) * 74, width: 40, height: 44, background: random('pw' + i) > 0.45 ? '#F6CF6E' : '#141C30', opacity: 0.85 }} />)}
          <div style={{ position: 'absolute', left: 140, bottom: 0, width: 80, height: 110, background: '#F6CF6E', border: '4px solid #0A1020' }} />
        </div>
        <Crane x={-40} y={900} s={1.25} seed="c1" />
        <Crane x={360} y={905} s={1.0} seed="c2" />
        {/* containers */}
        {Array.from({ length: 14 }).map((_, i) => {
          const c = [B.red, B.blue, B.pine, B.amber][i % 4];
          return <div key={i} style={{ position: 'absolute', left: 120 + (i % 7) * 150, top: 860 - Math.floor(i / 7) * 70, width: 146, height: 66, background: c, filter: 'brightness(.45)', border: '4px solid #0A1020' }} />;
        })}
        {/* quay + water */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 930, height: 40, background: '#141A26', borderTop: '5px solid #0A1020' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 970, bottom: 0, background: 'linear-gradient(#0D1B26, #060C12)' }}>
          {Array.from({ length: 18 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: ((i * 173 + f * (0.6 + (i % 3) * 0.3)) % 2100) - 100, top: 14 + (i % 5) * 18, width: 80 + (i % 4) * 30, height: 3, background: 'rgba(246,207,110,.35)' }} />)}
        </div>
        {dim > 0 && <AbsoluteFill style={{ background: `rgba(0,0,0,${dim})` }} />}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- split screen: Sam (left, port) | Jake (right, apartment); a gold seam and the clock in the middle
export const Split: React.FC<{ left: React.ReactNode; right: React.ReactNode; k?: number; clock?: React.ReactNode }> = ({ left, right, k = 1, clock }) => {
  const off = (1 - k) * 960;
  return (
    <AbsoluteFill style={{ background: '#05070A' }}>
      <AbsoluteFill style={{ clipPath: `inset(0 ${960 + off}px 0 0)` }}><AbsoluteFill style={{ transform: 'translateX(-480px)' }}>{left}</AbsoluteFill></AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${960 + off}px)` }}><AbsoluteFill style={{ transform: 'translateX(380px)' }}>{right}</AbsoluteFill></AbsoluteFill>
      <div style={{ position: 'absolute', left: 960 - 4, top: 0, width: 8, height: 1080, background: B.gold, transform: `scaleY(${k})`, boxShadow: '0 0 30px rgba(232,182,76,.6)' }} />
      {clock}
    </AbsoluteFill>
  );
};

/** the white flash (0.6 s): no cloud, no damage — a white page, then silence */
export const Flash: React.FC<{ at: number; dur?: number }> = ({ at, dur = 18 }) => {
  const f = useCurrentFrame();
  const o = f < at ? 0 : interpolate(f - at, [0, 2, dur], [0, 1, 0], clampX);
  return <AbsoluteFill style={{ background: '#FFFDF6', opacity: o, pointerEvents: 'none' }} />;
};

/** a short ILLUSTRATIVE ribbon */
export const IllusTag: React.FC<{ x: number; y: number; at?: number }> = ({ x, y, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 16, 150);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, fontFamily: cond, fontWeight: 800, fontSize: 24, letterSpacing: 5, color: B.nightText, border: `3px solid ${B.nightText}`, padding: '2px 12px', background: 'rgba(0,0,0,.35)' }}>ILLUSTRATIVE</div>;
};

export const Src: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark = true }) => (
  <div style={{ position: 'absolute', left: 48, bottom: 34, fontFamily: F.mono, fontSize: 16, color: dark ? 'rgba(243,238,226,.6)' : 'rgba(92,84,68,.85)', background: dark ? 'rgba(0,0,0,.3)' : 'rgba(246,241,228,.75)', padding: '4px 10px' }}>{children}</div>
);

/** Every EP07 frame: bug, grain (user asked to drop the WHAT IF · HYPOTHETICAL corner tag, 9 Nov 2026) */
export const Chrome: React.FC<{ dark?: boolean; src?: string }> = ({ dark = true, src }) => (
  <>{src && <Src dark={dark}>{src}</Src>}<Bug dark={dark} /><Grain /></>
);

/** HTML map pin (works inside GulfMap, whose children are HTML, not SVG) */
export const MapPin: React.FC<{ x: number; y: number; label?: string; at?: number; color?: string }> = ({ x, y, label, at = 0, color = B.glow }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 170);
  const r = (Math.max(0, f - at) / 36) % 1;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${s})` }}>
      <div style={{ position: 'absolute', left: -(14 + r * 60), top: -(14 + r * 60), width: 28 + r * 120, height: 28 + r * 120, borderRadius: '50%', border: `4px solid ${color}`, opacity: 1 - r }} />
      <div style={{ position: 'absolute', left: -14, top: -14, width: 28, height: 28, borderRadius: 14, background: color, border: '4px solid #fff', boxShadow: `0 0 24px ${color}` }} />
      {label && <div style={{ position: 'absolute', left: 30, top: -64, whiteSpace: 'nowrap', background: 'rgba(14,21,23,.9)', border: `4px solid ${B.gold}`, padding: '4px 16px', fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 5, color: B.nightText }}>{label}</div>}
    </div>
  );
};
