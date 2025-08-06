<!-- src/views/Member/MemberRepair.vue -->
<template>
  <div class="repairPage">
    <!-- 手機版 header -->
    <MemberMobileHeader
      title="帳戶管理"
      @back="goBackToMenu"
    />
    <h5 class="repairPage__title bold">維修通報</h5>

    <!-- 桌面版：維修表格 -->
    <div class="repairPage__desktopView">
      <table class="repairTable">
        <thead>
          <tr>
            <th>通報日期</th>
            <th>案件編號</th>
            <th>查報類別</th>
            <th>處理狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report in paginatedRepairs"
            :key="report.report_no"
            class="repairTable__row"
          >
            <td>{{ report.reported_at }}</td>
            <td>
              <router-link
                :to="`/repair/${report.report_no}`"
                class="repairTable__link"
              >
                {{ formatReportNo(report.report_no) }}
              </router-link>
            </td>
            <td>{{ report.category_name }}</td>
            <td>
              <!-- 根據 status 顯示對應的文字 -->
              <span :class="['statusChip', getStatusClass(report.status)]">
                {{ getStatusText(report.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁 -->
      <div
        v-if="totalPages > 1"
        class="pagination"
      >
        <button
          class="pagination__button btn--changepage"
          @click="goPrev"
          :disabled="isFirstPage"
        >
          &lt;
        </button>
        <p class="pagination__current">{{ currentPage }} / {{ totalPages }}</p>
        <button
          class="pagination__button btn--changepage"
          @click="goNext"
          :disabled="isLastPage"
        >
          &gt;
        </button>
      </div>
    </div>

    <!-- 手機版：維修列表 -->
    <div class="repairPage__mobileView">
      <div
        v-for="report in paginatedRepairs"
        :key="report.report_no"
        class="mobileList__item"
      >
        <router-link
          :to="`/repair/${report.report_no}`"
          class="mobileList__info"
        >
          <span class="mobileList__id">{{ formatReportNo(report.report_no) }}</span>
          <span class="mobileList__category">{{ report.category_name }}</span>
        </router-link>
        <span :class="['statusChip', getStatusClass(report.status)]">
          {{ getStatusText(report.status) }}
        </span>
      </div>
      <!-- 分頁 -->
      <div
        v-if="totalPages > 1"
        class="pagination"
      >
        <button
          class="pagination__button btn--changepage"
          @click="goPrev"
          :disabled="isFirstPage"
        >
          &lt;
        </button>
        <p class="pagination__current">{{ currentPage }} / {{ totalPages }}</p>
        <button
          class="pagination__button btn--changepage"
          @click="goNext"
          :disabled="isLastPage"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import MemberMobileHeader from '@/components/MemberMobileHeader.vue';

  const router = useRouter();

  // --- 假資料 (對應 repair 資料庫表格) ---
  const repairReports = ref([
    {
      report_no: 'RR000001', // 通報單號
      location: '里民活動中心前路口', // 通報地點
      category_no: 1, // 通報類別 (FK)
      category_name: '路燈損壞', // 類別名稱 (通常由後端 JOIN 提供)
      description: '路燈從昨晚開始閃爍不停，影響交通安全。', // 情形概述
      status: 0, // 處理狀態 (0="待處理", 1="處理中", 2="已處理", 3="不受理")
      reported_user: 'user_account_001', // 通報人ID
      reported_at: '2025-07-04', // 通報日期
    },
    {
      report_no: 'RR000002',
      location: '幸福公園兒童遊樂區',
      category_no: 2,
      category_name: '公園設施損壞',
      description: '溜滑梯有裂痕，有安全疑慮。',
      status: 2, // 已處理
      reported_user: 'user_account_001',
      reported_at: '2025-05-20',
    },
    // ... 為了測試分頁，可以再多加幾筆資料
    { report_no: 'RR000003', reported_at: '2025-04-15', category_name: '道路坑窪', status: 1 },
    { report_no: 'RR000004', reported_at: '2025-03-02', category_name: '髒亂點檢舉', status: 3 },
  ]);

  // --- 分頁邏輯 ---
  const pageSize = ref(3); // 每頁顯示 3 筆 (桌面和手機共用)
  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(repairReports.value.length / pageSize.value));
  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);

  const paginatedRepairs = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return repairReports.value.slice(startIndex, endIndex);
  });

  const goPrev = () => {
    if (!isFirstPage.value) currentPage.value--;
  };
  const goNext = () => {
    if (!isLastPage.value) currentPage.value++;
  };

  // --- 輔助函式 ---
  const goBackToMenu = () => router.push('/member');

  // 格式化案件編號 (例如，只顯示後幾碼或維持原樣)
  const formatReportNo = (no) => `${no}`; // 假設前面要加 RR

  // 根據狀態碼回傳對應的文字
  const getStatusText = (status) => {
    const statusMap = { 0: '待處理', 1: '處理中', 2: '已處理', 3: '不受理' };
    return statusMap[status] || '未知狀態';
  };

  // 根據狀態碼回傳對應的 CSS class
  const getStatusClass = (status) => {
    const classMap = { 0: 'is-pending', 1: 'is-processing', 2: 'is-done', 3: 'is-rejected' };
    return classMap[status] || '';
  };
