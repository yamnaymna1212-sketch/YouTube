import React from 'react';

// JAKE'S WORLD — an illustrated American small city at golden hour.
// Built from reusable parts so every scene can be re-framed (wide / medium / close, different angles).
// Story: Jake, 26, works at the Sunrise Diner, drives an old sedan, banks at First National.

export const W = {
  skyTop: '#2F4A6E', skyMid: '#C98B6A', skyLow: '#F2C48D', sun: '#FFE2A8',
  far: '#6E6A7A', far2: '#857E8C',
  brick: '#8E4E3C', brickDk: '#6E3A2C', cream: '#DCCDB2', creamDk: '#B9A98E', teal: '#3F6E70', tealDk: '#2E5254',
  navy: '#2E3F5A', navyDk: '#223049', asphalt: '#34363C', asphaltDk: '#2A2C31', walk: '#9B958B', walkDk: '#85807A',
  window: '#F3C77A', windowOff: '#3A4252', neonRed: '#FF5A4E', neonAmber: '#FFC15A', white: '#F4EFE6', chrome: '#C9CED6', green: '#3E6B4A',
};

export const Sky: React.FC<{ w?: number; h?: number; horizon?: number }> = ({ w = 1920, h = 1080, horizon = 640 }) => (
  <g>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={W.skyTop} /><stop offset="62%" stopColor={W.skyMid} /><stop offset="100%" stopColor={W.skyLow} />
      </linearGradient>
      <radialGradient id="sunGlow"><stop offset="0%" stopColor={W.sun} stopOpacity={0.9} /><stop offset="100%" stopColor={W.sun} stopOpacity={0} /></radialGradient>
    </defs>
    <rect width={w} height={horizon + 40} fill="url(#sky)" />
    <circle cx={w * 0.72} cy={horizon - 70} r={260} fill="url(#sunGlow)" />
    <circle cx={w * 0.72} cy={horizon - 70} r={58} fill={W.sun} />
    {[[260, 170, 1], [980, 120, 0.8], [1500, 210, 0.7]].map(([x, y, s], i) => (
      <g key={i} opacity={0.55} transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={0} rx={130} ry={26} fill="#F6D9C0" /><ellipse cx={60} cy={-14} rx={80} ry={24} fill="#F6D9C0" />
      </g>
    ))}
  </g>
);

// distant skyline silhouette (Detroit-like towers, generic)
export const Skyline: React.FC<{ base: number; seed?: number; w?: number }> = ({ base, seed = 3, w = 1920 }) => {
  let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const els: React.ReactNode[] = [];
  let x = -20;
  while (x < w) {
    const bw = 50 + rnd() * 90, bh = 80 + rnd() * 260;
    els.push(<rect key={x} x={x} y={base - bh} width={bw} height={bh} fill={rnd() > 0.5 ? W.far : W.far2} />);
    if (rnd() > 0.7) els.push(<rect key={x + 'a'} x={x + bw / 2 - 3} y={base - bh - 40} width={6} height={40} fill={W.far} />);
    x += bw + rnd() * 10;
  }
  return <g opacity={0.75}>{els}</g>;
};

const Windows: React.FC<{ x: number; y: number; cols: number; rows: number; cw?: number; ch?: number; gap?: number; lit?: number; seed?: number }> = ({ x, y, cols, rows, cw = 34, ch = 46, gap = 22, lit = 0.4, seed = 1 }) => {
  let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const out: React.ReactNode[] = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    out.push(<rect key={`${i}-${j}`} x={x + i * (cw + gap)} y={y + j * (ch + gap)} width={cw} height={ch} rx={2} fill={rnd() < lit ? W.window : W.windowOff} stroke="rgba(0,0,0,.25)" strokeWidth={2} />);
  }
  return <g>{out}</g>;
};

