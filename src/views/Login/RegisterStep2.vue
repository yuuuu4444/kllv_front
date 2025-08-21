<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRegisterStore } from '@/stores/register';

  const { VITE_API_BASE } = import.meta.env;
  const router = useRouter();
  const registerStore = useRegisterStore();

  // 表單欄位
  const account = ref('');
  const password = ref('');
  const email = ref('');
  const fullname = ref('');
  const nickname = ref('');
  const idNumber = ref('');
  const phone = ref('');
  const birthDate = ref('');
  const gender = ref('');
  const agree = ref(false);

  // 錯誤訊息
  const accountError = ref('');
  const passwordError = ref('');
  const emailError = ref('');
  const fullnameError = ref('');
  const idNumberError = ref('');
  const phoneError = ref('');
  const birthDateError = ref('');
  const genderError = ref('');
  const agreeError = ref('');
  const generalError = ref('');

  function goToCancel() {
    router.push('/register-step1');
  }

  // 驗證函數
  function validateForm() {
    let hasError = false;

    // 重置錯誤訊息
    accountError.value = '';
    passwordError.value = '';
    emailError.value = '';
    fullnameError.value = '';
    idNumberError.value = '';
    phoneError.value = '';
    birthDateError.value = '';
    genderError.value = '';
    agreeError.value = '';
    generalError.value = '';

    // 帳號驗證
    if (!account.value) {
      accountError.value = '請輸入帳號';
      hasError = true;
    }

    // 密碼驗證
    if (!password.value) {
      passwordError.value = '請輸入密碼';
      hasError = true;
    } else if (!/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,12}$/.test(password.value)) {
      passwordError.value = '密碼需為8-12字元，包含小寫英文和數字';
      hasError = true;
    }

    // 電子信箱驗證
    if (!email.value) {
      emailError.value = '請輸入電子信箱';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = '請輸入有效的電子信箱';
      hasError = true;
    }

    // 姓名驗證
    if (!fullname.value) {
      fullnameError.value = '請輸入姓名';
      hasError = true;
    }

    // 身分證字號驗證
    if (!idNumber.value) {
      idNumberError.value = '請輸入身分證字號';
      hasError = true;
    }

    // 電話驗證
    if (!phone.value) {
      phoneError.value = '請輸入聯絡電話';
      hasError = true;
    }

    // 生日驗證
    if (!birthDate.value) {
      birthDateError.value = '請選擇生日';
      hasError = true;
    }

    // 性別驗證
    if (!gender.value) {
      genderError.value = '請選擇性別';
      hasError = true;
    }

    // 同意條款驗證
    if (!agree.value) {
      agreeError.value = '請勾選同意條款';
      hasError = true;
    }

    return !hasError;
  }

  async function submitRegistration() {
    if (!validateForm()) return;

    try {
      const payload = {
        user_id: account.value,
        password: password.value,
        email: email.value,
        fullname: fullname.value,
        nickname: nickname.value || '',
        id_number: idNumber.value,
        phone_number: phone.value,
        birth_date: birthDate.value,
        gender: gender.value,
        address: `${registerStore.city}${registerStore.district}${registerStore.village}${registerStore.address}`,
      };

      const res = await fetch(`${VITE_API_BASE}/api/login/register_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 加入此行以支援 session
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.status === 'success') {
        router.push('/register-check');
      } else {
        if (data.message.includes('帳號已存在')) {
          accountError.value = '此帳號已被使用';
        } else if (data.message.includes('Email')) {
          emailError.value = '此信箱已被註冊';
        } else {
          generalError.value = data.message || '註冊失敗，請稍後再試';
        }
      }
    } catch (err) {
      console.error('註冊錯誤:', err);
      generalError.value = '系統錯誤，請稍後再試';
    }
  }
</script>

<template>
  <div class="login-container">
    <div class="form-card">
      <h3>家庭管理員註冊</h3>
      <div class="form-stepper">
        <div class="step-group">
          <div class="step-circle">1</div>
          <div class="step-label">填寫資料</div>
        </div>
        <div class="step-line"></div>
        <div class="step-group">
          <div class="step-circle active">2</div>
          <div class="step-label gray">確認送出</div>
        </div>
      </div>
      <form @submit.prevent="submitRegistration">
        <!-- 地址顯示 -->
        <div class="form-group">
          <label>地址</label>
          <input
            type="text"
            :value="`${registerStore.city}${registerStore.district}${registerStore.village}${registerStore.address}`"
            disabled
          />
        </div>

        <!-- 帳號和密碼 -->
        <div class="form-group row">
          <div>
            <label>帳號*</label>
            <input
              type="text"
              v-model="account"
              :class="{ 'input-error': accountError }"
              placeholder="請輸入帳號"
            />
            <div
              v-if="accountError"
              class="form-error"
            >
              {{ accountError }}
            </div>
          </div>
          <div>
            <label>
              密碼*
              <span class="tip">8~12字元，包含小寫英文和數字</span>
            </label>
            <input
              type="password"
              v-model="password"
              :class="{ 'input-error': passwordError }"
              placeholder="請輸入密碼"
            />
            <div
              v-if="passwordError"
              class="form-error"
            >
              {{ passwordError }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>電子信箱*</label>
          <input
            type="email"
            v-model="email"
            :class="{ 'input-error': emailError }"
            placeholder="請輸入信箱"
          />
          <div
            v-if="emailError"
            class="form-error"
          >
            {{ emailError }}
          </div>
        </div>
        <div class="form-group row">
          <div>
            <label>姓名*</label>
            <input
              type="text"
              v-model="fullname"
              :class="{ 'input-error': fullnameError }"
              placeholder="請輸入姓名"
            />
            <div
              v-if="fullnameError"
              class="form-error"
            >
              {{ fullnameError }}
            </div>
          </div>
          <div>
            <label>暱稱</label>
            <input
              type="text"
              v-model="nickname"
              placeholder="請輸入暱稱"
            />
          </div>
        </div>
        <div class="form-group row">
          <div>
            <label>身分證字號*</label>
            <input
              type="text"
              v-model="idNumber"
              :class="{ 'input-error': idNumberError }"
              placeholder="請輸入身分證字號"
            />
            <div
              v-if="idNumberError"
              class="form-error"
            >
              {{ idNumberError }}
            </div>
          </div>
          <div>
            <label>聯絡電話*</label>
            <input
              type="text"
              v-model="phone"
              :class="{ 'input-error': phoneError }"
              placeholder="請輸入聯絡電話"
            />
            <div
              v-if="phoneError"
              class="form-error"
            >
              {{ phoneError }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div>
            <label>生日*</label>
            <input
              type="date"
              v-model="birthDate"
              :class="{ 'input-error': birthDateError }"
            />
            <div
              v-if="birthDateError"
              class="form-error"
            >
              {{ birthDateError }}
            </div>
          </div>
          <div>
            <label class="gender-label">性別</label>
            <div class="gender-row">
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="男"
                  v-model="gender"
                />
                男
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="女"
                  v-model="gender"
                />
                女
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="不願透漏"
                  v-model="gender"
                />
                不願透漏
              </label>
            </div>
            <div
              v-if="genderError"
              class="form-error"
            >
              {{ genderError }}
            </div>
          </div>
        </div>
        <!-- 修改隱私權政策區塊 -->
        <div class="form-group">
          <label class="policy">
            <input
              type="checkbox"
              v-model="agree"
            />
            <span class="policy-text">本人同意提供個人資料作為管理使用</span>
          </label>
          <div
            v-if="agreeError"
            class="form-error"
          >
            {{ agreeError }}
          </div>
        </div>
        <!-- 一般錯誤訊息 -->
        <div
          v-if="generalError"
          class="form-error text-center"
        >
          {{ generalError }}
        </div>
        <!-- 送出按鈕 -->
        <div class="form-group row row-btns">
          <button
            type="button"
            class="btn--membercancel"
            @click="goToCancel"
          >
            取消
          </button>
          <button
            type="submit"
            class="btn--membersend"
          >
            送出
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  .login-container {
    @include flex-center;
    background-color: $primary-c000;
    padding: 225px 0 40px 0;
  }
  .form-card {
    padding: 0 16px;
    width: 100%;
    max-width: 525px;
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
      color: $neutral-c;
      margin-top: 0;
      &.gray {
        color: $black;
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
    &.row {
      display: flex;
      gap: 18px;
      > div {
        flex: 1;
      }
      .gender-row {
        display: flex;
        align-items: center;
        .radio-list {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
          label {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 0;
            letter-spacing: 0.08em;
            input[type='radio'] {
              margin-right: 2px;
            }
          }
        }
      }
    }
    &.row-btns {
      display: flex;
      justify-content: center;
      gap: 24px;
      button {
        max-width: 120px;
      }
    }
    .policy {
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 8px;
      color: $black;
      font-family: $font-sans;
      margin-top: 24px;

      input[type='checkbox'] {
        width: 18px;
        height: 18px;
        margin-right: 2px;
        accent-color: $primary-c700;
      }

      .policy-text {
        letter-spacing: 0.1em;
      }
    }

    // 修改錯誤訊息樣式
    .form-error {
      color: red;
      font-size: 13px;
      margin-top: 4px;
      text-align: left; // 預設靠左對齊
      width: 100%;
    }

    // 只有隱私權政策的錯誤訊息置中
    &:has(.policy) {
      .form-error {
        text-align: center;
      }
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
    &[disabled] {
      background: #f3f5f8;
      color: #8c8c8c;
      opacity: 1;
    }
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
  .tip {
    font-size: 12px;
    color: red;
    font-weight: 400;
    letter-spacing: 0;
    vertical-align: middle;
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
  .gender-row {
    display: flex;
    gap: 28px;
    label {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 0;
      letter-spacing: 0.1em;
      white-space: nowrap;
    }
    input[type='radio'] {
      margin-right: 6px;
      accent-color: $primary-c700;
    }
  }
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 4px;
  }
  .general-error-message {
    color: red;
    font-size: 16px;
    margin-top: 16px;
    text-align: center;
  }
  .input-error {
    border-color: red !important;
  }
</style>
