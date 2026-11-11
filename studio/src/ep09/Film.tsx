import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, random, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Car, CreditCard, Home, KeyRound, Landmark, Laptop, Phone, PiggyBank, Receipt, Ship, ShoppingCart, Truck, Warehouse } from 'lucide-react';
import { Apartment } from '../ep05/Story';
import { FlipCalendar } from '../ep05/parts';
import { LiveJake } from '../host/LiveJake';
import { B, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { IMG as I8, VID as V8, Shot, Photo, Clip, Num, Cap, Stamp, Bills, JakeAt, Illus, LightLeak, Store, Register } from '../ep08/Film2';
import { EP_DUR, MUSIC, VO_FILE, paraT, wordT } from './t';

// EP09 · "Trump Can't Run in 2028. Here's What the Next President Inherits" — EP08 v2 cinematic grammar:
// real photos + archival film carry it, drawn paper props for every number, Jake & Dana (illustrative), a cut every ~2 s,
// one number or ≤ 5 words on screen, source credit on real material. Running device: THE INHERITANCE ENVELOPE (JAN 20, 2029).
const W = wordT;
const fr = (s: number) => Math.round(s * 30);
const kk = (f: number, a: number, b: number) => (b <= a ? (f >= a ? 1 : 0) : interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
const eo = (x: number) => 1 - Math.pow(1 - x, 3);
const at = (s: number) => (p: number, w: string, n = 0) => fr(wordT(p, w, n) - s);

const TRUMP = 'ep04/real/trump_official_2025.jpg';
const FT = (n: string) => `ep04/footage/${n}.mp4`;
const V = {
  wh: FT('cap_whitehouse'), fed: FT('cap_fed'), treas: FT('cap_treasury'), treasSteps: FT('cap_treasury_steps'), vault: FT('cap_vault'),
  supreme: FT('cap_supreme_pediment'), house: FT('cap_house_floor'), dome: FT('cap_dome'), wtp: FT('cap_wethepeople'), front: FT('cap_front'),
  guards: FT('cap_doors_guards'), aerial: FT('day_aerial_capitol'), capDay: FT('day_capitol'), steps: FT('day_steps'), domeClose: FT('day_dome_close'),
  borrow: FT('pow_borrow_text'), monetary: FT('pow_monetary'), taxLedger: FT('pow_tax_ledger'), worried: FT('pow_worried'),
  car: 'sayed/footage/v10_car_service_1940.mp4',
};
const CR = { wh: 'Official White House portrait · public domain', arch: 'Archival film · Prelinger Archives · public domain', bls: 'Source: BLS CPI, Oct 2026', fed: 'Source: Federal Reserve, Oct 28 2026', fm: 'Source: Freddie Mac PMMS, Nov 5 2026', tr: 'Source: U.S. Treasury, Nov 9 2026', ssa: 'Source: 2026 Trustees Report (via CRS)', whq: 'White House, Nov 10 2026 (via CNBC)' };

// ================================ EP09 props ================================
const Desk: React.FC<{ children?: React.ReactNode; c?: [string, string] }> = ({ children, c = ['#5E4E3E', '#1E1712'] }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, ${c[0]}, ${c[1]})` }}>
    {Array.from({ length: 60 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: random('dx' + i) * 1920, top: random('dy' + i) * 1080, width: 20 + random('dw' + i) * 40, height: 2, background: '#fff', opacity: 0.04, transform: `rotate(${random('dr' + i) * 180}deg)` }} />)}
    {children}
  </AbsoluteFill>
);
const Paper: React.FC<{ x: number; y: number; w: number; h?: number; rot?: number; k?: number; children?: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ x, y, w, h, rot = -2, k = 1, children, bg = '#FBF8F1', style }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: `translate(-50%,-50%) rotate(${rot}deg) translateY(${(1 - k) * 260}px) scale(${0.92 + 0.08 * k})`, opacity: Math.min(1, k * 2), background: bg, boxShadow: '0 40px 90px rgba(0,0,0,.55)', padding: '36px 56px', ...style }}>{children}</div>
);
const Lbl: React.FC<{ t: string; size?: number; color?: string; ls?: number }> = ({ t, size = 40, color = '#7A7260', ls = 8 }) => <div style={{ fontFamily: cond, fontWeight: 800, fontSize: size, letterSpacing: ls, color }}>{t}</div>;

/** the running device: an envelope "TO: THE NEXT PRESIDENT" that bills slide into */
const ITEMS = ['PRICES', 'TARIFFS', 'RATES', 'DEBT'];
const Envelope: React.FC<{ ins?: number[]; stamp?: number; seal?: number; slide?: number; x?: number; y?: number; scale?: number }> = ({ ins = [], stamp = -1, seal = -1, slide = -1, x = 960, y = 560, scale = 1 }) => {
  const f = useCurrentFrame();
  const sl = slide >= 0 ? eo(kk(f, slide, slide + 24)) : 0;
  const sk = seal >= 0 ? eo(kk(f, seal, seal + 10)) : 0;
  return (
    <div style={{ position: 'absolute', left: x - sl * 1500, top: y, transform: `translate(-50%,-50%) scale(${scale}) rotate(${-3 + sl * -8}deg)` }}>
      {ins.map((a, i) => {
        const t = eo(kk(f, a, a + 14));
        const inside = kk(f, a + 14, a + 24);
        return <div key={i} style={{ position: 'absolute', left: 160 + i * 150, top: -260 + t * 120 + inside * 220, width: 300, height: 190, background: ['#FFFDF6', '#F4E6C8', '#E6EEF5', '#F6E2DC'][i], border: '3px solid #9C8F78', transform: `rotate(${(i - 1.5) * 7}deg)`, opacity: t > 0 ? 1 - inside * 0.9 : 0, boxShadow: '0 10px 24px rgba(0,0,0,.3)', padding: 18 }}><Lbl t={ITEMS[i]} size={40} color="#1B2230" ls={6} />{[0.8, 0.6, 0.7].map((w, j) => <div key={j} style={{ height: 10, width: `${w * 100}%`, background: 'rgba(0,0,0,.14)', marginTop: 14 }} />)}</div>;
      })}
      <div style={{ position: 'relative', width: 1000, height: 600, background: '#E9DCC0', border: '4px solid #B9A57E', boxShadow: '0 50px 110px rgba(0,0,0,.6)' }}>
        <svg width={1000} height={600} style={{ position: 'absolute', inset: 0 }}><path d={`M0 0 L500 ${330 - sk * 330 + 0} L1000 0`} fill="#DCCBA8" stroke="#B9A57E" strokeWidth={4} /><path d="M0 600 L500 300 L1000 600" fill="none" stroke="#C9B48C" strokeWidth={3} /></svg>
        <div style={{ position: 'absolute', left: 70, bottom: 70 }}><Lbl t="TO: THE NEXT PRESIDENT" size={44} color="#5A4D3D" /><Lbl t="1600 PENNSYLVANIA AVE." size={30} color="#7A6A50" ls={6} /></div>
        {stamp >= 0 && <Stamp t="JAN 20, 2029" a={stamp} x={800} y={130} size={64} color={B.red} rot={8} />}
      </div>
    </div>
  );
};
const Scroll22: React.FC<{ ticks: number[]; big: number }> = ({ ticks, big }) => {
  const f = useCurrentFrame();
  const u = eo(kk(f, 0, 16));
  return (
    <Desk c={['#6A5640', '#1B140E']}>
      <div style={{ position: 'absolute', left: 960, top: 540, width: 1100, height: 760 * u, overflow: 'hidden', transform: 'translate(-50%,-50%) rotate(-1.5deg)', background: 'linear-gradient(#F2E6C9, #E6D5AE)', boxShadow: '0 40px 100px rgba(0,0,0,.6)', borderTop: '22px solid #C9B083', borderBottom: '22px solid #C9B083' }}>
        <div style={{ padding: '50px 80px', fontFamily: display, color: '#3A2E1E' }}>
          <div style={{ fontSize: 40, letterSpacing: 6, textAlign: 'center', fontWeight: 700 }}>AMENDMENT XXII · 1951</div>
          <div style={{ fontSize: 44, lineHeight: 1.35, marginTop: 30, fontStyle: 'italic' }}>"No person shall be elected to the office of the President more than twice…"</div>
          <div style={{ display: 'flex', gap: 80, marginTop: 60, justifyContent: 'center' }}>
            {['2016', '2024'].map((y, i) => <div key={y} style={{ display: 'flex', alignItems: 'center', gap: 20 }}><div style={{ width: 90, height: 90, border: '6px solid #3A2E1E', position: 'relative' }}>{f > ticks[i] && <div style={{ position: 'absolute', left: -10, top: -40, fontSize: 130, color: B.red, lineHeight: 1, transform: `scale(${eo(kk(f, ticks[i], ticks[i] + 6))})` }}>✓</div>}</div><div style={{ fontFamily: F.mono, fontSize: 64 }}>{y}</div></div>)}
          </div>
        </div>
      </div>
      <Stamp t="2 TERMS." a={big} x={1380} y={820} size={130} color={B.red} rot={-8} />
      <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>Text: National Archives</div>
    </Desk>
  );
};
const Podiums: React.FC<{ lit?: number[]; q?: number }> = ({ lit = [], q = -1 }) => {
  const f = useCurrentFrame();
  const C = ['#B4452F', '#3F5A8C', '#8B8F99'];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 30%, #2C3442, #07090C)' }}>
      {[0, 1, 2].map((i) => {
        const on = lit[i] !== undefined && f >= lit[i] ? eo(kk(f, lit[i], lit[i] + 8)) : 0;
        const x = 480 + i * 480;
        return <React.Fragment key={i}>
          <div style={{ position: 'absolute', left: x - 260, top: 0, width: 520, height: 1080, background: `linear-gradient(rgba(255,240,200,${0.16 * on}), transparent 75%)`, clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' }} />
          <div style={{ position: 'absolute', left: x - 70, top: 300, width: 140, height: 140, borderRadius: 70, background: '#151922', border: `6px solid ${on ? C[i] : '#2A303B'}` }} />
          <div style={{ position: 'absolute', left: x - 120, top: 430, width: 240, height: 200, borderRadius: '110px 110px 0 0', background: '#151922', border: `6px solid ${on ? C[i] : '#2A303B'}` }} />
          <div style={{ position: 'absolute', left: x - 170, top: 600, width: 340, height: 330, background: `linear-gradient(${on ? C[i] : '#2A303B'}, #10131A)`, border: '6px solid #0B0D12' }} />
          {q >= 0 && <div style={{ position: 'absolute', left: x, top: 360, transform: `translate(-50%,-50%) scale(${eo(kk(f, q + i * 3, q + i * 3 + 8))})`, fontFamily: display, fontWeight: 800, fontSize: 120, color: '#F3EEE2' }}>?</div>}
        </React.Fragment>;
      })}
    </AbsoluteFill>
  );
};
const PaperHouse: React.FC<{ a: number[] }> = ({ a }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#D9E4EA, #EDE6D3 70%)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, bottom: 0, background: '#9DB08A' }} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <polygon points="560,470 960,190 1360,470" fill="#B4452F" stroke="#1B2230" strokeWidth={8} />
        <rect x={620} y={470} width={680} height={400} fill="#F6F1E4" stroke="#1B2230" strokeWidth={8} />
        <rect x={900} y={660} width={120} height={210} fill="#7A5A3A" stroke="#1B2230" strokeWidth={6} />
        <rect x={690} y={560} width={150} height={120} fill="#C9D3CF" stroke="#1B2230" strokeWidth={6} />
        <rect x={1080} y={560} width={150} height={120} fill="#C9D3CF" stroke="#1B2230" strokeWidth={6} />
        {Array.from({ length: 5 }).map((_, i) => { const t = ((f + i * 9) % 40) / 40; return <circle key={i} cx={980 + (i - 2) * 30} cy={330 + t * 260} r={9} fill="#3F7CAC" opacity={kk(f, a[0], a[0] + 4) * (1 - t)} />; })}
      </svg>
      <Stamp t="LEAKY ROOF" a={a[0]} x={520} y={260} size={70} color={B.red} rot={-8} />
      <Stamp t="OVERDUE BILLS" a={a[1]} x={1440} y={300} size={70} color={B.amber} rot={6} />
      <Stamp t="MORTGAGE" a={a[2]} x={1400} y={780} size={80} color={B.ink} rot={-4} />
      <div style={{ position: 'absolute', left: 300, top: 640, width: 16, height: 240, background: '#5A4D3D' }} /><div style={{ position: 'absolute', left: 200, top: 600, width: 230, height: 110, background: '#FFFDF6', border: '6px solid #1B2230', fontFamily: cond, fontWeight: 800, fontSize: 64, textAlign: 'center', lineHeight: '96px', color: B.red }}>SOLD</div>
    </AbsoluteFill>
  );
};
const ReceiptCPI: React.FC<{ a: number }> = ({ a }) => {
  const f = useCurrentFrame();
  const L: [string, string][] = [['ALL ITEMS', '+0.4%'], ['FOOD AT HOME', '+0.4%'], ['SHELTER', '+0.3%'], ['ENERGY', '+0.7%'], ['BEEF', '+0.9%']];
  const n = Math.floor(kk(f, a, a + 60) * L.length + 0.001);
  return (
    <Desk c={['#4A4E58', '#14161B']}>
      <div style={{ position: 'absolute', left: 960, top: 120, width: 760, transform: 'translateX(-50%) rotate(1.5deg)', background: '#FFFDF6', padding: '30px 50px', height: 180 + n * 110, boxShadow: '0 30px 70px rgba(0,0,0,.55)', fontFamily: F.mono, color: '#2B2B2B' }}>
        <div style={{ fontSize: 40, textAlign: 'center', letterSpacing: 4 }}>CONSUMER PRICES</div>
        <div style={{ fontSize: 30, textAlign: 'center', color: '#777', marginBottom: 20 }}>OCTOBER 2026 · ONE MONTH</div>
        {L.slice(0, n).map(([t, v]) => <div key={t} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 56, padding: '18px 0', borderTop: '3px dashed rgba(0,0,0,.18)' }}><span>{t}</span><span style={{ color: B.red }}>{v} ▲</span></div>)}
      </div>
      <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>{CR.bls}</div>
    </Desk>
  );
};
const Stack: React.FC = () => {
  const f = useCurrentFrame();
  const M = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];
  return (
    <Desk c={['#4A4E58', '#14161B']}>
      {M.map((m, i) => { const t = eo(kk(f, 4 + i * 5, 14 + i * 5)); return <div key={m} style={{ position: 'absolute', left: 960 + (random('sx' + i) - 0.5) * 60, top: 900 - i * 72 - (1 - t) * 500, width: 640, height: 66, transform: `translateX(-50%) rotate(${(random('sr' + i) - 0.5) * 6}deg)`, background: '#FFFDF6', border: '2px solid #CFC6B2', opacity: t > 0 ? 1 : 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', fontFamily: F.mono, fontSize: 34, boxShadow: '0 8px 16px rgba(0,0,0,.35)' }}><span>{m}</span><span style={{ color: B.red }}>▲</span></div>; })}
    </Desk>
  );
};
const Door: React.FC<{ n: string; label: string }> = ({ n, label }) => {
  const f = useCurrentFrame();
  const o = eo(kk(f, 10, 34));
  const fly = kk(f, 30, 54);
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, #3A3228, #0A0806)', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${1 + fly * 2.2})`, transformOrigin: '50% 52%' }}>
        <div style={{ position: 'absolute', left: 960 - 270, top: 160, width: 540, height: 820, background: `radial-gradient(ellipse at 50% 60%, rgba(255,236,190,${0.95 * o}), rgba(232,182,76,${0.5 * o}) 60%, #1A140E)`, border: '18px solid #5A4630' }} />
        <div style={{ position: 'absolute', left: 960 - 270, top: 160, width: 540, height: 820, transformOrigin: '0 50%', transform: `perspective(1600px) rotateY(${-o * 78}deg)`, background: 'linear-gradient(90deg, #8C6A44, #6E5236)', border: '6px solid #3A2A18' }}>
          {[60, 460].map((y) => <div key={y} style={{ position: 'absolute', left: 50, right: 50, top: y, height: 300, border: '6px solid rgba(0,0,0,.25)' }} />)}
          <div style={{ position: 'absolute', right: 40, top: 420, width: 30, height: 30, borderRadius: 15, background: B.gold }} />
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', opacity: 1 - fly }}><Lbl t={`DOOR ${n}`} size={44} color={B.gold} ls={18} /><div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, color: '#FFF8EA', textShadow: '0 8px 30px #000' }}>{label}</div></div>
    </AbsoluteFill>
  );
};
const Flow: React.FC<{ a: number[]; tag?: number }> = ({ a, tag = -1 }) => {
  const f = useCurrentFrame();
  const I = [Ship, Landmark, Truck, ShoppingCart]; const T = ['SHIP', 'BORDER', 'TRUCK', 'STORE'];
  const p = tag >= 0 ? eo(kk(f, tag, tag + 20)) : 0;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#C9D3CF, #EDE6D3)' }}>
      <div style={{ position: 'absolute', left: 140, right: 140, top: 560, height: 10, background: '#1B2230', opacity: 0.25 }} />
      {I.map((Ic, i) => { const k = eo(kk(f, a[i], a[i] + 10)); return <div key={i} style={{ position: 'absolute', left: 300 + i * 440, top: 560, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * k})`, opacity: k, textAlign: 'center' }}><div style={{ width: 230, height: 230, borderRadius: 115, background: i === 1 ? B.red : '#FFFDF6', border: '8px solid #1B2230', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic size={130} color={i === 1 ? '#FFF' : '#1B2230'} strokeWidth={2} /></div><Lbl t={T[i]} size={40} color="#1B2230" /></div>; })}
      {tag >= 0 && <div style={{ position: 'absolute', left: 1620, top: 260, background: '#FFE14D', border: '6px solid #1B2230', padding: '10px 30px', fontFamily: F.mono, fontSize: 80, color: B.red, transform: `rotate(-6deg) scale(${0.8 + 0.2 * p})`, opacity: p }}>${(9.99 + p * 1.5).toFixed(2)}</div>}
    </AbsoluteFill>
  );
};
const StruckDoc: React.FC<{ a: number }> = ({ a }) => (
  <Desk c={['#6B4E34', '#1E140C']}>
    <Paper x={960} y={560} w={900} h={760} rot={-3}><div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 60, color: '#1B2230' }}>EMERGENCY TARIFFS</div><Lbl t="IEEPA · 2025" size={30} />{[0.95, 0.85, 0.9, 0.7, 0.92, 0.8, 0.6, 0.88].map((w, i) => <div key={i} style={{ height: 14, width: `${w * 100}%`, background: 'rgba(27,34,48,.14)', marginTop: 26 }} />)}</Paper>
    <Stamp t="STRUCK DOWN" a={a} size={130} color={B.red} rot={-12} />
    <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>U.S. Supreme Court, Feb 20 2026 · 6–3</div>
  </Desk>
);
const Refunds: React.FC<{ shrug: number }> = ({ shrug }) => {
  const f = useCurrentFrame();
  return (
    <Desk c={['#4A3A28', '#110C08']}>
      <div style={{ position: 'absolute', left: 1500, top: 470, transform: 'translate(-50%,-50%)', textAlign: 'center' }}><Warehouse size={300} color="#F3EEE2" strokeWidth={1.6} /><Lbl t="IMPORTERS" size={46} color="#F3EEE2" /></div>
      {Array.from({ length: 10 }).map((_, i) => { const t = kk(f, i * 4, i * 4 + 30); return <Img key={i} src={staticFile(I8.usd20)} style={{ position: 'absolute', left: 300 + t * 1100, top: 300 + Math.sin(t * Math.PI) * -200 + i * 14, width: 240, transform: `rotate(${t * 300 + i * 20}deg)`, opacity: t > 0 && t < 1 ? 1 : 0 }} />; })}
      <JakeAt x={420} y={1060} h={760} seed="r1" beats={[{ at: shrug, r: 'shrug', hold: 300 }]} />
    </Desk>
  );
};
const Quote: React.FC<{ t: string; who: string; a: number }> = ({ t, who, a }) => {
  const f = useCurrentFrame();
  const k = eo(kk(f, a, a + 10));
  return <div style={{ position: 'absolute', left: 960, top: 520, transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * k})`, opacity: k, background: 'rgba(250,246,236,.96)', padding: '40px 70px', borderLeft: `16px solid ${B.red}`, boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}><div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, color: '#1B2230', fontStyle: 'italic' }}>{t}</div><div style={{ fontFamily: F.mono, fontSize: 26, color: '#6B6352', marginTop: 10 }}>{who}</div></div>;
};
const Switches: React.FC<{ a: number[] }> = ({ a }) => {
  const f = useCurrentFrame();
  const L = ['STAY', 'GROW', 'GO'];
  return (
    <Desk c={['#2A303B', '#090B0F']}>
      {L.map((t, i) => { const on = f >= a[i]; const k = eo(kk(f, a[i], a[i] + 6)); return <div key={t} style={{ position: 'absolute', left: 520 + i * 440, top: 520, transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ width: 200, height: 340, borderRadius: 30, background: '#1B1F27', border: '8px solid #3A414E', position: 'relative' }}><div style={{ position: 'absolute', left: 30, width: 124, height: 124, borderRadius: 20, top: on ? 30 + (1 - k) * 150 : 180, background: on ? B.gold : '#5E6676', boxShadow: on ? '0 0 50px rgba(232,182,76,.8)' : 'none' }} /></div><Lbl t={t} size={64} color={on ? '#FFF1C7' : '#6B7383'} /></div>; })}
      <Cap t="The next president decides" a={4} x={560} y={130} />
    </Desk>
  );
};
const Gauge: React.FC<{ a: number; up: number }> = ({ a, up }) => {
  const f = useCurrentFrame();
  const v = 3.875 * eo(kk(f, a, a + 26)); // needle to the middle of 3.75–4
  const ang = -90 + (v / 6) * 180;
  const band = (x: number) => -90 + (x / 6) * 180;
  const arc = (d0: number, d1: number, r: number) => { const p = (d: number) => [960 + r * Math.sin((d * Math.PI) / 180), 760 - r * Math.cos((d * Math.PI) / 180)]; const [x0, y0] = p(d0), [x1, y1] = p(d1); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`; };
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EDE6D3, #DDD0AF)' }}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <path d={arc(-90, 90, 480)} fill="none" stroke="#1B2230" strokeWidth={30} strokeLinecap="round" />
        <path d={arc(band(3.75), band(4), 480)} fill="none" stroke={B.red} strokeWidth={60} />
        {[0, 1, 2, 3, 4, 5, 6].map((x) => { const d = band(x); return <text key={x} x={960 + 400 * Math.sin((d * Math.PI) / 180)} y={770 - 400 * Math.cos((d * Math.PI) / 180)} fontFamily="JetBrains Mono" fontSize={44} textAnchor="middle" fill="#1B2230">{x}%</text>; })}
        <line x1={960} y1={760} x2={960 + 420 * Math.sin((ang * Math.PI) / 180)} y2={760 - 420 * Math.cos((ang * Math.PI) / 180)} stroke="#1B2230" strokeWidth={16} strokeLinecap="round" />
        <circle cx={960} cy={760} r={36} fill="#1B2230" />
      </svg>
      <Num to={3.75} from={0} a={a} b={a + 26} prefix="" suffix="–4%" dec={2} y={900} size={110} color="#1B2230" />
      {[0, 1].map((i) => { const k = eo(kk(f, up + i * 4, up + i * 4 + 8)); return <div key={i} style={{ position: 'absolute', left: 1540 + i * 170, top: 300, transform: `scale(${k})`, textAlign: 'center' }}><div style={{ width: 80, height: 80, borderRadius: 40, background: '#1B2230', margin: '0 auto' }} /><div style={{ width: 120, height: 140, background: '#1B2230', borderRadius: '50px 50px 0 0', margin: '6px auto 0' }} /><div style={{ position: 'absolute', left: -10, top: -110, background: B.red, color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 60, padding: '0 22px' }}>▲</div></div>; })}
      <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(27,34,48,.6)' }}>{CR.fed}</div>
    </AbsoluteFill>
  );
};
const Pipes: React.FC<{ a: number[] }> = ({ a }) => {
  const f = useCurrentFrame();
  const I = [Home, Car, CreditCard]; const T = ['MORTGAGE', 'CAR LOAN', 'CREDIT CARD'];
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EDE6D3, #DDD0AF)' }}>
      <div style={{ position: 'absolute', left: 300, top: 540, transform: 'translate(-50%,-50%)', textAlign: 'center' }}><Landmark size={240} color="#1B2230" strokeWidth={1.8} /><Lbl t="THE FED" size={48} color="#1B2230" /></div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>{I.map((_, i) => { const k = eo(kk(f, a[i] - 6, a[i] + 8)); return <path key={i} d={`M440 540 C 800 540, 900 ${240 + i * 300}, 1300 ${240 + i * 300}`} fill="none" stroke={B.red} strokeWidth={14} pathLength={1} strokeDasharray={`${k} 1`} />; })}</svg>
      {I.map((Ic, i) => { const k = eo(kk(f, a[i], a[i] + 8)); return <div key={i} style={{ position: 'absolute', left: 1460, top: 240 + i * 300, transform: `translate(-50%,-50%) scale(${0.5 + 0.5 * k})`, opacity: k, display: 'flex', alignItems: 'center', gap: 24 }}><div style={{ width: 170, height: 170, borderRadius: 85, background: '#FFFDF6', border: '8px solid #1B2230', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic size={96} color="#1B2230" /></div><Lbl t={T[i]} size={44} color="#1B2230" /></div>; })}
    </AbsoluteFill>
  );
};
const Tag: React.FC<{ v: string; yr: string; a: number; x: number; hot?: boolean }> = ({ v, yr, a, x, hot }) => {
  const f = useCurrentFrame();
  const k = eo(kk(f, a, a + 10));
  return <div style={{ position: 'absolute', left: x, top: 520, transform: `translate(-50%,-50%) rotateY(${(1 - k) * 90}deg) rotate(${hot ? 4 : -4}deg)`, background: hot ? '#FFE14D' : '#FFFDF6', border: '8px solid #1B2230', padding: '30px 60px', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,.5)' }}><Lbl t={yr} size={44} color={hot ? B.red : '#7A7260'} /><div style={{ fontFamily: F.mono, fontSize: 170, color: '#1B2230', lineHeight: 1 }}>{v}</div><Lbl t="30-YEAR MORTGAGE" size={30} color="#7A7260" ls={4} /></div>;
};
const FedChair: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <Desk c={['#3A4560', '#0E121C']}>
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}><rect x={820} y={300} width={280} height={340} rx={30} fill="#5A3E2A" stroke="#1B140E" strokeWidth={8} /><rect x={780} y={620} width={360} height={90} rx={14} fill="#6E4C34" stroke="#1B140E" strokeWidth={8} /><rect x={820} y={710} width={30} height={200} fill="#3A281A" /><rect x={1070} y={710} width={30} height={200} fill="#3A281A" /></svg>
    <div style={{ position: 'absolute', left: 960, top: 450, transform: 'translate(-50%,-50%)' }}><Lbl t="FED" size={80} color={B.gold} ls={14} /></div>
    <Stamp t="NOMINATE · WHITE HOUSE" a={a} x={520} y={250} size={60} color={B.blue} rot={-8} />
    <Stamp t="CONFIRM · SENATE" a={b} x={1420} y={830} size={60} color={B.pine} rot={6} />
  </Desk>
);
const Thermo: React.FC<{ a: number; line: number; zoom?: number }> = ({ a, line, zoom = -1 }) => {
  const f = useCurrentFrame();
  const v = 40.6 * eo(kk(f, a, a + 30));
  const H = 600, top = 170; const y = (x: number) => top + H - (x / 42) * H;
  const z = zoom >= 0 ? eo(kk(f, zoom, zoom + 20)) : 0;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EDE6D3, #DDD0AF)', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${1 + z * 0.9})`, transformOrigin: `760px ${y(40.85)}px` }}>
        <div style={{ position: 'absolute', left: 700, top, width: 120, height: H, borderRadius: 60, background: '#FFFDF6', border: '8px solid #1B2230', overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: (v / 42) * H, background: B.red }} /></div>
        <div style={{ position: 'absolute', left: 660, top: top + H - 30, width: 200, height: 200, borderRadius: 100, background: B.red, border: '8px solid #1B2230' }} />
        {line >= 0 && f >= line && <><div style={{ position: 'absolute', left: 600, top: y(41.1), width: 320 * eo(kk(f, line, line + 10)), height: 6, background: '#1B2230' }} /><div style={{ position: 'absolute', left: 260, top: y(41.1) - 34, fontFamily: F.mono, fontSize: 48, color: '#1B2230' }}>LIMIT $41.1T</div></>}
      </AbsoluteFill>
      <Num to={40.6} a={a} b={a + 30} dec={1} suffix="T" x={1380} y={560} size={170} color="#1B2230" sub="FEDERAL DEBT" />
      {zoom >= 0 && <Cap t="≈ $0.5T of room" a={zoom + 10} x={1160} y={820} color="#1B2230" />}
      <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(27,34,48,.6)' }}>{CR.tr} · limit: 2025 law (via CNBC)</div>
    </AbsoluteFill>
  );
};
const BigCard: React.FC = () => {
  const f = useCurrentFrame();
  const k = eo(kk(f, 0, 14));
  return (
    <Desk c={['#4A3A28', '#110C08']}>
      <div style={{ position: 'absolute', left: 960, top: 540, width: 1000, height: 620, transform: `translate(-50%,-50%) rotate(${-6 + 4 * k}deg) scale(${0.85 + 0.15 * k})`, borderRadius: 40, background: 'linear-gradient(135deg, #2B3D5A, #12192A)', boxShadow: '0 40px 100px rgba(0,0,0,.6)', padding: 60, color: '#F3EEE2' }}>
        <div style={{ width: 150, height: 110, borderRadius: 16, background: 'linear-gradient(#E8B64C, #B88A2A)', marginTop: 40 }} />
        <div style={{ fontFamily: F.mono, fontSize: 64, marginTop: 50, letterSpacing: 8 }}>USA •••• 2026</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}><Lbl t="LIMIT" size={40} color="#AFB8C8" /><div style={{ fontFamily: F.mono, fontSize: 64 }}>$41.1T</div></div>
      </div>
    </Desk>
  );
};
const Timeline: React.FC<{ a: number }> = ({ a }) => {
  const f = useCurrentFrame();
  const k = eo(kk(f, 0, 20));
  const X = (yr: number) => 260 + ((yr - 2029) / 4) * 1400;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EDE6D3, #DDD0AF)' }}>
      <div style={{ position: 'absolute', left: 260, top: 560, width: 1400 * k, height: 70, background: '#3F5A8C', border: '6px solid #1B2230' }} />
      {[2029, 2030, 2031, 2032, 2033].map((y) => <div key={y} style={{ position: 'absolute', left: X(y), top: 660, transform: 'translateX(-50%)', fontFamily: F.mono, fontSize: 48, color: '#1B2230', opacity: k }}>{y}</div>)}
      <div style={{ position: 'absolute', left: 260, top: 470, fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 8, color: '#3F5A8C' }}>THE NEXT TERM</div>
      {f >= a && <div style={{ position: 'absolute', left: X(2032.8), top: 380, transform: `translateX(-50%) translateY(${(1 - eo(kk(f, a, a + 10))) * -200}px)`, textAlign: 'center' }}><div style={{ background: B.red, color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 48, padding: '6px 20px' }}>LATE 2032</div><div style={{ width: 8, height: 180, background: B.red, margin: '0 auto' }} /></div>}
      <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(27,34,48,.6)' }}>{CR.ssa}</div>
    </AbsoluteFill>
  );
};
const Check: React.FC<{ grey?: number; q?: number; label?: string }> = ({ grey = -1, q = -1, label = 'SOCIAL SECURITY · ILLUSTRATIVE' }) => {
  const f = useCurrentFrame();
  const g = grey >= 0 ? eo(kk(f, grey, grey + 20)) : 0;
  const k = eo(kk(f, 0, 14));
  return (
    <Desk c={['#6B5B4B', '#2A221C']}>
      <div style={{ position: 'absolute', left: 960, top: 540, width: 1200, height: 520, transform: `translate(-50%,-50%) rotate(-2deg) translateY(${(1 - k) * 300}px)`, background: '#EAF2E3', border: '4px solid #6B8A62', boxShadow: '0 40px 90px rgba(0,0,0,.6)', padding: '50px 70px', overflow: 'hidden' }}>
        <Lbl t={label} size={36} color="#4E6B47" />
        <div style={{ fontFamily: display, fontSize: 52, color: '#4E6B47', fontStyle: 'italic', marginTop: 30 }}>Pay to the order of: ____________</div>
        <div style={{ height: 16, background: 'rgba(0,0,0,.12)', marginTop: 70, width: '80%' }} /><div style={{ height: 16, background: 'rgba(0,0,0,.12)', marginTop: 30, width: '55%' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: `${g * 25}%`, background: 'repeating-linear-gradient(45deg, rgba(90,90,90,.55) 0 16px, rgba(120,120,120,.45) 16px 32px)' }} />
      </div>
      {q >= 0 && <Stamp t="?" a={q} x={1360} y={420} size={220} color={B.red} rot={10} />}
    </Desk>
  );
};
const Scale: React.FC<{ a: number[] }> = ({ a }) => {
  const f = useCurrentFrame();
  const tilt = Math.sin(f / 18) * 4;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EDE6D3, #DDD0AF)' }}>
      <div style={{ position: 'absolute', left: 950, top: 300, width: 20, height: 560, background: '#1B2230' }} /><div style={{ position: 'absolute', left: 800, top: 840, width: 320, height: 40, background: '#1B2230' }} />
      <div style={{ position: 'absolute', left: 960, top: 300, width: 1100, height: 14, background: '#1B2230', transform: `translate(-50%,-50%) rotate(${tilt}deg)` }}>
        {['RAISE TAXES', 'TRIM BENEFITS'].map((t, i) => { const k = eo(kk(f, a[i], a[i] + 10)); return <div key={t} style={{ position: 'absolute', left: i ? 900 : 0, top: 10, width: 200, transform: `rotate(${-tilt}deg)`, textAlign: 'center' }}><div style={{ width: 4, height: 200, background: '#1B2230', margin: '0 auto' }} /><div style={{ width: 360, marginLeft: -80, background: i ? '#3F5A8C' : B.red, color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 52, padding: '18px 0', opacity: k, transform: `scale(${0.6 + 0.4 * k})` }}>{t}</div></div>; })}
      </div>
    </AbsoluteFill>
  );
};
const KeyRing: React.FC<{ a?: number; lit?: number[]; only?: number }> = ({ a = 0, lit = [], only = -1 }) => {
  const f = useCurrentFrame();
  const L = ['WHITE HOUSE', 'CONGRESS', 'THE FED'];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, #2A2F3A, #0A0C10)' }}>
      {L.map((t, i) => {
        const k = eo(kk(f, a + i * 5, a + i * 5 + 10)); const on = (lit[i] !== undefined && f >= lit[i]) || only === i;
        const off = only >= 0 && only !== i ? 0.25 : 1;
        return <div key={t} style={{ position: 'absolute', left: 420 + i * 540, top: 520, transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * k})`, opacity: k * off, textAlign: 'center' }}><KeyRound size={260} color={on ? B.gold : '#5E6676'} strokeWidth={2} style={{ filter: on ? 'drop-shadow(0 0 40px rgba(232,182,76,.9))' : 'none' }} /><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 8, color: on ? '#FFF1C7' : '#8C94A3' }}>{t}</div></div>;
      })}
    </AbsoluteFill>
  );
};
const Dana: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: 'linear-gradient(#E9D9BF, #CDB892)' }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 700, bottom: 0, background: '#8C6A44', borderTop: '14px solid #5A4630' }} />
    <div style={{ position: 'absolute', left: 1180, top: 160, width: 420, height: 380, background: '#FFFDF6', border: '6px solid #1B2230', boxShadow: '0 20px 40px rgba(0,0,0,.25)' }}><div style={{ background: B.red, color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 50, textAlign: 'center', padding: 10 }}>RETIREMENT</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, padding: 20 }}>{Array.from({ length: 28 }).map((_, i) => <div key={i} style={{ height: 36, background: i === 23 ? B.red : 'rgba(0,0,0,.1)' }} />)}</div></div>
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      <circle cx={600} cy={360} r={95} fill="#E3B496" stroke="#1B2230" strokeWidth={6} />
      <path d="M505 340 C 500 230, 700 220, 698 340 C 690 290, 520 290, 505 340 Z" fill="#B9B4AD" stroke="#1B2230" strokeWidth={6} />
      <circle cx={570} cy={360} r={8} fill="#1B2230" /><circle cx={630} cy={360} r={8} fill="#1B2230" /><path d="M575 405 Q600 418 625 405" stroke="#1B2230" strokeWidth={5} fill="none" />
      <rect x={560} y={330} width={30} height={22} rx={8} fill="none" stroke="#1B2230" strokeWidth={4} /><rect x={612} y={330} width={30} height={22} rx={8} fill="none" stroke="#1B2230" strokeWidth={4} />
      <path d="M470 700 C 470 520, 730 520, 730 700 Z" fill="#7A4E6E" stroke="#1B2230" strokeWidth={6} />
    </svg>
    <div style={{ position: 'absolute', left: 560, top: 760, width: 380, height: 220, background: '#FFFDF6', transform: 'rotate(-6deg)', border: '3px solid #9C8F78', padding: 20 }}><Lbl t="SOCIAL SECURITY" size={30} color="#1B2230" ls={4} />{[0.8, 0.6, 0.7].map((w, j) => <div key={j} style={{ height: 10, width: `${w * 100}%`, background: 'rgba(0,0,0,.14)', marginTop: 20 }} />)}</div>
    <Illus />
    {children}
  </AbsoluteFill>
);
const WallCal: React.FC<{ pins: number[] }> = ({ pins }) => {
  const f = useCurrentFrame();
  const D: [string, string, string][] = [['DEC', '9', 'FED DECIDES'], ['DEC', '11', 'FUNDING ENDS'], ['JAN', '2027', 'NEW CONGRESS'], ['NOV 7', '2028', 'AMERICANS VOTE']];
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#EDE6D3, #D7C9A6)' }}>
      {D.map(([m, d, t], i) => { const k = eo(kk(f, pins[i] - 4, pins[i] + 8)); return <div key={i} style={{ position: 'absolute', left: 300 + i * 440, top: 520, transform: `translate(-50%,-50%) rotate(${(i - 1.5) * 3}deg) scale(${0.85 + 0.15 * k})`, opacity: 0.35 + 0.65 * k, width: 360, background: '#FFFDF6', border: '6px solid #1B2230', boxShadow: '0 20px 40px rgba(0,0,0,.25)', textAlign: 'center' }}><div style={{ background: i === 3 ? B.blue : B.red, color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 52, padding: 10 }}>{m}</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 130, color: '#1B2230', lineHeight: 1.2 }}>{d}</div><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: '#5A4D3D', paddingBottom: 18 }}>{t}</div><div style={{ position: 'absolute', left: 160, top: -24, width: 40, height: 40, borderRadius: 20, background: B.red, border: '4px solid #1B2230', transform: `scale(${k})` }} /></div>; })}
    </AbsoluteFill>
  );
};
const Todo: React.FC<{ hi: number }> = ({ hi }) => {
  const f = useCurrentFrame();
  const I = [Phone, Receipt, Laptop]; const T = ['KNOW YOUR RATE', 'CHECK RECEIPTS', 'SSA STATEMENT'];
  return (
    <Desk c={['#5E4E3E', '#1E1712']}>
      {I.map((Ic, i) => { const k = eo(kk(f, i * 5, i * 5 + 12)); const on = i === hi; return <div key={i} style={{ position: 'absolute', left: 480 + i * 480, top: 540, transform: `translate(-50%,-50%) rotate(${(i - 1) * 6}deg) translateY(${(1 - k) * 300}px) scale(${on ? 1.12 : 0.92})`, width: 380, height: 500, background: on ? '#FFF6D8' : '#E9E2D2', border: `8px solid ${on ? B.gold : '#9C8F78'}`, textAlign: 'center', boxShadow: on ? '0 0 60px rgba(232,182,76,.6)' : '0 20px 40px rgba(0,0,0,.4)', opacity: k }}><div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, color: '#1B2230' }}>{i + 1}</div><Ic size={140} color="#1B2230" /><div style={{ marginTop: 30 }}><Lbl t={T[i]} size={38} color="#1B2230" ls={3} /></div></div>; })}
    </Desk>
  );
};
const LaptopSSA: React.FC = () => (
  <Desk c={['#3A4560', '#0E121C']}>
    <div style={{ position: 'absolute', left: 960, top: 480, width: 1100, height: 660, transform: 'translate(-50%,-50%)', background: '#1B1F27', borderRadius: 30, padding: 30 }}><div style={{ background: '#F6F8FB', height: '100%', borderRadius: 10, padding: 50 }}><div style={{ fontFamily: F.mono, fontSize: 40, color: '#3F5A8C', borderBottom: '3px solid #D5DCE6', paddingBottom: 20 }}>ssa.gov</div><Lbl t="YOUR SOCIAL SECURITY STATEMENT" size={44} color="#1B2230" ls={3} />{[0.9, 0.7, 0.8, 0.5].map((w, j) => <div key={j} style={{ height: 22, width: `${w * 100}%`, background: '#D5DCE6', marginTop: 34 }} />)}</div></div>
    <div style={{ position: 'absolute', left: 960, top: 830, width: 1300, height: 40, transform: 'translateX(-50%)', background: '#2A2F38', borderRadius: '0 0 30px 30px' }} />
  </Desk>
);
const Portrait: React.FC = () => {
  const f = useCurrentFrame();
  const z = 1 + 0.12 * eo(kk(f, 0, 80));
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#E9E0CC, #CDBF9F)' }}>
      <AbsoluteFill style={{ transform: `scale(${z})` }}>
        <div style={{ position: 'absolute', left: 960, top: 520, width: 620, height: 780, transform: 'translate(-50%,-50%) rotate(-1.5deg)', background: '#FFFDF6', padding: 26, border: '16px solid #3A2A18', boxShadow: '0 40px 100px rgba(0,0,0,.45)' }}><Img src={staticFile(TRUMP)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} /></div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(27,34,48,.6)' }}>{CR.wh}</div>
    </AbsoluteFill>
  );
};
const JakeCU: React.FC<{ r?: 'smile' | 'worry' | 'think' | 'nod' | 'doubt'; seed: string; children?: React.ReactNode }> = ({ r = 'smile', seed, children }) => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 40%, #F7C995, #B46A4A)' }}><LiveJake pose="stand" seed={seed} beats={[{ at: 4, r, hold: 400 }]} style={{ position: 'absolute', left: 260, top: -260, height: 2500 }} />{children}</AbsoluteFill>
);
const ForSale: React.FC = () => <AbsoluteFill style={{ background: '#CFE0E8' }}><svg width={1920} height={1080}><polygon points="560,500 960,200 1360,500" fill="#3F5A8C" /><rect x={640} y={500} width={640} height={420} fill="#F6F1E4" /><rect x={900} y={700} width={120} height={220} fill="#7A5A3A" /></svg><div style={{ position: 'absolute', left: 1400, top: 560, background: '#FFFDF6', border: '10px solid #1B2230', padding: '20px 40px', fontFamily: cond, fontWeight: 800, fontSize: 110, color: B.red }}>FOR SALE</div></AbsoluteFill>;

const YearFlip: React.FC<{ ys: string[]; to: number; last?: string }> = ({ ys, to, last }) => {
  const f = useCurrentFrame();
  const t = kk(f, 0, to);
  const i = Math.min(ys.length - 1, Math.floor(eo(t) * (ys.length - 1) + 0.0001));
  const flip = (eo(t) * (ys.length - 1)) % 1;
  const done = i === ys.length - 1;
  return <div style={{ position: 'absolute', left: 960, top: 540, transform: `translate(-50%,-50%) rotate(-3deg) scale(${done ? 1 + 0.05 * eo(kk(f, to, to + 8)) : 1})`, width: 620, background: '#FFFDF6', border: '8px solid #1B2230', boxShadow: '0 30px 70px rgba(0,0,0,.55)', textAlign: 'center' }}><div style={{ background: done ? B.red : '#5A4D3D', color: '#fff', fontFamily: cond, fontWeight: 800, fontSize: 60, padding: 12 }}>{done && last ? last : 'YEAR'}</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 220, color: '#1B2230', lineHeight: 1.15, transform: `rotateX(${done ? 0 : flip * 70}deg)` }}>{ys[i]}</div></div>;
};

// ================================ SHOT LIST (time → scene) ================================
type Fn = (s: number) => React.ReactNode;
const sh: [number, Fn][] = [];
const add = (t: number, fn: Fn) => sh.push([t, fn]);
const dark = (c: [string, string] = ['#2A3442', '#07090C']) => <AbsoluteFill style={{ background: `radial-gradient(ellipse, ${c[0]}, ${c[1]})` }} />;

// P0 — hook
add(0, () => <Shot><Portrait /></Shot>);
add(W(0, 'Constitution') - 0.15, (s) => { const a = at(s); return <Shot><Scroll22 ticks={[a(0, 'two'), a(0, 'two') + 6]} big={a(0, 'Period')} /></Shot>; });
add(W(0, 'whoever'), (s) => <Shot credit={CR.arch}><Clip src={V.aerial} bw /><Cap t="Nov 7, 2028" a={at(s)(0, 'November') - 2} /></Shot>);
add(W(0, 'inherits') - 0.2, (s) => { const a = at(s); return <Shot><Desk><Envelope ins={[a(0, 'prices'), a(0, 'tariffs'), a(0, 'interest')]} /></Desk></Shot>; });
add(W(0, "Here's"), () => <Shot credit={CR.arch}><Clip src={V.wh} /><Cap t="The inheritance" a={8} /><LightLeak a={0} /></Shot>);

// P1 — framing
add(paraT(1), () => <Shot credit={CR.arch}><Clip src={V.capDay} bw /><Cap t="Not a prediction" a={6} /></Shot>);
add(W(1, 'Republican') - 0.2, (s) => { const a = at(s); return <Shot><Podiums lit={[a(1, 'Republican'), a(1, 'Democrat'), a(1, 'someone')]} /></Shot>; });
add(W(1, 'bills') - 0.1, (s) => <Shot>{dark(['#3A2E22', '#0D0A08'])}<Bills a={0} n={10} /><Cap t="Already on the table" a={at(s)(1, 'table') - 4} x={560} y={200} /></Shot>);
add(W(1, 'January') - 0.3, (s) => { const a = at(s); return <Shot><Desk><Envelope ins={[-60, -60, -60]} stamp={a(1, 'twentieth')} /></Desk></Shot>; });

// P2 — presidents inherit
add(paraT(2), (s) => <Shot><Photo src={I8.capitol} z={[1.15, 1.05]} tone="cold" /><Cap t="Credit… or blame" a={at(s)(2, 'credit') - 2} /></Shot>);
add(W(2, 'Think'), (s) => { const a = at(s); return <Shot><PaperHouse a={[a(2, 'leaky'), a(2, 'overdue'), a(2, 'mortgage')]} /></Shot>; });
add(W(2, 'Whoever'), () => <Shot credit={CR.arch}><Clip src={V.wh} trim={60} /><LightLeak a={4} /></Shot>);
add(W(2, 'economy'), () => <Shot credit={CR.arch}><Clip src={V.monetary} /><Cap t="The economy moves slowly" a={6} /></Shot>);
add(W(2, 'decided') - 0.2, () => <Shot credit={CR.arch}><Clip src={V.domeClose} bw /><Cap t="Decided right now" a={4} /></Shot>);
add(W(2, 'courtrooms'), () => <Shot credit={CR.arch}><Clip src={V.supreme} bw /><Cap t="Courts" a={2} /></Shot>);
add(W(2, 'Congress'), () => <Shot credit={CR.arch}><Clip src={V.house} /><Cap t="Congress" a={2} /></Shot>);
add(W(2, 'Federal'), () => <Shot credit={CR.arch}><Clip src={V.fed} /><Cap t="The Fed" a={2} /></Shot>);

// P3 — the receipt
add(paraT(3), () => <Shot><Apartment tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="a1" pose="read" stub="RECEIPT" beats={[{ at: 10, r: 'think', hold: 300 }]} /></Apartment><Illus /></Shot>);
add(W(3, 'inflation') - 0.4, (s) => <Shot><ReceiptCPI a={at(s)(3, 'Prices') - 2} /></Shot>);
add(W(3, 'four') - 0.3, (s) => { const a = at(s); return <Shot>{dark(['#3A3128', '#0D0A08'])}<Num to={0.4} dec={1} a={a(3, 'four') - 2} b={a(3, 'percent') + 4} prefix="+" suffix="%" sub="IN ONE MONTH · OCTOBER" size={240} /><div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>{CR.bls}</div></Shot>; });
add(W(3, 'Groceries') - 0.1, (s) => { const f = useCurrentFrame(); return <Shot><Store pan={kk(f, 0, 60) * 300} tags={2} /><Cap t="Groceries ▲" a={2} color="#1B2230" y={160} /></Shot>; });
add(W(3, 'Rent') - 0.05, () => <Shot><Apartment lamp={1} tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="a2" beats={[{ at: 2, r: 'worry', hold: 300 }]} /></Apartment><Cap t="Rent ▲" a={2} x={1200} y={200} /></Shot>);
add(W(3, 'Beef') - 0.05, (s) => { const a = at(s); return <Shot><Photo src={I8.diner} z={[1.15, 1.25]} tone="warm" /><AbsoluteFill style={{ background: 'rgba(0,0,0,.5)' }} /><Num to={0.9} dec={1} a={a(3, 'almost') - 2} b={a(3, 'percent', 1) + 4} prefix="+" suffix="%" sub="BEEF · ONE MONTH" size={200} /></Shot>; });
add(W(3, 'stacks') - 0.2, () => <Shot><Stack /></Shot>);
add(W(3, 'Fed'), () => <Shot credit={CR.arch}><Clip src={V.fed} trim={40} /><Cap t="The Fed is watching" a={4} /></Shot>);

// P4 — door 1: tariffs
add(paraT(4), () => <Shot><Door n="1" label="TARIFFS" /></Shot>);
add(W(4, 'tariff', 1) - 0.2, (s) => { const a = at(s); return <Shot><Flow a={[a(4, 'imports') - 4, a(4, 'border') - 2, a(4, 'company') - 2, a(4, 'goods') - 2]} /></Shot>; });
add(W(4, 'Some') - 0.1, (s) => { const a = at(s); return <Shot><Register total="$?" a={0}><Stamp t="ABSORBED" a={a(4, 'absorbed') - 2} x={520} y={300} size={90} color={B.pine} rot={-8} /><Stamp t="PASSED ON" a={a(4, 'passed') - 2} x={620} y={560} size={100} color={B.red} rot={5} /></Register></Shot>; });
add(W(4, 'debated') - 0.3, () => <Shot>{dark()}<Stamp t="DEBATED" a={2} size={150} color={B.amber} rot={-4} /></Shot>);
add(W(4, 'Think'), (s) => { const f = useCurrentFrame(); return <Shot><Store pan={200 + kk(f, 0, 70) * 400} tags={4} /><Cap t="Coffee · phones · parts · toys" a={2} color="#1B2230" y={160} /></Shot>; });
add(W(4, 'Things'), (s) => <Shot><Flow a={[-20, -20, -20, -20]} tag={4} /></Shot>);
add(W(4, 'February') - 0.1, () => <Shot credit={CR.arch}><Clip src={V.supreme} trim={30} bw /><Cap t="Feb 2026 · Supreme Court" a={4} /></Shot>);
add(W(4, 'ruled'), (s) => <Shot><StruckDoc a={at(s)(4, 'biggest') - 2} /></Shot>);
add(W(4, 'Refunds') - 0.1, (s) => <Shot><Refunds shrug={at(s)(4, 'not', 1)} /><Cap t="Refunds → importers" a={4} x={1150} y={200} /></Shot>);
add(W(4, 'other') - 0.1, () => <Shot><Register total="$$$" a={0} /><Cap t="Other tariffs: still on" a={4} y={160} color="#1B2230" /></Shot>);
add(W(4, 'White') - 0.2, (s) => <Shot credit={CR.whq}><Clip src={V.wh} trim={90} /><AbsoluteFill style={{ background: 'rgba(0,0,0,.35)' }} /><Quote t="“just getting started”" who="White House · Nov 10, 2026" a={at(s)(4, 'just') - 4} /></Shot>);
add(W(4, 'Supporters'), () => <Shot credit={CR.arch}><Clip src={V8.assembly} /><Cap t="Supporters: factories come home" a={4} /></Shot>);
add(W(4, 'Critics'), (s) => { const f = useCurrentFrame(); return <Shot><Store pan={kk(f, 0, 60) * 300} tags={0} /><Cap t="Critics: shoppers pay" a={2} color="#1B2230" y={160} /></Shot>; });
add(W(4, 'Either'), (s) => { const a = at(s); return <Shot><Switches a={[a(4, 'stay'), a(4, 'grow'), a(4, 'go', 1)]} /></Shot>; });

// P5 — door 2: rates
add(paraT(5), () => <Shot><Door n="2" label="RATES" /></Shot>);
add(W(5, 'Federal') - 0.1, () => <Shot credit={CR.arch}><Clip src={V.fed} trim={80} /></Shot>);
add(W(5, 'between') - 0.3, (s) => { const a = at(s); return <Shot><Gauge a={a(5, 'three') - 2} up={a(5, 'Two', 1) - 2} /></Shot>; });
add(W(5, 'next') - 0.1, (s) => <Shot>{dark(['#3A3128', '#0D0A08'])}<FlipCalendar x={960} y={540} dates={[['OCT', '28'], ['NOV', '11'], ['DEC', '9']]} from={0} to={at(s)(5, 'ninth')} size={1.2} /></Shot>);
add(W(5, 'flows') - 0.2, (s) => { const a = at(s); return <Shot><Pipes a={[a(5, 'mortgage'), a(5, 'car'), a(5, 'credit')]} /></Shot>; });
add(W(5, 'Right') - 0.1, (s) => { const a = at(s); return <Shot><Desk><Tag v="7.2%" yr="NOW · 2026" a={a(5, 'seven') - 2} x={1300} hot /><Tag v="6.2%" yr="A YEAR AGO" a={a(5, 'six') - 2} x={620} /></Desk><div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>{CR.fm}</div></Shot>; });
add(W(5, 'hundred') - 0.7, (s) => { const a = at(s); return <Shot><Apartment tv={<ForSale />}><JakeAt x={420} y={1060} h={800} seed="a3" beats={[{ at: a(5, 'ninety'), r: 'surprise', hold: 20 }, { at: a(5, 'ninety') + 22, r: 'worry', hold: 300 }]} /></Apartment><Num to={190} a={a(5, 'hundred', 1) - 4} b={a(5, 'dollars') + 4} prefix="+$" sub="A MONTH · $300K LOAN" x={1350} y={300} size={150} /><Illus /></Shot>; });
add(W(5, 'Car', 2) - 0.1, () => <Shot credit={CR.arch}><Clip src={V.car} /><Cap t="Car loans · cards" a={4} /></Shot>);
add(W(5, 'borrowing') - 0.2, () => <Shot credit={CR.arch}><Clip src={V.borrow} /><Cap t="Borrowing stays expensive" a={6} /></Shot>);
add(W(5, 'upside') - 0.2, () => { const f = useCurrentFrame(); return <Shot>{dark(['#2E4A3A', '#08100C'])}<div style={{ position: 'absolute', left: 960, top: 500, transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * eo(kk(f, 0, 12))})`, filter: 'drop-shadow(0 0 60px rgba(191,242,196,.7))' }}><PiggyBank size={420} color="#BFF2C4" strokeWidth={1.6} /></div><Cap t="Savings can pay more" a={8} x={620} y={820} /></Shot>; });
add(W(5, 'president') - 0.2, () => <Shot credit={CR.arch}><Clip src={V.wh} trim={30} bw /><Cap t="Doesn't set the rate" a={6} /></Shot>);
add(W(5, 'nominates') - 0.2, (s) => { const a = at(s); return <Shot><FedChair a={a(5, 'nominates')} b={a(5, 'confirms')} /></Shot>; });
add(W(5, 'choice'), () => <Shot credit={CR.arch}><Clip src={V.dome} /><Cap t="Lasts for years" a={4} /></Shot>);

