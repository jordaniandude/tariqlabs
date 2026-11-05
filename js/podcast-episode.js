// Shared behaviour for generated episode pages: nav, language toggle, copy-link.
(function () {
  const $ = (s) => document.querySelector(s);
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.toggleNav = function () {
    $(".nav-links").classList.toggle("open");
    $("#nav-hamburger").classList.toggle("open");
  };
  document.querySelectorAll(".nav-dropdown-toggle").forEach((t) =>
    t.addEventListener("click", (e) => {
      e.preventDefault();
      t.closest(".nav-dropdown").classList.toggle("open");
    }),
  );

  // Only the UI chrome is translated; the article itself stays Arabic (lang/dir set in markup).
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
    localStorage.setItem("lang", l);
  };
  const saved = localStorage.getItem("lang") || "en";
  if (saved !== "en") setLang(saved);

  const copy = $("#copy-link");
  if (copy)
    copy.addEventListener("click", async () => {
      const done = document.documentElement.lang === "ar" ? "تم النسخ ✓" : "Copied ✓";
      try {
        await navigator.clipboard.writeText(copy.dataset.url);
        const prev = copy.textContent;
        copy.textContent = done;
        setTimeout(() => (copy.textContent = prev), 1800);
      } catch (_) {
        window.prompt("Copy this link:", copy.dataset.url);
      }
    });
})();
