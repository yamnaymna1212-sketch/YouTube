import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArrowUp, Waves } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building } from '../ep03/PaperWorld';
import { B, Badge, Frame, Kicker, Label, NightHeadline, PaperUS, Src, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { Enter, FlyInto, fr } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, World, partFrames } from './parts';
import { Barrel, Console, Count, Gallon, Globe, GulfMap, HORMUZ_XY, PriceTag, Pump, PumpChip, Station, WhatIfTag, atW, easeO, kk, usd } from './props';

// EP05 · PART 03 (paragraphs 12–19, 1:39–2:52) — inside a gallon: prices by region, what a gallon pays for (EIA),
// the barrel rule of thumb, the strait, Jake's $75 tank in Michigan → most of the price is decided far from the White House.
const W = wordT;
const LAYERS = (a: (p: number, w: string, n?: number) => number) => [
  { frac: 0.514, color: B.amber, label: 'CRUDE OIL', pct: '51%', at: a(14, 'crude') },
  { frac: 0.143, color: B.blue, label: 'REFINING', pct: '14%', at: a(14, 'refining') },
  { frac: 0.178, color: B.pine, label: 'GETTING IT THERE', pct: '18%', at: a(14, 'station') },
  { frac: 0.166, color: B.red, label: 'TAXES', pct: '17%', at: a(14, 'taxes') },
];

// A · STORY → Jake holds up a paper gallon; the camera dives into it
const A: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const lever = a(12, 'lever'), gallon = a(12, 'gallon');
  const up = spring({ frame: f - (gallon - 14), fps, config: { damping: 12, stiffness: 140 } });
  const dive = kk(f, gallon + 2, fr(end - s));
  return (
    <AbsoluteFill style={{ transformOrigin: '1180px 470px', transform: `scale(${1 + dive * dive * 5})` }}>
      <World jake={false}>
        <Console x={700} y={800} scale={0.6} at={-30} dim={[0, 1, 2, 3, 4]} />
        <LiveJake pose="point" seed="p3gal" beats={[{ at: lever, r: 'doubt', hold: 20 }, { at: gallon, r: 'smile', hold: 200 }]} style={{ position: 'absolute', left: 1320, top: 400, height: 550, transform: 'scaleX(-1)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, transform: `translateY(${(1 - up) * 200}px)` }}>
          <Gallon x={1180} y={470} h={300} layers={[]} labels={false} />
        </div>
        <Src>What a gallon pays for · U.S. Energy Information Administration</Src>
      </World>
    </AbsoluteFill>
  );
};

// B · PRICES BY REGION — paper US map, chips on the words (EIA week of Nov 2, 2026)
const WEST = new Set(['California', 'Oregon', 'Washington', 'Nevada', 'Arizona', 'Alaska', 'Hawaii']);
const MIDWEST = new Set(['Ohio', 'Michigan', 'Indiana', 'Illinois', 'Wisconsin', 'Minnesota', 'Iowa', 'Missouri', 'North Dakota', 'South Dakota', 'Nebraska', 'Kansas', 'Kentucky', 'Tennessee', 'Oklahoma']);
const Bm: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const nat = a(13, 'nationwide'), thirteen = a(13, 'thirteen'), mid = a(13, 'Midwest'), west = a(13, 'West', 1);
  const midK = kk(f, mid - 4, mid + 10), westK = kk(f, west - 4, west + 10);
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="plain" jake={{ beats: [{ at: thirteen, r: 'worry', hold: 40 }, { at: west, r: 'surprise', hold: 200 }] }}>
        <PaperUS x={140} y={170} w={1240} fill={(n) => (MIDWEST.has(n) ? B.amber : WEST.has(n) ? B.red : undefined)} on={(n) => (MIDWEST.has(n) ? midK : WEST.has(n) ? westK : 0)} />
        <PriceTag x={1230} y={170} text={<Count from={3.5} to={4.15} a={2} b={nat} fmt={usd} />} at={0} size={84} />
        <div style={{ position: 'absolute', left: 1230, top: 110, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: B.ink }}>U.S. REGULAR</div>
        {f >= thirteen - 2 && <PriceTag x={1490} y={290} text="+$1.13" at={thirteen - 2} tone="red" size={60} />}
        {f >= mid - 2 && <PriceTag x={880} y={420} text="$4.10" at={mid - 2} tone="amber" size={70} />}
        {f >= west - 2 && <PriceTag x={330} y={480} text="$5.30" at={west - 2} tone="red" size={70} />}
        <Src>U.S. EIA Gasoline & Diesel Fuel Update, week of Nov 2, 2026 (regular, all taxes) · vs. same week 2025</Src>
      </World>
    </Enter>
  );
};

