"""English (US audience) brand pages. Reuses the drawing engine from gen.py."""
from gen import DEFS, ICONS, LOGO, FRAME_CSS, TICKER, figure, ground, icon_svg, page, write

BRAND = "THE GOLD MIND"

H1 = ".h1{font-family:Corm;font-size:84px;font-weight:500;line-height:1;margin:16px 0 10px;letter-spacing:-.01em}"
SUB = ".sub{font-family:Inter;font-weight:300;font-size:22px;line-height:1.6;color:var(--grey2);max-width:900px}"
SANS = ".bold{font-family:Inter;font-weight:800;letter-spacing:-.025em}"


def build_board():
    sw = [("#0A0A0B", "Obsidian", "Background", "70%"), ("#EDE8DF", "Ivory", "Lines & text", "20%"),
          ("#C9A45C", "Aurum", "Real money only", "8%"), ("#5A5A5A", "Ash", "Loss / noise", "2%"),
          ("#8A3B3B", "Wine", "Rare warning", "<1%")]
    sws = "".join(f'<div class="sw"><div class="chip" style="background:{c};{"border:1px solid #2a2a2a" if c=="#0A0A0B" else ""}"></div>'
                  f'<div class="sn">{n}</div><div class="sa">{a}</div><div class="sh">{c}</div><div class="sp">{p}</div></div>' for c, n, a, p in sw)
    body = f"""
<div class="wrap">
 <div class="kicker">Brand Identity · 00</div>
 <div class="logo">{LOGO}
  <div><div class="wm corm">The Gold <i class="gold">Mind</i></div><div class="wme">MONEY PSYCHOLOGY</div></div></div>
 <p class="sub" style="margin-top:22px">Why smart people make dumb money decisions — and how to stop.</p>
 <div class="sec">Palette — the 70 / 20 / 8 rule</div>
 <div class="sws">{sws}</div>
 <div class="sec">Typography</div>
 <div class="type">
  <div class="t1 bold wglow">YOUR SALARY DOESN’T</div>
  <div class="t1 bold wglow">BUILD WEALTH.</div>
  <div class="t2 corm gold glow"><i>Your habits do.</i></div>
  <div class="t4">INTER 800 — LAW #07 · NET WORTH · YEAR 10 · $184,200</div>
  <div class="legend">
   <span><b>Inter 800</b> headlines, all caps</span><span><b>Cormorant Italic</b> the gold word</span>
   <span><b>Inter 300</b> numbers & ticker</span><span><b>Inter 600</b> labels, wide tracking</span></div>
 </div>
 <div class="sec">The Gold Rule</div>
 <div class="rule">
  <svg viewBox="0 0 960 190" width="100%">{DEFS}
   {ground(0,960,170,.3)}
   <path d="M40 170 C200 160 300 120 420 110" fill="none" stroke="#EDE8DF" stroke-opacity=".35" stroke-width="1.6" stroke-dasharray="4 7"/>
   <path d="M420 110 C560 98 700 60 920 20" fill="none" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
   <circle cx="420" cy="110" r="6" fill="#F1D89C" filter="url(#glow)"/>
   <circle cx="920" cy="20" r="7" fill="#F1D89C" filter="url(#glow)"/>
   <text x="40" y="150" font-family="Inter" font-size="13" fill="#8C8A86" letter-spacing="3">NOISE</text>
   <text x="432" y="138" font-family="Inter" font-size="13" fill="#C9A45C" letter-spacing="3">REAL MONEY</text>
  </svg>
  <p>Everything on screen is ivory and grey. <b class="gold">Gold appears only on real wealth</b> — savings, assets, compound growth. The viewer learns to follow the gold.</p>
 </div>
 <div class="dont">
  <div><b class="gold">✓</b><span>Faceless figures · thin lines · soft glow</span></div>
  <div><b style="color:#8A3B3B">✕</b><span>Colorful cartoons · faces · neon · stock footage</span></div>
 </div>
</div>"""
    css = H1 + SUB + SANS + """
.wrap{position:relative;z-index:2;padding:80px 64px}
.logo{display:flex;align-items:center;gap:26px;margin-top:30px}
.wm{font-size:78px;font-weight:500;line-height:1}
.wme{font-family:Inter;font-weight:300;letter-spacing:.55em;font-size:17px;color:var(--grey2);margin-top:12px}
.sec{font-family:Inter;font-weight:600;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--grey2);
 margin:58px 0 20px;padding-bottom:12px;border-bottom:1px solid var(--hair)}
.sws{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.chip{height:150px;border-radius:14px;margin-bottom:12px}
.sn{font-family:Corm;font-size:26px;font-weight:600}.sa{font-family:Inter;font-size:14px;color:var(--grey2)}
.sh{font-family:Inter;font-size:13px;color:var(--grey2);margin-top:6px;letter-spacing:.08em}
.sp{font-family:Inter;font-weight:800;font-size:20px;color:var(--gold);margin-top:2px}
.type .t1{font-size:68px;line-height:1.02}
.type .t2{font-size:92px;line-height:1.1;font-weight:500}
.type .t4{font-family:Inter;font-weight:800;font-size:16px;letter-spacing:.22em;color:var(--grey2);margin-top:18px}
.legend{display:grid;grid-template-columns:repeat(2,1fr);gap:8px 20px;margin-top:22px;font-family:Inter;font-size:16px;color:var(--grey2)}
.legend b{color:var(--ivory);font-weight:600;margin-right:8px}
.rule p{font-family:Inter;font-weight:300;font-size:22px;line-height:1.7;margin-top:14px}
.dont{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:40px}
.dont div{border:1px solid var(--hair);border-radius:14px;padding:18px 20px;display:flex;gap:12px;align-items:center}
.dont b{font-size:24px}.dont span{font-family:Inter;font-size:17px;color:var(--grey2)}
"""
    write("en-brand-board.html", page(1080, 1760, body, css))


