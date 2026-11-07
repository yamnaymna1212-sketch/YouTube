import React from 'react';
import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FileText, KeyRound, Landmark, Lock, PenLine, Sunrise, Timer, Trophy, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building, Pawn, Road } from '../ep03/PaperWorld';
import { B, Badge, Bug, Frame, Grain, Label, PaperGround, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { Apartment, Hemicycle } from './Story';
import { BigLine, Bill, FlipCalendar, PartShell, Shot, Slot, Stamp, clamp, ease, k01, partFrames, rel } from './parts';
import { World } from './parts';

// EP04 · PART 02 (paragraphs 5–8) — "Nothing changes tomorrow" · how a bill becomes law · the power of the purse.
// Story (Jake's morning) → calendar → stage → process slots → seat charts → real Article I film → money & lock → Jake's calendar.

const W = (p: number, w: string, n = 0) => wordT(p, w, n);

// A · STORY — morning after: door light → Jake's apartment at dawn. "First, a reality check. Nothing changes tomorrow."
const A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const light = 1 - k01(f, 0, 14);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transformOrigin: '600px 650px', transform: `scale(${1.15 + f / 2500})` }}>
        <Apartment dawn lamp={0.2} tvOn={0.4} tv={<AbsoluteFill style={{ background: '#1d2b33' }} />}>
          <LiveJake pose="cheer" seed="p2morning" beats={[{ at: 2, r: 'smile', hold: rel(W(5, 'Nothing'), s) - 6 }, { at: rel(W(5, 'Nothing'), s), r: 'shrug', hold: 80 }]}
            style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
        </Apartment>
      </AbsoluteFill>
      <Badge I={Sunrise} x={1300} y={300} at={rel(W(5, 'tomorrow'), s)} size={160} tone="amber" />
      <AbsoluteFill style={{ background: `linear-gradient(${B.gold}, #F6E3A8)`, opacity: light }} />
      <Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// B · CALENDAR — "The new Congress doesn't take office until January third."
const DATES: [string, string][] = [['NOV', '4'], ['NOV', '11'], ['NOV', '18'], ['NOV', '25'], ['DEC', '2'], ['DEC', '9'], ['DEC', '16'], ['DEC', '23'], ['DEC', '30'], ['JAN', '3']];
const Bc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const jan = rel(W(5, 'January'), s);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 6, r: 'think', hold: jan - 8 }, { at: jan, r: 'surprise', hold: 60 }] }}>
        <FlipCalendar x={760} y={540} dates={DATES} from={2} to={jan} ringAt={jan + 2} />
        {[0, 1, 2].map((i) => (
          <Pawn key={i} x={1250 + i * 120 + (1 - ease(k01(f, 4 + i * 3, 30 + i * 3))) * 400} y={780} base={B.blue} scale={0.8} seed={'nb' + i} hop={jan + i * 2} />
        ))}
        <Label x={1370} y={840} at={jan} size={40} tone="ink">New Congress</Label>
        <Src>20th Amendment: new Congress convenes Jan 3</Src>
      </World>
    </Enter>
  );
};

// C · STAGE — "Until then, the old one is still in charge."
const C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const charge = rel(W(5, 'charge'), s);
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <AbsoluteFill style={{ transformOrigin: '1100px 600px', transform: `scale(${1.25 + f / 1800})` }}>
          <Building kind="cap" x={1100} y={700} scale={1.25} />
          {[0, 1, 2].map((i) => <Pawn key={i} x={960 + i * 140} y={690} base={B.red} scale={0.75} seed={'oc' + i} hop={charge + i * 3} />)}
          {[0, 1, 2].map((i) => <Pawn key={'b' + i} x={1520 + i * 90} y={830} base={B.blue} scale={0.55} seed={'wb' + i} />)}
          <Label x={1610} y={880} at={6} size={26}>Waiting · Jan 3</Label>
        </AbsoluteFill>
        <Badge I={KeyRound} x={420} y={380} at={charge} size={150} />
        <Label x={420} y={520} at={charge + 4} size={40} tone="red">Old Congress</Label>
      </World>
    </Enter>
  );
};

