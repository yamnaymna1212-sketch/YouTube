import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { F } from '../theme';
import { P } from './PaperWorld';

// ===== Real flags (flag-icons 7.2.3, MIT — standard national flag designs) =====
export type FlagCode = 'us' | 'ir' | 'om' | 'ae' | 'sa' | 'cn' | 'in' | 'jp' | 'kr' | 'gb' | 'fr' | 'ru' | 'il';
/** A real flag with a gentle cloth wave (skew + moving light band), ink frame and hard shadow. */
export const Flag: React.FC<{ c: FlagCode; w?: number; x?: number; y?: number; at?: number; pole?: boolean; style?: React.CSSProperties }> = ({ c, w = 160, x, y, at = 0, pole, style }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 12, stiffness: 160 } });
  const wave = Math.sin(f / 9 + (x ?? 0)) * 2.2;
  const h = w * 0.75;
  const pos: React.CSSProperties = x !== undefined ? { position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})` } : { transform: `scale(${s})`, display: 'inline-block' };
  return (
    <div style={{ ...pos, ...style }}>
      {pole && <div style={{ position: 'absolute', left: -10, top: -10, width: 8, height: h * 2.2, background: P.ink, borderRadius: 4 }} />}
      <div style={{ width: w, height: h, border: `4px solid ${P.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.3)', overflow: 'hidden', transform: `skewY(${wave}deg)`, transformOrigin: '0 50%', position: 'relative', background: '#fff' }}>
        <Img src={staticFile(`iran/flags/${c}.svg`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(100deg, transparent ${20 + wave * 8}%, rgba(255,255,255,.28) ${35 + wave * 8}%, transparent ${50 + wave * 8}%, rgba(0,0,0,.14) ${80 + wave * 4}%)` }} />
      </div>
    </div>
  );
};

/** A label card with a real flag in front of the name. */
export const FlagLabel: React.FC<{ c: FlagCode; name: string; x: number; y: number; at?: number; size?: number; rot?: number }> = ({ c, name, x, y, at = 0, size = 46, rot = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 13, stiffness: 160 } });
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${rot}deg)`, display: 'flex', alignItems: 'center', gap: 14, background: P.bone, border: `4px solid ${P.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.25)', padding: '6px 18px 6px 8px', whiteSpace: 'nowrap' }}>
      <div style={{ width: size * 1.3, height: size, border: `3px solid ${P.ink}`, overflow: 'hidden' }}><Img src={staticFile(`iran/flags/${c}.svg`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      <div style={{ fontFamily: 'Barlow Condensed, Inter, sans-serif', fontWeight: 700, fontSize: size, color: P.ink, letterSpacing: 1, textTransform: 'uppercase' }}>{name}</div>
    </div>
  );
};

// ===== A near-real city at night / at dawn, built in code =====
// Layers: sky gradient, stars, moon glow, three skyline depths with atmospheric haze, flickering windows, street lights, slow parallax.
const Layer: React.FC<{ seed: string; y: number; hMin: number; hMax: number; color: string; lit: number; drift: number; win: string; n?: number }> = ({ seed, y, hMin, hMax, color, lit, drift, win, n = 22 }) => {
  const f = useCurrentFrame();
  let x = -80;
  const items: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const w = 70 + random(seed + 'w' + i) * 120, h = hMin + random(seed + 'h' + i) * (hMax - hMin);
    const cols = Math.max(2, Math.floor(w / 26)), rows = Math.max(3, Math.floor(h / 34));
    const wins: React.ReactNode[] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const k = seed + i + '-' + r + '-' + c;
      const on = random(k) < lit && random(k + Math.floor(f / (90 + random(k + 'p') * 200))) > 0.08;
      if (on) wins.push(<div key={k} style={{ position: 'absolute', left: 8 + c * 24, top: 14 + r * 32, width: 11, height: 15, background: win, opacity: 0.55 + random(k + 'o') * 0.45 }} />);
    }
    items.push(
      <div key={i} style={{ position: 'absolute', left: x, top: y - h, width: w, height: h + 400, background: color }}>
        {random(seed + 'ant' + i) > 0.8 && <div style={{ position: 'absolute', left: w / 2, top: -40, width: 3, height: 40, background: color }}><div style={{ position: 'absolute', left: -3, top: -4, width: 9, height: 9, borderRadius: 5, background: '#ff4a3a', opacity: (f + i * 11) % 60 < 30 ? 1 : 0.15 }} /></div>}
        {wins}
      </div>
    );
    x += w + 4 + random(seed + 'g' + i) * 24;
  }
  return <div style={{ position: 'absolute', left: 0, top: 0, width: 2400, height: 1080, transform: `translateX(${-noise2D(seed, f / 400, 0) * 20 - f * drift}px)` }}>{items}</div>;
};

export const NightCity: React.FC<{ dawn?: number; red?: number; streets?: boolean }> = ({ dawn = 0, red = 0, streets = true }) => {
  const f = useCurrentFrame();
  const sky = dawn > 0 ? `linear-gradient(#2B3B5E ${0}%, #6E6A8A ${40}%, #E9A877 ${85}%)` : 'linear-gradient(#060A16 0%, #121C36 55%, #2A2746 100%)';
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: sky }}>
      {dawn === 0 && Array.from({ length: 120 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: random('st' + i) * 1920, top: random('sy' + i) * 520, width: 2 + random('ss' + i) * 2, height: 2 + random('ss' + i) * 2, borderRadius: 2, background: '#fff', opacity: 0.25 + 0.6 * Math.abs(Math.sin(f / (20 + random('sf' + i) * 40) + i)) }} />)}
      {dawn === 0 && <div style={{ position: 'absolute', left: 1460, top: 120, width: 110, height: 110, borderRadius: 55, background: '#F3EBD3', boxShadow: '0 0 90px 40px rgba(243,235,211,.18)' }} />}
      {dawn > 0 && <div style={{ position: 'absolute', left: 1200, top: 720, width: 260, height: 260, borderRadius: 130, background: '#FFD9A0', boxShadow: '0 0 220px 120px rgba(255,200,140,.45)' }} />}
      <Layer seed="far" y={860} hMin={180} hMax={420} color={dawn ? '#8C8FA8' : '#1A2440'} lit={dawn ? 0.05 : 0.18} drift={0.02} win="#F3D58A" />
      <AbsoluteFill style={{ background: `linear-gradient(transparent 45%, ${dawn ? 'rgba(240,200,170,.35)' : 'rgba(40,46,80,.45)'} 85%)` }} />
      <Layer seed="mid" y={930} hMin={220} hMax={520} color={dawn ? '#5E6276' : '#121A30'} lit={dawn ? 0.04 : 0.3} drift={0.05} win="#F6CF6E" n={18} />
      <Layer seed="near" y={1010} hMin={260} hMax={620} color={dawn ? '#3A3D4C' : '#0B1122'} lit={dawn ? 0.03 : 0.38} drift={0.1} win="#FFC95A" n={14} />
      {streets && Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 60 + i * 230, top: 1000, width: 120, height: 70, borderRadius: '50%', background: 'radial-gradient(rgba(255,205,120,.55), transparent 70%)' }} />)}
      {red > 0 && <AbsoluteFill style={{ background: `radial-gradient(ellipse at 60% 90%, rgba(200,60,40,${red}), transparent 65%)` }} />}
    </AbsoluteFill>
  );
};

