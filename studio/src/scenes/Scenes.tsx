import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Video } from '@remotion/media';
import { C, F } from '../theme';
import { clamp, ease, io, KineticLine, LowerThird, Source } from '../ui/Film';
import { Host } from '../host/Host';

// Every scene uses a DIFFERENT shot grammar (lens, background, camera move) on purpose,
// held together by the same type system, lower third, source credit and grade.

// 1 — REAL FOOTAGE, full bleed. NASA Earth at night. Slow push-in + letterbox. Cold open line.
export const S1Earth: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ scale: interpolate(f, [0, d], [1.08, 1.22]), filter: 'saturate(.75) contrast(1.1) brightness(.85)' }}>
        <Video src={staticFile('real/nasa_earth_at_night.mp4')} trimBefore={12 * 30} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.75), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 140, top: 340, width: 1100 }}>
        <div style={{ fontFamily: F.mono, fontSize: 22, color: C.red, letterSpacing: 4, opacity: interpolate(f, [6, 20], [0, 1], clamp) }}>FEB 21, 2025 · 14:13:35 UTC</div>
        <KineticLine at={16} size={84} text="Three people approved a routine transfer." style={{ marginTop: 22 }} />
        <KineticLine at={62} size={84} text="Minutes later, $1.5 billion was gone." italic={['$1.5', 'billion']} />
      </div>
      <div style={{ position: 'absolute', inset: 0, borderTop: '90px solid #000', borderBottom: '90px solid #000' }} />
      <Source at={20}>NASA Goddard — Earth at Night (public domain)</Source>
    </AbsoluteFill>
  );
};

// 2 — SCREEN CAPTURE of a real web page. 3D perspective drift, cursor, live highlight.
export const S2Browser: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  const hl = interpolate(f, [55, 85], [0, 1], { ...clamp, easing: io });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 30% 20%, #23272F, ${C.ink} 70%)`, perspective: 1800 }}>
      <div style={{ position: 'absolute', left: 230, top: 120, width: 1440, height: 900, borderRadius: 14, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.6)',
        rotate: `y ${interpolate(f, [0, d], [-14, -6])}deg`, translate: `${interpolate(f, [0, d], [-60, 40])}px ${interpolate(f, [0, d], [30, -10])}px`, scale: interpolate(f, [0, d], [0.92, 1.04]) }}>
        <div style={{ height: 44, background: '#E9E6E1', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          {['#E5483B', '#D9A441', '#5BAA6A'].map(c => <i key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
          <div style={{ marginLeft: 24, flex: 1, height: 26, borderRadius: 6, background: '#fff', fontFamily: F.sans, fontSize: 15, color: '#555', display: 'flex', alignItems: 'center', paddingLeft: 12 }}>en.wikipedia.org/wiki/Bybit</div>
        </div>
        <div style={{ position: 'relative' }}>
          <Img src={staticFile('real/wiki_bybit.png')} style={{ width: 1440, display: 'block', translate: `0px ${interpolate(f, [0, d], [0, -60], { ...clamp, easing: io })}px` }} />
          <div style={{ position: 'absolute', left: 260, top: 275 - interpolate(f, [0, d], [0, 60], { ...clamp, easing: io }), width: 520 * hl, height: 30, background: 'rgba(217,164,65,.45)', mixBlendMode: 'multiply' }} />
          <div style={{ position: 'absolute', left: 260, top: 305 - interpolate(f, [0, d], [0, 60], { ...clamp, easing: io }), width: 560 * hl, height: 30, background: 'rgba(217,164,65,.45)', mixBlendMode: 'multiply' }} />
        </div>
        {/* cursor */}
        <svg width="28" height="34" viewBox="0 0 28 34" style={{ position: 'absolute', left: interpolate(f, [10, 55, 95], [1100, 560, 830], { ...clamp, easing: io }), top: interpolate(f, [10, 55, 95], [700, 330, 300], { ...clamp, easing: io }) }}>
          <path d="M2 2 L2 28 L9 21 L14 32 L19 30 L14 19 L24 19 Z" fill="#111" stroke="#fff" strokeWidth={2} />
        </svg>
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(20deg, rgba(12,13,16,.95) 0%, rgba(12,13,16,.6) 22%, transparent 40%)' }} />
      <LowerThird at={20} title="Bybit" sub="Dubai-based crypto exchange · founded 2018" />
      <Source>Wikipedia, “Bybit” — screen capture, 4 Nov 2026</Source>
    </AbsoluteFill>
  );
};

// 3 — HOST, studio close-up. Practical-light background, slow lateral dolly, rack of bokeh.
export const S3Host: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 78% 30%, #3B2D22 0%, #1A1714 30%, ${C.ink} 70%)`, overflow: 'hidden' }}>
      {[[1500, 260, 120, .25], [1650, 520, 80, .18], [300, 180, 160, .12], [420, 760, 90, .1]].map(([x, y, r, o], i) => (
        <div key={i} style={{ position: 'absolute', left: x + interpolate(f, [0, d], [0, -40]), top: y, width: r * 2, height: r * 2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,196,120,.9), rgba(255,196,120,0) 70%)', opacity: o, filter: 'blur(8px)' }} />
      ))}
      <div style={{ position: 'absolute', left: 560, top: 90, width: 860, translate: `${interpolate(f, [0, d], [30, -30])}px 0px`, scale: interpolate(f, [0, d], [1, 1.05]) }}>
        <Host seed="intro" look={-0.15} smile={0.3} style={{ width: 860 }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.85), transparent 35%)' }} />
      <LowerThird at={18} title="The Auditor" sub="Where your money actually goes. Read line by line." />
    </AbsoluteFill>
  );
};

