import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Building2, Coins, Landmark, Shield, TrendingUp, User, Users, Flag, PiggyBank, ScrollText, X } from 'lucide-react';
import { ChapterCard, Src } from '../brand/Brand';
import { PER_SEC, paraT, wordT as W } from './t';
import { B, BigLine, Enter, LiveJake, Odometer, NightAvenue, PartShell, Pawn, Stamp, World, atW, cond, display, easeO, fr, kk, partFrames, spr, type Shot, MeterChip } from './kit';
import { Balance, Cap, Card, CountUp, Disc, HBar, Line, Pop, Tag, VBar, T2 } from './scenes';
import { Bug, Grain } from '../brand/Brand';

// =============================================================================================
// PART 02 · WHAT $40 TRILLION MEANS (paragraphs 4–5)
// =============================================================================================

// A · the debt = IOUs: a paper "I.O.U." ledger prints slips on the words
const P2A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const debt = a(4, 'national'), borrowed = a(4, 'borrowed'), paid = a(4, 'paid');
  return (
    <Enter kind="slideL">
      <World jake={{ pose: 'think', beats: [{ at: 4, r: 'think', hold: 200 }] }} meter={0} t0={s}>
        <Card x={720} y={430} at={4} head="NATIONAL DEBT" value="$40.5T" sub="BORROWED · NOT REPAID" w={700} />
        {Array.from({ length: 7 }).map((_, i) => {
          const at = debt + i * 6;
          const k = easeO(kk(f, at, at + 26));
          if (f < at) return null;
          return (
            <div key={i} style={{ position: 'absolute', left: 720 + (i % 2 ? 1 : -1) * (180 + i * 40) * k, top: 680 + k * 120 - i * 8, transform: `translate(-50%,-50%) rotate(${(i % 2 ? 8 : -8) * k}deg)`, background: B.bone, border: `4px solid ${B.ink}`, padding: '6px 18px', fontFamily: display, fontWeight: 800, fontSize: 44, color: B.ink, boxShadow: '5px 5px 0 rgba(27,34,48,.2)' }}>I.O.U.</div>
          );
        })}
        <Stamp text="NOT YET PAID" x={720} y={240} at={paid} size={64} rot={-5} />
        <Src>U.S. Treasury, Debt to the Penny (Nov 5, 2026): total public debt outstanding $40.556T</Src>
      </World>
    </Enter>
  );
};

// B · two blocks: investors $32.8T (big) vs the government itself $7.8T (small) — icons on the words
const P2B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const inv = a(4, 'investors'), ppl = a(4, 'people'), banks = a(4, 'banks'), pens = a(4, 'pension'), ctry = a(4, 'countries'), rest = a(4, 'rest'), soc = a(4, 'Social');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} meter={0} t0={s}>
        <VBar x={560} y={880} w={420} h={560} a={4} b={inv} color={B.blue} value="$32.8T" label="INVESTORS" />
        <VBar x={1280} y={880} w={420} h={134} a={rest} b={rest + 14} color={B.amber} value="$7.8T" label="GOVERNMENT ITSELF" />
        <Disc I={User} x={330} y={190} at={ppl} size={120} />
        <Disc I={Building2} x={490} y={190} at={banks} size={120} />
        <Disc I={PiggyBank} x={650} y={190} at={pens} size={120} />
        <Disc I={Flag} x={810} y={190} at={ctry} size={120} />
        <Disc I={ScrollText} x={1280} y={480} at={soc} size={150} label="SOCIAL SECURITY" />
        <Src>Debt to the Penny, Nov 5, 2026: held by the public $32.77T · intragovernmental holdings $7.79T</Src>
      </World>
    </Enter>
  );
};

