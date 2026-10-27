// "Glow" world v2: a calm neon line city (home, gas station, market, diner, bank),
// realistic explainer props, and a 9:16 motion test.
// Usage: node world.js <outDir> [--video]
const { chromium } = require('playwright');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { character, STAND, walkPose, mix, lerp, defs: charDefs } = require('./glow.js');

const OUT = process.argv[2];
const VIDEO = process.argv.includes('--video');

// One soft accent per place. Kai's blue stays the brightest thing on screen.
const P = {
  bg0: '#060912', bg1: '#0c1326', fill: '#090e1b', line: '#24314f', lineFar: '#161f36',
  warm: '#f5c06b', teal: '#4fd1c5', pink: '#f08bb4', red: '#ff5a5a', lav: '#9b8cff', white: '#dbe4f5',
};
const G = 1450; // sidewalk level
const smooth = u => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);

const defs = charDefs + `
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="neon" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
<linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${P.bg0}"/><stop offset="1" stop-color="${P.bg1}"/></linearGradient>
<linearGradient id="glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#16213d"/><stop offset="1" stop-color="#0a1020"/></linearGradient>
<linearGradient id="cone" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${P.warm}" stop-opacity="0.22"/><stop offset="1" stop-color="${P.warm}" stop-opacity="0"/></linearGradient>
<linearGradient id="coneW" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e8f0ff" stop-opacity="0.16"/><stop offset="1" stop-color="#e8f0ff" stop-opacity="0"/></linearGradient>`;

// 7-segment digits for clocks, prices and pump displays
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
function led(text, x, y, h, color) {
  const w = h * 0.55, t = h * 0.13;
  let out = '', cx = x;
  for (const ch of text) {
    if (ch === ':' || ch === '.') {
      const r = t * 0.6;
      out += ch === ':' ? `<circle cx="${cx + t}" cy="${y + h * 0.3}" r="${r}"/><circle cx="${cx + t}" cy="${y + h * 0.7}" r="${r}"/>` : `<circle cx="${cx + t}" cy="${y + h - r}" r="${r}"/>`;
      cx += t * 2.6; continue;
    }
    const on = SEG[ch] || '';
    const s = { a: [cx + t, y, w - 2 * t, t], d: [cx + t, y + h - t, w - 2 * t, t], g: [cx + t, y + h / 2 - t / 2, w - 2 * t, t],
      f: [cx, y + t, t, h / 2 - 1.5 * t], b: [cx + w - t, y + t, t, h / 2 - 1.5 * t], e: [cx, y + h / 2 + t / 2, t, h / 2 - 1.5 * t], c: [cx + w - t, y + h / 2 + t / 2, t, h / 2 - 1.5 * t] };
    for (const k in s) { const [a, b, c, d] = s[k]; out += `<rect x="${a}" y="${b}" width="${c}" height="${d}" rx="${t / 2}" opacity="${on.includes(k) ? 1 : 0.07}"/>`; }
    cx += w + t * 1.4;
  }
  return `<g fill="${color}" filter="url(#glow)">${out}</g>`;
}

