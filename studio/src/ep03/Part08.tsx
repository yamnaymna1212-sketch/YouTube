import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check, CircleHelp, Droplets, Factory, KeyRound, MapPinOff, NotebookPen, Radiation, Rocket, Target, X } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Building, Card, P, Pawn } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Print, Src, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound } from './Part01';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_07');
const END = partEnd('vo_07');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });
const Base: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <AbsoluteFill style={{ background: dark ? P.ink : P.paper }}>{children}<WhatIf dark={dark} /><Bug dark={dark} /><Grain k={0.04} /></AbsoluteFill>
);

// 54 · 1945 → 81 years (real 1946 test print as the visual anchor)
const Taboo: React.FC<{ yrAt: number }> = ({ yrAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const y = Math.round(interpolate(f - yrAt, [0, 40], [1945, 2026], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <Base>
      <Print src="iran/crossroads_baker_column.jpg" pos="50% 0%" x={100} y={170} w={900} h={520} rot={-2} at={0} caption="Operation Crossroads, 1946 · U.S. govt film · public domain" />
      <Headline kicker="RING 4 · THE WORLD" x={1080} y={150} size={110}>Unused in war</Headline>
      <div style={{ position: 'absolute', left: 1080, top: 380, fontFamily: F.serif, fontSize: 230, color: P.ink, lineHeight: 1 }}>{f > yrAt ? y : 1945}</div>
      {f > yrAt + 40 && <div style={{ position: 'absolute', left: 1086, top: 640, fontFamily: F.sans, fontWeight: 700, fontSize: 76, color: P.red, opacity: sp(f, yrAt + 40, fps) }}>81 years</div>}
    </Base>
  );
};

// 54a · would it even work?
const Work: React.FC<{ qAt: number; whereAt: number; tabooAt: number; missAt: number }> = ({ qAt, whereAt, tabooAt, missAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const st = sp(f, tabooAt, fps, 9, 200);
  const ax = interpolate(f - missAt, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Base dark>
      <Headline kicker="THE UNCOMFORTABLE PART" dark x={90} y={90} size={120} at={qAt}>Would it even work?</Headline>
      <Badge I={MapPinOff} x={330} y={620} at={whereAt} size={220} label="URANIUM: WHERE?" />
      <div style={{ position: 'absolute', left: 960, top: 620, transform: 'translate(-50%,-50%)' }}><Target size={300} color={P.bone} strokeWidth={1.6} /></div>
      {f > missAt && <div style={{ position: 'absolute', left: 960 + 260 * ax, top: 620 - 220 * ax, transform: 'translate(-50%,-50%) rotate(-40deg)', width: 220, height: 14, background: P.red, borderRadius: 7 }} />}
      {f > missAt && <div style={{ position: 'absolute', left: 1250, top: 340, fontFamily: cond2, fontWeight: 700, fontSize: 70, color: P.red, opacity: ax }}>GOAL MISSED?</div>}
      {f > tabooAt && <div style={{ position: 'absolute', left: 1560, top: 760, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-8deg)`, opacity: st, border: `8px solid ${P.red}`, padding: '4px 22px', fontFamily: cond2, fontWeight: 700, fontSize: 74, color: P.red, whiteSpace: 'nowrap' }}>TABOO BROKEN</div>}
      <Src dark style={{ left: 90, bottom: 40 }}>IAEA: stockpile location unverified (see Ring 0)</Src>
    </Base>
  );
};

// 55 · allies choose, rivals take notes
const Allies: React.FC<{ chooseAt: number; backAt: number; notesAt: number }> = ({ chooseAt, backAt, notesAt }) => {
  const f = useCurrentFrame();
  const turn = (k: number) => interpolate(f - backAt - k * 6, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Base>
      <Headline kicker="ALLIES AND RIVALS" x={90} y={90} size={110} at={0}>Everyone chooses</Headline>
      <Building kind="wh" x={960} y={640} scale={0.8} />
      <Card x={960} y={330} at={0} size={38}>Washington</Card>
      {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: 0, top: 0, transform: `translateX(${-turn(k) * 160}px)`, opacity: 1 - turn(k) * 0.45 }}><Pawn x={380 + k * 140} y={860} base={P.blue} seed={'al' + k} hop={chooseAt + k * 5} /></div>)}
      <Card x={520} y={930} at={chooseAt} size={34}>Allies: stay or step back</Card>
      {[0, 1, 2].map((k) => <Pawn key={k} x={1300 + k * 160} y={860} base="#8b93a1" seed={'rv' + k} hat={k === 1} />)}
      <Badge I={NotebookPen} x={1460} y={560} at={notesAt} size={150} label="RIVALS TAKE NOTES" />
    </Base>
  );
};

// 56 · "do we need a bomb?" — capitals light up one by one
const Need: React.FC<{ at: number; ansAt: number }> = ({ at, ansAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <Base dark>
      <Headline kicker="EVERY GOVERNMENT THAT EVER ASKED" dark x={90} y={90} size={110} at={0}>Do we need one?</Headline>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 220 + (i % 6) * 300, y = 470 + Math.floor(i / 6) * 300;
        return <React.Fragment key={i}><Pawn x={x} y={y + 120} base="#8b93a1" scale={0.6} seed={'nd' + i} /><Badge I={CircleHelp} x={x} y={y - 40} at={at + i * 4} hit={f > ansAt ? ansAt + i * 2 : -1} size={90} /></React.Fragment>;
      })}
      <Src dark style={{ left: 90, bottom: 40 }}>Illustration · no country named</Src>
    </Base>
  );
};

// 56a · radiation crosses borders; desalinated water on the coast
const Water: React.FC<{ radAt: number; seaAt: number; tapsAt: number }> = ({ radAt, seaAt, tapsAt }) => {
  const f = useCurrentFrame();
  const x = interpolate(f - radAt, [0, 80], [200, 1400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Base>
      <Headline kicker="ACROSS THE GULF" x={90} y={90} size={110} at={0}>No borders for dust</Headline>
      {[600, 1000].map((bx) => <div key={bx} style={{ position: 'absolute', left: bx, top: 280, width: 0, height: 700, borderLeft: `6px dashed ${P.ink}`, opacity: 0.5 }} />)}
      <div style={{ position: 'absolute', left: 0, top: 420, width: x, height: 220, background: 'linear-gradient(90deg, rgba(90,80,70,.05), rgba(90,80,70,.45))', borderRadius: '0 120px 120px 0' }} />
      <Badge I={Radiation} x={x} y={530} at={radAt} size={140} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 820, height: 260, background: '#8FA9B8', borderTop: `6px solid ${P.ink}` }} />
      <Badge I={Factory} x={1260} y={760} at={seaAt} size={170} label="DESALINATION" />
      <Badge I={Droplets} x={1620} y={760} at={tapsAt} hit={tapsAt + 12} size={170} label="TAPS" />
      <Src style={{ left: 90, bottom: 40 }}>Gulf states rely heavily on desalinated seawater ⚠ add dated source</Src>
    </Base>
  );
};

// 56b · UN Security Council: five chairs, one veto
const UN: React.FC<{ fiveAt: number; vetoAt: number; usAt: number }> = ({ fiveAt, vetoAt, usAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const names = ['U.S.', 'U.K.', 'FRANCE', 'RUSSIA', 'CHINA'];
  return (
    <Base>
      <Headline kicker="THE UNITED NATIONS" x={90} y={90} size={110} at={0}>One veto blocks all</Headline>
      <div style={{ position: 'absolute', left: 260, top: 780, width: 1400, height: 60, background: '#6b5a40', border: `6px solid ${P.ink}`, borderRadius: 30 }} />
      {names.map((n, i) => {
        const veto = i === 0 ? f > usAt : f > vetoAt && i === 3;
        return <React.Fragment key={n}>
          <Pawn x={400 + i * 280} y={790} base={i === 0 ? P.blue : '#8b93a1'} seed={'un' + i} hop={fiveAt + i * 5} />
          <Card x={400 + i * 280} y={880} at={fiveAt + i * 5} size={32}>{n}</Card>
          {veto && <div style={{ position: 'absolute', left: 400 + i * 280, top: 470, transform: `translate(-50%,-50%) scale(${sp(f, i === 0 ? usAt : vetoAt, fps, 10, 180)})`, background: P.red, color: P.bone, border: `5px solid ${P.ink}`, padding: '6px 18px', fontFamily: cond2, fontWeight: 700, fontSize: 54 }}>VETO</div>}
        </React.Fragment>;
      })}
      <Src style={{ left: 90, bottom: 40 }}>UN Charter, Art. 27: any permanent member can block a substantive decision</Src>
    </Base>
  );
};

// 57 · 1983 early-warning false alarm
const Petrov: React.FC<{ yrAt: number; fiveAt: number; errAt: number; rightAt: number }> = ({ yrAt, fiveAt, errAt, rightAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const sweep = (f * 4) % 360;
  return (
    <Base dark>
      <Headline kicker="IT HAPPENED BEFORE" dark x={90} y={90} size={120} at={yrAt}>1983</Headline>
      <div style={{ position: 'absolute', left: 560, top: 260, width: 680, height: 680, borderRadius: 340, background: '#0B1A12', border: `8px solid ${P.bone}`, overflow: 'hidden' }}>
        {[1, 2, 3].map((k) => <div key={k} style={{ position: 'absolute', left: 340 - k * 100, top: 340 - k * 100, width: k * 200, height: k * 200, borderRadius: '50%', border: '2px solid rgba(120,220,150,.35)' }} />)}
        <div style={{ position: 'absolute', left: 340, top: 340, width: 340, height: 4, background: 'rgba(120,220,150,.8)', transformOrigin: '0 50%', transform: `rotate(${sweep}deg)` }} />
        {[0, 1, 2, 3, 4].map((k) => f > fiveAt + k * 4 && <div key={k} style={{ position: 'absolute', left: 200 + k * 60, top: 180 + (k % 2) * 40 }}><Rocket size={46} color="#7CDC96" /></div>)}
      </div>
      {f > errAt && <Badge I={X} x={1500} y={480} at={errAt} size={170} label="COMPUTER ERROR" />}
      {f > rightAt && <Badge I={Check} x={1500} y={800} at={rightAt} size={170} label="HE WAS RIGHT" />}
      <Src dark style={{ left: 90, bottom: 40 }}>Soviet early-warning false alarm, 26 Sep 1983 ⚠ add source</Src>
    </Base>
  );
};

// 58 · four screens, four capitals → who can stop it?
const Capitals: React.FC<{ qAt: number }> = ({ qAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const caps = ['WASHINGTON', 'TEHRAN', 'MOSCOW', 'BEIJING'];
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      {caps.map((c, i) => (
        <div key={c} style={{ position: 'absolute', left: 140 + (i % 2) * 640, top: 150 + Math.floor(i / 2) * 400, width: 600, height: 360, background: '#05070B', border: '8px solid #2B2F38', outline: `4px solid ${P.ink}`, padding: 30 }}>
          <div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 54, color: P.bone }}>{c}</div>
          {[0, 1, 2].map((k) => <div key={k} style={{ marginTop: 24, height: 20, width: `${90 - k * 22}%`, background: 'rgba(246,241,228,.22)' }} />)}
          <div style={{ position: 'absolute', right: 20, top: 20, width: 14, height: 14, borderRadius: 7, background: P.red, opacity: (f + i * 7) % 30 < 15 ? 1 : 0.2 }} />
        </div>
      ))}
      <LiveJake pose="think" seed="p8end" beats={[{ at: qAt, r: 'think', hold: 300 }]} style={{ position: 'absolute', left: 1460, top: 300, height: 820 }} />
      {f > qAt && <div style={{ position: 'absolute', left: 1460, top: 140, transform: `scale(${sp(f, qAt, fps)})` }}><KeyRound size={150} color={P.amber} /></div>}
      <WhatIf dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part08: React.FC = () => {
  const s = (id: string) => shotT(id);
  const w = (id: string, x: string, n = 0) => rel(wordT(id, x, n), s(id));
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('54')} to={s('54a')} name="54"><Enter kind="zoom"><Taboo yrAt={w('54', '1945')} /></Enter></At>
      <At base={B} from={s('54a')} to={s('55')} name="54a"><Enter kind="drop"><Work qAt={w('54a', 'work')} whereAt={w('54a', 'uranium')} tabooAt={w('54a', 'taboo')} missAt={w('54a', 'missed')} /></Enter></At>
      <At base={B} from={s('55')} to={s('56')} name="55"><Enter kind="slideL"><Allies chooseAt={w('55', 'choose')} backAt={w('55', 'back')} notesAt={w('55', 'notes')} /></Enter></At>
      <At base={B} from={s('56')} to={s('56a')} name="56"><Enter kind="zoom"><Need at={w('56', 'government')} ansAt={w('56', 'answer')} /></Enter></At>
      <At base={B} from={s('56a')} to={s('56b')} name="56a"><Enter kind="slideL"><Water radAt={w('56a', 'radiation')} seaAt={w('56a', 'sea')} tapsAt={w('56a', 'taps')} /></Enter></At>
      <At base={B} from={s('56b')} to={s('57')} name="56b"><Enter kind="slideL"><UN fiveAt={w('56b', 'five')} vetoAt={w('56b', 'block')} usAt={w('56b', 'united', 1)} /></Enter></At>
      <At base={B} from={s('57')} to={s('58')} name="57"><Enter kind="zoom"><Petrov yrAt={w('57', '1983')} fiveAt={w('57', 'five')} errAt={w('57', 'error')} rightAt={w('57', 'right')} /></Enter></At>
      <At base={B} from={s('58')} to={END} name="58"><Enter kind="zoom"><Capitals qAt={w('58', 'stop')} /></Enter></At>
      <PartSound base={B} cues={[[wordT('54', '1945'), 'counter', 0.05], [wordT('54a', 'taboo'), 'paper', 0.06], [wordT('56b', 'block'), 'paper', 0.06], [wordT('57', 'five'), 'tick', 0.05]]} />
    </AbsoluteFill>
  );
};
export const EP03_P8_FRAMES = fr(END - B);
