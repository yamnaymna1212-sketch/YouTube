const { chromium } = require('playwright'); const path = require('path');
(async () => { const dir = process.argv[2];
  const pages = [['en-cast',1080,1960],['en-thumbs',1280,2178],['en-banner',2560,1440],['en-avatar',800,800],['en-bible',1080,2180]];
  const b = await chromium.launch();
  for (const [n,w,h] of pages) { const p = await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:n==='en-banner'?1:1.5});
    await p.goto('file://'+path.join(dir,n+'.html')); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(500);
    await p.screenshot({path:path.join(dir,'out-en',n+'.png')}); await p.close(); }
  await b.close(); })();
