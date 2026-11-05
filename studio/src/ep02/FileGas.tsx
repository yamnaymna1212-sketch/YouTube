import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Video } from '@remotion/media';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import states from 'us-atlas/states-albers-10m.json';
import { ArrowDownRight, ArrowUpRight, CalendarDays, CalendarX, Car as CarIcon, Droplet, Factory, Fuel, Gauge, Globe2, Landmark, Smartphone, Truck } from 'lucide-react';
import { C, F } from '../theme';
import { clamp, ease } from '../ui/Film';
import { FullBody } from '../host/FullBody';
import { Car, GasStation, LightWrap, Sky, Skyline, Street, W as WC } from '../world/World';
import { PADD, padColor } from '../boards/WorldFrames';
import { Archive, Cue, Grade, HOOK_FRAMES, Ico, Label, Note, Push, Slam, Src, World, useDur } from './Hook';
import { COLD_FRAMES, Cut, Cuts, Illus, WHO_FRAMES, Wallet, t01 } from './Part1';
import { remap } from './timing';

// EP02 · FILE 01 · GAS (vo_03). Shot boundaries and in-shot beats are written in ORIGINAL-take frames
// (measured with silencedetect) and remapped onto the pause-tightened VO.
const A = (f: string) => staticFile(`sayed/${f}`);
const VO = 'vo_03';
const rel = (orig: number, shotStart: number) => remap(VO, orig) - remap(VO, shotStart);
const fade = (f: number, at: number, len = 12) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: ease });

// G0 · CARD: FILE 01 · GAS
const G0: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, justifyContent: 'center', paddingLeft: 160 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <Ico I={Fuel} size={120} color={C.red} at={2} />
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 26, color: '#7A7266', letterSpacing: 3, opacity: fade(f, 0, 8) }}>FILE 01</div>
          <div style={{ fontFamily: F.serif, fontSize: 200, color: C.ink, lineHeight: 0.95 }}>Gas</div>
        </div>
      </div>
      <div style={{ width: interpolate(f, [6, 26], [0, 300], { ...clamp, easing: ease }), height: 6, background: C.red, marginTop: 26 }} />
      <Wallet />
    </AbsoluteFill>
  );
};

// G1 · REAL PHOTO: a real pump + national average.
const G1: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Push src={A('gas_pump_indiana_usa.jpg')} from={1.05} to={1.2} origin="40% 45%" filter="brightness(.55) saturate(.85)" />
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.92), rgba(12,13,16,.4) 60%, transparent)' }} />
    <div style={{ position: 'absolute', left: 120, top: 330 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Ico I={Fuel} size={44} color={C.steel} /><Label at={0} color={C.steel}>Regular gas · U.S. average</Label></div>
      <Slam text="$4.15" color={C.amber} size={250} at={rel(150, 72)} style={{ marginTop: 10 }} />
      <Label at={rel(160, 72)} style={{ marginTop: 8 }}>per gallon · nationwide</Label>
    </div>
    <Src logo="eia.png">U.S. EIA, week of Nov 2, 2026 · Photo: Tysto (public domain)</Src>
  </AbsoluteFill>
);

// G2 · EVIDENCE: a year ago vs now.
const G2: React.FC = () => {
  const f = useCurrentFrame();
  const b = (h: number, at: number) => interpolate(f, [at, at + 18], [0, h], { ...clamp, easing: ease });
  const col = (label: string, v: string, h: number, at: number, color: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: 640 }}>
      <div style={{ fontFamily: F.mono, fontSize: 64, color, opacity: fade(f, at + 10) }}>{v}</div>
      <div style={{ width: 260, height: b(h, at), background: color, marginTop: 14 }} />
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, letterSpacing: 4, color: C.steel, marginTop: 18 }}>{label}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 120, alignItems: 'flex-end' }}>
        {col('NOV 2025', '$3.02', 302, 0, C.steel)}
        {col('NOV 2026', '$4.15', 415, 8, C.amber)}
        <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 12, opacity: fade(f, 30) }}>
          <ArrowUpRight size={90} color={C.red} strokeWidth={1.6} />
          <div style={{ fontFamily: F.mono, fontSize: 96, color: C.red }}>+$1.13</div>
        </div>
      </div>
      <Src logo="eia.png">U.S. EIA · $4.153 vs $3.019, U.S. regular</Src>
    </AbsoluteFill>
  );
};

