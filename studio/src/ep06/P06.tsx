import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Anchor, Armchair, Building2, Car, Home, PiggyBank, Search, ShoppingCart, Landmark, CalendarDays, Eye, HelpCircle } from 'lucide-react';
import { Src } from '../brand/Brand';
import { paraT, wordT as W } from './t';
import { B, BigLine, Enter, FlyInto, Illus, LiveJake, NightAvenue, PartShell, Pawn, Stamp, World, atW, cond, display, easeO, F, fr, kk, partFrames, spr, type Shot, FlipCalendar } from './kit';
import { Cap, Card, CountUp, Disc, HBar, Line, Pop, Tag, VBar } from './scenes';
import { DoorChapter } from './P04';
import { Bug, Grain, NightGround } from '../brand/Brand';

// =============================================================================================
// PART 06 · DOOR 3 · THE DOLLAR (paragraphs 20–24)
// =============================================================================================

// B · the newsstand: scary headlines → a magnifying glass labelled EVIDENCE slides over them
const P6B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const scary = a(21, 'scary'), far = a(21, 'far'), careful = a(21, 'careful'), ev = a(21, 'evidence');
  const glass = easeO(kk(f, careful - 4, ev + 6));
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: scary, r: 'worry', hold: careful - scary }, { at: ev, r: 'nod', hold: 200 }] }} meter={0} t0={s}>
        {['DOLLAR DOOM?', 'THE END OF $', 'CRASH COMING'].map((t, i) => (
          <Pop key={i} x={420 + i * 380} y={420 + (i % 2) * 40} at={scary - 4 + i * 4} rot={[-4, 3, -2][i]}>
            <div style={{ width: 340, background: B.bone, border: `5px solid ${B.ink}`, padding: '14px 18px', boxShadow: '8px 8px 0 rgba(27,34,48,.2)' }}>
              <div style={{ height: 8, background: B.ink, width: '40%', marginBottom: 10 }} />
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 54, color: B.ink, lineHeight: 1 }}>{t}</div>
              {[0.9, 0.6].map((w, j) => <div key={j} style={{ height: 8, width: `${w * 100}%`, background: 'rgba(27,34,48,.15)', marginTop: 10 }} />)}
            </div>
          </Pop>
        ))}
        <Stamp text="TOO FAR" x={800} y={240} at={far} size={64} rot={-5} />
        <div style={{ position: 'absolute', left: -200 + glass * 1000, top: 330, transform: 'rotate(-12deg)', opacity: kk(f, careful - 6, careful) }}>
          <svg width={320} height={420} style={{ overflow: 'visible' }}>
            <circle cx={150} cy={150} r={120} fill="rgba(201,211,207,.35)" stroke={B.ink} strokeWidth={18} />
            <path d="M235 235 L320 400" stroke={B.ink} strokeWidth={34} strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', left: 40, top: 440, fontFamily: cond, fontWeight: 800, fontSize: 46, letterSpacing: 4, color: B.pine, opacity: kk(f, ev, ev + 6) }}>EVIDENCE</div>
        </div>
        <Src>Headlines are generic examples, not quotes from any outlet</Src>
      </World>
    </Enter>
  );
};

// C · reserves: 100 dots, 57 turn USD, 21 EUR, the rest small
const P6C: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const reserve = a(22, 'reserve'), fifty = a(22, 'fifty'), euro = a(22, 'euro'), close = a(22, 'close');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={false} meter={0} t0={s}>
        <Cap x={620} y={150} at={reserve - 4} text="WORLD CURRENCY RESERVES" size={46} />
        <div style={{ position: 'absolute', left: 260, top: 220, width: 660, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const usd = i < 57, eur = i >= 57 && i < 78;
            const turn = usd ? kk(f, fifty + i * 0.35, fifty + i * 0.35 + 4) : eur ? kk(f, euro + (i - 57) * 0.5, euro + (i - 57) * 0.5 + 4) : kk(f, close, close + 8);
            const col = usd ? B.pine : eur ? B.blue : B.muted;
            return <div key={i} style={{ width: 52, height: 52, borderRadius: '50%', border: `4px solid ${B.ink}`, background: turn > 0.5 ? col : B.bone, transform: `scale(${0.85 + 0.15 * turn})`, opacity: kk(f, i * 0.2, i * 0.2 + 6) }} />;
          })}
        </div>
        <Tag x={1400} y={360} at={fifty + 8} text="DOLLAR 57%" tone="pine" size={88} rot={-3} />
        <Tag x={1400} y={570} at={euro + 4} text="EURO 21%" tone="blue" size={70} rot={2} />
        <Cap x={1400} y={740} at={close} text="EVERYONE ELSE: SMALL" size={40} color={B.muted} />
        <Src>IMF COFER, 2026 Q2: U.S. dollar 56.7% · euro 20.6% of allocated foreign-exchange reserves</Src>
      </World>
    </Enter>
  );
};

