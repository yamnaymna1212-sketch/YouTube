const { page, A } = require('./_base');
// Template: how ANY real person enters the video. Same card for everyone -> consistent brand.
const card = (img, x, name, en, role, credit, rot) => `
<div style="position:absolute;left:${x}px;top:190px;width:640px;height:640px;transform:rotate(${rot}deg)">
  <div style="position:absolute;inset:0;background:#e8b23a;clip-path:polygon(0 8%,100% 0,96% 100%,4% 94%)"></div>
  <div class="dots" style="clip-path:polygon(0 8%,100% 0,96% 100%,4% 94%)"></div>
  <img class="cut" src="${A}${img}" style="position:absolute;left:50%;bottom:60px;transform:translateX(-50%);height:540px">
  <div class="label" style="position:absolute;right:-30px;bottom:-10px;font-size:38px">${name}<small>${en} · ${role}</small></div>
</div>
<div style="position:absolute;left:${x}px;top:900px;font-family:'IBM Plex Mono';font-size:15px;color:rgba(237,230,214,.55);direction:ltr">${credit}</div>`;
exports.html = () => page(`
${card('person_donald_trump_cut.png', 1060, 'دونالد ترامب', 'DONALD J. TRUMP', 'الرئيس الأمريكي', 'Official portrait: whitehouse.gov · U.S. Gov. work, public domain', 2)}
${card('person_kim_jong_un_cut.png', 240, 'كيم جونغ أون', 'KIM JONG UN', 'زعيم كوريا الشمالية', 'Photo: Kremlin.ru, 19 Jun 2024 · CC BY 4.0', -2)}
<div style="position:absolute;top:110px;left:0;right:0;text-align:center;font-family:'Noto Kufi Arabic';font-size:26px;opacity:.75">قالب الشخصيات الحقيقية: صورة مرخّصة · قص · أبيض وأسود · بطاقة اسم · حاشية المصدر</div>
`, { caseNo: '00', caseName: 'PEOPLE CARD', date: 'TEMPLATE', src: 'Every real photo is logged in people-kit/people.json (licence + URL + author)' });
