<script setup>
  import SubBanner from '@/components/SubBanner.vue';
</script>

<template>
  <div class="repair-complete">
    <SubBanner title="維修通報完成" />

    <div class="repair-complete__container">
      <nav class="repair-complete__breadcrumb">
        <RouterLink
          to="/"
          class="repair-complete__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">&#45;里民服務</p>
        <p class="body--b2">&#45;維修通報</p>
        <p class="body--b2">&#45;維修通報完成</p>
      </nav>

      <div class="repair-complete__message">
        <h3 class="repair-complete__subtitle regular">感謝您填寫通報單</h3>
        <div class="repair-complete__icon">
          <!-- <img
            src="#"
            alt=""
          /> -->
          <p>-----</p>
        </div>
        <p class="repair-complete__text body--b2">
          您的案件已成功送出，我們將盡快處理，並於進度更新時通知您。以下是您此次的通報紀錄：
        </p>
      </div>

      <div class="repair-complete__record">
        <ul class="repair-complete__list">
          <li class="repair-complete__item">
            <p class="repair-complete__label body--b2">案件編號：</p>
            <p class="repair-complete__value body--b2">RR000001</p>
          </li>
          <li class="repair-complete__item">
            <p class="repair-complete__label body--b2">查報類別：</p>
            <p class="repair-complete__value body--b2">路燈損壞</p>
          </li>
          <li class="repair-complete__item">
            <p class="repair-complete__label body--b2">所在地點：</p>
            <p class="repair-complete__value body--b2">自強 49號附近</p>
          </li>
          <li class="repair-complete__item">
            <p class="repair-complete__label body--b2">通報狀態：</p>
            <p class="repair-complete__value body--b2">已送出（待處理）</p>
          </li>
          <li class="repair-complete__item">
            <p class="repair-complete__label body--b2">填表日期：</p>
            <p class="repair-complete__value body--b2">2025-07-09</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .repair-complete {
    background-color: $primary-c000;

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
    }

    &__breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 50px;
    }

    &__breadcrumb-link {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.2em;
      color: $primary-c700;
    }

    &__message {
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    &__icon {
      text-align: center;
    }

    &__subtitle {
      text-align: center;
    }

    &__record {
      border-radius: $border-r-lg;
      background-color: $white50;
      padding: 30px 40px;
    }

    &__item {
      display: flex;
      gap: 10px;
    }

    @include mobile {
      &__container {
        padding: 1.5625vw 2.5vw 6.25vw;
      }

      &__breadcrumb-link {
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.1em;
      }
    }
  }
</style>
