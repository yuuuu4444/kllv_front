import './assets/scss/style.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'aos/dist/aos.css';
import AOS from 'aos';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

AOS.init({
  once: true, // 只執行一次（建議開）
  duration: 800, // 動畫持續時間（毫秒）
  easing: 'ease-in-out', // 動畫曲線
});
