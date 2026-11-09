import React from 'react';
import { AbsoluteFill, Audio, Sequence, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Building2, Factory, Landmark, CalendarDays, EyeOff, Signpost, Tag, BellRing, ShieldCheck } from 'lucide-react';
import { Badge, NightUS } from '../brand/Brand';
import { GulfMap, HORMUZ_XY, Van, Pump } from '../ep05/props';
import { HOOK_DUR, VO_FILE, wordT, paraT } from './t';
import {
  At, Apartment, B, Chrome, Cinema, Clock24, CloseUp, Crowd, Enter, Flash, FullFilm, Heli, HorizonCloud, IllusTag, Jake, MapPin,
  NameTag, Phone, PoliceCar, PortNight, Sam, SirenWash, Split, Stamp, atW, cond, display, easeIO, easeO, F, fr, kk, spr,
} from './kit';

// EP07 · HOOK v2 (paragraphs 0–2, 0:00–0:44): film-like and tense, never graphic.
// Ticking clock over the night port → Jake calm → the map closes in → FLASH → real 1946 test film (labelled archival)
// → Sam's face in the orange light, ear ring → sirens: people run, helicopter searchlight, police → Sam runs for the
// concrete building, a glow on the far horizon → Jake sees it on TV → title → the rest stays dark (archival civil-defense
// film, siren light) → meet Sam / meet Jake → two screens, one clock, heartbeat.
const W = wordT;
const PORT_XY: [number, number] = [HORMUZ_XY[0] - 190, HORMUZ_XY[1] + 70]; // unnamed port (no real city)
const CROSSROADS = 'iran/crossroads_baker_1946.mp4';
const ARCH = 'Archival: U.S. "Baker" test, Bikini Atoll, 1946 (Operation Crossroads) · public domain · not the scenario';
const SHELTER = 'iran/footage/af1963_family_shelter.mp4';
const AF = 'Archival: "About Fallout" (1963), U.S. Office of Civil Defense · public domain';

const DarkGround: React.FC<{ children?: React.ReactNode; wash?: number }> = ({ children, wash = 0.35 }) => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, #1B2433 0%, #07090E 75%)' }}>
    <SirenWash k={wash} />
    {children}
  </AbsoluteFill>
);

// TV programmes
const TvCalm: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#2E6B3A, #1E4A28)' }}>
      {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 240 - (f * 3) % 240, top: 0, width: 120, height: 1080, background: 'rgba(255,255,255,.05)' }} />)}
      <div style={{ position: 'absolute', left: 960 + Math.sin(f / 9) * 400, top: 620 + Math.abs(Math.sin(f / 6)) * -200, width: 70, height: 70, borderRadius: 35, background: '#F3EEE2' }} />
      <div style={{ position: 'absolute', left: 80, top: 70, background: B.ink, color: B.bone, fontFamily: F.mono, fontSize: 70, padding: '10px 30px' }}>HOME 14 · AWAY 10</div>
    </AbsoluteFill>
  );
};
const TvBreaking: React.FC<{ trim?: number }> = ({ trim = 60 }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <OffthreadVideo src={staticFile(CROSSROADS)} muted trimBefore={trim} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.15)' }} />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, background: B.red, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 110, padding: '10px 60px', letterSpacing: 6 }}>BREAKING · THE GULF</div>
    <div style={{ position: 'absolute', left: 60, top: 60, fontFamily: F.mono, fontSize: 48, color: '#fff', background: 'rgba(0,0,0,.6)', padding: '4px 16px' }}>ARCHIVE 1946</div>
  </AbsoluteFill>
);

