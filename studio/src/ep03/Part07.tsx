import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Apple, Banknote, Briefcase, Building2, Calculator, Car, Coins, Fuel, Hammer, Landmark, Luggage, Package, Pause, PiggyBank, Plane, Scale, Shield, ShoppingBag, ShoppingBasket, Snowflake, Ticket, TrendingDown, TrendingUp, Truck, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { P } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Src, TimeChip, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound } from './Part01';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_06');
const END = partEnd('vo_06');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

const Stage: React.FC<{ children: React.ReactNode; dark?: boolean; kicker: string; title: string; jake?: { at: number; r: any } }> = ({ children, dark, kicker, title, jake }) => (
  <AbsoluteFill style={{ background: dark ? P.ink : P.paper }}>
    <Headline kicker={kicker} dark={dark} x={90} y={90} size={110}>{title}</Headline>
    {children}
    {jake && <div style={{ position: 'absolute', right: 50, bottom: 50, width: 380, height: 280, background: '#1A1C21', border: `5px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.3)', overflow: 'hidden' }}>
      <LiveJake pose="stand" seed={'p7' + title} beats={[{ at: jake.at, r: jake.r, hold: 400 }]} style={{ position: 'absolute', left: 90, top: 10, height: 580 }} />
    </div>}
    <WhatIf dark={dark} /><Bug dark={dark} left={!!jake} /><Grain k={0.04} />
  </AbsoluteFill>
);

// 46 · sunrise; every app is red
const Sunrise46: React.FC<{ redAt: number }> = ({ redAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const sun = interpolate(f, [0, 90], [0, 1], { extrapolateRight: 'clamp' });
  const apps = [Fuel, TrendingDown, PiggyBank, ShoppingBasket, Plane, Building2, Car, Banknote, Briefcase];
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      <div style={{ position: 'absolute', left: 120, top: 60, width: 520, height: 90, background: `rgba(242,200,120,${0.2 + sun * 0.7})`, border: `6px solid ${P.ink}`, boxShadow: `0 0 ${120 * sun}px rgba(242,200,120,.6)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(170deg, rgba(242,190,110,${sun * 0.25}), transparent 60%)` }} />
      <LiveJake pose="read" seed="p7sun" beats={[{ at: redAt, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 120, top: 220, height: 860 }} />
      <div style={{ position: 'absolute', left: 860, top: 150, width: 560, height: 860, background: '#0E1016', border: `10px solid ${P.bone}`, borderRadius: 60, padding: 50, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, transform: `scale(${sp(f, 6, fps)})` }}>
        {apps.map((I, i) => { const red = f > redAt + i * 2; return <div key={i} style={{ height: 130, borderRadius: 30, background: red ? P.red : '#2E3446', border: `4px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={70} color={P.bone} /></div>; })}
      </div>
      <WhatIf dark /><TimeChip t="06:48" label="DAY 1 · THE SHELTER" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 47 · gas: days vs weeks
const Line: React.FC<{ d: string; prog: number; color: string }> = ({ d, prog, color }) => (
  <svg width="600" height="300" style={{ overflow: 'visible' }}><path d={d} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - prog} /></svg>
);
const Gas47: React.FC<{ daysAt: number; weeksAt: number }> = ({ daysAt, weeksAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pa = interpolate(f - daysAt, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pb = interpolate(f - weeksAt, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const Box: React.FC<{ x: number; at: number; t: string; children: React.ReactNode }> = ({ x, at, t, children }) => (
    <div style={{ position: 'absolute', left: x, top: 330, width: 760, height: 560, transform: `scale(${sp(f, at, fps)})`, background: P.bone, border: `6px solid ${P.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.25)', padding: 40 }}>
      <div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 70, color: P.ink }}>{t}</div>
      <div style={{ marginTop: 60, marginLeft: 40 }}>{children}</div>
    </div>
  );
  return (
    <Stage kicker="IT DEPENDS ON ONE THING" title="How long it's shut" jake={{ at: weeksAt, r: 'worry' }}>
      <Badge I={Fuel} x={1700} y={180} at={0} size={150} label="GAS" />
      <Box x={110} at={daysAt} t="DAYS"><Line d="M 0 260 L 160 260 L 260 40 L 400 180 L 560 200" prog={pa} color={P.amber} /></Box>
      {f > weeksAt && <Box x={950} at={weeksAt} t="WEEKS"><Line d="M 0 260 L 140 230 L 280 170 L 420 100 L 560 30" prog={pb} color={P.red} /></Box>}
      <Src style={{ left: 110, bottom: 40 }}>Illustrative shapes, not a forecast</Src>
    </Stage>
  );
};

// 47a · Jake's math
const Math47a: React.FC<{ galAt: number; dolAt: number; weekAt: number }> = ({ galAt, dolAt, weekAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const Row: React.FC<{ at: number; children: React.ReactNode; y: number; c?: string }> = ({ at, children, y, c = P.ink }) => <div style={{ position: 'absolute', left: 120, top: y, fontFamily: F.serif, fontSize: 130, color: c, opacity: sp(f, at, fps), transform: `translateX(${(1 - sp(f, at, fps)) * -60}px)` }}>{children}</div>;
  return (
    <Stage kicker="THE MATH FOR JAKE" title="" jake={{ at: dolAt, r: 'surprise' }}>
      <Badge I={Calculator} x={1700} y={180} at={0} size={150} />
      <Row at={galAt} y={250}>780 gal / year</Row>
      <Row at={dolAt} y={430}>× +$1 a gallon</Row>
      <Row at={dolAt + 20} y={610} c={P.red}>= +$780 a year</Row>
      {f > weekAt && <div style={{ position: 'absolute', left: 120, top: 830, fontFamily: F.sans, fontWeight: 700, fontSize: 56, color: P.ink, opacity: sp(f, weekAt, fps) }}>More than a week's pay ($13.73/h × 40 = $549)</div>}
      <Src style={{ left: 120, bottom: 30 }}>Jake's numbers from EP02: $3,240 a year at $4.15/gal</Src>
    </Stage>
  );
};

// 48 · −7% → trading paused
const Halt: React.FC<{ at: number; stopAt: number }> = ({ at, stopAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pct = interpolate(f - at, [0, 40], [0, -7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const st = sp(f, stopAt, fps, 9, 200);
  return (
    <Stage dark kicker="STOCKS" title="A market circuit breaker" jake={{ at: stopAt, r: 'doubt' }}>
      <div style={{ position: 'absolute', left: 110, top: 300, fontFamily: F.serif, fontSize: 340, color: P.red, lineHeight: 1 }}>{pct.toFixed(1)}%</div>
      <Badge I={TrendingDown} x={1300} y={420} at={at} size={190} label="S&P 500" />
      {f > stopAt && <div style={{ position: 'absolute', left: 110, top: 720, transform: `scale(${st})`, transformOrigin: '0 50%', display: 'flex', alignItems: 'center', gap: 24, background: P.bone, border: `7px solid ${P.ink}`, padding: '16px 34px' }}><Pause size={90} color={P.ink} fill={P.ink} /><div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 92, color: P.ink }}>TRADING PAUSED · 15 MIN</div></div>}
      <Src dark style={{ left: 110, bottom: 40 }}>Market-wide circuit breaker, Level 1 (S&P 500 −7%) · SEC/NYSE rules ⚠ confirm</Src>
    </Stage>
  );
};

// 49 · flight to safety
const Safety: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => (
  <Stage kicker="MONEY RUNS TO SAFETY" title="Safe havens" jake={{ at: a, r: 'think' }}>
    {[[Coins, 'GOLD', a, 420], [Landmark, 'GOV. BONDS', b, 860], [Banknote, 'THE DOLLAR', c, 1300]].map(([I, l, at, x]: any, i) => (
      <React.Fragment key={i}><Badge I={I} x={x} y={560} at={at} size={230} label={l} /><Badge I={TrendingUp} x={x + 120} y={420} at={at + 8} size={90} /></React.Fragment>
    ))}
  </Stage>
);

// 49a · Jake's retirement, loans
const Loans: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => (
  <Stage kicker="JAKE'S ACCOUNTS" title="401(k) down, loans up" jake={{ at: a, r: 'worry' }}>
    <Badge I={PiggyBank} x={420} y={560} at={a} hit={a + 12} size={230} label="401(k)" />
    <Badge I={Building2} x={860} y={560} at={b} size={230} label="MORTGAGE RATES" /><Badge I={TrendingUp} x={980} y={420} at={b + 8} size={90} />
    <Badge I={Car} x={1300} y={560} at={c} size={230} label="CAR LOANS" /><Badge I={TrendingUp} x={1420} y={420} at={c + 8} size={90} />
  </Stage>
);

// 49b · a few winners
const Winners: React.FC<{ a: number; b: number; notAt: number }> = ({ a, b, notAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <Stage kicker="A FEW GO UP" title="Not your money" jake={{ at: notAt, r: 'shrug' }}>
      <Badge I={Fuel} x={500} y={520} at={a} size={190} label="OIL PRODUCERS" /><Badge I={TrendingUp} x={600} y={400} at={a + 8} size={80} />
      <Badge I={Shield} x={900} y={520} at={b} size={190} label="DEFENSE" /><Badge I={TrendingUp} x={1000} y={400} at={b + 8} size={80} />
      {f > notAt && <div style={{ position: 'absolute', left: 300, top: 780, fontFamily: F.sans, fontWeight: 700, fontSize: 60, color: P.ink, opacity: sp(f, notAt, fps) }}>Most people's savings aren't there.</div>}
    </Stage>
  );
};

// 50 · everything on a truck
const Truck50: React.FC<{ at: number; a: number; b: number; c: number }> = ({ at, a, b, c }) => {
  const f = useCurrentFrame();
  const x = interpolate(f - at, [0, 60], [-300, 760], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Stage kicker="DIESEL" title="Everything on a truck" jake={{ at: at, r: 'doubt' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 560, height: 12, background: P.ink, opacity: 0.4 }} />
      <div style={{ position: 'absolute', left: x, top: 380 }}><Truck size={200} color={P.ink} strokeWidth={1.8} /></div>
      <Badge I={ShoppingBasket} x={1200} y={460} at={at + 40} size={190} label="PRICES ↑" />
      <Badge I={Apple} x={500} y={800} at={a} size={150} label="FOOD" />
      <Badge I={Package} x={850} y={800} at={b} size={150} label="PACKAGES" />
      <Badge I={Hammer} x={1200} y={800} at={c} size={150} label="BUILDING" />
    </Stage>
  );
};

// 51 · flights reroute
const Flights: React.FC<{ at: number; tixAt: number }> = ({ at, tixAt }) => {
  const f = useCurrentFrame();
  const t = interpolate(f - at, [0, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = 200 + 1400 * t, y = 600 - Math.sin(t * Math.PI) * 300;
  return (
    <Stage dark kicker="AIR TRAVEL" title="Longer routes" jake={{ at: tixAt, r: 'shrug' }}>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080"><path d="M 200 600 Q 900 0 1600 600" fill="none" stroke={P.amber} strokeWidth={8} strokeDasharray="24 16" /><line x1={200} y1={600} x2={1600} y2={600} stroke={P.red} strokeWidth={8} strokeDasharray="10 14" opacity={0.6} /></svg>
      <div style={{ position: 'absolute', left: 900, top: 560, fontFamily: cond2, fontWeight: 700, fontSize: 40, color: P.red }}>CLOSED AIRSPACE</div>
      <div style={{ position: 'absolute', left: x - 50, top: y - 50 }}><Plane size={100} color={P.bone} /></div>
      <Badge I={Ticket} x={960} y={850} at={tixAt} size={170} label="TICKETS ↑" />
    </Stage>
  );
};

// 52 · the Fed's dilemma: a scale that can't settle
const Fed: React.FC<{ upAt: number; downAt: number; bothAt: number }> = ({ upAt, downAt, bothAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const tilt = f < downAt ? -10 * sp(f, upAt, fps) : interpolate(Math.sin((f - downAt) / 10), [-1, 1], [-10, 10]);
  return (
    <Stage kicker="THE FEDERAL RESERVE" title="Stuck" jake={{ at: bothAt, r: 'doubt' }}>
      <div style={{ position: 'absolute', left: 960, top: 300, transform: 'translateX(-50%)' }}><Scale size={160} color={P.ink} /></div>
      <div style={{ position: 'absolute', left: 260, top: 560, width: 1400, transform: `rotate(${tilt}deg)` }}>
        <div style={{ height: 14, background: P.ink }} />
        <div style={{ position: 'absolute', left: 0, top: 30, width: 520, background: P.bone, border: `6px solid ${P.ink}`, padding: '20px 26px', opacity: sp(f, upAt, fps) }}><div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 64, color: P.red }}>RATES ↑</div><div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 40 }}>fight prices</div></div>
        <div style={{ position: 'absolute', right: 0, top: 30, width: 520, background: P.bone, border: `6px solid ${P.ink}`, padding: '20px 26px', opacity: sp(f, downAt, fps) }}><div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 64, color: '#3F5A8C' }}>RATES ↓</div><div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 40 }}>protect jobs</div></div>
      </div>
      {f > bothAt && <div style={{ position: 'absolute', left: 960, top: 900, transform: 'translateX(-50%)', fontFamily: F.serif, fontSize: 80, color: P.ink }}>Can't do both.</div>}
    </Stage>
  );
};

// 52a · hiring freeze
const Freeze: React.FC<{ at: number; a: number; b: number; c: number }> = ({ at, a, b, c }) => (
  <Stage kicker="SCARED COMPANIES" title="Hiring freezes" jake={{ at: at, r: 'worry' }}>
    <Badge I={Briefcase} x={420} y={520} at={at} size={230} /><Badge I={Snowflake} x={540} y={400} at={at + 8} size={100} />
    <Badge I={Plane} x={860} y={620} at={a} size={160} label="AIRLINES" />
    <Badge I={Luggage} x={1180} y={620} at={b} size={160} label="TRAVEL" />
    <Badge I={ShoppingBag} x={1500} y={620} at={c} size={160} label="PUT-OFF BUYS" />
  </Stage>
);

// 53 · wallet ticks down; bigger ring ahead
const Wallet53: React.FC<{ ringAt: number }> = ({ ringAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const v = interpolate(f, [0, 40], [0, -780], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: P.ink, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, background: P.bone, border: `8px solid ${P.ink}`, padding: '40px 60px', boxShadow: '16px 16px 0 rgba(0,0,0,.4)', transform: `scale(${1 - sp(f, ringAt, fps) * 0.35}) translateY(${-sp(f, ringAt, fps) * 260}px)` }}>
        <Wallet size={150} color={P.ink} strokeWidth={2} />
        <div><div style={{ fontFamily: F.mono, fontSize: 34, color: '#6b6250', letterSpacing: 4 }}>JAKE'S WALLET · GAS ALONE, PER $1</div><div style={{ fontFamily: F.serif, fontSize: 200, color: P.red, lineHeight: 1 }}>{'−$' + Math.abs(Math.round(v))} / yr</div></div>
      </div>
      {f > ringAt && <div style={{ position: 'absolute', left: 960, top: 760, transform: `translate(-50%,-50%) scale(${sp(f, ringAt, fps)})`, width: 300, height: 300, borderRadius: 150, border: `10px dashed ${P.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 120, color: P.bone }}>4</div>}
      <LiveJake pose="stand" seed="p7end" beats={[{ at: 0, r: 'worry', hold: 40 }, { at: 45, r: 'shrug', hold: 300 }]} style={{ position: 'absolute', left: 1560, top: 520, height: 600 }} />
      <WhatIf dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part07: React.FC = () => {
  const s = (id: string) => shotT(id);
  const w = (id: string, x: string, n = 0) => rel(wordT(id, x, n), s(id));
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('46')} to={s('47')} name="46"><Enter kind="fade"><Sunrise46 redAt={w('46', 'red')} /></Enter></At>
      <At base={B} from={s('47')} to={s('47a')} name="47"><Enter kind="zoom"><Gas47 daysAt={w('47', 'days')} weeksAt={w('47', 'weeks')} /></Enter></At>
      <At base={B} from={s('47a')} to={s('48')} name="47a"><Enter kind="slideL"><Math47a galAt={w('47a', 'gallons')} dolAt={w('47a', 'dollar')} weekAt={w('47a', 'week')} /></Enter></At>
      <At base={B} from={s('48')} to={s('49')} name="48"><Enter kind="drop"><Halt at={w('48', 'falls')} stopAt={w('48', 'stops')} /></Enter></At>
      <At base={B} from={s('49')} to={s('49a')} name="49"><Enter kind="slideL"><Safety a={w('49', 'gold')} b={w('49', 'bonds')} c={w('49', 'dollar')} /></Enter></At>
      <At base={B} from={s('49a')} to={s('49b')} name="49a"><Enter kind="slideL"><Loans a={w('49a', 'retirement')} b={w('49a', 'mortgage')} c={w('49a', 'car')} /></Enter></At>
      <At base={B} from={s('49b')} to={s('50')} name="49b"><Enter kind="slideL"><Winners a={w('49b', 'oil')} b={w('49b', 'defense')} notAt={w('49b', 'most')} /></Enter></At>
      <At base={B} from={s('50')} to={s('51')} name="50"><Enter kind="slideL"><Truck50 at={w('50', 'truck')} a={w('50', 'food')} b={w('50', 'packages')} c={w('50', 'building')} /></Enter></At>
      <At base={B} from={s('51')} to={s('52')} name="51"><Enter kind="slideL"><Flights at={0} tixAt={w('51', 'tickets')} /></Enter></At>
      <At base={B} from={s('52')} to={s('52a')} name="52"><Enter kind="zoom"><Fed upAt={w('52', 'raise')} downAt={w('52', 'cut')} bothAt={w('52', 'both')} /></Enter></At>
      <At base={B} from={s('52a')} to={s('53')} name="52a"><Enter kind="slideL"><Freeze at={w('52a', 'hiring')} a={w('52a', 'airlines')} b={w('52a', 'travel')} c={w('52a', 'buying')} /></Enter></At>
      <At base={B} from={s('53')} to={END} name="53"><Enter kind="zoom"><Wallet53 ringAt={w('53', 'ring')} /></Enter></At>
      <PartSound base={B} cues={[[wordT('46', 'red'), 'tick', 0.05], [wordT('47a', 'math'), 'counter', 0.06], [wordT('48', 'stops'), 'paper', 0.06], [s('53'), 'counter', 0.06]]} />
    </AbsoluteFill>
  );
};
export const EP03_P7_FRAMES = fr(END - B);
