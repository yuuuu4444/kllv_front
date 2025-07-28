<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="report-page__banner">
    <h1 class="report-page__title bold"><slot></slot></h1>
  </section>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .report-page {
    &__banner {
      @include flex-center;
      // 在自己頁面要加上這個帶上圖片路徑
      // background-image: url(/src/assets/image/Repair/repair_innerbanner.jpg);
      background-position: center center;
      min-height: 840px;
      margin-bottom: 30px;
      padding-top: 200px;
    }

    &__title {
      color: $white;
      border: 2px solid $white;
    }
  }
</style>
