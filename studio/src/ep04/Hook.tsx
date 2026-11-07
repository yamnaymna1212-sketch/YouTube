import React from 'react';
import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banknote, CalendarClock, Gavel, Landmark, Receipt, Tag, Vote, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building, Pawn, Road } from '../ep03/PaperWorld';
import { F } from '../theme';
import {
  B, Badge, Bug, ChapterCard, Door, Grain, Kicker, Label, NightGround, NightHeadline, NightUS, PaperGround, PaperUS, Pin, DC_XY, Src, WalletChip, cond, display,
} from '../brand/Brand';
import { At, Enter, FlyInto, Sound, fr } from './kit';
import { T, HOOK_DUR } from './t';
import { Apartment, Dust, Hemicycle, PhoneText, Route, TV_BOX, onArc } from './Story';

// EP04 · HOOK v2 (vo_00) — mostly explainer in the paper style, with Jake living the story around it.
// STORY (Jake's apartment, night) → into the TV → PAPER MAP (pawns, route, seat charts) → 2026 SEAT CHARTS →
// back to Jake (TV off, bills, a text from Dana) → PAPER STAGE (White House ↔ Capitol, three doors) → through door 1 → CHAPTER.
// Real material: only a short archive Capitol shot on Jake's TV. Everything fires on its spoken word (T).

const rel = (sec: number, shotStart: number) => fr(sec - shotStart);
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const TVC = { x: TV_BOX.x + TV_BOX.w / 2, y: TV_BOX.y + TV_BOX.h / 2 };

// ---------- what Jake's TV shows: the deadline night map
const MoneyFloat: React.FC<{ i: number; at: number; flip: number }> = ({ i, at, flip }) => {
  const f = useCurrentFrame();
  if (f < at + i * 7) return null;
  const t = (f - at - i * 7) / 30;
  const fall = f > flip ? (f - flip) / 30 : 0;
  const x = 1588 + (i - 1) * 150 + Math.sin(t * 3 + i) * 12;
  const y = 600 - Math.min(1, t) * (220 + i * 40) + fall * fall * 900;
  return <Badge I={Banknote} x={x} y={y} at={at + i * 7} size={110} tone={f > flip ? 'red' : 'amber'} />;
};
const TVDeadline: React.FC<{ flip: number }> = ({ flip }) => {
  const f = useCurrentFrame();
  const after = f >= flip;
  const secs = Math.min(59, 51 + Math.floor((f / 30) * 1.8));
  return (
    <NightGround>
      <NightUS x={330} y={250} w={1500} at={0}><Pin x={DC_XY[0]} y={DC_XY[1]} label="WASHINGTON" dark at={6} /></NightUS>
      {[0, 1, 2].map((i) => <MoneyFloat key={i} i={i} at={rel(T.midnight + 0.7, 0)} flip={flip} />)}
      <Badge I={Landmark} x={1250} y={560} at={rel(T.midnight + 1.6, 0)} size={120} />
      <NightHeadline kicker="The deadline" date="December 11, 2026" line="The money runs out" at={rel(T.midnight, 0)} />
      <div style={{ position: 'absolute', right: 70, top: 96, textAlign: 'right' }}>
        <div style={{ fontFamily: F.mono, fontSize: 96, color: after ? B.glow : B.nightText, letterSpacing: 4, textShadow: after ? '0 0 26px rgba(229,72,59,.8)' : 'none' }}>{after ? '12:00:00' : `11:59:${secs}`}</div>
        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: 'rgba(243,238,226,.7)' }}>{after ? 'FUNDING LAPSES' : 'FRI · DEC 11'}</div>
      </div>
    </NightGround>
  );
};

