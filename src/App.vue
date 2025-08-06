<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import Header from '@/components/Header.vue';
  import Button from '@/components/Button.vue';
  import Footer from '@/components/Footer.vue';
  import { onMounted } from 'vue';
  import AOS from 'aos';

  onMounted(() => {
    AOS.init();
  });
</script>

<template>
  <Header />
  <main>
    <!-- <Button></Button> -->
    <RouterView />
  </main>
  <Footer />
</template>
