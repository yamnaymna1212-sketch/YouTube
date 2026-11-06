import React from 'react';
import { AbsoluteFill, OffthreadVideo, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Battery, BatteryCharging, BedDouble, Car, CreditCard, Croissant, Droplets, Globe, Hospital, Milestone, PawPrint, Play, SignalZero, Smartphone, Sprout, Store, Users, Wind, Banknote } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Card, P, Pawn } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Monitor, Src, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound, Push } from './Part01';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_04');
const END = partEnd('vo_04');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

const Town: React.FC<{ dim?: number }> = ({ dim = 0 }) => (
  <AbsoluteFill style={{ background: '#E4DAC0' }}>
    <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
      {Array.from({ length: 26 }).map((_, i) => Array.from({ length: 15 }).map((__, j) => <rect key={i + '-' + j} x={20 + i * 74} y={20 + j * 72} width={60} height={58} rx={6} fill={random('b' + i + j) > 0.2 ? '#D3C7A7' : '#B9C9A3'} stroke="#B8AA86" strokeWidth="2" />))}
      <path d="M -20 820 C 300 760 520 900 860 860 C 1200 820 1400 980 1940 900" fill="none" stroke="#8FA9B8" strokeWidth="60" opacity="0.9" />
      <path d="M 0 300 L 1920 420 M 1180 0 L 1060 1080" stroke={P.bone} strokeWidth="22" />
    </svg>
    <AbsoluteFill style={{ background: `rgba(27,34,48,${dim})` }} />
  </AbsoluteFill>
);

/** One vignette: a citizen pawn + a big role badge + secondary badges that pop on the words. */
const Vignette: React.FC<{ kicker: string; title: string; role: any; base: string; items: { I: any; at: number; label: string; hit?: boolean }[]; children?: React.ReactNode; seed: string }> = ({ kicker, title, role, base, items, children, seed }) => (
  <AbsoluteFill>
    <Town dim={0.55} />
    <Headline kicker={kicker} dark x={90} y={90} size={110}>{title}</Headline>
    <Pawn x={360} y={860} base={base} scale={1.5} seed={seed} hop={4} />
    <Badge I={role} x={360} y={400} at={0} size={200} />
    {items.map((it, i) => <Badge key={i} I={it.I} x={820 + (i % 3) * 360} y={520 + Math.floor(i / 3) * 300} at={it.at} hit={it.hit ? it.at + 10 : -1} size={170} label={it.label} />)}
    {children}
    <WhatIf dark /><Bug dark /><Grain k={0.05} />
  </AbsoluteFill>
);

// 31 · three people
const Three: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => (
  <AbsoluteFill>
    <Push to={1.06} dur={130}><Town /></Push>
    <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 230, background: P.ink }} />
    <Headline kicker="THE FIRST HOUR · THE NEAREST TOWN" dark x={70} y={100} size={96}>Three people</Headline>
    <Pawn x={500} y={760} base={P.blue} scale={1.1} seed="drv" hop={a} /><Badge I={Car} x={500} y={440} at={a} size={150} label="DRIVER" />
    <Pawn x={960} y={760} base={P.red} scale={1.1} seed="nrs" hop={b} /><Badge I={Hospital} x={960} y={440} at={b} size={150} label="NURSE" />
    <Pawn x={1420} y={760} base={P.amber} scale={1.1} seed="shp" hop={c} /><Badge I={Store} x={1420} y={440} at={c} size={150} label="SHOPKEEPER" />
    <WhatIf dark /><Bug left /><Grain k={0.04} />
  </AbsoluteFill>
);

