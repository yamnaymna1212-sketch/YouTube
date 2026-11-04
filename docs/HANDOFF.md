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

## التعديلات التي أريدها الآن
[اكتب هنا ما تريد تغييره]
