import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CreditCard, PiggyBank, Smartphone, NotebookPen, LineChart, Vote, Landmark, Banknote, Home, ShieldCheck } from 'lucide-react';
import { Door, Src } from '../brand/Brand';
import { EP_DUR, PER_SEC, paraT, wordT as W } from './t';
import { B, BigLine, Enter, FlyInto, LiveJake, NightAvenue, Odometer, PartShell, Stamp, World, atW, cond, display, easeO, F, fr, kk, partFrames, spr, type Shot } from './kit';
import { Cap, Card, CountUp, Disc, HBar, Line, Pop, Tag } from './scenes';
import { Bug, Grain } from '../brand/Brand';

// =============================================================================================
// PART 09 · THREE THINGS YOU CAN DO (paragraphs 32–35)
// =============================================================================================

const NumCard: React.FC<{ x: number; at: number; n: number; active?: boolean }> = ({ x, at, n, active }) => (
  <Pop x={x} y={520} at={at} rot={[-3, 1, 3][n - 1]}>
    <div style={{ width: 300, height: 380, background: active ? B.amber : B.bone, border: `7px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 260, color: B.ink }}>{n}</div>
  </Pop>
);

// A · three cards drop on the table
const P9A: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const three = a(32, 'three'), pred = a(32, 'predictions'), sens = a(32, 'sensible');
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: three, r: 'nod', hold: 40 }, { at: sens, r: 'smile', hold: 200 }] }} meter={0} t0={s}>
        {[1, 2, 3].map((n) => <NumCard key={n} x={400 + (n - 1) * 380} at={three + (n - 1) * 5} n={n} />)}
        <Stamp text="NOT PREDICTIONS" x={780} y={200} at={pred} size={60} color={B.muted} rot={-4} />
        <Src>General education, not personal financial advice</Src>
      </World>
    </Enter>
  );
};

// B · ① your own debt: the variable-rate card follows rates up → pay it down → interest saved
const P9B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const look = a(33, 'Look'), variable = a(33, 'variable'), follows = a(33, 'follows'), paying = a(33, 'Paying'), certain = a(33, 'certain');
  const bal = 1 - 0.7 * easeO(kk(f, paying, certain));
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: look, r: 'think', hold: paying - look }, { at: certain, r: 'smile', hold: 200 }] }} meter={0} t0={s}>
        <Cap x={180} y={120} at={0} text="①" size={90} color={B.red} />
        <Pop x={560} y={430} at={look} rot={-3}>
          <div style={{ width: 560, height: 340, borderRadius: 30, background: B.blue, border: `7px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.22)', position: 'relative', color: B.bone }}>
            <div style={{ position: 'absolute', left: 40, top: 40 }}><CreditCard size={70} color={B.bone} /></div>
            <div style={{ position: 'absolute', left: 40, bottom: 40, fontFamily: F.mono, fontSize: 36 }}>•••• 4821</div>
          </div>
        </Pop>
        <Tag x={560} y={680} at={variable} text="VARIABLE RATE ↑" tone="red" size={56} rot={2} />
        <HBar x={1000} y={420} w={700} h={100} frac={bal} a={variable} b={variable + 6} color={B.red} label="BALANCE" />
        <Tag x={1350} y={680} at={certain - 4} text="INTEREST SAVED ✓" tone="pine" size={52} rot={-2} />
        <Src>Variable rates on cards and some loans move with market rates (CFPB)</Src>
      </World>
    </Enter>
  );
};

// C · ② make cash work: two accounts, low vs high rate; the coins grow on the higher one
const P9C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const save = a(34, 'save'), accounts = a(34, 'accounts'), compare = a(34, 'Compare'), minutes = a(34, 'minutes'), year = a(34, 'year');
  const pick = kk(f, compare, compare + 10);
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: compare, r: 'think', hold: 40 }, { at: year, r: 'cheer', hold: 200 }] }} meter={0} t0={s}>
        <Cap x={180} y={120} at={0} text="②" size={90} color={B.red} />
        <div style={{ opacity: 1 - kk(f, accounts - 10, accounts - 4) }}><Disc I={PiggyBank} x={760} y={480} at={save - 2} size={240} label="YOUR CASH" tone={B.amber} /></div>
        <Card x={560} y={440} at={accounts - 6} head="ACCOUNT A" value="LOW RATE" w={500} size={74} tone={B.muted} rot={-2} />
        <Card x={1180} y={440} at={accounts} head="ACCOUNT B" value="HIGHER RATE" w={500} size={74} tone={B.pine} rot={2} />
        <div style={{ position: 'absolute', left: 1180, top: 640, transform: `translate(-50%,0) scale(${0.6 + 0.4 * pick})`, opacity: pick, display: 'flex', gap: 10 }}>{Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ width: 60, height: 60, borderRadius: '50%', background: B.amber, border: `5px solid ${B.ink}`, transform: `translateY(${-kk(f, minutes + i * 3, minutes + i * 3 + 8) * 30}px)` }} />)}</div>
        <Disc I={Landmark} x={870} y={760} at={accounts + 6} size={120} label="TREASURIES" />
        <Src>Savings and Treasury yields rise with rates · compare current rates before choosing (FDIC, TreasuryDirect)</Src>
      </World>
    </Enter>
  );
};

