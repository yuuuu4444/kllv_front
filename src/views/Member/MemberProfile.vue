<template>
  <!-- Block: profilePage -->
  <div class="profilePage">
    <!-- 
      Element: mobileHeader 
      - 只在手機版顯示
      - 包含返回、標題、儲存按鈕
    -->
    <header class="profilePage__mobileHeader">
      <button
        @click="goBack"
        class="profilePage__backButton"
      >
        <
      </button>
      <span class="profilePage__headerTitle">帳戶管理</span>
      <button
        v-if="isEditing"
        @click="saveChanges"
        class="profilePage__saveButton"
      >
        儲存
      </button>
    </header>

    <!-- 
      Element: avatarContainer 
      - 只在手機版顯示
    -->
    <div class="profilePage__avatarContainer">
      <img
        :src="localUserData.avatar"
        alt="使用者頭像"
        class="profilePage__avatar"
      />
      <button class="profilePage__editAvatarButton">✏️</button>
    </div>

    <!-- 
      Element: title
      - 桌機、手機都會顯示的主標題
    -->
    <h3 class="profilePage__title bold">個人資料</h3>

    <!-- 
      Element: details
      - 包裹所有資料項目的容器
    -->
    <div class="profilePage__details">
      <!-- 每個 detailItem 都是一個欄位 -->
      <div class="detailItem">
        <label class="detailItem__label body--b4">地址</label>
        <p class="detailItem__content body--b3">{{ localUserData.address }}</p>
      </div>

      <!-- 使用 grid 來排版的區塊 -->
      <div class="detailGrid">
        <div class="detailItem">
          <label class="detailItem__label body--b4">姓名</label>
          <p class="detailItem__content body--b3">{{ localUserData.name }}</p>
        </div>

        <div class="detailItem">
          <label class="detailItem__label body--b4">暱稱</label>
          <!-- 顯示/編輯模式切換 -->
          <p
            v-if="!isEditing"
            class="detailItem__content body--b3"
          >
            {{ localUserData.nickname }}
          </p>
          <input
            v-else
            v-model="localUserData.nickname"
            class="detailItem__input"
            type="text"
          />
        </div>

        <div class="detailItem">
          <label class="detailItem__label body--b4">身分證字號</label>
          <p class="detailItem__content body--b3">{{ localUserData.idNumber }}</p>
        </div>

        <div class="detailItem">
          <label class="detailItem__label body--b4">生日</label>
          <p class="detailItem__content body--b3">{{ localUserData.birthDate }}</p>
        </div>

        <div class="detailItem detailItem--gender">
          <label class="detailItem__label body--b4">性別</label>
          <!-- 顯示/編輯模式切換 -->
          <div
            v-if="!isEditing"
            class="detailItem__content"
          >
            {{ genderText }}
          </div>
          <div
            v-else
            class="genderOptions"
          >
            <input
              type="radio"
              id="male"
              value="male"
              v-model="localUserData.gender"
            />
            <label for="male">男</label>
            <input
              type="radio"
              id="female"
              value="female"
              v-model="localUserData.gender"
            />
            <label for="female">女</label>
            <input
              type="radio"
              id="other"
              value="other"
              v-model="localUserData.gender"
            />
            <label for="other">不願透漏</label>
          </div>
        </div>

        <div class="detailItem">
          <label class="detailItem__label body--b4">電子信箱</label>
          <p
            v-if="!isEditing"
            class="detailItem__content body--b3"
          >
            {{ localUserData.email }}
          </p>
          <input
            v-else
            v-model="localUserData.email"
            class="detailItem__input"
            type="email"
          />
        </div>

        <div class="detailItem">
          <label class="detailItem__label body--b4">聯絡電話</label>
          <p
            v-if="!isEditing"
            class="detailItem__content body--b3"
          >
            {{ localUserData.phone }}
          </p>
          <input
            v-else
            v-model="localUserData.phone"
            class="detailItem__input"
            type="tel"
          />
        </div>
      </div>
    </div>

    <!-- 
      Element: actions
      - 編輯/儲存/取消按鈕的容器
      - 只在桌機版顯示
    -->
    <div class="profilePage__actions">
      <button
        v-if="!isEditing"
        @click="toggleEdit"
        class="btn--membersend"
      >
        編輯
      </button>
      <template v-if="isEditing">
        <button
          @click="cancelEdit"
          class="btn--membercancel"
        >
          取消
        </button>
        <button
          @click="saveChanges"
          class="btn--membersend"
        >
          儲存
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';

  // 步驟1: 接收來自父層的 props
  const props = defineProps({
    userData: {
      type: Object,
      required: true,
    },
  });

  const router = useRouter();

  // 步驟2: 定義內部狀態
  const isEditing = ref(false); // 控制是否為編輯模式
  const localUserData = reactive({}); // 用於編輯的本地資料副本

  // 步驟3: 準備好需要用到的函式
  // 切換編輯模式
  const toggleEdit = () => {
    isEditing.value = true;
  };

  // 取消編輯
  const cancelEdit = () => {
    Object.assign(localUserData, props.userData); // 將改動過的資料還原成原始 props 資料
    isEditing.value = false;
  };

  // 儲存變更
  const saveChanges = () => {
    console.log('正在儲存變更到後端:', localUserData);
    // 在這裡，你可以呼叫 API 將 localUserData 送到後端
    // 假設 API 呼叫成功...
    // 為了讓父層的資料也同步，理想上應該由父層發 API，或子層通知父層更新
    alert('資料已儲存！');
    isEditing.value = false;
  };

  // 返回上一頁 (手機版用)
  const goBack = () => {
    router.back();
  };

  // 計算屬性：將 'male'/'female' 轉換成中文顯示
  const genderText = computed(() => {
    switch (localUserData.gender) {
      case 'male':
        return '男';
      case 'female':
        return '女';
      default:
        return '不願透漏';
    }
  });

  // 元件掛載時，將 props 的資料複製到本地副本，避免直接修改 props
  onMounted(() => {
    Object.assign(localUserData, props.userData);
  });
