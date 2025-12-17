const KEY = "watched_movies";

const save = () => {
  localStorage.setItem(KEY, JSON.stringify(movies));
};

const getWatchedMovies = () => {
  const stored = localStorage.getItem(KEY);
  if (!stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      return [];
    }
  }
};

const addWatchedMovies = (movieID) => {
  const movies = getWatchedMovies();
  if (!movies.includes(movieID)) {
    movies.push(movieID);
    save(movies);
  }
};

const removeWatchedMovies = (movieID) => {
  const movies = getWatchedMovies();
  const index = movies.indexOf(movieID);
  if (index !== -1) {
    movies.splice(index, 1);
    save(movies);
  }
};

const isWatched = (movieID) => {
  const movies = getWatchedMovies();
  return movies.includes(movieID);
};

export const Storage = {
  getWatchedMovies,
  addWatchedMovies,
  removeWatchedMovies,
  isWatched,
};
