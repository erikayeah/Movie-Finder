<template>
  <div class="favorites-container">
    <div class="favorites-header">
      <h2>My Favorite Movies</h2>
      <select v-model="sortOrder" class="sort-select">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="title">By Title</option>
        <option value="year">By Year</option>
      </select>
    </div>
    
    <div class="movies-grid">
      <div v-for="movie in sortedFavorites" :key="movie.imdbID" class="movie-card">
        <img :src="movie.Poster" :alt="movie.Title">
        <div class="movie-info">
          <h3>{{ movie.Title }}</h3>
          <p>{{ movie.Year }}</p>
          <button @click="handleRemove(movie)" class="remove-btn">
            🗑️ Remove from favorites
          </button>
        </div>
      </div>
    </div>

    <p v-if="favorites.length === 0" class="no-favorites">
      No favorite movies yet. Start adding some!
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFavorites } from '../store/favorites'

const { favorites, removeFromFavorites } = useFavorites()
const sortOrder = ref('newest')

const sortedFavorites = computed(() => {
  const sorted = [...favorites.value]
  
  switch (sortOrder.value) {
    case 'newest':
      return sorted.reverse()
    case 'title':
      return sorted.sort((a, b) => a.Title.localeCompare(b.Title))
    case 'year':
      return sorted.sort((a, b) => b.Year - a.Year)
    default:
      return sorted
  }
})

const handleRemove = (movie) => {
  if (confirm(`Are you sure you want to remove "${movie.Title}" from favorites?`)) {
    removeFromFavorites(movie.imdbID)
  }
}
</script>

<style scoped>
.favorites-container {
  padding: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  background-color: white;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-info {
  padding: 1rem;
}

.remove-btn {
  width: 100%;
  padding: 8px;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
}

.remove-btn:hover {
  background-color: #ff6b81;
}

.no-favorites {
  text-align: center;
  color: #666;
  margin-top: 2rem;
  font-size: 1.1rem;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.sort-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}
</style> 