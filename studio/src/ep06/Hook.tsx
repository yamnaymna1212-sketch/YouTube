import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, Car, DoorOpen, Home, Landmark, ShoppingCart, Fuel, Wallet } from 'lucide-react';
import { Badge, Door, Kicker, Src } from '../brand/Brand';
import { Sound } from '../ep05/kit';
import { HOOK_DUR, MUSIC, PER_SEC, VO_FILE, paraT, wordT } from './t';
import {
  At, B, BillTower, Enter, FlipCalendar, FlyInto, Illus, LiveJake, MeterChip, NightAvenue, Odometer, Pawn, Phone, Stamp, World,
  atW, cond, display, easeO, F, fr, kk, money, spr,
} from './kit';
import { Bug, Grain } from '../brand/Brand';

// EP06 · HOOK (paragraphs 0–3, 0:00–0:45). The money is in frame 1: THE METER counts U.S. interest at $33,350 a second
// (night Pennsylvania Avenue) → the meter's dollars stack into a tower → Aug 18, 2026 ($40T) → $119K per American →
// "collapse" headlines get stamped NOT COLLAPSING → Jake's phone: the mortgage bill → +$1T in five months → three doors → title.
const W = wordT;

// ---------- 1 · THE METER, full screen at night. $0 → $33,350 in the first second, then it never stops.
const S1: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const every = a(0, 'Every'), second = a(0, 'second');
  const t = f / fps;
  const v = t < 1 ? PER_SEC * easeO(t) : PER_SEC * t; // first second eases to $33,350, then linear
  const pull = easeO(kk(f, 0, fr(end - s)));
  const ring = kk(f, every, every + fps);
  const out = kk(f, fr(end - s) - 10, fr(end - s));
  return (
    <AbsoluteFill style={{ transform: `scale(${1.12 - 0.12 * pull})`, transformOrigin: '50% 50%' }}>
      <NightAvenue>
        <div style={{ position: 'absolute', left: 960, top: 420, transform: `translate(-50%,-50%) scale(${1 - out * 0.15})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 10, color: 'rgba(243,238,226,.75)' }}>U.S. INTEREST PAID</div>
          <div style={{ padding: 26, background: 'rgba(14,21,23,.9)', border: `6px solid ${B.gold}`, borderRadius: 18, boxShadow: '0 0 90px rgba(232,182,76,.25)' }}>
            <Odometer value={v} digits={6} h={210} dark />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: kk(f, every - 4, every + 4) }}>
            <svg width={90} height={90} viewBox="0 0 90 90">
              <circle cx={45} cy={45} r={38} fill="none" stroke="rgba(243,238,226,.25)" strokeWidth={8} />
              <circle cx={45} cy={45} r={38} fill="none" stroke={B.gold} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${ring} 1`} transform="rotate(-90 45 45)" />
            </svg>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 92, color: B.nightText, transform: `scale(${0.85 + 0.15 * kk(f, second, second + 8)})` }}>every second</div>
          </div>
        </div>
        <Src dark>FY2026 net interest $1,051.8B ÷ 31.5M seconds ≈ $33,350/s · U.S. Treasury, Monthly Treasury Statement (Sept 2026)</Src>
        <Bug dark /><Grain />
      </NightAvenue>
    </AbsoluteFill>
  );
};

// ---------- 2 · the dollars stack into a tower of $100 notes that climbs past the skyline → $40 TRILLION
const S2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const tril = a(1, 'trillion'), debt = a(1, 'debt');
  const h = 40 + 760 * easeO(kk(f, 0, debt + 10));
  const big = spr(f, tril - 2, fps, 12, 170);
  return (
    <Enter kind="fade" dur={6}>
      <NightAvenue>
        <BillTower x={960} y={860} h={h} w={340} maxH={800} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', transform: `scale(${big})` }}>
          <div style={{ display: 'inline-block', background: 'rgba(14,21,23,.88)', border: `6px solid ${B.gold}`, padding: '6px 40px', fontFamily: display, fontWeight: 800, fontSize: 150, color: B.gold, textShadow: '0 0 40px rgba(232,182,76,.4)' }}>$40 TRILLION</div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 58, letterSpacing: 12, color: B.nightText, opacity: kk(f, debt, debt + 8) }}>IN DEBT</div>
        <MeterChip t0={s} at={4} dark />
        <Src dark>$100 notes: uscurrency.gov SPECIMEN · Debt: U.S. Treasury, Debt to the Penny</Src>
        <Bug dark /><Grain />
      </NightAvenue>
    </Enter>
  );
};

