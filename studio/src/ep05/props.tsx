import React from 'react';
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import { Fuel } from 'lucide-react';
import { B, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { fr } from './kit';
import { wordT } from './t';

// EP05 props — gas-price episode. All drawn in code in the Dollarly paper palette.
// Map data: Natural Earth via world-atlas (public domain).

export const clampX = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const kk = (f: number, a: number, b: number) => (b <= a ? (f >= a ? 1 : 0) : interpolate(f, [a, b], [0, 1], clampX));
export const easeO = (x: number) => 1 - Math.pow(1 - x, 3);
const spr = (f: number, at: number, fps: number, damping = 13, stiffness = 150) => spring({ frame: f - at, fps, config: { damping, stiffness } });

/** word clock relative to a shot start: a(p, 'word', nth) → local frame */
export const atW = (s: number) => (p: number, w: string, n = 0) => fr(wordT(p, w, n) - s);

/** Number that counts between two values (eased). */
export const Count: React.FC<{ from: number; to: number; a: number; b: number; fmt?: (v: number) => string; style?: React.CSSProperties }> = ({ from, to, a, b, fmt = (v) => v.toFixed(0), style }) => {
  const f = useCurrentFrame();
  const v = from + (to - from) * easeO(kk(f, a, b));
  return <span style={style}>{fmt(v)}</span>;
};
export const usd = (v: number) => `$${v.toFixed(2)}`;
export const usd0 = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

// ------------------------------------------------------------------------------------------------
/** Paper gas pump. (x, y) = bottom centre. `sale` text on the display (or pass `saleNode`). */
export const Pump: React.FC<{ x: number; y: number; scale?: number; sale?: React.ReactNode; gal?: React.ReactNode; night?: boolean; color?: string; hose?: 'holster' | 'out' | 'none'; glow?: number }> = ({ x, y, scale = 1, sale = '$0.00', gal, night, color = B.red, hose = 'holster', glow = 0 }) => {
  const f = useCurrentFrame();
  const W = 300, H = 600;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: W, height: H, transform: `translate(-50%,-100%) scale(${scale})`, transformOrigin: '50% 100%' }}>
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 0, height: 30, background: '#B9AC8B', border: `5px solid ${B.ink}` }} />
      <div style={{ position: 'absolute', left: 30, right: 30, top: 0, bottom: 26, background: B.bone, border: `6px solid ${B.ink}`, borderRadius: '18px 18px 4px 4px', boxShadow: '10px 10px 0 rgba(27,34,48,.22)', overflow: 'hidden' }}>
        <div style={{ height: 70, background: color, borderBottom: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Fuel size={40} color={B.bone} strokeWidth={2.6} />
          <span style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, color: B.bone, letterSpacing: 6 }}>GAS</span>
        </div>
        <div style={{ margin: '22px 18px 0', background: '#10140F', border: `5px solid ${B.ink}`, borderRadius: 6, padding: '12px 14px', boxShadow: glow ? `0 0 ${30 * glow}px rgba(232,182,76,${0.7 * glow})` : 'none' }}>
          <div style={{ fontFamily: F.mono, fontSize: 18, color: 'rgba(232,182,76,.6)', letterSpacing: 2 }}>SALE</div>
          <div style={{ fontFamily: F.mono, fontSize: 48, color: B.gold, textAlign: 'right', lineHeight: 1.05, textShadow: '0 0 12px rgba(232,182,76,.55)' }}>{sale}</div>
          {gal !== undefined && <><div style={{ fontFamily: F.mono, fontSize: 18, color: 'rgba(232,182,76,.6)', letterSpacing: 2, marginTop: 6 }}>GALLONS</div>
            <div style={{ fontFamily: F.mono, fontSize: 36, color: B.gold, textAlign: 'right' }}>{gal}</div></>}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 22 }}>
          {['87', '89', '93'].map((g, i) => <div key={g} style={{ width: 62, height: 44, background: i === 0 ? B.amber : B.sand, border: `4px solid ${B.ink}`, borderRadius: 6, fontFamily: cond, fontWeight: 800, fontSize: 28, textAlign: 'center', lineHeight: '38px', color: B.ink }}>{g}</div>)}
        </div>
        <div style={{ position: 'absolute', left: 30, right: 30, bottom: 40, height: 90, border: `4px solid ${B.ink}`, borderRadius: 8, background: night ? '#D8CDB0' : B.paper }} />
      </div>
      {hose !== 'none' && (
        <svg width={W + 120} height={H} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          <path d={hose === 'holster' ? `M${W - 30} 200 C ${W + 40} 230, ${W + 50} 420, ${W - 10} 470` : `M${W - 30} 200 C ${W + 90} 240, ${W + 160} 300 + ${Math.sin(f / 20) * 4}, ${W + 120} 360`} fill="none" stroke={B.ink} strokeWidth={14} strokeLinecap="round" />
          {hose === 'holster' && <rect x={W - 44} y={180} width={34} height={70} rx={8} fill={B.ink} />}
        </svg>
      )}
    </div>
  );
};

