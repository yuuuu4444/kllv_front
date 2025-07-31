<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { defineProps, ref } from 'vue';
  import PostData from '@/assets/data/Community/posts_test.json';
  import Categories from '@/assets/data/Community/posts_categories_test.json';

  const props = defineProps(['post_no']);
  const postNo = props.post_no;

  const postItem = PostData.find((item) => item.post_no === Number(postNo));
  const categoryItem = Categories.find((item) => item.category_no === postItem?.category_no);
  const categoryName = categoryItem ? categoryItem.category_name : '未分類';

  const menuPostVisible = ref(false);
  const menuCommentVisible = ref(false);
  const togglePostMenu = () => {
    menuPostVisible.value = !menuPostVisible.value;
  };

  const toggleCommentMenu = () => {
    menuCommentVisible.value = !menuCommentVisible.value;
  };
</script>

<template>
  <div class="post-detail">
    <SubBanner title="里民開講" />
    <div class="post-detail__container">
      <section
        class="post-detail__body"
        v-if="postItem"
      >
        <div class="post-detail__header">
          <h5 class="post-detail__category bold">【{{ categoryName }}】</h5>
          <h5 class="post-detail__title bold">
            {{ postItem.title }}
          </h5>
        </div>

        <div class="post-detail__wrapper">
          <div class="post-detail__meta">
            <div class="post-detail__user-info">
              <div class="post-detail__author-image">
                <img
                  src="#"
                  alt=""
                />
              </div>
              <p class="post-detail__author body--b2">陳聲聲</p>
              <p class="post-detail__time body--b2">2小時前</p>
              <p class="post-detail__edit body--b2">10分鐘前 已編輯</p>
            </div>
            <div class="post-detail__menu">
              <button
                class="post-detail__menu-toggle"
                @click="togglePostMenu"
              >
                <img
                  src="/src/assets/icon/icon_actionMenu.svg"
                  alt=""
                />
              </button>
              <ul
                class="post-detail__menu-list"
                v-if="menuPostVisible"
              >
                <li class="post-detail__menu-item">編輯貼文</li>
                <li class="post-detail__menu-item">刪除貼文</li>
              </ul>
            </div>
          </div>

          <div class="post-detail__content">
            <p class="post-detail__desc body--b2">{{ postItem.content }}</p>
            <div class="post-detail__images">
              <img
                src="https://picsum.photos/500/300"
                alt=""
              />
              <img
                src="https://picsum.photos/500/300"
                alt=""
              />
              <img
                src="https://picsum.photos/500/300"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section class="post-detail__comment">
        <ul class="post-detail__comment-list">
          <li class="post-detail__comment-wrapper">
            <div class="post-detail__comment-item">
              <div class="post-detail__comment-header">
                <div class="post-detail__comment-user">
                  <div class="post-detail__comment-user-image">
                    <img
                      src="#"
                      alt=""
                    />
                  </div>
                  <p class="post-detail__comment-author body--b3">黃又新</p>
                  <p class="post-detail__comment-time body--b3">40分鐘前</p>
                </div>
                <p class="post-detail__comment-no body--b3">b1</p>
              </div>
              <p class="post-detail__comment-text body--b2">有興趣</p>
              <div class="post-detail__comment-menu">
                <button
                  class="post-detail__comment-menu-toggle"
                  @click="toggleCommentMenu"
                >
                  <img
                    src="/src/assets/icon/icon_actionMenu.svg"
                    alt=""
                  />
                </button>
                <ul
                  class="post-detail__comment-menu-list"
                  v-if="menuCommentVisible"
                >
                  <li class="post-detail__comment-menu-item">檢舉留言</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section class="post-detail__reply">
        <div class="post-detail__reply-wrapper">
          <textarea
            name=""
            id=""
            class="post-detail__reply-textarea"
            placeholder="以王小明的身分發表留言..."
          ></textarea>
          <button
            type="submit"
            class="post-detail__reply-submit"
          >
            <img
              src="/src/assets/icon/icon_commentSend.svg"
              alt=""
            />
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .post-detail {
    background-color: $white;

    &__container {
      padding: 6.25vw 18.75vw;
      display: flex;
      flex-direction: column;
      gap: 10vh;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 3vh 5vh;
      border-radius: $border-r-md;
      background-color: $primary-c700;
      color: $white;
      flex-wrap: wrap;
    }

    &__wrapper {
      border: 1px solid $black;
      border-radius: $border-r-md;
      padding: 3vh 5vh;
      display: flex;
      flex-direction: column;
      gap: 30px;
      box-shadow: 0 8px $primary-c700;
    }

    &__meta {
      @include flex-space-between;
    }

    &__user-info {
      width: 50%;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    &__author-image {
      background-color: #ccc;
      width: 30px;
      aspect-ratio: 1;
      border-radius: 50%;
    }

    &__menu {
      position: relative;

      &-toggle {
        background-color: transparent;
        border: none;
        cursor: pointer;
      }

      &-list {
        position: absolute;
        top: 20px;
        right: 0;
        width: 150px;
        background-color: $primary-c50;
        padding: 8px 5px;
        border-radius: $border-r-md;
      }

      &-item {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.2em;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__images {
      @include flex-space-between;
      flex-wrap: wrap;

      img {
        width: 30%;
        object-fit: cover;
        flex: 1 1 1;
      }
    }

    &__comment {
      width: 95%;
      margin: auto;

      &-list {
        border: 1px solid $black;
        border-radius: $border-r-md;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      &-wrapper {
        width: 90%;
        margin: auto;
        background-color: $primary-c700;
        border-radius: $border-r-md;
        padding: 10px;
      }

      &-item {
        background-color: $white;
        border: 1px solid $primary-c700;
        border-radius: $border-r-md;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 15px;
      }

      &-header {
        @include flex-space-between;
      }

      &-user {
        @include flex-space-between;
        gap: 10px;

        &-image {
          background-color: #ccc;
          width: 30px;
          aspect-ratio: 1;
          border-radius: 50%;
        }
      }

      &-menu {
        position: relative;

        &-toggle {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }

        &-list {
          position: absolute;
          top: 20px;
          left: 0;
          width: 150px;
          background-color: $primary-c50;
          padding: 8px 5px;
          border-radius: $border-r-md;
        }
      }
    }

    &__reply {
      width: 90%;
      margin: auto;
      // position: fixed;

      &-wrapper {
        width: 90%;
        margin: auto;
        background-color: $primary-c700;
        border-radius: $border-r-md;
        padding: 10px;
        position: relative;
        // position: fixed;
      }

      &-textarea {
        resize: none;
        width: 100%;
        height: 150px;
        background-color: $white;
        border: 1px solid $primary-c700;
        border-radius: $border-r-md;
        padding: 15px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.2em;
      }

      &-submit {
        background-color: transparent;
        border: none;
        cursor: pointer;
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }

    @include mobile {
      &__container {
        padding: 6.25vw 2.5vw;
      }

      &__images {
        flex-direction: column;
        gap: 10px;

        img {
          width: 100%;
        }
      }
    }
  }
</style>
