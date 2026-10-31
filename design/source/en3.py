"""Book-explainer format: 'Case File' (banknote-engraved portrait) + 'The Book, Opened' (reader UI)."""
import math
from gen import DEFS, ICONS, FRAME_CSS, figure, ground, icon_svg, page, write
from en import CAP

ICON = {en: svg for en, _a, svg in ICONS}


def rosette(cx, cy, R, r, d, color="#C9A45C", op=.35, sw=.7):
    pts = []
    loops = r // math.gcd(R, r)
    n = 2600
    for i in range(n + 1):
        t = 2 * math.pi * loops * i / n
        x = (R - r) * math.cos(t) + d * math.cos((R - r) / r * t)
        y = (R - r) * math.sin(t) - d * math.sin((R - r) / r * t)
        pts.append(f"{cx+x:.1f},{cy+y:.1f}")
    return f'<polyline points="{" ".join(pts)}" fill="none" stroke="{color}" stroke-opacity="{op}" stroke-width="{sw}"/>'


def banknote_portrait(name, dates, role, w=900, h=1010):
    cx = w / 2
    corners = "".join(
        f'<g transform="translate({x},{y})">{rosette(0,0,110,37,70,op=.5)}</g>' for x, y in [(0, 0), (w, 0), (0, h), (w, h)])
    return f"""<g>
<defs>
 <clipPath id="card"><rect x="0" y="0" width="{w}" height="{h}" rx="22"/></clipPath>
 <clipPath id="oval"><ellipse cx="{cx}" cy="430" rx="250" ry="310"/></clipPath>
 <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="3.6" fill="#EDE8DF"/></pattern>
 <pattern id="hatch2" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><rect width="7" height="1.4" fill="#C9A45C"/></pattern>
 <radialGradient id="shade" cx=".5" cy=".38" r=".62"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#9a9a9a"/><stop offset="1" stop-color="#202020"/></radialGradient>
 <mask id="m"><rect x="0" y="0" width="{w}" height="{h}" fill="url(#shade)" transform="translate(0,0)"/></mask>
</defs>
<rect x="0" y="0" width="{w}" height="{h}" rx="22" fill="#0F0F11"/>
<g clip-path="url(#card)">
 {corners}
 {rosette(cx, 430, 150, 53, 95, op=.28)}
 <rect x="0" y="0" width="{w}" height="{h}" fill="url(#hatch2)" opacity=".05"/>
</g>
<rect x="14" y="14" width="{w-28}" height="{h-28}" rx="14" fill="none" stroke="#C9A45C" stroke-opacity=".7" stroke-width="2.2"/>
<rect x="30" y="30" width="{w-60}" height="{h-60}" rx="8" fill="none" stroke="#C9A45C" stroke-opacity=".3" stroke-width="1"/>
<g clip-path="url(#oval)">
 <ellipse cx="{cx}" cy="430" rx="250" ry="310" fill="#151517"/>
 <g mask="url(#m)" transform="translate(0,0)">
  <circle cx="{cx}" cy="360" r="118" fill="url(#hatch)"/>
  <path d="M{cx-260} 760 C {cx-250} 560 {cx-130} 510 {cx} 505 C {cx+130} 510 {cx+250} 560 {cx+260} 760 Z" fill="url(#hatch)"/>
  <rect x="{cx-48}" y="440" width="96" height="80" fill="url(#hatch)"/>
 </g>
</g>
<ellipse cx="{cx}" cy="430" rx="250" ry="310" fill="none" stroke="#E8C987" stroke-width="3" filter="url(#glow)"/>
<ellipse cx="{cx}" cy="430" rx="266" ry="326" fill="none" stroke="#C9A45C" stroke-opacity=".45" stroke-width="1.2"/>
<text x="{cx}" y="830" text-anchor="middle" font-family="Corm" font-weight="600" font-size="62" letter-spacing="12" fill="#EDE8DF">{name}</text>
<line x1="{cx-210}" y1="858" x2="{cx+210}" y2="858" stroke="url(#gline)" stroke-width="2.5"/>
<text x="{cx}" y="905" text-anchor="middle" font-family="Inter" font-weight="600" font-size="19" letter-spacing="6" fill="#C9A45C">{role}</text>
<text x="{cx}" y="950" text-anchor="middle" font-family="Corm" font-style="italic" font-weight="500" font-size="32" fill="#8C8A86">{dates}</text>
</g>"""


