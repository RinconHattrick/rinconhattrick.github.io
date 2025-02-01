document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.querySelector("body");

  if (!nav || !body) return;

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

  // Funcionalidad del menú móvil
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");

  burger?.addEventListener("click", () => {
    const isExpanded = burger.getAttribute("aria-expanded") === "true";

    burger.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("is-active");
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    const isClickInside =
      burger?.contains(e.target) || menu?.contains(e.target);

    if (!isClickInside && menu?.classList.contains("is-active")) {
      menu.classList.remove("is-active");
      burger?.setAttribute("aria-expanded", "false");
    }
  });
});
