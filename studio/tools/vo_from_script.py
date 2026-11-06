"""Build voiceover-parts.md (clean narrator text per part) from an episode script.md table."""
import re, sys
src, dst, wpm = sys.argv[1], sys.argv[2], 180
s = open(src).read()
parts = re.split(r'^## (vo_\d\d) · (.*)$', s, flags=re.M)
body_out, total = [], 0
for i in range(1, len(parts), 3):
    pid, title, body = parts[i], parts[i + 1], parts[i + 2]
    lines = []
    for l in body.splitlines():
        if re.match(r'^\| \d+[a-z]? \|', l):
            t = l.split('|')[3].strip()
            t = re.sub(r'\s*\[[^\]]*\]', '', t); t = re.sub(r'\*\([^)]*\)\*', '', t).replace(' 🔁', '').strip()
            if t: lines.append(t)
    txt = '\n\n'.join(lines); n = len(txt.split()); total += n
    body_out.append(f"## {pid} · {title}  ({n} words, ≈{n / wpm * 60:.0f} s after tightening)\n\n{txt}\n")
head = f"""# EP03 voiceover — clean text for ElevenLabs (generated from script.md)

- **Voice:** Justin – Authentic Professional (`bbhjR3iQ4dSHKQsgUFCH`), same as EP02. **Model:** same as EP02 (`eleven_v4`). Generate in YOUR ElevenLabs account.
- **Delivery:** calm, serious, clear. Not dramatic, not rushed. Keep the EP02 voice settings.
- **Save as:** `vo_00.mp3` … `vo_09.mp3` (one file per part) → upload to `studio/public/iran/vo/` or send them here. I tighten the pauses and cut the scenes to them.
- **Pronunciation:** Hormuz = hor-MOOZ · Qeshm = KESH-um · Natanz = na-TAHNZ · Fordow = for-DOH. If a name comes out wrong, regenerate only that part.
- **Total:** {total} words ≈ {total / wpm:.1f} min after pause tightening, + ≈ 15 s of silent beats (siren, archive film, end card).
- Shot 1 (siren) is silent; vo_00 starts with the first spoken line.
"""
open(dst, 'w').write(head + '\n' + '\n'.join(body_out))
print(total)
