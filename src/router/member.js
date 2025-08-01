// 帳戶管理 (巢狀路由的父層)
import MemberView from '@/views/Member/MemberView.vue';
// 帳戶管理子頁面
import MemberIndex from '@/views/Member/MemberIndex.vue'; // [!code ++] 引入手機選單頁
import MemberProfile from '@/views/Member/MemberProfile.vue';
import MemberFamily from '@/views/Member/MemberFamily.vue';
import MemberEvents from '@/views/Member/MemberEvents.vue';
import MemberRepairs from '@/views/Member/MemberRepair.vue';
import MemberPosts from '@/views/Member/MemberPosts.vue';
import MemberPassword from '@/views/Member/MemberPassword.vue';

export default [
  {
    path: '/member',
    component: MemberView,
    children: [
      {
        // 手機版選單頁
        path: '', // 當路徑為 /member 時，預設顯示此元件
        name: 'member-index',
        component: MemberIndex,
      },
      {
        // 個人資料頁
        path: 'profile',
        name: 'member-profile',
        component: MemberProfile,
        //  新增別名：讓桌面版訪問 /member 時，也激活此路由以套用 active 樣式
        alias: ['/member/desktop-default'], // 先設定一個不會衝突的路徑
      },
      { path: 'family', name: 'member-family', component: MemberFamily },
      { path: 'events', name: 'member-events', component: MemberEvents },
      { path: 'repairs', name: 'member-repairs', component: MemberRepairs },
      { path: 'posts', name: 'member-posts', component: MemberPosts },
      { path: 'password', name: 'member-password', component: MemberPassword },
    ],
  },
];
