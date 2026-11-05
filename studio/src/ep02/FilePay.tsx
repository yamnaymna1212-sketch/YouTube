import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Video } from '@remotion/media';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import states from 'us-atlas/states-albers-10m.json';
import { Banknote, Briefcase, CalendarDays, CircleHelp, Lock, MapPin, Store, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { C, F } from '../theme';
import { clamp, ease } from '../ui/Film';
import { LiveJake } from '../host/LiveJake';
import { Diner, LightWrap, Sky, Skyline, Street } from '../world/World';
import { Archive, Cue, Ico, Label, Note, Push, Slam, Src, World, useDur } from './Hook';
import { Cut, Cuts, Illus, Wallet, t01 } from './Part1';
import { HEALTH_MUSIC_FROM } from './FileHealth';
import { remap, voFrames } from './timing';

// EP02 · FILE 03 · PAYCHECK (vo_05). Times in ORIGINAL-take frames, remapped to the tight VO.
const A = (f: string) => staticFile(`sayed/${f}`);
const VO = 'vo_05';
const rel = (orig: number, shotStart: number) => remap(VO, orig) - remap(VO, shotStart);
const fade = (f: number, at: number, len = 12) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: ease });
const GREEN = '#6FBF73';
const W_MI = 'Michigan';

// P0 · CARD
const P0: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, justifyContent: 'center', paddingLeft: 160 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <Ico I={Banknote} size={110} color={C.red} at={2} />
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 26, color: '#7A7266', letterSpacing: 3, opacity: fade(f, 0, 8) }}>FILE 03</div>
          <div style={{ fontFamily: F.serif, fontSize: 190, color: C.ink, lineHeight: 0.95 }}>Paycheck</div>
        </div>
      </div>
      <div style={{ width: interpolate(f, [6, 26], [0, 300], { ...clamp, easing: ease }), height: 6, background: C.red, marginTop: 26 }} />
      <Wallet value="+$1,440 − ?" />
    </AbsoluteFill>
  );
};

// P1 · REAL SCREEN: DOL minimum-wage page, push to the $7.25 line.
const P1: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 960, top: 540, width: 1600, height: 1000, transform: `translate(-1000px, -440px) scale(${1.6 + 0.4 * t})`, transformOrigin: '1000px 440px' }}>
        <Img src={A('screens/dol_minimum_wage.png')} style={{ width: 1600, height: 1000 }} />
        <div style={{ position: 'absolute', left: 1240, top: 428, width: 130 * fade(f, 10, 18), height: 26, background: C.amber, opacity: 0.4, mixBlendMode: 'multiply' }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.9), rgba(12,13,16,.55) 45%, transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 320 }}>
        <Label at={0} color={C.steel}>Federal minimum wage</Label>
        <Slam text="$7.25" color={C.bone} size={220} at={4} style={{ marginTop: 8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, opacity: fade(f, 30) }}><Lock size={34} color={C.amber} strokeWidth={1.6} /><span style={{ fontFamily: F.sans, fontSize: 32, color: C.bone }}>unchanged since July 24, 2009</span></div>
      </div>
      <Src>U.S. Department of Labor, Wage and Hour Division (screenshot, Nov 5, 2026)</Src>
    </AbsoluteFill>
  );
};

