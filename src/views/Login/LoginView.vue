<script setup>
  import { ref } from 'vue';
  const showPassword = ref(false);
</script>

<template>
  <div class="login-container">
    <div
      class="form-card"
      data-aos="fade"
    >
      <h3>里民登入</h3>
      <div class="form-group">
        <label for="login-account">帳號</label>
        <input
          type="text"
          id="login-account"
          placeholder="請輸入帳號"
        />
      </div>
      <div class="form-group">
        <label for="login-password">密碼</label>
        <div class="password-toggle">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="login-password"
            placeholder="請輸入密碼"
          />
        </div>
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
        @click="$router.push('/resident-account')"
      >
        登入
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