// D · VETO PEN — "And the president is still the president, with a veto pen."
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pen = rel(W(5, 'veto'), s);
  const p = spring({ frame: f - pen, fps, config: { damping: 11, stiffness: 150 } });
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <AbsoluteFill style={{ transformOrigin: '700px 650px', transform: `scale(${1.2 + f / 1800})` }}>
          <Building kind="wh" x={700} y={720} scale={1.2} />
          <Pawn x={1050} y={760} base={B.red} scale={0.9} seed="pres6" />
          <Label x={1050} y={810} at={4} size={34}>The President</Label>
        </AbsoluteFill>
        <div style={{ position: 'absolute', left: 1450, top: 470, transform: `translate(-50%,-50%) rotate(${-30 + 30 * p}deg) scale(${p})` }}>
          <div style={{ width: 230, height: 230, borderRadius: '50%', background: B.bone, border: `7px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PenLine size={120} color={B.ink} strokeWidth={2.2} /></div>
        </div>
        <Stamp text="VETO" x={1450} y={730} at={pen + 8} />
      </World>
    </Enter>
  );
};

// E+F+G · PROCESS — "Here's how it works, in sixty seconds… House… Senate… signs… veto… two-thirds… almost never happens."
const SLOT_X = [380, 800, 1220];
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const t3 = rel(W(6, 'three'), s), house = rel(W(6, 'House'), s), senate = rel(W(6, 'Senate'), s), signs = rel(W(6, 'signs'), s);
  const veto = rel(W(6, 'veto'), s), two = rel(W(6, 'two-thirds'), s), never = rel(W(6, 'never'), s);
  // the bill paper travels slot to slot, then bounces back from the president on the veto
  const pos = f < house ? 220 : f < senate ? interpolate(f, [house - 8, house], [220, SLOT_X[0]], clamp) : f < signs ? interpolate(f, [senate - 8, senate], [SLOT_X[0], SLOT_X[1]], clamp) : f < veto ? interpolate(f, [signs - 8, signs], [SLOT_X[1], SLOT_X[2]], clamp) : interpolate(f, [veto, veto + 14], [SLOT_X[2], SLOT_X[1]], clamp);
  const showSeats = f >= two - 6;
  const seatsK = k01(f, two - 6, two + 6);
  const fall = f >= never ? Math.sin((f - never) * 1.4) * Math.max(0, 10 - (f - never) * 0.5) : 0;
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'point', beats: [{ at: 4, r: 'think', hold: veto - 6 }, { at: veto, r: 'surprise', hold: 30 }, { at: two, r: 'doubt', hold: 300 }] }}>
        <Badge I={Timer} x={800} y={150} at={2} size={130} />
        <div style={{ opacity: 1 - seatsK, transform: `translateY(${-seatsK * 80}px)` }}>
          <div style={{ position: 'absolute', left: 240, right: 640, top: 453, height: 14, background: B.sand, border: `4px solid ${B.ink}`, borderRadius: 7 }} />
          <Slot I={Landmark} label="HOUSE" x={SLOT_X[0]} y={460} at={t3} ok={house + 2} />
          <Slot I={Landmark} label="SENATE" x={SLOT_X[1]} y={460} at={t3 + 3} ok={senate + 2} />
          <Slot I={PenLine} label="PRESIDENT" x={SLOT_X[2]} y={460} at={t3 + 6} ok={signs + 2} no={veto} />
          <div style={{ position: 'absolute', left: pos, top: 760, transform: `translate(-50%,-50%) rotate(${Math.sin(f / 6) * 4}deg)` }}>
            <div style={{ width: 120, height: 150, background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '6px 6px 0 rgba(27,34,48,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={70} color={B.ink} strokeWidth={2.2} /></div>
          </div>
        </div>
        {showSeats && (
          <div style={{ opacity: seatsK, transform: `translateX(${fall}px)` }}>
            <Hemicycle x={480} y={760} r={300} seats={435} rows={10} dot={7} blue={f >= never ? 270 : Math.round(interpolate(f, [two, never], [0, 280], clamp))} label="HOUSE" />
            <Hemicycle x={1160} y={760} r={300} seats={100} rows={6} dot={15} blue={f >= never ? 62 : Math.round(interpolate(f, [two, never], [0, 64], clamp))} label="SENATE" />
            <div style={{ position: 'absolute', left: 0, width: 1640, top: 240, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 150, color: B.red }}>⅔ + ⅔</div>
          </div>
        )}
        {f >= never && <Stamp text="RARE" x={820} y={560} at={never + 4} rot={-6} />}
        <Src>U.S. Constitution, Art. I §7 · override needs ⅔ of each chamber</Src>
      </World>
    </Enter>
  );
};

// I · WHAT DID THEY WIN — "So what did Democrats actually win? Mostly, one thing. The power of the purse."
const I: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const win = rel(W(7, 'win'), s), purse = rel(W(7, 'purse'), s);
  const swap = f >= purse;
  const p = spring({ frame: f - (swap ? purse : win), fps, config: { damping: 10, stiffness: 180 } });
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 4, r: 'think', hold: purse - 6 }, { at: purse, r: 'smile', hold: 200 }] }}>
        <Pawn x={560} y={780} base={B.blue} scale={1.1} seed="dwin" hop={win} />
        <div style={{ position: 'absolute', left: 1080, top: 470, transform: `translate(-50%,-50%) scale(${p})` }}>
          <div style={{ width: 300, height: 300, borderRadius: '50%', background: swap ? B.amber : B.bone, border: `8px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {swap ? <Wallet size={160} color={B.ink} strokeWidth={2.2} /> : <Trophy size={160} color={B.ink} strokeWidth={2.2} />}
          </div>
        </div>
        {swap && <BigLine y={760} at={purse} size={100}>The power of the purse</BigLine>}
      </World>
    </Enter>
  );
};

