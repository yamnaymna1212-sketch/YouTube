import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Bus, Mic, ShoppingBasket, Truck, X } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Pawn } from '../ep03/PaperWorld';
import { B, Badge, Label, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, World, partFrames } from './parts';
import { Car, Console, Gallon, LeverTag, PriceTag, Pump, Van, atW, easeO, kk } from './props';

// EP05 · PART 09 (paragraphs 49–59, 6:40–7:38) — Jake's dashboard (all five levers valued), the campaign stage, and who it hits.
const W = wordT;

// A · THE DASHBOARD — each lever lights and gets its tag as it is named
const A: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const t = [a(50, 'reserve'), a(51, 'gas'), a(52, 'waivers'), a(54, 'war'), a(53, 'long')];
  const f = useCurrentFrame();
  // lever index lit = the lever named most recently (lever 5 "long game" is named before lever 4 "war")
  const events: [number, number][] = [[t[0], 0], [t[1], 1], [t[2], 2], [t[4], 4], [t[3], 3]];
  const lit = events.filter(([at]) => f >= at).reduce((acc, [, i]) => i, -1);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: t[0], r: 'nod', hold: t[3] - t[0] }, { at: t[3], r: 'surprise', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: 92, color: B.ink }}>Jake's dashboard</div>
        <Console x={860} y={620} scale={0.95} at={-30} pulls={[0, 0, 0, 0, 0]} glow={lit}
          tags={[
            <LeverTag key="1" text="Cushion" at={t[0]} />,
            <LeverTag key="2" text="≤ $140/yr" at={t[1]} tone="amber" />,
            <LeverTag key="3" text="¢" at={t[2]} />,
            <LeverTag key="4" text="$$$ ↑↓" at={t[3]} tone="red" />,
            <LeverTag key="5" text="Years" at={t[4]} />,
          ]} />
        <Src>Illustrative ranking for one driver (780 gal/yr) · sources in the description</Src>
      </World>
    </Enter>
  );
};

// B · THE CAMPAIGN STAGE — four small levers slide onto a stage with a microphone; lever 4 stays, its shadow over the pump
const Bc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const promise = a(55, 'promise'), stage = a(55, 'stage'), fifth = a(55, 'fifth'), decide = a(55, 'decide');
  const slide = easeO(kk(f, promise - 6, stage + 10));
  return (
    <Enter kind="none">
      <World kind="stage" jake={false}>
        <div style={{ position: 'absolute', left: 200, top: 700, width: 640, height: 60, background: B.blue, border: `6px solid ${B.ink}`, opacity: slide }} />
        {f >= stage - 4 && <Badge I={Mic} x={250} y={560} at={stage - 4} size={110} />}
        {[0, 1, 2, 4].map((i, k) => (
          <div key={i} style={{ position: 'absolute', left: 860 + [-480, -240, 0, 0, 520][i] * 0.9 + (300 + k * 120 - (860 + [-480, -240, 0, 0, 520][i] * 0.9)) * slide, top: 520, width: 26, height: 200, background: B.ink, borderRadius: 13, transform: `rotate(${-20 + k * 12}deg)`, transformOrigin: '50% 100%' }}>
            <div style={{ position: 'absolute', left: -25, top: -38, width: 76, height: 76, borderRadius: '50%', background: B.bone, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 38, color: B.ink, transform: `rotate(${20 - k * 12}deg)` }}>{i + 1}</div>
          </div>
        ))}
        <div style={{ position: 'absolute', left: 1320, top: 260, width: 34, height: 520, background: B.ink, borderRadius: 17, transform: 'rotate(10deg)', transformOrigin: '50% 100%' }}>
          <div style={{ position: 'absolute', left: -48, top: -60, width: 130, height: 130, borderRadius: '50%', background: B.red, border: `7px solid ${B.ink}`, boxShadow: '0 0 40px rgba(229,72,59,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 64, color: B.bone, transform: 'rotate(-10deg)' }}>4</div>
        </div>
        <div style={{ position: 'absolute', left: 1360, top: 760, width: 500 * kk(f, fifth - 4, decide + 10), height: 140, background: 'linear-gradient(90deg, rgba(27,34,48,.35), rgba(27,34,48,0))', transform: 'skewX(-30deg)' }} />
        <Pump x={1650} y={900} scale={0.7} sale="$?.??" />
        {f >= decide - 4 && <Label x={1650} y={300} at={decide - 4} size={44} tone="red">Jake's bill</Label>}
        <Src>Campaign promises vs. the lever that moved prices most in 2026</Src>
      </World>
    </Enter>
  );
};

// C · NOT THE SAME FOR EVERYONE — three pawns on a road map
const Cp: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const same = a(56, 'same');
  return (
    <Enter kind="slideL">
      <World jake={false}>
        {[['Maya', B.red, 520], ['Luis', B.blue, 960], ['Walter', B.pine, 1400]].map(([n, c, x], i) => (
          <React.Fragment key={n as string}>
            <Pawn x={x as number} y={760} base={c as string} scale={1} seed={'pp' + i} hop={same + i * 4} />
            <Label x={x as number} y={810} at={4 + i * 3} size={40}>{n as string}</Label>
          </React.Fragment>
        ))}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: 92, color: B.ink }}>Not the same for everyone</div>
        <Src>Illustrative characters</Src>
      </World>
    </Enter>
  );
};

