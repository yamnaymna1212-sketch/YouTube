"""Generate brand design HTML pages for the channel."""
import os

OUT = os.path.dirname(os.path.abspath(__file__))

FONTS = """
@font-face{font-family:Corm;font-style:italic;font-weight:500;src:url(fonts/corm-1.ttf)}
@font-face{font-family:Corm;font-style:italic;font-weight:600;src:url(fonts/corm-2.ttf)}
@font-face{font-family:Corm;font-style:normal;font-weight:500;src:url(fonts/corm-3.ttf)}
@font-face{font-family:Corm;font-style:normal;font-weight:600;src:url(fonts/corm-4.ttf)}
@font-face{font-family:Inter;font-weight:300;src:url(fonts/inter-1.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(fonts/inter-2.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(fonts/inter-3.ttf)}
@font-face{font-family:Inter;font-weight:800;src:url(fonts/inter-4.ttf)}
@font-face{font-family:Plex;font-weight:300;src:url(fonts/plexar-1.ttf)}
@font-face{font-family:Plex;font-weight:500;src:url(fonts/plexar-2.ttf)}
@font-face{font-family:Plex;font-weight:700;src:url(fonts/plexar-3.ttf)}
@font-face{font-family:Amiri;font-style:italic;font-weight:400;src:url(fonts/amiri-1.ttf)}
@font-face{font-family:Amiri;font-weight:400;src:url(fonts/amiri-2.ttf)}
@font-face{font-family:Amiri;font-weight:700;src:url(fonts/amiri-3.ttf)}
"""

CSS = FONTS + """
:root{--bg:#0A0A0B;--bg2:#121214;--ivory:#EDE8DF;--gold:#C9A45C;--gold2:#E8C987;
--grey:#5A5A5A;--grey2:#8C8A86;--wine:#8A3B3B;--hair:rgba(237,232,223,.10)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ivory);font-family:Inter,Plex,sans-serif}
.page{position:relative;overflow:hidden;background:
 radial-gradient(120% 80% at 50% 0%, #17161a 0%, var(--bg) 60%)}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.07;mix-blend-mode:screen;
 background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.vig{position:absolute;inset:0;pointer-events:none;
 background:radial-gradient(90% 70% at 50% 50%, transparent 55%, rgba(0,0,0,.65) 100%)}
.ar{font-family:Plex;direction:rtl}
.amiri{font-family:Amiri}
.corm{font-family:Corm}
.kicker{font-family:Inter;font-weight:600;letter-spacing:.32em;font-size:13px;color:var(--gold);text-transform:uppercase}
.gold{color:var(--gold)}
.glow{text-shadow:0 0 18px rgba(232,201,135,.45)}
.wglow{text-shadow:0 0 22px rgba(237,232,223,.35)}
"""

DEFS = """
<defs>
 <linearGradient id="gfill" x1="0" y1="1" x2="0" y2="0">
  <stop offset="0" stop-color="#8E6F33"/><stop offset=".55" stop-color="#C9A45C"/><stop offset="1" stop-color="#F1D89C"/>
 </linearGradient>
 <linearGradient id="gline" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#C9A45C" stop-opacity="0"/><stop offset=".5" stop-color="#E8C987"/><stop offset="1" stop-color="#C9A45C" stop-opacity="0"/>
 </linearGradient>
 <radialGradient id="halo"><stop offset="0" stop-color="#E8C987" stop-opacity=".35"/><stop offset="1" stop-color="#E8C987" stop-opacity="0"/></radialGradient>
 <radialGradient id="whalo"><stop offset="0" stop-color="#EDE8DF" stop-opacity=".18"/><stop offset="1" stop-color="#EDE8DF" stop-opacity="0"/></radialGradient>
 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
 </filter>
 <filter id="glow2" x="-80%" y="-80%" width="260%" height="260%">
  <feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
 </filter>
</defs>
"""

_fid = [0]


