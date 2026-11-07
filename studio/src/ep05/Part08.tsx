import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Drill, Hourglass, Plug, Trophy } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Pawn } from '../ep03/PaperWorld';
import { Flag } from '../ep03/Real';
import { B, Badge, Frame, Label, PaperUS, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, World, partFrames } from './parts';
import { Car, Pump, Pumpjack, Solar, Turbine, atW, easeO, kk } from './props';
import { LeverChapter } from './Part04';

// EP05 · PART 08 (paragraphs 44–48, 5:53–6:40) — LEVER FIVE · the long game: drill vs switch; years, not weeks.
const W = wordT;

// B · THE SPLIT — the map splits: DRILL (pumpjacks, pipelines) ↔ SWITCH (turbines, solar, chargers)
const Bs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const split = a(45, 'split'), drill = a(45, 'drill'), land = a(45, 'land'), pipes = a(45, 'pipelines'), supply = a(45, 'supply'), off = a(45, 'off'), renew = a(45, 'renewables'), electric = a(45, 'electric'), gulf = a(45, 'Gulf');
  const gap = easeO(kk(f, split - 6, split + 14)) * 70;
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="plain" jake={false}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 960 - gap / 2, height: 1080, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: -gap, top: 0, width: 1920, height: 1080 }}>
            <div style={{ opacity: 0.35 }}><PaperUS x={260} y={180} w={1400} /></div>
            <Pumpjack x={360} y={760} scale={0.9} />
            {f >= land && <Pumpjack x={640} y={820} scale={0.7} speed={1.3} />}
            {f >= pipes - 4 && <svg width={960} height={1080} style={{ position: 'absolute' }}><path d="M150 900 C 350 700, 550 950, 860 740" fill="none" stroke={B.ink} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray={`${kk(f, pipes - 4, pipes + 16)} 1`} /></svg>}
            <Badge I={Drill} x={480} y={250} at={drill - 4} size={140} tone="amber" label="Drill" />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 960 + gap / 2, top: 0, width: 960, height: 1080, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: -960 + gap, top: 0, width: 1920, height: 1080 }}>
            <div style={{ opacity: 0.35 }}><PaperUS x={260} y={180} w={1400} /></div>
            {[1180, 1380].map((x, i) => <Turbine key={x} x={x} y={820} h={380 - i * 40} at={renew - 6 + i * 4} />)}
            <Solar x={1580} y={820} at={renew + 4} />
            {f >= electric - 4 && <div style={{ position: 'absolute', left: 1700, top: 820, transform: 'translate(-50%,-100%)', opacity: kk(f, electric - 4, electric + 4) }}><Car x={0} y={0} color={B.pine} scale={0.8} /></div>}
            {f >= electric && <Badge I={Plug} x={1760} y={560} at={electric} size={90} />}
            <Badge I={Plug} x={1440} y={250} at={off - 4} size={140} tone="bone" label="Switch" />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 960 - 4, top: 0, width: 8, height: 1080 * kk(f, split - 6, split + 10), background: B.ink }} />
        {f >= supply - 4 && f < off && <Label x={480} y={420} at={supply - 4} size={44}>More supply</Label>}
        {f >= gulf - 4 && <Label x={1440} y={420} at={gulf - 4} size={44}>Less exposure</Label>}
        <Src>Two broad approaches debated in the 2026 Michigan Senate race (Bridge Michigan, June 3, 2026)</Src>
      </World>
    </Enter>
  );
};

// C · WHO STANDS WHERE — El-Sayed pawn to the switch side, Rogers "all of the above" in the middle
const Cw: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const els = a(46, 'El-Sayed'), rogers = a(46, 'Rogers'), above = a(46, 'above');
  const ex = 960 + easeO(kk(f, els, els + 20)) * 480, rx = 960 + (1 - easeO(kk(f, rogers, rogers + 16))) * -480 + 0;
  return (
    <Enter kind="none">
      <World kind="plain" jake={false}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 955, height: 1080, background: 'rgba(217,164,65,.12)' }} />
        <div style={{ position: 'absolute', left: 965, top: 0, width: 955, height: 1080, background: 'rgba(78,122,74,.12)' }} />
        <div style={{ position: 'absolute', left: 956, top: 0, width: 8, height: 1080, background: B.ink }} />
        <Label x={480} y={140} at={0} size={56}>Drill</Label>
        <Label x={1440} y={140} at={0} size={56}>Switch</Label>
        <Pawn x={ex} y={720} base={B.blue} scale={0.95} seed="els5" hop={els + 20} />
        <Label x={ex} y={770} at={els} size={34}>El-Sayed</Label>
        <Pawn x={rx} y={720} base={B.red} scale={0.95} seed="rog5" hop={rogers + 16} />
        <Label x={rx} y={770} at={rogers} size={34}>Rogers</Label>
        {f >= above - 4 && <Label x={960} y={880} at={above - 4} size={40} tone="ink">All of the above</Label>}
        <Src>El-Sayed: "100% renewable energy" · Rogers: "all of the above," renewables "where it works" (Bridge Michigan)</Src>
      </World>
    </Enter>
  );
};

