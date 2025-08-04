import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';

import NewsRoutes from '@/router/news';
import AboutRoutes from '@/router/about';
import EventsRoutes from '@/router/events';
import RepairRoutes from '@/router/repair';
import CommunityRoutes from '@/router/community';
import MemberRoutes from '@/router/member';
import LoginRoutes from '@/router/login';

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
  ],
});

export default router;