def figure(x, y, s=1.0, level=0.0, mode="ivory", halo=False, uid=None):
    """Faceless figure: ring head with a 'mind' dot, arch body that fills with gold.
    (x, y) = bottom-centre on the ground. level 0..1 = wealth fill."""
    _fid[0] += 1
    cid = uid or f"b{_fid[0]}"
    body = "M-40 0 V-100 A40 40 0 0 1 40 -100 V0 Z"
    stroke = {"ivory": "#EDE8DF", "gold": "#E8C987", "grey": "#5A5A5A"}[mode]
    dash = ' stroke-dasharray="6 6"' if mode == "grey" else ""
    dot = {"ivory": "#EDE8DF", "gold": "#F1D89C", "grey": "#4A4A4A"}[mode]
    fill_h = 140 * level
    fillcol = "url(#gfill)" if mode != "grey" else "#2A2A2A"
    parts = [f'<g transform="translate({x},{y}) scale({s})">']
    if halo:
        parts.append('<circle cx="0" cy="-110" r="150" fill="url(#halo)"/>')
    parts.append(f'<clipPath id="{cid}"><path d="{body}"/></clipPath>')
    if level > 0:
        top = -fill_h
        parts.append(f'<g clip-path="url(#{cid})"><rect x="-45" y="{top}" width="90" height="{fill_h+2}" fill="{fillcol}"/>'
                     f'<path d="M-45 {top} q11 -6 22 0 t22 0 t22 0 t22 0" stroke="'+('#6A6A6A' if mode=='grey' else '#F6E2AE')+'" stroke-width="2" fill="none" opacity=".9"/></g>')
    flt = ' filter="url(#glow)"' if mode != "grey" else ""
    parts.append(f'<path d="{body}" fill="none" stroke="{stroke}" stroke-width="3.2"{dash}{flt}/>')
    parts.append(f'<circle cx="0" cy="-178" r="27" fill="#0A0A0B" stroke="{stroke}" stroke-width="3.2"{dash}{flt}/>')
    dflt = ' filter="url(#glow2)"' if mode == "gold" else ""
    parts.append(f'<circle cx="0" cy="-178" r="6" fill="{dot}"{dflt}/>')
    parts.append("</g>")
    return "".join(parts)


def ground(x1, x2, y, op=.35):
    return f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="#EDE8DF" stroke-opacity="{op}" stroke-width="1.5"/>'


def page(w, h, body, extra_css=""):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}{extra_css}
.page{{width:{w}px;height:{h}px}}</style></head><body><div class="page">{body}<div class="vig"></div><div class="grain"></div></div></body></html>"""


def write(name, html):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(html)


# ---------------------------------------------------------------- icons
I = 'fill="none" stroke="#EDE8DF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
G = 'fill="none" stroke="#C9A45C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"'
GF = 'fill="#C9A45C" filter="url(#glow)"'
ICONS = [
    ("Coin", "عملة", f'<circle cx="24" cy="24" r="15" {I}/><circle cx="24" cy="24" r="10" {G}/><path d="M24 16.5v15M27.5 19.5h-5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5h-5.5" {G}/>'),
    ("Mind", "العقل", f'<circle cx="24" cy="24" r="14" {I}/><circle cx="24" cy="24" r="4" {GF}/><path d="M6 24a18 7 0 0036 0" {I} stroke-dasharray="2 3"/>'),
    ("Wallet", "محفظة", f'<path d="M9 16h28a3 3 0 013 3v17a3 3 0 01-3 3H11a3 3 0 01-3-3V14a3 3 0 013-3h21v5" {I}/><path d="M40 23h-7a3 3 0 000 6h7" {I}/><circle cx="34" cy="26" r="1.6" {GF}/>'),
    ("Card", "بطاقة", f'<rect x="7" y="13" width="34" height="23" rx="3" {I}/><path d="M7 19h34" {I}/><rect x="11" y="24" width="8" height="6" rx="1.2" {G}/><path d="M31 30h6" {I}/>'),
    ("Trap", "فخ", f'<path d="M8 32a16 16 0 0132 0" {I}/><path d="M10 32l3-5 3 4 3-5 3 4 3-5 3 4 3-5 3 4 3-5 2 4" {I}/><path d="M6 36h36" {I}/><circle cx="24" cy="19" r="4" {G}/>'),
    ("Cage", "قفص", f'<path d="M12 40V20a12 12 0 0124 0v20M8 40h32" {I}/><path d="M18 11v29M24 8v32M30 11v29" {I}/><circle cx="24" cy="30" r="2.6" {GF}/>'),
    ("Hourglass", "الوقت", f'<path d="M13 7h22M13 41h22M15 7c0 9 9 11 9 17s-9 8-9 17M33 7c0 9-9 11-9 17s9 8 9 17" {I}/><path d="M18 37l6-6 6 6z" {GF}/>'),
    ("Compound", "نمو مركب", f'<circle cx="24" cy="38" r="5" {G}/><path d="M24 33V15" {I}/><path d="M24 22c-7 0-10-4-10-9 6 0 10 3 10 9zM24 17c0-6 4-9 10-9 0 5-3 9-10 9z" {I}/><path d="M24 26c5 0 8-2 9-6" {G}/>'),
    ("Leak", "تسريب", f'<path d="M11 12h26l-3 22a3 3 0 01-3 3H17a3 3 0 01-3-3z" {I}/><path d="M11 12a13 3 0 0026 0" {I}/><path d="M30 37v0M33 41c0 1.5-1 2.5-2 2.5s-2-1-2-2.5 2-4 2-4 2 2.5 2 4z" {G}/>'),
    ("Bag", "شراء", f'<path d="M10 17h28l-2 23H12z" {I}/><path d="M18 20v-5a6 6 0 0112 0v5" {I}/><path d="M29 27l5 5-5 5-5-5z" {G}/>'),
    ("Growth", "صعود", f'<path d="M8 8v32h32" {I}/><path d="M13 33l8-8 6 5 11-13" {G}/><path d="M32 17h6v6" {G}/>'),
    ("Scale", "ميزان", f'<path d="M24 8v32M15 40h18M10 14h28" {I}/><path d="M10 14l-5 12h10zM38 14l-5 8h10" {I}/><path d="M5 26a5 3 0 0010 0" {G}/><circle cx="24" cy="8" r="2" {GF}/>'),
    ("Key", "مفتاح", f'<circle cx="15" cy="24" r="7" {G}/><path d="M22 24h19M35 24v6M40 24v4" {I}/>'),
    ("Shield", "أمان", f'<path d="M24 6l15 6v10c0 10-7 17-15 20-8-3-15-10-15-20V12z" {I}/><path d="M17 24l5 5 9-10" {G}/>'),
    ("House", "أصل", f'<path d="M7 22L24 8l17 14M11 19v21h26V19" {I}/><path d="M20 40V29h8v11" {G}/>'),
    ("Law", "قانون", f'<path d="M12 8h18l6 6v26H12z" {I}/><path d="M30 8v6h6M17 22h14M17 27h14" {I}/><path d="M17 33h9" {G}/>'),
]


def icon_svg(inner, size=96):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 48 48">{DEFS}{inner}</svg>'


def build_icons():
    cells = "".join(
        f'<div class="cell"><div class="ic">{icon_svg(svg)}</div><div class="nm">{en}</div><div class="nma ar">{ar}</div></div>'
        for en, ar, svg in ICONS)
    body = f"""