// C · vs the economy: 97% of GDP, then 121% with the government's own debt
const P2C: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const ninety = a(5, 'ninety'), count = a(5, 'count'), twenty = a(5, 'twenty');
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: twenty, r: 'surprise', hold: 60 }] }} meter={0} t0={s}>
        <BigLine y={110} at={2} size={88}>Debt vs. the economy</BigLine>
        <HBar x={200} y={330} w={900} h={100} frac={1} a={4} b={ninety - 10} color={B.sand} label="EVERYTHING AMERICA MAKES IN A YEAR" value="100%" />
        <HBar x={200} y={560} w={900} h={100} frac={0.974} a={ninety - 6} b={ninety + 10} color={B.blue} label="OWED TO INVESTORS" value="97%" mark={1} />
        <HBar x={200} y={790} w={900} h={100} frac={1.212} a={count} b={twenty + 6} color={B.amber} label="+ OWED TO ITSELF" value="121%" mark={1} />
        <Src>FRED (Treasury / BEA), 2026 Q2: debt held by the public 97.4% of GDP · total federal debt 121.2% of GDP</Src>
      </World>
    </Enter>
  );
};

// D · economists disagree: a balanced scale, two pawns; then the meter arrow ↑ both agree on
const P2D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const some = a(5, 'Some'), carry = a(5, 'carry'), others = a(5, 'Others'), fine = a(5, 'fine'), both = a(5, 'Both'), cost = a(5, 'cost'), up = a(5, 'going');
  const tilt = f < others ? -0.6 * kk(f, some, carry) : f < both ? -0.6 + 1.2 * kk(f, others, fine) : 0.6 - 0.6 * kk(f, both, both + 12);
  const arrow = spr(f, up - 6, 30, 10, 180);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} meter={0} t0={s}>
        <Balance x={760} y={430} tilt={tilt} at={0} w={900}
          left={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 42, color: B.pine, whiteSpace: 'nowrap' }}>CAN CARRY IT</div><div style={{ width: 130, height: 130, borderRadius: '50%', background: B.pine, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={70} color={B.bone} /></div></div>}
          right={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 42, color: B.red, whiteSpace: 'nowrap' }}>FINE… UNTIL</div><div style={{ width: 130, height: 130, borderRadius: '50%', background: B.red, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={70} color={B.bone} /></div></div>} />
        {f >= both && (
          <div style={{ position: 'absolute', left: 1500, top: 460, transform: `translate(-50%,-50%) scale(${arrow})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 230, height: 230, borderRadius: '50%', background: B.amber, border: `8px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '10px 10px 0 rgba(27,34,48,.22)' }}><TrendingUp size={130} color={B.ink} strokeWidth={2.6} /></div>
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 4, color: B.ink, opacity: kk(f, cost, cost + 8) }}>COST TO CARRY</div>
          </div>
        )}
        <Src>Views summarized from CBO, CRFB and PGPF analyses · both sides presented</Src>
      </World>
    </Enter>
  );
};

export const EP06_P2_FRAMES = partFrames(4, 6);
export const EP06Part02: React.FC = () => {
  const shots: Shot[] = [
    [paraT(4), W(4, 'Part'), (s) => <P2A s={s} />, 'A ious'],
    [W(4, 'Part'), paraT(5), (s) => <P2B s={s} />, 'B who holds it'],
    [paraT(5), W(5, 'Economists'), (s) => <P2C s={s} />, 'C vs GDP'],
    [W(5, 'Economists'), paraT(6), (s) => <P2D s={s} />, 'D disagree'],
  ];
  return <PartShell first={4} shots={shots} cues={[[W(4, 'borrowed'), 'paper', 0.06], [W(4, 'investors'), 'tick', 0.05], [W(4, 'rest'), 'tick', 0.05], [W(5, 'ninety'), 'counter', 0.05], [W(5, 'twenty'), 'tick', 0.05], [W(5, 'Both'), 'paper', 0.06]]} />;
};

// =============================================================================================
// PART 03 · INTEREST (paragraphs 6–9)
// =============================================================================================

// A · chapter: THE NUMBER THAT MATTERS → INTEREST (night meter)
const P3A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const intr = a(6, 'Interest');
  const t = spr(f, intr - 2, fps, 12, 170);
  return (
    <Enter kind="fade" dur={8}>
      <NightAvenue cap={0.25}>
        <div style={{ position: 'absolute', left: 960, top: 300, transform: 'translate(-50%,-50%)' }}><Odometer value={PER_SEC * (s + f / fps)} digits={8} h={150} dark /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: 'rgba(243,238,226,.7)', opacity: kk(f, 2, 12) }}>THE NUMBER THAT MATTERS</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 190, color: B.gold, transform: `scale(${t})`, textShadow: '0 0 40px rgba(232,182,76,.4)' }}>Interest</div>
        <Bug dark /><Grain />
      </NightAvenue>
    </Enter>
  );
};

