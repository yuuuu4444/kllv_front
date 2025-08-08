<template>
  <div class="events-view">
    <MainBanner
      image="assets/banner/banner_events.png"
      title="活動報名"
      titleAos="fade"
    />

    <div class="events-view__container">
      <nav class="events-view__breadcrumbs">
        <RouterLink
          to="/"
          class="events-view__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">/里民服務</p>
        <p class="body--b2">/活動報名</p>
      </nav>

      <!-- 手機版專用的下拉選單 -->
      <div
        class="events-view__filter-mobile"
        data-aos="fade"
      >
        <h2 class="bold">活動總覽</h2>
        <select
          v-model="activeCategory"
          class="events-view__filter-select"
        >
          <option
            v-for="category in filterCategories"
            :key="category.category_no"
            :value="category.category_no"
          >
            {{ category.category_name }}
          </option>
        </select>
      </div>

      <!-- 桌機版的篩選器 -->
      <div
        class="events-view__filter-wrapper"
        data-aos="fade"
      >
        <div class="events-view__filters">
          <button
            v-for="category in filterCategories"
            :key="category.category_no"
            @click="selectCategory(category.category_no)"
            :class="['btn--tag', `filter-btn--category-${category.category_no}`]"
          >
            {{ category.category_name }}
          </button>
        </div>
      </div>

      <div
        v-if="paginatedEvents.length > 0"
        class="events-view__grid"
        data-aos="fade"
      >
        <EventCard
          v-for="event in paginatedEvents"
          :key="event.event_no"
          :event="event"
        />
      </div>
      <div
        v-else
        class="events-view__no-results"
      >
        <h5 class="bold">目前沒有符合條件的活動喔！</h5>
      </div>

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
  import { ref, computed, onMounted } from 'vue';
  import EventCard from '@/components/EventCard.vue';
  import { RouterLink } from 'vue-router';

  import eventsData from '@/assets/data/Events/events.json';
  import categoriesData from '@/assets/data/Events/event_categories.json';

  const filterCategories = ref([]);
  const activeCategory = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const allEvents = ref([]);

  onMounted(() => {
    const categoryMap = new Map(categoriesData.map((cat) => [cat.category_no, cat.category_name]));
    const processedEvents = eventsData.map((event) => ({
      ...event,
      category_name: categoryMap.get(event.category_no) || '未分類',
    }));
    allEvents.value = processedEvents;
    filterCategories.value = [{ category_no: 0, category_name: '全部活動' }, ...categoriesData];
  });

  const selectCategory = (categoryNo) => {
    activeCategory.value = categoryNo;
    currentPage.value = 1;
  };
  const filteredEvents = computed(() => {
    if (activeCategory.value === 0) {
      return allEvents.value;
    }
    return allEvents.value.filter((event) => event.category_no === activeCategory.value);
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
    background-color: $primary-c000;
    padding-bottom: 80px;

    &__banner-container :deep(.banner) {
      background-position: top !important;
    }
    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
    }

    &__breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 50px;
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

    &__filter-mobile {
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin: 50px 0;
    }

    &__filter-select {
      width: 100%;
      max-width: 300px;
      height: 40px;
      border-radius: $border-r-xs;
      padding: 0 10px;
      border: 1px solid $neutral-c;
      background-color: $white;
      font-size: 16px;
      letter-spacing: $spacing-l;
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
      gap: 40px;
      margin-bottom: 50px;
      justify-content: center;
      grid-template-columns: repeat(3, 415px);

      @media (max-width: 1400px) {
        grid-template-columns: repeat(2, 415px);
      }

      @include mobile {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }

    &__no-results {
      @include flex-center;
      min-height: 300px;
      color: $neutral-c;
    }

    &__pagination {
      @include flex-center;
      gap: 30px;

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

    @include mobile {
      &__filter-wrapper {
        display: none;
      }
      &__filter-mobile {
        display: flex;
      }
      &__breadcrumbs {
        & > * {
          font-size: 16px !important;
          line-height: 26px !important;
          letter-spacing: 0.1em !important;
        }
      }
    }
  }

  .btn--tag {
    &.filter-btn--category-0 {
      background-color: $primary-c700;
      border-color: $primary-c700;
    }
    &.filter-btn--category-1 {
      background-color: #ca877b;
      border-color: #ca877b;
    }
    &.filter-btn--category-2 {
      background-color: #6782a4;
      border-color: #6782a4;
    }
    &.filter-btn--category-3 {
      background-color: #719469;
      border-color: #719469;
    }
    &.filter-btn--category-4 {
      background-color: #959595;
      border-color: #959595;
    }

    &.filter-btn--category-0:hover {
      background-color: $white;
      color: $primary-c700;
    }
    &.filter-btn--category-1:hover {
      background-color: $white;
      color: #ca877b;
    }
    &.filter-btn--category-2:hover {
      background-color: $white;
      color: #6782a4;
    }
    &.filter-btn--category-3:hover {
      background-color: $white;
      color: #719469;
    }
    &.filter-btn--category-4:hover {
      background-color: $white;
      color: #959595;
    }
  }
</style>
