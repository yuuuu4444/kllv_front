<script setup>
  import { RouterLink } from 'vue-router';
  import { useRoute } from 'vue-router';
  import SubBanner from '@/components/SubBanner.vue';
  import repairData from '@/assets/data/Repair/repair_reports_test.json';

  const route = useRoute();
  const reportNo = route.params.report_no;

  const reportItem = repairData.find((item) => item.report_no === reportNo);
</script>

<template>
  <div class="repair-detail">
    <SubBanner title="維修通報查閱" />

    <div class="repair-detail__container">
      <nav class="repair-detail__breadcrumb">
        <p class="body--b2">首頁</p>
        &#45;
        <p class="body--b2">里民服務</p>
        &#45;
        <p class="body--b2">維修通報</p>
        &#45;
        <p class="body--b2">維修通報查閱</p>
      </nav>

      <section class="detail-table">
        <table class="detail-table__table">
          <tbody class="detail-table__body">
            <tr class="detail-table__row">
              <th>狀態</th>
              <td>待處理</td>
              <th>填表日期</th>
              <td>2025-07-07</td>
            </tr>
            <tr
              class="detail-table__row"
              v-if="reportItem"
            >
              <th>案件編號</th>
              <td class="detail-table__value">{{ reportItem.report_no }}</td>
              <th>查報類別</th>
              <td class="detail-table__value">路燈損壞</td>
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
                    src="..."
                    class="detail-table__photo"
                  />
                  <img
                    src="..."
                    class="detail-table__photo"
                  />
                  <img
                    src="..."
                    class="detail-table__photo"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div class="repair-detail__action">
        <button class="repair-detail__back btn--process">返回上一頁</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '/src/assets/scss/style.scss';

  .repair-detail {
    background-color: $primary-c000;
    padding-bottom: 30px;

    &__banner {
      @include flex-center;
      background-color: $primary-c700;
      min-height: 435px;
      padding-top: 200px;
      margin-bottom: 30px;
    }

    &__title {
      color: $white;
    }

    &__container {
      padding: 1.5625vw 18.75vw 6.25vw;
    }

    &__breadcrumb {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 50px;
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
        margin: 20px 0;
      }

      &__photo {
        width: 285px;
        height: 200px;
      }
    }

    &__action {
      @include flex-center;
    }
  }
</style>
