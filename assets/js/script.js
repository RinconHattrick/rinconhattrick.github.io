document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn"); // Solo botón

  if (!nav || !body) return;

  // --- Funcionalidad de Scroll to Top ---

  // Función de desplazamiento suave
  const scrollToTop = () => {
    const scrollStep = window.scrollY / 20; // Ajusta la velocidad
    const smoothScroll = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, -scrollStep);
        requestAnimationFrame(smoothScroll);
      }
    };
    requestAnimationFrame(smoothScroll);
  };

  // Mostrar/ocultar el botón al hacer scroll
  const toggleScrollToTopButton = () => {
    if (scrollToTopBtn) {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex"; // Flex para centrar el ícono
        scrollToTopBtn.classList.add("aFadeIn");
      } else {
        scrollToTopBtn.style.display = "none";
        scrollToTopBtn.classList.remove("aFadeIn");
      }
    }
  };

  if (scrollToTopBtn) {
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
  window.addEventListener("resize", () =>
    requestAnimationFrame(applyNavbarPosition)
  );

  // Manejo del menú hamburguesa
  const toggleAriaExpanded = (element, condition) => {
    if (element) {
      element.setAttribute("aria-expanded", condition);
    }
  };

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isActive = menu.classList.toggle("is-active");
      burger.classList.toggle("is-active");
      toggleAriaExpanded(burger, isActive);
    });
  }

  // Manejo del menú de categorías en móviles
  if (categoryToggle && categoryMenu) {
    categoryToggle.addEventListener("click", (event) => {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        const isActive = categoryMenu.classList.toggle("is-active");
        toggleAriaExpanded(categoryToggle, isActive);
      }
    });
  }

  // Cerrar menús al hacer clic fuera
  document.addEventListener("click", (event) => {
    const clickedOutsideMenu =
      menu &&
      !menu.contains(event.target) &&
      burger &&
      !burger.contains(event.target);
    const clickedOutsideCategory =
      categoryMenu &&
      !categoryMenu.contains(event.target) &&
      categoryToggle &&
      !categoryToggle.contains(event.target);

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
