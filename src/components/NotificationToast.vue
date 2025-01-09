<template>
  <div 
    v-if="isVisible" 
    class="notification-toast"
    :class="type"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>

<style scoped>
.notification-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

.success {
  background-color: #42b983;
}

.error {
  background-color: #ff4757;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 