const { page, who, A } = require('./_base');
// Real money: Federal Reserve image of the $100 note (uscurrency.gov), shown one-sided and NOT at actual size
// (31 CFR 411.1 rules for currency illustrations). Never shown flat & full-frame like a printable note.
let r = 3; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
const bill = (x, y, w, rot, o = 1) => `<img src="${A}usd100_front_2013.jpg" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);opacity:${o};box-shadow:10px 14px 0 rgba(0,0,0,.3);border-radius:3px">`;
const stack = (x, y, n) => Array.from({ length: n }, (_, i) => bill(x + rnd() * 10, y - i * 9, 420, -2 + rnd() * 4)).join('');
exports.html = () => page(`
${Array.from({ length: 7 }, () => bill(80 + rnd() * 420, 470 + rnd() * 260, 240 + rnd() * 80, -35 + rnd() * 70, .9)).join('')}
${stack(560, 700, 9)}${stack(1000, 730, 12)}
<div class="tag" style="left:150px;top:200px;transform:rotate(-5deg);padding:34px 40px 22px"><img src="${A}bybit_logo.svg" style="height:56px"><span>BYBIT</span><i>المحفظة الباردة · ETH</i></div>
<div style="position:absolute;right:190px;top:150px;text-align:right;z-index:20">
  <div style="font-family:'Noto Kufi Arabic';font-size:30px;opacity:.8">ما خرج من الخزنة في دقائق</div>
  <div class="num" style="font-size:150px;line-height:1.05;text-shadow:8px 10px 0 rgba(0,0,0,.35)">$1,460,000,000</div>
</div>
<div style="position:absolute;right:190px;top:400px;z-index:20;display:flex;gap:16px;direction:ltr">
  ${[['401,347', 'ETH'], ['90,376', 'stETH'], ['15,000', 'cmETH'], ['8,000', 'mETH']].map(([n, t]) => `<div style="background:#ede6d6;color:#15171c;padding:12px 18px;border-radius:8px;box-shadow:8px 10px 0 rgba(0,0,0,.3);display:flex;align-items:center;gap:10px"><img src="${A}ethereum_logo_2014.svg" style="height:34px"><b style="font-family:Oswald;font-size:30px">${n}</b><span style="font-family:Oswald;font-size:20px;color:#6b7080">${t}</span></div>`).join('')}
</div>
${who('holdLedger', 1500, 560, 440, true)}
`, { src: 'Nansen via IBTimes (asset breakdown) · $100 note image: uscurrency.gov (U.S. Federal Reserve)' });
