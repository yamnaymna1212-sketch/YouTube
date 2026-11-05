import React from 'react';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Bell, HeartPulse, MessageCircle } from 'lucide-react';
import { C, F } from '../theme';
import { clamp, ease } from '../ui/Film';
import { LiveJake } from '../host/LiveJake';
import { Diner, Lamp, LightWrap, Sky, Skyline, Street } from '../world/World';
import { Cue, Ico, Label, Note, Push, S12, Slam, Src, Stub, World, useDur } from './Hook';
import { Cut, Cuts, Illus, Wallet, t01 } from './Part1';
import { WHOPAYS_MUSIC_FROM } from './FileWho';
import { Scoreboard } from './Score';
import { remap, voFrames } from './timing';

// EP02 · CLOSE (vo_07).
const A = (f: string) => staticFile(`sayed/${f}`);
const VO = 'vo_07';
const rel = (orig: number, shotStart: number) => remap(VO, orig) - remap(VO, shotStart);
const fade = (f: number, at: number, len = 12) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: ease });

// K0 · WORLD: Jake walks home at dusk.
const K0: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(1.1) translateX(${-60 * t}px)`, filter: 'brightness(.75) saturate(.9)' }}>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080">
          <Sky horizon={620} /><Skyline base={660} seed={21} />
          <Diner x={1200} base={820} s={1.2} />
          <Street walkY={820} roadY={940} />
          <Lamp x={500} base={830} s={1.1} /><Lamp x={1000} base={830} s={1.1} />
          <LightWrap />
        </svg>
      </div>
      <LiveJake pose="stand" seed="k0" walk face={{ look: -0.5 }} style={{ position: 'absolute', left: 1100 - 520 * t, top: 380, height: 640 }} />
      <div style={{ position: 'absolute', left: 110, top: 150, fontFamily: F.serif, fontSize: 90, color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,.5)', opacity: fade(f, rel(75, 0)) }}>Would Jake be <i style={{ color: C.amber }}>richer?</i></div>
      <Wallet value="+$1,440 +$6,800 − ?" />
      <Illus />
    </AbsoluteFill>
  );
};

// K1 · REAL PHOTO (NASA): city lights — on paper vs in reality.
const K1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('real/nasa_iss075e0227352.jpg')} from={1.05} to={1.18} filter="brightness(.8)" />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.82), transparent 65%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 330 }}>
        <div style={{ fontFamily: F.serif, fontSize: 80, color: C.bone, opacity: fade(f, 0) }}>On paper: his biggest bill disappears.</div>
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 80, color: C.amber, marginTop: 20, opacity: fade(f, rel(202, 119)) }}>In reality: it depends how it's paid for.</div>
      </div>
      <Src logo="nasa.png">NASA · ISS075-E-227352</Src>
    </AbsoluteFill>
  );
};

// K2 · PAYOFF: the number bigger than everything else — $26,993, with real notes.
const K2: React.FC = () => {
  const f = useCurrentFrame();
  const hit = rel(413, 315);
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Note key={i} v={100} w={700} style={{ position: 'absolute', left: 60 + i * 340, top: 140 + (i % 2) * 480, rotate: `${-12 + i * 7}deg`, filter: 'brightness(.35) saturate(.6) blur(1.5px)', opacity: fade(f, hit + i * 2) }} />
      ))}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(12,13,16,.5), rgba(12,13,16,.92) 70%)' }} />
      <div style={{ textAlign: 'center' }}>
        <Label at={0} color={C.steel}>The number bigger than everything else</Label>
        <Ico I={HeartPulse} size={70} color={C.red} at={hit} style={{ margin: '26px 0 6px' }} />
        <Slam text="$26,993" color={C.amber} size={280} at={hit} />
        <Label at={hit + 20} style={{ marginTop: 20 }}>an average family health plan · per year</Label>
      </div>
      <Src logo="kff.png" logoDark>KFF Employer Health Benefits Survey 2025 · Notes: uscurrency.gov (SPECIMEN)</Src>
    </AbsoluteFill>
  );
};

// K3 · WORLD: spent before the paycheck is printed — the empty employer line.
const K3: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(1.3) translateX(${-30 * t}px)` }}><World blur={14} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.45)' }} />
      <div style={{ position: 'absolute', left: 580, top: 200, transform: `rotate(${-3 + 2 * t}deg) scale(${1.05 + 0.06 * t})` }}><Stub mode="empty" /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 60, color: '#fff', opacity: fade(f, 30) }}>spent before the paycheck is even printed</div>
      <Illus />
    </AbsoluteFill>
  );
};