// P2 · REAL FOOTAGE (archive 1937): the era of the first minimum wage — the longest freeze since 1938.
const P2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 140], [1.05, 1.14], clamp)})` }}>
        <Video src={A('footage/v13_payroll_office_1937.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.3) contrast(1.1) brightness(.6)' }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.88), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 300 }}>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
          {[['1938', 'first federal minimum wage', 0], ['2009', 'last raise', 14]].map(([y, s, at]) => (
            <div key={y as string} style={{ opacity: fade(f, at as number) }}>
              <div style={{ fontFamily: F.mono, fontSize: 120, color: C.amber, lineHeight: 1 }}>{y}</div>
              <div style={{ fontFamily: F.sans, fontSize: 26, color: C.bone }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 76, color: C.bone, marginTop: 30, opacity: fade(f, rel(240, 190)) }}>The longest freeze ever.</div>
      </div>
      <Archive>ARCHIVE · "WORK PAYS AMERICA" · 1937</Archive>
      <Src>U.S. Department of Labor · Footage: WPA film (public domain)</Src>
    </AbsoluteFill>
  );
};

const geo = feature(states as any, (states as any).objects.states) as any;
const path = geoPath();

// P3 · REAL DATA MAP: Michigan — $13.73 now, $15.00 in January.
const P3: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const mi = geo.features.find((x: any) => x.properties.name === W_MI);
  const [[x0, y0], [x1, y1]] = path.bounds(mi);
  const k = Math.min(760 / (x1 - x0), 820 / (y1 - y0));
  const up = fade(f, rel(430, 328), 20);
  return (
    <AbsoluteFill style={{ background: '#0E1116' }}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(${170 - 20 * t} 130) scale(${k * (1 + 0.04 * t)}) translate(${-x0} ${-y0})`}>
          <path d={path(mi) || ''} fill={C.amber} fillOpacity={0.85} stroke="#fff" strokeWidth={1.2 / k} />
        </g>
      </svg>
      <div style={{ position: 'absolute', right: 150, top: 280, width: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Ico I={MapPin} size={40} color={C.steel} /><Label at={0} color={C.steel}>Michigan minimum wage</Label></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 30, marginTop: 14 }}>
          <Slam text="$13.73" color={C.bone} size={150} at={rel(380, 328)} />
          <span style={{ fontFamily: F.sans, fontSize: 26, color: C.steel, opacity: fade(f, rel(390, 328)) }}>today</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 30, marginTop: 10, opacity: up, transform: `translateY(${(1 - up) * 20}px)` }}>
          <TrendingUp size={60} color={GREEN} strokeWidth={1.6} />
          <span style={{ fontFamily: F.mono, fontSize: 150, color: GREEN }}>$15.00</span>
          <span style={{ fontFamily: F.sans, fontSize: 26, color: C.steel }}>Jan 1, 2027</span>
        </div>
      </div>
      <Src>CBS Detroit · Axios Detroit · Map: U.S. Census (us-atlas)</Src>
    </AbsoluteFill>
  );
};

// P4 · REAL DATA MAP: where a federal raise matters most — Texas and Indiana, still $7.25.
const P4: React.FC = () => {
  const f = useCurrentFrame();
  const hot: Record<string, number> = { Texas: rel(640, 546), Indiana: rel(665, 546) };
  return (
    <AbsoluteFill style={{ background: '#0E1116' }}>
      <svg width={1560} height={1000} viewBox="-60 -80 1100 720" style={{ position: 'absolute', left: 0, top: 60 }}>
        {geo.features.map((g: any) => {
          const n = g.properties.name;
          const at = hot[n];
          const on = at !== undefined ? fade(f, at, 10) : 0;
          const mi = n === W_MI;
          return <path key={n} d={path(g) || ''} fill={on ? C.red : mi ? C.amber : '#2A2E36'} fillOpacity={on ? 0.4 + 0.6 * on : mi ? 0.7 : 1} stroke="#0E1116" strokeWidth={0.8} />;
        })}
        <g fontFamily="Inter, sans-serif" fontWeight={700} fill="#fff" fontSize={20}>
          <text x={430} y={520} opacity={fade(f, hot.Texas)}>TEXAS $7.25</text>
          <text x={700} y={250} opacity={fade(f, hot.Indiana)}>INDIANA $7.25</text>
          <text x={720} y={160} opacity={0.8}>MICHIGAN $13.73</text>
        </g>
      </svg>
      <div style={{ position: 'absolute', right: 90, top: 170, width: 460 }}>
        <Label at={0} color={C.steel}>A federal raise matters most</Label>
        <div style={{ fontFamily: F.serif, fontSize: 64, color: C.bone, lineHeight: 1.05, marginTop: 8 }}>where it's still $7.25.</div>
      </div>
      <Src>U.S. Department of Labor · Sommers PC (2026) · Map: U.S. Census (us-atlas)</Src>
    </AbsoluteFill>
  );
};

