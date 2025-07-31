<!-- 檔案路徑: src/components/MemberSelectModal.vue -->
<template>
  <!-- 遮罩層 -->
  <div
    class="member-modal__overlay"
    @click.self="closeModal"
  >
    <!-- 彈窗主體 -->
    <div class="member-modal__content">
      <button
        class="member-modal__close-btn"
        @click="closeModal"
      >
        ✕
      </button>
      <h3 class="bold member-modal__title">成員資料</h3>

      <!-- RWD：桌機版表格 -->
      <div class="member-modal__table-wrapper--desktop">
        <table class="member-modal__table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>身分證字號</th>
              <th>出生日期</th>
              <th>聯絡電話</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="member in members"
              :key="member.id"
              @click="selectMember(member)"
              :class="{ 'member-modal__row--selected': selectedMember?.id === member.id }"
            >
              <td>{{ member.name }}</td>
              <td>{{ member.idNumber }}</td>
              <td>{{ member.birthDate }}</td>
              <td>{{ member.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- RWD：手機版卡片列表 -->
      <div class="member-modal__card-list--mobile">
        <div
          class="member-modal__card"
          v-for="member in members"
          :key="member.id"
          @click="selectMember(member)"
          :class="{ 'member-modal__row--selected': selectedMember?.id === member.id }"
        >
          <div class="member-modal__card-row">
            <strong>姓名</strong>
            <span>{{ member.name }}</span>
          </div>
          <div class="member-modal__card-row">
            <strong>身分證字號</strong>
            <span>{{ member.idNumber }}</span>
          </div>
          <div class="member-modal__card-row">
            <strong>生日</strong>
            <span>{{ member.birthDate }}</span>
          </div>
          <div class="member-modal__card-row">
            <strong>聯絡電話</strong>
            <span>{{ member.phone }}</span>
          </div>
        </div>
      </div>

      <p class="body--c1 member-modal__hint">* 點選所需的成員資料即可帶入表單</p>

      <div class="member-modal__footer">
        <!-- 使用您 _btn.scss 中定義的彈窗按鈕樣式 -->
        <button
          class="btn--popup"
          @click="confirmSelection"
          :disabled="!selectedMember"
        >
          確認新增
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  // 定義 props 和 emits
  const props = defineProps({
    members: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['close', 'confirm']);

  // 內部狀態
  const selectedMember = ref(null);

  const selectMember = (member) => {
    selectedMember.value = member;
  };

  const closeModal = () => {
    emit('close');
  };

  const confirmSelection = () => {
    if (selectedMember.value) {
      emit('confirm', selectedMember.value);
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .member-modal {
    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba($black, 0.5);
      @include flex-center;
      z-index: 1000;
    }

    &__content {
      background: $white;
      padding: 40px;
      border-radius: $border-r-md;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }

    &__close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    &__title {
      text-align: center;
      margin-bottom: 30px;
    }

    &__hint {
      color: $neutral-c;
      margin-top: 20px;
    }

    &__footer {
      margin-top: 30px;
      @include flex-center;
    }

    // --- RWD ---
    &__table-wrapper--desktop {
      display: none; // 手機預設隱藏
      @include desktop {
        display: block; // 桌機顯示
      }
    }

    &__card-list--mobile {
      display: block; // 手機預設顯示
      @include desktop {
        display: none; // 桌機隱藏
      }
    }

    // 桌機版表格樣式
    &__table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid $neutral-c;
      border-radius: $border-r-sm;
      overflow: hidden;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
      }

      thead tr {
        background-color: $primary-c700;
        color: $white;
      }

      tbody tr {
        border-bottom: 1px solid $neutral-c;
        cursor: pointer;
        transition: background-color 0.2s;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: $primary-c25;
        }
      }
    }

    // 手機版卡片樣式
    &__card {
      border: 1px solid $primary-c700;
      border-radius: $border-r-sm;
      overflow: hidden;
      margin-bottom: 15px;

      &-row {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid $primary-c25;

        &:last-child {
          border-bottom: none;
        }

        strong {
          background-color: $primary-c700;
          color: $white;
          padding: 10px;
          width: 100px;
          flex-shrink: 0;
          text-align: center;
          margin-right: 10px;
        }
        span {
          display: flex;
          align-items: center;
        }
      }
    }

    // 共用的選中樣式
    &__row--selected {
      background-color: $primary-c100 !important;
    }
  }
</style>
