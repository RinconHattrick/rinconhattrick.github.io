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
      // Crear un mensaje de fallback dentro de la página en lugar de usar 'alert'
      const message = document.createElement("div");
      message.classList.add("notification", "is-danger");
      message.innerHTML = `
        <button class="delete"></button>
        Lo sentimos, la función de compartir no está disponible en tu navegador.<br />
        Puedes copiar esta URL manualmente: <a href="${this.shareData.url}" target="_blank">${this.shareData.url}</a>
      `;

      document.body.appendChild(message);
    }
  }

  new ShareManager();
});
