<script setup>
  import MainBanner from '@/components/MainBanner.vue';
  import News from '@/assets/data/News/News';
  import NewsBoard from '@/components/NewsBoard.vue';
  import Typed from 'typed.js';

  import { ref, onMounted, onBeforeUnmount } from 'vue';
  const typed1 = ref(null);
  const typed2 = ref(null);

  let typedInstance1 = null;
  let typedInstance2 = null;

  onMounted(() => {
    // line 1 打字效果
    typedInstance1 = new Typed(typed1.value, {
      strings: ['過天青 瀧瀧山林 天色清 空色靜'],
      typeSpeed: 50,
      backSpeed: 30,
      showCursor: false,
      loop: false,
      startDelay: 500, // 可調整延遲
    });
    // line 2 打字效果（可接續上面結束後開始）
    typedInstance2 = new Typed(typed2.value, {
      strings: ['方是'],
      typeSpeed: 200,
      showCursor: false,
      loop: false,
      startDelay: 2000, // 建議根據上面字數調整延遲
    });
  });

  onBeforeUnmount(() => {
    typedInstance1?.destroy();
    typedInstance2?.destroy();
  });
</script>

<template>
  <section class="banner-container">
    <div class="banner">
      <div class="overlay">
        <div class="text-overlay">
          <div
            class="line-1"
            data-aos="fade"
            data-aos-delay="60"
          >
            <h1 class="bold">
              雨
              <span ref="typed1"></span>
            </h1>
          </div>
          <div class="line-2">
            <h1
              class="bold"
              data-aos="fade"
              data-aos-delay="2000"
            >
              <span ref="typed2"></span>
              空瀧浪里
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="newsboard-container">
    <NewsBoard
      class="newsboard"
      data-aos="fade-up"
      :posts="News"
      :limit="4"
      :showHeader="true"
      :showFooter="true"
    ></NewsBoard>
  </div>

  <!-- cards -->
  <section class="EventsContainer">
    <div class="EventsInfo">
      <h2 class="EventsInfo__title bold">活動資訊</h2>
    </div>
    
  <!-- 卡片01 -->
<div class="shortcuts">
<div class="linkCards">
  <div class="linkCards__container">
    <div class="linkCards__info">
    <div class="linkCards__icon">
      <img src="../assets/icon/icon_Events_w.png" alt="">
      </div>
      <h5 class="Event-title bold">活動報名</h5>
      <div class="Events-btn-container">
      <RouterLink to="/Events" class="Events-btn">
        <span>活動資訊</span>
      </RouterLink>
      </div>
    </div>
  </div>
</div>
<!-- 卡片02 -->

<div class="linkCards">
  <div class="linkCards__container">
    <div class="linkCards__info">
    <div class="linkCards__icon">
      <img src="../assets/icon/icon_community_w.png" alt="">
      </div>
      <h5 class="Event-title bold">里民開講</h5>
      <div class="Events-btn-container">
      <RouterLink to="/Events" class="Events-btn">
        <span>參與討論</span>
      </RouterLink>
      </div>
    </div>
  </div>

</div>
<!-- 卡片03 -->
<div class="linkCards">
  <div class="linkCards__container">
    <div class="linkCards__info">
    <div class="linkCards__icon">
      <img src="../assets/icon/icon_repair_w.png" alt="">
      </div>
      <h5 class="Event-title bold">維修通報</h5>
      <div class="Events-btn-container">
      <RouterLink to="/Events" class="Events-btn">
        <span>立即報修</span>
      </RouterLink>
      </div>
    </div>
  </div>
</div>
</div>

</section>

