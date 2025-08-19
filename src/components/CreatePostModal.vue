<script setup>
  import { defineProps, defineEmits, ref, computed } from 'vue';

  const props = defineProps({
    visible: Boolean,
    post: {
      type: Object,
      default: null,
    },
  });
  const emit = defineEmits(['update:visible', 'create', 'edit']);
  const isEdit = computed(() => !!props.post);

  const title = ref(props.post?.title ?? '');
  const category = ref(props.post?.category_no ? String(props.post.category_no) : '');

  // 兼容舊資料 desc；後端用 content
  const content = ref(props.post?.content ?? props.post?.desc ?? '');
  const files = ref([]);
  const toStrArr = (v) => (Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : []);
  const previews = ref([...toStrArr(props.post?.images), ...toStrArr(props.post?.image)]);

  const MAX_FILES = 10;
  const MAX_SIZE_MB = 8;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;
  const ALLOW_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const ALLOW_EXTS = new Set(['jpg', 'jpeg', 'png', 'webp']);

  function isAllowedType(file) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    return (file.type && ALLOW_TYPES.has(file.type)) || ALLOW_EXTS.has(ext);
  }

  const handleSubmit = () => {
    if (!title.value.trim()) return;
    if (!category.value) return;
    if (!content.value.trim()) return;

    console.log('送出的資料：', {
      title: title.value.trim(),
      category: String(category.value),
      content: content.value.trim(),
      image: previews.value,
    });

    const uploadFiles = files.value.filter((f) => f instanceof File).slice(0, MAX_FILES);

    const payload = {
      title: title.value.trim(),
      category_no: Number(category.value),
      content: content.value.trim(),
      files: uploadFiles,
    };

    console.log(isEdit.value ? '編輯文章資料：' : '送出的資料：', payload);
    // emit('update:visible', false);

    if (isEdit.value) {
      emit('edit', { ...payload, post_no: props.post?.post_no });
    } else {
      emit('create', payload);

      // 成功後清空欄位
      title.value = '';
      category.value = '';
      content.value = '';
      previews.value = [];
      files.value = [];
    }

    emit('update:visible', false);
  };

  const handleImageUpload = (event, index) => {
    const input = event.target;
    const picked = Array.from(input.files || []);
    if (!picked.length) return;

    let insertAt = Math.min(index, previews.value.length);
    for (const file of picked) {
      const isAppend = insertAt >= previews.value.length;
      if (isAppend && previews.value.length >= MAX_FILES) {
        alert(`最多上傳 ${MAX_FILES} 張圖片`);
        continue;
      }
      if (!isAllowedType(file)) {
        alert('僅支援 JPG/PNG/WebP');
        continue;
      }
      if (!(file.size > 0 && file.size <= MAX_SIZE)) {
        alert(`單檔大小不可超過 ${MAX_SIZE_MB}MB`);
        continue;
      }

      if (isAppend) {
        files.value.push(file);
      } else {
        files.value[insertAt] = file; // 覆蓋
      }

      const targetIndex = insertAt;

      const reader = new FileReader();
      reader.onload = () => {
        if (isAppend) {
          previews.value.push(String(reader.result));
        } else {
          previews.value[targetIndex] = String(reader.result);
        }
      };
      reader.readAsDataURL(file);
      insertAt++;
    }
    input.value = '';
  };

  const removeImage = (index) => {
    previews.value.splice(index, 1);
    files.value.splice(index, 1);
  };
</script>

<template>
  <div
    class="post-modal"
    v-if="visible"
  >
    <div class="post-modal__container">
      <div class="post-modal__header">
        <h3 class="post-modal__title bold">{{ isEdit ? '編輯貼文' : '建立貼文' }}</h3>
      </div>

      <form
        action="#"
        class="post-modal__form"
        @submit.prevent="handleSubmit"
      >
        <div class="post-modal__field">
          <label
            for="title"
            class="post-modal__label"
          >
            文章標題
          </label>
          <input
            id="title"
            type="text"
            class="post-modal__input"
            v-model="title"
            required
          />
        </div>

        <div class="post-modal__field">
          <label
            for="category"
            class="post-modal__label"
          >
            選擇分類
          </label>
          <select
            name="category_no"
            id="category"
            class="post-modal__select"
            v-model="category"
            required
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
            id="desc"
            v-model="content"
            required
          ></textarea>
        </div>

        <div class="post-modal__field">
          <div class="post-modal__image-group">
            <div
              class="post-modal__upload-slot"
              v-for="(img, index) in previews"
              :key="index"
            >
              <div class="post-modal__image-wrapper">
                <label
                  class="post-modal__image-preview"
                  style="cursor: pointer"
                >
                  <img
                    :src="img"
                    alt="預覽圖"
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/jpeg,image/png,image/webp"
                    @change="handleImageUpload($event, index)"
                  />
                </label>
                <button
                  type="button"
                  class="post-modal__image-delete"
                  @click="removeImage(index)"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4C7.581 4 4 7.582 4 12C4 16.418 7.581 20 12 20C16.419 20 20 16.418 20 12C20 7.582 16.419 4 12 4ZM15.707 14.293C15.8945 14.4805 15.9998 14.7348 15.9998 15C15.9998 15.2652 15.8945 15.5195 15.707 15.707C15.5195 15.8945 15.2652 15.9998 15 15.9998C14.7348 15.9998 14.4805 15.8945 14.293 15.707L12 13.414L9.707 15.707C9.61435 15.8002 9.50419 15.8741 9.38285 15.9246C9.26152 15.9751 9.13141 16.001 9 16.001C8.86859 16.001 8.73848 15.9751 8.61715 15.9246C8.49581 15.8741 8.38565 15.8002 8.293 15.707C8.10553 15.5195 8.00021 15.2652 8.00021 15C8.00021 14.7348 8.10553 14.4805 8.293 14.293L10.586 12L8.293 9.707C8.10549 9.51949 8.00015 9.26518 8.00015 9C8.00015 8.73482 8.10549 8.48051 8.293 8.293C8.48051 8.10549 8.73482 8.00015 9 8.00015C9.26518 8.00015 9.51949 8.10549 9.707 8.293L12 10.586L14.293 8.293C14.4805 8.10549 14.7348 8.00015 15 8.00015C15.2652 8.00015 15.5195 8.10549 15.707 8.293C15.8945 8.48051 15.9998 8.73482 15.9998 9C15.9998 9.26518 15.8945 9.51949 15.707 9.707L13.414 12L15.707 14.293Z"
                      fill="#F55B34"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <label
              class="post-modal__upload-slot"
              v-if="previews.length < MAX_FILES"
            >
              點此插入圖片
              <input
                type="file"
                class="post-modal__file-input"
                accept="image/jpeg,image/png,image/webp"
                hidden
                multiple
                @change="handleImageUpload($event, previews.length)"
              />
            </label>
          </div>
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

    &__input:focus,
    &__textarea:focus {
      border-color: $primary-c300;
      box-shadow: 0 0px 5px 0 $primary-c300;
      outline: none;
    }

    &__image-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    &__upload-slot {
      width: calc(20% - 8px);
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $white;
      border-radius: $border-r-xs;
      cursor: pointer;
      // overflow: hidden;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.2em;
    }

    &__image-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }

    &__image-preview {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__image-delete {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    &__submit {
      align-self: flex-end;
    }

    &__submit-btn {
      background-color: $primary-c700;
    }

    @include mobile {
      .post-modal {
        &__container {
          width: 80vw;
        }

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
          aspect-ratio: 0;
          height: 100px;
          flex-direction: column;
        }
      }
    }
  }
</style>
