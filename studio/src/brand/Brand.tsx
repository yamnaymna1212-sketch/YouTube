import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import states from 'us-atlas/states-albers-10m.json';
import { loadFont as condensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as playfair } from '@remotion/google-fonts/PlayfairDisplay';
import type { LucideIcon } from 'lucide-react';
import { F } from '../theme';

// =====================================================================================
// DOLLARLY BRAND KIT v5 — one look for every episode (see style/BRAND-v5-dollarly.md).
// Five shot families share one palette, one type system and one set of frames:
//   1 PAPER STAGE   cream paper, ink line buildings, pawns, quote cards
//   2 PAPER MAP     beige US/world map, small serif labels, label cards
//   3 NIGHT MAP     dark teal map, glowing outline, kicker + serif date + gold underline
//   4 ARCHIVE PRINT real photo / real film in a white frame on paper, name card beside it
//   5 JAKE EXPLAINS Jake on the paper floor next to one big card (short beats only)
// =====================================================================================

export const cond = condensed('normal', { weights: ['600', '700', '800'], subsets: ['latin'] }).fontFamily;
export const display = playfair('normal', { weights: ['700', '800'], subsets: ['latin'] }).fontFamily;

export const B = {
  ink: '#1B2230', paper: '#EDE6D3', bone: '#F6F1E4', sand: '#DDD0AF', land: '#E4D7B5', water: '#C9D3CF',
  blue: '#3F5A8C', red: '#B4452F', amber: '#D9A441', pine: '#4E7A4A', muted: '#8B7F62',
  night: '#132022', nightLand: '#1F3134', nightLine: '#36504F', glow: '#E5483B', gold: '#E8B64C', nightText: '#F3EEE2',
};

const spr = (f: number, at: number, fps: number, damping = 16, stiffness = 140) => spring({ frame: f - at, fps, config: { damping, stiffness } });

// ---------- grounds
export const PaperGround: React.FC<{ children?: React.ReactNode; tone?: string }> = ({ children, tone = B.paper }) => (
  <AbsoluteFill style={{ background: tone }}>
    {Array.from({ length: 110 }).map((_, i) => (
      <div key={i} style={{ position: 'absolute', left: random('bfx' + i) * 1920, top: random('bfy' + i) * 1080, width: 10 + random('bfw' + i) * 28, height: 2, background: B.ink, opacity: 0.05, transform: `rotate(${random('bfr' + i) * 180}deg)` }} />
    ))}
    {children}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 58%, rgba(70,52,22,0.24) 100%)', pointerEvents: 'none' }} />
  </AbsoluteFill>
);

export const NightGround: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #1C2D30 0%, ${B.night} 70%)` }}>
    {children}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }} />
  </AbsoluteFill>
);

/** Film grain + flicker over everything (keeps code-drawn and real material in one world). */
export const Grain: React.FC<{ k?: number }> = ({ k = 0.06 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay' }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: random('gg' + i + (f % 4)) * 1920, top: random('gh' + i + (f % 4)) * 1080, width: 14 + random('gw' + i) * 26, height: 2, background: '#fff', opacity: k * 2, transform: `rotate(${random('gr' + i) * 180}deg)` }} />
      ))}
    </AbsoluteFill>
  );
};

// ---------- type
/** Small red spaced caps over a headline: "NOVEMBER 2014". */
export const Kicker: React.FC<{ children: React.ReactNode; color?: string; size?: number; dash?: boolean }> = ({ children, color = B.red, size = 30, dash }) => (
  <div style={{ fontFamily: cond, fontWeight: 700, fontSize: size, letterSpacing: size * 0.22, color, textTransform: 'uppercase' }}>{dash ? '— ' : ''}{children}</div>
);

/** Precedent-style name card: kicker, big serif name, one or two short lines. */
export const NameCard: React.FC<{ kicker: string; title: string; lines?: string[]; at?: number; x: number; y: number; size?: number; dark?: boolean; w?: number }> = ({ kicker, title, lines = [], at = 0, x, y, size = 110, dark, w = 820 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 18, 110);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: s, transform: `translateY(${(1 - s) * 26}px)` }}>
      <Kicker color={dark ? B.gold : B.red}>{kicker}</Kicker>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: size, lineHeight: 1.02, color: dark ? B.nightText : B.ink, marginTop: 14 }}>{title}</div>
      {lines.map((l, i) => {
        const o = spr(f, at + 10 + i * 6, fps, 20, 120);
        return <div key={i} style={{ fontFamily: display, fontSize: size * 0.36, color: dark ? 'rgba(243,238,226,.8)' : '#4A4538', marginTop: i ? 4 : 22, opacity: o }}>{l}</div>;
      })}
    </div>
  );
};