/** Little paper car (side view). */
export const Car: React.FC<{ x: number; y: number; color?: string; scale?: number; flip?: boolean }> = ({ x, y, color = B.blue, scale = 1, flip }) => (
  <svg width={260} height={120} viewBox="0 0 260 120" style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${flip ? -scale : scale},${scale})`, overflow: 'visible' }}>
    <path d="M20 80 L30 52 L80 48 L110 20 L180 20 L210 50 L245 56 L250 82 Z" fill={color} stroke={B.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M118 28 L174 28 L196 50 L100 50 Z" fill={B.bone} stroke={B.ink} strokeWidth={4} />
    <circle cx={70} cy={84} r={20} fill={B.ink} /><circle cx={70} cy={84} r={8} fill={B.sand} />
    <circle cx={200} cy={84} r={20} fill={B.ink} /><circle cx={200} cy={84} r={8} fill={B.sand} />
  </svg>
);

/** Top-right chip: JAKE'S TANK · $xx.xx (replaces the wallet chip in EP05). */
export const PumpChip: React.FC<{ value: React.ReactNode; at?: number; dark?: boolean; hot?: number }> = ({ value, at = 0, dark, hot = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 14, 150);
  const pulse = hot >= 0 ? Math.max(0, 1 - (f - hot) / 20) * (f >= hot ? 1 : 0) : 0;
  return (
    <div style={{ position: 'absolute', right: 48, top: 40, transform: `scale(${s * (1 + pulse * 0.12)})`, transformOrigin: '100% 0%', display: 'flex', alignItems: 'center', gap: 12, background: dark ? 'rgba(19,32,34,.88)' : B.bone, border: `4px solid ${dark ? B.gold : B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.22)', padding: '10px 22px', fontFamily: F.mono, fontSize: 28, color: dark ? B.nightText : B.ink }}>
      <Fuel size={30} color={dark ? B.gold : B.ink} strokeWidth={2.4} /> JAKE'S TANK · <span style={{ color: B.red, fontWeight: 500 }}>{value}</span>
    </div>
  );
};