// ---------- 3 · Aug 18, 2026: the day it passed $40T → today's Treasury figure ticks to $40.556T
const DebtCard: React.FC<{ value: number; date: string; at: number }> = ({ value, date, at }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 15, 150);
  return (
    <div style={{ position: 'absolute', left: 1240, top: 470, width: 980, transform: `translate(-50%,-50%) rotate(1.5deg) scale(${s})`, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '16px 16px 0 rgba(27,34,48,.22)' }}>
      <div style={{ background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 6, padding: '10px 26px', display: 'flex', justifyContent: 'space-between' }}>
        <span>U.S. TREASURY · DEBT TO THE PENNY</span><span style={{ color: B.gold }}>{date}</span>
      </div>
      <div style={{ padding: '26px 30px 30px' }}>
        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 32, letterSpacing: 3, color: B.muted }}>TOTAL PUBLIC DEBT OUTSTANDING</div>
        <div style={{ fontFamily: F.mono, fontSize: 82, color: B.ink, marginTop: 8, letterSpacing: -1 }}>{money(value)}</div>
      </div>
    </div>
  );
};
const S3: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const eighteen = a(1, 'eighteenth'), history = a(1, 'history'), now = a(1, 'now'), five = a(1, 'five');
  const V0 = 40047425768420, V1 = 40556120784983;
  const tick = easeO(kk(f, now, five + 6));
  const v = V0 + (V1 - V0) * tick + (f > five ? (f - five) * 2600000 : 0);
  return (
    <Enter kind="slideL" dur={14}>
      <World jake={false} meter={6} t0={s}>
        <FlipCalendar x={450} y={500} dates={[['JUN', '30'], ['JUL', '22'], ['AUG', '18']]} from={0} to={eighteen + 4} ringAt={history - 4} size={1.05} />
        <div style={{ position: 'absolute', left: 450, top: 790, transform: 'translate(-50%,0)', fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 6, color: B.red, opacity: kk(f, history - 4, history + 6) }}>FIRST TIME EVER</div>
        <DebtCard value={v} date={f < now ? 'AUG 18, 2026' : 'NOV 5, 2026'} at={eighteen - 6} />
        <Src>U.S. Treasury Fiscal Data: $40,047,425,768,420 (Aug 18, 2026) · $40,556,120,784,984 (Nov 5, 2026)</Src>
      </World>
    </Enter>
  );
};

// ---------- 4 · a crowd of pawns pours in; one steps forward with the tag: $119K each
const S4: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const hundred = a(1, 'hundred'), every = a(1, 'every'), amer = a(1, 'American');
  const tag = spr(f, hundred, fps, 10, 190);
  const flash = kk(f, amer, amer + 10);
  const cols = 16, rows = 6;
  return (
    <Enter kind="rise" dur={14}>
      <World jake={false} meter={0} t0={s} skyline={0.3}>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const c = i % cols, r = Math.floor(i / cols);
          const delay = (c + r * 3) * 0.8;
          const k = easeO(kk(f, delay, delay + 14));
          const x = 140 + c * 106 + (r % 2) * 50, y = 560 + r * 70;
          if (i === 7 + 2 * cols) return null;
          return <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translateY(${(1 - k) * 500}px)`, opacity: k }}><Pawn x={x} y={y} base={[B.blue, B.red, B.pine, B.amber][(c + r) % 4]} scale={0.42} seed={'cr' + i} /></div>;
        })}
        {/* the one who steps forward */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translateY(${-kk(f, hundred - 8, hundred) * 60}px)` }}>
          <Pawn x={960} y={760} base={B.red} scale={0.75} seed="me" />
        </div>
        <div style={{ position: 'absolute', left: 960, top: 360, transform: `translate(-50%,-50%) scale(${tag}) rotate(-4deg)`, background: B.amber, border: `7px solid ${B.ink}`, padding: '0 34px', fontFamily: display, fontWeight: 800, fontSize: 150, color: B.ink, boxShadow: '12px 12px 0 rgba(27,34,48,.25)' }}>$119K</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 58, letterSpacing: 10, color: B.ink, opacity: kk(f, every - 2, every + 8) }}>FOR EVERY AMERICAN</div>
        <AbsoluteFill style={{ background: `rgba(217,164,65,${0.18 * Math.sin(flash * Math.PI)})` }} />
        <Src>$40.556T ÷ 341,784,857 people (Census Bureau, Vintage 2025) ≈ $118,660</Src>
      </World>
    </Enter>
  );
};

