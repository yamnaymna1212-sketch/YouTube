import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bandage, BatteryLow, CalendarClock, CircleDollarSign, FileText, HeartPulse, Landmark, Plane, Shield, Trees } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building } from '../ep03/PaperWorld';
import { B, Badge, Bug, ChapterCard, Frame, Grain, Label, PaperGround, PaperUS, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { Hemicycle } from './Story';
import { BigLine, FlipCalendar, PartShell, Shot, Stamp, clamp, ease, k01, partFrames, rel } from './parts';
import { World } from './parts';

// EP04 · PART 03 (paragraphs 9–13) — Door one: the stopgap, the deadline, what closes, 43 days, what keeps running.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

// A · CHAPTER — "Door one. The shutdown clock." (the camera arrives from Jake's DEC 11 calendar)
const A: React.FC = () => (
  <Enter kind="zoom" dur={12}>
    <ChapterCard n="Door one" title="The Shutdown Clock" at={4} />
    <Badge I={CalendarClock} x={960} y={250} at={8} size={130} tone="red" />
    <Bug /><Grain />
  </Enter>
);

// B · STOPGAP = a battery that drains — "running on a stopgap bill … passed it in September … big bipartisan votes"
const Battery: React.FC<{ level: number; x: number; y: number; w?: number }> = ({ level, x, y, w = 520 }) => {
  const h = w * 0.46;
  const c = level > 0.5 ? B.pine : level > 0.2 ? B.amber : B.red;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: 'translate(-50%,-50%)' }}>
      <div style={{ position: 'absolute', inset: 0, border: `9px solid ${B.ink}`, borderRadius: 26, background: B.bone, boxShadow: '10px 10px 0 rgba(27,34,48,.2)' }} />
      <div style={{ position: 'absolute', right: -34, top: h * 0.3, width: 26, height: h * 0.4, background: B.ink, borderRadius: '0 8px 8px 0' }} />
      <div style={{ position: 'absolute', left: 22, top: 22, bottom: 22, width: (w - 44) * Math.max(0, level), background: c, borderRadius: 10 }} />
    </div>
  );
};
const Bs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const sept = rel(W(10, 'September'), s), bip = rel(W(10, 'bipartisan'), s);
  const showVotes = f >= sept - 4;
  const vk = k01(f, sept - 4, sept + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <div style={{ opacity: 1 - vk, transform: `scale(${1 - vk * 0.2})`, transformOrigin: '50% 50%' }}>
          <Building kind="cap" x={700} y={760} scale={1.2} />
          <Battery level={1 - k01(f, 10, 200) * 0.25} x={1350} y={520} />
          <Badge I={Bandage} x={1350} y={300} at={rel(W(10, 'stopgap'), s)} size={140} tone="amber" />
        </div>
        {showVotes && (
          <div style={{ opacity: vk }}>
            <Hemicycle x={560} y={720} r={280} seats={435} rows={10} dot={6.4} blue={Math.round(interpolate(f, [bip, bip + 20], [0, 370], clamp))} label="HOUSE" at={sept} />
            <Hemicycle x={1360} y={720} r={280} seats={100} rows={6} dot={14} blue={Math.round(interpolate(f, [bip, bip + 20], [0, 90], clamp))} label="SENATE" at={sept + 4} />
            <div style={{ position: 'absolute', left: 560, top: 860, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 96, color: B.ink, opacity: k01(f, bip + 10, bip + 18) }}>370–48</div>
            <div style={{ position: 'absolute', left: 1360, top: 860, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 96, color: B.ink, opacity: k01(f, bip + 14, bip + 22) }}>90–6</div>
            <Label x={960} y={150} at={sept} size={52}>September 2026</Label>
          </div>
        )}
        <Src>H.R. 6500 · P.L. 119-103 (CRS R49353) · House 370–48, Senate 90–6 · blue dots = yes votes</Src>
      </World>
    </Enter>
  );
};

