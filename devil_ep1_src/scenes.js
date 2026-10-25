const W0=[960,540,1];
const CAMS={b1:[W0,[1450,640,1.4],[960,330,1.2],[900,700,1.3]],b2:[W0,[420,480,1.3],[990,480,1.3],[1560,480,1.3],W0],b3:[W0,[1500,500,1.35],[700,560,1.25]],
 b4:[W0,[650,560,1.5],[1300,330,1.4],[1450,650,1.5]],b5:[W0,[1250,600,1.3],[330,540,1.35],[1700,700,1.5]],b6:[W0,[1100,420,1.3],[600,600,1.4]],
 b7:[W0,[960,520,1.3],[500,700,1.4],[1550,700,1.4]],b8:[W0,[960,520,1.3],[1550,480,1.3]],b9:[W0,[500,500,1.3],[1500,700,1.4]],b10:[W0,[510,440,1.3],[1300,520,1.4]],
 b11:[W0,[960,620,1.4],W0],b12:[W0,[960,420,1.25],[960,480,1.2]],b13:[W0,[500,500,1.25],[1400,500,1.25]],b14:[W0,[960,520,1.12],W0],b15:[W0,[1300,520,1.35],[500,640,1.4],W0]};
let B=null,BI=0;
const LT=id=>TL.lines.find(l=>l.id==id).t0-B.t0;
const dsc=()=>BI<=8?1+.08*BI:1.64-.2*(BI-8);
function title(s,py,sz=84,col=INK,px=1000){T(s,px,py,sz,col,'center')}
function S_b1(tl,t){const L=['WHAT HAPPENS IF YOU','JUST STOP PAYING','YOUR CREDIT CARD?'];let n=Math.floor(t*22),k=0;
 L.forEach((s,i)=>{T(s.slice(0,Math.max(0,Math.min(s.length,n-k))),960,230+i*140,i==2?130:118,i==2?AMB:INK,'center');k+=s.length+4});
 cc(520,800,-.12+Math.sin(t)*.02,seg(tl,3.8,.7));
 devil(1200,780,1.2,t,talk('devil',t),'');
 jay(1520,740,1,{t,talk:talk('jay',t),mood:tl<3?'smile':'worry'})}
function S_b2(tl,t){title('SO WHAT COULD HAPPEN?',190);
 [['EMPTY MY BANK?',bank],['I GO TO JAIL?',jailI],['TAKE MY HOUSE?',houseI]].forEach((a,i)=>{const px=170+i*570,p=pop(tl,.5+i*1.25),sh=tl>4.4?Math.sin(t*40)*5:0;
  if(p>0){card(px+sh,260,500,400,RED,p);x.save();x.globalAlpha=cl(p);a[1](px+250+sh,430);T('?',px+250+sh,330,100,RED,'center');T(a[0],px+250+sh,610,44,DK,'center');x.restore()}});
 jay(330,830,.62,{t,talk:talk('jay',t),mood:'worry'});devil(1500,790,1.1,t,talk('devil',t))}
function S_b3(tl,t){stamp('NOPE.',960,330,220,RED,-.06,seg(tl,.2,.3)*(1-seg(tl,1.5,.3)));
 const p=seg(tl,1.4,.4);if(p>0){x.globalAlpha=p;title('3 THINGS WILL ACTUALLY HAPPEN',200,66,INK,700);x.globalAlpha=1}
 [['1','CREDIT SCORE CRASHES','DAY 30',AMB],['2','DEBT KEEPS GROWING','DAY 60 · ~30% INTEREST',AMB],['3','COLLECTORS → LAWSUIT','6 MONTHS+',RED]].forEach((a,i)=>{const q=pop(tl,2.2+i*1.2);if(q<=0)return;const py=300+i*180;
  card(120,py,1180,150,a[3],q);x.save();x.globalAlpha=cl(q);x.fillStyle=a[3];x.beginPath();x.arc(210,py+78,50,0,7);x.fill();T(a[0],210,py+104,70,'#101010','center');T(a[1],290,py+80,50,DK,'left');T(a[2],290,py+124,30,'#4a5578','left',800);x.restore()});
 angel(1600,460,1.8,t,talk('angel',t));jay(1600,800,.6,{t,mood:'side'})}
