<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';

  const { VITE_API_BASE } = import.meta.env;

  const props = defineProps({
    limit: {
      type: Number,
      default: 3,
    },
    showHeader: Boolean,
    showFooter: Boolean,
  });

  const newsTags = ref([]);
  const fetchNewsCategories = async () => {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/news/categories_get.php`);
      const data = await res.json();

      // 加上 type
      newsTags.value = data.data.map((c) => ({
        no: c.category_no,
        name: c.category_name,
        type: ['公告'].includes(c.category_name)
          ? 1
          : ['活動', '補助'].includes(c.category_name)
            ? 2
            : ['施工', '防災'].includes(c.category_name)
              ? 3
              : 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const newsPosts = ref([]);
  const fetchNewsPosts = async () => {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/news/news_get1.php`);
      const data = await res.json();

      // 加上 type
      newsPosts.value = data.data.map((n) => {
        const tag = newsTags.value.find((t) => t.no === n.category_no);
        return {
          ...n,
          type: tag ? tag.type : 1,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const limitedPosts = computed(() => newsPosts.value.slice(0, props.limit));

  onMounted(async () => {
    await fetchNewsCategories();
    await fetchNewsPosts();
  });
</script>

<template>
  <div class="newsboard">
    <div
      class="newsboard__header"
      v-if="showHeader"
    >
      <h5 class="bold">最新消息</h5>
    </div>

    <div class="newsboard__posts">
      <RouterLink
        v-for="post in limitedPosts"
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

    <div
      class="newsboard__footer"
      v-if="showFooter"
    >
      <RouterLink to="/news">
        <p class="body--b4">查看更多最新消息</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  .newsboard {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 6.25vw 0 3.125vw;
    // gap: 3.125vw;
    // background-color: $primary_c000;

    &__header {
      @include flex-center;
      width: 100%;
      padding: 1.5625vw 3.125vw;
      background-color: $primary-c700;
      border-top-left-radius: $border-r-md;
      border-top-right-radius: $border-r-md;
      @include mobile {
        padding: 3.125vw;
      }
      h5 {
        color: $white;
      }
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 14px;
      p {
        color: $primary-c700;
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
        // border-top-left-radius: $border-r-md;
        // border-top-right-radius: $border-r-md;
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
</style>
