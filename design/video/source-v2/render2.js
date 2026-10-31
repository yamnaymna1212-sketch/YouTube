const { chromium } = require('playwright'); const path = require('path'); const fs=require('fs');
(async () => { const w=+process.argv[2], nw=+process.argv[3], total=1005, fps=30;
  fs.mkdirSync('frames',{recursive:true});
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1.5});
  await p.goto('file://'+path.resolve('anim2.html')); await p.evaluate(()=>window.ready); await p.waitForTimeout(300);
  for(let i=w;i<total;i+=nw){ const t=i/fps; await p.evaluate(t=>window.renderAt(t),t);
    await p.screenshot({path:`frames/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92}); }
  await b.close(); console.log('worker',w,'done'); })();
