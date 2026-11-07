import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Equal, FileSearch, FileText, Handshake, Landmark, Mic, PenLine, Plus, Receipt, Tag, Wallet } from 'lucide-react';
import { LiveJake } from '../host/LiveJake';
import { Building, Pawn } from '../ep03/PaperWorld';
import { B, Badge, Bug, Door, Frame, Grain, Label, Src, WalletChip, cond, display } from '../brand/Brand';
import { Enter } from './kit';
import { paraT, wordT } from './t';
import { Hemicycle } from './Story';
import { Shop } from './Part05';
import { Bill, PartShell, Shot, Stamp, World, clamp, ease, k01, partFrames, rel } from './parts';

// EP04 · PART 06 (paragraphs 25–28) — refunds, the catch for you, what the new Congress can (and can't) do, three paths → the shelf tag.
const W = (p: number, w: string, n = 0) => wordT(p, w, n);

// A · REFUNDS — real Treasury film, money flowing back to importers, "$100B+" counter (ballpark)
const A: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const owed = rel(W(25, 'owed'), s), hundred = rel(W(25, 'hundred'), s), ball = rel(W(25, 'ballpark'), s);
  const showN = f >= hundred - 8;
  const v = Math.round(interpolate(f, [hundred - 8, hundred + 18], [0, 100], clamp));
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ beats: [{ at: 6, r: 'think', hold: hundred - 10 }, { at: hundred, r: 'surprise', hold: 50 }, { at: ball, r: 'doubt', hold: 200 }] }}>
        <Frame src="ep04/footage/cap_treasury.mp4" video x={420} y={420} w={600} h={420} rot={-2} at={0} year="U.S. Treasury · archive" rate={0.8} />
        {f >= owed && Array.from({ length: 8 }).map((_, i) => {
          const t = ((f - owed - i * 5) / 30) % 1;
          if (f - owed - i * 5 < 0) return null;
          return <Bill key={i} x={620 + t * 640} y={420 + Math.sin(t * Math.PI) * -110} w={170} rot={-10 + t * 20} note="100" opacity={interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0])} />;
        })}
        {[0, 1, 2].map((i) => <Pawn key={i} x={1180 + i * 110} y={720} base={B.amber} scale={0.7} seed={'imp' + i} hop={owed + 10 + i * 4} />)}
        <Label x={1290} y={770} at={owed + 6} size={34}>Importers</Label>
        {showN && <div style={{ position: 'absolute', left: 1180, top: 190, transform: 'translate(-50%,-50%)', fontFamily: display, fontWeight: 800, fontSize: 150, color: B.ink, whiteSpace: 'nowrap' }}>≈ ${v}B+</div>}
        {f >= ball - 4 && <Stamp text="BALLPARK" x={1180} y={330} at={ball - 4} rot={-5} size={64} />}
        <Src>Refunds ordered by the Court of International Trade; ≈ $126B incl. interest by Oct 2, 2026 per CBP figures (sources differ) · film: Prelinger Archives (PD)</Src>
      </World>
    </Enter>
  );
};

// B · THE CATCH (story) — refund stops at the importer; Jake at the register gets nothing back
const Bc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const imp = rel(W(26, 'importers'), s), notYou = rel(W(26, 'Not'), s), wallet = rel(W(26, 'wallet'), s);
  const run = ease(k01(f, imp - 10, imp + 14));
  const gate = spring({ frame: f - (notYou - 4), fps, config: { damping: 10, stiffness: 200 } });
  return (
    <Enter kind="slideL">
      <World jake={false}>
        <Badge I={Landmark} x={220} y={330} at={2} size={150} label="Treasury" />
        <div style={{ position: 'absolute', left: 300, top: 470, width: 680 * run, height: 14, background: B.amber, border: `3px solid ${B.ink}`, borderRadius: 7 }} />
        <Pawn x={1000} y={560} base={B.amber} scale={0.8} seed="imp9" hop={imp + 6} />
        <Label x={1000} y={610} at={imp} size={32}>Importer</Label>
        <div style={{ position: 'absolute', left: 1180, top: 300, width: 26, height: 560, background: B.red, border: `4px solid ${B.ink}`, transform: `scaleY(${gate})`, transformOrigin: '50% 100%' }} />
        <Shop x={1360} y={900} scale={0.9} />
        <LiveJake pose="stand" seed="p6reg" beats={[{ at: 2, r: 'think', hold: notYou - 4 }, { at: notYou, r: 'surprise', hold: 30 }, { at: notYou + 34, r: 'worry', hold: 300 }]} style={{ position: 'absolute', left: 1560, top: 400, height: 550, transform: 'scaleX(-1)' }} />
        <WalletChip value="refund $0" at={wallet - 6} />
        <Src>Refund mechanism: importers of record file claims (Skadden, Norton Rose Fulbright analyses)</Src>
      </World>
    </Enter>
  );
};