def build_characters():
    def card(svg_inner, en, name, desc, vb="0 0 300 330"):
        return f"""<div class="cc"><svg viewBox="{vb}" width="100%">{DEFS}{svg_inner}</svg>
<div class="ce">{en}</div><div class="ca">{name}</div><div class="cd">{desc}</div></div>"""

    base = ground(20, 280, 300) + figure(150, 300, .95, 0, "ivory")
    rich = ground(20, 280, 300) + figure(150, 300, .95, .72, "gold", halo=True)
    lost = ground(20, 280, 300) + figure(150, 300, .95, .08, "grey")
    cage = "".join(f'<line x1="{x}" y1="300" x2="{x}" y2="{(70 if 110<x<190 else 90)}" stroke="#EDE8DF" stroke-opacity=".8" stroke-width="2"/>'
                   for x in range(80, 225, 16))
    cage += '<path d="M80 90 Q150 30 220 90" stroke="#EDE8DF" stroke-opacity=".8" stroke-width="2" fill="none"/>'
    coins = "".join(f'<circle cx="{cx}" cy="{cy}" r="6" fill="none" stroke="#C9A45C" stroke-width="2" filter="url(#glow)"/>'
                    for cx, cy in [(250, 150), (262, 200), (246, 250), (40, 180)])
    trapped = ground(20, 280, 300) + figure(150, 300, .8, .15, "ivory") + cage + coins
    drops = "".join(f'<path d="M{x} {y} c0 5 -4 7 -4 10 a4 4 0 008 0 c0-3-4-5-4-10z" fill="#C9A45C" filter="url(#glow)" opacity="{o}"/>'
                    for x, y, o in [(196, 240, 1), (210, 262, .8), (224, 282, .6)])
    leak = ground(20, 280, 300) + figure(140, 300, .95, .45, "ivory") + drops + \
        '<ellipse cx="236" cy="300" rx="26" ry="3" fill="#C9A45C" opacity=".5" filter="url(#glow)"/>'
    think = ground(20, 280, 300) + figure(150, 300, .95, .3, "ivory") + \
        '<g transform="translate(150,80)"><ellipse rx="70" ry="20" fill="none" stroke="#EDE8DF" stroke-opacity=".5" stroke-dasharray="3 6"/>' \
        '<circle cx="-70" cy="0" r="5" fill="#C9A45C" filter="url(#glow)"/><circle cx="52" cy="13" r="3" fill="#EDE8DF"/></g>'
    duo = ground(10, 290, 300) + figure(90, 300, .78, .78, "gold", halo=True) + figure(215, 300, .78, .06, "grey") + \
        '<text x="90" y="324" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#C9A45C" letter-spacing="3">A</text>' \
        '<text x="215" y="324" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" fill="#5A5A5A" letter-spacing="3">B</text>'
    climb = '<path d="M20 300 H80 V260 H130 V220 H180 V180 H240 V140 H285" fill="none" stroke="#EDE8DF" stroke-opacity=".55" stroke-width="2"/>' \
            '<path d="M240 140 H285" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>' + figure(155, 220, .55, .5, "gold")
    crowd = ground(10, 290, 300)
    for i, x in enumerate(range(35, 280, 38)):
        crowd += figure(x, 300, .32, .55 if i == 3 else 0, "gold" if i == 3 else "grey", halo=(i == 3))

    cards = [
        card(base, "01 · Base", "The Mind", "Faceless. Ring head, one dot: the mind."),
        card(rich, "02 · Wealth", "Gold State", "The body is a vessel. Gold level = real wealth."),
        card(lost, "03 · Loss", "Faded State", "Dashed grey line: control is slipping."),
        card(duo, "04 · Recurring", "A vs. B", "Same salary. Different habits. Every episode."),
        card(leak, "05 · Spending", "The Leak", "Emotional spending: gold drips out."),
        card(trapped, "06 · Debt", "The Trap", "Debt & habits: caged, gold just out of reach."),
        card(think, "07 · Psychology", "The Bias", "An orbit around the head = a mental trick."),
        card(climb, "08 · Habit", "The Climb", "One small habit a day = one more step."),
        card(crowd, "09 · Contrast", "The 1%", "Everyone fades. One chooses gold."),
    ]
    body = f"""
<div class="wrap">
 <div class="kicker">Character System · 01</div>
 <div class="h1">The <i class="gold">Vessel</i></div>
 <p class="sub">We never show their money. We show the <b class="gold" style="font-weight:600">gold level inside them</b> — rising and falling with every decision.</p>
 <div class="grid">{''.join(cards)}</div>
</div>"""
    css = H1 + SUB + """
.wrap{position:relative;z-index:2;padding:80px 56px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.cc{border:1px solid var(--hair);border-radius:18px;padding:14px 16px 22px;
 background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))}
.ce{font-family:Inter;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--gold);margin-top:6px}
.ca{font-family:Corm;font-size:30px;font-weight:600;margin-top:4px}
.cd{font-family:Inter;font-size:15px;color:var(--grey2);margin-top:6px;line-height:1.5;font-weight:300}
"""
    write("en-characters.html", page(1080, 1680, body, css))


