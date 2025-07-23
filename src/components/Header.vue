<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/news">最新消息</RouterLink>
        <RouterLink to="/about">關於社區</RouterLink>
        <RouterLink to="/">里民服務</RouterLink>
        <RouterLink to="/">里民開講</RouterLink>
        <RouterLink to="/member">帳戶管理</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
