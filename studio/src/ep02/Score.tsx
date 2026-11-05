import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, Fuel, HeartPulse, Receipt } from 'lucide-react';
import { C, F } from '../theme';
import { clamp, ease } from '../ui/Film';
import { Ico, Label } from './Hook';

// Jake's running scoreboard: one line per file, built line by line (used at the end of File 04 and in the Close).
export const SCORE: [any, string, string, string][] = [
  [Fuel, 'Gas', '≈ $0', C.steel],
  [HeartPulse, 'Health care', '+$1,440', '#6FBF73'],
  [Banknote, 'Paycheck', 'up to +$6,800 · if $17 passes', '#6FBF73'],
  [Receipt, 'Taxes', '?', C.red],
];
export const fadeIn = (f: number, at: number, len = 12) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: ease });

export const Scoreboard: React.FC<{ title?: string; step?: number; flip?: number }> = ({ title = "Jake's scoreboard · so far", step = 9, flip }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: C.ink, justifyContent: 'center', paddingLeft: 230 }}>
      <Label at={0} color={C.amber}>{title}</Label>
      <div style={{ marginTop: 34, width: 1460 }}>
        {SCORE.map(([I, a, v, col], i) => {
          const at = 6 + i * step;
          const k = spring({ frame: f - at, fps, config: { damping: 16, stiffness: 120 } });
          const big = flip !== undefined && i === 3 ? fadeIn(f, flip) : 0;
          return (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 34, padding: '22px 0', borderBottom: '1px solid rgba(236,231,222,.14)', opacity: Math.min(1, k * 1.4), transform: `translateX(${(1 - k) * 60}px)` }}>
              <Ico I={I} size={46} color={col} at={at} />
              <div style={{ fontFamily: F.serif, fontSize: 72, color: C.bone, width: 520 }}>{a}</div>
              <div style={{ fontFamily: F.mono, fontSize: i === 3 ? 72 + big * 40 : i === 2 ? 46 : 56, color: col, whiteSpace: 'nowrap' }}>{v}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
