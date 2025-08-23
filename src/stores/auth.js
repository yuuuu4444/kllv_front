import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const { VITE_API_BASE } = import.meta.env;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  const setUser = (payload) => {
    user.value = payload; // 直接就是 user 物件
  };

  const login = async (user_id, password) => {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/login/login_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 帶上 session cookie
        body: JSON.stringify({
          user_id: user_id,
          password: password,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setUser(data.data);
        return { success: true };
      } else {
        return { success: false, message: data.message || '登入失敗' };
      }
    } catch (err) {
      console.error('登入錯誤:', err);
      return { success: false, message: '無法連線' };
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/login/check_session.php`, {
        credentials: 'include', // 帶上 session cookie
      });
      const data = await res.json();
      if (data.status === 'success') {
        setUser(data.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('檢查登入狀態失敗:', err);
      return false;
    }
  };

  const logout = async () => {
    user.value = null;
    try {
      await fetch(`${VITE_API_BASE}/api/login/logout.php`, {
        method: 'POST',
        credentials: 'include', // 帶上 session cookie
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { user, isLoggedIn, setUser, login, checkAuth, logout };
});