// 32 · the driver: cars stack up, signal drops
const Jam: React.FC<{ jamAt: number }> = ({ jamAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <>{Array.from({ length: 9 }).map((_, i) => {
      const s = sp(f, jamAt + i * 3, fps, 14, 160);
      return <div key={i} style={{ position: 'absolute', left: 700 + i * 125, top: 330, transform: `translateX(${(1 - s) * 400}px)`, opacity: s }}><div style={{ width: 110, height: 70, borderRadius: 18, background: i % 3 ? P.bone : P.red, border: `5px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Car size={50} color={i % 3 ? P.ink : P.bone} /></div></div>;
    })}</>
  );
};

// 35 · wind over animals, water, crops — with the real 1963 crops animation
const Wind35: React.FC<{ windAt: number; animAt: number; waterAt: number; cropAt: number }> = ({ windAt, animAt, waterAt, cropAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, windAt, fps, 15, 110);
  return (
    <AbsoluteFill>
      <Town dim={0.35} />
      {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: 'absolute', left: -600 + ((f * 9 + k * 520) % 2600), top: 300 + k * 150, width: 520, height: 8, borderRadius: 4, background: 'rgba(246,241,228,.75)' }} />)}
      <Headline kicker="THE DUST" dark x={90} y={90} size={110}>The wind decides</Headline>
      <Badge I={Wind} x={1640} y={230} at={windAt} size={170} label="WIND" />
      <Badge I={PawPrint} x={820} y={560} at={animAt} size={170} label="ANIMALS" />
      <Badge I={Droplets} x={1180} y={560} at={waterAt} size={170} label="WATER" />
      <Badge I={Sprout} x={1540} y={560} at={cropAt} size={170} label="CROPS" />
      <div style={{ position: 'absolute', left: 90, top: 420, width: 560, transform: `rotate(-2deg) translateY(${(1 - s) * 60}px)`, opacity: s, background: P.bone, padding: 12, paddingBottom: 44, border: `4px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.25)' }}>
        <div style={{ height: 330, overflow: 'hidden', border: `2px solid ${P.ink}` }}><OffthreadVideo src={staticFile('iran/footage/af1963_crops_fallout.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        <div style={{ position: 'absolute', left: 14, bottom: 12, fontFamily: F.mono, fontSize: 15, color: P.ink }}>"About Fallout" (1963), U.S. Office of Civil Defense · PD</div>
      </div>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// 35a · online: real / old / never real
const Feeds: React.FC<{ realAt: number; oldAt: number; fakeAt: number }> = ({ realAt, oldAt, fakeAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const tags = [{ x: 360, at: realAt, t: 'REAL', c: '#4E7A4A' }, { x: 960, at: oldAt, t: 'YEARS OLD', c: P.amber }, { x: 1560, at: fakeAt, t: 'NEVER REAL', c: P.red }];
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <Headline kicker="ONLINE" dark x={90} y={90} size={110}>Faster than facts</Headline>
      {tags.map((g, i) => {
        const s = sp(f, i * 6, fps, 14, 140); const st = sp(f, g.at, fps, 9, 200);
        return (
          <div key={i} style={{ position: 'absolute', left: g.x - 210, top: 300, width: 420, height: 640, transform: `scale(${s})`, background: '#1E2330', border: `7px solid ${P.bone}`, borderRadius: 40, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 30, right: 30, top: 60, height: 300, background: '#2E3446', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Play size={110} color={P.bone} fill={P.bone} /></div>
            <Smartphone size={60} color="rgba(246,241,228,.4)" style={{ position: 'absolute', left: 180, bottom: 40 }} />
            {f > g.at && <div style={{ position: 'absolute', left: '50%', top: 450, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-8deg)`, opacity: st, border: `7px solid ${g.c}`, color: g.c, padding: '4px 18px', fontFamily: cond2, fontWeight: 700, fontSize: 56, whiteSpace: 'nowrap', background: 'rgba(12,13,16,.7)' }}>{g.t}</div>}
          </div>
        );
      })}
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// 35b · roads to the borders fill with families
const Borders: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Town dim={0.45} />
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        {[[760, 650, 1880, 200], [760, 650, 1880, 900], [760, 650, 60, 1040]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={P.amber} strokeWidth={16} strokeDasharray="34 20" strokeDashoffset={-f * 3} opacity={interpolate(f - at - i * 8, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />)}
        <line x1={1840} y1={0} x2={1840} y2={1080} stroke={P.red} strokeWidth={10} strokeDasharray="10 14" />
      </svg>
      {Array.from({ length: 8 }).map((_, i) => { const t = (((f - at) / 160 + i / 8) % 1 + 1) % 1; return f > at ? <div key={i} style={{ position: 'absolute', left: 760 + (1880 - 760) * t - 30, top: 650 + (i % 2 ? (200 - 650) : (900 - 650)) * t - 30 }}><Users size={60} color={P.bone} /></div> : null; })}
      <Card x={1700} y={110} at={at} size={44} rot={3}>Border</Card>
      <Headline kicker="BY THE END OF DAY ONE" dark x={90} y={90} size={110} at={0}>Families leave</Headline>
      <Badge I={Milestone} x={300} y={420} at={at} size={170} label="TO THE BORDERS" />
      <WhatIf dark /><Bug left /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// 36 · back in the shelter: three screens = three people; then the next ring
const Screens36: React.FC<{ nextAt: number }> = ({ nextAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const g = sp(f, nextAt, fps, 12, 120);
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      {Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: (i % 8) * 250 - ((Math.floor(i / 8) % 2) * 125), top: Math.floor(i / 8) * 130, width: 246, height: 126, background: '#24272E', border: '2px solid #15171B' }} />)}
      {[[Car, 'DRIVER'], [Hospital, 'NURSE'], [Store, 'SHOPKEEPER']].map(([I, l]: any, i) => (
        <div key={i} style={{ position: 'absolute', left: 140 + i * 430, top: 220, width: 400, height: 300, background: '#05070B', border: '8px solid #2B2F38', outline: `4px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
          <I size={120} color={P.bone} strokeWidth={2} /><div style={{ fontFamily: F.mono, fontSize: 22, color: '#cfd6e2' }}>{l}</div>
        </div>
      ))}
      <Monitor x={140} y={570} w={1260} h={330} src="iran/hormuz_s04-37-716.jpg" label="NEXT · THE REGION" />
      <div style={{ position: 'absolute', left: 770, top: 735, transform: `translate(-50%,-50%) scale(${g})` }}><Globe size={200} color={P.amber} strokeWidth={2} /></div>
      <LiveJake pose="think" seed="p5end" beats={[{ at: 0, r: 'worry', hold: 120 }, { at: nextAt, r: 'surprise', hold: 300 }]} style={{ position: 'absolute', left: 1460, top: 300, height: 820 }} />
      <WhatIf dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part05: React.FC = () => {
  const s = (id: string) => shotT(id);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('31')} to={s('32')} name="31"><Enter kind="fade"><Three a={0} b={rel(wordT('31', 'three'), s('31'))} c={rel(wordT('31', 'people'), s('31'))} /></Enter></At>
      <At base={B} from={s('32')} to={s('33')} name="32 driver"><Enter kind="slideL"><Vignette seed="drv2" kicker="THE DRIVER" title="Everyone leaves" role={Car} base={P.blue} items={[{ I: Car, at: rel(wordT('32', 'jam'), s('32')), label: 'ROADS JAM', hit: true }, { I: SignalZero, at: rel(wordT('32', 'phone'), s('32')), label: 'NO SIGNAL', hit: true }]}><Jam jamAt={rel(wordT('32', 'jam'), s('32'))} /></Vignette></Enter></At>
      <At base={B} from={s('33')} to={s('34')} name="33 nurse"><Enter kind="slideL"><Vignette seed="nrs2" kicker="THE NURSE" title="Backup power" role={Hospital} base={P.red} items={[{ I: BatteryCharging, at: rel(wordT('33', 'backup'), s('33')), label: 'BACKUP POWER' }, { I: BedDouble, at: rel(wordT('33', 'full'), s('33')), label: 'FULL', hit: true }]} /></Enter></At>
      <At base={B} from={s('34')} to={s('35')} name="34 shop"><Enter kind="slideL"><Vignette seed="shp2" kicker="THE SHOPKEEPER" title="Cash only" role={Store} base={P.amber} items={[{ I: Droplets, at: rel(wordT('34', 'water'), s('34')), label: 'WATER' }, { I: Croissant, at: rel(wordT('34', 'bread'), s('34')), label: 'BREAD' }, { I: Battery, at: rel(wordT('34', 'batteries'), s('34')), label: 'BATTERIES' }, { I: CreditCard, at: rel(wordT('34', 'card'), s('34')), label: 'CARDS DOWN', hit: true }, { I: Banknote, at: rel(wordT('34', 'cash'), s('34')), label: 'CASH ONLY' }]} /></Enter></At>
      <At base={B} from={s('35')} to={s('35a')} name="35 wind"><Enter kind="fade"><Wind35 windAt={rel(wordT('35', 'wind'), s('35'))} animAt={rel(wordT('35', 'animals'), s('35'))} waterAt={rel(wordT('35', 'water'), s('35'))} cropAt={rel(wordT('35', 'crops'), s('35'))} /></Enter></At>
      <At base={B} from={s('35a')} to={s('35b')} name="35a online"><Enter kind="zoom"><Feeds realAt={rel(wordT('35a', 'real'), s('35a'))} oldAt={rel(wordT('35a', 'old'), s('35a'))} fakeAt={rel(wordT('35a', 'never'), s('35a'))} /></Enter></At>
      <At base={B} from={s('35b')} to={s('36')} name="35b borders"><Enter kind="slideL"><Borders at={rel(wordT('35b', 'roads'), s('35b'))} /></Enter></At>
      <At base={B} from={s('36')} to={END} name="36 screens"><Enter kind="zoom"><Screens36 nextAt={rel(wordT('36', 'ring'), s('36'))} /></Enter></At>
      <PartSound base={B} cues={[[wordT('32', 'phone'), 'tick', 0.05], [wordT('34', 'cash'), 'counter', 0.05], [wordT('35a', 'online'), 'type', 0.05], [wordT('35a', 'never'), 'paper', 0.06]]} />
    </AbsoluteFill>
  );
};
export const EP03_P5_FRAMES = fr(END - B);