/** Night-map headline: "— THE WAR SO FAR / February 28, 2026 / The war begins" with a gold underline that draws. */
export const NightHeadline: React.FC<{ kicker: string; date: string; line: string; at?: number; x?: number; y?: number }> = ({ kicker, date, line, at = 0, x = 80, y = 90 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 18, 110);
  const u = interpolate(f - at, [12, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
      <Kicker color="rgba(243,238,226,.7)" size={26} dash>{kicker}</Kicker>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 92, color: B.nightText, marginTop: 8, lineHeight: 1 }}>{date}</div>
      <div style={{ display: 'inline-block', fontFamily: display, fontWeight: 700, fontSize: 70, color: B.gold, marginTop: 6, position: 'relative' }}>
        {line}
        <div style={{ position: 'absolute', left: 0, bottom: -6, height: 5, width: `${u * 100}%`, background: B.gold }} />
      </div>
    </div>
  );
};

/** Boxed label card with hard shadow (paper world). */
export const Label: React.FC<{ children: React.ReactNode; x: number; y: number; at?: number; size?: number; rot?: number; tone?: 'bone' | 'ink' | 'red' }> = ({ children, x, y, at = 0, size = 44, rot = 0, tone = 'bone' }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 13, 170);
  const bg = tone === 'ink' ? B.ink : tone === 'red' ? B.red : B.bone;
  const fg = tone === 'bone' ? B.ink : B.bone;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${rot}deg)`, background: bg, border: `4px solid ${B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,0.22)', padding: '6px 22px', fontFamily: cond, fontWeight: 700, fontSize: size, color: fg, letterSpacing: 1.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{children}</div>
  );
};

