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

  /** Forzar repintado (soluciona problemas visuales) */
  const forceRepaint = (element) => {
    element.style.display = "none";
    element.offsetHeight; // Forzar reflujo
    element.style.display = "";
  };

  /** === Validación de búsqueda (mínimo 3 caracteres) === */
  if (searchInput && searchButton) {
    const validateSearch = () => {
      searchButton.disabled = searchInput.value.trim().length < 3;
    };

    searchInput.addEventListener("input", validateSearch);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && searchInput.value.trim().length < 3) {
        event.preventDefault();
      }
    });
  }

  /** === Botón "Scroll to Top" === */
  if (scrollToTopBtn) {
    let isVisible = false;

    const updateScrollButton = () => {
      const shouldShow = window.scrollY > 200;
      if (shouldShow !== isVisible) {
        toggleClass(scrollToTopBtn, "show", shouldShow);
        isVisible = shouldShow;
      }
    };

    window.addEventListener("scroll", () => requestAnimationFrame(updateScrollButton));
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /** === Navbar Responsiva === */
  const updateNavbarPosition = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    toggleClass(nav, "is-fixed-top", !isMobile);
    toggleClass(nav, "is-fixed-bottom", isMobile);
    toggleClass(body, "has-navbar-fixed-top", !isMobile);
    toggleClass(body, "has-navbar-fixed-bottom", isMobile);
    forceRepaint(nav);
  };

  window.addEventListener("resize", () => requestAnimationFrame(updateNavbarPosition));
  updateNavbarPosition();

  /** === Manejo de Menús Interactivos === */
  document.addEventListener("click", (event) => {
    const target = event.target;

    // Alternar el menú de hamburguesa
    if (burger && menu && (target === burger || burger.contains(target))) {
      const isActive = menu.classList.toggle("is-active");
      toggleClass(burger, "is-active", isActive);
      toggleAriaExpanded(burger, isActive);
      return;
    }

    // Alternar el menú de categorías (solo en móvil)
    if (categoryToggle && categoryMenu && (target === categoryToggle || categoryToggle.contains(target))) {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        const isActive = categoryMenu.classList.toggle("is-active");
        toggleAriaExpanded(categoryToggle, isActive);
      }
      return;
    }

    // Cerrar menús cuando se hace clic fuera
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

  // Cerrar menú en pantallas grandes al redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      toggleClass(menu, "is-active", false);
      toggleClass(burger, "is-active", false);
      toggleAriaExpanded(burger, false);
    }
  });
  const themeToggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "theme";
  const SYSTEM_THEME = "system";
  const DEFAULT_THEME = "light";

  let currentTheme = localStorage.getItem(STORAGE_KEY) || SYSTEM_THEME;

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.innerHTML = theme === "dark" ? "🌙" : "🌞";
    localStorage.setItem(STORAGE_KEY, theme);
  };

  // Detectar el tema del sistema
  const detectOSTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Aplicar tema guardado o el del sistema
  if (currentTheme === SYSTEM_THEME) {
    currentTheme = detectOSTheme();
  }
  applyTheme(currentTheme);

  // Alternar el tema al hacer clic
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
  });

  // Escuchar cambios en la preferencia del sistema
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (localStorage.getItem(STORAGE_KEY) === SYSTEM_THEME) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

});