export const Building: React.FC<{ x: number; base: number; w: number; h: number; color: string; dark: string; cols?: number; rows?: number; seed?: number; sign?: string; signColor?: string; awning?: string }> = ({ x, base, w, h, color, dark, cols = 4, rows = 3, seed = 1, sign, signColor = W.white, awning }) => (
  <g>
    <rect x={x} y={base - h} width={w} height={h} fill={color} />
    <rect x={x + w - 18} y={base - h} width={18} height={h} fill={dark} opacity={0.6} />
    <rect x={x - 6} y={base - h - 14} width={w + 12} height={18} fill={dark} />
    <Windows x={x + 30} y={base - h + 40} cols={cols} rows={rows} cw={(w - 60 - (cols - 1) * 22) / cols} seed={seed} />
    {/* storefront */}
    <rect x={x + 20} y={base - 150} width={w - 40} height={150} fill="#1D232C" />
    <rect x={x + 30} y={base - 140} width={w - 60} height={100} fill={W.window} opacity={0.55} />
    {awning && <path d={`M${x + 10} ${base - 160} h${w - 20} l-16 44 h${-(w - 52)} z`} fill={awning} />}
    {awning && Array.from({ length: Math.floor((w - 20) / 40) }).map((_, i) => <rect key={i} x={x + 14 + i * 40} y={base - 160} width={20} height={44} fill="#fff" opacity={0.25} />)}
    {sign && <text x={x + w / 2} y={base - 176} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={30} letterSpacing={3} fill={signColor}>{sign}</text>}
  </g>
);

export const Diner: React.FC<{ x: number; base: number; s?: number }> = ({ x, base, s = 1 }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    <rect x={0} y={-230} width={560} height={230} rx={40} fill={W.chrome} />
    <rect x={0} y={-110} width={560} height={26} fill={W.neonRed} />
    <rect x={30} y={-200} width={500} height={80} rx={10} fill={W.window} opacity={0.85} />
    {[0, 1, 2, 3, 4].map(i => <rect key={i} x={40 + i * 100} y={-200} width={6} height={80} fill="#9AA2AD" />)}
    <rect x={240} y={-84} width={80} height={84} fill="#2A2F37" />
    <rect x={60} y={-336} width={440} height={92} rx={14} fill="#1B1E24" />
    <text x={280} y={-272} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={44} fill={W.neonRed} letterSpacing={2}>SUNRISE DINER</text>
    <text x={280} y={-232} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill={W.neonAmber} letterSpacing={6}>OPEN 24 HRS</text>
  </g>
);

export const Bank: React.FC<{ x: number; base: number; s?: number }> = ({ x, base, s = 1 }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    <path d="M-20 -380 L 270 -470 L 560 -380 Z" fill={W.creamDk} />
    <rect x={0} y={-380} width={540} height={380} fill={W.cream} />
    <rect x={-20} y={-390} width={580} height={22} fill={W.creamDk} />
    {[40, 140, 240, 340, 440].map(cx => <rect key={cx} x={cx} y={-360} width={46} height={330} fill="#EFE5D2" stroke={W.creamDk} strokeWidth={3} />)}
    <rect x={225} y={-170} width={90} height={170} fill="#2A2F37" />
    <text x={270} y={-420} textAnchor="middle" fontFamily="Instrument Serif, serif" fontSize={34} fill="#3A3226">FIRST NATIONAL BANK</text>
  </g>
);

export const GasStation: React.FC<{ x: number; base: number; s?: number; price?: string }> = ({ x, base, s = 1, price = '4.15' }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    {/* canopy */}
    <rect x={0} y={-420} width={760} height={56} fill={W.white} />
    <rect x={0} y={-364} width={760} height={18} fill={W.neonRed} />
    <rect x={60} y={-346} width={22} height={346} fill={W.chrome} />
    <rect x={678} y={-346} width={22} height={346} fill={W.chrome} />
    {[200, 470].map(px => (
      <g key={px}>
        <rect x={px} y={-210} width={90} height={210} rx={8} fill={W.white} />
        <rect x={px + 12} y={-190} width={66} height={44} fill="#1D232C" />
        <text x={px + 45} y={-160} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={22} fill="#7CF0A2">{price}</text>
        <rect x={px} y={-110} width={90} height={22} fill={W.neonRed} />
        <rect x={px + 70} y={-150} width={14} height={50} rx={4} fill="#222" />
      </g>
    ))}
    {/* price pylon */}
    <g transform="translate(860 0)">
      <rect x={40} y={-520} width={20} height={520} fill="#5B6270" />
      <rect x={-50} y={-640} width={200} height={260} rx={10} fill="#1B1E24" stroke={W.white} strokeWidth={6} />
      <rect x={-50} y={-640} width={200} height={56} rx={10} fill={W.neonRed} />
      <text x={50} y={-601} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={30} fill="#fff">GAS</text>
      <text x={50} y={-552} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill="#ddd" letterSpacing={3}>REGULAR</text>
      <text x={42} y={-480} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight={500} fontSize={72} fill={W.neonAmber}>{price}</text>
      <text x={128} y={-505} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={26} fill={W.neonAmber}>9</text>
      <text x={50} y={-420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16} fill="#ddd" letterSpacing={3}>PER GALLON</text>
    </g>
  </g>
);

