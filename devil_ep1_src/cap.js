const {chromium}=require('playwright');const fs=require('fs');
const [a,b]=[+process.argv[2],+process.argv[3]];
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+process.cwd()+'/ep1.html');await p.waitForTimeout(400);
for(let f=a;f<b;f++){const d=await p.evaluate(t=>{renderT(t);return document.getElementById('c').toDataURL('image/jpeg',.9)},f/24);
fs.writeFileSync(`frames/f${String(f).padStart(5,'0')}.jpg`,Buffer.from(d.split(',')[1],'base64'))}
console.log('done',a,b);await br.close()})();
