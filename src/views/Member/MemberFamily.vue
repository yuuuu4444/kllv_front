<script setup>
  import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import MemberModal from '@/components/MemberModal.vue';
  import MemberMobileHeader from '@/components/MemberMobileHeader.vue';

  const router = useRouter();
  const auth = useAuthStore();
  const isFormVisible = ref(false);
  const viewingMember = ref(null);

  // 引入環境變數
  const { VITE_API_BASE } = import.meta.env;
  const familyMembers = ref([]);
  const isLoading = ref(true);

  // 假的家庭成員資料
  // const familyMembers = ref([
  //   {
  //     user_id: 'f001',
  //     fullname: 'Foday·Afo',
  //     email: 'abc123@gmail.com',
  //     phone_number: '0988123459',
  //   },
  //   {
  //     user_id: 'f002',
  //     fullname: 'Panay·Mayaw',
  //     email: 'abc1234@gmail.com',
  //     phone_number: '09881234567',
  //   },
  // ]);

  // GET家庭成員
  const fetchFamilyMembers = async () => {
    isLoading.value = true;
    try {
      const apiUrl = `${VITE_API_BASE}/api/member/family_get.php`;
      const res = await fetch(apiUrl, {
        credentials: 'include',
      });
      console.log(res);

      if (!res.ok) {
        if (res.status === 401) {
          auth.logout();
          router.push('/login');
        }
        throw new Error(`伺服器錯誤: ${res.status}`);
      }

      const data = await res.json();
      if (data.status === 'success') {
        // API 成功回傳資料，將其賦值給 familyMembers
        familyMembers.value = data.data;
      } else {
        // API 回傳的 JSON 內容表示有錯誤
        throw new Error(data.message || '無法獲取家庭成員列表');
      }
    } catch (error) {
      console.error('獲取家庭成員時發生錯誤:', error);
      alert(error.message); // 顯示錯誤訊息給使用者
    } finally {
      isLoading.value = false;
    }
  };

  const newMember = reactive({
    fullname: '',
    user_id: '',
    password: '',
    email: '',
    phone_number: '',
  });

  // 原本的新增的成員
  // const addMember = () => {
  //   if (
  //     !newMember.fullname ||
  //     !newMember.user_id ||
  //     !newMember.password ||
  //     !newMember.email ||
  //     !newMember.phone_number
  //   ) {
  //     alert('所有欄位皆必填');
  //     return;
  //   }
  //   familyMembers.value.push({ user_id: `f${Date.now()}`, ...newMember });
  //   alert(`家庭成員 ${newMember.fullname} 已新增！`);
  //   hideForm();
  // };

  // 原本的刪除成員
  // const deleteMember = (memberId) => {
  //   if (confirm('確定要刪除這位家庭成員嗎？')) {
  //     familyMembers.value = familyMembers.value.filter((m) => m.user_id !== memberId);
  //   }
  // };

  //POST新增家庭成員
  const addMember = async () => {
    if (
      !newMember.fullname ||
      !newMember.user_id ||
      !newMember.password ||
      !newMember.email ||
      !newMember.phone_number
    ) {
      alert('所有欄位皆必填');
      return;
    }

    try {
      const apiUrl = `${VITE_API_BASE}/api/member/family_add_post.php`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });
      const data = await res.json();

      // res.ok 檢查 HTTP 狀態碼是否為 2xx (成功)
      if (res.ok && data.status === 'success') {
        // familyMembers.value.push(data.data);

        const updatedMembers = [...familyMembers.value, data.data];
        familyMembers.value = updatedMembers;

        alert(`家庭成員 ${newMember.fullname} 已新增！`);
        hideForm(); // 關閉表單並清空輸入框
      } else {
        // 如果後端回傳錯誤訊息 (例如帳號重複)
        throw new Error(data.message || '新增家庭成員失敗');
      }
    } catch (error) {
      console.error('新增家庭成員時發生錯誤:', error);
      alert(error.message);
    }
  };

  // 重設表單函式
  const resetForm = () => {
    Object.assign(newMember, {
      fullname: '',
      user_id: '',
      password: '',
      email: '',
      phone_number: '',
    });
  };

  //POST(DELETE)刪除家庭成員
  const deleteMember = async (userId) => {
    if (confirm('確定要刪除這位家庭成員嗎？')) {
      try {
        // URL 指向 .php 檔案本身，沒有後面的 ID
        const apiUrl = `${VITE_API_BASE}/api/member/family_delete_post.php`;

        const res = await fetch(apiUrl, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          // 將要刪除的 ID 放在 Body 中發送
          body: JSON.stringify({ user_id: userId }),
        });

        const data = await res.json();
        if (res.ok && data.status === 'success') {
          // familyMembers.value = familyMembers.value.filter((m) => m.user_id !== userId);

          const updatedMembers = familyMembers.value.filter((m) => m.user_id !== userId);
          familyMembers.value = updatedMembers;

          alert('成員已刪除');
        } else {
          throw new Error(data.message || '刪除失敗');
        }
      } catch (error) {
        console.error('刪除成員時發生錯誤:', error);
        alert(error.message);
      }
    }
  };

  // --- 事件處理函式 ---
  const showAddForm = () => {
    isFormVisible.value = true;
  };
  const hideForm = () => {
    isFormVisible.value = false;
    resetForm();
  };

  const goBackToMenu = () => {
    router.push('/member');
  };

  const showMemberDetails = (member) => {
    // 只在手機版生效
    if (window.innerWidth <= 768) {
      viewingMember.value = member;
    }
  };
  const hideMemberDetails = () => {
    viewingMember.value = null;
  };

  // --- JS RWD 判斷 ---
  // 監聽視窗寬度變化，以確保 computed 屬性能夠響應
  const screenWidth = ref(window.innerWidth);
  const handleResize = () => {
    screenWidth.value = window.innerWidth;
  };
  onMounted(() => {
    if (!auth.isLoggedIn) {
      auth.checkAuth().then((isSuccess) => {
        if (isSuccess) {
          fetchFamilyMembers(); // 確認登入後才 fetch
        } else {
          router.push('/login');
        }
      });
    } else {
      fetchFamilyMembers(); // 如果已經登入了，直接 fetch
    }
    window.addEventListener('resize', handleResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  // 使用標準的、無歧義的斷點來定義 JS 中的「手機」
  const isMobile = computed(() => screenWidth.value <= 768);

  // 計算屬性，用於決定顯示哪個 UI
  const isModalOpen = computed(() => {
    // 彈窗只在「表單可見」且「不是手機」時顯示
    return isFormVisible.value && !isMobile.value;
  });
  const isMobileFormVisible = computed(() => {
    // 手機表單只在「表單可見」且「是手機」時顯示
    return isFormVisible.value && isMobile.value;
  });

  const isViewingDetails = computed(() => {
    // 只有在 viewingMember 有值，且「是手機」時顯示
    return viewingMember.value !== null && isMobile.value;
  });
</script>

<template>
  <div class="familyPage">
    <!-- 手機版表格、桌面版列表 顯示狀態 -->
    <div v-if="!isMobileFormVisible && !isViewingDetails">
      <!-- 手機版 header -->
      <MemberMobileHeader
        title="帳戶管理"
        @back="goBackToMenu"
        class="mobile-only-header"
      />
      <h5 class="familyPage__title bold">家庭成員</h5>
      <div
        v-if="isLoading"
        class="info-state"
      >
        正在載入家庭成員...
      </div>
      <div
        v-else-if="familyMembers.length === 0"
        class="info-state"
      >
        <p>目前沒有家庭成員資料</p>
        <div class="desktopTable">
          <div class="desktopTable__actions">
            <button
              @click="showAddForm"
              class="btn--membersend"
            >
              新增
            </button>
          </div>
        </div>
      </div>

      <!-- 桌面版：表格 -->
      <div
        v-else
        class="desktopTable"
      >
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>電子信箱</th>
              <th>聯絡電話</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="member in familyMembers"
              :key="member.user_id"
            >
              <td>{{ member.fullname }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.phone_number }}</td>
              <td>
                <button
                  @click="deleteMember(member.user_id)"
                  class="iconButton"
                >
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 4C7.581 4 4 7.582 4 12C4 16.418 7.581 20 12 20C16.419 20 20 16.418 20 12C20 7.582 16.419 4 12 4ZM15.707 14.293C15.8945 14.4805 15.9998 14.7348 15.9998 15C15.9998 15.2652 15.8945 15.5195 15.707 15.707C15.5195 15.8945 15.2652 15.9998 15 15.9998C14.7348 15.9998 14.4805 15.8945 14.293 15.707L12 13.414L9.707 15.707C9.61435 15.8002 9.50419 15.8741 9.38285 15.9246C9.26152 15.9751 9.13141 16.001 9 16.001C8.86859 16.001 8.73848 15.9751 8.61715 15.9246C8.49581 15.8741 8.38565 15.8002 8.293 15.707C8.10553 15.5195 8.00021 15.2652 8.00021 15C8.00021 14.7348 8.10553 14.4805 8.293 14.293L10.586 12L8.293 9.707C8.10549 9.51949 8.00015 9.26518 8.00015 9C8.00015 8.73482 8.10549 8.48051 8.293 8.293C8.48051 8.10549 8.73482 8.00015 9 8.00015C9.26518 8.00015 9.51949 8.10549 9.707 8.293L12 10.586L14.293 8.293C14.4805 8.10549 14.7348 8.00015 15 8.00015C15.2652 8.00015 15.5195 8.10549 15.707 8.293C15.8945 8.48051 15.9998 8.73482 15.9998 9C15.9998 9.26518 15.8945 9.51949 15.707 9.707L13.414 12L15.707 14.293Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="desktopTable__actions">
          <button
            @click="showAddForm"
            class="btn--membersend"
          >
            新增
          </button>
        </div>
      </div>

      <!-- 手機版：列表 -->
      <div class="mobileList">
        <div
          v-for="member in familyMembers"
          :key="member.user_id"
          class="mobileList__item"
        >
          <span
            @click="showMemberDetails(member)"
            class="is-clickable"
          >
            {{ member.fullname }}
          </span>
          <button
            @click="deleteMember(member.user_id)"
            class="iconButton"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M12 4C7.581 4 4 7.582 4 12C4 16.418 7.581 20 12 20C16.419 20 20 16.418 20 12C20 7.582 16.419 4 12 4ZM15.707 14.293C15.8945 14.4805 15.9998 14.7348 15.9998 15C15.9998 15.2652 15.8945 15.5195 15.707 15.707C15.5195 15.8945 15.2652 15.9998 15 15.9998C14.7348 15.9998 14.4805 15.8945 14.293 15.707L12 13.414L9.707 15.707C9.61435 15.8002 9.50419 15.8741 9.38285 15.9246C9.26152 15.9751 9.13141 16.001 9 16.001C8.86859 16.001 8.73848 15.9751 8.61715 15.9246C8.49581 15.8741 8.38565 15.8002 8.293 15.707C8.10553 15.5195 8.00021 15.2652 8.00021 15C8.00021 14.7348 8.10553 14.4805 8.293 14.293L10.586 12L8.293 9.707C8.10549 9.51949 8.00015 9.26518 8.00015 9C8.00015 8.73482 8.10549 8.48051 8.293 8.293C8.48051 8.10549 8.73482 8.00015 9 8.00015C9.26518 8.00015 9.51949 8.10549 9.707 8.293L12 10.586L14.293 8.293C14.4805 8.10549 14.7348 8.00015 15 8.00015C15.2652 8.00015 15.5195 8.10549 15.707 8.293C15.8945 8.48051 15.9998 8.73482 15.9998 9C15.9998 9.26518 15.8945 9.51949 15.707 9.707L13.414 12L15.707 14.293Z"
              />
            </svg>
          </button>
        </div>

        <div
          class="mobileList__item is-add-button"
          @click="showAddForm"
        >
          <span>新增成員</span>
          <svg
            class="addIcon"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- 手機版第二層：新增成員全頁表單 -->
    <div
      v-else-if="isMobileFormVisible"
      class="mobileFormContainer"
    >
      <MemberMobileHeader
        title="家庭成員"
        @back="hideForm"
      >
        <template #actions>
          <button
            @click="addMember"
            class="mobileHeader__actionButton is-save"
          >
            儲存
          </button>
        </template>
      </MemberMobileHeader>

      <h5 class="familyPage__title bold">新增成員</h5>
      <form
        class="addMemberForm"
        @submit.prevent="addMember"
      >
        <div class="addMemberForm__fields">
          <div class="detailItem">
            <label class="detailItem__label body--b4">姓名 *</label>
            <input
              v-model="newMember.fullname"
              class="detailItem__input"
              type="text"
            />
          </div>
          <div class="detailItem">
            <label class="detailItem__label body--b4">帳號 *</label>
            <input
              v-model="newMember.user_id"
              class="detailItem__input"
              type="text"
            />
          </div>
          <div class="detailItem">
            <label class="detailItem__label body--b4">
              密碼 *
              <span class="labelText--remark">家庭成員登入後可自行修改</span>
            </label>
            <input
              v-model="newMember.password"
              class="detailItem__input"
              type="password"
            />
          </div>
          <div class="detailItem">
            <label class="detailItem__label body--b4">電子信箱 *</label>
            <input
              v-model="newMember.email"
              class="detailItem__input"
              type="email"
            />
          </div>
          <div class="detailItem">
            <label class="detailItem__label body--b4">
              聯絡電話 *
              <span class="labelText--remark">家庭成員登入後可自行修改</span>
            </label>
            <input
              v-model="newMember.phone_number"
              class="detailItem__input"
              type="tel"
            />
          </div>
        </div>
      </form>
    </div>

    <!-- 手機版第三層：成員詳細資料頁面 -->
    <div
      v-else-if="isViewingDetails"
      class="mobileDetailContainer"
    >
      <MemberMobileHeader
        v-if="isViewingDetails"
        title="家庭成員"
        @back="hideMemberDetails"
        class="mobile-only-header"
      />
      <h5 class="familyPage__title bold">成員資訊</h5>
      <div
        v-if="viewingMember"
        class="memberDetail"
      >
        <div class="detailItem">
          <label class="detailItem__label body--b4">姓名</label>
          <p class="detailItem__content body--b3">{{ viewingMember.fullname }}</p>
        </div>
        <div class="detailItem">
          <label class="detailItem__label body--b4">電子信箱</label>
          <p class="detailItem__content body--b3">{{ viewingMember.email }}</p>
        </div>
        <div class="detailItem">
          <label class="detailItem__label body--b4">聯絡電話</label>
          <p class="detailItem__content body--b3">{{ viewingMember.phone_number }}</p>
        </div>
      </div>
    </div>

    <!-- 桌面版：新增成員彈窗 -->
    <MemberModal
      :show="isModalOpen"
      @close="hideForm"
    >
      <template #header>新增家庭成員</template>
      <template #default>
        <form
          class="addMemberForm"
          @submit.prevent="addMember"
        >
          <div class="addMemberForm__fields">
            <div class="detailItem">
              <label class="detailItem__label body--b4">姓名 *</label>
              <input
                v-model="newMember.fullname"
                class="detailItem__input"
                type="text"
              />
            </div>
            <div class="detailItem">
              <label class="detailItem__label body--b4">帳號 *</label>
              <input
                v-model="newMember.user_id"
                class="detailItem__input"
                type="text"
              />
            </div>
            <div class="detailItem">
              <label class="detailItem__label body--b4">
                密碼 *
                <span class="labelText--remark">家庭成員登入後可自行修改</span>
              </label>
              <input
                v-model="newMember.password"
                class="detailItem__input"
                type="password"
              />
            </div>
            <div class="detailItem">
              <label class="detailItem__label body--b4">電子信箱 *</label>
              <input
                v-model="newMember.email"
                class="detailItem__input"
                type="email"
              />
            </div>
            <div class="detailItem">
              <label class="detailItem__label body--b4">
                聯絡電話 *
                <span class="labelText--remark">家庭成員登入後可自行修改</span>
              </label>
              <input
                v-model="newMember.phone_number"
                class="detailItem__input"
                type="tel"
              />
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="addMemberForm__actions">
          <button
            @click.prevent="hideForm"
            type="button"
            class="btn--membercancel"
          >
            取消
          </button>
          <button
            @click.prevent="addMember"
            type="submit"
            class="btn--membersend"
          >
            確定
          </button>
        </div>
      </template>
    </MemberModal>
  </div>
</template>

<style lang="scss" scoped>
  .familyPage {
    &__title {
      color: $primary-c700;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 32px;
    }
  }

  .info-state {
    text-align: center;
    padding: 40px;
    color: $neutral-c;
  }

  .desktopTable {
    display: block;
    width: 100%;
    table {
      width: 100%;
      border: 1px solid $neutral-c;
      border-radius: $border-r-md;
      border-collapse: separate;
      border-spacing: 0;
      overflow: hidden;
      background-color: $white;
    }
    thead tr {
      background-color: $primary-c700;

      th {
        color: $white;
        border-right: 1px solid $neutral-c;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.2em;
        padding: 14px 16px;
        text-align: center;

        &:last-child {
          border-right: none;
        }
      }
    }
    tbody {
      tr:nth-child(2n) {
        background-color: rgba(0, 75, 128, 0.1);
      }
      tr {
        text-align: center;
        td {
          border-right: 1px solid $neutral-c;
          border-bottom: 1px solid $neutral-c;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px;
          letter-spacing: 0.2em;
          padding: 14px 16px;
          color: $black;

          text-align: center;
          vertical-align: middle;

          word-break: break-all; //太長換行

          &:last-child {
            border-right: none;
          }
        }
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .iconButton {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      svg {
        width: 24px;
        height: 24px;
        fill: $neutral-c;
        &:hover {
          fill: $semantic-r;
        }
      }
    }
    .info-state {
      text-align: center;
      padding: 40px;
      color: $neutral-c;
    }
    &__actions {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }

  .mobileList {
    display: none;
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid $primary-c100;
      cursor: pointer;

      &.is-add-button {
        color: $primary-c500;
        cursor: pointer;
        font-weight: 500;
        border-bottom: none;
      }
    }
    .iconButton {
      background: none;
      border: none;
      cursor: pointer;
      svg {
        width: 24px;
        height: 24px;
        fill: $neutral-c;
        &:hover {
          fill: $semantic-r;
        }
      }
    }
    .addIcon {
      fill: $primary-c500;
      width: 24px;
      height: 24px;
    }
  }

  .addMemberForm {
    &__fields {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 30px;
    }
  }

  .detailItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    &__label {
      color: $black;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    &__input {
      border: 1px solid $black;
      border-radius: $border-r-xs;
      padding: 8px 12px;
      height: 42px;
      font-size: 16px;
      &:focus {
        outline: none;
        border-color: $primary-c500;
        box-shadow: $typing;
      }
    }
    &__content {
      color: $primary-c500;
      letter-spacing: 1.2px;
    }
  }
  .labelText--remark {
    font-size: 14px;
    color: $semantic-r;
  }

  :deep(.modal__footer .addMemberForm__actions) {
    margin-top: 0;
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

  .memberDetail {
    padding: 20px 16px;
    .detailItem {
      padding-bottom: 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid $primary-c100;
      &:last-child {
        border-bottom: none;
      }
    }
  }

  // 顯示桌面版，隱藏手機版
  .desktopTable {
    display: block;
  }
  .mobileList {
    display: none;
  }
  .mobile-only-header {
    display: none;
  }
  .mobileDetailContainer {
    display: none;
  }

  @include mobile {
    .desktopTable {
      display: none;
    }
    .mobileList {
      display: block;
    }

    // 顯示手機版列表的 Header
    .mobile-only-header {
      display: flex;
    }

    // 當處於手機表單狀態時，隱藏列表容器
    // 需要父層 v-if="!isMobileFormVisible" 來移除列表

    .familyPage {
      margin-top: 0;
      &__title {
        text-align: center;
        margin: 24px;
      }
    }

    // 手機版全頁表單的容器
    .mobileFormContainer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $primary-c000;
      z-index: 900;
      overflow-y: auto;
      .addMemberForm {
        padding: 0px 16px 20px 16px;
      }
    }
    // 手機版成員詳細資料
    .mobileDetailContainer {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $primary-c000;
      z-index: 900;
      overflow-y: auto;
    }
  }
</style>
