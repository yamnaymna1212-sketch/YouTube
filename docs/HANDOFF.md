أكمل العمل على قناتي الوثائقية على YouTube عن **المشاكل المالية التي تمس أي إنسان، وخاصة الأمريكيين** (والجرائم المالية جزء منها، انظر `docs/CHANNEL.md`). اسمها المؤقت **The Auditor**، ولغتها **الإنجليزية**.

**المستودع:** `yamnaymna1212-sketch/YouTube`، الفرع `claude/eloquent-goodall-ljew33`. اقرأ أولاً `README.md` و`style/STYLE-v3.md`.

## قواعد مهمة
- **لا تصنع ولا ترندر أي فيديو إلا إذا طلبت ذلك صراحة.** الآن أريد صوراً ثابتة فقط (stills وboards).
- كل المواد حقيقية ومن مصدر رئيسي برخصة واضحة: NASA، ومواقع الحكومة الأمريكية، وKremlin.ru (CC BY 4.0)، ولقطات شاشة لمواقع حقيقية. ممنوع استخدام مقاطع القنوات الإخبارية.
- يجب ألا يبدو العمل كأنه ذكاء اصطناعي، بل مونتاج بشري احترافي: لقطات وخلفيات وزوايا متنوعة، وحركة مستمرة، وشعارات حقيقية بلا أيقونات كرتونية.

## ما هو موجود
- `studio/`: مشروع Remotion 4.0.540. فيه المضيف v4 في `src/host/Host.tsx` (رجل في أوائل الثلاثينات بشعر بني داكن ولحية خفيفة جداً وجاكيت كحلي فوق تيشيرت رمادي، يرمش ويتكلم)، و8 مشاهد في `src/scenes/Scenes.tsx`، والـ boards في `src/boards/Boards.tsx`، والألوان والخطوط في `src/theme.ts`.
  - صورة ثابتة: `npx remotion still src/index.ts <ID> out.png --browser-executable=/opt/pw-browsers/chromium`
  - المعرّفات: `BoardCharacter`، و`BoardBody` (الجسم الكامل)، و`BoardMotion` (المشي والعينان)، و`BoardIcons`، و`StyleReel --frame=N`
  - الجسم الكامل المتحرك في `src/host/HostBody.tsx` (`HostFull`)
- `style/v3-images/`: صور الستايل الحالية: الشخصية، والخلفيات وأنواع اللقطات الثمانية، والأيقونات والألوان.
- `episodes/ep01-bybit/`: `script-en.md` (السكريبت الإنجليزي، نحو 11 دقيقة)، و`research.md` (23 مصدراً)، و`materials.md`.
- الألوان: Ink `#0C0D10`، Graphite `#17191E`، Bone `#ECE7DE`، Paper `#F3EFE7`، Steel `#8B93A1`، Red `#E5483B` (اللون المميّز الوحيد)، Amber `#D9A441` (للمال فقط).
- الخطوط: Instrument Serif للعناوين، وInter للنصوص، وJetBrains Mono للمصادر والبيانات.

## حقائق مهمة
- اختراق Bybit في 21 فبراير 2025 (حوالي 1.5 مليار $، نسبه FBI إلى TraderTraitor/كوريا الشمالية في البيان I-022625-PSA) **لم يعد أكبر سرقة كريبتو**. سرقة Binance في 29 أكتوبر 2026 (حوالي 6.3 مليار $) تجاوزته، ووقائعها ما زالت تتغير.
- ملف `channel_project.zip` الأصلي لم يُرفع إلى المستودع أبداً.
- Wikimedia Commons تحظر الطلبات الآلية من هذا الخادم (خطأ 429)، وPexels محجوب أيضاً. NASA وKremlin.ru وic3.gov تعمل.

## ما زال ناقصاً
- صورة مرخّصة لـ Ben Zhou، وشعارات Chainalysis وElliptic، ورقم القضية في المحكمة، وتقرير MSMT الأصلي.
- الصوت: رجل أمريكي بين 25 و35 (`style/VOICE.md`). إما تسجيلي أنا، أو صوت ElevenLabs (المرشّح Justin). لم يُختر بعد.

