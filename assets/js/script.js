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

  /** Función para alternar clases con un estado opcional */
  const toggleClass = (element, className, state) => {
    if (element) element.classList.toggle(className, state);
  };

  /** Actualiza el atributo aria-expanded */
  const toggleAriaExpanded = (element, state) => {
    if (element) element.setAttribute("aria-expanded", state);
  };

  // === Validación de Búsqueda (mínimo 3 caracteres) ===
  if (searchInput && searchButton) {
    searchInput.addEventListener("input", () => {
      searchButton.disabled = searchInput.value.trim().length < 3;
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && searchInput.value.trim().length < 3) {
        event.preventDefault();
      }
    });
  }

  // === Botón "Scroll to Top" ===
  if (scrollToTopBtn) {
    let isVisible = false;

    const updateScrollButton = () => {
      const shouldShow = window.scrollY > 200;
      if (shouldShow !== isVisible) {
        toggleClass(scrollToTopBtn, "show", shouldShow);
        isVisible = shouldShow;
      }
    };

    window.addEventListener("scroll", updateScrollButton);
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // === Navbar Responsivo ===
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  const updateNavbarPosition = () => {
    const isMobile = mobileQuery.matches;
    toggleClass(nav, "is-fixed-top", !isMobile);
    toggleClass(nav, "is-fixed-bottom", isMobile);
    toggleClass(body, "has-navbar-fixed-top", !isMobile);
    toggleClass(body, "has-navbar-fixed-bottom", isMobile);
  };

  mobileQuery.addEventListener("change", updateNavbarPosition);
  updateNavbarPosition();

  // === Manejo de Menús Interactivos ===
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (burger && menu && (target === burger || burger.contains(target))) {
      const isActive = menu.classList.toggle("is-active");
      toggleClass(burger, "is-active", isActive);
      toggleAriaExpanded(burger, isActive);
      return;
    }

    if (categoryToggle && categoryMenu && (target === categoryToggle || categoryToggle.contains(target))) {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        const isActive = categoryMenu.classList.toggle("is-active");
        toggleAriaExpanded(categoryToggle, isActive);
      }
      return;
    }

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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      toggleClass(menu, "is-active", false);
      toggleClass(burger, "is-active", false);
      toggleAriaExpanded(burger, false);
    }
  });
});