function S_b4(tl,t){T('DAY 1',960,200,150,INK,'center');
 x.fillStyle='#1b2a52';rr(320,600,660,150,40);x.fill();jay(650,520,1.05,{t,talk:talk('jay',t),mood:tl<4?'smirk':'smile',phone:true,handR:[120,215],sit:true});
 x.fillStyle='#233566';rr(270,680,760,130,36);x.fill();x.fillStyle='#14203f';x.fillRect(290,800,30,50);x.fillRect(980,800,30,50);
 const q=ease(seg(tl,.8,.5));card(1100+(1-q)*800,260,620,170,RED);x.fillStyle=DK;T('⚠ LATE FEE',1140+(1-q)*800,340,46,DK,'left');T('−$35.00',1140+(1-q)*800,402,56,RED,'left');
 devil(1450,640,1.2*cl(dsc(),1,1.5),t,talk('devil',t),'')}
function S_b5(tl,t){T('DAY 30',960,190,130,INK,'center');
 card(120,280,430,540,RED);for(let i=0;i<7;i++){x.fillStyle='#cdd3e6';rr(160,340+i*52,300-(i%3)*40,18,6);x.fill()}T('CREDIT REPORT',335,320,26,DK,'center');stamp('30 DAYS LATE',335,700,40,RED,-.15,seg(tl,1,.3));
 const p=ease(seg(tl,1.6,2.4));const v=.8-.28*p;gauge(1250,640,220,v);T(String(Math.round(764-71*p)),1250,760,130,p>.9?RED:AMB,'center');T('CREDIT SCORE',1250,820,34,'#9aa6c8','center',800);
 if(p>.9)T('▼ −71',1250,300,60,RED,'center');
 jay(1720,760,.55,{t,talk:talk('jay',t),mood:tl>LT('b5b')?'shock':'worry'})}
function S_b6(tl,t){T('DAY 60',620,190,130,INK,'center');
 x.fillStyle='#ffe9a8';x.beginPath();x.arc(1650,230,50,0,7);x.fill();x.fillStyle='#0f1936';x.beginPath();x.arc(1670,214,46,0,7);x.fill();
 x.fillStyle='#1b2a52';rr(200,640,820,120,30);x.fill();x.fillStyle='#e8ecff';rr(210,600,190,60,24);x.fill();jay(560,590,.7,{t,mood:'sleep',tilt:-1.5});
 const p=ease(seg(tl,.8,5));card(1000,280,720,380,RED);T('DEBT',1050,350,34,'#4a5578','left',800);T(money(3035+125*p),1050,450,100,RED,'left');T('29.99% APR',1050,520,56,AMB,'left');
 x.strokeStyle=RED;x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(1050,620);for(let i=0;i<=20;i++){const q=i/20*p;x.lineTo(1050+i*30,620-q*q*60-q*30)}x.stroke();
 devil(420,430,1.3,t,talk('devil',t),'')}
function S_b7(tl,t){title('MONTHS 3–4',190,110,INK,960);
 phone(960,560,1.15,Math.sin(t*30)*(Math.sin(t*3)>.7?.03:0),()=>{[['☎','12 missed calls'],['✉','8 emails'],['✉','5 letters']].forEach((a,i)=>{const q=pop(tl,.5+i*1.1);if(q<=0)return;x.save();x.globalAlpha=cl(q);x.fillStyle='#e8ecff';rr(-96,-190+i*120,192,100,16);x.fill();T(a[0],-86,-128+i*120,40,DK,'left');T(a[1],-38,-120+i*120,20,RED,'left');x.restore()})});
 cc(420,760,-.08,0,seg(tl,3.2,1.2));T('FROZEN',420,900,40,'#bfeaff','center');
 jay(1540,720,.8,{t,talk:talk('jay',t),mood:'side',handR:[40,120]});devil(1540,340,1.2,t,talk('devil',t),'')}
