/* Las disciplinas — tabs sticky con scrollspy y acento por disciplina */
(() => {
  const tabsEl = document.getElementById("tabs");
  const tabs = [...document.querySelectorAll(".tab")];
  const sections = [...document.querySelectorAll(".disc")];
  if (!sections.length) return;

  const accents = {
    rugby: "#B02A28", hockey: "#C8862B", tenis: "#3A6E8F",
    golf: "#7d8d52", hipoterapia: "#9A2220", squash: "#2A2320",
  };

  const onScroll = () => {
    if (tabsEl) tabsEl.classList.toggle("solid", window.scrollY > 120);
    const mid = window.scrollY + window.innerHeight * 0.32;
    let cur = sections[0].dataset.d;
    sections.forEach((s) => { if (s.offsetTop <= mid) cur = s.dataset.d; });
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.d === cur));
    document.documentElement.style.setProperty("--accent", accents[cur] || "#B02A28");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      const el = document.getElementById(t.dataset.d);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    })
  );
})();