// C · INSIDE THE GALLON — real EIA chart for a beat, then the layers fill on the words
const Cg: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const energy = a(14, 'Energy'), half = a(14, 'half');
  const chartOut = kk(f, half - 8, half + 4);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'point', beats: [{ at: 4, r: 'think', hold: half - 8 }, { at: half, r: 'nod', hold: 300 }] }}>
        <div style={{ opacity: 1 - chartOut, transform: `translateX(${-chartOut * 300}px)` }}>
          <Frame src="sayed/screens/eia_what_we_pay_per_gallon.png" x={1180} y={470} w={760} h={500} rot={2} at={energy - 6} year="eia.gov · 2025" grade="none" pos="50% 40%" />
        </div>
        <Gallon x={560} y={520} h={720} layers={LAYERS(a)} at={2} />
        <Src>U.S. EIA, "Gasoline explained": 2025 average — crude 51.4% · distribution & marketing 17.8% · taxes 16.6% · refining 14.3%</Src>
      </World>
    </Enter>
  );
};

// D · THE PART THAT MOVES — the crude layer lifts out and becomes a globe with ships
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const moves = a(15, 'moves'), world = a(15, 'world');
  const lift = easeO(kk(f, moves - 6, moves + 14)) * 120;
  const swap = kk(f, world - 10, world + 4);
  return (
    <Enter kind="none">
      <World jake={{ beats: [{ at: world, r: 'surprise', hold: 200 }] }}>
        <div style={{ opacity: 1 - swap }}>
          <Gallon x={560} y={520} h={720} layers={LAYERS(() => -100)} labels={false} lift={lift} />
          <div style={{ position: 'absolute', left: 900, top: 380, fontFamily: cond, fontWeight: 800, fontSize: 70, color: B.amber, letterSpacing: 4, opacity: kk(f, moves, moves + 8), WebkitTextStroke: `2px ${B.ink}` }}>THIS PART MOVES</div>
        </div>
        {f >= world - 12 && <Globe x={760} y={500} r={280} at={world - 12} />}
        {f >= world && <Label x={760} y={880} at={world} size={52}>World market</Label>}
        <Src>Crude oil is priced on a global market (EIA)</Src>
      </World>
    </Enter>
  );
};

// E · THE BARREL RULE — 42 gallons; $1/bbl ≈ 2.4¢/gal; $10 ≈ 25¢
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const forty = a(16, 'forty-two'), dollar = a(16, 'dollar'), cents = a(16, 'cents'), ten = a(16, 'Ten', 1), quarter = a(16, 'quarter');
  const big = f >= ten - 2;
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: forty, r: 'surprise', hold: 30 }, { at: cents, r: 'nod', hold: 40 }, { at: quarter, r: 'smile', hold: 200 }] }}>
        <Barrel x={400} y={540} scale={1.4} at={0} tag={f >= dollar - 2 ? (big ? '+$10' : '+$1') : undefined} />
        {/* 42 tiny jugs pour out on "forty-two" */}
        {Array.from({ length: 42 }).map((_, i) => {
          const k = spring({ frame: f - (forty + i * 0.6), fps, config: { damping: 12, stiffness: 200 } });
          const col = i % 7, row = Math.floor(i / 7);
          return <div key={i} style={{ position: 'absolute', left: 720 + col * 52, top: 330 + row * 62, width: 36, height: 48, background: B.bone, border: `4px solid ${B.ink}`, borderRadius: '8px 8px 4px 4px', transform: `scale(${k})`, opacity: big ? 0.35 : 1 }} />;
        })}
        <div style={{ position: 'absolute', left: 900, top: 250, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 80, color: B.ink, opacity: kk(f, forty, forty + 8) }}>42 gal</div>
        <div style={{ position: 'absolute', left: 1180, top: 540, fontFamily: display, fontWeight: 800, fontSize: 120, color: B.ink, opacity: kk(f, cents - 6, cents) }}>→</div>
        {f >= cents - 4 && <PriceTag x={1500} y={560} text={big ? (f >= quarter - 2 ? '+25¢' : '…') : '+2.4¢'} at={cents - 4} tone={big ? 'red' : 'amber'} size={110} />}
        <div style={{ position: 'absolute', left: 1500, top: 420, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 4, color: B.ink, opacity: kk(f, cents - 4, cents + 4) }}>PER GALLON</div>
        <Src>42 gal per barrel → $1/bbl ≈ 2.4¢/gal (rule of thumb; pass-through is not instant or exact)</Src>
      </World>
    </Enter>
  );
};

