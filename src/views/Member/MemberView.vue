<template>
  <div class="memberPage">
    <div class="memberPage__Container">
      <div class="memberPage__breadcrumb">
        <p class="body--b2">首頁 - 帳戶管理</p>
      </div>
      <div class="memberContentLayout">
        <MemberSidebar
          class="memberContentLayout__sidebar"
          :avatar-url="userData.avatar"
          :menu-items="memberMenuItems"
          @logout="handleLogout"
        />
        <main class="memberContentLayout__content">
          <!-- 所有子路由 (MemberIndex, MemberProfile...) 都會被渲染到這裡 -->
          <router-view v-slot="{ Component }">
            <component
              :is="Component"
              :userData="userData"
              @update:avatar="handleAvatarUpdate"
            />
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import MemberSidebar from '@/components/MemberSidebar.vue';

  const router = useRouter();

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

  const userData = reactive({
    name: 'Komod·Mayaw',
    nickname: '谷木',
    address: '桃園市中壢區空瀧浪里快樂街1479號8樓-3',
    idNumber: 'H1212345678',
    birthDate: '1980-02-28',
    gender: 'male',
    email: 'test123@gmail.com',
    phone: '0988123456',
    avatar: new URL('@/assets/image/02.png', import.meta.url).href,
    // 預計從 API 獲取帳戶資料，這邊先串假的
  });

  const handleAvatarUpdate = (newAvatarUrl) => {
    console.log('父層收到新的頭像 URL:', newAvatarUrl);
    userData.avatar = newAvatarUrl;
  };

  // 在元件掛載時檢查設備類型
  onMounted(() => {
    // 如果是桌面版，且當前在根路徑 /member，就自動跳轉到 /member/profile
    if (window.innerWidth >= 768 && router.currentRoute.value.path === '/member') {
      router.replace('/member/profile');
    }
  });
</script>

<style lang="scss" scoped>
  .memberPage {
    background-color: $primary-c000;
    padding-top: 200px;

    .memberPage__Container {
      padding: 1.5625vw 18.75vw 6.25vw;

      .memberPage__breadcrumb {
        padding: 100px 0 50px 0;
        margin-bottom: 20px;
      }
    }
  }

  .memberContentLayout {
    display: flex;
    gap: 20px;

    &__content {
      flex-grow: 1;
      //右邊區塊的右邊padding由memberPage__Container給
      padding: 20px 0 20px 20px;
    }
  }

  @media screen and (max-width: 1199px) {
    .memberPage {
      .memberPage__Container {
        padding: 0 16px 6.25vw;
      }
    }
    .memberContentLayout {
      display: flex;
      gap: 0;
    }
  }

  @include mobile {
    .memberPage {
      padding-top: 300px; //之後改0
      .memberPage__Container {
        padding: 0;
        .memberPage__breadcrumb {
          display: none;
        }
      }
    }

    .memberContentLayout {
      &__sidebar {
        display: none;
      }
      &__content {
        padding: 0;
      }
    }
  }
</style>
