import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, CalendarDays, Crosshair, Droplet, Gavel, Landmark, MapPin, PenLine, Route, Vote, X, Check } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Card, P } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Print, Src, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound, Push } from './Part01';
import { Flag, FlagLabel } from './Real';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_01');
const END = partEnd('vo_01');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

// --- 8 · Calendar flip → strike markers → "Congress never voted"
const Calendar: React.FC<{ date: string; sub: string; at?: number; x?: number; y?: number; size?: number }> = ({ date, sub, at = 0, x = 960, y = 470, size = 1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, at, fps, 13, 150);
  const flip = interpolate(f - at, [0, 12], [-90, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s * size})`, perspective: 800 }}>
      <div style={{ width: 420, background: P.bone, border: `6px solid ${P.ink}`, boxShadow: '14px 14px 0 rgba(0,0,0,.3)', transform: `rotateX(${flip}deg)`, transformOrigin: '50% 0' }}>
        <div style={{ background: P.red, borderBottom: `6px solid ${P.ink}`, padding: '10px 0', textAlign: 'center', fontFamily: cond2, fontWeight: 700, fontSize: 48, color: P.bone, letterSpacing: 6 }}>{sub}</div>
        <div style={{ textAlign: 'center', fontFamily: F.serif, fontSize: 230, color: P.ink, lineHeight: 1.1 }}>{date}</div>
      </div>
    </div>
  );
};

const WarStart: React.FC<{ strikeAt: number; congAt: number }> = ({ strikeAt, congAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const mapIn = sp(f, strikeAt, fps, 18, 90);
  const calX = interpolate(mapIn, [0, 1], [960, 330]);
  const calS = interpolate(mapIn, [0, 1], [1, 0.62]);
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <div style={{ position: 'absolute', inset: 0, opacity: mapIn }}>
        <Push from={1.2} to={1.1} dur={240}><Img src={staticFile('iran/hormuz_s04-37-716.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.5) saturate(.6) brightness(.7)' }} /></Push>
        {[[700, 330], [880, 470], [1120, 360], [1300, 560]].map(([x, y], i) => {
          const s = sp(f, strikeAt + 6 + i * 6, fps, 10, 170);
          return <div key={i} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})` }}>
            <div style={{ width: 120, height: 120, borderRadius: 60, border: `5px solid ${P.red}`, opacity: 0.6 * (1 - ((f / 30 + i / 4) % 1)), transform: `scale(${1 + ((f / 30 + i / 4) % 1)})`, position: 'absolute', left: -60 + 46, top: -60 + 46 }} />
            <div style={{ width: 92, height: 92, borderRadius: 46, background: P.red, border: `5px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Crosshair size={52} color={P.bone} strokeWidth={2.6} /></div>
          </div>;
        })}
        <Card x={1000} y={170} at={strikeAt + 4} size={60}>U.S. strikes Iran</Card>
        <Flag c="us" w={170} x={700} y={170} at={strikeAt + 4} />
        <Flag c="ir" w={170} x={1300} y={170} at={strikeAt + 8} />
      </div>
      <Calendar date="28" sub="FEB 2026" x={calX} size={calS} />
      {f > congAt && (
        <div style={{ position: 'absolute', right: 90, bottom: 110 }}>
          <Print src="sayed/us_capitol_east_side.JPG" x={-560} y={-380} w={520} h={300} rot={2} at={congAt} />
          <div style={{ position: 'absolute', right: 0, bottom: 0, transform: `scale(${sp(f, congAt + 8, fps, 10, 170)})`, background: P.red, border: `5px solid ${P.ink}`, padding: '8px 22px', display: 'flex', gap: 10, alignItems: 'center', fontFamily: cond2, fontWeight: 700, fontSize: 52, color: P.bone, boxShadow: '8px 8px 0 rgba(0,0,0,.3)' }}><X size={52} strokeWidth={3} />NO VOTE</div>
        </div>
      )}
      <Src dark style={{ left: 70, bottom: 40 }}>Strikes: Axios, 28 Feb 2026 · markers illustrative · Capitol: M. Falbisoner, CC BY-SA 3.0 · Map: NASA</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// --- 9 + 10 · the two House votes, then "symbolic"
const VoteCard: React.FC<{ month: string; result: string; ok: boolean; score?: string; at: number; x: number }> = ({ month, result, ok, score, at, x }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, at, fps, 13, 140);
  return (
    <div style={{ position: 'absolute', left: x, top: 300, width: 640, transform: `translateY(${(1 - s) * 80}px) rotate(${ok ? 1.5 : -1.5}deg)`, opacity: s, background: P.bone, border: `6px solid ${P.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.3)', padding: '30px 36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.mono, fontSize: 30, color: '#6b6250', letterSpacing: 4 }}><Vote size={40} color={P.ink} />HOUSE VOTE · {month}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 18 }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: ok ? '#4E7A4A' : P.red, border: `5px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ok ? <Check size={76} color={P.bone} strokeWidth={3} /> : <X size={76} color={P.bone} strokeWidth={3} />}</div>
        <div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 110, color: P.ink, lineHeight: 1 }}>{result}</div>
      </div>
      {score && <div style={{ fontFamily: F.serif, fontSize: 120, color: P.ink, marginTop: 10 }}>{score}</div>}
    </div>
  );
};

const Votes: React.FC<{ marchAt: number; juneAt: number; symAt: number; onAt: number }> = ({ marchAt, juneAt, symAt, onAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const st = sp(f, symAt, fps, 9, 200);
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.22 }}><OffthreadVideo src={staticFile('sayed/footage/v05_house_gas_prices_hearing_2008.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(.6) blur(3px)' }} /></div>
      <VoteCard month="MARCH" result="FAILED" ok={false} at={marchAt} x={160} />
      <VoteCard month="JUNE" result="PASSED" ok score="215–208" at={juneAt} x={1100} />
      {f > symAt && (
        <div style={{ position: 'absolute', left: 1420, top: 760, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-10deg)`, opacity: st, border: `8px solid ${P.red}`, padding: '6px 26px', fontFamily: cond2, fontWeight: 700, fontSize: 84, color: P.red, letterSpacing: 6 }}>SYMBOLIC</div>
      )}
      {f > symAt && <Badge I={PenLine} x={600} y={830} at={symAt + 6} size={130} label="PRESIDENT'S HAND" />}
      {f > onAt && <Badge I={Route} x={960} y={830} at={onAt} size={130} label="THE WAR WENT ON" />}
      <Src style={{ left: 70, bottom: 40 }}>Background: U.S. House floor footage (house.gov, public domain) · Votes: House, Mar 2026 (failed) · 3 Jun 2026, 215–208 (NPR, Washington Post)</Src>
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// --- 11 · Qeshm Island on the real NASA photo
const Qeshm: React.FC<{ pinAt: number; remAt: number }> = ({ pinAt, remAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const z = interpolate(sp(f, pinAt - 10, fps, 22, 60), [0, 1], [1.05, 1.9]);
  const pin = sp(f, pinAt, fps, 9, 180);
  const qx = 1690, qy = 245; // Qeshm Island edge in S04-37-716 (top-right)
  return (
    <AbsoluteFill style={{ background: P.ink, overflow: 'hidden' }}>
      <AbsoluteFill style={{ transformOrigin: `${qx}px ${qy}px`, transform: `scale(${z})` }}>
        <Img src={staticFile('iran/hormuz_s04-37-716.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.45) saturate(.7) brightness(.85)' }} />
        <div style={{ position: 'absolute', left: qx, top: qy, transform: `translate(-50%,-100%) scale(${pin / z * 1.6})`, transformOrigin: '50% 100%' }}>
          <MapPin size={110} color={P.red} fill={P.bone} strokeWidth={2.4} />
        </div>
        {[0, 1].map((k) => { const r = ((f / 40 + k / 2) % 1); return <div key={k} style={{ position: 'absolute', left: qx - r * 90, top: qy - r * 90, width: r * 180, height: r * 180, borderRadius: '50%', border: `3px solid rgba(180,69,47,${(1 - r) * pin})` }} />; })}
      </AbsoluteFill>
      <Headline kicker="ELECTION WEEK · 2 NOV 2026" dark x={80} y={640} size={120} at={pinAt}>Qeshm Island</Headline>
      <FlagLabel c="ir" name="Iran" x={260} y={560} at={pinAt + 6} />
      <div style={{ position: 'absolute', left: 84, top: 830, fontFamily: F.sans, fontWeight: 700, fontSize: 48, color: P.bone, opacity: sp(f, pinAt + 10, fps) }}>Strait of Hormuz</div>
      {f > remAt && <Card x={1500} y={900} at={remAt} size={54} rot={-2}>Remember this spot</Card>}
      <Src dark style={{ left: 84, bottom: 36 }}>U.S. "defensive" strikes on Qeshm, 2 Nov 2026 (NBC, CBS, ABC, Stars and Stripes) · Map: NASA STS-4 S04-37-716, public domain</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// --- 12 · oil swings (reported Brent closes, first week of Nov 2026)
const OilChart: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pts = [[0, 113], [1, 93], [2, 100]] as const;
  const X = (i: number) => 360 + i * 600, Y = (v: number) => 860 - (v - 85) * 22;
  const prog = interpolate(f - at, [0, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d = `M ${X(0)} ${Y(113)} L ${X(1)} ${Y(93)} L ${X(2)} ${Y(100)}`;
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <Headline kicker="BRENT CRUDE · $ PER BARREL" dark x={80} y={70} size={96}>Oil: wild swings</Headline>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        {[90, 100, 110].map((v) => <g key={v}><line x1={260} x2={1700} y1={Y(v)} y2={Y(v)} stroke="rgba(246,241,228,.15)" strokeWidth={2} /><text x={200} y={Y(v) + 10} fill="rgba(246,241,228,.5)" fontFamily={F.mono} fontSize={28}>{v}</text></g>)}
        <path d={d} fill="none" stroke={P.amber} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - prog} />
      </svg>
      {pts.map(([i, v], k) => {
        const s = sp(f, at + k * 24, fps, 11, 160);
        return <div key={k} style={{ position: 'absolute', left: X(i), top: Y(v), transform: `translate(-50%,-50%) scale(${s})` }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: P.amber, border: `5px solid ${P.ink}` }} />
          <div style={{ position: 'absolute', left: '50%', top: k === 1 ? 50 : -110, transform: 'translateX(-50%)', fontFamily: F.serif, fontSize: 84, color: P.bone }}>${v}</div>
        </div>;
      })}
      <Badge I={Droplet} x={1700} y={250} at={at} size={130} label="OIL" />
      <Src dark style={{ left: 80, bottom: 40 }}>Reported Brent levels, 1–6 Nov 2026 (Gulf News, FinanceFeeds, Oilprice.com) · rounded</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// --- 12a · $29 billion counter with real (specimen) $100 notes
const Billions: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const v = interpolate(f - at, [0, 50], [0, 29], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3) });
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const s = sp(f, at + i * 4, fps, 14, 120);
        return <Img key={i} src={staticFile('sayed/money/usd100.jpg')} style={{ position: 'absolute', left: 1080 + (i % 3) * 40, top: 300 + i * 34, width: 640, transform: `translateY(${(1 - s) * -400}px) rotate(${(i % 2 ? 1 : -1) * (2 + i)}deg)`, border: `4px solid ${P.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.25)', opacity: s }} />;
      })}
      <Headline kicker="PENTAGON ESTIMATE · BY MAY 2026" x={110} y={250} size={90}>War cost so far</Headline>
      <div style={{ position: 'absolute', left: 104, top: 420, fontFamily: F.serif, fontSize: 300, color: P.ink, lineHeight: 1 }}>${v.toFixed(0)}B</div>
      <Badge I={Banknote} x={230} y={850} at={at} size={130} label="BILLION" />
      <Src style={{ left: 110, bottom: 40 }}>Pentagon acting comptroller to Congress, 12 May 2026 (≈ $29B) · Notes: U.S. Currency Education Program specimen images</Src>
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// --- 13 · 3 Nov: both chambers flip
const Flip: React.FC<{ at: number; vpAt: number }> = ({ at, vpAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const flip = (k: number) => interpolate(f - at - 12 - k * 10, [0, 14], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const Ch: React.FC<{ k: number; name: string }> = ({ k, name }) => {
    const a = flip(k); const back = a > 90;
    return <div style={{ width: 560, height: 300, transform: `rotateY(${a}deg)`, position: 'relative', transformStyle: 'preserve-3d' }}>
      <div style={{ position: 'absolute', inset: 0, background: back ? '#3F5A8C' : P.red, border: `6px solid ${P.ink}`, boxShadow: '12px 12px 0 rgba(0,0,0,.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: back ? 'rotateY(180deg)' : 'none' }}>
        <Landmark size={110} color={P.bone} strokeWidth={2.2} />
        <div style={{ fontFamily: cond2, fontWeight: 700, fontSize: 70, color: P.bone, letterSpacing: 4 }}>{name}</div>
      </div>
    </div>;
  };
  return (
    <AbsoluteFill style={{ background: P.ink, perspective: 1400 }}>
      <Calendar date="3" sub="NOV 2026" at={at} x={300} y={300} size={0.6} />
      <div style={{ position: 'absolute', left: 620, top: 220, display: 'flex', gap: 60 }}><Ch k={0} name="HOUSE" /><Ch k={1} name="SENATE" /></div>
      <div style={{ position: 'absolute', left: 620, top: 560, fontFamily: F.sans, fontWeight: 700, fontSize: 56, color: P.bone, opacity: sp(f, at + 40, fps) }}>Both chambers change hands</div>
      {f > vpAt && <div style={{ position: 'absolute', left: 620, top: 690, width: 1180, transform: `scale(${sp(f, vpAt, fps, 13, 140)})`, transformOrigin: '0 50%', background: P.bone, border: `6px solid ${P.ink}`, padding: '24px 30px', boxShadow: '12px 12px 0 rgba(0,0,0,.3)' }}>
        <div style={{ fontFamily: F.mono, fontSize: 24, color: '#6b6250', letterSpacing: 3 }}>THE VICE PRESIDENT (PARAPHRASED)</div>
        <div style={{ fontFamily: F.serif, fontSize: 64, color: P.ink, marginTop: 6 }}>The war was the reason.</div>
      </div>}
      <Badge I={Vote} x={300} y={760} at={at + 20} size={140} label="MIDTERMS" />
      <Src dark style={{ left: 80, bottom: 40 }}>Results and VP post as reported by Al Jazeera, 5 Nov 2026</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// --- 14 · Jake in the shelter; two questions
const Questions: React.FC<{ farAt: number; whoAt: number }> = ({ farAt, whoAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const Q: React.FC<{ at: number; I: any; t: string; x: number }> = ({ at, I, t, x }) => {
    const s = sp(f, at, fps, 12, 150);
    return <div style={{ position: 'absolute', left: x, top: 330, transform: `scale(${s})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 210, height: 210, borderRadius: 105, background: P.bone, border: `7px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={110} color={P.ink} strokeWidth={2.2} /></div>
      <div style={{ fontFamily: F.serif, fontSize: 96, color: P.bone }}>{t}</div>
    </div>;
  };
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      {Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: (i % 8) * 250 - ((Math.floor(i / 8) % 2) * 125), top: Math.floor(i / 8) * 130, width: 246, height: 126, background: '#24272E', border: '2px solid #15171B' }} />)}
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.55)' }} />
      <Q at={farAt} I={Route} t="How far?" x={280} />
      <Q at={whoAt} I={Gavel} t="Who decides?" x={820} />
      <LiveJake pose="think" seed="p2jake" beats={[{ at: 0, r: 'worry', hold: 120 }, { at: whoAt, r: 'doubt', hold: 400 }]} style={{ position: 'absolute', left: 1420, top: 260, height: 860 }} />
      <WhatIf dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part02: React.FC = () => {
  const t8 = shotT('8'), t9 = shotT('9'), t10 = shotT('10'), t11 = shotT('11'), t12 = shotT('12'), t12a = shotT('12a'), t13 = shotT('13'), t14 = shotT('14');
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={t8} to={t9} name="8 war start"><Enter kind="zoom"><WarStart strikeAt={rel(wordT('8', 'striking'), t8)} congAt={rel(wordT('8', 'congress'), t8)} /></Enter></At>
      <At base={B} from={t9} to={t11} name="9-10 votes"><Enter kind="slideL"><Votes marchAt={rel(wordT('9', 'march'), t9)} juneAt={rel(wordT('9', 'june'), t9)} symAt={rel(t10, t9)} onAt={rel(wordT('10', 'went'), t9)} /></Enter></At>
      <At base={B} from={t11} to={t12} name="11 qeshm"><Enter kind="zoom"><Qeshm pinAt={rel(wordT('11', 'island'), t11)} remAt={rel(wordT('11', 'remember'), t11)} /></Enter></At>
      <At base={B} from={t12} to={t12a} name="12 oil"><Enter kind="slideL"><OilChart at={rel(wordT('12', 'jumped'), t12)} /></Enter></At>
      <At base={B} from={t12a} to={t13} name="12a cost"><Enter kind="drop"><Billions at={rel(wordT('12a', 'cost'), t12a)} /></Enter></At>
      <At base={B} from={t13} to={t14} name="13 flip"><Enter kind="slideL"><Flip at={rel(wordT('13', 'voters'), t13)} vpAt={rel(wordT('13', 'vice'), t13)} /></Enter></At>
      <At base={B} from={t14} to={END} name="14 questions"><Enter kind="zoom"><Questions farAt={rel(wordT('14', 'far'), t14)} whoAt={rel(wordT('14', 'decides'), t14)} /></Enter></At>
      <PartSound base={B} cues={[[wordT('8', 'striking'), 'tick', 0.06], [wordT('9', 'march'), 'paper', 0.07], [wordT('9', 'june'), 'paper', 0.07], [wordT('11', 'island'), 'tick', 0.06], [wordT('12a', 'cost'), 'counter', 0.06], [wordT('13', 'voters'), 'paper', 0.06]]} />
    </AbsoluteFill>
  );
};
export const EP03_P2_FRAMES = fr(END - B);
