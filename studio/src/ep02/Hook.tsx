import React from 'react';
import { AbsoluteFill, Img, Sequence, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Audio, Video } from '@remotion/media';
import { C, F } from '../theme';
import { FilmFinish, clamp, ease, io } from '../ui/Film';
import { FullBody } from '../host/FullBody';
import { Diner, Lamp, LightWrap, Sky, Skyline, Street, Tree } from '../world/World';

// EP02 · HOOK v2 (0:00–0:33). Cut to the real VO take vo_00.mp3 (31.5 s) + a 1.8 s title slam.
// Shot boundaries sit on the pauses in the VO (ffmpeg silencedetect), so every cut lands on a breath.
// Grammar: never two shot types back to back, a new shot every 1–4 s, every factual shot carries its source.

const A = (f: string) => staticFile(`sayed/${f}`);

// Cut list in frames @30fps: [start, end]
export const HOOK = {
  slam: [0, 78],        // "Twenty-seven thousand dollars."
  kff: [78, 180],       // "That's what a typical family's health plan costs every year,"
  stub: [180, 262],     // "and most of it never shows up on a paycheck."
  detroit: [262, 324],  // "On Tuesday, Michigan"
  sayed: [324, 418],    // "elected a senator who wants to replace that entire system."
  pres: [418, 485],     // "So what if he became president?"
  next: [485, 532],     // "In the next eight minutes:"
  gas: [532, 594],      // "gas at four-fifteen a gallon,"
  pay: [594, 692],      // "one paycheck that could jump sixty-eight hundred dollars,"
  jobs: [692, 768],     // "seven hundred thousand jobs on the line,"
  bill: [768, 843],     // "and a thirty-trillion-dollar bill."
  line: [843, 946],     // "And at the end, the one line that decides who pays it."
  title: [946, 1000],   // title slam
} as const;
export const HOOK_FRAMES = 1000;

// ---------- small building blocks ----------
const useDur = () => useVideoConfig().durationInFrames;

// Slow camera move on a still: scale + drift, eased. Every still moves (no dead frames).
const Push: React.FC<{ src: string; from?: number; to?: number; x?: [number, number]; y?: [number, number]; filter?: string; origin?: string }> = ({ src, from = 1.05, to = 1.18, x = [0, 0], y = [0, 0], filter, origin = '50% 50%' }) => {
  const f = useCurrentFrame(); const d = useDur();
  const t = interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Img src={src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transformOrigin: origin, transform: `translate(${x[0] + (x[1] - x[0]) * t}px, ${y[0] + (y[1] - y[0]) * t}px) scale(${from + (to - from) * t})`, filter }} />
    </AbsoluteFill>
  );
};

// Impact shake for number slams (decays in ~10 frames).
const useShake = (at: number, amp = 18) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [at, at + 12], [1, 0], clamp) * (f >= at ? 1 : 0);
  return `translate(${(random(`x${f}`) - 0.5) * amp * k}px, ${(random(`y${f}`) - 0.5) * amp * k}px)`;
};

