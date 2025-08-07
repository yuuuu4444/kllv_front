<script setup>
  import MainBanner from '@/components/MainBanner.vue';
  import { ref, onMounted, computed } from 'vue';
  import CreatePostModal from '@/components/CreatePostModal.vue';
  import Posts from '@/assets/data/Community/posts_test.json';
  import Categories from '@/assets/data/Community/posts_categories_test.json';

  const posts = ref([]);
  const selectedCategory = ref('所有主題');
  const baseURL = import.meta.env.BASE_URL;

  const categoryMap = new Map(Categories.map((c) => [c.category_no, c.category_name]));
  posts.value = Posts.filter((p) => !p.is_deleted).map((p) => ({
    ...p,
    category: categoryMap.get(p.category_no) || '未分類',
  }));

  /*
  onMounted(async () => {
    const postRes = await fetch('/src/assets/data/Community/posts_test.json');
    const categoryRes = await fetch('/src/assets/data/Community/posts_categories_test.json');

    const postData = await postRes.json();
    const categoryData = await categoryRes.json();

    posts.value = postData
      .filter((p) => !p.is_deleted)
      .map((p) => {
        const categoryItem = categoryData.find((c) => c.category_no == p.category_no);
        return {
          ...p,
          category: categoryItem ? categoryItem.category_name : '未分類',
        };
      });
  });
  */

  // 篩選
  const filteredPosts = computed(() => {
    if (selectedCategory.value === '所有主題') return posts.value;

    return posts.value.filter((p) => p.category === selectedCategory.value);
  });

  // console.log(posts);

  // 時間換算
  const passTime = (datetime) => {
    const now = new Date();
    const past = new Date(datetime);
    const diffTime = now - past;

    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    if (hours < 1) return '剛剛';
    if (hours < 24) return `${hours} 小時前`;
    return past.toISOString().slice(0, 10);
  };

  const currentPage = ref(1);
  const pageSize = 6;

  const pagedReports = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredPosts.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() => Math.ceil(filteredPosts.value.length / pageSize));

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);

  const goPrev = () => {
    if (!isFirstPage.value) currentPage.value--;
  };

  const goNext = () => {
    if (!isLastPage.value) currentPage.value++;
  };

  const showModal = ref(false);
</script>