def build_icons():
    cells = "".join(f'<div class="cell"><div class="ic">{icon_svg(svg)}</div><div class="nm">{en}</div></div>'
                    for en, _ar, svg in ICONS)
    body = f"""
<div class="wrap">
 <div class="kicker">Icon System · 02</div>
 <div class="h1">Line &amp; <i class="gold">Gold</i></div>
 <p class="sub">Thin ivory line. One gold accent per icon — never more. Same weight everywhere.</p>
 <div class="grid">{cells}</div>
 <div class="rules">
  <div><b>1.8px</b><span>fixed stroke</span></div><div><b>48</b><span>48 × 48 grid</span></div>
  <div><b>1</b><span>gold element</span></div><div><b>Round</b><span>caps & joins</span></div>
 </div>
</div>"""
    css = H1 + SUB + """
.wrap{position:relative;z-index:2;padding:80px 64px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:54px}
.cell{border:1px solid var(--hair);border-radius:18px;padding:30px 10px 26px;text-align:center;
 background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0))}
.ic{display:flex;justify-content:center}
.nm{font-family:Inter;font-size:14px;letter-spacing:.2em;text-transform:uppercase;margin-top:16px;font-weight:600}
.rules{display:grid;grid-template-columns:repeat(4,1fr);margin-top:46px;border-top:1px solid var(--hair);padding-top:30px}
.rules div{text-align:center}.rules b{display:block;font-family:Corm;font-size:42px;color:var(--gold);font-weight:500}
.rules span{font-family:Inter;font-size:15px;color:var(--grey2);letter-spacing:.04em}
"""
    write("en-icons.html", page(1080, 1400, body, css))


