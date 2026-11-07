import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check, X, type LucideIcon } from 'lucide-react';
import { B, cond, display } from '../brand/Brand';
import { At, Sound, fr, type Cue } from './kit';
import { paraT, HOOK_DUR } from './t';

// Shared pieces for EP04 parts 2–9. A part = a run of paragraphs of vo-clean.txt on the word clock (t.ts).

export const MUSIC = 'ep04/audio/music_ep04.mp3';
export const rel = (sec: number, shotStart: number) => fr(sec - shotStart);
export const ease = (x: number) => 1 - Math.pow(1 - x, 3);
export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const k01 = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);

/** Part frame: shots are [from, to, element(start)] on the episode clock; sound is trimmed to the part. */
export type Shot = [number, number, (start: number) => React.ReactNode, string?];
export const partFrames = (first: number, next: number) => fr(paraT(next) - paraT(first));
export const PartShell: React.FC<{ first: number; shots: Shot[]; cues?: Cue[] }> = ({ first, shots, cues = [] }) => {
  const base = paraT(first);
  return (
    <AbsoluteFill style={{ background: B.paper }}>
      {shots.map(([a, b, el, name], i) => <At key={i} from={a} to={b} base={base} name={name ?? `shot ${i + 1}`}>{el(a)}</At>)}
      <Sound base={base} music={MUSIC} musicBase={base - (paraT(5) - HOOK_DUR)} cues={cues} />
    </AbsoluteFill>
  );
};

/** A process slot: icon in a square card + label; a check or cross stamp lands on cue. */
export const Slot: React.FC<{ I: LucideIcon; label: string; x: number; y: number; at?: number; ok?: number; no?: number; size?: number }> = ({ I, label, x, y, at = 0, ok = -1, no = -1, size = 200 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 12, stiffness: 160 } });
  const o = ok >= 0 ? spring({ frame: f - ok, fps, config: { damping: 9, stiffness: 200 } }) : 0;
  const n = no >= 0 ? spring({ frame: f - no, fps, config: { damping: 9, stiffness: 200 } }) : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})` }}>
      <div style={{ width: size, height: size, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <I size={size * 0.5} color={B.ink} strokeWidth={2.2} />
        {o > 0 && <div style={{ position: 'absolute', right: -30, top: -30, width: 90, height: 90, borderRadius: 45, background: B.pine, border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${o})` }}><Check size={56} color={B.bone} strokeWidth={3.5} /></div>}
        {n > 0 && <div style={{ position: 'absolute', right: -30, top: -30, width: 90, height: 90, borderRadius: 45, background: B.red, border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${n})` }}><X size={56} color={B.bone} strokeWidth={3.5} /></div>}
      </div>
      <div style={{ textAlign: 'center', marginTop: 18, fontFamily: cond, fontWeight: 800, fontSize: 44, color: B.ink, letterSpacing: 1.5 }}>{label}</div>
    </div>
  );
};

/** Red rubber stamp that slams on cue. */
export const Stamp: React.FC<{ text: string; x: number; y: number; at: number; rot?: number; size?: number; color?: string }> = ({ text, x, y, at, rot = -8, size = 96, color = B.red }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  if (f < at) return null;
  const k = spring({ frame: f - at, fps, config: { damping: 12, stiffness: 220 } });
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${1.8 - 0.8 * k})`, opacity: Math.min(1, k * 1.4), border: `9px solid ${color}`, color, fontFamily: cond, fontWeight: 800, fontSize: size, padding: '0 28px', letterSpacing: 5, background: 'rgba(246,241,228,.85)', whiteSpace: 'nowrap' }}>{text}</div>;
};

