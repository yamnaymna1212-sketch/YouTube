import React from 'react';
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Audio, Video } from '@remotion/media';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import states from 'us-atlas/states-albers-10m.json';
import { C, F } from '../theme';
import { FilmFinish, clamp, ease, io } from '../ui/Film';
import { FullBody } from '../host/FullBody';
import { LiveJake } from '../host/LiveJake';
import { Car, Diner, GasStation, Lamp, LightWrap, Sky, Skyline, Street, Tree, W } from '../world/World';
import { Archive, Cue, Flash, Grade, HOOK_FRAMES, Ico, Label, LogoChip, Note, Push, Slam, SoundLayer, Src, World, useDur, useShake } from './Hook';
import { Banknote, Fuel, HeartPulse, Landmark, ScrollText, UserRound, Vote, Wallet as WalletIcon } from 'lucide-react';
import { remap, voFrames } from './timing';

// EP02 · COLD OPEN (vo_01, 38.1 s) and WHO IS HE? (vo_02, 41.2 s).
// Cuts sit on the VO pauses (ffmpeg silencedetect). Shot types never repeat back to back.

const A = (f: string) => staticFile(`sayed/${f}`);
export type Cut = [string, number, number, React.FC];
// Cut lists are written in frames of the ORIGINAL take; `remap` moves them onto the pause-tightened VO.
const TAIL = 10;
export const partFrames = (vo: string) => voFrames(vo) + TAIL;
export const Cuts: React.FC<{ cuts: Cut[]; vo: string; flashes?: number[]; musicFrom: number; cues: Cue[] }> = ({ cuts, vo, flashes = [], musicFrom, cues }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    {cuts.map(([k, a, b, Comp], i) => {
      const from = remap(vo, a);
      const to = i === cuts.length - 1 ? partFrames(vo) : remap(vo, b);
      return <Sequence key={k} from={from} durationInFrames={Math.max(1, to - from)} name={k}><Comp /></Sequence>;
    })}
    {flashes.map((at) => <Sequence key={at} from={remap(vo, at)} durationInFrames={4}><Flash /></Sequence>)}
    <Audio src={A(`vo/tight/${vo}.mp3`)} />
    <SoundLayer musicFrom={musicFrom} cues={cues} vo={vo} />
    <FilmFinish />
  </AbsoluteFill>
);
export const t01 = (f: number, d: number) => interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });

// Running scoreboard (top-right). Appears in the cold open, updated at the end of every file.
export const Wallet: React.FC<{ value?: string; at?: number }> = ({ value = '$0', at = 0 }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 14], [0, 1], { ...clamp, easing: ease });
  return (
    <div style={{ position: 'absolute', right: 60, top: 50, background: 'rgba(12,13,16,.86)', padding: '14px 22px', borderLeft: `4px solid ${C.amber}`, opacity: t, transform: `translateY(${(1 - t) * -16}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.sans, fontWeight: 600, fontSize: 16, letterSpacing: 4, color: C.steel }}><WalletIcon size={18} color={C.amber} strokeWidth={1.8} />JAKE'S WALLET</div>
      <div style={{ fontFamily: F.mono, fontSize: 44, color: C.amber, lineHeight: 1.1 }}>{value}</div>
    </div>
  );
};
export const Illus: React.FC = () => <div style={{ position: 'absolute', left: 60, bottom: 40, fontFamily: F.mono, fontSize: 15, color: 'rgba(236,231,222,.55)' }}>ILLUSTRATION · Jake is a composite character built from national averages</div>;

// ======================= COLD OPEN =======================

// C1 · WORLD wide: Jake on his street, name card.
const C1: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const o = interpolate(f, [8, 20], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.02 + 0.08 * t})`, transformOrigin: '45% 70%' }}>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080">
          <Sky horizon={600} /><Skyline base={640} />
          <Diner x={420} base={790} s={1.05} />
          <Street walkY={790} roadY={900} />
          <Tree x={300} base={800} s={1.1} /><Lamp x={1100} base={800} />
          <Car x={1450} base={1040} s={1.0} color="#6E8FA8" flip />
          <LightWrap />
        </svg>
        <LiveJake pose="stand" seed="c1" beats={[{ at: 8, r: 'smile' }, { at: 8, r: 'nod', hold: 26 }]} style={{ position: 'absolute', left: 1040, top: 400, height: 560 }} />
      </div>
      <div style={{ position: 'absolute', left: 1330, top: 470, opacity: o, transform: `translateX(${(1 - o) * 20}px)` }}>
        <div style={{ width: 50, height: 3, background: C.red, marginBottom: 10 }} />
        <div style={{ fontFamily: F.serif, fontSize: 80, color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,.5)' }}>Jake, 26</div>
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 22, letterSpacing: 4, color: '#fff', opacity: 0.85 }}>MICHIGAN · 2012 SEDAN</div>
      </div>
      <Illus />
    </AbsoluteFill>
  );
};

