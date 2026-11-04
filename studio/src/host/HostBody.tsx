import React from 'react';
import { useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';
import { HeadGroup, HostDefs, HostPose, K } from './Host';

// THE AUDITOR — full-body rig (v4).
// Same head as the bust, on a jointed body: shoulders, elbows, wrists, hips, knees, feet.
// Forward kinematics only: every limb is an angle, so any pose or walk cycle is just numbers.
// Angles are degrees from "hanging straight down"; positive = away from the body's centre line.

export type Arm = { sh: number; el: number; fore?: number; hand?: 'open' | 'point' | 'fist' };
export type Leg = { hip: number; knee: number; lift: number };
export type BodyPose = {
  face: HostPose;
  armL: Arm; armR: Arm;   // L = screen left
  legL: Leg; legR: Leg;
  rootX: number; rootY: number; lean: number; shrug: number; breath: number;
};

const P = {
  pants: '#2F333A', pantsLit: '#3C414A', pantsDeep: '#23262C',
  shoe: '#E7E3DB', shoeShade: '#C9C4BA', sole: '#9E988D',
  hand: '#C99A78', handShade: '#A77A5C',
};
const UPPER = 215, FORE = 190, THIGH = 290, SHIN = 290;
const rad = (d: number) => (d * Math.PI) / 180;
const dir = (side: number, deg: number): [number, number] => [side * Math.sin(rad(deg)), Math.cos(rad(deg))];
const rotFor = (dx: number, dy: number) => (Math.atan2(-dx, dy) * 180) / Math.PI;

// Tapered capsule with a cheap two-tone shade (light from the left).
const Seg: React.FC<{ a: [number, number]; b: [number, number]; wa: number; wb: number; fill: string; shade: string }> = ({ a, b, wa, wb, fill, shade }) => {
  const cap = (w: number, dx: number, col: string) => {
    const vx = b[0] - a[0], vy = b[1] - a[1]; const L = Math.hypot(vx, vy) || 1;
    const nx = -vy / L, ny = vx / L; const ra = (w * wa) / 2, rb = (w * wb) / 2;
    const A = [a[0] + dx, a[1]], B = [b[0] + dx, b[1]];
    return (
      <g fill={col}>
        <path d={`M${A[0] + nx * ra} ${A[1] + ny * ra} L ${B[0] + nx * rb} ${B[1] + ny * rb} L ${B[0] - nx * rb} ${B[1] - ny * rb} L ${A[0] - nx * ra} ${A[1] - ny * ra} Z`} />
        <circle cx={A[0]} cy={A[1]} r={ra} /><circle cx={B[0]} cy={B[1]} r={rb} />
      </g>
    );
  };
  return <g>{cap(1, 0, shade)}{cap(0.78, -wa * 0.09, fill)}</g>;
};

const Hand: React.FC<{ at: [number, number]; d: [number, number]; kind: Arm['hand']; side: number }> = ({ at, d, kind = 'open', side }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(${rotFor(d[0], d[1])}) scale(1.45)`}>
    {kind === 'point' && <rect x={-6} y={18} width={13} height={50} rx={6.5} fill={P.hand} />}
    {kind === 'open' && [-12, -4, 4, 12].map((x, i) => <rect key={i} x={x - 4.5} y={22} width={9} height={i === 0 || i === 3 ? 26 : 32} rx={4.5} fill={i > 1 ? P.handShade : P.hand} />)}
    <ellipse cx={0} cy={18} rx={kind === 'fist' ? 20 : 19} ry={kind === 'fist' ? 20 : 24} fill={P.hand} />
    <ellipse cx={side * -16} cy={14} rx={7} ry={15} transform={`rotate(${side * 28} ${side * -16} 14)`} fill={P.handShade} />
  </g>
);

const ArmRig: React.FC<{ s: [number, number]; arm: Arm; side: number }> = ({ s, arm, side }) => {
  const du = dir(side, arm.sh);
  const e: [number, number] = [s[0] + du[0] * UPPER, s[1] + du[1] * UPPER];
  const df = dir(side, arm.sh + arm.el);
  const fl = FORE * (arm.fore ?? 1);
  const w: [number, number] = [e[0] + df[0] * fl, e[1] + df[1] * fl];
  return (
    <g>
      <Seg a={s} b={e} wa={66} wb={58} fill={K.jacketLit} shade={K.jacketDeep} />
      <Seg a={e} b={w} wa={58} wb={50} fill={K.jacket} shade={K.jacketDeep} />
      <circle cx={w[0]} cy={w[1]} r={24} fill={K.jacketDeep} />
      <Hand at={[w[0] + df[0] * 2, w[1] + df[1] * 2]} d={df} kind={arm.hand} side={side} />
    </g>
  );
};

const LegRig: React.FC<{ h: [number, number]; leg: Leg; side: number }> = ({ h, leg, side }) => {
  // front view: a lifted leg comes toward camera, so the thigh foreshortens and the foot rises
  const dt = dir(side, leg.hip);
  const tl = THIGH * (1 - 0.24 * leg.lift);
  const k: [number, number] = [h[0] + dt[0] * tl, h[1] + dt[1] * tl];
  const ds = dir(side, leg.hip + leg.knee);
  const a: [number, number] = [k[0] + ds[0] * SHIN, k[1] + ds[1] * SHIN];
  const sc = 1 + 0.1 * leg.lift;
  return (
    <g>
      <Seg a={h} b={k} wa={96} wb={78} fill={P.pantsLit} shade={P.pantsDeep} />
      <Seg a={k} b={a} wa={78} wb={64} fill={P.pants} shade={P.pantsDeep} />
      <g transform={`translate(${a[0] + side * 4} ${a[1] + 18}) scale(${sc * 1.4} ${sc * 1.3})`}>
        <path d="M-40 6 C -40 -14, -22 -24, 0 -24 C 22 -24, 40 -14, 40 6 C 40 18, 30 24, 0 24 C -30 24, -40 18, -40 6 Z" fill={P.shoe} />
        <path d="M6 -22 C 26 -20, 40 -10, 40 6 C 40 18, 30 24, 6 24 Z" fill={P.shoeShade} />
        <path d="M-40 12 C -36 24, 36 24, 40 12 L 40 18 C 34 30, -34 30, -40 18 Z" fill={P.sole} />
        <path d="M-14 -16 L 14 -16 M-16 -8 L 16 -8" stroke={P.sole} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
      </g>
    </g>
  );
};

export const HostBodyFigure: React.FC<{ b: BodyPose; style?: React.CSSProperties }> = ({ b, style }) => {
  const sy = 336 - b.shrug * 16 + b.breath * 2;
  return (
    <svg viewBox="-100 0 800 1430" style={{ overflow: 'visible', ...style }}>
      <HostDefs />
      {/* contact shadow */}
      <ellipse cx={300 + b.rootX * 0.5} cy={1404} rx={190} ry={16} fill="#000" opacity={0.35} />
      <g transform={`translate(${b.rootX} ${b.rootY})`}>
        <LegRig h={[252, 760]} leg={b.legL} side={-1} />
        <LegRig h={[348, 760]} leg={b.legR} side={1} />
        {/* pelvis / belt */}
        <path d="M194 700 L 406 700 L 412 790 C 360 806, 240 806, 188 790 Z" fill={P.pants} />
        <path d="M194 712 L 406 712" stroke="#1B1D21" strokeWidth={10} />
        <g transform={`rotate(${b.lean} 300 740)`}>
          {/* torso: jacket open over grey tee */}
          <g transform={`translate(0 ${740 * -b.breath * 0.006}) scale(1 ${1 + b.breath * 0.006})`}>
            <path d={`M164 ${sy} C 170 ${sy - 22}, 204 ${sy - 34}, 250 302 L 350 302 C 396 ${sy - 34}, 430 ${sy - 22}, 436 ${sy} L 424 520 C 418 610, 414 690, 412 760 L 188 760 C 186 690, 182 610, 176 520 Z`} fill="url(#jacket4)" />
            <path d="M262 304 L 338 304 L 332 760 L 268 760 Z" fill={K.tee} />
            <path d="M256 296 C 270 320, 330 320, 344 296 L 346 308 C 330 334, 270 334, 254 308 Z" fill={K.teeShade} />
            <path d="M250 302 L 268 304 L 288 520 L 276 760 L 236 760 C 238 620, 242 440, 250 302 Z" fill={K.jacketLit} />
            <path d="M350 302 L 332 304 L 312 520 L 324 760 L 364 760 C 362 620, 358 440, 350 302 Z" fill={K.jacketDeep} />
            <path d="M268 306 L 288 520 M332 306 L 312 520" stroke={K.stitch} strokeWidth={2} strokeDasharray="6 6" opacity={0.55} />
            <path d="M200 600 L 250 598 L 252 668 L 204 670 Z M350 598 L 400 600 L 396 670 L 348 668 Z" fill="none" stroke={K.stitch} strokeWidth={2} strokeDasharray="6 6" opacity={0.45} />
            <path d="M378 420 L 412 418 L 410 456 L 378 458 Z" fill="none" stroke={K.stitch} strokeWidth={1.8} strokeDasharray="5 5" opacity={0.45} />
          </g>
          {/* head on the neck, head space 600x760 → scale .5, neck base lands at y≈300 */}
          <g transform={`translate(138 ${16 - b.shrug * 10}) scale(0.54)`}>
            <HeadGroup p={b.face} />
          </g>
          <ArmRig s={[198, sy + 4]} arm={b.armL} side={-1} />
          <ArmRig s={[402, sy + 4]} arm={b.armR} side={1} />
        </g>
      </g>
    </svg>
  );
};

// ---------- pose library ----------
export const FACE: HostPose = { talk: 0, blink: 0, look: 0, brow: 0, smile: 0.25, tilt: 0, nod: 0, lookY: 0 };
const still = (o: Partial<BodyPose> & { face?: Partial<HostPose> }): BodyPose => ({
  armL: { sh: 7, el: -6, hand: 'open' }, armR: { sh: 7, el: -6, hand: 'open' },
  legL: { hip: 3, knee: -2, lift: 0 }, legR: { hip: 3, knee: -2, lift: 0 },
  rootX: 0, rootY: 0, lean: 0, shrug: 0, breath: 0,
  ...o, face: { ...FACE, ...(o.face ?? {}) },
});
export const POSES = {
  idle: still({}),
  explain: still({ armL: { sh: 12, el: -150, fore: 0.62, hand: 'open' }, armR: { sh: 16, el: -138, fore: 0.6, hand: 'open' }, face: { talk: 0.6, brow: 0.3 } }),
  point: still({ armR: { sh: 78, el: -4, hand: 'point' }, lean: 2, face: { look: 1, tilt: 3, brow: 0.5 } }),
  shrug: still({ armL: { sh: 26, el: 78, hand: 'open' }, armR: { sh: 26, el: 78, hand: 'open' }, shrug: 1, face: { brow: 1, smile: 0.7, tilt: -4 } }),
  hips: still({ armL: { sh: 36, el: -82, hand: 'fist' }, armR: { sh: 36, el: -82, hand: 'fist' }, legL: { hip: 6, knee: -2, lift: 0 }, legR: { hip: 6, knee: -2, lift: 0 }, face: { smile: 0.5 } }),
};

// One walk cycle, phase 0..1. Body is highest when the stance leg is straight under it.
export const walkPose = (ph: number, face: Partial<HostPose> = {}): BodyPose => {
  const s = Math.sin(ph * Math.PI * 2);
  const lL = Math.max(0, s), lR = Math.max(0, -s);
  return still({
    legL: { hip: 3 + lL * 4, knee: -2 - lL * 6, lift: lL },
    legR: { hip: 3 + lR * 4, knee: -2 - lR * 6, lift: lR },
    armL: { sh: 8 + lR * 4, el: -10 - lR * 34, hand: 'open' },
    armR: { sh: 8 + lL * 4, el: -10 - lL * 34, hand: 'open' },
    rootX: s * 7, rootY: -Math.abs(s) * 12, lean: -s * 1.6,
    face: { tilt: -s * 1.5, nod: Math.abs(s) * 2, ...face },
  });
};

// Eyes that move on their own: hold a target, snap to the next (saccade), tiny drift between.
export const eyeTrack = (f: number, seed: string, hold = 42) => {
  const k = Math.floor(f / hold);
  const t = Math.min(1, (f - k * hold) / 4);
  const e = 1 - (1 - t) * (1 - t);
  const tx = (i: number) => noise2D(seed + 'ex', i, 0) * 0.9;
  const ty = (i: number) => noise2D(seed + 'ey', i, 0) * 0.55;
  return {
    look: tx(k - 1) + (tx(k) - tx(k - 1)) * e + noise2D(seed + 'dx', f / 20, 0) * 0.05,
    lookY: ty(k - 1) + (ty(k) - ty(k - 1)) * e,
  };
};

// Animated full-body host. Not rendered anywhere yet (stills only until a video is requested).
export const HostFull: React.FC<{ action?: 'idle' | 'walk' | keyof typeof POSES; speaking?: boolean; seed?: string; style?: React.CSSProperties; cycle?: number }> = ({ action = 'idle', speaking = false, seed = 'body', style, cycle = 34 }) => {
  const f = useCurrentFrame();
  const n = (s: string, x: number) => noise2D(seed + s, x, 0);
  const bp = f % 97; const blink = bp < 4 ? [0.3, 1, 1, 0.3][bp] : 0;
  const talk = speaking && n('p', f / 40) > -0.45 ? Math.min(1, Math.max(0, n('t', f / 3.2) * 0.9 + n('u', f / 11) * 0.5)) : 0;
  const eyes = eyeTrack(f, seed);
  const base = action === 'walk' ? walkPose((f % cycle) / cycle) : POSES[action as keyof typeof POSES] ?? POSES.idle;
  const beat = speaking ? n('g', f / 14) * 10 : 0; // hand beats while talking
  const sway = n('sw', f / 80) * 4;
  return (
    <HostBodyFigure
      style={style}
      b={{
        ...base,
        armL: { ...base.armL, el: base.armL.el + beat },
        armR: { ...base.armR, el: base.armR.el - beat * 0.8 },
        rootX: base.rootX + (action === 'walk' ? 0 : sway),
        lean: base.lean + n('ln', f / 90) * 1.2,
        breath: Math.sin(f / 22),
        face: { ...base.face, talk: Math.max(base.face.talk * 0.4, talk), blink, look: base.face.look * 0.6 + eyes.look * 0.6, lookY: eyes.lookY, tilt: base.face.tilt + n('r', f / 70) * 2 },
      }}
    />
  );
};
