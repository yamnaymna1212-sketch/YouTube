import React from 'react';
import { HostPose } from './Host';
import { GuyFigure } from './Guy';

// Full-body Auditor: the SAME head as the host bust (HostFigure, clipped at the collar) on a drawn body.
// He "lives" the viewer's life inside real photos: pumps gas, reads a paycheck, points at evidence.
export type BodyPose = 'stand' | 'pump' | 'read' | 'point';

const K = { coat: '#1F2D44', coatLit: '#2B3D5A', coatDeep: '#16202F', trouser: '#2A3442', shoe: '#E9E6E0', skin: '#E3B496', skinShade: '#C08F72', paper: '#F4F1EA' };

const Arm: React.FC<{ x: number; y: number; a1: number; a2: number; front?: boolean; children?: React.ReactNode }> = ({ x, y, a1, a2, front, children }) => (
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
);
const Nozzle = () => (
  <g transform="rotate(62)">
    <rect x={-16} y={-20} width={32} height={66} rx={8} fill="#151515" />
    <rect x={-10} y={30} width={18} height={110} rx={6} fill="#1D1D1D" />
    <rect x={-6} y={128} width={12} height={54} rx={4} fill="#808080" />
  </g>
);
const Paycheck = () => (
  <g transform="translate(90 -30) rotate(-3)">
    <rect x={-150} y={-90} width={260} height={160} rx={6} fill={K.paper} stroke="#CFC8BA" strokeWidth={3} />
    <text x={-130} y={-56} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={20} fill="#3A352E">PAY STUB</text>
    <rect x={-130} y={-36} width={190} height={8} rx={4} fill="#C9C1B3" />
    <rect x={-130} y={-18} width={160} height={8} rx={4} fill="#C9C1B3" />
    <text x={-130} y={40} fontFamily="JetBrains Mono, monospace" fontSize={24} fill="#3F7A55">$7.25/hr</text>
  </g>
);

const POSES: Record<BodyPose, { front: [number, number]; back: [number, number] }> = {
  stand: { front: [6, -4], back: [-6, 4] },
  pump: { front: [64, 22], back: [-8, 6] },
  read: { front: [-28, -96], back: [26, 96] },
  point: { front: [96, 0], back: [-6, 4] },
};

export const FullBody: React.FC<{ pose?: BodyPose; face?: Partial<HostPose>; style?: React.CSSProperties }> = ({ pose = 'stand', face = {}, style }) => {
  const p: HostPose = { talk: 0, blink: 0, look: 0, brow: 0, smile: 0.25, tilt: 0, nod: 0, ...face };
  const a = POSES[pose];
  const s = 0.78, ox = 260 - 300 * s, oy = 478 - 522 * s; // head scale + offset (host coords -> body coords)
  return (
    <svg viewBox="-160 0 840 1260" style={{ overflow: 'visible', ...style }}>
      <defs><clipPath id="headclip"><rect x={ox + 120 * s} y={0} width={360 * s} height={oy + 610 * s} /></clipPath></defs>
      <ellipse cx={260} cy={1236} rx={210} ry={22} fill="#000" opacity={0.35} />
      <Arm x={372} y={520} a1={a.back[0]} a2={a.back[1]} />
      <rect x={172} y={900} width={82} height={310} rx={16} fill={K.trouser} />
      <rect x={266} y={900} width={82} height={310} rx={16} fill="#222B37" />
      <path d="M158 1198 h104 a18 18 0 0 1 0 36 h-120 a14 14 0 0 1 16 -36 z" fill={K.shoe} />
      <path d="M262 1198 h104 a14 14 0 0 1 16 36 h-120 a18 18 0 0 1 0 -36 z" fill={K.shoe} />
      <rect x={150} y={760} width={220} height={190} rx={18} fill={K.trouser} />
      <path d="M140 482 C 200 462, 320 462, 380 482 L 404 840 C 330 856, 190 856, 116 840 Z" fill={K.coat} />
      <path d="M140 482 C 190 468, 230 464, 260 463 L 262 852 C 200 850, 150 846, 116 840 Z" fill={K.coatLit} />
      <path d="M232 470 L 288 470 L 300 850 L 222 850 Z" fill="#ECE8E0" />
      
      
      {[560, 640, 720, 800].map(y => <circle key={y} cx={214} cy={y} r={6} fill="#C9C3B6" />)}
      <g clipPath="url(#headclip)">
        <GuyFigure p={p} svgProps={{ x: ox, y: oy, width: 600 * s, height: 760 * s }} />
      </g>
      <Arm x={148} y={520} a1={a.front[0]} a2={a.front[1]} front>
        {pose === 'pump' && <Nozzle />}
        {pose === 'point' && <path d="M-10 -6 L -64 -8 Q -74 0 -64 8 L -10 8 Z" fill={K.skin} />}
        {pose === 'read' && <Paycheck />}
      </Arm>
    </svg>
  );
};