// ---------- 1 · STORY — Jake's apartment; the camera pulls back from the TV, then dives into it
const S1Apartment: React.FC<{ start: number; end: number }> = ({ start, end }) => {
  const f = useCurrentFrame();
  const pull = ease(interpolate(f, [0, 80], [0, 1], { extrapolateRight: 'clamp' }));
  const dive = interpolate(f, [rel(T.runsOut + 0.25, start), rel(end, start)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = (2.25 - 1.25 * pull) * (1 + dive * dive * 2.6);
  const filmOn = f >= rel(T.runsOut + 0.2, start);
  return (
    <AbsoluteFill style={{ transformOrigin: `${TVC.x}px ${TVC.y}px`, transform: `scale(${scale})` }}>
      <Apartment tv={filmOn ? (
        <AbsoluteFill style={{ background: '#000' }}>
          <OffthreadVideo src={staticFile('ep04/footage/day_dome_close.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.25) contrast(1.08)' }} />
          <div style={{ position: 'absolute', left: 60, bottom: 50, background: B.red, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 64, padding: '4px 22px', letterSpacing: 2 }}>CONGRESS</div>
        </AbsoluteFill>
      ) : <TVDeadline flip={rel(T.runsOut - 0.3, start)} />}>
        <LiveJake pose="stand" seed="ep04apt" face={{ look: 0.9 }} beats={[{ at: 6, r: 'think', hold: rel(T.runsOut, start) - 10 }, { at: rel(T.runsOut - 0.2, start), r: 'surprise', hold: 30 }]}
          style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
      </Apartment>
      <Src dark>TV: funding runs through Dec 11, 2026 · P.L. 119-103 (CRS R49353) · Map: U.S. Census · Film: 'A Day in Congress', Prelinger Archives (PD)</Src>
      <Grain />
    </AbsoluteFill>
  );
};

// ---------- 2 · PAPER MAP — "And the party that has to fix it just lost its majority."
const MW = 1300, MX = 120, MY = 150, MK = MW / 975;
const DC = [MX + DC_XY[0] * MK, MY + DC_XY[1] * MK] as const;
const S2Map: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const lost = rel(T.lost, start);
  const k = spring({ frame: f - lost, fps, config: { damping: 14, stiffness: 120 } });
  const routes: [number, number, number, number][] = [[420, 520, 760, 260], [700, 700, 980, 420], [560, 380, 900, 200]];
  return (
    <Enter kind="zoom" dur={12}>
      <PaperGround>
        <AbsoluteFill style={{ transformOrigin: `${DC[0]}px ${DC[1]}px`, transform: `scale(${1 + f / 900})` }}>
        <PaperUS x={MX} y={MY} w={MW} />
        {routes.map(([x0, y0, cx, cy], i) => <Route key={i} d={`M${x0} ${y0} Q${cx} ${cy} ${DC[0] - 40 + i * 40} ${DC[1] + 20}`} at={2 + i * 3} />)}
        {routes.map(([x0, y0, cx, cy], i) => {
          const t = ease(interpolate(f, [6 + i * 4, 40 + i * 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
          const [px, py] = onArc(x0, y0, cx, cy, DC[0] - 40 + i * 40, DC[1] + 20, t);
          const land = 40 + i * 4;
          return (
            <React.Fragment key={i}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, filter: `grayscale(${k})`, opacity: 1 - k * 0.5, transform: `translateY(${k * 14}px)` }}>
                <Pawn x={px} y={py + 70} base={B.red} scale={0.62} seed={'mp' + i} hop={land} />
              </div>
              <Dust x={px} y={py + 70} at={land} />
            </React.Fragment>
          );
        })}
        </AbsoluteFill>
        <Label x={DC[0]} y={DC[1] - 150} at={4} size={50}>Washington</Label>
        <Label x={DC[0]} y={DC[1] + 130} at={rel(T.party + 0.6, start)} size={30}>Until Jan 3</Label>
        <div style={{ position: 'absolute', left: DC[0], top: DC[1] - 20, transform: `translate(-50%,-50%) rotate(-7deg) scale(${1.5 - k * 0.5})`, opacity: k, border: `8px solid ${B.red}`, color: B.red, fontFamily: cond, fontWeight: 800, fontSize: 74, padding: '0 22px', letterSpacing: 4, background: 'rgba(246,241,228,.88)', whiteSpace: 'nowrap' }}>MAJORITY LOST</div>
        <Hemicycle x={1660} y={430} r={150} seats={435} rows={9} dot={4.4} blue={240} flipFrom={205} flipAt={lost} label="HOUSE" at={8} />
        <Hemicycle x={1660} y={800} r={150} seats={100} rows={5} dot={9} blue={53} flipFrom={47} flipAt={lost + 4} label="SENATE" at={12} />
        <Src>Seat charts illustrative: final counts not certified (AP, Nov 6 2026) · outgoing Congress sits until Jan 3, 2027</Src>
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

// ---------- 3 · 2026 SEAT CHARTS — "On November third, voters handed Congress to the Democrats."
const S3Seats: React.FC<{ start: number }> = ({ start }) => {
  const dem = rel(T.democrats, start);
  return (
    <Enter kind="slideL">
      <PaperGround>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 200, color: B.ink, lineHeight: 1 }}>2026</div>
        <Label x={960} y={340} at={4} size={50}>3 November 2026</Label>
        <Hemicycle x={540} y={790} r={330} seats={435} rows={11} dot={7.2} blue={240} flipFrom={0} flipAt={dem - 14} flipDur={26} label="HOUSE" at={2} />
        <Hemicycle x={1380} y={790} r={330} seats={100} rows={6} dot={16} blue={53} flipFrom={0} flipAt={dem - 10} flipDur={26} label="SENATE" at={6} />
        <Pawn x={960} y={860} base={B.red} scale={0.8} seed="trump" hop={dem} />
        <Label x={960} y={910} at={10} size={40}>Trump</Label>
        <Src>AP race calls via CNBC / CBS / US News, Nov 4–6 2026 · dots illustrative until results are certified</Src>
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

// ---------- 4 · STORY — back to Jake: TV off, bills, a text from Dana, the one question
const S4Jake: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const off = interpolate(f, [rel(T.jake + 0.3, start), rel(T.jake + 0.6, start)], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const q = spring({ frame: f - rel(T.what, start), fps, config: { damping: 13, stiffness: 140 } });
  const phoneGone = interpolate(f, [rel(T.what, start) - 4, rel(T.what, start) + 4], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Enter kind="fade" dur={10}>
      <AbsoluteFill style={{ transformOrigin: '600px 700px', transform: `scale(${1.18 + f / 3000})` }}>
        <Apartment tvOn={off} tv={<NightGround />}>
          {/* coffee table with bills */}
          <div style={{ position: 'absolute', left: 820, top: 880, width: 620, height: 30, background: '#5B4636', border: `4px solid ${B.ink}` }} />
          {['RENT', 'CAR', 'PHONE'].map((b, i) => (
            <div key={b} style={{ position: 'absolute', left: 860 + i * 180, top: 836 - (i % 2) * 6, width: 150, height: 46, background: B.bone, border: `3px solid ${B.ink}`, transform: `rotate(${(i - 1) * 6}deg)`, fontFamily: cond, fontWeight: 800, fontSize: 28, textAlign: 'center', lineHeight: '42px', color: B.ink }}>{b}</div>
          ))}
          <LiveJake pose="stand" seed="ep04apt2" beats={[{ at: 2, r: 'shrug', hold: rel(T.question, start) - 8 }, { at: rel(T.question, start), r: 'think', hold: rel(T.what, start) - rel(T.question, start) - 4 }, { at: rel(T.what, start), r: 'worry', hold: 300 }]}
            style={{ position: 'absolute', left: 470, top: 300, height: 760 }} />
        </Apartment>
      </AbsoluteFill>
      <Badge I={Vote} x={1300} y={300} at={rel(T.jake + 0.1, start)} size={150} />
      <div style={{ position: 'absolute', left: 1300 - 90, top: 300 - 4, width: 180 * interpolate(f, [rel(T.jake + 0.7, start), rel(T.jake + 1.0, start)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), height: 10, background: B.red, borderRadius: 5, transform: 'rotate(-40deg)', transformOrigin: '0 50%', opacity: phoneGone }} />
      <div style={{ opacity: phoneGone }}><PhoneText from="DANA · COUSIN" text="Shutdown = no paycheck?" x={1080} y={430} at={rel(T.question + 0.2, start)} /></div>
      <div style={{ position: 'absolute', left: 1290, top: 520, width: 1040, transform: `translate(-50%,-50%) scale(${q}) rotate(-1.5deg)`, background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(0,0,0,.3)', padding: '36px 48px' }}>
        <Kicker size={32}>Jake's only question</Kicker>
        <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 120, color: B.ink, lineHeight: 0.98, marginTop: 12, textTransform: 'uppercase' }}>What does this do to <span style={{ color: B.red }}>my money?</span></div>
      </div>
      <WalletChip value="$ ?" at={rel(T.what, start)} dark />
      <div style={{ position: 'absolute', left: 48, bottom: 34, fontFamily: F.mono, fontSize: 16, color: 'rgba(243,238,226,.6)' }}>Dana: illustrative character</div>
      <Bug dark /><Grain />
    </Enter>
  );
};

// ---------- 5 · PAPER STAGE + DOORS — "Because Congress decides three things… Three doors. Let's open them…"
const DX = [720, 960, 1200], DY = 940, DW = 170;
const Swap: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const steps = [T.because, T.because + 1.0, T.because + 1.6, T.because + 2.4].map((t) => rel(t, start));
  const idx = steps.filter((t) => f >= t).length - 1;
  if (idx < 0) return null;
  const pop = spring({ frame: f - steps[idx], fps, config: { damping: 10, stiffness: 180 } });
  const out = interpolate(f, [rel(T.because + 3.2, start), rel(T.because + 3.6, start)], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icons = [Landmark, Gavel, null, Wallet];
  const I = icons[idx];
  const shake = idx === 1 ? Math.sin((f - steps[1]) * 1.6) * Math.max(0, 8 - (f - steps[1]) * 0.6) : 0;
  return (
    <div style={{ position: 'absolute', left: 1250, top: 330, transform: `translate(-50%,-50%) scale(${pop * out}) rotate(${shake}deg)` }}>
      <div style={{ width: 170, height: 170, borderRadius: '50%', background: idx === 3 ? B.amber : B.bone, border: `6px solid ${B.ink}`, boxShadow: '8px 8px 0 rgba(27,34,48,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {I ? <I size={86} color={B.ink} strokeWidth={2.4} /> : <div style={{ fontFamily: display, fontWeight: 800, fontSize: 130, color: B.red, lineHeight: 1 }}>3</div>}
      </div>
    </div>
  );
};
const S5Stage: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const openAt = rel(T.letsOpen + 0.2, start);
  const fly = rel(T.letsOpen + 1.3, start);
  return (
    <Enter kind="zoom" dur={12}>
      <PaperGround>
        <FlyInto at={fly} dur={18} ox={`${DX[0]}px ${DY - DW}px`} to={9}>
          <AbsoluteFill style={{ transformOrigin: '0 0', transform: (() => { const z = 1 - ease(interpolate(f, [rel(T.because + 2.9, start), rel(T.because + 3.8, start)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })); const sc = 1 + 0.7 * z; return `translate(${(960 - 1420 * 1.7) * z}px, ${(500 - 380 * 1.7) * z}px) scale(${sc})`; })() }}>
          <Building kind="wh" x={330} y={500} scale={0.85} />
          <Building kind="cap" x={1590} y={500} scale={0.85} />
          <Road y={470} label="PENNSYLVANIA AVENUE" x1={520} x2={1400} />
          <Label x={330} y={215} at={2} size={42}>White House</Label>
          <Label x={1590} y={215} at={4} size={42}>Congress</Label>
          <Pawn x={600} y={505} base={B.red} scale={0.7} seed="pres5" />
          <Label x={600} y={600} at={6} size={26}>The President</Label>
          <div style={{ position: 'absolute', left: 0, right: 0, top: DY, height: 200, background: B.sand, borderTop: `5px solid ${B.ink}` }} />
          <Door x={DX[0]} y={DY} n={1} I={CalendarClock} label="Open?" at={rel(T.open, start)} openAt={openAt} w={DW} />
          <Door x={DX[1]} y={DY} n={2} I={Tag} label="Prices" at={rel(T.store, start)} color={B.blue} w={DW} />
          <Door x={DX[2]} y={DY} n={3} I={Receipt} label="War bill" at={rel(T.war, start)} color={B.pine} w={DW} />
          <LiveJake pose="point" seed="ep04stage" beats={[{ at: 4, r: 'think', hold: rel(T.threeDoors, start) - 8 }, { at: rel(T.threeDoors, start), r: 'nod', hold: 60 }]}
            style={{ position: 'absolute', left: 1460, top: 560, height: 470, transform: 'scaleX(-1)', opacity: interpolate(f, [rel(T.because + 3.0, start), rel(T.because + 3.5, start)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }} />
          <Swap start={start} />
          </AbsoluteFill>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 40, textAlign: 'center' }}>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 92, color: B.ink, marginTop: 6, opacity: interpolate(f, [rel(T.threeDoors, start), rel(T.threeDoors, start) + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>Three doors to your wallet</div>
          </div>
        </FlyInto>
        <Src>U.S. Const. Art. I, §9 · power of the purse</Src>
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

// ---------- 6 · CHAPTER — Door One
const S6Chapter: React.FC = () => (
  <Enter kind="zoom" dur={12}>
    <ChapterCard n="Door one" title="The Shutdown Clock" sub="Friday, December 11" at={4} />
    <Badge I={CalendarClock} x={960} y={250} at={8} size={120} tone="red" />
    <Bug /><Grain />
  </Enter>
);

export const EP04_HOOK_FRAMES = fr(HOOK_DUR);
const CUT = {
  s1: [0, T.party], s2: [T.party, T.nov3], s3: [T.nov3, T.jake], s4: [T.jake, T.because],
  s5: [T.because, T.letsOpen + 1.85], s6: [T.letsOpen + 1.85, HOOK_DUR],
} as const;

export const EP04Hook: React.FC = () => (
  <AbsoluteFill style={{ background: B.paper }}>
    <At from={CUT.s1[0]} to={CUT.s1[1]} name="1 story · apartment"><S1Apartment start={CUT.s1[0]} end={CUT.s1[1]} /></At>
    <At from={CUT.s2[0]} to={CUT.s2[1]} name="2 paper map"><S2Map start={CUT.s2[0]} /></At>
    <At from={CUT.s3[0]} to={CUT.s3[1]} name="3 seat charts"><S3Seats start={CUT.s3[0]} /></At>
    <At from={CUT.s4[0]} to={CUT.s4[1]} name="4 story · jake"><S4Jake start={CUT.s4[0]} /></At>
    <At from={CUT.s5[0]} to={CUT.s5[1]} name="5 stage + doors"><S5Stage start={CUT.s5[0]} /></At>
    <At from={CUT.s6[0]} to={CUT.s6[1]} name="6 chapter"><S6Chapter /></At>
    <Sound base={0} music="iran/audio/music_ep03.mp3" cues={[
      [0.4, 'tick', 0.04], [1.4, 'tick', 0.04], [2.4, 'tick', 0.04], [3.4, 'tick', 0.04], [4.4, 'tick', 0.05],
      [T.party + 1.4, 'paper', 0.05], [T.lost, 'paper', 0.08], [T.nov3 + 0.1, 'paper', 0.06], [T.question + 0.2, 'type', 0.06],
      [T.open, 'paper', 0.06], [T.store, 'paper', 0.06], [T.war, 'paper', 0.06], [T.letsOpen + 0.2, 'paper', 0.07],
    ]} />
  </AbsoluteFill>
);
