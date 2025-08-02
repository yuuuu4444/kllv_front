<script setup>
  // import TheWelcome from '../components/TheWelcome.vue'
  import { ref, computed } from 'vue';
  import banner from '@/assets/banner/banner_index.jpg';
  import newsPosts from '@/assets/data/News/News';
  const newsTags = [
    {id: 1, name: "全部", type: 1},
    {id: 2, name: "公告", type: 1},
    {id: 3, name: "活動", type: 2},
    {id: 4, name: "補助", type: 2},
    {id: 5, name: "施工", type: 3},
    {id: 6, name: "防災", type: 3}
  ];
  const selectedTag = ref("全部");
  const filteredPosts = computed(() => {
    if (selectedTag.value == "全部") {
      return newsPosts
    } else {
      return newsPosts.filter(post => post.tag == selectedTag.value)
    }
  });
  // 切換頁數
  const postsPerPage = 4;
  const currentPage = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(filteredPosts.value.length / postsPerPage)
  });

  const currentPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredPosts.value.slice(startIndex, endIndex)
  });


  function changeTag(tag) {
    selectedTag.value = tag.name
    currentPage.value = 1
  };
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
  <div class="container">

    <div class="newsboard">

      <div class="newsboard__posts">
        <RouterLink
          v-for="post in currentPosts"
          :key="post.id"
          :to="`/news/${post.id}`"
          class="newsboard__post"
        >
          <p :class="`newsboard__tag btn--tab${post.type}`">{{ post.tag }}</p>
          <h5 class="newsboard__title regular">{{ post.title }}</h5>
          <p class="newsboard__date body--b2">{{ post.date }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  .banner-container{

  .banner {
    background-image: url(../assets/banner/banner_index.jpg);
    width: 100%;
    height: 80vh;
    @include flex-center;
    background-size: cover;
    background-position: center;

.overlay {
  position: absolute;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
   @include flex-center;
  width: 100%;
  height: 80vh;
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
  }
  .container {
    padding: 1.5625vw 18.75vw 6.25vw;
    background-color: $primary_c000;

    @include mobile {
      padding-left: 5%;
      padding-right: 5%;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5em;

    p {
      font-size: 1.042vw;
      color: black;
    }
  }

  .newsboard {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 6.25vw 0 3.125vw;
    gap: 3.125vw;

    &__tags {
      @include flex-center;
      width: 100%;
      height: 4.168vw;
      gap: 1.042vw;
      background-color: $white;
      // border-radius: $border-r-md;
      border-radius: 0.78125vw;;
    }

    &__tag {
      font-size: 1.25vw;
    }

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
        // border-top-left-radius: $border-r-md;
        // border-top-right-radius: $border-r-md;
        border-top-left-radius: 0.78125vw;
        border-top-right-radius: 0.78125vw;
      }
      &:last-child {
        // border-bottom-left-radius: $border-r-md;
        // border-bottom-right-radius: $border-r-md;
        border-bottom-left-radius: 0.78125vw;
        border-bottom-right-radius: 0.78125vw;
      }

      &:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.75)
      }
    }

    &__title {
      font-size: 1.25vw !important;
      color: $black;
    }
    &__date {
      font-size: 1.042vw !important;
      margin-left: auto;
      color: $black;
    }

  }
  .pagination {
    @include flex-center;
    gap: 1.666vw;
  }
</style>