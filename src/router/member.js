// 會員中心 (巢狀路由的父層)
import MemberView from '@/views/Member/MemberView.vue';
// 會員中心子頁面
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
    // meta: { requiresAuth: true }, // 未來可以加上這個來做登入驗證
    children: [
      {
        // 當路徑完全匹配到父層的 /member 時，預設在 <router-view> 中顯示 MemberProfile
        path: '', // 路徑為空
        name: 'member-root-default', //
        component: MemberProfile, // 預設顯示個人資料
      },
      { path: 'profile', name: 'member-profile', component: MemberProfile },
      { path: 'family', name: 'member-family', component: MemberFamily },
      { path: 'events', name: 'member-events', component: MemberEvents },
      { path: 'repairs', name: 'member-repairs', component: MemberRepairs },
      { path: 'posts', name: 'member-posts', component: MemberPosts },
      { path: 'password', name: 'member-password', component: MemberPassword },
    ],
  },
];
