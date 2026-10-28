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

// ---------- camera ----------
// Every shot gets a short settle on entry (slides in from `from`) and a slow move (z0 -> z1 zoom, dx/dy pan).
function cam(inner, u, { z0 = 1, z1 = 1.05, dx = 0, dy = 0, cx = 540, cy = 1000, from = [0, 0], age: a = 1 } = {}) {
  const z = lerp(z0, z1, ease(u)), s = 1 - ease(a / 0.22);
  const tx = dx * ease(u) + from[0] * s, ty = dy * ease(u) + from[1] * s;
  return `<g transform="translate(${tx} ${ty}) translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})">${inner}</g>`;
}
const fadeIn = (a, d = 0.25) => a < d ? `<rect width="1080" height="1920" fill="#02060f" opacity="${1 - a / d}"/>` : '';
const flash = (a, d = 0.12) => a < d ? `<rect width="1080" height="1920" fill="#fff" opacity="${0.35 * (1 - a / d)}"/>` : '';
// Close-up on a face: head centred at (540, cy).
const HEAD = 303;
const face = (k, t, S, o = {}, cy = 1000) => character(k, 540 + (o.dx || 0), cy + HEAD * S * ({ kai: 1, gold: 1.12, mint: 0.9 }[k]), S, { t, ...o });
const sweat = (t, x, y) => `<path d="M${x} ${y + 60 * ((t * 1.5) % 1)} q-14 24 0 36 q14 -12 0 -36" fill="#bfe8ff" opacity="${1 - ((t * 1.5) % 1)}"/>`;
const SIT = { lean: 6, bob: 0, legL: [90, -90], legR: [84, -86], armL: [30, 40], armR: [20, 50] };

// ---------- pockets (three places, three angles) ----------
const icon = {
  pocket: c => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-60 -70 h120 l10 150 h-55 l-15 -90 l-15 90 h-55 Z"/></g>`,
  jacket: c => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-25 -75 l25 25 l25 -25 l45 20 l20 90 l-28 6 l-7 -40 v80 h-110 v-80 l-7 40 l-28 -6 l20 -90 Z M0 -50 v130"/><path d="M-40 20 h22 M18 20 h22"/></g>`,
  couch: c => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-95 -20 h190 v60 h-190 Z M-80 40 v20 M80 40 v20 M-95 -20 v-15 h15 M95 -20 v-15 h-15"/></g>`,
};
const empty = (t, s, x, y, txt = 'EMPTY', c = RED) => t < s ? '' : `<g transform="translate(${x} ${y}) scale(${pop(t, s, 0.25)}) rotate(-6)"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="80" fill="${c}" stroke="#000" stroke-width="10" style="paint-order:stroke">${txt}</text></g>`;
function pocketShot(t, u, a) { // extreme close-up: the jeans pocket gets pulled inside out
  const pull = ease((a - 0.1) / 0.5);
  const lining = `<path d="M-50 -50 q20 ${10 + 60 * pull} 40 0 M10 -50 q20 ${10 + 60 * pull} 40 0" fill="#e6eeff" stroke="#e6eeff" stroke-width="4"/>`;
  return cam(`${soft(540, 1000, 420, P.warm, 0.1)}<g transform="translate(540 1040) scale(4.2)">${icon.pocket(P.warm)}${lining}</g>
    ${[0, 1, 2, 3, 4].map(k => `<circle cx="${470 + k * 40}" cy="${1080 + 120 * pull + k * 14}" r="5" fill="#cfe3ff" opacity="${pull * (1 - pull) * 2}"/>`).join('')}
    ${empty(t, W(PK, 'every', 1) - 0.45, 540, 1480)}`, u, { z0: 1.12, z1: 1.0, age: a, from: [0, 120] });
}
function closetShot(t, u, a) { // bedroom closet, side angle
  const sw = Math.sin(a * 7) * 8 * Math.exp(-a * 1.5);
  return cam(`${line('M0 1480 H1080', P.line, 3)}${line('M560 520 h460 v960 M560 520 v960 M600 600 h380', P.lav, 3, 0.7)}${soft(780, 800, 260, P.lav, 0.1)}
    <g transform="translate(780 620) rotate(${sw})">${line('M0 -20 v40 M-70 50 L0 20 L70 50', '#e6eeff', 4)}<g transform="translate(0 150) scale(1.7)">${icon.jacket(P.warm)}</g></g>
    ${character('kai', 360, 1480, 1.3, { t, face: 'determined', glow: 0.75, pose: { lean: 12, bob: 0, legL: [10, -6], legR: [-10, -6], armL: [95 + sw * 2, 10], armR: [70, 30] } })}
    ${empty(t, W(PK, 'even') - 0.4, 780, 1180)}`, u, { z0: 1.0, z1: 1.06, dx: -30, age: a, from: [160, 0] });
}
function couchShot(t, u, a) { // living room, low angle; a coin flies up out of frame (lands in the next shot)
  const lift = ease((a - 0.15) / 0.4), coinY = 1180 - 1500 * ease((a - 0.55) / 0.6);
  return cam(`${line('M0 1560 H1080', P.line, 3)}${soft(540, 1200, 380, P.warm, 0.1)}
    <g transform="translate(540 1330) scale(4.6)">${icon.couch(P.warm)}</g>
    <g transform="translate(150 1240) rotate(${-24 * lift} 0 0)">${line('M0 0 h330 v-110 h-330 Z', P.warm, 5)}</g>
    ${character('kai', 860, 1560, 1.25, { t, dir: -1, face: 'determined', glow: 0.75, pose: { lean: 35, bob: 0, legL: [30, -40], legR: [-6, -10], armL: [110, 10], armR: [80, 20] } })}
    ${a > 0.55 ? `<g transform="translate(330 ${coinY})"><circle r="34" fill="#0b1d38" stroke="${P.warm}" stroke-width="6" filter="url(#glow)"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="${P.warm}">¢</text></g>` : ''}`, u, { z0: 1.0, z1: 1.04, age: a, from: [-160, 0] });
}

