import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bandage, Banknote, Briefcase, Building2, FileText, Handshake, Home, Hourglass, Landmark, Lock, Plane, Trees, UserRound } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building, Pawn } from '../ep03/PaperWorld';
import { B, Badge, Bug, Door, Frame, Grain, Label, PaperGround, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { Apartment, Hemicycle, PhoneText } from './Story';
import { BigLine, FlipCalendar, PartShell, Shot, Slot, Stamp, clamp, ease, k01, partFrames, rel } from './parts';
import { World } from './parts';
import { Tag } from 'lucide-react';

// EP04 · PART 04 (paragraphs 14–19) — Dana's paycheck, the CBO numbers, the OLD Congress decides, 2018, three paths, Jake's bills → door two.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

// A · STORY — Jake on the phone with Dana.
const A: React.FC<{ s: number }> = ({ s }) => (
  <Enter kind="fade" dur={8}>
    <AbsoluteFill style={{ transformOrigin: '600px 650px', transform: `scale(${1.15 + useCurrentFrame() / 2500})` }}>
      <Apartment dawn lamp={0.3} tvOn={0.3} tv={<AbsoluteFill style={{ background: '#1d2b33' }} />}>
        <LiveJake pose="think" seed="p4call" beats={[{ at: 4, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
      </Apartment>
    </AbsoluteFill>
    <Badge I={UserRound} x={1260} y={330} at={4} size={150} tone="amber" label="Dana" />
    <PhoneText from="DANA" text="Shutdown again?" x={1360} y={520} at={rel(W(14, 'cousin'), s)} />
    <div style={{ position: 'absolute', left: 48, bottom: 34, background: B.red, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 26, padding: '2px 12px', letterSpacing: 3 }}>ILLUSTRATIVE CHARACTER</div>
    <Bug dark /><Grain />
  </Enter>
);

// B · EXPLAINER — show up or stay home, the paycheck stops either way.
const Bx: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const show = rel(W(14, 'showing'), s), home = rel(W(14, 'home'), s), stops = rel(W(14, 'stops'), s);
  const go = ease(k01(f, show - 4, show + 12)), back = ease(k01(f, home - 4, home + 12));
  const stub = spring({ frame: f - (stops - 6), fps, config: { damping: 13, stiffness: 150 } });
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <Badge I={Building2} x={1500} y={420} at={show - 6} size={170} label="Work" />
        <Badge I={Home} x={420} y={420} at={home - 6} size={170} label="Home" />
        <Pawn x={960 + go * 360} y={760} base={B.pine} scale={0.9} seed="dana" glasses hop={show} />
        {f >= home - 4 && <div style={{ opacity: 0.55 }}><Pawn x={960 - back * 360} y={760} base={B.pine} scale={0.9} seed="dana2" glasses /></div>}
        <div style={{ position: 'absolute', left: 960, top: 400, transform: `translate(-50%,-50%) scale(${stub}) rotate(-3deg)`, width: 460, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)', padding: '20px 30px' }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 38, color: B.muted, letterSpacing: 4 }}>PAYCHECK</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, color: B.red, lineHeight: 1 }}>$0</div>
        </div>
      </World>
    </Enter>
  );
};

// C · CBO — $400M a day (counter + day squares)
const C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const amt = rel(W(15, 'four'), s), day = rel(W(15, 'every'), s);
  const days = Math.max(0, Math.floor((f - day) / 9));
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: amt, r: 'surprise', hold: 40 }, { at: day + 20, r: 'worry', hold: 300 }] }}>
        <Badge I={Landmark} x={960} y={170} at={2} size={120} label="CBO" />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 220, color: B.ink, opacity: k01(f, amt - 4, amt + 4) }}>
          ${f < day ? 400 : (400 * (days + 1)).toLocaleString('en-US')}M
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 64, color: B.red, letterSpacing: 4, opacity: k01(f, day - 4, day + 4) }}>{f < day ? 'A DAY · BACK PAY' : `${days + 1} DAY${days ? 'S' : ''}`}</div>
        <div style={{ position: 'absolute', left: 360, top: 760, display: 'flex', gap: 14 }}>
          {Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ width: 70, height: 70, background: i <= days && f >= day ? B.red : B.bone, border: `4px solid ${B.ink}` }} />)}
        </div>
        <Src>CBO estimate (Sep 2025): ≈ $400M per day in compensation for furloughed workers, paid later as back pay</Src>
      </World>
    </Enter>
  );
};

