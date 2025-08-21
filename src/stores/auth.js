import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(payload) {
      this.user = payload.user;
      this.token = payload.token;
      this.isLoggedIn = true;
      localStorage.setItem('authToken', payload.token);
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
  },
});
