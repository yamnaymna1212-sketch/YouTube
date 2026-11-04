const { page, who, A } = require('./_base');
// Dashed white network (from the channel's reference style) + real logos as evidence tags.
function network(seed = 7) {
  let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  let out = '';
  for (let i = 0; i < 70; i++) {
    const x = 1000 + rnd() * 380, y = 280 + rnd() * 500;
    out += `<path d="M560 520 C ${760 + rnd() * 120} ${300 + rnd() * 440}, ${880 + rnd() * 80} ${y}, ${x} ${y}" stroke="rgba(237,230,214,${.25 + rnd() * .35})" stroke-width="2" stroke-dasharray="7 9" fill="none"/>
            <text x="${x}" y="${y + 7}" font-size="20" fill="rgba(237,230,214,.75)" text-anchor="middle" font-family="IBM Plex Mono">×</text>`;
  }
  return out;
}
const donut = (cx, cy, R, parts) => { let a = -90, s = ''; for (const [v, c] of parts) { const e = a + v * 3.6; const p = (d) => [cx + R * Math.cos(d * Math.PI / 180), cy + R * Math.sin(d * Math.PI / 180)]; const [x1, y1] = p(a), [x2, y2] = p(e); s += `<path d="M${x1} ${y1} A${R} ${R} 0 ${v > 50 ? 1 : 0} 1 ${x2} ${y2}" stroke="${c}" stroke-width="34" fill="none"/>`; a = e; } return s; };
exports.html = () => page(`
<svg style="position:absolute;inset:0" width="1920" height="1080">
  <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <g filter="url(#glow)">${network()}</g>
  <path d="M350 470 L500 500" stroke="#e8b23a" stroke-width="4" stroke-dasharray="10 8"/>
</svg>
<div class="tag" style="left:130px;top:330px;transform:rotate(-4deg)"><img src="${A}ethereum_logo_2014.svg" style="height:120px"><span>ETHEREUM</span><i>~500 ألف ETH</i></div>
<div class="tag" style="left:470px;top:440px;transform:rotate(3deg);padding:26px 26px 18px"><img src="${A}thorchain_icon.png" style="height:90px"><span>THORCHAIN</span><i>~361 ألف ETH</i></div>
<div class="tag" style="left:1360px;top:780px;transform:rotate(-3deg)"><img src="${A}bitcoin.svg" style="height:90px"><span>BITCOIN</span><i>6,954 محفظة</i></div>
<div style="position:absolute;right:190px;top:130px;text-align:right">
  <div class="h1" style="font-size:58px">عشرة أيام</div>
  <div style="font-size:28px;opacity:.75;margin-top:6px">كل الإيثيريوم المسروق تقريباً… تحرّك</div>
</div>
<svg style="position:absolute;right:170px;top:330px" width="330" height="330">${donut(165, 165, 120, [[77, '#e8b23a'], [20, '#252a33'], [3, '#d6453d']])}
  <text x="165" y="160" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="58" fill="#ede6d6">77%</text>
  <text x="165" y="200" text-anchor="middle" font-family="Noto Kufi Arabic" font-size="22" fill="#ede6d6" opacity=".7">قابل للتتبع</text></svg>
<div style="position:absolute;right:190px;top:680px;font-size:24px;line-height:1.9;text-align:right">
  <div><b style="color:#e8b23a">■</b> 77% قابل للتتبع</div><div><b style="color:#5b6473">■</b> 20% اختفى</div><div><b style="color:#d6453d">■</b> 3% مجمّد</div></div>
${who('write', 40, 690, 360)}
`, { src: 'Cointelegraph (4 Mar 2025, Ben Zhou figures) · The Hacker News (7 Mar 2025)' });
