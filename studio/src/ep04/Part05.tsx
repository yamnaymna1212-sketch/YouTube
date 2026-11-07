import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArrowLeftRight, Briefcase, Gavel, HandCoins, Handshake, Landmark, Package, Percent, Receipt, Scale, Ship, Store, Tag, TrendingUp, Users } from 'lucide-react';
import { Pawn } from '../ep03/PaperWorld';
import { B, Badge, ChapterCard, Frame, Grain, Bug, Label, NameCard, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, Slot, Stamp, World, clamp, ease, k01, partFrames, rel } from './parts';

// EP04 · PART 05 (paragraphs 20–24) — Door two: the Supreme Court ruling, what it did and didn't do, a worked example, both sides.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

/** A small paper shop (awning + window + sign). */
export const Shop: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 420, height: 330, transform: `translate(-50%,-100%) scale(${scale})`, transformOrigin: '50% 100%' }}>
    <div style={{ position: 'absolute', left: 20, right: 20, top: 90, bottom: 0, background: B.bone, border: `5px solid ${B.ink}` }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 50, height: 70, display: 'flex', border: `5px solid ${B.ink}` }}>
      {Array.from({ length: 7 }).map((_, i) => <div key={i} style={{ flex: 1, background: i % 2 ? B.bone : B.red }} />)}
    </div>
    <div style={{ position: 'absolute', left: 60, top: 160, width: 170, height: 120, background: '#C9D3CF', border: `5px solid ${B.ink}` }} />
    <div style={{ position: 'absolute', left: 270, top: 160, width: 90, height: 170, background: B.sand, border: `5px solid ${B.ink}` }} />
    <div style={{ position: 'absolute', left: 120, top: 0, width: 180, height: 46, background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 32, textAlign: 'center', lineHeight: '46px', letterSpacing: 3 }}>SHOP</div>
  </div>
);

// A · CHAPTER (arrives through the blue door of Part 04)
const A: React.FC = () => (
  <Enter kind="zoom" dur={12}>
    <ChapterCard n="Door two" title="The Tariff Bill" at={4} />
    <Badge I={Tag} x={960} y={250} at={8} size={130} tone="bone" />
    <Bug /><Grain />
  </Enter>
);

// B · REAL + RULING — "On February twentieth … the Supreme Court ruled six to three … IEEPA."
const Bs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const court = rel(W(21, 'Supreme'), s), six = rel(W(21, 'six'), s), ieepa = rel(W(21, 'IEEPA'), s);
  const vk = k01(f, six - 6, six + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ opacity: 1 - vk }}>
          <Frame src="ep04/footage/day_supreme.mp4" video x={760} y={480} w={980} h={620} rot={-1.5} at={0} year="U.S. Supreme Court · archive" rate={0.7} />
          <Badge I={Gavel} x={1450} y={320} at={court} size={170} />
          <Label x={1450} y={560} at={court + 6} size={54} tone="ink">Feb 20, 2026</Label>
        </div>
        {f >= six - 6 && (
          <div style={{ opacity: vk }}>
            {Array.from({ length: 9 }).map((_, i) => <Pawn key={i} x={330 + i * 150} y={760} base={i < 6 ? B.ink : '#A39C8C'} scale={0.75} seed={'j' + i} hat hop={six + i * 2} />)}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 230, color: B.ink }}>6–3</div>
            <Stamp text="IEEPA ✗" x={1450} y={250} at={ieepa} size={84} />
          </div>
        )}
        <Src>Learning Resources, Inc. v. Trump (U.S., Feb 20, 2026) · film: 'A Day in Congress', Prelinger Archives (PD)</Src>
      </World>
    </Enter>
  );
};