// B · every borrower pays: family statement ↔ Uncle Sam statement → $1.052T counts (FY2025 $970B ghost)
const Statement: React.FC<{ x: number; y: number; at: number; who: string; amt: string; color: string }> = ({ x, y, at, who, amt, color }) => (
  <Pop x={x} y={y} at={at} rot={-2}>
    <div style={{ width: 400, background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)', padding: '0 0 18px' }}>
      <div style={{ background: color, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 32, letterSpacing: 4, padding: '6px 16px', borderBottom: `5px solid ${B.ink}` }}>{who}</div>
      {[0.8, 0.6, 0.7].map((w, i) => <div key={i} style={{ height: 10, width: `${w * 80}%`, margin: '16px 20px 0', background: 'rgba(27,34,48,.15)' }} />)}
      <div style={{ margin: '18px 20px 0', display: 'flex', justifyContent: 'space-between', fontFamily: cond, fontWeight: 800, fontSize: 34, color: B.ink }}><span>INTEREST</span><span style={{ color: B.red }}>{amt}</span></div>
    </div>
  </Pop>
);
const P3B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const borrower = a(7, 'borrower'), gov = a(7, 'government'), year = a(7, 'year'), one = a(7, 'one'), net = a(7, 'net');
  const big = kk(f, year - 4, year + 4);
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: one, r: 'surprise', hold: 50 }] }} meter={0} t0={s}>
        <div style={{ opacity: 1 - big * 0.85, transform: `scale(${1 - big * 0.2})`, transformOrigin: '700px 500px' }}>
          <Statement x={430} y={480} at={borrower - 2} who="A FAMILY" amt="$" color={B.blue} />
          <Statement x={980} y={480} at={gov} who="UNCLE SAM" amt="$$$$" color={B.red} />
        </div>
        {f >= year - 2 && (
          <>
            <div style={{ position: 'absolute', left: 700, top: 420, transform: 'translate(-50%,-50%)', fontFamily: display, fontWeight: 800, fontSize: 220, color: B.ink, opacity: big }}><CountUp from={0} to={1.052} a={one - 4} b={net + 4} fmt={(v) => `$${v.toFixed(3)}T`} /></div>
            <Cap x={700} y={600} at={net} text="NET INTEREST · FY2026" size={50} />
            <Tag x={700} y={760} at={net + 10} text="FY2025: $970B" tone="bone" size={56} rot={2} />
          </>
        )}
        <Src>Monthly Treasury Statement, Table 9 (FY to Sept 30, 2026): net interest $1,051.8B · FY2025 $970.4B</Src>
      </World>
    </Enter>
  );
};

// C · per day / per person: $2.9B a day → $3,000 per American
const P3C: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const two = a(7, 'two'), day = a(7, 'day'), spread = a(7, 'Spread'), three = a(7, 'three');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} meter={0} t0={s}>
        <Card x={560} y={450} at={two - 4} head="EVERY DAY" value="$2.9B" sub="365 DAYS A YEAR" w={620} tone={B.red} />
        <Card x={1300} y={450} at={three - 2} head="PER AMERICAN" value="$3,000" sub="A YEAR · JUST INTEREST" w={620} tone={B.blue} rot={1.5} />
        {Array.from({ length: 12 }).map((_, i) => <Pawn key={i} x={1000 + i * 55} y={830} base={[B.blue, B.red, B.pine][i % 3]} scale={0.3} seed={'pc' + i} />)}
        <Cap x={1300} y={170} at={spread} text="SPLIT 341.8M WAYS" size={46} />
        <Src>$1,051.8B ÷ 365 = $2.88B/day · ÷ 341,784,857 people (Census Vintage 2025) = $3,077</Src>
      </World>
    </Enter>
  );
};

