import React from 'react';
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { KeyRound } from 'lucide-react';
import { GulfMap, Barrel, Pump } from '../ep05/props';
import { Apartment } from '../ep05/Story';
import { FlipCalendar } from '../ep05/parts';
import { LiveJake, type Beat } from '../host/LiveJake';
import type { BodyPose } from '../host/FullBody';
import { B, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { EP_DUR, MUSIC, VO_FILE, paraT, wordT } from './t';

// EP08 v2 · "Your Life After El-Sayed Became President" — cinematic mix: real photos + archival film carry the video,
// drawn Jake lives a few scenes (morning, store, pump, night). Minimal text (one number at a time), a cut every ~2 s,
// DAY 1 time slates, everyday sound effects, warm ambient music.
const W = wordT;
const fr = (s: number) => Math.round(s * 30);
const kk = (f: number, a: number, b: number) => (b <= a ? (f >= a ? 1 : 0) : interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
const eo = (x: number) => 1 - Math.pow(1 - x, 3);
const at = (s: number) => (p: number, w: string, n = 0) => fr(wordT(p, w, n) - s);

const S = 'sayed/';
export const IMG = {
  sayedTalk: S + 'abdul_el_sayed_meet_and_greet_by_conlan_houston_3.jpg',
  sayedFace: S + 'abdul_el_sayed_meet_and_greet_by_conlan_houston_5_cropped.jpg',
  sayedSenate: S + 'abdul_el_sayed_testifying_at_committee_hearing_2024.jpg',
  capitol: S + 'us_capitol_east_side.JPG',
  pump: S + 'racetrac_gas_station_jefferson_parish_louisiana_5_march_2026_1.jpg',
  pump2: S + 'gas_pump_indiana_usa.jpg',
  bank: S + 'chase_bank_branch_miami_50637135308.jpg',
  detroit: S + 'real/nasa_iss074e0334264.jpg',
  xray: S + 'real/doc11_x-ray-treatment-at-george-washington.jpg',
  diner: S + 'real/doc09_the-young-waitress-at-the-local-aw-snack.jpg',
  refinery: S + 'real/doc07_gulf-refinery---from-the-penrose.jpg',
  kff: S + 'screens/kff_ehbs_2025.png',
  eia: S + 'screens/eia_what_we_pay_per_gallon.png',
  usd20: S + 'money/usd20.jpg', usd100: S + 'money/usd100.jpg', usd1: S + 'money/usd1.jpg',
};
export const VID = {
  houseFloor: 'ep04/footage/cap_house_floor.mp4', capDay: 'ep04/footage/day_capitol.mp4', dome: 'ep04/footage/day_dome_close.mp4',
  steps: 'ep04/footage/day_steps.mp4', guards: 'ep04/footage/cap_doors_guards.mp4', supreme: 'ep04/footage/cap_supreme_pediment.mp4',
  article1: 'ep04/footage/pow_article1.mp4', proclamation: 'ep04/footage/pow_proclamation.mp4', taxLedger: 'ep04/footage/pow_tax_ledger.mp4',
  worried: 'ep04/footage/pow_worried.mp4', vault: 'ep04/footage/cap_vault.mp4',
  pumpjack: S + 'footage/v01_pumpjack_1975.mp4', spray: S + 'footage/v03_gasoline_spray_1935.mp4', nozzle: S + 'footage/v04_fuel_nozzle_1935.mp4',
  hearingGas: S + 'footage/v05_house_gas_prices_hearing_2008.mp4', hearingHealth: S + 'footage/v06_house_employer_health_hearing_2009.mp4',
  hearingWage: S + 'footage/v07_house_wage_hearing_2009.mp4', rouge: S + 'footage/v08_ford_river_rouge_aerial_1927.mp4', assembly: S + 'footage/v09_ford_assembly_1927.mp4',
  jars: S + 'footage/v11_income_jars_1948.mp4', ledger: S + 'footage/v12_budget_ledger_1948.mp4', payroll: S + 'footage/v13_payroll_office_1937.mp4',
  sea: 'iran/footage/navy1968_at_sea.mp4',
};
const CR = { conlan: 'Photo: Conlan Houston, CC BY-SA 4.0', senate: 'Photo: U.S. Senate HELP Committee (public domain)', archive: 'Archival film · public domain' };

// ================================ cinematic building blocks ================================
/** every shot: cinematic entrance (zoom-settle + blur clears in 8 frames), letterbox, grade, grain, vignette */
export const Shot: React.FC<{ children: React.ReactNode; grade?: string; credit?: string; dark?: boolean }> = ({ children, grade = 'contrast(1.06) saturate(1.05)', credit }) => {
  const f = useCurrentFrame();
  const k = eo(kk(f, 0, 9));
  const g = random('gr' + Math.floor(f / 2));
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${1.06 - 0.06 * k})`, filter: `blur(${(1 - k) * 7}px) ${grade}` }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)' }} />
      <AbsoluteFill style={{ opacity: 0.07, backgroundImage: `radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)`, backgroundSize: `${3 + g * 2}px ${3 + g * 2}px`, mixBlendMode: 'overlay' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90, background: '#000' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, background: '#000' }} />
      {credit && <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>{credit}</div>}
    </AbsoluteFill>
  );
};
/** real photo with a cinematic camera move (Ken Burns + handheld drift); portrait photos get a blurred fill */
export const Photo: React.FC<{ src: string; z?: [number, number]; x?: [number, number]; y?: [number, number]; pos?: string; fill?: boolean; tone?: 'warm' | 'cold' | 'none'; dur?: number }> = ({ src, z = [1.05, 1.18], x = [0, 0], y = [0, 0], pos = '50% 50%', fill, tone = 'warm', dur = 90 }) => {
  const f = useCurrentFrame();
  const k = eo(kk(f, 0, dur));
  const dx = noise2D('px' + src, f / 80, 0) * 6, dy = noise2D('py' + src, f / 80, 1) * 5;
  const flt = tone === 'warm' ? 'sepia(.12) saturate(1.1) contrast(1.05)' : tone === 'cold' ? 'saturate(.6) contrast(1.1) brightness(.92) hue-rotate(-8deg)' : 'none';
  const tr = `translate(${x[0] + (x[1] - x[0]) * k + dx}px, ${y[0] + (y[1] - y[0]) * k + dy}px) scale(${z[0] + (z[1] - z[0]) * k})`;
  return (
    <AbsoluteFill>
      {fill && <Img src={staticFile(src)} style={{ position: 'absolute', inset: -60, width: 2040, height: 1200, objectFit: 'cover', filter: `blur(40px) brightness(.55) ${flt}` }} />}
      <Img src={staticFile(src)} style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, objectFit: fill ? 'contain' : 'cover', objectPosition: pos, transform: tr, filter: flt }} />
    </AbsoluteFill>
  );
};
/** archival film clip, graded, pushed in */
export const Clip: React.FC<{ src: string; trim?: number; rate?: number; z?: [number, number]; pos?: string; bw?: boolean }> = ({ src, trim = 0, rate = 1, z = [1.04, 1.14], pos = '50% 50%', bw }) => {
  const f = useCurrentFrame();
  const s = z[0] + (z[1] - z[0]) * kk(f, 0, 120);
  return <AbsoluteFill><OffthreadVideo src={staticFile(src)} muted trimBefore={trim} playbackRate={rate} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${s})`, filter: bw ? 'grayscale(1) contrast(1.15)' : 'sepia(.35) contrast(1.1) brightness(.95)' }} /></AbsoluteFill>;
};
/** time slate: DAY 1 · 7:15 AM (lower-left, typewriter + gold line) */
export const Slate: React.FC<{ time: string; day?: string }> = ({ time, day = 'DAY 1' }) => {
  const f = useCurrentFrame();
  const n = Math.floor(kk(f, 2, 2 + time.length * 1.5) * time.length);
  const line = eo(kk(f, 0, 14));
  return (
    <div style={{ position: 'absolute', left: 90, bottom: 150 }}>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 30, letterSpacing: 14, color: B.gold, opacity: kk(f, 0, 6) }}>{day}</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, color: '#FFF8EA', textShadow: '0 6px 30px rgba(0,0,0,.7)', lineHeight: 1 }}>{time.slice(0, n)}</div>
      <div style={{ height: 5, width: 360 * line, background: B.gold, marginTop: 14 }} />
    </div>
  );
};
/** one big number (the only text on most shots) */
export const Num: React.FC<{ from?: number; to: number; a: number; b: number; x?: number; y?: number; size?: number; prefix?: string; suffix?: string; dec?: number; color?: string; sub?: string }> = ({ from = 0, to, a, b, x = 960, y = 540, size = 190, prefix = '$', suffix = '', dec = 0, color = '#FFF8EA', sub }) => {
  const f = useCurrentFrame();
  const v = from + (to - from) * eo(kk(f, a, b));
  const s = 0.85 + 0.15 * eo(kk(f, a - 4, a + 6));
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, textAlign: 'center', opacity: kk(f, a - 4, a + 2) }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: size, color, textShadow: '0 10px 40px rgba(0,0,0,.75)', lineHeight: 1, whiteSpace: 'nowrap' }}>{prefix}{v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })}{suffix}</div>
      {sub && <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 10, color: 'rgba(255,248,234,.85)', marginTop: 12, textShadow: '0 4px 16px rgba(0,0,0,.8)' }}>{sub}</div>}
    </div>
  );
};
/** small caption (2–4 words), lower third */
export const Cap: React.FC<{ t: string; a?: number; x?: number; y?: number; color?: string }> = ({ t, a = 0, x = 90, y = 820, color = '#FFF8EA' }) => {
  const f = useCurrentFrame();
  const k = eo(kk(f, a, a + 8));
  return <div style={{ position: 'absolute', left: x, top: y, fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 6, color, opacity: k, transform: `translateX(${(1 - k) * -30}px)`, textShadow: '0 4px 20px rgba(0,0,0,.85)', textTransform: 'uppercase' }}>{t}</div>;
};
/** rubber stamp slam */
export const Stamp: React.FC<{ t: string; a: number; x?: number; y?: number; color?: string; size?: number; rot?: number }> = ({ t, a, x = 960, y = 540, color = B.red, size = 110, rot = -7 }) => {
  const f = useCurrentFrame();
  if (f < a) return null;
  const k = Math.min(1, (f - a) / 5);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${1.7 - 0.7 * k})`, opacity: k, border: `10px solid ${color}`, color, fontFamily: cond, fontWeight: 800, fontSize: size, letterSpacing: 6, padding: '0 30px', background: 'rgba(250,246,236,.9)', whiteSpace: 'nowrap' }}>{t}</div>;
};
/** real SPECIMEN banknotes falling / stacking */
export const Bills: React.FC<{ a: number; n?: number; note?: 'usd20' | 'usd100' | 'usd1'; x?: number; y?: number; spread?: number }> = ({ a, n = 10, note = 'usd20', x = 960, y = 640, spread = 520 }) => {
  const f = useCurrentFrame();
  return <>{Array.from({ length: n }).map((_, i) => {
    const t = kk(f, a + i * 3, a + i * 3 + 22);
    const ex = x + (random('bx' + i) - 0.5) * spread, ey = y + (random('by' + i) - 0.5) * 120 - i * 6;
    return <Img key={i} src={staticFile(IMG[note])} style={{ position: 'absolute', left: ex - 200, top: -400 + (ey + 400) * eo(t), width: 400, transform: `rotate(${(random('br' + i) - 0.5) * 50 * (1 - t) + (random('bq' + i) - 0.5) * 18}deg)`, opacity: t > 0 ? 1 : 0, boxShadow: '0 12px 30px rgba(0,0,0,.45)', border: '2px solid rgba(0,0,0,.2)' }} />;
  })}</>;
};
export const JakeAt: React.FC<{ x: number; y: number; h?: number; beats?: Beat[]; pose?: BodyPose; walk?: boolean; flip?: boolean; seed: string; stub?: string }> = ({ x, y, h = 700, beats = [], pose = 'stand', walk, flip, seed, stub }) => (
  <LiveJake pose={pose} walk={walk} seed={seed} beats={beats} stub={stub} style={{ position: 'absolute', left: x - h * 0.33, top: y - h, height: h, transform: flip ? 'scaleX(-1)' : undefined }} />
);
export const Illus: React.FC = () => <div style={{ position: 'absolute', left: 90, top: 120, fontFamily: cond, fontWeight: 800, fontSize: 22, letterSpacing: 6, color: 'rgba(255,255,255,.7)', border: '2px solid rgba(255,255,255,.5)', padding: '2px 10px' }}>ILLUSTRATIVE</div>;
export const LightLeak: React.FC<{ a?: number }> = ({ a = 0 }) => {
  const f = useCurrentFrame();
  const o = Math.sin(Math.min(1, Math.max(0, (f - a) / 24)) * Math.PI) * 0.55;
  return <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 15% 30%, rgba(255,190,110,.9), transparent 55%)', opacity: o, mixBlendMode: 'screen' }} />;
};

// ---------- drawn sets for Jake (rich, warm, full frame)
export const Store: React.FC<{ children?: React.ReactNode; pan?: number; tags?: number }> = ({ children, pan = 0, tags = -1 }) => {
  const f = useCurrentFrame();
  const cols = ['#C8553D', '#F2A541', '#3F7CAC', '#5B9A68', '#E7D7C1', '#8E5572', '#F28F3B'];
  return (
    <AbsoluteFill style={{ background: '#E9E2D2', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `translateX(${-pan}px)` }}>
        <div style={{ position: 'absolute', left: -200, width: 2800, top: 0, height: 110, background: '#F7F3EA' }}>{Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 210 + 40, top: 30, width: 150, height: 22, background: '#FFFDF5', boxShadow: '0 0 40px 12px rgba(255,252,235,.9)' }} />)}</div>
        {[0, 1, 2, 3].map((r) => (
          <div key={r} style={{ position: 'absolute', left: -200, width: 2800, top: 170 + r * 170, height: 170 }}>
            {Array.from({ length: 46 }).map((_, i) => {
              const h = 70 + random(`h${r}${i}`) * 70, w = 46 + random(`w${r}${i}`) * 26;
              return <div key={i} style={{ position: 'absolute', left: i * 60, bottom: 14, width: w, height: h, background: cols[Math.floor(random(`c${r}${i}`) * cols.length)], border: '3px solid rgba(27,34,48,.55)', borderRadius: random(`k${r}${i}`) > 0.6 ? '10px 10px 4px 4px' : 4 }}><div style={{ margin: '30% 12%', height: 10, background: 'rgba(255,255,255,.55)' }} /></div>;
            })}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 16, background: '#8C7B65', borderTop: '3px solid #5A4D3D' }} />
            {Array.from({ length: 14 }).map((_, i) => {
              const lit = tags >= 0 && f > tags + i * 2;
              return <div key={i} style={{ position: 'absolute', left: 80 + i * 190, bottom: -26, width: 92, height: 40, background: lit ? '#FFE14D' : '#FFF3B0', border: '3px solid #1B2230', fontFamily: F.mono, fontSize: 22, textAlign: 'center', lineHeight: '34px', color: lit ? B.red : '#1B2230', transform: lit ? 'scale(1.12)' : 'none' }}>{(1.99 + random(`p${r}${i}`) * 6).toFixed(2)}</div>;
            })}
          </div>
        ))}
        <div style={{ position: 'absolute', left: -200, width: 2800, top: 860, bottom: 0, background: 'repeating-linear-gradient(90deg, #D5CDBB 0 120px, #CCC3AF 120px 240px)' }} />
      </AbsoluteFill>
      {children}
    </AbsoluteFill>
  );
};
export const Register: React.FC<{ total: string; a: number; children?: React.ReactNode }> = ({ total, a, children }) => {
  const f = useCurrentFrame();
  const lines = ['MILK          3.89', 'EGGS          4.29', 'BREAD         2.99', 'APPLES        3.49', 'COFFEE        8.99'];
  const n = Math.floor(kk(f, a, a + 50) * lines.length);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EFE8D8, #D9CFBB)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, bottom: 0, background: '#3B3F4A', borderTop: '10px solid #22262E' }} />
      <div style={{ position: 'absolute', left: 1180, top: 300, width: 380, height: 260, background: '#1B2230', border: '10px solid #0B0E14', borderRadius: 14 }}><div style={{ margin: 22, background: '#0E3B2E', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 70, color: '#8FF0B0' }}>{total}</div></div>
      <div style={{ position: 'absolute', left: 1240, top: 560, width: 260, height: 90, background: '#2A2F38' }} />
      <div style={{ position: 'absolute', left: 1290, top: 650, width: 170, background: '#FFFDF6', boxShadow: '0 10px 20px rgba(0,0,0,.3)', padding: '10px 12px', fontFamily: F.mono, fontSize: 17, color: '#333', height: 30 + n * 26, overflow: 'hidden' }}>{lines.slice(0, n).map((l) => <div key={l}>{l}</div>)}</div>
      {children}
    </AbsoluteFill>
  );
};
const PumpCloseup: React.FC<{ v: number; gal: number; stop?: boolean }> = ({ v, gal, stop }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Photo src={IMG.pump} z={[1.35, 1.5]} pos="60% 40%" tone="warm" />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,.35)' }} />
      <div style={{ position: 'absolute', left: 960, top: 520, transform: 'translate(-50%,-50%)', background: '#0B0F18', border: '14px solid #2B313C', borderRadius: 18, padding: '24px 70px', boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-end' }}>
          <div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: '#9AA4B5' }}>SALE</div><div style={{ fontFamily: F.mono, fontSize: 170, color: stop ? '#FFE14D' : '#8FF0B0', textShadow: '0 0 30px currentColor' }}>${v.toFixed(2)}</div></div>
          <div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: '#9AA4B5' }}>GALLONS</div><div style={{ fontFamily: F.mono, fontSize: 90, color: '#8FF0B0' }}>{gal.toFixed(3)}</div></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
const StubDoc: React.FC<{ gone: number; tax?: number }> = ({ gone, tax = -1 }) => {
  const f = useCurrentFrame();
  const tx = tax >= 0 ? eo(kk(f, tax, tax + 10)) : 0;
  const row = (a: string, b: string, st: React.CSSProperties = {}) => <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 46, color: '#2B2B2B', padding: '10px 0', borderBottom: '2px dashed rgba(0,0,0,.15)', ...st }}><span>{a}</span><span>{b}</span></div>;
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, #6B5B4B, #2A221C)' }}>
      <div style={{ position: 'absolute', left: 960, top: 540, width: 1100, transform: `translate(-50%,-50%) rotate(-2deg)`, background: '#FBF8F1', padding: '40px 60px', boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}>
        <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 10, color: '#7A7260' }}>EARNINGS STATEMENT · JAKE</div>
        {row('Gross pay', '$1,850.00')}{row('Federal income tax', '−$162.40')}{row('Social Security & Medicare', '−$141.53')}
        <div style={{ position: 'relative' }}>{row('Health insurance', '−$55.38', { color: B.red, opacity: 1 - gone * 0.6 })}<div style={{ position: 'absolute', left: 0, top: '50%', height: 8, width: `${gone * 100}%`, background: B.red }} /></div>
        {tax >= 0 && <div style={{ opacity: tx, transform: `translateX(${(1 - tx) * 60}px)` }}>{row('New health tax', '?', { color: '#1B4F9C' })}</div>}
      </div>
    </AbsoluteFill>
  );
};
export const Keys: React.FC<{ a: number[]; lit: number[] }> = ({ a, lit }) => {
  const f = useCurrentFrame();
  const L = ['HOUSE', 'SENATE · 60', 'PRESIDENT'];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, #2A2F3A, #0A0C10)' }}>
      {L.map((t, i) => {
        const k = eo(kk(f, a[i], a[i] + 10)); const on = lit[i] >= 0 && f >= lit[i];
        return <div key={t} style={{ position: 'absolute', left: 420 + i * 540, top: 520, transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * k})`, opacity: k, textAlign: 'center' }}><KeyRound size={260} color={on ? B.gold : '#5E6676'} strokeWidth={2} style={{ filter: on ? 'drop-shadow(0 0 40px rgba(232,182,76,.9))' : 'none' }} /><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 8, color: on ? '#FFF1C7' : '#8C94A3' }}>{t}</div></div>;
      })}
    </AbsoluteFill>
  );
};

