// "Glow" world v3 "Blueprint Neon": a navy blueprint city (home, gas station, market, burgers, bank),
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
  bg0: '#0a1a33', bg1: '#0f2a4d', fill: '#0b1d38', line: '#5d86bd', lineFar: '#24426c',
  warm: '#ffc46b', teal: '#45e0d0', pink: '#ff7eb6', red: '#ff5a5a', lav: '#a99bff', white: '#e6eeff', green: '#5be38a', flagBlue: '#3d6bff',
};
const G = 1450; // sidewalk level
const smooth = u => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);

const defs = charDefs + `
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="neon" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
<linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${P.bg0}"/><stop offset="1" stop-color="${P.bg1}"/></linearGradient>
<linearGradient id="glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#173360"/><stop offset="1" stop-color="#0b1d38"/></linearGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 H0 V40" fill="none" stroke="#9cc3ff" stroke-opacity="0.07" stroke-width="1"/></pattern>
<pattern id="gridMajor" width="200" height="200" patternUnits="userSpaceOnUse"><path d="M200 0 H0 V200" fill="none" stroke="#9cc3ff" stroke-opacity="0.12" stroke-width="1.5"/></pattern>
<radialGradient id="vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#020814" stop-opacity="0.55"/></radialGradient>
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

// Neon US flag (waves a little), drawn at the pole top x,y
let FLAG_T = 0;
function flag(x, y, w, h, angle) {
  const wave = (u, v) => Math.sin(u * 5 - FLAG_T * 3) * 5 * u;
  const stripe = h / 13;
  let s = '';
  for (let i = 0; i < 13; i++) {
    let d = '';
    for (let k = 0; k <= 12; k++) { const u = k / 12; d += `${k ? 'L' : 'M'}${x + u * w} ${y + (i + 0.5) * stripe + wave(u)}`; }
    s += `<path d="${d}" stroke="${i % 2 ? '#e6eeff' : P.red}" stroke-width="${stripe * 0.75}" fill="none" opacity="${i % 2 ? 0.55 : 0.95}"/>`;
  }
  const cw = w * 0.42, ch = stripe * 7;
  let stars = '';
  for (let r = 0; r < 9; r++) for (let c = 0; c < (r % 2 ? 5 : 6); c++) stars += `<circle cx="${x + (c + (r % 2 ? 1 : 0.5)) * cw / 6}" cy="${y + (r + 0.6) * ch / 9.4}" r="${w / 140}" fill="#fff"/>`;
  return `<g transform="rotate(${angle} ${x} ${y})" filter="url(#glow)"><g>${s}</g><rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${P.flagBlue}" opacity="0.9"/>${stars}</g>`;
}
const burgerIcon = (x, y, k) => `M${x - 70 * k} ${y - 10 * k} q0 -60 70 -60 q70 0 70 60 Z M${x - 76 * k} ${y + 8 * k} q19 -14 38 0 q19 14 38 0 q19 -14 38 0 q19 14 38 0 M${x - 72 * k} ${y + 28 * k} h${144 * k} M${x - 70 * k} ${y + 48 * k} h${140 * k} q0 26 -20 26 h${-100 * k} q-20 0 -20 -26 M${x - 30 * k} ${y - 45 * k} h1 M${x} ${y - 52 * k} h1 M${x + 30 * k} ${y - 45 * k} h1`;
const fries = (x, y) => `M${x - 34} ${y} l8 -70 h52 l8 70 Z M${x - 20} ${y - 70} v-30 M${x - 6} ${y - 70} v-40 M${x + 8} ${y - 70} v-34 M${x + 22} ${y - 70} v-28`;

