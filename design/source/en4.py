"""FINAL identity: style bible, cast board, thumbnails, banner, avatar."""
from en3 import rosette
from gen import DEFS, ICONS, LOGO, FRAME_CSS, figure, ground, icon_svg, page, write
from en import H1, SUB, CAP

ICON = {en: svg for en, _a, svg in ICONS}

SIL = {
    "man": lambda cx: f"""<circle cx="{cx}" cy="360" r="118" fill="url(#hatch)"/>
<path d="M{cx-260} 760 C {cx-250} 560 {cx-130} 510 {cx} 505 C {cx+130} 510 {cx+250} 560 {cx+260} 760 Z" fill="url(#hatch)"/>
<rect x="{cx-48}" y="440" width="96" height="80" fill="url(#hatch)"/>""",
    "woman": lambda cx: f"""<ellipse cx="{cx}" cy="372" rx="128" ry="136" fill="url(#hatch)"/>
<circle cx="{cx}" cy="238" r="58" fill="url(#hatch)"/>
<path d="M{cx-235} 760 C {cx-225} 575 {cx-120} 520 {cx} 515 C {cx+120} 520 {cx+225} 575 {cx+235} 760 Z" fill="url(#hatch)"/>
<rect x="{cx-38}" y="450" width="76" height="80" fill="url(#hatch)"/>""",
    "pair": lambda cx: f"""<circle cx="{cx-95}" cy="385" r="92" fill="url(#hatch)"/><circle cx="{cx+100}" cy="350" r="100" fill="url(#hatch)"/>
<path d="M{cx-300} 760 C {cx-290} 590 {cx-200} 540 {cx-95} 535 C {cx} 540 {cx+30} 590 {cx+40} 760 Z" fill="url(#hatch)" opacity=".8"/>
<path d="M{cx-30} 760 C {cx-20} 575 {cx+40} 520 {cx+100} 512 C {cx+200} 520 {cx+300} 575 {cx+310} 760 Z" fill="url(#hatch)"/>""",
}


def portrait(uid, kind, name, dates, role, name_size=62, fictional=False, w=900, h=1010):
    cx = w / 2
    corners = "".join(f'<g transform="translate({x},{y})">{rosette(0,0,110,37,70,op=.5)}</g>' for x, y in [(0, 0), (w, 0), (0, h), (w, h)])
    dash = ' stroke-dasharray="14 10"' if fictional else ""
    tag = (f'<text x="{cx}" y="1000" text-anchor="middle" font-family="Inter" font-weight="600" font-size="15" letter-spacing="6" fill="#8C8A86">FICTIONAL CHARACTER</text>'
           if fictional else "")
    return f"""<g>
<defs>
 <clipPath id="c{uid}"><rect width="{w}" height="{h}" rx="22"/></clipPath>
 <clipPath id="o{uid}"><ellipse cx="{cx}" cy="430" rx="250" ry="310"/></clipPath>
 <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="3.6" fill="#EDE8DF"/></pattern>
 <radialGradient id="s{uid}" cx=".5" cy=".38" r=".62"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#9a9a9a"/><stop offset="1" stop-color="#202020"/></radialGradient>
 <mask id="m{uid}"><rect width="{w}" height="{h}" fill="url(#s{uid})"/></mask>
</defs>
<rect width="{w}" height="{h}" rx="22" fill="#0F0F11"/>
<g clip-path="url(#c{uid})">{corners}{rosette(cx,430,150,53,95,op=.28)}</g>
<rect x="14" y="14" width="{w-28}" height="{h-28}" rx="14" fill="none" stroke="#C9A45C" stroke-opacity=".7" stroke-width="2.4"{dash}/>
<rect x="30" y="30" width="{w-60}" height="{h-60}" rx="8" fill="none" stroke="#C9A45C" stroke-opacity=".3" stroke-width="1"/>
<g clip-path="url(#o{uid})"><ellipse cx="{cx}" cy="430" rx="250" ry="310" fill="#151517"/><g mask="url(#m{uid})">{SIL[kind](cx)}</g></g>
<ellipse cx="{cx}" cy="430" rx="250" ry="310" fill="none" stroke="#E8C987" stroke-width="3"{dash} filter="url(#glow)"/>
<ellipse cx="{cx}" cy="430" rx="266" ry="326" fill="none" stroke="#C9A45C" stroke-opacity=".45" stroke-width="1.2"/>
<text x="{cx}" y="830" text-anchor="middle" font-family="Corm" font-weight="600" font-size="{name_size}" letter-spacing="10" fill="#EDE8DF">{name}</text>
<line x1="{cx-210}" y1="858" x2="{cx+210}" y2="858" stroke="url(#gline)" stroke-width="2.5"/>
<text x="{cx}" y="905" text-anchor="middle" font-family="Inter" font-weight="600" font-size="19" letter-spacing="5" fill="#C9A45C">{role}</text>
<text x="{cx}" y="950" text-anchor="middle" font-family="Corm" font-style="italic" font-weight="500" font-size="32" fill="#8C8A86">{dates}</text>{tag}
</g>"""