// G3 · EXPLAINER: 52 fill-ups fill a calendar, total counts to $3,240.
const G3: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [rel(341, 287), rel(440, 287)], [0, 52], clamp));
  const total = interpolate(f, [rel(341, 287), rel(440, 287)], [0, 3240], clamp);
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <div style={{ position: 'absolute', left: 120, top: 150 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Ico I={CalendarDays} size={44} color={C.steel} /><Label at={0} color={C.steel}>One fill-up a week · $62.30</Label></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 52px)', gap: 14, marginTop: 34 }}>
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} style={{ width: 52, height: 52, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < n ? 'rgba(217,164,65,.18)' : 'rgba(236,231,222,.05)', border: `1.5px solid ${i < n ? C.amber : 'rgba(236,231,222,.12)'}` }}>
              {i < n && <Fuel size={26} color={C.amber} strokeWidth={1.6} />}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', right: 130, top: 300, textAlign: 'right' }}>
        <div style={{ fontFamily: F.mono, fontSize: 30, color: C.steel }}>52 × $62.30</div>
        <div style={{ fontFamily: F.mono, fontSize: 170, color: C.amber, lineHeight: 1.05 }}>${Math.round(total).toLocaleString('en-US')}</div>
        <Label at={rel(445, 287)}>a year on gas</Label>
      </div>
      <Src logo="eia.png">U.S. EIA weekly average × 15 gal × 52 weeks (illustrative)</Src>
    </AbsoluteFill>
  );
};

// G4 · WORLD: the same car, the same commute — last year vs this year.
const G4: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <Sky horizon={620} /><Skyline base={660} seed={14} />
        <Street walkY={760} roadY={820} />
        <LightWrap />
      </svg>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <Car x={-200 + 2100 * t} base={1000} s={1.05} color="#6E8FA8" />
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center', gap: 60 }}>
        {[['LAST YEAR', '$2,355', C.steel, 0], ['THIS YEAR', '$3,240', C.amber, 10]].map(([l, v, c, at]) => (
          <div key={l as string} style={{ background: 'rgba(12,13,16,.85)', padding: '22px 36px', borderTop: `4px solid ${c}`, opacity: fade(f, at as number), minWidth: 360 }}>
            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 20, letterSpacing: 4, color: C.steel }}>{l}</div>
            <div style={{ fontFamily: F.mono, fontSize: 84, color: c as string }}>{v}</div>
          </div>
        ))}
        <div style={{ alignSelf: 'center', fontFamily: F.mono, fontSize: 84, color: C.red, background: 'rgba(12,13,16,.85)', padding: '14px 28px', opacity: fade(f, 24) }}>+$885</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 56, color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,.5)', opacity: fade(f, rel(530, 462)) }}>
        <CarIcon size={44} color="#fff" strokeWidth={1.6} style={{ verticalAlign: 'middle', marginRight: 16 }} />same car · same commute
      </div>
      <Illus />
    </AbsoluteFill>
  );
};

