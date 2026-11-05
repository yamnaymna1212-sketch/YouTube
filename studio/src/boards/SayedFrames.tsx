import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, F } from '../theme';
import { FullBody } from '../host/FullBody';
import { GuyFigure } from '../host/Guy';

// EP: "If El-Sayed Became President? Your Wallet, Explained" — style frames (stills).
// Grammar: real photo → Jake lives it → real evidence → real video → real people. Never two of the same in a row.

const A = (f: string) => staticFile(`sayed/${f}`);
const Src: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div style={{ position: 'absolute', right: 90, bottom: 44, fontFamily: F.mono, fontSize: 16, color: light ? 'rgba(12,13,16,.6)' : 'rgba(236,231,222,.6)', letterSpacing: 0.3 }}>SOURCE · {children}</div>
);
const Grade: React.FC = () => <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)' }} />;
const Tag: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({ children, color = C.red, style }) => (
  <span style={{ fontFamily: F.mono, fontSize: 18, letterSpacing: 3, background: color, color: '#fff', padding: '5px 12px', ...style }}>{children}</span>
);
const Lower: React.FC<{ t: string; s: string; style?: React.CSSProperties }> = ({ t, s, style }) => (
  <div style={{ position: 'absolute', left: 100, bottom: 110, color: C.bone, ...style }}>
    <div style={{ width: 64, height: 3, background: C.red, marginBottom: 14 }} />
    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 34 }}>{t}</div>
    <div style={{ fontFamily: F.sans, fontSize: 21, opacity: 0.7, marginTop: 5 }}>{s}</div>
  </div>
);

// 1 — HOOK. Real Capitol photo + real El-Sayed cutout + title. Honest "HYPOTHETICAL" tag.
export const F1Hook: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
    <Img src={A('us_capitol_east_side.JPG')} style={{ position: 'absolute', width: '115%', left: '-10%', top: -60, filter: 'saturate(.55) brightness(.55) contrast(1.1)' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.95) 0%, rgba(12,13,16,.7) 45%, rgba(12,13,16,.1) 75%)' }} />
    <Img src={A('cut_elsayed.png')} style={{ position: 'absolute', right: 80, bottom: 0, height: 900, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.6)) contrast(1.05)' }} />
    <div style={{ position: 'absolute', left: 110, top: 250, width: 980 }}>
      <Tag>HYPOTHETICAL</Tag>
      <div style={{ fontFamily: F.serif, fontSize: 118, lineHeight: 1.02, color: C.bone, marginTop: 30 }}>If El-Sayed Became President?</div>
      <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 70, color: C.amber, marginTop: 16 }}>Your wallet, explained.</div>
      <div style={{ fontFamily: F.sans, fontSize: 24, color: 'rgba(236,231,222,.7)', marginTop: 34, lineHeight: 1.5 }}>Michigan’s 2026 Democratic Senate nominee. Medicare for All, a higher minimum wage, higher taxes on the rich.</div>
    </div>
    <Grade />
    <Src>Photos: Conlan Houston (CC BY-SA 4.0) · Martin Falbisoner (CC BY-SA 3.0) · Wikimedia Commons</Src>
  </AbsoluteFill>
);

