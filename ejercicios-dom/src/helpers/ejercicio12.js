import fetching from "../utils/feching";

export default function crearEjercicio12() {
  const header = document.createElement("header");
  header.classList.add("header");

  const title = document.createElement("h1");
  title.textContent = "Aplicación del Clima";
  title.classList.add("h1");

  const subtitle = document.createElement("h2");
  subtitle.textContent = "Consulta el clima de tus ciudades favoritas";
  subtitle.classList.add("h2");

  header.appendChild(title);
  header.appendChild(subtitle);

  const maincontainer = document.createElement("main");
  maincontainer.classList.add("main-container");

  const favorites = new Map(
    Object.entries(localStorage).map(([k, v]) => [k, v])
  );

  const createSearchCard = () => {
    const searchCard = document.createElement("div");
    searchCard.classList.add("search-card");

    const form = document.createElement("form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ingresa el nombre de la ciudad";
    input.classList.add("input-city");

    const button = document.createElement("button");
    button.textContent = "Buscar";
    button.type = "submit";

    form.appendChild(input);
    form.appendChild(button);
    searchCard.appendChild(form);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const city = input.value.trim();
      if (!city) return;

      const existing = document.querySelector(".weather-card");
      if (existing) existing.remove();

      const newCard = await createWeatherCard(city);
      maincontainer.appendChild(newCard);

      input.value = "";
    });

    return searchCard;
  };

  const addToFavorites = (city) => {
    if (!favorites.has(city)) {
      favorites.set(city, city);
      localStorage.setItem(city, city);
      renderFavorites();
    }
  };

  const removeFromFavorites = (city) => {
    if (confirm(`¿Quitar ${city} de favoritos?`)) {
      favorites.delete(city);
      localStorage.removeItem(city);
      renderFavorites();
    }
  };

  const createWeatherCard = async (city) => {
    const API_KEY = "3c50c177012bbb612730e25d7e9800a7";
    const data = await fetching(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=es`
    );
    console.log(data)

    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    const card = document.createElement("div");
    card.classList.add("weather-card-content");

    const icon = document.createElement("img");
    const iconCode = data.weather?.[0]?.icon ?? "01d";
    icon.src = `./assets/${iconCode}.png`;
    icon.alt = data.weather?.[0]?.description ?? "Icono del clima";

    const cityName = document.createElement("h2");
    cityName.textContent = data.name;

    const temperature = document.createElement("p");
    temperature.classList.add("temperature");
    temperature.textContent = `${Math.round(data.main.temp - 273.15)} °C`;

    const weatherText = document.createElement("p");
    weatherText.classList.add("weather-info");
    weatherText.textContent = data.weather?.[0]?.description ?? "";

    card.appendChild(icon);
    card.appendChild(cityName);
    card.appendChild(temperature);
    card.appendChild(weatherText);

    card.addEventListener("dblclick", () => addToFavorites(data.name));
    card.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      removeFromFavorites(data.name);
    });

    weatherCard.appendChild(card);
    return weatherCard;
  };

  const createFavoritesCard = () => {
    const favoritesCard = document.createElement("div");
    favoritesCard.classList.add("favorites-card");

    const title = document.createElement("h3");
    title.textContent = "Favoritos";
    favoritesCard.appendChild(title);

    const list = document.createElement("div");
    list.classList.add("fav-list");
    favoritesCard.appendChild(list);

    favoritesCard.list = list;
    return favoritesCard;
  };

  const favoritesCard = createFavoritesCard();

  const renderFavorites = () => {
    favoritesCard.list.innerHTML = "";

    favorites.forEach(async (value) => {
      const card = await createWeatherCard(value);
      favoritesCard.list.appendChild(card);
    });
  };

  renderFavorites();

  const footer = document.createElement("footer");
  footer.textContent = "© 2024 Aplicación del Clima. Todos los derechos reservados.";
  footer.classList.add("footer");

  const render = () => {
    const appContainer = document.createElement("div");
    appContainer.classList.add("app-container");

    maincontainer.innerHTML = "";
    maincontainer.appendChild(createSearchCard());
    maincontainer.appendChild(favoritesCard);

    appContainer.appendChild(header);
    appContainer.appendChild(maincontainer);
    appContainer.appendChild(footer);

    return appContainer;
  };

  return {
    render,
  };
}