<section class="about">
  <div class="mask"></div>
  <h2 class="about__title bold">空瀧浪里 就像這樣</h2>
  <div class="about__container">
    <div class="about__map">
      <img src="../assets/image/index_about_map.png" alt="">
    </div>
    <div class="about__infoContainer">
      <div class="about__info">
        <h4 class="bold">充滿大自然與<br>微笑的寧靜村莊</h4>
      <p class="body--b2">
        空瀧浪里，位於深山老林中的一個小村莊，人口約800人。<br>
        四周群山環繞，村民們充滿活力地生活著。<br>
        這裡沒有紅綠燈、便利商店和超市，但卻充滿了笑容和豐富的自然風光。
      </p>
      </div>
       <RouterLink to="/about" class="">
      <button class="about__infoBtn btn--process">
        <p class="body--b2">了解空瀧浪里更多訊息</p>
      </button>
      </RouterLink>
    </div>
  </div>
  
</section>
<section class="register">
  <div class="outcontainer">

  <div class="register__container">
  <div class="mask"></div>
  <RouterLink to="/register-step1" class="">
  <button class="register__btn">
    <p>立即<br>註冊</p>
  </button>
  </RouterLink>
  <h2 class="bold">里民募集中</h2>
  </div>
      <div class="register__decorate">
    <img src="../assets/image/KongLi_c.png" alt="">
  </div>
</div>
</section>
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
    @include mobile{
      height: 30vh;
    }
    .overlay {
      position: relative;
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
      @include mobile{
        grid-template-columns: 1fr 1fr 1fr;
      }
      span {
        font-size: 64px;
        @include mobile{
          font-size: 20px;
        }
      }
      .line-1 {
        grid-column: 1 / 3;
        font-size: 36px;
        font-weight: bold;
        @include mobile{
          grid-column: 1/4;
          h1{
          font-size: 16px;
          }
        }
      }
      .line-2 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        font-size: 32px;
        font-weight: 900;
        @include mobile{
          grid-column: 2/4;
          h1{
          font-size: 16px;
          }
        }
      }
    }
  }
}

// .container {
//   z-index: 2;
//   position: relative;
//   top: 0%;
//   padding: 0 18.75vw 6.25vw;
//   background-color: $primary_c000;

//   @include mobile {
//     padding-left: 5%;
//     padding-right: 5%;
//   }
// }


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
  // h2{
  //   background-color: $primary-c700;
  //   border-top-left-radius: 0.78125vw;
  //   border-top-right-radius: 0.78125vw;
  //   color: $white;
  //   text-align: center;
  //   padding: 1.3vw;
  // }



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
.EventsContainer{
    padding-bottom: 30px;
    background-image:
      url(src/assets/image/background_image.png), url(src/assets/image/index_bg.png);
    background-repeat: repeat, no-repeat;
    background-position: bottom;

.EventsInfo__title{
  text-align: center;
  padding: 4.583vh;
}

//快速連結卡片
.shortcuts{
  @include flex-center;
  gap: 20px;
  margin-bottom: 241px;
  @include mobile{
    flex-direction: column;
  }
.linkCards{

    width: 20.156vw;
    height: 20.156vw;
    background-color: $primary-c000;
    border-radius: $border-r-md;
    border: solid 0.5px $primary-c000;
    z-index: 0;

    @include mobile{
    width: 290px;
    height: 123px;  
    
  }

  &__container{
  margin: 0.521vw auto;
  width: 19.115vw;
  height: 19.115vw;
  border-radius: $border-r-md;
  z-index: 0;
  @include mobile{
    margin: 0;
    width: 290px;
    height: 123px;
    background-size:cover;
    background-position: center;
  }
  }
    &:nth-child(1) .linkCards__container {
      background-image: url(src/assets/image/index_card01_bg.png);
    }
    &:nth-child(2) .linkCards__container {
      background-image: url(src/assets/image/index_card02_bg.png);
    }    
    &:nth-child(3) .linkCards__container {
      background-image: url(src/assets/image/index_card03_bg.png);
    }
  &__info{
    position: relative;
    padding: 5.82vw 5vw;
    z-index: 1;

    @include mobile{
      padding: 18px 102px;
    }
  }
  &__icon{
    width: 50px;
    margin: 0 auto;
    @include mobile{
      width: 24px;
    }

    img{
      width: 100%;
      object-fit: cover;
      display: block;
      overflow: hidden;
    }
  }
  
  .Event-title{
    color: $white;
    @include flex-center;
    padding-top:8px;
    padding-bottom: 23px;
    @include mobile{
      padding-bottom:10px;
    }

  }
  .Events-btn-container{
    @include flex-center;

  .Events-btn{
  width: 152px;
  height: 40px;
  font-family: $font-sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.4px;
  @include flex-center;
  text-align: center;
  border-radius: $border-r-sm;
  color: $white;
  background-color: $highlight-c;
  cursor: pointer;
  transition: 0.3s all ease;
  @include mobile{
    font-size: 12px;
    border-radius: 5px;
    width: 86px;
    height: 28px;
  }

  &:hover {
    background-color: $highlight-c500;
    color: $white;
  }
  }
  }
}
}
}