function S_b8(tl,t){const hit=seg(tl,1.8,.1),shk=hit>0&&tl<2.2?Math.sin(t*80)*8:0;x.save();x.translate(shk,0);
 card(510,250,900,520,AMB);T('LEDGER · CARD ****4821',960,320,34,'#4a5578','center',800);for(let i=0;i<5;i++){x.fillStyle='#cdd3e6';rr(570,350+i*40,780-(i%2)*120,16,6);x.fill()}
 stamp('CHARGED OFF',960,560,100,RED,-.1,seg(tl,1.8,.35));x.restore();
 if(tl>4.2){x.globalAlpha=seg(tl,4.2,.3);T('≠ FORGIVEN',960,850,80,INK,'center');x.globalAlpha=1}
 if(tl>5.3){x.globalAlpha=seg(tl,5.3,.3);T('STILL OWED ≈ $3,400',960,190,70,RED,'center');x.globalAlpha=1}
 const cb=LT('b8b');if(tl>cb&&tl<cb+2.4){for(let i=0;i<40;i++){const a=i*2.4,px=1100+Math.sin(a)*400+(i%7)*20,py=-60+((tl-cb)*500+i*47)%1000;x.fillStyle=['#ffb23e','#37e08a','#ff3b3b','#7fb6ff'][i%4];x.fillRect(px,py,14,14)}}
 devil(1640,330,1.3*(tl>cb&&tl<cb+1.5?1.3:1),t,talk('devil',t),'');angel(1640,650,1.5,t,talk('angel',t))}
function S_b9(tl,t){const q=ease(seg(tl,.4,.6));card(160-(1-q)*900,260,620,480,RED);T('SUMMONS',470-(1-q)*900,350,60,DK,'center');T('YOU ARE BEING SUED',470-(1-q)*900,400,30,RED,'center',800);for(let i=0;i<6;i++){x.fillStyle='#cdd3e6';rr(220-(1-q)*900,440+i*44,500-(i%3)*70,16,6);x.fill()}
 stamp('DEFAULT JUDGMENT',470,640,50,RED,-.1,seg(tl,4.8,.3));
 if(tl>4.8&&tl<5.1){x.save();x.translate(Math.sin(t*90)*6,0);x.restore()}
 jay(1500,720,.85,{t,talk:talk('jay',t),mood:'smirk',phone:true});angel(1500,330,1.4,t,talk('angel',t))}
function S_b10(tl,t){const sl=ease(seg(tl,1.6,1));card(120,260,760,330,AMB);T('PAYCHECK',500,330,38,'#4a5578','center',800);T('$2,000',500,440,110,DK,'center');
 x.fillStyle=RED;rr(120+570*.75+sl*260,520,190,40,10);x.fill();x.fillStyle='#3d6bd6';rr(140,520,570*.75,40,10);x.fill();T('−25%',140+570*.75+95+sl*260,552,34,'#fff','center');T('→ COLLECTOR',500,660,44,RED,'center');
 const fz=seg(tl,4.2,1);cc(1350,470,.06,0,fz);stamp('FROZEN',1350,480,80,'#bfeaff',-.12,seg(tl,5.2,.3));T('BANK ACCOUNT',1350,690,40,INK,'center');
 angel(1650,820,1.1,t,talk('angel',t));jay(260,820,.55,{t,mood:'worry'})}
function S_b11(tl,t){const no=LT('b11b'),up=ease(seg(tl,no,.6)),dn=ease(seg(tl,.6,.8));
 jay(960,620,1.15,{t,talk:talk('jay',t)+talk('angel',t)*0,mood:tl<no?'worry':'smile'});
 for(let i=0;i<9;i++){const bx=260+i*175,hh=(dn-up)*900;x.fillStyle='rgba(170,185,220,.9)';x.fillRect(bx-9,-20,18,Math.max(0,hh));}
 if(tl>no+.2)stamp('NO.',960,330,200,GRN,-.05,seg(tl,no+.2,.3));
 if(tl>no+3.2){const q=ease(seg(tl,no+3.2,.4));x.fillStyle=AMB;rr(1000-(1-q)*1200,860-140,1040,90,18);x.fill();T('NEVER IGNORE A COURT ORDER',1520-(1-q)*1200,860-77,46,'#101010','center')}
 angel(260,300,1.4,t,talk('angel',t))}
