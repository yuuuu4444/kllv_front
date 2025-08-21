<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  const { VITE_API_BASE } = import.meta.env;
  const router = useRouter();
  const showPassword = ref(false);
  const account = ref('');
  const password = ref('');
  const accountError = ref('');
  const passwordError = ref('');
  const loginError = ref('');
  const isLoading = ref(false);

  async function handleLogin() {
    // 重置錯誤訊息
    accountError.value = '';
    passwordError.value = '';
    loginError.value = '';

    // 表單驗證
    let hasError = false;
    if (!account.value) {
      accountError.value = '帳號為必填';
      hasError = true;
    }
    if (!password.value) {
      passwordError.value = '密碼為必填';
      hasError = true;
    }
    if (hasError) return;

    // 如果驗證通過，執行登入邏輯
    isLoading.value = true;
    try {
      const res = await fetch(`${VITE_API_BASE}/api/login/login_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: account.value,
          password: password.value,
        }),
      });

      const data = await res.json();

      // 根據 HTTP 狀態碼處理不同情況
      switch (res.status) {
        case 200:
          if (data.status === 'success') {
            const authStore = useAuthStore();
            authStore.setUser(data.data);
            router.push('/member');
          }
          break;
        case 400:
          loginError.value = '帳號密碼必填';
          break;
        case 401:
          loginError.value = '帳號或密碼錯誤';
          break;
        case 403:
          loginError.value = data.message; // '帳號已停用' 或 '帳號尚未啟用'
          break;
        default:
          loginError.value = data.message || '登入失敗，請稍後再試';
      }
    } catch (err) {
      console.error('登入錯誤:', err);
      loginError.value = '無法連線伺服器，請稍後再試';
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div class="login-container">
    <div
      class="form-card"
      data-aos="fade"
    >
      <h3>里民登入</h3>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login-account">帳號</label>
          <input
            type="text"
            id="login-account"
            v-model="account"
            :class="{ 'input-error': accountError }"
            placeholder="請輸入帳號"
          />
          <div
            v-if="accountError"
            class="form-error"
          >
            {{ accountError }}
          </div>
        </div>
        <div class="form-group">
          <label for="login-password">密碼</label>
          <div class="password-toggle">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="login-password"
              v-model="password"
              :class="{ 'input-error': passwordError }"
              placeholder="請輸入密碼"
            />
          </div>
          <div
            v-if="passwordError"
            class="form-error"
          >
            {{ passwordError }}
          </div>
        </div>
        <div
          v-if="loginError"
          class="form-error text-center"
        >
          {{ loginError }}
        </div>

        <router-link
          to="/forgot-password"
          class="forgot-link"
        >
          忘記密碼？
        </router-link>

        <button
          type="submit"
          class="btn--membersend"
          :disabled="isLoading"
        >
          {{ isLoading ? '登入中...' : '登入' }}
        </button>

        <p class="register-text">
          尚未加入空瀧浪里？
          <router-link
            to="/register-step1"
            class="register-link"
          >
            立即註冊
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  .login-container {
    @include flex-center;
    background-color: $primary-c000;
    padding: 225px 0 80px 0;
  }
  .form-card {
    padding: 0 16px;
    width: 100%;
    max-width: 450px;
  }
  .form-card h3 {
    text-align: center;
    margin-bottom: 24px;
    color: $primary-c700;
  }
  .form-group {
    margin-bottom: 12px;
  }
  label {
    display: block;
    margin-bottom: 8px;
    color: $black;
    font-family: $font-sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.2em;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid $primary-c100;
    border-radius: 5px;
    font-family: $font-sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.1em;
  }
  input::placeholder {
    color: $neutral-c;
  }
  input:focus {
    border-color: $primary-c300;
    box-shadow: 0 0px 5px 0 $primary-c300;
    outline: none;
  }
  .password-toggle input {
    width: 100%;
    box-sizing: border-box;
  }
  .forgot-link {
    display: block;
    text-align: left;
    margin-bottom: 12px;
    font-size: 14px;
    color: $primary-c300;
    text-decoration: none;
  }
  .forgot-link:hover {
    text-decoration: underline;
  }
  .btn--membersend {
    margin: auto;
    border: none;
    padding: 0 0 3px 4px;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  .register-text {
    text-align: center;
    font-family: $font-sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.2em;
    margin-top: 16px;
  }
  .register-text a {
    font-family: $font-sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.2em;
    color: $primary-c300;
    text-decoration: none;
    font-weight: bold;
  }
  .register-text a:hover {
    text-decoration: underline;
  }
  // 新增錯誤相關樣式
  .input-error {
    border-color: red !important;
  }

  .form-error {
    color: red;
    font-size: 13px;
    margin-top: 4px;
  }

  .text-center {
    text-align: center;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    .login-container {
      padding: 120px 0 60px 0;
    }
    .form-card {
      padding: 12px;
      max-width: 98vw;
    }
  }
</style>
