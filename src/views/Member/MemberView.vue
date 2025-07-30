<script setup>
import { ImgComparisonSlider } from '@img-comparison-slider/vue'
import image1 from '@/assets/image/01.png'
import image2 from '@/assets/image/02.png'
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <ImgComparisonSlider>
    <!-- eslint-disable -->
    <img slot="first" :src="image1" />
    <img slot="second" :src="image2" />
    <!-- eslint-enable -->
  </ImgComparisonSlider>
</template>

<style scoped>
img {
  width: 100%;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
