<script setup>
  import { ref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import MemberMobileHeader from '@/components/MemberMobileHeader.vue';

  const router = useRouter();
  const { VITE_API_BASE } = import.meta.env;
  const auth = useAuthStore();

  // 存放表單資料的響應式物件
  const passwordData = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const confirmPasswordTouched = ref(false);

  // 輔助計算屬性
  // 驗證兩次輸入的新密碼是否一致
  const passwordsDoNotMatch = computed(() => {
    return (
      passwordData.newPassword &&
      passwordData.confirmPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    );
  });

  // 事件處理函式
  const goBackToMenu = () => router.push('/member');

  // 原本的提交表單函式
  // const submitPasswordChange = () => {
  //   // 必填驗證
  //   if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
  //     alert('所有欄位皆為必填！');
  //     return;
  //   }
  //   // 確認密碼一致性驗證
  //   if (passwordsDoNotMatch.value) {
  //     alert('兩次輸入的新密碼不一致，請重新確認！');
  //     return;
  //   }
  //   // 新密碼格式驗證
  //   const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,12}$/;
  //   if (!passwordRegex.test(passwordData.newPassword)) {
  //     alert('新密碼格式不符！\n必須為 8-12 字元，且同時包含小寫英文和數字。');
  //     return;
  //   }

  //   // 未來這裡會呼叫 API 來變更密碼
  //   console.log('準備送出密碼變更請求:', {
  //     old_password: passwordData.oldPassword,
  //     new_password: passwordData.newPassword,
  //   });
  //   alert('密碼修改成功！');

  //   // 成功後清空表單
  //   Object.assign(passwordData, { oldPassword: '', newPassword: '', confirmPassword: '' });
  // };

  const isLoading = ref(false);
  const submitPasswordChange = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('所有欄位皆為必填！');
      return;
    }

    if (passwordsDoNotMatch.value) {
      alert('两次输入的新密码不一致，请重新确认！');
      return;
    }

    // 新密碼格式驗證
    const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,12}$/;
    if (!passwordRegex.test(passwordData.newPassword)) {
      alert('新密碼格式不符！\n必須為 8-12 字元，且同時包含小寫英文和數字。');
      return;
    }
    isLoading.value = true;
    try {
      const apiUrl = `${VITE_API_BASE}/api/member/password_update_post.php`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          old_password: passwordData.oldPassword,
          new_password: passwordData.newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        alert('密碼修改成功！');

        // 成功後清空表單
        Object.assign(passwordData, { oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        throw new Error(data.message || '密碼修改失敗');
      }
    } catch (error) {
      console.error('修改密碼時發生錯誤:', error);
      alert(error.message);
    } finally {
      isLoading.value = false;
    }
  };
</script>

<template>
  <div class="passwordPage">
    <!-- 手機版 header -->
    <MemberMobileHeader
      title="帳戶管理"
      @back="goBackToMenu"
    >
      <template #actions>
        <button
          @click="submitPasswordChange"
          class="mobileHeader__actionButton is-save"
        >
          儲存
        </button>
      </template>
    </MemberMobileHeader>

    <h5 class="passwordPage__title bold">重設密碼</h5>

    <form
      class="passwordForm"
      @submit.prevent="submitPasswordChange"
    >
      <!-- 舊密碼欄位 -->
      <div class="formItem">
        <label
          for="oldPassword"
          class="formItem__label"
        >
          舊密碼
        </label>
        <input
          id="oldPassword"
          v-model="passwordData.oldPassword"
          type="password"
          class="formItem__input"
          placeholder="請輸入原始密碼"
          required
        />
      </div>

      <!-- 新密碼欄位 -->
      <div class="formItem">
        <label
          for="newPassword"
          class="formItem__label"
        >
          新密碼
        </label>
        <input
          id="newPassword"
          v-model="passwordData.newPassword"
          type="password"
          class="formItem__input"
          placeholder="8-12字元，包含小寫英文和數字"
          required
        />
      </div>

      <!-- 再次輸入新密碼欄位 -->
      <div class="formItem">
        <label
          for="confirmPassword"
          class="formItem__label"
        >
          再次輸入新密碼
        </label>
        <input
          id="confirmPassword"
          v-model="passwordData.confirmPassword"
          type="password"
          class="formItem__input"
          :class="{ 'is-invalid': passwordsDoNotMatch && confirmPasswordTouched }"
          placeholder="請再輸入一次"
          required
          @blur="confirmPasswordTouched = true"
        />
        <span
          v-if="passwordsDoNotMatch && confirmPasswordTouched"
          class="validationMessage"
        >
          兩次輸入的新密碼不一致！
        </span>
      </div>

      <!-- 桌面版：送出按鈕 -->
      <div class="passwordForm__actions">
        <button
          type="submit"
          class="btn--membersend"
        >
          確認
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/variables';
  @import '@/assets/scss/mixin';

  .passwordPage {
    width: 100%;
    &__title {
      color: $primary-c700;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 32px;
    }
  }

  .passwordForm {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .formItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;

    &__label {
      color: $black;
      font-weight: 500;
    }
    &__input {
      border: 1px solid $black;
      border-radius: $border-r-xs;
      // 移除為眼睛圖示預留的 padding
      padding: 8px 12px;
      height: 42px;
      font-size: 16px;
      &:focus {
        outline: none;
        border-color: $primary-c500;
        box-shadow: $typing;
      }
      &.is-invalid {
        border-color: $semantic-r;
        box-shadow: $typing-error;
      }
    }
  }

  .validationMessage {
    font-size: 14px;
    color: $semantic-r;
    margin-top: 4px;
  }

  .passwordForm__actions {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  @include mobile {
    .passwordPage {
      &__title {
        margin: 24px;
      }
    }
    .passwordForm {
      max-width: none;
      padding: 0px 16px 20px 16px;
      &__actions {
        display: none;
      }
    }

    .mobileHeader__actionButton {
      background: none;
      border: none;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      &.is-save {
        color: $primary-c500;
      }
    }
  }
</style>
