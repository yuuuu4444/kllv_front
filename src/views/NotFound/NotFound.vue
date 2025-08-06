<script setup>
  import Typed from 'typed.js';

  import { ref, onMounted, onBeforeUnmount } from 'vue';
  const typed1 = ref(null);

  let typedInstance1 = null;

  onMounted(() => {
    // line 1 打字效果
    typedInstance1 = new Typed(typed1.value, {
      strings: ['找不到頁面'],
      typeSpeed: 100,
      backSpeed: 30,
      showCursor: false,
      loop: false,
      startDelay: 50, // 可調整延遲
    });
  });

  onBeforeUnmount(() => {
    typedInstance1?.destroy();
  });
</script>

<template>
  <div class="notfound-container">
    <div class="form-card notfound-card">
      <h1>404</h1>
      <div class="notfound-title">
        <h3 ref="typed1"></h3>
      </div>
      <div class="notfound-desc">
        抱歉，您所造訪的頁面不存在或已被移除。
        <br />
        請檢查網址或點選下方按鈕返回首頁。
      </div>
      <router-link
        to="/"
        class="notfound-btn"
      >
        回到首頁
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  .notfound-container {
    @include flex-center;
    background-color: $primary-c000;
    padding: 180px 0 80px 0;
  }

  .form-card {
    padding: 0 16px;
    width: 100%;
    max-width: 525px;
    box-sizing: border-box;
  }

  .notfound-card {
    margin: 64px auto 0 auto;
    background: #fff;
    border-radius: $border-r-lg;
    padding: 54px 0 54px 0;
    min-width: 420px;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .notfound-card h1 {
    text-align: center;
    margin-bottom: 30px;
    font-weight: 700;
    color: $primary-c700;
  }

  .notfound-title h3 {
    text-align: center;
    margin-bottom: 40px;
    color: $primary-c700;
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: 0.05em;
  }

  .notfound-desc {
    font-family: $font-sans;
    font-size: 18px;
    color: $black;
    text-align: center;
    line-height: 2.1;
    font-weight: 400;
    margin-bottom: 32px;
  }

  .notfound-btn {
    display: inline-block;
    padding: 0.75rem 2.5rem;
    background: $primary-c700;
    color: #fff;
    border-radius: 2rem;
    font-size: 1.1rem;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.04em;
    transition: 0.3s all ease;
    cursor: pointer;
    &:hover {
      background-color: $primary-c500;
    }
  }

  @media (max-width: 768px) {
    .login-container {
      padding: 150px 0 100px 0;
    }
    .form-card,
    .notfound-card {
      min-width: 0;
      padding: 10px;
      width: 90vw;
      box-sizing: border-box;
    }
    .notfound-card {
      margin: 24px auto 0 auto;
    }
    .notfound-desc {
      font-size: 16px;
      line-height: 1.8;
    }
    .notfound-title h3 {
      font-size: 1.5rem;
      margin-bottom: 24px;
    }
  }
</style>