// D · ③ don't panic: the COLLAPSE alert goes face-down; budget · emergency fund · steady investing rise instead
const P9D: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const panic = a(35, 'panic'), dramatic = a(35, 'Dramatic'), boring = a(35, 'Boring'), budget = a(35, 'budget'), emergency = a(35, 'emergency'), steady = a(35, 'steady'), every = a(35, 'every');
  const flip = kk(f, dramatic, dramatic + 10);
  return (
    <Enter kind="zoom" dur={10}>
      <FlyInto at={fr(end - s) - 10} dur={12} ox="960px 450px" to={6}>
        <World jake={{ beats: [{ at: panic, r: 'worry', hold: boring - panic }, { at: boring, r: 'smile', hold: 200 }] }} meter={0} t0={s}>
          <Cap x={180} y={120} at={0} text="③" size={90} color={B.red} />
          <div style={{ position: 'absolute', left: 520, top: 480, transform: `translate(-50%,-50%) rotateY(${flip * 180}deg)`, width: 300, height: 560, background: flip > 0.5 ? B.ink : B.bone, border: `7px solid ${B.ink}`, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '12px 12px 0 rgba(27,34,48,.22)' }}>
            {flip < 0.5 && <div style={{ background: B.red, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 44, padding: '10px 16px', letterSpacing: 2, textAlign: 'center' }}>⚠ DOLLAR<br />COLLAPSE!</div>}
          </div>
          <Disc I={NotebookPen} x={1000} y={360} at={budget} size={150} label="BUDGET" />
          <Disc I={ShieldCheck} x={1260} y={560} at={emergency} size={150} label="EMERGENCY FUND" tone={B.amber} />
          <Line x={1120} y={760} w={420} h={140} pts={[[0, 0.1], [0.25, 0.3], [0.5, 0.35], [0.75, 0.6], [1, 0.85]]} a={steady} b={every} color={B.pine} label="STEADY INVESTING" stroke={9} />
          <Src>General education only · not financial advice</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

export const EP06_P9_FRAMES = partFrames(32, 36);
export const EP06Part09: React.FC = () => {
  const shots: Shot[] = [
    [paraT(32), paraT(33), (s) => <P9A s={s} />, 'A three cards'],
    [paraT(33), paraT(34), (s) => <P9B s={s} />, 'B your debt'],
    [paraT(34), paraT(35), (s) => <P9C s={s} />, 'C your cash'],
    [paraT(35), paraT(36), (s) => <P9D s={s} end={paraT(36)} />, 'D no panic'],
  ];
  return <PartShell first={32} shots={shots} cues={[[W(32, 'three'), 'paper', 0.06], [W(33, 'variable'), 'tick', 0.05], [W(33, 'certain'), 'tick', 0.05], [W(34, 'Compare'), 'tick', 0.05], [W(35, 'Dramatic'), 'paper', 0.06], [W(35, 'budget'), 'tick', 0.04], [W(35, 'emergency'), 'tick', 0.04], [W(35, 'steady'), 'tick', 0.04]]} />;
};

// =============================================================================================
// PART 10 · CLOSE (paragraphs 36–37) + disclaimer card (on screen only) + end card
// =============================================================================================

// A · the meter returns, full screen at night; Jake stands next to it
const P10A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const last = a(36, 'last'), thirty = a(36, 'Thirty'), price = a(36, 'price'), watching = a(36, 'watching');
  return (
    <Enter kind="fade" dur={10}>
      <NightAvenue>
        <div style={{ position: 'absolute', left: 820, top: 380, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 42, letterSpacing: 10, color: 'rgba(243,238,226,.75)', opacity: kk(f, last, last + 8) }}>ONE LAST NUMBER</div>
          <div style={{ padding: 22, background: 'rgba(14,21,23,.9)', border: `6px solid ${B.gold}`, borderRadius: 18 }}><Odometer value={PER_SEC * (s + f / fps)} digits={8} h={150} dark /></div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: B.gold, opacity: kk(f, thirty, thirty + 8) }}>$33,350 a second</div>
        </div>
        <LiveJake pose="stand" seed="ep06close" beats={[{ at: thirty, r: 'nod', hold: 40 }, { at: watching, r: 'think', hold: 200 }]} style={{ position: 'absolute', left: 1500, top: 380, height: 520, transform: 'scaleX(-1)' }} />
        <Src dark>FY2026 net interest $1,051.8B ÷ 31.5M s (Monthly Treasury Statement)</Src>
        <Bug dark /><Grain />
      </NightAvenue>
    </Enter>
  );
};

