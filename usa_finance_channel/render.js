// Usage: node render.js stills            -> keyframes/scene1..5.png
//        node render.js frames <outdir>   -> every frame of the animatic (30 fps) as JPEG
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const mode = process.argv[2] || 'stills';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(__dirname, 'animatic.html'));
  await page.waitForTimeout(500);
  const L = await page.evaluate(() => window.SCENE_LEN);
  const N = await page.evaluate(() => window.N);

  if (mode === 'stills') {
    const dir = path.join(__dirname, 'keyframes');
    fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < N; i++) {
      const T = i * L + L * 0.8;                       // late in the scene: all beats visible
      await page.evaluate(t => window.render(t), T);
      await page.screenshot({ path: path.join(dir, `scene${i + 1}.png`) });
    }
  } else {
    const out = process.argv[3];
    fs.mkdirSync(out, { recursive: true });
    const fps = 30, total = N * L * fps;
    for (let f = 0; f < total; f++) {
      await page.evaluate(t => window.render(t), f / fps);
      await page.screenshot({ path: path.join(out, `f${String(f).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 92 });
    }
  }
  await browser.close();
})();
