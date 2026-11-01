const { chromium } = require('playwright'); const path = require('path');
(async () => { const times=process.argv.slice(2).map(Number);
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file://'+path.resolve('anim-003.html')); await p.evaluate(()=>window.ready); await p.waitForTimeout(300);
  require('fs').mkdirSync('t003',{recursive:true});
  for(const t of times){const s=Date.now();await p.evaluate(t=>window.renderAt(t),t);await p.screenshot({path:`t003/${String(t).replace('.','_')}.jpg`,type:'jpeg',quality:88});console.log(t,Date.now()-s,'ms');}
  console.log('errors:',errs.slice(0,5)); await b.close(); })();
