import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import AboutView from '@/views/About/AboutView.vue'
import NewsView from '@/views/News/NewsView.vue'
import EventsView from '@/views/Events/EventsView.vue'
import RepairView from '@/views/Repair/RepairView.vue'
import MemberView from '@/views/Member/MemberView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/IndexView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About/AboutView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/News/NewsView.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/Events/EventsView.vue'),
    },
    {
      path: '/repair',
      name: 'repair',
      component: () => import('@/views/Repair/RepairView.vue'),
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/Member/MemberView.vue'),
    },
  ],
})

export default router
