import LoginView from '@/views/Login/LoginView.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/Login/ForgotPassword.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/reset-password',
    component: () => import('@/views/Login/ResetPassword.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register-step1',
    component: () => import('@/views/Login/RegisterStep1.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register-step2',
    component: () => import('@/views/Login/RegisterStep2.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register-check',
    component: () => import('@/views/Login/RegisterCheck.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/resident-account',
    component: () => import('@/views/Login/ResidentAccount.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/resident-success',
    component: () => import('@/views/Login/ResidentSuccess.vue'),
    meta: { guestOnly: true },
  },
];
