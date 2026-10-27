// "Glow" world concept art: glowing stick characters in a dark line-drawn world.
// Usage: node glow.js <outDir> [--video]
const { chromium } = require('playwright');
const fs = require('fs');
const { execFileSync } = require('child_process');
const OUT = process.argv[2];
const VIDEO = process.argv.includes('--video');

const deg = a => a * Math.PI / 180;
const lerp = (a, b, t) => a + (b - a) * t;
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => '#' + hex(a).map((v, i) => Math.round(lerp(v, hex(b)[i], t)).toString(16).padStart(2, '0')).join('');

// Cast. Same skeleton for everyone; head shape, hair, size and color make each one readable.
const CAST = {
  kai:  { name: 'Kai',      role: 'The main character. 22, delivery driver + college', color: '#36b6ff', light: '#e6f8ff', head: 'round',  hair: 'water', size: 1 },
  rosa: { name: 'Rosa',     role: 'Coworker. Always in a hurry, always on fire',        color: '#ff4f7b', light: '#ffe6ee', head: 'round',  hair: 'flame', size: 0.95 },
  mint: { name: 'Mint',     role: 'Roommate. Broke but calm',                           color: '#3fe0a0', light: '#e6fff4', head: 'wide',   hair: 'beanie', size: 0.9 },
  gold: { name: 'Mr. Gold', role: 'Landlord. Steady glow, never dims',                  color: '#ffb52e', light: '#fff4dc', head: 'square', hair: 'none', size: 1.12, tie: true },
  gray: { name: 'The Grays', role: 'Burned-out people. Lost their glow',                color: '#5d6b82', light: '#8e9ab0', head: 'round',  hair: 'none', size: 1, dim: true },
};

const defs = `
<filter id="b4" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="b10" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
<filter id="b26" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="26"/></filter>
<filter id="b60" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="60"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0"/></filter>
<radialGradient id="revealG"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;

const svg = (w, h, body, bg = '#05070d') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs><rect width="${w}" height="${h}" fill="${bg}"/>${body}<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.06" style="mix-blend-mode:overlay"/></svg>`;

// ---------- poses ----------
// Angles in degrees from straight down; positive = toward facing direction.
const STAND = { lean: 0, armL: [8, 10], armR: [-8, 10], legL: [6, -4], legR: [-6, -4], bob: 0 };
function runPose(p, amp = 1) { // p = cycle phase 0..1
  const s = Math.sin(p * Math.PI * 2), c = Math.cos(p * Math.PI * 2);
  return {
    lean: 10 * amp, bob: Math.abs(c) * 14 * amp,
    legL: [38 * s * amp, -(45 + 35 * Math.max(0, -s)) * amp], legR: [-38 * s * amp, -(45 + 35 * Math.max(0, s)) * amp],
    armL: [-45 * s * amp, 70 * amp], armR: [45 * s * amp, 70 * amp],
  };
}
function walkPose(p) {
  const s = Math.sin(p * Math.PI * 2), c = Math.cos(p * Math.PI * 2);
  return { lean: 3, bob: Math.abs(c) * 6, legL: [24 * s, -10 - 22 * Math.max(0, -s)], legR: [-24 * s, -10 - 22 * Math.max(0, s)], armL: [-22 * s, 18], armR: [22 * s, 18] };
}

function limb(x, y, a1, L1, a2, L2) {
  const x1 = x + Math.sin(deg(a1)) * L1, y1 = y + Math.cos(deg(a1)) * L1;
  const x2 = x1 + Math.sin(deg(a1 + a2)) * L2, y2 = y1 + Math.cos(deg(a1 + a2)) * L2;
  return `M${x} ${y} L${x1} ${y1} L${x2} ${y2}`;
}