/** a drawn bill on a desk: title, text lines, a signature that writes itself (no real document implied) */
const BillDoc: React.FC<{ sign?: number; title?: string }> = ({ sign = -1, title = 'AN ACT' }) => {
  const f = useCurrentFrame();
  const k = sign >= 0 ? eo(kk(f, sign, sign + 30)) : 0;
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, #6B4E34, #1E140C)' }}>
      <div style={{ position: 'absolute', left: 960, top: 560, width: 1000, height: 860, transform: `translate(-50%,-50%) rotate(-3deg) scale(${1.04 - 0.04 * kk(f, 0, 90)})`, background: '#FBF7EC', boxShadow: '0 40px 100px rgba(0,0,0,.6)', padding: '60px 80px' }}>
        <div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 64, color: '#1B2230' }}>{title}</div>
        <div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 700, fontSize: 28, letterSpacing: 8, color: '#7A7260', marginBottom: 30 }}>ILLUSTRATIVE · BEST CASE</div>
        {[0.95, 0.88, 0.92, 0.7, 0.9, 0.85, 0.6, 0.93, 0.8].map((w, i) => <div key={i} style={{ height: 14, width: `${w * 100}%`, background: 'rgba(27,34,48,.14)', marginBottom: 22 }} />)}
        <svg width={600} height={160} viewBox="0 0 600 160" style={{ position: 'absolute', right: 80, bottom: 60 }}>
          <line x1={20} y1={130} x2={580} y2={130} stroke="#1B2230" strokeWidth={3} />
          <path d="M40 110 C 80 20, 120 140, 160 70 S 230 40, 250 100 S 320 130, 350 60 C 370 20, 400 120, 440 80 S 520 60, 560 90" fill="none" stroke="#1B3F8C" strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={`${k} 1`} />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// ================================ SHOT LIST (time → scene) ================================