// ---------------- world geometry ----------------
// Items: fill (dark solid shapes), dim (structure lines), acc (soft neon accents),
// pulse (outlines that carry a traveling light), raw (signs and text).
const R = (x, y, w, h) => `M${x} ${y} h${w} v${h} h${-w} Z`;
function buildStreet() {
  const W = { fill: [], dim: [], acc: [], pulse: [], raw: [], lights: [] };
  let cur = null;
  const dim = (d, w = 2.5) => W.dim.push({ d, w, color: cur });
  const acc = (d, color, w = 3) => W.acc.push({ d, color, w });
  const box = (x, y, w, h) => { W.fill.push(R(x, y, w, h)); W.pulse.push(R(x, y, w, h)); dim(R(x, y, w, h), 3); };

  // HOME: three-story walk-up, Kai's window lit
  cur = P.warm;
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
    W.raw.push({ svg: flag(x + 140, G - 330, 150, 92, -18), x });
    dim(`M${x + 140} ${G - 330} l-70 -28`, 3);
    W.raw.push({ svg: `<circle cx="${dx + 70}" cy="${G - 275}" r="7" fill="${P.warm}" filter="url(#glow)"/>`, x: dx });
  }
  cur = null;
  // street lamp
  { const x = 900;
    dim(`M${x} ${G} V${G - 620} q0 -30 30 -30 h70`, 4);
    W.raw.push({ svg: `<polygon points="${x + 85},${G - 640} ${x + 115},${G - 640} ${x + 260},${G + 20} ${x - 60},${G + 20}" fill="url(#cone)"/><ellipse cx="${x + 100}" cy="${G - 645}" rx="22" ry="7" fill="#fff1cf" filter="url(#glow)"/>`, x });
  }
  // GAS STATION: canopy, two pumps, price sign
  cur = P.pink;
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
  cur = P.teal;
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
  cur = null;
  // tree
  { const x = 2920; dim(`M${x} ${G} V${G - 200}`, 4); dim(`M${x} ${G - 320} m-90 0 a90 90 0 1 0 180 0 a90 90 0 1 0 -180 0`, 2.5); }
  // BURGERS: fast-food spot with a pole sign, drive-thru, combo in the window
  cur = P.red;
  { const x = 3060, w = 640, h = 440, y = G - h;
    const d = `M${x} ${G} V${y} h${w} V${G} Z`;
    W.fill.push(d); dim(d, 3); W.pulse.push(d);
    acc(`M${x - 20} ${y + 6} h${w + 40} l-30 70 h${-(w - 20)} Z`, P.red, 3);
    W.raw.push({ svg: `<rect x="${x + 40}" y="${y + 140}" width="400" height="220" fill="${P.warm}" opacity="0.07"/>`, x });
    dim(R(x + 40, y + 140, 400, 220) + ` M${x + 173} ${y + 140} v220 M${x + 306} ${y + 140} v220`);
    W.raw.push({ svg: `<text x="${x + w / 2}" y="${y + 56}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" letter-spacing="8" fill="${P.warm}">BURGERS</text>`, x, sign: P.warm });
    acc(fries(x + 90, y + 330), P.warm, 2.5); acc(burgerIcon(x + 240, y + 290, 0.55), P.warm, 2.5);
    W.raw.push({ svg: `<text x="${x + 372}" y="${y + 270}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${P.white}">$8.99</text><text x="${x + 372}" y="${y + 300}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="16" letter-spacing="3" fill="${P.white}" opacity="0.8">COMBO</text>`, x, sign: P.white });
    dim(R(x + 490, y + 190, 110, 250) + ` M${x + 580} ${y + 320} h-10`);
    // tall pole sign with a neon burger
    const px = x + w + 110;
    dim(`M${px} ${G} V${G - 520}`, 6);
    W.fill.push(`M${px} ${G - 690} m-110 0 a110 110 0 1 0 220 0 a110 110 0 1 0 -220 0`);
    acc(`M${px} ${G - 690} m-110 0 a110 110 0 1 0 220 0 a110 110 0 1 0 -220 0`, P.red, 3);
    acc(burgerIcon(px, G - 700, 1), P.warm, 3.5);
    W.raw.push({ svg: `<text x="${px}" y="${G - 610}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" letter-spacing="4" fill="${P.red}">OPEN 24H</text>`, x: px, sign: P.red });
    W.lights.push({ x: x + 240, y: G - 200, r: 280, color: P.warm });
  }
  // BANK: columns, ATM
  cur = P.green;
  { const x = 4080, w = 640, h = 660, y = G - h;
    box(x, y, w, h); dim(`M${x - 20} ${y} h${w + 40} M${x - 20} ${y + 120} h${w + 40}`);
    for (let i = 0; i < 4; i++) dim(`M${x + 70 + i * 150} ${y + 140} V${G - 30} M${x + 110 + i * 150} ${y + 140} V${G - 30}`, 2.5);
    dim(`M${x - 20} ${G} v-30 h${w + 40} v30`);
    W.raw.push({ svg: `<text x="${x + w / 2}" y="${y + 82}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" letter-spacing="18" fill="${P.green}">BANK</text>`, x, sign: P.green });
    acc(`M${x + w / 2 + 60} ${y + 250} m-62 0 a62 62 0 1 0 124 0 a62 62 0 1 0 -124 0`, P.green, 3);
    W.raw.push({ svg: `<text x="${x + w / 2 + 60}" y="${y + 282}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="86" fill="${P.green}" filter="url(#glow)">$</text>`, x, sign: P.green });
    dim(`M${x - 90} ${G} V${G - 620}`, 4);
    W.raw.push({ svg: flag(x - 88, G - 616, 200, 120, 0), x });
    const ax = x + w - 150;
    W.fill.push(R(ax, G - 330, 110, 300)); dim(R(ax, G - 330, 110, 300));
    acc(R(ax + 15, G - 300, 80, 60), P.green, 2.5); dim(`M${ax + 25} ${G - 210} h60 M${ax + 25} ${G - 190} h60`, 2);
  }
  cur = null;
  // street: sidewalk, curb, lanes, a parked car
  dim(`M-200 ${G} H4800`, 3); dim(`M-200 ${G + 40} H4800`, 2.5); dim(`M-200 ${G + 330} H4800`, 2);
  for (let i = 0; i < 26; i++) W.dim.push({ d: `M${i * 200 - 100} ${G + 190} h100`, w: 3, faint: true });
  { const x = 880, y = G + 150;
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
      ${W.dim.map(l => `<path d="${l.d}" ${pl} ${dash} stroke="${l.color || P.line}" stroke-width="${l.w}" opacity="${l.faint ? 0.5 : l.color ? 0.7 : 0.85}"/>`).join('')}
      <g filter="url(#neon)" opacity="${0.55 * draw}">${W.acc.map(l => `<path d="${l.d}" stroke="${l.color}" stroke-width="${l.w * 3}"/>`).join('')}</g>
      ${W.acc.map(l => `<path d="${l.d}" ${pl} ${dash} stroke="${l.color}" stroke-width="${l.w}"/>`).join('')}
      <g stroke="#cfe3ff" stroke-width="3" opacity="${0.55 * power * draw}">${pulses}</g>
      <g stroke="#cfe3ff" stroke-width="10" opacity="${0.25 * power * draw}" filter="url(#b10)">${pulses}</g>
    </g>
    ${raws}
    <rect x="-400" y="${G + 340}" width="5600" height="600" fill="${P.bg0}" opacity="0.5"/>
  </g>`;
}

const svgDoc = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs><rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#grid)"/><rect width="${w}" height="${h}" fill="url(#gridMajor)"/>${body}<rect width="${w}" height="${h}" fill="url(#vig)" pointer-events="none"/></svg>`;
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
  'ALARM CLOCK': (time = '6:00') => `${outline(rr(-130, -70, 260, 140, 26), P.red)}
    <path d="${rr(-110, -50, 220, 100, 12)}" fill="#05070d"/>${led(time, -92, -32, 64, P.red)}
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

const bill = (amount, words) => () => {
  const c = P.green;
  return `${outline(rr(-160, -72, 320, 144, 6), c)}
    <path d="${rr(-150, -62, 300, 124, 4)}" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
    <ellipse cx="0" cy="0" rx="42" ry="52" fill="none" stroke="${c}" stroke-width="2"/>
    <circle cx="0" cy="-12" r="15" fill="none" stroke="${P.white}" stroke-width="2"/><path d="M-26 34 q4 -26 26 -26 q22 0 26 26" fill="none" stroke="${P.white}" stroke-width="2"/>
    <circle cx="-95" cy="5" r="20" fill="none" stroke="${c}" stroke-width="2"/><circle cx="-95" cy="5" r="13" fill="none" stroke="${c}" stroke-width="1" stroke-dasharray="2 3"/>
    <text x="-140" y="-38" font-family="Inter" font-weight="900" font-size="26" fill="${c}">${amount}</text><text x="140" y="-38" text-anchor="end" font-family="Inter" font-weight="900" font-size="26" fill="${c}">${amount}</text>
    <text x="140" y="56" text-anchor="end" font-family="Inter" font-weight="900" font-size="26" fill="${c}">${amount}</text>
    <text x="0" y="-58" text-anchor="middle" font-family="Caladea, serif" font-size="11" letter-spacing="1" fill="${P.white}">THE UNITED STATES OF AMERICA</text>
    <text x="0" y="66" text-anchor="middle" font-family="Caladea, serif" font-size="11" letter-spacing="2" fill="${P.white}">${words}</text>`;
};
const AMERICANA = {
  'US FLAG': () => `<path d="M-130 -130 V150" stroke="${P.white}" stroke-width="5" stroke-linecap="round"/><circle cx="-130" cy="-134" r="7" fill="${P.warm}"/>${flag(-127, -125, 250, 150, 0)}`,
  '$100 BILL': bill('100', 'ONE HUNDRED DOLLARS'),
  '$20 BILL': bill('20', 'TWENTY DOLLARS'),
  'CASH STACK': () => `${[30, 15, 0].map(o => `<path d="${rr(-150 + o / 2, -50 - o, 300, 110, 6)}" fill="#0b1d38" stroke="${P.green}" stroke-width="2.5" opacity="${o ? 0.6 : 1}"/>`).join('')}
    <path d="${rr(-150, -50, 300, 110, 6)}" fill="none" stroke="${P.green}" stroke-width="10" opacity="0.3" filter="url(#neon)"/>
    <rect x="-34" y="-50" width="68" height="110" fill="${P.warm}" opacity="0.9"/><text x="0" y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="18" fill="#3a2a10">$1,000</text>
    <text x="-110" y="0" font-family="Inter" font-weight="900" font-size="28" fill="${P.green}">$</text>`,
  'COINS': () => `${[0, 1, 2, 3].map(i => `<ellipse cx="-60" cy="${70 - i * 18}" rx="56" ry="16" fill="#0b1d38" stroke="#c9d4ea" stroke-width="2.5"/>`).join('')}
    <circle cx="60" cy="-10" r="72" fill="none" stroke="#c9d4ea" stroke-width="10" opacity="0.3" filter="url(#neon)"/><circle cx="60" cy="-10" r="72" fill="url(#glass)" stroke="#e6eeff" stroke-width="3"/>
    <circle cx="60" cy="-10" r="60" fill="none" stroke="#c9d4ea" stroke-width="1.5" stroke-dasharray="3 4"/>
    <text x="60" y="-30" text-anchor="middle" font-family="Caladea, serif" font-size="16" letter-spacing="3" fill="#e6eeff">LIBERTY</text>
    <text x="60" y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#e6eeff">25¢</text>
    <text x="60" y="38" text-anchor="middle" font-family="Caladea, serif" font-size="13" fill="#c9d4ea">2026</text>`,
  'PAYCHECK': () => `<path d="${rr(-170, -80, 340, 160, 6)}" fill="none" stroke="${P.white}" stroke-width="10" opacity="0.25" filter="url(#neon)"/><path d="${rr(-170, -80, 340, 160, 6)}" fill="#e9f0fb"/>
    <text x="-150" y="-52" font-family="Inter" font-weight="900" font-size="13" fill="#1a2a48">QUICKDROP DELIVERY LLC</text><text x="150" y="-52" text-anchor="end" font-family="JetBrains Mono" font-size="12" fill="#1a2a48">No. 1042</text>
    <text x="-150" y="-14" font-family="Inter" font-size="11" fill="#5a6a88">PAY TO THE ORDER OF</text><text x="-150" y="8" font-family="Caladea, serif" font-style="italic" font-size="22" fill="#1a2a48">Kai Walker</text>
    <path d="${rr(56, -30, 94, 32, 4)}" fill="none" stroke="#1a2a48" stroke-width="1.5"/><text x="103" y="-8" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="17" fill="#1a7a45">$612.40</text>
    <path d="M-150 16 H40 M40 50 H150" stroke="#1a2a48" stroke-width="1"/><text x="-150" y="62" font-family="JetBrains Mono" font-size="11" fill="#5a6a88">⑆021000021⑆ 4821⑈ 1042</text>`,
  'BURGER MEAL': () => `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g filter="url(#glow)" stroke="${P.warm}" stroke-width="4"><path d="${burgerIcon(-55, 10, 0.85)}"/><path d="${fries(80, 70)}"/></g>
    <path d="M115 70 l10 -100 h50 l10 100 Z M120 -45 h60 M150 -45 l10 -40" stroke="${P.red}" stroke-width="4" filter="url(#glow)"/></g>
    <text x="0" y="130" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${P.white}">$8.99</text>`,
  'COFFEE': () => `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-60 -80 h120 l-14 190 h-92 Z" fill="url(#glass)" stroke="${P.white}" stroke-width="3"/><path d="M-70 -80 h140 v-22 h-140 Z M-50 -102 l8 -16 h84 l8 16" stroke="${P.white}" stroke-width="3" fill="#0b1d38"/>
    <path d="M-63 -20 h126 l-6 70 h-114 Z" stroke="${P.warm}" stroke-width="3" fill="${P.warm}" fill-opacity="0.15"/>
    <path d="M-20 -128 q-10 -20 0 -40 M10 -128 q-10 -20 0 -40" stroke="${P.white}" stroke-width="3" opacity="0.6"/></g>
    <text x="0" y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="${P.warm}">$3.12</text>`,
  'HOUSE KEYS': () => `<g fill="none" stroke="${P.warm}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)">
    <circle cx="-60" cy="-60" r="44"/><circle cx="-60" cy="-60" r="16"/><path d="M-30 -28 L80 82 M40 42 l18 -18 M62 64 l18 -18"/>
    <path d="M10 -90 h80 v40 h-80 Z"/></g><text x="50" y="-63" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="${P.warm}">214</text>`,
};