const Src: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => {
  const f = useCurrentFrame();
  return <div style={{ position: 'absolute', right: 70, bottom: 46, fontFamily: F.mono, fontSize: 17, letterSpacing: 0.3, color: dark ? 'rgba(12,13,16,.65)' : 'rgba(236,231,222,.7)', textShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,.8)', opacity: interpolate(f, [4, 14], [0, 1], clamp) }}>SOURCE · {children}</div>;
};
const Archive: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'absolute', left: 70, top: 56, display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.mono, fontSize: 18, letterSpacing: 2, color: '#fff', background: 'rgba(0,0,0,.55)', padding: '7px 14px' }}>
    <span style={{ width: 12, height: 12, borderRadius: 6, background: C.red }} />{children}
  </div>
);
const Grade: React.FC<{ k?: number }> = ({ k = 0.6 }) => <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,${k}) 100%)` }} />;

// Big number that slams in: overshoot scale + blur-in + shake.
const Slam: React.FC<{ text: string; color: string; size: number; at?: number; style?: React.CSSProperties }> = ({ text, color, size, at = 0, style }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + 6, at + 12], [1.9, 0.96, 1], clamp);
  const o = interpolate(f, [at, at + 3], [0, 1], clamp);
  const b = interpolate(f, [at, at + 6], [16, 0], clamp);
  return <div style={{ fontFamily: F.mono, fontWeight: 500, fontSize: size, color, lineHeight: 1, letterSpacing: -2, transform: `${useShake(at)} scale(${s})`, opacity: o, filter: `blur(${b}px)`, textShadow: '0 10px 40px rgba(0,0,0,.6)', ...style }}>{text}</div>;
};

const Label: React.FC<{ children: React.ReactNode; at?: number; color?: string; style?: React.CSSProperties }> = ({ children, at = 8, color = C.bone, style }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 12], [0, 1], { ...clamp, easing: ease });
  return <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, letterSpacing: 5, textTransform: 'uppercase', color, opacity: t, transform: `translateY(${(1 - t) * 14}px)`, ...style }}>{children}</div>;
};

// ---------- shots ----------

// 1 · BLACK → $26,993 slams in.
const S1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${interpolate(f, [12, 78], [1, 1.06], clamp)})`, textAlign: 'center' }}>
        <Slam text="$26,993" color={C.amber} size={300} at={6} />
        <Label at={30} color={C.steel} style={{ marginTop: 26 }}>a year · one family health plan</Label>
      </div>
    </AbsoluteFill>
  );
};

// 2 · REAL SCREEN: KFF 2025 survey, push into the news-release headline, amber highlighter sweeps.
const S2: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const t = interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });
  const hl = interpolate(f, [22, 50], [0, 1], { ...clamp, easing: ease });
  // screenshot is 1600×1000; headline box ≈ x180–1020, y445–495
  const s = 1.25 + 0.9 * t, cx = 600, cy = 470;
  return (
    <AbsoluteFill style={{ background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 960, top: 540, width: 1600, height: 1000, transform: `translate(${-cx}px, ${-cy}px) scale(${s})`, transformOrigin: `${cx}px ${cy}px` }}>
        <Img src={A('screens/kff_ehbs_2025.png')} style={{ width: 1600, height: 1000 }} />
        <div style={{ position: 'absolute', left: 182, top: 448, height: 46, width: 840 * hl, background: C.amber, opacity: 0.35, mixBlendMode: 'multiply' }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.25), transparent 25%, transparent 75%, rgba(0,0,0,.3))' }} />
      <Src>KFF Employer Health Benefits Survey · Oct 22, 2025</Src>
    </AbsoluteFill>
  );
};

