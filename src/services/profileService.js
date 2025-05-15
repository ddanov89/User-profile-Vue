import axios from 'axios'

const API = 'https://jsonplaceholder.typicode.com';

export const profileService = {
  async getUsers() {
    const response = await axios.get(`${API}/users`)
    return response.data
  },

  async getUserById(userId) {
    const response = await axios.get(`${API}/users/${userId}`)
    return response.data
  },

  async updateUser(userId, payload) {
    const response = await axios.put(`${API}/users/${userId}`, payload)
    return response.data
  },
}

