/* Las camadas — estrellas de fondo, datos de cada camada y ficha viva */
(() => {
  // background stars
  function sprinkle(el, n, opts = {}) {
    if (!el) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      const sz = Math.random() * 2 + (opts.min || 0.6);
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.opacity = (Math.random() * (opts.maxOp || 0.5) + 0.15).toFixed(2);
      el.appendChild(s);
    }
  }
  sprinkle(document.getElementById("skyyHero"), 60);
  sprinkle(document.getElementById("bgstars"), 80, { maxOp: 0.6 });

  // ===== camada data =====
  const IM = (src, alt, cap) => ({ type: "img", src, alt, cap });
  const DATA = {
    "2002": {
      name: "Los Pumas <em>de bolsillo.</em>", sub: "31 jugadores · La camada que cruzó el desierto",
      eye: "Camada · 2002",
      photos: [IM("/assets/entrada-cancha.webp", "El plantel saliendo a la cancha", "La salida a la cancha"), IM("/assets/gira-embarque.webp", "La gira a Mendoza", "La gira a Mendoza"), IM("/assets/banderazo.webp", "El festejo", "El festejo")],
      anec: [{ q: '"Volvimos invictos de Tucumán. Lo festejamos en el quincho hasta las seis."', a: "El Coya · Capitán" }, { q: '"Esa final no se ganó el sábado. Se ganó todos los martes a las siete."', a: "Pulguita · Coach" }],
      hoy: [{ n: "El Coya · Mariano F.", r: "Abogado · Salta", i: "MF" }, { n: "Pelado · Tomás L.", r: "Coach M14 JCS", i: "TL" }, { n: "Rambo · Lucas D.", r: "Ingeniero · Madrid", i: "LD" }, { n: "Negro · Juan P.", r: "Médico · Mendoza", i: "JP" }]
    },
    "2005": {
      name: "La gira <em>al sur.</em>", sub: "28 jugadores · Bariloche y la nevada del '05",
      eye: "Camada · 2005",
      photos: [IM("/assets/tribuna.webp", "El equipo en la nieve", "El equipo en la nieve"), IM("/assets/tribuna-plantel.webp", "Plantel oficial 2005", "Plantel oficial"), IM("/assets/tercer-tiempo.webp", "Tercer tiempo", "Tercer tiempo")],
      anec: [{ q: '"La cancha estaba blanca. Jugamos igual. Algunos en short."', a: "El Mono · Wing" }, { q: '"Volvimos sin un par de botines y con tres novias nuevas."', a: "Anónimo · Eternal" }],
      hoy: [{ n: "El Mono · Diego A.", r: "Productor agro · Tucumán", i: "DA" }, { n: "Toto · Pablo R.", r: "Arquitecto · Salta", i: "PR" }, { n: "Lechuza · Hernán B.", r: "Coach hockey JCS", i: "HB" }, { n: "Pampa · Javier S.", r: "Comerciante · Cafayate", i: "JS" }]
    },
    "2008": {
      name: "Los del <em>barro.</em>", sub: "33 jugadores · La final con lluvia que no paró nunca",
      eye: "Camada · 2008",
      photos: [IM("/assets/salida-plantel.webp", "La final bajo la tormenta", "La final bajo la tormenta"), IM("/assets/camada-rugby-infantil.webp", "Plantel y cuerpo técnico", "Plantel + cuerpo técnico"), IM("/assets/casa-club.webp", "Vestuario después del partido", "Vestuario después del partido")],
      anec: [{ q: '"Cuando salieron los pumas del banco a felicitarnos, llovía tanto que no nos veíamos."', a: "Capitán · 2008" }, { q: '"Mi vieja dejó de mirar al minuto 3. Igual la película la tengo entera en la cabeza."', a: "Apertura · 2008" }],
      hoy: [{ n: "Cabeza · Iván M.", r: "Empresario · Salta", i: "IM" }, { n: "Beto · Federico C.", r: "Cirujano · BsAs", i: "FC" }, { n: "Tincho · Martín G.", r: "Coach M16 JCS", i: "MG" }, { n: "Pochoclo · Ramiro V.", r: "Productor TV · Córdoba", i: "RV" }]
    },
    "2012": {
      name: "Los <em>hermanos chicos.</em>", sub: "29 jugadores · La camada de los hermanos Figallo",
      eye: "Camada · 2012",
      photos: [IM("/assets/hinchada-inferiores.webp", "Los Figallo en infantiles", "Los Figallo en infantiles"), IM("/assets/tribuna.webp", "Plantel campeón regional", "Plantel campeón regional"), IM("/assets/salida-plantel.webp", "Entrada a Cancha 1", "Entrada a Cancha 1")],
      anec: [{ q: '"Tres hermanos en el mismo line. La defensa contraria no entendía qué nombre gritar."', a: "Coach · 2012" }, { q: '"Mi hermano me tackleó en el entrenamiento. Mi vieja se enojó conmigo."', a: "Nacho F." }],
      hoy: [{ n: "Nacho F. · Ignacio F.", r: "Veterinario · Salta", i: "IF" }, { n: "Toto F. · Tomás F.", r: "Coach Pumas M19", i: "TF" }, { n: "Chino · Alejandro L.", r: "Diseñador · Berlín", i: "AL" }, { n: "Tincho · Martín O.", r: "Abogado · Salta", i: "MO" }]
    },
    "2015": {
      name: "Las <em>medallas.</em>", sub: "30 jugadores · Subcampeones URBA Inferiores",
      eye: "Camada · 2015",
      photos: [IM("/assets/banderazo.webp", "Subcampeones", "Subcampeones"), IM("/assets/casa-club.webp", "Concentración en BsAs", "Concentración en BsAs"), IM("/assets/tercer-tiempo.webp", "El asado del regreso", "El asado del regreso")],
      anec: [{ q: '"Perdimos por dos puntos. Lloramos. Después fuimos al asado y nos reímos toda la noche."', a: "Capitán · 2015" }, { q: '"Esa medalla todavía la tengo colgada arriba de la cama."', a: "Hooker · 2015" }],
      hoy: [{ n: "Manija · Joaquín T.", r: "Médico residente · Rosario", i: "JT" }, { n: "Bocha · Esteban Z.", r: "Coach M15 JCS", i: "EZ" }, { n: "Cabezón · Lucas A.", r: "Estudiante MBA · Boston", i: "LA" }, { n: "Tito · Francisco H.", r: "Productor · Cerrillos", i: "FH" }]
    },
    "2018": {
      name: "Los del <em>baile.</em>", sub: "27 jugadores · El haka improvisado en Córdoba",
      eye: "Camada · 2018",
      photos: [IM("/assets/salida-plantel.webp", "El haka improvisado", "El haka improvisado"), IM("/assets/plantel-m15.webp", "Plantel Inferiores", "Plantel Inferiores"), IM("/assets/tercer-tiempo.webp", "Tercer tiempo en Córdoba", "Tercer tiempo en Córdoba")],
      anec: [{ q: '"Salimos a la cancha bailando. La tribuna se quedó muda 10 segundos. Después aplaudía."', a: "Wing · 2018" }, { q: '"Coach nos miró y dijo: ahora que se rieron, jueguen en serio."', a: "Coach · 2018" }],
      hoy: [{ n: "Pelu · Julián M.", r: "Diseñador UX · Salta", i: "JM" }, { n: "Coco · Bruno V.", r: "Coach M13 JCS", i: "BV" }, { n: "Cabra · Felipe R.", r: "Periodista deportivo", i: "FR" }, { n: "Tato · Agustín O.", r: "Ingeniero · Buenos Aires", i: "AO" }]
    },
    "2022": {
      name: "La promo del <em>banderazo.</em>", sub: "32 jugadores · El primer banderazo grabado de la era moderna",
      eye: "Camada · 2022",
      photos: [IM("/assets/banderazo.webp", "Banderazo en Cancha 1", "El banderazo en Cancha 1"), IM("/assets/plantel-m15.webp", "Plantel completo 2022", "Plantel completo"), IM("/assets/tercer-tiempo.webp", "La fiesta de fin de año", "La fiesta de fin de año")],
      anec: [{ q: '"Pensamos que iban a venir 200. Vinieron mil. La Cancha 1 era una mancha roja."', a: "Capitán · 2022" }, { q: '"Esa tarde entendí qué era ser del Jockey. No antes."', a: "Pilar · 2022" }],
      hoy: [{ n: "Chiqui · Marcos D.", r: "Estudiante Med · UNT", i: "MD" }, { n: "Tincho · Joaquín L.", r: "Primera del club", i: "JL" }, { n: "Pulpo · Santiago F.", r: "Estudiante UCASAL", i: "SF" }, { n: "Cabezón · Bruno P.", r: "Coach M11 JCS", i: "BP" }]
    },
    "2026": {
      name: "Los <em>campeones.</em>", sub: "34 jugadores · Campeón WERE M15 · 2026",
      eye: "Camada · Hoy",
      photos: [IM("/assets/festejo-titulo-m15.webp", "El plantel con el trofeo", "M15 campeón con el trofeo"), IM("/assets/entrada-cancha.webp", "La salida a la cancha", "La salida entre humo"), IM("/assets/tribuna-plantel.webp", "Plantel M15 frente a la casa club", "El plantel completo")],
      anec: [{ q: '"Veníamos perdiendo. En el entretiempo, el coach no dijo una palabra. Salimos a ganar."', a: "Capitán M15 · 2026" }, { q: '"Cuando levantamos la copa, mi viejo lloraba en la tribuna. Yo también."', a: "Apertura · 2026" }],
      hoy: [{ n: "Capitán · Joaco V.", r: "Inferiores Pumas M16", i: "JV" }, { n: "Apertura · Tomi G.", r: "Plantel actual · JCS", i: "TG" }, { n: "8 · Lautaro R.", r: "Plantel actual · JCS", i: "LR" }, { n: "Wing · Bauti S.", r: "Selección Salteña", i: "BS" }]
    }
  };

  // ===== render ficha =====
  const fYear = document.getElementById("fYear"), fEye = document.getElementById("fEye"),
    fName = document.getElementById("fName"), fSub = document.getElementById("fSub");
  const fPhotos = document.getElementById("fPhotos"), fAnec = document.getElementById("fAnec"),
    fHoy = document.getElementById("fHoy");
  if (!fYear) return;

  function render(year) {
    const d = DATA[year];
    if (!d) return;
    fYear.textContent = "'" + year.slice(2);
    fEye.textContent = d.eye;
    fName.innerHTML = d.name;
    fSub.textContent = d.sub;
    fPhotos.innerHTML = d.photos.map((p) =>
      p.type === "img"
        ? `<div class="frame"><img src="${p.src}" alt="${p.alt}"/><div class="cap">${p.cap}</div></div>`
        : `<div class="ph"><div class="ic">▦</div><div class="tag">${p.tag}</div><div class="hint">${p.hint}</div></div>`
    ).join("");
    fAnec.innerHTML = d.anec.map((a) => `<div class="anec-item"><div class="q">${a.q}</div><div class="a">— ${a.a}</div></div>`).join("");
    fHoy.innerHTML = d.hoy.map((h) => `<div class="hoy-card"><div class="avatar">${h.i}</div><div class="ifo"><div class="nm">${h.n}</div><div class="r">${h.r}</div></div></div>`).join("");
    document.querySelectorAll(".cnode").forEach((n) => n.classList.toggle("active", n.dataset.year === year));
    document.querySelectorAll(".yearchip").forEach((c) => c.classList.toggle("active", c.dataset.year === year));
    document.querySelectorAll("#links line").forEach((l) => {
      const [a, b] = l.dataset.pair.split("-");
      l.classList.toggle("hot", a === year || b === year);
    });
  }

  document.querySelectorAll(".cnode").forEach((n) =>
    n.addEventListener("click", () => { render(n.dataset.year); document.getElementById("ficha").scrollIntoView({ behavior: "smooth", block: "start" }); })
  );
  document.querySelectorAll(".yearchip").forEach((c) =>
    c.addEventListener("click", () => { render(c.dataset.year); document.getElementById("ficha").scrollIntoView({ behavior: "smooth", block: "start" }); })
  );
  const randomBtn = document.getElementById("randomBtn");
  if (randomBtn) randomBtn.addEventListener("click", () => {
    const active = document.querySelector(".cnode.active");
    const keys = Object.keys(DATA).filter((k) => k !== (active && active.dataset.year));
    render(keys[Math.floor(Math.random() * keys.length)]);
  });

  render("2026");
})();