// C · WHAT THE NEW CONGRESS CAN DO — hearings · documents · a bill … and the veto math
const Cc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const less = rel(W(27, 'Less'), s), hear = rel(W(27, 'hearings'), s), docs = rel(W(27, 'documents'), s), bill = rel(W(27, 'bill'), s), veto = rel(W(27, 'vetoes'), s), two = rel(W(27, 'two-thirds'), s);
  const showV = f >= veto - 6;
  const k = k01(f, veto - 6, veto + 6);
  return (
    <Enter kind="zoom" dur={10}>
      <World jake={{ pose: 'point', beats: [{ at: less, r: 'shrug', hold: 40 }, { at: hear, r: 'nod', hold: veto - hear - 4 }, { at: veto, r: 'doubt', hold: 300 }] }}>
        <div style={{ opacity: 1 - k }}>
          <Building kind="cap" x={760} y={860} scale={1.25} />
          <Badge I={Mic} x={420} y={260} at={hear} size={170} label="Hearings" />
          <Badge I={FileSearch} x={760} y={200} at={docs} size={170} label="Documents" />
          <Badge I={FileText} x={1100} y={260} at={bill} size={170} label="A bill" tone="amber" />
        </div>
        {showV && (
          <div style={{ opacity: k }}>
            <Badge I={PenLine} x={760} y={200} at={veto} size={170} tone="red" />
            <Hemicycle x={480} y={760} r={260} seats={435} rows={9} dot={6} blue={Math.round(interpolate(f, [two, two + 26], [0, 290], clamp))} label="HOUSE" />
            <Hemicycle x={1060} y={760} r={260} seats={100} rows={6} dot={13} blue={Math.round(interpolate(f, [two, two + 26], [0, 67], clamp))} label="SENATE" />
            <div style={{ position: 'absolute', left: 760, top: 330, transform: 'translateX(-50%)', fontFamily: display, fontWeight: 800, fontSize: 120, color: B.red, opacity: k01(f, two, two + 8) }}>⅔ + ⅔</div>
          </div>
        )}
        <Src>U.S. Const. Art. I §7 · Congress's oversight and legislative powers</Src>
      </World>
    </Enter>
  );
};

// D · THREE PATHS → the price tag on the shelf (zoom into the tag; the next door is behind it)
const Dc: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const one = rel(W(28, 'One'), s), two = rel(W(28, 'Two'), s), three = rel(W(28, 'Three'), s), shelf = rel(W(28, 'shelf'), s), tagW = rel(W(28, 'tag'), s);
  const dive = ease(k01(f, shelf + 4, shelf + 34));
  const tag = spring({ frame: f - 2, fps, config: { damping: 12, stiffness: 150 } });
  const swing = Math.sin(f / 10) * 6;
  return (
    <Enter kind="zoom" dur={10}>
      <AbsoluteFill style={{ transformOrigin: '960px 470px', transform: `scale(${1 + dive * 5})` }}>
        <World jake={{ beats: [{ at: one, r: 'think', hold: tagW - one - 4 }, { at: tagW, r: 'nod', hold: 200 }] }}>
          <div style={{ position: 'absolute', left: 960, top: 470, transform: `translate(-50%,-50%) scale(${tag}) rotate(${swing}deg)`, transformOrigin: '50% 0%' }}>
            <div style={{ width: 330, height: 200, background: B.bone, border: `7px solid ${B.ink}`, borderRadius: '24px 24px 24px 24px', boxShadow: '10px 10px 0 rgba(27,34,48,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <Tag size={90} color={B.red} strokeWidth={2.4} /><div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, color: B.ink }}>$ ?</div>
            </div>
          </div>
          <Badge I={Equal} x={420} y={270} at={one} size={160} label="Tariffs stay" />
          <Badge I={Handshake} x={420} y={640} at={two} size={160} label="Trade deal" />
          <Badge I={Plus} x={1500} y={270} at={three} size={160} label="New tariffs" tone="red" />
          <Src>Remaining tariffs (e.g. Section 232) stay unless changed; new ones possible under other statutes</Src>
        </World>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: B.pine, opacity: k01(f, shelf + 26, shelf + 36) }} />
    </Enter>
  );
};

const FIRST = 25, NEXT = 29;
export const EP04_P6_FRAMES = partFrames(FIRST, NEXT);
const shots: Shot[] = [
  [paraT(25), paraT(26), (s) => <A s={s} />, 'A refunds'],
  [paraT(26), paraT(27), (s) => <Bc s={s} />, 'B the catch'],
  [paraT(27), paraT(28), (s) => <Cc s={s} />, 'C what Congress can do'],
  [paraT(28), paraT(NEXT), (s) => <Dc s={s} />, 'D three paths → tag'],
];
export const EP04Part06: React.FC = () => (
  <PartShell first={FIRST} shots={shots} cues={[
    [W(25, 'owed'), 'counter', 0.05], [W(25, 'ballpark'), 'paper', 0.07], [W(26, 'Not'), 'paper', 0.07],
    [W(27, 'hearings'), 'tick', 0.05], [W(27, 'documents'), 'tick', 0.05], [W(27, 'bill'), 'tick', 0.05], [W(27, 'vetoes'), 'paper', 0.07],
    [W(28, 'One'), 'tick', 0.05], [W(28, 'Two'), 'tick', 0.05], [W(28, 'Three'), 'tick', 0.05],
  ]} />
);