// D · back to the meter: every 30 seconds, another million (three laps)
const P3D: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const thirty = a(7, 'thirty', 1), million = a(7, 'million');
  const lap = (f % 45) / 45; // a sped-up "30 s" lap so three laps fit the line
  const laps = Math.floor(Math.max(0, f - thirty) / 45);
  return (
    <Enter kind="fade" dur={8}>
      <NightAvenue cap={0.3}>
        <div style={{ position: 'absolute', left: 960, top: 330, transform: 'translate(-50%,-50%)' }}><Odometer value={PER_SEC * (s + f / fps)} digits={8} h={170} dark /></div>
        <svg width={220} height={220} style={{ position: 'absolute', left: 420, top: 560 }} viewBox="0 0 220 220">
          <circle cx={110} cy={110} r={92} fill="none" stroke="rgba(243,238,226,.2)" strokeWidth={16} />
          <circle cx={110} cy={110} r={92} fill="none" stroke={B.gold} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray={`${f >= thirty ? lap : 0} 1`} transform="rotate(-90 110 110)" />
          <text x={110} y={128} textAnchor="middle" fontFamily={cond} fontWeight={800} fontSize={54} fill={B.nightText}>30s</text>
        </svg>
        {Array.from({ length: Math.min(3, laps + (f >= million ? 1 : 0)) }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 760 + i * 260, top: 600, transform: `scale(${spr(f, thirty + i * 45, fps, 10, 190)})`, background: B.gold, border: `6px solid ${B.ink}`, padding: '10px 26px', fontFamily: display, fontWeight: 800, fontSize: 80, color: B.ink }}>+$1M</div>
        ))}
        <Src dark>$33,350 per second × 30 s ≈ $1.0M (FY2026 net interest)</Src>
        <Bug dark /><Grain />
      </NightAvenue>
    </Enter>
  );
};

// E · interest vs defense on a scale: $1,052B drops below $965B (+$86B)
const P3E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const more = a(8, 'more'), def = a(8, 'defense'), nine = a(8, 'nine');
  const tilt = -kk(f, nine + 4, nine + 20);
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: more, r: 'surprise', hold: 40 }, { at: nine + 20, r: 'worry', hold: 200 }] }} meter={0} t0={s}>
        <BigLine y={90} at={2} size={84}>More than defense</BigLine>
        <Balance x={780} y={430} tilt={tilt} at={0} w={860}
          left={<Card x={0} y={-60} at={more} head="INTEREST" value="$1,052B" w={330} size={66} tone={B.red} rot={0} />}
          right={<Card x={0} y={-60} at={def} head="DEFENSE" value="$965B" w={330} size={66} tone={B.blue} rot={0} />} />
        <Tag x={780} y={920} at={nine + 20} text="+$86B" tone="red" size={70} rot={-3} />
        <Src>Monthly Treasury Statement, Table 9, FY2026: net interest $1,051.8B · national defense $965.2B</Src>
      </World>
    </Enter>
  );
};

// F · a line item, not a program: budget bar with a 14% slice → ✗ program ✗ agency → YESTERDAY'S BORROWING
const P3F: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const biggest = a(8, 'biggest'), prog = a(8, 'program'), agency = a(8, 'agency'), yest = a(8, 'yesterday');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} meter={0} t0={s}>
        <Cap x={960} y={190} at={biggest - 8} text="FEDERAL SPENDING · FY2026" size={46} />
        <div style={{ position: 'absolute', left: 260, top: 300, width: 1400, height: 160, border: `6px solid ${B.ink}`, background: B.sand, display: 'flex' }}>
          <div style={{ width: `${14.2 * easeO(kk(f, biggest - 4, biggest + 12))}%`, background: B.red, borderRight: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 70, color: B.bone, overflow: 'hidden' }}>14%</div>
        </div>
        <Disc I={Users} x={700} y={640} at={prog - 4} size={170} label="PROGRAM" cross={prog + 4} />
        <Disc I={Landmark} x={1220} y={640} at={agency - 4} size={170} label="AGENCY" cross={agency + 4} />
        <Stamp text="YESTERDAY'S BORROWING" x={960} y={640} at={yest} size={84} rot={-4} />
        <Src>MTS FY2026: net interest = 14.2% of total outlays ($7.40T)</Src>
      </World>
    </Enter>
  );
};

