// Renders the channel's concept art (SVG) to PNG with headless Chromium.
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = process.argv[2];

const C = { navy: '#0F1A33', navy2: '#16264a', blue: '#2F8FE0', red: '#E8202A', pink: '#E0508F', amber: '#F2B544', cyan: '#5CE1F0' };

// Seeded random so renders are repeatable
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const defs = `
<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0"/>
</filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<filter id="glowBig" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="22" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="blur20" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
<filter id="blur60" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
<filter id="white"><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>
<filter id="rough" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="28"/>
</filter>
<linearGradient id="rimLight" x1="0" x2="1" y1="0" y2="0">
  <stop offset="0" stop-color="${C.blue}" stop-opacity="0.55"/>
  <stop offset="0.45" stop-color="${C.blue}" stop-opacity="0"/>
  <stop offset="0.6" stop-color="${C.red}" stop-opacity="0"/>
  <stop offset="1" stop-color="${C.red}" stop-opacity="0.7"/>
</linearGradient>
<radialGradient id="echoBody" cx="0.5" cy="0.35" r="0.7">
  <stop offset="0" stop-color="#b8f6ff"/><stop offset="0.45" stop-color="${C.cyan}"/><stop offset="1" stop-color="#1f6fd6"/>
</radialGradient>`;

