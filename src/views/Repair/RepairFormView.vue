<script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import SubBanner from '@/components/SubBanner.vue';

  //引入環境變數(檔案偵測是地端的env或部屬的env.prod)
  const { VITE_API_BASE } = import.meta.env;
  // console.log(VITE_API_BASE);

  const router = useRouter();

  const selectedCategoryNo = ref('');
  const location = ref('');
  const desc = ref('');
  const files = ref([null, null, null]);
  const previews = ref(['', '', '']);
  const MAX_SIZE_MB = 5;
  const ALLOW_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const loadingCats = ref(false);
  const categories = ref([]);
  const categoryMap = computed(
    () => new Map(categories.value.map((c) => [c.category_no, c.category_name])),
  );

  const submitting = ref(false);
  const today = new Date().toISOString().slice(0, 10);

  // 假資料：王小明
  const reporterId = ref('user001'); // 對應 user_id
  const reporterName = ref('王小明'); // fullname
  const reporterPhone = ref('0987878787'); // phone_number

  onMounted(async () => {
    loadingCats.value = true;
    try {
      const res = await fetch(`${VITE_API_BASE}/api/repair/categories_get.php`);
      const data = await res.json();

      // console.log(data.status);
      if (data.status === 'success') categories.value = data.data;
    } catch (e) {
      console.error(e);
    } finally {
      loadingCats.value = false;
    }
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('location', location.value);
    formData.append('category_no', String(Number(selectedCategoryNo.value)));
    formData.append('description', desc.value);
    formData.append('reporter_id', reporterId.value);
    formData.append('status', '0');

    files.value.forEach((f) => {
      if (f) formData.append('images[]', f); // 後端就用 $_FILES['images']
    });

    submitting.value = true;
    try {
      const res = await fetch(`${VITE_API_BASE}/api/repair/repair_add_post.php`, {
        method: 'POST',
        body: formData,
      });
      // const data = await res.json();

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error('非 JSON 回應：', text);
        alert(`伺服器回應非 JSON（${res.status}）`);
        return;
      }

      if (!res.ok || data.status !== 'success') {
        console.warn('後端回應錯誤：', data);
        alert(data.message || `送出失敗（${res.status}）`);
        return;
      }

      // 成功
      const categoryName = categoryMap.value.get(Number(selectedCategoryNo.value)) || '';
      console.log('建立成功：', data, '分類名稱(本地映射)：', categoryName);

      const payload = data.data;

      router.push({
        name: 'repaircomplete',
        params: { repair_no: String(payload.repair_no) },
        state: { record: payload },
      });
    } catch (e) {
      console.error(e);
    } finally {
      submitting.value = false;
    }
  };

  const handleImageUpload = (event, index) => {
    // console.log(event);
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOW_TYPES.includes(file.type)) {
      alert('僅支援 JPG/PNG/WebP');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`單檔大小不可超過 ${MAX_SIZE_MB}MB`);
      return;
    }

    files.value[index] = file;

    const reader = new FileReader();
    reader.onload = () => {
      previews.value[index] = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    files.value[index] = null;
    previews.value[index] = '';
  };
</script>

