import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, F } from '../theme';
import { FullBody } from '../host/FullBody';

// Channel identity: "Wallet Math". Stills only.
//  ChannelAvatar 800×800 (YouTube crops to a circle) · ChannelBanner 2560×1440 (safe area 1546×423 centred)
//  EP02Thumb 1280×720.
const Grain: React.FC<{ o?: number }> = ({ o = 0.35 }) => <Img src={staticFile('fx/grain2.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'overlay', opacity: o }} />;

export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 38%, #1E2430, ${C.ink} 70%)`, alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', width: 640, height: 640, borderRadius: '50%', border: `10px solid ${C.amber}`, opacity: 0.9 }} />
    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: -30 }}>
      <span style={{ fontFamily: F.serif, fontSize: 380, color: C.bone, lineHeight: 1 }}>W</span>
      <span style={{ fontFamily: F.mono, fontSize: 150, color: C.amber, lineHeight: 1, marginLeft: -6 }}>$</span>
    </div>
    <div style={{ width: 230, height: 14, background: C.red, marginTop: 6 }} />
    <Grain o={0.25} />
  </AbsoluteFill>
);

export const ChannelBanner: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
    {/* real SPECIMEN notes, dark and blurred, as texture */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Img key={i} src={staticFile('sayed/money/usd100.jpg')} style={{ position: 'absolute', width: 900, left: -100 + i * 470, top: 180 + (i % 2) * 620, rotate: `${-14 + i * 6}deg`, filter: 'brightness(.22) saturate(.5) blur(2px)' }} />
    ))}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(12,13,16,.55), rgba(12,13,16,.95) 62%)' }} />
    {/* safe area: 1546 × 423 centred */}
    <div style={{ position: 'absolute', left: (2560 - 1546) / 2, top: (1440 - 423) / 2, width: 1546, height: 423, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ width: 90, height: 6, background: C.red, marginBottom: 22 }} />
        <div style={{ fontFamily: F.serif, fontSize: 150, color: C.bone, lineHeight: 0.95 }}>Wallet <span style={{ color: C.amber, fontStyle: 'italic' }}>Math</span></div>
        <div style={{ fontFamily: F.sans, fontSize: 40, color: C.bone, opacity: 0.8, marginTop: 20 }}>Big headlines. Your money. We do the math.</div>
        <div style={{ fontFamily: F.mono, fontSize: 28, color: C.steel, letterSpacing: 3, marginTop: 22 }}>GAS · HEALTH CARE · PAYCHECKS · TAXES</div>
      </div>
      <FullBody pose="read" stub="+$1,440 − ?" face={{ look: -0.4, brow: 0.6, smile: 0.3 }} style={{ height: 520, marginRight: 30 }} />
    </div>
    <Grain />
  </AbsoluteFill>
);

export const EP02Thumb: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 0, top: 0, width: 640, height: 720, background: 'linear-gradient(160deg, #1B2A44, #0E1524)' }} />
    <div style={{ position: 'absolute', right: 0, top: 0, width: 640, height: 720, background: 'linear-gradient(200deg, #3A2A14, #17120A)' }} />
    <Img src={staticFile('sayed/cut_elsayed.png')} style={{ position: 'absolute', left: -10, bottom: 0, height: 660, filter: 'contrast(1.12) saturate(1.05) drop-shadow(0 20px 40px rgba(0,0,0,.6))' }} />
    <FullBody pose="read" stub="−$55.38" face={{ look: -0.7, brow: 1, smile: -0.2, talk: 0.45 }} style={{ position: 'absolute', right: -40, top: 60, height: 900 }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 210, textAlign: 'center', fontFamily: F.mono, fontWeight: 500, fontSize: 260, color: C.amber, textShadow: '0 10px 40px rgba(0,0,0,.8), 0 0 4px #000' }}>$?</div>
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center' }}>
      <span style={{ fontFamily: F.sans, fontWeight: 900, fontSize: 96, color: '#fff', letterSpacing: 1, textShadow: '0 6px 0 #000, 0 0 30px rgba(0,0,0,.8)' }}>YOUR WALLET?</span>
    </div>
    <span style={{ position: 'absolute', left: 30, top: 28, fontFamily: F.mono, fontSize: 26, letterSpacing: 3, background: C.red, color: '#fff', padding: '6px 14px' }}>HYPOTHETICAL</span>
  </AbsoluteFill>
);
