document.addEventListener("DOMContentLoaded", () => {
  // Actualizar la posición de la barra de navegación
  const updateNavbarPosition = () => {
    const nav = document.querySelector("nav");
    const body = document.querySelector("body");

    if (nav && body) {
      if (window.innerWidth <= 767) {
        // Cambiar clases para pantallas pequeñas
        nav.classList.remove("is-fixed-top");
        nav.classList.add("is-fixed-bottom");
        body.classList.remove("has-navbar-fixed-top");
        body.classList.add("has-navbar-fixed-bottom");
      } else {
        // Cambiar clases para pantallas grandes
        nav.classList.remove("is-fixed-bottom");
        nav.classList.add("is-fixed-top");
        body.classList.remove("has-navbar-fixed-bottom");
        body.classList.add("has-navbar-fixed-top");
      }
    } else {
      console.warn("No se encontró el elemento <nav> o <body> en el DOM.");
    }
  };

  // Ejecutar la función al cargar la página y al redimensionar
  updateNavbarPosition();
  window.addEventListener("resize", updateNavbarPosition);

  // Manejo del menú hamburguesa
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector("#navbarMenu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isActive = burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
      burger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  } else {
    console.warn(
      "No se encontró el menú hamburguesa o el contenedor del menú."
    );
  }

  // Enlace para volver al principio
  const scrollToTopLink = document.querySelector('a[href="#top"]');
  if (scrollToTopLink) {
    scrollToTopLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } else {
    console.warn("No se encontró el enlace con href='#top'.");
  }
});
