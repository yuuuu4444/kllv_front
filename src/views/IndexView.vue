<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import banner from'@/assets/image/index_banner.jpg'
</script>

<template>
      <section class="banner-container">
     <img :src="banner" alt="" />
    <div class="overlay">
    </div>
    <div class="text-overlay">
      <h1 class="bold">空瀧浪里 就像這樣</h1>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

 .banner-container{
    height:860px;
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  .banner-container img{
    transform: translate(0px,-140px );
    width: 100%;
  }
  .overlay{
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }
  .text-overlay {
  position: absolute; 
  top: 50%;           
  left: 50%;          
  transform: translate(-50%, -50%);
  color:$white ;

  pointer-events: none;
}


</style>