// D · the Fed's broad dollar index: a year ago 121.9 ≈ now 121.7 (flat line)
const P6D: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const basket = a(22, 'basket'), fed = a(22, 'Federal'), year = a(22, 'year');
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: year, r: 'shrug', hold: 200 }] }} meter={0} t0={s}>
        <BigLine y={110} at={2} size={80}>The dollar vs. the world</BigLine>
        <Line x={260} y={360} w={1080} h={340} pts={[[0, 0.52], [0.15, 0.35], [0.3, 0.42], [0.45, 0.3], [0.6, 0.45], [0.75, 0.4], [0.9, 0.55], [1, 0.5]]} a={basket} b={year + 8} color={B.pine} dots={['121.9', '121.7']} label="FED BROAD DOLLAR INDEX" />
        <Tag x={800} y={830} at={year + 4} text="≈ SAME AS A YEAR AGO" tone="bone" size={54} rot={-2} />
        <Src>Federal Reserve broad dollar index (FRED DTWEXBGS): 121.85 on Nov 5, 2025 · 121.67 on Oct 30, 2026 (path simplified)</Src>
      </World>
    </Enter>
  );
};

// E · who buys: Japan $1.07T · UK $1.01T · China $591B (night, flags, routes to Washington)
const Holder: React.FC<{ x: number; y: number; at: number; flag: string; name: string; to: number; a: number; b: number; fmt: (v: number) => string }> = ({ x, y, at, flag, name, to, a, b, fmt }) => (
  <Pop x={x} y={y} at={at}>
    <div style={{ width: 400, background: 'rgba(14,21,23,.9)', border: `5px solid ${B.gold}`, padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <Img src={staticFile(`iran/flags/${flag}.svg`)} style={{ width: 170, border: `3px solid ${B.nightText}` }} />
      <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 40, letterSpacing: 4, color: B.nightText }}>{name}</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 76, color: B.gold }}><CountUp from={0} to={to} a={a} b={b} fmt={fmt} /></div>
    </div>
  </Pop>
);
const P6E: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const buying = a(23, 'buying'), japan = a(23, 'Japan'), uk = a(23, 'Kingdom'), china = a(23, 'China'), down = a(23, 'down');
  const T = (v: number) => `$${v.toFixed(2)}T`, Bn = (v: number) => `$${Math.round(v)}B`;
  return (
    <Enter kind="fade" dur={8}>
      <NightGround>
        <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 60%', transform: `scale(${1 + 0.07 * (1 - Math.exp(-f / 200))})` }}>
        {/* money keeps flowing along the routes into Washington (no still frame) */}
        {[[360, japan], [960, uk], [1560, china]].map(([x0, at], i) => Array.from({ length: 4 }).map((_, j) => {
          const t = ((f - (at as number) - 14 - j * 22) % 88) / 88;
          if (f < (at as number) + 14 + j * 22) return null;
          const x = (x0 as number), cx = (x + 960) / 2;
          const px = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * cx + t * t * 960, py = (1 - t) * (1 - t) * 520 + 2 * (1 - t) * t * 760 + t * t * 960;
          const thin = i === 2 && f > down && j % 2 === 1;
          return thin ? null : <div key={i + '-' + j} style={{ position: 'absolute', left: px - 14, top: py - 14, width: 28, height: 28, borderRadius: '50%', background: B.gold, border: `3px solid ${B.ink}`, opacity: Math.sin(t * Math.PI) }} />;
        }))}
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          {[[360, japan], [960, uk], [1560, china]].map(([x, at], i) => (
            <path key={i} d={`M${x} 520 Q ${(x as number + 960) / 2} 760 960 960`} fill="none" stroke={i === 2 && f > down ? B.glow : B.gold} strokeWidth={i === 2 && f > down ? 3 : 6} strokeDasharray={`${kk(f, at as number, (at as number) + 14)} 1`} pathLength={1} opacity={0.8} />
          ))}
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 50, letterSpacing: 10, color: B.nightText, opacity: kk(f, buying - 6, buying + 4) }}>WHO HOLDS U.S. DEBT</div>
        <Holder x={360} y={360} at={japan - 4} flag="jp" name="JAPAN" to={1.07} a={japan} b={japan + 18} fmt={T} />
        <Holder x={960} y={360} at={uk - 6} flag="gb" name="U.K." to={1.01} a={uk} b={uk + 18} fmt={T} />
        <Holder x={1560} y={360} at={china - 4} flag="cn" name="CHINA" to={591} a={china} b={china + 18} fmt={Bn} />
        <div style={{ position: 'absolute', left: 1560, top: 640, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 64, color: B.glow, opacity: kk(f, down, down + 8) }}>−$109B</div>
        <div style={{ position: 'absolute', left: 960, top: 960, transform: 'translate(-50%,-50%)', width: 70, height: 70, borderRadius: '50%', background: B.gold, boxShadow: `0 0 ${50 + 20 * Math.sin(f / 8)}px 20px rgba(232,182,76,.4)` }} />
        <div style={{ position: 'absolute', left: 1010, top: 930, fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 4, color: B.nightText }}>WASHINGTON</div>
        </div>
        <Src dark>U.S. Treasury TIC, Major Foreign Holders (Aug 2026): Japan $1,068.3B · U.K. $1,009.5B · China $590.7B (Aug 2025: $699.7B) · flags: flag-icons (MIT)</Src>
        <Bug dark /><Grain />
      </NightGround>
    </Enter>
  );
};

