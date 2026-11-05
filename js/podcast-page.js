// Podcast hub: nav, language toggle, episode grid, filters, video modal, structured data.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const lang = () => document.documentElement.getAttribute("lang") || "en";

  const T = {
    search: { en: "Search by title or guest…", ar: "ابحث بالعنوان أو اسم الضيف…" },
    with: { en: "with", ar: "مع" },
    ep: { en: "Episode", ar: "الحلقة" },
    play: { en: "Play episode", ar: "شغّل الحلقة" },
    all: { en: "All", ar: "الكل" },
    more: { en: "Read more →", ar: "اقرأ التفاصيل ←" },
  };
  const t = (k) => T[k][lang()] || T[k].en;
  const loc = (v) => L(v, lang());

  // ── Nav ──
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.toggleNav = function () {
    $(".nav-links").classList.toggle("open");
    $("#nav-hamburger").classList.toggle("open");
  };
  document.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => {
      if (a.classList.contains("nav-dropdown-toggle")) return;
      $(".nav-links").classList.remove("open");
      $("#nav-hamburger").classList.remove("open");
    }),
  );
  document.querySelectorAll(".nav-dropdown-toggle").forEach((toggle) =>
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggle.closest(".nav-dropdown").classList.toggle("open");
    }),
  );

  // ── Language (same behaviour and storage key as the home page) ──
  window.setLang = function (l) {
    const html = document.documentElement;
    html.setAttribute("lang", l);
    html.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
    $("#btn-en").classList.toggle("active", l === "en");
    $("#btn-ar").classList.toggle("active", l === "ar");
    document.querySelectorAll("[data-en]").forEach((el) => {
      const v = el.getAttribute("data-" + l);
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-ar]").forEach((el) => {
      if (l === "ar") el.setAttribute("lang", "ar");
      else el.removeAttribute("lang");
    });
    $("#pc-search").placeholder = t("search");
    renderChips();
    render();
    if (modal.classList.contains("open")) $("#pc-modal-title").textContent = loc(current.title);
    localStorage.setItem("lang", l);
  };

  // ── Data ──
  const eps = EPISODES.slice().sort((a, b) => b.n - a.n);
  let activeCat = "all";
  let query = "";
  let current = null;

  const published = (e) => Boolean(e.slug && e.summary && e.summary.ar && e.summary.en && !e.draft);
  const thumb = (e) => `https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`;
  const watchUrl = (e) => `https://www.youtube.com/watch?v=${e.id}`;
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  function thumbButton(e) {
    const b = el("button", "pc-thumb");
    b.type = "button";
    b.setAttribute("aria-label", `${t("play")}: ${loc(e.title)}`);
    const img = el("img");
    img.src = thumb(e);
    img.alt = `${loc(e.title)} — ${loc(e.guest)}`;
    img.loading = "lazy";
    img.width = 480;
    img.height = 360;
    b.append(img, el("span", "pc-play"), el("span", "pc-ep-num", `${t("ep")} ${e.n}`));
    b.addEventListener("click", () => openModal(e));
    return b;
  }

  // Card title doubles as a link to the shareable episode page.
  function titleEl(e) {
    const h = el("h3", "pc-card-title");
    if (!e.slug) return (h.textContent = loc(e.title)), h;
    const a = el("a", null, loc(e.title));
    a.href = `./${e.slug}/`;
    h.append(a);
    return h;
  }

  function guestLine(e, cls) {
    const p = el("p", cls);
    p.append(t("with") + " ", el("strong", null, loc(e.guest)));
    return p;
  }

  function renderChips() {
    const wrap = $("#pc-chips");
    wrap.replaceChildren();
    const used = Object.keys(CATEGORIES).filter((k) => eps.some((e) => e.cat === k));
    [["all", T.all], ...used.map((k) => [k, CATEGORIES[k]])].forEach(([key, label]) => {
      const b = el("button", "pc-chip" + (key === activeCat ? " active" : ""), label[lang()] || label.en);
      b.type = "button";
      b.setAttribute("aria-pressed", key === activeCat);
      b.addEventListener("click", () => {
        activeCat = key;
        renderChips();
        render();
      });
      wrap.append(b);
    });
  }

  // Search matches text in either language so Arabic and English queries both work.
  const haystack = (e) =>
    [e.title, e.guest, e.summary].map((v) => (v ? `${L(v, "ar")} ${L(v, "en")}` : "")).join(" ").toLowerCase();

  function render() {
    const grid = $("#pc-grid");
    grid.replaceChildren();
    const q = query.trim().toLowerCase();
    const list = eps.filter((e) => (activeCat === "all" || e.cat === activeCat) && (!q || haystack(e).includes(q)));
    list.forEach((e) => {
      const card = el("article", "pc-card");
      const body = el("div", "pc-card-body");
      const cat = CATEGORIES[e.cat];
      body.append(el("span", "pc-card-cat", cat ? cat[lang()] : ""), titleEl(e));
      body.append(guestLine(e, "pc-card-guest"));
      if (e.dek) body.append(el("p", "pc-card-summary", loc(e.dek)));
      if (e.slug) {
        const more = el("a", "pc-card-more", t("more"));
        more.href = `./${e.slug}/`;
        body.append(more);
      }
      card.append(thumbButton(e), body);
      grid.append(card);
    });
    $("#pc-empty").style.display = list.length ? "none" : "block";
  }

  // ── Modal ──
  const modal = $("#pc-modal");
  let lastFocus = null;
  function openModal(e) {
    lastFocus = document.activeElement;
    current = e;
    $("#pc-modal-title").textContent = loc(e.title);
    $("#pc-modal-yt").href = watchUrl(e);
    const f = el("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${e.id}?autoplay=1&rel=0`;
    f.title = loc(e.title);
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    $("#pc-modal-frame").replaceChildren(f);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#pc-modal-close").focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    $("#pc-modal-frame").replaceChildren();
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("#pc-modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) closeModal();
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  $("#pc-search").addEventListener("input", (ev) => {
    query = ev.target.value;
    render();
  });

  // ── Structured data (generated from the same episode list) ──
  const ld = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: SHOW.name.ar,
    alternateName: SHOW.name.en,
    url: SHOW.url,
    inLanguage: "ar",
    image: "https://tariqlabs.com/images/podcast-logo.png",
    description:
      "بودكاست عربي يستضيف فيه طارق العوزة خبراء ومهندسين وصنّاعاً عرباً للحديث عن مسيراتهم في التقنية والذكاء الاصطناعي وهندسة البرمجيات. An Arabic tech podcast where Tariq Elouzeh talks with Arab engineers and builders about careers, AI and software engineering.",
    author: { "@type": "Person", name: "Tariq Elouzeh", url: "https://tariqlabs.com/" },
    sameAs: [SHOW.youtubePlaylist, "https://podcast.tariqlabs.com/"],
    episode: eps.map((e) => ({
      "@type": "PodcastEpisode",
      episodeNumber: e.n,
      name: e.title.ar,
      alternateName: e.title.en,
      url: published(e) ? `${SHOW.url}${e.slug}/` : watchUrl(e),
      inLanguage: "ar",
      thumbnailUrl: thumb(e),
      actor: { "@type": "Person", name: e.guest.ar, alternateName: e.guest.en },
      partOfSeries: { "@type": "PodcastSeries", name: SHOW.name.ar, url: SHOW.url },
    })),
  };
  const s = el("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.append(s);

  // ── Init ──
  $("#pc-search").placeholder = t("search");
  renderChips();
  render();
  const saved = localStorage.getItem("lang") || "en";
  if (saved !== "en") setLang(saved);
})();
