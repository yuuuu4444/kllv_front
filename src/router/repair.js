import RepairDetailView from '@/views/Repair/RepairDetailView.vue';
import RepairFormView from '@/views/Repair/RepairFormView.vue';
import RepairView from '@/views/Repair/RepairView.vue';
import RepairCompleteView from '@/views/Repair/RepairCompleteView.vue';

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
  {
    path: '/repair/form',
    name: 'repairform',
    component: RepairFormView,
  },
  {
    path: '/repair/complete',
    name: 'repaircomplete',
    component: RepairCompleteView,
  },
];
