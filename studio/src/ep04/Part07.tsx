import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import { Ban, CreditCard, Fuel, Landmark, PieChart, Percent, Receipt, Scissors, Shield, Vote, Wallet } from 'lucide-react';
import { Building, Pawn } from '../ep03/PaperWorld';
import { B, Badge, Bug, ChapterCard, Grain, Label, NightGround, NightHeadline, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { Bill, PartShell, Shot, Stamp, World, clamp, ease, k01, partFrames, rel } from './parts';

// EP04 · PART 07 (paragraphs 29–34) — Door three: the bill for the war, where the money comes from, the purse, interest, who pays.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

const countries = (feature(world as any, (world as any).objects.countries) as any).features;
const IRAN = countries.find((c: any) => c.id === '364');

// A · CHAPTER (arrives from the pine flash at the end of Part 06)
const A: React.FC = () => (
  <Enter kind="zoom" dur={12}>
    <ChapterCard n="Door three" title="The War Bill" at={4} />
    <Badge I={Receipt} x={960} y={250} at={8} size={130} tone="bone" />
    <Bug /><Grain />
  </Enter>
);

// B · NIGHT MAP — "The war with Iran began on February twenty-eighth, and Congress never voted… the Pentagon estimated… twenty-nine billion"
const Bn: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const feb = rel(W(30, 'February'), s), never = rel(W(30, 'never'), s), pent = rel(W(30, 'Pentagon'), s), bn = rel(W(30, 'twenty-nine'), s);
  const proj = geoMercator().fitExtent([[560, 160], [1560, 980]], IRAN);
  const p = geoPath(proj);
  const draw = k01(f, 4, 44);
  const v = Math.round(interpolate(f, [bn - 6, bn + 20], [0, 29], clamp));
  return (
    <Enter kind="zoom" dur={12}>
      <NightGround>
        <AbsoluteFill style={{ transformOrigin: '1060px 560px', transform: `scale(${1 + f / 1800})` }}>
          <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
            <defs><filter id="ig"><feGaussianBlur stdDeviation="8" /></filter></defs>
            {countries.map((c: any, i: number) => <path key={i} d={p(c) || ''} fill={c.id === '364' ? '#3A1C18' : B.nightLand} stroke={B.nightLine} strokeWidth={1.2} />)}
            <path d={p(IRAN) || ''} fill="none" stroke={B.glow} strokeWidth={14} opacity={0.5 * draw} filter="url(#ig)" />
            <path d={p(IRAN) || ''} fill="none" stroke={B.glow} strokeWidth={3} pathLength={1} strokeDasharray={`${draw} 1`} />
          </svg>
        </AbsoluteFill>
        <NightHeadline kicker="The war so far" date="February 28, 2026" line="The strikes begin" at={feb - 6} />
        {f >= never && (
          <div style={{ position: 'absolute', left: 230, top: 520 }}>
            <Badge I={Landmark} x={0} y={0} at={never} size={150} dark />
            <div style={{ position: 'absolute', left: -80, top: -6, width: 160 * k01(f, never + 6, never + 12), height: 12, background: B.glow, transform: 'rotate(-40deg)', transformOrigin: '0 50%', borderRadius: 6 }} />
            <div style={{ position: 'absolute', left: -90, top: 100, width: 180, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 34, color: B.nightText, letterSpacing: 2 }}>NO VOTE</div>
          </div>
        )}
        {f >= pent - 4 && (
          <div style={{ position: 'absolute', right: 110, top: 560, textAlign: 'right' }}>
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 32, color: 'rgba(243,238,226,.7)', letterSpacing: 5, opacity: k01(f, pent - 4, pent + 4) }}>PENTAGON ESTIMATE · MAY</div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 190, color: B.gold, lineHeight: 1 }}>${v}B</div>
          </div>
        )}
        <Src dark>War began Feb 28, 2026 without specific authorization (Axios) · ≈ $29B Pentagon estimate (May, reported) · map: Natural Earth</Src>
        <Bug dark /><Grain />
      </NightGround>
    </Enter>
  );
};

