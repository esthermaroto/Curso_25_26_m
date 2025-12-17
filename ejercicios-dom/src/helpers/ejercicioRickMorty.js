export default function createEjercicioRickMorty() {
  //closure
  const cache = new Map();

  // debounce
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  //fetching data from Rick and Morty API
  const searchAPI = async (name) => {
    //nomalización de la busqueda
    const term = name.toLowerCase().trim();
    //comprobar en caché
    if (cache.has(term)) {
      return cache.get(term);
    }
    // fatch + validación
    const url = import.meta.env.VITE_URL_API_RM + term;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al hacer fetching");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error("Error: " + data.error);
      }
      // guarda en el caché
      cache.set(term, data.results);
      return data.results;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };

  //renderTable
  const renderTable = (charactersArray) => {
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");
    const table = document.createElement("table");

    // thead
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    ["Imagen", "Nombre", "Estado", "Especie", "Origen"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);

    // tbody
    const tbody = document.createElement("tbody");
    charactersArray.forEach((character) => {
      const tr = document.createElement("tr");

      //imagen
      const tdImagen = document.createElement("td");
      const img = document.createElement("img");
      img.src = character.image;
      img.alt = character.name;
      img.classList.add("character-image");
      tdImagen.appendChild(img);
      tr.appendChild(tdImagen);
      //nombre
      const tdNombre = document.createElement("td");
      tdNombre.textContent = character.name;
      tr.appendChild(tdNombre);
      //estado
      const tdEstado = document.createElement("td");
      tdEstado.textContent = character.status;
      tr.appendChild(tdEstado);
      //especie
      const tdEspecie = document.createElement("td");
      tdEspecie.textContent = character.species;
      tr.appendChild(tdEspecie);
      //origen
      const tdOrigen = document.createElement("td");
      tdOrigen.textContent = character.origin.name;
      tr.appendChild(tdOrigen);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
    return tableContainer;
  };

  //render FUNCTION
  const render = () => {
    const mainContainer = document.createElement("div");

    // versión asíncrona
    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML = "<h3> Buscador Rick y Morty </h3>";

    const input = document.createElement("input");
    //const button = document.createElement("button");
    //button.textContent = "Buscar";
    const resultadoDiv = document.createElement("div");

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const updateResults = async (text) => {
      try {
        const results = await searchAPI(text);
        resultadoDiv.innerHTML = "";
        resultadoDiv.classList.remove("mensaje-error");

        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        spinner.textContent = "● ● ●";
        resultadoDiv.appendChild(spinner);

        // Simular tiempo de carga
        await delay(3000);
        resultadoDiv.innerHTML = "";

        resultadoDiv.appendChild(renderTable(results));
      } catch (err) {
        resultadoDiv.innerHTML = "";
        resultadoDiv.classList.add("mensaje-error");
        resultadoDiv.textContent = "No se han encontrado resultados";
      }
    };

    const debounceUpdate = debounce(updateResults, 500);

    input.addEventListener("input", (e) => {
      const value = e.target.value.trim();

      resultadoDiv.innerHTML = "";

      v2Wrapper.querySelectorAll(".indicador").forEach((el) => el.remove());

      const indicador = document.createElement("span");
      indicador.classList.add("indicador");

      if (cache.has(value.toLowerCase())) {
        indicador.classList.add("indicador-cache");
      } else {
        indicador.classList.add("indicador-api");
      }
      v2Wrapper.appendChild(indicador);

      if (value !== "") {
        debounceUpdate(value);
      }
    });

    // button.addEventListener("click", () => {
    //   const value = input.value.trim();
    //   if (value === "") {
    //     resultadoDiv.innerHTML = "";
    //   } else {
    //     updateResults(value);
    //   }
    // });

    v2Wrapper.appendChild(input);
    //v2Wrapper.appendChild(button);
    v2Wrapper.appendChild(resultadoDiv);
    mainContainer.appendChild(v2Wrapper);

    return mainContainer;
  };

  return { render };
}
