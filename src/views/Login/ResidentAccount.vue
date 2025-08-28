<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const { VITE_API_BASE } = import.meta.env;

  // 表單欄位
  const email = ref('');
  const fullname = ref('');
  const nickname = ref('');
  const idNumber = ref('');
  const birthDate = ref('');
  const gender = ref('');
  const agree = ref(false);

  // 錯誤訊息
  const emailError = ref('');
  const fullnameError = ref('');
  const nicknameError = ref('');
  const idNumberError = ref('');
  const birthDateError = ref('');
  const genderError = ref('');
  const agreeError = ref('');
  const generalError = ref('');

  // 預填 email/fullname
  onMounted(async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) return;
    const res = await fetch(`${VITE_API_BASE}/api/login/resident_get.php?user_id=${user_id}`);
    const data = await res.json();
    if (data.status === 'success') {
      email.value = data.data.email || '';
      fullname.value = data.data.fullname || '';
      // 其他欄位也可預填
    }
  });

  // 驗證函數
  function validateForm() {
    let hasError = false;
    emailError.value = '';
    fullnameError.value = '';
    nicknameError.value = '';
    idNumberError.value = '';
    birthDateError.value = '';
    genderError.value = '';
    agreeError.value = '';
    generalError.value = '';

    if (!email.value) {
      emailError.value = '請輸入信箱';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = '請輸入有效的電子信箱';
      hasError = true;
    }
    if (!fullname.value) {
      fullnameError.value = '請輸入姓名';
      hasError = true;
    }
    if (!idNumber.value) {
      idNumberError.value = '請輸入身分證字號';
      hasError = true;
    }
    if (!birthDate.value) {
      birthDateError.value = '請選擇生日';
      hasError = true;
    }
    if (!gender.value) {
      genderError.value = '請選擇性別';
      hasError = true;
    }
    if (!agree.value) {
      agreeError.value = '請勾選同意隱私權政策';
      hasError = true;
    }
    return !hasError;
  }

  function goToCancel() {
    router.push('/login');
  }

  async function goToSubmit() {
    if (!validateForm()) return;
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      generalError.value = '找不到 user_id，請重新登入';
      return;
    }
    const payload = {
      user_id,
      email: email.value,
      fullname: fullname.value,
      nickname: nickname.value,
      id_number: idNumber.value,
      birth_date: birthDate.value,
      gender: gender.value,
    };
    try {
      const res = await fetch(`${VITE_API_BASE}/api/login/resident_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === 'success') {
        router.push('/resident-success');
      } else {
        generalError.value = data.message || '送出失敗';
      }
    } catch (err) {
      generalError.value = '網路錯誤，請稍後再試';
    }
  }
</script>

<template>
  <div class="login-container">
    <div class="form-card">
      <h3>里民帳號開通</h3>
      <form @submit.prevent="goToSubmit">
        <div class="form-group">
          <label>電子信箱</label>
          <input
            type="email"
            v-model="email"
            :class="{ 'input-error': emailError }"
            placeholder="請輸入信箱"
            disabled
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
            <label>姓名</label>
            <input
              type="text"
              v-model="fullname"
              :class="{ 'input-error': fullnameError }"
              placeholder="請輸入姓名"
              disabled
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
            <label class="gender-label">性別*</label>
            <div class="gender-row">
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="M"
                  v-model="gender"
                />
                男
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="F"
                  v-model="gender"
                />
                女
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="N"
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
        <div class="form-group">
          <label class="policy">
            <input
              type="checkbox"
              v-model="agree"
            />
            本人已詳閱並同意隱私權保護政策
          </label>
          <div
            v-if="agreeError"
            class="form-error"
          >
            {{ agreeError }}
          </div>
        </div>
        <div
          v-if="generalError"
          class="form-error text-center"
        >
          {{ generalError }}
        </div>
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
      justify-content: center;
      width: 100%;
      align-items: center;
      gap: 8px;
      color: $black;
      font-family: $font-sans;
      margin-top: 50px;
      input[type='checkbox'] {
        width: 18px;
        height: 18px;
        margin-right: 2px;
        accent-color: $primary-c700;
      }
    }

    // 錯誤訊息樣式
    .form-error {
      color: red;
      font-size: 13px;
      margin-top: 4px;
      text-align: left;
      width: 100%;
    }
    // 只有隱私權政策的錯誤訊息置中
    &:has(.policy) {
      .form-error {
        text-align: center;
      }
    }
    .form-error.text-center {
      text-align: center;
      font-size: 15px;
      margin-top: 12px;
      background: #fff6f6;
      border: 1px solid #ffd6d6;
      border-radius: 4px;
      padding: 8px 12px;
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
  .input-error {
    border: 1.5px solid #d32f2f !important;
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
      gap: 8px;
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
