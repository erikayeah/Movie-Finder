<template>
  <div class="search-container">
    <div class="search-box">
      <input 
        v-model="searchQuery"
        @input="searchMovies"
        placeholder="Search movies..."
        type="text"
      >
      <button 
        v-if="searchQuery"
        @click="clearSearch" 
        class="clear-btn"
      >
        Clear
      </button>
    </div>

    <LoadingSpinner v-if="isLoading" />

    <div v-else-if="searchQuery.length >= 3 && movies.length === 0" class="no-results">
      No movies found for "{{ searchQuery }}"
    </div>

    <div v-else>
      <div class="movies-grid">
        <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
          <img :src="movie.Poster" :alt="movie.Title">
          <div class="movie-info">
            <h3>{{ movie.Title }}</h3>
            <p>{{ movie.Year }}</p>
            <button 
              @click="addToFavorites(movie)"
              :disabled="isInFavorites(movie)"
            >
              {{ isInFavorites(movie) ? '❤️ Added' : '🤍 Add to favorites' }}
            </button>
          </div>
        </div>
      </div>

      <Pagination 
        v-if="totalResults > 10"
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </div>

    <NotificationToast 
      v-if="notification.show"
      :message="notification.message"
      :type="notification.type"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_KEY, API_URL } from '../utils/constants'
import LoadingSpinner from './LoadingSpinner.vue'
import { debounce } from '../utils/debounce'
import NotificationToast from './NotificationToast.vue'
import Pagination from './Pagination.vue'
import { useFavorites } from '../store/favorites'

const searchQuery = ref('')
const movies = ref([])
const isLoading = ref(false)
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})
const currentPage = ref(1)
const totalResults = ref(0)
const totalPages = computed(() => Math.ceil(totalResults.value / 10))
const { addToFavorites, isInFavorites } = useFavorites()

const debouncedSearch = debounce(async (page = 1) => {
  if (searchQuery.value.length < 3) {
    movies.value = []
    return
  }
  
  isLoading.value = true
  
  try {
    const response = await axios.get(
      `${API_URL}/?apikey=${API_KEY}&s=${searchQuery.value}&page=${page}`
    )
    
    if (response.data.Response === 'True') {
      movies.value = response.data.Search || []
      totalResults.value = parseInt(response.data.totalResults)
      currentPage.value = page
    } else {
      movies.value = []
      totalResults.value = 0
      showNotification(response.data.Error, 'error')
    }
  } catch (error) {
    console.error('Error searching movies:', error)
    movies.value = []
    totalResults.value = 0
    showNotification('Error searching movies. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}, 500)

const searchMovies = () => {
  debouncedSearch()
}

const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const handlePageChange = (newPage) => {
  debouncedSearch(newPage)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearSearch = () => {
  searchQuery.value = ''
  movies.value = []
  totalResults.value = 0
  currentPage.value = 1
}
</script>

<style scoped>
.search-container {
  width: 100%;
}

.search-box {
  position: relative;
  margin-bottom: 2rem;
  text-align: center;
}

.search-box input {
  width: 80%;
  max-width: 500px;
  padding: 10px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
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

button {
  width: 100%;
  padding: 8px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
}

button:hover {
  background-color: #3aa876;
}

.loading, .no-results {
  text-align: center;
  color: #666;
  margin: 2rem 0;
  font-size: 1.1rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.clear-btn {
  position: absolute;
  right: 11%;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: #ff4757;
  width: auto;
  margin: 0;
}

.clear-btn:hover {
  background-color: #ff6b81;
}
</style> 