import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import { CalendarClock, Receipt, Tag } from 'lucide-react';
import { B, PaperUS, cond, display } from './Brand';

// DOLLARLY THUMBNAIL TEMPLATE v5 — one layout for every episode (1280×720):
//   left: 2 giant lines (ink + red) + one ink strip · right: a REAL photo in a white print frame (official/PD only)
//   bottom-left: one paper prop (doors / a country map) · corner: Dollarly logo. Max 3 elements, readable at 120 px.
// Rules: no AI-generated or AI-altered faces; colour grade only. The words must match what the video shows in its first 30 s.

const Corner: React.FC = () => (
  <div style={{ position: 'absolute', right: 26, top: 22, display: 'flex', alignItems: 'center', gap: 8, background: B.ink, padding: '6px 14px 6px 8px', border: `3px solid ${B.ink}` }}>
    <Img src={staticFile('brand/logo.png')} style={{ width: 38, height: 38 }} />
    <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 26, color: B.bone, letterSpacing: 3 }}>DOLLARLY</div>
  </div>
);

const MiniDoor: React.FC<{ x: number; n: number; c: string; I: typeof Tag; open?: boolean }> = ({ x, n, c, I, open }) => (
  <div style={{ position: 'absolute', left: x, bottom: 34, width: 112, height: 190 }}>
    <div style={{ position: 'absolute', inset: -8, background: B.ink, borderRadius: '6px 6px 0 0' }} />
    {open && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${B.gold}, #F6E3A8)` }} />}
    <div style={{ position: 'absolute', inset: 0, background: c, border: `4px solid ${B.ink}`, transformOrigin: '0% 50%', transform: open ? 'perspective(500px) rotateY(-55deg)' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: B.bone, lineHeight: 1 }}>{n}</div>
      <div style={{ width: 50, height: 50, borderRadius: '50%', background: B.bone, border: `3px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={28} color={B.ink} strokeWidth={2.6} /></div>
    </div>
  </div>
);

const countries = (feature(world as any, (world as any).objects.countries) as any).features;
const CountryMap: React.FC<{ id: string; w: number; h: number }> = ({ id, w, h }) => {
  const target = countries.find((c: any) => c.id === id);
  const proj = geoMercator().fitExtent([[w * 0.12, h * 0.1], [w * 0.88, h * 0.9]], target);
  const p = geoPath(proj);
  return (
    <svg width={w} height={h}>
      <rect width={w} height={h} fill={B.night} />
      {countries.map((c: any, i: number) => <path key={i} d={p(c) || ''} fill={c.id === id ? '#5A1E17' : B.nightLand} stroke={c.id === id ? B.glow : B.nightLine} strokeWidth={c.id === id ? 3 : 1} />)}
      <path d={p(target) || ''} fill="none" stroke={B.glow} strokeWidth={10} opacity={0.45} style={{ filter: 'blur(6px)' }} />
    </svg>
  );
};

export const Thumb: React.FC<{ l1: string; l2: string; strip: string; photo: string; photoPos?: string; art: 'doors' | 'iran'; l1Size?: number; l2Size?: number }> = ({ l1, l2, strip, photo, photoPos = '50% 30%', art, l1Size = 150, l2Size = 168 }) => (
  <AbsoluteFill style={{ background: B.paper }}>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 45%, transparent 55%, rgba(70,52,22,0.28) 100%)' }} />
    {art === 'doors' && (
      <div style={{ position: 'absolute', left: 30, top: 300, opacity: 0.35 }}><PaperUS x={0} y={0} w={700} /></div>
    )}
    {/* photo print, right */}
    <div style={{ position: 'absolute', right: 40, top: 92, width: 450, transform: 'rotate(3deg)', background: '#FBF8F1', padding: 14, boxShadow: '0 22px 40px rgba(40,30,10,.38)' }}>
      <div style={{ height: 560, overflow: 'hidden' }}><Img src={staticFile(photo)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: photoPos }} /></div>
    </div>
    {/* words */}
    <div style={{ position: 'absolute', left: 44, top: 34, width: 820 }}>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: l1Size, lineHeight: 0.88, color: B.ink, textTransform: 'uppercase', letterSpacing: -1 }}>{l1}</div>
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: l2Size, lineHeight: 0.9, color: B.red, textTransform: 'uppercase', letterSpacing: -1, WebkitTextStroke: `3px ${B.ink}` }}>{l2}</div>
      <div style={{ display: 'inline-block', marginTop: 14, background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 50, padding: '4px 18px', letterSpacing: 1, textTransform: 'uppercase', boxShadow: `6px 6px 0 ${B.red}` }}>{strip}</div>
    </div>
    {art === 'doors' && (<>
      <MiniDoor x={70} n={1} c={B.red} I={CalendarClock} open />
      <MiniDoor x={222} n={2} c={B.blue} I={Tag} />
      <MiniDoor x={374} n={3} c={B.pine} I={Receipt} />
      <div style={{ position: 'absolute', left: 520, bottom: 50, background: B.bone, border: `4px solid ${B.ink}`, boxShadow: '5px 5px 0 rgba(27,34,48,.25)', fontFamily: cond, fontWeight: 800, fontSize: 54, color: B.red, padding: '0 16px', transform: 'rotate(-4deg)' }}>DEC 11</div>
    </>)}
    {art === 'iran' && (
      <div style={{ position: 'absolute', left: 50, bottom: 36, border: `4px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.25)' }}><CountryMap id="364" w={430} h={250} /></div>
    )}
    <Corner />
  </AbsoluteFill>
);

export const EP04Thumb: React.FC = () => <Thumb l1="Trump lost" l2="Congress" strip="3 things hit your wallet" photo="ep04/real/trump_official_2025.jpg" art="doors" />;
export const EP04ThumbB: React.FC = () => <Thumb l1="3 things" l2="you'll pay" strip="Trump lost Congress" photo="ep04/real/trump_official_2025.jpg" art="doors" />;
export const EP03ThumbV2: React.FC = () => <Thumb l1="What if?" l2="One order" strip="Iran · gas · your money" photo="ep04/real/trump_official_2025.jpg" art="iran" />;