// Apartment 214 cut open like a dollhouse: three rooms, one glow each
function cutaway() {
  const W = 1080, H = 1920, L = 110, Rr = 970, floors = [640, 960, 1280, 1600];
  const line = (d, c = P.line, w = 3) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const neon = (d, c, w = 3) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w * 3}" opacity="0.5" filter="url(#neon)"/>${line(d, c, w)}`;
  const label = (x, y, t) => `<text x="${x}" y="${y}" font-family="Inter" font-weight="800" font-size="20" letter-spacing="5" fill="#b5c6e6">${t}</text>`;
  let b = `<path d="M${L - 40} ${floors[0]} L540 ${floors[0] - 170} L${Rr + 40} ${floors[0]} Z" fill="${P.fill}"/>${line(`M${L - 40} ${floors[0]} L540 ${floors[0] - 170} L${Rr + 40} ${floors[0]}`, P.warm, 3)}
    <rect x="${L}" y="${floors[0]}" width="${Rr - L}" height="${floors[3] - floors[0]}" fill="${P.fill}"/>`;
  // bedroom: moonlit window, bed, nightstand with phone + alarm clock
  const f1 = floors[1];
  b += `<circle cx="300" cy="${f1 - 200}" r="160" fill="#36b6ff" opacity="0.1" filter="url(#b60)"/>`;
  b += line(`M180 ${f1 - 250} h160 v150 h-160 Z M260 ${f1 - 250} v150`) + `<circle cx="225" cy="${f1 - 205}" r="16" fill="#e3e9ff" opacity="0.5"/>`;
  b += line(`M520 ${f1} v-60 h330 v60 M850 ${f1 - 60} v-70 M520 ${f1 - 60} q60 -30 120 0 q80 25 160 -10`) + line(`M560 ${f1 - 82} m-30 0 a30 14 0 1 0 60 0 a30 14 0 1 0 -60 0`);
  b += line(`M400 ${f1} v-90 h90 v90 M400 ${f1 - 45} h90`);
  b += `<g transform="translate(445,${f1 - 112}) scale(0.32)">${PROPS['ALARM CLOCK']('2:14')}</g>`;
  b += label(150, floors[0] + 48, 'BEDROOM');
  // kitchen: fridge with a light, counter, stove, microwave clock
  const f2 = floors[2];
  b += `<circle cx="760" cy="${f2 - 150}" r="170" fill="${P.warm}" opacity="0.08" filter="url(#b60)"/>`;
  b += neon(`M180 ${f2} v-250 h120 v250 Z M180 ${f2 - 160} h120 M285 ${f2 - 210} v30 M285 ${f2 - 120} v40`, P.teal, 2.5);
  b += line(`M360 ${f2} v-110 h460 v110 M360 ${f2 - 110} h460 M600 ${f2 - 110} v110 M640 ${f2 - 110} m0 -6 h120 M700 ${f2 - 130} v14`);
  b += line(`M600 ${f2 - 250} h170 v80 h-170 Z`) + `<text x="745" y="${f2 - 200}" text-anchor="end" font-family="JetBrains Mono" font-weight="800" font-size="22" fill="${P.red}">2:14</text>`;
  b += neon(`M440 ${f2 - 110} l6 -40 h40 l6 40`, P.warm, 2.5);
  b += label(150, floors[1] + 48, 'KITCHEN');
  // living room: couch, TV glow, coffee table with a final notice
  const f3 = floors[3];
  b += `<circle cx="300" cy="${f3 - 170}" r="190" fill="${P.teal}" opacity="0.08" filter="url(#b60)"/>`;
  b += neon(`M190 ${f3 - 230} h230 v140 h-230 Z M305 ${f3 - 90} v30 M260 ${f3 - 60} h90`, P.teal, 2.5);
  b += line(`M560 ${f3} v-50 h-20 v-80 h20 v-40 h300 v40 h20 v80 h-20 v50 M560 ${f3 - 50} h300 M560 ${f3 - 90} h300`);
  b += line(`M420 ${f3} v-50 h120 v50`) + `<g transform="translate(480,${f3 - 62}) scale(0.18)">${PROPS.BILL()}</g>`;
  b += label(150, floors[2] + 48, 'LIVING ROOM');
  // structure on top: walls and floors
  b += line(`M${L} ${floors[0]} V${floors[3]} H${Rr} V${floors[0]} Z M${L} ${floors[1]} H${Rr} M${L} ${floors[2]} H${Rr}`, P.warm, 4);
  b += `<path d="M${L} ${floors[0]} V${floors[3]} H${Rr} V${floors[0]} Z" fill="none" stroke="${P.warm}" stroke-width="12" opacity="0.25" filter="url(#neon)"/>`;
  b += flag(610, floors[3] - 300, 170, 104, 0) + line(`M600 ${floors[3] - 306} h190 v116 h-190 Z`, P.white, 2);
  // characters: Kai sitting on the bed at 2 AM, Mint in the kitchen
  b += character('kai', 640, f1 - 62 + 142 * 0.95, 0.95, { t: 1.5, face: 'tired', droop: 0.6, pose: { lean: 6, bob: 0, legL: [84, -84], legR: [76, -80], armL: [40, 35], armR: [55, 25] } });
  b += character('mint', 520, f2, 0.95, { t: 2, face: 'happy', dir: -1 });
  // blueprint title block
  b += `<g font-family="Inter"><rect x="640" y="1665" width="330" height="96" fill="${P.fill}" stroke="#b5c6e6" stroke-width="2"/><path d="M640 1700 H970 M820 1700 V1761" stroke="#b5c6e6" stroke-width="1.5"/>
    <text x="656" y="1690" font-weight="900" font-size="18" letter-spacing="3" fill="#fff">APT 214</text><text x="656" y="1735" font-size="15" fill="#b5c6e6">Kai + Mint</text><text x="656" y="1752" font-size="13" fill="#8aa0c8">Rent $1,150 / mo</text>
    <text x="836" y="1735" font-size="15" fill="#b5c6e6">Ohio, USA</text><text x="836" y="1752" font-size="13" fill="#8aa0c8">Scale 1:50</text></g>`;
  return svgDoc(W, H, b + hud({ caption: '2:14 AM. APT 214.', energy: 0.3, balance: '$39.12', part: '' }));
}

