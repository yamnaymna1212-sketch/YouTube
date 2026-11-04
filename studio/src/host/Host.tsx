import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';

// THE AUDITOR — host v4 (replaces the 60-year-old v3).
// A man around 30 (25–35): dark brown hair, short sides, textured top pushed to one side;
// light designer stubble; thick dark brows; brown eyes; no glasses.
// Wardrobe: washed-navy chore jacket open over a heather-grey crew-neck tee — someone
// who looks like the viewer, not a professor. Light always from the left, cool rim from the right.
// Same pose API as v3, so every scene and the later lip-sync keep working.

export type HostPose = {
  talk: number;   // 0 closed .. 1 wide
  blink: number;  // 0 open .. 1 closed
  look: number;   // -1 left .. 1 right (pupils)
  brow: number;   // 0 neutral .. 1 raised
  smile: number;  // 0 .. 1 (half-smile)
  tilt: number;   // head tilt in degrees
  nod: number;    // px vertical head offset
};

const K = {
  skin: '#C99A78', skinLit: '#E0B694', skinShade: '#A77A5C', skinDeep: '#86604A',
  hair: '#2B211C', hairLit: '#4A3A30', hairShade: '#1A1411', stubble: '#3A2C24',
  iris: '#5A3E2B', lid: '#3A2620', brow: '#2A1F1A', lip: '#A86A5C', lipDark: '#7E4A40',
  jacket: '#2D3A48', jacketLit: '#3C4C5E', jacketDeep: '#1E2731', stitch: '#5D6E80',
  tee: '#8C9097', teeShade: '#6E7279',
};