// C2 · WORLD low angle: the pump counter spins and stops at $62.30.
const C2: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const v = interpolate(f, [4, 70], [0, 62.3], { ...clamp, easing: ease });
  const gal = interpolate(f, [4, 70], [0, 15], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.15 + 0.06 * t}) translate(${-30 * t}px, 0)`, transformOrigin: '30% 80%' }}>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080">
          <Sky horizon={700} /><Skyline base={720} seed={9} />
          <rect y={720} width={1920} height={360} fill={W.asphalt} />
          <GasStation x={80} base={960} s={1.2} price="4.15" />
          <Car x={560} base={1020} s={1.15} color="#6E8FA8" />
          <LightWrap />
        </svg>
        <LiveJake pose="pump" seed="c2" face={{ look: -0.5 }} beats={[{ at: 66, r: 'surprise', hold: 24 }, { at: 90, r: 'worry' }]} style={{ position: 'absolute', left: 840, top: 420, height: 620 }} />
      </div>
      {/* pump display close-up insert */}
      <div style={{ position: 'absolute', right: 110, top: 470, width: 560, background: '#101317', border: '6px solid #D9D4CA', borderRadius: 10, padding: '24px 34px', boxShadow: '0 30px 70px rgba(0,0,0,.6)', transform: `rotate(${1.5 - t}deg)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.sans, fontWeight: 700, fontSize: 20, letterSpacing: 3, color: '#9AA2AD' }}><span>TOTAL SALE</span><span>$</span></div>
        <div style={{ fontFamily: F.mono, fontSize: 130, color: '#7CF0A2', textAlign: 'right', lineHeight: 1.05, textShadow: '0 0 18px rgba(124,240,162,.45)' }}>{v.toFixed(2)}</div>
        <div style={{ height: 2, background: '#2A2F37', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 34, color: '#7CF0A2' }}><span style={{ fontSize: 20, color: '#9AA2AD', fontFamily: F.sans, fontWeight: 700, letterSpacing: 3 }}>GALLONS</span><span>{gal.toFixed(3)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 34, color: '#7CF0A2' }}><span style={{ fontSize: 20, color: '#9AA2AD', fontFamily: F.sans, fontWeight: 700, letterSpacing: 3 }}>PRICE / GAL</span><span>4.153</span></div>
      </div>
      {/* real pump photo (real station brand visible) */}
      <div style={{ position: 'absolute', left: 90, top: 90, width: 520, height: 340, overflow: 'hidden', border: '6px solid #F3EFE7', boxShadow: '0 30px 60px rgba(0,0,0,.55)', transform: `rotate(${-2 + t}deg)` }}>
        <Push src={A('racetrac_gas_station_jefferson_parish_louisiana_5_march_2026_1.jpg')} from={1.1} to={1.2} filter="saturate(.9)" />
        <div style={{ position: 'absolute', left: 10, bottom: 8, fontFamily: F.mono, fontSize: 14, color: '#fff', background: 'rgba(0,0,0,.65)', padding: '3px 8px' }}>REAL PUMP · Louisiana · Mar 5, 2026</div>
      </div>
      {/* real money: three $20s + two $1s ≈ $62 */}
      {[[20, 0], [20, 1], [20, 2], [1, 3], [1, 4]].map(([v, i]) => (
        <Note key={i} v={v as 20 | 1} w={300} style={{ position: 'absolute', left: 1330 + i * 26, top: 90 + i * 14, rotate: `${-10 + i * 5}deg`, opacity: interpolate(f, [60 + i * 3, 68 + i * 3], [0, 1], clamp), translate: `0px ${interpolate(f, [60 + i * 3, 72 + i * 3], [-30, 0], { ...clamp, easing: ease })}px` }} />
      ))}
      <Src logo="eia.png">U.S. EIA · U.S. regular avg $4.153, week of Nov 2, 2026 · 15 gal fill-up · Photo: Infrogmation (CC BY-SA 4.0) · Notes: uscurrency.gov</Src>
    </AbsoluteFill>
  );
};

