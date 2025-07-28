<script setup>
defineProps({
  image: String,
  title: String
})
</script>

<template>
  <div class="banner" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${image})` }">
    <h1 class="banner__title bold">{{ title }}</h1>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/style";

  .banner {
    width: 100%;
    height: 80vh;
    @include flex-center;
    background-size: cover;
    background-position: center;
    
    &__title {
      margin-right: 0.2em;
      padding: 0.2em 0 0.2em 0.2em;
      border: 2px solid $white;
      
      font-size: clamp(28px, 2.5008vw, 48px);
      color: $white;
    }
  }
  
  @include mobile {
    .banner {
      height: 60vh;

      &__title {
        padding: 0.25em 0.15em 0.25em 0.25em;
      }
    }
  }
</style>