import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Coins as CoinsI, Key, Landmark, Store, User } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building, Pawn, Road } from '../ep03/PaperWorld';
import { B, Badge, Label, Src, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { PartShell, Shot, Stamp, World, partFrames } from './parts';
import { Coins, Console, LeverTag, PriceTag, Podium, Pump, Receipt, atW, easeO, kk } from './props';
import { LeverChapter } from './Part04';

// EP05 · PART 05 (paragraphs 26–33, 3:40–4:34) — LEVER TWO · the federal gas tax (18.4¢, Congress only, ≈ $140/yr for Jake).
const W = wordT;

// B · 18.4¢ SINCE 1993 — a thin slice of the pump price; the 1993 tag stays while the years riffle
const Bt: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const eighteen = a(27, 'eighteen'), changed = a(27, 'changed'), ninety = a(27, 'ninety-three');
  const peel = spring({ frame: f - eighteen, fps, config: { damping: 12, stiffness: 120 } });
  const yr = Math.round(1993 + 33 * easeO(kk(f, ninety + 4, ninety + 40)));
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: eighteen, r: 'think', hold: ninety - eighteen }, { at: ninety, r: 'surprise', hold: 200 }] }}>
        <Pump x={520} y={900} scale={1.1} sale="$4.15" />
        <div style={{ position: 'absolute', left: 620 + peel * 320, top: 360 - peel * 80, transform: `rotate(${peel * -8}deg)` }}>
          <PriceTag x={0} y={0} text="18.4¢" at={eighteen - 4} tone="amber" size={110} />
          <div style={{ position: 'absolute', left: -120, top: 70, width: 240, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 4, color: B.ink, opacity: kk(f, eighteen + 6, eighteen + 14) }}>FEDERAL TAX</div>
        </div>
        {f >= changed - 4 && (
          <div style={{ position: 'absolute', left: 1220, top: 620, transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, color: B.ink, opacity: kk(f, changed - 4, changed + 6) }}>{f >= ninety ? yr : ''}</div>
            {f >= ninety && <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 48, letterSpacing: 6, color: B.red }}>SAME SINCE 1993</div>}
          </div>
        )}
        <Src>26 U.S.C. §4081: federal gasoline excise tax 18.4¢/gal, unchanged since Oct 1993</Src>
      </World>
    </Enter>
  );
};

// C · BOTH BACKED PAUSING IT — the two podiums again, a big "?"
const Cb: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const both = a(28, 'Both'), happen = a(28, 'happen');
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="stage" jake={false}>
        <Pawn x={600} y={770} base={B.blue} scale={0.9} seed="els2" hop={both} />
        <Podium x={600} y={900} name="EL-SAYED" color={B.blue} at={0} />
        <Pawn x={1320} y={770} base={B.red} scale={0.9} seed="rog2" hop={both + 4} />
        <Podium x={1320} y={900} name="ROGERS" color={B.red} at={2} />
        <PriceTag x={960} y={420} text="18.4¢ → 0?" at={both} size={100} />
        {f >= happen - 4 && <div style={{ position: 'absolute', left: 960, top: 200, transform: `translate(-50%,-50%) scale(${kk(f, happen - 4, happen + 6)})`, fontFamily: display, fontWeight: 800, fontSize: 200, color: B.red }}>?</div>}
        <Src>Both candidates backed a temporary federal gas-tax suspension (Oct 8, 2026 debate)</Src>
      </World>
    </Enter>
  );
};