<div class="wrap">
 <div class="kicker">Icon System · 02</div>
 <h1 class="corm">Line &amp; <i class="gold">Gold</i></h1>
 <p class="ar sub">خط عاجي رفيع · لمسة ذهبية وحدة فقط في كل أيقونة · نفس السُمك دائماً</p>
 <div class="grid">{cells}</div>
 <div class="rules">
  <div><b>1.8px</b><span>stroke ثابت</span></div>
  <div><b>48</b><span>شبكة 48×48</span></div>
  <div><b>1</b><span>عنصر ذهبي فقط</span></div>
  <div><b>Round</b><span>نهايات دائرية</span></div>
 </div>
</div>"""
    css = """
.wrap{position:relative;z-index:2;padding:80px 64px}
h1{font-size:76px;font-weight:500;margin:14px 0 6px;letter-spacing:-.01em}
.sub{font-size:22px;color:var(--grey2);font-weight:300;text-align:left}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:54px}
.cell{border:1px solid var(--hair);border-radius:18px;padding:26px 10px 20px;text-align:center;
 background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0))}
.ic{display:flex;justify-content:center}
.nm{font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:var(--ivory);margin-top:14px;font-weight:600}
.nma{font-size:17px;color:var(--grey2);margin-top:4px;text-align:center}
.rules{display:grid;grid-template-columns:repeat(4,1fr);margin-top:46px;border-top:1px solid var(--hair);padding-top:30px}
.rules div{text-align:center}.rules b{display:block;font-family:Corm;font-size:42px;color:var(--gold);font-weight:500}
.rules span{font-family:Plex;font-size:17px;color:var(--grey2)}
"""
    write("icons.html", page(1080, 1480, body, css))


# ---------------------------------------------------------------- characters
def build_characters():
    def card(svg_inner, en, ar, desc, vb="0 0 300 330"):
        return f"""<div class="cc"><svg viewBox="{vb}" width="100%">{DEFS}{svg_inner}</svg>
