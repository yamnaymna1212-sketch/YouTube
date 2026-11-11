# EP09 · script v1 (11 Nov 2026) · target ≈ 5:15

**Title:** Trump Can't Run in 2028. Here's What the Next President Inherits
**Alt titles (A/B test):** "The Bill the Next President Inherits" · "The Money Problem the Next President Can't Avoid"
**Channel:** Dollarly · "Your Money. Decoded."
**Voice:** Kokoro `am_puck`, speed 0.95 (user pick, 11 Nov 2026) · pauses cut > 0.20 s → 0.14 s · VO −15 LUFS, mix −14 LUFS
**Length:** VO v1 = 1,100 words = 5:00 (`studio/public/ep09/vo/vo_ep09.mp3`, timings in `studio/src/ep09/cues.json`) + end card ≈ 5:10. Part start times below are pre-VO estimates; use cues.json.
**Neutral rules:** no 2028 candidate named, no winner predicted, no motive given; both sides on tariffs and Social Security fixes; the only Trump claim is the 22nd Amendment fact + the White House's own words.
**Running device:** THE INHERITANCE ENVELOPE: a paper envelope stamped "JAN 20, 2029" that fills with bills (PRICES · TARIFFS · RATES · DEBT) as each door is opened; at the end it lands on a blank desk in the Oval silhouette.
**Mix:** ≈ 70% paper explainer (Pennsylvania Ave stage, doors, keys, calendar) · 20% Jake & Dana · ≤ 10% real (Prelinger Capitol/Fed/Treasury film, official portrait as a framed print) · new visual every 1–1.5 s · ≤ 5 words on screen · source chip every shot.
**Sound:** calm dark ambient (synth per episode, model `tools/synth_ep08.py`) at 0.07 · punchy-but-clean SFX: paper slam, stamp, ledger tick, coin, door creak, key turn, counter roll (≤ 0.1) · no hiss beds.

## Parts (blank-line blocks of vo-clean.txt)
| Part | Paras | Est. start | Content |
|---|---|---|---|
| Hook | 0–2 | 0:00 | 22nd Amendment · Nov 7 2028 · Jan 20 2029 · "not a prediction" · presidents inherit prices |
| Part02 | 3 | 0:40 | The receipt: Oct CPI +0.4% · groceries/rent/beef |
| Part03 | 4 | 0:58 | Door 1 TARIFFS: what a tariff is · SCOTUS Feb 2026 · refunds to importers · "just getting started" · both sides |
| Part04 | 5 | 1:40 | Door 2 RATES: Fed 3¾–4%, two dissents for a hike, Dec 9 · mortgage 7.2% vs 6.2% · +$190/mo · savings upside · Fed nominations |
| Part05 | 6 | 2:22 | Door 3 DEBT: $40.6T vs $41.1T limit · Social Security late 2032 · fixes need Congress |
| Part06 | 7 | 3:05 | THE THREE KEYS: White House · Congress · Fed |
| Part07 | 8 | 3:30 | Jake (26, renter, wants a home) · Dana (60, retirement) · ILLUSTRATIVE |
| Part08 | 9–10 | 3:58 | Calendar Dec 9 → Dec 11 → Jan → Nov 7 2028 · three things to do |
| Part09 | 11–13 | 4:40 | Close line · disclaimer · comment question · end card |

