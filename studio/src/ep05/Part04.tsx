import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArrowUp, Check, ShieldCheck, Truck, X, Zap } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Pawn } from '../ep03/PaperWorld';
import { Flag } from '../ep03/Real';
import { B, Badge, Calendar, ChapterCard, Label, Src, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { Enter, fr } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, Slot, Stamp, World, partFrames } from './parts';
import { Caverns, Console, Count, Globe, Pump, PumpChip, WhatIfTag, atW, easeO, kk } from './props';
import type { LucideIcon } from 'lucide-react';

// EP05 · PART 04 (paragraphs 20–25, 2:52–3:40) — LEVER ONE · the emergency tank (Strategic Petroleum Reserve).
const W = wordT;

/** Shared lever chapter: the console, lever n pulled on the first word, then the camera flies into the chapter card. */
export const LeverChapter: React.FC<{ s: number; p: number; n: number; title: string; sub: string; I: LucideIcon; cardWord: string }> = ({ s, p, n, title, sub, I, cardWord }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const card = a(p, cardWord) - 4;
  const pulls = [-1, -1, -1, -1, -1]; pulls[n - 1] = 2;
  const XS = [-480, -240, 0, 270, 520];
  const zoom = 1 + easeO(kk(f, card - 10, card + 4)) * 5;
  const names = ['one', 'two', 'three', 'four', 'five'];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transformOrigin: `${960 + XS[n - 1] * 0.9}px 560px`, transform: `scale(${zoom})`, opacity: 1 - kk(f, card, card + 4) }}>
        <World jake={false}>
          <Console x={960} y={800} scale={0.9} at={-30} pulls={pulls} glow={n - 1} dim={[0, 1, 2, 3, 4].filter((i) => i !== n - 1)} />
        </World>
      </AbsoluteFill>
      {f >= card && (
        <Enter kind="zoom" dur={10}>
          <ChapterCard n={`Lever ${names[n - 1]}`} title={title} sub={sub} at={2} />
          <Badge I={I} x={960} y={250} at={6} size={120} tone={n === 4 ? 'red' : 'amber'} />
          <WhatIfTag />
        </Enter>
      )}
    </AbsoluteFill>
  );
};

// B · THE CAVERNS — salt caverns along the Gulf Coast; release, fast
const Bc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const gulf = a(21, 'Gulf'), spr = a(21, 'Strategic'), released = a(21, 'released'), fast = a(21, 'fast');
  return (
    <Enter kind="rise">
      <World kind="plain" jake={false}>
        <Caverns level={0.9} at={0} flow={released} />
        <Label x={300} y={300} at={gulf - 4} size={46}>Gulf Coast</Label>
        {f >= spr - 4 && <div style={{ position: 'absolute', left: 960, top: 150, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 84, color: B.ink, whiteSpace: 'nowrap', opacity: kk(f, spr - 4, spr + 6) }}>Strategic Petroleum Reserve</div>}
        {f >= fast - 4 && <Badge I={Zap} x={1600} y={320} at={fast - 4} size={110} tone="amber" label="Fast" />}
        <Src>U.S. DOE Strategic Petroleum Reserve: crude stored in salt caverns in Texas and Louisiana</Src>
      </World>
    </Enter>
  );
};

// C · MARCH 2026 — 172 million barrels, part of a 400-million release with other countries
const Cm: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const march = a(22, 'March'), seventy = a(22, 'seventy-two'), four = a(22, 'four-hundred-million-barrel'), countries = a(22, 'countries');
  const flags: ('jp' | 'kr' | 'gb' | 'fr')[] = ['jp', 'kr', 'gb', 'fr'];
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: seventy, r: 'surprise', hold: 40 }, { at: countries, r: 'nod', hold: 200 }] }}>
        <Calendar x={330} y={380} dow="WEDNESDAY" day="11" month="MAR 2026" at={march - 6} size={0.8} />
        <div style={{ position: 'absolute', left: 900, top: 240, transform: 'translateX(-50%)', textAlign: 'center' }}>
          <Flag c="us" w={150} at={seventy - 8} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, color: B.ink, lineHeight: 1.1, opacity: kk(f, seventy - 6, seventy) }}><Count from={0} to={172} a={seventy - 6} b={seventy + 14} />M</div>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 5, color: B.muted }}>BARRELS</div>
        </div>
        {flags.map((c, i) => <Flag key={c} c={c} w={110} x={1180 + (i % 2) * 140} y={290 + Math.floor(i / 2) * 120} at={countries - 10 + i * 3} />)}
        {f >= four - 4 && <div style={{ position: 'absolute', left: 900, top: 700, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 90, color: B.blue, whiteSpace: 'nowrap', opacity: kk(f, four - 4, four + 6) }}>400M together</div>}
        <Src>U.S. DOE, Mar 11, 2026: 172M bbl SPR release (~120 days), part of a 400M IEA coordinated release</Src>
      </World>
    </Enter>
  );
};

