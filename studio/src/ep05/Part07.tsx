import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Flame, Handshake, Landmark, Scale, ShieldAlert, Swords, TrendingDown, Ship } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building } from '../ep03/PaperWorld';
import { B, Badge, Kicker, Label, Src, cond, display } from '../brand/Brand';
import { Enter, fr } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, World, partFrames } from './parts';
import { Barrel, Coins, Console, GulfMap, PriceTag, Pump, PumpChip, WhatIfTag, atW, easeO, kk } from './props';
import { LeverChapter } from './Part04';

// EP05 · PART 07 (paragraphs 38–43, 4:57–5:53) — LEVER FOUR · war and peace: the big one (≈ $370/yr down, $780/yr up).
const W = wordT;

// B · IT CAME FROM A WAR — night strait (red); TAX and RULE badges fall away, WAR stays
const Bw: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const strait = a(39, 'strait'), tax = a(39, 'tax'), reg = a(39, 'regulation'), war = a(39, 'war');
  const fall = (t: number) => (f > war - 4 ? Math.pow((f - war + 4) / 14, 2) * 600 : 0) + (f < t ? 400 : 0);
  return (
    <Enter kind="fade" dur={8}>
      <GulfMap at={strait} stopAt={0} red={0} zoom={1.15}>
        <div style={{ position: 'absolute', left: 300, top: 300 + fall(tax), opacity: f >= tax - 4 ? 1 : 0 }}><Badge I={Landmark} x={0} y={0} at={tax - 4} size={130} dark label="Tax" /></div>
        <div style={{ position: 'absolute', left: 560, top: 300 + fall(reg), opacity: f >= reg - 4 ? 1 : 0 }}><Badge I={Scale} x={0} y={0} at={reg - 4} size={130} dark label="Rule" /></div>
      </GulfMap>
      {f >= war - 4 && <Badge I={Flame} x={1250} y={330} at={war - 4} size={170} tone="red" dark label="War" />}
      <WhatIfTag dark />
      <Src dark>2026 price spike followed the U.S.–Iran war and the Hormuz disruption · map: Natural Earth</Src>
    </Enter>
  );
};

