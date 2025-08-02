<!-- 檔案路徑: src/views/Events/EventDetailView.vue -->
<template>
  <div class="event-detail-view">
    <SubBanner title="活動報名" />

    <div
      v-if="event"
      class="event-detail-view__container"
    >
      <nav class="event-detail-view__breadcrumbs">
        <RouterLink
          to="/"
          class="event-detail-view__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p>&#47;里民服務</p>
        <p>&#47;</p>
        <RouterLink
          to="/events"
          class="event-detail-view__breadcrumb-link"
        >
          活動報名
        </RouterLink>
        <p>&#47;{{ event.title }}</p>
      </nav>

      <div class="event-detail-view__title-bar">
        <h3 class="bold">{{ event.title }}</h3>
      </div>

      <p class="body--b3 event-detail-view__date">{{ event.date }}</p>

      <img
        :src="event.image"
        :alt="event.title"
        class="event-detail-view__image"
      />

      <div
        class="event-detail-view__description"
        v-html="formattedDescription"
      ></div>

      <div class="event-detail-view__info-section">
        <div class="event-detail-view__info-title-bar">
          <h5 class="bold">活動資訊</h5>
        </div>
        <div class="event-detail-view__info-spacer"></div>
        <ul class="event-detail-view__info-list">
          <li>
            <p class="body--b3">活動時間：</p>
            <p class="body--b3">{{ event.timeRange }}</p>
          </li>
          <li>
            <p class="body--b3">地點：</p>
            <p class="body--b3">{{ event.location }}</p>
          </li>
          <li>
            <p class="body--b3">人數限制：</p>
            <p class="body--b3">{{ event.quota }} 人</p>
          </li>
          <li>
            <p class="body--b3">報名時間：</p>
            <p class="body--b3">{{ event.registrationPeriod }}</p>
          </li>
          <li>
            <p class="body--b3">報名費用：</p>
            <p class="body--b3">{{ event.cost }}</p>
          </li>
        </ul>
      </div>

      <div class="event-detail-view__button-wrapper">
        <RouterLink
          v-if="event"
          :to="`/events/${event.id}/register`"
        >
          <button class="btn--process">我要報名</button>
        </RouterLink>
      </div>
    </div>

    <div
      v-else
      class="event-detail-view__not-found"
    >
      <h3 class="bold">找不到該活動資訊</h3>
      <p class="body--b2">請確認連結是否正確，或返回活動列表。</p>
      <RouterLink to="/events">
        <button class="btn--process">返回活動列表</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { ref, computed } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';

  const allEvents = ref([
    {
      id: 6,
      title: '第41屆空瀧馬拉松',
      image: 'https://picsum.photos/seed/6/900/600',
      date: '2025年9月5日',
      description:
        '第一屆空瀧馬拉松始於1980年，以「讓我們像夥伴一樣一起奔跑」為口號，今年是第41屆。\n本次活動的目的並非競賽，而是讓所有參賽者享受跑步的樂趣，體驗健康的快樂，並加深彼此間的友誼。參與者及完賽者將收到豐富禮品、點心；獲得名次者將另收到精美獎牌、獎狀。\n 一邊享受空瀧浪里豐富的自然風光，一邊互相鼓勵、支持，一起朝目標邁進吧！我們期待您的參與。',
      timeRange: '2025年9月5日 06:00 - 11:00',
      location: '桃園市中壢區復興路46號9樓',
      quota: 200,
      registrationPeriod: '即日起 至 2025年7月9日 23:59',
      cost: '新台幣 600 元/人',
    },
    {
      id: 1,
      title: '梨山林輕健行',
      image: '/src/assets/image/events/events_01_mt.png',
      date: '2025年9月5日',
      description:
        '為了讓大家走出戶外，感受大自然的魅力，我們特別規劃了「梨山林輕健行」活動，帶領各位走進梨山的迷人山林，享受清新空氣與壯麗景色。這條路線適合各年齡層的參加者，無論是初學者還是有健行經驗的朋友，都能輕鬆參與，感受步行中的寧靜與放鬆。\n活動將在專業領隊的帶領下，穿越風景如畫的林間小徑，途中將設有數個休息點，並介紹當地的自然景觀與生態知識。參加者除了能提升健康體能，還能與社區居民一起享受親近大自然的樂趣，建立彼此間的聯繫與友誼。\n我們鼓勵大家穿著舒適的運動鞋，攜帶水壺、輕便餐點以及防曬用品，一起來放鬆心情，度過愉快的一天。快來報名參加，一同踏上這段美麗的梨山林輕健行吧！',
      timeRange: '2025年9月5日 06:00 - 11:00',
      location: '桃園市中壢區復興路46號9樓',
      quota: 200,
      registrationPeriod: '即日起 至 2025年7月9日 23:59',
      cost: '新台幣 400 元/人',
    },
    {
      id: 2,
      title: '梨花秘境之旅',
      image: '/src/assets/image/events/events_02_flower.png',
      date: '2025年9月5日',
      description:
        '春天來臨，梨花盛開，讓我們一起走進「梨花秘境之旅」，探索隱藏在梨山深處的美麗景點。這次活動將帶領大家走訪梨花樹海，漫遊在白色花海中，感受清新怡人的春日氣息。無論是喜愛攝影、熱愛大自然的朋友，或是單純想放鬆心情的參與者，都能在這條精心規劃的路線中找到樂趣。\n  在專業導遊的帶領下，我們將沿途介紹梨花的品種與生長環境，並深入了解當地的自然生態。活動設有輕鬆步道，適合各年齡層的朋友參加，還能在途中享受休息站提供的小食與熱茶，與其他社區居民共同度過愉快時光。\n帶著親友一起，穿上舒適的運動鞋，攜帶相機捕捉梨花的美麗，來一場與大自然親密接觸的旅行吧！快來報名參加，感受春天的美好。',
      timeRange: '2025年9月5日 09:00 - 16:00',
      location: '梨花谷觀光果園',
      quota: 100,
      registrationPeriod: '即日起 至 2025年8月15日 23:59',
      cost: '新台幣 800 元/人',
    },
  ]);
  const route = useRoute();
  const event = computed(() => {
    const eventId = parseInt(route.params.id, 10);
    return allEvents.value.find((e) => e.id === eventId);
  });
  const formattedDescription = computed(() => {
    if (!event.value) return '';
    return event.value.description.replace(/\n/g, '<br><br>');
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .event-detail-view {
    background-color: $primary-c25;
    padding-bottom: 80px;

    &__container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 20px;
    }

    &__breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin: 20px 0;

      // 關鍵修改：讓 breadcrumbs 下方所有的直接子元素都套用 body--b2
      & > * {
        @extend .body--b2;
      }

      p {
        color: $black;
      }
    }

    // &__breadcrumb-link {
    //   color: $primary-c700;
    //   text-decoration: none;
    //   &:hover {
    //     text-decoration: underline;
    //   }
    // }
    &__breadcrumb-link {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.2em;
      color: $primary-c700;
    }

    &__title-bar {
      background-color: $primary-c700;
      padding: 20px 30px;
      border-radius: 0;
      h3 {
        color: $white;
        margin: 0;
      }
    }

    &__date {
      color: $black;
      text-align: left;
      margin: 20px 0;
    }

    &__image {
      width: 100%;
      margin: 0 auto 30px auto;
      display: block;
      border-radius: $border-r-md;
    }

    &__description {
      margin-bottom: 50px;
      @extend .body--b3;
      line-height: 1.8;
    }

    &__info-section {
      margin-bottom: 50px;
    }

    &__info-title-bar {
      background-color: $primary-c700;
      padding: 15px 25px;
      border-radius: 0;
      h5 {
        color: $white;
        margin: 0;
      }
    }

    &__info-spacer {
      height: 15px;
    }

    &__info-list {
      list-style: none;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 25px;
      border-radius: $border-r-lg;

      li {
        display: flex;
        gap: 15px;
        &:not(:last-child) {
          margin-bottom: 15px;
        }
        p:first-child {
          flex-shrink: 0;
          width: 100px;
        }
      }
    }

    &__button-wrapper {
      @include flex-center;
    }

    &__not-found {
      text-align: center;
      padding: 80px 0;
      color: $neutral-c;
      h3 {
        margin-bottom: 1rem;
        color: $black;
      }
      p {
        margin-bottom: 2rem;
      }
    }
  }
</style>
