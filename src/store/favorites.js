import { ref, computed } from "vue";

const favorites = ref([]);

export const useFavorites = () => {
  const count = computed(() => favorites.value.length);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      favorites.value = JSON.parse(savedFavorites);
    }
  };

  const addToFavorites = (movie) => {
    favorites.value.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const removeFromFavorites = (movieId) => {
    favorites.value = favorites.value.filter(
      (movie) => movie.imdbID !== movieId
    );
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const isInFavorites = (movieId) => {
    return favorites.value.some((movie) => movie.imdbID === movieId);
  };

  return {
    favorites,
    count,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  };
};