<div class="ce">{en}</div><div class="ca ar">{ar}</div><div class="cd ar">{desc}</div></div>"""

    base = ground(20, 280, 300) + figure(150, 300, .95, 0, "ivory")
    rich = ground(20, 280, 300) + figure(150, 300, .95, .72, "gold", halo=True)
    lost = ground(20, 280, 300) + figure(150, 300, .95, .08, "grey")
    # trapped: figure inside cage
    cage = "".join(f'<line x1="{x}" y1="{300}" x2="{x}" y2="{(70 if 110<x<190 else 90)}" stroke="#EDE8DF" stroke-opacity=".8" stroke-width="2"/>'
                   for x in range(80, 225, 16))
    cage += '<path d="M80 90 Q150 30 220 90" stroke="#EDE8DF" stroke-opacity=".8" stroke-width="2" fill="none"/>'
    coins = "".join(f'<circle cx="{cx}" cy="{cy}" r="6" fill="none" stroke="#C9A45C" stroke-width="2" filter="url(#glow)"/>'
                    for cx, cy in [(250, 150), (262, 200), (246, 250), (40, 180)])
    trapped = ground(20, 280, 300) + figure(150, 300, .8, .15, "ivory") + cage + coins
    # leaking: gold fill with drops
    drops = "".join(f'<path d="M{x} {y} c0 5 -4 7 -4 10 a4 4 0 008 0 c0-3-4-5-4-10z" fill="#C9A45C" filter="url(#glow)" opacity="{o}"/>'
                    for x, y, o in [(196, 240, 1), (210, 262, .8), (224, 282, .6)])
    puddle = '<ellipse cx="236" cy="300" rx="26" ry="3" fill="#C9A45C" opacity=".5" filter="url(#glow)"/>'
    leak = ground(20, 280, 300) + figure(140, 300, .95, .45, "ivory") + drops + puddle
    # thinking / bias: orbit of dotted ring with question
    think = ground(20, 280, 300) + figure(150, 300, .95, .3, "ivory") + \
        '<g transform="translate(150,80)"><ellipse rx="70" ry="20" fill="none" stroke="#EDE8DF" stroke-opacity=".5" stroke-dasharray="3 6"/>' \
        '<circle cx="-70" cy="0" r="5" fill="#C9A45C" filter="url(#glow)"/><circle cx="52" cy="13" r="3" fill="#EDE8DF"/></g>'
    duo = ground(10, 290, 300) + figure(90, 300, .78, .78, "gold", halo=True) + figure(215, 300, .78, .06, "grey") + \
        '<text x="90" y="324" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#C9A45C" letter-spacing="3">A</text>' \
        '<text x="215" y="324" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#5A5A5A" letter-spacing="3">B</text>'
    # climbing: steps
    steps = '<path d="M20 300 H80 V260 H130 V220 H180 V180 H240 V140 H285" fill="none" stroke="#EDE8DF" stroke-opacity=".55" stroke-width="2"/>' \
            '<path d="M240 140 H285" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>'
    climb = steps + figure(155, 220, .55, .5, "gold")
    # crowd / everyone: many small grey + one gold
    crowd = ground(10, 290, 300)
    for i, x in enumerate(range(35, 280, 38)):
        crowd += figure(x, 300, .32, .55 if i == 3 else 0, "gold" if i == 3 else "grey", halo=(i == 3))

    cards = [
        card(base, "The Mind", "الأساس", "شخصية بدون وجه. الرأس حلقة، والنقطة = العقل."),
        card(rich, "Gold State", "حالة الذهب", "الجسم وعاء يتعبى بالذهب حسب ثروته الحقيقية."),
        card(lost, "Faded State", "حالة الخسارة", "خط متقطع رمادي = فقد الثروة والسيطرة."),
        card(duo, "A / B", "الشخصيتان الثابتتان", "نفس الراتب. قرارات مختلفة. بكل الحلقات."),
        card(leak, "The Leak", "التسريب", "الصرف العاطفي: الذهب يتسرب من الجسم."),
        card(trapped, "The Trap", "الفخ", "الدين والعادات: قفص والذهب خارجه."),
        card(think, "The Bias", "التحيّز", "حلقة أفكار حول الرأس = خدعة نفسية."),
        card(climb, "The Climb", "الصعود", "عادة صغيرة كل يوم = درجة جديدة."),
        card(crowd, "The 1%", "الواحد من المئة", "الكل رمادي… واحد بس اختار الذهب."),
    ]
    body = f"""
