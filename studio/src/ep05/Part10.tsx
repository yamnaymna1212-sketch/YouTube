import React from 'react';
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Landmark } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building } from '../ep03/PaperWorld';
import { B, Badge, Bug, Grain, Src, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { Enter, fr } from './kit';
import { EP_DUR, paraT, wordT } from './t';
import { PartShell, Shot, World } from './parts';
import { Caverns, Console, Globe, Pump, PumpChip, Receipt, Station, WhatIfTag, atW, easeO, kk } from './props';

// EP05 · PART 10 (paragraphs 60–69, 7:38–end) — the honest answer (no dial), what you control, three actions, disclaimer, end card.
const W = wordT;

// A · STORY — back at the night pump from the first shot
const A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const pres = a(60, 'president'), prices = a(60, 'prices');
  return (
    <Enter kind="fade" dur={10}>
      <AbsoluteFill style={{ transformOrigin: '1080px 480px', transform: `scale(${1.1 + f / 3000})` }}>
        <Station night price="4.15">
          <Pump x={1080} y={900} scale={1.05} sale="$62.30" gal="15.000" />
          <LiveJake pose="stand" seed="p10a" beats={[{ at: pres, r: 'think', hold: prices - pres }, { at: prices, r: 'doubt', hold: 200 }]} style={{ position: 'absolute', left: 1330, top: 330, height: 600, transform: 'scaleX(-1)' }} />
        </Station>
      </AbsoluteFill>
      <PumpChip value="$62.30" at={0} dark />
      <WhatIfTag dark />
      <Src dark>Hypothetical: President El-Sayed</Src>
      <Bug dark /><Grain />
    </Enter>
  );
};

// B · NO DIAL — a dial painted on the pump (it doesn't turn); world · reserve · Congress · war line up
const Bd: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const dial = a(61, 'dial'), world = a(61, 'world'), reserve = a(61, 'reserve'), congress = a(61, 'Congress'), war = a(61, 'war');
  const tap = Math.sin(Math.max(0, f - dial) * 1.4) * Math.max(0, 5 - (f - dial) * 0.3) * (f >= dial ? 1 : 0);
  const pop = (t: number) => spring({ frame: f - t, fps, config: { damping: 12, stiffness: 160 } });
  const out = kk(f, world - 8, world);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ opacity: 1 - out }}>
          <Pump x={760} y={900} scale={1.1} sale="$4.15" />
          <div style={{ position: 'absolute', left: 1060, top: 420, width: 220, height: 220, borderRadius: '50%', background: B.bone, border: `8px solid ${B.ink}`, transform: `translate(-50%,-50%) rotate(${tap}deg)`, opacity: kk(f, dial - 10, dial) }}>
            <div style={{ position: 'absolute', left: 104, top: 20, width: 12, height: 90, background: B.red, borderRadius: 6 }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 30, color: B.muted, letterSpacing: 3 }}>PAINTED ON</div>
          </div>
          {f >= dial && <div style={{ position: 'absolute', left: 1320, top: 360, fontFamily: display, fontWeight: 800, fontSize: 110, color: B.red }}>No dial</div>}
        </div>
        {out > 0 && (
          <div style={{ opacity: out }}>
            <div style={{ position: 'absolute', left: 0, top: 0, transform: `scale(${pop(world)})`, transformOrigin: '330px 460px' }}><Globe x={330} y={460} r={170} at={world} /></div>
            {f >= reserve - 4 && <div style={{ position: 'absolute', left: 760, top: 460, transform: `translate(-50%,-50%) scale(${pop(reserve - 4)})`, width: 220, height: 280, border: `7px solid ${B.ink}`, borderRadius: 24, background: B.bone, overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%', background: '#2B2A26', borderTop: `5px solid ${B.amber}` }} /><div style={{ position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 40 }}>SPR</div></div>}
            {f >= congress - 4 && <div style={{ position: 'absolute', left: 1160, top: 620, transform: `scale(${pop(congress - 4) * 0.7})`, transformOrigin: '0 0' }}><Building kind="cap" x={0} y={0} /></div>}
            {f >= war - 4 && <div style={{ position: 'absolute', left: 1620, top: 600, width: 40, height: 420, background: B.ink, borderRadius: 20, transform: `rotate(12deg) scaleY(${pop(war - 4)})`, transformOrigin: '50% 100%' }}><div style={{ position: 'absolute', left: -50, top: -70, width: 140, height: 140, borderRadius: '50%', background: B.red, border: `7px solid ${B.ink}`, boxShadow: '0 0 40px rgba(229,72,59,.6)' }} /></div>}
            {['World', 'Reserve', 'Congress', 'War & peace'].map((t, i) => <div key={t} style={{ position: 'absolute', left: [330, 760, 1220, 1640][i], top: 760, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 3, color: i === 3 ? B.red : B.ink, opacity: kk(f, [world, reserve, congress, war][i], [world, reserve, congress, war][i] + 8), whiteSpace: 'nowrap' }}>{t.toUpperCase()}</div>)}
          </div>
        )}
        <Src>Recap: most of a gallon is priced worldwide (EIA); the levers are the reserve, Congress, and war and peace</Src>
      </World>
    </Enter>
  );
};

// C · YOUR SIDE OF THE PUMP — Jake's hand on the nozzle (close)
const Cn: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const control = a(62, 'control');
  return (
    <Enter kind="fade" dur={8}>
      <AbsoluteFill style={{ transformOrigin: '1200px 520px', transform: `scale(${1.6 + f / 2000})` }}>
        <Station night price="4.15">
          <Pump x={1080} y={900} scale={1.05} sale="$62.30" hose="out" />
          <LiveJake pose="point" seed="p10c" beats={[{ at: control, r: 'smile', hold: 200 }]} style={{ position: 'absolute', left: 1330, top: 330, height: 600, transform: 'scaleX(-1)' }} />
        </Station>
      </AbsoluteFill>
      <Src dark>What you control: your own gallons</Src>
      <Bug dark /><Grain />
    </Enter>
  );
};