// ---------------- images ----------------
function overview() {
  const W = 1920, H = 1080, s = 0.39;
  const labels = [['HOME', 440], ['GAS', 1500], ['MARKET', 2430], ['BURGERS', 3450], ['BANK', 4400]];
  return svgDoc(W, H, `<g transform="translate(40,-700)">${street({ camX: 0, s })}
    ${character('kai', 1000 * s, G, 0.42, { t: 1, face: 'happy' })}
    ${labels.map(([n, x]) => `<text x="${x * s}" y="${G + 120}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" letter-spacing="5" fill="#9fb0cf">${n}</text>`).join('')}</g>
    <text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">THE WORLD</text>
    <text x="80" y="155" font-family="Inter" font-size="24" fill="#9fb0cf">Blueprint Neon: a navy blueprint city. One street, five places, one neon color each. Real American details: flags, burgers, dollars.</text>
    ${moon(1700, 330, 0.6)}`);
}
const SS = 1.15;
function scene(camX, kaiX, caption, extra = {}) {
  return svgDoc(1080, 1920, moon(900, 585) + street({ camX, s: SS, t: extra.t || 0 }) +
    character('kai', (kaiX - camX) * SS, G, 1.15, { t: 1.3, face: extra.face || 'happy', pose: extra.pose, dir: extra.dir }) +
    (extra.prop || '') + hud({ caption, ...extra.hud }));
}
function propsSheet(set = PROPS, title = 'EXPLAINER PROPS', sub = 'Real proportions and real details, drawn in the same line + soft glow language as the world.') {
  const W = 1920, H = 1080;
  const names = Object.keys(set);
  const cells = names.map((n, i) => {
    const per = Math.ceil(names.length / 2), rowN = i < per ? per : names.length - per, x = 1920 / 2 + ((i % per) - (rowN - 1) / 2) * 380, y = 360 + Math.floor(i / per) * 400;
    const sc = n === 'PHONE' ? 0.92 : 0.9;
    return `<g transform="translate(${x},${y}) scale(${sc})">${set[n]()}</g>
      <text x="${x}" y="${y + 185}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" letter-spacing="4" fill="#9fb0cf">${n}</text>`;
  }).join('');
  return svgDoc(W, H, `<text x="80" y="110" font-family="Inter" font-weight="900" font-size="54" fill="#fff">${title}</text>
    <text x="80" y="155" font-family="Inter" font-size="24" fill="#b5c6e6">${sub}</text>${cells}`);
}