// Film grain, vignette and rough print border, laid over every frame
const finish = (w, h) => `
<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.07" style="mix-blend-mode:overlay"/>
<radialGradient id="vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></radialGradient>
<rect width="${w}" height="${h}" fill="url(#vig)"/>
<g filter="url(#rough)"><rect x="-20" y="-20" width="${w + 40}" height="${h + 40}" fill="none" stroke="#05080f" stroke-width="54"/></g>`;

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}${finish(w, h)}</svg>`;

// 7-segment LED digits, the channel's clock motif
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
function led(text, x, y, h, color = C.red) {
  const w = h * 0.55, t = h * 0.12;
  let out = '', cx = x;
  for (const ch of text) {
    if (ch === ':' || ch === '.') {
      const r = t * 0.6;
      out += ch === ':' ? `<circle cx="${cx + t}" cy="${y + h * 0.3}" r="${r}" fill="${color}"/><circle cx="${cx + t}" cy="${y + h * 0.7}" r="${r}" fill="${color}"/>`
        : `<circle cx="${cx + t}" cy="${y + h - r}" r="${r}" fill="${color}"/>`;
      cx += t * 2.6; continue;
    }
    if (ch === ' ') { cx += w * 0.6; continue; }
    const on = SEG[ch] || '';
    const s = {
      a: [cx + t, y, w - 2 * t, t], d: [cx + t, y + h - t, w - 2 * t, t], g: [cx + t, y + h / 2 - t / 2, w - 2 * t, t],
      f: [cx, y + t, t, h / 2 - 1.5 * t], b: [cx + w - t, y + t, t, h / 2 - 1.5 * t],
      e: [cx, y + h / 2 + t / 2, t, h / 2 - 1.5 * t], c: [cx + w - t, y + h / 2 + t / 2, t, h / 2 - 1.5 * t],
    };
    for (const k in s) { const [a, b, c, d] = s[k]; out += `<rect x="${a}" y="${b}" width="${c}" height="${d}" rx="${t / 2}" fill="${color}" opacity="${on.includes(k) ? 1 : 0.05}"/>`; }
    cx += w + t * 1.4;
  }
  return `<g filter="url(#glow)">${out}</g>`;
}

// Dana, front view, local frame 400x900. expr: tired | shocked | hopeful
function danaBody(expr = 'tired') {
  const skin = '#a86b4a', skinD = '#8a533a', hair = '#1c1210', hood = '#6b2433', hoodD = '#4e1824';
  const curls = [];
  for (let i = 0; i < 14; i++) { const a = Math.PI * (0.05 + 0.9 * i / 13); curls.push(`<circle cx="${200 - Math.cos(a) * 112}" cy="${190 - Math.sin(a) * 118}" r="${22 + (i % 3) * 5}" fill="${hair}"/>`); }
  const bun = [[200, 58, 44], [170, 52, 26], [230, 50, 28], [200, 26, 26], [182, 76, 22], [222, 78, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hair}"/>`).join('');
  let eyes, mouth, brows;
  if (expr === 'shocked') {
    eyes = [155, 245].map(x => `<ellipse cx="${x}" cy="215" rx="24" ry="28" fill="#f4efe8"/><circle cx="${x}" cy="217" r="9" fill="#1a1010"/><circle cx="${x + 3}" cy="213" r="3" fill="#fff"/>`).join('');
    mouth = `<ellipse cx="200" cy="290" rx="16" ry="20" fill="#3a1414"/>`;
    brows = `<path d="M128 172 Q155 158 180 170 M220 170 Q245 158 272 172" stroke="${hair}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  } else {
    const lid = expr === 'tired' ? 16 : 8;
    eyes = [155, 245].map(x => `<ellipse cx="${x}" cy="218" rx="24" ry="22" fill="#f4efe8"/><circle cx="${x}" cy="222" r="11" fill="#2a1712"/><circle cx="${x + 4}" cy="218" r="3.5" fill="#fff"/>
      <path d="M${x - 27} ${218 - 24} h54 v${lid + 20} q-27 ${expr === 'tired' ? 4 : -6} -54 0 z" fill="${skin}"/>
      <path d="M${x - 24} ${218 - 24 + lid + 18} q24 ${expr === 'tired' ? 4 : -8} 48 0" stroke="${skinD}" stroke-width="4" fill="none"/>
      <path d="M${x - 20} 246 q20 10 40 0" stroke="#6b3d4a" stroke-width="5" fill="none" opacity="${expr === 'tired' ? 0.8 : 0.35}"/>`).join('');
    mouth = expr === 'tired' ? `<path d="M182 292 q18 -4 36 0" stroke="#5a2a22" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : `<path d="M180 286 q20 16 40 0" stroke="#5a2a22" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    brows = expr === 'tired' ? `<path d="M130 182 Q155 176 180 186 M220 186 Q245 176 270 182" stroke="${hair}" stroke-width="8" fill="none" stroke-linecap="round"/>`
      : `<path d="M130 180 Q155 168 180 176 M220 176 Q245 168 270 180" stroke="${hair}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  }
  return `
  <rect x="135" y="640" width="58" height="230" rx="22" fill="#1d2840"/><rect x="207" y="640" width="58" height="230" rx="22" fill="#1d2840"/>
  <ellipse cx="160" cy="878" rx="46" ry="20" fill="#e8e4dc"/><ellipse cx="240" cy="878" rx="46" ry="20" fill="#e8e4dc"/>
  <path d="M98 400 Q70 420 62 520 L56 640 Q78 652 100 640 L112 470 Z" fill="${hood}"/>
  <path d="M302 400 Q330 420 338 520 L344 640 Q322 652 300 640 L288 470 Z" fill="${hood}"/>
  <circle cx="78" cy="660" r="22" fill="${skin}"/><circle cx="322" cy="660" r="22" fill="${skin}"/>
  <path d="M88 392 Q200 350 312 392 L332 668 Q200 700 68 668 Z" fill="${hood}"/>
  <path d="M130 560 h140 v70 q-70 18 -140 0 z" fill="${hoodD}"/>
  <ellipse cx="200" cy="378" rx="104" ry="34" fill="${hoodD}"/>
  <rect x="180" y="330" width="40" height="50" fill="${skinD}"/>
  <path d="M184 392 v70 M216 392 v66" stroke="#d9cfc4" stroke-width="5" stroke-linecap="round"/>
  <rect x="236" y="440" width="58" height="34" rx="4" fill="#2f9e5b"/><rect x="246" y="452" width="38" height="5" fill="#e8fff0"/><rect x="246" y="462" width="24" height="4" fill="#e8fff0" opacity="0.7"/>
  <ellipse cx="200" cy="170" rx="128" ry="128" fill="${hair}"/>${bun}
  <ellipse cx="86" cy="225" rx="16" ry="24" fill="${skinD}"/><ellipse cx="314" cy="225" rx="16" ry="24" fill="${skinD}"/>
  <circle cx="84" cy="262" r="13" fill="none" stroke="#d8dde6" stroke-width="4"/><circle cx="316" cy="262" r="13" fill="none" stroke="#d8dde6" stroke-width="4"/>
  <ellipse cx="200" cy="215" rx="112" ry="122" fill="${skin}"/>
  ${curls.join('')}
  ${brows}${eyes}
  <path d="M200 236 q-8 22 2 30" stroke="${skinD}" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${mouth}`;
}
let maskN = 0;
// Dana placed in a scene with the blue/red two-tone light from the style bible
function dana(x, y, s, expr) {
  const id = 'dm' + (maskN++);
  const g = `<g transform="translate(${x},${y}) scale(${s})">${danaBody(expr)}</g>`;
  return `<mask id="${id}"><g filter="url(#white)">${g}</g></mask>${g}
  <rect x="${x}" y="${y}" width="${400 * s}" height="${900 * s}" fill="url(#rimLight)" mask="url(#${id})" style="mix-blend-mode:screen"/>
  <rect x="${x}" y="${y + 500 * s}" width="${400 * s}" height="${400 * s}" fill="${C.navy}" opacity="0.35" mask="url(#${id})"/>`;
}

