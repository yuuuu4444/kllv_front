import LoginView from '@/views/Login/LoginView.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/Login/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    component: () => import('@/views/Login/ResetPassword.vue'),
  },
  {
    path: '/register-step1',
    component: () => import('@/views/Login/RegisterStep1.vue'),
  },
  {
    path: '/register-step2',
    component: () => import('@/views/Login/RegisterStep2.vue'),
  },
  {
    path: '/register-check',
    component: () => import('@/views/Login/RegisterCheck.vue'),
  },
  {
    path: '/resident-account',
    component: () => import('@/views/Login/ResidentAccount.vue'),
  },
  {
    path: '/resident-success',
    component: () => import('@/views/Login/ResidentSuccess.vue'),
  },
];