// G5 · REAL DATA MAP: regions light up on the words.
const G5: React.FC = () => {
  const f = useCurrentFrame();
  const geo = feature(states as any, (states as any).objects.states) as any;
  const path = geoPath();
  const lit: Record<string, number> = { 'West Coast': rel(695, 632), 'Gulf Coast': rel(756, 632), Midwest: rel(823, 632) };
  const labels: [string, string, number, number][] = [['West Coast', '$5.30', 70, 330], ['Gulf Coast', '$3.64', 470, 480], ['Midwest', '$4.10', 560, 240]];
  return (
    <AbsoluteFill style={{ background: '#0E1116' }}>
      <svg width={1560} height={1000} viewBox="-60 -80 1100 720" style={{ position: 'absolute', left: 0, top: 60 }}>
        {geo.features.map((g: any) => {
          const n = g.properties.name; const [region, v] = PADD[n] ?? ['', 4];
          const at = lit[region];
          const on = at !== undefined ? fade(f, at, 10) : 0;
          return <path key={n} d={path(g) || ''} fill={on ? padColor(v) : '#2A2E36'} fillOpacity={0.35 + 0.65 * on} stroke="#0E1116" strokeWidth={0.8} />;
        })}
        {geo.features.filter((g: any) => g.properties.name === 'Michigan').map((g: any) => <path key="mi" d={path(g) || ''} fill="none" stroke="#fff" strokeWidth={2.5} opacity={fade(f, lit.Midwest)} />)}
        <g fontFamily="Inter, sans-serif" fontWeight={700} fill="#fff" fontSize={20}>
          {labels.map(([r, v, x, y]) => <text key={r} x={x} y={y} opacity={fade(f, lit[r])}>{r.toUpperCase()} {v}</text>)}
        </g>
      </svg>
      <div style={{ position: 'absolute', right: 90, top: 150, width: 440 }}>
        <Label at={0} color={C.steel}>Regular gas, by region</Label>
        <div style={{ fontFamily: F.serif, fontSize: 66, color: C.bone, lineHeight: 1.05, marginTop: 8 }}>Where you live changes the bill.</div>
        <div style={{ marginTop: 40, fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: C.bone, opacity: fade(f, lit.Midwest) }}>Michigan · Jake lives here</div>
      </div>
      <Src logo="eia.png">U.S. EIA, week of Nov 2, 2026 · Map: U.S. Census (us-atlas)</Src>
    </AbsoluteFill>
  );
};

// G6a · REAL SCREEN: EIA's own chart — "what most people don't know".
const G6a: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ background: '#fff', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Img src={A('screens/eia_what_we_pay_per_gallon.png')} style={{ height: 980, transform: `scale(${1 + 0.12 * t})`, transformOrigin: '75% 55%' }} />
      <Src dark logo="eia.png">U.S. EIA · Gasoline explained (screenshot, Nov 5, 2026)</Src>
    </AbsoluteFill>
  );
};

