import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { B, cond, display } from '../brand/Brand';

// EP09 thumbnail: 2 giant lines ("2 TERMS." / "THEN WHAT?") + REAL official portrait (public domain, no edit to the face)
// in a print frame + one paper prop (the inheritance envelope, stamped JAN 20 2029) + Dollarly tab. Neutral: a fact + a question.
export const EP09Thumb: React.FC = () => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 35% 45%, #F7E3A0 0%, #E9C766 70%, #C99A3A 100%)', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 70, top: 40, fontFamily: display, fontWeight: 800, fontSize: 250, lineHeight: 0.9, color: '#111', letterSpacing: -5 }}>2 TERMS.</div>
    <div style={{ position: 'absolute', left: 70, top: 280, fontFamily: display, fontWeight: 800, fontSize: 170, lineHeight: 0.9, color: '#D21F1F', textShadow: '0 4px 0 #8E0F0F', letterSpacing: -4 }}>THEN WHAT?</div>
    {/* envelope prop */}
    <div style={{ position: 'absolute', left: 90, top: 560, width: 820, height: 450, transform: 'rotate(-5deg)', background: '#F1E6CC', border: '6px solid #111', boxShadow: '0 30px 50px rgba(0,0,0,.35)' }}>
      <svg width={820} height={450} style={{ position: 'absolute', inset: 0 }}><path d="M0 0 L410 250 L820 0" fill="#E2D2AE" stroke="#111" strokeWidth={6} /></svg>
      <div style={{ position: 'absolute', left: 40, bottom: 34, fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 4, color: '#111' }}>TO: THE NEXT PRESIDENT</div>
      <div style={{ position: 'absolute', right: 30, top: 40, transform: 'rotate(9deg)', border: `9px solid ${B.red}`, color: B.red, fontFamily: cond, fontWeight: 800, fontSize: 70, padding: '0 20px', background: 'rgba(250,246,236,.9)' }}>JAN 20, 2029</div>
    </div>
    {/* real portrait in a print frame */}
    <div style={{ position: 'absolute', left: 1180, top: 90, width: 640, height: 860, transform: 'rotate(3deg)', background: '#FFFDF6', padding: 24, border: '16px solid #2A1E12', boxShadow: '0 40px 70px rgba(0,0,0,.45)' }}>
      <Img src={staticFile('ep04/real/trump_official_2025.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%' }} />
    </div>
    <div style={{ position: 'absolute', left: 1130, top: 860, transform: 'rotate(-6deg)', background: '#111', color: '#FBF6E8', fontFamily: cond, fontWeight: 800, fontSize: 70, letterSpacing: 6, padding: '4px 28px', border: '6px solid #FBF6E8' }}>2028</div>
    <div style={{ position: 'absolute', right: 40, bottom: 30, background: B.ink, color: B.gold, fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 6, padding: '4px 18px' }}>DOLLARLY</div>
  </AbsoluteFill>
);