// P6 — door 3: debt
add(paraT(6), () => <Shot><Door n="3" label="THE DEBT" /></Shot>);
add(W(6, 'federal') - 0.1, () => <Shot credit={CR.arch}><Clip src={V.treasSteps} /></Shot>);
add(W(6, 'forty') - 0.3, (s) => { const a = at(s); return <Shot><Thermo a={a(6, 'forty') - 2} line={a(6, 'limit')} zoom={a(6, 'half') - 4} /></Shot>; });
add(W(6, 'Think') - 0.1, () => <Shot><BigCard /></Shot>);
add(W(6, 'spending') - 0.2, () => <Shot credit={CR.arch}><Clip src={V8.ledger} trim={20} /><Cap t="Already approved" a={6} /></Shot>);
add(W(6, 'limit', 2) - 0.2, () => <Shot credit={CR.arch}><Clip src={V.vault} /><Cap t="Can the bills be paid?" a={8} /></Shot>);
add(W(6, 'Congress') - 0.1, () => <Shot credit={CR.arch}><Clip src={V.house} trim={60} /><Cap t="Congress votes again" a={4} /></Shot>);
add(W(6, 'bigger') - 0.2, (s) => <Shot>{dark(['#3A3128', '#0D0A08'])}<YearFlip ys={['2026', '2028', '2030', '2032']} to={at(s)(6, '2032')} last="LATE" /><Cap t="Social Security" a={at(s)(6, 'Social') - 2} x={90} y={180} /><div style={{ position: 'absolute', right: 40, bottom: 100, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.55)' }}>{CR.ssa}</div></Shot>);
add(W(6, "That's", 1) - 0.1, (s) => <Shot><Timeline a={6} /></Shot>);
add(W(6, 'Checks') - 0.1, (s) => <Shot><Check grey={at(s)(6, 'part') - 4} /><Cap t="Checks don't stop" a={4} x={90} y={170} /></Shot>);
add(W(6, 'fixes') - 0.1, (s) => { const a = at(s); return <Shot><Scale a={[a(6, 'Raise'), a(6, 'trim')]} /></Shot>; });
add(W(6, 'leans') - 0.6, () => <Shot credit="House hearing, 2009 · public domain"><Clip src={V8.hearingWage} trim={30} /><Cap t="Two sides" a={4} /></Shot>);
add(W(6, 'only', 1) - 0.2, (s) => <Shot grade="grayscale(.6) contrast(1.1)"><Photo src={I8.capitol} z={[1.1, 1.2]} tone="cold" /><Stamp t="ONLY CONGRESS" a={at(s)(6, 'Congress', 1)} size={120} /></Shot>);

// P7 — the three keys
add(paraT(7), () => <Shot credit={CR.arch}><Clip src={V.guards} bw /></Shot>);
add(W(7, 'Think') - 0.1, (s) => <Shot><KeyRing a={at(s)(7, 'three') - 6} /></Shot>);
add(W(7, 'White') - 0.2, (s) => <Shot credit={CR.arch}><Clip src={V.wh} trim={120} /><Cap t="Tariffs · vetoes · Fed picks" a={at(s)(7, 'push') - 2} /></Shot>);
add(W(7, 'second') - 0.2, (s) => <Shot credit={CR.arch}><Clip src={V.capDay} trim={60} /><Cap t="Spending · debt · Social Security" a={at(s)(7, 'controls') - 2} /></Shot>);
add(W(7, 'third') - 0.2, (s) => <Shot credit={CR.arch}><Clip src={V.fed} trim={120} /><Cap t="Rates · independent" a={at(s)(7, 'sets') - 2} /></Shot>);
add(W(7, 'all') - 0.8, () => <Shot><KeyRing a={-30} only={0} /><Cap t="No one holds all three" a={6} x={560} y={160} /></Shot>);
add(W(7, 'candidate') - 0.3, (s) => <Shot><Podiums q={at(s)(7, 'promises')} /><Cap t="“Lower prices!”" a={at(s)(7, 'lower') - 2} x={760} y={160} /></Shot>);
add(W(7, 'Which') - 0.1, () => <Shot><KeyRing a={-30} lit={[]} /><Cap t="Which key?" a={2} x={780} y={160} color={B.gold} /></Shot>);

// P8 — who feels it
add(paraT(8), (s) => <Shot><JakeCU seed="c1"><Illus /><Cap t="Jake · 26 · renter" a={at(s)(8, 'Jake') - 2} x={1200} y={420} /></JakeCU></Shot>);
add(W(8, 'wants') - 0.1, () => <Shot><Apartment tv={<ForSale />}><JakeAt x={420} y={1060} h={800} seed="a4" beats={[{ at: 6, r: 'smile', hold: 300 }]} /></Apartment><Illus /></Shot>);
add(W(8, 'Every') - 0.1, (s) => { const a = at(s); return <Shot><ForSale /><AbsoluteFill style={{ background: 'rgba(0,0,0,.45)' }} /><Num from={1841} to={2032} a={a(8, 'month')} b={a(8, 'more') + 6} sub="SAME HOUSE · PER MONTH · 6.2% → 7.2%" size={190} /></Shot>; });
add(W(8, 'doing') - 0.1, () => <Shot credit={CR.arch}><Clip src={V8.jars} /><Cap t="Saves. Pays on time." a={6} /></Shot>);
add(W(8, 'math', 1) - 0.4, () => <Shot><JakeCU r="doubt" seed="c2" /></Shot>);
add(W(8, 'grocery') - 0.1, (s) => <Shot><Register total="$84.20" a={0}><JakeAt x={640} y={1080} h={860} seed="a5" pose="read" stub="LIST" beats={[{ at: at(s)(8, 'total') + 4, r: 'surprise', hold: 300 }]} /></Register></Shot>);
add(W(8, 'Dana') - 0.1, (s) => <Shot><Dana><Cap t="Dana · 60" a={2} x={1200} y={620} color="#1B2230" /></Dana></Shot>);
add(W(8, '2032') - 0.2, (s) => <Shot>{dark(['#3A3128', '#0D0A08'])}<YearFlip ys={['2026', '2029', '2032']} to={14} last="LATE" /><Cap t="Not a headline. A plan." a={at(s)(8, 'plan') - 4} x={520} y={180} /></Shot>);
add(W(8, 'check') - 0.2, (s) => <Shot><Check q={at(s)(8, 'nobody')} label="DANA · ILLUSTRATIVE" /></Shot>);
add(W(8, 'Jake', 1) - 0.1, (s) => { const a = at(s); const half = (node: React.ReactNode, x: number) => <div style={{ position: 'absolute', left: x, top: 270, width: 960, height: 540, overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: 'scale(0.5)', transformOrigin: '0 0' }}>{node}</div></div>; return <Shot><AbsoluteFill style={{ background: '#0B0D12' }}>{half(<Apartment tv={<ForSale />}><JakeAt x={420} y={1060} h={800} seed="a6" beats={[{ at: 4, r: 'think', hold: 300 }]} /></Apartment>, 0)}{half(<Dana />, 960)}<div style={{ position: 'absolute', left: 954, top: 270, width: 12, height: 540, background: '#0B0D12' }} /></AbsoluteFill><Cap t="Waiting on rates" a={a(8, 'rates', 1) - 2} x={90} y={170} /><Cap t="Waiting on Congress" a={a(8, 'Congress') - 2} x={1060} y={860} /></Shot>; });
add(W(8, 'Both') - 0.1, () => <Shot credit={CR.arch}><Clip src={V.steps} bw /><Cap t="Decisions they don't make" a={6} /></Shot>);

// P9 — calendar
add(paraT(9), (s) => { const a = at(s); return <Shot><WallCal pins={[a(9, 'December'), a(9, 'December', 1), a(9, 'January'), a(9, 'November')]} /></Shot>; });
add(W(9, 'Every') - 0.1, () => <Shot>{dark(['#3A2E22', '#0D0A08'])}<Bills a={0} n={12} y={620} spread={900} /><Cap t="Your wallet" a={6} x={760} y={200} /></Shot>);
add(W(9, 'Mark') - 0.1, () => <Shot><WallCal pins={[-20, -20, -20, -20]} /><Cap t="Plan around them" a={20} x={700} y={150} color="#1B2230" /></Shot>);

// P10 — three things
add(paraT(10), () => <Shot><Todo hi={-1} /></Shot>);
add(W(10, 'One') - 0.1, () => <Shot><Todo hi={0} /></Shot>);
add(W(10, 'call') - 0.2, () => <Shot><Apartment tv={<AbsoluteFill style={{ background: '#2B3550' }} />}><JakeAt x={420} y={1060} h={800} seed="a7" pose="phone" beats={[{ at: 6, r: 'smile', hold: 300 }]} /></Apartment><Cap t="Ask for a lower rate" a={6} x={1050} y={200} /></Shot>);
add(W(10, 'Two') - 0.1, () => <Shot><Todo hi={1} /></Shot>);
add(W(10, 'Track') - 0.1, () => <Shot><Register total="$84.20" a={0} /><Cap t="One month of receipts" a={6} y={160} color="#1B2230" /></Shot>);
add(W(10, 'Three', 1) - 0.1, () => <Shot><Todo hi={2} /></Shot>);
add(W(10, 'Look') - 0.1, () => <Shot><LaptopSSA /></Shot>);

// P11 — close
add(paraT(11), () => <Shot><Podiums q={4} /><Cap t="Nobody knows" a={6} x={780} y={150} /></Shot>);
add(W(11, 'bills') - 0.2, (s) => <Shot><Desk><Envelope ins={[-60, -60, -60, -60]} stamp={-40} seal={at(s)(11, 'written') - 2} /></Desk></Shot>);
add(W(11, 'care') - 0.2, () => <Shot credit={CR.arch}><Clip src={V.wh} trim={150} /></Shot>);
add(W(11, 'They') - 0.1, (s) => <Shot><Desk><Envelope ins={[]} stamp={-40} seal={-40} slide={at(s)(11, 'passed')} /></Desk></Shot>);
add(W(11, 'person') - 0.2, () => <Shot><JakeCU r="nod" seed="c3"><div style={{ position: 'absolute', left: 1400, top: 600 }}><Envelope stamp={-40} seal={-40} x={0} y={0} scale={0.45} /></div></JakeCU></Shot>);

// P12 — disclaimer · P13 — question + end card
add(paraT(12), (s) => { const a = at(s); const f = useCurrentFrame(); const L: [string, string][] = [['For education only.', 'education'], ['Not financial advice.', 'financial'], ['Facts checked Nov 11, 2026.', 'Facts'], ['Sources in the description.', 'Sources']]; return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse, #1E2430, #07090C)' }}><div style={{ position: 'absolute', left: 300, top: 300 }}>{L.map(([t, w], i) => <div key={i} style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: '#F3EEE2', opacity: kk(f, a(12, w) - 6, a(12, w) + 4), marginBottom: 24 }}>{t}</div>)}</div></AbsoluteFill></Shot>; });
add(paraT(13), (s) => { const a = at(s); const f = useCurrentFrame(); const P: [string, string][] = [['PRICES', 'Prices'], ['RATES', 'rates'], ['THE DEBT', 'debt']]; return <Shot><AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, #3A3228, #0A0806)' }}>{P.map(([t, w], i) => { const k = eo(kk(f, a(13, w) - 4, a(13, w) + 6)); return <div key={t} style={{ position: 'absolute', left: 420 + i * 540, top: 560, transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * k})`, textAlign: 'center', opacity: 0.4 + 0.6 * k }}><div style={{ width: 300, height: 480, background: `radial-gradient(ellipse at 50% 60%, rgba(255,236,190,${0.9 * k}), #3A2A18)`, border: '14px solid #5A4630' }} /><Lbl t={t} size={56} color="#FFF8EA" /></div>; })}<Cap t="Which door? Tell me below." a={a(13, 'Tell') - 4} x={540} y={130} /></AbsoluteFill></Shot>; });
add(W(13, 'This', 0), () => { const f = useCurrentFrame(); return <Shot credit={CR.arch}><Clip src={V.wh} trim={200} /><AbsoluteFill style={{ background: 'rgba(0,0,0,.55)' }} /><div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', opacity: kk(f, 0, 10) }}><Img src={staticFile('brand/logo.png')} style={{ width: 150, height: 150 }} /><div style={{ fontFamily: cond, fontWeight: 800, fontSize: 96, letterSpacing: 16, color: '#FFF8EA' }}>DOLLARLY</div><div style={{ fontFamily: display, fontWeight: 700, fontSize: 52, color: B.gold }}>Your Money. Decoded.</div></div></Shot>; });

// ================================ composition + sound ================================
sh.sort((x, y) => x[0] - y[0]);
const END = EP_DUR;
export const EP09_FRAMES = fr(END);
const A = (n: string) => staticFile('ep09/audio/sfx_' + n + '.wav');
const SFX: [number, string, number][] = [
  [0.05, 'stamp', 0.14], [W(0, 'two') + 0.1, 'card', 0.14], [W(0, 'Period'), 'stamp', 0.2], [W(0, 'prices'), 'page', 0.14], [W(0, 'tariffs'), 'page', 0.14], [W(0, 'interest'), 'page', 0.14],
  [W(1, 'table'), 'cash', 0.14], [W(1, 'twentieth'), 'stamp', 0.2], [W(2, 'leaky'), 'stamp', 0.12], [W(2, 'overdue'), 'stamp', 0.12], [W(2, 'mortgage'), 'stamp', 0.14],
  [W(3, 'inflation'), 'printer', 0.14], [W(3, 'four'), 'ding', 0.14], [W(3, 'Beef'), 'chime', 0.1], [W(3, 'stacks'), 'page', 0.14],
  [paraT(4), 'whoosh', 0.14], [W(4, 'border'), 'stamp', 0.12], [W(4, 'absorbed'), 'stamp', 0.14], [W(4, 'passed'), 'stamp', 0.14], [W(4, 'debated'), 'stamp', 0.14],
  [W(4, 'Supreme'), 'gavel', 0.2], [W(4, 'biggest'), 'stamp', 0.2], [W(4, 'Refunds'), 'cash', 0.16], [W(4, 'just'), 'page', 0.12], [W(4, 'stay'), 'card', 0.14], [W(4, 'grow'), 'card', 0.14], [W(4, 'go', 1), 'card', 0.14],
  [paraT(5), 'whoosh', 0.14], [W(5, 'three'), 'chime', 0.1], [W(5, 'raise'), 'ding', 0.12], [W(5, 'ninth'), 'page', 0.14], [W(5, 'seven'), 'card', 0.14], [W(5, 'six'), 'card', 0.14],
  [W(5, 'ninety'), 'cash', 0.18], [W(5, 'upside'), 'coins', 0.14], [W(5, 'nominates'), 'stamp', 0.16], [W(5, 'confirms'), 'stamp', 0.16],
  [paraT(6), 'whoosh', 0.14], [W(6, 'forty'), 'printer', 0.12], [W(6, 'limit'), 'ding', 0.14], [W(6, 'Think'), 'card', 0.12], [W(6, '2032'), 'page', 0.14], [W(6, 'Raise'), 'card', 0.12],
  [W(6, 'trim'), 'card', 0.12], [W(6, 'Congress', 1), 'stamp', 0.2], [W(7, 'three'), 'coins', 0.12], [W(7, 'all'), 'ding', 0.12], [W(7, 'Which'), 'chime', 0.12],
  [W(8, 'more') - 0.2, 'cash', 0.14], [W(8, 'total'), 'printer', 0.14], [W(8, '2032'), 'page', 0.12], [W(8, 'nobody'), 'stamp', 0.18],
  [W(9, 'December'), 'card', 0.14], [W(9, 'December', 1), 'card', 0.14], [W(9, 'January'), 'card', 0.14], [W(9, 'November'), 'card', 0.16],
  [W(10, 'One'), 'ding', 0.12], [W(10, 'Two'), 'ding', 0.12], [W(10, 'Three', 1), 'ding', 0.12], [W(11, 'written'), 'stamp', 0.18], [W(11, 'passed'), 'whoosh', 0.14], [W(13, 'This'), 'chime', 0.12],
];
export const EP09Film: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {sh.map(([t, fn], i) => {
      const nx = i < sh.length - 1 ? sh[i + 1][0] : END;
      const C: React.FC = () => <>{fn(t)}</>;
      return <Sequence key={i} from={fr(t)} durationInFrames={Math.max(1, fr(nx - t) + (i < sh.length - 1 ? 4 : 0))} name={`s${i + 1}`}><C /></Sequence>;
    })}
    <Audio src={staticFile(VO_FILE)} volume={1} />
    <Audio src={staticFile(MUSIC)} volume={(f) => 0.08 * Math.min(1, f / 45) * Math.min(1, (fr(END) - f) / 60)} />
    {sh.filter((_, i) => i % 3 === 1).map(([t], i) => <Sequence key={'w' + i} from={Math.max(0, fr(t) - 4)} durationInFrames={20} layout="none"><Audio src={A('whoosh')} volume={0.06} /></Sequence>)}
    {SFX.map(([t, n, v], i) => <Sequence key={'x' + i} from={Math.max(0, fr(t))} durationInFrames={110} layout="none"><Audio src={A(n)} volume={v} /></Sequence>)}
  </AbsoluteFill>
);
export const SHOT_TIMES = sh.map(([t]) => t);
