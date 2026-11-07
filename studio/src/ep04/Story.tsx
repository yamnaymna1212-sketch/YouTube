import React from 'react';
import { AbsoluteFill, Audio, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { NightCity } from '../ep03/Real';
import { B, cond, display } from '../brand/Brand';
import { F } from '../theme';

// EP04 story set + explainer pieces (all drawn in code, Dollarly palette).

// ---------- Jake's apartment at night (story world). The TV screen renders any 1920×1080 scene, scaled.
export const TV_BOX = { x: 900, y: 210, w: 820, h: 461 };
export const Apartment: React.FC<{ tv?: React.ReactNode; tvOn?: number; children?: React.ReactNode; lamp?: number; dawn?: boolean }> = ({ tv, tvOn = 1, children, lamp = 1, dawn }) => {
  const f = useCurrentFrame();
  const flick = 0.92 + Math.sin(f / 3.3) * 0.03 + Math.sin(f / 7.1) * 0.03;
  const sc = TV_BOX.w / 1920;
  return (
    <AbsoluteFill style={{ background: dawn ? '#3A4560' : '#1A2236', overflow: 'hidden' }}>
      {/* wallpaper stripes */}
      {Array.from({ length: 24 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 84, top: 0, width: 4, height: 1080, background: 'rgba(246,241,228,.035)' }} />)}
      {/* window with the city */}
      <div style={{ position: 'absolute', left: 90, top: 120, width: 560, height: 520, border: `10px solid ${B.bone}`, outline: `5px solid ${B.ink}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -700, top: -360, width: 1920, height: 1080, transform: 'scale(.75)' }}><NightCity dawn={dawn ? 1 : 0} /></div>
        <div style={{ position: 'absolute', left: 270, top: 0, width: 10, height: 520, background: B.bone, borderLeft: `3px solid ${B.ink}`, borderRight: `3px solid ${B.ink}` }} />
      </div>
      {/* wall calendar */}
      <div style={{ position: 'absolute', left: 700, top: 150, width: 150, background: B.bone, border: `4px solid ${B.ink}`, transform: 'rotate(-3deg)', boxShadow: '5px 5px 0 rgba(0,0,0,.3)' }}>
        <div style={{ background: B.red, borderBottom: `4px solid ${B.ink}`, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 26, color: B.bone, letterSpacing: 4 }}>DEC</div>
        <div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 80, color: B.ink, lineHeight: 1.1 }}>11</div>
        <svg width={190} height={170} style={{ position: 'absolute', left: -20, top: -10, overflow: 'visible' }}><ellipse cx={95} cy={95} rx={80} ry={72} fill="none" stroke={B.red} strokeWidth={6} strokeLinecap="round" /></svg>
      </div>
      {/* TV + stand */}
      <div style={{ position: 'absolute', left: TV_BOX.x - 22, top: TV_BOX.y - 22, width: TV_BOX.w + 44, height: TV_BOX.h + 44, background: '#0B0F18', border: `5px solid ${B.ink}`, borderRadius: 14, boxShadow: `0 0 ${120 * tvOn}px rgba(140,180,220,${0.22 * tvOn * flick})` }} />
      <div style={{ position: 'absolute', left: TV_BOX.x, top: TV_BOX.y, width: TV_BOX.w, height: TV_BOX.h, overflow: 'hidden', background: '#05070A' }}>
        <div style={{ width: 1920, height: 1080, transform: `scale(${sc})`, transformOrigin: '0 0', opacity: tvOn }}>{tv}</div>
        <AbsoluteFill style={{ background: 'linear-gradient(120deg, rgba(255,255,255,.06), transparent 40%)' }} />
      </div>
      <div style={{ position: 'absolute', left: TV_BOX.x + TV_BOX.w / 2 - 40, top: TV_BOX.y + TV_BOX.h + 22, width: 80, height: 40, background: B.ink }} />
      <div style={{ position: 'absolute', left: TV_BOX.x - 60, top: TV_BOX.y + TV_BOX.h + 60, width: TV_BOX.w + 120, height: 60, background: '#3B3350', border: `4px solid ${B.ink}` }} />
      {/* floor + couch */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 290, background: '#121827', borderTop: `5px solid ${B.ink}` }} />
      <div style={{ position: 'absolute', left: 60, top: 760, width: 700, height: 170, background: '#2E3E5E', border: `5px solid ${B.ink}`, borderRadius: 24 }} />
      <div style={{ position: 'absolute', left: 30, top: 700, width: 110, height: 230, background: '#2E3E5E', border: `5px solid ${B.ink}`, borderRadius: 24 }} />
      {/* lamp glow */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at 1800px 640px, rgba(233,196,106,${0.22 * lamp}), transparent 30%)` }} />
      <div style={{ position: 'absolute', left: 1770, top: 560, width: 70, height: 60, background: '#E9C46A', border: `4px solid ${B.ink}`, borderRadius: '40px 40px 6px 6px', opacity: 0.4 + 0.6 * lamp }} />
      <div style={{ position: 'absolute', left: 1800, top: 620, width: 10, height: 190, background: B.ink }} />
      {/* TV light on the room */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${TV_BOX.x + TV_BOX.w / 2}px ${TV_BOX.y + TV_BOX.h}px, rgba(150,190,230,${0.10 * tvOn * flick}), transparent 55%)` }} />
      {children}
    </AbsoluteFill>
  );
};

/** Phone message bubble (story element). */
export const PhoneText: React.FC<{ from: string; text: string; x: number; y: number; at?: number }> = ({ from, text, x, y, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 13, stiffness: 150 } });
  const buzz = f - at < 12 && f >= at ? Math.sin(f * 2.2) * 4 : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 560, transform: `translate(${buzz}px,0) scale(${s})`, transformOrigin: '0% 100%', background: B.bone, border: `5px solid ${B.ink}`, borderRadius: 30, boxShadow: '10px 10px 0 rgba(0,0,0,.35)', padding: '20px 28px' }}>
      <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: B.red }}>{from}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 36, color: B.ink, lineHeight: 1.2, marginTop: 6 }}>{text}</div>
    </div>
  );
};

// ---------- Hemicycle seat chart (explainer). Dots fill left→right by angle; `blue` = number of blue seats now.
export const Hemicycle: React.FC<{ x: number; y: number; r: number; seats: number; rows: number; blue: number; label: string; dot?: number; at?: number; flipFrom?: number; flipAt?: number; flipDur?: number }> = ({ x, y, r, seats, rows, blue, label, dot = 7, at = 0, flipFrom, flipAt = 0, flipDur = 24 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 16, stiffness: 130 } });
  const pts: { a: number; px: number; py: number }[] = [];
  const r0 = r * 0.42;
  const radii = Array.from({ length: rows }, (_, i) => r0 + ((r - r0) * i) / Math.max(1, rows - 1));
  const sum = radii.reduce((a, b) => a + b, 0);
  let left = seats;
  radii.forEach((rr, i) => {
    const n = i === rows - 1 ? left : Math.round((seats * rr) / sum);
    left -= n;
    for (let k = 0; k < n; k++) {
      const a = Math.PI - (Math.PI * (k + 0.5)) / n;
      pts.push({ a, px: Math.cos(a) * rr, py: -Math.sin(a) * rr });
    }
  });
  pts.sort((p, q) => q.a - p.a);
  const k = flipFrom === undefined ? blue : Math.round(interpolate(f, [flipAt, flipAt + flipDur], [flipFrom, blue], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const shown = Math.round(interpolate(f - at, [0, 20], [0, pts.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${0.85 + 0.15 * s})`, opacity: s }}>
      <svg width={r * 2 + dot * 4} height={r + dot * 3} viewBox={`${-r - dot * 2} ${-r - dot * 2} ${r * 2 + dot * 4} ${r + dot * 3}`} style={{ overflow: 'visible' }}>
        {pts.map((p, i) => i < shown && <circle key={i} cx={p.px} cy={p.py} r={dot} fill={i < k ? B.blue : B.red} />)}
        <line x1={0} y1={-r - dot * 2} x2={0} y2={dot} stroke={B.ink} strokeWidth={2} strokeDasharray="6 6" />
      </svg>
      <div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 52, color: B.ink, letterSpacing: 1.5, marginTop: 8 }}>{label}</div>
    </div>
  );
};

/** Soft grey route arc across the map (pawns travel along it). Coordinates in screen px. */
export const Route: React.FC<{ d: string; at?: number; w?: number }> = ({ d, at = 0, w = 34 }) => {
  const f = useCurrentFrame();
  const k = interpolate(f - at, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      <path d={d} fill="none" stroke="rgba(27,34,48,.16)" strokeWidth={w} strokeLinecap="round" pathLength={1} strokeDasharray={`${k} 1`} />
    </svg>
  );
};

/** Position along a quadratic arc (for pawns travelling the route). */
export const onArc = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, t: number): [number, number] => {
  const u = 1 - t;
  return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1];
};

/** Rising dust when something lands (tiny life detail). */
export const Dust: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const f = useCurrentFrame();
  const t = (f - at) / 18;
  if (t < 0 || t > 1) return null;
  return <>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: 'absolute', left: x + (i - 2) * 22 * (0.4 + t), top: y - t * 26 - random('d' + i) * 8, width: 12, height: 12, borderRadius: 6, background: 'rgba(27,34,48,.18)', opacity: 1 - t }} />)}</>;
};
