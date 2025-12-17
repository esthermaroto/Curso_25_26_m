export default function crearEjercicio14() {
  let favorites = new Map();
  let fav;
  // header
  const createHeader = () => {
    const header = document.createElement("header");
    header.classList.add("header");
    const titulo = document.createElement("h1");
    titulo.textContent = "Catálogo de películas";
    const subtitulo = document.createElement("h6");
    subtitulo.textContent = "Escoge tus favoritas";
    header.appendChild(titulo);
    header.appendChild(subtitulo);

    return header;
  };

  // footer
  const createFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    const author = document.createElement("p");
    author.textContent = "Esther Maroto Torres";
    footer.appendChild(author);

    return footer;
  };

  // muestra de resultado de la búsqueda
  const createResultContainer = () => {
    const resultsContainer = document.createElement("div");
    return { resultsContainer };
  };
  //----------------------------------------------------------

  // formulario de datos de búsqueda
  const createSearchCard = () => {
    const formularioContainer = document.createElement("div");
    const selectGen = document.createElement("select");
    selectGen.id = "selecciona-genero";
    formularioContainer.appendChild(selectGen);

    return {
      formularioContainer,
      selectGen,
    };
  };

  // cards de info de las peliculas
  const createMovieCard = (m) => {
    const card = document.createElement("div");
    const poster = document.createElement("img");
    poster.alt = `Poster ${m.titulo}`;
    poster.src = m.poster;
    const title = document.createElement("h5");
    title.textContent = m.titulo;
    const rating = document.createElement("p");
    rating.textContent = `${getStars(m.rating)} ${m.rating}/10`;
    card.appendChild(poster);
    card.appendChild(title);
    card.appendChild(rating);

    card.addEventListener("click", () => {
      addToFav(m);
    });

    card.addEventListener("dblclick", () => {
      removeFormFav(m.id);
    });

    return card;
  };

  // lista de guadados de favoritas
  const createListFav = () => {
    const cardFav = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = "Favoritos";
    const list = document.createElement("ul");
    cardFav.appendChild(title);
    cardFav.appendChild(list);
    cardFav.list = list;

    return cardFav;
  };

  // lleno del select
  const loadSelect = async (select) => {
    const response = await fetch("http://localhost:1493/peliculas");
    const movies = await response.json();
    const generes = [...new Set(movies.map((g) => g.genero))];
    console.log(movies);

    generes.forEach((g) => {
      const option = document.createElement("option");
      option.value = g;
      option.textContent = g;
      select.appendChild(option);
    });
  };

  // lógica
  const performSearch = async (search, results) => {
    const generoSeleccionado = search.selectGen.value;

    const response = await fetch("http://localhost:1493/peliculas");
    const movies = await response.json();

    const peliculasfiltradas = movies.filter(
      (m) => m.genero === generoSeleccionado
    );

    results.resultsContainer.textContent = "";

    peliculasfiltradas.forEach((m) => {
      const card = createMovieCard(m);
      results.resultsContainer.appendChild(card);
    });
  };

  const getStars = (rating) => {
    return `⭐`.repeat(Math.floor(rating));
  };

  const saveFavorites = () => {
    localStorage.setItem("favoritos", JSON.stringify([...favorites.values()]));
  };

  const addToFav = (movie) => {
    if (!favorites.has(movie.id)) {
      favorites.set(movie.id, movie);
      saveFavorites();
      updateFav();
    }
  };

  const removeFormFav = (id) => {
    const movie = favorites.get(id);
    if (movie && confirm(`¿Quieres eliminar "${movie.titulo}" de favoritos?`)) {
      if (favorites.has(id)) {
        favorites.delete(id);
        saveFavorites();
        updateFav();
      }
    }
  };

  const updateFav = () => {
    fav.list.textContent = "";
    favorites.forEach((movie) => {
      const card = createMovieCard(movie);
      fav.list.appendChild(card);
    });
  };

  const render = () => {
    const container = document.createElement("div");
    container.classList.add("movies-container");

    const header = createHeader();
    const footer = createFooter();
    const search = createSearchCard();
    const results = createResultContainer();
    fav = createListFav();

    const favGuardado = localStorage.getItem("favoritos");
    if (favGuardado) {
      JSON.parse(favGuardado).forEach((m) => favorites.set(m.id, m));
      updateFav();
    }

    search.selectGen.addEventListener("change", () => {
      performSearch(search, results);
    });

    loadSelect(search.selectGen);

    const main = document.createElement("div");
    main.appendChild(search.formularioContainer);
    main.appendChild(results.resultsContainer);
    main.appendChild(fav);

    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    return container;
  };

  return {
    render,
  };
}
