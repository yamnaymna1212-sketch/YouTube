const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = process.argv[2];
  const pages = [['en-brand-board',1080,1760],['en-characters',1080,1680],['en-icons',1080,1400],
    ['en-frame-1-hook',1080,1920],['en-frame-2-duo',1080,1920],['en-frame-3-guess',1080,1920],['en-frame-4-law',1080,1920],['en-thumbnail',1280,720]];
  const b = await chromium.launch();
  for (const [n,w,h] of pages) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor: n==='en-thumbnail'?1.5:1.5 });
    await p.goto('file://'+path.join(dir,n+'.html'));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(dir,'out-en',n+'.png') });
    await p.close();
  }
  await b.close();
})();