<div class="wrap">
 <div class="kicker">Character System · 01</div>
 <h1 class="corm">The <i class="gold">Vessel</i></h1>
 <p class="ar sub">الفكرة المميزة: الإنسان = وعاء. ما نشوف فلوسه… نشوف <b class="gold">مستوى الذهب داخله</b> يرتفع وينزل مع كل قرار.</p>
 <div class="grid">{''.join(cards)}</div>
</div>"""
    css = """
.wrap{position:relative;z-index:2;padding:80px 56px}
h1{font-size:76px;font-weight:500;margin:14px 0 8px}
.sub{font-size:23px;color:var(--grey2);font-weight:300;line-height:1.7;text-align:right}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.cc{border:1px solid var(--hair);border-radius:18px;padding:14px 14px 22px;
 background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))}
.ce{font-size:13px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--gold);margin-top:6px}
.ca{font-size:21px;font-weight:700;margin-top:4px;text-align:right}
.cd{font-size:15px;color:var(--grey2);margin-top:6px;line-height:1.6;text-align:right;font-weight:300}
"""
    write("characters.html", page(1080, 1700, body, css))


# ---------------------------------------------------------------- brand board
LOGO = f"""<svg width="150" height="150" viewBox="0 0 120 120">{DEFS}
<circle cx="60" cy="60" r="56" fill="url(#halo)"/>
<circle cx="60" cy="60" r="38" fill="none" stroke="#EDE8DF" stroke-width="2.5" filter="url(#glow)"/>
<path d="M22 60a38 38 0 0076 0" fill="none" stroke="#C9A45C" stroke-width="2.5" filter="url(#glow)"/>
<circle cx="60" cy="60" r="8" fill="#F1D89C" filter="url(#glow2)"/></svg>"""


def build_board():
    sw = [("#0A0A0B", "Obsidian", "الخلفية", "70%"), ("#EDE8DF", "Ivory", "الخطوط والنص", "20%"),
          ("#C9A45C", "Aurum", "الذهب = المال فقط", "8%"), ("#5A5A5A", "Ash", "الخسارة", "2%"),
          ("#8A3B3B", "Wine", "تحذير نادر", "<1%")]
    sws = "".join(f'<div class="sw"><div class="chip" style="background:{c};{"border:1px solid #2a2a2a" if c=="#0A0A0B" else ""}"></div>'
                  f'<div class="sn">{n}</div><div class="sa ar">{a}</div><div class="sh">{c}</div><div class="sp">{p}</div></div>' for c, n, a, p in sw)
    body = f"""
<div class="wrap">
 <div class="kicker">Brand Identity · 00</div>
 <div class="logo">{LOGO}
  <div><div class="wm ar">عقل الذهب</div><div class="wme">THE GOLD MIND</div></div></div>
 <p class="ar tag">سيكولوجية المال · ليش الأذكياء يتخذون قرارات مالية غبية — وكيف توقفها</p>
 <div class="sec">Palette — <span class="ar">قاعدة 70 / 20 / 8</span></div>
 <div class="sws">{sws}</div>
 <div class="sec">Typography</div>
 <div class="type">
  <div class="t1 ar">الراتب لا يصنع الثروة</div>
  <div class="t2 amiri gold glow">العادات تصنعها.</div>
  <div class="t3 corm">Wealth is what you <i class="gold">don’t</i> see.</div>
  <div class="t4">INTER 800 — LAW #07 · NET WORTH · YEAR 10</div>
  <div class="legend">
   <span><b>IBM Plex Arabic</b> النص الأساسي</span><span><b>Amiri</b> كلمة الذهب</span>
   <span><b>Cormorant</b> English serif</span><span><b>Inter</b> أرقام وعناوين</span></div>
 </div>
 <div class="sec">The Gold Rule — <span class="ar">قاعدة الذهب</span></div>
 <div class="rule">
  <svg viewBox="0 0 960 190" width="100%">{DEFS}
   {ground(0,960,170,.3)}
   <path d="M40 170 C200 160 300 120 420 110 S700 60 920 20" fill="none" stroke="#EDE8DF" stroke-opacity=".35" stroke-width="1.6" stroke-dasharray="4 7"/>
   <path d="M420 110 C560 98 700 60 920 20" fill="none" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
   <circle cx="420" cy="110" r="6" fill="#F1D89C" filter="url(#glow2)"/>
   <circle cx="920" cy="20" r="7" fill="#F1D89C" filter="url(#glow2)"/>
   <text x="40" y="150" font-family="Inter" font-size="13" fill="#8C8A86" letter-spacing="3">NOISE</text>
   <text x="432" y="138" font-family="Inter" font-size="13" fill="#C9A45C" letter-spacing="3">REAL MONEY</text>
  </svg>
  <p class="ar">كل شي بالفيديو عاجي ورمادي. <b class="gold">الذهبي يظهر فقط على الثروة الحقيقية</b> — ادخار، أصل، نمو مركب. المشاهد يتعلم يلحق الذهب.</p>
 </div>
 <div class="dont">
  <div><b class="gold">✓</b><span class="ar">شخصيات بدون وجه · خطوط · توهج خفيف</span></div>
  <div><b style="color:#8A3B3B">✕</b><span class="ar">كرتون ملون · وجوه · ألوان نيون · خطوط مزخرفة</span></div>
 </div>
