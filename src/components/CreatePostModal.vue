<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({ visible: Boolean });
  const emit = defineEmits(['update:visible']);
</script>

<template>
  <div
    class="post-modal"
    v-if="visible"
  >
    <div class="post-modal__container">
      <div class="post-modal__header">
        <h3 class="post-modal__title bold">建立貼文</h3>
      </div>

      <form
        action="#"
        class="post-modal__form"
      >
        <div class="post-modal__field">
          <label
            for="post-title"
            class="post-modal__label"
          >
            文章標題
          </label>
          <input
            id="post-title"
            type="text"
            class="post-modal__input"
          />
        </div>

        <div class="post-modal__field">
          <label
            for="post-category"
            class="post-modal__label"
          >
            選擇分類
          </label>
          <select
            name="category_no"
            id="post-category"
            class="post-modal__select"
          >
            <option
              disabled
              selected
              hidden
            >
              請選擇
            </option>
            <option value="1">舊物交換</option>
            <option value="2">生活抱怨</option>
            <option value="3">揪團來買</option>
          </select>
        </div>

        <div class="post-modal__field">
          <textarea
            class="post-modal__textarea"
            placeholder="在此輸入文章內容..."
          ></textarea>
        </div>

        <div class="post-modal__field">
          <label class="post-modal__upload-slot">
            點此插入圖片
            <input
              type="file"
              class="post-modal__file-input"
              accept="image/*"
              hidden
            />
          </label>
        </div>

        <div class="post-modal__submit">
          <button
            class="post-modal__submit-btn btn--popup"
            type="submit"
          >
            發布文章
          </button>
        </div>
      </form>

      <button
        class="post-modal__close-btn"
        @click="emit('update:visible', false)"
      >
        <img
          src="../assets/icon/icon_closePop.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .post-modal {
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
      border-radius: $border-r-md;
      width: 100vh;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }

    &__close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: transparent;
      border: none;
      padding: 5px;
      cursor: pointer;
    }

    &__header {
      padding: 30px 20px;
      background-color: $primary-c700;
    }

    &__title {
      color: $white;
    }

    &__form {
      padding: 20px;
      background-color: $primary-c000;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    &__field {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &__input,
    &__select {
      height: 30px;
      border-radius: $border-r-xs;
      padding-left: 5px;
      border: none;
      background-color: $white;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.2em;
    }

    &__label {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.2em;
    }

    &__textarea {
      resize: none;
      height: 150px;
      border-radius: $border-r-xs;
      border: none;
      padding: 5px;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.2em;
    }

    &__upload-slot {
      height: 150px;
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $white;
      border-radius: $border-r-xs;
      cursor: pointer;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.2em;
    }

    &__submit {
      align-self: flex-end;
    }

    &__submit-btn {
      background-color: $primary-c700;
    }

    @include mobile {
      .post-modal {
        &__label,
        &__textarea,
        &__input,
        &__select,
        &__upload-slot {
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.1em;
        }

        &__upload-slot {
          width: 100%;
        }
      }
    }
  }
</style>