# ---------------------------------------------------------------- cast board
def build_cast():
    vessel = f'<svg viewBox="0 0 300 330" width="100%">{DEFS}{ground(20,280,300)}{figure(150,300,.95,.6,"gold",halo=True)}</svg>'
    pt = f'<svg viewBox="0 0 900 1010" width="68%" style="display:block;margin:0 auto">{DEFS}{portrait("t","man","RONALD READ","1921 — 2014","JANITOR",58)}</svg>'
    seg = "".join(f'<rect x="{20+i*13}" y="40" width="10" height="4" rx="2" fill="{"#C9A45C" if i<9 else "#2a2a2c"}"/>' for i in range(20))
    ledger = f"""<svg viewBox="0 0 300 330" width="100%">{DEFS}{seg}
<rect x="20" y="80" width="260" height="200" rx="10" fill="#111113" stroke="#EDE8DF" stroke-opacity=".25" stroke-width="1.5"/>
<line x1="20" y1="80" x2="20" y2="280" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
<rect x="36" y="112" width="228" height="60" rx="5" fill="#C9A45C" opacity=".09"/>
<text x="46" y="140" font-family="Corm" font-size="28" fill="#EDE8DF">Wealth is what</text>
<text x="46" y="166" font-family="Corm" font-size="28" font-style="italic" fill="#E8C987" filter="url(#glow)">you don’t see.</text>
<rect x="36" y="196" width="180" height="6" rx="3" fill="#EDE8DF" opacity=".12"/><rect x="36" y="214" width="210" height="6" rx="3" fill="#EDE8DF" opacity=".12"/>
<rect x="36" y="232" width="140" height="6" rx="3" fill="#EDE8DF" opacity=".12"/></svg>"""
    tiers = [("01 · The Viewer", "The Vessel", "Faceless. This is you. The gold inside shows how your decisions are going.", vessel),
             ("02 · The Person", "Engraved Portrait", "A real person from the book, engraved like a banknote. Solid gold frame.", pt),
             ("03 · The Book", "The Ledger", "Chapter bar + one short quote + our plain-English explanation. Text only, no covers.", ledger)]
    tc = "".join(f'<div class="tc"><div class="tv">{v}</div><div class="te">{a}</div><div class="tn">{b}</div><div class="td">{c}</div></div>' for a, b, c, v in tiers)
    types = [("man", "RONALD READ", "1921 — 2014", "JANITOR", 52, False, "A · Man"),
             ("woman", "GRACE GRONER", "1909 — 2010", "SECRETARY · INVESTOR", 48, False, "B · Woman"),
             ("pair", "KAHNEMAN · TVERSKY", "PSYCHOLOGISTS", "TWO MEN, ONE IDEA", 38, False, "C · Pair"),
             ("man", "ARKAD", "BABYLON", "RICHEST MAN (STORY)", 56, True, "D · Fictional")]
    cards = "".join(f"""<div class="pc"><svg viewBox="0 0 900 1010" width="100%">{DEFS}{portrait(f"p{i}", k, n, d, r, s, f)}</svg><div class="pl">{lab}</div></div>"""
                    for i, (k, n, d, r, s, f, lab) in enumerate(types))
    body = f"""<div class="wrap">
 <div class="kicker">The Cast · Final</div>
 <div class="h1">Every video has <i class="gold">three</i> layers</div>
 <p class="sub">The viewer. The real person. The book. Nothing else on screen.</p>
 <div class="tiers">{tc}</div>
 <div class="sec">Portrait types — frame tells the truth</div>
 <div class="pts">{cards}</div>
 <div class="rules">
  <div><b class="gold">Solid gold frame</b><span>real person, facts checked</span></div>
  <div><b style="color:#8C8A86">Dashed frame</b><span>fictional character from a book</span></div>
  <div><b class="gold">Never</b><span>a real photo unless licensed or public domain</span></div>
 </div></div>"""
    css = H1 + SUB + """
.wrap{position:relative;z-index:2;padding:80px 56px}
.tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.tc{border:1px solid var(--hair);border-radius:18px;padding:18px 18px 24px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))}
.tv{height:300px;display:flex;align-items:center;justify-content:center}.tv svg{max-height:300px}
.te{font-family:Inter;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--gold);margin-top:12px}
.tn{font-family:Corm;font-size:32px;font-weight:600;margin-top:4px}
.td{font-family:Inter;font-size:15px;color:var(--grey2);margin-top:8px;line-height:1.55;font-weight:300}
.sec{font-family:Inter;font-weight:600;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--grey2);margin:56px 0 20px;padding-bottom:12px;border-bottom:1px solid var(--hair)}
.pts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.pl{font-family:Inter;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--grey2);margin-top:10px;text-align:center}
.rules{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:40px;border-top:1px solid var(--hair);padding-top:26px}
.rules b{display:block;font-family:Corm;font-size:28px;font-weight:600}.rules span{font-family:Inter;font-size:15px;color:var(--grey2)}
"""
    write("en-cast.html", page(1080, 1400, body, css))


