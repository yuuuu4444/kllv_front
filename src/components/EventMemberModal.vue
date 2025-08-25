<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    members: {
      type: Array,
      required: true,
    },
  });
  const emit = defineEmits(['close', 'confirm']);

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

<template>
  <div
    class="member-modal__overlay"
    @click.self="closeModal"
  >
    <div class="member-modal__content">
      <button
        class="member-modal__close-btn"
        @click="closeModal"
      >
        ✕
      </button>
      <h3 class="bold member-modal__title">成員資料</h3>

      <hr class="member-modal__divider" />

      <!-- 桌機版表格 -->
      <div class="member-modal__desktop-view">
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
              :key="member.user_account"
              @click="selectMember(member)"
              :class="{
                'member-modal__row--selected': selectedMember?.user_account === member.user_account,
              }"
            >
              <td>{{ member.full_name }}</td>
              <td>{{ member.id_number }}</td>
              <td>{{ member.birth_date }}</td>
              <td>{{ member.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 手機版卡片列表 -->
      <div class="member-modal__mobile-view">
        <div
          class="member-modal__card"
          v-for="member in members"
          :key="member.user_account"
          @click="selectMember(member)"
          :class="{
            'member-modal__row--selected': selectedMember?.user_account === member.user_account,
          }"
        >
          <div class="member-modal__card-row">
            <div class="member-modal__card-label">姓名</div>
            <div class="member-modal__card-value">{{ member.full_name }}</div>
          </div>
          <div class="member-modal__card-row">
            <div class="member-modal__card-label">身分證字號</div>
            <div class="member-modal__card-value">{{ member.id_number }}</div>
          </div>
          <div class="member-modal__card-row">
            <div class="member-modal__card-label">生日</div>
            <div class="member-modal__card-value">{{ member.birth_date }}</div>
          </div>
          <div class="member-modal__card-row">
            <div class="member-modal__card-label">聯絡電話</div>
            <div class="member-modal__card-value">{{ member.phone }}</div>
          </div>
        </div>
      </div>

      <hr class="member-modal__divider" />

      <p class="body--c1 member-modal__hint">* 點選所需的成員資料即可帶入表單</p>

      <div class="member-modal__footer">
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
      text-align: left;
      margin-bottom: 20px;
      color: $primary-c700;
    }

    &__divider {
      border: none;
      height: 1px;
      background-color: $primary-c50;
      margin: 20px 0;
    }

    &__hint {
      color: $semantic-r;
      margin-top: 20px;
    }

    &__footer {
      margin-top: 30px;
      @include flex-center;
    }

    &__desktop-view {
      display: block;
    }

    &__mobile-view {
      display: none;
    }

    @include mobile {
      &__desktop-view {
        display: none;
      }
      &__mobile-view {
        display: block;
      }
    }

    &__table {
      width: 100%;
      border: 1px solid $neutral-c;
      border-radius: $border-r-md;
      border-collapse: separate;
      border-spacing: 0;
      overflow: hidden;
      thead {
        background-color: $primary-c700;
        th {
          color: $white;
          border-right: 1px solid $neutral-c;
          font-size: 20px;
          padding: 14px 5px;
          text-align: center;
        }
        th:last-child {
          border-right: none;
        }
      }
      tbody {
        tr {
          cursor: pointer;
          transition: background-color 0.2s;
          &:hover {
            background-color: $primary-c25;
          }
        }
        tr:nth-child(2n) {
          background-color: rgba(0, 75, 128, 0.1);
        }
        td {
          border-right: 1px solid $neutral-c;
          border-bottom: 1px solid $neutral-c;
          text-align: center;
          padding: 15px 5px;
        }
        tr:last-child td {
          border-bottom: none;
        }
        td:last-child {
          border-right: none;
        }
      }
    }

    &__card {
      border: 1px solid $primary-c700;
      border-radius: $border-r-sm;
      overflow: hidden;
      margin-bottom: 15px;
      cursor: pointer;
      transition: background-color 0.2s;
      &:hover {
        background-color: $primary-c25;
      }
    }
    &__card-row {
      display: flex;
      border-bottom: 1px solid $primary-c100;
      &:last-child {
        border-bottom: none;
      }
    }
    &__card-label {
      background-color: $primary-c700;
      color: $white;
      padding: 12px;
      width: 110px;
      flex-shrink: 0;
      text-align: center;
      border-right: 1px solid $primary-c100;
    }
    &__card-value {
      display: flex;
      align-items: center;
      padding: 12px;
    }

    &__row--selected {
      background-color: $primary-c100 !important;
    }
  }
</style>
