<script setup>
  import SubBanner from '@/components/SubBanner.vue';
  import { defineProps, ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Comments from '@/assets/data/Community/community_comments_test.json';
  import ReportModal from '@/components/ReportModal.vue';
  import CreatePostModal from '@/components/CreatePostModal.vue';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';

  const { VITE_API_BASE } = import.meta.env;
  const router = useRouter();

  const auth = useAuthStore();
  const { user, isLoggedIn } = storeToRefs(auth);

  // 之後在編輯/刪除貼文要做v-if判斷
  const isOwner = computed(
    () => !!user.value && !!postItem.value && user.value.user_id === postItem.value.author_id,
  );

  const avatarUrl = (src) => {
    if (/^https?:\/\//i.test(src)) return src; // 已是完整網址
    if (src.startsWith('/')) return `${VITE_API_BASE}${src}`;
    return `${VITE_API_BASE}/${src}`;
  };

  const profile = computed(() => user.value ?? null);

  // const TEMP_USER_ID = 'user_account_001';
  // const TEMP_USER_NAME = 'Komod·Mayaw';
  const props = defineProps({ post_no: { type: [String, Number], required: true } });
  const postItem = ref(null);
  const loading = ref(true);
  const error = ref('');
  const reportCategories = ref([]);
  const loadingReportCats = ref(false);
  const reportCatsError = ref('');

  async function fetchReportCategories() {
    loadingReportCats.value = true;
    reportCatsError.value = '';
    try {
      const res = await fetch(`${VITE_API_BASE}/api/community/report_categories_get.php`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status !== 'success') throw new Error(data.message || '取得檢舉分類失敗');
      reportCategories.value = Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      reportCatsError.value = error.message || '分類載入失敗';
    } finally {
      loadingReportCats.value = false;
    }
  }

  async function fetchDetail(no) {
    loading.value = true;
    error.value = '';
    postItem.value = null;

    try {
      const res = await fetch(`${VITE_API_BASE}/api/community/post_detail_get.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_no: Number(no) }),
        credentials: 'include',
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status} - ${txt}`);
      }

      const data = await res.json();
      if (data.status !== 'success' || !data.data) throw new Error(data.message || '載入失敗');
      postItem.value = data.data;
    } catch (e) {
      error.value = e.message || '未知錯誤';
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    fetchDetail(props.post_no);
    fetchCategories();
    fetchReportCategories();
    fetchCommentsAll();
  });

  const categoryName = computed(() => {
    if (!postItem.value) return '';
    const no = Number(postItem.value?.category_no);
    if (!no) return '';
    const hit = categories.value.find((c) => Number(c.category_no) === no);
    return hit?.category_name || '';
  });

  const photoList = computed(() => {
    const toPath = (it) => (typeof it === 'string' ? it : it?.image_path);
    const toAbs = (p) => (p?.startsWith('http') ? p : `${VITE_API_BASE}${p}`);
    return (postItem.value?.images || []).map(toPath).filter(Boolean).map(toAbs);
  });

  const showEdited = computed(() => {
    return postItem.value?.updated_at != null && postItem.value.updated_at !== '';
  });

  const postNo = computed(() => Number(props.post_no));
  const editModalVisible = ref(false);
  const editingPost = ref(null);
  const openCount = ref(0);
  const modalKey = computed(() => `edit-${editingPost.value?.post_no || 'new'}-${openCount.value}`);

  const categories = ref([]);
  const loadingCats = ref(false);
  const categoriesError = ref('');

  async function fetchCategories() {
    loadingCats.value = true;
    categoriesError.value = '';
    try {
      const res = await fetch(`${VITE_API_BASE}/api/community/categories_get.php`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status !== 'success') throw new Error(data.message || '取得分類失敗');
      categories.value = Array.isArray(data.data) ? data.data : [];
    } catch (e) {
      console.error(e);
      categoriesError.value = e.message || '分類載入失敗';
    } finally {
      loadingCats.value = false;
    }
  }

  const menuPostVisible = ref(false);
  const menuCommentVisible = ref(false);
  const togglePostMenu = () => {
    menuPostVisible.value = !menuPostVisible.value;
  };

  const openedCommentMenu = ref(null);
  const toggleCommentMenu = (id) => {
    openedCommentMenu.value = openedCommentMenu.value === id ? null : id;
  };

  const openEditModal = () => {
    const toPaths = (arr) =>
      (Array.isArray(arr) ? arr : [])
        .map((it) => (typeof it === 'string' ? it : it?.image_path))
        .filter(Boolean);

    editingPost.value = {
      post_no: postItem.value.post_no,
      title: postItem.value.title,
      category_no: postItem.value.category_no,
      content: postItem.value.content,
      images: toPaths(postItem.value.images),
    };

    openCount.value++;
    editModalVisible.value = true;
    menuPostVisible.value = false;
  };

  const handleEditPost = async (payload) => {
    if (payload.post_no !== postItem.value?.post_no) return;
    if (!isOwner.value) {
      alert('僅作者可編輯此貼文');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('post_no', String(payload.post_no));
      formData.append('title', payload.title);
      formData.append('category_no', String(payload.category_no));
      formData.append('content', payload.content);
      // formData.append('author_id', TEMP_USER_ID); // 之後改用 Session，可以拉掉

      for (const f of payload.files ?? []) {
        if (f instanceof File) formData.append('images[]', f);
      }

      for (const p of payload.remove_image_paths ?? []) {
        formData.append('remove_image_paths[]', p);
      }

      const res = await fetch(`${VITE_API_BASE}/api/community/post_update_post.php`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status} - ${txt}`);
      }

      const data = await res.json();

      if (data.status !== 'success') throw new Error(data.message || '更新失敗');

      const { images = [], image: banner } = data.data || {};
      // const { images = [], image: banner, author_name } = data.data || {};
      const me = (user.value?.user ?? user.value) || {};
      const authorName = data.data?.author_name ?? me.fullname ?? postItem.value.author_name;
      const profileImage =
        data.data?.profile_image ?? me.profile_image ?? postItem.value.profile_image;

      postItem.value = {
        ...postItem.value,
        title: payload.title,
        category_no: payload.category_no,
        content: payload.content,
        images, // 陣列（字串路徑）
        image: banner, // 主圖
        updated_at: new Date().toISOString(),
        author_name: authorName,
        profile_image: profileImage,
      };

      editModalVisible.value = false;
    } catch (error) {
      console.error(error);
      alert(error.message || '更新失敗');
    }
  };

  const handleDeletePost = async () => {
    if (!isOwner.value) {
      alert('僅作者可刪除此貼文');
      return;
    }
    const ok = window.confirm('您確定要刪除此則貼文嗎?');
    if (!ok) return;

    const prev = Number(postItem.value?.is_deleted ?? 0);

    try {
      const res = await fetch(`${VITE_API_BASE}/api/community/post_delete_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ post_no: Number(postItem.value.post_no) }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`HTTP ${res.status} - ${text}`);
      }
      if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      postItem.value.is_deleted = 1;
      router.push('/community');
      menuPostVisible.value = false;
    } catch (error) {
      postItem.value.is_deleted = prev;
      alert(error.message || '刪除失敗');
    }
  };

  const showModal = ref(false);
  const reportTarget = ref({ type: 'post', id: null });

  const openReportModal = async (target = { type: 'post', id: null }) => {
    // 確保有最新登入狀態
    if (!isLoggedIn.value) {
      await auth.checkAuth();
    }
    if (!isLoggedIn.value) {
      router.push({
        name: 'login',
      });
      return;
    }

    reportTarget.value = target;
    showModal.value = true;
    menuPostVisible.value = false;
    menuCommentVisible.value = false;
    openedCommentMenu.value = null;
  };

  async function handleSubmitReport(payload, done) {
    const target = reportTarget.value?.type;
    const id = Number(reportTarget.value?.id);

    try {
      let url = '';
      let body = {};

      if (target === 'comment') {
        if (!id) {
          done(false, '找不到留言編號');
          return;
        }

        url = `${VITE_API_BASE}/api/community/comment_report_create_post.php`;
        body = { comment_no: id, category_no: Number(payload.category_no) };
      } else {
        const pn = Number(postItem.value?.post_no);
        if (!pn) {
          done(false, '找不到貼文編號');
          return;
        }

        url = `${VITE_API_BASE}/api/community/report_create_post.php`;
        body = { post_no: pn, category_no: Number(payload.category_no) };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);

      const data = JSON.parse(text);
      done(data.status === 'success', data.message || '已送出檢舉');

      if (data.status === 'success') {
        showModal.value = false;
        reportTarget.value = { type: 'post', id: null };
      }
    } catch (error) {
      done(false, error.message || '檢舉失敗');
    }
  }

  const replyNote = ref('');
  const isSendingComment = ref(false);

  const allCommentsRef = ref([]);

  async function handleSubmitComment() {
    if (!isLoggedIn.value) {
      alert('請先登入再留言');
      return;
    }

    const txt = replyNote.value.trim();
    if (!txt || isSendingComment.value) return;

    try {
      isSendingComment.value = true;
      const res = await fetch(`${VITE_API_BASE}/api/community/comment_create_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          post_no: postNo.value,
          content: txt,
        }),
      });

      const text = await res.text();
      const ct = res.headers.get('content-type') || '';

      // console.log('[comment_create raw]', { status: res.status, ct, text: text.slice(0, 300) });
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);
      if (!ct.includes('application/json')) {
        throw new Error(`回傳格式錯誤（Content-Type=${ct}）`);
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('回傳格式錯誤');
      }
      if (data.status !== 'success') throw new Error(data.message || '留言失敗');

      const created = data.data;

      allCommentsRef.value.push(created);
      replyNote.value = '';
      await fetchCommentsAll();
      currentPage.value = Math.max(1, Math.ceil(postComments.value.length / pageSize));
    } catch (error) {
      alert(error.message || '留言失敗');
    } finally {
      isSendingComment.value = false;
    }
  }

  async function fetchCommentsAll() {
    try {
      const res = await fetch(`${VITE_API_BASE}/api/community/comments_get_post.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ post_no: postNo.value }),
      });
      const text = await res.text();
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);
      if (!ct.includes('application/json')) throw new Error(`回傳格式錯誤 (Content-Type=${ct})`);

      const data = JSON.parse(text);
      if (data.status !== 'success') throw new Error(data.message || '留言載入失敗');

      allCommentsRef.value = Array.isArray(data.data?.items) ? data.data.items : [];
    } catch (error) {
      console.error(error);
      alert(error.message || '留言載入失敗');
    }
  }

  const postComments = computed(() =>
    allCommentsRef.value
      .filter((c) => Number(c.post_no) === postNo.value)
      .sort((a, b) => new Date(a.commented_at) - new Date(b.commented_at)),
  );

  const currentPage = ref(1);
  const pageSize = 3;

  const pagedComments = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return postComments.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() => Math.ceil(postComments.value.length / pageSize));

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);

  const goPrev = () => {
    if (!isFirstPage.value) currentPage.value--;
  };

  const goNext = () => {
    if (!isLastPage.value) currentPage.value++;
  };

  const passTime = (datetime) => {
    const now = new Date();
    const past = new Date(datetime);
    const diffTime = now - past;

    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    if (hours < 1) return '剛剛';
    if (hours < 24) return `${hours} 小時前`;
    return past.toISOString().slice(0, 10);
  };

  const isRemoved = computed(() => {
    return Number(postItem.value?.is_deleted ?? 0) === 1;
  });

  const isCommentRemoved = computed(() => (c) => Number(c?.is_deleted ?? 0) === 1);

  const currentUserId = computed(() =>
    String(user.value?.user?.user_id ?? user.value?.user_id ?? ''),
  );

  // 取留言作者
  const getCommentAuthorId = (c) => String(c?.author_id ?? c?.user_id ?? c?.author?.user_id ?? '');

  // 是不是我自己的留言
  const isMyComment = (c) => {
    const me = currentUserId.value;
    const author = getCommentAuthorId(c);
    return !!me && !!author && me === author;
  };
