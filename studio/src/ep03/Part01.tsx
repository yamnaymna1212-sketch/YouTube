import React from 'react';
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { Calculator, Globe, KeyRound, Landmark, ShieldQuestion, Siren, Smartphone, Swords, Volume2, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Card, P } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Monitor, Skyline, Src, TimeChip, WhatIf, cond2 } from './StyleFrames';
import { FPS, fr, partEnd, partStart, shotT, wordT } from './t';

// ===== shared EP03 building blocks =====

/** A shot placed on the tight-VO timeline (seconds). Children see local frames from 0. */
export const At: React.FC<{ from: number; to: number; base: number; children: React.ReactNode; name?: string }> = ({ from, to, base, children, name }) => (
  <Sequence from={fr(from - base)} durationInFrames={Math.max(1, fr(to - from))} name={name}>{children}</Sequence>
);

/** Linked transitions: every shot enters through one of these, so no plain cut between unrelated images. */
export const Enter: React.FC<{ kind: 'zoom' | 'slideL' | 'slideR' | 'drop' | 'fade' | 'none'; children: React.ReactNode; dur?: number }> = ({ kind, children, dur = 14 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 20, stiffness: 120 }, durationInFrames: dur });
  const o = interpolate(f, [0, dur * 0.6], [0, 1], { extrapolateRight: 'clamp' });
  const tr = kind === 'zoom' ? `scale(${interpolate(s, [0, 1], [1.35, 1])})` : kind === 'slideL' ? `translateX(${(1 - s) * 1920}px)` : kind === 'slideR' ? `translateX(${-(1 - s) * 1920}px)` : kind === 'drop' ? `translateY(${-(1 - s) * 1080}px)` : 'none';
  return <AbsoluteFill style={{ transform: tr, opacity: kind === 'none' || kind.startsWith('slide') || kind === 'drop' ? 1 : o, filter: kind === 'zoom' ? `blur(${(1 - s) * 10}px)` : 'none' }}>{children}</AbsoluteFill>;
};

/** Slow camera push on any shot (never static). */
export const Push: React.FC<{ children: React.ReactNode; from?: number; to?: number; ox?: string; dur?: number }> = ({ children, from = 1, to = 1.06, ox = '50% 50%', dur = 300 }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ transformOrigin: ox, transform: `scale(${interpolate(f, [0, dur], [from, to], { extrapolateRight: 'clamp' })})` }}>{children}</AbsoluteFill>;
};

const SOFT = new Set(['tick', 'type', 'counter', 'paper']);
export type Cue3 = [number, string, number?]; // [tight-VO seconds, sfx, volume ≤ 0.1]
/** VO + music for one part, trimmed to the part window, plus soft SFX (capped at 0.1). */
export const PartSound: React.FC<{ base: number; cues?: Cue3[]; siren?: boolean }> = ({ base, cues = [], siren }) => (
  <>
    <Audio src={staticFile('iran/vo/tight/vo_full.mp3')} trimBefore={fr(base)} volume={1} />
    <Audio src={staticFile('iran/audio/music_ep03.mp3')} trimBefore={fr(base)} volume={0.07} />
    {siren && (
      <Sequence from={fr(2.4 - base)} layout="none">
        <Audio src={staticFile('iran/sfx/siren_distant.wav')} volume={(f) => (f < fr(0.3) ? 0.9 : interpolate(f, [fr(0.3), fr(2.9), fr(3.6)], [0.9, 0.9, 0.22], { extrapolateRight: 'clamp' }))} />
      </Sequence>
    )}
    {cues.filter(([, n]) => SOFT.has(n)).map(([t, n, v = 0.07], i) => (
      <Sequence key={i} from={fr(t - base)} durationInFrames={90} layout="none"><Audio src={staticFile(`iran/audio/sfx_${n}.wav`)} volume={Math.min(v, 0.1)} /></Sequence>
    ))}
  </>
);

// ===== Part 1 · Cold open (vo_00) =====
const B = partStart('vo_00'); // 0
const END = partEnd('vo_00');
const SIREN_A = 2.36, SIREN_B = 5.32; // siren gap on the tight take
const rel = (sec: number, shotStart: number) => fr(sec - shotStart); // frame inside a shot

