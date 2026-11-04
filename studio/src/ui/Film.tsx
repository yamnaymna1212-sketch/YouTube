import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C, F } from '../theme';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const io = Easing.bezier(0.65, 0, 0.35, 1);

// Film finishing: grain (cycled plates), vignette, gentle gate weave. Applied once over the whole cut.
export const FilmFinish: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <Img src={staticFile(`fx/grain${f % 6}.png`)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'overlay', opacity: 0.55 }} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)' }} />
    </AbsoluteFill>
  );
};

// Lower third — the same component everywhere = consistent "network" identity.
export const LowerThird: React.FC<{ title: string; sub?: string; at?: number; dark?: boolean }> = ({ title, sub, at = 10, dark = true }) => {
  const f = useCurrentFrame();
  const w = interpolate(f, [at, at + 18], [0, 1], { ...clamp, easing: ease });
  const o = interpolate(f, [at + 8, at + 22], [0, 1], clamp);
  return (
    <div style={{ position: 'absolute', left: 120, bottom: 120, color: dark ? C.bone : C.ink }}>
      <div style={{ width: 64 * w, height: 3, background: C.red, marginBottom: 16 }} />
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 34, letterSpacing: -0.3, opacity: o, translate: `${(1 - o) * -12}px 0px` }}>{title}</div>
      {sub && <div style={{ fontFamily: F.sans, fontSize: 22, opacity: o * 0.65, marginTop: 6 }}>{sub}</div>}
    </div>
  );
};

// Source credit — small, always present on factual shots.
export const Source: React.FC<{ children: React.ReactNode; dark?: boolean; at?: number }> = ({ children, dark = true, at = 12 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', right: 120, bottom: 64, fontFamily: F.mono, fontSize: 17, letterSpacing: 0.2, color: dark ? 'rgba(236,231,222,.55)' : 'rgba(12,13,16,.55)', opacity: interpolate(f, [at, at + 15], [0, 1], clamp) }}>
      SOURCE · {children}
    </div>
  );
};

// Kinetic line of narration-on-screen: word-by-word rise, used sparingly (key lines only).
export const KineticLine: React.FC<{ text: string; at?: number; size?: number; color?: string; stagger?: number; style?: React.CSSProperties; italic?: string[] }> = ({ text, at = 0, size = 72, color = C.bone, stagger = 3, style, italic = [] }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ fontFamily: F.serif, fontSize: size, lineHeight: 1.08, color, letterSpacing: -0.5, ...style }}>
      {text.split(' ').map((w, i) => {
        const t = interpolate(f, [at + i * stagger, at + i * stagger + 16], [0, 1], { ...clamp, easing: ease });
        return <span key={i} style={{ display: 'inline-block', marginRight: size * 0.24, opacity: t, translate: `0px ${(1 - t) * size * 0.35}px`, fontStyle: italic.includes(w) ? 'italic' : 'normal', color: italic.includes(w) ? C.amber : color }}>{w}</span>;
      })}
    </div>
  );
};

export { clamp };