# ---------------------------------------------------------------- thumbnails
def thumb(uid, kind, name, dates, role, nsize, big, mid, small):
    return f"""<div class="th">
<svg class="stage" viewBox="0 0 1280 720">{DEFS}<circle cx="980" cy="380" r="360" fill="url(#whalo)"/>
<g transform="translate(700,40) scale(.62)">{portrait(uid, kind, name, dates, role, nsize)}</g></svg>
<div style="position:absolute;left:70px;top:90px;z-index:3">
 <div style="font-family:Inter;font-weight:800;font-size:{big[1]}px;line-height:.86;letter-spacing:-.04em;color:var(--gold2);text-shadow:0 0 50px rgba(232,201,135,.5)">{big[0]}</div>
 <div style="font-family:Inter;font-weight:800;font-size:84px;letter-spacing:-.03em;line-height:1;margin-top:18px">{mid}</div>
 <div class="corm" style="font-size:58px;font-style:italic;color:var(--grey2);margin-top:8px">{small}</div></div>
<div style="position:absolute;left:70px;bottom:40px;z-index:3;font-family:Inter;font-weight:600;letter-spacing:.32em;font-size:15px;color:var(--gold)">CASE FILE</div></div>"""


def build_thumbs():
    t = [thumb("a", "man", "RONALD READ", "1921 — 2014", "JANITOR", 62, ("$8M", 250), "THE JANITOR", "who beat Wall Street."),
         thumb("b", "woman", "GRACE GRONER", "1909 — 2010", "SECRETARY", 56, ("$180", 230), "BECAME $7M", "with 3 shares."),
         thumb("c", "pair", "KAHNEMAN · TVERSKY", "PSYCHOLOGISTS", "THE 2× RULE", 40, ("2×", 300), "LOSSES HURT", "twice as much.")]
    body = "".join(t)
    css = FRAME_CSS + CAP + ".th{position:relative;width:1280px;height:720px;overflow:hidden;border-bottom:6px solid #000}"
    write("en-thumbs.html", page(1280, 2178, body, css))


# ---------------------------------------------------------------- banner + avatar
def build_banner():
    logo = LOGO.replace('width="150" height="150"', 'width="210" height="210"')
    body = f"""<svg class="stage" viewBox="0 0 2560 1440">{DEFS}
<g opacity=".9">{rosette(1280,720,420,149,260,op=.16,sw=1)}</g>
<g opacity=".7">{rosette(260,200,300,101,180,op=.22)}{rosette(2300,1240,300,101,180,op=.22)}</g>
<defs><radialGradient id="dk"><stop offset="0" stop-color="#0A0A0B" stop-opacity="1"/><stop offset=".65" stop-color="#0A0A0B" stop-opacity=".92"/><stop offset="1" stop-color="#0A0A0B" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="1280" cy="745" rx="1020" ry="230" fill="url(#dk)"/></svg>
<div style="position:absolute;left:0;right:0;top:520px;z-index:3;text-align:center">
 <div style="display:flex;justify-content:center;align-items:center;gap:36px">{logo}
  <div style="text-align:left"><div class="corm" style="font-size:150px;font-weight:500;line-height:1">The Gold <i class="gold">Mind</i></div>
  <div style="font-family:Inter;font-weight:300;font-size:30px;letter-spacing:.5em;color:var(--grey2);margin-top:14px">THE PEOPLE BEHIND THE MONEY BOOKS</div></div></div></div>"""
    write("en-banner.html", page(2560, 1440, body, FRAME_CSS))


