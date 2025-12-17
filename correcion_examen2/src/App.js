export const createApp = () => {
  const app = document.getElementById("app");

  const header = document.createElement("header");
  header.className = "header";
  const title = document.createElement("h1");
  title.textContent = "MovieFlix Eshter Maroto";
  header.appendChild(title);

  // contenedor principal
  const main = document.createElement("main");
  main.className = "main-container";

  const filterContainer = document.createElement("div");
  filterContainer.className = "filters-container";

  const searchContainer = document.createElement("div");
  searchContainer.className = 'search-container'

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "search-input";
  searchInput.placeholder = "Buscar...";

  const sortInput = document.createElement("input");
  sortInput.type = "select";
  sortInput.className = "sort-container";

  filterContainer.appendChild(searchInput);
  filterContainer.appendChild(sortInput)
  main.appendChild(filterContainer);
  

  app.appendChild(header);
  app.appendChild(main);
};
