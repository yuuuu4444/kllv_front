// import EventsView from '@/views/Events/EventsView.vue';
// import EventDetailView from '@/views/Events/EventDetailView.vue';

export default [
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/Events/EventsView.vue'),
  },
  {
    path: '/events/:id',
    name: 'event-detail',
    component: () => import('@/views/Events/EventDetailView.vue'),
  },
  {
    path: '/events/:id/register',
    name: 'event-registration',
    component: () => import('@/views/Events/EventRegistrationView.vue'),
  },
  {
    // 免費活動報名頁
    path: '/events/:id/register-free',
    name: 'event-registration-free',
    component: () => import('@/views/Events/EventRegistrationFreeView.vue'),
  },
  {
    // 未繳費完成頁
    path: '/events/complete/unpaid',
    name: 'event-complete-unpaid',
    component: () => import('@/views/Events/EventCompleteUnpaid.vue'),
  },
  {
    // 已繳費完成頁
    path: '/events/complete/paid',
    name: 'event-complete-paid',
    component: () => import('@/views/Events/EventComplete.vue'),
  },
];