// ---------- the count: top-down on the kitchen table ----------
const bill = (n, c = P.green) => `<path d="${rr(-90, -42, 180, 84, 8)}" fill="#0b1d38" stroke="${c}" stroke-width="4"/><circle r="22" fill="none" stroke="${c}" stroke-width="3"/><text y="11" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${c}">${n}</text>
  <text x="-68" y="-18" font-family="Inter" font-weight="900" font-size="18" fill="${c}">${n}</text><text x="68" y="32" text-anchor="end" font-family="Inter" font-weight="900" font-size="18" fill="${c}">${n}</text>`;
const coinArt = `${[0, 1, 2, 3].map(i => `<circle cx="${(i % 2) * 70 - 35}" cy="${Math.floor(i / 2) * 70 - 35}" r="30" fill="#0b1d38" stroke="${P.warm}" stroke-width="4"/><text x="${(i % 2) * 70 - 35}" y="${Math.floor(i / 2) * 70 - 25}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="${P.warm}">¢</text>`).join('')}`;
function tableShot(t, u, a) {
  const it = [
    [PK.end - 0.05, 380, 900, -8, coinArt], [W(CN, 'five'), 700, 860, 8, bill('5')],
    [W(CN, 'two'), 420, 1150, -6, bill('1')], [W(CN, 'ones'), 720, 1170, 10, bill('1')],
  ].map(([s, x, y, r, art]) => { if (t < s) return ''; const f = ease((t - s) / 0.22), sc = lerp(2.2, 1.5, f);
    return `<ellipse cx="${x + 10}" cy="${y + 20}" rx="${100 * f}" ry="${50 * f}" fill="#000" opacity="${0.35 * f}" filter="url(#b10)"/><g transform="translate(${x} ${y}) rotate(${r}) scale(${sc})">${art}</g>`; }).join('');
  const tot = W(CN, 'ones') + 0.35;
  const planks = [0, 1, 2, 3, 4, 5].map(k => line(`M130 ${620 + k * 130} H950`, P.warm, 2, 0.25)).join('');
  return cam(`<rect x="130" y="560" width="820" height="800" rx="20" fill="#0d2140"/>${neon(`M130 580 v760 h820 v-760 Z`, P.warm, 3)}${planks}${soft(540, 1000, 400, P.warm, 0.08)}${it}
    ${t >= tot ? `<g transform="translate(540 1480) scale(${pop(t, tot, 0.3)})"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="${P.green}" stroke="#000" stroke-width="12" style="paint-order:stroke">$8.37</text></g>` : ''}`,
    u, { z0: 1.0, z1: 1.08, age: a, from: [0, -140] });
}
function sadFace(t, u, a) {
  return cam(`${soft(540, 1000, 380, KAI, 0.08)}${face('kai', t, 3.6, { face: 'sad', glow: lerp(0.8, 0.4, ease(a / 0.6)), droop: 0.7 })}
    <g transform="translate(540 1500) scale(${pop(t, W(CN, 'close'), 0.25)})"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="110" fill="${RED}" stroke="#000" stroke-width="12" style="paint-order:stroke">$8.37</text></g>`, u, { z0: 1.0, z1: 1.1, age: a, from: [0, 0] }) + flash(a);
}

