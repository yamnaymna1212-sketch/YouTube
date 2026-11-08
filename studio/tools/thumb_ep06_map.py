import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src, out = sys.argv[1], sys.argv[2]
W,H=1280,720
im=Image.open(src).convert('RGB').resize((W,H),Image.LANCZOS)
# dark gradient bottom-right for text
g=Image.new('L',(W,H),0); d=ImageDraw.Draw(g)
for y in range(H):
    for x in range(0,W,4):
        a=max(0,min(1,(x-560)/500))*max(0,min(1,(y-300)/300))
        d.line([(x,y),(x+3,y)],fill=int(215*a))
im=Image.composite(Image.new('RGB',(W,H),(19,32,34)),im,g)
d=ImageDraw.Draw(im)
F='/System/Library/Fonts/Supplemental/'
imp=lambda s:ImageFont.truetype(F+'Impact.ttf',s)
din=lambda s:ImageFont.truetype(F+'DIN Condensed Bold.ttf',s)
gold=(232,182,76); ink=(27,34,48); bone=(246,241,228); red=(180,69,47)
def txt(xy,t,f,fill,stroke=0,sc=ink,anchor='ra'):
    d.text(xy,t,font=f,fill=fill,stroke_width=stroke,stroke_fill=sc,anchor=anchor)
# shadow + main number
txt((1252,512),'$40',imp(150),(0,0,0),anchor='rs')
txt((1246,505),'$40',imp(150),gold,6,ink,anchor='rs')
txt((1252,680),'TRILLION',imp(150),(0,0,0),anchor='rs')
txt((1246,673),'TRILLION',imp(150),bone,6,ink,anchor='rs')
# strip
s='WHO PAYS IT?'; f=din(64); bw=d.textlength(s,font=f)+40
x1=1246; x0=x1-bw; y0=300
d.rectangle([x0+8,y0+8,x1+8,y0+72],fill=red)
d.rectangle([x0,y0,x1,y0+64],fill=ink)
d.text((x0+20,y0+8),s,font=f,fill=bone)
# logo tab
d.rectangle([28,24,232,72],fill=ink); d.text((46,30),'DOLLARLY',font=din(44),fill=bone)
im.save(out,quality=95)