// 4 — DOCUMENT MACRO. Real FBI PSA on a desk plane, low angle, tracking shot, shallow focus.
export const S4Document: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  const hl = interpolate(f, [40, 70], [0, 1], { ...clamp, easing: io });
  return (
    <AbsoluteFill style={{ background: '#15130F', perspective: 1400, overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 30%, rgba(255,214,160,.18), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 260, top: 40, width: 1560, transformOrigin: '50% 80%',
        rotate: `x ${interpolate(f, [0, d], [38, 30])}deg`, translate: `${interpolate(f, [0, d], [-120, 60], { easing: io })}px ${interpolate(f, [0, d], [20, -30])}px`, scale: 1.12,
        boxShadow: '0 40px 80px rgba(0,0,0,.7)' }}>
        <Img src={staticFile('assets/fbi_ic3_psa250226_top.png')} style={{ width: 1560, display: 'block', filter: 'sepia(.12) contrast(1.05)' }} />
        <div style={{ position: 'absolute', left: 300, top: 470, width: 960 * hl, height: 50, background: 'rgba(229,72,59,.28)', mixBlendMode: 'multiply' }} />
      </div>
      {/* depth of field: far edge and near edge out of focus */}
      <AbsoluteFill style={{ backdropFilter: 'blur(7px)', WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 32%, transparent 70%, #000 100%)' }} />
      <LowerThird at={70} title="FBI: North Korea is responsible" sub="Public Service Announcement I-022625-PSA · Feb 26, 2025" />
      <Source>ic3.gov/PSA/2025/PSA250226 (U.S. Government work)</Source>
    </AbsoluteFill>
  );
};

// 5 — REAL PHOTO, astronaut view. Ken Burns into the dark gap; thin callouts, no cartoon icons.
export const S5Korea: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  const line = (at: number) => interpolate(f, [at, at + 18], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <Img src={staticFile('real/nasa_iss038e038300.jpg')} style={{ position: 'absolute', width: 2400, left: -200, top: -180,
        scale: interpolate(f, [0, d], [1, 1.28], { easing: io }), translate: `${interpolate(f, [0, d], [0, -120], { easing: io })}px ${interpolate(f, [0, d], [0, -40], { easing: io })}px`, transformOrigin: '55% 50%' }} />
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <g opacity={line(40)}><circle cx="880" cy="430" r={10 + 6 * Math.sin(f / 6)} fill="none" stroke={C.bone} strokeWidth="2" /><line x1="890" y1="420" x2={890 + 230 * line(40)} y2="300" stroke={C.bone} strokeWidth="1.5" /></g>
        <g opacity={line(70)}><circle cx="1290" cy="610" r="7" fill={C.amber} /><line x1="1297" y1="605" x2={1297 + 160 * line(70)} y2="520" stroke={C.amber} strokeWidth="1.5" /></g>
      </svg>
      <div style={{ position: 'absolute', left: 1130, top: 260, fontFamily: F.sans, fontWeight: 600, fontSize: 30, letterSpacing: 3, color: C.bone, opacity: line(52) }}>NORTH KOREA</div>
      <div style={{ position: 'absolute', left: 1465, top: 482, fontFamily: F.sans, fontWeight: 500, fontSize: 24, letterSpacing: 3, color: C.amber, opacity: line(80) }}>SEOUL</div>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 12% 10%, rgba(0,0,0,.85), transparent 45%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 120, width: 820 }}>
        <KineticLine at={95} size={64} text="A country cut off from the world’s money — and from its lights." />
      </div>
      <Source at={20}>NASA, ISS038-E-038300, 30 Jan 2014 (public domain)</Source>
    </AbsoluteFill>
  );
};

