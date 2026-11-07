// Render stills to check frames before a full render. Works on the Mac and on the server.
//   OUT_DIR=/some/dir node tools/render_stills.mjs EP05Hook:120 EP05Part03:300
// BROWSER=/opt/pw-browsers/chromium on the cloud server; on a Mac leave it unset (Remotion uses its own headless shell).
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const browserExecutable = process.env.BROWSER || (process.platform === 'linux' ? '/opt/pw-browsers/chromium' : undefined);
const out = process.env.OUT_DIR || path.join(root, 'out', 'stills');
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts') });
for (const arg of process.argv.slice(2)) {
  const [id, fr] = arg.split(':');
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  const file = `${out}/${id}${fr ? '_' + fr : ''}.png`;
  await renderStill({ composition, serveUrl, output: file, frame: fr ? Number(fr) : 110, browserExecutable });
  console.log('done', file);
}
