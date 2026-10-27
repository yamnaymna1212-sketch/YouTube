> **Archived (v1).** Replaced by `glow-style-bible.md`. Kept for reference only.

# Style Bible: "Neon Noir Diorama"

The channel's locked visual style. Every image, character, and scene follows this file, so the videos look like one world.

**In one line:** Stylized 3D characters living in a real-feeling miniature world at night: rain, neon, fog, a blue room lit by a red screen, with film grain over everything.

---

## 1. What we took from each reference

| Reference | What we keep | What we drop |
|-----------|--------------|--------------|
| `references/01-3d-fog-desk.jpg` | Volumetric fog, pink-to-blue gradient glow, the lonely figure in a big empty space, small serif quote text | The empty tiled void (we need real rooms) |
| `references/02-flat-red-screen-light.jpg` | **Two-tone lighting**: cold blue room + hot red screen light on the face. Hard light shapes | Flat vector look |
| `references/03-woodcut-doorway.jpg` | Rough printed texture and grain at the edges, silhouettes in lit doorways for emotional moments | Bright yellow palette |
| `references/04-glowing-figure.jpg` | The glowing translucent "inner self" figure, used only for feelings (anxiety, hope, exhaustion) | Used as the main character style |
| `references/05-pixel-night-room.gif` | Detailed lived-in night room, rainy city window, **red digital clock** as a story device | Pixel art rendering |
| `references/06-lego-miniature-crt.jpg` | **Miniature realism**: tilt-shift depth of field, tactile toy-like materials, practical lights, the "real but small" feeling | LEGO faces and brand look |

**Base style = 06 (miniature realism) + 01 (3D fog).** The others add lighting, texture, and story tools. Rule: one base, other styles only add rules on top. Mixing six styles evenly gives a mess.

---

## 2. The world

- **Always night**, usually 11 PM to 4 AM. Rain or wet streets in most exterior shots.
- **Real American places, miniature-scale:** a small apartment, a gas station, a 24-hour grocery store, a community college parking lot, a car interior, a bank app on a phone.
- Neon sources must make sense: gas station signs, store signs, phone screens, car dashboards, laptop screens, street lights. Never neon for no reason.
- Lived-in details: unpaid bills on a table, instant noodles, a hoodie on a chair, a cracked phone screen, sticky notes with numbers.

## 3. Color palette

| Role | Color | Hex |
|------|-------|-----|
| Ambient shadows, room, night sky | Deep navy | `#0F1A33` |
| Window light, rain, cold mood | Electric blue | `#2F8FE0` |
| Screens, money pain, danger, clocks | Hot red | `#E8202A` |
| Neon signs, transitions, fog glow | Magenta pink | `#E0508F` |
| Hope, warm moments, the ending | Amber yellow | `#F2B544` |
| Inner-self glow | Cyan | `#5CE1F0` |

**Lighting rule:** every shot has one cold source (blue, from a window or the night) and one hot source (red/pink/amber, from a screen or sign). The face is lit by the hot source.

## 4. Characters

- Stylized 3D, slightly toy-like proportions (head a little large, simple faces, expressive eyes), **realistic materials**: fabric folds, wet hair, worn sneakers.
- No hyper-realistic faces. No anime. No cartoon outlines.
- Each main character has 3 fixed "anchor" details that never change between shots.

### Dana (Part 1 lead)

- 21, community college student, night-shift grocery worker in Ohio
- **Anchor 1:** dark curly hair in a messy bun
- **Anchor 2:** oversized faded maroon hoodie
- **Anchor 3:** green grocery store name tag clipped to the hoodie
- Small silver hoop earrings, dark circles under the eyes, worn white sneakers

### Dana's inner self

- Translucent glowing cyan version of Dana (same bun and hoodie silhouette), white glowing eyes, no face details
- Appears only at emotional peaks: the 2:14 AM alert, the exam, the declined payment

## 5. Camera and texture

- Tilt-shift depth of field (sharp subject, blurred foreground and background) = the "real miniature" feeling
- Slow push-ins and slow pull-backs; no fast cuts except for the alert sound
- Film grain on every frame, plus a light rough print texture on the frame edges (from ref 03)
- Light fog in every interior; heavier fog for flashbacks and dream moments