</div>"""
    css = """
.wrap{position:relative;z-index:2;padding:80px 64px}
.logo{display:flex;align-items:center;gap:26px;margin-top:30px}
.wm{font-family:Plex;font-weight:700;font-size:64px;line-height:1.1}
.wme{font-family:Inter;font-weight:300;letter-spacing:.55em;font-size:18px;color:var(--gold);margin-top:6px}
.tag{font-size:21px;color:var(--grey2);font-weight:300;margin-top:22px;text-align:right}
.sec{font-family:Inter;font-weight:600;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--grey2);
 margin:58px 0 20px;padding-bottom:12px;border-bottom:1px solid var(--hair)}
.sec .ar{font-family:Plex;letter-spacing:0;font-size:16px}
.sws{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.chip{height:150px;border-radius:14px;margin-bottom:12px}
.sn{font-family:Corm;font-size:26px;font-weight:600}.sa{font-size:15px;color:var(--grey2);text-align:left}
.sh{font-family:Inter;font-size:13px;color:var(--grey2);margin-top:6px;letter-spacing:.08em}
.sp{font-family:Inter;font-weight:800;font-size:20px;color:var(--gold);margin-top:2px}
.type .t1{font-family:Plex;font-weight:700;font-size:70px;text-align:right;line-height:1.2}
.type .t2{font-size:76px;text-align:right;line-height:1.3;font-style:italic}
.type .t3{font-size:44px;margin-top:16px;font-weight:500}
.type .t4{font-family:Inter;font-weight:800;font-size:18px;letter-spacing:.25em;color:var(--grey2);margin-top:14px}
.legend{display:grid;grid-template-columns:repeat(2,1fr);gap:8px 20px;margin-top:22px;font-family:Plex;font-size:16px;color:var(--grey2);direction:rtl}
.legend b{color:var(--ivory);font-family:Inter;font-weight:600;margin-left:8px}
.rule p{font-size:22px;line-height:1.8;font-weight:300;margin-top:14px;text-align:right}
.dont{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:40px}
.dont div{border:1px solid var(--hair);border-radius:14px;padding:18px 20px;display:flex;gap:12px;align-items:center;direction:rtl}
.dont b{font-size:24px}.dont span{font-size:18px;color:var(--grey2)}
"""
    write("brand-board.html", page(1080, 1780, body, css))


# ---------------------------------------------------------------- video frames 1080x1920
TICKER = """<div class="tick"><div class="tl">NET WORTH</div><div class="tv">{v}</div><div class="td" style="color:{c}">{d}</div></div>"""
FRAME_CSS = """
.tick{position:absolute;top:150px;right:70px;text-align:right;z-index:3}
.tl{font-family:Inter;font-weight:600;font-size:16px;letter-spacing:.32em;color:var(--grey2)}
.tv{font-family:Inter;font-weight:300;font-size:58px;letter-spacing:-.01em;font-variant-numeric:tabular-nums;margin-top:4px}
.td{font-family:Inter;font-weight:600;font-size:22px;letter-spacing:.06em}
.law{position:absolute;top:158px;left:70px;z-index:3;font-family:Inter;font-weight:600;font-size:16px;letter-spacing:.32em;color:var(--gold);
 border:1px solid rgba(201,164,92,.45);padding:10px 16px;border-radius:999px}
.src{position:absolute;bottom:120px;left:0;right:0;text-align:center;font-family:Inter;font-size:15px;color:#4f4e4b;letter-spacing:.06em;z-index:3}
.cap{position:absolute;left:60px;right:60px;z-index:3;text-align:center;direction:rtl}
.stage{position:absolute;inset:0;z-index:2}
"""


def build_frames():
    # Frame 1: hook
    rain = "".join(f'<path d="M{x} {y} c0 7 -6 10 -6 15 a6 6 0 0012 0 c0-5-6-8-6-15z" fill="#C9A45C" opacity="{o}" filter="url(#glow)"/>'
                   for x, y, o in [(640, 1300, 1), (668, 1370, .85), (690, 1440, .7), (708, 1505, .5)])
    bags = ""
    for i, (bx, s) in enumerate([(760, 1), (850, .8), (925, .65)]):
        bags += (f'<g transform="translate({bx},1560) scale({s*2.2})" opacity="{.75-i*.15}">'
                 '<path d="M-14 -36h28l-3 36h-22z M-7 -36v-6a7 7 0 0114 0v6" fill="none" stroke="#EDE8DF" stroke-width="1.4"/></g>')
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
<circle cx="520" cy="1250" r="520" fill="url(#whalo)"/>
{ground(0,1080,1560,.4)}
{figure(520, 1560, 2.2, .38, "ivory")}{rain}{bags}
<path d="M80 1560 C 250 1540 300 1470 400 1460" stroke="#EDE8DF" stroke-opacity=".18" fill="none" stroke-dasharray="3 8"/>
</svg>"""
    body = f"""<div class="law">LAW #03</div>{TICKER.format(v='$12,480', d='▼ 340', c='#8C8A86')}
<div class="cap" style="top:330px">
 <div class="ar" style="font-size:52px;font-weight:300;color:var(--grey2)">ليش</div>
 <div class="ar wglow" style="font-size:118px;font-weight:700;line-height:1.15">تصرف أكثر</div>
 <div class="amiri gold glow" style="font-size:120px;font-style:italic;line-height:1.2">لما تحزن؟</div>
</div>{stage}
<div class="src">Source: Lerner et al., Psychological Science (2004)</div>"""
    write("frame-1-hook.html", page(1080, 1920, body, FRAME_CSS))

    # Frame 2: A vs B, year 10
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
{ground(0,1080,1500,.4)}
<path d="M120 1500 C 300 1490 420 1380 600 1250 S 900 900 1000 820" fill="none" stroke="#EDE8DF" stroke-opacity=".2" stroke-dasharray="3 9"/>
{figure(330, 1500, 2.0, .8, "gold", halo=True)}{figure(760, 1500, 2.0, .07, "grey")}
<text x="330" y="1580" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="8" fill="#C9A45C">A</text>
<text x="760" y="1580" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="8" fill="#5A5A5A">B</text>
<text x="330" y="1650" text-anchor="middle" font-family="Inter" font-weight="300" font-size="54" fill="#E8C987" filter="url(#glow)">$184,200</text>
<text x="760" y="1650" text-anchor="middle" font-family="Inter" font-weight="300" font-size="54" fill="#5A5A5A">$3,150</text>
</svg>"""
    body = f"""<div class="law">YEAR 10</div>
<div class="cap" style="top:300px">
 <div class="ar" style="font-size:60px;font-weight:300;color:var(--grey2)">نفس الراتب.</div>
 <div class="ar wglow" style="font-size:104px;font-weight:700;line-height:1.2">نفس المدينة.</div>
 <div class="amiri gold glow" style="font-size:108px;font-style:italic;line-height:1.3">عادة وحدة مختلفة.</div>
</div>{stage}
<div class="src">Illustrative example · 10% savings at 7% / year</div>"""
    write("frame-2-duo.html", page(1080, 1920, body, FRAME_CSS))

    # Frame 3: pause & guess
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
{ground(0,1080,1560,.35)}
{figure(540, 1560, 1.6, .15, "ivory")}
<g transform="translate(540,1050)">
 <circle r="150" fill="none" stroke="#EDE8DF" stroke-opacity=".15" stroke-width="2"/>
 <path d="M0 -150 A150 150 0 1 1 -129.9 75" fill="none" stroke="#C9A45C" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>
 <text y="22" text-anchor="middle" font-family="Inter" font-weight="300" font-size="88" fill="#EDE8DF">3</text>
</g></svg>"""
    body = f"""<div class="law">LAW #07</div>
<div class="cap" style="top:300px">
 <div class="kicker" style="font-size:18px;direction:ltr">PAUSE · GUESS</div>
 <div class="ar wglow" style="font-size:66px;font-weight:700;line-height:1.45;margin-top:26px">دين <span class="gold glow" style="font-family:Inter;font-weight:300">$2,000</span> بالحد الأدنى للسداد…</div>
 <div class="ar" style="font-size:52px;font-weight:300;color:var(--grey2);margin-top:6px">كم سنة تحتاج؟</div>
 <div class="opts"><div class="o">3 سنوات</div><div class="o g">18 سنة</div></div>
</div>{stage}"""
    css = FRAME_CSS + """.opts{display:flex;gap:26px;justify-content:center;margin-top:44px}
.o{font-family:Plex;font-weight:500;font-size:42px;border:1.5px solid rgba(237,232,223,.35);border-radius:18px;padding:18px 44px}
.o.g{border-color:rgba(201,164,92,.7);color:var(--gold2);box-shadow:0 0 30px rgba(201,164,92,.25) inset}"""
    write("frame-3-guess.html", page(1080, 1920, body, css))

    # Frame 4: law end card
    body = f"""<div class="cap" style="top:640px">
 <div class="kicker" style="font-size:22px;direction:ltr">LAW #07</div>
 <div class="ar wglow" style="font-size:96px;font-weight:700;line-height:1.3;margin-top:40px">الحد الأدنى للسداد</div>
 <div class="amiri gold glow" style="font-size:112px;font-style:italic;line-height:1.35">مصمم لتبقى مديون.</div>
 <svg width="760" height="40" viewBox="0 0 760 40" style="margin-top:10px">{DEFS}
  <path d="M10 22 C 200 10 520 34 750 16" stroke="url(#gline)" stroke-width="4" fill="none" filter="url(#glow)" stroke-linecap="round"/></svg>
 <div class="ar" style="font-size:40px;font-weight:300;color:var(--grey2);margin-top:60px;line-height:1.6">الحركة: ادفع ضعف الحد الأدنى · هذا الشهر</div>
</div>
<div style="position:absolute;bottom:170px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:18px;z-index:3">
 {LOGO.replace('width="150" height="150"','width="64" height="64"')}
 <div style="text-align:left"><div class="ar" style="font-weight:700;font-size:30px;text-align:left">عقل الذهب</div>
 <div style="font-family:Inter;font-weight:300;letter-spacing:.45em;font-size:13px;color:var(--gold)">THE GOLD MIND</div></div>
</div>
<div style="position:absolute;bottom:110px;left:0;right:0;text-align:center;font-family:Inter;font-weight:600;letter-spacing:.32em;font-size:15px;color:var(--grey2);z-index:3">NEXT · LAW #08 →</div>"""
    write("frame-4-law.html", page(1080, 1920, body, FRAME_CSS))


# ---------------------------------------------------------------- thumbnail 1280x720
def build_thumb():
    cage = "".join(f'<line x1="{x}" y1="660" x2="{x}" y2="{250 if 905<x<1095 else 300}" stroke="#EDE8DF" stroke-opacity=".85" stroke-width="3"/>'
                   for x in range(830, 1175, 30))
    cage += '<path d="M830 300 Q1000 160 1170 300" stroke="#EDE8DF" stroke-opacity=".85" stroke-width="3" fill="none"/>'
    stage = f"""<svg class="stage" viewBox="0 0 1280 720">{DEFS}
<circle cx="1000" cy="460" r="330" fill="url(#whalo)"/>{ground(700,1280,660,.4)}
{figure(1000, 660, 1.45, .1, "grey")}{cage}
<circle cx="1210" cy="420" r="16" fill="none" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
<circle cx="1240" cy="520" r="12" fill="none" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
</svg>"""
    body = f"""{stage}
<div style="position:absolute;left:70px;top:150px;z-index:3">
 <div style="font-family:Inter;font-weight:800;font-size:230px;line-height:.9;color:var(--gold2);text-shadow:0 0 50px rgba(232,201,135,.5)">18</div>
 <div class="ar" style="font-size:90px;font-weight:700;text-align:left;margin-top:10px" >سنة دين</div>
 <div class="amiri" style="font-size:52px;font-style:italic;color:var(--grey2);text-align:left;direction:rtl">بسبب زر واحد</div>
</div>
<div style="position:absolute;left:70px;bottom:44px;z-index:3;font-family:Inter;font-weight:600;letter-spacing:.32em;font-size:16px;color:var(--gold)">LAW #07</div>"""
    write("thumbnail.html", page(1280, 720, body, FRAME_CSS))


if __name__ == "__main__":
    build_board()
    build_characters()
    build_icons()
    build_frames()
    build_thumb()
    print("ok")