// D · THE COST — the cavern level drops below 300M; lowest since 1983
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const cushion = a(23, 'cushion'), cost = a(23, 'cost'), fell = a(23, 'fell'), three = a(23, 'three'), nineteen = a(23, 'nineteen');
  const level = 0.9 - 0.45 * easeO(kk(f, fell - 6, three + 16));
  return (
    <Enter kind="none">
      <World kind="plain" jake={false}>
        <Caverns level={level} at={-30} />
        {f >= cushion - 4 && f < cost && <Badge I={ShieldCheck} x={960} y={180} at={cushion - 4} size={120} label="Cushion" />}
        {f >= cost - 2 && <div style={{ position: 'absolute', left: 960, top: 120, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 70, letterSpacing: 6, color: B.red, opacity: kk(f, cost - 2, cost + 6) }}>THE COST</div>}
        {f >= three - 2 && <div style={{ position: 'absolute', left: 1500, top: 180, transform: 'translate(-50%,0)', background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.22)', padding: '10px 30px', fontFamily: display, fontWeight: 800, fontSize: 96, color: B.ink, opacity: kk(f, three - 2, three + 6) }}>&lt; 300M</div>}
        {f >= nineteen - 2 && <Stamp text="LOWEST SINCE 1983" x={760} y={250} at={nineteen - 2} rot={-5} size={64} />}
        <Src>CNBC/DOE weekly data, Aug 2026: SPR 298.7M bbl, lowest since 1983</Src>
      </World>
    </Enter>
  );
};

// E · WHAT A PRESIDENT EL-SAYED WOULD INHERIT — half-empty tank, refill truck from the world market, demand ↑
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const inherit = a(24, 'inherit'), emptier = a(24, 'emptier'), refill = a(24, 'refill'), demand = a(24, 'demand'), market = a(24, 'market');
  const walk = easeO(kk(f, 0, inherit + 10));
  const truck = kk(f, refill - 6, refill + 40);
  return (
    <Enter kind="slideL">
      <World jake={false}>
        {/* tank */}
        <div style={{ position: 'absolute', left: 900, top: 380, width: 300, height: 420, border: `8px solid ${B.ink}`, borderRadius: 30, background: B.bone, overflow: 'hidden', boxShadow: '12px 12px 0 rgba(27,34,48,.2)' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${45 + 20 * easeO(truck)}%`, background: '#2B2A26', borderTop: `5px solid ${B.amber}` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 44, color: B.ink, letterSpacing: 4 }}>SPR</div>
        </div>
        {f >= emptier - 2 && <Label x={1050} y={330} at={emptier - 2} size={40} tone="red">Half empty</Label>}
        <Pawn x={220 + walk * 480} y={800} base={B.blue} scale={0.75} seed="presES" hop={inherit} />
        <Label x={220 + walk * 480} y={840} at={4} size={26}>President El-Sayed?</Label>
        <Globe x={1600} y={420} r={170} at={refill - 10} />
        {f >= refill - 6 && <div style={{ position: 'absolute', left: 1500 - truck * 330, top: 700, transform: 'translate(-50%,-50%) scaleX(-1)' }}><Truck size={110} color={B.ink} strokeWidth={2.2} /></div>}
        {f >= refill && <Label x={1600} y={640} at={refill} size={36}>Buy back</Label>}
        {f >= demand - 2 && <Badge I={ArrowUp} x={1760} y={260} at={demand - 2} size={100} tone="red" label="Demand" />}
        <Src>DOE plans to buy back ≈ 200M bbl within a year (Mar 2026) · El-Sayed as president: hypothetical</Src>
      </World>
    </Enter>
  );
};

// F · CUSHION, NOT A CURE — Jake at the pump; two slots
const Fz: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const real = a(25, 'real'), cushion = a(25, 'cushion'), cure = a(25, 'cure'), refill = a(25, 'refill');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <Slot I={ShieldCheck} label="Cushion" x={520} y={430} at={cushion - 8} ok={cushion + 4} />
        <Slot I={Zap} label="Cure" x={860} y={430} at={cure - 8} no={cure + 4} />
        <Pump x={1250} y={900} scale={0.9} sale="$62.30" />
        <LiveJake pose="stand" seed="p4j" beats={[{ at: real, r: 'nod', hold: cure - real }, { at: cure, r: 'doubt', hold: refill - cure }, { at: refill, r: 'shrug', hold: 200 }]} style={{ position: 'absolute', left: 1450, top: 380, height: 560, transform: 'scaleX(-1)' }} />
        <PumpChip value="$62.30" at={real} />
        <Src>An SPR release can soften a spike; it can't fix a global supply shock, and it must be refilled</Src>
      </World>
    </Enter>
  );
};

const FIRST = 20, NEXT = 26;
export const EP05_P4_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(20), paraT(21), (s) => <LeverChapter s={s} p={20} n={1} title="The Emergency Tank" sub="Strategic Petroleum Reserve" I={Zap} cardWord="emergency" />, 'A lever one'],
  [paraT(21), paraT(22), (s) => <Bc s={s} />, 'B caverns'],
  [paraT(22), paraT(23), (s) => <Cm s={s} />, 'C 172M'],
  [paraT(23), paraT(24), (s) => <D s={s} />, 'D lowest since 1983'],
  [paraT(24), paraT(25), (s) => <E s={s} />, 'E inherit'],
  [paraT(25), paraT(NEXT), (s) => <Fz s={s} />, 'F cushion not cure'],
];
export const EP05Part04: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(20) + 0.1, 'tick', 0.06], [W(20, 'emergency'), 'paper', 0.07], [W(21, 'released'), 'tick', 0.05],
    [W(22, 'March'), 'paper', 0.05], [W(22, 'seventy-two'), 'counter', 0.05], [W(22, 'countries'), 'tick', 0.05],
    [W(23, 'fell'), 'counter', 0.05], [W(23, 'nineteen'), 'paper', 0.07], [W(24, 'refill'), 'tick', 0.05],
    [W(25, 'cushion'), 'tick', 0.05], [W(25, 'cure'), 'paper', 0.06],
  ]} />
);
