import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { LucideIcon } from 'lucide-react';
import { B, cond, display, F, kk, easeO, spr } from './kit';

// EP06 paper props for the explainer parts (all code-drawn, Dollarly palette). Every prop pops/draws on a frame `at`.

/** Spring pop wrapper, centred on (x, y). */
export const Pop: React.FC<{ x: number; y: number; at: number; children: React.ReactNode; rot?: number; from?: number; d?: number; s?: number }> = ({ x, y, at, children, rot = 0, from = 0, d = 12, s = 170 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  if (f < at - 1) return null;
  const k = spr(f, at, fps, d, s);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${from + (1 - from) * k})`, opacity: Math.min(1, k * 2) }}>{children}</div>;
};

/** Paper tag with big text. */
export const Tag: React.FC<{ x: number; y: number; at: number; text: React.ReactNode; tone?: 'bone' | 'amber' | 'red' | 'pine' | 'ink' | 'blue'; size?: number; rot?: number }> = ({ x, y, at, text, tone = 'bone', size = 80, rot = -3 }) => {
  const bg = { bone: B.bone, amber: B.amber, red: B.red, pine: B.pine, ink: B.ink, blue: B.blue }[tone];
  const fg = tone === 'bone' || tone === 'amber' ? B.ink : B.bone;
  return (
    <Pop x={x} y={y} at={at} rot={rot}>
      <div style={{ background: bg, color: fg, border: `${Math.max(4, size / 14)}px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)', fontFamily: display, fontWeight: 800, fontSize: size, padding: `0 ${size * 0.3}px`, whiteSpace: 'nowrap', lineHeight: 1.2 }}>{text}</div>
    </Pop>
  );
};

/** Small condensed caption (≤ 4 words). */
export const Cap: React.FC<{ x: number; y: number; at: number; text: string; size?: number; color?: string }> = ({ x, y, at, text, size = 44, color = B.ink }) => {
  const f = useCurrentFrame();
  return <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', fontFamily: cond, fontWeight: 800, fontSize: size, letterSpacing: size * 0.12, color, opacity: kk(f, at, at + 8), whiteSpace: 'nowrap' }}>{text}</div>;
};

/** Icon disc (like Badge, but centred and tone-able). */
export const Disc: React.FC<{ I: LucideIcon; x: number; y: number; at: number; size?: number; tone?: string; label?: string; cross?: number }> = ({ I, x, y, at, size = 150, tone = B.bone, label, cross = -1 }) => {
  const f = useCurrentFrame();
  const c = cross >= 0 ? kk(f, cross, cross + 8) : 0;
  return (
    <Pop x={x} y={y} at={at}>
      <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: tone, border: `${size / 22}px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${Math.sin(f / 16 + x) * 4}px)` }}>
        <I size={size * 0.52} color={B.ink} strokeWidth={2.2} />
        {c > 0 && <svg width={size} height={size} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}><path d={`M${size * 0.15} ${size * 0.15} L${size * 0.85} ${size * 0.85}`} stroke={B.red} strokeWidth={size / 12} strokeLinecap="round" pathLength={1} strokeDasharray={`${c} 1`} /></svg>}
      </div>
      {label && <div style={{ textAlign: 'center', marginTop: 12, fontFamily: cond, fontWeight: 800, fontSize: size * 0.26, letterSpacing: 2, color: B.ink, whiteSpace: 'nowrap' }}>{label}</div>}
    </Pop>
  );
};