<template>
  <SubBanner title="維修通報填寫" />
  <div class="repair-form">
    <div class="repair-form__container">
      <nav class="repair-form__breadcrumb">
        <RouterLink
          to="/"
          class="repair-form__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">&#47;里民服務</p>
        <RouterLink
          to="/repair"
          class="repair-form__breadcrumb-link"
        >
          &#47;維修通報
        </RouterLink>
        <p class="body--b2">&#47;維修通報填寫</p>
      </nav>

      <div class="repair-form__notice">
        <p class="body--b3">我們也受理電話通報，請洽公所維修通報窗口</p>
        <p class="repair-form__tel body--b1">TEL.(02)1234-1234</p>
        <p class="repair-form__time body--b3">服務時間 08:00~17:30</p>
      </div>

      <form
        class="repair-form__form"
        @submit.prevent="handleSubmit"
      >
        <div class="repair-form__card">
          <p class="repair-form__description body--b3">
            本報修平台為空瀧浪里居民提供反映鄰里內道路、照明、水溝、公園等公共設施維護事項的管道。如果您有其他建議、陳情或里務相關意見，歡迎致電里長辦公室，我們將用心傾聽、積極處理。感謝您與我們一同守護空瀧浪里的美好生活環境！
          </p>
          <div class="repair-form__field">
            <label for="date">填表日期</label>
            <input
              type="text"
              id="date"
              readonly
              :value="today"
            />
          </div>
          <div class="repair-form__field">
            <label for="type">
              案件類型
              <span class="required">*</span>
            </label>
            <select
              id="type"
              v-model="selectedCategoryNo"
              required
            >
              <option
                value=""
                disabled
                hidden
              >
                請選擇
              </option>
              <option
                v-for="item in categories"
                :key="item.category_no"
                :value="item.category_no"
              >
                {{ item.category_name }}
              </option>
            </select>
          </div>
          <div class="repair-form__field">
            <label for="name">通報人</label>
            <input
              type="text"
              id="name"
              readonly
              :value="reporterName"
            />
            <input
              type="hidden"
              name="reporter_id"
              :value="reporterId"
            />
          </div>
          <div class="repair-form__field">
            <label for="phone">通報人連絡電話</label>
            <input
              type="tel"
              id="phone"
              readonly
              :value="reporterPhone"
            />
          </div>
          <div class="repair-form__field">
            <label for="location">
              通報所在地點
              <span class="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              v-model="location"
              required
            />
          </div>
          <div class="repair-form__field">
            <label>上傳圖片（最多三張）</label>
            <div class="repair-form__upload-group">
              <div
                class="repair-form__upload-slot"
                v-for="(img, index) in previews"
                :key="index"
              >
                <template v-if="img">
                  <div class="repair-form__preview-container">
                    <img
                      :src="img"
                      alt="預覽圖"
                      class="repair-form__preview-img"
                    />
                  </div>
                  <button
                    type="button"
                    class="repair-form__preview-delete"
                    @click.stop="removeImage(index)"
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
                </template>

                <template v-else>
                  <label class="repair-form__upload-label">
                    +
                    <input
                      type="file"
                      class="repair-form__file-input"
                      accept="image/*"
                      hidden
                      @change="(e) => handleImageUpload(e, index)"
                    />
                  </label>
                </template>
              </div>
            </div>
          </div>
          <div class="repair-form__field">
            <label for="desc">
              情形描述
              <span class="required">*</span>
            </label>
            <textarea
              id="desc"
              v-model="desc"
              required
            ></textarea>
          </div>
          <div class="repair-form__privacy">
            <div class="repair-form__privacy-title">
              <p class="body--b2">個人資料保護聲明</p>
            </div>
            <div class="repair-form__privacy-content">
              <p class="body--b3">
                空瀧浪里（以下簡稱本里）為處理您所填寫之報修事項，可能蒐集您提供的個人資料，包括但不限於姓名、聯絡電話、通報內容與影像檔案等資訊。
              </p>
              <p class="body--b3">
                本里依據《個人資料保護法》相關規定進行處理與使用，並保障您的個資權益。
              </p>
              <p class="body--b3">
                您所提供的資料僅限於本里內部案件處理與聯繫用途，不另作其他用途或揭露予第三方。
              </p>
              <p class="body--b3">
                本里有權於必要時修訂本聲明並公告於網站，修正後將自公告日起生效，恕不另行通知。
              </p>
            </div>
          </div>
        </div>
        <div class="repair-form__submit">
          <button
            type="submit"
            class="btn--process"
          >
            確認送出
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';
  .repair-form {
    background-color: white;
    padding-bottom: 30px;
    background-image:
      url(/src/assets/image/background_image.png), url(/src/assets/image/background_color.svg);
    background-repeat: repeat, no-repeat;
    background-position: bottom;

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

    &__notice {
      border: 3px solid $primary-c700;
      border-radius: $border-r-md;
      background-color: $white;
      width: 75%;
      margin: auto;
      @include flex-center;
      flex-direction: column;
      gap: 10px;
      padding: 20px 0;
      margin-bottom: 15px;
    }

    &__tel {
      color: $primary-c700;
    }

    &__card {
      border: 1px solid $black;
      padding: 20px;
      background-color: $white;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 60px;
    }

    &__field {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 5px;

      label {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.2em;
      }

      input,
      select {
        height: 30px;
        padding: 0 10px;
        border-radius: $border-r-xs;
        border: 1px solid $neutral-c;

        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.2em;
        background-color: $white;
      }

      textarea {
        resize: none;
        height: 200px;
        border-radius: $border-r-xs;
        border: 1px solid $neutral-c;
        padding: 5px 10px;
        background-color: $white;
      }

      #location:focus,
      textarea:focus {
        border-color: $primary-c300;
        box-shadow: 0 0px 5px 0 $primary-c300;
        outline: none;
      }

      .required {
        color: $semantic-r;
      }

      #date,
      #name,
      #phone {
        background-color: $primary-c25;
      }
    }

    &__upload-group {
      display: flex;
      gap: 10px;
    }

    &__upload-label {
      flex-grow: 1;
      flex-basis: 0;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1.5px dashed $neutral-c;
      border-radius: $border-r-xs;
      cursor: pointer;
      background-color: $white;
      overflow: hidden;
      position: relative;
    }

    &__upload-slot {
      flex-grow: 1;
      flex-basis: 0;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: $white;
      position: relative;

      input {
        display: none;
      }
    }

    &__preview {
      &-container {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $border-r-xs;
        overflow: hidden;
      }

      &-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &-delete {
        background-color: transparent;
        border: none;
        position: absolute;
        top: -10px;
        right: -10px;
      }
    }

    &__upload-label:hover {
      border-color: $primary-c300;
      color: $primary-c300;
    }

    &__privacy {
      border: 1px solid $black;
      border-radius: $border-r-xs;
      overflow: hidden;
    }

    &__privacy-title {
      border-bottom: 1px solid $black;
      background-color: $primary-c50;
    }

    &__privacy-content {
      background-color: $white;
    }

    &__privacy-title,
    &__privacy-content {
      padding: 5px 10px;
    }

    &__submit {
      @include flex-center;
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

      &__card {
        border: none;
        background-color: transparent;
      }

      &__field {
        label,
        input,
        select {
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.1em;
        }
      }

      &__upload-group {
        flex-direction: column;
      }
    }
  }
</style>
