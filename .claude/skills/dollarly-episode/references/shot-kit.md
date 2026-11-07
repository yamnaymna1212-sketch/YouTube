# Shot kit (EP04 code, reuse it)

- `studio/src/brand/Brand.tsx` — palette `B`, fonts (`display` Playfair, `cond` Barlow Condensed), `PaperGround`, `NightGround`, `Grain`, `Kicker`, `NameCard`, `NightHeadline`, `Label`, `QuoteCard`, `Src`, `Bug`, `Frame` (real photo/film in a print), `FullFilm`, `Badge` (Lucide icon in a disc), `PaperUS`, `NightUS`, `Pin`, `Door`, `Calendar`, `WalletChip`, `ChapterCard`.
- `studio/src/brand/Thumb.tsx` — thumbnail template (`<Thumb l1 l2 strip photo art />`).
- `studio/src/ep04/kit.tsx` — `At` (shot on the clock), `Enter` (zoom/slide/rise/drop/fade links), `Push`, `FlyInto` (zoom-through into a door/TV/pin), `Sound` (VO + music + soft SFX).
- `studio/src/ep04/parts.tsx` — `PartShell` (shots list + sound per part), `World` (skyline + floor + walking pawns + Jake reacting; pass `jake={false}` when the shot already has him or content is at bottom-right), `Slot` (process step with ✓/✗), `Stamp`, `BigLine`, `Bill` (SPECIMEN note), `FlipCalendar`, `rel`, `k01`, `ease`.
- `studio/src/ep04/Story.tsx` — `Apartment` (Jake's room with a TV that renders any 1920×1080 scene; `dawn`), `PhoneText`, `Hemicycle` (seat chart with animated flip), `Route` + `onArc` (pawn travel), `Dust`.
- `studio/src/ep03/PaperWorld.tsx` — `Pawn` (living pawn: breathing, hop), `Building` (wh/cap/pent/tehran), `Road`.
- `studio/src/host/LiveJake.tsx` — Jake: poses stand/point/think/shrug/cheer/read; beats surprise/smile/cheer/worry/doubt/shrug/nod/think.

Patterns that worked in EP04: night map + clock for a deadline; seat charts flipping on "lost"; one icon slot that swaps on the words; three doors as the episode's spine (door opens → chapter); a living table that the camera visits row by row; Jake's TV as the way into an explainer.
