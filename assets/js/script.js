document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const scrollToTopLink = document.querySelector('a[href="#main-header"]');

  if (!nav || !body) return;

  // Función para actualizar la posición del navbar según el tamaño de la pantalla
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

  // Función para cambiar el atributo aria-expanded
  const toggleAriaExpanded = (element, condition) => {
    if (element) {
      element.setAttribute("aria-expanded", condition);
    }
  };

  // Manejo del menú hamburguesa
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

  // Scroll suave al hacer clic en el enlace de "Ir arriba"
  if (scrollToTopLink) {
    scrollToTopLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
