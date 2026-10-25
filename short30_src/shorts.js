function bg(t,tint){let g=x.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#0a1124');g.addColorStop(1,tint||'#16224a');x.fillStyle=g;x.fillRect(0,0,1080,1920);
 x.fillStyle='rgba(120,150,255,.07)';const o=(t*6)%60;for(let i=-60;i<1140;i+=60)for(let j=-60;j<1980;j+=60){x.beginPath();x.arc(i+o,j+o*.5,2,0,7);x.fill()}}
function vig(){let v=x.createRadialGradient(540,960,400,540,960,1300);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.5)');x.fillStyle=v;x.fillRect(0,0,1080,1920)}
function hudV(a,b,d,bc){x.save();x.translate(0,140);hud(a,b,d,bc);x.restore()}
function caption(t){const l=curLine(t);if(!l)return;const col={jay:AMB,devil:RED,angel:GRN}[l.spk],nm={jay:'JAY',devil:'DEVIL',angel:'ANGEL'}[l.spk];
 const ls=wrap(l.text,820,50),h=ls.length*62+66;const y=1500-h;rr(50,y,980,h,22);x.fillStyle='rgba(5,8,18,.85)';x.fill();x.lineWidth=4;x.strokeStyle=col;x.stroke();
 T(nm,80,y+42,24,col,'left',900);ls.forEach((s,i)=>T(s,80,y+60+i*62+22,50,'#fff','left',800))}
const LT=id=>TL.lines.find(l=>l.id==id).t0-B.t0;let B=null,BI=0;
function V1(tl,t){const L=['WHAT IF YOU','NEVER PAY YOUR','CREDIT CARD?'];let n=Math.floor(t*30),k=0;
 L.forEach((q,i)=>{T(q.slice(0,Math.max(0,Math.min(q.length,n-k))),540,260+i*120,i==2?116:100,i==2?AMB:INK,'center');k+=q.length+2});
 const p=pop(tl,.1);x.save();x.translate(540,800);x.scale(1.75*p,1.75*p);cc(0,0,-.05+Math.sin(t*1.2)*.02,0,0);x.restore();
 stamp('OVERDUE',540,810,90,RED,-.2,seg(tl,1.9,.3));
 const away=tl>1.7;jay(540,1180,.95,{t,talk:talk('jay',t),mood:away?'side':'smile',flip:away,handL:away?[55,200]:null,handR:away?[-55,205]:null,tilt:away?-.06:0});
 devil(820,1090,1.1,t,talk('devil',t),'')}
function V2(tl,t){T('DAY 30',540,390,120,INK,'center');const p=ease(seg(tl,.7,1.8));gauge(540,790,290,.8-.28*p);
 T(String(Math.round(764-71*p)),540,970,140,p>.9?RED:AMB,'center');T('CREDIT SCORE',540,1030,34,'#9aa6c8','center',800);if(p>.9)T('▼ −71',540,470,70,RED,'center');
 jay(220,1230,.6,{t,talk:talk('jay',t),mood:tl>LT('s2b')?'shock':'worry'});angel(860,1190,1.1,t,talk('angel',t))}
function V3(tl,t){T('DAY 60',540,390,120,INK,'center');x.fillStyle='#ffe9a8';x.beginPath();x.arc(930,380,44,0,7);x.fill();x.fillStyle='#0f1936';x.beginPath();x.arc(948,366,40,0,7);x.fill();
 const p=ease(seg(tl,.6,3));card(130,470,820,480,RED);T('DEBT',180,550,34,'#4a5578','left',800);T(money(3035+125*p),180,680,120,RED,'left');T('29.99% APR',180,770,64,AMB,'left');
 x.strokeStyle=RED;x.lineWidth=9;x.lineCap='round';x.beginPath();x.moveTo(190,910);for(let i=0;i<=20;i++){const q=i/20*p;x.lineTo(190+i*33,910-q*q*70-q*30)}x.stroke();
 devil(320,1180,1.3,t,talk('devil',t),'');jay(780,1230,.55,{t,mood:'sleep',tilt:-.1})}