// D · THREE THINGS THIS WEEK — a receipt types the checklist
const D: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const one = a(64, 'One'), two = a(65, 'Two'), three = a(66, 'Three'), lever = a(66, 'lever');
  return (
    <Enter kind="rise">
      <World jake={{ pose: 'point', beats: [{ at: one, r: 'nod', hold: two - one }, { at: two, r: 'think', hold: three - two }, { at: lever, r: 'smile', hold: 300 }] }}>
        <Receipt x={760} y={520} at={0} w={940} title="THIS WEEK · 3 THINGS" lines={[
          ['1  gallons/week × 52', one + 6], ['2  check tire pressure', two + 6], ['3  ask: "which lever?"', lever - 6],
        ]} />
        <Src>Tire pressure and mileage: fueleconomy.gov (U.S. DOE / EPA) "Gas Mileage Tips"</Src>
      </World>
    </Enter>
  );
};

// E · DISCLAIMER + "WHO REALLY MOVES IT" — Jake hangs up the nozzle; the display resets
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const simple = a(68, 'simple'), number = a(68, 'number'), moves = a(68, 'moves');
  const reset = f >= number;
  return (
    <Enter kind="fade" dur={8}>
      <Station night price="4.15">
        <Pump x={1080} y={900} scale={1.05} sale={reset ? '$0.00' : '$62.30'} gal={reset ? '0.000' : '15.000'} glow={reset ? 0.3 : 0.8} />
        <LiveJake pose="stand" seed="p10e" face={{ look: 0.6 }} beats={[{ at: simple, r: 'nod', hold: moves - simple }, { at: moves, r: 'smile', hold: 300 }]} style={{ position: 'absolute', left: 1330, top: 330, height: 600, transform: 'scaleX(-1)' }} />
      </Station>
      <div style={{ position: 'absolute', left: 48, bottom: 90, background: 'rgba(19,32,34,.85)', border: `3px solid ${B.gold}`, padding: '8px 18px', fontFamily: F.mono, fontSize: 24, color: B.nightText, opacity: 1 - kk(f, simple, simple + 10) }}>General information, not financial or political advice.</div>
      <WhatIfTag dark />
      <Src dark>Hypothetical scenario · sources in the description</Src>
      <Bug dark /><Grain />
    </Enter>
  );
};

// F · END CARD — logo + a paper pump + subscribe
const Fe: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const dollarly = a(69, 'Dollarly'), decoded = a(69, 'decoded'), sub = a(69, 'Subscribe');
  const lg = spring({ frame: f - (dollarly - 4), fps, config: { damping: 12, stiffness: 140 } });
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} whatIf={false}>
        <Img src={staticFile('brand/logo.png')} style={{ position: 'absolute', left: 960 - 110, top: 200, width: 220, height: 220, transform: `scale(${lg})` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 450, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 110, letterSpacing: 14, color: B.ink, opacity: lg }}>DOLLARLY</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 580, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: 64, color: B.red, opacity: kk(f, decoded - 4, decoded + 6) }}>Your Money. Decoded.</div>
        {f >= sub - 4 && <div style={{ position: 'absolute', left: 960, top: 760, transform: `translate(-50%,-50%) scale(${spring({ frame: f - (sub - 4), fps, config: { damping: 10, stiffness: 170 } })})`, background: B.red, border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.25)', padding: '14px 50px', fontFamily: cond, fontWeight: 800, fontSize: 64, color: B.bone, letterSpacing: 6 }}>SUBSCRIBE</div>}
        <Pump x={1580} y={900} scale={0.6} sale="$?.??" />
        <Src>Next: the math on the next big name</Src>
      </World>
    </Enter>
  );
};

const FIRST = 60;
const END = EP_DUR; // VO end + 2 s hold on the end card
export const EP05_P10_FRAMES = fr(END - paraT(FIRST));
const shots: Shot[] = [
  [paraT(60), paraT(61), (s) => <A s={s} />, 'A back at the pump'],
  [paraT(61), paraT(62), (s) => <Bd s={s} />, 'B no dial · real levers'],
  [paraT(62), paraT(63), (s) => <Cn s={s} />, 'C your side'],
  [paraT(63), paraT(67), (s) => <D s={s} />, 'D three things'],
  [paraT(67), paraT(69), (s) => <E s={s} />, 'E disclaimer · reset'],
  [paraT(69), END, (s) => <Fe s={s} />, 'F end card'],
];
export const EP05Part10: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(61, 'dial'), 'paper', 0.06], [W(61, 'reserve'), 'tick', 0.05], [W(61, 'Congress'), 'tick', 0.05], [W(61, 'war'), 'paper', 0.06],
    [W(64, 'One'), 'type', 0.05], [W(65, 'Two'), 'type', 0.05], [W(66, 'Three'), 'type', 0.05], [W(68, 'number'), 'counter', 0.05], [W(69, 'Dollarly'), 'paper', 0.06],
  ]} />
);
