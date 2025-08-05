<template>
  <div class="reg-view">
    <SubBanner title="活動報名" />

    <div class="reg-view__container">
      <nav class="reg-view__breadcrumbs">
        <RouterLink
          to="/"
          class="reg-view__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">/里民服務</p>
        <RouterLink
          to="/events"
          class="reg-view__breadcrumb-link"
        >
          /活動報名
        </RouterLink>
        <p class="body--b2">/{{ event?.title || '活動' }}</p>
      </nav>

      <div class="reg-view__card">
        <div class="reg-view__main-title-bar">
          <h3 class="bold">{{ event?.title || '活動報名' }}</h3>
        </div>

        <!-- 報名清單區 -->
        <section class="reg-view__section">
          <div class="reg-view__section-title">
            <span class="reg-view__title-icon"></span>
            <h5 class="bold">報名清單</h5>
          </div>
          <div class="reg-view__table-wrapper">
            <table class="reg-view__table">
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
                    class="reg-view__table-empty"
                  >
                    尚未新增報名者
                  </td>
                </tr>
                <tr
                  v-for="(person, index) in registeredList"
                  :key="index"
                >
                  <td>{{ person.full_name }}</td>
                  <td>{{ person.id_number }}</td>
                  <td>{{ person.birth_date }}</td>
                  <td>{{ person.phone }}</td>
                  <td>
                    <button
                      @click="removeRegistered(index)"
                      class="reg-view__delete-btn"
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
          </div>
          <div class="reg-view__summary">
            <p>報名單價：{{ event?.fee_per_person || 0 }}元</p>
            <p>報名人數：{{ registeredList.length }}人</p>
            <p>報名總費用：{{ totalCost }}元</p>
          </div>
        </section>

        <section class="reg-view__section">
          <div class="reg-view__section-title">
            <span class="reg-view__title-icon"></span>
            <h5 class="bold">報名資訊填寫</h5>
          </div>
          <p class="body--b4 reg-view__form-subtitle">快速選單</p>
          <button
            class="btn--membersend reg-view__member-btn"
            @click="isModalOpen = true"
          >
            帶入會員或成員
          </button>

          <form
            class="reg-view__form"
            @submit.prevent="addRegistered"
          >
            <div class="reg-view__form-field">
              <label for="name">姓名</label>
              <input
                type="text"
                id="name"
                v-model="form.full_name"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="idNumber">身分證字號</label>
              <input
                type="text"
                id="idNumber"
                v-model="form.id_number"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="birthDate">出生日期</label>
              <input
                type="text"
                id="birthDate"
                v-model="form.birth_date"
                placeholder="例：80/07/29"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="phone">聯絡電話</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="address">住址</label>
              <input
                type="text"
                id="address"
                v-model="form.address"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="email">E-mail</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="emergencyContactName">緊急聯絡人姓名</label>
              <input
                type="text"
                id="emergencyContactName"
                v-model="form.emergency_name"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="emergencyContactPhone">緊急聯絡人電話</label>
              <input
                type="tel"
                id="emergencyContactPhone"
                v-model="form.emergency_phone"
                required
              />
            </div>
            <div class="reg-view__form-field">
              <label for="emergencyContactRelation">與緊急聯絡人關係</label>
              <input
                type="text"
                id="emergencyContactRelation"
                v-model="form.emergency_relation"
                required
              />
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

        <section class="reg-view__section">
          <div class="reg-view__section-title">
            <span class="reg-view__title-icon"></span>
            <h5 class="bold">選擇付款方式</h5>
          </div>
          <div class="reg-view__payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="creditCard"
                v-model="paymentMethod"
              />
              信用卡
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="transfer"
                v-model="paymentMethod"
              />
              銀行轉帳
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
                v-model="paymentMethod"
              />
              里長辦公室現金繳費
            </label>
          </div>
        </section>

        <section class="reg-view__section">
          <div class="reg-view__privacy">
            <div class="reg-view__privacy-title">
              <p class="body--b2">活動報名注意事項</p>
            </div>
            <div class="reg-view__privacy-content">
              <ol>
                <li>
                  承辦單位為辦理活動及保險事宜，將依個人資料保護法等相關法令規定，在本活動目的範圍內蒐集您與他人的姓名、身分證字號、生日、住址、性別、電話、電子郵件、緊急聯絡人電話...前述個人資料，會在活動的範圍及期間內處理或利用。
                </li>
                <li>
                  參加者需遵守活動現場的安全指引，並自行負責參與活動過程中的安全。承辦單位對於非活動規範下發生的事故不承擔責任。
                </li>
                <li>
                  若因故無法參加，請於活動前三天取消報名並自行至里辦公處提出退款申請。活動當日取消恕不退款。報名者若透過各種繳款工具需負擔之手續費用應自行吸收，不包含在收費金額之內。
                </li>
                <li>
                  主辦方保留更改活動內容、時間或地點的權利，並會提前通知報名者，詳情請關注官方消息及內容。
                </li>
              </ol>
            </div>
          </div>
          <label class="reg-view__terms-agree">
            <input
              type="checkbox"
              v-model="agreedToTerms"
            />
            已詳細閱讀、瞭解並同意以上《活動報名注意事項》
          </label>
        </section>

        <div class="reg-view__final-submit">
          <button
            class="btn--process"
            :disabled="!isReadyToProceed"
            @click="goToCompletionPage"
          >
            下一步
          </button>
        </div>
      </div>
    </div>

    <EventMemberModal
      v-if="isModalOpen"
      :members="memberList"
      @close="isModalOpen = false"
      @confirm="handleMemberConfirm"
    />
  </div>