/** Horizontal bar that fills to `frac` (0..1+) between frames a → b. */
export const HBar: React.FC<{ x: number; y: number; w: number; h?: number; frac: number; a: number; b: number; color?: string; label?: string; value?: React.ReactNode; track?: boolean; mark?: number; markLabel?: string }> = ({ x, y, w, h = 90, frac, a, b, color = B.amber, label, value, track = true, mark, markLabel }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, a, b)) * frac;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
      {label && <div style={{ position: 'absolute', left: 0, top: -50, fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 2, color: B.ink, opacity: kk(f, a - 6, a) }}>{label}</div>}
      {track && <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,34,48,.08)', border: `5px solid ${B.ink}`, opacity: kk(f, a - 8, a) }} />}
      {k > 0.005 && <div style={{ position: 'absolute', left: 0, top: 0, height: h, width: w * k, background: color, border: `5px solid ${B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.2)' }} />}
      {mark !== undefined && <div style={{ position: 'absolute', left: w * mark - 3, top: -24, width: 6, height: h + 48, background: B.red, opacity: kk(f, a - 6, a) }}>{markLabel && <div style={{ position: 'absolute', left: 14, top: -6, fontFamily: cond, fontWeight: 800, fontSize: 28, color: B.red, whiteSpace: 'nowrap' }}>{markLabel}</div>}</div>}
      {value && <div style={{ position: 'absolute', left: w * k + 24, top: 0, height: h, display: 'flex', alignItems: 'center', fontFamily: display, fontWeight: 800, fontSize: h * 0.8, color: B.ink, opacity: kk(f, a, a + 6), whiteSpace: 'nowrap' }}>{value}</div>}
    </div>
  );
};

/** Vertical bar (grows from the floor y). */
export const VBar: React.FC<{ x: number; y: number; w?: number; h: number; a: number; b: number; color?: string; label?: string; value?: React.ReactNode; ghost?: boolean }> = ({ x, y, w = 200, h, a, b, color = B.amber, label, value, ghost }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, a, b));
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h * k, width: w, height: h * k, background: color, border: `5px ${ghost ? 'dashed' : 'solid'} ${B.ink}`, opacity: ghost ? 0.45 : 1, boxShadow: ghost ? 'none' : '8px 8px 0 rgba(27,34,48,.2)' }}>
      {value && <div style={{ position: 'absolute', left: '50%', top: -96, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 72, color: B.ink, whiteSpace: 'nowrap', opacity: kk(f, b - 6, b) }}>{value}</div>}
      {label && <div style={{ position: 'absolute', left: '50%', top: h * k + 18, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.ink, whiteSpace: 'nowrap', letterSpacing: 2 }}>{label}</div>}
    </div>
  );
};

/** Balance scale: tilt -1 (left heavy) … 1 (right heavy). Pans hold any content. */
export const Balance: React.FC<{ x: number; y: number; tilt: number; left: React.ReactNode; right: React.ReactNode; at?: number; w?: number }> = ({ x, y, tilt, left, right, at = 0, w = 900 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 14, 140);
  const ang = tilt * 9;
  const r = (ang * Math.PI) / 180;
  const lx = (-w / 2) * Math.cos(r), ly = (-w / 2) * Math.sin(r); // left end; right end = (-lx, -ly)
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${s})` }}>
      <div style={{ position: 'absolute', left: -14, top: 0, width: 28, height: 380, background: B.ink }} />
      <div style={{ position: 'absolute', left: -120, top: 370, width: 240, height: 30, background: B.ink, borderRadius: 8 }} />
      <div style={{ position: 'absolute', left: -w / 2, top: -10, width: w, height: 20, background: B.ink, borderRadius: 10, transform: `rotate(${ang}deg)` }} />
      {[[lx, ly, left], [-lx, -ly, right]].map(([px, py, el], i) => (
        <div key={i} style={{ position: 'absolute', left: (px as number), top: (py as number), transform: 'translate(-50%,0)' }}>
          <div style={{ width: 4, height: 90, background: B.ink, margin: '0 auto' }} />
          <div style={{ width: 300, height: 26, borderRadius: '0 0 150px 150px', background: B.sand, border: `5px solid ${B.ink}` }} />
          <div style={{ position: 'absolute', left: '50%', bottom: 30, transform: 'translateX(-50%)' }}>{el as React.ReactNode}</div>
        </div>
      ))}
    </div>
  );
};

