import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, F } from '../theme';
import { FullBody } from '../host/FullBody';

// Channel identity: "Dollarly". Stills only.
//  ChannelAvatar 800×800 (YouTube crops to a circle) · ChannelBanner 2560×1440 (safe area 1546×423 centred)
//  EP02Thumb 1280×720.
const Grain: React.FC<{ o?: number }> = ({ o = 0.35 }) => <Img src={staticFile('fx/grain2.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'overlay', opacity: o }} />;

export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 38%, #1E2430, ${C.ink} 70%)`, alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', width: 640, height: 640, borderRadius: '50%', border: `10px solid ${C.amber}`, opacity: 0.9 }} />
    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: -30 }}>
      <span style={{ fontFamily: F.serif, fontSize: 380, color: C.bone, lineHeight: 1 }}>D</span>
      <span style={{ fontFamily: F.mono, fontSize: 150, color: C.amber, lineHeight: 1, marginLeft: -6 }}>$</span>
    </div>
    <div style={{ width: 230, height: 14, background: C.red, marginTop: 6 }} />
    <Grain o={0.25} />
  </AbsoluteFill>
);

export const BANNER_NAME = 'Dollarly';
export const ChannelBanner: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
    {/* real SPECIMEN notes, dark and blurred, as texture */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Img key={i} src={staticFile('sayed/money/usd100.jpg')} style={{ position: 'absolute', width: 900, left: -100 + i * 470, top: 180 + (i % 2) * 620, rotate: `${-14 + i * 6}deg`, filter: 'brightness(.22) saturate(.5) blur(2px)' }} />
    ))}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(12,13,16,.5), rgba(12,13,16,.95) 62%)' }} />
    {/* safe area: 1546 × 423 centred — everything important lives here */}
    <div style={{ position: 'absolute', left: (2560 - 1546) / 2, top: (1440 - 423) / 2, width: 1546, height: 423, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 6, background: C.red }} />
          <div style={{ fontFamily: F.mono, fontSize: 30, letterSpacing: 6, color: C.amber }}>{BANNER_NAME.toUpperCase()}</div>
        </div>
        <div style={{ fontFamily: F.sans, fontWeight: 900, fontSize: 150, lineHeight: 0.98, color: C.bone, letterSpacing: -2, marginTop: 18 }}>
          Your Money.<br /><span style={{ color: C.amber }}>Decoded.</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 26, background: C.red, borderRadius: 6, padding: '10px 22px' }}>
          <svg width={26} height={26} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff" /></svg>
          <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff' }}>SUBSCRIBE</span>
        </div>
      </div>
      <FullBody pose="cheer" face={{ look: -0.5, brow: 0.6, smile: 1 }} style={{ height: 540, marginRight: 40 }} />
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

// Channel card (cover image for platforms that need ≥1024×576): name, line, small subscribe — no tagline sentence.
export const ChannelCard: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, #171B23, ${C.ink} 70%)`, alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 240, height: 8, background: C.red, marginBottom: 50 }} />
    <div style={{ fontFamily: F.serif, fontSize: 400, color: C.bone, lineHeight: 1 }}>Dollar<span style={{ color: C.amber, fontStyle: 'italic' }}>ly</span></div>
    <div style={{ fontFamily: F.sans, fontSize: 72, color: C.steel, marginTop: 30 }}>Your money. Decoded.</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 80, background: C.red, padding: '30px 70px', borderRadius: 14 }}>
      <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M10.27 21a2 2 0 0 0 3.46 0" /><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33" /></svg>
      <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 64, letterSpacing: 8, color: '#fff' }}>SUBSCRIBE</span>
    </div>
    <Grain o={0.25} />
  </AbsoluteFill>
);
