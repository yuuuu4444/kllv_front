<template>
  <div class="memberPage">
    <div class="memberPage__Container">
      <nav class="memberPage__breadcrumb">
        <RouterLink
          to="/"
          class="memberPage__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">&#47;帳戶管理</p>
      </nav>

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
              :userEvents="userEvents"
              @update:avatar="handleAvatarUpdate"
              @cancel-event="handleEventCancellation"
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

  // 使用者的個人資料，欄位名稱對應資料庫 users 表格
  const userData = reactive({
    user_id: 'user_account_001', // 使用者帳號 (PK)
    password: '', // 使用者密碼 (加密後)
    profile_image: new URL('@/assets/image/02.png', import.meta.url).href, // 使用者個資圖片 (圖片路徑)
    email: 'test123@gmail.com', // 使用者 email
    fullname: 'Komod·Mayaw', // 使用者姓名
    nickname: '谷木', // 暱稱
    phone_number: '0988123456', // 使用者聯絡電話
    id_number: 'H1212345678', // 使用者身分證
    birth_date: '1980-02-28', // 使用者生日
    gender: 'M', // 使用者性別 ("M", "F", "N")
    household: 101, // 戶籍編碼 (FK)
    role_type: 0, // 帳號級別 (主/子帳號)
    is_active: true, // 是否啟用
    is_cancelled: false, // 是否刪除
    created_at: '2025-01-01T10:00:00', // 建立時間
    address: '桃園市中壢區空瀧浪里快樂街1479號8樓-3', // 前端需要的額外欄位
  });
  // 使用者已報名的活動列表，結構對應 activity_orders 和 activity_participants 表格
  const userEvents = ref([
    // 每一筆資料都模擬一筆 activity_orders 訂單紀錄
    {
      order_no: 101, // 訂單編號
      activity_no: 'act001', // 對應的活動編號
      activity_name: '第39屆空瀧馬拉松', // 這是為了方便前端顯示，額外“組合”的欄位
      activity_date: '2025-07-20', // 活動日期，同樣是為了方便前端篩選
      activity_time: '06:00~11:00', // 活動時間
      activity_location: '桃園市中壢區復興路46號9樓', // 活動地點
      user_account: 'user_account_001', // 報名者 ID (主帳號)
      attendance: 1, // 報名人數
      total_amount: 1500, // 總金額
      payment_method_no: 1, // 付款方式編號 (例如 1 代表信用卡)
      status: 3, // 狀態 (0:未完成, 1:完成中, 2:已完成, 3:已取消)
      reason_no: 2, // 取消原因編號
      registered_at: '2025-07-01T10:00:00', // 報名時間
      // 參加人列表，模擬來自 activity_participants 表的資料
      participants: [
        {
          participant_no: 201,
          order_no: 101,
          user_account: 'user_account_001',
          full_name: 'Komod·Mayaw',
          email: 'a1234567@gmail.com',
          phone: '0988123456',
        },
      ],
    },
    {
      order_no: 102,
      activity_no: 'act002',
      activity_name: '第40屆空瀧馬拉松',
      activity_date: '2025-08-02', // 假設今天是 2025-08-01, 這是 3 天內
      activity_time: '06:00~11:00',
      activity_location: '桃園市中壢區復興路46號9樓',
      user_account: 'user_account_001',
      attendance: 2,
      total_amount: 3000,
      payment_method_no: 1,
      status: 2, // 狀態: 已完成 (代表已報名成功)
      reason_no: null,
      registered_at: '2025-07-15T14:30:00',
      participants: [
        {
          participant_no: 202,
          order_no: 102,
          user_account: 'user_account_001',
          full_name: 'Komod·Mayaw',
          email: 'a1234567@gmail.com',
          phone: '0988123456',
        },
        {
          participant_no: 203,
          order_no: 102,
          user_account: 'user_account_002',
          full_name: 'Arik·Mayaw',
          email: 'abc12345@gmail.com',
          phone: '0988456789',
        },
      ],
    },
    {
      order_no: 103,
      activity_no: 'act003',
      activity_name: '第41屆空瀧馬拉松',
      activity_date: '2025-09-05', // 超過 3 天，可取消
      activity_time: '06:00~11:00',
      activity_location: '桃園市中壢區復興路46號9樓',
      user_account: 'user_account_001',
      attendance: 3,
      total_amount: 4500,
      payment_method_no: 1,
      status: 2, // 狀態: 已完成
      reason_no: null,
      registered_at: '2025-08-01T09:00:00',
      participants: [
        {
          participant_no: 204,
          order_no: 103,
          user_account: 'user_account_001',
          full_name: 'Komod·Mayaw',
          email: 'a1234567@gmail.com',
          phone: '0988123456',
        },
        {
          participant_no: 205,
          order_no: 103,
          user_account: 'user_account_002',
          full_name: 'Arik·Mayaw',
          email: 'abc12345@gmail.com',
          phone: '0988456789',
        },
        {
          participant_no: 206,
          order_no: 103,
          user_account: 'user_account_003',
          full_name: 'Foday·Afo',
          email: 'abc123@gmail.com',
          phone: '0988123459',
        },
      ],
    },
    {
      order_no: 104,
      activity_no: 'act003',
      activity_name: '第42屆空瀧馬拉松',
      activity_date: '2025-09-20', // 超過 3 天，可取消
      activity_time: '06:00~11:00',
      activity_location: '桃園市中壢區復興路46號9樓',
      user_account: 'user_account_001',
      attendance: 3,
      total_amount: 4500,
      payment_method_no: 1,
      status: 2, // 狀態: 已完成
      reason_no: null,
      registered_at: '2025-08-01T09:00:00',
      participants: [
        {
          participant_no: 205,
          order_no: 103,
          user_account: 'user_account_002',
          full_name: 'Arik·Mayaw',
          email: 'abc12345@gmail.com',
          phone: '0988456789',
        },
        {
          participant_no: 206,
          order_no: 103,
          user_account: 'user_account_003',
          full_name: 'Foday·Afo',
          email: 'abc123@gmail.com',
          phone: '0988123459',
        },
      ],
    },
  ]);

  // 處理子元件 (MemberProfile) 發出的頭像更新事件
  const handleAvatarUpdate = (newAvatarUrl) => {
    console.log('父層收到新的頭像 URL:', newAvatarUrl);
    // 對應到資料庫欄位名稱
    userData.profile_image = newAvatarUrl;
  };

  // 處理子元件 (MemberEvents) 發出的活動取消事件
  const handleEventCancellation = (orderNo, reasonNo) => {
    console.log(`父層收到取消事件: 訂單編號=${orderNo}, 原因編號=${reasonNo}`);
    const eventToCancel = userEvents.value.find((e) => e.order_no === orderNo);
    if (eventToCancel) {
      eventToCancel.status = 3; // 3 = "已取消"
      eventToCancel.reason_no = reasonNo; // 記錄取消原因
    }
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
    padding-top: 225px;

    &__Container {
      padding: 1.5625vw 18.75vw 6.25vw;

      .memberPage__breadcrumb {
        // padding: 100px 0 50px 0;
        // margin-bottom: 20px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 50px;
      }
      .memberPage__breadcrumb-link {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.2em;
        color: $primary-c700;
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
      padding-top: 150px;
      &__Container {
        // padding: 0 16px 6.25vw;
        padding-left: 10%;
        padding-right: 10%;
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
      &__Container {
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
