import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { FilmFinish } from './ui/Film';
import { S1Earth, S2Browser, S3Host, S4Document, S5Korea, S6Data, S7Person, S8Outro } from './scenes/Scenes';

// Edit grammar of a human editor: mostly hard cuts, one whip, one dissolve, one dip — never the same transition twice in a row.
const LightFlash: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  return <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(255,190,120,.9), rgba(255,120,60,.25) 40%, transparent 70%)', opacity: interpolate(f, [0, d / 2, d], [0, 1, 0]), mixBlendMode: 'screen' }} />;
};

export const SCENES = [
  [S1Earth, 150], [S2Browser, 140], [S3Host, 150], [S4Document, 140],
  [S5Korea, 170], [S6Data, 140], [S7Person, 140], [S8Outro, 170],
] as const;

export const StyleReel: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={150}><S1Earth /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence durationInFrames={140}><S2Browser /></TransitionSeries.Sequence>
      {/* hard cut */}
      <TransitionSeries.Sequence durationInFrames={150}><S3Host /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={linearTiming({ durationInFrames: 9 })} />
      <TransitionSeries.Sequence durationInFrames={140}><S4Document /></TransitionSeries.Sequence>
      <TransitionSeries.Overlay durationInFrames={14}><LightFlash /></TransitionSeries.Overlay>
      <TransitionSeries.Sequence durationInFrames={170}><S5Korea /></TransitionSeries.Sequence>
      {/* hard cut to light paper = deliberate contrast */}
      <TransitionSeries.Sequence durationInFrames={140}><S6Data /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />
      <TransitionSeries.Sequence durationInFrames={140}><S7Person /></TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={170}><S8Outro /></TransitionSeries.Sequence>
    </TransitionSeries>
    <FilmFinish />
  </AbsoluteFill>
);

export const REEL_FRAMES = 150 + 140 + 150 + 140 + 170 + 140 + 140 + 170 - 12 - 9 - 18;
