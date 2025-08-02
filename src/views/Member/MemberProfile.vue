<!-- src/views/Member/MemberProfile.vue -->
<template>
  <div class="profilePage">
    <MemberMobileHeader
      title="帳戶管理"
      @back="handleBack"
    >
      <template #actions>
        <!-- slot -->
        <button
          v-if="isEditing"
          @click="saveChanges"
          class="mobileHeader__actionButton is-save"
        >
          儲存
        </button>
        <button
          v-else
          @click="toggleEdit"
          class="mobileHeader__actionButton is-edit"
        >
          <svg
            class="editIcon"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
            />
          </svg>
        </button>
      </template>
    </MemberMobileHeader>

    <!-- 手機版大頭貼 -->
    <div class="profilePage__avatarContainer">
      <img
        :src="localUserData.avatar"
        alt="使用者頭像"
        class="profilePage__avatar"
        :class="{ 'is-editable': isEditing }"
        @click="isEditing && triggerFileUpload()"
      />
    </div>

    <!-- 手機版隱藏上傳區 -->
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
      accept="image/*"
    />

    <h5 class="profilePage__title bold">個人資料</h5>

    <form
      class="profilePage__form"
      @submit.prevent="saveChanges"
    >
      <div class="profilePage__container">
        <div class="detailItem detailItem--fullWidth">
          <label class="detailItem__label body--b4">地址</label>
          <p class="detailItem__content body--b3">{{ localUserData.address }}</p>
        </div>
        <div class="detailItem">
          <label class="detailItem__label body--b4">姓名</label>
          <p class="detailItem__content body--b3">{{ localUserData.name }}</p>
        </div>
        <div class="detailItem">
          <label class="detailItem__label body--b4">暱稱</label>
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
        <div class="detailItem detailItem--fullWidth">
          <label class="detailItem__label body--b4">性別</label>
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
            <label>
              <input
                type="radio"
                value="male"
                v-model="localUserData.gender"
              />
              男
            </label>
            <label>
              <input
                type="radio"
                value="female"
                v-model="localUserData.gender"
              />
              女
            </label>
            <label>
              <input
                type="radio"
                value="other"
                v-model="localUserData.gender"
              />
              不願透漏
            </label>
          </div>
        </div>
        <div class="detailItem">
          <label class="detailItem__label body--b4">電子信箱</label>
          <p class="detailItem__content body--b3">{{ localUserData.email }}</p>
        </div>
        <div class="detailItem">
          <div class="labelGroup">
            <label class="detailItem__label body--b4">聯絡電話</label>
            <span
              v-if="isPhoneInvalid"
              class="validationMessage"
            >
              不得為空
            </span>
          </div>
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
            :class="{ 'is-invalid': isPhoneInvalid }"
            type="tel"
            @blur="phoneFieldTouched = true"
          />
        </div>
        <div
          v-if="isEditing"
          class="detailItem detailItem--fullWidth avatarUpload"
        >
          <label class="detailItem__label body--b4">大頭貼</label>
          <div class="avatarUpload__controls">
            <button
              type="button"
              class="uploadButton"
              @click="triggerFileUpload"
            >
              <svg
                class="uploadImageIcon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 21.0004C4.45 21.0004 3.97933 20.8047 3.588 20.4134C3.19667 20.0221 3.00067 19.5511 3 19.0004V5.00039C3 4.45039 3.196 3.97972 3.588 3.58839C3.98 3.19706 4.45067 3.00106 5 3.00039H12.375C12.7083 3.00039 12.9627 3.13806 13.138 3.41339C13.3133 3.68872 13.3423 3.98439 13.225 4.30039C13.1417 4.58372 13.0833 4.86706 13.05 5.15039C13.0167 5.43372 13 5.71706 13 6.00039C13 7.66706 13.5833 9.08372 14.75 10.2504C15.9167 11.4171 17.3333 12.0004 19 12.0004C19.1333 12.0004 19.275 11.9964 19.425 11.9884C19.575 11.9804 19.7167 11.9594 19.85 11.9254C20.15 11.8921 20.4167 11.9671 20.65 12.1504C20.8833 12.3337 21 12.5671 21 12.8504V19.0004C21 19.5504 20.8043 20.0214 20.413 20.4134C20.0217 20.8054 19.5507 21.0011 19 21.0004H5ZM7 17.0004H17C17.2 17.0004 17.35 16.9087 17.45 16.7254C17.55 16.5421 17.5333 16.3671 17.4 16.2004L14.65 12.5254C14.55 12.3921 14.4167 12.3254 14.25 12.3254C14.0833 12.3254 13.95 12.3921 13.85 12.5254L11.25 16.0004L9.4 13.5254C9.3 13.3921 9.16667 13.3254 9 13.3254C8.83333 13.3254 8.7 13.3921 8.6 13.5254L6.6 16.2004C6.46667 16.3671 6.45 16.5421 6.55 16.7254C6.65 16.9087 6.8 17.0004 7 17.0004ZM19 10.0004C18.7167 10.0004 18.4793 9.90439 18.288 9.71239C18.0967 9.52039 18.0007 9.28306 18 9.00039V5.82539L17.1 6.70039C16.9167 6.88372 16.6877 6.97972 16.413 6.98839C16.1383 6.99706 15.9007 6.90106 15.7 6.70039C15.5167 6.51706 15.425 6.28372 15.425 6.00039C15.425 5.71706 15.5167 5.48372 15.7 5.30039L18.3 2.70039C18.4 2.60039 18.5083 2.52539 18.625 2.47539C18.7417 2.42539 18.8667 2.40039 19 2.40039C19.1333 2.40039 19.2583 2.42539 19.375 2.47539C19.4917 2.52539 19.6 2.60039 19.7 2.70039L22.3 5.30039C22.4833 5.48372 22.5793 5.71306 22.588 5.98839C22.5967 6.26372 22.5007 6.50106 22.3 6.70039C22.1167 6.88372 21.8833 6.97539 21.6 6.97539C21.3167 6.97539 21.0833 6.88372 20.9 6.70039L20 5.82539V9.00039C20 9.28372 19.9043 9.52139 19.713 9.71339C19.5217 9.90539 19.284 10.0011 19 10.0004Z"
                />
              </svg>
              上傳圖片
            </button>
            <img
              :src="localUserData.avatar"
              alt="頭像預覽"
              class="avatarUpload__preview"
            />
          </div>
        </div>
      </div>
      <div class="profilePage__actions">
        <button
          v-if="!isEditing"
          @click.prevent="toggleEdit"
          type="button"
          class="btn--membersend"
        >
          編輯
        </button>
        <template v-if="isEditing">
          <button
            @click.prevent="cancelEdit"
            type="button"
            class="btn--membercancel"
          >
            取消
          </button>
          <button
            type="submit"
            class="btn--membersend"
          >
            儲存
          </button>
        </template>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, computed, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';
  import MemberMobileHeader from '@/components/MemberMobileHeader.vue';

  const emit = defineEmits(['update:avatar']);
  const router = useRouter();
  const props = defineProps({
    userData: {
      type: Object,
      default: () => ({
        name: 'Komod·Mayaw',
        nickname: '谷木',
        address: '桃園市中壢區空瀧浪里快樂街1479號8樓-3',
        idNumber: 'H1212345678',
        birthDate: '1980/02/28',
        gender: 'male',
        email: 'a1234567@gmail.com',
        phone: '0988123456',
        avatar: new URL('@/assets/image/02.png', import.meta.url).href,
      }),
    },
  });

  const isEditing = ref(false);
  const localUserData = reactive({});
  const fileInput = ref(null);
  const stagedAvatarUrl = ref(null);
  const phoneFieldTouched = ref(false);

  onMounted(() => {
    Object.assign(localUserData, props.userData);
  });

  const genderText = computed(() => {
    const map = { male: '男', female: '女', other: '不願透漏' };
    return map[localUserData.gender] || '未設定';
  });
  const isPhoneInvalid = computed(() => {
    // 在「編輯中」且「使用者碰過輸入框」且「電話是空的」時無效
    return isEditing.value && phoneFieldTouched.value && !localUserData.phone;
  });

  const toggleEdit = () => {
    // 從編輯模式 -> 非編輯模式，等同於取消編輯
    isEditing.value = !isEditing.value;
    if (!isEditing.value) {
      // 直接呼叫 cancelEdit 還原資料
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    Object.assign(localUserData, props.userData);
    stagedAvatarUrl.value = null;
    isEditing.value = false;
    phoneFieldTouched.value = false;
  };

  const saveChanges = () => {
    // 儲存前的防禦性檢查
    if (!localUserData.phone) {
      // 如果電話是空的，顯示 alert 並終止函式
      alert('「聯絡電話」欄位不得為空');
      // 同時，手動觸發 touched 狀態，確保錯誤樣式會顯示
      phoneFieldTouched.value = true;
      return;
    }
    if (stagedAvatarUrl.value) {
      emit('update:avatar', stagedAvatarUrl.value);
    }
    alert('資料已儲存');
    stagedAvatarUrl.value = null;
    isEditing.value = false;
    phoneFieldTouched.value = false;
  };

  const goBackToMenu = () => {
    router.push('/member');
  };

  const handleBack = () => {
    if (isEditing.value) {
      cancelEdit();
    } else {
      goBackToMenu();
    }
  };

  const triggerFileUpload = () => {
    fileInput.value.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target.result;
        localUserData.avatar = newAvatarUrl;
        stagedAvatarUrl.value = newAvatarUrl;
      };
      reader.readAsDataURL(file);
    }
  };
