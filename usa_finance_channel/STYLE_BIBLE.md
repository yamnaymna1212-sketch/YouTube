# Style Bible - "Neon Cutout Americana"

A paper-cutout diorama world lit by American night-time light (sodium streetlamps, motel/pawn-shop neon, gas-station white).
One signature device that makes the channel recognisable in 1 second: the **Problem Meter**.

## 1. The three signatures (what nobody else combines)

1. **Paper cutout world** - every object is a hand-cut paper layer with a hard offset shadow and a faint white edge. Depth comes from layers and parallax, not 3D.
2. **Polaroid heads** - characters have paper bodies, but their heads are tilted Polaroid cards with a flat face illustration. Expressions (worry, relief) live on the card; a sweat drop or confetti sells the emotion.
3. **The Problem Meter** - a neon, gas-pump-style panel at the top of *every* frame. It shows the one number that matters. It rises with each problem, drops a little with each partial fix, then jumps higher. Viewers *see* the staircase without being told.

## 2. Palette

| Role | Hex | Use |
|------|-----|-----|
| Night navy | `#070B24` | sky top, panels |
| Dusk plum | `#2B1250` | sky mid, buildings |
| Sodium rose | `#8A2F4D` | horizon glow |
| Paper cream | `#F6F1E6` | documents, Polaroid frames |
| Danger red | `#FF3B4A` | rising meter, bad numbers |
| Warning amber | `#FFC233` | mid meter, key words |
| Relief green | `#2CFF8F` | solutions, good numbers, credit-union scenes |
| Neon pink | `#FF3FA4` | predatory-lender signage (always pink = trap) |
| Teal safe-room | `#06222A -> #2F8A6A` | the *solution* scene gets a colder, calmer palette |

**Colour grammar:** pink neon = trap, amber = caution, red = pain, green = way out. Never use green before the solution scene.

## 3. Typography

- **Captions:** DejaVu Sans Black (or Montserrat Black / Archivo Black), UPPERCASE, white with a thick black outline, max 2 lines, one keyword per line in a colour.
- **Meter digits:** monospace black (7-segment feel), neon glow in the meter colour.
- **Documents:** small bold sans on cream paper, one red number each.

## 4. Motion rules

- New caption word every 0.2 s (kinetic reveal); one idea per caption.
- Scene length 8-12 s in the final cut (5 s in the animatic); something changes every 1.5-2 s.
- Camera: constant slow push-in (1.00 -> 1.08) + 20-30 px parallax drift. Push **toward** the planted detail on the reveal.
- Objects enter with an overshoot (ease-out-back). Documents drop from above, stamps pop, numbers count up.
- Meter shakes while the number rises; it never shakes during a solution.
- Cuts: 0.15 s dip-to-dark, no wipes, no cross-dissolves.
- Vignette + paper-grain overlay on everything (unifies AI/vector assets).

## 4b. Characters

- Marcus: orange jacket, navy pants, brown hair. Recurring cast gets one fixed colour each so viewers recognise them across episodes.
- Neutral expression is the default; *only* the worry/relief expressions are animated (brows, mouth, sweat drop).
- Faces are drawn flat on the Polaroid; for real-person stories use a stylised portrait, never a real photo.

## 5. Sound

- Constant low room tone per scene (fridge, neon buzz, street).
- Meter sound: soft "tick" going up; **jukebox chime** for every solution (the channel's audio logo); low detuned note for every new problem.
- Music: sparse, slow bass pulse that tightens as the Meter climbs, drops out at the reveal.

## 6. Production pipeline

1. Write the beat sheet (`SCRIPT_EP01.md` template).
2. Build/animate scenes in `animatic.html` (SVG, deterministic `render(t)`).
3. `node render.js stills` -> 5 key frames in `keyframes/`.
4. `node render.js frames <dir>` -> frames -> `ffmpeg` -> MP4.
5. Add VO + sound in an editor; replace the animatic art with final illustrated layers when budget allows (keep the same layout, Meter and caption system).

## 7. Why this should be distinctive

Common finance-explainer looks are talking-head + stock footage, whiteboard, flat vector, or 3D clay characters. This style combines paper cutouts + Polaroid heads + a persistent neon Meter. I cannot guarantee nobody has done it; before launch, search TikTok/Shorts for "paper cutout finance", "neon meter explainer" and check the closest matches.