// C · SAME AS LAST YEAR → DRAINS TO DEC 11 — "It keeps spending about where it was last year. And it expires on December eleventh."
const Cs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const exp = rel(W(10, 'expires'), s), dec = rel(W(10, 'December'), s);
  const bars = 1 - k01(f, exp - 6, exp + 4);
  const g = ease(k01(f, 4, 22));
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: 6, r: 'think', hold: dec - 8 }, { at: dec, r: 'worry', hold: 200 }] }}>
        <div style={{ opacity: bars }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ position: 'absolute', left: 620 + i * 460, bottom: 260, width: 220, height: 460 * g, background: i ? B.blue : '#8C97B0', border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.2)' }} />
          ))}
          <div style={{ position: 'absolute', left: 730, top: 840, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 56, color: B.ink }}>2026</div>
          <div style={{ position: 'absolute', left: 1190, top: 840, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 56, color: B.ink }}>NOW</div>
          <div style={{ position: 'absolute', left: 960, top: 420, transform: 'translate(-50%,-50%)', fontFamily: display, fontWeight: 800, fontSize: 160, color: B.ink, opacity: k01(f, 18, 26) }}>=</div>
        </div>
        {f >= exp - 6 && (
          <div style={{ opacity: 1 - bars }}>
            <Battery level={1 - ease(k01(f, exp, dec + 8))} x={600} y={500} w={560} />
            <FlipCalendar x={1200} y={500} dates={[['OCT', '1'], ['OCT', '30'], ['NOV', '20'], ['DEC', '11']]} from={exp} to={dec} ringAt={dec + 4} size={0.8} />
          </div>
        )}
        <Src>Funding held near FY2026 levels (CRS R49353)</Src>
      </World>
    </Enter>
  );
};

// D · LAPSE — "If Congress doesn't pass a new bill, or another stopgap, by then, funding lapses. Parts of the government close."
const ICONS = [Landmark, Plane, Trees, FileText, Shield, HeartPulse];
const Ds: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const lapse = rel(W(11, 'lapses'), s), close = rel(W(11, 'close'), s);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 4, r: 'think', hold: close - 6 }, { at: close, r: 'surprise', hold: 30 }, { at: close + 30, r: 'worry', hold: 200 }] }}>
        <Badge I={FileText} x={620} y={300} at={rel(W(11, 'new'), s)} size={150} label="New bill" />
        <Badge I={Bandage} x={1300} y={300} at={rel(W(11, 'stopgap'), s)} size={150} label="Stopgap" />
        <Stamp text="NONE" x={960} y={330} at={lapse} />
        {[Landmark, Trees, FileText].map((I, i) => {
          const off = close + i * 5;
          const g = k01(f, off, off + 8);
          return (
            <div key={i} style={{ position: 'absolute', left: 560 + i * 400, top: 760, transform: 'translate(-50%,-50%)', filter: `grayscale(${g})`, opacity: f < lapse ? 0 : 1 - g * 0.45 }}>
              <Badge I={I} x={0} y={0} at={lapse + 4 + i * 3} size={170} tone={g > 0.5 ? 'bone' : 'amber'} />
            </div>
          );
        })}
        {f >= close + 14 && <Stamp text="CLOSED" x={960} y={760} at={close + 14} rot={-4} size={110} />}
      </World>
    </Enter>
  );
};

// E · REAL + HISTORY — "You've seen what that looks like." (archive doors) "…forty-three days. The longest in American history." (bars)
const HIST: [string, number][] = [['1995–96', 21], ['2013', 16], ['2018–19', 35], ['2025', 43]];
const Es: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const last = rel(W(12, 'Last'), s), days = rel(W(12, 'forty-three'), s), longest = rel(W(12, 'longest'), s);
  const showBars = f >= last - 4;
  const bk = k01(f, last - 4, last + 6);
  return (
    <Enter kind="slideL">
      <World jake={false}>
        {!showBars || bk < 1 ? (
          <div style={{ opacity: 1 - bk }}>
            <Frame src="ep04/footage/cap_doors_guards.mp4" video x={960} y={520} w={1100} h={700} rot={-1.5} at={0} year="1930s" />
          </div>
        ) : null}
        {showBars && (
          <div style={{ opacity: bk }}>
            {HIST.map(([y, d], i) => {
              const grow = ease(k01(f, last + i * 5, last + 20 + i * 5));
              const hl = i === 3 && f >= longest;
              return (
                <div key={y}>
                  <div style={{ position: 'absolute', left: 300 + i * 340, bottom: 230, width: 210, height: d * 13 * grow, background: hl ? B.red : i === 3 ? B.ink : '#8C97B0', border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.2)' }} />
                  <div style={{ position: 'absolute', left: 405 + i * 340, bottom: 250 + d * 13 * grow, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: i === 3 ? 110 : 70, color: hl ? B.red : B.ink, opacity: i === 3 ? k01(f, days - 10, days - 6) : 1 }}>{Math.round(d * (i === 3 ? k01(f, days - 10, days + 6) : grow))}</div>
                  <div style={{ position: 'absolute', left: 405 + i * 340, top: 870, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 48, color: B.ink }}>{y}</div>
                </div>
              );
            })}
            <Label x={960} y={130} at={last} size={52}>Days shut down</Label>
            <div style={{ position: 'absolute', right: 40, top: 520, width: 330, height: 460 }}>
              <LiveJake pose="stand" seed="p3pip" beats={[{ at: days, r: 'surprise', hold: 40 }]} style={{ position: 'absolute', left: 0, top: 0, height: 460 }} />
            </div>
          </div>
        )}
        <Src>{showBars ? 'Lapses in appropriations: 1995–96, 2013, 2018–19 (CRS); 2025: 43 days, ended Nov 12, 2025' : "Archive: U.S. Capitol doors, 'Washington: The Nation's Capitol' (1930s), Prelinger Archives (PD)"}</Src>
      </World>
    </Enter>
  );
};

