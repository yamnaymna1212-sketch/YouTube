const { page, who, A } = require('./_base');
// Thumbnail concept (1280x720 export = this frame scaled). Max 3 words. Real logo kept small & unaltered.
exports.html = () => page(`
<div style="position:absolute;right:0;top:0;width:960px;height:1080px;background:#123d2a"></div>
<div style="position:absolute;left:0;top:0;width:960px;height:1080px;background:#4a1512"></div>
<div style="position:absolute;right:120px;top:230px;width:640px;height:400px;background:#0b1626;border:14px solid #252a33;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:230px;color:#3fdc87">✓</div>
<div style="position:absolute;left:120px;top:230px;width:640px;height:400px;background:#0b1626;border:14px solid #252a33;border-radius:20px;display:flex;align-items:center;justify-content:center;font-family:Oswald;font-weight:700;font-size:120px;color:#ff5a4e;direction:ltr">-$1.5B</div>
<style>.case,.src{display:none}</style>${who('point', 800, 250, 640)}
<div class="h1" style="position:absolute;bottom:70px;left:0;right:0;z-index:45;text-align:center;font-size:150px;color:#f2c230;text-shadow:10px 12px 0 #000, 0 0 40px rgba(0,0,0,.6)">وقّعوا بأنفسهم</div>
<img src="${A}bybit_logo.svg" style="position:absolute;right:130px;top:120px;height:60px;background:#fbf8f1;padding:14px 22px;border-radius:10px">
`, { caseNo: '01', caseName: 'THUMBNAIL', date: '' });
