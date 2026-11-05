#!/usr/bin/env node
// Generates static episode pages (podcast/<slug>/index.html) and sitemap.xml
// from js/podcast-data.js.   Usage:  node scripts/build-podcast.js
// An episode page is "published" only if it has a slug AND a summary in BOTH languages.
// Unpublished episodes still get a page (handy for previewing) but it is
// marked noindex and left out of the sitemap.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const SITE = "https://tariqlabs.com";
const src = fs.readFileSync(path.join(root, "js/podcast-data.js"), "utf8");
const { SHOW, CATEGORIES, EPISODES, L } = vm.runInNewContext(
  src + "\n({ SHOW, CATEGORIES, EPISODES, L })",
);

// Typography guard: Arabic "و" must be followed by a space before a Latin word ("و ICPC", not "وICPC").
{
  const glued = JSON.stringify(EPISODES).match(/(?<![\u0600-\u06FF\w])و(?=[A-Za-z])|(?<=[،؛؟:()"“«])و(?=[A-Za-z])/g);
  if (glued) console.warn(`WARNING: ${glued.length} place(s) in js/podcast-data.js have "و" glued to a Latin word — add a space.`);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const LANGS = ["en", "ar"];
const both = (v) => v && v.ar && v.en;
const isPublished = (e) => Boolean(e.slug && both(e.summary) && !e.draft);
const secs = (t) => t.split(":").reverse().reduce((a, v, i) => a + Number(v) * 60 ** i, 0);
const watch = (e, t) => `https://www.youtube.com/watch?v=${e.id}${t ? "&t=" + secs(t) + "s" : ""}`;
const pageUrl = (e) => `${SITE}/podcast/${e.slug}/`;
const snippet = (s, n = 155) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const list = (items, fn) => items.map(fn).join("\n");

const UI = {
  quotes: { en: "Memorable quotes", ar: "اقتباسات من الحلقة" },
  about: { en: "About this episode", ar: "عن الحلقة" },
  takeaways: { en: "Key takeaways", ar: "أهم الأفكار التي ستتعلمها" },
  chapters: { en: "Chapters", ar: "فصول الحلقة" },
  resources: { en: "Links & resources", ar: "روابط وموارد" },
  related: { en: "Related episodes & content", ar: "حلقات ومحتوى ذو صلة" },
  guest: { en: "About the guest", ar: "عن الضيف" },
  guests: { en: "About the guests", ar: "عن الضيوف" },
  with: { en: "with", ar: "مع" },
  episode: { en: "Episode", ar: "الحلقة" },
};

// Each fragment renders ONE language. bi() emits both, wrapped in data-l="en" / data-l="ar"
// blocks; CSS shows only the active one, so both languages are in the HTML (crawlable).
const bi = (fn, cls = "") =>
  LANGS.map((lang) => `<div class="${cls}" data-l="${lang}" lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">${fn(lang)}</div>`).join("\n");

const heading = (lang, key) => `<h2 class="ep-h">${esc(UI[key][lang])}</h2>`;

function heroText(e, lang) {
  const l = (v) => L(v, lang);
  const cat = CATEGORIES[e.cat];
  return `
            <span class="ep-kicker"><span>${esc(cat ? cat[lang] : "")}</span><i></i><span>${esc(UI.episode[lang])} ${e.n}</span></span>
            <h1>${esc(l(e.title))}</h1>
            ${e.dek ? `<p class="ep-dek">${esc(l(e.dek))}</p>` : ""}
            <p class="ep-sub">${esc(UI.with[lang])} <strong>${esc(l(e.guest))}</strong></p>`;
}

// A pull quote lives inside the article flow, between sections — not in a card wall.
function pullQuote(e, q, lang) {
  const l = (v) => L(v, lang);
  const who = q.by ? l(q.by) : e.multiGuest ? "" : l(e.guest);
  const initial = who ? [...who.replace(/^(Dr\.|Eng\.|د\.|الدكتور|المهندس|المهندسة|الأستاذ)\s*/, "")][0] : "";
  const avatar = q.img
    ? `<img class="ep-pull-av" src="${esc(q.img)}" alt="${esc(who)}" width="52" height="52" loading="lazy" />`
    : initial
      ? `<span class="ep-pull-av ep-pull-initial" aria-hidden="true">${esc(initial)}</span>`
      : "";
  return `<figure class="ep-pull">
            <blockquote><p>${esc(l(q))}</p></blockquote>
            <figcaption>
              ${avatar}
              ${who ? `<span class="ep-pull-by">${esc(who)}</span>` : ""}
              ${q.t ? `<a class="ep-pull-t" href="${watch(e, q.t)}" target="_blank" rel="noopener">▶ ${esc(q.t)}</a>` : ""}
            </figcaption>
          </figure>`;
}

// Article: summary → quote 1 → takeaways (first half) → quote 2 → takeaways (rest) → quote 3 → links.
function mainBlock(e, lang) {
  const l = (v) => L(v, lang);
  const quotes = (e.quotes || []).slice(0, 3);
  const q = (i) => (quotes[i] ? pullQuote(e, quotes[i], lang) : "");
  const related = (e.related || []).map((n) => EPISODES.find((x) => x.n === n)).filter(Boolean);
  const out = [];

  if (e.summary)
    out.push(`<section class="ep-block">${heading(lang, "about")}<div class="ep-prose">${l(e.summary).split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join("")}</div></section>`);
  out.push(q(0));

  const tk = e.takeaways || [];
  const item = (t, i) => `<li><span class="ep-num">${String(i + 1).padStart(2, "0")}</span><p>${esc(l(t))}</p></li>`;
  if (tk.length) {
    const cut = tk.length > 3 ? Math.ceil(tk.length / 2) : tk.length;
    out.push(`<section class="ep-block">${heading(lang, "takeaways")}<ol class="ep-takeaways">${tk.slice(0, cut).map((t, i) => item(t, i)).join("")}</ol></section>`);
    out.push(q(1));
    if (tk.length > cut) out.push(`<section class="ep-block"><ol class="ep-takeaways">${tk.slice(cut).map((t, i) => item(t, cut + i)).join("")}</ol></section>`);
  } else out.push(q(1));
  out.push(q(2));

  if (e.resources?.length)
    out.push(`<section class="ep-block">${heading(lang, "resources")}<ul class="ep-list">${list(e.resources, (r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(l(r.label))}</a></li>`)}</ul></section>`);
  if (related.length || e.courses?.length) {
    const items = [
      ...related.map((r) => `<li><a href="${r.slug ? `../${r.slug}/` : watch(r)}">${esc(l(r.title))} <small>— ${esc(l(r.guest))}</small></a></li>`),
      ...(e.courses || []).map((c) => `<li><a href="${esc(c.url)}">${esc(l(c.label))}</a></li>`),
    ];
    out.push(`<section class="ep-block">${heading(lang, "related")}<ul class="ep-list">${items.join("")}</ul></section>`);
  }
  return out.filter(Boolean).join("\n");
}

// Several guests when the name list joins people with "and" (data convention: "A and B and C").
const hasSeveralGuests = (e) => e.multiGuest || / and /.test(e.guest.en);

function guestCard(e, lang) {
  const l = (v) => L(v, lang);
  return `<div class="ep-card ep-guest">
            ${e.guestImage ? `<img src="${esc(e.guestImage)}" alt="${esc(l(e.guest))}" width="72" height="72" loading="lazy" />` : ""}
            <span class="ep-card-label">${esc(UI[hasSeveralGuests(e) ? "guests" : "guest"][lang])}</span>
            <h2>${esc(l(e.guest))}</h2>
            ${e.guestBio ? `<p>${esc(l(e.guestBio))}</p>` : ""}
            ${e.guestLinks?.length ? `<div class="ep-guest-links">${list(e.guestLinks, (g) => `<a href="${esc(g.url)}" target="_blank" rel="noopener me">${esc(g.label)}</a>`)}</div>` : ""}
          </div>`;
}

function chaptersCard(e, lang) {
  const l = (v) => L(v, lang);
  if (!e.chapters?.length) return "";
  return `<div class="ep-card"><span class="ep-card-label">${esc(UI.chapters[lang])}</span>
            <ul class="ep-chapters">${list(e.chapters, (c) => `<li><a href="${watch(e, c.t)}" target="_blank" rel="noopener"><time>${esc(c.t)}</time><span>${esc(l(c.title))}</span></a></li>`)}</ul></div>`;
}

function page(e) {
  const published = isPublished(e);
  const url = pageUrl(e);
  const cat = CATEGORIES[e.cat];
  const title = `${e.title.en} — ${e.guest.en} | ${e.title.ar} | ${SHOW.name.ar}`;
  const descEn = snippet(e.summary?.en || `${SHOW.name.en} podcast: ${e.title.en} with ${e.guest.en}.`, 120);
  const descAr = snippet(e.summary?.ar || `${SHOW.name.ar}: ${e.title.ar} مع ${e.guest.ar}.`, 90);
  const desc = `${descEn} · ${descAr}`;
  const thumb = `https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`;

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "PodcastEpisode",
      name: e.title.ar,
      alternateName: e.title.en,
      description: e.summary ? `${e.summary.ar}\n\n${e.summary.en}` : desc,
      url,
      inLanguage: "ar",
      episodeNumber: e.n,
      ...(e.date && { datePublished: e.date }),
      thumbnailUrl: thumb,
      associatedMedia: {
        "@type": "VideoObject",
        name: e.title.ar,
        embedUrl: `https://www.youtube.com/embed/${e.id}`,
        contentUrl: watch(e),
        thumbnailUrl: thumb,
        uploadDate: e.date || undefined,
        description: e.summary?.ar || descAr,
      },
      actor: { "@type": "Person", name: e.guest.ar, alternateName: e.guest.en, ...(e.guestLinks && { sameAs: e.guestLinks.map((g) => g.url) }) },
      partOfSeries: { "@type": "PodcastSeries", name: SHOW.name.ar, url: SHOW.url },
      author: { "@type": "Person", name: "Tariq Elouzeh", url: SITE + "/" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Tariq Labs", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: SHOW.name.ar, item: SHOW.url },
        { "@type": "ListItem", position: 3, name: e.title.ar, item: url },
      ],
    },
  ];

  const listen = [
    ["YouTube", watch(e)],
    ["Audio", e.buzzsprout || "https://podcast.tariqlabs.com/"],
    ["Spotify", "https://open.spotify.com/show/0KXiNLus1U3dAD2GwnMATu"],
    ["Apple Podcasts", "https://podcasts.apple.com/us/podcast/تقني-بحت-مع-طارق-العوزة/id1771045340"],
    ["Amazon Music", "https://music.amazon.com/podcasts/69d7cb77-e4a9-440f-8c1e-4ea87b6359d1/تقني-بحت-مع-طارق-العوزة"],
  ];
  const q = encodeURIComponent;
  const share = [
    ["WhatsApp", `https://wa.me/?text=${q(e.title.ar + " | " + e.title.en + " " + url)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${q(url)}`],
    ["X", `https://twitter.com/intent/tweet?text=${q(e.title.en)}&url=${q(url)}`],
  ];

  return `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    ${published ? "" : '<meta name="robots" content="noindex" />'}
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Tariq Labs" />
    <meta property="og:title" content="${esc(e.title.en)} — ${esc(e.guest.en)} | ${esc(e.title.ar)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://i.ytimg.com/vi/${e.id}/maxresdefault.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="../../logos/tariq.png" type="image/png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../styles.css" />
    <link rel="stylesheet" href="../../css/podcast.css?v=22" />
    <script type="application/ld+json">${JSON.stringify(ld)}</script>
  </head>
  <body>
    <nav id="nav">
      <a href="../../" class="nav-logo"><img src="../../logos/logo-white.png" alt="Tariq Labs" style="height: 38px; width: auto; display: block" /></a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="../../#about" data-en="About" data-ar="من أنا">About</a></li>
          <li><a href="../../#film" data-en="Film" data-ar="الفيلم">Film</a></li>
          <li><a href="../../#youtube-content" data-en="Videos" data-ar="فيديوهات">Videos</a></li>
          <li><a href="../" aria-current="page" style="opacity: 1; color: var(--yellow)" data-en="Podcast" data-ar="البودكاست">Podcast</a></li>
          <li><a href="../../#hackathon" data-en="Hackathon" data-ar="هاكاثون">Hackathon</a></li>
          <li><a href="../../#mock-interviews" data-en="Mock Interviews" data-ar="مقابلات البرمجة">Mock Interviews</a></li>
          <li class="nav-dropdown">
            <a href="#" class="nav-dropdown-toggle" data-en="Courses" data-ar="الكورسات">Courses</a>
            <div class="nav-dropdown-menu"><a href="../../courses/ai-agents/" data-en="AI Agent Engineering" data-ar="هندسة وكلاء الذكاء الاصطناعي">AI Agent Engineering</a></div>
          </li>
          <li><a href="../../#contact" class="nav-cta" data-en="Contact Me" data-ar="تواصل معي">Contact Me</a></li>
        </ul>
        <div class="lang-toggle">
          <button class="lang-btn active" id="btn-en" onclick="setLang('en')">EN</button>
          <button class="lang-btn" id="btn-ar" onclick="setLang('ar')">AR</button>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" onclick="toggleNav()"><span></span><span></span><span></span></button>
      </div>
    </nav>

    <main class="ep-main">
      <div class="pc-wrap">
        <a class="ep-back" href="../" data-en="← All episodes" data-ar="→ كل الحلقات">← All episodes</a>

        <header class="ep-hero">
          ${bi((lang) => heroText(e, lang), "ep-hero-copy")}
        </header>

        <div class="ep-layout">
          <div class="ep-content">
            <div class="ep-player">
              <iframe src="https://www.youtube-nocookie.com/embed/${e.id}?rel=0" title="${esc(e.title.en)} | ${esc(e.title.ar)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
            </div>
            ${bi((lang) => mainBlock(e, lang))}
          </div>
          <aside class="ep-aside">
            ${bi((lang) => guestCard(e, lang))}
            <div class="ep-card">
              <span class="ep-card-label" data-en="Listen &amp; follow" data-ar="استمع وتابع">Listen &amp; follow</span>
              <div class="ep-listen">
                ${list(listen, ([n, h], i) => `<a class="pc-platform${i === 0 ? " primary" : ""}" href="${h}" target="_blank" rel="noopener">${i === 0 ? "▶ " : ""}${n}</a>`)}
              </div>
            </div>
            ${bi((lang) => chaptersCard(e, lang))}
            <div class="ep-card ep-share">
              <span class="ep-card-label" data-en="Share this episode" data-ar="شارك الحلقة">Share this episode</span>
              <div class="ep-share-row">
                ${list(share, ([n, h]) => `<a class="pc-platform" href="${h}" target="_blank" rel="noopener">${n}</a>`)}
                <button class="pc-platform" type="button" id="copy-link" data-url="${url}" data-en="Copy link" data-ar="انسخ الرابط">Copy link</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <footer class="pc-footer">
      <span>&copy; 2026 Tariq Labs</span>
      <span>Created with ♥ by <a href="https://www.linkedin.com/in/tariqelouzeh/" target="_blank" rel="noopener">@tariqelouzeh</a></span>
    </footer>
    <script src="../../js/podcast-episode.js"></script>
  </body>
</html>
`;
}

// ── Write pages ──
for (const e of EPISODES.filter((e) => e.slug)) {
  const dir = path.join(root, "podcast", e.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(e));
}

// ── Sitemap ──
const urls = [
  `${SITE}/`,
  SHOW.url,
  `${SITE}/courses/ai-agents/`,
  `${SITE}/roadmap/`,
  ...EPISODES.filter(isPublished).map(pageUrl),
];
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`,
);

const pub = EPISODES.filter(isPublished).length;
console.log(`Built ${EPISODES.filter((e) => e.slug).length} episode pages (${pub} published, ${EPISODES.length - pub} noindex preview).`);
