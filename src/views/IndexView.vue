<script setup>
<<<<<<< HEAD
import { ref, computed } from 'vue'
import newsPosts from '@/assets/data/News/News'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const postsPerPage = 4
const currentPage  = ref(1)

const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return newsPosts.slice(start, start + postsPerPage)
})

const cards = [
  { id:1, title:'活動一', img:'...'}, 
  { id:2, title:'活動二', img:'...'},
  /* … */
]
=======
  import MainBanner from '@/components/MainBanner.vue';
  import News from '@/assets/data/News/News';
  import NewsBoard from '@/components/NewsBoard.vue'
>>>>>>> dev
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
<<<<<<< HEAD

  <div class="container">
    <div class="newsboard">
      <h2 class="bold">最新消息</h2>
      <div class="newsboard__posts">
        <RouterLink
          v-for="post in currentPosts"
          :key="post.id"
          :to="`/news/${post.id}`"
          class="newsboard__post"
        >
          <p :class="`newsboard__tag btn--tab${post.type}`">
            {{ post.tag }}
          </p>
          <h5 class="newsboard__title regular">{{ post.title }}</h5>
          <p class="newsboard__date body--b2">{{ post.date }}</p>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/Events">
    <p class="newsboard__more body--2">查看所有公告</p>
    </RouterLink>
  </div>
  <div class="EventsInfo">
    <h2 class="EventsInfo__title bold">
      
    </h2>
  </div>
    <Splide :options="{ perPage: 2, focus:'center', gap:'2rem', loop:true }">
    <SplideSlide v-for="c in cards" :key="c.id">
      <div class="card">
        <img :src="c.img" />
        <h4>{{ c.title }}</h4>
      </div>
    </SplideSlide>
  </Splide>
=======
  <div class="newsboard-container">
    <NewsBoard class="newsboard" :posts="News" :limit="3" :showHeader="true" :showFooter="true"></NewsBoard>
  </div>

>>>>>>> dev
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
<<<<<<< HEAD
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
=======
      inset: 0; /* top:0; right:0; bottom:0; left:0 */
      // background-color: rgba(0, 0, 0, 0.4);
>>>>>>> dev
      z-index: 1;
      @include flex-center;
      width: 100%;
      height: 80vh;
    }
<<<<<<< HEAD

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
  z-index: 1;
  position: relative;
  top: 0%;
  padding: 0 18.75vw 6.25vw;
  background-color: $primary_c000;

  @include mobile {
    padding-left: 5%;
    padding-right: 5%;
=======
>>>>>>> dev
  }
}

<<<<<<< HEAD
.newsboard {
  position: relative;
  top: -6vh;
  @include mobile{
    top: -3.1vh;
=======
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
>>>>>>> dev
  }
  h2{
    background-color: $primary-c700;
    border-top-left-radius: 0.78125vw;
    border-top-right-radius: 0.78125vw;
    color: $white;
    text-align: center;
    padding: 1.3vw;
  }
<<<<<<< HEAD
  &__posts {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__post {
    display: flex;
    align-items: center;
    padding: 1.5625vw 3.125vw;
    gap: 3.125vw;
    background-color: $white;

    &:first-child {
      // border-top-left-radius: 0.78125vw;
      // border-top-right-radius: 0.78125vw;
    }
    &:last-child {
      border-bottom-left-radius: 0.78125vw;
      border-bottom-right-radius: 0.78125vw;
    }
    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.75);
    }
  }

  &__title {
    font-size: 1.25vw !important;
    color: $black;
=======


  .newsboard-container {
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
>>>>>>> dev
  }
  &__date {
    font-size: 1.042vw !important;
    margin-left: auto;
    color: $black;
  }
  &__more{
    color: $primary-c700;
    font-weight: bold;
    text-align: end;
     text-decoration:  $primary-c700 underline;
  }
}
.card {
  transition: transform .3s, box-shadow .3s;
}
.splide__slide.is-active .card {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
</style>
