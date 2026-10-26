#!/usr/bin/env python3
"""Build a 59-second vertical (9:16) sale video from 5 photos.

Top of the frame shows a countdown that starts at 0:59 and reaches 0:00 at the
last frame, with a loading bar behind it that fills as the time runs out.
Each photo gets a slow zoom and a cross-fade into the next one.

    python3 make_sale_video.py p1.jpg p2.jpg p3.jpg p4.jpg p5.jpg \
        --headline "FLASH SALE" --offer "50% OFF" --cta "Shop now" \
        --captions "Item 1 - \\$19" "Item 2 - \\$29" ... -o sale.mp4
"""
import argparse
import os
import subprocess
import tempfile

TOTAL = 59.0          # countdown start, seconds
FADE = 0.5            # cross-fade length, seconds
FPS = 30
W, H = 1080, 1920
FONTS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
]


def find_font(user_font):
    for f in ([user_font] if user_font else []) + FONTS:
        if f and os.path.exists(f):
            return f
    raise SystemExit("No bold font found; pass --font /path/to/font.ttf")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("photos", nargs=5, help="exactly 5 images")
    ap.add_argument("-o", "--output", default="sale_video.mp4")
    ap.add_argument("--headline", default="FLASH SALE")
    ap.add_argument("--offer", default="50% OFF")
    ap.add_argument("--cta", default="Shop now - link in bio")
    ap.add_argument("--captions", nargs=5, metavar="TEXT", help="one caption per photo")
    ap.add_argument("--audio", help="optional music file (trimmed to the video length)")
    ap.add_argument("--accent", default="FF3B30", help="bar colour, hex without #")
    ap.add_argument("--font")
    args = ap.parse_args()

    font = find_font(args.font)
    clip = (TOTAL + 4 * FADE) / 5            # 5 clips overlapped by 4 fades = 59 s
    frames = int(round(clip * FPS))

    tmp = tempfile.mkdtemp(prefix="salevid_")

    def textfile(name, text):
        p = os.path.join(tmp, name)
        with open(p, "w", encoding="utf-8") as fh:
            fh.write(text)
        return p

    inputs, chains = [], []
    for i, photo in enumerate(args.photos):
        inputs += ["-framerate", str(FPS), "-loop", "1", "-t", f"{clip:.3f}", "-i", photo]
        zoom = "min(1+0.0007*on,1.2)" if i % 2 == 0 else "max(1.2-0.0007*on,1)"
        chains.append(
            f"[{i}:v]scale={int(W*1.5)}:{int(H*1.5)}:force_original_aspect_ratio=increase,"
            f"crop={int(W*1.5)}:{int(H*1.5)},"
            f"zoompan=z='{zoom}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS},"
            f"setsar=1,format=yuv420p[v{i}]"
        )

    prev = "v0"
    for k in range(1, 5):
        out = f"x{k}"
        chains.append(
            f"[{prev}][v{k}]xfade=transition=fade:duration={FADE}:offset={k*(clip-FADE):.3f}[{out}]"
        )
        prev = out

    barx, bary, barw, barh = 100, 372, W - 200, 28
    ui = [
        f"[{prev}]drawbox=x=0:y=0:w={W}:h=470:color=black@0.5:t=fill",
        f"drawtext=fontfile='{font}':text='ENDS IN':fontcolor=white@0.9:fontsize=54:x=(w-text_w)/2:y=70",
        # white timer, then red for the last 10 seconds
        f"drawtext=fontfile='{font}':text='0\\:%{{eif\\:max(0\\,{int(TOTAL)}-trunc(t))\\:d\\:2}}':"
        f"fontcolor=white:fontsize=210:x=(w-text_w)/2:y=120:enable='lt(t,{TOTAL-10})'",
        f"drawtext=fontfile='{font}':text='0\\:%{{eif\\:max(0\\,{int(TOTAL)}-trunc(t))\\:d\\:2}}':"
        f"fontcolor=#{args.accent}:fontsize=210:x=(w-text_w)/2:y=120:enable='gte(t,{TOTAL-10})'",
        # sale text
        f"drawbox=x=0:y={H-520}:w={W}:h=520:color=black@0.5:t=fill",
        f"drawtext=fontfile='{font}':textfile='{textfile('headline.txt', args.headline)}':expansion=none:"
        f"fontcolor=white:fontsize=96:x=(w-text_w)/2:y={H-470}",
        f"drawtext=fontfile='{font}':textfile='{textfile('offer.txt', args.offer)}':expansion=none:"
        f"fontcolor=#FFD60A:fontsize=170:x=(w-text_w)/2:y={H-370}",
        f"drawtext=fontfile='{font}':textfile='{textfile('cta.txt', args.cta)}':expansion=none:"
        f"fontcolor=white:fontsize=56:x=(w-text_w)/2:y={H-130}",
    ]
    if args.captions:
        for i, cap in enumerate(args.captions):
            t0 = i * (clip - FADE)
            t1 = t0 + clip - FADE if i < 4 else TOTAL
            ui.append(
                f"drawtext=fontfile='{font}':textfile='{textfile(f'cap{i}.txt', cap)}':expansion=none:"
                f"fontcolor=white:fontsize=64:box=1:boxcolor=black@0.55:boxborderw=22:"
                f"x=(w-text_w)/2:y={H-640}:enable='between(t,{t0:.3f},{t1:.3f})'"
            )
    chains.append(",".join(ui) + "[ui]")

    # loading bar: a grey track with a red fill sliding in from the left as time passes.
    # (drawbox only evaluates its width once, so the fill is an overlay with a time-based x.)
    inputs += ["-f", "lavfi", "-i", f"color=c=0x4D4D4D:s={barw}x{barh}:r={FPS}:d={TOTAL}",
               "-f", "lavfi", "-i", f"color=c=0x{args.accent}:s={barw}x{barh}:r={FPS}:d={TOTAL}"]
    chains.append(f"[5:v][6:v]overlay=x='-W+W*min(t/{TOTAL}\\,1)':y=0,format=yuv420p[bar]")
    chains.append(f"[ui][bar]overlay=x={barx}:y={bary}[vout]")

    cmd = ["ffmpeg", "-y", "-v", "error", *inputs]
    if args.audio:
        cmd += ["-i", args.audio]
    cmd += ["-filter_complex", ";".join(chains), "-map", "[vout]"]
    if args.audio:
        cmd += ["-map", "7:a", "-af", f"afade=t=out:st={TOTAL-2}:d=2", "-c:a", "aac", "-b:a", "160k"]
    cmd += ["-t", f"{TOTAL}", "-r", str(FPS), "-c:v", "libx264", "-preset", "veryfast",
            "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", args.output]
    subprocess.run(cmd, check=True)
    print("wrote", args.output)


if __name__ == "__main__":
    main()
