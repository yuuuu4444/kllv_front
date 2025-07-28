import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';
import AboutView from '@/views/About/AboutView.vue';
import NewsView from '@/views/News/NewsView.vue';
import EventsView from '@/views/Events/EventsView.vue';
import RepairView from '@/views/Repair/RepairView.vue';
import RepairDetailView from '@/views/Repair/RepairDetailView.vue';
import CommunityView from '@/views/Community/CommunityView.vue';
import MemberView from '@/views/Member/MemberView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/repair',
      name: 'repair',
      component: RepairView,
    },
    {
      path: '/repair/repair_detail',
      name: 'repair_detail',
      component: RepairDetailView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView,
    },
  ],
});

export default router;