// J · REAL — Article I film + the line that matters. "The Constitution says no money leaves the Treasury unless Congress passes a law for it."
const J: React.FC<{ s: number }> = ({ s }) => {
  const law = rel(W(7, 'law'), s);
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <Frame src="ep04/footage/pow_article1.mp4" video x={640} y={520} w={860} h={600} rot={-2} at={2} year="1947" rate={0.9} trim={150} />
        <div style={{ position: 'absolute', left: 1440, top: 300, transform: 'translate(-50%,0)', textAlign: 'center' }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 120, color: B.ink, lineHeight: 0.95 }}>NO MONEY</div>
          <div style={{ fontFamily: display, fontSize: 60, color: '#6B6352', margin: '18px 0' }}>…</div>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 120, color: B.red, lineHeight: 0.95, opacity: k01(useCurrentFrame(), law - 4, law + 4) }}>WITHOUT A LAW</div>
        </div>
        <Src>U.S. Const. Art. I §9 cl. 7 · film: 'The Powers of Congress' (1947), public domain</Src>
      </World>
    </Enter>
  );
};

// K · MONEY INTO THE VAULT — "Every dollar. Which means that from January, no spending bill passes without them."
const K: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const jan = rel(W(7, 'January'), s), without = rel(W(7, 'without'), s);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <Building kind="cap" x={1200} y={760} scale={1.15} />
        {Array.from({ length: 9 }).map((_, i) => {
          const t = ((f - i * 5) / 26) % 1;
          if (f - i * 5 < 0 || f > without + 6) return null;
          return <Bill key={i} x={200 + t * 900} y={300 + Math.sin(t * Math.PI) * -120 + i * 8} w={190} rot={-12 + t * 24} note={i % 3 === 0 ? '100' : '20'} opacity={interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0])} />;
        })}
        <Pawn x={1560} y={800} base={B.blue} scale={0.85} seed="keyd" hop={jan} />
        <Badge I={KeyRound} x={1560} y={470} at={jan} size={130} tone="amber" />
        <Badge I={Lock} x={1200} y={330} at={without} size={160} tone="red" />
        <Src>Bills: U.S. Currency Education Program SPECIMEN images (uscurrency.gov)</Src>
      </World>
    </Enter>
  );
};

