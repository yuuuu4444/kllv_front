<!-- src/components/MemberModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="modal__overlay"
        @click.self="$emit('close')"
      >
        <div class="modal__container">
          <!-- 標題區 -->
          <h5 class="modal__header bold">
            <slot name="header">Default Header</slot>
            <!-- <button
              @click="$emit('close')"
              class="modal__closeButton"
            >
              ×
            </button> -->
          </h5>

          <!-- 內容區 -->
          <section class="modal__body">
            <slot></slot>
          </section>

          <!-- 腳註區 -->
          <footer class="modal__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  defineProps({
    show: {
      type: Boolean,
      required: true,
    },
  });
  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .modal__overlay {
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
  }

  .modal__container {
    background-color: $white;
    border-radius: $border-r-md;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
  }

  .modal__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60px 0 32px 0;
    // border-bottom: 1px solid $primary-c50;
    font-size: 20px;
    font-weight: 700;
    color: $primary-c700;
  }

  .modal__closeButton {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: $neutral-c;
    &:hover {
      color: $black;
    }
  }

  .modal__body {
    padding: 24px;
    overflow-y: auto;
  }

  .modal__footer {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 16px 24px;
    // border-top: 1px solid $primary-c50;
  }

  // --- Transition 動畫 ---
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-fade-enter-to,
  .modal-fade-leave-from {
    opacity: 1;
  }
</style>