// ---------- 5 · the "collapse" headlines slide in … and get stamped NOT COLLAPSING
const Headline: React.FC<{ text: string; y: number; at: number; rot: number }> = ({ text, y, at, rot }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spr(f, at, fps, 16, 150);
  return (
    <div style={{ position: 'absolute', left: 960, top: y, width: 1100, transform: `translate(-50%,-50%) translateX(${(1 - s) * 1400}px) rotate(${rot}deg)`, background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)', padding: '14px 30px' }}>
      <div style={{ height: 8, background: B.ink, marginBottom: 12, width: '30%' }} />
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 108, color: B.ink, lineHeight: 1 }}>{text}</div>
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>{[0.9, 0.7, 0.8].map((w, i) => <div key={i} style={{ height: 8, flex: w, background: 'rgba(27,34,48,.18)' }} />)}</div>
    </div>
  );
};
const S5: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const head = a(1, 'headlines'), dollar = a(1, 'dollar'), coll = a(1, 'collapse'), isnt = a(1, "isn't");
  const calm = kk(f, isnt, isnt + 8);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: head, r: 'worry', hold: isnt - head }, { at: isnt + 2, r: 'smile', hold: 200 }] }} meter={0} t0={s} skyline={0.25}>
        <div style={{ filter: `grayscale(${calm * 0.8})`, opacity: 1 - calm * 0.35 }}>
          <Headline text="COLLAPSE?" y={300} at={head - 2} rot={-2} />
          <Headline text="BREAKING POINT" y={520} at={dollar} rot={1.5} />
          <Headline text="CRISIS" y={740} at={coll - 4} rot={-1} />
        </div>
        <Stamp text="NOT COLLAPSING" x={900} y={520} at={isnt} size={130} color={B.pine} rot={-7} />
        <Src>IMF COFER (Q2 2026): dollar = 56.7% of world reserves · Fed broad dollar index ≈ unchanged vs a year ago</Src>
      </World>
    </Enter>
  );
};

// ---------- 6 · STORY — Jake's phone: the mortgage payment jumps $2,148 → $2,371 (the bill inside the number)
const S6: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const bill = a(1, 'bill'), inside = a(1, 'inside'), mort = a(1, 'mortgage');
  const v = 2148 + (2371 - 2148) * easeO(kk(f, inside, mort + 8));
  const crack = kk(f, mort, mort + 10);
  const dive = kk(f, fr(end - s) - 12, fr(end - s));
  return (
    <Enter kind="fade" dur={6}>
      <AbsoluteFill style={{ background: '#1A2236' }}>
        <AbsoluteFill style={{ background: 'radial-gradient(circle at 70% 40%, rgba(150,190,230,.16), transparent 50%)' }} />
        {Array.from({ length: 24 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 84, top: 0, width: 4, height: 1080, background: 'rgba(246,241,228,.035)' }} />)}
        <LiveJake pose="read" seed="ep06phone" beats={[{ at: 2, r: 'think', hold: bill }, { at: bill, r: 'doubt', hold: mort - bill }, { at: mort, r: 'worry', hold: 200 }]}
          style={{ position: 'absolute', left: 230, top: 210, height: 860 }} />
        <div style={{ position: 'absolute', inset: 0, transformOrigin: '1250px 540px', transform: `scale(${1 + dive * dive * 3})` }}>
          <Phone x={1250} y={540} scale={1.05}>
            <div style={{ background: B.blue, color: B.bone, padding: '70px 26px 18px', fontFamily: cond, fontWeight: 800, fontSize: 30, letterSpacing: 3 }}>MORTGAGE · MONTHLY</div>
            <div style={{ padding: '30px 26px' }}>
              <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 26, color: B.muted, letterSpacing: 2 }}>PAYMENT</div>
              <div style={{ fontFamily: F.mono, fontSize: 76, color: f > inside ? B.red : B.ink }}>${Math.round(v).toLocaleString('en-US')}</div>
              <div style={{ marginTop: 18, fontFamily: cond, fontWeight: 700, fontSize: 28, color: B.muted }}>RATE {f > inside ? '7.18%' : '6.22%'}</div>
              <div style={{ marginTop: 40, display: 'inline-block', background: B.red, color: B.bone, fontFamily: display, fontWeight: 800, fontSize: 60, padding: '4px 18px', transform: `scale(${spr(f, mort, fps, 9, 200)})` }}>+$223</div>
            </div>
            <svg width={376} height={776} style={{ position: 'absolute', left: 0, top: 0 }}>
              <path d="M30 120 L140 260 L110 330 L230 470 L200 560 L340 700" fill="none" stroke={B.ink} strokeWidth={4} pathLength={1} strokeDasharray={`${crack} 1`} />
            </svg>
          </Phone>
        </div>
        <Illus dark />
        <Src dark>Illustrative: $350,000 30-yr loan, principal + interest · Freddie Mac PMMS 6.22% (Nov 6, 2025) → 7.18% (Nov 5, 2026)</Src>
        <MeterChip t0={s} at={0} dark />
        <Bug dark /><Grain />
      </AbsoluteFill>
    </Enter>
  );
};

