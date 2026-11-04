import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';

// THE AUDITOR — host v3.
// Recognisable face: silver swept-back hair, short grey beard, round gold glasses,
// oxblood scarf, charcoal overcoat with a raised collar. Light always from the left.
// Driven by numbers so it can lip-sync to the real voice later (talk = mouth openness 0..1).

export type HostPose = {
  talk: number;   // 0 closed .. 1 wide
  blink: number;  // 0 open .. 1 closed
  look: number;   // -1 left .. 1 right (pupils)
  brow: number;   // 0 neutral .. 1 raised
  smile: number;  // 0 .. 1 (knowing half-smile)
  tilt: number;   // head tilt in degrees
  nod: number;    // px vertical head offset
};

const K = {
  skin: '#C99C7C', skinLit: '#DDB596', skinShade: '#9A6F55', skinDeep: '#7E5844',
  hair: '#CFCBC3', hairShade: '#A29E96', beard: '#BCB7AE', beardShade: '#8F8A82',
  iris: '#40525F', lid: '#3A2A22', gold: '#C9A24A', goldHi: '#F0D489',
  coat: '#23262C', coatLit: '#30343C', coatDeep: '#18191D', scarf: '#7A2A25', scarfHi: '#94352E',
};

export const HostFigure: React.FC<{ p: HostPose; style?: React.CSSProperties }> = ({ p, style }) => {
  const eyeScale = 1 - 0.92 * p.blink;
  const mouthH = 3 + p.talk * 24;
  const mouthW = 50 - p.talk * 8 + p.smile * 6;
  const lx = p.look * 6;
  const eye = (cx: number) => (
    <g transform={`translate(${cx} 322) scale(1 ${eyeScale})`}>
      <path d="M-28 0 C -16 -15, 16 -15, 28 0 C 16 10, -16 10, -28 0 Z" fill="#EEE6DA" />
      <clipPath id={`e${cx}`}><path d="M-28 0 C -16 -15, 16 -15, 28 0 C 16 10, -16 10, -28 0 Z" /></clipPath>
      <g clipPath={`url(#e${cx})`}>
        <circle cx={lx} cy={-1} r={10.5} fill={K.iris} />
        <circle cx={lx} cy={-1} r={4.6} fill="#0D0D0F" />
        <circle cx={lx - 3.5} cy={-4.5} r={2.2} fill="#fff" opacity={0.9} />
        <path d="M-30 -16 L 30 -16 L 30 -2 C 14 -7, -14 -7, -30 -2 Z" fill={K.skin} />
      </g>
      <path d="M-29 0 C -16 -8, 16 -8, 29 0" stroke={K.lid} strokeWidth={4.2} fill="none" strokeLinecap="round" />
      <path d="M-26 -12 C -12 -20, 12 -20, 26 -12" stroke={K.skinDeep} strokeWidth={1.6} fill="none" opacity={0.55} />
      <path d="M-20 12 C -8 18, 8 18, 20 12" stroke={K.skinDeep} strokeWidth={1.2} fill="none" opacity={0.4} />
      <path d="M-22 7 C -10 12, 10 12, 22 7" stroke={K.skinDeep} strokeWidth={1.4} fill="none" opacity={0.6} />
    </g>
  );
  return (
    <svg viewBox="0 0 600 760" style={style}>
      <defs>
        <radialGradient id="skin" cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor={K.skinLit} />
          <stop offset="60%" stopColor={K.skin} />
          <stop offset="100%" stopColor={K.skinShade} />
        </radialGradient>
        <linearGradient id="coat" x1="0" x2="1">
          <stop offset="0%" stopColor={K.coatLit} /><stop offset="55%" stopColor={K.coat} /><stop offset="100%" stopColor={K.coatDeep} />
        </linearGradient>
        <linearGradient id="lens" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity={0.16} /><stop offset="45%" stopColor="#fff" stopOpacity={0.02} /><stop offset="100%" stopColor="#fff" stopOpacity={0.08} />
        </linearGradient>
      </defs>

      {/* body: coat + raised collar + scarf */}
      <path d="M20 760 C 30 650, 90 600, 190 580 L 410 580 C 510 600, 570 650, 580 760 Z" fill="url(#coat)" />
      <path d="M300 600 L 300 760" stroke={K.coatDeep} strokeWidth={5} />
      <path d="M196 600 L 150 470 C 190 500, 220 520, 250 535 L 300 650 Z" fill={K.coatLit} />
      <path d="M404 600 L 450 470 C 410 500, 380 520, 350 535 L 300 650 Z" fill={K.coatDeep} />
      <path d="M150 470 C 190 500, 220 520, 250 535" stroke="#4E5460" strokeWidth={2.5} fill="none" />
      <path d="M232 540 C 260 585, 340 585, 368 540 L 372 600 C 340 630, 260 630, 228 600 Z" fill={K.scarf} />
      <path d="M240 560 C 270 590, 330 590, 360 560" stroke={K.scarfHi} strokeWidth={6} fill="none" opacity={0.7} />

      <g transform={`translate(0 ${p.nod}) rotate(${p.tilt} 300 560)`}>
        {/* neck */}
        <path d="M252 470 L 348 470 L 352 560 C 320 575, 280 575, 248 560 Z" fill={K.skinShade} />
        {/* ears */}
        <path d="M168 300 C 140 295, 138 360, 168 382 Z" fill={K.skin} />
        <path d="M432 300 C 460 295, 462 360, 432 382 Z" fill={K.skinShade} />
        {/* head */}
        <path d="M300 168 C 388 168, 436 232, 436 330 C 436 430, 388 512, 300 522 C 212 512, 164 430, 164 330 C 164 232, 212 168, 300 168 Z" fill="url(#skin)" />
        <path d="M352 182 C 410 205, 436 262, 436 330 C 436 430, 388 512, 300 522 C 350 490, 380 420, 380 330 C 380 260, 372 215, 352 182 Z" fill={K.skinShade} opacity={0.45} />
        {/* forehead lines (age, wisdom) */}
        <path d="M245 238 C 280 230, 320 230, 355 238" stroke={K.skinDeep} strokeWidth={1.6} fill="none" opacity={0.45} />
        <path d="M255 252 C 285 246, 315 246, 345 252" stroke={K.skinDeep} strokeWidth={1.4} fill="none" opacity={0.35} />
        {/* hair: silver, swept back, receding */}
        <path d="M160 310 C 140 200, 205 112, 305 108 C 410 110, 465 195, 440 310 C 436 280, 428 258, 414 246 C 400 232, 392 212, 372 206 C 350 200, 330 210, 305 202 C 280 210, 258 200, 236 206 C 214 212, 204 232, 188 246 C 174 258, 164 282, 160 310 Z" fill={K.hair} />
        <path d="M186 196 C 226 112, 344 88, 426 156 C 362 122, 262 128, 186 196 Z" fill="#E6E3DC" />
        <path d="M196 200 C 240 150, 310 138, 372 158 M212 220 C 256 180, 326 168, 398 190 M186 252 C 205 210, 245 188, 292 184 M330 186 C 370 186, 405 200, 425 232" stroke={K.hairShade} strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d="M168 300 C 166 335, 170 360, 176 372 L 186 300 Z" fill={K.hairShade} />
        <path d="M432 300 C 434 335, 430 360, 424 372 L 414 300 Z" fill={K.hairShade} />
        {/* brows */}
        <g transform={`translate(0 ${-p.brow * 7})`}>
          <path d="M210 286 C 228 272, 258 270, 280 280 L 278 288 C 258 281, 230 283, 212 294 Z" fill="#8C877F" />
          <path d="M390 286 C 372 272, 342 270, 320 280 L 322 288 C 342 281, 370 283, 388 294 Z" fill="#8C877F" />
        </g>
        {eye(248)}{eye(352)}
        {/* crow's feet */}
        <path d="M282 330 m 0 0 M206 320 l -12 -6 M206 328 l -13 2 M394 320 l 12 -6 M394 328 l 13 2" stroke={K.skinDeep} strokeWidth={1.5} opacity={0.5} />
        {/* nose */}
        <path d="M296 330 C 300 360, 312 385, 322 400 C 312 410, 296 410, 286 404" stroke={K.skinDeep} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.75} />
        <path d="M270 402 C 280 414, 300 416, 330 404 C 320 418, 290 422, 270 402 Z" fill={K.skinDeep} opacity={0.5} />
        {/* beard (short, trimmed) */}
        <path d="M176 380 C 182 450, 230 512, 300 524 C 370 512, 418 450, 424 380 C 410 430, 384 456, 350 462 C 335 486, 265 486, 250 462 C 216 456, 190 430, 176 380 Z" fill={K.beard} />
        <path d="M200 430 C 220 470, 255 498, 300 506 M400 430 C 380 470, 345 498, 300 506 M240 488 l 6 14 M300 500 l 0 16 M360 488 l -6 14" stroke={K.beardShade} strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8} />
        {/* mouth */}
        <g transform={`translate(300 ${452 + p.talk * 4})`}>
          <ellipse cx={0} cy={mouthH / 2 - 2} rx={mouthW / 2} ry={mouthH / 2} fill="#2A1513" />
          {p.talk > 0.3 && <rect x={-mouthW / 2 + 6} y={-2} width={mouthW - 12} height={Math.min(7, mouthH / 3)} rx={3} fill="#E6DED0" />}
          <path d={`M${-mouthW / 2 - 4} ${-1 - p.smile * 5} C -10 ${mouthH + 6}, 10 ${mouthH + 6}, ${mouthW / 2 + 4} ${-1 - p.smile * 7}`} stroke="#A2685A" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        {/* moustache */}
        <path d="M244 446 C 262 426, 290 428, 300 438 C 310 428, 338 426, 356 446 C 340 452, 320 450, 300 446 C 280 450, 260 452, 244 446 Z" fill={K.beard} />
        <path d="M252 444 C 268 434, 288 434, 298 442 M348 444 C 332 434, 312 434, 302 442" stroke={K.beardShade} strokeWidth={2} fill="none" />
        {/* cool rim light, right side: cinematic two-light look */}
        <path d="M430 262 C 440 300, 440 380, 418 444" stroke="#A9BED2" strokeWidth={3.5} fill="none" opacity={0.55} strokeLinecap="round" />
        {/* glasses */}
        <g stroke={K.gold} fill="url(#lens)" strokeWidth={4.5}>
          <circle cx={248} cy={322} r={40} /><circle cx={352} cy={322} r={40} />
        </g>
        <path d="M288 318 C 294 308, 306 308, 312 318" stroke={K.gold} strokeWidth={4} fill="none" />
        <path d="M208 316 L 168 306 M392 316 L 432 306" stroke={K.gold} strokeWidth={3.5} />
        <path d="M222 296 L 236 290 M326 296 L 340 290" stroke={K.goldHi} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
      </g>
      {/* collar front layer so it frames the jaw */}
      <path d="M196 600 L 160 488 C 196 514, 222 530, 250 540 L 262 600 Z" fill={K.coatLit} opacity={0.96} />
      <path d="M404 600 L 440 488 C 404 514, 378 530, 350 540 L 338 600 Z" fill={K.coatDeep} opacity={0.96} />
    </svg>
  );
};