// 6 — DATA on paper. Light background (deliberate contrast), static camera, precise bars.
export const S6Data: React.FC = () => {
  const f = useCurrentFrame();
  const rows: [string, string, number, string][] = [
    ['THORChain → Bitcoin', 'assets/thorchain_icon.png', 361255, '~361k ETH'],
    ['eXch', '', 79655, '~80k ETH'],
    ['OKX Web3 proxy', '', 40233, '~40k ETH'],
  ];
  return (
    <AbsoluteFill style={{ background: C.paper, color: C.ink, padding: '130px 160px' }}>
      <div style={{ fontFamily: F.sans, fontSize: 22, letterSpacing: 4, color: C.red, fontWeight: 600 }}>WHERE THE ETHER WENT · FIRST 10 DAYS</div>
      <div style={{ fontFamily: F.serif, fontSize: 92, marginTop: 14, letterSpacing: -1 }}>Laundered in ten days.</div>
      <div style={{ marginTop: 70, display: 'flex', flexDirection: 'column', gap: 46 }}>
        {rows.map(([label, icon, v, txt], i) => {
          const t = interpolate(f, [25 + i * 12, 70 + i * 12], [0, 1], { ...clamp, easing: ease });
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <div style={{ width: 360, fontFamily: F.sans, fontSize: 30, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 14 }}>
                {icon && <Img src={staticFile(icon)} style={{ height: 34 }} />}{label}
              </div>
              <div style={{ height: 34, width: (v / 361255) * 1000 * t, background: i === 0 ? C.ink : C.steel }} />
              <div style={{ fontFamily: F.mono, fontSize: 26, opacity: t }}>{txt}</div>
            </div>
          );
        })}
      </div>
      <Source dark={false} at={30}>Cointelegraph, Mar 2025 · The Defiant · CCN (on-chain tracing)</Source>
    </AbsoluteFill>
  );
};

// 7 — REAL PERSON, documentary still. Full original photo (not a sticker), slow push, side panel.
export const S7Person: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  const o = interpolate(f, [15, 35], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1200, height: 1080, overflow: 'hidden' }}>
        <Img src={staticFile('real/kremlin_kim_20240619.jpg')} style={{ height: 1080, position: 'absolute', left: -260, filter: 'grayscale(.85) contrast(1.15) brightness(.9)', scale: interpolate(f, [0, d], [1.05, 1.16]), transformOrigin: '55% 40%' }} />
        <AbsoluteFill style={{ background: 'linear-gradient(90deg, transparent 60%, #0C0D10 100%)' }} />
      </div>
      <div style={{ position: 'absolute', left: 1250, top: 300, width: 560, opacity: o, translate: `${(1 - o) * 30}px 0px` }}>
        <div style={{ fontFamily: F.sans, fontSize: 20, letterSpacing: 4, color: C.steel }}>DEMOCRATIC PEOPLE’S REPUBLIC OF KOREA</div>
        <div style={{ fontFamily: F.serif, fontSize: 80, color: C.bone, marginTop: 10 }}>Kim Jong Un</div>
        <div style={{ height: 2, background: C.red, width: 80, margin: '26px 0' }} />
        <div style={{ fontFamily: F.sans, fontSize: 28, lineHeight: 1.5, color: 'rgba(236,231,222,.85)' }}>Allied monitors say the regime stole <b style={{ color: C.amber }}>at least $2.84 billion</b> in crypto in 21 months — money that funds its weapons programs.</div>
      </div>
      <Source>Photo: Kremlin.ru, 19 Jun 2024 (CC BY 4.0) · MSMT report, Oct 2025</Source>
    </AbsoluteFill>
  );
};

// 8 — HOST, wide two-shot with the ledger-style split behind him. Ends on the channel line.
export const S8Outro: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames: d } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: C.graphite, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 960, height: 1080, background: '#1E2A22' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 960, height: 1080, background: '#2E1B19' }} />
      <div style={{ position: 'absolute', left: 140, top: 150, fontFamily: F.mono, fontSize: 30, color: '#8FD3A6', opacity: interpolate(f, [5, 20], [0, 1], clamp) }}>SCREEN · Transfer → Warm wallet ✓</div>
      <div style={{ position: 'absolute', right: 140, top: 150, fontFamily: F.mono, fontSize: 30, color: '#FF8A7E', opacity: interpolate(f, [15, 30], [0, 1], clamp) }}>LEDGER · delegatecall → 0x9622…7242</div>
      <div style={{ position: 'absolute', left: 640, top: 170, width: 640, scale: interpolate(f, [0, d], [1.02, 0.96], { easing: io }) }}>
        <Host seed="outro" look={0.1} brow={0.3} smile={0.45} style={{ width: 640 }} />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(12,13,16,.95) 0%, transparent 45%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 90, textAlign: 'center' }}>
        <KineticLine at={30} size={78} text="The screen said one thing." style={{ textAlign: 'center' }} />
        <KineticLine at={60} size={78} text="The ledger said another." italic={['ledger']} style={{ textAlign: 'center' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 22, letterSpacing: 8, color: C.bone, opacity: interpolate(f, [d - 40, d - 20], [0, 1], clamp) }}>THE AUDITOR</div>
    </AbsoluteFill>
  );
};