// D · YEARS, NOT WEEKS — a ruler of years; a 1975 pumpjack film for a beat; #1 producer badge
const Dy: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const years = a(47, 'years'), lease = a(47, 'lease'), car = a(47, 'car'), largest = a(47, 'largest'), spiked = a(47, 'spiked'), globally = a(47, 'globally');
  const film = f >= largest - 6;
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: years, r: 'think', hold: largest - years }, { at: largest, r: 'surprise', hold: 30 }, { at: globally, r: 'nod', hold: 200 }] }}>
        <div style={{ opacity: 1 - kk(f, largest - 8, largest) }}>
          <div style={{ position: 'absolute', left: 160, top: 560, width: 1200, height: 70, background: B.amber, border: `6px solid ${B.ink}` }}>
            {Array.from({ length: 11 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 119, top: 0, width: 5, height: i % 5 === 0 ? 70 : 34, background: B.ink }} />)}
          </div>
          {['NOW', '+5 YRS', '+10 YRS'].map((t, i) => <div key={t} style={{ position: 'absolute', left: 160 + i * 595, top: 650, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.ink, opacity: kk(f, years - 4, years + 6) }}>{t}</div>)}
          <Badge I={Hourglass} x={760} y={360} at={years - 4} size={130} tone="amber" />
          {f >= lease - 4 && <><div style={{ position: 'absolute', left: 160, top: 470, width: 700 * easeO(kk(f, lease - 4, lease + 20)), height: 14, background: B.ink }} /><Label x={260} y={440} at={lease - 4} size={32}>Lease → barrel</Label></>}
          {f >= car - 4 && <><div style={{ position: 'absolute', left: 160, top: 760, width: 1100 * easeO(kk(f, car - 4, car + 20)), height: 14, background: B.pine }} /><Label x={260} y={800} at={car - 4} size={32}>Old car → new car</Label></>}
        </div>
        {film && <Frame src="sayed/footage/v01_pumpjack_1975.mp4" video x={560} y={470} w={640} h={420} rot={-2} at={largest - 6} year="EPA / National Archives, 1975" />}
        {film && <Flag c="us" w={150} x={1100} y={300} at={largest - 2} />}
        {film && <Badge I={Trophy} x={1100} y={560} at={largest + 4} size={140} tone="amber" label="#1 producer" />}
        {f >= spiked && <div style={{ position: 'absolute', left: 1100, top: 760, transform: 'translateX(-50%)', fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 4, color: B.red, opacity: kk(f, spiked, spiked + 8) }}>STILL SPIKED</div>}
        <Src>EIA: U.S. is the world's largest crude oil producer (since 2018) · film: public domain</Src>
      </World>
    </Enter>
  );
};

// E · FOR YOUR KIDS' GAS BILL — Jake and his niece at the pump, a 2040 tag; "next week" greys out
const Ek: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const kids = a(48, 'kids'), next = a(48, 'next');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false}>
        <Pump x={560} y={900} scale={0.95} sale="$?.??" />
        <LiveJake pose="point" seed="p8k" beats={[{ at: kids, r: 'smile', hold: next - kids }, { at: next, r: 'shrug', hold: 200 }]} style={{ position: 'absolute', left: 820, top: 380, height: 560 }} />
        <Pawn x={1180} y={900} base={B.amber} scale={0.55} seed="niece" hop={kids} />
        <Label x={1180} y={940} at={kids} size={26}>Illustrative</Label>
        <div style={{ position: 'absolute', left: 1450, top: 360, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.2)', padding: '8px 30px', fontFamily: display, fontWeight: 800, fontSize: 96, color: B.pine, transform: `scale(${kk(f, kids - 4, kids + 6)}) rotate(4deg)` }}>2040</div>
        {f >= next - 2 && <div style={{ position: 'absolute', left: 1450, top: 560, background: B.bone, border: `5px solid ${B.ink}`, padding: '6px 22px', fontFamily: cond, fontWeight: 800, fontSize: 52, color: B.ink, opacity: 1 - 0.65 * kk(f, next + 6, next + 16), textDecoration: f >= next + 8 ? 'line-through' : 'none' }}>NEXT WEEK</div>}
        <Src>Long-run energy policy moves prices over years, in either direction</Src>
      </World>
    </Enter>
  );
};

const FIRST = 44, NEXT = 49;
export const EP05_P8_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(44), paraT(45), (s) => <LeverChapter s={s} p={44} n={5} title="The Long Game" sub="Years, not weeks" I={Hourglass} cardWord="slow" />, 'A lever five'],
  [paraT(45), paraT(46), (s) => <Bs s={s} />, 'B drill vs switch'],
  [paraT(46), paraT(47), (s) => <Cw s={s} />, 'C who stands where'],
  [paraT(47), paraT(48), (s) => <Dy s={s} />, 'D years · #1 producer'],
  [paraT(48), paraT(NEXT), (s) => <Ek s={s} />, 'E kids'],
];
export const EP05Part08: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(44) + 0.1, 'tick', 0.06], [W(44, 'slow'), 'paper', 0.07], [W(45, 'split'), 'paper', 0.06], [W(45, 'drill'), 'tick', 0.05], [W(45, 'renewables'), 'tick', 0.05],
    [W(46, 'El-Sayed'), 'tick', 0.05], [W(46, 'Rogers'), 'tick', 0.05], [W(47, 'years'), 'tick', 0.05], [W(47, 'largest'), 'paper', 0.06], [W(48, 'kids'), 'tick', 0.05],
  ]} />
);
