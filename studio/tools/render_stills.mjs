import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';
const root = '/home/user/YouTube/studio';
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts') });
const ids = process.argv.slice(2);
for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable: '/opt/pw-browsers/chromium' });
  await renderStill({ composition, serveUrl, output: `/home/user/YouTube/episodes/ep03-iran/style/${id}.png`, frame: 110, browserExecutable: '/opt/pw-browsers/chromium' });
  console.log('done', id);
}
