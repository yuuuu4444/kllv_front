<script setup>
  import { defineProps, defineEmits, ref, computed } from 'vue';

  const props = defineProps({
    visible: Boolean,
    categories: { type: Array, default: () => [] },
    loading: Boolean,
  });
  const emit = defineEmits(['update:visible', 'submit', 'close']);

  const step = ref(1);
  // const selectedReason = ref('');
  const selectedReasonNo = ref(null);
  const isSubmitting = ref(false);
  const selectedReasonName = computed(() => {
    const hit = props.categories.find(
      (c) => Number(c.category_no) === Number(selectedReasonNo.value),
    );
    return hit?.category_name || '';
  });

  function resetState() {
    step.value = 1;
    selectedReasonNo.value = null;
    isSubmitting.value = false;
  }

  function closeModal() {
    emit('update:visible', false);
    resetState();
    emit('close');
  }

  function chooseReason(item) {
    // console.log(reason);
    selectedReasonNo.value = item.category_no;
    step.value = 2;
  }

  function submitReport() {
    if (!selectedReasonNo.value || isSubmitting.value) return;
    isSubmitting.value = true;

    emit('submit', { category_no: Number(selectedReasonNo.value) }, (ok, message) => {
      isSubmitting.value = false;
      if (ok) {
        step.value = 3;
      } else {
        alert(message || '檢舉失敗，請稍後再試');
      }
    });
  }
</script>

<template>
  <div
    class="report-modal"
    v-if="visible"
  >
    <div class="report-modal__container">
      <button
        class="report-modal__close"
        @click="closeModal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <template v-if="step === 1">
        <div class="report-modal__header">
          <h3 class="report-modal__title bold">向管理員檢舉</h3>
        </div>

        <div
          v-if="loading"
          class="body--b2"
          style="padding: 8px 0"
        >
          載入分類中…
        </div>
        <div
          v-else-if="!categories.length"
          class="body--b2"
          style="padding: 8px 0"
        >
          目前沒有可選分類
        </div>

        <ul
          class="report-modal__list"
          v-else
        >
          <li
            class="report-modal__item"
            v-for="item in categories"
            :key="item.category_no"
            @click="chooseReason(item)"
          >
            <p class="report-modal__item-text body--b2">{{ item.category_name }}</p>
            <div class="report-modal__item-icon">
              <img
                src="/src/assets/icon/icon_report-arrow.svg"
                alt=""
              />
            </div>
          </li>
        </ul>
      </template>

      <template v-else-if="step === 2">
        <div class="report-modal__header">
          <h3 class="report-modal__title bold">您即將提出檢舉</h3>
        </div>
        <div class="report-modal__info">
          <p class="report-modal__info-text body--b2">我們只會移除違反社群守則的內容。</p>
          <p class="report-modal__info-text body--b2">檢舉詳細資料</p>
          <p class="report-modal__info-text body--b3">你為何要檢舉這則貼文？</p>
          <p class="report-modal__info-text body--b2">{{ selectedReasonName }}</p>
        </div>
        <button
          class="report-modal__submit btn--popup"
          @click="submitReport"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '送出中…' : '送出檢舉' }}
        </button>
      </template>

      <template v-else-if="step === 3">
        <div class="report-modal__header">
          <h3 class="report-modal__title bold">感謝您的檢舉</h3>
        </div>
        <div class="report-modal__description">
          <p class="report-modal__description-text body--b2">
            管理員已收到檢舉，您的一份心力是為了讓每一位使用者有更好的使用體驗。
          </p>
          <p class="report-modal__description-text body--b2">
            我們將會盡快通知你前往支援收件匣查看審查結果。
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .report-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    &__container {
      background-color: white;
      // border: 1px solid black;
      border-radius: $border-r-md;
      padding: 0 30px;
      display: flex;
      flex-direction: column;
      position: relative;
      width: 50vw;
    }

    &__close {
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: transparent;
      border: none;
    }

    &__header {
      padding: 30px 0;
      // margin: 0 15px;
      border-bottom: 1px solid $primary-c500;
    }

    &__title {
      color: $primary-c700;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      &-text {
        color: $primary-c700;
      }
    }

    &__list,
    &__info,
    &__description {
      margin: 20px 0;
    }

    &__item {
      padding: 10px 0;
    }

    &__info,
    &__description {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__submit {
      align-self: flex-end;
      margin-bottom: 20px;
    }

    @include mobile {
      &__container {
        width: 70vw;
      }
    }
  }
</style>
