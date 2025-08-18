<script setup>
  import { useRouter } from 'vue-router';
  import { onMounted, ref, computed } from 'vue';
  import SubBanner from '@/components/SubBanner.vue';

  const { VITE_API_BASE } = import.meta.env;
  const props = defineProps({ repair_no: { type: [String, Number], required: true } });
  const router = useRouter();
  const reportItem = ref(null);
  const loading = ref(true);
  const error = ref('');

  async function fetchDetail(no) {
    // console.log('route param repair_no =', props.repair_no);
    loading.value = true;
    error.value = '';
    reportItem.value = null;
    try {
      const res = await fetch(`${VITE_API_BASE}/api/repair/repair_detail_get.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repair_no: Number(props.repair_no) }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status} - ${txt}`);
      }

      const data = await res.json();
      if (data.status !== 'success' || !data.data) {
        throw new Error(data.message || '載入失敗');
      }
      reportItem.value = data.data;
    } catch (e) {
      error.value = e.message || '未知錯誤';
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    fetchDetail(props.repair_no);
  });

  const statusText = computed(() => {
    return reportItem.status === 2 ? '已處理' : '待處理';
  });

  const photoList = computed(() => {
    const imgs = reportItem.value?.images || [];
    return imgs
      .map((it) => (typeof it === 'string' ? it : it.image_path))
      .filter(Boolean)
      .map((p) => {
        if (p.startsWith('http')) return p; // 完整 URL
        return `${VITE_API_BASE}${p}`;
      });
  });

  // 回到上一頁
  const Back = () => {
    router.back();
  };
</script>

<template>
  <div class="repair-detail">
    <SubBanner title="維修通報查閱" />

    <div class="repair-detail__container">
      <nav class="repair-detail__breadcrumb">
        <RouterLink
          to="/"
          class="repair-detail__breadcrumb-link"
        >
          首頁
        </RouterLink>
        <p class="body--b2">&#47;里民服務</p>
        <p class="body--b2">&#47;維修通報</p>
        <p class="body--b2">&#47;維修通報查閱</p>
      </nav>

      <section v-if="loading">載入中…</section>

      <section v-else-if="error">載入失敗：{{ error }}</section>

      <section
        class="detail-table"
        v-else
        v-if="reportItem"
      >
        <table class="detail-table__table">
          <tbody class="detail-table__body">
            <tr class="detail-table__row">
              <th>狀態</th>
              <td>{{ statusText }}</td>
              <th>填表日期</th>
              <td>{{ reportItem.reported_at }}</td>
            </tr>
            <tr
              class="detail-table__row"
              v-if="reportItem"
            >
              <th>案件編號</th>
              <td class="detail-table__value">{{ reportItem.repair_code }}</td>
              <th>查報類別</th>
              <td class="detail-table__value">{{ reportItem.category_name }}</td>
            </tr>
            <tr class="detail-table__row">
              <th>所在地點</th>
              <td colspan="3">{{ reportItem.location }}</td>
            </tr>
            <tr class="detail-table__row">
              <th>情形描述</th>
              <td
                class="detail-table__desc"
                colspan="3"
              >
                {{ reportItem.description }}
              </td>
            </tr>
            <tr class="detail-table__row">
              <th>照片</th>
              <td colspan="3">
                <div
                  class="detail-table__photos"
                  v-if="photoList.length"
                >
                  <img
                    class="detail-table__photo"
                    v-for="(src, i) in photoList"
                    :key="src + i"
                    :src="src"
                    alt="維修通報照片"
                  />
                </div>
                <p
                  v-else
                  class="body--b3"
                >
                  無上傳照片
                </p>
              </td>
            </tr>
            <tr
              class="detail-table__row"
              v-if="statusText === '已處理'"
            >
              <th>回覆</th>
              <td
                class="detail-table__desc"
                colspan="3"
              >
                {{ reportItem.repair_content }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div class="repair-detail__action">
        <button
          class="repair-detail__back btn--process"
          @click="Back"
        >
          返回上一頁
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .repair-detail {
    background-color: $primary-c000;

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
    }

    &__breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 50px;
    }

    &__breadcrumb-link {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.2em;
      color: $primary-c700;
    }

    .detail-table {
      margin-bottom: 60px;

      &__table {
        width: 100%;
        border: 1px solid $neutral-c;
        border-radius: $border-r-md;
        border-collapse: separate;
        overflow: hidden;
        background-color: $white;
      }

      &__row {
        th {
          text-align: center;
          vertical-align: middle;
          width: 15%;
          border-bottom: 1px solid $neutral-c;
          background-color: $primary-c700;
          color: $white;
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: 32px;
          letter-spacing: 0.2em;
          padding: 14px 0;
        }

        td {
          text-align: center;
          vertical-align: middle;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px;
          letter-spacing: 0.2em;
          border-bottom: 1px solid $neutral-c;
        }
      }

      &__value,
      &__desc {
        background-color: rgba(0, 75, 128, 0.1);
      }

      &__photos {
        @include flex-center;
        gap: 20px;
        margin: 20px auto;
        width: 80%;
        flex-wrap: wrap;
        overflow: hidden;
      }

      &__photo {
        width: 30%;
        object-fit: cover;
        flex: 1 1 1;
      }
    }

    &__action {
      @include flex-center;
    }

    @include mobile {
      &__container {
        padding-left: 2%;
        padding-right: 2%;
      }

      &__breadcrumb-link {
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.1em;
      }

      .detail-table {
        &__row {
          th {
            font-size: 16px;
            line-height: 26px;
            letter-spacing: 0.1em;
          }

          td {
            font-size: 14px;
            line-height: 22px;
            letter-spacing: 0.1em;
          }
        }
        &__photo {
          width: 100%;
        }
      }
    }
  }
</style>
