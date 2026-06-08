/* Vida social — confetti decorativo y filtros de la galería de eventos */
(() => {
  const confetti = document.getElementById("confetti");
  if (confetti) {
    const colors = ["#C8862B", "#B02A28", "#E9A24A", "#B02A28"];
    for (let i = 0; i < 48; i++) {
      const s = document.createElement("span");
      const sz = Math.random() * 5 + 3;
      s.style.width = sz + "px";
      s.style.height = sz * 0.6 + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 70 + "%";
      s.style.background = colors[Math.floor(Math.random() * colors.length)];
      s.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      s.style.opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
      confetti.appendChild(s);
    }
  }

  const evs = [...document.querySelectorAll(".ev")];
  document.querySelectorAll(".filter").forEach((f) =>
    f.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((x) => x.classList.toggle("on", x === f));
      const v = f.dataset.f;
      evs.forEach((e) => { e.style.display = v === "all" || e.dataset.type === v ? "" : "none"; });
    })
  );
})();