</script>

<template>
  <SubBanner title="里民開講" />
  <div class="post-detail">
    <div class="post-detail__container">
      <section v-if="loading">載入中…</section>
      <section v-else-if="error">載入失敗：{{ error }}</section>

      <section
        class="post-detail__body"
        v-else-if="postItem"
      >
        <div class="post-detail__header">
          <h5
            class="post-detail__category bold"
            v-if="categoryName"
          >
            【{{ categoryName }}】
          </h5>
          <h5 class="post-detail__title bold">
            {{ isRemoved ? '（此貼文已下架）' : postItem.title }}
          </h5>
        </div>

        <div
          v-if="isRemoved"
          class="post-detail__removed body--b2"
        >
          此文章已刪除或經檢舉已下架
        </div>

        <template v-else>
          <div class="post-detail__wrapper">
            <div class="post-detail__meta">
              <div class="post-detail__user-info">
                <div class="post-detail__author-image">
                  <img
                    :src="avatarUrl(postItem.profile_image)"
                    alt="作者頭像"
                  />
                </div>
                <p class="post-detail__author body--b2">{{ postItem.author_name }}</p>
                <p class="post-detail__time body--b2">{{ passTime(postItem.posted_at) }}</p>
                <p
                  class="post-detail__edit body--b2"
                  v-if="showEdited"
                >
                  {{ passTime(postItem.updated_at) }} 已編輯
                </p>
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
                  <li
                    class="post-detail__menu-item"
                    v-if="isOwner"
                  >
                    <button
                      class="post-detail__menu-btn"
                      @click="openEditModal"
                    >
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
                  <li
                    class="post-detail__menu-item"
                    v-if="isOwner"
                  >
                    <button
                      class="post-detail__menu-btn"
                      @click="handleDeletePost"
                    >
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
                      <span class="post-detail__menu-text">刪除貼文</span>
                    </button>
                  </li>
                  <li
                    class="post-detail__menu-item"
                    v-if="!isOwner"
                  >
                    <button
                      class="post-detail__menu-btn"
                      @click="openReportModal({ type: 'post', id: Number(postItem.post_no) })"
                    >
                      <div>
                        <img
                          src="/src/assets/icon/icon_report.svg"
                          alt=""
                        />
                      </div>
                      <span class="post-detail__menu-text">檢舉貼文</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <ReportModal
              v-model:visible="showModal"
              :categories="reportCategories"
              :loading="loadingReportCats"
              @submit="handleSubmitReport"
            />

            <CreatePostModal
              v-if="editModalVisible"
              :key="modalKey"
              v-model:visible="editModalVisible"
              :post="editingPost"
              @edit="handleEditPost"
            />

            <div class="post-detail__content">
              <p class="post-detail__desc body--b2">{{ postItem.content }}</p>
              <div
                class="post-detail__images"
                v-if="photoList.length"
              >
                <img
                  v-for="(src, i) in photoList"
                  :key="src + i"
                  :src="src"
                  alt="貼文照片"
                />
              </div>
            </div>
          </div>
        </template>
      </section>

      <section
        class="post-detail__comment"
        v-if="totalPages != 0"
      >
        <div class="post-detail__comment-list">
          <ul>
            <li
              class="post-detail__comment-wrapper"
              v-for="(comment, idx) in pagedComments"
              :key="comment.comments_no"
            >
              <div class="post-detail__comment-item">
                <div class="post-detail__comment-header">
                  <div class="post-detail__comment-user">
                    <div class="post-detail__comment-user-image">
                      <img
                        :src="avatarUrl(comment.profile_image)"
                        alt="留言者頭像"
                      />
                    </div>
                    <p class="post-detail__comment-author body--b3">{{ comment.author_name }}</p>
                    <p class="post-detail__comment-time body--b3">
                      {{ passTime(comment.commented_at) }}
                    </p>
                  </div>
                  <p class="post-detail__comment-no body--b3">
                    b{{ (currentPage - 1) * pageSize + idx + 1 }}
                  </p>
                </div>
                <p
                  class="post-detail__comment-text body--b2"
                  v-if="!isCommentRemoved(comment)"
                >
                  {{ comment.content }}
                </p>
                <p v-else>（此留言已被下架）</p>
                <div class="post-detail__comment-menu">
                  <button
                    class="post-detail__comment-menu-toggle"
                    @click="toggleCommentMenu(comment.comments_no)"
                    v-if="!isCommentRemoved(comment) && !isMyComment(comment)"
                  >
                    <img
                      src="/src/assets/icon/icon_actionMenu.svg"
                      alt=""
                    />
                  </button>
                  <ul
                    class="post-detail__comment-menu-list"
                    v-if="openedCommentMenu === comment.comments_no"
                  >
                    <li class="post-detail__comment-menu-item">
                      <button
                        class="post-detail__menu-btn"
                        @click="
                          openReportModal({ type: 'comment', id: Number(comment.comments_no) })
                        "
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

          <div
            class="post-detail-pagination"
            data-aos="fade"
          >
            <button
              class="post-detail-pagination__prev btn--changepage"
              @click="goPrev"
              :disabled="currentPage === 1"
            >
              &lt;
            </button>
            <p class="post-detail-pagination__current">{{ currentPage }} / {{ totalPages }}</p>
            <button
              class="post-detail-pagination__next btn--changepage"
              @click="goNext"
              :disabled="currentPage === totalPages"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      <section class="post-detail__reply">
        <div class="post-detail__reply-wrapper">
          <textarea
            v-model="replyNote"
            class="post-detail__reply-textarea"
            :placeholder="
              isLoggedIn ? `以${profile?.fullname || '我'}的身分發表留言...` : '請先登入後再留言'
            "
            :readonly="!isLoggedIn"
            @keydown.ctrl.enter.prevent="handleSubmitComment"
          ></textarea>
          <button
            type="button"
            class="post-detail__reply-submit"
            :disabled="!isLoggedIn || isSendingComment || !replyNote.trim()"
            @click="handleSubmitComment"
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

      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
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
      background-color: #fff;
      width: 30px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 1px solid #999;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
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
        background-color: white;

        ul {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 20px;
        }
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
          background-color: #fff;
          width: 30px;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid #999;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
          }
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

    .post-detail-pagination {
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
      &__next,
      &__prev {
        color: $white;
        font-size: 24px;
      }

      &__next:disabled,
      &__prev:disabled {
        background-color: $neutral-c;
        cursor: not-allowed;
      }
    }

    @include mobile {
      &__container {
        padding-left: 2%;
        padding-right: 2%;
      }

      &__images {
        flex-direction: column;
        gap: 10px;

        img {
          width: 100%;
        }
      }
    }

    .post-detail__removed {
      padding: 20px;
      text-align: center;
      border: 1px dashed #ccc;
      border-radius: 8px;
      background: #f8f8f8;
      color: #666;
    }
  }
</style>