// F · not a collapse: the empty chair gets filled by other buyers; +$199.8B in August; total $9.33T ≈ flat
const P6F: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const real = a(24, 'real'), coll = a(24, 'collapse'), stepped = a(24, 'stepped'), aug = a(24, 'August'), two = a(24, 'two'), nine = a(24, 'nine'), flat = a(24, 'flat');
  return (
    <Enter kind="zoom" dur={10}>
      <FlyInto at={fr(end - s) - 10} dur={12} ox="960px 500px" to={6}>
        <World jake={{ beats: [{ at: real, r: 'nod', hold: 30 }, { at: coll, r: 'smile', hold: 200 }] }} meter={0} t0={s}>
          <Stamp text="NOT A COLLAPSE" x={700} y={180} at={coll} size={72} color={B.pine} rot={-4} />
          {[0, 1, 2, 3, 4].map((i) => {
            const at = i === 0 ? 0 : stepped + i * 5;
            const sit = i === 0 ? 1 - kk(f, real, real + 14) : kk(f, at, at + 10);
            return (
              <div key={i} style={{ position: 'absolute', left: 260 + i * 220, top: 520 }}>
                <Armchair size={150} color={B.ink} strokeWidth={2} />
                <div style={{ position: 'absolute', left: 75, top: 0, opacity: sit, transform: `translateY(${(1 - sit) * -80}px)` }}><Pawn x={0} y={92} base={[B.red, B.blue, B.pine, B.amber, B.muted][i]} scale={0.85} seed={'buy' + i} /></div>
              </div>
            );
          })}
          <Card x={1450} y={330} at={aug} head="AUGUST 2026" value={<CountUp from={0} to={199.8} a={two} b={two + 18} fmt={(v) => `+$${v.toFixed(1)}B`} />} sub="NET INFLOW" w={560} tone={B.pine} size={90} rot={2} />
          <Card x={1450} y={720} at={nine - 4} head="FOREIGN HOLDINGS" value="$9.33T" sub="≈ FLAT VS 2025" w={560} tone={B.blue} size={90} rot={-2} />
          <Src>Treasury TIC press release (Oct 16, 2026): Aug net TIC inflow $199.8B · foreign holdings of Treasuries $9.33T (Aug 2025: $9.25T)</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

export const EP06_P6_FRAMES = partFrames(20, 25);
export const EP06Part06: React.FC = () => {
  const shots: Shot[] = [
    [paraT(20), paraT(21), (s) => <DoorChapter s={s} n={3} title="The dollar" end={paraT(21)} />, 'A door 3'],
    [paraT(21), paraT(22), (s) => <P6B s={s} />, 'B evidence'],
    [paraT(22), W(22, 'Against'), (s) => <P6C s={s} />, 'C reserves'],
    [W(22, 'Against'), paraT(23), (s) => <P6D s={s} />, 'D index'],
    [paraT(23), paraT(24), (s) => <P6E s={s} />, 'E who holds'],
    [paraT(24), paraT(25), (s) => <P6F s={s} end={paraT(25)} />, 'F not a collapse'],
  ];
  return <PartShell first={20} shots={shots} cues={[[W(20, 'three'), 'paper', 0.06], [W(21, 'evidence'), 'tick', 0.05], [W(22, 'fifty'), 'counter', 0.05], [W(22, 'euro'), 'tick', 0.05], [W(23, 'Japan'), 'tick', 0.05], [W(23, 'Kingdom'), 'tick', 0.05], [W(23, 'China'), 'tick', 0.05], [W(24, 'collapse'), 'paper', 0.07], [W(24, 'two'), 'counter', 0.05]]} />;
};

// =============================================================================================
// PART 07 · "WILL IT BREAK?" (paragraphs 25–27)
// =============================================================================================

// A · the report card: AAA → Aa1 (May 2025, first since 1917) · the other two: AA+
const P7A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const a = atW(s);
  const may = a(25, 'May'), lowered = a(25, 'lowered'), first = a(25, 'first'), other = a(25, 'other'), notch = a(25, 'notch', 1), growing = a(25, 'growing');
  const slip = kk(f, lowered, lowered + 12);
  return (
    <Enter kind="slideL">
      <World jake={{ beats: [{ at: lowered, r: 'worry', hold: 50 }, { at: growing, r: 'think', hold: 200 }] }} meter={0} t0={s}>
        <Pop x={600} y={470} at={may - 4} rot={-2}>
          <div style={{ width: 620, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '14px 14px 0 rgba(27,34,48,.22)' }}>
            <div style={{ background: B.ink, color: B.bone, fontFamily: cond, fontWeight: 800, fontSize: 38, letterSpacing: 6, padding: '10px 24px' }}>U.S. CREDIT · REPORT CARD</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, padding: 30 }}>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, color: B.muted, textDecoration: slip > 0.5 ? 'line-through' : 'none' }}>Aaa</div>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 80, color: B.ink, opacity: slip }}>→</div>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, color: B.red, opacity: slip, transform: `translateY(${(1 - slip) * -40}px)` }}>Aa1</div>
            </div>
            <div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 4, color: B.muted, paddingBottom: 20 }}>MAY 2025 · MOODY'S</div>
          </div>
        </Pop>
        <Tag x={600} y={190} at={first} text="FIRST SINCE 1917" tone="red" size={60} rot={-3} />
        {['AA+', 'AA+'].map((g, i) => <Card key={i} x={1220 + i * 290} y={450} at={other + i * 5} head={['S&P', 'FITCH'][i]} value={g} w={250} size={84} tone={B.blue} rot={i ? 2 : -2} />)}
        <Cap x={1365} y={680} at={notch} text="ONE NOTCH BELOW TOP" size={40} />
        <Src>Moody's (May 16, 2025): U.S. cut to Aa1 · S&amp;P AA+ (since 2011) · Fitch AA+ (since 2023) · no agency logos shown</Src>
      </World>
    </Enter>
  );
};

