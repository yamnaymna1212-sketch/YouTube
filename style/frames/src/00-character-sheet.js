const { page, who } = require('./_base');
const poses = [['idle', 'وقوف'], ['walk', 'مشي'], ['holdLedger', 'يحمل الدفتر'], ['point', 'يشير إلى دليل'], ['inspect', 'يفحص بالعدسة'], ['write', 'يدوّن'], ['stamp', 'يختم: مُدقَّق'], ['shrug', 'واثق: يداه على خصره']];
exports.html = () => page(`
<div class="h1" style="position:absolute;top:110px;right:190px;font-size:64px">المدقّق <span style="font-family:Oswald;font-weight:500;font-size:40px;color:#e8b23a;letter-spacing:.2em;margin-right:18px">THE AUDITOR · v2</span></div>
<div style="position:absolute;top:200px;right:190px;font-size:26px;opacity:.7">نفس الهيكل الهندسي في كل وضعية، والذراعان بمفصلين، والأدوات قابلة للتبديل</div>
${poses.map(([p, l], i) => `
  ${who(p, 1660 - (i % 4) * 400, 260 + Math.floor(i / 4) * 400, 360)}
  <div style="position:absolute;top:${630 + Math.floor(i / 4) * 400}px;left:${1660 - (i % 4) * 400 + 20}px;width:160px;text-align:center;font-family:'Noto Kufi Arabic';font-size:22px;color:#e8b23a">${l}</div>`).join('')}
`, { caseNo: '00', caseName: 'CHARACTER SHEET', date: 'STYLE v2' });
