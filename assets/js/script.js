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

  /** Alterna una clase con un estado opcional */
  const toggleClass = (element, className, state) => {
    if (element) element.classList.toggle(className, state);
  };

  /** Actualiza el atributo aria-expanded */
  const toggleAriaExpanded = (element, state) => {
    if (element) element.setAttribute("aria-expanded", state);
  };

  /** === Validación de búsqueda optimizada === */
  if (searchInput && searchButton) {
    let timeout;
    const validateSearch = () => {
      searchButton.disabled = searchInput.value.trim().length < 3;
    };

    const debounce =
      (func, delay = 300) =>
      (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };

    searchInput.addEventListener("input", debounce(validateSearch));
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && searchInput.value.trim().length < 3) {
        event.preventDefault();
      }
    });
  }

  /** === Botón "Scroll to Top" === */
  if (scrollToTopBtn) {
    const updateScrollButton = () => {
      toggleClass(scrollToTopBtn, "show", window.scrollY > 200);
    };

    window.addEventListener("scroll", updateScrollButton);
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /** === Navbar Responsiva === */
  const updateNavbarPosition = () => {
    const isMobile = window.innerWidth <= 767;
    ["is-fixed-top", "has-navbar-fixed-top"].forEach((cls) => toggleClass(nav, cls, !isMobile));
    ["is-fixed-bottom", "has-navbar-fixed-bottom"].forEach((cls) => toggleClass(nav, cls, isMobile));
  };

  new ResizeObserver(updateNavbarPosition).observe(document.documentElement);
  updateNavbarPosition();

  /** === Manejo de Menús Interactivos === */
  document.addEventListener("click", (event) => {
    const target = event.target;
    const isMobileView = window.innerWidth <= 1024;

    // Alternar menú de hamburguesa
    if (burger && menu && target.closest(".navbar-burger")) {
      const isActive = menu.classList.toggle("is-active");
      toggleClass(burger, "is-active", isActive);
      toggleAriaExpanded(burger, isActive);
      return;
    }

    // Alternar menú de categorías en vista móvil
    if (categoryToggle && categoryMenu && target.closest("#category-toggle") && isMobileView) {
      event.preventDefault();
      const isActive = categoryMenu.classList.toggle("is-active");
      toggleAriaExpanded(categoryToggle, isActive);
      return;
    }

    // Cerrar menús al hacer clic fuera
    [menu, categoryMenu].forEach((menuEl, i) => {
      const toggleEl = i === 0 ? burger : categoryToggle;
      if (menuEl && toggleEl && !menuEl.contains(target) && !toggleEl.contains(target)) {
        toggleClass(menuEl, "is-active", false);
        toggleAriaExpanded(toggleEl, false);
      }
    });
  });

  // Cerrar menú en pantallas grandes al redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      ["is-active"].forEach((cls) => {
        toggleClass(menu, cls, false);
        toggleClass(burger, cls, false);
      });
      toggleAriaExpanded(burger, false);
    }
  });
});
