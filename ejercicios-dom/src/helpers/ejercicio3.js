import { peliculas } from "../db/data";
import fetching from "../utils/feching";

export default function createEjercicio3() {
  // clousures
  const notFeching = () => peliculas;

  const getStars = (rating) => {
    const numStars = Math.floor(rating / 2);
    return "⭐".repeat(numStars);
  };

  const renderMoviesGrid = (moviesArray) => {
    const container = document.createElement("div");
    container.classList.add("movies-container");
    moviesArray.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");
      //img

      // titulo
      const title = document.createElement("h3");
      title.classList.add("movie-title");
      title.textContent = movie.titulo;
      card.appendChild(title);
      //año
      const year = document.createElement("p");
      year.classList.add("movie-year");
      year.textContent = movie.anio;
      card.appendChild(year);
      //rating
      const reating = document.createElement("p");
      reating.classList.add("movie-rating");
      reating.textContent = `${getStars(movie.rating)} ${movie.rating}/10`;
      card.appendChild(reating);

      container.appendChild(card);
    });
    return container;
  };

  const render = () => {
    const mainContainer = document.createElement("div");
    // version sincrona
    const v1Wrapper = document.createElement("div");
    v1Wrapper.innerHTML = "<h3> Versión sincrona </h3>";
    v1Wrapper.appendChild(renderMoviesGrid(notFeching()));
    mainContainer.appendChild(v1Wrapper);

    // version asincrona
    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML = "<h3> Versión Asíncrona </h3>";
    fetching("peliculas")
      .then((data) => {
        v2Wrapper.appendChild(renderMoviesGrid(data));
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });

    mainContainer.appendChild(v2Wrapper);
    return mainContainer;
  };

  return {
    render,
  };
}