// Flowing hair: a tapered ribbon that trails behind and waves over time.
function ribbon(hx, hy, t, kind, speed, droop) {
  const N = 14, pts = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    let x, y;
    if (kind === 'flame') {
      x = hx - u * (20 + 50 * speed) + Math.sin(t * 13 - u * 7) * 9 * u;
      y = hy - u * (95 - 30 * speed) + Math.cos(t * 11 - u * 5) * 5 * u;
    } else {
      x = hx - u * (75 + 95 * speed);
      y = hy - u * (70 - 30 * speed) * (1 - droop) + u * u * 60 * droop + Math.sin(t * 6 - u * 6) * 14 * u;
    }
    pts.push([x, y, (kind === 'flame' ? 22 : 40) * Math.pow(1 - u, 0.8) + 2]);
  }
  const L = [], R = [];
  for (let i = 0; i < pts.length; i++) {
    const [x, y, w] = pts[i], [nx, ny] = pts[Math.min(i + 1, N)], [px, py] = pts[Math.max(i - 1, 0)];
    let dx = nx - px, dy = ny - py; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    L.push(`${x - dy * w / 2} ${y + dx * w / 2}`); R.unshift(`${x + dy * w / 2} ${y - dx * w / 2}`);
  }
  return `M${L.join(' L')} L${R.join(' L')} Z`;
}