</script>

<style lang="scss" scoped>
  .repairPage {
    &__title {
      color: $primary-c700;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 32px;
    }
    &__desktopView {
      display: block;
    }
    &__mobileView {
      display: none;
    }
  }

  .repairTable {
    width: 100%;
    border: 1px solid $neutral-c;
    border-radius: $border-r-md;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    background-color: $white;

    thead tr {
      background-color: $primary-c700;
      th {
        color: $white;
        border-right: 1px solid $neutral-c;
        font-size: 16px;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.2em;
        padding: 14px 16px;
        text-align: center;
        &:last-child {
          border-right: none;
        }
      }
    }

    tbody {
      tr:nth-child(2n) {
        background-color: rgba(0, 75, 128, 0.1);
        letter-spacing: 0.2em;
      }
      td {
        border-right: 1px solid $neutral-c;
        border-bottom: 1px solid $neutral-c;
        padding: 14px 16px; // 恢復左右 padding
        color: $black;
        text-align: center;
        vertical-align: middle;
        word-break: break-all;
        letter-spacing: 0.2em;

        &:last-child {
          border-right: none;
        }
      }
      tr:last-child td {
        border-bottom: none;
      }
    }

    &__link {
      color: $black;
      text-decoration: underline;
      &:hover {
        color: $primary-c500;
      }
    }
  }

  // 狀態
  .statusChip {
    &.is-pending {
      color: $semantic-y;
    }
    &.is-processing {
      color: $primary-c500;
    }
    &.is-done {
      color: $semantic-g;
    }
    &.is-rejected {
      color: $neutral-c;
    }
  }

  // 分頁
  .pagination {
    @include flex-center;
    gap: 30px;
    margin: 30px 0;

    &__current {
      text-align: center;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.1em;
      width: 80px;
      padding: 14px 0;
      border: 1px solid $black;
      border-radius: $border-r-xs;
      background-color: $white;
    }
    &__button:disabled {
      background-color: $neutral-c;
      cursor: not-allowed;
      &:hover {
        background-color: $neutral-c;
      }
    }
  }

  @include mobile {
    .repairPage {
      &__title {
        text-align: center;
        margin: 24px;
      }
      &__desktopView {
        display: none;
      }
      &__mobileView {
        display: block;
      }
    }

    .mobileList {
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid $primary-c100;
      }
      &__info {
        display: flex;
        align-items: center;
        gap: 16px;
        text-decoration: none;
        color: inherit;
      }
      &__id {
        font-weight: 500;
        color: $black;
      }
      &__category {
        color: $primary-c700;
      }
    }

    // 狀態
    .statusChip {
      padding: 4px 12px;
      border-radius: 5px;
      font-size: 14px;
      border: 1px solid transparent;
      &.is-pending {
        color: $semantic-y;
        border-color: $semantic-y;
      }
      &.is-processing {
        color: $primary-c500;
        border-color: $primary-c500;
      }
      &.is-done {
        color: $semantic-g;
        border-color: $semantic-g;
      }
      &.is-rejected {
        color: $white;
        background-color: $neutral-c;
      }
    }
  }
</style>
