document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  const toggleClass = (element, className, force) => {
    if (element) element.classList.toggle(className, force);
  };

  const toggleAriaExpanded = (element, state) => {
    if (element) element.setAttribute("aria-expanded", state);
  };

  // --- Botón Scroll to Top ---
  if (scrollToTopBtn) {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const toggleScrollToTopButton = () => {
      toggleClass(scrollToTopBtn, "show", window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleScrollToTopButton);
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }

  // --- Navbar Responsive ---
  const applyNavbarPosition = () => {
    const isMobile = window.innerWidth <= 767;
    toggleClass(nav, "is-fixed-top", !isMobile);
    toggleClass(nav, "is-fixed-bottom", isMobile);
    toggleClass(body, "has-navbar-fixed-top", !isMobile);
    toggleClass(body, "has-navbar-fixed-bottom", isMobile);
  };

  applyNavbarPosition();
  window.addEventListener("resize", () => requestAnimationFrame(applyNavbarPosition));

  // --- Menús Interactivos ---
  document.addEventListener("click", (event) => {
    const target = event.target;

    // Menú Hamburguesa
    if (burger && menu && (target === burger || burger.contains(target))) {
      const isActive = menu.classList.toggle("is-active");
      toggleClass(burger, "is-active", isActive);
      toggleAriaExpanded(burger, isActive);
      return;
    }

    // Menú de Categorías en Móvil
    if (categoryToggle && categoryMenu && (target === categoryToggle || categoryToggle.contains(target))) {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        const isActive = categoryMenu.classList.toggle("is-active");
        toggleAriaExpanded(categoryToggle, isActive);
      }
      return;
    }

    // Cerrar Menús al hacer clic fuera
    if (menu && !menu.contains(target) && burger && !burger.contains(target)) {
      toggleClass(menu, "is-active", false);
      toggleClass(burger, "is-active", false);
      toggleAriaExpanded(burger, false);
    }

    if (categoryMenu && !categoryMenu.contains(target) && categoryToggle && !categoryToggle.contains(target)) {
      toggleClass(categoryMenu, "is-active", false);
      toggleAriaExpanded(categoryToggle, false);
    }
  });
});