/** Top-left WHAT IF tag (hypothetical, on every frame from the moment it's stamped). */
export const WhatIfTag: React.FC<{ dark?: boolean; at?: number }> = ({ dark, at = -100 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 14, 160);
  return (
    <div style={{ position: 'absolute', left: 48, top: 40, display: 'flex', gap: 12, alignItems: 'center', transform: `scale(${s})`, transformOrigin: '0 0', fontFamily: F.mono, fontSize: 22, letterSpacing: 2 }}>
      <span style={{ background: B.red, color: B.bone, padding: '6px 12px', border: `3px solid ${B.ink}` }}>WHAT IF</span>
      <span style={{ color: dark ? 'rgba(243,238,226,.75)' : B.ink }}>HYPOTHETICAL</span>
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
/** The gas station scene (story world). Night or day. Pass children for Jake / props on the forecourt. */
export const Station: React.FC<{ night?: boolean; price?: string; children?: React.ReactNode; cars?: boolean; michigan?: boolean }> = ({ night = true, price = '4.15', children, cars = true, michigan }) => {
  const f = useCurrentFrame();
  const sky = night ? 'linear-gradient(#0F1A2B 0%, #1E2C45 55%, #3A3550 100%)' : 'linear-gradient(#B9CBD2 0%, #E6DCC2 70%)';
  const flick = 0.94 + Math.sin(f / 4.1) * 0.03;
  return (
    <AbsoluteFill style={{ background: sky, overflow: 'hidden' }}>
      {night && Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: random('st' + i) * 1920, top: random('sy' + i) * 300, width: 3, height: 3, borderRadius: 2, background: '#F3EEE2', opacity: 0.25 + 0.5 * Math.abs(Math.sin(f / 30 + i)) }} />)}
      {/* far skyline */}
      {Array.from({ length: 16 }).map((_, i) => {
        const w = 70 + random('skw' + i) * 80, h = 90 + random('skh' + i) * 210, x = i * 125 + random('skx' + i) * 30;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: 640 - h, width: w, height: h, background: night ? '#26324A' : '#C9C0A6', borderTop: `3px solid ${night ? '#141B2B' : B.ink}`, opacity: night ? 1 : 0.6 }}>
            {night && Array.from({ length: 6 }).map((__, j) => random('l' + i + j) > 0.55 && <div key={j} style={{ position: 'absolute', left: 10 + (j % 3) * 20, top: 14 + Math.floor(j / 3) * 28, width: 9, height: 12, background: '#E9C46A', opacity: 0.7 }} />)}
          </div>
        );
      })}
      {/* road + forecourt */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, height: 120, background: night ? '#232A36' : '#8C8573', borderTop: `5px solid ${B.ink}` }}>
        {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: ((i * 190 - f * 3) % 2280 + 2280) % 2280 - 180, top: 54, width: 90, height: 8, background: night ? '#C9B98E' : B.bone, opacity: 0.6 }} />)}
      </div>
      {cars && [0, 1].map((i) => {
        const sp = i ? 9 : 6.5, x = ((f * sp + i * 1100) % 2600) - 300;
        return <Car key={i} x={i ? 1920 - x : x} y={720 + i * 26} color={i ? B.pine : B.blue} scale={0.75} flip={!!i} />;
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, bottom: 0, background: night ? '#2E3442' : '#CFC3A2', borderTop: `5px solid ${B.ink}` }} />
      {/* pylon sign */}
      <div style={{ position: 'absolute', left: 120, top: 150, width: 300 }}>
        <div style={{ background: B.bone, border: `6px solid ${B.ink}`, boxShadow: night ? `0 0 40px rgba(232,182,76,${0.35 * flick})` : '8px 8px 0 rgba(27,34,48,.2)', padding: '10px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 6, color: B.red }}>{michigan ? 'MICHIGAN' : 'REGULAR'}</div>
          <div style={{ fontFamily: F.mono, fontSize: 92, color: B.ink, lineHeight: 1 }}>{price}<sup style={{ fontSize: 44 }}>9</sup></div>
        </div>
        <div style={{ width: 26, height: 460, margin: '0 auto', background: B.ink }} />
      </div>
      {/* canopy */}
      <div style={{ position: 'absolute', left: 520, top: 230, width: 1300, height: 70, background: B.red, border: `6px solid ${B.ink}`, boxShadow: night ? `0 40px 120px rgba(255,236,190,${0.25 * flick})` : 'none' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -16, height: 10, background: B.bone, borderTop: `4px solid ${B.ink}` }} />
      </div>
      {night && <div style={{ position: 'absolute', left: 520, top: 300, width: 1300, height: 600, background: `linear-gradient(rgba(255,240,200,${0.22 * flick}), transparent 80%)`, clipPath: 'polygon(0 0, 100% 0, 110% 100%, -10% 100%)' }} />}
      {[640, 1700].map((x) => <div key={x} style={{ position: 'absolute', left: x, top: 300, width: 34, height: 520, background: B.bone, border: `5px solid ${B.ink}` }} />)}
      {children}
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------------------------------------
/** The DASHBOARD: five paper levers on a console. pulls[i] = frame lever i is pulled (-1 = not). Lever 4 (index 3) is huge and red. */
export const Console: React.FC<{ x?: number; y?: number; scale?: number; at?: number; pulls?: number[]; pop?: number[]; tags?: (React.ReactNode | null)[]; dim?: number[]; nums?: boolean; glow?: number }> = ({ x = 960, y = 900, scale = 1, at = 0, pulls = [], pop, tags = [], dim = [], nums = true, glow = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const rise = spr(f, at, fps, 16, 110);
  const XS = [-480, -240, 0, 270, 520];
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,0) translateY(${(1 - rise) * 500}px) scale(${scale})`, transformOrigin: '50% 0%' }}>
      <div style={{ position: 'absolute', left: -660, top: 0, width: 1320, height: 170, background: B.sand, border: `6px solid ${B.ink}`, borderRadius: '24px 24px 0 0', boxShadow: '0 14px 0 rgba(27,34,48,.22)' }}>
        {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 660 + XS[i] - 46, top: 26, width: 92, height: 26, borderRadius: 13, background: B.ink }} />)}
      </div>
      {XS.map((lx, i) => {
        const big = i === 3;
        const p = pop ? (pop[i] ?? 0) : 0;
        const show = pop ? spr(f, p, fps, 10, 170) : 1;
        const pulled = (pulls[i] ?? -1) >= 0 ? spr(f, pulls[i], fps, 9, 120) : 0;
        const ang = -18 + pulled * 36;
        const L = big ? 520 : 260;
        const knob = big ? 120 : 76;
        const d = dim.includes(i) ? 0.35 : 1;
        const lit = glow === i;
        return (
          <div key={i} style={{ position: 'absolute', left: lx, top: 40, opacity: d, transform: `scale(${show})`, transformOrigin: '50% 100%' }}>
            {big && <div style={{ position: 'absolute', left: -L * 0.9, top: -L * 0.2, width: L * 1.8, height: L * 1.2, background: 'radial-gradient(ellipse, rgba(180,69,47,.22), transparent 70%)' }} />}
            <div style={{ position: 'absolute', left: -14, top: -L, width: 28, height: L, background: B.ink, borderRadius: 14, transformOrigin: '50% 100%', transform: `rotate(${ang}deg)` }}>
              <div style={{ position: 'absolute', left: 14 - knob / 2, top: -knob / 2, width: knob, height: knob, borderRadius: '50%', background: big ? B.red : lit ? B.amber : B.bone, border: `6px solid ${B.ink}`, boxShadow: lit || big ? `0 0 30px ${big ? 'rgba(229,72,59,.6)' : 'rgba(232,182,76,.7)'}` : '5px 5px 0 rgba(27,34,48,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-ang}deg)` }}>
                {nums && <span style={{ fontFamily: display, fontWeight: 800, fontSize: knob * 0.5, color: big ? B.bone : B.ink }}>{i + 1}</span>}
              </div>
            </div>
            {tags[i] && <div style={{ position: 'absolute', left: 0, top: 160, transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>{tags[i]}</div>}
          </div>
        );
      })}
    </div>
  );
};