// G6b · REAL FOOTAGE (archive 1975): a pumpjack — crude oil ≈ half, set on a global market.
const G6b: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 140], [1.05, 1.14], clamp)})` }}>
        <Video src={A('footage/v01_pumpjack_1975.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.8) contrast(1.05) brightness(.7)' }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.9), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 330 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Ico I={Droplet} size={48} color={C.amber} /><Label at={0} color={C.amber}>Crude oil</Label></div>
        <Slam text="≈ 51%" color={C.bone} size={200} at={rel(1000, 961)} style={{ marginTop: 10 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, opacity: fade(f, rel(1050, 961)) }}>
          <Globe2 size={34} color={C.bone} strokeWidth={1.6} />
          <span style={{ fontFamily: F.sans, fontSize: 30, color: C.bone }}>set on a global market</span>
        </div>
      </div>
      <Archive>ARCHIVE · 1975</Archive>
      <Src logo="eia.png">EIA 2025 average · Footage: Prelinger Archives (public domain)</Src>
    </AbsoluteFill>
  );
};

// G6c · EXPLAINER: one gallon, four parts — the other half ≈ a sixth each.
const PARTS: [string, number, string, any, number][] = [
  ['Crude oil', 51.4, '#3B82C4', Droplet, 0], ['Refining', 14.3, '#D9A441', Factory, 1162], ['Getting it to the station', 17.8, '#5E9A5A', Truck, 1187], ['Taxes', 16.6, '#C2703A', Landmark, 1225],
];
const G6c: React.FC = () => {
  const f = useCurrentFrame();
  let acc = 0;
  return (
    <AbsoluteFill style={{ background: C.graphite }}>
      <div style={{ position: 'absolute', left: 220, top: 110, width: 300, height: 860, border: '6px solid #8B93A1', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse' }}>
        {PARTS.map(([name, pct, col, , at], i) => {
          const o = i === 0 ? 1 : fade(f, rel(at, 1100));
          return <div key={name} style={{ height: `${pct * o}%`, background: col, borderTop: i ? '3px solid #17191E' : 'none' }} />;
        })}
      </div>
      <div style={{ position: 'absolute', left: 620, top: 150 }}>
        {PARTS.slice().reverse().map(([name, pct, col, I, at]) => {
          const o = at === 0 ? 1 : fade(f, rel(at, 1100));
          return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 26, marginBottom: 54, opacity: o, transform: `translateX(${(1 - o) * 30}px)` }}>
              <I size={64} color={col} strokeWidth={1.5} />
              <div style={{ fontFamily: F.mono, fontSize: 64, color: col, width: 220 }}>{pct.toFixed(1)}%</div>
              <div style={{ fontFamily: F.serif, fontSize: 60, color: C.bone }}>{name}</div>
            </div>
          );
        })}
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 64, color: C.amber, marginTop: 20, opacity: fade(f, rel(1256, 1100)) }}>The other half: roughly a sixth each.</div>
      </div>
      <Src logo="eia.png">U.S. EIA · what a gallon of regular paid for, 2025 average ($3.10/gal)</Src>
    </AbsoluteFill>
  );
};

// G7 · REAL PHOTOS (archive 1973): the oil embargo — the world sets the price.
const G7: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const second = f > d * 0.5;
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {second
        ? <Push src={A('real/doc13_after-hours-in-a-gasoline-line.jpg')} from={1.08} to={1.16} filter="saturate(.85) brightness(.7)" />
        : <Push src={A('real/doc01_gas-station-attendants-peer-over.jpg')} from={1.1} to={1.2} origin="65% 60%" filter="saturate(.85) brightness(.7)" />}
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.9), transparent 55%)' }} />
      <div style={{ position: 'absolute', left: 120, bottom: 150 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Ico I={Globe2} size={60} color={C.amber} /><div style={{ fontFamily: F.serif, fontSize: 96, color: C.bone }}>Priced by the world.</div></div>
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 60, color: C.amber, marginTop: 6, opacity: fade(f, 20) }}>Not by the White House.</div>
      </div>
      <Archive>ARCHIVE · 1973–74 OIL EMBARGO</Archive>
      <Src>EPA DOCUMERICA / National Archives (public domain)</Src>
    </AbsoluteFill>
  );
};

// G8 · EXPLAINER: no president has a dial for gas prices.
const G8: React.FC = () => {
  const f = useCurrentFrame();
  const needle = interpolate(f, [0, 40, 70, 110], [-60, 40, -20, 10], clamp);
  const x = fade(f, rel(1490, 1410));
  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 420, height: 420 }}>
        <Gauge size={420} color={C.ink} strokeWidth={1.1} style={{ position: 'absolute', inset: 0, transform: `rotate(${needle * 0.15}deg)` }} />
        <svg width={420} height={420} style={{ position: 'absolute', inset: 0 }}>
          <line x1={40} y1={40} x2={40 + 340 * x} y2={40 + 340 * x} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 80, color: C.ink, marginTop: 30 }}>No president has a dial</div>
      <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 60, color: C.red }}>for gas prices.</div>
    </AbsoluteFill>
  );
};

// G9 · REAL FOOTAGE (archive 1977): presidential energy address — policy moves prices over years.
const G9: React.FC = () => {
  const f = useCurrentFrame();
  const dir = fade(f, rel(1712, 1563));
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 190], [1.04, 1.12], clamp)})` }}>
        <Video src={A('footage/v02_carter_energy_1977.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.8) contrast(1.05) brightness(.62)' }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.9), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 330, width: 820 }}>
        <Label at={0} color={C.amber}>What a president can do</Label>
        <div style={{ fontFamily: F.serif, fontSize: 84, color: C.bone, lineHeight: 1.05, marginTop: 10 }}>Push energy policy.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 30, opacity: fade(f, rel(1660, 1563)) }}>
          <CalendarDays size={44} color={C.bone} strokeWidth={1.6} />
          <span style={{ fontFamily: F.sans, fontSize: 34, color: C.bone }}>moves prices over years</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, opacity: dir }}>
          <ArrowUpRight size={54} color={C.red} strokeWidth={1.6} /><ArrowDownRight size={54} color="#5E9A5A" strokeWidth={1.6} />
          <span style={{ fontFamily: F.sans, fontSize: 34, color: C.bone }}>in either direction</span>
        </div>
      </div>
      <Archive>ARCHIVE · PRESIDENT CARTER · ENERGY ADDRESS · 1977</Archive>
      <Src>U.S. National Archives (public domain)</Src>
    </AbsoluteFill>
  );
};

