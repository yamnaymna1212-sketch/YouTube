// Episode 2, Part 1 "Rent Day": a 30-40 s Short. Hook = contradiction (rent due tomorrow, payday Friday).
// Usage: node ep04.js <episodeDir> [--test <outDir>]   (voice lines live in <episodeDir>/audio)
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const { character, walkPose, lerp } = require('./glow.js');
const { P, svgDoc, rr, led } = require('./world.js');
const { line, neon, soft, blur, PINK } = require('./ep01.js');

const DIR = process.argv[2];
const AUD = `${DIR}/audio`;
const FPS = 30;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = u => { u = clamp(u); return u * u * (3 - 2 * u); };
const easeOutBack = u => { const c = 1.7; u = clamp(u); return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
const MINT = '#3fe0a0', GOLD = '#ffb52e', RED = '#ff5a5a', KAI = '#36b6ff';

// ---------- timeline (scenes follow the voice lines; no dead air) ----------
const load = n => JSON.parse(fs.readFileSync(`${AUD}/${n}.words.json`));
const lastEnd = ws => ws[ws.length - 1].s + ws[ws.length - 1].d;
let cursor = 0;
const clip = (name, lead = 0.08, tail = 0.12, offset = null) => {
  const ws = load(name), at = offset === null ? cursor + lead : offset, end = at + lastEnd(ws) + tail;
  cursor = end;
  return { name, at, end, words: ws.map(w => ({ ...w, s: w.s + at })) };
};
const key = w => w.toLowerCase().replace(/[^a-z0-9]/g, '');
const W = (c, w, n = 0) => c.words.filter(x => key(x.w) === w)[n].s;
const HOOK = clip('hook', 0, 0.5, -0.05);
const TOMORROW = W(HOOK, 'tomorrow'), FRIDAY = W(HOOK, 'friday');
const PK = clip('pockets', 0.2, 0.4);
const CN = clip('count', 0.15, 0.8);
const ST = clip('steps', 0.3, 0.7);
const KNOCKS = [ST.end + 0.1, ST.end + 0.38];
const GD = clip('gold', 0.75, 0.3);
const KA = clip('kai', 0.2, 0.6);
const NT = clip('night', 0.35, 1.1);
const MN = clip('mint', 1.0, 1.3);
const CTA = clip('cta', 0.1, 0.7);
const CTA2 = W(CTA, 'and');
const DUR = CTA.end + 0.3;
const TITLE_END = Math.max(3.0, lastEnd(HOOK.words));

// ---------- captions ----------
const COLORS = { rent: RED, tomorrow: RED, paycheck: P.green, friday: P.green, pocket: P.warm, jacket: P.warm, couch: P.warm, five: P.green, ones: P.green, coins: P.green, close: RED, night: P.lav, half: RED, follow: PINK, roommate: MINT, pays: MINT, footsteps: GOLD };
const SPEAKER = { gold: GOLD, kai: KAI, mint: MINT };
function groupsOf(ws) {
  const gs = []; let g = [];
  for (const w of ws) { if (g.length && (g.map(x => x.w).join(' ') + ' ' + w.w).length > 15) { gs.push(g); g = []; } g.push(w); }
  if (g.length) gs.push(g);
  return gs;
}
function captions(t, clips, { quote = [] } = {}) {
  const c = [...clips].reverse().find(x => t >= x.words[0].s && t < x.end + 0.3);
  if (!c) return '';
  const gs = groupsOf(c.words);
  let gi = -1; gs.forEach((g, i) => { if (t >= g[0].s) gi = i; });
  if (gi < 0) return '';
  const g = gs[gi], q = quote.includes(c.name);
  const parts = g.map((w, i) => {
    let label = w.w.toUpperCase();
    if (q && gi === 0 && i === 0) label = '"' + label;
    if (q && gi === gs.length - 1 && i === g.length - 1) label += '"';
    const pop = t >= w.s ? 1 + 0.25 * (1 - clamp((t - w.s) / 0.12)) : 0;
    return { label, seen: t >= w.s, pop, color: SPEAKER[c.name] && !COLORS[key(w.w)] ? SPEAKER[c.name] : COLORS[key(w.w)] || SPEAKER[c.name] || '#fff' };
  });
  const sizes = parts.map(p => p.label.replace(/[.,:'"!?$]/g, '').length * 54 + p.label.replace(/[^.,:'"!?$]/g, '').length * 22 + 34);
  let x = 540 - sizes.reduce((a, b) => a + b, 0) / 2;
  return parts.map((p, i) => {
    const cx = x + sizes[i] / 2; x += sizes[i];
    return p.seen ? `<text x="${cx}" y="470" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${p.color}" stroke="#000" stroke-width="11" style="paint-order:stroke" transform="translate(${cx} 446) scale(${p.pop}) translate(${-cx} -446)">${p.label}</text>` : '';
  }).join('');
}
const label = `<text x="540" y="1640" text-anchor="middle" font-family="Inter" font-weight="700" font-size="40" fill="#fff" opacity="0.85">Part 1</text>`;
const push = (s, inner, cx = 540, cy = 1000) => `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
const age = (t, b, d) => (t >= b && t < b + d ? (t - b) : -1);
const pop = (t, s, d = 0.3) => easeOutBack((t - s) / d);

// ---------- hook title card (first 3 s) ----------
function title(t) {
  if (t >= TITLE_END + 0.15) return '';
  const s = t < TITLE_END ? 1 + 0.08 * Math.exp(-t * 14) : 1 - (t - TITLE_END) / 0.15;
  return `<g transform="translate(540 360) scale(${s}) translate(-540 -360)"><rect x="150" y="262" width="780" height="196" rx="22" fill="#fff"/>
    <text x="540" y="345" text-anchor="middle" font-family="Inter" font-weight="900" font-size="52" fill="#0a1426">RENT IS DUE <tspan fill="#e0245e">TOMORROW.</tspan></text>
    <text x="540" y="425" text-anchor="middle" font-family="Inter" font-weight="900" font-size="52" fill="#0a1426">PAYDAY IS <tspan fill="#1a9a55">FRIDAY.</tspan></text></g>`;
}

// ---------- the apartment ----------
const room = (t, op = 1) => `<g opacity="${op}">${line('M0 1480 H1080', P.line, 3)}
  ${line('M60 620 h230 v300 h-230 Z M175 620 v300 M60 770 h230', P.warm, 3, 0.55)}<circle cx="120" cy="680" r="16" fill="#e3e9ff" opacity="0.5"/>
  ${soft(560, 760, 300, P.warm, 0.06 + 0.02 * Math.sin(t * 2))}</g>`;

// Week strip calendar: WED (today), THU rent, FRI payday.
function calendar(t, hotThu, hotFri) {
  const day = (i, d, n, note, c, hot) => {
    const x = -165 + i * 110, h = hot > 0;
    return `<g>${h ? `<rect x="${x - 50}" y="-62" width="100" height="150" rx="10" fill="${c}" opacity="${0.18 * hot}"/>` : ''}
      <text x="${x}" y="-40" text-anchor="middle" font-family="Inter" font-weight="800" font-size="18" fill="#7a86a3">${d}</text>
      <text x="${x}" y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${h ? c : '#1a2238'}">${n}</text>
      ${note ? `<text x="${x}" y="66" text-anchor="middle" font-family="Inter" font-weight="900" font-size="15" fill="${c}">${note}</text>` : ''}
      ${h ? `<circle cx="${x}" cy="7" r="${36 + 4 * Math.sin(t * 9)}" fill="none" stroke="${c}" stroke-width="5" opacity="${hot}"/>` : ''}</g>`;
  };
  return `<path d="${rr(-230, -130, 460, 240, 14)}" fill="none" stroke="${P.white}" stroke-width="10" opacity="0.25" filter="url(#neon)"/><path d="${rr(-230, -130, 460, 240, 14)}" fill="#e6ecf6"/>
    <path d="M-230 -116 a14 14 0 0 1 14 -14 h432 a14 14 0 0 1 14 14 v36 h-460 Z" fill="#24314f"/>
    <text x="0" y="-95" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" letter-spacing="5" fill="#fff">THIS WEEK</text>
    ${day(0, 'WED', '28', 'TODAY', '#24314f', 0)}${day(1, 'THU', '29', 'RENT DUE', '#e0245e', hotThu)}${day(2, 'FRI', '30', 'PAYDAY', '#1a9a55', hotFri)}
    <text x="165" y="66" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#7a86a3"></text>
    <rect x="-275" y="-62" width="0" height="0"/>`;
}

function hookScene(t) {
  const z = pop(t, TOMORROW, 0.4), hot = clamp((t - TOMORROW) / 0.2), fri = clamp((t - FRIDAY) / 0.2);
  const shake = t > TOMORROW && t < TOMORROW + 0.25 ? Math.sin(t * 120) * 8 * (1 - (t - TOMORROW) / 0.25) : 0;
  const cx = lerp(720, 690, z), cy = lerp(860, 860, z), sc = lerp(0.62, 1.5, z);
  return `${room(t)}
    ${character('kai', 300, 1480, 1.35, { t, face: t < TOMORROW ? 'thinking' : 'shocked', glow: 0.8, pose: { lean: 2, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [10, 12], armR: [-30, 120] } })}
    ${z > 0 ? `<rect width="1080" height="1920" fill="#050c1c" opacity="${0.4 * clamp(z)}"/>` : ''}
    <g transform="translate(${cx + shake} ${cy}) scale(${sc})">${calendar(t, hot, fri)}</g>`;
}

// Pockets: jeans, jacket, couch pop in on their words.
const icon = {
  pocket: c => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-60 -70 h120 l10 150 h-55 l-15 -90 l-15 90 h-55 Z"/><path d="M-50 -50 q20 40 40 0" fill="#e6eeff" stroke="#e6eeff"/><path d="M10 -50 q20 40 40 0" fill="#e6eeff" stroke="#e6eeff"/></g>`,
  jacket: c => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-25 -75 l25 25 l25 -25 l45 20 l20 90 l-28 6 l-7 -40 v80 h-110 v-80 l-7 40 l-28 -6 l20 -90 Z M0 -50 v130"/><path d="M-40 20 h22 M18 20 h22"/></g>`,
  couch: c => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-80 -20 v-40 h160 v40 M-95 -20 h190 v60 h-190 Z M-80 40 v20 M80 40 v20 M-95 -20 v-15 h15 M95 -20 v-15 h-15"/></g>`,
};
function pocketsScene(t, u) {
  const items = ['pocket', 'jacket', 'couch'].map((w, i) => {
    const s = W(PK, w), p = pop(t, s); if (t < s) return '';
    const x = 300 + i * 260, empty = clamp((t - s - 0.35) / 0.2);
    const coin = w === 'couch' ? `<g transform="translate(0 ${-110 - 80 * ease((t - s - 0.3) / 0.5)})" opacity="${clamp((t - s - 0.3) / 0.1)}"><circle r="22" fill="#0b1d38" stroke="${P.warm}" stroke-width="4"/><text y="8" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" fill="${P.warm}">¢</text></g>` : '';
    return `<g transform="translate(${x} 720) scale(${p})">${soft(0, 0, 140, P.warm, 0.12)}${icon[w](P.warm)}${coin}
      ${w !== 'couch' ? `<text y="135" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${RED}" opacity="${empty}">EMPTY</text>` : `<text y="135" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${P.green}" opacity="${empty}">+ COINS</text>`}</g>`;
  }).join('');
  const dig = Math.sin(t * 9) * 12;
  return `${room(t, 0.6)}${items}
    ${character('kai', 540, 1480, 1.2, { t, face: 'determined', glow: 0.75, pose: { lean: 22, bob: 0, legL: [14, -10], legR: [-10, -6], armL: [60 + dig, 30], armR: [40 - dig, 40] } })}`;
}

// The count: coins, a five, two ones land on the table.
const bill = (n, c = P.green) => `<path d="${rr(-90, -42, 180, 84, 8)}" fill="#0b1d38" stroke="${c}" stroke-width="4"/><circle r="22" fill="none" stroke="${c}" stroke-width="3"/><text y="11" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${c}">${n}</text>
  <text x="-68" y="-18" font-family="Inter" font-weight="900" font-size="18" fill="${c}">${n}</text><text x="68" y="32" text-anchor="end" font-family="Inter" font-weight="900" font-size="18" fill="${c}">${n}</text>`;
function countScene(t) {
  const it = [
    [W(CN, 'coins'), 250, 960, -8, `${[0, 1, 2, 3].map(i => `<ellipse cx="${(i % 2) * 20}" cy="${30 - i * 16}" rx="56" ry="16" fill="#0b1d38" stroke="${P.warm}" stroke-width="4"/>`).join('')}<ellipse cx="70" cy="40" rx="30" ry="10" fill="#0b1d38" stroke="${P.warm}" stroke-width="3"/>`],
    [W(CN, 'five'), 520, 930, 6, bill('5')],
    [W(CN, 'two'), 330, 1110, -4, bill('1')],
    [W(CN, 'ones'), 590, 1120, 10, bill('1')],
  ].map(([s, x, y, r, art]) => t < s ? '' : `<g transform="translate(${x} ${y - 60 * (1 - ease((t - s) / 0.25))}) rotate(${r}) scale(${pop(t, s, 0.25) * 1.3})">${art}</g>`).join('');
  const no = W(CN, 'close'), x = clamp((t - no) / 0.25);
  return `${line('M90 1250 H760', P.warm, 4, 0.7)}${line('M140 1250 v230 M710 1250 v230', P.warm, 3, 0.5)}${line('M0 1480 H1080', P.line, 3)}${soft(430, 1050, 340, P.warm, 0.1)}${it}
    ${character('kai', 880, 1480, 1.2, { t, dir: -1, face: t < no ? 'thinking' : 'sad', glow: lerp(0.8, 0.45, x), droop: x * 0.6 })}
    ${x > 0 ? `<g transform="translate(430 800) scale(${easeOutBack(x)})"><text y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="110" fill="${RED}" stroke="#000" stroke-width="12" style="paint-order:stroke">$8.37</text></g>` : ''}`;
}

// ---------- the door: Mr. Gold's amber light underneath ----------
const DX = 620, DY = 760, DW = 340, DH = 720;
function door(t) {
  const sh = KNOCKS.reduce((a, b) => { const g = age(t, b, 0.2); return g < 0 ? a : a + Math.sin(g * 130) * (1 - g / 0.2) * 7; }, 0);
  const arrive = ease((t - W(ST, 'footsteps')) / 1.0);
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(t * 3));
  const feet = [0, 1].map(i => `<rect x="${DX + 90 + i * 110 + (1 - arrive) * 500}" y="${DY + DH - 7}" width="46" height="8" rx="3" fill="#050c1c"/>`).join('');
  return `<g>
    <ellipse cx="${DX + DW / 2}" cy="${DY + DH + 14}" rx="${DW * 0.9}" ry="34" fill="${GOLD}" opacity="${0.25 * pulse}" filter="url(#b10)"/>
    <g transform="translate(${sh} 0)">
      <rect x="${DX}" y="${DY}" width="${DW}" height="${DH}" fill="#0b1d38"/>
      ${neon(`M${DX} ${DY + DH} V${DY} H${DX + DW} V${DY + DH}`, P.warm, 4)}
      ${line(`M${DX + 30} ${DY + 220} h${DW - 60} v200 h${-(DW - 60)} Z M${DX + 30} ${DY + 450} h${DW - 60} v240 h${-(DW - 60)} Z`, P.warm, 2.5, 0.55)}
      <rect x="${DX + DW / 2 - 40}" y="${DY + 60}" width="80" height="36" rx="4" fill="none" stroke="${P.teal}" stroke-width="2.5"/><text x="${DX + DW / 2}" y="${DY + 87}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${P.teal}">214</text>
      <circle cx="${DX + DW / 2}" cy="${DY + 150}" r="13" fill="none" stroke="#e6eeff" stroke-width="3"/><circle cx="${DX + DW / 2}" cy="${DY + 150}" r="4" fill="#e6eeff"/>
      <circle cx="${DX + 52}" cy="${DY + 400}" r="14" fill="${P.warm}"/>
      <rect x="${DX + 6}" y="${DY + DH - 8}" width="${DW - 12}" height="10" fill="${GOLD}" opacity="${0.4 + 0.5 * pulse}" filter="url(#glow)"/>${feet}
    </g>
    ${KNOCKS.map(k => { const g = age(t, k, 0.3); return g < 0 ? '' : `<text x="${DX + DW / 2}" y="${DY - 30}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="90" fill="#fff" stroke="${GOLD}" stroke-width="8" style="paint-order:stroke" opacity="${1 - g / 0.3}">KNOCK</text>`; }).join('')}</g>`;
}
function doorScene(t, u) {
  const smile = t >= KA.words[0].s;
  const sweat = smile ? `<path d="M${385} ${1050 + 30 * ((t * 1.5) % 1)} q-8 14 0 20 q8 -6 0 -20" fill="#bfe8ff" opacity="${1 - ((t * 1.5) % 1)}"/>` : '';
  return push(1 + 0.04 * u, `${room(t, 0.5)}${door(t)}
    ${character('kai', 320, 1480, 1.35, { t, face: smile ? 'happy' : (t > KNOCKS[0] ? 'shocked' : 'tired'), glow: 0.7, pose: smile ? { lean: 0, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [8, 10], armR: [150, 20] } : { lean: -4, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [20, 30], armR: [-10, 20] } })}${sweat}`, 760, 1200);
}

// ---------- one night ----------
function nightScene(t, u) {
  const tick = Math.floor((t - NT.at) * 1.2) % 2 === 0;
  return push(1 + 0.05 * u, `${line('M0 1480 H1080', P.line, 3)}
    ${line('M600 560 h300 v360 h-300 Z M750 560 v360 M600 740 h300', P.lav, 3, 0.6)}<circle cx="680" cy="640" r="24" fill="#e3e9ff" opacity="0.6"/>${soft(680, 640, 110, '#cfd9ff', 0.12)}
    ${line('M120 1300 h520 v90 h-520 M140 1390 v90 M620 1390 v90 M120 1300 v-140', P.lav, 3, 0.7)}
    ${line('M760 1480 V1330 h200 V1480', P.lav, 3, 0.7)}
    <g transform="translate(860 1270)"><path d="${rr(-90, -45, 180, 90, 16)}" fill="#0b1d38" stroke="${RED}" stroke-width="3"/><g fill="${RED}" filter="url(#glow)">${led(tick ? '11:58' : '11:58', -72, -26, 52, RED)}</g></g>
    ${character('kai', 400, 1478, 1.25, { t, face: 'tired', glow: 0.45, droop: 0.8, pose: { lean: 6, bob: 0, legL: [90, -90], legR: [84, -86], armL: [30, 40], armR: [20, 50] } })}`, 540, 1200);
}

// ---------- Mint ----------
function mintScene(t, u) {
  const s0 = MN.at - 0.95, w = ease((t - s0) / 1.0), x = lerp(-120, 250, w), walking = t - s0 < 1.0;
  const half = W(MN, 'half'), stress = t > half ? 0.5 + 0.5 * Math.abs(Math.sin(t * 18)) : 1;
  const env = `<g transform="translate(${x + 95} 1210) rotate(-8)"><rect x="-44" y="-30" width="88" height="60" rx="4" fill="#e6ecf6"/><path d="M-44 -30 L0 6 L44 -30" fill="none" stroke="#9aa6bf" stroke-width="3"/><text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="13" fill="#1a7a45">RENT</text></g>`;
  return push(1 + 0.04 * u, `${room(t, 0.5)}
    ${line('M40 680 h200 v800 M40 680 v800', P.line, 3, 0.6)}${soft(140, 1000, 180, MINT, 0.1)}
    ${character('mint', x, 1480, 1.3, { t, face: 'sad', glow: 0.85, pose: walking ? walkPose((t - s0) * 1.6) : { lean: -3, bob: Math.sin(t * 2) * 2, legL: [6, -4], legR: [-6, -4], armL: [8, 10], armR: [55, 60] } })}
    ${walking ? '' : env}
    ${character('kai', 640, 1480, 1.35, { t, dir: -1, face: t > half ? 'shocked' : 'tired', glow: stress, color: t > half ? (Math.sin(t * 18) > 0 ? RED : KAI) : undefined, pose: { lean: 0, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [8, 10], armR: [-8, 10] } })}`, 540, 1200);
}

// ---------- end card ----------
function endCard(t) {
  const a = ease((t - CTA.at + 0.1) / 0.3), b = easeOutBack((t - CTA2) / 0.35), f = CTA.words[0].s;
  const tap = t > f + 0.5 && t < f + 1.0 ? (t - f - 0.5) / 0.5 : 0;
  const txt = (y, size, color, s) => `<text x="540" y="${y}" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="900" font-size="${size}" fill="${color}" stroke="#000" stroke-width="9" style="paint-order:stroke">${s}</text>`;
  return `<rect width="1080" height="1920" fill="#050c1c" opacity="${0.72 * a}"/>
    <g opacity="${a}" transform="translate(0 ${(1 - a) * 40})">
      <path d="${rr(370, 640, 340, 96, 48)}" fill="${PINK}"/><path d="${rr(370, 640, 340, 96, 48)}" fill="none" stroke="${PINK}" stroke-width="16" opacity="0.4" filter="url(#neon)"/>
      <text x="540" y="704" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="#fff">+ FOLLOW</text>
      ${tap ? `<circle cx="600" cy="690" r="${20 + tap * 50}" fill="#fff" opacity="${0.5 * (1 - tap)}"/>` : ''}
      ${txt(830, 58, '#fff', 'TO HEAR WHAT')}${txt(900, 58, MINT, 'MINT SAYS NEXT 😬')}
    </g>
    ${t >= CTA2 ? `<g transform="translate(540 1180) scale(${b}) translate(-540 -1180)">
      <g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M540 1040 v-70 M510 1000 l30 -30 l30 30 M490 1010 h-20 v70 h140 v-70 h-20"/></g>
      ${txt(1150, 50, '#fff', 'SEND THIS TO THE ROOMMATE')}${txt(1212, 50, MINT, 'WHO ALWAYS PAYS "TOMORROW" 📅')}
    </g>` : ''}`;
}

// ---------- scenes ----------
const S = [HOOK.end, PK.end, CN.end, KA.end, NT.end, MN.end, DUR];
const SCENES = [
  { to: S[0], draw: (t) => svgDoc(1080, 1920, `${hookScene(t)}${title(t)}${label}`) },
  { to: S[1], draw: (t, u, d) => svgDoc(1080, 1920, `${pocketsScene(t, u / d)}${captions(t, [PK])}${label}`) },
  { to: S[2], draw: (t) => svgDoc(1080, 1920, `${countScene(t)}${captions(t, [CN])}${label}`) },
  { to: S[3], draw: (t, u, d) => svgDoc(1080, 1920, `${doorScene(t, u / d)}${captions(t, [ST, GD, KA], { quote: ['gold', 'kai'] })}${label}`) },
  { to: S[4], draw: (t, u, d) => svgDoc(1080, 1920, `${nightScene(t, u / d)}${captions(t, [NT])}${label}`) },
  { to: S[5], draw: (t, u, d) => svgDoc(1080, 1920, `${mintScene(t, u / d)}${captions(t, [MN], { quote: ['mint'] })}${label}`) },
  { to: S[6], draw: (t) => svgDoc(1080, 1920, `${blur(mintScene(t, 1), 0.5)}${endCard(t)}${label}`) },
];
function frameAt(t) {
  let from = 0;
  for (const s of SCENES) { if (t < s.to) return s.draw(t, t - from, s.to - from); from = s.to; }
  return SCENES[SCENES.length - 1].draw(t, 1, 1);
}

// ---------- audio ----------
function timeline() {
  const v = (c, extra = {}) => ({ file: `${AUD}/${c.name}.mp3`, at: c.at, ...extra });
  const thru = 'highpass=f=140,lowpass=f=2400';
  const fx = [
    { fx: 'drone', args: [0, S[5], 0.18, 52] },
    { fx: 'hit', args: [TOMORROW, 52] }, { fx: 'whoosh', args: [TOMORROW - 0.12, 0.3] }, { fx: 'click', args: [FRIDAY] },
    ...[S[0], S[1], S[2], S[3], S[4]].map(s => ({ fx: 'whoosh', args: [s - 0.12, 0.35] })),
    ...['pocket', 'jacket', 'couch'].map(w => ({ fx: 'click', args: [W(PK, w)] })),
    ...['coins', 'five', 'two', 'ones'].map(w => ({ fx: 'click', args: [W(CN, w)] })), { fx: 'hit', args: [W(CN, 'close'), 48] },
    ...[0, 0.45, 0.9, 1.35].map(d => ({ fx: 'step', args: [W(ST, 'footsteps') + d, 0.7] })),
    ...KNOCKS.map(k => ({ fx: 'knock', args: [k] })),
    ...[0, 0.55, 1.1].map(d => ({ fx: 'step', args: [MN.at - 0.95 + d] })), { fx: 'creak', args: [MN.at - 1.0, 0.7] },
    { fx: 'hit', args: [W(MN, 'half'), 46] },
    { fx: 'click', args: [CTA.words[0].s + 0.5] },
  ];
  for (let b = W(MN, 'half'); b < S[5] - 0.2; b += 0.55) fx.push({ fx: 'beat', args: [b] });
  return { dur: DUR, voices: [v(HOOK), v(PK), v(CN), v(ST), v(GD, { filter: thru, gain: 0.95 }), v(KA), v(NT), v(MN), v(CTA)], sfx: fx };
}

const TEST = process.argv.indexOf('--test');
if (TEST > 0) (async () => {
  const out = process.argv[TEST + 1];
  const b = await chromium.launch(), pg = await b.newPage();
  await pg.setViewportSize({ width: 1080, height: 1920 });
  const times = process.env.TIMES ? process.env.TIMES.split(',').map(Number) : SCENES.map((s, i) => (i ? SCENES[i - 1].to : 0) * 0.3 + s.to * 0.7);
  console.log('scenes end', SCENES.map(s => s.to.toFixed(2)).join(' '), '| tomorrow', TOMORROW.toFixed(2), '| friday', FRIDAY.toFixed(2), '| title end', TITLE_END.toFixed(2), '| dur', DUR.toFixed(2));
  for (let i = 0; i < times.length; i++) { await pg.setContent(`<html><body style="margin:0">${frameAt(times[i])}</body></html>`); await pg.screenshot({ path: `${out}/p${i}.png` }); }
  await b.close();
})();
else (async () => {
  if (DUR > 40) throw new Error('over 40 s: ' + DUR);
  const tmp = fs.mkdtempSync(os.tmpdir() + '/ep04-');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  await page.setContent('<html><body style="margin:0;background:#000"><div id="r"></div></body></html>');
  const N = Math.round(DUR * FPS);
  for (let i = 0; i < N; i++) {
    await page.evaluate(s => { document.getElementById('r').innerHTML = s; }, frameAt(i / FPS));
    await page.screenshot({ path: `${tmp}/f${String(i).padStart(4, '0')}.png` });
    if (i % 150 === 0) console.log('frame', i, '/', N);
  }
  await browser.close();
  fs.writeFileSync(`${AUD}/timeline.json`, JSON.stringify(timeline(), null, 1));
  execFileSync('python3', [__dirname + '/mix.py', `${AUD}/timeline.json`, `${tmp}/mix.wav`]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', `${tmp}/f%04d.png`, '-i', `${tmp}/mix.wav`,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-shortest', `${DIR}/ep02-rent-day-part1.mp4`]);
  fs.copyFileSync(`${tmp}/mix.wav`, `${AUD}/mix.wav`);
  fs.rmSync(tmp, { recursive: true });
  console.log('rendered ep02-rent-day-part1.mp4', DUR.toFixed(2) + 's');
})();