</template>

<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { ref, reactive, computed } from 'vue';
  import { useRoute, RouterLink, useRouter } from 'vue-router';
  import EventMemberModal from '@/components/EventMemberModal.vue';
  import eventsData from '@/assets/data/Events/events.json';

  const router = useRouter();
  const route = useRoute();

  const allEvents = eventsData;
  const event = computed(() => {
    const eventId = parseInt(route.params.id, 10);
    return allEvents.find((e) => e.event_no === eventId);
  });

  const isModalOpen = ref(false);

  const initialFormState = {
    full_name: '',
    id_number: '',
    birth_date: '',
    phone: '',
    address: '',
    email: '',
    emergency_name: '',
    emergency_phone: '',
    emergency_relation: '',
  };
  const form = reactive({ ...initialFormState });
  const resetForm = () => {
    Object.assign(form, initialFormState);
  };

  const registeredList = ref([]);
  const totalCost = computed(
    () => (event.value?.fee_per_person || 0) * registeredList.value.length,
  );
  const addRegistered = () => {
    registeredList.value.push({ ...form });
    resetForm();
  };
  const removeRegistered = (index) => {
    registeredList.value.splice(index, 1);
  };

  const memberList = ref([
    {
      user_account: 'KomodMayaw',
      full_name: 'Komod-Mayaw',
      id_number: 'F123498765',
      birth_date: '80/7/29',
      phone: '0988123456',
    },
    {
      user_account: 'FodayAfo',
      full_name: 'Foday-Afo',
      id_number: 'A011115678',
      birth_date: '54/10/03',
      phone: '0988123459',
    },
    {
      user_account: 'MaJunHua',
      full_name: '馬俊華',
      id_number: 'F987651234',
      birth_date: '84/01/06',
      phone: '0988456789',
    },
  ]);

  const handleMemberConfirm = (selectedMember) => {
    form.full_name = selectedMember.full_name;
    form.id_number = selectedMember.id_number;
    form.birth_date = selectedMember.birth_date;
    form.phone = selectedMember.phone;
    isModalOpen.value = false;
  };

  const paymentMethod = ref('');
  const agreedToTerms = ref(false);
  const isReadyToProceed = computed(() => {
    return agreedToTerms.value && registeredList.value.length > 0 && paymentMethod.value !== '';
  });
  const goToCompletionPage = () => {
    if (paymentMethod.value === 'creditCard') {
      router.push('/events/complete/paid');
    } else {
      router.push('/events/complete/unpaid');
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .reg-view {
    background-color: white;
    padding-bottom: 30px;
    background-image:
      url(/src/assets/image/background_image.png), url(/src/assets/image/background_color.svg);
    background-repeat: repeat, no-repeat;
    background-position: bottom;
  }

  .reg-view__container {
    padding: 1.5625vw 18.75vw 6.25vw;
    @include mobile {
      padding: 1.5625vw 2.5vw 6.25vw;
    }
  }

  .reg-view__breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 50px;
    & > * {
      @extend .body--b2;
      font-size: 20px;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.2em;
    }
    p {
      color: $black;
    }
  }
  .reg-view__breadcrumb-link {
    color: $primary-c700;
    text-decoration: none;
    &:hover {
      // text-decoration: underline;
    }
  }

  .reg-view__card {
    border: 1px solid $black;
    padding: 20px 40px;
    background-color: $white;
  }

  .reg-view__main-title-bar {
    background-color: $primary-c700;
    padding: 20px 30px;
    margin: -20px -40px 20px -40px;
    h3 {
      color: $white;
      margin: 0;
    }
  }

  .reg-view__section {
    margin-bottom: 40px;
  }
  .reg-view__section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .reg-view__title-icon {
    width: 15px;
    height: 28px;
    background-color: $primary-c700;
  }

  .reg-view__table-wrapper {
    overflow-x: auto;
  }
  .reg-view__table {
    width: 100%;
    border: 1px solid $neutral-c;
    border-radius: $border-r-md;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    thead {
      background-color: $primary-c700;
      th {
        color: $white;
        border-right: 1px solid $neutral-c;
        font-size: 20px;
        padding: 14px 5px;
        text-align: center;
      }
      th:last-child {
        border-right: none;
      }
    }
    tbody {
      tr:nth-child(2n) {
        background-color: rgba(0, 75, 128, 0.1);
      }
      td {
        border-right: 1px solid $neutral-c;
        border-bottom: 1px solid $neutral-c;
        text-align: center;
        padding: 15px 5px;
        vertical-align: middle;
      }
      tr:last-child td {
        border-bottom: none;
      }
      td:last-child {
        border-right: none;
      }
    }
  }
  .reg-view__table-empty {
    color: $neutral-c;
    padding: 40px 0 !important;
  }

  .reg-view__delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    svg {
      width: 24px;
      height: 24px;
      fill: $neutral-c;
      transition: fill 0.2s ease;

      &:hover {
        fill: $semantic-r;
      }
    }
  }

  .reg-view__summary {
    padding: 15px 0;
    text-align: right;
    p {
      display: inline-block;
      margin-left: 20px;
    }
  }

  .reg-view__form-subtitle {
    margin-bottom: 10px;
  }
  .reg-view__member-btn {
    width: auto;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 20px;
  }
  .reg-view__form {
    border: 1px solid $neutral-c;
    border-radius: $border-r-sm;
    padding: 30px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .reg-view__form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 16px;
      letter-spacing: 0.2em;
    }
    input {
      height: 30px;
      padding: 0 10px;
      border-radius: $border-r-xs;
      border: 1px solid $neutral-c;
    }
  }
  .reg-view__form-footer {
    margin-top: 10px;
    @include flex-center;
  }

  .reg-view__payment-options {
    display: flex;
    gap: 30px;
    margin-left: 25px;
  }

  .reg-view__privacy {
    border: 1px solid $black;
    border-radius: $border-r-xs;
    overflow: hidden;
    background-color: $primary-c50;
  }
  .reg-view__privacy-title {
    border-bottom: 1px solid $black;
    padding: 5px 10px;
  }
  .reg-view__privacy-content {
    background-color: $white;
    padding: 20px;
    ol {
      list-style-type: decimal;
      list-style-position: inside;
      padding-left: 0;
    }
    li:not(:last-child) {
      margin-bottom: 1em;
    }
  }
  .reg-view__terms-agree {
    display: block;
    margin-top: 20px;
    text-align: center;
  }

  .reg-view__final-submit {
    @include flex-center;
    margin-top: 40px;
    .btn--process:disabled {
      background-color: $neutral-c;
      cursor: not-allowed;
    }
  }
</style>
