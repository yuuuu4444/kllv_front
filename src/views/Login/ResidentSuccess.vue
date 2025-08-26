<script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  onMounted(() => {
    setTimeout(() => {
      router.push('/member');
    }, 3000);
  });
</script>

<template>
  <div class="login-container">
    <div class="form-card check-card">
      <div class="check-icon">
        <!-- 藍底白勾 SVG -->
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
        >
          <circle
            cx="34"
            cy="34"
            r="32"
            fill="#07456c"
          />
          <path
            d="M22 35.5l9.5 9L46 26"
            stroke="#fff"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="check-title"><h3>開通成功</h3></div>
      <div class="check-desc">
        若頁面無跳轉請
        <!-- <router-link
          to="/login"
          class="success-link"
        >
          點此登入
        </router-link> -->
        <router-link
          to="/member"
          class="success-link"
        >
          點此登入
        </router-link>
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
    .success-link {
      color: $primary-c300;
      font-weight: bold;
      text-decoration: none;
      font-size: 18px;
      letter-spacing: 0.08em;
      margin-left: 2px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 768px) {
    .login-container {
      padding: 120px 0 60px 0;
    }
    .form-card,
    .check-card {
      min-width: 0;
      padding: 30px 10px 10px 10px;
      width: 90vw;
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