// ---------------- 9-second motion test ----------------
function frame(t) {
  FLAG_T = t;
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

module.exports = { P, G, svgDoc, PROPS, AMERICANA, led, flag, rr, outline, burgerIcon, smooth };

if (require.main === module) (async () => {
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
  for (const f of fs.readdirSync(OUT)) if (/^(0[7-9]|10b?)-scene/.test(f)) fs.rmSync(`${OUT}/${f}`);
  await shot(`${OUT}/07-scene-home.png`, scene(0, 690, 'HOME. RENT: $1,150.', { t: 2 }));
  await shot(`${OUT}/08-scene-gas-station.png`, scene(1095, 1500, 'GAS: $3.89 A GALLON.', { t: 4, face: 'tired' }));
  await shot(`${OUT}/09-scene-market.png`, scene(2040, 2600, 'GROCERIES: $14.77.', { t: 6, dir: -1 }));
  await shot(`${OUT}/10-scene-burgers.png`, scene(2990, 3640, 'DINNER: $8.99 COMBO.', { t: 7, face: 'tired' }));
  await shot(`${OUT}/10b-scene-bank.png`, scene(3900, 4150, 'THE ATM SAID NO.', { t: 8, face: 'shocked', hud: { energy: 0.25, balance: '$4.12' } }));
  await shot(`${OUT}/13-home-cutaway.png`, cutaway());
  await shot(`${OUT}/14-americana-props.png`, propsSheet(AMERICANA, 'AMERICAN DETAILS', 'Real things people know in one second, in neon on the blueprint: flag, dollars, coins, a paycheck, food.'));
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