// D · Employees ✓ back pay · Contractors ✗ → "$7B lost for good"
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const emp = rel(W(15, 'Federal', 1), s), con = rel(W(15, 'Contractors'), s), seven = rel(W(15, 'seven'), s);
  const lost = f >= seven - 4;
  const lk = k01(f, seven - 4, seven + 6);
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: con, r: 'doubt', hold: 40 }, { at: seven, r: 'surprise', hold: 200 }] }}>
        <div style={{ opacity: 1 - lk }}>
          <Slot I={UserRound} label="EMPLOYEES" x={640} y={500} at={emp - 4} ok={rel(W(15, 'back', 1), s)} size={240} />
          <Slot I={Briefcase} label="CONTRACTORS" x={1280} y={500} at={con - 4} no={con + 6} size={240} />
        </div>
        {lost && (
          <div style={{ opacity: lk }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 240, color: B.ink }}>$7B</div>
            <Stamp text="GONE" x={1300} y={420} at={seven + 10} />
            {Array.from({ length: 6 }).map((_, i) => {
              const t = k01(f, seven + i * 3, seven + 30 + i * 3);
              return <div key={i} style={{ position: 'absolute', left: 700 + i * 90, top: 700 + t * 220, width: 60, height: 30, background: '#8A9A7A', border: `3px solid ${B.ink}`, transform: `rotate(${t * 140 - 30}deg)`, opacity: 1 - t }} />;
            })}
          </div>
        )}
        <Src>{lost ? 'CBO: at least $7B of economic output permanently lost (2025 shutdown)' : 'Federal workers: back pay guaranteed by law (2019) · contractors: not covered'}</Src>
      </World>
    </Enter>
  );
};

// E · THE OLD CONGRESS DECIDES — timeline with DEC 11 inside the old Congress' window
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const decides = rel(W(16, 'decide'), s), old = rel(W(16, 'old'), s), predicted = rel(W(16, 'predicted'), s), push = rel(W(16, 'pushing'), s);
  const X0 = 260, X1 = 1660, xDec = X0 + (X1 - X0) * 0.45, xJan = X0 + (X1 - X0) * 0.72;
  const dec = xDec + ease(k01(f, push, push + 24)) * (X1 - 120 - xDec);
  const grow = ease(k01(f, 2, 26));
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ position: 'absolute', left: X0, top: 620, width: (X1 - X0) * grow, height: 18, background: B.ink, borderRadius: 9 }} />
        <div style={{ position: 'absolute', left: X0, top: 520, width: (xJan - X0) * k01(f, old - 6, old + 10), height: 70, background: 'rgba(180,69,47,.22)', border: `4px solid ${B.red}` }} />
        <div style={{ position: 'absolute', left: xJan, top: 520, width: (X1 - xJan) * k01(f, old, old + 14), height: 70, background: 'rgba(63,90,140,.18)', border: `4px solid ${B.blue}` }} />
        {[0, 1, 2].map((i) => <Pawn key={i} x={X0 + 140 + i * 110} y={510} base={B.red} scale={0.55} seed={'od' + i} hop={old + i * 3} />)}
        {[0, 1, 2].map((i) => <Pawn key={'n' + i} x={xJan + 120 + i * 110} y={510} base={B.blue} scale={0.55} seed={'nd' + i} />)}
        <div style={{ position: 'absolute', left: dec, top: 629, transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: B.red, border: `5px solid ${B.ink}` }} />
          <div style={{ position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 52, color: B.red, whiteSpace: 'nowrap' }}>DEC 11</div>
        </div>
        <div style={{ position: 'absolute', left: xJan, top: 629, transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: B.blue, border: `5px solid ${B.ink}` }} />
          <div style={{ position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 52, color: B.blue, whiteSpace: 'nowrap' }}>JAN 3</div>
        </div>
        <Badge I={Lock} x={xDec} y={330} at={decides} size={130} tone="red" />
        <Badge I={Bandage} x={1300} y={240} at={predicted} size={130} tone="amber" label="Another stopgap?" />
        <Src>Outgoing Congress sits until Jan 3, 2027 · a second stopgap was predicted by a senior House appropriator (Bloomberg Government)</Src>
      </World>
    </Enter>
  );
};