function S_b12(tl,t){card(480,200,960,260,RED);T('CREDIT REPORT',960,260,34,'#4a5578','center',800);
 [['LATE PAYMENTS',.8],['CHARGE-OFF',1.8],['COLLECTION ACCOUNT',2.8]].forEach((a,i)=>{const q=pop(tl,a[1]);if(q>0){x.globalAlpha=cl(q);x.fillStyle=RED;x.beginPath();x.arc(560,320+i*50,12,0,7);x.fill();T(a[0],590,332+i*50,36,DK,'left');x.globalAlpha=1}});
 const p=ease(seg(tl,3.2,4.5));x.strokeStyle='#3b4b78';x.lineWidth=16;x.lineCap='round';x.beginPath();x.moveTo(300,660);x.lineTo(1620,660);x.stroke();x.strokeStyle=RED;x.beginPath();x.moveTo(300,660);x.lineTo(300+1320*p,660);x.stroke();
 for(let i=0;i<=7;i++){x.fillStyle='#f4f1ea';x.beginPath();x.arc(300+i*188.5,660,i==7?18:10,0,7);x.fill();T(String(i),300+i*188.5,720,34,'#9aa6c8','center',800)}T('YEARS',1700,672,30,'#9aa6c8','left',800);
 if(p>.99)stamp('7 YEARS',960,590,70,AMB,-.04,1);
 jay(220,760,.55,{t,talk:talk('jay',t),mood:tl>LT('b12b')?'shock':'worry'});devil(1700,300,1.1,t,talk('devil',t),'')}
function S_b13(tl,t){const a=pop(tl,.6),b=pop(tl,2.6),cx=pop(tl,4.4);
 if(a>0){card(100,260,480,340,AMB,a);T('DEBT',340,340,34,'#4a5578','center',800);T('$3,000',340,460,100,DK,'center')}
 if(a>0&&b>0){x.globalAlpha=cl(b);T('→',690,460,110,INK,'center');x.globalAlpha=1}
 if(b>0){card(820,260,480,340,GRN,b);T('SETTLED',1060,340,34,'#4a5578','center',800);T('$1,200',1060,460,100,DK,'center')}
 if(cx>0){card(1010,640,520,180,RED,cx);T('FORGIVEN $1,800',1270,710,46,RED,'center');T('= TAXABLE INCOME?',1270,770,36,DK,'center')}
 const f=seg(tl,8.0,.4);if(f>0){x.save();x.translate(1580,330);x.rotate(.08);x.scale(f,f);x.fillStyle='#f4f1ea';rr(-130,-110,260,220,12);x.fill();T('1099-C',0,-30,46,DK,'center');T('IRS',0,40,60,RED,'center');x.restore()}
 jay(260,820,.55,{t,talk:talk('jay',t),mood:'shock'});devil(1760,820,1.0,t,talk('devil',t),'');angel(1700,420,.9,t,talk('angel',t))}
function S_b14(tl,t){const N=['DAY 1\nLATE FEE','DAY 30\nSCORE HIT','DAY 60\nPENALTY APR','6 MONTHS\nCHARGE-OFF','COLLECTORS\nLAWSUIT','7 YEARS\nON REPORT'],fr=[.12,.26,.42,.58,.74,.92],d=TL.lines.find(l=>l.id=='b14a');
 const dur=d.t1-d.t0,t0=d.t0-B.t0;x.strokeStyle='#3b4b78';x.lineWidth=14;x.lineCap='round';x.beginPath();x.moveTo(200,560);x.lineTo(1720,560);x.stroke();
 let last=-1;N.forEach((n,i)=>{const on=tl>=t0+dur*fr[i]-.3;if(on)last=i;});
 N.forEach((n,i)=>{const px=200+i*304,on=i<=last;const p=pop(tl,t0+dur*fr[i]-.3);x.fillStyle=on?(i>=4?RED:AMB):'#3b4b78';x.beginPath();x.arc(px,560,on?30:16,0,7);x.fill();
  const s=n.split('\n');x.globalAlpha=on?1:.35;T(s[0],px,660,34,INK,'center');T(s[1],px,706,24,'#9aa6c8','center',800);x.globalAlpha=1;if(on&&p>0){x.fillStyle=on?(i>=4?RED:AMB):'#fff';x.beginPath();x.arc(px,560,30+(1-ease(p))*40,0,7);x.globalAlpha=.25*(1-ease(p));x.fill();x.globalAlpha=1}});
 title('THE WHOLE TIMELINE',240,90,INK,960);angel(960,400,1.2,t,talk('angel',t));jay(260,800,.5,{t,mood:'worry'});devil(1700,800,.9,t,0)}