## Shot table
| # | Beat (spoken word) | Shot | On screen (≤ 5 words) |
|---|---|---|---|
| H1 | "Donald Trump" (0.0 s) | Hard cut: official 2025 portrait as a framed print on a paper wall, camera pushes in; stamp SFX | — · chip "White House, public domain" |
| H2 | "two terms. Period." | Paper scroll of the Constitution unrolls; "22nd AMENDMENT" stamp slams; two ticks ✓✓ (2016, 2024) | **2 TERMS.** |
| H3 | "November seventh, 2028" | Calendar page flips fast to NOV 7 2028; ballot box pawn drops a ballot | NOV 7, 2028 |
| H4 | "prices… tariffs… interest rates" | Three bills slide into the INHERITANCE envelope one per word (receipt, customs stamp, % tag) | — |
| H5 | "your money" | Envelope flies toward camera → wipe into Pennsylvania Ave paper stage (World), Jake at the side looking at his phone | — |
| H6 | "not a prediction" | Three blank silhouettes at podiums (red / blue / grey); none lit | WHO WINS? NOT TODAY. |
| H7 | "January twentieth, 2029" | Envelope stamp "JAN 20, 2029"; Prelinger Capitol dome (cap_dome.mp4) on Jake's TV | JAN 20, 2029 |
| H8 | "credit, or the blame" | Seesaw: thumbs-up / thumbs-down card tilting over a podium | — |
| H9 | "courtrooms, Congress… Federal Reserve" | Three quick real cuts (cap_supreme_pediment, cap_house_floor, cap_fed) inside paper frames, 1 s each | — |
| P2-1 | "inflation report" | Jake's kitchen: long paper receipt prints out of his phone | OCT: +0.4% |
| P2-2 | "Groceries… Rent… Beef" | Icons pop on the receipt (cart, key, steak), each with a red ▲ | — |
| P2-3 | "it stacks" | Receipts stack into a tower month by month; counter ticks | — |
| P3-1 | "Door number one" | Paper door labelled TARIFFS swings open (creak SFX); camera flies through | DOOR 1 · TARIFFS |
| P3-2 | "paid at the border" | Paper port map: container ship → customs booth stamp → truck → store shelf; price tag ticks up | — |
| P3-3 | "Supreme Court" | cap_supreme_pediment in a frame; gavel strikes a tariff stamp; date chip FEB 2026 | STRUCK DOWN · ONE LAW |
| P3-4 | "Refunds… importers" | Coins fly back to a warehouse, not to Jake's wallet (Jake shrugs) | — |
| P3-5 | "just getting started" | Quote card, White House silhouette | "just getting started" |
| P3-6 | "Supporters… Critics" | Split screen: factory rising vs shopping cart heavier; equal size | SUPPORTERS · CRITICS |
| P3-7 | "stay, grow, or go" | Three switches; envelope swallows the TARIFF bill | — |
| P4-1 | "Door number two" | Door RATES opens; cap_fed in frame | DOOR 2 · RATES |
| P4-2 | "three and three quarters and four" | Paper gauge needle settles in 3.75–4 band; two pawns hold up "▲" cards | 3.75–4% |
| P4-3 | "December ninth" | Calendar pin DEC 9 | DEC 9 |
| P4-4 | "mortgage… car loan… credit card" | Pipe from the Fed building branches into house, car, card | — |
| P4-5 | "seven point two… six point two" | Two price tags flip: 6.2% (2025) → 7.2% (2026) | 7.2% vs 6.2% |
| P4-6 | "one hundred ninety dollars more" | Jake's monthly bill: counter rolls up +$190 | +$190/mo |
| P4-7 | "savings account" | Piggy bank glows (balance beat) | — |
| P4-8 | "nominates… Senate confirms" | Paper chair labelled FED; White House hand offers it, Senate gavel stamps it | — |
| P5-1 | "Door number three" | Door DEBT opens; cap_treasury_steps | DOOR 3 · DEBT |
| P5-2 | "forty point six trillion" | Paper thermometer fills toward a red line at 41.1 | $40.6T / $41.1T |
| P5-3 | "half a trillion dollars of room" | Gap between mercury and line zooms in | — |
| P5-4 | "Social Security… late 2032" | SS card on a paper calendar flipping to 2032; hourglass | LATE 2032 |
| P5-5 | "inside the next president's term" | Timeline bar 2029→2033 with a pin on 2032 | — |
| P5-6 | "Checks don't stop… part of what's promised" | Check prints, part of it greyed (no %, no number) | — |
| P5-7 | "Raise taxes, trim benefits" | Balance scale, two cards, equal weight; Capitol stamp "ONLY CONGRESS" | ONLY CONGRESS |
| P6-1 | "three keys" | Three paper keys on a ring: WHITE HOUSE · CONGRESS · FED | 3 KEYS |
| P6-2 | each key's powers | Each key turns in its own lock, icons pop (tariff stamp/veto pen; budget/debt/SS; % gauge) | — |
| P6-3 | "No president holds all three" | Hand grabs the ring, only one key comes off | — |
| P7-1 | "Meet Jake" | Jake in his apartment, "FOR SALE" house on his laptop; ILLUSTRATIVE tag | ILLUSTRATIVE |
| P7-2 | "costs more" | House price tag inflates each month tick | — |
| P7-3 | "grocery list… total" | Same list, receipt total ticking up | — |
| P7-4 | "Dana… sixty" | Dana at a kitchen table with a paper retirement calendar | — |
| P7-5 | "nobody can tell her yet" | Question-mark stamp on her check | — |
| P8-1 | calendar | Paper wall calendar, pins pop on each spoken date: DEC 9 · DEC 11 · JAN · NOV 7 2028 | dates only |
| P8-2 | "Three things" | Three paper cards fan out: % phone call · receipt notebook · ssa.gov laptop | 1 · 2 · 3 |
| P9-1 | "bills are already written" | Envelope sealed, lands on an empty desk under the White House silhouette | — |
| P9-2 | "the person who pays… is you" | Camera pulls back to Jake holding the envelope | — |
| P9-3 | disclaimer | Small card | NOT FINANCIAL ADVICE |
| P9-4 | end card | Dollarly logo + "Which door?" with 3 mini doors · next-episode slot | WHICH DOOR? |

## Real material plan (≤ 10%)
- `real/trump_official_2025.jpg` (EP04, public domain) — H1 only, as a framed print. No edits to the face.
- Prelinger "Washington: The Nation's Capitol" clips already in `studio/public/ep04/footage/` (cap_dome, cap_supreme_pediment, cap_house_floor, cap_fed, cap_treasury_steps) — inside paper frames / on Jake's TV, 1–2 s each.
- Copy the used files into `studio/public/ep09/` and list them in `LICENSES.md`.
