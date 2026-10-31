const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = process.argv[2];
  const pages = [['brand-board',1080,1780],['characters',1080,1700],['icons',1080,1480],
    ['frame-1-hook',1080,1920],['frame-2-duo',1080,1920],['frame-3-guess',1080,1920],['frame-4-law',1080,1920],['thumbnail',1280,720]];
  const b = await chromium.launch();
  for (const [n,w,h] of pages) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor: n==='thumbnail'?1.5:1.5 });
    await p.goto('file://'+path.join(dir,n+'.html'));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(dir,'out',n+'.png') });
    await p.close();
  }
  await b.close();
})();
