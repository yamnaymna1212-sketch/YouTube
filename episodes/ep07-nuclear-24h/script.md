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

Real-material plan, mix check and Jake-door shots: see the v1 tables kept in git history (`893eece`) — the doors are unchanged.
