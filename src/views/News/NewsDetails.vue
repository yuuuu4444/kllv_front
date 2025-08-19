<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import router from '@/router';
  import SubBanner from '@/components/SubBanner.vue';

  const { VITE_API_BASE } = import.meta.env;

  // 分類資料
  const newsTags = ref([{ no: 0, name: '全部', type: 1 }]);
  const fetchNewsPostsCategories = async () => {
    try {
      // 模擬 API：本地 JSON 或 MAMP API
      const res = await fetch(`${VITE_API_BASE}/api/news/categories_get.php`);
      const data = await res.json();

      // 加上 type
      newsTags.value = [
        { no: 0, name: '全部', type: 1 },
        ...data.data.map(c => ({
          no: c.category_no,
          name: c.category_name,
          type: (
            ['公告'].includes(c.category_name) ? 1 :
            ['活動','補助'].includes(c.category_name) ? 2 :
            ['施工','防災'].includes(c.category_name) ? 3 : 1
          )
        }))
      ];
    } catch (error) {
      console.error(error);
    }
  };

  // 消息資料
  const newsPosts = ref([]);
  const fetchNewsPosts = async () => {
    try {
      // 模擬 API：本地 JSON 或 MAMP API
      const res = await fetch('/src/assets/data/News/news.json');
      const data = await res.json();

      // 加上 type
      newsPosts.value = data.map(n => {
        const tag = newsTags.value.find(t => t.no === n.category_no);
        return {
          ...n,
          type: tag ? tag.type : 1
        };
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // 消息編號
  const route = useRoute();
  const postNo = Number(route.params.news_no);
  const post = computed(() => {
    return newsPosts.value.find(p => p.news_no === postNo);
  });
  
  // 返回上頁
  const Back = () => {
    router.back();
  };

  // onMounted
  onMounted(async () => {
    await fetchNewsPostsCategories();
    await fetchNewsPosts();
  });
</script>

<template>
  <SubBanner title="最新消息" />
  <div class="newspage">
    <div class="newspage__container">
      <div class="breadcrumb">
        <RouterLink to="/">
          <p class="breadcrumb__home body--b2">首頁</p>
        </RouterLink>
        <RouterLink to="/news">
          <p class="body--b2">&#47;最新消息</p>
        </RouterLink>
        <p class="body--b2">&#47;消息詳細</p>
      </div>
      <div
        class="newspost"
        v-if="post"
      >
        <div class="newspost__header">
          <div class="newspost__info">
            <div class="newspost__tag">
              <p :class="`btn--tab${post.type}`">{{ post.category_name }}</p>
            </div>
            <div class="newspost__date"><p class="body--b3">｜</p></div>
            <div class="newspost__date">
              <p class="body--b3">{{ post.published_at }}</p>
            </div>
          </div>
          <div class="newspost__title">
            <h2 class="bold">{{ post.title }}</h2>
          </div>
        </div>
        <div class="newspost__body">
          <div class="newspost__content" v-html="post.content"></div>
        </div>
      </div>
      <div v-else>
        <h2 class="bold">找不到這篇新聞</h2>
      </div>
      <div class="backbtn">
        <button
          class="backbtn__btn btn--process"
          @click="Back"
        >
          返回上一頁
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  .newspage {
    background-color: $primary_c000;
    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;

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
      // display: flex;
      // align-items: center;
      // gap: 0.5em;
      display: flex;
      align-items: center;
      gap: 5px;
      // p {
      //   color: black;
      // }
      p {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.2em;
        color: black;
        @include mobile {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.1em;
        }
      }
      &__home {
        color: $primary-c700 !important;
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
        border-radius: $border-r-md;
        background-color: $white;

        @include mobile {
          padding: 8px 8px 12px;
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
        border-radius: $border-r-md;
        background-color: $white;

        @include mobile {
          padding: 8px 8px 16px;
        }
      }

      &__content {
          font-size: clamp(16px, 1.25vw, 24px);
          line-height: 150%;
          letter-spacing: 0.2em;
          @include mobile {
            letter-spacing: 0.1em
          }
      }
    }

    .backbtn {
      @include flex-center;
      width: 100%;
    }
  }
</style>
