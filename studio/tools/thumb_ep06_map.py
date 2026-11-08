"""EP06 thumbnail: map photo with its labels, '$40' red + 'TRILLION' yellow."""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
src, out = sys.argv[1], sys.argv[2]
W, H = 1920, 1080
K = W / 1280  # text layout was drawn for 1280 wide
im = Image.open(src).convert('RGB').resize((W, H), Image.LANCZOS)
im = im.filter(ImageFilter.MedianFilter(3))                       # soften webp blocks
im = im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=140, threshold=2))
im = ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.12)).enhance(1.06)
d = ImageDraw.Draw(im)
imp = ImageFont.truetype('/System/Library/Fonts/Supplemental/Impact.ttf', int(170*K))
red, yellow, ink = (228, 38, 38), (255, 214, 0), (20, 20, 24)
for y, t, c in [(470, '$40', red), (660, 'TRILLION', yellow)]:
    d.text((1258*K, (y+8)*K), t, font=imp, fill=(0, 0, 0), anchor='rs')
    d.text((1250*K, y*K), t, font=imp, fill=c, stroke_width=int(7*K), stroke_fill=ink if c == yellow else (255, 255, 255), anchor='rs')
im.save(out, quality=97, subsampling=0)