// ---------- the hallway outside (Mr. Gold walks to 214, tracking shot) ----------
function hallDoor(x, n, hot = 0) {
  return `<rect x="${x}" y="760" width="300" height="720" fill="#0b1d38"/>${line(`M${x} 1480 V760 H${x + 300} V1480`, P.warm, 3, 0.6 + 0.4 * hot)}
    <rect x="${x + 110}" y="820" width="80" height="34" rx="4" fill="none" stroke="${P.teal}" stroke-width="2.5"/><text x="${x + 150}" y="846" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${P.teal}">${n}</text>
    <circle cx="${x + 46}" cy="1150" r="12" fill="${P.warm}"/>`;
}
function corridor(t, off) {
  let s = `<rect x="${-off - 200}" y="600" width="3000" height="880" fill="#0a1830"/>${line(`M${-off - 200} 1480 H${2800 - off}`, P.line, 3)}${line(`M${-off - 200} 640 H${2800 - off}`, P.line, 2, 0.4)}
    <rect x="${-off - 200}" y="1484" width="3000" height="40" fill="${GOLD}" opacity="0.06"/>`;
  [['211', -150], ['212', 380], ['213', 780], ['214', 1250]].forEach(([n, x]) => { s += hallDoor(x - off, n, n === '214' ? 1 : 0); });
  [120, 620, 1080, 1620].forEach(x => { s += `<path d="M${x - off - 20} 700 h40 l-10 30 h-20 Z" fill="${GOLD}" opacity="0.8"/>${soft(x - off, 720, 120, GOLD, 0.16 + 0.03 * Math.sin(t * 4 + x))}`; });
  return s;
}
function hallShot(t, u, a, d) {
  const gx = lerp(250, 1060, u), off = gx - 430;
  return `${corridor(t, off)}${character('gold', gx - off, 1480, 1.25, { t, face: 'firm', glow: 0.95, pose: walkPose(a * 1.15) })}` + fadeIn(a, 0.15);
}
function knockShot(t, u, a) { // close-up on 214 from the hallway side
  const sh = KNOCKS.reduce((s, b) => { const g = age(t, b, 0.2); return g < 0 ? s : s + Math.sin(g * 130) * (1 - g / 0.2) * 10; }, 0);
  const hitk = KNOCKS.map(b => clamp(1 - Math.abs(t - b) / 0.12)).reduce((x, y) => Math.max(x, y), 0);
  return cam(`<g transform="translate(${sh} 0)"><rect x="120" y="300" width="840" height="1500" fill="#0b1d38"/>${neon('M120 1800 V300 H960 V1800', P.warm, 5)}
    <rect x="390" y="520" width="300" height="130" rx="10" fill="none" stroke="${P.teal}" stroke-width="7"/><text x="540" y="618" text-anchor="middle" font-family="Inter" font-weight="900" font-size="96" fill="${P.teal}">214</text>
    <circle cx="540" cy="800" r="36" fill="none" stroke="#e6eeff" stroke-width="7"/></g>
    <g transform="translate(${760 + 80 * (1 - hitk)} ${1080})"><path d="${rr(-80, -60, 160, 120, 40)}" fill="${GOLD}" opacity="0.9" filter="url(#glow)"/>${line('M-40 -60 v50 M0 -60 v50 M40 -60 v50', '#7a4a00', 5)}</g>
    ${KNOCKS.map(k => { const g = age(t, k, 0.3); return g < 0 ? '' : `<text x="540" y="1420" text-anchor="middle" font-family="Inter" font-weight="900" font-size="140" fill="#fff" stroke="${GOLD}" stroke-width="10" style="paint-order:stroke" opacity="${1 - g / 0.3}" transform="rotate(-6 540 1400)">KNOCK</text>`; }).join('')}`,
    u, { z0: 1.05, z1: 1.0, age: a, from: [0, 0] }) + flash(a);
}
function goldShot(t, u, a) { // medium shot in the hallway, he talks to the door
  return cam(`${corridor(t, 1250 - 40)}${character('gold', 640, 1480, 1.7, { t, dir: -1, face: 'firm', glow: 1, pose: { lean: -3, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-20, 20], armR: [60, 80] } })}`,
    u, { z0: 1.0, z1: 1.12, cx: 640, cy: 900, age: a, from: [-140, 0] });
}
function insideShot(t, u, a) { // inside 214, over Kai's shoulder: the door with the landlord's light under it
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(t * 3));
  return cam(`${line('M0 1480 H1080', P.line, 3)}
    <rect x="470" y="700" width="380" height="780" fill="#0b1d38"/>${neon('M470 1480 V700 H850 V1480', P.warm, 4)}
    <rect x="${615}" y="${770}" width="90" height="38" rx="4" fill="none" stroke="${P.teal}" stroke-width="2.5"/><text x="660" y="797" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${P.teal}">214</text>
    <rect x="476" y="1470" width="368" height="10" fill="${GOLD}" opacity="${0.5 + 0.5 * pulse}" filter="url(#glow)"/>
    <ellipse cx="660" cy="1494" rx="320" ry="30" fill="${GOLD}" opacity="${0.25 * pulse}" filter="url(#b10)"/>
    ${[0, 1].map(i => `<rect x="${560 + i * 110}" y="1473" width="46" height="8" rx="3" fill="#050c1c"/>`).join('')}
    <g opacity="0.95">${character('kai', 170, 2050, 2.5, { t, face: 'shocked', glow: 0.7, pose: { lean: -3, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [10, 12], armR: [-10, 12] } })}</g>`,
    u, { z0: 1.0, z1: 1.08, cx: 660, cy: 1100, age: a, from: [120, 0] });
}
function smileShot(t, u, a) {
  return cam(`${soft(540, 1000, 380, KAI, 0.1)}${face('kai', t, 3.6, { face: 'happy', glow: 0.8, pose: { lean: 0, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [8, 10], armR: [160, 10] } })}${sweat(t, 380, 820)}`,
    u, { z0: 1.0, z1: 1.06, age: a, from: [0, 0] }) + flash(a);
}

