// Builds frames/*.html from templates in frames/src/*.js (each exports html()).
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, 'src');
for (const f of fs.readdirSync(src).filter(f => f.endsWith('.js') && !f.startsWith('_'))) {
  delete require.cache[require.resolve(path.join(src, f))];
  fs.writeFileSync(path.join(__dirname, f.replace('.js', '.html')), require(path.join(src, f)).html());
  console.log('built', f);
}
