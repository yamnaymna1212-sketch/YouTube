"""EP06 thumbnail: map photo with its labels, '$40' red + 'TRILLION' yellow."""
import sys
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
W, H = 1280, 720
im = Image.open(src).convert('RGB').resize((W, H), Image.LANCZOS)
d = ImageDraw.Draw(im)
imp = ImageFont.truetype('/System/Library/Fonts/Supplemental/Impact.ttf', 170)
red, yellow, ink = (228, 38, 38), (255, 214, 0), (20, 20, 24)
for y, t, c in [(470, '$40', red), (660, 'TRILLION', yellow)]:
    d.text((1258, y+8), t, font=imp, fill=(0, 0, 0), anchor='rs')
    d.text((1250, y), t, font=imp, fill=c, stroke_width=7, stroke_fill=ink if c == yellow else (255, 255, 255), anchor='rs')
im.save(out, quality=95)