// ---------- night ----------
function buildingShot(t, u, a) { // the street at night: one lit window, 214
  let stars = '';
  for (let k = 0; k < 40; k++) stars += `<circle cx="${(k * 137) % 1080}" cy="${80 + (k * 89) % 620}" r="${1.5 + (k % 3)}" fill="#e6eeff" opacity="${0.3 + 0.3 * Math.sin(t * 3 + k)}"/>`;
  let wins = '';
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
    const x = 270 + c * 150, y = 820 + r * 190, lit = r === 1 && c === 2;
    wins += `<rect x="${x}" y="${y}" width="90" height="120" fill="${lit ? P.warm : '#0d2140'}" opacity="${lit ? 0.85 : 1}" ${lit ? 'filter="url(#glow)"' : ''}/>${line(`M${x} ${y} h90 v120 h-90 Z`, P.line, 2, 0.6)}`;
  }
  return cam(`${stars}<circle cx="840" cy="300" r="60" fill="#e6eeff" opacity="0.85"/>${soft(840, 300, 160, '#cfd9ff', 0.2)}
    <rect x="220" y="760" width="640" height="720" fill="#0b1d38"/>${line('M220 1480 V760 H860 V1480', P.line, 3)}${wins}
    ${soft(615, 1070, 170, P.warm, 0.25)}<text x="615" y="1225" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${P.teal}">214</text>
    ${line('M0 1480 H1080', P.line, 3)}${line('M140 1480 v-260', '#e6eeff', 4)}<rect x="142" y="1220" width="70" height="44" fill="none" stroke="${RED}" stroke-width="3"/><rect x="142" y="1220" width="28" height="22" fill="${P.flagBlue}"/>`,
    u, { z0: 1.0, z1: 1.35, cx: 615, cy: 1070, age: a }) + fadeIn(a, 0.35);
}
function clockShot(t, u, a) {
  const tm = a > 0.6 ? '11:59' : '11:58';
  return cam(`${soft(540, 1000, 360, RED, 0.12)}<g transform="translate(540 1000) scale(3.2)"><path d="${rr(-130, -70, 260, 140, 26)}" fill="#0b1d38" stroke="${RED}" stroke-width="3"/>
    <g fill="${RED}" filter="url(#glow)">${led(tm, -108, -34, 68, RED)}</g></g>`, u, { z0: 1.0, z1: 1.08, age: a }) + flash(a);
}

