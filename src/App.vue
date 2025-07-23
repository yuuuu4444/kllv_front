<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <main>
    <!-- <Button></Button> -->
    <RouterView />
  </main>
  <Footer />
</template>