// Echo, the glowing mascot (inner self), sitting cross-legged, local frame centered at 0,0
function echoFigure() {
  const parts = `
  <path d="M-200 300 C-180 250 -90 250 0 270 C90 250 180 250 200 300 C200 350 100 360 0 345 C-100 360 -200 350 -200 300 Z"/>
  <path d="M-70 40 C-110 60 -125 120 -120 200 L-110 290 L110 290 L120 200 C125 120 110 60 70 40 Z"/>
  <path d="M0 -130 C-70 -130 -92 -60 -86 -10 C-80 40 -50 60 0 60 C50 60 80 40 86 -10 C92 -60 70 -130 0 -130 Z"/>`;
  return `
  <ellipse cx="0" cy="330" rx="330" ry="70" fill="${C.cyan}" opacity="0.35" filter="url(#blur20)"/>
  <g fill="${C.cyan}" opacity="0.55" filter="url(#blur20)">${parts}</g>
  <g fill="url(#echoBody)" stroke="#d9fbff" stroke-width="3" opacity="0.92">${parts}</g>
  <path d="M-100 120 C-90 220 -40 270 0 275 C40 270 90 220 100 120" stroke="#9ff2ff" stroke-width="5" fill="none" opacity="0.7"/>
  <path d="M-60 -60 C-40 -100 40 -100 60 -60" stroke="#e6fdff" stroke-width="4" fill="none" opacity="0.6"/>
  <ellipse cx="0" cy="-15" rx="52" ry="56" fill="#1d63c4" opacity="0.55"/>
  <g filter="url(#glow)"><ellipse cx="-20" cy="-15" rx="10" ry="14" fill="#fffbe6"/><ellipse cx="20" cy="-15" rx="10" ry="14" fill="#fffbe6"/></g>`;
}