// D · ONLY CONGRESS — White House ↔ Capitol: the key is in the Capitol; NEVER; bills to the bin
const Dc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const catchW = a(29, 'catch'), alone = a(29, 'alone'), only = a(29, 'Only'), never = a(29, 'never'), bills = a(29, 'Bills'), nowhere = a(29, 'nowhere');
  const gate = spring({ frame: f - (alone - 4), fps, config: { damping: 10, stiffness: 200 } });
  return (
    <Enter kind="slideL">
      <World kind="plain" jake={false}>
        <Building kind="wh" x={380} y={620} scale={0.85} />
        <Building kind="cap" x={1500} y={620} scale={0.85} />
        <Road y={600} label="PENNSYLVANIA AVENUE" x1={580} x2={1300} />
        <Label x={380} y={320} at={2} size={40}>President</Label>
        <Label x={1500} y={320} at={only - 4} size={40}>Congress</Label>
        <div style={{ position: 'absolute', left: 860, top: 380, width: 24, height: 240, background: B.red, border: `4px solid ${B.ink}`, transform: `scaleY(${gate})`, transformOrigin: '50% 100%' }} />
        {f >= only - 2 && <Badge I={Key} x={1500} y={190} at={only - 2} size={120} tone="amber" />}
        {f >= never - 2 && f < bills && <Stamp text="NEVER DONE" x={960} y={780} at={never - 2} rot={-5} size={80} />}
        {f >= bills - 2 && [0, 1, 2].map((i) => {
          const k = kk(f, bills + i * 5, bills + i * 5 + 24);
          return <div key={i} style={{ position: 'absolute', left: 1300 - k * 300 + i * 30, top: 760 + Math.sin(k * Math.PI) * -120 + k * 120, width: 120, height: 150, background: '#FBF8F1', border: `4px solid ${B.ink}`, transform: `rotate(${k * 120 + i * 10}deg)`, opacity: 1 - kk(f, nowhere + 10, nowhere + 20) }} />;
        })}
        {f >= bills && <div style={{ position: 'absolute', left: 940, top: 860, width: 160, height: 150, background: B.ink, borderRadius: '0 0 20px 20px', clipPath: 'polygon(0 0, 100% 0, 88% 100%, 12% 100%)' }} />}
        <Src>Federal excise taxes are set by Congress · 2026 suspension bills did not advance (Gray TV, May 12, 2026)</Src>
      </World>
    </Enter>
  );
};

// E · THE HIGHWAY TRUST FUND — coins roll along the road into a bridge; pause → the bridge cracks
const E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const highways = a(30, 'highways'), pause = a(30, 'Pause'), fund = a(30, 'Trust'), billions = a(30, 'billions'), somewhere = a(30, 'somewhere');
  const stop = f >= pause;
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="plain" jake={{ beats: [{ at: highways, r: 'nod', hold: pause - highways }, { at: pause, r: 'worry', hold: 300 }] }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 640, height: 90, background: '#8C8573', borderTop: `5px solid ${B.ink}`, borderBottom: `5px solid ${B.ink}` }} />
        {/* bridge */}
        <svg width={700} height={300} style={{ position: 'absolute', left: 900, top: 380, overflow: 'visible' }}>
          <path d="M0 260 Q350 20 700 260" fill="none" stroke={B.ink} strokeWidth={12} />
          {[100, 200, 300, 400, 500, 600].map((x) => <line key={x} x1={x} y1={260} x2={x} y2={260 - Math.sin((x / 700) * Math.PI) * 230} stroke={B.ink} strokeWidth={6} />)}
          <rect x={0} y={255} width={700} height={20} fill={B.bone} stroke={B.ink} strokeWidth={6} />
          {stop && <path d="M340 255 L360 230 L350 210 L372 180" fill="none" stroke={B.red} strokeWidth={8} opacity={kk(f, pause, pause + 10)} />}
        </svg>
        {Array.from({ length: 6 }).map((_, i) => {
          const t = stop ? Math.min(1, (((pause / 40) + i / 6) % 1)) : ((f / 40) + i / 6) % 1;
          return <div key={i} style={{ position: 'absolute', left: 120 + t * 900, top: 600, width: 60, height: 60, borderRadius: 30, background: B.amber, border: `5px solid ${B.ink}`, opacity: stop ? 1 - kk(f, pause, pause + 12) : 1 }} />;
        })}
        {f >= fund - 4 && <Label x={1250} y={300} at={fund - 4} size={44}>Highway Trust Fund</Label>}
        {f >= billions && <PriceTag x={1250} y={170} text="−$ billions" at={billions} tone="red" size={70} />}
        {f >= somewhere && <div style={{ position: 'absolute', left: 500, top: 330, fontFamily: display, fontWeight: 800, fontSize: 150, color: B.red, opacity: kk(f, somewhere, somewhere + 8) }}>?</div>}
        <Src>Federal fuel taxes mostly fund the Highway Trust Fund · a 122-day holiday ≈ $11.5B lost (think-tank estimate)</Src>
      </World>
    </Enter>
  );
};

