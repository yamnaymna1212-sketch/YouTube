import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Armchair, Banknote, CalendarClock, FileText, Fuel, KeyRound, Landmark, Phone, Receipt, Store, Tag, Wallet, type LucideIcon } from 'lucide-react';
import { Pawn } from '../ep03/PaperWorld';
import { B, Badge, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, World, clamp, ease, k01, partFrames, rel } from './parts';

// EP04 · PART 08 (paragraphs 35–40) — "Four people. Three doors." One living table; the camera visits each person.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

const ROW_Y = [300, 480, 660, 840];
const COL_X = [900, 1130, 1360];
const PEOPLE: { name: string; base: string; I: LucideIcon; para: number; glasses?: boolean; hat?: boolean }[] = [
  { name: 'MAYA', base: B.amber, I: KeyRound, para: 36 },
  { name: 'WALTER', base: '#8C8573', I: Armchair, para: 37, hat: true },
  { name: 'DANA', base: B.pine, I: Landmark, para: 38, glasses: true },
  { name: 'LUIS', base: B.red, I: Store, para: 39 },
];
const DOORS: [LucideIcon, string][] = [[CalendarClock, B.red], [Tag, B.blue], [Receipt, B.pine]];

const Table: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const r = (p: number, w: string, n = 0) => rel(W(p, w, n), s);
  const four = r(35, 'Four'), three = r(35, 'Three');
  // cells: [row, col, at, level 1 light | 2 strong, icon?]
  const cells: [number, number, number, 1 | 2, LucideIcon?][] = [
    [0, 0, r(36, 'one'), 1], [0, 1, r(36, 'two'), 2, Tag], [0, 2, r(36, 'pump'), 2, Fuel],
    [1, 0, r(37, 'checks'), 1], [1, 0, r(37, 'service'), 1, Phone], [1, 1, r(37, 'fixed'), 2, Wallet],
    [2, 0, r(38, 'one'), 2], [2, 0, r(38, 'rent'), 2, Banknote], [2, 0, r(38, 'cushion'), 2, Wallet],
    [3, 1, r(39, 'two'), 2], [3, 1, r(39, 'claim'), 2, FileText],
  ];
  // camera: focus the row that is being talked about, then pull back for the summary
  const focusTimes = PEOPLE.map((p) => rel(paraT(p.para), s));
  const end = r(40, 'Four');
  let cy = 570, sc = 1;
  focusTimes.forEach((t, i) => {
    const k = ease(k01(f, t - 8, t + 10));
    if (k > 0) { cy = cy + (ROW_Y[i] - cy) * k; sc = sc + (1.18 - sc) * k; }
  });
  const back = ease(k01(f, end - 6, end + 16));
  cy = cy + (570 - cy) * back; sc = sc + (1 - sc) * back;
  return (
    <div style={{ position: 'absolute', inset: 0, transformOrigin: `850px ${cy}px`, transform: `translateY(${(540 - cy) * 0.8}px) scale(${sc})` }}>
      {/* door headers */}
      {DOORS.map(([I, c], i) => {
        const p = spring({ frame: f - (three + i * 4), fps, config: { damping: 12, stiffness: 170 } });
        return (
          <div key={i} style={{ position: 'absolute', left: COL_X[i], top: 170, transform: `translate(-50%,-50%) scale(${p})`, width: 120, height: 150, background: c, border: `5px solid ${B.ink}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 56, color: B.bone, lineHeight: 1 }}>{i + 1}</div>
            <I size={40} color={B.bone} strokeWidth={2.4} />
          </div>
        );
      })}
      {/* rows */}
      {PEOPLE.map((p, i) => {
        const at = four + i * 5;
        const o = k01(f, at, at + 8);
        const active = f >= focusTimes[i] - 8 && f < (focusTimes[i + 1] ?? end) - 8;
        return (
          <div key={p.name} style={{ opacity: o }}>
            <div style={{ position: 'absolute', left: 220, top: ROW_Y[i] - 70, width: 1260, height: 140, background: active ? 'rgba(217,164,65,.18)' : 'rgba(246,241,228,.6)', border: `4px solid ${active ? B.ink : 'rgba(27,34,48,.25)'}` }} />
            <Pawn x={300} y={ROW_Y[i] + 58} base={p.base} scale={0.48} seed={'pp' + i} glasses={p.glasses} hat={p.hat} hop={focusTimes[i]} />
            <div style={{ position: 'absolute', left: 370, top: ROW_Y[i] - 30, fontFamily: cond, fontWeight: 800, fontSize: 58, color: B.ink, letterSpacing: 2 }}>{p.name}</div>
            <div style={{ position: 'absolute', left: 640, top: ROW_Y[i], transform: 'translate(-50%,-50%)', width: 86, height: 86, borderRadius: 43, background: B.bone, border: `4px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p.I size={46} color={B.ink} strokeWidth={2.3} /></div>
            {COL_X.map((x, c) => <div key={c} style={{ position: 'absolute', left: x, top: ROW_Y[i], transform: 'translate(-50%,-50%)', width: 26, height: 26, borderRadius: 13, background: 'rgba(27,34,48,.15)' }} />)}
          </div>
        );
      })}
      {/* cells light on the words */}
      {cells.map(([row, col, at, lvl, I], i) => {
        const p = spring({ frame: f - at, fps, config: { damping: 10, stiffness: 190 } });
        if (f < at) return null;
        const size = I ? 92 : lvl === 2 ? 76 : 48;
        const dx = I ? (cells.filter((c, j) => j < i && c[0] === row && c[1] === col && c[4]).length * 70) : 0;
        return (
          <div key={i} style={{ position: 'absolute', left: COL_X[col] + dx, top: ROW_Y[row], transform: `translate(-50%,-50%) scale(${p})`, width: size, height: size, borderRadius: size / 2, background: I ? B.bone : lvl === 2 ? DOORS[col][1] : 'rgba(180,69,47,.35)', border: `${I ? 5 : 4}px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 rgba(27,34,48,.2)' }}>
            {I && <I size={48} color={B.ink} strokeWidth={2.4} />}
          </div>
        );
      })}
    </div>
  );
};

const Scene: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const end = rel(W(40, 'Four'), s), months = rel(W(40, 'months'), s);
  return (
    <Enter kind="zoom" dur={12}>
      <World jake={{ beats: [{ at: 6, r: 'think', hold: 200 }, { at: rel(W(36, 'pump'), s), r: 'worry', hold: 60 }, { at: rel(W(38, 'rent'), s), r: 'worry', hold: 80 }, { at: months, r: 'nod', hold: 200 }] }}>
        <Table s={s} />
        {f >= end && <Badge I={Landmark} x={1760} y={150} at={end + 4} size={120} label="One Congress" />}
        <div style={{ position: 'absolute', left: 48, top: 40, background: B.amber, border: `4px solid ${B.ink}`, fontFamily: cond, fontWeight: 800, fontSize: 28, padding: '2px 14px', letterSpacing: 3, color: B.ink }}>ILLUSTRATIVE PEOPLE</div>
        <Src>Social Security benefits continued in past shutdowns (SSA contingency plans) · back pay: 2019 law · refunds: importers file claims</Src>
      </World>
    </Enter>
  );
};

const FIRST = 35, NEXT = 41;
export const EP04_P8_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [[paraT(35), paraT(NEXT), (s) => <Scene s={s} />, 'four people · three doors']];
export const EP04Part08: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(35, 'Four'), 'paper', 0.05], [W(35, 'Three'), 'paper', 0.05], [W(36, 'two'), 'tick', 0.05], [W(36, 'pump'), 'tick', 0.05],
    [W(37, 'fixed'), 'tick', 0.05], [W(38, 'rent'), 'tick', 0.05], [W(38, 'cushion'), 'tick', 0.05], [W(39, 'claim'), 'tick', 0.05], [W(40, 'months'), 'paper', 0.05],
  ]} />
);
