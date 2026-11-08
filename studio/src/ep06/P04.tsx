import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, Briefcase, Car, CreditCard, Home, Landmark, Repeat, TrendingDown, TrendingUp, Receipt, Clock, Coins, Building2 } from 'lucide-react';
import { ChapterCard, Door, Src } from '../brand/Brand';
import { paraT, wordT as W } from './t';
import { B, BigLine, Enter, FlyInto, Illus, LiveJake, NightAvenue, PartShell, Pawn, Phone, Stamp, World, atW, cond, display, easeO, F, fr, kk, partFrames, spr, type Shot, MeterChip } from './kit';
import { Cap, Card, CountUp, Disc, Gear, HBar, Line, Pop, Tag, VBar } from './scenes';
import { Bug, Grain } from '../brand/Brand';

const DOOR_I = [Landmark, Home, Banknote];
const DOOR_C = [B.red, B.blue, B.pine];
const DOOR_L = ['TAXES', 'LOANS', 'DOLLAR'];

/** Door chapter card: the door swings open and the camera flies through into the title. */
export const DoorChapter: React.FC<{ s: number; n: number; title: string; end: number }> = ({ s, n, title, end }) => {
  const f = useCurrentFrame();
  const len = fr(end - s);
  const open = Math.min(10, len * 0.25);
  const fly = Math.min(len * 0.5, 20);
  return (
    <AbsoluteFill>
      <ChapterCard n={`DOOR ${['ONE', 'TWO', 'THREE'][n - 1]}`} title={title} at={fly} />
      <div style={{ opacity: 1 - kk(f, fly, fly + 8) }}>
        <FlyInto at={open + 4} dur={Math.max(8, fly - open)} ox="960px 600px" to={9}>
          <World jake={false} skyline={0.3}>
            <Door x={960} y={880} n={n} I={DOOR_I[n - 1]} label={DOOR_L[n - 1]} w={300} at={0} openAt={open} color={DOOR_C[n - 1]} />
          </World>
        </FlyInto>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================================
// PART 04 · THE THREE DOORS + DOOR 1 · TAXES & SERVICES (paragraphs 10–14)
// =============================================================================================

// A · coins pour into the street; three doors rise on Pennsylvania Avenue
const P4A: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const money = a(10, 'money'), three = a(10, 'Three'), doors = a(10, 'doors');
  return (
    <Enter kind="zoom" dur={10}>
      <FlyInto at={fr(end - s) - 10} dur={12} ox="560px 640px" to={7}>
        <World jake={{ beats: [{ at: doors, r: 'surprise', hold: 60 }], x: 1620 }} meter={0} t0={s}>
          {Array.from({ length: 14 }).map((_, i) => {
            const at = money + i * 2;
            const k = kk(f, at, at + 22);
            if (f < at) return null;
            return <div key={i} style={{ position: 'absolute', left: 300 + i * 70, top: -60 + k * 900, width: 56, height: 56, borderRadius: '50%', background: B.amber, border: `5px solid ${B.ink}`, opacity: 1 - kk(f, at + 18, at + 24) }} />;
          })}
          {[0, 1, 2].map((i) => <Door key={i} x={560 + i * 380} y={880} n={i + 1} I={DOOR_I[i]} label={DOOR_L[i]} w={240} at={three - 4 + i * 5} color={DOOR_C[i]} />)}
          <Src>Three ways the debt reaches you: your taxes &amp; services · your loans · your dollar</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

// B · the household: income envelope, the minimum payment pays FIRST, the rest is what's left
const P4B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const house = a(12, 'household'), min = a(12, 'minimum'), first = a(12, 'first'), left = a(12, 'left'), every = a(12, 'everything');
  const take = easeO(kk(f, first - 2, first + 14));
  return (
    <Enter kind="slideL">
      <World jake={false} meter={0} t0={s}>
        <Card x={420} y={430} at={house - 4} head="INCOME" value={<Coins size={140} color={B.ink} strokeWidth={2} />} w={420} tone={B.pine} />
        <Card x={1000} y={360} at={min} head="MINIMUM PAYMENT" value="PAY FIRST" w={560} size={80} tone={B.red} rot={2} />
        <Cap x={1000} y={520} at={min + 6} text="① INTEREST" size={44} color={B.red} />
        {Array.from({ length: 10 }).map((_, i) => {
          const goes = i < 4;
          const x0 = 360 + (i % 5) * 30, y0 = 640 + Math.floor(i / 5) * 40;
          const x1 = goes ? 940 + i * 40 : 1360 + (i - 4) * 46, y1 = goes ? 640 : 760;
          const k = goes ? take : easeO(kk(f, left - 2, left + 14));
          return <div key={i} style={{ position: 'absolute', left: x0 + (x1 - x0) * k, top: y0 + (y1 - y0) * k, width: 52, height: 52, borderRadius: '50%', background: B.amber, border: `5px solid ${B.ink}` }} />;
        })}
        <Cap x={1500} y={860} at={every} text="EVERYTHING ELSE" size={42} />
        <Src>Analogy: interest is paid before anything else in the budget (CBO, mandatory net interest)</Src>
      </World>
    </Enter>
  );
};

// C · the minimum grows → three things can give: taxes ↑ · services ↓ · borrow more (loop)
const P4C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const grows = a(12, 'grows'), taxes = a(12, 'Taxes'), spend = a(12, 'Spending'), borrows = a(12, 'borrows'), bigger = a(12, 'bigger');
  const loop = kk(f, borrows, bigger + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: grows, r: 'worry', hold: 40 }, { at: bigger, r: 'doubt', hold: 200 }] }} meter={0} t0={s}>
        <Card x={960} y={250} at={grows - 4} head="MINIMUM PAYMENT" value={<span>↑ grows</span>} w={520} size={80} />
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          {[[460, 640, taxes], [960, 680, spend], [1460, 640, borrows]].map(([x, y, at], i) => (
            <path key={i} d={`M960 380 L${x} ${(y as number) - 120}`} stroke={B.ink} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${kk(f, (at as number) - 8, at as number)} 1`} fill="none" />
          ))}
        </svg>
        <Disc I={TrendingUp} x={460} y={640} at={taxes} size={190} label="TAXES ↑" tone={B.amber} />
        <Disc I={TrendingDown} x={960} y={680} at={spend} size={190} label="SERVICES ↓" tone={B.sand} />
        <div style={{ position: 'absolute', left: 1460, top: 640, transform: `translate(-50%,-50%) rotate(${loop * 360}deg)` }}><div style={{ opacity: kk(f, borrows - 2, borrows + 4) }}><Repeat size={10} color="transparent" /></div></div>
        <Disc I={Repeat} x={1460} y={640} at={borrows} size={190} label="BORROW MORE" tone={B.red} />
        <Tag x={1460} y={360} at={bigger} text="NEXT PAYMENT ↑" tone="red" size={46} rot={3} />
        <Src>The three options are the arithmetic of any budget; which mix to choose is a political decision</Src>
      </World>
    </Enter>
  );
};

// D · two podiums (neutral colors): CUT SPENDING · RAISE REVENUE · experts: SOME OF BOTH · the clock ticks
const Podium: React.FC<{ x: number; at: number; label: string; color: string }> = ({ x, at, label, color }) => (
  <Pop x={x} y={700} at={at}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 160, height: 190 }}><Pawn x={80} y={190} base={color} scale={0.6} seed={label} /></div>
      <div style={{ width: 300, height: 200, background: B.bone, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 46, color: B.ink, letterSpacing: 2, padding: 10, boxShadow: '10px 10px 0 rgba(27,34,48,.2)' }}>{label}</div>
    </div>
  </Pop>
);
const P4D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const cut = a(13, 'cut'), raise = a(13, 'raise'), both = a(13, 'both'), harder = a(13, 'harder');
  return (
    <Enter kind="slideL">
      <World jake={false} meter={0} t0={s}>
        <BigLine y={100} at={2} size={86}>Nobody agrees</BigLine>
        <Podium x={420} at={cut - 6} label="CUT SPENDING" color={B.sand} />
        <Podium x={1500} at={raise - 6} label="RAISE REVENUE" color={B.sand} />
        <Tag x={960} y={560} at={both} text="SOME OF BOTH" tone="amber" size={70} rot={-2} />
        <Disc I={Clock} x={960} y={800} at={harder - 8} size={140} label="WAITING = HARDER" />
        <Src>Positions summarized neutrally · "some of both": CRFB / CBO options reports</Src>
      </World>
    </Enter>
  );
};

// E · the gap: revenue $5.40T vs spending $7.40T = $1.99T deficit; growth arrows 3% · 5.5% · 8%
const P4E: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const def = a(14, 'deficit'), two = a(14, 'two'), rev = a(14, 'Revenue'), spend = a(14, 'Spending'), intr = a(14, 'interest'), eight = a(14, 'eight');
  return (
    <Enter kind="zoom" dur={10}>
      <FlyInto at={fr(end - s) - 10} dur={12} ox="1500px 300px" to={6}>
        <World jake={false} meter={0} t0={s}>
          <VBar x={330} y={860} w={230} h={440} a={def - 4} b={def + 12} color={B.pine} value="$5.40T" label="COLLECTED" />
          <VBar x={640} y={860} w={230} h={600} a={def + 4} b={def + 20} color={B.red} value="$7.40T" label="SPENT" />
          <div style={{ position: 'absolute', left: 215, top: 260, width: 230, height: 160, border: `6px dashed ${B.red}`, opacity: kk(f, two - 6, two), background: 'rgba(180,69,47,.10)' }} />
          <Tag x={900} y={330} at={two} text="GAP $1.99T" tone="red" size={60} rot={-3} />
          <HBar x={1080} y={300} w={600} h={90} frac={0.37} a={rev} b={rev + 12} color={B.pine} label="REVENUE" value="+3%" />
          <HBar x={1080} y={520} w={600} h={90} frac={0.69} a={spend} b={spend + 12} color={B.sand} label="SPENDING" value="+5.5%" />
          <HBar x={1080} y={740} w={600} h={90} frac={1} a={intr} b={eight + 6} color={B.red} label="INTEREST" value="+8%" />
          <Src>Monthly Treasury Statement FY2026: receipts $5.40T (+3.2%), outlays $7.40T (+5.5%), net interest +8.4%, deficit $1.99T</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

export const EP06_P4_FRAMES = partFrames(10, 15);
export const EP06Part04: React.FC = () => {
  const shots: Shot[] = [
    [paraT(10), paraT(11), (s) => <P4A s={s} end={paraT(11)} />, 'A three doors'],
    [paraT(11), paraT(12), (s) => <DoorChapter s={s} n={1} title="Taxes & services" end={paraT(12)} />, 'B door 1'],
    [paraT(12), W(12, 'When'), (s) => <P4B s={s} />, 'C household'],
    [W(12, 'When'), paraT(13), (s) => <P4C s={s} />, 'D three give'],
    [paraT(13), paraT(14), (s) => <P4D s={s} />, 'E podiums'],
    [paraT(14), paraT(15), (s) => <P4E s={s} end={paraT(15)} />, 'F deficit gap'],
  ];
  return <PartShell first={10} shots={shots} cues={[[W(10, 'doors'), 'paper', 0.06], [W(11, 'one'), 'paper', 0.06], [W(12, 'minimum'), 'tick', 0.05], [W(12, 'Taxes'), 'tick', 0.05], [W(12, 'Spending'), 'tick', 0.05], [W(12, 'borrows'), 'tick', 0.05], [W(13, 'both'), 'paper', 0.06], [W(14, 'two'), 'counter', 0.05], [W(14, 'eight'), 'tick', 0.05]]} />;
};

// =============================================================================================
// PART 05 · DOOR 2 · YOUR LOANS (paragraphs 15–19)
// =============================================================================================

// B · the bond sets a floor: a Treasury bond slides out; the rate becomes a floor line; loans sit on it
const P5B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const bonds = a(16, 'Treasury'), floor = a(16, 'floor'), mort = a(16, 'Mortgages'), car = a(16, 'Car'), biz = a(16, 'Business'), cc = a(16, 'credit'), mark = a(16, 'markup');
  const line = kk(f, floor - 4, floor + 12);
  return (
    <Enter kind="slideL">
      <World jake={false} meter={0} t0={s}>
        <Card x={360} y={330} at={bonds - 4} head="U.S. TREASURY BOND" value="4.84%" sub="10-YEAR · NOV 5, 2026" w={520} tone={B.blue} size={100} />
        <div style={{ position: 'absolute', left: 120, top: 640, height: 10, width: 1680 * line, background: B.red }} />
        <Cap x={1650} y={690} at={floor} text="THE FLOOR" size={44} color={B.red} />
        {[[Home, mort, 'MORTGAGE', 0], [Car, car, 'CAR LOAN', 0], [Briefcase, biz, 'BUSINESS', 0], [CreditCard, cc, 'CREDIT CARD', 1]].map(([I, at, l, high], i) => {
          const h = high ? 150 + 140 * kk(f, mark - 4, mark + 10) : 70;
          return (
            <React.Fragment key={i}>
              <div style={{ position: 'absolute', left: 820 + i * 260 - 8, top: 640 - h, width: 16, height: h, background: B.ink, opacity: kk(f, (at as number), (at as number) + 6) }} />
              <Disc I={I as typeof Home} x={820 + i * 260} y={640 - h - 80} at={at as number} size={130} label={l as string} />
            </React.Fragment>
          );
        })}
        <Src>FRED DGS10 (Federal Reserve): 10-year Treasury yield 4.84% on Nov 5, 2026</Src>
      </World>
    </Enter>
  );
};

// C · the proof: mortgage 6.22% → 7.18% and 10-year 4.11% → 4.84% (Nov 2025 → Nov 2026)
const P5C: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const ago = a(17, 'ago'), seven = a(17, 'seven'), fred = a(17, 'Freddie'), ten = a(17, 'ten-year'), four = a(17, 'four'), eight = a(17, 'eight', 1);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: seven, r: 'surprise', hold: 40 }] }} meter={0} t0={s}>
        <Cap x={330} y={160} at={ago - 6} text="NOV 2025" size={46} />
        <Cap x={1140} y={160} at={ago - 6} text="NOV 2026" size={46} />
        <Line x={330} y={260} w={810} h={260} pts={[[0, 0.15], [0.3, 0.4], [0.55, 0.55], [0.8, 0.95], [1, 0.8]]} a={ago} b={seven + 6} color={B.red} dots={['6.22%', '7.18%']} label="30-YEAR MORTGAGE" />
        <Line x={330} y={650} w={810} h={200} pts={[[0, 0.1], [0.35, 0.35], [0.6, 0.5], [0.85, 0.95], [1, 0.75]]} a={ten} b={eight + 6} color={B.blue} dots={['4.11%', '4.84%']} label="10-YEAR TREASURY" />
        <Src>Freddie Mac PMMS via FRED (MORTGAGE30US): 6.22% Nov 6, 2025 → 7.18% Nov 5, 2026 · FRED DGS10: 4.11% → 4.84% (path simplified)</Src>
      </World>
    </Enter>
  );
};

// D · why: an investor holds two envelopes, U.S. GOVERNMENT pays more → he picks it; YOU must match
const Env: React.FC<{ x: number; at: number; label: string; coins: number; color: string }> = ({ x, at, label, coins, color }) => (
  <Pop x={x} y={520} at={at}>
    <div style={{ width: 380, height: 250, background: B.bone, border: `6px solid ${B.ink}`, position: 'relative', boxShadow: '10px 10px 0 rgba(27,34,48,.2)' }}>
      <svg width={380} height={140} style={{ position: 'absolute', left: -6, top: -6 }}><path d="M6 6 L196 120 L386 6" fill="none" stroke={B.ink} strokeWidth={6} /></svg>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 42, color, letterSpacing: 2 }}>{label}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: -90, display: 'flex', justifyContent: 'center', gap: 8 }}>{Array.from({ length: coins }).map((_, i) => <div key={i} style={{ width: 54, height: 54, borderRadius: '50%', background: B.amber, border: `5px solid ${B.ink}` }} />)}</div>
    </div>
  </Pop>
);
const P5D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const why = a(17, 'Why'), lend = a(17, 'lend'), you = a(17, 'you'), higher = a(17, 'higher', 1);
  return (
    <Enter kind="slideL">
      <World jake={false} meter={0} t0={s}>
        <Pawn x={960} y={880} base={B.muted} scale={0.9} seed="investor" />
        <Cap x={960} y={940} at={why} text="INVESTOR" size={40} />
        <Env x={520} at={lend - 4} label="U.S. GOVERNMENT" coins={4} color={B.blue} />
        <Env x={1400} at={you} label="YOU" coins={f >= higher ? 5 : 3} color={B.red} />
        <Stamp text="✓ SAFE" x={520} y={340} at={lend + 10} size={54} color={B.pine} rot={-6} />
        <Tag x={1400} y={250} at={higher} text="MUST PAY MORE" tone="red" size={50} rot={3} />
        <Src>Lenders price private loans above the risk-free Treasury rate (Federal Reserve explainer)</Src>
      </World>
    </Enter>
  );
};

// E · STORY: Jake's car-loan app + Maya's text about a $350,000 first home (illustrative)
const P5E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const jake = a(18, 'Jake'), headline = a(18, 'headline'), monthly = a(18, 'monthly'), car = a(18, 'car'), maya = a(18, 'Maya'), afford = a(18, 'afford');
  return (
    <Enter kind="fade" dur={8}>
      <AbsoluteFill style={{ background: '#1A2236' }}>
        {Array.from({ length: 24 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 84, top: 0, width: 4, height: 1080, background: 'rgba(246,241,228,.035)' }} />)}
        <LiveJake pose="stand" seed="ep06p5" beats={[{ at: 4, r: 'think', hold: maya - 4 }, { at: maya, r: 'smile', hold: 30 }, { at: afford, r: 'worry', hold: 200 }]} style={{ position: 'absolute', left: 120, top: 260, height: 800 }} />
        <Phone x={900} y={540} scale={0.9} rot={-4}>
          <div style={{ background: B.pine, color: B.bone, padding: '70px 22px 14px', fontFamily: cond, fontWeight: 800, fontSize: 28, letterSpacing: 3 }}>CAR LOAN · QUOTE</div>
          <div style={{ padding: 22, fontFamily: F.mono, fontSize: 40, color: B.ink }}>APR ↑</div>
          <div style={{ padding: '0 22px', fontFamily: display, fontWeight: 800, fontSize: 70, color: B.red, opacity: kk(f, monthly, monthly + 8) }}>$/mo ↑</div>
        </Phone>
        <div style={{ opacity: kk(f, maya - 6, maya) }}>
          <Phone x={1480} y={560} scale={0.9} rot={4}>
            <div style={{ background: B.blue, color: B.bone, padding: '70px 22px 14px', fontFamily: cond, fontWeight: 800, fontSize: 28, letterSpacing: 3 }}>MAYA</div>
            <div style={{ margin: 22, background: '#E3E8F0', borderRadius: 24, padding: '18px 22px', fontFamily: cond, fontWeight: 700, fontSize: 34, color: B.ink }}>found it!! my first home 🏡</div>
            <div style={{ margin: '0 22px', height: 210, background: B.sand, border: `4px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Home size={120} color={B.ink} strokeWidth={2} /></div>
            <div style={{ margin: 22, fontFamily: display, fontWeight: 800, fontSize: 64, color: B.ink }}>$350,000</div>
          </Phone>
        </div>
        <Illus dark />
        <MeterChip t0={s} at={0} dark />
        <Src dark>Jake and Maya are illustrative people</Src>
        <Bug dark /><Grain />
      </AbsoluteFill>
    </Enter>
  );
};

// F · the calculator: $350,000 · 6.22% → $2,148 vs 7.18% → $2,371 → +$223 a month (+$2,674 a year)
const P5F: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const take = a(18, 'Take'), six = a(18, 'six'), twentyOne = a(18, 'twenty-one'), seven = a(18, 'seven'), twentyThree = a(18, 'twenty-three'), every = a(18, 'every', 1), house = a(18, 'house', 1);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} meter={0} t0={s}>
        <Cap x={960} y={140} at={take} text="$350,000 · 30 YEARS" size={54} />
        <Card x={560} y={470} at={six - 4} head="6.22%" value={<CountUp from={0} to={2148} a={six} b={twentyOne + 6} fmt={(v) => `$${Math.round(v).toLocaleString('en-US')}`} />} sub="PER MONTH" w={560} tone={B.pine} rot={-2} />
        <Card x={1360} y={470} at={seven - 4} head="7.18%" value={<CountUp from={2148} to={2371} a={seven} b={twentyThree + 6} fmt={(v) => `$${Math.round(v).toLocaleString('en-US')}`} />} sub="PER MONTH" w={560} tone={B.red} rot={2} />
        <Tag x={960} y={780} at={twentyThree + 14} text="+$223 / month" tone="amber" size={96} rot={-3} />
        <Tag x={1520} y={920} at={house - 2} text="+$2,674 a year" tone="bone" size={48} rot={3} />
        <Src>Illustrative: $350,000, 30-year fixed, principal + interest only · rates: Freddie Mac PMMS (Nov 2025 vs Nov 2026)</Src>
      </World>
    </Enter>
  );
};