</script>

<style lang="scss" scoped>
  // 最外層容器
  .profilePage {
    margin-top: 30px;
    width: 100%;

    // --- 手機版元素 (預設隱藏) ---
    &__avatarContainer {
      display: none;
    }

    // --- 桌面版樣式 ---
    &__title {
      color: $primary-c700;
      margin-bottom: 24px;
      text-align: center;
    }
    &__form {
      width: 100%;
    }
    &__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px 30px;
      width: 100%;
    }
    &__actions {
      display: flex;
      justify-content: center;
      gap: 15px;
      width: 100%;
      margin-top: 30px;
    }
  }

  // 單一表單欄位
  .detailItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 15px;
    &__label {
      color: $black;
    }
    &__content {
      color: $primary-c500;
      letter-spacing: 1.2px;
    }
    &__input {
      border: 1px solid $black;
      border-radius: $border-r-xs;
      box-shadow: 0px 0px 4px 4px rgba(76, 175, 213, 0.5);
      padding: 8px 12px;
      height: 42px;
      font-size: 16px;
      &:focus {
        outline: none;
        border-color: $primary-c500;
      }
    }
    &--fullWidth {
      grid-column: 1 / -1;
    }
  }

  // 性別選項容器
  .genderOptions {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 42px;
    label {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  // 驗證相關
  .labelGroup {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .validationMessage {
    font-size: 14px;
    color: $semantic-r;
  }
  .detailItem__input.is-invalid {
    border-color: $semantic-r;
    box-shadow: $typing-error;
  }

  // 大頭貼上傳區塊
  .avatarUpload {
    &__controls {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    &__preview {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  // 上傳按鈕
  .uploadButton {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 4.2px;
    color: $black;
    height: 42px;
    padding: 10px 20px;
    border: 1px solid $black;
    background-color: transparent;
    border-radius: $border-r-xs;
    cursor: pointer;
    &:hover {
      background-color: $white;
    }
    .uploadImageIcon {
      width: 20px;
      height: 20px;
      fill: $primary-c700;
    }
  }

  @include mobile {
    .profilePage {
      display: block;
      margin-top: 0;
      margin-top: 120px; //測試用之後刪除

      &__avatarContainer {
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
        margin: 40px auto;

        .profilePage__avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          &.is-editable {
            cursor: pointer;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }

      &__title {
        text-align: center;
      }
      &__form {
        padding: 0 16px 32px;
      }
      &__actions {
        display: none;
      }
      &__container {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
    }
    .avatarUpload {
      display: none;
    }

    //  slot按鈕
    .mobileHeader__actionButton {
      background: none;
      border: none;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      &.is-save {
        color: $primary-c500;
      }
      &.is-edit {
        padding: 4px;
        .editIcon {
          width: 24px;
          height: 24px;
          fill: $primary-c500;
        }
      }
    }
  }
</style>