// C3 · REAL PHOTO: El-Sayed with voters (a different photo from the hook), lower third.
const C3: React.FC = () => {
  const f = useCurrentFrame();
  const w = interpolate(f, [12, 28], [0, 1], { ...clamp, easing: ease });
  const o = interpolate(f, [18, 32], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('abdul_el_sayed_meet_and_greet_by_conlan_houston_5_cropped.jpg')} from={1.2} to={1.3} filter="blur(28px) brightness(.45) saturate(.8)" />
      <div style={{ position: 'absolute', right: 150, top: 90, width: 720, height: 900, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}>
        <Push src={A('abdul_el_sayed_meet_and_greet_by_conlan_houston_5_cropped.jpg')} from={1.0} to={1.08} origin="50% 30%" filter="saturate(.9) contrast(1.05)" />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.88), transparent 50%)' }} />
      <div style={{ position: 'absolute', left: 110, bottom: 130, color: C.bone }}>
        <div style={{ width: 70 * w, height: 3, background: C.red, marginBottom: 16 }} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 42, opacity: o }}>Abdul El-Sayed</div>
        <div style={{ fontFamily: F.sans, fontSize: 25, opacity: o * 0.75, marginTop: 6 }}>U.S. Senator-elect (D-MI) · elected Nov 3, 2026</div>
      </div>
      <Src>Photo: Conlan Houston · CC BY-SA 4.0 · Wikimedia Commons</Src>
    </AbsoluteFill>
  );
};

// C4 · REAL PHOTO (NASA): Michigan from orbit + kinetic "first" line.
const C4: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [6, 18], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('real/nasa_iss074e0642367.jpg')} from={1.1} to={1.25} x={[20, -30]} filter="brightness(.8) contrast(1.1)" />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.8), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 110, top: 360, opacity: o, transform: `translateY(${(1 - o) * 20}px)` }}>
        <div style={{ fontFamily: F.serif, fontSize: 104, color: C.bone, lineHeight: 1.02 }}>The <i style={{ color: C.amber }}>first</i> Muslim<br />U.S. senator.</div>
        <Label at={20} color={C.steel} style={{ marginTop: 22 }}>in American history</Label>
      </div>
      <Src logo="nasa.png">NASA · ISS074-E-642367 · Fact: CBS News / AP, Nov 4, 2026</Src>
    </AbsoluteFill>
  );
};

// C5 · SCREEN (generic, unbranded search box): people online ask the bigger question.
const C5: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const q = 'what if el-sayed became president';
  const n = Math.floor(interpolate(f, [8, 70], [0, q.length], clamp));
  const sug = ['what if el-sayed became president — taxes', 'what if el-sayed became president — health care', 'what if el-sayed became president — gas prices'];
  return (
    <AbsoluteFill style={{ background: '#F4F2EE', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 260, top: 300, width: 1400, transform: `scale(${1 + 0.1 * t})`, transformOrigin: '30% 30%' }}>
        <div style={{ background: '#fff', borderRadius: 40, padding: '26px 40px', boxShadow: '0 10px 40px rgba(0,0,0,.12)', fontFamily: F.sans, fontSize: 44, color: '#222', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width={40} height={40} viewBox="0 0 24 24"><circle cx={10} cy={10} r={7} fill="none" stroke="#888" strokeWidth={2.5} /><path d="M15 15l6 6" stroke="#888" strokeWidth={2.5} /></svg>
          <span>{q.slice(0, n)}<span style={{ opacity: Math.floor(f / 8) % 2 ? 0 : 1, color: C.red }}>|</span></span>
        </div>
        {sug.map((s, i) => {
          const o = interpolate(f, [74 + i * 6, 84 + i * 6], [0, 1], clamp);
          return <div key={s} style={{ fontFamily: F.sans, fontSize: 34, color: '#555', padding: '18px 104px', opacity: o, borderBottom: '1px solid #E4E0D8' }}>{s}</div>;
        })}
      </div>
      <div style={{ position: 'absolute', right: 70, bottom: 46, fontFamily: F.mono, fontSize: 16, color: 'rgba(12,13,16,.55)' }}>ILLUSTRATION · generic search box, not a real product</div>
    </AbsoluteFill>
  );
};

// C6 · REAL PHOTO: Senate hearing still, "President?" slams.
const C6: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Push src={A('abdul_el_sayed_testifying_at_committee_hearing_2024.jpg')} from={1.25} to={1.4} origin="50% 30%" filter="grayscale(.6) contrast(1.15) brightness(.55)" />
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Slam text="PRESIDENT?" color={C.red} size={220} at={2} style={{ fontFamily: F.serif, fontStyle: 'italic', letterSpacing: 0 }} />
    </AbsoluteFill>
    <span style={{ position: 'absolute', left: 70, top: 56, fontFamily: F.mono, fontSize: 18, letterSpacing: 3, background: C.red, color: '#fff', padding: '6px 14px' }}>HYPOTHETICAL</span>
    <Src>Photo: U.S. Senate HELP Committee, 2024 (public domain)</Src>
  </AbsoluteFill>
);

