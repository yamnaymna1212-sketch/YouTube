# EP06 · research (8 Nov 2026) · ✔ verified primary · ◐ secondary (confirm before VO) · ⚠ don't use / conflicting

**Title chosen with the user:** "America Just Hit $40 Trillion in Debt. Here's What It Does to Your Dollar."
**Why not "$38 Trillion … About to Break the Dollar":** the debt is $40.55T (not $38T), and the numbers do not support "about to break" (see R8/R9). Dollarly rule: neutral, no prediction.

| Ref | Fact (as used in VO) | Status | Primary source (checked 8 Nov 2026) |
|---|---|---|---|
| R1 | Debt **$40.556T on 5 Nov 2026** ($40,556,120,784,984); held by public $32.77T, intragovernmental $7.79T | ✔ | Treasury Debt to the Penny API (`api.fiscaldata.treasury.gov/.../debt_to_penny`) |
| R2 | First close above $40T = **18 Aug 2026** ($40.047T; 17 Aug was $39.987T). $39T crossed mid-March ($38.99T on 16 Mar, $39.07T on 31 Mar) → ≈ $1T in 5 months | ✔ | same API. **VO fixed from 19 Aug to 18 Aug** |
| R3 | FY2026 deficit **$1.992T** = outlays $7.396T − receipts $5.403T; receipts +3.2%, outlays +5.5% | ✔ | Monthly Treasury Statement Table 9 (FY to 30 Sep 2026) via Fiscal Data API |
| R4 | FY2026 **net interest $1,051.8B** (FY2025 $970.4B, +8.4%); **national defense $965.2B**; interest = 14.2% of outlays; interest − defense ≈ $86.6B | ✔ | MTS Table 9, Fiscal Data API |
| R5 | CBO baseline: net interest ≈ $2.1T by 2036 (4.6% of GDP). A projection under current law, not a forecast | ✔ | [CBO, Budget & Economic Outlook 2026–2036](https://www.cbo.gov/publication/61882) |
| R6 | Debt held by public = **97.4% of GDP** (2026 Q2); total federal debt = **121.2%** of GDP | ✔ | FRED `FYGFGDQ188S`, `GFDEGDQ188S` (Treasury/BEA) |
| R7 | Moody's cut U.S. to Aa1 in May 2025 (first Moody's downgrade since 1917); S&P and Fitch at AA+ | ✔ | Moody's release 16 May 2025; S&P (2011), Fitch (2023) |
| R8 | Dollar = **56.7%** of global FX reserves, 2026 Q2 (57.2% in Q1; 58.4% end-2024). Euro **20.6%** | ✔ | IMF COFER via SDMX API (`G001.AFXRA.CI_USD.SHRO_PT.Q`, published 30 Sep 2026) |
| R9 | Fed broad dollar index: 121.85 (5 Nov 2025) vs ≈ 121.7 (30 Oct 2026) → "about where it was a year ago". Down from 129.9 in Jan 2025; 119.7 on 31 Dec 2025 (→ +1.6% in 2026) | ✔ | FRED `DTWEXBGS` (Federal Reserve) |
| R10 | TIC Aug 2026 (released 16 Oct): net TIC inflow **$199.8B**; foreign holdings of Treasuries **$9.33T** (vs $9.25T Aug 2025); Japan $1,068.3B, UK $1,009.5B, China **$590.7B** (vs $699.7B Aug 2025). Next release **18 Nov 2026** | ✔ | Treasury TIC press notice (16 Oct 2026) + `ticdata.treasury.gov/Publish/slt_table5.txt` |
| R11 | 30-yr mortgage **7.18%** (5 Nov 2026) vs **6.22%** (6 Nov 2025); 10-yr Treasury **4.84%** vs **4.11%** | ✔ | Freddie Mac PMMS (FRED `MORTGAGE30US`), FRED `DGS10`. (The earlier "conflict" was old Jan 2026 articles) |
| R12 | Stopgap P.L. 119-103 (signed 2 Sep 2026) funds the government through **11 Dec 2026** | ✔ | [CRS R49353](https://www.congress.gov/crs-product/R49353). Still re-check on the day of upload |
| R13 | U.S. population **341,784,857** (1 Jul 2025, Vintage 2025) | ✔ | Census Bureau, release of 27 Jan 2026 |
| R14 | Neutral framing: "borrow in own currency, can carry it" vs "interest crowds out" | ✔ | CBO/CRFB/PGPF positions, stated as "some economists…" |

## Computed (all from the ✔ rows)
- Interest per day $1,051.75B ÷ 365 = **$2.88B**; per second ÷ 86,400 = **≈ $33,350** → "thirty-three thousand"; per 30 s ≈ **$1.0M**.
- Debt per American: $40.556T ÷ 341.78M = **$118,660** ("about a hundred and nineteen thousand"). Interest per American: **$3,077** ("about three thousand").
- Maya's mortgage (illustrative, $350,000, 30 yr, P&I only): 6.22% → **$2,148/mo**; 7.18% → **$2,371/mo**; difference **$223/mo** (≈ $2,674/yr).
- Debt added 16 Mar → 18 Aug ≈ $1T over ≈ 5 months ≈ $200B/month.

## Still to do before upload
- Re-run the Fiscal Data API on the day of the VO (debt number moves ≈ $6B+/day: VO says "forty point five", safe).
- Re-check 11 Dec deadline and 18 Nov TIC release on the upload day.
- Illustrative characters (Jake, Maya, Walter) labelled ILLUSTRATIVE on screen.