// F · 2018 — "after Democrats won the House, … shut down in December … about five weeks, into the new Congress."
const F: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const house = rel(W(17, 'House'), s), dec = rel(W(17, 'December'), s), weeks = rel(W(17, 'weeks'), s);
  const nWeeks = Math.min(5, Math.max(0, Math.floor((f - weeks + 12) / 5)));
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 170, color: B.ink }}>2018</div>
        <Frame src="ep04/footage/cap_house_floor.mp4" video x={500} y={600} w={620} h={430} rot={-2} at={2} year="House chamber · archive" rate={0.8} trim={60} />
        <Hemicycle x={1300} y={560} r={220} seats={435} rows={9} dot={5.2} blue={235} flipFrom={195} flipAt={house} label="HOUSE" at={4} />
        <FlipCalendar x={1060} y={860} dates={[['DEC', '22'], ['JAN', '25']]} from={dec} to={weeks} size={0.42} />
        <div style={{ position: 'absolute', left: 1260, top: 820, display: 'flex', gap: 10 }}>
          {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ width: 64, height: 64, background: i < nWeeks ? B.red : B.bone, border: `4px solid ${B.ink}`, fontFamily: cond, fontWeight: 800, fontSize: 30, color: B.bone, textAlign: 'center', lineHeight: '58px' }}>{i < nWeeks ? `W${i + 1}` : ''}</div>)}
        </div>
        <Src>Partial shutdown Dec 22, 2018 – Jan 25, 2019 · film: 'Washington: The Nation's Capitol' (1930s), Prelinger Archives (PD)</Src>
      </World>
    </Enter>
  );
};