## تم في 4 نوفمبر 2026
- توسيع نطاق القناة (`docs/CHANNEL.md`)، وتغيير سطر الـ lower third إلى "Where your money actually goes. Read line by line."
- المضيف v4 (رجل في الثلاثينات) بدلاً من v3. أُعيد رندر `BoardCharacter.png` و`shot-03.png` و`shot-08.png` و`BoardBackgrounds.jpg` كصور ثابتة فقط.
- مواصفات الصوت (`style/VOICE.md`).
- مضيف بجسم كامل متحرك: ساقان تمشيان، وذراعان تشيران وتشرحان، وعينان تتحركان وحدهما. صور ثابتة فقط حتى الآن.


## تم في 5 نوفمبر 2026 (جلسة EP02)
- **الحلقة الأولى المعتمدة:** "If El-Sayed Became President? Your Wallet, Explained" في `episodes/ep02-el-sayed/`. فاز El-Sayed بمقعد مجلس الشيوخ عن ميشيغان في 3 نوفمبر 2026، وهو أول سيناتور مسلم.
- **السكريبت الكامل (8 دقائق)** في `script.md`، مع البنية وخطة اللقطات و11 مصدراً.
- **الشخصية الرئيسية Jake (26):** شاب أمريكي بشعر بني فاتح وعينين زرقاوين، يعيش في عالم مرسوم (شارع، ومطعم Sunrise Diner، ومحطة وقود، وبنك). الكود في `studio/src/host/Guy.tsx` و`FullBody.tsx` و`studio/src/world/World.tsx`. ⚠️ يوجد أيضاً مضيف v4 (حوالي 30 سنة) من جلسة أخرى. **المستخدم طلب شاباً بين 20 و30، والمعتمد Jake.**
- **صور الستايل:** `episodes/ep02-el-sayed/style-v2/` (عالم Jake + خريطة EIA + لقطة حقيقية + مال حقيقي + كولاج). الرخص في `LICENSES.md`.
- **الصوت:** النصوص جاهزة في `voiceover-parts.md` (صوت Justin `bbhjR3iQ4dSHKQsgUFCH`، والموديل `eleven_v4`). **لم تُولَّد** لأن رصيد ElevenLabs انتهى (19 من 10,000). تحتاج 5,937 رصيداً لنسخة واحدة.
- **فيديوهات حقيقية لم تُنزَّل** (Wikimedia يرجع خطأ 429 من الخادم): `File:Abdul_El_Sayed_senate_hearing.webm` و`File:Rep._Mike_Rogers_Opens_a_House_Intelligence_Committee_Hearing_on_NSA_Data_Collection_Programs.ogg`. الأفضل أن ينزّلهما المستخدم ويرفعهما إلى `studio/public/sayed/`.
- ⚠️ صورة `File:Mike Rogers official photo.jpg` تخص Mike Rogers نائب ألاباما. لا تستخدمها أبداً.

## Done 5 Nov 2026 (session 2: real materials)
- **32 new real assets** in `studio/public/sayed/`, all public domain or screenshots of official websites, with licences in `episodes/ep02-el-sayed/LICENSES.md`:
  - `real/`: 13 EPA DOCUMERICA photos (1973 gas lines, refinery, oil wells, diner, hospital) and 6 NASA photos (Detroit and Michigan from the ISS).
  - `footage/`: 13 eight-second clips, 720p and muted, from the National Archives, U.S. House hearings and Prelinger films (Carter 1977, gas-prices hearing 2008, Ford River Rouge 1927, "Down the Gasoline Trail" 1935, and others).
  - `screens/`: EIA (weekly prices + what a gallon pays for), DOL ($7.25), KFF 2025, house.gov.
- **Where each one goes in the timeline:** `script.md` §7. **Board:** `episodes/ep02-el-sayed/materials-v3/real-materials-board.jpg`.
- **Fact fix:** the official EIA chart (2025) says crude 51% · distribution 18% · taxes 17% · refining 14%. The VO line in `script.md` and `voiceover-parts.md` (vo_03) changed to "split three ways… roughly a sixth each".
- Hearing clips are generic "Congress" shots only: never name a person in them.
- Still missing: the El-Sayed Senate hearing video (Wikimedia 429). The VO has not been generated (ElevenLabs credits).

