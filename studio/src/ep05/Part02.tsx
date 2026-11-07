import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Cake, Check, Clock, FolderOpen, Handshake, Hospital, MapPin, Microscope, Pause, ShieldAlert, Stethoscope, TrendingUp, Vote, Wind } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Pawn } from '../ep03/PaperWorld';
import { B, Badge, Frame, Kicker, Label, NameCard, PaperUS, QuoteCard, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, Slot, Stamp, World, partFrames } from './parts';
import { Console, GulfMap, PriceTag, Podium, Pump, Solar, Turbine, WhatIfTag, atW, easeO, kk } from './props';

// EP05 · PART 02 (paragraphs 5–11, 0:30–1:39) — who is he, what he has said about gas (three things), both sides, no plan → the levers.
const W = wordT;

// A · WHO IS HE — framed public-domain hearing photo + name card; one icon slot swaps: doctor → epidemiologist → Detroit health dept
const A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const steps = [a(5, 'doctor'), a(5, 'epidemiologist'), a(5, "Detroit's")];
  const idx = steps.filter((t) => f >= t).length - 1;
  const I = [Stethoscope, Microscope, Hospital][Math.max(0, idx)];
  const pop = idx >= 0 ? spring({ frame: f - steps[idx], fps, config: { damping: 10, stiffness: 180 } }) : 0;
  const labels = ['Doctor', 'Epidemiologist', 'Detroit health'];
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="stage" jake={false} whatIf={false}>
        <Frame src="sayed/abdul_el_sayed_testifying_at_committee_hearing_2024.jpg" x={560} y={430} w={700} h={480} rot={-2} at={2} year="U.S. Senate HELP Committee · 2024 (public domain)" pos="50% 30%" />
        <NameCard kicker="Who is he?" title="Abdul El-Sayed" x={1000} y={250} at={6} size={92} w={760} />
        {idx >= 0 && (
          <div style={{ position: 'absolute', left: 1340, top: 600, transform: `translate(-50%,-50%) scale(${pop})`, textAlign: 'center' }}>
            <div style={{ width: 230, height: 230, borderRadius: '50%', background: B.bone, border: `7px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><I size={120} color={B.ink} strokeWidth={2.2} /></div>
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 56, color: B.ink, letterSpacing: 2, marginTop: 20, textTransform: 'uppercase' }}>{labels[idx]}</div>
          </div>
        )}
        <Src>Photo: U.S. Senate HELP Committee, 2024 (public domain) · Detroit Health Department director 2015–17</Src>
      </World>
    </Enter>
  );
};

// B · HE WON — paper US map, Michigan fills blue, ballot ✓, SENATE stamp
const Bm: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const nov = a(5, 'November'), won = a(5, 'won'), senate = a(5, 'Senate');
  const on = kk(f, won - 4, won + 12);
  return (
    <Enter kind="slideL">
      <World kind="plain" jake={{ beats: [{ at: 4, r: 'think', hold: won - 8 }, { at: won, r: 'nod', hold: 300 }] }} whatIf={false}>
        <AbsoluteFill style={{ transformOrigin: '1050px 330px', transform: `scale(${1 + 0.35 * easeO(kk(f, 0, won + 10))})` }}>
          <PaperUS x={180} y={160} w={1240} fill={(n) => (n === 'Michigan' ? B.blue : undefined)} on={(n) => (n === 'Michigan' ? on : 0)} />
        </AbsoluteFill>
        <Label x={360} y={180} at={nov} size={46}>Nov 3, 2026</Label>
        <Badge I={Vote} x={1330} y={260} at={won} size={130} />
        <div style={{ position: 'absolute', left: 1395, top: 205, transform: `scale(${kk(f, won + 6, won + 12)})` }}><div style={{ width: 60, height: 60, borderRadius: 30, background: B.pine, border: `4px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={40} color={B.bone} strokeWidth={3.5} /></div></div>
        <Stamp text="U.S. SENATE" x={1050} y={640} at={senate} rot={-6} size={84} color={B.blue} />
        <Src>Michigan U.S. Senate race, Nov 3, 2026 (AP call) · map: U.S. Census / us-atlas</Src>
      </World>
    </Enter>
  );
};

// C · ELIGIBLE, NOT RUNNING — two checks, one cross, then the WHAT IF stamp (tag stays for the rest of the episode)
const Cc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const born = a(5, 'born'), elig = a(5, 'eligible'), but = a(5, 'But'), isnt = a(5, "isn't"), whatif = a(5, 'what-if');
  return (
    <Enter kind="slideL">
      <World kind="stage" jake={{ beats: [{ at: 4, r: 'nod', hold: but - 8 }, { at: but, r: 'doubt', hold: whatif - but }, { at: whatif, r: 'smile', hold: 200 }] }} whatIf={false}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center' }}><Kicker size={34}>Art. II · who can be president</Kicker></div>
        <Slot I={MapPin} label="Born in U.S." x={420} y={430} at={born - 6} ok={born + 6} />
        <Slot I={Cake} label="Age 35+" x={760} y={430} at={elig - 10} ok={elig + 4} />
        <Slot I={Vote} label="Running?" x={1100} y={430} at={but} no={isnt} />
        {f >= whatif - 4 && <Stamp text="WHAT IF" x={760} y={720} at={whatif - 4} rot={-7} size={140} />}
        {f >= whatif + 6 && <WhatIfTag at={whatif + 6} />}
        <Src>U.S. Const. Art. II §1 · El-Sayed (b. 1984, Michigan) is a Senator-elect and has not announced any run</Src>
      </World>
    </Enter>
  );
};

// D · THREE THINGS — three numbered paper tags drop on strings
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const three = a(6, 'Three');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'point', beats: [{ at: 2, r: 'think', hold: three - 4 }, { at: three, r: 'nod', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: 100, color: B.ink, opacity: kk(f, 0, 10) }}>What he said about gas</div>
        {[0, 1, 2].map((i) => {
          const k = spring({ frame: f - (three + i * 5), fps, config: { damping: 8, stiffness: 120 } });
          const swing = Math.sin((f - three - i * 5) / 9) * 6 * Math.max(0, 1 - (f - three) / 60);
          return (
            <div key={i} style={{ position: 'absolute', left: 520 + i * 300, top: 0, transformOrigin: '50% 0%', transform: `translateY(${(k - 1) * 500}px) rotate(${swing}deg)` }}>
              <div style={{ width: 4, height: 330, background: B.ink, margin: '0 auto' }} />
              <div style={{ width: 200, height: 200, background: [B.red, B.blue, B.pine][i], border: `7px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 140, color: B.bone }}>{i + 1}</div>
            </div>
          );
        })}
        <Src>El-Sayed campaign statements and debate, Sep–Oct 2026</Src>
      </World>
    </Enter>
  );
};

// E1 · ONE — the war (night Gulf map, strait glows, tankers)
const E1: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const iran = a(7, 'Iran');
  return (
    <Enter kind="fade" dur={8}>
      <GulfMap at={iran - 4} zoom={1 + f / 1600}>
        <div style={{ position: 'absolute', left: 80, top: 120 }}>
          <Kicker color={B.glow}>One · the blame</Kicker>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 96, color: B.nightText, marginTop: 8, opacity: kk(f, iran - 4, iran + 6) }}>The war with Iran</div>
        </div>
      </GulfMap>
      <WhatIfTag dark />
      <Src dark>Map: Natural Earth (public domain) · U.S.–Iran war since Feb 28, 2026</Src>
    </Enter>
  );
};

// E2 · $5 IN MICHIGAN — paper pump at $5, the quote "illegal war"
const E2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const five = a(7, 'five'), illegal = a(7, 'illegal');
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <Label x={420} y={170} at={2} size={46}>Michigan · Sept 2026</Label>
        <Pump x={420} y={900} scale={1.1} sale={f >= five ? '$5.00' : '$4.79'} glow={kk(f, five, five + 8)} />
        {f >= five && <PriceTag x={700} y={360} text="$5" at={five} tone="red" size={110} />}
        <QuoteCard text="“Illegal war”" who="El-Sayed · Sept 17, 2026" x={1270} y={500} w={760} at={illegal - 6} size={120} />
        <Src>abdulforsenate.com statement, Sept 17, 2026 ("$5 a gallon for gas") · AAA Michigan average</Src>
      </World>
    </Enter>
  );
};

// F · TWO — the debate: two podiums agree on pausing the federal gas tax
const Fd: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const debate = a(8, 'debate'), rogers = a(8, 'Rogers'), both = a(8, 'both'), pausing = a(8, 'pausing'), rare = a(8, 'rare'), agreed = a(8, 'agreed');
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="stage" jake={false}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center' }}><Kicker size={34}>Two · Oct 8 debate, Grand Rapids</Kicker></div>
        <Pawn x={540} y={770} base={B.blue} scale={0.9} seed="els" hop={both} />
        <Podium x={540} y={900} name="EL-SAYED" color={B.blue} at={debate - 6} />
        <Pawn x={1380} y={770} base={B.red} scale={0.9} seed="rog" hop={both + 4} />
        <Podium x={1380} y={900} name="ROGERS" color={B.red} at={rogers - 6} />
        <PriceTag x={960} y={420} text="18.4¢" at={pausing - 10} size={100} />
        <Badge I={Pause} x={960} y={600} at={pausing} size={130} tone="amber" />
        {f >= agreed - 4 && <Badge I={Handshake} x={960} y={250} at={agreed - 4} size={150} tone="red" />}
        {f >= rare && <div style={{ position: 'absolute', left: 680, top: 390, transform: 'translateX(-50%) rotate(-6deg)', fontFamily: cond, fontWeight: 800, fontSize: 72, color: B.red, letterSpacing: 4, opacity: kk(f, rare, rare + 8) }}>RARE</div>}
        <Src>WDIV/ClickOnDetroit, Oct 9, 2026: both backed temporarily suspending the federal gas tax</Src>
      </World>
    </Enter>
  );
};

// G1 · THREE — the long game: turbines and solar grow, "100%", "yesterday"
const G1: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const long = a(9, 'long'), hundred = a(9, 'hundred'), renew = a(9, 'renewable'), yest = a(9, 'yesterday');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: hundred, r: 'surprise', hold: 30 }, { at: yest, r: 'nod', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center' }}><Kicker size={34}>Three · the long game</Kicker></div>
        {[300, 520, 740].map((x, i) => <Turbine key={x} x={x} y={900} h={430 - i * 40} at={renew - 8 + i * 4} />)}
        {[1000, 1200].map((x, i) => <Solar key={x} x={x} y={900} at={renew + i * 4} />)}
        <div style={{ position: 'absolute', left: 1100, top: 360, transform: 'translate(-50%,-50%)', fontFamily: display, fontWeight: 800, fontSize: 260, color: B.pine, opacity: kk(f, hundred, hundred + 8) }}>100%</div>
        <Badge I={Wind} x={560} y={240} at={long} size={110} />
        {f >= yest - 4 && <Badge I={Clock} x={1420} y={560} at={yest - 4} size={130} tone="red" label="Yesterday" />}
        <Src>Bridge Michigan, June 3, 2026: "We need 100% renewable energy, and we need it yesterday"</Src>
      </World>
    </Enter>
  );
};

// G2 · GREEN NEW DEAL · "BAN GAS CARS?" → the fact-check
const G2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const green = a(9, 'Green'), nineteen = a(9, 'nineteen'), rogers = a(9, 'Rogers'), ban = a(9, 'ban'), fact = a(9, 'fact-check'), never = a(9, 'never'), campaign = a(9, 'campaign');
  const strike = kk(f, never, never + 10);
  return (
    <Enter kind="slideL">
      <World kind="stage" jake={{ beats: [{ at: rogers, r: 'doubt', hold: fact - rogers }, { at: fact, r: 'nod', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 420, top: 330, transform: 'translate(-50%,-50%) rotate(-3deg)', background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)', padding: '20px 40px', opacity: kk(f, green - 6, green + 4) }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 4, color: B.pine }}>BACKED IN {f >= nineteen ? '2019' : ''}</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: B.ink }}>Green New Deal</div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 560, transform: 'translate(-50%,-50%)', opacity: kk(f, rogers, rogers + 8) }}>
          <Car x={0} y={110} color={B.blue} scale={1.6} />
        </div>
        {f >= ban - 2 && <Stamp text="BAN?" x={1000} y={420} at={ban - 2} rot={-8} size={110} />}
        <div style={{ position: 'absolute', left: 860, top: 420, width: 280 * strike, height: 14, background: B.ink, transform: 'rotate(-8deg)', transformOrigin: '0 50%' }} />
        {f >= fact - 4 && <Label x={1000} y={760} at={fact - 4} size={52}>Fact-check: never proposed</Label>}
        {f >= campaign && <Badge I={Check} x={1340} y={420} at={campaign} size={110} tone="bone" />}
        <Src>Bridge Michigan fact check: El-Sayed never called for a ban on gas cars; campaign says he doesn't support one</Src>
      </World>
    </Enter>
  );
};
const Car: React.FC<{ x: number; y: number; color: string; scale: number }> = ({ x, y, color, scale }) => (
  <svg width={260} height={120} viewBox="0 0 260 120" style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, overflow: 'visible' }}>
    <path d="M20 80 L30 52 L80 48 L110 20 L180 20 L210 50 L245 56 L250 82 Z" fill={color} stroke={B.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M118 28 L174 28 L196 50 L100 50 Z" fill={B.bone} stroke={B.ink} strokeWidth={4} />
    <circle cx={70} cy={84} r={20} fill={B.ink} /><circle cx={200} cy={84} r={20} fill={B.ink} />
  </svg>
);

// H · BOTH SIDES — equal-weight split card
const H: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const critics = a(10, 'critics'), up = a(10, 'up'), says = a(10, 'says', 1), shocks = a(10, 'shocks');
  const Side: React.FC<{ x: number; at: number; I: typeof TrendingUp; who: string; line: string; tone: 'red' | 'amber' }> = ({ x, at, I, who, line, tone }) => (
    <div style={{ position: 'absolute', left: x, top: 230, width: 680, height: 560, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.2)', opacity: kk(f, at - 4, at + 6), transform: `translateY(${(1 - kk(f, at - 4, at + 8)) * 60}px)` }}>
      <div style={{ background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 6, padding: '10px 30px' }}>{who}</div>
      <Badge I={I} x={340} y={250} at={at + 6} size={170} tone={tone} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 410, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 76, color: B.ink }}>{line}</div>
    </div>
  );
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <Side x={200} at={critics} I={TrendingUp} who="CRITICS" line={f >= up ? 'Costs go up' : ''} tone="red" />
        <Side x={1040} at={says} I={ShieldAlert} who="EL-SAYED" line={f >= shocks ? 'Oil = shocks' : ''} tone="amber" />
        <div style={{ position: 'absolute', left: 960, top: 510, transform: 'translate(-50%,-50%)', fontFamily: display, fontWeight: 800, fontSize: 80, color: B.muted }}>vs</div>
        <Src>Critics: Washington Examiner op-ed (Oct 2026) · El-Sayed: Bridge Michigan (June 2026)</Src>
      </World>
    </Enter>
  );
};

// I · NO PLAN → THE LEVERS — Jake opens an empty folder; it turns into the dashboard
const Ip: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const plan = a(11, 'plan'), guess = a(11, 'guessing'), look = a(11, 'look'), any = a(11, 'any');
  const open = spring({ frame: f - (plan - 8), fps, config: { damping: 14, stiffness: 120 } });
  const gone = kk(f, look - 6, look + 4);
  return (
    <Enter kind="slideL">
      <World jake={{ pose: 'shrug', beats: [{ at: plan, r: 'shrug', hold: guess - plan }, { at: guess, r: 'think', hold: look - guess }, { at: look, r: 'nod', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 860, top: 430, transform: `translate(-50%,-50%) scale(${(1 - gone) * open})`, opacity: 1 - gone }}>
          <div style={{ width: 640, height: 440, background: B.amber, border: `7px solid ${B.ink}`, borderRadius: '10px 40px 10px 10px', boxShadow: '12px 12px 0 rgba(27,34,48,.22)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 60, top: 40, width: 520, height: 360, background: '#FBF8F1', border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 200, color: 'rgba(27,34,48,.18)' }}>?</div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: -70, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 56, color: B.ink, letterSpacing: 4 }}><FolderOpen size={50} color={B.ink} style={{ verticalAlign: 'middle', marginRight: 12 }} />ENERGY PLAN</div>
          </div>
        </div>
        <Console x={860} y={760} scale={0.8} at={look - 2} pop={[look, look + 3, look + 6, look + 9, look + 12]} />
        {f >= any && <div style={{ position: 'absolute', left: 860, top: 160, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 700, fontSize: 92, color: B.ink, whiteSpace: 'nowrap', opacity: kk(f, any, any + 8) }}>Any president</div>}
        <Src>No detailed energy plan published by the El-Sayed campaign as of Nov 2026</Src>
      </World>
    </Enter>
  );
};

const FIRST = 5, NEXT = 12;
export const EP05_P2_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(5), W(5, 'November') - 0.3, (s) => <A s={s} />, 'A who'],
  [W(5, 'November') - 0.3, W(5, 'born') - 0.6, (s) => <Bm s={s} />, 'B won'],
  [W(5, 'born') - 0.6, paraT(6), (s) => <Cc s={s} />, 'C eligible / what if'],
  [paraT(6), paraT(7), (s) => <D s={s} />, 'D three things'],
  [paraT(7), W(7, 'September') - 0.2, (s) => <E1 s={s} />, 'E1 war'],
  [W(7, 'September') - 0.2, paraT(8), (s) => <E2 s={s} />, 'E2 $5 · quote'],
  [paraT(8), paraT(9), (s) => <Fd s={s} />, 'F debate'],
  [paraT(9), W(9, 'backed') - 0.2, (s) => <G1 s={s} />, 'G1 renewables'],
  [W(9, 'backed') - 0.2, paraT(10), (s) => <G2 s={s} />, 'G2 GND / ban? / fact-check'],
  [paraT(10), paraT(11), (s) => <H s={s} />, 'H both sides'],
  [paraT(11), paraT(NEXT), (s) => <Ip s={s} />, 'I no plan → levers'],
];
export const EP05Part02: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(5, 'doctor'), 'tick', 0.05], [W(5, 'epidemiologist'), 'tick', 0.05], [W(5, "Detroit's"), 'tick', 0.05], [W(5, 'Senate'), 'paper', 0.07],
    [W(5, 'born'), 'tick', 0.05], [W(5, 'eligible'), 'tick', 0.05], [W(5, "isn't"), 'paper', 0.06], [W(5, 'what-if'), 'paper', 0.08],
    [W(6, 'Three'), 'paper', 0.06], [W(7, 'five'), 'counter', 0.05], [W(7, 'illegal'), 'paper', 0.06],
    [W(8, 'pausing'), 'tick', 0.05], [W(8, 'agreed'), 'paper', 0.06], [W(9, 'hundred'), 'tick', 0.05], [W(9, 'ban'), 'paper', 0.07],
    [W(9, 'never'), 'tick', 0.05], [W(10, 'critics'), 'paper', 0.05], [W(11, 'look'), 'paper', 0.06],
  ]} />
);
