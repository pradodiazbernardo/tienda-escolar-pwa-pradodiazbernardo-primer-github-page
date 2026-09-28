// notificaciones.js — Notification API
// Esta es la API del NAVEGADOR (no del sistema push completo, que necesitaría
// un servidor con claves VAPID). Sirve para mostrar avisos del lado del cliente
// y para entender el permiso que el usuario debe conceder.

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-notificar");
  const mensaje = document.getElementById("notificaciones-mensaje");

  boton.addEventListener("click", () => {
    // "Notification" no existe en todos los navegadores/contextos; lo comprobamos primero
    if (!("Notification" in window)) {
      mensaje.textContent = "Este navegador no soporta notificaciones.";
      return;
    }

    // Notification.requestPermission() abre el diálogo del navegador
    // ("bloquear" / "permitir"). Devuelve una promesa con la respuesta del usuario.
    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        // Creamos una notificación de prueba. title, luego un objeto con opciones.
        new Notification("Tienda Escolar", {
          body: "¡Listo! Te avisaremos cuando haya nuevas ofertas.",
          icon: "icons/icon.svg",
        });
        mensaje.textContent = "Notificaciones activadas.";
      } else {
        mensaje.textContent = "No diste permiso para notificaciones.";
      }
    });
  });
});