// P5 · REAL PHOTO (archive 1973): a real diner worker — what would a big raise do?
const P5: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Push src={A('real/doc09_the-young-waitress-at-the-local-aw-snack.jpg')} from={1.08} to={1.18} origin="40% 45%" filter="saturate(.85) brightness(.65)" />
    <AbsoluteFill style={{ background: 'linear-gradient(270deg, rgba(12,13,16,.85), transparent 60%)' }} />
    <div style={{ position: 'absolute', right: 140, top: 360, textAlign: 'right' }}>
      <Ico I={CircleHelp} size={70} color={C.amber} at={0} />
      <div style={{ fontFamily: F.serif, fontSize: 96, color: C.bone, lineHeight: 1.05, marginTop: 10 }}>What would a big raise<br />actually do?</div>
    </div>
    <Archive>ARCHIVE · 1973</Archive>
    <Src>EPA DOCUMERICA / National Archives (public domain)</Src>
  </AbsoluteFill>
);

// P6a · REAL FOOTAGE (generic Congress, 2009) + the CBO study card.
const P6a: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 140], [1.12, 1.2], clamp)})`, transformOrigin: '50% 20%' }}>
        <Video src={A('footage/v07_house_wage_hearing_2009.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', filter: 'blur(3px) saturate(.6) brightness(.5)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(243,239,231,.96)', padding: '34px 50px', boxShadow: '0 30px 60px rgba(0,0,0,.5)', opacity: fade(f, 6), transform: `translateY(${(1 - fade(f, 6)) * 30}px)` }}>
          <div style={{ fontFamily: F.mono, fontSize: 22, color: '#7A7266', letterSpacing: 3 }}>CONGRESSIONAL BUDGET OFFICE · DEC 2023</div>
          <div style={{ fontFamily: F.serif, fontSize: 84, color: C.ink, marginTop: 6 }}>A $17 minimum wage</div>
        </div>
      </div>
      <Archive>ARCHIVE · U.S. HOUSE · 2009</Archive>
      <Src>CBO, via SHRM and Senate HELP Committee · Footage: U.S. House (PD)</Src>
    </AbsoluteFill>
  );
};

// P6b · EVIDENCE: two numbers — 8.9 million raises, ~700,000 jobs.
const P6b: React.FC = () => {
  const f = useCurrentFrame();
  const stat = (I: any, v: string, s: string, col: string, at: number) => (
    <div style={{ textAlign: 'center', width: 640, opacity: fade(f, at), transform: `translateY(${(1 - fade(f, at)) * 30}px)` }}>
      <Ico I={I} size={80} color={col} at={at} />
      <div style={{ fontFamily: F.mono, fontSize: 150, color: col, lineHeight: 1.05, marginTop: 10 }}>{v}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, letterSpacing: 4, color: C.bone }}>{s}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 120 }}>
        {stat(Users, '8.9M', 'WORKERS GET A RAISE', GREEN, 0)}
        {stat(Briefcase, '~700,000', 'JOBS COULD DISAPPEAR', C.red, rel(1080, 960))}
      </div>
      <Src>CBO average estimate (median 500,000) · via SHRM</Src>
    </AbsoluteFill>
  );
};

// P7 · WORLD + real money: Jake's math, +$6,800 a year.
const P7: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const hit = rel(1360, 1167);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.2 + 0.04 * t})` }}><World blur={9} /></div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(12,13,16,.85) 65%)' }} />
      <LiveJake pose="stand" seed="p7" beats={[{ at: 6, r: 'think', hold: hit - 10 }, { at: hit, r: 'cheer', hold: 40 }, { at: hit, r: 'smile' }]} style={{ position: 'absolute', left: 200, top: 120, height: 1000 }} />
      <div style={{ position: 'absolute', right: 130, top: 230, width: 760 }}>
        <Label at={0} color={C.steel}>Put that on Jake</Label>
        <div style={{ fontFamily: F.mono, fontSize: 46, color: C.bone, marginTop: 20, whiteSpace: 'nowrap', opacity: fade(f, rel(1230, 1167)) }}>($17 − $13.73) × 2,080 h</div>
        <div style={{ position: 'relative', height: 0 }}>
          {[0, 1, 2, 3].map((i) => (
            <Note key={i} v={100} w={300} style={{ position: 'absolute', right: i * 16, top: 20 + i * 8, rotate: `${-6 + i * 4}deg`, opacity: fade(f, hit + i * 3, 8) }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 40 }}><Ico I={Banknote} size={70} color={GREEN} at={hit} /><Slam text="+$6,800" color={GREEN} size={170} at={hit} /></div>
        <div style={{ fontFamily: F.sans, fontSize: 30, color: C.bone, opacity: fade(f, hit + 10) }}>a year · if Congress passed $17</div>
      </div>
      <Wallet value={f > hit + 10 ? '+$1,440 +$6,800 − ?' : '+$1,440 − ?'} />
      <Illus />
    </AbsoluteFill>
  );
};