// 1 · 4:00 — the clock
const Clock: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.6 + Math.sin(f / 5) * 0.1;
  const digits = f < 20 ? '3:59' : '4:00';
  return (
    <AbsoluteFill style={{ background: '#05070B', alignItems: 'center', justifyContent: 'center' }}>
      <Push to={1.12} dur={70}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: F.mono, fontSize: 340, color: '#E5483B', letterSpacing: 10, textShadow: `0 0 ${60 * glow}px rgba(229,72,59,.9)` }}>{digits}</div>
          <div style={{ fontFamily: F.mono, fontSize: 30, color: 'rgba(229,72,59,.55)', letterSpacing: 8, marginTop: 10 }}>AM</div>
        </AbsoluteFill>
      </Push>
      <WhatIf dark /><Grain />
    </AbsoluteFill>
  );
};

// 2 · siren gap — the room fills with a red pulse; siren badge over the window
const RoomSiren: React.FC<{ look?: boolean }> = ({ look }) => {
  const f = useCurrentFrame();
  const pulse = (Math.sin(f / 6) + 1) / 2;
  return (
    <AbsoluteFill style={{ background: '#121B2C' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 180, background: '#0C1320', borderTop: `4px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 980, top: 130, width: 760, height: 620, border: `10px solid ${P.bone}`, outline: `5px solid ${P.ink}`, overflow: 'hidden', background: 'linear-gradient(#1D2B4A, #3A3150)' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 75%, rgba(180,69,47,${0.25 + pulse * 0.5}), transparent 60%)` }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 760 }}><Skyline y={620} color="#18223A" lit seed="w1" /></div>
        {[0, 1, 2].map((k) => { const r = ((f / 30 + k / 3) % 1); return <div key={k} style={{ position: 'absolute', left: 540 - r * 420, top: 470 - r * 420, width: r * 840, height: r * 840, borderRadius: '50%', border: `4px solid rgba(246,241,228,${0.55 * (1 - r)})` }} />; })}
        <div style={{ position: 'absolute', left: 372, top: 0, width: 10, height: 620, background: P.bone, borderLeft: `3px solid ${P.ink}`, borderRight: `3px solid ${P.ink}` }} />
      </div>
      <div style={{ position: 'absolute', left: 1700, top: 100, width: 120, height: 720, background: '#2E3E5E', border: `4px solid ${P.ink}`, borderRadius: '0 0 30px 30px', transform: `skewX(${noise2D('cur', f / 50, 0) * 2.5}deg)` }} />
      <div style={{ position: 'absolute', left: 60, top: 900, width: 620, height: 120, background: '#3B3350', border: `4px solid ${P.ink}`, borderRadius: 14 }} />
      <div style={{ position: 'absolute', left: 80, top: 860, width: 200, height: 60, background: P.bone, border: `4px solid ${P.ink}`, borderRadius: 30 }} />
      <div style={{ position: 'absolute', left: 120, top: 760, width: 300, height: 140, background: '#2A2335', border: `4px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 150, top: 680, width: 170, height: 80, background: '#0A0E16', border: `4px solid ${P.ink}`, borderRadius: 10, fontFamily: F.mono, fontSize: 52, color: '#E5483B', textAlign: 'center', lineHeight: '74px', textShadow: '0 0 14px rgba(229,72,59,.8)' }}>4:00</div>
      <LiveJake pose={look ? 'stand' : 'shrug'} seed="p1jake" face={{ look: look ? 1 : 0.3 }} beats={look ? [{ at: 10, r: 'worry', hold: 400 }] : [{ at: 4, r: 'surprise', hold: 400 }]} style={{ position: 'absolute', left: look ? 760 : 640, top: 230, height: 860 }} />
      <AbsoluteFill style={{ background: `rgba(180,69,47,${pulse * 0.14})` }} />
      {!look && <Badge I={Siren} x={1360} y={300} at={4} size={150} />}
      <WhatIf dark /><TimeChip t="04:00" label="DAY 0 · JAKE'S APARTMENT" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 4 · the sky — roar + phone alert
const Sky: React.FC<{ alertAt: number; roarAt: number }> = ({ alertAt, roarAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const alert = spring({ frame: f - alertAt, fps, config: { damping: 13, stiffness: 150 } });
  const shake = f > roarAt ? noise2D('sh', f / 3, 0) * 4 : 0;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#0E1424 0%, #2B2546 60%, #5A3140 100%)', transform: `translate(${shake}px, ${shake / 2}px)` }}>
      {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: 300 + k * 600, bottom: 200, width: 60, height: 1100, transformOrigin: '50% 100%', transform: `rotate(${Math.sin(f / 40 + k * 2) * 25}deg)`, background: 'linear-gradient(transparent, rgba(246,241,228,.16))' }} />)}
      {f > roarAt && [0, 1].map((k) => { const t = (((f - roarAt) / 70 + k * 0.5) % 1); return <div key={k} style={{ position: 'absolute', left: -300 + t * 2400, top: 120 + k * 140 - t * 60, width: 380, height: 5, background: 'linear-gradient(90deg, transparent, rgba(246,241,228,.85))', transform: 'rotate(-6deg)' }} />; })}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920 }}><Skyline y={1080} color="#151C2E" lit seed="w2" h={1.6} /></div>
      <div style={{ position: 'absolute', left: 160, top: 360, width: 560, height: 720, background: '#2A3550', border: `5px solid ${P.ink}` }}>
        {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: 'absolute', left: 40 + (k % 2) * 380, top: 450 + Math.floor(k / 2) * 130, width: 90, height: 80, background: k === 1 ? '#E9C46A' : '#1B2440', border: `4px solid ${P.ink}` }} />)}
        <div style={{ position: 'absolute', left: 120, top: 90, width: 320, height: 300, background: '#E9C46A', border: `6px solid ${P.ink}`, overflow: 'hidden' }}>
          <LiveJake pose="shrug" seed="p1sky" beats={[{ at: 0, r: 'worry', hold: 600 }, { at: roarAt, r: 'surprise', hold: 30 }]} face={{ lookY: -0.8 }} style={{ position: 'absolute', left: 70, top: 20, height: 520 }} />
        </div>
      </div>
      <Badge I={Volume2} x={930} y={300} at={roarAt} size={130} />
      <div style={{ position: 'absolute', left: 1120, top: 330, width: 620, transform: `scale(${alert}) rotate(2deg)`, transformOrigin: '20% 50%', background: P.bone, border: `5px solid ${P.ink}`, boxShadow: '12px 12px 0 rgba(0,0,0,.35)', padding: '26px 32px', borderRadius: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Smartphone size={40} color={P.red} strokeWidth={2.4} /><div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: P.red, letterSpacing: 2 }}>EMERGENCY ALERT</div></div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 64, color: P.ink, lineHeight: 1.05, marginTop: 12 }}>Seek shelter now.</div>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: '#6b6250', marginTop: 14 }}>story element · not a real alert</div>
      </div>
      <WhatIf dark /><TimeChip t="04:00:05" label="DAY 0 · OUTSIDE" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 5 · the hallway — Jake runs to the key
const Hall: React.FC<{ keyAt: number }> = ({ keyAt }) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 100], [-200, 1050], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#1A2336' }}>
      {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 240 - ((f * 3) % 240), top: 0, width: 6, height: 860, background: 'rgba(0,0,0,.25)' }} />)}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, bottom: 0, background: '#2A2335', borderTop: `5px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 1300, top: 220, width: 300, height: 640, background: '#3A2F2A', border: `6px solid ${P.ink}` }}><div style={{ position: 'absolute', right: 30, top: 320, width: 26, height: 26, borderRadius: 13, background: P.amber, border: `4px solid ${P.ink}` }} /></div>
      <div style={{ position: 'absolute', left: 1120, top: 330, width: 120, height: 16, background: P.bone, border: `4px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 1160, top: 346, transformOrigin: '50% 0', transform: `rotate(${Math.sin(f / 6) * 14}deg)` }}><KeyRound size={70} color={P.amber} strokeWidth={2.6} /></div>
      <LiveJake pose="stand" walk seed="p1hall" beats={[{ at: 0, r: 'worry', hold: 600 }]} style={{ position: 'absolute', left: x, top: 240, height: 820 }} />
      <Badge I={KeyRound} x={1180} y={180} at={keyAt} size={120} label="THE KEY" />
      <WhatIf dark /><TimeChip t="04:00:21" label="DAY 0 · HALLWAY" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 6 · grandfather's shelter — real 1963 civil-defence film as a taped print, then the bunker
const Grandpa: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 15, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      <Push to={1.08} dur={260}>
        <div style={{ position: 'absolute', left: 260, top: 120, width: 1400, transform: `translateY(${(1 - s) * 60}px) rotate(-1.5deg)`, background: P.bone, padding: 18, paddingBottom: 70, border: `4px solid ${P.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.25)' }}>
          <div style={{ height: 760, overflow: 'hidden', border: `3px solid ${P.ink}` }}>
            <OffthreadVideo src={staticFile('iran/footage/af1963_family_shelter.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.25) saturate(.8) contrast(1.05)' }} />
          </div>
          <div style={{ position: 'absolute', left: 22, bottom: 20, fontFamily: F.mono, fontSize: 22, color: P.ink }}>"About Fallout" (1963), U.S. Office of Civil Defense film · public domain</div>
          <div style={{ position: 'absolute', left: -20, top: -16, width: 120, height: 36, background: 'rgba(217,164,65,.55)', transform: 'rotate(-28deg)' }} />
          <div style={{ position: 'absolute', right: -20, top: -16, width: 120, height: 36, background: 'rgba(217,164,65,.55)', transform: 'rotate(28deg)' }} />
        </div>
      </Push>
      <Card x={1600} y={150} at={8} size={64} rot={3}>1960s</Card>
      <WhatIf /><Bug /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

const BunkerOn: React.FC = () => {
  const f = useCurrentFrame();
  const on = (k: number) => (f > 6 + k * 5 ? 1 : 0);
  const sway = Math.sin(f / 30) * 4;
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      {Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: (i % 8) * 250 - ((Math.floor(i / 8) % 2) * 125), top: Math.floor(i / 8) * 130, width: 246, height: 126, background: '#24272E', border: '2px solid #15171B' }} />)}
      <div style={{ position: 'absolute', left: 960, top: 0, width: 4, height: 150, background: P.ink, transformOrigin: '50% 0', transform: `rotate(${sway}deg)` }}><div style={{ position: 'absolute', left: -16, top: 150, width: 36, height: 44, borderRadius: '50% 50% 45% 45%', background: '#F2D488', boxShadow: '0 0 120px 60px rgba(242,212,136,.22)' }} /></div>
      <div style={{ opacity: on(0) }}><Monitor x={300} y={180} w={620} h={360} src="sayed/real/nasa_iss074e0334264.jpg" label="CAM 01 · CITY (NASA ISS photo)" /></div>
      <div style={{ opacity: on(1) }}><Monitor x={960} y={180} w={620} h={360} src="sayed/real/nasa_iss075e0227352.jpg" label="CAM 02 · REGION (NASA ISS photo)" off={200} /></div>
      <div style={{ opacity: on(2) }}><Monitor x={300} y={570} w={620} h={300} label="CAM 03 · SIGNAL LOST" /></div>
      <div style={{ opacity: on(3) }}><Monitor x={960} y={570} w={620} h={300} src="iran/hormuz_s04-37-716.jpg" label="FEED · STRAIT OF HORMUZ (NASA)" off={400} flicker /></div>
      <div style={{ position: 'absolute', left: 200, top: 890, width: 1520, height: 190, background: '#2D2A26', borderTop: `5px solid ${P.ink}` }} />
      <LiveJake pose="think" seed="p1bunk" face={{ look: -0.2, lookY: -0.5 }} beats={[{ at: 0, r: 'worry', hold: 600 }]} style={{ position: 'absolute', left: 1500, top: 380, height: 760, filter: 'brightness(.85)' }} />
      <WhatIf dark /><TimeChip t="04:01" label="DAY 0 · THE SHELTER" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 7 · What-if card: three badges (real war · real laws · real numbers)
const WhatIfCard: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => (
  <AbsoluteFill>
    <div style={{ position: 'absolute', inset: 0, filter: 'blur(14px) brightness(.45)' }}><BunkerOn /></div>
    <Headline kicker="HYPOTHETICAL · NOT A PREDICTION" dark x={150} y={170} size={150}>What if?</Headline>
    <Badge I={Swords} x={480} y={640} at={a} size={190} label="A REAL WAR" />
    <Badge I={Landmark} x={960} y={640} at={b} size={190} label="REAL LAWS" />
    <Badge I={Calculator} x={1440} y={640} at={c} size={190} label="REAL NUMBERS" />
    <WhatIf dark /><Bug dark /><Grain />
  </AbsoluteFill>
);

// 8 · the rings promise: six empty rings on the real map; world + wallet badges; ring 5 = the one that could stop it
const RingsPromise: React.FC<{ world: number; wallet: number; ringsAt: number; lastAt: number }> = ({ world, wallet, ringsAt, lastAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const radii = [70, 150, 240, 330, 420, 510];
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <Push from={1.3} to={1.05} dur={340}><Img src={staticFile('iran/hormuz_s04-37-716.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.5) saturate(.6) brightness(.75)' }} /></Push>
      {radii.map((r, i) => {
        const s = spring({ frame: f - ringsAt - i * 5, fps, config: { damping: 16, stiffness: 90 } });
        const last = i === 5 && f > lastAt;
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', left: 960 - r * s, top: 560 - r * s, width: 2 * r * s, height: 2 * r * s, borderRadius: '50%', border: `${last ? 9 : 5}px dashed ${last ? P.red : 'rgba(246,241,228,.85)'}`, boxShadow: last ? '0 0 40px rgba(180,69,47,.7)' : 'none' }} />
            <div style={{ position: 'absolute', left: 960 + r * 0.71 * s - 26, top: 560 - r * 0.71 * s - 26, width: 52, height: 52, borderRadius: 26, background: last ? P.red : P.bone, border: `4px solid ${P.ink}`, fontFamily: F.mono, fontSize: 28, color: last ? P.bone : P.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: s }}>{i}</div>
          </React.Fragment>
        );
      })}
      <Badge I={Globe} x={330} y={760} at={world} size={170} label="THE WORLD" />
      <Badge I={Wallet} x={1590} y={760} at={wallet} size={170} label="YOUR POCKET" />
      {f > lastAt && <Badge I={ShieldQuestion} x={960 + 510 * 0.71 + 90} y={560 - 510 * 0.71 + 40} at={lastAt} size={120} label="RING 5" />}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 170, background: 'linear-gradient(rgba(12,13,16,.9), transparent)' }} />
      <Src dark style={{ left: 70, bottom: 40 }}>Map: NASA STS-4 photo S04-37-716 (1982), public domain</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

