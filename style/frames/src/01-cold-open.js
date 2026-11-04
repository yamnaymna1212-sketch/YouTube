const { page, who, A } = require('./_base');
const laptop = (x, y, n, signed) => `
<div style="position:absolute;left:${x}px;top:${y}px;width:330px">
  <div style="height:205px;background:#0b1626;border:10px solid #252a33;border-radius:14px 14px 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">
    <span style="font-family:'IBM Plex Mono';font-size:17px;color:#7fd6a0;direction:ltr">Transfer → Warm Wallet ✓</span>
    <span style="font-family:Oswald;font-weight:700;font-size:30px;letter-spacing:.12em;background:${signed ? '#e8b23a' : '#3a4150'};color:#0f2a46;padding:8px 34px;border-radius:8px">${signed ? 'SIGNED' : 'SIGN'}</span>
  </div>
  <div style="height:22px;background:#15171c;border-radius:0 0 18px 18px;margin:0 -24px"></div>
  <div style="text-align:center;margin-top:14px;font-family:Oswald;font-size:22px;letter-spacing:.2em;color:rgba(237,230,214,.6)">SIGNER ${n}</div>
</div>`;
exports.html = () => page(`
${laptop(1350, 520, 1, true)}${laptop(950, 520, 2, true)}${laptop(550, 520, 3, false)}
<div style="position:absolute;right:190px;top:150px;text-align:right">
  <div style="font-family:Oswald;font-size:30px;letter-spacing:.3em;color:#d6453d;direction:ltr">14:13:35 UTC</div>
  <div class="h1" style="font-size:150px;margin-top:4px;text-shadow:10px 12px 0 rgba(0,0,0,.35)">ثلاثة تواقيع</div>
  <div style="font-family:'Playfair Display';font-style:italic;font-size:40px;color:#e8b23a;margin-top:-6px;direction:ltr;text-align:right">Case File 01 — Bybit</div>
</div>
<div class="tag" style="left:150px;top:180px;transform:rotate(-6deg);padding:32px 40px 22px"><img src="${A}bybit_logo.svg" style="height:50px"><span>BYBIT</span></div>
<div class="tag" style="left:420px;top:240px;transform:rotate(4deg);padding:30px 28px 18px"><img src="${A}ethereum_logo_2014.svg" style="height:96px"><span>ETH</span></div>
${who('walk', 120, 520, 470)}
`, { src: 'Ben Zhou on X, 21 Feb 2025 · Rekt "Not So Safe" (signing time 14:13:35 UTC)' });