// F · WOULD IT REACH YOU? — the coin stream splits: YOU ↔ SELLER (economists disagree)
const Fr: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const reach = a(31, 'reach'), econ = a(31, 'Economists'), sellers = a(31, 'sellers'), tight = a(31, 'tight');
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <PriceTag x={960} y={200} text="18.4¢" at={0} tone="amber" size={100} />
        <Badge I={User} x={560} y={560} at={reach - 4} size={170} label="You" />
        <Badge I={Store} x={1360} y={560} at={sellers - 6} size={170} label="Seller" tone="red" />
        {Array.from({ length: 8 }).map((_, i) => {
          if (f < reach) return null;
          const t = (((f - reach) / 36) + i / 8) % 1;
          const toSeller = f >= sellers && i % 3 === 0;
          const tx = toSeller ? 960 + t * 400 : 960 - t * 400;
          return <div key={i} style={{ position: 'absolute', left: tx - 22, top: 260 + t * 260, width: 44, height: 44, borderRadius: 22, background: B.amber, border: `4px solid ${B.ink}` }} />;
        })}
        {f >= econ - 2 && <Label x={960} y={860} at={econ - 2} size={48} tone="ink">Economists disagree</Label>}
        {f >= tight - 2 && <Label x={1360} y={360} at={tight - 2} size={34} tone="red">Tight supply</Label>}
        <Src>How much of a gas-tax holiday reaches drivers is debated (KUOW/NPR summary of studies)</Src>
      </World>
    </Enter>
  );
};

// G · JAKE'S MATH — the receipt types the sum; the coin stack grows to ≈ $140
const G: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const fifteen = a(32, 'fifteen'), seven = a(32, 'seven'), full = a(32, 'full'), hundred = a(32, 'hundred', 1);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: fifteen, r: 'think', hold: hundred - fifteen }, { at: hundred, r: 'smile', hold: 200 }] }}>
        <Receipt x={640} y={470} at={0} w={760} title="JAKE · GAS TAX MATH" lines={[
          ['15 gal × 52 weeks', fifteen], ['= 780 gal / year', seven], ['× 18.4¢ federal tax', full], ['≈ $140 a year', hundred],
        ]} />
        <Coins x={1260} y={860} value={140} max={400} a={hundred - 10} b={hundred + 16} label="$140" />
        <Src>Illustrative: 780 gal × $0.184 = $143.52, if 100% of a full-year suspension reached Jake</Src>
      </World>
    </Enter>
  );
};

// H · REMEMBER THAT NUMBER — the $140 tag pins itself under lever 2
const H: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const real = a(33, 'Real'), remember = a(33, 'Remember');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: real, r: 'nod', hold: 200 }] }}>
        <Console x={900} y={760} scale={0.85} at={-30} pulls={[-1, 0, -1, -1, -1]} glow={1} tags={[null, <LeverTag key="t" text="≈ $140/yr" at={remember - 4} tone="amber" />, null, null, null]} />
        <Src>Lever two on the dashboard: up to ≈ $140 a year for Jake, only if Congress acts</Src>
      </World>
    </Enter>
  );
};

const FIRST = 26, NEXT = 34;
export const EP05_P5_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(26), paraT(27), (s) => <LeverChapter s={s} p={26} n={2} title="The Gas Tax" sub="18.4 cents a gallon" I={Landmark} cardWord="gas" />, 'A lever two'],
  [paraT(27), paraT(28), (s) => <Bt s={s} />, 'B 18.4¢ since 1993'],
  [paraT(28), paraT(29), (s) => <Cb s={s} />, 'C both backed'],
  [paraT(29), paraT(30), (s) => <Dc s={s} />, 'D only Congress'],
  [paraT(30), paraT(31), (s) => <E s={s} />, 'E highway fund'],
  [paraT(31), paraT(32), (s) => <Fr s={s} />, 'F reach you?'],
  [paraT(32), paraT(33), (s) => <G s={s} />, 'G Jake math'],
  [paraT(33), paraT(NEXT), (s) => <H s={s} />, 'H remember'],
];
export const EP05Part05: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [paraT(26) + 0.1, 'tick', 0.06], [W(26, 'gas'), 'paper', 0.07], [W(27, 'eighteen'), 'paper', 0.05], [W(27, 'ninety-three'), 'counter', 0.05],
    [W(29, 'alone'), 'paper', 0.06], [W(29, 'never'), 'paper', 0.07], [W(30, 'Pause'), 'tick', 0.05], [W(31, 'sellers'), 'tick', 0.05],
    [W(32, 'fifteen'), 'type', 0.05], [W(32, 'seven'), 'type', 0.05], [W(32, 'full'), 'type', 0.05], [W(32, 'hundred', 1), 'counter', 0.05], [W(33, 'Remember'), 'paper', 0.06],
  ]} />
);
