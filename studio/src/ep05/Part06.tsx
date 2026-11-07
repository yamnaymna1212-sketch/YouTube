import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Check, Search, Sun, ToggleRight, Wheat } from 'lucide-react';
import { B, Badge, Frame, Label, PaperUS, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, Stamp, World, partFrames } from './parts';
import { Gallon, Pump, Tanker, atW, easeO, kk } from './props';
import { LeverChapter } from './Part04';
import { Route, onArc } from './Story';
import { geoAlbersUsa } from 'd3-geo';
const AL = geoAlbersUsa().scale(1300).translate([487.5, 305]);
const HOU = AL([-95.37, 29.76])!, NYC = AL([-74.0, 40.7])!;

// EP05 · PART 06 (paragraphs 34–37, 4:34–4:57) — LEVER THREE · the small switches (E15 waiver, Jones Act waiver): a few cents.
const W = wordT;

// B · TWO SWITCHES — ethanol into summer gas; a foreign-flag tanker between two U.S. ports (Jones Act waived)
const Bs: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const waive = a(35, 'waive'), ethanol = a(35, 'ethanol'), summer = a(35, 'summer'), ships = a(35, 'ships'), ports = a(35, 'ports'), jones = a(35, 'Jones');
  const mapIn = kk(f, ships - 10, ships + 4);
  const sc = 1100 / 975;
  const H = [180 + HOU[0] * sc, 140 + HOU[1] * sc], NY = [180 + NYC[0] * sc, 140 + NYC[1] * sc];
  const t = easeO(kk(f, ports - 6, jones + 30));
  const [tx, ty] = onArc(H[0], H[1], 1500, 700, NY[0], NY[1], t);
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <div style={{ opacity: 1 - mapIn }}>
          <Badge I={ToggleRight} x={300} y={260} at={waive - 4} size={120} tone="amber" label="Waiver" />
          <Badge I={Wheat} x={720} y={300} at={ethanol - 4} size={150} label="Ethanol" />
          <Gallon x={1160} y={520} h={460} at={ethanol} labels={false} layers={[{ frac: 0.85, color: B.amber, label: '', pct: '', at: ethanol + 4 }, { frac: 0.15, color: B.pine, label: '', pct: '', at: summer - 2 }]} />
          {f >= summer - 2 && <Badge I={Sun} x={1420} y={260} at={summer - 2} size={110} tone="amber" label="Summer" />}
          {f >= summer && <div style={{ position: 'absolute', left: 1160, top: 830, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 90, color: B.pine }}>E15</div>}
        </div>
        {mapIn > 0 && (
          <div style={{ opacity: mapIn }}>
            <PaperUS x={180} y={140} w={1100} />
            <Route d={`M${H[0]} ${H[1]} Q 1500 700 ${NY[0]} ${NY[1]}`} at={ports - 6} />
            <Label x={H[0]} y={H[1] + 60} at={ports - 6} size={30}>Houston</Label>
            <Label x={NY[0] + 40} y={NY[1] - 60} at={ports} size={30}>New York</Label>
            <Tanker x={tx} y={ty + 30} scale={0.45} flag={B.pine} />
            <Frame src="iran/footage/navy1968_at_sea.mp4" video x={1560} y={760} w={440} h={260} rot={2} at={ships - 4} year="DoD film, 1968 (CC0)" rate={0.8} />
            {f >= jones - 2 && <Stamp text="JONES ACT · WAIVED" x={760} y={240} at={jones - 2} rot={-5} size={70} />}
          </div>
        )}
        <Src>EPA emergency fuel waivers (summer E15/RVP) · Jones Act waiver, 2026 (TIME, Aug 5, 2026) · film: Prelinger/DoD (CC0)</Src>
      </World>
    </Enter>
  );
};

// C · USED BOTH — two check badges
const Cu: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const both = a(36, 'both');
  return (
    <Enter kind="zoom" dur={8}>
      <World jake={{ beats: [{ at: both, r: 'nod', hold: 200 }] }}>
        <Badge I={Wheat} x={640} y={460} at={0} size={170} label="E15 waiver" />
        <Badge I={Check} x={740} y={360} at={both} size={80} tone="amber" />
        <Badge I={ToggleRight} x={1060} y={460} at={4} size={170} label="Jones Act waiver" />
        <Badge I={Check} x={1160} y={360} at={both + 4} size={80} tone="amber" />
        <Src>Both used by the administration in 2026</Src>
      </World>
    </Enter>
  );
};

// D · A FEW CENTS — magnifying glass over the pump sign
const D: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const cents = a(37, 'cents'), helpful = a(37, 'Helpful'), barely = a(37, 'barely');
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: helpful, r: 'nod', hold: barely - helpful }, { at: barely, r: 'shrug', hold: 200 }] }}>
        <Pump x={700} y={900} scale={1.15} sale={f >= cents ? '$4.13' : '$4.15'} />
        <div style={{ position: 'absolute', left: 860, top: 320, transform: `scale(${kk(f, cents - 6, cents + 4)})` }}>
          <Search size={300} color={B.ink} strokeWidth={1.6} />
        </div>
        {f >= cents && <div style={{ position: 'absolute', left: 1180, top: 300, fontFamily: display, fontWeight: 800, fontSize: 130, color: B.pine, opacity: kk(f, cents, cents + 8) }}>−2¢</div>}
        {f >= barely && <div style={{ position: 'absolute', left: 1180, top: 470, fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 4, color: B.muted }}>BARELY VISIBLE</div>}
        <Src>Estimates: a few cents per gallon (TIME, Aug 2026) · −2¢ shown as an example</Src>
      </World>
    </Enter>
  );
};

const FIRST = 34, NEXT = 38;
export const EP05_P6_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(34), paraT(35), (s) => <LeverChapter s={s} p={34} n={3} title="The Small Switches" sub="Emergency waivers" I={ToggleRight} cardWord="small" />, 'A lever three'],
  [paraT(35), paraT(36), (s) => <Bs s={s} />, 'B waivers'],
  [paraT(36), paraT(37), (s) => <Cu s={s} />, 'C used both'],
  [paraT(37), paraT(NEXT), (s) => <D s={s} />, 'D a few cents'],
];
export const EP05Part06: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(34) + 0.1, 'tick', 0.06], [W(34, 'small'), 'paper', 0.07], [W(35, 'ethanol'), 'tick', 0.05], [W(35, 'Jones'), 'paper', 0.07],
    [W(36, 'both'), 'tick', 0.05], [W(37, 'cents'), 'tick', 0.05],
  ]} />
);