// P8 · WORLD: if his job survives — the diner sign flips to CLOSED.
const P8: React.FC = () => {
  const f = useCurrentFrame();
  const closed = f > 14;
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, transform: 'scale(1.25)', transformOrigin: '50% 70%' }}>
        <Sky horizon={600} /><Skyline base={640} />
        <Diner x={640} base={800} s={1.4} />
        <Street walkY={800} roadY={930} />
        <LightWrap />
      </svg>
      {closed && <div style={{ position: 'absolute', left: 1060, top: 650, background: '#fff', border: `6px solid ${C.red}`, padding: '10px 26px', fontFamily: F.sans, fontWeight: 900, fontSize: 54, color: C.red, letterSpacing: 4, transform: `rotate(-6deg) scale(${0.8 + 0.2 * fade(f, 14, 8)})` }}>CLOSED</div>}
      <LiveJake pose="stand" seed="p8" beats={[{ at: 16, r: 'worry' }]} style={{ position: 'absolute', left: 220, top: 260, height: 860 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 84, color: '#fff', textShadow: '0 4px 24px rgba(0,0,0,.6)', opacity: fade(f, 2) }}>If his job survives.</div>
      <Illus />
    </AbsoluteFill>
  );
};

// P9 · SPLIT SCREEN: winners and losers — both real.
const P9: React.FC = () => {
  const f = useCurrentFrame();
  const side = (x: number, I: any, col: string, txt: string, at: number) => (
    <div style={{ position: 'absolute', left: x, top: 0, width: 960, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: fade(f, at) }}>
      <Ico I={I} size={120} color={col} at={at} />
      <div style={{ fontFamily: F.serif, fontSize: 110, color: C.bone, marginTop: 14 }}>{txt}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 960, height: 1080, background: 'linear-gradient(160deg, #183324, #0E1612)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 960, height: 1080, background: 'linear-gradient(200deg, #3A1C1A, #1A0F0E)' }} />
      {side(0, TrendingUp, GREEN, 'Winners', 0)}
      {side(960, Store, C.red, 'Losers', 10)}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 30, letterSpacing: 8, color: C.amber, opacity: fade(f, rel(1553, 1503)) }}>BOTH REAL</div>
    </AbsoluteFill>
  );
};