// K4 · Final score (the Taxes line grows) → K5 the blank tax line (reuses the hook's shot).
const K4: React.FC = () => <Scoreboard title="Jake's final score" step={6} flip={rel(770, 661)} />;

// K6 · WORLD: Jake turns to camera — the comment question.
const K6: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.3 + 0.04 * t})` }}><World blur={12} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.3)' }} />
      <LiveJake pose="stand" seed="k6" face={{ look: 0 }} beats={[{ at: 4, r: 'smile' }, { at: 30, r: 'nod', hold: 30 }]} style={{ position: 'absolute', left: 980, top: 40, height: 1700 }} />
      <div style={{ position: 'absolute', left: 110, top: 300, width: 820, background: 'rgba(12,13,16,.85)', padding: '36px 40px', borderLeft: `5px solid ${C.amber}`, opacity: fade(f, 6), transform: `translateX(${(1 - fade(f, 6)) * -30}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Ico I={MessageCircle} size={46} color={C.amber} at={6} /><Label at={6} color={C.amber}>Tell me in the comments</Label></div>
        <div style={{ fontFamily: F.serif, fontSize: 70, color: C.bone, lineHeight: 1.08, marginTop: 18 }}>Would you trade your premiums for higher taxes?</div>
      </div>
      <Illus />
    </AbsoluteFill>
  );
};

// K7 · END CARD: channel + subscribe.
const K7: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: interpolate(f, [0, 20], [0, 120], { ...clamp, easing: ease }), height: 4, background: C.red, marginBottom: 26 }} />
      <div style={{ fontFamily: F.serif, fontSize: 150, color: C.bone }}>The Auditor</div>
      <div style={{ fontFamily: F.sans, fontSize: 30, color: C.steel, marginTop: 6, opacity: fade(f, 10) }}>Where your money actually goes. Read line by line.</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 60, background: C.red, padding: '18px 40px', borderRadius: 8, opacity: fade(f, rel(1120, 1069)), transform: `scale(${0.9 + 0.1 * fade(f, rel(1120, 1069))})` }}>
        <Ico I={Bell} plain size={40} color="#fff" at={rel(1120, 1069)} />
        <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: '#fff' }}>SUBSCRIBE</span>
      </div>
      <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 52, color: C.amber, marginTop: 50, opacity: fade(f, rel(1170, 1069)) }}>I'll do the math, so you don't have to.</div>
    </AbsoluteFill>
  );
};

const CLOSE: Cut[] = [
  ['walk', 0, 119, K0], ['paper', 119, 315, K1], ['number', 315, 527, K2], ['stub', 527, 661, K3],
  ['score', 661, 793, K4], ['taxline', 793, 939, S12], ['comment', 939, 1069, K6], ['end', 1069, 1260, K7],
];
const CLOSE_CUES: Cue[] = [[527, 'paper', 0.06], [661, 'tick', 0.05], [667, 'tick', 0.05], [673, 'tick', 0.05], [679, 'tick', 0.05], [793, 'paper', 0.06]];
export const CLOSE_MUSIC_FROM = WHOPAYS_MUSIC_FROM + voFrames('vo_06') + 10;
export const CLOSE_EXTRA = 60; // hold the end card 2 s after the last word
export const Close: React.FC = () => <Cuts cuts={CLOSE} vo={VO} musicFrom={CLOSE_MUSIC_FROM} cues={CLOSE_CUES} extra={CLOSE_EXTRA} />;
