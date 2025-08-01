import EventsView from '@/views/Events/EventsView.vue';
import EventDetailView from '@/views/Events/EventDetailView.vue';

export default [
  {
    path: '/events',
    name: 'events',
    component: EventsView,
  },
  {
    path: '/events/:id',
    name: 'event-detail',
    component: EventDetailView,
  },
];
