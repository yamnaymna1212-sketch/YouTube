// Render every frames/*.html to out/*.png at 1920x1080 using the preinstalled Chromium.
// usage: node render.js [name ...]   (scale via SCALE env, default 1)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const dir = __dirname;
const names = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => f.replace('.html', ''));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: +(process.env.SCALE || 1) });
  for (const n of names) {
    await p.goto('file://' + path.join(dir, n + '.html'), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(dir, 'out', n + '.png') });
    console.log('rendered', n);
  }
  await b.close();
})();
