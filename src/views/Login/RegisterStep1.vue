<script setup></script>
<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  function goToLogin() {
    router.push('/login');
  }
  function goToRegisterStep2() {
    router.push('/register-step2');
  }
</script>
<template>
  <div class="login-container">
    <div class="form-card">
      <h3>家庭管理員註冊</h3>
      <div class="form-stepper">
        <div class="step-group">
          <div class="step-circle active">1</div>
          <div class="step-label">填寫資料</div>
        </div>
        <div class="step-line"></div>
        <div class="step-group">
          <div class="step-circle">2</div>
          <div class="step-label gray">確認送出</div>
        </div>
      </div>
      <form @submit.prevent>
        <div class="form-group row">
          <div>
            <label>縣/市</label>
            <select>
              <option>桃園市</option>
            </select>
          </div>
          <div>
            <label>鄉/鎮/市/區</label>
            <select>
              <option>中壢區</option>
            </select>
          </div>
          <div>
            <label>村/里</label>
            <select>
              <option>空瀧浪里</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="label-row">
            <label>地址*</label>
            <div class="form-error">地址已被註冊，請與家庭管理員聯繫</div>
          </div>
          <input
            type="text"
            class="input-error"
            placeholder="請輸入地址"
          />
        </div>
        <div class="form-group row row-btns">
          <button
            type="button"
            class="btn--membercancel"
            @click="goToLogin"
          >
            返回
          </button>
          <button
            type="submit"
            class="btn--membersend"
            @click="goToRegisterStep2"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';
  $gray-400: #9eafb8;
  .login-container {
    @include flex-center;
    background-color: $primary-c000;
    padding: 225px 0 40px 0;
  }
  .form-card {
    padding: 0 16px;
    width: 100%;
    max-width: 450px;
  }
  .form-card h3 {
    text-align: center;
    margin-bottom: 40px;
    color: $primary-c700;
  }
  .form-stepper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 40px;

    .step-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 70px;
    }

    .step-circle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: $neutral-c;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6px;
      &.active {
        background: $primary-c700;
      }
    }

    .step-label {
      font-size: 16px;
      color: $black;
      margin-top: 0;
      &.gray {
        color: $gray-400;
        font-weight: 400;
      }
    }

    .step-line {
      width: 52px;
      height: 3px;
      background: $primary-c100;
      margin: 20px 10px 0 10px;
      align-self: flex-start;
    }
  }
  .form-group {
    margin-bottom: 12px;
    .label-row {
      display: flex;
      align-items: center;
      margin-bottom: 4px; // 與 input 有點距離
      label {
        margin-bottom: 0;
        margin-right: 10px;
        font-size: 16px;
        color: $black;
        font-family: $font-sans;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.2em;
      }
      // .form-error {
      //   color: red;
      //   font-size: 15px;
      //   font-weight: 400;
      //   margin: 0;
      //   white-space: nowrap;
      // }
    }
    &.row {
      display: flex;
      gap: 12px;
      > div {
        flex: 1;
      }
    }
    &.row-btns {
      display: flex;
      justify-content: center;
      gap: 24px;
    }
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
    // &.input-error {
    //   border-color: red;
    // }
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
  .form-error {
    color: red;
    font-size: 13px;
    margin-top: 4px;
    margin-bottom: 0;
  }
  .btn--membersend {
    border: none;
    padding: 0 0 3px 4px;
    margin-top: 20px;
  }
  .btn--membercancel {
    padding: 0 0 3px 4px;
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    .login-container {
      padding: 120px 0 60px 0;
    }
    .form-card {
      padding: 12px;
      max-width: 98vw;
    }
    .form-group.row {
      flex-direction: column;
      gap: 0;
    }
    .form-group.row-btns {
      display: flex;
      flex-direction: row;
      gap: 32px;
    }
    label {
      margin-top: 8px;
    }
  }
</style>
