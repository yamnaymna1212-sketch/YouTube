import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import states from 'us-atlas/states-albers-10m.json';
import { C, F } from '../theme';
import { FullBody } from '../host/FullBody';
import { Bank, Building, Car, Diner, GasStation, Lamp, LightWrap, Sky, Skyline, Street, Tree, W } from '../world/World';

// EP02 v2 frames: Jake LIVES in an illustrated American city, intercut with REAL footage, REAL maps, REAL money.
const Narr: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', ...style }}>
    <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 34, color: '#fff', background: 'rgba(12,13,16,.72)', padding: '10px 22px', borderRadius: 6 }}>{children}</span>
  </div>
);
const Src: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'absolute', right: 70, top: 46, fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,.75)', textShadow: '0 1px 3px #000' }}>SOURCE · {children}</div>
);
const Shot: React.FC<{ n: string; kind: string }> = ({ n, kind }) => (
  <div style={{ position: 'absolute', left: 60, top: 40, fontFamily: F.mono, fontSize: 16, color: '#fff', background: 'rgba(0,0,0,.55)', padding: '6px 12px', letterSpacing: 2 }}>{n} · {kind}</div>
);

// W1 — WIDE, eye level. Jake's street: diner, grocery, bank, gas station down the road.
export const W1Street: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <Sky horizon={600} />
      <Skyline base={640} />
      <Building x={0} base={790} w={400} h={520} color={W.brick} dark={W.brickDk} cols={4} rows={4} seed={2} sign="FRESH MARKET" awning={W.green} />
      <Diner x={420} base={790} s={1.05} />
      <Building x={1060} base={790} w={290} h={430} color={W.teal} dark={W.tealDk} cols={3} rows={3} seed={5} sign="PHARMACY" awning="#B84A3E" />
      <Bank x={1380} base={790} s={1.0} />
      <Street walkY={790} roadY={900} />
      <Tree x={380} base={800} s={1.1} /><Lamp x={1010} base={800} /><Lamp x={1900} base={800} />
      <Car x={300} base={1010} s={0.9} color="#8A3B36" />
      <Car x={1500} base={1050} s={1.0} color="#6E8FA8" flip />
      <LightWrap />
    </svg>
    <FullBody pose="stand" face={{ look: 0.5, smile: 0.4 }} style={{ position: 'absolute', left: 880, top: 520, height: 380 }} />
    <Shot n="01" kind="JAKE'S WORLD · WIDE" />
    <Narr>Meet Jake. 26. Works at the diner. Drives a 2012 sedan.</Narr>
  </AbsoluteFill>
);

// W2 — MEDIUM, low angle. Gas station at sunset. Price on the pylon = real EIA national average.
export const W2Gas: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <Sky horizon={700} />
      <Skyline base={720} seed={9} />
      <rect y={720} width={1920} height={360} fill={W.asphalt} />
      <rect y={720} width={1920} height={10} fill={W.asphaltDk} />
      <GasStation x={80} base={960} s={1.2} price="4.15" />
      <Car x={560} base={1020} s={1.15} color="#6E8FA8" />
      <path d="M 780 820 C 840 760, 900 800, 930 860" stroke="#151515" strokeWidth={12} fill="none" />
      <LightWrap />
    </svg>
    <FullBody pose="pump" face={{ look: -0.6, brow: 0.8, smile: 0, talk: 0.3 }} style={{ position: 'absolute', left: 840, top: 420, height: 620, transform: 'scaleX(1)' }} />
    <div style={{ position: 'absolute', right: 90, top: 300, width: 470, background: 'rgba(12,13,16,.85)', padding: '26px 30px', borderLeft: `4px solid ${C.amber}` }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 17, letterSpacing: 4, color: C.steel }}>JAKE'S FILL-UP · 15 GAL</div>
      <div style={{ fontFamily: F.mono, fontSize: 84, color: C.amber }}>$62.30</div>
      <div style={{ fontFamily: F.sans, fontSize: 22, color: C.bone }}>A year ago: <b>$45.30</b></div>
    </div>
    <Shot n="02" kind="JAKE LIVES IT · LOW ANGLE" />
    <Src>U.S. EIA, U.S. regular avg $4.153 (Nov 2, 2026) vs $3.019 a year earlier</Src>
    <Narr>Every week, the same pump. $17 more than last year.</Narr>
  </AbsoluteFill>
);

