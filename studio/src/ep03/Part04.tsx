import React from 'react';
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Activity, AppWindow, Building2, CalendarDays, Car, Flame, Globe, Radar, Radiation, Ruler, Satellite, Sun, Volume2, Wind, Zap } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { F } from '../theme';
import { Card, P } from './PaperWorld';
import { Badge, Bug, Grain, Headline, Monitor, Src, TimeChip, WhatIf, cond2 } from './StyleFrames';
import { At, Enter, PartSound, Push } from './Part01';
import { fr, partEnd, partStart, shotT, wordT } from './t';

const B = partStart('vo_03');
const END = partEnd('vo_03');
const rel = (sec: number, s0: number) => fr(sec - s0);
const sp = (f: number, at: number, fps: number, d = 15, k = 130) => spring({ frame: f - at, fps, config: { damping: d, stiffness: k } });

const Bricks: React.FC = () => <>{Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: (i % 8) * 250 - ((Math.floor(i / 8) % 2) * 125), top: Math.floor(i / 8) * 130, width: 246, height: 126, background: '#24272E', border: '2px solid #15171B' }} />)}</>;

// 23 · 4:12 — the screens white out; Jake shields his eyes
const WhiteOut: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const w = interpolate(f - at, [0, 8, 40], [0, 1, 0.85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      <Bricks />
      <Monitor x={300} y={180} w={620} h={360} src="sayed/real/nasa_iss074e0334264.jpg" label="CAM 01 · CITY" />
      <Monitor x={960} y={180} w={620} h={360} src="sayed/real/nasa_iss075e0227352.jpg" label="CAM 02 · REGION" off={200} />
      <Monitor x={300} y={570} w={620} h={300} label="CAM 03 · SIGNAL LOST" />
      <Monitor x={960} y={570} w={620} h={300} src="iran/hormuz_s04-37-716.jpg" label="FEED · IRAN" off={400} flicker />
      {[[300, 180, 620, 360], [960, 180, 620, 360], [300, 570, 620, 300], [960, 570, 620, 300]].map(([x, y, ww, hh], i) => <div key={i} style={{ position: 'absolute', left: x, top: y, width: ww, height: hh, background: '#fff', opacity: w }} />)}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(255,255,255,${w * 0.35}), transparent 70%)` }} />
      <LiveJake pose="think" seed="p4w" beats={[{ at: at, r: 'surprise', hold: 400 }]} style={{ position: 'absolute', left: 1480, top: 360, height: 780 }} />
      <WhatIf dark /><TimeChip t="04:12" label="DAY 0 · THE SHELTER" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

// 24–26 · the rings on a drawn town map; badges flip as each effect lands
type RingTimes = { fire: number; light: number; boom: number; window: number; blast: number; flat: number; heat: number; power: number; roads: number };
const cx = 760, cy = 650;
const TownMap: React.FC<{ t: RingTimes; plume?: number }> = ({ t, plume = -1 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const ring = (at: number, r: number) => r * sp(f, at, fps, 18, 70);
  const rings = [
    { at: t.fire, r: 110, c: P.ink, fill: 'rgba(246,241,228,.92)', label: 'FIREBALL', ang: -0.5 },
    { at: t.blast, r: 250, c: P.red, fill: 'rgba(180,69,47,.28)', label: 'BLAST', ang: 2.6 },
    { at: t.heat, r: 400, c: P.amber, fill: 'rgba(217,164,65,.16)', label: 'HEAT', ang: -0.75 },
  ];
  const flash = interpolate(f - t.fire, [0, 4, 24], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lightR = interpolate(f - t.light, [0, 30], [0, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boomR = interpolate(f - t.boom, [0, 60], [0, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#E4DAC0' }}>
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080">
        {Array.from({ length: 26 }).map((_, i) => Array.from({ length: 15 }).map((__, j) => <rect key={i + '-' + j} x={20 + i * 74} y={20 + j * 72} width={60} height={58} rx={6} fill={random('b' + i + j) > 0.2 ? '#D3C7A7' : '#B9C9A3'} stroke="#B8AA86" strokeWidth="2" />))}
        <path d="M -20 820 C 300 760 520 900 860 860 C 1200 820 1400 980 1940 900" fill="none" stroke="#8FA9B8" strokeWidth="60" opacity="0.9" />
        <path d="M 0 300 L 1920 420 M 1180 0 L 1060 1080" stroke={P.bone} strokeWidth="22" />
      </svg>
      {plume >= 0 && <div style={{ position: 'absolute', left: cx, top: cy - 120, width: 1150 * sp(f, plume, fps, 30, 30), height: 240, background: 'linear-gradient(90deg, rgba(90,80,70,.5), rgba(90,80,70,0))', borderRadius: '0 50% 50% 0', transformOrigin: '0 50%', transform: 'rotate(-12deg)' }} />}
      {t.light >= 0 && f > t.light && <div style={{ position: 'absolute', left: cx - lightR, top: cy - lightR, width: 2 * lightR, height: 2 * lightR, borderRadius: '50%', border: `6px solid rgba(255,244,200,${1 - lightR / 900})` }} />}
      {t.boom >= 0 && f > t.boom && [0, 40, 80].map((d, k) => <div key={k} style={{ position: 'absolute', left: cx - Math.max(0, boomR - d), top: cy - Math.max(0, boomR - d), width: 2 * Math.max(0, boomR - d), height: 2 * Math.max(0, boomR - d), borderRadius: '50%', border: `4px dashed rgba(27,34,48,${0.6 * (1 - boomR / 900)})` }} />)}
      {rings.slice().reverse().map((g) => {
        const r = ring(g.at, g.r);
        return (
          <React.Fragment key={g.label}>
            <div style={{ position: 'absolute', left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: g.fill, border: `6px solid ${g.c}` }} />
            {r > 5 && <div style={{ position: 'absolute', left: cx + Math.cos(g.ang) * r - 60, top: cy + Math.sin(g.ang) * r - 26, fontFamily: cond2, fontWeight: 700, fontSize: 38, background: P.bone, border: `4px solid ${P.ink}`, padding: '0 12px', color: P.ink, letterSpacing: 2 }}>{g.label}</div>}
          </React.Fragment>
        );
      })}
      <Badge I={Sun} x={cx + 120} y={cy - 300} at={t.fire} size={110} label="FLASH" />
      {t.window >= 0 && <Badge I={AppWindow} x={cx + 560} y={cy - 260} at={t.window} size={110} label="WINDOWS" />}
      <Badge I={Building2} x={cx - 190} y={cy + 40} at={t.flat} hit={t.flat + 10} />
      <Badge I={Flame} x={cx - 470} y={cy - 170} at={t.heat + 10} size={100} label="FIRES" />
      <Badge I={Zap} x={cx + 330} y={cy + 120} at={t.power} hit={t.power + 8} label="POWER OUT" />
      <Badge I={Car} x={cx - 330} y={cy + 200} at={t.roads} hit={t.roads + 8} label="ROADS STOP" />
      <AbsoluteFill style={{ background: '#fff', opacity: flash }} />
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 230, background: P.ink }} />
      <Src style={{ left: 420, bottom: 30, background: 'rgba(246,241,228,.9)', padding: '2px 8px' }}>Illustration · ring sizes depend on weapon yield (Glasstone & Dolan, The Effects of Nuclear Weapons, 1977)</Src>
      <WhatIf dark /><Bug left />
      <Grain k={0.04} />
    </AbsoluteFill>
  );
};

const RingsScene: React.FC<{ t: RingTimes; heads: [number, string, string][] }> = ({ t, heads }) => {
  const f = useCurrentFrame();
  const cur = heads.filter(([at]) => f >= at).pop() ?? heads[0];
  return (
    <AbsoluteFill>
      <TownMap t={t} />
      <Headline key={cur[1]} kicker={cur[2]} dark x={70} y={100} size={88} at={cur[0]}>{cur[1]}</Headline>
      <div style={{ position: 'absolute', right: 60, bottom: 60, width: 420, height: 300, background: '#1A1C21', border: `5px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.3)', overflow: 'hidden' }}>
        <LiveJake pose="stand" seed="p4pip" beats={[{ at: t.fire, r: 'surprise', hold: 40 }, { at: t.fire + 45, r: 'worry', hold: 2000 }]} style={{ position: 'absolute', left: 100, top: 10, height: 620 }} />
        <div style={{ position: 'absolute', left: 10, top: 8, fontFamily: F.mono, fontSize: 18, color: '#cfd6e2' }}>JAKE · SHELTER · 04:12</div>
      </div>
    </AbsoluteFill>
  );
};

