import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { B, PaperUS, cond, display } from '../brand/Brand';

// EP08 thumbnail: same look as the "3 possible futures" idea (US map + three pawns), but the words match the video:
// 3 THINGS = health care, gas, taxes. Real photo cut-out (Conlan Houston, CC BY-SA 4.0, credit in the description), colour grade only.
const WEST = ['Washington', 'Oregon', 'California', 'Nevada', 'Idaho', 'Montana', 'Wyoming', 'Utah', 'Colorado', 'Arizona', 'New Mexico'];
const MID = ['North Dakota', 'South Dakota', 'Nebraska', 'Kansas', 'Oklahoma', 'Texas', 'Minnesota', 'Iowa', 'Missouri', 'Arkansas', 'Louisiana'];
const G = '#5E9A4E', Bl = '#3F7FB5', Y = '#E3A92F';
const fill = (n: string) => (WEST.includes(n) ? G : MID.includes(n) ? Bl : Y);

const Pawn: React.FC<{ x: number; y: number; c: string; label: string }> = ({ x, y, c, label }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx={0} cy={4} rx={62} ry={16} fill="#000" opacity={0.35} />
    <path d="M-52 0 Q-52 -22 -24 -26 L-18 -120 Q-50 -128 -34 -178 Q0 -214 34 -178 Q50 -128 18 -120 L24 -26 Q52 -22 52 0 Z" fill={c} stroke="#111" strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={-14} cy={-160} rx={11} ry={20} fill="#fff" opacity={0.55} transform="rotate(20 -14 -160)" />
    <rect x={-92} y={20} width={184} height={66} rx={12} fill="#FBF6E8" stroke="#111" strokeWidth={6} />
    <text x={0} y={68} textAnchor="middle" fontFamily={cond} fontWeight={800} fontSize={50} letterSpacing={2} fill="#111">{label}</text>
  </g>
);

export const EP08Thumb: React.FC = () => (
  <AbsoluteFill style={{ background: '#F2D98B', overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 45%, #F7E3A0 0%, #E9C766 70%, #C99A3A 100%)' }} />
    <div style={{ position: 'absolute', left: 60, top: 30, fontFamily: display, fontWeight: 800, fontSize: 228, lineHeight: 0.9, color: '#111', letterSpacing: -4 }}>3 THINGS</div>
    <div style={{ position: 'absolute', left: 60, top: 250, fontFamily: display, fontWeight: 800, fontSize: 150, lineHeight: 0.9, color: '#D21F1F', WebkitTextStroke: '4px #8E0F0F', letterSpacing: -4 }}>HE’D CHANGE</div>
    <PaperUS x={50} y={440} w={900} fill={fill}>
      <path d="M96 213 C 300 196, 420 262, 560 226 S 760 214, 840 236" fill="none" stroke="#111" strokeWidth={5} strokeDasharray="14 12" opacity={0.7} />
      <Pawn x={150} y={248} c="#E94B3C" label="HEALTH" />
      <Pawn x={470} y={296} c="#2F6FD0" label="GAS" />
      <Pawn x={790} y={246} c="#F2C230" label="TAXES" />
    </PaperUS>
    <div style={{ position: 'absolute', left: 600, top: 470, width: 100, height: 100, borderRadius: 50, background: '#fff', border: '8px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 76, color: '#111' }}>?</div>
    <Img src={staticFile('sayed/cut_elsayed.png')} style={{ position: 'absolute', left: 1090, top: 150, height: 1000, filter: 'drop-shadow(0 0 0 #fff) drop-shadow(0 0 10px rgba(255,255,255,.9)) drop-shadow(0 18px 24px rgba(0,0,0,.45)) contrast(1.06) saturate(1.08)' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, transparent 60%, rgba(0,0,0,.18))', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', right: 40, bottom: 40, background: '#111', color: '#FBF6E8', fontFamily: cond, fontWeight: 800, fontSize: 64, letterSpacing: 5, padding: '6px 26px', border: '5px solid #FBF6E8' }}>BEST CASE</div>
  </AbsoluteFill>
);