// G · THREE PATHS → a delay
const G: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const one = rel(W(18, 'One'), s), two = rel(W(18, 'Two'), s), three = rel(W(18, 'Three'), s), delay = rel(W(18, 'delay'), s);
  const items: [typeof Banknote, string][] = [[Banknote, 'paycheck'], [FileText, 'permit'], [Trees, 'park'], [Plane, 'airport']];
  const showD = f >= delay - 6;
  const dk = k01(f, delay - 6, delay + 6);
  const draw = (at: number) => ease(k01(f, at - 2, at + 14));
  const paths: [number, number][] = [[one, 300], [two, 540], [three, 780]];
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'point', beats: [{ at: one, r: 'think', hold: delay - one - 4 }, { at: delay, r: 'worry', hold: 300 }] }}>
        <div style={{ opacity: 1 - dk }}>
          <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
            {paths.map(([at, y], i) => <path key={i} d={`M 380 540 C 700 540, 700 ${y}, 1100 ${y}`} fill="none" stroke={B.ink} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw(at)} 1`} opacity={0.75} />)}
          </svg>
          <div style={{ position: 'absolute', left: 300, top: 540, transform: 'translate(-50%,-50%)', width: 150, height: 150, borderRadius: 75, background: B.red, border: `6px solid ${B.ink}`, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 0.9 }}>DEC<br />11</div>
          <Badge I={Bandage} x={1200} y={300} at={one + 4} size={130} label="Stopgap" />
          <Badge I={Handshake} x={1200} y={540} at={two + 4} size={130} label="Deal" />
          <Badge I={Lock} x={1200} y={780} at={three + 4} size={130} tone="red" label="Shutdown" />
        </div>
        {showD && (
          <div style={{ opacity: dk }}>
            <Badge I={Hourglass} x={960} y={260} at={delay} size={170} tone="amber" />
            {items.map(([I, w], i) => <Badge key={w} I={I} x={420 + i * 360} y={700} at={rel(W(18, w), s)} size={170} />)}
          </div>
        )}
      </World>
    </Enter>
  );
};

// H · STORY — Jake's own bills; the second door is behind him
const H: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const second = rel(W(19, 'second'), s);
  const pan = ease(k01(f, second - 4, second + 22));
  const bills: [string, string][] = [['RENT', 'Rent'], ['PHONE', 'Phone'], ['CAR', 'Car']];
  return (
    <Enter kind="fade" dur={8}>
      <AbsoluteFill style={{ transform: `translateX(${-pan * 700}px)` }}>
        <AbsoluteFill style={{ transformOrigin: '600px 650px', transform: 'scale(1.15)' }}>
          <Apartment dawn lamp={0.3} tvOn={0.2} tv={<AbsoluteFill style={{ background: '#1d2b33' }} />}>
            <div style={{ position: 'absolute', left: 820, top: 880, width: 620, height: 30, background: '#5B4636', border: `4px solid ${B.ink}` }} />
            <LiveJake pose="stand" seed="p4bills" beats={[{ at: 2, r: 'think', hold: second - 6 }, { at: second, r: 'surprise', hold: 30 }]} style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
          </Apartment>
        </AbsoluteFill>
        {bills.map(([b, w], i) => {
          const at = rel(W(19, w), s);
          return <Label key={b} x={1050 + i * 230} y={800} at={at} size={46} rot={(i - 1) * 5}>{b}</Label>;
        })}
        <div style={{ position: 'absolute', left: 2280, top: 0, width: 400, height: 1080, background: '#2A3550' }} />
        <Door x={2480} y={900} n={2} I={Tag} label="" at={second - 2} color={B.blue} w={260} />
      </AbsoluteFill>
      <Bug dark /><Grain />
    </Enter>
  );
};

const FIRST = 14, NEXT = 20;
export const EP04_P4_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(14), W(14, 'works'), (s) => <A s={s} />, 'A story · call'],
  [W(14, 'works'), paraT(15), (s) => <Bx s={s} />, 'B show up / stay home'],
  [paraT(15), W(15, 'Federal', 1), (s) => <C s={s} />, 'C $400M a day'],
  [W(15, 'Federal', 1), paraT(16), (s) => <D s={s} />, 'D back pay · $7B'],
  [paraT(16), paraT(17), (s) => <E s={s} />, 'E old congress timeline'],
  [paraT(17), paraT(18), (s) => <F s={s} />, 'F 2018'],
  [paraT(18), paraT(19), (s) => <G s={s} />, 'G three paths → delay'],
  [paraT(19), paraT(NEXT), (s) => <H s={s} />, 'H story · bills → door 2'],
];
export const EP04Part04: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(14, 'cousin'), 'type', 0.05], [W(14, 'stops'), 'paper', 0.07], [W(15, 'every'), 'counter', 0.05], [W(15, 'seven'), 'paper', 0.07],
    [W(16, 'pushing'), 'paper', 0.05], [W(17, 'weeks'), 'tick', 0.05], [W(18, 'One'), 'tick', 0.05], [W(18, 'Two'), 'tick', 0.05], [W(18, 'Three'), 'tick', 0.05],
    [W(19, 'second'), 'paper', 0.06],
  ]} />
);
