# Jockey Club de Salta — Sitio web

Rediseño de la web institucional del **Jockey Club de Salta** ("el Rojo y Blanco", desde 1965).
Sitio estático, sin frameworks ni paso de build: HTML + CSS + JS vanilla.

## Estructura

```
sitio/
├── index.html              Home / Manifiesto
├── historia-viva.html      Historia viva (línea de tiempo)
├── las-camadas.html        Las camadas (constelación navegable)
├── los-espacios.html       Los espacios (Cancha 1, casa roja…)
├── vida-social.html        Vida social y tercer tiempo
├── las-disciplinas.html    Las disciplinas (tabs por deporte)
├── sentir-el-rojo.html     Sentir el Rojo (experiencia con sonido)
├── sistema-visual.html     Sistema visual (referencia de diseño)
├── assets/                 Imágenes
├── css/
│   ├── base.css            Variables, reset, tipografía, nav, footer (compartido)
│   └── pages/*.css         Estilos propios de cada página
├── js/
│   ├── site.js             Menú, sonido, topbar, progress, reveal (compartido)
│   └── pages/*.js          Lógica propia de cada página
├── vercel.json             Headers de cache para estáticos
├── robots.txt · sitemap.xml
```

Cada página carga `css/base.css` + su CSS de página, y `js/site.js` + su JS de página.
La fundación compartida vive una sola vez; cada página solo agrega lo suyo.

## Desarrollo local

```bash
python -m http.server 5500
# http://127.0.0.1:5500/
```

## Deploy

Sitio estático servido desde la raíz. Producción en Vercel:
https://jockey-club-salta.vercel.app
