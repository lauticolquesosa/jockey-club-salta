/* Los espacios — topbar legible sobre la foto full-bleed (slot Cancha 1) */
(() => {
  const topbar = document.getElementById("topbar");
  const slot = document.querySelector(".slot3d");
  if (!topbar || !slot) return;
  const onScroll = () => {
    const r = slot.getBoundingClientRect();
    const overPhoto = r.top < 80 && r.bottom > 80;
    topbar.classList.toggle("on-photo", overPhoto && !topbar.classList.contains("solid"));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
