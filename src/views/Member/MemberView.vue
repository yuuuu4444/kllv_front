<!-- src/views/Member/MemberView.vue -->
<template>
  <div class="memberPage">
    <div class="memberPage__breadcrumb">
      <p class="body--b2">首頁 - 帳戶管理</p>
    </div>

    <!-- mobileMenu -->
    <div
      v-if="isMobile && isMemberRoot"
      class="mobileMenu"
    >
      <h3 class="mobileMenu__title">帳戶管理</h3>
      <div class="mobileMenu__avatarContainer">
        <img
          :src="userData.avatar"
          alt="使用者頭像"
          class="mobileMenu__avatar"
        />
        <button class="mobileMenu__editButton">✏️</button>
      </div>

      <ul class="mobileMenu__list">
        <li
          v-for="item in memberMenuItems"
          :key="item.name"
          class="mobileMenu__listItem"
        >
          <router-link
            :to="item.path"
            class="mobileMenu__link btn--member"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>

      <button
        class="mobileMenu__logoutButton btn--membercancel"
        @click="handleLogout"
      >
        登出
      </button>
    </div>

    <!-- desktopLayout -->
    <div
      v-else
      class="desktopLayout"
    >
      <MemberSidebar
        class="desktopLayout__sidebar"
        :avatar-url="userData.avatar"
        :menu-items="memberMenuItems"
        @logout="handleLogout"
      />
      <main class="desktopLayout__content">
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            :userData="userData"
          />
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';
  import MemberSidebar from '@/components/MemberSidebar.vue';

  const route = useRoute(); // 獲取當前路由的詳細資訊
  const isMemberRoot = computed(() => route.path === '/member');

  const screenWidth = ref(window.innerWidth);
  const isMobile = computed(() => screenWidth.value < 768);
  const handleResize = () => {
    screenWidth.value = window.innerWidth;
  };

  // 在元件掛載時開始監聽，在卸載時移除監聽，避免記憶體洩漏
  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  const userData = reactive({
    name: 'Komod·Mayaw',
    avatar: new URL('@/assets/image/01.png', import.meta.url).href,
  });

  const memberMenuItems = ref([
    { name: '個人資料', path: '/member/profile' },
    { name: '家庭成員', path: '/member/family' },
    { name: '活動報名', path: '/member/events' },
    { name: '維修通報', path: '/member/repairs' },
    { name: '討論區足跡', path: '/member/posts' },
    { name: '重設密碼', path: '/member/password' },
  ]);

  const handleLogout = () => {
    alert('帳號已登出');
  };
</script>

<style lang="scss" scoped>
  .memberPage {
    // background-color: $primary-c000;
    background-color: $primary-c50;
    padding: 20px 8%;
    min-height: 80vh;
    margin-top: 200px;

    &__breadcrumb {
      margin-bottom: 20px;
    }
  }

  .desktopLayout {
    display: flex;
    gap: 20px;

    &__content {
      flex-grow: 1;
      // background-color: $white;
      // border-radius: $border-r-md;
      padding: 30px 40px;
      // box-shadow: 0 4px 12px rgba($black, 0.05);
    }
  }

  .mobileMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background-color: $white;
    padding: 20px;
    border-radius: $border-r-md;
    box-shadow: 0 4px 12px rgba($black, 0.05);

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

    &__editButton {
      position: absolute;
      top: 0;
      right: 0;
      background: $white;
      border: 1px solid $neutral-c;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 20px;
      color: $primary-c700;
      @include flex-center;
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

  // --- RWD 切換 ---
  @include mobile {
    .desktopLayout__sidebar {
      display: none;
    }
  }
</style>
