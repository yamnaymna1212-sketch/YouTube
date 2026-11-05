import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Video } from '@remotion/media';
import { Building2, CircleCheck, FileX, Landmark, Mail, ShieldPlus, TrendingDown, TrendingUp, UserRound } from 'lucide-react';
import { C, F } from '../theme';
import { clamp, ease } from '../ui/Film';
import { LiveJake } from '../host/LiveJake';
import { Cue, Ico, Label, Push, Src, World, useDur } from './Hook';
import { Cut, Cuts, Illus, Wallet, t01 } from './Part1';
import { PAY_MUSIC_FROM } from './FilePay';
import { Scoreboard } from './Score';
import { remap, voFrames } from './timing';

// EP02 · FILE 04 · WHO PAYS? (vo_06). vo_05b / vo_05c (new script, not voiced yet) will go in front of this.
const A = (f: string) => staticFile(`sayed/${f}`);
const VO = 'vo_06';
const rel = (orig: number, shotStart: number) => remap(VO, orig) - remap(VO, shotStart);
const fade = (f: number, at: number, len = 12) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: ease });
const GREEN = '#6FBF73';

// Q0 · CARD over the real Capitol.
const Q0: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('us_capitol_east_side.JPG')} from={1.1} to={1.2} filter="saturate(.5) brightness(.42)" />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.9), transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 160, top: 300 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <Ico I={Landmark} size={100} color={C.red} at={0} />
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 26, color: C.steel, letterSpacing: 3 }}>FILE 04</div>
            <div style={{ fontFamily: F.serif, fontSize: 170, color: C.bone, lineHeight: 0.95 }}>Who pays?</div>
          </div>
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 34, color: C.bone, marginTop: 34, opacity: fade(f, 20) }}>El-Sayed: <i>the very richest Americans should pay more.</i></div>
      </div>
      <Wallet value="+$1,440 +$6,800 − ?" />
      <Src>Michigan Public, Oct 20, 2026 · Photo: Martin Falbisoner (CC BY-SA 3.0)</Src>
    </AbsoluteFill>
  );
};

// Q1 · EVIDENCE: no detailed tax plan published — the honest version.
const Q1: React.FC = () => {
  const f = useCurrentFrame();
  const stamp = fade(f, 20, 8);
  return (
    <AbsoluteFill style={{ background: '#E8E2D6', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 820, height: 640, background: C.paper, boxShadow: '0 30px 80px rgba(0,0,0,.25)', padding: '50px 60px', transform: `rotate(-1.5deg)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><FileX size={50} color="#7A7266" strokeWidth={1.5} /><div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: '#2A2620' }}>DETAILED TAX PLAN</div></div>
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ height: 16, background: '#E2DBCD', borderRadius: 8, marginTop: 34, width: `${90 - i * 8}%` }} />)}
        <div style={{ position: 'absolute', left: 160, top: 260, border: `8px solid ${C.red}`, color: C.red, fontFamily: F.sans, fontWeight: 900, fontSize: 70, letterSpacing: 6, padding: '10px 30px', transform: `rotate(-12deg) scale(${1.6 - 0.6 * stamp})`, opacity: stamp }}>NOT PUBLISHED</div>
      </div>
      <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 60, color: C.ink, marginTop: 40, opacity: fade(f, rel(200, 119)) }}>So here's the honest version.</div>
      <Src dark>Status as of Nov 5, 2026</Src>
    </AbsoluteFill>
  );
};

// Q2 · EXPLAINER: two ways to pay — A keeps most of the $1,440, B takes part back.
const Q2: React.FC = () => {
  const f = useCurrentFrame();
  const card = (tag: string, I: any, title: string, res: string, col: string, Arrow: any, at: number) => {
    const o = fade(f, at);
    return (
      <div style={{ width: 760, background: 'rgba(12,13,16,.6)', border: `2px solid ${col}55`, padding: '36px 40px', opacity: o, transform: `translateY(${(1 - o) * 40}px)` }}>
        <div style={{ fontFamily: F.mono, fontSize: 24, color: col, letterSpacing: 3 }}>{tag}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14 }}><Ico I={I} size={54} color={C.bone} at={at} /><div style={{ fontFamily: F.serif, fontSize: 56, color: C.bone, lineHeight: 1.05 }}>{title}</div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 30, fontFamily: F.sans, fontWeight: 600, fontSize: 32, color: col, opacity: fade(f, at + 30) }}><Arrow size={44} color={col} strokeWidth={1.6} />{res}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 60 }}>
        {card('PLAN A', Building2, 'Taxes on the very rich & big corporations', 'Jake keeps most of the $1,440', GREEN, TrendingUp, 0)}
        {card('PLAN B', UserRound, 'A broad payroll tax on everyone', 'part of it comes back out of his check', C.red, TrendingDown, rel(498, 272))}
      </div>
      <Src>Illustrative scenarios · no official plan yet</Src>
    </AbsoluteFill>
  );
};

// Q3 · EXPLAINER over real archive footage (1948 budget film): the bill changes address.
const Q3: React.FC = () => {
  const f = useCurrentFrame();
  const move = fade(f, rel(780, 639), 40);
  const x = 330 + move * 950;
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Video src={A('footage/v12_budget_ledger_1948.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.3) blur(2px) brightness(.35)' }} />
      </div>
      <div style={{ position: 'absolute', left: 200, top: 360, width: 420, textAlign: 'center' }}>
        <Ico I={ShieldPlus} size={100} color={C.steel} at={0} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, letterSpacing: 4, color: C.bone, marginTop: 12 }}>TODAY · PRIVATE BILL</div>
      </div>
      <div style={{ position: 'absolute', right: 200, top: 360, width: 420, textAlign: 'center' }}>
        <Ico I={Landmark} size={100} color={C.amber} at={rel(780, 639)} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, letterSpacing: 4, color: C.bone, marginTop: 12 }}>M4A · PUBLIC BILL</div>
      </div>
      <div style={{ position: 'absolute', left: x, top: 300 - Math.sin(move * Math.PI) * 120, transform: `rotate(${-8 + move * 16}deg)` }}><Mail size={110} color={C.bone} strokeWidth={1.3} /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 170, textAlign: 'center' }}>
        <span style={{ fontFamily: F.serif, fontSize: 70, color: C.bone, opacity: fade(f, rel(865, 639)) }}>The bill doesn't vanish. </span>
        <span style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 70, color: C.amber, opacity: fade(f, rel(920, 639)) }}>It changes address.</span>
      </div>
      <Src>Footage: Coronet film, 1948 (public domain)</Src>
    </AbsoluteFill>
  );
};

// Q4 · WORLD: Jake at the diner doing napkin math.
const Q4: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.2 + 0.05 * t})` }}><World blur={9} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.35)' }} />
      <LiveJake pose="stand" seed="q4" beats={[{ at: 8, r: 'think' }]} style={{ position: 'absolute', left: 220, top: 120, height: 1000 }} />
      <div style={{ position: 'absolute', right: 160, top: 260, width: 640, background: '#F6F2EA', padding: '40px 46px', boxShadow: '0 30px 70px rgba(0,0,0,.5)', transform: 'rotate(2deg)' }}>
        <div style={{ fontFamily: F.mono, fontSize: 20, color: '#7A7266', letterSpacing: 2 }}>NAPKIN MATH</div>
        <div style={{ fontFamily: F.serif, fontSize: 56, color: C.ink, marginTop: 16, textDecoration: `line-through ${C.red}`, opacity: fade(f, 10) }}>Premiums −$1,440</div>
        <div style={{ fontFamily: F.serif, fontSize: 56, color: C.ink, marginTop: 14, opacity: fade(f, rel(1060, 948)) }}>New tax <span style={{ color: C.red }}>?</span></div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 100, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 64, color: '#fff', textShadow: '0 4px 24px rgba(0,0,0,.6)', opacity: fade(f, rel(1055, 948)) }}>The real question: what replaces them?</div>
      <Wallet value="+$1,440 +$6,800 − ?" />
      <Illus />
    </AbsoluteFill>
  );
};

