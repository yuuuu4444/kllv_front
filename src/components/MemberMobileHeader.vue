<!-- src/components/MemberMobileHeader.vue -->
<template>
  <header class="mobileHeader">
    <div class="mobileHeader__group">
      <button
        @click="$emit('back')"
        class="mobileHeader__backButton"
      >
        <svg
          class="backIcon"
          viewBox="0 0 24 24"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.34347 11.9996L10.4145 19.0706L9.00047 20.4846L1.22247 12.7066C1.035 12.5191 0.929688 12.2648 0.929688 11.9996C0.929687 11.7345 1.035 11.4802 1.22247 11.2926L9.00047 3.51465L10.4145 4.92865L3.34347 11.9996Z"
          />
        </svg>
      </button>
      <span class="mobileHeader__title">{{ title }}</span>
    </div>

    <!-- 其他事件在父層 slot 上綁定 -->
    <div class="mobileHeader__actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
  });
  defineEmits(['back']);
</script>

<style lang="scss" scoped>
  .mobileHeader {
    display: none;

    @include mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background-color: $primary-c000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 10;
      // border-bottom: 1px solid $primary-c50;

      &__group {
        display: flex;
        align-items: center;
        // gap: 8px;
      }
      &__backButton {
        background: none;
        border: none;
        padding: 0;
        @include flex-center;
        cursor: pointer;
        .backIcon {
          fill: $black;
          width: 24px;
          height: 24px;
        }
      }
      &__title {
        font-weight: 700;
        font-size: 18px;
      }

      &__actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
</style>
