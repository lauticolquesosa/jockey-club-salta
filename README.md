# Jockey Club de Salta — Sitio web

Rediseño de la web institucional del **Jockey Club de Salta** ("el Rojo y Blanco", desde 1965).
Sitio estático, sin frameworks ni paso de build: HTML + CSS + JavaScript vanilla.

**Producción:** https://jockeyclubsalta.vercel.app

## Estructura

```
sitio/
├── index.html          Home / Manifiesto              →  /
├── historia.html       Historia viva (línea de tiempo)→  /historia
├── camadas.html        Las camadas (constelación)     →  /camadas
├── espacios.html       Los espacios (Cancha 1, casa)  →  /espacios
├── social.html         Vida social y tercer tiempo    →  /social
├── disciplinas.html    Las disciplinas (por deporte)  →  /disciplinas
├── sentimiento.html    Sentir el Rojo (experiencia)   →  /sentimiento
├── sistema.html        Sistema visual (ref. interna, noindex)
├── assets/             Imágenes
├── css/
│   ├── base.css        Variables, reset, tipografía, nav, footer (compartido)
│   └── pages/*.css     Estilos propios de cada página
├── js/
│   ├── site.js         Menú, sonido, topbar, progress, reveal (compartido)
│   └── pages/*.js      Lógica propia de cada página
├── vercel.json         Clean URLs, redirects y headers
├── robots.txt
└── sitemap.xml
```

Las URLs no llevan extensión `.html` (`cleanUrls` en Vercel). Cada `<página>.html`
se sirve en `/<página>`. Los nombres de archivo y de ruta coinciden 1 a 1.

Cada página carga `css/base.css` + su CSS de página, y `js/site.js` + su JS de
página. La fundación compartida (header, footer, menú, tipografía) vive una sola
vez en `base.css` / `site.js`; cada página solo agrega lo suyo.

## Desarrollo local

```bash
python -m http.server 5500
# http://127.0.0.1:5500/
```

> En local los enlaces apuntan a rutas sin `.html` (`/historia`). Para que
> resuelvan igual que en producción, probá con `vercel dev` (replica `cleanUrls`),
> o navegá agregando la extensión al abrir archivos sueltos.

## Deploy

Hosteado en **Vercel** como sitio estático servido desde la raíz. El push a
`main` dispara el deploy automático. La configuración (clean URLs, redirects de
los slugs antiguos y headers de cache) vive en [`vercel.json`](./vercel.json).
