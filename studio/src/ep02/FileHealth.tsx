import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Video } from '@remotion/media';
import { ArrowRight, Banknote, Building2, CircleHelp, CircleX, HeartPulse, Landmark, Receipt, Scale, ShieldPlus, Stethoscope, TrendingDown, TrendingUp, User, Users } from 'lucide-react';
import { C, F } from '../theme';
import { clamp, ease } from '../ui/Film';
import { FullBody } from '../host/FullBody';
import { LiveJake } from '../host/LiveJake';
import { Archive, Cue, Ico, Label, Note, Push, Slam, Src, World, useDur } from './Hook';
import { Cut, Cuts, Illus, Wallet, t01 } from './Part1';
import { GAS_MUSIC_FROM } from './FileGas';
import { remap, voFrames } from './timing';

// EP02 · FILE 02 · HEALTH CARE (vo_04). Times written in ORIGINAL-take frames, remapped to the tight VO.
const A = (f: string) => staticFile(`sayed/${f}`);
const VO = 'vo_04';
const rel = (orig: number, shotStart: number) => remap(VO, orig) - remap(VO, shotStart);
const fade = (f: number, at: number, len = 12) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: ease });
const GREEN = '#6FBF73';

// H0 · CARD
const H0: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, justifyContent: 'center', paddingLeft: 160 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <Ico I={HeartPulse} size={120} color={C.red} at={2} />
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 26, color: '#7A7266', letterSpacing: 3, opacity: fade(f, 0, 8) }}>FILE 02</div>
          <div style={{ fontFamily: F.serif, fontSize: 190, color: C.ink, lineHeight: 0.95 }}>Health care</div>
        </div>
      </div>
      <div style={{ width: interpolate(f, [6, 26], [0, 300], { ...clamp, easing: ease }), height: 6, background: C.red, marginTop: 26 }} />
      <Wallet value="≈ $0" />
    </AbsoluteFill>
  );
};

// H1 · WORLD: Jake at the diner reads his stub — his share of a single plan.
const H1: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const o = fade(f, rel(110, 67));
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.15 + 0.05 * t})` }}><World blur={7} /></div>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(12,13,16,.85) 70%)' }} />
      <LiveJake pose="read" seed="h1" stub="−$55.38" beats={[{ at: rel(160, 67), r: 'worry' }]} style={{ position: 'absolute', left: 180, top: 120, height: 1000 }} />
      <div style={{ position: 'absolute', right: 140, top: 290, width: 640, opacity: o, transform: `translateX(${(1 - o) * 30}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><User size={40} color={C.steel} strokeWidth={1.6} /><Label at={0} color={C.steel}>Single coverage · his share</Label></div>
        <Slam text="$1,440" color={C.amber} size={170} at={rel(160, 67)} style={{ marginTop: 10 }} />
        <div style={{ fontFamily: F.sans, fontSize: 30, color: C.bone, marginTop: 10, opacity: fade(f, rel(180, 67)) }}>a year · about <b style={{ color: C.amber }}>$55.38</b> every paycheck</div>
      </div>
      <Src logo="kff.png" logoDark>KFF Employer Health Benefits Survey 2025 · average worker contribution</Src>
    </AbsoluteFill>
  );
};

// H2 · EXPLAINER: if he had a family.
const H2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 120 }}>
        <div style={{ textAlign: 'center', opacity: 0.55 }}>
          <Ico I={User} size={84} color={C.steel} at={0} />
          <div style={{ fontFamily: F.mono, fontSize: 70, color: C.steel }}>$1,440</div>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 22, letterSpacing: 4, color: C.steel }}>SINGLE</div>
        </div>
        <div style={{ textAlign: 'center', opacity: fade(f, 4), transform: `scale(${0.9 + 0.1 * fade(f, 4)})` }}>
          <Ico I={Users} size={110} color={C.amber} at={4} />
          <div style={{ fontFamily: F.mono, fontSize: 120, color: C.amber }}>$6,850</div>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 24, letterSpacing: 4, color: C.bone }}>FAMILY · WORKER'S SHARE / YEAR</div>
        </div>
      </div>
      <Src logo="kff.png" logoDark>KFF Employer Health Benefits Survey 2025</Src>
    </AbsoluteFill>
  );
};

