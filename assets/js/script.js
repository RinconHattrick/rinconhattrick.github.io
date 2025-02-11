document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const toggleScrollToTopButton = () => {
      scrollToTopBtn.classList.toggle("show", window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleScrollToTopButton);
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }

  // --- Funcionalidad del Navbar Responsivo ---

  const applyNavbarPosition = () => {
    const isMobile = window.innerWidth <= 767;
    nav.classList.toggle("is-fixed-top", !isMobile);
    nav.classList.toggle("is-fixed-bottom", isMobile);
    body.classList.toggle("has-navbar-fixed-top", !isMobile);
    body.classList.toggle("has-navbar-fixed-bottom", isMobile);
  };

  applyNavbarPosition();
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(applyNavbarPosition, 200);
  });

  // --- Menú Hamburguesa ---
  const toggleAriaExpanded = (element, state) => {
    if (element) element.setAttribute("aria-expanded", state);
  };

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isActive = menu.classList.toggle("is-active");
      burger.classList.toggle("is-active");
      toggleAriaExpanded(burger, isActive);
    });
  }

  // --- Menú de Categorías en Móvil ---
  if (categoryToggle && categoryMenu) {
    categoryToggle.addEventListener("click", (event) => {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        const isActive = categoryMenu.classList.toggle("is-active");
        toggleAriaExpanded(categoryToggle, isActive);
      }
    });
  }

  // --- Cerrar Menús al Hacer Clic Fuera ---
  document.addEventListener("click", (event) => {
    const clickedOutsideMenu =
      menu && !menu.contains(event.target) && burger && !burger.contains(event.target);
    const clickedOutsideCategory =
      categoryMenu && !categoryMenu.contains(event.target) && categoryToggle && !categoryToggle.contains(event.target);

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
});