// C · A PRESIDENT'S POWER — desk of three cards: escalate / negotiate / open-close; a small lane toggles
const Cp: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const power = a(40, 'power'), esc = a(40, 'escalate'), neg = a(40, 'negotiate'), opens = a(40, 'opens'), closed = a(40, 'closed');
  const open = f >= opens && f < closed;
  return (
    <Enter kind="slideL">
      <World kind="stage" jake={{ beats: [{ at: power, r: 'surprise', hold: 30 }, { at: esc, r: 'worry', hold: neg - esc }, { at: neg, r: 'think', hold: 300 }] }}>
        <div style={{ position: 'absolute', left: 300, top: 640, width: 1100, height: 40, background: '#7A5C3E', border: `6px solid ${B.ink}` }} />
        {[[esc, Swords, 'Escalate', B.red], [neg, Handshake, 'Negotiate', B.blue], [opens, Ship, 'Open · close', B.pine]].map(([t, I, l, c], i) => (
          <div key={i} style={{ position: 'absolute', left: 430 + i * 340, top: 470, transform: `translate(-50%,-50%) rotate(${(i - 1) * 4}deg) scale(${kk(f, (t as number) - 6, (t as number) + 2)})`, width: 260, height: 300, background: B.bone, border: `6px solid ${B.ink}`, borderTop: `22px solid ${c as string}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            {React.createElement(I as typeof Swords, { size: 100, color: B.ink, strokeWidth: 2.2 })}
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.ink, letterSpacing: 2, textTransform: 'uppercase' }}>{l as string}</div>
          </div>
        ))}
        {f >= opens - 4 && (
          <div style={{ position: 'absolute', left: 760, top: 170, transform: 'translateX(-50%)', width: 520, height: 70, background: B.night, border: `5px solid ${B.ink}`, borderRadius: 35, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 20, right: 20, top: 30, height: 10, background: open ? B.gold : B.glow, borderRadius: 5 }} />
            {open && [0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: ((f * 4 + i * 170) % 520) - 30, top: 22, width: 46, height: 26, background: B.nightText, border: `3px solid ${B.ink}` }} />)}
          </div>
        )}
        {f >= opens - 4 && <div style={{ position: 'absolute', left: 760, top: 110, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: open ? B.pine : B.red }}>{open ? 'LANE OPEN' : f >= closed ? 'LANE CLOSED' : 'SHIPPING LANE'}</div>}
        <Src>War powers: Congress declares war; presidents direct the military and diplomacy (U.S. Const. Art. I & II)</Src>
      </World>
    </Enter>
  );
};

// D · THE MATH — oil −$20 → gas ≈ −50¢ → Jake ≈ $370/yr vs the gas tax's $140
const Dm: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const drops = a(41, 'drops'), fifty = a(41, 'fifty'), jake = a(41, 'Jake'), three = a(41, 'three'), half = a(41, 'half');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: three, r: 'surprise', hold: 40 }, { at: half, r: 'nod', hold: 200 }] }}>
        <div style={{ opacity: 1 - kk(f, jake - 6, jake + 4) }}>
          <Barrel x={420} y={500} scale={1.2} at={0} tag={f >= drops ? '−$20' : undefined} />
          <div style={{ position: 'absolute', left: 760, top: 430, fontFamily: display, fontWeight: 800, fontSize: 120, color: B.ink, opacity: kk(f, fifty - 8, fifty) }}>→</div>
          {f >= fifty - 4 && <PriceTag x={1160} y={500} text="≈ −50¢" at={fifty - 4} tone="pine" size={120} />}
        </div>
        {f >= jake - 4 && <>
          <Coins x={600} y={880} value={140} max={400} a={jake - 4} b={jake + 10} label="$140" color={B.sand} />
          <div style={{ position: 'absolute', left: 600, top: 900, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 3, color: B.muted }}>GAS TAX</div>
          <Coins x={1050} y={880} value={370} max={400} a={three - 4} b={three + 22} label="≈ $370" color={B.pine} />
          <div style={{ position: 'absolute', left: 1050, top: 900, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 3, color: B.pine }}>OIL −$20</div>
        </>}
        {f >= half - 4 && <div style={{ position: 'absolute', left: 1330, top: 260, fontFamily: display, fontWeight: 800, fontSize: 130, color: B.red, opacity: kk(f, half - 4, half + 6) }}>2.6×</div>}
        <Src>Illustrative: $20/bbl ÷ 42 ≈ 47.6¢/gal × 780 gal ≈ $371/yr (pass-through not exact)</Src>
      </World>
    </Enter>
  );
};

// E · BOTH DIRECTIONS — a new crisis: +$1.00 a gallon → $780 a year (red stack grows; Jake's tank chip jumps)
const Eb: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const both = a(42, 'both'), crisis = a(42, 'crisis'), dollar = a(42, 'dollar'), seven = a(42, 'seven'), alone = a(42, 'alone');
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: crisis, r: 'worry', hold: 300 }] }}>
        <Badge I={TrendingDown} x={300} y={300} at={both - 4} size={120} tone="bone" />
        <div style={{ position: 'absolute', left: 300, top: 430, transform: 'translateX(-50%) scaleY(-1)' }}><TrendingDown size={120} color={B.red} strokeWidth={2.4} style={{ opacity: kk(f, both, both + 8) }} /></div>
        <Pump x={700} y={900} scale={1} sale={f >= dollar ? '$5.15' : '$4.15'} glow={kk(f, dollar, dollar + 6)} />
        {f >= dollar - 2 && <PriceTag x={950} y={300} text="+$1.00" at={dollar - 2} tone="red" size={100} />}
        <Coins x={1300} y={880} value={780} max={800} a={seven - 6} b={seven + 24} label="$780" color={B.red} />
        <PumpChip value={f >= dollar ? '$77.30' : '$62.30'} at={0} hot={dollar} />
        {f >= alone - 2 && <Label x={1300} y={950} at={alone - 2} size={34}>Jake · 1 year</Label>}
        <Src>Illustrative: +$1.00/gal × 780 gal = $780/yr · tank 15 gal × $5.15</Src>
      </World>
    </Enter>
  );
};

// F · BOTH SIDES on the war → the red lever's shadow falls over the pump
const Fs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const sup = a(43, 'Supporters'), either = a(43, 'Either'), biggest = a(43, 'biggest'), all = a(43, 'all', 1);
  const swap = kk(f, either - 6, either + 4);
  const Side: React.FC<{ x: number; at: number; I: typeof Flame; who: string; line: string; tone: 'red' | 'amber' }> = ({ x, at, I, who, line, tone }) => (
    <div style={{ position: 'absolute', left: x, top: 230, width: 680, height: 540, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.2)', opacity: kk(f, at - 4, at + 6) }}>
      <div style={{ background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 6, padding: '10px 30px' }}>{who}</div>
      <Badge I={I} x={340} y={240} at={at + 6} size={160} tone={tone} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 64, color: B.ink }}>{line}</div>
    </div>
  );
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ opacity: 1 - swap }}>
          <Side x={200} at={0} I={Flame} who="EL-SAYED" line="Illegal war · spike" tone="red" />
          <Side x={1040} at={sup} I={ShieldAlert} who="WAR SUPPORTERS" line="Security · prices fall" tone="amber" />
        </div>
        {swap > 0 && (
          <div style={{ opacity: swap }}>
            <Pump x={380} y={900} scale={1.1} sale="$?.??" />
            <Console x={1250} y={820} scale={0.75} at={-30} glow={3} dim={[0, 1, 2, 4]} nums />
            <div style={{ position: 'absolute', left: 300, top: 300, width: 1000 * easeO(kk(f, biggest - 10, biggest + 20)), height: 640, background: 'linear-gradient(270deg, rgba(27,34,48,.35), rgba(27,34,48,0))', transform: 'skewX(-25deg)', transformOrigin: '100% 100%', marginLeft: 0 }} />
            {f >= all - 6 && <div style={{ position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: 88, color: B.ink, opacity: kk(f, all - 6, all + 4) }}>The biggest gas decision</div>}
          </div>
        )}
        <Src>El-Sayed statement, Sept 17, 2026 · Rogers / supporters: Bridge Michigan, June 3, 2026</Src>
      </World>
    </Enter>
  );
};

const FIRST = 38, NEXT = 44;
export const EP05_P7_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(38), paraT(39), (s) => <LeverChapter s={s} p={38} n={4} title="War and Peace" sub="Not in any energy plan" I={Swords} cardWord="big" />, 'A lever four'],
  [paraT(39), paraT(40), (s) => <Bw s={s} />, 'B came from a war'],
  [paraT(40), paraT(41), (s) => <Cp s={s} />, 'C president power'],
  [paraT(41), paraT(42), (s) => <Dm s={s} />, 'D math $370'],
  [paraT(42), paraT(43), (s) => <Eb s={s} />, 'E both directions $780'],
  [paraT(43), paraT(NEXT), (s) => <Fs s={s} />, 'F both sides → shadow'],
];
export const EP05Part07: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(38, 'big'), 'paper', 0.06], [W(38, 'plan'), 'paper', 0.07], [W(39, 'war'), 'paper', 0.07],
    [W(40, 'escalate'), 'tick', 0.05], [W(40, 'negotiate'), 'tick', 0.05], [W(40, 'opens'), 'tick', 0.05],
    [W(41, 'fifty'), 'tick', 0.05], [W(41, 'three'), 'counter', 0.06], [W(42, 'dollar'), 'tick', 0.06], [W(42, 'seven'), 'counter', 0.06],
    [W(43, 'Supporters'), 'paper', 0.05], [W(43, 'biggest'), 'paper', 0.06],
  ]} />
);
