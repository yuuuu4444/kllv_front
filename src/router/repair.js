import RepairDetailView from '@/views/Repair/RepairDetailView.vue';
import RepairView from '@/views/Repair/RepairView.vue';

export default [
  {
    path: '/repair',
    name: 'repair',
    component: RepairView,
  },
  {
    path: '/repair/:report_no',
    name: 'repairdetail',
    component: RepairDetailView,
    props: true,
  },
];
