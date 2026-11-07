# EP04 · script v2 (7 Nov 2026) · target 9–10 min

**Title:** Trump Just Lost Congress. 3 Things Happen to Your Money.
**Channel:** Dollarly · "Your Money. Decoded."
**Frame:** real, fresh news (3 Nov 2026 midterms) + three "doors" a viewer can act on. Every claim sourced in `research.md` (refs in [brackets]). Neutral: both sides stated, "could happen" and "who decides", never a prediction.
**Length:** VO ≈1,600 words (hook v2) ≈ 9:00 at 180 wpm (tight take) + ≈ 20 s silent beats ≈ **9:20**. Good for the 9–10 min target; a long first take can be tightened with `tighten_vo.py`.
**Voice:** the user generates it in their own ElevenLabs account (voice "Flint", eleven_v4). Paste `vo-clean.txt`. I do not generate audio.
**Style:** `style/STYLE-v4-paperworld.md`: one idea per screen, giant type for TV, map first, Lucide icons in badges, real flags and photos, a source line on every shot, every scene linked to the next. Sound: tick/type/counter/paper only (max 0.1) + calm dark ambient music. Pauses via `tighten_vo.py`; cuts on spoken words (`wordT()`).
Legend: **A** Jake/paper story · **B** map explainer · **C** real photo/footage · **D** document card · **E** data. **→** links into the next shot.

---

## vo_00 · HOOK v2 (0:00–0:32) · built: `studio/src/ep04/Hook.tsx` (EP04Hook) · mix: story → explainer → story → explainer
| # | Shot | VO |
|---|---|---|
| 1 | STORY · Jake's apartment at night, DEC 11 circled on the wall calendar. Camera pulls back from his TV: night map "December 11, 2026 / The money runs out", clock 11:59:5x → 12:00 "FUNDING LAPSES". Jake thinks, then startles. TV cuts to the archive Capitol dome (the only real shot) and the camera dives into the TV. | Friday, December eleventh. At midnight, the money that keeps the federal government running runs out. |
| 2 | EXPLAINER · paper US map, grey route arcs, red pawns hop into Washington; House/Senate seat charts; at "lost" they flip blue, pawns go grey, stamp MAJORITY LOST; card "Majority until Jan 3" | And the party that has to fix it just lost its majority. |
| 3 | EXPLAINER · "2026 / 3 November 2026", big House and Senate seat charts fill blue, pawn "Trump · 2026" hops in the middle | On November third, voters handed Congress to the Democrats. |
| 4 | STORY · back to Jake: he switches the TV off ("Who won? Not the point."), bills on the table (RENT · CAR · PHONE), phone buzz from Dana (illustrative): "If they shut down on Dec 11, I don't get paid." → card "WHAT DOES THIS DO TO MY MONEY?" | Jake doesn't care who won. He cares about one question. What does this do to my money? |
| 5 | EXPLAINER · paper stage White House ↔ Capitol on Pennsylvania Avenue; three doors rise on the words; Jake stands at the side and points | Because Congress decides three things that hit your wallet. Whether the government stays open. What some things cost at the store. And who pays for the war. |
| 6 | Door 1 swings open → camera flies through → CHAPTER "Door one · The Shutdown Clock" | Three doors. Let's open them, in the order they hit. |

## vo_01 · NOTHING CHANGES TOMORROW (0:40–1:25)
| # | Shot | VO |
|---|---|---|
| 5 | D · Calendar slides to 3 JAN; two pawns, "OLD CONGRESS" in the chair [A3] | First, a reality check. Nothing changes tomorrow. The new Congress doesn't take office until January third. Until then, the old one is still in charge. |
| 6 | B · Pawn "THE PRESIDENT" with a veto pen (paper) [A5] | And the president is still the president, with a veto pen. |
| 6b | B · Three paper stamps in a row: HOUSE → SENATE → PRESIDENT; a red veto rejects and "⅔ + ⅔" appears [A5] | Here's how it works, in sixty seconds. For anything to become law, three things have to happen. The House passes it. The Senate passes it. And the president signs it. If the president says no, a veto, then it takes two-thirds of both chambers to override. That almost never happens. |
| 7 | D · Constitution card, Art. I §9 line highlighted: "No Money shall be drawn from the Treasury, but in Consequence of Appropriations made by Law" [A4] | So what did Democrats actually win? Mostly, one thing. The power of the purse. The Constitution says no money leaves the Treasury unless Congress passes a law for it. |
| 8 | E · Bill stack "EVERY DOLLAR" → both chambers stamp → door 1 lights up 🔁 | Every dollar. Which means that from January, no spending bill passes without them. And the president can't spend what Congress won't fund. That's why the first date matters. |