// B · will it break? a big "?" · two things would have to change: TRUST (pillar) and SOMEWHERE ELSE (empty lot) → anchor since the 1940s
const P7B: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const brk = a(26, 'break'), nobody = a(26, 'Nobody'), change = a(26, 'change'), trust = a(26, 'trust'), place = a(26, 'place'), isnt = a(26, "isn't"), strong = a(26, 'strong'), forties = a(26, 'forties'), overnight = a(26, 'overnight');
  const q = kk(f, brk - 4, brk + 8) * (1 - kk(f, change - 4, change + 4));
  const anchor = kk(f, strong - 6, strong + 14);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'shrug', beats: [{ at: nobody, r: 'shrug', hold: change - nobody }, { at: overnight, r: 'nod', hold: 200 }] }} meter={0} t0={s}>
        <div style={{ position: 'absolute', left: 760, top: 470, transform: `translate(-50%,-50%) scale(${0.5 + q * 0.5})`, opacity: q, fontFamily: display, fontWeight: 800, fontSize: 520, color: B.red }}>?</div>
        <div style={{ opacity: 1 - kk(f, change - 4, change + 4) }}><Cap x={760} y={800} at={nobody} text="NOBODY CAN SAY" size={52} color={B.red} /></div>
        <div style={{ opacity: kk(f, change - 4, change + 4) * (1 - anchor) }}>
          <Disc I={Building2} x={480} y={460} at={change} size={220} label="TRUST" />
          <Disc I={HelpCircle} x={1040} y={460} at={Math.min(place - 4, change + 8)} size={220} label="SOMEWHERE ELSE?" tone={B.sand} />
          <Stamp text="NONE YET" x={1040} y={460} at={isnt} size={60} rot={-8} />
        </div>
        <div style={{ opacity: anchor }}>
          <Disc I={Anchor} x={760} y={430} at={strong - 6} size={300} tone={B.amber} />
          <Tag x={760} y={700} at={forties - 4} text="SINCE THE 1940s" tone="bone" size={60} rot={-2} />
        </div>
        <Src>Reserve role since Bretton Woods (1944) · IMF COFER: no other currency above ~21% of reserves</Src>
      </World>
    </Enter>
  );
};

