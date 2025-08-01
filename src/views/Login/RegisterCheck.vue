<template>
  <div class="login-container">
    <div class="form-card check-card">
      <div class="check-icon">
        <svg
          width="64"
          height="44"
          viewBox="0 0 64 44"
          fill="none"
        >
          <rect
            x="6"
            y="8"
            width="52"
            height="28"
            rx="4"
            fill="#fff"
            stroke="#1976A2"
            stroke-width="2"
          />
          <rect
            x="14"
            y="15"
            width="13"
            height="7"
            rx="2"
            fill="#B0CBE3"
          />
          <circle
            cx="49"
            cy="23"
            r="3.5"
            stroke="#1976A2"
            stroke-width="2"
          />
          <path
            d="M51.7 25.7l3.6 3.6"
            stroke="#1976A2"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="check-title"><h3>註冊審核中</h3></div>
      <div class="check-desc">
        您的申請將由人工審核，預計 1～3 個工作天。
        <br />
        若有任何疑問，歡迎聯絡里辦公處協助查詢。
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  .login-container {
    @include flex-center;
    background-color: $primary-c000;
    padding: 200px 0 80px 0;
  }
  .form-card {
    padding: 0 16px;
    width: 100%;
    max-width: 525px;
    box-sizing: border-box;
  }
  .check-card {
    margin: 64px auto 0 auto;
    background: #fff;
    border-radius: 26px;
    box-shadow: 0 8px 40px 0 rgba(7, 69, 108, 0.07);
    padding: 54px 0 54px 0;
    min-width: 420px;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .check-icon {
    margin-bottom: 20px;
    svg {
      display: block;
    }
  }
  .check-title h3 {
    text-align: center;
    margin-bottom: 40px;
    color: $primary-c700;
  }
  .check-desc {
    font-family: $font-sans;
    font-size: 18px;
    color: $black;
    text-align: center;
    line-height: 2.1;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    .login-container {
      padding: 60px 0 40px 0;
    }
    .form-card,
    .check-card {
      min-width: 0;
      padding: 10px;
      width: 90vw;
      // max-width: 98vw;
      box-sizing: border-box;
    }
    .check-card {
      margin: 24px auto 0 auto;
    }
    .check-desc {
      font-size: 16px;
      line-height: 1.8;
    }
  }
</style>
