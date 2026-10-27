// TikTok / YouTube profile picture: Kai's face, big and readable at small sizes, on the blueprint grid.
// Usage: node avatar.js <outDir>
const { chromium } = require('playwright');
const { character } = require('./glow.js');
const { P, svgDoc } = require('./world.js');
const OUT = process.argv[2];
const PINK = '#ff6fae';

function avatar(face, money) {
  const S = 6.4, headY = 520;
  return svgDoc(1080, 1080, `
    <circle cx="540" cy="540" r="470" fill="#36b6ff" opacity="0.12" filter="url(#b60)"/>
    ${character('kai', 500, headY + 303 * S, S, { t: 1.2, face, pose: { lean: 0, bob: 0, legL: [6, -4], legR: [-6, -4], armL: [-8, 10], armR: [-8, 10] } })}
    ${money ? `<g transform="translate(830 250) rotate(12)"><circle r="110" fill="${PINK}" opacity="0.35" filter="url(#b26)"/><circle r="96" fill="#0b1d38" stroke="${PINK}" stroke-width="10"/>
      <text y="44" text-anchor="middle" font-family="Inter" font-weight="900" font-size="130" fill="${PINK}">$</text></g>` : ''}
    <circle cx="540" cy="540" r="528" fill="none" stroke="${PINK}" stroke-width="16" opacity="0.9"/>`);
}

(async () => {
  const b = await chromium.launch(), pg = await b.newPage();
  await pg.setViewportSize({ width: 1080, height: 1080 });
  const variants = [['avatar-a-shocked-money', 'shocked', true], ['avatar-b-happy', 'happy', false], ['avatar-c-tired-money', 'tired', true]];
  for (const [name, face, money] of variants) {
    await pg.setContent(`<html><body style="margin:0">${avatar(face, money)}</body></html>`);
    await pg.screenshot({ path: `${OUT}/${name}.png` });
  }
  // preview: how each looks in TikTok's round crop at small sizes
  const imgs = variants.map(([n]) => require('fs').readFileSync(`${OUT}/${n}.png`).toString('base64'));
  await pg.setViewportSize({ width: 1200, height: 520 });
  await pg.setContent(`<html><body style="margin:0;background:#121212;font-family:Inter;color:#fff;display:flex;gap:60px;padding:50px;box-sizing:border-box">
    ${imgs.map((d, i) => `<div style="text-align:center"><img src="data:image/png;base64,${d}" style="width:300px;height:300px;border-radius:50%"><br>
      <img src="data:image/png;base64,${d}" style="width:56px;height:56px;border-radius:50%;margin-top:20px"> <img src="data:image/png;base64,${d}" style="width:32px;height:32px;border-radius:50%">
      <div style="margin-top:10px;font-weight:800">${'ABC'[i]}</div></div>`).join('')}</body></html>`);
  await pg.screenshot({ path: `${OUT}/avatar-preview.png` });
  await b.close();
  console.log('done');
})();