// C · WHERE THE MONEY COMES FROM — other spending or borrowing → interest
const Cm: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const parts = rel(W(31, 'parts'), s), borrow = rel(W(31, 'borrowing'), s), interest = rel(W(31, 'interest'), s);
  const pie = ease(k01(f, parts - 4, parts + 14));
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 6, r: 'think', hold: interest - 8 }, { at: interest, r: 'worry', hold: 200 }] }}>
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <circle cx={520} cy={460} r={210} fill={B.bone} stroke={B.ink} strokeWidth={8} />
          <path d={`M520 460 L520 250 A210 210 0 0 1 ${520 + 210 * Math.sin(pie * Math.PI * 0.35 * 2)} ${460 - 210 * Math.cos(pie * Math.PI * 0.35 * 2)} Z`} fill={B.red} stroke={B.ink} strokeWidth={6} opacity={pie} />
        </svg>
        <Label x={520} y={730} at={parts} size={40}>Other spending</Label>
        <Badge I={CreditCard} x={1120} y={420} at={borrow} size={190} label="Borrowing" tone="amber" />
        {f >= interest - 4 && Array.from({ length: 5 }).map((_, i) => {
          const t = k01(f, interest + i * 6, interest + 24 + i * 6);
          return <div key={i} style={{ position: 'absolute', left: 1120 + i * 70 - 140, top: 640 - t * 60, width: 90, height: 90, borderRadius: 45, background: B.amber, border: `5px solid ${B.ink}`, transform: `scale(${t})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Percent size={46} color={B.ink} strokeWidth={2.8} /></div>;
        })}
        <Src>Federal interest costs are paid from the same budget (CBO)</Src>
      </World>
    </Enter>
  );
};

// D · THE PURSE COMES BACK — fund / conditions / no · both sides
const Dp: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const purse = rel(W(32, 'purse'), s), fund = rel(W(32, 'fund'), s), cond_ = rel(W(32, 'conditions'), s), no = rel(W(32, 'say') + 0.2, s);
  const both = rel(W(32, 'both'), s), troops = rel(W(32, 'troops'), s), vote = rel(W(32, 'vote'), s);
  const split = f >= both - 6;
  const k = k01(f, both - 6, both + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: purse, r: 'nod', hold: both - purse - 6 }, { at: both, r: 'think', hold: 300 }] }}>
        <div style={{ opacity: 1 - k }}>
          <Building kind="cap" x={560} y={860} scale={1.2} />
          <Badge I={Wallet} x={560} y={260} at={purse} size={190} tone="amber" />
          <Label x={1100} y={300} at={fund} size={60} tone="ink">Fund</Label>
          <Label x={1100} y={460} at={cond_} size={60}>Conditions</Label>
          <Label x={1100} y={620} at={no} size={60} tone="red">No</Label>
        </div>
        {split && (
          <div style={{ opacity: k }}>
            <div style={{ position: 'absolute', left: 140, top: 160, width: 620, height: 620, background: 'rgba(180,69,47,.08)', border: `5px solid ${B.red}` }} />
            <div style={{ position: 'absolute', left: 820, top: 160, width: 620, height: 620, background: 'rgba(63,90,140,.08)', border: `5px solid ${B.blue}` }} />
            <Badge I={Shield} x={450} y={380} at={troops - 6} size={210} label="Fund the troops" />
            <Badge I={Vote} x={1130} y={380} at={vote - 6} size={210} label="Vote first" />
            <Pawn x={450} y={760} base={B.red} scale={0.75} seed="rs" hop={troops} />
            <Pawn x={1130} y={760} base={B.blue} scale={0.75} seed="ds" hop={vote} />
          </div>
        )}
        <Src>Both positions stated as argued; no position taken</Src>
      </World>
    </Enter>
  );
};

// E · INTEREST KEEPS COMING — a coin rolls through future budgets
const Ei: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const due = rel(W(33, 'due'), s), years = rel(W(33, 'years'), s);
  const YEARS = ['2027', '2028', '2029', '2030', '2031'];
  const roll = ease(k01(f, due - 20, years + 10));
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: due, r: 'worry', hold: 300 }] }}>
        <div style={{ position: 'absolute', left: 140, right: 460, top: 640, height: 14, background: B.ink, borderRadius: 7 }} />
        {YEARS.map((y, i) => {
          const x = 220 + i * 270;
          const hit = roll * 4 >= i;
          return (
            <div key={y}>
              <div style={{ position: 'absolute', left: x, top: 660, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 52, color: B.ink }}>{y}</div>
              <div style={{ position: 'absolute', left: x - 60, top: 520 - (hit ? (i + 1) * 30 : 0), width: 120, height: hit ? (i + 1) * 30 + 100 : 100, background: hit ? B.red : B.bone, border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Receipt size={50} color={hit ? B.bone : B.ink} strokeWidth={2.4} /></div>
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 220 + roll * 1080, top: 420, transform: `translate(-50%,-50%) rotate(${roll * 1080}deg)`, width: 120, height: 120, borderRadius: 60, background: B.amber, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Percent size={60} color={B.ink} strokeWidth={2.8} /></div>
        <Src>Interest on borrowed money is paid in every later budget</Src>
      </World>
    </Enter>
  );
};

// F · WHO PAYS — pump · taxes · cuts · the oil swing
const Fw: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const pump = rel(W(34, 'pump'), s), taxes = rel(W(34, 'taxes'), s), less = rel(W(34, 'less'), s), oil = rel(W(34, 'Oil', 1), s);
  const show = f >= oil - 6;
  const k = k01(f, oil - 6, oil + 6);
  const pts = [93, 101, 113, 104, 96, 108, 100];
  const draw = k01(f, oil, oil + 40);
  const path = pts.map((v, i) => `${i ? 'L' : 'M'} ${300 + i * 200} ${900 - (v - 85) * 13}`).join(' ');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 4, r: 'think', hold: pump - 6 }, { at: pump, r: 'worry', hold: 300 }] }}>
        <div style={{ opacity: 1 - k }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 130, color: B.ink }}>Who pays?</div>
          <Badge I={Fuel} x={460} y={560} at={pump} size={200} label="The pump" tone="red" />
          <Badge I={Receipt} x={860} y={560} at={taxes} size={200} label="Taxes" />
          <Badge I={Scissors} x={1260} y={560} at={less} size={200} label="Cuts" />
        </div>
        {show && (
          <div style={{ opacity: k }}>
            <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
              <path d={path} fill="none" stroke={B.ink} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
            </svg>
            <div style={{ position: 'absolute', left: 300, top: 160, fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.muted, letterSpacing: 4 }}>BRENT CRUDE · FIRST WEEK OF NOV</div>
            <div style={{ position: 'absolute', left: 300, top: 210, fontFamily: display, fontWeight: 800, fontSize: 120, color: B.red }}>$93 ↔ $113</div>
          </div>
        )}
        <Src>Brent ≈ $93–$113 in the first week of Nov 2026 (Gulf News, FinanceFeeds) · line illustrative of the swing</Src>
      </World>
    </Enter>
  );
};

const FIRST = 29, NEXT = 35;
export const EP04_P7_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(29), paraT(30), () => <A />, 'A chapter'],
  [paraT(30), paraT(31), (s) => <Bn s={s} />, 'B night map Iran'],
  [paraT(31), paraT(32), (s) => <Cm s={s} />, 'C where money comes from'],
  [paraT(32), paraT(33), (s) => <Dp s={s} />, 'D purse · both sides'],
  [paraT(33), paraT(34), (s) => <Ei s={s} />, 'E interest years'],
  [paraT(34), paraT(NEXT), (s) => <Fw s={s} />, 'F who pays · oil'],
];
export const EP04Part07: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(29) + 0.2, 'paper', 0.06], [W(30, 'never'), 'paper', 0.07], [W(30, 'twenty-nine'), 'counter', 0.06], [W(31, 'interest'), 'tick', 0.05],
    [W(32, 'fund'), 'tick', 0.05], [W(32, 'conditions'), 'tick', 0.05], [W(32, 'say') + 0.2, 'tick', 0.05], [W(33, 'due'), 'counter', 0.05],
    [W(34, 'pump'), 'paper', 0.05], [W(34, 'taxes'), 'paper', 0.05], [W(34, 'less'), 'paper', 0.05],
  ]} />
);
