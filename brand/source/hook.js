// Episode 1 hook (first ~5 s): ringing phone, only the phone zooms in, kinetic captions synced to the narrator.
// Usage: node hook.js <episodeDir>   (expects audio/hook-vo-andrew.mp3 + .words.json)
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const { character, lerp } = require('./glow.js');
const { P, svgDoc, PROPS, rr } = require('./world.js');
const { line, soft, bedroom, phoneBody, callIcon, partLabel, PINK } = require('./ep01.js');

const DIR = process.argv[2];
const VO_OFF = -0.06; // voice starts right at 0:00
const FPS = 30, DUR = 5.0;
const words = JSON.parse(fs.readFileSync(`${DIR}/audio/hook-vo-andrew.words.json`)).map(w => ({ ...w, s: w.s + VO_OFF }));
const at = (w, n = 0) => words.filter(x => x.w === w)[n].s;
const ZOOM_A = at('my') - 0.12, ZOOM_B = ZOOM_A + 0.75, NAME_T = at('ex'), RING_END = at('and') - 0.12;
const TITLE_END = 3.0; // on-screen title for the first 3 seconds

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const easeOutBack = u => { const c = 1.6; u = clamp(u); return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
const easeInOut = u => { u = clamp(u); return u * u * (3 - 2 * u); };

// Caption groups; each word pops in when it's spoken. Key words get a color.
const GROUPS = [['At', '5 AM'], ['my', 'phone', 'rang'], ["It's", 'my', 'ex'], ['and', "she's", 'crying']];
const COLORS = { '5 AM': '#ff5a5a', ex: PINK, crying: '#8fd3ff' };
function captions(t) {
  let wi = 0, out = '';
  if (t < TITLE_END) return '';
  for (const g of GROUPS) {
    const ws = words.slice(wi, wi + g.length); wi += g.length;
    const next = words[wi];
    if (t < ws[0].s || (next && t >= next.s - 0.02 && GROUPS.indexOf(g) < GROUPS.length - 1)) continue;
    const parts = ws.map((w, i) => {
      const label = (g[i] === 'At' ? 'AT' : g[i].toUpperCase()) + (i === ws.length - 1 ? (g[i] === 'rang' || g[i] === 'crying' ? '.' : ',') : '');
      const seen = t >= w.s, pop = seen ? 1 + 0.25 * (1 - clamp((t - w.s) / 0.12)) : 0;
      return { label, seen, pop, color: COLORS[g[i]] || '#fff' };
    });
    const sizes = parts.map(p => p.label.replace(/[.,:']/g, "").length * 50 + p.label.replace(/[^.,:']/g, "").length * 18 + 26);
    let x = 540 - sizes.reduce((a, b) => a + b, 0) / 2;
    out += parts.map((p, i) => {
      const cx = x + sizes[i] / 2; x += sizes[i];
      return p.seen ? `<text x="${cx}" y="470" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${p.color}" stroke="#000" stroke-width="11" style="paint-order:stroke" transform="translate(${cx} 446) scale(${p.pop}) translate(${-cx} -446)">${p.label}</text>` : '';
    }).join('');
  }
  return out;
}

// Title card for the first 3 seconds: white box, black text, snaps in on frame 1
function title(t) {
  if (t >= TITLE_END + 0.15) return '';
  const s = t < TITLE_END ? 1 + 0.08 * Math.exp(-t * 14) : 1 - (t - TITLE_END) / 0.15;
  return `<g transform="translate(540 360) scale(${s}) translate(-540 -360)">
    <rect x="150" y="262" width="780" height="196" rx="22" fill="#fff"/>
    <text x="540" y="345" text-anchor="middle" font-family="Inter" font-weight="900" font-size="66" fill="#0a1426">AT 5 AM,</text>
    <text x="540" y="425" text-anchor="middle" font-family="Inter" font-weight="900" font-size="66" fill="#0a1426">MY PHONE RANG...</text></g>`;
}

// The call screen, with a name pop and the accepted / connected state
function callScreen(t) {
  const pop = t < NAME_T ? 0.85 : 1 + 0.35 * Math.exp(-(t - NAME_T) * 9) * Math.cos((t - NAME_T) * 30);
  const connected = t >= RING_END;
  let bars = '';
  if (connected) for (let i = 0; i < 17; i++) { const h = 6 + Math.abs(Math.sin(t * 9 + i * 1.7) * Math.cos(t * 4 + i)) * 26; bars += `<rect x="${-56 + i * 7}" y="${70 - h / 2}" width="4" height="${h}" rx="2" fill="${PINK}"/>`; }
  return phoneBody(PINK, `
    <text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#c9d4ea">5:00</text>
    <circle cx="0" cy="-72" r="30" fill="${PINK}" opacity="0.9"/><text x="0" y="-62" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#fff">B</text>
    <g transform="translate(0 -18) scale(${pop}) translate(0 18)"><text x="0" y="-12" text-anchor="middle" font-family="Inter, Noto Color Emoji" font-weight="800" font-size="19" fill="#fff">Brooke (ex) 🚩</text></g>
    <text x="0" y="8" text-anchor="middle" font-family="Inter" font-size="11" fill="#c9d4ea">${connected ? '00:0' + Math.floor(t - RING_END + 1) : 'incoming call'}</text>
    ${connected ? `${bars}<circle cx="0" cy="118" r="19" fill="#ff4d4d"/><path d="M-8 114 q8 -8 16 0 l-3 5 q-5 -3 -10 0 z" fill="#fff" transform="rotate(135 0 118)"/>`
      : `${callIcon(-40, 110, '#ff4d4d', 180)}${callIcon(40, 110, '#3ddc84')}<text x="-40" y="142" text-anchor="middle" font-family="Inter" font-size="8" fill="#c9d4ea">Decline</text><text x="40" y="142" text-anchor="middle" font-family="Inter" font-size="8" fill="#c9d4ea">Accept</text>`}
    ${t > RING_END - 0.25 && t < RING_END + 0.3 ? `<circle cx="40" cy="110" r="${19 + (t - RING_END + 0.25) * 60}" fill="none" stroke="#3ddc84" stroke-width="3" opacity="${clamp(1 - (t - RING_END + 0.25) / 0.55)}"/>` : ''}`);
}

function frameAt(t) {
  const z = easeOutBack((t - ZOOM_A) / (ZOOM_B - ZOOM_A));   // phone zoom (only the phone)
  const bg = easeInOut((t - ZOOM_A) / (ZOOM_B - ZOOM_A));    // background dims + blurs
  const ringing = t < RING_END, buzzing = ringing && (t % 0.7) < 0.4;
  const jx = buzzing ? Math.sin(t * 190) * 3 : 0, jr = buzzing ? Math.sin(t * 160) * 1.6 : 0;
  const pre = easeInOut(t / ZOOM_A) * 0.25; // slow push on the phone from frame 1
  const x = lerp(918, 540, z) + jx, y = lerp(1262, 1060, z), sc = lerp(0.3 + pre, 2.9, z), rot = lerp(-8, 0, z) + jr;
  const kai = `<g transform="rotate(-90 760 1282)">${character('kai', 760, 1282, 1.2, { t, face: 'asleep', glow: 0.55, droop: 0.4 })}</g>`;
  const blanket = `<path d="M400 1300 q60 -46 130 -30 q90 18 160 -6 q50 -14 90 6 v40 h-380 Z" fill="#0b1d38" opacity="0.92"/>${line('M400 1300 q60 -46 130 -30 q90 18 160 -6 q50 -14 90 6', P.warm, 3)}`;
  const clockPulse = 0.6 + 0.4 * Math.abs(Math.sin(t * 4.5));
  const room = `${bedroom()}<path d="M190 1285 m-70 0 a70 22 0 1 0 140 0 a70 22 0 1 0 -140 0" fill="#0b1d38" stroke="${P.warm}" stroke-width="3" opacity="0.9"/>
    ${kai}${blanket}<g transform="translate(850,1300) scale(0.28)" opacity="${clockPulse}">${PROPS['ALARM CLOCK']('5:00')}</g>`;
  // ring pulses around the phone while it rings
  let rings = '';
  if (ringing) for (let k = 0; k < 2; k++) { const ph = ((t + k * 0.35) % 0.7) / 0.7; rings += `<circle cx="0" cy="0" r="${180 + ph * 140}" fill="none" stroke="${PINK}" stroke-width="${3 / sc * 2.2}" opacity="${(1 - ph) * 0.5}"/>`; }
  const ceiling = `<polygon points="895,1325 925,1325 1060,560 760,560" fill="#dfe9ff" opacity="${0.07 * (1 - bg)}"/>${soft(905, 640, 160, '#dfe9ff', 0.12 * (1 - bg))}`;
  return svgDoc(1080, 1920, `
    <g opacity="${1 - bg * 0.85}">${room}${ceiling}</g>
    <g filter="url(#b10)" opacity="${bg * 0.6}">${room}</g>
    <rect width="1080" height="1920" fill="#06122a" opacity="${bg * 0.45}"/>
    ${soft(x, y, 260 * sc / 2.9 + 60, PINK, 0.1 + 0.12 * bg)}
    <g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})">${rings}${callScreen(t)}</g>
    ${title(t)}${captions(t)}${partLabel()}`);
}

module.exports = { frameAt, words, VO_OFF, RING_END, ZOOM_A, NAME_T };

if (require.main === module) (async () => {
  const tmp = fs.mkdtempSync(os.tmpdir() + '/hook-');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  await page.setContent('<html><body style="margin:0;background:#000"><div id="r"></div></body></html>');
  const N = Math.round(DUR * FPS);
  for (let i = 0; i < N; i++) {
    await page.evaluate(s => { document.getElementById('r').innerHTML = s; }, frameAt(i / FPS));
    await page.screenshot({ path: `${tmp}/f${String(i).padStart(4, '0')}.png` });
  }
  await browser.close();
  execFileSync('python3', [__dirname + '/hook_audio.py', `${DIR}/audio/hook-vo-andrew.mp3`, String(VO_OFF), `${tmp}/mix.wav`, String(RING_END), String(ZOOM_A), String(NAME_T)]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', `${tmp}/f%04d.png`, '-i', `${tmp}/mix.wav`,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-shortest', `${DIR}/hook.mp4`]);
  fs.copyFileSync(`${tmp}/mix.wav`, `${DIR}/audio/hook-mix.wav`);
  fs.rmSync(tmp, { recursive: true });
  console.log('rendered hook.mp4');
})();
