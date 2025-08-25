<script setup>
  import { ref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  // defineProps({
  //   userData: {
  //     type: Object,
  //     required: true,
  //   },
  // });

  const router = useRouter();
  const auth = useAuthStore();

  const allMenuItems = ref([
    { name: '個人資料', path: '/member/profile' },
    { name: '家庭成員', path: '/member/family' },
    { name: '活動報名', path: '/member/events' },
    { name: '維修通報', path: '/member/repairs' },
    { name: '討論區足跡', path: '/member/posts' },
    { name: '重設密碼', path: '/member/password' },
  ]);

  // 因應check_session.php回傳的資料包了一層'user'
  // 判斷真正的 user 物件
  const currentUser = computed(() => {
    // 情況 1: 資料來自 check_session.php 的嵌套結構
    if (auth.user && auth.user.user) {
      return auth.user.user;
    }
    // 情況 2: 資料來自自己 API (profile_update) 的扁平結構
    // 透過檢查是否存在一個明確的 key (例如 user_id) 來判斷
    if (auth.user && auth.user.user_id) {
      return auth.user;
    }
    // 情況 3: 尚未載入或已登出
    return null;
  });

  const filteredMenuItems = computed(() => {
    if (!currentUser.value) {
      // 提供一個安全的預設值
      return [{ name: '個人資料', path: '/member/profile' }];
    }
    if (currentUser.value.role_type != 0) {
      return allMenuItems.value.filter((item) => item.name !== '家庭成員');
    }
    return allMenuItems.value;
  });

  const userData = computed(() => currentUser.value || { profile_image: '' });

  const handleLogout = async () => {
    await auth.logout();
    router.push('/login');
    alert('已成功登出!');
  };
</script>

<template>
  <div class="memeberMobileMenu">
    <h3 class="memeberMobileMenu__title">帳戶管理</h3>
    <div class="memeberMobileMenu__avatarContainer">
      <img
        :src="auth.avatarUrl"
        class="memeberMobileMenu__avatar"
      />
    </div>
    <ul class="memeberMobileMenu__list">
      <li
        v-for="item in filteredMenuItems"
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

<style lang="scss" scoped>
  .memeberMobileMenu {
    display: none;
  }

  // 只在手機上顯示
  @include mobile {
    .memeberMobileMenu {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      // background-color: $white;
      padding: 48px 16px;
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
        background-color: rgba(0, 75, 128, 0.1);

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
  }
</style>