// C7 · WORLD: Jake walks to his car; the wallet meter appears.
const C7: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const bob = Math.abs(Math.sin(f / 5)) * 10;
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(1.1) translateX(${-50 * t}px)` }}>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080">
          <Sky horizon={620} /><Skyline base={660} seed={5} />
          <Diner x={-60} base={820} s={1.3} />
          <Street walkY={820} roadY={940} />
          <Lamp x={900} base={830} s={1.1} />
          <Car x={1500} base={1050} s={1.1} color="#6E8FA8" />
          <LightWrap />
        </svg>
        <LiveJake pose="stand" seed="c7" walk face={{ look: 0.7 }} style={{ position: 'absolute', left: 700 + 380 * t, top: 380, height: 640 }} />
      </div>
      <div style={{ position: 'absolute', left: 110, top: 150 }}>
        <div style={{ fontFamily: F.serif, fontSize: 84, color: '#fff', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,.5)', opacity: interpolate(f, [56, 70], [0, 1], clamp) }}>Forget the politics.<br /><i style={{ color: C.amber }}>Do the math.</i></div>
      </div>
      <Wallet at={60} />
      <Illus />
    </AbsoluteFill>
  );
};

// C8 · KINETIC on real photos: Gas. Health care. Paychecks. Taxes. — one word per beat.
const C8_AT = 785; // shot start in the original take; beats are placed on the words, then remapped
const RAW_BEATS: [number, string, string, string][] = [
  [0, 'Gas.', 'gas_pump_indiana_usa.jpg', 'Photo: Wikimedia Commons'],
  [28, 'Health care.', 'real/doc11_x-ray-treatment-at-george-washington.jpg', 'EPA DOCUMERICA · 1973'],
  [56, 'Paychecks.', 'real/doc09_the-young-waitress-at-the-local-aw-snack.jpg', 'EPA DOCUMERICA · 1973'],
  [85, 'Taxes.', 'screens/house_gov.png', 'house.gov'],
];
const BEATS = RAW_BEATS.map(([x, ...r]) => [remap('vo_01', C8_AT + x) - remap('vo_01', C8_AT), ...r] as [number, string, string, string]);
const BEAT_ICONS = [Fuel, HeartPulse, Banknote, Landmark];
const C8: React.FC = () => {
  const f = useCurrentFrame();
  const i = BEATS.filter(([at]) => f >= at).length - 1;
  const [at, word, img, src] = BEATS[Math.max(0, i)];
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Sequence from={at} key={word} layout="none">
        <Push src={A(img)} from={1.12} to={1.22} filter="grayscale(.35) brightness(.5) contrast(1.1)" />
      </Sequence>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div key={word} style={{ transform: useShake(at, 8), textAlign: 'center' }}>
          <Ico I={BEAT_ICONS[Math.max(0, i)]} size={84} color={i === 3 ? C.red : C.amber} at={at} style={{ marginBottom: 10 }} />
          <div style={{ fontFamily: F.serif, fontSize: 210, color: i === 3 ? C.red : C.bone, transform: `scale(${interpolate(f, [at, at + 6], [1.3, 1], clamp)})`, opacity: interpolate(f, [at, at + 3], [0, 1], clamp) }}>{word}</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {BEATS.map(([, w], k) => <div key={w} style={{ width: 120, height: 5, background: k <= i ? (k === 3 ? C.red : C.bone) : 'rgba(236,231,222,.25)' }} />)}
      </div>
      <Src>{src}</Src>
    </AbsoluteFill>
  );
};

// C9 · EVIDENCE: the hidden number — a blurred amber figure behind the pay stub.
const C9: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const blur = interpolate(f, [0, d], [26, 14], clamp);
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ transform: `scale(${1 + 0.1 * t})`, textAlign: 'center' }}>
        <div style={{ fontFamily: F.mono, fontSize: 280, color: C.amber, filter: `blur(${blur}px)`, opacity: 0.85 }}>$??,???</div>
        <Label at={30} color={C.bone} style={{ marginTop: 10 }}>one number · bigger than everything else</Label>
        <Label at={80} color={C.steel} style={{ marginTop: 14, fontSize: 22 }}>not printed on any paycheck</Label>
      </div>
      <div style={{ position: 'absolute', left: 70, top: 56, fontFamily: F.mono, fontSize: 18, letterSpacing: 2, color: C.steel }}>REVEALED AT THE END</div>
    </AbsoluteFill>
  );
};

// C10 · WORLD close: Jake looks at his stub, then at us. Meter stays.
const C10: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.25 + 0.05 * t})` }}><World blur={10} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.35)' }} />
      <LiveJake pose="read" seed="c10" stub="$13.73/hr" beats={[{ at: 40, r: 'doubt' }]} style={{ position: 'absolute', left: 560 - 20 * t, top: 60, height: 1300 }} />
      <Wallet />
      <Illus />
    </AbsoluteFill>
  );
};

