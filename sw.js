if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise(s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()}).then(()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e}));self.define=(r,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const t=e=>i(e,c),a={module:{uri:c},exports:n,require:t};s[c]=Promise.all(r.map(e=>a[e]||t(e))).then(e=>(o(...e),n))}}define(["./workbox-86637ee2"],function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"manifest.json",revision:"5de02539a07be6b9a8acca7aa2fa61b3"},{url:"index.html",revision:"83ead45cbb576cb25f9b54697462abd5"},{url:"js/notificaciones.js",revision:"a0dc07ca65191a4ae0ef32f93ea55694"},{url:"js/geolocalizacion.js",revision:"7ada55fd626a77d098d448c3b097ee9a"},{url:"js/csr.js",revision:"4329e3c12da023f5528519cf2530d8d6"},{url:"js/carrito.js",revision:"9fb64d042373d1b57ad7830142dd790b"},{url:"css/estilos.css",revision:"a4f08cc1bc11809f14f7a4acdfcffed0"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})});
//# sourceMappingURL=sw.js.map
//# sourceMappingURL=sw.js.map
// sw.js — Service Worker de la Tienda Escolar
// Un Service Worker es un script que el navegador ejecuta APARTE de la página,
// incluso cuando la pestaña está cerrada. Su superpoder es interceptar peticiones
// de red y decidir: ¿la resuelvo con caché, con internet, o con las dos?

const NOMBRE_CACHE = "tienda-escolar-v1"; // cambia este número cuando actualices el app shell

// Lista del "app shell": todo lo necesario para que la app abra sin internet
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/estilos.css",
  "./js/app.js",
  "./js/carrito.js",
  "./js/csr.js",
  "./js/notificaciones.js",
  "./js/geolocalizacion.js",
  "./catalogo.json",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./img/playera.svg",
  "./img/sudadera.svg",
  "./img/taza.svg",
  "./img/mochila.svg",
];

// Evento "install": se dispara UNA VEZ, cuando el navegador instala este Service Worker
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    // caches.open crea (o reutiliza) una caja de almacenamiento con ese nombre
    caches.open(NOMBRE_CACHE).then((cache) => {
      // cache.addAll descarga y guarda TODOS los archivos de la lista de una vez
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting(); // activa este SW de inmediato, sin esperar a cerrar todas las pestañas
});

// Evento "activate": limpia cachés de versiones anteriores (si cambiaste NOMBRE_CACHE)
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nombresGuardados) =>
      Promise.all(
        nombresGuardados
          .filter((nombre) => nombre !== NOMBRE_CACHE) // nos quedamos solo con la caché actual
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim(); // toma control de las pestañas abiertas sin necesidad de recargarlas
});

// Evento "fetch": se dispara CADA VEZ que la página pide un archivo (HTML, CSS, JS, imágenes...)
self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return; // solo cacheamos lecturas, no envíos de datos

  // Ignora peticiones que no sean http(s): extensiones del navegador (Grammarly,
  // gestores de contraseñas, bloqueadores de anuncios...) también disparan "fetch"
  // con URLs "chrome-extension://", y Cache Storage no acepta guardarlas.
  if (!evento.request.url.startsWith("http")) return;

  evento.respondWith(
    // Estrategia "cache first": si ya está guardado, se sirve al instante desde el
    // teléfono/computadora (así funciona sin internet); si no está, se busca en la red
    // y, de paso, se guarda para la próxima vez.
    caches.match(evento.request).then((respuestaGuardada) => {
      if (respuestaGuardada) return respuestaGuardada;

      return fetch(evento.request)
        .then((respuestaDeRed) => {
          const copia = respuestaDeRed.clone(); // clonamos: una copia se entrega, otra se guarda
          caches.open(NOMBRE_CACHE).then((cache) => cache.put(evento.request, copia));
          return respuestaDeRed;
        })
        .catch(() => respuestaGuardada); // si no hay red NI caché, no hay más remedio que fallar
    })
  );
});