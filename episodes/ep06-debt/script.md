# EP06 · script v1 (8 Nov 2026) · target ≈ 9:45

**Title:** America Just Hit $40 Trillion in Debt. Here's What It Does to Your Dollar.
**Alt titles:** "$40 Trillion. No, the Dollar Isn't Collapsing. Here's What Is." · "America Pays $33,000 a Second in Interest. Who Gets the Bill?"
**Channel:** Dollarly · "Your Money. Decoded."
**Hook:** #1 from `hooks.md` ("Thirty-three thousand dollars. … Every second."): the money is in second 0, the counter is on screen from frame 1. Counter-positioned against the "collapse" titles (PENNY 1.15M opens on $500/s; every other top result says collapse/breaking).
**Frame:** a real, fresh number ($40.556T on 5 Nov; passed $40T on 18 Aug) + one honest question: what does it do to *you*? Spine = three doors (taxes & services · loans · the dollar). Neutral: both sides, "tends to", CBO = projection not prediction. Refs [Rx] → `research.md` (all ✔ primary).
**Length:** VO 1,733 words ≈ 9:40 after `dollarly_tts.py` (pauses cut) or ≈ 9:45 with ElevenLabs.
**Voice:** default = local Kokoro `am_michael` (`references/pipeline.md` §VO). If the user sends their own ElevenLabs take → `tighten_vo.py` + faster-whisper → `studio/src/ep06/cues.json` via `studio/tools/episode_cues.py`.
**Style:** `style/BRAND-v5-dollarly.md`. Mix ≈ 70% paper explainer / 20% Jake story / ≤ 10% real. Something new every 1–1.5 s. ≤ 5 words on screen (+ source chip). Rich world (skyline, floor, walking pawns, Jake reacting). Music ambient 0.07; SFX tick/type/counter/paper ≤ 0.1.
**Running devices:**
- **THE METER** (top-right chip, replaces the wallet chip): a paper odometer in amber that counts **$33,350 / second** from frame 1; it keeps ticking whenever it is on screen and *jumps* when a door adds to it. Hook, interest chapter and the last line all return to it.
- **THE THREE DOORS** (EP04 `Door`): paper doors on Pennsylvania Avenue: ① Taxes ② Loans ③ Dollar. One opens per chapter; the camera flies through it.
- **ILLUSTRATIVE tag** on Jake / Maya / Walter every time they appear.
Legend: **A** Jake story · **B** paper stage/map explainer · **N** night map · **C** real photo/footage (framed print or on Jake's TV) · **D** document/quote card · **E** data/maths. **→** links to next shot. 🔁 open loop.

## Parts (paragraph runs) · est. start times (will be replaced by `cues.json`)
| Part | Paragraphs | Est. start | Content |
|---|---|---|---|
| Hook | 1–4 | 0:00 | $33K/s → $40T → "it isn't collapsing" → promise |
| Part02 | 5–6 | 0:49 | What $40T is (public vs intragov; 97% of GDP) |
| Part03 | 7–10 | 1:42 | Interest: $2.9B/day, > defense, CBO $2.1T |
| Part04 | 11–15 | 2:42 | Three doors + DOOR 1 taxes & services |
| Part05 | 16–20 | 3:43 | DOOR 2 loans (mortgage 6.22→7.18, Maya +$223) |
| Part06 | 21–25 | 5:19 | DOOR 3a the dollar: reserve share, who buys |
| Part07 | 26–28 | 6:38 | DOOR 3b Moody's, "will it break?", quiet inflation |
| Part08 | 29–32 | 7:21 | Jake / Maya / Walter + the calendar |
| Part09 | 33–36 | 8:28 | Three things to do |
| Part10 | 37–39 | 9:08 | $33K/s payoff, disclaimer, end card |

---

## HOOK · paragraphs 1–4 (0:00–0:49)
| # | Shot | VO |
|---|---|---|
| 1 | E · Frame 1 is already moving: giant amber odometer fills the screen **$33,350** ticking up, a stopwatch ring sweeping 1 s (counter tick). Camera pulls back: the odometer sits on a paper pedestal on Pennsylvania Avenue at night, Capitol far behind. Source chip "U.S. Treasury MTS, FY2026" [R4] | Thirty-three thousand dollars. That's what America pays in interest. Every second. |
| 2 | B · The odometer's digits spill upward and stack into a paper tower of $100 SPECIMEN bills (uscurrency.gov) that rises past the skyline; counter flips to **$40.5T** | Forty trillion dollars in debt. On August eighteenth, the United States passed that number for the first time in history, |
| 3 | E · Calendar flips to **AUG 18, 2026** with a red circle; Fiscal Data screenshot print (real, 1.2 s) "Total Public Debt $40,047,425,768,420" [R1][R2] → digits tick up to **$40.556T** (5 Nov) | and right now it's already more than forty point five. |
| 4 | B · 340 tiny paper pawns pour onto the stage and line up; one steps forward with a **$119K** tag; the whole crowd flashes the tag [R13] | That's about a hundred and nineteen thousand dollars for every American. |
| 5 | D · Newspaper-style paper headlines slide in one by one with the same red stamp: "COLLAPSE" · "BREAKING" · "CRISIS" (3 words, generic, no outlet names) | The headlines say the dollar is about to collapse. |
| 6 | B · A big paper hand stamps **NOT COLLAPSING** (green-gray, calm) over the headlines; the $ coin on the stage stands still; the odometer keeps ticking in the corner | It isn't. |
| 7 | A · Jake's apartment, TV on. Camera pushes into the TV. His phone shows the mortgage app: payment **$2,148 → $2,371**, a red crack runs across the screen 🔁 [R11] | But there's a bill hidden inside that number, and it's already in your mortgage. |
| 8 | B · (para 3) The tower of bills steps up by one trillion: calendar riffles MAR → AUG, a $1T block slams on; a **$200B / month** chip pops on a paper clock; Jake at the grocery bag + gas pump behind | That's one trillion dollars added in about five months. Around two hundred billion dollars a month. While you were paying rent, buying groceries, and filling your tank. |
| 9 | A→B · (para 4) Jake looks at the camera (think); three icon badges swap in one slot on the words: wallet → bank → dollar bill; **THE THREE DOORS** silhouette flashes on the horizon 🔁 | So what does a number like that actually do to you? Not to Washington. To you. To your paycheck, your loans, and the dollar in your wallet. |
| 10 | D · Title card "THE BILL INSIDE THE NUMBER" (Barlow red kicker, serif title) over the odometer → slide into the next part | Stay with me, because the real story is not the big number. It's the bill that comes with it. |

## PART 02 · WHAT $40 TRILLION MEANS · paragraphs 5–6 (0:49–1:42)
| # | Shot | VO |
|---|---|---|
| 11 | B · Giant paper piggy-bank "I.O.U." labelled **DEBT** on the stage; a paper IOU slip prints out of it per word; Jake reads one | Let's start with what forty trillion means. The national debt is every dollar the government has borrowed and not yet paid back. |
| 12 | B · The piggy cracks into two paper blocks on a see-saw scale: big **$32.8T** (investors) and small **$7.8T** (government itself). Icons swap on the words: person → bank → pension fund → flag [R1] | Part of it, nearly thirty-three trillion, is owed to investors: people, banks, pension funds, and other countries. |
| 13 | B · The small block opens: a Social Security trust-fund ledger inside; arrow loops back into the government building [R1] | The rest, about seven point eight trillion, is owed to other parts of the government itself, like the Social Security trust funds. |
| 14 | E · Paper bar "everything America produces in a year" (GDP) fills to a line; the investor block slides next to it and fills **97%**; source chip "FRED / Treasury, Q2 2026" [R6] | Compared to the size of the economy, the debt owed to investors is now about ninety-seven percent of everything America produces in a year. |
| 15 | E · The government's own block drops on top; bar rises past the line to **121%** [R6] | And if you count the debt the government owes to itself, it's over a hundred and twenty. |
| 16 | D · Equal-weight split card: "CAN CARRY IT" ↔ "LOOKS FINE… UNTIL" (2 pawns, each on a pan of a balanced scale) | Economists disagree about how dangerous that is. Some say a country that borrows in its own currency can carry this for a very long time. Others say it's the quiet kind of problem that looks fine, right up until it doesn't. |
| 17 | B · Scale tips to a calm middle; both pawns point at one icon: a small coin-eating meter **↑** | Both sides agree on one thing. The cost of carrying it is going up. |

## PART 03 · INTEREST · paragraphs 7–10 (1:42–2:42)
| # | Shot | VO |
|---|---|---|
| 18 | D · Chapter card "THE NUMBER THAT MATTERS" → odometer re-enters, bigger, **INTEREST** kicker 🔁 | And that brings us to the number that matters most. Interest. |
| 19 | B · A paper family at a kitchen table with a credit-card statement beside a pawn "UNCLE SAM" with his own statement (mirror shot) | Every borrower pays interest, and so does the government. |
| 20 | E · Counter rolls to **$1.052T** (FY2026), stamp "NET INTEREST"; 1.052T slides left; the year chart ticks back: 2025 **$970B** ghost behind [R4] | This year, the United States paid about one point zero five trillion dollars in net interest. |
| 21 | E · Paper calendar page with the trillion divided by 365: tiles fall, a day tile reads **$2.9B**; then the page is sliced into 340M pawns: one pawn lights **$3,000** [R4][R13] | That's roughly two point nine billion dollars every single day. Spread across every American, about three thousand dollars each, just for the interest. |
| 22 | E · Back to the hook odometer: **$33,350/s** ticks; a 30-second stopwatch ring sweeps and a **+$1M** bill stack pops each lap (×3 laps, tick SFX) [R4] | That's the thirty-three thousand dollars a second from the start. Every thirty seconds, another million. |
| 23 | B · Scale shot: left pan **INTEREST $1,052B** (a tall stack of bills) vs right pan **DEFENSE $965B** (a paper tank + jet); the interest side drops with a thud and a +$86B chip [R4] | Here's the part that surprises people. That is more than the government spent on national defense this year, which was about nine hundred sixty-five billion. |
| 24 | B · Paper federal-budget pie ("14%" slice lifts out, labelled with a single coin icon); a "PROGRAM? AGENCY?" row of icons gets crossed ✗ ✗, then the slice stamps **YESTERDAY'S LOANS** | Interest is now one of the biggest line items in the entire federal budget. Not a program. Not an agency. Just the cost of yesterday's borrowing. |
| 25 | D · "CBO" paper office; bar chart 2026 **$1.0T** → 2036 **$2.1T** grows on the words; a clear tag "PROJECTION · CURRENT LAW" and a small dotted fork "LAWS CAN CHANGE" [R5] | The Congressional Budget Office, which is the nonpartisan scorekeeper for Congress, projects that bill could roughly double, to about two point one trillion dollars a year by twenty thirty-six, if nothing changes. |
| 26 | B · The dotted fork appears as two roads from the same crossroads (paper road, signpost) | That is a projection under current law. It's not a prediction. Laws can change. But it shows you where the road goes. |

## PART 04 · THE THREE DOORS + DOOR 1 · paragraphs 11–15 (2:42–3:43)
| # | Shot | VO |
|---|---|---|
| 27 | B · The odometer's coins pour down a paper pipe into the street; three doors rise on Pennsylvania Avenue: **1 · 2 · 3** (spring, each a different color); Jake looks up (surprise) | So let's follow that money into your life. Three doors. |
| 28 | → Camera flies into door ① → chapter card "DOOR ONE · Taxes & Services" | Door number one. Your taxes and your services. |
| 29 | B · A paper kitchen table: a monthly budget envelope; a credit-card statement with "MINIMUM" circled in amber sits first in line; remaining coins slide to a small "EVERYTHING ELSE" pile | Think of the federal budget like a household. Interest is like the minimum payment on a credit card. You have to pay it first. Whatever is left is what you can spend on everything else. |
| 30 | B · The minimum-payment pile grows; the "everything else" pile shrinks; then a three-way fork lights up with icon badges on the words: tax coin ↑ → services ↓ → "borrow more" loop arrow (the loop makes the minimum payment tile bigger) [R14] | When that minimum payment grows, one of three things has to give. Taxes go up. Spending on things people use goes down. Or the government borrows even more to make the payment, which makes the next payment bigger. |
| 31 | D · Two paper pawns on opposite podiums, labels "CUT SPENDING" / "RAISE REVENUE" (neutral colors); a third pawn walks between them holding "BOTH" ; clock icon ticks | Nobody in Washington agrees on which of those three should happen. One side says the answer is to cut spending. The other says the answer is to raise revenue. Most budget experts say it will take some of both, and that every year of waiting makes the choice harder. |
| 32 | E · Gap chart: revenue bar **$5.40T** vs outlays bar **$7.40T**, the gap glows **$1.99T** (deficit); growth arrows: revenue ▲3%, spending ▲5.5%, interest ▲8% (interest arrow is the tallest) [R3][R4] | This year, the deficit, the gap between what the government spent and what it collected, was about two trillion dollars. Revenue grew about three percent. Spending grew about five and a half. And interest grew faster than that, about eight percent. |
| 33 | → The interest arrow punches through the door's top and lands on a second door's handle 🔁 | (link, no VO: 0.6 s) |

## PART 05 · DOOR 2 · LOANS · paragraphs 16–20 (3:43–5:19)
| # | Shot | VO |
|---|---|---|
| 34 | → Camera flies into door ② → chapter card "DOOR TWO · Your Loans" | Door number two. Your loans. |
| 35 | B · A paper Treasury building with a vending slot "BONDS"; a bond certificate slides out with a rate tag; the tag becomes a **floor** line across the stage; icon badges swap on the words: house → car → briefcase → credit card [R11] | When the government borrows, it sells Treasury bonds. The interest rate on those bonds becomes a kind of floor for almost every other rate in the economy. Mortgages. Car loans. Business loans. Even many credit cards follow the same direction, just with a much bigger markup. |
| 36 | E · Two paper thermometers, then lines draw side by side: mortgage **6.22% → 7.18%** and 10-year **4.11% → 4.84%** (Nov 2025 → Nov 2026); source chips "Freddie Mac / FRED" [R11] | Here's the proof. A year ago, the thirty-year mortgage rate was about six point two percent. This week it's seven point one eight, according to Freddie Mac. The government's own ten-year borrowing rate moved the same direction, from about four point one percent to about four point eight. |
| 37 | B · An investor pawn holds two envelopes: one stamped "U.S. GOVERNMENT" (higher rate bonus coins) and one "YOU" (fewer coins); he picks the first; then the "YOU" envelope grows a coin to match [R11] | Why? Because if an investor can lend to the U.S. government and be paid, there's no reason to lend to you for less. So when the government has to offer higher rates to keep selling its debt, everyone else tends to pay higher rates too. |
| 38 | A · Jake's phone: the ILLUSTRATIVE Maya (his friend) texts a listing "$350,000 · first home"; the house icon with a big paper price tag; Jake's phone shows his car-loan app | This is the way the national debt can reach Jake's life. Not as a headline. As a monthly payment. If he's shopping for a car, or Maya is shopping for her first home, the price of money, not just the price of the car or the house, decides what they can afford. |
| 39 | E · Split calculator on paper (ILLUSTRATIVE · $350,000 · 30 yr · P&I): left **6.22% → $2,148**, right **7.18% → $2,371** (digits roll), a big amber **+$223 / month** slams between them and a yearly tag **+$2,674** [R11] | Take a three hundred fifty thousand dollar mortgage. At six point two percent, the monthly payment is about twenty-one hundred and fifty dollars. At seven point two, it's about twenty-three seventy. That's over two hundred twenty dollars more, every month, for the same house. |
| 40 | A · Maya at the kitchen table with her phone calculator, the "+$223" tag on the screen; she looks at the camera (doubt) | (hold: 1 s) |
| 41 | D · Equal-weight card "DEBT" is one of four gears on a paper machine: FED · INFLATION · ECONOMY · DEBT; the DEBT gear turns the others a little; sourced ticker "CBO / Fed" none (no number) | To be fair, the debt is not the only thing that moves rates. The Federal Reserve matters. Inflation matters. The strength of the economy matters. Economists argue about how much of today's rates come from the debt itself. But almost nobody argues that borrowing this much has no effect. |
| 42 | → The DEBT gear rolls to the street and bumps door ③ open 🔁 | (link, 0.6 s) |

## PART 06 · DOOR 3A · THE DOLLAR · paragraphs 21–25 (5:19–6:38)
| # | Shot | VO |
|---|---|---|
| 43 | → Camera flies into door ③ → chapter card "DOOR THREE · The Dollar" | Door number three. The dollar itself. |
| 44 | B · Paper newsstand with "COLLAPSE" headlines; Jake reads one, then a paper magnifying glass slides over it labelled **EVIDENCE** | Here's where the scary headlines go too far, so let's be careful and stick to the evidence. |
| 45 | E · Paper globe with 100 dots; **56.7** dots turn green-gray "USD", **20.6** blue "EUR", the rest small; source chip "IMF COFER, Q2 2026" [R8] | The dollar is still the world's main reserve currency. According to the International Monetary Fund, it makes up about fifty-seven percent of the foreign currency reserves that countries hold. The euro is next, at about twenty-one percent. No other currency is close. |
| 46 | E · Two lines on a paper chart: the Fed broad dollar index Nov 2025 **121.9** and Oct 2026 **121.7** nearly overlap; a small pin "Jan 2025: 129.9" on the left [R9] | Against a broad basket of other currencies, the Federal Reserve's own index shows the dollar is about where it was a year ago. |
| 47 | N · Night map with flags (flag-icons): JAPAN **$1.07T**, UK **$1.01T**, CHINA **$591B**; glowing routes into Washington; amounts count up on the words [R10] | And foreign investors are still buying American debt. Japan holds more than one trillion dollars of it. The United Kingdom holds about one trillion. China holds about five hundred ninety billion, |
| 48 | E · China's route thins; ghost bar **$700B** (Aug 2025) shrinks to **$591B** with a −$109B chip; a small eye icon "WATCH" pops [R10] | which is down about a hundred billion from a year ago. That decline is real, and it's worth watching. |
| 49 | B · A paper chair labelled "BUYER" empties, but other pawns (UK, Belgium, Canada) sit down; chip **+$199.8B net inflow · AUG 2026**, then a total tile **$9.33T ≈ flat vs 2025** [R10] | But it's not a collapse. Other buyers stepped in. In August alone, foreign investors sent a net inflow of nearly two hundred billion dollars into U.S. securities and banks. Foreign holdings of Treasuries overall are about nine point three trillion, roughly flat from a year ago. |

## PART 07 · DOOR 3B · "WILL IT BREAK?" · paragraphs 26–28 (6:38–7:21)
| # | Shot | VO |
|---|---|---|
| 50 | D · Report-card paper: "U.S. CREDIT" **Aaa → Aa1** (one grade slips with a small drop) dated **MAY 2025**; a "FIRST SINCE 1917" ribbon (real year chip only; no company logo) [R7] | Also, in May of twenty twenty-five, Moody's lowered America's credit rating by one notch, for the first time since nineteen seventeen. |
| 51 | D · Three report-card grade chips: "AA+" "AA+" "Aa1" next to the title "ONE NOTCH BELOW THE TOP" (text only, no logos) [R7] | The other two big agencies, S&P and Fitch, already rate it one notch below the top. Rating agencies have said that a growing debt is the reason to watch. |
| 52 | B · Big paper question mark over the dollar coin; Jake and Walter shrug together (shrug); a clear label "NOBODY CAN SAY" | So will the dollar break? Nobody can honestly tell you that. |
| 53 | B · A "TRUST" pillar made of stacked coins; two things must change: pawn investors leaving, and a bare floor where "OTHER PLACE TO PUT TRILLIONS?" has no building (empty lot on paper) | What we can say is what would have to change. Investors would have to lose trust that the government can manage this. Other countries would have to find a place to put trillions of dollars, and right now there isn't one. |
| 54 | B · A paper anchor drops into a calm sea: a "1940s" tag on the anchor; the coin sits steady; the odometer ticks steadily in the corner [R8] | That's why the dollar's role is both strong and slow-moving. It's a habit the world has had since the nineteen forties, and habits don't end overnight. |
| 55 | A · Jake at the grocery store, a receipt prints longer; the dollar bill on his shelf slowly "shrinks" 1 % at a time (a subtle scale-down), with a calm label "MORE PRICES, SAME DOLLAR" | What the debt can do, in the meantime, is quieter. Over many years, a government that borrows heavily and a central bank under pressure can make inflation harder to control. Economists disagree about how much. |
| 56 | E · The receipt ticker beside a price tag "$5 → $5.40"; the bill's face stays the same: tag "DOLLAR NEVER BREAKS · BUYS LESS" (≤ 5 words) | But if prices stay high, your dollar buys less, even if the dollar never breaks. |

## PART 08 · WHO FEELS IT + THE CALENDAR · paragraphs 29–32 (7:21–8:28)
| # | Shot | VO |
|---|---|---|
| 57 | B · The three doors close behind the camera; three living pawns step forward: Jake, Maya, Walter with an ILLUSTRATIVE stamp | Okay. Who feels this the most? |
| 58 | A · Jake (rent + car loan): small lease paper + car-key; a loan-rate tag ticks up near the key; door ② glow on his side [R11] | Jake pays rent, has a car loan, and a small savings account. For him, door number two matters most: what his next loan costs. |
| 59 | A · Maya at an open-house sign; her payment tile shows +$223; door ② glow brighter; a "can she afford it?" slider moves | Maya wants to buy her first home. Her monthly payment is tied to the same rates, so for her, door two decides if the house is affordable at all. |
| 60 | A · Walter on a porch with a paper newspaper and a bond certificate; a coin tag "higher rate = more pay" slides in; he nods (smile) | And Walter is retired. He keeps part of his savings in Treasury bonds, so higher rates actually pay him more. |
| 61 | B · The three pawns stand in a row; three different outcome tiles rise in three colors (−, −, +); the ILLUSTRATIVE stamp stays | Same debt. Three very different outcomes. These are illustrative people, not real ones. |
| 62 | D · Three keyword badges: borrow · save · own, each pulses on its word; the line splits the audience into 3 paths | That's the thing about debt. It isn't one story. It's a different story depending on whether you borrow, save, or own. |
| 63 | B · Paper calendar on a wall; a circle on **NOV 18** (TIC badge: "who buys debt"), then **DEC 11** with a red outline and a stamp "FUNDING ENDS" ; a daily tick for "debt number" and a monthly row for "budget report" [R10][R12] | Now, what's coming? There's no single date when the debt gets settled. But there is a calendar of moments that matter. The current government funding runs out on December eleventh, and Congress has to decide what happens next. On November eighteenth, the Treasury releases new data on who is buying American debt. |
| 64 | B · The Fiscal Data print (real, 1 s) with the daily debt number flickering; then a monthly paper report folds out; then an arrow rising on the odometer; the word "WATCH" stamps | Every business day, the Treasury publishes the new debt number. Every month, the budget office tells us if the deficit is shrinking or growing. And every year, interest takes a bigger bite unless something changes. Watch those. |

## PART 09 · THREE THINGS · paragraphs 33–36 (8:28–9:08)
| # | Shot | VO |
|---|---|---|
| 65 | B · Jake's desk, three paper checklist cards drop on the table: **1 · 2 · 3** (spring, one after another) | So, three things you can do. Not predictions. Just sensible moves. |
| 66 | A · Card 1: Jake's credit-card statement; a red variable-rate tag; he pays it down: the balance drops, a green check, a small "interest saved" coin rings back into his wallet | One. Look at your own debt. If you have a variable rate, on a credit card or a loan, that's the one that follows rates up. Paying it down saves you interest for certain, which no market can promise. |
| 67 | A · Card 2: Jake at his laptop; two bank cards on screen "low rate" vs "high rate" slide side by side, a small coin tag shows the difference; he picks the higher one | Two. If you save, make your cash work. Savings accounts and Treasury securities pay more when rates are higher. Compare what your money earns to what's available. A few minutes can be worth real dollars over a year. |
| 68 | A · Card 3: Jake's phone showing a flashing red "DOLLAR COLLAPSE" headline; he puts the phone face down; a paper budget notebook, an emergency-fund jar and a steady line chart rise instead | Three. Don't panic and don't gamble. Dramatic predictions are almost impossible to time. Boring habits, a budget, an emergency fund, and steady investing, beat dramatic bets almost every time. |

## PART 10 · CLOSE · paragraphs 37–39 (9:08–9:41+)
| # | Shot | VO |
|---|---|---|
| 69 | E · The hook odometer returns full screen, **$33,350** ticking; the Capitol behind it lights up; Jake stands next to it; the counter keeps ticking through the whole paragraph | One last number. Thirty-three thousand dollars a second. That's the price of the national debt, and it's paid every second whether anyone is watching or not. |
| 70 | B · The three doors in a row; a ballot box icon + a Capitol icon appear over them with the line "WHO PAYS · AND WHEN" (≤ 5 words) | The question is not whether the bill comes. It's who pays it, and when. That's a decision for voters and for Congress, and it will shape your finances for years. |
| 71 | D · Plain paper disclaimer card: "EDUCATIONAL ONLY · NOT FINANCIAL ADVICE" (on screen, 3 s, over the end of para 37 + start of the end card). **Not spoken** (user decision 8 Nov: the take is used as recorded) | — |
| 72 | D · End card: Dollarly logo tab + "Your Money. Decoded." + next-video slot (EP05) + subscribe pawn; odometer still ticking small in the corner | If this helped you understand where your money really goes, subscribe to Dollarly. Your money. Decoded. See you in the next one. |

---

## Mix check
~70% explainer (paper stage, charts, maths) · ~22% Jake/Maya/Walter living the story (hook shot 7, Part 05 phone/Maya, Part 07 grocery, Part 08, Part 09) · ≈ 8% real (Fiscal Data print ×2, flag icons, SPECIMEN notes). No AI faces, no company/news logos, no news-channel footage, no outlet names on the headline cards.

## Real-material plan (all licensed; credit on screen + `LICENSES.md`)
- Treasury **Debt to the Penny** screenshot (U.S. government work) for shots 3 and 64.
- **uscurrency.gov SPECIMEN** $100 notes (paper tower, hook).
- **flag-icons** (MIT): Japan, UK, China, Belgium, Canada.
- **Natural Earth / us-atlas** maps (public domain).
- Capitol / White House skyline from the existing paper world (`studio/src/ep03/PaperWorld.tsx`).
- All charts (mortgage, 10-yr, dollar index, TIC holders) are **redrawn** in paper style with a source chip (FRED / Freddie Mac / IMF / Treasury). No third-party chart images.

## Blockers / checks before VO
1. Re-read the Fiscal Data API the day of the VO (VO says "more than forty point five": true until the debt passes $40.6T, roughly 1–2 weeks at the current pace; after that change to "more than forty point six").
2. Mortgage line uses 7.18% (week of 5 Nov). If Freddie Mac prints a new weekly number before upload, change to the new one and recompute Maya's +$223 in shot 39.
3. Dec 11 and Nov 18 dates: re-check on upload day.
4. Voice: Kokoro (default) or ElevenLabs (user's own account only).
