const c=document.getElementById('c'),x=c.getContext('2d');
const AMB='#ffb23e',RED='#ff3b3b',GRN='#37e08a',INK='#f4f1ea',NAVY='#233a74',DK='#16161d';
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),ease=v=>1-Math.pow(1-cl(v),3);
const back=v=>{v=cl(v);const s=1.70158;return 1+(s+1)*Math.pow(v-1,3)+s*Math.pow(v-1,2)};
const seg=(tl,a,d=.4)=>cl((tl-a)/d), pop=(tl,a)=>tl<a?0:back((tl-a)/.45);
const rr=(a,b,w,h,r)=>{x.beginPath();x.roundRect(a,b,w,h,r)};
function T(s,px,py,sz,col,al='left',w=900){x.font=`${w} ${sz}px Inter,"DejaVu Sans",Arial`;x.textAlign=al;x.fillStyle=col;x.fillText(s,px,py)}
function talk(spk,t){for(const l of TL.lines)if(l.spk==spk&&t>=l.t0&&t<=l.t1)return l.env[Math.min(l.env.length-1,Math.floor((t-l.t0)*48))]||0;return 0}
function curLine(t){for(const l of TL.lines)if(t>=l.t0-.05&&t<=l.t1+.25)return l;return null}
// ---------- backgrounds / HUD ----------
function bg(t,tint){let g=x.createLinearGradient(0,0,0,1080);g.addColorStop(0,'#0a1124');g.addColorStop(1,tint||'#16224a');x.fillStyle=g;x.fillRect(0,0,1920,1080);
 x.fillStyle='rgba(120,150,255,.07)';const o=(t*6)%60;for(let i=-60;i<1980;i+=60)for(let j=-60;j<1140;j+=60){x.beginPath();x.arc(i+o,j+o*.5,2,0,7);x.fill()}}
function vig(){let v=x.createRadialGradient(960,540,350,960,540,1250);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=v;x.fillRect(0,0,1920,1080)}
function hud(a,b,d,bc){rr(40,34,330,130,14);x.fillStyle='rgba(0,0,0,.5)';x.fill();
 [['TODAY',a,AMB],['BANK',b,bc||INK],['DEBT',d,RED]].forEach((r,i)=>{T(r[0],60,72+i*38,20,'#9aa6c8','left',700);T(r[1],150,74+i*38,28,r[2],'left',800)})}
function brand(){T('CHEAP.',1860,1030,32,INK,'right',900);x.fillStyle=RED;x.fillRect(1800,1042,60,5)}
function wrap(s,w,sz){x.font=`800 ${sz}px Inter,Arial`;const out=[];let cur='';s.split(' ').forEach(wd=>{const n=cur?cur+' '+wd:wd;if(x.measureText(n).width>w&&cur){out.push(cur);cur=wd}else cur=n});out.push(cur);return out}
function caption(t){const l=curLine(t);if(!l)return;const col={jay:AMB,devil:RED,angel:GRN}[l.spk],nm={jay:'JAY',devil:'DEVIL',angel:'ANGEL'}[l.spk];
 const ls=wrap(l.text,1450,42),h=ls.length*54+34;const y=1010-h;rr(190,y,1540,h,18);x.fillStyle='rgba(5,8,18,.82)';x.fill();x.lineWidth=3;x.strokeStyle=col;x.stroke();
 T(nm,222,y+50,24,col,'left',900);ls.forEach((s,i)=>T(s,400,y+52+i*54,42,'#fff','left',800))}