// L · GATE — "And the president can't spend what Congress won't fund."
const L: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const spend = rel(W(7, 'spend', 1), s), fund = rel(W(7, 'fund'), s);
  const reach = ease(k01(f, spend - 6, spend + 8));
  const bounce = f > fund ? Math.sin((f - fund) * 1.3) * Math.max(0, 14 - (f - fund) * 0.7) : 0;
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <Building kind="wh" x={420} y={720} scale={0.95} />
        <Pawn x={780 + reach * 220} y={780} base={B.red} scale={0.9} seed="pres7" />
        <div style={{ position: 'absolute', left: 1180 + bounce, top: 380, width: 30, height: 420, background: B.ink }} />
        {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: 'absolute', left: 1100 + bounce, top: 420 + i * 80, width: 190, height: 14, background: B.ink }} />)}
        <Badge I={Lock} x={1195 + bounce} y={600} at={fund - 4} size={120} tone="red" />
        {[0, 1, 2].map((i) => <Bill key={i} x={1560 + i * 40} y={560 + i * 50} w={230} rot={-10 + i * 9} note="100" />)}
      </World>
    </Enter>
  );
};

// M · STORY — "That's why the first date matters." Jake looks at his wall calendar; camera dives into DEC 11.
const M: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const dive = ease(k01(f, 18, 52));
  return (
    <Enter kind="fade" dur={8}>
      <AbsoluteFill style={{ transformOrigin: '775px 230px', transform: `scale(${1.1 + dive * 4})` }}>
        <Apartment dawn lamp={0.2} tvOn={0.3} tv={<AbsoluteFill style={{ background: '#1d2b33' }} />}>
          <LiveJake pose="think" seed="p2cal" face={{ look: 0.6, lookY: -0.6 }} beats={[{ at: 4, r: 'worry', hold: 200 }]} style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
        </Apartment>
      </AbsoluteFill>
      <Grain />
    </Enter>
  );
};

const P2 = 5, NEXT = 9;
export const EP04_P2_FRAMES = partFrames(P2, NEXT);
const shots: Shot[] = [
  [paraT(5), W(5, 'new'), (s) => <A s={s} />, 'A story · morning'],
  [W(5, 'new'), W(5, 'Until', 1), (s) => <Bc s={s} />, 'B calendar'],
  [W(5, 'Until', 1), W(5, 'president'), (s) => <C s={s} />, 'C old congress'],
  [W(5, 'president'), paraT(6), (s) => <D s={s} />, 'D veto pen'],
  [paraT(6), paraT(7), (s) => <E s={s} />, 'E process + seats'],
  [paraT(7), W(7, 'Constitution'), (s) => <I s={s} />, 'I win → purse'],
  [W(7, 'Constitution'), W(7, 'Every'), (s) => <J s={s} />, 'J real · Article I'],
  [W(7, 'Every'), W(7, 'president'), (s) => <K s={s} />, 'K money + lock'],
  [W(7, 'president'), paraT(8), (s) => <L s={s} />, 'L gate'],
  [paraT(8), paraT(NEXT), (s) => <M s={s} />, 'M story · calendar'],
];
export const EP04Part02: React.FC = () => (
  <PartShell first={P2} shots={shots} cues={[
    [W(5, 'tomorrow'), 'paper', 0.05], [W(5, 'January'), 'paper', 0.07], [W(5, 'veto'), 'paper', 0.08],
    [W(6, 'House'), 'tick', 0.06], [W(6, 'Senate'), 'tick', 0.06], [W(6, 'signs'), 'tick', 0.06], [W(6, 'veto'), 'paper', 0.08],
    [W(7, 'purse'), 'counter', 0.05], [W(7, 'without'), 'paper', 0.07], [W(7, 'fund'), 'paper', 0.06],
  ]} />
);
