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

## التعديلات التي أريدها الآن
[اكتب هنا ما تريد تغييره]
