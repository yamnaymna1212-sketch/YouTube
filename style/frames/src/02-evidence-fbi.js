const { page, who, ring, A } = require('./_base');
// Real FBI PSA (US government work, public domain). Shown as evidence, never re-styled or faked.
const W = 1020, s = W / 1560;
exports.html = () => page(`
<div class="doc" style="left:560px;top:170px;width:${W}px;transform:rotate(-1.8deg)">
  <img src="${A}fbi_ic3_psa250226_top.png" style="width:${W}px;display:block">
  <div class="hl" style="left:${300 * s}px;top:${475 * s}px;width:${960 * s}px;height:${42 * s}px"></div>
  <div class="hl" style="left:${48 * s}px;top:${614 * s}px;width:${1420 * s}px;height:${36 * s}px;opacity:.55"></div>
</div>
${ring(1030, 596, 175, 60, -3)}
<div class="label" style="right:190px;top:780px;transform:rotate(1.5deg)">بيان <bdi>FBI</bdi>: كوريا الشمالية هي الفاعل
  <small>Alert No. I-022625-PSA · 26 Feb 2025</small></div>
<div style="position:absolute;right:190px;top:900px;width:520px;font-size:27px;line-height:1.6;opacity:.85">«…مسؤولة عن سرقة حوالي <span class="num">1.5</span> مليار دولار من منصة Bybit في أو حوالي 21 فبراير 2025»</div>
${who('point', 110, 380, 560, true)}
`, { src: 'FBI / IC3 — ic3.gov/PSA/2025/PSA250226 (U.S. Gov. work, public domain)' });