// B · who pays, and when: the three doors + ballot box + Capitol; the disclaimer card slides in at the end
const P10B: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const q = a(36, 'question'), who = a(36, 'who'), voters = a(36, 'voters'), congress = a(36, 'Congress'), years = a(36, 'years');
  const disc = spr(f, years + 6, fps, 16, 140);
  return (
    <Enter kind="slideL">
      <World jake={false} meter={0} t0={s}>
        {[0, 1, 2].map((i) => <Door key={i} x={560 + i * 300} y={860} n={i + 1} I={[Landmark, Home, Banknote][i]} label="" w={180} at={q + i * 4} color={[B.red, B.blue, B.pine][i]} />)}
        <BigLine y={120} at={who - 2} size={100}>Who pays · and when</BigLine>
        <Disc I={Vote} x={420} y={420} at={voters} size={170} label="VOTERS" />
        <Disc I={Landmark} x={1500} y={420} at={congress} size={170} label="CONGRESS" />
        {f >= years + 4 && (
          <div style={{ position: 'absolute', left: 960, top: 600, transform: `translate(-50%,-50%) scale(${disc})`, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.25)', padding: '26px 50px', textAlign: 'center' }}>
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 62, letterSpacing: 6, color: B.ink }}>EDUCATIONAL ONLY</div>
            <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 50, letterSpacing: 6, color: B.red }}>NOT FINANCIAL ADVICE</div>
          </div>
        )}
        <Src>This video is for education only and is not financial advice. Talk to a licensed professional about your situation.</Src>
      </World>
    </Enter>
  );
};

// C · END CARD: logo, slogan, subscribe; the meter keeps ticking small in the corner; held 2 s after the last word
const P10C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const sub = a(37, 'subscribe'), dl = a(37, 'Dollarly'), next = a(37, 'next');
  const lg = spr(f, 2, fps, 12, 150);
  // the disclaimer stays readable for the first ~1.5 s of the end card
  const disc = 1; // the disclaimer line stays on the whole end card
  return (
    <Enter kind="fade" dur={8}>
      <NightAvenue cap={0.25}>
        <Img src={staticFile('brand/logo.png')} style={{ position: 'absolute', left: 960 - 110, top: 170, width: 220, height: 220, transform: `scale(${lg})` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 130, color: B.nightText, opacity: kk(f, dl - 6, dl + 4) }}>Dollarly</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 590, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 56, letterSpacing: 12, color: B.gold, opacity: kk(f, dl, dl + 10) }}>YOUR MONEY. DECODED.</div>
        <div style={{ position: 'absolute', left: 960, top: 760, transform: `translate(-50%,-50%) scale(${spr(f, sub, fps, 10, 190)})`, background: B.red, border: `6px solid ${B.ink}`, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 60, letterSpacing: 6, padding: '10px 40px' }}>SUBSCRIBE</div>
        <div style={{ position: 'absolute', right: 44, top: 36, transform: 'scale(.6)', transformOrigin: '100% 0%', opacity: kk(f, next, next + 10) }}><Odometer value={PER_SEC * (s + f / fps)} digits={8} h={60} dark /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 90, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: 'rgba(243,238,226,.75)', opacity: Math.max(disc, 0.0) }}>EDUCATIONAL ONLY · NOT FINANCIAL ADVICE</div>
        <Bug dark /><Grain />
      </NightAvenue>
    </Enter>
  );
};

const END = EP_DUR + 2.0; // hold the end card 2 s after the last word
export const EP06_P10_FRAMES = fr(END - paraT(36));
export const EP06Part10: React.FC = () => {
  const shots: Shot[] = [
    [paraT(36), W(36, 'question'), (s) => <P10A s={s} />, 'A meter returns'],
    [W(36, 'question'), paraT(37), (s) => <P10B s={s} end={paraT(37)} />, 'B who pays'],
    [paraT(37), END, (s) => <P10C s={s} />, 'C end card'],
  ];
  return <PartShell first={36} shots={shots} cues={[[W(36, 'Thirty'), 'counter', 0.05], [W(36, 'voters'), 'tick', 0.05], [W(36, 'Congress'), 'tick', 0.05], [W(37, 'subscribe'), 'paper', 0.06]]} />;
};
