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
    path: '/repair/:repair_no(\\d+)',
    name: 'repairdetail',
    component: RepairDetailView,
    props: true,
  },
  {
    path: '/repair/form',
    name: 'repairform',
    component: RepairFormView,
    meta: { requiresAuth: true },
  },
  {
    path: '/repair/complete/:repair_no(\\d+)?',
    name: 'repaircomplete',
    component: RepairCompleteView,
    props: true,
  },
];
