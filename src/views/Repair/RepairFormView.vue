<script setup>
  import { useRouter } from 'vue-router';
  import SubBanner from '@/components/SubBanner.vue';
</script>

<template>
  <div class="repair-form">
    <SubBanner title="維修通報填寫" />

    <div class="repair-form__container">
      <nav class="repair-form__breadcrumb">
        <RouterLink
          to="/"
          class="repair-form__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">&#45;里民服務</p>
        <p class="body--b2">&#45;維修通報</p>
        <p class="body--b2">&#45;維修通報填寫</p>
      </nav>

      <div class="repair-form__notice">
        <p class="body--b3">我們也受理電話通報，請洽公所維修通報窗口</p>
        <p class="repair-form__tel body--b1">TEL.(02)1234-1234</p>
        <p class="repair-form__time body--b3">服務時間 08:00~17:30</p>
      </div>

      <form
        class="repair-form__form"
        action="#"
        method="#"
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
            />
          </div>
          <div class="repair-form__field">
            <label for="type">
              案件類型
              <span class="required">*</span>
            </label>
            <select id="type">
              <option>請選擇</option>
            </select>
          </div>
          <div class="repair-form__field">
            <label for="name">通報人</label>
            <input
              type="text"
              id="name"
              readonly
            />
          </div>
          <div class="repair-form__field">
            <label for="phone">通報人連絡電話</label>
            <input
              type="tel"
              id="phone"
              readonly
            />
          </div>
          <div class="repair-form__field">
            <label for="location">通報所在地點</label>
            <input
              type="text"
              id="location"
            />
          </div>
          <div class="repair-form__field">
            <label>上傳圖片（最多三張）</label>
            <div class="repair-form__upload-group">
              <label class="repair-form__upload-slot">
                +
                <input
                  type="file"
                  class="repair-form__file-input"
                  accept="image/*"
                  hidden
                />
              </label>
              <label class="repair-form__upload-slot">
                +
                <input
                  type="file"
                  class="repair-form__file-input"
                  accept="image/*"
                  hidden
                />
              </label>
              <label class="repair-form__upload-slot">
                +
                <input
                  type="file"
                  class="repair-form__file-input"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div class="repair-form__field">
            <label for="desc">
              情形描述
              <span class="required">*</span>
            </label>
            <textarea id="desc"></textarea>
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
        <RouterLink
          to="/repair/complete"
          class="repair-form__submit"
        >
          <button
            type="submit"
            class="btn--process"
          >
            確認送出
          </button>
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';
  .repair-form {
    background-color: $primary-c000;
    padding-bottom: 30px;

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
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

    &__upload-slot {
      flex-grow: 1;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1.5px dashed $neutral-c;
      border-radius: $border-r-xs;
      cursor: pointer;
      background-color: $white;
    }

    &__upload-slot:hover {
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
        padding: 1.5625vw 2.5vw 6.25vw;
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
