import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FullBody } from './host/FullBody';
export const BodyTest: React.FC = () => (
  <AbsoluteFill style={{ background: "#5a6370", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly', paddingBottom: 40 }}>
    <FullBody pose="stand" style={{ height: 900 }} />
    <FullBody pose="pump" style={{ height: 900 }} />
    <FullBody pose="read" face={{ look: 0.3 }} style={{ height: 900 }} />
    <FullBody pose="point" style={{ height: 900 }} />
  </AbsoluteFill>
);