// F · THIS YEAR — the oil line breaks past the +$10 band; a narrow blue strip slides in
const Fl: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const didnt = a(17, "didn't"), more = a(17, 'more'), strip = a(17, 'strip'), water = a(17, 'water');
  const draw = kk(f, 4, more + 16);
  const pts: [number, number][] = [[220, 700], [380, 690], [520, 705], [640, 680], [700, 520], [760, 330], [860, 300], [980, 380], [1100, 340], [1240, 420], [1380, 470]];
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L');
  const waterK = kk(f, strip - 6, water + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: more, r: 'surprise', hold: 40 }, { at: water, r: 'think', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 200, top: 560, width: 1200, height: 110, background: 'rgba(78,122,74,.18)', borderTop: `4px dashed ${B.pine}`, borderBottom: `4px dashed ${B.pine}`, opacity: kk(f, didnt - 6, didnt + 4) }} />
        <div style={{ position: 'absolute', left: 1410, top: 590, fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.pine, opacity: kk(f, didnt - 6, didnt + 4) }}>±$10</div>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}><path d={d} fill="none" stroke={B.red} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} /></svg>
        <div style={{ position: 'absolute', left: 200, top: 760, width: 1200, height: 5, background: B.ink }} />
        {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map((m, i) => <div key={m} style={{ position: 'absolute', left: 220 + i * 230, top: 780, fontFamily: F.mono, fontSize: 26, color: B.ink }}>{m}</div>)}
        <div style={{ position: 'absolute', left: 200, top: 120, fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 4, color: B.ink }}>OIL · 2026</div>
        {f >= more && <Badge I={ArrowUp} x={820} y={190} at={more} size={120} tone="red" />}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 900, height: 70 * waterK, background: B.water, borderTop: `5px solid ${B.ink}`, borderBottom: `5px solid ${B.ink}`, opacity: waterK }}>
          <Waves size={50} color={B.blue} style={{ position: 'absolute', left: 940, top: 6 }} />
        </div>
        <Src>Shape illustrative (Brent swung tens of dollars in 2026; ≈ $98 on Nov 6, 2026)</Src>
      </World>
    </Enter>
  );
};

// G · THE STRAIT — night Gulf map: 1 in 5 tankers lights up; Feb 28 → traffic stops, lane goes red; NASA photo for a beat
const G: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const strait = a(18, 'Strait'), fifth = a(18, 'fifth'), feb = a(18, 'February'), collapsed = a(18, 'collapsed'), spiked = a(18, 'spiked');
  const photo = f >= strait && f < fifth + 10;
  return (
    <Enter kind="fade" dur={8}>
      <GulfMap at={strait} share={fifth} stopAt={collapsed} red={collapsed} zoom={1 + 0.25 * easeO(kk(f, 0, 60))}>
        {f >= fifth && <div style={{ position: 'absolute', left: HORMUZ_XY[0] + 60, top: HORMUZ_XY[1] - 230, fontFamily: display, fontWeight: 800, fontSize: 110, color: B.gold, opacity: kk(f, fifth, fifth + 8) * (1 - kk(f, feb - 4, feb + 4)), textShadow: '0 0 20px rgba(232,182,76,.5)' }}>1 in 5</div>}
        {f >= spiked - 4 && <Badge I={ArrowUp} x={HORMUZ_XY[0] + 200} y={HORMUZ_XY[1] - 160} at={spiked - 4} size={120} tone="red" dark label="Oil" />}
      </GulfMap>
      {f >= feb - 4 && <NightHeadline kicker="War begins" date="Feb 28, 2026" line="Traffic collapses" at={feb - 4} x={80} y={120} />}
      {photo && <Frame src="iran/hormuz_s04-37-716.jpg" x={1560} y={760} w={480} h={320} rot={3} at={strait} year="NASA · STS-4, 1982" />}
      <WhatIfTag dark />
      <Src dark>EIA: ≈ 20% of world petroleum liquids pass Hormuz (pre-war) · map: Natural Earth · photo: NASA (public domain)</Src>
    </Enter>
  );
};