// W3 — REAL MAP. EIA regional prices by PADD, Michigan highlighted.
const PADD: Record<string, [string, number]> = {};
const set = (names: string[], label: string, v: number) => names.forEach(n => (PADD[n] = [label, v]));
set(['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'Rhode Island', 'Vermont', 'Delaware', 'District of Columbia', 'Maryland', 'New Jersey', 'New York', 'Pennsylvania', 'Florida', 'Georgia', 'North Carolina', 'South Carolina', 'Virginia', 'West Virginia'], 'East Coast', 3.936);
set(['Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Michigan', 'Minnesota', 'Missouri', 'Nebraska', 'North Dakota', 'South Dakota', 'Ohio', 'Oklahoma', 'Tennessee', 'Wisconsin'], 'Midwest', 4.102);
set(['Alabama', 'Arkansas', 'Louisiana', 'Mississippi', 'New Mexico', 'Texas'], 'Gulf Coast', 3.636);
set(['Colorado', 'Idaho', 'Montana', 'Utah', 'Wyoming'], 'Rocky Mountain', 4.213);
set(['Alaska', 'Arizona', 'California', 'Hawaii', 'Nevada', 'Oregon', 'Washington'], 'West Coast', 5.296);
const color = (v: number) => (v > 5 ? '#E5483B' : v > 4.15 ? '#E08A46' : v > 3.9 ? '#D9A441' : '#8FA36A');

export const W3Map: React.FC = () => {
  const geo = feature(states as any, (states as any).objects.states) as any;
  const path = geoPath();
  return (
    <AbsoluteFill style={{ background: '#0E1116' }}>
      <svg width={1560} height={1000} viewBox="-60 -80 1100 720" style={{ position: 'absolute', left: 0, top: 60 }}>
        {geo.features.map((f: any) => {
          const n = f.properties.name; const v = PADD[n]?.[1] ?? 4;
          return <path key={n} d={path(f) || ''} fill={color(v)} stroke="#0E1116" strokeWidth={n === 'Michigan' ? 0 : 0.8} opacity={n === 'Michigan' ? 1 : 0.8} />;
        })}
        {geo.features.filter((f: any) => f.properties.name === 'Michigan').map((f: any) => <path key="mi" d={path(f) || ''} fill="none" stroke="#fff" strokeWidth={3} />)}
        <g fontFamily="Inter, sans-serif" fontWeight={700} fill="#fff" fontSize={18}>
          <text x={60} y={330}>WEST COAST $5.30</text><text x={300} y={250}>ROCKIES $4.21</text>
          <text x={560} y={240}>MIDWEST $4.10</text><text x={470} y={480}>GULF COAST $3.64</text><text x={800} y={330}>EAST COAST $3.94</text>
        </g>
        <g transform="translate(690 170)"><line x1={0} y1={0} x2={-60} y2={-120} stroke="#fff" strokeWidth={1.5} /><circle r={5} fill="#fff" /><text x={-66} y={-128} textAnchor="end" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16} fill="#fff">MICHIGAN · JAKE LIVES HERE</text></g>
      </svg>
      <div style={{ position: 'absolute', right: 90, top: 140, width: 430 }}>
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 18, letterSpacing: 4, color: C.steel }}>REGULAR GAS, BY REGION</div>
        <div style={{ fontFamily: F.serif, fontSize: 64, color: C.bone, lineHeight: 1.05, marginTop: 8 }}>Where you live changes the bill.</div>
      </div>
      <Shot n="03" kind="REAL DATA · MAP" />
      <Src>U.S. EIA, Gasoline & Diesel Fuel Update, week of Nov 2, 2026 · Map: U.S. Census (us-atlas)</Src>
    </AbsoluteFill>
  );
};

// W4 — REAL FOOTAGE. El-Sayed in his own words (Senate HELP hearing, public domain).
export const W4Footage: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Img src={staticFile('sayed/abdul_el_sayed_testifying_at_committee_hearing_2024.jpg')} style={{ position: 'absolute', width: '118%', left: '-12%', top: '-6%', filter: 'contrast(1.06) saturate(.92)' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(0,0,0,.75), transparent 40%)' }} />
    <div style={{ position: 'absolute', left: 60, top: 40, display: 'flex', gap: 10, alignItems: 'center' }}>
      <span style={{ width: 14, height: 14, borderRadius: 7, background: C.red }} /><span style={{ fontFamily: F.mono, fontSize: 18, color: '#fff', letterSpacing: 2 }}>REAL FOOTAGE · U.S. SENATE · JUL 11, 2024</span>
    </div>
    <div style={{ position: 'absolute', left: 100, bottom: 130, color: C.bone }}>
      <div style={{ width: 64, height: 3, background: C.red, marginBottom: 14 }} />
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 38 }}>Abdul El-Sayed</div>
      <div style={{ fontFamily: F.sans, fontSize: 22, opacity: 0.75 }}>Physician · 2026 Democratic nominee, U.S. Senate (Michigan)</div>
    </div>
    <div style={{ position: 'absolute', left: 100, right: 100, bottom: 70, height: 4, background: 'rgba(255,255,255,.25)' }}><div style={{ width: '42%', height: 4, background: C.red }} /></div>
    <Src>Senate HELP Committee recording (U.S. Government work, public domain)</Src>
  </AbsoluteFill>
);