// G · CBO: $1.0T (2026) → $2.1T (2036), a PROJECTION; then the fork in the road
const P3G: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const cbo = a(9, 'Congressional'), dbl = a(9, 'double'), thirty = a(9, 'thirty'), proj = a(9, 'projection'), pred = a(9, 'prediction'), laws = a(9, 'Laws'), road = a(9, 'road');
  const fork = kk(f, laws - 4, laws + 14);
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: dbl, r: 'surprise', hold: 30 }, { at: pred, r: 'nod', hold: 40 }, { at: road, r: 'think', hold: 200 }] }} meter={0} t0={s}>
        <Cap x={620} y={150} at={cbo} text="CONGRESSIONAL BUDGET OFFICE" size={42} />
        <VBar x={380} y={860} w={230} h={240} a={cbo + 4} b={cbo + 20} color={B.amber} value="$1.0T" label="2026" />
        <VBar x={820} y={860} w={230} h={500} a={dbl - 4} b={thirty + 6} color={B.red} value="$2.1T" label="2036" />
        <Tag x={620} y={240} at={proj} text="PROJECTION · CURRENT LAW" tone="bone" size={46} rot={-2} />
        <Stamp text="NOT A PREDICTION" x={620} y={500} at={pred} size={60} color={B.pine} rot={-6} />
        {/* fork in the road */}
        <svg width={600} height={500} style={{ position: 'absolute', left: 1020, top: 380, overflow: 'visible', opacity: fork }}>
          <path d="M60 480 L260 260" stroke={B.ink} strokeWidth={70} strokeLinecap="round" />
          <path d="M260 260 L120 20" stroke={B.ink} strokeWidth={56} strokeLinecap="round" pathLength={1} strokeDasharray={`${fork} 1`} />
          <path d="M260 260 L480 40" stroke={B.ink} strokeWidth={56} strokeLinecap="round" strokeDasharray="1 0" opacity={0.45} pathLength={1} />
          <path d="M60 480 L260 260" stroke={B.bone} strokeWidth={6} strokeDasharray="20 18" />
        </svg>
        <Src>CBO, The Budget and Economic Outlook: 2026 to 2036 (Feb 2026): net interest ≈ $2.1T (4.6% of GDP) in 2036 under current law</Src>
      </World>
    </Enter>
  );
};

export const EP06_P3_FRAMES = partFrames(6, 10);
export const EP06Part03: React.FC = () => {
  const shots: Shot[] = [
    [paraT(6), paraT(7), (s) => <P3A s={s} />, 'A chapter'],
    [paraT(7), W(7, 'roughly'), (s) => <P3B s={s} />, 'B $1.052T'],
    [W(7, 'roughly'), W(7, 'thirty'), (s) => <P3C s={s} />, 'C day / person'],
    [W(7, 'thirty'), paraT(8), (s) => <P3D s={s} end={paraT(8)} />, 'D million / 30s'],
    [paraT(8), W(8, 'biggest') - 0.6, (s) => <P3E s={s} />, 'E vs defense'],
    [W(8, 'biggest') - 0.6, paraT(9), (s) => <P3F s={s} />, 'F line item'],
    [paraT(9), paraT(10), (s) => <P3G s={s} />, 'G CBO'],
  ];
  return <PartShell first={6} shots={shots} cues={[[W(6, 'Interest'), 'paper', 0.07], [W(7, 'one'), 'counter', 0.05], [W(7, 'two'), 'tick', 0.05], [W(7, 'three'), 'tick', 0.05], [W(7, 'million'), 'counter', 0.05], [W(8, 'nine'), 'paper', 0.07], [W(8, 'yesterday'), 'paper', 0.07], [W(9, 'double'), 'tick', 0.05], [W(9, 'prediction'), 'paper', 0.06]]} />;
};
