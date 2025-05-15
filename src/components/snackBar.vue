<template>
  <transition name="fade">
    <div v-if="visible" class="snackbar">
      {{ message }}
      <button class="close-btn" @click="hide">×</button>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useSnackbarStore } from '@/stores/snackbarStore'

const snackbar = useSnackbarStore()

const message = computed(() => snackbar.message)
const visible = computed(() => snackbar.visible)

function hide() {
  snackbar.hide()
}
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d32f2f; /* red color similar to error */
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
