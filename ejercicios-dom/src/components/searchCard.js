export default function createSearchCard(onSearch) {
  // variables privadas
  let isSearching = false;

  // DOM
  const container = document.createElement("div");
  container.className = "bg-white rounded-lg shadow-lg p-6 mb-6";
  // titulo
  const titulo = document.createElement("h2");
  titulo.textContent = "Buscar ciudad";

  // input
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Introduzca la ciudad a buscar";

  //botón
  const btn = document.createElement("button");
  btn.textContent = "Buscar";

  //estados
  const state = document.createElement("p");
  state.textContent = "";

  //setStatus
  const setStatus = (message, type = "info") => {
    switch (type) {
      case "loading":
        state.textContent = message;
        state.className += "text-blue-600";
      case "error":
        state.textContent = message;
        state.className += "text-rojo-600";
      case "succes":
        state.textContent = message;
        state.className += "text-verde-600";
      case "info":
        state.textContent = message;
        state.className += "text-gray-600";
    }
  };

  // realizar búsqueda
  const performSearch = async () => {
    const cityName = input.value.toLowerCase().trim();
    if (!cityName) {
      setStatus("Introduce el nombre de la ciudad", "error");
      return;
    }

    // comenzamos la búsqueda
    isSearching = true;
    // hago la búsqueda
    try {
      await onSearch(cityName);
      setStatus("Búsqueda realizada", "succes");
    } catch (error) {
      throw new Error("Error: ", error.message);
      setStatus("Error al buscar", "error");
    } finally {
      isSearching = false;
    }

    // EVENTOS
    btn.addEventListener("click", performSearch);

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        performSearch();
      }
    });

    xxxx.apenndchild();
  };

  return {
    element: container,
    focus: () => input.focus(),
    clearForm: () => {
      (input.value = ""), setStatus(""), (isSearching = false);
    },
    getInput: () => input.value.trim(),
  };
}