/** Value tag that hangs under a lever on the dashboard. */
export const LeverTag: React.FC<{ text: string; at: number; tone?: 'bone' | 'amber' | 'red' }> = ({ text, at, tone = 'bone' }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 11, 170);
  const swing = Math.sin((f - at) / 12) * 4 * Math.max(0, 1 - (f - at) / 90);
  return <div style={{ transform: `scale(${s}) rotate(${swing}deg)`, transformOrigin: '50% 0%', background: tone === 'amber' ? B.amber : tone === 'red' ? B.red : B.bone, color: tone === 'red' ? B.bone : B.ink, border: `4px solid ${B.ink}`, boxShadow: '5px 5px 0 rgba(27,34,48,.22)', padding: '6px 16px', fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 1 }}>{text}</div>;
};

// ------------------------------------------------------------------------------------------------
/** Cut-away gallon jug; layers fill bottom-up on cue. */
export type Layer = { frac: number; color: string; label: string; pct: string; at: number };
export const Gallon: React.FC<{ x: number; y: number; h?: number; layers: Layer[]; at?: number; labels?: boolean; lift?: number }> = ({ x, y, h = 640, layers, at = 0, labels = true, lift = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 14, 130);
  const w = h * 0.62;
  let acc = 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: `translate(-50%,-50%) scale(${s})` }}>
      <svg width={w} height={h} viewBox="0 0 310 500" style={{ position: 'absolute', overflow: 'visible' }}>
        <defs><clipPath id="jug"><path d="M40 120 L120 60 L120 20 L190 20 L190 60 L270 120 L270 480 Q270 495 255 495 L55 495 Q40 495 40 480 Z" /></clipPath></defs>
        <path d="M40 120 L120 60 L120 20 L190 20 L190 60 L270 120 L270 480 Q270 495 255 495 L55 495 Q40 495 40 480 Z" fill={B.bone} />
        <g clipPath="url(#jug)">
          {layers.map((L, i) => {
            const k = easeO(kk(f, L.at, L.at + 14));
            const top = 495 - (acc + L.frac) * 375 * k - acc * 375 * (1 - k);
            const hh = L.frac * 375 * k;
            const yy = 495 - acc * 375 - hh;
            acc += L.frac * (k > 0 ? 1 : 1);
            const up = i === 0 ? lift : 0;
            return <rect key={i} x={40} y={yy - up} width={230} height={hh} fill={L.color} stroke={B.ink} strokeWidth={3} opacity={i === 0 && lift > 0 ? 0.9 : 1} data-top={top} />;
          })}
        </g>
        <path d="M40 120 L120 60 L120 20 L190 20 L190 60 L270 120 L270 480 Q270 495 255 495 L55 495 Q40 495 40 480 Z" fill="none" stroke={B.ink} strokeWidth={8} strokeLinejoin="round" />
        <rect x={110} y={6} width={90} height={22} rx={6} fill={B.red} stroke={B.ink} strokeWidth={5} />
      </svg>
      {labels && (() => {
        let a2 = 0;
        return layers.map((L, i) => {
          const k = spr(f, L.at + 4, fps, 12, 170);
          const mid = 495 - (a2 + L.frac / 2) * 375; a2 += L.frac;
          return (
            <div key={i} style={{ position: 'absolute', left: w + 30, top: (mid / 500) * h, transform: `translateY(-50%) translateX(${(1 - k) * 40}px)`, opacity: k, display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap' }}>
              <div style={{ width: 60, height: 6, background: B.ink }} />
              <span style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: B.ink }}>{L.pct}</span>
              <span style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 2, color: '#55607A' }}>{L.label}</span>
            </div>
          );
        });
      })()}
    </div>
  );
};