// ---------------- world geometry ----------------
// Items: fill (dark solid shapes), dim (structure lines), acc (soft neon accents),
// pulse (outlines that carry a traveling light), raw (signs and text).
const R = (x, y, w, h) => `M${x} ${y} h${w} v${h} h${-w} Z`;
function buildStreet() {
  const W = { fill: [], dim: [], acc: [], pulse: [], raw: [], lights: [] };
  const dim = (d, w = 2.5) => W.dim.push({ d, w });
  const acc = (d, color, w = 3) => W.acc.push({ d, color, w });
  const box = (x, y, w, h) => { W.fill.push(R(x, y, w, h)); W.pulse.push(R(x, y, w, h)); dim(R(x, y, w, h), 3); };

  // HOME: three-story walk-up, Kai's window lit
  { const x = 60, w = 760, h = 820, y = G - h;
    box(x, y, w, h); dim(`M${x - 20} ${y} h${w + 40} M${x - 10} ${y + 22} h${w + 20}`);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      if (r === 2 && (c === 1 || c === 2)) continue;
      const wx = x + 60 + c * 175, wy = y + 70 + r * 230, lit = r === 1 && c === 2;
      if (lit) W.raw.push({ svg: `<rect x="${wx}" y="${wy}" width="110" height="150" fill="${P.warm}" opacity="0.18"/>`, x: wx });
      (lit ? acc : dim)(R(wx, wy, 110, 150) + ` M${wx + 55} ${wy} v150 M${wx - 10} ${wy + 160} h130`, P.warm, 2.5);
    }
    const dx = x + w / 2 - 70;
    dim(R(dx, G - 240, 140, 240) + ` M${dx + 70} ${G - 240} v240 M${dx - 30} ${G - 262} h200`);
    dim(`M${dx - 40} ${G} v-14 h220 v14`);
    acc(`M${dx + 170} ${G - 300} h40 v40 h-40 Z`, P.teal, 2.5);
    W.raw.push({ svg: `<text x="${dx + 190}" y="${G - 272}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="${P.teal}">214</text>`, x: dx, sign: P.teal });
    W.lights.push({ x: dx + 70, y: G - 270, r: 120, color: P.warm });
    W.raw.push({ svg: `<circle cx="${dx + 70}" cy="${G - 275}" r="7" fill="${P.warm}" filter="url(#glow)"/>`, x: dx });
  }
  // street lamp
  { const x = 900;
    dim(`M${x} ${G} V${G - 620} q0 -30 30 -30 h70`, 4);
    W.raw.push({ svg: `<polygon points="${x + 85},${G - 640} ${x + 115},${G - 640} ${x + 260},${G + 20} ${x - 60},${G + 20}" fill="url(#cone)"/><ellipse cx="${x + 100}" cy="${G - 645}" rx="22" ry="7" fill="#fff1cf" filter="url(#glow)"/>`, x });
  }
  // GAS STATION: canopy, two pumps, price sign
  { const x = 1080, cy = G - 430;
    W.fill.push(R(x + 40, cy, 700, 60)); acc(R(x + 40, cy, 700, 60), P.pink, 3); W.pulse.push(R(x + 40, cy, 700, 60));
    W.raw.push({ svg: `<polygon points="${x + 60},${cy + 60} ${x + 720},${cy + 60} ${x + 760},${G} ${x + 20},${G}" fill="url(#coneW)"/>`, x });
    dim(`M${x + 160} ${cy + 60} V${G} M${x + 620} ${cy + 60} V${G}`, 5);
    for (const px of [x + 270, x + 470]) {
      W.fill.push(R(px, G - 170, 80, 170)); dim(R(px, G - 170, 80, 170) + ` M${px + 80} ${G - 120} q30 0 30 40 v60`);
      acc(R(px + 14, G - 150, 52, 32), P.teal, 2);
    }
    const sx = x + 830;
    dim(`M${sx} ${G} V${G - 420}`, 6);
    W.fill.push(R(sx - 120, G - 640, 240, 220)); dim(R(sx - 120, G - 640, 240, 220), 3); W.pulse.push(R(sx - 120, G - 640, 240, 220));
    W.raw.push({ svg: `<text x="${sx}" y="${G - 590}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" letter-spacing="6" fill="${P.white}">GAS</text>${led('3.89', sx - 92, G - 560, 76, P.red)}`, x: sx, sign: P.red });
  }
  // 24/7 MARKET: glass front, sliding doors, shelves inside
  { const x = 2080, w = 700, h = 540, y = G - h;
    box(x, y, w, h);
    W.raw.push({ svg: `<rect x="${x + 40}" y="${y + 150}" width="${w - 80}" height="${h - 150}" fill="${P.teal}" opacity="0.06"/>`, x });
    dim(R(x + 40, y + 150, w - 80, h - 150) + ` M${x + 250} ${y + 150} V${G} M${x + 450} ${y + 150} V${G} M${x + 350} ${y + 290} V${G}`);
    dim(`M${x + 60} ${y + 260} h170 M${x + 60} ${y + 330} h170 M${x + 470} ${y + 260} h170 M${x + 470} ${y + 330} h170`, 2);
    acc(R(x + 120, y + 40, w - 240, 70), P.teal, 3);
    W.raw.push({ svg: `<text x="${x + w / 2}" y="${y + 90}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" letter-spacing="5" fill="${P.teal}">24/7 MARKET</text>`, x, sign: P.teal });
    acc(`M${x + 560} ${y + 180} h70 v34 h-70 Z`, P.warm, 2);
    W.raw.push({ svg: `<text x="${x + 595}" y="${y + 204}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="18" fill="${P.warm}">OPEN</text>`, x, sign: P.warm });
    W.lights.push({ x: x + w / 2, y: G - 150, r: 300, color: P.teal });
    // shopping cart
    const cx = x + w + 30;
    dim(`M${cx} ${G - 90} h14 l14 60 h60 l12 -45 h-80 M${cx + 34} ${G - 50} h58`, 2.5);
    W.dim.push({ d: `M${cx + 40} ${G - 12} a8 8 0 1 0 0.1 0 M${cx + 84} ${G - 12} a8 8 0 1 0 0.1 0`, w: 2.5 });
  }
  // tree
  { const x = 2920; dim(`M${x} ${G} V${G - 200}`, 4); dim(`M${x} ${G - 320} m-90 0 a90 90 0 1 0 180 0 a90 90 0 1 0 -180 0`, 2.5); }
  // DINER: retro rounded roof, booths in the window, coffee cup sign
  { const x = 3060, w = 700, h = 480, y = G - h;
    const d = `M${x} ${G} V${y + 60} q0 -60 60 -60 h${w - 120} q60 0 60 60 V${G} Z`;
    W.fill.push(d); dim(d, 3); W.pulse.push(d);
    W.raw.push({ svg: `<rect x="${x + 40}" y="${y + 170}" width="460" height="200" fill="${P.pink}" opacity="0.06"/>`, x });
    dim(R(x + 40, y + 170, 460, 200) + ` M${x + 193} ${y + 170} v200 M${x + 347} ${y + 170} v200`);
    for (const bx of [x + 70, x + 223, x + 377]) dim(`M${bx} ${y + 370} v-80 M${bx + 30} ${y + 310} h40 M${bx + 50} ${y + 310} v60 M${bx + 100} ${y + 370} v-80`, 2);
    dim(R(x + 560, y + 230, 100, 250) + ` M${x + 640} ${y + 360} h-10`);
    W.raw.push({ svg: `<text x="${x + 270}" y="${y + 120}" text-anchor="middle" font-family="Caladea, Liberation Serif, serif" font-style="italic" font-weight="700" font-size="96" fill="${P.pink}">Diner</text>`, x, sign: P.pink });
    acc(`M${x + 560} ${y + 70} h80 v50 q0 30 -40 30 q-40 0 -40 -30 Z M${x + 640} ${y + 85} q25 0 25 18 q0 18 -25 18`, P.warm, 3);
    acc(`M${x + 585} ${y + 55} q-8 -15 0 -30 M${x + 610} ${y + 55} q-8 -15 0 -30`, P.warm, 2.5);
    W.lights.push({ x: x + 270, y: G - 200, r: 280, color: P.pink });
  }
  // BANK: columns, ATM
  { const x = 3880, w = 640, h = 660, y = G - h;
    box(x, y, w, h); dim(`M${x - 20} ${y} h${w + 40} M${x - 20} ${y + 120} h${w + 40}`);
    for (let i = 0; i < 4; i++) dim(`M${x + 70 + i * 150} ${y + 140} V${G - 30} M${x + 110 + i * 150} ${y + 140} V${G - 30}`, 2.5);
    dim(`M${x - 20} ${G} v-30 h${w + 40} v30`);
    W.raw.push({ svg: `<text x="${x + w / 2}" y="${y + 82}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" letter-spacing="18" fill="${P.lav}">BANK</text>`, x, sign: P.lav });
    const ax = x + w - 150;
    W.fill.push(R(ax, G - 330, 110, 300)); dim(R(ax, G - 330, 110, 300));
    acc(R(ax + 15, G - 300, 80, 60), P.lav, 2.5); dim(`M${ax + 25} ${G - 210} h60 M${ax + 25} ${G - 190} h60`, 2);
  }
  // street: sidewalk, curb, lanes, a parked car
  dim(`M-200 ${G} H4800`, 3); dim(`M-200 ${G + 40} H4800`, 2.5); dim(`M-200 ${G + 330} H4800`, 2);
  for (let i = 0; i < 26; i++) W.dim.push({ d: `M${i * 200 - 100} ${G + 190} h100`, w: 3, faint: true });
  { const x = 3300, y = G + 150;
    const d = `M${x} ${y} v-40 l30 -10 l50 -50 h170 l60 50 l50 10 v40 Z`;
    W.fill.push(d); dim(d, 3); dim(`M${x + 90} ${y - 95} l-36 45 h120 v-45 M${x + 180} ${y - 95} v45 h90 l-46 -45`, 2);
    W.dim.push({ d: `M${x + 70} ${y} a24 24 0 1 0 0.1 0 M${x + 290} ${y} a24 24 0 1 0 0.1 0`, w: 3 });
    acc(`M${x + 355} ${y - 42} h10`, P.warm, 5);
  }
  return W;
}

