document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const navbar = document.querySelector("nav"),
    body = document.body,
    burger = document.querySelector(".navbar-burger"),
    menu = document.querySelector(".navbar-menu"),
    scrollBtn = document.getElementById("scrollToTopBtn"),
    searchInput = document.getElementById("searchInput"),
    searchButton = document.getElementById("searchButton"),
    themeToggle = document.getElementById("themeToggle");

  // Constantes para el tema
  const THEME_KEY = "theme",
    SYSTEM_THEME = "system",
    userTheme = localStorage.getItem(THEME_KEY) || SYSTEM_THEME;

  /** 
   * Función para alternar una clase en un elemento 
   */
  const toggleClass = (element, className, state) => {
    if (element) element.classList.toggle(className, state);
  };

  /** 
   * Función para cambiar el estado de aria-expanded 
   */
  const setAriaExpanded = (element, state) => {
    if (element) element.setAttribute("aria-expanded", state);
  };

  /** 
   * Recalcular estilos ocultos para forzar actualización del navegador 
   */
  const forceRepaint = (element) => {
    if (element) {
      element.style.display = "none";
      element.offsetHeight; // Fuerza el repaint
      element.style.display = "";
    }
  };

  /**
   * Funcionalidad del botón de búsqueda
   */
  if (searchInput && searchButton) {
    searchButton.disabled = true;

    searchInput.addEventListener("input", () => {
      searchButton.disabled = searchInput.value.trim().length < 3;
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && searchInput.value.trim().length < 3) {
        event.preventDefault();
      }
    });
  }

  /**
   * Funcionalidad del botón de volver arriba
   */
  if (scrollBtn) {
    let isVisible = false;

    const toggleScrollButton = () => {
      const shouldBeVisible = window.scrollY > 200;
      if (shouldBeVisible !== isVisible) {
        toggleClass(scrollBtn, "show", shouldBeVisible);
        isVisible = shouldBeVisible;
      }
    };

    window.addEventListener("scroll", toggleScrollButton);

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * Manejo de la posición del navbar en móviles
   */
  const updateNavbarPosition = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    toggleClass(navbar, "is-fixed-top", !isMobile);
    toggleClass(navbar, "is-fixed-bottom", isMobile);
    toggleClass(body, "has-navbar-fixed-top", !isMobile);
    toggleClass(body, "has-navbar-fixed-bottom", isMobile);

    forceRepaint(navbar);
  };

  window.addEventListener("resize", updateNavbarPosition);
  updateNavbarPosition();

  /**
   * Manejo del menú en dispositivos móviles
   */
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (burger && menu) {
      const isMenuClick = target === burger || burger.contains(target);
      if (isMenuClick) {
        const isActive = menu.classList.toggle("is-active");
        toggleClass(burger, "is-active", isActive);
        setAriaExpanded(burger, isActive);
        return;
      }
    }

    // Cierra el menú si se hace clic fuera
    if (menu && !menu.contains(target) && burger && !burger.contains(target)) {
      toggleClass(menu, "is-active", false);
      toggleClass(burger, "is-active", false);
      setAriaExpanded(burger, false);
    }
  });

  // Asegurar que el menú se cierre en pantallas grandes al redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      toggleClass(menu, "is-active", false);
      toggleClass(burger, "is-active", false);
      setAriaExpanded(burger, false);
    }
  });

  /**
   * Gestión del tema oscuro/claro
   */
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === "dark" ? "🌙" : "☀️";
    }
    localStorage.setItem(THEME_KEY, theme);
  };

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  let currentTheme = userTheme === SYSTEM_THEME ? getSystemTheme() : userTheme;
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      if (localStorage.getItem(THEME_KEY) === SYSTEM_THEME) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });
  }
});
