<script setup>
  import { ref, computed, onMounted } from 'vue';
  import MainBanner from '@/components/MainBanner.vue';

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
      const res = await fetch(`${VITE_API_BASE}/api/news/news_get.php`);
      const data = await res.json();

      // 加上 type
      newsPosts.value = data.data.map(n => {
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


  // 過濾消息
  const selectedTag = ref('全部');
  const filteredPosts = computed(() => {
    if (selectedTag.value === '全部') return newsPosts.value;
    return newsPosts.value.filter(post => post.category_name === selectedTag.value);
  });

  // 設定分頁
  const postsPerPage = 10;
  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));

  const currentPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    return filteredPosts.value.slice(start, start + postsPerPage);
  });
  
  // 控制分頁
  const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
  const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

  // 切換分類
  const changeTag = (tag) => {
    selectedTag.value = tag.name;
    currentPage.value = 1;
  };

  // onMounted
  onMounted(async () => {
    await fetchNewsPostsCategories();
    await fetchNewsPosts();
  });
</script>

<template>
  <MainBanner
    image="assets/banner/banner_news2.jpg"
    title="最新消息"
    titleAos="fade"
  />
  <div class="newspage">
    <div class="newspage__container">
      <div class="breadcrumb">
        <RouterLink to="/">
          <p class="breadcrumb__home body--b2">首頁</p>
        </RouterLink>
        <RouterLink to="/news">
          <p class="body--b2">&#47;最新消息</p>
        </RouterLink>
      </div>
      <div class="newsboard">
        <div
          class="newsboard__tags"
          data-aos="fade"
        >
          <button
            v-for="tag in newsTags"
            :key="tag.no"
            :class="`newsboard__tag btn--tab${tag.type} { active: selectedTag.value == tag.name }`"
            @click="changeTag(tag)"
          >
            {{ tag.name }}
          </button>
        </div>
        <div class="newsboard__tags--select">
          <select v-model="selectedTag">
            <option
              v-for="tag in newsTags"
              :key="tag.no"
              :value="tag.name"
            >
              {{ tag.name }}
            </option>
          </select>
        </div>
        <div
          class="newsboard__posts"
          data-aos="fade"
        >
          <RouterLink
            v-for="post in currentPosts"
            :key="post.news_no"
            :to="`/news/${post.news_no}`"
            class="newsboard__post"
          >
            <!-- desktop -->
            <div class="newsboard__tag--d">
              <p :class="`btn--tab${post.type}`">{{ post.category_name }}</p>
            </div>
            <div class="newsboard__title--d">
              <h5 class="regular">{{ post.title }}</h5>
            </div>
            <div class="newsboard__date--d">
              <p class="body--b3">{{ post.published_at }}</p>
            </div>

            <!-- mobile -->
            <div class="newsboard__info--m">
              <div class="newsboard__tag--m">
                <p :class="`btn--tab${post.type}`">{{ post.category_name }}</p>
              </div>
              <div class="newsboard__date--m"><p class="body--b3">｜</p></div>
              <div class="newsboard__date--m">
                <p class="body--b3">{{ post.published_at }}</p>
              </div>
            </div>
            <div class="newsboard__title--m">
              <h2 class="regular">{{ post.title }}</h2>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="pagination">
        <div
          class="pagination__prev btn--changepage"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          <
        </div>
        <div class="pagination__status btn--page">{{ currentPage }} / {{ totalPages }}</div>
        <div
          class="pagination__next btn--changepage"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';
  @import 'aos/dist/aos.css';

  .newspage {
    background-color: $primary_c000;
    &__container {
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

    .newsboard {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 6.25vw 0 3.125vw;
      gap: 3.125vw;

      &__tags {
        @include flex-center;
        width: 100%;
        // height: 4.168vw;
        aspect-ratio: 15 / 1;
        gap: 1.042vw;
        background-color: $white;
        border-radius: $border-r-md;
        @include mobile {
          display: none;
        }

        button {
          font-size: clamp(16px, 1.25vw, 24px);
        }
      }

      &__tags--select {
        display: none;
        @include mobile {
          display: block;
          width: 100%;
          select {
            width: 100%;
            aspect-ratio: 15 / 1;
            padding: 0.5em;
            font-size: clamp(16px, 1.25vw, 24px);
            letter-spacing: 0.1em;
            background-color: $white;
            border-radius: $border-r-md;
            border: none;
          }
          option {
            padding: 0.5em;
            font-size: clamp(16px, 1.25vw, 24px);
            letter-spacing: 0.1em;
          }
        }
      }

      &__posts {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      &__post {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 1.5625vw 3.125vw;
        gap: 3.125vw;
        background-color: $white;

        &:first-child {
          border-top-left-radius: $border-r-md;
          border-top-right-radius: $border-r-md;
        }
        &:last-child {
          border-bottom-left-radius: $border-r-md;
          border-bottom-right-radius: $border-r-md;
        }
        &:nth-child(even) {
          background-color: rgba(255, 255, 255, 0.75);
        }

        @include mobile {
          flex-direction: column;
          align-items: flex-start;
          padding: 8px 8px 12px;
          gap: 32px;
        }
      }

      &__tag--d {
        p {
          font-size: clamp(16px, 1.25vw, 24px);
        }
        @include mobile {
          display: none;
        }
      }

      &__title--d {
        h5 {
          font-size: clamp(20px, 1.25vw, 24px);
          width: 33vw;
          color: $black;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @include desktop {
            width: 45vw;
          }
        }
        @include mobile {
          display: none;
        }
      }

      &__date--d {
        margin-left: auto;
        p {
          font-size: clamp(12px, 0.833vw, 16px);
          color: $black;
        }
        @include mobile {
          display: none;
        }
      }

      &__info--m {
        display: none;
        @include mobile {
          display: flex;
          align-items: center;
          padding-left: 2px;
          gap: 4px;
        }
      }

      &__tag--m {
        display: none;
        @include mobile {
          display: block;
          p {
            font-size: clamp(16px, 1.25vw, 24px);
          }
        }
      }

      &__title--m {
        display: none;
        @include mobile {
          display: block;
          h2 {
            color: $black;
          }
        }
      }

      &__date--m {
        display: none;
        @include mobile {
          display: block;
          p {
            font-size: clamp(12px, 0.833vw, 16px);
            color: $black;
          }
        }
      }
    }

    .pagination {
      @include flex-center;
      gap: 1.666vw;
    }
  }
</style>
