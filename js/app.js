// app.js — arranque general: registrar el Service Worker y mostrar el estado de conexión

// Actualiza la "píldora" de arriba a la derecha según haya o no internet
function actualizarPildoraConexion() {
  const pildora = document.getElementById("estado-conexion");
  if (navigator.onLine) {
    pildora.textContent = "conectado";
    pildora.classList.remove("sin-conexion");
  } else {
    pildora.textContent = "sin conexión";
    pildora.classList.add("sin-conexion");
  }
}

document.addEventListener("DOMContentLoaded", actualizarPildoraConexion);
window.addEventListener("online", actualizarPildoraConexion);
window.addEventListener("offline", actualizarPildoraConexion);

// Registro del Service Worker: "serviceWorker" in navigator comprueba que el
// navegador soporte la API antes de intentar usarla (Safari viejo, por ejemplo, no).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registro) => {
        console.log("Service Worker registrado con éxito:", registro.scope);
      })
      .catch((error) => {
        console.error("No se pudo registrar el Service Worker:", error);
      });
  });
}