export const EP03Part01: React.FC = () => {
  const t3 = shotT('3'), t4 = shotT('4'), t5 = shotT('5'), t6 = shotT('6'), t7 = shotT('7');
  const tBunker = wordT('5', 'tonight');
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={0} to={SIREN_A} name="1 clock"><Clock /></At>
      <At base={B} from={SIREN_A} to={SIREN_B} name="2 siren"><Enter kind="fade" dur={6}><RoomSiren /></Enter></At>
      <At base={B} from={SIREN_B} to={t3} name="3 window"><Push to={1.18} ox="70% 45%" dur={fr(t3 - SIREN_B)}><RoomSiren look /></Push></At>
      <At base={B} from={t3} to={t4} name="4 sky"><Enter kind="zoom"><Sky roarAt={rel(wordT('3', 'roar'), t3)} alertAt={rel(wordT('3', 'phone'), t3)} /></Enter></At>
      <At base={B} from={t4} to={t5} name="5 hall"><Enter kind="slideL"><Hall keyAt={rel(wordT('4', 'key'), t4)} /></Enter></At>
      <At base={B} from={t5} to={tBunker} name="6 grandpa"><Enter kind="drop"><Grandpa /></Enter></At>
      <At base={B} from={tBunker} to={t6} name="6b bunker"><Enter kind="zoom" dur={10}><BunkerOn /></Enter></At>
      <At base={B} from={t6} to={t7} name="7 what if"><Enter kind="fade" dur={10}><WhatIfCard a={rel(wordT('6', 'war'), t6)} b={rel(wordT('6', 'laws'), t6)} c={rel(wordT('6', 'numbers'), t6)} /></Enter></At>
      <At base={B} from={t7} to={END} name="8 rings"><Enter kind="zoom"><RingsPromise world={rel(wordT('7', 'world'), t7)} wallet={rel(wordT('7', 'pocket'), t7)} ringsAt={rel(wordT('7', 'ring'), t7)} lastAt={rel(wordT('7', 'last'), t7)} /></Enter></At>
      <PartSound base={B} siren cues={[[wordT('3', 'phone'), 'type', 0.06], [wordT('4', 'key'), 'tick', 0.07], [t5 + 0.2, 'paper', 0.07], [wordT('6', 'war'), 'tick', 0.05], [wordT('6', 'laws'), 'tick', 0.05], [wordT('6', 'numbers'), 'tick', 0.05]]} />
    </AbsoluteFill>
  );
};
export const EP03_P1_FRAMES = fr(END - B);
