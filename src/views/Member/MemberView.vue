<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import MemberSidebar from '@/components/MemberSidebar.vue';

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

  // 主帳號子帳號判斷
  const filteredMenuItems = computed(() => {
    // 如果 Pinia 的使用者資料尚未載入，先回傳一個最基本的、保證存在的安全預設值
    if (!currentUser.value) {
      return [{ name: '個人資料', path: '/member/profile' }];
    }

    // 如果當前登入者的 role_type 不是 0 (主帳號)
    if (currentUser.value.role_type != 0) {
      // 就回傳無家庭成員選項的新陣列
      return allMenuItems.value.filter((item) => item.name !== '家庭成員');
    }

    // 如果是主帳號，則回傳完整的選單
    return allMenuItems.value;
  });

  //帳號登出
  const handleLogout = async () => {
    await auth.logout();
    alert('已成功登出!');
    router.push('/login');
  };

  // 原本的個人假資料
  // const userData = reactive({
  //   user_id: 'user_account_001',
  //   password: '',
  //   profile_image: new URL('@/assets/image/02.png', import.meta.url).href,
  //   email: 'test123@gmail.com',
  //   fullname: 'Komod·Mayaw',
  //   nickname: '谷木',
  //   phone_number: '0988123456',
  //   id_number: 'H1212345678',
  //   birth_date: '1980-02-28',
  //   gender: 'M',
  //   household: 101,
  //   role_type: 0,
  //   is_active: true,
  //   is_cancelled: false,
  //   created_at: '2025-01-01T10:00:00',
  //   address: '桃園市中壢區空瀧浪里快樂街1479號8樓-3',
  // });

  // 原本的活動列表假資料
  // const userEvents = ref([
  //   // 每一筆資料都模擬一筆 activity_orders 訂單紀錄
  //   {
  //     order_no: 101,
  //     activity_no: 'act001',
  //     activity_name: '第39屆空瀧馬拉松',
  //     activity_date: '2025-07-20',
  //     activity_time: '06:00~11:00',
  //     activity_location: '桃園市中壢區復興路46號9樓',
  //     user_account: 'user_account_001',
  //     attendance: 1,
  //     total_amount: 1500,
  //     payment_method_no: 1,
  //     status: 3,
  //     reason_no: 2,
  //     registered_at: '2025-07-01T10:00:00',

  //     participants: [
  //       {
  //         participant_no: 201,
  //         order_no: 101,
  //         user_account: 'user_account_001',
  //         full_name: 'Komod·Mayaw',
  //         email: 'a1234567@gmail.com',
  //         phone: '0988123456',
  //       },
  //     ],
  //   },
  //   {
  //     order_no: 102,
  //     activity_no: 'act002',
  //     activity_name: '第40屆空瀧馬拉松',
  //     activity_date: '2025-08-02', // 假設今天是 2025-08-01, 這是 3 天內
  //     activity_time: '06:00~11:00',
  //     activity_location: '桃園市中壢區復興路46號9樓',
  //     user_account: 'user_account_001',
  //     attendance: 2,
  //     total_amount: 3000,
  //     payment_method_no: 1,
  //     status: 2, // 狀態: 已完成 (代表已報名成功)
  //     reason_no: null,
  //     registered_at: '2025-07-15T14:30:00',
  //     participants: [
  //       {
  //         participant_no: 202,
  //         order_no: 102,
  //         user_account: 'user_account_001',
  //         full_name: 'Komod·Mayaw',
  //         email: 'a1234567@gmail.com',
  //         phone: '0988123456',
  //       },
  //       {
  //         participant_no: 203,
  //         order_no: 102,
  //         user_account: 'user_account_002',
  //         full_name: 'Arik·Mayaw',
  //         email: 'abc12345@gmail.com',
  //         phone: '0988456789',
  //       },
  //     ],
  //   },
  //   {
  //     order_no: 103,
  //     activity_no: 'act003',
  //     activity_name: '第41屆空瀧馬拉松',
  //     activity_date: '2025-09-05', // 超過 3 天，可取消
  //     activity_time: '06:00~11:00',
  //     activity_location: '桃園市中壢區復興路46號9樓',
  //     user_account: 'user_account_001',
  //     attendance: 3,
  //     total_amount: 4500,
  //     payment_method_no: 1,
  //     status: 2, // 狀態: 已完成
  //     reason_no: null,
  //     registered_at: '2025-08-01T09:00:00',
  //     participants: [
  //       {
  //         participant_no: 204,
  //         order_no: 103,
  //         user_account: 'user_account_001',
  //         full_name: 'Komod·Mayaw',
  //         email: 'a1234567@gmail.com',
  //         phone: '0988123456',
  //       },
  //       {
  //         participant_no: 205,
  //         order_no: 103,
  //         user_account: 'user_account_002',
  //         full_name: 'Arik·Mayaw',
  //         email: 'abc12345@gmail.com',
  //         phone: '0988456789',
  //       },
  //       {
  //         participant_no: 206,
  //         order_no: 103,
  //         user_account: 'user_account_003',
  //         full_name: 'Foday·Afo',
  //         email: 'abc123@gmail.com',
  //         phone: '0988123459',
  //       },
  //     ],
  //   },
  //   {
  //     order_no: 104,
  //     activity_no: 'act003',
  //     activity_name: '第42屆空瀧馬拉松',
  //     activity_date: '2025-09-20', // 超過 3 天，可取消
  //     activity_time: '06:00~11:00',
  //     activity_location: '桃園市中壢區復興路46號9樓',
  //     user_account: 'user_account_001',
  //     attendance: 3,
  //     total_amount: 4500,
  //     payment_method_no: 1,
  //     status: 2, // 狀態: 已完成
  //     reason_no: null,
  //     registered_at: '2025-08-01T09:00:00',
  //     participants: [
  //       {
  //         participant_no: 205,
  //         order_no: 103,
  //         user_account: 'user_account_002',
  //         full_name: 'Arik·Mayaw',
  //         email: 'abc12345@gmail.com',
  //         phone: '0988456789',
  //       },
  //       {
  //         participant_no: 206,
  //         order_no: 103,
  //         user_account: 'user_account_003',
  //         full_name: 'Foday·Afo',
  //         email: 'abc123@gmail.com',
  //         phone: '0988123459',
  //       },
  //     ],
  //   },
  // ]);

  // userData從pinia抓
  // 先為 userData 提供備用值
  // 使用 || 運算子，如果 currentUser.value 是 null，userData 就會變成一個包含空頭像路徑的物件，讀取 userData.profile_image 時就不會報錯
  const userData = computed(() => currentUser.value || { profile_image: '' });

  // watch 和 onMounted (權限守衛和頁面初始化)
  // watch(
  //   () => auth.isLoggedIn,
  //   (isLoggedIn, wasLoggedIn) => {
  //     // 因為被動判斷，導致主動登出時也被觸發
  //     // if (wasLoggedIn && !isLoggedIn) {
  //     //   alert('您的登入已逾期，請重新登入。');
  //     //   router.push('/login');
  //     // }

  //     // 檢查當前路由是否還在帳戶管理頁面，來判斷是否是主動登出，不是主動登出才觸發
  //     if (wasLoggedIn && !isLoggedIn && !auth.isLoggingOut) {
  //       alert('您的登入已逾期，请重新登入。');
  //       router.push('/login');
  //     }
  //   },
  //   { immediate: true },
  // );

  onMounted(() => {
    // 只有在 Pinia 中沒有登入狀態時，才去呼叫 checkAuth 嘗試恢復
    if (!auth.isLoggedIn) {
      auth.checkAuth().then((isSuccess) => {
        if (!isSuccess) {
          // 如果恢復失敗，跳轉到登入頁
          router.push('/login');
        }
      });
    }
    // 在元件掛載時檢查設備類型
    if (window.innerWidth >= 768 && router.currentRoute.value.path === '/member') {
      router.replace('/member/profile');
    }
  });

  // 處理子元件 (MemberProfile) 發出的頭像更新事件
  // const handleAvatarUpdate = (newAvatarUrl) => {
  //   // console.log('父層收到新的頭像 URL:', newAvatarUrl);
  //   // // 對應到資料庫欄位名稱
  //   // userData.profile_image = newAvatarUrl;
  //   if (currentUser.value) {
  //     currentUser.value.profile_image = newAvatarUrl;
  //   }
  // };

  // 原本處理子元件 (MemberEvents) 發出的活動取消事件
  // const handleEventCancellation = (orderNo, reasonNo) => {
  //   console.log(`父層收到取消事件: 訂單編號=${orderNo}, 原因編號=${reasonNo}`);
  //   const eventToCancel = userEvents.value.find((e) => e.order_no === orderNo);
  //   if (eventToCancel) {
  //     eventToCancel.status = 3; // 3 = "已取消"
  //     eventToCancel.reason_no = reasonNo; // 記錄取消原因
  //   }
  // };
</script>

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
          :avatar-url="auth.avatarUrl"
          :menu-items="filteredMenuItems"
          @logout="handleLogout"
        />
        <main class="memberContentLayout__content">
          <!-- 所有子路由 (MemberIndex, MemberProfile...) 都會被渲染到這裡 -->
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

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
