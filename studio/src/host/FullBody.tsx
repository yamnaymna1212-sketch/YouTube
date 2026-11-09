import React from 'react';
import { HostPose } from './Host';
import { GuyFigure } from './Guy';

// Full-body Auditor: the SAME head as the host bust (HostFigure, clipped at the collar) on a drawn body.
// He "lives" the viewer's life inside real photos: pumps gas, reads a paycheck, points at evidence.
export type BodyPose = 'stand' | 'pump' | 'read' | 'point' | 'shrug' | 'cheer' | 'think' | 'phone';

const KBASE = { coat: '#1F2D44', coatLit: '#2B3D5A', coatDeep: '#16202F', trouser: '#2A3442', shoe: '#E9E6E0', skin: '#E3B496', skinShade: '#C08F72', paper: '#F4F1EA', shirt: '#ECE8E0', trouser2: '#222B37' };
export type Outfit = Partial<typeof KBASE> & { stripes?: string };
const OutfitCtx = React.createContext<typeof KBASE>(KBASE);

const Arm: React.FC<{ x: number; y: number; a1: number; a2: number; front?: boolean; children?: React.ReactNode }> = ({ x, y, a1, a2, front, children }) => { const K = React.useContext(OutfitCtx); return (
  <g transform={`translate(${x} ${y}) rotate(${a1})`}>
    <rect x={-29} y={-12} width={58} height={190} rx={28} fill={front ? K.coatLit : K.coatDeep} stroke="#101114" strokeWidth={3} />
    <g transform={`translate(0 168) rotate(${a2})`}>
      <rect x={-25} y={-8} width={50} height={168} rx={24} fill={front ? K.coatLit : K.coatDeep} stroke="#101114" strokeWidth={3} />
      <rect x={-26} y={138} width={52} height={16} rx={6} fill={K.coatDeep} />
      <g transform="translate(0 176)">
        <ellipse rx={22} ry={25} fill={front ? K.skin : K.skinShade} />
        <g transform={`rotate(${-(a1 + a2)})`}>{children}</g>
      </g>
    </g>
  </g>
); };
/** a phone held up in the hand, screen glowing (alert) */
const HandPhone = () => (
  <g transform="translate(40 -40) rotate(-8)">
    <rect x={-34} y={-62} width={68} height={124} rx={12} fill="#11151F" stroke="#101114" strokeWidth={3} />
    <rect x={-27} y={-52} width={54} height={100} rx={6} fill="#F6F1E4" />
    <rect x={-27} y={-52} width={54} height={26} rx={6} fill="#B4452F" />
    <rect x={-20} y={-12} width={40} height={6} rx={3} fill="#9A927F" /><rect x={-20} y={2} width={30} height={6} rx={3} fill="#9A927F" />
  </g>
);
const Nozzle = () => (
  <g transform="rotate(62)">
    <rect x={-16} y={-20} width={32} height={66} rx={8} fill="#151515" />
    <rect x={-10} y={30} width={18} height={110} rx={6} fill="#1D1D1D" />
    <rect x={-6} y={128} width={12} height={54} rx={4} fill="#808080" />
  </g>
);
const Paycheck: React.FC<{ text?: string }> = ({ text = '$7.25/hr' }) => (
  <g transform="translate(90 -30) rotate(-3)">
    <rect x={-150} y={-90} width={260} height={160} rx={6} fill={KBASE.paper} stroke="#CFC8BA" strokeWidth={3} />
    <text x={-130} y={-56} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={20} fill="#3A352E">PAY STUB</text>
    <rect x={-130} y={-36} width={190} height={8} rx={4} fill="#C9C1B3" />
    <rect x={-130} y={-18} width={160} height={8} rx={4} fill="#C9C1B3" />
    <text x={-130} y={40} fontFamily="JetBrains Mono, monospace" fontSize={24} fill="#3F7A55">{text}</text>
  </g>
);

export const POSES: Record<BodyPose, { front: [number, number]; back: [number, number] }> = {
  stand: { front: [6, -4], back: [-6, 4] },
  pump: { front: [64, 22], back: [-8, 6] },
  read: { front: [-28, -96], back: [26, 96] },
  point: { front: [96, 0], back: [-6, 4] },
  shrug: { front: [38, -118], back: [-38, 118] },
  cheer: { front: [158, 18], back: [-10, 8] },
  think: { front: [-12, -150], back: [-14, 10] },
  phone: { front: [-22, -118], back: [-6, 4] },
};
export type ArmAngles = { front: [number, number]; back: [number, number] };