// C · the quieter effect: Jake's grocery receipt grows while the bill on the shelf "shrinks": same dollar, buys less
const P7C: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const quieter = a(27, 'quieter'), inflation = a(27, 'inflation'), disagree = a(27, 'disagree'), stay = a(27, 'stay'), less = a(27, 'less'), never = a(27, 'never');
  const grow = easeO(kk(f, quieter, stay + 10));
  const shrink = 1 - 0.18 * easeO(kk(f, stay, less + 10));
  return (
    <Enter kind="slideL">
      <FlyInto at={fr(end - s) - 10} dur={12} ox="960px 500px" to={6}>
        <World jake={{ beats: [{ at: quieter, r: 'think', hold: stay - quieter }, { at: less, r: 'worry', hold: 200 }], x: 1600 }} meter={0} t0={s}>
          <Pop x={520} y={430} at={quieter - 6} rot={-3}>
            <div style={{ width: 380, height: 300 + 380 * grow, background: B.bone, border: `5px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)', padding: 24, overflow: 'hidden' }}>
              <div style={{ fontFamily: cond, fontWeight: 800, fontSize: 36, letterSpacing: 4, color: B.ink, display: 'flex', alignItems: 'center', gap: 10 }}><ShoppingCart size={40} />RECEIPT</div>
              {Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: F.mono, fontSize: 26, color: B.ink }}><span>{'▬'.repeat(3 + (i % 4))}</span><span>${(2 + ((i * 37) % 9) + 0.49).toFixed(2)}</span></div>)}
            </div>
          </Pop>
          <Cap x={1080} y={170} at={inflation} text="INFLATION · HARDER TO CONTROL" size={40} />
          <div style={{ position: 'absolute', left: 1080, top: 470, transform: `translate(-50%,-50%) scale(${shrink})`, opacity: kk(f, stay - 10, stay) }}>
            <Img src={staticFile('sayed/money/usd1.jpg')} style={{ width: 520, border: `4px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.22)' }} />
          </div>
          <Tag x={1080} y={720} at={less} text="BUYS LESS" tone="red" size={70} rot={-3} />
          <Cap x={1080} y={860} at={never} text="NEVER BREAKS" size={44} color={B.pine} />
          <Src>Economists disagree on how much heavy borrowing raises inflation · $1 note: uscurrency.gov SPECIMEN</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

export const EP06_P7_FRAMES = partFrames(25, 28);
export const EP06Part07: React.FC = () => {
  const shots: Shot[] = [
    [paraT(25), paraT(26), (s) => <P7A s={s} />, 'A report card'],
    [paraT(26), paraT(27), (s) => <P7B s={s} />, 'B will it break'],
    [paraT(27), paraT(28), (s) => <P7C s={s} end={paraT(28)} />, 'C buys less'],
  ];
  return <PartShell first={25} shots={shots} cues={[[W(25, 'lowered'), 'paper', 0.06], [W(25, 'first'), 'tick', 0.05], [W(26, 'break'), 'tick', 0.05], [W(26, "isn't"), 'paper', 0.06], [W(26, 'forties'), 'tick', 0.05], [W(27, 'less'), 'paper', 0.06]]} />;
};

// =============================================================================================
// PART 08 · WHO FEELS IT + THE CALENDAR (paragraphs 28–31)
// =============================================================================================

// A+B · Jake · Maya · Walter (illustrative) — each card pops on the name; outcome tiles −, −, +
const Person: React.FC<{ x: number; at: number; name: string; I: typeof Car; line: string; tone: string; out: string; outAt: number; outTone: 'red' | 'pine'; color: string }> = ({ x, at, name, I, line, tone, out, outAt, outTone, color }) => (
  <>
    <Pop x={x} y={430} at={at}>
      <div style={{ width: 420, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '12px 12px 0 rgba(27,34,48,.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0 24px' }}>
        <div style={{ position: 'relative', width: 200, height: 220 }}><Pawn x={100} y={220} base={color} scale={0.75} seed={name} /></div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: B.ink }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: cond, fontWeight: 800, fontSize: 34, letterSpacing: 2, color: tone }}><I size={40} color={tone} strokeWidth={2.4} />{line}</div>
      </div>
    </Pop>
    <Tag x={x} y={790} at={outAt} text={out} tone={outTone} size={48} rot={-2} />
  </>
);
const P8A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const who = a(28, 'feels'), jake = a(29, 'Jake'), two = a(29, 'two'), maya = a(29, 'Maya'), afford = a(29, 'affordable'), walter = a(29, 'Walter'), more = a(29, 'more'), same = a(29, 'Same'), three = a(29, 'Three'), illus = a(29, 'illustrative');
  return (
    <Enter kind="slideL">
      <World jake={false} meter={0} t0={s}>
        <BigLine y={80} at={who - 4} size={80}>Who feels it most?</BigLine>
        <Person x={420} at={jake} name="Jake" I={Car} line="RENT · CAR LOAN" tone={B.blue} out="LOAN COST ↑" outAt={two} outTone="red" color={B.blue} />
        <Person x={960} at={maya} name="Maya" I={Home} line="FIRST HOME" tone={B.red} out="+$223/MO" outAt={afford - 6} outTone="red" color={B.red} />
        <Person x={1500} at={walter} name="Walter" I={PiggyBank} line="RETIRED · BONDS" tone={B.pine} out="EARNS MORE" outAt={more} outTone="pine" color={B.pine} />
        <Cap x={960} y={960} at={same} text="SAME DEBT · THREE OUTCOMES" size={46} />
        <Illus x={48} y={40} />
        <Src>Jake, Maya and Walter are illustrative people, not real ones</Src>
      </World>
    </Enter>
  );
};