// Natural, never-frozen idle: breathing, micro head motion, random blinks, pseudo-speech.
export const Host: React.FC<{ speaking?: boolean; seed?: string; look?: number; style?: React.CSSProperties; brow?: number; smile?: number }> = ({ speaking = true, seed = 'a', look = 0, style, brow = 0, smile = 0.25 }) => {
  const f = useCurrentFrame();
  const n = (s: string, x: number) => noise2D(seed + s, x, 0);
  const blinkPhase = f % 97;
  const blink = blinkPhase < 4 ? [0.3, 1, 1, 0.3][blinkPhase] : 0;
  const syll = speaking ? Math.max(0, n('t', f / 3.2) * 0.9 + n('u', f / 11) * 0.5) : 0;
  const talk = Math.min(1, speaking && n('pause', f / 40) > -0.45 ? syll : 0);
  return (
    <HostFigure
      style={style}
      p={{
        talk,
        blink,
        look: look + n('l', f / 60) * 0.25,
        brow: Math.max(0, brow + n('b', f / 25) * 0.35),
        smile,
        tilt: n('r', f / 70) * 2.2,
        nod: interpolate(Math.sin(f / 22), [-1, 1], [-2, 2]) + n('n', f / 9) * (speaking ? 2 : 0.5),
      }}
    />
  );
};
