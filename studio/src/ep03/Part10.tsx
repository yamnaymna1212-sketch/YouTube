import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bell, Clock, Fuel, PiggyBank, Receipt, ShoppingBasket, Smartphone, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { P, Pawn } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Skyline, Src, TimeChip, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound } from './Part01';
import { NightCity } from './Real';
import { VO_DUR, fr, partStart, shotT, wordT } from './t';

const B = partStart('vo_09');
export const CLOSE_HOLD = 2.5; // end card held after the last word (s)
const END = VO_DUR + CLOSE_HOLD;
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

// 65 · the real precedent: Hawaii, 2018
const Hawaii: React.FC<{ msgAt: number; mistakeAt: number; minAt: number }> = ({ msgAt, mistakeAt, minAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const st = sp(f, mistakeAt, fps, 9, 200);
  const m = Math.round(interpolate(f - minAt, [0, 40], [0, 38], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <Headline kicker="REAL · HAWAII · 13 JAN 2018" dark x={90} y={90} size={110} at={0}>Remember the siren?</Headline>
      <div style={{ position: 'absolute', left: 140, top: 300, width: 980, transform: `scale(${sp(f, msgAt, fps)})`, transformOrigin: '0 0', background: P.bone, border: `7px solid ${P.ink}`, borderRadius: 34, padding: '34px 40px', boxShadow: '14px 14px 0 rgba(0,0,0,.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: P.red, letterSpacing: 2 }}><Smartphone size={40} color={P.red} />EMERGENCY ALERT</div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 56, color: P.ink, lineHeight: 1.12, marginTop: 14 }}>BALLISTIC MISSILE THREAT INBOUND TO HAWAII. SEEK IMMEDIATE SHELTER. THIS IS NOT A DRILL.</div>
      </div>
      {f > mistakeAt && <div style={{ position: 'absolute', left: 640, top: 830, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-6deg)`, opacity: st, border: `9px solid ${P.red}`, padding: '4px 30px', fontFamily: cond2, fontWeight: 700, fontSize: 100, color: P.red, background: 'rgba(12,13,16,.7)' }}>A MISTAKE</div>}
      {f > minAt && <><Badge I={Clock} x={1500} y={480} at={minAt} size={200} /><div style={{ position: 'absolute', left: 1330, top: 640, fontFamily: F.serif, fontSize: 170, color: P.bone }}>{m} min</div><div style={{ position: 'absolute', left: 1336, top: 830, fontFamily: F.sans, fontWeight: 700, fontSize: 44, color: P.bone }}>to correct it</div></>}
      <Src dark style={{ left: 90, bottom: 40 }}>FCC investigation of the Hawaii false alert (Jan/Apr 2018) · NPR, VOA</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// 65a · Jake's bill
const Bill: React.FC<{ gasAt: number; groAt: number; retAt: number; shotAt: number }> = ({ gasAt, groAt, retAt, shotAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const Row: React.FC<{ at: number; I: any; t: string; v: string; c: string; y: number }> = ({ at, I, t, v, c, y }) => (
    <div style={{ position: 'absolute', left: 140, top: y, width: 1100, display: 'flex', alignItems: 'center', gap: 30, opacity: sp(f, at, fps), transform: `translateX(${(1 - sp(f, at, fps)) * -80}px)`, borderBottom: `4px dashed rgba(27,34,48,.3)`, paddingBottom: 18 }}>
      <I size={90} color={P.ink} /><div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 64, color: P.ink, flex: 1 }}>{t}</div><div style={{ fontFamily: F.serif, fontSize: 110, color: c }}>{v}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      <Headline kicker="JAKE'S BILL · FROM ONE ORDER" x={140} y={90} size={110} at={0}>The receipt</Headline>
      <Row at={gasAt} I={Fuel} t="Gas" v="↑" c={P.red} y={330} />
      <Row at={groAt} I={ShoppingBasket} t="Groceries" v="↑" c={P.red} y={520} />
      <Row at={retAt} I={PiggyBank} t="Retirement" v="↓" c={P.red} y={710} />
      {f > shotAt && <div style={{ position: 'absolute', left: 140, top: 930, fontFamily: F.sans, fontWeight: 700, fontSize: 50, color: P.ink, opacity: sp(f, shotAt, fps) }}>…before a single shot is fired at America.</div>}
      <LiveJake pose="read" seed="p10bill" beats={[{ at: gasAt, r: 'worry', hold: 400 }]} style={{ position: 'absolute', left: 1360, top: 260, height: 820 }} />
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// 66 · the shelter door opens; daylight
const Door: React.FC<{ factsAt: number }> = ({ factsAt }) => {
  const f = useCurrentFrame();
  const open = interpolate(f, [0, 40], [0, 1], { extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3) });
  const x = interpolate(f, [30, 110], [700, 980], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      <div style={{ position: 'absolute', left: 760, top: 120, width: 520, height: 860, background: `linear-gradient(#FFF6DA, #F2D488)`, border: `8px solid ${P.ink}`, boxShadow: `0 0 ${200 * open}px rgba(255,240,200,.8)` }} />
      <div style={{ position: 'absolute', left: 760, top: 120, width: 520, height: 860, background: '#3A3F48', border: `8px solid ${P.ink}`, transformOrigin: '0 50%', transform: `perspective(1600px) rotateY(${-80 * open}deg)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 52% 50%, rgba(255,240,200,${0.35 * open}), transparent 60%)` }} />
      <LiveJake pose="stand" walk={f > 30 && f < 110} seed="p10door" beats={[{ at: 10, r: 'smile', hold: 400 }]} style={{ position: 'absolute', left: x, top: 220, height: 860, filter: `brightness(${0.7 + open * 0.3})` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 260, background: 'linear-gradient(transparent, rgba(12,13,16,.92) 45%)' }} />
      <Headline kicker="" dark x={90} y={860} size={100} at={factsAt}>Fear moves faster than facts.</Headline>
      <WhatIf dark /><TimeChip t="07:30" label="DAY 1" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 66a · an ordinary morning; receipts
const Morning: React.FC<{ jogAt: number; busAt: number; rcptAt: number }> = ({ jogAt, busAt, rcptAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const jx = interpolate(f - jogAt, [0, 120], [-100, 1300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bx = interpolate(f - busAt, [0, 90], [2000, -500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#BFD6E6, #F3E6C8)' }}>
      <div style={{ position: 'absolute', left: 0, top: -180, width: 1920, height: 1080 }}><NightCity dawn={1} streets={false} /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#8B8F96', borderTop: `6px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 930, height: 10, background: P.bone, opacity: 0.6 }} />
      {f > jogAt && <Pawn x={jx} y={860} base="#4E7A4A" scale={0.8} seed="jog" hop={-1} />}
      <div style={{ position: 'absolute', left: bx, top: 700, width: 420, height: 170, background: P.amber, border: `6px solid ${P.ink}`, borderRadius: 24 }}>{[0, 1, 2, 3].map((k) => <div key={k} style={{ position: 'absolute', left: 30 + k * 96, top: 26, width: 70, height: 56, background: '#DCE8F0', border: `4px solid ${P.ink}` }} />)}</div>
      <LiveJake pose="read" seed="p10m" beats={[{ at: rcptAt, r: 'doubt', hold: 400 }]} style={{ position: 'absolute', left: 1360, top: 300, height: 780 }} />
      {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: 1280 - k * 40, top: 180 + k * 30, transform: `rotate(${-8 + k * 7}deg) scale(${sp(f, rcptAt + k * 6, fps)})` }}><div style={{ width: 200, height: 260, background: '#FBF8EF', border: `5px solid ${P.ink}`, padding: 18 }}>{[0, 1, 2, 3, 4].map((j) => <div key={j} style={{ height: 12, marginBottom: 16, width: `${90 - j * 12}%`, background: 'rgba(27,34,48,.3)' }} />)}<Receipt size={50} color={P.red} /></div></div>)}
      <Headline kicker="AN ORDINARY MORNING" x={90} y={90} size={100} at={0}>The world hasn't ended</Headline>
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// 67 · end card
const EndCard: React.FC<{ subAt: number }> = ({ subAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, 0, fps, 16, 110);
  return (
    <AbsoluteFill style={{ background: P.ink, alignItems: 'center', justifyContent: 'center' }}>
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ position: 'absolute', left: 960 - (90 + i * 80) * s, top: 470 - (90 + i * 80) * s, width: 2 * (90 + i * 80) * s, height: 2 * (90 + i * 80) * s, borderRadius: '50%', border: `4px dashed rgba(246,241,228,${0.5 - i * 0.07})` }} />)}
      <div style={{ position: 'absolute', top: 360, textAlign: 'center', width: '100%', transform: `scale(${s})` }}>
        <div style={{ fontFamily: F.serif, fontSize: 170, color: P.bone }}>Dollarly</div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 52, color: P.amber, letterSpacing: 4 }}>YOUR MONEY. DECODED.</div>
      </div>
      <div style={{ position: 'absolute', top: 760, textAlign: 'center', width: '100%', fontFamily: F.serif, fontSize: 70, color: P.bone, opacity: sp(f, 10, fps) }}>Which ring surprised you most?</div>
      {f > subAt && <div style={{ position: 'absolute', top: 880, left: 960, transform: `translateX(-50%) scale(${sp(f, subAt, fps, 10, 170)})`, display: 'flex', alignItems: 'center', gap: 18, background: P.red, border: `6px solid ${P.bone}`, borderRadius: 18, padding: '14px 40px', fontFamily: cond2, fontWeight: 700, fontSize: 64, color: P.bone }}><Bell size={56} />SUBSCRIBE</div>}
      <WhatIf dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part10: React.FC = () => {
  const s = (id: string) => shotT(id);
  const w = (id: string, x: string, n = 0) => rel(wordT(id, x, n), s(id));
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('65')} to={s('65a')} name="65"><Enter kind="zoom"><Hawaii msgAt={6} mistakeAt={w('65', 'mistake')} minAt={w('65', 'minutes')} /></Enter></At>
      <At base={B} from={s('65a')} to={s('66')} name="65a"><Enter kind="slideL"><Bill gasAt={w('65a', 'gas')} groAt={w('65a', 'groceries')} retAt={w('65a', 'retirement')} shotAt={w('65a', 'shot')} /></Enter></At>
      <At base={B} from={s('66')} to={s('66a')} name="66"><Enter kind="fade"><Door factsAt={w('66', 'fear')} /></Enter></At>
      <At base={B} from={s('66a')} to={s('67')} name="66a"><Enter kind="fade"><Morning jogAt={w('66a', 'jogging')} busAt={w('66a', 'bus')} rcptAt={w('66a', 'receipts')} /></Enter></At>
      <At base={B} from={s('67')} to={END} name="67 end"><Enter kind="zoom"><EndCard subAt={w('67', 'subscribe')} /></Enter></At>
      <PartSound base={B} cues={[[wordT('65', 'message'), 'type', 0.05], [wordT('65a', 'gas'), 'counter', 0.05], [wordT('66a', 'receipts'), 'paper', 0.07], [wordT('67', 'subscribe'), 'tick', 0.07]]} />
    </AbsoluteFill>
  );
};
export const EP03_P10_FRAMES = fr(END - B);