// D · MAYA — 40 miles each way, no bus; twice Jake's gallons
const Dm: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const forty = a(57, 'forty'), bus = a(57, 'bus'), twice = a(57, 'twice'), hard = a(57, 'hard');
  const drive = ((f / 90) % 1);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ position: 'absolute', left: 120, top: 300, fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 4, color: B.red }}>MAYA · ILLUSTRATIVE</div>
        <div style={{ position: 'absolute', left: 120, top: 520, width: 1100, height: 30, background: '#8C8573', border: `5px solid ${B.ink}` }} />
        <Car x={160 + drive * 1000} y={530} color={B.red} scale={0.8} />
        {f >= forty - 4 && <div style={{ position: 'absolute', left: 560, top: 400, fontFamily: display, fontWeight: 800, fontSize: 100, color: B.ink, opacity: kk(f, forty - 4, forty + 6) }}>40 mi</div>}
        {f >= bus - 4 && <><Badge I={Bus} x={1060} y={340} at={bus - 4} size={110} /><div style={{ position: 'absolute', left: 1060 - 60, top: 336, width: 120, height: 12, background: B.red, transform: 'rotate(-40deg)', opacity: kk(f, bus, bus + 6) }} /></>}
        <Gallon x={500} y={800} h={260} at={twice - 10} labels={false} layers={[{ frac: 1, color: B.amber, label: '', pct: '', at: twice - 8 }]} />
        <Label x={500} y={960} at={twice - 8} size={30}>Jake</Label>
        <Gallon x={800} y={800} h={260} at={twice} labels={false} layers={[{ frac: 1, color: B.red, label: '', pct: '', at: twice + 2 }]} />
        <Gallon x={1000} y={800} h={260} at={twice + 4} labels={false} layers={[{ frac: 1, color: B.red, label: '', pct: '', at: twice + 6 }]} />
        <Label x={900} y={960} at={twice + 2} size={30}>Maya</Label>
        {f >= hard - 2 && <div style={{ position: 'absolute', left: 1380, top: 700, fontFamily: display, fontWeight: 800, fontSize: 160, color: B.red, opacity: kk(f, hard - 2, hard + 6) }}>2×</div>}
        <Src>Illustrative: 80 miles a day, no transit option</Src>
      </World>
    </Enter>
  );
};

