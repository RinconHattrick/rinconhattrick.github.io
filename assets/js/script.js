document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const scrollToTopLink = document.querySelector('a[href="#main-header"]');

  if (!nav || !body) return;

  // Función para actualizar la posición del navbar según el tamaño de la pantalla
  const applyNavbarPosition = () => {
    const isMobile = window.innerWidth <= 767;
    nav.classList.toggle("is-fixed-top", !isMobile);
    nav.classList.toggle("is-fixed-bottom", isMobile);
    body.classList.toggle("has-navbar-fixed-top", !isMobile);
    body.classList.toggle("has-navbar-fixed-bottom", isMobile);
  };

  applyNavbarPosition();
  window.addEventListener("resize", () =>
    requestAnimationFrame(applyNavbarPosition)
  );

  // Función para cambiar el atributo aria-expanded
  const toggleAriaExpanded = (element, condition) => {
    if (element) {
      element.setAttribute("aria-expanded", condition);
    }
  };

  // Manejo del menú hamburguesa
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isActive = menu.classList.toggle("is-active");
      burger.classList.toggle("is-active");
      toggleAriaExpanded(burger, isActive);
    });
  }

  // Manejo del menú de categorías en móviles
  if (categoryToggle && categoryMenu) {
    categoryToggle.addEventListener("click", (event) => {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        const isActive = categoryMenu.classList.toggle("is-active");
        toggleAriaExpanded(categoryToggle, isActive);
      }
    });
  }

  // Cerrar menús al hacer clic fuera
  document.addEventListener("click", (event) => {
    const clickedOutsideMenu =
      menu &&
      !menu.contains(event.target) &&
      burger &&
      !burger.contains(event.target);
    const clickedOutsideCategory =
      categoryMenu &&
      !categoryMenu.contains(event.target) &&
      categoryToggle &&
      !categoryToggle.contains(event.target);

    if (clickedOutsideMenu) {
      menu.classList.remove("is-active");
      burger.classList.remove("is-active");
      toggleAriaExpanded(burger, false);
    }

    if (clickedOutsideCategory) {
      categoryMenu.classList.remove("is-active");
      toggleAriaExpanded(categoryToggle, false);
    }
  });

  // Scroll suave al hacer clic en el enlace de "Ir arriba"
  if (scrollToTopLink) {
    scrollToTopLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Compartir artículo
  class ShareManager {
    constructor() {
      this.shareButton = document.getElementById("shareButton");
      this.shareData = {
        title: document.title, // Usa el título de la página
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