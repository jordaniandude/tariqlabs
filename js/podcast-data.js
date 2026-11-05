// ─── PODCAST DATA ────────────────────────────────────────────────
// To add an episode, add an object at the TOP of EPISODES (newest first),
// then run:  node scripts/build-podcast.js
//
// Every piece of text is bilingual: { ar: "...", en: "..." }.
//   n:         episode number
//   slug:      URL slug → /podcast/<slug>/
//   id:        YouTube video ID (the part after ?v= or /embed/)
//   cat:       one of the keys in CATEGORIES below
//   title:     { ar, en }
//   guest:     { ar, en }   guest name(s) as shown on the episode
//
// OPTIONAL (sections without data are simply not rendered):
//   quotes:    [{ ar, en, t: "12:40" }, ...]   verbatim guest quotes (t = timestamp, optional)
//   dek:       { ar, en }   one-line subtitle shown under the title (keep `title` short)
//   moreQuotes:[...]  spare quotes, not rendered (pages show 3)
//   summary:   { ar, en }   1–3 paragraphs (separate paragraphs with a blank line)
//   takeaways: [{ ar, en }, ...]                      4–7 items
//   chapters:  [{ t: "05:30", title: { ar, en } }, ...]
//   guestBio:  { ar, en }   only facts you have verified
//   guestLinks:[{ label: "LinkedIn", url: "https://..." }, ...]
//   guestImage:"../../images/guests/name.jpg"  (only with the guest's permission)
//   resources: [{ label: { ar, en }, url }, ...]
//   related:   [episode numbers]      courses: [{ label: { ar, en }, url }]
//   date:      "YYYY-MM-DD"
//   buzzsprout:link to the audio episode on podcast.tariqlabs.com
//
//   multiGuest:true  → quotes aren't attributed to a name unless the quote has `by: { ar, en }`
//   draft:     true  → page is shareable but stays noindex / out of the sitemap until you remove it
//
// An episode page is PUBLISHED (indexed, in sitemap, linked from the grid)
// only when it has a slug, a summary in BOTH languages, and is not a draft. Until then the
// page is generated as noindex so thin pages never go live.
const SHOW = {
  name: { ar: "تقني بحت", en: "Tech Pure" },
  url: "https://tariqlabs.com/podcast/",
  youtubePlaylist:
    "https://www.youtube.com/playlist?list=PLhzMa4IMmEUvEsQodODo0Tii8ug3j0Gac",
};

const CATEGORIES = {
  "ai-data": { en: "AI & Data", ar: "الذكاء الاصطناعي والبيانات" },
  software: { en: "Software Engineering", ar: "هندسة البرمجيات" },
  careers: { en: "Tech Careers", ar: "المسار المهني" },
  startups: { en: "Startups", ar: "ريادة الأعمال" },
  emerging: { en: "Security & Emerging Tech", ar: "الأمن والتقنيات الناشئة" },
  stories: { en: "Stories from Arab Engineers", ar: "قصص مهندسين عرب" },
};

// Pick the text for a language; falls back to the other one if missing.
const L = (v, lang) => (typeof v === "string" || !v ? v : v[lang] || v.ar || v.en);

const EPISODES = [
  {
    "n": 35,
    "slug": "competitive-programming-in-jordan",
    "id": "1J5xD8MeguI",
    "title": {
      "ar": "البرمجة التنافسية في الأردن",
      "en": "Competitive Programming in Jordan"
    },
    "dek": {
      "ar": "التدريب والتفرّغ والتوازن مع الدراسة — وهل ما زالت البرمجة التنافسية مهمة في عصر الذكاء الاصطناعي؟",
      "en": "Training, dedication and balancing studies — and does competitive programming still matter in the AI era?"
    },
    "guest": {
      "ar": "د. ملك عبد الله وم. محمد عبد الله وإبراهيم الربيع",
      "en": "Dr. Malak Abdullah and Eng. Mohammad Abdullah and Ibrahim Al-Rabie"
    },
    "cat": "software",
    "multiGuest": true,
    "draft": true,
    "guestBio": {
      "ar": "د. ملك عبد الله: عضو هيئة تدريس في جامعة العلوم والتكنولوجيا الأردنية، ومدربة الفرق التنافسية في الجامعة. م. محمد عبد الله: مهندس برمجيات، بطل سابق في البرمجة التنافسية في الأردن (ميداليات برونزية وفضية وذهبية في JCPC) ومدرب في ACM Chapter بالجامعة. إبراهيم الربيع: طالب علوم حاسوب في جامعة العلوم والتكنولوجيا الأردنية، بطل الأردن في JCPC ثلاث سنوات متتالية.",
      "en": "Dr. Malak Abdullah: Faculty member at Jordan University of Science and Technology (JUST) and coach of the university's competitive programming teams. Eng. Mohammad Abdullah: Software engineer, former Jordanian competitive programming champion (JCPC bronze, silver and gold medals) and coach at the university's ACM Chapter. Ibrahim Al-Rabie: Computer science student at JUST, three-time consecutive JCPC (Jordan) champion."
    },
    "quotes": [
      {
        "t": "0:43:17",
        "ar": "أكيد عندي سرعة تعلم كويسة، أكيد عندي باك جراوند كويس في الرياضيات. بس ما أتوقع إنه هي اللي عملت فارق، أتوقع إنه أكبر شيء عمل فارق هو بس نقطة الاهتمام وقديش بحط وقت.",
        "en": "Sure, I have a decent learning speed and a good background in math. But I don't think that's what made the difference. I think the biggest thing was simply how interested I am and how much time I put in.",
        "by": {
          "ar": "إبراهيم الربيع",
          "en": "Ibrahim Al-Rabie"
        }
      },
      {
        "t": "1:05:25",
        "ar": "اسمها مسابقة تنافسية، يعني لازم دائماً تتنافس، لازم تضلك دائماً في القمة. متى ما نسيت حالك شهرين، بيجي غيرك وبياخذ مكانك.",
        "en": "It's called a competitive contest, which means you must always compete and always stay at the top. The moment you forget yourself for two months, someone else comes and takes your place.",
        "by": {
          "ar": "د. ملك عبد الله",
          "en": "Dr. Malak Abdullah"
        }
      },
      {
        "t": "1:45:22",
        "ar": "الـ AI أكيد رح يكتب كود أحسن منك، لكن ما بفكر أحسن منك. يعني الـ AI أكيد هو رح يكتب كود أدق منك، إنت ممكن تنسى semicolon، هو مش رح ينسى semicolon.",
        "en": "AI will certainly write better code than you, but it won't think better than you. It will write more precise code, since you might forget a semicolon and it won't.",
        "by": {
          "ar": "م. محمد عبد الله",
          "en": "Eng. Mohammad Abdullah"
        }
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق ثلاثة من مجتمع البرمجة التنافسية في جامعة العلوم والتكنولوجيا الأردنية: الدكتورة ملك عبد الله التي تدرّب الفرق منذ 2011، والمهندس محمد عبد الله البطل السابق ومدرب النادي حالياً، والطالب إبراهيم الربيع بطل الأردن ثلاث سنوات متتالية. يحكون كيف بدأت المسابقات في الأردن وكيف استعانت الجامعة بمدربين من مصر، وكيف تأسس ACM Chapter في الجامعة تحت مظلة قسم علوم الحاسوب.\n\nتتناول الحلقة ما الذي يصنع متسابقاً متفوقاً، وتكشف أن الاهتمام والوقت اليومي المنتظم أهم من الموهبة، وتناقش صعوبة الموازنة بين الدراسة والتدريب وأثر الانقطاع، ودور المدرب الإداري والفني، والفرق بين أسئلة JCPC و ICPC، ولماذا يحتاج العرب إلى التركيز على ICPC نفسه.\n\nفي الجزء الأخير تتحدث الدكتورة ملك عن دور المدارس والشركات والدولة في دعم المتفوقين، ويشرح محمد لماذا ازدادت أهمية حل المسائل في عصر الذكاء الاصطناعي. الحلقة مناسبة لطلاب علوم الحاسوب والهندسة، ولمن يفكر بدخول البرمجة التنافسية، وللأكاديميين والأهالي المهتمين بتنمية هذا المجال.",
      "en": "In this episode Tariq hosts three members of the competitive programming community at Jordan University of Science and Technology: Dr. Malak Abdullah, who has coached the university's teams since 2011; Eng. Mohammad Abdullah, a former champion and now a coach at the club; and Ibrahim Al-Rabie, a student who has been Jordan's JCPC champion three years in a row. They explain how the contests started in Jordan, how the university brought in coaches from Egypt, and how the ACM Chapter was set up under the Computer Science department.\n\nThe conversation covers what makes a top competitor, arguing that sustained daily interest and time matter more than talent. It also looks at the difficulty of balancing studies with training and the cost of taking breaks, the administrative and technical sides of coaching, the differences between JCPC and ICPC problems, and why Arab teams need to focus on ICPC-style problems.\n\nIn the final part, Dr. Malak discusses what schools, companies and the state could do to support top students, and Mohammad explains why problem solving matters even more in the age of AI. It is a good listen for computer science and engineering students, anyone thinking of entering competitive programming, and educators or parents who want to grow the field."
    },
    "takeaways": [
      {
        "ar": "الاهتمام المستمر وعدد ساعات التدريب أهم من الموهبة: إبراهيم يضع في المتوسط من ساعتين إلى ثلاث ساعات يومياً منذ ثلاث سنوات، وهو يرى أن معظم من بدأ معه توقفوا قبل أن يزداد اهتمامهم.",
        "en": "Sustained interest and hours of practice matter more than talent: Ibrahim puts in roughly two to three hours a day on average for three years, and notes that most of those who started alongside him quit before their interest had a chance to grow."
      },
      {
        "ar": "الانقطاع يضرّ التنافسية: ترى الدكتورة ملك أن أي انقطاع لعدة أشهر يضعف الشغف والدافعية ويسمح لغيرك بأن يسبقك، وأن المسابقة بطبيعتها تتطلب البقاء في القمة باستمرار.",
        "en": "Breaks hurt your competitive edge: Dr. Malak says even a few months away weakens motivation and lets others overtake you, since a competition requires staying at the top continuously."
      },
      {
        "ar": "الموازنة بين الدراسة والبرمجة التنافسية صعبة، والطلاب الذين يركزون على الاثنتين يحتاجون دعماً من الجامعة، مثل تسهيل تعويض الامتحانات والغياب عند السفر للمسابقات.",
        "en": "Balancing studies and competitive programming is hard, and students who commit to both need university support, such as flexible make-up exams and absences when traveling to contests."
      },
      {
        "ar": "للمدرب دوران: دور إداري وتنظيمي (اختيار الفرق، المسابقات، السفر، التمويل) ودور فني في تدريب الخوارزميات، ويُفضّل أن يكون المدرب الفني من يشارك أو شارك فعلياً في المسابقات؛ وتفتقر الجامعات العربية غالباً إلى هذا الجيل من المدربين.",
        "en": "A coach plays two roles: an organizational one (selecting teams, running contests, travel, funding) and a technical one (training algorithms), ideally by someone who has actually competed; Arab universities often still lack this generation of coaches."
      },
      {
        "ar": "هناك فرق بين JCPC و ICPC: أسئلة المسابقات الإقليمية والوطنية تعتمد أكثر على معرفة خوارزميات وهياكل بيانات محددة، بينما يركز ICPC على مهارة حل المشاكل وأفكار قد لا تعرفها مسبقاً؛ والتركيز على الأول وحده يضعف الأداء في الثاني.",
        "en": "JCPC and ICPC differ: regional and national contests lean on knowing specific algorithms and data structures, while ICPC emphasizes raw problem-solving and ideas you may not have seen before; training only for the former hurts ICPC results."
      },
      {
        "ar": "تأخذ الدكتورة ملك مسألة اكتشاف الطلاب مبكراً بجدية: أقام النادي مسابقات لنحو ألف طالب سنة أولى ضمن مادة مدخل، وتتمنى أن تبدأ المدارس بتعليم حل المشاكل مبكراً وأن تحفّز الشركات والدولة المتفوقين بجوائز ومنح.",
        "en": "Dr. Malak stresses early discovery: the club ran contests for about a thousand first-year students tied to an introductory course, and she hopes schools will teach problem solving earlier and that companies and the state will reward top performers with prizes and scholarships."
      },
      {
        "ar": "برأي محمد، الذكاء الاصطناعي رفع قيمة متسابق البرمجة: الآلة تكتب الكود، لكن المبرمج الذي يحل المسائل يفكر بالتصميم ويكتشف الأخطاء ويراجع عمل الذكاء الاصطناعي، وهو ما يشبه دور المبرمج الأعلى خبرة.",
        "en": "In Mohammad's view, AI has raised the value of competitive programmers: machines write the code, but someone who solves problems can design, spot bugs and review AI output, much like a senior engineer."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيوف",
          "en": "Introduction and the guests"
        }
      },
      {
        "t": "3:37",
        "title": {
          "ar": "خلفيات الضيوف: ملك ومحمد وإبراهيم",
          "en": "The guests' backgrounds: Malak, Mohammad and Ibrahim"
        }
      },
      {
        "t": "11:16",
        "title": {
          "ar": "كيف بدأت البرمجة التنافسية في الجامعة ودور المدربين المصريين",
          "en": "How competitive programming started at the university and the role of Egyptian coaches"
        }
      },
      {
        "t": "18:45",
        "title": {
          "ar": "محمد: اختيار تخصص تقنية المعلومات وتأثير الأخت والأهل",
          "en": "Mohammad: choosing IT and the influence of his sister and family"
        }
      },
      {
        "t": "23:10",
        "title": {
          "ar": "تأسيس ACM Chapter في الجامعة وعلاقته بالقسم",
          "en": "Founding the university's ACM Chapter and its relationship with the department"
        }
      },
      {
        "t": "36:35",
        "title": {
          "ar": "أثر البرمجة التنافسية على العلامات والمعدل",
          "en": "The effect of competitive programming on grades"
        }
      },
      {
        "t": "38:58",
        "title": {
          "ar": "سر تفوق إبراهيم: الاهتمام والوقت ودور أخيه",
          "en": "Ibrahim's edge: interest, time and his brother's role"
        }
      },
      {
        "t": "53:26",
        "title": {
          "ar": "قصة محمد: التحدي والشغف والتدريب",
          "en": "Mohammad's story: challenge, passion and training"
        }
      },
      {
        "t": "1:03:29",
        "title": {
          "ar": "الموازنة بين الدراسة والبرمجة التنافسية وخطر الانقطاع",
          "en": "Balancing studies and competitive programming, and the risk of breaks"
        }
      },
      {
        "t": "1:10:51",
        "title": {
          "ar": "ما معنى مدرب الفريق: الدور الإداري والفني",
          "en": "What a coach does: organizational and technical roles"
        }
      },
      {
        "t": "1:26:42",
        "title": {
          "ar": "مستويات المسابقات: JCPC و ICPC والفروق بين أسئلتها",
          "en": "Contest levels: JCPC, ICPC and how their problems differ"
        }
      },
      {
        "t": "1:33:39",
        "title": {
          "ar": "كيف ننافس عالمياً: المدارس والشركات والحوافز",
          "en": "How to compete globally: schools, companies and incentives"
        }
      },
      {
        "t": "1:40:08",
        "title": {
          "ar": "أهمية البرمجة التنافسية في عصر الذكاء الاصطناعي",
          "en": "Why competitive programming matters in the AI era"
        }
      },
      {
        "t": "1:46:04",
        "title": {
          "ar": "الاستعداد لـ ICPC في الأقصر وكلمات الختام",
          "en": "Preparing for ICPC in Luxor and closing remarks"
        }
      }
    ],
    "moreQuotes": [
      {
        "t": "1:42:32",
        "ar": "نحن مش مجرد ناس بتكتب كود، نحن الناس اللي بتفكر واللي بتكتشف الأخطاء.",
        "en": "We are not just people who write code. We are the people who think and who catch the mistakes."
      },
      {
        "t": "1:44:26",
        "ar": "أنا لليوم أصعب التحديات اللي واجهتها كانت بالبروبلم سولفينج مش بالشركة. بالشركة بحس حياتي صارت أسهل بكثير من ورا إنه أنا كل التجارب والأشياء والأزمات اللي وقعت فيها كانت بالبروبلم سولفينج.",
        "en": "To this day, the hardest challenges I've faced were in problem solving, not at the company. At work I feel life has become much easier, because all the experiences and crises I went through were in problem solving."
      }
    ]
  },
  {
    "n": 34,
    "slug": "suhaib-diab-product-management-journey",
    "id": "MIYP9b9XkEA",
    "title": {
      "ar": "رحلة صهيب ذياب في بناء المنتجات",
      "en": "Suhaib Diab's Journey in Building Products"
    },
    "dek": {
      "ar": "من مواقع الجامعات إلى Booking.com: ثقافة التجارب، والعمل مع المهندسين، وكيف يتغيّر دور مدير المنتج مع الذكاء الاصطناعي",
      "en": "From university websites to Booking.com: experiment culture, working with engineers, and how AI changes the product manager's role"
    },
    "guest": {
      "ar": "صهيب ذياب",
      "en": "Suhaib Diab"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "مدير منتجات ورائد أعمال أردني؛ عمل في Booking.com و Foodics و Eneco، وكان في طماطم قبل أن يغادرها لتحدٍ جديد.",
      "en": "Jordanian product leader and entrepreneur; worked at Booking.com, Foodics and Eneco, and was at Tamatem before leaving for a new venture."
    },
    "quotes": [
      {
        "t": "1:07:05",
        "ar": "كانت بوكينج الكلتشر الرئيسي تاعها إنه Opinions don't matter. والآراء تاعت الأشخاص ما لها معنى بغض النظر عن السنيورتي، يعني إنت كدايركتر أو كـ VP، التايتل هذا ما يعطيك الحق إنه تدفش فكرة تكون إمبلمنتد فيرسز أي حدا ثاني.",
        "en": "Booking's main culture was that opinions don't matter. People's opinions carry no weight regardless of seniority; being a director or a VP doesn't give you the right to push an idea to be implemented over anyone else's."
      },
      {
        "t": "1:10:16",
        "ar": "الغلط فيها إنك تاخذ فكرة وتصرف عليها أربع خمس شهور بعدين تفشل، هاي بتكون مشكلة. فهم كان عندهم هذا الليرنينج سبيد: تست سمول، تست فريكوينتلي، وفيل فريكوينتلي، وما تخجل من إنك تطلع فيتشرز وإكسبريمنتس ويفشلوا.",
        "en": "The mistake is taking an idea and spending four or five months on it and then it fails, that's a problem. So they had this learning speed: test small, test frequently, fail frequently, and don't be embarrassed to ship features and experiments that fail."
      },
      {
        "t": "1:31:04",
        "ar": "البرودكت مانجر في بوكينج ما كان شغله هو إنه صاحب الأفكار، لا، الأفكار كانت تيجي من الكل.",
        "en": "The product manager at Booking wasn't the one whose job was to be the owner of the ideas; no, ideas came from everyone."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق في هذه الحلقة صهيب ذياب، مدير المنتجات الذي بدأ بناء المواقع وبيعها أيام الجامعة، ثم أسس مع شركاء شبكة اجتماعية عربية فازت بجائزة الملكة رانيا للريادة وبيعت لمكتوب، وصار جزءاً من فريق «أصحاب مكتوب» الذي وصل إلى مليون مستخدم في أشهر قليلة.\n\nيتحدث صهيب بصراحة عن تجربته مع شركة ألعاب المتصفح «ويزردز» التي أغلقها بعد أربع سنوات، وعن انتقاله إلى هولندا عام 2017 للعمل في Booking.com، وكيف حضّر لمقابلاته هناك، وما تعلمه من ثقافة التجارب (experimentation) واتخاذ القرار بالبيانات. ثم ينتقل إلى تجربته في Foodics وفي شركة الطاقة Eneco، ويقارن بين الشركات الكبيرة والناشئة وطبيعة العمل مع المهندسين.\n\nتناسب الحلقة مديري المنتجات ومن يطمح لدخول هذا المجال، ومن يفكر بالانتقال للعمل في أوروبا، وكل من يريد فهم كيف تُبنى المنتجات في شركات تعتمد على التجارب والبيانات، وختاماً رأي صهيب في تأثير الذكاء الاصطناعي على دور مدير المنتج.",
      "en": "In this episode Tariq hosts Suhaib Diab, a product leader who started out building and flipping websites during university, then co-founded an Arabic social network that won the Queen Rania Award for Entrepreneurship and was sold to Maktoob, where he joined the team behind Ashab Maktoob, which reached a million users within a few months.\n\nSuhaib speaks candidly about the browser-games company Wizards, which he shut down after four years, about moving to the Netherlands in 2017 to join Booking.com, how he prepared for those interviews, and what he learned from a culture of experimentation and data-driven decisions. He then covers his time at Foodics and at the energy company Eneco, comparing large companies with scale-ups and discussing how product managers work with engineers.\n\nThe episode suits product managers and aspiring ones, anyone considering a move to work in Europe, and anyone who wants to understand how products are built at companies that run on experiments and data. It closes with Suhaib's view on how AI is changing the product manager's role."
    },
    "takeaways": [
      {
        "ar": "ابدأ بمشاريع صغيرة وأطلقها فعلياً: صهيب بنى عشرات المواقع في الجامعة، أغلبها أُغلق، لكن واحداً منها (بوابة ألعاب) فتح له أول وظيفة مدير منتج.",
        "en": "Start small projects and actually ship them: Suhaib built dozens of websites at university, most of which shut down, but one (a games portal) led to his first product manager job."
      },
      {
        "ar": "النجاح الكبير قد يأتي غير متوقع: لم يتوقع صهيب ولا مكتوب النجاح الذي حققه «أصحاب مكتوب»، فقد وصل إلى مليون مستخدم خلال أربعة إلى خمسة أشهر.",
        "en": "Big success can be unexpected: neither Suhaib nor Maktoob expected how well Ashab Maktoob would do, reaching a million users in four to five months."
      },
      {
        "ar": "صناعة الألعاب تحتاج مهارات وخبرة متعددة (هندسة، تصميم، سرد قصصي، علم نفس) ومعها حظ؛ وإدراك نقص هذه القدرات كان من أسباب إغلاق ويزردز.",
        "en": "Games need a broad skill set (engineering, design, storytelling, psychology) plus some luck; recognizing that gap was part of why Wizards was closed."
      },
      {
        "ar": "للتحضير للمقابلات: ابحث بعمق (Glassdoor والمقالات) عن طريقة عمل الشركة وأسئلتها، واحتفظ بملف من قصصك لاختيار الأنسب لكل سؤال سلوكي، فالنتيجة والطريقة مهمتان بالقدر نفسه.",
        "en": "To prepare for interviews: research deeply (Glassdoor, articles) how the company works and what it asks, and keep a document of your stories to pick the best fit for each behavioral question; the what and the how matter equally."
      },
      {
        "ar": "في Booking.com لا شيء يصل للعملاء دون تجربة (experiment)، والفكرة الفاشلة بعد أسبوعين من الاختبار ليست مشكلة، المشكلة أن تصرف أشهراً على فكرة ثم تفشل.",
        "en": "At Booking.com nothing reaches customers without an experiment; an idea that fails after two weeks of testing is fine, the real problem is spending months on an idea that then fails."
      },
      {
        "ar": "مدير المنتج القادم من خلفية تقنية يبني الثقة مع المهندسين أسرع، ويقنعهم بفرضياته بفعالية أكبر، وأفضل الأفكار تأتي من الفريق كله وليس من مدير المنتج وحده.",
        "en": "A product manager with a technical background builds trust with engineers faster and persuades them more effectively; good ideas come from the whole team, not just the PM."
      },
      {
        "ar": "مع الذكاء الاصطناعي تتقارب أدوار مدير المنتج والمهندس والمصمم، وتزداد أهمية التأكد من أنك تبني الشيء الصحيح، لأن بناء الشيء نفسه صار أسرع وأرخص.",
        "en": "With AI, the PM, engineer and designer roles are converging, and making sure you are building the right thing matters more because building itself has become faster."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيف صهيب ذياب",
          "en": "Introduction to guest Suhaib Diab"
        }
      },
      {
        "t": "4:24",
        "title": {
          "ar": "الحياة والتأقلم في هولندا",
          "en": "Life and settling in the Netherlands"
        }
      },
      {
        "t": "10:24",
        "title": {
          "ar": "البدايات: بناء المواقع وبيعها أيام الجامعة",
          "en": "Early days: building and selling websites at university"
        }
      },
      {
        "t": "15:23",
        "title": {
          "ar": "أول وظيفة مدير منتج بعد بيع بوابة الألعاب",
          "en": "First product manager job after selling the games portal"
        }
      },
      {
        "t": "17:52",
        "title": {
          "ar": "فايع وبيعها لمكتوب وجائزة الملكة رانيا",
          "en": "Fayea, the sale to Maktoob and the Queen Rania award"
        }
      },
      {
        "t": "20:27",
        "title": {
          "ar": "أصحاب مكتوب والوصول إلى مليون مستخدم",
          "en": "Ashab Maktoob and reaching one million users"
        }
      },
      {
        "t": "22:02",
        "title": {
          "ar": "ألعاب المتصفح النصي�� وتأسيس وي��ردز",
          "en": "Text-based browser games and founding Wizards"
        }
      },
      {
        "t": "30:21",
        "title": {
          "ar": "إغلاق ويزردز ودروسها",
          "en": "Closing Wizards and its lessons"
        }
      },
      {
        "t": "34:12",
        "title": {
          "ar": "خمس سنوات في شركة الإعلام الرقمي (2012-2017)",
          "en": "Five years at the digital media company (2012-2017)"
        }
      },
      {
        "t": "48:00",
        "title": {
          "ar": "قرار الانتقال إلى Booking.com في أمستردام",
          "en": "The decision to join Booking.com in Amsterdam"
        }
      },
      {
        "t": "56:09",
        "title": {
          "ar": "كيف حضّر لمقابلات Booking.com",
          "en": "How he prepared for the Booking.com interviews"
        }
      },
      {
        "t": "1:05:42",
        "title": {
          "ar": "ثقافة التجارب واتخاذ القرار بالبيانات في Booking.com",
          "en": "Experimentation and data-driven culture at Booking.com"
        }
      },
      {
        "t": "1:20:40",
        "title": {
          "ar": "الانتقال إلى Foodics والمقارنة مع Booking.com",
          "en": "Moving to Foodics and comparing it with Booking.com"
        }
      },
      {
        "t": "1:32:40",
        "title": {
          "ar": "Eneco وعالم الطاقة، ثم الذكاء الاصطناعي ودور مدير المنتج",
          "en": "Eneco and the energy world, then AI and the PM role"
        }
      }
    ],
    "moreQuotes": [
      {
        "t": "1:08:50",
        "ar": "ما في أي شيء بيطلع على البرودكت للكستمرز بدون ما يكون إكسبريمنت. ما في، مستحيل، حتى لو كان بيور تكنيكال ثينج في الباك إند، كل شي لازم يطلع على إكسبريمنت.",
        "en": "Nothing goes out to customers in the product without being an experiment. Not possible, even if it's a purely technical thing in the back end, everything has to ship as an experiment."
      },
      {
        "t": "1:30:29",
        "ar": "كنت أقدر أحكي اللانجويج تاعت الإنجينيرز وأقدر أقنعهم بأفكاري أو الهايبوثسز تاعتي بشكل إفكتف أكثر، لأنه لما كان عندهم تكنيكال تشالنجز كنت أقدر أغوص معهم شوي.",
        "en": "I could speak the engineers' language and persuade them of my ideas or my hypotheses more effectively, because when they had technical challenges I could dive in with them a bit."
      }
    ]
  },
  {
    "n": 33,
    "slug": "amman-to-google-ireland",
    "id": "qjAa0yiRFvU",
    "title": {
      "ar": "من عمّان إلى Google أيرلندا",
      "en": "From Amman to Google Ireland"
    },
    "dek": {
      "ar": "محمد السلطي عن طريقه من المسابقات البرمجية و Amazon الأردن إلى Google في أيرلندا، وعن العمل مع الـAI",
      "en": "Mohammad Al-Salti on the path from programming contests and Amazon Jordan to Google Ireland, and on working with AI"
    },
    "guest": {
      "ar": "محمد السلطي",
      "en": "Mohammad Al-Salti"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "مهندس برمجيات في Google فرع أيرلندا (دبلن)، سابقاً في Amazon الأردن.",
      "en": "Software engineer at Google Ireland (Dublin), previously at Amazon Jordan."
    },
    "quotes": [
      {
        "t": "21:55",
        "ar": "أغلب الشغل اللي بكون في الماشين ليرنينج إنه بدك تجرب، بدك تغير في الـ preprocessing تاعك، تغير الألغوريثم اللي تستخدمها، تضلك تلعب فيه لحتى يعطيك ريزلت معين.",
        "en": "Most of the work in machine learning is that you have to experiment: change your preprocessing, change the algorithm you use, and keep playing with it until it gives you a certain result."
      },
      {
        "t": "1:11:11",
        "ar": "زاد البرودكتيفيتي وصرت تطلع بشغلات أكثر وبسرعة أكبر، بس صار يتوقع منك شغلات أكثر، وهذا طبيعي، بس بنفس الوقت بيحطك في ضغط أكبر.",
        "en": "Productivity went up and you deliver more, faster, but more is expected of you now. That is normal, but at the same time it puts you under more pressure."
      },
      {
        "t": "1:37:24",
        "ar": "الديتيلز اللي كنا نضيع وقت عليها عشان نعملها، الـ AI حيعملها لحاله. فأنا هيك بشوف المستقبل إنه كل حدا يصير عنده معلومات عامة عن كل شيء، والـ AI هو اللي يكون متخصص بالديتيلز.",
        "en": "The details we used to spend time on, the AI will do on its own. This is how I see the future: everyone has general knowledge about everything, and the AI is the one that specializes in the details."
      }
    ],
    "moreQuotes": [
      {
        "t": "53:42",
        "ar": "كل شيء في جوجل باي تيم مبني في نفس الستاندرد، فأنت لو مسكت حالك ورحت لتيم ثاني ما حتلاقي إنه في شيء اختلف عليك.",
        "en": "Everything at Google, for every team, is built to the same standard, so if you move to another team you will not find anything that is different."
      },
      {
        "t": "1:35:54",
        "ar": "هي بروبلم وأنا بدي ألاقي الطريقة الـ more optimized. فعشان هيك أنا دايماً بشوف إنه البروبلم سولفينج أساس.",
        "en": "It is a problem and I want to find the more optimized way. That is why I always see problem solving as a foundation."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق المهندس الأردني محمد السلطي، الذي تخرج في Computer Science من جامعة الأميرة سمية، وعمل أربع سنوات في Amazon فرع الأردن، ثم انتقل إلى Google في أيرلندا. يبدأ اللقاء بتوقعات كأس العالم، ثم يحكي محمد كيف انتقل من تخصص الأنيميشن إلى علوم الحاسوب، وكيف دخل عالم المسابقات البرمجية، وكيف كان تدريبه في شركة موضوع على نموذج Machine Learning للغة العربية من أكثر التجارب التي تعلم منها.\n\nبعدها يتحدث عن عمله في Amazon، خصوصاً في فريق كشف إساءة الاستخدام (Abuse Detection)، ثم عن مقابلات Google وتجميد التوظيف وعودتهم إليه بعد نحو سنة، وإجراءات السفر والفيزا، ولماذا توظف الشركات الكبيرة من خارج البلد. ويشرح عمله في فريق Content Moderation و AI Safety، والفرق بين Google و Amazon، ومنها الـmonorepo والمعايير الموحدة بين الفرق.\n\nيخصص الجزء الأكبر من النقاش للذكاء الاصطناعي في الشغل اليومي: كيف صار محمد لا يكتب الكود بيده، وكيف يتعامل مع الـAI كشريك في الحل مع بقاء المسؤولية على المهندس، وأثر ذلك على الإنتاجية والضغط. ثم يتناول الحياة في أيرلندا وثقافة العمل في Google والعرب فيها، وينتهي بنصائح للطلاب والخريجين. الحلقة مفيدة لمن يفكر بالعمل خارج الأردن أو يتساءل عن مستقبل مهندس البرمجيات.",
      "en": "Tariq hosts Jordanian software engineer Mohammad Al-Salti, who studied Computer Science at Princess Sumaya University, spent four years at Amazon Jordan and then moved to Google in Ireland. The conversation opens with World Cup predictions, then Mohammad explains how he moved from an animation major to computer science, got into programming contests, and how an internship at Mawdoo3 building a Machine Learning model for Arabic became one of the most formative experiences of his career.\n\nHe then describes his work at Amazon, mainly on an abuse-detection team, followed by his Google interviews, a hiring freeze, and the call-back about a year later. He covers the visa and relocation process and why large companies hire from outside the country. He explains his current team on Content Moderation and AI Safety, and the differences between Google and Amazon, including Google's monorepo and shared engineering standards.\n\nMost of the discussion centers on AI in daily work: why Mohammad no longer types code by hand, how he treats the AI as a partner in reaching a solution while the engineer stays responsible for it, and what this does to productivity and pressure. The episode closes with life in Ireland, Google's work culture, Arabs at Google, and advice for students and new graduates. It is useful for anyone considering a career abroad or wondering about the future of software engineering."
    },
    "takeaways": [
      {
        "ar": "شارك محمد في مسابقات البرمجة مع زملاء الجامعة وتأهل للمسابقة العربية مرتين، لكنه يقول إنه أخذها بروح التعلم أكثر من التنافس.",
        "en": "Mohammad took part in programming contests with university friends and qualified for the Arab contest twice, though he says he approached them more for learning than for competing."
      },
      {
        "ar": "تدريب لثلاثة أشهر على نموذج واحد في Machine Learning لمعالجة اللغة العربية علّمه ما لا تعلمه الكورسات: التجريب المستمر وتغيير الـpreprocessing والخوارزميات حتى تصل للنتيجة المطلوبة.",
        "en": "A three-month internship on a single Machine Learning model for Arabic taught him what courses do not: constant experimentation with preprocessing and algorithms until the results are good enough."
      },
      {
        "ar": "مقابلات Google صالحة للاستفادة منها نحو 12 شهراً، فرجع إليه الفريق في أيرلندا بعد تجميد التوظيف، وتولت جهة خارجية مرافقته في إجراءات الفيزا والسفر.",
        "en": "Google interview feedback stays valid for about 12 months, so a team in Ireland came back to him after a hiring freeze, and a third-party firm guided him through the visa and relocation paperwork."
      },
      {
        "ar": "الشركات الكبيرة تفلتر السير الذاتية على الكفاءة لا على بلد المتقدم، وغالباً تدفع تكاليف الفيزا، بينما الشركات الناشئة الصغيرة تفضل التوظيف المحلي.",
        "en": "Large companies filter candidates on qualifications, not nationality, and usually sponsor visas, while small startups tend to prefer local hires."
      },
      {
        "ar": "في Google كل الفرق تقريباً تعمل ضمن monorepo واحد وبمعايير موحدة للغات، بينما في Amazon لكل فريق خدماته ومعاييره الخاصة.",
        "en": "At Google nearly all teams work in one monorepo with shared standards per language, while at Amazon each team has its own services and conventions."
      },
      {
        "ar": "مع أدوات الـAI يكتب محمد 0% من الكود بيده، لكنه يعتمد عليه كمحاور ويراجع اقتراحاته، لأن على المهندس أن يفهم النظام والـedge cases ومعايير شركته.",
        "en": "With AI tools Mohammad writes none of his code by hand, but treats the AI as a discussion partner and reviews its proposals, because the engineer must understand the system, the edge cases and company standards."
      },
      {
        "ar": "نصيحته: واكب كل تغيير في المجال، استمر في تدريب مهارة حل المشاكل، وتعلّم المفاهيم العامة (قواعد البيانات، الـAPIs، الـcache) بدل حفظ تفاصيل كل أداة.",
        "en": "His advice: keep up with every change in the field, keep training problem solving, and learn concepts at a high level (databases, APIs, caching) rather than memorizing the details of each tool."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وبداية اللقاء",
          "en": "Introduction and opening"
        }
      },
      {
        "t": "2:14",
        "title": {
          "ar": "توقعات كأس العالم",
          "en": "World Cup predictions"
        }
      },
      {
        "t": "8:49",
        "title": {
          "ar": "الدخول إلى عالم التكنولوجيا",
          "en": "Getting into technology"
        }
      },
      {
        "t": "17:11",
        "title": {
          "ar": "أثر التدريب في شركة موضوع",
          "en": "The impact of the Mawdoo3 internship"
        }
      },
      {
        "t": "24:50",
        "title": {
          "ar": "العمل في Amazon",
          "en": "Working at Amazon"
        }
      },
      {
        "t": "30:59",
        "title": {
          "ar": "التقديم إلى Google في أوروبا",
          "en": "Applying to Google in Europe"
        }
      },
      {
        "t": "35:14",
        "title": {
          "ar": "إجراءات السفر وتوظيف الأجانب",
          "en": "Relocation and hiring from abroad"
        }
      },
      {
        "t": "43:24",
        "title": {
          "ar": "الانضمام لفرق Google",
          "en": "Joining Google teams"
        }
      },
      {
        "t": "47:57",
        "title": {
          "ar": "فريق Content Moderation والـAI",
          "en": "Content moderation team and AI"
        }
      },
      {
        "t": "51:48",
        "title": {
          "ar": "الفرق بين Google و Amazon",
          "en": "Google vs Amazon"
        }
      },
      {
        "t": "55:58",
        "title": {
          "ar": "لغات البرمجة المفضلة",
          "en": "Preferred programming languages"
        }
      },
      {
        "t": "1:02:59",
        "title": {
          "ar": "مستقبل مهندسي البرمجيات",
          "en": "The future of software engineers"
        }
      },
      {
        "t": "1:10:37",
        "title": {
          "ar": "أثر الـAI على الإنتاجية",
          "en": "AI and productivity"
        }
      },
      {
        "t": "1:15:46",
        "title": {
          "ar": "الجنسية الأيرلندية وحبهم لفلسطين",
          "en": "Irish citizenship and support for Palestine"
        }
      },
      {
        "t": "1:19:57",
        "title": {
          "ar": "الحياة وثقافة العمل في Google أيرلندا",
          "en": "Life in Ireland and Google's culture"
        }
      },
      {
        "t": "1:32:19",
        "title": {
          "ar": "نصائح للنجاح والعمل في الخارج",
          "en": "Advice for a career abroad"
        }
      }
    ]
  },
  {
    "n": 32,
    "slug": "ghadi-al-ghosh-dotnet-community-lebanon-ai-coding",
    "id": "jDQj3in0sK4",
    "title": {
      "ar": "من الدعم الفني إلى قيادة الفريق التقني",
      "en": "From IT Support to Tech Lead"
    },
    "dek": {
      "ar": "بناء مجتمع .NET في لبنان، والعمل في ظروف الحرب، والبرمجة بالذكاء الاصطناعي",
      "en": "Building the .NET community in Lebanon, working through the war, and coding with AI"
    },
    "guest": {
      "ar": "غدي الغوش",
      "en": "Ghadi Al-Ghosh"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "مهندسة برمجيات وتكنيكال ليد في شركة تعمل في برمجيات الشحن البحري (الرورو)، متخصصة بـ .NET ومنتجات مايكروسوفت، ومؤسسة أول مجتمع .NET في لبنان وصانعة محتوى \"دوت نت عربي\".",
      "en": "Software engineer and technical lead at a company building software for the ro-ro (roll-on/roll-off) shipping industry; .NET and Microsoft-stack specialist, founder of the first .NET community in Lebanon and creator of the \".NET Arabic\" content page."
    },
    "quotes": [
      {
        "t": "1:11:32",
        "ar": "إذا عم بطلع هذا الشي غلط، مسؤوليتنا نصلحه. هيدا مثل الموظف، بدنا نعلمه. إذا هو ما عنده فكرة عن الكود بيس والانستركشن غلط، بطبيعة الحال ما رح يعطي ريزالت مثل ما بدنا.",
        "en": "If it's producing something wrong, it's our responsibility to fix it. It's like an employee: we have to teach it. If it has no idea about the codebase and the instructions are wrong, naturally it won't give the results we want."
      },
      {
        "t": "1:23:02",
        "ar": "كثير كريتيكال إنه نعمل شيفت للمايند ست، لأنه طول ما إنت مقتنع بالشي القديم ما رح تقدر تتقدم. لازم أول شي تقتنع إنه تغيرت الأمور وصار في شي جديد.",
        "en": "A shift in mindset is extremely critical, because as long as you're convinced by the old way you won't be able to move forward. First you have to accept that things have changed and something new has arrived."
      },
      {
        "t": "1:31:56",
        "ar": "بقول للكل تحرروا، غيروا المايند ست اللي إنتم فيه. السوفت وير ماشي عاش 20 سنة، ما رح ناخده معنا ولا حتى نعلقه بالميوزيم، نحن دائماً رح نطوره.",
        "en": "I tell everyone: free yourselves, change the mindset you're in. Software that has lived for 20 years, we won't take it with us or hang it in a museum; we will always keep evolving it."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق المهندسة اللبنانية غدي الغوش من بيروت، وهي تكنيكال ليد متخصصة بـ .NET ومنتجات مايكروسوفت. تتحدث عن الوضع في لبنان أثناء الحرب وتأثيره على العمل والمجتمع التقني، وعن واقع قطاع التكنولوجيا هناك: غياب نقابة للمعلوماتية، ضعف الدعم للطلاب والخريجين الجدد، بقاء الدولة على الورق والقلم، وصعوبات العمل عن بعد بسبب بطء الإنترنت والكهرباء.\n\nثم تروي مسيرتها: تخرجت من الجامعة اللبنانية وعملت نحو سبع سنوات في الدعم الفني، قبل أن تقرر تغيير مسارها وتتعلم C# و.NET من الصفر، وتحصل على أول شهادة من مايكروسوفت، وتبدأ بصناعة محتوى \"دوت نت عربي\" على لينكد إن، ثم تؤسس مجتمع .NET لبنان ضمن شبكة .NET Foundation العالمية. وتشرح عملها في منصة لوجستية للشحن البحري للسيارات (الرورو).\n\nويتركز الجزء الأكبر على الذكاء الاصطناعي: كيف أعاد فريقها بناء الـ codebase ليتعلمه الـ coding agent، وكيف تستخدم Claude Code و Codex، وكيف تغيّرت الإنتاجية والمراجعة والأمان، وما المهارات التي يجب أن يركز عليها الخريجون الجدد. الحلقة مفيدة للمبرمجين المبتدئين، ولمن يفكر بتغيير مساره المهني، ولقادة الفرق الذين يريدون إدخال الـ coding agents في عملهم.",
      "en": "Tariq hosts Ghadi Al-Ghosh, a Lebanese technical lead specializing in .NET and Microsoft products, speaking from Beirut. She describes how the war has affected work and the local tech community, and the state of the Lebanese tech sector: no official union for IT professionals, little support for students and new graduates, a government still running on paper, and the difficulty of remote work with slow internet and unreliable electricity.\n\nShe then walks through her own path: graduating from the Lebanese University, spending about seven years in IT support, deciding to switch careers, learning C# and .NET from scratch, earning her first Microsoft certification, and starting the \".NET Arabic\" content page on LinkedIn. That led her to found the .NET Lebanon community as an official chapter in the .NET Foundation's global network. She also explains the ro-ro car-shipping logistics platform she works on.\n\nMost of the second half is about AI: how her team restructured its codebase so a coding agent can learn it, how she uses Claude Code and Codex, what changed in productivity, code review and security, and which skills new graduates should focus on. It is useful for junior developers, people considering a career change, and team leads looking to bring coding agents into their workflow."
    },
    "takeaways": [
      {
        "ar": "إذا لم يجد الخريج عملاً في مجاله، فالبدء بأي وظيفة قريبة من الحاسوب يمنحك موطئ قدم، لكن تغيير المسار لاحقاً ممكن إذا وضعت خطة تعلم واضحة وبدأت من الصفر.",
        "en": "If a graduate cannot find a job in their field, starting in any computer-related role gives a foothold, and a later switch is still possible with a clear learning path and starting from zero."
      },
      {
        "ar": "المحتوى والمشاركة العلنية يفتحان الأبواب: منشور \"From Zero to Hero\" على لينكد إن ومتابعتها لنشر ما تتعلمه قادا إلى وظيفتها كمطورة C# مبتدئة.",
        "en": "Sharing publicly opens doors: her \"From Zero to Hero\" LinkedIn post and steady posting about what she was learning led to her first C# developer job."
      },
      {
        "ar": "لبدء مجتمع تقني رسمي في بلدك يمكنك التواصل مع منظمة مثل .NET Foundation، فهي تطلب تنظيم أول ميت أب لتنضم إلى شبكتها العالمية؛ وقد احتاجت غدي إلى عدة رسائل بريد قبل الرد.",
        "en": "To start an official tech community in your country you can approach an organization like the .NET Foundation, which asks you to run a first meetup before joining its global network; Ghadi needed several emails before getting a reply."
      },
      {
        "ar": "عند استخدام الـ coding agents، الاستثمار في التعليمات والـ skills وملفات md وتبسيط الـ codebase (مثلاً دمج عدة repositories وإزالة المكتبات الخارجية المشكلة) يجعل الـ AI يتعلم المشروع ويعطي نتائج أفضل.",
        "en": "With coding agents, investing in instructions, skills and md files and simplifying the codebase (for example merging multiple repositories and removing problematic external libraries) lets the AI learn the project and produce better results."
      },
      {
        "ar": "الجودة تعتمد على التخطيط وجلسات الـ brainstorming قبل كتابة الكود؛ تستخدم غدي Claude Code و Codex معاً للحصول على رأي ثانٍ في الخطة، وتحتفظ بمراجعة بشرية على كل PR مع فحص خاص للأمان والبيانات.",
        "en": "Quality depends on planning and brainstorming before code is written; Ghadi uses Claude Code and Codex together for a second opinion on the plan, and keeps a human in the loop on every PR with extra checks on security and data."
      },
      {
        "ar": "إنتاجية الفريق ارتفعت: الميزة التي كانت تستغرق أسابيع صارت تستغرق أياماً، وفتح ذلك المجال لتحسينات كانت مؤجلة مثل تحديث الـ UI والاختبارات؛ والمشكلة الجديدة هي مراجعة كم كبير من الكود المولّد.",
        "en": "Team productivity rose: features that took weeks now take days, which made room for postponed improvements such as UI refreshes and testing; the new bottleneck is reviewing the large volume of generated code."
      },
      {
        "ar": "للخريجين الجدد: الفضول وطرح الأسئلة وتعلم كيفية دمج أدوات الـ AI في العمل أهم من لغة البرمجة نفسها، والشركات تبحث عن أشخاص يستفيدون من أحدث الأدوات لرفع إنتاجيتهم.",
        "en": "For new graduates: curiosity, asking questions and learning to integrate AI tools into your work matter more than the programming language itself, and companies look for people who use the latest tools to raise their productivity."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيفة غدي الغوش",
          "en": "Introduction to guest Ghadi Al-Ghosh"
        }
      },
      {
        "t": "2:47",
        "title": {
          "ar": "الحرب في لبنان وتأثيرها على الحياة والعمل",
          "en": "The war in Lebanon and its impact on life and work"
        }
      },
      {
        "t": "7:49",
        "title": {
          "ar": "واقع قطاع التقنية في لبنان: الجامعات والمجتمعات والدولة",
          "en": "The Lebanese tech sector: universities, communities and the state"
        }
      },
      {
        "t": "15:57",
        "title": {
          "ar": "سوق الوظائف وتأثير الذكاء الاصطناعي على التوظيف",
          "en": "The job market and AI's effect on hiring"
        }
      },
      {
        "t": "21:58",
        "title": {
          "ar": "العمل في برمجيات الشحن البحري للسيارات (الرورو)",
          "en": "Working on ro-ro car shipping software"
        }
      },
      {
        "t": "35:09",
        "title": {
          "ar": "مسيرة غدي: من الدعم الفني إلى تغيير المسار نحو .NET",
          "en": "Ghadi's journey: from IT support to switching careers into .NET"
        }
      },
      {
        "t": "41:21",
        "title": {
          "ar": "ترك الوظيفة، أول شهادة C#، وبداية لينكد إن",
          "en": "Leaving her job, first C# certification and starting on LinkedIn"
        }
      },
      {
        "t": "44:06",
        "title": {
          "ar": "بداية \"دوت نت عربي\" والتحضير للمجتمع",
          "en": "Starting \".NET Arabic\" and preparing the community"
        }
      },
      {
        "t": "46:36",
        "title": {
          "ar": "الانضمام إلى .NET Foundation وتأسيس مجتمع .NET لبنان",
          "en": "Joining the .NET Foundation and founding .NET Lebanon"
        }
      },
      {
        "t": "53:19",
        "title": {
          "ar": "لماذا .NET ومايكروسوفت، ومستقبل .NET في عصر الذكاء الاصطناعي",
          "en": "Why .NET and Microsoft, and .NET's future in the AI era"
        }
      },
      {
        "t": "1:02:05",
        "title": {
          "ar": "استخدام Claude Code و Codex وأدوات التطوير و Azure DevOps",
          "en": "Using Claude Code, Codex and Azure DevOps day to day"
        }
      },
      {
        "t": "1:11:14",
        "title": {
          "ar": "أثر الـ coding agents على الإنتاجية والأمان والمراجعة",
          "en": "Impact of coding agents on productivity, security and review"
        }
      },
      {
        "t": "1:20:40",
        "title": {
          "ar": "جعل الـ codebase مهيأً للـ AI (AI-native)",
          "en": "Making the codebase AI-native"
        }
      },
      {
        "t": "1:23:57",
        "title": {
          "ar": "نصائح للخريجين الجدد: الفضول وتغيير الـ mindset",
          "en": "Advice for new graduates: curiosity and changing mindset"
        }
      }
    ],
    "moreQuotes": [
      {
        "t": "1:27:39",
        "ar": "بعتقد إنه الشركات ما عم تفتش على ناس ثانية، عم تفتش على أشخاص تجيب فاليو، أشخاص حشرية، أشخاص بتقدر تستفيد من الـ latest tools لتحسن الـ productivity تبعتها، بغض النظر اللانجويج شو هي.",
        "en": "I think companies aren't looking for anyone else; they're looking for people who bring value, curious people who can use the latest tools to improve their productivity, regardless of which language it is."
      },
      {
        "t": "1:16:24",
        "ar": "هون بقى بدك تشتغل على السكيلز اللي بتساعدك إنك تستمر، مش الكود.",
        "en": "Here you need to work on the skills that help you keep going, not on the code."
      }
    ]
  },
  {
    "n": 31,
    "slug": "radio-active-competitive-programming-to-revolut",
    "id": "D0FfKJHn--Q",
    "title": {
      "ar": "من راديو أكتيف السوري إلى Revolut",
      "en": "From Syria's Radio Active to Revolut"
    },
    "dek": {
      "ar": "البرمجة التنافسية وبناء الفرق ونصائح المقابلات والعمل مع الذكاء الاصطناعي",
      "en": "Competitive programming, building teams, interview advice and working with AI"
    },
    "guest": {
      "ar": "حسين قره فلاح",
      "en": "Hussein Qara Fallah"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "مهندس برمجيات في Revolut، وعضو فريق Radio Active السوري للبرمجة التنافسية (الجامعة الافتراضية السورية).",
      "en": "Software engineer at Revolut and a member of Syria's Radio Active competitive programming team (Syrian Virtual University)."
    },
    "quotes": [
      {
        "t": "0:26:28",
        "ar": "أنا برأيي هذا كان غلط كبير، إنه نحن ما كنا ندرب جزء التيم ورك بحد ذاته، إنه نخلي هالناس تشتغل مع بعضها أكثر. ما بس نركز على إنه نطلع أفراد الرايتنغ تبعهم على Codeforces عالي، بس لا، إنه نطلع تيمات شغالة.",
        "en": "In my opinion that was a big mistake: we never trained the teamwork part itself, getting people to work with each other more. We shouldn't only focus on producing individuals with a high Codeforces rating, but on producing teams that actually work."
      },
      {
        "t": "1:33:08",
        "ar": "هذا خلى موضوع إنه الواحد يتعلم تقنية معينة أقل قيمة من إنه يتعلم كيف يتعلم، كيف يفكر، ويتعلم كيف يحل المشاكل، ويتعلم كيف يشتغل ضمن تيم كبير. هي السكيلز أهم بكثير من إنه يكون محترف بداتابيز معين أو يكون محترف بلغة معينة.",
        "en": "This has made learning one specific technology less valuable than learning how to learn, how to think, how to solve problems, and how to work within a big team. Those skills matter far more than being an expert in a particular database or a particular language."
      },
      {
        "t": "1:47:09",
        "ar": "الواحد لازم يكون مسؤول عن كل شيء، ما لازم الواحد ينطر حدا يعلمه. هي خطأ ارتكبته، كنت فايت ومتوقع إنه في ناس رح تعلمني، وهذا الكلام غير صحيح.",
        "en": "You have to be responsible for everything; you shouldn't wait for someone to teach you. That's a mistake I made: I went in expecting there would be people who would teach me, and that is not true."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق حسين قره فلاح، مهندس برمجيات في Revolut ويعيش في فالنسيا، وأحد أعضاء فريق Radio Active الذي فاز بمسابقة ICPC العربية عام 2018 كأول فريق غير مصري يحقق ذلك، ثم حقق عام 2019 المركز الأول إقليمياً والمركز 21 عالمياً في النهائيات العالمية في البرتغال بحل ست مسائل. يحكي حسين كيف تعرف على زميليه من خلال أولمبياد المعلوماتية في سوريا، وكيف تشكل الفريق من ثلاث جامعات مختلفة، وكيف كانوا يتقاسمون العمل داخل المسابقة.\n\nثم ينتقل الحديث إلى المسار المهني: منحة البكالوريوس في روسيا، والماجستير في السويد، والعمل في Wise في إستونيا، وصولاً إلى Revolut. يشرح حسين كيف تجري مقابلات العمل التي يفضلها (نقاش وتصميم أنظمة مصغّر بدل مسائل خوارزميات مجردة)، وكيف يستخدم أدوات الذكاء الاصطناعي مثل Claude Code في عمله، ورأيه الصريح في قيمة المسابقات البرمجية والجامعة وسوق العمل.\n\nالحلقة مناسبة لطلاب البرمجة والمشاركين في المسابقات، وللخريجين الجدد الذين يفكرون في بناء مسار مهني داخل العالم العربي أو في أوروبا، ولكل من يريد أن يسمع تجربة صادقة بعيداً عن الدعاية التي تربط المسابقات بالوظائف الكبرى.",
      "en": "In this episode Tariq hosts Hussein Qara Fallah, a software engineer at Revolut based in Valencia, and a member of the Radio Active team that won the Arab ICPC in 2018 as the first non-Egyptian team to do so. In 2019 the team took first place in its region and 21st worldwide at the ICPC World Finals in Portugal, solving six problems. Hussein explains how the three teammates met through the informatics olympiad in Syria, how the team was formed from three different universities, and how they split work during a contest.\n\nThe conversation then turns to his career path: a bachelor's scholarship in Russia, a master's in Sweden, work at Wise in Estonia, and finally Revolut. Hussein describes the interviews he prefers (discussion and scaled-down system design rather than abstract algorithm puzzles), how he uses AI tools such as Claude Code at work, and his candid views on the value of competitive programming, university, and the job market.\n\nIt is a good listen for programming students and contest participants, for fresh graduates thinking about building a career in the Arab world or in Europe, and for anyone who wants an honest account that pushes back on the hype linking contests to jobs at big companies."
    },
    "takeaways": [
      {
        "ar": "التركيز على رفع مستوى الأفراد وحده خطأ: في ICPC يتكون الفريق من ثلاثة، ويجب التدرب على العمل الجماعي، وعلى دخول مسابقات كثيرة معاً، لا على حل أكبر عدد من المسائل فقط.",
        "en": "Training individuals alone is a mistake: an ICPC team has three members, so teams need to practice working together and entering many contests as a unit, not just solving more problems each."
      },
      {
        "ar": "داخل المسابقة: يبدأ كل شخص بالمسائل التي يثق بها، ثم يناقش اثنان منكم الحل ليكتشفا الحالات الحدية، ويشرح من قرأ مسألة طويلة وغامضة فكرتها لزملائه في دقائق بدل أن يقرأها الجميع، ويمكن لأحدهم كتابة كود للتحقق من حل زميله.",
        "en": "Inside a contest: each person starts with problems they are sure of, a second person reviews a proposed solution to catch corner cases, whoever reads a long unclear statement explains it to teammates in minutes, and one member can write code to validate another's idea."
      },
      {
        "ar": "العامل النفسي مهم: الذهاب إلى المسابقة العالمية دون ما يُخسر خفف الضغط وساعدهم على تحمل بداية سيئة، بينما كان التوتر أكبر في المسابقة العربية. ويندم حسين أنه لم يرفع سقف طموحه إلى ميدالية.",
        "en": "The psychological factor matters: going to the World Finals with nothing to lose eased the pressure and helped them recover from a bad start, while the Arab contest felt more tense. Hussein regrets not aiming higher for a medal."
      },
      {
        "ar": "في مقابلات العمل، الحل البسيط مع شرح واضح لطريقة التفكير أفضل من حل معقد، وأهم ما يُقيَّم هو النقاش والتواصل وطرح الأسئلة الصحيحة حول المنتج والمتطلبات. وينصح بكتاب System Design Interview (مجلدان).",
        "en": "In job interviews a simple solution with a clear thought process beats a complex one, and what matters most is discussion, communication, and asking the right questions about the product and requirements. He recommends the book System Design Interview (two volumes)."
      },
      {
        "ar": "مع أدوات الذكاء الاصطناعي، يرى أن تعلم كيف تفكر وتحل المشاكل وتعمل ضمن فريق أكبر قيمة من إتقان تقنية أو لغة بعينها، لأن الـ stack يتغير بين الشركات. ويستخدم Claude Code ويبني له skills تحمل معرفة الـ domain الخاصة بعمله، ويرى أن الاستخدام العشوائي يحرق التوكنات والمال.",
        "en": "With AI tools, he argues that learning how to think, solve problems, and work in a large team is worth more than mastering one technology or language, since the stack changes between companies. He uses Claude Code and builds skills that carry his work-domain knowledge, noting that careless use burns tokens and money."
      },
      {
        "ar": "للمبتدئين في سوق العمل: ابحث عن الخبرة في الأماكن الصحيحة، مثل منتج ناجح ينمو، وشركة تقنية بالدرجة الأولى، ولا تنتظر من يعلمك بل تحمّل المسؤولية وابحث عن المشكلة وامتلكها. وبدء العمل مبكراً (حتى أثناء الجامعة) يسرّع المسار.",
        "en": "For people starting out: look for experience in the right places, such as a successful growing product at a tech-first company; do not wait for someone to teach you, but take ownership and go find the problem. Starting work early, even during university, speeds up the path."
      },
      {
        "ar": "المسابقات البرمجية ليست طريقاً مضموناً للوظائف أو السفر، ويصف ذلك بأنه دعاية. فوائدها الحقيقية: بيئة جيدة ومجتمع رائع وانضباط وتطوير للتفكير، ويقارن كل شخص ذلك بخياراته الأخرى بحسب ظروفه.",
        "en": "Competitive programming is not a guaranteed route to jobs or travel, which he calls hype. Its real benefits are a good community, discipline and sharper thinking, and each person should weigh that against their other options given their circumstances."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة: فريق Radio Active وإنجازاته",
          "en": "Intro: the Radio Active team and its achievements"
        }
      },
      {
        "t": "3:06",
        "title": {
          "ar": "حسين اليوم: Revolut والحياة في فالنسيا",
          "en": "Hussein today: Revolut and life in Valencia"
        }
      },
      {
        "t": "12:23",
        "title": {
          "ar": "كيف تعرف أعضاء الفريق على بعضهم",
          "en": "How the teammates met"
        }
      },
      {
        "t": "26:28",
        "title": {
          "ar": "خطأ التدريب: التركيز على الأفراد لا على العمل الجماعي",
          "en": "A coaching mistake: focusing on individuals over teamwork"
        }
      },
      {
        "t": "29:39",
        "title": {
          "ar": "تشكيل Radio Active والفوز بـ ICPC العربية 2018",
          "en": "Forming Radio Active and winning the Arab ICPC 2018"
        }
      },
      {
        "t": "34:31",
        "title": {
          "ar": "استراتيجيات الفريق داخل المسابقة",
          "en": "In-contest team strategies"
        }
      },
      {
        "t": "40:55",
        "title": {
          "ar": "النهائيات العالمية 2019 في البرتغال",
          "en": "The 2019 World Finals in Portugal"
        }
      },
      {
        "t": "49:18",
        "title": {
          "ar": "حضور الجامعات السورية وهل تنصح بالمسابقات",
          "en": "Syrian universities' presence and whether to recommend contests"
        }
      },
      {
        "t": "1:02:19",
        "title": {
          "ar": "من سوريا إلى روسيا فالسويد",
          "en": "From Syria to Russia and Sweden"
        }
      },
      {
        "t": "1:12:02",
        "title": {
          "ar": "الانتقال إلى Revolut والعمل عن بعد من إسبانيا والإقامة",
          "en": "Joining Revolut, remote work from Spain, and residency"
        }
      },
      {
        "t": "1:16:43",
        "title": {
          "ar": "مقابلات العمل وتصميم الأنظمة",
          "en": "Job interviews and system design"
        }
      },
      {
        "t": "1:25:00",
        "title": {
          "ar": "استخدام الذكاء الاصطناعي في العمل",
          "en": "Using AI at work"
        }
      },
      {
        "t": "1:40:41",
        "title": {
          "ar": "كيف ينجح تطبيق دفع في سوريا",
          "en": "What it takes for a payments app to succeed in Syria"
        }
      },
      {
        "t": "1:44:58",
        "title": {
          "ar": "نصائح مهنية للخريجين الجدد",
          "en": "Career advice for new graduates"
        }
      }
    ],
    "moreQuotes": [
      {
        "t": "0:47:47",
        "ar": "الكوميونيتي تبع المسابقة، أنا جد فخور إني كنت جزء من هالكوميونيتي، مبسوط إني شاركت إني أبنيها، مبسوط إني دربت كثير طلاب. ومبسوط بهالموضوع أكثر بكثير من إنه طلعنا الأول بمسابقة.",
        "en": "The contest community: I'm truly proud I was part of it, happy that I took part in building it, happy that I trained so many students. And I'm far happier about that than about the fact that we came first in a contest."
      },
      {
        "t": "1:23:44",
        "ar": "الإنترفيور دائماً بده يسمع حل بسيط و thought process. بس يكون في thought process وتوصل لحل بسيط، هذا أفضل شي، لأنه هيك الموضوع بيشتغل بالحياة العملية.",
        "en": "The interviewer always wants to hear a simple solution and a thought process. If there's a thought process and you arrive at a simple solution, that's the best thing, because that's how it works in real-life work."
      }
    ]
  },
  {
    "n": 30,
    "slug": "maryam-dabbousi-google-product-manager",
    "id": "8o1afgOw3ak",
    "title": {
      "ar": "من تدريب في دبي إلى جوجل أمريكا",
      "en": "From a Dubai Internship to Google US"
    },
    "dek": {
      "ar": "مريم دبوسي تحكي كيف انتقلت من الهندسة الصناعية والتسويق إلى إدارة المنتج في جوجل",
      "en": "Maryam Dabbousi on moving from industrial engineering and marketing to product management at Google"
    },
    "guest": {
      "ar": "مريم دبوسي",
      "en": "Maryam Dabbousi"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "مديرة منتج في جوجل في الولايات المتحدة.",
      "en": "Product Manager at Google in the United States."
    },
    "quotes": [
      {
        "t": "5:00",
        "ar": "كان يمكن هيدا أول مرة بعمل شي خلاني أحس بشعور بالإنجاز.",
        "en": "This was probably the first time I did something that gave me a feeling of accomplishment."
      },
      {
        "t": "1:12:18",
        "ar": "بدل ما تقعد تعد كل القصص اللي ما عندك إياهم، اقعد عد القصص اللي عندك إياهم.",
        "en": "Instead of sitting and counting everything you do not have, count the things you do have."
      },
      {
        "t": "1:46:17",
        "ar": "وين ما تروح بدك حدا يرشدك، بدك مرشد يساعدك توصل للشي اللي انت بالآخر حتوصله. فـ identify هدول العالم على بكير.",
        "en": "Wherever you go, you need someone to guide you, a mentor who helps you reach where you will eventually get to. So identify those people early."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:20:43",
        "ar": "حاسة إنه مريم من عشرة أشهر ومريم هلا شخصين كليا غير.",
        "en": "I feel that Maryam of ten months ago and Maryam now are two completely different people."
      },
      {
        "t": "1:29:18",
        "ar": "أول عالم بتشكرهم هم المهندسين والمصممين لأنه هم عملوا الشغلة، وأول واحد بتعيط عليه إذا الشغلة ما طلعت هو مدير المنتج.",
        "en": "The first people you thank are the engineers and designers because they built the thing, and the first person you shout at if it does not ship is the product manager."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق مريم دبوسي، مديرة منتج في جوجل بأمريكا، وهي خريجة الجامعة الأمريكية في بيروت (تخصص هندسة صناعية). تبدأ الحلقة بسؤال عن سبب نجاح خريجي الجامعة، وتجيب مريم عن ذلك بالأساتذة والمرشدين، والنوادي الطلابية، ومشاريع مجتمعية شاركت فيها مثل مشروع الطاقة الشمسية لقرية في عكار.\n\nثم تروي مسارها المهني: تدريب في قسم التسويق في جوجل دبي بعد أن قدّمت ثلاث مرات، وإحساس \"متلازمة المحتال\" في البداية، والعمل على Google Assistant بالعربية، وكيف لاحظ مديروها ميلها إلى المنتج فنقلوها تدريجيا إلى إدارة المنتج. تحكي أيضا عن اختبارها للّهجات في المساعد، ومبادرتها في مشكلة منتج يوتيوب بالعربية، ومقابلات الانتقال إلى المقر في الولايات المتحدة، وتجربة التأقلم مع الحياة هناك.\n\nفي الجزء الأخير تتحدث عن انتقالها إلى فريق البحث (Search) وتجربة التسوق مع الذكاء الاصطناعي، وكيف يغيّر الذكاء الاصطناعي عمل مديري المنتج، ونادي العرب في جوجل (Arabs at Google)، وتختم بنصيحتها لنفسها وهي أصغر. الحلقة مفيدة لمن يفكر بالانتقال بين الأدوار أو إلى شركات عالمية، ولمن يشعر أنه لا يستحق مكانه.",
      "en": "Tariq hosts Maryam Dabbousi, a product manager at Google in the United States and an industrial engineering graduate of the American University of Beirut. The episode opens with a question about why AUB graduates tend to do so well. Maryam points to professors and mentors who care about teaching, and to student clubs and community projects, including a solar power project for a village in Akkar.\n\nShe then walks through her career: an internship in Google Dubai's marketing team after applying three times, the impostor syndrome she felt at first, her work on Google Assistant in Arabic, and how her managers noticed her pull toward product and gradually moved her into product management. She describes testing Arabic dialects in the Assistant, taking the initiative on a broken Arabic experience in a YouTube product, the interviews to move to the US headquarters, and settling into life in California.\n\nThe last part covers her move to the Search team and AI-powered shopping, how AI is changing the product manager role, the Arabs at Google community, and the advice she would give her younger self. It is useful for anyone considering a change of role or a move to a global company, and for anyone who feels they do not deserve their seat."
    },
    "takeaways": [
      {
        "ar": "الأساتذة والمرشدون والنوادي الطلابية والمشاريع المجتمعية في الجامعة كانت من أهم ما شكّل مسارها وساعدها على اكتشاف اهتمامها بالتكنولوجيا كأداة لتكافؤ الفرص.",
        "en": "Professors, mentors, student clubs and community projects at university shaped her path and led her to see technology as a tool for equal opportunity."
      },
      {
        "ar": "قدّمت على التدريب في جوجل ثلاث مرات قبل أن تُقبل، وقبلت تدريبا بعد التخرج رغم إحساسها أنها \"متأخرة\" عن زملائها.",
        "en": "She applied three times before being accepted to the Google internship, and took an internship after graduating even though she felt behind her peers."
      },
      {
        "ar": "خلفيتها الهندسية جعلتها تُكلَّف بمشاريع تقترب من المنتج حتى وهي في التسويق، وهكذا بدأ انتقالها إلى إدارة المنتج.",
        "en": "Her engineering background got her assigned to product-oriented projects while still in marketing, which started her move into product management."
      },
      {
        "ar": "حين طُلب منها اختبار المساعد، قضت عطلة نهاية الأسبوع في توثيق الأخطاء وكتابة ملخص ومقترح لحلها بدل الاكتفاء بتسليم المهمة، وهذا ما أقنع مديرها.",
        "en": "Asked to test the Assistant, she spent a weekend documenting the problems and writing a summary and a proposal for fixing them rather than just handing in the task, which won over her manager."
      },
      {
        "ar": "عندما تشعر بمتلازمة المحتال، تكتب عشرة أسباب (إنجازات صغيرة وكبيرة) تثبت أنها يجب أن تكون في مكانها، وتسجل \"انتصارات سهلة\" صغيرة.",
        "en": "When impostor syndrome hits, she writes down ten reasons she belongs (small and large things she has done) and keeps a list of small, easy wins."
      },
      {
        "ar": "الانتقال بين الفرق داخل الشركة الواحدة يتطلب عدة مقابلات، لكنه لا يغيّر العقد أو وضع الإقامة في حالتها.",
        "en": "Moving between teams inside the same company requires several interviews, but in her case it did not change her contract or visa situation."
      },
      {
        "ar": "وجود مرشد يوجّه نظرك إلى ما تركّز عليه يصنع فرقا، وعلى الشخص أن يتعرف على هؤلاء مبكرا ولا يعتمد على نفسه وحده.",
        "en": "Having a mentor who points you to what to focus on makes a real difference, so identify such people early and do not try to do everything alone."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيفة",
          "en": "Introduction to the guest"
        }
      },
      {
        "t": "2:18",
        "title": {
          "ar": "لماذا ينجح خريجو AUB",
          "en": "Why AUB graduates succeed"
        }
      },
      {
        "t": "3:53",
        "title": {
          "ar": "النوادي ومشروع الطاقة الشمسية",
          "en": "Clubs and the solar project"
        }
      },
      {
        "t": "11:55",
        "title": {
          "ar": "التدريب في جوجل دبي",
          "en": "The Google Dubai internship"
        }
      },
      {
        "t": "16:01",
        "title": {
          "ar": "العمل على Google Assistant بالعربية",
          "en": "Working on Google Assistant in Arabic"
        }
      },
      {
        "t": "18:56",
        "title": {
          "ar": "من التسويق إلى إدارة المنتج",
          "en": "From marketing to product"
        }
      },
      {
        "t": "25:41",
        "title": {
          "ar": "مهمة اللهجات في عطلة الأسبوع",
          "en": "The dialect weekend task"
        }
      },
      {
        "t": "35:29",
        "title": {
          "ar": "كيف بدأت فكرة الانتقال لأمريكا",
          "en": "How the US move began"
        }
      },
      {
        "t": "44:50",
        "title": {
          "ar": "المقابلات والانتقال إلى كاليفورنيا",
          "en": "Interviews and moving to California"
        }
      },
      {
        "t": "1:10:20",
        "title": {
          "ar": "التعامل مع متلازمة المحتال",
          "en": "Handling impostor syndrome"
        }
      },
      {
        "t": "1:15:27",
        "title": {
          "ar": "الانتقال إلى فريق البحث والـ AI",
          "en": "Moving to Search and AI"
        }
      },
      {
        "t": "1:29:38",
        "title": {
          "ar": "الذكاء الاصطناعي ودور مدير المنتج",
          "en": "AI and the product manager role"
        }
      },
      {
        "t": "1:36:03",
        "title": {
          "ar": "مجتمع Arabs at Google",
          "en": "Arabs at Google community"
        }
      },
      {
        "t": "1:44:40",
        "title": {
          "ar": "نصيحتها لنفسها وهي أصغر",
          "en": "Advice to her younger self"
        }
      }
    ]
  },
  {
    "n": 29,
    "slug": "gaza-sky-geeks-palestine-tech-skills",
    "id": "XdJF5PBlqec",
    "title": {
      "ar": "غزة سكاي جيكس وبناء المهارات التقنية",
      "en": "Gaza Sky Geeks and Palestine's Tech Talent"
    },
    "dek": {
      "ar": "رند صافي تحكي عن برامج التدريب والمنتورشيب ودعم الشركات ومساحات العمل المشتركة في فلسطين",
      "en": "Rand Safi on Gaza Sky Geeks: training, mentorship, company support and co-working spaces in Palestine"
    },
    "guest": {
      "ar": "رند صافي",
      "en": "Rand Safi"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "سينيور بروجرام مانيجر في غزة سكاي جيكس.",
      "en": "Senior Program Manager at Gaza Sky Geeks."
    },
    "quotes": [
      {
        "t": "0:07:51",
        "ar": "في ظل هاي الصعوبة هون صراحة بتيجي أهمية التكنولوجيا. هون أهميتها وقدرتها أنا من وجهة نظري على التغلب على هاي المعيقات وعلى هاي التحديات المحيطة فينا.",
        "en": "In the middle of this hardship, this is where the importance of technology comes in. In my view, this is where its importance and its ability lie: in overcoming these obstacles and the challenges around us."
      },
      {
        "t": "0:42:27",
        "ar": "إحنا بنعلم الناس صراحة كيف يتعلموا. هي أهم مهارة. أهم سكيل أي حدا يعلمها لأي حدا هو كيف يتعلم.",
        "en": "Honestly, we teach people how to learn. That is the most important skill. The most important skill anyone can teach anyone is how to learn."
      },
      {
        "t": "1:02:25",
        "ar": "عندنا شباب وصبايا عندهم طاقات، عندنا شباب وصبايا عندهم ذكاء، محتاجين بس شوية أكسس لريسورسز.",
        "en": "We have young men and women with energy, young men and women with intelligence. They just need a little access to resources."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:52:27",
        "ar": "التعليم بالنسبة لنا هو الشيء الوحيد اللي احنا نملكه بفلسطين.",
        "en": "For us, education is the only thing we own in Palestine."
      },
      {
        "t": "0:56:16",
        "ar": "دائمًا نمي مهارة البحث عندك ودائمًا تعلم كيف تتعلم. كيف نتعلم هو أهم مهارة إحنا ممكن إننا نكتسبها.",
        "en": "Always develop your research skills and always learn how to learn. How we learn is the most important skill we can acquire."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق رند صافي، السينيور بروجرام مانيجر في غزة سكاي جيكس، وهي برنامج غير ربحي تابع لمؤسسة ميرسي كور. تبدأ رند بقصتها: كيف التقت بالبرنامج في غزة سنة 2015، ثم قادت توسعه إلى الضفة الغربية، رغم أن خلفيتها في المحاسبة وإدارة الأعمال وليست تقنية. وتصف الظروف الصعبة في فلسطين وقت التسجيل (رمضان 2026) وتأثيرها على التنقل والعمل.\n\nبعدها تشرح الحلقة تاريخ البرنامج منذ 2011 بالتعاون مع غوغل، وركائزه الثلاث: بناء المهارات التقنية، والتشبيك مع الأسواق العالمية، وبناء مجتمع يتعلم ذاتياً. وتتناول التمويل، ودعم مساحات العمل المشتركة في غزة، والتدريبات والمنتورشيب وبرنامج دعم الشركات، ومؤشرات التوظيف والدخل، والتعاون مع الجامعات الفلسطينية والمسابقات الدولية مثل ICPC، وأثر الذكاء الاصطناعي على التدريب.\n\nتنتهي الحلقة بنصائح للطلاب والخريجين، وطرق الانضمام للمجتمع كمتدرب أو مدرب أو منتور أو داعم، وقصتي نجاح من غزة. الحلقة مفيدة لكل من يهتم بتطوير القطاع التقني في فلسطين أو يريد التعلم والعمل عن بعد أو المساهمة كمدرب أو منتور.",
      "en": "Tariq hosts Rand Safi, Senior Program Manager at Gaza Sky Geeks, a non-profit program of Mercy Corps. Rand starts with her own story: she first met the program in Gaza in 2015, later led its expansion to the West Bank, and learned technology through the work even though her background is in accounting and business administration. She also describes the difficult conditions in Palestine at the time of recording (Ramadan 2026) and how they affect movement and work.\n\nThe episode then explains the program's history since 2011 with Google and its three pillars: building technical skills, connecting people to global markets, and growing a self-learning community. It covers funding, support for co-working spaces in Gaza, training and mentorship, the program for tech companies, employment and income figures, partnerships with Palestinian universities and international competitions such as ICPC, and the effect of AI on training.\n\nIt closes with advice for students and graduates, ways to join the community as a learner, trainer, mentor or donor, and two success stories from Gaza. It is useful for anyone interested in Palestine's tech sector, remote work, or volunteering as a trainer or mentor."
    },
    "takeaways": [
      {
        "ar": "تقوم فلسفة البرنامج على تعليم الناس كيف يتعلمون، وتعتبرها رند أهم مهارة يمكن أن يكتسبها المتعلم، خصوصاً في قطاع التكنولوجيا.",
        "en": "The program is built on teaching people how to learn, which Rand considers the most important skill a learner can acquire, especially in tech."
      },
      {
        "ar": "بدأ غزة سكاي جيكس سنة 2011 بالتعاون مع غوغل، وتحول من فعاليات ريادة الأعمال إلى التدريب التقني ثم العمل الحر ثم دعم الشركات.",
        "en": "Gaza Sky Geeks started in 2011 with Google and moved from entrepreneurship events to technical training, then freelancing, then support for companies."
      },
      {
        "ar": "برامج الشركات المحلية والعمل عن بعد تركز على جلب إيرادات من خارج فلسطين، لأن السوق المحلي محدود جداً.",
        "en": "The focus on remote work and on helping local companies find overseas clients comes from the limits of the small local market, with the aim of bringing revenue into Palestine."
      },
      {
        "ar": "تتابع المؤسسة خريجيها باستبيانات دورية بعد 3 و6 و9 و12 شهراً وأكثر، وتستخدم النتائج لتحسين تصميم البرامج.",
        "en": "The program follows up with graduates through surveys at 3, 6, 9, 12 months and beyond, and uses the results to improve program design."
      },
      {
        "ar": "مساحات العمل المشتركة في غزة توفر الإنترنت والكهرباء، ويدعمها البرنامج بالتكاليف التشغيلية وتحسين الاستفادة من الموارد لاستيعاب عدد أكبر من الناس.",
        "en": "Co-working spaces in Gaza provide internet and electricity, and the program supports their operating costs and helps them make better use of resources to host more people."
      },
      {
        "ar": "المنتورشيب والتدريب لا ينتهيان بنهاية الدورة التقنية، بل يستمر العمل على المهارات الشخصية حتى التوظيف.",
        "en": "Mentorship continues after a technical course ends, with work on soft skills until graduates are employed."
      },
      {
        "ar": "تنصح رند الطلاب بتنمية الفضول ومهارة البحث، وبالاهتمام بمهارات العمل ضمن فريق والتواصل والتسويق الشخصي إلى جانب المهارات التقنية.",
        "en": "Rand advises students to nurture curiosity and research skills, and to build teamwork, communication and personal-marketing skills alongside technical ones."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة الحلقة",
          "en": "Introduction"
        }
      },
      {
        "t": "1:54",
        "title": {
          "ar": "قميص غزة سكاي جيكس وإكسباند",
          "en": "The shirt and Expand"
        }
      },
      {
        "t": "0:02:28",
        "title": {
          "ar": "مسيرة رند مع البرنامج",
          "en": "Rand's path to the program"
        }
      },
      {
        "t": "0:06:41",
        "title": {
          "ar": "الوضع العام والتنقل في فلسطين",
          "en": "Daily conditions and movement"
        }
      },
      {
        "t": "0:10:39",
        "title": {
          "ar": "ميرسي كور وتاريخ البرنامج",
          "en": "Mercy Corps and the program's history"
        }
      },
      {
        "t": "0:15:24",
        "title": {
          "ar": "التمويل والفئة المستهدفة",
          "en": "Funding and target audience"
        }
      },
      {
        "t": "0:18:45",
        "title": {
          "ar": "المقرات ومساحات العمل المشتركة",
          "en": "Offices and co-working spaces"
        }
      },
      {
        "t": "0:24:40",
        "title": {
          "ar": "التدريبات وال��نتورشيب",
          "en": "Training and mentorship"
        }
      },
      {
        "t": "0:30:40",
        "title": {
          "ar": "المدربون وتسجيل التدريبات",
          "en": "Trainers and recorded courses"
        }
      },
      {
        "t": "0:34:36",
        "title": {
          "ar": "التوظيف والدخل والعمل عن بعد",
          "en": "Jobs, income and remote work"
        }
      },
      {
        "t": "0:40:13",
        "title": {
          "ar": "بناء المجتمع التقني",
          "en": "Building the community"
        }
      },
      {
        "t": "0:44:13",
        "title": {
          "ar": "ريادة الأعمال والمسابقات الدولية",
          "en": "Startups and international contests"
        }
      },
      {
        "t": "0:49:33",
        "title": {
          "ar": "التعاون مع الجامعات",
          "en": "Working with universities"
        }
      },
      {
        "t": "0:53:08",
        "title": {
          "ar": "أثر الذكاء الاصطناعي ونصائح للطلاب",
          "en": "AI's impact and advice for students"
        }
      },
      {
        "t": "0:57:10",
        "title": {
          "ar": "كيف تنضم وقصص نجاح",
          "en": "How to join, and success stories"
        }
      }
    ]
  },
  {
    "n": 28,
    "slug": "fintech-payments-nassim-al-tamimi",
    "id": "PDswD6f9nNc",
    "title": {
      "ar": "الفنتك: كيف تعمل المدفوعات",
      "en": "How Fintech and Payments Work"
    },
    "dek": {
      "ar": "نسيم التميمي يشرح طبقات النظام المالي، وشبكات البطاقات، والتحويلات البنكية، وأنواع تطبيقات الفنتك",
      "en": "Nassim Al-Tamimi on the layers of the financial system, card networks, bank transfers and the main types of fintech"
    },
    "guest": {
      "ar": "نسيم التميمي",
      "en": "Nassim Al-Tamimi"
    },
    "cat": "startups",
    "draft": true,
    "guestBio": {
      "ar": "مهندس برمجيات وقائد فرق هندسية، يقود قسم المدفوعات في شركة Medius في أوروبا.",
      "en": "Software engineer and engineering leader; leads payments at Medius in Europe."
    },
    "quotes": [
      {
        "t": "0:20:25",
        "ar": "النظام المالي القوي هو اللي بيكون فيه موازنة بين الكنترولز والمعايير والقوانين... بس في نفس الوقت يكون في عندك مجال انك تكون كريتف، يكون في عندك مجال للإبداع.",
        "en": "A strong financial system is one that balances controls, standards and regulations... but at the same time leaves you room to be creative, room for innovation."
      },
      {
        "t": "0:49:05",
        "ar": "الاستثمار من الريجوليتر أو من الحكومة مش هو الحل الوحيد، بدك تخلي كمان مساحة للإبداع للناس اللي موجودين عندك مشان يبنوا على هذا الأساس.",
        "en": "Investment from the regulator or the government is not the only solution; you also need to leave room for the people you have to be creative so they can build on that foundation."
      },
      {
        "t": "1:44:30",
        "ar": "هذا الباك بون هو أهم شيء لازم الاستثمار فيه، وعلى التوازي منه الريسك مانجمنت ونظام للمحافظة على المخاطر.",
        "en": "This backbone is the most important thing to invest in, and in parallel with it, risk management and a system to guard against risks."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:24:40",
        "ar": "مشان يكون عندك تراست بدك يكون في ضمانات للجهتين إنه كل واحد بياخذ حقه.",
        "en": "To have trust, you need guarantees for both sides that each one gets what is theirs."
      },
      {
        "t": "1:52:27",
        "ar": "كثير من هي الأفكار مش نسخ عن أفكار موجودة في الدول الغربية، لا، عم بيحاولوا يوجدوا أفكار خلاقة، الناس بتكون مختلفة وتناسب السوق اللي عم بيستهدفوه.",
        "en": "Many of these ideas are not copies of ideas from Western countries; people are trying to come up with creative ideas that suit the market they are targeting."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق في هذه الحلقة زميله السابق نسيم التميمي، المهندس الذي عمل في مجال التكنولوجيا المالية لسنوات طويلة وقاد فرقا هندسية في شركات مدفوعات عالمية. تبدأ الحلقة بقصة من أيام عملهما معا في ProgressSoft عام 2009 عن لجنة الفعاليات الاجتماعية، ثم ينتقل نسيم إلى عمله الحالي في Medius على منتجات الدفع وبطاقات المصاريف (Expense Cards).\n\nبعدها يشرح نسيم ما الذي يجعل النظام المالي قويا، وكيف يوازن بين الرقابة والمعايير من جهة ومساحة الإبداع من جهة أخرى، ولماذا تقوم كل عملية دفع على الثقة بين المرسل والمستلم. ويقارن الحلقة بين تجربة السعودية في التحول نحو الدفع غير النقدي عبر مدى وسريع، وتجربة مصر، ثم يشرح كيف تعمل شبكات البطاقات المحلية مثل مدى و KNET، ولماذا لا يوجد مثلها في الأردن، ومعنى نطاقات أرقام البطاقات (BIN) والبنك المحصّل، ومبادرة بونا للتحويلات العربية ونظام SEPA الأوروبي.\n\nفي النصف الثاني يصنّف نسيم تطبيقات الفنتك إلى فئات: البنوك الرقمية، وبطاقات الإنفاق، والتحويل من حساب إلى حساب، والشراء الآن والدفع لاحقا، وخدمات البنية الخلفية، والاستثمار، وإدارة الأموال، ويشرح مفهوم Open Banking. وتنتهي الحلقة بسؤال عن أولويات بناء منظومة فنتك في بلد مثل سوريا. الحلقة مفيدة لمن يعمل في البرمجيات أو يفكر ببناء منتج مالي، ولكل من يريد فهم ما يحدث خلف عملية الدفع اليومية.",
      "en": "Tariq hosts his former colleague Nassim Al-Tamimi, an engineer with many years in financial technology who has led engineering teams at global payments companies. The episode opens with a story from their time together at ProgressSoft in 2009 about the employee social committee, then moves to Nassim's current work at Medius on payment products and expense cards.\n\nNassim then explains what makes a financial system strong: a balance between controls and standards on one side and room for innovation on the other, with every payment resting on trust between sender and receiver. The conversation compares Saudi Arabia's move to cashless payments through mada and sarie with Egypt's situation, then explains how local card networks such as mada and KNET work, why Jordan has no equivalent, what BIN ranges and acquiring banks are, and how the Arab Monetary Fund's Buna and the EU's SEPA handle bank transfers.\n\nIn the second half Nassim sorts fintech applications into categories: digital banks, spend and expense cards, account-to-account payments, buy now pay later, behind-the-scenes infrastructure, investing and money management, and explains the idea of open banking. The episode closes with a question about what priorities a country like Syria should set to build a fintech ecosystem. It suits software engineers and founders thinking about financial products, and anyone curious about what happens behind an everyday payment."
    },
    "takeaways": [
      {
        "ar": "النظام المالي القوي يوازن بين الرقابة والمعايير ومساحة الإبداع؛ التشدد الزائد قد يعيق الابتكار.",
        "en": "A strong financial system balances controls and standards with room for innovation; too much strictness can hold innovation back."
      },
      {
        "ar": "في كل عملية دفع هناك مرسل ومستلم وحلقات وصل بينهما، وكل حلقة تأخذ جزءا من العمولة مقابل ضمان الخدمة والثقة، وفي كل حلقة فرصة لمنتج جديد.",
        "en": "Every payment has a sender, a receiver and intermediaries; each link takes a fee for guaranteeing trust and service, and each link is a chance to build a product."
      },
      {
        "ar": "شبكة البطاقات المحلية مثل مدى تتطلب بنية تحتية من البنوك المصدِّرة والبنوك المحصِّلة ونطاقات BIN، وتبقي الرسوم والأموال داخل البلد، وتحتاج حجما كافيا من البطاقات والتجار لتكون مربحة.",
        "en": "A local card network like mada needs issuing banks, acquiring banks and BIN ranges; it keeps fees and money inside the country and needs enough cards and merchants to be profitable."
      },
      {
        "ar": "نجحت الأفكار الجديدة في السعودية لأنها بنيت فوق بنية تحتية وضعها البنك المركزي (مدى وسريع)، ونجحت في مصر لأنها استهدفت واقع من لا يملكون حسابات بنكية، ولا يكفي استثمار الجهة المنظمة وحده بل يجب ترك مساحة للمبدعين.",
        "en": "New ideas succeeded in Saudi Arabia by building on central-bank infrastructure (mada and sarie), and in Egypt by targeting people without bank accounts; regulator investment alone is not enough, innovators need room to build."
      },
      {
        "ar": "شبكات مثل بونا في العالم العربي و SEPA في أوروبا تختصر التحويل بين البنوك وتقلل الاعتماد على SWIFT وعلى عملة وسيطة، وبذلك تنخفض التكلفة ويتسارع الوصول.",
        "en": "Networks like Buna in the Arab world and SEPA in Europe shorten bank-to-bank transfers and reduce reliance on SWIFT and an intermediate currency, cutting cost and time."
      },
      {
        "ar": "Open Banking يعني أن تفتح البنوك واجهات API معيارية وآمنة تعتمد على رمز تفويض من صاحب الحساب، وهو شرط أساسي لتطبيقات إدارة الأموال، وقد عارضته بعض البنوك الكبيرة في البداية.",
        "en": "Open banking means banks expose standard, secure APIs authorised by a token from the account holder; it underpins money-management apps, and some large banks initially opposed it."
      },
      {
        "ar": "في بلد مثل سوريا، أهم أولوية برأي نسيم هي بنية خلفية للتبادل المالي مبنية على واجهات API واضحة، يرافقها نظام لإدارة المخاطر ومكافحة غسيل الأموال، ثم يبني المبدعون التطبيقات فوقها.",
        "en": "For a country like Syria, Nassim's top priority is a backbone for financial exchange with clear APIs, alongside risk management and anti-money-laundering systems, so innovators can build applications on top."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيف",
          "en": "Introduction and the guest"
        }
      },
      {
        "t": "0:03:48",
        "title": {
          "ar": "قصة لجنة الفعاليات في ProgressSoft",
          "en": "The ProgressSoft social committee story"
        }
      },
      {
        "t": "0:08:58",
        "title": {
          "ar": "العمل الحالي وبطاقات المصاريف",
          "en": "Current work and expense cards"
        }
      },
      {
        "t": "0:19:20",
        "title": {
          "ar": "ما الذي يجعل النظام المالي قويا",
          "en": "What makes a financial system strong"
        }
      },
      {
        "t": "0:23:07",
        "title": {
          "ar": "أساسيات الدفع وتعريف الفنتك",
          "en": "Payment basics and defining fintech"
        }
      },
      {
        "t": "0:35:42",
        "title": {
          "ar": "السعودية ومصر والدفع غير النقدي",
          "en": "Saudi Arabia, Egypt and cashless payments"
        }
      },
      {
        "t": "0:50:03",
        "title": {
          "ar": "الشبكات المحلية للبطاقات والأردن",
          "en": "Local card networks and Jordan"
        }
      },
      {
        "t": "0:52:33",
        "title": {
          "ar": "نطاقات BIN والبنك المحصّل",
          "en": "BIN ranges and acquiring banks"
        }
      },
      {
        "t": "1:01:55",
        "title": {
          "ar": "بونا و SEPA والتحويلات البنكية",
          "en": "Buna, SEPA and bank transfers"
        }
      },
      {
        "t": "1:14:34",
        "title": {
          "ar": "تصنيفات تطبيقات الفنتك",
          "en": "Categories of fintech apps"
        }
      },
      {
        "t": "1:24:15",
        "title": {
          "ar": "مفهوم Open Banking",
          "en": "Open banking explained"
        }
      },
      {
        "t": "1:33:27",
        "title": {
          "ar": "الشراء الآن والدفع لاحقا",
          "en": "Buy now, pay later"
        }
      },
      {
        "t": "1:40:31",
        "title": {
          "ar": "أولويات الفنتك في سوريا",
          "en": "Fintech priorities for Syria"
        }
      }
    ]
  },
  {
    "n": 27,
    "slug": "team-aurora-competitive-programming-story",
    "id": "bCqMuUQ-Tsw",
    "title": {
      "ar": "فريق أورورا: قصة البرمجة التنافسية",
      "en": "Team Aurora and Competitive Programming"
    },
    "dek": {
      "ar": "ثلاثة من أبطال ICPC و IEEEXtreme من جامعة الأميرة سمية يحكون كيف تدربوا وكيف فازوا",
      "en": "Three Princess Sumaya University graduates on how they trained for and won ICPC and IEEEXtreme titles"
    },
    "guest": {
      "ar": "محمد أبو عبود ومعتصم الكايد وحمزة زاغة",
      "en": "Mohammad Abu Aboud and Mutasem Al-Kayed and Hamza Zagha"
    },
    "cat": "software",
    "draft": true,
    "guestBio": {
      "ar": "محمد أبو عبود: شريك مؤسس لشركة أتمتة برمجيات (عمل سابقا في أمازون وجوجل)، ومقيم في ألمانيا. معتصم الكايد: Backend Software Engineer في شركة نون، دبي. حمزة زاغة: مهندس برمجيات في نون (فريق Noon Food) في دبي، منذ نحو خمس سنوات ونصف.",
      "en": "Mohammad Abu Aboud: Co-founder of a software automation company; previously worked at Amazon and Google; based in Germany. Mutasem Al-Kayed: Backend software engineer at Noon, Dubai. Hamza Zagha: Software engineer at Noon (Noon Food team) in Dubai, for about five and a half years."
    },
    "quotes": [
      {
        "t": "0:33:32",
        "ar": "المهم إنّه الجامعة تكون عارفة إنّه الموضوع لونج تيرم، تضلها تحط هاي الانفستمنت حتى لو حاليا ما في نتائج، على أساس إنك تنمّي بالآخر طلابك.",
        "en": "What matters is that the university knows this is long-term, and keeps making this investment even if there are no results for now, on the basis that you are developing your students in the end.",
        "by": {
          "ar": "حمزة",
          "en": "Hamza"
        }
      },
      {
        "t": "1:40:31",
        "ar": "انت شوف الأشياء اللي ما حليتها وروح حلها أكثر من إنك تاكسبلور أسئلة ثانية.",
        "en": "Look at the things you didn't solve and go solve them, rather than exploring other problems.",
        "by": {
          "ar": "محمد",
          "en": "Mohammad"
        }
      },
      {
        "t": "2:07:36",
        "ar": "تحاول تكون صادق مع حالك: إيش فعليا السبب اللي انت بدك تفوت فيه المسابقات؟",
        "en": "Try to be honest with yourself: what is the real reason you want to get into competitions?",
        "by": {
          "ar": "معتصم",
          "en": "Mutasem"
        }
      }
    ],
    "moreQuotes": [
      {
        "t": "1:30:19",
        "ar": "هي الإفورت الأكبر هو قبل المسابقة، مش المسابقة.",
        "en": "The biggest effort is before the competition, not during it.",
        "by": {
          "ar": "حمزة",
          "en": "Hamza"
        }
      },
      {
        "t": "1:45:16",
        "ar": "أنا بشوف على الفترة الطويلة إنك تحافظ على الريذم كثير أسهل وأحسن من هذا النظام، الفزعات والهبات.",
        "en": "I see that over the long run, keeping a rhythm is much easier and better than this system of sudden bursts and spurts.",
        "by": {
          "ar": "محمد",
          "en": "Mohammad"
        }
      }
    ],
    "summary": {
      "ar": "تستضيف الحلقة أعضاء فريق أورورا من جامعة الأميرة سمية للتكنولوجيا: محمد أبو عبود ومعتصم الكايد وحمزة. يبدؤون بحياتهم المهنية اليوم، ثم يعودون إلى البداية: كيف جاء كل واحد منهم إلى البرمجة التنافسية، وكيف تعرفوا على بعض عبر نادي ICM في الجامعة، وكيف تشكل الفريق من ثاني سنة جامعية واستمر حتى التخرج.\n\nيشرح الضيوف كيف تعمل مسابقتا IEEEXtreme (24 ساعة بأسئلة تنزل تباعا ونقاط جزئية) و ICPC (خمس ساعات، ثلاثة أشخاص على جهاز واحد، وأسئلة على الورق دون إنترنت)، ويحكون عن تقسيم الأسئلة بحسب نقاط قوة كل واحد، ودور معتصم في الأسئلة الصعبة والنظرية الأعداد، ولحظات الضغط في ربع الساعة الأخيرة من فوزهم بالمركز الأول في IEEEXtreme. كما يتحدثون عن دعم الجامعة والدكاترة، وعن التدريب الفردي والجماعي الذي سبق كل نتيجة.\n\nالحلقة مفيدة لطلاب علوم الحاسوب ولمن يفكر بدخول البرمجة التنافسية، ولكل من يريد أن يفهم كيف يبني فريق عادات تدريب وتواصل تقوده سنوات من التراكم لا حماس اللحظة الأخيرة.",
      "en": "The episode hosts members of Team Aurora from Princess Sumaya University for Technology: Mohammad Abu Aboud, Mutasem Al-Kayed and Hamza. They begin with where they work today, then go back to the start: how each came to competitive programming, how they met through the ICM club at the university, and how the team formed in their second year and stayed together until graduation.\n\nThe guests explain how IEEEXtreme (24 hours, problems released in stages, partial scoring) and ICPC (five hours, three people on one computer, problems on paper, no internet) work. They describe splitting problems by each person's strengths, Mutasem's role on the hardest problems and number theory, and the pressure of the last fifteen minutes when they took first place in IEEEXtreme. They also discuss the support of the university and its professors, and the individual and team training that came before every result.\n\nIt is useful for computer science students and anyone considering competitive programming, and for anyone interested in how a team builds training and communication habits over years rather than relying on last-minute effort."
    },
    "takeaways": [
      {
        "ar": "الجهد الأكبر يكون قبل المسابقة: كان التدريب اليومي يصل أحيانا إلى نحو تسع ساعات، إضافة إلى محاكاة مسابقات قديمة كفريق بظروف المسابقة الحقيقية.",
        "en": "Most of the effort happens before the contest: daily practice sometimes reached around nine hours, plus team simulations of past contests under real contest conditions."
      },
      {
        "ar": "ركّز على الأسئلة التي لم تحلها: السؤال الذي حاولت فيه ولم تنجح هو نقطة ضعفك، وعودتك إليه (Upsolve) أنفع من استكشاف أسئلة جديدة تتجنب بها الصعب.",
        "en": "Go back to the problems you failed: a problem you tried and did not solve points to a weakness, and upsolving it helps more than exploring new problems that let you avoid the hard ones."
      },
      {
        "ar": "تعلّم كيف تتدرب: راجع العملية نفسها وفكر متى يفيدك الوقت الذي تقضيه، وخذ لحظات للتأمل في ما حدث بدل التكرار دون تفكير.",
        "en": "Learn how to practice: examine your own process, ask when the time you spend actually helps, and reflect on what happened instead of repeating blindly."
      },
      {
        "ar": "الاستمرارية أفضل من الفزعات: الحفاظ على إيقاع تدريب ثابت على مدى سنوات أسهل وأنفع من الضغط المكثف قبل المسابقة.",
        "en": "Consistency beats cramming: keeping a steady training rhythm over years is easier and more effective than intense bursts before a contest."
      },
      {
        "ar": "تعرّف على نقاط قوة فريقك: في ICPC كان معتصم يختار الأسئلة التي يتقنها، ومحمد وحمزة يتنافسان على أسرع حل للأسئلة السهلة، وكان معتصم يجهز ملف الكود الأساسي مسبقا لتوفير الوقت.",
        "en": "Know your team's strengths: in ICPC Mutasem picked the problems he was strongest at, Mohammad and Hamza raced to solve the easy ones first, and Mutasem prepared the boilerplate file ahead of time to save seconds."
      },
      {
        "ar": "النتائج الجيدة تحتاج استثمارا طويل المدى من الجامعة: الدعم المالي للسفر والتدريب ووجود دكاترة يدافعون عن الطلاب صنعا فرقا حقيقيا في حالتهم.",
        "en": "Good results need long-term investment from the university: funding for travel and training, and professors who advocated for the students, made a real difference in their case."
      },
      {
        "ar": "كن صادقا مع نفسك بشأن سبب دخولك المسابقات؛ فمعرفة دافعك الحقيقي من البداية تحمي من خداع النفس عند بذل جهد كبير لسنوات.",
        "en": "Be honest with yourself about why you enter contests; knowing your real motive from the start protects you from self-deception when you invest years of effort."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "تقديم فريق أورورا",
          "en": "Introducing Team Aurora"
        }
      },
      {
        "t": "2:39",
        "title": {
          "ar": "ماذا يعمل الضيوف اليوم",
          "en": "What the guests do today"
        }
      },
      {
        "t": "12:33",
        "title": {
          "ar": "كيف تشكل الفريق",
          "en": "How the team formed"
        }
      },
      {
        "t": "19:30",
        "title": {
          "ar": "نادي ICM والتدريبات",
          "en": "The ICM club and trainings"
        }
      },
      {
        "t": "28:10",
        "title": {
          "ar": "لماذا جامعة سمية قوية",
          "en": "Why PSUT excels"
        }
      },
      {
        "t": "35:32",
        "title": {
          "ar": "مسابقة IEEEXtreme",
          "en": "The IEEEXtreme contest"
        }
      },
      {
        "t": "44:11",
        "title": {
          "ar": "التنظيم والعمل الجماعي",
          "en": "Logistics and teamwork"
        }
      },
      {
        "t": "55:32",
        "title": {
          "ar": "الفوز بالمركز الأول",
          "en": "Winning first place"
        }
      },
      {
        "t": "1:10:13",
        "title": {
          "ar": "استراتيجيات الفريق",
          "en": "The team's strategies"
        }
      },
      {
        "t": "1:23:08",
        "title": {
          "ar": "شرح مسابقة ICPC",
          "en": "ICPC explained"
        }
      },
      {
        "t": "1:29:59",
        "title": {
          "ar": "التحضير والتدريب",
          "en": "Preparation and training"
        }
      },
      {
        "t": "1:42:15",
        "title": {
          "ar": "الفوز ببطولة ICPC الإقليمية",
          "en": "Winning the ICPC regional"
        }
      },
      {
        "t": "2:03:00",
        "title": {
          "ar": "ICPC في موسكو",
          "en": "ICPC in Moscow"
        }
      },
      {
        "t": "2:07:36",
        "title": {
          "ar": "نصيحة ختامية",
          "en": "Closing advice"
        }
      }
    ]
  },
  {
    "n": 26,
    "slug": "saif-alnuaimi-cloud-devops-career",
    "id": "c0SSYbE8u0M",
    "title": {
      "ar": "من دون شهادة إلى مايكروسوفت",
      "en": "From No Degree to Microsoft"
    },
    "dek": {
      "ar": "سيف النعيمي عن طريقه من التوجيهي و CCNA إلى DevOps والكلاود و Azure Databricks، ونصائحه عن الشهادات والذكاء الاصطناعي",
      "en": "Saif Al-Nuaimi on his path from CCNA to DevOps, cloud and Azure Databricks, with advice on degrees, certifications and AI"
    },
    "guest": {
      "ar": "سيف النعيمي",
      "en": "Saif Al-Nuaimi"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "مهندس دعم في فريق Azure Databricks في مايكروسوفت، وصانع محتوى تقني على يوتيوب.",
      "en": "Support engineer on the Azure Databricks team at Microsoft, and tech content creator on YouTube."
    },
    "quotes": [
      {
        "t": "0:31:00",
        "ar": "شفت إنه في كنز هناك، كنز فعلاً إنه البرمجة كنز، ولليوم أنا مؤمن إنه البرمجة كنز مع الذكاء الصناعي للي بعرف يستعملها.",
        "en": "I saw there was treasure there. Programming really is a treasure, and to this day I believe programming is a treasure, together with AI, for whoever knows how to use it."
      },
      {
        "t": "1:15:23",
        "ar": "أنا ما بدرس عشان شخص، أنا بدرس عشاني، عشان أنا أتطور، عشان أنا أنجح الشركة. مديرك مش دايم لك، بكرة بتغير مديرك، بكرة بتغير شركتك.",
        "en": "I don't study for anyone else. I study for myself, to grow and to make the company succeed. Your manager won't always be there for you; tomorrow you change your manager, tomorrow you change your company."
      },
      {
        "t": "1:44:31",
        "ar": "لأنه ما حدا حيتحمل المسؤولية غير البني آدم، فإنت دايماً حتكون موجود، بس إنت حتكون الشخص اللي بيتحمل المسؤولية.",
        "en": "Because nobody takes responsibility except a human being, so you will always be there, but you will be the person who carries the responsibility."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:59:40",
        "ar": "بس ارجوك ارجوك ارجوك تكمل دراستك، كمل دراستك.",
        "en": "But please, please, please, finish your studies. Finish your studies."
      },
      {
        "t": "1:14:15",
        "ar": "مديرك مش غبي، هو منيح بده يشوف إنك قد إيش منيح كشغل مش كشهادات.",
        "en": "Your manager isn't stupid; he wants to see how good you are at the work, not at collecting certificates."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق سيف النعيمي، الذي يعمل اليوم في مايكروسوفت ضمن فريق Azure Databricks، ويحكي عن مساره من أول يوم. يبدأ بالتوجيهي الذي أعاده أكثر من مرة، ثم شهادة CCNA، وصيانة الهواتف، ثم الدراسة المسائية في الجامعة العربية المفتوحة، وكيف قاده صديق من الجامعة إلى أول وظيفة دعم فني قبل أن يكمل دراسته.\n\nبعد ذلك ينتقل الحديث إلى Progress Soft حيث بدأ في الـ Help Desk ثم تحول إلى DevOps وتعلم Kubernetes و Docker بسرعة، ثم MBC حيث عمل على AWS، ثم الانتقال إلى مايكروسوفت بعقد غير Full-time وكيف قيّم المخاطرة. ويشرح سيف الفرق بين الـ DevOps Engineer والـ Cloud Engineer، والمهارات المشتركة بينهما، وقيمة الشهادات وكيف يتعلم منها فعلاً بدل حفظ الأسئلة.\n\nفي الجزء الأخير يتحدث عن استخدامه لأدوات الذكاء الاصطناعي في العمل والدراسة، وبدايته في صناعة المحتوى على يوتيوب، ومشروعه iDynatic، ورأيه في أثر الذكاء الاصطناعي على وظائف الكلاود والـ DevOps. الحلقة مفيدة لمن يبدأ مساره التقني بلا مسار تقليدي، ولمن يفكر بين الـ DevOps والكلاود، ولمن يريد دخول صناعة المحتوى.",
      "en": "In this episode Tariq hosts Saif Al-Nuaimi, who now works at Microsoft on the Azure Databricks team, and walks through his path from the start. He begins with a Tawjihi year he had to repeat, then the CCNA certificate, phone repair, and evening-style study at the Arab Open University, and how a friend from university led him to his first IT support job before he had finished his degree.\n\nThe conversation then moves to Progress Soft, where he started on the help desk and moved into DevOps, learning Kubernetes and Docker quickly, then to MBC, where he worked with AWS, and finally to Microsoft on a non-full-time contract and how he weighed that risk. Saif explains the difference between a DevOps Engineer and a Cloud Engineer, the skills they share, and the value of certifications when you learn from them rather than memorize the questions.\n\nThe last part covers how he uses AI tools for work and study, how he started creating content on YouTube, his project iDynatic, and his view of how AI will affect cloud and DevOps jobs. It is useful for anyone building a tech career without a traditional path, anyone choosing between DevOps and cloud, and anyone thinking about content creation."
    },
    "takeaways": [
      {
        "ar": "أكمل شهادتك الجامعية حتى لو أخذت وقتاً أطول، وادرس واشتغل بالتوازي، فالجامعة تعطيك علاقات وأساساً واسعاً لا تعطيه الشهادات المهنية.",
        "en": "Finish your university degree even if it takes longer, and study and work in parallel; it gives you relationships and a broad foundation that professional certificates do not."
      },
      {
        "ar": "الانتقال من Help Desk إلى DevOps كان ممكناً في Progress Soft لأن الشركة كانت تدرّب الناس وتنقلهم داخلياً، فابحث عن بيئة تتيح لك هذا المسار.",
        "en": "Moving from help desk to DevOps was possible at Progress Soft because the company trained people and moved them internally, so look for an environment that offers that path."
      },
      {
        "ar": "الـ DevOps Engineer يبني Pipeline تربط المطورين وفريق الجودة وبيئة الإنتاج، مع بيئات متطابقة للتطوير والاختبار والإنتاج حتى لا يبقى عذر أن الكود يعمل على جهاز المطور فقط.",
        "en": "A DevOps Engineer builds a pipeline linking developers, QA and production, with identical development, QA and production environments so that \"it works on my machine\" is no longer an excuse."
      },
      {
        "ar": "للانتقال بين DevOps والكلاود يوصي بتعلم Linux و SSH والشبكات، و Python، وفهم كيف يتواصل الـ Frontend والـ Backend وقاعدة البيانات.",
        "en": "To move between DevOps and cloud he recommends learning Linux, SSH and networking, plus Python and an understanding of how the frontend, backend and database communicate."
      },
      {
        "ar": "الشهادة تفيد إذا درستها فعلاً: تفرض عليك جدولاً زمنياً، وتعطيك نظرة شاملة، ويُفضّل أن تبني Lab عملياً، أما حفظ الأسئلة فينكشف في المقابلة.",
        "en": "A certificate helps only if you really study for it: it sets a deadline, gives an overview, and ideally you build a hands-on lab; memorizing questions gets exposed in interviews."
      },
      {
        "ar": "عند الانتقال لوظيفة بعقد غير Full-time، قيّم المخاطرة بالأرقام: فرصة التحول إلى Full-time، والراتب، وقيمة اسم الشركة على سيرتك الذاتية.",
        "en": "When considering a non-full-time contract, weigh the risk concretely: the chance of converting to full-time, the salary, and the value of the company name on your CV."
      },
      {
        "ar": "مع الذكاء الاصطناعي، ركّز على دمجه في وظيفتك الحالية وبناء Agents و Automations تساعدك، فمن يتحمل المسؤولية يبقى الإنسان.",
        "en": "With AI, focus on integrating it into your current role and building agents and automations that help you, since a human still carries the responsibility."
      },
      {
        "ar": "احتفظ بمشروع جانبي صغير دائماً؛ يطور خبرتك ويمنحك سنداً إن تغيرت ظروفك الوظيفية.",
        "en": "Always keep a small side project; it grows your skills and gives you something to lean on if your job situation changes."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة ومحاور الحلقة",
          "en": "Introduction and episode agenda"
        }
      },
      {
        "t": "2:20",
        "title": {
          "ar": "العمل في مايكروسوفت و Azure Databricks",
          "en": "Working at Microsoft on Azure Databricks"
        }
      },
      {
        "t": "14:41",
        "title": {
          "ar": "التوجيهي و CCNA والجامعة المفتوحة",
          "en": "Tawjihi, CCNA and the Open University"
        }
      },
      {
        "t": "24:20",
        "title": {
          "ar": "يزيد والوظيفة الأولى",
          "en": "Yazeed and the first job"
        }
      },
      {
        "t": "27:12",
        "title": {
          "ar": "الانضمام إلى Progress Soft",
          "en": "Joining Progress Soft"
        }
      },
      {
        "t": "35:08",
        "title": {
          "ar": "MBC وتجربة AWS",
          "en": "MBC and working with AWS"
        }
      },
      {
        "t": "41:38",
        "title": {
          "ar": "مقابلات MBC وقرار الانتقال",
          "en": "MBC interviews and moving on"
        }
      },
      {
        "t": "46:41",
        "title": {
          "ar": "الانتقال إلى مايكروسوفت",
          "en": "Moving to Microsoft"
        }
      },
      {
        "t": "58:46",
        "title": {
          "ar": "نصيحة: أكمل دراستك",
          "en": "Advice: finish your degree"
        }
      },
      {
        "t": "1:01:32",
        "title": {
          "ar": "DevOps مقابل Cloud Engineer",
          "en": "DevOps versus Cloud Engineer"
        }
      },
      {
        "t": "1:10:27",
        "title": {
          "ar": "قيمة الشهادات المهنية",
          "en": "The value of certifications"
        }
      },
      {
        "t": "1:18:36",
        "title": {
          "ar": "الذكاء الاصطناعي والكتب",
          "en": "AI tools and book picks"
        }
      },
      {
        "t": "1:27:14",
        "title": {
          "ar": "صناعة المحتوى على يوتيوب",
          "en": "Creating content on YouTube"
        }
      },
      {
        "t": "1:42:10",
        "title": {
          "ar": "أثر AI على وظائف الكلاود",
          "en": "AI and cloud job demand"
        }
      }
    ]
  },
  {
    "n": 25,
    "slug": "lebanon-to-mit-space-engineering",
    "id": "bXpvW7Ihubo",
    "title": {
      "ar": "من لبنان إلى MIT وهندسة الفضاء",
      "en": "From Lebanon to MIT and Space"
    },
    "dek": {
      "ar": "مايا تحكي عن رحلتها إلى MIT، وهندسة الفضاء، وإنتاج الأكسجين على المريخ، ومشروع Humans للأصوات في الفضاء",
      "en": "Maya on getting into MIT, what aerospace engineering covers, making oxygen on Mars, and the Humans project"
    },
    "guest": {
      "ar": "د. مايا نصر",
      "en": "Dr. Maya Nasr"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "باحثة علمية (Research Scientist) في جامعة هارفارد، ودكتوراه في هندسة الفضاء من MIT.",
      "en": "Research Scientist at Harvard; PhD in aerospace engineering from MIT."
    },
    "quotes": [
      {
        "t": "0:12:12",
        "ar": "كان قرار صعب وكثير منيح. إذا رجعت فكرت فيها، إني إجيت على MIT ومن وقتها نوعية الفرص ونوعية الشغل اللي سمحت لي أعمله في MIT، ما في أتخيل كيف ممكن تكون حياتي لو ما عملته.",
        "en": "It was a hard decision, and a very good one. Looking back, since I came to MIT, I can't imagine what my life would have been like without the quality of opportunities and work it let me do."
      },
      {
        "t": "0:40:03",
        "ar": "بدل ما تحمل كل هالأكسجين معك من الأرض على المريخ، اللي بتاخد كثير مصاري لأنه بتطلع الأشياء على المريخ كثير غالي، نعمل هالأشياء على المريخ بدل ما ناخدها معنا من الأرض.",
        "en": "Instead of carrying all that oxygen with you from Earth to Mars, which costs a lot because sending things to Mars is very expensive, we make these things on Mars instead of taking them with us from Earth."
      },
      {
        "t": "1:19:50",
        "ar": "ما بدنا ننسى إنه الفضا له كثير نفع للأرض. الـGPS لازم نستعمله بحياتنا اليومية، له علاقة بالفضاء، وكل الأشياء اللي بنستعملها وما بنفكر فيها جزء كبير منها جاي من الساتلايتس.",
        "en": "We shouldn't forget that space brings a lot of benefit to Earth. We use GPS in our daily lives and it is tied to space, and a large part of everything we use without thinking about it comes from satellites."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:50:26",
        "ar": "فينا نعمل سياسات وقوانين بتخلي هالتكنولوجيز تنستعمل بطريقة أعدل وأكثر sustainable، مش بتخلي أول دولة بتروح على هالمحلات تعمل مونوبولي وتروح على القمر مثلاً وتاخد كل المي الموجودة على القمر.",
        "en": "We can make policies and laws that let these technologies be used in a fairer and more sustainable way, not letting the first country to get there create a monopoly, go to the Moon, say, and take all the water that is there."
      },
      {
        "t": "0:59:50",
        "ar": "الهدف كان نخلي العالم يحس كونكتد أكثر لمجال الفضاء، ويحس إنه حتى لو رمزياً من كل هالدول، فيهم يحسوا شوي كونكتد أكثر إنه صوتهم ممكن ينبعث للفضا.",
        "en": "The goal was to make people feel more connected to space, and to feel, even symbolically, from all these countries, a bit more connected, because their voice could be sent into space."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة، المصورة وجهاً لوجه في مكتب الضيفة في هارفارد، تحكي مايا عن طريقها من قرية صغيرة في لبنان إلى MIT وهي بعمر 16 سنة، وكيف ساعدها برنامج توجيهي في التقديم على الجامعات الأمريكية، وكيف كان قرار السفر صعباً عليها وعلى أهلها.\n\nبعد ذلك تشرح معنى هندسة الفضاء والفرق بينها وبين الطيران وعلم الفلك والفيزياء الفلكية، وكيف تبدو الدراسة في MIT من الصفوف إلى المشاريع الطلابية مثل فريق الصواريخ. وتتوقف عند عملها في الدكتوراه على أداة (Instrument) ضمن مهمة Mars 2020 مع ناسا، وهي أداة تنتج الأكسجين من ثاني أكسيد الكربون في جو المريخ، وما تعنيه هذه الفكرة لاستخدام موارد الكواكب الأخرى وللسياسات والقوانين.\n\nوتحكي أيضاً عن مشروع Humans الذي يجمع أصوات الناس بلغاتهم ويرسلها إلى الفضاء، وعن الفرق بين تصميم الأقمار الصناعية وفكرة مراكز البيانات في الفضاء. الحلقة مناسبة لمن يحب الفضاء، ولطلاب الهندسة الذين يفكرون بالدراسة أو العمل خارج بلدهم.",
      "en": "Recorded in person at the guest's office at Harvard, this episode follows Maya from a small village in Lebanon to MIT at the age of 16. She describes how a mentoring program helped her apply to US universities, and how hard the decision to travel was for her and her family.\n\nShe then explains what aerospace engineering covers and how it differs from aeronautics, astronomy and astrophysics, and what studying at MIT looks like, from classes to student projects such as the rocket team. She spends time on her PhD work on an instrument aboard NASA's Mars 2020 rover, which makes oxygen from the carbon dioxide in the Martian atmosphere, and on what that idea means for using the resources of other planets and for space policy and law.\n\nShe also talks about the Humans project, which collects people's voices in their own languages and sends them into space, and gives her view on the idea of data centers in orbit. The episode suits anyone curious about space, and engineering students thinking about studying or working abroad."
    },
    "takeaways": [
      {
        "ar": "برنامج توجيهي ساعد مايا في التقديم لجامعات أمريكا: شرح الخطوات، ودفع امتحانات مثل SAT و TOEFL، ووصلها بخريجين من هذه الجامعات، وهذا كسر حاجز أنه الأمر ممكن.",
        "en": "A mentoring program helped Maya apply to US universities by explaining the process, paying for exams such as the SAT and TOEFL, and connecting her with graduates, which showed her it was possible."
      },
      {
        "ar": "MIT جامعة (need-blind): بتقبلك بدون النظر لوضعك المالي، وبعدها بتضمن تغطية احتياجاتك، وفي الماجستير والدكتوراه بتشتغل وبيدفعوا لك.",
        "en": "MIT is need-blind: it admits you without looking at your finances, then ensures your needs are covered, and at graduate level you are paid to work."
      },
      {
        "ar": "في MIT ما بتختار تخصصاً عند التقديم؛ بتاخذ مواد أساسية للكل (رياضيات، فيزياء، بيولوجي، كيمياء) وبتعلن تخصصك بعد السنة الأولى. وأول فصل بيكون بنظام Pass/No Record.",
        "en": "At MIT you do not apply to a major. Everyone takes core classes (math, physics, biology, chemistry) and declares a major after the first year, and the first semester is Pass/No Record."
      },
      {
        "ar": "هندسة الفضاء تشمل الدفع النفاث (Propulsion)، والهياكل (Structures)، والديناميكا الهوائية (Aerodynamics)، والتحكم، والمدارات. أما دراسة الثقوب السوداء فمجالها الفيزياء الفلكية وعلم الفلك.",
        "en": "Aerospace engineering covers propulsion, structures, aerodynamics, control and orbits. Studying black holes belongs to astrophysics and astronomy."
      },
      {
        "ar": "رواد الفضاء ما لازم يكونوا مهندسي فضاء؛ كثير منهم من خلفيات علمية وفنية مختلفة، وصار الفضاء أكثر انفتاحاً مع السياحة الفضائية والمهام الخاصة.",
        "en": "Astronauts do not have to be aerospace engineers. Many come from other scientific and technical backgrounds, and space has become more open with private missions and space tourism."
      },
      {
        "ar": "أداة مايا على مركبة Mars 2020 كانت تنتج الأكسجين من ثاني أكسيد الكربون في جو المريخ، لأن نقل الأكسجين والوقود من الأرض مكلف جداً.",
        "en": "Maya's instrument on the Mars 2020 rover made oxygen from carbon dioxide in the Martian atmosphere, because carrying oxygen and fuel from Earth is very expensive."
      },
      {
        "ar": "بما أنه في الفضاء ما في جزيئات، الحرارة بتنتقل بالإشعاع فقط، وهذا من أكبر تحديات فكرة مراكز بيانات في الفضاء (Thermal Management).",
        "en": "Because space is a vacuum, heat moves only by radiation, which is one of the biggest challenges for the idea of data centers in orbit."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتسجيل في هارفارد",
          "en": "Intro at Harvard"
        }
      },
      {
        "t": "0:02:11",
        "title": {
          "ar": "عملها: مراقبة غاز الميثان",
          "en": "Her work: monitoring methane"
        }
      },
      {
        "t": "0:07:39",
        "title": {
          "ar": "الشغف بالفضاء والتقديم إلى MIT",
          "en": "Space dream and applying to MIT"
        }
      },
      {
        "t": "0:11:38",
        "title": {
          "ar": "السفر من لبنان بعمر 16",
          "en": "Leaving Lebanon at 16"
        }
      },
      {
        "t": "0:15:00",
        "title": {
          "ar": "التمويل ونظام القبول في MIT",
          "en": "Funding and MIT admissions"
        }
      },
      {
        "t": "0:18:30",
        "title": {
          "ar": "السنة الأولى والحياة في السكن",
          "en": "First year and dorm life"
        }
      },
      {
        "t": "0:23:10",
        "title": {
          "ar": "ما هي هندسة الفضاء",
          "en": "What aerospace engineering is"
        }
      },
      {
        "t": "0:31:14",
        "title": {
          "ar": "كيف يصبح الإنسان رائد فضاء",
          "en": "How people become astronauts"
        }
      },
      {
        "t": "0:34:03",
        "title": {
          "ar": "المشاريع الطلابية والبحث المبكر",
          "en": "Student projects and early research"
        }
      },
      {
        "t": "0:36:09",
        "title": {
          "ar": "مركبة Mars 2020 وإنتاج الأكسجين",
          "en": "Mars 2020 and making oxygen"
        }
      },
      {
        "t": "0:53:12",
        "title": {
          "ar": "مشروع Humans والقرص الذهبي",
          "en": "The Humans project"
        }
      },
      {
        "t": "1:13:17",
        "title": {
          "ar": "المركبات المفضلة وملهم مايا",
          "en": "Favorites and inspiration"
        }
      },
      {
        "t": "1:17:24",
        "title": {
          "ar": "مفاهيم خاطئة وقيمة الفضاء",
          "en": "Misconceptions and space's value"
        }
      },
      {
        "t": "1:22:21",
        "title": {
          "ar": "مراكز بيانات في الفضاء",
          "en": "Data centers in space"
        }
      }
    ]
  },
  {
    "n": 24,
    "slug": "ai-in-medicine-myth-or-reality",
    "id": "THNUe_QeLgg",
    "title": {
      "ar": "الذكاء الاصطناعي في الطب",
      "en": "AI in Medicine"
    },
    "dek": {
      "ar": "طبيب لبناني في أمريكا يفرّق بين الحقيقة والخرافة في تأثير الذكاء الاصطناعي على التشخيص والأدوية والمستشفيات.",
      "en": "A Lebanese physician in the US separates fact from myth on how AI is changing diagnosis, drug development and hospital work."
    },
    "guest": {
      "ar": "د. خليل دياب",
      "en": "Dr. Khalil Diab"
    },
    "cat": "ai-data",
    "draft": true,
    "guestBio": {
      "ar": "طبيب رئة وعناية فائقة، يعمل ويدرّس في مستشفى وجامعة جورج واشنطن في واشنطن العاصمة، ومقدّم بودكاست Lebanese Physicians.",
      "en": "Pulmonary and critical care physician who works and teaches at George Washington University Hospital and university in Washington, DC; host of the Lebanese Physicians Podcast."
    },
    "quotes": [
      {
        "t": "0:06:10",
        "ar": "الأهم بالطب هو الريليشنشيب بين الطبيب والمريض، أهم بكثير من إنه تعرف معلومات براسك. يعني أهم أكثر بكثير إنه تعرف كيف تحكي مع المريض تبعك.",
        "en": "The most important thing in medicine is the relationship between doctor and patient, far more important than knowing facts in your head. It matters much more to know how to talk to your patient."
      },
      {
        "t": "0:56:34",
        "ar": "الـAI لازم يستعملوه، مش يحاربوه، يقولوا والله ما بدنا نستعمله، هذا الشيء ما بيفيدنا. بالعكس، أنا بعتقد لازم يتغير دراسة الطب إنه يصير الـAI بارت من هالدراسة، ويصير الحكيم أكثر مش يحفظ أشياء، يصير محلل أكثر.",
        "en": "They should use AI, not fight it by saying we don't want to use it because it doesn't benefit us. On the contrary, I think medical education has to change so that AI becomes part of it, and the doctor becomes less someone who memorizes things and more an analyst."
      },
      {
        "t": "1:04:07",
        "ar": "أنا ماني خايف منه، بالعكس أنا بطلع فيه كمساعد على تحسين القطاع الطبي.",
        "en": "I'm not afraid of it. On the contrary, I see it as a helper for improving the medical sector."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:18:59",
        "ar": "ما فيك تضلك قاعد بالبيت لوحدك عم تحكي مع الذكاء الاصطناعي، وبعتقد نفس الشيء بالمنتل هيلث، ما فيك تضلك قاعد بالبيت تحكي مع شات بوت ومش عم تقدر تحكي مع إنسان تخبره شو إحساسك.",
        "en": "You can't just sit at home alone talking to AI, and I think it's the same with mental health: you can't stay home talking to a chatbot while not being able to talk to a person and tell them how you feel."
      },
      {
        "t": "1:06:02",
        "ar": "أنا المتحمس له أكثر شيء هو سرعة اكتشاف الأدوية، علاج الأمراض اللي هلا ما عندها علاج منيح، وهو أكثر شيء اكسايتين مي.",
        "en": "What I'm most excited about is the speed of discovering drugs, and treating diseases that don't have a good treatment right now. That's what excites me most."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق الدكتور خليل، طبيب لبناني متخصص في أمراض الرئة والعناية الفائقة ويعمل في مستشفى جورج واشنطن الجامعي في واشنطن العاصمة. يبدأ اللقاء بتعريف بالضيف وببودكاسته الموجّه للأطباء، ثم بكيف يوازن بين العمل في المستشفى وتدريس طلاب الطب، وبتأكيده على أن العلاقة بين الطبيب والمريض أهم من حفظ المعلومات.\n\nالجزء الأكبر من الحلقة فقرة \"حقيقة أم خرافة\" يسأل فيها طارق عن تسعة أسئلة تقريبا حول الذكاء الاصطناعي في الطب: التشخيص، وأخصائيو الأشعة، والتنبؤ بالأوبئة، وروبوتات الدردشة للصحة النفسية، وتصميم الأدوية والتجارب السريرية، والكشف المبكر عن السرطان، والجراحة الروبوتية، وإعادة دخول المرضى للمستشفى، والعلاجات المبنية على الحمض النووي للورم. يجيب الدكتور خليل بأمثلة من عمله اليومي، ويشرح مراحل التجارب السريرية.\n\nبعد ذلك ينتقل الحديث إلى الاستخدام الفعلي: أدوات تسجيل الزيارة وكتابة الملاحظات داخل أنظمة السجل الطبي الإلكتروني، والتذكير بالفحوصات، وتحليل البيانات، ثم أثر ذلك على التخصصات والوظائف، ونصيحته لطلاب الطب، ورأيه في من يسأل ChatGPT بدل الطبيب، ومخاطر الأمان وخصوصية البيانات. الحلقة مناسبة للأطباء وطلاب الطب وكل من يريد فهما واقعيا لما يستطيعه الذكاء الاصطناعي في القطاع الطبي وما لا يستطيعه.",
      "en": "Tariq hosts Dr. Khalil, a Lebanese physician specializing in lung disease and critical care who works at George Washington University Hospital in Washington, DC. The conversation opens with his background and his podcast for physicians, then covers how he balances hospital work with teaching medical students, and his view that the doctor-patient relationship matters more than memorizing facts.\n\nMost of the episode is a \"myth or reality\" segment in which Tariq asks about nine questions on AI in medicine: diagnosis, radiologists, predicting epidemics, mental-health chatbots, drug design and clinical trials, early cancer detection, robotic surgery, hospital readmissions, and treatment plans based on a tumor's DNA. Dr. Khalil answers with examples from his daily work and explains how clinical trial phases work.\n\nThe talk then turns to real use today: tools that record visits and draft notes inside electronic medical record systems, reminders for screenings, and data analysis. It continues with the effect on specialties and jobs, his advice for medical students, his view on people asking ChatGPT instead of a doctor, and the security and data-privacy risks. It suits doctors, medical students and anyone who wants a grounded picture of what AI can and cannot do in healthcare."
    },
    "takeaways": [
      {
        "ar": "العلاقة بين الطبيب والمريض أهم من حفظ المعلومات، لأن المريض قد لا يخبر الذكاء الاصطناعي بكل شيء، بينما يثق بطبيبه ويعطيه تفاصيل أكثر.",
        "en": "The doctor-patient relationship matters more than memorized knowledge; patients may not tell an AI everything, but they open up to a doctor they trust."
      },
      {
        "ar": "يرى أن الذكاء الاصطناعي سيساعد أخصائيي الأشعة على رؤية تفاصيل أصغر، لكنه لن يلغيهم: يحتاجون لمعرفة تاريخ المريض، وللتوقيع على النتائج، ولإجراء الخزعات والتدخلات.",
        "en": "AI will help radiologists spot smaller findings but not remove them: someone still needs the patient history, has to sign off on the images, and performs biopsies and procedures."
      },
      {
        "ar": "في تطوير الأدوية، يرى أن تحليل بيانات الحمض النووي بالذكاء الاصطناعي يسرّع تحديد الأهداف العلاجية، لكن الدواء يظل بحاجة لمراحل التجارب السريرية على الإنسان للتأكد من فعاليته وسلامته.",
        "en": "In drug development, AI analysis of DNA data speeds up finding drug targets, but a drug still needs human clinical trial phases to prove it is effective and safe."
      },
      {
        "ar": "في الاستخدام اليومي، أبرز فائدة عنده هي تسجيل الزيارة وتحويلها إلى ملاحظات بعد أخذ موافقة المريض، وتذكير الطبيب بفحوصات المتابعة، وتحليل بيانات المرضى بسرعة للبحث.",
        "en": "In his daily work the biggest gains are recording the visit (with patient consent) and turning it into notes, reminders for follow-up screening, and fast analysis of patient data for research."
      },
      {
        "ar": "يتوقع أن تتأثر الأشعة والباثولوجي أكثر من غيرهما، وأن تتأثر الجراحة والطب النفسي أقل، لأن الجراحة عمل يدوي ويبقى فيها إشراف بشري، والعلاج النفسي يقوم على العلاقة.",
        "en": "He expects radiology and pathology to be affected most, and surgery and psychiatry least, since surgery is hands-on with human oversight and psychotherapy rests on the relationship."
      },
      {
        "ar": "ينصح طلاب الطب بتعلّم الذكاء الاصطناعي واستخدامه بدل محاربته، ويرى أن دراسة الطب والبورد يجب أن تنتقل من الحفظ إلى التحليل.",
        "en": "He advises medical students to learn and use AI rather than fight it, and thinks medical education and board exams should move from memorization toward analysis."
      },
      {
        "ar": "من المخاطر التي يذكرها: اختراق أنظمة المستشفيات ومراكز البيانات، وأن النماذج المدرَّبة على مرضى في أمريكا وأوروبا قد تعطي نتائج أقل دقة لمرضى في بلدان أخرى.",
        "en": "Risks he names include breaches of hospital systems and data centers, and models trained mostly on patients in North America and Europe that may be less accurate for patients elsewhere."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "الترحيب وتقديم الضيف",
          "en": "Welcome and guest introduction"
        }
      },
      {
        "t": "0:33",
        "title": {
          "ar": "بودكاست الأطباء اللبنانيين",
          "en": "The Lebanese Physicians Podcast"
        }
      },
      {
        "t": "2:24",
        "title": {
          "ar": "الخلفية والعمل والتدريس",
          "en": "Background, work and teaching"
        }
      },
      {
        "t": "9:15",
        "title": {
          "ar": "هل يشخّص الذكاء الاصطناعي أفضل؟",
          "en": "Can AI diagnose better?"
        }
      },
      {
        "t": "12:08",
        "title": {
          "ar": "مستقبل أخصائيي الأشعة",
          "en": "The future of radiologists"
        }
      },
      {
        "t": "16:14",
        "title": {
          "ar": "روبوتات الدردشة والصحة النفسية",
          "en": "Chatbots and mental health"
        }
      },
      {
        "t": "19:14",
        "title": {
          "ar": "الأدوية والتجارب السريرية",
          "en": "Drugs and clinical trials"
        }
      },
      {
        "t": "27:08",
        "title": {
          "ar": "الكشف المبكر عن السرطان",
          "en": "Early cancer detection"
        }
      },
      {
        "t": "29:47",
        "title": {
          "ar": "الجراحة والروبوتات",
          "en": "Surgery and robotics"
        }
      },
      {
        "t": "33:55",
        "title": {
          "ar": "علاج الأورام حسب الحمض النووي",
          "en": "DNA-guided cancer treatment"
        }
      },
      {
        "t": "41:33",
        "title": {
          "ar": "استخدام الأطباء اليومي وتسجيل الزيارات",
          "en": "Daily use and visit recording"
        }
      },
      {
        "t": "51:14",
        "title": {
          "ar": "الوظائف والتخصصات المتأثرة",
          "en": "Jobs and affected specialties"
        }
      },
      {
        "t": "55:24",
        "title": {
          "ar": "نصيحة لطلاب الطب",
          "en": "Advice for medical students"
        }
      },
      {
        "t": "1:04:07",
        "title": {
          "ar": "المخاوف والحماس والمخاطر",
          "en": "Fears, excitement and risks"
        }
      }
    ]
  },
  {
    "n": 23,
    "slug": "tunisia-to-mit-and-phd",
    "id": "jio7dshgCOc",
    "title": {
      "ar": "من تونس إلى MIT ودكتوراه ميشيغان",
      "en": "From Tunisia to MIT and a Michigan PhD"
    },
    "dek": {
      "ar": "صفاء تحكي عن الطريق من المدارس النموذجية في تونس إلى MIT ثم دكتوراه الهندسة الميكانيكية وأبحاث الـ Ergonomics",
      "en": "Safa traces her path from Tunisia's pilot schools to MIT and a mechanical engineering PhD, and explains her work in wearable ergonomics."
    },
    "guest": {
      "ar": "د. صفاء جبري",
      "en": "Dr. Safa Jebri"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "باحثة في هندسة العوامل البشرية (Ergonomics) للأجهزة القابلة للارتداء في كاليفورنيا، حاصلة على دكتوراه في الهندسة الميكانيكية من University of Michigan وبكالوريوس من MIT.",
      "en": "Ergonomics researcher working on wearable devices in California; holds a PhD in Mechanical Engineering from the University of Michigan and a bachelor's degree from MIT."
    },
    "quotes": [
      {
        "t": "0:23:35",
        "ar": "عندي فرصة باهية في ألمانيا، عندي منحة وعندي مستقبل باهي مش خايب في ألمانيا. فما كنتش حابة نمشي لأمريكا فقط من أجل أمريكا.",
        "en": "I had a good opportunity in Germany, I had a scholarship and a good future there. So I did not want to go to America just for the sake of America."
      },
      {
        "t": "1:14:53",
        "ar": "مش عملت حاجة كول على خاطرها كول، أما عملت حاجة كول خاطرها فما إنسان محتاجها.",
        "en": "It wasn't that I built something cool just because it was cool; I built something cool because there was a person who needed it."
      },
      {
        "t": "1:49:43",
        "ar": "مهم جدا إنك تعدي الوقت قبل ما تبعث أبليكيشن، تعدي وقت تسأل فيه نفسك أنا شلون نحب ندرس، وشنو هي الأسئلة اللي في رأيي worth my time، لأني أنا نعدي فيهم خمس سنين نسأل في السؤال هذا.",
        "en": "It is very important to spend time before you send an application, time asking yourself how I want to study and which questions are, in my opinion, worth my time, because I will spend five years asking this question."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:53:22",
        "ar": "عندي أصحاب من كل أنحاء العالم، أما فما حاجات مع أصحاب العرب نحسهم أقرب، قرابة اللغة، قرابة إنهم يعرفوا نفس النكت اللي نضحك عليها.",
        "en": "I have friends from all over the world, but with my Arab friends there are things that make me feel closer: the closeness of language, of knowing the same jokes we laugh at."
      },
      {
        "t": "1:35:24",
        "ar": "تلقى ناس أخرين يخمموا في نفس السؤال وعن نفس الحيرة وتحس إنه there is community، فما ناس أخرين معاك، مش وحدك.",
        "en": "You find other people thinking about the same question and the same puzzle, and you feel there is a community, that there are other people with you and you are not alone."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق صفاء، باحثة تونسية تعمل في كاليفورنيا في مجال الـ Ergonomics للمنتجات القابلة للارتداء مثل السماعات والنظارات والساعات. تشرح صفاء ما يعنيه هذا المجال، وكيف تساهم أبحاث الـ Biomechanics في جعل المنتجات أكثر راحة وأقل ضررا على المدى الطويل.\n\nثم تروي مسارها: الدراسة في المدارس النموذجية في تونس، وحلم الدراسة في أمريكا الذي بدأ عندما عرفت أن المنح ممكنة، وخيبة الأمل بعد وضعها على قائمة الانتظار في Harvard، ثم المنحة التونسية إلى ألمانيا، وقرارها أن تتقدم إلى MIT وحده بعد سنة من الدراسة هناك. وتصف أول أسابيعها في MIT، والفرق بين نظام التقييم هناك ونظام الامتحانات في تونس، ومجتمع الطلاب العرب والفعاليات التي نظموها، وكيف غطّى أحد خريجي MIT تكاليف دراستها.\n\nفي الجزء الثاني تحكي عن قرار الدكتوراه في University of Michigan، وتحديات البحث خلال الكورونا، وموضوع رسالتها عن قياس جهد تمارين التوازن بالحساسات القابلة للارتداء، وتجربتها في Meta Reality Labs. وتنهي بنصائح لمن يفكر في الدكتوراه. الحلقة مناسبة للطلاب العرب الذين يفكرون في الدراسة في أمريكا أو في الدكتوراه، ولكل من يهتم بقصص المسارات الأكاديمية والمهنية.",
      "en": "In this episode Tariq hosts Safa, a Tunisian researcher based in California who works on ergonomics for wearable products such as headphones, glasses and watches. She explains what the field involves and how biomechanics research helps make products more comfortable and less harmful over long-term use.\n\nShe then tells her own story: attending Tunisia's pilot schools, the dream of studying in the US that began when she learned scholarships were possible, the disappointment of being waitlisted at Harvard, the Tunisian state scholarship to Germany, and her decision after a year there to apply only to MIT. She describes her first weeks at MIT, how its grading approach differed from Tunisian exams, the Arab student community and the events they organised, and how an MIT alumnus donor covered her tuition.\n\nThe second half covers her decision to pursue a PhD at the University of Michigan, the challenge of doing lab research during Covid, her thesis on measuring the effort of balance exercises with wearable sensors, and her internship at Meta Reality Labs. She closes with advice for anyone considering a PhD. It suits Arab students weighing study in the US or a PhD, and anyone interested in academic and career journeys."
    },
    "takeaways": [
      {
        "ar": "الـ Ergonomics للمنتجات القابلة للارتداء يهتم بألا تؤذي المنتجات جسم المستخدم مع الاستعمال الطويل، وهو أهم كلما زاد التصاق المنتج بالجسم كالنظارات والسماعات.",
        "en": "Ergonomics for wearables is about making sure products do not harm the user over long-term use, and it matters more the closer the product sits to the body, as with glasses and headphones."
      },
      {
        "ar": "لم تتخيل صفاء الدراسة في أمريكا إلا بعد أن عرفت من زملاء سبقوها أن المنح موجودة، وتقول إن الحدود التي نراها أحيانا هي حدود ما نعرفه.",
        "en": "Safa only imagined studying in the US after learning from peers who had gone before her that scholarships existed; she says our sense of what is possible is often limited by what we know."
      },
      {
        "ar": "قررت أن تتقدم إلى MIT فقط وهي في ألمانيا لأنها لا تريد الذهاب إلى أمريكا لمجرد أنها أمريكا، بل من أجل فرصة أفضل من التي بين يديها، وركّزت كل جهدها على ملف واحد.",
        "en": "While in Germany she applied only to MIT because she did not want to go to the US just for its own sake, only for an opportunity better than the one she had, and she put all her effort into a single application."
      },
      {
        "ar": "في MIT كان الفصل الأول بنظام نجاح/رسوب بدون معدل، وهذا أعطاها فرصة للتأقلم، واكتشفت أن الواجبات الأسبوعية تحتسب في العلامة وتفرض جهدا ثابتا بدل التركيز على الامتحان وحده.",
        "en": "At MIT the first semester was pass/fail with no GPA, which gave her room to adapt, and she found that weekly homework counted toward the grade and demanded steady effort rather than focus on the final exam alone."
      },
      {
        "ar": "الأسبوع التعريفي للطلاب الدوليين (International Orientation) والتعرف على تونسيين وعرب ساعدها على التأقلم مع الحياة في أمريكا وفتح نظرتها على تنوع العالم العربي.",
        "en": "The International Orientation week and meeting fellow Tunisians and Arabs helped her settle into life in the US and broadened her view of the diversity of the Arab world."
      },
      {
        "ar": "الأنترنشيب والعمل في شركات ومختبرات أثناء الدراسة ساعدتها على معرفة نوع العمل الذي يسعدها، وقادها إلى قرار الدكتوراه.",
        "en": "Internships and work in companies and labs during her studies helped her learn what kind of work excites her and led her to the decision to do a PhD."
      },
      {
        "ar": "في الدكتوراه تقضي سنوات في سؤال علمي ضيق، لذلك يُنصح بأن يختار الطالب وقتا قبل التقديم ليسأل نفسه عن الأسئلة التي تستحق وقته، وأن يستشير أصحاب الخبرة أو يجرب العمل في الصناعة.",
        "en": "A PhD means years on a narrow research question, so she advises spending time before applying to decide which questions are worth your time, and talking to experienced people or trying industry work first."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيفة",
          "en": "Introduction"
        }
      },
      {
        "t": "2:07",
        "title": {
          "ar": "ما هو الـ Ergonomics؟",
          "en": "What is ergonomics?"
        }
      },
      {
        "t": "8:34",
        "title": {
          "ar": "المدارس النموذجية وحلم أمريكا",
          "en": "Pilot schools and the US dream"
        }
      },
      {
        "t": "15:58",
        "title": {
          "ar": "Harvard والمنحة إلى ألمانيا",
          "en": "Harvard waitlist, Germany scholarship"
        }
      },
      {
        "t": "22:57",
        "title": {
          "ar": "قرار التقديم إلى MIT فقط",
          "en": "Applying only to MIT"
        }
      },
      {
        "t": "33:04",
        "title": {
          "ar": "الوصول إلى MIT والأسبوع الأول",
          "en": "Arriving at MIT"
        }
      },
      {
        "t": "40:40",
        "title": {
          "ar": "السنة الأولى ونظام التقييم",
          "en": "First year and grading system"
        }
      },
      {
        "t": "50:13",
        "title": {
          "ar": "المجتمع العربي في MIT",
          "en": "The Arab community at MIT"
        }
      },
      {
        "t": "1:04:37",
        "title": {
          "ar": "المنحة وتكاليف الدراسة",
          "en": "Funding and tuition"
        }
      },
      {
        "t": "1:09:49",
        "title": {
          "ar": "الأنترنشيب وقرار الدكتوراه",
          "en": "Internships and the PhD decision"
        }
      },
      {
        "t": "1:19:25",
        "title": {
          "ar": "الدكتوراه في University of Michigan",
          "en": "PhD at Michigan"
        }
      },
      {
        "t": "1:32:23",
        "title": {
          "ar": "تحديات البحث وموضوع الرسالة",
          "en": "PhD challenges and thesis topic"
        }
      },
      {
        "t": "1:39:18",
        "title": {
          "ar": "الأنترنشيب في Meta Reality Labs",
          "en": "Meta Reality Labs internship"
        }
      },
      {
        "t": "1:46:02",
        "title": {
          "ar": "نصائح لمن يفكر بالدكتوراه",
          "en": "Advice on doing a PhD"
        }
      }
    ]
  },
  {
    "n": 22,
    "slug": "sinan-google-to-maqsam",
    "id": "91RFJnq1scs",
    "title": {
      "ar": "من Google إلى تأسيس مقسم",
      "en": "From Google to Founding Maqsam"
    },
    "dek": {
      "ar": "سنان يحكي عن رحلته من Jawaker وميونخ و Google إلى بناء مقسم و AI agents للتواصل مع العملاء",
      "en": "Sinan traces his path from Jawaker and Munich to Google, then to building Maqsam and its voice AI agents"
    },
    "guest": {
      "ar": "سنان طيفور",
      "en": "Sinan Tayfour"
    },
    "cat": "startups",
    "draft": true,
    "guestBio": {
      "ar": "شريك مؤسس في مقسم (Maqsam)، ومهندس برمجيات سابق في Google.",
      "en": "Co-founder of Maqsam and former Google software engineer."
    },
    "quotes": [
      {
        "t": "0:28:59",
        "ar": "ما تحط ببالك: أنا طالع، وإذا رجعت رح أكون فشلت. لا، أنا طالع أستكشف، شوف شو الوضع، تعلّم، شوف شو وضعك. بدك ترجع ترجع، بدك تروح محل ثاني روح.",
        "en": "Don't tell yourself, \"I'm leaving, and if I come back I will have failed.\" No, I'm leaving to explore. See what the situation is, learn, see where you stand. If you want to come back, come back; if you want to go somewhere else, go."
      },
      {
        "t": "0:35:15",
        "ar": "لازم يكون شغلك منيح، إذا شغلك مش منيح أكيد ما رح تترفع، بس مش كافي يكون شغلك منيح. بدك تكون عم تشتغل على المشاريع الصح، تكون عم تشتغل مع الأشخاص الصح، وعم تقنعهم يحكوا عنك.",
        "en": "Your work has to be good. If it isn't, you certainly won't be promoted, but good work alone isn't enough. You need to be working on the right projects, with the right people, and getting them to speak about you."
      },
      {
        "t": "1:54:28",
        "ar": "تخيل حالك بتلعب قدم وإنت مهاجم جدًا قوي، ما بتقبل إنه بفريقك الحارس يكون ضعيف، لأنه بالآخر فريقك رح يخسر.",
        "en": "Imagine you're playing football and you're a very strong striker. You wouldn't accept a weak goalkeeper on your team, because in the end your team will lose."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:11:21",
        "ar": "الحياة العملية ما فيها امتحانات، وما فيها كورس، وما فيها سلابس، وما في نهاية فصل، وما في عطلة صيفية. فلازم الواحد يكون متجهز لهذا الشيء.",
        "en": "Working life has no exams, no courses, no syllabus, no end of term and no summer break. So you have to be ready for that."
      },
      {
        "t": "1:16:25",
        "ar": "إذا أنت عم تبلش من صفر على شيء، صراحة الـ vibe coding والـ agents بطلعوا لك أشياء مش طبيعية. بس تعال دخّل AI agent على code base ضخم فيه كثير فيتشرز، لحد اليوم مش ممتاز.",
        "en": "If you're starting something from scratch, honestly vibe coding and agents produce incredible results. But bring an AI agent into a huge codebase with many features, and to this day it isn't great."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة، المسجلة وجهًا لوجه في مكتب مقسم في عمان، يستضيف طارق سنان، مهندس البرمجيات الذي بدأ العمل مبكرًا في الأردن، ثم درس الماجستير في ميونخ، وعمل في Google، قبل أن يعود إلى تأسيس شركة ناشئة مع شريكه. يبدأ الحديث بنشأته بين فرنسا وسوريا والأردن، وكيف كانت سنة ما بعد المدرسة والجامعة بالنسبة له سؤالًا عن إيجاد الطريق وليس عن الدرجات والامتحانات.\n\nيمر الحوار بأول عمل مدفوع له وهو في السادسة عشرة، ثم بدايته مع Jawaker، وقرار الماجستير في ألمانيا بدل أمريكا، وتجربته في Google: مقابلات التوظيف، والترقيات، وكيف تعمل عملية الترقية من الداخل، ومشروع تطوير نظام الـ authentication الذي تحول إلى فريق كبير. بعد ذلك يحكي عن قراره ترك Google والتفرغ للشركة الناشئة، وقصة Cash Basha وما تعلموه منها، ثم كيف تحولت الشركة إلى مقسم.\n\nالجزء الأخير تقني وعملي: ما هي منصة مقسم، وكيف تُدار المكالمات من الهاتف إلى المتصفح، ومثال حي على AI agent صوتي، وتأثير الـ AI على وظائف خدمة العملاء، وثقافة الشركة. الحلقة مناسبة لمن يفكر في الدراسة أو العمل في الخارج، ولمن يهتم بالعمل في الشركات الكبيرة، وللمؤسسين في المنطقة.",
      "en": "Recorded in person at the Maqsam office in Amman, this episode has Tariq hosting Sinan, a software engineer who started working early in Jordan, did his master's in Munich, worked at Google, and then returned to build a startup with his partner. The conversation opens with his upbringing across France, Syria and Jordan, and his view that school and university are less about grades than about finding your own path.\n\nIt moves through his first paid job at sixteen, his start at Jawaker, the decision to do a master's in Germany rather than the US, and his time at Google: the interview process, promotions and how the promotion packet works, and an authentication migration project that grew into a large team. He then explains why he left Google to work on the startup full time, the story of Cash Basha and what the team learned from it, and how the company became Maqsam.\n\nThe last part is practical and technical: what the Maqsam platform does, how a phone call reaches an agent's browser, a live demo of a voice AI agent, the effect of AI on customer service jobs, and the company culture. It is useful for anyone weighing study or work abroad, anyone curious about how big tech companies operate, and founders building in the region."
    },
    "takeaways": [
      {
        "ar": "الحياة العملية لا فيها امتحانات ولا سلابس ولا نهاية فصل، فالتدريب أثناء الجامعة أو العمل على وظيفة حقيقية يساعد على فهم ذلك مبكرًا بدل أن يضيع الخريج سنوات في البحث عن طريقه.",
        "en": "Working life has no exams, syllabus or end-of-term, so internships or real work during university help you understand that early instead of losing years finding your way."
      },
      {
        "ar": "من يبني مشاريع صغيرة ويعرضها على الشركات قد يفتح لنفسه باب عمل؛ سنان حصل على أول وظيفة بدوام جزئي وهو في الجامعة بعد أن راسل شركة لرعاية مشروعه.",
        "en": "Building small projects and pitching them can open doors: Sinan got his first part-time job at university after contacting a company to sponsor his side project."
      },
      {
        "ar": "لدخول مقابلات Google من دون خلفية علوم حاسوب، طلب سنان ستة أسابيع للتحضير ودرس الـ Data Structures والـ Algorithms ودرّب نفسه على اللوح، ثم طلب تأجيل المقابلات في المكتب أسابيع إضافية ليدرس أكثر.",
        "en": "Without a computer science degree, Sinan asked for six weeks before his first Google interview, studied data structures and algorithms and practiced on a whiteboard, then postponed the on-site interviews a few more weeks to study further."
      },
      {
        "ar": "في الشركات الكبيرة لا يكفي أن يكون عملك جيدًا للترقية: عليك العمل على المشاريع المناسبة ومع الأشخاص المناسبين، وأن توثق إنجازك في ملف الترقية وتأخذ تعليقات من الزملاء.",
        "en": "At a large company good work alone does not get you promoted: you also need the right projects and the right people, and you have to document your impact in a promotion packet with feedback from colleagues."
      },
      {
        "ar": "التقط سنان مشكلة لم يطلبها أحد (قِدم جزء الـ authentication في الـ framework) وتطوع لحلها، فتحول عمله إلى مشروع طويل الأمد وفريق من 16 شخصًا.",
        "en": "Sinan took ownership of a problem nobody had asked him to fix (an outdated authentication module in an internal framework), and it grew into a multi-year effort and a team of 16."
      },
      {
        "ar": "تحول مقسم جاء بعد أن لم تستطع الشركة دعم كل منتجاتها: ركزوا على المنتج الذي عليه اهتمام وأقرب لتحقيق نتائج، وباعوا Cash Basha.",
        "en": "Maqsam came from a pivot: the team could not support all its products, so it focused on the one with real demand and sold Cash Basha."
      },
      {
        "ar": "الـ AI agents تعمل جيدًا عند البدء من الصفر لكنها ما زالت ضعيفة على كود بيس كبير ومعقد، كما أن الـ voice agents تُضبط بحسب قرار كل شركة، مثل متى تحول المكالمة إلى موظف بشري.",
        "en": "AI coding agents work well when starting from scratch but are still weak on large, complex codebases, and voice agents are configurable per company, for example when to hand a call to a human."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "المقدمة وأول لقاء وجهًا لوجه",
          "en": "Introduction and a first in-person recording"
        }
      },
      {
        "t": "3:19",
        "title": {
          "ar": "النشأة بين فرنسا وسوريا والأردن",
          "en": "Growing up across France, Syria, Jordan"
        }
      },
      {
        "t": "9:13",
        "title": {
          "ar": "سنة الفراغ وإيجاد الطريق",
          "en": "Gap years and finding your path"
        }
      },
      {
        "t": "12:47",
        "title": {
          "ar": "أول عمل ومشاريعه الأولى",
          "en": "First job and first projects"
        }
      },
      {
        "t": "22:22",
        "title": {
          "ar": "قرار الماجستير في ميونخ",
          "en": "The master's in Munich"
        }
      },
      {
        "t": "26:22",
        "title": {
          "ar": "ألمانيا أم أمريكا؟",
          "en": "Germany or the US?"
        }
      },
      {
        "t": "30:14",
        "title": {
          "ar": "الدخول إلى Google",
          "en": "Getting into Google"
        }
      },
      {
        "t": "36:56",
        "title": {
          "ar": "عملية الترقية وملفها",
          "en": "The promotion process"
        }
      },
      {
        "t": "41:53",
        "title": {
          "ar": "مشروع تحديث الـ authentication",
          "en": "The authentication migration project"
        }
      },
      {
        "t": "57:17",
        "title": {
          "ar": "لماذا ترك Google",
          "en": "Why he left Google"
        }
      },
      {
        "t": "58:35",
        "title": {
          "ar": "قصة Cash Basha",
          "en": "The Cash Basha story"
        }
      },
      {
        "t": "1:12:08",
        "title": {
          "ar": "ولادة مقسم",
          "en": "The birth of Maqsam"
        }
      },
      {
        "t": "1:16:56",
        "title": {
          "ar": "ما هي مقسم وتجربة حية",
          "en": "What Maqsam does, plus a demo"
        }
      },
      {
        "t": "1:43:14",
        "title": {
          "ar": "AI agents ومستقبل خدمة العملاء",
          "en": "AI agents and the future of support"
        }
      }
    ]
  },
  {
    "n": 21,
    "slug": "coaching-a-first-time-founder",
    "id": "0UV9hoYugXw",
    "title": {
      "ar": "تدريب مؤسس جديد مع نادين سمرا",
      "en": "Coaching a First-Time Founder"
    },
    "dek": {
      "ar": "نادين سمرا تحكي قصتها في بناء فريق تقني في الأردن، ثم تدرّب طارق في سيناريو افتراضي لتحويل تطبيق صغير إلى شركة.",
      "en": "Nadine Samra shares how she built a tech team in Jordan, then coaches Tariq through a hypothetical scenario of turning a small app into a company."
    },
    "guest": {
      "ar": "نادين سمرا",
      "en": "Nadine Samra"
    },
    "cat": "startups",
    "draft": true,
    "guestBio": {
      "ar": "مهندسة كمبيوتر، سيدة أعمال وصانعة محتوى، ومقدمة بودكاست «يوميات مدير عام».",
      "en": "Computer engineer, business executive and content creator; host of the podcast \"Yawmiyat Mudir Aam\" (Diary of a General Manager)."
    },
    "quotes": [
      {
        "t": "0:26:25",
        "ar": "هاي كلها خبرات متراكمة، لا بنقدر نقراها بكتاب ولا بنقدر نتعلمها بالجامعات ولا بالمدارس.",
        "en": "All of this is accumulated experience. We can't read it in a book, and we can't learn it at universities or schools."
      },
      {
        "t": "0:51:20",
        "ar": "دائماً أول توظيف ممكن يا يضاعف طاقتك الإنتاجية ويوصلك للمراحل اللي بدك توصلها، أو يضاعف مشاكلك.",
        "en": "The first hire can either multiply your productivity and get you to the stages you want to reach, or multiply your problems."
      },
      {
        "t": "1:15:08",
        "ar": "تصرفك أنت كفاوندر أهم من أي قوانين بتنحط. السلوك هو أهم شيء، أنت القدوة، فسلوكك هو اللي بيبني الثقافة.",
        "en": "Your behavior as a founder matters more than any rules you set. Behavior is the most important thing; you are the role model, so your behavior is what builds the culture."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:31:45",
        "ar": "على العكس تماماً، اللي بيموت الشركات الناشئة أولاً هو التشتت، بطريقة أسرع كثير من المنافسة.",
        "en": "Quite the opposite: what kills startups first is distraction, much faster than competition does."
      },
      {
        "t": "0:54:50",
        "ar": "التوظيف الصح بيرجع لك وقتك، أما الغلط حياخذ وقتك كله.",
        "en": "The right hire gives you your time back; the wrong one will take all of it."
      }
    ],
    "summary": {
      "ar": "تستضيف الحلقة نادين سمرا، مهندسة الكمبيوتر وسيدة الأعمال وصانعة المحتوى ومقدمة بودكاست «يوميات مدير عام». في النصف الأول تحكي عن مسيرتها: من طفولة قضتها مع ألعاب الكمبيوتر في دبي، إلى قيادة التقنية الرقمية في مجموعة MBC، وبناء مكتب تقني لمنصة شاهد في الأردن من الصفر حتى وصل إلى قرابة 48 شخصاً. تتحدث بصراحة عن تحديات القيادة في سن صغيرة، وعن إدارة فريق بحجم شركة كاملة لأول مرة، وكيف دخلت عالم صناعة المحتوى.\n\nالجزء الثاني جلسة كوتشينغ على شكل سيناريو افتراضي: طارق مؤسس جديد بنى تطبيقاً يعتمد على الذكاء الاصطناعي لتجهيز المبرمجين لسوق العمل، ويحقق نحو 1000 دولار شهرياً من الاشتراكات، ونادين هي المدربة. تمر الأسئلة على الأولويات في هذه المرحلة، وفهم التدفق النقدي، ومتى وأين تسجّل الشركة، ومصادر التمويل، وأول توظيف، وتوظيف الأصدقاء، ودور المؤسس، وأولويات الميزات، والمكتب، وثقافة الشركة، وإشراك المهندسين الأوائل بحصص.\n\nالحلقة مفيدة لمن عنده منتج صغير ويفكر كيف يحوله إلى شركة، ولمن يريد فهم الجانب الإداري والتنظيمي للتأسيس إلى جانب الجانب التقني. وفي ختام الحلقة يُذكر أن هناك أسئلة لم يتسع الوقت لها وأن جزءاً ثانياً محتمل.",
      "en": "The guest is Nadine Samra, a computer engineer, business executive and content creator who hosts the podcast \"Yawmiyat Mudir Aam\". The first half covers her career: a childhood spent on computer games in Dubai, leading digital technology at MBC Group, and building a technology office for the Shahid platform in Jordan from scratch until it reached around 48 people. She speaks candidly about leading at a young age, running a team the size of a whole company for the first time, and how she moved into content creation.\n\nThe second half is a coaching session built around a hypothetical scenario. Tariq plays a new founder who built an AI-powered app that prepares programmers for the job market and earns roughly $1,000 a month in subscriptions; Nadine plays his coach. The questions cover priorities at this stage, understanding cash flow, when and where to register a company, funding sources, the first hire, hiring friends, the founder's role, feature prioritization, the physical office, company culture, and giving early engineers equity.\n\nIt is useful for anyone with a small product who is wondering how to turn it into a company, and for engineers who want to understand the business and organizational side of founding. The episode ends by noting that many questions were left for lack of time and that a second part may follow."
    },
    "takeaways": [
      {
        "ar": "في مرحلة مبكرة ركّز على ثلاثة أشياء: العملاء، والكاش فلو، ووضوح الرؤية. التشتت يقتل الشركات الناشئة أسرع من المنافسين.",
        "en": "Early on, focus on three things: customers, cash flow and a clear vision. Distraction kills startups faster than competitors do."
      },
      {
        "ar": "استمع للعملاء عبر الفيدباك داخل التطبيق والموقع والإيميلات؛ العملاء الأوفياء يكتشفون المشاكل قبل فريقك.",
        "en": "Listen to customers through in-app and website feedback and email; loyal customers often spot problems before your own team does."
      },
      {
        "ar": "افهم أرقامك: كم تصرف وكم يدخل، وضع خطة لسنة إلى ثلاث سنوات، حتى لا تفاجأ بأنك بلا كاش ولا وقت لإيجاد تمويل.",
        "en": "Understand your numbers: what you spend and what comes in, with a one-to-three-year plan, so you are not surprised by running out of cash with no time to raise funding."
      },
      {
        "ar": "سجّل الشركة عندما يبدأ الدخل، وابقَ بسيطاً: كيان واحد وحساب بنكي واحد ومحاسبة واحدة. السؤال ليس أين تسجّل بل أن تكون أمورك نظيفة وقانونية.",
        "en": "Register the company once income begins and keep it simple: one entity, one bank account, one accounting setup. The point is less where you register than keeping things clean and legal."
      },
      {
        "ar": "فكّر بالتمويل بالترتيب: إيرادات العملاء أولاً، ثم الأصدقاء والعائلة مع توثيق الشروط، ثم المنح وبرامج الشركات الناشئة، ثم المستثمرون.",
        "en": "Think about funding in order: customer revenue first, then friends and family with documented terms, then grants and startup programs, then investors."
      },
      {
        "ar": "أول موظف إما يضاعف إنتاجيتك أو مشاكلك: وظّف لحل عنق الزجاجة، واختر أشخاصاً مرنين، وابدأ بفريلانسرز وكونتراكترز قبل الموظفين الدائمين.",
        "en": "The first hire either doubles your productivity or doubles your problems: hire to fix your bottleneck, choose adaptable people, and start with freelancers and contractors before permanent staff."
      },
      {
        "ar": "المؤسس قائد أوركسترا لا منفّذ لكل شيء: الرؤية، وجلب التمويل، وبناء الأنظمة المبكرة. وسلوكك أنت هو الذي يبني ثقافة الشركة.",
        "en": "The founder is an orchestra conductor, not the person who does everything: vision, raising money and building early systems. Your own behavior is what builds company culture."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "المقدمة وشكل الحلقة",
          "en": "Introduction and episode format"
        }
      },
      {
        "t": "2:32",
        "title": {
          "ar": "قصة نادين مع التقنية",
          "en": "Nadine's path into tech"
        }
      },
      {
        "t": "5:08",
        "title": {
          "ar": "بناء مكتب شاهد في الأردن",
          "en": "Building the Shahid office in Jordan"
        }
      },
      {
        "t": "9:14",
        "title": {
          "ar": "تحديات القيادة في سن صغيرة",
          "en": "Leading at a young age"
        }
      },
      {
        "t": "14:20",
        "title": {
          "ar": "لماذا أُعطيت هذه الفرصة",
          "en": "Why she got the opportunity"
        }
      },
      {
        "t": "19:48",
        "title": {
          "ar": "الدخول إلى صناعة المحتوى",
          "en": "Becoming a content creator"
        }
      },
      {
        "t": "27:29",
        "title": {
          "ar": "السيناريو الافتراضي للمؤسس",
          "en": "The founder scenario begins"
        }
      },
      {
        "t": "30:15",
        "title": {
          "ar": "الأولويات: العملاء والكاش والرؤية",
          "en": "Priorities: customers, cash, vision"
        }
      },
      {
        "t": "37:34",
        "title": {
          "ar": "متى وأين تسجّل الشركة",
          "en": "When and where to register"
        }
      },
      {
        "t": "42:26",
        "title": {
          "ar": "مصادر التمويل والمستثمرون",
          "en": "Funding sources and investors"
        }
      },
      {
        "t": "51:00",
        "title": {
          "ar": "أول توظيف والفريلانسرز",
          "en": "First hire and freelancers"
        }
      },
      {
        "t": "56:19",
        "title": {
          "ar": "توظيف الأصدقاء والشراكات",
          "en": "Hiring friends and partnerships"
        }
      },
      {
        "t": "1:00:39",
        "title": {
          "ar": "دور المؤسس: قائد الأوركسترا",
          "en": "The founder as conductor"
        }
      },
      {
        "t": "1:08:21",
        "title": {
          "ar": "المكتب وثقافة الشركة",
          "en": "The office and company culture"
        }
      }
    ]
  },
  {
    "n": 20,
    "slug": "data-engineering-mercedes-content-creation",
    "id": "YszoCsNp6o4",
    "title": {
      "ar": "من حلب إلى مرسيدس وصناعة المحتوى",
      "en": "Data Engineering, Mercedes and Content"
    },
    "dek": {
      "ar": "براء، Data Engineer في مرسيدس، يحكي عن شغله، أثر الـ AI على مهنته، رحلته من حلب إلى ألمانيا، وقناته على يوتيوب.",
      "en": "Baraa, a data engineer at Mercedes, on his work, how AI is changing the job, his path from Aleppo to Germany, and building a YouTube channel."
    },
    "guest": {
      "ar": "براء خطيب",
      "en": "Baraa Khatib"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "Lead Data Engineer ومالك المشروع (Product Owner) في مرسيدس-بنز في ألمانيا، وصانع محتوى تقني بالإنجليزية على يوتيوب.",
      "en": "Lead Data Engineer and project/product owner at Mercedes-Benz in Germany, and an English-language tech content creator on YouTube."
    },
    "quotes": [
      {
        "t": "0:20:14",
        "ar": "اذا انت عندك فكره حلوه وبتعرف تسوق فكرتك للمانجرز وللكستمرز ممكن تعمل اي شيء.",
        "en": "If you have a good idea and you know how to sell it to managers and customers, you can do anything."
      },
      {
        "t": "1:15:06",
        "ar": "بعتقد قصه التوظيف هي قصه حظ اكثر ما هي خبره، بتكون عم تقدم للتيم المناسب بالوقت المناسب.",
        "en": "I think hiring is more a story of luck than of experience; you happen to apply to the right team at the right time."
      },
      {
        "t": "1:41:11",
        "ar": "كل انسان عنده نولدج. بس افتح فيديو واحكي عنه، وهالشيء انا بقول لك خلال سنتين رح تشوف في ناس بالعالم عم بستنوا فيديوهاتك اسبوعيا.",
        "en": "Every person has knowledge. Just open a video and talk about it, and I'm telling you that within two years you will see people around the world waiting for your videos every week."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:53:20",
        "ar": "ما باكل هم ابدا انه اخسر شغلي انه الاي اي ياخذ لي شغلي. بالعكس في كثير شغلات ما بدي اساويها كداتا انجينير ومبسوط انه في اي اي ممكن ياخذ عني الحمل.",
        "en": "I never worry about losing my job to AI. On the contrary, there are many things I don't want to do as a data engineer, and I'm happy there is an AI that can take that load off me."
      },
      {
        "t": "2:06:40",
        "ar": "ما تستنى البيرفكت مومنت، بس بلش تعلم وانبسط بالرحله.",
        "en": "Don't wait for the perfect moment; just start, learn, and enjoy the journey."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق براء، مهندس داتا يعمل في مرسيدس-بنز في ألمانيا ويقدّم محتوى تقنياً بالإنجليزية على يوتيوب. في القسم الأول يشرح براء طبيعة شغله: بناء أنظمة وتقارير تساعد مهندسي السيارات والمديرين على اتخاذ قرارات مبنية على الداتا، وكيف انتقل من مطوّر إلى قائد لمشروع فيه 15 شخصاً بعد أن أقنع الإدارة بنقل الداتا إلى الكلاود عبر Proof of Concept. ويتحدث عن تجربته مع الـ Migration، ولماذا يفضّل إعادة التصميم على نقل النظام القديم كما هو.\n\nثم ينتقل الحديث إلى الـ AI: كيف غيّر مراجعة الكود وكتابة المهام والعصف الذهني، ولماذا صار دور الـ Data Engineer هو تجهيز داتا نظيفة ومرتبة يعتمد عليها الـ AI، وما حدود الأدوات الحالية مع غياب الـ Best Practices ومع معرفة الشركة التي لم تُوثَّق. بعد ذلك يحكي قصته الشخصية: دراسته في حلب، التقديم على أكثر من 30 جامعة ألمانية، تعلّم الألمانية، الماجستير، وظيفة الطالب التي تحولت إلى وظيفة دائمة، ثم IBM و Bosch وأخيراً مرسيدس، مع نصائح عن المقابلات والرفض.\n\nفي القسم الأخير يتكلم عن بداياته في صناعة المحتوى بكاميرا ويب بسيطة، وكيف نما القناة، ودور الـ SQL course في انتشارها، ولماذا يكتب بالإنجليزية، وما ينصح به من يريد أن يبدأ. الحلقة مفيدة لمن يعمل أو يريد العمل في الداتا، ولمن يفكر في العمل في ألمانيا، ولمن يؤجل فتح قناة لأنه ينتظر المعدات المثالية.",
      "en": "Tariq hosts Baraa, a data engineer at Mercedes-Benz in Germany who also creates English-language tech content on YouTube. In the first part Baraa explains his work: building systems and reports that help car engineers and managers make decisions from data, and how he went from developer to leading a 15-person project after convincing management to move data to the cloud through a proof of concept. He also discusses migrations and why he prefers re-engineering over moving an old system as it is.\n\nThe conversation then turns to AI: how it has changed code review, task writing and brainstorming, why the data engineer's role is becoming one of preparing clean, well-organised data for AI to rely on, and what limits today's tools face given the lack of best practices and the company knowledge that was never documented. He then tells his own story: studying in Aleppo, applying to more than 30 German universities, learning German, his master's degree, a student job that became a full-time role, then IBM, Bosch and finally Mercedes, with advice on interviews and rejection.\n\nThe last part covers how he started making content with a basic webcam, how the channel grew, the role his SQL course played, why he publishes in English, and what he advises people who want to start. It is useful for anyone working or aiming to work in data, anyone considering a career in Germany, and anyone putting off starting a channel while waiting for perfect equipment."
    },
    "takeaways": [
      {
        "ar": "فكرة جيدة مع أسلوب إقناع واضح للمديرين والعملاء تكفي لتغيير مشروع كامل؛ براء بدأ بـ Proof of Concept لوحده قبل أن يحصل على ميزانية لنقل الداتا إلى الكلاود.",
        "en": "A good idea plus a clear way of selling it to managers and customers can change a whole project; Baraa started with a one-person proof of concept before getting budget to move data to the cloud."
      },
      {
        "ar": "عند عمل Migration يفضّل براء إعادة تحليل المتطلبات والتصميم من جديد بدل Lift and Shift، ولا ينقل التقارير والداشبوردات التي لا يستخدمها أحد.",
        "en": "For migrations, Baraa prefers re-examining requirements and redesigning rather than lift-and-shift, and does not migrate reports and dashboards nobody uses."
      },
      {
        "ar": "مهمة الـ Data Engineer تتغير: صار عليه تجهيز داتا نظيفة ومرتبة من مصادر متعددة حتى يعطي الـ AI إجابات صحيحة على أسئلة المديرين، لأن الداتا غير المضبوطة تعطي أجوبة خاطئة.",
        "en": "The data engineer's job is shifting: preparing clean, organised data from multiple sources so AI can answer managers' questions correctly, because poorly prepared data produces wrong answers."
      },
      {
        "ar": "الـ AI لا يعرف مشاكل الشركة الداخلية لأنه لم يتدرب على داتا خاصة، وجزء كبير من معرفة الشركة غير موثّق، لذلك ما زال تنظيف الداتا يحتاج شخصاً يفهم الـ Domain والـ Process.",
        "en": "AI has not been trained on a company's private problems, and much company knowledge is undocumented, so cleaning data still needs someone who understands the domain and the process."
      },
      {
        "ar": "الأدوات تأتي وتذهب، فالأهم فهم الأساسيات مثل ETL و ELT وبث الداتا والمعالجة بالدفعات؛ براء يستخدم Databricks لأنه قريب من Azure ويغطي معظم حاجة المشروع.",
        "en": "Tools come and go, so the fundamentals matter more: ETL, ELT, streaming and batch processing. Baraa uses Databricks because it sits close to Azure and covers most of a project's needs."
      },
      {
        "ar": "الطالب الذي يعمل أثناء الدراسة يكسب خبرة وثقة؛ براء ينصح بالبحث عن عمل أو تدريب منذ الدراسة، وقد تحولت وظيفة الطالب عنده إلى وظيفة دائمة بعد التخرج.",
        "en": "Working during your studies builds experience and confidence; Baraa advises seeking work or an internship while still a student, and his student job became a permanent role after graduation."
      },
      {
        "ar": "الصوت أهم من الصورة في محتوى الشرح؛ ميكروفون جيد فرق معه أكثر من الكاميرا، لكن أهم شيء هو المحتوى، ولا يجب انتظار المعدات المثالية قبل البدء.",
        "en": "For educational content, sound matters more than picture; a good microphone made more difference than the camera, but content comes first, and you should not wait for perfect gear before starting."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيف",
          "en": "Introduction to the guest"
        }
      },
      {
        "t": "0:06:01",
        "title": {
          "ar": "شغل Data Engineer في مرسيدس",
          "en": "Data engineering at Mercedes"
        }
      },
      {
        "t": "0:16:29",
        "title": {
          "ar": "سبع سنوات والنمو في الشركة",
          "en": "Seven years and growing at Mercedes"
        }
      },
      {
        "t": "0:18:23",
        "title": {
          "ar": "إقناع الإدارة بالكلاود",
          "en": "Convincing management to use the cloud"
        }
      },
      {
        "t": "0:23:54",
        "title": {
          "ar": "الـ Migration وإعادة التصميم",
          "en": "Migration and re-engineering"
        }
      },
      {
        "t": "0:36:44",
        "title": {
          "ar": "الداتا كأساس للـ AI",
          "en": "Data as the foundation for AI"
        }
      },
      {
        "t": "0:49:13",
        "title": {
          "ar": "هل يستبدل الـ AI مهندس الداتا؟",
          "en": "Will AI replace data engineers?"
        }
      },
      {
        "t": "0:53:38",
        "title": {
          "ar": "من حلب إلى ألمانيا",
          "en": "From Aleppo to Germany"
        }
      },
      {
        "t": "1:04:11",
        "title": {
          "ar": "الماجستير ووظيفة الطالب",
          "en": "The master's and the student job"
        }
      },
      {
        "t": "1:09:41",
        "title": {
          "ar": "IBM و Bosch والرفض الكثير",
          "en": "IBM, Bosch and repeated rejections"
        }
      },
      {
        "t": "1:16:55",
        "title": {
          "ar": "مقابلات مرسيدس وألمانيا",
          "en": "Mercedes interviews and German"
        }
      },
      {
        "t": "1:26:54",
        "title": {
          "ar": "البداية في صناعة المحتوى",
          "en": "Starting as a content creator"
        }
      },
      {
        "t": "1:55:14",
        "title": {
          "ar": "نمو القناة وكورس SQL",
          "en": "Channel growth and the SQL course"
        }
      },
      {
        "t": "2:00:31",
        "title": {
          "ar": "المحتوى بالإنجليزية ونصائح للمبتدئين",
          "en": "English content and advice for beginners"
        }
      }
    ]
  },
  {
    "n": 19,
    "slug": "cloud-architect-career-family-mentori",
    "id": "rxNoFj_FdyQ",
    "title": {
      "ar": "مسار مهندسة سحابة بين العمل والعائلة",
      "en": "A Cloud Architect's Path Across Two Continents"
    },
    "dek": {
      "ar": "من جامعة دمشق إلى Azure في مايكروسوفت: التطور المهني، التوازن مع العائلة، ومنصة Mentori",
      "en": "From Damascus University to Azure at Microsoft: career growth, family balance and the Mentori platform"
    },
    "guest": {
      "ar": "هلا جمال",
      "en": "Hala Jamal"
    },
    "guestBio": {
      "ar": "Cloud Solutions Architect في مايكروسوفت (Azure)، سورية الأصل.",
      "en": "Cloud Solutions Architect at Microsoft (Azure), originally from Syria."
    },
    "cat": "stories",
    "draft": true,
    "quotes": [
      {
        "t": "12:10",
        "ar": "بغض النظر عن الشركة، شركة كبيرة شركة صغيرة، إنت مسؤول عن هذا التطور المهني والاستمرار بالتعلم.",
        "en": "Regardless of the company, big or small, you are responsible for this professional development and for continuing to learn."
      },
      {
        "t": "55:35",
        "ar": "أنا بهديك اللحظة اتخذت قرار إني بدي أتحكم بحياتي المهنية، ما عاد بدي أخلي الشركة اللي بشتغل فيها تتحكم بحياتي المهنية.",
        "en": "In that moment I made a decision that I wanted to take control of my professional life, and I no longer wanted to let the company I work for control it."
      },
      {
        "t": "1:31:05",
        "ar": "أنا ما بلحق أعمل كل شيء، وهذا الشيء أنا متصالحة معه.",
        "en": "I can't manage to do everything, and I have made peace with that."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:13:50",
        "ar": "لا تستنى لتتحسن الظروف، لأنه الظروف بعمرها ما بتتحسن، دائماً رح تكون أصعب، وهذا الشيء بينطبق على أي شيء بالحياة، مو بس بالشغل.",
        "en": "Don't wait for conditions to improve, because conditions never improve; they will always be harder. And that applies to anything in life, not just work."
      },
      {
        "t": "1:40:40",
        "ar": "ما كان الهدف مايكروسوفت، ما كان الهدف أي شركة من شركات التك الكبيرة، الهدف إني بدي أصير Cloud Solutions Architect.",
        "en": "The goal was not Microsoft, and it was not any of the big tech companies. The goal was that I wanted to become a Cloud Solutions Architect."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق مهندسة سورية تعمل Cloud Solutions Architect في مايكروسوفت، وتشرح كيف تقسّم عملها بين الجانب التقني والاستراتيجية وفهم المبيعات، وكيف تساعد شركات في قطاعات مختلفة (تعليم، صحة، تمويل عقاري وغيرها) على الانتقال من Data Center تقليدي إلى السحابة. تتحدث عن الشهادات والتعلم المستمر، وعن أن أول خطأ يقع فيه التقنيون الجدد هو الشرح قبل الاستماع لمشكلة العميل.\n\nثم ينتقل الحديث إلى قصتها الشخصية: دراسة هندسة المعلوماتية في دمشق، العمل في سوق دمشق للأوراق المالية، ماجستير في السويد، ثم الانتقال إلى أمريكا نهاية 2012 والبحث عن عمل. تحكي عن سنوات العمل كمبرمجة، وقرار التحكم بمسارها المهني بدل انتظار الشركة، والتحول إلى Full Stack ثم إلى Cloud Architect بدعم من مدير مؤمن بها.\n\nويخصص جزء كبير من الحلقة لتجربتها كأم عاملة في الغربة: كيف اختارت أولوياتها ومكان سكنها، ولماذا ترى مسارها المهني منحنى بفترات سكون وفترات صعود. وتختم بالحديث عن منصة Mentori غير الربحية لربط الخريجين السوريين بمرشدين في المهجر. الحلقة مفيدة لمن يفكر بالانتقال إلى السحابة، ولمن يوازن بين الطموح المهني والعائلة، ولمن يعيش أو يخطط للعيش في الغربة.",
      "en": "Tariq hosts a Syrian engineer who works as a Cloud Solutions Architect at Microsoft. She explains how her job splits between technical work, strategy and sales awareness, and how she helps companies in very different sectors (education, healthcare, mortgage lending and others) move from traditional data centers to the cloud. She discusses certifications and continuous learning, and says the first mistake new technical people make is explaining a service before listening to the customer's problem.\n\nThe conversation then turns to her own story: studying Informatics Engineering in Damascus, working at the Damascus Securities Exchange, a master's degree in Sweden, and moving to the US at the end of 2012 to look for work. She describes her years as a programmer, the decision to take control of her career instead of waiting for her company, and her move into full-stack development and then into cloud architecture with the support of a manager who believed in her.\n\nA large part of the episode covers life as a working mother abroad: how she chose her priorities and where to live, and why she sees her career as a curve with quiet stretches and periods of growth. She closes with Mentori, a non-profit platform connecting Syrian graduates with mentors abroad. It is useful for anyone considering a move to cloud, balancing career ambition with family, or living or planning to live abroad."
    },
    "takeaways": [
      {
        "ar": "تقسّم عملها تقريباً إلى 70% تقني و20% استراتيجية وعلاقات مع الشركات و10% معرفة بالمبيعات، وترى أن النجاح يحتاج هذه الأجزاء معاً.",
        "en": "She describes her work as roughly 70% technical, 20% strategy and customer relationships, and 10% sales knowledge, and says success needs all three together."
      },
      {
        "ar": "التطور المهني مسؤولية الشخص نفسه: لا أحد يجبرك، والشهادات بداية لبناء المصداقية لكنها لا تكفي دون خبرة عملية.",
        "en": "Professional growth is your own responsibility: nobody forces you, and certifications help build credibility at the start but are not enough without hands-on experience."
      },
      {
        "ar": "القاعدة الأولى مع العميل: اسمع قبل أن تشرح. اسأل عن المشكلة الحالية ثم قدّم الحل بخطوات تناسب مستوى خبرته.",
        "en": "Rule number one with customers: listen before you explain. Ask about the current pain points, then offer a phased approach that fits their skill level."
      },
      {
        "ar": "عند التحول لدور جديد، ابحث في LinkedIn عن الوظيفة التي تطمح لها، واقرأ الوصف الوظيفي، وابنِ خطة تعلم من الفجوات التي تجدها.",
        "en": "To move toward a new role, look up the job you aspire to on LinkedIn, read the description, and build a learning plan from the gaps you find."
      },
      {
        "ar": "لا تنتظر تحسّن الظروف أو اكتمال المهارات لتخوض تجربة جديدة؛ تطوعت لمشاريع Azure وهي لا تملك خبرة سابقة فيها، وتعلمت أثناء العمل.",
        "en": "Don't wait for conditions to improve or for your skills to be complete before taking a new step; she volunteered for Azure projects without prior experience and learned on the job."
      },
      {
        "ar": "في موازنة العمل والعائلة، حدّدت أولوياتها (العائلة أولاً ثم العمل ثم نفسها)، واختارت وظائف قريبة من المدرسة وبدون سفر، وتعتمد على شبكة دعم من الزوج والأصدقاء وأمهات ناجحات.",
        "en": "To balance work and family she set priorities (family first, then work, then herself), chose jobs close to her children's school with no travel, and relies on a support network of her husband, friends and successful mothers."
      },
      {
        "ar": "تنظر إلى مسارها المهني على مدى سنوات طويلة بدل القرارات العاطفية قصيرة المدى، وتقبل أن بعض الفترات أبطأ من غيرها.",
        "en": "She looks at her career over a long horizon rather than making short-term emotional decisions, and accepts that some periods are slower than others."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة ومحاور الحلقة",
          "en": "Introduction and topics"
        }
      },
      {
        "t": "1:12",
        "title": {
          "ar": "دور Cloud Solutions Architect",
          "en": "The Cloud Solutions Architect role"
        }
      },
      {
        "t": "5:08",
        "title": {
          "ar": "عملاء في مراحل مختلفة من السحابة",
          "en": "Customers at different cloud stages"
        }
      },
      {
        "t": "6:26",
        "title": {
          "ar": "بناء الخبرة والشهادات",
          "en": "Building skills and certifications"
        }
      },
      {
        "t": "14:23",
        "title": {
          "ar": "اختلاف احتياجات القطاعات",
          "en": "How sectors differ"
        }
      },
      {
        "t": "18:40",
        "title": {
          "ar": "ما تحبه وما لا تحبه في العمل",
          "en": "What she likes and dislikes"
        }
      },
      {
        "t": "21:02",
        "title": {
          "ar": "الاستماع للعميل قبل الحل",
          "en": "Listening before proposing solutions"
        }
      },
      {
        "t": "33:07",
        "title": {
          "ar": "من دمشق إلى السويد",
          "en": "From Damascus to Sweden"
        }
      },
      {
        "t": "42:08",
        "title": {
          "ar": "الانتقال إلى أمريكا والبحث عن عمل",
          "en": "Moving to the US and job hunting"
        }
      },
      {
        "t": "53:40",
        "title": {
          "ar": "نقطة التحول في المسار المهني",
          "en": "The career turning point"
        }
      },
      {
        "t": "1:03:14",
        "title": {
          "ar": "الطريق إلى Cloud Architect",
          "en": "The path to Cloud Architect"
        }
      },
      {
        "t": "1:15:14",
        "title": {
          "ar": "الطموح المهني وتربية الأطفال",
          "en": "Career ambition and raising children"
        }
      },
      {
        "t": "1:31:35",
        "title": {
          "ar": "الانضمام إلى مايكروسوفت",
          "en": "Joining Microsoft"
        }
      },
      {
        "t": "1:51:23",
        "title": {
          "ar": "منصة Mentori للإرشاد",
          "en": "The Mentori mentoring platform"
        }
      }
    ]
  },
  {
    "n": 18,
    "slug": "village-to-y-combinator-open-cx",
    "id": "DWvktIXW6vQ",
    "title": {
      "ar": "من أم قصير إلى Y Combinator",
      "en": "From a Jordanian Village to Y Combinator"
    },
    "dek": {
      "ar": "محمد الغرابات يحكي رحلته من قرية في جنوب عمان إلى تأسيس Open وقبولها في Y Combinator",
      "en": "Mohammad Al-Gharabat on going from a village south of Amman to founding Open and joining Y Combinator"
    },
    "guest": {
      "ar": "محمد الغرابات",
      "en": "Mohammad Al-Gharabat"
    },
    "cat": "startups",
    "draft": true,
    "guestBio": {
      "ar": "مؤسس شركة Open (open.cx)، خريج برنامج Y Combinator.",
      "en": "Founder of Open (open.cx), a Y Combinator-backed startup."
    },
    "quotes": [
      {
        "t": "0:35:41",
        "ar": "البرمجة بدك تساوي شيء، لازم يكون في شيء ملموس، والخريجين معظمهم ما في شيء ملموس.",
        "en": "In programming you need to make something, there has to be something tangible, and most graduates have nothing tangible."
      },
      {
        "t": "1:35:35",
        "ar": "احكي مع المستخدم تبعك، هو اللي حيشتري منك المنتج، هو اللي حيدفع لك فلوس. فإذا إنت ما كنت فاهم هو شو بده، ما حدا حيشتري منك.",
        "en": "Talk to your users. They are the ones who will buy your product and pay you. If you don't understand what they want, nobody will buy from you."
      },
      {
        "t": "2:03:45",
        "ar": "اليوم الكل قادر يبني مع الـ AI. بصفي التريك إنك كيف تقدر تسبوت المشاكل اللي بواجهوها البزنسز أو الناس أو المجتمع، تعرفها وتفهمها، وبعدين تبني لها حل.",
        "en": "Today everyone can build with AI. In the end the trick is how you spot the problems that businesses, people or society face, know and understand them, and then build a solution for them."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:34:35",
        "ar": "الناس مش حتدفع فلوس لأي شيء. الناس هناك لو بدهم يشتروا منك منتج، منتجك لازم يكون شغال وزيادة يكون أحسن من أي شيء موجود بالسوق، غير هيك حتطحنك المنافسة.",
        "en": "People won't pay money for just anything. If they're going to buy your product there, it has to work and be better than anything else on the market, otherwise the competition will crush you."
      },
      {
        "t": "2:05:15",
        "ar": "أنا ما تركت الجامعة لأني بدي أتركها. ما بنصح إنك تترك الجامعة لأجل إنك بدك تترك الجامعة.",
        "en": "I didn't leave university because I wanted to leave it. I don't advise leaving university just for the sake of leaving it."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق محمد الغرابات، مؤسس شركة Open المسجلة في أمريكا والتي يعمل فريقها من الأردن وهولندا ومصر. يبدأ الحديث بتعريف المنتج: وكيل ذكاء اصطناعي يعمل كموظف خدمة عملاء للشركات الكبيرة مثل البنوك وشركات الطيران والـ Fintech، وغالبية عملائه اليوم من أوروبا وأمريكا الشمالية.\n\nثم يعود محمد إلى البداية: النشأة في قرية أم قصير جنوب عمان ورعاية الأغنام مع العائلة، والتوجيهي بمعدل 72، وتغيير التخصص إلى علم الحاسوب في الجامعة الأردنية قبل يوم من نهاية التقديم عبر قبول الأقل حظاً. ويحكي كيف دخل سوق العمل مبكراً في شركة تعليمية، ثم OpenSooq و Baz و Zid، وكيف أجّل فصول الجامعة سنوات إلى أن حصل على الشهادة قبل التسجيل بأسابيع.\n\nويتوسع بعدها في الانتقال إلى هولندا للعمل في Mollie، وبناء مشروعي مفتوح المصدر OpenChat و OpenCopilot في وقت الفراغ، ثم الاستثمار الأول من Propeller، والقبول في Y Combinator وما جرى هناك من تحول إلى منتج دعم العملاء، وجولة تمويل بقيمة مليون ونصف دولار، والعودة إلى الأردن لبناء الشركة. الحلقة مفيدة لمن يفكر في تأسيس شركة تقنية أو في طريق غير تقليدي بعد الجامعة.",
      "en": "Tariq hosts Mohammad Al-Gharabat, founder of Open, a company registered in the US whose team works from Jordan, the Netherlands and Egypt. He starts with the product: an AI agent that acts as a customer-support employee for large companies such as banks, airlines and fintechs, with most customers today in Europe and North America.\n\nMohammad then goes back to the beginning: growing up in the village of Umm Qusayr south of Amman and looking after the family's sheep, finishing Tawjihi with 72, and switching to Computer Science at the University of Jordan the day before the application deadline through the disadvantaged-areas admission track. He describes entering the job market early at an edtech company, then OpenSooq, Baz and Zid, and how he deferred university semesters for years and received his degree only a few weeks before the recording.\n\nHe goes on to cover moving to the Netherlands to work at Mollie, building the open-source projects OpenChat and OpenCopilot in his spare time, the first investment from Propeller, getting into Y Combinator and the pivot to customer support that followed, a 1.5 million dollar round, and returning to Jordan to build the company. It is useful for anyone thinking about founding a tech company or taking a non-traditional path after university."
    },
    "takeaways": [
      {
        "ar": "المنتج يُبنى من فهم المستخدم: تحدث مع المستخدمين لأنهم هم من سيشترون ويدفعون، وإذا لم تفهم ما يريدونه فلن يشتري أحد.",
        "en": "Products are built from understanding the user: talk to your users, because they are the ones who will buy and pay, and if you don't understand what they want, nobody will buy."
      },
      {
        "ar": "في سوق الشركات العالمي لا يكفي أن يعمل المنتج، بل يجب أن يكون أفضل من البدائل الموجودة، وهذا سبب تعثر كثير من المنتجات العربية خارج المنطقة بحسب محمد.",
        "en": "In the global market it is not enough for a product to work; it must be better than what already exists, which Mohammad gives as a reason many Arab products struggle to expand outside the region."
      },
      {
        "ar": "الشيء الملموس يميّز المتقدم: ما بناه محمد في وقت فراغه ساعده في الحصول على أول وظائفه وهو في السنة الأولى، لأن معظم الخريجين لا يملكون ما يعرضونه.",
        "en": "Something tangible sets a candidate apart: what Mohammad built in his own time helped him land early jobs in his first year, because most graduates have nothing to show."
      },
      {
        "ar": "المشروع المفتوح المصدر وصل إلى نحو 5000 نجمة على GitHub ثم تحول إلى فكرة شركة، لكن الاتجاه الذي يسحبه إليه المجتمع قد لا يخدم الجانب التجاري.",
        "en": "The open-source project reached around 5,000 GitHub stars and became the seed of a company, but the direction a community pulls a project in may not serve the commercial side."
      },
      {
        "ar": "اكتشف الفريق في Y Combinator أن منتجهم الأول لن يصمد أمام النماذج الكبيرة التي بدأت تدعم استدعاء الدوال، فغيّروا الاتجاه إلى دعم العملاء بعد ملاحظة أن مستخدميهم يستخدمونه لهذا الغرض.",
        "en": "At Y Combinator the team realised their first product would not survive large models adding function calling, so they pivoted to customer support after seeing that their users were already using it that way."
      },
      {
        "ar": "حجم التمويل يجب أن يناسب طبيعة العمل: شركة برمجيات تحتاج ما يكفي لتوظيف مهندسين ومبيعات للمرحلة التالية، وليس بالضرورة أكبر مبلغ ممكن.",
        "en": "The size of a round should fit the business: a software company needs enough for engineers and sales to reach the next milestone, not necessarily the largest sum possible."
      },
      {
        "ar": "مع الذكاء الاصطناعي صار البناء متاحاً للجميع، فنصيحة محمد أن يركّز الشاب على التقاط المشاكل الحقيقية عند الناس والشركات ثم بناء حل لها.",
        "en": "With AI, building is available to everyone, so Mohammad's advice is to focus on spotting real problems people and businesses face, and then building a solution."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "تقديم الضيف وشركة Open",
          "en": "Introducing the guest and Open"
        }
      },
      {
        "t": "3:48",
        "title": {
          "ar": "ماذا تقدم Open للشركات",
          "en": "What Open offers companies"
        }
      },
      {
        "t": "8:44",
        "title": {
          "ar": "النشأة في أم قصير",
          "en": "Growing up in Umm Qusayr"
        }
      },
      {
        "t": "15:43",
        "title": {
          "ar": "التوجيهي والقبول بعلم الحاسوب",
          "en": "Tawjihi and admission to Computer Science"
        }
      },
      {
        "t": "30:58",
        "title": {
          "ar": "أول وظيفة في شركة تعليمية",
          "en": "First job at an edtech company"
        }
      },
      {
        "t": "36:14",
        "title": {
          "ar": "منصة مختبر اختراق على الكلاود",
          "en": "A cloud-based hacking lab platform"
        }
      },
      {
        "t": "39:41",
        "title": {
          "ar": "العمل في OpenSooq",
          "en": "Working at OpenSooq"
        }
      },
      {
        "t": "42:31",
        "title": {
          "ar": "Baz ثم Zid وسوق التطبيقات",
          "en": "Baz, then Zid and its app market"
        }
      },
      {
        "t": "50:06",
        "title": {
          "ar": "مقابلات Mollie والانتقال لهولندا",
          "en": "Mollie interviews and moving to the Netherlands"
        }
      },
      {
        "t": "1:00:19",
        "title": {
          "ar": "مشاريع مفتوحة المصدر بعد الدوام",
          "en": "Open-source projects after work"
        }
      },
      {
        "t": "1:07:25",
        "title": {
          "ar": "قرار تحويلها إلى شركة والاستثمار الأول",
          "en": "Turning it into a company, first investment"
        }
      },
      {
        "t": "1:20:29",
        "title": {
          "ar": "برنامج Y Combinator والتحول لدعم العملاء",
          "en": "Y Combinator and the pivot to support"
        }
      },
      {
        "t": "1:53:07",
        "title": {
          "ar": "تشكّل فريق التأسيس",
          "en": "How the founding team formed"
        }
      },
      {
        "t": "2:03:11",
        "title": {
          "ar": "نصائح للطامحين",
          "en": "Advice for aspiring founders"
        }
      }
    ]
  },
  {
    "n": 17,
    "slug": "problem-solving-to-careem",
    "id": "XMr-x_bnekg",
    "title": {
      "ar": "من الـ Problem Solving إلى كريم",
      "en": "From Problem Solving to Careem"
    },
    "dek": {
      "ar": "عبد الله أبو صلاح عن مساره من ProgressSoft وأمازون إلى كريم، وعن البرمجة التنافسية وأثرها على مسيرته",
      "en": "Abdullah Abu Salah on his path from ProgressSoft and Amazon to Careem, and how competitive programming shaped his career"
    },
    "guest": {
      "ar": "عبد الله أبو صلاح",
      "en": "Abdullah Abu Salah"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "Senior Software Engineer في كريم (فريق Careem Plus) في الأردن.",
      "en": "Senior Software Engineer at Careem (Careem Plus team), Jordan."
    },
    "quotes": [
      {
        "t": "35:20",
        "ar": "يا جماعة، أنا مش كودر، أنا مش بس بكتب كود، أنا سوفت وير إنجنير. في كثير أشياء لازم أتطرق لها وأهندلها قبل ما أوصل لمرحلة إني أكتب كود.",
        "en": "Guys, I am not a coder. I don't just write code, I am a software engineer. There are many things I have to deal with before I get to the point of writing code."
      },
      {
        "t": "1:37:50",
        "ar": "دائما التزم في مصدر واحد. كل المصادر كويسة، ما في مصدر تعلم Problem Solving سيء. الباينري سيرش اللي رح تتعلمه هون هو نفس الباينري سيرش اللي رح تتعلمه هون.",
        "en": "Always stick to one resource. All the resources are good; there is no bad problem-solving resource. The binary search you will learn here is the same binary search you will learn there."
      },
      {
        "t": "1:49:30",
        "ar": "الناس هذول هم الكنز اللي إنت بتطلع فيه من المكان اللي إنت فيه. المكان لما بتطلع منه بتبطل تاخذ منه مصاري، بس الناس اللي تعرفت عليهم أحسن من كل المصاري اللي أخذتها من هذا المكان.",
        "en": "These people are the treasure you leave a place with. Once you leave a place you stop getting paid by it, but the people you met are better than all the money you took from that place."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:40:55",
        "ar": "الـ Problem Solving مش بس بتعلمك تحل سؤال على جهاز كمبيوتر، هي بتغير طريقة تفكيرك كليا.",
        "en": "Problem solving doesn't just teach you to solve a question on a computer; it completely changes the way you think."
      },
      {
        "t": "1:33:05",
        "ar": "أهم شيء لازم يكون في كوميتمنت عند الشخص، لأنه هذا الموضوع مش شغلة يوم ويومين وشهر وسنة.",
        "en": "The most important thing is that the person has commitment, because this is not a matter of a day or two, a month or a year."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق العوزة في هذه الحلقة عبد الله أبو صلاح، Senior Software Engineer في كريم بالأردن، وزميله في جامعة البلقاء التطبيقية وفي ProgressSoft. يبدأ الحديث بفريق Careem Plus وكيف يعمل فريق موزع على عدة دول، ثم عن كريم كتطبيق متعدد الخدمات وما تغير فيه بعد استحواذ أوبر وعودة كريم شركة مستقلة.\n\nبعدها يروي عبد الله قصته من أول جهاز كمبيوتر في البيت، وتعلم الويب في عمر 12 سنة، وأول موقع باعه بعمر 16، إلى أول وظيفة وهو في الثانوية العامة، ثم سنتين ونصف في ProgressSoft، وسنتين في أمازون، وصولا إلى كريم. ويشرح كيف تُبنى مقابلات أمازون وكريم على الـ Problem Solving، وكيف اختلف العمل في كل شركة، ولماذا تعلم لغات مثل Go رغم حبه للـ Java، وكيف يستخدم أدوات الذكاء الاصطناعي في عمله اليومي.\n\nالنصف الثاني مخصص للبرمجة التنافسية: بدايته مع فريق Solver 2B في الجامعة، وتدريباته، ومشاركاته في ICPC و IEEEXtreme، والمركز الثاني على مستوى الأردن، وكيف تُدار المسابقة وتُقيَّم. وينتهي بنصائح للتحضير: اختيار الفريق، وتوزيع المواضيع، والالتزام بمصدر تعلم واحد. الحلقة مفيدة للطلاب وللمبرمجين الذين يفكرون في الانتقال بين الشركات أو دخول عالم المسابقات.",
      "en": "Tariq Elouzeh hosts Abdullah Abu Salah, a Senior Software Engineer at Careem in Jordan and a fellow graduate of Al-Balqa Applied University who also worked at ProgressSoft. The conversation opens with the Careem Plus team and how an engineering team spread across several countries works, then moves to Careem as a multi-service app and what changed after Uber's acquisition and Careem's return as a separate company.\n\nAbdullah then tells his own story: the first computer at home, learning web development at 12, selling his first website at 16, a first developer job during high school, two and a half years at ProgressSoft, two years at Amazon, and then Careem. He explains how interviews at Amazon and Careem are built around problem solving, how each company differed, why he had to learn Go despite loving Java, and how he uses AI tools at work.\n\nThe second half is about competitive programming: how he joined the Solver 2B team at university, his training, his ICPC and IEEEXtreme participation, his second place in Jordan, and how a contest is run and judged. He closes with preparation advice: choose your team well, split topics between teammates, and stick to a single learning resource. It is useful for students and for engineers weighing a move between companies or an entry into contests."
    },
    "takeaways": [
      {
        "ar": "المقابلات في أمازون وكريم تعتمد أساسا على الـ Problem Solving: بعد الـ Online Assessment تأتي مقابلتان على الأقل في الـ Problem Solving، ثم System Design للمستوى الأعلى، ثم المدير و Bar Raiser.",
        "en": "Interviews at Amazon and Careem rest mainly on problem solving: after the online assessment come at least two problem-solving interviews, then system design for senior levels, then a manager round and a bar raiser."
      },
      {
        "ar": "الانتقال بين شركات بمجالات مختلفة (Fintech ثم Retail ثم خدمات) يعلّمك فهم أي بزنس جديد بسرعة، ومهارات مثل التواصل وإدارة الوقت وإدارة المشاريع التي تتعلمها في أمازون تنفعك في أي مكان.",
        "en": "Moving between companies in different domains (fintech, retail, services) teaches you to grasp a new business quickly, and skills like communication, time management and project management picked up at Amazon carry over anywhere."
      },
      {
        "ar": "مهندس البرمجيات ليس مجرد كودر: جمع المتطلبات والتصميم والتوثيق والتواصل بين الفرق أمور تسبق كتابة الكود، والكود غالبا أسهل مرحلة.",
        "en": "A software engineer is not just a coder: gathering requirements, design, documentation and cross-team communication come before writing code, which is often the easiest part."
      },
      {
        "ar": "في مسابقات مثل ICPC يلزم فريق من ثلاثة على جهاز واحد، فاختيار فريق يشاركك الهدف والالتزام، وتوزيع المواضيع بينكم، وانسجام الفريق، لا تقل أهمية عن مهارة الحل.",
        "en": "In contests like ICPC, three people share one computer, so choosing teammates who share your goal and commitment, splitting topics among you, and team harmony matter as much as solving skill."
      },
      {
        "ar": "عند التحضير للمسابقات التزم بمصدر تعلم واحد بدل تشتيت جهدك بين شيتات وتدريبات وجامعات متعددة، لأن المواضيع نفسها تتكرر في كل المصادر.",
        "en": "When preparing for contests, commit to one learning resource instead of spreading effort across several sheets, trainings and universities, since the topics are the same everywhere."
      },
      {
        "ar": "فوائد الـ Problem Solving تتجاوز الحل: تغيّر طريقة التفكير واتخاذ القرار (Corner Cases، Constraints)، وتبني علاقات مهنية، وتعوّدك على العمل تحت ضغط وقت، وعبد الله حصل على Referral في أمازون وكريم بفضل هذه المعرفة.",
        "en": "The benefits of problem solving go beyond solving: it changes how you think and decide (corner cases, constraints), builds professional relationships, and trains you to work under time pressure. Abdullah got referrals at Amazon and Careem through this network."
      },
      {
        "ar": "في الشركات الكبيرة قد يفرض عليك الـ Stack لغة لا تحبها (مثل Go بعد Java)، ونصيحته أن تعوّد نفسك على حبها أو تنتقل إلى مكان آخر، لأن الكود في النهاية يجب أن يكون موثوقا.",
        "en": "In large companies the stack may force a language you do not love (such as Go after Java). His advice is to train yourself to like it or move elsewhere, because the code still has to be reliable."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "التعريف بالضيف والخلفية المشتركة",
          "en": "Introducing the guest"
        }
      },
      {
        "t": "1:09",
        "title": {
          "ar": "فريق Careem Plus وما يقدمه",
          "en": "The Careem Plus team"
        }
      },
      {
        "t": "10:14",
        "title": {
          "ar": "كريم بعد استحواذ أوبر",
          "en": "Careem after Uber"
        }
      },
      {
        "t": "13:59",
        "title": {
          "ar": "الطفولة وتعلم الويب مبكرا",
          "en": "Childhood and early web work"
        }
      },
      {
        "t": "20:30",
        "title": {
          "ar": "التدريب والعمل في ProgressSoft",
          "en": "Working at ProgressSoft"
        }
      },
      {
        "t": "24:40",
        "title": {
          "ar": "الانتقال إلى أمازون ثم كريم",
          "en": "Moving to Amazon, then Careem"
        }
      },
      {
        "t": "28:34",
        "title": {
          "ar": "مراحل المقابلات في أمازون وكريم",
          "en": "Amazon and Careem interviews"
        }
      },
      {
        "t": "30:50",
        "title": {
          "ar": "التأقلم بين الشركات المختلفة",
          "en": "Adapting across companies"
        }
      },
      {
        "t": "36:45",
        "title": {
          "ar": "لغات البرمجة والـ Tech Stack",
          "en": "Languages and tech stack"
        }
      },
      {
        "t": "43:41",
        "title": {
          "ar": "أدوات الذكاء الاصطناعي في كريم",
          "en": "AI tools at Careem"
        }
      },
      {
        "t": "54:18",
        "title": {
          "ar": "بداية القصة مع البرمجة التنافسية",
          "en": "Starting competitive programming"
        }
      },
      {
        "t": "1:12:28",
        "title": {
          "ar": "كيف تُدار مسابقة ICPC",
          "en": "How an ICPC contest runs"
        }
      },
      {
        "t": "1:30:54",
        "title": {
          "ar": "استراتيجيات التحضير للمسابقات",
          "en": "How to prepare for contests"
        }
      },
      {
        "t": "1:40:05",
        "title": {
          "ar": "أثر الـ Problem Solving على المسيرة",
          "en": "Impact on career and thinking"
        }
      }
    ]
  },
  {
    "n": 16,
    "slug": "maya-murad-ai-agents-lab-to-production",
    "id": "N9q0NlQuTl8",
    "title": {
      "ar": "AI Agents من المختبر إلى الإنتاج",
      "en": "AI Agents: From Lab to Production"
    },
    "dek": {
      "ar": "مايا مراد تشرح معنى الـ AI Agent، وأين وصلت هذه التقنية، وكيف يمكن بناؤها واستخدامها بأمان.",
      "en": "Maya Murad explains what an AI agent is, how far the technology has come, and how to build and use it responsibly."
    },
    "guest": {
      "ar": "مايا مراد",
      "en": "Maya Murad"
    },
    "cat": "ai-data",
    "draft": true,
    "guestBio": {
      "ar": "باحثة في مختبر AI Frontiers في Microsoft Research، وعملت سابقاً في IBM Research.",
      "en": "Researcher at Microsoft Research's AI Frontiers lab; previously at IBM Research."
    },
    "quotes": [
      {
        "t": "13:50",
        "ar": "في نوعين من العالم بالحياة، في عالم بتحب تتعمق بموضوع وتفوت فيه وتفهمه، وفي عالم جنرالست بيعرفوا ياخذوا من كل شيء ويعرفوا كيف ياخذوا نقطة من محل واحد ونقطة من محل ثاني. وأنا بالمجال الثاني.",
        "en": "There are two kinds of people in life: those who love to go deep into one subject and understand it, and generalists who know how to take something from everywhere and take a point from one place and a point from another. And I am in the second group."
      },
      {
        "t": "1:02:20",
        "ar": "كل الإنسانية لازم تستفيد من هالتكنولوجيا، وما بظن أنه لازم تكون كلها منغلقة وما حدا يفهم شو عم بصير. فإذا بدنا نتطور ونقدر عن جد نعمل تكنولوجيا آمنة وبتساعد المجتمع لازم يكون أوبن.",
        "en": "All of humanity should benefit from this technology, and I don't think it should be entirely closed with nobody understanding what is going on. If we want to progress and truly build technology that is safe and helps society, it has to be open."
      },
      {
        "t": "1:34:38",
        "ar": "أنا ما بظن لازم حتى نبني قصص بتاخد شغل العالم. لازم تكون دائماً أداة، كيف بنستعمل الكمبيوتر، كيف نستعمل التلفون، أي تكنولوجيا بنستعملها ليساعدنا ويحسن لنا حياتنا، هيك لازم يكون الـ AI.",
        "en": "I don't think we should even build things that take people's jobs. It should always be a tool, like how we use the computer and the phone: any technology we use to help us and improve our lives. That is how AI should be."
      }
    ],
    "moreQuotes": [
      {
        "t": "20:06",
        "ar": "في كثير أوبرتونيتيز بـ MIT، يعني في كثير قصص فيك تعملها أكثر مما عندك وقت بالنهار وفيك تتشتت.",
        "en": "There are many opportunities at MIT, many things you could do beyond the time you have in a day, and you can get distracted."
      },
      {
        "t": "1:21:59",
        "ar": "كثير عم يصير في ابتكار على الموديل ليفل، بس ما عم نشوف ابتكار على الأبلكيشن ليفل.",
        "en": "A lot of innovation is happening at the model level, but we are not seeing innovation at the application level."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق مايا مراد، وهي لبنانية درست في MIT وعملت في IBM ثم انتقلت إلى Microsoft Research ضمن مختبر AI Frontiers. تبدأ الحلقة بسؤال عن فيديو شرحت فيه معنى الـ AI Agents وما إذا كانت هذه التقنية مجرد هايب، وتجيب مايا أننا ما زلنا في أول الطريق رغم أن التطبيقات بدأت تصل إلى الإنتاج.\n\nبعدها تروي مايا مسارها المهني: من دراسة الاقتصاد في لبنان، إلى الاستشارات في دبي، ثم العمل مع الأمم المتحدة في برنامج الغذاء العالمي، وصولاً إلى برنامج في MIT جمع بين الهندسة والبزنس. هناك التقت بمحاضر من IBM وانضمت إلى فريقه كأول موظفة، ومن هنا بدأ عملها في الـ AI والـ Responsible AI.\n\nالجزء الأكبر من الحلقة تقني: تعريف الـ Agent كنظام يجمع التفكير والأدوات والذاكرة، ودور الذاكرة والـ Context Window، ولماذا تعمل أنظمة Multi-Agent المتخصصة أفضل من Agent واحد، وكيف تتطور نماذج الـ Reasoning، ومعنى General Purpose Agent وبروتوكول MCP. وتناقش الحلقة أيضاً أهمية المصدر المفتوح، وتنظيم الـ AI، ومستقبل التطبيقات، وتأثير الـ Agents على الوظائف. الحلقة مناسبة للمطورين والمهتمين بالـ AI الذين يريدون فهماً عملياً لما هو ممكن اليوم وما لا يزال بعيداً.",
      "en": "Tariq hosts Maya Murad, a Lebanese engineer who studied at MIT, worked at IBM and now works at Microsoft Research in the AI Frontiers lab. The episode opens with her popular video explaining AI agents and the question of whether the technology is hype. Maya's answer is that real applications are now reaching production, but we are still at the beginning of the road.\n\nMaya then tells her career story: economics in Lebanon, management consulting in Dubai, work with the United Nations on the World Food Programme, and finally a program at MIT that combined engineering with business classes. There she met an IBM lecturer, became the first hire on his new team, and began her work in AI and responsible AI.\n\nMost of the episode is technical. It covers the definition of an agent as a system combining reasoning, tools and memory, why memory and the context window are the main bottleneck, why specialised multi-agent systems work better than a single agent, how reasoning models are trained, and what general purpose agents and MCP mean in practice. The conversation also touches on open source, regulation, where innovation will go next, and what agents mean for jobs. It suits developers and AI enthusiasts who want a practical picture of what is possible today and what is still far off."
    },
    "takeaways": [
      {
        "ar": "الـ AI Agent حسب مايا هو نظام يحقق هدفاً بالتفاعل مع بيئته، ويقوم على ثلاثة مكونات: التفكير (Reasoning) والتفاعل عبر الأدوات (Tools) والذاكرة (Memory).",
        "en": "Maya defines an AI agent as a system that achieves a goal by interacting with its environment, built on three components: reasoning, action through tools, and memory."
      },
      {
        "ar": "الذاكرة والـ Context Window ما زالت عنق الزجاجة الرئيسي، والنموذج يضيع في منتصف النص الطويل حتى لو كان الـ Context Window كبيراً.",
        "en": "Memory and the context window remain the main bottleneck: a model starts to lose information in the middle of a long text even when its window is large."
      },
      {
        "ar": "عملياً يفضّل حل المشاكل المحدودة بأنظمة Multi-Agent، فإعطاء Agent واحد عدة أدوات كثيرة يربكه، بينما تقسيم العمل بين Agents متخصصة يعطي نتائج أفضل.",
        "en": "In practice it is better to solve narrow problems with multi-agent systems: giving one agent many tools confuses it, while splitting the work among specialised agents works better."
      },
      {
        "ar": "نماذج الـ Reasoning تتحسن عبر Reinforcement Learning: يجرب النموذج مسارات مختلفة، ويحصل على مكافأة عند الوصول لجواب صحيح، فيتعلم أي أنواع التفكير تقوده للجواب.",
        "en": "Reasoning models improve through reinforcement learning: the model tries different paths, is rewarded when it reaches a correct answer, and learns which kinds of reasoning lead there."
      },
      {
        "ar": "مع بروتوكول MCP صار ربط الـ Agent بأدوات الشركات المختلفة أقرب إلى Plug and Play، وهذا من العناصر التي لم تكن متوفرة السنة الماضية.",
        "en": "With MCP, connecting an agent to different companies' tools becomes closer to plug and play, one of the ingredients that did not exist the year before."
      },
      {
        "ar": "التقنية لا تزال غير مضمونة أمنياً، فقد يخطئ النموذج بشكل خطير (مثل حذف الكود أو الابتزاز في سيناريو اختبار)، ولذلك يبقى وجود إنسان خبير يراجع التفاصيل ضرورياً.",
        "en": "The technology is not yet secure: models can misbehave badly (for example deleting code, or blackmailing in a test scenario), so an expert human reviewing the details remains necessary."
      },
      {
        "ar": "ترى مايا أن الابتكار حدث كثيراً على مستوى النموذج لكن قليلاً على مستوى التطبيق وواجهة المستخدم، وأن فرصة كبيرة تنتظر من يبني واجهة واحدة يتعامل معها الـ Agent بدل عشرين تطبيقاً.",
        "en": "Maya sees plenty of innovation at the model level but little at the application and interface level, and a large opportunity for whoever builds a single interface where an agent deals with the apps instead of the user."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "ترحيب وتعريف بالضيفة",
          "en": "Welcome and introducing Maya"
        }
      },
      {
        "t": "2:55",
        "title": {
          "ar": "هل 2025 سنة الـ Agents؟",
          "en": "Is this the year of agents?"
        }
      },
      {
        "t": "4:44",
        "title": {
          "ar": "عمله�� في Microsoft و AutoGen",
          "en": "Her work at Microsoft"
        }
      },
      {
        "t": "8:30",
        "title": {
          "ar": "من لبنان إلى دبي والأمم المتحدة",
          "en": "From Lebanon to Dubai and the UN"
        }
      },
      {
        "t": "13:16",
        "title": {
          "ar": "MIT والانضمام إلى IBM",
          "en": "MIT and joining IBM"
        }
      },
      {
        "t": "26:50",
        "title": {
          "ar": "قصة فيديو الـ AI Agents",
          "en": "The story behind the agents video"
        }
      },
      {
        "t": "32:07",
        "title": {
          "ar": "ما هو الـ AI Agent فعلاً",
          "en": "What an AI agent really is"
        }
      },
      {
        "t": "37:23",
        "title": {
          "ar": "الذاكرة وأنظمة Multi-Agent",
          "en": "Memory and multi-agent systems"
        }
      },
      {
        "t": "45:11",
        "title": {
          "ar": "نماذج الـ Reasoning وطريقة تدريبها",
          "en": "Reasoning models and how they train"
        }
      },
      {
        "t": "50:21",
        "title": {
          "ar": "General Purpose Agent و ChatGPT Agent",
          "en": "General purpose agents"
        }
      },
      {
        "t": "58:03",
        "title": {
          "ar": "بروتوكول MCP",
          "en": "The MCP protocol"
        }
      },
      {
        "t": "1:00:43",
        "title": {
          "ar": "المصدر المفتوح ومستقبل النماذج",
          "en": "Open source and the future of models"
        }
      },
      {
        "t": "1:09:10",
        "title": {
          "ar": "Hinton والتنظيم والمسؤولية",
          "en": "Hinton, regulation and responsibility"
        }
      },
      {
        "t": "1:31:53",
        "title": {
          "ar": "الـ Agents والوظائف",
          "en": "Agents and jobs"
        }
      }
    ]
  },
  {
    "n": 15,
    "slug": "damascus-to-engineering-manager-uber",
    "id": "0iHG2f_kno4",
    "title": {
      "ar": "من دمشق إلى إدارة الهندسة في أوبر",
      "en": "From Damascus to Engineering Management at Uber"
    },
    "dek": {
      "ar": "أنس يحكي مسيرته من دمشق وعمّان وسوق.كوم وبوكينغ وأمازون إلى أوبر، وفلسفته في بناء الفرق وتوظيف المهندسين.",
      "en": "Anas traces his path from Damascus and Amman through Souq.com, Booking.com and Amazon to Uber, and shares how he builds teams and hires engineers."
    },
    "guest": {
      "ar": "أنس سلمان",
      "en": "Anas Salman"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "Senior Engineering Manager في أوبر (هولندا).",
      "en": "Senior Engineering Manager at Uber (Amsterdam)."
    },
    "quotes": [
      {
        "t": "5:40",
        "ar": "معظم الشركات في جايدنس بتحافظ على التنوع، أنا بسميه التنوع الفكري. بس يكون عندك أشخاص بطرق تفكير مختلفة، هذا بخلي البرودكت اللي إنت عم تشتغل عليه أقوى، لأنه قادر يغطي جوانب إنت ما كنت تقدر تغطيها من نمط تفكير محدد.",
        "en": "Most companies have guidance to maintain diversity. I call it intellectual diversity. When you have people with different ways of thinking, it makes the product you are working on stronger, because it can cover aspects you could not have covered from a single mindset."
      },
      {
        "t": "1:31:34",
        "ar": "الجانب الأول اللي هو الأشخاص هو أهم جانب، وإذا عندك الأشخاص الصح بالفريق، تقريبا 80% من الشغل بيكون خلص بالنسبة لك كمدير.",
        "en": "The first part, the people, is the most important. If you have the right people on the team, roughly 80% of the work is already done for you as a manager."
      },
      {
        "t": "2:28:30",
        "ar": "استغل أي مكان إنت موجود فيه بالحد الأقصى، وما تستنى حدا يقول لك شو لازم تعمل أو شو ما لازم تعمل.",
        "en": "Make the most of wherever you are, and do not wait for someone to tell you what you should or should not do."
      }
    ],
    "moreQuotes": [
      {
        "t": "34:55",
        "ar": "لازم تقدر تسيطر على انفعالاتك، لازم تقدر تسيطر على ردات فعلك.",
        "en": "You have to be able to control your emotions, and you have to be able to control your reactions."
      },
      {
        "t": "1:09:17",
        "ar": "بتبلش تختلف العلاقة من علاقة تنافسية وعلاقة صراع لعلاقة تعاون. إنت بدك كمدير تبني هاي علاقة التعاون بين الفريقين بحيث يقدروا يشتغلوا مع بعض بشكل كثير سموث.",
        "en": "The relationship starts to change from a competitive, conflicting one into a collaborative one. As a manager you need to build that collaboration between the two teams so they can work together very smoothly."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق أنس، مهندس برمجيات يعمل حاليا Senior Engineering Manager في أوبر في أمستردام. يبدأ الحديث بما يديره اليوم: فرق السواقين والأرباح، ثم منصة المطورين الداخلية، وكيف يتعامل مع فريق متعدد الجنسيات وما يعنيه التنوع الفكري عمليا.\n\nبعدها يروي أنس مسيرته: الدراسة في جامعة دمشق (هندسة معلوماتية، اختصاص ذكاء صنعي) والعمل الجزئي في سبيس تون، ثم مشروعه الخاص في جمع البيانات، والانتقال إلى الأردن عام 2012، وبداياته كـ Engineering Manager في سوق.كوم بعد فوزه بمسابقة للمطورين. ثم ينتقل إلى بوكينغ في هولندا وتجربة الفرق المستقلة، فالعودة إلى سوق بعد استحواذ أمازون، فأوبر. يتوقف عند أخطاء تعلّم منها، مثل ردة فعله على إعادة هيكلة الفريق، وعند الفرق بين الشركات الناشئة والكبيرة.\n\nفي النصف الثاني يشرح فلسفته في الإدارة: الأشخاص ثم الطريقة ثم الهدف، وكيف يقيّم المرشحين على المعرفة والطاقة والنزاهة، وإدارة المديرين الذين يتبعون له، وبناء ثقافة الفريق، وتأثير أدوات الذكاء الاصطناعي على المديرين والمهندسين. الحلقة مفيدة للمهندسين الذين يفكرون في الانتقال إلى الإدارة وللمدراء الجدد.",
      "en": "In this episode Tariq hosts Anas, a software engineer who is now a Senior Engineering Manager at Uber in Amsterdam. The conversation starts with what he manages today: the driver earnings teams and then the internal developer platform, and how he works with a multinational team and what intellectual diversity means in practice.\n\nAnas then walks through his path: studying Informatics Engineering with an AI specialization at Damascus University while working part-time at SpaceToon, running his own data-collection business, moving to Jordan in 2012, and starting as an Engineering Manager at Souq.com after winning a developer competition. He then moves to Booking.com in the Netherlands and its autonomous-teams experiment, returns to Souq after the Amazon acquisition, and later joins Uber. He pauses on mistakes he learned from, such as his reaction to a team restructuring, and on the differences between startups and large companies.\n\nThe second half covers his management philosophy: people first, then how the team works, then what it works toward. He explains how he evaluates candidates on knowledge, energy and integrity, how he manages the managers who report to him, how he builds team culture, and how AI tools are changing the work of managers and engineers. It is useful for engineers considering management and for new managers."
    },
    "takeaways": [
      {
        "ar": "التنوع الفكري في الفريق يرفع الاحتكاك والخلافات، لكن فوائده على جودة المنتج أكبر بكثير من أثره السلبي، ودور المدير أن يوصل الفريق من مرحلة Storming إلى Norming.",
        "en": "Intellectual and cultural diversity raises friction and conflict, but its benefits for the product outweigh the downsides, and the manager's job is to move the team from storming to norming."
      },
      {
        "ar": "رد الفعل العاطفي على قرار إداري يضر بالمدير وبالفريق، والنضج العاطفي يبدأ بالوعي بما يستثيرك، ثم التدريب، ثم تقبل الفيدباك بهدوء، واعتباره حقيقة إن جاءك من شخصين مختلفين.",
        "en": "An emotional reaction to a leadership decision harms the manager and the team. Emotional maturity starts with knowing what triggers you, then coaching, then taking feedback calmly and treating it as fact once two different people say the same thing."
      },
      {
        "ar": "عند استحواذ شركة كبيرة، اعترف بأن خبرة المكتب الأم أعلى وتعلّم منها، وحوّل العلاقة بين الفريقين من تنافس إلى تعاون، وابنِ هدفا جديدا يشعر الناس معه بالقيمة.",
        "en": "After an acquisition, accept that the parent office has more experience and learn from it, turn the relationship between the teams from competition into collaboration, and give people a new goal that feels worthwhile."
      },
      {
        "ar": "فلسفته في الإدارة ثلاثة محاور: الأشخاص (Who) ثم طريقة العمل (How) ثم الهدف والرؤية (What)، ويرى أن الأشخاص هم الأهم.",
        "en": "His management philosophy has three parts: the people (who), how the team works (how), and the vision (what), with people being the most important."
      },
      {
        "ar": "في التوظيف يبحث عن المعرفة والطاقة والنزاهة، ويقيّمها بتتبّع مستوى الاهتمام عبر المقابلات المتتالية وبأسئلة سلوكية متكررة، وتكرار الملاحظة نفسها من أكثر من مقابِل يعتبرها حقيقة.",
        "en": "In hiring he looks for knowledge, energy and integrity, assessing them through sustained engagement across interview rounds and repeated behavioural questions. A note repeated by more than one interviewer counts as fact."
      },
      {
        "ar": "كمدير مدراء يتغير الإيقاع: النتائج تحتاج شهرا أو أكثر لتظهر، ويركز على تطوير المدراء، وإتاحة الظهور لهم أمام القيادة، والتنفيذ، والتميز التشغيلي، والرؤية.",
        "en": "As a manager of managers the rhythm changes: results can take a month or more to show, and he focuses on developing managers, giving them visibility with leadership, delivery, operational excellence and vision."
      },
      {
        "ar": "نصائحه للراغبين بالإدارة: استغل مكانك الحالي بأخذ مهام خارج نطاقك، واستثمر في الكتابة، وكن خبيرا في موضوع معين حتى بدون أن يطلبه منك أحد.",
        "en": "His advice for aspiring managers: make the most of your current role by taking on tasks outside your scope, invest in writing, and become an expert in a specific subject without waiting to be asked."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "تقديم الضيف وبداية الحلقة",
          "en": "Introducing the guest"
        }
      },
      {
        "t": "1:24",
        "title": {
          "ar": "دوره الحالي في أوبر",
          "en": "His current role at Uber"
        }
      },
      {
        "t": "4:33",
        "title": {
          "ar": "التنوع الثقافي في الفرق",
          "en": "Cultural diversity in teams"
        }
      },
      {
        "t": "6:45",
        "title": {
          "ar": "مراحل تشكّل الفريق والخلافات",
          "en": "Team stages and conflict"
        }
      },
      {
        "t": "9:43",
        "title": {
          "ar": "النشأة والدراسة في دمشق",
          "en": "Growing up and studying in Damascus"
        }
      },
      {
        "t": "11:19",
        "title": {
          "ar": "العمل الخاص والانتقال إلى الأردن",
          "en": "Own business and moving to Jordan"
        }
      },
      {
        "t": "23:16",
        "title": {
          "ar": "البداية في سوق.كوم",
          "en": "Starting at Souq.com"
        }
      },
      {
        "t": "32:13",
        "title": {
          "ar": "خطأ تعلّم منه كمدير",
          "en": "A manager's mistake"
        }
      },
      {
        "t": "42:30",
        "title": {
          "ar": "بوكينغ والفرق المستقلة",
          "en": "Booking.com and autonomous teams"
        }
      },
      {
        "t": "54:29",
        "title": {
          "ar": "العودة إلى سوق وأمازون",
          "en": "Back to Souq and Amazon"
        }
      },
      {
        "t": "1:16:35",
        "title": {
          "ar": "الانتقال إلى أوبر ومقابلاتها",
          "en": "Joining Uber and its interviews"
        }
      },
      {
        "t": "1:27:10",
        "title": {
          "ar": "فلسفة تطوير الفرق والتوظيف",
          "en": "Team development and hiring"
        }
      },
      {
        "t": "1:48:17",
        "title": {
          "ar": "إدارة المدراء كسينيور مانجر",
          "en": "Managing managers"
        }
      },
      {
        "t": "2:17:00",
        "title": {
          "ar": "أثر الذكاء الاصطناعي وأهم النصائح",
          "en": "AI's impact and final advice"
        }
      }
    ]
  },
  {
    "n": 14,
    "slug": "aristo-gaza-software-startup",
    "id": "Yeo5xdSQZUQ",
    "title": {
      "ar": "أريستو: شركة ناشئة من غزة",
      "en": "Aristo: A Startup from Gaza"
    },
    "dek": {
      "ar": "كيف أسّس طالبان من غزة شركة برمجيات مسجلة، وبرامج تدريب للطلبة في ظل الحرب",
      "en": "Two students in Gaza build a registered software company and training programs for students during the war"
    },
    "guest": {
      "ar": "أدهم ومحمد، مؤسسا أريستو",
      "en": "Adham and Mohammad, founders of Aristo"
    },
    "cat": "startups",
    "draft": true,
    "guestBio": {
      "ar": "أدهم: مطور تطبيقات أندرويد (Java و Kotlin) ومؤسس مشارك في شركة أريستو للبرمجيات، غزة. محمد: خريج هندسة معلومات وأمن سيبراني، ومؤسس مشارك في شركة أريستو للبرمجيات، غزة.",
      "en": "Adham: Android developer (Java, Kotlin) and co-founder of Aristo Software, Gaza. Mohammad: Cybersecurity and information engineering graduate and co-founder of Aristo Software, Gaza."
    },
    "quotes": [
      {
        "t": "15:17",
        "ar": "طبعا للأسف نحن عشان نكون واقعيين، عشان احنا في غزة والكل عارف الأوضاع عننا، كان أغلب العملاء للأسف ما يرضوا يتعاملوا معنا. كانوا يحكوا لنا انتم من غزة وهذا بزنس يعني، وأنا ما بلوم بصراحة.",
        "en": "Unfortunately, to be realistic, because we are in Gaza and everyone knows our situation, most clients would not agree to work with us. They would tell us, you are from Gaza and this is business, and honestly I don't blame them.",
        "by": {
          "ar": "محمد",
          "en": "Mohammad"
        }
      },
      {
        "t": "37:57",
        "ar": "لما نيجي نحكي جيل قادر، نحن بدنا نمكّن جيل كامل من إنه يتعامل مع الـ AI models، مع التطور الرهيب بالذكاء الاصطناعي والموديلز والـ AI agents اللي بتطلع بشكل ديلي، بحيث إنه ما يكون في جاب بينه وبين هذا التطور الرهيب.",
        "en": "When we talk about Jeel Qader, we want to enable a whole generation to work with AI models, with the huge progress in AI and the models and AI agents that come out daily, so that there is no gap between them and this progress.",
        "by": {
          "ar": "ادهم",
          "en": "Adham"
        }
      },
      {
        "t": "46:14",
        "ar": "نحن بنشتغل إنه كمان هو بده يتعلم ذاتي، بده يغلط، لازم يغلط عشان هو يحسن ويتعلم، لأنه لو ما غلط وجرب بإيده ولا عمره رح يتعلم.",
        "en": "We work on the basis that he has to learn on his own and make mistakes. He has to make mistakes to improve and learn, because if he doesn't make mistakes and try by his own hand, he will never learn.",
        "by": {
          "ar": "ادهم",
          "en": "Adham"
        }
      }
    ],
    "moreQuotes": [
      {
        "t": "24:20",
        "ar": "نحن بندربهم على Reality Projects، مشاريع حقيقية. يعني مشروع حقيقي انت بتطلع فيه إنه فعلا تحكي أنا اشتغلت مشروع، ولايف يعني مرفوع.",
        "en": "We train them on reality projects, real projects. A real project that you come out of able to truly say, I worked on a project, and it is live, published."
      },
      {
        "t": "48:52",
        "ar": "نحن بنقدر نمسك شغل، بنقدر نعمل كل شي صح. الظروف شوي صعبة، لكن إيماننا بأهمية العمل والهدف تبعنا بخلينا نكمل وننجز ونسلم الشغل على أكمل وجه.",
        "en": "We can take on work, we can do everything properly. The conditions are somewhat difficult, but our belief in the importance of the work and in our goal keeps us going, delivering and handing over the work in the best possible way."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق ادهم ومحمد، مؤسسَي شركة أريستو للبرمجيات في غزة. يحكيان كيف تعرفا عبر السوشيال ميديا وهما طالبان يكتبان مقالات تقنية، وكيف تحولت صداقتهما المهنية إلى فريق يقدم خدمات الويب وتصميم UX/UI والأمن السيبراني لعملاء من المنطقة العربية، قبل الحرب وخلالها.\n\nيتوقف الحوار عند التحديات العملية: صعوبة إقناع العملاء بالتعامل مع فريق من غزة، والعمل بإنترنت وكهرباء متقطعين، ورحلة تسجيل الشركة رسميا عبر محامية في الضفة، وتكلفة ذلك والفوائد التي جاءت بعده من شهادات معتمدة ومناقصات وحساب بنكي. ثم يشرحان سبب اختيار اسم أريستو.\n\nيخصص النصف الثاني للبرامج المجتمعية: خريج قادر للتدريب الميداني لطلبة الجامعات، وجيل قادر لتعلّم أدوات الذكاء الاصطناعي، وبرامج للأطفال ولمشاريع التخرج، إضافة إلى نظام لمساعدة الناس على إيجاد مساحات عمل فيها كهرباء وإنترنت. الحلقة مناسبة لمن يهتم بريادة الأعمال في ظروف صعبة، وبتدريب الطلبة وبناء فرق برمجية.",
      "en": "Tariq hosts Adham and Mohammad, the founders of Aristo Software in Gaza. They describe how they met on social media while writing technical articles as students, and how that grew into a team offering web development, UX/UI and cybersecurity services to clients across the Arab world, before and during the war.\n\nThe conversation dwells on practical hurdles: convincing clients to work with a team from Gaza, working with unreliable internet and electricity, and registering the company officially through a lawyer in the West Bank. They cover what it cost and what registration made possible, including accredited certificates, tenders and a business bank account, and they explain how the name Aristo was chosen.\n\nThe second half covers their community programs: Kharij Qader, field training for university students; Jeel Qader, on using AI tools; programs for children and graduation projects; and a system to help people find workspaces with power and internet. It suits listeners interested in entrepreneurship under hard conditions, student training and building software teams."
    },
    "takeaways": [
      {
        "ar": "بدأ الفريق بمقالات ومحتوى تقني على لينكدإن ويوتيوب، ومن هذا المحتوى وصلهم أول العملاء، حتى قبل أن يكونوا شركة.",
        "en": "The team began by publishing technical articles and videos on LinkedIn and YouTube, and its first clients came from that content, before it was even a company."
      },
      {
        "ar": "أُنجز نحو 30 مشروعا مدفوعا قبل التسجيل الرسمي، وهذا ما جعل التسجيل ممكنا ماديا بعد أن كان بعيدا عنهم كطلاب.",
        "en": "Around 30 paid projects were completed before official registration, which made registration financially possible after it had been out of reach as students."
      },
      {
        "ar": "التسجيل الرسمي فتح أبوابا عملية: شهادات معتمدة، والدخول في المناقصات، وفتح حساب بنكي يخفف أزمة التحويلات المالية.",
        "en": "Registration opened practical doors: accredited certificates, access to tenders, and a business bank account to ease the problem of receiving payments."
      },
      {
        "ar": "اسم الشركة الأول مكرر في سجل الشركات (الحروف الثلاثة الأولى تُرفض إن تكررت)، فاختاروا اسما لاتينيا قريبا من المعنى هو أريستو.",
        "en": "Their original name was rejected as a duplicate in the company registry (the first three letters must be unique), so they chose a Latin-rooted name close in meaning: Aristo."
      },
      {
        "ar": "برنامج خريج قادر يقدم 120 ساعة تدريبية على مشاريع حقيقية منشورة، بإشراف متطوعين من دول مختلفة يراجعون الكود.",
        "en": "The Kharij Qader program offers 120 training hours on real, published projects, with volunteer mentors from different countries reviewing the code."
      },
      {
        "ar": "في التدريب يُترك للمتدرب أن يجرب ويخطئ بنفسه ضمن جدول زمني محدد، مع جلسات code review بدل الاكتفاء بمشاهدة الدورات.",
        "en": "Trainees are expected to learn by trying and making mistakes within a set timeline, with code review sessions rather than just watching courses."
      },
      {
        "ar": "برنامج جيل قادر يعلّم الاستخدام العملي لأدوات الذكاء الاصطناعي في تخصصات مختلفة، مثل التطوير والتسويق والتصميم، بعد مدخل عن تاريخ الذكاء الاصطناعي.",
        "en": "Jeel Qader teaches practical use of AI tools across roles such as development, marketing and design, after an introduction to the history of AI."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "ترحيب وتقديم الضيفين",
          "en": "Welcome and guest introductions"
        }
      },
      {
        "t": "0:58",
        "title": {
          "ar": "خلفية ادهم ومحمد وكيف تعرفا",
          "en": "Backgrounds and how they met"
        }
      },
      {
        "t": "3:39",
        "title": {
          "ar": "من فريق طلابي إلى خدمات",
          "en": "From student team to services"
        }
      },
      {
        "t": "6:54",
        "title": {
          "ar": "العملاء الأوائل والخدمات",
          "en": "First clients and services"
        }
      },
      {
        "t": "10:56",
        "title": {
          "ar": "رحلة تسجيل الشركة",
          "en": "The company registration journey"
        }
      },
      {
        "t": "15:17",
        "title": {
          "ar": "ثقة العملاء وأول مشروع",
          "en": "Winning client trust"
        }
      },
      {
        "t": "20:10",
        "title": {
          "ar": "فوائد الشركة المسجلة",
          "en": "Benefits of being registered"
        }
      },
      {
        "t": "21:29",
        "title": {
          "ar": "اختيار اسم أريستو",
          "en": "Choosing the name Aristo"
        }
      },
      {
        "t": "23:09",
        "title": {
          "ar": "برنامج خريج قادر",
          "en": "The Kharij Qader program"
        }
      },
      {
        "t": "32:50",
        "title": {
          "ar": "خطط المستقبل ونظام مساحات العمل",
          "en": "Future plans and workspace app"
        }
      },
      {
        "t": "36:45",
        "title": {
          "ar": "برنامج جيل قادر للذكاء الاصطناعي",
          "en": "Jeel Qader and AI training"
        }
      },
      {
        "t": "44:11",
        "title": {
          "ar": "برنامج ون بريدج لمشاريع التخرج",
          "en": "One Bridge for graduation projects"
        }
      },
      {
        "t": "48:14",
        "title": {
          "ar": "رسالة ختامية",
          "en": "Closing messages"
        }
      }
    ]
  },
  {
    "n": 13,
    "slug": "egypt-to-senior-staff-germany",
    "id": "ZvOrw_WGs9U",
    "title": {
      "ar": "من مصر إلى Senior Staff في ألمانيا",
      "en": "From Egypt to Senior Staff in Germany"
    },
    "dek": {
      "ar": "أحمد الإمام عن الانتقال للعمل في ألمانيا، ومقابلات eBay، والفرق بين Senior و Staff، وصناعة المحتوى التقني",
      "en": "Ahmed El-Imam on relocating to Germany, the eBay interviews, Senior versus Staff, and making technical content"
    },
    "guest": {
      "ar": "أحمد الإمام",
      "en": "Ahmed El-Imam"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "Senior Staff Engineer في eBay، ومقدّم محتوى تقني (يوتيوب و LinkedIn).",
      "en": "Senior Staff Engineer at eBay and tech content creator."
    },
    "quotes": [
      {
        "t": "1:05:08",
        "ar": "التطور اللي حصل لي في آخر ثلاث سنين تقريبًا يعادل التطور اللي حصل لي في الثمان سنين أو الأكثر اللي قبلها.",
        "en": "The growth I have had in the last three years or so is equal to the growth I had in the eight or more years before that."
      },
      {
        "t": "0:54:40",
        "ar": "أنت ما عندكش أوثوريتي أصلًا، فأنت لازم تقنع الناس باللي أنت بتقوله، ولازم الناس تقتنع والناس تمشي وراك، لأنهم شايفين إنهم رايحين في الاتجاه صح، مش لأنك المدير.",
        "en": "You have no authority at all, so you have to convince people of what you are saying. They have to be convinced and follow you because they see they are heading in the right direction, not because you are the manager."
      },
      {
        "t": "1:26:20",
        "ar": "وفّر جزء من اللي بيضيع ده، إنك تستغله في حاجة واستمر بس فيها، الإمباكت هيبقى كبير جدًا.",
        "en": "Save part of the time that gets wasted, use it on something, and just keep going with it. The impact will be very big."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:25:10",
        "ar": "ما فيش حل سحري. فهي رحلة بتكمل بعد تعب.",
        "en": "There is no magic solution. It is a journey you carry on with after tiring stretches."
      },
      {
        "t": "1:27:54",
        "ar": "اعمل بإيديك، هي دي الحرفة بتاعتك، ده اللي هيخليك تفرق عن غيرك.",
        "en": "Do it with your own hands. That is your craft, and that is what will set you apart from others."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق أحمد الإمام، مهندس برمجيات مصري يعمل في برلين، ويبدأ الحوار من مسيرته: ثماني سنوات من العمل في مصر وصل فيها إلى Tech Lead، ثم قرار السفر إلى ألمانيا بعقد عمل من الخارج، وكيف بحث عن الوظائف عبر LinkedIn، وخطوات الفيزا والأوراق، والتحديات الفعلية بعد الوصول، وهي البيروقراطية أكثر من التقنية.\n\nبعدها يتحدث عن تنقله بين الشركات وعن مقابلات eBay التي انتهت بوظيفته الحالية كـ Senior Staff: مراحل المقابلة وما يُقاس فيها، وكيف دخل في مجال الـ AI رغم خلفيته في الـ Backend، وكيف يستخدم أدوات البرمجة بالـ Agents في عمله، بما فيها طريقة كتابة ملف وصف لكل مهمة. ثم يشرح الفرق العملي بين Senior و Staff، وشكل يومه، ومعنى T-shirt size estimation.\n\nويخصص الجزء الأخير لصناعة المحتوى: لماذا بدأ، وماذا غيّر فيه، وكيف يرى الجدوى المادية للمحتوى العربي المتقدم، ونقاش مع طارق حول تقديم منتجات مدفوعة، ثم نصائح لمن يريد السفر أو بناء مسيرة تقنية. الحلقة مناسبة للمهندسين الذين يفكرون بالعمل في أوروبا أو بالترقي إلى Senior و Staff، ولمن يفكر بصناعة محتوى تقني.",
      "en": "Tariq hosts Ahmed El-Imam, an Egyptian software engineer based in Berlin. The conversation starts with his path: eight years of work in Egypt, reaching Tech Lead, then the decision to move to Germany on a work contract, how he searched for jobs on LinkedIn, the visa and paperwork steps, and the real difficulties after arriving, which were bureaucratic rather than technical.\n\nHe then covers moving between companies and the eBay interviews that led to his current Senior Staff role: the interview stages and what each one measures, how he entered the AI space from a backend background, and how he uses agentic coding tools at work, including writing a description file for each task. He explains the practical difference between Senior and Staff, what his day looks like, and what a T-shirt size estimation is.\n\nThe last part is about content creation: why he started, what it changed for him, how he sees the economics of advanced Arabic content, and a back-and-forth with Tariq about paid products, followed by advice for people who want to relocate or grow a technical career. It suits engineers considering work in Europe, those aiming for Senior or Staff roles, and anyone thinking of creating technical content."
    },
    "takeaways": [
      {
        "ar": "في بحثه عن عمل كان LinkedIn هو القناة الأساسية: يحدّث بروفايله ليشبه الوظائف التي يستهدفها، ويتعلم التقنيات المطلوبة ويضيفها، ويقدّم باستمرار ويتعلم من المقابلات الفاشلة.",
        "en": "LinkedIn was his main job-search channel: he tuned his profile to match the roles he wanted, learned and added the technologies they asked for, and kept applying, learning from failed interviews."
      },
      {
        "ar": "الفيزا التي حصل عليها كانت مبنية على عقد العمل، والعقد هو أهم وثيقة؛ وقد تطلب السفارة تأكيدًا من الشركة أن العقد ما زال ساريًا إذا تأخرت المعالجة.",
        "en": "His visa was based on a work contract, which is the most important document; the embassy may ask the company to confirm the contract is still valid if processing is delayed."
      },
      {
        "ar": "الصعوبة الأكبر بعد الانتقال كانت في البيروقراطية والسكن والأوراق مع الحفاظ على الأداء في العمل، لا في الجانب التقني، ويحتاج ذلك إلى شركة متفهمة.",
        "en": "After moving, the hardest part was bureaucracy, housing and paperwork while keeping up at work, not the technical side, and it helps to have an understanding employer."
      },
      {
        "ar": "لا تتهاون في المكالمة الأولى مع الـ Recruiter: تعرّف على الشركة والفريق والوظيفة، فقد رُفض في شركات لأنه لم يهتم بها.",
        "en": "Do not treat the first recruiter call lightly: learn about the company, team and role beforehand; he was rejected by companies because he had not taken it seriously."
      },
      {
        "ar": "مقابلات eBay جمعت Problem Solving وأسئلة قريبة من System Design وأسئلة سلوكية، وكانت الشركة مرنة في اختيار لغة البرمجة، فاستخدم Ruby.",
        "en": "The eBay interviews mixed problem solving, system-design-style questions and behavioral questions, and the company let him pick his language, so he used Ruby."
      },
      {
        "ar": "يكتب لأداة البرمجة بالـ Agent ملفًا لكل مهمة فيه الوصف والسياق والملفات ذات الصلة، فيقلّ التكرار، ويعيد استخدام الملف بعد تحسينه في جلسة جديدة.",
        "en": "He writes a file per task for the coding agent with the description, context and relevant files, which cuts back-and-forth, and he reuses the refined file in a fresh session."
      },
      {
        "ar": "في مستوى Staff يتحول التركيز إلى التأثير عبر عدة فرق وإقناع الناس بدل الأمر، لأنه لا سلطة إدارية له عليهم، ويتطلب إظهار الأثر بالأرقام والتواصل مع أصحاب المصلحة.",
        "en": "At Staff level the focus shifts to influence across several teams and persuading people rather than directing them, since he has no managerial authority over them; it requires showing impact in numbers and communicating with stakeholders."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيف",
          "en": "Introduction to the guest"
        }
      },
      {
        "t": "2:56",
        "title": {
          "ar": "الخلفية والعمل في مصر",
          "en": "Background and work in Egypt"
        }
      },
      {
        "t": "8:02",
        "title": {
          "ar": "البحث عن عمل عبر LinkedIn",
          "en": "Job hunting through LinkedIn"
        }
      },
      {
        "t": "11:46",
        "title": {
          "ar": "التأقلم والتحديات في ألمانيا",
          "en": "Adapting to life in Germany"
        }
      },
      {
        "t": "16:00",
        "title": {
          "ar": "التقنيات والتنقل بين الشركات",
          "en": "Tech stack and company moves"
        }
      },
      {
        "t": "19:00",
        "title": {
          "ar": "الفيزا وعقد العمل",
          "en": "Visa and work contract"
        }
      },
      {
        "t": "25:22",
        "title": {
          "ar": "اللغة الألمانية والحياة في برلين",
          "en": "German language and Berlin life"
        }
      },
      {
        "t": "34:25",
        "title": {
          "ar": "مقابلات eBay",
          "en": "The eBay interviews"
        }
      },
      {
        "t": "39:48",
        "title": {
          "ar": "الدخول لمجال الـ AI",
          "en": "Getting into AI"
        }
      },
      {
        "t": "42:03",
        "title": {
          "ar": "أدوات البرمجة بالـ AI",
          "en": "Coding with AI tools"
        }
      },
      {
        "t": "50:06",
        "title": {
          "ar": "الفرق بين Senior و Staff",
          "en": "Senior versus Staff"
        }
      },
      {
        "t": "55:45",
        "title": {
          "ar": "يوم في حياة Staff",
          "en": "A day as a Staff engineer"
        }
      },
      {
        "t": "1:02:04",
        "title": {
          "ar": "صناعة المحتوى",
          "en": "Content creation"
        }
      },
      {
        "t": "1:23:00",
        "title": {
          "ar": "نصائح للجيل الجديد",
          "en": "Advice for newcomers"
        }
      }
    ]
  },
  {
    "n": 12,
    "slug": "what-a-cto-actually-does",
    "id": "S4Ptwkzfj2I",
    "title": {
      "ar": "ماذا يفعل الـ CTO فعلا؟",
      "en": "What a CTO Actually Does"
    },
    "dek": {
      "ar": "فيصل، الـ CTO في ZenHR، عن طريقه من مبرمج إلى CTO وكيف يعمل في الشركة",
      "en": "Faisal, CTO at ZenHR, on his path from developer to CTO and what the role involves day to day"
    },
    "guest": {
      "ar": "الفيصل الدجاني",
      "en": "Al-Faisal Al-Dajani"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "CTO في ZenHR.",
      "en": "CTO at ZenHR."
    },
    "quotes": [
      {
        "t": "0:20:10",
        "ar": "رحلة بريطانيا كانت مهمة جدا، وبنصح أي حدا يطلع يقعد سنتين ثلاثة يتنور، يشوف العالم الثاني كيف بيشتغل، يشوف كيف البلاد اللي فيها بروسيسيز.",
        "en": "The UK trip was very important, and I advise anyone to go and spend two or three years abroad to broaden their view, see how the rest of the world works, and see how countries built on proper processes operate."
      },
      {
        "t": "0:47:44",
        "ar": "إذا إنت عم تنضم لشركة أكثر من 100، 150 موظف، مش شغلك اليومي هو كتابة الكود. شغلك اليومي هو خدمة البزنس عن طريق توظيف التكنولوجيا.",
        "en": "If you are joining a company of more than 100 or 150 employees, your daily job is not writing code. Your daily job is serving the business by applying technology."
      },
      {
        "t": "1:52:32",
        "ar": "حوّط حالك بناس أفضل منك. لأنه إذا إنت أحسن واحد، معناها إنت ما عم تتعلم، ما عم تتطور. لازم يكون في حواليك ناس أحسن منك.",
        "en": "Surround yourself with people who are better than you. If you are the best one in the room, it means you are not learning and not growing. You need people around you who are better than you."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:30:21",
        "ar": "معظم الوقت اللي بسمعهم هي أهداف وليست استراتيجيات. التفكير الاستراتيجي الحقيقي مطلوب على هذا الليفل.",
        "en": "Most of the time what I hear are goals, not strategies. Real strategic thinking is required at this level."
      },
      {
        "t": "1:34:11",
        "ar": "أكبر مشكلة بنعاني منها بمنطقتنا إنه ما عننا أمثلة. We don't have enough examples of what good looks like.",
        "en": "The biggest problem we suffer from in our region is that we lack examples. We don't have enough examples of what good looks like."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق فيصل، الـ CTO في ZenHR، ليجيب عن ثلاثة أسئلة: من هو الـ CTO، وما وظيفته داخل الشركة، وكيف يصل الشخص إلى هذا المنصب. يبدأ فيصل بقصته: دخل علم الحاسوب في كلية الأميرة سميّة بعد أن فاته القبول في الهندسة بفارق ثلاث أعشار في التوجيهي، ثم يحكي عن قراره في موضوع الماجستير.\n\nبعدها يمر على محطاته المهنية، من الشركات الصغيرة في الأردن إلى Blue Kangaroo ثم Expedia في عمّان، ثم لندن مع Meta و Maersk، وعودته إلى الأردن والتحاقه بـ ZenHR. ومن هناك ينتقل الحوار إلى الدور نفسه: الطرق الثلاث للوصول إلى منصب CTO، ولماذا لا يوجد تعريف واحد للدور، وكيف تعامل مع أول 90 يوما، وعلاقاته مع مديره وزملائه وفريقه، وأنواع القرارات التي يتخذها.\n\nثم يتناول الحوار فلسفة التوظيف وأثر الذكاء الاصطناعي، والمهارات التقنية والقيادية المطلوبة، وأخطاء فيصل الأولى كمدير، وتحدي بناء مكتب Expedia في عمّان، وينتهي بنصائح وكتب. الحلقة مفيدة للمهندسين الذين يفكرون في مسار الإدارة والقيادة التقنية، ولكل من يريد أن يفهم ما يعنيه هذا المنصب فعلا.",
      "en": "Tariq hosts Faisal, CTO at ZenHR, to answer three questions: who a CTO is, what the role involves inside a company, and how someone gets there. Faisal starts with his own story: he ended up in computer science at Princess Sumaya University College after missing the engineering cut-off by three tenths of a point in Tawjihi, and he explains his thinking on whether to pursue a master's degree early.\n\nHe then walks through his career, from small companies in Jordan to Blue Kangaroo, Expedia's Amman office, and later London with Meta and Maersk, before returning to Jordan and joining ZenHR. From there the conversation turns to the role itself: the three routes to becoming a CTO, why there is no single definition of the job, how he approached his first 90 days, his relationships with his manager, peers and team, and the kinds of decisions he makes.\n\nThe discussion also covers hiring philosophy and the effect of AI, the technical and leadership skills the role requires, the mistakes he made as a young manager, the challenge of building Expedia's Amman office, and closes with advice and book recommendations. It is useful for engineers considering a path into management or technical leadership, and for anyone who wants to understand what the CTO role really involves."
    },
    "takeaways": [
      {
        "ar": "لا يوجد تعريف واحد للـ CTO: الدور يختلف حسب الشركة والشخص ومرحلة الشركة، لذلك يجب أن تعرف نقاط قوتك وما تحتاجه الشركة.",
        "en": "There is no single definition of a CTO: the role varies by company, person and stage, so you need to know your strengths and what the company needs."
      },
      {
        "ar": "في شركة بحجم 100 إلى 150 موظفا، عمل الـ CTO اليومي هو خدمة البزنس عبر توظيف التكنولوجيا، وليس كتابة الكود، والقيادة جزء كبير منه.",
        "en": "In a company of 100 to 150 people, a CTO's daily job is serving the business through technology rather than writing code, and leadership is a large part of it."
      },
      {
        "ar": "في أول 90 يوما لا تتخذ قرارات كبيرة: افهم النظام والناس وتوقعاتهم، واسأل كل فريق عن أولوياته وعن أكبر مشكلة يواجهها، ثم ابدأ بحل مشاكل سهلة تبني الثقة.",
        "en": "In the first 90 days, avoid big decisions: understand the system, the people and their expectations, ask each team for its priorities and biggest problem, then solve a few easy ones to build trust."
      },
      {
        "ar": "تحتاج إلى أكثر من منتور واحد، وتستخدم كل واحد لهدف مختلف، بدل أن تعيد اختراع كل شيء بنفسك.",
        "en": "Have several mentors rather than one and use each for a different purpose, instead of reinventing everything yourself."
      },
      {
        "ar": "قرارات الـ CTO تشمل اختيار التكنولوجيا (مع مراعاة سهولة التوظيف والتدريب)، واستراتيجية تقنية تخدم البزنس، والميزانية، والناس، وما الذي تبنيه الشركة ولماذا.",
        "en": "A CTO's decisions cover technology choices (weighing how easy it is to hire and train), a technology strategy that serves the business, budget, people, and what the company builds and why."
      },
      {
        "ar": "وسّع خبرتك بحل مشاكل في مجالات مختلفة وبتقنيات مختلفة، لأن القدرة على المفاضلة بين الحلول لا تأتي إلا من هذا التنوع.",
        "en": "Broaden your experience by solving problems in different domains with different technologies, because the ability to weigh alternatives only comes from that variety."
      },
      {
        "ar": "لا تقلّد قائدا تحبه: حاول فيصل ذلك وفشل لأن الناس تلاحظ ما ليس أصيلا، والأفضل أن تأخذ من التجارب ما يناسب شخصيتك وحاجة الشركة.",
        "en": "Do not imitate a leader you admire: Faisal tried and failed because people notice what is not authentic; take from others' experience what fits your personality and the company's needs."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "المقدمة وأسئلة الحلقة",
          "en": "Introduction and the episode's questions"
        }
      },
      {
        "t": "3:34",
        "title": {
          "ar": "من التوجيهي إلى علم الحاسوب",
          "en": "From Tawjihi to computer science"
        }
      },
      {
        "t": "7:06",
        "title": {
          "ar": "قرار الماجستير",
          "en": "The master's degree decision"
        }
      },
      {
        "t": "11:52",
        "title": {
          "ar": "المسيرة المهنية خطوة بخطوة",
          "en": "The career path step by step"
        }
      },
      {
        "t": "27:36",
        "title": {
          "ar": "ثلاث طرق للوصول إلى CTO",
          "en": "Three routes to becoming a CTO"
        }
      },
      {
        "t": "30:36",
        "title": {
          "ar": "ما هو دور الـ CTO",
          "en": "What the CTO role means"
        }
      },
      {
        "t": "41:06",
        "title": {
          "ar": "العلاقات وأول 90 يوما",
          "en": "Relationships and the first 90 days"
        }
      },
      {
        "t": "59:19",
        "title": {
          "ar": "أنواع قرارات الـ CTO",
          "en": "The decisions a CTO makes"
        }
      },
      {
        "t": "1:07:50",
        "title": {
          "ar": "فلسفة التوظيف",
          "en": "Hiring philosophy"
        }
      },
      {
        "t": "1:13:03",
        "title": {
          "ar": "الذكاء الاصطناعي والتوظيف",
          "en": "AI and hiring"
        }
      },
      {
        "t": "1:24:41",
        "title": {
          "ar": "المهارات المطلوبة للمنصب",
          "en": "Skills needed for the role"
        }
      },
      {
        "t": "1:38:34",
        "title": {
          "ar": "تحدي بناء مكتب Expedia",
          "en": "Building Expedia's Amman office"
        }
      },
      {
        "t": "1:49:26",
        "title": {
          "ar": "نصائح وكتب للختام",
          "en": "Closing advice and books"
        }
      }
    ]
  },
  {
    "n": 11,
    "slug": "amman-to-stanford-and-lucid",
    "id": "PBp0EDqIgHM",
    "title": {
      "ar": "من عمّان إلى ستانفورد وقطاع السيارات",
      "en": "From Amman to Stanford and Lucid"
    },
    "dek": {
      "ar": "حلا تحكي عن المنحة، وقبول ستانفورد، وتمويل الماجستير، وقرارها ترك الدكتوراه للعمل في السيارات الذاتية.",
      "en": "Hala on her scholarship, Stanford admission, funding her master's, and leaving a PhD for autonomous-driving work."
    },
    "guest": {
      "ar": "حلا الخليل",
      "en": "Hala Al-Khalil"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "مهندسة تعمل في أبل في منطقة خليج سان فرانسيسكو، وكانت سابقاً في Lucid.",
      "en": "Engineer at Apple in the San Francisco Bay Area; previously at Lucid."
    },
    "quotes": [
      {
        "t": "0:26:38",
        "ar": "وتعلمت بهاي الـ process إني أنا أقتنع أنا أيش بدي أعمل، وحسيت هذا الشيء كان كثير أهم من القبول أصلاً.",
        "en": "I learned through this process to become convinced of what I actually want to do, and I felt that was far more important than the admission itself."
      },
      {
        "t": "0:49:53",
        "ar": "ممكن يكون حدا بجامعة ثانية أصغر ومش كثير معروفة يشتغل كثير أكثر من حدا بستانفورد وما يوصل لنفس المكان.",
        "en": "Someone at a smaller, lesser-known university might work much harder than someone at Stanford and still not end up in the same place."
      },
      {
        "t": "1:31:00",
        "ar": "ما في خيار واحد للشيء الصح أو الشيء المفيد، فالفكرة إنه إنت أيش تعمل بالموجود بإيدك.",
        "en": "There isn't one single right or useful choice; what matters is what you do with what you have in hand."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:18:26",
        "ar": "المفارقة إنه لما يمر وقت أكثر بتصير التحديات أكبر، بتصير تكتشف إنه أوه، أنا مش عايشة في محيط بيشبهني.",
        "en": "The irony is that as more time passes the challenges get bigger, and you discover that you are not living in an environment that resembles you."
      },
      {
        "t": "0:10:58",
        "ar": "أكثر شيء ريالستيك ممكن نعمله في اللاب للتستنج قبل ما نطلع نعمل تستنج بالشارع، لأنه هذا كثير أغلى وكثير أصعب.",
        "en": "It is the most realistic thing we can do in the lab for testing before we go out and test on the road, because that is much more expensive and much harder."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق زميلته في أبل، حلا، وهي أردنية فلسطينية من عمّان. تبدأ الحكاية بمنحة دراسية من مدرستها إلى جامعة في ولاية كونتيكت، حيث درست الهندسة الميكانيكية والكهربائية، ثم ماجستير في الهندسة الميكانيكية في ستانفورد مع تركيز على تصميم أنظمة التحكم (Control Systems).\n\nتتوقف الحلقة عند محطات عملية: تدريبان صيفيان في تسلا ضمن فريق تصميم المصنع، ثم العمل مع شركة سيارات كهربائية، ثم ثلاث سنوات في Lucid على اختبار أنظمة القيادة الذاتية بأسلوب Hardware-in-the-Loop. تشرح حلا كيف تُبنى المحاكاة حول المعالج نفسه لاختبار الكود قبل نزول السيارة إلى الشارع، وتحكي عن كتابة الـ statement of purpose وكيف رأتها أهم من القبول نفسه.\n\nثم تحكي عن الجانب الصعب: صعوبة إيجاد تدريب في البكالوريوس، وتكاليف ستانفورد، ورسالة بعثتها على LinkedIn إلى شخص لا تعرفه ردّ عليها وفتح باب التمويل، وقرارها ترك مسار الدكتوراه. الحلقة مناسبة للطلاب الذين يفكرون بالدراسة في أمريكا، ولمن يوازن بين الأكاديميا والصناعة.",
      "en": "In this episode Tariq hosts Hala, a colleague at Apple who is Jordanian-Palestinian and from Amman. Her story starts with a school scholarship to a university in Connecticut, where she studied mechanical and electrical engineering, followed by a master's in mechanical engineering at Stanford focused on control systems design.\n\nThe conversation then follows her work: two summer internships at Tesla on a factory design team, a stint at an electric-vehicle company, and three years at Lucid testing autonomous-driving software with hardware-in-the-loop simulation. Hala explains how a simulation is built around the real chip so the code can be tested before it ever reaches a road, and describes writing her statement of purpose, which she came to see as more valuable than the admission itself.\n\nShe is also candid about the hard parts: struggling to find an undergraduate internship, the cost of Stanford, a cold LinkedIn message that led to funding from a stranger, and her decision to leave the PhD track. It suits students considering study in the US and anyone weighing academia against industry."
    },
    "takeaways": [
      {
        "ar": "تعامل مع الـ statement of purpose كأنك محامٍ تدافع عن قصتك: اكتب عدة مسودات، وأعطها لأساتذتك ليقرؤوها قبل التقديم.",
        "en": "Treat the statement of purpose like a lawyer's case for yourself: write several drafts and have professors you trust read them."
      },
      {
        "ar": "في تقديم الماجستير والدكتوراه يهتمون بما أنجزته في البحث أكثر من أنشطة البكالوريوس، فاعمل بحثاً قريباً من المجال، واكسب توصيات من أساتذة عملت معهم فعلاً.",
        "en": "Graduate admissions care more about your research than the extracurriculars that count for undergraduate applications, so do relevant research and get recommendations from professors you actually worked with."
      },
      {
        "ar": "قدّمت حلا على نحو 12 جامعة، ولم يكن ستانفورد خياراً مضموناً؛ اختيار الجامعة جاء بعد زيارتها وتقييم الجو والمجال وإمكانية الدعم.",
        "en": "Hala applied to around 12 universities and Stanford was not a sure thing; she chose after visiting, weighing the environment, the field and the available support."
      },
      {
        "ar": "التمويل قد يأتي من رسالة تبدو عشوائية: سؤال بسيط وصادق لشخص في المنطقة قاد إلى مكالمة ثم إلى دعم دراسة الماجستير.",
        "en": "Funding can come from an unlikely message: a simple, honest question to someone in the region led to a call and then to support for her master's."
      },
      {
        "ar": "محاكاة Hardware-in-the-Loop تتيح اختبار كود القيادة الذاتية على المعالج الحقيقي داخل المختبر قبل الاختبار على الطريق، لأن الاختبار الفعلي أغلى وأصعب بكثير.",
        "en": "Hardware-in-the-loop simulation lets you test autonomous-driving code on the real processor in the lab before road testing, which is far more expensive and harder."
      },
      {
        "ar": "الدكتوراه تتطلب قناعة شخصية قوية؛ حلا تركتها لأنها أرادت أثراً أسرع وارتباطاً أوضح بالسوق، ولأن الـ burnout جعلها بلا سبب مقنع للاستمرار.",
        "en": "A PhD needs strong personal conviction; Hala left hers because she wanted faster impact and a clearer link to the job market, and burnout left her without a compelling reason to continue."
      },
      {
        "ar": "من الطبيعي أخذ استراحة بين مرحلتين: قررت التوقف قليلاً بدل التقديم المتواصل، ثم جاءها عرض العمل.",
        "en": "Taking a break between stages is fine: she paused instead of applying nonstop, and a job offer came to her."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعارف",
          "en": "Introduction"
        }
      },
      {
        "t": "0:00:58",
        "title": {
          "ar": "من عمّان إلى أمريكا",
          "en": "From Amman to the US"
        }
      },
      {
        "t": "0:02:09",
        "title": {
          "ar": "أنظمة التحكم وماجستير ستانفورد",
          "en": "Control systems and Stanford"
        }
      },
      {
        "t": "0:05:05",
        "title": {
          "ar": "التدريب في تسلا",
          "en": "Tesla internships"
        }
      },
      {
        "t": "0:08:59",
        "title": {
          "ar": "القيادة الذاتية والمحاكاة",
          "en": "Autonomous driving and simulation"
        }
      },
      {
        "t": "0:11:55",
        "title": {
          "ar": "المنحة ودراسة البكالوريوس",
          "en": "The scholarship and undergrad"
        }
      },
      {
        "t": "0:23:17",
        "title": {
          "ar": "التقديم للماجستير وكتابة الـ SOP",
          "en": "Applying and writing the SOP"
        }
      },
      {
        "t": "0:31:33",
        "title": {
          "ar": "قبول ستانفورد واختيار الجامعة",
          "en": "Stanford admission and choice"
        }
      },
      {
        "t": "0:37:51",
        "title": {
          "ar": "تمويل الدراسة",
          "en": "Funding the degree"
        }
      },
      {
        "t": "0:48:06",
        "title": {
          "ar": "الحياة في ستانفورد",
          "en": "Life at Stanford"
        }
      },
      {
        "t": "1:01:21",
        "title": {
          "ar": "قرار ترك الدكتوراه",
          "en": "Leaving the PhD"
        }
      },
      {
        "t": "1:06:37",
        "title": {
          "ar": "شرح Hardware-in-the-Loop",
          "en": "Hardware-in-the-Loop explained"
        }
      },
      {
        "t": "1:15:59",
        "title": {
          "ar": "العمل في Lucid",
          "en": "Working at Lucid"
        }
      },
      {
        "t": "1:33:32",
        "title": {
          "ar": "مجتمع العرب في الباي إيريا",
          "en": "Arab community in the Bay Area"
        }
      }
    ]
  },
  {
    "n": 10,
    "slug": "electrical-engineering-to-front-end",
    "id": "NstiOxPOuaA",
    "title": {
      "ar": "من هندسة الكهرباء إلى الفرونت إند",
      "en": "From Electrical Engineering to Front-End"
    },
    "dek": {
      "ar": "علاء يحكي عن تعلّم البرمجة وحده، أول وظائفه في تركيا، العمل الحر، وصناعة المحتوى بـ CSS",
      "en": "Alaa on teaching himself to code, his first jobs in Turkey, freelancing, and building a CSS audience"
    },
    "guest": {
      "ar": "علاء العف",
      "en": "Alaa Al-Aff"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "مطور واجهات أمامية (Front-End) وصانع محتوى يرسم بـ HTML و CSS على إنستغرام، فلسطيني من غزة ويعيش في تركيا.",
      "en": "Front-end developer and content creator who draws with HTML and CSS on Instagram; Palestinian from Gaza, based in Turkey."
    },
    "quotes": [
      {
        "t": "4:05",
        "ar": "في عصر السوشيال ميديا الواحد نوعاً ما لازم ياخذ باله إنه يبدأ يورجي شغله، لو هو حابب إنه يتميز في شغله.",
        "en": "In the age of social media, you more or less have to start showing your work if you want to stand out in it."
      },
      {
        "t": "17:20",
        "ar": "أغلب التوظيف حالياً من الكونكشنز، يعني أنا بشوف إنه هي المفتاح الأساسي في عملية التوظيف.",
        "en": "Most hiring now happens through connections. I see it as the main key to the hiring process."
      },
      {
        "t": "1:15:45",
        "ar": "في النهاية أي حد بده يشتغل فريلانسر بحكي له ما تخليه هو المصدر الأساسي تبعك للشغل، خليك حاجة هيك جانبية.",
        "en": "In the end, to anyone who wants to freelance I say: do not make it your main source of work. Keep it as a side thing."
      }
    ],
    "moreQuotes": [
      {
        "t": "48:04",
        "ar": "في كثير ناس بتكون بدها تبدأ حاجة، لكن الـ overthinking اللي عندها والتفكير الكثير مع الوقت بخلي الفكرة تروح.",
        "en": "Many people want to start something, but their overthinking, all that thinking over time, makes the idea go away."
      },
      {
        "t": "1:04:45",
        "ar": "أهم حاجة ممكن تتعلمها من موضوع الفريلانسينغ إنك تعرف إيش الحاجات اللي عليها طلب كثير.",
        "en": "The most important thing you can learn from freelancing is knowing which things are in high demand."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق علاء، فلسطيني من غزة يعيش في تركيا منذ 2017، تعرّف عليه عبر ريلز على إنستغرام يرسم فيها مشاهد وشخصيات بـ HTML و CSS فقط. يحكي علاء كيف بدأ حسابه في نوفمبر 2024، ولماذا اختار أن يقدّم المحتوى بالإنجليزي رغم أن الإنجليزي ليست لغته الأكثر استخداماً.\n\nثم يعود إلى بداياته: دراسة هندسة الكهرباء، وتعلّم البرمجة بالاعتماد على نفسه بعد أن حدّثه أخوه عنها، ثم بوتكامب أونلاين، ومشاريع شخصية ينشرها على LinkedIn قادته إلى أول عرض عمل في إسطنبول قبل أن يتخرج. يحكي بعدها عن ترك أول شركة، وعن وظيفتين لاحقتين مع شركتين سعوديتين عن بُعد، وعن استخدامه Strapi و Frappe في الباك إند.\n\nفي النصف الثاني يتبادل الاثنان الخبرات في صناعة المحتوى: كيف حلّل علاء الريلز الناجحة قبل أن يبدأ، وكيف ينظم أفكاره، وأدوات الذكاء الاصطناعي التي يستخدمها في الصوت والتصميم. ويختم بتجربته في العمل الحر على Upwork، من بناء البروفايل وأول المشاريع إلى موقف أضرّ بتقييمه، ثم خطته لإطلاق كورس CSS. الحلقة مفيدة لمن يتعلم البرمجة وحده، ولمن يفكر في العمل الحر أو في صناعة المحتوى التقني.",
      "en": "In this episode Tariq talks with Alaa, a Palestinian from Gaza who has lived in Turkey since 2017. Tariq found him through Instagram reels in which Alaa draws scenes and characters using only HTML and CSS. Alaa explains how he started the account in November 2024, and why he chose to publish in English even though it is not the language he uses most.\n\nHe then goes back to the beginning: studying electrical engineering, teaching himself to code after his brother told him about it, joining an online bootcamp, and posting personal projects on LinkedIn, which led to a job offer in Istanbul before he had even graduated. He goes on to describe leaving that first company, two later remote jobs with Saudi companies, and working with Strapi and Frappe on the back end.\n\nThe second half is an exchange about content creation: how Alaa studied successful reels before starting, how he organizes ideas, and the AI tools he uses for voice and design. He closes with his freelancing experience on Upwork, from building a profile and landing the first projects to an incident that hurt his rating, and his plan to launch a CSS course. It is useful for anyone learning to code on their own, or thinking about freelancing or creating technical content."
    },
    "takeaways": [
      {
        "ar": "علاء تعلّم البرمجة وهو طالب هندسة كهرباء، ونشر مشاريعه على LinkedIn، فجاءه عرض عمل قبل أن يبدأ بالتقديم، بعد نحو سبعة أشهر من بدء التعلم.",
        "en": "Alaa learned to code while still an electrical engineering student and posted his projects on LinkedIn; a job offer came before he started applying, about seven months after he began learning."
      },
      {
        "ar": "فرصته الثانية جاءته من علاقات في المجال، ويرى أن أغلب التوظيف اليوم يمر عبر الكونكشنز أكثر من التقديم العادي.",
        "en": "His second job came through contacts in the field, and he believes most hiring today runs through connections rather than ordinary applications."
      },
      {
        "ar": "الجودة في المشاريع الصغيرة تتكلم عنك: طلب علاء الموقع عبر محادثة قصيرة جداً وسلّم ما يريده بالضبط.",
        "en": "Quality on small projects speaks for you; the site he asked Alaa for took a very short conversation and was delivered exactly as wanted."
      },
      {
        "ar": "قبل أن ينشر على إنستغرام قضى شهوراً يحلل الريلز الناجحة: كيف تبدأ وكيف تنتهي، وأي منشورات حققت مشاهدات ولماذا.",
        "en": "Before posting on Instagram he spent months analyzing successful reels: how they open and end, and which posts earned views and why."
      },
      {
        "ar": "الإفراط في التفكير قبل البدء قد يقتل الفكرة؛ يكتب علاء سكريبت الفكرة فور وصولها ويضعها جانباً، ثم يتابع التحسين مع كل فيديو.",
        "en": "Overthinking before starting can kill an idea; Alaa writes the script as soon as an idea arrives, sets it aside, and keeps improving with each video."
      },
      {
        "ar": "يستخدم الذكاء الاصطناعي في الصوت (استنساخ صوته عبر ElevenLabs) وفي توليد تصاميم أولية، لكن الفكرة والنص النهائي منه.",
        "en": "He uses AI for voice-over (cloning his own voice with ElevenLabs) and for draft designs, while the ideas and final script remain his own."
      },
      {
        "ar": "في العمل الحر على Upwork: ابنِ بروفايل قوياً، قدّم على مشاريع صغيرة أولاً لتكسب أول التقييمات، ولا تجعل المنصة مصدر دخلك الوحيد.",
        "en": "For freelancing on Upwork: build a strong profile, apply for small projects first to earn early reviews, and do not make the platform your only source of income."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "كيف تعرّف طارق على علاء",
          "en": "How Tariq found Alaa"
        }
      },
      {
        "t": "3:10",
        "title": {
          "ar": "بداية حساب إنستغرام",
          "en": "Starting the Instagram account"
        }
      },
      {
        "t": "6:27",
        "title": {
          "ar": "من غزة إلى تركيا والبرمجة",
          "en": "From Gaza to Turkey and code"
        }
      },
      {
        "t": "8:30",
        "title": {
          "ar": "البوتكامب و LinkedIn",
          "en": "Bootcamp and LinkedIn"
        }
      },
      {
        "t": "11:32",
        "title": {
          "ar": "أول وظيفة: React في إسطنبول",
          "en": "First job: React in Istanbul"
        }
      },
      {
        "t": "13:03",
        "title": {
          "ar": "ترك الشركة التركية",
          "en": "Leaving the Turkish company"
        }
      },
      {
        "t": "17:03",
        "title": {
          "ar": "الوظيفة الثانية عبر الكونكشنز",
          "en": "Second job through connections"
        }
      },
      {
        "t": "23:45",
        "title": {
          "ar": "الباك إند مع Strapi و Frappe",
          "en": "Back end with Strapi and Frappe"
        }
      },
      {
        "t": "28:49",
        "title": {
          "ar": "رمضان في تركيا",
          "en": "Ramadan in Turkey"
        }
      },
      {
        "t": "36:22",
        "title": {
          "ar": "نصائح لبدء قناة يوتيوب",
          "en": "Tips for starting on YouTube"
        }
      },
      {
        "t": "45:58",
        "title": {
          "ar": "تحضير الريلز وتنظيم الأفكار",
          "en": "Preparing reels, organizing ideas"
        }
      },
      {
        "t": "53:30",
        "title": {
          "ar": "أدوات الذكاء الاصطناعي للمحتوى",
          "en": "AI tools for content"
        }
      },
      {
        "t": "1:03:35",
        "title": {
          "ar": "العمل الحر وبناء بروفايل Upwork",
          "en": "Freelancing and Upwork profile"
        }
      },
      {
        "t": "1:11:48",
        "title": {
          "ar": "تجربة سيئة وخطة الكورس",
          "en": "A bad experience, then the course"
        }
      }
    ]
  },
  {
    "n": 9,
    "slug": "phd-to-machine-learning-engineer",
    "id": "2Z1PzVxORa4",
    "title": {
      "ar": "من الدكتوراه إلى هندسة تعلّم الآلة",
      "en": "From a PhD to ML Engineering"
    },
    "dek": {
      "ar": "مهندس تعلّم آلة بدكتوراه في NLP يشرح كيف تُدرَّب النماذج اللغوية، ولماذا كان 2017 نقطة التحول، وكيف تبني مسيرتك في المجال",
      "en": "An ML engineer with an NLP PhD explains how models are trained, why 2017 was the turning point, and how to build a career in the field"
    },
    "guest": {
      "ar": "د. طارق الهندي",
      "en": "Dr. Tariq Al-Hindi"
    },
    "cat": "ai-data",
    "draft": true,
    "guestBio": {
      "ar": "مهندس تعلّم آلة (Machine Learning Engineer) في شركة ناشئة في مجال Legal Tech، حاصل على دكتوراه من جامعة كولومبيا في معالجة اللغات الطبيعية.",
      "en": "Machine Learning Engineer at a legal-tech startup; PhD from Columbia University with a focus on natural language processing."
    },
    "quotes": [
      {
        "t": "8:04",
        "ar": "الـ AI أحس يكون أنجح لما يكون مكمّل للإنسان الخبير في مجال، سواء طبيب أو محامي، خاصة لما يكون المجال تكلفة الخطأ فيه عالية.",
        "en": "I feel AI is most successful when it complements the human expert in a field, whether a doctor or a lawyer, especially when the cost of error in that field is high."
      },
      {
        "t": "26:18",
        "ar": "كيف أقيّم الموديل هذا دائمًا صعب جدًا، ويكون أصعب لما يكون المخرج جنرتف، يعني لما يكون الموديل هذا ينتج تكست. كيف تعرف إن التكست هذا صح ولا غلط؟ ما في جواب صحيح، لأنه قد يكون في أكثر من جواب صحيح.",
        "en": "How to evaluate this model is always very hard, and harder when the output is generative, meaning the model produces text. How do you know whether this text is right or wrong? There is no single correct answer, because there may be more than one correct answer."
      },
      {
        "t": "1:04:09",
        "ar": "ادرس هذه الأشياء صح، هذا الأساس، افهمها قدر الإمكان وركّز عليها، لأن الترندز والموديلز الجديدة كلها عبارة عن اختلافات بسيطة لأساس. يعني إذا عندك الأساس ثابت وقوي، تقدر تفهم الكونسبت الجديد بشكل جيد.",
        "en": "Study these things properly, this is the foundation. Understand them as much as you can and focus on them, because new trends and models are all just small variations on a foundation. If your foundation is solid and strong, you can understand the new concept well."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:05:58",
        "ar": "مع هاجينغ فيس هذه بايثون لايبراري معروفة جدًا، تقدر تسوي ترينين الموديل بسطرين. انسى هاجينغ فيس، سوِّ لي نيورال نتورك فروم سكراتش، استخدم نمباي فقط، افهم كيف تسوي لاير كامل بنفسك.",
        "en": "With Hugging Face, which is a very well-known Python library, you can train a model in two lines. Forget Hugging Face: build a neural network from scratch, use only NumPy, and understand how to build a whole layer yourself."
      },
      {
        "t": "1:01:21",
        "ar": "لما جوجل استوعبوا، لأنهم هم أكثر ناس نشروا أشياء مؤثرة جدًا في 2017 و2018، لما سبقتهم OpenAI في 2022 بطلوا ينشروا في 2023.",
        "en": "When Google realized it, since they were the ones who published the most influential things in 2017 and 2018, once OpenAI got ahead of them in 2022, they stopped publishing in 2023."
      }
    ],
    "summary": {
      "ar": "يستضيف البودكاست طارق، مهندس تعلّم آلة سعودي يعمل في الولايات المتحدة. يبدأ بمسيرته: بكالوريوس هندسة كمبيوتر من جامعة البترول، ثم ماجستير علوم حاسب من جامعة سيراكيوز، ثم ثلاث سنوات باحثًا في مدينة الملك عبد العزيز للعلوم والتقنية، ثم دكتوراه في جامعة كولومبيا تخصصت في معالجة اللغات الطبيعية (NLP). بعد التخرج في نهاية 2022 صادف سوق وظائف متجمدًا في شركات التقنية، فاشتغل بشكل خفيف كباحث ما بعد الدكتوراه بالتعاون مع جامعة محمد بن زايد، ثم انضم مبكرًا إلى شركة ناشئة في مجال Legal Tech.\n\nيشرح طارق كيف تستخدم شركته الذكاء الاصطناعي لاستخراج معلومات من العقود (تصنيف الملفات واستخراج أسماء البنوك والشركات والتواريخ) وتخزينها كـ features يستفيد منها المستخدم، ولماذا يرى أن الـ AI ينجح أكثر حين يكمّل الخبير البشري. ثم يفكك المفاهيم بالتدريج: الفرق بين AI و Machine Learning و NLP، ومعنى حجم النموذج بعدد الـ parameters، وكيف يتم التدريب خطوة بخطوة (training data، loss function، optimization و gradient descent، ثم validation و test data وخطر الـ overfitting)، وكيف يختلف supervised learning عن self-supervision في النماذج اللغوية الكبيرة.\n\nفي الجزء الثاني يحكي عن بيبر Attention Is All You Need من جوجل سنة 2017 وكيف حلّ بنية الـ Transformer محل النماذج التسلسلية البطيئة، وعن تسلسل بيرت و GPT و ChatGPT وتغيّر سياسة النشر عند الشركات. ويختم بنصائح عملية للمهتمين بالمجال: أتقن الأساسيات، قوِّ بايثون، ابنِ portfolio ظاهرًا، تواصل مع الناس، وابقَ على اطلاع عبر القوائم البريدية والمجتمعات وقراءة الأوراق العلمية. الحلقة مناسبة لمن يريد فهمًا مبسطًا لكيفية عمل النماذج ولمن يفكر بدخول مجال ML.",
      "en": "The guest is Tariq, a Saudi machine learning engineer working in the United States. He starts with his path: a bachelor's in computer engineering at the Saudi petroleum university, a master's in computer science at Syracuse, three years as a researcher at King Abdulaziz City for Science and Technology, then a PhD at Columbia University focused on natural language processing (NLP). Graduating at the end of 2022 into a frozen tech hiring market, he did light postdoc work in collaboration with Mohamed bin Zayed University, then joined a legal-tech startup early on.\n\nTariq explains how his company uses AI to pull information out of contracts (classifying files and extracting bank and company names and dates) and store it as features users can filter on, and why he believes AI works best as a complement to the human expert. He then builds up the concepts step by step: how AI, machine learning and NLP relate, what model size means in terms of parameters, and how training works end to end (training data, a loss function, optimization such as gradient descent, then validation and test data and the risk of overfitting). He also contrasts supervised learning with the self-supervision used for large language models.\n\nThe second half covers Google's 2017 paper Attention Is All You Need, how the Transformer replaced slow sequential models, the arc from BERT and GPT to ChatGPT, and how companies' attitudes to publishing changed. He closes with practical advice for people entering the field: master the fundamentals, get strong in Python, build a visible portfolio, network, and keep up through newsletters, communities and reading papers. It suits listeners who want a plain-language picture of how models are trained and anyone considering a career in ML."
    },
    "takeaways": [
      {
        "ar": "يرى طارق أن الـ AI ينجح أكثر حين يكمّل الخبير البشري (طبيب، محامٍ)، خاصة في المجالات التي تكلفة الخطأ فيها عالية.",
        "en": "Tariq sees AI succeeding most as a complement to the human expert (a doctor, a lawyer), especially where the cost of a mistake is high."
      },
      {
        "ar": "في عمله اليومي معظم الوقت يذهب إلى تجهيز الداتا وليس كتابة الكود: كيف تختار البيانات وتتأكد من صحتها، لأن مكتبات بايثون توفر معظم الأدوات.",
        "en": "In day-to-day ML engineering, most of the time goes into preparing data rather than writing code: how to choose it and verify it, since Python libraries already provide most of the tooling."
      },
      {
        "ar": "تقييم النماذج التوليدية صعب لأن مخرجها نص، وقد يكون هناك أكثر من جواب صحيح.",
        "en": "Evaluating generative models is hard because the output is text and there may be more than one correct answer."
      },
      {
        "ar": "التدريب يعني تعلّم قيم الـ parameters: يبدأ النموذج بقيم عشوائية، تقيس الـ loss function بُعد توقعه عن الجواب الصحيح، وتعدّل خوارزمية optimization مثل gradient descent القيم تدريجيًا بخطوات تصغر مع الوقت.",
        "en": "Training means learning parameter values: the model starts with random values, a loss function measures how far its predictions are from the right answer, and an optimizer such as gradient descent adjusts the values in progressively smaller steps."
      },
      {
        "ar": "تُقسَّم البيانات إلى training و validation و test؛ والـ test data التي لم يرها النموذج أبدًا تعطي تقديرًا تقريبيًا لأدائه الحقيقي، والغرض تجنب الـ overfitting.",
        "en": "Data is split into training, validation and test sets; test data the model has never seen gives an approximate estimate of real performance, and the point is to avoid overfitting."
      },
      {
        "ar": "النماذج اللغوية الكبيرة تتدرب بـ self-supervision: يُخفى جزء من النص ويتنبأ النموذج بما بعده، فالجواب موجود في ��لبيانات دون تدخل بشري. وهذا مع تطور الداتا والـ GPUs سبب الطفرة الأخيرة.",
        "en": "Large language models train with self-supervision: part of a text is hidden and the model predicts what follows, so the answer is already in the data with no human labeling. Together with growth in data and cheaper, faster GPUs, this drove the recent boom."
      },
      {
        "ar": "بيبر Attention Is All You Need من جوجل (2017) ربط الـ attention بالمدخل مباشرة بدل المرور على الكلمات تسلسليًا، فتسرّع التدريب كثيرًا وبدأت معه بنية الـ Transformer.",
        "en": "Google's 2017 Attention Is All You Need paper tied attention directly to the input instead of stepping through words sequentially, which sped up training greatly and launched the Transformer architecture."
      },
      {
        "ar": "لدخول المجال: ركّز على الأساسيات (loss و optimization)، جرّب بناء شبكة عصبية من الصفر بـ NumPy، قوِّ بايثون، وابنِ portfolio على GitHub وموقعًا شخصيًا، وتواصل مع الناس؛ وللبقاء على اطلاع استخدم القوائم البريدية والمجتمعات والمحتوى المتخصص وقراءة الأوراق العلمية.",
        "en": "To enter the field: focus on fundamentals (loss, optimization), try building a neural network from scratch with NumPy, get strong in Python, build a GitHub portfolio and a personal site, and network; to keep up, use newsletters, communities, specialist content and paper reading."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة",
          "en": "Introduction"
        }
      },
      {
        "t": "1:49",
        "title": {
          "ar": "الخلفية التعليمية",
          "en": "Educational background"
        }
      },
      {
        "t": "6:25",
        "title": {
          "ar": "العمل الحالي كمهندس تعلّم آلة",
          "en": "Working as an ML engineer"
        }
      },
      {
        "t": "7:57",
        "title": {
          "ar": "كيف تستخدم الشركة الذكاء الاصطناعي",
          "en": "How the company uses AI"
        }
      },
      {
        "t": "13:57",
        "title": {
          "ar": "LLM و LM",
          "en": "LLM and LM"
        }
      },
      {
        "t": "17:55",
        "title": {
          "ar": "ما هو NLP",
          "en": "What is NLP"
        }
      },
      {
        "t": "24:17",
        "title": {
          "ar": "مسؤوليات مهندس تعلّم الآلة",
          "en": "ML engineer responsibilities"
        }
      },
      {
        "t": "28:06",
        "title": {
          "ar": "كيف تُدرَّب النماذج",
          "en": "How models are trained"
        }
      },
      {
        "t": "45:42",
        "title": {
          "ar": "تدريب LLMs والتعلم الخاضع للإشراف",
          "en": "Training LLMs and supervision"
        }
      },
      {
        "t": "48:16",
        "title": {
          "ar": "أهمية NLP",
          "en": "Why NLP matters"
        }
      },
      {
        "t": "50:24",
        "title": {
          "ar": "عام 2017 ونقطة التحول",
          "en": "2017 as the turning point"
        }
      },
      {
        "t": "1:03:20",
        "title": {
          "ar": "نصائح للمهتمين بالمجال",
          "en": "Advice for newcomers"
        }
      },
      {
        "t": "1:07:21",
        "title": {
          "ar": "كيف تحصل على وظيفة",
          "en": "How to get a job"
        }
      },
      {
        "t": "1:09:27",
        "title": {
          "ar": "كيف تنجح في المجال",
          "en": "How to succeed in the field"
        }
      },
      {
        "t": "1:11:12",
        "title": {
          "ar": "كيف تبقى على اطلاع",
          "en": "How to keep up"
        }
      }
    ]
  },
  {
    "n": 8,
    "slug": "product-management-career-jordan-australia",
    "id": "QawdWEauNx8",
    "title": {
      "ar": "مسيرة مديرة منتج بين الأردن وأستراليا",
      "en": "A Product Manager's Path Across Two Countries"
    },
    "dek": {
      "ar": "ديالا تحكي عن إدارة المنتج، ونظام تتبع المتقدمين ATS وكتابة السيرة الذاتية، والموازنة بين الكرير والعائلة.",
      "en": "Diala on product management, applicant tracking systems and CVs, and balancing a tech career with family."
    },
    "guest": {
      "ar": "ديالا خوالدة",
      "en": "Diala Khawaldeh"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "نائب الرئيس لإدارة المنتج (VP of Product) في ZenHR.",
      "en": "VP of Product at ZenHR."
    },
    "quotes": [
      {
        "t": "0:11:15",
        "ar": "وهناك عن جد تعلمت شو يعني برودكت مانجر، وشو المطلوب مني، وين مسؤولياتي بتبدا وين بتنتهي.",
        "en": "And there I truly learned what a product manager is, what is expected of me, and where my responsibilities begin and end."
      },
      {
        "t": "0:53:46",
        "ar": "بدك تحكي الأشياء بشكل مفهوم من الكل، وفي ناس مش كثير تكنيكال راح يفهموا عليك، خصوصا إذا عم تبني شي معقد، انك تبسطه وتقنعهم فيه وانه هذا مستاهل اني اصرف وقت وجهد عليه.",
        "en": "You need to explain things in a way everyone understands. Some people aren't very technical, especially if you're building something complex, so you have to simplify it and convince them it's worth spending time and effort on."
      },
      {
        "t": "1:32:45",
        "ar": "الشغل مش أهم شي بالحياة، وأنا دائما هذا الشي بحكيه لتيمي ولزملائي.",
        "en": "Work is not the most important thing in life, and I always tell my team and colleagues this."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:27:10",
        "ar": "إذا في رول بديت فيه وما حبيته، نغيره على طول، خصوصا بالبدايات التغيير سهل.",
        "en": "If there's a role you started and didn't like, change it right away. Especially early on, changing is easy."
      },
      {
        "t": "1:28:10",
        "ar": "الفضول والتعلم صفات أساسية لحدا بده يكبر ويكون مميز بمجاله.",
        "en": "Curiosity and learning are essential traits for anyone who wants to grow and stand out in their field."
      }
    ],
    "summary": {
      "ar": "تبدأ ديالا بسرد مسيرتها من تخرجها في هندسة الحاسوب عام 2007، مرورا بعملها كـ QA وفي شركات استشارية، وبرنامج TechWomen في كاليفورنيا، ثم العمل عن بعد من الأردن مع منصة لتوظيف النساء، والانتقال إلى أستراليا حيث عملت كمديرة منتج في منصة داخلية ثم في Atlassian، وصولا إلى عودتها للأردن والعمل في ZenHR.\n\nبعدها تشرح ما يفعله مدير المنتج فعليا: ترجمة احتياجات الزبائن إلى حلول، وتقسيمها إلى مهام صغيرة، والتعاون مع المصمم والمهندس ومدير المشروع، والفرق بين مدير المنتج ومدير المشروع. وتذكر المهارات المطلوبة، ونصيحتها لمن يريد الانتقال من QA أو الهندسة إلى إدارة المنتج.\n\nفي الجزء الثاني تتحدث عن نظام تتبع المتقدمين (ATS) في ZenHR وكيف تُكتب السيرة الذاتية لتُقرأ جيدا، ثم عن تحديات المرأة في المجال التقني ونصائحها للخريجات الجدد، وتنتهي بتجربتها في الموازنة بين العمل والعائلة. الحلقة مفيدة لمن يفكر في إدارة المنتج، ولمن يجهّز سيرته الذاتية، وللنساء في بداية مسيرتهن التقنية.",
      "en": "Diala begins with her career path: a 2007 computer engineering degree, early work in QA and consulting, the TechWomen program in California, remote work from Jordan for a platform that placed women in jobs, and a move to Australia where she was a product manager on an internal platform and then at Atlassian, before returning to Jordan to join ZenHR.\n\nShe then explains what a product manager actually does: translating customer needs into solutions, breaking them into small tasks, working with designers, engineers and project managers, and how the role differs from project management. She covers the skills the role demands and her advice for QA people and engineers who want to move into it.\n\nThe second half covers the applicant tracking system (ATS) at ZenHR and how a CV should be written to be read well, then the challenges women face in tech, her advice for new graduates, and how she balances work and family. It is useful for anyone considering product management, preparing a CV, or starting out as a woman in tech."
    },
    "takeaways": [
      {
        "ar": "مدير المنتج يترجم احتياجات الزبائن ووضع المنافسة وأهداف الشركة إلى حلول، ثم يتابع هل حققت هذه الحلول ما أُريد منها فعلا.",
        "en": "A product manager translates customer needs, the competitive landscape and company goals into solutions, then checks whether those solutions actually delivered what was intended."
      },
      {
        "ar": "يجب تقسيم الحل إلى مهام صغيرة واضحة يستطيع المصمم والمهندس العمل عليها مباشرة، وإشراكهما مبكرا في تشكيل الحل.",
        "en": "Break a solution into small, clear tasks that designers and engineers can work on directly, and involve them early in shaping the solution."
      },
      {
        "ar": "مدير المشروع يركز على الوقت والموارد والمخاطر والتسليم في موعده، بينما مدير المنتج يحدد ماذا نبني ولماذا.",
        "en": "A project manager focuses on time, resources, risk and on-time delivery, while a product manager decides what to build and why."
      },
      {
        "ar": "أفضل مديري المنتج غالبا لم يبدؤوا بهذا الدور؛ خبرتهم في دورة تطوير البرمجيات (SDLC)، وفهمهم للمبيعات والتسويق والمالية، ومهارة التبسيط والعرض، والتعاطف مع المستخدم، كلها تفيدهم.",
        "en": "The strongest product managers rarely start in the role; experience in the SDLC, an understanding of sales, marketing and finance, the ability to simplify and present, and empathy for the user all help."
      },
      {
        "ar": "أسهل طريق للانتقال إلى إدارة المنتج غالبا من داخل الشركة التي تعمل فيها، لأنك تعرف المنتج والعمليات، وقد تعطيك الشركة مشروعا صغيرا لتتعلم منه.",
        "en": "The easiest route into product management is often from inside your current company, since you already know the product and processes, and the company may give you a small project to learn from."
      },
      {
        "ar": "السيرة الذاتية التي تُقرأ بشكل جيد هي نصية وليست صورة، بتنسيق واضح ومتسق، وتستخدم الكلمات المفتاحية من وصف الوظيفة؛ لكنها تزيد فرصة المقابلة فقط ولا تغني عن النجاح في المقابلة.",
        "en": "A CV that parses well is text rather than an image, consistently formatted, and uses keywords from the job description; it improves the chance of an interview but does not replace doing well in it."
      },
      {
        "ar": "في بداية المسيرة: تعلّم كل ما تستطيع، ولا تتردد في تغيير دور لا تحبه، وعبّر عن رأيك حتى لو لم تكن الفكرة مكتملة.",
        "en": "Early in a career: learn as much as you can, do not hesitate to change a role you dislike, and voice your ideas even when they are not fully formed."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيفة",
          "en": "Introduction"
        }
      },
      {
        "t": "1:55",
        "title": {
          "ar": "من هندسة الحاسوب إلى QA",
          "en": "From engineering degree to QA"
        }
      },
      {
        "t": "3:26",
        "title": {
          "ar": "برنامج TechWomen في كاليفورنيا",
          "en": "The TechWomen program"
        }
      },
      {
        "t": "8:27",
        "title": {
          "ar": "العمل عن بعد لتوظيف النساء",
          "en": "Remote work for women's hiring"
        }
      },
      {
        "t": "16:56",
        "title": {
          "ar": "الانتقال إلى أستراليا",
          "en": "Moving to Australia"
        }
      },
      {
        "t": "22:31",
        "title": {
          "ar": "العمل في Atlassian",
          "en": "Working at Atlassian"
        }
      },
      {
        "t": "27:29",
        "title": {
          "ar": "العودة إلى الأردن و ZenHR",
          "en": "Returning to Jordan and ZenHR"
        }
      },
      {
        "t": "32:22",
        "title": {
          "ar": "ما هو مدير المنتج؟",
          "en": "What a product manager does"
        }
      },
      {
        "t": "43:49",
        "title": {
          "ar": "مدير المنتج مقابل مدير المشروع",
          "en": "Product vs project manager"
        }
      },
      {
        "t": "48:04",
        "title": {
          "ar": "الطلب على الدور في العالم العربي",
          "en": "Demand for the role in the Arab world"
        }
      },
      {
        "t": "50:42",
        "title": {
          "ar": "المهارات المطلوبة لمدير المنتج",
          "en": "Skills a product manager needs"
        }
      },
      {
        "t": "58:37",
        "title": {
          "ar": "الانتقال من QA إلى إدارة المنتج",
          "en": "Moving from QA to product"
        }
      },
      {
        "t": "1:04:20",
        "title": {
          "ar": "نظام تتبع المتقدمين ATS",
          "en": "Applicant tracking systems"
        }
      },
      {
        "t": "1:19:58",
        "title": {
          "ar": "تحديات المرأة ونصائح للخريجات",
          "en": "Women in tech and advice"
        }
      },
      {
        "t": "1:29:50",
        "title": {
          "ar": "الموازنة بين العمل والعائلة",
          "en": "Balancing work and family"
        }
      }
    ]
  },
  {
    "n": 7,
    "slug": "jpmorgan-amazon-brex-career-interviews",
    "id": "Ii3ZtN4yUnA",
    "title": {
      "ar": "من JPMorgan إلى Amazon و Brex",
      "en": "From JPMorgan to Amazon and Brex"
    },
    "dek": {
      "ar": "مهندس سوري في نيويورك يحكي عن دراسته وعمله في بنك وشركة عملاقة وستارت أب، وعن المقابلات والعروض",
      "en": "A Syrian engineer in New York on his studies, a bank, Amazon and a startup, and on interviews and job offers"
    },
    "guest": {
      "ar": "طارق صعيدي",
      "en": "Tareq Saidi"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "مهندس برمجيات (Backend) في نيويورك، عمل سابقا في JPMorgan و Amazon و Brex.",
      "en": "Software engineer in New York; previously at JPMorgan, Amazon and Brex."
    },
    "quotes": [
      {
        "t": "0:21:35",
        "ar": "امازون عندهم يمكن الاف، كل واحد سأل شو ما بده، فصعب إنه واحد يحضر له. فبدل ما تحضر على 100 سؤال، تحضر على شي 2000، 3000 سؤال.",
        "en": "Amazon has maybe thousands of questions, and every interviewer asks whatever they want, so it is hard to prepare. Instead of preparing for 100 questions, you prepare for something like 2,000 or 3,000."
      },
      {
        "t": "0:32:14",
        "ar": "أنا بصراحة تعلمت كثير كثير كثير كثير كثير. اللي تعلمته بامازون بالسنتين أكثر من اللي تعلمته بحياتي كلها.",
        "en": "Honestly, I learned a huge amount. What I learned at Amazon in two years is more than what I had learned in my whole life."
      },
      {
        "t": "1:20:55",
        "ar": "حاول دائما تكون عم تعمل شغلات أكثر من الناس اللي حواليك. أي شي ما حدا بده يعمله، انت خذه، انت اعمله. هي أسهل طريقة إنك تتعلم فيها وتوري إنه انت بتحب شغلك.",
        "en": "Always try to do more than the people around you. Anything nobody wants to do, take it, do it. That is the easiest way to learn and to show that you love your work."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:09:51",
        "ar": "في أغلب الأحيان حتى لو انت ما بتعرف شو الجواب الصح، إذا انت عم تشرحلي كيف انت عم تفكر، أنا فيني أساعدك أكثر.",
        "en": "Most of the time, even if you do not know the right answer, if you explain to me how you are thinking, I can help you more."
      },
      {
        "t": "1:19:18",
        "ar": "حاول دائما هيك تلاقي شغلة فيك تعملها لحالك، عملها. أحسن طريقة إنك تتعلم فيها، تورجي العالم إنه انت بتعرف تعمل شغلات.",
        "en": "Always try to find something you can build on your own, and build it. It is the best way to learn, and to show people that you know how to make things."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق زميله في العمل، وهو مهندس برمجيات سوري يعيش في بروكلين بنيويورك منذ عام 2012. يبدأ الحوار بزيارته الأخيرة إلى دمشق بعد سنوات طويلة، ثم ينتقل إلى مسيرته: دراسة في Brooklyn College ثم ماجستير في علوم الحاسوب من NYU دفع كلفته من جيبه وهو يعمل بدوام كامل.\n\nبعدها يحكي عن محطاته المهنية: تدريب ثم عمل في JPMorgan Chase، ثم Amazon في فريق الإعلانات حيث تعلم الكثير لكنه واجه ضغط المناوبة (on-call) وكثرة تغيّر المدراء وتعثر الترقية، ثم شركة ناشئة اسمها يُكتب في الصوت Brex بقي فيها نحو ثلاث سنوات. ويشرح كيف حضّر للمقابلات وتعامل مع عدة عروض ورفض بعضها، ومنها عروض من Microsoft و Facebook.\n\nفي الجزء الأخير يتحدث عن أخطائه في مقابلات Google، ونصائحه للمقابلات: التفكير بصوت عال، وطرح الأسئلة، والتدرب على كل شيء. ويختم بنصائح للمبتدئين حول المشاريع الجانبية والفضول والمبادرة. الحلقة مفيدة لطلاب علوم الحاسوب والخريجين الجدد ولمن يفكر بتغيير وظيفته.",
      "en": "Tariq hosts a colleague, a Syrian software engineer who has lived in Brooklyn, New York since 2012. The conversation opens with his recent first visit to Damascus in many years, then moves to his path: a degree at Brooklyn College, followed by a master's in computer science at NYU that he paid for himself while working full time.\n\nHe then walks through his career: an internship and job at JPMorgan Chase, then Amazon on the advertising team, where he learned a great deal but dealt with on-call pressure, frequent manager changes and a stalled promotion, and then a startup (written Brex in the audio) where he stayed about three years. He explains how he prepared for interviews and handled several offers, turning some down, including ones from Microsoft and Facebook.\n\nThe last part covers his failed Google interviews and his interview advice: think out loud, ask questions, and practice everything. He closes with advice for beginners on side projects, curiosity and taking initiative. It suits computer science students, new graduates, and anyone thinking about changing jobs."
    },
    "takeaways": [
      {
        "ar": "الماجستير لا يغير الكثير في سوق العمل؛ الخبرة العملية بحسب رأيه أنفع منه.",
        "en": "A master's degree does not change much in the job market; in his view, work experience helps more."
      },
      {
        "ar": "Amazon تسأل في كل مقابلة أسئلة سلوكية مبنية على مبادئ الشركة، إضافة إلى سؤال تقني، وأسئلتها غير محددة سلفا فيصعب التحضير لها.",
        "en": "Amazon asks behavioral questions based on its leadership principles plus a technical question in every round, and the technical questions are not a fixed set, which makes preparation harder."
      },
      {
        "ar": "في Amazon يتعلم المهندس كثيرا لأنه مسؤول عن خدمته بالكامل، لكن المناوبة وضغط العمل وكثرة تغيير المدراء ثمنها كبير.",
        "en": "At Amazon an engineer learns a lot by owning the whole service, but on-call duty, workload and constant manager turnover carry a real cost."
      },
      {
        "ar": "التدرب على المقابلات مع شركات لا تنوي العمل فيها يبني الثقة ويقلل التوتر عند المقابلة المهمة.",
        "en": "Practicing interviews with companies you do not intend to join builds confidence and reduces nerves in the interview that matters."
      },
      {
        "ar": "في المقابلة، اشرح تفكيرك بصوت عال واطرح أسئلة توضيحية، فالمقابل لا يستطيع مساعدتك إن لم يعرف كيف تفكر.",
        "en": "In an interview, explain your thinking aloud and ask clarifying questions; the interviewer cannot help if they do not know how you think."
      },
      {
        "ar": "الأداء في الأسئلة السلوكية وروح التعامل يؤثران في القرار، وقد ينجح من هو متوسط تقنيا ويتميز سلوكيا.",
        "en": "Behavioral answers and attitude affect the hiring decision, and a candidate who is average technically but strong behaviorally can get an offer."
      },
      {
        "ar": "المشاريع الجانبية والمبادرة بالمهام التي لا يريدها أحد من أسهل طرق التعلم وإظهار الاهتمام بالعمل.",
        "en": "Side projects and taking on tasks nobody wants are among the easiest ways to learn and show you care about the work."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة والتعارف في الشركة",
          "en": "Introduction and how they met"
        }
      },
      {
        "t": "0:02:24",
        "title": {
          "ar": "من الشام إلى نيويورك وزيارة سوريا",
          "en": "From Damascus to New York"
        }
      },
      {
        "t": "0:10:15",
        "title": {
          "ar": "المسيرة العلمية: الجامعة والماجستير",
          "en": "Education: college and master's"
        }
      },
      {
        "t": "0:11:39",
        "title": {
          "ar": "التدريب والعمل في JPMorgan",
          "en": "JPMorgan internship and job"
        }
      },
      {
        "t": "0:16:39",
        "title": {
          "ar": "ترك البنك والانتقال إلى Amazon",
          "en": "Leaving the bank for Amazon"
        }
      },
      {
        "t": "0:19:33",
        "title": {
          "ar": "مقابلات Amazon و LeetCode",
          "en": "Amazon interviews and LeetCode"
        }
      },
      {
        "t": "0:24:35",
        "title": {
          "ar": "العمل في فريق إعلانات Amazon",
          "en": "Working on Amazon Ads"
        }
      },
      {
        "t": "0:32:14",
        "title": {
          "ar": "تجربة Amazon: التعلم والضغط",
          "en": "Amazon: learning and pressure"
        }
      },
      {
        "t": "0:41:39",
        "title": {
          "ar": "الانتقال إلى الشركة الناشئة",
          "en": "Joining the startup"
        }
      },
      {
        "t": "0:49:04",
        "title": {
          "ar": "لماذا ترك الشركة الناشئة",
          "en": "Why he left the startup"
        }
      },
      {
        "t": "0:57:58",
        "title": {
          "ar": "رفض عروض Microsoft و Facebook",
          "en": "Turning down Microsoft and Facebook"
        }
      },
      {
        "t": "1:04:30",
        "title": {
          "ar": "فشل مقابلات Google",
          "en": "Failing Google interviews"
        }
      },
      {
        "t": "1:08:38",
        "title": {
          "ar": "نصائح للمقابلات",
          "en": "Interview tips"
        }
      },
      {
        "t": "1:18:11",
        "title": {
          "ar": "نصائح للمهندسين الجدد",
          "en": "Advice for new engineers"
        }
      }
    ]
  },
  {
    "n": 6,
    "slug": "data-science-analyst-engineer-differences",
    "id": "X928LVRNIrI",
    "title": {
      "ar": "الفرق بين هندسة وعلم وتحليل البيانات",
      "en": "Data Science, Analysis and Engineering"
    },
    "dek": {
      "ar": "رحلة من هندسة الميكانيك في الأردن إلى الدكتوراه وعلم البيانات في أمريكا، وشرح أدوار الداتا وكيف تدخل المجال",
      "en": "From mechanical engineering in Jordan to a PhD and data science in the US, plus the data roles explained and how to enter the field"
    },
    "guest": {
      "ar": "د. رغد خوالدة",
      "en": "Dr. Raghad Khawaldeh"
    },
    "cat": "ai-data",
    "draft": true,
    "guestBio": {
      "ar": "Data Scientist في Procter & Gamble (أوهايو، الولايات المتحدة).",
      "en": "Data Scientist at Procter & Gamble (Ohio, USA)."
    },
    "quotes": [
      {
        "t": "0:15:21",
        "ar": "ما بضبط أبلش أحلل داتا وأنا مش عارفة إيش الـ business goals، إيش الـ business strategy.",
        "en": "It doesn't work for me to start analyzing data without knowing what the business goals are, what the business strategy is."
      },
      {
        "t": "1:04:30",
        "ar": "مرات في أسئلة بالـ assessment بتبين إذا كان الجواب تبعك too generic زي ChatGPT.",
        "en": "Sometimes there are questions in the assessment that show whether your answer is too generic, like ChatGPT's."
      },
      {
        "t": "1:19:47",
        "ar": "أنا نصحت أكثر من حدا إنه إذا بدهم يفوتوا هذا المجال يبلشوا بالـ SQL، لأنه هي simple language وسهل الواحد يتعلمها، وفي كثير صارلها فترة طويلة بالماركت ففي كثير support إلها.",
        "en": "I have advised more than one person that if they want to enter this field, they should start with SQL, because it is a simple language that is easy to learn, it has been in the market for a long time, so it has a lot of support."
      }
    ],
    "moreQuotes": [
      {
        "t": "0:44:12",
        "ar": "الواحد ممكن يبني خبرة بالداتا ساينس، يتعلم عن الداتا ساينس لحاله، لأنه كثير صار في online platforms.",
        "en": "A person can build experience in data science and learn about it on their own, because there are now many online platforms."
      },
      {
        "t": "0:06:22",
        "ar": "الـ networking كثير مهم بهذا الموضوع.",
        "en": "Networking is very important in this matter."
      }
    ],
    "summary": {
      "ar": "تحكي د. رغد خوالدة عن مسيرتها التعليمية والمهنية: من البكالوريوس في الهندسة الميكانيكية بجامعة العلوم والتكنولوجيا الأردنية، إلى منحة الماجستير في أمريكا ثم الدكتوراه، وعملها على الداتا في مستشفى قبل أن تنتقل إلى الصناعة. وتشرح كيف حصلت على المنح، وما معنى الـ research assistantship.\n\nبعدها تفرّق بين ثلاثة أدوار: Data Scientist الذي يبني النماذج والتوقعات، و Data Analyst الذي يفهم البيانات ويعرضها في dashboards عبر أدوات مثل Tableau و Power BI، و Data Engineer الذي يبني الـ pipelines ويجهّز البيانات (data lake، ETL) قبل أن تصل للباقين. وتشرح المهارات لكل دور: الإحصاء والاحتمالات، البرمجة بـ Python أو R و SQL، وفهم الـ business.\n\nوتتناول الحلقة الطلب على السوق في أمريكا والشرق الأوسط، وخطوات المقابلات (HR screen، coding assessment، take-home، business case)، وأثر ChatGPT و Copilot على العمل، وكيف يعرف الشخص إن كان هذا المجال مناسبًا له. الحلقة مفيدة للطلاب والخريجين ومن يفكر بالتحول إلى مجال البيانات.",
      "en": "Dr. Raghad Khawaldeh describes her path: a mechanical engineering degree at Jordan University of Science and Technology, a master's scholarship in the US, then a PhD, with research work on data at a hospital before moving to industry. She explains how she found scholarships and what a research assistantship means.\n\nShe then separates three roles: the Data Scientist, who builds models and predictions; the Data Analyst, who understands the data and presents it in dashboards with tools such as Tableau and Power BI; and the Data Engineer, who builds pipelines and prepares data (data lakes, ETL) before anyone else touches it. She covers the skills for each: statistics and probability, Python or R plus SQL, and business understanding.\n\nThe conversation also covers demand in the US and the Middle East, the interview stages (HR screen, coding assessment, take-home, business case), the effect of ChatGPT and Copilot on the work, and how to tell whether the field suits you. It is useful for students, new graduates and anyone considering a move into data."
    },
    "takeaways": [
      {
        "ar": "الـ Data Scientist يحتاج ثلاثة أشياء: إحصاء واحتمالات، وبرمجة (Python أو R)، وفهم للـ business.",
        "en": "A Data Scientist needs three things: statistics and probability, programming (Python or R), and business understanding."
      },
      {
        "ar": "الـ Data Analyst يفهم البيانات ويعرضها بأدوات مثل Tableau و Power BI، ولا يكتب كود كثير بالمقارنة مع الـ Data Scientist، لكن يحتاج SQL.",
        "en": "A Data Analyst understands the data and presents it with tools like Tableau and Power BI, writes less code than a Data Scientist, but needs SQL."
      },
      {
        "ar": "الـ Data Engineer يبني الـ pipelines التي تجمع البيانات من مصادر مختلفة وتنظفها وتجهزها قبل التحليل.",
        "en": "The Data Engineer builds the pipelines that collect data from different sources, clean it and prepare it before analysis."
      },
      {
        "ar": "لا تستخدم مكتبات الـ ML كصندوق أسود: افهم الخوارزمية ومعادلاتها قبل تطبيقها حتى لا تعطي الإدارة نتائج خاطئة.",
        "en": "Do not treat ML libraries as black boxes: understand the algorithm and its math before applying it, so you do not give management wrong results."
      },
      {
        "ar": "تنصح بالبدء بـ SQL لأنها لغة بسيطة وقديمة في السوق وعليها دعم كبير، ثم Python أو R.",
        "en": "She recommends starting with SQL because it is a simple, long-established language with plenty of support, then moving to Python or R."
      },
      {
        "ar": "في الـ take-home assignment قد تظهر أسئلة المقابلة إن كان الجواب generic مثل ناتج ChatGPT، لأنه لا يعكس تفكيرك أو سبب اختيارك للخوارزمية.",
        "en": "In interviews, follow-up questions can reveal an answer that is too generic, like ChatGPT output, because it does not reflect your own reasoning or why you chose an algorithm."
      },
      {
        "ar": "لمعرفة إن كان المجال مناسبًا لك: هل تحب الرياضيات وحل المشاكل والعمل على البيانات؟ جرّب بدورات أو مشروع صغير أولًا.",
        "en": "To judge if the field suits you, ask whether you like math, problem solving and working with data, and try it first through courses or a small project."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وترحيب",
          "en": "Introduction"
        }
      },
      {
        "t": "0:00:49",
        "title": {
          "ar": "الخلفية التعليمية والمهنية",
          "en": "Education and career background"
        }
      },
      {
        "t": "0:05:10",
        "title": {
          "ar": "كيف حصلت على المنح",
          "en": "How she found scholarships"
        }
      },
      {
        "t": "0:09:40",
        "title": {
          "ar": "معنى الـ research assistantship",
          "en": "What a research assistantship is"
        }
      },
      {
        "t": "0:13:35",
        "title": {
          "ar": "ما هو الـ Data Scientist",
          "en": "What a Data Scientist does"
        }
      },
      {
        "t": "0:20:10",
        "title": {
          "ar": "الـ Data Analyst",
          "en": "The Data Analyst"
        }
      },
      {
        "t": "0:27:50",
        "title": {
          "ar": "الـ Data Engineer والـ pipelines",
          "en": "Data Engineer and pipelines"
        }
      },
      {
        "t": "0:36:07",
        "title": {
          "ar": "مقارنة الأدوار الثلاثة",
          "en": "Comparing the three roles"
        }
      },
      {
        "t": "0:40:16",
        "title": {
          "ar": "الطلب على السوق",
          "en": "Market demand"
        }
      },
      {
        "t": "0:45:08",
        "title": {
          "ar": "المهارات والأدوات المطلوبة",
          "en": "Skills and tools"
        }
      },
      {
        "t": "0:52:43",
        "title": {
          "ar": "مراحل المقابلات",
          "en": "Interview stages"
        }
      },
      {
        "t": "1:03:06",
        "title": {
          "ar": "الذكاء الاصطناعي والمقابلات",
          "en": "AI and interviews"
        }
      },
      {
        "t": "1:14:18",
        "title": {
          "ar": "الداتا ساينتست ودورة تطوير البرمجيات",
          "en": "Data science and the SDLC"
        }
      },
      {
        "t": "1:18:17",
        "title": {
          "ar": "هل المجال مناسب لك؟",
          "en": "Is the field right for you?"
        }
      }
    ]
  },
  {
    "n": 5,
    "slug": "technology-in-gaza-reema-askar",
    "id": "xj_ZBrTvS4k",
    "title": {
      "ar": "التكنولوجيا في غزة",
      "en": "Technology in Gaza"
    },
    "dek": {
      "ar": "مهندسة برمجيات من غزة تحكي عن البيئة التقنية قبل العدوان، وما تغيّر منذ بدايته على التعليم والإنترنت وفرص العمل",
      "en": "A software engineer in Gaza describes the tech scene before the war and how it has changed for education, internet and work"
    },
    "guest": {
      "ar": "ريما عسكر",
      "en": "Reema Askar"
    },
    "cat": "stories",
    "draft": true,
    "guestBio": {
      "ar": "مهندسة برمجيات من غزة، خريجة 2023 من جامعة الأزهر، تعمل في تطوير تطبيقات الموبايل بـ Flutter.",
      "en": "Software engineer from Gaza, 2023 graduate of Al-Azhar University, specializing in mobile apps with Flutter."
    },
    "quotes": [
      {
        "t": "13:35",
        "ar": "احنا شعب يحب الحياة. دائمًا بدك تطلع من هذه المأساة بشيء مختلف، بشيء نوعي يغطي على اللي كان موجود ويضيف فكرة مستقبلية لك.",
        "en": "We are a people who love life. You always have to come out of this tragedy with something different, something of quality that covers over what was there and adds a vision for the future."
      },
      {
        "t": "1:36:00",
        "ar": "احنا ما بنحكي إنه احنا محتاجين تمويلات، لا، احنا محتاجين فرص توظيف وعدم هدر الطاقات الشبابية في المجال التقني، وهذا أهم وقت إنك تعطي هذه الفرص.",
        "en": "We are not saying we need funding. No, we need job opportunities and for young tech talent not to be wasted, and this is the most important time to give those opportunities."
      },
      {
        "t": "1:51:59",
        "ar": "دائمًا أنا بحكي إنه ما تنسوا فلسطين، ما تنسوا أهلكم في غزة، سواء كتقني أو غيرهم. الكل بحاجة إنه يضغط على المحتل، يضغط على كل الجوانب.",
        "en": "I always say, do not forget Palestine, do not forget your people in Gaza, whether you are in tech or not. Everyone needs to apply pressure on the occupier, on every front."
      }
    ],
    "moreQuotes": [
      {
        "t": "3:15",
        "ar": "فكرة البروبلم سولفينج هذه مش فكرة مؤقتة لمسابقة، وإنما على مدار شغلك كمبرمج وعلى مدار شغلك كفهم لـ Data Structures و Algorithms.",
        "en": "Problem solving is not a temporary idea for a competition; it stays with you throughout your work as a programmer and your understanding of data structures and algorithms."
      },
      {
        "t": "1:32:14",
        "ar": "موضوع الإنترنت هو حق موجود كحق من حقوق الإنسان أساسًا.",
        "en": "Internet access is, in the first place, a human right."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة، المسجّلة بتاريخ 28 أكتوبر 2024، يستضيف طارق المهندسة ريما عسكر من جنوب قطاع غزة، وهي خريجة هندسة برمجيات متخصصة في تطبيقات الموبايل بـ Flutter، وعملت مدربة برمجة وفريلانسر قبل الحرب. تبدأ ريما بتعريف بنفسها، ثم ترسم صورة للبيئة التقنية في غزة قبل العدوان: التكنولوجيا في المدارس، وفرع التوجيهي التقني، وإضافة مساقات مثل العمل الحر والمسابقات البرمجية في الجامعات، ومراكز التدريب وحاضنات الأعمال مثل Gaza Sky Geeks.\n\nبعدها تنتقل الحلقة إلى واقع الإنترنت (الجيل الثاني وشركتا جوال وأوريدو)، والمساحات المشتركة، وحياة الطلاب في الجامعة، ثم إلى ما حدث بعد بدء الحرب: توقف الجامعات والمدارس عن العمل الحضوري، والتعليم عن بعد عبر جامعات الضفة ومنصة تعليمية على Microsoft Teams، وانهيار فرص عمل وتدريب كانت قد وُعدت بها ريما وزملاؤها قبل أيام من التصعيد.\n\nتختم ريما بما يمكن أن يفعله التقنيون وأصحاب العمل خارج غزة: توظيف الكفاءات في غزة وإعطاؤها الأولوية، وتدريبات مدفوعة الأجر، ودعم مساحات العمل والأجهزة والمنح. الحلقة مناسبة لمن يريد فهم الحياة التقنية في غزة من داخلها، ولأصحاب العمل والمبادرات الذين يريدون دعم المبرمجين هناك.",
      "en": "Recorded on 28 October 2024, this episode hosts Reema Askar from southern Gaza, a software engineering graduate who specializes in Flutter mobile development and worked as a programming trainer and freelancer before the war. She introduces herself and then paints a picture of the tech scene in Gaza before the offensive: technology in schools, a technology track in the tawjihi secondary exam, new university courses such as freelancing and competitive programming, and training centers and incubators such as Gaza Sky Geeks.\n\nThe conversation then covers internet access (2G and early 3G through two providers), shared workspaces and student life on campus, before turning to what changed after the war began: universities and schools stopped in-person teaching, online learning was organized through West Bank universities and a Microsoft Teams based school platform, and job and training opportunities that Reema and her peers had just secured disappeared within days of the escalation.\n\nReema closes with what tech people and employers outside Gaza can do: hire and prioritize talent in Gaza, offer paid internships, and fund workspaces, devices and scholarships. The episode suits anyone who wants to understand Gaza's tech community from the inside, and employers or initiatives looking to support developers there."
    },
    "takeaways": [
      {
        "ar": "قبل الحرب أدخلت الوزارة التكنولوجيا إلى المدارس (السبورة الذكية ومعامل التقنية) وزوّدتها بالطاقة الشمسية لأن الكهرباء كانت متوفرة ست إلى ثماني ساعات فقط.",
        "en": "Before the war, technology was introduced into Gaza's schools (smart boards, tech labs) and schools were fitted with solar power because grid electricity was available only six to eight hours a day."
      },
      {
        "ar": "أُضيف إلى التوجيهي فرع تقني يتخصص فيه الطالب في برمجة الموبايل أو الويب أو الألعاب أو التصميم قبل دخول الجامعة.",
        "en": "The tawjihi added a technology track in which students specialize in mobile, web, game development or design before university."
      },
      {
        "ar": "مساق العمل الحر في الجامعات علّم الطلاب مهام عملية: كتابة سيرة ذاتية، وإنشاء ملف على منصات العمل الحر، وكتابة العروض، وفهم التحويلات المالية واختيار العملاء.",
        "en": "A university freelancing course taught practical tasks: writing a CV, building a profile on freelance platforms, writing proposals, handling payments and choosing clients."
      },
      {
        "ar": "مهارة البرمجة التنافسية وحل المشكلات ليست مؤقتة لمسابقة، بل تفيد المبرمج طوال عمله، وإضافة الذكاء الاصطناعي إلى تطبيق Flutter تميّزه عن غيره.",
        "en": "Problem solving from competitive programming is not just for contests; it serves a programmer throughout their career, and adding AI to a Flutter app sets it apart from ordinary apps."
      },
      {
        "ar": "معظم التمويل والاستثمار في الشركات الناشئة بغزة يأتي من الخارج عبر حاضنات ومسرّعات مثل Gaza Sky Geeks، بينما الناتج والعمل يكونان داخل القطاع.",
        "en": "Most funding for Gaza startups comes from abroad through incubators and accelerators such as Gaza Sky Geeks, while the work itself is done inside the Strip."
      },
      {
        "ar": "اليوم تتركز فرص العمل في الفريلانس والشركات الخارجية عن بعد، لكن عروضًا كثيرة تتوقف عند معرفة صاحب العمل أن المتقدّم من غزة، وإغلاق معبر رفح يمنع السفر للوظيفة.",
        "en": "Work today is almost entirely freelancing and remote work for foreign companies, but offers often stall once the employer learns the applicant is from Gaza, and the closed Rafah crossing blocks relocation."
      },
      {
        "ar": "طلبت ريما من أصحاب العمل توظيف الكفاءات في غزة وتقديم تدريبات مدفوعة الأجر، ومن المموّلين دعم مساحات العمل والأجهزة والمنح التقنية.",
        "en": "Reema asked employers to hire talent in Gaza and offer paid training, and asked funders to support workspaces, devices and tech scholarships."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة الحلقة",
          "en": "Introduction"
        }
      },
      {
        "t": "1:24",
        "title": {
          "ar": "من هي ريما عسكر",
          "en": "Who is Reema Askar"
        }
      },
      {
        "t": "7:05",
        "title": {
          "ar": "التعليم التقني في المدارس",
          "en": "Tech education in schools"
        }
      },
      {
        "t": "14:55",
        "title": {
          "ar": "الجامعات والمسابقات البرمجية",
          "en": "Universities and programming contests"
        }
      },
      {
        "t": "19:02",
        "title": {
          "ar": "مراكز التدريب والحاضنات",
          "en": "Training centers and incubators"
        }
      },
      {
        "t": "24:41",
        "title": {
          "ar": "فرص العمل والتمويل",
          "en": "Job paths and funding"
        }
      },
      {
        "t": "31:00",
        "title": {
          "ar": "Gaza Sky Geeks وتأثيرها",
          "en": "Gaza Sky Geeks and its impact"
        }
      },
      {
        "t": "37:59",
        "title": {
          "ar": "الإنترنت قبل العدوان",
          "en": "Internet before the war"
        }
      },
      {
        "t": "48:44",
        "title": {
          "ar": "مساحات العمل وحياة الجامعة",
          "en": "Workspaces and campus life"
        }
      },
      {
        "t": "1:00:30",
        "title": {
          "ar": "أثر العدوان على الخريجين",
          "en": "The war's impact on graduates"
        }
      },
      {
        "t": "1:11:45",
        "title": {
          "ar": "الجامعات والمدارس الآن",
          "en": "Universities and schools now"
        }
      },
      {
        "t": "1:23:58",
        "title": {
          "ar": "التوظيف أثناء الحرب",
          "en": "Work during the war"
        }
      },
      {
        "t": "1:31:47",
        "title": {
          "ar": "كيف يمكن دعم التقنيين",
          "en": "How to support Gaza's techies"
        }
      },
      {
        "t": "1:40:07",
        "title": {
          "ar": "مؤثرون تقنيون من غزة",
          "en": "Tech influencers from Gaza"
        }
      }
    ]
  },
  {
    "n": 4,
    "slug": "ready-for-the-job-market",
    "id": "K0wjC-R5Wm0",
    "title": {
      "ar": "كيف تكون جاهزاً لسوق العمل",
      "en": "How to Be Ready for the Job Market"
    },
    "dek": {
      "ar": "د. محمد أبو هدهود عن التأسيس الصحيح في البرمجة، الاستمرارية، وبناء مسار مهني بلا تشتت",
      "en": "Dr. Mohammad Abu Hadhoud on proper programming foundations, consistency, and building a career without distraction"
    },
    "guest": {
      "ar": "د. محمد أبو هدهود",
      "en": "Dr. Mohammad Abu Hadhoud"
    },
    "cat": "careers",
    "draft": true,
    "guestBio": {
      "ar": "صاحب منصة Programming Advices لتعليم البرمجة.",
      "en": "Founder of the Programming Advices platform for teaching programming."
    },
    "quotes": [
      {
        "t": "4:06",
        "ar": "اللي بيتعلم صح واللي بيتعلم غلط في مجال البرمجة، الاثنين بيتعبوا والاثنين بيدفعوا وقتهم وجهدهم. ووقتك وجهدك هو فلوس.",
        "en": "Whoever learns the right way and whoever learns the wrong way in programming, both of them work hard and both pay with their time and effort. And your time and effort are money."
      },
      {
        "t": "53:49",
        "ar": "لما بقول لك الحظ بياخذ الجاهز، أنا مجرب. لو أنا ما كنت جاهز لهذا المشروع، كيف كنت بدي آخذه؟ ما كنت حقدر آخذه نهائياً.",
        "en": "When I tell you luck takes the one who is ready, I speak from experience. If I had not been ready for that project, how would I have taken it? I would not have been able to take it at all."
      },
      {
        "t": "2:05:18",
        "ar": "عدم الاستعجال في النتائج. كل شيء بده وقت، ما في مهنة بتدر دخل عالي بتتعلمها بوقت قصير. اطلع على إنجازاتك وما تطلع على قديش باقي في الطريق.",
        "en": "Do not rush for results. Everything takes time; there is no profession that pays a high income that you can learn in a short time. Look at what you have achieved, not at how much of the road remains."
      }
    ],
    "moreQuotes": [
      {
        "t": "17:27",
        "ar": "الاستمرارية هي موازنة ما بين التعلم والحياة، التعلم والهوايات. إدارة الوقت كثير مهمة وبتقدر تعمل كل شيء في حياتك.",
        "en": "Consistency is a balance between learning and life, learning and hobbies. Time management is very important, and you can do everything in your life."
      },
      {
        "t": "1:58:10",
        "ar": "شعور لذة العطاء ألذ من لذة الأخذ.",
        "en": "The pleasure of giving is greater than the pleasure of taking."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق د. محمد أبو هدهود، مؤسس منصة Programming Advices، ليحكي عن رؤيته لتعليم البرمجة بالعربي. يبدأ الحديث بسؤال عن سبب تفاعل المتابعين مع القناة، فيشرح أبو هدهود فكرة التأسيس بالتدريج، ولماذا يرى أن الدورات السريعة التي تعد بالوظيفة خلال أشهر قليلة تعطي شعوراً وهمياً بالإنجاز، وكيف يرى دور الجامعات في التحضير لسوق العمل.\n\nثم يروي مسيرته: دراسته في الأردن، تعلمه الإنجليزية بنفسه خلال أربعة أشهر، مشاريعه أيام الجامعة، دخوله سوق العمل، ثم تأسيس شركة برمجيات مع صديقه، وما مرت به الشركة بعد الربيع العربي وإعادة الهيكلة. ويستخلص من هذه التجارب أفكاراً عن الاستمرارية، وتقبل الفشل، والجاهزية للفرصة، وأهمية تعلم الإدارة بجانب البرمجة.\n\nوفي الجزء الثاني يتحدث عن بداية المنصة وخارطة الطريق (من C++ إلى C# ثم الباك اند)، ورأيه في سوق وظائف المبتدئين والذكاء الاصطناعي، وزياراته لسوريا ومصر ولقاءاته مع الطلاب، وينهي بثلاث نصائح للنجاح في أي مهنة. الحلقة مفيدة لمن يتعلم البرمجة من الصفر أو يتخبط بين المسارات والدورات.",
      "en": "Tariq hosts Dr. Mohammad Abu Hadhoud, founder of the Programming Advices platform, to talk about teaching programming in Arabic. The conversation opens with why viewers connect with his channel, and Abu Hadhoud explains his idea of building foundations gradually, why he believes short courses that promise a job within a few months give a false sense of achievement, and how he sees the role of universities in preparing people for the job market.\n\nHe then tells his own story: studying in Jordan, teaching himself English in four months, the projects he built at university, entering the job market, and later co-founding a software company with a friend, including what the company went through after the Arab Spring and its restructuring. From these experiences he draws lessons on consistency, accepting failure, being ready when an opportunity comes, and learning management alongside programming.\n\nThe second half covers how the platform began and its roadmap (from C++ to C# and then backend), his view of the entry-level job market and AI, his visits to Syria and Egypt and his meetings with students, and it ends with three pieces of advice for success in any profession. It is useful for anyone learning programming from scratch or struggling to choose between paths and courses."
    },
    "takeaways": [
      {
        "ar": "الاستمرارية لا تعني الدراسة بنفس عدد الساعات كل يوم، بل موازنة بين التعلم والحياة والهوايات، مع أيام ثقيلة وأيام خفيفة.",
        "en": "Consistency does not mean studying the same number of hours every day; it means balancing learning with life and hobbies, with heavier and lighter days."
      },
      {
        "ar": "بناء برنامج بأدوات جاهزة بدون كتابة كود يعطي شعوراً وهمياً بالإنجاز؛ التأسيس الصحيح يحتاج تدرجاً ومعلومات قليلة مع تطبيق كثير.",
        "en": "Building a program from ready-made tools without writing code gives a false sense of achievement; proper foundations need gradual steps, a little theory and a lot of practice."
      },
      {
        "ar": "يرى أن الجامعات ليست وظيفتها تجهيز الطالب لسوق العمل، وأن عرض المشاريع ومشاركتها وبناء السمعة من أيام الدراسة يحتسب لاحقاً في سوق العمل.",
        "en": "He argues that preparing students for the job market is not the university's job, and that building and showing projects during study counts in the job market later."
      },
      {
        "ar": "تعلم لغة تقدم لك أساسيات البرمجة كاملة (مثل C++ في خارطته) ثم الانتقال لغيرها يسهل لاحقاً؛ من يتقن الأساسيات يستطيع الانتقال بين اللغات والتقنيات.",
        "en": "Learning a language that teaches the fundamentals fully (such as C++ in his roadmap) makes moving to other languages easier later; whoever masters the basics can move between languages and technologies."
      },
      {
        "ar": "للمبتدئ: لا تنشغل بـ System Design و Design Patterns قبل أن تتقن الأساسيات وتطبق عدة مشاريع كاملة؛ الشركات تسأل Entry Level أسئلة على قدّه.",
        "en": "For beginners: do not rush into System Design or Design Patterns before mastering the basics and building several complete projects; companies ask entry-level candidates questions suited to that level."
      },
      {
        "ar": "في رأيه الطلب على المبتدئين الجيدين مستمر في سوق البرمجة، وينصح بتعلم البرمجة التقليدية أولاً ثم التحول لاحقاً إلى Data Science أو AI.",
        "en": "In his view demand for good entry-level programmers continues, and he advises learning traditional programming first and moving to Data Science or AI later."
      },
      {
        "ar": "الإدارة تكمّل أي مهنة؛ يقول إنه بنى نفسه فيها على مدى سنوات بقراءة يومية وشهادات، وإن \"الحظ بياخذ الجاهز\".",
        "en": "Management complements any profession; he says he built himself in it over years through daily reading and certifications, and that \"luck takes the one who is ready\"."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيف",
          "en": "Introduction to the guest"
        }
      },
      {
        "t": "2:37",
        "title": {
          "ar": "سر تفاعل المتابعين مع القناة",
          "en": "Why viewers connect with the channel"
        }
      },
      {
        "t": "4:24",
        "title": {
          "ar": "وهم الإنجاز والتعلم السريع",
          "en": "False achievement and fast learning"
        }
      },
      {
        "t": "7:48",
        "title": {
          "ar": "الجامعات وسوق العمل",
          "en": "Universities and the job market"
        }
      },
      {
        "t": "13:30",
        "title": {
          "ar": "مسيرته والاستمرارية",
          "en": "His journey and consistency"
        }
      },
      {
        "t": "21:26",
        "title": {
          "ar": "الجامعة ومشاريع الدراسة",
          "en": "University and student projects"
        }
      },
      {
        "t": "34:21",
        "title": {
          "ar": "تأسيس الشركة",
          "en": "Founding the company"
        }
      },
      {
        "t": "50:54",
        "title": {
          "ar": "إعادة الهيكلة و\"الحظ بياخذ الجاهز\"",
          "en": "Restructuring and being ready"
        }
      },
      {
        "t": "1:07:41",
        "title": {
          "ar": "كيف بدأت المنصة",
          "en": "How the platform began"
        }
      },
      {
        "t": "1:19:09",
        "title": {
          "ar": "خارطة الطريق والتشتت",
          "en": "The roadmap and avoiding distraction"
        }
      },
      {
        "t": "1:26:01",
        "title": {
          "ar": "من C++ إلى C# والباك اند",
          "en": "From C++ to C# and backend"
        }
      },
      {
        "t": "1:45:19",
        "title": {
          "ar": "سوق الوظائف والذكاء الاصطناعي",
          "en": "The job market and AI"
        }
      },
      {
        "t": "1:52:26",
        "title": {
          "ar": "زيارات سوريا ومصر",
          "en": "Visits to Syria and Egypt"
        }
      },
      {
        "t": "2:04:54",
        "title": {
          "ar": "ثلاث نصائح للنجاح",
          "en": "Three pieces of advice"
        }
      }
    ]
  },
  {
    "n": 3,
    "slug": "iot-and-smart-cities",
    "id": "_467SAsVJqk",
    "title": {
      "ar": "إنترنت الأشياء والمدن الذكية",
      "en": "IoT and Smart Cities"
    },
    "dek": {
      "ar": "من أبحاث إنترنت الأشياء الاجتماعي إلى إدارة الحشود في الحج وفرص العمل والريادة في السعودية",
      "en": "From social IoT research to crowd management at Hajj, and the job and startup outlook in Saudi Arabia"
    },
    "guest": {
      "ar": "الدكتور عبدالله خنفور",
      "en": "Dr. Abdullah Khanfour"
    },
    "cat": "emerging",
    "draft": true,
    "guestBio": {
      "ar": "محاضر وعضو هيئة تدريس في كلية تكنولوجيا المعلومات بجامعة نجران، السعودية.",
      "en": "Lecturer and faculty member, College of Information Technology, Najran University, Saudi Arabia."
    },
    "quotes": [
      {
        "t": "10:28",
        "ar": "عندنا عدد متنامي بشكل كبير لأجهزة الإنترنت، يعني كل سنة وسنة تقريباً الضعف قاعد يدخل على شبكة الإنترنت.",
        "en": "We have a rapidly growing number of internet-connected devices. Roughly every year, double that number is joining the network."
      },
      {
        "t": "55:50",
        "ar": "موضوع الأي أو تي هي عبارة عن منصة، بلاتفورم، تقدر تحط فيها حلول إبداعية. الحلول الإبداعية هذه تحتاج يكون عندك مبرمج فاهم، عارف السنسر، عارف الأكتيوتر، عارف كيف يبني من هذه السنسر والأكتيوتر حلول مميزة.",
        "en": "IoT is a platform where you can put creative solutions. Those solutions need a programmer who understands sensors and actuators and knows how to build distinctive solutions from them."
      },
      {
        "t": "1:16:35",
        "ar": "إذا أنت حابب تدخل في المجال هذا، راح أنصحك في تطبيقات صغيرة على أجهزة صغيرة. أكثر جهاز معروف في تطبيقات الأي أو تي اللي هي الراسبيري باي والأردوينو.",
        "en": "If you want to enter this field, I would advise you to start with small applications on small devices. The best-known devices for IoT applications are the Raspberry Pi and the Arduino."
      }
    ],
    "moreQuotes": [
      {
        "t": "51:25",
        "ar": "الأي أو تي تعطيك ريال تايم فيدباك سريع، يعني التجاوب معه راح يكون أسرع.",
        "en": "IoT gives you real-time feedback, so the response to it will be faster."
      },
      {
        "t": "1:11:15",
        "ar": "التنظيمات تأتي بعد، غالباً في عالم التكنولوجيا أو في السوفتوير أو في الكمبيوتر عموماً، تأتي بعد التطبيق أو بعد انتشارها.",
        "en": "Regulations usually come afterwards in the world of technology, in software and computing in general. They come after adoption, after the technology spreads."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق الدكتور عبدالله خنفور، عضو هيئة التدريس في كلية تكنولوجيا المعلومات بجامعة نجران وحامل دكتوراه في هندسة البرمجيات. يحكي كيف دخل مجال إنترنت الأشياء أثناء الدكتوراه، وكيف جمع بين خلفيته في علوم الحاسب وهندسة النظم والبرمجيات وبين مفاهيم الشبكات والجرافات في بحثه عن إنترنت الأشياء الاجتماعي.\n\nيشرح الضيف المفهوم من الأساس: الحساسات والمحركات (Actuators) والأجهزة المتصلة، وأصل المصطلح، وأمثلة من الحياة اليومية مثل الثرموستات الذكي والساعات الذكية وأجهزة التتبع. ثم ينتقل إلى المدن الذكية، من الكاميرات وإشارات المرور إلى مثال بحثي أثناء كوفيد-19، وتطبيقات إدارة الحشود في موسم الحج، ومستويات نضج أنظمة إنترنت الأشياء.\n\nيتناول النصف الثاني سوق العمل والريادة في السعودية، ومسألة الخصوصية وتنظيم البيانات، ونصائح عملية للبدء بأجهزة مثل Raspberry Pi و Arduino وبروتوكول MQTT. الحلقة مناسبة لطلاب الحاسب والمبرمجين المهتمين بإنترنت الأشياء ولرواد الأعمال في المنطقة.",
      "en": "Tariq hosts Dr. Abdullah Khanfour, a faculty member in the College of Information Technology at Najran University with a PhD in software engineering. He explains how he entered IoT during his doctorate and how he combined his background in computer science and systems and software engineering with network and graph concepts in his research on the Social Internet of Things.\n\nHe explains the field from the ground up: sensors, actuators and connected devices, where the term came from, and everyday examples such as smart thermostats, smartwatches and tracking tags. The conversation then moves to smart cities, from cameras and traffic signals to a COVID-19 research example, crowd management during Hajj, and the maturity levels of an IoT system.\n\nThe second half covers the job market and entrepreneurship in Saudi Arabia, privacy and the regulation of data, and practical advice for getting started with Raspberry Pi, Arduino and the MQTT protocol. It suits computer science students, developers interested in IoT, and founders in the region."
    },
    "takeaways": [
      {
        "ar": "إنترنت الأشياء هو ربط أجهزة بالإنترنت: الحساسات تمثل المدخلات والمحركات (Actuators) تنفذ المخرجات، مثل فتح باب أو تحريك قطعة.",
        "en": "IoT means connecting devices to the internet: sensors provide the inputs and actuators carry out the outputs, such as opening a door or moving a part."
      },
      {
        "ar": "مع تضاعف عدد الأجهزة المتصلة تقريباً كل سنة، تظهر مشاكل ازدحام البيانات والبحث عن الخدمة المناسبة، وهنا يأتي دور مفاهيم الشبكات الاجتماعية وخوارزميات الجرافات مثل أقصر مسار.",
        "en": "As the number of connected devices roughly doubles each year, data congestion and service discovery become problems, which is where social-network concepts and graph algorithms such as shortest path help."
      },
      {
        "ar": "الأجهزة لا تحتاج دائماً اتصالاً مباشراً بالإنترنت: Bluetooth و RFID و LoRa كلها أنماط اتصال تدخل ضمن أنظمة إنترنت الأشياء، كما في خاصية العثور على الجهاز المفقود.",
        "en": "Devices do not always need a direct internet connection: Bluetooth, RFID and LoRa are all connection types used in IoT systems, as in find-my-device features."
      },
      {
        "ar": "قيمة إنترنت الأشياء في إدارة الحشود تأتي من البيانات اللحظية (Real-time)، فالبيانات السابقة تساعد على التخطيط لكن التدخل السريع يحتاج قراءة الوضع الفعلي.",
        "en": "The value of IoT in crowd management comes from real-time data: past data helps planning, but fast intervention needs a reading of the actual situation."
      },
      {
        "ar": "نضج نظام إنترنت الأشياء يمر بمراحل: توفر الأجهزة والاتصال، ثم ربطها، ثم جمع البيانات، ثم اتخاذ قرارات بناءً عليها، وأخيراً التكامل الكامل بحيث تتخذ الأنظمة القرارات بنفسها.",
        "en": "An IoT system matures in stages: devices and connectivity, linking them, collecting data, making decisions from the data, and finally full integration where systems act on their own."
      },
      {
        "ar": "المصانع الصغيرة والمتوسطة تحتاج حلول إنترنت الأشياء لكنها لا تملك الموارد البشرية والمالية للشركات الكبرى، وهذا يفتح مجالاً لمبرمجين يفهمون الحساسات والمحركات.",
        "en": "Small and medium factories need IoT solutions but lack the financial and human resources of large companies, which creates room for developers who understand sensors and actuators."
      },
      {
        "ar": "للبدء في المجال: جرّب أجهزة رخيصة مثل Raspberry Pi و Arduino مع حساسات، وتعرّف على بروتوكول MQTT القائم على Publisher و Subscriber، واستخدم Python وأداة Node-RED.",
        "en": "To get started: experiment with cheap devices such as Raspberry Pi and Arduino with sensors, learn the MQTT protocol built on publisher and subscriber, and use Python and the Node-RED tool."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "تعريف بالضيف والمقدمة",
          "en": "Introducing the guest"
        }
      },
      {
        "t": "1:26",
        "title": {
          "ar": "الخلفية البحثية ودخول المجال",
          "en": "Research background and entry into IoT"
        }
      },
      {
        "t": "4:48",
        "title": {
          "ar": "ما هو إنترنت الأشياء الاجتماعي",
          "en": "What is the Social IoT"
        }
      },
      {
        "t": "10:13",
        "title": {
          "ar": "لماذا نطبق مفاهيم الشبكات",
          "en": "Why apply network concepts"
        }
      },
      {
        "t": "14:56",
        "title": {
          "ar": "أصل مصطلح إنترنت الأشياء",
          "en": "Origin of the term IoT"
        }
      },
      {
        "t": "18:32",
        "title": {
          "ar": "أمثلة من الحياة اليومية",
          "en": "Everyday IoT examples"
        }
      },
      {
        "t": "23:06",
        "title": {
          "ar": "المدن الذكية ومثال كوفيد-19",
          "en": "Smart cities and a COVID-19 example"
        }
      },
      {
        "t": "34:26",
        "title": {
          "ar": "الحج وإدارة الحشود",
          "en": "Hajj and crowd management"
        }
      },
      {
        "t": "45:45",
        "title": {
          "ar": "مستقبل إنترنت الأشياء ومستويات النضج",
          "en": "IoT future and maturity levels"
        }
      },
      {
        "t": "52:01",
        "title": {
          "ar": "سوق العمل في إنترنت الأشياء",
          "en": "The IoT job market"
        }
      },
      {
        "t": "59:34",
        "title": {
          "ar": "الريادة والاستثمار في السعودية",
          "en": "Startups and investment in Saudi Arabia"
        }
      },
      {
        "t": "1:09:11",
        "title": {
          "ar": "الخصوصية وتنظيم البيانات",
          "en": "Privacy and regulation"
        }
      },
      {
        "t": "1:16:18",
        "title": {
          "ar": "نصائح لبدء التعلم",
          "en": "Advice for getting started"
        }
      }
    ]
  },
  {
    "n": 2,
    "slug": "invoiceq-idea-to-company",
    "id": "QW-4EDd7CBA",
    "title": {
      "ar": "من فكرة إلى InvoiceQ",
      "en": "From an Idea to InvoiceQ"
    },
    "dek": {
      "ar": "مؤسسا InvoiceQ يحكيان كيف تحولت فكرة الفوترة الإلكترونية إلى شركة تعمل في عدة دول",
      "en": "InvoiceQ's co-founders on turning an e-invoicing idea into a company operating across several countries"
    },
    "guest": {
      "ar": "فادي الجبالي ومهند طوبال",
      "en": "Fadi Al-Jabali and Muhannad Toubal"
    },
    "cat": "startups",
    "draft": true,
    "multiGuest": true,
    "guestBio": {
      "ar": "فادي الجبالي: أحد المؤسسين الأربعة لشركة InvoiceQ. مهند طوبال: أحد المؤسسين الأربعة لشركة InvoiceQ (يتولى الجانب التجاري، خلفيته في المالية).",
      "en": "Fadi Al-Jabali: One of the four co-founders of InvoiceQ. Muhannad Toubal: One of the four co-founders of InvoiceQ (business side, finance background)."
    },
    "quotes": [
      {
        "t": "0:41:55",
        "ar": "إذا كنا حاطين دائماً عنا بلان بي، كنا رح نختار الطريق الأسهل. كنا أول ما نوقع بمطب رح نستسلم ونرجع لشغلنا ونقول خلص ما بدنا نكمل.",
        "en": "If we always had a Plan B, we would have chosen the easier path. The first time we hit a bump, we would have given up, gone back to our jobs and said that's it, we don't want to continue."
      },
      {
        "t": "0:50:10",
        "ar": "احنا كنا نبيع قصة، ما كنا نبيع برودكت. ما كان في شي بين إيدينا نفرجي الناس إياه، بس كنا نبيع القصة اللي بلشنا فيها والقصة اللي رح تكمل.",
        "en": "We were selling a story, not a product. We had nothing in our hands to show people, but we were selling the story we started with and the story that would continue."
      },
      {
        "t": "1:00:42",
        "ar": "تعدد الفاوندرز مهم جداً عشان تقدر تكمل. السينجل فاوندرز كثير صعب، ما بتخيل يقدر يمشي.",
        "en": "Having multiple founders is very important in order to keep going. Single founders have it very hard; I can't imagine it working."
      }
    ],
    "moreQuotes": [
      {
        "t": "1:10:30",
        "ar": "فوكس، فوكس، فوكس. اوعك تفقد التركيز، اوعك تغير الشي اللي أنت مبلش فيه، اوعك تنجر ورا الأشياء اللي ممكن تجيك بالطريق.",
        "en": "Focus, focus, focus. Don't lose your focus, don't change what you started, don't get dragged after the things that may come your way."
      },
      {
        "t": "1:11:09",
        "ar": "النفس الطويل هو سبب النجاح. كل ما صبرت أكثر كل ما وصلت لنجاحك أكثر.",
        "en": "Staying power is the reason for success. The more patient you are, the closer you get to your success."
      }
    ],
    "summary": {
      "ar": "في هذه الحلقة يستضيف طارق فادي الجبالي ومهند طوبال، اثنين من المؤسسين الأربعة لشركة InvoiceQ التي تقدم حلولاً للفوترة الإلكترونية في المنطقة. يبدأ الحديث بالتعريف بالشركة وكيف خرجت الفكرة من العمل في مجال المدفوعات، ثم يشرح الضيفان معنى الفاتورة الإلكترونية كبيانات منظمة، ولماذا فرضت الجهات الضريبية في السعودية والأردن وغيرها التحول إليها.\n\nبعد ذلك ينتقل النقاش إلى الجانب العملي: بوابة (Portal) للشركات الصغيرة والمتوسطة، وربط عبر APIs مع أنظمة ERP للشركات الكبيرة، والتقنيات المستخدمة والاستضافة السحابية، وتوظيف الخريجين الجدد في شركة ناشئة. ويتوقف الحديث طويلاً عند بداية الشركة: برنامج زين المبادرة، والتمويل الأولي من أهلي فينتك، وشرط الاستقالة من الوظائف، والتحدي المتمثل في إقناع أول 12 عميلاً بدفع دفعة مقدمة لمنتج لم يُبنَ بعد.\n\nتنتهي الحلقة بالحديث عن توزيع الأدوار بين المؤسسين وإدارة الخلافات، ثم التوسع في أسواق جديدة، ونصائح لرواد الأعمال. الحلقة مفيدة لمن يفكر بتحويل فكرة إلى شركة، ولمن يريد فهم كيف يُختبر المنتج مع السوق قبل بنائه.",
      "en": "In this episode Tariq hosts Fadi Al-Jabali and Muhannad Toubal, two of the four co-founders of InvoiceQ, a company providing e-invoicing solutions in the region. The conversation starts with the company and how the idea emerged from working in payments, then the guests explain what an electronic invoice is (structured data rather than a PDF) and why tax authorities in Saudi Arabia, Jordan and elsewhere made the move mandatory.\n\nThe discussion then turns practical: a portal for small and medium businesses, API integration with ERP systems for larger companies, the technology stack and cloud hosting, and hiring fresh graduates at a startup. A long stretch covers the company's beginnings: the Zain Al-Mubadara programme, initial funding from Ahli Fintech, the requirement to resign from their jobs, and the challenge of convincing the first 12 customers to pay an advance for a product that did not yet exist.\n\nThe episode closes with how the four founders divided roles and handled disagreements, expansion into new markets, and advice for entrepreneurs. It is useful for anyone turning an idea into a company and for those who want to see how a product is validated with the market before it is built."
    },
    "takeaways": [
      {
        "ar": "الفاتورة الإلكترونية هي بيانات منظمة وليست صورة أو ملف PDF، وهذا ما يسمح للجهات الضريبية بالتحكم فيها ورصد أي احتيال.",
        "en": "An e-invoice is structured data, not an image or PDF, which is what lets tax authorities control invoicing and detect fraud."
      },
      {
        "ar": "قبل بناء المنتج، انزل إلى السوق واسمع من العملاء المحتملين ما هي مشكلتهم الفعلية، وابنِ المنتج بناءً على ملاحظاتهم لتوفر الوقت والمال.",
        "en": "Before building the product, go to the market and ask potential customers about their actual problem, and build from their feedback to save time and money."
      },
      {
        "ar": "في مرحلة الفكرة، ابدأ مع الأشخاص المؤمنين بها والمتحمسين للتغيير؛ هم من يشترون القصة قبل أن يوجد المنتج.",
        "en": "At the idea stage, start with people who believe in it and are open to change; they buy the story before the product exists."
      },
      {
        "ar": "شرط الاستقالة من الوظائف الذي وضعه الممول أزال خيار \"الخطة ب\"، وجعل المؤسسين يستمرون عند أول عقبة.",
        "en": "The funder's condition to resign from their jobs removed any \"Plan B\" and kept the founders going when they hit the first obstacle."
      },
      {
        "ar": "للبيع قبل وجود المنتج استخدم الملف الشخصي للمؤسسين، وضمان استرداد المال إذا لم يُسلَّم المنتج في الموعد، ووجود مستثمر معروف.",
        "en": "To sell before a product exists, they relied on the founders' profiles, a refund promise if delivery was late, and a known investor backing them."
      },
      {
        "ar": "تنوع خلفيات المؤسسين (تقنية وتجارية ومالية) وتعدد المؤسسين كان أساسياً للاستمرار؛ المؤسس الواحد صعب جداً.",
        "en": "A mix of technical, business and finance backgrounds, and having several founders, was essential to keep going; a solo founder faces a very hard road."
      },
      {
        "ar": "التركيز وعدم الانجرار وراء مشاريع جانبية مغرية، والصبر وسماع السوق، هي من أهم نصائحهم لرواد الأعمال.",
        "en": "Their key advice for entrepreneurs: stay focused, avoid tempting side projects, listen to the market and be patient."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "مقدمة وتعريف بالضيفين",
          "en": "Introduction to the guests"
        }
      },
      {
        "t": "3:00",
        "title": {
          "ar": "كيف بدأت فكرة InvoiceQ",
          "en": "How InvoiceQ started"
        }
      },
      {
        "t": "12:23",
        "title": {
          "ar": "ما الفاتورة الإلكترونية فعلاً",
          "en": "What an e-invoice really is"
        }
      },
      {
        "t": "14:55",
        "title": {
          "ar": "البوابة وربط أنظمة ERP",
          "en": "The portal and ERP integration"
        }
      },
      {
        "t": "21:28",
        "title": {
          "ar": "العملاء وحجم السوق",
          "en": "Customers and market size"
        }
      },
      {
        "t": "25:12",
        "title": {
          "ar": "التقنيات المستخدمة والاستضافة",
          "en": "Tech stack and hosting"
        }
      },
      {
        "t": "30:51",
        "title": {
          "ar": "توظيف الخريجين الجدد",
          "en": "Hiring fresh graduates"
        }
      },
      {
        "t": "34:18",
        "title": {
          "ar": "زين المبادرة وأهلي فينتك",
          "en": "Zain Al-Mubadara and Ahli Fintech"
        }
      },
      {
        "t": "40:46",
        "title": {
          "ar": "شرط الاستقالة من الوظائف",
          "en": "The condition to resign"
        }
      },
      {
        "t": "48:10",
        "title": {
          "ar": "إقناع أول 12 عميلا��",
          "en": "Convincing the first 12 customers"
        }
      },
      {
        "t": "54:08",
        "title": {
          "ar": "بناء أول نسخة من المنتج",
          "en": "Building the first version"
        }
      },
      {
        "t": "59:35",
        "title": {
          "ar": "أهمية تعدد المؤسسين",
          "en": "Why multiple founders matter"
        }
      },
      {
        "t": "1:07:03",
        "title": {
          "ar": "العملاء والتوسع في الأسواق",
          "en": "Clients and market expansion"
        }
      },
      {
        "t": "1:08:42",
        "title": {
          "ar": "نصائح لرواد الأعمال",
          "en": "Advice for entrepreneurs"
        }
      }
    ]
  },
  {
    "n": 1,
    "slug": "cybersecurity-in-the-arab-world",
    "id": "a_p75ghXBFQ",
    "title": {
      "ar": "واقع الأمن السيبراني في الوطن العربي",
      "en": "Cybersecurity in the Arab World"
    },
    "dek": {
      "ar": "أيمن حمودة يتحدث عن سوق الأمن السيبراني العربي، والشهادات، والمهارات، وكيف يبدأ الطالب في هذا المجال.",
      "en": "Ayman Hammoudeh on the Arab cybersecurity job market, certifications, skills, and how newcomers can get started."
    },
    "guest": {
      "ar": "أيمن حمودة",
      "en": "Ayman Hammoudeh"
    },
    "cat": "emerging",
    "draft": true,
    "guestBio": {
      "ar": "خبير في الأمن السيبراني في الشرق الأوسط، يعمل مع IBM بمنصب Field CISO.",
      "en": "Cybersecurity expert in the Middle East, working at IBM as a Field CISO."
    },
    "quotes": [
      {
        "t": "19:30",
        "ar": "النصيحة اللي دائما بوجهها للجميع إنه تكون بدايتك من نقطة القوة اللي إنت عندك إياها.",
        "en": "The advice I always give everyone is to start from the point of strength you already have."
      },
      {
        "t": "41:05",
        "ar": "الشهادة محدودة، بتعطيك بس زي بوينترز أو توجيهات، بس إنت لازم تروح تعمل الجهد الفعلي، لازم تروح تقرا وتزيد المعلومات تاعتك.",
        "en": "A certificate is limited; it only gives you something like pointers or guidance, but you have to put in the actual effort: go and read and build up your knowledge."
      },
      {
        "t": "53:05",
        "ar": "فإنت كطالب أو كطالبة لا تخلي عائق قدامك إنه إما بشتغل سايبر سكيورتي من أول يوم أو ما بشتغل.",
        "en": "As a student, don't set yourself the obstacle of either working in cybersecurity from day one or not working in it at all."
      }
    ],
    "moreQuotes": [
      {
        "t": "38:22",
        "ar": "أنا اليوم كاسم، أوكي، هو مؤشر، بس أنا لازم أتأكد إنه هذا الشخص عنده هاي المعلومات.",
        "en": "As a name on a CV, okay, it is an indicator, but I still have to make sure this person actually has that knowledge."
      },
      {
        "t": "1:14:01",
        "ar": "بتستغرب إنه بجينا كثير ناس على البوث، خريجين جامعات، بيجي معه السي في تبعه وبنشوف شو السكيلز اللي عنده.",
        "en": "You'd be surprised how many people come to our booth, university graduates, with their CV in hand, and we look at what skills they have."
      }
    ],
    "summary": {
      "ar": "يستضيف طارق زميله السابق أيمن حمودة، الخبير في الأمن السيبراني الذي يعمل مع IBM من دبي، لتفكيك الصورة النمطية عن هذا المجال ومناقشة واقعه في المنطقة العربية. يبدأ الحديث بالفرق بين الجانب الهجومي والدفاعي، ثم ينتقل إلى مسيرة أيمن من مبرمج Java إلى Application Security ثم إلى دور Field CISO.\n\nيتناول الجزء الأوسط الطلب على الوظائف ونقص الكفاءات، ودور الجامعات، ونصائح عملية للبدء: البدء من نقطة القوة، وشهادة Security+ كخطوة أولى، وحدود الشهادات وحدها، وهل الشهادة الجامعية شرط في الشركات العربية، وكيف يستفيد خريجو تخصصات تقنية أخرى من خبرة سابقة في الشبكات أو التطوير للانتقال إلى الأمن.\n\nويختم بالمهارات التي تميّز المحترف: متابعة آخر الهجمات والتقنيات، وتجديد الشهادات، والانضمام إلى المجتمعات المحلية، وحضور مسابقات CTF والمؤتمرات، وإتقان الأدوات الأساسية، ومهارة الإصغاء لحاجة العميل. الحلقة مفيدة لطلاب الحاسوب والخريجين الجدد ولكل من يفكر بالانتقال إلى الأمن السيبراني.",
      "en": "Tariq hosts his former colleague Ayman Hammoudeh, a cybersecurity expert working with IBM from Dubai, to challenge the stereotype of the field and discuss its reality in the Arab world. The conversation starts with the difference between offensive and defensive security, then follows Ayman's path from Java developer to Application Security and then to a Field CISO role.\n\nThe middle part covers job demand and the skills shortage, the role of universities, and practical advice for getting started: begin from your strongest area, take Security+ as a first certification, understand the limits of certificates on their own, whether a university degree is required by Arab employers, and how graduates from other IT backgrounds can use prior network or development experience to move into security.\n\nIt closes with what sets strong professionals apart: following the latest attacks and technologies, renewing certifications, joining local communities, taking part in CTFs and conferences, mastering the standard tools, and listening to what the client actually needs. It is useful for computer science students, new graduates, and anyone considering a move into cybersecurity."
    },
    "takeaways": [
      {
        "ar": "الأمن السيبراني ليس فقط المخترق بالقبعة السوداء؛ هناك الجانب الدفاعي (White Hats) وهو الذي يعاني من نقص كبير في الكفاءات عالميا.",
        "en": "Cybersecurity is not just the black-hat hacker; the defensive side (White Hats) is where the large global skills shortage is."
      },
      {
        "ar": "ابدأ دخولك للمجال من نقطة قوتك. أيمن انتقل من Java إلى Application Security لأنه كان يعرف كيف تعمل التطبيقات.",
        "en": "Enter the field from your point of strength. Ayman moved from Java development into Application Security because he already understood how applications work."
      },
      {
        "ar": "Security+ نقطة انطلاق مناسبة لأنها أقل تكلفة وتعطي صورة عامة عن الشبكات والتطبيقات والسيرفرات، فتساعدك على اختيار تخصصك.",
        "en": "Security+ is a sensible starting point: it costs less and gives a broad view of networks, applications and servers, helping you pick a specialization."
      },
      {
        "ar": "الشهادة تفتح باب المقابلة عبر الكلمات المفتاحية في أنظمة الفرز الآلي للسير الذاتية، لكنها لا تغني عن المعرفة الفعلية؛ ومن يذكر شهادة يُسأل أسئلة أعمق.",
        "en": "A certificate helps your CV pass keyword-based automated screening, but it does not replace real knowledge; candidates who list one get asked deeper questions."
      },
      {
        "ar": "في الشركات العربية الشهادة الجامعية متطلب رئيسي، لكن خريجي تخصصات تقنية أخرى لديهم فرصة عالية، وكثير من الشركات صارت تدرّب خريجين جددا على المجال.",
        "en": "Arab employers treat a university degree as a main requirement, but graduates in other technical fields have good chances, and many companies now train fresh graduates in security themselves."
      },
      {
        "ar": "لا تشترط على نفسك العمل في الأمن من اليوم الأول؛ سنتان في الشبكات مثلا تعطيك أفضلية للانتقال لاحقا إلى محلل في SOC.",
        "en": "You don't have to work in security from day one; two years in networking, for example, gives you an edge for a later move to a SOC analyst role."
      },
      {
        "ar": "تابع المجتمعات المحلية وفعاليات CTF والمؤتمرات، واقرأ إعلانات الوظائف لمعرفة ما يطلبه السوق حتى لو لم تتقدم لها.",
        "en": "Join local communities, CTFs and conferences, and read job postings to see what the market wants even if you are not applying."
      }
    ],
    "chapters": [
      {
        "t": "0:00",
        "title": {
          "ar": "تقديم الضيف أيمن حمودة",
          "en": "Introducing Ayman Hammoudeh"
        }
      },
      {
        "t": "1:46",
        "title": {
          "ar": "الصورة النمطية للأمن السيبراني",
          "en": "The cybersecurity stereotype"
        }
      },
      {
        "t": "4:44",
        "title": {
          "ar": "عمل أيمن مع IBM ودور Field CISO",
          "en": "Ayman's role at IBM"
        }
      },
      {
        "t": "10:09",
        "title": {
          "ar": "من مبرمج Java إلى Application Security",
          "en": "From Java to Application Security"
        }
      },
      {
        "t": "15:15",
        "title": {
          "ar": "وعي الشركات العربية والمتطلبات التنظيمية",
          "en": "Arab market awareness and regulation"
        }
      },
      {
        "t": "24:08",
        "title": {
          "ar": "الطلب على الوظائف ونقص الكفاءات",
          "en": "Job demand and the skills gap"
        }
      },
      {
        "t": "27:32",
        "title": {
          "ar": "أي الشهادات تبدأ بها؟",
          "en": "Which certifications to start with"
        }
      },
      {
        "t": "32:03",
        "title": {
          "ar": "المسارات بعد Security+",
          "en": "Paths after Security+"
        }
      },
      {
        "t": "38:58",
        "title": {
          "ar": "الشهادات مقابل المعرفة الفعلية",
          "en": "Certificates versus real knowledge"
        }
      },
      {
        "t": "43:41",
        "title": {
          "ar": "هل الشهادة الجامعية ضرورية؟",
          "en": "Is a university degree necessary?"
        }
      },
      {
        "t": "53:37",
        "title": {
          "ar": "المهارات: المتابعة والشهادات والمجتمعات",
          "en": "Skills: staying current and communities"
        }
      },
      {
        "t": "1:01:34",
        "title": {
          "ar": "سوق العمل ومسابقات CTF",
          "en": "Job market and CTFs"
        }
      },
      {
        "t": "1:06:51",
        "title": {
          "ar": "المؤتمرات والفعاليات في المنطقة",
          "en": "Regional conferences and events"
        }
      },
      {
        "t": "1:15:34",
        "title": {
          "ar": "المهارات التي تميّز المحترف والأدوات",
          "en": "What sets professionals apart, and tools"
        }
      }
    ]
  }
];
