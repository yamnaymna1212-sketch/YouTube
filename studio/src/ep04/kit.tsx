import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const FPS = 30;
export const fr = (sec: number) => Math.round(sec * FPS);

/** A shot placed on the episode timeline (seconds). Children see local frames from 0. */
export const At: React.FC<{ from: number; to: number; base?: number; children: React.ReactNode; name?: string }> = ({ from, to, base = 0, children, name }) => (
  <Sequence from={fr(from - base)} durationInFrames={Math.max(1, fr(to - from))} name={name}>{children}</Sequence>
);

/** Linked entrances, so no plain cut between unrelated images. */
export const Enter: React.FC<{ kind: 'zoom' | 'slideL' | 'slideR' | 'drop' | 'rise' | 'fade' | 'none'; children: React.ReactNode; dur?: number; origin?: string }> = ({ kind, children, dur = 14, origin = '50% 50%' }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 20, stiffness: 120 }, durationInFrames: dur });
  const o = interpolate(f, [0, dur * 0.6], [0, 1], { extrapolateRight: 'clamp' });
  const tr = kind === 'zoom' ? `scale(${interpolate(s, [0, 1], [1.4, 1])})` : kind === 'slideL' ? `translateX(${(1 - s) * 1920}px)` : kind === 'slideR' ? `translateX(${-(1 - s) * 1920}px)` : kind === 'drop' ? `translateY(${-(1 - s) * 1080}px)` : kind === 'rise' ? `translateY(${(1 - s) * 1080}px)` : 'none';
  const op = kind === 'zoom' || kind === 'fade' ? o : 1;
  return <AbsoluteFill style={{ transform: tr, transformOrigin: origin, opacity: op, filter: kind === 'zoom' ? `blur(${(1 - s) * 8}px)` : 'none' }}>{children}</AbsoluteFill>;
};

/** Slow camera push (never static). `toFrames` = frames to reach `to`. */
export const Push: React.FC<{ children: React.ReactNode; from?: number; to?: number; ox?: string; dur?: number }> = ({ children, from = 1, to = 1.06, ox = '50% 50%', dur = 300 }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ transformOrigin: ox, transform: `scale(${interpolate(f, [0, dur], [from, to], { extrapolateRight: 'clamp' })})` }}>{children}</AbsoluteFill>;
};

/** Camera that flies into a point (zoom-through link into the next shot). */
export const FlyInto: React.FC<{ children: React.ReactNode; at: number; dur?: number; ox: string; to?: number }> = ({ children, at, dur = 18, ox, to = 7 }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [at, at + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const e = k * k * k;
  return <AbsoluteFill style={{ transformOrigin: ox, transform: `scale(${1 + e * (to - 1)})`, opacity: 1 - interpolate(k, [0.7, 1], [0, 1], { extrapolateLeft: 'clamp' }) }}>{children}</AbsoluteFill>;
};

const SOFT = new Set(['tick', 'type', 'counter', 'paper']);
export type Cue = [number, string, number?]; // [seconds on the timeline, sfx, volume ≤ 0.1]

/** VO (when it exists) + calm dark music + soft SFX only (capped at 0.1). */
export const Sound: React.FC<{ base: number; vo?: string; music: string; cues?: Cue[] }> = ({ base, vo, music, cues = [] }) => (
  <>
    {vo && <Audio src={staticFile(vo)} trimBefore={fr(base)} volume={1} />}
    <Audio src={staticFile(music)} trimBefore={fr(base)} volume={0.07} />
    {cues.filter(([, n]) => SOFT.has(n)).map(([t, n, v = 0.06], i) => (
      <Sequence key={i} from={fr(t - base)} durationInFrames={60} layout="none"><Audio src={staticFile(`iran/audio/sfx_${n}.wav`)} volume={Math.min(v, 0.1)} /></Sequence>
    ))}
  </>
);
