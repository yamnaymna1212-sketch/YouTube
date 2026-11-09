# EP07 · script v1 (9 Nov 2026) · target ≈ 8:30

**Title:** The World After a Nuclear Strike: The First 24 Hours
**Alt titles:** "If a Nuclear Weapon Hit the Gulf Tonight, What Happens to Your Money by Monday?" · "WHAT IF: The First 24 Hours After a Nuclear Strike (Stocks, Gas, Your Bank)"
**Channel:** Dollarly · "Your Money. Decoded."
**Hook:** money and the clock in second 0: "Sunday, six p.m. … The first markets on Earth are about to open." The clock is on screen from frame 1.
**Frame (v2, user direction):** two tracks on one clock. **SAM** (illustrative delivery driver, unnamed Gulf port city) does what the official guidance says to stay safe (get inside, stay inside, stay tuned). **JAKE** (U.S.) watches the world react on TV and his phone: stocks, oil, gas, bank, daily life. Labelled WHAT IF on every frame. Yardsticks from real days. **Nothing graphic: the blast is a white paper flash + silence + alert icon. No bodies, blood, injuries, ruins, casualty numbers.**
**Length:** VO 1,625 words ≈ 9:45 after pause cuts.
**Voice:** default local Kokoro `am_michael` (`references/pipeline.md`). If the user sends their own ElevenLabs take → `tighten_vo.py` + faster-whisper → `episode_cues.py`.
**Style:** `style/BRAND-v5-dollarly.md`. Mix ≈ 70% paper explainer / 20% Jake story / ≤ 10% real. Something new every 1–1.5 s, ≤ 5 words on screen + source chip, rich world, WHAT IF tag on every World.
**Running devices:**
- **THE CLOCK** (top-right chip, replaces the wallet chip): a paper clock face + digital "HOUR 00 / 24" that ticks forward on the words; it jumps at each door (0 → 6 → 12 → 24). Hook, calendar and close return to it.
- **THE THREE DOORS** (EP04 `Door`): ① STOCKS ② GAS ③ BANK, one opens per chapter, camera flies through.
- **YARDSTICK STAMP**: a paper stamp "YARDSTICK · date" every time a real past day is used (9/11, Abqaiq, SVB, Mar 2020), so the viewer always knows what is real history vs what-if.
- **ILLUSTRATIVE tag** on Jake / Maya / Luis / Walter.
Legend: **A** Jake story · **B** paper stage/map explainer · **N** night map · **C** real photo/footage (framed print or on Jake's TV) · **D** document/quote card · **E** data/maths. **→** links to next shot.

## Parts (paragraph runs) · paragraph numbers = blank-line blocks of `vo-clean.txt`
| Part | Paras | Est. start | Content |
|---|---|---|---|
| Hook | 1–3 | 0:00 | Sunday 6 p.m. clock → two people → what-if + yardsticks → meet Sam and Jake |
| Part02 | 4–7 | 0:50 | SAM hour 0: get inside / stay inside / stay tuned, the middle of a building or basement, the honest tunnel line, Sam inside |
| Part03 | 8–11 | 2:15 | JAKE door ① stocks: futures + Asia, 7/13/20 brakes, 9/11 yardstick, −$700 on paper |
| Part04 | 12–13 | 3:50 | SAM hour 6 (clothes in a bag, wash, wait) → JAKE door ② opens |
| Part05 | 13–17 | 4:30 | JAKE door ② gas: Hormuz, one world price, Abqaiq, 2.4¢, SPR |
| Part06 | 18–21 | 6:15 | SAM hour 12 "stay where you are" → JAKE door ③ bank: SVB, FDIC, Fed Sunday |
| Part07 | 22–25 | 7:30 | Daily life (air, shipping, Maya/Luis/Walter) · Hour 24 Sam vs Jake · the clock · three things |
| Part08 | 26–28 | 9:05 | Close: back to Sunday 6 p.m., disclaimer (not safety instructions), end card |

**Sam's world:** same paper style, unnamed port city (no real city, no flag), concrete building, inner hallway, battery radio, phone at low battery; Sam never leaves the building. Safe-guidance cards read "Source: CDC / Ready.gov" and show the three sentences as paper tabs.
**The flash (para 1 only):** 0.6 s white paper flash, then silence and an alert icon. No cloud, no ruins.
**Split screen:** SAM left / JAKE right while the CLOCK in the middle ticks; used at hours 0, 6, 12, 24.

## Shot tables

The shot tables below from v1 still apply to Jake's doors (paras 8–11, 13–17, 19–21 here). v2 adds these new shots:

| # | Shot | VO cue | Notes |
|---|---|---|---|
| 1a | **N** Night map of the Gulf port (paper), CLOCK SUN 6:00 PM, WHAT IF tag | "Sunday, six p.m. Eastern." | |
| 1b | **B** 0.6 s white flash, silence, alert-tone icon on a phone | "a nuclear weapon has just been used" | no imagery of the event |
| 1c | **B** Split screen: Sam (phone alert) | Jake (TV, tank icon) | "Two people … twenty-four hours very differently" | |
| 3a | **A** Sam + ILLUSTRATIVE tag in the delivery van; Jake on the sofa | "Meet Sam … And meet Jake" | |
| 4a | **D** Three paper tabs: GET INSIDE · STAY INSIDE · STAY TUNED + "Source: CDC / Ready.gov" | "Get inside. Stay inside. Stay tuned." | each tab on its word |
| 4b | **B** Sam runs from the van to a concrete building (paper), minutes timer | "the nearest solid building, right away" | a car icon gets a grey ✕ | 
| 5a | **B** Cross-section of the building: middle floor / basement highlighted, windows crossed | "the middle of the building, or a basement" | |
| 5b | **E** Thin wooden house vs concrete tower, walls counted | "A tall concrete building beats a thin wooden one." | ◐ S2 |
| 6a | **D** Tunnel + subway icons with "?" | "what about a tunnel, or a subway?" | do NOT mark tunnel as safe |
| 6b | **D** Card: "No official rule → we won't invent one" | "we will not invent one" | |
| 7a | **A** Sam climbs stairs, sits in an inner hallway, radio + phone | "takes the stairs to the middle floor" | |
| 7b | **B** Clock face with Sam's room dimmed; label OFFICIALS DECIDE | "Officials, not individuals, decide…" | |
| 12 | **A** Sam: phone 17%, outer clothes sealed in a bag, wash icon | "Take off the outer clothes and seal them in a bag" | ◐ S6 |
| 18 | **A** Sam hears a one-line message, nods, sits | "Stay where you are." | |
| 22 | **B** Daily-life row: planes parked, tanker route redrawn, grocery shelf, pump | "Daily life changes too" | yardstick: 9/11 airspace ◐ S7; non-graphic |
| 23 | **B** Split screen at HOUR 24: Sam still inside (radio on) | Jake: gas higher, bank open, 401(k) number | "Stay." | |
| 25 | **D** Three paper cards: SHELTER · INSURED · PAPER LOSS | "Three things worth knowing" | |
| 27 | **D** Disclaimer: "Education only · not safety instructions · follow local officials" | "It is not safety instructions" | |

Real-material plan, mix check and Jake-door shots: the Jake door shots are in the appendix below (cue words still match the v2 VO).

## Appendix · Jake door shots (from v1; paragraph numbers there refer to the v1 VO, use the cue words, not the numbers)

## Part02 · DOOR 1 stocks (paras 5–9)
| # | Shot | VO cue | Notes |
|---|---|---|---|
| 5a | **B** Door ① opens, camera flies through, CLOCK 00 → 06 | "Door one. Stocks. Hour zero to hour six." | |
| 5b | **N** Sunday-night world map, Asia exchanges light up, NYSE stays dark | "isn't fully dark … Asian exchanges open while America sleeps" | |
| 5c | **E** Futures chip (FUTURES · bet) over the NYSE; a pawn trader at a desk | "Futures, which are bets…" | |
| 6a | **B** S&P ladder drawn as paper stairs: −7% / −13% / −20% | "falls seven percent" | each stair on its number |
| 6b | **E** 15:00 timer ring ×2, then a red STOP sign for the day | "fifteen minutes … over for the day" | |
| 6c | **D** Source chip: SEC / Nasdaq rule | "written down in advance" | |
| 6d | **E** Clock 3:25 PM, grey-out after it; "1×" badge | "before three twenty-five … only once a day" | |
| 7 | **B** Small cards of single stocks freezing one by one (snowflake icon), band 5/10/20 | "Individual stocks have their own pauses" | "runs out of patience" → hourglass |
| 8 | **E** Calendar: March 2020, four red marks | "four times in a matter of days" | ◐ confirm F3 |
| 9a | **C** YARDSTICK stamp 9/11; Prelinger-style NYC street footage or a framed print of the closed exchange (PD only) | "September eleventh, two thousand one." | no 9/11 imagery of the event itself |
| 9b | **E** Calendar: Sep 11 → Sep 17, four crossed days | "closed for four days" | |
| 9c | **E** Counter −684 on a paper Dow bar, −7% | "six hundred eighty-four points" | |
| 10a | **A** Jake's retirement app: $10,000 → −$700 (paper) | "seven hundred dollars. On paper." | |
| 10b | **E** Sell? button not pressed | "It only becomes real if he sells." | |
| 10c | **B** The three paper rules (brakes) line up | "the machinery … built before the panic" | → door 2 |

## Part03 · DOOR 2 gas (paras 10–13)
| # | Shot | VO cue | Notes |
|---|---|---|---|
| 11a | **B** Door ② opens, CLOCK 06 → 12 | "Door two. Oil and the pump." | |
| 11b | **N** Gulf map: Hormuz glow, tankers sail in a line | "twenty million barrels … every day" | |
| 11c | **E** Pie: 1/5 of the world | "Roughly a fifth" | |
| 11d | **B** Tanker pawns pause at the strait, "?" over each | "Do we still go?" | |
| 12a | **N** World map: arrows from Hormuz to Asia (84%) | "Most of that oil heads to Asia." | |
| 12b | **E** One world price tag on a globe; pump slice 51% crude | "one world market … more than half" | |
| 13a | **C** YARDSTICK stamp 2019; desert map + Abqaiq pin (no explosion imagery) | "A Saturday in September, twenty nineteen." | |
| 13b | **E** Counter 5.7M barrels/day; Brent bar +14.6% | "five point seven … fourteen point six" | |
| 13c | **B** "1 plant" → "whole region" zoom out | "That was one plant." | |
| 14a | **E** Barrel $1 → 2.4¢ drop into a gallon jug | "One dollar … two point four cents" | |
| 14b | **A** Jake's tank: $62.30 → +$3.60 → +$7.20 → $69.50 | "three dollars sixty … sixty-nine fifty" | wallet-style tank chip |
| 15 | **E** Rocket up fast, feather down slow, two lines | "like a rocket … like a feather" | |
| 16 | **E** SPR caverns icon: 172M out, below 300M | "a hundred seventy-two million … lowest since nineteen eighty-three" | ◐ F13 |

## Part04 · DOOR 3 bank (paras 14–16)
| # | Shot | VO cue | Notes |
|---|---|---|---|
| 17a | **B** Door ③ opens, CLOCK 12 → 24 | "Door three. Your bank." | |
| 17b | **C** YARDSTICK stamp SVB, phone app icon with withdrawals pouring out | "forty-two billion … in eight hours" | no logo as standalone image; use a generic bank pawn |
| 17c | **E** 8-hour timer ring, bank shrinks by a quarter | "About a quarter of everything" | |
| 17d | **D** DFPI quote card (short) | "social media and phone banking" | |
| 18a | **E** Shield $250K over a pawn + one bank | "per person, per bank, per ownership category" | |
| 18b | **E** Four icons (checking, savings, MMA, CD) get a green tick; stock/bond icons get a grey ✕ | "does not cover stocks or bonds" | ◐ F16 |
| 19a | **N** Sunday calendar 15 Mar 2020, Fed building paper model | "On Sunday, March fifteenth …" | |
| 19b | **E** Rate dial → 0, "$700B" counter | "near zero … seven hundred billion" | |
| 19c | **B** Playbook page flips open | "already in the playbook" | → |