## 6. Text on screen

- **Captions:** bold white sans-serif, ALL CAPS, 2-6 words, soft dark shadow
- **Quote and rule cards:** thin white serif, sentence case, centered in fog (from ref 01). Example: *"The gas light is not a suggestion."*
- **Clocks and money:** red digital LED font, like the clock in ref 05

---

## 7. AI prompts

Use these with any image model (Midjourney, Flux, Ideogram, etc.), then animate with an image-to-video model (Kling, Runway, Veo, etc.).

### Master style suffix (paste at the end of every prompt)

```
stylized 3D miniature diorama, tilt-shift depth of field, night, neon noir, cold blue ambient light from a window, hot red screen light on the face, volumetric fog, rain, practical lights, tactile toy-like materials, cinematic, film grain, subtle rough print texture on the edges, moody, lonely, high detail, vertical 9:16
```

### Negative prompt

```
anime, cartoon outlines, flat vector, hyper-realistic skin, daylight, bright cheerful colors, text artifacts, logos, extra fingers, plastic shine
```

### Dana character sheet

```
character sheet of a 21-year-old American college student, stylized 3D figure with slightly large head and expressive tired eyes, dark curly hair in a messy bun, oversized faded maroon hoodie, green grocery store name tag clipped on the hoodie, small silver hoop earrings, worn white sneakers, front view, side view, back view, three expressions: exhausted, shocked, quietly hopeful, neutral dark navy background with soft red rim light, [MASTER STYLE SUFFIX]
```

Generate the sheet first, then use it as the character reference image (`--cref` in Midjourney, or the reference slot in other tools) for every shot.

### Inner self

```
translucent glowing cyan spirit version of a young woman with a messy bun and an oversized hoodie, glowing white eyes, no facial features, soft light spilling onto a dark floor, dark silhouettes of people around her, [MASTER STYLE SUFFIX]
```

### Part 1 key shots

| Scene | Prompt (add the suffix) |
|-------|-------------------------|
| 1-2: 2:14 AM alert | dark tiny bedroom at night, rain on the window, a phone on the nightstand lighting the ceiling red, a red digital clock showing 2:14, a young woman asleep under a navy blanket |
| 3: Dana wakes up | Dana sitting up in bed holding her phone, her face lit hot red by the screen, blue window light behind her, messy bun |
| 4: kitchen table | small apartment kitchen table at night, pay stub, unpaid bills, instant noodles, wall calendar with EXAM circled in red, a single lamp, rainy window |
| 5: gas light | car dashboard interior at night, fuel needle on empty, orange gas warning light, rain on the windshield, a gas station neon sign blurred in the distance |
| 6: rule card | empty foggy space with pink-to-blue gradient glow, wet reflective floor, nothing else (serif text added in editing) |
| 8: self-checkout | 24-hour grocery store at night, harsh fluorescent and blue light, Dana in her maroon hoodie scanning cheap noodles at self-checkout, empty aisles |
| 9: studying | Dana at a small desk at 1:40 AM, laptop light on her face, textbooks, a red digital clock on a shelf, rainy city window, lava lamp glow |
| 10-11: exam | community college classroom, morning light turned cold blue, Dana staring at an exam sheet, her glowing cyan inner self sitting beside her, blurred students |
| 13: declined payment | close-up of a cracked phone screen in a hand showing a red banner, wet bench, blurred parking lot lights |
| 14: pull back | wide shot of Dana alone on a bench in an empty community college parking lot, fog, one street light, tiny figure in a big space |
| 15: unknown number | phone face up on a wet bench vibrating, screen glowing, rain drops on the glass, extreme tilt-shift |
| 17: help card | Dana in a lit doorway, amber warm light spilling out, her silhouette, the blue night behind (hope moment) |

### Motion prompts (image to video)

- Default: `slow camera push-in, rain falling, fog drifting, screen light flickering softly, subtle breathing`
- Alert moments: `phone vibrates, red light pulses on the face, quick small camera shake`
- Pull-back moments: `slow camera pull back and up, character stays still, fog rolls in`
