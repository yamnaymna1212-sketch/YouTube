// Episode 1 "The 5 AM Call": storyboard key frames (9:16) and a contact sheet.
// Usage: node ep01.js <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const { character, mix } = require('./glow.js');
const { P, svgDoc, PROPS, led, rr } = require('./world.js');

const OUT = process.argv[2];
const KAI = '#36b6ff', PINK = '#ff6fae';

const line = (d, c = P.line, w = 3, op = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`;
const neon = (d, c, w = 3) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w * 3}" opacity="0.45" filter="url(#neon)"/>${line(d, c, w)}`;
const soft = (x, y, r, c, op) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${op}" filter="url(#b60)"/>`;
const blur = (inner, op = 0.5) => `<g filter="url(#b10)" opacity="${op}">${inner}</g>`;
const caption = (lines, size = 62) => (Array.isArray(lines) ? lines : [lines]).map((t, i, a) =>
  `<text x="540" y="${470 - (a.length - 1 - i) * (size + 12)}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${size}" fill="#fff" stroke="#000" stroke-width="10" style="paint-order:stroke">${t}</text>`).join('');
const partLabel = (extra = '') => `<text x="540" y="1640" text-anchor="middle" font-family="Inter" font-weight="700" font-size="40" fill="#fff" opacity="0.85">Part 1</text>${extra}`;
const frame = body => svgDoc(1080, 1920, body);

// ---------- phone screens ----------
const phoneBody = (glowColor, screen) => `
  <path d="${rr(-80, -165, 160, 330, 30)}" fill="none" stroke="${glowColor}" stroke-width="10" opacity="0.4" filter="url(#neon)"/>
  <path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="2.5"/>
  <rect x="82" y="-110" width="4" height="50" rx="2" fill="${P.white}"/><rect x="-86" y="-120" width="4" height="30" rx="2" fill="${P.white}"/><rect x="-86" y="-80" width="4" height="30" rx="2" fill="${P.white}"/>
  <path d="${rr(-72, -157, 144, 314, 24)}" fill="#0a1426"/><rect x="-24" y="-148" width="48" height="14" rx="7" fill="#000"/>
  ${screen}<rect x="-40" y="146" width="80" height="4" rx="2" fill="#fff" opacity="0.7"/>`;
const callIcon = (x, y, color, rot = 0) => `<circle cx="${x}" cy="${y}" r="19" fill="${color}"/><path d="M${x - 8} ${y - 4} q8 -8 16 0 l-3 5 q-5 -3 -10 0 z" fill="#fff" transform="rotate(${rot} ${x} ${y})"/>`;
const incomingCall = (status = 'incoming call', crack = false) => phoneBody(PINK, `
  <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:03</text>
  <circle cx="0" cy="-70" r="30" fill="${PINK}" opacity="0.9"/><text x="0" y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#fff">B</text>
  <text x="0" y="-12" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="800" font-size="19" fill="#fff">Brooke (ex) 🚩</text>
  <text x="0" y="8" text-anchor="middle" font-family="Inter" font-size="11" fill="#c9d4ea">${status}</text>
  ${callIcon(-40, 110, '#ff4d4d', 180)}${callIcon(40, 110, '#3ddc84')}
  <text x="-40" y="142" text-anchor="middle" font-family="Inter" font-size="8" fill="#c9d4ea">Decline</text><text x="40" y="142" text-anchor="middle" font-family="Inter" font-size="8" fill="#c9d4ea">Accept</text>
  ${crack ? line('M-60 -150 L-10 -40 L-30 20 L20 90 M-10 -40 L50 -70 M-30 20 L-70 50', '#ffffff', 1.5, 0.7) : ''}`);
const textScreen = () => phoneBody(PINK, `
  <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:09</text>
  <circle cx="0" cy="-92" r="16" fill="${PINK}"/><text x="0" y="-86" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#fff">B</text>
  <text x="0" y="-62" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="700" font-size="11" fill="#fff">Brooke (ex) 🚩</text>
  <path d="M-72 -50 H72" stroke="#24314f"/>
  <path d="${rr(-62, -32, 108, 34, 15)}" fill="#2a3a5c"/><text x="-50" y="-10" font-family="Inter" font-size="12" fill="#fff">I'm sorry. Please.</text>
  <path d="${rr(-62, 10, 92, 34, 15)}" fill="#2a3a5c"/><text x="-50" y="32" font-family="Inter" font-weight="800" font-size="14" fill="#fff">I'm outside.</text>
  <text x="-60" y="58" font-family="Inter" font-size="8" fill="#8aa0c8">5:09 AM</text>`);

// ---------- places ----------
function bedroom(op = 1) {
  return `<g opacity="${op}">
    ${line('M0 1480 H1080', P.line, 3)}
    ${line('M640 560 h300 v360 h-300 Z M790 560 v360 M640 740 h300', P.warm, 3, 0.8)}
    <circle cx="720" cy="640" r="22" fill="#e3e9ff" opacity="0.55"/>${soft(720, 640, 90, '#cfd9ff', 0.1)}
    ${line('M610 540 q15 200 0 400 M970 540 q-15 200 0 400', P.warm, 2.5, 0.6)}
    ${line('M110 1480 V1150 q0 -20 20 -20 h10 V1480', P.warm, 3, 0.8)}
    ${line('M140 1300 h640 v90 h-640 M160 1390 v90 M760 1390 v90', P.warm, 3, 0.8)}
    ${line('M820 1480 V1330 h170 V1480 M820 1400 h170', P.warm, 3, 0.8)}
  </g>`;
}
function carInterior(op = 1) {
  let rain = '';
  for (let i = 0; i < 40; i++) { const x = 600 + ((i * 97) % 420), y = 600 + ((i * 53) % 520); rain += `<path d="M${x} ${y} v${10 + (i % 4) * 6}" stroke="#cfe3ff" stroke-width="2" opacity="0.35"/>`; }
  return `<g opacity="${op}">
    ${soft(860, 760, 70, P.warm, 0.25)}${soft(700, 980, 50, PINK, 0.25)}${soft(980, 1050, 40, P.teal, 0.2)}
    ${line('M560 560 L1040 600 L1040 1180 L520 1180 Z', PINK, 3, 0.7)}${rain}
    ${line('M500 540 L520 1200', PINK, 6, 0.6)}
    ${line('M210 760 q130 -60 260 0 v180 h-260 Z', P.line, 3, 0.8)}
    ${line('M0 1440 Q540 1360 1080 1440', PINK, 3, 0.7)}
    ${neon('M820 1700 m-260 0 a260 120 0 1 1 520 0', PINK, 4)}
  </g>`;
}

// ---------- frames ----------
const F = [];

// 1. Wide: dark bedroom, Kai asleep, phone lights the ceiling
F.push({ t: '0:00', shot: 'WIDE, static. Phone buzzes on the nightstand. Clock 5:03.', svg: () => frame(`
  ${bedroom()}
  <polygon points="895,1325 925,1325 1060,560 760,560" fill="#dfe9ff" opacity="0.07"/>${soft(905, 640, 160, '#dfe9ff', 0.12)}
  <rect x="872" y="1318" width="66" height="10" rx="4" fill="#eaf2ff" filter="url(#glow)"/>
  <g transform="translate(850,1300) scale(0.28)">${PROPS['ALARM CLOCK']('5:03')}</g>
  <path d="M190 1285 m-70 0 a70 22 0 1 0 140 0 a70 22 0 1 0 -140 0" fill="#0b1d38" stroke="${P.warm}" stroke-width="3" opacity="0.9"/>
  <g transform="rotate(-90 760 1282)">${character('kai', 760, 1282, 1.2, { t: 1, face: 'asleep', glow: 0.55, droop: 0.4 })}</g>
  <path d="M400 1300 q60 -46 130 -30 q90 18 160 -6 q50 -14 90 6 v40 h-380 Z" fill="#0b1d38" opacity="0.92"/>${line('M400 1300 q60 -46 130 -30 q90 18 160 -6 q50 -14 90 6', P.warm, 3)}
  ${line('M915 1270 q8 -10 0 -20 M935 1275 q14 -18 0 -36', '#eaf2ff', 2.5, 0.8)}
  ${caption('5:03 AM.')}${partLabel()}`) });

// 2. ECU phone: incoming call from the ex
F.push({ t: '0:02', shot: 'EXTREME CLOSE-UP, slow push-in. Caller ID: Brooke (ex) 🚩. Glowing fingers hold the phone.', svg: () => frame(`
  ${blur(bedroom(), 0.35)}${soft(540, 1050, 380, PINK, 0.12)}
  <g transform="translate(540,1060) scale(2.9)">${incomingCall()}</g>
  ${neon('M236 1180 q-30 60 -10 150 M246 1360 q-26 40 -6 110', KAI, 9)}${neon('M840 1360 q50 -20 70 30', KAI, 9)}
  ${caption('HIS EX. AT 5 AM.')}${partLabel()}`) });

// 3. CU Kai waking up, face lit by the phone
F.push({ t: '0:04', shot: 'CLOSE-UP, handheld. Kai squints into the light, answers. We hear crying.', svg: () => frame(`
  ${blur(bedroom(), 0.3)}${soft(760, 1200, 300, '#dfe9ff', 0.1)}
  ${character('kai', 430, 1950, 3.0, { t: 2, face: 'tired', droop: 0.3, pose: { lean: 0, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-8, 10], armR: [110, 40] } })}
  <g transform="translate(800,1060) rotate(-10) scale(0.9)"><path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="2.5"/><path d="${rr(-80, -165, 160, 330, 30)}" fill="none" stroke="#dfe9ff" stroke-width="14" opacity="0.35" filter="url(#neon)"/></g>
  ${caption("SHE'S CRYING.")}${partLabel()}`) });

// 4. Brooke in her car, crying, phone at her ear
const atEar = { lean: 0, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-110, -90], armR: [-8, 10] };
const earPhone = (x, y, S) => `<g transform="translate(${x - 40 * S},${y - 316 * S}) rotate(-12) scale(${S * 0.16})"><path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="10"/></g>`;
F.push({ t: '0:06', shot: 'MEDIUM CLOSE-UP from the dashboard. Rain on the window. Brooke in her car, crying.', svg: () => frame(`
  ${carInterior()}
  ${character('brooke', 380, 1740, 2.6, { t: 1, face: 'crying', pose: atEar })}${earPhone(380, 1740, 2.6 * 0.95)}
  <path d="M0 1440 Q540 1360 1080 1440 V1920 H0 Z" fill="#0b1d38"/>${neon('M0 1440 Q540 1360 1080 1440', PINK, 3)}${neon('M820 1700 m-260 0 a260 120 0 1 1 520 0', PINK, 4)}
  ${caption(['"I MISS US...', 'CAN WE START OVER?"'])}${partLabel()}`) });

// 5. CU Kai thinking, glow flickers warm
F.push({ t: '0:09', shot: 'CLOSE-UP, slow push-in. He looks away. His glow warms toward pink for a second.', svg: () => frame(`
  ${blur(bedroom(), 0.25)}${soft(540, 1000, 340, PINK, 0.08)}
  ${character('kai', 560, 2020, 3.4, { t: 3, face: 'thinking', dir: -1, color: mix(KAI, PINK, 0.25), pose: { ...atEar } })}${earPhone(560 + 80 * 3.4, 2020, 3.4)}
  ${caption('HE ALMOST SAID YES.')}${partLabel()}`) });

// 6. ECU Brooke waiting, hopeful through tears
F.push({ t: '0:11', shot: 'EXTREME CLOSE-UP. She holds her breath, waiting. Tears catch the street light.', svg: () => frame(`
  ${blur(carInterior(), 0.4)}
  ${character('brooke', 520, 2080, 3.7, { t: 2, face: 'hopeful', pose: atEar })}${earPhone(520, 2080, 3.7 * 0.95)}
  ${caption("SHE'S WAITING...")}${partLabel()}`) });

// 7. Wide, dutch angle: "No." and the phone flies
F.push({ t: '0:13', shot: 'WIDE, dutch angle. "No." He throws the phone. Hard cut on the impact sound.', svg: () => {
  let trail = '';
  for (let i = 0; i < 4; i++) trail += `<g transform="translate(${640 + i * 70},${1000 - i * 30}) rotate(${10 + i * 25}) scale(0.45)" opacity="${0.15 + i * 0.25}"><path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="5"/></g>`;
  return frame(`<g transform="rotate(-6 540 1100)">${bedroom()}
    ${character('kai', 420, 1480, 1.5, { t: 4, face: 'firm', speed: 0.6, pose: { lean: 12, bob: 0, legL: [22, -10], legR: [-26, -6], armR: [100, 8], armL: [-45, 25] } })}
    ${trail}${line('M600 1060 l-40 10 M610 1100 l-50 4 M620 1140 l-40 -4', '#e6eeff', 3, 0.6)}</g>
    ${caption('"NO."', 120)}${partLabel()}`);
} });

// 8. Low angle: cracked phone on the floor rings again, Kai frozen in shock
F.push({ t: '0:15', shot: 'LOW ANGLE from the floor. Cracked phone lights up again. Kai, hands on his face.', svg: () => frame(`
  ${bedroom(0.7)}
  ${character('kai', 680, 1420, 1.35, { t: 5, face: 'shocked', pose: { lean: -4, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [-80, -110], armR: [80, 110] } })}
  ${soft(330, 1430, 220, PINK, 0.18)}
  <g transform="translate(300,1415) rotate(-14) scale(0.8)">${incomingCall('incoming call · 2 missed', true)}</g>
  ${caption('SHE CALLED AGAIN.')}${partLabel()}`) });

// 9. Flashback in pink: what the relationship cost him
F.push({ t: '0:18', shot: 'FLASHBACK MONTAGE, tinted pink (her color). Dinner bills, money requests, the balance falling.', svg: () => {
  const panel = (y, rot, label, inner) => `<g transform="rotate(${rot} 540 ${y + 140})"><path d="${rr(130, y, 820, 290, 18)}" fill="#0b1d38" stroke="#fff" stroke-width="3"/>${inner}
    <text x="160" y="${y + 40}" font-family="Inter" font-weight="900" font-size="22" letter-spacing="4" fill="#fff">${label}</text></g>`;
  const dinner = panel(560, -2, '2024 · DATE NIGHTS', `
    ${line('M200 790 h420', '#fff', 3)}${character('kai', 300, 845, 0.62, { t: 1, face: 'happy', pose: { lean: 0, bob: -40, legL: [80, -80], legR: [70, -70], armL: [60, 40], armR: [50, 40] } })}
    ${character('brooke', 530, 845, 0.62, { t: 1, face: 'happy', dir: -1, pose: { lean: 0, bob: -40, legL: [80, -80], legR: [70, -70], armL: [60, 40], armR: [50, 40] } })}
    <g transform="translate(790,700) rotate(6) scale(0.62)">${PROPS.RECEIPT()}</g>
    <text x="790" y="845" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#fff">$186.40</text>`);
  const request = panel(890, 1.5, '2025 · "RENT HELP"', `
    <circle cx="250" cy="1040" r="40" fill="#fff" opacity="0.9"/><text x="250" y="1054" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#0b1d38">B</text>
    <text x="320" y="1020" font-family="Inter" font-weight="800" font-size="30" fill="#fff">Brooke requested $300</text>
    <text x="320" y="1060" font-family="Inter, Noto Color Emoji" font-size="24" fill="#fff" opacity="0.85">"rent help 🥺 pay u back friday"</text>
    <path d="${rr(320, 1090, 160, 50, 25)}" fill="#fff"/><text x="400" y="1123" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="#0b1d38">PAID ✓</text>
    <text x="510" y="1123" font-family="Inter" font-size="22" fill="#fff" opacity="0.7">x 14 times</text>`);
  const balance = panel(1220, -1, 'NOW · THE MATH', `
    <text x="170" y="1360" font-family="Inter" font-weight="900" font-size="64" fill="#fff" opacity="0.55">$4,212</text>${line('M165 1340 h250', '#fff', 6)}
    <text x="460" y="1360" font-family="Inter" font-weight="900" font-size="34" fill="#fff">→</text>
    <text x="520" y="1370" font-family="Inter" font-weight="900" font-size="96" fill="#fff">$39</text>
    ${line('M720 1290 l50 20 l40 -10 l50 60 l40 10 l20 70', '#fff', 5)}`);
  return frame(`<filter id="pinkTint"><feColorMatrix type="saturate" values="0"/><feColorMatrix values="1 0 0 0 0.08  0 0.55 0 0 0  0 0 0.8 0 0.05  0 0 0 1 0"/></filter>
    <rect width="1080" height="1920" fill="${PINK}" opacity="0.08"/>
    <g filter="url(#pinkTint)">${dinner}${request}${balance}</g>
    ${caption(['2 YEARS. $6,400.', 'NOTHING BACK.'])}${partLabel()}`);
} });

// 10. Cliffhanger: "I'm outside." Pink light under the door
F.push({ t: '0:24', shot: 'MEDIUM, slow push toward the door. New text: "I\'m outside." Pink light under the door. Cut to black.', svg: () => frame(`
  ${line('M0 1480 H1080', P.line, 3)}
  ${neon('M700 1000 h260 v480 M700 1480 V1000', P.warm, 3)}${line('M720 1020 h220 v200 h-220 Z M720 1250 h220 v200 h-220 Z', P.warm, 2, 0.5)}
  <circle cx="725" cy="1250" r="9" fill="${P.warm}"/><circle cx="830" cy="1100" r="7" fill="${PINK}" filter="url(#glow)"/>
  <rect x="704" y="1472" width="252" height="10" fill="${PINK}" filter="url(#glow)"/><ellipse cx="830" cy="1490" rx="260" ry="26" fill="${PINK}" opacity="0.35" filter="url(#b10)"/>
  ${character('kai', 330, 1480, 1.35, { t: 6, face: 'shocked', pose: { lean: -2, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-8, 10], armR: [60, 80] } })}
  <g transform="translate(560,760) rotate(4) scale(1.15)">${textScreen()}</g>
  ${caption('THEN SHE TEXTED...')}${partLabel(`<text x="540" y="1700" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" letter-spacing="4" fill="${PINK}">FOLLOW FOR PART 2</text>`)}`) });

module.exports = { line, neon, soft, blur, bedroom, carInterior, phoneBody, callIcon, partLabel, KAI, PINK };

if (require.main === module) (async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const files = [];
  await page.setViewportSize({ width: 1080, height: 1920 });
  for (let i = 0; i < F.length; i++) {
    await page.setContent(`<html><body style="margin:0;background:#000">${F[i].svg()}</body></html>`);
    const f = `${OUT}/frame-${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({ path: f }); files.push(f);
    console.log('rendered', f.split('/').pop());
  }
  // contact sheet with timecodes and shot notes
  const cells = F.map((fr, i) => `<div class="c"><img src="data:image/png;base64,${fs.readFileSync(files[i]).toString('base64')}"><div class="tc">${String(i + 1).padStart(2, '0')} · ${fr.t}</div><div class="n">${fr.shot}</div></div>`).join('');
  await page.setViewportSize({ width: 1920, height: 1500 });
  await page.setContent(`<html><head><style>
    body{margin:0;background:#0a1a33;font-family:Inter;color:#e6eeff;padding:56px 70px;box-sizing:border-box;width:1920px}
    h1{margin:0;font-size:44px;font-weight:900}p{margin:8px 0 34px;color:#9fb0cf;font-size:20px}
    .g{display:grid;grid-template-columns:repeat(5,1fr);gap:26px}.c img{width:100%;border-radius:12px;display:block;border:1px solid #24426c}
    .tc{margin-top:10px;font-weight:900;font-size:18px;color:#ff6fae}.n{margin-top:4px;font-size:14px;line-height:1.35;color:#b5c6e6}
  </style></head><body><h1>EPISODE 1 · THE 5 AM CALL · STORYBOARD</h1><p>30 seconds · 9:16 · Kai (blue) and Brooke (pink, his ex) · Blueprint Neon world</p><div class="g">${cells}</div></body></html>`);
  const h = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: 1920, height: h });
  await page.screenshot({ path: `${OUT}/storyboard.png` });
  console.log('rendered storyboard.png');
  await browser.close();
})();
