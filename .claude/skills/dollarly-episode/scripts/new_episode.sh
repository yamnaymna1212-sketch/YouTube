#!/bin/bash
# Scaffold a new Dollarly episode. Usage (repo root): bash .claude/skills/dollarly-episode/scripts/new_episode.sh ep05 my-slug
set -e
EP=$1; SLUG=$2
[ -z "$EP" ] || [ -z "$SLUG" ] && { echo "usage: new_episode.sh ep05 my-slug"; exit 1; }
ROOT=$(git rev-parse --show-toplevel); cd "$ROOT"
D=episodes/$EP-$SLUG; S=studio/src/$EP; P=studio/public/$EP
mkdir -p $D/style $D/renders/parts $S $P/{footage,real,vo,audio}
cat > $D/research.md <<T
# ${EP^^} research (checked $(date +%Y-%m-%d))
Status key: ✔ primary · ◐ secondary, confirm before VO · ⚠ do not use
| # | Fact | Status | Source |
|---|---|---|---|
T
cat > $D/script.md <<T
# ${EP^^} · script v1
**Title:**
**Length:** target 9–10 min (≈ 1,500–1,700 words)
**Mix:** 70% paper explainer · 20% Jake story · ≤10% real · no dead second · ≤ 5 words on screen
| # | Shot | VO |
|---|---|---|
T
printf 'Hook paragraph: date/stakes in second 0.\n\nNext paragraph.\n' > $D/vo-clean.txt
printf '# %s · licences of real material (studio/public/%s/)\n| File | What | Source | Licence |\n|---|---|---|---|\n' "${EP^^}" "$EP" > $D/LICENSES.md
printf '# %s · YouTube upload\n## Title\n## Description\n(chapters from cues.json)\n## Tags\n## Settings\nEducation · not for kids · AI narration disclosed in the description\n## Re-check before upload\n' "${EP^^}" > $D/youtube-upload.md
for f in kit.tsx parts.tsx Story.tsx; do sed "s#ep04/#$EP/#g; s#EP04#${EP^^}#g" studio/src/ep04/$f > $S/$f; done
python3 - "$S/t.ts" <<'PY'
import sys
s = open('studio/src/ep04/t.ts').read()
i = s.find('// ---- hook times')
ep = sys.argv[1].split('/')[2]
s = (s[:i] if i > 0 else s) + f"""
// TODO: hook times for this episode, e.g. export const T = {{ party: paraT(1), lost: wordT(1, 'lost') }};
export const HOOK_DUR = 30; // set to paraT(<first paragraph of Part02>) once the VO exists
export const VO_FILE = '{ep}/vo/vo_{ep}.mp3';
"""
open(sys.argv[1], 'w').write(s.replace('ep04', ep))
PY
echo '{"mode":"empty","dur":10,"paras":[{"i":0,"t":0,"words":[["Hook",0,0.3]]}]}' > $S/cues.json
echo "Scaffolded $D, $S, $P. Next: idea → research.md → vo-clean.txt → VO (references/pipeline.md)."