## vo_02 · DOOR 1 · THE SHUTDOWN CLOCK (1:25–3:35)
| # | Shot | VO |
|---|---|---|
| 9 | A · Door 1 opens: a ticking paper calendar, 11 DEC | Door one. The shutdown clock. |
| 10 | D · Card "H.R. 6500 · P.L. 119-103 · through 11 DEC" [B1] + "Senate 90–6 · House 370–48" [B2] | Right now, the government is running on a stopgap bill. Congress passed it in September, with big bipartisan votes. It keeps spending about where it was last year. And it expires on December eleventh. |
| 11 | B · Federal buildings go grey, one by one → tape over a gate | If Congress doesn't pass a new bill, or another stopgap, by then, funding lapses. Parts of the government close. |
| 12 | E · Counter 0 → 43 DAYS, "LONGEST EVER · ended 12 NOV 2025" [B5] | You've seen what that looks like. Last year, the government shut down for forty-three days. The longest in American history. |
| 12b | B · Board of icons: some stay lit (shield, plane, heart, landmark), others go grey (tree/park, file, desk). Chips: "working without pay" [F1] | A shutdown doesn't stop everything. The military keeps working. Air traffic controllers keep working. Social Security and Medicare payments keep going out. But many of those people are working without pay, and the offices that serve the public slow down or close. National parks. Some loan and permit offices. The longer it lasts, the more it spreads. |
| 13 | A · "ILLUSTRATIVE" tag. Dana (paper pawn) at an airport counter, paycheck stub fades to $0 | Meet Dana, Jake's cousin. She's an illustration, not a real person, but her story is real for hundreds of thousands of people. She works for the federal government. During a shutdown, she keeps showing up, or she stays home, and either way, the paycheck stops. |
| 14 | E · "$400M a day (CBO projection)" counter + "≥ $7B lost for good" [B6] + two chips: Employees: back pay ✔ · Contractors: no [B7] | The Congressional Budget Office estimated that furloughed federal workers would be owed about four hundred million dollars in back pay for every day it lasted. Federal employees do get paid back later. Contractors generally don't. And the CBO said at least seven billion dollars of output was lost for good. |
| 15 | B · Two chairs: old Congress sits, new Congress waits outside; calendar 11 DEC vs 3 JAN [A3] | Now here's the part people miss. The people who decide this by December eleventh aren't the new Congress. They're the old one. The party that lost still holds both chambers until January third. |
| 16 | D · "Predicted: another stopgap" quote card, attributed to a House appropriator [B4] | One senior House Republican has already predicted another stopgap, pushing the fight into the new year. |
| 17 | E · 2018 strip: 22 DEC 2018 → 25 JAN 2019, "≈ 5 weeks" [B8] | And we've seen this before. In twenty-eighteen, after Democrats won the House, the government shut down in December and stayed shut for about five weeks, into the new Congress. |
| 18 | B · Three branching paths from 11 DEC: STOPGAP / FULL-YEAR DEAL / SHUTDOWN → on the third, Jake's phone buzzes: "Delay" | So what could happen to you? One. Another stopgap, and nothing changes for now. Two. A full-year deal. Three. A shutdown. And if it happens, the first thing you'd notice isn't a headline. It's a delay. A paycheck. A permit. A park gate. An airport line. |

