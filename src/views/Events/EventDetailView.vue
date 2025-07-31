<template>
  <div class="event-detail-view">
    <div class="event-detail-view__banner">
      <div class="event-detail-view__banner-title-wrapper">
        <h1 class="bold">活動報名</h1>
      </div>
    </div>

    <div
      v-if="event"
      class="event-detail-view__container"
    >
      <p class="body--b4 event-detail-view__breadcrumbs">
        首頁 - 里民服務 - 活動報名 - {{ event.title }}
      </p>

      <div class="event-detail-view__title-bar">
        <h3 class="bold">{{ event.title }}</h3>
      </div>

      <p class="body--b3 event-detail-view__date">{{ event.date }}</p>

      <img
        :src="event.image"
        :alt="event.title"
        class="event-detail-view__image"
      />

      <!-- 寫死的文字替換為動態綁定的資料 -->
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
  import { ref, computed } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';

  // 假資料陣列
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
      image: 'https://picsum.photos/seed/1/900/600',
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
      image: 'https://picsum.photos/seed/2/900/600',
      date: '2025年9月5日',
      description:
        '春天來臨，梨花盛開，讓我們一起走進「梨花秘境之旅」，探索隱藏在梨山深處的美麗景點。這次活動將帶領大家走訪梨花樹海，漫遊在白色花海中，感受清新怡人的春日氣息。無論是喜愛攝影、熱愛大自然的朋友，或是單純想放鬆心情的參與者，都能在這條精心規劃的路線中找到樂趣。\n  在專業導遊的帶領下，我們將沿途介紹梨花的品種與生長環境，並深入了解當地的自然生態。活動設有輕鬆步道，適合各年齡層的朋友參加，還能在途中享受休息站提供的小食與熱茶，與其他社區居民共同度過愉快時光。\n帶著親友一起，穿上舒適的運動鞋，攜帶相機捕捉梨花的美麗，來一場與大自然親密接觸的旅行吧！快來報名參加，感受春天的美好。',
      timeRange: '2025年9月5日 09:00 - 16:00',
      location: '梨花谷觀光果園',
      quota: 100,
      registrationPeriod: '即日起 至 2025年8月15日 23:59',
      cost: '新台幣 800 元/人',
    },
    {
      id: 3,
      title: '瑜珈派對',
      image: 'https://picsum.photos/seed/2/900/600',
      date: '2025年9月5日',
      description:
        '快來加入我們的「瑜珈派對」，讓身心靈在輕鬆愉快的氛圍中獲得全方位的放鬆與舒展！這場活動特別規劃為一個輕鬆、有趣又具挑戰的瑜珈體驗，無論你是瑜珈新手或是有一定基礎的愛好者，都能在專業指導老師的帶領下，感受瑜珈動作帶來的舒緩效果。\n活動當天，我們將透過一系列的動作練習，搭配輕柔的音樂與放鬆技巧，幫助參加者釋放壓力，增強身體柔韌性，同時提高專注力。瑜珈的每一個呼吸與動作，不僅能提升身體健康，還能在活動中建立起與其他社區朋友的連結與互動。\n 來一場集體的瑜珈派對吧！穿上輕便舒適的運動服，帶上瑜珈墊與愉快的心情，讓我們一起在這場健康派對中，釋放壓力、強健體魄，並開心交流。',
      timeRange: '2025年9月5日 09:00 - 16:00',
      location: '桃園市中壢區復興路46號9樓',
      quota: 100,
      registrationPeriod: '即日起 至 2025年8月15日 23:59',
      cost: '新台幣 150 元/人',
    },
    {
      id: 4,
      title: '端午包粽樂',
      image: 'https://picsum.photos/seed/2/900/600',
      date: '2025年9月5日',
      description:
        '端午節將至，讓我們一起來參加「端午包粽樂」活動，體驗這個充滿傳統味道的節日！本次活動將帶領大家親手包粽子，學習傳統粽子包製技巧，並與社區居民共同分享這份節日的美好。\n在專業指導老師的帶領下，您將學習如何選擇優質的糯米、餡料及粽葉，並了解不同種類的粽子製作方法。不僅如此，我們還將為大家準備豐富的活動內容，讓每位參加者都能體驗到親手包粽的樂趣，並品嚐自己製作的美味粽子。\n這是一個適合全家大小參加的活動，不論您是粽子高手還是第一次動手，都能在輕鬆的氛圍中學習和交流，感受傳統文化的魅力。快來和我們一起過一個溫馨又有趣的端午節吧！穿上舒適的服裝，帶著歡笑和好心情，一同享受包粽的樂趣！',
      timeRange: '2025年9月5日 09:00 - 16:00',
      location: '桃園市中壢區復興路46號9樓',
      quota: 100,
      registrationPeriod: '即日起 至 2025年8月15日 23:59',
      cost: '新台幣 200 元/人',
    },
    {
      id: 5,
      title: 'Emerald畫展',
      image: 'https://picsum.photos/seed/2/900/600',
      date: '2025年9月5日',
      description:
        '誠摯邀請您來參加「Emerald畫展」，一起沉浸在色彩與創意的藝術世界中！這場畫展將展示一系列充滿活力的作品，以「Emerald」為主題，呈現出自然、和諧與美麗的視覺體驗。每一幅作品都蘊含著深厚的情感與藝術家獨特的視角，展現了從大自然中汲取靈感的無限創造力。\n本次畫展適合所有藝術愛好者與家庭參觀，無論您是對藝術有濃厚興趣，還是單純想來感受藝術氛圍的朋友，都能在這裡找到屬於自己的藝術共鳴。我們還安排了藝術家講座與現場互動，您將有機會近距離了解每幅作品背後的創作故事。\n快來一起感受色彩交織的魅力，與其他社區朋友共享這份視覺與心靈的盛宴！我們期待您的蒞臨，一同探索「Emerald畫展」中的無限可能。',
      timeRange: '2025年9月5日 09:00 - 16:00',
      location: '桃園市中壢區復興路46號9樓',
      quota: 100,
      registrationPeriod: '即日起 至 2025年8月15日 23:59',
      cost: '免費',
    },
  ]);

  const route = useRoute();
  const event = computed(() => {
    const eventId = parseInt(route.params.id, 10);
    return allEvents.value.find((e) => e.id === eventId);
  });

  // 新增一個計算屬性來處理換行
  const formattedDescription = computed(() => {
    // 確保 vent已經載入，避免錯誤
    if (!event.value) return '';
    return event.value.description.replace(/\n/g, '<br><br>'); // 使用兩個 <br> 讓段落感更強
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .event-detail-view {
    background-color: $primary-c25;
    padding-bottom: 80px;

    &__banner {
      width: 100%;
      height: 500px;
      background-image: url('https://picsum.photos/seed/banner/1920/500');
      background-size: cover;
      background-position: center;
      @include flex-center;
    }

    &__banner-title-wrapper {
      padding: 1.5rem 3rem;

      h1 {
        color: $white;
        text-shadow: 0 2px 10px rgba($black, 0.5);
      }
    }

    &__container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 20px;
    }

    &__breadcrumbs {
      color: $black;
      margin: 20px 0;
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
      // 繼承body--b3的line-height和letter-spacing
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
