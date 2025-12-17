export const createMovieList = () => {
  const container = document.getElementById("moviesContainer");
  const clear = () => {
    container.innerHTML = "";
  };

  const render = (movies) => {
    if (movies.length === 0) {
      const noResult = document.createElement("div");
      noResult.className = "no-results";
      noResult.textContent = "No hay peliculas";
      container.appendChild(noResult);
      return;
    }
  };

  
};
