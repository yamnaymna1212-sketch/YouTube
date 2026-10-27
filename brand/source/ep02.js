// Episode 1, Part 2 "The Door": a 30-40 s Short. Hook = contradiction (blocked her, she's at the door).
// Usage: node ep02.js <episodeDir> [--test <outDir>]   (voice lines live in <episodeDir>/audio)
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const { character, mix, lerp } = require('./glow.js');
const { P, svgDoc, rr } = require('./world.js');
const { line, neon, soft, blur, bedroom, phoneBody, KAI, PINK } = require('./ep01.js');

const DIR = process.argv[2];
const AUD = `${DIR}/audio`;
const FPS = 30;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = u => { u = clamp(u); return u * u * (3 - 2 * u); };
const easeOutBack = u => { const c = 1.7; u = clamp(u); return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };

// ---------- timeline (scenes follow the voice lines; no dead air) ----------
const load = n => JSON.parse(fs.readFileSync(`${AUD}/${n}.words.json`));
const lastEnd = ws => ws[ws.length - 1].s + ws[ws.length - 1].d;
let cursor = 0;
const clip = (name, lead = 0.08, tail = 0.12, offset = null) => {
  const ws = load(name), at = offset === null ? cursor + lead : offset, end = at + lastEnd(ws) + tail;
  cursor = end;
  return { name, at, end, words: ws.map(w => ({ ...w, s: w.s + at })) };
};
const HOOK = clip('hook', 0, 0.55, -0.05);
const B1 = HOOK.words.find(w => w.w === 'knocking').s;           // first bang lands on the word
const HOOK_END = HOOK.end;
const B2 = HOOK_END + 0.1, B3 = B2 + 0.42;
cursor = B3 + 1.2;
const BR1 = clip('brooke-1', 0, 0.25);
const PEEP = clip('peep', 0.35, 0.1);
const BR2 = clip('brooke-2', 0.3, 0.25);
const CNT = clip('count', 0.25, 0.45);
const BAL = clip('bal', 0.2, 0.4);
const PAP = clip('paper', 0.05, 1.1);
const PAPER_SLIDE = PAP.words.find(w => w.w === 'paper').s, PAPER_ZOOM = PAP.words.find(w => w.w === 'name').s - 0.1;
const CTA = clip('cta', 0.1, 0.5);
const CTA2 = CTA.words.find(w => w.w === 'And').s;
const DUR = CTA.end + 0.3;
const BANGS = [B1, B2, B3];

