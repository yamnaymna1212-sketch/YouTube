# EP07 · script v1 (9 Nov 2026) · target ≈ 8:30

**Title:** The World After a Nuclear Strike: The First 24 Hours (money version)
**Alt titles:** "If a Nuclear Weapon Hit the Gulf Tonight, What Happens to Your Money by Monday?" · "WHAT IF: The First 24 Hours After a Nuclear Strike (Stocks, Gas, Your Bank)"
**Channel:** Dollarly · "Your Money. Decoded."
**Hook:** money and the clock in second 0: "Sunday, six p.m. … The first markets on Earth are about to open." The clock is on screen from frame 1.
**Frame:** labelled WHAT IF (every frame). Yardsticks from four real days. Neutral, no prediction.
**Length:** VO 1,316 words ≈ 8:30 after pause cuts. (Skill target 1,500–1,700: if the user wants 9:30, add a Door 3 shot about "why a bank run today is an app, not a line" and a Jake-checks-his-phone beat.)
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
| Hook | 1–4 | 0:00 | Sunday 6 p.m. clock → what-if → "three doors + one clock" → Jake's 3 questions |
| Part02 | 5–9 | 0:55 | DOOR 1 stocks: futures + Asia, circuit breakers 7/13/20, single-stock pauses, 9/11 yardstick, Jake −$700 on paper |
| Part03 | 10–13 | 2:35 | DOOR 2 gas: Hormuz 20M b/d, one world price, Abqaiq yardstick, $1 = 2.4¢, SPR |
| Part04 | 14–16 | 4:25 | DOOR 3 bank: SVB $42B/8 h, FDIC $250K, Fed Sunday move |
| Part05 | 17–19 | 5:45 | Maya / Luis / Walter · the whole day on one clock · three things worth knowing |
| Part06 | 20–25 | 7:15 | Close: back to Sunday 6 p.m., disclaimer, end card |

## Hook (paras 1–4)
| # | Shot | VO cue | Notes |
|---|---|---|---|
| 1a | **N** Night map of the Gulf (paper world), red WHAT IF tag, CLOCK shows SUN 6:00 PM, HOUR 00 | "Sunday, six p.m. Eastern." | clock hand sweeps in; something moving every 1 s (pulsing glow, tanker dots idle) |
| 1b | **A** Jake's phone lights up on the sofa → fly into screen | "Nothing has happened to you yet." | → |
| 1c | **B** Locked doors: NYSE columns + bank door + pump (3 icons), padlocks | "The banks are closed. Wall Street is closed." | one lock per word |
| 1d | **N** Tokyo + futures pins glow on the map, one by one | "the first markets on Earth are about to open." | |
| 1e | **E** Paper tiles on the clock: GAS · SAVINGS · 401(k) slide into Monday 9:30 | "your gas, your savings, and your retirement account" | each tile on its word |
| 1f | **B** Clock face runs 24 h in 2 s, 24 ticks | "the first day. Hour by hour." | |
| 2a | **D** Big stamp WHAT IF | "It is a what-if." | |
| 2b | **E** "?" over a price tag, crossed out | "we will not guess a number" | |
| 2c | **B** Four yardstick cards fan out: 9/11 · 2019 oil plant · 2023 bank run · Mar 2020 Sunday | "September eleventh … Sunday night in March, twenty twenty" | one card per word |
| 2d | **B** All four slide into one tall ruler | "test all of them in a single day" | → |
| 3 | **B** Three doors rise on Pennsylvania Avenue (STOCKS · GAS · BANK) + clock | "Three doors … Let's start it." | |
| 4a | **A** Jake apartment, phone, tank icon, retirement app icon (ILLUSTRATIVE) | "Meet Jake. Twenty-six…" | |
| 4b | **A** three speech bubbles, one icon each (chart / pump / lock) | "market … pump … money safe?" | → fly into door 1 |

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

## Part05 · people, the clock, three things (paras 17–19)
| # | Shot | VO cue | Notes |
|---|---|---|---|
| 20a | **A** Maya in her car (ILLUSTRATIVE), twice-size tank icon | "Maya drives forty miles each way" | |
| 20b | **A** Luis + diesel van, $6+ chip, groceries shelf | "Luis drives a diesel delivery van" | |
| 20c | **A** Walter at a kitchen table, grocery bill + quarterly statement | "Walter is retired" | |
| 21a | **B** The CLOCK full-screen, four stops (Sun 6 PM / Mon 9:30 AM / Mon all day / Mon 6 PM) | "So here is the whole day, on one clock." | each stop on its words |
| 21b | **E** Two lines: panic spikes (fast), prices drift (slow) | "Panic is fast. Prices are slow." | |
| 22a | **E** Three paper cards 1-2-3 with icons: shield, hourglass, pump | "Three things worth knowing" | |
| 22b | **A** Jake nods | "Rockets up, feathers down." | |

## Part06 · close (paras 20–25)
| # | Shot | VO cue | Notes |
|---|---|---|---|
| 23a | **N** Back to the opening night map, clock 6:00 PM | "Back to Sunday, six p.m." | callback |
| 23b | **B** Four yardstick cards stack into a wall, one gap | "Each of those days tested one piece" | |
| 23c | **E** WHAT IF tag lands | "That is why this is a what-if" | |
| 24 | **D** Disclaimer card (once) | "education only… not financial advice" | |
| 25a | **D** End card: Dollarly logo, "Your Money. Decoded." | "Your money. Decoded." | held 2 s |
| 25b | **D** Two end-screen slots: EP03 Iran + subscribe | "watch our Iran video next" | |

## Real-material plan (≤ 10%)
- Prelinger / National Archives PD footage of the stock-exchange floor or Wall Street (framed print / on Jake's TV), only for the 9/11 yardstick as a *calendar* beat (no event imagery).
- NASA night photos of the Gulf (PD) for the opening map; Natural Earth for maps.
- Fed building / FDIC pages as screenshots of official sites (chip only).
- No news-channel footage, no company logos as standalone images.

## Mix check (target 70/20/10)
Explainer shots (B/E/N/D) ≈ 72% · Jake and illustrative people (A) ≈ 20% · real material (C) ≈ 8%.