// ---------- characters ----------
function jay(px,py,s,o={}){const t=o.t||0,tk=o.talk||0,m=o.mood||'smile';x.save();x.translate(px,py+Math.sin(t*2.2)*4);x.rotate(Math.sin(t*1.3)*.03+(o.tilt||0));x.scale(s*(o.flip?-1:1),s);
 x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,308,120,20,0,0,7);x.fill();
 const HC='#2a3f6e';if(!o.sit){x.fillStyle='#1d2d52';x.fillRect(-60,285,50,28);x.fillRect(10,285,50,28)}
 x.fillStyle=HC;rr(-85,90,170,210,60);x.fill();
 let hl=o.handL||[-110,250+Math.sin(t*1.7)*6],hr=o.handR||[110,250+Math.sin(t*1.7+1)*6];
 if(!o.handR&&tk>.1){hr=[130+Math.sin(t*7)*20,150+Math.cos(t*5)*30*tk]}
 [[-62,hl],[62,hr]].forEach(([sx,h])=>{x.strokeStyle=HC;x.lineWidth=36;x.lineCap='round';x.beginPath();x.moveTo(sx,125);x.lineTo(h[0],h[1]);x.stroke();x.fillStyle='#f0c9a0';x.beginPath();x.arc(h[0],h[1],21,0,7);x.fill()});
 if(o.phone){x.save();x.translate(hr[0],hr[1]);x.rotate(.15);x.fillStyle='#10131d';rr(-24,-52,48,86,8);x.fill();x.fillStyle=o.phoneCol||'#7fb6ff';rr(-19,-46,38,72,5);x.fill();x.restore();x.fillStyle='#f0c9a0';x.beginPath();x.arc(hr[0]+6,hr[1]+14,15,0,7);x.fill()}
 x.fillStyle='#f0c9a0';x.beginPath();x.arc(0,0,100,0,7);x.fill();x.fillStyle='#16161d';x.beginPath();x.arc(0,-12,102,Math.PI,2*Math.PI);x.fill();x.fillRect(-102,-14,204,16);
 let eh=24,by1=-32,by2=-26,px_=0;if(m=='shock'){eh=32;by1=by2=-46}else if(m=='worry'||m=='sad'){by1=-22;by2=-42}else if(m=='sleep'){eh=3}else if(m=='smirk'){by1=-36;by2=-24}
 if(((t+.7)%3.6)<.12)eh=3;if(m=='side')px_=9;
 [-36,36].forEach(e=>{x.fillStyle='#fff';x.beginPath();x.ellipse(e,8,19,eh,0,0,7);x.fill();if(eh>5){x.fillStyle='#111';x.beginPath();x.arc(e+px_,12,9,0,7);x.fill()}});
 x.strokeStyle='#16161d';x.lineWidth=7;x.lineCap='round';x.beginPath();x.moveTo(-58,by1);x.lineTo(-18,by2);x.moveTo(58,by1);x.lineTo(18,by2);x.stroke();
 x.strokeStyle='#7a3b2a';x.lineWidth=7;x.beginPath();
 if(tk>.12||m=='shock'){const ry=m=='shock'?22:6+tk*22;x.fillStyle='#4a1a14';x.beginPath();x.ellipse(0,64,m=='shock'?14:19,ry,0,0,7);x.fill()}
 else if(m=='smile'||m=='smirk'){x.arc(0,46,28,.15*Math.PI,.85*Math.PI);x.stroke()}else if(m=='worry'||m=='sad'){x.moveTo(-26,72);x.quadraticCurveTo(0,52,26,72);x.stroke()}else{x.moveTo(-20,66);x.lineTo(20,66);x.stroke()}
 if(m=='worry'||m=='shock'){x.fillStyle='#7fd0ff';x.beginPath();x.ellipse(98,-30+Math.sin(t*3)*4,10,16,0,0,7);x.fill()}
 if(m=='sleep'){const k=(t*1.2)%3;for(let i=0;i<3;i++){x.globalAlpha=cl(1-Math.abs(k-i)/1.5);T('Z',110+i*34,-40-i*44,40+i*10,'#cfe0ff','left',900)}x.globalAlpha=1}
 x.restore()}
function devil(px,py,s,t,tk=0,mood){x.save();x.translate(px,py+Math.sin(t*2.6)*8);x.scale(s*(1+tk*.1),s*(1+tk*.1));x.fillStyle=RED;x.shadowColor='rgba(255,40,40,.8)';x.shadowBlur=50;x.beginPath();x.arc(0,0,60,0,7);x.fill();x.shadowBlur=0;
 [-1,1].forEach(k=>{x.beginPath();x.moveTo(k*28,-48);x.lineTo(k*52,-96);x.lineTo(k*8,-58);x.fill()});
 x.fillStyle='#fff';[-20,20].forEach(e=>{x.beginPath();x.ellipse(e,-6,10,mood=='bored'?4:12,0,0,7);x.fill()});x.fillStyle='#111';[-20,20].forEach(e=>{x.beginPath();x.arc(e,-4,5,0,7);x.fill()});
 x.strokeStyle='#300';x.lineWidth=5;x.lineCap='round';x.beginPath();x.moveTo(-34,-28);x.lineTo(-8,-18);x.moveTo(34,-28);x.lineTo(8,-18);x.stroke();
 if(tk>.12){x.fillStyle='#3a0808';x.beginPath();x.ellipse(0,20,20,5+tk*18,0,0,7);x.fill()}else if(mood=='bored'){x.beginPath();x.moveTo(-18,24);x.lineTo(18,24);x.stroke()}else{x.beginPath();x.arc(0,12,26,.1*Math.PI,.9*Math.PI);x.stroke()}x.restore()}
function angel(px,py,s,t,tk=0){x.save();x.translate(px,py+Math.sin(t*2)*8);x.scale(s*(1+tk*.08),s*(1+tk*.08));const fl=Math.sin(t*5)*.15;x.fillStyle='rgba(55,224,138,.35)';[-1,1].forEach(k=>{x.beginPath();x.ellipse(k*64,6,40,22,k*(.5+fl),0,7);x.fill()});
 x.fillStyle=GRN;x.shadowColor='rgba(55,224,138,.8)';x.shadowBlur=45;x.beginPath();x.arc(0,0,50,0,7);x.fill();x.shadowBlur=0;
 x.strokeStyle='#ffe27a';x.lineWidth=6;x.beginPath();x.ellipse(0,-66,30,9,0,0,7);x.stroke();
 x.fillStyle='#fff';[-16,16].forEach(e=>{x.beginPath();x.ellipse(e,-4,8,10,0,0,7);x.fill()});x.fillStyle='#111';[-16,16].forEach(e=>{x.beginPath();x.arc(e,-2,4,0,7);x.fill()});
 if(tk>.12){x.fillStyle='#064';x.beginPath();x.ellipse(0,16,11,4+tk*13,0,0,7);x.fill()}else{x.strokeStyle='#064';x.lineWidth=4;x.beginPath();x.arc(0,10,16,.15*Math.PI,.85*Math.PI);x.stroke()}x.restore()}
