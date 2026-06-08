/* Jockey Club de Salta — site.js
   Comportamiento compartido por todas las páginas:
   menú overlay, toggle de sonido, topbar sólida, barra de
   progreso y reveal por scroll. Todo guardado: si un elemento
   no existe en la página, simplemente se omite. */

(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ===== Menú overlay =====
  const overlay = $("#overlay");
  const openBtn = $("#openMenu");
  const closeBtn = $("#closeMenu");
  if (overlay && openBtn) {
    const open = () => {
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    openBtn.addEventListener("click", open);
    closeBtn && closeBtn.addEventListener("click", close);
    $$(".ov-item", overlay).forEach((i) => i.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // ===== Toggle de sonido (UI; placeholder hasta cablear audio real) =====
  const snd = $("#snd");
  if (snd) {
    snd.addEventListener("click", () => {
      const on = snd.classList.toggle("on");
      snd.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  // ===== Topbar sólida + barra de progreso =====
  const topbar = $("#topbar");
  const progress = $("#progress");
  if (topbar || progress) {
    const ds = topbar ? topbar.dataset.solidAfter : null;
    const noSolid = topbar ? topbar.hasAttribute("data-no-solid") : true;

    const threshold = () => {
      if (ds === "hero") {
        const hero = $(".intro, .prologue, .hero, .phero");
        return hero ? hero.offsetHeight * 0.7 : window.innerHeight * 0.7;
      }
      return ds ? parseInt(ds, 10) : 120;
    };

    const onScroll = () => {
      if (topbar && !noSolid) {
        topbar.classList.toggle("solid", window.scrollY > threshold());
      }
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ===== Reveal por scroll =====
  const revealEls = $$(".reveal, .frame");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }
})();