// arms: optional angle override (LiveJake blends poses); stride: walk cycle −1..1 (legs swing); breathe: −1..1 chest rise.
export const FullBody: React.FC<{ pose?: BodyPose; face?: Partial<HostPose>; style?: React.CSSProperties; stub?: string; arms?: ArmAngles; stride?: number; breathe?: number; outfit?: Outfit }> = ({ pose = 'stand', face = {}, style, stub, arms, stride = 0, breathe = 0, outfit }) => {
  const K = { ...KBASE, ...(outfit ?? {}) };
  const p: HostPose = { talk: 0, blink: 0, look: 0, brow: 0, smile: 0.25, tilt: 0, nod: 0, ...face };
  const a = arms ?? POSES[pose];
  const leg = stride * 14; // degrees
  const chest = 1 + breathe * 0.012;
  const s = 0.78, ox = 260 - 300 * s, oy = 478 - 522 * s; // head scale + offset (host coords -> body coords)
  return (
    <OutfitCtx.Provider value={K}>
    <svg viewBox="-160 0 840 1260" style={{ overflow: 'visible', ...style }}>
      <defs><clipPath id="headclip"><rect x={ox + 120 * s} y={0} width={360 * s} height={oy + 610 * s} /></clipPath></defs>
      <ellipse cx={260} cy={1236} rx={210} ry={22} fill="#000" opacity={0.35} />
      <Arm x={372} y={520} a1={a.back[0]} a2={a.back[1]} />
      <g transform={`rotate(${leg} 213 900)`}>
        <rect x={172} y={900} width={82} height={310} rx={16} fill={K.trouser} />
        <path d="M158 1198 h104 a18 18 0 0 1 0 36 h-120 a14 14 0 0 1 16 -36 z" fill={K.shoe} />
      </g>
      <g transform={`rotate(${-leg} 307 900)`}>
        <rect x={266} y={900} width={82} height={310} rx={16} fill={K.trouser2} />
        <path d="M262 1198 h104 a14 14 0 0 1 16 36 h-120 a18 18 0 0 1 0 -36 z" fill={K.shoe} />
      </g>
      <rect x={150} y={760} width={220} height={190} rx={18} fill={K.trouser} />
      <g transform={`translate(260 850) scale(${1 + breathe * 0.004} ${chest}) translate(-260 -850)`}>
      <path d="M140 482 C 200 462, 320 462, 380 482 L 404 840 C 330 856, 190 856, 116 840 Z" fill={K.coat} />
      <path d="M140 482 C 190 468, 230 464, 260 463 L 262 852 C 200 850, 150 846, 116 840 Z" fill={K.coatLit} />
      <path d="M232 470 L 288 470 L 300 850 L 222 850 Z" fill={K.shirt} />
      {outfit?.stripes && [640, 760].map((y) => <g key={y}><path d={`M126 ${y} L 228 ${y} L 228 ${y + 26} L 122 ${y + 26} Z`} fill={outfit.stripes} opacity={0.95} /><path d={`M292 ${y} L 394 ${y} L 398 ${y + 26} L 292 ${y + 26} Z`} fill={outfit.stripes} opacity={0.95} /></g>)}
      
      
      {[560, 640, 720, 800].map(y => <circle key={y} cx={214} cy={y} r={6} fill="#C9C3B6" />)}
      <g clipPath="url(#headclip)">
        <GuyFigure p={p} svgProps={{ x: ox, y: oy, width: 600 * s, height: 760 * s }} />
      </g>
      <Arm x={148} y={520} a1={a.front[0]} a2={a.front[1]} front>
        {pose === 'pump' && <Nozzle />}
        {pose === 'point' && <path d="M-10 -6 L -64 -8 Q -74 0 -64 8 L -10 8 Z" fill={K.skin} />}
        {pose === 'read' && <Paycheck text={stub} />}
        {pose === 'phone' && <HandPhone />}
      </Arm>
      </g>
    </svg>
    </OutfitCtx.Provider>
  );
};
