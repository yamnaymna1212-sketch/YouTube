const { chromium } = require('playwright'); const path = require('path');
(async () => { const dir = process.argv[2];
  const pages = [['en-frame-8-case',1080,1920],['en-frame-9-reader',1080,1920]];
  const b = await chromium.launch();
  for (const [n,w,h] of pages) { const p = await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1.5});
    await p.goto('file://'+path.join(dir,n+'.html')); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({path:path.join(dir,'out-en',n+'.png')}); await p.close(); }
  await b.close(); })();
