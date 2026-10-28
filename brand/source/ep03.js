// Episode 1, Part 3 "In My Name": a 30-40 s Short. Hook = contradiction (never opened the card, owes $2,300).
// Usage: node ep03.js <episodeDir> [--test <outDir>]   (voice lines live in <episodeDir>/audio)
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const { character, walkPose, lerp } = require('./glow.js');
const { P, svgDoc, rr } = require('./world.js');
const { line, neon, soft, blur, PINK } = require('./ep01.js');

const DIR = process.argv[2];
const AUD = `${DIR}/audio`;
const FPS = 30;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = u => { u = clamp(u); return u * u * (3 - 2 * u); };
const easeOutBack = u => { const c = 1.7; u = clamp(u); return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
const MINT = '#3fe0a0', GOLD = '#ffb52e', RED = '#ff5a5a';

// ---------- timeline (scenes follow the voice lines; no dead air) ----------
const load = n => JSON.parse(fs.readFileSync(`${AUD}/${n}.words.json`));
const lastEnd = ws => ws[ws.length - 1].s + ws[ws.length - 1].d;
let cursor = 0;
const clip = (name, lead = 0.08, tail = 0.12, offset = null) => {
  const ws = load(name), at = offset === null ? cursor + lead : offset, end = at + lastEnd(ws) + tail;
  cursor = end;
  return { name, at, end, words: ws.map(w => ({ ...w, s: w.s + at })) };
};
const W = (c, w, n = 0) => c.words.filter(x => x.w.toLowerCase().replace(/[^a-z0-9$]/g, '') === w)[n].s;
const HOOK = clip('hook', 0, 0.5, -0.05);
const OWE = W(HOOK, 'owe');                                   // first hit lands on "owe"
const BR1 = clip('brooke-1', 0.65, 0.25);
const KNOCKS = [BR1.at - 0.55, BR1.at - 0.3];
const CH = clip('charges', 0.3, 1.3);
const HOT = clip('hotel', 0.25, 0.8);
const MN = clip('mint', 0.9, 0.3);
const GN = clip('goldnarr', 0.3, 0.2);
const GD = clip('gold', 0.7, 0.5);
const LS = clip('lease', 0.3, 1.6);
const CTA = clip('cta', 0.1, 0.7);
const CTA2 = W(CTA, 'and');
const DUR = CTA.end + 0.3;
const TITLE_END = Math.max(3.0, lastEnd(HOOK.words));

// ---------- captions ----------
const COLORS = { owe: RED, '2300': P.green, hotel: PINK, phone: PINK, cash: P.green, never: RED, name: RED, two: PINK, lease: RED, apartment: RED, brooke: PINK, walker: RED, follow: PINK, passwords: PINK, landlords: GOLD, opened: GOLD };
const SPEAKER = { 'brooke-1': PINK, mint: MINT, gold: GOLD };
const key = w => w.toLowerCase().replace(/[^a-z0-9]/g, '');
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
    return { label, seen: t >= w.s, pop, color: COLORS[key(w.w)] || SPEAKER[c.name] || '#fff' };
  });
  const sizes = parts.map(p => p.label.replace(/[.,:'"!?$]/g, '').length * 54 + p.label.replace(/[^.,:'"!?$]/g, '').length * 22 + 34);
  let x = 540 - sizes.reduce((a, b) => a + b, 0) / 2;
  return parts.map((p, i) => {
    const cx = x + sizes[i] / 2; x += sizes[i];
    return p.seen ? `<text x="${cx}" y="470" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${p.color}" stroke="#000" stroke-width="11" style="paint-order:stroke" transform="translate(${cx} 446) scale(${p.pop}) translate(${-cx} -446)">${p.label.replace(/&/g, '&amp;')}</text>` : '';
  }).join('');
}
const label3 = `<text x="540" y="1640" text-anchor="middle" font-family="Inter" font-weight="700" font-size="40" fill="#fff" opacity="0.85">Part 3</text>`;
const push = (s, inner, cx = 540, cy = 1000) => `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
const age = (t, b, d) => (t >= b && t < b + d ? (t - b) : -1);

// ---------- hook title card (first 3 s) ----------
function title(t) {
  if (t >= TITLE_END + 0.15) return '';
  const s = t < TITLE_END ? 1 + 0.08 * Math.exp(-t * 14) : 1 - (t - TITLE_END) / 0.15;
  return `<g transform="translate(540 360) scale(${s}) translate(-540 -360)"><rect x="150" y="262" width="780" height="196" rx="22" fill="#fff"/>
    <text x="540" y="345" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#0a1426">I NEVER OPENED IT.</text>
    <text x="540" y="425" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#0a1426">I OWE <tspan fill="#e0245e">$2,300.</tspan></text></g>`;
}

// ---------- papers ----------
const sheet = (w, h, head, headColor) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="#f1f4fa"/>
  <path d="M${-w / 2} ${-h / 2 + 62} V${-h / 2 + 8} q0 -8 8 -8 H${w / 2 - 8} q8 0 8 8 V${-h / 2 + 62} Z" fill="${headColor}"/>
  <text x="0" y="${-h / 2 + 44}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#fff" letter-spacing="2">${head}</text>`;
const notice = (stamp = 1) => `<g>${sheet(300, 380, 'FINAL NOTICE', '#e0245e')}
  <text x="-126" y="-98" font-family="Inter" font-weight="700" font-size="13" fill="#6a7692" letter-spacing="2">CARD HOLDER</text>
  <text x="-126" y="-58" font-family="Inter" font-weight="900" font-size="44" fill="#0b1d38">Kai Walker</text>
  <text x="-126" y="-30" font-family="JetBrains Mono" font-weight="700" font-size="14" fill="#6a7692">CARD **** 4417</text>
  <text x="-126" y="8" font-family="Inter" font-weight="700" font-size="13" fill="#6a7692" letter-spacing="2">AMOUNT PAST DUE</text>
  <text x="-126" y="64" font-family="Inter" font-weight="900" font-size="58" fill="#e0245e">$2,300</text>
  <g fill="#c4cbdb"><rect x="-126" y="94" width="230" height="8" rx="4"/><rect x="-126" y="114" width="190" height="8" rx="4"/></g>
  <g transform="translate(70 150) rotate(-14) scale(${stamp})"><rect x="-70" y="-24" width="140" height="48" rx="6" fill="none" stroke="#e0245e" stroke-width="4"/><text x="0" y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="#e0245e">PAST DUE</text></g></g>`;

// Statement: each row pops in when its word is spoken.
const ROWS = () => [
  ['HOTEL · 2 GUESTS', '$640', W(CH, 'hotel')], ['NEW PHONE', '$410', W(CH, 'phone')],
  ['CASH ADVANCE', '$900', W(CH, 'cash')], ['LATE FEES', '$350', W(CH, 'touched') + 0.25],
];
function statement(t, hl = 0) {
  const rows = ROWS().map(([a, b, s], i) => {
    const p = easeOutBack((t - s) / 0.3); if (t < s) return '';
    const y = -70 + i * 62;
    return `<g transform="translate(${(1 - p) * -40} 0)" opacity="${clamp((t - s) / 0.15)}">
      ${i === 0 && hl ? `<rect x="-180" y="${y - 34}" width="360" height="50" rx="10" fill="${PINK}" opacity="${0.3 * hl}"/><rect x="-180" y="${y - 34}" width="360" height="50" rx="10" fill="none" stroke="#e0245e" stroke-width="4" opacity="${hl}"/>` : ''}
      <text x="-160" y="${y}" font-family="Inter" font-weight="800" font-size="22" fill="#0b1d38">${a}</text>
      <text x="160" y="${y}" text-anchor="end" font-family="JetBrains Mono" font-weight="800" font-size="24" fill="#e0245e">${b}</text>
      <path d="M-160 ${y + 18} h320" stroke="#d3d9e6" stroke-width="2"/></g>`;
  }).join('');
  const ts = ROWS()[3][2] + 0.35, tp = easeOutBack((t - ts) / 0.35);
  return `<g>${sheet(400, 470, 'CARD STATEMENT', '#24314f')}
    <text x="-160" y="-150" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">CARD HOLDER</text>
    <text x="-160" y="-118" font-family="Inter" font-weight="900" font-size="30" fill="#0b1d38">Kai Walker</text>
    <text x="160" y="-118" text-anchor="end" font-family="JetBrains Mono" font-weight="700" font-size="16" fill="#6a7692">**** 4417</text>
    ${rows}
    ${t >= ts ? `<g transform="translate(0 190) scale(${tp}) translate(0 -190)"><path d="M-160 162 h320" stroke="#0b1d38" stroke-width="3"/><text x="-160" y="205" font-family="Inter" font-weight="900" font-size="28" fill="#0b1d38">TOTAL</text>
      <text x="160" y="205" text-anchor="end" font-family="Inter" font-weight="900" font-size="40" fill="#e0245e">$2,300</text></g>` : ''}</g>`;
}

// Hotel receipt: the fields pop with the words.
function receipt(t) {
  const f = (w, inner, dx = 0) => { const s = W(HOT, w), p = easeOutBack((t - s) / 0.3); return t < s ? '' : `<g transform="translate(${dx} 0) scale(${p})">${inner}</g>`; };
  return `<g>${sheet(360, 470, 'HOTEL RECEIPT', '#7a2a5a')}
    <text x="-150" y="-140" font-family="JetBrains Mono" font-weight="700" font-size="17" fill="#6a7692">ROOM 9 · 1 NIGHT</text>
    <text x="150" y="-140" text-anchor="end" font-family="JetBrains Mono" font-weight="800" font-size="20" fill="#0b1d38">$640</text>
    <path d="M-150 -122 h300" stroke="#d3d9e6" stroke-width="2" stroke-dasharray="6 6"/>
    ${f('friday', `<text x="-150" y="-70" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">CHECK-IN</text><text x="-150" y="-36" font-family="Inter" font-weight="900" font-size="32" fill="#0b1d38">FRI · 11:48 PM</text>`)}
    ${f('name', `<text x="-150" y="14" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">GUEST NAME</text><text x="-150" y="54" font-family="Inter" font-weight="900" font-size="40" fill="#e0245e">KAI WALKER</text>`)}
    ${f('two', `<text x="-150" y="112" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">GUESTS</text><text x="-150" y="190" font-family="Inter" font-weight="900" font-size="96" fill="#e0245e">2</text>
      <g transform="translate(70 160) rotate(-10)"><circle r="58" fill="none" stroke="#e0245e" stroke-width="5"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#e0245e">+1 ?</text></g>`)}
  </g>`;
}

// Lease in Mr. Gold's hand.
function lease(t) {
  const sig = clamp((t - W(LS, 'brooke')) / 0.7), ring = clamp((t - W(LS, 'walker')) / 0.35);
  return `<g>${sheet(380, 500, 'RESIDENTIAL LEASE', '#8a5a10')}
    <text x="-160" y="-150" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">PROPERTY</text>
    <text x="-160" y="-116" font-family="Inter" font-weight="900" font-size="32" fill="#0b1d38">UNIT 214</text>
    <g fill="#c4cbdb"><rect x="-160" y="-88" width="300" height="8" rx="4"/><rect x="-160" y="-68" width="260" height="8" rx="4"/><rect x="-160" y="-48" width="290" height="8" rx="4"/><rect x="-160" y="-28" width="220" height="8" rx="4"/></g>
    <text x="-160" y="24" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">TENANT SIGNATURE</text>
    <clipPath id="sigc"><rect x="-170" y="40" width="${360 * sig}" height="90"/></clipPath>
    <text x="-150" y="104" clip-path="url(#sigc)" font-family="Caladea" font-style="italic" font-weight="700" font-size="44" fill="#1b2a8a">Brooke Walker</text>
    <path d="M-160 120 h320" stroke="#0b1d38" stroke-width="2"/>
    ${ring ? `<ellipse cx="88" cy="90" rx="${82 * ring}" ry="${40 * ring}" fill="none" stroke="#e0245e" stroke-width="6" transform="rotate(-6 78 88)"/>` : ''}
    <text x="-160" y="168" font-family="Inter" font-weight="700" font-size="14" fill="#6a7692" letter-spacing="2">LANDLORD</text>
    <text x="-160" y="200" font-family="Inter" font-weight="800" font-size="22" fill="#0b1d38">R. GOLD</text></g>`;
}

// ---------- the door (same as Part 2) ----------
const DX = 600, DY = 760, DW = 340, DH = 720;
function door(t, x0 = DX) {
  const sh = KNOCKS.reduce((a, b) => { const g = age(t, b, 0.2); return g < 0 ? a : a + Math.sin(g * 130) * (1 - g / 0.2) * 7; }, 0);
  const hum = t >= BR1.words[0].s && t < BR1.end ? Math.sin(t * 70) * 1.6 : 0;
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(t * 6));
  const feet = [0, 1].map(i => `<rect x="${x0 + 70 + i * 120 + Math.sin(t * 5 + i) * 18}" y="${DY + DH - 7}" width="46" height="8" rx="3" fill="#050c1c"/>`).join('');
  return `<g>
    <ellipse cx="${x0 + DW / 2}" cy="${DY + DH + 14}" rx="${DW * 0.9}" ry="34" fill="${PINK}" opacity="${0.28 * pulse}" filter="url(#b10)"/>
    <g transform="translate(${sh + hum} 0)">
      <rect x="${x0}" y="${DY}" width="${DW}" height="${DH}" fill="#0b1d38"/>
      ${neon(`M${x0} ${DY + DH} V${DY} H${x0 + DW} V${DY + DH}`, P.warm, 4)}
      ${line(`M${x0 + 30} ${DY + 220} h${DW - 60} v200 h${-(DW - 60)} Z M${x0 + 30} ${DY + 450} h${DW - 60} v240 h${-(DW - 60)} Z`, P.warm, 2.5, 0.55)}
      <rect x="${x0 + DW / 2 - 40}" y="${DY + 60}" width="80" height="36" rx="4" fill="none" stroke="${P.teal}" stroke-width="2.5"/><text x="${x0 + DW / 2}" y="${DY + 87}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${P.teal}">214</text>
      <circle cx="${x0 + DW / 2}" cy="${DY + 150}" r="13" fill="none" stroke="#e6eeff" stroke-width="3"/><circle cx="${x0 + DW / 2}" cy="${DY + 150}" r="4" fill="#e6eeff"/>
      <circle cx="${x0 + 52}" cy="${DY + 400}" r="14" fill="${P.warm}"/>
      ${line(`M${x0 + DW - 56} ${DY + 360} h50 M${x0 + DW - 56} ${DY + 360} q-12 12 0 24`, '#e6eeff', 3)}
      <rect x="${x0 + 6}" y="${DY + DH - 8}" width="${DW - 12}" height="10" fill="${PINK}" opacity="${0.45 + 0.55 * pulse}" filter="url(#glow)"/>${feet}
    </g></g>`;
}
const hallway = (t) => `${line('M0 1480 H1080', P.line, 3)}${line('M60 600 v880 M300 600 v880', P.line, 2, 0.35)}${soft(770, 700, 260, P.warm, 0.07 + 0.03 * Math.sin(t * 3))}`;
const HOLD = { lean: 4, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [62, 58], armR: [48, 72] };

// ---------- scenes ----------
function hookScene(t, k) {
  // Kai holds the notice; only the paper zooms, on "owe"
  const z = easeOutBack((t - OWE) / 0.4), stamp = 1 + 0.6 * Math.exp(-Math.max(0, t - OWE - 0.15) * 8) * (t > OWE ? 1 : 0);
  const px = lerp(455, 540, z), py = lerp(1135, 1060, z), sc = lerp(0.55, 1.75, z), rot = lerp(-6, -2, z);
  const shake = t > OWE && t < OWE + 0.25 ? Math.sin(t * 120) * 8 * (1 - (t - OWE) / 0.25) : 0;
  return `${hallway(t)}${door(t)}
    ${character('kai', 300, 1480, 1.35, { t, face: t < OWE ? 'tired' : 'shocked', glow: 0.75, pose: HOLD })}
    ${z > 0 ? `<rect width="1080" height="1920" fill="#050c1c" opacity="${0.45 * clamp(z)}"/>` : ''}
    <g transform="translate(${px + shake} ${py}) rotate(${rot}) scale(${sc})"><rect x="-155" y="-195" width="310" height="390" rx="10" fill="#fff" opacity="0.18" filter="url(#b10)"/>${notice(stamp)}</g>`;
}
function doorScene(t) {
  const back = ease((t - KNOCKS[0]) / 0.3) * 30;
  return push(1.04, `${hallway(t)}${door(t)}
    ${character('kai', 300 - back, 1480, 1.35, { t, face: 'shocked', glow: 0.7, pose: { lean: -5, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [20, 30], armR: [-10, 20] } })}
    <g transform="translate(${420 - back} 1290) rotate(12) scale(0.32)">${notice()}</g>`, 760, 1200);
}
function paperScene(t, art, color, k) {
  return `<rect width="1080" height="1920" fill="${color}" opacity="0.08"/>
    <g opacity="0.45">${character('kai', 540, 1990, 3.1, { t, face: 'shocked', glow: 0.6 + Math.sin(t * 37) * 0.05 })}</g>
    <g transform="translate(540 1040) scale(${2.15 + 0.08 * k}) rotate(-2)"><rect x="-205" y="-245" width="410" height="490" rx="12" fill="#fff" opacity="0.14" filter="url(#b10)"/>${art}</g>`;
}
function mintScene(t, u) {
  const s0 = MN.at - 0.85, w = ease((t - s0) / 1.1), x = lerp(-120, 230, w);
  const walking = t - s0 < 1.1;
  const mpose = walking ? walkPose((t - s0) * 1.6) : { lean: 2, bob: Math.sin(t * 2) * 2, legL: [6, -4], legR: [-6, -4], armL: [8, 10], armR: [150, 30] };
  return push(1 + 0.03 * u, `${hallway(t)}${door(t, 680)}
    ${line('M40 680 h200 v800 M40 680 v800', P.line, 3, 0.6)}${soft(140, 1000, 180, MINT, 0.08)}
    ${character('mint', x, 1480, 1.3, { t, face: 'tired', glow: 0.8, pose: mpose })}
    ${character('kai', 520, 1480, 1.35, { t, dir: -1, face: 'shocked', glow: 0.7, pose: HOLD })}
    <g transform="translate(445 1135) rotate(6) scale(0.42)">${notice()}</g>`, 540, 1200);
}
function peepGold(t, k) {
  const CX = 540, CY = 1000, R = 430;
  const op = ease((t - W(GN, 'door')) / 0.6), walk = ease((t - W(GN, 'opened') - 0.2) / 1.6);
  const gx = CX + 150 - 60 * walk, gy = CY + 150 + 70 * walk, gs = 0.85 + 0.35 * walk;
  const gpose = walk > 0 && walk < 1 ? walkPose(t * 1.4) : { lean: 0, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [8, 10], armR: [70, 40] };
  const lean = Math.sin(t * 14) * 3;
  const inside = `<rect x="${CX - R}" y="${CY - R}" width="${2 * R}" height="${2 * R}" fill="#0f1220"/>
    ${line(`M${CX - R} ${CY + 330} L${CX + 40} ${CY + 170} L${CX + R} ${CY + 330} M${CX - R} ${CY - 330} L${CX + 40} ${CY - 120} L${CX + R} ${CY - 330}`, P.line, 3, 0.4)}
    <rect x="${CX + 90}" y="${CY - 110}" width="120" height="270" fill="#0b1d38" stroke="${GOLD}" stroke-width="3" opacity="0.9"/>
    <path d="M${CX + 90} ${CY + 160} L${CX + 90 + 120 * op} ${CY + 160} L${CX + 90 + 120 * op} ${CY - 110} L${CX + 90} ${CY - 110} Z" fill="${GOLD}" opacity="${0.55 * op}"/>
    ${soft(CX + 150, CY + 40, 220, GOLD, 0.35 * op)}
    <path d="M${CX + 90} ${CY + 160} L${CX - 60} ${CY + 330} L${CX + 360} ${CY + 330} L${CX + 210} ${CY + 160} Z" fill="${GOLD}" opacity="${0.12 * op}"/>
    ${op > 0.3 ? character('gold', gx, gy, gs, { t, face: 'firm', glow: 0.9, pose: gpose }) : ''}
    ${op > 0.3 ? `<g transform="translate(${gx + 70 * gs} ${gy - 220 * gs}) rotate(8) scale(${0.18 * gs})">${sheet(380, 500, '', '#8a5a10')}</g>` : ''}
    <g transform="translate(0 ${lean})">${character('brooke', CX - 240, CY + 700, 2.5, { t, dir: 1, face: t > W(GD, 'walker') ? 'shocked' : 'crying', pose: { lean: -4, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-8, 10], armR: [-10, 32] } })}</g>`;
  return `<clipPath id="pp"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
    <rect width="1080" height="1920" fill="#06122a"/>${line('M0 1480 H1080', P.line, 2, 0.4)}
    <g clip-path="url(#pp)" transform="translate(${CX} ${CY}) scale(${1 + 0.04 * k}) translate(${-CX} ${-CY})">${inside}</g>
    <circle cx="${CX}" cy="${CY}" r="${R + 12}" fill="none" stroke="#9aa9c8" stroke-width="26"/><circle cx="${CX}" cy="${CY}" r="${R - 6}" fill="none" stroke="#000" stroke-width="28" opacity="0.5"/>
    <path d="M${CX - 300} ${CY - 250} a360 360 0 0 1 220 -140" stroke="#fff" stroke-width="10" fill="none" opacity="0.2" stroke-linecap="round"/>`;
}
function leaseScene(t, k) {
  const z = easeOutBack((t - LS.at) / 0.45);
  return `<rect width="1080" height="1920" fill="${GOLD}" opacity="0.06"/>${soft(540, 1040, 420, GOLD, 0.18)}
    <g opacity="0.4">${character('kai', 540, 1990, 3.1, { t, face: 'shocked', glow: 0.55 })}</g>
    <g transform="translate(540 1040) scale(${lerp(0.4, 2.1, z) + 0.06 * k}) rotate(${lerp(8, -2, z)})"><rect x="-195" y="-255" width="390" height="510" rx="12" fill="#fff" opacity="0.14" filter="url(#b10)"/>${lease(t)}</g>`;
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
      ${txt(830, 58, '#fff', 'TO MEET')}${txt(900, 58, RED, 'MRS. WALKER 💍')}
    </g>
    ${t >= CTA2 ? `<g transform="translate(540 1180) scale(${b}) translate(-540 -1180)">
      <g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M540 1040 v-70 M510 1000 l30 -30 l30 30 M490 1010 h-20 v70 h140 v-70 h-20"/></g>
      ${txt(1150, 50, '#fff', 'SEND THIS TO THE FRIEND')}${txt(1212, 50, PINK, 'WHO SHARES PASSWORDS 🔑')}
    </g>` : ''}`;
}