type Fn = (s: number) => React.ReactNode;
const sh: [number, Fn][] = [];
const add = (t: number, fn: Fn) => sh.push([t, fn]);

// P0 — hook
add(0, () => <Shot><Photo src={IMG.detroit} z={[1.25, 1.05]} tone="warm" dur={50} /><LightLeak a={4} /></Shot>);
add(W(0, 'Abdul') - 0.1, () => <Shot credit={CR.conlan}><Photo src={IMG.sayedTalk} z={[1.05, 1.25]} x={[0, -60]} pos="55% 35%" /><Cap t="What if… President El-Sayed" a={8} /></Shot>);
add(W(0, 'everything'), () => <Shot><Photo src={IMG.capitol} z={[1.0, 1.15]} y={[0, -30]} /><LightLeak a={0} /></Shot>);
add(W(0, 'bill') - 0.3, () => <Shot><Clip src={VID.houseFloor} trim={20} /></Shot>);
add(W(0, 'promise') - 0.3, (s) => { const a = at(s); return <Shot><BillDoc /><Stamp t="PASSED" a={a(0, 'lands') - 4} color={B.pine} size={150} /></Shot>; });
add(W(0, 'Jake'), (s) => { const a = at(s); return <Shot><Apartment dawn tv={<AbsoluteFill style={{ background: '#F6B67A' }} />}><JakeAt x={420} y={1060} h={800} seed="v1" pose="cheer" beats={[{ at: a(0, 'wakes'), r: 'smile', hold: 300 }]} /></Apartment><Illus /></Shot>; });
add(W(0, 'Today'), () => <Shot><Photo src={IMG.detroit} z={[1.0, 1.12]} x={[40, -40]} tone="warm" /><Slate time="One dream day" /><LightLeak a={10} /></Shot>);
add(W(0, 'check') - 0.8, (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #3A2E22, #0D0A08)' }} /><Bills a={0} n={9} /><Cap t="…how much is real?" a={a(0, 'real') - 6} x={600} y={200} /></Shot>; });

// P1 — framing
add(paraT(1), () => <Shot credit={CR.senate}><Photo src={IMG.sayedSenate} z={[1.05, 1.2]} x={[30, -30]} pos="55% 40%" /><Cap t="Best-case what-if" a={10} /></Shot>);
add(W(1, 'November'), (s) => { const a = at(s); return <Shot credit={CR.conlan}><Photo src={IMG.sayedFace} fill z={[1.0, 1.08]} /><Cap t="Nov 3 · Elected to the U.S. Senate" a={a(1, 'elected') - 4} /></Shot>; });
add(W(1, 'President'), () => <Shot><Clip src={VID.dome} trim={0} bw /><Cap t="President: years away" a={14} /></Shot>);
add(W(1, 'Everything'), () => <Shot><Photo src={IMG.pump} z={[1.1, 1.3]} tone="warm" /><LightLeak a={0} /><Cap t="The best case" a={6} /></Shot>);
add(W(1, 'numbers'), () => <Shot><Clip src={VID.jars} trim={0} /></Shot>);
add(W(1, 'outcomes'), () => <Shot><Clip src={VID.ledger} trim={10} /><Cap t="Not promises" a={8} /></Shot>);
add(W(1, 'Supporters'), () => <Shot><Clip src={VID.hearingHealth} trim={0} /></Shot>);

// P2 — meet Jake
add(paraT(2), (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 40%, #F7C995, #B46A4A)' }} /><LiveJake pose="stand" seed="cu1" beats={[{ at: 4, r: 'smile', hold: 300 }]} style={{ position: 'absolute', left: 260, top: -260, height: 2500 }} /><Illus /><Cap t="Jake · 26" a={a(2, 'Jake') - 2} x={1250} y={420} /></Shot>; });
add(W(2, 'Single'), (s) => { const a = at(s); return <Shot><Photo src={IMG.pump} z={[1.15, 1.25]} tone="warm" /><AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.5), transparent 60%)' }} /><JakeAt x={460} y={1080} h={900} seed="v2" pose="pump" beats={[{ at: 6, r: 'nod', hold: 30 }]} /><Num to={15} a={a(2, 'fifteen') - 3} b={a(2, 'gallons') + 4} prefix="" suffix=" gal" x={1300} y={420} size={160} /></Shot>; });
add(W(2, 'health'), () => <Shot><Photo src={IMG.kff} z={[1.1, 1.35]} y={[0, -80]} tone="none" /></Shot>);
add(W(2, "Let's"), () => <Shot><Apartment dawn tv={<AbsoluteFill style={{ background: '#F6B67A' }} />}><JakeAt x={420} y={1060} h={800} seed="v3" beats={[{ at: 4, r: 'smile', hold: 300 }]} /></Apartment></Shot>);

// P3 — 7:15 health
add(paraT(3), () => <Shot><Apartment dawn tv={<AbsoluteFill style={{ background: '#F6B67A' }} />}><JakeAt x={420} y={1060} h={800} seed="v4" pose="read" stub="PAY STUB" beats={[{ at: 6, r: 'think', hold: 300 }]} /></Apartment><Slate time="7:15 AM" /></Shot>);
add(W(3, 'The'), (s) => { const a = at(s); return <Shot><StubDoc gone={eo(kk(useCurrentFrame(), a(3, 'gone') - 4, a(3, 'gone') + 10))} /></Shot>; });
add(W(3, 'Medicare'), () => <Shot credit={CR.conlan}><Photo src={IMG.sayedTalk} z={[1.25, 1.4]} pos="60% 30%" /><Cap t="Medicare for All · passed" a={4} color="#FFE9B0" /></Shot>);
add(W(3, 'Right'), (s) => { const a = at(s); return <Shot><Photo src={IMG.kff} z={[1.2, 1.3]} tone="none" /><AbsoluteFill style={{ background: 'rgba(10,8,6,.62)' }} /><Num to={1440} a={a(3, 'fourteen') - 4} b={a(3, 'year') + 6} sub="A SINGLE WORKER'S SHARE · PER YEAR" /></Shot>; });
add(W(3, 'dream') - 0.35, (s) => <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #5A4632, #140E0A)' }} /><Bills a={0} n={12} y={600} /><Num to={1440} a={0} b={1} sub="STAYS IN HIS POCKET" y={250} size={120} color="#BFF2C4" /></Shot>);
add(W(3, 'Fewer'), () => <Shot><AbsoluteFill style={{ background: 'linear-gradient(#E9F1F4, #C9D8DE)' }}><div style={{ position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#B9C7CC' }} />{[200, 760, 1320].map((x0) => <div key={x0} style={{ position: 'absolute', left: x0, top: 300, width: 260, height: 520, background: '#F7FAFB', border: '8px solid #8FA3AB' }}><div style={{ position: 'absolute', top: 30, left: 30, right: 30, height: 60, background: '#4E7A4A', color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 34, textAlign: 'center', lineHeight: '60px' }}>DOCTOR</div></div>)}<JakeAt x={960} y={1040} h={760} seed="v4b" beats={[{ at: 6, r: 'smile', hold: 300 }]} /></AbsoluteFill><Cap t="Fewer bills at the doctor" a={4} color="#1B2230" y={180} x={600} /></Shot>);
add(W(3, 'new') - 0.2, () => <Shot><Clip src={VID.payroll} trim={0} /><Cap t="Same plan, any job" a={6} /></Shot>);
add(W(3, 'enrollment') - 0.6, (s) => { const f = useCurrentFrame(); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #EFE6D3, #B9AA8F)' }}>{Array.from({ length: 9 }).map((_, i) => { const t = kk(f, 6 + i * 2, 26 + i * 2); return <div key={i} style={{ position: 'absolute', left: 760 + (i % 3) * 40 + t * (random('fx' + i) - 0.5) * 2200, top: 300 + i * 12 - t * 700 * random('fy' + i), width: 420, height: 540, background: '#FFFDF7', border: '3px solid #9C8F78', transform: `rotate(${(i - 4) * 3 + t * 200 * (random('fr' + i) - 0.5)}deg)`, boxShadow: '0 10px 30px rgba(0,0,0,.25)' }}><div style={{ margin: 30, fontFamily: cond, fontWeight: 800, fontSize: 30, color: '#7A7260', letterSpacing: 4 }}>ENROLLMENT FORM</div>{[0.9, 0.7, 0.8, 0.6, 0.85].map((w, j) => <div key={j} style={{ margin: '18px 30px', height: 12, width: `${w * 80}%`, background: 'rgba(0,0,0,.12)' }} />)}</div>; })}</AbsoluteFill></Shot>; });
add(W(3, 'walks') - 0.15, (s) => { const f = useCurrentFrame(); const x = 300 + kk(f, 0, 70) * 900; return <Shot><AbsoluteFill style={{ background: 'linear-gradient(#E9F1F4, #C9D8DE)' }}><div style={{ position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#B9C7CC' }} />{[200, 760, 1320].map((x0) => <div key={x0} style={{ position: 'absolute', left: x0, top: 300, width: 260, height: 520, background: '#F7FAFB', border: '8px solid #8FA3AB' }}><div style={{ position: 'absolute', top: 30, left: 30, right: 30, height: 60, background: '#4E7A4A', color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 34, textAlign: 'center', lineHeight: '60px' }}>CLINIC</div></div>)}<JakeAt x={x} y={1040} h={760} seed="v5" walk={f < 70} beats={[{ at: 70, r: 'smile', hold: 300 }]} /></AbsoluteFill><Cap t="One card" a={at(s)(3, 'card') - 4} x={1300} y={200} color="#1B2230" /></Shot>; });

// P4 — reality check one
add(paraT(4), () => <Shot grade="grayscale(.85) contrast(1.15)"><Photo src={IMG.capitol} z={[1.15, 1.05]} tone="cold" /><Stamp t="REALITY CHECK" a={4} color={B.red} size={100} /></Shot>);
add(W(4, 'Outside'), (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #2A2620, #070605)' }} /><Bills a={0} n={14} note="usd100" y={700} spread={900} /><Num from={32} to={34} a={a(4, 'thirty-four') - 2} b={a(4, 'trillion') + 6} suffix="T" sub="OVER 10 YEARS · OUTSIDE STUDIES" y={300} /></Shot>; });
add(W(4, 'Supporters'), () => <Shot><Clip src={VID.hearingHealth} trim={60} /><Cap t="Supporters: replaces what we spend" a={6} /></Shot>);
add(W(4, 'Critics'), () => <Shot><Clip src={VID.taxLedger} trim={0} /><Cap t="Critics: taxes rise a lot" a={6} /></Shot>);
add(W(4, 'And'), () => <Shot><Clip src={VID.steps} trim={0} bw /><Cap t="Congress has to pass it" a={4} /></Shot>);
add(W(4, 'In'), (s) => { const a = at(s); return <Shot><StubDoc gone={1} tax={a(4, 'gain') - 4} /></Shot>; });

// P5 — 8 a.m. peace
add(paraT(5), () => <Shot><Clip src={VID.sea} trim={30} /><Slate time="8:00 AM" /><LightLeak a={0} /></Shot>);
add(W(5, 'war') - 0.1, () => <Shot><GulfMap labels={false} zoom={1.25} at={0} share={0} /><Cap t="The war with Iran: over" a={4} /></Shot>);
add(W(5, 'El-Sayed'), () => <Shot credit={CR.conlan}><Photo src={IMG.sayedFace} fill z={[1.05, 1.15]} /><Cap t="“Illegal war” · his Sept 2026 statement" a={6} /></Shot>);
add(W(5, 'Oil'), (s) => { const a = at(s); return <Shot><Clip src={VID.pumpjack} trim={30} rate={0.6} /><AbsoluteFill style={{ background: 'rgba(0,0,0,.3)' }} /><Num to={20} a={a(5, 'twenty') - 3} b={a(5, 'barrel') + 4} prefix="−$" suffix=" / barrel" size={150} /></Shot>; });
add(W(5, 'Here'), (s) => { const a = at(s); const f = useCurrentFrame(); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #3B3024, #0C0907)' }} /><Barrel x={560} y={860} scale={1.9} tag="$1" at={a(5, 'dollar', 1) - 4} /><div style={{ position: 'absolute', left: 900 + eo(kk(f, a(5, 'gas') - 2, a(5, 'gas') + 14)) * 280, top: 520, width: 80, height: 80, borderRadius: 40, background: B.gold, border: '6px solid #1B2230', opacity: kk(f, a(5, 'gas') - 2, a(5, 'gas')) }} /><Num to={2.4} dec={1} a={a(5, 'two') - 3} b={a(5, 'cents') + 4} prefix="" suffix="¢ / gal" x={1380} y={480} size={150} /></Shot>; });
add(W(5, 'forty-eight') - 1.0, (s) => { const a = at(s); return <Shot><Clip src={VID.spray} trim={20} /><AbsoluteFill style={{ background: 'rgba(0,0,0,.35)' }} /><Num to={48} a={a(5, 'forty-eight') - 4} b={a(5, 'cents', 1) + 4} prefix="" suffix="¢" sub="PER GALLON · $20 A BARREL" size={220} /></Shot>; });
add(W(5, 'driving') - 0.5, (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #4A3A28, #110C08)' }} /><Bills a={0} n={8} y={680} /><Num to={370} a={a(5, 'three') - 4} b={a(5, 'dollars', 2) + 6} sub="A YEAR FOR JAKE · 780 GALLONS" y={280} color="#BFF2C4" /></Shot>; });
add(W(5, 'Picture'), (s) => { const f = useCurrentFrame(); const t = f / 30; return <Shot><PumpCloseup v={Math.min(62.3, t * 4.2)} gal={Math.min(15, t * 1.01)} /></Shot>; });

// P6 — the bigger dream
add(paraT(6), (s) => { const a = at(s); const f = useCurrentFrame(); const p = 4.15 - 1.65 * eo(kk(f, a(6, 'falls') - 2, a(6, 'gallon') + 6)); return <Shot><Photo src={IMG.pump2} z={[1.1, 1.25]} tone="warm" /><AbsoluteFill style={{ background: 'rgba(0,0,0,.35)' }} /><div style={{ position: 'absolute', left: 1300, top: 260, background: '#FFFDF6', border: '10px solid #1B2230', padding: '14px 40px', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,.5)' }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: B.red }}>REGULAR</div><div style={{ fontFamily: F.mono, fontSize: 170, color: '#1B2230', lineHeight: 1 }}>{p.toFixed(2)}</div></div><Cap t="Say gas falls $1.65" a={a(6, 'Say') - 2} /></Shot>; });
add(W(6, "Jake's"), (s) => { const a = at(s); const f = useCurrentFrame(); const v = 62.3 - 24.8 * eo(kk(f, a(6, 'drops') - 4, a(6, 'fifty', 1) + 6)); return <Shot><Photo src={IMG.pump} z={[1.15, 1.25]} tone="warm" /><AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.55), transparent 60%)' }} /><JakeAt x={440} y={1080} h={900} seed="v6" pose="pump" beats={[{ at: a(6, 'thirty-seven') + 2, r: 'cheer', hold: 300 }]} /><Num from={62.3} to={37.5} a={a(6, 'drops') - 4} b={a(6, 'fifty', 1) + 6} dec={2} x={1320} y={460} size={180} sub="JAKE'S TANK · 15 GAL" color={v < 50 ? '#BFF2C4' : '#FFF8EA'} /></Shot>; });
add(W(6, 'Over'), (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #4A3A28, #110C08)' }} /><Bills a={0} n={14} y={680} spread={900} /><Num to={1287} a={a(6, 'twelve') - 4} b={a(6, 'dollars') + 6} sub="A YEAR · 780 GAL × $1.65" y={280} color="#BFF2C4" /></Shot>; });
add(W(6, 'That'), (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #4A3A28, #110C08)' }} /><Bills a={-40} n={14} y={680} spread={900} /><Stamp t="NOT A PROMISE" a={a(6, 'promise') - 4} size={130} /></Shot>; });
add(W(6, "It's"), () => <Shot><Clip src={VID.ledger} trim={40} /><Cap t="Just math on a bigger dream" a={4} /></Shot>);
add(W(6, 'Picture'), (s) => { const f = useCurrentFrame(); const a = at(s); const t = kk(f, 0, a(6, 'fifty', 2) + 4); return <Shot><PumpCloseup v={37.5 * eo(t)} gal={15 * eo(t)} stop={t >= 1} /></Shot>; });
add(W(6, "That's"), () => <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 40%, #F7C995, #B46A4A)' }} /><LiveJake pose="stand" seed="cu2" beats={[{ at: 2, r: 'cheer', hold: 300 }]} style={{ position: 'absolute', left: 260, top: -260, height: 2500 }} /><LightLeak a={0} /></Shot>);

// P7 — reality check two
add(paraT(7), () => <Shot grade="grayscale(.6) contrast(1.1)"><Photo src={IMG.eia} z={[1.1, 1.3]} tone="none" /><Stamp t="REALITY CHECK" a={4} size={90} /></Shot>);
add(W(7, 'world') - 0.2, () => <Shot><GulfMap labels zoom={1.0} at={0} /><Cap t="The world oil market sets it" a={4} /></Shot>);
add(W(7, 'And'), () => <Shot><Photo src={IMG.capitol} z={[1.25, 1.1]} tone="cold" /></Shot>);
add(W(7, 'because'), () => <Shot><Clip src={VID.article1} trim={0} /><Cap t="Congress declares war" a={W(7, 'declare') > 0 ? 10 : 10} /></Shot>);
add(W(7, 'Peace'), () => <Shot><Clip src={VID.nozzle} trim={0} /><Cap t="Peace lowers oil, not the pump" a={8} /></Shot>);

// P8 — noon groceries
add(paraT(8), (s) => { const a = at(s); return <Shot><Register total="$23.65" a={6}><JakeAt x={640} y={1080} h={860} seed="v7" pose="read" stub="RECEIPT" beats={[{ at: a(8, 'twice'), r: 'surprise', hold: 20 }, { at: a(8, 'twice') + 24, r: 'smile', hold: 300 }]} /></Register><Slate time="12:00 PM" /></Shot>; });
add(W(8, 'Big'), () => <Shot><Clip src={VID.rouge} trim={0} /><Cap t="Monopolies broken up" a={4} /></Shot>);
add(W(8, 'Unions'), () => <Shot><Clip src={VID.assembly} trim={0} /><Cap t="Unions stronger, wages higher" a={4} /></Shot>);
add(W(8, 'Be'), (s) => { const f = useCurrentFrame(); const a = at(s); return <Shot><Store pan={kk(f, 0, 150) * 600} tags={a(8, 'tariffs') - 2}><JakeAt x={700 + kk(f, 0, 150) * 200} y={1060} h={800} seed="v8" walk beats={[{ at: 30, r: 'think', hold: 300 }]} /></Store><Cap t="Tariffs · trucks · wages · competition" a={a(8, 'tariffs') - 2} y={160} color="#1B2230" /></Shot>; });
add(W(8, 'push') - 0.7, () => <Shot credit={CR.senate}><Photo src={IMG.sayedSenate} z={[1.25, 1.35]} pos="60% 40%" /><Cap t="A president can push on some" a={6} /></Shot>);
add(W(8, 'In'), (s) => <Shot><Clip src={VID.supreme} trim={0} bw /><Cap t="Feb 2026 · Court strikes emergency tariffs" a={8} /></Shot>);
add(W(8, 'Nothing'), (s) => <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #3A3128, #0D0A08)' }} /><FlipCalendar x={960} y={540} dates={[['FEB', '20'], ['MAY', '1'], ['AUG', '14'], ['NOV', '10']]} from={0} to={40} size={1.2} /></Shot>);

// P9 — 6 p.m. taxes
add(paraT(9), () => <Shot><Photo src={IMG.bank} z={[1.05, 1.2]} tone="warm" /><Slate time="6:00 PM" /><Cap t="Billionaires pay more" a={30} y={250} /></Shot>);
add(W(9, 'The'), () => <Shot><Clip src={VID.payroll} trim={40} /><Cap t="Payroll tax cap lifted" a={4} /></Shot>);
add(W(9, 'Seniors'), () => <Shot><Photo src={IMG.diner} z={[1.1, 1.25]} tone="warm" /><Cap t="No tax on Social Security" a={4} /></Shot>);
add(W(9, "Jake's"), (s) => { const f = useCurrentFrame(); const a = at(s); const op = eo(kk(f, 0, 20)); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #6B5B4B, #2A221C)' }} /><div style={{ position: 'absolute', left: 960, top: 560, width: 1000, transform: `translate(-50%,-50%) rotate(-2deg) translateY(${(1 - op) * 300}px)`, background: '#EAF2E3', border: '4px solid #6B8A62', padding: '40px 60px', boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 8, color: '#4E6B47' }}>MONTHLY BENEFIT · ILLUSTRATIVE</div><div style={{ fontFamily: F.mono, fontSize: 150, color: '#1B2230' }}>$1,650 <span style={{ color: B.pine, fontSize: 90 }}>▲</span></div><div style={{ fontFamily: display, fontSize: 40, color: '#4E6B47', fontStyle: 'italic' }}>Pay to the order of: Jake's grandmother</div></div><Cap t="A little bigger" a={a(9, 'bigger') - 4} y={180} /></Shot>; });
add(W(9, 'Supporters'), () => <Shot><Clip src={VID.hearingWage} trim={0} /><Cap t="Supporters: pays for services" a={4} /></Shot>);
add(W(9, 'Critics'), () => <Shot><Photo src={IMG.refinery} z={[1.1, 1.25]} tone="warm" /><Cap t="Critics: slows investment" a={4} /></Shot>);
add(W(9, 'Either'), () => <Shot><Apartment tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="v9" pose="read" stub="PAYCHECK" beats={[{ at: 10, r: 'nod', hold: 30 }]} /></Apartment></Shot>);
add(W(9, 'rent') - 0.15, () => <Shot><Photo src={IMG.detroit} z={[1.3, 1.45]} x={[0, -80]} tone="warm" /><Cap t="Rent: state & city law" a={10} /></Shot>);

// P10 — the three keys
add(paraT(10), () => <Shot><Clip src={VID.guards} trim={0} bw /></Shot>);
add(W(10, 'Before'), (s) => { const a = at(s); return <Shot><Keys a={[a(10, 'three') - 2, a(10, 'three') + 4, a(10, 'three') + 10]} lit={[-1, -1, -1]} /></Shot>; });
add(W(10, 'House') - 0.15, () => <Shot><Clip src={VID.houseFloor} trim={60} /><Cap t="The House" a={2} /></Shot>);
add(W(10, 'Senate'), () => <Shot><Clip src={VID.capDay} trim={0} bw /><Cap t="The Senate · 60 votes" a={4} /></Shot>);
add(W(10, 'And'), (s) => <Shot><BillDoc sign={at(s)(10, 'signature') - 4} /><Cap t="The president's signature" a={4} /></Shot>);
add(W(10, 'holds') - 0.5, (s) => <Shot><Keys a={[-30, -30, -30]} lit={[-1, -1, 4]} /></Shot>);

// P11 — 9 p.m. the honest total
add(paraT(11), () => <Shot><Apartment tv={<AbsoluteFill style={{ background: '#2B3550' }} />} lamp={1}><JakeAt x={420} y={1060} h={800} seed="v10" beats={[{ at: 10, r: 'think', hold: 300 }]} /></Apartment><Slate time="9:00 PM" /></Shot>);
add(W(11, 'Health'), (s) => { const a = at(s); return <Shot><Photo src={IMG.kff} z={[1.2, 1.3]} tone="none" /><AbsoluteFill style={{ background: 'rgba(0,0,0,.6)' }} /><Num to={1440} a={a(11, 'fourteen') - 4} b={a(11, 'dollars') + 4} sub="HEALTH · IF CONGRESS PASSES IT" color="#BFF2C4" /></Shot>; });
add(W(11, 'Gas'), (s) => { const a = at(s); return <Shot><Photo src={IMG.pump} z={[1.25, 1.35]} tone="warm" /><AbsoluteFill style={{ background: 'rgba(0,0,0,.55)' }} /><Num to={1287} a={a(11, 'twelve') - 4} b={a(11, 'eighty-seven') + 4} sub="GAS · NOBODY PROMISED IT" color="#BFF2C4" /></Shot>; });
add(W(11, 'Add', 1), (s) => { const a = at(s); return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #4A3A28, #110C08)' }} /><Bills a={0} n={16} y={720} spread={1000} /><Num to={2727} a={a(11, 'twenty-seven') - 8} b={a(11, 'year') + 6} sub="THE BEST CASE · PER YEAR" y={300} size={210} color="#BFF2C4" /></Shot>; });
add(W(11, 'But'), (s) => { const a = at(s); return <Shot><Store pan={200} /><AbsoluteFill style={{ background: 'rgba(0,0,0,.25)' }} /><Stamp t="50% OFF?" a={2} color={B.amber} size={150} rot={4} /><Stamp t="NO" a={a(11, 'everything') - 2} color={B.red} size={200} x={1250} y={600} rot={-10} /></Shot>; });
add(W(11, 'About', 1), (s) => { const a = at(s); return <Shot><Apartment tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="v11" beats={[{ at: a(11, 'notice'), r: 'nod', hold: 20 }, { at: a(11, 'quit') - 2, r: 'shrug', hold: 300 }]} /></Apartment><Num to={225} a={a(11, 'twenty-five') - 6} b={a(11, 'month') + 4} sub="A MONTH" x={1300} y={420} size={170} /></Shot>; });

// P12 — 10 p.m., the dream ends
add(paraT(12), (s) => { const a = at(s); const f = useCurrentFrame(); const d = eo(kk(f, a(12, 'light') - 2, a(12, 'light') + 8)); return <Shot><Apartment lamp={1 - d} tvOn={0.5 * (1 - d)} tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="v12" beats={[{ at: 4, r: 'smile', hold: 300 }]} /><AbsoluteFill style={{ background: `rgba(0,0,10,${0.65 * d})` }} /></Apartment><Slate time="10:00 PM" /></Shot>; });
add(W(12, 'No'), () => <Shot><Photo src={IMG.detroit} z={[1.05, 1.15]} tone="cold" /><Cap t="No sirens. No alerts." a={6} /></Shot>);
add(W(12, 'Then'), (s) => { const f = useCurrentFrame(); const a = at(s); const shake = f > a(12, 'alarm') ? Math.sin(f * 2.6) * 6 * Math.exp(-(f - a(12, 'alarm')) / 40) : 0; return <Shot><div style={{ position: 'absolute', inset: 0, transform: `translate(${shake}px, ${-shake}px)` }}><Apartment dawn tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="v13" beats={[{ at: a(12, 'alarm') + 2, r: 'surprise', hold: 300 }]} /></Apartment></div><Slate time="MONDAY · 7:00 AM" day="DAY 2" /></Shot>; });
add(W(12, 'And'), () => <Shot><Clip src={VID.capDay} trim={60} bw /><Cap t="The Senate hasn't voted yet" a={4} /></Shot>);

// P13 — honest size
add(paraT(13), () => <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #4A3A28, #110C08)' }} /><Bills a={0} n={6} y={680} /><Num to={2727} a={0} b={1} sub="REAL · WORTH TALKING ABOUT" y={300} size={170} color="#BFF2C4" /></Shot>);
add(W(13, 'And', 1), () => <Shot><Clip src={VID.houseFloor} trim={120} /><Cap t="Every dollar needs votes" a={4} /></Shot>);
add(W(13, 'Which'), () => <Shot><Clip src={VID.hearingGas} trim={0} /><Cap t="The people who vote on every bill" a={6} /></Shot>);

// P14 — comment question: four real panels
add(paraT(14), (s) => { const a = at(s); const f = useCurrentFrame(); const P: [string, string, string][] = [[IMG.kff, 'HEALTH CARE', 'Health'], [VID.sea, 'PEACE', 'peace'], [IMG.pump, 'GAS', 'gas'], [IMG.diner, 'GROCERIES', 'groceries']]; return <Shot><AbsoluteFill style={{ background: '#000' }}>{P.map(([src, t, w], i) => { const k = eo(kk(f, a(14, w) - 4, a(14, w) + 6)); return <div key={t} style={{ position: 'absolute', left: i * 480, top: 90, width: 476, height: 900, overflow: 'hidden', opacity: 0.35 + 0.65 * k }}>{src.endsWith('.mp4') ? <OffthreadVideo src={staticFile(src)} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.3)' }} /> : <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.1 + 0.1 * k})` }} />}<div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 54, letterSpacing: 6, color: '#FFF8EA', textShadow: '0 4px 20px #000' }}>{t}</div></div>; })}<Cap t="Which first? Tell us below." a={a(14, 'Tell') - 4} x={560} y={140} /></AbsoluteFill></Shot>; });

// P15 — disclaimer · P16 — end card
add(paraT(15), (s) => { const a = at(s); const f = useCurrentFrame(); const L: [string, string][] = [['A hypothetical best case.', 'hypothetical'], ['Public records + simple math.', 'records'], ['Not a prediction. Not a promise.', 'prediction'], ['Not an endorsement.', 'endorsement'], ['Not financial advice.', 'financial']]; return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #1E2430, #07090C)' }}><div style={{ position: 'absolute', left: 300, top: 260 }}>{L.map(([t, w], i) => { const o = kk(f, a(15, w) - 6, a(15, w) + 4); return <div key={i} style={{ fontFamily: display, fontWeight: 800, fontSize: 66, color: '#F3EEE2', opacity: o, marginBottom: 20 }}>{t}</div>; })}</div></AbsoluteFill></Shot>; });
add(paraT(16), () => { const f = useCurrentFrame(); return <Shot><Photo src={IMG.detroit} z={[1.0, 1.08]} tone="warm" /><AbsoluteFill style={{ background: 'rgba(0,0,0,.5)' }} /><div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', opacity: kk(f, 0, 10) }}><Img src={staticFile('brand/logo.png')} style={{ width: 150, height: 150 }} /><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 96, letterSpacing: 16, color: '#FFF8EA' }}>DOLLARLY</div><div style={{ fontFamily: display, fontWeight: 700, fontSize: 52, color: B.gold }}>Your Money. Decoded.</div></div></Shot>; });

// ================================ composition + sound ================================
sh.sort((x, y) => x[0] - y[0]);
const END = EP_DUR;
export const EP08V2_FRAMES = fr(END);
const A = (n: string) => staticFile('ep08/audio/sfx_' + n + '.wav');
const SFX: [number, string, number][] = [
  [W(0, 'promise') + 0.3, 'stamp', 0.18], [W(0, 'wakes'), 'alarm', 0.06], [W(3, 'pay'), 'page', 0.15], [W(3, 'gone'), 'page', 0.15],
  [W(3, 'pocket') - 0.4, 'cash', 0.16], [W(3, 'forms'), 'page', 0.12], [W(3, 'clinic'), 'chime', 0.12], [paraT(4) + 0.15, 'stamp', 0.16],
  [W(4, 'gain'), 'printer', 0.1], [W(5, 'dollars', 2), 'coins', 0.14], [W(5, 'Picture'), 'fuel', 0.12], [W(6, 'tank'), 'pumpbeep', 0.12],
  [W(6, 'twelve'), 'cash', 0.15], [W(6, 'promise') - 0.1, 'stamp', 0.16], [W(6, 'Picture'), 'fuel', 0.14], [W(6, 'fifty', 2), 'pumpbeep', 0.14],
  [paraT(7) + 0.15, 'stamp', 0.14], [paraT(8) + 0.2, 'printer', 0.12], [W(8, 'shorter'), 'ding', 0.14], [W(8, 'tariffs'), 'chime', 0.08],
  [W(8, 'struck'), 'gavel', 0.16], [W(9, 'check'), 'page', 0.15], [W(11, 'twenty-seven'), 'cash', 0.16], [W(11, 'everything') - 0.1, 'stamp', 0.16],
  [W(12, 'light'), 'card', 0.08], [W(12, 'alarm'), 'alarm', 0.12], [W(14, 'Health'), 'whoosh', 0.08],
];
export const EP08V2: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {sh.map(([t, fn], i) => {
      const nx = i < sh.length - 1 ? sh[i + 1][0] : END;
      const C: React.FC = () => <>{fn(t)}</>;
      return <Sequence key={i} from={fr(t)} durationInFrames={Math.max(1, fr(nx - t) + (i < sh.length - 1 ? 4 : 0))} name={`s${i + 1}`}><C /></Sequence>;
    })}
    <Audio src={staticFile(VO_FILE)} volume={1} />
    <Audio src={staticFile(MUSIC)} volume={(f) => 0.13 * Math.min(1, f / 45)} />
    {sh.filter((_, i) => i % 3 === 1).map(([t], i) => <Sequence key={'w' + i} from={Math.max(0, fr(t) - 4)} durationInFrames={20} layout="none"><Audio src={A('whoosh')} volume={0.05} /></Sequence>)}
    {SFX.map(([t, n, v], i) => <Sequence key={'x' + i} from={fr(t)} durationInFrames={110} layout="none"><Audio src={A(n)} volume={v} /></Sequence>)}
  </AbsoluteFill>
);