function V4(tl,t){[['1','12 missed calls','COLLECTORS',AMB],['2','SUMMONS','LAWSUIT',RED],['3','PAYCHECK −25%','GARNISHED',RED]].forEach((a,i)=>{const q=pop(tl,.4+i*1.5);if(q<=0)return;const py=370+i*250;
  card(100,py,880,200,a[3],q);x.save();x.globalAlpha=cl(q);x.fillStyle=a[3];x.beginPath();x.arc(200,py+105,52,0,7);x.fill();T(a[0],200,py+132,72,'#101010','center');T(a[1],290,py+100,58,DK,'left');T(a[2],290,py+150,32,'#4a5578','left',800);x.restore()});
 angel(300,1180,1.3,t,talk('angel',t));devil(800,1180,1.1,t,talk('devil',t),'')}
function V5(tl,t){const no=LT('s5b'),dn=ease(seg(tl,.2,.6)),up=ease(seg(tl,no,.6));
 T('JAIL?',540,390,120,tl<no?INK:'rgba(244,241,234,.4)','center');
 jay(540,860,1.45,{t,talk:talk('jay',t),mood:tl<no?'worry':'smile'});
 for(let i=0;i<7;i++){const bx=100+i*147,hh=(dn-up)*1500;x.fillStyle='rgba(170,185,220,.9)';x.fillRect(bx-9,-20,18,Math.max(0,hh))}
 if(tl>no+.2)stamp('NO.',540,580,240,GRN,-.05,seg(tl,no+.2,.3));
 if(tl>no+1.2){const q=ease(seg(tl,no+1.2,.4));x.fillStyle=AMB;rr(70-(1-q)*1200,1190,940,170,20);x.fill();T('NEVER IGNORE',540-(1-q)*1200,1262,62,'#101010','center');T('A COURT ORDER',540-(1-q)*1200,1336,62,'#101010','center')}}
function V6(tl,t){phone(540,760,1.3,0,()=>{x.fillStyle='#e8ecff';T('📞',0,-100,70,DK,'center');T(tl<2.2?'Calling BANK…':'HARDSHIP PLAN',0,0,28,tl<2.2?DK:GRN,'center');if(tl>2.2)T('✓',0,90,80,GRN,'center')});
 angel(250,1190,1.3,t,talk('angel',t));devil(830,1190,1.0,t,talk('devil',t),'bored');
 const f=seg(tl,TL.lines.find(l=>l.id=='s6c').t0-B.t0-.2,.5);window.endF=f}
const SC=[V1,V2,V3,V4,V5,V6],TINT=['#16224a','#1d2347','#1a1e3f','#2e1c34','#1a2a4a','#16224a'];
function hudVals(){const i=BI;let tdy='$0.00',bk='$2,400.00',bc=INK,db='$3,000';if(i>=1)tdy='−$35.00',db='$3,035';if(i>=2)db='$3,160';if(i>=3)db='≈$3,400';if(i>=3)bk='FROZEN',bc='#bfeaff';if(i>=5)bk='SAVED?',bc=GRN,tdy='$0.00',db='PLAN';return[tdy,bk,db,bc]}
function renderT(t){window.endF=0;BI=0;for(let i=0;i<TL.beats.length;i++)if(t>=TL.beats[i].t0)BI=i;B=TL.beats[BI];const tl=t-B.t0;
 bg(t,TINT[BI]);const s=1+.025*cl((t-B.t0)/(B.t1-B.t0));x.save();x.translate(540,960);x.scale(s,s);x.translate(-540,-960);SC[BI](tl,t);x.restore();vig();
 const ef=window.endF;if(ef>0){x.fillStyle=`rgba(5,8,18,${.95*ef})`;x.fillRect(0,0,1080,1920);x.globalAlpha=ef;T('Cheap advice',540,860,100,INK,'center');T('has a price.',540,980,100,AMB,'center');T('Not legal advice',540,1100,34,'#9aa6c8','center',700);T('CHEAP.',540,1260,64,INK,'center');x.globalAlpha=1}
 if(BI>=1)hudV(...hudVals());caption(t);
 if(t<.3){x.fillStyle=`rgba(0,0,0,${1-t/.3})`;x.fillRect(0,0,1080,1920)}if(t>TL.END-.5){x.fillStyle=`rgba(0,0,0,${(t-(TL.END-.5))/.5})`;x.fillRect(0,0,1080,1920)}}
