# ملف البحث — اختراق Bybit (21 فبراير 2025)

> هذا الملف هو "دفتر الحقائق" الذي يستند إليه السكريبت. كل جملة في السكريبت عليها رمز [S#] يرجع إلى مصدر هنا.
> درجات الثقة: ✅ مصدر أولي أو رسمي · 🟡 تحليل جنائي مستقل أو صحافة موثوقة · ⚠️ متضارب أو يحتاج تحقق قبل النشر.
> آخر تحديث للبحث: 4 نوفمبر 2026.

---

## 1. التسلسل الزمني الدقيق (بتوقيت UTC)

| التاريخ | الحدث | الثقة | المصدر |
|---|---|---|---|
| 2 فبراير 2025 | تسجيل النطاق `getstockprice[.]com` عبر Namecheap، واستُخدم لاحقاً خادم تحكم | 🟡 | S4، S5، S6 |
| 4 فبراير 2025 | اختراق جهاز macOS لمطوّر في Safe{Wallet} (تسميه التقارير "Developer1") بعد تشغيل مشروع Docker اسمه `MC-Based-Stock-Invest-Simulator-main`، والأرجح أنه وصل عبر الهندسة الاجتماعية | 🟡 | S4، S5 |
| 5 فبراير 2025 | خلال 24 ساعة دخل المهاجمون بيئة AWS الخاصة بـ Safe. حاولوا تسجيل جهاز MFA خاص بهم وفشلوا، فاستخدموا جلسات AWS النشطة للمطوّر (توكن صالح 12 ساعة) | 🟡 | S4، S5، S6 |
| 5 إلى 17 فبراير | استطلاع داخل AWS، ونشاط مُزامَن مع ساعات عمل المطوّر لتجنّب الاكتشاف. استُخدمت عناوين ExpressVPN وUser-Agent فيه `distrib#kali.2024` وإطار Mythic | 🟡 | S5 |
| 19 فبراير 2025 | حقن JavaScript خبيث في واجهة `app.safe.global` (ملف مستضاف على S3). الكود لا يعمل إلا عند معاملة من محفظة Bybit الباردة. لقطة Wayback Machine توثّق ذلك | 🟡 | S5، S6، S7 |
| **21 فبراير 2025، 14:13:35** | توقيع وتنفيذ المعاملة الخبيثة. كانت تبدو تحويلاً روتينياً من المحفظة الباردة إلى الدافئة، لكنها في الحقيقة `delegatecall` غيّرت منطق عقد المحفظة | 🟡 | S4، S8 |
| 21 فبراير، بعد ~2 دقيقة | رفع نسخ JavaScript نظيفة إلى S3 لمحو الأثر. Rekt تقول 98 ثانية، وSygnia تقول "دقيقتان" | ⚠️ قل "خلال دقيقتين تقريباً" | S4، S7 |
| 21 فبراير (نفس اليوم) | إعلان Bybit، وBen Zhou في بث مباشر: "Bybit is solvent even if this hack loss is not recovered" | 🟡 | S10، S11 |
| 21 و22 فبراير | موجة سحب: أكثر من 350 ألف طلب سحب، وBybit لم توقف السحب | 🟡 | S11 |
| 22 فبراير | مكافأة 10% (حتى 140 مليون دولار) لمن يساعد في الاسترداد، ثم موقع lazarusbounty.com | 🟡 | S12 |
| 24 فبراير | Bybit تعلن أنها عوّضت الاحتياطي بالكامل (قروض جسرية وشراء) | 🟡 | S13 (CNBC) |
| **26 فبراير 2025** | **بيان FBI رقم I-022625-PSA**: كوريا الشمالية (TraderTraitor) مسؤولة عن سرقة ~1.5 مليار دولار | ✅ | S1 |
| 26 فبراير | نتائج Sygnia وVerichains الأولية: السبب كود خبيث على بنية Safe، ولا ثغرة في بنية Bybit | 🟡 | S7، S9 |
| ~4 مارس | حُوّل كل الـ ETH المسروق تقريباً في نحو 10 أيام، منه ~361 ألف ETH عبر THORChain إلى بيتكوين | 🟡 | S12، S14 |
| 4 مارس (تقريباً) | Zhou: 77% قابل للتتبع، 20% "اختفى"، 3% مجمّد. 417,348 ETH حُوّلت إلى BTC على 6,954 محفظة | 🟡 | S5، S14 |
| 6 أو 7 مارس | Safe تنشر ملخص تحقيق Mandiant: هجوم "متطور برعاية دولة"، UNC4899 | ⚠️ التاريخ 6 أو 7 | S5، S15 |
| ربيع 2025 | السلطات الألمانية تغلق منصة eXch وتصادر ~34 مليون يورو (لا يُعرف كم منها من Bybit) | ⚠️ تحقق من بيان BKA | S16 |
| يوليو 2025 | Chainalysis: ~2.17 مليار دولار سُرقت من منصات الكريبتو في النصف الأول، وBybit تقارب 70% منها | 🟡 | S17 |
| أكتوبر 2025 | تقرير فريق المراقبة متعدد الأطراف (MSMT): كوريا الشمالية سرقت ≥2.84 مليار دولار في 21 شهراً، وتستخدم العائدات في برامج أسلحة الدمار الشامل والصواريخ | 🟡 (الأصل ✅ إن جُلب PDF) | S18 |
| ديسمبر 2025 | Chainalysis: كوريا الشمالية سرقت ~2.02 مليار دولار في 2025، رقم قياسي | 🟡 | S19 |
| أغسطس 2026 | Bybit تقاضي كوريا الشمالية وLazarus أمام المحكمة الفيدرالية في واشنطن (D.D.C.). أمر تقييد مؤقت ثم أمر قضائي أولي يمنع تحريك الأصول المحددة | 🟡 | S20 |
| أغسطس 2026 | المسترد ~48.4 مليون دولار والمجمد ~30.5 مليون في أكثر من 28 منصة، أي حوالي 5% فقط | 🟡 (أرقام Bybit نفسها) | S20 |

## 2. ما الذي سُرق بالضبط؟

حسب Nansen (S8):

| الأصل | الكمية | القيمة وقتها |
|---|---|---|
| ETH | 401,347 | ~1.12 مليار $ |
| stETH | 90,376 | ~253 مليون $ |
| cmETH | 15,000 | ~44 مليون $ |
| mETH | 8,000 | ~23 مليون $ |
| **المجموع** | **~500 ألف ETH أو ما يعادلها** | **~1.46 مليار $** |

**قاعدة الكتابة:** قل "قرابة مليار ونصف دولار" أو "حوالي 1.5 مليار" (صيغة FBI). لا تقل "1.5 مليار بالضبط". اختلاف الأرقام بين 1.4 و1.5 مليار يرجع إلى سعر ETH يوم الحساب.

## 3. الآلية التقنية (بمستوى مفهوم، دون تعليمات)

- محفظة Bybit الباردة لـ ETH: `0x1Db92e2EeBC8E0c075a02BeA49a2935BcD2dFCF4`، وهي عقد Safe متعدد التواقيع (proxy) يحتاج 3 تواقيع على الأقل (S9).
- رأى الموقّعون على واجهة Safe عنوان الوجهة الصحيح وبيانات تبدو سليمة. Ben Zhou قال إنه كان **آخر موقّع** وإن الرابط كان رابط Safe الصحيح (S10).
- البيانات التي وُقّعت فعلياً كانت `delegatecall` إلى عقد المهاجم `0x9622…7242`، فاستبدل "عقل" المحفظة بعقد يتحكم به المهاجم `0xbDd0…9516`، ثم سُحب كل شيء (S9).
- ⚠️ **متضارب:** هل أظهرت محافظ Ledger الصلبة البيانات الحقيقية ولم تُراجع (blind signing)؟ المصادر مختلفة. في السكريبت نقول: "الشاشة أظهرت شيئاً، والتوقيع كان على شيء آخر"، ونذكر أن جهاز التوقيع لم يكشف الفرق بوضوح كافٍ، دون اتهام أي شخص.

## 4. نقاط لا نقولها

- ❌ **لم تعد Bybit "أكبر سرقة في التاريخ"**: سرقة Binance في 29 أكتوبر 2026 (~6.3 مليار $) تجاوزتها. الصيغة الصحيحة: "كانت أكبر سرقة كريبتو مسجّلة حتى أكتوبر 2026". (تجنباً للخطأ أو الضرر)

- ❌ لا نقول "Bybit اختُرقت". الأدق: "أموال Bybit سُرقت عبر اختراق مزوّد خدمة اسمه Safe{Wallet}". التحقيقات لم تجد ثغرة في بنية Bybit.
- ❌ لا نسمّي "Developer1" ولا نخمّن هويته.
- ❌ لا نشرح كيف يُكتب كود الحقن ولا خطوات الاختراق القابلة للتكرار (سياسة YouTube بشأن المحتوى الضار).
- ❌ لا نزوّر ختم FBI ولا شعاره. نعرض لقطة حقيقية من صفحة IC3 مع ذكر المصدر.
- ❌ لا نقول إن أموال Bybit تحديداً "مولت صاروخ كذا". تقرير MSMT يتحدث عن العائدات عموماً.

## 5. قائمة المصادر

| # | المصدر | النوع | الرابط |
|---|---|---|---|
| S1 | FBI/IC3 PSA I-022625-PSA، 26 فبراير 2025 | ✅ حكومي | https://www.ic3.gov/PSA/2025/PSA250226 |
| S2 | Bybit — Security Incident Timeline | ✅ رسمي (الطرف المتضرر) | https://www.bybit.com/en/learn/this-week-in-bybit/bybit-security-incident-timeline |
| S3 | Safe Ecosystem Foundation statement | ✅ رسمي (الطرف المخترَق) | https://safe.global/blog/safe-ecosystem-foundation-statement |
| S4 | Rekt — "Not So Safe" | 🟡 | https://rekt.news/not-so-safe |
| S5 | The Hacker News، 7 مارس 2025 (ملخص بيان Safe/Mandiant) | 🟡 | https://thehackernews.com/2025/03/safewallet-confirms-north-korean.html |
| S6 | Elastic Security Labs — "Bit ByBit" | 🟡 تقني | https://www.elastic.co/security-labs/threat-command/bit-bybit |
| S7 | Sygnia — investigation blog + case study | 🟡 تقني (طرف محقق) | https://www.sygnia.co/blog/sygnia-investigation-bybit-hack/ |
| S8 | IBTimes (أرقام Nansen) | 🟡 | https://ibtimes.com/bybit-hack-how-14b-exploit-happened-funds-recovered-whos-responsible-3764817 |
| S9 | NCC Group — In-depth technical analysis | 🟡 تقني | https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/ |
| S10 | Benzinga — Zhou: "masked transaction" | 🟡 | https://benzinga.com/markets/cryptocurrency/25/02/43886224/bybit-founder-confirms-1-4-billion-ethereum-hack-blames-masked-transaction |
| S11 | Decrypt / Cointelegraph — السحوبات والبث المباشر | 🟡 | https://cointelegraph.com/news/crypto-exchange-bybit-withdrawals-processed-after-hack-ben-zhou |
| S12 | Cointelegraph — الغسيل في 10 أيام | 🟡 | https://cointelegraph.com/news/bybit-hacker-launders-1-billion-stolen-funds |
| S13 | CNBC، 24 فبراير 2025 | 🟡 | https://www.cnbc.com/2025/02/24/bybit-replenished-reserves-after-record-breaking-1point5-billion-hack.html |
| S14 | Cointelegraph — 20% "gone dark" | 🟡 | https://cointelegraph.com/news/bybit-hack-280m-untraceable-1b-trackable-thorchain-okx-exch |
| S15 | CryptoSlate — Safe internal investigation | 🟡 | https://cryptoslate.com/safes-internal-investigation-reveals-developers-laptop-breach-led-to-bybit-hack/ |
| S16 | FinanceFeeds — eXch والاسترداد | 🟡 | https://financefeeds.com/bybit-has-recovered-48-4-million-from-its-1-5-billion-lazarus-hack/ |
| S17 | TechCrunch — Chainalysis H1 2025 | 🟡 | https://techcrunch.com/2025/07/17/north-korean-hackers-blamed-for-record-spike-in-crypto-thefts-in-2025/ |
| S18 | WorldECR — تقرير MSMT، أكتوبر 2025 | 🟡 | https://www.worldecr.com/news/north-korea-stole-2-84b-in-crypto-over-21-months-allied-monitoring-team-reports/ |
| S19 | Fortune — Chainalysis، ديسمبر 2025 | 🟡 | https://fortune.com/2025/12/18/north-korea-stole-a-record-amount-of-crypto/ |
| S20 | Decrypt عبر Yahoo Finance، 10 أغسطس 2026 — الدعوى المدنية | 🟡 | https://finance.yahoo.com/markets/crypto/articles/bybit-sues-north-korea-over-090400772.html |
| S21 | CSIS — The ByBit Heist and the Future of U.S. Crypto Regulation | 🟡 تحليلي | https://www.csis.org/analysis/bybit-heist-and-future-us-crypto-regulation |
| S23 | **سرقة Binance (29 أكتوبر 2026، حوالي 6.3 مليار $)**، صارت أكبر سرقة كريبتو مسجّلة، والتقارير تربطها بـ TraderTraitor. Wikipedia «2026 Binance hack»، NPR 31 أكتوبر 2026، CNBC 29 و30 أكتوبر 2026. ⚠️ الوقائع ما زالت تتغير | 🟡 | https://www.npr.org/2026/10/31/nx-s1-6024426/binance-crypto-heist-cyber-criminals-north-korea |
| S22 | بيان FBI وDC3 والشرطة اليابانية (NPA)، 23 ديسمبر 2024: TraderTraitor وراء سرقة DMM Bitcoin (4,502.9 BTC، ~308 مليون $، عبر مسؤول توظيف مزيف على LinkedIn وموظف في Ginco). ابحث في fbi.gov عن: "TraderTraitor Responsible for Theft of $308 Million USD from Bitcoin.DMM.com". تغطية: The Record | ✅ (الأصل) / 🟡 | https://therecord.media/fbi-largest-crypto-hack-2024-tradertraitor |

## 6. قبل النشر: ما يجب التحقق منه من المصدر الأصلي

1. ⚠️ ملف تقرير Sygnia أو Mandiant الأصلي: توقيت إعادة رفع الكود النظيف (98 ثانية أم دقيقتان). موقع Sygnia رفض الاتصال الآلي، فافتحه يدوياً.
2. ⚠️ بيان BKA الألماني عن eXch: التاريخ الدقيق والمبلغ.
3. ⚠️ ملف الدعوى في D.D.C. على CourtListener: رقم القضية، تاريخ الأمر القضائي، والرقم الدقيق لنسبة "غير القابل للتتبع".
4. ⚠️ PDF تقرير MSMT الأصلي لاقتباس الجملة عن أسلحة الدمار الشامل حرفياً.
5. ✅ رابط معاملة الاختراق على Etherscan لعرض التوقيت 14:13:35 UTC.