// ---------- scenes ----------
const S = [HOOK.end, BR1.end, CH.end, HOT.end, MN.end, GD.end, LS.end, DUR];
const SCENES = [
  { to: S[0], draw: (t, u, d) => svgDoc(1080, 1920, `${hookScene(t, u / d)}${title(t)}${label3}`) },
  { to: S[1], draw: (t) => svgDoc(1080, 1920, `${doorScene(t)}${captions(t, [BR1], { quote: ['brooke-1'] })}${label3}`) },
  { to: S[2], draw: (t, u, d) => svgDoc(1080, 1920, `${paperScene(t, statement(t), PINK, u / d)}${captions(t, [CH])}${label3}`) },
  { to: S[3], draw: (t, u, d) => svgDoc(1080, 1920, `${paperScene(t, receipt(t), PINK, u / d)}${captions(t, [HOT])}${label3}`) },
  { to: S[4], draw: (t, u, d) => svgDoc(1080, 1920, `${mintScene(t, u / d)}${captions(t, [MN], { quote: ['mint'] })}${label3}`) },
  { to: S[5], draw: (t, u, d) => svgDoc(1080, 1920, `${peepGold(t, u / d)}${captions(t, [GN, GD], { quote: ['gold'] })}${label3}`) },
  { to: S[6], draw: (t, u, d) => svgDoc(1080, 1920, `${leaseScene(t, u / d)}${captions(t, [LS])}${label3}`) },
  { to: S[7], draw: (t) => svgDoc(1080, 1920, `${blur(leaseScene(t, 1), 0.5)}${endCard(t)}${label3}`) },
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
  const cry = `vibrato=f=5.5:d=0.18,tremolo=f=5:d=0.2,${thru}`;
  const fx = [
    { fx: 'drone', args: [0, S[6], 0.2, 49] },
    { fx: 'hit', args: [OWE, 52] }, { fx: 'whoosh', args: [OWE - 0.12, 0.3] },
    ...KNOCKS.map(k => ({ fx: 'knock', args: [k] })),
    ...[S[1], S[2], S[3], S[4], S[5]].map(s => ({ fx: 'whoosh', args: [s - 0.12, 0.35] })),
    ...ROWS().map(r => ({ fx: 'click', args: [r[2]] })), { fx: 'hit', args: [ROWS()[3][2] + 0.35, 58] },
    ...['friday', 'name'].map(w => ({ fx: 'click', args: [W(HOT, w)] })), { fx: 'hit', args: [W(HOT, 'two'), 50] },
    ...[0, 0.55, 1.1].map(d => ({ fx: 'step', args: [MN.at - 0.85 + d] })),
    { fx: 'creak', args: [W(GN, 'door') - 0.1] },
    ...[0, 0.5, 1.0].map(d => ({ fx: 'step', args: [W(GN, 'opened') + 0.3 + d, 0.6] })),
    { fx: 'slide', args: [LS.at - 0.1, 0.4] }, { fx: 'hit', args: [W(LS, 'walker'), 46] },
    { fx: 'click', args: [CTA.words[0].s + 0.5] },
  ];
  for (let b = LS.at; b < S[6] - 0.3; b += 0.6) fx.push({ fx: 'beat', args: [b] });
  return { dur: DUR, voices: [v(HOOK), v(BR1, { filter: cry, gain: 0.95 }), v(CH), v(HOT), v(MN), v(GN), v(GD, { filter: thru, gain: 0.95 }), v(LS), v(CTA)], sfx: fx };
}

