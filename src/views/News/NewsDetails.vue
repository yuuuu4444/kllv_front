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
          <div class="newspost__tag"><p :class="`btn--tab${post.type}`">{{ post.tag }}</p></div>
          <div class="newspost__date"><p class="body--b3">｜</p></div>
          <div class="newspost__date"><p class="body--b3">{{ post.date }}</p></div>
        </div>
        <div class="newspost__title"><h2 class="bold">{{ post.title }}</h2></div>
      </div>
      <div class="newspost__body">
        <div class="newspost__content"><p class="body--b1" style="white-space: pre-line;">{{ post.content }}</p></div>
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

      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
      @include mobile {
        padding-left: 2%;
        padding-right: 2%;
      }
    }
    
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5em;
  
      p {
        color: black;
        @include mobile
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
      padding: clamp(12px, 0.9375vw, 18px);
      gap: clamp(40px, 3.125vw, 60px);
      border-radius: 0.78125vw;
      background-color: $white;
      
      @include mobile {
        padding: 8px;
        gap: 32px;
      }
    }

    &__info {
      display: flex;
      align-items: center;
      padding-left: 4px;
      gap: 8px;
      
      @include mobile {
        padding-left: 2px;
        gap: 4px;
      }
    }

    &__tag {
      p {
        font-size: clamp(16px, 1.25vw, 24px);
      }
    }

    &__title {
      h2 {
        font-size: clamp(20px, 2.084vw, 40px);
      }
    }

    &__date {
      p {
        font-size: clamp(12px, 0.833vw, 16px);
      }
    }

    &__body {
      @include flex-center;
      width: 100%;
      padding: clamp(12px, 0.9375vw, 18px) clamp(12px, 0.9375vw, 18px) clamp(24px, 1.875vw, 36px);
      border-radius: 0.78125vw;
      background-color: $white;
      
      @include mobile {
        padding: 8px 8px 16px;
      }
    }

    &__content {
      p {
        font-size: clamp(16px, 1.25vw, 24px);
      }
    }
  }

  .backbtn {
    @include flex-center;
    width: 100%;
  }
</style>