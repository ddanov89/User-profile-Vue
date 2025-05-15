import { defineStore } from 'pinia'
import { profileService } from '@/services/profileService'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const data = await profileService.getUsers()
        this.users = data
        this.error = null
      } catch (err) {
        console.error(err)
        this.error = 'Failed to fetch users'
      } finally {
        this.loading = false
      }
    },

    async fetchUserById(userId) {
      this.loading = true
      try {
        const user = await profileService.getUserById(userId)
        this.currentUser = user
        this.error = null
      } catch (err) {
        console.error(err)
        this.error = 'User not found'
      } finally {
        this.loading = false
      }
    },

    async updateUser(userId, payload) {
      this.loading = true
      try {
        const updatedUser = await profileService.updateUser(userId, payload)
        this.currentUser = updatedUser
        this.error = null
        return updatedUser
      } catch (err) {
        console.error(err)
        this.error = 'Failed to update user'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
