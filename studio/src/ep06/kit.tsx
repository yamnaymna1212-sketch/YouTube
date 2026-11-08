import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { At, Sound, fr, type Cue } from '../ep05/kit';
import { B, Bug, Grain, PaperGround, cond, display } from '../brand/Brand';
import { Building, Pawn } from '../ep03/PaperWorld';
import { LiveJake, type Beat } from '../host/LiveJake';
import { F } from '../theme';
import { MUSIC, PER_SEC, VO_FILE, paraT, wordT } from './t';

// EP06 shared kit. Re-exports the EP05 timeline helpers (At/Enter/Push/FlyInto/fr) and adds THE METER,
// the rolling odometer, the Washington world and small paper props.
export { At, Enter, FlyInto, Push, fr } from '../ep05/kit';
export { Stamp, BigLine, Bill, FlipCalendar, Slot } from '../ep05/parts';

const clampX = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const kk = (f: number, a: number, b: number) => (b <= a ? (f >= a ? 1 : 0) : interpolate(f, [a, b], [0, 1], clampX));
export const easeO = (x: number) => 1 - Math.pow(1 - x, 3);
/** frame (local to a shot that starts at s seconds) of word w in paragraph p */
export const atW = (s: number) => (p: number, w: string, n = 0) => fr(wordT(p, w, n) - s);
export const spr = (f: number, at: number, fps: number, damping = 14, stiffness = 160) => spring({ frame: f - at, fps, config: { damping, stiffness } });
export const money = (v: number) => '$' + Math.floor(v).toLocaleString('en-US');

