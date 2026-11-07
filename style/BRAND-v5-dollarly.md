# DOLLARLY BRAND v5 — one look for every episode (7 Nov 2026)

"Your Money. Decoded." Built on STYLE-v4 (paper world, TV-first rules), now one complete brand. Code: `studio/src/brand/Brand.tsx` (kit) + `studio/src/brand/Thumb.tsx` (thumbnail template). First use: `studio/src/ep04/Hook.tsx`.
References the user liked: Precedent (cream paper, serif name cards, framed real photos, beige maps, pawns on Pennsylvania Avenue, quote cards) and Every Topic Explained (dark teal map, glowing outline, dated kicker + gold underline). We copy the **grammar**, never their assets.

## 1. Palette (`B` in Brand.tsx)
| Token | Hex | Use |
|---|---|---|
| ink | #1B2230 | lines, type, frames |
| paper | #EDE6D3 | the stage (never pure white/black) |
| bone | #F6F1E4 | cards, labels |
| land / sand | #E4D7B5 / #DDD0AF | paper maps, floor |
| red | #B4452F | kicker, danger, "lost", door 1 |
| blue | #3F5A8C | one side, door 2 |
| pine | #4E7A4A | markers, door 3 |
| amber / gold | #D9A441 / #E8B64C | money only · underline on night maps |
| night / nightLand / nightLine | #132022 / #1F3134 / #36504F | night map family |
| glow | #E5483B | glowing outline, deadline clock |

## 2. Type
- **Playfair Display 700** — names, dates, chapter titles ("Donald J. Trump", "December 11, 2026").
- **Barlow Condensed 700/800 caps** — labels, kickers (letter-spaced, red), big card text, thumbnails.
- **JetBrains Mono** — sources, clocks, data.

## 3. The five shot families (vary them, never more than ~8 s of one family in a row)
1. **PAPER STAGE** — cream paper, ink-line buildings (White House, Capitol), Pennsylvania Avenue strip, living pawns (role labels, never caricatures), quote cards.
2. **PAPER MAP** — beige US/world map (U.S. Census / Natural Earth), small label cards, pins, doors/props standing on a floor line.
3. **NIGHT MAP** — dark teal relief map, glowing red outline that draws in, "— KICKER / serif date / gold underlined line". For deadlines, wars, breaking facts.
4. **ARCHIVE PRINT** — real photo or real film inside a white print frame with soft drop shadow + year tag, beside a name card (red kicker, serif name, two short lines). Or full-frame film with a warm grade and a source chip.
5. **JAKE EXPLAINS** — Jake (LiveJake) on the paper floor beside ONE big card. Short beats only (3–6 s), 1–2 per chapter, always reacting (shrug, think, worry, smile).

## 3b. The mix (user feedback, 7 Nov 2026) — non-negotiable
- **≈70% explainer in the paper style** (stage, maps, pawns + route arcs, House/Senate seat charts, quote cards, doors, calendars).
- **≈20% Jake's story**: he lives the episode (his apartment, his TV, his bills, a text from his cousin Dana). The story opens each chapter and the explainer answers it; we go back to Jake after every big number.
- **≤10% real material**, used as a moment, not a slideshow: shown *inside the story* (on Jake's TV, his phone) or as one framed print. Never a long run of photos.
- **Linked**: story → (camera dives into the TV/phone) → explainer → (zoom out to Jake) → story. Every scene hands a shape, a motion or a question to the next.

## 3c. No dead second · minimal text (user rule, 7 Nov 2026) — non-negotiable
- **Something new happens at least every 1–1.5 s**: an icon badge pops/swaps, a pawn hops, a route draws, seats flip, the camera pushes/pulls, a real clip plays, Jake reacts. A still image never sits on screen alone.
- **One icon slot that swaps on the words** (e.g. Congress → gavel → "3" → wallet) is better than four labels.
- **Minimal text**: max ~5 words on screen at once (plus the small source chip). Prefer an icon to a word (a crossed-out ballot instead of "Who won? Not the point."). Door/label words: 1–2 words.
- **Pro motion only**: springs, eased camera moves, motion that carries into the next shot. No linear slides, no random jitter, no long holds.

## 4. Fixed brand elements (every shot)
- Source chip bottom-left (mono). Logo + DOLLARLY bug bottom-right. Film grain over everything.
- Chapter cards: red kicker "DOOR ONE" + serif title + red rule; entered by flying through a door/pin.
- Jake's wallet chip top-right when money changes.
- Links between shots: zoom-through, slide (carry the motion), rise/drop, fly into a door/pin. No plain cut between unrelated images.

## 5. Real material (all licensed, all credited on screen)
U.S. government works (White House official portraits, NASA, National Archives, House recordings), Prelinger Archives films (public domain), uscurrency.gov SPECIMEN notes, U.S. Census map data. No AI-generated or AI-altered faces. No company logos as standalone images. No news-channel footage.

## 6. Sound
Calm dark ambient music at 0.07 (synth_audio.py). SFX only tick/type/counter/paper, ≤ 0.1. VO tightened with `tighten_vo.py`; every element fires on its spoken word.

## 7. Thumbnail template (`Thumb.tsx`, 1280×720)
Left: two giant Barlow Condensed lines (ink, then red with ink stroke) + one ink strip with a red offset shadow. Right: a REAL photo in a white print frame, tilted 3°. Bottom-left: one paper prop (doors, country map, calendar tag). Top-right: DOLLARLY logo tab. Max 3 elements, readable at 120 px wide. The words must match what the first 30 s show.
