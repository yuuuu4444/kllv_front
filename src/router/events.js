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
];