function S_b15(tl,t){const c1=pop(tl,.8);phone(1300,560,1.1,0,()=>{x.fillStyle='#e8ecff';T('📞',0,-100,70,DK,'center');T(tl<4?'Calling BANK…':'HARDSHIP PLAN',0,0,28,tl<4?DK:GRN,'center');if(tl>4){T('✓',0,90,80,GRN,'center')}});
 jay(520,640,1.05,{t,talk:talk('jay',t),mood:tl<6?'smile':'smile',phone:tl<4,handR:[120,170]});
 angel(960,320,1.5,t,talk('angel',t));devil(1700,360,.8,t,talk('devil',t),'bored');
 const f=seg(tl,TL.lines.find(l=>l.id=='b15c').t0-B.t0-.3,.8);window.endF=f}
const SC=[S_b1,S_b2,S_b3,S_b4,S_b5,S_b6,S_b7,S_b8,S_b9,S_b10,S_b11,S_b12,S_b13,S_b14,S_b15];
const TINT=['#16224a','#16224a','#16224a','#1d2347','#1d2347','#1a1e3f','#2a1d3a','#2e1c34','#2e1c34','#2e1c34','#1a2a4a','#1a2a4a','#1a2a4a','#16224a','#16224a'];
function hudVals(t){const i=BI;let tdy='$0.00',bk='$2,400.00',bc=INK,db='$3,000';
 if(i>=3)tdy='−$35.00';if(i>=3)db='$3,035';if(i>=5){const p=cl((t-TL.beats[5].t0)/5);db=money(3035+125*p)}if(i>=6)db='$3,160';if(i>=7)db='≈$3,400';if(i>=8)db='$3,400+';
 if(i==9&&t-B.t0>5.2||i>=10&&i<=11){bk='FROZEN';bc='#bfeaff'}if(i>=12){bk='FROZEN';bc='#bfeaff'}if(i==14&&t-B.t0>4){bk='SAVED?';bc=GRN;tdy='$0.00';db='PLAN'}return [tdy,bk,db,bc]}
function renderT(t){window.endF=0;BI=0;for(let i=0;i<TL.beats.length;i++)if(t>=TL.beats[i].t0)BI=i;B=TL.beats[BI];const id=B.id,tl=t-(BI==0?0:B.t0);
 bg(t,TINT[BI]);const cams=CAMS[id],len=BI==0?2.4:3.0,k=Math.floor(tl/len),cam=cams[k%cams.length],fr=(tl%len)/len,s=cam[2]*(1+.035*fr);
 const fx=cl(cam[0],960/s,1920-960/s),fy=cl(cam[1],540/s,1080-540/s);x.save();x.translate(960,540);x.scale(s,s);x.translate(-fx,-fy);SC[BI](tl,t);x.restore();vig();const ef=window.endF;if(ef>0){x.fillStyle=`rgba(5,8,18,${.94*ef})`;x.fillRect(0,0,1920,1080);x.globalAlpha=ef;T('Cheap advice has a price.',960,520,100,INK,'center');x.fillStyle=RED;x.fillRect(660,552,600,6);T('General information · not legal advice',960,660,34,'#9aa6c8','center',700);T('CHEAP.',960,800,60,INK,'center');x.globalAlpha=1}
 const h=hudVals(t);hud(h[0],h[1],h[2],h[3]);brand();caption(t);
 const e=TL.END;if(t<.4){x.fillStyle=`rgba(0,0,0,${1-t/.4})`;x.fillRect(0,0,1920,1080)}if(t>e-.7){x.fillStyle=`rgba(0,0,0,${(t-(e-.7))/.7})`;x.fillRect(0,0,1920,1080)}}