// ---------- captions ----------
const COLORS = { chain: PINK, bed: PINK, dollars: '#ff5a5a', blocked: '#ff5a5a', knocking: PINK, suitcase: PINK, fourteen: P.green, paper: PINK, name: '#ff5a5a', follow: PINK, pay: P.green };
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
    return { label, seen: t >= w.s, pop, color: (c.name === 'brooke-1' || c.name === 'brooke-2') && !COLORS[w.w.toLowerCase().replace(/[^a-z]/g, '')] ? PINK : COLORS[w.w.toLowerCase().replace(/[^a-z]/g, '')] || '#fff' };
  });
  const sizes = parts.map(p => p.label.replace(/[.,:'"!?]/g, '').length * 54 + p.label.replace(/[^.,:'"!?]/g, '').length * 20 + 34);
  let x = 540 - sizes.reduce((a, b) => a + b, 0) / 2;
  return parts.map((p, i) => {
    const cx = x + sizes[i] / 2; x += sizes[i];
    return p.seen ? `<text x="${cx}" y="470" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${p.color}" stroke="#000" stroke-width="11" style="paint-order:stroke" transform="translate(${cx} 446) scale(${p.pop}) translate(${-cx} -446)">${p.label}</text>` : '';
  }).join('');
}
const label2 = `<text x="540" y="1640" text-anchor="middle" font-family="Inter" font-weight="700" font-size="40" fill="#fff" opacity="0.85">Part 2</text>`;
const push = (s, inner, cx = 540, cy = 1000) => `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
const age = (t, b, d) => (t >= b && t < b + d ? (t - b) : -1);

// ---------- hook title card (first 3 s) ----------
const TITLE_END = 3.0;
function title(t) {
  if (t >= TITLE_END + 0.15) return '';
  const s = t < TITLE_END ? 1 + 0.08 * Math.exp(-t * 14) : 1 - (t - TITLE_END) / 0.15;
  return `<g transform="translate(540 360) scale(${s}) translate(-540 -360)"><rect x="150" y="262" width="780" height="196" rx="22" fill="#fff"/>
    <text x="540" y="345" text-anchor="middle" font-family="Inter" font-weight="900" font-size="66" fill="#0a1426">I BLOCKED HER.</text>
    <text x="540" y="425" text-anchor="middle" font-family="Inter" font-weight="900" font-size="66" fill="#d6226b">SHE'S AT MY DOOR.</text></g>`;
}

// ---------- scene pieces ----------
const blockedScreen = (t) => {
  const pop = easeOutBack((t - 0.55) / 0.35);
  return phoneBody('#ff5a5a', `
    <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:01</text>
    <circle cx="0" cy="-70" r="30" fill="#5d6b82"/><text x="0" y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#fff">B</text>
    <text x="0" y="-14" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="800" font-size="18" fill="#fff">Brooke (ex) 🚩</text>
    <g transform="translate(0 30) scale(${pop}) translate(0 -30)"><path d="${rr(-52, 12, 104, 36, 18)}" fill="#ff5a5a"/>
      <text x="6" y="36" text-anchor="middle" font-family="Inter" font-weight="900" font-size="14" fill="#fff">Blocked</text>
      <circle cx="-34" cy="30" r="9" fill="#fff"/><path d="M-39 30 l4 4 l7 -8" stroke="#ff5a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>
    <text x="0" y="78" text-anchor="middle" font-family="Inter" font-size="8" fill="#8aa0c8">Calls and texts from this</text>
    <text x="0" y="90" text-anchor="middle" font-family="Inter" font-size="8" fill="#8aa0c8">contact are blocked.</text>`);
};

const DX = 600, DY = 760, DW = 340, DH = 720;
function door(t, hot) {
  const sh = BANGS.reduce((a, b) => { const g = age(t, b, 0.3); return g < 0 ? a : a + Math.sin(g * 130) * (1 - g / 0.3) * 16; }, 0);
  const hum = t >= BR1.words[0].s && t < BR1.end ? Math.sin(t * 70) * 1.8 : 0;
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(t * 6));
  let dust = '', bang = '';
  for (const b of BANGS) {
    const g = age(t, b, 0.5);
    if (g >= 0) for (let k = 0; k < 14; k++) { const ang = k * 0.9, r = g * (180 + (k % 4) * 60); dust += `<circle cx="${DX + DW / 2 + Math.cos(ang) * r}" cy="${DY + 80 + Math.sin(ang) * r * 0.8 + g * 120}" r="${3 + (k % 3)}" fill="#cfe3ff" opacity="${(1 - g / 0.5) * 0.6}"/>`; }
    const gb = age(t, b, 0.3);
    if (gb >= 0) bang += `<text x="${DX + DW / 2}" y="${DY - 40}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="130" fill="#fff" stroke="#ff5a5a" stroke-width="10" style="paint-order:stroke" opacity="${1 - gb / 0.3}" transform="translate(${DX + DW / 2} ${DY - 90}) scale(${1 + 0.4 * (1 - gb / 0.3)}) rotate(-6) translate(${-DX - DW / 2} ${-DY + 90})">BANG</text>`;
  }
  const feet = [0, 1].map(i => `<rect x="${DX + 70 + i * 120 + Math.sin(t * 5 + i) * 18}" y="${DY + DH - 7}" width="46" height="8" rx="3" fill="#050c1c"/>`).join('');
  return `<g>
    <ellipse cx="${DX + DW / 2}" cy="${DY + DH + 14}" rx="${DW * 0.9}" ry="34" fill="${PINK}" opacity="${0.28 * pulse * (1 + hot)}" filter="url(#b10)"/>
    <g transform="translate(${sh + hum} 0) rotate(${sh * 0.05} ${DX + DW / 2} ${DY + DH})">
      <rect x="${DX}" y="${DY}" width="${DW}" height="${DH}" fill="#0b1d38"/>
      ${neon(`M${DX} ${DY + DH} V${DY} H${DX + DW} V${DY + DH}`, P.warm, 4)}
      ${line(`M${DX + 30} ${DY + 220} h${DW - 60} v200 h${-(DW - 60)} Z M${DX + 30} ${DY + 450} h${DW - 60} v240 h${-(DW - 60)} Z`, P.warm, 2.5, 0.55)}
      <rect x="${DX + DW / 2 - 40}" y="${DY + 60}" width="80" height="36" rx="4" fill="none" stroke="${P.teal}" stroke-width="2.5"/><text x="${DX + DW / 2}" y="${DY + 87}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${P.teal}">214</text>
      <circle cx="${DX + DW / 2}" cy="${DY + 150}" r="13" fill="none" stroke="#e6eeff" stroke-width="3"/><circle cx="${DX + DW / 2}" cy="${DY + 150}" r="4" fill="#e6eeff"/>
      <circle cx="${DX + 52}" cy="${DY + 400}" r="14" fill="${P.warm}"/>
      ${line(`M${DX + DW - 56} ${DY + 360} h50 M${DX + DW - 56} ${DY + 360} q-12 12 0 24`, '#e6eeff', 3)}
      <rect x="${DX + 6}" y="${DY + DH - 8}" width="${DW - 12}" height="10" fill="${PINK}" opacity="${0.45 + 0.55 * pulse}" filter="url(#glow)"/>${feet}
    </g>${dust}${bang}</g>`;
}
const hallway = (t) => `${line('M0 1480 H1080', P.line, 3)}${line('M60 600 v880 M300 600 v880', P.line, 2, 0.35)}${soft(770, 700, 260, P.warm, 0.07 + 0.03 * Math.sin(t * 3))}`;

