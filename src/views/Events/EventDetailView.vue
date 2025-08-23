<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { ref, computed, onMounted } from 'vue'; // 新增 onMounted
  import { useRoute, RouterLink } from 'vue-router';
  // import eventsData from '@/assets/data/Events/events.json';
  const { VITE_API_BASE } = import.meta.env;

  const route = useRoute();
  const event = ref(null); // 改成ref
  const isLoading = ref(true);

  onMounted(async () => {
    isLoading.value = true;
    const eventId = route.params.id;
    if (!eventId) return;

    try {
      const response = await fetch(
        `${VITE_API_BASE}/api/events/event_get_by_id.php?event_no=${eventId}`,
      );
      if (!response.ok) throw new Error('API 請求失敗');

      const result = await response.json();
      if (result.status === 'success') {
        event.value = result.data; // 活動詳情存入ref
      } else {
        // 若API回傳找不到，event.value會維持null，這樣<template>裡的v-else就會自動顯示「找不到活動」
        console.warn(result.message);
      }
    } catch (error) {
      console.error(`載入活動 ${eventId} 詳情失敗:`, error);
    } finally {
      isLoading.value = false;
    }
  });

  const imageURL = import.meta.env.BASE_URL;
  const formattedStartDate = computed(() => {
    if (!event.value || !event.value.start_date) return '';
    const date = new Date(event.value.start_date);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  });

  const formattedTimeRange = computed(() => {
    if (!event.value || !event.value.start_date || !event.value.end_date) return '';
    const startDate = new Date(event.value.start_date);
    const endDate = new Date(event.value.end_date);
    const startTime = startDate.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const endTime = endDate.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${event.value.start_date.split(' ')[0]} ${startTime} - ${endTime}`;
  });

  const formattedDescription = computed(() => {
    if (!event.value || !event.value.description) return '';
    return event.value.description.replace(/\\n/g, '<br><br>');
  });
</script>

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
        <p class="body--b2">/ 里民服務</p>
        <RouterLink
          to="/events"
          class="event-detail-view__breadcrumb-link"
        >
          / 活動報名
        </RouterLink>
        <p class="body--b2">/ {{ event.title }}</p>
      </nav>

      <div class="event-detail-view__title-bar">
        <h3 class="bold">{{ event.title }}</h3>
      </div>

      <p class="body--b3 event-detail-view__date">{{ formattedStartDate }}</p>

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
            <p class="body--b3">{{ formattedTimeRange }}</p>
          </li>
          <li>
            <p class="body--b3">地點：</p>
            <p class="body--b3">{{ event.location }}</p>
          </li>
          <li>
            <p class="body--b3">人數限制：</p>
            <p class="body--b3">{{ event.capacity_limit }} 人</p>
          </li>
          <li>
            <p class="body--b3">報名時間：</p>
            <p class="body--b3">{{ event.registration_end }}</p>
          </li>
          <li>
            <p class="body--b3">報名費用：</p>
            <p class="body--b3">新台幣 {{ event.fee_per_person }} 元/人</p>
          </li>
        </ul>
      </div>

      <div class="event-detail-view__button-wrapper">
        <RouterLink
          v-if="event"
          :to="`/events/${event.event_no}/register`"
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

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .event-detail-view {
    background-color: $primary-c000;
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
      margin-bottom: 50px;
      padding-top: 30px;
    }

    &__breadcrumb-link,
    &__breadcrumbs p {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.2em;
    }

    &__breadcrumb-link {
      color: $primary-c700;
    }

    @include mobile {
      &__breadcrumbs {
        & > * {
          font-size: 16px !important;
          line-height: 26px !important;
          letter-spacing: 0.1em !important;
        }
      }
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