// F · WHAT KEEPS RUNNING / WHAT CLOSES — paragraph 13
const Fs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const mil = rel(W(13, 'military'), s), air = rel(W(13, 'Air'), s), soc = rel(W(13, 'Social'), s);
  const unpaid = rel(W(13, 'without'), s), parks = rel(W(13, 'parks'), s), permit = rel(W(13, 'permit'), s), spread = rel(W(13, 'longer'), s);
  const showMap = f >= spread - 6;
  const mk = k01(f, spread - 6, spread + 6);
  const tile = (I: typeof Shield, x: number, at: number, grey: number) => {
    const g = grey >= 0 ? k01(f, grey, grey + 8) : 0;
    return <div key={x} style={{ position: 'absolute', left: x, top: 0, filter: `grayscale(${g})`, opacity: 1 - g * 0.4 }}><Badge I={I} x={0} y={0} at={at} size={180} /></div>;
  };
  const coin = spring({ frame: f - unpaid, fps, config: { damping: 12, stiffness: 160 } });
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="plain" jake={{ beats: [{ at: mil, r: 'nod', hold: 60 }, { at: unpaid, r: 'worry', hold: 120 }, { at: spread, r: 'doubt', hold: 300 }] }}>
        <div style={{ opacity: 1 - mk }}>
          <div style={{ position: 'absolute', left: 0, top: 380 }}>
            {tile(Shield, 380, mil, -1)}{tile(Plane, 760, air, -1)}{tile(HeartPulse, 1140, soc, -1)}
          </div>
          {f >= unpaid && [380, 760].map((x) => (
            <div key={x} style={{ position: 'absolute', left: x + 80, top: 280, transform: `translate(-50%,-50%) scale(${coin})` }}>
              <div style={{ width: 96, height: 96, borderRadius: 48, background: B.bone, border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <CircleDollarSign size={56} color={B.ink} strokeWidth={2.4} />
                <div style={{ position: 'absolute', width: 100, height: 8, background: B.red, borderRadius: 4, transform: 'rotate(-45deg)' }} />
              </div>
            </div>
          ))}
          <div style={{ position: 'absolute', left: 0, top: 780 }}>
            {tile(Trees, 560, parks - 4, parks + 2)}{tile(FileText, 960, permit - 4, permit + 2)}{tile(Landmark, 1360, permit + 4, permit + 10)}
          </div>
          <Label x={760} y={170} at={mil} size={46} tone="ink">Keeps running</Label>
        </div>
        {showMap && (
          <div style={{ opacity: mk }}>
            <PaperUS x={260} y={130} w={1400} on={(n) => k01(f, spread + (n.charCodeAt(0) % 13) * 4, spread + (n.charCodeAt(0) % 13) * 4 + 10)} fill={() => '#9A9384'} />
          </div>
        )}
        <Src>Excepted vs. furloughed work: OPM shutdown guidance; SSA contingency plan · map illustrative</Src>
      </World>
    </Enter>
  );
};

const FIRST = 9, NEXT = 14;
export const EP04_P3_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(9), paraT(10), () => <A />, 'A chapter'],
  [paraT(10), W(10, 'keeps'), (s) => <Bs s={s} />, 'B stopgap + votes'],
  [W(10, 'keeps'), paraT(11), (s) => <Cs s={s} />, 'C same level → Dec 11'],
  [paraT(11), paraT(12), (s) => <Ds s={s} />, 'D lapse → closed'],
  [paraT(12), paraT(13), (s) => <Es s={s} />, 'E archive + 43 days'],
  [paraT(13), paraT(NEXT), (s) => <Fs s={s} />, 'F keeps running / closes'],
];
export const EP04Part03: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(9) + 0.2, 'paper', 0.06], [W(10, 'bipartisan'), 'counter', 0.05], [W(10, 'December'), 'paper', 0.07],
    [W(11, 'lapses'), 'paper', 0.08], [W(11, 'close'), 'paper', 0.06], [W(12, 'forty-three'), 'counter', 0.06],
    [W(13, 'military'), 'tick', 0.05], [W(13, 'Air'), 'tick', 0.05], [W(13, 'Social'), 'tick', 0.05], [W(13, 'parks'), 'paper', 0.05],
  ]} />
);
