# Crear el archivo README.md
echo "# Movie Finder

A simple Vue 3 application to search and manage your favorite movies.

## Features
- Search movies in real-time
- Add/remove movies to favorites
- Sort favorites by newest, oldest, title, and year
- Responsive design
- Loading states and notifications

## Setup

1. Clone and install dependencies:
\`\`\`
git clone <your-repo>
cd movie-finder
npm install
\`\`\`

2. Create \`.env\` file in root directory:
\`\`\`
VITE_OMDB_API_KEY=ccd2a3c7
\`\`\`

3. Run development server:
\`\`\`
npm run dev
\`\`\`

## Tech Stack
- Vue 3 (Composition API)
- Vue Router
- Vite
- OMDB API
- Local Storage

## Project Structure
\`\`\`
movie-finder/
├── src/
│   ├── components/          
│   │   ├── MovieSearch.vue
│   │   ├── FavoriteMovies.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── NotificationToast.vue
│   │   └── Pagination.vue
│   ├── views/              
│   │   ├── HomeView.vue
│   │   └── FavoritesView.vue
│   ├── store/              
│   │   └── favorites.js
│   ├── utils/              
│   │   ├── constants.js
│   │   └── debounce.js
│   ├── styles/             
│   │   └── main.css
│   ├── router/             
│   │   └── index.js
│   ├── App.vue            
│   └── main.js            
\`\`\`

## Available Scripts
\`\`\`
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
\`\`\`

## API
This project uses the [OMDB API](http://www.omdbapi.com/)" > movie-finder/README.md