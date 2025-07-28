<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div class="banner">
    <h1 class="banner__title bold">{{ title }}</h1>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/style";

  .banner {
    width: 100%;
    height: 44vh;
    @include flex-center;
    background-color: $primary_c700;
    
    &__title {
      color: $white;
      padding: 0.25em 0.05em 0.25em 0.25em;
      margin-top: 22vh;

      font-size: clamp(28px, 2.5008vw, 48px);
    }
  }

  @include mobile {
    .banner {
      height: 20vh;

      &__title {
        padding: 0.25em 0.15em 0.25em 0.25em;
        margin-top: 10vh;
      }
    }
  }

</style>
