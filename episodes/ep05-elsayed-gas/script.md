# EP05 · script v1 (7 Nov 2026) · target ≈ 9 min

**Working title:** If El-Sayed Became President, What Happens to Gas Prices?
**Alt titles:** "President El-Sayed vs. $4 Gas: The Real Math" · "5 Levers a President Has on Gas Prices (Only 1 Matters)"
**Channel:** Dollarly · "Your Money. Decoded."
**Frame:** hypothetical (El-Sayed = U.S. Senator-elect, NOT a candidate) + one real, fresh question: what can any president actually do to the number on the pump? Five levers, ranked by how much they move Jake's bill. Neutral: both sides on every lever, "tends to", "estimates", never a prediction. Refs [Rx] → `research.md`.
**Length:** VO 1,578 words ≈ 8:45–9:10 after `tighten_vo.py` + ≈ 10 s silent beats.
**Voice:** the user generates it in their own ElevenLabs account (voice "Flint", eleven_v4) from `vo-clean.txt`. Then: `tools/ep04_vo.sh`-style chain (tighten 0.16 s, de-ess, comp, −15 LUFS VO) → faster-whisper words → cues.
**Style:** `style/BRAND-v5-dollarly.md`. Mix ≈ 70% paper explainer / 20% Jake / ≤ 10% real. Something new every 1–1.5 s. ≤ 5 words on screen. Rich world (street, station canopy, skyline, pawns walking, Jake reacting), never icons on empty paper. Music ambient 0.07, SFX tick/type/counter/paper ≤ 0.1.
**Running device:** **JAKE'S PUMP** (a paper gas pump top-right, replaces the wallet chip): its display shows the tank total and changes when a lever moves it. **THE DASHBOARD**: five paper levers on a console, each one gets pulled in its chapter, and the final scoreboard reads off them.
Legend: **A** Jake story · **B** paper stage/map explainer · **N** night map · **C** real photo/footage (framed print or on Jake's phone/TV) · **D** document/quote card · **E** data/maths. **→** link to next shot. 🔁 open loop.

---

## vo_00 · HOOK (0:00–0:30)
| # | Shot | VO |
|---|---|---|
| 1 | A · Night Midwest gas station (paper world: canopy lights, pylon $4.15⁹, cars passing, skyline far back). Jake's hand on the nozzle; pump display rolls fast → **$62.25** (counter tick). Camera pushes into the digits. | Sixty-two dollars. That's what Jake just paid to fill his tank. |
| 2 | E · Digits flip back to a ghost "2025" display **$45.29** (dim), then slam back to $62.25, red "+$17" tag | A year ago, the same tank cost him forty-five. |
| 3 | N · Night map of Michigan draws a glowing red outline → kicker "— NOV 3, 2026" serif "Michigan" gold line; pawn hops Lansing → Washington arc. Framed print slides in: El-Sayed (CC BY-SA, Conlan Houston) + name card "Abdul El-Sayed · Senator-elect" | Four days ago, Michigan sent a new senator to Washington. Abdul El-Sayed. |
| 4 | B · Paper calendar riffles 2026 → **2028**, a ghost White House rises behind it with a "?" | And people are already asking about twenty twenty-eight. |
| 5 | A · Back to Jake at the pump, he looks at the display, then at us (think) → display zooms | So let's ask the question Jake actually cares about. If El-Sayed became president, what would happen to this number? |
| 6 | B · A paper console rises from the floor: **5 levers** pop one by one (spring), four small + one huge red lever that casts a shadow 🔁 | A president has five levers on gas prices. Four of them are smaller than you think. And one is bigger than anything on the ballot. |
| 7 | → Camera flies down the row of levers into lever ① → title card "WHAT IF? · EL-SAYED · GAS" (Barlow red kicker, serif title) | Let's pull them, one by one. |

## vo_01 · WHO IS HE (0:30–1:40)
| # | Shot | VO |
|---|---|---|
| 8 | C+D · Framed print (Senate HELP hearing 2024, public domain) beside name card; three icon badges swap on the words: stethoscope → microscope → Detroit skyline [R1] | First, who is he? Abdul El-Sayed is a doctor and an epidemiologist. He ran Detroit's health department, |
| 9 | B · Paper US map: Michigan fills blue, ballot icon ✔, stamp "SENATE" [R2] | and on November third, he won Michigan's open Senate seat. |
| 10 | D · Constitution card Art. II: "natural born Citizen · 35 Years" ticks ✔ ✔ [R3] → stamp **WHAT IF** across it (stays as a small corner tag for the whole episode) | He was born in Michigan, so he'd be eligible to run for president. But to be clear, he isn't running. This whole video is a what-if. |
| 11 | B · Three paper tags drop on a string: 1 · 2 · 3 | So what has he actually said about gas? Three things. |
| 12 | N · Night map Persian Gulf, red outline draws; a paper pump in Michigan with "$5" on it connected by a glowing route. Quote card: "illegal war" (2 words) with source chip "Statement, Sept 17, 2026" [R4] | One. He blames this year's spike on the war with Iran. In September, when Michigan gas hit five dollars, he called it the price of an illegal war. |
| 13 | B · Paper debate stage: two pawns "EL-SAYED" / "ROGERS" at podiums, a "18.4¢" tag between them; both pawns nod; handshake icon pops [R5] | Two. In his debate with Republican Mike Rogers, both of them backed pausing the federal gas tax. That's rare. They agreed on something. |
| 14 | B · Wind turbines + solar panels grow out of the paper floor; badge "100%" | Three. The long game. He has said America needs one hundred percent renewable energy, and it needs it yesterday. [R6] |
| 15 | D · Card "Green New Deal · 2019" → a gas-car icon with a red "BAN?" stamp → fact-check card flips it: "Never called for it" (≤ 5 words) [R7] | He backed the Green New Deal in twenty nineteen. Rogers accused him of wanting to ban gas cars. A Michigan fact-check found he never called for that, and his campaign says he doesn't support a ban. |
| 16 | D · Equal-weight split card: CRITICS (cost ↑) ↔ EL-SAYED (shock ↓) | His critics say his climate agenda would push energy costs up. He says depending on oil is exactly what leaves us exposed to shocks like this one. |
| 17 | A · Jake at the pump shrugs, empty folder "ENERGY PLAN" (blank page) → he turns it over, it becomes the 5-lever console 🔁 | He hasn't published a detailed energy plan. So instead of guessing, let's look at what any president can actually do. |

## vo_02 · INSIDE A GALLON (1:40–3:00)
| # | Shot | VO |
|---|---|---|
| 18 | A → B · Jake holds up a paper gallon jug; camera dives into it → it becomes a giant cut-away gallon on the paper stage | Before we touch a single lever, let's open up a gallon. |
| 19 | B · Paper US map by region, the price chips pop in (US $4.15 · Midwest $4.10 · West Coast $5.30) + small "+$1.13 vs 2025" tag; source chip "U.S. EIA · week of Nov 2, 2026" [R8] | Right now, regular gas averages four dollars and fifteen cents nationwide. That's a dollar thirteen more than a year ago. In Jake's Midwest, four-ten. On the West Coast, almost five-thirty. |
| 20 | E · Animated gallon fills in four layers on the words: CRUDE 51% (amber, half) → REFINING 14% → DELIVERY 18% → TAXES 17%; icons: pumpjack / refinery / truck / landmark. Quick insert: framed EIA chart screenshot (real, 1.5 s) [R9] | Here's what's inside that price. According to the Energy Information Administration, last year about half of every gallon was crude oil. About a sixth was refining. About a sixth was getting it to the station. And about a sixth was taxes. |
| 21 | B · The crude layer wobbles; it lifts out of the gallon and becomes a paper globe with ships circling it | That first half is the part that moves. And crude oil is priced on a world market. |
| 22 | E · A paper barrel; "42" gallons pour out as 42 tiny jugs in a grid; "$1 / barrel → 2.4¢ / gallon" (as icons + numbers), then the barrel tag rolls +$10 → pump tag +25¢ [R10] | A barrel holds forty-two gallons. So every time oil goes up one dollar a barrel, gas tends to go up about two and a half cents a gallon. Ten dollars on a barrel, about a quarter at the pump. |
| 23 | E · Brent line on paper (2026), it climbs past the +$10 marker and keeps going; a narrow blue strait pulls into frame | And this year, oil didn't move ten dollars. It moved a lot more. Because of one narrow strip of water. |
| 24 | N · Night map: Strait of Hormuz, tanker pawns stream through (≈ 1 in 5 of all world tankers highlighted), date "FEB 28, 2026" → tankers stop, line goes red. Short real moment: NASA STS-4 Hormuz photo in a print frame (1.5 s) [R11][R12] | The Strait of Hormuz. Normally, about a fifth of the world's oil passes through it. When the war started in February, traffic through the strait collapsed. Oil spiked. |
| 25 | A · Jake at a Michigan pump in daylight, display climbs to **$75**; he winces (worry). JAKE'S PUMP chip top-right now live [R4] | And in September, in Michigan, Jake's tank hit seventy-five dollars. |
| 26 | B · Pull back: the paper globe with the strait far right, the White House tiny on the left, distance arrow; the console rises in front 🔁 | So keep this picture in your head. Most of your gas price is decided far away from the White House. Now, here's what a president can still do about it. |

## vo_03 · LEVER ① THE EMERGENCY TANK (3:00–4:05)
| # | Shot | VO |
|---|---|---|
| 27 | B · Lever ① is pulled (spring + click) → chapter card "LEVER ONE · The Emergency Tank" | Lever one. The emergency tank. |
| 28 | B · Cut-away paper Gulf Coast: underground salt caverns (paper layers), oil level visible; a pipe to a refinery and a tanker | The government keeps oil in giant salt caverns along the Gulf Coast. It's called the Strategic Petroleum Reserve, and a president can order it released, fast. |
| 29 | D/E · Card "MAR 11, 2026" → counter 0 → **172M barrels** from the U.S. cavern + other flags' pawns add up to **400M**; source chip "U.S. DOE" [R13] | This year, that already happened. In March, the administration ordered one hundred seventy-two million barrels released, as part of a four-hundred-million-barrel release with other countries. |
| 30 | E · The cavern level drops; a gauge needle slides to "< 300M", year tag flips back to **1983** [R14] | It helped cushion the spike. But it has a cost. By August, the reserve fell below three hundred million barrels. The lowest since nineteen eighty-three. |
| 31 | B · A pawn "PRESIDENT EL-SAYED (WHAT IF)" walks up to a half-empty tank; a "REFILL" truck arrow points back into the world market globe | So a President El-Sayed would inherit a tank that's much emptier than it used to be. And the government plans to buy oil back to refill it. Buying oil back means more demand, at some point, on the same market. |
| 32 | A · Jake: paper cushion icon lands on the pump; JAKE'S PUMP chip dips a little, then wobbles back | Lever one is real. But it's a cushion, not a cure. And once you use it, you have to refill it. |

## vo_04 · LEVER ② THE GAS TAX (4:05–5:20)
| # | Shot | VO |
|---|---|---|
| 33 | B · Lever ② pulled → chapter card "LEVER TWO · The Gas Tax"; a crowd of politician pawns cheer at podiums (no faces, role labels) | Lever two. The one politicians love. The gas tax. |
| 34 | E · Pump display shows a thin slice "18.4¢" peeling off; a 1993 calendar tag stays frozen while years riffle behind it [R15] | The federal gas tax is eighteen point four cents a gallon. It hasn't changed since nineteen ninety-three. |
| 35 | B · The two debate pawns again, both pointing at the slice | Both El-Sayed and Rogers backed pausing it. So would it happen? |
| 36 | B · Paper stage White House ↔ Capitol: the president pawn reaches for the slice, a gate closes; only the Capitol has the key; stamp "CONGRESS ONLY"; bill pages flutter into a bin "2026" [R16] | Here's the catch. A president can't pause it alone. Only Congress can. And Congress has never actually done it. Bills to suspend it were introduced this year, and went nowhere. |
| 37 | B · The 18.4¢ coins roll along a paper highway into a bridge; when paused, the bridge gets a "?" crack, label "HIGHWAY TRUST FUND" [R17] | Why? Because that money pays for highways and bridges. Pause it, and the Highway Trust Fund loses billions that have to come from somewhere else. |
| 38 | D · Equal split: coins go to "YOU" ↔ some stay with "SELLER"; "economists disagree" chip [R18] | And would the full eighteen cents even reach you? Economists disagree. Some of it could stay with sellers, especially when supply is tight. |
| 39 | E · Jake's maths with his receipts: 15 gal × 52 = **780 gal** → × 18.4¢ = **≈ $140 / yr**; amber coin stack | Let's do Jake's math anyway. He buys about fifteen gallons a week. That's seven hundred and eighty a year. A full year with no federal gas tax, if every cent reached him, saves him about a hundred and forty dollars. |
| 40 | A · Jake pockets the $140 tag, nods; the tag pins itself to lever ② 🔁 | Real money. Remember that number. |

## vo_05 · LEVER ③ THE SMALL SWITCHES (5:20–5:55)
| # | Shot | VO |
|---|---|---|
| 41 | B · Lever ③ pulled → chapter card "LEVER THREE · Small Switches" | Lever three. The small switches. |
| 42 | B · Two switches on the console flip: corn icon "E15" pours into a summer-sun gallon; a foreign-flag tanker pawn sails between two U.S. ports (Houston → New York arc), stamp "JONES ACT · WAIVED"; one archive moment: 1940s ship film in a print frame (Prelinger, 1.5 s) [R19][R20] | In an emergency, a president's agencies can waive some fuel rules. Allow more ethanol in summer gas. Or let foreign ships carry fuel between American ports, by waiving a century-old shipping law called the Jones Act. This year, the administration used both. |
| 43 | E · Pump sign drops only "−2¢…−3¢" with a magnifying glass over it | Estimates put the effect at a few cents a gallon. Helpful. But you'd barely see it on the pump sign. |

## vo_06 · LEVER ④ WAR AND PEACE (5:55–7:05)
| # | Shot | VO |
|---|---|---|
| 44 | B · The huge red lever ④ — the camera tilts up its height; chapter card "LEVER FOUR · War and Peace" | Lever four. The big one. And it isn't in any energy plan. |
| 45 | N · Back to the night strait, tankers frozen; a "TAX" icon and a "RULE" icon float in and fall away; a red "WAR" glow stays | Remember the strait. This year's spike didn't come from a tax or a regulation. It came from a war. |
| 46 | B · Paper Oval-office desk (ink lines, no person) with three paper cards: ESCALATE / NEGOTIATE / OPEN · CLOSE; a shipping lane on the map opens and closes with each card | And on war and diplomacy, a president has more power than on almost anything else. Whether to escalate. Whether to negotiate. Whether a shipping lane opens, or stays closed. |
| 47 | E · Barrel tag −$20 → pump −50¢ → Jake's year **≈ $370** vs lever ②'s **$140** as two amber stacks side by side (2.6×) | Here's the math. If oil drops twenty dollars a barrel, gas tends to fall around fifty cents. For Jake, that's about three hundred and seventy dollars a year. More than two and a half times the gas tax. |
| 48 | E · Mirror: barrel +, pump **+$1.00**, Jake's stack **$780** grows red; JAKE'S PUMP chip jumps; Jake (A, small inset) worry | And it works in both directions. A new crisis could add a dollar to every gallon. That's seven hundred and eighty dollars a year, for Jake alone. |
| 49 | D · Equal split: EL-SAYED "illegal war · price spike" ↔ SUPPORTERS "security · prices fall after" [R4][R21] | El-Sayed has called the Iran war illegal and blamed it for the spike. Supporters of the war say it was necessary for security, and that prices will come down once it's over. |
| 50 | B · The red lever's shadow falls across the whole pump 🔁 | Either way, the lesson is the same. The biggest gas decision a president makes might not look like a gas decision at all. |

## vo_07 · LEVER ⑤ THE LONG GAME (7:05–8:00)
| # | Shot | VO |
|---|---|---|
| 51 | B · Lever ⑤ pulled slowly (a slow-motion spring) → chapter card "LEVER FIVE · The Long Game" | Lever five. The slow one. |
| 52 | B · Paper US map splits in two halves: LEFT pumpjacks, pipelines drawing, "DRILL" badge; RIGHT turbines, solar, EV chargers, "SWITCH" badge; pawns march to each side | This is where the two sides really split. One side says drill more. Open more federal land. Build more pipelines. More supply, lower prices. The other side says get off oil. More renewables, more electric cars, so the next war in the Gulf doesn't hit your wallet so hard. |
| 53 | B · Pawns "EL-SAYED" → right half; "ROGERS · all of the above" → middle [R6] | El-Sayed is clearly on the second side. Rogers argued for all of the above. |
| 54 | E · Timeline ruler: LEASE → first barrel (years); new car → fleet turnover (years). Then real moment: 1970s pumpjack film in a print frame (EPA DOCUMERICA / archive, 1.5 s) + badge "#1 PRODUCER · U.S." [R22] | But here's what both sides tend to leave out. These policies take years. A new oil lease can take years to produce a single barrel. A new car takes years to replace an old one. And the United States is already the largest oil producer in the world, and prices still spiked this year, because oil is priced globally. |
| 55 | A · A small paper kid (Jake's niece, illustrative) beside Jake at the pump, calendar tag 2040; Jake points to her, then to "next week" tag that greys out | So lever five matters. For your kids' gas bill. Not for next week's. |

## vo_08 · JAKE'S DASHBOARD (8:00–8:25)
| # | Shot | VO |
|---|---|---|
| 56 | B · Full console, Jake stands beside it; each lever lights as named, a value tag hangs under it: ① cushion · ② ≈$140/yr · ③ ¢ · ④ $$$ ↑↓ · ⑤ years | Now let's put all five levers on Jake's dashboard. The reserve: a cushion, already used. The gas tax: up to about a hundred and forty dollars a year, if Congress agrees. The waivers: a few cents. The long game: years away, in either direction. And war and peace: hundreds of dollars a year, up or down. |
| 57 | B · Four small levers slide onto a paper campaign stage with a microphone; lever ④ stays alone, huge, its shadow over Jake's pump | Four of these, a candidate can promise on a stage. The fifth is the one that would actually decide Jake's bill. |

## vo_09 · WHO THIS HITS (8:25–8:55)
| # | Shot | VO |
|---|---|---|
| 58 | B · Three paper pawns on a road map | And it doesn't hit everyone the same. |
| 59 | A · MAYA: long paper road (40 mi), no bus-stop icon crossed; her gallon jug doubles next to Jake's | Maya drives forty miles each way to work. No bus. She buys almost twice as much gas as Jake, so every swing hits her twice as hard. |
| 60 | A · LUIS: delivery van, diesel pump **$6.29** "+$2.54"; route arrow from his van to a grocery shelf, price tag ticks up [R8] | Luis drives a delivery van, and it runs on diesel. Right now diesel is over six dollars a gallon. Two and a half dollars more than a year ago. For him, and for every truck that brings your groceries, that cost travels down to the shelf. |
| 61 | A · WALTER: parked car with dust, grocery basket; a truck icon on the bread tag | And Walter is retired. He barely drives. For him, gas prices show up somewhere else. In the price of food that has to be trucked to the store. |

## vo_10 · CLOSE (8:55–9:30)
| # | Shot | VO |
|---|---|---|
| 62 | A · Jake back at the night station from shot 1; the pump display waits | So, if El-Sayed became president, what would happen to gas prices? |
| 63 | B · A paper "dial" on the pump is just painted on (Jake taps it, nothing turns); globe, reserve tank, Capitol, red lever line up | The honest answer: no president has a dial. Most of your gallon is set by the world. A president's real power is in the reserve, in Congress, and above all, in war and peace. |
| 64 | A · Jake's hand on the nozzle | You don't need to predict any of it. But you can control your side of the pump. |
| 65 | A/E · Checklist types in on a pump receipt: 1 GALLONS × 52 · 2 TIRE PRESSURE · 3 "WHICH LEVER?" (source chip fueleconomy.gov) [R23] | Three things you can do this week. One. Write down how many gallons you buy in a week. Multiply by fifty-two. That's your real gas number. Most people have never done it. Two. Check your tire pressure. The government's own fuel economy site says properly inflated tires can improve your mileage. Three. Every time a politician promises cheaper gas, ask one question. Which lever? Now you know all five. |
| 66 | D · small lower-third: "General information, not advice." | This is general information, not financial or political advice. |
| 67 | A · Jake hangs the nozzle, pump display resets to $0.00, he looks at the camera | Jake's question was simple. What happens to this number? Now you know who really moves it. |
| 68 | End card: Dollarly D + paper pump + subscribe | I'm Dollarly. Your money, decoded. Subscribe, and I'll do the math on the next big name. |

---

## Mix check (by VO time)
- Jake story (A): shots 1, 5, 17, 18, 25, 32, 40, 55, 59–62, 64, 67 ≈ **20%**
- Real (C): El-Sayed prints (3, 8), EIA chart (20), NASA Hormuz (24), ship film (42), pumpjack (54) ≈ **7%**, each ≤ 2 s, always framed or on a screen.
- The rest paper explainer ≈ **73%**.

## Real material plan (all reuse EP02/EP03/EP04 assets, already licensed)
| Shot | File | Licence |
|---|---|---|
| 3 | `public/sayed/abdul_el_sayed_meet_and_greet_by_conlan_houston_5_cropped.jpg` | CC BY-SA 4.0 · credit "Conlan Houston" on screen |
| 8 | `public/sayed/abdul_el_sayed_testifying_at_committee_hearing_2024.jpg` | Public domain (U.S. Senate HELP) |
| 20 | `public/sayed/screens/eia_what_we_pay_per_gallon.png` | U.S. EIA screenshot |
| 24 | NASA STS-4 Hormuz photo (EP03, `public/iran/…`) | Public domain |
| 42 | Prelinger tanker/ship clip (EP03 "Beans Bullets and Black Oil" 1968, CC0) | CC0 |
| 54 | `public/sayed/footage/v01_pumpjack_1975.mp4` (0:00–0:02) | Public domain |
No AI-made or AI-altered faces. Rogers appears only as a labelled pawn (no photo needed).

## Before locking (blockers)
- [ ] R2: AP call for El-Sayed (Michigan Senate) still standing on upload day.
- [ ] R3: confirm place of birth (Michigan) from a primary/biographical source.
- [ ] R8: update EIA week before upload (next release Nov 10) — if prices move, edit the VO numbers before voicing, or keep VO generic and update on-screen chips only.
- [ ] R16: confirm no gas-tax suspension passed in 2026 (re-search congress.gov).
- [ ] R19/R20: confirm E15 waiver + Jones Act waiver dates on epa.gov / dhs.gov.
