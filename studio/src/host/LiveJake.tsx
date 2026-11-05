import React from 'react';
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { ArmAngles, BodyPose, FullBody, POSES } from './FullBody';
import { HostPose } from './Host';

// LIVE JAKE — the same drawn character, but never frozen:
//  • idle life: breathing, weight shift, head micro-motion, natural blink rhythm (with occasional double blinks),
//    eye saccades (the eyes jump to a new spot, hold, jump again)
//  • reactions on cue: surprise, smile, cheer, worry, doubt, shrug, nod — sprung in and out like a real performance
//  • walk cycle (legs + arm swing + bounce)
export type Reaction = 'surprise' | 'smile' | 'cheer' | 'worry' | 'doubt' | 'shrug' | 'nod' | 'think';
export type Beat = { at: number; r: Reaction; hold?: number };

const FACE: Record<Reaction, Partial<HostPose>> = {
  surprise: { brow: 1, talk: 0.45, smile: 0, nod: -8 },
  smile: { smile: 1, brow: 0.35, nod: 2 },
  cheer: { smile: 1, brow: 0.6, talk: 0.25, nod: -4 },
  worry: { brow: 0.85, smile: -0.45, lookY: 0.7, tilt: 4 },
  doubt: { brow: 0.7, smile: 0.05, look: 0.8, tilt: -6 },
  shrug: { brow: 0.9, smile: -0.1, tilt: 6, talk: 0.1 },
  nod: { smile: 0.5, brow: 0.2 },
  think: { brow: 0.5, look: -0.6, lookY: -0.6, tilt: -4, smile: 0 },
};
const ARMS: Partial<Record<Reaction, BodyPose>> = { shrug: 'shrug', cheer: 'cheer', think: 'think' };
const LEAN: Partial<Record<Reaction, number>> = { surprise: -3.5, worry: 2, doubt: -1.5, cheer: -2 };

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixArms = (a: ArmAngles, b: ArmAngles, t: number): ArmAngles => ({
  front: [mix(a.front[0], b.front[0], t), mix(a.front[1], b.front[1], t)],
  back: [mix(a.back[0], b.back[0], t), mix(a.back[1], b.back[1], t)],
});

export const LiveJake: React.FC<{
  pose?: BodyPose; face?: Partial<HostPose>; beats?: Beat[]; walk?: boolean; seed?: string; stub?: string; style?: React.CSSProperties;
}> = ({ pose = 'stand', face = {}, beats = [], walk = false, seed = 'jake', stub, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- idle life
  const breathe = Math.sin(f / 21);
  const sway = noise2D(seed + 'sway', f / 90, 0) * 1.2;
  const shiftX = noise2D(seed + 'shift', f / 120, 1) * 6;
  const headTilt = noise2D(seed + 'tilt', f / 70, 2) * 2.2;
  const headNod = noise2D(seed + 'nod', f / 55, 3) * 2.5;
  // blinks: every 2.4–4.6 s, 5 frames, sometimes double
  let blink = 0;
  for (let k = 0, t = Math.floor(random(seed + 'b0') * 40); t < f + 6 && k < 200; k++) {
    const d = f - t;
    if (d >= 0 && d < 5) blink = Math.max(blink, [0.5, 1, 1, 0.6, 0.2][d]);
    if (random(seed + 'dbl' + k) > 0.8 && d >= 7 && d < 11) blink = Math.max(blink, [0.6, 1, 0.7, 0.2][d - 7]);
    t += Math.floor(72 + random(seed + 'b' + k) * 66);
  }
  // saccades: hold a gaze point ~0.8–1.6 s, then jump fast
  const seg = Math.floor(f / 34);
  const p0 = random(seed + 's' + seg), p1 = random(seed + 's' + (seg + 1));
  const within = (f % 34) / 34;
  const jump = interpolate(within, [0.86, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lookIdle = mix((p0 - 0.5) * 0.9, (p1 - 0.5) * 0.9, jump);
  const lookYIdle = mix((random(seed + 'y' + seg) - 0.5) * 0.5, (random(seed + 'y' + (seg + 1)) - 0.5) * 0.5, jump);

  // ---- reactions (spring in, hold, spring out)
  let w: Partial<Record<Reaction, number>> = {};
  for (const b of beats) {
    const inn = spring({ frame: f - b.at, fps, config: { damping: 12, stiffness: 140, mass: 0.7 } });
    const out = b.hold ? spring({ frame: f - b.at - b.hold, fps, config: { damping: 16, stiffness: 90 } }) : 0;
    w[b.r] = Math.max(w[b.r] ?? 0, Math.max(0, inn - out));
  }
  const base: HostPose = { talk: 0, blink, look: lookIdle, lookY: lookYIdle, brow: 0.1, smile: 0.25, tilt: headTilt, nod: headNod, ...face } as HostPose;
  const p: any = { ...base };
  let lean = sway, arms: ArmAngles = POSES[pose];
  (Object.keys(w) as Reaction[]).forEach((r) => {
    const k = w[r]!;
    Object.entries(FACE[r]).forEach(([key, v]) => { p[key] = mix(p[key] ?? 0, v as number, k); });
    if (r === 'nod') p.nod += Math.sin((f) / 3.2) * 7 * k;
    if (ARMS[r]) arms = mixArms(arms, POSES[ARMS[r]!], k);
    lean += (LEAN[r] ?? 0) * k;
  });
  p.blink = Math.max(blink, 0) * (1 - (w.surprise ?? 0) * 0.8);

  // ---- walk
  let stride = 0, bob = 0;
  if (walk) {
    stride = Math.sin(f / 6.5);
    bob = Math.abs(Math.cos(f / 6.5)) * -10;
    arms = mixArms(arms, { front: [-stride * 30, -14 - Math.abs(stride) * 10], back: [stride * 30, 14] }, 1);
  }

  return (
    <div style={{ ...style, transformOrigin: '50% 98%', transform: `translate(${shiftX}px, ${bob}px) rotate(${lean}deg)` }}>
      <FullBody pose={pose} face={p} arms={arms} stride={stride} breathe={breathe} stub={stub} style={{ height: '100%', width: 'auto', overflow: 'visible', display: 'block' }} />
    </div>
  );
};