// ---------- Mint ----------
function bedShot(t, u, a) { // bedroom: Kai on the bed, Mint's door opens (green light spills in)
  const op = ease((a - 0.15) / 0.6);
  return cam(`${line('M0 1480 H1080', P.line, 3)}
    <rect x="700" y="640" width="300" height="840" fill="#0b1d38"/>${line('M700 1480 V640 H1000 V1480', P.line, 3, 0.7)}
    <path d="M700 1480 V640 H${700 + 300 * op} V1480 Z" fill="${MINT}" opacity="${0.35 * op}"/>${soft(850, 1060, 260, MINT, 0.3 * op)}
    <path d="M700 1480 L${700 + 300 * op} 1480 L${560 + 420 * op} 1620 L560 1620 Z" fill="${MINT}" opacity="${0.12 * op}"/>
    ${line('M60 1300 h520 v90 h-520 M80 1390 v90 M560 1390 v90 M60 1300 v-140', P.lav, 3, 0.7)}
    ${character('kai', 330, 1478, 1.25, { t, dir: 1, face: op > 0.5 ? 'shocked' : 'tired', glow: 0.45, droop: 0.8, pose: SIT })}`, u, { z0: 1.0, z1: 1.05, cx: 700, age: a }) + fadeIn(a, 0.12);
}
function mintShot(t, u, a) { // low angle, Mint in his doorway
  return cam(`<rect x="200" y="300" width="680" height="1500" fill="${MINT}" opacity="0.18"/>${line('M200 1800 V300 H880 V1800', P.line, 4)}${soft(540, 900, 420, MINT, 0.22)}
    ${character('mint', 540, 1780, 2.3, { t, face: 'sad', glow: 0.9, pose: { lean: -2, bob: Math.sin(t * 2) * 2, legL: [6, -4], legR: [-6, -4], armL: [8, 10], armR: [55, 60] } })}`,
    u, { z0: 1.0, z1: 1.08, cy: 900, age: a, from: [0, 100] }) + flash(a);
}
function envShot(t, u, a) { // close-up on the envelope in Mint's hand
  const tr = Math.sin(t * 40) * 3;
  return cam(`${soft(540, 1000, 400, MINT, 0.18)}<g transform="translate(${540 + tr} 1000) rotate(-6) scale(5.2)"><rect x="-44" y="-30" width="88" height="60" rx="4" fill="#e6ecf6"/><path d="M-44 -30 L0 6 L44 -30" fill="none" stroke="#9aa6bf" stroke-width="2"/>
    <text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="13" fill="#1a7a45">RENT</text></g>
    <path d="M${720 + tr} 1180 q90 -30 180 40" stroke="${MINT}" stroke-width="40" fill="none" stroke-linecap="round" opacity="0.8" filter="url(#glow)"/>`, u, { z0: 1.0, z1: 1.1, age: a });
}
function redFace(t, u, a) {
  const f = Math.sin(t * 18) > 0;
  return cam(`${soft(540, 1000, 400, RED, 0.14)}${face('kai', t, 3.6, { face: 'shocked', glow: 0.6 + 0.4 * Math.abs(Math.sin(t * 18)), color: f ? RED : KAI })}`, u, { z0: 1.0, z1: 1.12, age: a }) + flash(a);
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

// ---------- shots: short, each cut motivated by the story ----------
const NT_MID = NT.at + (NT.end - NT.at) * 0.5;
const SHOTS = [
  [HOOK.end, (t) => `${hookScene(t)}${title(t)}`],
  [W(PK, 'every', 1) - 0.05, (t, u, a) => pocketShot(t, u, a) + captions(t, [PK])],
  [W(PK, 'even') - 0.05, (t, u, a) => closetShot(t, u, a) + captions(t, [PK])],
  [PK.end, (t, u, a) => couchShot(t, u, a) + captions(t, [PK])],                       // coin flies up...
  [W(CN, 'not') - 0.05, (t, u, a) => tableShot(t, u, a) + captions(t, [CN])],          // ...and lands on the table
  [CN.end, (t, u, a) => sadFace(t, u, a) + captions(t, [CN])],
  [KNOCKS[0] - 0.08, (t, u, a) => hallShot(t, u, a) + captions(t, [ST])],             // footsteps -> the hallway
  [GD.words[0].s - 0.05, (t, u, a) => knockShot(t, u, a)],
  [W(GD, 'tomorrow') - 0.05, (t, u, a) => goldShot(t, u, a) + captions(t, [GD], { quote: ['gold'] })],
  [KA.at, (t, u, a) => insideShot(t, u, a) + captions(t, [GD], { quote: ['gold'] })], // "Tomorrow." heard from inside
  [KA.end, (t, u, a) => smileShot(t, u, a) + captions(t, [KA], { quote: ['kai'] })],
  [NT_MID, (t, u, a) => buildingShot(t, u, a) + captions(t, [NT])],                   // time passes: the street at night
  [NT.end, (t, u, a) => clockShot(t, u, a) + captions(t, [NT])],
  [W(MN, 'can') - 0.05, (t, u, a) => bedShot(t, u, a) + captions(t, [MN], { quote: ['mint'] })],
  [W(MN, 'half') - 0.05, (t, u, a) => mintShot(t, u, a) + captions(t, [MN], { quote: ['mint'] })],
  [W(MN, 'rent') + 0.05, (t, u, a) => envShot(t, u, a) + captions(t, [MN], { quote: ['mint'] })],
  [MN.end, (t, u, a) => redFace(t, u, a) + captions(t, [MN], { quote: ['mint'] })],
  [DUR, (t) => `${blur(redFace(t, 1, 1), 0.5)}${endCard(t)}`],
];
const S = SHOTS.map(s => s[0]);
const SCENES = SHOTS.map(([to, f], i) => ({ to, draw: (t, u, d) => svgDoc(1080, 1920, f(t, u / d, u, d) + label) }));
function frameAt(t) {
  let from = 0;
  for (const s of SCENES) { if (t < s.to) return s.draw(t, t - from, s.to - from); from = s.to; }
  return SCENES[SCENES.length - 1].draw(t, 1, 1);
}

// ---------- audio ----------
function timeline() {
  const v = (c, extra = {}) => ({ file: `${AUD}/${c.name}.mp3`, at: c.at, ...extra });
  const fx = [
    { fx: 'drone', args: [0, MN.end, 0.18, 52] },
    { fx: 'hit', args: [TOMORROW, 52] }, { fx: 'whoosh', args: [TOMORROW - 0.12, 0.3] }, { fx: 'click', args: [FRIDAY] },
    ...S.slice(0, -2).map(s => ({ fx: 'whoosh', args: [s - 0.1, 0.25] })),
    ...['every', 'even'].map(w => ({ fx: 'click', args: [W(PK, w) - 0.45] })), { fx: 'click', args: [PK.end - 0.25] },
    ...['five', 'two', 'ones'].map(w => ({ fx: 'click', args: [W(CN, w)] })), { fx: 'click', args: [PK.end] }, { fx: 'hit', args: [W(CN, 'close'), 48] },
    ...[0, 0.42, 0.84, 1.26, 1.68].map(d => ({ fx: 'step', args: [ST.at + 0.1 + d, 0.8] })),
    ...KNOCKS.map(k => ({ fx: 'knock', args: [k] })),
    { fx: 'creak', args: [MN.at - 0.9, 0.7] },
    { fx: 'hit', args: [W(MN, 'half'), 46] },
    { fx: 'click', args: [CTA.words[0].s + 0.5] },
  ];
  for (let b = W(MN, 'half'); b < MN.end - 0.2; b += 0.55) fx.push({ fx: 'beat', args: [b] });
  return { dur: DUR, voices: [v(HOOK), v(PK), v(CN), v(ST), v(GD), v(KA), v(NT), v(MN), v(CTA)], sfx: fx };
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
  const UNTIL = Number(process.env.UNTIL || DUR), N = Math.round(Math.min(DUR, UNTIL) * FPS);   // UNTIL=3.4 renders only the hook
  const OUTF = UNTIL < DUR ? 'hook.mp4' : 'ep02-rent-day-part1.mp4';
  for (let i = 0; i < N; i++) {
    await page.evaluate(s => { document.getElementById('r').innerHTML = s; }, frameAt(i / FPS));
    await page.screenshot({ path: `${tmp}/f${String(i).padStart(4, '0')}.png` });
    if (i % 150 === 0) console.log('frame', i, '/', N);
  }
  await browser.close();
  fs.writeFileSync(`${AUD}/timeline.json`, JSON.stringify(timeline(), null, 1));
  execFileSync('python3', [__dirname + '/mix.py', `${AUD}/timeline.json`, `${tmp}/mix.wav`]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', `${tmp}/f%04d.png`, '-i', `${tmp}/mix.wav`,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-shortest', `${DIR}/${OUTF}`]);
  if (UNTIL >= DUR) fs.copyFileSync(`${tmp}/mix.wav`, `${AUD}/mix.wav`);
  fs.rmSync(tmp, { recursive: true });
  console.log('rendered', OUTF, (N / FPS).toFixed(2) + 's');
})();
