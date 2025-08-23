import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const { VITE_API_BASE } = import.meta.env;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null); // user 資料
  const isLoggedIn = computed(() => !!user.value); // 是否登入

  // 設定 user 資料
  const setUser = (payload) => {
    user.value = payload; // 直接就是 user 物件
  };

  // 登入
  const login = async (user_id, password) => {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/login/login_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user_id, password }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        await checkAuth();
        return { success: true };
      } else {
        return { success: false, message: data.message || '登入失敗' };
      }
    } catch (err) {
      console.error('登入錯誤:', err);
      return { success: false, message: '無法連線' };
    }
  };

  // 初始或 F5 時檢查登入狀態
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
      setUser(null);
      return false;
    } catch (err) {
      console.error('檢查登入狀態失敗:', err);
      setUser(null);
      return false;
    }
  };

  // 登出
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