let gid = 0;
// Draw one character. x,y = feet on the ground. o: {pose, t, face, glow, speed, droop, dir, color}
function character(key, x, y, s, o = {}) {
  const ch = CAST[key], id = 'g' + (gid++);
  const pose = o.pose || STAND, t = o.t || 0, dir = o.dir || 1;
  const glow = (o.glow ?? 1) * (ch.dim ? 0.25 : 1);
  const color = o.color || ch.color, light = o.light || ch.light;
  const S = s * ch.size;
  const hip = [0, -142 - pose.bob];
  const T = 112, lean = pose.lean;
  const neck = [hip[0] + Math.sin(deg(lean)) * T, hip[1] - Math.cos(deg(lean)) * T];
  const sh = [hip[0] + Math.sin(deg(lean)) * T * 0.86, hip[1] - Math.cos(deg(lean)) * T * 0.86];
  const hr = ch.head === 'wide' ? 50 : 45;
  const hc = [neck[0] + Math.sin(deg(lean)) * (hr + 4), neck[1] - Math.cos(deg(lean)) * (hr + 4)];
  const body = [
    `M${hip[0]} ${hip[1]} L${neck[0]} ${neck[1]}`,
    limb(sh[0], sh[1], pose.armL[0], 58, pose.armL[1], 56),
    limb(sh[0], sh[1], pose.armR[0], 58, pose.armR[1], 56),
    limb(hip[0], hip[1], pose.legL[0], 72, pose.legL[1], 72),
    limb(hip[0], hip[1], pose.legR[0], 72, pose.legR[1], 72),
  ].join(' ');
  const headShape = (r, extra = '') => ch.head === 'square'
    ? `<rect x="${hc[0] - r}" y="${hc[1] - r}" width="${2 * r}" height="${2 * r}" rx="${r * 0.35}" ${extra}/>`
    : ch.head === 'wide' ? `<ellipse cx="${hc[0]}" cy="${hc[1]}" rx="${r * 1.08}" ry="${r * 0.92}" ${extra}/>`
    : `<circle cx="${hc[0]}" cy="${hc[1]}" r="${r}" ${extra}/>`;
  let hair = '';
  if (ch.hair === 'water' || ch.hair === 'flame') hair = ribbon(hc[0] - hr * 0.3, hc[1] - hr * 0.75, t, ch.hair, o.speed || 0, o.droop || 0);
  if (ch.hair === 'beanie') hair = `M${hc[0] - hr * 1.02} ${hc[1] - hr * 0.35} Q${hc[0]} ${hc[1] - hr * 1.55} ${hc[0] + hr * 1.02} ${hc[1] - hr * 0.35} Z`;
  const tie = ch.tie ? `<path d="M${neck[0]} ${neck[1] + 4} l-9 14 l9 40 l9 -40 z" fill="${light}" opacity="0.85"/>` : '';

  // face
  const f = o.face || 'happy', ex = 15, fx = hc[0] + 9, fy = hc[1] - 2;
  let eyes = '', mouth = '';
  if (ch.dim) {
    eyes = [-1, 1].map(k => `<ellipse cx="${fx + k * ex}" cy="${fy}" rx="7" ry="5" fill="#0a0d16"/>`).join('');
    mouth = `<path d="M${fx - 8} ${fy + 20} h16" stroke="#0a0d16" stroke-width="4" stroke-linecap="round"/>`;
  } else {
    const ry = f === 'tired' ? 6 : f === 'shocked' ? 16 : 13, py = f === 'tired' ? 2 : 0;
    eyes = [-1, 1].map(k => `<ellipse cx="${fx + k * ex}" cy="${fy}" rx="10.5" ry="${ry}" fill="#fff"/>
      <circle cx="${fx + k * ex + 3}" cy="${fy + py}" r="${f === 'shocked' ? 4.5 : 6}" fill="#0b1426"/>
      <circle cx="${fx + k * ex + 5}" cy="${fy - 4}" r="2" fill="#fff"/>`).join('');
    if (f === 'tired') eyes += [-1, 1].map(k => `<path d="M${fx + k * ex - 12} ${fy - 3} h24" stroke="${mix(color, '#000', 0.35)}" stroke-width="4" stroke-linecap="round"/>`).join('');
    if (f === 'determined') eyes += [-1, 1].map(k => `<path d="M${fx + k * ex - 11} ${fy - 17 - k * 3} L${fx + k * ex + 11} ${fy - 17 + k * 3}" stroke="#0b1426" stroke-width="4" stroke-linecap="round"/>`).join('');
    mouth = f === 'happy' ? `<path d="M${fx - 11} ${fy + 18} q11 12 22 0" stroke="#0b1426" stroke-width="4.5" fill="none" stroke-linecap="round"/>`
      : f === 'tired' ? `<path d="M${fx - 9} ${fy + 22} q9 -5 18 0" stroke="#0b1426" stroke-width="4.5" fill="none" stroke-linecap="round"/>`
      : f === 'shocked' ? `<ellipse cx="${fx}" cy="${fy + 23}" rx="7" ry="9" fill="#0b1426"/>`
      : `<path d="M${fx - 10} ${fy + 20} q10 6 20 0" stroke="#0b1426" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  }

  // floating particles rising from the body
  let parts = '';
  if (!ch.dim) for (let k = 0; k < 12; k++) {
    const ph = (t * 0.35 + k / 12) % 1;
    const px = Math.sin(k * 12.9898) * 70 - ph * (o.speed || 0) * 120, py = -60 - ph * 300 + Math.cos(k * 4.1) * 30;
    parts += `<circle cx="${px}" cy="${py}" r="${2.5 + (k % 3)}" fill="${k % 4 === 0 && o.spark ? o.spark : light}" opacity="${(1 - ph) * glow * 0.9}"/>`;
  }

  const coreStroke = (w, c, extra = '') => `<path d="${body}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  return `<g transform="translate(${x},${y}) scale(${S * dir},${S})">
    <ellipse cx="0" cy="4" rx="${90}" ry="16" fill="${color}" opacity="${0.45 * glow}" filter="url(#b10)"/>
    <g opacity="${0.6 * glow}" filter="url(#b26)">${coreStroke(46, color)}${headShape(hr + 22, `fill="${color}"`)}${hair ? `<path d="${hair}" fill="${color}"/>` : ''}</g>
    <g opacity="${0.95 * glow}" filter="url(#b4)">${coreStroke(24, color)}${headShape(hr + 5, `fill="${color}"`)}${hair ? `<path d="${hair}" fill="${color}"/>` : ''}</g>
    ${hair ? `<path d="${hair}" fill="${mix(color, light, ch.dim ? 0 : 0.25)}" stroke="${light}" stroke-width="2" stroke-opacity="${0.7 * glow}"/>` : ''}
    ${coreStroke(17, mix(color, light, ch.dim ? 0 : 0.15))}
    ${ch.dim ? '' : coreStroke(5, light, `opacity="${0.8 * glow + 0.1}"`)}
    <radialGradient id="${id}" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="${ch.dim ? color : light}"/><stop offset="0.55" stop-color="${mix(color, light, 0.25)}"/><stop offset="1" stop-color="${color}"/></radialGradient>
    ${headShape(hr, `fill="url(#${id})" stroke="${light}" stroke-width="3" stroke-opacity="${0.6 * glow + 0.2}"`)}
    ${ch.hair === 'beanie' ? `<path d="${hair}" fill="${mix(color, '#0b1426', 0.35)}" stroke="${light}" stroke-width="3"/><path d="M${hc[0] - hr * 1.02} ${hc[1] - hr * 0.35} H${hc[0] + hr * 1.02}" stroke="${light}" stroke-width="6" stroke-linecap="round"/>` : ''}
    ${tie}${eyes}${mouth}
    ${parts}
  </g>`;
}

// ---------- the world: thin dim line drawings, revealed only near a glow ----------
const GROUND = 1450;
function room() {
  let s = `<path d="M0 ${GROUND} H1080"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M${i * 260 - 40} ${GROUND + 40 + i * 4} h180" opacity="0.5"/>`;
  // window with blinds
  s += `<rect x="380" y="560" width="320" height="380" rx="6"/>`;
  for (let i = 1; i < 12; i++) s += `<path d="M386 ${560 + i * 31} H694" opacity="0.7"/>`;
  // desk, laptop, lamp, chair
  s += `<path d="M70 1250 H440 M95 1250 V${GROUND} M415 1250 V${GROUND} M95 1320 H415"/>`;
  s += `<path d="M180 1250 L200 1150 H330 L345 1250 M170 1250 H360"/>`;
  s += `<path d="M110 1250 V1110 L160 1070 M140 1060 L190 1100 L170 1080 Z"/>`;
  s += `<path d="M290 1450 V1330 H400 V1450 M300 1330 V1240 Q345 1220 395 1240 V1330"/>`;
  // bed
  s += `<path d="M620 1450 V1320 H1030 V1450 M1030 1320 V1180 Q1030 1160 1010 1160 H990 V1320 M640 1320 Q700 1290 760 1320 Q840 1350 920 1310 Q960 1295 990 1320"/>`;
  s += `<ellipse cx="930" cy="1300" rx="50" ry="18"/>`;
  // shelf, books, clock
  s += `<path d="M760 760 H1010 M780 760 V690 M800 760 V700 M822 760 V680 M845 760 V705"/>`;
  s += `<rect x="900" y="705" width="90" height="50" rx="6"/>`;
  // poster and a door
  s += `<rect x="130" y="620" width="170" height="230" rx="4"/><path d="M150 800 L200 720 L240 770 L265 740 L285 800"/>`;
  return s;
}
function world(cx, cy, color, glow, extraLights = []) {
  const lines = room();
  const lights = [[cx, cy, 520 * (0.55 + 0.45 * glow)], ...extraLights];
  return `
  <mask id="reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920"><rect width="1080" height="1920" fill="#000"/>
    ${lights.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#revealG)"/>`).join('')}</mask>
  <g fill="none" stroke="#1a2236" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${lines}</g>
  <g fill="none" stroke="${mix(color, '#ffffff', 0.35)}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" mask="url(#reveal)">${lines}</g>
  <circle cx="${cx}" cy="${cy}" r="${560 * glow}" fill="${color}" opacity="${0.1 * glow}" filter="url(#b60)"/>
  <g><rect x="905" y="712" width="80" height="36" rx="4" fill="#0a0d16"/><text x="945" y="740" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="28" fill="#ff3b3b" opacity="0.9">2:14</text></g>`;
}

// Shorts UI: caption, energy bar, balance, part label (all inside the safe zones)
function ui({ caption = '', energy = 0.8, balance = '$212.40', color = '#36b6ff', part = 'Part 1' }) {
  const ec = energy > 0.4 ? color : energy > 0.2 ? '#ffb52e' : '#ff3b3b';
  return `
  <g font-family="Inter">
   <text x="90" y="262" font-weight="800" font-size="24" letter-spacing="4" fill="#c9d4ea">ENERGY</text>
   <rect x="90" y="278" width="330" height="26" rx="13" fill="#141b2c" stroke="#2a3550" stroke-width="2"/>
   <rect x="94" y="282" width="${Math.max(0, 322 * energy)}" height="18" rx="9" fill="${ec}"/>
   <rect x="94" y="282" width="${Math.max(0, 322 * energy)}" height="18" rx="9" fill="${ec}" filter="url(#b10)" opacity="0.8"/>
   <text x="990" y="262" text-anchor="end" font-weight="800" font-size="24" letter-spacing="4" fill="#c9d4ea">BALANCE</text>
   <text x="990" y="308" text-anchor="end" font-weight="900" font-size="40" fill="${energy > 0.3 ? '#ffffff' : '#ff3b3b'}">${balance}</text>
   ${caption ? `<text x="540" y="470" text-anchor="middle" font-weight="900" font-size="66" fill="#fff" stroke="#000" stroke-width="10" style="paint-order:stroke">${caption}</text>` : ''}
   <text x="540" y="1610" text-anchor="middle" font-weight="700" font-size="44" fill="#fff" opacity="0.9">${part}</text>
  </g>`;
}

// ---------- still images ----------
function hero() {
  gid = 0; const x = 560;
  return svg(1080, 1920, world(x, GROUND - 230, CAST.kai.color, 1) +
    character('kai', x, GROUND, 1.35, { t: 1.2, face: 'happy', pose: { ...STAND, armR: [-30, 40], armL: [25, 30] } }) +
    ui({ caption: 'HIS GLOW IS HIS ENERGY.' }));
}
function cast() {
  gid = 0; const W = 1920, H = 1080, G = 820;
  const keys = ['gray', 'mint', 'kai', 'rosa', 'gold'];
  const xs = [230, 600, 960, 1320, 1690];
  let b = `<path d="M0 ${G} H${W}" stroke="#1a2236" stroke-width="3"/>`;
  keys.forEach((k, i) => {
    const c = CAST[k];
    b += `<circle cx="${xs[i]}" cy="${G - 200}" r="300" fill="${c.color}" opacity="${c.dim ? 0.03 : 0.08}" filter="url(#b60)"/>`;
    if (k === 'gray') b += character('gray', xs[i] - 70, G, 0.95, { face: 'tired', pose: { ...STAND, lean: -4 }, dir: 1 }) + character('gray', xs[i] + 80, G, 0.9, { pose: { ...STAND, lean: 6 }, dir: -1 });
    else b += character(k, xs[i], G, k === 'kai' ? 1.3 : 1.1, { t: 1 + i, face: k === 'gold' ? 'neutral' : k === 'rosa' ? 'determined' : 'happy', dir: i > 2 ? -1 : 1 });
    b += `<text x="${xs[i]}" y="${G + 80}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${k === 'kai' ? 46 : 36}" fill="${c.dim ? '#8e9ab0' : c.color}">${c.name.toUpperCase()}</text>
      <text x="${xs[i]}" y="${G + 120}" text-anchor="middle" font-family="Inter" font-size="20" fill="#9aa6c2">${c.role.split('. ')[0]}</text>
      <text x="${xs[i]}" y="${G + 148}" text-anchor="middle" font-family="Inter" font-size="20" fill="#6f7b96">${c.role.split('. ')[1] || ''}</text>`;
  });
  b += `<text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">THE CAST</text>
  <text x="80" y="155" font-family="Inter" font-size="24" fill="#9aa6c2">Same skeleton for everyone. Color, head shape and hair tell them apart in one second.</text>`;
  return svg(W, H, b);
}
function states() {
  gid = 0; const W = 1920, H = 1080, G = 800;
  const S = [
    { label: 'FULL', sub: 'After 8 hours of sleep', glow: 1, face: 'happy', energy: 1 },
    { label: 'TIRED', sub: 'Double shift, no sleep', glow: 0.35, face: 'tired', droop: 1, color: '#4a6f95', energy: 0.25, pose: { ...STAND, lean: 8, armL: [4, 0], armR: [-4, 0] } },
    { label: 'STRESSED', sub: 'Overdraft alert at 2 AM', glow: 0.8, face: 'shocked', color: '#ff4060', light: '#ffe0e6', energy: 0.4, pose: { ...STAND, armL: [105, 35], armR: [-105, -35] } },
    { label: 'HOPE', sub: 'A small win', glow: 1.2, face: 'determined', spark: '#ffd36b', energy: 0.7, pose: { ...STAND, armL: [120, 45], armR: [-15, 20] } },
  ];
  let b = '';
  S.forEach((st, i) => {
    const x = 260 + i * 470, c = st.color || CAST.kai.color;
    b += `<circle cx="${x}" cy="${G - 200}" r="320" fill="${c}" opacity="${0.1 * st.glow}" filter="url(#b60)"/>`;
    b += character('kai', x, G, 1.15, { t: 2 + i, face: st.face, glow: st.glow, droop: st.droop, color: st.color, light: st.light, spark: st.spark, pose: st.pose });
    b += `<rect x="${x - 120}" y="${G + 50}" width="240" height="14" rx="7" fill="#141b2c"/><rect x="${x - 120}" y="${G + 50}" width="${240 * st.energy}" height="14" rx="7" fill="${c}"/>
      <text x="${x}" y="${G + 120}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${c}">${st.label}</text>
      <text x="${x}" y="${G + 160}" text-anchor="middle" font-family="Inter" font-size="22" fill="#9aa6c2">${st.sub}</text>`;
  });
  b += `<text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">THE GLOW = THE STORY</text>
  <text x="80" y="155" font-family="Inter" font-size="24" fill="#9aa6c2">Sleep and small wins refill it. Bills, debt and stress drain it. Viewers read the mood without words.</text>`;
  return svg(W, H, b);
}
function motion() {
  gid = 0; const W = 1920, H = 1080, G = 780;
  let b = `<path d="M0 ${G} H${W}" stroke="#1a2236" stroke-width="3"/>`;
  for (let i = 0; i < 7; i++) {
    const x = 200 + i * 250, p = i / 7;
    b += `<g opacity="${0.35 + 0.65 * (i / 6)}">${character('kai', x, G, 1.05, { t: i * 0.25, pose: runPose(p), speed: 1, face: 'determined' })}</g>`;
  }
  b += `<text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">MOTION: RUN CYCLE</text>
  <text x="80" y="155" font-family="Inter" font-size="24" fill="#9aa6c2">Hair flows back with speed, particles trail, the floor and walls light up as he passes (like Fireboy &amp; Watergirl).</text>
  <text x="80" y="${G + 120}" font-family="Inter" font-size="24" fill="#9aa6c2">Lean forward 10°, arms opposite legs, knees fold on the back swing, body bobs twice per cycle.</text>`;
  return svg(W, H, b);
}

// ---------- 7-second motion test (9:16) ----------
function videoFrame(t) {
  gid = 0;
  const walkEnd = 4, ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  const x = lerp(140, 560, ease(t / walkEnd));
  const moving = t < walkEnd;
  const drain = ease((t - 4.4) / 1.6); // after stopping, the bill drains him
  let glow = lerp(1, 0.32, drain);
  if (drain > 0 && drain < 1 && Math.sin(t * 47) > 0.55) glow *= 0.6; // flicker
  const color = mix(CAST.kai.color, '#4a6f95', drain);
  const pose = moving ? walkPose((t * 1.1) % 1) : { ...STAND, lean: 8 * drain, armL: [8 - 4 * drain, 10], armR: [-8 + 4 * drain, 10] };
  const caption = t < 2 ? 'THIS IS KAI.' : t < 4.2 ? 'HIS GLOW IS HIS ENERGY.' : 'BILLS DRAIN IT.';
  const balance = t < 4.4 ? '$212.40' : '$' + lerp(212.4, 4.12, drain).toFixed(2);
  return svg(1080, 1920, world(x, GROUND - 230, color, glow) +
    character('kai', x, GROUND, 1.35, { t, pose, speed: moving ? 0.55 : 0, droop: drain, glow, color, face: drain > 0.3 ? 'tired' : 'happy' }) +
    ui({ caption, energy: lerp(0.85, 0.12, drain), balance, color }));
}

module.exports = { character, CAST, STAND, walkPose, runPose, mix, lerp, defs, ui };

if (require.main === module) (async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const shot = async (name, s) => {
    const m = s.match(/width="(\d+)" height="(\d+)"/);
    await page.setViewportSize({ width: +m[1], height: +m[2] });
    await page.setContent(`<html><body style="margin:0;background:#000">${s}</body></html>`);
    await page.screenshot({ path: name });
  };
  for (const [n, fn] of [['01-kai-hero', hero], ['02-cast', cast], ['03-glow-states', states], ['04-motion-run-cycle', motion]]) {
    await shot(`${OUT}/${n}.png`, fn()); console.log('rendered', n);
  }
  if (VIDEO) {
    const dir = fs.mkdtempSync(require('os').tmpdir() + '/glowframes-');
    const FPS = 30, N = 7 * FPS;
    await page.setViewportSize({ width: 1080, height: 1920 });
    await page.setContent(`<html><body style="margin:0;background:#000"><div id="r"></div></body></html>`);
    for (let i = 0; i < N; i++) {
      await page.evaluate(s => { document.getElementById('r').innerHTML = s; }, videoFrame(i / FPS));
      await page.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.png` });
    }
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', `${dir}/f%04d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', `${OUT}/05-kai-motion-test.mp4`]);
    fs.rmSync(dir, { recursive: true });
    console.log('rendered video');
  }
  await browser.close();
})();