// 2 — JAKE LIVES IT. Real 2026 pump close-up + Jake pumping + real EIA price as evidence.
export const F2Gas: React.FC = () => (
  <AbsoluteFill style={{ background: '#0F1114', overflow: 'hidden' }}>
    <Img src={A('racetrac_gas_station_jefferson_parish_louisiana_5_march_2026_1.jpg')} style={{ position: 'absolute', width: 2100, left: -380, top: -160, filter: 'blur(14px) brightness(.45) saturate(.8)' }} />
    {/* real photo as an inset "insert shot" */}
    <div style={{ position: 'absolute', left: 90, top: 150, width: 820, height: 615, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
      <Img src={A('racetrac_gas_station_jefferson_parish_louisiana_5_march_2026_1.jpg')} style={{ width: 1100, marginLeft: -140, marginTop: -110 }} />
      <div style={{ position: 'absolute', left: 16, bottom: 14, fontFamily: F.mono, fontSize: 15, color: '#fff', background: 'rgba(0,0,0,.6)', padding: '4px 10px' }}>REAL PUMP · Louisiana · Mar 5, 2026</div>
    </div>
    <FullBody pose="pump" face={{ look: -0.7, brow: 0.6, smile: 0, talk: 0.25 }} style={{ position: 'absolute', left: 760, top: 90, height: 980 }} />
    {/* evidence card */}
    <div style={{ position: 'absolute', right: 70, top: 200, width: 470, background: 'rgba(12,13,16,.88)', padding: '28px 32px', borderLeft: `4px solid ${C.amber}` }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 18, letterSpacing: 4, color: C.steel }}>U.S. REGULAR GAS · NOW</div>
      <div style={{ fontFamily: F.mono, fontSize: 104, color: C.amber, lineHeight: 1.1 }}>$4.15</div>
      <div style={{ fontFamily: F.sans, fontSize: 24, color: C.bone }}>per gallon · <b style={{ color: C.red }}>+$1.13</b> vs. a year ago</div>
      <div style={{ height: 1, background: 'rgba(236,231,222,.2)', margin: '22px 0' }} />
      <div style={{ fontFamily: F.serif, fontSize: 38, color: C.bone, lineHeight: 1.15 }}>Would a President El-Sayed make this cheaper?</div>
    </div>
    <Grade />
    <Src>U.S. EIA, Gasoline & Diesel Fuel Update, Nov 3 2026 · Photo: Infrogmation (CC BY-SA 4.0)</Src>
  </AbsoluteFill>
);

// 3 — REAL VIDEO. Senate HELP Committee testimony (U.S. Gov., public domain) in a player frame.
export const F3Video: React.FC = () => (
  <AbsoluteFill style={{ background: '#08090B' }}>
    <div style={{ position: 'absolute', left: 90, top: 110, width: 1180, height: 760, overflow: 'hidden', borderRadius: 6 }}>
      <Img src={A('abdul_el_sayed_testifying_at_committee_hearing_2024.jpg')} style={{ width: 1180, height: 785, objectFit: 'cover', filter: 'contrast(1.05) saturate(.9)' }} />
      <div style={{ position: 'absolute', left: 22, top: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ width: 14, height: 14, borderRadius: 7, background: C.red }} />
        <span style={{ fontFamily: F.mono, fontSize: 18, color: '#fff', letterSpacing: 2 }}>ARCHIVE · JUL 11, 2024</span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: 'linear-gradient(transparent, rgba(0,0,0,.8))' }} />
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 22, height: 4, background: 'rgba(255,255,255,.25)' }}><div style={{ width: '38%', height: 4, background: C.red }} /></div>
      <Lower t="Abdul El-Sayed" s="Testifying to the U.S. Senate HELP Committee" style={{ left: 24, bottom: 46 }} />
    </div>
    <div style={{ position: 'absolute', left: 1320, top: 140, width: 510 }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 18, letterSpacing: 4, color: C.steel }}>HIS PLATFORM · #1</div>
      <div style={{ fontFamily: F.serif, fontSize: 84, color: C.bone, lineHeight: 1.02, marginTop: 10 }}>Medicare for All</div>
      <div style={{ height: 2, width: 70, background: C.red, margin: '28px 0' }} />
      {[['Health insurance premiums', 'replaced by taxes'], ['Copays & deductibles', 'would largely disappear'], ['Your taxes', 'would likely go up']].map(([a, b]) => (
        <div key={a} style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, color: C.bone }}>{a}</div>
          <div style={{ fontFamily: F.sans, fontSize: 22, color: 'rgba(236,231,222,.6)' }}>{b}</div>
        </div>
      ))}
      <Tag color="#2A2E36" style={{ fontSize: 15 }}>WHAT THE PLAN WOULD DO — NOT A FORECAST</Tag>
    </div>
    <Src>Footage: U.S. Senate HELP Committee (public domain) · Platform: Michigan Public, Oct 20 2026</Src>
  </AbsoluteFill>
);

