import { defineStore } from 'pinia';
import apiClient from '@/apiClient';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await apiClient.get('/user');
        this.user = response.data;
      } catch (error) {
        this.user = null;
        console.error('Error fetching user:', error);
      }
    },
    setUser(user) {
      this.user = user;
    },
    async logout() {
      try {
        await apiClient.post('/logout');
        this.user = null;
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  }
});
