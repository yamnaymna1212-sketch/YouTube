import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bomb, Cpu, Flame, Fuel, Globe, Hourglass, Plane, Rocket, Shield, ShieldAlert, ShieldOff, Ship, Tag, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Card, P } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Print, Src, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound, Push } from './Part01';
import { Flag, FlagLabel, FilmPrint } from './Real';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_05');
const END = partEnd('vo_05');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

/** The real NASA photo of the strait, with the shipping lane and tankers. `stopAt` freezes traffic and turns the lane red. */
const Strait: React.FC<{ zoom?: [number, number]; stopAt?: number; children?: React.ReactNode; tankers?: boolean }> = ({ zoom = [1.12, 1.18], stopAt = -1, children, tankers = true }) => {
  const f = useCurrentFrame();
  const stopped = stopAt >= 0 && f > stopAt;
  const tf = stopped ? stopAt : f;
  const z = interpolate(f, [0, 300], zoom, { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: P.ink, overflow: 'hidden' }}>
      <Img src={staticFile('iran/hormuz_s04-37-716.jpg')} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.5) saturate(.65) contrast(1.08) brightness(.88)', transform: `scale(${z})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.85) 0%, rgba(12,13,16,.35) 45%, transparent 70%)' }} />
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        <path d="M 1880 980 C 1600 820 1450 640 1300 560 C 1150 480 1000 470 860 380" fill="none" stroke={stopped ? P.red : P.amber} strokeWidth="14" strokeDasharray="34 22" strokeDashoffset={-tf * 3} strokeLinecap="round" />
      </svg>
      {tankers && [0, 1, 2].map((k) => {
        const t = ((tf / 120 + k / 3) % 1);
        const x = interpolate(t, [0, 1], [1850, 880]), y = interpolate(t, [0, 0.5, 1], [960, 560, 390]);
        return <div key={k} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)' }}><Badge I={Ship} x={0} y={0} size={74} hit={stopped ? stopAt : -1} /></div>;
      })}
      {children}
      <Src dark style={{ left: 74, bottom: 40 }}>Map: NASA STS-4 photo S04-37-716 (1982), public domain</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

const Big: React.FC<{ n: string; line: string; kicker: string; at?: number; y?: number }> = ({ n, line, kicker, at = 0, y = 330 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <>
      <Headline kicker={kicker} dark at={at} y={y} size={210}>{n}</Headline>
      <div style={{ position: 'absolute', left: 74, top: y + 260, fontFamily: F.sans, fontWeight: 700, fontSize: 60, color: P.bone, lineHeight: 1.12, whiteSpace: 'pre-line', opacity: sp(f, at + 10, fps, 18) }}>{line}</div>
    </>
  );
};

// 37 · zoom out from the island
const ZoomOut: React.FC<{ at: number }> = ({ at }) => (
  <Strait zoom={[1.9, 1.12]} tankers={false}>
    <Card x={1330} y={470} at={at} size={60} rot={-2}>Strait of Hormuz</Card>
    <FlagLabel c="ir" name="Iran" x={1080} y={210} at={at + 8} />
    <FlagLabel c="om" name="Oman" x={1560} y={900} at={at + 14} />
    <FlagLabel c="ae" name="U.A.E." x={1000} y={860} at={at + 20} />
    <Headline kicker="RING 2 · THE FIRST WEEK" dark y={330} size={120} at={at}>The region</Headline>
  </Strait>
);

