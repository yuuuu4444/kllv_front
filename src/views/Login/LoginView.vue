<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  const auth = useAuthStore();
  const router = useRouter();

  const showPassword = ref(false);

  const user_id = ref('');
  const password = ref('');
  const user_idError = ref('');
  const passwordError = ref('');
  const loginError = ref('');
  const isLoading = ref(false);

  async function handleLogin() {
    user_idError.value = '';
    passwordError.value = '';
    loginError.value = '';

    let hasError = false;
    if (!user_id.value) {
      user_idError.value = '帳號必填';
      hasError = true;
    }
    if (!password.value) {
      passwordError.value = '密碼必填';
      hasError = true;
    }
    if (hasError) return;

    isLoading.value = true;
    try {
      const result = await auth.login(user_id.value, password.value);
      if (result.success) {
        // 登入成功後導向 member
        router.push('/member');
      } else {
        // 新增判斷：帳號尚未啟用時跳轉
        if (result.message === '帳號尚未啟用') {
          // 存到 localStorage
          localStorage.setItem('user_id', user_id.value);
          router.push('/resident-account');
        } else {
          loginError.value = result.message;
        }
      }
    } catch (err) {
      console.error('登入流程錯誤:', err);
      loginError.value = '登入失敗';
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
          <label for="login-user_id">帳號</label>
          <input
            type="text"
            id="login-user_id"
            v-model="user_id"
            :class="{ 'input-error': user_idError }"
            placeholder="請輸入帳號"
          />
          <div
            v-if="user_idError"
            class="form-error"
          >
            {{ user_idError }}
          </div>
        </div>
        <div class="form-group">
          <label for="login-password">密碼</label>
          <div class="password-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="login-password"
              v-model="password"
              :class="{ 'input-error': passwordError }"
              placeholder="請輸入密碼"
            />
            <!-- 眼睛 icon -->
            <span
              class="toggle-icon"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '不看' : '看' }}
            </span>
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
          {{ isLoading ? '...' : '登入' }}
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
  .password-wrapper {
    position: relative;

    input {
      width: 100%;
      padding-right: 36px;
    }

    .toggle-icon {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      font-size: 14px;
      color: $neutral-c;
      cursor: pointer;

      &:hover {
        color: $primary-c300;
      }
    }
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