<template>
  <MainBanner
    image="assets/banner/banner_community.jpg"
    title="里民開講"
  />
  <div class="community">
    <div class="community__container">
      <div class="community__action-bar">
        <div class="community__category-group">
          <button
            class="community__category__1 btn--tag"
            @click="
              () => {
                selectedCategory = '所有主題';
                currentPage = 1;
              }
            "
          >
            所有主題
          </button>
          <button
            class="community__category__2 btn--tag"
            @click="
              () => {
                selectedCategory = '舊物交換';
                currentPage = 1;
              }
            "
          >
            舊物交換
          </button>
          <button
            class="community__category__3 btn--tag"
            @click="
              () => {
                selectedCategory = '生活抱怨';
                currentPage = 1;
              }
            "
          >
            生活抱怨
          </button>
          <button
            class="community__category__4 btn--tag"
            @click="
              () => {
                selectedCategory = '揪團來買';
                currentPage = 1;
              }
            "
          >
            揪團來買
          </button>
        </div>
        <div class="community__category-phone">
          <h2 class="community__category-title bold">文章總覽</h2>
          <select
            class="community__category-select"
            name="category_no"
            id=""
            v-model="selectedCategory"
          >
            <option value="所有主題">所有主題</option>
            <option value="舊物交換">舊物交換</option>
            <option value="生活抱怨">生活抱怨</option>
            <option value="揪團來買">揪團來買</option>
          </select>
        </div>
        <button
          class="community__create-btn btn--tag"
          @click="showModal = true"
        >
          我要發文
        </button>
        <button
          class="community__phone-btn"
          @click="showModal = true"
        >
          +
        </button>
      </div>

      <CreatePostModal v-model:visible="showModal" />

      <div
        class="community-wrapper"
        data-aos="fade"
      >
        <ul class="community-wrapper__list">
          <li
            class="community-wrapper__item"
            v-for="post in pagedReports"
            :key="post.post_no"
          >
            <RouterLink
              :to="`/community/${post.post_no}`"
              class="community-wrapper__link"
            >
              <div class="community-wrapper__image">
                <img
                  :src="`${baseURL}${post.banner_image}`"
                  alt=""
                />
              </div>
              <div class="community-wrapper__content">
                <h5 class="community-wrapper__title bold">
                  【{{ post.category }}】{{ post.title }}
                </h5>
                <div class="community-wrapper__meta">
                  <div class="community-wrapper__author-image">
                    <img
                      src="#"
                      alt=""
                    />
                  </div>
                  <p class="community-wrapper__author body--b3">里民</p>
                  <p class="community-wrapper__time body--b3">
                    &bull;{{ passTime(post.created_at) }}
                  </p>
                </div>
                <p class="community-wrapper__desc body--b3">
                  {{ post.content }}
                </p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div
        class="community-pagination"
        data-aos="fade"
      >
        <button
          class="community-pagination__prev btn--changepage"
          @click="goPrev"
        >
          &lt;
        </button>
        <p class="community-pagination__current">{{ currentPage }} / {{ totalPages }}</p>
        <button
          class="community-pagination__next btn--changepage"
          @click="goNext"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
  <div></div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .community {
    background-color: $primary-c000;

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
    }

    &__action-bar {
      @include flex-space-between;
      width: 100%;
      margin: 3.125vw 0 6.25vw;
      flex-wrap: wrap;
    }

    &__category-group {
      width: 83%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background-color: $white;
      padding: 10px 5%;
      border-radius: $border-r-md;
      flex-wrap: wrap;
    }

    &__category {
      &__1 {
        background-color: $primary-c700;
        border: none;
        border: 5px solid $primary-c700;
      }

      &__1:hover {
        color: $primary-c700;
      }

      &__2 {
        background-color: #ca877b;
        border: 5px solid #ca877b;
      }

      &__2:hover {
        color: #ca877b;
      }

      &__3 {
        background-color: #6782a4;
        border: 5px solid #6782a4;
      }

      &__3:hover {
        color: #6782a4;
      }

      &__4 {
        background-color: #719469;
        border: 5px solid #719469;
      }

      &__4:hover {
        color: #719469;
      }
    }

    &__create-btn {
      background-color: #959595;
      border: 5px solid #959595;
    }

    &__create-btn:hover {
      color: #959595;
    }

    &__category-phone {
      display: none;
    }

    &__phone-btn {
      display: none;
    }

    .community-wrapper {
      margin-bottom: 60px;

      &__item {
        border-bottom: 1px solid #d9d9d9;
      }

      &__item:last-child {
        border-bottom: none;
      }

      &__link {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        padding: 3vh 0;
        color: inherit;
        flex-wrap: wrap-reverse;
      }

      &__image {
        // @include flex-center;
        width: 200px;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: $border-r-md;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      &__meta {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      &__author-image {
        background-color: #ccc;
        width: 25px;
        aspect-ratio: 1;
        border-radius: 50%;
      }

      &__content {
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }

    .community-pagination {
      @include flex-center;
      gap: 30px;

      &__current {
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.1em;
        width: 80px;
        padding: 14px 0;
        border: 1px solid $black;
        border-radius: $border-r-xs;
        background-color: $white;
      }
      &__next {
        color: $white;
      }
      &__prev{
        color:$white;
      }
    }

    @include mobile {
      .community {
        &__container {
          padding-left: 2%;
          padding-right: 2%;
        }

        &__category-group {
          display: none;
        }

        &__create-btn {
          display: none;
        }

        &__action-bar {
          justify-content: center;
        }

        &__category {
          &-phone {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 100%;
          }

          &-select {
            width: 50%;
            height: 30px;
            background-color: $white;
            border: 1px solid $primary-c700;
            color: $primary-c700;

            font-size: 16px;
            line-height: 26px;
            letter-spacing: 0.1em;
          }
        }
        &__phone-btn {
          display: block;
          width: 50px;
          aspect-ratio: 1;
          border-radius: 50%;
          border: none;
          background-color: $highlight-c;
          color: $white;
          font-size: 30px;
          cursor: pointer;
          position: fixed !important;
          bottom: 15vh !important;
          right: 5vw !important;
          z-index: 9999 !important;
        }
      }

      .community-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        &__item {
          border: none;
        }

        &__link {
          flex-direction: column-reverse;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: $white;
          border-radius: $border-r-lg;
        }

        &__content,
        &__image {
          width: 85%;
        }
      }
    }
  }
</style>