// E · LUIS — delivery van on diesel ($6.29, +$2.54); the cost travels to the grocery shelf
const El: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const van = a(58, 'van'), diesel = a(58, 'diesel'), six = a(58, 'six'), two = a(58, 'Two'), groceries = a(58, 'groceries'), shelf = a(58, 'shelf');
  const route = kk(f, groceries - 6, shelf + 4);
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <div style={{ position: 'absolute', left: 120, top: 200, fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 4, color: B.blue }}>LUIS · ILLUSTRATIVE</div>
        <Van x={420} y={900} scale={1.2} />
        <Pump x={820} y={900} scale={0.85} color={B.pine} sale={f >= six - 2 ? '$6.29' : '$5.9x'} />
        {f >= diesel - 4 && <Label x={820} y={340} at={diesel - 4} size={40} tone="ink">Diesel</Label>}
        {f >= two - 4 && <PriceTag x={1080} y={420} text="+$2.54" at={two - 4} tone="red" size={70} />}
        <div style={{ position: 'absolute', left: 1000, top: 700, width: 460 * route, height: 10, background: B.ink }} />
        {f >= groceries - 6 && <div style={{ position: 'absolute', left: 1000 + 460 * route - 60, top: 640 }}><Truck size={110} color={B.ink} strokeWidth={2.2} /></div>}
        {f >= shelf - 4 && <Badge I={ShoppingBasket} x={1620} y={650} at={shelf - 4} size={150} tone="amber" />}
        {f >= shelf && <PriceTag x={1620} y={470} text="↑" at={shelf} tone="red" size={80} />}
        <Src>U.S. EIA: on-highway diesel $6.292/gal, +$2.539 vs. a year earlier (week of Nov 2, 2026)</Src>
      </World>
    </Enter>
  );
};

// F · WALTER — barely drives (dusty parked car); gas shows up in the price of trucked food
const Fw: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const barely = a(59, 'barely'), else2 = a(59, 'else'), food = a(59, 'food'), trucked = a(59, 'trucked');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ position: 'absolute', left: 120, top: 200, fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 4, color: B.pine }}>WALTER · ILLUSTRATIVE</div>
        <Pawn x={360} y={860} base={B.pine} scale={0.95} seed="walter" />
        <div style={{ position: 'absolute', left: 700, top: 0, opacity: 0.75 }}><Car x={0} y={900} color="#8C8573" scale={1.3} /></div>
        {f >= barely && [0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: 'absolute', left: 560 + i * 60, top: 690 - Math.sin(i) * 20, width: 14, height: 14, borderRadius: 7, background: 'rgba(140,133,115,.6)', opacity: kk(f, barely + i * 3, barely + i * 3 + 8) }} />)}
        {f >= else2 - 4 && <Badge I={ShoppingBasket} x={1300} y={560} at={else2 - 4} size={170} tone="amber" />}
        {f >= food && <PriceTag x={1500} y={380} text="Bread ↑" at={food} tone="bone" size={60} />}
        {f >= trucked - 4 && <Badge I={Truck} x={1100} y={380} at={trucked - 4} size={110} />}
        <Src>Fuel is a cost in moving food to stores (illustrative)</Src>
      </World>
    </Enter>
  );
};

const FIRST = 49, NEXT = 60;
export const EP05_P9_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(49), paraT(55), (s) => <A s={s} />, 'A dashboard'],
  [paraT(55), paraT(56), (s) => <Bc s={s} />, 'B campaign stage'],
  [paraT(56), paraT(57), (s) => <Cp s={s} />, 'C three people'],
  [paraT(57), paraT(58), (s) => <Dm s={s} />, 'D Maya'],
  [paraT(58), paraT(59), (s) => <El s={s} />, 'E Luis'],
  [paraT(59), paraT(NEXT), (s) => <Fw s={s} />, 'F Walter'],
];
export const EP05Part09: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(50, 'reserve'), 'tick', 0.05], [W(51, 'gas'), 'tick', 0.05], [W(52, 'waivers'), 'tick', 0.05], [W(53, 'long'), 'tick', 0.05], [W(54, 'war'), 'paper', 0.07],
    [W(55, 'stage'), 'paper', 0.05], [W(56, 'same'), 'tick', 0.05], [W(57, 'twice'), 'tick', 0.05], [W(58, 'six'), 'counter', 0.05], [W(58, 'shelf'), 'tick', 0.05], [W(59, 'food'), 'tick', 0.05],
  ]} />
);
