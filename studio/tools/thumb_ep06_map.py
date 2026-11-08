"""EP06 thumbnail: map photo, labels inpainted out, '$40 TRILLION'."""
import sys, cv2, numpy as np
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
img = cv2.imread(src)  # 1672x941
# cover each label with a nearby patch of the same map, blended in
for (x0, y0, x1, y1), dy in [((362,150,588,220), -72), ((334,360,794,456), -98), ((280,586,510,664), 80), ((1282,302,1492,376), -76)]:
    patch = img[y0+dy:y1+dy, x0:x1].copy()
    m = np.full(patch.shape[:2], 255, np.uint8)
    img = cv2.seamlessClone(patch, img, m, ((x0+x1)//2, (y0+y1)//2), cv2.NORMAL_CLONE)
# the US patch carries a copy of the northern border line: paint it out
m2 = np.zeros(img.shape[:2], np.uint8)
cv2.rectangle(m2, (334, 376), (640, 404), 255, -1)
img = cv2.inpaint(img, m2, 7, cv2.INPAINT_TELEA)
W, H = 1280, 720
im = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).resize((W, H), Image.LANCZOS)
d = ImageDraw.Draw(im)
imp = ImageFont.truetype('/System/Library/Fonts/Supplemental/Impact.ttf', 170)
gold, bone, ink = (232,182,76), (246,241,228), (27,34,48)
for y, t, c in [(470, '$40', gold), (660, 'TRILLION', bone)]:
    d.text((1258, y+8), t, font=imp, fill=(0,0,0), anchor='rs')
    d.text((1250, y), t, font=imp, fill=c, stroke_width=7, stroke_fill=ink, anchor='rs')
im.save(out, quality=95)
