import React from 'react';
import { AbsoluteFill } from 'remotion';
import { HostFigure } from './host/Host';
const base = { talk: 0, blink: 0, look: 0, brow: 0, smile: 0.25, tilt: 0, nod: 0 };
export const HostTest: React.FC = () => (
  <AbsoluteFill style={{ background: '#17191E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
    <HostFigure p={base} style={{ height: 700 }} />
    <HostFigure p={{ ...base, talk: 0.8, brow: 0.6, look: 0.6 }} style={{ height: 700 }} />
    <HostFigure p={{ ...base, blink: 1, smile: 0.8, tilt: -4 }} style={{ height: 700 }} />
  </AbsoluteFill>
);