export const HostFigure: React.FC<{ p: HostPose; style?: React.CSSProperties }> = ({ p, style }) => {
  const eyeScale = 1 - 0.92 * p.blink;
  const mouthH = 2 + p.talk * 22;
  const mouthW = 46 - p.talk * 8 + p.smile * 6;
  const lx = p.look * 6;
  const eye = (cx: number) => (
    <g transform={`translate(${cx} 326) scale(1 ${eyeScale})`}>
      <path d="M-27 0 C -15 -16, 15 -16, 27 0 C 15 11, -15 11, -27 0 Z" fill="#F1EBE2" />
      <clipPath id={`e${cx}`}><path d="M-27 0 C -15 -16, 15 -16, 27 0 C 15 11, -15 11, -27 0 Z" /></clipPath>
      <g clipPath={`url(#e${cx})`}>
        <circle cx={lx} cy={-1} r={11} fill={K.iris} />
        <circle cx={lx} cy={-1} r={11} fill="none" stroke="#2E1F15" strokeWidth={1.6} />
        <circle cx={lx} cy={-1} r={4.8} fill="#0D0B0A" />
        <circle cx={lx - 3.5} cy={-4.5} r={2.4} fill="#fff" opacity={0.92} />
        {/* upper lid shadow only — young eyes, not hooded */}
        <path d="M-30 -17 L 30 -17 L 30 -9 C 14 -13, -14 -13, -30 -9 Z" fill={K.skin} />
      </g>
      <path d="M-28 0 C -16 -15, 16 -15, 28 0" stroke={K.lid} strokeWidth={3.8} fill="none" strokeLinecap="round" />
      <path d="M-24 -18 C -10 -25, 10 -25, 24 -18" stroke={K.skinDeep} strokeWidth={1.4} fill="none" opacity={0.4} />
      <path d="M-20 9 C -8 13, 8 13, 20 9" stroke={K.skinDeep} strokeWidth={1.1} fill="none" opacity={0.35} />
    </g>
  );
  const shut = (cx: number) => p.blink > 0.6 && (
    <path d={`M${cx - 27} 325 C ${cx - 12} 333, ${cx + 12} 333, ${cx + 27} 325`} stroke={K.lid} strokeWidth={3.6} fill="none" strokeLinecap="round" />
  );
  return (
    <svg viewBox="0 0 600 760" style={style}>
      <defs>
        <radialGradient id="skin4" cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor={K.skinLit} />
          <stop offset="60%" stopColor={K.skin} />
          <stop offset="100%" stopColor={K.skinShade} />
        </radialGradient>
        <linearGradient id="jacket4" x1="0" x2="1">
          <stop offset="0%" stopColor={K.jacketLit} /><stop offset="55%" stopColor={K.jacket} /><stop offset="100%" stopColor={K.jacketDeep} />
        </linearGradient>
        <linearGradient id="hair4" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={K.hairLit} /><stop offset="50%" stopColor={K.hair} /><stop offset="100%" stopColor={K.hairShade} />
        </linearGradient>
        <radialGradient id="stubble4" cx="50%" cy="30%" r="75%">
          <stop offset="55%" stopColor={K.stubble} stopOpacity={0.12} />
          <stop offset="100%" stopColor={K.stubble} stopOpacity={0.34} />
        </radialGradient>
      </defs>

      {/* body: grey tee + open navy chore jacket */}
      <path d="M24 760 C 34 652, 96 604, 196 586 L 404 586 C 504 604, 566 652, 576 760 Z" fill="url(#jacket4)" />
      <path d="M232 586 L 368 586 L 346 760 L 254 760 Z" fill={K.tee} />
      <path d="M300 640 L 300 760" stroke={K.teeShade} strokeWidth={2} opacity={0.35} />
      <path d="M240 560 C 262 600, 338 600, 360 560 L 366 586 C 340 618, 260 618, 234 586 Z" fill={K.teeShade} />
      <path d="M246 566 C 268 598, 332 598, 354 566" stroke="#A3A7AD" strokeWidth={4} fill="none" opacity={0.55} />
      {/* jacket lapels (soft collar, folded down) */}
      <path d="M198 590 L 230 586 L 262 700 L 254 760 L 210 760 C 214 700, 206 640, 198 590 Z" fill={K.jacketLit} />
      <path d="M402 590 L 370 586 L 338 700 L 346 760 L 390 760 C 386 700, 394 640, 402 590 Z" fill={K.jacketDeep} />
      <path d="M232 588 L 262 700 M368 588 L 338 700" stroke={K.stitch} strokeWidth={1.8} strokeDasharray="5 5" opacity={0.6} />
      <path d="M150 660 C 160 700, 165 730, 168 760 M450 660 C 440 700, 435 730, 432 760" stroke={K.jacketDeep} strokeWidth={3} fill="none" opacity={0.7} />
      {/* chest pocket */}
      <path d="M408 650 L 470 646 L 474 700 L 412 704 Z" fill="none" stroke={K.stitch} strokeWidth={1.6} strokeDasharray="5 5" opacity={0.5} />

      <g transform={`translate(0 ${p.nod}) rotate(${p.tilt} 300 560)`}>
        {/* neck — longer, leaner */}
        <path d="M256 470 L 344 470 L 350 572 C 320 590, 280 590, 250 572 Z" fill={K.skinShade} />
        <path d="M262 520 C 290 540, 312 540, 338 520" stroke={K.skinDeep} strokeWidth={2} fill="none" opacity={0.35} />
        {/* ears */}
        <path d="M172 302 C 144 296, 142 362, 172 384 Z" fill={K.skin} />
        <path d="M428 302 C 456 296, 458 362, 428 384 Z" fill={K.skinShade} />
        <path d="M166 320 C 156 330, 158 352, 168 362" stroke={K.skinDeep} strokeWidth={2} fill="none" opacity={0.5} />
        {/* head — leaner cheeks, defined jaw and chin */}
        <path d="M300 170 C 386 170, 432 232, 432 326 C 432 400, 412 450, 378 482 C 352 506, 330 518, 300 520 C 270 518, 248 506, 222 482 C 188 450, 168 400, 168 326 C 168 232, 214 170, 300 170 Z" fill="url(#skin4)" />
        <path d="M352 184 C 408 206, 432 262, 432 326 C 432 400, 412 450, 378 482 C 352 506, 330 518, 300 520 C 342 494, 376 430, 378 330 C 380 262, 372 216, 352 184 Z" fill={K.skinShade} opacity={0.42} />
        {/* stubble: short, even, follows the jaw (no moustache block) */}
        <path d="M176 372 C 184 432, 214 474, 250 500 C 270 514, 286 520, 300 520 C 314 520, 330 514, 350 500 C 386 474, 416 432, 424 372 C 414 420, 392 446, 362 456 C 346 444, 322 438, 300 440 C 278 438, 254 444, 238 456 C 208 446, 186 420, 176 372 Z" fill="url(#stubble4)" />
        <path d="M256 432 C 272 424, 290 424, 300 428 C 310 424, 328 424, 344 432 C 334 438, 316 438, 300 436 C 284 438, 266 438, 256 432 Z" fill={K.stubble} opacity={0.22} />
        <path d="M282 496 C 292 500, 308 500, 318 496" stroke={K.stubble} strokeWidth={6} opacity={0.12} strokeLinecap="round" />
        {/* hair: full hairline, short tapered sides, textured top pushed to his left */}
        <path d="M166 318 C 152 240, 176 168, 236 136 C 268 118, 318 112, 360 124 C 420 142, 452 200, 436 318 C 430 286, 422 264, 408 248 C 400 232, 392 222, 380 214 C 350 222, 300 222, 252 214 C 230 212, 210 224, 198 244 C 186 262, 176 286, 168 318 Z" fill="url(#hair4)" />
        <path d="M180 234 C 190 170, 250 112, 336 108 C 404 106, 444 150, 446 200 C 430 168, 400 150, 370 146 C 392 162, 404 184, 408 212 C 380 186, 330 172, 276 176 C 240 180, 206 200, 180 234 Z" fill={K.hair} />
        <path d="M206 206 C 246 160, 306 140, 366 150 M222 222 C 262 186, 322 172, 384 184 M250 160 C 290 130, 350 126, 400 146 M300 128 C 336 118, 380 124, 420 156" stroke={K.hairLit} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.85} />
        <path d="M232 214 C 262 196, 300 192, 330 200" stroke={K.hairShade} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.7} />
        {/* sideburns: short, tapered, in front of the ears */}
        <path d="M168 262 C 168 290, 172 318, 178 342 L 190 338 C 186 314, 186 288, 192 258 Z" fill={K.hair} opacity={0.9} />
        <path d="M432 262 C 432 290, 428 318, 422 342 L 410 338 C 414 314, 414 288, 408 258 Z" fill={K.hairShade} opacity={0.9} />
        {/* brows — thick, dark, straight */}
        <g transform={`translate(0 ${-p.brow * 8})`}>
          <path d="M212 290 C 228 276, 258 272, 282 280 L 281 291 C 258 285, 232 287, 214 298 Z" fill={K.brow} />
          <path d="M388 290 C 372 276, 342 272, 318 280 L 319 291 C 342 285, 368 287, 386 298 Z" fill={K.brow} />
        </g>
        {eye(250)}{eye(350)}{shut(250)}{shut(350)}
        {/* nose — straighter, cleaner */}
        <path d="M298 330 C 300 358, 308 380, 318 396 C 310 406, 296 406, 286 400" stroke={K.skinDeep} strokeWidth={2.8} fill="none" strokeLinecap="round" opacity={0.7} />
        <path d="M274 398 C 284 408, 302 410, 326 400 C 316 412, 290 414, 274 398 Z" fill={K.skinDeep} opacity={0.42} />
        {/* cheek light */}
        <ellipse cx={232} cy={384} rx={34} ry={20} fill="#F0C6A4" opacity={0.07} />
        {/* mouth: visible lips, no moustache */}
        <g transform={`translate(300 ${452 + p.talk * 4})`}>
          <ellipse cx={0} cy={mouthH / 2 - 2} rx={mouthW / 2} ry={mouthH / 2} fill="#2A1513" />
          {p.talk > 0.3 && <rect x={-mouthW / 2 + 6} y={-2} width={mouthW - 12} height={Math.min(7, mouthH / 3)} rx={3} fill="#EDE6DA" />}
          <path d={`M${-mouthW / 2 - 2} ${-1 - p.smile * 4} C -14 -8, -4 -5, 0 -4 C 4 -5, 14 -8, ${mouthW / 2 + 2} ${-1 - p.smile * 6}`} stroke={K.lipDark} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d={`M${-mouthW / 2 + 4} ${mouthH - 1} C -10 ${mouthH + 9}, 10 ${mouthH + 9}, ${mouthW / 2 - 4} ${mouthH - 1}`} stroke={K.lip} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.75} />
          <path d={`M${mouthW / 2 + 2} ${-1 - p.smile * 6} l 5 ${-2 - p.smile * 3}`} stroke={K.skinDeep} strokeWidth={2} strokeLinecap="round" opacity={0.3 + p.smile * 0.4} />
        </g>
        {/* chin shadow */}
        <path d="M280 488 C 292 494, 308 494, 320 488" stroke={K.skinDeep} strokeWidth={2} fill="none" opacity={0.35} />
        {/* cool rim: soft edge wash instead of a hard line */}
        <path d="M432 326 C 432 400, 412 450, 378 482 C 400 440, 414 390, 416 330 C 418 280, 410 240, 396 214 C 420 240, 432 280, 432 326 Z" fill="#A9BED2" opacity={0.22} />
              </g>
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