/** Oil barrel with an optional price tag. */
export const Barrel: React.FC<{ x: number; y: number; scale?: number; tag?: React.ReactNode; at?: number; tilt?: number }> = ({ x, y, scale = 1, tag, at = 0, tilt = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 150);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s * scale}) rotate(${tilt}deg)` }}>
      <svg width={220} height={300} viewBox="0 0 220 300" style={{ overflow: 'visible' }}>
        <path d="M20 30 Q20 10 110 10 Q200 10 200 30 L200 270 Q200 290 110 290 Q20 290 20 270 Z" fill={B.blue} stroke={B.ink} strokeWidth={7} />
        <ellipse cx={110} cy={30} rx={90} ry={20} fill="#5B76A8" stroke={B.ink} strokeWidth={6} />
        {[100, 200].map((yy) => <path key={yy} d={`M20 ${yy} Q110 ${yy + 22} 200 ${yy}`} fill="none" stroke={B.ink} strokeWidth={6} />)}
        <text x={110} y={165} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight={800} fontSize={46} fill={B.bone}>OIL</text>
      </svg>
      {tag && <div style={{ position: 'absolute', left: 180, top: 40, transform: 'rotate(8deg)', background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.22)', padding: '6px 18px', fontFamily: display, fontWeight: 800, fontSize: 60, color: B.ink, whiteSpace: 'nowrap' }}>{tag}</div>}
    </div>
  );
};

/** Price tag (swinging, pump-sign style). */
export const PriceTag: React.FC<{ x: number; y: number; text: React.ReactNode; at?: number; tone?: 'bone' | 'red' | 'amber' | 'pine'; size?: number }> = ({ x, y, text, at = 0, tone = 'bone', size = 90 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 10, 170);
  const bg = tone === 'red' ? B.red : tone === 'amber' ? B.amber : tone === 'pine' ? B.pine : B.bone;
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${Math.sin(f / 14) * 3}deg)`, background: bg, color: tone === 'bone' || tone === 'amber' ? B.ink : B.bone, border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.22)', padding: '4px 26px', fontFamily: display, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap' }}>{text}</div>;
};

