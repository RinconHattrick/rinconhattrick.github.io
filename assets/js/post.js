document.addEventListener("DOMContentLoaded", () => {
  class ShareManager {
    constructor() {
      this.shareButton = document.getElementById("shareButton");

      this.shareData = {
        title:
          document.querySelector("title")?.innerText ||
          "Artículo de El Rincón de Hattrick",
        text: "¡Lee este artículo interesante en El Rincón de Hattrick!",
        url: window.location.href,
      };

      if (this.shareButton) {
        this.shareButton.addEventListener("click", () => this.handleShare());
      }
    }

    async handleShare() {
      if (navigator.share) {
        try {
          await navigator.share(this.shareData);
          console.log("Contenido compartido exitosamente.");
        } catch (error) {
          if (error.name !== "AbortError") {
            console.warn(
              "El usuario canceló o ocurrió un error al compartir.",
              error
            );
            this.showFallbackMessage();
          }
        }
      } else {
        this.showFallbackMessage();
      }
    }

    showFallbackMessage() {
      if (document.getElementById("share-fallback")) return; // Evitar múltiples mensajes

      const fallbackMessage = document.createElement("div");
      fallbackMessage.id = "share-fallback";
      fallbackMessage.classList.add("notification", "is-danger", "mt-3");

      fallbackMessage.innerHTML = `
        <button class="delete" aria-label="Cerrar"></button>
        Lo sentimos, la función de compartir no está disponible en tu navegador.<br>
        Puedes copiar esta URL manualmente:
        <span class="has-background-light p-1 is-family-monospace" id="share-url">${this.shareData.url}</span>
        <button id="copyButton" class="button is-small is-link ml-2">Copiar</button>
      `;

      // Insertar el mensaje después del botón de compartir
      this.shareButton.parentNode.insertBefore(
        fallbackMessage,
        this.shareButton.nextSibling
      );

      // Agregar eventos para cerrar y copiar
      fallbackMessage
        .querySelector(".delete")
        .addEventListener("click", () => fallbackMessage.remove());
      fallbackMessage
        .querySelector("#copyButton")
        .addEventListener("click", () => this.copyToClipboard());
    }

    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.shareData.url);
        alert("¡Enlace copiado al portapapeles!");
      } catch (error) {
        console.error("Error al copiar el enlace:", error);
        alert("No se pudo copiar el enlace. Copia manualmente.");
      }
    }
  }

  new ShareManager();
});