def build_avatar():
    big = LOGO.replace('width="150" height="150"', 'width="560" height="560"')
    body = f"""<svg class="stage" viewBox="0 0 800 800">{DEFS}{rosette(400,400,260,93,160,op=.2)}</svg>
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:3">{big}</div>"""
    write("en-avatar.html", page(800, 800, body, FRAME_CSS))


# ---------------------------------------------------------------- style bible
def build_bible():
    pills = "".join(f'<div class="pill"><div class="pk">{k}</div><div class="pv">{v}</div></div><div class="pl">{s}</div>'
                    for k, v, s in [("01", "A real PERSON", "+"), ("02", "from a real BOOK", "+"), ("03", "one LAW to apply", "=")])
    story = [("en-frame-8-case", "1 · Hook", "the person"), ("en-frame-2-duo", "2 · Story", "A vs. B"), ("en-frame-3-guess", "3 · Pause", "guess"),
             ("en-frame-9-reader", "4 · The Book", "plain English"), ("en-frame-4-law", "5 · The Law", "end card")]
    strip = "".join(f'<div class="sf"><img src="out-en/{f}.png"/><div class="sl">{a}</div><div class="ss">{b}</div></div>' for f, a, b in story)
    nn = ["Dark #0A0A0B. Ivory + gold only.", "Gold = real money, nothing else.", "Faceless Vessel = the viewer.",
          "Real person = engraved portrait. Never a random stock photo.", "Book on screen = text only. No covers, no pages.",
          "Every number has a source on screen.", "One short quote. 80% is our own explanation.", "Always end with The Move + the Law card."]
    nl = "".join(f'<div class="nn"><b class="gold">{i+1:02d}</b><span>{t}</span></div>' for i, t in enumerate(nn))
    body = f"""<div class="wrap">
 <div class="kicker">Final Identity · Locked</div>
 <div class="logo">{LOGO}<div><div class="wm corm">The Gold <i class="gold">Mind</i></div><div class="wme">THE PEOPLE BEHIND THE MONEY BOOKS</div></div></div>
 <p class="sub" style="margin-top:26px">One real person from one famous money book. One lesson you can use this week.</p>
 <div class="sec">The formula</div>
 <div class="formula">{pills}<div class="pill" style="border-color:#E8C987;background:rgba(232,201,135,.12)"><div class="pk">EPISODE</div><div class="pv gold">60–90 sec</div></div></div>
 <div class="sec">Every episode — same five beats</div>
 <div class="strip">{strip}</div>
 <div class="sec">Non-negotiables</div>
 <div class="nns">{nl}</div></div>"""
    css = H1 + SUB + """
.wrap{position:relative;z-index:2;padding:80px 60px}
.logo{display:flex;align-items:center;gap:26px;margin-top:30px}
.wm{font-size:84px;font-weight:500;line-height:1}
.wme{font-family:Inter;font-weight:300;letter-spacing:.38em;font-size:16px;color:var(--grey2);margin-top:12px}
.sec{font-family:Inter;font-weight:600;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--grey2);margin:56px 0 20px;padding-bottom:12px;border-bottom:1px solid var(--hair)}
.formula{display:flex;align-items:center;gap:14px}
.pill{flex:1 1 0;min-width:0;border:1px solid rgba(201,164,92,.5);border-radius:18px;padding:22px 20px;background:rgba(201,164,92,.05)}
.pk{font-family:Inter;font-weight:600;font-size:12px;letter-spacing:.3em;color:var(--gold)}
.pv{font-family:Corm;font-size:30px;font-weight:600;margin-top:6px;line-height:1.1}
.pl{font-family:Inter;font-weight:300;font-size:34px;color:var(--gold)}
.strip{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.sf img{width:100%;border-radius:12px;border:1px solid var(--hair);display:block}
.sl{font-family:Inter;font-weight:600;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:10px}
.ss{font-family:Inter;font-size:14px;color:var(--grey2);margin-top:2px}
.nns{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px}
.nn{display:flex;gap:14px;align-items:flex-start;border:1px solid var(--hair);border-radius:14px;padding:16px 18px}
.nn b{font-family:Corm;font-size:28px;font-weight:600;line-height:1}.nn span{font-family:Inter;font-size:16px;color:var(--ivory);font-weight:300;line-height:1.45}
"""
    write("en-bible.html", page(1080, 1500, body, css))


if __name__ == "__main__":
    build_cast(); build_thumbs(); build_banner(); build_avatar(); build_bible(); print("ok")
