<template>
  <div class="completion-page">
    <SubBanner title="活動報名" />

    <div class="completion-page__container">
      <nav class="completion-page__breadcrumb">
        <RouterLink
          to="/"
          class="completion-page__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">/里民服務</p>
        <RouterLink
          to="/events"
          class="completion-page__breadcrumb-link"
        >
          /活動報名
        </RouterLink>
        <p class="body--b2">/{{ eventData.eventName }}</p>
        <p class="body--b2">/報名完成</p>
      </nav>

      <div class="completion-page__message">
        <h3 class="completion-page__subtitle regular">報名完成</h3>
        <div class="completion-page__icon">
          <img
            src="/src/assets/icon/icon_divider-shared.svg"
            alt="divider"
          />
        </div>
        <p class="completion-page__text body--b2">感謝您報名此活動！</p>
      </div>

      <div class="completion-page__record">
        <ul class="completion-page__list">
          <li>
            <p class="completion-page__label body--b2">訂單編號：</p>
            <p class="completion-page__value body--b2">{{ eventData.orderNumber }}</p>
          </li>
          <li>
            <p class="completion-page__label body--b2">活動名稱：</p>
            <p class="completion-page__value body--b2">{{ eventData.eventName }}</p>
          </li>
          <li>
            <p class="completion-page__label body--b2">活動時間：</p>
            <p class="completion-page__value body--b2">{{ eventData.eventTime }}</p>
          </li>
          <li>
            <p class="completion-page__label body--b2">活動地點：</p>
            <p class="completion-page__value body--b2">{{ eventData.location }}</p>
          </li>
          <li>
            <p class="completion-page__label body--b2">報名金額：</p>
            <p class="completion-page__value body--b2">{{ eventData.totalCost }}元</p>
          </li>
          <li>
            <p class="completion-page__label body--b2">參加人數：</p>
            <p class="completion-page__value body--b2">{{ eventData.participants }}人</p>
          </li>
        </ul>
      </div>

      <p class="completion-page__final-text body--b3">
        若尚未繳款，請於 3
        日內完成，繳款後將獲得活動參加資格，詳情請詳閱會員中心活動區。祝您有個美好的活動參與體驗！
      </p>
    </div>
  </div>
</template>

<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';

  // 模擬從上個頁面或 API 取得的報名成功資料
  const eventData = ref({
    orderNumber: 'AAA00001',
    eventName: '第41屆空瀧馬拉松',
    eventTime: '2025-09-05 06:00-11:00',
    location: '桃園市中壢區復興路46號9樓',
    totalCost: 1000,
    participants: 2,
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .completion-page {
    background-color: $primary-c000;
    padding-bottom: 60px;

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
      @include mobile {
        padding: 1.5625vw 5vw 6.25vw;
      }
    }

    &__breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 50px;
      & > * {
        @extend .body--b2;
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.2em;
      }
      p {
        color: $black;
      }
    }

    &__breadcrumb-link {
      color: $primary-c700;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    &__message {
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    &__icon {
      @include flex-center;
    }

    &__subtitle {
      text-align: center;
    }

    &__text {
      text-align: center;
    }

    &__record {
      border-radius: $border-r-lg;
      background-color: $white50;
      padding: 30px 40px;
    }

    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__list li {
      display: flex;
      gap: 10px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    &__label {
      flex-shrink: 0;
    }

    &__final-text {
      margin-top: 40px;
      text-align: center;
      line-height: 1.8;
    }
  }
</style>
