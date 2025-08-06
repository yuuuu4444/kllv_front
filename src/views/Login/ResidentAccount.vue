<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const gender = ref('');
  const agree = ref(false);
  function goToCancel() {
    router.push('/login');
  }
  function goToSubmit() {
    router.push('/resident-success');
  }
</script>

<template>
  <div class="login-container">
    <div class="form-card">
      <h3>里民帳號開通</h3>
      <form @submit.prevent>
        <div class="form-group">
          <label>地址</label>
          <input
            type="text"
            placeholder="請輸入地址"
          />
        </div>
        <div class="form-group">
          <label>電子信箱*</label>
          <input
            type="email"
            placeholder="請輸入信箱"
          />
        </div>
        <div class="form-group row">
          <div>
            <label>姓名*</label>
            <input
              type="text"
              placeholder="請輸入姓名"
            />
          </div>
          <div>
            <label>暱稱</label>
            <input
              type="text"
              placeholder="請輸入暱稱"
            />
          </div>
        </div>
        <div class="form-group row">
          <div>
            <label>身分證字號*</label>
            <input
              type="text"
              placeholder="請輸入身分證字號"
            />
          </div>
          <div>
            <label>聯絡電話*</label>
            <input
              type="text"
              placeholder="請輸入聯絡電話"
            />
          </div>
        </div>
        <div class="form-group row">
          <div>
            <label>生日*</label>
            <input type="date" />
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
            @click="goToSubmit"
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
