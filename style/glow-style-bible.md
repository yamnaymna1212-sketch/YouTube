# Style Bible v2: "Glow"

Replaces Neon Noir Diorama, which is too common. Shorts first (9:16).

**In one line:** The world is dark and drawn in thin lines. People glow, and the glow is their energy. You see the room only where someone's light reaches it.

## Why this is different
- Most story channels use realistic, lo-fi or 3D neon looks. Here the character itself is the light source, so every frame is readable with almost no background art.
- The glow carries the story without words: bright = rested and okay, dim and gray = tired or broke, red flicker = stress, gold sparks = hope.
- Cheap to produce: stick skeletons + line-drawn rooms can be animated fast and consistently (motion like Fireboy & Watergirl).

## Characters (see `brand/v2-glow/02-cast.png`)
| Name | Color | Head | Hair | Role |
|------|-------|------|------|------|
| **Kai** (lead) | Blue `#36b6ff` | Round | Flowing water ribbon | 22, delivery driver + college |
| Rosa | Pink `#ff4f7b` | Round | Flickering flame | Coworker, always in a rush |
| Mint | Green `#3fe0a0` | Wide oval | Beanie | Roommate, broke but calm |
| Mr. Gold | Amber `#ffb52e` | Rounded square | None, tie | Landlord, steady glow that never dims |
| The Grays | Gray `#5d6b82` | Round | None | Burned-out people, no glow, flat faces |

Everyone shares one skeleton: torso 112, arms 58+56, legs 72+72, head radius 45. Faces: big white eyes with pupils and a highlight, simple mouth. Expressions: happy, tired (half-closed eyes), shocked (wide eyes, O mouth), determined (angled brows).

## Glow states (see `brand/v2-glow/03-glow-states.png`)
| State | Glow | Color | Hair |
|-------|------|-------|------|
| Full | 100% | Blue | Floats up |
| Tired | ~35% | Gray-blue | Droops down |
| Stressed | Flickers | Red | Normal |
| Hope | 120% + gold sparks | Blue | Floats up |

## Motion (see `brand/v2-glow/04-motion-run-cycle.png` and `05-kai-motion-test.mp4`)
- Hair trails behind with speed and keeps waving when he stands still
- Particles rise from the body and trail behind when moving
- Walls and objects light up only within the glow radius; the radius shrinks when the glow dims
- Run: lean 10° forward, arms opposite legs, knees fold on the back swing, body bobs. Walk: same at half the size

## World v3: "Blueprint Neon" (see `brand/v2-glow/06-world-overview.png`)
The channel's signature: **the city is drawn like a blueprint**. Deep navy paper with a faint square grid, chalk-blue structure lines, and one neon color per place. No black backgrounds.

Why blueprint: nobody in the story-Shorts space uses it, the blue-and-grid look is recognizable at first glance in a feed, and it fits the theme of the stories (plans, budgets, the math of a life).

One street, five places, always in this order: **Home → Gas station → 24/7 Market → Burgers → Bank.** A college clock tower stands in the distant skyline.

| Place | Neon color | Key details |
|-------|------------|-------------|
| Home (apt 214) | Warm amber | US flag on the porch, Kai's lit window, door number |
| Gas station | Pink + red price | Canopy, 2 pumps, LED price sign `3.89` |
| 24/7 Market | Teal | Glass front, shelves, OPEN sign, cart |
| Burgers | Red + amber | Neon burger pole sign "OPEN 24H", fries, `$8.99 COMBO` |
| Bank | Money green | Big neon `$`, ATM, US flag on a pole |

**Interiors:** Apartment 214 is shown cut open like a dollhouse (bedroom, kitchen, living room stacked), with a blueprint title block (`13-home-cutaway.png`).

**American details** (`14-americana-props.png`): US flag, $100 and $20 bills, cash stack, coins, paycheck, burger meal, coffee, house keys.
- **No real brand logos** (McDonald's, Walmart, Chase...). They are trademarks: videos can get claimed, demonetized or taken down. Use generic places that are instantly recognizable instead (golden-yellow burger sign, red "BURGERS").
- Money stays a line drawing (neon outline, simple portrait), never a photo-real copy of a bill.

**Rules for a calm, clear frame**
- Three line weights only: far skyline 2px (barely visible), buildings 2.5-3px, accents 3px with a soft glow
- Buildings have solid navy fills, so the grid and skyline don't show through them
- **One accent color per place**, at low glow. Kai's blue is always the brightest thing on screen
- Max one sign per building, max two lit windows per frame
- Scenes are framed on one place at a time (world scale 1.15 in 9:16), with the ground at y=1450

**Line motion (the signature)**
- *Draw-on*: at the start of a scene, every line draws itself in
- *Power pulses*: a small light travels along each building outline, as if the city is powered. When Kai's energy drops, the pulses slow down and fade
- *Sign flicker-on*: signs switch on one by one with a short neon flicker
- The camera pans along the street at walking speed; the skyline moves slower (parallax)

## Explainer props (see `brand/v2-glow/11-explainer-props.png`)
Real proportions and real details, in the same line + soft glow language: **phone** (lock screen, bank notification), **alarm clock** (red LED), **wall clock**, **card** (DECLINED), **receipt**, **pump display**, **calendar** (rent due), **bill** (FINAL NOTICE), **balance number**, **fuel gauge**.
- Show one prop at a time, large, centered, with the scene dimmed behind it
- Numbers on props always match the story (price, balance, time)

## On-screen UI (Shorts)
- Top left: ENERGY bar (character color → amber → red)
- Top right: BALANCE in dollars (turns red when low)
- Caption: Inter Black, ALL CAPS, white with black outline, y ≈ 470
- "Part 1" label, y ≈ 1610

## Making the art
- Characters: `brand/source/glow.js`; world, props and street motion test: `brand/source/world.js` (`node world.js <outDir> [--video]`)
- For final episodes: animate in After Effects, Rive or Spine with the same skeleton, or keep extending `glow.js`
- AI image prompt to explore more looks: `glowing neon stick figure character with round glowing head, big cute white eyes and small mouth, flowing water-like glowing blue hair ribbon, bright blue light aura, dark minimal room drawn in thin dim lines lit only by the character, cinematic, vertical 9:16, no background clutter`