// ---------- props ----------
function card(px,py,w,h,col,sc=1){x.save();x.translate(px+w/2,py+h/2);x.scale(sc,sc);x.translate(-w/2,-h/2);rr(0,0,w,h,34);x.fillStyle='#f4f1ea';x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=40;x.shadowOffsetY=18;x.fill();x.shadowBlur=0;x.shadowOffsetY=0;if(col){x.fillStyle=col;rr(0,0,w,16,8);x.fill()}x.restore()}
function bank(px,py){x.fillStyle=NAVY;x.beginPath();x.moveTo(px-90,py-30);x.lineTo(px,py-90);x.lineTo(px+90,py-30);x.closePath();x.fill();[-60,-20,20,60].forEach(k=>x.fillRect(px+k-9,py-20,18,80));x.fillRect(px-96,py+66,192,16)}
function jailI(px,py){x.fillStyle=NAVY;rr(px-90,py-80,180,170,14);x.fill();x.fillStyle='#f4f1ea';[-54,-18,18,54].forEach(k=>x.fillRect(px+k-6,py-76,12,162))}
function houseI(px,py){x.fillStyle=NAVY;x.beginPath();x.moveTo(px-100,py-10);x.lineTo(px,py-90);x.lineTo(px+100,py-10);x.closePath();x.fill();x.fillRect(px-76,py-10,152,100);x.fillStyle='#f4f1ea';x.fillRect(px-14,py+30,28,60)}
function cc(px,py,rot,xp,frozen){x.save();x.translate(px,py);x.rotate(rot);rr(-160,-100,320,200,26);let g=x.createLinearGradient(-160,-100,160,100);g.addColorStop(0,'#2f5bd3');g.addColorStop(1,'#16286e');x.fillStyle=g;x.fill();x.fillStyle='#ffd35a';rr(-124,-52,64,48,8);x.fill();x.fillStyle='#fff';x.font='700 26px Inter,Arial';x.textAlign='left';x.fillText('•••• •••• •••• 4821',-124,50);
 if(frozen){x.fillStyle=`rgba(190,235,255,${.6*frozen})`;rr(-160,-100,320,200,26);x.fill();x.strokeStyle='#fff';x.lineWidth=5;for(let i=0;i<5;i++){x.beginPath();x.moveTo(-140+i*60,-100);x.lineTo(-110+i*60,-40*frozen);x.stroke()}}
 if(xp>0){x.strokeStyle=RED;x.lineWidth=18;x.lineCap='round';x.beginPath();x.moveTo(-150,-110);x.lineTo(-150+300*Math.min(1,xp*2),-110+220*Math.min(1,xp*2));x.stroke();if(xp>.5){x.beginPath();x.moveTo(150,-110);x.lineTo(150-300*(xp-.5)*2,-110+220*(xp-.5)*2);x.stroke()}}x.restore()}
function stamp(txt,px,py,sz,col,rot,p){if(p<=0)return;const s=1+(1-ease(p))*1.2;x.save();x.translate(px,py);x.rotate(rot);x.scale(s,s);x.globalAlpha=cl(p*3);x.font=`900 ${sz}px Inter,Arial`;const w=x.measureText(txt).width+60;x.strokeStyle=col;x.lineWidth=12;rr(-w/2,-sz*.75,w,sz*1.4,16);x.stroke();T(txt,0,sz*.3,sz,col,'center');x.restore()}
function phone(px,py,sc,rot,screen){x.save();x.translate(px,py);x.rotate(rot);x.scale(sc,sc);x.fillStyle='#0c0f18';rr(-120,-230,240,460,32);x.fill();x.fillStyle='#1b2540';rr(-106,-214,212,428,22);x.fill();screen&&screen();x.restore()}
function sofa(px,py){x.fillStyle='#1b2a52';rr(px-330,py-120,660,150,40);x.fill();rr(px-380,py-40,760,130,36);x.fill();x.fillStyle='#233566';rr(px-340,py+20,680,40,16);x.fill();x.fillStyle='#14203f';x.fillRect(px-340,py+90,30,50);x.fillRect(px+310,py+90,30,50)}
function gauge(px,py,r,val){x.lineWidth=46;x.lineCap='butt';[['#ff3b3b',0],['#ff9a3b',.25],['#ffd23b',.5],['#9be04a',.75]].forEach(([col,a])=>{x.strokeStyle=col;x.beginPath();x.arc(px,py,r,Math.PI+a*Math.PI,Math.PI+(a+.25)*Math.PI);x.stroke()});
 const a=Math.PI+val*Math.PI;x.strokeStyle='#fff';x.lineWidth=12;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*(r-30),py+Math.sin(a)*(r-30));x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(px,py,20,0,7);x.fill()}
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
