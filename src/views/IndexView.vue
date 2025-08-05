<script setup>

  import MainBanner from '@/components/MainBanner.vue';
  import News from '@/assets/data/News/News';
  import NewsBoard from '@/components/NewsBoard.vue'
</script>

<template>
  <section class="banner-container">
    <div class="banner">
      <div class="overlay">
        <div class="text-overlay">
          <div class="line-1">
            <h1 class="bold">
              <span class="rain">雨</span>過天青 瀧瀧山林 天色清 空色靜
            </h1>
          </div>
          <div class="line-2">
            <h1 class="bold">
              方是<span class="kll">空瀧浪</span>好里
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="newsboard-container">
    <NewsBoard class="newsboard" :posts="News" :limit="4" :showHeader="true" :showFooter="true"></NewsBoard>
  </div>

</template>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

.banner-container {
  .banner {
    position: relative;
    background-image: url(../assets/banner/banner_index.jpg);
    width: 100%;
    height: 80vh;
    @include flex-center;
    background-size: cover;
    background-position: center;

    .overlay {
      position: absolute;
      inset: 0; 

      z-index: 1;
      @include flex-center;
      width: 100%;
      height: 80vh;
    }

    .text-overlay {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      color: $white;

      span {
        font-size: 64px;
      }
      .line-1 {
        grid-column: 1 / 3;
        font-size: 36px;
        font-weight: bold;
      }
      .line-2 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        font-size: 32px;
        font-weight: 900;
      }
    }
  }
}

.container {
  z-index: 2;
  position: relative;
  top: 0%;
  padding: 0 18.75vw 6.25vw;
  background-color: $primary_c000;

  @include mobile {
    padding-left: 5%;
    padding-right: 5%;
  }
}


  .text-overlay {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    color: $white;

    span {
      font-size: 64px;
    }
    .line-1 {
    grid-column: 1 / 3; 
    font-size: 36px;
    font-weight: bold;
    }
    .line-2{
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: 32px;
    font-weight: 900;
    }

  }
  h2{
    background-color: $primary-c700;
    border-top-left-radius: 0.78125vw;
    border-top-right-radius: 0.78125vw;
    color: $white;
    text-align: center;
    padding: 1.3vw;
  }



  .newsboard-container {
    position: relative;
    padding: 1.5625vw 18.75vw 6.25vw;
    background-color: $primary_c000;
    
    
    @include desktop {
      padding-left: 10%;
      padding-right: 10%;
    }
    @include mobile {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
  .newsboard {
    margin: -3.125vw 0 3.125vw;
    z-index: 9;

}
.card {
  transition: transform .3s, box-shadow .3s;
}
.splide__slide.is-active .card {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
</style>
