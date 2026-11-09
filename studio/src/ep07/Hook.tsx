import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Smartphone, Tv, Fuel, ShieldCheck, Building2, Factory, Landmark, CalendarDays, EyeOff, Signpost, Tag, BellRing } from 'lucide-react';
import { Badge, NightUS, PaperGround } from '../brand/Brand';
import { GulfMap, HORMUZ_XY, Van } from '../ep05/props';
import { Sound } from '../ep05/kit';
import { HOOK_DUR, MUSIC, VO_FILE, wordT, paraT } from './t';
import {
  At, Apartment, B, Chrome, MapPin, Clock24, Enter, Flash, IllusTag, Jake, NameTag, Phone, PortNight, Sam, Split, Stamp,
  atW, cond, display, easeIO, easeO, F, fr, kk, spr,
} from './kit';

// EP07 · HOOK (paragraphs 0–2, 0:00–0:44). Cuts every 1–3 s, both characters act on the words.
// Sunday 6 p.m. clock over the night port → Jake calm at home → the Gulf map closes in on an (unnamed) port city
// → a white flash (no cloud, no damage) + emergency alert → split screen Sam | Jake + the 24-hour clock → Sam has
// minutes, the lit concrete building → Jake: phone / TV / tank → title THE FIRST 24 HOURS → WHAT IF → no guessed
// numbers → official guidance → four yardsticks → nothing graphic → decisions & prices → meet Sam → meet Jake → one clock.
const W = wordT;
const PORT_XY: [number, number] = [HORMUZ_XY[0] - 190, HORMUZ_XY[1] + 70]; // unnamed port on the Gulf coast (no real city)

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
const TvBreaking: React.FC = () => (
  <AbsoluteFill>
    <GulfMap labels={false} zoom={1.3} />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 120, background: B.red, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 110, padding: '10px 60px', letterSpacing: 6 }}>BREAKING · THE GULF</div>
  </AbsoluteFill>
);

// 1 · Sunday 6 p.m. over the night port
const S1: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  return (
    <PortNight push={0.08}>
      <Clock24 x={960} y={400} r={190} hour={18 + kk(f, 0, a(0, 'Eastern') + 10) * 0.02} at={2} label="SUN · 6:00 PM" />
      <Chrome src="Hypothetical scenario · Dollarly" />
    </PortNight>
  );
};

// 2 · Jake at home, nothing has happened
const S2: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  return (
    <Enter kind="zoom" dur={10}>
      <Apartment tv={<TvCalm />}>
        <Jake x={420} y={1050} h={760} seed="h2" beats={[{ at: 2, r: 'smile', hold: 200 }, { at: a(0, 'yet'), r: 'nod', hold: 20 }]} />
        <Chrome />
      </Apartment>
    </Enter>
  );
};

// 3 · the Gulf map closes in on a port city
const S3: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const z = 1 + 0.45 * easeIO(kk(f, 0, fr(end - s)));
  return (
    <Enter kind="fade" dur={6}>
      <GulfMap labels zoom={z} at={a(0, 'Gulf')}>
        <MapPin x={PORT_XY[0]} y={PORT_XY[1]} label="PORT CITY" at={a(0, 'port')} />
      </GulfMap>
      <Chrome src="Map: Natural Earth · unnamed port (hypothetical)" />
    </Enter>
  );
};