/** Stack of amber coins whose height grows to `value` (relative to `max`). */
export const Coins: React.FC<{ x: number; y: number; value: number; max: number; a: number; b: number; label?: React.ReactNode; color?: string; h?: number }> = ({ x, y, value, max, a, b, label, color = B.amber, h = 560 }) => {
  const f = useCurrentFrame();
  const k = easeO(kk(f, a, b));
  const n = Math.max(1, Math.round((value / max) * (h / 26) * k));
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      {Array.from({ length: n }).map((_, i) => <div key={i} style={{ position: 'absolute', left: -90 + Math.sin(i * 1.7) * 4, top: -30 - i * 26, width: 180, height: 34, borderRadius: '50%', background: color, border: `5px solid ${B.ink}` }} />)}
      {label && <div style={{ position: 'absolute', left: 0, top: -n * 26 - 110, transform: 'translateX(-50%)', opacity: kk(f, b - 6, b + 4), fontFamily: display, fontWeight: 800, fontSize: 84, color: B.ink, whiteSpace: 'nowrap' }}>{label}</div>}
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
/** Night map of the Persian Gulf / Strait of Hormuz from Natural Earth (world-atlas). Tankers flow through the strait
 * until `stopAt`, then freeze and the lane turns red. `share` highlights 1 tanker in 5 in gold at that frame. */
const countries = feature(world as any, (world as any).objects.countries) as any;
const proj = geoMercator().fitExtent([[0, 0], [1920, 1080]], { type: 'MultiPoint', coordinates: [[46.5, 22.4], [61.5, 31.2]] } as any);
const gpath = geoPath(proj);
const GULF_SHAPES = countries.features.map((g: any) => ({ d: gpath(g) || '', name: g.properties.name as string }));
const LANE: [number, number][] = [[49.8, 27.6], [52.0, 26.9], [54.5, 26.4], [56.0, 26.55], [56.55, 26.2], [57.4, 25.4], [58.8, 24.9], [61.0, 24.5]].map((p) => proj(p as [number, number]) as [number, number]);
const laneD = 'M' + LANE.map((p) => p.join(' ')).join(' L');
export const HORMUZ_XY = proj([56.4, 26.45]) as [number, number];
const lanePt = (t: number): [number, number] => {
  const segs = LANE.length - 1, u = Math.min(0.9999, Math.max(0, t)) * segs, i = Math.floor(u), r = u - i;
  return [LANE[i][0] + (LANE[i + 1][0] - LANE[i][0]) * r, LANE[i][1] + (LANE[i + 1][1] - LANE[i][1]) * r];
};
export const GulfMap: React.FC<{ at?: number; stopAt?: number; share?: number; red?: number; labels?: boolean; zoom?: number; children?: React.ReactNode }> = ({ at = 0, stopAt = -1, share = -1, red = -1, labels = true, zoom = 1, children }) => {
  const f = useCurrentFrame();
  const glow = kk(f, at, at + 30);
  // tankers' travel time slows to 0 after stopAt
  const tt = (fr0: number) => (stopAt >= 0 && fr0 > stopAt ? stopAt + (1 - Math.exp(-(fr0 - stopAt) / 12)) * 12 : fr0);
  const T = tt(f);
  const redK = red >= 0 ? kk(f, red, red + 16) : 0;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 55% 45%, #1C2D30 0%, ${B.night} 75%)`, overflow: 'hidden' }}>
      <AbsoluteFill style={{ transformOrigin: `${HORMUZ_XY[0]}px ${HORMUZ_XY[1]}px`, transform: `scale(${zoom})` }}>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          {GULF_SHAPES.map((c: any, i: number) => <path key={i} d={c.d} fill={B.nightLand} stroke={B.nightLine} strokeWidth={2} />)}
          <path d={laneD} fill="none" stroke={redK > 0 ? `rgba(229,72,59,${0.5 + 0.5 * redK})` : 'rgba(232,182,76,.55)'} strokeWidth={6} strokeDasharray="18 14" strokeDashoffset={-T * 2} />
          <circle cx={HORMUZ_XY[0]} cy={HORMUZ_XY[1]} r={70 + Math.sin(f / 9) * 6} fill="none" stroke={B.glow} strokeWidth={5} opacity={glow * 0.9} style={{ filter: 'drop-shadow(0 0 12px rgba(229,72,59,.8))' }} />
        </svg>
        {Array.from({ length: 15 }).map((_, i) => {
          const t = ((T / 260) + i / 15) % 1;
          const [x, y] = lanePt(t);
          const [x2, y2] = lanePt(Math.min(0.999, t + 0.01));
          const ang = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI;
          const gold = share >= 0 && f >= share && i % 5 === 0;
          return (
            <div key={i} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${ang}deg)` }}>
              <svg width={92} height={32} viewBox="0 0 58 20"><path d="M2 4 L46 4 L56 10 L46 16 L2 16 Z" fill={redK > 0.5 ? B.red : gold ? B.gold : B.nightText} stroke={B.ink} strokeWidth={2.5} /></svg>
            </div>
          );
        })}
        {labels && <>
          <MapLabel x={proj([53.5, 30.5])![0]} y={proj([53.5, 30.5])![1]} text="IRAN" />
          <MapLabel x={proj([47.6, 24.6])![0]} y={proj([47.6, 24.6])![1]} text="SAUDI ARABIA" />
          <MapLabel x={proj([51.0, 26.9])![0] - 60} y={proj([51.0, 26.9])![1] + 40} text="PERSIAN GULF" water />
          <MapLabel x={proj([59.6, 23.8])![0]} y={proj([59.6, 23.8])![1]} text="GULF OF OMAN" water />
        </>}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const MapLabel: React.FC<{ x: number; y: number; text: string; water?: boolean }> = ({ x, y, text, water }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', fontFamily: cond, fontWeight: 700, fontSize: water ? 26 : 34, letterSpacing: water ? 8 : 6, color: water ? 'rgba(160,190,190,.55)' : 'rgba(243,238,226,.55)', fontStyle: water ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>{text}</div>
);

// ------------------------------------------------------------------------------------------------
/** Gulf Coast cut-away: ground strata with salt caverns holding the reserve; `level` 0..1 of oil in the caverns. */
export const Caverns: React.FC<{ level: number; at?: number; flow?: number }> = ({ level, at = 0, flow = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 16, 110);
  const CX = [520, 960, 1400];
  return (
    <AbsoluteFill style={{ transform: `translateY(${(1 - s) * 300}px)` }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 360, height: 40, background: B.sand, borderTop: `6px solid ${B.ink}` }} />
      {[['#C9B98E', 400, 120], ['#B7A57A', 520, 180], ['#A6956D', 700, 380]].map(([c, t, h], i) => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: t as number, height: h as number, background: c as string, borderTop: `4px solid rgba(27,34,48,.35)` }} />)}
      {CX.map((cx, i) => {
        const H = 320, W = 220, top = 600;
        return (
          <div key={i} style={{ position: 'absolute', left: cx - W / 2, top, width: W, height: H, borderRadius: '45% 45% 48% 48%', background: '#EFE6CF', border: `6px solid ${B.ink}`, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${level * 100}%`, background: '#2B2A26', borderTop: `4px solid ${B.amber}` }} />
            <div style={{ position: 'absolute', left: W / 2 - 8, top: -10, width: 16, height: 60, background: B.ink }} />
          </div>
        );
      })}
      {CX.map((cx, i) => <div key={'p' + i} style={{ position: 'absolute', left: cx - 8, top: 360, width: 16, height: 250, background: B.ink }} />)}
      <div style={{ position: 'absolute', left: 512, top: 340, width: 1300, height: 16, background: B.ink }} />
      {flow >= 0 && f >= flow && Array.from({ length: 6 }).map((_, i) => {
        const t = (((f - flow) / 40) + i / 6) % 1;
        return <div key={i} style={{ position: 'absolute', left: 520 + t * 1280, top: 336, width: 26, height: 24, borderRadius: 12, background: B.amber, border: `3px solid ${B.ink}` }} />;
      })}
      {/* refinery on the surface */}
      <Refinery x={1720} y={360} />
    </AbsoluteFill>
  );
};

