import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Landmark, Vote } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building } from '../ep03/PaperWorld';
import { B, Badge, Bug, Frame, Grain, Kicker, NameCard, NightGround, NightHeadline, NightUS, Pin, Src, cond, display } from '../brand/Brand';
import { F } from '../theme';
import { At, Enter, FlyInto, Sound, fr } from './kit';
import { HOOK_DUR, VO_FILE, paraT, wordT } from './t';
import { MUSIC, World } from './parts';
import { Count, Console, PriceTag, Pump, PumpChip, Station, atW, easeO, kk, usd } from './props';

// EP05 · HOOK (paragraphs 0–4, 0:00–0:30). STORY (Jake at a night pump, $62) → the pump display (a year ago $45) →
// NIGHT MAP (Michigan → Washington, El-Sayed print) → paper calendar 2026 → 2028 → back to Jake (what about this number?) →
// the 5-lever DASHBOARD rises, lever 4 towers → levers pulled one by one → fly into lever 1.
const W = wordT;

// ---------- 1 · STORY — Jake fills up at night; the display counts to $62.30; the camera pushes into it
const PUMP_X = 1080, PUMP_Y = 900;
const S1: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const dollars = a(0, "That's"), jake = a(0, 'Jake'), tank = a(0, 'tank');
  const pull = easeO(kk(f, 0, 70));
  const dive = kk(f, tank, fr(end - s));
  const scale = (1.5 - 0.5 * pull) * (1 + dive * dive * 2.2);
  return (
    <AbsoluteFill style={{ transformOrigin: `${PUMP_X}px ${PUMP_Y - 420}px`, transform: `scale(${scale})` }}>
      <Station night price="4.15">
        <Pump x={PUMP_X} y={PUMP_Y} scale={1.05} hose="out" glow={kk(f, 0, dollars)}
          sale={<Count from={0} to={62.3} a={0} b={dollars} fmt={usd} />}
          gal={<Count from={0} to={15} a={0} b={dollars} fmt={(v) => v.toFixed(3)} />} />
        <LiveJake pose="stand" seed="ep05pump" beats={[{ at: 4, r: 'think', hold: jake - 8 }, { at: jake, r: 'doubt', hold: 40 }, { at: tank, r: 'worry', hold: 300 }]}
          style={{ position: 'absolute', left: 1330, top: 330, height: 600, transform: 'scaleX(-1)' }} />
      </Station>
      <Src dark>Jake: illustrative · 15 gal × $4.153 (U.S. regular, EIA week of Nov 2, 2026)</Src>
      <Grain />
    </AbsoluteFill>
  );
};

// ---------- 2 · THE DISPLAY — rolls back to a year ago ($45.29), then +$17
const S2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const year = a(0, 'year'), forty = a(0, 'forty-five');
  const back = kk(f, forty + 16, forty + 22);
  const v = f < forty + 16 ? 62.3 - (62.3 - 45.29) * easeO(kk(f, 2, forty + 4)) : 45.29 + (62.3 - 45.29) * easeO(back);
  const dim = f < forty + 16;
  const tag = spring({ frame: f - (forty + 20), fps, config: { damping: 9, stiffness: 190 } });
  return (
    <Enter kind="zoom" dur={8}>
      <AbsoluteFill style={{ background: '#0C100C' }}>
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,182,76,.12), transparent 60%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center', fontFamily: F.mono, fontSize: 44, letterSpacing: 10, color: 'rgba(232,182,76,.6)' }}>{dim && f >= year ? 'A YEAR AGO · 2025' : 'SALE'}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: F.mono, fontSize: 300, color: B.gold, opacity: dim ? 0.55 : 1, textShadow: '0 0 40px rgba(232,182,76,.55)' }}>{usd(v)}</div>
        <div style={{ position: 'absolute', left: 1480, top: 300, transform: `translate(-50%,-50%) scale(${tag}) rotate(-8deg)`, background: B.red, border: `7px solid ${B.ink}`, color: B.bone, fontFamily: display, fontWeight: 800, fontSize: 120, padding: '0 30px' }}>+$17</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 64, letterSpacing: 8, color: 'rgba(243,238,226,.75)', opacity: kk(f, forty + 22, forty + 30) }}>SAME TANK</div>
        <Src dark>2025: 15 gal × $3.019 (EIA, same week a year earlier) · illustrative</Src>
        <Bug dark /><Grain />
      </AbsoluteFill>
    </Enter>
  );
};

