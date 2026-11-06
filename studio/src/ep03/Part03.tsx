import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { Briefcase, Building2, Eye, Fingerprint, Landmark, MapPinOff, Mountain, Search, Shield, ShieldOff, Timer, User, Users, X } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Building, Card, P, Pawn, Road } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Print, Src, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound, Push } from './Part01';
import { Flag, FlagLabel } from './Real';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_02');
const END = partEnd('vo_02');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

const Paper: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <AbsoluteFill style={{ background: dark ? P.ink : P.paper }}>{children}<WhatIf dark={dark} /><Bug dark={dark} /><Grain k={0.05} /></AbsoluteFill>
);

/** Document card with a highlighted phrase (real quote, with source). */
const Doc: React.FC<{ head: string; before: string; mark: string; after?: string; src: string; at: number; markAt: number; x: number; y: number; w: number; rot?: number }> = ({ head, before, mark, after = '', src, at, markAt, x, y, w, rot = 0 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, at, fps, 15, 120);
  const hl = interpolate(f - markAt, [0, 14], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, transform: `translateY(${(1 - s) * 60}px) rotate(${rot}deg)`, opacity: s, background: '#FBF8EF', border: `5px solid ${P.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.25)', padding: '30px 38px' }}>
      <div style={{ fontFamily: F.mono, fontSize: 24, color: '#6b6250', letterSpacing: 3 }}>{head}</div>
      <div style={{ fontFamily: F.serif, fontSize: 56, color: P.ink, lineHeight: 1.25, marginTop: 14 }}>
        {before}<span style={{ background: `linear-gradient(90deg, rgba(217,164,65,.6) ${hl}%, transparent ${hl}%)`, padding: '0 4px' }}>{mark}</span>{after}
      </div>
      <div style={{ fontFamily: F.mono, fontSize: 20, color: '#6b6250', marginTop: 16 }}>{src}</div>
    </div>
  );
};

// 15 · one person
const OnePerson: React.FC<{ presAt: number }> = ({ presAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <Paper>
      <Push to={1.05} dur={150}>
        <Building kind="wh" x={480} y={700} />
        <Flag c="us" w={110} x={520} y={380} pole at={6} />
        <Road y={680} label="PENNSYLVANIA AVENUE" x1={600} x2={1500} />
        <Pawn x={760} y={730} base={P.blue} seed="pres15" hop={presAt} scale={1.2} />
        <Card x={760} y={790} at={presAt + 4} size={34}>The President</Card>
      </Push>
      <Headline kicker="WHO CAN ORDER A NUCLEAR STRIKE?" x={90} y={110} size={130}>One person.</Headline>
      <Badge I={User} x={1560} y={420} at={presAt} size={200} label="1" />
    </Paper>
  );
};

// 16 · not Congress, not the generals + CRS "sole authority"
const SoleAuthority: React.FC<{ congAt: number; genAt: number; crsAt: number; soleAt: number }> = ({ congAt, genAt, crsAt, soleAt }) => (
  <Paper>
    <Badge I={Landmark} x={260} y={300} at={congAt} hit={congAt + 8} size={170} label="NOT CONGRESS" />
    <Badge I={Shield} x={260} y={680} at={genAt} hit={genAt + 8} size={170} label="NOT THE GENERALS" />
    <Doc head="CONGRESSIONAL RESEARCH SERVICE · IF10521" before="“The U.S. President has " mark="sole authority" after=" to authorize the use of U.S. nuclear weapons.”" src="CRS, Authority to Launch Nuclear Forces, updated 19 Dec 2024" at={crsAt} markAt={soleAt} x={560} y={240} w={1250} rot={1} />
  </Paper>
);

// 17 · the chain: aide with briefcase → code → Pentagon → crews → minutes
const Chain: React.FC<{ aideAt: number; codeAt: number; chainAt: number; crewAt: number; minAt: number }> = ({ aideAt, codeAt, chainAt, crewAt, minAt }) => {
  const f = useCurrentFrame();
  const prog = interpolate(f - chainAt, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nodes = [{ x: 300, I: User, l: 'PRESIDENT', at: 0 }, { x: 720, I: Fingerprint, l: 'CODE', at: codeAt }, { x: 1140, I: Building2, l: 'PENTAGON', at: chainAt + 10 }, { x: 1560, I: Users, l: 'CREWS', at: crewAt }];
  return (
    <Paper>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        <line x1={300} y1={520} x2={300 + 1260 * prog} y2={520} stroke={P.red} strokeWidth={12} strokeDasharray="30 18" strokeDashoffset={-f * 3} />
      </svg>
      {nodes.map((n, i) => <Badge key={i} I={n.I} x={n.x} y={520} at={n.at} size={180} label={n.l} />)}
      <Pawn x={300 + Math.min(1, Math.max(0, (f - aideAt) / 40)) * 60} y={860} base="#8b93a1" scale={0.7} seed="aide" />
      <div style={{ position: 'absolute', left: 380 + Math.min(1, Math.max(0, (f - aideAt) / 40)) * 60, top: 760 }}><Badge I={Briefcase} x={0} y={0} at={aideAt} size={110} label="AIDE" /></div>
      <Badge I={Timer} x={1560} y={210} at={minAt} size={170} label="MINUTES" />
      <Headline kicker="HOW THE ORDER TRAVELS" x={90} y={90} size={90} at={0}>Down the chain</Headline>
      <Src style={{ left: 90, bottom: 40 }}>Process simplified · CRS IF10521</Src>
    </Paper>
  );
};

// 17a · Truman, 1945: real statement page (Truman Library) + two cities
const Truman: React.FC<{ augAt: number; citiesAt: number; sinceAt: number }> = ({ augAt, citiesAt, sinceAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const yrs = Math.round(interpolate(f - sinceAt, [0, 40], [0, 81], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <Paper>
      <Print src="iran/screens_truman_statement.png" x={90} y={150} w={1060} h={660} rot={-1.5} at={0} caption="Harry S. Truman Library · Statement by the President, 6 Aug 1945 · U.S. govt" />
      <Headline kicker="AUGUST 1945" x={1240} y={170} size={120} at={augAt}>Truman</Headline>
      <Badge I={Building2} x={1330} y={520} at={citiesAt} size={150} label="HIROSHIMA" />
      <Badge I={Building2} x={1640} y={520} at={citiesAt + 8} size={150} label="NAGASAKI" />
      {f > sinceAt && <div style={{ position: 'absolute', left: 1240, top: 760, fontFamily: F.serif, fontSize: 120, color: P.ink, opacity: sp(f, sinceAt, fps) }}>{yrs} years</div>}
      {f > sinceAt && <div style={{ position: 'absolute', left: 1246, top: 900, fontFamily: F.sans, fontWeight: 700, fontSize: 40, color: P.ink }}>never given again</div>}
    </Paper>
  );
};

// 18 · no first use? → never declared (card flip)
const NoFirstUse: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const a = interpolate(f - at, [0, 16], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const back = a > 90;
  return (
    <Paper dark>
      <div style={{ position: 'absolute', left: 960, top: 520, transform: `translate(-50%,-50%) rotateY(${a}deg)`, perspective: 1400 }}>
        <div style={{ width: 1100, height: 520, background: back ? P.red : P.bone, border: `8px solid ${P.ink}`, boxShadow: '16px 16px 0 rgba(0,0,0,.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, transform: back ? 'rotateY(180deg)' : 'none' }}>
          {back ? <ShieldOff size={150} color={P.bone} strokeWidth={2} /> : <Shield size={150} color={P.ink} strokeWidth={2} />}
          <div style={{ fontFamily: F.serif, fontSize: 130, color: back ? P.bone : P.ink }}>{back ? 'Never declared' : '“No first use”?'}</div>
        </div>
      </div>
      <Src dark style={{ left: 90, bottom: 40 }}>CRS IF10521: the U.S. has never declared a no-first-use policy</Src>
    </Paper>
  );
};

// 19 · buried sites: cross-section under a mountain (illustrative, no real coordinates)
const Buried: React.FC<{ mtnAt: number; bombAt: number }> = ({ mtnAt, bombAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, mtnAt, fps, 18, 80);
  const drop = interpolate(f - bombAt, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Paper>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        <path d={`M 0 ${1080} L 0 ${560} L 520 ${560 - 300 * s} L 860 ${560 - 420 * s} L 1240 ${560 - 260 * s} L 1920 ${560} L 1920 1080 Z`} fill="#CDBB91" stroke={P.ink} strokeWidth={6} />
        {[640, 760, 880].map((y, i) => <path key={i} d={`M 0 ${y} C 600 ${y - 30} 1300 ${y + 30} 1920 ${y}`} fill="none" stroke="rgba(27,34,48,.25)" strokeWidth={4} />)}
        <rect x={760} y={860} width={260} height={110} rx={12} fill={P.ink} opacity={s} />
        <line x1={890} y1={120} x2={890} y2={120 + 520 * drop} stroke={P.red} strokeWidth={12} strokeDasharray="22 14" />
        {drop >= 1 && <g><circle cx={890} cy={640} r={40} fill="none" stroke={P.red} strokeWidth={8} /><line x1={862} y1={612} x2={918} y2={668} stroke={P.red} strokeWidth={8} /></g>}
      </svg>
      <Card x={890} y={915} at={mtnAt + 10} size={40}>Nuclear site</Card>
      <FlagLabel c="ir" name="Iran" x={1580} y={440} at={mtnAt + 6} />
      <Badge I={Mountain} x={1580} y={240} at={mtnAt} size={170} label="DEEP UNDERGROUND" />
      <Headline kicker="WHY CONSIDER IT AT ALL?" x={90} y={90} size={96}>Buried in mountains</Headline>
      <Src style={{ left: 90, bottom: 40 }}>Illustration, not to scale · CRS R40094</Src>
    </Paper>
  );
};

// 20–21 · two true things: unknown stockpile vs. "not building a bomb"
const TwoTruths: React.FC<{ inspAt: number; kgAt: number; whereAt: number; intelAt: number }> = ({ inspAt, kgAt, whereAt, intelAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const kg = Math.round(interpolate(f - kgAt, [0, 40], [0, 440], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const Panel: React.FC<{ x: number; at: number; children: React.ReactNode; color: string }> = ({ x, at, children, color }) => (
    <div style={{ position: 'absolute', left: x, top: 200, width: 780, height: 700, transform: `scale(${sp(f, at, fps, 14, 120)})`, background: P.bone, border: `7px solid ${P.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.25)', borderTop: `24px solid ${color}`, padding: 40 }}>{children}</div>
  );
  return (
    <Paper>
      <Panel x={120} at={inspAt} color={P.red}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.mono, fontSize: 26, color: '#6b6250', letterSpacing: 3 }}><Search size={44} color={P.ink} />IAEA · INSPECTORS</div>
        <div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 64, color: P.red, marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}><X size={60} strokeWidth={3} />NO ACCESS</div>
        {f > kgAt && <div style={{ fontFamily: F.serif, fontSize: 190, color: P.ink, lineHeight: 1, marginTop: 20 }}>{kg} kg</div>}
        {f > kgAt && <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 38, color: P.ink }}>uranium enriched to 60% (last count)</div>}
        {f > whereAt && <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 18, fontFamily: F.serif, fontSize: 80, color: P.ink }}><MapPinOff size={80} color={P.red} />Where? Unknown</div>}
      </Panel>
      {f > intelAt && <Panel x={1020} at={intelAt} color="#3F5A8C">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.mono, fontSize: 26, color: '#6b6250', letterSpacing: 3 }}><Eye size={44} color={P.ink} />U.S. INTELLIGENCE</div>
        <div style={{ fontFamily: F.serif, fontSize: 104, color: P.ink, lineHeight: 1.05, marginTop: 40 }}>“Iran is not building a nuclear weapon.”</div>
      </Panel>}
      <Src style={{ left: 120, bottom: 40 }}>IAEA reports via ISIS (Jun 2026) · Bulletin of the Atomic Scientists (Mar 2026) · U.S. intelligence assessment as cited in CRS IF12106</Src>
    </Paper>
  );
};