// Q5 · REAL PHOTO: the Capitol — a president proposes, Congress decides.
const Q5: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('us_capitol_east_side.JPG')} from={1.25} to={1.38} origin="50% 40%" filter="saturate(.7) brightness(.55)" />
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.85), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 170, textAlign: 'center' }}>
        <span style={{ fontFamily: F.serif, fontSize: 96, color: C.bone, opacity: fade(f, rel(1155, 1129)) }}>A president proposes. </span>
        <span style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 96, color: C.amber, opacity: fade(f, rel(1201, 1129)) }}>Congress decides.</span>
      </div>
      <Src>Photo: Martin Falbisoner (CC BY-SA 3.0)</Src>
    </AbsoluteFill>
  );
};

// Q6 · EXPLAINER: both chambers must agree.
const Q6: React.FC = () => {
  const f = useCurrentFrame();
  const ch = (name: string, at: number) => (
    <div style={{ textAlign: 'center', opacity: fade(f, at) }}>
      <Ico I={Landmark} size={110} color={C.ink} at={at} />
      <div style={{ fontFamily: F.serif, fontSize: 80, color: C.ink, marginTop: 10 }}>{name}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, opacity: fade(f, at + 14) }}><CircleCheck size={60} color={GREEN} strokeWidth={1.6} /></div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 100, alignItems: 'center' }}>{ch('House', 0)}<div style={{ fontFamily: F.serif, fontSize: 100, color: '#7A7266' }}>+</div>{ch('Senate', 10)}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: '#7A7266', marginTop: 40 }}>BOTH CHAMBERS WOULD NEED TO AGREE</div>
    </AbsoluteFill>
  );
};

const Q7: React.FC = () => <Scoreboard />;

const WHO: Cut[] = [
  ['card', 0, 119, Q0], ['noplan', 119, 272, Q1], ['plans', 272, 639, Q2], ['address', 639, 948, Q3], ['napkin', 948, 1129, Q4],
  ['congress', 1129, 1250, Q5], ['chambers', 1250, 1314, Q6], ['score', 1314, 1390, Q7],
];
const WHO_CUES: Cue[] = [[0, 'paper', 0.07], [139, 'paper', 0.07], [498, 'tick', 0.05], [865, 'tick', 0.05], [1314, 'tick', 0.05], [1323, 'tick', 0.05], [1332, 'tick', 0.05]];
export const WHOPAYS_MUSIC_FROM = PAY_MUSIC_FROM + voFrames('vo_05') + 10;
export const FileWhoPays: React.FC = () => <Cuts cuts={WHO} vo={VO} musicFrom={WHOPAYS_MUSIC_FROM} cues={WHO_CUES} />;