function doorScene(t, k = 0) {
  const g = BANGS.reduce((a, b) => { const q = age(t, b, 0.28); return q < 0 ? a : a + (1 - q / 0.28); }, 0);
  const cs = BANGS.reduce((a, b) => { const q = age(t, b, 0.25); return q < 0 ? a : [a[0] + Math.sin(q * 160) * (1 - q / 0.25) * 9, a[1] + Math.cos(q * 140) * (1 - q / 0.25) * 9]; }, [0, 0]);
  const back = ease((t - B1) / 0.4) * 24;
  const flick = 1 - 0.5 * Math.min(1, g);
  return `<g transform="translate(${cs[0]} ${cs[1]})">${push(1 + 0.05 * k, hallway(t) + door(t, g * 0.8)
    + character('kai', 330 - back, 1480, 1.35, { t, face: 'shocked', glow: flick, pose: { lean: -5 * ease((t - B1) / 0.3), bob: 0, legL: [8, -4], legR: [-8, -4], armL: [-30, 20], armR: [-20, 30] } }), 760, 1200)}</g>`;
}

// ---------- peephole ----------
const suitcase = (x, y) => `<g>${line(`M${x} ${y} h150 v190 h-150 Z M${x + 45} ${y} v-30 h60 v30`, PINK, 5)}${line(`M${x + 20} ${y + 60} h110 M${x + 20} ${y + 110} h110`, PINK, 3, 0.5)}
  <circle cx="${x + 25}" cy="${y + 204}" r="9" fill="none" stroke="${PINK}" stroke-width="4"/><circle cx="${x + 125}" cy="${y + 204}" r="9" fill="none" stroke="${PINK}" stroke-width="4"/></g>`;
function peep(t, k) {
  const lean = ease((t - BR2.words[0].s) / 3.5);
  const sc = 2.6 + 0.4 * lean, sway = Math.sin(t * 3) * 6, sob = Math.sin(t * 14) * 3 * (t >= BR2.words[0].s ? 1 : 0.3);
  const CX = 540, CY = 1000, R = 430;
  const inside = `<rect x="${CX - R}" y="${CY - R}" width="${2 * R}" height="${2 * R}" fill="#14100f"/>
    <rect x="${CX - R}" y="${CY - R}" width="${2 * R}" height="${2 * R}" fill="${P.warm}" opacity="0.14"/>${line(`M${CX - R} ${CY + 330} H${CX + R} M${CX - 260} ${CY - R} v${2 * R}`, P.warm, 3, 0.35)}
    ${soft(CX + 220, CY - 260, 200, P.warm, 0.35)}
    <g transform="translate(${sway} ${sob})">${character('brooke', CX - 20, CY + 640 + lean * 60, sc, { t, face: 'crying', pose: { lean: 4, bob: sob, legL: [6, -4], legR: [-6, -4], armL: [-8, 10], armR: [-10, 32] } })}</g>
    ${suitcase(CX + 170 - lean * 40, CY + 170)}`;
  return `<clipPath id="pp"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
    <rect width="1080" height="1920" fill="#06122a"/>${line('M0 1480 H1080', P.line, 2, 0.4)}
    <g clip-path="url(#pp)" transform="translate(${CX} ${CY}) scale(${1 + 0.02 * k}) translate(${-CX} ${-CY})">${inside}</g>
    <circle cx="${CX}" cy="${CY}" r="${R + 12}" fill="none" stroke="#9aa9c8" stroke-width="26"/><circle cx="${CX}" cy="${CY}" r="${R - 6}" fill="none" stroke="#000" stroke-width="28" opacity="0.5"/>
    <path d="M${CX - 300} ${CY - 250} a360 360 0 0 1 220 -140" stroke="#fff" stroke-width="10" fill="none" opacity="0.2" stroke-linecap="round"/>`;
}