// 22 · the fog — Jake between the two cards; red fade into the order
const Fog: React.FC<{ givenAt: number }> = ({ givenAt }) => {
  const f = useCurrentFrame();
  const red = interpolate(f - givenAt, [0, 30], [0, 0.85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      <div style={{ position: 'absolute', inset: 0, filter: 'blur(10px) brightness(.55)' }}><TwoTruths inspAt={-100} kgAt={-100} whereAt={-100} intelAt={-100} /></div>
      {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: -400 + noise2D('fog' + k, f / 200, 0) * 300 + k * 600, top: 200 + k * 220, width: 1400, height: 400, borderRadius: '50%', background: 'rgba(220,220,225,.22)', filter: 'blur(40px)' }} />)}
      <LiveJake pose="think" seed="p3fog" beats={[{ at: 0, r: 'doubt', hold: 400 }]} style={{ position: 'absolute', left: 700, top: 200, height: 900 }} />
      <Headline kicker="BOTH ARE TRUE" dark x={90} y={90} size={110}>The fog</Headline>
      <AbsoluteFill style={{ background: `rgba(120,20,15,${red})` }} />
      <WhatIf dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part03: React.FC = () => {
  const s = (id: string) => shotT(id);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('15')} to={s('16')} name="15"><Enter kind="zoom"><OnePerson presAt={rel(wordT('15', 'president'), s('15'))} /></Enter></At>
      <At base={B} from={s('16')} to={s('17')} name="16"><Enter kind="slideL"><SoleAuthority congAt={rel(wordT('16', 'congress', 0), s('16'))} genAt={rel(wordT('16', 'generals'), s('16'))} crsAt={rel(wordT('16', 'research'), s('16'))} soleAt={rel(wordT('16', 'sole'), s('16'))} /></Enter></At>
      <At base={B} from={s('17')} to={s('17a')} name="17"><Enter kind="slideL"><Chain aideAt={rel(wordT('17', 'briefcase'), s('17'))} codeAt={rel(wordT('17', 'code'), s('17'))} chainAt={rel(wordT('17', 'chain'), s('17'))} crewAt={rel(wordT('17', 'crews'), s('17'))} minAt={rel(wordT('17', 'minutes'), s('17'))} /></Enter></At>
      <At base={B} from={s('17a')} to={s('18')} name="17a"><Enter kind="drop"><Truman augAt={rel(wordT('17a', 'august'), s('17a'))} citiesAt={rel(wordT('17a', 'cities'), s('17a'))} sinceAt={rel(wordT('17a', 'since'), s('17a'))} /></Enter></At>
      <At base={B} from={s('18')} to={s('19')} name="18"><Enter kind="zoom"><NoFirstUse at={rel(wordT('18', 'never'), s('18'))} /></Enter></At>
      <At base={B} from={s('19')} to={s('20')} name="19"><Enter kind="slideL"><Buried mtnAt={rel(wordT('19', 'mountains'), s('19')) - 20} bombAt={rel(wordT('19', 'ordinary'), s('19'))} /></Enter></At>
      <At base={B} from={s('20')} to={s('22')} name="20-21"><Enter kind="slideL"><TwoTruths inspAt={rel(wordT('20', 'inspectors'), s('20'))} kgAt={rel(wordT('20', '440'), s('20'))} whereAt={rel(wordT('20', 'where'), s('20'))} intelAt={rel(s('21'), s('20'))} /></Enter></At>
      <At base={B} from={s('22')} to={END} name="22"><Enter kind="fade"><Fog givenAt={rel(wordT('22', 'given', 1), s('22'))} /></Enter></At>
      <PartSound base={B} cues={[[wordT('15', 'president'), 'tick', 0.06], [wordT('16', 'research'), 'paper', 0.07], [wordT('17', 'code'), 'type', 0.05], [wordT('17a', 'august'), 'paper', 0.07], [wordT('18', 'never'), 'paper', 0.06], [wordT('20', '440'), 'counter', 0.06]]} />
    </AbsoluteFill>
  );
};
export const EP03_P3_FRAMES = fr(END - B);