// ---------- 3 · NIGHT MAP — Michigan → Washington, the new senator
const MAP = { x: 300, y: 180, w: 1500 };
const LANSING: [number, number] = [687, 201], DCp: [number, number] = [827, 267];
const S3: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const mich = a(1, 'Michigan'), wash = a(1, 'Washington'), abdul = a(1, 'Abdul');
  const arc = kk(f, wash - 10, wash + 12);
  const sc = MAP.w / 975;
  const zoom = 1 + 0.25 * easeO(kk(f, 0, mich + 20));
  const out = kk(f, abdul - 6, abdul + 6);
  return (
    <Enter kind="fade" dur={8}>
      <NightGround>
        <AbsoluteFill style={{ transformOrigin: `${MAP.x + LANSING[0] * sc}px ${MAP.y + LANSING[1] * sc}px`, transform: `scale(${zoom}) translateX(${-out * 380}px)` }}>
          <NightUS x={MAP.x} y={MAP.y} w={MAP.w} at={0}>
            <Pin x={LANSING[0]} y={LANSING[1]} label="MICHIGAN" dark at={mich} />
            <path d={`M${LANSING[0]} ${LANSING[1]} Q ${(LANSING[0] + DCp[0]) / 2} ${LANSING[1] - 90} ${DCp[0]} ${DCp[1]}`} fill="none" stroke={B.gold} strokeWidth={4} pathLength={1} strokeDasharray={`${arc} 1`} />
            <Pin x={DCp[0]} y={DCp[1]} label="WASHINGTON" dark at={wash + 10} color={B.gold} />
          </NightUS>
        </AbsoluteFill>
        <NightHeadline kicker="Nov 3, 2026" date="Michigan" line="A new senator" at={4} />
        <Frame src="sayed/abdul_el_sayed_meet_and_greet_by_conlan_houston_5_cropped.jpg" x={1380} y={500} w={520} h={560} rot={2.5} at={abdul - 4} year="Photo: Conlan Houston · CC BY-SA 4.0" pos="50% 25%" />
        <div style={{ opacity: kk(f, abdul + 4, abdul + 12) }}>
          <NameCard kicker="Senator-elect · Michigan" title="Abdul El-Sayed" x={600} y={760} at={abdul + 4} size={84} dark w={760} />
        </div>
        <Src dark>Map: U.S. Census / us-atlas · Michigan U.S. Senate, Nov 3, 2026</Src>
        <Bug dark /><Grain />
      </NightGround>
    </Enter>
  );
};

// ---------- 4 · PAPER — the year flips 2026 → 2028, a ghost White House with a "?"
const S4: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const asking = a(1, 'asking'), twenty = a(1, 'twenty');
  const yr = f < twenty ? (f < asking ? 2026 : 2027) : 2028;
  const flip = spring({ frame: f - (yr === 2028 ? twenty : yr === 2027 ? asking : 0), fps, config: { damping: 12, stiffness: 200 } });
  const ghost = kk(f, twenty, twenty + 20);
  return (
    <Enter kind="slideL">
      <World kind="stage" jake={false} whatIf={false}>
        <div style={{ position: 'absolute', left: 1300, top: 860, opacity: 0.25 + ghost * 0.55, transform: `translateY(${(1 - ghost) * 80}px)` }}><Building kind="wh" x={0} y={0} scale={1.4} /></div>
        <div style={{ position: 'absolute', left: 1300, top: 330, transform: `translate(-50%,-50%) scale(${ghost})`, fontFamily: display, fontWeight: 800, fontSize: 220, color: B.red }}>?</div>
        <div style={{ position: 'absolute', left: 620, top: 470, width: 640, transform: 'translate(-50%,-50%) rotate(-2deg)', boxShadow: '14px 14px 0 rgba(27,34,48,.2)' }}>
          <div style={{ background: B.red, border: `6px solid ${B.ink}`, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 60, color: B.bone, letterSpacing: 10 }}>NEXT RACE</div>
          <div style={{ background: B.bone, border: `6px solid ${B.ink}`, borderTop: 'none', textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 250, color: B.ink, lineHeight: 1.1, transform: `rotateX(${(1 - flip) * 70}deg)`, transformOrigin: '50% 0%' }}>{yr}</div>
        </div>
        <Src>Speculation only: El-Sayed is a Senator-elect, not a presidential candidate</Src>
      </World>
    </Enter>
  );
};

