// Nav scroll
window.addEventListener("scroll", () => {
  document
    .getElementById("nav")
    .classList.toggle("scrolled", window.scrollY > 40);
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Language switch

function ytTab(btn, panelId) {
  // Update tab active state
  btn
    .closest(".yt-tabs")
    .querySelectorAll(".yt-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  // Show correct panel
  document
    .querySelectorAll(".yt-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(panelId).classList.add("active");
}

function setLang(lang) {
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Toggle active button
  document.getElementById("btn-en").classList.toggle("active", lang === "en");
  document.getElementById("btn-ar").classList.toggle("active", lang === "ar");

  // Swap all [data-en] / [data-ar] text nodes
  document.querySelectorAll("[data-en]").forEach((el) => {
    const val = el.getAttribute("data-" + lang);
    if (val) el.textContent = val;
  });

  // Safari fix: set lang="ar" on each element so Arabic letters join correctly
  document.querySelectorAll("[data-ar]").forEach((el) => {
    if (lang === "ar") {
      el.setAttribute("lang", "ar");
    } else {
      el.removeAttribute("lang");
    }
  });

  // Store preference
  localStorage.setItem("lang", lang);
}

// Load saved preference (default: en)
const saved = localStorage.getItem("lang") || "en";
if (saved !== "en") setLang(saved);

// ─── TESTIMONIALS DATA ───────────────────────────────────────────
// To add/edit a testimonial, just add/change an object in the array.
// initials: 2-letter string shown in the avatar circle
// name:     full name of the reviewer
// date:     e.g. "Jan 2025"
// stars:    number 1–5
// source:   "youtube" | "udemy"
// text:     the review text
// row:      1 (top row, scrolls left) or 2 (bottom row, scrolls right)
const TESTIMONIALS = [
  // ── ROW 1 ──
  {
    initials: "ASH",
    name: "Ahmed Soliman",
    date: "Jan 2026",
    stars: 5,
    source: "youtube",
    row: 1,
    text: "ما شاء الله علي حضرتك بجد أنا بتعلم منك كتير وانا النهاردة دخلت عام ال 20 ليا وبستفاد من تجارب ونصائح حضرتك وكل عام وحضرتك بخير ",
  },
  {
    initials: "MF",
    name: "Mohamed Fathy",
    date: "Dec 2023",
    stars: 5,
    source: "udemy",
    row: 1,
    text: "لن ابالغ اذا قلت انه كورس اكثر من رائع this course is really amazing",
  },
  {
    initials: "IB",
    name: "Ibrahim",
    date: "Jan 2026",
    stars: 5,
    source: "youtube",
    row: 1,
    text: "استاذنا طارق طريقة شرحك ولا اروع شكرا جزيلا على هذا الشرح السلس البسيط , بتمنالك كل التوفيق بحياتك المهنية",
  },
  {
    initials: "YA",
    name: "Yasser",
    date: "Oct 2022",
    stars: 5,
    source: "udemy",
    row: 1,
    text: "دائما كانت الجافا سكريبت هي الجحيم بالنسبة لي، لكن مع هذا الكورس والله بكل صدق كنت اتابع المهندس طارق وكأنه يشرح لي الأبجدية العربية، منتهي الإحتراف ما شاء الله،، كل التوفيق لك.",
  },
  {
    initials: "AB",
    name: "Abdulghani",
    date: "Nov 2025",
    stars: 5,
    source: "youtube",
    row: 1,
    text: "جزاك الله كل خير أستاذ طارق على كل ما تقدمه من خبرة لنا و على برنامج بودكاست تقني الذي يعطينا خبرة كبيرة بالحياة",
  },
  {
    initials: "OM",
    name: "Omar",
    date: "Aug 2021",
    stars: 5,
    source: "udemy",
    row: 1,
    text: "افضل واقوى دورة وعن تجربة في اساسيات الجافا سكريبت ، المحاضر رائع وشرحه علمي ومتدرج ومفهوم وصراحة انصح بالدورة للجميع ، وبالتوفيق للمحاضر واتمنى المزيد من الكورسات بنفس المستوى",
  },

  // ── ROW 2 ──
  {
    initials: "YE",
    name: "Youssef Elzedy",
    date: "Sep 2025",
    stars: 5,
    source: "youtube",
    row: 2,
    text: "الواحد بجد فخور ان في اشخاص زي حضرتك بجد في المجتمع العربي ، بجد جزاك الله خير و إن شاء الله في ميزان حسناتك ❤",
  },
  {
    initials: "MA",
    name: "Mahmoud Ashraf",
    date: "Jun 2023",
    stars: 5,
    source: "udemy",
    row: 2,
    text: "I have not written code for a long time. Your project really helped me a lot to back into code again",
  },
  {
    initials: "JM",
    name: "Jamal Mohafil",
    date: "May 2025",
    stars: 5,
    source: "youtube",
    row: 2,
    text: "مقابلة فوق الرائعة والخبرات والمعلومات الي تم مناقشتها رائعة جدا جدا , الله يعطيكم العافية على هالبودكاست المفيد",
  },
  {
    initials: "AH",
    name: "Ahmed",
    date: "Apr 2022",
    stars: 5,
    source: "udemy",
    row: 2,
    text: "دورة رائعة ومذهلة! اقسم بالله هذه الدورة كانت يجب ان تكون مدفوعة وليست مجانية! كمية المعلومات رهيبة جدا واسلوب الشرح جميل جدا والصوت صافي وواضح جدا، شكرا لك وجعله الله في ميزان حسناتك",
  },
  {
    initials: "MS",
    name: "Mohammad Sallal",
    date: "Mar 2025",
    stars: 5,
    source: "youtube",
    row: 2,
    text: "جزاك الله خيراً مهندسنا طارق،جد شرح جميل و بفتح الأفق لأفكار كتير.",
  },
  {
    initials: "MA",
    name: "Mohammed ALJabouri",
    date: "July 2025",
    stars: 5,
    source: "youtube",
    row: 2,
    text: "هدوئك بالشرح لو انك تشرح  ميكانيكا الكم والنووي راح نفهم من اول مرة ههههه   نريد تحل بروبلم سولفنك بلغة بايثون ياريت يا استاذ",
  },
];
// ─────────────────────────────────────────────────────────────────

const TST_SOURCE_LOGOS = {
  youtube: { src: "logos/yt.png", alt: "YouTube", cls: "tst-source-invert" },
  udemy: { src: "logos/udemy.png", alt: "Udemy", cls: "tst-source-invert" },
};

(function () {
  function buildCard(t) {
    const stars = "★".repeat(t.stars) + "☆".repeat(5 - t.stars);
    const logo = TST_SOURCE_LOGOS[t.source];
    const logoHtml = logo
      ? '<img src="' +
        logo.src +
        '" alt="' +
        logo.alt +
        '" class="tst-source-logo ' +
        logo.cls +
        '">'
      : "";
    const card = document.createElement("div");
    card.className = "tst-card";
    card.innerHTML =
      '<div class="tst-top">' +
      '<div class="tst-avatar">' +
      t.initials +
      "</div>" +
      '<div class="tst-meta">' +
      '<div class="tst-name">' +
      t.name +
      "</div>" +
      '<div class="tst-date">' +
      t.date +
      "</div>" +
      "</div>" +
      '<div class="tst-source-logo-wrap">' +
      logoHtml +
      "</div>" +
      "</div>" +
      '<div class="tst-stars">' +
      stars +
      "</div>" +
      '<p class="tst-text">\u201c' +
      t.text +
      "\u201d</p>";
    return card;
  }

  function populateTrack(trackId, row) {
    const track = document.getElementById(trackId);
    if (!track) return;
    TESTIMONIALS.filter((t) => t.row === row).forEach((t) =>
      track.appendChild(buildCard(t)),
    );
  }

  populateTrack("tst-track-1", 1);
  populateTrack("tst-track-2", 2);

  function initTstTrack(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const origCards = Array.from(track.children);
    origCards.forEach((card) => track.appendChild(card.cloneNode(true)));

    const speed = 0.4;
    let paused = false;
    let loopWidth = 0;
    let offset = 0;

    function measure() {
      let w = 0;
      for (let i = 0; i < origCards.length; i++) {
        w += track.children[i].offsetWidth + 16;
      }
      loopWidth = w;
      if (direction === -1) offset = loopWidth;
    }

    window.addEventListener("load", measure);
    setTimeout(measure, 600);

    track.closest(".tst-slider").addEventListener("mouseenter", () => { paused = true; });
    track.closest(".tst-slider").addEventListener("mouseleave", () => { paused = false; });

    function tick() {
      if (!paused && loopWidth > 0) {
        offset += speed * direction;
        if (offset >= loopWidth) offset -= loopWidth;
        if (offset < 0) offset += loopWidth;
        track.style.transform = "translateX(-" + offset + "px)";
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  initTstTrack("tst-track-1", 1);
  initTstTrack("tst-track-2", -1);
})();