// distant skyline with a college clock tower (parallax layer)
function skyline() {
  let s = '', x = -300, seed = 3;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  while (x < 4200) {
    const w = 120 + rnd() * 160, h = 260 + rnd() * 420;
    s += `<path d="${R(x, G - h, w, h)}"/>`;
    x += w + 20 + rnd() * 40;
  }
  s += `<path d="M1700 ${G} V${G - 840} h120 V${G} M1700 ${G - 840} l60 -90 l60 90 M1760 ${G - 780} m-32 0 a32 32 0 1 0 64 0 a32 32 0 1 0 -64 0"/>`;
  return `<g fill="#080d1a" stroke="${P.lineFar}" stroke-width="2">${s}</g>`;
}

const STREET = buildStreet();

// Render the street. o: { camX, s (scale), t, draw (0..1 draw-on), power (0..1 pulse strength), signsOn(i,t) }
function street(o) {
  const { camX = 0, s = 1, t = 0, draw = 1, power = 1 } = o;
  const W = STREET;
  const dash = draw < 1 ? `stroke-dasharray="1000" stroke-dashoffset="${1000 * (1 - draw)}"` : '';
  const pl = 'pathLength="1000"';
  const signOn = i => o.signsOn ? o.signsOn(i, t) : 1;
  let signI = 0;
  const raws = W.raw.map(r => {
    const on = r.sign ? signOn(signI++) : draw;
    return `<g opacity="${on}">${r.svg}</g>`;
  }).join('');
  const pulses = W.pulse.map((d, i) => {
    const off = -((t * 90 * (0.4 + power * 0.6) + i * 211) % 1000);
    return `<path d="${d}" ${pl} stroke-dasharray="26 974" stroke-dashoffset="${off}"/>`;
  }).join('');
  return `<g transform="translate(${-camX * s},${G * (1 - s)}) scale(${s})">
    <g transform="translate(${camX * 0.45},${G * 0.04}) scale(0.96)" opacity="${0.4 + 0.6 * draw}">${skyline()}</g>
    ${W.lights.map(l => `<circle cx="${l.x}" cy="${l.y}" r="${l.r}" fill="${l.color}" opacity="${0.07 * draw}" filter="url(#b60)"/>`).join('')}
    <g fill="${P.fill}">${W.fill.map(d => `<path d="${d}"/>`).join('')}</g>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${W.dim.map(l => `<path d="${l.d}" ${pl} ${dash} stroke="${P.line}" stroke-width="${l.w}" opacity="${l.faint ? 0.6 : 1}"/>`).join('')}
      <g filter="url(#neon)" opacity="${0.55 * draw}">${W.acc.map(l => `<path d="${l.d}" stroke="${l.color}" stroke-width="${l.w * 3}"/>`).join('')}</g>
      ${W.acc.map(l => `<path d="${l.d}" ${pl} ${dash} stroke="${l.color}" stroke-width="${l.w}"/>`).join('')}
      <g stroke="#cfe3ff" stroke-width="3" opacity="${0.55 * power * draw}">${pulses}</g>
      <g stroke="#cfe3ff" stroke-width="10" opacity="${0.25 * power * draw}" filter="url(#b10)">${pulses}</g>
    </g>
    ${raws}
    <rect x="-400" y="${G + 340}" width="5600" height="600" fill="${P.bg0}" opacity="0.5"/>
  </g>`;
}

