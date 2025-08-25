import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const { VITE_API_BASE } = import.meta.env;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null); // user 資料
  const isLoggedIn = computed(() => !!user.value); // 是否登入
  const isLoggingOut = ref(false);

  // 設定 user 資料
  // const setUser = (payload) => {
  //   user.value = payload; // 直接就是 user 物件
  // };

  // 設定 user 資料
  const setUser = (payload) => {
    // 如果 payload 存在，並且它內部有一個 .user 的 key
    // (這代表資料來自 check_session.php)
    if (payload && payload.user) {
      // 我們就只取內層的 user 物件來設定狀態
      user.value = payload.user;
    } else {
      // 否則，就直接使用 payload
      // (這代表資料來自您自己寫的 profile_get.php 或 profile_update_post.php)
      user.value = payload;
    }
  };

  // 用來計算最終的頭像 URL
  const avatarUrl = computed(() => {
    const currentUser = user.value && user.value.user ? user.value.user : user.value;

    if (!currentUser || !currentUser.profile_image) {
      return '/image/default_avatar.png'; // 預設本地圖片
    }
    const imagePath = currentUser.profile_image;
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    if (imagePath.startsWith('/')) {
      return VITE_API_BASE ? `${VITE_API_BASE}${imagePath}` : imagePath;
    }
    return '/image/default_avatar.png';
  });

  // 登入
  // const login = async (user_id, password) => {
  //   try {
  //     const res = await fetch(`${VITE_API_BASE}/api/login/login_post.php`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include', // 帶上 session cookie
  //       body: JSON.stringify({
  //         user_id: user_id,
  //         password: password,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.status === 'success') {
  //       setUser(data.data);
  //       return { success: true };
  //     } else {
  //       return { success: false, message: data.message || '登入失敗' };
  //     }
  //   } catch (err) {
  //     console.error('登入錯誤:', err);
  //     return { success: false, message: '無法連線' };
  //   }
  // };

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
        // login_post.php 回傳的 data.data 是空的
        await checkAuth(); // 登入成功後，立刻呼叫 checkAuth 獲取完整資料
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
  // const logout = async () => {
  //   user.value = null;
  //   try {
  //     await fetch(`${VITE_API_BASE}/api/login/logout.php`, {
  //       method: 'POST',
  //       credentials: 'include', // 帶上 session cookie
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // 登出
  const logout = async () => {
    try {
      await fetch(`${VITE_API_BASE}/api/login/logout.php`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error(err);
    } finally {
      // 清空值
      user.value = null;
    }
  };

  return { user, isLoggedIn, isLoggingOut, avatarUrl, setUser, login, checkAuth, logout };
});
