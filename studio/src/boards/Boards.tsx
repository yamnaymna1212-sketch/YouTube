import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { HostFigure, HostPose } from '../host/Host';
import { C, F } from '../theme';

const base: HostPose = { talk: 0, blink: 0, look: 0, brow: 0, smile: 0.25, tilt: 0, nod: 0 };
const Label: React.FC<{ t: string; s?: string }> = ({ t, s }) => (
  <div style={{ textAlign: 'center', marginTop: 6 }}>
    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 22, color: C.bone }}>{t}</div>
    {s && <div style={{ fontFamily: F.mono, fontSize: 15, color: C.steel, marginTop: 4 }}>{s}</div>}
  </div>
);
const Header: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => (
  <div style={{ position: 'absolute', left: 110, top: 70 }}>
    <div style={{ width: 64, height: 3, background: C.red, marginBottom: 14 }} />
    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 20, letterSpacing: 5, color: C.steel }}>{kicker}</div>
    <div style={{ fontFamily: F.serif, fontSize: 64, color: C.bone, marginTop: 4 }}>{title}</div>
  </div>
);

// BOARD 1 — main character: six expressions, same construction.
export const BoardCharacter: React.FC = () => {
  const ex: [string, string, Partial<HostPose>][] = [
    ['Neutral', 'default · listening', {}],
    ['Speaking', 'mouth driven by voice', { talk: 0.75 }],
    ['Skeptical', 'one beat before a reveal', { brow: 0.9, smile: 0, look: 0.5 }],
    ['Knowing smile', 'end of a chapter', { smile: 0.9, tilt: -4 }],
    ['Side glance', 'looks at the evidence', { look: -1, tilt: 3 }],
    ['Blink', 'every ~3 s, never frozen', { blink: 1 }],
  ];
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 80% 15%, #2B2219, ${C.ink} 60%)` }}>
      <Header kicker="MAIN CHARACTER · HOST" title="The Auditor" />
      <div style={{ position: 'absolute', right: 110, top: 96, width: 640, fontFamily: F.sans, fontSize: 21, lineHeight: 1.55, color: 'rgba(236,231,222,.75)' }}>
        Silver swept-back hair, short grey beard, round gold glasses, hooded eyes, oxblood scarf, charcoal overcoat with a raised collar. Warm key light from the left, cool rim from the right. On screen only 10–15% of an episode.
      </div>
      <div style={{ position: 'absolute', left: 60, right: 60, top: 300, display: 'flex', justifyContent: 'space-between' }}>
        {ex.map(([t, s, p]) => (
          <div key={t} style={{ width: 300 }}>
            <HostFigure p={{ ...base, ...p }} style={{ width: 300 }} />
            <Label t={t} s={s} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// BOARD 2 — icons & on-screen graphics: real logos only, small, unaltered; thin annotation kit.
const chips: [string, string, string][] = [
  ['assets/bybit_logo.svg', 'Bybit', 'Wikimedia · PD-textlogo'],
  ['assets/ethereum_logo_2014.svg', 'Ethereum', 'Ethereum Fdn · CC BY 3.0'],
  ['assets/bitcoin.svg', 'Bitcoin', 'Wikimedia · PD'],
  ['assets/thorchain_icon.png', 'THORChain', 'thorchain.org'],
];
export const BoardIcons: React.FC = () => (
  <AbsoluteFill style={{ background: C.graphite }}>
    <Header kicker="ICONS & GRAPHICS" title="Real logos. Thin lines. Nothing cartoon." />
    {/* real logo chips */}
    <div style={{ position: 'absolute', left: 110, top: 270, display: 'flex', gap: 28 }}>
      {chips.map(([src, name, lic]) => (
        <div key={name} style={{ width: 300 }}>
          <div style={{ height: 150, background: C.paper, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img src={staticFile(src)} style={{ maxHeight: name === 'Bybit' ? 46 : 76, maxWidth: 200 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
            <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 22, color: C.bone }}>{name}</span>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 14, color: C.steel, marginTop: 6 }}>{lic}</div>
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', left: 110, top: 560, fontFamily: F.sans, fontSize: 18, color: C.steel, letterSpacing: 3 }}>REAL LOGOS ONLY · ORIGINAL COLOURS · NEVER REDRAWN · MAX ONE PER SHOT</div>
    {/* annotation kit */}
    <div style={{ position: 'absolute', left: 110, top: 640, right: 110, display: 'flex', gap: 60, alignItems: 'flex-start' }}>
      <div>
        <div style={{ width: 64, height: 3, background: C.red, marginBottom: 14 }} />
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 32, color: C.bone }}>Ben Zhou</div>
        <div style={{ fontFamily: F.sans, fontSize: 20, color: 'rgba(236,231,222,.65)', marginTop: 4 }}>CEO, Bybit</div>
        <div style={{ marginTop: 18, textAlign: 'left' }}><Label t="Lower third" s="same on every person" /></div>
      </div>
      <div style={{ width: 360 }}>
        <div style={{ fontFamily: F.serif, fontSize: 34, color: C.bone, background: 'linear-gradient(transparent 55%, rgba(217,164,65,.5) 55%)', display: 'inline' }}>North Korea responsible</div>
        <div style={{ marginTop: 26 }}><Label t="Highlighter" s="amber, multiply" /></div>
      </div>
      <svg width="300" height="130" style={{ overflow: 'visible', marginRight: 40 }}>
        <circle cx="40" cy="80" r="14" fill="none" stroke={C.bone} strokeWidth="2" />
        <line x1="52" y1="70" x2="200" y2="20" stroke={C.bone} strokeWidth="1.5" />
        <text x="140" y="12" fill={C.bone} fontFamily={F.sans} fontSize="20" fontWeight="600" letterSpacing="3">NORTH KOREA</text>
        <foreignObject x="0" y="100" width="260" height="60"><Label t="Map callout" s="1.5 px line" /></foreignObject>
      </svg>
      <div style={{ width: 280 }}>
        <div style={{ fontFamily: F.mono, fontSize: 17, color: 'rgba(236,231,222,.6)' }}>SOURCE · ic3.gov/PSA/2025/PSA250226</div>
        <div style={{ marginTop: 38 }}><Label t="Source line" s="on every factual shot" /></div>
      </div>
      <div>
        <div style={{ fontFamily: F.mono, fontSize: 22, color: '#fff', background: C.red, padding: '6px 14px', letterSpacing: 3 }}>RECONSTRUCTION</div>
        <div style={{ marginTop: 34 }}><Label t="Reconstruction tag" s="anything we redraw" /></div>
      </div>
    </div>
    {/* palette */}
    <div style={{ position: 'absolute', left: 110, bottom: 60, display: 'flex', gap: 0 }}>
      {Object.entries(C).map(([k, v]) => (
        <div key={k} style={{ width: 150 }}>
          <div style={{ height: 46, background: v, border: '1px solid rgba(255,255,255,.08)' }} />
          <div style={{ fontFamily: F.mono, fontSize: 14, color: C.steel, marginTop: 6 }}>{k} {v}</div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