/** Real footage as a taped print (with source caption). */
export const FilmPrint: React.FC<{ src: string; x: number; y: number; w: number; h: number; rot?: number; caption: string; at?: number; trim?: number }> = ({ src, x, y, w, h, rot = 0, caption, at = 0, trim = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 15, stiffness: 120 } });
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, transform: `translateY(${(1 - s) * 60}px) rotate(${rot}deg)`, opacity: s, background: P.bone, padding: 12, paddingBottom: 46, border: `4px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.28)' }}>
      <div style={{ height: h, overflow: 'hidden', border: `2px solid ${P.ink}` }}><OffthreadVideo src={staticFile(src)} muted trimBefore={trim} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.2) saturate(.85) contrast(1.05)' }} /></div>
      <div style={{ position: 'absolute', left: 14, bottom: 12, right: 14, fontFamily: F.mono, fontSize: 15, color: P.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{caption}</div>
      <div style={{ position: 'absolute', left: -16, top: -14, width: 100, height: 30, background: 'rgba(217,164,65,.55)', transform: 'rotate(-28deg)' }} />
      <div style={{ position: 'absolute', right: -16, top: -14, width: 100, height: 30, background: 'rgba(217,164,65,.55)', transform: 'rotate(28deg)' }} />
    </div>
  );
};