// H3 · REAL SCREEN + EVIDENCE: KFF page, then the full price bar $26,993 (worker vs employer).
const H3: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const bar = fade(f, rel(505, 347), 22);
  const split = fade(f, rel(530, 347), 16);
  return (
    <AbsoluteFill style={{ background: '#fff', overflow: 'hidden' }}>
      <Img src={A('screens/kff_ehbs_2025.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + 0.1 * t})`, transformOrigin: '30% 40%', filter: `blur(${bar * 6}px) brightness(${1 - bar * 0.65})` }} />
      <div style={{ position: 'absolute', left: 140, top: 230, opacity: fade(f, 0), background: 'rgba(12,13,16,.88)', padding: '14px 24px' }}>
        <Label at={0} color={bar > 0.5 ? C.steel : C.amber}>{bar > 0.05 ? 'Full price · average family plan · 2025' : "That's only the worker's share"}</Label>
      </div>
      <div style={{ position: 'absolute', left: 140, right: 140, top: 420, opacity: bar }}>
        <div style={{ fontFamily: F.mono, fontSize: 150, color: C.amber, lineHeight: 1 }}>$26,993</div>
        <div style={{ display: 'flex', height: 70, marginTop: 34, width: `${100 * bar}%` }}>
          <div style={{ width: `${(6850 / 26993) * 100}%`, background: C.bone }} />
          <div style={{ flex: 1, background: C.amber, opacity: 0.35 + 0.65 * split }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: F.sans, fontSize: 28, opacity: split }}>
          <span style={{ color: C.bone }}><User size={26} color={C.bone} strokeWidth={1.8} style={{ verticalAlign: 'middle', marginRight: 8 }} />worker pays $6,850</span>
          <span style={{ color: C.amber }}><Building2 size={26} color={C.amber} strokeWidth={1.8} style={{ verticalAlign: 'middle', marginRight: 8 }} />employer pays $20,143</span>
        </div>
      </div>
      <Src logo="kff.png" logoDark>KFF Employer Health Benefits Survey · Oct 22, 2025</Src>
    </AbsoluteFill>
  );
};

// H4 · EXPLAINER with real money: employer → insurer, the paycheck never sees it.
const H4: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur();
  const box = (I: any, label: string, x: number, col: string, dim = false) => (
    <div style={{ position: 'absolute', left: x, top: 380, width: 340, textAlign: 'center', opacity: dim ? 0.45 : 1 }}>
      <Ico I={I} size={86} color={col} at={x / 120} />
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, letterSpacing: 3, color: col, marginTop: 10 }}>{label}</div>
    </div>
  );
  const fly = interpolate(f, [8, d - 20], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      {box(Building2, 'EMPLOYER', 140, C.bone)}
      {box(Receipt, "JAKE'S PAYCHECK", 790, C.steel, true)}
      {box(ShieldPlus, 'INSURANCE COMPANY', 1440, C.amber)}
      <div style={{ position: 'absolute', left: 900, top: 330, opacity: fade(f, 30) }}><Ico I={CircleX} plain size={120} color={C.red} at={30} /></div>
      {/* money arcs over the paycheck */}
      {[0, 1, 2].map((i) => {
        const p = Math.max(0, Math.min(1, fly - i * 0.12));
        const x = 320 + p * 1250, y = 330 - Math.sin(p * Math.PI) * 220;
        return <Note key={i} v={100} w={260} style={{ position: 'absolute', left: x, top: y, rotate: `${-8 + p * 16}deg`, opacity: p > 0 && p < 1 ? 1 : p >= 1 ? 0.9 : 0 }} />;
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 170, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 58, color: C.bone, opacity: fade(f, 20) }}>paid before it ever reaches the paycheck</div>
      <Src>Illustration · KFF 2025 averages · Notes: uscurrency.gov (SPECIMEN)</Src>
    </AbsoluteFill>
  );
};

// H5 · REAL PHOTO (archive 1973): a hospital — deductibles and copays on top.
const H5: React.FC = () => {
  const f = useCurrentFrame();
  const chip = (I: any, txt: string, at: number) => {
    const o = fade(f, at);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(12,13,16,.86)', padding: '18px 28px', borderLeft: `4px solid ${C.red}`, marginBottom: 20, opacity: o, transform: `translateX(${(1 - o) * -30}px)` }}>
        <Ico I={I} plain size={46} color={C.red} at={at} /><span style={{ fontFamily: F.serif, fontSize: 60, color: C.bone }}>{txt}</span>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('real/doc11_x-ray-treatment-at-george-washington.jpg')} from={1.08} to={1.2} origin="60% 45%" filter="saturate(.8) brightness(1.05) contrast(1.05)" />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.8), transparent 50%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 300 }}>
        <Label at={0} color={C.amber}>And when he actually gets sick</Label>
        <div style={{ marginTop: 26 }}>
          {chip(Receipt, '+ Deductibles', rel(800, 726))}
          {chip(Stethoscope, '+ Copays', rel(830, 726))}
        </div>
      </div>
      <Archive>ARCHIVE · HOSPITAL · 1973</Archive>
      <Src>Photo: Dick Swanson, EPA DOCUMERICA / National Archives (public domain)</Src>
    </AbsoluteFill>
  );
};

