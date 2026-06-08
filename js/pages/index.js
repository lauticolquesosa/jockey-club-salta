/* Home — transición hero->manifiesto + manifiesto scrollytelling */
(() => {
  // ===== Hero: el contenido se disuelve hacia arriba al scrollear,
  // encadenando con el reveal del manifiesto (mismo lenguaje fade+translate) =====
  const intro = document.querySelector(".intro");
  const introContent = document.getElementById("introContent");
  const scrollcue = document.querySelector(".scrollcue");
  if (intro && introContent) {
    const onHero = () => {
      const h = intro.offsetHeight || window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      const eased = p * p;
      introContent.style.opacity = String(Math.max(0, 1 - eased * 1.1));
      introContent.style.transform = `translateY(${-eased * 72}px) scale(${1 - eased * 0.04})`;
      if (scrollcue) scrollcue.style.opacity = String(Math.max(0, 0.85 - p * 1.7));
    };
    onHero();
    window.addEventListener("scroll", onHero, { passive: true });
    window.addEventListener("resize", onHero);
  }

  // ===== Manifiesto: stage pinned + líneas que revelan por scroll =====
  const lines = [...document.querySelectorAll("#lines .line")];
  const frames = [...document.querySelectorAll(".stage-bg .frame")];
  const mani = document.getElementById("manifiesto");
  const dotsWrap = document.getElementById("dots");
  const counter = document.getElementById("counter");
  const steps = document.getElementById("steps");
  if (!lines.length || !mani || !dotsWrap || !counter) return;

  const N = lines.length;
  if (steps) steps.style.height = N * 78 + "vh";

  lines.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "d" + (i === 0 ? " on" : "");
    dotsWrap.appendChild(d);
  });
  const dots = [...dotsWrap.children];
  dotsWrap.style.transition = "opacity .5s";

  let cur = 0;
  function setStep(i) {
    if (i === cur) return;
    cur = i;
    lines.forEach((l, k) => {
      l.classList.remove("on", "was", "coming");
      if (k === i) l.classList.add("on");
      else if (k < i) l.classList.add("was");
      else l.classList.add("coming");
    });
    frames.forEach((f, k) => f.classList.toggle("on", k === i));
    const act = frames[i] && frames[i].querySelector("img");
    if (act) { act.style.animation = "none"; act.offsetHeight; act.style.animation = ""; }
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
    counter.textContent = String(i + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
  }

  function onScroll() {
    const rect = mani.getBoundingClientRect();
    const total = mani.offsetHeight - window.innerHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    const p = total > 0 ? passed / total : 0;
    const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
    counter.classList.toggle("show", inView);
    dotsWrap.style.opacity = inView ? "1" : "0";
    let idx = Math.floor(p * N);
    if (idx > N - 1) idx = N - 1;
    if (idx < 0) idx = 0;
    setStep(idx);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