export const Refinery: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, transformOrigin: '50% 100%', width: 300, height: 260 }}>
      {[[20, 150, 50], [90, 210, 40], [150, 120, 60], [230, 180, 44]].map(([l, h, w], i) => <div key={i} style={{ position: 'absolute', left: l, bottom: 0, width: w, height: h, background: B.bone, border: `5px solid ${B.ink}`, borderRadius: i === 2 ? '30px 30px 0 0' : 4 }} />)}
      {[0, 1, 2].map((i) => { const t = ((f / 50) + i / 3) % 1; return <div key={i} style={{ position: 'absolute', left: 100 + t * 30, bottom: 210 + t * 90, width: 30 + t * 40, height: 30 + t * 40, borderRadius: '50%', background: 'rgba(246,241,228,.8)', border: `3px solid rgba(27,34,48,.4)`, opacity: 1 - t }} />; })}
    </div>
  );
};

/** Nodding pumpjack. */
export const Pumpjack: React.FC<{ x: number; y: number; scale?: number; speed?: number }> = ({ x, y, scale = 1, speed = 1 }) => {
  const f = useCurrentFrame();
  const a = Math.sin((f * speed) / 14) * 14;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, transformOrigin: '50% 100%', width: 300, height: 240 }}>
      <svg width={300} height={240} viewBox="0 0 300 240" style={{ overflow: 'visible' }}>
        <path d="M120 230 L150 90 L180 230" fill="none" stroke={B.ink} strokeWidth={9} strokeLinejoin="round" />
        <g transform={`rotate(${a} 150 90)`}>
          <rect x={40} y={78} width={220} height={24} fill={B.bone} stroke={B.ink} strokeWidth={6} />
          <path d="M260 66 Q300 90 260 114 Z" fill={B.bone} stroke={B.ink} strokeWidth={6} />
          <line x1={282} y1={100} x2={282} y2={230} stroke={B.ink} strokeWidth={4} />
        </g>
        <rect x={20} y={226} width={280} height={12} fill={B.ink} />
      </svg>
    </div>
  );
};

/** Wind turbine (blades turn). */
export const Turbine: React.FC<{ x: number; y: number; h?: number; at?: number }> = ({ x, y, h = 420, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 120);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scaleY(${s})`, transformOrigin: '50% 100%', width: 20, height: h }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 20, height: h, background: B.bone, border: `5px solid ${B.ink}`, clipPath: 'polygon(25% 0, 75% 0, 100% 100%, 0 100%)' }} />
      <svg width={300} height={300} style={{ position: 'absolute', left: -140, top: -150, overflow: 'visible', transform: `rotate(${f * 2.4}deg)`, transformOrigin: '150px 150px' }}>
        {[0, 120, 240].map((r) => <path key={r} d="M150 150 L142 20 Q150 6 158 20 Z" fill={B.bone} stroke={B.ink} strokeWidth={5} transform={`rotate(${r} 150 150)`} />)}
        <circle cx={150} cy={150} r={14} fill={B.ink} />
      </svg>
    </div>
  );
};
export const Solar: React.FC<{ x: number; y: number; at?: number }> = ({ x, y, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 150);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${s})`, transformOrigin: '50% 100%' }}>
      <div style={{ width: 220, height: 120, background: B.blue, border: `6px solid ${B.ink}`, transform: 'skewX(-14deg)', backgroundImage: `linear-gradient(90deg, ${B.ink} 3px, transparent 3px), linear-gradient(${B.ink} 3px, transparent 3px)`, backgroundSize: '55px 40px' }} />
      <div style={{ width: 12, height: 60, background: B.ink, margin: '0 auto' }} />
    </div>
  );
};

/** Tanker ship, side view (for the Jones Act move). */
export const Tanker: React.FC<{ x: number; y: number; scale?: number; flag?: string }> = ({ x, y, scale = 1, flag = B.pine }) => (
  <svg width={360} height={140} viewBox="0 0 360 140" style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, overflow: 'visible' }}>
    <path d="M10 70 L350 70 L320 120 L40 120 Z" fill={B.red} stroke={B.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={260} y={30} width={60} height={40} fill={B.bone} stroke={B.ink} strokeWidth={5} />
    {[60, 120, 180].map((cx) => <ellipse key={cx} cx={cx} cy={66} rx={26} ry={10} fill={B.bone} stroke={B.ink} strokeWidth={4} />)}
    <line x1={300} y1={30} x2={300} y2={0} stroke={B.ink} strokeWidth={4} />
    <rect x={300} y={0} width={34} height={20} fill={flag} stroke={B.ink} strokeWidth={3} />
  </svg>
);