const svgDoc = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs><rect width="${w}" height="${h}" fill="url(#sky)"/>${body}</svg>`;
const moon = (x, y, k = 1) => `<circle cx="${x}" cy="${y}" r="${90 * k}" fill="#cfd9ff" opacity="0.08" filter="url(#b26)"/><circle cx="${x}" cy="${y}" r="${26 * k}" fill="#e3e9ff" opacity="0.55"/>`;

// Shorts caption + UI, kept inside the safe zones
function hud({ caption = '', energy = 0.8, balance = '$212.40', part = 'Part 1' }) {
  const ec = energy > 0.4 ? '#36b6ff' : energy > 0.2 ? P.warm : P.red;
  return `<g font-family="Inter">
    <text x="90" y="262" font-weight="800" font-size="22" letter-spacing="4" fill="#9fb0cf">ENERGY</text>
    <rect x="90" y="278" width="300" height="20" rx="10" fill="#0f1628" stroke="#24314f" stroke-width="2"/>
    <rect x="93" y="281" width="${294 * energy}" height="14" rx="7" fill="${ec}"/>
    <text x="990" y="262" text-anchor="end" font-weight="800" font-size="22" letter-spacing="4" fill="#9fb0cf">BALANCE</text>
    <text x="990" y="304" text-anchor="end" font-weight="900" font-size="38" fill="${energy > 0.3 ? '#fff' : P.red}">${balance}</text>
    ${caption ? `<text x="540" y="470" text-anchor="middle" font-weight="900" font-size="62" fill="#fff" stroke="#000" stroke-width="10" style="paint-order:stroke">${caption}</text>` : ''}
    <text x="540" y="1640" text-anchor="middle" font-weight="700" font-size="40" fill="#fff" opacity="0.85">${part}</text>
  </g>`;
}

// ---------------- realistic props ----------------
const outline = (d, color) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="10" opacity="0.35" filter="url(#neon)"/><path d="${d}" fill="url(#glass)" stroke="${P.white}" stroke-width="2.5"/>`;
const rr = (x, y, w, h, r) => `M${x + r} ${y} h${w - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${h - 2 * r} a${r} ${r} 0 0 1 ${-r} ${r} h${-(w - 2 * r)} a${r} ${r} 0 0 1 ${-r} ${-r} v${-(h - 2 * r)} a${r} ${r} 0 0 1 ${r} ${-r} Z`;
const PROPS = {
  'PHONE': (s = 1, note = { title: 'Bank', body: 'Overdraft fee', amount: '-$35.00' }) => `<g transform="scale(${s})">
    ${outline(rr(-80, -165, 160, 330, 30), '#36b6ff')}
    <rect x="82" y="-110" width="4" height="50" rx="2" fill="${P.white}"/><rect x="-86" y="-120" width="4" height="30" rx="2" fill="${P.white}"/><rect x="-86" y="-80" width="4" height="30" rx="2" fill="${P.white}"/>
    <path d="${rr(-72, -157, 144, 314, 24)}" fill="#0b1328"/>
    <rect x="-24" y="-148" width="48" height="14" rx="7" fill="#000"/>
    <text x="0" y="-92" text-anchor="middle" font-family="Inter" font-size="13" fill="#c9d4ea">Tuesday, October 27</text>
    <text x="0" y="-38" text-anchor="middle" font-family="Inter" font-weight="300" font-size="56" fill="#fff">2:14</text>
    <path d="${rr(-64, -10, 128, 62, 12)}" fill="#ffffff" opacity="0.13"/>
    <path d="${rr(-56, 0, 22, 22, 6)}" fill="${P.red}"/><text x="-45" y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="14" fill="#fff">$</text>
    <text x="-26" y="9" font-family="Inter" font-weight="800" font-size="11" fill="#fff">${note.title}</text>
    <text x="-26" y="24" font-family="Inter" font-size="10" fill="#e8eefb">${note.body}</text>
    <text x="-26" y="40" font-family="Inter" font-weight="900" font-size="14" fill="#ff8a8a">${note.amount}</text>
    <rect x="-40" y="146" width="80" height="4" rx="2" fill="#fff" opacity="0.7"/>
    <path d="M-60 -150 L20 -150 L-60 60 Z" fill="#fff" opacity="0.04"/>
  </g>`,
  'ALARM CLOCK': () => `${outline(rr(-130, -70, 260, 140, 26), P.red)}
    <path d="${rr(-110, -50, 220, 100, 12)}" fill="#05070d"/>${led('6:00', -92, -32, 64, P.red)}
    <text x="96" y="40" text-anchor="end" font-family="Inter" font-weight="800" font-size="12" fill="${P.red}">AM</text>
    <path d="M-100 70 l-10 20 M100 70 l10 20" stroke="${P.white}" stroke-width="3" stroke-linecap="round"/>`,
  'WALL CLOCK': () => {
    let ticks = '';
    for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 104 : 94; ticks += `<path d="M${Math.sin(a) * r1} ${-Math.cos(a) * r1} L${Math.sin(a) * 112} ${-Math.cos(a) * 112}" stroke-width="${i % 5 ? 1.5 : 4}"/>`; }
    const hand = (deg, len, w, c) => `<path d="M0 0 L${Math.sin(deg * Math.PI / 180) * len} ${-Math.cos(deg * Math.PI / 180) * len}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
    return `<circle r="132" fill="none" stroke="${P.warm}" stroke-width="10" opacity="0.3" filter="url(#neon)"/><circle r="128" fill="url(#glass)" stroke="${P.white}" stroke-width="3"/>
      <g stroke="${P.white}">${ticks}</g>${hand(2 * 30 + 14 * 0.5, 58, 7, P.white)}${hand(14 * 6, 88, 5, P.white)}${hand(200, 98, 2, P.red)}<circle r="6" fill="${P.red}"/>`;
  },
  'CARD': () => `${outline(rr(-150, -95, 300, 190, 16), P.lav)}
    <path d="${rr(-120, -50, 46, 36, 6)}" fill="none" stroke="${P.warm}" stroke-width="2"/><path d="M-120 -32 h46 M-97 -50 v36" stroke="${P.warm}" stroke-width="1.5"/>
    <path d="M100 -48 q8 12 0 24 M110 -54 q12 18 0 36 M120 -60 q16 24 0 48" stroke="${P.white}" stroke-width="2" fill="none"/>
    <text x="-120" y="22" font-family="JetBrains Mono" font-size="20" fill="#fff" letter-spacing="2">•••• •••• •••• 4821</text>
    <text x="-120" y="70" font-family="Inter" font-weight="700" font-size="14" fill="#c9d4ea">KAI WALKER</text>
    <g transform="translate(78,68) rotate(-6)"><path d="${rr(-62, -18, 124, 36, 8)}" fill="none" stroke="${P.red}" stroke-width="3"/><text x="0" y="7" text-anchor="middle" font-family="Inter" font-weight="900" font-size="18" fill="${P.red}">DECLINED</text></g>`,
  'RECEIPT': () => {
    let z = 'M-100 -150 H100 V140'; for (let i = 0; i < 10; i++) z += ` l-10 12 l-10 -12`; z += ' Z';
    const row = (y, a, b, bold) => `<text x="-80" y="${y}" font-family="JetBrains Mono" font-size="14" font-weight="${bold ? 800 : 400}" fill="#1a2238">${a}</text><text x="80" y="${y}" text-anchor="end" font-family="JetBrains Mono" font-size="14" font-weight="${bold ? 800 : 400}" fill="#1a2238">${b}</text>`;
    return `<path d="${z}" fill="none" stroke="${P.white}" stroke-width="10" opacity="0.25" filter="url(#neon)"/><path d="${z}" fill="#e6ecf6"/>
      <text x="0" y="-115" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="16" fill="#1a2238">24/7 MARKET</text>
      <path d="M-80 -100 H80" stroke="#1a2238" stroke-dasharray="4 4"/>
      ${row(-70, 'NOODLES x3', '4.47')}${row(-45, 'COFFEE', '3.12')}${row(-20, 'BREAD', '2.99')}${row(5, 'MILK', '4.19')}
      <path d="M-80 25 H80" stroke="#1a2238" stroke-dasharray="4 4"/>${row(55, 'TOTAL', '$14.77', true)}${row(82, 'CARD', '•4821')}`;
  },
  'PUMP DISPLAY': () => `${outline(rr(-135, -120, 270, 240, 14), P.pink)}
    ${[['SALE $', '40.00', -80], ['GALLONS', '10.28', -5], ['PRICE / GAL', '3.89', 70]].map(([l, v, y]) =>
      `<text x="-110" y="${y - 12}" font-family="Inter" font-weight="800" font-size="12" letter-spacing="2" fill="#9fb0cf">${l}</text><path d="${rr(-110, y - 4, 220, 50, 6)}" fill="#05070d"/>${led(v, 0, y + 4, 34, y > 50 ? P.red : '#e9f0ff')}`).join('')}`,
  'CALENDAR': () => {
    let g = '';
    for (let i = 0; i < 35; i++) { const d = i + 1, x = -105 + (i % 7) * 35, y = -20 + Math.floor(i / 7) * 32; if (d >= 1 && d <= 30) g += `<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter" font-size="14" fill="${d === 1 ? P.red : '#1a2238'}" font-weight="${d === 1 ? 900 : 500}">${d}</text>`; }
    return `<path d="${rr(-130, -130, 260, 250, 12)}" fill="none" stroke="${P.white}" stroke-width="10" opacity="0.25" filter="url(#neon)"/><path d="${rr(-130, -130, 260, 250, 12)}" fill="#e6ecf6"/>
      <path d="M-130 -118 a12 12 0 0 1 12 -12 h236 a12 12 0 0 1 12 12 v38 h-260 Z" fill="${P.red}"/>
      <text x="0" y="-95" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" letter-spacing="4" fill="#fff">NOVEMBER</text>
      ${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => `<text x="${-105 + i * 35}" y="-52" text-anchor="middle" font-family="Inter" font-weight="800" font-size="11" fill="#7a86a3">${d}</text>`).join('')}
      ${g}<circle cx="-105" cy="-25" r="15" fill="none" stroke="${P.red}" stroke-width="3"/>
      <text x="0" y="150" text-anchor="middle" font-family="Inter" font-weight="900" font-size="16" fill="${P.red}">RENT DUE: $1,150</text>`;
  },
  'BILL': () => `<path d="${rr(-150, -95, 300, 190, 8)}" fill="none" stroke="${P.white}" stroke-width="10" opacity="0.25" filter="url(#neon)"/><path d="${rr(-150, -95, 300, 190, 8)}" fill="#e6ecf6"/>
    <path d="M-150 -95 L0 15 L150 -95" fill="none" stroke="#b9c3d8" stroke-width="2"/>
    <g transform="translate(0,45) rotate(-6)"><path d="${rr(-95, -22, 190, 44, 6)}" fill="none" stroke="${P.red}" stroke-width="4"/><text x="0" y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="24" letter-spacing="2" fill="${P.red}">FINAL NOTICE</text></g>`,
  'BALANCE': () => `<text x="0" y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" letter-spacing="4" fill="#9fb0cf">AVAILABLE BALANCE</text>
    <text x="0" y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="92" fill="${P.red}" filter="url(#glow)">$4.12</text>
    <path d="M-60 60 h120" stroke="#24314f" stroke-width="2"/>
    <text x="0" y="96" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${P.red}">▼ $208.28 today</text>`,
  'FUEL GAUGE': () => {
    const a = d => d * Math.PI / 180;
    let ticks = '';
    for (let i = 0; i <= 8; i++) { const d = -120 + i * 30; ticks += `<path d="M${Math.sin(a(d)) * 92} ${-Math.cos(a(d)) * 92} L${Math.sin(a(d)) * 108} ${-Math.cos(a(d)) * 108}" stroke="${i < 2 ? P.red : P.white}" stroke-width="${i % 4 ? 2 : 4}"/>`; }
    return `<circle r="128" fill="none" stroke="${P.warm}" stroke-width="10" opacity="0.3" filter="url(#neon)"/><circle r="124" fill="url(#glass)" stroke="${P.white}" stroke-width="3"/>${ticks}
      <text x="${Math.sin(a(-120)) * 70}" y="${-Math.cos(a(-120)) * 70 + 6}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" fill="${P.red}">E</text>
      <text x="${Math.sin(a(120)) * 70}" y="${-Math.cos(a(120)) * 70 + 6}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" fill="${P.white}">F</text>
      <path d="M0 0 L${Math.sin(a(-108)) * 96} ${-Math.cos(a(-108)) * 96}" stroke="${P.red}" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/><circle r="10" fill="${P.white}"/>
      <g transform="translate(0,58)" fill="${P.warm}" filter="url(#glow)"><rect x="-14" y="-14" width="18" height="28" rx="3"/><path d="M4 -8 h6 l6 6 v14 q0 6 -5 6" fill="none" stroke="${P.warm}" stroke-width="3"/></g>`;
  },
};

