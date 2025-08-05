<template>
  <div class="eventsPage">
    <!-- 手機版表格、桌面版列表 顯示狀態 -->
    <div v-if="!isMobileDetailVisible && !isMobileCancelFormVisible">
      <!-- 手機版 header -->
      <MemberMobileHeader
        title="帳戶管理"
        @back="goBackToMenu"
      />
      <h5 class="eventsPage__title bold">活動報名</h5>

      <!-- 桌面版：活動表格 -->
      <div class="eventsPage__desktopView">
        <table class="eventTable">
          <thead>
            <tr>
              <th>活動日期</th>
              <th>報名項目</th>
              <th>取消</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="event in props.userEvents"
              :key="event.order_no"
              @click="selectEvent(event)"
              class="is-clickable"
              :class="{ 'is-active': selectedEvent && selectedEvent.order_no === event.order_no }"
            >
              <td>{{ event.activity_date }}</td>
              <td>{{ event.activity_name }}</td>
              <td class="cancel-cell">
                <button
                  class="btn--membercancel"
                  :class="getCancelButtonClass(event)"
                  :disabled="event.status === 3 || !isCancellable(event)"
                  @click.stop="isCancellable(event) && showCancelForm(event)"
                >
                  {{ getCancelButtonText(event) }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 桌面版：詳細資訊 -->
        <div
          v-if="selectedEvent"
          class="eventDetail"
        >
          <h5 class="eventDetail__title bold">活動詳細資料</h5>
          <div class="eventDetailContainer">
            <div class="detailItem">
              <span class="label">活動名稱：</span>
              <span class="value">{{ selectedEvent.activity_name }}</span>
            </div>
            <div class="detailItem">
              <span class="label">活動時間：</span>
              <span class="value">{{ selectedEvent.activity_time }}</span>
            </div>
            <div class="detailItem">
              <span class="label">活動地點：</span>
              <span class="value">{{ selectedEvent.activity_location }}</span>
            </div>
            <div class="detailItem">
              <span class="label">已付金額：</span>
              <span class="value">{{ selectedEvent.total_amount }} 元</span>
            </div>
            <div class="detailItem">
              <span class="label">參加人數：</span>
              <span class="value">{{ selectedEvent.attendance }} 人</span>
            </div>
            <div
              v-for="(participant, index) in selectedEvent.participants"
              :key="participant.participant_no"
              class="participant-item"
            >
              <div class="detailItem">
                <span class="label">參加人{{ index + 1 }}：</span>
                <span class="value">{{ participant.full_name }}</span>
              </div>
              <div class="detailItem">
                <span class="label">電子信箱：</span>
                <span class="value">{{ participant.email }}</span>
              </div>
              <div class="detailItem">
                <span class="label">連絡電話：</span>
                <span class="value">{{ participant.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 手機版：列表 -->
      <div class="mobileList">
        <div
          v-for="event in props.userEvents"
          :key="event.order_no"
          class="mobileList__item"
          @click="showEventDetails(event)"
        >
          <div class="item__info">
            <span class="item__date">{{ event.activity_date }}</span>
            <span class="item__name">{{ event.activity_name }}</span>
          </div>
          <span
            v-if="event.status === 3"
            class="statusChip is-cancelled"
          >
            已取消
          </span>
        </div>
      </div>
    </div>

    <!-- 手機版第二層：活動詳細資料 -->
    <div
      v-else-if="isMobileDetailVisible"
      class="mobileDetailContainer"
    >
      <MemberMobileHeader
        title="活動報名"
        @back="hideEventDetails"
      >
        <template #actions>
          <button
            v-if="viewingEvent && isCancellable(viewingEvent)"
            @click="showCancelForm(viewingEvent)"
            class="mobileHeader__actionButton is-cancel"
          >
            我要取消
          </button>
        </template>
      </MemberMobileHeader>
      <h5 class="eventsPage__title bold">活動詳細資料</h5>
      <div
        v-if="viewingEvent"
        class="eventDetailContainer"
      >
        <div class="detailItem">
          <span class="label">活動名稱：</span>
          <span class="value">{{ viewingEvent.activity_name }}</span>
        </div>
        <div class="detailItem">
          <span class="label">活動時間：</span>
          <span class="value">{{ viewingEvent.activity_time }}</span>
        </div>
        <div class="detailItem">
          <span class="label">活動地點：</span>
          <span class="value">{{ viewingEvent.activity_location }}</span>
        </div>
        <div class="detailItem">
          <span class="label">已付金額：</span>
          <span class="value">{{ viewingEvent.total_amount }} 元</span>
        </div>
        <div class="detailItem">
          <span class="label">參加人數：</span>
          <span class="value">{{ viewingEvent.attendance }} 人</span>
        </div>
        <div
          v-for="(participant, index) in viewingEvent.participants"
          :key="participant.participant_no"
          class="participant-item"
        >
          <div class="detailItem">
            <span class="label">參加人{{ index + 1 }}：</span>
            <span class="value">{{ participant.full_name }}</span>
          </div>
          <div class="detailItem">
            <span class="label">電子信箱：</span>
            <span class="value">{{ participant.email }}</span>
          </div>
          <div class="detailItem">
            <span class="label">連絡電話：</span>
            <span class="value">{{ participant.phone }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機版第三層：取消原因表單 -->
    <div
      v-else-if="isMobileCancelFormVisible"
      class="mobileCancelContainer"
    >
      <MemberMobileHeader
        title="活動詳細資料"
        @back="hideCancelForm"
      >
        <template #actions>
          <button
            @click="submitCancellation"
            class="mobileHeader__actionButton is-save"
          >
            送出
          </button>
        </template>
      </MemberMobileHeader>
      <form
        class="cancelForm"
        @submit.prevent="submitCancellation"
      >
        <h5 class="cancelForm__title bold">取消原因</h5>
        <select
          v-model="cancellationReasonNo"
          class="cancel-reason-select"
        >
          <option
            disabled
            value=""
          >
            請選擇
          </option>
          <option
            v-for="reason in cancelReasons"
            :key="reason.reason_no"
            :value="reason.reason_no"
          >
            {{ reason.reason_name }}
          </option>
        </select>
        <div class="notice-section">
          <p>注意事項：</p>
          <p>已繳費者請另行申請退費。若您已完成繳費，請聯繫里長辦公室申請退費，並提供以下資訊：</p>
          <ul>
            <li>姓名</li>
            <li>活動名稱</li>
            <li>匯款帳戶資訊 (若需轉帳退費)</li>
            <li>原繳費證明 (如轉帳截圖、收據等)</li>
          </ul>
        </div>
      </form>
    </div>

    <!-- 桌面版：取消原因彈窗 -->
    <MemberModal
      :show="isModalOpen"
      @close="hideCancelForm"
    >
      <template #header>取消原因</template>
      <template #default>
        <form
          class="cancelForm"
          @submit.prevent="submitCancellation"
        >
          <select
            v-model="cancellationReasonNo"
            class="cancel-reason-select"
          >
            <option
              disabled
              value=""
            >
              請選擇
            </option>
            <option
              v-for="reason in cancelReasons"
              :key="reason.reason_no"
              :value="reason.reason_no"
            >
              {{ reason.reason_name }}
            </option>
          </select>
          <div class="notice-section">
            <p>注意事項：</p>
            <p>
              已繳費者請另行申請退費。若您已完成繳費，請聯繫里長辦公室申請退費，並提供以下資訊：
            </p>
            <ul>
              <li>姓名</li>
              <li>活動名稱</li>
              <li>匯款帳戶資訊 (若需轉帳退費)</li>
              <li>原繳費證明 (如轉帳截圖、收據等)</li>
            </ul>
          </div>
        </form>
      </template>
      <template #footer>
        <button
          @click.prevent="hideCancelForm"
          type="button"
          class="btn--membercancel"
        >
          返回
        </button>
        <button
          @click.prevent="submitCancellation"
          type="button"
          class="btn--membersend"
        >
          送出
        </button>
      </template>
    </MemberModal>
  </div>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed,
    onMounted,
    onBeforeUnmount,
    defineProps,
    defineEmits,
  } from 'vue';
  import { useRouter } from 'vue-router';
  import MemberModal from '@/components/MemberModal.vue';
  import MemberMobileHeader from '@/components/MemberMobileHeader.vue';

  // 從父層接收 props
  const props = defineProps({
    userEvents: { type: Array, required: true, default: () => [] },
  });
  // 元件發出的事件
  const emit = defineEmits(['cancel-event']);

  const router = useRouter();

  // --- 狀態管理 ---
  const selectedEvent = ref(null);
  const viewingEvent = ref(null);
  const cancellingEvent = ref(null);
  const cancellationReasonNo = ref('');

  // --- 頁面專屬的資料 ---
  const cancelReasons = ref([
    { reason_no: 1, reason_name: '報錯活動/重複報名' },
    { reason_no: 2, reason_name: '疫情/健康安全考量' },
    { reason_no: 3, reason_name: '家庭因素(如照顧小孩、長輩等)' },
    { reason_no: 4, reason_name: '工作臨時安排' },
    { reason_no: 5, reason_name: '對活動內容不感興趣了' },
    { reason_no: 6, reason_name: '其他原因' },
  ]);

  // --- 輔助函式 (純計算，不改變狀態) ---
  const isCancellable = (event) => {
    if (!event || event.status !== 2) return false;
    const eventDate = new Date(event.activity_date);
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    return eventDate > threeDaysLater;
  };
  const getCancelButtonText = (event) => {
    if (event.status === 3) return '已取消';
    if (isCancellable(event)) return '我要取消';
    return '無法取消';
  };
  const getCancelButtonClass = (event) => {
    if (event.status === 3) return 'is-cancelled';
    if (isCancellable(event)) return 'is-active';
    return 'is-disabled';
  };

  // --- 事件處理函式 (會改變狀態) ---
  const goBackToMenu = () => router.push('/member');
  const selectEvent = (event) => {
    selectedEvent.value = event;
  };
  const showEventDetails = (event) => {
    if (isMobile.value) viewingEvent.value = event;
  };
  const hideEventDetails = () => {
    viewingEvent.value = null;
  };
  const showCancelForm = (event) => {
    cancellingEvent.value = event;
  };
  const hideCancelForm = () => {
    cancellingEvent.value = null;
    cancellationReasonNo.value = '';
  };
  const submitCancellation = () => {
    if (!cancellationReasonNo.value) {
      alert('請選擇取消原因！');
      return;
    }
    emit('cancel-event', cancellingEvent.value.order_no, cancellationReasonNo.value);
    alert(`活動「${cancellingEvent.value.activity_name}」的取消請求已送出！`);
    hideCancelForm();
    hideEventDetails();
  };

  // --- RWD 判斷 ---
  const screenWidth = ref(window.innerWidth);
  const handleResize = () => {
    screenWidth.value = window.innerWidth;
  };
  onMounted(() => {
    if (props.userEvents.length > 0) {
      selectedEvent.value = props.userEvents[0];
    }
    window.addEventListener('resize', handleResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  const isMobile = computed(() => screenWidth.value < 768);
  const isModalOpen = computed(() => cancellingEvent.value !== null && !isMobile.value);
  const isMobileDetailVisible = computed(
    () => viewingEvent.value !== null && isMobile.value && !cancellingEvent.value,
  );
  const isMobileCancelFormVisible = computed(
    () => cancellingEvent.value !== null && isMobile.value,
  );
</script>

<style lang="scss" scoped>
  .eventsPage {
    &__title {
      color: $primary-c700;
      margin-top: 30px;
      text-align: center;
      margin-bottom: 32px;
    }
  }

  /* --- 通用元件 --- */
  .statusChip {
    padding: 4px 12px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    &.is-cancelled {
      background-color: $neutral-c;
      color: $white;
    }
  }

  /* --- 桌面版表格--- */
  .eventsPage__desktopView {
    display: block;
  }

  .eventTable {
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
        font-size: 16px; // 调整为 16px
        font-style: normal;
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
      // tr:nth-child(2n) {
      //   background-color: rgba(0, 75, 128, 0.1);
      // }
      tr {
        text-align: center;
        &.is-clickable {
          cursor: pointer;
          &:hover {
            background-color: rgba(0, 75, 128, 0.1);
          }
        }
        &.is-active {
          background-color: rgba(0, 75, 128, 0.1);
          font-weight: 700;
        }
        td {
          border-right: 1px solid $neutral-c;
          border-bottom: 1px solid $neutral-c;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px;
          letter-spacing: 0.2em;
          padding: 14px 0px;
          color: $black;
          text-align: center;
          vertical-align: middle;
          word-break: break-all;
          &:last-child {
            border-right: none;
          }
        }
      }
      tr:last-child td {
        border-bottom: none;
      }
    }

    .btn--membercancel {
      width: 120px;
      height: 42px;
      margin: 0 auto;
      border: none;
      &.is-active {
        color: $semantic-r;
        border-color: $semantic-r;
        border-color: $white;
        &:hover {
          background-color: $semantic-r;
          color: $white;
        }
      }
      &.is-cancelled {
        background-color: $neutral-c;
        color: $white;
        // border-color: #e0e0e0;
        cursor: not-allowed;
        &:hover {
          background-color: #e0e0e0;
          color: $white;
        }
      }
      &.is-disabled {
        color: $neutral-c;
        border-color: $neutral-c;
        cursor: not-allowed;
        background-color: transparent;
        &:hover {
          color: $neutral-c;
          background-color: transparent;
        }
      }
    }
    .cancel-cell {
      padding: 8px 0;
    }
  }

  .eventDetail {
    margin-top: 30px;
    &__title {
      margin-bottom: 16px;
      color: $primary-c700;
      text-align: center;
    }
  }

  .eventDetailContainer {
    padding: 20px;
    // border-radius: $border-r-md;
    .detailItem {
      display: flex;
      gap: 8px;
      padding: 12px 0;
      letter-spacing: 0.2em;
      .label {
        font-weight: 500;
        color: $black;
        flex-shrink: 0;
      }
      .value {
        color: $black;
      }
    }
    .participant-item {
      padding-top: 16px;
      margin-top: 16px;
      border-top: 1px dashed $primary-c300;
    }
  }

  .mobileList {
    display: none;
  }

  /* --- 手機版列表 --- */
  .mobileList {
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid $primary-c100;
      cursor: pointer;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background-color: $primary-c50;
      }
    }
    .item__info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .item__date {
      font-size: 14px;
      color: $neutral-c;
    }
    .item__name {
      // font-weight: 500;
      line-height: 1.4;
      color: $primary-c500;
    }
  }

  /* --- 取消原因表單 --- */
  .cancelForm {
    &__title {
      text-align: center;
      color: $primary-c700;
    }
    .cancel-reason-select {
      width: 100%;
      height: 42px;
      border: 1px solid $black;
      border-radius: $border-r-xs;
      padding: 0 12px;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .notice-section {
      color: $black;
      line-height: 1.6;
      ul {
        list-style-type: disc;
        padding-left: 20px;
        margin-top: 8px;
      }
    }
  }

  /* --- RWD --- */
  @include mobile {
    .eventsPage {
      &__desktopView {
        display: none;
      }
      &__title {
        text-align: center;
        margin: 24px;
      }
      .mobileList {
        display: block;
      }
    }
    .eventsPage .mobileDetailContainer,
    .mobileCancelContainer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $primary-c000;
      z-index: 900;
      overflow-y: auto;
    }
    .cancelForm {
      padding: 20px;
      &__title {
        display: none;
      }
    }

    .mobileHeader__actionButton {
      background: none;
      border: none;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      &.is-save {
        color: $primary-c500;
      }
      &.is-cancel {
        color: $semantic-r;
      }
    }
    // .eventDetail {
    //   background-color: #fff;
    // }
  }
</style>