/** Line chart drawn from a to b. pts in chart units 0..1. */
export const Line: React.FC<{ x: number; y: number; w: number; h: number; pts: [number, number][]; a: number; b: number; color?: string; dots?: [string, string]; label?: string; stroke?: number }> = ({ x, y, w, h, pts, a, b, color = B.red, dots, label, stroke = 10 }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, a, b));
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px * w} ${(1 - py) * h}`).join(' ');
  const last = pts[pts.length - 1], first = pts[0];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
      <svg width={w} height={h} style={{ overflow: 'visible' }}>
        <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${k} 1`} />
        <circle cx={first[0] * w} cy={(1 - first[1]) * h} r={16} fill={B.bone} stroke={color} strokeWidth={7} opacity={kk(f, a - 4, a)} />
        <circle cx={last[0] * w} cy={(1 - last[1]) * h} r={18} fill={color} stroke={B.ink} strokeWidth={5} opacity={kk(f, b - 4, b)} />
      </svg>
      {dots && <>
        <div style={{ position: 'absolute', left: first[0] * w - 40, top: (1 - first[1]) * h + 26, fontFamily: display, fontWeight: 800, fontSize: 60, color: B.ink, opacity: kk(f, a - 4, a), whiteSpace: 'nowrap', transform: 'translateX(-50%)' }}>{dots[0]}</div>
        <div style={{ position: 'absolute', left: last[0] * w + 30, top: (1 - last[1]) * h - 40, fontFamily: display, fontWeight: 800, fontSize: 72, color, opacity: kk(f, b - 4, b), whiteSpace: 'nowrap' }}>{dots[1]}</div>
      </>}
      {label && <div style={{ position: 'absolute', left: 0, top: -64, fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 3, color: B.ink, opacity: kk(f, a - 6, a) }}>{label}</div>}
    </div>
  );
};

/** Paper card with a header strip, a big value and an optional line. */
export const Card: React.FC<{ x: number; y: number; at: number; head: string; value: React.ReactNode; sub?: string; w?: number; tone?: string; rot?: number; size?: number }> = ({ x, y, at, head, value, sub, w = 620, tone = B.red, rot = -1.5, size = 110 }) => (
  <Pop x={x} y={y} at={at} rot={rot}>
    <div style={{ width: w, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.22)' }}>
      <div style={{ background: tone, color: B.bone, borderBottom: `6px solid ${B.ink}`, fontFamily: cond, fontWeight: 800, fontSize: 38, letterSpacing: 5, padding: '8px 20px', textAlign: 'center' }}>{head}</div>
      <div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: size, color: B.ink, lineHeight: 1.15, padding: '6px 10px' }}>{value}</div>
      {sub && <div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 700, fontSize: 32, color: B.muted, letterSpacing: 2, paddingBottom: 14 }}>{sub}</div>}
    </div>
  </Pop>
);

/** Rotating paper gear with a label. */
export const Gear: React.FC<{ x: number; y: number; r: number; at: number; label: string; color?: string; speed?: number }> = ({ x, y, r, at, label, color = B.sand, speed = 1 }) => {
  const f = useCurrentFrame();
  const teeth = 10;
  const pts = Array.from({ length: teeth * 2 }, (_, i) => {
    const a = (i / (teeth * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 0.82;
    return `${Math.cos(a) * rr},${Math.sin(a) * rr}`;
  }).join(' ');
  return (
    <Pop x={x} y={y} at={at}>
      <div style={{ position: 'relative', width: r * 2, height: r * 2 }}>
        <svg width={r * 2} height={r * 2} viewBox={`${-r} ${-r} ${r * 2} ${r * 2}`} style={{ overflow: 'visible', transform: `rotate(${f * speed * 1.2}deg)` }}>
          <polygon points={pts} fill={color} stroke={B.ink} strokeWidth={6} strokeLinejoin="round" />
          <circle r={r * 0.25} fill={B.bone} stroke={B.ink} strokeWidth={6} />
        </svg>
        <div style={{ position: 'absolute', left: '50%', top: r * 2 + 10, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 2, color: B.ink, whiteSpace: 'nowrap' }}>{label}</div>
      </div>
    </Pop>
  );
};

/** Number that counts between frames a → b. */
export const CountUp: React.FC<{ from: number; to: number; a: number; b: number; fmt: (v: number) => string }> = ({ from, to, a, b, fmt }) => {
  const f = useCurrentFrame();
  return <>{fmt(from + (to - from) * easeO(kk(f, a, b)))}</>;
};

export const M = (v: number) => `$${v.toFixed(0)}`;
export const T2 = (v: number) => `$${v.toFixed(2)}T`;
export const B0 = (v: number) => `$${Math.round(v).toLocaleString('en-US')}B`;
export const MONO = F.mono;