/** Quote card: giant quote marks, bold text, attribution bottom right. */
export const QuoteCard: React.FC<{ text: string; who: string; x: number; y: number; w?: number; at?: number; size?: number }> = ({ text, who, x, y, w = 760, at = 0, size = 92 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 15, 140);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, transform: `translate(-50%,-50%) scale(${0.9 + s * 0.1})`, opacity: s, background: B.bone, border: `4px solid ${B.ink}`, borderLeft: `16px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.18)', padding: '34px 46px 26px' }}>
      <div style={{ position: 'absolute', left: 40, top: -10, fontFamily: display, fontWeight: 800, fontSize: 120, color: '#8C8573', lineHeight: 1 }}>“</div>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: size, color: B.ink, lineHeight: 1.0, marginTop: 34 }}>{text}</div>
      <div style={{ textAlign: 'right', fontFamily: cond, fontWeight: 700, fontSize: size * 0.5, color: '#55607A', marginTop: 22, letterSpacing: 2, textTransform: 'uppercase' }}>{who}</div>
    </div>
  );
};

/** Source chip, bottom left: every shot carries one. */
export const Src: React.FC<{ children: React.ReactNode; dark?: boolean; right?: boolean }> = ({ children, dark, right }) => (
  <div style={{ position: 'absolute', ...(right ? { right: 48 } : { left: 48 }), bottom: 34, fontFamily: F.mono, fontSize: 19, letterSpacing: 0.5, color: dark ? 'rgba(243,238,226,.72)' : '#5C5444', background: dark ? 'rgba(0,0,0,.25)' : 'rgba(246,241,228,.75)', padding: '4px 10px' }}>{children}</div>
);

/** Channel bug, bottom right: small logo + wordmark. */
export const Bug: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ position: 'absolute', right: 44, bottom: 28, display: 'flex', alignItems: 'center', gap: 10, opacity: 0.85 }}>
    <Img src={staticFile('brand/logo.png')} style={{ width: 40, height: 40 }} />
    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: dark ? B.nightText : B.ink }}>DOLLARLY</div>
  </div>
);

// ---------- real material in frames
/** Real photo or real film in a white frame on the paper (Precedent-style print). Slow drift, warm grade, year tag. */
export const Frame: React.FC<{ src: string; video?: boolean; x: number; y: number; w: number; h: number; rot?: number; at?: number; year?: string; pos?: string; trim?: number; rate?: number; grade?: 'warm' | 'none' }> = ({ src, video, x, y, w, h, rot = 0, at = 0, year, pos = '50% 50%', trim = 0, rate = 1, grade = 'warm' }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 16, 120);
  const dx = noise2D('fx' + src, f / 90, 0) * 3, dy = noise2D('fy' + src, f / 90, 1) * 3;
  const filter = grade === 'warm' ? 'sepia(.22) saturate(.85) contrast(1.06)' : 'none';
  const media: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter, transform: `scale(${1.03 + (f - at) / 4000})` };
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, transform: `translate(-50%,-50%) translate(${dx}px,${dy + (1 - s) * 50}px) rotate(${rot}deg)`, opacity: s, background: '#FBF8F1', padding: 16, paddingBottom: year ? 48 : 16, boxShadow: '0 22px 40px rgba(40,30,10,.32), 0 3px 8px rgba(40,30,10,.25)' }}>
      <div style={{ width: '100%', height: h, overflow: 'hidden', background: '#111' }}>
        {video ? <OffthreadVideo src={staticFile(src)} muted trimBefore={trim} playbackRate={rate} style={media} /> : <Img src={staticFile(src)} style={media} />}
      </div>
      {year && <div style={{ position: 'absolute', right: 20, bottom: 12, fontFamily: display, fontSize: 22, color: '#7A7260' }}>{year}</div>}
    </div>
  );
};

/** Full-frame real film with film grade, letterbox vignette and a source chip. */
export const FullFilm: React.FC<{ src: string; trim?: number; rate?: number; push?: number; caption: string; pos?: string }> = ({ src, trim = 0, rate = 1, push = 0.06, caption, pos = '50% 50%' }) => {
  const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#0B0B0B' }}>
      <OffthreadVideo src={staticFile(src)} muted trimBefore={trim} playbackRate={rate} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: 'sepia(.28) saturate(.8) contrast(1.08) brightness(.95)', transform: `scale(${1 + push * (f / Math.max(1, durationInFrames))})` }} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,.55) 100%)' }} />
      <Src dark>{caption}</Src>
    </AbsoluteFill>
  );
};

// ---------- icons in badges
export const Badge: React.FC<{ I: LucideIcon; x: number; y: number; at?: number; size?: number; label?: string; tone?: 'bone' | 'red' | 'amber'; dark?: boolean }> = ({ I, x, y, at = 0, size = 110, label, tone = 'bone', dark }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 11, 160);
  const ring = interpolate(f - at, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bg = tone === 'red' ? B.red : tone === 'amber' ? B.amber : B.bone;
  const fg = tone === 'bone' ? B.ink : B.bone;
  const float = Math.sin(f / 22 + x / 100) * 4;
  return (
    <div style={{ position: 'absolute', left: x, top: y + float, transform: `translate(-50%,-50%) scale(${s})` }}>
      <svg width={size + 30} height={size + 30} style={{ position: 'absolute', left: -15, top: -15 }}>
        <circle cx={(size + 30) / 2} cy={(size + 30) / 2} r={size / 2 + 10} fill="none" stroke={dark ? B.gold : B.ink} strokeWidth={3} strokeDasharray={`${ring * 3.3 * (size / 2 + 10) * 2} 999`} transform={`rotate(-90 ${(size + 30) / 2} ${(size + 30) / 2})`} opacity={0.6} />
      </svg>
      <div style={{ width: size, height: size, borderRadius: '50%', background: bg, border: `5px solid ${B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <I size={size * 0.5} color={fg} strokeWidth={2.4} />
      </div>
      {label && <div style={{ position: 'absolute', top: size + 16, left: '50%', transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 700, fontSize: 34, color: dark ? B.nightText : B.ink, whiteSpace: 'nowrap', letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>}
    </div>
  );
};

// ---------- maps (U.S. Census boundaries via us-atlas, pre-projected Albers 975×610)
const geo = feature(states as any, (states as any).objects.states) as any;
const nation = feature(states as any, (states as any).objects.nation) as any;
const path = geoPath();
export const STATE_NAMES: string[] = geo.features.map((g: any) => g.properties.name);
/** approx. pixel position of Washington, D.C. in the 975×610 Albers space */
export const DC_XY: [number, number] = [818, 238];

/** Paper US map: beige states, ink border. `fill` gives a colour per state, `on` 0..1 per state for an animated flip. */
export const PaperUS: React.FC<{ x: number; y: number; w: number; fill?: (name: string) => string | undefined; on?: (name: string) => number; children?: React.ReactNode }> = ({ x, y, w, fill, on, children }) => {
  const sc = w / 975;
  return (
    <svg width={w} height={610 * sc} viewBox="0 0 975 610" style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <path d={path(nation) || ''} fill={B.land} stroke={B.ink} strokeWidth={5} transform="translate(5,6)" opacity={0.18} />
      {geo.features.map((g: any) => {
        const n = g.properties.name; const c = fill?.(n); const k = on ? on(n) : c ? 1 : 0;
        return <path key={n} d={path(g) || ''} fill={c && k > 0 ? c : B.land} fillOpacity={c ? 0.25 + 0.75 * k : 1} stroke={B.ink} strokeWidth={1.2} strokeOpacity={0.55} />;
      })}
      <path d={path(nation) || ''} fill="none" stroke={B.ink} strokeWidth={3.2} />
      {children}
    </svg>
  );
};

/** Night US map: dark land, thin lines, glowing outline that draws in. */
export const NightUS: React.FC<{ x: number; y: number; w: number; at?: number; glow?: string; children?: React.ReactNode }> = ({ x, y, w, at = 0, glow = B.glow, children }) => {
  const f = useCurrentFrame();
  const sc = w / 975;
  const draw = interpolate(f - at, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = 0.75 + Math.sin(f / 14) * 0.15;
  return (
    <svg width={w} height={610 * sc} viewBox="0 0 975 610" style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <defs>
        <filter id="nglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id="relief2"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={4} seed={3} result="n" /><feDiffuseLighting in="n" lightingColor="#9fb3b0" surfaceScale={1.6} result="l"><feDistantLight azimuth={225} elevation={48} /></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="in" result="lit" /><feBlend in="SourceGraphic" in2="lit" mode="multiply" /></filter>
      </defs>
      <g filter="url(#relief2)">
        {geo.features.map((g: any) => <path key={g.properties.name} d={path(g) || ''} fill={B.nightLand} stroke={B.nightLine} strokeWidth={1} />)}
      </g>
      <path d={path(nation) || ''} fill="none" stroke={glow} strokeWidth={12} opacity={0.55 * draw * pulse} filter="url(#nglow)" />
      <path d={path(nation) || ''} fill="none" stroke={glow} strokeWidth={2.6} pathLength={1} strokeDasharray={`${draw} 1`} />
      {children}
    </svg>
  );
};

/** Pulsing location pin in map space (use inside PaperUS/NightUS). */
export const Pin: React.FC<{ x: number; y: number; label?: string; dark?: boolean; at?: number; color?: string }> = ({ x, y, label, dark, at = 0, color = B.glow }) => {
  const f = useCurrentFrame();
  const o = interpolate(f - at, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r = ((f - at) / 40) % 1;
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={6 + r * 30} fill="none" stroke={color} strokeWidth={2} opacity={1 - r} />
      <circle cx={x} cy={y} r={7} fill={color} stroke={dark ? '#fff' : B.ink} strokeWidth={2} />
      {label && <text x={x + 16} y={y - 12} fontFamily="Barlow Condensed, sans-serif" fontWeight={700} fontSize={22} letterSpacing={2} fill={dark ? B.nightText : B.ink}>{label}</text>}
    </g>
  );
};

// ---------- paper props
/** A paper door that swings open (rotateY). Number + icon on the panel, label underneath. */
export const Door: React.FC<{ x: number; y: number; n: number; I: LucideIcon; label: string; at?: number; openAt?: number; w?: number; color?: string }> = ({ x, y, n, I, label, at = 0, openAt = -1, w = 230, color = B.red }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 12, 150);
  const o = openAt >= 0 ? spr(f, openAt, fps, 16, 90) : 0;
  const h = w * 1.75;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: `translate(-50%,-100%) scale(${s})`, transformOrigin: '50% 100%' }}>
      <div style={{ position: 'absolute', inset: -14, background: B.ink, borderRadius: '8px 8px 0 0' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${B.gold}, #F6E3A8)`, opacity: o }} />
      <div style={{ position: 'absolute', inset: 0, perspective: 900 }}>
        <div style={{ position: 'absolute', inset: 0, background: color, border: `5px solid ${B.ink}`, transformOrigin: '0% 50%', transform: `rotateY(${-o * 78}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, boxShadow: 'inset 0 0 0 14px rgba(0,0,0,.08)' }}>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: w * 0.42, color: B.bone, lineHeight: 1 }}>{n}</div>
          <div style={{ width: w * 0.42, height: w * 0.42, borderRadius: '50%', background: B.bone, border: `4px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={w * 0.22} color={B.ink} strokeWidth={2.4} /></div>
          <div style={{ position: 'absolute', right: 18, top: '52%', width: 16, height: 16, borderRadius: '50%', background: B.gold, border: `3px solid ${B.ink}` }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: h + 24, left: '50%', transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.ink, whiteSpace: 'nowrap', letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
};

/** Tear-off calendar page. */
export const Calendar: React.FC<{ x: number; y: number; dow: string; day: string; month: string; at?: number; ring?: number; size?: number }> = ({ x, y, dow, day, month, at = 0, ring = -1, size = 1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 13, 150);
  const r = ring >= 0 ? interpolate(f - ring, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 340 * size, transform: `translate(-50%,-50%) scale(${s}) rotate(-2deg)` }}>
      <div style={{ background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)' }}>
        <div style={{ background: B.red, borderBottom: `5px solid ${B.ink}`, padding: '10px 0', textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 46 * size, color: B.bone, letterSpacing: 6 }}>{month}</div>
        <div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 210 * size, color: B.ink, lineHeight: 1.05 }}>{day}</div>
        <div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 700, fontSize: 40 * size, color: B.muted, letterSpacing: 8, paddingBottom: 14 }}>{dow}</div>
      </div>
      {ring >= 0 && (
        <svg width={460 * size} height={460 * size} style={{ position: 'absolute', left: -60 * size, top: -40 * size, overflow: 'visible' }}>
          <ellipse cx={230 * size} cy={230 * size} rx={215 * size} ry={225 * size} fill="none" stroke={B.red} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${r} 1`} transform={`rotate(-80 ${230 * size} ${230 * size})`} />
        </svg>
      )}
    </div>
  );
};

/** Jake's wallet meter, top right (EP02 continuity). */
export const WalletChip: React.FC<{ value: string; at?: number; dark?: boolean }> = ({ value, at = 0, dark }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 14, 150);
  return (
    <div style={{ position: 'absolute', right: 48, top: 40, transform: `scale(${s})`, transformOrigin: '100% 0%', background: dark ? 'rgba(19,32,34,.85)' : B.bone, border: `4px solid ${dark ? B.gold : B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.22)', padding: '10px 22px', fontFamily: F.mono, fontSize: 28, color: dark ? B.nightText : B.ink }}>
      JAKE'S WALLET · <span style={{ color: B.red, fontWeight: 500 }}>{value}</span>
    </div>
  );
};

/** Chapter card (linked: the camera flies through a door into it). */
export const ChapterCard: React.FC<{ n: string; title: string; sub?: string; at?: number }> = ({ n, title, sub, at = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 18, 120);
  return (
    <PaperGround>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', opacity: s, transform: `translateY(${(1 - s) * 24}px)` }}>
        <Kicker size={36}>{n}</Kicker>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 150, color: B.ink, lineHeight: 1.05, marginTop: 10 }}>{title}</div>
        {sub && <div style={{ fontFamily: display, fontSize: 48, color: '#5A5444', marginTop: 16 }}>{sub}</div>}
        <div style={{ margin: '34px auto 0', width: 260 * s, height: 6, background: B.red }} />
      </div>
    </PaperGround>
  );
};