/** Big serif line (≤ 5 words) that rises in. */
export const BigLine: React.FC<{ children: React.ReactNode; y?: number; at?: number; size?: number; color?: string }> = ({ children, y = 120, at = 0, size = 110, color = B.ink }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 18, stiffness: 120 } });
  return <div style={{ position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: size, color, opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>{children}</div>;
};

/** Real SPECIMEN note (uscurrency.gov) flying along a path. */
export const Bill: React.FC<{ x: number; y: number; w?: number; rot?: number; note?: '1' | '20' | '100'; opacity?: number }> = ({ x, y, w = 220, rot = 0, note = '20', opacity = 1 }) => (
  <Img src={staticFile(`sayed/money/usd${note}.jpg`)} style={{ position: 'absolute', left: x, top: y, width: w, transform: `translate(-50%,-50%) rotate(${rot}deg)`, border: `3px solid ${B.ink}`, boxShadow: '4px 4px 0 rgba(27,34,48,.25)', opacity }} />
);

/** Tear-off calendar that flips through dates on its own (pages fly off). */
export const FlipCalendar: React.FC<{ x: number; y: number; dates: [string, string][]; from: number; to: number; ringAt?: number; size?: number }> = ({ x, y, dates, from, to, ringAt = -1, size = 1 }) => {
  const f = useCurrentFrame();
  const t = k01(f, from, to);
  const i = Math.min(dates.length - 1, Math.floor(ease(t) * (dates.length - 1) + 0.0001));
  const step = (to - from) / Math.max(1, dates.length - 1);
  const pageStart = from + i * step;
  const flyK = k01(f, pageStart, pageStart + 7);
  const prev = i > 0 ? dates[i - 1] : null;
  const ring = ringAt >= 0 ? k01(f, ringAt, ringAt + 20) : 0;
  const Page: React.FC<{ d: [string, string]; style?: React.CSSProperties }> = ({ d, style }) => (
    <div style={{ position: 'absolute', inset: 0, background: B.bone, border: `6px solid ${B.ink}`, ...style }}>
      <div style={{ background: B.red, borderBottom: `6px solid ${B.ink}`, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 60 * size, color: B.bone, letterSpacing: 8, padding: '6px 0' }}>{d[0]}</div>
      <div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 250 * size, color: B.ink, lineHeight: 1.15 }}>{d[1]}</div>
    </div>
  );
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 400 * size, height: 440 * size, transform: 'translate(-50%,-50%) rotate(-2deg)', boxShadow: '12px 12px 0 rgba(27,34,48,.2)' }}>
      <Page d={dates[i]} />
      {prev && flyK < 1 && <Page d={prev} style={{ transformOrigin: '50% 0%', transform: `rotateX(${flyK * 100}deg) translateY(${-flyK * 120}px)`, opacity: 1 - flyK }} />}
      {ringAt >= 0 && (
        <svg width={560 * size} height={600 * size} style={{ position: 'absolute', left: -80 * size, top: -80 * size, overflow: 'visible' }}>
          <ellipse cx={280 * size} cy={300 * size} rx={260 * size} ry={280 * size} fill="none" stroke={B.red} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-80 ${280 * size} ${300 * size})`} />
        </svg>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------------------
// WORLD — every explainer shot lives in the same paper world as the hook: a Washington skyline on the horizon,
// a floor, a slow camera, and Jake standing in the scene reacting (unless the shot already has him).
import { Building, Pawn } from '../ep03/PaperWorld';
import { LiveJake, type Beat } from '../host/LiveJake';
import { Bug as Bug2, Grain as Grain2, PaperGround as PG, PaperUS as PUS } from '../brand/Brand';
const Monument: React.FC<{ x: number; y: number; h: number }> = ({ x, y, h }) => (
  <svg style={{ position: 'absolute', left: x - 30, top: y - h, overflow: 'visible' }} width={60} height={h}>
    <path d={`M18 ${h} L24 30 L30 0 L36 30 L42 ${h} Z`} fill={B.bone} stroke={B.ink} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);
export const World: React.FC<{ children?: React.ReactNode; kind?: 'stage' | 'map' | 'plain'; jake?: false | { beats?: Beat[]; pose?: 'stand' | 'think' | 'point' | 'shrug' }; floor?: number; push?: number }> = ({ children, kind = 'stage', jake = {}, floor = 900, push = 1 }) => {
  const f = useCurrentFrame();
  const drift = 0.07 * (1 - Math.exp(-f / 260)); // slow push that settles (never runs away on long shots)
  return (
    <PG>
      {kind === 'stage' && (
        <AbsoluteFill style={{ opacity: 0.42, transform: `translateX(${-f * 0.15}px)` }}>
          <Building kind="wh" x={260} y={floor} scale={0.85} />
          <Monument x={720} y={floor} h={480} />
          <Building kind="cap" x={1180} y={floor} scale={0.95} />
          <Building kind="pent" x={1760} y={floor} scale={0.7} />
        </AbsoluteFill>
      )}
      {kind === 'map' && <AbsoluteFill style={{ opacity: 0.2 }}><PUS x={260} y={100} w={1400} /></AbsoluteFill>}
      {kind !== 'map' && <div style={{ position: 'absolute', left: 0, right: 0, top: floor, bottom: 0, background: 'rgba(221,208,175,.55)', borderTop: `5px solid rgba(27,34,48,.55)` }} />}
      {/* background life: small pawns slide-hop along the floor all the time */}
      {kind !== 'map' && [0, 1, 2].map((i) => {
        const sp = 0.9 + i * 0.35, x = ((f * sp + i * 700) % 2300) - 200;
        const hop = Math.abs(Math.sin((f * sp) / 9 + i)) * 10;
        return <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, opacity: 0.5, transform: `translateY(${-hop}px)` }}><Pawn x={i === 1 ? 1920 - x : x} y={floor + 60 + i * 40} base={[B.blue, B.red, B.pine][i]} scale={0.32} seed={'bg' + i} /></div>;
      })}
      <AbsoluteFill style={{ transformOrigin: '50% 45%', transform: `scale(${1 + drift * push})` }}>{children}</AbsoluteFill>
      {jake && (
        <LiveJake pose={jake.pose ?? 'stand'} seed={'w' + (jake.beats?.[0]?.at ?? 0)} beats={jake.beats ?? [{ at: 6, r: 'think', hold: 400 }]}
          style={{ position: 'absolute', left: 1560, top: floor - 500, height: 550, transform: 'scaleX(-1)' }} />
      )}
      <Bug2 /><Grain2 />
    </PG>
  );
};
