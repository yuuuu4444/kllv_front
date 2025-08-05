<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { defineProps, ref } from 'vue';
  import PostData from '@/assets/data/Community/posts_test.json';
  import Categories from '@/assets/data/Community/posts_categories_test.json';
  import ReportModal from '@/components/ReportModal.vue';

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

  const handleDeletePost = () => {
    const confirm = window.confirm('您確定要刪除此則貼文嗎?');
    if (confirm) {
      console.log('確定');
    } else {
      console.log('取消');
    }
  };

  const showModal = ref(false);
  const openReportModal = () => {
    showModal.value = true;
    menuPostVisible.value = false;
    menuCommentVisible.value = false;
  };
</script>

<template>
  <SubBanner title="里民開講" />
  <div class="post-detail">
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
                <li class="post-detail__menu-item">
                  <button class="post-detail__menu-btn">
                    <svg
                      class="post-detail__menu-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17.4595V20.4995C3 20.7795 3.22 20.9995 3.5 20.9995H6.54C6.67 20.9995 6.8 20.9495 6.89 20.8495L17.81 9.93951L14.06 6.18951L3.15 17.0995C3.05 17.1995 3 17.3195 3 17.4595ZM20.71 7.03951C20.8027 6.947 20.8762 6.83711 20.9264 6.71614C20.9766 6.59517 21.0024 6.46548 21.0024 6.33451C21.0024 6.20355 20.9766 6.07386 20.9264 5.95289C20.8762 5.83192 20.8027 5.72203 20.71 5.62951L18.37 3.28951C18.2775 3.19681 18.1676 3.12326 18.0466 3.07308C17.9257 3.0229 17.796 2.99707 17.665 2.99707C17.534 2.99707 17.4043 3.0229 17.2834 3.07308C17.1624 3.12326 17.0525 3.19681 16.96 3.28951L15.13 5.11951L18.88 8.86951L20.71 7.03951Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="post-detail__menu-text">編輯貼文</span>
                  </button>
                </li>
                <li class="post-detail__menu-item">
                  <button class="post-detail__menu-btn">
                    <svg
                      class="post-detail__menu-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 5V19C18 19.5 17.5 20 17 20H12H7C6.5 20 6 19.5 6 19V5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4 5H20"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 4H14M10 9V16M14 9V16"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      class="post-detail__menu-text"
                      @click="handleDeletePost"
                    >
                      刪除貼文
                    </span>
                  </button>
                </li>
                <li class="post-detail__menu-item">
                  <button class="post-detail__menu-btn">
                    <div>
                      <img
                        src="/src/assets/icon/icon_report.svg"
                        alt=""
                      />
                    </div>
                    <span
                      class="post-detail__menu-text"
                      @click="openReportModal"
                    >
                      檢舉貼文
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <ReportModal v-model:visible="showModal" />

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
                  <li class="post-detail__comment-menu-item">
                    <button
                      class="post-detail__menu-btn"
                      @click="openReportModal"
                    >
                      <div>
                        <img
                          src="/src/assets/icon/icon_report.svg"
                          alt=""
                          class="post-detail__menu-icon"
                        />
                      </div>
                      <span class="post-detail__menu-text">檢舉留言</span>
                    </button>
                  </li>
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
    background-color: white;
    padding-bottom: 30px;
    background-image:
      url(/src/assets/image/background_image.png), url(/src/assets/image/background_color.svg);
    background-repeat: repeat, no-repeat;
    background-position: bottom;

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
      background-color: white;
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
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 5px;
      }

      &-btn {
        background-color: transparent;
        border: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;
      }

      &-text,
      &-icon {
        display: block;
      }

      &-text {
        font-family: $font-sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
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
        background-color: white;
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

        &-item {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 5px;
        }
      }
    }

    &__reply {
      width: 90%;
      margin: auto;

      &-wrapper {
        width: 90%;
        margin: auto;
        background-color: $primary-c700;
        border-radius: $border-r-md;
        padding: 10px;
        position: relative;
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
