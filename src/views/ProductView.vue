<script setup>
import { ref } from 'vue'

//模擬API
const list = ref([
  { title: '1', icon: '01.png' },
  { title: '2', icon: '02.png' },
])
const baseURL = import.meta.env.BASE_URL
const parsePublicImg = (fileName) => {
  return new URL(`${baseURL}image/${fileName}`, import.meta.url).href
}
const parseAssetsImg = (fileName) => {
  return new URL(`/src/assets/image/${fileName}`, import.meta.url).href
}
</script>

<template>
  <div class="product">
    <div v-for="item in list">
      <!-- <img :src="`src/assets/image/${item.icon}`" :alt="item.title" /> -->
      <img :src="parsePublicImg(item.icon)" :alt="item.title" />
      <img :src="parseAssetsImg(item.icon)" :alt="item.title" />

      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/scss/products.scss';
.product img {
  width: 50%;
}
@media (min-width: 1024px) {
  .product {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