// ---------- 1. Echo hero (channel mascot) ----------
function echoHero() {
  const W = 1080, H = 1350;
  let crowd = '';
  for (let i = 0; i < 16; i++) {
    const a = Math.PI * (1.05 + 0.9 * i / 15) , r = 430 + (i % 2) * 60;
    const x = 540 + Math.cos(a) * r, y = 900 + Math.sin(a) * 260;
    crowd += `<g opacity="${0.55 + (i % 3) * 0.12}"><ellipse cx="${x}" cy="${y}" rx="${44}" ry="${50}" fill="#1b2d55"/><path d="M${x - 75} ${y + 150} Q${x - 70} ${y + 45} ${x} ${y + 42} Q${x + 70} ${y + 45} ${x + 75} ${y + 150} Z" fill="#162648"/></g>`;
  }
  let tiles = '';
  for (let i = -20; i <= 20; i++) tiles += `<line x1="${540 + i * 40}" y1="860" x2="${540 + i * 260}" y2="${H}" stroke="${C.blue}" stroke-width="1.5" opacity="0.25"/>`;
  for (let j = 0; j < 12; j++) { const y = 860 + Math.pow(j / 11, 1.8) * (H - 860); tiles += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${C.blue}" stroke-width="1.5" opacity="${0.12 + j * 0.02}"/>`; }
  return svg(W, H, `
  <rect width="${W}" height="${H}" fill="${C.navy}"/>
  <radialGradient id="bgGlow" cx="0.5" cy="0.55" r="0.6"><stop offset="0" stop-color="${C.pink}" stop-opacity="0.75"/><stop offset="0.45" stop-color="#5b3aa8" stop-opacity="0.45"/><stop offset="1" stop-color="${C.navy}" stop-opacity="0"/></radialGradient>
  <rect width="${W}" height="${H}" fill="url(#bgGlow)"/>
  <rect y="860" width="${W}" height="${H - 860}" fill="#0b1430" opacity="0.6"/>${tiles}
  ${crowd}
  <g transform="translate(540,640)">${echoFigure()}</g>
  <ellipse cx="540" cy="1000" rx="520" ry="60" fill="#c9d8ff" opacity="0.08" filter="url(#blur20)"/>
  <text x="540" y="210" text-anchor="middle" font-family="Caladea, Liberation Serif, serif" font-size="96" fill="#f3f0ff">Echo</text>
  <text x="540" y="270" text-anchor="middle" font-family="Caladea, Liberation Serif, serif" font-size="38" fill="#e6e2ff" opacity="0.85" font-style="italic">The voice you hear at 2 AM.</text>
  <text x="540" y="1250" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" letter-spacing="6" fill="#cfe9ff" opacity="0.75">2 AM STORIES · CHANNEL MASCOT</text>`);
}

// ---------- 2. Dana character sheet ----------
function danaSheet() {
  const W = 1920, H = 1080;
  const bust = (cx, cy, expr, label) => `
    <clipPath id="c${label}"><circle cx="${cx}" cy="${cy}" r="130"/></clipPath>
    <circle cx="${cx}" cy="${cy}" r="134" fill="none" stroke="${C.red}" stroke-width="3" opacity="0.6" filter="url(#glow)"/>
    <circle cx="${cx}" cy="${cy}" r="130" fill="#13213f"/>
    <g clip-path="url(#c${label})">${dana(cx - 200, cy - 225, 1.0, expr)}</g>
    <text x="${cx}" y="${cy + 180}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" letter-spacing="4" fill="#fff">${label.toUpperCase()}</text>`;
  const note = (x, y, n, t, lx, ly) => `<line x1="${x - 10}" y1="${y - 8}" x2="${lx}" y2="${ly}" stroke="#fff" stroke-width="2" opacity="0.5"/><circle cx="${lx}" cy="${ly}" r="6" fill="${C.amber}"/>
    <text x="${x}" y="${y}" font-family="Inter" font-weight="800" font-size="22" fill="${C.amber}">${n}</text><text x="${x + 34}" y="${y}" font-family="Inter" font-size="22" fill="#e9ecf5">${t}</text>`;
  const sw = [['Navy', C.navy], ['Blue', C.blue], ['Red', C.red], ['Pink', C.pink], ['Amber', C.amber], ['Cyan', C.cyan]]
    .map(([n, c], i) => `<rect x="${1180 + i * 115}" y="930" width="95" height="60" rx="10" fill="${c}" stroke="#ffffff33"/><text x="${1227 + i * 115}" y="1018" text-anchor="middle" font-family="Inter" font-size="16" fill="#cdd3e4">${n}</text>`).join('');
  return svg(W, H, `
  <rect width="${W}" height="${H}" fill="${C.navy}"/>
  <radialGradient id="g1" cx="0.25" cy="0.55" r="0.5"><stop offset="0" stop-color="${C.red}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.navy}" stop-opacity="0"/></radialGradient>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect x="60" y="110" width="22" height="760" fill="${C.blue}" opacity="0.5" filter="url(#blur20)"/>
  <ellipse cx="356" cy="1000" rx="230" ry="30" fill="#000" opacity="0.5" filter="url(#blur8)"/>
  ${dana(160, 120, 0.98, 'tired')}
  ${note(600, 200, '1', 'Curly hair, messy bun', 440, 170)}
  ${note(600, 300, '+', 'Silver hoops, tired eyes', 470, 380)}
  ${note(600, 480, '2', 'Faded maroon hoodie', 480, 640)}
  ${note(600, 400, '3', 'Green name tag', 430, 565)}
  ${bust(1100, 370, 'tired', 'Exhausted')}${bust(1400, 370, 'shocked', 'Shocked')}${bust(1700, 370, 'hopeful', 'Hopeful')}
  <text x="960" y="90" font-family="Caladea, Liberation Serif, serif" font-size="64" fill="#fff">Dana</text>
  <text x="1140" y="90" font-family="Inter" font-size="24" fill="#aab4cc">21 · Community college · Night shift · Ohio</text>
  <text x="960" y="720" font-family="Caladea, Liberation Serif, serif" font-size="34" font-style="italic" fill="#e9e4ff" opacity="0.9">"I was not broke. I was just tired."</text>
  <text x="960" y="790" font-family="Inter" font-size="22" fill="#aab4cc">Light rule: cold blue from the window (left), hot red from the phone (right).</text>
  <text x="1180" y="905" font-family="Inter" font-weight="800" font-size="20" letter-spacing="4" fill="#fff">PALETTE</text>${sw}`);
}

// ---------- 3. World key art ----------
function cityScene(W, H, opts = {}) {
  const hy = H * 0.62;
  let sky = '';
  for (let i = 0; i < 40; i++) {
    const w = 40 + rnd() * 90, h = 80 + rnd() * 260, x = i * (W / 38) - 40;
    sky += `<rect x="${x}" y="${hy - h}" width="${w}" height="${h}" fill="#141f3d"/>`;
    for (let k = 0; k < 10; k++) if (rnd() < 0.5) sky += `<rect x="${x + 6 + rnd() * (w - 14)}" y="${hy - h + 10 + rnd() * (h - 20)}" width="5" height="7" fill="${rnd() < 0.8 ? '#f2d48a' : C.cyan}" opacity="${0.35 + rnd() * 0.5}"/>`;
  }
  // apartment building (Dana's place), one window lit red by a phone
  const ax = W * 0.06, aw = W * 0.24, ay = H * 0.18;
  let apt = `<rect x="${ax}" y="${ay}" width="${aw}" height="${hy - ay + 40}" fill="#101a35"/><rect x="${ax - 10}" y="${ay - 16}" width="${aw + 20}" height="20" fill="#0c142b"/>`;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) {
    const x = ax + 30 + c * (aw - 60) / 3.4, y = ay + 40 + r * (hy - ay - 40) / 7.2, red = r === 3 && c === 2;
    const lit = red || rnd() < 0.3;
    apt += `<rect x="${x}" y="${y}" width="${aw * 0.14}" height="${H * 0.05}" fill="${red ? C.red : lit ? '#e7c27a' : '#1a2647'}" opacity="${red ? 0.95 : lit ? 0.55 : 1}" ${red ? 'filter="url(#glow)"' : ''}/>`;
    if (red) apt += `<rect x="${x}" y="${y}" width="${aw * 0.14}" height="${H * 0.05}" fill="${C.red}" opacity="0.6" filter="url(#blur20)"/>`;
  }
  // gas station with neon canopy and LED price
  const gx = W * 0.5, gw = W * 0.34, gy = H * 0.42;
  const gas = `
  <polygon points="${gx},${gy + 50} ${gx + gw},${gy + 50} ${gx + gw - 40},${hy + 120} ${gx + 40},${hy + 120}" fill="#dfe9ff" opacity="0.10" filter="url(#blur20)"/>
  <rect x="${gx}" y="${gy}" width="${gw}" height="50" fill="#0e1830"/>
  <rect x="${gx}" y="${gy + 44}" width="${gw}" height="6" fill="${C.pink}" filter="url(#glow)"/>
  <rect x="${gx}" y="${gy}" width="${gw}" height="5" fill="${C.pink}" opacity="0.8" filter="url(#glow)"/>
  ${[0.2, 0.5, 0.8].map(f => `<rect x="${gx + gw * f - 8}" y="${gy + 50}" width="16" height="${hy - gy + 40}" fill="#0c1428"/><rect x="${gx + gw * f - 40}" y="${hy - 30}" width="40" height="${H * 0.1}" rx="4" fill="#1b2a4d"/><rect x="${gx + gw * f - 34}" y="${hy - 22}" width="28" height="18" fill="${C.cyan}" opacity="0.6"/>`).join('')}
  <rect x="${gx + gw + 30}" y="${H * 0.22}" width="14" height="${hy - H * 0.22 + 40}" fill="#0c1428"/>
  <rect x="${gx + gw - 70}" y="${H * 0.16}" width="220" height="150" rx="10" fill="#0a1022" stroke="${C.red}" stroke-width="3" filter="url(#glow)"/>
  <text x="${gx + gw + 40}" y="${H * 0.16 + 42}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#fff">GAS</text>
  ${led('3.89', gx + gw - 38, H * 0.16 + 64, 60)}`;
  // street light with Dana's silhouette
  const sx = W * 0.42;
  const figure = `<g transform="translate(${sx + 40},${hy + 70}) scale(${H / 1080})"><ellipse cx="0" cy="-118" rx="16" ry="18" fill="#05070f"/><circle cx="0" cy="-140" r="10" fill="#05070f"/><path d="M-26 -96 Q0 -108 26 -96 L32 -20 L-32 -20 Z" fill="#05070f"/><rect x="-18" y="-22" width="13" height="56" fill="#05070f"/><rect x="5" y="-22" width="13" height="56" fill="#05070f"/></g>`;
  const lamp = `<rect x="${sx}" y="${H * 0.28}" width="10" height="${hy - H * 0.28 + 110}" fill="#0a1022"/><rect x="${sx}" y="${H * 0.28}" width="70" height="8" fill="#0a1022"/>
  <polygon points="${sx + 55},${H * 0.29} ${sx + 75},${H * 0.29} ${sx + 200},${hy + 120} ${sx - 70},${hy + 120}" fill="${C.amber}" opacity="0.14" filter="url(#blur8)"/>
  <ellipse cx="${sx + 65}" cy="${H * 0.295}" rx="18" ry="7" fill="#fff3d0" filter="url(#glow)"/>`;
  // wet road with neon reflections
  const road = `<rect y="${hy + 40}" width="${W}" height="${H - hy}" fill="#0a1124"/>
  <g filter="url(#blur8)" opacity="0.55">
   <rect x="${gx}" y="${hy + 125}" width="${gw}" height="${H * 0.18}" fill="${C.pink}" opacity="0.35"/>
   <rect x="${gx + gw - 70}" y="${hy + 125}" width="220" height="${H * 0.22}" fill="${C.red}" opacity="0.4"/>
   <rect x="${ax + aw * 0.6}" y="${hy + 125}" width="${aw * 0.14}" height="${H * 0.2}" fill="${C.red}" opacity="0.5"/>
   <rect x="${sx}" y="${hy + 125}" width="120" height="${H * 0.25}" fill="${C.amber}" opacity="0.35"/>
  </g>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * W / 8 + 40}" y="${hy + H * 0.16}" width="${W / 18}" height="6" fill="#d9dfe9" opacity="0.18"/>`).join('')}`;
  let rain = '';
  for (let i = 0; i < 380; i++) { const x = rnd() * W, y = rnd() * H, l = 18 + rnd() * 30; rain += `<line x1="${x}" y1="${y}" x2="${x - l * 0.25}" y2="${y + l}" stroke="#c8dcff" stroke-width="1.4" opacity="${0.12 + rnd() * 0.25}"/>`; }
  return `
  <linearGradient id="skyG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#070d1f"/><stop offset="0.7" stop-color="#2a1d52"/><stop offset="1" stop-color="#5a2a6e"/></linearGradient>
  <rect width="${W}" height="${H}" fill="url(#skyG)"/>
  <ellipse cx="${W * 0.7}" cy="${hy}" rx="${W * 0.5}" ry="${H * 0.25}" fill="${C.pink}" opacity="0.25" filter="url(#blur60)"/>
  <g opacity="0.8">${sky}</g>
  <rect y="${hy - 120}" width="${W}" height="180" fill="#3b2c6b" opacity="0.35" filter="url(#blur20)"/>
  ${apt}${gas}${road}${lamp}${figure}
  <rect y="${hy}" width="${W}" height="90" fill="#8fa6e0" opacity="0.08" filter="url(#blur20)"/>
  ${rain}`;
}
function worldArt() {
  const W = 1920, H = 1080;
  return svg(W, H, cityScene(W, H) + `
  <text x="96" y="${H - 96}" font-family="Caladea, Liberation Serif, serif" font-size="40" font-style="italic" fill="#f1ecff">Somewhere in Ohio.</text>
  ${led('2:14', W - 330, 80, 70)}<text x="${W - 110}" y="146" font-family="Inter" font-weight="800" font-size="26" fill="${C.red}">AM</text>`);
}

// ---------- 4. Logo + icon set ----------
const ICONS = {
  Money: `<rect x="-60" y="-36" width="120" height="72" rx="10"/><circle r="18"/><path d="M-44 -20 v40 M44 -20 v40"/>`,
  College: `<path d="M-66 -10 L0 -42 L66 -10 L0 22 Z"/><path d="M-38 4 v30 q38 24 76 0 v-30"/><path d="M66 -10 v40"/>`,
  Gas: `<rect x="-50" y="-50" width="64" height="104" rx="8"/><rect x="-38" y="-38" width="40" height="28" rx="4"/><path d="M14 -24 h18 l14 16 v44 q0 12 -10 12 q-10 0 -10 -12 v-26 h-12"/>`,
  Sleep: `<path d="M18 -52 A54 54 0 1 0 50 34 A44 44 0 0 1 18 -52 Z"/><path d="M28 -38 h22 l-22 24 h22"/>`,
  Rent: `<path d="M-60 0 L0 -50 L60 0"/><path d="M-44 -12 v60 h88 v-60"/><rect x="-14" y="14" width="28" height="34"/>`,
  'Bank alert': `<rect x="-34" y="-58" width="68" height="116" rx="12"/><path d="M0 -26 v28"/><circle cy="20" r="3"/><path d="M-12 -46 h24"/>`,
  Car: `<path d="M-64 18 v-18 l14 -32 h100 l14 32 v18 z"/><path d="M-50 0 h100"/><circle cx="-36" cy="26" r="12"/><circle cx="36" cy="26" r="12"/>`,
  Food: `<path d="M-56 -6 h112 q0 54 -56 54 q-56 0 -56 -54 z"/><path d="M-20 -50 q10 14 0 28 M8 -50 q10 14 0 28"/>`,
};
const iconColors = [C.amber, C.blue, C.red, C.cyan, C.pink, C.red, C.blue, C.amber];
function iconTile(name, x, y, color, size = 220) {
  return `<g transform="translate(${x},${y})">
   <rect x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" rx="36" fill="#111c38" stroke="${color}" stroke-opacity="0.35" stroke-width="2"/>
   <g transform="scale(${size / 220})" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)">${ICONS[name]}</g>
  </g>`;
}
function logo(cx, cy, r) {
  return `<g transform="translate(${cx},${cy})">
   <circle r="${r}" fill="${C.navy}"/><circle r="${r}" fill="none" stroke="${C.red}" stroke-width="${r * 0.03}" filter="url(#glow)"/>
   <circle r="${r * 0.82}" fill="${C.pink}" opacity="0.18" filter="url(#blur20)"/>
   <g transform="translate(0,${r * 0.36}) scale(${r / 900})">${echoFigure()}</g>
   ${led('2:00', -r * 0.43, -r * 0.66, r * 0.3)}
   <text x="0" y="${-r * 0.12}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${r * 0.15}" letter-spacing="${r * 0.02}" fill="#fff"><tspan fill="${C.red}">AM</tspan> STORIES</text>
  </g>`;
}
function iconSheet() {
  const W = 1920, H = 1080;
  const names = Object.keys(ICONS);
  const tiles = names.map((n, i) => {
    const x = 880 + (i % 4) * 260, y = 300 + Math.floor(i / 4) * 340;
    return iconTile(n, x, y, iconColors[i]) + `<text x="${x}" y="${y + 150}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" letter-spacing="3" fill="#dfe5f3">${n.toUpperCase()}</text>`;
  }).join('');
  return svg(W, H, `
  <rect width="${W}" height="${H}" fill="#0b1328"/>
  <circle cx="400" cy="520" r="420" fill="${C.red}" opacity="0.12" filter="url(#blur60)"/>
  ${logo(400, 500, 300)}
  <text x="400" y="910" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" letter-spacing="5" fill="#cfd6ea">CHANNEL AVATAR</text>
  <text x="750" y="110" font-family="Caladea, Liberation Serif, serif" font-size="56" fill="#fff">Story icons</text>
  <text x="750" y="152" font-family="Inter" font-size="22" fill="#9aa6c2">Neon line, glow, one color per topic. Use on thumbnails, playlists and end cards.</text>
  ${tiles}`);
}

// ---------- 5. YouTube banner 2560x1440 ----------
function banner() {
  const W = 2560, H = 1440;
  return svg(W, H, cityScene(W, H) + `
  <rect x="507" y="508" width="1546" height="423" fill="${C.navy}" opacity="0.8" rx="30"/>
  ${logo(760, 720, 170)}
  <text x="1000" y="700" font-family="Caladea, Liberation Serif, serif" font-size="110" fill="#fff">2 AM Stories</text>
  <text x="1006" y="790" font-family="Inter" font-weight="700" font-size="40" letter-spacing="3" fill="#dfe5f3">REAL AMERICAN STORIES · MONEY · COLLEGE · SLEEP</text>`);
}

// ---------- 6. Thumbnail template 1280x720 ----------
function thumbnail() {
  const W = 1280, H = 720;
  return svg(W, H, `
  <rect width="${W}" height="${H}" fill="${C.navy}"/>
  <radialGradient id="tg" cx="0.75" cy="0.5" r="0.6"><stop offset="0" stop-color="${C.red}" stop-opacity="0.6"/><stop offset="1" stop-color="${C.navy}" stop-opacity="0"/></radialGradient>
  <rect width="${W}" height="${H}" fill="url(#tg)"/>
  <rect x="60" y="0" width="40" height="${H}" fill="${C.blue}" opacity="0.4" filter="url(#blur20)"/>
  ${dana(700, 60, 0.95, 'shocked')}
  <g transform="translate(1080,470) rotate(8)"><rect x="-90" y="-160" width="180" height="320" rx="26" fill="#0a0f1e" stroke="#2a3558" stroke-width="6"/>
   <rect x="-76" y="-120" width="152" height="80" rx="12" fill="${C.red}" filter="url(#glow)"/>
   <text x="0" y="-88" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" fill="#fff">OVERDRAFT</text>
   <text x="0" y="-56" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#fff">-$35.00</text></g>
  ${led('2:14', 80, 90, 120)}
  <text x="80" y="390" font-family="Inter" font-weight="900" font-size="104" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="10">$35 AT</text>
  <text x="80" y="500" font-family="Inter" font-weight="900" font-size="104" fill="${C.red}" style="paint-order:stroke" stroke="#000" stroke-width="10">2 AM</text>
  <text x="84" y="590" font-family="Caladea, Liberation Serif, serif" font-size="40" font-style="italic" fill="#f1ecff">Part 1</text>`);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const jobs = [['01-mascot-echo', echoHero], ['02-character-dana', danaSheet], ['03-world-key-art', worldArt], ['04-logo-and-icons', iconSheet], ['05-youtube-banner', banner], ['06-thumbnail-template', thumbnail]];
  for (const [name, fn] of jobs) {
    maskN = 0; seed = 7;
    const s = fn();
    fs.writeFileSync(`${OUT}/${name}.svg`, s);
    const m = s.match(/width="(\d+)" height="(\d+)"/);
    await page.setViewportSize({ width: +m[1], height: +m[2] });
    await page.setContent(`<html><body style="margin:0;background:#000">${s}</body></html>`);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('rendered', name);
  }
  await browser.close();
})();
