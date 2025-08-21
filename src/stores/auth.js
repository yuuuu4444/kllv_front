import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(payload) {
      this.user = payload.user;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;

      // 呼叫登出 API 清除 session
      fetch(`${import.meta.env.VITE_API_BASE}/api/login/logout.php`, {
        method: 'POST',
        credentials: 'include', // 包含 cookie
      });
    },
    // 檢查登入狀態
    async checkAuth() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/login/check_session.php`, {
          credentials: 'include',
        });
        const data = await res.json();

        if (data.status === 'success') {
          this.setUser(data.data);
          return true;
        }
        return false;
      } catch (err) {
        console.error('檢查登入狀態失敗:', err);
        return false;
      }
    },
  },
});
