<script setup>
  import MainBanner from '@/components/MainBanner.vue';
  import News from '@/assets/data/News/News';
  import NewsBoard from '@/components/NewsBoard.vue';
  import Typed from 'typed.js';
  // 導入swiper
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'
  // 導入活動資料
  import EventCard from '@/components/EventCard.vue';
  import eventsData from '@/assets/data/Events/events.json';
  import categoriesData from '@/assets/data/Events/event_categories.json';

  const images = import.meta.glob('/src/assets/image/events/*', {
  eager: true,
  import: 'default'
})


  const eventsForCards = computed(() =>
  eventsData.slice(0, 6).map(ev => {
    const key = `/src/${ev.image}`            // 絕對鍵索引 glob 結果
    const url = images[key]                   // 最終可用的圖片 URL
    // if (!url) {
    //   console.warn('[image missing]', key, '請確認檔名或 JSON 路徑是否正確')
    // }
    const catName =
      categoriesData.find(c => c.category_no === ev.category_no)?.category_name ?? ''
    return { ...ev, image: url ?? ev.image, category_name: catName }
  })
)
// const groupedEvents = computed(() => {
//   const src = eventsForCards.value
//   const out = []
//   for (let i = 0; i < src.length; i += 2) out.push(src.slice(i, i + 2))
//   return out
// })


//  手機偵測（≤768px）
const isMobile = ref(false)
let mql
const updateIsMobile = () => (isMobile.value = mql.matches)
onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  updateIsMobile()
  mql.addEventListener ? mql.addEventListener('change', updateIsMobile)
                      : mql.addListener(updateIsMobile)
})
onBeforeUnmount(() => {
  mql?.removeEventListener ? mql.removeEventListener('change', updateIsMobile)
                          : mql?.removeListener(updateIsMobile)
})

