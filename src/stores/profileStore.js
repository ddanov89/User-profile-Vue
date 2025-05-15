import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { profileService } from '@/services/profileService'

export const useProfileStore = defineStore('profileStore', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  function loadFromStorage() {
    const stored = localStorage.getItem('users')
    if (stored) {
      users.value = JSON.parse(stored)
    }
  }

  function saveToStorage() {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const getUserById = computed(() => {
    return (id) => users.value.find(user => user.id == id)
  })


  async function fetchAllUsers() {
    loading.value = true
    try {
      const allUsers = await profileService.getUsers()
      users.value = allUsers
      saveToStorage()
      error.value = null
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id, payload) {
    loading.value = true
    try {
      const updatedUser = await profileService.updateUser(id, payload)

      const index = users.value.findIndex(u => u.id == id)
      if (index !== -1) {
        users.value[index] = updatedUser
      } else {
        users.value.push(updatedUser)
      }

      saveToStorage()
      return updatedUser
    } catch (err) {
      console.error(err)
      error.value = 'Failed to update user'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Initialize store with data from localStorage
  loadFromStorage()

  return {
    users,
    loading,
    error,
    getUserById,
    fetchAllUsers,
    updateUser,
    loadFromStorage
  }
})
