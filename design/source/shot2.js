const { chromium } = require('playwright'); const path = require('path');
(async () => { const dir = process.argv[2];
  const pages = [['en-frame-5-page',1080,1920],['en-frame-6-psych',1080,1920],['en-frame-7-oneline',1080,1920],['en-formats',1080,1560]];
  const b = await chromium.launch();
  for (const [n,w,h] of pages) { const p = await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1.5});
    await p.goto('file://'+path.join(dir,n+'.html')); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({path:path.join(dir,'out-en',n+'.png')}); await p.close(); }
  await b.close(); })();
