class SearchManager {
  constructor() {
    this.searchJsonUrl = "/assets/json/search.json";
    this.searchInput = document.getElementById("search-input");
    this.feedbackElement = document.getElementById("search-feedback");
    this.resultsContainer = document.getElementById("search-results");

    if (this.searchInput) {
      this.init();
    }
  }

  init() {
    this.searchInput.addEventListener(
      "input",
      this.debounce((e) => this.handleInput(e.target.value.trim()), 300)
    );

    const queryParams = new URLSearchParams(window.location.search);
    const initialQuery = queryParams.get("q");

    if (initialQuery) {
      this.searchInput.value = initialQuery;
      this.search(initialQuery);
    }
  }

  handleInput(query) {
    if (query.length < 3) {
      this.clearResults();
      this.showFeedback(
        "Escribe al menos 3 caracteres para buscar.",
        "is-info"
      );
      return;
    }

    this.updateURL(query);
    this.search(query);
  }

  updateURL(query) {
    const url = new URL(window.location);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url);
  }

  showFeedback(message, type = "is-primary") {
    if (!this.feedbackElement) return;
    this.feedbackElement.innerHTML = `
      <span class="icon" aria-hidden="true">
        <i class="fas fa-info-circle"></i>
      </span> ${message}
    `;
    this.feedbackElement.classList.remove(
      "is-hidden",
      "is-danger",
      "is-primary",
      "is-info"
    );
    this.feedbackElement.classList.add(type);
  }

  hideFeedback() {
    if (this.feedbackElement) {
      this.feedbackElement.classList.add("is-hidden");
    }
  }

  clearResults() {
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = "";
    }
  }

  renderResults(results, query) {
    if (!this.resultsContainer) return;
    this.clearResults();

    if (!results.length) {
      this.showFeedback("No se encontraron resultados.", "is-danger");
      return;
    }

    results.forEach((item) => {
      const article = document.createElement("div");
      article.className = "column is-12-tablet is-6-desktop";
      article.innerHTML = `
        <article class="box">
          <time datetime="${item.date}" class="is-size-7 has-text-grey">
            <span class="icon-text">
              <span class="icon" aria-hidden="true">
                <i class="fas fa-calendar-day"></i>
              </span>
              <span>${item.date}</span>
            </span>
          </time>

          <h3 class="title is-5 mt-2">
            <a href="${item.url}" class="has-text-primary">
              ${this.highlightMatch(item.title, query)}
            </a>
          </h3>

          <p class="mt-2">
            ${
              item.excerpt
                ? this.truncateText(
                    this.highlightMatch(item.excerpt, query),
                    300
                  )
                : ""
            }
          </p>
        </article>
      `;
      this.resultsContainer.appendChild(article);
    });
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      '<mark class="has-background-warning">$1</mark>'
    );
  }

  truncateText(text, length) {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  async search(query) {
    this.showFeedback(
      '<span class="icon"><i class="fas fa-spinner fa-spin"></i></span> Cargando resultados...'
    );

    try {
      const response = await fetch(this.searchJsonUrl);
      if (!response.ok)
        throw new Error("Error al cargar los datos de búsqueda");

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Formato incorrecto de datos");

      const results = data
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => this.rankResults(a, b, query));

      this.renderResults(results, query);
      this.hideFeedback();
    } catch (error) {
      console.error(error);
      this.showFeedback(
        "No se pudieron obtener los resultados. Inténtalo más tarde.",
        "is-danger"
      );
    }
  }

  rankResults(a, b, query) {
    query = query.toLowerCase();
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

    if (aTitle === query) return -1;
    if (bTitle === query) return 1;

    if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1;
    if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1;

    if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
    if (!aTitle.includes(query) && bTitle.includes(query)) return 1;

    return 0;
  }
}

// Ejecutar solo en la página de búsqueda
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("search-input")) {
    new SearchManager();
  }
});