// ---------- 7 · +$1T in five months: the tower steps up while the calendar riffles March → August
const S7: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const one = a(2, 'one'), five = a(2, 'five'), around = a(2, 'Around'), month = a(2, 'month'), rent = a(2, 'rent'), groc = a(2, 'groceries'), tank = a(2, 'tank');
  const slam = spr(f, one + 4, fps, 10, 180);
  const chip = spr(f, around, fps, 11, 180);
  return (
    <Enter kind="slideL" dur={14}>
      <World jake={{ beats: [{ at: rent, r: 'nod', hold: 30 }, { at: tank, r: 'doubt', hold: 200 }], x: 1600 }} meter={0} t0={s}>
        <BillTower x={420} y={900} h={430} w={260} maxH={800} />
        <div style={{ position: 'absolute', left: 420, top: 470 - (1 - slam) * 400, transform: 'translate(-50%,-100%)', width: 290, height: 140, background: B.amber, border: `6px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 84, color: B.ink, opacity: kk(f, one, one + 4), boxShadow: '8px 8px 0 rgba(27,34,48,.25)' }}>+$1T</div>
        <FlipCalendar x={900} y={430} dates={[['MAR', '17'], ['APR', '15'], ['MAY', '20'], ['JUN', '18'], ['JUL', '16'], ['AUG', '18']]} from={one} to={five + 10} size={0.8} />
        <div style={{ position: 'absolute', left: 900, top: 720, transform: `translate(-50%,0) scale(${chip})`, background: B.bone, border: `5px solid ${B.ink}`, padding: '8px 26px', fontFamily: display, fontWeight: 800, fontSize: 70, color: B.red, whiteSpace: 'nowrap' }}>≈ $200B / month</div>
        <Badge I={Home} x={1230} y={300} at={rent} size={120} />
        <Badge I={ShoppingCart} x={1230} y={470} at={groc} size={120} />
        <Badge I={Fuel} x={1230} y={640} at={tank} size={120} />
        <Src>Debt to the Penny: $39T crossed mid-March 2026, $40T on Aug 18, 2026</Src>
      </World>
    </Enter>
  );
};

// ---------- 8 · what does it do to YOU? one icon slot swaps (paycheck → loans → dollar) · three doors on the horizon
const SLOT_ICONS = [Wallet, Car, Banknote];
const S8: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const wash = a(3, 'Washington'), you = a(3, 'you', 1), pay = a(3, 'paycheck'), loans = a(3, 'loans'), wallet = a(3, 'wallet');
  const idx = f < loans ? 0 : f < wallet - 4 ? 1 : 2;
  const swapAt = [pay, loans, wallet - 4][idx];
  const pop = spr(f, swapAt, fps, 10, 200);
  const I = SLOT_ICONS[idx];
  const doors = kk(f, wallet + 6, wallet + 20);
  const capDim = kk(f, wash, wash + 8) * (1 - kk(f, you, you + 6));
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'point', beats: [{ at: 2, r: 'think', hold: wash }, { at: you, r: 'nod', hold: 30 }, { at: wallet, r: 'surprise', hold: 200 }], x: 1550 }} meter={0} t0={s}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 110, color: B.ink, opacity: kk(f, you - 4, you + 6) }}>To <span style={{ color: B.red }}>you.</span></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 110, color: B.muted, opacity: capDim, textDecoration: 'line-through' }}>Washington</div>
        {f >= pay - 4 && (
          <div style={{ position: 'absolute', left: 760, top: 500, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * pop})`, width: 320, height: 320, borderRadius: '50%', background: B.bone, border: `8px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I size={170} color={B.ink} strokeWidth={2.2} />
          </div>
        )}
        <div style={{ opacity: doors }}>
          {[0, 1, 2].map((i) => <Door key={i} x={300 + i * 180} y={880} n={i + 1} I={[Landmark, Home, Banknote][i]} label="" w={120} at={wallet + 6 + i * 4} color={[B.red, B.blue, B.pine][i]} />)}
        </div>
        <Src>Three doors: your taxes &amp; services · your loans · the dollar</Src>
      </World>
    </Enter>
  );
};

// ---------- 9 · title card: THE BILL INSIDE THE NUMBER (over the night meter) → Part02
const S9: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const real = a(3, 'real'), bill = a(3, 'bill', 0);
  const t = spr(f, bill - 6, fps, 16, 120);
  return (
    <Enter kind="fade" dur={8}>
      <NightAvenue cap={0.18}>
        <div style={{ position: 'absolute', left: 960, top: 220, transform: 'translate(-50%,-50%) scale(.55)', opacity: 0.5 + 0.3 * (1 - t) }}>
          <Odometer value={PER_SEC * (s + f / fps)} digits={8} h={200} dark />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', opacity: kk(f, real - 4, real + 8), textShadow: '0 4px 30px rgba(0,0,0,.8)' }}>
          <Kicker size={40} color={B.gold}>$40 TRILLION</Kicker>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 132, color: B.nightText, lineHeight: 1.05, marginTop: 12, transform: `translateY(${(1 - t) * 30}px)`, opacity: t }}>The bill inside<br />the number</div>
        </div>
        <Bug dark /><Grain />
      </NightAvenue>
    </Enter>
  );
};

export const EP06_HOOK_FRAMES = fr(HOOK_DUR);
const T1 = W(1, 'Forty'), T2 = W(1, 'August'), T3 = W(1, "That's"), T4 = W(1, 'headlines') - 0.15, T5 = W(1, 'But'), T6 = paraT(2), T7 = paraT(3), T8 = W(3, 'Stay');
export const EP06Hook: React.FC = () => (
  <AbsoluteFill style={{ background: B.night }}>
    <At from={0} to={T1 + 0.4} name="1 the meter"><S1 s={0} end={T1} /></At>
    <At from={T1} to={T2 + 0.5} name="2 tower $40T"><S2 s={T1} /></At>
    <At from={T2} to={T3 + 0.5} name="3 Aug 18 · Treasury"><S3 s={T2} /></At>
    <At from={T3} to={T4 + 0.5} name="4 $119K each"><S4 s={T3} /></At>
    <At from={T4} to={T5 + 0.4} name="5 not collapsing"><S5 s={T4} /></At>
    <At from={T5} to={T6 + 0.5} name="6 story · mortgage"><S6 s={T5} end={T6} /></At>
    <At from={T6} to={T7 + 0.5} name="7 +$1T in 5 months"><S7 s={T6} /></At>
    <At from={T7} to={T8 + 0.5} name="8 to you · doors"><S8 s={T7} end={T8} /></At>
    <At from={T8} to={HOOK_DUR} name="9 title"><S9 s={T8} /></At>
    <Sound base={0} vo={VO_FILE} music={MUSIC} cues={[
      [0.05, 'counter', 0.06], [W(0, 'Every'), 'tick', 0.05], [T1, 'counter', 0.05], [W(1, 'eighteenth'), 'paper', 0.06],
      [W(1, 'now'), 'counter', 0.05], [W(1, 'hundred'), 'paper', 0.06], [W(1, 'headlines'), 'paper', 0.05], [W(1, "isn't"), 'paper', 0.08],
      [W(1, 'mortgage'), 'tick', 0.06], [W(2, 'one'), 'paper', 0.07], [W(2, 'Around'), 'tick', 0.05],
      [W(3, 'paycheck'), 'tick', 0.05], [W(3, 'loans'), 'tick', 0.05], [W(3, 'wallet'), 'tick', 0.05], [W(3, 'bill', 0), 'paper', 0.06],
    ]} />
  </AbsoluteFill>
);