// G10 · KINETIC: not by next week.
const G10: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center' }}>
    <Ico I={CalendarX} size={110} color={C.red} at={0} />
    <div style={{ fontFamily: F.serif, fontSize: 150, color: C.bone, marginTop: 10 }}>Not by next week.</div>
  </AbsoluteFill>
);

// G11 · METER: file one score.
const G11: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><Ico I={Fuel} size={60} color={C.steel} /><Label at={0} color={C.steel}>File 01 · Gas · Jake's wallet</Label></div>
      <div style={{ fontFamily: F.mono, fontSize: 260, color: C.steel, opacity: fade(f, rel(1879, 1814)), marginTop: 10 }}>≈ $0</div>
      <div style={{ fontFamily: F.sans, fontSize: 28, color: 'rgba(236,231,222,.6)', opacity: fade(f, rel(1890, 1814)) }}>a president barely moves this one</div>
      <Wallet value="≈ $0" />
    </AbsoluteFill>
  );
};

// G12 · WORLD: Jake's phone buzzes — the bill he never thinks about (tease for File 02).
const G12: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const n = fade(f, rel(1970, 1924));
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.2 + 0.05 * t})` }}><World blur={8} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.35)' }} />
      <FullBody pose="stand" face={{ look: interpolate(f, [0, 40], [0, 0.6], clamp), brow: 0.6, smile: 0 }} style={{ position: 'absolute', left: 300, top: 160, height: 1000 }} />
      <div style={{ position: 'absolute', right: 160, top: 300, width: 640, background: 'rgba(244,242,238,.97)', borderRadius: 26, padding: '26px 30px', boxShadow: '0 30px 70px rgba(0,0,0,.5)', opacity: n, transform: `translateY(${(1 - n) * -40}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.sans, fontWeight: 600, fontSize: 22, color: '#666' }}><Smartphone size={24} color="#666" strokeWidth={1.8} />PAYROLL · now</div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 34, color: '#222', marginTop: 8 }}>Health insurance −$55.38</div>
        <div style={{ fontFamily: F.sans, fontSize: 24, color: '#666', marginTop: 4 }}>deducted from this paycheck</div>
      </div>
      <Wallet value="≈ $0" />
      <Illus />
    </AbsoluteFill>
  );
};

const GAS: Cut[] = [
  ['card', 0, 72, G0], ['pump', 72, 200, G1], ['yoy', 200, 287, G2], ['calendar', 287, 462, G3], ['commute', 462, 632, G4],
  ['map', 632, 893, G5], ['eia', 893, 961, G6a], ['crude', 961, 1100, G6b], ['gallon', 1100, 1313, G6c], ['embargo', 1313, 1410, G7],
  ['dial', 1410, 1563, G8], ['policy', 1563, 1755, G9], ['week', 1755, 1814, G10], ['score', 1814, 1924, G11], ['phone', 1924, 2105, G12],
];
const GAS_CUES: Cue[] = [ // soft only
  [0, 'paper', 0.07], [695, 'tick', 0.05], [756, 'tick', 0.05], [823, 'tick', 0.05],
  [1162, 'tick', 0.05], [1187, 'tick', 0.05], [1225, 'tick', 0.05], [1970, 'tick', 0.07],
];
export const GAS_MUSIC_FROM = HOOK_FRAMES + COLD_FRAMES + WHO_FRAMES;
export const FileGas: React.FC = () => <Cuts cuts={GAS} vo={VO} musicFrom={GAS_MUSIC_FROM} cues={GAS_CUES} />;