// 4 — REAL PEOPLE. The race: El-Sayed vs. Rogers, real photos, final polling.
export const F4Versus: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 0, top: 0, width: 960, height: 1080, background: 'linear-gradient(160deg, #1B2A44, #0E1524)' }} />
    <div style={{ position: 'absolute', right: 0, top: 0, width: 960, height: 1080, background: 'linear-gradient(200deg, #3A1C1A, #1A0F0E)' }} />
    <Img src={A('cut_elsayed.png')} style={{ position: 'absolute', left: 120, bottom: 0, height: 760, filter: 'grayscale(.15)' }} />
    <Img src={A('cut_rogers.png')} style={{ position: 'absolute', right: 80, bottom: 0, height: 820, filter: 'grayscale(.15)' }} />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 330, background: 'linear-gradient(transparent, rgba(12,13,16,.95))' }} />
    <div style={{ position: 'absolute', left: 120, bottom: 120 }}>
      <Tag color="#2F5DA8">DEMOCRAT</Tag>
      <div style={{ fontFamily: F.serif, fontSize: 76, color: C.bone, marginTop: 14 }}>Abdul El-Sayed</div>
      <div style={{ fontFamily: F.mono, fontSize: 40, color: C.bone }}>47.9%</div>
    </div>
    <div style={{ position: 'absolute', right: 120, bottom: 120, textAlign: 'right' }}>
      <Tag color="#B23A33">REPUBLICAN</Tag>
      <div style={{ fontFamily: F.serif, fontSize: 76, color: C.bone, marginTop: 14 }}>Mike Rogers</div>
      <div style={{ fontFamily: F.mono, fontSize: 40, color: C.bone }}>44.7%</div>
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center' }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 20, letterSpacing: 6, color: C.steel }}>MICHIGAN · U.S. SENATE · NOV 3, 2026</div>
      <div style={{ fontFamily: F.serif, fontSize: 64, color: C.bone, marginTop: 8 }}>First, he has to win this.</div>
    </div>
    <div style={{ position: 'absolute', left: 930, top: 520, width: 60, height: 60, borderRadius: 30, background: C.bone, color: C.ink, fontFamily: F.sans, fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VS</div>
    <Src>Final polling average, PollCheck, Oct 27 2026 (not results) · Photos: Conlan Houston (CC BY-SA 4.0), P.J. Siquig (PD)</Src>
  </AbsoluteFill>
);

// 5 — JAKE LIVES IT + EVIDENCE. Real bank branch, Jake reads his pay stub, real federal number.
export const F5Wage: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
    <Img src={A('chase_bank_branch_miami_50637135308.jpg')} style={{ position: 'absolute', width: '110%', left: '-5%', top: -40, filter: 'saturate(.7) brightness(.62)' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, transparent 35%, rgba(12,13,16,.92) 72%)' }} />
    <FullBody pose="read" face={{ look: 0.4, brow: 0.5, smile: 0 }} style={{ position: 'absolute', left: 300, top: 90, height: 980 }} />
    <div style={{ position: 'absolute', right: 100, top: 210, width: 600 }}>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 18, letterSpacing: 4, color: C.steel }}>FEDERAL MINIMUM WAGE</div>
      <div style={{ fontFamily: F.mono, fontSize: 120, color: C.bone, lineHeight: 1.05 }}>$7.25</div>
      <div style={{ fontFamily: F.sans, fontSize: 26, color: C.bone }}>unchanged since <b style={{ color: C.amber }}>July 24, 2009</b></div>
      <div style={{ height: 1, background: 'rgba(236,231,222,.2)', margin: '28px 0' }} />
      <div style={{ fontFamily: F.serif, fontSize: 46, color: C.bone, lineHeight: 1.15 }}>El-Sayed wants to raise it. What does Jake’s paycheck look like then?</div>
    </div>
    <Grade />
    <Src>U.S. Department of Labor · Photo: Phillip Pessar (CC BY 2.0) · Character: Jake (illustration)</Src>
  </AbsoluteFill>
);

// Character sheet for Jake.
export const F0Jake: React.FC = () => {
  const base = { talk: 0, blink: 0, look: 0, brow: 0, smile: 0.25, tilt: 0, nod: 0 };
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 80% 20%, #22324A, ${C.ink} 65%)` }}>
      <div style={{ position: 'absolute', left: 110, top: 80 }}>
        <div style={{ width: 64, height: 3, background: C.red, marginBottom: 14 }} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 20, letterSpacing: 5, color: C.steel }}>MAIN CHARACTER</div>
        <div style={{ fontFamily: F.serif, fontSize: 72, color: C.bone }}>Jake, 26</div>
        <div style={{ fontFamily: F.sans, fontSize: 24, color: 'rgba(236,231,222,.7)', width: 640, marginTop: 10, lineHeight: 1.5 }}>An average American guy. He plays the viewer: every policy we explain, Jake lives it — at the pump, at the bank, at the doctor.</div>
      </div>
      <div style={{ position: 'absolute', left: 110, top: 470, display: 'flex', gap: 10 }}>
        {[{}, { talk: 0.7 }, { brow: 0.9, smile: 0 }, { smile: 0.9 }].map((p, i) => (
          <div key={i} style={{ width: 230 }}><GuyFigure p={{ ...base, ...p }} style={{ width: 230 }} />
            <div style={{ textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 20, color: C.bone }}>{['Neutral', 'Talking', 'Doubtful', 'Relieved'][i]}</div></div>
        ))}
      </div>
      <FullBody pose="stand" style={{ position: 'absolute', left: 1000, top: 110, height: 920 }} />
      <FullBody pose="read" face={{ look: 0.4 }} style={{ position: 'absolute', left: 1440, top: 110, height: 920 }} />
    </AbsoluteFill>
  );
};