// 4 · the flash (no cloud, no damage) → silence → emergency alert
const S4: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const used = a(0, 'used');
  const ph = spr(f, used - 6, fps, 15, 140);
  return (
    <AbsoluteFill>
      <GulfMap labels={false} zoom={1.45 + 0.05 * kk(f, 0, 60)} red={4}>
        {[0, 1, 2].map((i) => {
          const k = ((f - 6 - i * 12) / 40) % 1;
          return f > 6 + i * 12 ? <div key={i} style={{ position: 'absolute', left: PORT_XY[0], top: PORT_XY[1], width: 40 + k * 260, height: 40 + k * 260, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: `4px solid ${B.glow}`, opacity: 1 - k }} /> : null;
        })}
        <MapPin x={PORT_XY[0]} y={PORT_XY[1]} />
      </GulfMap>
      <AbsoluteFill style={{ background: 'rgba(0,0,0,.35)' }} />
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - ph) * 900}px)` }}>
        <Phone x={1380} y={560} scale={0.95} rot={4}>
          <div style={{ background: B.red, color: B.bone, padding: '70px 26px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <BellRing size={48} color={B.bone} style={{ transform: `rotate(${Math.sin(f / 2) * 12}deg)` }} />
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 3 }}>EMERGENCY ALERT</div>
          </div>
          <div style={{ padding: '34px 28px', fontFamily: display, fontWeight: 800, fontSize: 54, color: B.ink, lineHeight: 1.1 }}>Shelter now.<br />Follow official channels.</div>
        </Phone>
      </div>
      <Flash at={3} dur={20} />
      <Chrome src="Hypothetical alert (illustrative wording)" />
    </AbsoluteFill>
  );
};

// 5 · split screen: Sam at the port (worried) | Jake at home (unaware) + the clock starts
const S5: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const k = spr(f, 0, fps, 18, 120);
  const tw = a(0, 'twenty-four'), diff = a(0, 'differently');
  return (
    <Split k={k}
      left={<PortNight alarm={0}><Sam x={960} y={1010} h={700} seed="s5" pose="phone" beats={[{ at: 4, r: 'worry', hold: 300 }]} /></PortNight>}
      right={<Apartment tv={<TvCalm />}><Jake x={760} y={1050} h={720} seed="j5" beats={[{ at: 4, r: 'smile', hold: diff - 4 }, { at: diff, r: 'doubt', hold: 200 }]} /></Apartment>}
      clock={<><Clock24 x={960} y={300} r={130} hour={24 * easeO(kk(f, tw, tw + 24)) % 24.001 >= 24 ? 0 : 0} at={tw - 6} ring={tw} label="HOUR 00" /><Chrome /></>} />
  );
};

// 6 · Sam has minutes: the concrete building lights up
const S6: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const min = a(0, 'minutes'), safe = a(0, 'safe');
  const t = spr(f, min - 4, fps, 12, 180);
  const walkK = easeO(kk(f, safe - 6, safe + 40));
  return (
    <Enter kind="slideL" dur={12}>
      <PortNight tower={kk(f, safe - 4, safe + 8)} alarm={0} push={0.1}>
        <Sam x={560 + walkK * 380} y={1010} h={720} seed="s6" walk={f > safe - 6} beats={[{ at: 2, r: 'surprise', hold: 30 }, { at: 34, r: 'worry', hold: 200 }]} />
        <div style={{ position: 'absolute', left: 340, top: 230, transform: `translate(-50%,-50%) scale(${t})`, display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(14,21,23,.92)', border: `5px solid ${B.gold}`, padding: '10px 26px' }}>
          <svg width={80} height={80} viewBox="0 0 80 80"><circle cx={40} cy={40} r={32} fill="none" stroke="rgba(243,238,226,.25)" strokeWidth={8} /><circle cx={40} cy={40} r={32} fill="none" stroke={B.red} strokeWidth={8} pathLength={1} strokeDasharray={`${1 - kk(f, min, min + 60)} 1`} transform="rotate(-90 40 40)" /></svg>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 76, color: B.nightText }}>minutes</div>
        </div>
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d="M760 760 Q 1000 560 1280 640" fill="none" stroke={B.gold} strokeWidth={10} strokeLinecap="round" strokeDasharray="1 0" pathLength={1} style={{ strokeDasharray: `${easeO(kk(f, safe - 2, safe + 14))} 1` }} />
        </svg>
      </PortNight>
      <Chrome src="Hypothetical · official guidance follows in the video" />
    </Enter>
  );
};

// 7 · Jake: a phone, a TV, a gas tank
const S7: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const ph = a(0, 'phone'), tv = a(0, 'TV'), tank = a(0, 'tank');
  return (
    <Enter kind="slideR" dur={12}>
      <Apartment tv={<TvBreaking />}>
        <Jake x={420} y={1050} h={760} seed="h7" beats={[{ at: 2, r: 'surprise', hold: 20 }, { at: tv, r: 'worry', hold: 200 }]} />
        <Badge I={Smartphone} x={900} y={820} at={ph - 2} size={130} tone="bone" />
        <Badge I={Tv} x={1150} y={820} at={tv - 2} size={130} tone="bone" />
        <Badge I={Fuel} x={1400} y={820} at={tank - 2} size={130} tone="amber" />
        <Chrome />
      </Apartment>
    </Enter>
  );
};

// 8 · title: THE FIRST 24 HOURS, the dial sweeps hour by hour
const S8: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const hr = a(0, 'Hour', 1);
  const h = 24 * easeIO(kk(f, hr - 4, hr + 30));
  const t = spr(f, a(0, 'first') - 4, fps, 16, 120);
  return (
    <Enter kind="fade" dur={6}>
      <PortNight dim={0.55} push={0.03}>
        <Clock24 x={560} y={520} r={240} hour={h} at={0} />
        <div style={{ position: 'absolute', left: 900, top: 330, opacity: t, transform: `translateY(${(1 - t) * 40}px)` }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 12, color: B.gold }}>WHAT IF</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, lineHeight: 1, color: B.nightText, marginTop: 10 }}>The first<br /><span style={{ color: B.red }}>24 hours</span></div>
        </div>
      </PortNight>
      <Chrome />
    </Enter>
  );
};

// 9 · WHAT IF stamp on paper
const S9: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  return (
    <Enter kind="rise" dur={12}>
      <PaperGround>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 220, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 12, color: B.muted }}>FIRST, WHAT THIS IS</div>
        <Stamp text="WHAT IF" x={960} y={560} at={a(1, 'what-if') - 4} size={210} rot={-6} />
        <Chrome dark={false} />
      </PaperGround>
    </Enter>
  );
};

// 10 · no guessed numbers: a price board scrambles, then NO GUESSES
const S10: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const num = a(1, 'numbers');
  const scramble = f < num ? Array.from({ length: 4 }, (_, i) => String(Math.floor(Math.abs(Math.sin(f * 0.7 + i * 3)) * 10))).join('') : '????';
  return (
    <Enter kind="slideL" dur={12}>
      <PaperGround>
        <div style={{ position: 'absolute', left: 960, top: 470, transform: 'translate(-50%,-50%) rotate(-2deg)', background: B.ink, border: `8px solid ${B.ink}`, padding: '24px 50px', boxShadow: '16px 16px 0 rgba(27,34,48,.2)' }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 8, color: B.gold }}>PRICE ON MONDAY</div>
          <div style={{ fontFamily: F.mono, fontSize: 190, color: B.bone, letterSpacing: 8 }}>${scramble.slice(0, 2)}.{scramble.slice(2)}</div>
        </div>
        <Stamp text="NO GUESSES" x={1000} y={760} at={num} size={110} color={B.red} rot={-8} />
        <Jake x={1650} y={1080} h={560} seed="h10" flip beats={[{ at: a(1, 'know'), r: 'shrug', hold: 40 }, { at: num, r: 'nod', hold: 30 }]} />
        <Chrome dark={false} />
      </PaperGround>
    </Enter>
  );
};

// 11 · official safety guidance (document card)
const S11: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const c = spr(f, a(1, 'official') - 4, fps, 15, 140);
  return (
    <Enter kind="zoom" dur={10}>
      <PaperGround>
        <div style={{ position: 'absolute', left: 960, top: 520, width: 1000, transform: `translate(-50%,-50%) rotate(1.5deg) scale(${c})`, background: B.bone, border: `7px solid ${B.ink}`, boxShadow: '18px 18px 0 rgba(27,34,48,.2)' }}>
          <div style={{ background: B.blue, color: B.bone, padding: '14px 30px', display: 'flex', alignItems: 'center', gap: 18 }}><ShieldCheck size={56} color={B.bone} /><span style={{ fontFamily: cond, fontWeight: 800, fontSize: 44, letterSpacing: 6 }}>OFFICIAL SAFETY GUIDANCE</span></div>
          <div style={{ padding: '30px 34px' }}>
            {[0.92, 0.7, 0.84, 0.6].map((w, i) => <div key={i} style={{ height: 22, width: `${w * 100 * kk(f, 8 + i * 5, 20 + i * 5)}%`, background: 'rgba(27,34,48,.16)', marginBottom: 20 }} />)}
          </div>
        </div>
        <Chrome dark={false} src="U.S. government guidance: CDC · Ready.gov" />
      </PaperGround>
    </Enter>
  );
};

// 12 · four real yardsticks fan out
const YARD: [React.FC<any>, string, string, string][] = [[Building2, '2001', 'WALL ST.', 'real'], [Factory, '2019', 'OIL PLANT', 'days'], [Landmark, '2023', 'BANK RUN', 'crises'], [CalendarDays, '2020', 'SUNDAY', 'yardsticks']];
const S12: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  return (
    <Enter kind="slideL" dur={12}>
      <PaperGround>
        {YARD.map(([I, yr, lab, w], i) => {
          const k = spr(f, a(1, w, w === 'real' ? 0 : 0) - 3, fps, 12, 170);
          const x = 330 + i * 420, rot = [-5, 3, -2, 4][i];
          return (
            <div key={i} style={{ position: 'absolute', left: x, top: 500, transform: `translate(-50%,-50%) translateY(${(1 - k) * 600}px) rotate(${rot * k}deg)`, width: 330, height: 420, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <I size={120} color={B.ink} strokeWidth={2} />
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 88, color: B.red, lineHeight: 1 }}>{yr}</div>
              <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 38, letterSpacing: 5, color: B.ink }}>{lab}</div>
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 120, right: 120, top: 820, height: 70, background: B.amber, border: `6px solid ${B.ink}`, transform: `scaleX(${easeO(kk(f, a(1, 'yardsticks') - 4, a(1, 'yardsticks') + 14))})`, transformOrigin: '0 50%', display: 'flex' }}>
          {Array.from({ length: 30 }).map((_, i) => <div key={i} style={{ flex: 1, borderRight: `3px solid ${B.ink}`, height: i % 5 === 0 ? 50 : 26 }} />)}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 12, color: B.ink, opacity: kk(f, 0, 10) }}>REAL DAYS · AS YARDSTICKS</div>
        <Chrome dark={false} />
      </PaperGround>
    </Enter>
  );
};

// 13 · nothing graphic
const S13: React.FC<{ s: number }> = () => (
  <Enter kind="zoom" dur={8}>
    <PaperGround>
      <Badge I={EyeOff} x={960} y={470} at={0} size={260} tone="bone" />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 96, color: B.ink }}>Nothing graphic.</div>
      <Chrome dark={false} />
    </PaperGround>
  </Enter>
);

// 14 · decisions and prices
const S14: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const d = a(1, 'decisions'), p = a(1, 'prices');
  return (
    <Enter kind="slideL" dur={12}>
      <PaperGround>
        <Badge I={Signpost} x={620} y={480} at={d - 2} size={240} tone="bone" label="decisions" />
        <Badge I={Tag} x={1100} y={480} at={p - 2} size={240} tone="amber" label="prices" />
        <Jake x={1620} y={1080} h={640} seed="h14" flip beats={[{ at: d, r: 'think', hold: p - d }, { at: p, r: 'nod', hold: 40 }]} />
        <Chrome dark={false} />
      </PaperGround>
    </Enter>
  );
};

// 15 · meet Sam: walks along the quay
const S15: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const x = 250 + Math.min(1, f / 70) * 520;
  return (
    <Enter kind="slideL" dur={12}>
      <PortNight push={0.06}>
        <Sam x={x} y={1010} h={760} seed="s15" walk={f < 70} beats={[{ at: 72, r: 'smile', hold: 200 }]} />
        <NameTag x={x + 360} y={380} name="Sam" at={a(2, 'Sam') - 2} dark />
        <IllusTag x={x + 360} y={480} at={a(2, 'Illustrative')} />
        <Chrome />
      </PortNight>
    </Enter>
  );
};

// 16 · Sam at the van: delivery driver in the port city
const S16: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const vk = spr(f, 0, fps, 16, 120);
  return (
    <Enter kind="zoom" dur={10}>
      <PortNight push={0.08}>
        <div style={{ transform: `translateX(${(1 - vk) * -600}px)` }}><Van x={520} y={1000} scale={1.9} /></div>
        <Sam x={1000} y={1010} h={720} seed="s16" pose="phone" beats={[{ at: 6, r: 'nod', hold: 30 }]} />
        <NameTag x={1460} y={380} name="Sam" sub="DELIVERY DRIVER" at={a(2, 'delivery') - 2} dark />
        <Chrome />
      </PortNight>
    </Enter>
  );
};

// 17 · meet Jake
const S17: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  return (
    <Enter kind="slideR" dur={12}>
      <Apartment tv={<TvBreaking />}>
        <Jake x={420} y={1050} h={760} seed="h17" beats={[{ at: a(2, 'Jake') - 2, r: 'nod', hold: 20 }]} />
        <NameTag x={780} y={420} name="Jake · 26" at={a(2, 'Jake') - 2} />
        <Chrome />
      </Apartment>
    </Enter>
  );
};

// 18 · thousands of miles away · 15 gallons
const S18: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const arc = easeO(kk(f, 0, a(2, 'away') + 6));
  const gal = spr(f, a(2, 'fifteen') - 2, fps, 11, 180);
  return (
    <Enter kind="fade" dur={6}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, #1C2D30 0%, ${B.night} 75%)` }}>
        <NightUS x={1060} y={300} w={760} at={0} />
        <MapPin x={260} y={560} label="PORT CITY" at={0} />
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d="M260 560 Q 760 120 1380 480" fill="none" stroke={B.gold} strokeWidth={7} strokeDasharray="22 16" pathLength={1000} style={{ strokeDashoffset: 0, clipPath: 'none' }} opacity={arc} />
        </svg>
        <div style={{ position: 'absolute', left: 820, top: 230, fontFamily: cond, fontWeight: 800, fontSize: 52, letterSpacing: 8, color: B.nightText, opacity: arc }}>THOUSANDS OF MILES</div>
        <div style={{ position: 'absolute', left: 1420, top: 820, transform: `translate(-50%,-50%) scale(${gal})`, display: 'flex', alignItems: 'center', gap: 16, background: B.amber, border: `6px solid ${B.ink}`, padding: '8px 28px', boxShadow: '10px 10px 0 rgba(0,0,0,.3)' }}>
          <Fuel size={70} color={B.ink} /><span style={{ fontFamily: display, fontWeight: 800, fontSize: 90, color: B.ink }}>15 gal</span>
        </div>
        <Chrome src="Map: U.S. Census (us-atlas) · illustrative distance" />
      </AbsoluteFill>
    </Enter>
  );
};