// Pay stub card (HTML, paper). `extra` adds the raise line for shot 9.
const Stub: React.FC<{ mode: 'empty' | 'raise' }> = ({ mode }) => {
  const f = useCurrentFrame();
  const circle = interpolate(f, [26, 48], [0, 1], { ...clamp, easing: ease });
  const row = (a: string, b: string, c?: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 25, color: c ?? '#3A352E', padding: '9px 0', borderBottom: '1px solid #DDD5C6' }}><span>{a}</span><span>{b}</span></div>
  );
  return (
    <div style={{ width: 760, background: C.paper, padding: '34px 42px', boxShadow: '0 40px 90px rgba(0,0,0,.55)', borderRadius: 4, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 30, letterSpacing: 2, color: '#2A2620' }}>SUNRISE DINER</div>
        <div style={{ fontFamily: F.mono, fontSize: 20, color: '#7A7266' }}>PAY STUB · JAKE</div>
      </div>
      <div style={{ height: 3, background: '#2A2620', margin: '14px 0 10px' }} />
      {row('Gross pay (80 h × $13.73)', '$1,098.40')}
      {row('Federal income tax', '−$47.97')}
      {row('Social Security + Medicare', '−$84.03')}
      {row('Health insurance (your share)', '−$55.38')}
      {mode === 'empty' && (
        <div style={{ position: 'relative' }}>
          {row('Employer paid for your plan', '')}
          <svg width={240} height={90} style={{ position: 'absolute', right: -30, top: -20, overflow: 'visible' }}>
            <ellipse cx={120} cy={45} rx={112} ry={34} fill="none" stroke={C.red} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circle} transform="rotate(-3 120 45)" />
          </svg>
          <div style={{ position: 'absolute', right: 22, top: 4, fontFamily: F.serif, fontStyle: 'italic', fontSize: 32, color: C.red, opacity: circle }}>not shown</div>
        </div>
      )}
      {mode === 'raise' && (() => {
        const t = interpolate(f, [10, 22], [0, 1], { ...clamp, easing: ease });
        return (
          <div style={{ marginTop: 18, padding: '14px 18px', background: 'rgba(217,164,65,.16)', borderLeft: `5px solid ${C.amber}`, opacity: t, transform: `translateX(${(1 - t) * 30}px)` }}>
            <div style={{ fontFamily: F.sans, fontSize: 20, letterSpacing: 3, color: '#6B5420' }}>IF A $17 FEDERAL MINIMUM PASSED</div>
            <div style={{ fontFamily: F.mono, fontSize: 30, color: '#2A2620', marginTop: 4 }}>($17 − $13.73) × 2,080 h</div>
          </div>
        );
      })()}
    </div>
  );
};

// Jake's world backdrop (illustrated street at golden hour), slightly defocused for the stub shots.
const World: React.FC<{ blur?: number }> = ({ blur = 0 }) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, filter: blur ? `blur(${blur}px)` : undefined }}>
    <Sky horizon={600} />
    <Skyline base={640} />
    <Diner x={980} base={800} s={1.25} />
    <Tree x={160} base={800} s={1.2} />
    <Lamp x={820} base={800} s={1.2} />
    <Street walkY={800} roadY={930} />
    <LightWrap />
  </svg>
);

