document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  /** Alterna clases con un estado opcional */
  const toggleClass = (element, className, state) => {
    if (element) element.classList.toggle(className, state);
  };

  /** Actualiza el atributo aria-expanded */
  const toggleAriaExpanded = (element, state) => {
    if (element) element.setAttribute("aria-expanded", state);
  };

  /** Valida si la búsqueda es válida */
  const validateSearch = () => {
    const isValid = searchInput.value.trim().length >= 3;
    searchButton.disabled = !isValid;
  };

  /** Muestra u oculta el botón "Scroll to Top" */
  let isVisible = false;
  const updateScrollButton = () => {
    requestAnimationFrame(() => {
      const shouldShow = window.scrollY > 200;
      if (shouldShow !== isVisible) {
        toggleClass(scrollToTopBtn, "show", shouldShow);
        isVisible = shouldShow;
      }
    });
  };

  /** Ajusta la posición del navbar según el tamaño de pantalla */
  const updateNavbarPosition = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    toggleClass(nav, "is-fixed-top", !isMobile);
    toggleClass(nav, "is-fixed-bottom", isMobile);
    toggleClass(body, "has-navbar-fixed-top", !isMobile);
    toggleClass(body, "has-navbar-fixed-bottom", isMobile);
  };

  /** Cierra los menús abiertos cuando se hace clic fuera de ellos */
  const closeMenusOnClickOutside = (event) => {
    const { target } = event;

    // Cerrar el menú de navegación
    if (menu && !menu.contains(target) && burger && !burger.contains(target)) {
      toggleClass(menu, "is-active", false);
      toggleClass(burger, "is-active", false);
      toggleAriaExpanded(burger, false);
    }

    // Cerrar el menú de categorías
    if (categoryMenu && !categoryMenu.contains(target) && categoryToggle && !categoryToggle.contains(target)) {
      toggleClass(categoryMenu, "is-active", false);
      toggleAriaExpanded(categoryToggle, false);
    }
  };

  /** Manejador del menú de navegación */
  const toggleNavbarMenu = () => {
    const isActive = menu.classList.toggle("is-active");
    toggleClass(burger, "is-active", isActive);
    toggleAriaExpanded(burger, isActive);
  };

  /** Manejador del menú de categorías en pantallas pequeñas */
  const toggleCategoryMenu = (event) => {
    if (window.innerWidth <= 1024) {
      event.preventDefault();
      const isActive = categoryMenu.classList.toggle("is-active");
      toggleAriaExpanded(categoryToggle, isActive);
    }
  };

  /** Scroll al top de la página */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** Debounce para evitar llamadas constantes en eventos de `resize` */
  let resizeTimeout;
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 1024) {
        toggleClass(menu, "is-active", false);
        toggleClass(burger, "is-active", false);
        toggleAriaExpanded(burger, false);
      }
    }, 200);
  };

  // === Agregar Listeners ===

  // Validación de búsqueda
  if (searchInput && searchButton) {
    searchInput.addEventListener("input", validateSearch);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && searchInput.value.trim().length < 3) {
        event.preventDefault();
      }
    });
  }

  // Botón "Scroll to Top"
  if (scrollToTopBtn) {
    window.addEventListener("scroll", updateScrollButton);
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }

  // Navbar responsivo
  window.addEventListener("resize", onResize);
  updateNavbarPosition();

  // Menús interactivos
  document.addEventListener("click", closeMenusOnClickOutside);
  if (burger && menu) burger.addEventListener("click", toggleNavbarMenu);
  if (categoryToggle && categoryMenu) categoryToggle.addEventListener("click", toggleCategoryMenu);
});
