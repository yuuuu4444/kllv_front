import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const isLogin = computed(() => !!user.value);

  // 嘗試讀取當前使用者狀態
  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost/xxxme.php', {
        credentials: 'include', // 重要，讓 cookie 帶上去
      });
      if (!res.ok) throw new Error('未登入');
      const data = await res.json();
      if (data.login) {
        user.value = data.data.user;
      } else {
        user.value = null;
      }
    } catch (err) {
      user.value = null;
    }
  };

  // 登入
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost/xxxlogin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include', // 重要
        body: new URLSearchParams({ email, password }),
      });
      if (!res.ok) throw new Error('登入失敗');
      const data = await res.json();
      user.value = data.data.user;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // 登出
  const logout = async () => {
    await fetch('http://localhost/xxxlogout.php', {
      credentials: 'include',
    });
    user.value = null;
  };

  return { user, isLogin, fetchUser, login, logout };
});
