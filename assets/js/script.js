document.addEventListener("DOMContentLoaded", () => {
  // Actualizar la posición de la barra de navegación
  const updateNavbarPosition = () => {
    const nav = document.querySelector("nav");
    const body = document.querySelector("body");

    if (nav && body) {
      if (window.innerWidth <= 767) {
        nav.classList.remove("is-fixed-top");
        nav.classList.add("is-fixed-bottom");
        body.classList.remove("has-navbar-fixed-top");
        body.classList.add("has-navbar-fixed-bottom");
      } else {
        nav.classList.remove("is-fixed-bottom");
        nav.classList.add("is-fixed-top");
        body.classList.remove("has-navbar-fixed-bottom");
        body.classList.add("has-navbar-fixed-top");
      }
    } else {
      console.warn("No se encontró el elemento <nav> o <body> en el DOM.");
    }
  };

  updateNavbarPosition();
  window.addEventListener("resize", updateNavbarPosition);

  const scrollToTopLink = document.querySelector('a[href="#main-header"]');
  if (scrollToTopLink) {
    scrollToTopLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } else {
    console.warn("No se encontró el enlace con href='#main-header'.");
  }
});
