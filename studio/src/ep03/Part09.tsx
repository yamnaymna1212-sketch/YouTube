import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, BookOpen, Check, Clock, FileText, Gavel, KeyRound, Mic, Scale, User, Users, Vote, X } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Card, P, Pawn } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Print, Src, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound } from './Part01';
import { FilmPrint, Flag } from './Real';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_08');
const END = partEnd('vo_08');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });
const Base: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <AbsoluteFill style={{ background: dark ? P.ink : P.paper }}>{children}<WhatIf dark={dark} /><Bug dark={dark} /><Grain k={0.04} /></AbsoluteFill>
);

/** The three keys on a ring; `active` lights one of them. */
const Keys: React.FC<{ at: number[]; active?: number }> = ({ at, active = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const ks = [[Banknote, 'MONEY'], [Gavel, 'HEARINGS'], [Vote, 'WAR VOTES']] as const;
  return (
    <>
      <div style={{ position: 'absolute', left: 960 - 70, top: 230, width: 140, height: 140, borderRadius: 70, border: `14px solid ${P.ink}` }} />
      {ks.map(([I, l], i) => {
        const s = sp(f, at[i], fps, 11, 150); const on = active === i;
        const x = 480 + i * 480;
        return (
          <div key={l} style={{ position: 'absolute', left: x, top: 560, transform: `translate(-50%,-50%) scale(${s * (on ? 1.15 : active >= 0 ? 0.85 : 1)})`, opacity: active >= 0 && !on ? 0.45 : 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <KeyRound size={120} color={on ? P.red : P.amber} strokeWidth={2.4} />
            <div style={{ width: 230, height: 230, borderRadius: 115, background: on ? P.red : P.bone, border: `7px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '10px 10px 0 rgba(27,34,48,.3)' }}><I size={120} color={on ? P.bone : P.ink} strokeWidth={2.2} /></div>
            <div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 56, color: P.ink, background: P.bone, border: `4px solid ${P.ink}`, padding: '0 14px' }}>{l}</div>
          </div>
        );
      })}
    </>
  );
};

const Three: React.FC<{ at: number[] }> = ({ at }) => (
  <Base><Headline kicker="RING 5 · AMERICA" x={90} y={90} size={110} at={0}>Three keys</Headline><Keys at={at} /></Base>
);

// 60 · key 1: money — 1973 Cambodia
const Money: React.FC<{ yrAt: number; dateAt: number; stopAt: number }> = ({ yrAt, dateAt, stopAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const st = sp(f, stopAt, fps, 9, 200);
  return (
    <Base>
      <Headline kicker="KEY 1 · MONEY" x={90} y={90} size={110} at={0}>No funds after a date</Headline>
      <div style={{ position: 'absolute', left: 200, top: 330, width: 520, transform: `scale(${sp(f, yrAt, fps)})`, background: P.bone, border: `7px solid ${P.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.25)' }}>
        <div style={{ background: P.red, borderBottom: `7px solid ${P.ink}`, textAlign: 'center', fontFamily: cond2, fontWeight: 700, fontSize: 54, color: P.bone, padding: 8 }}>AUG 1973</div>
        <div style={{ textAlign: 'center', fontFamily: F.serif, fontSize: 250, color: P.ink, lineHeight: 1.1 }}>15</div>
      </div>
      <Badge I={Banknote} x={1000} y={560} at={dateAt} hit={dateAt + 12} size={210} label="NO MONEY FOR THE BOMBING" />
      {f > stopAt && <div style={{ position: 'absolute', left: 1500, top: 560, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-8deg)`, opacity: st, border: `9px solid ${P.red}`, padding: '4px 30px', fontFamily: cond2, fontWeight: 700, fontSize: 110, color: P.red }}>STOPPED</div>}
      <Src style={{ left: 90, bottom: 40 }}>Bombing in Cambodia ended 15 Aug 1973, the funding deadline set by Congress (P.L. 93-50; CRS RL33803)</Src>
    </Base>
  );
};

// 61 · key 2: hearings
const Hearings: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => (
  <Base>
    <Headline kicker="KEY 2 · HEARINGS" x={90} y={90} size={110} at={0}>Questions under oath</Headline>
    <FilmPrint src="sayed/footage/v07_house_wage_hearing_2009.mp4" x={1180} y={70} w={620} h={300} rot={2} at={4} caption="A U.S. House committee hearing · house.gov · public domain" />
    <Badge I={Users} x={480} y={580} at={a} size={220} label="WITNESSES" />
    <Badge I={FileText} x={960} y={580} at={b} size={220} label="DOCUMENTS" />
    <Badge I={Mic} x={1440} y={580} at={c} size={220} label="UNDER OATH" />
  </Base>
);

// 62 · key 3: war votes — the June card returns
const WarVotes: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <Base>
      <Headline kicker="KEY 3 · WAR VOTES" x={90} y={90} size={110} at={0}>Like June</Headline>
      <div style={{ position: 'absolute', left: 960, top: 600, transform: `translate(-50%,-50%) scale(${sp(f, at, fps)}) rotate(1.5deg)`, width: 900, background: P.bone, border: `7px solid ${P.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.3)', padding: '36px 44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.mono, fontSize: 32, color: '#6b6250', letterSpacing: 4 }}><Vote size={44} color={P.ink} />HOUSE VOTE · JUNE 2026</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 20 }}>
          <div style={{ width: 140, height: 140, borderRadius: 70, background: '#4E7A4A', border: `6px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={90} color={P.bone} strokeWidth={3} /></div>
          <div style={{ fontFamily: F.serif, fontSize: 190, color: P.ink }}>215–208</div>
        </div>
      </div>
    </Base>
  );
};

// 62a · the War Powers clock: 60 + 30 days
const Clock62: React.FC<{ at: number; bothAt: number }> = ({ at, bothAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const p = interpolate(f - at, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const R = 230, C = 2 * Math.PI * R;
  return (
    <Base>
      <Headline kicker="WAR POWERS RESOLUTION · 1973" x={90} y={90} size={110} at={0}>A 60-day clock</Headline>
      <svg style={{ position: 'absolute', left: 300, top: 300 }} width="600" height="600">
        <circle cx="300" cy="300" r={R} fill={P.bone} stroke={P.ink} strokeWidth={10} />
        <circle cx="300" cy="300" r={R} fill="none" stroke={P.amber} strokeWidth={46} strokeDasharray={`${C * (60 / 90) * p} ${C}`} transform="rotate(-90 300 300)" />
        <circle cx="300" cy="300" r={R} fill="none" stroke={P.red} strokeWidth={46} strokeDasharray={`0 ${C * (60 / 90)} ${C * (30 / 90) * Math.max(0, p * 1.5 - 0.5)} ${C}`} transform="rotate(-90 300 300)" />
        <text x="300" y="320" textAnchor="middle" fontFamily={F.serif} fontSize="110" fill={P.ink}>60+30</text>
        <text x="300" y="380" textAnchor="middle" fontFamily={F.mono} fontSize="30" fill="#6b6250">DAYS</text>
      </svg>
      <div style={{ position: 'absolute', left: 1000, top: 360, fontFamily: F.sans, fontWeight: 700, fontSize: 56, color: P.ink, lineHeight: 1.3, opacity: sp(f, at + 20, fps) }}>60 days of fighting<br />+ 30 to withdraw<br />→ then Congress must approve</div>
      {f > bothAt && <div style={{ position: 'absolute', left: 1000, top: 700, display: 'flex', gap: 30, alignItems: 'flex-end' }}>
        <Pawn x={60} y={260} base={P.blue} scale={0.8} seed="dem" hop={bothAt} /><Pawn x={220} y={260} base={P.red} scale={0.8} seed="rep" hop={bothAt + 6} />
        <div style={{ position: 'absolute', left: 340, top: 80, width: 460, fontFamily: F.sans, fontWeight: 700, fontSize: 40, color: P.ink }}>Presidents of both parties say the clock doesn't bind them</div>
      </div>}
      <Src style={{ left: 90, bottom: 40 }}>War Powers Resolution, 50 U.S.C. §1544(b)</Src>
    </Base>
  );
};

// 62b · lawful orders only
const Lawful: React.FC<{ at: number; hardAt: number }> = ({ at, hardAt }) => (
  <Base>
    <Headline kicker="INSIDE THE MILITARY" x={90} y={90} size={110} at={0}>Lawful orders only</Headline>
    <div style={{ position: 'absolute', left: 0, top: 0 }}><Pawn x={420} y={900} base="#8b93a1" scale={1.6} hat seed="officer" hop={at} /></div>
    <Badge I={BookOpen} x={960} y={560} at={at} size={220} label="THE LAW" />
    <Badge I={Scale} x={1440} y={560} at={hardAt} size={220} label="WHAT IS LAWFUL?" />
    <Src style={{ left: 90, bottom: 40 }}>Duty to obey lawful orders: UCMJ Art. 92</Src>
  </Base>
);

// 63 · January: a new Congress (real Capitol photo)
const NewCongress: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <Base>
      <Print src="sayed/us_capitol_east_side.JPG" x={120} y={160} w={1100} h={640} rot={-1.5} at={0} caption="U.S. Capitol · Martin Falbisoner, CC BY-SA 3.0" />
      <div style={{ position: 'absolute', left: 1320, top: 260, width: 440, transform: `scale(${sp(f, at, fps)})`, background: P.bone, border: `7px solid ${P.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.25)' }}>
        <div style={{ background: '#3F5A8C', borderBottom: `7px solid ${P.ink}`, textAlign: 'center', fontFamily: cond2, fontWeight: 700, fontSize: 50, color: P.bone, padding: 8 }}>JAN 2027</div>
        <div style={{ textAlign: 'center', fontFamily: F.serif, fontSize: 240, color: P.ink, lineHeight: 1.1 }}>3</div>
      </div>
      <div style={{ position: 'absolute', left: 1320, top: 700, fontFamily: F.sans, fontWeight: 700, fontSize: 52, color: P.ink }}>A new Congress</div>
    </Base>
  );
};

// 64 · one person → everyone else (Jake turns to camera)
const Everyone: React.FC<{ oneAt: number; allAt: number }> = ({ oneAt, allAt }) => (
  <AbsoluteFill style={{ background: '#1A1C21' }}>
    <Badge I={User} x={420} y={460} at={oneAt} size={220} label="ONE PERSON" />
    <Badge I={Users} x={420} y={820} at={allAt} size={220} label="EVERYONE ELSE" />
    <LiveJake pose="stand" seed="p9end" beats={[{ at: 0, r: 'think', hold: 60 }, { at: allAt, r: 'nod', hold: 300 }]} face={{ look: 0 }} style={{ position: 'absolute', left: 900, top: 160, height: 940 }} />
    <WhatIf dark /><Bug dark /><Grain />
  </AbsoluteFill>
);

export const EP03Part09: React.FC = () => {
  const s = (id: string) => shotT(id);
  const w = (id: string, x: string, n = 0) => rel(wordT(id, x, n), s(id));
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('59')} to={s('60')} name="59"><Enter kind="zoom"><Three at={[4, 10, 16]} /></Enter></At>
      <At base={B} from={s('60')} to={s('61')} name="60"><Enter kind="slideL"><Money yrAt={w('60', '1973')} dateAt={w('60', 'money', 1)} stopAt={w('60', 'stopped')} /></Enter></At>
      <At base={B} from={s('61')} to={s('62')} name="61"><Enter kind="slideL"><Hearings a={w('61', 'witnesses')} b={w('61', 'documents')} c={w('61', 'oath')} /></Enter></At>
      <At base={B} from={s('62')} to={s('62a')} name="62"><Enter kind="slideL"><WarVotes at={w('62', 'june')} /></Enter></At>
      <At base={B} from={s('62a')} to={s('62b')} name="62a"><Enter kind="zoom"><Clock62 at={w('62a', 'days')} bothAt={w('62a', 'both')} /></Enter></At>
      <At base={B} from={s('62b')} to={s('63')} name="62b"><Enter kind="slideL"><Lawful at={w('62b', 'lawful')} hardAt={w('62b', 'hardest')} /></Enter></At>
      <At base={B} from={s('63')} to={s('64')} name="63"><Enter kind="drop"><NewCongress at={w('63', 'january')} /></Enter></At>
      <At base={B} from={s('64')} to={END} name="64"><Enter kind="zoom"><Everyone oneAt={w('64', 'one')} allAt={w('64', 'everyone')} /></Enter></At>
      <PartSound base={B} cues={[[wordT('59', 'keys'), 'tick', 0.06], [wordT('60', 'stopped'), 'paper', 0.06], [wordT('62', 'june'), 'paper', 0.06], [wordT('63', 'january'), 'paper', 0.06]]} />
    </AbsoluteFill>
  );
};
export const EP03_P9_FRAMES = fr(END - B);