// 依裝置動態分組：桌機一組2張 / 手機一組1張
const groupedEvents = computed(() => {
  const size = isMobile.value ? 1 : 2
  const src = eventsForCards.value
  const out = []
  for (let i = 0; i < src.length; i += size) out.push(src.slice(i, i + size))
  return out
})
//
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  const typed1 = ref(null);
  const typed2 = ref(null);

  let typedInstance1 = null;
  let typedInstance2 = null;

  onMounted(() => {
    // line 1 打字效果
    typedInstance1 = new Typed(typed1.value, {
      strings: ['雨過天青 瀧瀧山林 天色清 空色靜'],
      typeSpeed: 50,
      backSpeed: 30,
      showCursor: false,
      loop: false,
      startDelay: 500, // 可調整延遲
    });
    // line 2 打字效果（可接續上面結束後開始）
    typedInstance2 = new Typed(typed2.value, {
      strings: ['方是空瀧浪好里'],
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
            <h1 class="">
             
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
    <div class="background-gif"data-aos="fade-up">
      <img src="../assets/image/new.gif" alt="">
    </div>
      <div class="background-gif2"data-aos="fade-up">
      <img src="../assets/image/sun.gif" alt="">
    </div>
  </div>

  <!-- cards -->
  <section class="EventsContainer">
    <div class="EventsInfo">
      <h2 class="EventsInfo__title bold">活動資訊</h2>
    </div>

      <!-- 卡片輪播 -->
<Swiper data-aos="fade-up"
  :effect="'coverflow'"
  :grabCursor="true"
  :modules="[Navigation, Pagination]"
  :navigation="{ prevEl: '.events-prev', nextEl: '.events-next' }"
      :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
  :slides-per-view="'auto'"          
  :centered-slides="true"
  :space-between="24"
  loop
  :pagination="{ clickable: true }"
  
  class="events-swiper"
>

  <SwiperSlide
    v-for="(pair, idx) in groupedEvents"
    :key="idx"
    class="event-slide"
  >
    <!-- 外框（同一個框框） -->
    <div class="event-frame">
      <div class="event-pair">
        <EventCard
          v-for="ev in pair"
          :key="ev.event_no"
          :event="ev"
        />
      </div>
    </div>
  </SwiperSlide>
</Swiper>
<div class="events-arrows">
  <button class="events-prev" type="button" aria-label="上一組">
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 17.7633V2.23829C16 1.81329 15.85 1.45679 15.55 1.16879C15.25 0.880787 14.9 0.737286 14.5 0.738286C14.375 0.738286 14.2435 0.756787 14.1055 0.793787C13.9675 0.830787 13.8365 0.887287 13.7125 0.963287L1.4875 8.72579C1.2625 8.87579 1.0935 9.06329 0.980499 9.28829C0.867499 9.51329 0.8115 9.75079 0.8125 10.0008C0.8135 10.2508 0.869499 10.4883 0.980499 10.7133C1.0915 10.9383 1.2605 11.1258 1.4875 11.2758L13.7125 19.0383C13.8375 19.1133 13.9685 19.1698 14.1055 19.2078C14.2425 19.2458 14.374 19.2643 14.5 19.2633C14.9 19.2633 15.25 19.1193 15.55 18.8313C15.85 18.5433 16 18.1873 16 17.7633Z" fill="white"/>
</svg>
  </button>
  <button class="events-next" type="button" aria-label="下一組">
    <svg width="18" height="18" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 17.7633V2.23829C0 1.81329 0.15 1.45679 0.45 1.16879C0.75 0.880787 1.1 0.737286 1.5 0.738286C1.625 0.738286 1.7565 0.756787 1.8945 0.793787C2.0325 0.830787 2.1635 0.887287 2.2875 0.963287L14.5125 8.72579C14.7375 8.87579 14.9065 9.06329 15.0195 9.28829C15.1325 9.51329 15.1885 9.75079 15.1875 10.0008C15.1865 10.2508 15.1305 10.4883 15.0195 10.7133C14.9085 10.9383 14.7395 11.1258 14.5125 11.2758L2.2875 19.0383C2.1625 19.1133 2.0315 19.1698 1.8945 19.2078C1.7575 19.2458 1.626 19.2643 1.5 19.2633C1.1 19.2633 0.75 19.1193 0.45 18.8313C0.15 18.5433 0 18.1873 0 17.7633Z" fill="white"/>
</svg>

  </button>
</div>
  <!-- 卡片01 -->
<div class="shortcuts"
data-aos="fade-up">
<div class="linkCards">
  <div class="linkCards__container">
    <div class="linkCards__info">
    <div class="linkCards__icon">
      <img src="../assets/icon/icon_Events_w.png" alt="">
      </div>
      <h5 class="Event-title">活動報名</h5>
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
      <h5 class="Event-title">里民開講</h5>
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
      <h5 class="Event-title">維修通報</h5>
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
      <div class="background-gif3"data-aos="fade-up">
      <img src="../assets/image/owl.gif" alt="">
    </div>
  <h2 class="about__title bold">空瀧浪里 就像這樣</h2>
  <div class="about__container"
  data-aos="fade-up">
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
    <div class="background-gif4"data-aos="fade-up">
      <img src="../assets/image/click.gif" alt="">
    </div>
      </div>
       
      <button class="about__infoBtn btn--process">
        <RouterLink to="/about" class="">
        <p class="body--b2">了解空瀧浪里更多訊息</p>
        </RouterLink>
      </button>
      

    </div>
  </div>
  
</section>
<section class="register">
  <div class="outcontainer">

  <div class="register__container"
  data-aos="fade-up">
  <div class="mask"></div>
  <RouterLink to="/register-step1" class="">
  <button class="register__btn">
    <p>立即<br>註冊</p>
  </button>
  </RouterLink>
  <h2 class="bold">里民募集中</h2>
  </div>
      <div class="register__decorate"
      data-aos="fade-up">
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
      height: 60vh;   
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
        font-size: 48px;
        @include mobile{
          font-size: 20px;
        }
      }
      .line-1 {
        grid-column: 1 / 3;
        font-size: 36px;
        font-weight: bold;
        h1{
          font-size: 64px;
        }
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
    .background-gif{
      position: absolute;
      width: 7vw;
      z-index: 1;
      top: -2%;
      left: 15%;
      img{
        width: 100%;
      }
    @include mobile{
      display: none;
    }
    @include desktop{
      left: 6%;
    }
    }
    .background-gif2{
      position: absolute;
      width: 10vw;
      z-index: 1;
      bottom: 5%;
      right: 5%;
      img{
        width: 100%;
      }
    @include mobile{
      display: none;
    }
    @include desktop{
      right: 3%;
      bottom: 1%;
    }
    }
  }
  .newsboard {
    margin: -3.125vw 0 3.125vw;
    z-index: 9;
    &:hover{
      
    }
}
.EventsContainer{
  padding-top: 21px;
    // background-color: $white;
    background-image:
      url(/src/assets/image/background_image.png), url(/src/assets/image/index_bg.svg);
    background-repeat: repeat, no-repeat;
    background-position:0 0px;
    overflow: hidden;

.EventsInfo__title{
  text-align: center;
  padding: 4.583vh;
}
//活動卡片
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  justify-items: center; // 讓卡片在格子中置中
  margin: 24px auto 48px;
  max-width: 1280px; // 視覺更集中，可按需調整
  padding: 0 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  

  @include mobile {
    grid-template-columns: 1fr;
    gap: 20px;
  }
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

    width: clamp(210px,20vw,20.1vw);
    height: clamp(210px,20vw,20.1vw);
    background-color: $primary-c000;
    border-radius: $border-r-md;
    border: solid 0.5px $primary-c000;
    z-index: 0;
    box-shadow:  0 4px 4px 0 rgba(0, 0, 0, 0.25);
    @include mobile{
    width: 290px;
    height: 123px;  
    box-shadow:  0 4px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &__container{
  margin: 0.521vw auto;
  width: clamp(200px,19vw,19.1vw);
  height: clamp(200px,19vw,19.1vw);
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
      background-image: url(/src/assets/image/index_card01_bg.png);
    }
    &:nth-child(2) .linkCards__container {
      background-image: url(/src/assets/image/index_card02_bg.png);
    }    
    &:nth-child(3) .linkCards__container {
      background-image: url(/src/assets/image/index_card03_bg.png);
    }
  &__info{
    position: relative;
    padding-top: 5.82vw;
    z-index: 1;

    @include mobile{
      padding: 18px 102px;
    }
  }
  &__icon{
    width: 2.604vw;
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
    font-family: $font-sans;
    letter-spacing: 0.2em;
    font-size: clamp(1rem, 1.75vw, 1.5rem);
    @include flex-center;
    padding-top:8px;
    padding-bottom: 23px;
    @include mobile{
      font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
      padding-bottom:10px;
    }

  }
  .Events-btn-container{
    @include flex-center;

  .Events-btn{
  width: 152px;
  height: 40px;
  font-family: $font-sans;
  font-size: clamp(1rem,0.833vw,1.2rem);
  font-style: normal;
  font-weight:normal;
  line-height: normal;
  letter-spacing: 2.4px;
  @include flex-center;
  text-align: center;
  border-radius: 0.521vw;
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
  background-image: url(/src/assets/image/about_01.jpg);
  position: relative;

  .mask {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.35);
    z-index: 1;
    pointer-events: none; // 避免遮罩擋住點擊
    border-radius: inherit;
  }
    > *:not(.mask) {
    position: relative;
    z-index: 2;
  }
    .background-gif3{
      position: absolute;
      width: 150px;
      z-index: 3;
      top: -18.8%;
      left: 15%;
      img{
        width: 100%;
      }
    @include mobile{
      display: none;
    }
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
    gap: 8.55vw;
    padding-bottom: 96px;
    @include mobile{
      flex-direction: column;
      gap: 60px;
    }
    
  }
  &__map{
    width: 20vw;
    img{
      width: 100%;
    }
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
  p{
    color: $white;
  }
  @include mobile{
    width: 220px;
    height: 50px;
    padding: 0 10px;
  }

  &:hover {
    background-color: $highlight-c500;
  }
  }
    .background-gif4{
      pointer-events: none;
      position: absolute;
      width: 120px;
      z-index: 3;
      bottom: -24% ;
      right: 20%;
      
      img{
        pointer-events: none;
        width: 100%;
      }
    @include mobile{
      display: none;
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
    width: 7.8vw;
  position: relative;
  z-index: 3;
  left:-5%;
  top: -5vw;
  img{
    width: 100%;
  }
  @include mobile{
    display:none ;
  }
}
  &__container{
  position: relative;
  background-image: url(../assets/image/index_register_bg.jpg);
  display: flex;
  width: 62.5vw;
  height: 20vw;
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
.events-swiper {
  padding: 12px 32px 28px;
  overflow: visible; // 放大時不要被裁切
  
}
/* 兩張卡片並排 */
.event-pair {
  display: flex;
  justify-content: center;
  gap: 24px;
}
/* 先讓非焦點淡一點 */
.events-swiper .swiper-slide {
  transition: transform .25s ease, opacity .25s ease, box-shadow .25s ease;
  opacity: .6;
  transform: scale(.96);
}


/* 焦點的兩張（active 與 next）更亮、略放大 */
.events-swiper .swiper-slide.swiper-slide-active,
.events-swiper .swiper-slide.swiper-slide-next {
  opacity: 1;
  transform: scale(1.02);
  // box-shadow: 0 8px 20px rgba(0,0,0,.12);
  
}

.events-arrows {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
  margin-bottom: 200px;
}

/* 圓形、投影、主色 */
.events-arrows button {
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  background: $highlight-c;        
  color: #fff;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,.15);
  transition: transform .2s ease, opacity .2s ease, background .2s ease;
}
.events-arrows button:hover { transform: translateY(-1px); }
.events-arrows button:active { transform: translateY(0); }

/* Swiper 會自動幫你的自訂按鈕加上 .swiper-button-disabled */
.events-arrows .swiper-button-disabled {
  opacity: .35;
  cursor: default;
  pointer-events: none;
}


</style>