const TEST = process.argv.indexOf('--test');
if (TEST > 0) (async () => {
  const out = process.argv[TEST + 1];
  const b = await chromium.launch(), pg = await b.newPage();
  await pg.setViewportSize({ width: 1080, height: 1920 });
  const times = process.env.TIMES ? process.env.TIMES.split(',').map(Number) : SCENES.map((s, i) => (i ? SCENES[i - 1].to : 0) * 0.3 + s.to * 0.7);
  console.log('scenes end', SCENES.map(s => s.to.toFixed(2)).join(' '), '| owe', OWE.toFixed(2), '| title end', TITLE_END.toFixed(2), '| dur', DUR.toFixed(2));
  for (let i = 0; i < times.length; i++) { await pg.setContent(`<html><body style="margin:0">${frameAt(times[i])}</body></html>`); await pg.screenshot({ path: `${out}/p${i}.png` }); }
  await b.close();
})();
else (async () => {
  if (DUR > 40) throw new Error('over 40 s: ' + DUR);
  const tmp = fs.mkdtempSync(os.tmpdir() + '/ep03-');
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
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-shortest', `${DIR}/ep01-part3-in-my-name.mp4`]);
  fs.copyFileSync(`${tmp}/mix.wav`, `${AUD}/part3-mix.wav`);
  fs.rmSync(tmp, { recursive: true });
  console.log('rendered ep01-part3-in-my-name.mp4', DUR.toFixed(2) + 's');
})();
