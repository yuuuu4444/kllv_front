<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import MainBanner from '@/components/MainBanner.vue';
  import Categories from '@/assets/data/Repair/repair_categories_test.json';
  import Repair from '@/assets/data/Repair/repair_reports_test.json';

  const filterCategory = ref('');
  const filterStatus = ref('');
  const filterReportNo = ref('');

  // table內容
  const reports = ref([]);

  // 先用import方式
  const categoryMap = new Map(Categories.map((c) => [c.category_no, c.category_name]));
  reports.value = Repair.map((r) => ({
    ...r,
    category: categoryMap.get(r.category_no) || '未分類',
    status_text: r.process_status === 2 ? '已處理' : '待處理',
  }));

  /*
  onMounted(async () => {
    const res = await fetch('/src/assets/data/Repair/repair_reports_test.json');
    const rawData = await res.json();

    reports.value = rawData.map((r) => {
      const categoryItem = Categories.find((c) => c.category_no === r.category_no);
      const statusText = r.process_status === 2 ? '已處理' : '待處理';
      return {
        ...r,
        category: categoryItem ? categoryItem.category_name : '未分類',
        status_text: statusText,
      };
    });
  });
  */

  // 篩選
  const filteredReports = computed(() => {
    return reports.value.filter((r) => {
      // 分類篩選
      const matchCategory = !filterCategory.value || r.category_no == filterCategory.value;
      // 狀態篩選
      const matchStatus = !filterStatus.value || r.status_text == filterStatus.value;
      // 編號篩選(忽略大小寫)
      const matchReportNo =
        !filterReportNo.value ||
        r.report_no.toLowerCase().includes(filterReportNo.value.toLowerCase());
      return matchCategory && matchStatus && matchReportNo;
    });
  });

  // 分頁切換
  const currentPage = ref(1);
  const pageSize = 12;

  const pagedReports = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredReports.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() => Math.ceil(filteredReports.value.length / pageSize));

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
  <MainBanner
    image="assets/banner/banner_repair.jpg"
    title="維修通報"
    titleAos="fade"
  />
  <div class="report-page">
    <div class="report-page__container">
      <nav class="report-page__breadcrumb">
        <RouterLink
          to="/"
          class="report-page__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="report-page__breadcrumb-item body--b2">&#47;里民服務</p>
        <p class="report-page__breadcrumb-item body--b2">&#47;維修通報</p>
      </nav>

      <RouterLink
        to="/repair/form"
        class="report-page__action"
      >
        <button
          class="report-button btn--process"
          data-aos="fade"
        >
          我要報修
        </button>
      </RouterLink>

      <form
        action="#"
        class="report-filter"
        data-aos="fade"
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
            v-model="filterCategory"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              請選擇
            </option>
            <option
              v-for="item in Categories"
              :key="item.category_no"
              :value="item.category_no"
            >
              {{ item.category_name }}
            </option>
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
            v-model="filterStatus"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              請選擇
            </option>
            <option value="待處理">待處理</option>
            <option value="已處理">已處理</option>
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
              v-model="filterReportNo"
            />
            <button
              type="button"
              class="report-filter__search"
              @click="filterReportNo = ''"
            >
              清除
            </button>
          </div>
        </div>
      </form>

      <section
        class="report-table"
        data-aos="fade"
      >
        <table class="report-table__table">
          <thead class="report-table__head">
            <tr>
              <th>案件編號</th>
              <th>查報類別</th>
              <th class="mobile-hidden">所在地點</th>
              <th>狀態</th>
              <th class="mobile-hidden">填表日期</th>
              <th>查閱</th>
            </tr>
          </thead>
          <tbody class="report-table__body">
            <tr
              class="report-table__row"
              v-for="(repair, index) in pagedReports"
              :key="index"
            >
              <td data-label="案件編號">{{ repair.report_no }}</td>
              <td data-label="查報類別">{{ repair.category }}</td>
              <td data-label="所在地點">{{ repair.location }}</td>
              <td data-label="狀態">{{ repair.status_text }}</td>
              <td data-label="填表日期">{{ repair.created_at }}</td>
              <td data-label="查閱">
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

      <div
        class="report-pagination"
        data-aos="fade"
      >
        <button
          class="report-pagination__prev btn--changepage"
          @click="goPrev"
          :disabled="currentPage === 1"
        >
          &lt;
        </button>
        <p class="report-pagination__current">{{ currentPage }} / {{ totalPages }}</p>
        <button
          class="report-pagination__next btn--changepage"
          @click="goNext"
          :disabled="currentPage === totalPages"
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

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
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
      &__next,
      &__prev {
        color: $white;
        font-size: 24px;
      }

      &__next:disabled,
      &__prev:disabled {
        background-color: $neutral-c;
        cursor: not-allowed;
      }
    }

    @include mobile {
      &__container {
        padding-left: 2%;
        padding-right: 2%;
      }

      &__breadcrumb-link {
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.1em;
      }

      .report-filter {
        &__label {
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.1em;
        }

        &__search,
        &__select,
        &__input {
          font-size: 14px;
        }
      }

      .report-table {
        &__head {
          th {
            font-size: 16px;
            line-height: 26px;
            letter-spacing: 0.1em;
          }
        }

        &__row {
          td {
            font-size: 14px;
            line-height: 22px;
            letter-spacing: 0.1em;
          }
        }

        .mobile-hidden {
          display: none;
        }

        &__head th:nth-child(3),
        &__head th:nth-child(5),
        &__row td:nth-child(3),
        &__row td:nth-child(5) {
          display: none;
        }
      }
    }
  }
</style>