// ---------- the cost: fourteen payments ----------
function count(t) {
  const t0 = CNT.words[0].s, pills = [];
  for (let i = 0; i < 14; i++) {
    const g = (t - (t0 + 0.15 + i * 0.1)) / 0.25; if (g <= 0) continue;
    const c = i % 7, r = Math.floor(i / 7), s = easeOutBack(g);
    pills.push(`<g transform="translate(${158 + c * 127} ${760 + r * 96}) scale(${s})"><path d="${rr(-56, -34, 112, 68, 34)}" fill="#fff" opacity="0.95"/><text x="0" y="-4" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="#0b1d38">$300</text><text x="0" y="22" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" fill="#1a7a45">PAID ✓</text></g>`);
  }
  const tot = easeOutBack((t - (t0 + 1.9)) / 0.35), glitch = Math.sin(t * 37) * 0.05;
  return `<filter id="pk"><feColorMatrix type="saturate" values="0"/><feColorMatrix values="1 0 0 0 0.08  0 0.55 0 0 0  0 0 0.8 0 0.05  0 0 0 1 0"/></filter>
    <rect width="1080" height="1920" fill="${PINK}" opacity="0.1"/>
    <g opacity="0.5">${character('kai', 540, 1980, 3.1, { t, face: 'shocked', glow: 0.7 + glitch })}</g>
    <g filter="url(#pk)">${pills.join('')}</g>
    ${t > t0 + 1.9 ? `<g transform="translate(540 1100) scale(${tot}) translate(-540 -1100)"><text x="540" y="1140" text-anchor="middle" font-family="Inter" font-weight="900" font-size="150" fill="${P.green}" stroke="#000" stroke-width="12" style="paint-order:stroke">$4,200</text></g>` : ''}`;
}

// ---------- the paper ----------
const paperArt = () => `<g><rect x="-150" y="-190" width="300" height="380" rx="8" fill="#f1f4fa"/><rect x="-150" y="-190" width="300" height="62" rx="8" fill="#e0245e"/><rect x="-150" y="-150" width="300" height="22" fill="#e0245e"/>
  <text x="0" y="-146" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="#fff" letter-spacing="2">FINAL NOTICE</text>
  <text x="-126" y="-98" font-family="Inter" font-weight="700" font-size="13" fill="#6a7692" letter-spacing="2">ACCOUNT HOLDER</text>
  <text x="-126" y="-58" font-family="Inter" font-weight="900" font-size="44" fill="#0b1d38">Kai Walker</text>
  <path d="M-126 -38 h252" stroke="#c4cbdb" stroke-width="2"/>
  <text x="-126" y="0" font-family="Inter" font-weight="700" font-size="13" fill="#6a7692" letter-spacing="2">AMOUNT PAST DUE</text>
  <text x="-126" y="56" font-family="Inter" font-weight="900" font-size="58" fill="#e0245e">$2,300</text>
  <g fill="#c4cbdb"><rect x="-126" y="86" width="230" height="8" rx="4"/><rect x="-126" y="106" width="190" height="8" rx="4"/><rect x="-126" y="126" width="210" height="8" rx="4"/></g>
  <g transform="translate(70 142) rotate(-14)"><rect x="-70" y="-24" width="140" height="48" rx="6" fill="none" stroke="#e0245e" stroke-width="4"/><text x="0" y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="#e0245e">PAST DUE</text></g></g>`;
