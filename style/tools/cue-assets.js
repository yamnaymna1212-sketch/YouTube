// "When he says the word, show the real logo."
// Scans the narration of an episode script for registry keywords and prints
// a cue sheet: scene -> which real asset pops in, plus any asset still missing.
// After the voice is recorded, the same matcher runs on the Whisper
// word-level transcript, so each cue gets an exact timestamp (ms).
//
// usage: node style/tools/cue-assets.js episodes/ep01-bybit/script.md [--json]
const fs = require('fs'), path = require('path');
const reg = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/registry.json'), 'utf8')).assets;
const file = process.argv[2]; const asJson = process.argv.includes('--json');
const lines = fs.readFileSync(file, 'utf8').split('\n');

let scene = '—'; const cues = []; const seen = new Set();
for (const l of lines) {
  const m = l.match(/\[المشهد ([^\]]+)\]/); if (m) scene = m[1];
  if (!l.startsWith('> ')) continue;
  for (const a of reg) for (const k of a.keywords) {
    if (l.includes(k)) {
      const key = scene + a.id; if (seen.has(key)) continue; seen.add(key);
      cues.push({ scene, asset: a.id, kind: a.kind, keyword: k, status: a.status, file: a.file || null, source: a.source });
    }
  }
}
if (asJson) { console.log(JSON.stringify(cues, null, 1)); process.exit(0); }
const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
console.log(pad('SCENE', 8) + pad('ASSET', 16) + pad('KIND', 10) + pad('STATUS', 8) + 'KEYWORD');
for (const c of cues) console.log(pad(c.scene, 8) + pad(c.asset, 16) + pad(c.kind, 10) + pad(c.status === 'ready' ? 'OK' : 'NEEDED', 8) + c.keyword);
const missing = [...new Set(cues.filter(c => c.status !== 'ready').map(c => c.asset))];
console.log(`\n${cues.length} cues · ${missing.length} assets still needed: ${missing.join(', ') || 'none'}`);
