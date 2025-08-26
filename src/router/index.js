import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import IndexView from '@/views/IndexView.vue';
import NewsRoutes from '@/router/news';
import AboutRoutes from '@/router/about';
import EventsRoutes from '@/router/events';
import RepairRoutes from '@/router/repair';
import CommunityRoutes from '@/router/community';
import MemberRoutes from '@/router/member';
import LoginRoutes from '@/router/login';
import NotFound from '@/router/404';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },

    ...NewsRoutes,
    ...AboutRoutes,
    ...EventsRoutes,
    ...RepairRoutes,
    ...CommunityRoutes,
    ...MemberRoutes,
    ...LoginRoutes,
    ...NotFound,
  ],
});

// 全域路由守衛
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    await auth.checkAuth();
  }

  // 布林值，判斷這個路由是否需要登入
  const requiresAuth = to.meta.requiresAuth;
  const guestOnly = to.meta.guestOnly;

  // 如果需要登入，但尚未登入：導向登入頁，同時帶上 query 參數 redirect，表示登入成功後要回去的頁面
  if (requiresAuth && !auth.isLoggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } });

    // 如果需要未登入，但已經登入：導向成員頁
  } else if (guestOnly && auth.isLoggedIn) {
    next({ path: '/member' });

    //
  } else {
    next();
  }
});

export default router;