// ---------- 5 · STORY — back at the pump: "what would happen to this number?" → zoom into the display
const S5: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const jake = a(2, 'Jake'), ifW = a(2, 'If'), num = a(2, 'number');
  const dive = kk(f, num, fr(end - s));
  return (
    <Enter kind="fade" dur={8}>
      <AbsoluteFill style={{ transformOrigin: `${PUMP_X}px ${PUMP_Y - 420}px`, transform: `scale(${(1.08 + f / 2500) * (1 + dive * dive * 2.6)})` }}>
        <Station night price="4.15">
          <Pump x={PUMP_X} y={PUMP_Y} scale={1.05} sale="$62.30" gal="15.000" glow={0.6 + 0.4 * Math.sin(f / 8)} />
          <LiveJake pose="stand" seed="ep05pump2" face={{ look: -0.8 }} beats={[{ at: 2, r: 'think', hold: jake - 4 }, { at: jake, r: 'nod', hold: 30 }, { at: ifW, r: 'doubt', hold: num - ifW }, { at: num, r: 'surprise', hold: 200 }]}
            style={{ position: 'absolute', left: 1330, top: 330, height: 600, transform: 'scaleX(-1)' }} />
          <div style={{ position: 'absolute', left: 1500, top: 180, opacity: kk(f, ifW, ifW + 8), transform: `scale(${0.6 + 0.4 * kk(f, ifW, ifW + 10)})` }}>
            <div style={{ width: 300, height: 210, borderRadius: '50%', background: B.bone, border: `5px solid ${B.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Landmark size={90} color={B.ink} strokeWidth={2.2} />
            </div>
          </div>
        </Station>
      </AbsoluteFill>
      <PumpChip value="$62.30" at={jake} dark />
      <Src dark>Hypothetical: what a President El-Sayed could and couldn't do about gas prices</Src>
      <Bug dark /><Grain />
    </Enter>
  );
};

// ---------- 6 · THE DASHBOARD — five levers rise; four are small, one towers; pulled one by one → fly into lever 1
const S6: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const five = a(3, 'five'), four = a(3, 'Four'), smaller = a(3, 'smaller'), one = a(3, 'one'), bigger = a(3, 'bigger'), ballot = a(3, 'ballot');
  const pull = a(4, 'pull'), oneBy = a(4, 'one'), by = a(4, 'by');
  const pops = [five + 4, five + 8, five + 12, five + 16, five + 20];
  const pulls = [pull, oneBy + 2, oneBy + 6, by + 4, by + 8];
  const fly = fr(end - s) - 16;
  const shrink = kk(f, smaller - 4, smaller + 10);
  const tower = kk(f, bigger - 4, bigger + 12);
  return (
    <Enter kind="zoom" dur={10}>
      <World kind="road" jake={{ beats: [{ at: five, r: 'think', hold: bigger - five - 4 }, { at: bigger, r: 'surprise', hold: 30 }, { at: ballot + 6, r: 'nod', hold: 200 }] }}>
        <FlyInto at={fly} dur={16} ox="480px 700px" to={8}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '1230px 900px', transform: `scale(${1 + tower * 0.12})` }}>
            <Console x={960} y={760} scale={0.95} at={five - 10} pop={pops} pulls={pulls} dim={shrink > 0.5 && tower < 0.5 ? [] : []} glow={tower > 0.5 ? 3 : -1} />
          </div>
          {[0, 1, 2, 4].map((i) => <div key={i} style={{ position: 'absolute', left: [480, 720, 960, 0, 1480][i] - 70, top: 280, width: 140, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 40, color: B.muted, opacity: shrink * (1 - kk(f, bigger, bigger + 8)) }}>small</div>)}
          <div style={{ position: 'absolute', left: 1230, top: 200, transform: 'translate(-50%,-50%)', opacity: kk(f, ballot - 2, ballot + 8), display: 'flex', alignItems: 'center', gap: 20 }}>
            <Badge I={Vote} x={-130} y={0} at={ballot - 2} size={110} />
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: B.red, marginLeft: 0 }}>&gt;</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: display, fontWeight: 700, fontSize: 96, color: B.ink, opacity: kk(f, five, five + 10) }}>5 levers on gas</div>
        </FlyInto>
        <Src>The president's levers on gas prices · ranked in this video by how much they move Jake's bill</Src>
      </World>
    </Enter>
  );
};

export const EP05_HOOK_FRAMES = fr(HOOK_DUR);
const T0 = 0, T1 = W(0, 'year') - 0.15, T2 = paraT(1), T3 = W(1, 'And', 0), T4 = paraT(2), T5 = paraT(3);
export const EP05Hook: React.FC = () => (
  <AbsoluteFill style={{ background: B.paper }}>
    <At from={T0} to={T1} name="1 story · pump"><S1 s={T0} end={T1} /></At>
    <At from={T1} to={T2} name="2 display"><S2 s={T1} /></At>
    <At from={T2} to={T3} name="3 night map"><S3 s={T2} /></At>
    <At from={T3} to={T4} name="4 2028"><S4 s={T3} /></At>
    <At from={T4} to={T5} name="5 story · this number"><S5 s={T4} end={T5} /></At>
    <At from={T5} to={HOOK_DUR} name="6 dashboard"><S6 s={T5} end={HOOK_DUR} /></At>
    <Sound base={0} vo={VO_FILE} music={MUSIC} cues={[
      [0.2, 'counter', 0.05], [W(0, 'year'), 'counter', 0.04], [W(0, 'forty-five') + 0.6, 'paper', 0.07],
      [W(1, 'Michigan'), 'tick', 0.05], [W(1, 'Washington'), 'tick', 0.05], [W(1, 'Abdul'), 'paper', 0.06], [W(1, 'twenty'), 'paper', 0.06],
      [W(2, 'number'), 'tick', 0.05], [W(3, 'five'), 'paper', 0.06], [W(3, 'bigger'), 'paper', 0.07],
      [W(4, 'pull'), 'tick', 0.06], [W(4, 'one', 0) + 0.1, 'tick', 0.05], [W(4, 'by'), 'tick', 0.05],
    ]} />
  </AbsoluteFill>
);