CAP = """.cap{direction:ltr}
.l1{font-family:Inter;font-weight:300;color:var(--grey2)}
.l2{font-family:Inter;font-weight:800;letter-spacing:-.03em;line-height:1}
.l3{font-family:Corm;font-style:italic;font-weight:500;line-height:1.05}"""


def build_frames():
    rain = "".join(f'<path d="M{x} {y} c0 7 -6 10 -6 15 a6 6 0 0012 0 c0-5-6-8-6-15z" fill="#C9A45C" opacity="{o}" filter="url(#glow)"/>'
                   for x, y, o in [(640, 1300, 1), (668, 1370, .85), (690, 1440, .7), (708, 1505, .5)])
    bags = "".join(f'<g transform="translate({bx},1560) scale({s*2.2})" opacity="{.75-i*.15}">'
                   '<path d="M-14 -36h28l-3 36h-22z M-7 -36v-6a7 7 0 0114 0v6" fill="none" stroke="#EDE8DF" stroke-width="1.4"/></g>'
                   for i, (bx, s) in enumerate([(760, 1), (850, .8), (925, .65)]))
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
<circle cx="520" cy="1250" r="520" fill="url(#whalo)"/>{ground(0,1080,1560,.4)}
{figure(520, 1560, 2.2, .38, "ivory")}{rain}{bags}</svg>"""
    body = f"""<div class="law">LAW #03</div>{TICKER.format(v='$12,480', d='▼ $340', c='#8C8A86')}
<div class="cap" style="top:330px">
 <div class="l1" style="font-size:54px">Why do you</div>
 <div class="l2 wglow" style="font-size:150px;margin-top:10px">SPEND MORE</div>
 <div class="l3 gold glow" style="font-size:132px;margin-top:6px">when you’re sad?</div>
</div>{stage}
<div class="src">Source: Lerner, Small &amp; Loewenstein · Psychological Science (2004)</div>"""
    write("en-frame-1-hook.html", page(1080, 1920, body, FRAME_CSS + CAP))

    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
{ground(0,1080,1500,.4)}
{figure(330, 1500, 2.0, .8, "gold", halo=True)}{figure(760, 1500, 2.0, .07, "grey")}
<text x="330" y="1580" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="8" fill="#C9A45C">A</text>
<text x="760" y="1580" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="8" fill="#5A5A5A">B</text>
<text x="330" y="1650" text-anchor="middle" font-family="Inter" font-weight="300" font-size="54" fill="#E8C987" filter="url(#glow)">$173,100</text>
<text x="760" y="1650" text-anchor="middle" font-family="Inter" font-weight="300" font-size="54" fill="#5A5A5A">$3,150</text></svg>"""
    body = f"""<div class="law">YEAR 10</div>
<div class="cap" style="top:300px">
 <div class="l1" style="font-size:60px">Same salary.</div>
 <div class="l2 wglow" style="font-size:128px;margin-top:14px">SAME CITY.</div>
 <div class="l3 gold glow" style="font-size:120px;margin-top:10px">One different habit.</div>
</div>{stage}
<div class="src">Illustrative · saving $1,000/mo at 7%/yr for 10 yrs ≈ $173k</div>"""
    write("en-frame-2-duo.html", page(1080, 1920, body, FRAME_CSS + CAP))

    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
{ground(0,1080,1560,.35)}{figure(540, 1560, 1.6, .15, "ivory")}
<g transform="translate(540,1050)"><circle r="150" fill="none" stroke="#EDE8DF" stroke-opacity=".15" stroke-width="2"/>
<path d="M0 -150 A150 150 0 1 1 -129.9 75" fill="none" stroke="#C9A45C" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>
<text y="30" text-anchor="middle" font-family="Inter" font-weight="300" font-size="96" fill="#EDE8DF">3</text></g></svg>"""
    body = f"""<div class="law">LAW #07</div>
<div class="cap" style="top:290px">
 <div class="kicker" style="font-size:18px">Pause · Guess</div>
 <div class="l2 wglow" style="font-size:82px;margin-top:30px;line-height:1.08"><span class="gold glow" style="font-weight:300">$2,000</span> ON A<br>CREDIT CARD.</div>
 <div class="l1" style="font-size:44px;margin-top:18px">Minimum payments only.</div>
 <div class="l3" style="font-size:64px;margin-top:6px">How long to be free?</div>
 <div class="opts"><div class="o">3 years</div><div class="o g">12 years</div></div>
