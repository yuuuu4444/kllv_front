import CommunityPostDetailView from '@/views/Community/CommunityPostDetailView.vue';
import CommunityView from '@/views/Community/CommunityView.vue';

export default [
  {
    path: '/community',
    name: 'community',
    component: CommunityView,
  },
  {
    path: '/community/:post_no(\\d+)',
    name: 'communitypostdetail',
    component: CommunityPostDetailView,
    props: true,
  },
];
