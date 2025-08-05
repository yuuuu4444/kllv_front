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
        <section class="reg-view__section"></section>

        <!-- 報名資訊填寫區 -->
        <section class="reg-view__section"></section>

        <!-- 活動報名注意事項 -->
        <section class="reg-view__section"></section>

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

  const router = useRouter();
  const route = useRoute();

  const allEvents = ref([{ id: 5, title: 'Emerald畫展', price: 0 }]);
  const event = computed(() => {
    const eventId = parseInt(route.params.id, 10);
    return allEvents.value.find((e) => e.id === eventId);
  });

  const isModalOpen = ref(false);
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
  const registeredList = ref([]);
  const addRegistered = () => {
    registeredList.value.push({ ...form });
    resetForm();
  };
  const removeRegistered = (index) => {
    registeredList.value.splice(index, 1);
  };
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
    form.name = selectedMember.name;
    form.idNumber = selectedMember.idNumber;
    form.birthDate = selectedMember.birthDate;
    form.phone = selectedMember.phone;
    isModalOpen.value = false;
  };

  const agreedToTerms = ref(false);

  const isReadyToProceed = computed(() => {
    return agreedToTerms.value && registeredList.value.length > 0;
  });

  const goToCompletionPage = () => {
    router.push('/events/complete/paid');
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
    }
    p {
      color: $black;
    }
  }
  .reg-view__breadcrumb-link {
    color: $primary-c700;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
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