// After HOOK v2, vo_01 keeps only "This is Jake … first Muslim senator …" + "So forget the politics …"
// (tools/tighten_vo.py KEEP_RANGES). C5 search, C6 "PRESIDENT?", C8 beats, C9 hidden number and C10
// are no longer used here (kept in the file for reuse).
const COLD: Cut[] = [
  ['jake', 0, 110, C1], ['pump', 110, 214, C2], ['sayed', 214, 352, C3], ['first', 352, 664, C4], ['walk', 664, 785, C7],
];
export const COLD_FRAMES = partFrames('vo_01');
const COLD_CUES: Cue[] = [ // soft only (see SoundLayer)
  [114, 'counter', 0.08], [724, 'tick', 0.06],
];
export const ColdOpen: React.FC = () => <Cuts cuts={COLD} vo="vo_01" musicFrom={HOOK_FRAMES} cues={COLD_CUES} />;

// ======================= WHO IS HE? =======================

const D1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, justifyContent: 'center', paddingLeft: 160 }}>
      <div style={{ fontFamily: F.mono, fontSize: 24, color: '#7A7266', letterSpacing: 3, opacity: interpolate(f, [0, 8], [0, 1], clamp) }}>FILE 00</div>
      <div style={{ fontFamily: F.serif, fontSize: 190, color: C.ink, lineHeight: 1, transform: useShake(2, 10) }}>Who is he?</div>
      <div style={{ width: interpolate(f, [6, 26], [0, 260], { ...clamp, easing: ease }), height: 6, background: C.red, marginTop: 20 }} />
    </AbsoluteFill>
  );
};

const D2: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 70% 40%, #22324A, ${C.ink} 70%)`, overflow: 'hidden' }}>
      <Img src={A('cut_elsayed.png')} style={{ position: 'absolute', right: 200, bottom: 0, height: 980, transform: `scale(${1 + 0.05 * t})`, transformOrigin: '50% 100%', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.6))' }} />
      <div style={{ position: 'absolute', left: 130, top: 390 }}>
        <Label at={4} color={C.steel}>Abdul El-Sayed</Label>
        <div style={{ fontFamily: F.serif, fontSize: 150, color: C.bone, marginTop: 6, opacity: interpolate(f, [10, 20], [0, 1], clamp) }}>A doctor.</div>
      </div>
      <Src>Photo: Conlan Houston · CC BY-SA 4.0 (background removed) · Bridge Michigan</Src>
    </AbsoluteFill>
  );
};

