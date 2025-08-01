<script setup>
  import { ref } from 'vue';
  const showPw1 = ref(false);
  const showPw2 = ref(false);
</script>

<template>
  <div class="login-container">
    <div class="form-card">
      <h3>重設密碼</h3>
      <div class="form-group">
        <label for="verify-code">信件驗證碼</label>
        <input
          type="text"
          id="verify-code"
          placeholder="請輸入信件驗證碼"
        />
      </div>
      <div class="form-group">
        <label for="new-pw1">新密碼</label>
        <div class="password-toggle">
          <input
            :type="showPw1 ? 'text' : 'password'"
            id="new-pw1"
            placeholder="8~12字元，包含小寫英文和數字"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="new-pw2">再次輸入新密碼</label>
        <div class="password-toggle">
          <input
            :type="showPw2 ? 'text' : 'password'"
            id="new-pw2"
            placeholder="請再輸入一次"
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn--membersend"
      >
        確認修改
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
  .password-toggle {
    display: flex;
    align-items: center;
    input {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .btn--membersend {
    width: 120px;
    margin: auto;
    border: none;
    padding: 0 0 3px 4px;
    margin-top: 32px;
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