// 39 · insurance pulled → ships stop
const Insurance: React.FC<{ insAt: number; stopAt: number; attAt: number }> = ({ insAt, stopAt, attAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const st = sp(f, stopAt, fps, 9, 200);
  return (
    <Strait stopAt={stopAt}>
      <Headline kicker="WITHOUT INSURANCE" dark y={300} size={130} at={0}>Tankers don't sail</Headline>
      <Badge I={ShieldOff} x={300} y={720} at={insAt} hit={insAt + 10} size={170} label="INSURANCE" />
      {f > attAt && <Badge I={Flame} x={640} y={720} at={attAt} size={150} label="TANKER ATTACKS" />}
      <FilmPrint src="iran/footage/navy1968_ship_side.mp4" x={1300} y={150} w={520} h={300} rot={2} at={6} caption="Ship at sea · U.S. Navy film, 1968 · CC0" />
      {f > stopAt && <div style={{ position: 'absolute', left: 1330, top: 640, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-8deg)`, opacity: st, border: `8px solid ${P.red}`, padding: '4px 26px', fontFamily: cond2, fontWeight: 700, fontSize: 90, color: P.red, background: 'rgba(12,13,16,.6)', letterSpacing: 6 }}>STOPPED</div>}
    </Strait>
  );
};

// 40 · Iran's ways to answer
const Answers: React.FC<{ a: number; b: number; c: number; d: number }> = ({ a, b, c, d }) => (
  <Strait stopAt={0}>
    <Headline kicker="IRAN'S OPTIONS" dark y={150} size={120} at={0}>Ways to answer</Headline>
    <Badge I={Rocket} x={240} y={600} at={a} size={170} label="MISSILES" />
    <Badge I={Bomb} x={560} y={600} at={b} size={170} label="MINES" />
    <Badge I={Plane} x={240} y={880} at={c} size={170} label="DRONES" />
    <Badge I={Cpu} x={560} y={880} at={d} size={170} label="CYBER" />
  </Strait>
);

// 40a · U.S. bases around the Gulf
const Bases: React.FC<{ numAt: number; alertAt: number }> = ({ numAt, alertAt }) => (
  <Strait stopAt={0} tankers={false}>
    {[[1000, 300], [1500, 250], [1240, 760], [1700, 640]].map(([x, y], i) => <Badge key={i} I={Shield} x={x} y={y} at={numAt + i * 5} size={110} label="U.S. BASE" />)}
    <Big kicker="AMERICAN TROOPS IN THE GULF" n="10,000s" line="all within reach" at={numAt} />
    <Badge I={ShieldAlert} x={300} y={880} at={alertAt} size={150} label="HIGHEST ALERT" />
    <Flag c="us" w={150} x={560} y={880} at={numAt + 4} />
    <FilmPrint src="iran/footage/navy1968_at_sea.mp4" x={1280} y={600} w={520} h={290} rot={-2} at={alertAt} caption="U.S. Navy at sea · 1968 film · CC0" />
  </Strait>
);

// 40b · how long? mines take weeks
const HowLong: React.FC<{ weeksAt: number; safeAt: number }> = ({ weeksAt, safeAt }) => {
  const f = useCurrentFrame();
  const pages = Math.floor(Math.max(0, f - weeksAt) / 8);
  return (
    <Strait stopAt={0} tankers={false}>
      {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: 1600 - ((f * 1.2 + k * 260) % 700), top: 500 + k * 70 }}><Badge I={Ship} x={0} y={0} size={80} /></div>)}
      <Headline kicker="CLEARING MINES" dark y={300} size={150} at={0}>Weeks</Headline>
      <Badge I={Hourglass} x={300} y={720} at={weeksAt} size={170} label={`WEEK ${Math.min(6, pages + 1)}`} />
      <Badge I={ShieldOff} x={640} y={720} at={safeAt} size={150} label="UNTIL INSURERS SAY SAFE" />
    </Strait>
  );
};

// 41 · pipelines around the strait vs. what sails through (EIA)
const Pipes: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = sp(f, at, fps, 18, 80), b = sp(f, at + 12, fps, 18, 80);
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      <Headline kicker="THE WAY AROUND" x={110} y={110} size={110}>Pipelines</Headline>
      <div style={{ position: 'absolute', left: 110, top: 380, fontFamily: F.mono, fontSize: 30, color: '#6b6250' }}>THROUGH THE STRAIT · 2024</div>
      <div style={{ position: 'absolute', left: 110, top: 430, width: 1500 * a, height: 140, background: P.amber, border: `6px solid ${P.ink}`, display: 'flex', alignItems: 'center', paddingLeft: 30, fontFamily: F.serif, fontSize: 90, color: P.ink }}>≈ 20M</div>
      <div style={{ position: 'absolute', left: 110, top: 650, fontFamily: F.mono, fontSize: 30, color: '#6b6250' }}>PIPELINES AROUND IT (SAUDI + UAE, AVAILABLE)</div>
      <div style={{ position: 'absolute', left: 110, top: 700, width: 1500 * (2.6 / 20) * b, height: 140, background: '#3F5A8C', border: `6px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 340, top: 712, fontFamily: F.serif, fontSize: 90, color: P.ink, opacity: b }}>≈ 2.6M</div>
      <div style={{ position: 'absolute', right: 120, top: 600, fontFamily: F.mono, fontSize: 28, color: P.ink }}>barrels per day</div>
      <Src style={{ left: 110, bottom: 40 }}>U.S. EIA, Today in Energy #65504 (2024 data)</Src>
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// 42 · most of it goes to Asia
const Asia: React.FC<{ at: number; names: number[] }> = ({ at, names }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const list = ['CHINA', 'INDIA', 'JAPAN', 'KOREA'];
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <Headline kicker="WHERE HORMUZ CRUDE GOES · 2024" dark x={110} y={110} size={110} at={0}>Mostly Asia</Headline>
      <div style={{ position: 'absolute', left: 110, top: 330, fontFamily: F.serif, fontSize: 280, color: P.amber, lineHeight: 1, opacity: sp(f, at, fps) }}>84%</div>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        {list.map((_, i) => <path key={i} d={`M 760 520 C 1000 ${380 + i * 110} 1150 ${300 + i * 150} 1380 ${300 + i * 150}`} fill="none" stroke={P.amber} strokeWidth={10} strokeDasharray="30 18" strokeDashoffset={-f * 3} opacity={sp(f, names[i], fps)} />)}
      </svg>
      {list.map((n, i) => <FlagLabel key={n} c={(['cn', 'in', 'jp', 'kr'] as const)[i]} name={n} x={1560} y={300 + i * 150} at={names[i]} size={60} />)}
      <Badge I={Ship} x={760} y={520} at={at} size={140} />
      <Src dark style={{ left: 110, bottom: 40 }}>U.S. EIA #65504: ≈ 84% of Hormuz crude and condensate went to Asia in 2024</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// 43 · one world price: globe + tag → pumps everywhere → Jake's station
const OnePrice: React.FC<{ at: number; jumpAt: number; jakeAt: number }> = ({ at, jumpAt, jakeAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      <Headline kicker="ONE WORLD PRICE" x={110} y={110} size={110} at={0}>Asia buys, all pay</Headline>
      <div style={{ position: 'absolute', left: 960, top: 600, transform: `translate(-50%,-50%) scale(${sp(f, at, fps)})` }}><Globe size={360} color={P.ink} strokeWidth={1.6} /></div>
      <div style={{ position: 'absolute', left: 1140, top: 400, transform: `scale(${sp(f, at + 8, fps)}) rotate(${Math.sin(f / 12) * 8}deg)` }}><Tag size={150} color={P.red} strokeWidth={2.2} /></div>
      {[[500, 420], [1440, 520], [560, 820], [1380, 860], [960, 330]].map(([x, y], i) => <Badge key={i} I={Fuel} x={x} y={y} at={jumpAt + i * 4} size={110} />)}
      {f > jakeAt && <Badge I={Fuel} x={960} y={600} at={jakeAt} size={220} label="JAKE'S STATION" />}
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// 44 · 1973: real gas-line photo → match cut to a 2026 pump photo
const Then: React.FC<{ yearAt: number; cutAt: number }> = ({ yearAt, cutAt }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      {f < cutAt ? (
        <>
          <Print src="sayed/real/doc13_after-hours-in-a-gasoline-line.jpg" x={160} y={120} w={1150} h={720} rot={-1.5} at={0} caption="EPA DOCUMERICA · David Falconer · Oregon, 1973 · National Archives, public domain" />
          <Headline kicker="THE 1973 OIL EMBARGO" x={1380} y={240} size={140} at={yearAt}>1973</Headline>
          <div style={{ position: 'absolute', left: 1384, top: 440, fontFamily: F.sans, fontWeight: 700, fontSize: 50, color: P.ink, lineHeight: 1.2 }}>Hours in line<br />to fill up</div>
        </>
      ) : (
        <Enter kind="zoom" dur={10}>
          <Print src="sayed/racetrac_gas_station_jefferson_parish_louisiana_5_march_2026_1.jpg" x={160} y={120} w={1150} h={720} rot={1.5} at={0} caption="Gas station, Louisiana, March 2026 · Infrogmation, CC BY-SA 4.0" />
          <Headline kicker="AND NOW" x={1380} y={240} size={140} at={0}>2026</Headline>
        </Enter>
      )}
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// 45 · Jake's wallet meter spins
const Meter: React.FC = () => {
  const f = useCurrentFrame();
  const spin = (4.15 + (Math.sin(f / 2) + 1) * 0.9).toFixed(2);
  return (
    <AbsoluteFill style={{ background: P.ink, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, background: P.bone, border: `8px solid ${P.ink}`, boxShadow: '16px 16px 0 rgba(0,0,0,.4)', padding: '40px 60px' }}>
        <Wallet size={150} color={P.ink} strokeWidth={2} />
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 34, color: '#6b6250', letterSpacing: 4 }}>JAKE'S WALLET · GAS / GAL</div>
          <div style={{ fontFamily: F.serif, fontSize: 200, color: P.ink, lineHeight: 1 }}>$4.15 → <span style={{ color: P.red }}>${f < 10 ? '4.15' : spin}</span></div>
        </div>
      </div>
      <LiveJake pose="stand" seed="p6m" beats={[{ at: 0, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 1560, top: 520, height: 600 }} />
      <WhatIf dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part06: React.FC = () => {
  const s = (id: string) => shotT(id);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('37')} to={s('38')} name="37"><Enter kind="zoom"><ZoomOut at={rel(wordT('37', 'strait'), s('37'))} /></Enter></At>
      <At base={B} from={s('38')} to={s('39')} name="38"><Enter kind="fade" dur={8}><Strait><Card x={1330} y={470} at={0} size={52} rot={-2}>Strait of Hormuz</Card><Big kicker="OF ALL THE OIL THE WORLD USES" n="1 in 5" line={'barrels sail through\nthis one channel'} at={rel(wordT('38', 'five'), s('38'))} /><Src dark style={{ left: 74, bottom: 76 }}>U.S. EIA #65504: ≈ 20 million b/d in 2024 ≈ 20% of world petroleum liquids consumption</Src></Strait></Enter></At>
      <At base={B} from={s('39')} to={s('40')} name="39"><Enter kind="none"><Insurance insAt={rel(wordT('39', 'insurance'), s('39'))} stopAt={rel(wordT('39', 'sail'), s('39'))} attAt={rel(wordT('39', 'attacks'), s('39'))} /></Enter></At>
      <At base={B} from={s('40')} to={s('40a')} name="40"><Enter kind="none"><Answers a={rel(wordT('40', 'missiles'), s('40'))} b={rel(wordT('40', 'mines'), s('40'))} c={rel(wordT('40', 'drones'), s('40'))} d={rel(wordT('40', 'drones'), s('40')) + 18} /></Enter></At>
      <At base={B} from={s('40a')} to={s('40b')} name="40a"><Enter kind="none"><Bases numAt={rel(wordT('40a', 'thousands'), s('40a'))} alertAt={rel(wordT('40a', 'alert'), s('40a'))} /></Enter></At>
      <At base={B} from={s('40b')} to={s('41')} name="40b"><Enter kind="none"><HowLong weeksAt={rel(wordT('40b', 'weeks'), s('40b'))} safeAt={rel(wordT('40b', 'safe'), s('40b'))} /></Enter></At>
      <At base={B} from={s('41')} to={s('42')} name="41"><Enter kind="slideL"><Pipes at={rel(wordT('41', 'pipelines'), s('41'))} /></Enter></At>
      <At base={B} from={s('42')} to={s('43')} name="42"><Enter kind="slideL"><Asia at={rel(wordT('42', 'asia'), s('42'))} names={['china', 'india', 'japan', 'korea'].map((n) => rel(wordT('42', n), s('42')))} /></Enter></At>
      <At base={B} from={s('43')} to={s('44')} name="43"><Enter kind="zoom"><OnePrice at={rel(wordT('43', 'world'), s('43'))} jumpAt={rel(wordT('43', 'jumps'), s('43'))} jakeAt={rel(wordT('43', 'jake'), s('43'))} /></Enter></At>
      <At base={B} from={s('44')} to={s('45')} name="44"><Enter kind="drop"><Then yearAt={rel(wordT('44', '1973'), s('44'))} cutAt={rel(wordT('44', 'fill'), s('44'))} /></Enter></At>
      <At base={B} from={s('45')} to={END} name="45"><Enter kind="zoom" dur={8}><Meter /></Enter></At>
      <PartSound base={B} cues={[[wordT('38', 'five'), 'tick', 0.06], [wordT('39', 'sail'), 'paper', 0.06], [wordT('42', 'asia'), 'tick', 0.05], [s('44'), 'paper', 0.07], [s('45'), 'counter', 0.07]]} />
    </AbsoluteFill>
  );
};
export const EP03_P6_FRAMES = fr(END - B);