// 26a · the world hears it: seismograph + stations lighting up
const Sensors: React.FC<{ at: number; worldAt: number }> = ({ at, worldAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pts = Array.from({ length: 34 }).map((_, i) => [random('sx' + i), random('sy' + i)]);
  const wave = Array.from({ length: 120 }).map((_, i) => {
    const x = i * 14; const k = i - (f - at) * 2 + 60;
    const amp = k > 0 && k < 40 ? Math.sin(k * 1.3) * (40 - k) * 4 : Math.sin(i * 0.9 + f * 0.3) * 3;
    return `${i ? 'L' : 'M'} ${160 + x} ${880 + amp}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{ background: P.ink }}>
      <div style={{ position: 'absolute', left: 960 - 330, top: 330 - 290, width: 660, height: 660, borderRadius: '50%', border: `6px solid rgba(246,241,228,.5)`, background: 'radial-gradient(circle at 35% 35%, #2A3550, #121826)' }} />
      {pts.map(([x, y], i) => {
        const a = Math.atan2(y - 0.5, x - 0.5), r = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2) * 2;
        if (r > 1) return null;
        const s = sp(f, at + 6 + i * 2, fps, 10, 200);
        return <div key={i} style={{ position: 'absolute', left: 960 + Math.cos(a) * r * 300 - 9, top: 370 + Math.sin(a) * r * 300 - 9, width: 18, height: 18, borderRadius: 9, background: P.amber, transform: `scale(${s})`, boxShadow: `0 0 16px ${P.amber}` }} />;
      })}
      <svg style={{ position: 'absolute', inset: 0 }} width="1920" height="1080"><path d={wave} fill="none" stroke={P.amber} strokeWidth={6} /></svg>
      <Badge I={Activity} x={200} y={250} at={at} size={150} label="SEISMIC" />
      <Badge I={Radar} x={1720} y={250} at={at + 12} size={150} label="STATIONS" />
      {f > worldAt && <Badge I={Globe} x={1720} y={620} at={worldAt} size={150} label="THE WORLD KNOWS" />}
      <Headline kicker="WITHIN MINUTES" dark x={90} y={720} size={84} at={at}>Sensors hear it</Headline>
      <Src dark style={{ left: 90, bottom: 30 }}>Network built to detect nuclear tests (CTBTO International Monitoring System) ⚠ confirm · stations illustrative</Src>
      <WhatIf dark /><Bug dark /><Grain k={0.05} />
    </AbsoluteFill>
  );
};

// 27 · real 1946 test film, full frame
const Baker: React.FC<{ realAt: number }> = ({ realAt }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Push to={1.08} dur={220}><OffthreadVideo src={staticFile('iran/crossroads_baker_1946.mp4')} muted trimBefore={fr(5)} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.25) contrast(1.08)' }} /></Push>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,.6) 100%)' }} />
    <Badge I={Ruler} x={200} y={250} at={0} size={150} label="DEPENDS ON SIZE" />
    <Card x={1380} y={160} at={realAt} size={46}>Real U.S. test · Bikini Atoll · 1946</Card>
    <Src dark style={{ left: 90, bottom: 40 }}>"Baker" test, 25 Jul 1946 · Operation Crossroads (1949), U.S. govt film · public domain</Src>
    <WhatIf dark /><Bug dark /><Grain k={0.06} />
  </AbsoluteFill>
);

// 28 · fallout plume downwind + real 1963 civil-defence animation as a print
const Fallout: React.FC<{ t: RingTimes; plume: number; radAt: number; daysAt: number }> = ({ t, plume, radAt, daysAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = sp(f, radAt, fps, 15, 120);
  return (
    <AbsoluteFill>
      <TownMap t={{ ...t, fire: -999, blast: -999, heat: -999, flat: -999, power: -999, roads: -999, light: -1, boom: -1, window: -1 }} plume={plume} />
      <Headline kicker="GROUND BURST" dark x={70} y={100} size={88} at={0}>Dust comes back down</Headline>
      <Badge I={Wind} x={1500} y={330} at={plume} size={130} label="DOWNWIND" />
      <Badge I={Radiation} x={1250} y={560} at={radAt} size={130} label="RADIATION" />
      <Badge I={CalendarDays} x={1600} y={620} at={daysAt} size={120} label="FOR DAYS" />
      <div style={{ position: 'absolute', left: 120, top: 640, width: 520, transform: `rotate(-2deg) translateY(${(1 - s) * 60}px)`, opacity: s, background: P.bone, padding: 12, paddingBottom: 44, border: `4px solid ${P.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.25)' }}>
        <div style={{ height: 290, overflow: 'hidden', border: `2px solid ${P.ink}` }}><OffthreadVideo src={staticFile('iran/footage/af1963_cloud_fallout.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        <div style={{ position: 'absolute', left: 14, bottom: 12, fontFamily: F.mono, fontSize: 15, color: P.ink }}>"About Fallout" (1963), U.S. Office of Civil Defense · PD</div>
      </div>
    </AbsoluteFill>
  );
};

// 29 · myth: every car dies? → only for a burst high above the atmosphere
const CarMyth: React.FC<{ mythAt: number; highAt: number }> = ({ mythAt, highAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const st = sp(f, mythAt, fps, 9, 200);
  const hi = sp(f, highAt, fps, 16, 100);
  return (
    <AbsoluteFill style={{ background: P.paper }}>
      <Headline kicker="MYTH CHECK" x={90} y={90} size={110}>Every car dies?</Headline>
      <Badge I={Car} x={420} y={560} at={0} size={240} />
      {f > mythAt && <div style={{ position: 'absolute', left: 420, top: 560, transform: `translate(-50%,-50%) scale(${2 - st}) rotate(-12deg)`, opacity: st, border: `9px solid ${P.red}`, padding: '4px 30px', fontFamily: cond2, fontWeight: 700, fontSize: 110, color: P.red, letterSpacing: 8 }}>MYTH</div>}
      <div style={{ position: 'absolute', left: 900, top: 240, width: 900, height: 640, opacity: hi }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 220, height: 6, background: P.ink, opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: 10, top: 180, fontFamily: F.mono, fontSize: 24, color: '#6b6250' }}>TOP OF THE ATMOSPHERE</div>
        <Badge I={Satellite} x={650} y={100} at={highAt} size={140} label="HIGH-ALTITUDE BURST" />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, height: 10, background: '#8B7F62' }} />
        <Badge I={Volume2} x={240} y={520} at={highAt + 10} size={120} label="THIS SCENARIO: GROUND" />
      </div>
      <Src style={{ left: 90, bottom: 40 }}>Electromagnetic pulse over a wide area needs a burst high above the atmosphere (Glasstone & Dolan, ch. 11) ⚠ confirm</Src>
      <WhatIf /><Bug /><Grain k={0.04} />
    </AbsoluteFill>
  );
};

// 30 · back to Jake: 8,000 miles away, the siren is still going
const StillGoing: React.FC<{ milesAt: number; sirenAt: number }> = ({ milesAt, sirenAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pulse = (Math.sin(f / 6) + 1) / 2;
  return (
    <AbsoluteFill style={{ background: '#1A1C21' }}>
      <Bricks />
      <AbsoluteFill style={{ background: `rgba(180,69,47,${0.08 + pulse * 0.12})` }} />
      <LiveJake pose="stand" seed="p4end" beats={[{ at: 0, r: 'worry', hold: 400 }]} face={{ lookY: -0.7 }} style={{ position: 'absolute', left: 1180, top: 220, height: 880 }} />
      <div style={{ position: 'absolute', left: 140, top: 330, fontFamily: F.serif, fontSize: 200, color: P.bone, opacity: sp(f, milesAt, fps) }}>8,000 mi</div>
      <div style={{ position: 'absolute', left: 150, top: 560, fontFamily: F.sans, fontWeight: 700, fontSize: 52, color: P.bone, opacity: sp(f, milesAt + 8, fps) }}>from Jake's city</div>
      {f > sirenAt && <Badge I={Volume2} x={330} y={800} at={sirenAt} size={150} label="STILL GOING" />}
      <WhatIf dark /><TimeChip t="04:14" label="DAY 0 · THE SHELTER" dark /><Bug dark /><Grain />
    </AbsoluteFill>
  );
};

export const EP03Part04: React.FC = () => {
  const s = (id: string) => shotT(id);
  const R0 = s('24');
  const t: RingTimes = {
    fire: rel(wordT('24', 'flash'), R0), light: rel(wordT('24a', 'light'), R0), boom: rel(wordT('24a', 'boom'), R0), window: rel(wordT('24a', 'window'), R0),
    blast: rel(wordT('25', 'wall'), R0), flat: rel(wordT('25', 'flattens'), R0), heat: rel(wordT('26', 'heat'), R0), power: rel(wordT('26', 'power'), R0), roads: rel(wordT('26', 'roads'), R0),
  };
  const heads: [number, string, string][] = [[0, 'A flash', 'RING 1 · THE FIRST 10 SECONDS'], [rel(s('24a'), R0), 'Light before sound', 'THE NEAREST TOWN'], [rel(s('25'), R0), 'A wall of air', 'BLAST'], [rel(s('26'), R0), 'Then heat', 'FIRES']];
  const P28 = s('28');
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <At base={B} from={s('23')} to={R0} name="23 whiteout"><Enter kind="fade" dur={8}><WhiteOut at={rel(wordT('23', 'carried'), s('23'))} /></Enter></At>
      <At base={B} from={R0} to={s('26a')} name="24-26 rings"><Enter kind="fade" dur={6}><RingsScene t={t} heads={heads} /></Enter></At>
      <At base={B} from={s('26a')} to={s('27')} name="26a sensors"><Enter kind="zoom"><Sensors at={rel(wordT('26a', 'sensors'), s('26a'))} worldAt={rel(wordT('26a', 'knows'), s('26a'))} /></Enter></At>
      <At base={B} from={s('27')} to={P28} name="27 baker"><Enter kind="zoom"><Baker realAt={rel(wordT('27', 'real'), s('27'))} /></Enter></At>
      <At base={B} from={P28} to={s('29')} name="28 fallout"><Enter kind="fade"><Fallout t={t} plume={rel(wordT('28', 'dust'), P28)} radAt={rel(wordT('28', 'radiation'), P28)} daysAt={rel(wordT('28', 'days'), P28)} /></Enter></At>
      <At base={B} from={s('29')} to={s('30')} name="29 myth"><Enter kind="slideL"><CarMyth mythAt={rel(wordT('29', 'die'), s('29'))} highAt={rel(wordT('29', 'high'), s('29'))} /></Enter></At>
      <At base={B} from={s('30')} to={END} name="30 still going"><Enter kind="zoom"><StillGoing milesAt={rel(wordT('30', 'miles'), s('30'))} sirenAt={rel(wordT('30', 'siren'), s('30'))} /></Enter></At>
      <Sequence from={fr(wordT('30', 'siren') - B)} layout="none"><Audio src={staticFile('iran/sfx/siren_distant.wav')} volume={0.22} /></Sequence>
      <PartSound base={B} cues={[[wordT('26a', 'sensors'), 'tick', 0.06], [s('27'), 'paper', 0.06], [wordT('29', 'die'), 'paper', 0.07]]} />
    </AbsoluteFill>
  );
};
export const EP03_P4_FRAMES = fr(END - B);
