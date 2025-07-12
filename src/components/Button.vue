<script setup>
import { ref } from 'vue'

//計算數量
const count = ref(1)
const addCount = () => {
  // console.log(count) //不能直接使用count，要取其值
  // console.log(count.value)
  count.value += 10
}

//切換音樂
const music = ref(false)
const toogleMusic = () => {
  music.value = !music.value
}
const name = ref('Yuuuu')
const list = ref(['🍔', '🍟', '🍕'])

// defineProps({
//   msg: {
//     type: String,
//     required: true,
//   },
// })
</script>

<template>
  <div>
    <span v-for="item in list">{{ item }}</span>

    {{ count }}
    <button @click="addCount">新增</button>
    <hr />
    <!-- 按下面這個按鈕music會開關，開的時候顯示name，關的時候不要顯示 -->
    <!-- <button @click="toogleMusic">切換</button> -->
    <button
      :style="{ color: music ? 'red' : 'black' }"
      @mouseenter="music = true"
      @mouseleave="music = false"
      @click="toogleMusic"
    >
      切換
    </button>
    <p v-if="music">大聲甚麼啦</p>
    <input type="text" v-model="name" />
    <button @click="name = 'YU'">x</button>
    {{ name }}
    <!-- {{ music }} -->
    <!-- {{ list }} -->
  </div>
  <!-- <a href="https://www.notion.so/Knowlege-board-88dbfe7f7102449b9bcf822456b88da5></a> -->
  <!-- <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div> -->
</template>

<style scoped></style>
