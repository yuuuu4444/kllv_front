<template>
  <div class="event-card__base">
    <img
      :src="event.image"
      :alt="event.title"
      class="event-card__photo"
    />

    <div class="event-card__info-wrapper">
      <div class="event-card__category-tag">
        <h5 :class="['bold', `category-text--${event.type}`]">{{ event.category }}</h5>
      </div>

      <div class="event-card__header">
        <h5 class="bold">{{ event.title }}</h5>
        <RouterLink
          :to="`/events/${event.id}`"
          class="event-card__details-btn"
        >
          活動詳情
        </RouterLink>
      </div>

      <div class="event-card__footer">
        <div class="event-card__dates">
          <p class="body--b4">活動日期：{{ event.date }}</p>
          <p class="body--b4">報名截止：{{ event.deadline }}</p>
          <p class="body--b4">名額：{{ event.quota }}人</p>
        </div>
        <div class="event-card__price-wrapper">
          <h5
            v-if="event.price > 0"
            class="bold event-card__price"
          >
            NT. {{ event.price }}
          </h5>
          <h5
            v-else
            class="bold event-card__price event-card__price--free"
          >
            免費
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { RouterLink } from 'vue-router';

  defineProps({
    event: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  // 最底層白色圓角底板
  .event-card__base {
    position: relative;
    width: 415px;
    height: 539px;
    background-color: $white;
    border-radius: $border-r-lg;
    box-shadow: 0 4px 20px rgba($black, 0.1);
    box-sizing: border-box;
  }

  // 照片層
  .event-card__photo {
    position: absolute;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    object-fit: cover;
    border-radius: $border-r-md;
    box-shadow: 0 4px 15px rgba($black, 0.25);
    z-index: 1;
  }

  // 資訊區塊
  .event-card__info-wrapper {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: $white;
    border-radius: $border-r-md;
    z-index: 2;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  // 分類標籤
  .event-card__category-tag {
    position: absolute;
    top: 0;
    left: 20px;
    transform: translateY(-50%);
    background-color: $white;
    padding: 10px 20px;
    border-radius: $border-r-lg;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      width: 40px;
      height: 15px;
      background-color: $white;
      z-index: -1;
    }

    h5 {
      margin: 0;
    }
  }

  .event-card__header {
    @include flex-space-between;
    align-items: flex-start;
    padding-top: 25px;
  }

  .event-card__details-btn {
    background-color: $highlight-c;
    color: $white;
    padding: 8px 16px;
    border-radius: $border-r-xl;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
    margin-left: 10px;
    box-shadow: 0 2px 8px rgba($highlight-c, 0.5);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }

  .event-card__footer {
    @include flex-space-between;
    align-items: flex-end;
    margin-top: 15px;
  }

  .event-card__dates p {
    line-height: 1.5;
    margin: 0;
    color: $black;
  }

  .event-card__price-wrapper {
    text-align: right;
  }

  .event-card__price {
    color: $primary-c700;
    &--free {
      color: $semantic-g;
    }
  }

  // 分類文字顏色
  .category-text {
    &--health {
      color: #6782a4;
    }
    &--travel {
      color: #ca877b;
    }
    &--art {
      color: #719469;
    }
    &--other {
      color: #959595;
    }
  }
</style>
