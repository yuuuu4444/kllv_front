<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Button from '@/components/Button.vue'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <MainHeader />

  <main>
    <!-- <HelloWorld msg="You did it!" /> -->
    <Button></Button>
    <RouterView />
  </main>
</template>
