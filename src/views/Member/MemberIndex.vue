<template>
  <div class="memeberMobileMenu">
    <h3 class="memeberMobileMenu__title">帳戶管理</h3>
    <div class="memeberMobileMenu__avatarContainer">
      <img
        :src="userData.avatar"
        alt="使用者頭像"
        class="memeberMobileMenu__avatar"
      />
    </div>
    <ul class="memeberMobileMenu__list">
      <li
        v-for="item in memberMenuItems"
        :key="item.name"
        class="memeberMobileMenu__listItem"
      >
        <router-link
          :to="item.path"
          class="memeberMobileMenu__link btn--member"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <button
      class="memeberMobileMenu__logoutButton btn--membercancel"
      @click="handleLogout"
    >
      登出
    </button>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';

  // 這些資料未來應從 Pinia store 獲取，以確保所有頁面同步
  const memberMenuItems = ref([
    { name: '個人資料', path: '/member/profile' },
    { name: '家庭成員', path: '/member/family' },
    { name: '活動報名', path: '/member/events' },
    { name: '維修通報', path: '/member/repairs' },
    { name: '討論區足跡', path: '/member/posts' },
    { name: '重設密碼', path: '/member/password' },
  ]);

  const userData = reactive({
    avatar: new URL('@/assets/image/02.png', import.meta.url).href,
  });

  const handleLogout = () => {
    alert('帳號已登出');
  };
</script>

<style lang="scss" scoped>
  .memeberMobileMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background-color: $white;
    padding: 20px;
    // border-radius: $border-r-md;
    // box-shadow: 0 4px 12px rgba($black, 0.05);

    &__avatarContainer {
      position: relative;
      margin: 20px 0;
    }

    &__avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    &__list {
      width: 100%;
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    &__link {
      width: 100%;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;

      &.router-link-exact-active {
        background-color: $primary-c700;
        color: $white;
        font-weight: 700;
      }
    }

    &__logoutButton {
      width: 100%;
    }
  }

  // 只在手機上顯示
  @include desktop {
    .memeberMobileMenu {
      display: none;
    }
  }
</style>
