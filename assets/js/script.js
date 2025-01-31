document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.querySelector("body");

  if (!nav || !body) return; // Evita ejecutar si no existen los elementos

  const updateNavbarPosition = () => {
    const isMobile = window.innerWidth <= 767;
    nav.classList.toggle("is-fixed-top", !isMobile);
    nav.classList.toggle("is-fixed-bottom", isMobile);
    body.classList.toggle("has-navbar-fixed-top", !isMobile);
    body.classList.toggle("has-navbar-fixed-bottom", isMobile);
  };

  updateNavbarPosition();
  window.addEventListener("resize", updateNavbarPosition);

  const scrollToTopLink = document.querySelector('a[href="#main-header"]');
  if (scrollToTopLink) {
    scrollToTopLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

