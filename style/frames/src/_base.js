// Shared look for all style frames: "الدفتر المفتوح" (Open Ledger Collage)
const { auditor, POSES, C } = require('../auditor.js');
const A = '../assets/'; // real assets (see ../assets/LICENSES.md)

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@500;700;900&family=IBM+Plex+Sans+Arabic:wght@400;600&family=Oswald:wght@500;700&family=IBM+Plex+Mono:wght@500&family=Playfair+Display:ital,wght@1,700&display=block');
:root{--navy:#0f2a46;--navy2:#0b2038;--coat:#15171c;--coat2:#252a33;--red:#d6453d;--gold:#e8b23a;--ivory:#ede6d6;--yellow:#f2c230}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden;background:var(--navy)}
body{position:relative;font-family:'IBM Plex Sans Arabic',sans-serif;color:var(--ivory)}
/* ledger paper: faint rules + red margin line = the channel's fingerprint */
.bg{position:absolute;inset:0;background:
  radial-gradient(ellipse at 50% 45%, rgba(255,255,255,.05), transparent 60%),
  repeating-linear-gradient(0deg, rgba(237,230,214,.045) 0 2px, transparent 2px 54px), var(--navy)}
.bg:after{content:'';position:absolute;top:0;bottom:0;right:150px;width:3px;background:rgba(214,69,61,.35)}
.vignette{position:absolute;inset:0;background:radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55));pointer-events:none;z-index:50}
.grain{position:absolute;inset:-50%;z-index:51;opacity:.12;pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
/* case header strip */
.case{position:absolute;top:44px;right:190px;left:80px;display:flex;justify-content:space-between;align-items:center;z-index:40;
  font-family:'Oswald';letter-spacing:.18em;font-size:22px;color:rgba(237,230,214,.7)}
.case b{color:var(--gold);font-weight:700}
.case .ar{font-family:'Noto Kufi Arabic';letter-spacing:0;font-size:24px}
/* source footnote — always on screen when a fact is shown */
.src{position:absolute;bottom:40px;left:80px;z-index:40;font-family:'IBM Plex Mono';font-size:19px;color:rgba(237,230,214,.6);direction:ltr}
.src:before{content:'◆ SOURCE  ';color:var(--red)}
.h1{font-family:'Noto Kufi Arabic';font-weight:900;line-height:1.15;color:var(--ivory)}
.num{font-family:'Oswald';font-weight:700;color:var(--gold);direction:ltr}
/* real photo cutout: halftone-ish B&W + thick paper edge + lift shadow */
.cut{position:absolute;filter:grayscale(1) contrast(1.25) brightness(1.05)
  drop-shadow(0 0 0 var(--ivory)) drop-shadow(5px 0 0 var(--ivory)) drop-shadow(-5px 0 0 var(--ivory)) drop-shadow(0 5px 0 var(--ivory)) drop-shadow(0 -5px 0 var(--ivory))
  drop-shadow(14px 18px 0 rgba(0,0,0,.35))}
.dots{position:absolute;inset:0;background:radial-gradient(circle, rgba(15,42,70,.35) 1.2px, transparent 1.6px) 0 0/7px 7px;mix-blend-mode:multiply}
/* evidence tag for real logos */
.tag{position:absolute;background:#fbf8f1;border-radius:14px;padding:26px 34px 20px;box-shadow:12px 16px 0 rgba(0,0,0,.3);
  display:flex;flex-direction:column;align-items:center;gap:12px;color:var(--coat)}
.tag:before{content:'';position:absolute;top:12px;left:50%;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--navy);box-shadow:inset 0 0 0 4px #cfc6b4}
.tag img{display:block;margin-top:10px}
.tag span{font-family:'Oswald';font-size:20px;letter-spacing:.16em;color:#5a5f6b}
.tag i{font-style:normal;font-family:'Noto Kufi Arabic';font-size:22px;font-weight:700;color:var(--coat)}
/* real document */
.doc{position:absolute;background:#fff;box-shadow:18px 22px 0 rgba(0,0,0,.35);overflow:hidden}
.hl{position:absolute;background:var(--yellow);mix-blend-mode:multiply;opacity:.75;border-radius:4px}
.label{position:absolute;font-family:'Noto Kufi Arabic';font-weight:700;font-size:30px;background:var(--coat);color:var(--ivory);padding:8px 22px;border-right:6px solid var(--red)}
.label small{display:block;font-family:'IBM Plex Mono';font-weight:500;font-size:15px;color:rgba(237,230,214,.6);direction:ltr;text-align:right}
`;

const page = (body, { title = '', src = '', caseNo = '01', caseName = 'BYBIT', date = '21.02.2025' } = {}) => `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head>
<body><div class="bg"></div>
<div class="case"><span class="ar">الملف <b>${caseNo}</b> · ${caseName}</span><span style="direction:ltr">${date}</span></div>
${body}
${src ? `<div class="src">${src}</div>` : ''}
<div class="vignette"></div><div class="grain"></div></body></html>`;

// Auditor placed in a frame: x,y = top-left in px, h = height in px
const who = (pose, x, y, h = 620, flip = false) =>
  `<svg style="position:absolute;left:${x}px;top:${y}px;height:${h}px;z-index:30;overflow:visible;${flip ? 'transform:scaleX(-1)' : ''}" viewBox="0 0 400 720">${auditor(POSES[pose] || pose)}</svg>`;

// hand-drawn red circle (annotation)
const ring = (x, y, w, h, rot = -3) => `<svg style="position:absolute;left:${x}px;top:${y}px;z-index:35;overflow:visible" width="${w}" height="${h}">
  <path d="M${w * .08} ${h * .55} C ${w * .05} ${h * .05}, ${w * .9} ${-h * .05}, ${w * .96} ${h * .45} S ${w * .3} ${h * 1.08}, ${w * .1} ${h * .4}" transform="rotate(${rot} ${w / 2} ${h / 2})"
  fill="none" stroke="#d6453d" stroke-width="7" stroke-linecap="round"/></svg>`;

module.exports = { page, who, ring, A, C };
