# EP01 — "Three Signatures"
### How $1.5 billion left a vault nobody broke into

- **Language:** English (channel direction as of Nov 2026). The Arabic `script.md` is kept for reference.
- **Target:** ~1,350 words of VO ≈ 10–11 min at 130–140 wpm, with breathing room for shots.
- **Voice:** calm, low, unhurried. Think "someone who has read the file twice". No hype words.
- **[S#]** = source in `research.md`. **[SHOT]** = shot type from `style/STYLE-v3.md` (never the same type twice in a row).
- `/` short pause · `//` beat.

---

## 0 · COLD OPEN (0:00–1:00)

**[SHOT: real footage · NASA Earth at night, slow push]**
> Nine days ago, on October 29th, 2026, Binance reported a security incident worth six-point-three billion dollars. / The largest crypto theft on record. [S23]
> How it happened is still being pieced together. //

**[SHOT: screen capture · Wikipedia "Bybit", highlight "largest… until"]**
> But the record it broke? / We know exactly how that one worked. / Because the people who lost it signed for it themselves.

**[SHOT: cold reconstruction · three laptops, one by one: SIGN → SIGNED. Timestamp 14:13:35 UTC]**
> February 21st, 2025. Bybit, one of the biggest crypto exchanges in the world. / Three employees approve a routine transfer. Each one looks at the screen. Each one sees a normal payment, to a known address. / One. Two. Three.

**[SHOT: real money · $100 stacks, counter to $1,460,000,000]**
> Minutes later, almost one-and-a-half billion dollars was gone. [S1][S8] / No lock was broken. No password was guessed.

**[SHOT: host · studio close-up]**
> I'm the Auditor. On this channel we don't trust what the screen says. / We read the ledger.

**[TITLE CARD: THREE SIGNATURES — Case File 01]**

---

## 1 · THE VAULT WITH THREE KEYS (1:00–2:10)

**[SHOT: map · Dubai pin, slow 3D tilt]**
> Bybit is based in Dubai, and like every large exchange, it doesn't keep customer money in one place.

**[SHOT: clean diagram on paper · hot / warm / cold wallets as three real vault photos, labelled]**
> A *hot* wallet is online, for everyday withdrawals. A *warm* wallet sits in between. / And the *cold* wallet is the vault: most of the money, kept as far from the internet as possible.

**[SHOT: macro · three keys on a desk (stock), rack focus]**
> Bybit's cold wallet couldn't be opened by one person. It needed several authorised people to sign, each with their own key. That's called multi-signature. [S9]

**[SHOT: screen capture · safe.global (current site), logo card "Safe{Wallet} (2025)"]**
> To manage those signatures, Bybit used a tool trusted by thousands of crypto companies: Safe{Wallet}. / A web page that shows the transaction, so the signers can check it, and approve.

**[SHOT: host · medium, he taps the desk]**
> The idea is simple. One stolen key can't empty the vault. / But it rests on an assumption nobody talks about: / that what you see on the screen is what you're actually signing.

---

## 2 · THE REAL TARGET WASN'T BYBIT (2:10–4:20)

**[SHOT: calendar macro · Feb 2 circled, push]**
> Nineteen days earlier. February 2nd. Someone registers a new web domain: *getstockprice dot com.* A forgettable name. [S4][S5]

**[SHOT: stock footage · laptop at night, hands only (Pexels)]**
> Two days later, a developer at Safe runs a project on their Mac. A stock-trading simulator. / The investigation calls this person only "Developer1". The project most likely arrived through social engineering. [S5]

**[SHOT: reconstruction · chat window, blurred names, "can you help debug this Docker project?"]**
> This group has done that before: approaching crypto developers and asking for "help" running some code. / Whether that's exactly what happened here, investigators haven't confirmed. [S5]

**[SHOT: archive document · FBI / Japan NPA statement on DMM Bitcoin, Dec 2024, highlight]**
> And there's a precedent. In May 2024, the Japanese exchange DMM Bitcoin lost about three hundred and eight million dollars. / In December, the FBI and Japanese police explained how: a fake recruiter on LinkedIn, an employee at a software vendor, and a real transaction, quietly altered. [S22]
> Same actor: TraderTraitor. / Same idea: don't attack the exchange. Attack the vendor the exchange trusts.

**[SHOT: data · AWS console-style timeline on dark glass, Feb 5 → Feb 17]**
> On February 5th, within a day, the attackers were inside Safe's cloud servers. / They tried to register their own security device, and failed, so they rode the developer's live login sessions instead. [S5][S6]
> For almost two weeks they worked quietly / and only during the developer's own working hours, so their activity looked like theirs. [S5]

**[SHOT: host · close, eyes narrow]**
> Notice what's happening. / The target was never Bybit. / It was the tool Bybit trusted.

**[SHOT: code macro · one JavaScript file, one line turns red]**
> February 19th. They change a single file on the website the signers use. [S5][S6]
> For every other customer in the world, it does nothing. / It waits for one wallet. Bybit's. [S6]

---

## 3 · 14:13:35 (4:20–6:00)

**[SHOT: split screen · SCREEN (green) vs LEDGER (red), slow push into the seam]**
> February 21st. Bybit does what it does every week: moves funds from the cold wallet to the warm one. [S2][S10]
> On the screen, everything checks out. The address is right. The data is right. / Bybit's CEO, Ben Zhou, said later he was the last to sign, and that he checked the link was Safe's real website. [S10]
> But what reached the signing device wasn't a transfer. / It was an instruction to replace the wallet's own logic, with logic the attacker controlled. [S9]

**[SHOT: host · beat]**
> The screen said one thing. / The ledger said another.

**[SHOT: macro · hardware wallet screen scrolling hex]**
> Wasn't there a hardware device, the last line of defence? / There was. But for complex transactions these devices often show a long string of characters no human can read. Crypto has a name for it: *blind signing.* [S9]
> Did the device show the truth, and nobody caught it? Or not clearly enough? Published analyses don't agree. / What's certain is that three authorised people followed procedure, and signed.

**[SHOT: real money / on-chain · four token cards: 401,347 ETH · 90,376 stETH · 15,000 cmETH · 8,000 mETH]**
> Once the third signature landed, the wallet belonged to someone else. / About five hundred thousand ether, worth roughly one-point-four-six billion dollars at the time. [S8]

**[SHOT: screen capture · Wayback Machine, before / after]**
> About two minutes later, the clean file went back on Safe's site, as if nothing had happened. [S4][S7] / But the internet remembers. An archive had already saved a copy of the page, with the malicious code inside. [S6]

---

## 4 · THE RUN (6:00–7:10)

**[SHOT: real video · Ben Zhou livestream on X (≤8 s, with permission or fair-use commentary)]**
> Within hours, Ben Zhou did something unusual in a crisis. He went live, and took questions. [S11]

**[SHOT: quote card · "Bybit is solvent even if this hack loss is not recovered."]**
> He said the exchange could cover the loss even if none of it came back. [S10][S11]

**[SHOT: data · withdrawal counter climbing past 350,000]**
> What followed was a bank run: more than three hundred and fifty thousand withdrawal requests. / Bybit didn't pause them. [S11]
> Three days later, it said its reserves were fully restored, through loans from partners and purchases. [S13]

**[SHOT: host · leaning back]**
> A note for the ledger. / Here, the money was stolen, and the exchange survived. / In a future case file, we'll open one where no hacker was needed at all, and the exchange still collapsed. Because the money simply wasn't there.

---

## 5 · TEN DAYS (7:10–8:50)

**[SHOT: document macro · real FBI PSA, low angle, highlight]**
> On February 26th, the FBI said it publicly: North Korea was responsible. The FBI calls the activity "TraderTraitor". [S1]
> The stolen funds, it said, were being converted to Bitcoin and spread across thousands of addresses on multiple blockchains. [S1]

**[SHOT: data on paper · bars THORChain / eXch / OKX Web3 proxy]**
> And it was fast. In about ten days, nearly all of the stolen ether had moved. / Most of it, over three hundred and sixty thousand ETH, went through a service called THORChain, and came out as Bitcoin. [S12][S14]

**[SHOT: network · white dashed lines exploding into thousands of addresses]**
> In early March, Zhou published a tally. Seventy-seven percent still traceable. Twenty percent gone dark. Three percent frozen. [S5][S14]
> Traceable doesn't mean recoverable. / Seeing money on a blockchain is one thing. Getting it back is another.

**[SHOT: montage · independent investigators' posts, exchange logos (real), bounty card 10% / $140M]**
> Bybit offered ten percent of anything recovered. Independent investigators, analytics firms and rival exchanges joined the chase. [S12] / Later, German authorities shut down eXch, an exchange Bybit had accused of moving part of the funds. [S16]
> Against that speed, it was like trying to catch water.

---

## 6 · WHERE THE MONEY GOES (8:50–9:50)

**[SHOT: real photo · NASA ISS, Korean peninsula at night, push into the dark]**
> Why would a country steal crypto? / Because it's under heavy international sanctions, cut off from most of the world's financial system. Crypto is one of the few doors left open.

**[SHOT: real person · Kremlin.ru photo of Kim Jong Un, documentary still]**
> In October 2025, an eleven-nation sanctions monitoring team reported that North Korea stole at least two-point-eight-four billion dollars in crypto in twenty-one months, / and that the money funds its weapons programs. [S18]
> Chainalysis says Bybit alone was nearly seventy percent of everything stolen from crypto services in the first half of 2025. [S17]

---

## 7 · THE LEDGER TODAY (9:50–10:40)

**[SHOT: screen capture · CourtListener docket]**
> In the summer of 2026, Bybit sued North Korea in a federal court in Washington. The court ordered the identified assets frozen while the case continues. [S20]

**[SHOT: data · one long bar, only a sliver filled]**
> What's been recovered or frozen, by Bybit's own numbers? / About five percent. [S20] // Five percent of one-and-a-half billion.

**[SHOT: real footage · NASA Earth at night, pull back]**
> And nine days ago, the record fell. If it's the same playbook, we'll know soon enough. [S23]

---

## 8 · CLOSE (10:40–11:10)

**[SHOT: host · wide, split screen behind him]**
> If this file has one line, it's this. / The vault held. The locks worked. / The weak point was the short distance between what the eye sees and what the hand signs.
> And that's not just a lesson for exchanges. / When did you last click "confirm" on something you didn't read, because the screen said it was safe?
> I'm the Auditor. / The screen said one thing. The ledger said another.

**[END SCREEN 20 s]**

---

### Titles to A/B test
1. They Signed It Themselves: The $1.5 Billion Bybit Heist
2. How North Korea Stole $1.5B Without Breaking a Single Lock
3. Before Binance, There Was Bybit — The Playbook Explained

### New source to add to research.md
| S23 | 2026 Binance hack (29 Oct 2026, ~$6.3B). Wikipedia "2026 Binance hack"; NPR 31 Oct 2026; CNBC 29–30 Oct 2026. ⚠️ Facts still moving; attribution "reportedly" until the FBI publishes. | 🟡 |
