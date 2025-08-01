<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  function goToResetPassword() {
    router.push('/reset-password');
  }
</script>
<template>
  <div class="login-container">
    <div class="form-card">
      <h3>忘記密碼</h3>
      <div class="form-group">
        <label for="fp-account">帳號</label>
        <input
          type="text"
          id="fp-account"
          placeholder="請輸入帳號"
        />
      </div>
      <div class="form-group">
        <label for="fp-email">電子信箱</label>
        <input
          type="email"
          id="fp-email"
          placeholder="請輸入電子信箱"
        />
      </div>
      <div class="form-group captcha-row">
        <input
          class="captcha-box"
          disabled
          value="47885432"
        />
        <input
          class="captcha-input"
          placeholder="請輸入驗證碼"
        />
      </div>
      <button
        type="submit"
        class="btn--membersend"
        @click="goToResetPassword"
      >
        送出
      </button>
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
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.2em;
  }
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid $primary-c100;
    border-radius: 5px;
    font-family: $font-sans;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.1em;
    box-sizing: border-box;
    background: #fff;
  }
  input::placeholder {
    color: $neutral-c;
  }
  input:focus,
  select:focus {
    border-color: $primary-c300;
    box-shadow: 0 0px 5px 0 $primary-c300;
    outline: none;
  }
  .captcha-row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 32px;
    .captcha-box {
      width: 120px;
      background: $primary-c000;
      border-radius: 7px;
      font-size: 22px;
      font-weight: 700;
      color: $neutral-c;
      text-align: center;
      border: none;
      letter-spacing: 6px;
      pointer-events: none;
      padding: 8px 0;
    }
    .captcha-input {
      flex: 1;
    }
  }
  .btn--membersend {
    margin: auto;
    border: none;
    padding: 0 0 3px 4px;
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