## Done 5 Nov 2026 (session 3: voiceover)
- **VO generated:** `studio/public/sayed/vo/vo_00.mp3` (HOOK v2) to `vo_07.mp3`, Justin voice, `eleven_v4`, one take each (6,438 credits). Total length 6:43; with the hook replacing the first ~25 s of the cold open, it comes to about 6:20. That is shorter than the 8-minute target, so the edit needs B-roll pauses or more script.
- ElevenLabs account is now **Creator, ≈123k credits** (the old "10,000 quota / 19 credits" note is outdated).
- **Script expanded** to reach 8 min: new parts `vo_05b` (the employer's hidden $7,885) and `vo_05c` (how big is $30T, and why most of it replaces existing spending), in `voiceover-parts.md` and `script.md` File 04. Not voiced yet: waiting for the user's OK on the text and the pronunciation list.
- New flow: `8mneAJ4NpfLpbKgS0KsJ`. Listen for how "El-Sayed" is pronounced (written in IPA in the text) before the edit.

## Done 5 Nov 2026 (session 3: HOOK v1 video)
- **User asked to start the hook.** New composition `EP02Hook` in `studio/src/ep02/Hook.tsx` (33.3 s, 13 shots cut on the pauses of `vo_00.mp3`). Render: `npx remotion render src/index.ts EP02Hook out/ep02-hook.mp4 --browser-executable=/opt/pw-browsers/chromium --concurrency=4`.
- Compressed copy: `episodes/ep02-el-sayed/renders/ep02-hook-v1.mp4`.
- Shots: $26,993 slam → KFF page → Jake's pay stub (employer line "not shown") → NASA Detroit → El-Sayed photo + lower third → "…president?" typed → "8 minutes" promise card → EIA table $4.15 → stub +$6,800 → 1973 cook 700,000 jobs → House 2008 clip $30 TRILLION → blank tax line "?" → title slam.
- `FullBody` now takes `stub` (pay-stub text) so Jake's prop shows $13.73/hr, not $7.25.

## Done 5 Nov 2026 (session 3: Cold open + Who is he? videos)
- New compositions in `studio/src/ep02/Part1.tsx`: `EP02ColdOpen` (vo_01, 38.3 s, 10 shots) and `EP02WhoIsHe` (vo_02, 41.5 s, 11 shots). Both reuse the building blocks exported from `Hook.tsx`.
- New shared piece: `Wallet` (JAKE'S WALLET meter, top-right), starts at $0 in the cold open.
- Preview of hook + cold open + who is he: `episodes/ep02-el-sayed/renders/ep02-part1-v1.mp4`.
- Open decision: the hook and vo_01 overlap ("what if he became president?" and the "one number" loop are said twice). Either trim vo_01 after "…to the U.S. Senate." or keep it.
- The Senate hearing video is still missing, so D4 uses the public-domain still of the hearing.

## Done 5 Nov 2026 (session 3: music and sound effects)
- The user asked for **calm, dark, non-distracting ambient music + sound effects**.
- All audio is **original, generated in code** by `studio/tools/synth_audio.py` (numpy, no samples, no licences): `studio/public/sayed/audio/music_ep02.mp3` (132 s, D minor: sub drone + slow pad Dm–Bb–Gm–A + air + sparse soft notes with echo + reverb) and `sfx_*.wav` (whoosh, impact, sub, riser, tick, type, counter, paper, shimmer).
- `SoundLayer` in `Hook.tsx` places the music (volume 0.07, ≈15 dB under the VO) and per-part cue lists (`HOOK_CUES`, `COLD_CUES`, `WHO_CUES`). The music is one continuous take: each part starts it at its offset in the episode, so the parts join without a seam.
- The final mix is normalised to -14 LUFS, true peak -1.5 dB (YouTube level).
- Better-sounding option later: ElevenLabs music/SFX, once the account question is settled.

## Done 5 Nov 2026 (session 3: v2 after user feedback)
User feedback on the preview: loud SFX (whoosh, bass hits) distract; cut the pauses but keep the speech natural; add real explainer icons, real money and real logos.
- **SFX:** whoosh, impact, sub, riser and shimmer are removed. `SoundLayer` only plays `tick`, `type`, `counter`, `paper`, with every cue capped at volume 0.1 (`SOFT` / `SFX_MAX` in `Hook.tsx`). The music stays at 0.07.
- **Pauses:** `studio/tools/tighten_vo.py` shortens every pause longer than 0.18 s to 0.16 s and writes `vo/tight/vo_XX.mp3` plus `vo_XX.json` (an old→new time map). `src/ep02/timing.ts` `remap()` moves every cut, flash, cue and in-shot beat onto the tight take, so the cut lists stay written in original-take frames. Total VO: 6:43 → 6:07 (the 8-minute gap grows; vo_05b/05c will help).
- **Icons:** `lucide-react` 0.469.0 (ISC), clean line icons via `Ico` (fuel, heart-pulse, banknote, briefcase, landmark, receipt, vote, wallet, scroll).
- **Real money:** `public/sayed/money/usd1|20|100.jpg`, the U.S. Currency Education Program SPECIMEN images from uscurrency.gov (`Note`). Used behind $26,993, stacked on +$6,800, and as $62 (3×$20 + 2×$1) at the pump.
- **Real logos:** `public/sayed/logos/` eia.png (eia.gov), nasa.png (nasa.gov), house.svg (house.gov), kff.png (crop of the KFF screenshot). Shown in the source line (`Src logo=`). Gas brands appear only through real photos (RaceTrac 2026 pump, Chevron 1973), not as standalone logos.
- **vo_01 trimmed (user said go):** after HOOK v2 the cold open keeps only "This is Jake … the first Muslim senator in American history." + "So forget the politics for eight minutes. Let's do the math on Jake's wallet." (`KEEP_RANGES` in `tighten_vo.py`). Dropped: "within hours … what if he became president?", "Gas. Health care. Paychecks. Taxes." and "stay to the end … one number …". The cold open is now 18 s. vo_07 still says "that number bigger than everything else": the hook's $26,993 opening now sets that up.
- Preview: `episodes/ep02-el-sayed/renders/ep02-part1-v2.mp4`.

## Done 5 Nov 2026 (session 3: File 01 · Gas)
- `studio/src/ep02/FileGas.tsx` → composition `EP02FileGas` (vo_03 tight, ≈63.7 s, 15 shots): FILE 01 card → real pump photo $4.15 → year-ago bars (+$1.13) → 52-week fill-up calendar counting to $3,240 → same car, same commute ($2,355 → $3,240, +$885) → EIA region map lighting on the words → real EIA per-gallon chart → 1975 pumpjack footage (crude ≈51%, global market) → animated gallon (refining 14.3 · distribution 17.8 · taxes 16.6) → 1973 embargo photos "Priced by the world" → "No president has a dial" → Carter 1977 energy address (policy moves prices over years, either direction) → "Not by next week" → score ≈ $0 → Jake's phone: payroll health insurance −$55.38 (tease for File 02).
- The music is now **480 s** (whole episode, one take). The earlier renders of the hook, cold open and who-is-he used the old 132 s file, so re-render them before the final assembly so the music joins without a seam.
- Preview: `episodes/ep02-el-sayed/renders/ep02-file01-gas-v1.mp4`.

## Done 5 Nov 2026 (session 3: File 02 · Health care)
- `studio/src/ep02/FileHealth.tsx` → `EP02FileHealth` (vo_04 tight, ≈60.6 s, 13 shots): FILE 02 card → Jake reads his stub ($1,440 single share, $55.38 a check, KFF) → single vs family icons ($6,850) → KFF page, then the $26,993 bar split worker $6,850 / employer $20,143 → explainer: real $100 notes fly from the employer to the insurer over Jake's crossed-out paycheck → 1973 hospital photo + deductibles/copays chips → El-Sayed at the Senate HELP hearing, "Medicare for All · one public plan" → checklist (premiums none, deductibles and copays mostly none) → Jake grins, +$1,440, wallet meter updates → "But… someone has to pay for it." → Mercatus $32.6T / Urban $34T cards over blurred House 2009 footage (nameplate cropped and blurred, no names) → scale icon "the design decides: ahead / behind" → "?" lands on Jake's stub, wallet "+$1,440 − ?".
- Preview: `episodes/ep02-el-sayed/renders/ep02-file02-health-v1.mp4`.

## Done 5 Nov 2026 (session 3: rest of the episode + full v1)
- User feedback on v2: "no animation pro, the character doesn't live or react, the icons aren't pro". Fixes:
  - `studio/src/host/LiveJake.tsx`: idle life (breathing, weight shift, head micro-motion, blink rhythm with double blinks, eye saccades) + spring reactions on cue (`beats`: surprise, smile, cheer, worry, doubt, shrug, nod, think) + walk cycle. `FullBody` got `arms`, `stride`, `breathe`, the new poses shrug/cheer/think, and `lookY`. Every Jake shot uses LiveJake.
  - `Ico` is now a pro badge (glowing disc + self-drawing ring + spring pop + gentle float). Slam uses a spring (no random jitter), Label uses a wipe reveal, and photos get a smooth handheld drift (noise).
- New parts: `FilePay.tsx` (EP02FilePay, vo_05), `FileWho.tsx` (EP02FileWhoPays, vo_06), `Close.tsx` (EP02Close, vo_07, end card held 2 s), plus the shared `Score.tsx` (scoreboard).
- The pumpjack shot now plays the clip from 1 s at 0.55× so only the pumpjack shows.
- **Full episode v1:** `episodes/ep02-el-sayed/renders/ep02-full-v1.mp4` (hook → close, ≈5:55). Still missing: vo_05b + vo_05c (new File 04 script, not voiced; ElevenLabs account to confirm), which would bring it to ≈7:30.

## Channel name: **Dollarly** (5 Nov 2026)
- Chosen by the user. Banner line "Your Money. Decoded." Files: `channel/ChannelAvatar.png` (D + $), `channel/ChannelBanner.png`, `episodes/ep02-el-sayed/thumbnail-v1.png`. Source: `studio/src/ep02/Brand.tsx` (Stills ChannelAvatar, ChannelBanner, EP02Thumb).
- The EP02 end card now says Dollarly. Upload text: `episodes/ep02-el-sayed/youtube-upload.md`.

## Next steps (as of 6 Nov 2026)
1. Voice vo_05b + vo_05c (in `voiceover-parts.md`) **only after confirming ElevenLabs is linked to the user's own account** (the earlier generations went to workspace 6aa0af90…, which the user could not see in their History). Then run `tools/tighten_vo.py`, add them to the start of File 04, re-render, and update the chapter times in `youtube-upload.md`.
2. The user picks the thumbnail word (v3 layout; options: YOU PAY? · TAX SHOCK · $30 TRILLION).
3. Add links for the sources marked ⚠️ in `script.md` (Mercatus/Urban PDFs, the Census population estimate).
4. Optional: the real Senate hearing video (`Abdul_El_Sayed_senate_hearing.webm`) if the user uploads it to `studio/public/sayed/`.
5. Upload settings: not made for kids, no age limit, altered content = No, category Education.


## Done 6–7 Nov 2026 (session 4: EP03 · "If Trump Nuked Iran, What Would Happen to You?")
- **EP02 follow-ups:** ElevenLabs connector still pointed at workspace `6aa0af90…` (not the user's account) → nothing generated there; vo_05b/05c NOT voiced. Source links added in `ep02-el-sayed/script.md` (Census ✔; Mercatus/Urban primary PDFs still to swap in). EP02 analytics read (AVD 2:07/5:57 ≈ 36%, 95% browse/suggested, 0 search, TV 48%).
- **EP03 is finished and uploaded by the user** (`episodes/ep03-iran/`). 10:12, 1080p, −14 LUFS.
  - Story-led explainer: Jake at 4 a.m. (siren → shelter → screens) + six "rings" (one order → first 10 s → nearest town → Strait of Hormuz → your money → the world → Congress's three keys) + close (Hawaii 2018 false alert). Real 2026 context (U.S.–Iran war since 28 Feb 2026) + hypothetical nuclear order, labelled WHAT IF on every frame.
  - Files: `script.md` (shots + VO, research refs), `research.md` (sources + verification pass §H), `vo-clean.txt` (copy-paste VO), `voiceover-parts.md`, `concept.md`, `shot-grammar.md`, `thumbnail.md`, `youtube-upload.md` (title, description, chapters, sources, tags, settings), `LICENSES.md`.
  - Style: `style/STYLE-v4-paperworld.md` (paper world + TV-first rules: one idea per screen, giant type, map first, icons in badges, linked transitions). Style frames in `episodes/ep03-iran/style/`.
  - **Voice:** user generated it in their own ElevenLabs account, voice "Flint – Deep, Raspy and Warm" (`studio/public/iran/vo/vo_full.mp3`, 11:43 → 10:09 tight with a 2.8 s siren gap). Word timings by faster-whisper → `vo_full.words.json`; `studio/tools/ep03_cues.py` aligns every script shot to the words → `studio/src/ep03/cues.json`; all cuts/icons/badges fire on the spoken word (`wordT()` in `src/ep03/t.ts`).
  - **Code:** `studio/src/ep03/Part01.tsx` … `Part10.tsx` (compositions EP03Part01–10), shared blocks in `Part01.tsx` (At, Enter, Push, PartSound), `StyleFrames.tsx` (Badge, Headline, Print, Monitor…), `PaperWorld.tsx` (pawns, buildings, cards), `Real.tsx` (real flags, near-real NightCity, FilmPrint).
  - **Render:** `studio/tools/render_ep03.sh 1 2 … 10` (≈5–7 min per part, no GPU) → `episodes/ep03-iran/renders/parts/EP03PartNN.mp4` (all saved in git). `studio/tools/assemble_ep03.sh` joins them + two-pass loudnorm → `renders/ep03-full-v1.mp4` (158 MB, gitignored: rebuild it with the script) and `ep03-full-v1-preview720.mp4` (in git).
  - Real material: NASA STS-4 Hormuz photo, NASA ISS night photos, Operation Crossroads 1946 film (DoD), About Fallout 1963 (OCD), Beans Bullets and Black Oil 1968 (DoD, CC0), House footage, Truman Library page, EPA DOCUMERICA 1973, flags (flag-icons, MIT), Mixkit siren. Licences in `episodes/ep03-iran/LICENSES.md`.
  - SFX tool: `studio/tools/sfx_fetch.py` (Openverse search/download + licence ledger). Freesound/Pixabay/Wikimedia are blocked from this server; Mixkit and archive.org work.
- **Known issue:** VO says "on Election Day" for the Qeshm strike; reports put it on 2 Nov 2026 (eve of the election). On-screen text is correct. Fix = re-voice one line and splice.
- **Upload choices given to the user:** category Education (type: Concept overview), not made for kids, altered content = No (AI narration only) unless the thumbnail uses an AI-edited real face. Recommended title: "If Trump Nuked Iran, What Would Happen to You?". ⚠️ The user's thumbnail looked like an AI-styled photo of Trump: advised replacing it with an official (public-domain) photo + "WHAT IF?".

## Next steps (as of 7 Nov 2026)
1. Read EP03 analytics after 48 h (CTR, retention curve) and compare with EP02.
2. Optional EP03 v1.1: re-voiced Qeshm line; smaller fixes listed in the session (dark red kickers on dim maps in Part 5).
3. EP02: vo_05b/05c still unvoiced (user can generate them in their own ElevenLabs account); Mercatus/Urban PDF links.

## Done 7 Nov 2026 (session 5: EP04 · "Trump Just Lost Congress. 3 Things Happen to Your Money.")
- **Topic chosen with the user** after competitor research (Precedent / Factora "Trump Just Lost Congress" format) + polls (cost of living, health care). Facts checked: Democrats won both chambers (AP calls; AK & MS Senate still open on Nov 6), stopgap P.L. 119-103 runs to **Dec 11, 2026**, SCOTUS struck IEEPA tariffs 6–3 on Feb 20, 2026 (*Learning Resources v. Trump*), refunds go to importers.
- **Files:** `episodes/ep04-congress/` → `script.md` (shots), `vo-clean.txt` (paste into ElevenLabs, ≈1,600 words ≈ 9–10 min), `research.md` (✔/◐/⚠ per fact), `LICENSES.md`, `thumbnail-v1.png` (+ `thumbnail-v1b.png`), style stills in `style/`.
- **Brand v5:** `style/BRAND-v5-dollarly.md` + `studio/src/brand/Brand.tsx` (kit) + `Thumb.tsx` (one thumbnail template for the channel; `episodes/ep03-iran/thumbnail-v2-brand.png` = replacement EP03 cover with the official portrait, no AI face). User rules now in the doc: ≈70% paper explainer / ≈20% Jake story / ≤10% real; **no dead second** (something new every 1–1.5 s); ≤ 5 words on screen; rich world (skyline, floor, walking pawns, Jake reacting) — "keep it like the hook", not icons on empty paper.
- **Real material (PD):** 25 clips in `studio/public/ep04/footage/` (Prelinger: "The Powers of Congress" 1947, "Washington: The Nation's Capitol", "A Day in Congress"), White House 2025 official portrait.
- **Code:** `studio/src/ep04/` → `Hook.tsx` (EP04Hook), `Part02.tsx`…`Part09.tsx` (EP04Part02–09), `parts.tsx` (World backdrop, Slot, Stamp, FlipCalendar, Bill), `Story.tsx` (Apartment + TV, Hemicycle, PhoneText, Route), `kit.tsx`, `t.ts` (word clock), `cues.json`.
- **Timing:** **no VO yet** → `tools/ep04_est.py` writes an ESTIMATED time for every word (3 w/s). When the user sends the Flint VO: `tighten_vo.py` → faster-whisper words → `python3 tools/ep04_est.py --words <tight words.json>` → every shot/icon moves onto the real words (hook still uses its own `T` constants in `t.ts`: replace them from the same words file).
- **Render:** `tools/render_ep04.sh Hook Part02 … Part09` → `episodes/ep04-congress/renders/parts/`; `tools/assemble_ep04.sh` → `ep04-full-v1-novo.mp4` (gitignored) + `-preview720.mp4`.

## Next steps (as of 7 Nov 2026, session 5)
1. User generates the EP04 VO from `vo-clean.txt` (Flint, own account) → re-time (above) → re-render all parts → loudnorm assembly.
2. Before upload: re-check the Dec 11 deadline (a new stopgap would change door one), AP final tallies, the refund figure (CBP/CIT) and the $29B Pentagon estimate (find primaries).
3. Audio (done 7 Nov): EP04 has its own ambient music + beds from `tools/synth_ep04.py` (`public/ep04/audio/`: music_ep04 one take across all parts, amb_air under everything, amb_room in Jake's apartment). For sound-only changes, render each part with `--codec=wav` (≈1.5 min each) and mux onto the existing video parts instead of re-rendering pictures.
4. **VO rule from the user:** cut every pause clean and even, VO LOUDER than now → `tools/ep04_vo.sh` (tighten 0.16 s, de-ess, compressor, −15 LUFS VO; music 0.07 under it; final −14 LUFS).

## Dollarly skill (7 Nov 2026)
- **`.claude/skills/dollarly-episode/`** — the whole channel workflow as a Claude skill: `SKILL.md` (8 steps idea→upload), `references/rules.md` (all user rules), `references/pipeline.md` (commands), `references/shot-kit.md` (reusable components), `scripts/new_episode.sh epNN slug` (scaffold).
- Generic tools: `studio/tools/dollarly_tts.py` (local Kokoro VO for any episode, pauses cut, word timings → cues.json), `studio/tools/render_episode.sh` (render parts + join at −14 LUFS).
- Installed plugins the skill uses: Remotion, Social Media Skills (hook-writer, youtube-long-form, thumbnail-design…), TubeAlfred (needs authorization in claude.ai connector settings).
- EP04 final state: narrator VO (Kokoro am_michael) 8:59, all parts re-rendered, preview in git; 1080p full file only on the render machine (178 MB).

## التعديلات التي أريدها الآن
[اكتب هنا ما تريد تغييره]

## Done 7 Nov 2026 (session 6: EP05 script · "If El-Sayed Became President, What Happens to Gas Prices?")
- **User asked:** a gas-price video on "if Abdul El-Sayed became president", full script first, VO in ElevenLabs (user's own account).
- **Files:** `episodes/ep05-elsayed-gas/` → `vo-clean.txt` (1,578 words ≈ 9 min, paste into ElevenLabs), `script.md` (68 shots, mix check, real-material plan, blockers), `research.md` (R1–R23 with ✔/◐/⚠ + Jake's maths).
- **Structure:** hook ($62 tank vs $45 a year ago, El-Sayed won MI Senate Nov 3, "5 levers, one bigger than the ballot") → who is he + what he said (Iran-war blame, gas-tax pause in the debate, 100% renewables / GND, no gas-car ban per Bridge fact-check) → inside a gallon (EIA split, $1/bbl ≈ 2.4¢, Hormuz) → 5 levers: ① SPR (172M bbl, <300M lowest since 1983) ② federal gas tax 18.4¢ (Congress only, ≈ $140/yr for Jake) ③ waivers (E15, Jones Act, cents) ④ war & peace (−$20/bbl ≈ $370/yr; +$1/gal = $780) ⑤ long game (years) → dashboard → Maya/Luis (diesel $6.29)/Walter → close + 3 actions.
- **Devices:** JAKE'S PUMP chip (top-right) + a 5-lever paper console reused in every chapter.
- **Next:** user voices `vo-clean.txt` in ElevenLabs → upload MP3 to `studio/public/ep05/vo/vo_full.mp3` → tighten + whisper words → `studio/src/ep05/cues.json` → animation (copy EP04 kit). Re-check R2/R3/R8/R16/R19/R20 before voicing/upload.
- **VO received (7 Nov):** ElevenLabs "Jarnathan – Confident and Versatile", eleven_v4, user's own account. `studio/public/ep05/vo/vo_raw.mp3` (9:48) → `tighten_vo.py` (input named `vo_raw` on purpose: `GAPS['vo_full']` is EP03's siren gap) → `vo/tight/vo_raw.mp3` (8:34) → polish −15 LUFS → **`vo/vo_ep05.mp3` (514 s)** → faster-whisper `vo_ep05.words.json` → new generic aligner **`studio/tools/episode_cues.py`** (difflib, spells numbers so "$62" = "sixty-two dollars") → `src/ep05/cues.json` (70 paragraphs, 98.3% matched, nothing skipped or repeated).
- **Mac notes:** `new_episode.sh` fails on macOS bash 3.2 (`${EP^^}`) and overwrites research/script/vo-clean → EP05 was scaffolded by hand. System python 3.9 has no numpy under `-I` → use a venv (`python3 -m venv … && pip install numpy faster-whisper`).
- **Parts (paragraph runs):** Hook 0–4 (0:00) · Part02 who 5–11 (0:30) · Part03 gallon 12–19 (1:39) · Part04 lever① 20–25 (2:52) · Part05 lever② 26–33 (3:40) · Part06 lever③ 34–37 (4:34) · Part07 lever④ 38–43 (4:57) · Part08 lever⑤ 44–48 (5:53) · Part09 dashboard+people 49–59 (6:40) · Part10 close 60–69 (7:38–8:34).
- **Animation built (7 Nov):** `studio/src/ep05/` → `Hook.tsx`, `Part02.tsx` … `Part10.tsx` (compositions EP05Hook, EP05Part02–10, registered in `Root.tsx`), `props.tsx` (Station, Pump with live display, Console = 5-lever dashboard, LeverTag, Gallon layers, Barrel, PriceTag, Coins, GulfMap from Natural Earth with moving tankers + stop/red, Caverns, Refinery, Pumpjack, Turbine, Solar, Tanker, Van, Globe, Podium, Receipt, PumpChip, WhatIfTag), `Part04.tsx` exports `LeverChapter` (lever pulled → chapter card) used by all five levers. `parts.tsx`: new `road` world (station/pumpjack/refinery horizon), WHAT IF tag on every World, and **every shot stays 0.5 s under the next one** (no empty paper during slide/zoom entrances).
- **Music:** `tools/synth_ep05.py` → `public/ep05/audio/music_ep05.mp3` (530 s, A minor, no hiss layer).
- **Stills tool** `tools/render_stills.mjs` now portable (Mac + server; `OUT_DIR`, `BROWSER`). In zsh pass a frame list with `${=F}` (zsh doesn't word-split).
- **Render on the Mac:** `bash studio/tools/render_mac_ep05.sh` → `~/Desktop/Dollarly-EP05/ep05-full.mp4` (−14 LUFS). Uses a private npm cache (`~/.dollarly-npm-cache`) because `~/.npm` has root-owned files (EACCES). Re-render some parts: `bash studio/tools/render_mac_ep05.sh Part03 Part07`.
- **Package:** `episodes/ep05-elsayed-gas/youtube-upload.md` (titles, description, chapters from cues, sources, tags, settings, re-check list), `LICENSES.md`. **Thumbnail not made yet.**
- **Rendered (7 Nov, on the user's Mac M3):** `~/Desktop/Dollarly-EP05/ep05-full.mp4` (8:36, 1080p, −14.1 LUFS, peak −1.9 dB, 112 MB). First try crashed on Part02 (Chrome "Session closed", likely sleep) → re-run with `caffeinate` + `--concurrency=4`: all 9 remaining parts in **10 min**. Preview in git: `episodes/ep05-elsayed-gas/renders/ep05-full-v1-preview720.mp4`.
- **v1.1 small fixes:** dashboard shot (Part09 A) — lever 4 knob touches the title; Part07 E arrow badges a bit odd. Thumbnail still to make.
