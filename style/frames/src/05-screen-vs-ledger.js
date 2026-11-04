const { page, who, A } = require('./_base');
// The channel's signature device: SCREEN (what you see) vs LEDGER (what really happened).
const pane = (side, title, color, body) => `
<div style="position:absolute;top:150px;${side}:110px;width:760px;height:540px;background:#0b1626;border:3px solid ${color};border-radius:18px;box-shadow:16px 20px 0 rgba(0,0,0,.35);overflow:hidden">
  <div style="height:58px;background:#111d30;display:flex;align-items:center;gap:10px;padding:0 22px;direction:ltr">
    <i style="width:14px;height:14px;border-radius:50%;background:#d6453d"></i><i style="width:14px;height:14px;border-radius:50%;background:#e8b23a"></i><i style="width:14px;height:14px;border-radius:50%;background:#3fa36b"></i>
    <span style="margin-left:18px;font-family:'IBM Plex Mono';font-size:18px;color:rgba(237,230,214,.6)">${side === "left" ? "etherscan.io/tx/… (on-chain)" : "app.safe.global"}</span>
  </div>
  <div style="padding:40px 48px;direction:ltr;font-family:'IBM Plex Mono';font-size:24px;line-height:1.9;color:#cfd6e2">${body}</div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:84px;background:${color};display:flex;align-items:center;justify-content:center;font-family:'Noto Kufi Arabic';font-weight:900;font-size:38px;color:#0f2a46">${title}</div>
</div>`;
exports.html = () => page(`
${pane('right', 'الشاشة', '#3fa36b', `
  <b style="font-family:Oswald;font-size:30px;color:#fff">Safe{Wallet}</b><br>
  Operation: <b style="color:#7fd6a0">Transfer</b><br>
  To: <b style="color:#7fd6a0">Bybit Warm Wallet ✓</b><br>
  Value: <b style="color:#7fd6a0">routine</b><br>
  Signatures: <b>3 / 3</b>`)}
${pane('left', 'الدفتر', '#d6453d', `
  <span style="color:#ff8a80">// what was actually signed</span><br>
  Operation: <b style="color:#ff6b5e">delegatecall</b><br>
  To: <b style="color:#ff6b5e">0x9622…7242</b> (attacker)<br>
  Effect: <b style="color:#ff6b5e">replace wallet logic</b><br>
  From: 0x1Db9…FCF4 (ETH cold wallet)`)}
<div style="position:absolute;top:370px;left:50%;margin-left:-46px;width:92px;height:92px;border-radius:50%;background:#e8b23a;color:#0f2a46;display:flex;align-items:center;justify-content:center;font-family:Oswald;font-weight:700;font-size:40px;z-index:20;box-shadow:0 0 0 10px #0f2a46">≠</div>
<div class="h1" style="position:absolute;bottom:105px;left:0;right:0;text-align:center;font-size:54px">الشاشة تقول شيئاً. <span style="color:#e8b23a">الدفتر يقول شيئاً آخر.</span></div>
${who('inspect', 872, 500, 330)}
<div style="position:absolute;top:160px;left:0;right:0;text-align:center;z-index:25"><span style="font-family:'Noto Kufi Arabic';font-size:18px;background:#d6453d;color:#fff;padding:4px 14px;border-radius:4px">إعادة تمثيل توضيحية</span></div>
`, { src: 'NCC Group technical analysis · Ben Zhou statement, 21 Feb 2025 · Etherscan' });
