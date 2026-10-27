// Episode 1 "The 5 AM Call": full ~30 s Short (hook + 6 scenes), voices, effects and synced captions.
// Usage: node ep01_full.js <episodeDir>   (voice lines live in <episodeDir>/audio)
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const hook = require('./hook.js');
const { character, mix, lerp } = require('./glow.js');
const { P, svgDoc, PROPS, rr } = require('./world.js');
const { line, neon, soft, blur, bedroom, phoneBody, callIcon, partLabel, KAI, PINK } = require('./ep01.js');

const DIR = process.argv[2];
const AUD = `${DIR}/audio`;
const FPS = 30;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = u => { u = clamp(u); return u * u * (3 - 2 * u); };
const easeOutBack = u => { const c = 1.7; u = clamp(u); return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };

// ---------- timeline: scenes follow the voice lines back to back (no dead air) ----------
const load = n => JSON.parse(fs.readFileSync(`${AUD}/${n}.words.json`));
const lastEnd = ws => ws[ws.length - 1].s + ws[ws.length - 1].d;
const HOOK_END = lastEnd(hook.words) + 0.15;
let cursor = HOOK_END;
const clip = (name, lead = 0.08, tail = 0.12) => {
  const ws = load(name), at = cursor + lead, end = at + lastEnd(ws) + tail;
  cursor = end;
  return { name, at, end, words: ws.map(w => ({ ...w, s: w.s + at })) };
};
const BROOKE = clip('brooke-1', 0.15);
const N1 = clip('vo-n1');
const N2 = clip('vo-n2', 0.08, 0.35);
const NO = clip('kai-no', 0.15, 0.75);
const N3 = clip('vo-n3');
const N4 = clip('vo-n4', 0.2);
const N5 = clip('vo-n5', 0.12);
const THROW = NO.words[0].s + 0.2, IMPACT = THROW + 0.3;
const CALL_AGAIN = N3.words.find((w, i) => i > 2 && w.w === 'And').s;
const BLOCK_T = N5.words.find(w => w.w === 'block').s;
const TEXT_T = N5.end + 0.05, KNOCK1 = TEXT_T + 0.8, KNOCK2 = KNOCK1 + 0.3;
cursor = KNOCK2 + 0.25;
const CTA = clip('vo-cta', 0.05, 0.1); // follow + share, with a joke about the story
const CTA2 = CTA.words.find((w, i) => i > 3 && w.w === 'And').s;
const END_CARD = CTA.at;
const DUR = Math.min(31, CTA.end + 0.6);