function paper(t, k) {
  const sl = clamp((t - PAPER_SLIDE) / 1.0), z = easeOutBack((t - PAPER_ZOOM) / 0.45);
  const px = lerp(710, 540, z), py = lerp(1520 + 130 * ease(sl), 1000, z), sc = lerp(0.28 + 0.2 * ease(sl), 2.05, z), rot = lerp(-8, -3, z);
  const gapY = DY + DH;
  const under = t < PAPER_ZOOM ? `<clipPath id="below"><rect x="0" y="${gapY - 2}" width="1080" height="600"/></clipPath>` : '';
  return `${hallway(t)}${door(t, 0.2)}
    ${character('kai', 300, 1480, 1.35, { t, face: 'shocked', glow: 0.55, pose: { lean: 8, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [-8, 10], armR: [-8, 10] } })}
    ${under}<g ${t < PAPER_ZOOM ? 'clip-path="url(#below)"' : ''}><g transform="translate(${px} ${py}) rotate(${rot}) scale(${sc})"><rect x="-155" y="-195" width="310" height="390" rx="10" fill="#fff" opacity="0.15" filter="url(#b10)"/>${paperArt()}</g></g>`;
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
      ${txt(830, 58, '#fff', 'TO SEE WHAT THE')}${txt(900, 58, '#fff', 'PAPER SAYS 📄')}
    </g>
    ${t >= CTA2 ? `<g transform="translate(540 1180) scale(${b}) translate(-540 -1180)">
      <g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M540 1040 v-70 M510 1000 l30 -30 l30 30 M490 1010 h-20 v70 h140 v-70 h-20"/></g>
      ${txt(1150, 50, '#fff', 'SEND THIS TO THE FRIEND')}${txt(1212, 50, PINK, "WHO CAN'T SAY NO 🚪")}
    </g>` : ''}`;
}

// ---------- scenes ----------
const S = [HOOK_END, BR1.end, BR2.end, CNT.end, BAL.end, PAP.end, DUR];
const SCENES = [
  { to: S[0], draw: (t, u, d) => {
    const body = t < B1
      ? blur(bedroom(), 0.3) + soft(540, 1050, 380, '#ff5a5a', 0.14) + `<g transform="translate(540 1060) scale(${2.6 + 0.5 * u / B1}) rotate(${Math.sin(t * 2) * 0.6})">${blockedScreen(t)}</g>`
      : doorScene(t, 0);
    return svgDoc(1080, 1920, `${body}${title(t)}${label2}`);
  } },
  { to: S[1], draw: (t, u, d) => svgDoc(1080, 1920, `${doorScene(t, u / d)}${captions(t, [BR1], { quote: ['brooke-1'] })}${label2}`) },
  { to: S[2], draw: (t, u, d) => svgDoc(1080, 1920, `${peep(t, u / d)}${captions(t, [PEEP, BR2], { quote: ['brooke-2'] })}${label2}`) },
  { to: S[3], draw: (t) => svgDoc(1080, 1920, `${count(t)}${captions(t, [CNT])}${label2}`) },
  { to: S[4], draw: (t, u, d) => {
    const w = BAL.words.find(x => x.w === 'thirty-nine').s, pop = easeOutBack((t - w) / 0.35), cw = BAL.words.find(x => x.w === 'chain').s;
    const hot = clamp((t - cw) / 0.3), cx = DX + DW - 56, cy = DY + 372;
    return svgDoc(1080, 1920, `${push(1 + 0.04 * u / d, doorScene(t, 0), 760, 1200)}<rect width="1080" height="1920" fill="#050c1c" opacity="0.45"/>
      ${t >= w ? `<g transform="translate(540 780) scale(${pop}) translate(-540 -780)"><text x="540" y="820" text-anchor="middle" font-family="Inter" font-weight="900" font-size="190" fill="#ff5a5a" stroke="#000" stroke-width="14" style="paint-order:stroke">$39.12</text></g>` : ''}
      ${hot > 0 ? `<circle cx="${cx}" cy="${cy}" r="${40 + 30 * Math.sin(t * 10)}" fill="none" stroke="${PINK}" stroke-width="6" opacity="${hot}"/><circle cx="${cx}" cy="${cy}" r="14" fill="${PINK}" opacity="${hot}" filter="url(#glow)"/>` : ''}
      ${captions(t, [BAL])}${label2}`);
  } },
  { to: S[5], draw: (t, u, d) => svgDoc(1080, 1920, `${push(1 + 0.03 * u / d, paper(t, u / d), 540, 1000)}${t < PAPER_ZOOM + 0.2 ? captions(t, [PAP]) : ''}${label2}`) },
  { to: S[6], draw: (t, u, d) => svgDoc(1080, 1920, `${push(1.03, blur(paper(t, 1), 0.5), 540, 1000)}${endCard(t)}${label2}`) },
];
function frameAt(t) {
  let from = 0;
  for (const s of SCENES) { if (t < s.to) return s.draw(t, t - from, s.to - from); from = s.to; }
  return SCENES[SCENES.length - 1].draw(t, 1, 1);
}

// ---------- audio ----------
function timeline() {
  const v = (c, extra = {}) => ({ file: `${AUD}/${c.name}.mp3`, at: c.at, ...extra });
  const door = 'highpass=f=140,lowpass=f=2400';
  const cry = `vibrato=f=5.5:d=0.18,tremolo=f=5:d=0.2,${door}`;
  const fx = [
    { fx: 'drone', args: [0, S[5], 0.2, 49] },
    ...BANGS.map(b => ({ fx: 'bang', args: [b] })),
    { fx: 'whoosh', args: [B1 - 0.15, 0.35] }, { fx: 'whoosh', args: [S[1] - 0.1, 0.4] }, { fx: 'whoosh', args: [S[2] - 0.1, 0.35] }, { fx: 'whoosh', args: [S[3] - 0.1, 0.3] },
    { fx: 'slide', args: [PAPER_SLIDE] }, { fx: 'whoosh', args: [PAPER_ZOOM - 0.1, 0.35] }, { fx: 'hit', args: [PAPER_ZOOM + 0.1, 48] },
    { fx: 'click', args: [S[2] + 0.2] }, { fx: 'click', args: [BAL.words.find(x => x.w === 'chain').s + 0.1] }, { fx: 'hit', args: [BAL.words.find(x => x.w === 'thirty-nine').s, 55] }, { fx: 'click', args: [CTA.words[0].s + 0.5] },
    ...Array.from({ length: 14 }, (_, i) => ({ fx: 'click', args: [CNT.words[0].s + 0.15 + i * 0.1] })),
  ];
  for (let b = B3 + 0.2; b < S[5] - 1.0; b += 0.62) fx.push({ fx: 'beat', args: [b] });
  return { dur: DUR, voices: [v(HOOK), v(BR1, { filter: cry, gain: 0.95 }), v(PEEP), v(BR2, { filter: cry, gain: 0.95 }), v(CNT), v(BAL), v(PAP), v(CTA)], sfx: fx };
}

const TEST = process.argv.indexOf('--test');
if (TEST > 0) (async () => {
  const out = process.argv[TEST + 1];
  const b = await chromium.launch(), pg = await b.newPage();
  await pg.setViewportSize({ width: 1080, height: 1920 });
  const times = process.env.TIMES ? process.env.TIMES.split(',').map(Number) : SCENES.map((s, i) => (i ? SCENES[i - 1].to : 0) * 0.3 + s.to * 0.7);
  console.log('scenes end', SCENES.map(s => s.to.toFixed(2)).join(' '), '| bangs', BANGS.map(x => x.toFixed(2)).join(' '), '| dur', DUR.toFixed(2));
  for (let i = 0; i < times.length; i++) { await pg.setContent(`<html><body style="margin:0">${frameAt(times[i])}</body></html>`); await pg.screenshot({ path: `${out}/p${i}.png` }); }
  await b.close();
})();
else (async () => {
  if (DUR > 40) throw new Error('over 40 s: ' + DUR);
  const tmp = fs.mkdtempSync(os.tmpdir() + '/ep02-');
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
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-shortest', `${DIR}/ep01-part2-the-door.mp4`]);
  fs.copyFileSync(`${tmp}/mix.wav`, `${AUD}/part2-mix.wav`);
  fs.rmSync(tmp, { recursive: true });
  console.log('rendered ep01-part2-the-door.mp4', DUR.toFixed(2) + 's');
})();