// D3 · REAL FOOTAGE (archive) Detroit's industry + career cards.
const D3: React.FC = () => {
  const f = useCurrentFrame();
  const card = (at: number, top: string, big: string, sub: string) => {
    const o = interpolate(f, [at, at + 12], [0, 1], { ...clamp, easing: ease });
    return (
      <div style={{ background: 'rgba(12,13,16,.86)', padding: '22px 30px', borderLeft: `4px solid ${C.red}`, width: 640, opacity: o, transform: `translateX(${(1 - o) * -30}px)`, marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: F.mono, fontSize: 20, color: C.steel, letterSpacing: 2 }}>{top.startsWith('2018') ? <Vote size={22} color={C.red} strokeWidth={1.8} /> : <HeartPulse size={22} color={C.red} strokeWidth={1.8} />}{top}</div>
        <div style={{ fontFamily: F.serif, fontSize: 54, color: C.bone, lineHeight: 1.1 }}>{big}</div>
        <div style={{ fontFamily: F.sans, fontSize: 22, color: 'rgba(236,231,222,.7)' }}>{sub}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 168], [1.05, 1.15], clamp)})` }}>
        <Video src={A('footage/v08_ford_river_rouge_aerial_1927.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.25) contrast(1.1) brightness(.7)' }} />
      </div>
      <div style={{ position: 'absolute', left: 110, top: 280 }}>
        {card(8, 'DETROIT', 'Ran the health department', 'the city’s top public-health job')}
        {card(70, '2018 · MICHIGAN', 'Ran for governor', 'lost the Democratic primary')}
      </div>
      <Archive>ARCHIVE · DETROIT · 1927</Archive>
      <Src>Footage: National Archives (public domain) · Facts: Bridge Michigan</Src>
    </AbsoluteFill>
  );
};

// D4 · REAL PHOTO: Senate HELP hearing, 2024 (the video file is still missing; the still is public domain).
const D4: React.FC = () => (
  <AbsoluteFill style={{ background: '#08090B' }}>
    <div style={{ position: 'absolute', left: 120, top: 100, width: 1680, height: 880, overflow: 'hidden', borderRadius: 6 }}>
      <Push src={A('abdul_el_sayed_testifying_at_committee_hearing_2024.jpg')} from={1.0} to={1.12} origin="50% 35%" filter="contrast(1.05) saturate(.92)" />
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(0,0,0,.8), transparent 40%)' }} />
      <div style={{ position: 'absolute', left: 50, bottom: 60, color: C.bone }}>
        <div style={{ width: 64, height: 3, background: C.red, marginBottom: 14 }} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 38 }}>Abdul El-Sayed</div>
        <div style={{ fontFamily: F.sans, fontSize: 23, opacity: 0.75 }}>Testifying to the U.S. Senate health (HELP) committee · 2024</div>
      </div>
    </div>
    <Archive>ARCHIVE · U.S. SENATE · 2024</Archive>
    <Src>U.S. Senate HELP Committee (public domain)</Src>
  </AbsoluteFill>
);

// D5 · REAL PEOPLE: the race, split screen.
const D5: React.FC = () => {
  const f = useCurrentFrame();
  const l = interpolate(f, [0, 16], [-120, 0], { ...clamp, easing: ease });
  const r = interpolate(f, [6, 22], [120, 0], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 960, height: 1080, background: 'linear-gradient(160deg, #1B2A44, #0E1524)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 960, height: 1080, background: 'linear-gradient(200deg, #3A1C1A, #1A0F0E)' }} />
      <Img src={A('cut_elsayed.png')} style={{ position: 'absolute', left: 140 + l, bottom: 0, height: 760 }} />
      <Img src={A('cut_rogers.png')} style={{ position: 'absolute', right: 100 - r, bottom: 0, height: 820, filter: 'grayscale(.15)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 360, background: 'linear-gradient(transparent, rgba(12,13,16,.95))' }} />
      <div style={{ position: 'absolute', left: 120, bottom: 110, color: C.bone }}>
        <span style={{ fontFamily: F.mono, fontSize: 17, letterSpacing: 3, background: '#2F5DA8', color: '#fff', padding: '5px 12px' }}>DEMOCRAT · WINNER</span>
        <div style={{ fontFamily: F.serif, fontSize: 72, marginTop: 12 }}>Abdul El-Sayed</div>
      </div>
      <div style={{ position: 'absolute', right: 120, bottom: 110, textAlign: 'right', color: C.bone }}>
        <span style={{ fontFamily: F.mono, fontSize: 17, letterSpacing: 3, background: '#B23A33', color: '#fff', padding: '5px 12px' }}>REPUBLICAN</span>
        <div style={{ fontFamily: F.serif, fontSize: 72, marginTop: 12 }}>Mike Rogers</div>
        <div style={{ fontFamily: F.sans, fontSize: 22, opacity: interpolate(f, [60, 74], [0, 0.75], clamp) }}>former U.S. congressman · former FBI agent</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 20, letterSpacing: 6, color: C.steel }}>MICHIGAN · U.S. SENATE · NOV 3, 2026</div>
      <Src>CBS News / AP · Photos: Conlan Houston (CC BY-SA 4.0), P.J. Siquig (PD)</Src>
    </AbsoluteFill>
  );
};

// D6 · REAL DATA MAP: Michigan, margin bar grows to ≈6 pts.
const D6: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const geo = feature(states as any, (states as any).objects.states) as any;
  const mi = geo.features.find((x: any) => x.properties.name === 'Michigan');
  const path = geoPath();
  const [[x0, y0], [x1, y1]] = path.bounds(mi);
  const k = Math.min(760 / (x1 - x0), 820 / (y1 - y0));
  const bar = interpolate(f, [16, 50], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ background: '#0E1116' }}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(${180 - 20 * t} ${130}) scale(${k * (1 + 0.04 * t)}) translate(${-x0} ${-y0})`}>
          <path d={path(mi) || ''} fill="#2F5DA8" stroke="#fff" strokeWidth={1.2 / k} />
        </g>
      </svg>
      <div style={{ position: 'absolute', right: 140, top: 330, width: 720 }}>
        <Label at={0} color={C.steel}>Michigan · U.S. Senate</Label>
        <div style={{ fontFamily: F.serif, fontSize: 96, color: C.bone, marginTop: 8 }}>≈ 6 points</div>
        <div style={{ height: 22, background: 'rgba(236,231,222,.12)', marginTop: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 22, width: `${53 * bar}%`, background: '#2F5DA8' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, height: 22, width: `${47 * bar}%`, background: '#B23A33' }} />
          <div style={{ position: 'absolute', left: '50%', top: -10, width: 2, height: 42, background: C.bone }} />
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 24, color: 'rgba(236,231,222,.7)', marginTop: 18 }}>with most ballots counted · illustrative bar, not final results</div>
      </div>
      <Src>CBS News / Axios / Bridge Michigan, Nov 4, 2026 · Map: U.S. Census (us-atlas)</Src>
    </AbsoluteFill>
  );
};