// ---------------- images ----------------
function overview() {
  const W = 1920, H = 1080, s = 0.4;
  const labels = [['HOME', 440], ['GAS', 1500], ['MARKET', 2430], ['DINER', 3410], ['BANK', 4200]];
  return svgDoc(W, H, `<g transform="translate(60,-700)">${street({ camX: 0, s })}
    ${character('kai', 1000 * s, G, 0.42, { t: 1, face: 'happy' })}
    ${labels.map(([n, x]) => `<text x="${x * s}" y="${G + 120}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" letter-spacing="5" fill="#9fb0cf">${n}</text>`).join('')}</g>
    <text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">THE WORLD</text>
    <text x="80" y="155" font-family="Inter" font-size="24" fill="#9fb0cf">One street, five places. Calm neon: one soft accent color per place. Light pulses travel along the outlines.</text>
    ${moon(1700, 330, 0.6)}`);
}
const SS = 1.15;
function scene(camX, kaiX, caption, extra = {}) {
  return svgDoc(1080, 1920, moon(900, 585) + street({ camX, s: SS, t: extra.t || 0 }) +
    character('kai', (kaiX - camX) * SS, G, 1.15, { t: 1.3, face: extra.face || 'happy', pose: extra.pose, dir: extra.dir }) +
    (extra.prop || '') + hud({ caption, ...extra.hud }));
}
function propsSheet() {
  const W = 1920, H = 1080;
  const names = Object.keys(PROPS);
  const cells = names.map((n, i) => {
    const x = 200 + (i % 5) * 380, y = 360 + Math.floor(i / 5) * 400;
    const sc = n === 'PHONE' ? 0.92 : 0.9;
    return `<g transform="translate(${x},${y}) scale(${sc})">${PROPS[n]()}</g>
      <text x="${x}" y="${y + 185}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" letter-spacing="4" fill="#9fb0cf">${n}</text>`;
  }).join('');
  return svgDoc(W, H, `<text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">EXPLAINER PROPS</text>
    <text x="80" y="155" font-family="Inter" font-size="24" fill="#9fb0cf">Real proportions and real details, drawn in the same line + soft glow language as the world.</text>${cells}`);
}

