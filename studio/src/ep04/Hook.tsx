import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CalendarClock, Receipt, Tag } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building, Pawn, Road } from '../ep03/PaperWorld';
import { F } from '../theme';
import {
  B, Badge, Bug, ChapterCard, Door, Frame, FullFilm, Grain, Kicker, Label, NameCard, NightGround, NightHeadline, NightUS,
  PaperGround, PaperUS, Pin, DC_XY, Src, WalletChip, cond, display,
} from '../brand/Brand';
import { At, Enter, FlyInto, Push, Sound, fr } from './kit';
import { T, HOOK_DUR } from './t';

// EP04 · HOOK (vo_00) — "Trump Just Lost Congress. 3 Things Happen to Your Money."
// Families: NIGHT MAP → REAL FILM → PAPER STAGE → ARCHIVE PRINT (official portrait) → JAKE EXPLAINS → PAPER MAP + DOORS → CHAPTER.
// Every shot enters through a link (zoom-through, slide, rise); every element fires on its spoken word (T = word starts).

const rel = (sec: number, shotStart: number) => fr(sec - shotStart);

// ---------- 1 · NIGHT MAP — "Friday, December eleventh. At midnight, the money … runs out."
const MAP_W = 1500, MAP_X = 330, MAP_Y = 250;
const dcPx = (k: number) => [MAP_X + DC_XY[0] * (MAP_W / 975) * k, MAP_Y + DC_XY[1] * (MAP_W / 975) * k];
const S1Deadline: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const flip = rel(T.runsOut - 0.25, start);
  const secs = Math.min(59, 52 + Math.floor(f / 30 * 1.6));
  const after = f >= flip;
  const [dx, dy] = dcPx(1);
  return (
    <NightGround>
      <FlyInto at={rel(T.runsOut + 0.1, start)} dur={14} ox={`${dx}px ${dy}px`} to={9}>
        <Push to={1.08} dur={170} ox={`${dx}px ${dy}px`}>
          <NightUS x={MAP_X} y={MAP_Y} w={MAP_W} at={4}>
            <Pin x={DC_XY[0]} y={DC_XY[1]} label="WASHINGTON" dark at={10} />
          </NightUS>
        </Push>
      </FlyInto>
      <NightHeadline kicker="The deadline" date="December 11, 2026" line="The money runs out" at={rel(T.midnight, start)} />
      {/* clock chip */}
      <div style={{ position: 'absolute', right: 70, top: 96, textAlign: 'right' }}>
        <div style={{ fontFamily: F.mono, fontSize: 88, color: after ? B.glow : B.nightText, letterSpacing: 4, textShadow: after ? '0 0 26px rgba(229,72,59,.8)' : 'none' }}>{after ? '12:00:00' : `11:59:${secs}`}</div>
        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: 'rgba(243,238,226,.65)' }}>{after ? 'SAT · DEC 12 · FUNDING LAPSES' : 'FRI · DEC 11 · PM'}</div>
      </div>
      <Src dark>Government funded through Dec 11, 2026 · P.L. 119-103 (CRS R49353) · Map: U.S. Census</Src>
      <Bug dark /><Grain />
    </NightGround>
  );
};

// ---------- 2 · REAL FILM — the vault door ("runs out")
const S2Vault: React.FC = () => (
  <Enter kind="zoom" dur={12}>
    <FullFilm src="ep04/footage/cap_vault.mp4" rate={0.8} caption="U.S. Treasury vault · 'Washington: The Nation's Capitol' (Pathégrams, 1930s) · Prelinger Archives, public domain" />
    <Label x={960} y={880} at={6} size={64} tone="ink">The money runs out</Label>
    <Grain k={0.09} />
  </Enter>
);

