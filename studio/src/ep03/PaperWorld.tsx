import React from 'react';
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as condensed } from '@remotion/google-fonts/BarlowCondensed';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';

// PAPER WORLD v4 — flat paper-craft stage (our own drawing, not copied assets).
const cond = condensed('normal', { weights: ['600', '700'], subsets: ['latin'] }).fontFamily;
export const P = {
  ink: '#1B2230', paper: '#EDE6D3', bone: '#F6F1E4', blue: '#3F5A8C', red: '#B4452F', amber: '#D9A441', pine: '#4E7A4A', sand: '#DDD0AF',
};

export const Paper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: P.paper }}>
    {Array.from({ length: 90 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', left: random('fx' + i) * 1920, top: random('fy' + i) * 1080, width: 14 + random('fw' + i) * 26, height: 2,
        background: P.ink, opacity: 0.06, transform: `rotate(${random('fr' + i) * 180}deg)`,
      }} />
    ))}
    {children}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(60,45,20,0.28) 100%)' }} />
  </AbsoluteFill>
);

export const Card: React.FC<{ children: React.ReactNode; x: number; y: number; at?: number; size?: number; rot?: number }> = ({ children, x, y, at = 0, size = 44, rot = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 14, stiffness: 170 } });
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${rot}deg)`, background: P.bone, border: `4px solid ${P.ink}`,
      boxShadow: `6px 6px 0 rgba(27,34,48,0.22)`, padding: '8px 22px', fontFamily: cond, fontWeight: 700, fontSize: size, color: P.ink, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{children}</div>
  );
};

// A living pawn: breathing squash, sway, spring hop on cue.
export const Pawn: React.FC<{ x: number; y: number; base: string; scale?: number; hat?: boolean; hop?: number; seed?: string; glasses?: boolean }> = ({ x, y, base, scale = 1, hat, hop = -1, seed = 'p', glasses }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const breathe = Math.sin(f / 18 + random(seed) * 6);
  const sq = 1 + breathe * 0.018;
  const sway = Math.sin(f / 47 + random(seed + 's') * 6) * 1.6;
  const h = hop >= 0 ? spring({ frame: f - hop, fps, config: { damping: 7, stiffness: 140 } }) : 0;
  const up = hop >= 0 ? Math.sin(Math.min(1, Math.max(0, (f - hop) / 16)) * Math.PI) * 46 : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 130 * scale, height: 220 * scale, transform: `translate(-50%,-100%) translateY(${-up}px)` }}>
      <div style={{ position: 'absolute', bottom: -10 * scale, left: '10%', width: '80%', height: 22 * scale, background: 'rgba(27,34,48,0.25)', borderRadius: '50%', filter: 'blur(3px)', transform: `scale(${1 - up / 200})` }} />
      <svg viewBox="0 0 130 220" width="100%" height="100%" style={{ transformOrigin: '50% 100%', transform: `scale(${1 / sq}, ${sq}) rotate(${sway + h * 0}deg)`, overflow: 'visible' }}>
        <ellipse cx="65" cy="205" rx="52" ry="13" fill={base} stroke={P.ink} strokeWidth="5" />
        <path d="M38 200 C44 150 52 126 54 104 C38 98 38 62 65 62 C92 62 92 98 76 104 C78 126 86 150 92 200 Z" fill={P.ink} stroke={P.ink} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="65" cy="80" r="27" fill={P.ink} />
        {hat && (<><ellipse cx="65" cy="60" rx="46" ry="9" fill={P.ink} /><path d="M40 60 C40 34 90 34 90 60 Z" fill={P.ink} /><rect x="40" y="50" width="50" height="8" fill="#55607a" /></>)}
        {glasses && (<><circle cx="53" cy="82" r="9" fill="none" stroke={P.bone} strokeWidth="3.5" /><circle cx="77" cy="82" r="9" fill="none" stroke={P.bone} strokeWidth="3.5" /><line x1="62" y1="82" x2="68" y2="82" stroke={P.bone} strokeWidth="3.5" /></>)}
        <ellipse cx="55" cy="74" rx="8" ry="5" fill="rgba(255,255,255,0.14)" />
      </svg>
    </div>
  );
};

export const Building: React.FC<{ kind: 'wh' | 'cap' | 'pent' | 'tehran'; x: number; y: number; scale?: number }> = ({ kind, x, y, scale = 1 }) => {
  const st = { fill: P.bone, stroke: P.ink, strokeWidth: 5, strokeLinejoin: 'round' as const };
  return (
    <svg style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, overflow: 'visible' }} width="440" height="300" viewBox="0 0 440 300">
      {kind === 'wh' && (<g><rect x="20" y="130" width="400" height="140" {...st} /><path d="M150 130 L220 90 L290 130 Z" {...st} />{[170, 200, 230, 260].map((c) => <rect key={c} x={c - 5} y="130" width="10" height="140" fill={P.ink} />)}{[50, 90, 130, 310, 350, 385].map((c) => <rect key={c} x={c - 12} y="170" width="24" height="30" fill={P.ink} />)}<line x1="220" y1="90" x2="220" y2="30" stroke={P.ink} strokeWidth="5" /></g>)}
      {kind === 'cap' && (<g><rect x="20" y="190" width="400" height="80" {...st} /><rect x="140" y="140" width="160" height="50" {...st} /><path d="M165 140 C165 80 275 80 275 140 Z" {...st} /><rect x="205" y="64" width="30" height="20" {...st} /><circle cx="220" cy="56" r="8" fill={P.ink} />{[60, 90, 120, 320, 350, 380].map((c) => <rect key={c} x={c - 5} y="205" width="10" height="55" fill={P.ink} />)}</g>)}
      {kind === 'pent' && (<g><path d="M220 60 L400 120 L330 270 L110 270 L40 120 Z" {...st} /><path d="M220 120 L320 155 L280 235 L160 235 L120 155 Z" fill={P.paper} stroke={P.ink} strokeWidth="5" /></g>)}
      {kind === 'tehran' && (<g><rect x="30" y="170" width="70" height="100" {...st} /><rect x="110" y="120" width="60" height="150" {...st} /><rect x="180" y="190" width="120" height="80" {...st} /><path d="M195 190 C195 140 285 140 285 190 Z" fill={P.sand} stroke={P.ink} strokeWidth="5" /><rect x="320" y="90" width="26" height="180" {...st} /><path d="M316 90 L333 50 L350 90 Z" fill={P.ink} /><rect x="360" y="150" width="50" height="120" {...st} /></g>)}
    </svg>
  );
};

export const Road: React.FC<{ y: number; label?: string; x1?: number; x2?: number }> = ({ y, label, x1 = 560, x2 = 1360 }) => (
  <>
    <div style={{ position: 'absolute', left: x1, top: y, width: x2 - x1, height: 52, borderRadius: 26, background: P.bone, border: `5px solid ${P.ink}` }} />
    <div style={{ position: 'absolute', left: x1 + 24, top: y + 24, width: x2 - x1 - 48, height: 0, borderTop: `5px dashed ${P.sand}` }} />
    {label && <div style={{ position: 'absolute', left: (x1 + x2) / 2, top: y + 72, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 600, fontSize: 34, color: '#8b7f62', letterSpacing: 2 }}>{label}</div>}
  </>
);

// ---- Board 1: stage with pawns, buildings, road, card, Jake under the stage
export const PaperBoardStage: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Paper>
      <Building kind="wh" x={420} y={640} />
      <Building kind="pent" x={1500} y={640} />
      <Road y={610} label="PENNSYLVANIA AVENUE" />
      <Card x={420} y={300} at={4}>White House</Card>
      <Card x={1500} y={330} at={10}>Pentagon</Card>
      <Pawn x={640} y={660} base={P.blue} seed="pres" hop={20} />
      <Pawn x={1240} y={660} base={P.red} seed="gen" hat />
      <Card x={640} y={705} at={14} size={30}>The President</Card>
      <Card x={960} y={150} at={26} size={56} rot={-1.5}>"One order. One chain of command."</Card>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: 'rgba(27,34,48,0.08)', borderTop: `4px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 140, bottom: -20, width: 300, height: 330 }}>
        <LiveJake pose="stand" seed="jake3" beats={[{ at: 40, r: 'surprise', hold: 40 }, { at: 100, r: 'worry', hold: 50 }]} />
      </div>
      <div style={{ position: 'absolute', right: 80, bottom: 40, background: P.bone, border: `4px solid ${P.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.22)', padding: '10px 22px', fontFamily: F.mono, fontSize: 26, color: P.ink }}>JAKE'S WALLET · <span style={{ color: P.red }}>−$?</span></div>
    </Paper>
  );
};

// ---- Board 2: strait map + barrels + chapter card
export const PaperBoardStrait: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Paper>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080" viewBox="0 0 1920 1080">
        <path d="M0 0 L1920 0 L1920 360 C1500 330 1250 520 1010 470 C880 440 820 520 760 600 C700 690 480 700 0 640 Z" fill={P.sand} stroke={P.ink} strokeWidth="6" />
        <path d="M0 1080 L0 800 C380 780 640 760 820 700 C960 660 1080 700 1180 800 C1400 920 1700 900 1920 880 L1920 1080 Z" fill={P.sand} stroke={P.ink} strokeWidth="6" />
        <path d="M820 700 C960 660 1080 700 1180 800" fill="none" stroke="#8fb0c4" strokeWidth="2" opacity="0" />
      </svg>
      <Card x={640} y={300} at={4} size={52}>Iran</Card>
      <Card x={950} y={900} at={10} size={44}>Arabian Peninsula</Card>
      <Card x={1010} y={640} at={16} size={46} rot={-2}>Strait of Hormuz</Card>
      {Array.from({ length: 7 }).map((_, i) => {
        const t = ((f / 90 + i / 7) % 1);
        return (
          <div key={i} style={{ position: 'absolute', left: 300 + t * 1300, top: 560 + Math.sin(t * Math.PI * 2) * 40 + (t > 0.35 && t < 0.7 ? 0 : 20), width: 38, height: 52, background: P.ink, borderRadius: 10, border: `3px solid ${P.ink}`, boxShadow: `inset 0 10px 0 ${P.amber}`, opacity: interpolate(t, [0, 0.08, 0.92, 1], [0, 1, 1, 0]) }} />
        );
      })}
      <Card x={960} y={160} at={22} size={64}>Road Two</Card>
      <div style={{ position: 'absolute', left: 960, top: 235, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 600, fontSize: 40, color: P.ink, letterSpacing: 3 }}>THE STRAIT THAT MOVES YOUR GAS PRICE</div>
    </Paper>
  );
};