## vo_03 · DOOR 2 · THE TARIFF BILL (3:35–5:25)
| # | Shot | VO |
|---|---|---|
| 18b | A · Jake at the table, bills spread out: rent, phone, car; a hand points away from a gov building; a door behind him is already open | Jake checks his own bills. Rent. Phone. Car payment. None of them come from the government. But the second door is the one he's already standing in. |
| 19 | A · Door 2 opens onto a shipping-port map; price tag swings | Door two. The tariff bill. |
| 20 | D · Supreme Court photo (public domain) + card "Learning Resources v. Trump · 6–3 · 20 FEB 2026" [C1] | Quick history. On February twentieth this year, the Supreme Court ruled six to three that the president can't impose tariffs using an emergency law called IEEPA. The case was Learning Resources versus Trump. |
| 21 | D · Two stamps: "IEEPA ✗" and "SECTION 232 ✔ still in place" [C2] | The Court didn't say all tariffs are illegal. It said this tool, in this way, wasn't allowed. Tariffs under other laws, like Section two thirty-two, are still in place. And the authority to tax has to come from Congress, or from a law that clearly hands it to the president. |
| 21a | E · "EXAMPLE" tag. A $100 crate → +10% → $10 arrow to the government; three branches: EAT IT / RAISE PRICE / NEW SUPPLIER | First, how a tariff actually reaches you. Say a shop imports a part that costs a hundred dollars, and the tariff is ten percent. This is just an example. The shop pays ten dollars to the government, at the border. Then the shop has choices. Eat the cost. Raise its price. Or find another supplier. Which one it picks depends on the shop, the product, and the competition. That's why one tariff can show up in your bill in some places and not at all in others. |
| 21b | D · Equal-weight split card: SUPPORTERS (jobs · leverage · revenue) ↔ CRITICS (works like a tax · cost travels to the shelf) · "economists disagree on how much" [C-both] | Now, people disagree about tariffs, and it's worth hearing both sides. Supporters say they protect American jobs, bring other countries to the table, and raise money for the Treasury. Critics say they work like a tax, because the importer pays at the border and the cost tends to travel down to the shelf. Economists argue about how much, and on which products. That argument isn't settled, and we won't pretend it is. |
| 22 | E · Money stack flows importers ← government, "≈ $100B+ refunded (CBP/CIT, Oct 2026)" with ⚠ "sources differ" [C4] | Then came the refunds. Companies that paid those tariffs were owed money back. By early October, customs numbers pointed to more than a hundred billion dollars already returned, including interest. Sources differ on the exact figure, so treat it as a ballpark. |
| 23 | A · Jake at the register: the refund arrow stops at the business, a closed gate before the shopper [C3] | Here's the catch for you. Those refunds go to the importers. The businesses that paid at the border. Not to you. If a store raised its prices because of those tariffs, nothing in the ruling sends that money back to your wallet. |
| 24 | B · Capitol pawn: three icons (hearing, documents, bill) → veto pen → "⅔ + ⅔" stamp [A5] | So what does the new Congress change? Less than you'd think. It can hold hearings. It can demand documents. It can write a tariff bill. But if the president vetoes it, it takes two-thirds of both chambers to override. |
| 25 | B · Three branches from the price tag: TARIFFS STAY / A TRADE DEAL / NEW TARIFFS → the shelf price tag zooms | So what could happen to your money? One. The remaining tariffs stay, and prices stay where they are. Two. A trade deal changes them. Three. New tariffs under other laws. Which is why the number to watch isn't a headline. It's the price tag on the shelf. |

## vo_04 · DOOR 3 · THE BILL FOR THE WAR (5:25–6:55)
| # | Shot | VO |
|---|---|---|
| 26 | A · Door 3 opens on the bunker (callback to EP03), a bill slides under the door | Door three. The one nobody puts on a thumbnail. The bill for the war. |
| 27 | E · 28 FEB 2026 → "$29B (Pentagon est., May)" counter [D1][D2] | You remember Jake's bunker from the last video. The war with Iran began on February twenty-eighth, and Congress never voted to authorize it. By May, the Pentagon estimated it had cost about twenty-nine billion dollars. |
| 28 | B · Two arrows into the budget: "OTHER SPENDING" and "BORROWING → INTEREST" | That money has to come from somewhere. From other parts of the budget, or from borrowing. And borrowing has a price: interest, paid out of the same federal budget as everything else. |
| 29 | D · Purse card → three paper tags: FUND / CONDITIONS / SAY NO [D4] | Now the power of the purse comes back. In January, Democrats can decide whether to fund more of the war, to attach conditions to it, or to say no. |
| 30 | D · Split card, equal weight: "Fund the troops" ↔ "Vote before spending billions" | Republicans can argue the opposite. And both sides have a point. One says funding the troops is non-negotiable. The other says Congress should vote before billions are spent. |
| 30a | E · Paper coin rolls forward through three budget years, interest tag growing | And remember how borrowing works. Every dollar the government borrows is paid back with interest, and that interest is a bill that comes due in every future budget. So a decision made in January keeps showing up for years. |
| 31 | E · Brent line swing ≈ $93↔$113 with dates; pump icon [D3] | Whichever way it goes, the question is the same. Who pays? Higher prices at the pump when oil spikes. Higher taxes someday. Or less spending somewhere else. Oil has already swung more than ten dollars a barrel in a single week this month. |