// ---------- Part frame (same contract as EP05: shots [from, to, el(start)] on the episode clock)
export type Shot = [number, number, (start: number) => React.ReactNode, string?];
export const partFrames = (first: number, next: number) => fr(paraT(next) - paraT(first));
export const PartShell: React.FC<{ first: number; shots: Shot[]; cues?: Cue[] }> = ({ first, shots, cues = [] }) => {
  const base = paraT(first);
  return (
    <AbsoluteFill style={{ background: B.paper }}>
      {shots.map(([a, b, el, name], i) => <At key={i} from={a} to={i < shots.length - 1 ? b + 0.5 : b} base={base} name={name ?? `shot ${i + 1}`}>{el(a)}</At>)}
      <Sound base={base} vo={VO_FILE} music={MUSIC} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- the rolling odometer (classic carry: a digit only turns while every digit to its right passes 9 → 0)
export const Odometer: React.FC<{ value: number; digits?: number; h?: number; dark?: boolean; prefix?: string; color?: string }> = ({ value, digits = 6, h = 200, dark = true, prefix = '$', color }) => {
  const v = Math.max(0, value);
  const cols = Array.from({ length: digits }, (_, i) => digits - 1 - i); // place index, left → right
  const w = h * 0.62;
  const fg = color ?? (dark ? B.gold : B.ink);
  const cell = dark ? '#0E1517' : B.bone;
  const lead = Math.max(1, String(Math.floor(v)).length);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: h * 0.05 }}>
      <div style={{ fontFamily: F.mono, fontSize: h * 0.78, color: fg, marginRight: h * 0.06, textShadow: dark ? `0 0 ${h * 0.2}px rgba(232,182,76,.45)` : 'none' }}>{prefix}</div>
      {cols.map((p, i) => {
        const unit = Math.pow(10, p);
        let y: number;
        if (p === 0) y = v % 10;
        else {
          const base = Math.floor(v / unit) % 10;
          const below = (v % unit) / unit * 10; // 0..10 within this digit
          y = base + Math.max(0, below - 9);
        }
        const hidden = p >= lead; // leading zeros dimmed
        const comma = p > 0 && p % 3 === 0 && i < cols.length - 1;
        return (
          <React.Fragment key={p}>
            <div style={{ width: w, height: h, overflow: 'hidden', background: cell, border: `${Math.max(3, h * 0.025)}px solid ${dark ? B.gold : B.ink}`, borderRadius: h * 0.06, position: 'relative', boxShadow: dark ? 'inset 0 0 20px rgba(0,0,0,.7)' : 'inset 0 0 0 6px rgba(0,0,0,.04)' }}>
              <div style={{ transform: `translateY(${-y * h}px)` }}>
                {Array.from({ length: 11 }, (_, d) => (
                  <div key={d} style={{ height: h, lineHeight: `${h}px`, textAlign: 'center', fontFamily: F.mono, fontSize: h * 0.74, color: fg, opacity: hidden ? 0.25 : 1, textShadow: dark ? `0 0 ${h * 0.15}px rgba(232,182,76,.5)` : 'none' }}>{d % 10}</div>
                ))}
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,.45), transparent 28%, transparent 72%, rgba(0,0,0,.45))', pointerEvents: 'none' }} />
            </div>
            {comma && <div style={{ fontFamily: F.mono, fontSize: h * 0.6, color: fg, margin: `0 ${-h * 0.04}px`, alignSelf: 'flex-end', opacity: hidden ? 0.25 : 1 }}>,</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** THE METER (top-right chip): U.S. interest paid since the video started, $33,350 a second. `t0` = shot start (s). */
export const MeterChip: React.FC<{ t0: number; at?: number; dark?: boolean; pulse?: number }> = ({ t0, at = 0, dark, pulse = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 15, 150);
  const p = pulse >= 0 ? Math.sin(Math.min(1, Math.max(0, (f - pulse) / 14)) * Math.PI) : 0;
  return (
    <div style={{ position: 'absolute', right: 44, top: 36, transform: `scale(${s * (1 + p * 0.12)})`, transformOrigin: '100% 0%', background: dark ? 'rgba(14,21,23,.9)' : B.bone, border: `4px solid ${dark ? B.gold : B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.25)', padding: '8px 14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: dark ? 'rgba(243,238,226,.7)' : B.muted }}>U.S. INTEREST · SINCE PLAY</div>
      <Odometer value={PER_SEC * (t0 + f / fps)} digits={8} h={44} dark />
    </div>
  );
};

// ---------- the Washington world (paper stage, skyline, floor, life, optional Jake)
const Monument: React.FC<{ x: number; y: number; h: number }> = ({ x, y, h }) => (
  <svg style={{ position: 'absolute', left: x - 30, top: y - h, overflow: 'visible' }} width={60} height={h}>
    <path d={`M18 ${h} L24 30 L30 0 L36 30 L42 ${h} Z`} fill={B.bone} stroke={B.ink} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);
export const World: React.FC<{ children?: React.ReactNode; jake?: false | { beats?: Beat[]; pose?: 'stand' | 'think' | 'point' | 'shrug'; x?: number }; floor?: number; push?: number; skyline?: number; meter?: number | false; t0?: number }> = ({ children, jake = {}, floor = 900, push = 1, skyline = 0.4, meter = false, t0 = 0 }) => {
  const f = useCurrentFrame();
  const drift = 0.07 * (1 - Math.exp(-f / 260));
  return (
    <PaperGround>
      <AbsoluteFill style={{ opacity: skyline, transform: `translateX(${-f * 0.15}px)` }}>
        <Building kind="wh" x={260} y={floor} scale={0.85} />
        <Monument x={720} y={floor} h={480} />
        <Building kind="cap" x={1180} y={floor} scale={0.95} />
        <Building kind="pent" x={1760} y={floor} scale={0.7} />
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: floor, bottom: 0, background: 'rgba(221,208,175,.55)', borderTop: `5px solid rgba(27,34,48,.55)` }} />
      {[0, 1, 2].map((i) => {
        const sp = 0.9 + i * 0.35, x = ((f * sp + i * 700) % 2300) - 200;
        const hop = Math.abs(Math.sin((f * sp) / 9 + i)) * 10;
        return <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, opacity: 0.5, transform: `translateY(${-hop}px)` }}><Pawn x={i === 1 ? 1920 - x : x} y={floor + 60 + i * 40} base={[B.blue, B.red, B.pine][i]} scale={0.32} seed={'bg6' + i} /></div>;
      })}
      <AbsoluteFill style={{ transformOrigin: '50% 45%', transform: `scale(${1 + drift * push})` }}>{children}</AbsoluteFill>
      {jake && (
        <LiveJake pose={jake.pose ?? 'stand'} seed={'w6' + (jake.beats?.[0]?.at ?? 0)} beats={jake.beats ?? [{ at: 6, r: 'think', hold: 400 }]}
          style={{ position: 'absolute', left: jake.x ?? 1560, top: floor - 500, height: 550, transform: 'scaleX(-1)' }} />
      )}
      {meter !== false && <MeterChip t0={t0} at={meter} />}
      <Bug /><Grain />
    </PaperGround>
  );
};

/** Night Pennsylvania Avenue (hook + close): dark sky, glowing Capitol far back, street lamps. */
export const NightAvenue: React.FC<{ children?: React.ReactNode; floor?: number; cap?: number }> = ({ children, floor = 860, cap = 0.55 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #23383C 0%, ${B.night} 65%)` }}>
      {Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: (i * 397) % 1920, top: (i * 131) % 420, width: 3, height: 3, borderRadius: 2, background: B.nightText, opacity: 0.25 + 0.25 * Math.sin(f / 20 + i) }} />)}
      <div style={{ position: 'absolute', left: 960, top: floor + 6, opacity: cap, filter: 'drop-shadow(0 0 30px rgba(232,182,76,.35))' }}><Building kind="cap" x={0} y={0} scale={1.5} /></div>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 960px ${floor - 200}px, rgba(232,182,76,.18), transparent 45%)` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: floor, bottom: 0, background: 'linear-gradient(#1A2A2D, #0C1416)', borderTop: `4px solid ${B.nightLine}` }} />
      {[180, 560, 1360, 1740].map((x) => (
        <React.Fragment key={x}>
          <div style={{ position: 'absolute', left: x, top: floor - 330, width: 10, height: 330, background: '#0A1012' }} />
          <div style={{ position: 'absolute', left: x - 22, top: floor - 360, width: 54, height: 34, borderRadius: 8, background: B.gold, boxShadow: '0 0 60px 20px rgba(232,182,76,.35)' }} />
        </React.Fragment>
      ))}
      {children}
    </AbsoluteFill>
  );
};

/** A stack of real SPECIMEN $100 notes (uscurrency.gov) seen from the side, growing to height h. */
export const BillTower: React.FC<{ x: number; y: number; h: number; w?: number; maxH?: number }> = ({ x, y, h, w = 300, maxH = 900 }) => {
  const n = Math.max(1, Math.round((h / maxH) * 60));
  const step = h / n;
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h, width: w, height: h }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: (i % 2) * 6 - 3, top: h - (i + 1) * step, width: w, height: Math.max(step, 6), overflow: 'hidden', border: `2px solid ${B.ink}`, background: '#C9D3B8' }}>
          <Img src={staticFile('sayed/money/usd100.jpg')} style={{ width: w, marginTop: -((i * 37) % 60) }} />
        </div>
      ))}
    </div>
  );
};

/** Paper phone (story) with any content on its screen. */
export const Phone: React.FC<{ x: number; y: number; scale?: number; children?: React.ReactNode; rot?: number }> = ({ x, y, scale = 1, children, rot = -4 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 420, height: 820, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${scale})`, background: '#0F1420', border: `8px solid ${B.ink}`, borderRadius: 56, boxShadow: '18px 18px 0 rgba(0,0,0,.28)' }}>
    <div style={{ position: 'absolute', left: 22, top: 22, right: 22, bottom: 22, borderRadius: 36, background: B.bone, overflow: 'hidden' }}>{children}</div>
    <div style={{ position: 'absolute', left: '50%', top: 34, width: 110, height: 24, marginLeft: -55, borderRadius: 14, background: '#0F1420' }} />
  </div>
);

/** "ILLUSTRATIVE" tag for Jake / Maya / Walter. */
export const Illus: React.FC<{ x?: number; y?: number; dark?: boolean }> = ({ x = 48, y = 40, dark }) => (
  <div style={{ position: 'absolute', left: x, top: y, fontFamily: cond, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: dark ? B.nightText : B.ink, border: `3px solid ${dark ? B.nightText : B.ink}`, padding: '2px 12px', opacity: 0.75 }}>ILLUSTRATIVE</div>
);

export { Pawn, Building, LiveJake, B, cond, display, F };
