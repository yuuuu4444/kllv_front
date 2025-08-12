<!-- src/views/Member/MemberPosts.vue -->
<template>
  <div class="postsPage">
    <!-- 手機版 header  -->
    <MemberMobileHeader
      v-if="mobileView === 'index'"
      title="帳戶管理"
      @back="goBackToMenu"
    />
    <MemberMobileHeader
      v-else-if="mobileView === 'posts'"
      title="討論區足跡"
      @back="mobileView = 'index'"
    />
    <MemberMobileHeader
      v-else-if="mobileView === 'replies'"
      title="討論區足跡"
      @back="mobileView = 'index'"
    />

    <h5 class="postsPage__title bold">討論區足跡</h5>

    <!-- 桌面版：表格 -->
    <div class="postsPage__desktopView">
      <!-- Tab切換按鈕 -->
      <div class="desktopTabs">
        <button
          class="desktopTabs__button"
          :class="{ 'is-active': desktopActiveTab === 'posts' }"
          @click="desktopActiveTab = 'posts'"
        >
          已發布貼文
        </button>
        <button
          class="desktopTabs__button"
          :class="{ 'is-active': desktopActiveTab === 'replies' }"
          @click="desktopActiveTab = 'replies'"
        >
          已回覆貼文
        </button>
      </div>
      <!-- 1. 貼文表格 -->
      <div
        v-show="desktopActiveTab === 'posts'"
        class="postSection"
      >
        <!-- <h5 class="postSection__title">貼文</h5> -->
        <table class="postTable">
          <thead>
            <tr>
              <th>發布日期</th>
              <th>文章標題</th>
              <th>編輯</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in paginatedPosts"
              :key="post.post_no"
              class="postTable__row"
              :class="{ 'is-reported': post.is_reported }"
            >
              <td>{{ post.created_at }}</td>

              <td>
                <span v-if="post.is_reported">{{ post.title }}</span>
                <router-link
                  v-else
                  :to="`/community/${post.post_no}`"
                  class="postTable__link"
                >
                  {{ post.title }}
                </router-link>
              </td>

              <!-- 編輯按鈕 -->
              <td class="postTable__cell--action">
                <router-link
                  :to="`/community/${post.post_no}/edit`"
                  :class="['iconButton', { 'iconButton--disabled': post.is_reported }]"
                  :event="post.is_reported ? '' : 'click'"
                  aria-label="編輯貼文"
                >
                  <svg
                    class="iconButton__icon"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                    />
                  </svg>
                </router-link>
              </td>

              <!-- 刪除按鈕 -->
              <td class="postTable__cell--action">
                <button
                  class="iconButton"
                  :disabled="post.is_reported"
                  @click="!post.is_reported && deletePost(post.post_no)"
                  :class="{ 'iconButton--disabled': post.is_reported }"
                  aria-label="刪除貼文"
                >
                  <svg
                    class="iconButton__icon iconButton__icon--delete"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 4C7.581 4 4 7.582 4 12C4 16.418 7.581 20 12 20C16.419 20 20 16.418 20 12C20 7.582 16.419 4 12 4ZM15.707 14.293C15.8945 14.4805 15.9998 14.7348 15.9998 15C15.9998 15.2652 15.8945 15.5195 15.707 15.707C15.5195 15.8945 15.2652 15.9998 15 15.9998C14.7348 15.9998 14.4805 15.8945 14.293 15.707L12 13.414L9.707 15.707C9.61435 15.8002 9.50419 15.8741 9.38285 15.9246C9.26152 15.9751 9.13141 16.001 9 16.001C8.86859 16.001 8.73848 15.9751 8.61715 15.9246C8.49581 15.8741 8.38565 15.8002 8.293 15.707C8.10553 15.5195 8.00021 15.2652 8.00021 15C8.00021 14.7348 8.10553 14.4805 8.293 14.293L10.586 12L8.293 9.707C8.10549 9.51949 8.00015 9.26518 8.00015 9C8.00015 8.73482 8.10549 8.48051 8.293 8.293C8.48051 8.10549 8.73482 8.00015 9 8.00015C9.26518 8.00015 9.51949 8.10549 9.707 8.293L12 10.586L14.293 8.293C14.4805 8.10549 14.7348 8.00015 15 8.00015C15.2652 8.00015 15.5195 8.10549 15.707 8.293C15.8945 8.48051 15.9998 8.73482 15.9998 9C15.9998 9.26518 15.8945 9.51949 15.707 9.707L13.414 12L15.707 14.293Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分頁 -->
        <div class="pagination">
          <button
            class="pagination__button btn--changepage"
            @click="postsGoPrev"
            :disabled="isPostsFirstPage"
          >
            <
          </button>
          <p class="pagination__current">{{ postsCurrentPage }} / {{ postsTotalPages }}</p>
          <button
            class="pagination__button btn--changepage"
            @click="postsGoNext"
            :disabled="isPostsLastPage"
          >
            >
          </button>
        </div>
      </div>

      <!-- 2. 已回覆貼文表格 -->
      <div
        v-show="desktopActiveTab === 'replies'"
        class="postSection"
      >
        <!-- <h5 class="postSection__title bold">已回覆貼文</h5> -->
        <table class="postTable">
          <thead>
            <tr>
              <th>回覆日期</th>
              <th>原文標題</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reply in paginatedReplies"
              :key="reply.comment_no"
              class="postTable__row"
            >
              <td>{{ reply.commented_at }}</td>
              <td>
                <router-link
                  v-if="!reply.is_deleted"
                  :to="`/community/${reply.post_no}`"
                  class="postTable__link"
                >
                  {{ reply.original_post_title }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分頁 -->
        <div class="pagination">
          <button
            class="pagination__button btn--changepage"
            @click="repliesGoPrev"
            :disabled="isRepliesFirstPage"
          >
            <
          </button>
          <p class="pagination__current">{{ repliesCurrentPage }} / {{ repliesTotalPages }}</p>
          <button
            class="pagination__button btn--changepage"
            @click="repliesGoNext"
            :disabled="isRepliesLastPage"
          >
            >
          </button>
        </div>
      </div>
    </div>

    <!-- 手機版：列表 -->
    <div class="postsPage__mobileView">
      <!-- 第一層：入口 -->
      <div
        v-if="mobileView === 'index'"
        class="mobileIndex"
      >
        <div
          @click="mobileView = 'posts'"
          class="mobileIndex__item"
        >
          已發布貼文
        </div>
        <div
          @click="mobileView = 'replies'"
          class="mobileIndex__item"
        >
          已回覆貼文
        </div>
      </div>
      <!-- 第二層：貼文列表 -->
      <div
        v-else-if="mobileView === 'posts'"
        class="mobileList"
      >
        <h5 class="mobileList__title bold">貼文</h5>
        <div
          v-for="post in paginatedPosts"
          :key="post.post_no"
          class="mobileList__item"
        >
          <div
            v-if="post.is_reported"
            class="mobileList__info is-reported"
          >
            <span class="mobileList__date">{{ post.created_at }}</span>
            <span class="mobileList__name">{{ post.title }}</span>
          </div>
          <router-link
            v-else
            :to="`/community/${post.post_no}`"
            class="mobileList__info"
          >
            <span class="mobileList__date">{{ post.created_at }}</span>
            <span class="mobileList__name">{{ post.title }}</span>
          </router-link>

          <!-- “...” 按鈕，被檢舉時也禁用 -->
          <button
            @click="openActionsModal(post)"
            class="iconButton"
            :disabled="post.is_reported"
          >
            <svg
              class="moreIcon"
              viewBox="0 0 24 24"
              :class="{ 'is-disabled': post.is_reported }"
            >
              <path
                d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
              />
            </svg>
          </button>
        </div>
        <!-- 分頁 -->
        <div class="pagination">
          <button
            class="pagination__button btn--changepage"
            @click="postsGoPrev"
            :disabled="isPostsFirstPage"
          >
            <
          </button>
          <p class="pagination__current">{{ postsCurrentPage }} / {{ postsTotalPages }}</p>
          <button
            class="pagination__button btn--changepage"
            @click="postsGoNext"
            :disabled="isPostsLastPage"
          >
            >
          </button>
        </div>
      </div>
      <!-- 第二層：已回覆貼文列表 -->
      <div
        v-else-if="mobileView === 'replies'"
        class="mobileList"
      >
        <h5 class="mobileList__title">已回覆貼文</h5>
        <div
          v-for="reply in paginatedReplies"
          :key="reply.comment_no"
          class="mobileList__item"
        >
          <router-link
            v-if="!reply.is_original_post_deleted"
            :to="`/community/${reply.post_no}`"
            class="mobileList__info"
          >
            <span class="mobileList__date">{{ reply.commented_at }}</span>
            <span class="mobileList__name">{{ reply.original_post_title }}</span>
          </router-link>
          <!-- 
            或者，直接導向一個不存在的路徑，讓 Vue Router 的萬用匹配 (*) 來處理 404 
            <router-link v-if="!reply.is_original_post_deleted" ... >
          -->
          <div
            v-else
            class="mobileList__info is-deleted"
          >
            <span class="mobileList__date">{{ reply.commented_at }}</span>
            <span class="mobileList__name">{{ reply.original_post_title }} (原文已刪除)</span>
          </div>
        </div>
        <!-- 分頁 -->
        <div class="pagination">
          <button
            class="pagination__button btn--changepage"
            @click="repliesGoPrev"
            :disabled="isRepliesFirstPage"
          >
            <
          </button>
          <p class="pagination__current">{{ repliesCurrentPage }} / {{ repliesTotalPages }}</p>
          <button
            class="pagination__button btn--changepage"
            @click="repliesGoNext"
            :disabled="isRepliesLastPage"
          >
            >
          </button>
        </div>
      </div>
    </div>

    <!-- 手機版第三層：操作彈窗 -->
    <MemberModal
      :show="!!showActionsModalForPost"
      @close="closeActionsModal"
    >
      <template #header>操作</template>
      <template #default>
        <div
          v-if="showActionsModalForPost"
          class="mobileActions"
        >
          <!-- 只有未被檢舉的貼文才能編輯 -->
          <template v-if="!showActionsModalForPost.is_reported">
            <router-link
              :to="`/community/${showActionsModalForPost.post_no}/edit`"
              class="mobileActions__item"
            >
              <svg
                class="editIcon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                />
              </svg>
              編輯貼文
            </router-link>
            <div
              @click="deletePost(showActionsModalForPost.post_no)"
              class="mobileActions__item is-danger"
            >
              <svg
                class="deleteIcon"
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
              刪除貼文
            </div>
          </template>
          <!-- 被檢舉貼文顯示訊息 -->
          <div
            v-else
            class="mobileActions__item is-disabled"
          >
            此貼文已被檢舉，無法進行操作
          </div>
        </div>
      </template>
    </MemberModal>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import MemberModal from '@/components/MemberModal.vue';
  import MemberMobileHeader from '@/components/MemberMobileHeader.vue';

  const router = useRouter();

  // --- Tab ---
  const desktopActiveTab = ref('posts');
  // --- 狀態管理 ---
  const mobileView = ref('index'); // 'index', 'posts', 'replies'
  const showActionsModalForPost = ref(null); // 存放正在操作的 post 物件

  // --- 假資料 ---
  const myPosts = ref([
    {
      post_no: 1, //  (PK)
      author_id: 'user_account_001',
      title: '多出來的書要交換嗎？',
      created_at: '2025-07-14', // 此欄位需要json或後端處理
      is_reported: false,
    },
    {
      post_no: 2,
      author_id: 'user_account_001',
      title: '公共廁所太髒了',
      created_at: '2025-06-20',
      is_reported: false,
    },
    {
      post_no: 3,
      author_id: 'user_account_001',
      title: '大家會參加馬拉松嗎？',
      created_at: '2025-06-19',
      is_reported: true, // 假設被檢舉下架
    },
    {
      post_no: 4,
      author_id: 'user_account_001',
      title: '多出來的書要交換嗎？',
      created_at: '2025-06-18',
      is_reported: false,
    },
    {
      post_no: 5,
      author_id: 'user_account_001',
      title: '想買飲水機來團嗎？',
      created_at: '2025-06-25',
      is_reported: true,
    },
  ]);

  const myReplies = ref([
    {
      comment_no: 1, // 留言編號 (PK)
      post_no: 1, // 所屬貼文編號 (FK)
      commenter_id: 'user_account_001',
      commented_at: '2025-07-14',
      original_post_title: '多出來的書要交換嗎？',
      is_original_post_deleted: false, // 原文是否已删除 (此欄位還需要json或後端判斷)
    },
    {
      comment_no: 2,
      post_no: 2,
      commenter_id: 'user_account_001',
      commented_at: '2025-06-20',
      original_post_title: '公共廁所太髒了',
      is_original_post_deleted: false,
    },
    {
      comment_no: 3,
      post_no: 999,
      commenter_id: 'user_account_001',
      commented_at: '2025-06-19',
      original_post_title: '好想睡哦哦',
      is_original_post_deleted: true, // 假設此貼文已刪除
    },
    {
      comment_no: 4,
      post_no: 2,
      commenter_id: 'user_account_001',
      commented_at: '2025-06-24',
      original_post_title: '太髒了',
      is_original_post_deleted: false,
    },
    {
      comment_no: 2,
      post_no: 2,
      commenter_id: 'user_account_001',
      commented_at: '2025-06-21',
      original_post_title: '怎麼路燈又壞了',
      is_original_post_deleted: false,
    },
  ]);

  // --- 分頁 ---
  // 1. 我的貼文
  const postsPageSize = ref(6); // 每頁顯示幾筆
  const postsCurrentPage = ref(1); // 當前頁碼
  // 計算總頁數
  const postsTotalPages = computed(() => Math.ceil(myPosts.value.length / postsPageSize.value));
  // 計算當前是否為第一頁/最後一頁
  const isPostsFirstPage = computed(() => postsCurrentPage.value === 1);
  const isPostsLastPage = computed(() => postsCurrentPage.value === postsTotalPages.value);
  // 計算屬性：從完整列表中“切割”出當前頁要顯示的資料
  const paginatedPosts = computed(() => {
    const startIndex = (postsCurrentPage.value - 1) * postsPageSize.value;
    const endIndex = startIndex + postsPageSize.value;
    return myPosts.value.slice(startIndex, endIndex);
  });
  // 換頁函式
  const postsGoPrev = () => {
    if (!isPostsFirstPage.value) postsCurrentPage.value--;
  };
  const postsGoNext = () => {
    if (!isPostsLastPage.value) postsCurrentPage.value++;
  };

  // 2. 已回覆貼文
  const repliesPageSize = ref(6);
  const repliesCurrentPage = ref(1);
  const repliesTotalPages = computed(() =>
    Math.ceil(myReplies.value.length / repliesPageSize.value),
  );
  const isRepliesFirstPage = computed(() => repliesCurrentPage.value === 1);
  const isRepliesLastPage = computed(() => repliesCurrentPage.value === repliesTotalPages.value);
  const paginatedReplies = computed(() => {
    const startIndex = (repliesCurrentPage.value - 1) * repliesPageSize.value;
    const endIndex = startIndex + repliesPageSize.value;
    return myReplies.value.slice(startIndex, endIndex);
  });
  const repliesGoPrev = () => {
    if (!isRepliesFirstPage.value) repliesCurrentPage.value--;
  };
  const repliesGoNext = () => {
    if (!isRepliesLastPage.value) repliesCurrentPage.value++;
  };

  // --- 事件處理函式 ---
  const goBackToMenu = () => router.push('/member');

  const deletePost = (postNo) => {
    if (confirm('確定要刪除這篇貼文嗎？')) {
      //呼叫 API: axios.delete(`/api/posts/${postNo}`)
      myPosts.value = myPosts.value.filter((p) => p.post_no !== postNo);
      closeActionsModal(); // 刪除後關閉彈窗
      alert('貼文已刪除');
    }
  };

  const openActionsModal = (post) => {
    showActionsModalForPost.value = post;
  };
  const closeActionsModal = () => {
    showActionsModalForPost.value = null;
  };
</script>

<style lang="scss" scoped>
  .postsPage {
    &__title {
      color: $primary-c700;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 32px;
    }
  }

  // 預設隱藏手機
  .postsPage__mobileView {
    display: none;
  }

  .desktopTabs {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    // border-bottom: 2px solid $neutral-c;

    &__button {
      padding: 12px 24px;
      font-size: 18px;
      background: none;
      border: none;
      cursor: pointer;
      color: $neutral-c;
      // position: relative;
      // bottom: -2px;

      &.is-active {
        color: $primary-c700;
        font-weight: 700;
        border-bottom: 2px solid $primary-c700;
      }
    }
  }
  .postSection {
    margin-bottom: 40px;
    &__title {
      margin-bottom: 16px;
      font-size: 20px;
      color: $black;
    }
  }

  .postTable {
    width: 100%;
    border: 1px solid $neutral-c;
    border-radius: $border-r-md;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    background-color: $white;
    tbody {
      tr:nth-child(2n) {
        background-color: rgba(0, 75, 128, 0.1);
      }
    }

    thead tr {
      background-color: $primary-c700;
    }
    th {
      color: $white;
      padding: 14px 16px;
      font-weight: 400;
      letter-spacing: 0.2em;
      &:not(:last-child) {
        border-right: 1px solid $neutral-c;
      }
    }

    &__row {
      td {
        padding: 14px 16px;
        border-bottom: 1px solid $neutral-c;
        text-align: center;
        vertical-align: middle;
        letter-spacing: 0.2em;
        &:not(:last-child) {
          border-right: 1px solid $neutral-c;
        }
      }
      &:last-child td {
        border-bottom: none;
      }

      // 被檢舉的樣式
      &.is-reported {
        color: $neutral-c;
        cursor: not-allowed;
        &:hover {
          background-color: transparent;
        }
        .postTable__link {
          color: $neutral-c;
          text-decoration: none;
        }
      }
    }

    &__cell--action {
      text-align: center;
    }
    &__link {
      color: $black;
      text-decoration: none;
      &:hover {
        color: $primary-c500;
        text-decoration: underline;
      }
    }
    &__text--deleted {
      color: $neutral-c;
    }
  }

  //按鈕
  .iconButton {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    &__icon {
      width: 24px;
      height: 24px;
      fill: $primary-c500;
      transition: fill 0.3s ease;
      &--delete {
        fill: $neutral-c;
      }
    }

    &:hover .iconButton__icon--delete {
      fill: $semantic-r;
    }

    &--disabled {
      cursor: not-allowed;
      pointer-events: none;
      .iconButton__icon {
        fill: $neutral-c !important;
      }
    }
  }

  //分頁
  .pagination {
    @include flex-center;
    gap: 30px;
    margin: 30px 0;

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

    &__button:disabled {
      background-color: $neutral-c;
      cursor: not-allowed;
      &:hover {
        background-color: $neutral-c;
      }
    }
  }

  @include mobile {
    .postsPage {
      &__title {
        display: block;
      }
      &__desktopView {
        display: none;
      }

      &__mobileView {
        display: block;
      }
    }
    .mobileIndex {
      &__item {
        font-size: 18px;
        padding: 20px 16px;
        border-bottom: 1px solid $primary-c100;
        cursor: pointer;
        // &:hover {
        //   background-color: $primary-c50;
        // }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .mobileList {
      display: block;
      &__title {
        color: $primary-c700;
        text-align: center;
        margin: 24px;
      }
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid $primary-c100;
        &:last-child {
          border-bottom: none;
        }
      }
      &__info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-decoration: none;
        color: inherit;
        &.is-reported {
          .mobileList__name,
          .mobileList__date {
            color: $neutral-c; // 文字變灰
          }
        }
      }
      &__date {
        font-size: 14px;
        color: $neutral-c;
      }
      &__name {
        // font-weight: 500;
        line-height: 1.4;
        color: $primary-c500;
        &.is-deleted {
          color: $neutral-c;
          text-decoration: line-through;
          cursor: default;
        }
      }
      .moreIcon {
        width: 24px;
        fill: $neutral-c;
      }
      .moreIcon.is-disabled {
        fill: $neutral-c;
        cursor: not-allowed;
      }
    }

    // 手機版操作彈窗
    .mobileActions {
      display: flex;
      flex-direction: column;
      &__item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        font-size: 16px;
        cursor: pointer;
        text-decoration: none;
        color: $black;
        // &:hover {
        //   background-color: $primary-c50;
        // }
        &.is-danger {
          color: $semantic-r;
        }
        &.is-disabled {
          color: $neutral-c;
          cursor: not-allowed;
          &:hover {
            background-color: transparent;
          }
        }
        svg {
          width: 24px;
          height: 24px;
          &.editIcon {
            fill: $black;
          }
          // &.deleteIcon {
          //   fill: $semantic-r;
          // }
        }
      }
    }
  }
</style>