// W5 — REAL MONEY + JAKE. The paycheck in real dollars (Federal Reserve note images), outside the diner.
export const W5Money: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <Sky horizon={560} />
      <Skyline base={600} seed={12} />
      <Diner x={-80} base={860} s={1.7} />
      <Street walkY={860} roadY={1000} />
      <Lamp x={1100} base={870} s={1.2} />
      <LightWrap />
    </svg>
    <FullBody pose="read" face={{ look: 0.4, brow: 0.6, smile: 0 }} style={{ position: 'absolute', left: 820, top: 260, height: 760 }} />
    <div style={{ position: 'absolute', right: 80, top: 210, width: 560 }}>
      {[0, 1, 2].map(i => <Img key={i} src={staticFile('real/usd100_front_2013.jpg')} style={{ position: 'absolute', width: 420, left: 60 + i * 26, top: i * 22, rotate: `${-8 + i * 7}deg`, boxShadow: '10px 14px 0 rgba(0,0,0,.35)' }} />)}
      <div style={{ position: 'absolute', top: 260, width: 520, background: 'rgba(12,13,16,.86)', padding: '24px 30px', borderLeft: `4px solid ${C.amber}` }}>
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 17, letterSpacing: 4, color: C.steel }}>FEDERAL MINIMUM WAGE</div>
        <div style={{ fontFamily: F.mono, fontSize: 80, color: C.bone }}>$7.25<span style={{ fontSize: 30 }}>/hr</span></div>
        <div style={{ fontFamily: F.sans, fontSize: 22, color: C.bone }}>Same since <b style={{ color: C.amber }}>July 24, 2009</b>. El-Sayed wants it raised.</div>
      </div>
    </div>
    <Shot n="05" kind="JAKE + REAL MONEY" />
    <Src>U.S. Department of Labor · $100 note: uscurrency.gov (U.S. Federal Reserve)</Src>
    <Narr>Jake's shift ends. His paycheck hasn't moved in years.</Narr>
  </AbsoluteFill>
);

// W6 — REAL PHOTO COLLAGE. The real race and the real place: Capitol, El-Sayed with voters, Rogers.
export const W6Collage: React.FC = () => (
  <AbsoluteFill style={{ background: '#101215', overflow: 'hidden' }}>
    <Img src={staticFile('sayed/us_capitol_east_side.JPG')} style={{ position: 'absolute', width: 1300, left: -120, top: -80, filter: 'saturate(.6) brightness(.7)', rotate: '-2deg', boxShadow: '0 30px 60px rgba(0,0,0,.6)' }} />
    <Img src={staticFile('sayed/abdul_el_sayed_meet_and_greet_by_conlan_houston_3.jpg')} style={{ position: 'absolute', width: 900, right: -40, top: 90, rotate: '3deg', border: '10px solid #F3EFE7', boxShadow: '0 30px 60px rgba(0,0,0,.6)' }} />
    <Img src={staticFile('sayed/cut_rogers.png')} style={{ position: 'absolute', height: 560, left: 520, bottom: 0, filter: 'grayscale(.4) drop-shadow(0 20px 40px rgba(0,0,0,.7))' }} />
    <div style={{ position: 'absolute', left: 90, bottom: 110 }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 18, letterSpacing: 4, color: C.steel }}>MICHIGAN · U.S. SENATE · NOV 3, 2026</div>
      <div style={{ fontFamily: F.serif, fontSize: 70, color: C.bone, marginTop: 6 }}>Before the White House,<br />the Senate.</div>
    </div>
    <Shot n="06" kind="REAL PHOTOS · COLLAGE" />
    <Src>Photos: M. Falbisoner (CC BY-SA 3.0) · Conlan Houston (CC BY-SA 4.0) · P.J. Siquig (PD)</Src>
  </AbsoluteFill>
);