// D7 · WORLD: Jake at the diner, a headline card floats in.
const D7: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const o = interpolate(f, [8, 22], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.35 + 0.04 * t}) translate(-120px, -40px)` }}>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080">
          <Sky horizon={600} /><Skyline base={640} />
          <Diner x={700} base={800} s={1.4} />
          <Street walkY={800} roadY={930} />
          <LightWrap />
        </svg>
      </div>
      <LiveJake pose="stand" seed="d7" beats={[{ at: 14, r: 'think' }]} style={{ position: 'absolute', left: 240, top: 260, height: 860 }} />
      <div style={{ position: 'absolute', right: 140, top: 260, width: 700, background: C.paper, padding: '30px 36px', boxShadow: '0 30px 70px rgba(0,0,0,.5)', opacity: o, transform: `translateY(${(1 - o) * 30}px) rotate(-1.5deg)` }}>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: '#7A7266', letterSpacing: 2 }}>HIS PLATFORM</div>
        <div style={{ fontFamily: F.serif, fontSize: 64, color: C.ink, lineHeight: 1.05, marginTop: 6 }}>Easy to say.<br /><i style={{ color: C.red }}>Expensive to do.</i></div>
      </div>
      <Illus />
    </AbsoluteFill>
  );
};

// D8 · EVIDENCE: three platform cards on the beats.
const D8_AT = 760;
const PLANKS: [number, string, string][] = ([[2, 'Medicare for All', 'one public health plan for everyone'], [50, 'A higher minimum wage', 'federal floor is $7.25 today'], [95, 'Higher taxes on the very rich', 'no detailed tax plan published yet']] as [number, string, string][])
  .map(([x, a, b]) => [remap('vo_02', D8_AT + x) - remap('vo_02', D8_AT), a, b]);
const PLANK_ICONS = [HeartPulse, Banknote, Landmark];
const D8: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.graphite, justifyContent: 'center', paddingLeft: 160 }}>
      {PLANKS.map(([at, a, b], i) => {
        const o = interpolate(f, [at, at + 12], [0, 1], { ...clamp, easing: ease });
        return (
          <div key={a} style={{ display: 'flex', alignItems: 'baseline', gap: 36, marginBottom: 46, opacity: o, transform: `translateX(${(1 - o) * 40}px)` }}>
            <div style={{ fontFamily: F.mono, fontSize: 40, color: C.red, display: 'flex', alignItems: 'center', gap: 22 }}>0{i + 1}<Ico I={PLANK_ICONS[i]} size={52} color={C.amber} at={at} /></div>
            <div>
              <div style={{ fontFamily: F.serif, fontSize: 92, color: C.bone, lineHeight: 1 }}>{a}</div>
              <div style={{ fontFamily: F.sans, fontSize: 26, color: 'rgba(236,231,222,.6)', marginTop: 8 }}>{b}</div>
            </div>
          </div>
        );
      })}
      <Src>Michigan Public, Oct 20, 2026 · U.S. Department of Labor</Src>
    </AbsoluteFill>
  );
};

// D9 · REAL SCREEN: house.gov, slow push — reality check.
const D9: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ background: '#fff', overflow: 'hidden' }}>
      <Img src={A('screens/house_gov.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.1 + 0.15 * t})`, transformOrigin: '50% 30%' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.9), rgba(12,13,16,.5) 55%, transparent)' }} />
      <div style={{ position: 'absolute', left: 120, top: 360 }}>
        <Label at={2} color={C.amber}>Reality check</Label>
        <div style={{ fontFamily: F.serif, fontSize: 100, color: C.bone, lineHeight: 1.05, marginTop: 10, opacity: interpolate(f, [12, 24], [0, 1], clamp) }}>A president<br />can’t do it alone.</div>
      </div>
      <Src logo="house.svg" logoDark>house.gov (screenshot, Nov 5, 2026)</Src>
    </AbsoluteFill>
  );
};

