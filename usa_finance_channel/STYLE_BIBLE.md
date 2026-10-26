# Style Bible - "Neon Cutout Americana" (v2, minimal)

Paper-cutout diorama world lit by American night-time light (sodium streetlamps, neon, gas-station white).
**Rule zero: every element must do a job. If it does not move the story forward, delete it.**

## 1. The two signatures

1. **Paper cutout world** - every object is a cut-paper layer with a hard offset shadow and a faint white edge. Depth from layers and slow parallax, not 3D.
2. **Amount + arrow, no box** - one big number at the top of every frame with an arrow beside it. No panel, no label, no bar.
   - Arrow **up / red** = the problem grows (bill, fees, debt).
   - Arrow **up / green** = money gained (loan received).
   - Arrow **down / green** = the problem shrinks (debt paid off).
   - The number counts up or down as it happens; the arrow bobs only while it moves.

## 2. Characters

- Paper body (jacket, trousers, arms) with a **real American head**: face, ears, hair, eyes, brows, nose, mouth - no card, no frame.
- Only two animated expressions: **worry** (brows up in the middle, frown) and **smile** (teeth). Everything else is neutral.
- One fixed outfit per recurring character so viewers recognise them across episodes.
  - Marcus: orange jacket, navy trousers, brown hair.
  - Teller (credit union): blue jacket, long dark hair.
- Poses used: hands on head (stress), look (thinking), wave (relief). Nothing else.

## 3. Captions (strict)

- **White by default.** Only the *number or key word* turns colour: **red = loss**, **green = gain**. No other colours.
- Max 2 short lines (<= 22 characters each), one idea, black outline, centred at the bottom.
- Words appear one by one (0.2 s apart). Never repeat what the amount already says unless it adds the *why*.

## 4. What is allowed on screen

| Allowed | Not allowed |
|---------|-------------|
| Amount + arrow | Panels, bars, ticks, labels like "PROBLEM METER" |
| Caption (white / red / green) | Extra text on props (quotes, stamps, forms, signs with sentences) |
| One neon sign per location (CASH NOW / CREDIT UNION) to name the place | Stars, clocks, confetti, dashed arrows, decorative props |
| The planted flyer (no text) | Repeated numbers in three places at once |

## 5. Palette

| Role | Hex |
|------|-----|
| Night navy / plum / rose sky | `#0A0F2C` -> `#2B1250` -> `#7A2A4A` |
| Safe-room teal sky (solution scene only) | `#06222A` -> `#0F4A4A` -> `#2F8A6A` |
| Loss red | `#FF4655` |
| Gain green | `#2CFF8F` |
| Paper cream | `#F6F1E6` |
| Trap neon (predatory lender sign) | `#FF3FA4` |

## 6. Motion rules

- Constant slow push-in (1.00 -> 1.07) with 20-30 px drift. On the reveal, push **toward** the planted detail.
- Objects enter with a small overshoot; numbers count; steam, steps and cash are the only secondary motion.
- Cuts: 0.15 s dip to dark. No wipes, no cross-dissolves.
- Vignette + paper grain over everything.

## 7. Sound

- Room tone per scene; soft tick while the number climbs; jukebox chime on each solution; low detuned note on each new problem; silence on the reveal.

## 8. Pipeline

`animatic.html` (SVG, deterministic `render(t)`) -> `node render.js stills` -> `keyframes/` -> `node render.js frames <dir>` -> ffmpeg -> MP4. Replace the placeholder art with final illustration later, keeping the same amount/arrow and caption system.

## 9. Distinctiveness

Typical finance explainers use talking heads, whiteboards, flat vector or 3D clay. Paper-cutout + minimal amount/arrow is uncommon, but I cannot guarantee nobody has done it - search "paper cutout finance" on TikTok/Shorts before launch.
