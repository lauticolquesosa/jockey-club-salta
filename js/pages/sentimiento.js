/* Sentir el Rojo — paisaje sonoro sintetizado (Web Audio) + scrollytelling cinematográfico */
(() => {
  // build eqviz bars
  const eq = document.getElementById("eqviz");
  if (eq) for (let i = 0; i < 48; i++) { const b = document.createElement("i"); b.style.height = 15 + Math.random() * 30 + "%"; eq.appendChild(b); }

  // ===== Web Audio synthesized layers =====
  let ac = null, masterGain = null;
  const layers = { drum: null, crowd: null, bengala: null, chord: null };
  function ensureAudio() {
    if (ac) return ac;
    ac = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ac.createGain(); masterGain.gain.value = 0; masterGain.connect(ac.destination);
    // drum: periodic low thump
    const drumGain = ac.createGain(); drumGain.gain.value = 0; drumGain.connect(masterGain);
    layers.drum = { gain: drumGain, timer: null, start() { if (this.timer) return; this.gain.gain.setTargetAtTime(.4, ac.currentTime, .3); const tick = () => { const t = ac.currentTime; const o = ac.createOscillator(); o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(40, t + .15); const g = ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.85, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + .25); o.connect(g); g.connect(this.gain); o.start(t); o.stop(t + .3) }; tick(); this.timer = setInterval(tick, 580) }, stop() { if (this.timer) clearInterval(this.timer); this.timer = null; this.gain.gain.setTargetAtTime(0, ac.currentTime, .3) } };
    // crowd: filtered noise
    const crowdGain = ac.createGain(); crowdGain.gain.value = 0; crowdGain.connect(masterGain);
    const noiseBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1) * .6;
    const cn = ac.createBufferSource(); cn.buffer = noiseBuf; cn.loop = true; const cf = ac.createBiquadFilter(); cf.type = "bandpass"; cf.frequency.value = 480; cf.Q.value = .7; cn.connect(cf); cf.connect(crowdGain); cn.start();
    const lfo = ac.createOscillator(); lfo.frequency.value = .4; const lfoG = ac.createGain(); lfoG.gain.value = 180; lfo.connect(lfoG); lfoG.connect(cf.frequency); lfo.start();
    layers.crowd = { gain: crowdGain, start() { this.gain.gain.setTargetAtTime(.5, ac.currentTime, .4) }, stop() { this.gain.gain.setTargetAtTime(0, ac.currentTime, .4) } };
    // bengala: noise hiss bursts
    const bengGain = ac.createGain(); bengGain.gain.value = 0; bengGain.connect(masterGain);
    const bn = ac.createBufferSource(); bn.buffer = noiseBuf; bn.loop = true; const bf = ac.createBiquadFilter(); bf.type = "highpass"; bf.frequency.value = 2000; bn.connect(bf); bf.connect(bengGain); bn.start();
    layers.bengala = { gain: bengGain, start() { this.gain.gain.setTargetAtTime(.18, ac.currentTime, .3) }, stop() { this.gain.gain.setTargetAtTime(0, ac.currentTime, .3) } };
    // chord: warm major triad
    const chordGain = ac.createGain(); chordGain.gain.value = 0; chordGain.connect(masterGain);
    [220, 261.63, 329.63].forEach((f) => { const o = ac.createOscillator(); o.type = "sine"; o.frequency.value = f; const g = ac.createGain(); g.gain.value = .18; o.connect(g); g.connect(chordGain); o.start() });
    layers.chord = { gain: chordGain, start() { this.gain.gain.setTargetAtTime(.4, ac.currentTime, .6) }, stop() { this.gain.gain.setTargetAtTime(0, ac.currentTime, .5) } };
    return ac;
  }

  let soundOn = false;
  const bigSnd = document.getElementById("bigSnd");
  if (bigSnd) bigSnd.addEventListener("click", async () => {
    ensureAudio();
    if (ac.state === "suspended") await ac.resume();
    soundOn = !soundOn;
    bigSnd.classList.toggle("on", soundOn);
    bigSnd.setAttribute("aria-checked", soundOn ? "true" : "false");
    bigSnd.querySelector("span:nth-child(2)").textContent = soundOn ? "Sonido encendido" : "Encender sonido";
    masterGain.gain.setTargetAtTime(soundOn ? .5 : 0, ac.currentTime, .4);
    if (soundOn) setActAudio(currentAct); else stopAllAudio();
  });
  function stopAllAudio() { Object.values(layers).forEach((l) => l && l.stop && l.stop()); }
  function setActAudio(i) {
    if (!ac || !soundOn) return;
    stopAllAudio();
    if (i === 1) layers.drum.start();
    if (i === 2) { layers.drum.start(); layers.crowd.start(); }
    if (i === 3) { layers.crowd.start(); layers.bengala.start(); }
    if (i === 4) layers.chord.start();
  }

  // ===== scrollytelling =====
  const lines = [...document.querySelectorAll(".actline")];
  const frames = [...document.querySelectorAll(".stage-bg .frame")];
  const N = lines.length;
  const acts = document.getElementById("acts");
  const steps = document.getElementById("steps");
  if (!acts || !N) return;
  steps.style.height = N * 82 + "vh";
  const dotsWrap = document.getElementById("dots");
  lines.forEach((_, i) => { const d = document.createElement("span"); d.className = "d" + (i === 0 ? " on" : ""); dotsWrap.appendChild(d); });
  const dots = [...dotsWrap.children];
  const counter = document.getElementById("counter");
  const drum = document.getElementById("drum");
  const eqvizEl = document.getElementById("eqviz");
  const smoke = document.getElementById("smoke");
  const familyShield = document.getElementById("familyShield");
  let currentAct = 0;
  function setAct(i) {
    if (i === currentAct) return;
    currentAct = i;
    lines.forEach((l, k) => {
      l.classList.remove("on", "was", "coming");
      if (k === i) l.classList.add("on");
      else if (k < i) l.classList.add("was");
      else l.classList.add("coming");
    });
    frames.forEach((f, k) => f.classList.toggle("on", k === i));
    drum.style.display = i === 1 ? "flex" : "none";
    eqvizEl.style.display = i === 2 ? "flex" : "none";
    smoke.style.display = i === 3 ? "block" : "none";
    familyShield.style.display = i === 4 ? "block" : "none";
    if (i === 2) {
      [...eqvizEl.children].forEach((bar, idx) => {
        bar.style.animation = `bar${idx % 4} 1.${Math.floor(Math.random() * 4 + 2)}s ease-in-out infinite alternate`;
      });
    }
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
    counter.textContent = String(i).padStart(2, "0") + " / " + String(N - 1).padStart(2, "0");
    setActAudio(i);
  }
  // dynamic keyframes for eqviz bars
  const styleEl = document.createElement("style");
  let kf = "";
  for (let i = 0; i < 4; i++) { const a = 20 + Math.random() * 30; const b = 70 + Math.random() * 30; kf += `@keyframes bar${i}{0%{height:${a}%}100%{height:${b}%}}`; }
  styleEl.textContent = kf; document.head.appendChild(styleEl);

  function onScroll() {
    const rect = acts.getBoundingClientRect();
    const total = acts.offsetHeight - window.innerHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    const p = total > 0 ? passed / total : 0;
    const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
    counter.classList.toggle("show", inView);
    dotsWrap.classList.toggle("show", inView);
    let idx = Math.floor(p * N);
    if (idx > N - 1) idx = N - 1;
    if (idx < 0) idx = 0;
    setAct(idx);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
