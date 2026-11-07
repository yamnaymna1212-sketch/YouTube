import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, Bell, CalendarCheck, CalendarClock, CheckCircle2, ClipboardList, Fuel, Gavel, Home, Lightbulb, Newspaper, Receipt, ShoppingCart, Tag, Tv } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { B, Badge, Bug, Door, Grain, Kicker, Label, PaperGround, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT, EP_DUR } from './t';
import { Apartment } from './Story';
import { FlipCalendar, PartShell, Shot, Stamp, World, clamp, ease, k01, rel } from './parts';
import { fr } from './kit';

// EP04 · PART 09 (paragraphs 41–46) — one calendar, the map of three doors, Jake gets ready, the checklist, end card.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

// A · ONE CALENDAR — Dec 11 → Jan 3 → the budget fight; the noise in between
const A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const dec = rel(W(41, 'December'), s), jan = rel(W(41, 'January'), s), fight = rel(W(41, 'fight'), s), noise = rel(W(41, 'noise'), s);
  const X0 = 220, X1 = 1460;
  const grow = ease(k01(f, 2, 24));
  const mark = (x: number, at: number, c: string, label: string) => {
    const o = k01(f, at - 2, at + 8);
    return (
      <div style={{ position: 'absolute', left: x, top: 560, transform: `translate(-50%,-50%) scale(${o})` }}>
        <div style={{ width: 70, height: 70, borderRadius: 35, background: c, border: `6px solid ${B.ink}` }} />
        <div style={{ position: 'absolute', top: 84, left: '50%', transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 64, color: c, whiteSpace: 'nowrap' }}>{label}</div>
      </div>
    );
  };
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 6, r: 'think', hold: noise - 8 }, { at: noise, r: 'shrug', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: X0, top: 552, width: (X1 - X0) * grow, height: 16, background: B.ink, borderRadius: 8 }} />
        {mark(380, dec, B.red, 'DEC 11')}
        {mark(1000, jan, B.blue, 'JAN 3')}
        <Badge I={Gavel} x={1340} y={380} at={fight} size={150} tone="amber" />
        {f >= noise - 4 && [Newspaper, Tv, Newspaper, Tv].map((I, i) => {
          const flick = 0.35 + 0.25 * Math.abs(Math.sin(f / 5 + i * 2));
          return <div key={i} style={{ position: 'absolute', left: 520 + i * 110, top: 300 + (i % 2) * 70, opacity: flick * k01(f, noise - 4 + i * 3, noise + 6 + i * 3), filter: 'grayscale(1)' }}><Badge I={I} x={0} y={0} at={noise + i * 3} size={90} /></div>;
        })}
        {f >= noise + 10 && <Stamp text="NOISE" x={700} y={360} at={noise + 10} rot={-6} size={70} color="#8C8573" />}
        <Src>Funding through Dec 11, 2026 (P.L. 119-103) · new Congress Jan 3, 2027</Src>
      </World>
    </Enter>
  );
};

// B · THE MAP — "Door one, a date. Door two, a price tag. Door three, a bill."
const Bm: React.FC<{ s: number }> = ({ s }) => {
  const d1 = rel(W(42, 'date'), s), d2 = rel(W(42, 'price'), s), d3 = rel(W(42, 'bill'), s);
  return (
    <Enter kind="slideL">
      <World jake={{ pose: 'point', beats: [{ at: d1, r: 'nod', hold: 200 }] }}>
        <Door x={560} y={880} n={1} I={CalendarClock} label="A date" at={d1 - 6} w={220} />
        <Door x={920} y={880} n={2} I={Tag} label="A price tag" at={d2 - 6} color={B.blue} w={220} />
        <Door x={1280} y={880} n={3} I={Receipt} label="A bill" at={d3 - 6} color={B.pine} w={220} />
      </World>
    </Enter>
  );
};

// C · STORY — Jake gets ready: lights on, no crystal ball, ready
const C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const lights = rel(W(43, 'lights'), s), predict = rel(W(43, 'predict'), s), ready = rel(W(43, 'ready'), s);
  return (
    <Enter kind="fade" dur={8}>
      <AbsoluteFill style={{ transformOrigin: '600px 650px', transform: `scale(${1.15 + f / 2500})` }}>
        <Apartment dawn lamp={k01(f, lights, lights + 6)} tvOn={0.2} tv={<AbsoluteFill style={{ background: '#1d2b33' }} />}>
          <LiveJake pose="stand" seed="p9ready" beats={[{ at: 4, r: 'think', hold: predict - 6 }, { at: predict, r: 'shrug', hold: ready - predict - 4 }, { at: ready, r: 'smile', hold: 200 }]} style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
        </Apartment>
      </AbsoluteFill>
      <Badge I={Lightbulb} x={1250} y={330} at={lights} size={160} tone="amber" />
      <Badge I={CheckCircle2} x={1500} y={560} at={ready} size={180} />
      <Bug dark /><Grain />
    </Enter>
  );
};

