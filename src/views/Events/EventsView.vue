<!-- 檔案路徑: src/views/Events/EventsView.vue -->
<template>
  <div class="events-view">
    <MainBanner
      image="/src/assets/image/banner_events.png"
      title="活動報名"
    />

    <div class="events-view__container">
      <nav class="events-view__breadcrumbs">
        <RouterLink
          to="/"
          class="events-view__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">- 里民服務</p>
        <p class="body--b2">- 活動報名</p>
      </nav>

      <div class="events-view__filter-wrapper">
        <div class="events-view__filters">
          <button
            v-for="category in filterCategories"
            :key="category.value"
            @click="selectCategory(category.value)"
            :class="['btn--tag', `filter-btn--${category.value}`]"
          >
            {{ category.text }}
          </button>
        </div>
      </div>

      <div
        v-if="paginatedEvents.length > 0"
        class="events-view__grid"
      >
        <EventCard
          v-for="event in paginatedEvents"
          :key="event.id"
          :event="event"
        />
      </div>
      <div
        v-else
        class="events-view__no-results"
      >
        <h5 class="bold">目前沒有符合條件的活動喔！</h5>
      </div>

      <!-- 1. 關鍵修改：更新分頁的 HTML 結構 -->
      <div class="events-view__pagination">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="btn--changepage"
        >
          <
        </button>
        <p class="events-view__pagination-current">{{ currentPage }} / {{ totalPages }}</p>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn--changepage"
        >
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import MainBanner from '@/components/MainBanner.vue';
  import { ref, computed } from 'vue';
  import EventCard from '@/components/EventCard.vue';
  import { RouterLink } from 'vue-router';

  const filterCategories = ref([
    { text: '全部活動', value: 'all' },
    { text: '旅遊', value: 'travel' },
    { text: '健康', value: 'health' },
    { text: '藝文', value: 'art' },
    { text: '其他', value: 'other' },
  ]);
  const activeCategory = ref('all');
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const allEvents = ref([
    {
      id: 1,
      title: '梨山林輕健行',
      category: '健康',
      type: 'health',
      image: '/src/assets/data/events/events_01_mt.png',
      date: '2025-09-05',
      deadline: '2025-08-26',
      quota: 200,
      price: 400,
    },
    {
      id: 2,
      title: '梨花秘境之旅',
      category: '旅遊',
      type: 'travel',
      image: '/src/assets/data/events/events_02_flower.png',
      date: '2025-09-05',
      deadline: '2025-08-26',
      quota: 200,
      price: 800,
    },
    {
      id: 3,
      title: '瑜珈派對',
      category: '健康',
      type: 'health',
      image: 'https://picsum.photos/seed/3/396/280',
      date: '2025-09-05',
      deadline: '2025-08-26',
      quota: 200,
      price: 150,
    },
    {
      id: 4,
      title: '端午包粽樂',
      category: '藝文',
      type: 'art',
      image: 'https://picsum.photos/seed/4/396/280',
      date: '2025-09-05',
      deadline: '2025-08-26',
      quota: 200,
      price: 200,
    },
    {
      id: 5,
      title: 'Emerald畫展',
      category: '藝文',
      type: 'art',
      image: 'https://picsum.photos/seed/5/396/280',
      date: '2025-09-05',
      deadline: '2025-08-26',
      quota: 200,
      price: 0,
    },
    {
      id: 6,
      title: '空瀧馬拉松',
      category: '健康',
      type: 'health',
      image: 'https://picsum.photos/seed/6/396/280',
      date: '2025-09-05',
      deadline: '2025-08-26',
      quota: 200,
      price: 600,
    },
  ]);
  const filteredEvents = computed(() => {
    if (activeCategory.value === 'all') return allEvents.value;
    return allEvents.value.filter((event) => event.type === activeCategory.value);
  });
  const totalPages = computed(() => {
    if (filteredEvents.value.length === 0) return 1;
    return Math.ceil(filteredEvents.value.length / itemsPerPage.value);
  });
  const paginatedEvents = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filteredEvents.value.slice(startIndex, endIndex);
  });
  const selectCategory = (category) => {
    activeCategory.value = category;
    currentPage.value = 1;
  };
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .events-view {
    background-color: $primary-c25;
    padding-bottom: 80px;

    &__container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }

    &__breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 20px;
      padding-top: 20px;
    }

    &__breadcrumb-link {
      @extend .body--b2;
      color: $primary-c700;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    &__filter-wrapper {
      background-color: $white;
      padding: 20px;
      border-radius: $border-r-md;
      margin: 50px 0;
    }

    &__filters {
      @include flex-center;
      gap: 40px;
      flex-wrap: wrap;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      margin-bottom: 50px;
      @include mobile {
        grid-template-columns: 1fr;
      }
    }

    &__no-results {
      @include flex-center;
      min-height: 300px;
      color: $neutral-c;
    }

    // --- 2. 關鍵修改：更新分頁的樣式 ---
    &__pagination {
      @include flex-center;
      gap: 30px; // 將間距改為 30px，與維修頁統一

      .btn--changepage {
        color: $white;
        font-size: 24px;
      }

      .btn--changepage:disabled {
        background-color: $neutral-c;
        cursor: not-allowed;
      }
    }

    &__pagination-current {
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0.1em;
      width: 80px;
      padding: 14px 0;
      border: 1px solid $black;
      border-radius: $border-r-xs;
      background-color: $white;
    }
    // --- 修改結束 ---
  }

  // 按鈕顏色與 Hover 效果的樣式
  .btn--tag {
    &.filter-btn--all {
      background-color: $primary-c700;
      border-color: $primary-c700;
    }
    &.filter-btn--travel {
      background-color: #ca877b;
      border-color: #ca877b;
    }
    &.filter-btn--health {
      background-color: #6782a4;
      border-color: #6782a4;
    }
    &.filter-btn--art {
      background-color: #719469;
      border-color: #719469;
    }
    &.filter-btn--other {
      background-color: #959595;
      border-color: #959595;
    }

    &.filter-btn--all:hover {
      background-color: $white;
      color: $primary-c700;
    }
    &.filter-btn--travel:hover {
      background-color: $white;
      color: #ca877b;
    }
    &.filter-btn--health:hover {
      background-color: $white;
      color: #6782a4;
    }
    &.filter-btn--art:hover {
      background-color: $white;
      color: #719469;
    }
    &.filter-btn--other:hover {
      background-color: $white;
      color: #959595;
    }
  }
</style>