</script>

<style lang="scss" scoped>
  // Block: profilePage
  .profilePage {
    &__title {
      margin-bottom: 30px;
      // 手機版標題置中
      @include mobile {
        text-align: center;
      }
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    // Element: actions (編輯/儲存按鈕容器)
    &__actions {
      display: flex;
      justify-content: flex-end; // 讓按鈕靠右
      gap: 15px;
      margin-top: 30px;
    }

    // 以下是手機版專屬樣式，預設不顯示
    &__mobileHeader,
    &__avatarContainer {
      display: none;
    }
  }

  // Block: detailItem
  .detailItem {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__label {
      // color: $neutral-c;
      color: $black;
    }

    &__content {
      margin: 0;
      color: $primary-c700;
    }

    &__input {
      border: 1px solid $primary-c700;
      border-radius: $border-r-xs;
      padding: 8px 12px;
      font-size: 16px;
      width: 100%;
      background-color: $white;
      color: $primary-c700;
    }

    // Modifier for gender alignment
    &--gender {
      grid-column: 1 / -1; // 讓性別欄位佔滿整行
    }
  }

  // Layout Block for grid
  .detailGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }

  .genderOptions {
    display: flex;
    align-items: center;
    gap: 15px;
    label {
      margin-left: 5px;
    }
  }

  // --- RWD ---
  @include mobile {
    .profilePage {
      &__mobileHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 5px;
      }

      &__backButton,
      &__saveButton {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        color: $primary-c700;
      }

      &__headerTitle {
        font-weight: bold;
        font-size: 20px;
      }

      &__avatarContainer {
        display: flex;
        justify-content: center;
        position: relative;
        margin-bottom: 20px;
      }

      &__avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
      }

      &__editAvatarButton {
        position: absolute;
        bottom: 0; // 根據設計圖調整到右下角
        right: 10%; // 根據設計圖調整
        background: $white;
        border: 1px solid $neutral-c;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: 20px;
        color: $primary-c700;
        @include flex-center;
      }

      // 手機版隱藏桌機的總「編輯/儲存」按鈕
      &__actions {
        display: none;
      }
    }

    // 在手機上，Grid 變回單欄
    .detailGrid {
      grid-template-columns: 1fr;
    }

    // 在手機上，不需要特別設定性別欄位佔滿整行
    .detailItem--gender {
      grid-column: auto;
    }
  }
</style>
