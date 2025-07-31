<template>
  <div class="reg-view">
    <!-- Banner (從 EventDetailView 借鑑) -->
    <div class="reg-view__banner">
      <div class="reg-view__banner-title-wrapper">
        <h1 class="bold">活動報名</h1>
      </div>
    </div>

    <div class="reg-view__container">
      <p class="body--b4 reg-view__breadcrumbs">首頁 - 里民服務 - 活動報名 - 第41屆空瀧馬拉松</p>

      <div class="reg-view__title-bar">
        <h3 class="bold">第41屆空瀧馬拉松</h3>
      </div>

      <!-- 報名清單區 -->
      <section class="reg-view__section">
        <div class="reg-view__section-title-bar">
          <h5 class="bold">報名清單</h5>
        </div>
        <div class="reg-view__list-table-wrapper">
          <table class="reg-view__list-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>身分證字號</th>
                <th>出生日期</th>
                <th>聯絡電話</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="registeredList.length === 0">
                <td
                  colspan="5"
                  class="reg-view__list-empty"
                >
                  尚未新增報名者
                </td>
              </tr>
              <tr
                v-for="(person, index) in registeredList"
                :key="index"
              >
                <td>{{ person.name }}</td>
                <td>{{ person.idNumber }}</td>
                <td>{{ person.birthDate }}</td>
                <td>{{ person.phone }}</td>
                <td>
                  <button
                    class="reg-view__delete-btn"
                    @click="removeRegistered(index)"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="reg-view__summary">
          <p>報名單價：500元</p>
          <p>報名人數：{{ registeredList.length }}人</p>
          <p>報名總費用：{{ totalCost }}元</p>
        </div>
      </section>

      <!-- 報名資訊填寫區 -->
      <section class="reg-view__section">
        <div class="reg-view__section-title-bar">
          <h5 class="bold">報名資訊填寫</h5>
          <button
            class="btn--member"
            @click="isModalOpen = true"
          >
            帶入成員資料
          </button>
        </div>
        <form
          class="reg-view__form"
          @submit.prevent="addRegistered"
        >
          <div class="reg-view__form-grid">
            <div class="reg-view__form-group">
              <label for="name">姓名</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="idNumber">身分證字號</label>
              <input
                type="text"
                id="idNumber"
                v-model="form.idNumber"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="birthDate">出生日期</label>
              <input
                type="text"
                id="birthDate"
                v-model="form.birthDate"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="phone">聯絡電話</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="address">住址</label>
              <input
                type="text"
                id="address"
                v-model="form.address"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="email">E-mail</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="emergencyContactName">緊急聯絡人姓名</label>
              <input
                type="text"
                id="emergencyContactName"
                v-model="form.emergencyContactName"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="emergencyContactPhone">緊急聯絡人電話</label>
              <input
                type="tel"
                id="emergencyContactPhone"
                v-model="form.emergencyContactPhone"
                required
              />
            </div>
            <div class="reg-view__form-group">
              <label for="emergencyContactRelation">與緊急聯絡人關係</label>
              <input
                type="text"
                id="emergencyContactRelation"
                v-model="form.emergencyContactRelation"
                required
              />
            </div>
          </div>
          <div class="reg-view__form-footer">
            <button
              type="submit"
              class="btn--process"
            >
              確認新增
            </button>
          </div>
        </form>
      </section>

      <!-- 付款方式 & 同意條款 -->
      <section class="reg-view__section">
        <div class="reg-view__payment">
          <h5 class="bold">選擇付款方式</h5>
          <div class="reg-view__payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="creditCard"
              />
              信用卡
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="transfer"
              />
              銀行轉帳
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
              />
              里長辦公室現金繳費
            </label>
          </div>
        </div>

        <div class="reg-view__terms">
          <h5 class="bold">活動注意事項</h5>
          <div class="reg-view__terms-content">
            <ol>
              <li>
                為維護您的報名權益及活動安全，報名時請務必詳實填寫個人資料，本活動將依您所填寫的個人資料作為投保之依據。
              </li>
              <li>
                報名者於報名成功後，即視為同意主辦單位將您的個人資料（包括姓名、身分證字號、出生年月日、聯絡方式等），於本活動目的範圍內蒐集處理及利用。
              </li>
              <li>請務必遵守活動現場工作人員的指示，並於活動時間內完成報名。</li>
            </ol>
          </div>
          <label class="reg-view__terms-agree">
            <input
              type="checkbox"
              v-model="agreedToTerms"
            />
            已詳細閱讀、瞭解並同意以上《活動報名注意事項》
          </label>
        </div>

        <div class="reg-view__final-submit">
          <button
            class="btn--process"
            :disabled="!agreedToTerms || registeredList.length === 0"
          >
            下一步
          </button>
        </div>
      </section>
    </div>

    <!-- 成員選擇彈窗 -->
    <MemberSelectModal
      v-if="isModalOpen"
      :members="memberList"
      @close="isModalOpen = false"
      @confirm="handleMemberConfirm"
    />
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue';
  import MemberSelectModal from './MemberSelectModal.vue';

  // --- 彈窗控制 ---
  const isModalOpen = ref(false);

  // --- 表單資料 ---
  const initialFormState = {
    name: '',
    idNumber: '',
    birthDate: '',
    phone: '',
    address: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
  };
  const form = reactive({ ...initialFormState });

  const resetForm = () => {
    Object.assign(form, initialFormState);
  };

  // --- 報名清單 ---
  const registeredList = ref([]);
  const totalCost = computed(() => registeredList.value.length * 500);

  const addRegistered = () => {
    // 這裡可以加上表單驗證邏輯
    registeredList.value.push({ ...form });
    resetForm(); // 新增後清空表單
  };

  const removeRegistered = (index) => {
    registeredList.value.splice(index, 1);
  };

  // --- 彈窗與資料帶入 ---
  const memberList = ref([
    {
      id: 1,
      name: 'Komod-Mayaw',
      idNumber: 'F123498765',
      birthDate: '80/7/29',
      phone: '0988123456',
    },
    {
      id: 2,
      name: 'Foday-Afo',
      idNumber: 'A011115678',
      birthDate: '54/10/03',
      phone: '0988123459',
    },
    { id: 3, name: '馬俊華', idNumber: 'F987651234', birthDate: '84/01/06', phone: '0988456789' },
  ]);

  const handleMemberConfirm = (selectedMember) => {
    // 將選擇的成員資料填入表單
    form.name = selectedMember.name;
    form.idNumber = selectedMember.idNumber;
    form.birthDate = selectedMember.birthDate;
    form.phone = selectedMember.phone;
    isModalOpen.value = false; // 關閉彈窗
  };

  // --- 同意條款 ---
  const agreedToTerms = ref(false);
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .reg-view {
    background-color: $primary-c25;
    padding-bottom: 80px;

    &__banner {
      // ...樣式同 EventDetailView
      width: 100%;
      height: 435px;
      background-image: url('https://picsum.photos/seed/reg-banner/1920/435');
      background-size: cover;
      background-position: center;
    }
    &__banner-title-wrapper {
      // ...樣式同 EventDetailView
    }

    &__container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 20px;
    }

    &__breadcrumbs {
      // ...樣式同 EventDetailView
      color: $neutral-c;
      margin: 20px 0;
    }

    &__title-bar {
      // ...樣式同 EventDetailView
      background-color: $primary-c700;
      padding: 20px 30px;
      h3 {
        color: $white;
        margin: 0;
      }
    }

    // 共用的區塊樣式
    &__section {
      margin-top: 40px;
    }

    &__section-title-bar {
      @include flex-space-between;
      background-color: $primary-c700;
      padding: 15px 25px;
      border-radius: $border-r-sm $border-r-sm 0 0;
      h5 {
        color: $white;
        margin: 0;
      }
    }

    // 報名清單表格
    &__list-table-wrapper {
      overflow-x: auto; // 讓表格在手機上可以滑動
    }
    &__list-table {
      width: 100%;
      background-color: $white;
      border-collapse: collapse;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid $primary-c50;
      }
      thead tr {
        background-color: $primary-c500;
        color: $white;
      }
    }
    &__list-empty {
      text-align: center !important;
      color: $neutral-c;
      padding: 40px 0 !important;
    }
    &__delete-btn {
      background-color: $highlight-c;
      color: $white;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
    }

    // 總費用
    &__summary {
      background-color: $white;
      padding: 15px 25px;
      text-align: right;
      border-radius: 0 0 $border-r-sm $border-r-sm;
    }

    // 報名表單
    &__form {
      background-color: $white;
      padding: 30px;
      border-radius: 0 0 $border-r-sm $border-r-sm;
    }
    &__form-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
      @include mobile {
        grid-template-columns: 1fr; // 手機變單欄
      }
    }
    &__form-group {
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 8px;
      }
      input {
        padding: 10px;
        border: 1px solid $neutral-c;
        border-radius: $border-r-xs;
      }
    }
    &__form-footer {
      margin-top: 30px;
      @include flex-center;
    }

    // 付款方式
    &__payment {
      background-color: $white;
      padding: 30px;
      border-radius: $border-r-sm;
      &-options {
        margin-top: 20px;
        display: flex;
        gap: 30px;
        @include mobile {
          flex-direction: column; // 手機變垂直排列
          gap: 15px;
        }
      }
    }

    // 注意事項
    &__terms {
      background-color: $white;
      margin-top: 40px;
      padding: 30px;
      border-radius: $border-r-sm;
      &-content {
        border: 1px solid $neutral-c;
        padding: 20px;
        margin-top: 20px;
        max-height: 200px;
        overflow-y: auto;
        ol {
          padding-left: 20px;
        }
        li {
          margin-bottom: 1em;
        }
      }
      &-agree {
        display: block;
        margin-top: 20px;
        text-align: center;
      }
    }

    // 最終送出按鈕
    &__final-submit {
      margin-top: 40px;
      @include flex-center;
      .btn--process:disabled {
        background-color: $neutral-c;
        cursor: not-allowed;
      }
    }
  }
</style>