// 3 · WORLD: Jake reads his pay stub, the employer line is blank → red circle.
const S3: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const t = interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });
  const blink = f % 70 > 64 ? 1 : 0;
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.08 + 0.05 * t})` }}><World blur={6} /></div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.15), rgba(12,13,16,.55))' }} />
      <FullBody pose="read" stub="$13.73/hr" face={{ look: 0.45, brow: 0.7, smile: 0, blink }} style={{ position: 'absolute', left: 120 - 30 * t, top: 120, height: 1000 }} />
      <div style={{ position: 'absolute', right: 120, top: 210, transform: `rotate(${-2 + 1.5 * t}deg) translateY(${(1 - t) * 20}px)` }}><Stub mode="empty" /></div>
      <Grade k={0.5} />
      <div style={{ position: 'absolute', left: 70, bottom: 46, fontFamily: F.mono, fontSize: 16, color: 'rgba(236,231,222,.6)' }}>ILLUSTRATION · Jake is a composite character built from national averages</div>
    </AbsoluteFill>
  );
};

// 4 · REAL PHOTO: Detroit at night from the ISS, fast push.
const S4: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Push src={A('real/nasa_iss074e0334264.jpg')} from={1.1} to={1.45} x={[0, -60]} y={[0, 40]} origin="55% 70%" filter="contrast(1.15) brightness(1.1)" />
    <Grade k={0.5} />
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.75), transparent 55%)' }} />
    <div style={{ position: 'absolute', left: 110, top: 400 }}>
      <Label at={4} color={C.steel}>Tuesday · Nov 3, 2026</Label>
      <div style={{ fontFamily: F.serif, fontSize: 130, color: C.bone, lineHeight: 1, marginTop: 10, opacity: interpolate(useCurrentFrame(), [24, 34], [0, 1], clamp) }}>Michigan</div>
    </div>
    <Src>NASA · ISS074-E-334264 · Detroit at night</Src>
  </AbsoluteFill>
);

// 5 · REAL PHOTO: El-Sayed meeting voters, push-in + lower third.
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const w = interpolate(f, [10, 26], [0, 1], { ...clamp, easing: ease });
  const o = interpolate(f, [16, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('abdul_el_sayed_meet_and_greet_by_conlan_houston_3.jpg')} from={1.12} to={1.32} x={[30, -40]} origin="62% 40%" filter="saturate(.85) contrast(1.05)" />
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.85), transparent 45%)' }} />
      <div style={{ position: 'absolute', left: 110, bottom: 130, color: C.bone }}>
        <div style={{ width: 70 * w, height: 3, background: C.red, marginBottom: 16 }} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 40, opacity: o }}>Abdul El-Sayed</div>
        <div style={{ fontFamily: F.sans, fontSize: 25, opacity: o * 0.75, marginTop: 6 }}>U.S. Senator-elect (D-MI) · wants Medicare for All</div>
      </div>
      <Src>Photo: Conlan Houston · CC BY-SA 4.0 · Wikimedia Commons</Src>
    </AbsoluteFill>
  );
};

// 6 · KINETIC: "…president?" typed, cursor blinks.
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const full = 'So what if he became president?';
  const n = Math.floor(interpolate(f, [2, 40], [0, full.length], clamp));
  const cur = Math.floor(f / 8) % 2 === 0;
  return (
    <AbsoluteFill style={{ background: C.ink, justifyContent: 'center', paddingLeft: 140 }}>
      <div style={{ fontFamily: F.serif, fontSize: 120, color: C.bone, transform: `scale(${interpolate(f, [0, 67], [1, 1.05], clamp)})`, transformOrigin: 'left center' }}>
        {full.slice(0, n).split(' ').map((w, i, arr) => <span key={i} style={{ color: w.startsWith('president') ? C.red : C.bone, fontStyle: w.startsWith('president') ? 'italic' : 'normal' }}>{w}{i < arr.length - 1 ? ' ' : ''}</span>)}
        <span style={{ display: 'inline-block', width: 6, height: 110, background: C.red, marginLeft: 10, verticalAlign: 'middle', opacity: cur ? 1 : 0 }} />
      </div>
    </AbsoluteFill>
  );
};

// 7 · CARD: the promise — four numbered slots tick on.
const SLOTS = ['GAS', 'PAYCHECK', 'JOBS', 'THE BILL'];
const S7: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 24, letterSpacing: 8, color: '#7A7266' }}>IN THE NEXT</div>
      <div style={{ fontFamily: F.serif, fontSize: 170, color: C.ink, lineHeight: 1, transform: useShake(4, 10) }}>8 minutes</div>
      <div style={{ display: 'flex', gap: 26, marginTop: 40 }}>
        {SLOTS.map((s, i) => {
          const t = interpolate(f, [10 + i * 6, 20 + i * 6], [0, 1], { ...clamp, easing: ease });
          return (
            <div key={s} style={{ width: 250, borderTop: `4px solid ${i === 3 ? C.red : C.ink}`, paddingTop: 12, opacity: t, transform: `translateY(${(1 - t) * 20}px)` }}>
              <div style={{ fontFamily: F.mono, fontSize: 20, color: '#7A7266' }}>FILE 0{i + 1}</div>
              <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: C.ink }}>{s}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 8 · REAL SCREEN: EIA weekly table, punch into the U.S. row, $4.15 slams.
const S8: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const t = interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });
  const cx = 666, cy = 427, s = 2.3 + 0.5 * t; // U.S. row, 11/02/26 column (1600×1000 screenshot)
  return (
    <AbsoluteFill style={{ background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 1320, top: 560, width: 1600, height: 1000, transform: `translate(${-cx}px, ${-cy}px) scale(${s})`, transformOrigin: `${cx}px ${cy}px`, filter: 'blur(0.4px)' }}>
        <Img src={A('screens/eia_gas_diesel_update.png')} style={{ width: 1600, height: 1000 }} />
        <div style={{ position: 'absolute', left: 640, top: 418, width: 52, height: 18, border: `2px solid ${C.red}`, borderRadius: 3, opacity: interpolate(f, [6, 12], [0, 1], clamp) }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.92) 0%, rgba(12,13,16,.75) 38%, transparent 62%)' }} />
      <div style={{ position: 'absolute', left: 110, top: 230 }}>
        <Label at={0} color={C.steel}>U.S. regular gas · per gallon</Label>
        <Slam text="$4.15" color={C.amber} size={230} at={4} style={{ marginTop: 16 }} />
      </div>
      <Src>U.S. EIA · Gasoline & Diesel Fuel Update · Nov 3, 2026</Src>
    </AbsoluteFill>
  );
};

// 9 · WORLD (different angle from shot 3): macro on the stub, +$6,800 stamps on.
const S9: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const t = interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(1.3) translateX(${-40 * t}px)` }}><World blur={14} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.45)' }} />
      <div style={{ position: 'absolute', left: 160, top: 120, transform: `perspective(1600px) rotateX(16deg) rotateZ(-6deg) scale(${1.05 + 0.08 * t})`, transformOrigin: '50% 50%' }}><Stub mode="raise" /></div>
      <div style={{ position: 'absolute', right: 120, top: 360, textAlign: 'right' }}>
        <Slam text="+$6,800" color={C.amber} size={190} at={30} />
        <Label at={42} color={C.bone} style={{ marginTop: 18 }}>a year · if his job survives</Label>
      </div>
      <Grade k={0.5} />
      <Src>CBO · The Budget and Employment Effects of a $17 Minimum Wage · hypothetical math</Src>
    </AbsoluteFill>
  );
};