// 19 · two screens, one clock
const S19: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const k = spr(f, 0, fps, 18, 120);
  const one = a(2, 'One'), clock = a(2, 'clock');
  const drop = spr(f, one - 4, fps, 12, 150);
  return (
    <Split k={k}
      left={<PortNight alarm={0}><Sam x={960} y={1010} h={700} seed="s19" pose="phone" beats={[{ at: 2, r: 'worry', hold: 300 }]} /></PortNight>}
      right={<Apartment tv={<TvBreaking />}><Jake x={760} y={1050} h={720} seed="j19" beats={[{ at: 2, r: 'worry', hold: 300 }]} /></Apartment>}
      clock={<><div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - drop) * -700}px)` }}><Clock24 x={960} y={330} r={150} hour={0} at={0} ring={clock} label="HOUR 00" /></div><Chrome /></>} />
  );
};

export const EP07_HOOK_FRAMES = fr(HOOK_DUR);
const T = [
  0, W(0, 'Nothing'), W(0, 'But'), W(0, 'nuclear') - 0.12, W(0, 'Two'), W(0, 'One'), W(0, 'other') - 0.15, W(0, 'This', 1),
  paraT(1), W(1, 'Nobody'), W(1, "We'll"), W(1, 'and'), W(1, 'Nothing'), W(1, 'This', 1), paraT(2), W(2, 'delivery') - 0.12, W(2, 'And'), W(2, 'thousands') - 0.1, W(2, 'Two'), HOOK_DUR,
];
const SHOTS: React.FC<{ s: number; end: number }>[] = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19] as any;
export const EP07Hook: React.FC = () => (
  <AbsoluteFill style={{ background: B.night }}>
    {SHOTS.map((C, i) => <At key={i} from={T[i]} to={i < SHOTS.length - 1 ? T[i + 1] + 0.3 : T[i + 1]} name={`${i + 1}`}><C s={T[i]} end={T[i + 1]} /></At>)}
    <Sound base={0} vo={VO_FILE} music={MUSIC} cues={[
      [0.1, 'tick', 0.05], [W(0, 'port'), 'paper', 0.05], [W(0, 'used'), 'tick', 0.06], [W(0, 'twenty-four'), 'tick', 0.05],
      [W(0, 'minutes'), 'tick', 0.06], [W(0, 'phone'), 'paper', 0.05], [W(0, 'TV'), 'paper', 0.05], [W(0, 'tank'), 'paper', 0.05],
      [W(0, 'Hour', 1), 'counter', 0.05], [W(1, 'what-if'), 'paper', 0.08], [W(1, 'numbers'), 'paper', 0.08], [W(1, 'official'), 'paper', 0.05],
      [W(1, 'real'), 'paper', 0.05], [W(1, 'days'), 'paper', 0.05], [W(1, 'crises'), 'paper', 0.05], [W(1, 'yardsticks'), 'paper', 0.05],
      [W(1, 'decisions'), 'tick', 0.05], [W(1, 'prices'), 'tick', 0.05], [W(2, 'Sam'), 'paper', 0.05], [W(2, 'delivery'), 'paper', 0.05],
      [W(2, 'Jake'), 'paper', 0.05], [W(2, 'fifteen'), 'tick', 0.05], [W(2, 'clock'), 'tick', 0.06],
    ]} />
  </AbsoluteFill>
);
