<script setup>
  import SubBanner from '@/components/SubBanner.vue'; 
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const postId = Number(route.params.id)

  const newsPosts = [
      {id: 1, title: "敬老愛心卡新制上路", type: 1, tag: "公告", date: "2025.07.04"},
      {id: 2, title: "長照家庭喘息服務補助，申請辦法看這裡", type: 2, tag: "補助", date: "2025.07.04"},
      {id: 3, title: "恐龍公園步道整修即將展開，預定 7 月底完成", type:3, tag: "施工", date: "2025.07.04"},
      {id: 4, title: "丹娜絲颱風即將來臨，里民防颱措施整理", type:3, tag: "防災", date: "2025.07.04"},
      {id: 5, title: "第 41 屆空龍馬拉松報名開始", type: 2, tag: "活動", date: "2025.07.04"},
      {id: 6, title: "社區夜間照明將升級為 LED，預計 9 月初完工", type: 3, tag: "施工", date: "2025.07.04"},
      {id: 7, title: "暑期育兒津貼開放申請，家長請把握時間", type: 2, tag: "補助", date: "2025.07.04"},
      {id: 8, title: "中元普渡時間與交通管制路段一次看", type: 1, tag: "公告", date: "2025.07.04"},
      {id: 9, title: "端午粽子吃不完！免費粽子大放送！", type: 2, tag: "活動", date: "2025.07.04"},
      {id: 10, title: "地震防災演練地點宣布", type: 3, tag: "防災", date: "2025.07.04"},
      {id: 11, title: "近期詐騙案件頻傳，提醒大家勿輕信陌生電話", type: 1, tag: "公告", date: "2025.07.04"},
  ];

  const post = newsPosts.find(p => p.id == postId)
</script>

<template>
  <SubBanner title="最新消息" />
  <div class="container" v-if="post">
    <div class="news__title">
      <p>{{ post.tag }} ｜ {{ post.date }}</p>
      <h2 class="bold">{{ post.title }}</h2>
    </div>
    <div class="news__article">
      <p>{{ post.content }}</p>
    </div>
  </div>
  <div v-else>
    <p>找不到這篇文章</p>
  </div>
</template>
