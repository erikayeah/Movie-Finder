<template>
  <div class="pagination">
    <button 
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-btn"
    >
      Previous
    </button>
    
    <span class="page-info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button 
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-btn"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

defineEmits(['change'])
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.pagination-btn {
  padding: 8px 16px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}
</style> 