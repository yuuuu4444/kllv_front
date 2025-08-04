import NewsView from '@/views/News/NewsView.vue';
import NewsDetails from '@/views/News/NewsDetails.vue';

export default [
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/news/:id',
      name: 'newsdetails',
      component: NewsDetails,
      props: true,
    },
  ];