// D10 · EVIDENCE diagram: President → Congress → Law.
const D10: React.FC = () => {
  const f = useCurrentFrame();
  const NODE_ICONS = [UserRound, Landmark, ScrollText];
  const node = (i: number, label: string, hot = false) => {
    const o = interpolate(f, [i * 8, i * 8 + 10], [0, 1], { ...clamp, easing: ease });
    const I = NODE_ICONS[i];
    return <div style={{ width: 420, padding: '30px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, border: `3px solid ${hot ? C.red : C.ink}`, background: hot ? C.red : 'transparent', color: hot ? '#fff' : C.ink, fontFamily: F.serif, fontSize: 66, opacity: o, transform: `scale(${0.9 + 0.1 * o})` }}><Ico I={I} plain size={60} color={hot ? '#fff' : C.ink} at={i * 8} />{label}</div>;
  };
  const arrow = (i: number) => <div style={{ fontFamily: F.sans, fontSize: 60, color: '#7A7266', opacity: interpolate(f, [i * 8 + 4, i * 8 + 12], [0, 1], clamp) }}>→</div>;
  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>{node(0, 'President')}{arrow(0)}{node(1, 'Congress', true)}{arrow(1)}{node(2, 'Law')}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, letterSpacing: 5, color: '#7A7266', marginTop: 50, opacity: interpolate(f, [24, 34], [0, 1], clamp) }}>CONGRESS WRITES THE LAWS</div>
    </AbsoluteFill>
  );
};

// D11 · WORLD close-up: Jake raises an eyebrow at camera, wallet meter.
const D11: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.3 + 0.05 * t})` }}><World blur={12} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.3)' }} />
      <LiveJake pose="stand" seed="d11" beats={[{ at: 18, r: 'shrug', hold: 50 }, { at: 18, r: 'doubt' }]} style={{ position: 'absolute', left: 900 + 10 * t, top: 40, height: 1700 }} />
      <div style={{ position: 'absolute', left: 110, top: 420 }}>
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 96, color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,.6)', opacity: interpolate(f, [50, 64], [0, 1], clamp) }}>What changes for Jake?</div>
      </div>
      <Wallet />
      <Illus />
    </AbsoluteFill>
  );
};

const WHO: Cut[] = [
  ['card', 0, 59, D1], ['doctor', 59, 122, D2], ['career', 122, 290, D3], ['hearing', 290, 410, D4],
  ['versus', 410, 545, D5], ['map', 545, 664, D6], ['diner', 664, 760, D7], ['planks', 760, 913, D8],
  ['reality', 913, 1050, D9], ['congress', 1050, 1105, D10], ['jake', 1105, 1245, D11],
];
export const WHO_FRAMES = partFrames('vo_02');
const WHO_CUES: Cue[] = [ // soft only (see SoundLayer)
  [0, 'paper', 0.07], [130, 'tick', 0.06], [192, 'tick', 0.06], [664, 'paper', 0.07],
  [762, 'tick', 0.06], [810, 'tick', 0.06], [855, 'tick', 0.06], [1050, 'tick', 0.05], [1058, 'tick', 0.05], [1066, 'tick', 0.05],
];
export const WhoIsHe: React.FC = () => <Cuts cuts={WHO} vo="vo_02" musicFrom={HOOK_FRAMES + COLD_FRAMES} cues={WHO_CUES} />;