</div>{stage}
<div class="src">22% APR · minimum = 1% + interest · $25 floor</div>"""
    css = FRAME_CSS + CAP + """.opts{display:flex;gap:26px;justify-content:center;margin-top:44px}
.o{font-family:Inter;font-weight:600;font-size:40px;border:1.5px solid rgba(237,232,223,.35);border-radius:18px;padding:18px 44px}
.o.g{border-color:rgba(201,164,92,.7);color:var(--gold2);box-shadow:0 0 30px rgba(201,164,92,.25) inset}"""
    write("en-frame-3-guess.html", page(1080, 1920, body, css))

    body = f"""<div class="cap" style="top:600px">
 <div class="kicker" style="font-size:22px">Law #07</div>
 <div class="l2 wglow" style="font-size:104px;margin-top:44px">MINIMUM<br>PAYMENTS</div>
 <div class="l3 gold glow" style="font-size:96px;margin-top:16px">are designed to<br>keep you in debt.</div>
 <svg width="760" height="40" viewBox="0 0 760 40" style="margin-top:14px">{DEFS}
  <path d="M10 22 C 200 10 520 34 750 16" stroke="url(#gline)" stroke-width="4" fill="none" filter="url(#glow)" stroke-linecap="round"/></svg>
 <div class="l1" style="font-size:38px;margin-top:50px;line-height:1.5">The move: pay <b style="color:var(--ivory);font-weight:600">2× the minimum</b>. This month.</div>
</div>
<div style="position:absolute;bottom:170px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:18px;z-index:3">
 {LOGO.replace('width="150" height="150"','width="64" height="64"')}
 <div><div class="corm" style="font-weight:600;font-size:34px;line-height:1">The Gold <i class="gold">Mind</i></div>
 <div style="font-family:Inter;font-weight:300;letter-spacing:.45em;font-size:12px;color:var(--grey2);margin-top:6px">MONEY PSYCHOLOGY</div></div>
</div>
<div style="position:absolute;bottom:110px;left:0;right:0;text-align:center;font-family:Inter;font-weight:600;letter-spacing:.32em;font-size:15px;color:var(--grey2);z-index:3">NEXT · LAW #08 →</div>"""
    write("en-frame-4-law.html", page(1080, 1920, body, FRAME_CSS + CAP))


def build_thumb():
    cage = "".join(f'<line x1="{x}" y1="660" x2="{x}" y2="{250 if 905<x<1095 else 300}" stroke="#EDE8DF" stroke-opacity=".85" stroke-width="3"/>'
                   for x in range(830, 1175, 30))
    cage += '<path d="M830 300 Q1000 160 1170 300" stroke="#EDE8DF" stroke-opacity=".85" stroke-width="3" fill="none"/>'
    stage = f"""<svg class="stage" viewBox="0 0 1280 720">{DEFS}
<circle cx="1000" cy="460" r="330" fill="url(#whalo)"/>{ground(700,1280,660,.4)}
{figure(1000, 660, 1.45, .1, "grey")}{cage}
<circle cx="1210" cy="420" r="16" fill="none" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
<circle cx="1240" cy="520" r="12" fill="none" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/></svg>"""
    body = f"""{stage}
<div style="position:absolute;left:70px;top:120px;z-index:3">
 <div style="font-family:Inter;font-weight:800;font-size:250px;line-height:.85;letter-spacing:-.04em;color:var(--gold2);text-shadow:0 0 50px rgba(232,201,135,.5)">12</div>
 <div style="font-family:Inter;font-weight:800;font-size:96px;letter-spacing:-.03em;line-height:1;margin-top:14px">YEARS</div>
 <div class="corm" style="font-size:62px;font-style:italic;color:var(--grey2);margin-top:8px">of debt. One button.</div>
</div>
<div style="position:absolute;left:70px;bottom:44px;z-index:3;font-family:Inter;font-weight:600;letter-spacing:.32em;font-size:16px;color:var(--gold)">LAW #07</div>"""
    write("en-thumbnail.html", page(1280, 720, body, FRAME_CSS))


if __name__ == "__main__":
    build_board(); build_characters(); build_icons(); build_frames(); build_thumb()
    print("ok")
