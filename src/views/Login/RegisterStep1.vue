<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRegisterStore } from '@/stores/register';

  const { VITE_API_BASE } = import.meta.env;
  const router = useRouter();
  const registerStore = useRegisterStore();

  const city = ref('桃園市');
  const district = ref('中壢區');
  const village = ref('空瀧浪里');
  const road = ref('');
  const villageError = ref('');
  const addressError = ref('');
  const checkingAddress = ref(false);

  // 新增地址檢查函數
  async function checkAddress(fullAddress) {
    if (!fullAddress) return false;

    checkingAddress.value = true;
    try {
      const res = await fetch(
        `${VITE_API_BASE}/api/login/address_check.php?address=${encodeURIComponent(fullAddress)}`,
        {
          credentials: 'include', // 加入此行以支援 session
        },
      );

      if (!res.ok) {
        throw new Error('請求失敗');
      }

      const data = await res.json();
      if (data.status === 'success') {
        return data.data.exists;
      }
      return false;
    } catch (e) {
      console.error('檢查地址錯誤:', e);
      return false;
    } finally {
      checkingAddress.value = false;
    }
  }

  const address = computed(() => {
    return `${city.value}${district.value}${village.value}${road.value}`;
  });

  // 修改 submitAddress 函數
  async function submitAddress() {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/login/address_post.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          address: address.value,
          status: 0,
        }),
      });

      const data = await res.json();

      if (data.status === 'success') {
        registerStore.creator_id = data.data.creator_id;
        // 儲存戶號到 store（如果有的話）
        if (data.data.household_no) {
          registerStore.household_no = data.data.household_no;
        }
        // 儲存地址資訊到 store
        registerStore.city = city.value;
        registerStore.district = district.value;
        registerStore.village = village.value;
        registerStore.address = road.value;
        // 導向下一步
        router.push('/register-step2');
      } else {
        addressError.value = data.message;
      }
    } catch (err) {
      console.error('新增地址錯誤:', err);
      addressError.value = '系統錯誤，請稍後再試';
    }
  }

  // 修改 goToRegisterStep2 函數
  async function goToRegisterStep2() {
    // 重置錯誤訊息
    villageError.value = '';
    addressError.value = '';

    // 表單驗證
    let hasError = false;

    if (!village.value) {
      villageError.value = '請選擇村里';
      hasError = true;
    }

    if (!road.value) {
      addressError.value = '地址為必填';
      hasError = true;
    }

    if (hasError) return false;

    // 檢查地址是否已被註冊
    const addressExists = await checkAddress(address.value);

    if (addressExists) {
      addressError.value = '此地址已被註冊';
      return false;
    }

    // 暫存資料
    registerStore.city = city.value;
    registerStore.district = district.value;
    registerStore.village = village.value;
    registerStore.address = road.value;

    // 導向下一步
    router.push('/register-step2');
    return true;
  }

  function goToLogin() {
    router.push('/login');
  }

  async function handleRegister() {
    const canProceed = await goToRegisterStep2();
    if (canProceed) {
      await submitAddress();
    }
  }
</script>

