import NotFound from '@/views/NotFound/NotFound.vue';

export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
];