def build_case():
    card = banknote_portrait("RONALD READ", "1921 — 2014", "JANITOR · GAS STATION ATTENDANT · VERMONT")
    body = f"""<div class="law">CASE FILE · 001</div>
<div class="tick"><div class="tl">NET WORTH</div><div class="tv" style="color:#E8C987;text-shadow:0 0 22px rgba(232,201,135,.5)">$8,000,000</div><div class="td" style="color:#C9A45C">▲ AT DEATH</div></div>
<div class="cap" style="top:300px">
 <div class="l1" style="font-size:46px">He swept floors and pumped gas.</div>
 <div class="l2 wglow" style="font-size:112px;margin-top:12px">HE DIED WITH</div>
 <div class="l3 gold glow" style="font-size:132px;margin-top:2px">$8 million.</div>
</div>
<svg class="stage" viewBox="0 0 1080 1920">{DEFS}<g transform="translate(90,740)">{card}</g></svg>
<div style="position:absolute;bottom:92px;left:0;right:0;text-align:center;z-index:3;font-family:Inter;font-weight:600;font-size:16px;letter-spacing:.3em;color:var(--grey2)">
 FROM <span style="color:var(--gold)">THE PSYCHOLOGY OF MONEY</span> · CH. 1 · MORGAN HOUSEL</div>"""
    write("en-frame-8-case.html", page(1080, 1920, body, FRAME_CSS + CAP))


def build_reader():
    seg = "".join(f'<rect x="{i*46}" y="0" width="38" height="6" rx="3" fill="{"#C9A45C" if i<9 else "#2a2a2c"}" {"filter=\"url(#glow)\"" if i==8 else ""}/>' for i in range(20))
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
<g transform="translate(80,300)">{seg}</g>
<g transform="translate(80,380)">
 <rect x="0" y="0" width="920" height="470" rx="18" fill="#111113" stroke="#EDE8DF" stroke-opacity=".22" stroke-width="2"/>
 <line x1="0" y1="0" x2="0" y2="470" stroke="#C9A45C" stroke-width="3.5" filter="url(#glow)"/>
 <text x="60" y="84" font-family="Inter" font-weight="600" font-size="16" letter-spacing="6" fill="#8C8A86">CH. 9 · THE PSYCHOLOGY OF MONEY</text>
 <rect x="52" y="140" width="816" height="190" rx="8" fill="#C9A45C" opacity=".07"/>
 <text x="60" y="250" font-family="Corm" font-weight="500" font-size="92" fill="#EDE8DF">Wealth is what</text>
 <text x="60" y="335" font-family="Corm" font-style="italic" font-weight="500" font-size="92" fill="#E8C987" filter="url(#glow)">you don’t see.</text>
 <path d="M60 366 C 300 358 560 374 860 362" stroke="url(#gline)" stroke-width="4" fill="none" filter="url(#glow)" stroke-linecap="round"/>
 <text x="60" y="430" font-family="Inter" font-weight="300" font-size="22" fill="#8C8A86" letter-spacing="2">— Morgan Housel</text>
</g>
<g transform="translate(80,930)">
 <text x="0" y="0" font-family="Inter" font-weight="600" font-size="16" letter-spacing="7" fill="#C9A45C">IN PLAIN ENGLISH</text>
 <line x1="0" y1="22" x2="920" y2="22" stroke="#EDE8DF" stroke-opacity=".12"/>
</g>
{ground(80,1000,1620,.4)}
{figure(300, 1620, 1.45, .06, "ivory")}{figure(780, 1620, 1.45, .8, "gold", halo=True)}
<g transform="translate(224,1160) scale(1.6)">{ICON['Bag']}</g>
<g transform="translate(704,1160) scale(1.6)">{ICON['Shield']}</g>
<text x="300" y="1700" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="6" fill="#8C8A86">RICH</text>
<text x="780" y="1700" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="6" fill="#C9A45C">WEALTHY</text>
</svg>"""
    body = f"""<div class="law">THE BOOK, OPENED</div>
<div class="cap" style="top:1000px;left:80px;right:80px;text-align:left">
 <div class="l1" style="font-size:44px;line-height:1.4;color:var(--ivory)">Rich is what you <b style="font-weight:800">spend.</b><br>Wealthy is what you <span class="gold glow" style="font-family:Corm;font-style:italic;font-size:54px">didn’t.</span></div>
</div>{stage}"""
    write("en-frame-9-reader.html", page(1080, 1920, body, FRAME_CSS + CAP))


if __name__ == "__main__":
    build_case(); build_reader(); print("ok")
