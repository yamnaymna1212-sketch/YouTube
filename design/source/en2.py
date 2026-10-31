"""Book & psychology series formats: frames + formats board."""
from gen import DEFS, ICONS, LOGO, FRAME_CSS, figure, ground, icon_svg, page, write
from en import CAP, H1, SUB

ICON = {en: svg for en, _a, svg in ICONS}


def text_lines(x, y, w, n, gap=34, seed=0):
    """Placeholder 'page text' bars — we never reproduce a real page."""
    out = []
    for i in range(n):
        lw = w * (0.62 + ((i * 37 + seed) % 33) / 100)
        out.append(f'<rect x="{x}" y="{y+i*gap}" width="{lw:.0f}" height="9" rx="4.5" fill="#EDE8DF" opacity=".10"/>')
    return "".join(out)


def build_page_frame():
    # Format: THE PAGE — one sentence from a famous money book, highlighted in gold
    pg = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
<circle cx="540" cy="1080" r="560" fill="url(#whalo)"/>
<g transform="translate(150,760)">
 <rect x="0" y="0" width="780" height="900" rx="10" fill="#111113" stroke="#EDE8DF" stroke-opacity=".28" stroke-width="2"/>
 <line x1="0" y1="0" x2="0" y2="900" stroke="#C9A45C" stroke-width="3" filter="url(#glow)"/>
 {text_lines(70, 90, 640, 6)}
 <rect x="56" y="290" width="668" height="240" rx="8" fill="#C9A45C" opacity=".07"/>
 {text_lines(70, 620, 640, 7, seed=11)}
 <path d="M70 556 C 260 548 460 564 710 552" stroke="url(#gline)" stroke-width="4" fill="none" filter="url(#glow)" stroke-linecap="round"/>
</g></svg>"""
    body = f"""{pg}
<div class="law">THE PAGE · 01</div>
<div class="cap" style="top:280px">
 <div class="l1" style="font-size:44px">The money book millions have read</div>
 <div class="l2 wglow" style="font-size:96px;margin-top:14px">STARTS WITH</div>
 <div class="l3 gold glow" style="font-size:104px;margin-top:4px">one idea.</div>
</div>
<div style="position:absolute;top:1078px;left:210px;right:210px;z-index:3;font-family:Corm;font-weight:500;font-size:48px;line-height:1.2;color:var(--ivory)">
 “Doing well with money has a little to do with how smart you are and
 <span class="gold glow"><i>a lot to do with how you behave.</i></span>”</div>
<div style="position:absolute;top:1700px;left:0;right:0;text-align:center;z-index:3;font-family:Inter;font-weight:600;font-size:17px;letter-spacing:.3em;color:var(--grey2)">
 THE PSYCHOLOGY OF MONEY · MORGAN HOUSEL</div>"""
    write("en-frame-5-page.html", page(1080, 1920, body, FRAME_CSS + CAP))


def build_psych_frame():
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}
{ground(0,1080,1560,.4)}
{figure(330, 1560, 1.9, .55, "ivory")}{figure(760, 1560, 1.9, .2, "ivory")}
<g transform="translate(250,1020) scale(3.4)">{ICON['Card']}</g>
<g transform="translate(680,1020) scale(3.4)">{ICON['Coin']}</g>
<text x="330" y="1640" text-anchor="middle" font-family="Inter" font-weight="300" font-size="52" fill="#E8C987" filter="url(#glow)">≈ 2×</text>
<text x="760" y="1640" text-anchor="middle" font-family="Inter" font-weight="300" font-size="52" fill="#EDE8DF">1×</text>
<text x="330" y="1690" text-anchor="middle" font-family="Inter" font-weight="600" font-size="18" letter-spacing="5" fill="#8C8A86">CARD</text>
<text x="760" y="1690" text-anchor="middle" font-family="Inter" font-weight="600" font-size="18" letter-spacing="5" fill="#8C8A86">CASH</text>
</svg>"""
    body = f"""<div class="law">PSYCHOLOGY SAYS</div>
<div class="cap" style="top:290px">
 <div class="l1" style="font-size:52px">Psychology says</div>
 <div class="l2 wglow" style="font-size:98px;margin-top:14px;line-height:1.02">IF YOU PAY<br>WITH A CARD,</div>
 <div class="l3 gold glow" style="font-size:96px;margin-top:10px">you’ll pay up to 2× more.</div>
</div>{stage}
<div class="src">Prelec &amp; Simester · Marketing Letters (2001) · card payers bid up to ~2× more</div>"""
    write("en-frame-6-psych.html", page(1080, 1920, body, FRAME_CSS + CAP))