## vo_05 · WHO THIS HITS (≈ 7:35–8:40)
| # | Shot | VO |
|---|---|---|
| 31a | B · Four paper pawns on a grid vs the three doors (a heat grid: ● hits hard · ○ touches lightly) | Now let's make it personal. Four people. Three doors. |
| 31b | A · MAYA: apartment keys + car; grid lights door 2 and door 3 | Maya rents an apartment and drives to work. Door one barely touches her, unless a long shutdown slows the economy. Door two is hers, the price tag on the shelf. And door three reaches her at the pump. |
| 31c | A · WALTER: mailbox with a check inside, price tag growing beside it [F1] | Walter is retired and lives on Social Security. In past shutdowns, those checks have kept going out, because they're paid through a separate system. What can slow down is service, the phone line, the office visit. His real risk is quieter: if prices stay high, a fixed check buys less. |
| 31d | A · DANA: pay stub $0, rent due stamp [B7] | Dana, the federal worker, lives in door one. In a shutdown she's furloughed, or working without pay. She's guaranteed back pay later. But rent is due now. For her, a cash cushion matters most. |
| 31e | A · LUIS: small shop, crate, a form "CLAIM A REFUND" he must fill out [C3] | And Luis owns a small shop that imports parts. Door two is his. If he paid those tariffs, he may be owed a refund. But it doesn't arrive on its own. He has to file a claim. |
| 31f | B · Four pawns, four different calendars | Four people, one Congress, four very different months. |

## vo_06 · CLOSE
| # | Shot | VO |
|---|---|---|
| 31g | E · One calendar: 11 DEC (stopgap ends) → 3 JAN (new Congress). Everything between is dimmed with a "NOISE" label [B1][A3] | Let's put it on one calendar. December eleventh: the stopgap runs out. January third: the new Congress takes office. After that, the real budget fight begins. Those are the two dates that matter. Everything in between is noise, and noise is where headlines live. |
| 32 | B · Three doors side by side with their icons: calendar / price tag / bill | So that's the map. Door one, a date. Door two, a price tag. Door three, a bill. |
| 33 | A · Jake shrugs, then nods, closes laptop | None of it is certain. Congress could keep the lights on in December and surprise everyone. You don't need to predict it. You need to be ready for it. |
| 34 | A/E · Checklist, three lines type in: 1 CASH · 1 MONTH OF BILLS · 2 AUTOPAY DATES · 3 PRICE LOG (gas · groceries · rent) | Three things you can do this week. One. If you can, keep one month of bills in cash before December eleventh. Two. Check any autopay date that depends on a federal paycheck, a benefit, or a government check. Three. Write down what you pay today for gas, groceries, and rent. Compare it in January. That's your own price tracker, and it's the only number that's really yours. |
| 35 | D · small lower-third: "General information, not financial advice." | This is general information, not financial advice. |
| 36 | A · End card: Dollarly D + calendar ring on 11 DEC → subscribe | I'm Dollarly. Your money, decoded. Subscribe, and I'll track December eleventh for you. |

---

## Length
1,617 words ≈ **9:20** with beats (target 9–10). Added for depth, not padding: how a bill becomes law (60 s), what keeps running in a shutdown, a worked tariff example (labelled EXAMPLE), both sides on tariffs, the interest note, four characters (Maya, Walter, Dana, Luis), and the two-date calendar recap. Retention rule from EP02: a new open loop every ≈ 60–90 s (🔁 at door openings, "who decides", "who pays", "the catch for you").

## Before locking the VO (blockers)
- [ ] F1: what keeps running in a shutdown (military, air traffic control, Social Security/Medicare payments) → confirm on OPM/SSA contingency plans; Walter's segment depends on it.
- [ ] A1 final tally on AP. Keep seat numbers out of the VO.
- [ ] C1 opinion text on supremecourt.gov; C4 refund figure on CBP/CIT docket (VO says "more than a hundred billion", ballpark).
- [ ] D2 Pentagon $29B: find a primary source.
- [ ] B8 2018 shutdown dates on congress.gov / CRS.
- [ ] C5 (57% / 53% poll): **not used** until the original pollster is found.
- [ ] Re-check the 11 Dec deadline right before upload; if Congress passes another stopgap, change door 1's framing ("the clock moved").

## Thumbnail (see later `thumbnail.md`)
US map in paper style, three keys/doors, giant "3", the date "DEC 11" and "$". Capitol photo (public domain). **No AI-edited face.**
