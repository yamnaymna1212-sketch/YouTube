const { page, who, A } = require('./_base');
// Real person = real licensed photo, cut out, B&W + paper edge + name card + licence credit on screen.
exports.html = () => page(`
<!-- real place, faded: the Kremlin photo set is CC BY 4.0 -->
<div style="position:absolute;left:0;top:0;width:1100px;height:1080px;background:radial-gradient(ellipse at 45% 45%, rgba(214,69,61,.28), transparent 62%)"></div>
<img class="cut" src="${A}person_kim_jong_un_cut.png" style="left:230px;top:250px;height:620px">
<div style="position:absolute;left:230px;top:850px;width:930px;height:40px;background:#ede6d6;box-shadow:14px 18px 0 rgba(0,0,0,.35)"></div>
<div class="tag" style="left:930px;top:200px;transform:rotate(6deg);padding:30px 26px 18px"><svg width="150" height="75" viewBox="0 0 72 36"><rect width="72" height="36" fill="#024fa2"/><rect y="6" width="72" height="24" fill="#fff"/><rect y="7" width="72" height="22" fill="#ed1c27"/><circle cx="24" cy="18" r="8" fill="#fff"/><path d="M24 11.2l1.6 4.9h5.1l-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3h5.1z" fill="#ed1c27"/></svg><span>DPRK</span></div>
<div class="label" style="right:190px;top:300px;font-size:44px;padding:14px 30px">كيم جونغ أون
  <small>KIM JONG UN · زعيم كوريا الشمالية</small></div>
<div style="position:absolute;right:190px;top:470px;width:560px;text-align:right">
  <div class="num" style="font-size:120px;line-height:1">$2.84B</div>
  <div style="font-size:28px;line-height:1.6;opacity:.85">سرقتها كوريا الشمالية من العملات الرقمية خلال 21 شهراً، حسب فريق مراقبة العقوبات متعدد الأطراف (MSMT)</div>
</div>
${who('inspect', 1430, 700, 330, true)}
<div style="position:absolute;left:230px;top:900px;font-family:'IBM Plex Mono';font-size:15px;color:rgba(237,230,214,.55);direction:ltr">Photo: Kremlin.ru, Pyongyang 19 Jun 2024 · CC BY 4.0</div>
`, { src: 'MSMT report, Oct 2025 (via WorldECR) · Photo: en.kremlin.ru/catalog/countries/KP/events/74334 (CC BY 4.0)' });
