import React from 'react';
import { HostPose } from './Host';

// MAIN CHARACTER v4 — "Jake", 26, average American guy. The viewer's stand-in: lives every money change on screen.
// Light-brown side-swept hair, light stubble, fair skin, blue eyes,
// navy overshirt over a white tee. Same pose interface as the old host (talk/blink/look/brow/smile/tilt/nod).

const K = {
  skin: '#E3B496', skinLit: '#F0C9AE', skinShade: '#C08F72', skinDeep: '#9C6E55',
  hair: '#6B4A2E', hairHi: '#98704A', stubble: '#9A7458',
  iris: '#4C7398', lid: '#4A3424', brow: '#5A3E27',
  shirt: '#1F2D44', shirtLit: '#2B3D5A', shirtDeep: '#16202F', tee: '#ECE8E0', lip: '#B87262',
};

export const GuyFigure: React.FC<{ p: HostPose; style?: React.CSSProperties; svgProps?: React.SVGProps<SVGSVGElement> }> = ({ p, style, svgProps }) => {
  const eyeScale = 1 - 0.92 * p.blink;
  const mouthH = 2 + p.talk * 24;
  const mouthW = 46 - p.talk * 8 + p.smile * 8;
  const lx = p.look * 6;
  const ly = (p.lookY ?? 0) * 4;
  const eye = (cx: number) => (
    <g transform={`translate(${cx} 326) scale(1 ${eyeScale})`}>
      <path d="M-27 0 C -15 -16, 15 -16, 27 0 C 15 11, -15 11, -27 0 Z" fill="#F2EDE5" />
      <clipPath id={`g${cx}`}><path d="M-27 0 C -15 -16, 15 -16, 27 0 C 15 11, -15 11, -27 0 Z" /></clipPath>
      <g clipPath={`url(#g${cx})`}>
        <circle cx={lx} cy={-1 + ly} r={11} fill={K.iris} />
        <circle cx={lx} cy={-1 + ly} r={5} fill="#0B0908" />
        <circle cx={lx - 3.5} cy={-5 + ly} r={2.6} fill="#fff" />
      </g>
      <path d="M-28 0 C -15 -17, 15 -17, 28 0" stroke={K.lid} strokeWidth={4.4} fill="none" strokeLinecap="round" />
      <path d="M-24 -10 C -12 -21, 12 -21, 24 -10" stroke={K.skinDeep} strokeWidth={1.4} fill="none" opacity={0.45} />
    </g>
  );
  return (
    <svg viewBox="0 0 600 760" style={style} {...svgProps}>
      <defs>
        <radialGradient id="gskin" cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor={K.skinLit} /><stop offset="60%" stopColor={K.skin} /><stop offset="100%" stopColor={K.skinShade} />
        </radialGradient>
        <linearGradient id="gshirt" x1="0" x2="1"><stop offset="0%" stopColor={K.shirtLit} /><stop offset="55%" stopColor={K.shirt} /><stop offset="100%" stopColor={K.shirtDeep} /></linearGradient>
      </defs>
      {/* shoulders: navy overshirt, white tee */}
      <path d="M30 760 C 40 650, 100 600, 200 585 L 400 585 C 500 600, 560 650, 570 760 Z" fill="url(#gshirt)" />
      <path d="M238 560 C 260 600, 340 600, 362 560 L 380 640 C 340 668, 260 668, 220 640 Z" fill={K.tee} />
      <path d="M200 588 L 250 572 L 300 680 L 236 760 Z" fill={K.shirtLit} />
      <path d="M400 588 L 350 572 L 300 680 L 364 760 Z" fill={K.shirtDeep} />
      <g transform={`translate(0 ${p.nod}) rotate(${p.tilt} 300 560)`}>
        <path d="M256 470 L 344 470 L 350 568 C 320 584, 280 584, 250 568 Z" fill={K.skinShade} />
        {/* ears */}
        <path d="M172 310 C 146 304, 144 370, 174 390 Z" fill={K.skin} />
        <path d="M428 310 C 454 304, 456 370, 426 390 Z" fill={K.skinShade} />
        {/* head: younger, fuller cheeks, defined jaw */}
        <path d="M300 168 C 386 168, 432 232, 432 328 C 432 420, 398 494, 340 516 C 322 524, 278 524, 260 516 C 202 494, 168 420, 168 328 C 168 232, 214 168, 300 168 Z" fill="url(#gskin)" />
        <path d="M352 182 C 408 205, 432 262, 432 328 C 432 420, 398 494, 340 516 C 366 470, 380 410, 380 328 C 380 260, 372 214, 352 182 Z" fill={K.skinShade} opacity={0.42} />
        {/* light stubble on the jaw */}
        <path d="M182 390 C 196 452, 236 506, 300 518 C 364 506, 404 452, 418 390 C 404 440, 372 470, 300 476 C 228 470, 196 440, 182 390 Z" fill={K.stubble} opacity={0.22} />
        <path d="M262 432 C 280 424, 320 424, 338 432 C 322 438, 278 438, 262 432 Z" fill={K.stubble} opacity={0.5} />
        {/* hair: textured top, faded sides */}
        <path d="M170 300 C 160 260, 168 238, 180 226 C 176 150, 240 110, 304 112 C 380 110, 436 160, 424 230 C 434 246, 438 270, 430 300 C 424 272, 412 252, 398 244 C 392 220, 380 212, 362 216 C 340 206, 314 212, 292 206 C 268 214, 236 210, 214 222 C 198 236, 184 262, 170 300 Z" fill={K.hair} />
        <path d="M192 196 C 220 150, 270 132, 320 134 M210 218 C 246 176, 300 160, 360 168 M300 140 C 350 140, 392 160, 410 196 M240 152 C 260 170, 270 186, 276 206" stroke={K.hairHi} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M172 300 C 170 330, 172 352, 178 368 L 188 300 Z" fill={K.hair} opacity={0.8} />
        <path d="M428 300 C 430 330, 428 352, 422 368 L 412 300 Z" fill={K.hair} opacity={0.8} />
        <path d="M196 214 C 240 168, 330 150, 412 206 C 360 184, 270 186, 196 214 Z" fill={K.hairHi} opacity={0.7} />
        {/* brows: thick, dark, expressive */}
        <g transform={`translate(0 ${-p.brow * 8})`}>
          <path d="M214 292 C 232 278, 262 276, 282 286 L 280 296 C 260 288, 234 290, 216 300 Z" fill={K.brow} />
          <path d="M386 292 C 368 278, 338 276, 318 286 L 320 296 C 340 288, 366 290, 384 300 Z" fill={K.brow} />
        </g>
        {eye(250)}{eye(350)}
        {/* nose */}
        <path d="M298 334 C 302 362, 312 386, 320 400 C 310 410, 294 410, 284 404" stroke={K.skinDeep} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} />
        <path d="M272 402 C 282 412, 302 414, 328 404 C 318 416, 290 420, 272 402 Z" fill={K.skinDeep} opacity={0.45} />
        {/* mouth */}
        <g transform={`translate(300 ${452 + p.talk * 3})`}>
          <ellipse cx={0} cy={mouthH / 2 - 2} rx={mouthW / 2} ry={mouthH / 2} fill="#2A1411" />
          {p.talk > 0.3 && <rect x={-mouthW / 2 + 6} y={-2} width={mouthW - 12} height={Math.min(8, mouthH / 3)} rx={3} fill="#F1ECE2" />}
          <path d={`M${-mouthW / 2 - 4} ${-1 - p.smile * 6} C -10 ${mouthH + 6}, 10 ${mouthH + 6}, ${mouthW / 2 + 4} ${-1 - p.smile * 8}`} stroke={K.lip} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
        {/* rim light */}
        <path d="M426 262 C 436 300, 436 380, 414 444" stroke="#A9BED2" strokeWidth={3.5} fill="none" opacity={0.5} strokeLinecap="round" />
      </g>
    </svg>
  );
};