<template>
  <div class="login-container">
    <div class="form-card">
      <h3>家庭管理員註冊</h3>
      <div class="form-stepper">
        <div class="step-group">
          <div class="step-circle active">1</div>
          <div class="step-label">戶籍資料</div>
        </div>
        <div class="step-line"></div>
        <div class="step-group">
          <div class="step-circle">2</div>
          <div class="step-label gray">成員資料</div>
        </div>
      </div>
      <form @submit.prevent="handleRegister">
        <div class="form-group row">
          <div>
            <label>縣/市</label>
            <select>
              <option>桃園市</option>
            </select>
          </div>
          <div>
            <label>鄉/鎮/市/區</label>
            <select>
              <option>中壢區</option>
            </select>
          </div>
          <div>
            <label>村/里</label>
            <select
              v-model="village"
              :class="{ 'input-error': villageError }"
            >
              <option value="">請選擇村里</option>
              <option>空瀧浪里</option>
            </select>
            <div
              v-if="villageError"
              class="form-error"
            >
              {{ villageError }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="label-row">
            <label>地址*</label>
            <div
              v-if="addressError"
              class="form-error"
            >
              {{ addressError }}
            </div>
            <div
              v-if="checkingAddress"
              class="checking-address"
            >
              檢查地址中...
            </div>
          </div>
          <input
            type="text"
            v-model="road"
            :class="{ 'input-error': addressError }"
            placeholder="請輸入地址"
          />
        </div>
        <div class="form-group row row-btns">
          <button
            type="button"
            class="btn--membercancel"
            @click="goToLogin"
          >
            返回
          </button>
          <button
            type="submit"
            class="btn--membersend"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';
  $gray-400: #9eafb8;
  .login-container {
    @include flex-center;
    background-color: $primary-c000;
    padding: 225px 0 40px 0;
  }
  .form-card {
    padding: 0 16px;
    width: 100%;
    max-width: 450px;
  }
  .form-card h3 {
    text-align: center;
    margin-bottom: 40px;
    color: $primary-c700;
  }
  .form-stepper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 40px;

    .step-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 70px;
    }

    .step-circle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: $neutral-c;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6px;
      &.active {
        background: $primary-c700;
      }
    }

    .step-label {
      font-size: 16px;
      color: $black;
      margin-top: 0;
      &.gray {
        color: $gray-400;
        font-weight: 400;
      }
    }

    .step-line {
      width: 52px;
      height: 3px;
      background: $primary-c100;
      margin: 20px 10px 0 10px;
      align-self: flex-start;
    }
  }
  .form-group {
    margin-bottom: 12px;
    .label-row {
      display: flex;
      align-items: center;
      margin-bottom: 4px; // 與 input 有點距離
      label {
        margin-bottom: 0;
        margin-right: 10px;
        font-size: 16px;
        color: $black;
        font-family: $font-sans;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.2em;
      }
      // .form-error {
      //   color: red;
      //   font-size: 15px;
      //   font-weight: 400;
      //   margin: 0;
      //   white-space: nowrap;
      // }
    }
    &.row {
      display: flex;
      gap: 12px;
      > div {
        flex: 1;
      }
    }
    &.row-btns {
      display: flex;
      justify-content: center;
      gap: 24px;
    }
  }
  label {
    display: block;
    margin-bottom: 8px;
    color: $black;
    font-family: $font-sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.2em;
  }
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid $primary-c100;
    border-radius: 5px;
    font-family: $font-sans;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.1em;
    box-sizing: border-box;
    background: #fff;
    // &.input-error {
    //   border-color: red;
    // }
  }
  input::placeholder {
    color: $neutral-c;
  }
  input:focus,
  select:focus {
    border-color: $primary-c300;
    box-shadow: 0 0px 5px 0 $primary-c300;
    outline: none;
  }
  .input-error {
    border-color: red !important;
  }
  .form-error {
    color: red;
    font-size: 13px;
    margin-top: 4px;
    margin-bottom: 0;
    white-space: nowrap;
  }
  .checking-address {
    color: $primary-c300;
    font-size: 13px;
    margin-left: 8px;
  }
  .btn--membersend {
    border: none;
    padding: 0 0 3px 4px;
    margin-top: 20px;
  }
  .btn--membercancel {
    padding: 0 0 3px 4px;
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    .login-container {
      padding: 120px 0 60px 0;
    }
    .form-card {
      padding: 12px;
      max-width: 98vw;
    }
    .form-group.row {
      flex-direction: column;
      gap: 0;
    }
    .form-group.row-btns {
      display: flex;
      flex-direction: row;
      gap: 32px;
    }
    label {
      margin-top: 8px;
    }
  }
</style>