// H6 · REAL PHOTO: El-Sayed at the Senate health committee — his answer.
const H6: React.FC = () => {
  const f = useCurrentFrame();
  const o = fade(f, 6);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push src={A('abdul_el_sayed_testifying_at_committee_hearing_2024.jpg')} from={1.35} to={1.45} origin="70% 30%" filter="contrast(1.05) saturate(.9) brightness(.8)" />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(12,13,16,.92), rgba(12,13,16,.55) 50%, transparent 75%)' }} />
      <div style={{ position: 'absolute', left: 120, top: 330, opacity: o }}>
        <Label at={0} color={C.steel}>El-Sayed's answer</Label>
        <div style={{ fontFamily: F.serif, fontSize: 120, color: C.bone, lineHeight: 1, marginTop: 10 }}>Medicare for All</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, opacity: fade(f, rel(1019, 953)) }}>
          <Users size={44} color={C.amber} strokeWidth={1.6} /><span style={{ fontFamily: F.sans, fontSize: 34, color: C.bone }}>one public plan for everyone</span>
        </div>
      </div>
      <Archive>ARCHIVE · U.S. SENATE · 2024</Archive>
      <Src>Photo: U.S. Senate HELP Committee (PD) · Platform: Michigan Public, Oct 20, 2026</Src>
    </AbsoluteFill>
  );
};

// H7 · EXPLAINER checklist: what Jake would stop paying.
const H7: React.FC = () => {
  const f = useCurrentFrame();
  const rows: [string, string, number][] = [['Premiums', 'none', 0], ['Deductibles', 'mostly none', 18], ['Copays', 'mostly none', 34]];
  return (
    <AbsoluteFill style={{ background: C.paper, justifyContent: 'center', paddingLeft: 260 }}>
      {rows.map(([a, b, at]) => {
        const o = fade(f, at);
        return (
          <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 34, marginBottom: 40, opacity: o, transform: `translateX(${(1 - o) * 30}px)` }}>
            <Ico I={CircleX} size={50} color={C.red} at={at} />
            <div style={{ fontFamily: F.serif, fontSize: 100, color: C.ink, width: 640, textDecoration: `line-through ${C.red}` }}>{a}</div>
            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 32, letterSpacing: 3, color: '#7A7266' }}>{b.toUpperCase()}</div>
          </div>
        );
      })}
      <Src dark>Medicare for All as proposed · Michigan Public, Oct 20, 2026</Src>
    </AbsoluteFill>
  );
};

// H8 · WORLD: Jake grins — +$1,440 on paper, the meter ticks up.
const H8: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.2 + 0.05 * t})` }}><World blur={9} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.3)' }} />
      <LiveJake pose="stand" seed="h8" beats={[{ at: rel(1272, 1192), r: 'cheer', hold: 45 }, { at: rel(1272, 1192), r: 'smile' }]} style={{ position: 'absolute', left: 260, top: 80, height: 1250 }} />
      <div style={{ position: 'absolute', right: 140, top: 330, textAlign: 'right' }}>
        <Label at={0} color="#fff">An instant win · on paper</Label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 18 }}><Ico I={Banknote} size={90} color={GREEN} at={rel(1272, 1192)} /><Slam text="+$1,440" color={GREEN} size={180} at={rel(1272, 1192)} /></div>
        <div style={{ fontFamily: F.sans, fontSize: 30, color: '#fff', opacity: fade(f, rel(1300, 1192)) }}>back every year</div>
      </div>
      <Wallet value={f > rel(1290, 1192) ? '+$1,440' : '≈ $0'} />
      <Illus />
    </AbsoluteFill>
  );
};

// H9 · KINETIC: But… someone has to pay for it.
const H9: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 150, color: C.red, opacity: fade(f, 0, 6) }}>But…</div>
      <div style={{ fontFamily: F.serif, fontSize: 96, color: C.bone, opacity: fade(f, rel(1412, 1388)) }}>someone has to pay for it.</div>
    </AbsoluteFill>
  );
};

// H10 · EVIDENCE over real archive footage (generic Congress shot): >$30 trillion over 10 years.
const H10: React.FC = () => {
  const f = useCurrentFrame();
  const card = (who: string, yr: string, v: string, at: number) => {
    const o = fade(f, at);
    return (
      <div style={{ background: 'rgba(243,239,231,.96)', padding: '28px 36px', width: 470, opacity: o, transform: `translateY(${(1 - o) * 30}px)`, boxShadow: '0 30px 60px rgba(0,0,0,.5)' }}>
        <div style={{ fontFamily: F.mono, fontSize: 20, color: '#7A7266', letterSpacing: 2 }}>{who} · {yr}</div>
        <div style={{ fontFamily: F.mono, fontSize: 110, color: C.ink, lineHeight: 1.05 }}>{v}</div>
        <div style={{ fontFamily: F.sans, fontSize: 22, color: '#5A544A' }}>federal cost, 10 years</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, 190], [1.15, 1.25], clamp)})`, transformOrigin: '50% 20%' }}>
        <Video src={A('footage/v06_house_employer_health_hearing_2009.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', filter: 'blur(5px) saturate(.6) brightness(.45)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}><Ico I={Landmark} size={56} color={C.amber} /><Label at={0} color={C.amber}>Independent estimates</Label></div>
        <div style={{ fontFamily: F.serif, fontSize: 92, color: C.bone, marginTop: 6 }}>more than $30 trillion</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center', gap: 60 }}>
        {card('MERCATUS CENTER', '2018', '$32.6T', 20)}
        {card('URBAN INSTITUTE', '2019', '$34T', 34)}
      </div>
      <Archive>ARCHIVE · U.S. HOUSE · 2009</Archive>
      <Src>Mercatus Center (Blahous, 2018) · Urban Institute (2019) · Footage: U.S. House (PD)</Src>
    </AbsoluteFill>
  );
};

