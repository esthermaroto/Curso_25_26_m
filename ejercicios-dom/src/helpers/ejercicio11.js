export default function ejercicio11() {
  const state = {
    cache: new Map(),
    isLoading: false,
  };

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const search = async (name) => {
    // normalizar la busqueda
    const term = name.toLowerCase().trim();

    //comprobar en caché
    if (state.cache.has(term)) {
      return state.cache.get(term);
    }

    // fetch + validación
    const url = import.meta.env.VITE_URL_API_RM + term;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al hacer fetching");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error("Error: ", data.error);
      }

      // guardar caché
      state.cache.set(term, data.results);

      return data.results;
    } catch (err) {
      console.log("Error: ", err);
      throw err;
    }
  };
  const displayCharacters = (charactersArray) => {
    const container = document.createElement("div");
    container.classList.add("movies-container");

    charactersArray.forEach((character) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      //imagen
      const img = document.createElement("img");
      img.src = character.image;
      img.alt = character.name;
      img.classList.add("character-image");
      card.appendChild(img);

      //nombre
      const nombre = document.createElement("h3");
      nombre.textContent = character.name;
      card.appendChild(nombre);

      //estado
      const estado = document.createElement("p");
      estado.textContent = character.status;
      card.appendChild(estado);

      //especie
      const especie = document.createElement("p");
      especie.textContent = character.species;
      card.appendChild(especie);

      //origen
      const origen = document.createElement("p");
      origen.textContent = character.origin.name;
      card.appendChild(origen);

      container.appendChild(card);
    });

    return container;
  };
  const displayLoading = (container) => {
    state.isLoading = true;
    container.innerHTML
  };
  const render = () => {};
  //   return (
  //     <div>ejercicio11</div>
  //   )
}
