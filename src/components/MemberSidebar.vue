<template>
  <aside class="memberSidebar">
    <h5 class="memberSidebar__title">帳戶管理</h5>
    <img
      :src="avatarUrl"
      alt="使用者頭像"
      class="memberSidebar__avatar"
    />

    <ul class="memberSidebar__menu">
      <li
        v-for="item in menuItems"
        :key="item.name"
        class="memberSidebar__menuItem"
      >
        <router-link
          :to="item.path"
          class="memberSidebar__link btn--member"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <button
      class="memberSidebar__logoutButton btn--membercancel"
      @click="$emit('logout')"
    >
      登出
    </button>
  </aside>
</template>

<script setup>
  defineProps({
    avatarUrl: {
      type: String,
      required: true,
    },

    menuItems: {
      type: Array,
      required: true,
    },
  });

  // defineEmits 用於聲明此元件會觸發哪些自定義事件
  defineEmits(['logout']);
</script>

<style lang="scss" scoped>
  .memberSidebar {
    flex-shrink: 0;
    width: 285px;
    background-color: $white;
    border-radius: $border-r-md;
    padding: 20px;
    text-align: center;
    align-self: flex-start;
    display: flex;
    flex-direction: column;

    &__title {
      color: $primary-c700;
      margin-bottom: 30px;
    }

    &__avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 30px;
      align-self: center;
    }

    &__menu {
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex-grow: 1;
    }

    &__link {
      width: 100%;
      text-decoration: none;

      // Modifier: --active (透過 Vue Router class)
      &.router-link-exact-active {
        background-color: $primary-c700;
        color: $white;
        font-weight: 700;
      }
    }

    &__logoutButton {
      width: 100%;
      margin-top: 24px;
    }
  }
</style>
