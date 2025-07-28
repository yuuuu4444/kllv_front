<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import MainBanner from '@/components/MainBanner.vue';
  import Categories from '@/assets/data/Repair/repair_categories_test.json';

  // table內容
  const reports = ref([]);

  onMounted(async () => {
    const res = await fetch('/src/assets/data/Repair/repair_reports_test.json');
    const rawData = await res.json();

    reports.value = rawData.map((r) => {
      const categoryItem = Categories.find((c) => c.category_no === r.category_no);
      return {
        ...r,
        category: categoryItem ? categoryItem.category_name : '未分類',
      };
    });
  });

  // 分頁切換
  const currentPage = ref(1);
  const pageSize = 12;

  const pagedReports = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return reports.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() => Math.ceil(reports.value.length / pageSize));

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);

  const goPrev = () => {
    if (!isFirstPage.value) currentPage.value--;
  };

  const goNext = () => {
    if (!isLastPage.value) currentPage.value++;
  };
</script>

<template>
  <div class="report-page">
    <MainBanner
      image="/src/assets/banner/banner_repair.jpg"
      title="維修通報"
    />

    <div class="report-page__container">
      <nav class="report-page__breadcrumb">
        <RouterLink
          to="/"
          class="report-page__breadcrumb-link"
        >
          首頁
        </RouterLink>
        &#45;
        <p class="report-page__breadcrumb-item body--b2">里民服務</p>
        &#45;
        <p class="report-page__breadcrumb-item body--b2">維修通報</p>
      </nav>

      <div class="report-page__action">
        <button class="report-button btn--process">我要報修</button>
      </div>

      <form
        action="#"
        class="report-filter"
      >
        <div class="report-filter__field">
          <label
            for=""
            class="report-filter__label"
          >
            案件類型
          </label>
          <select
            name="category_no"
            id=""
            class="report-filter__select"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              請選擇
            </option>
            <option value="1">路燈損壞</option>
            <option value="2">公共設施損壞</option>
            <option value="3">道路坑洞</option>
            <option value="4">其他</option>
          </select>
        </div>
        <div class="report-filter__field">
          <label
            for=""
            class="report-filter__label"
          >
            狀態
          </label>
          <select
            name="process_status"
            id=""
            class="report-filter__select"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              請選擇
            </option>
            <option value="0">待處理</option>
            <option value="2">已處理</option>
          </select>
        </div>
        <div class="report-filter__field">
          <label
            for=""
            class="report-filter__label"
          >
            案件編號
          </label>
          <div class="report-filter__input-group">
            <input
              type="text"
              class="report-filter__input"
            />
            <button class="report-filter__search">搜尋</button>
          </div>
        </div>
      </form>

      <section class="report-table">
        <table class="report-table__table">
          <thead class="report-table__head">
            <tr>
              <th>案件編號</th>
              <th>查報類別</th>
              <th>所在地點</th>
              <th>狀態</th>
              <th>填表日期</th>
              <th>查閱</th>
            </tr>
          </thead>
          <tbody class="report-table__body">
            <tr
              class="report-table__row"
              v-for="(repair, index) in pagedReports"
              :key="index"
            >
              <td>{{ repair.report_no }}</td>
              <td>{{ repair.category }}</td>
              <td>{{ repair.location }}</td>
              <td>已處理</td>
              <td>{{ repair.created_at }}</td>
              <td>
                <RouterLink
                  :to="`/repair/${repair.report_no}`"
                  class="report-table__link"
                >
                  查閱
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div class="report-pagination">
        <button
          class="report-pagination__prev btn--changepage"
          @click="goPrev"
        >
          &lt;
        </button>
        <p class="report-pagination__current">{{ currentPage }} / {{ totalPages }}</p>
        <button
          class="report-pagination__next btn--changepage"
          @click="goNext"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .report-page {
    background-color: $primary-c000;
    padding-bottom: 30px;

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
    }

    &__breadcrumb {
      display: flex;
      align-items: center;
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

    &__action {
      @include flex-center;
      margin-bottom: 50px;
    }

    .report-filter {
      @include flex-space-between;
      margin-bottom: 25px;
      flex-wrap: wrap;
      gap: 5px;

      &__field {
        @include flex-center;
        flex-direction: column;
        // width: 32.25%;
        flex: 1 1 30%;
        min-width: 250px;
        gap: 5px;
      }

      &__select {
        width: 100%;
        height: 40px;
        border-radius: $border-r-xs;
        padding: 0 10px;
        border: 1px solid $neutral-c;
        background-color: $white;
        font-size: 16px;
        letter-spacing: $spacing-l;
      }

      &__input-group {
        width: 100%;
        display: flex;
        height: 40px;
      }

      &__search {
        width: 60px;
        font-size: 16px;
        letter-spacing: $spacing-l;
        border-radius: $border-r-xs;
        border: 1px solid;
        cursor: pointer;
        background-color: $primary-c500;
        color: $white;

        &:hover {
          background-color: $primary-c100;
        }
      }

      &__input {
        flex-grow: 1;
        border-radius: $border-r-xs;
        border: 1px solid $neutral-c;
        border-right: none;
        padding: 0 10px;
        font-size: 16px;
        letter-spacing: $spacing-l;
      }

      &__label {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: $spacing-l;
      }
    }

    .report-table {
      margin-bottom: 60px;

      &__table {
        width: 100%;
        border: 1px solid $neutral-c;
        border-radius: $border-r-md;
        border-collapse: separate;
        overflow: hidden;
        background-color: $white;
      }

      &__head {
        background-color: $primary-c700;

        th {
          color: $white;
          border-right: 1px solid $neutral-c;
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: 32px;
          letter-spacing: 0.2em;
          padding: 14px 0;
        }
      }

      &__body {
        tr:nth-child(2n) {
          background-color: rgba(0, 75, 128, 0.1);
        }
      }

      &__row {
        text-align: center;

        td {
          border-right: 1px solid $neutral-c;
          border-bottom: 1px solid $neutral-c;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px;
          letter-spacing: 0.2em;
          padding: 20px 0;
        }
      }

      &__link {
        color: $primary-c700;
        text-decoration: underline;
      }
    }

    .report-pagination {
      @include flex-center;
      gap: 30px;

      &__current {
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
    }
  }
</style>
