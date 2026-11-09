import React from 'react';
import { AbsoluteFill } from 'remotion';
import { LiveJake } from '../host/LiveJake';
import { B, cond, display } from '../brand/Brand';
import { SAM_OUTFIT, Clock24, HorizonCloud, PortNight, Heli, Crowd } from './kit';

// EP07 thumbnail (all drawn, no AI face): the night port under a red sky, the far glow, helicopter, people running,
// Sam's frightened face, giant "24 HOURS". One idea, readable at phone size.
export const EP07Thumb: React.FC = () => (
  <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
    <AbsoluteFill style={{ transform: 'scale(1.15) translateX(-90px)', transformOrigin: '30% 70%' }}>
      <PortNight push={0}>
        <HorizonCloud at={-400} x={1000} y={760} s={2.1} />
        <Crowd n={10} y={1040} seed="th" scale={1.6} at={-200} />
      </PortNight>
    </AbsoluteFill>
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(190,30,20,.45), rgba(80,0,0,.15) 60%, rgba(0,0,0,.4))', mixBlendMode: 'multiply' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,.6) 80%)' }} />
    <div style={{ position: 'absolute', left: 870, top: -60, width: 1200, height: 1300 }}>
      <LiveJake pose="stand" seed="thumb" outfit={SAM_OUTFIT} face={{ brow: 1, smile: -0.85, talk: 0.5, look: -0.7, lookY: 0.1 }} beats={[]} style={{ position: 'absolute', left: 0, top: 0, height: 2100 }} />
    </div>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 72% 38%, rgba(255,120,60,.3), transparent 40%)', mixBlendMode: 'screen' }} />
    <div style={{ position: 'absolute', left: 70, top: 470, fontFamily: display, fontWeight: 800, fontSize: 340, lineHeight: 0.85, color: '#FFE14D', WebkitTextStroke: '8px #000', textShadow: '0 14px 0 #000' }}>24</div>
    <div style={{ position: 'absolute', left: 70, top: 780, fontFamily: cond, fontWeight: 800, fontSize: 200, letterSpacing: 8, color: '#fff', WebkitTextStroke: '6px #000', textShadow: '0 10px 0 #000' }}>HOURS</div>
    <div style={{ position: 'absolute', left: 560, top: 560 }}><Clock24 x={0} y={0} r={120} hour={20} at={-100} label="NUCLEAR · WHAT IF" /></div>
  </AbsoluteFill>
);