// C · borrow · save · own
const P8C: React.FC<{ s: number }> = ({ s }) => {
  const a = atW(s);
  const story = a(30, 'story'), borrow = a(30, 'borrow'), save = a(30, 'save'), own = a(30, 'own');
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: story, r: 'nod', hold: 200 }] }} meter={0} t0={s}>
        <BigLine y={130} at={2} size={86}>Not one story</BigLine>
        <Disc I={Car} x={420} y={560} at={borrow} size={240} label="BORROW" tone={B.sand} />
        <Disc I={PiggyBank} x={820} y={560} at={save} size={240} label="SAVE" tone={B.amber} />
        <Disc I={Home} x={1220} y={560} at={own} size={240} label="OWN" tone={B.bone} />
        <Src>Higher rates cost borrowers and pay savers; owners feel both</Src>
      </World>
    </Enter>
  );
};

// D · the calendar: NOV 18 (who buys the debt) · DEC 11 (funding ends) · every day / month / year
const P8D: React.FC<{ s: number; end: number }> = ({ s, end }) => {
  const f = useCurrentFrame();
  const a = atW(s);
  const cal = a(31, 'calendar'), dec = a(31, 'December'), nov = a(31, 'November'), daily = a(31, 'business'), month = a(31, 'month'), year = a(31, 'year'), watch = a(31, 'Watch');
  return (
    <Enter kind="slideL">
      <FlyInto at={fr(end - s) - 10} dur={12} ox="960px 500px" to={6}>
        <World jake={{ beats: [{ at: dec, r: 'worry', hold: 40 }, { at: watch, r: 'nod', hold: 200 }] }} meter={0} t0={s}>
          <Cap x={700} y={130} at={cal - 4} text="WHAT'S COMING" size={52} />
          <Pop x={430} y={440} at={nov - 2} rot={-3}><div style={{ width: 340, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)' }}><div style={{ background: B.blue, color: B.bone, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 48, letterSpacing: 6, borderBottom: `6px solid ${B.ink}` }}>NOV</div><div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 190, color: B.ink, lineHeight: 1.1 }}>18</div><div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 32, color: B.muted, paddingBottom: 12 }}>WHO BUYS THE DEBT</div></div></Pop>
          <Pop x={900} y={440} at={dec - 2} rot={2}><div style={{ width: 340, background: B.bone, border: `6px solid ${B.ink}`, boxShadow: '10px 10px 0 rgba(27,34,48,.2)' }}><div style={{ background: B.red, color: B.bone, textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 48, letterSpacing: 6, borderBottom: `6px solid ${B.ink}` }}>DEC</div><div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, fontSize: 190, color: B.ink, lineHeight: 1.1 }}>11</div><div style={{ textAlign: 'center', fontFamily: cond, fontWeight: 800, fontSize: 32, color: B.red, paddingBottom: 12 }}>FUNDING ENDS</div></div></Pop>
          <Disc I={CalendarDays} x={1260} y={260} at={daily} size={120} label="EVERY DAY · DEBT" />
          <Disc I={Landmark} x={1260} y={500} at={month} size={120} label="EVERY MONTH · DEFICIT" />
          <Disc I={Eye} x={1260} y={740} at={year} size={120} label="EVERY YEAR · INTEREST" />
          <Stamp text="WATCH" x={700} y={800} at={watch} size={80} color={B.pine} rot={-5} />
          <Src>P.L. 119-103 funds the government through Dec 11, 2026 (CRS R49353) · next TIC release Nov 18, 2026 (Treasury)</Src>
        </World>
      </FlyInto>
    </Enter>
  );
};

export const EP06_P8_FRAMES = partFrames(28, 32);
export const EP06Part08: React.FC = () => {
  const shots: Shot[] = [
    [paraT(28), paraT(30), (s) => <P8A s={s} />, 'A who feels it'],
    [paraT(30), paraT(31), (s) => <P8C s={s} />, 'B borrow save own'],
    [paraT(31), paraT(32), (s) => <P8D s={s} end={paraT(32)} />, 'C calendar'],
  ];
  return <PartShell first={28} shots={shots} cues={[[W(29, 'Jake'), 'paper', 0.05], [W(29, 'Maya'), 'paper', 0.05], [W(29, 'Walter'), 'paper', 0.05], [W(30, 'borrow'), 'tick', 0.05], [W(30, 'save'), 'tick', 0.05], [W(30, 'own'), 'tick', 0.05], [W(31, 'December'), 'paper', 0.06], [W(31, 'November'), 'paper', 0.06], [W(31, 'Watch'), 'paper', 0.07]]} />;
};
