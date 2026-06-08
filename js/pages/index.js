/* Home — scrollytelling pinned: el hero es la escena 0.
   Cada escena cruza con crossfade + Ken Burns; el texto entra con fade+translateY. */
(() => {
  const scenes = [...document.querySelectorAll("#lines .scene")];
  const frames = [...document.querySelectorAll(".stage-bg .frame")];
  const mani = document.getElementById("manifiesto");
  const dotsWrap = document.getElementById("dots");
  const counter = document.getElementById("counter");
  const steps = document.getElementById("steps");
  const scrollcue = document.getElementById("scrollcue");
  if (!scenes.length || !mani || !dotsWrap || !counter) return;

  const N = scenes.length;
  if (steps) steps.style.height = N * 80 + "vh";

  scenes.forEach((_, i) => {
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
    scenes.forEach((s, k) => {
      s.classList.remove("on", "was", "coming");
      s.classList.add(k === i ? "on" : k < i ? "was" : "coming");
    });
    frames.forEach((f, k) => f.classList.toggle("on", k === i));
    const act = frames[i] && frames[i].querySelector("img");
    if (act) { act.style.animation = "none"; act.offsetHeight; act.style.animation = ""; }
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
    counter.textContent = String(i + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
    if (scrollcue) scrollcue.style.opacity = i === 0 ? "0.85" : "0";
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