// 10 · REAL PHOTO (archive): the cook at the Texan Cafe, 1973 → 700,000 jobs.
const S10: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Push src={A('real/doc12_the-cook-at-texan-cafe.jpg')} from={1.15} to={1.3} x={[-20, 30]} origin="30% 45%" filter="saturate(.8) contrast(1.08)" />
    <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.92) 0%, rgba(12,13,16,.6) 45%, transparent 75%)' }} />
    <div style={{ position: 'absolute', right: 120, bottom: 150, textAlign: 'right' }}>
      <Slam text="700,000" color={C.red} size={210} at={3} />
      <Label at={14} style={{ marginTop: 16 }}>jobs on the line · CBO estimate</Label>
    </div>
    <Archive>ARCHIVE · 1973</Archive>
    <Src>EPA DOCUMERICA / National Archives (public domain) · CBO, 2023</Src>
  </AbsoluteFill>
);

// 11 · REAL FOOTAGE (archive, generic Congress shot — never name anyone): $30 TRILLION.
const S11: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 75], [1.08, 1.18], clamp)})` }}>
        <Video src={A('footage/v05_house_gas_prices_hearing_2008.mp4')} muted trimBefore={30} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.7) contrast(1.1) brightness(.75)' }} />
      </div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.45)' }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Slam text="$30 TRILLION" color={C.amber} size={200} at={3} />
        <Label at={14} style={{ marginTop: 20 }}>Medicare for All · 10-year cost estimates</Label>
      </AbsoluteFill>
      <Archive>U.S. HOUSE · 2008 · ARCHIVE</Archive>
      <Src>Estimates: Mercatus Center (2018) · Urban Institute (2019)</Src>
    </AbsoluteFill>
  );
};

// 12 · EVIDENCE: a tax bill with one blank line, red "?" drops in.
const S12: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const t = interpolate(f, [0, d], [0, 1], { ...clamp, easing: io });
  const q = interpolate(f, [30, 40], [0, 1], clamp);
  const lines = ['1  Wages, salaries, tips', '2  Taxable interest', '3  Health premiums paid', '4  New health tax'];
  return (
    <AbsoluteFill style={{ background: '#E8E2D6', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 260, top: 110, width: 1400, transform: `scale(${1 + 0.12 * t}) rotate(${-1.2 + t}deg)`, transformOrigin: '70% 75%', background: C.paper, boxShadow: '0 30px 80px rgba(0,0,0,.25)', padding: '50px 70px' }}>
        <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: '#2A2620' }}>TAX BILL · NOT YET WRITTEN</div>
        <div style={{ height: 3, background: '#2A2620', margin: '16px 0 18px' }} />
        {lines.map((l, i) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: F.mono, fontSize: 34, color: i === 3 ? '#2A2620' : '#8A8275', padding: '22px 0', borderBottom: '2px solid #D8D0C1' }}>
            <span style={{ textDecoration: i === 2 ? `line-through ${C.red}` : 'none' }}>{l}</span>
            <span style={{ width: 360, height: 54, borderBottom: i === 3 ? `4px solid ${C.ink}` : 'none', position: 'relative' }}>
              {i === 3 && <span style={{ position: 'absolute', right: 120, top: -70, fontFamily: F.serif, fontSize: 170, color: C.red, opacity: q, transform: `translateY(${(1 - q) * -60}px) ${useShake(36, 12)}` }}>?</span>}
            </span>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 260, bottom: 90, fontFamily: F.serif, fontStyle: 'italic', fontSize: 64, color: C.ink, opacity: interpolate(f, [50, 64], [0, 1], clamp) }}>Who pays it?</div>
      <div style={{ position: 'absolute', right: 70, bottom: 46, fontFamily: F.mono, fontSize: 16, color: 'rgba(12,13,16,.55)' }}>ILLUSTRATION · not a real tax form</div>
    </AbsoluteFill>
  );
};

// 13 · TITLE SLAM over the real Capitol, honest HYPOTHETICAL tag.
const S13: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 4], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <Push src={A('us_capitol_east_side.JPG')} from={1.15} to={1.22} filter="saturate(.5) brightness(.5) contrast(1.1)" />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.95) 0%, rgba(12,13,16,.7) 50%, rgba(12,13,16,.15) 80%)' }} />
      <Img src={A('cut_elsayed.png')} style={{ position: 'absolute', right: 90, bottom: 0, height: 900, transform: `translateX(${interpolate(f, [0, 54], [40, 0], { ...clamp, easing: ease })}px)`, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.6))' }} />
      <div style={{ position: 'absolute', left: 110, top: 270, width: 1000, opacity: o, transform: useShake(0, 14) }}>
        <span style={{ fontFamily: F.mono, fontSize: 20, letterSpacing: 3, background: C.red, color: '#fff', padding: '6px 14px' }}>HYPOTHETICAL</span>
        <div style={{ fontFamily: F.serif, fontSize: 124, lineHeight: 1.0, color: C.bone, marginTop: 28 }}>If El-Sayed Became President?</div>
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 72, color: C.amber, marginTop: 14, opacity: interpolate(f, [10, 20], [0, 1], clamp) }}>Your wallet, explained.</div>
      </div>
      <Src>Photos: Conlan Houston (CC BY-SA 4.0) · Martin Falbisoner (CC BY-SA 3.0)</Src>
    </AbsoluteFill>
  );
};

// White flash for the rapid number montage (2 frames).
const Flash: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ background: '#fff', opacity: interpolate(f, [0, 3], [0.7, 0], clamp) }} />;
};

const SHOTS: [keyof typeof HOOK, React.FC][] = [
  ['slam', S1], ['kff', S2], ['stub', S3], ['detroit', S4], ['sayed', S5], ['pres', S6], ['next', S7],
  ['gas', S8], ['pay', S9], ['jobs', S10], ['bill', S11], ['line', S12], ['title', S13],
];

export const Hook: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SHOTS.map(([k, Comp]) => (
      <Sequence key={k} from={HOOK[k][0]} durationInFrames={HOOK[k][1] - HOOK[k][0]} name={k}>
        <Comp />
      </Sequence>
    ))}
    {[HOOK.pay[0], HOOK.jobs[0], HOOK.bill[0], HOOK.title[0]].map((at) => (
      <Sequence key={at} from={at} durationInFrames={4}><Flash /></Sequence>
    ))}
    <Audio src={A('vo/vo_00.mp3')} />
    <FilmFinish />
  </AbsoluteFill>
);