// D · CHECKLIST — three things this week
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const one = rel(W(44, 'One'), s), two = rel(W(44, 'Two'), s), three = rel(W(44, 'Three', 1), s), gas = rel(W(44, 'gas'), s), groc = rel(W(44, 'groceries'), s), rent = rel(W(44, 'rent'), s), jan = rel(W(44, 'January'), s), yours = rel(W(44, 'yours'), s);
  const row = (i: number, I: typeof Banknote, label: string, at: number) => {
    const p = spring({ frame: f - at, fps, config: { damping: 13, stiffness: 160 } });
    const done = k01(f, at + 14, at + 20);
    return (
      <div key={i} style={{ position: 'absolute', left: 220, top: 230 + i * 190, display: 'flex', alignItems: 'center', gap: 34, opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
        <div style={{ width: 90, height: 90, border: `6px solid ${B.ink}`, background: B.bone, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{done > 0 && <CheckCircle2 size={70 * done} color={B.pine} strokeWidth={2.8} />}</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, color: B.red, width: 60 }}>{i + 1}</div>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: B.bone, border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={66} color={B.ink} strokeWidth={2.3} /></div>
        <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 70, color: B.ink, letterSpacing: 1.5 }}>{label}</div>
      </div>
    );
  };
  const log = f >= gas - 4;
  const lk = k01(f, gas - 4, gas + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: one, r: 'nod', hold: 60 }, { at: two, r: 'nod', hold: 60 }, { at: three, r: 'nod', hold: 60 }, { at: yours, r: 'smile', hold: 200 }] }}>
        <div style={{ opacity: 1 - lk * 0.85 }}>
          {row(0, Banknote, '1 month of bills', one)}
          {row(1, CalendarCheck, 'Autopay dates', two)}
          {row(2, ClipboardList, 'Price log', three)}
        </div>
        {log && (
          <div style={{ opacity: lk }}>
            <div style={{ position: 'absolute', left: 340, top: 200, width: 820, height: 660, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.22)', transform: 'rotate(-1.5deg)' }}>
              <div style={{ background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 48, padding: '8px 28px', letterSpacing: 4 }}>MY PRICE LOG</div>
              {[[Fuel, 'Gas', gas], [ShoppingCart, 'Groceries', groc], [Home, 'Rent', rent]].map(([I, l, at], i) => {
                const Ic = I as typeof Fuel;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 30, padding: '26px 40px', borderBottom: `3px dashed rgba(27,34,48,.3)`, opacity: k01(f, (at as number) - 2, (at as number) + 6) }}>
                    <Ic size={70} color={B.ink} strokeWidth={2.3} />
                    <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 64, color: B.ink, flex: 1 }}>{l as string}</div>
                    <div style={{ fontFamily: F_MONO, fontSize: 52, color: B.red }}>$ ____</div>
                  </div>
                );
              })}
            </div>
            <FlipCalendar x={1360} y={420} dates={[['NOV', '7'], ['DEC', '1'], ['JAN', '1']]} from={jan - 14} to={jan + 4} size={0.55} />
          </div>
        )}
        <Src>General information, not financial advice</Src>
      </World>
    </Enter>
  );
};
const F_MONO = 'JetBrains Mono, monospace';

// E · DISCLAIMER + END CARD
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const brand = rel(W(46, 'Dollarly'), s), sub = rel(W(46, 'Subscribe'), s), track = rel(W(46, 'track'), s);
  const logo = spring({ frame: f - (brand - 4), fps, config: { damping: 12, stiffness: 140 } });
  const disclaimer = f < brand - 6;
  return (
    <Enter kind="zoom" dur={10}>
      <PaperGround>
        {disclaimer ? (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center' }}>
            <Kicker size={40}>General information</Kicker>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 96, color: B.ink, marginTop: 10 }}>Not financial advice</div>
          </div>
        ) : (
          <>
            <div style={{ position: 'absolute', left: 960, top: 360, transform: `translate(-50%,-50%) scale(${logo})` }}><Img src={staticFile('brand/logo.png')} style={{ width: 300, height: 300 }} /></div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 120, letterSpacing: 10, color: B.ink, opacity: logo }}>DOLLARLY</div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', fontFamily: display, fontSize: 64, color: '#5A5444', opacity: k01(f, brand + 10, brand + 18) }}>Your money. Decoded.</div>
            <div style={{ position: 'absolute', left: 960, top: 860, transform: `translate(-50%,-50%) scale(${spring({ frame: f - sub, fps, config: { damping: 11, stiffness: 170 } })})`, display: 'flex', alignItems: 'center', gap: 16, background: B.red, border: `5px solid ${B.ink}`, padding: '14px 36px', boxShadow: '8px 8px 0 rgba(27,34,48,.25)' }}>
              <Bell size={46} color={B.bone} strokeWidth={2.6} /><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 56, color: B.bone, letterSpacing: 4 }}>SUBSCRIBE</div>
            </div>
            <FlipCalendar x={1560} y={420} dates={[['DEC', '11']]} from={0} to={1} ringAt={track} size={0.55} />
          </>
        )}
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

const FIRST = 41;
export const EP04_P9_FRAMES = fr(EP_DUR - paraT(FIRST));
const shots: Shot[] = [
  [paraT(41), paraT(42), (s) => <A s={s} />, 'A one calendar'],
  [paraT(42), paraT(43), (s) => <Bm s={s} />, 'B the map'],
  [paraT(43), paraT(44), (s) => <C s={s} />, 'C story · ready'],
  [paraT(44), paraT(45), (s) => <D s={s} />, 'D checklist'],
  [paraT(45), EP_DUR, (s) => <E s={s} />, 'E disclaimer + end card'],
];
export const EP04Part09: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(41, 'December'), 'paper', 0.05], [W(41, 'January'), 'paper', 0.05], [W(41, 'noise'), 'paper', 0.05],
    [W(42, 'date'), 'tick', 0.05], [W(42, 'price'), 'tick', 0.05], [W(42, 'bill'), 'tick', 0.05],
    [W(44, 'One'), 'tick', 0.05], [W(44, 'Two'), 'tick', 0.05], [W(44, 'Three', 1), 'tick', 0.05], [W(44, 'gas'), 'type', 0.05],
    [W(46, 'Subscribe'), 'paper', 0.06],
  ]} />
);