// C · THE CASE — "The case was Learning Resources versus Trump."
const Cs: React.FC = () => (
  <Enter kind="slideL">
    <World jake={{ beats: [{ at: 8, r: 'nod', hold: 60 }] }}>
      <Frame src="ep04/footage/cap_supreme_pediment.mp4" video x={1250} y={460} w={620} h={420} rot={3} at={2} year="Equal justice under law" rate={0.7} />
      <NameCard kicker="Supreme Court · 2026" title="Learning Resources v. Trump" lines={['6–3 · IEEPA is not a tariff law']} x={120} y={260} at={2} size={96} w={760} />
      <Src>Film: 'Washington: The Nation's Capitol' (1930s), Prelinger Archives (PD)</Src>
    </World>
  </Enter>
);

// D · WHAT IT DID AND DIDN'T — IEEPA ✗ · Section 232 ✓ · power to tax → Congress (or a clear law)
const Ds: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const tool = rel(W(22, 'tool'), s), s232 = rel(W(22, 'Section'), s), place = rel(W(22, 'place'), s), tax = rel(W(22, 'tax'), s), congress = rel(W(22, 'Congress'), s), clearly = rel(W(22, 'clearly'), s);
  const show2 = f >= tax - 6;
  const k = k01(f, tax - 6, tax + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 4, r: 'think', hold: tax - 8 }, { at: tax, r: 'nod', hold: 300 }] }}>
        <div style={{ opacity: 1 - k }}>
          <Slot I={Gavel} label="IEEPA" x={560} y={420} at={tool - 6} no={tool + 4} size={240} />
          <Slot I={Percent} label="SECTION 232" x={1120} y={420} at={s232} ok={place} size={240} />
        </div>
        {show2 && (
          <div style={{ opacity: k }}>
            <Badge I={Percent} x={820} y={300} at={tax} size={190} tone="amber" />
            <Badge I={Landmark} x={420} y={620} at={congress} size={170} label="Congress" />
            <Badge I={Receipt} x={1220} y={620} at={clearly - 4} size={170} label="Clear law" />
            <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
              <path d="M 470 540 Q 560 380 720 330" fill="none" stroke={B.ink} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${ease(k01(f, congress, congress + 14))} 1`} />
              <path d="M 1170 540 Q 1080 380 920 330" fill="none" stroke={B.ink} strokeWidth={8} strokeDasharray="18 16" opacity={k01(f, clearly, clearly + 10)} />
            </svg>
          </div>
        )}
        <Src>Holland & Knight / Tax Foundation summaries of the ruling: Section 232 tariffs not affected</Src>
      </World>
    </Enter>
  );
};

// E · WORKED EXAMPLE — the $100 part, 10%, $10 at the border, three choices, three factors
const Es: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const hundred = rel(W(23, 'hundred'), s), ten = rel(W(23, 'ten'), s), border = rel(W(23, 'border'), s), choices = rel(W(23, 'choices'), s);
  const eat = rel(W(23, 'Eat'), s), raise = rel(W(23, 'Raise'), s), sup = rel(W(23, 'supplier'), s), depends = rel(W(23, 'depends'), s), places = rel(W(23, 'places'), s);
  const ship = ease(k01(f, hundred - 20, hundred + 6));
  const coin = ease(k01(f, border - 6, border + 16));
  const phase2 = f >= choices - 6;
  const k = k01(f, choices - 6, choices + 6);
  const phase3 = f >= depends - 4;
  const k3 = k01(f, depends - 4, depends + 6);
  const tag = spring({ frame: f - ten, fps, config: { damping: 10, stiffness: 180 } });
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 6, r: 'think', hold: choices - 10 }, { at: choices, r: 'doubt', hold: places - choices }, { at: places, r: 'nod', hold: 200 }] }}>
        <div style={{ position: 'absolute', left: 140, top: 90, background: B.amber, border: `4px solid ${B.ink}`, fontFamily: cond, fontWeight: 800, fontSize: 34, padding: '2px 16px', letterSpacing: 4, color: B.ink }}>EXAMPLE</div>
        <div style={{ opacity: 1 - k }}>
          <div style={{ position: 'absolute', left: 820, top: 160, bottom: 180, borderLeft: `6px dashed ${B.red}` }} />
          <Label x={820} y={140} at={4} size={34} tone="red">Border</Label>
          <div style={{ position: 'absolute', left: 120 + ship * 760, top: 560, transform: 'translate(-50%,-50%)' }}>
            <Badge I={Ship} x={0} y={-150} at={2} size={110} />
            <div style={{ width: 170, height: 150, background: B.sand, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 60, color: B.ink }}>$100</div>
          </div>
          <div style={{ position: 'absolute', left: 1040, top: 470, transform: `translate(-50%,-50%) scale(${tag}) rotate(-6deg)`, background: B.red, color: B.bone, border: `5px solid ${B.ink}`, fontFamily: cond, fontWeight: 800, fontSize: 70, padding: '0 20px' }}>+10%</div>
          {f >= border - 6 && <div style={{ position: 'absolute', left: 960 - coin * 160, top: 560 - coin * 360, transform: 'translate(-50%,-50%)', width: 120, height: 120, borderRadius: 60, background: B.amber, border: `6px solid ${B.ink}`, fontFamily: display, fontWeight: 800, fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>$10</div>}
          <Badge I={Landmark} x={800} y={190} at={border - 4} size={120} />
          <div style={{ position: 'absolute', left: 1250, top: 900 }}><Shop x={0} y={0} scale={0.9} /></div>
        </div>
        {phase2 && (
          <div style={{ opacity: k * (1 - k3) }}>
            <div style={{ position: 'absolute', left: 260, top: 900 }}><Shop x={0} y={0} scale={0.9} /></div>
            <Badge I={HandCoins} x={640} y={420} at={eat} size={190} label="Eat it" />
            <Badge I={TrendingUp} x={980} y={420} at={raise} size={190} label="Raise price" tone="red" />
            <Badge I={ArrowLeftRight} x={1320} y={420} at={sup} size={190} label="New supplier" />
          </div>
        )}
        {phase3 && (
          <div style={{ opacity: k3 }}>
            <Badge I={Store} x={480} y={330} at={depends} size={150} label="Shop" />
            <Badge I={Package} x={800} y={330} at={depends + 5} size={150} label="Product" />
            <Badge I={Users} x={1120} y={330} at={depends + 10} size={150} label="Rivals" />
            {[0, 1].map((i) => {
              const r = spring({ frame: f - (places - 6 + i * 6), fps, config: { damping: 12, stiffness: 160 } });
              return (
                <div key={i} style={{ position: 'absolute', left: 600 + i * 420, top: 720, transform: `translate(-50%,-50%) scale(${r}) rotate(${i ? 3 : -3}deg)`, width: 300, background: B.bone, border: `5px solid ${B.ink}`, padding: '14px 20px', boxShadow: '8px 8px 0 rgba(27,34,48,.2)' }}>
                  <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 30, color: B.muted, letterSpacing: 3 }}>RECEIPT</div>
                  <div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: i ? B.ink : B.red }}>{i ? '= same' : '+ more'}</div>
                </div>
              );
            })}
          </div>
        )}
      </World>
    </Enter>
  );
};

// F · BOTH SIDES — supporters vs critics, and a scale that won't settle
const Fs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const sup = rel(W(24, 'Supporters'), s), jobs = rel(W(24, 'jobs'), s), table = rel(W(24, 'table'), s), treasury = rel(W(24, 'Treasury'), s);
  const crit = rel(W(24, 'Critics'), s), taxw = rel(W(24, 'tax'), s), shelf = rel(W(24, 'shelf'), s), econ = rel(W(24, 'Economists'), s);
  const showScale = f >= econ - 6;
  const k = k01(f, econ - 6, econ + 6);
  const tilt = Math.sin(f / 14) * 10 * (1 - k01(f, econ + 60, econ + 160)) + Math.sin(f / 30) * 3;
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'shrug', beats: [{ at: 4, r: 'think', hold: econ - 8 }, { at: econ, r: 'shrug', hold: 300 }] }}>
        <div style={{ opacity: 1 - k }}>
          <div style={{ position: 'absolute', left: 120, top: 120, width: 640, height: 640, background: 'rgba(63,90,140,.10)', border: `5px solid ${B.blue}` }} />
          <div style={{ position: 'absolute', left: 840, top: 120, width: 640, height: 640, background: 'rgba(180,69,47,.10)', border: `5px solid ${B.red}` }} />
          <Label x={440} y={120} at={sup} size={46} tone="ink">Supporters</Label>
          <Label x={1160} y={120} at={crit} size={46} tone="red">Critics</Label>
          <Badge I={Briefcase} x={300} y={380} at={jobs} size={150} label="Jobs" />
          <Badge I={Handshake} x={580} y={380} at={table} size={150} label="Leverage" />
          <Badge I={Landmark} x={440} y={620} at={treasury} size={150} label="Revenue" tone="amber" />
          <Badge I={Receipt} x={1020} y={380} at={taxw} size={150} label="Like a tax" tone="red" />
          <Badge I={Ship} x={1020} y={620} at={taxw + 14} size={120} />
          <Badge I={Store} x={1180} y={620} at={taxw + 22} size={120} />
          <Badge I={Tag} x={1340} y={620} at={shelf} size={120} tone="red" />
        </div>
        {showScale && (
          <div style={{ opacity: k, position: 'absolute', left: 820, top: 500, transform: 'translate(-50%,-50%)' }}>
            <div style={{ transform: `rotate(${tilt}deg)`, transformOrigin: '50% 50%', width: 900, height: 16, background: B.ink, borderRadius: 8, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -20, top: 16, width: 2, height: 120, background: B.ink }} />
              <div style={{ position: 'absolute', right: -20, top: 16, width: 2, height: 120, background: B.ink }} />
              <div style={{ position: 'absolute', left: -110, top: 130, width: 180, height: 26, background: B.blue, border: `4px solid ${B.ink}`, borderRadius: '0 0 90px 90px' }} />
              <div style={{ position: 'absolute', right: -110, top: 130, width: 180, height: 26, background: B.red, border: `4px solid ${B.ink}`, borderRadius: '0 0 90px 90px' }} />
            </div>
            <div style={{ position: 'absolute', left: 430, top: 8, width: 40, height: 340, background: B.ink }} />
            <Badge I={Scale} x={450} y={-140} at={econ} size={150} tone="amber" />
            <Stamp text="NOT SETTLED" x={450} y={420} at={rel(W(24, 'settled'), s)} rot={-4} size={80} />
          </div>
        )}
        <Src>Arguments as stated by supporters and critics; no position taken</Src>
      </World>
    </Enter>
  );
};

const FIRST = 20, NEXT = 25;
export const EP04_P5_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(20), paraT(21), () => <A />, 'A chapter'],
  [paraT(21), W(21, 'case'), (s) => <Bs s={s} />, 'B court + 6–3'],
  [W(21, 'case'), paraT(22), () => <Cs />, 'C case card'],
  [paraT(22), paraT(23), (s) => <Ds s={s} />, 'D what it did'],
  [paraT(23), paraT(24), (s) => <Es s={s} />, 'E example'],
  [paraT(24), paraT(NEXT), (s) => <Fs s={s} />, 'F both sides'],
];
export const EP04Part05: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(20) + 0.2, 'paper', 0.06], [W(21, 'six'), 'tick', 0.06], [W(21, 'IEEPA'), 'paper', 0.08], [W(22, 'tool'), 'paper', 0.06], [W(22, 'place'), 'tick', 0.05],
    [W(23, 'ten'), 'paper', 0.06], [W(23, 'border'), 'counter', 0.05], [W(23, 'Eat'), 'tick', 0.05], [W(23, 'Raise'), 'tick', 0.05], [W(23, 'supplier'), 'tick', 0.05],
    [W(24, 'Supporters'), 'paper', 0.05], [W(24, 'Critics'), 'paper', 0.05], [W(24, 'settled'), 'paper', 0.07],
  ]} />
);
