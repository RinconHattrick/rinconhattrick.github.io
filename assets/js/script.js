document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const body = document.body;
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const categoryToggle = document.getElementById("category-toggle");
  const categoryMenu = document.getElementById("category-menu");

  if (!nav || !body) return;

  // Aplicar posición fija al navbar sin causar salto visual
  const applyNavbarPosition = () => {
    const isMobile = window.innerWidth <= 767;
    if (isMobile) {
      nav.classList.remove("is-fixed-top");
      nav.classList.add("is-fixed-bottom");
      body.classList.remove("has-navbar-fixed-top");
      body.classList.add("has-navbar-fixed-bottom");
    } else {
      nav.classList.add("is-fixed-top");
      nav.classList.remove("is-fixed-bottom");
      body.classList.add("has-navbar-fixed-top");
      body.classList.remove("has-navbar-fixed-bottom");
    }
  };

  applyNavbarPosition();
  window.addEventListener("resize", applyNavbarPosition);

  // Toggle del menú hamburguesa
  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("is-active");
      burger.classList.toggle("is-active");
      burger.setAttribute(
        "aria-expanded",
        menu.classList.contains("is-active")
      );
    });

    // Cerrar el menú si se hace clic fuera
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !burger.contains(event.target)) {
        menu.classList.remove("is-active");
        burger.classList.remove("is-active");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Toggle del menú de categorías en móviles
  if (categoryToggle && categoryMenu) {
    categoryToggle.addEventListener("click", (event) => {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        categoryMenu.classList.toggle("is-active");
        categoryToggle.setAttribute(
          "aria-expanded",
          categoryMenu.classList.contains("is-active")
        );
      }
    });

    // Cerrar el menú de categorías si se toca fuera
    document.addEventListener("click", (event) => {
      if (
        !categoryMenu.contains(event.target) &&
        !categoryToggle.contains(event.target)
      ) {
        categoryMenu.classList.remove("is-active");
        categoryToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});