// H11 · EXPLAINER: new taxes — the design decides ahead or behind.
const H11: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = interpolate(f, [30, 70, 110, 150], [0, -8, 8, 0], clamp);
  return (
    <AbsoluteFill style={{ background: C.graphite, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `rotate(${tilt}deg)`, transition: 'none' }}><Ico I={Scale} size={170} color={C.bone} at={0} /></div>
      <div style={{ fontFamily: F.serif, fontSize: 80, color: C.bone, marginTop: 20 }}>New taxes. The <i style={{ color: C.amber }}>design</i> decides.</div>
      <div style={{ display: 'flex', gap: 80, marginTop: 34, opacity: fade(f, rel(1800, 1661)) }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.sans, fontSize: 36, color: GREEN }}><TrendingUp size={46} color={GREEN} strokeWidth={1.6} />Jake ahead</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.sans, fontSize: 36, color: C.red }}><TrendingDown size={46} color={C.red} strokeWidth={1.6} />Jake behind</span>
      </div>
    </AbsoluteFill>
  );
};

// H12 · WORLD: the question mark lands on Jake's stub; meter shows +$1,440 − ?
const H12: React.FC = () => {
  const f = useCurrentFrame(); const d = useDur(); const t = t01(f, d);
  const q = fade(f, 6, 10);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1.3 + 0.05 * t})` }}><World blur={12} /></div>
      <AbsoluteFill style={{ background: 'rgba(12,13,16,.35)' }} />
      <LiveJake pose="read" seed="h12" stub="+$1,440 − ?" beats={[{ at: 10, r: 'doubt' }]} style={{ position: 'absolute', left: 500, top: 40, height: 1400 }} />
      <div style={{ position: 'absolute', left: 1240, top: 230, opacity: q, transform: `translateY(${(1 - q) * -80}px)` }}><Ico I={CircleHelp} size={130} color={C.red} at={6} /></div>
      <div style={{ position: 'absolute', left: 110, top: 150, fontFamily: F.serif, fontStyle: 'italic', fontSize: 70, color: '#fff', textShadow: '0 4px 24px rgba(0,0,0,.6)', opacity: fade(f, rel(1930, 1870)) }}>Hold on to that question mark.</div>
      <Wallet value="+$1,440 − ?" />
      <Illus />
    </AbsoluteFill>
  );
};

const HEALTH: Cut[] = [
  ['card', 0, 67, H0], ['single', 67, 242, H1], ['family', 242, 347, H2], ['price', 347, 611, H3], ['employer', 611, 726, H4],
  ['hospital', 726, 953, H5], ['answer', 953, 1086, H6], ['checklist', 1086, 1192, H7], ['win', 1192, 1388, H8], ['but', 1388, 1472, H9],
  ['cost', 1472, 1661, H10], ['design', 1661, 1870, H11], ['question', 1870, 2002, H12],
];
const HEALTH_CUES: Cue[] = [ // soft only
  [0, 'paper', 0.07], [800, 'tick', 0.05], [830, 'tick', 0.05], [1086, 'tick', 0.05], [1104, 'tick', 0.05], [1120, 'tick', 0.05], [1492, 'paper', 0.06],
];
export const HEALTH_MUSIC_FROM = GAS_MUSIC_FROM + voFrames('vo_03') + 10;
export const FileHealth: React.FC = () => <Cuts cuts={HEALTH} vo={VO} musicFrom={HEALTH_MUSIC_FROM} cues={HEALTH_CUES} />;
