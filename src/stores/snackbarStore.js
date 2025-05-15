import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const visible = ref(false)
  let timeoutId = null

  function show(messageText) {
    message.value = messageText
    visible.value = true

    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      visible.value = false
    }, 5000)
  }

  function hide() {
    visible.value = false
    if (timeoutId) clearTimeout(timeoutId)
  }

  return { message, visible, show, hide }
})