// 1 · ticking clock over the night port
const S1: React.FC<{ s: number }> = () => {
  const f = useCurrentFrame();
  return (
    <Cinema>
      <PortNight push={0.12}>
        <Clock24 x={960} y={420} r={190} hour={18 + f / 3000} at={2} label="SUN · 6:00 PM" />
      </PortNight>
      <Chrome />
    </Cinema>
  );
};
// 2 · Jake calm at home
const S2: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  return (
    <Cinema>
      <Apartment tv={<TvCalm />}>
        <Jake x={420} y={1050} h={760} seed="h2" beats={[{ at: 2, r: 'smile', hold: 200 }, { at: a(0, 'yet'), r: 'nod', hold: 20 }]} />
      </Apartment>
      <Chrome />
    </Cinema>
  );
};
// 3 · the map closes in, red scan
const S3: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const z = 1 + 0.45 * easeIO(kk(f, 0, fr(end - s)));
  return (
    <Cinema grade="saturate(.7) contrast(1.15)">
      <GulfMap labels zoom={z} at={a(0, 'Gulf')}>
        <MapPin x={PORT_XY[0]} y={PORT_XY[1]} label="PORT CITY" at={a(0, 'port')} />
      </GulfMap>
      <AbsoluteFill style={{ background: `linear-gradient(transparent ${((f * 9) % 1300) - 200}px, rgba(229,72,59,.18) ${((f * 9) % 1300) - 180}px, transparent ${((f * 9) % 1300) - 150}px)` }} />
      <Chrome src="Map: Natural Earth · unnamed port (hypothetical)" />
    </Cinema>
  );
};
// 4a · FLASH → real 1946 test film
const S4a: React.FC<{ s: number }> = () => (
  <Cinema shakeAt={4} shake={22} grade="grayscale(1) contrast(1.2)">
    <FullFilm src={CROSSROADS} trim={100} push={0.12} caption={ARCH} />
    <Flash at={0} dur={16} />
  </Cinema>
);
// 4b · Sam's face in the orange light, alert buzzing
const S4b: React.FC<{ s: number }> = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const flick = 0.35 + 0.15 * Math.sin(f / 2.5);
  const ph = spr(f, 8, fps, 15, 150);
  return (
    <Cinema shakeAt={0} shake={8}>
      <CloseUp who="sam" seed="cu4" face={{ brow: 1, smile: -0.7, talk: 0.35, lookY: -0.2 }} beats={[]} light={`rgba(255,160,80,${flick})`} bg="#1A0F0A" />
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - ph) * 700}px)` }}>
        <Phone x={1560} y={640} scale={0.62} rot={8}>
          <div style={{ background: B.red, color: B.bone, padding: '70px 26px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <BellRing size={48} color={B.bone} style={{ transform: `rotate(${Math.sin(f / 2) * 14}deg)` }} />
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 3 }}>EMERGENCY ALERT</div>
          </div>
          <div style={{ padding: '34px 28px', fontFamily: display, fontWeight: 800, fontSize: 56, color: B.ink, lineHeight: 1.1 }}>Shelter now.</div>
        </Phone>
      </div>
      <IllusTag x={210} y={150} />
      <Chrome />
    </Cinema>
  );
};
// 5 · split: Sam in the sirens (people run, helicopter) | Jake still calm
const S5: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const k = spr(f, 0, fps, 18, 120);
  const tw = a(0, 'twenty-four'), diff = a(0, 'differently');
  return (
    <Cinema>
      <Split k={k}
        left={<PortNight alarm={0} dim={0.25}><HorizonCloud at={-60} x={900} y={760} s={0.7} /><Heli x0={1500} x1={700} y={260} dur={110} s={0.9} /><Crowd n={9} y={1040} seed="c5" scale={1.6} /><Sam x={960} y={1010} h={700} seed="s5" pose="phone" beats={[{ at: 2, r: 'worry', hold: 300 }]} /><SirenWash /></PortNight>}
        right={<Apartment tv={<TvCalm />}><Jake x={760} y={1050} h={720} seed="j5" beats={[{ at: 4, r: 'smile', hold: diff - 4 }, { at: diff, r: 'doubt', hold: 200 }]} /></Apartment>}
        clock={<Clock24 x={960} y={330} r={120} hour={0} at={tw - 6} ring={tw} label="HOUR 00" />} />
      <Chrome />
    </Cinema>
  );
};
// 6 · Sam runs for the concrete building: crowd, police, helicopter, the far glow
const S6: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const min = a(0, 'minutes'), safe = a(0, 'safe');
  const t = spr(f, min - 4, fps, 12, 180);
  const run = easeO(kk(f, 2, 60));
  return (
    <Cinema shakeAt={0} shake={5}>
      <PortNight tower={kk(f, safe - 4, safe + 8)} alarm={0} push={0.14} dim={0.2}>
        <HorizonCloud at={-120} x={760} y={800} s={1.3} />
        <Heli x0={200} x1={1300} y={210} dur={70} s={1.1} />
        <PoliceCar x0={-200} x1={2200} y={1000} dur={55} s={1.2} />
        <Crowd n={14} y={1040} seed="c6" speed={1.3} scale={1.7} />
        <Sam x={420 + run * 560} y={1015} h={740} seed="s6" walk beats={[{ at: 0, r: 'surprise', hold: 20 }, { at: 22, r: 'worry', hold: 300 }]} />
        <SirenWash />
      </PortNight>
      <div style={{ position: 'absolute', left: 330, top: 230, transform: `translate(-50%,-50%) scale(${t})`, display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(14,21,23,.92)', border: `5px solid ${B.red}`, padding: '10px 26px' }}>
        <svg width={80} height={80} viewBox="0 0 80 80"><circle cx={40} cy={40} r={32} fill="none" stroke="rgba(243,238,226,.25)" strokeWidth={8} /><circle cx={40} cy={40} r={32} fill="none" stroke={B.red} strokeWidth={8} pathLength={1} strokeDasharray={`${1 - kk(f, min, min + 50)} 1`} transform="rotate(-90 40 40)" /></svg>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 76, color: B.nightText }}>minutes</div>
      </div>
      <Chrome />
    </Cinema>
  );
};
// 7 · Jake sees it on TV: his phone, the TV, his tank (drawn objects, not icons)
const S7: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const ph = a(0, 'phone'), tv = a(0, 'TV'), tank = a(0, 'tank');
  const pk = spr(f, ph - 3, fps, 13, 170), gk = spr(f, tank - 3, fps, 13, 170);
  const tvRing = kk(f, tv - 2, tv + 6) * (1 - kk(f, tv + 20, tv + 30));
  return (
    <Cinema>
      <Apartment tv={<TvBreaking trim={90} />}>
        <div style={{ position: 'absolute', left: 878, top: 188, width: 864, height: 505, border: `8px solid ${B.red}`, opacity: tvRing, boxShadow: '0 0 40px rgba(229,72,59,.7)' }} />
        <Jake x={420} y={1050} h={760} seed="h7" beats={[{ at: 0, r: 'surprise', hold: tv + 4 }, { at: tv + 4, r: 'worry', hold: 300 }]} />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - pk) * 600}px)` }}>
          <Phone x={760} y={760} scale={0.42} rot={-10}>
            <div style={{ background: B.red, color: B.bone, padding: '70px 20px 16px', fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 3 }}>BREAKING</div>
            <div style={{ padding: 22, fontFamily: display, fontWeight: 800, fontSize: 54, color: B.ink }}>Gulf: emergency</div>
          </Phone>
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${(1 - gk) * 900}px)` }}>
          <Pump x={1650} y={1060} scale={0.55} night sale="$4.15" hose="holster" />
        </div>
      </Apartment>
      <Chrome />
    </Cinema>
  );
};
// 8 · title over the 1963 civil-defense cloud film, the dial sweeps
const S8: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const hr = a(0, 'Hour', 1);
  const h = 24 * easeIO(kk(f, hr - 4, hr + 30));
  const t = spr(f, a(0, 'first') - 4, fps, 16, 120);
  return (
    <Cinema grade="contrast(1.1)">
      <AbsoluteFill style={{ opacity: 0.35 }}><FullFilm src={CROSSROADS} trim={150} push={0.05} caption={ARCH} /></AbsoluteFill>
      <Clock24 x={560} y={540} r={240} hour={h} at={0} />
      <div style={{ position: 'absolute', left: 900, top: 380, opacity: t, transform: `translateY(${(1 - t) * 40}px)` }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, lineHeight: 1, color: B.nightText }}>The first<br /><span style={{ color: B.red }}>24 hours</span></div>
      </div>
      <Chrome />
    </Cinema>
  );
};
// 9 · "a what-if" stamped over the 1963 family-shelter film
const S9: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  return (
    <Cinema grade="grayscale(1) contrast(1.15)">
      <AbsoluteFill style={{ opacity: 0.5 }}><FullFilm src={SHELTER} trim={20} push={0.08} caption={AF} /></AbsoluteFill>
      <Stamp text="WHAT IF" x={960} y={540} at={a(1, 'what-if') - 4} size={210} rot={-6} />
      <Chrome />
    </Cinema>
  );
};
// 10 · no guessed numbers: a flickering price board under siren light
const S10: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const num = a(1, 'numbers');
  const scramble = f < num ? Array.from({ length: 4 }, (_, i) => String(Math.floor(Math.abs(Math.sin(f * 0.7 + i * 3)) * 10))).join('') : '????';
  const flick = Math.sin(f * 1.7) > 0.92 ? 0.4 : 1;
  return (
    <Cinema>
      <DarkGround>
        <div style={{ position: 'absolute', left: 900, top: 470, transform: 'translate(-50%,-50%) rotate(-2deg)', background: '#05070A', border: `8px solid #2A3240`, padding: '24px 50px', boxShadow: '0 0 60px rgba(229,72,59,.25)', opacity: flick }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 8, color: B.gold }}>PRICE ON MONDAY</div>
          <div style={{ fontFamily: F.mono, fontSize: 190, color: '#FF5A4A', letterSpacing: 8, textShadow: '0 0 30px rgba(255,90,74,.6)' }}>${scramble.slice(0, 2)}.{scramble.slice(2)}</div>
        </div>
        <Stamp text="NO GUESSES" x={960} y={780} at={num} size={110} color={B.red} rot={-8} />
        <Jake x={1650} y={1080} h={600} seed="h10" flip beats={[{ at: a(1, 'know'), r: 'shrug', hold: 40 }, { at: num, r: 'worry', hold: 60 }]} />
      </DarkGround>
      <Chrome />
    </Cinema>
  );
};
// 11 · official safety guidance (card + a real 1963 civil-defense film print)
const S11: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const c = spr(f, a(1, 'official') - 4, fps, 15, 140);
  return (
    <Cinema>
      <DarkGround wash={0.2}>
        <div style={{ position: 'absolute', left: 560, top: 540, width: 760, height: 470, transform: `translate(-50%,-50%) rotate(-2deg) scale(${spr(f, 0, fps, 16, 120)})`, background: '#FBF8F1', padding: 16, boxShadow: '0 30px 60px rgba(0,0,0,.6)' }}>
          <OffthreadVideo src={staticFile('iran/footage/af1963_home_shelter_anim.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.1)' }} />
        </div>
        <div style={{ position: 'absolute', left: 1360, top: 520, width: 760, transform: `translate(-50%,-50%) rotate(1.5deg) scale(${c})`, background: B.bone, border: `7px solid ${B.ink}`, boxShadow: '18px 18px 0 rgba(0,0,0,.4)' }}>
          <div style={{ background: B.blue, color: B.bone, padding: '14px 26px', display: 'flex', alignItems: 'center', gap: 16 }}><ShieldCheck size={50} color={B.bone} /><span style={{ fontFamily: cond, fontWeight: 800, fontSize: 38, letterSpacing: 5 }}>OFFICIAL SAFETY GUIDANCE</span></div>
          <div style={{ padding: '26px 30px' }}>{[0.92, 0.7, 0.84, 0.6].map((w, i) => <div key={i} style={{ height: 20, width: `${w * 100 * kk(f, 8 + i * 5, 20 + i * 5)}%`, background: 'rgba(27,34,48,.18)', marginBottom: 18 }} />)}</div>
        </div>
      </DarkGround>
      <Chrome src="Guidance today: CDC · Ready.gov · Film: About Fallout (1963), U.S. Office of Civil Defense, public domain" />
    </Cinema>
  );
};
// 12 · four real yardsticks, dark
const YARD: [React.FC<any>, string, string, string][] = [[Building2, '2001', 'WALL ST.', 'real'], [Factory, '2019', 'OIL PLANT', 'days'], [Landmark, '2023', 'BANK RUN', 'crises'], [CalendarDays, '2020', 'SUNDAY', 'yardsticks']];
const S12: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  return (
    <Cinema>
      <DarkGround wash={0.2}>
        {YARD.map(([I, yr, lab, w], i) => {
          const k = spr(f, a(1, w) - 3, fps, 12, 170);
          const x = 330 + i * 420, rot = [-5, 3, -2, 4][i];
          return (
            <div key={i} style={{ position: 'absolute', left: x, top: 520, transform: `translate(-50%,-50%) translateY(${(1 - k) * 700}px) rotate(${rot * k}deg)`, width: 330, height: 420, background: '#E9E3D3', border: `6px solid ${B.ink}`, boxShadow: '0 24px 40px rgba(0,0,0,.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, filter: 'sepia(.3)' }}>
              <I size={120} color={B.ink} strokeWidth={2} />
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 88, color: B.red, lineHeight: 1 }}>{yr}</div>
              <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 38, letterSpacing: 5, color: B.ink }}>{lab}</div>
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 12, color: B.nightText, opacity: kk(f, 0, 10) }}>REAL DAYS · AS YARDSTICKS</div>
      </DarkGround>
      <Chrome />
    </Cinema>
  );
};
// 13 · nothing graphic
const S13: React.FC<{ s: number }> = () => (
  <Cinema>
    <DarkGround wash={0.15}>
      <Badge I={EyeOff} x={960} y={470} at={0} size={240} tone="bone" dark />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 680, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 96, color: B.nightText }}>Nothing graphic.</div>
    </DarkGround>
    <Chrome />
  </Cinema>
);
// 14 · decisions and prices: Jake in the TV light
const S14: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const d = a(1, 'decisions'), p = a(1, 'prices');
  return (
    <Cinema>
      <DarkGround wash={0.25}>
        <Badge I={Signpost} x={600} y={470} at={d - 2} size={230} tone="bone" label="decisions" dark />
        <Badge I={Tag} x={1080} y={470} at={p - 2} size={230} tone="amber" label="prices" dark />
        <Jake x={1620} y={1080} h={660} seed="h14" flip beats={[{ at: d, r: 'think', hold: p - d }, { at: p, r: 'worry', hold: 60 }]} />
      </DarkGround>
      <Chrome />
    </Cinema>
  );
};
// 15 · meet Sam: on the quay under the sirens
const S15: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const x = 300 + Math.min(1, f / 70) * 420;
  return (
    <Cinema>
      <PortNight push={0.08} alarm={0} dim={0.2}>
        <HorizonCloud at={-200} x={1500} y={760} s={0.6} />
        <Crowd n={7} y={1040} seed="c15" scale={1.6} />
        <Sam x={x} y={1010} h={780} seed="s15" walk={f < 70} beats={[{ at: 10, r: 'worry', hold: 300 }]} />
        <SirenWash k={0.7} />
        <NameTag x={x + 380} y={380} name="Sam" at={a(2, 'Sam') - 2} dark />
        <IllusTag x={x + 380} y={480} at={a(2, 'Illustrative')} />
      </PortNight>
      <Chrome />
    </Cinema>
  );
};
// 16 · Sam at the van, police passing
const S16: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const vk = spr(f, 0, fps, 16, 120);
  return (
    <Cinema>
      <PortNight push={0.1} alarm={0} dim={0.2}>
        <div style={{ transform: `translateX(${(1 - vk) * -600}px)` }}><Van x={520} y={1000} scale={1.9} /></div>
        <PoliceCar x0={2200} x1={-300} y={1040} dur={60} s={1.1} />
        <Sam x={1000} y={1010} h={740} seed="s16" pose="phone" beats={[{ at: 4, r: 'worry', hold: 300 }]} />
        <SirenWash k={0.8} />
        <NameTag x={1460} y={380} name="Sam" sub="DELIVERY DRIVER" at={a(2, 'delivery') - 2} dark />
      </PortNight>
      <Chrome />
    </Cinema>
  );
};
// 17 · meet Jake (TV: the 1946 test film, archival)
const S17: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  return (
    <Cinema>
      <Apartment tv={<TvBreaking trim={200} />}>
        <Jake x={420} y={1050} h={760} seed="h17" beats={[{ at: 0, r: 'worry', hold: 300 }]} />
        <NameTag x={780} y={420} name="Jake · 26" at={a(2, 'Jake') - 2} />
      </Apartment>
      <Chrome />
    </Cinema>
  );
};
// 18 · thousands of miles away · 15 gallons
const S18: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const arc = easeO(kk(f, 0, a(2, 'away') + 6));
  const gal = spr(f, a(2, 'fifteen') - 2, fps, 11, 180);
  return (
    <Cinema>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, #1C2D30 0%, ${B.night} 75%)` }}>
        <NightUS x={1060} y={300} w={760} at={0} />
        <MapPin x={260} y={560} label="PORT CITY" at={0} />
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d="M260 560 Q 760 120 1380 480" fill="none" stroke={B.gold} strokeWidth={7} strokeDasharray="22 16" opacity={arc} />
        </svg>
        <div style={{ position: 'absolute', left: 820, top: 230, fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 8, color: B.nightText, opacity: arc }}>THOUSANDS OF MILES</div>
        <div style={{ position: 'absolute', left: 0, top: 0, transform: `scale(${gal})`, transformOrigin: '1420px 900px' }}><Pump x={1420} y={1000} scale={0.45} night sale="$4.15" hose="holster" /></div>
        <div style={{ position: 'absolute', left: 1640, top: 820, transform: `translate(-50%,-50%) scale(${gal})`, background: B.amber, border: `6px solid ${B.ink}`, padding: '6px 22px', fontFamily: display, fontWeight: 800, fontSize: 80, color: B.ink }}>15 gal</div>
      </AbsoluteFill>
      <Chrome src="Map: U.S. Census (us-atlas) · illustrative distance" />
    </Cinema>
  );
};
// 19 · two screens, one clock (heartbeat)
const S19: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const k = spr(f, 0, fps, 18, 120);
  const one = a(2, 'One'), clock = a(2, 'clock');
  const drop = spr(f, one - 4, fps, 12, 150);
  return (
    <Cinema>
      <Split k={k}
        left={<PortNight alarm={0} dim={0.2}><HorizonCloud at={-300} x={900} y={760} s={0.7} /><Crowd n={7} y={1040} seed="c19" scale={1.6} /><Sam x={960} y={1010} h={700} seed="s19" pose="phone" beats={[{ at: 2, r: 'worry', hold: 300 }]} /><SirenWash /></PortNight>}
        right={<Apartment tv={<TvBreaking trim={260} />}><Jake x={760} y={1050} h={720} seed="j19" beats={[{ at: 2, r: 'worry', hold: 300 }]} /></Apartment>}
        clock={<div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - drop) * -700}px)` }}><Clock24 x={960} y={340} r={140} hour={0} at={0} ring={clock} label="HOUR 00" /></div>} />
      <Chrome />
    </Cinema>
  );
};

export const EP07_HOOK_FRAMES = fr(HOOK_DUR);
const T = [
  0, W(0, 'Nothing'), W(0, 'But'), W(0, 'nuclear') - 0.12, W(0, 'just'), W(0, 'Two'), W(0, 'One'), W(0, 'other') - 0.15, W(0, 'This', 1),
  paraT(1), W(1, 'Nobody'), W(1, "We'll"), W(1, 'and'), W(1, 'Nothing'), W(1, 'This', 1), paraT(2), W(2, 'delivery') - 0.12, W(2, 'And'), W(2, 'thousands') - 0.1, W(2, 'Two'), HOOK_DUR,
];
const SHOTS = [S1, S2, S3, S4a, S4b, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19] as unknown as React.FC<{ s: number; end: number }>[];

// ---------- sound design (user asked for film-like fear: clock, boom, ear ring, sirens, helicopter, police, heartbeat)
const A = (p: string) => staticFile('ep07/audio/' + p);
const Sfx: React.FC<{ at: number; src: string; vol: number; dur?: number; fadeOut?: number }> = ({ at, src, vol, dur = 10, fadeOut = 0 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)} layout="none">
    <Audio src={src} volume={(f) => vol * (fadeOut > 0 ? Math.min(1, Math.max(0, (fr(dur) - f) / fr(fadeOut))) : 1)} />
  </Sequence>
);
const HookAudio: React.FC = () => {
  const flash = T[3] + 0.1;
  const ticks = Array.from({ length: Math.floor(flash) }, (_, i) => i);
  return (
    <>
      <Audio src={staticFile(VO_FILE)} volume={1} />
      <Audio src={A('hook_bed.wav')} volume={0.32} />
      {ticks.map((i) => <Sfx key={'t' + i} at={i} src={A('sfx_clock.wav')} vol={0.22 + i * 0.03} dur={1} />)}
      <Sfx at={flash} src={A('sfx_boom.wav')} vol={0.75} dur={6} />
      <Sfx at={flash + 0.2} src={A('sfx_tinnitus.wav')} vol={0.12} dur={3.5} />
      <Sfx at={T[5]} src={staticFile('iran/sfx/siren_manual_wail.mp3')} vol={0.16} dur={8.8} fadeOut={1.5} />
      <Sfx at={T[5] + 0.5} src={A('sfx_heli.wav')} vol={0.13} dur={10} />
      <Sfx at={T[6]} src={A('sfx_police.wav')} vol={0.1} dur={8} />
      <Sfx at={T[15]} src={staticFile('iran/sfx/siren_manual_wail.mp3')} vol={0.09} dur={8.8} fadeOut={2} />
      <Sfx at={T[16]} src={A('sfx_police.wav')} vol={0.07} dur={6} fadeOut={1.5} />
      {[T[8], T[8] + 0.85, T[8] + 1.7, T[19], T[19] + 0.85, T[19] + 1.7].map((t, i) => <Sfx key={'h' + i} at={t} src={A('sfx_heart.wav')} vol={0.45} dur={0.9} />)}
      {[W(1, 'what-if'), W(1, 'numbers'), W(2, 'Sam'), W(2, 'Jake'), W(2, 'clock')].map((t, i) => <Sfx key={'p' + i} at={t} src={staticFile('iran/audio/sfx_paper.wav')} vol={0.08} dur={1.5} />)}
    </>
  );
};

export const EP07Hook: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SHOTS.map((C, i) => <At key={i} from={T[i]} to={i < SHOTS.length - 1 ? T[i + 1] + 0.2 : T[i + 1]} name={`${i + 1}`}><C s={T[i]} end={T[i + 1]} /></At>)}
    <HookAudio />
  </AbsoluteFill>
);