// ---------- 3 · PAPER STAGE — "And the party that has to fix it just lost its majority."
const S3Stage: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const lost = rel(T.lost, start);
  const k = spring({ frame: f - lost, fps, config: { damping: 14, stiffness: 120 } });
  return (
    <Enter kind="slideL">
      <PaperGround>
        <Push to={1.05} dur={150}>
          <Building kind="wh" x={420} y={700} />
          <Building kind="cap" x={1500} y={700} />
          <Road y={668} label="PENNSYLVANIA AVENUE" />
          <Label x={420} y={420} at={4} size={46}>White House</Label>
          <Label x={1500} y={420} at={8} size={46}>Congress</Label>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, opacity: 1 - k * 0.55, filter: `grayscale(${k})` }}>
              <Pawn x={1330 + i * 120} y={720} base={B.red} seed={'gop' + i} hop={i === 1 ? 12 : -1} />
            </div>
          ))}
          <Pawn x={640} y={720} base={B.red} seed="pres4" />
          <Label x={640} y={765} at={10} size={30}>The President</Label>
          <Label x={1450} y={770} at={rel(T.party + 0.4, start)} size={30}>Majority until Jan 3</Label>
        </Push>
        <div style={{ position: 'absolute', left: 1500, top: 250, transform: `translate(-50%,-50%) rotate(-6deg) scale(${1.5 - k * 0.5})`, opacity: k, border: `8px solid ${B.red}`, color: B.red, fontFamily: cond, fontWeight: 800, fontSize: 80, padding: '0 26px', letterSpacing: 4, background: 'rgba(246,241,228,.85)' }}>MAJORITY LOST</div>
        <div style={{ position: 'absolute', left: 80, top: 80 }}><Kicker>Who has to fix it?</Kicker></div>
        <Src>Outgoing Congress sits until Jan 3, 2027 · new Congress sworn in Jan 3</Src>
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

// ---------- 4 · ARCHIVE PRINT — official portrait + name card — "On November third, voters handed Congress to the Democrats."
const S4Portrait: React.FC<{ start: number }> = ({ start }) => (
  <Enter kind="slideL">
    <PaperGround>
      <Push to={1.05} dur={110} ox="70% 50%">
        <Frame src="ep04/footage/cap_house_floor.mp4" video x={1500} y={640} w={560} h={400} rot={5} at={rel(T.democrats, start)} year="House chamber · 1930s" rate={0.8} />
        <Frame src="ep04/real/trump_official_2025.jpg" x={1260} y={520} w={470} h={590} rot={-3} at={2} year="2025" grade="none" pos="50% 30%" />
      </Push>
      <NameCard kicker="November 3, 2026" title="Donald J. Trump" lines={['47th president · second term.', 'His party just lost Congress.']} x={110} y={300} at={4} size={118} w={900} />
      <div style={{ position: 'absolute', left: 110, top: 760, display: 'flex', gap: 20 }}>
        <Label x={130} y={30} at={rel(T.democrats, start)} size={40} tone="ink">House → Democrats</Label>
        <Label x={480} y={30} at={rel(T.democrats + 0.3, start)} size={40} tone="ink">Senate → Democrats</Label>
      </div>
      <Src>Official portrait: The White House (2025), public domain · Results: AP calls via CBS/CNBC, Nov 4–6 2026 · Film: Prelinger Archives, PD</Src>
      <Bug /><Grain />
    </PaperGround>
  </Enter>
);