// G · the debt is one gear of four: FED · INFLATION · ECONOMY · DEBT
const P5G: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const fair = a(19, 'fair'), fed = a(19, 'Federal'), inf = a(19, 'Inflation'), str = a(19, 'strength'), argue = a(19, 'argue'), nobody = a(19, 'nobody');
  return (
    <Enter kind="slideL">
      <FlyInto at={fr(end - s) - 10} dur={12} ox="1500px 500px" to={6}>
        <World jake={{ beats: [{ at: fair, r: 'nod', hold: 40 }, { at: nobody, r: 'think', hold: 200 }] }} meter={0} t0={s}>
          <BigLine y={90} at={2} size={80}>What moves rates</BigLine>
          <Gear x={380} y={480} r={130} at={fed} label="THE FED" speed={1} />
          <Gear x={660} y={640} r={110} at={inf} label="INFLATION" speed={-1.2} color={B.amber} />
          <Gear x={950} y={460} r={120} at={str} label="ECONOMY" speed={1.1} color={B.pine} />
          <Gear x={1240} y={640} r={110} at={argue} label="DEBT" speed={-1.2} color={B.red} />
          <Tag x={1240} y={320} at={nobody} text="HAS AN EFFECT" tone="red" size={46} rot={-3} />
          <Src>How much of today's rates comes from the debt is debated (CBO, Fed research); it is one factor among several</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

export const EP06_P5_FRAMES = partFrames(15, 20);
export const EP06Part05: React.FC = () => {
  const shots: Shot[] = [
    [paraT(15), paraT(16), (s) => <DoorChapter s={s} n={2} title="Your loans" end={paraT(16)} />, 'A door 2'],
    [paraT(16), paraT(17), (s) => <P5B s={s} />, 'B floor'],
    [paraT(17), W(17, 'Why'), (s) => <P5C s={s} />, 'C the proof'],
    [W(17, 'Why'), paraT(18), (s) => <P5D s={s} />, 'D why'],
    [paraT(18), W(18, 'Take'), (s) => <P5E s={s} />, 'E story Jake Maya'],
    [W(18, 'Take'), paraT(19), (s) => <P5F s={s} />, 'F +$223'],
    [paraT(19), paraT(20), (s) => <P5G s={s} end={paraT(20)} />, 'G gears'],
  ];
  return <PartShell first={15} shots={shots} cues={[[W(15, 'two'), 'paper', 0.06], [W(16, 'floor'), 'tick', 0.05], [W(16, 'Mortgages'), 'tick', 0.04], [W(16, 'credit'), 'tick', 0.04], [W(17, 'seven'), 'counter', 0.05], [W(17, 'eight', 1), 'counter', 0.05], [W(17, 'lend'), 'paper', 0.05], [W(18, 'Maya'), 'type', 0.05], [W(18, 'twenty-three'), 'counter', 0.05], [W(18, 'house', 1), 'paper', 0.07], [W(19, 'nobody'), 'paper', 0.05]]} />;
};
