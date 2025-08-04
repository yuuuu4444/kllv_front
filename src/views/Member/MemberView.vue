<template>
  <div class="memberPage">
    <div class="memberPage__Container">
      <div class="memberPage__breadcrumb">
        <p class="body--b2">首頁 - 帳戶管理</p>
      </div>
      <div class="memberContentLayout">
        <MemberSidebar
          class="memberContentLayout__sidebar"
          :avatar-url="userData.profile_image"
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

  // --- 關鍵修改：與資料庫 users 表格完全對應 ---
  const userData = reactive({
    // --- 對應資料庫欄位 ---
    id: 'user_account_001', // 使用者帳號 (PK), varchar(50)
    password: '', // 使用者密碼 (加密後), 前端通常不處理此欄位
    profile_image: new URL('@/assets/image/02.png', import.meta.url).href, // 使用者個資圖片 (圖片路徑), varchar(255)
    email: 'test123@gmail.com', // 使用者 email, varchar(100)
    full_name: 'Komod·Mayaw', // 使用者姓名, varchar(50)
    nickname: '谷木', // 暱稱, varchar(50)
    phone: '0988123456', // 使用者聯絡電話, varchar(20)
    id_number: 'H1212345678', // 使用者身分證, varchar(20)
    birth_date: '1980-02-28', // 使用者生日, DATE
    gender: 'M', // 使用者性別, char(1), "M", "F", "N"
    household_code: 101, // 戶籍編碼 (FK), int
    role_type: 1, // 帳號級別 (主/子帳號), tinyint (1="主", 2="子")
    is_active: true, // 是否啟用, boolean
    is_cancel: false, // 是否刪除, boolean
    created_time: '2025-01-01T10:00:00', // 建立時間, DATETIME

    address: '桃園市中壢區空瀧浪里快樂街1479號8樓-3',
  });

  const handleAvatarUpdate = (newAvatarUrl) => {
    console.log('父層收到新的頭像 URL:', newAvatarUrl);
    // 對應到資料庫欄位名稱
    userData.profile_image = newAvatarUrl;
  };

  // 在元件掛載時檢查設備類型
  onMounted(() => {
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
      padding-top: 75px;
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