def build_oneline_frame():
    steps = '<path d="M100 1600 H260 V1500 H420 V1400 H580 V1300 H740 V1200 H980" fill="none" stroke="#EDE8DF" stroke-opacity=".45" stroke-width="3"/>' \
            '<path d="M740 1200 H980" stroke="#C9A45C" stroke-width="5" filter="url(#glow)"/>'
    stage = f"""<svg class="stage" viewBox="0 0 1080 1920">{DEFS}{steps}{figure(500, 1400, 1.05, .55, "gold", halo=True)}</svg>"""
    body = f"""<div class="law">ONE LINE · 04</div>
<div class="cap" style="top:420px">
 <div class="l2 wglow" style="font-size:80px;line-height:1.06">YOU DO NOT RISE<br>TO THE LEVEL<br>OF YOUR GOALS.</div>
 <div class="l3 gold glow" style="font-size:92px;margin-top:26px">You fall to the level<br>of your systems.</div>
 <div style="font-family:Inter;font-weight:600;font-size:17px;letter-spacing:.3em;color:var(--grey2);margin-top:40px">JAMES CLEAR · ATOMIC HABITS</div>
</div>{stage}"""
    write("en-frame-7-oneline.html", page(1080, 1920, body, FRAME_CSS + CAP))


def build_formats():
    fm = [
        ("Coin", "Money Laws", "60–90s", "Main series. One numbered law, A vs. B, the Vessel, The Move.", "LAW #07"),
        ("Mind", "Psychology Says", "30–60s", "Hook with a real study. Every claim has a source on screen.", "PSYCHOLOGY SAYS"),
        ("Law", "The Page", "45–75s", "One powerful sentence from a famous money book — then what it means for you.", "THE PAGE"),
        ("Key", "One Line", "15–25s", "Just the quote, the author, one animation. Built to be shared and saved.", "ONE LINE"),
        ("Scale", "Book vs. Book", "60–90s", "Two famous books disagree. Who’s right? Viewer votes in comments.", "BOOK VS BOOK"),
        ("Compound", "The Book in 12 Minutes", "10–14 min", "Long-form animated breakdown. Feeds subscribers & watch time.", "LONG FORM"),
    ]
    cells = "".join(f"""<div class="fc"><div class="fi">{icon_svg(ICON[ic], 64)}</div>
<div class="fb"><div class="ft corm">{t}</div><div class="fd">{d}</div>
<div class="fm"><span class="chip">{lab}</span><span class="len">{ln}</span></div></div></div>""" for ic, t, ln, d, lab in fm)
    body = f"""<div class="wrap">
 <div class="kicker">Content Formats · 03</div>
 <div class="h1">Six <i class="gold">formats</i>, one look</div>
 <p class="sub">Money + psychology + the world’s most-read money books. Every format uses the same Vessel, the same gold, the same end card.</p>
 <div class="grid">{cells}</div>
 <div class="mix">
  <div><b>40%</b><span>Money Laws</span></div><div><b>25%</b><span>Psychology Says</span></div>
  <div><b>20%</b><span>The Page / One Line</span></div><div><b>15%</b><span>Long form</span></div>
 </div>
</div>"""
    css = H1 + SUB + """
.wrap{position:relative;z-index:2;padding:80px 64px}
.grid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:46px}
.fc{display:flex;gap:26px;align-items:center;border:1px solid var(--hair);border-radius:18px;padding:24px 28px;
 background:linear-gradient(90deg,rgba(255,255,255,.03),rgba(255,255,255,0))}
.fi{flex:0 0 64px}
.ft{font-size:38px;font-weight:600;line-height:1}
.fd{font-family:Inter;font-weight:300;font-size:18px;color:var(--grey2);margin-top:8px;line-height:1.5}
.fm{display:flex;gap:14px;align-items:center;margin-top:12px}
.chip{font-family:Inter;font-weight:600;font-size:12px;letter-spacing:.28em;color:var(--gold);border:1px solid rgba(201,164,92,.45);padding:6px 12px;border-radius:999px}
.len{font-family:Inter;font-size:14px;color:var(--grey2);letter-spacing:.1em}
.mix{display:grid;grid-template-columns:repeat(4,1fr);margin-top:40px;border-top:1px solid var(--hair);padding-top:28px;text-align:center}
.mix b{display:block;font-family:Corm;font-size:46px;color:var(--gold);font-weight:500}
.mix span{font-family:Inter;font-size:15px;color:var(--grey2)}
"""
    write("en-formats.html", page(1080, 1560, body, css))


if __name__ == "__main__":
    build_page_frame(); build_psych_frame(); build_oneline_frame(); build_formats()
    print("ok")