// ---------------- 9-second motion test ----------------
function frame(t) {
  const draw = smooth(t / 1.4);
  const walk = smooth((t - 1.2) / 5.3);
  const camX = lerp(0, 1980, walk);
  const kaiX = camX + lerp(260, 470, smooth(t / 2));
  const moving = t > 1.2 && t < 6.5;
  const hit = smooth((t - 6.9) / 0.5); // phone slides up
  const drain = smooth((t - 7.4) / 1.2);
  const signsOn = (i, tt) => { const t0 = 1.2 + i * 0.35; return tt < t0 ? 0.08 : tt < t0 + 0.35 ? (Math.sin(tt * 90) > 0 ? 1 : 0.25) : 1; };
  const glow = lerp(1, 0.4, drain);
  const caption = t < 2.6 ? 'THIS IS KAI.' : t < 6.8 ? 'THIS IS HIS STREET.' : 'THEN HIS PHONE BUZZED.';
  const phone = hit > 0 ? `<g transform="translate(540,${lerp(2300, 1180, hit)}) rotate(${lerp(12, -4, hit)}) scale(1.5)">${PROPS.PHONE()}</g>` : '';
  return svgDoc(1080, 1920, moon(900, 585) +
    street({ camX, s: SS, t, draw, power: 1 - drain * 0.7, signsOn }) +
    character('kai', (kaiX - camX) * SS, G, 1.15, { t, pose: moving ? walkPose((t * 1.05) % 1) : STAND, speed: moving ? 0.5 : 0, glow: glow * (0.3 + 0.7 * draw), color: mix('#36b6ff', '#4a6f95', drain), droop: drain, face: drain > 0.3 ? 'shocked' : 'happy' }) +
    (hit > 0 ? `<rect width="1080" height="1920" fill="#000" opacity="${0.45 * hit}"/>` : '') + phone +
    hud({ caption, energy: lerp(0.85, 0.3, drain), balance: drain > 0 ? '$' + lerp(39.12, 4.12, drain).toFixed(2) : '$39.12' }));
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const shot = async (file, s) => {
    const m = s.match(/width="(\d+)" height="(\d+)"/);
    await page.setViewportSize({ width: +m[1], height: +m[2] });
    await page.setContent(`<html><body style="margin:0;background:#000">${s}</body></html>`);
    await page.screenshot({ path: file });
    console.log('rendered', file.split('/').pop());
  };
  await shot(`${OUT}/06-world-overview.png`, overview());
  for (const f of fs.readdirSync(OUT)) if (/^(0[7-9]|10)-scene/.test(f)) fs.rmSync(`${OUT}/${f}`);
  await shot(`${OUT}/07-scene-home.png`, scene(0, 690, 'HOME. RENT: $1,150.', { t: 2 }));
  await shot(`${OUT}/08-scene-gas-station.png`, scene(1095, 1500, 'GAS: $3.89 A GALLON.', { t: 4, face: 'tired' }));
  await shot(`${OUT}/09-scene-market.png`, scene(2040, 2600, 'DINNER: $4.47 NOODLES.', { t: 6, dir: -1 }));
  await shot(`${OUT}/10-scene-diner.png`, scene(2940, 3560, 'COFFEE: $3.12.', { t: 7, dir: -1, face: 'tired' }));
  await shot(`${OUT}/10b-scene-bank.png`, scene(3730, 3950, 'THE ATM SAID NO.', { t: 8, face: 'shocked', hud: { energy: 0.25, balance: '$4.12' } }));
  await shot(`${OUT}/11-explainer-props.png`, propsSheet());
  if (VIDEO) {
    const dir = fs.mkdtempSync(require('os').tmpdir() + '/worldframes-');
    const FPS = 30, N = 9 * FPS;
    await page.setViewportSize({ width: 1080, height: 1920 });
    await page.setContent('<html><body style="margin:0;background:#000"><div id="r"></div></body></html>');
    for (let i = 0; i < N; i++) {
      await page.evaluate(s => { document.getElementById('r').innerHTML = s; }, frame(i / FPS));
      await page.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.png` });
    }
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', `${dir}/f%04d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', `${OUT}/12-world-motion-test.mp4`]);
    fs.rmSync(dir, { recursive: true });
    console.log('rendered video');
  }
  await browser.close();
})();
