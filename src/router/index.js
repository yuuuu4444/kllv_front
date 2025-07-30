import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';
// import AboutView from '@/views/About/AboutView.vue'
// import EventsView from '@/views/Events/EventsView.vue'
// import RepairView from '@/views/Repair/RepairView.vue'
// import CommunityView from '@/views/Community/CommunityView.vue'
// import MemberView from '@/views/Member/MemberView.vue'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView,
    // },
    // {
    //   path: '/events',
    //   name: 'events',
    //   component: EventsView,
    // },
    // {
    //   path: '/repair',
    //   name: 'repair',
    //   component: RepairView,
    // },
    // {
    //   path: '/community',
    //   name: 'community',
    //   component: CommunityView,
    // },
    // {
    //   path: '/member',
    //   name: 'member',
    //   component: MemberView,
    // },

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
