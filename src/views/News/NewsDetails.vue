<script setup>
  import { useRoute } from 'vue-router';
  import router from '@/router';
  import SubBanner from '@/components/SubBanner.vue';
  import newsPosts from '@/assets/data/News/News';

  // 顯示內文
  const route = useRoute();
  const postId = Number(route.params.id);

  const post = newsPosts.find(p => p.id == postId);

  // 返回上頁
  const Back = () => {
    router.back();
  };
</script>

<template>
  <SubBanner title="最新消息" />
  <div class="container" v-if="post">
    <div class="breadcrumb">
      <RouterLink to="/index">
        <p class="body--b3">首頁</p>
      </RouterLink>      
        <p class="body--b3">/</p>
      <RouterLink to="/news">
        <p class="body--b3">最新消息</p>
      </RouterLink>
      <p class="body--b3">/</p>
      <p class="body--b3">消息內頁</p>
    </div>
    <div class="newspost">
      <div class="newspost__header">
        <div class="newspost__info">
          <p :class="`newspost__tag btn--tab${post.type}`">{{ post.tag }}</p>
          <p class="newspost__date body--b2">｜</p>
          <p class="newspost__date body--b2">{{ post.date }}</p>
        </div>
        <h2 class="newspost__title bold">{{ post.title }}</h2>
      </div>
      <div class="newspost__body">
        <p class="newspost__content body--b1" style="white-space: pre-line;">{{ post.content }}</p>
      </div>
    </div>
    <div class="backbtn">
      <button class="backbtn__btn btn--process" @click="Back">
        返回上一頁
      </button>
    </div>
  </div>
  <div v-else>
    <p>找不到這篇文章</p>
  </div>
</template>


<style scoped lang="scss">
    @import "@/assets/scss/style";

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
      gap: 0.5em;
  
      p {
        display: inline-block;
        font-size: 1.042vw;
        color: black;
      }
    }

  .newspost {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 6.25vw 0 3.125vw;
    gap: 3.125vw;

    &__header {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 1.042vw 1.042vw;
      gap: 2.084vw;
      border-radius: $border-r-md;
      border-radius: 0.78125vw;
      background-color: $white;
    }
    &__info {
      display: flex;
      align-items: center;
      padding-left: 0.1042vw;
      gap: 0.521vw;
    }
    &__title {
      font-size: 2.084vw;
    }
    &__date {
      font-size: 1.042vw !important;
    }

    &__body {
      @include flex-center;
      width: 100%;
      padding: 1.042vw 1.042vw 2.084vw;
      border-radius: $border-r-md;
      border-radius: 0.78125vw;
      background-color: $white;
    }

    &__content {
      font-size: 1.25vw !important;
    }


  }

  .backbtn {
    @include flex-center;
    width: 100%;
  }

</style>