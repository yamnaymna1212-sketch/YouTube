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

## التعديلات التي أريدها الآن
[اكتب هنا ما تريد تغييره]