// ---------- captions: word by word, groups of up to ~15 characters ----------
const COLORS = { yes: PINK, no: '#ff5a5a', waiting: PINK, again: PINK, six: P.green, thousand: P.green, dollars: P.green, anything: '#ff5a5a', block: '#ff5a5a', texted: PINK };
function groupsOf(ws) {
  const gs = []; let g = [];
  for (const w of ws) { if (g.length && (g.map(x => x.w).join(' ') + ' ' + w.w).length > 15) { gs.push(g); g = []; } g.push(w); }
  if (g.length) gs.push(g);
  return gs;
}
function captions(t, c, { color, size = 72, quote = false } = {}) {
  const gs = groupsOf(c.words);
  let gi = -1;
  gs.forEach((g, i) => { if (t >= g[0].s) gi = i; });
  if (gi < 0) return '';
  const g = gs[gi];
  const parts = g.map((w, i) => {
    let label = w.w.toUpperCase();
    if (quote && gi === 0 && i === 0) label = '"' + label;
    if (quote && gi === gs.length - 1 && i === g.length - 1) label += '"';
    const pop = t >= w.s ? 1 + 0.25 * (1 - clamp((t - w.s) / 0.12)) : 0;
    return { label, seen: t >= w.s, pop, color: color || COLORS[w.w.toLowerCase().replace(/[^a-z]/g, '')] || '#fff' };
  });
  const k = size / 72;
  const sizes = parts.map(p => (p.label.replace(/[.,:'"]/g, '').length * 54 + p.label.replace(/[^.,:'"]/g, '').length * 20 + 34) * k);
  let x = 540 - sizes.reduce((a, b) => a + b, 0) / 2;
  return parts.map((p, i) => {
    const cx = x + sizes[i] / 2; x += sizes[i];
    return p.seen ? `<text x="${cx}" y="470" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${size}" fill="${p.color}" stroke="#000" stroke-width="${11 * k}" style="paint-order:stroke" transform="translate(${cx} 446) scale(${p.pop}) translate(${-cx} -446)">${p.label}</text>` : '';
  }).join('');
}
const push = (s, inner, cx = 540, cy = 1100) => `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
const lerpPose = (a, b, u) => Object.fromEntries(Object.keys(a).map(k => [k, Array.isArray(a[k]) ? a[k].map((v, i) => lerp(v, b[k][i], u)) : lerp(a[k], b[k], u)]));

// ---------- shared pieces ----------
const AT_EAR = { lean: 0, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-110, -90], armR: [-8, 10] };
const earPhone = (x, y, S) => `<g transform="translate(${x - 40 * S},${y - 316 * S}) rotate(-12) scale(${S * 0.16})"><path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="10"/></g>`;
function car(t, op = 1) {
  let rain = '';
  for (let i = 0; i < 46; i++) { const x = 600 + ((i * 97) % 420), y = 600 + ((i * 53 + t * 620) % 560); rain += `<path d="M${x} ${y} v${12 + (i % 4) * 7}" stroke="#cfe3ff" stroke-width="2" opacity="0.35"/>`; }
  return `<g opacity="${op}">
    ${soft(860, 760, 70, P.warm, 0.25)}${soft(700, 980, 50, PINK, 0.25)}${soft(980, 1050, 40, P.teal, 0.2)}
    <clipPath id="win"><path d="M560 560 L1040 600 L1040 1180 L520 1180 Z"/></clipPath><g clip-path="url(#win)">${rain}</g>
    ${line('M560 560 L1040 600 L1040 1180 L520 1180 Z', PINK, 3, 0.7)}${line('M500 540 L520 1200', PINK, 6, 0.6)}
    ${line('M210 760 q130 -60 260 0 v180 h-260 Z', P.line, 3, 0.8)}</g>`;
}
const dash = () => `<path d="M0 1440 Q540 1360 1080 1440 V1920 H0 Z" fill="#0b1d38"/>${neon('M0 1440 Q540 1360 1080 1440', PINK, 3)}${neon('M820 1700 m-260 0 a260 120 0 1 1 520 0', PINK, 4)}`;
const crack = line('M-60 -150 L-10 -40 L-30 20 L20 90 M-10 -40 L50 -70 M-30 20 L-70 50', '#ffffff', 1.5, 0.7);
const floorCall = (t, ringing) => phoneBody(ringing ? PINK : '#0b1d38', ringing ? `
  <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:01</text>
  <circle cx="0" cy="-70" r="30" fill="${PINK}"/><text x="0" y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#fff">B</text>
  <text x="0" y="-12" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="800" font-size="19" fill="#fff">Brooke (ex) 🚩</text>
  <text x="0" y="8" text-anchor="middle" font-family="Inter" font-size="11" fill="#c9d4ea">incoming call · 2 missed</text>
  ${callIcon(-40, 110, '#ff4d4d', 180)}${callIcon(40, 110, '#3ddc84')}${crack}` : crack);
const contactScreen = (tap) => phoneBody(PINK, `
  <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:02</text>
  <circle cx="0" cy="-78" r="28" fill="${PINK}"/><text x="0" y="-68" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#fff">B</text>
  <text x="0" y="-28" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="800" font-size="16" fill="#fff">Brooke (ex) 🚩</text>
  <text x="0" y="-10" text-anchor="middle" font-family="Inter" font-size="10" fill="#c9d4ea">3 missed calls</text>
  ${['message', 'call', 'video'].map((n, i) => `<circle cx="${-44 + i * 44}" cy="22" r="15" fill="#2a3a5c"/><text x="${-44 + i * 44}" y="50" text-anchor="middle" font-family="Inter" font-size="8" fill="#c9d4ea">${n}</text>`).join('')}
  <path d="${rr(-62, 74, 124, 30, 9)}" fill="#ff4d4d" opacity="${tap ? 1 : 0.3}"/><text x="0" y="94" text-anchor="middle" font-family="Inter" font-weight="800" font-size="12" fill="#fff">Block this Caller</text>
  ${tap ? `<circle cx="20" cy="89" r="${12 + tap * 10}" fill="#fff" opacity="${0.35 * (1 - tap)}"/>` : ''}`);
const messages = (pop) => phoneBody(PINK, `
  <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:02</text>
  <circle cx="0" cy="-92" r="16" fill="${PINK}"/><text x="0" y="-86" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#fff">B</text>
  <text x="0" y="-62" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="700" font-size="11" fill="#fff">Brooke (ex) 🚩</text>
  <path d="M-72 -50 H72" stroke="#24314f"/>
  <path d="${rr(-62, -32, 108, 34, 15)}" fill="#2a3a5c"/><text x="-50" y="-10" font-family="Inter" font-size="12" fill="#fff">I'm sorry. Please.</text>
  <g transform="translate(-62 27) scale(${pop}) translate(62 -27)"><path d="${rr(-62, 10, 92, 34, 15)}" fill="#2a3a5c"/><text x="-50" y="32" font-family="Inter" font-weight="800" font-size="14" fill="#fff">I'm outside.</text></g>
  <text x="-60" y="58" font-family="Inter" font-size="8" fill="#8aa0c8" opacity="${pop ? 1 : 0}">Delivered · 5:02 AM</text>`);

// End card: follow (find out what Kai does) + share (the joke), synced to the CTA voice
function endCard(t) {
  const a = ease((t - END_CARD) / 0.3), b = easeOutBack((t - CTA2) / 0.35), f = CTA.words[0].s;
  const tap = t > f + 0.3 && t < f + 0.8 ? (t - f - 0.3) / 0.5 : 0;
  const txt = (y, size, color, s) => `<text x="540" y="${y}" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="900" font-size="${size}" fill="${color}" stroke="#000" stroke-width="9" style="paint-order:stroke">${s}</text>`;
  return `<rect width="1080" height="1920" fill="#050c1c" opacity="${0.68 * a}"/>
    <g opacity="${a}" transform="translate(0 ${(1 - a) * 40})">
      <path d="${rr(370, 640, 340, 96, 48)}" fill="${PINK}"/><path d="${rr(370, 640, 340, 96, 48)}" fill="none" stroke="${PINK}" stroke-width="16" opacity="0.4" filter="url(#neon)"/>
      <text x="540" y="704" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="#fff">+ FOLLOW</text>
      ${tap ? `<circle cx="600" cy="690" r="${20 + tap * 50}" fill="#fff" opacity="${0.5 * (1 - tap)}"/>` : ''}
      ${txt(830, 58, '#fff', 'TO SEE IF KAI')}${txt(900, 58, '#fff', 'OPENS THE DOOR 🚪')}
    </g>
    ${t >= CTA2 ? `<g transform="translate(540 1180) scale(${b}) translate(-540 -1180)">
      <g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M540 1040 v-70 M510 1000 l30 -30 l30 30 M490 1010 h-20 v70 h140 v-70 h-20"/></g>
      ${txt(1150, 50, '#fff', 'SEND THIS TO THE FRIEND')}${txt(1212, 50, '#fff', 'WHO STILL ANSWERS')}${txt(1274, 50, PINK, 'THEIR EX AT 5 AM 🚩')}
    </g>` : ''}`;
}

// ---------- scenes ----------
const SCENES = [
  { to: HOOK_END, draw: t => hook.frameAt(t) },
  // A. Brooke in her car, crying
  { to: BROOKE.end, draw: (t, u, d) => {
    const sob = Math.sin(t * 15) * 2.5 * (Math.sin(t * 2.3) > 0 ? 1 : 0.3);
    return svgDoc(1080, 1920, push(1 + 0.06 * u / d, car(t) + character('brooke', 380, 1740, 2.6, { t, face: 'crying', pose: { ...AT_EAR, bob: sob } }) + earPhone(380, 1740 - sob * 2.47, 2.6 * 0.95) + dash())
      + captions(t, BROOKE, { color: PINK, quote: true }) + partLabel());
  } },
  // B. Kai thinking, glow warms toward pink
  { to: N1.end, draw: (t, u, d) => {
    const warm = 0.45 * Math.sin(Math.PI * clamp(u / d));
    return svgDoc(1080, 1920, blur(bedroom(), 0.25) + soft(540, 1000, 340, PINK, 0.05 + 0.1 * warm)
      + push(1 + 0.07 * u / d, character('kai', 560, 2020, 3.4, { t, face: 'thinking', dir: -1, color: mix(KAI, PINK, warm), pose: AT_EAR }) + earPhone(560 + 80 * 3.4, 2020, 3.4), 540, 1000)
      + captions(t, N1) + partLabel());
  } },
  // C. Brooke waiting, hopeful
  { to: N2.end, draw: (t, u, d) => {
    const breath = Math.sin(t * 3) * 3;
    return svgDoc(1080, 1920, blur(car(t), 0.4) + push(1 + 0.05 * u / d, character('brooke', 520, 2080, 3.7, { t, face: 'hopeful', pose: { ...AT_EAR, bob: breath } }) + earPhone(520, 2080 - breath * 3.5, 3.7 * 0.95), 540, 1000)
      + captions(t, N2) + partLabel());
  } },
  // D. "No." He throws the phone
  { to: NO.end, draw: (t) => {
    const k = ease((t - THROW) / 0.15);
    const pose = lerpPose({ ...AT_EAR, lean: 0 }, { lean: 12, bob: 0, legL: [22, -10], legR: [-26, -6], armR: [100, 8], armL: [-45, 25] }, k);
    const S = 1.5, hx = 420 - 40 * S, hy = 1480 - 316 * S;
    let ph = '';
    if (t < THROW) ph = earPhone(420, 1480, S);
    else {
      const f = clamp((t - THROW) / 0.3), fall = ease((t - IMPACT) / 0.3);
      const x = lerp(hx + 120, 990, f), y = lerp(hy, 980, f) - Math.sin(Math.PI * f) * 120 + fall * 490;
      for (let i = 3; i >= 1; i--) { const g = clamp(f - i * 0.12); if (t < IMPACT) ph += `<g transform="translate(${lerp(hx + 120, 990, g)},${lerp(hy, 980, g) - Math.sin(Math.PI * g) * 120}) rotate(${g * 720}) scale(0.4)" opacity="${0.12 * (4 - i)}"><path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="5"/></g>`; }
      ph += `<g transform="translate(${x},${y}) rotate(${f * 720 + fall * 80}) scale(0.4)"><path d="${rr(-80, -165, 160, 330, 30)}" fill="#0b1d38" stroke="${P.white}" stroke-width="5"/></g>`;
    }
    const shake = t > IMPACT && t < IMPACT + 0.25 ? (1 - (t - IMPACT) / 0.25) * 10 : 0;
    return svgDoc(1080, 1920, `<g transform="translate(${Math.sin(t * 90) * shake},${Math.cos(t * 70) * shake}) rotate(-6 540 1100)">${bedroom()}
      ${character('kai', 420, 1480, S, { t, face: t < NO.words[0].s ? 'sad' : 'firm', speed: k * 0.6, pose })}${ph}</g>
      ${captions(t, NO, { size: 120, quote: true, color: '#fff' })}${partLabel()}`);
  } },
  // E. Low angle: he freezes, the cracked phone rings again
  { to: N3.end, draw: (t, u) => {
    const k = ease(u / 0.35), ringing = t >= CALL_AGAIN;
    const pose = lerpPose({ lean: 8, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [-10, 10], armR: [10, 10] }, { lean: -4, bob: 0, legL: [8, -4], legR: [-8, -4], armL: [-80, -110], armR: [80, 110] }, k);
    const buzz = ringing && ((t - CALL_AGAIN) % 0.7) < 0.4 ? Math.sin(t * 190) * 3 : 0;
    let rings = '';
    if (ringing) for (let i = 0; i < 2; i++) { const ph = ((t - CALL_AGAIN + i * 0.35) % 0.7) / 0.7; rings += `<circle cx="0" cy="0" r="${180 + ph * 160}" fill="none" stroke="${PINK}" stroke-width="4" opacity="${(1 - ph) * 0.5}"/>`; }
    return svgDoc(1080, 1920, bedroom(0.7) + character('kai', 680, 1420, 1.35, { t, face: 'shocked', pose })
      + (ringing ? soft(300, 1415, 220, PINK, 0.2) : '')
      + `<g transform="translate(${300 + buzz},1415) rotate(-14) scale(0.8)">${rings}${floorCall(t, ringing)}</g>`
      + captions(t, N3) + partLabel());
  } },
  // F. Flashback in pink: what it cost him
  { to: N4.end, draw: (t, u) => {
    const trig = [N4.words[0].s, N4.words.find(w => w.w === 'Six').s, N4.words.find((w, i) => i > 5 && w.w === 'And').s];
    const slide = i => lerp(-1100, 0, easeOutBack((t - trig[i]) / 0.4));
    const panel = (i, y, rot, label, inner) => t < trig[i] ? '' : `<g transform="translate(${slide(i)} 0) rotate(${rot} 540 ${y + 140})"><path d="${rr(130, y, 820, 290, 18)}" fill="#0b1d38" stroke="#fff" stroke-width="3"/>${inner}
      <text x="160" y="${y + 40}" font-family="Inter" font-weight="900" font-size="22" letter-spacing="4" fill="#fff">${label}</text></g>`;
    const sit = dir => ({ lean: 0, bob: -40, legL: [80, -80], legR: [70, -70], armL: [60, 40], armR: [50, 40] });
    const bal = Math.round(lerp(4212, 39, ease((t - trig[2] - 0.3) / 1.3)));
    const body = panel(0, 560, -2, '2024 · DATE NIGHTS', `${line('M200 790 h420', '#fff', 3)}${character('kai', 300, 845, 0.62, { t, face: 'happy', pose: sit() })}${character('brooke', 530, 845, 0.62, { t, face: 'happy', dir: -1, pose: sit() })}
        <g transform="translate(790,700) rotate(6) scale(0.62)">${PROPS.RECEIPT()}</g><text x="790" y="845" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#fff">$186.40</text>`)
      + panel(1, 890, 1.5, '2025 · "RENT HELP"', `<circle cx="250" cy="1040" r="40" fill="#fff" opacity="0.9"/><text x="250" y="1054" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#0b1d38">B</text>
        <text x="320" y="1020" font-family="Inter" font-weight="800" font-size="30" fill="#fff">Brooke requested $300</text>
        <text x="320" y="1060" font-family="Inter, Noto Color Emoji" font-size="24" fill="#fff" opacity="0.85">"rent help 🥺 pay u back friday"</text>
        <path d="${rr(320, 1090, 160, 50, 25)}" fill="#fff"/><text x="400" y="1123" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="#0b1d38">PAID ✓</text>
        <text x="510" y="1123" font-family="Inter" font-size="22" fill="#fff" opacity="0.7">x 14 times</text>`)
      + panel(2, 1220, -1, 'NOW · THE MATH', `<text x="170" y="1360" font-family="Inter" font-weight="900" font-size="64" fill="#fff" opacity="0.55">$4,212</text>${line('M165 1340 h250', '#fff', 6)}
        <text x="460" y="1360" font-family="Inter" font-weight="900" font-size="34" fill="#fff">→</text>
        <text x="520" y="1370" font-family="Inter" font-weight="900" font-size="96" fill="#fff">$${bal.toLocaleString('en-US')}</text>${line('M720 1290 l50 20 l40 -10 l50 60 l40 10 l20 70', '#fff', 5)}`);
    const flicker = 0.93 + 0.07 * Math.sin(t * 37) * Math.sin(t * 13);
    return svgDoc(1080, 1920, `<filter id="pinkTint"><feColorMatrix type="saturate" values="0"/><feColorMatrix values="1 0 0 0 0.08  0 0.55 0 0 0  0 0 0.8 0 0.05  0 0 0 1 0"/></filter>
      <rect width="1080" height="1920" fill="${PINK}" opacity="0.08"/><g filter="url(#pinkTint)" opacity="${flicker}">${body}</g>
      <rect width="1080" height="1920" fill="#ffd6ea" opacity="${0.7 * (1 - clamp(u / 0.18))}"/>
      ${captions(t, N4)}${partLabel()}`);
  } },
  // G. He goes to block her. "I'm outside." Knocks.
  { to: DUR, draw: (t, u) => {
    const tap = t >= BLOCK_T && t < TEXT_T ? clamp((t - BLOCK_T) / 0.5) : 0;
    const pop = t >= TEXT_T ? easeOutBack((t - TEXT_T) / 0.3) : 0;
    const light = ease((t - TEXT_T) / 0.6);
    const knock = [KNOCK1, KNOCK2].reduce((a, k) => a + (t > k && t < k + 0.15 ? (1 - (t - k) / 0.15) * 4 : 0), 0);
    const fade = clamp((t - (DUR - 0.6)) / 0.6);
    const end = t >= END_CARD;
    return svgDoc(1080, 1920, `${push(1 + 0.04 * u / (DUR - N4.end), `
      ${line('M0 1480 H1080', P.line, 3)}
      <g transform="translate(${Math.sin(t * 120) * knock},0)">${neon('M700 1000 h260 v480 M700 1480 V1000', P.warm, 3)}${line('M720 1020 h220 v200 h-220 Z M720 1250 h220 v200 h-220 Z', P.warm, 2, 0.5)}
      <circle cx="725" cy="1250" r="9" fill="${P.warm}"/><circle cx="830" cy="1100" r="7" fill="${PINK}" opacity="${light}" filter="url(#glow)"/></g>
      <rect x="704" y="1472" width="252" height="10" fill="${PINK}" opacity="${light}" filter="url(#glow)"/><ellipse cx="830" cy="1490" rx="260" ry="26" fill="${PINK}" opacity="${0.35 * light}" filter="url(#b10)"/>
      ${character('kai', 330, 1480, 1.35, { t, face: t < TEXT_T ? 'determined' : 'shocked', pose: { lean: -2, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-8, 10], armR: [60, 80] } })}
      <g transform="translate(560,760) rotate(4) scale(1.15)">${t < TEXT_T ? contactScreen(tap) : messages(pop)}</g>`, 700, 1200)}
      ${t < TEXT_T ? captions(t, N5) : `<text x="540" y="470" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${72 * (0.9 + 0.1 * pop)}" fill="${PINK}" stroke="#000" stroke-width="11" style="paint-order:stroke">"I'M OUTSIDE."</text>`}
      ${end ? endCard(t) : ''}${partLabel()}
      <rect width="1080" height="1920" fill="#000" opacity="${fade}"/>`);
  } },
];

function frameAt(t) {
  let from = 0;
  for (const s of SCENES) { if (t < s.to) return s.draw(t, t - from, s.to - from); from = s.to; }
  const last = SCENES[SCENES.length - 1];
  return last.draw(t, t - from, 1);
}

// ---------- audio timeline ----------
function timeline() {
  const v = (c, extra = {}) => ({ file: `${AUD}/${c.name}.mp3`, at: c.at, ...extra });
  const sc = SCENES.map(s => s.to);
  const fx = [
    { fx: 'ring', args: [0, hook.RING_END] }, { fx: 'vib', args: [0, hook.RING_END] }, { fx: 'whoosh', args: [hook.ZOOM_A] }, { fx: 'hit', args: [hook.NAME_T] }, { fx: 'click', args: [hook.RING_END] },
    { fx: 'drone', args: [0, sc[4]] }, { fx: 'drone', args: [sc[5], DUR, 0.2, 49] },
    { fx: 'rain', args: [sc[0], sc[1]] }, { fx: 'rain', args: [sc[2], sc[3]] },
    { fx: 'whoosh', args: [THROW, 0.3] }, { fx: 'crash', args: [IMPACT] },
    { fx: 'vib', args: [CALL_AGAIN, sc[5], 0.9] },
    { fx: 'whoosh', args: [sc[5], 0.4] }, { fx: 'pad', args: [sc[5], sc[6]] },
    { fx: 'click', args: [BLOCK_T] }, { fx: 'text_tone', args: [TEXT_T] }, { fx: 'knock', args: [KNOCK1] }, { fx: 'knock', args: [KNOCK2] }, { fx: 'hit', args: [KNOCK2 + 0.35, 45] },
  ];
  for (let b = sc[1]; b < sc[3]; b += 0.62) fx.push({ fx: 'beat', args: [b] });
  return {
    dur: DUR,
    voices: [
      { file: `${AUD}/hook-vo-andrew.mp3`, at: hook.VO_OFF },
      v(BROOKE, { filter: 'vibrato=f=5.5:d=0.18,tremolo=f=5:d=0.2', gain: 0.95 }),
      v(N1), v(N2), v(NO), v(N3), v(N4), v(N5), v(CTA),
    ],
    sfx: fx,
  };
}

const TEST = process.argv.indexOf('--test');
if (TEST > 0) (async () => {
  // quick check: render a contact strip of chosen times
  const out = process.argv[TEST + 1];
  const b = await chromium.launch(), pg = await b.newPage();
  await pg.setViewportSize({ width: 1080, height: 1920 });
  const times = process.env.TIMES ? process.env.TIMES.split(',').map(Number) : SCENES.map((s, i) => (i ? SCENES[i - 1].to : 0) * 0.3 + s.to * 0.7);
  console.log('scenes end at', SCENES.map(s => s.to.toFixed(2)).join(' '), 'throw', THROW.toFixed(2), 'text', TEXT_T.toFixed(2), 'dur', DUR.toFixed(2));
  for (let i = 0; i < times.length; i++) { await pg.setContent(`<html><body style="margin:0">${frameAt(times[i])}</body></html>`); await pg.screenshot({ path: `${out}/t${i}.png` }); }
  await b.close();
})();
else (async () => {
  const tmp = fs.mkdtempSync(os.tmpdir() + '/ep01-');
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
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-shortest', `${DIR}/ep01-the-5am-call.mp4`]);
  fs.copyFileSync(`${tmp}/mix.wav`, `${AUD}/ep01-mix.wav`);
  fs.rmSync(tmp, { recursive: true });
  console.log('rendered ep01-the-5am-call.mp4', DUR.toFixed(2) + 's');
})();
