// app.js — arranque general: mostrar el estado de conexión (el Service Worker se registra en index.html)

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
