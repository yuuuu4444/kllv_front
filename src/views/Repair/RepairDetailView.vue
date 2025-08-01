<script setup>
  import { useRouter } from 'vue-router';
  import SubBanner from '@/components/SubBanner.vue';
  import RepairData from '@/assets/data/Repair/repair_reports_test.json';
  import Categories from '@/assets/data/Repair/repair_categories_test.json';

  const props = defineProps(['report_no']);
  const router = useRouter();
  const reportNo = props.report_no;

  const reportItem = RepairData.find((item) => item.report_no === reportNo);
  const categoryItem = Categories.find((item) => item.category_no === reportItem?.category_no);
  const categoryName = categoryItem ? categoryItem.category_name : '未分類';
  const statusText = reportItem.process_status === 2 ? '已處理' : '待處理';

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

      <section class="detail-table">
        <table class="detail-table__table">
          <tbody class="detail-table__body">
            <tr
              class="detail-table__row"
              v-if="reportItem"
            >
              <th>狀態</th>
              <td>{{ statusText }}</td>
              <th>填表日期</th>
              <td>{{ reportItem.created_at }}</td>
            </tr>
            <tr
              class="detail-table__row"
              v-if="reportItem"
            >
              <th>案件編號</th>
              <td class="detail-table__value">{{ reportNo }}</td>
              <th>查報類別</th>
              <td class="detail-table__value">{{ categoryName }}</td>
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
                <div class="detail-table__photos">
                  <img
                    src="https://picsum.photos/300/500"
                    class="detail-table__photo"
                  />
                  <img
                    src="https://picsum.photos/500/300"
                    class="detail-table__photo"
                  />
                  <img
                    src="https://picsum.photos/500/300"
                    class="detail-table__photo"
                  />
                </div>
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
        padding: 1.5625vw 2.5vw 6.25vw;
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