// H · STORY — Michigan, September: Jake's tank hits $75
const H: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const mich = a(18, 'Michigan'), tank = a(18, 'tank'), seventy = a(18, 'seventy-five');
  return (
    <Enter kind="slideL">
      <AbsoluteFill style={{ transformOrigin: '1000px 500px', transform: `scale(${1.05 + f / 3000})` }}>
        <Station night={false} price="5.00" michigan>
          <Pump x={1000} y={900} scale={1.05} hose="out" glow={kk(f, tank, seventy)}
            sale={<Count from={0} to={75} a={2} b={seventy + 4} fmt={usd} />} gal={<Count from={0} to={15} a={2} b={seventy + 4} fmt={(v) => v.toFixed(3)} />} />
          <LiveJake pose="stand" seed="p3mi" beats={[{ at: mich, r: 'think', hold: seventy - mich - 4 }, { at: seventy, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 1260, top: 330, height: 600, transform: 'scaleX(-1)' }} />
        </Station>
      </AbsoluteFill>
      <PumpChip value={f >= seventy ? '$75.00' : '$62.30'} at={0} hot={seventy} />
      <Label x={330} y={110} at={mich - 4} size={42}>Sept 2026</Label>
      <Src>Michigan ≈ $5/gal in Sept 2026 (AAA high $4.93; campaign statement "$5") · 15 gal, illustrative</Src>
    </Enter>
  );
};

// I · FAR FROM THE WHITE HOUSE — globe/strait on the left, tiny White House on the right, the dashboard rises in front
const I: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const far = a(19, 'far'), white = a(19, 'White'), pres = a(19, 'president'), can = a(19, 'still');
  const arrow = kk(f, far - 4, white + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="stage" jake={false}>
        <FlyInto at={fr(end - s) - 14} dur={14} ox="465px 700px" to={7}>
          <Globe x={430} y={430} r={230} at={0} />
          <div style={{ position: 'absolute', left: 1460, top: 560, transform: `scale(${0.55})` }}><Building kind="wh" x={0} y={0} /></div>
          <div style={{ position: 'absolute', left: 700, top: 420, width: 640 * arrow, height: 8, background: B.ink }} />
          <div style={{ position: 'absolute', left: 1020, top: 330, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 4, color: B.ink, opacity: kk(f, far, far + 8) }}>FAR AWAY</div>
          <Console x={960} y={800} scale={0.75} at={pres - 6} pop={[pres, pres + 3, pres + 6, pres + 9, pres + 12]} glow={f >= can ? 0 : -1} />
        </FlyInto>
        <Src>Most of the pump price: crude oil, priced worldwide (EIA)</Src>
      </World>
    </Enter>
  );
};

const FIRST = 12, NEXT = 20;
export const EP05_P3_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(12), paraT(13), (s) => <A s={s} end={paraT(13)} />, 'A gallon'],
  [paraT(13), paraT(14), (s) => <Bm s={s} />, 'B regions'],
  [paraT(14), paraT(15), (s) => <Cg s={s} />, 'C inside the gallon'],
  [paraT(15), paraT(16), (s) => <D s={s} />, 'D world market'],
  [paraT(16), paraT(17), (s) => <E s={s} />, 'E barrel rule'],
  [paraT(17), paraT(18), (s) => <Fl s={s} />, 'F oil line'],
  [paraT(18), W(18, 'September') - 0.2, (s) => <G s={s} />, 'G strait'],
  [W(18, 'September') - 0.2, paraT(19), (s) => <H s={s} />, 'H $75 tank'],
  [paraT(19), paraT(NEXT), (s) => <I s={s} end={paraT(NEXT)} />, 'I far from the WH → lever 1'],
];
export const EP05Part03: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(13, 'nationwide'), 'counter', 0.05], [W(13, 'thirteen'), 'tick', 0.05], [W(13, 'Midwest'), 'tick', 0.05], [W(13, 'West', 1), 'tick', 0.05],
    [W(14, 'crude'), 'paper', 0.05], [W(14, 'refining'), 'paper', 0.05], [W(14, 'station'), 'paper', 0.05], [W(14, 'taxes'), 'paper', 0.05],
    [W(16, 'forty-two'), 'tick', 0.05], [W(16, 'cents'), 'tick', 0.05], [W(16, 'quarter'), 'tick', 0.05],
    [W(18, 'fifth'), 'tick', 0.05], [W(18, 'collapsed'), 'paper', 0.06], [W(18, 'seventy-five'), 'counter', 0.06], [W(19, 'president'), 'paper', 0.06],
  ]} />
);
