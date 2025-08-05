<script setup>
  import { ref, computed } from 'vue';
  import MainBanner from '@/components/MainBanner.vue';
  import News from '@/assets/data/News/News';

// 篩選分類
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
      return News
    } else {
      return News.filter(post => post.tag == selectedTag.value)
    }
  });

// 切換頁數
  const postsPerPage = 10;
  const currentPage = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(filteredPosts.value.length / postsPerPage)
  });

  const currentPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredPosts.value.slice(startIndex, endIndex)
  });

  function prevPage() {
    if (currentPage.value > 1) currentPage.value--
  };
  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  };

  function changeTag(tag) {
    selectedTag.value = tag.name
    currentPage.value = 1
  };
</script>

<template>
  <MainBanner image="assets/banner/banner_news2.jpg" title="最新消息" />
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/index">
        <p class="body--b3">首頁</p>
      </RouterLink>      
        <p class="body--b3">/</p>
      <RouterLink to="/news">
        <p class="body--b3">最新消息</p>
      </RouterLink>
    </div>
    <div class="newsboard">
      <div class="newsboard__tags">
        <button
          v-for="tag in newsTags"
          :key="tag.id"
          :class="`newsboard__tag btn--tab${tag.type} { active: selectedTag == tag.name }`"
          @click="changeTag(tag)"
        >
          {{ tag.name }}
        </button>
      </div>
      <div class="newsboard__tags--select">
        <select v-model="selectedTag">
          <option
            v-for="tag in newsTags"
            :key="tag.id"
            :value="tag.name"
          >
            {{ tag.name }}
          </option>
        </select>
      </div>
      <div class="newsboard__posts">
        <RouterLink
          v-for="post in currentPosts"
          :key="post.id"
          :to="`/news/${post.id}`"
          class="newsboard__post"
        >
          <!-- desktop -->
          <div class="newsboard__tag--d"><p :class="`btn--tab${post.type}`">{{ post.tag }}</p></div>
          <div class="newsboard__title--d"><h5 class="regular">{{ post.title }}</h5></div>
          <div class="newsboard__date--d"><p class="body--b3">{{ post.date }}</p></div>

          <!-- mobile -->
          <div class="newsboard__info--m">
            <div class="newsboard__tag--m"><p :class="`btn--tab${post.type}`">{{ post.tag }}</p></div>
            <div class="newsboard__date--m"><p class="body--b3">｜</p></div>
            <div class="newsboard__date--m"><p class="body--b3">{{ post.date }}</p></div>
          </div>
          <div class="newsboard__title--m"><h2 class="regular">{{ post.title }}</h2></div>
        </RouterLink>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination__prev btn--changepage" @click="prevPage" :disabled="currentPage === 1"><</div>
      <div class="pagination__status btn--page">{{ currentPage }} / {{ totalPages }}</div>
      <div class="pagination__next btn--changepage" @click="nextPage" :disabled="currentPage === totalPages">></div>
    </div>
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
      border-radius: $border-r-md;;
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
          border-radius: $border-r-md;;
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
        background-color: rgba(255, 255, 255, 0.75)
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
</style>
