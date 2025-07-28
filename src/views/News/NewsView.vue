<script setup>
  import MainBanner from '@/components/MainBanner.vue'
  import { ref, computed } from 'vue'

// 篩選分類
  const newsTags = [
    {id: 1, name: "全部", type: 1},
    {id: 2, name: "公告", type: 1},
    {id: 3, name: "活動", type: 2},
    {id: 4, name: "補助", type: 2},
    {id: 5, name: "施工", type: 3},
    {id: 6, name: "防災", type: 3}
  ];
  const newsPosts = [
    {id: 1, title: "敬老愛心卡新制上路", type: 1, tag: "公告", date: "2025.07.04"},
    {id: 2, title: "長照家庭喘息服務補助，申請辦法看這裡", type: 2, tag: "補助", date: "2025.07.04"},
    {id: 3, title: "恐龍公園步道整修即將展開，預定 7 月底完成", type:3, tag: "施工", date: "2025.07.04"},
    {id: 4, title: "丹娜絲颱風即將來臨，里民防颱措施整理", type:3, tag: "防災", date: "2025.07.04"},
    {id: 5, title: "第 41 屆空龍馬拉松報名開始", type: 2, tag: "活動", date: "2025.07.04"},
    {id: 6, title: "社區夜間照明將升級為 LED，預計 9 月初完工", type: 3, tag: "施工", date: "2025.07.04"},
    {id: 7, title: "暑期育兒津貼開放申請，家長請把握時間", type: 2, tag: "補助", date: "2025.07.04"},
    {id: 8, title: "中元普渡時間與交通管制路段一次看", type: 1, tag: "公告", date: "2025.07.04"},
    {id: 9, title: "端午粽子吃不完！免費粽子大放送！", type: 2, tag: "活動", date: "2025.07.04"},
    {id: 10, title: "地震防災演練地點宣布", type: 3, tag: "防災", date: "2025.07.04"},
    {id: 11, title: "近期詐騙案件頻傳，提醒大家勿輕信陌生電話", type: 1, tag: "公告", date: "2025.07.04"},
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
  }
  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  function changeTag(tag) {
    selectedTag.value = tag.name
    currentPage.value = 1
  }
</script>

<template>
  <MainBanner image="/src/assets/banner/banner_news.jpg" title="最新消息" />
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
      <div class="newsboard__posts">
        <RouterLink
          v-for="post in currentPosts"
          :key="post.id"
          :to="`/news/${post.id}`"
          class="newsboard__post"
        >
          <button :class="`newsboard__tag btn--tab${post.type}`">{{ post.tag }}</button>
          <h5 class="newsboard_title regular">{{ post.title }}</h5>
          <p class="newsboard__date body--b2">{{ post.date }}</p>
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
    background-color: $primary_c50;
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

  .newsboard {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 3.125vw 0 6.25vw;
    gap: 3.125vw;

    &__tags {
      @include flex-center;
      width: 100%;
      height: 4.168vw;
      gap: 1.042vw;
      background-color: $white;
      border-radius: $border-r-md;
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

      h5 {
        font-size: 1.25vw;
        color: $black;
      }

      p {
        font-size: 1.042vw;
        margin-left: auto;
        color: $black;
      }
    }

  }
  .pagination {
    @include flex-center;
    gap: 1.666vw;
  }
</style>