// ---------- 5 · JAKE EXPLAINS — "Jake doesn't care who won. He cares about one question. What does this do to my money?"
const S5Jake: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const q = spring({ frame: f - rel(T.what, start), fps, config: { damping: 13, stiffness: 140 } });
  return (
    <Enter kind="rise" dur={16}>
      <PaperGround>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 170, background: 'rgba(27,34,48,.07)', borderTop: `5px solid ${B.ink}` }} />
        <LiveJake pose="stand" seed="ep04hook" beats={[{ at: 2, r: 'shrug', hold: rel(T.question, start) - 8 }, { at: rel(T.question, start), r: 'think', hold: 40 }, { at: rel(T.what, start), r: 'worry', hold: 200 }]}
          style={{ position: 'absolute', left: 170, top: 150, height: 900 }} />
        <div style={{ position: 'absolute', left: 1240, top: 470, width: 1060, transform: `translate(-50%,-50%) scale(${q}) rotate(-1.5deg)`, background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.2)', padding: '40px 50px' }}>
          <Kicker size={32}>Jake's only question</Kicker>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 124, color: B.ink, lineHeight: 0.98, marginTop: 14, textTransform: 'uppercase' }}>What does this do to <span style={{ color: B.red }}>my money?</span></div>
        </div>
        <Label x={1060} y={190} at={4} size={44} rot={-2}>Who won? Not the point.</Label>
        <WalletChip value="$ ?" at={rel(T.what, start)} />
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

// ---------- 6 · PAPER MAP + THREE DOORS — "Because Congress decides three things… open … store … war. Three doors. Let's open them…"
const DOOR_X = [560, 960, 1360], DOOR_Y = 860;
const S6Doors: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const openAt = rel(T.letsOpen + 0.2, start);
  const fly = rel(T.letsOpen + 1.3, start);
  return (
    <Enter kind="drop" dur={16}>
      <PaperGround>
        <FlyInto at={fly} dur={18} ox={`${DOOR_X[0]}px ${DOOR_Y - 200}px`} to={8}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
            <PaperUS x={360} y={150} w={1200}>
              <Pin x={DC_XY[0]} y={DC_XY[1]} label="CONGRESS" at={6} color={B.red} />
            </PaperUS>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: DOOR_Y, height: 240, background: B.sand, borderTop: `5px solid ${B.ink}` }} />
          <Door x={DOOR_X[0]} y={DOOR_Y} n={1} I={CalendarClock} label="Stays open?" at={rel(T.open, start)} openAt={openAt} />
          <Door x={DOOR_X[1]} y={DOOR_Y} n={2} I={Tag} label="The price tag" at={rel(T.store, start)} color={B.blue} />
          <Door x={DOOR_X[2]} y={DOOR_Y} n={3} I={Receipt} label="The war bill" at={rel(T.war, start)} color={B.pine} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center' }}>
            <Kicker size={34}>What Congress decides</Kicker>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 96, color: B.ink, marginTop: 6, opacity: interpolate(f, [rel(T.threeDoors, start), rel(T.threeDoors, start) + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>Three doors to your wallet</div>
          </div>
        </FlyInto>
        <Src>Art. I, §9: "No Money shall be drawn from the Treasury, but in Consequence of Appropriations made by Law"</Src>
        <Bug /><Grain />
      </PaperGround>
    </Enter>
  );
};

// ---------- 7 · CHAPTER — Door One
const S7Chapter: React.FC = () => (
  <Enter kind="zoom" dur={12}>
    <ChapterCard n="Door one" title="The Shutdown Clock" sub="Friday, December 11" at={4} />
    <Badge I={CalendarClock} x={960} y={250} at={8} size={120} tone="red" />
    <Bug /><Grain />
  </Enter>
);

export const EP04_HOOK_FRAMES = fr(HOOK_DUR);
const CUT = {
  s1: [0, T.runsOut + 0.55], s2: [T.runsOut + 0.55, T.party], s3: [T.party, T.nov3], s4: [T.nov3, T.jake],
  s5: [T.jake, T.because], s6: [T.because, T.letsOpen + 1.85], s7: [T.letsOpen + 1.85, HOOK_DUR],
} as const;

export const EP04Hook: React.FC = () => (
  <AbsoluteFill style={{ background: B.paper }}>
    <At from={CUT.s1[0]} to={CUT.s1[1]} name="1 night map"><S1Deadline start={CUT.s1[0]} /></At>
    <At from={CUT.s2[0]} to={CUT.s2[1]} name="2 vault film"><S2Vault /></At>
    <At from={CUT.s3[0]} to={CUT.s3[1]} name="3 paper stage"><S3Stage start={CUT.s3[0]} /></At>
    <At from={CUT.s4[0]} to={CUT.s4[1]} name="4 portrait"><S4Portrait start={CUT.s4[0]} /></At>
    <At from={CUT.s5[0]} to={CUT.s5[1]} name="5 jake"><S5Jake start={CUT.s5[0]} /></At>
    <At from={CUT.s6[0]} to={CUT.s6[1]} name="6 doors"><S6Doors start={CUT.s6[0]} /></At>
    <At from={CUT.s7[0]} to={CUT.s7[1]} name="7 chapter"><S7Chapter /></At>
    <Sound base={0} music="iran/audio/music_ep03.mp3" cues={[
      [0.2, 'tick', 0.05], [1.2, 'tick', 0.05], [2.2, 'tick', 0.05], [3.2, 'tick', 0.05], [4.2, 'tick', 0.05],
      [T.party + 0.2, 'paper', 0.06], [T.lost, 'paper', 0.08], [T.nov3 + 0.1, 'paper', 0.06], [T.what, 'type', 0.06],
      [T.open, 'paper', 0.06], [T.store, 'paper', 0.06], [T.war, 'paper', 0.06], [T.letsOpen + 0.2, 'paper', 0.07],
    ]} />
  </AbsoluteFill>
);

