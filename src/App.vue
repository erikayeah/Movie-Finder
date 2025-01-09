<template>
  <div class="movie-app">
    <header>
      <h1>Movie Finder</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/favorites">
          Favorites
          <span v-if="favoritesCount" class="favorites-count">
            {{ favoritesCount }}
          </span>
        </router-link>
      </nav>
    </header>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFavorites } from './store/favorites'

const { count: favoritesCount, loadFavorites } = useFavorites()

onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.movie-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

nav {
  margin-top: 1rem;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}

nav a.router-link-active {
  color: #42b983;
}

.favorites-count {
  display: inline-block;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 20px;
  margin-left: 5px;
}
</style>