.about{
  background-image: url(src/assets/image/about_01.jpg);
  position: relative;
  .mask {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.35); // 這裡可調整透明度
    z-index: 1;
    pointer-events: none; // 避免遮罩擋住點擊
    border-radius: inherit;
  }
    > *:not(.mask) {
    position: relative;
    z-index: 2;
  }
  &__title{
    color: $white;
    @include flex-center;
    padding-top:103px ;
    padding-bottom: 58px;
  }
  &__container{
    @include flex-center;
    display: flex;
    gap: 164px;
    padding-bottom: 96px;
    @include mobile{
      flex-direction: column;
      gap: 60px;
    }
    
  }
  &__map{
      @include mobile{
      width: 308px;
      img{
        width: 100%;
        overflow: hidden;
    }
    }
  }
  &__info{
    position: relative;
    width: 487px;
    height: 380px;
    background-color: $white;
    border-radius: 20px;

    @include mobile{
    width: 290px;
    height: 310px;  
    }
    h4{
      padding: 18px 68px 17px 91px;
      line-height: 1.2;
      @include mobile{
        padding: 13px 22px;
      }
    }
    p{
      padding: 0 35px 46px;
      line-height: 1.8;
      @include mobile{
        padding:0 22px ;
      }
    }
  }

  &__infoBtn{
  position: relative;
  top: -30px;
  background-color: $highlight-c;
  @include mobile{
    width: 200px;
    height: 50px;
  }

  &:hover {
    background-color: $highlight-c500;
  }
  }

}
.register{
  background-color: $primary-c000;
  @include flex-center;
  padding-top:132px ;
  padding-bottom: 120px;
  @include mobile{
    padding-top:34px ;
    padding-bottom: 34px;
  }
  &__decorate{
  position: relative;
  z-index: 3;
  left:-5%;
  top: -15vh;
  @include mobile{
    display:none ;
  }
}
  &__container{
  position: relative;
  background-image: url(../assets/image/index_register_bg.jpg);
  display: flex;
  width: 1200px;
  height: 256px;
  background-size:cover;
  background-position: center;
  color: $white;
  //  margin: 101px 244px 101px 724px;
  align-items: center;
  justify-content: end;
  padding-right: 12%;
  gap: 30px;
  @include mobile{
    width: 360px;
    height:100px;
  }
.mask {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.35); // 這裡可調整透明度
    z-index: 1;
    pointer-events: none; // 避免遮罩擋住點擊
    border-radius: inherit;
  }
    > *:not(.mask) {
    position: relative;
    z-index: 2;
  }


  }

  &__btn {
  box-shadow:  0 4px 4px 0 rgba(0, 0, 0, 0.25);
  width: 90px;
  height: 90px;
  background-color: $highlight-c;
  letter-spacing: 2px;
  border-radius: $border-r-sm;
  color: $white;
  cursor: pointer;
  border: none;
  font-size: 20px;
  align-items: center;
  
@include mobile{
  width: 40px;
  height: 40px;
  font-size: 12px;
  border-radius: 5px;
}
    &:hover {
    background-color: $highlight-c500;
  }

  
  }
  
}

</style>