// P10 · EXPLAINER over real archive footage (Michigan assembly line): Michigan got most of the way.
const P10: React.FC = () => {
  const f = useCurrentFrame();
  const fill = fade(f, rel(1680, 1593), 30);
  const pct = ((15 - 7.25) / (17 - 7.25)) * 100;
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 160], [1.05, 1.12], clamp)})` }}>
        <Video src={A('footage/v09_ford_assembly_1927.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.3) brightness(.4)' }} />
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 300 }}>
        <Label at={0} color={C.amber}>The twist for Jake</Label>
        <div style={{ fontFamily: F.serif, fontSize: 80, color: C.bone, marginTop: 10 }}>Michigan already got most of the way.</div>
        <div style={{ position: 'relative', height: 40, background: 'rgba(236,231,222,.15)', marginTop: 60 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 40, width: `${pct * fill}%`, background: C.amber }} />
          <div style={{ position: 'absolute', left: `${pct}%`, top: -14, width: 3, height: 68, background: '#fff', opacity: fill }} />
        </div>
        <div style={{ position: 'relative', height: 60, marginTop: 14, fontFamily: F.mono, fontSize: 34, color: C.bone }}>
          <span style={{ position: 'absolute', left: 0 }}>$7.25 federal</span>
          <span style={{ position: 'absolute', left: `${pct}%`, transform: 'translateX(-50%)', color: C.amber, opacity: fill }}>$15 Michigan (Jan 2027)</span>
          <span style={{ position: 'absolute', right: 0 }}>$17</span>
        </div>
      </div>
      <Archive>ARCHIVE · DETROIT ASSEMBLY LINE · 1927</Archive>
      <Src>CBS Detroit · Footage: National Archives (public domain)</Src>
    </AbsoluteFill>
  );
};

// P11 · METER: file three score — small for Jake in Michigan, big for a Jake in Texas.
const P11: React.FC = () => {
  const f = useCurrentFrame();
  const col = (state: string, size: string, h: number, c: string, at: number) => (
    <div style={{ textAlign: 'center', opacity: fade(f, at) }}>
      <div style={{ fontFamily: F.serif, fontSize: 70, color: c }}>{size}</div>
      <div style={{ width: 260, height: interpolate(f, [at, at + 18], [0, h], { ...clamp, easing: ease }), background: c, margin: '14px auto 0' }} />
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, letterSpacing: 4, color: C.bone, marginTop: 16 }}>{state}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30 }}><Ico I={Banknote} size={50} color={C.steel} /><Label at={0} color={C.steel}>File 03 · Paycheck · if $17 passed</Label></div>
      <div style={{ display: 'flex', gap: 160, alignItems: 'flex-end', height: 560 }}>
        {col('JAKE · MICHIGAN', 'small', 120, C.amber, rel(1800, 1757))}
        {col('A JAKE IN TEXAS', 'big', 420, GREEN, rel(1880, 1757))}
      </div>
      <Wallet value="+$1,440 +$6,800 − ?" />
    </AbsoluteFill>
  );
};

// P12 · WORLD: the question mark is back — who pays?
const P12: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.3 + 0.05 * t})` }}><World blur={12} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.35)' }} />
      <LiveJake pose="read" seed="p12" stub="+$1,440 − ?" beats={[{ at: 4, r: 'doubt' }]} style={{ position: 'absolute', left: 520, top: 40, height: 1400 }} />
      <div style={{ position: 'absolute', left: 1240, top: 240 }}><Ico I={CircleHelp} size={130} color={C.red} at={6} /></div>
      <div style={{ position: 'absolute', left: 110, top: 170, fontFamily: F.serif, fontSize: 110, color: '#fff', textShadow: '0 4px 24px rgba(0,0,0,.6)', opacity: fade(f, rel(2028, 1956)) }}>Who pays?</div>
      <Wallet value="+$1,440 +$6,800 − ?" />
      <Illus />
    </AbsoluteFill>
  );
};

const PAY: Cut[] = [
  ['card', 0, 89, P0], ['dol', 89, 190, P1], ['1938', 190, 328, P2], ['michigan', 328, 546, P3], ['states', 546, 751, P4],
  ['question', 751, 823, P5], ['cbo', 823, 960, P6a], ['stats', 960, 1167, P6b], ['jake', 1167, 1439, P7], ['survives', 1439, 1503, P8],
  ['winners', 1503, 1593, P9], ['twist', 1593, 1757, P10], ['score', 1757, 1956, P11], ['whopays', 1956, 2060, P12],
];
const PAY_CUES: Cue[] = [[0, 'paper', 0.07], [640, 'tick', 0.05], [665, 'tick', 0.05], [1080, 'tick', 0.05], [1360, 'tick', 0.06], [1453, 'paper', 0.06]];
export const PAY_MUSIC_FROM = HEALTH_MUSIC_FROM + voFrames('vo_04') + 10;
export const FilePay: React.FC = () => <Cuts cuts={PAY} vo={VO} musicFrom={PAY_MUSIC_FROM} cues={PAY_CUES} />;