export const Car: React.FC<{ x: number; base: number; s?: number; color?: string; flip?: boolean }> = ({ x, base, s = 1, color = '#6E8FA8', flip }) => (
  <g transform={`translate(${x} ${base}) scale(${flip ? -s : s} ${s})`}>
    <ellipse cx={0} cy={4} rx={230} ry={16} fill="#000" opacity={0.3} />
    <path d="M-220 -40 C -215 -90, -170 -100, -120 -104 L -70 -160 C -40 -184, 70 -184, 110 -160 L 160 -106 C 200 -100, 228 -84, 230 -40 L 230 -20 L -220 -20 Z" fill={color} />
    <path d="M-60 -152 L 0 -152 L 0 -108 L -100 -108 Z" fill="#9FC3DA" opacity={0.85} />
    <path d="M14 -152 L 96 -152 L 132 -108 L 14 -108 Z" fill="#9FC3DA" opacity={0.85} />
    <rect x={-220} y={-52} width={450} height={10} fill="rgba(0,0,0,.18)" />
    <rect x={150} y={-90} width={22} height={14} rx={3} fill="#2A2F37" />
    {[-140, 150].map(cx => <g key={cx}><circle cx={cx} cy={-20} r={40} fill="#16181C" /><circle cx={cx} cy={-20} r={18} fill="#9AA2AD" /></g>)}
    <rect x={212} y={-70} width={18} height={14} rx={3} fill={W.neonAmber} />
  </g>
);

export const Tree: React.FC<{ x: number; base: number; s?: number }> = ({ x, base, s = 1 }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    <rect x={-8} y={-160} width={16} height={160} fill="#4A3828" />
    <circle cx={0} cy={-200} r={70} fill="#4F6B3E" /><circle cx={-40} cy={-170} r={50} fill="#5A7A47" /><circle cx={44} cy={-176} r={52} fill="#46603A" />
  </g>
);

export const Lamp: React.FC<{ x: number; base: number; s?: number }> = ({ x, base, s = 1 }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    <rect x={-5} y={-300} width={10} height={300} fill="#2C3038" />
    <path d="M0 -300 q 40 -10 60 10" stroke="#2C3038" strokeWidth={8} fill="none" />
    <circle cx={60} cy={-284} r={12} fill={W.neonAmber} />
    <circle cx={60} cy={-284} r={60} fill={W.neonAmber} opacity={0.12} />
  </g>
);

export const Street: React.FC<{ walkY: number; roadY: number; w?: number; h?: number }> = ({ walkY, roadY, w = 1920, h = 1080 }) => (
  <g>
    <rect x={0} y={walkY} width={w} height={roadY - walkY} fill={W.walk} />
    {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={i * 90} y={walkY} width={3} height={roadY - walkY} fill={W.walkDk} />)}
    <rect x={0} y={roadY} width={w} height={14} fill="#B8B2A6" />
    <rect x={0} y={roadY + 14} width={w} height={h - roadY} fill={W.asphalt} />
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={i * 180 + 40} y={roadY + (h - roadY) / 2} width={90} height={10} fill="#E9D27A" opacity={0.85} />)}
  </g>
);

// Warm light wrap so the character sits IN the world (same light as the scene)
export const LightWrap: React.FC = () => (
  <g style={{ mixBlendMode: 'soft-light' as any }}>
    <rect width={1920} height={1080} fill="url(#lw)" />
    <defs><linearGradient id="lw" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#FFB36B" stopOpacity={0.6} /><stop offset="100%" stopColor="#2F4A6E" stopOpacity={0.5} /></linearGradient></defs>
  </g>
);