/** Delivery van (Luis). */
export const Van: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <svg width={320} height={180} viewBox="0 0 320 180" style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, overflow: 'visible' }}>
    <path d="M10 140 L10 40 L210 40 L210 70 L270 80 L305 115 L305 140 Z" fill={B.bone} stroke={B.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M220 80 L262 86 L288 112 L220 112 Z" fill={B.blue} stroke={B.ink} strokeWidth={4} />
    <text x={110} y={100} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight={800} fontSize={34} fill={B.red}>DELIVERY</text>
    <circle cx={70} cy={146} r={24} fill={B.ink} /><circle cx={250} cy={146} r={24} fill={B.ink} />
  </svg>
);

/** Paper globe with turning meridians and ships orbiting. */
export const Globe: React.FC<{ x: number; y: number; r?: number; at?: number }> = ({ x, y, r = 260, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 14, 120);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})` }}>
      <svg width={r * 2 + 200} height={r * 2 + 200} viewBox={`${-r - 100} ${-r - 100} ${r * 2 + 200} ${r * 2 + 200}`} style={{ overflow: 'visible' }}>
        <circle r={r} fill={B.water} stroke={B.ink} strokeWidth={8} />
        {[0, 1, 2, 3, 4, 5].map((i) => { const ph = ((f / 3 + i * 30) % 180) - 90; const rx = Math.abs(Math.sin(ph * Math.PI / 180)) * r; return <ellipse key={i} rx={rx} ry={r} fill="none" stroke="rgba(27,34,48,.35)" strokeWidth={3} />; })}
        {[-0.5, 0, 0.5].map((k) => <ellipse key={k} cy={k * r} rx={Math.sqrt(1 - k * k) * r} ry={r * 0.12 * Math.sqrt(1 - k * k)} fill="none" stroke="rgba(27,34,48,.35)" strokeWidth={3} />)}
        <path d={`M${-r * 0.6} ${-r * 0.2} q ${r * 0.3} ${-r * 0.4} ${r * 0.6} ${-r * 0.1} t ${r * 0.4} ${r * 0.3} q ${-r * 0.2} ${r * 0.5} ${-r * 0.7} ${r * 0.4} z`} fill={B.land} stroke={B.ink} strokeWidth={5} transform={`translate(${Math.sin(f / 60) * 20} 0)`} />
        {[0, 1, 2].map((i) => { const a = f / 40 + i * 2.1; return <g key={i} transform={`translate(${Math.cos(a) * (r + 60)} ${Math.sin(a) * (r + 30) * 0.5}) rotate(${a * 57 + 90})`}><path d="M-22 -7 L16 -7 L24 0 L16 7 L-22 7 Z" fill={B.bone} stroke={B.ink} strokeWidth={3} /></g>; })}
      </svg>
    </div>
  );
};

/** Paper debate podium with a pawn behind it. */
export const Podium: React.FC<{ x: number; y: number; name: string; color: string; at?: number }> = ({ x, y, name, color, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 13, 150);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${s})`, transformOrigin: '50% 100%', width: 260, height: 300 }}>
      <div style={{ position: 'absolute', left: 30, bottom: 0, width: 200, height: 190, background: color, border: `6px solid ${B.ink}`, clipPath: 'polygon(0 0, 100% 0, 88% 100%, 12% 100%)' }} />
      <div style={{ position: 'absolute', left: 50, bottom: 80, width: 160, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 34, color: B.bone, letterSpacing: 2 }}>{name}</div>
      <div style={{ position: 'absolute', left: 116, bottom: 190, width: 8, height: 50, background: B.ink, transform: 'rotate(-20deg)' }} />
    </div>
  );
};

/** Receipt that types its lines in. */
export const Receipt: React.FC<{ x: number; y: number; lines: [string, number][]; at?: number; w?: number; title?: string }> = ({ x, y, lines, at = 0, w = 640, title = 'JAKE · THIS WEEK' }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 15, 120);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, transform: `translate(-50%,-50%) translateY(${(1 - s) * 400}px) rotate(-1.5deg)`, background: '#FBF8F1', border: `5px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.22)', padding: '26px 34px 40px', clipPath: 'polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97%)' }}>
      <div style={{ fontFamily: F.mono, fontSize: 24, letterSpacing: 4, color: '#7A7260', textAlign: 'center', marginBottom: 16 }}>{title}</div>
      {lines.map(([t, a], i) => {
        const n = Math.max(0, Math.min(t.length, Math.floor((f - a) / 1.2)));
        return <div key={i} style={{ fontFamily: F.mono, fontSize: 46, color: B.ink, lineHeight: 1.5, minHeight: 69, whiteSpace: 'nowrap' }}>{f >= a ? t.slice(0, n) : ''}{f >= a && n < t.length && Math.floor(f / 8) % 2 === 0 ? '▌' : ''}</div>;
      })}
    </div>
  );
};
