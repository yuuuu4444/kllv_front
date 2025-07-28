<script setup>
import banner from '@/assets/image/about_banner.jpg'
</script>
<template>
  
  <main>
    <section class="banner-container">
     <img :src="banner" alt="" />
    <div class="overlay">
    </div>
    <div class="text-overlay">
      <h1 class="bold">空瀧浪里 就像這樣</h1>
    </div>
  </section>
  <section class="about-section">
    <div class="breadcrumb">首頁 - 關於社區</div>

    <div class="map-container">
      <img src="../../assets/image/about_map.png" alt="社區地圖" class="map-image" />

      <!-- 說明文字泡泡 -->
      <div class="speech-bubble">
        <p class="body--b2">您的社區好厝邊，辦事親切有效率，活動服務樣樣通，歡迎隨時來坐坐！</p>
      </div>
    </div>

    <!-- 下方描述文字 -->
     <div class="about-text-container">
    <div class="about-text">
      <p class="body--b2">
      空瀧浪里是深山老林中的一個小村莊，人口約800人。<br>
      四周群山環繞，村民們充滿活力。<br>
      這裡沒有紅綠燈，也沒有便利商店，卻充滿了笑容和豐富的自然風光。<br> 
      何不在這個時間緩慢流逝的村莊體驗自然的生活方式呢？
      </p>
    </div>
    </div>
  </section>
  <section class="mayor-intro">
  <div class="leader-info">
  <h2 class="bold">里長簡介</h2>
  </div>

  <div class="intro-section">
    <div class="images">
      <div class="img-large">
      <img src="../../assets/image/about_01.jpg" alt="梨樹"  />
      </div>
      <div class="img-small">
      <img src="../../assets/image/about_02_leader.jpg" alt="里長"  />
      </div>
    </div>
  </div>
  <div class="text-content">
    <div class="text-content-title" >
      <h3 class="regular">孔融郎 里長</h3>
    </div>
    <div class="text-content-inner">
    <p class="body--b2">孔融郎里長，自上任以來，里長致力於打造一個溫暖、有教育力的社區，讓「空瀧浪里」成為真正值得驕傲的美德家園。出身在地家庭的孔融郎里長，深知社區的每一分土地與人情，將「教育即生活」作為施政核心，推動多項以品格與環保為主軸的社區建設與活動，包括：</p>

    <ul>
      <li><p class="body--b2">推廣有機梨園教育體驗，讓孩子認識土地、尊重自然</p></li>
      <li><p class="body--b2">設立「活動中心」，定期舉辦親子共學與長者共伴課程</p></li>
      <li><p class="body--b2">提倡世代共融、鄰里互助，建立更具人情味的里民關係</p></li>
    </ul>
    <p class="body--b2">以謙遜為本、服務為志，致力於讓每一位居民都能在空瀧浪里找到歸屬與驕傲。</p>
  </div>
  </div>
  <div class="contacts">
    <div class="contact-item">
      <img src="../../assets/image/tel.png" alt="電話" />
      <div><h4 class="regular">里辦電話</h4></div>
      <div><p class="body--b2">0987654321</p></div>
    </div>
    <div class="contact-item">
      <img src="../../assets/image/mail.png" alt="信箱" />
      <div><h4 class="regular">里辦信箱</h4></div>
      <div><p class="body--b2">konlongzhood@gmail.com</p></div>
    </div>
    <div class="contact-item">
      <img src="../../assets/image/map.png" alt="地址" />
      <div><h4 class="regular">里辦地址</h4></div>
      <div><p class="body--b2">桃園市中壢區空瀧浪里孔融路1號</p></div>
    </div>
  </div>

  <div class="back-to-top">
    
    
  <p class="body--b2">
    <a href="#">TOP</a>
  </p>
  </div>
</section>
</main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_typography.scss";
@import "@/assets/scss/_variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
body {
  font-family: 'Noto Sans', sans-serif;
}
  main{
    background-color: $primary-c25;
  }
  .banner-container{
    height:860px;
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  .banner-container img{
    transform: translate(0px,-140px );
    width: 100%;
  }
  .overlay{
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }
  .text-overlay {
  position: absolute; 
  top: 50%;           
  left: 50%;          
  transform: translate(-50%, -50%);
  color:$white ;

  pointer-events: none;
}
.about-section {
  background-color: #d6e9f5;
  padding: 40px 20px;
  text-align: center;

  .breadcrumb {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .map-container {
    position: relative;
    max-width: 683px;
    margin: 0 auto 40px;
    padding: 20px;

    .map-image {
      width: 100%;
      display: block;
      border-radius: 12px;
    }

    .place {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: bold;
      font-size: 14px;

      img {
        width: 60px;
        margin-bottom: 6px;
      }
    }

    .place-office {
      top: 30%;
      left: 25%;
    }
    .place-activity {
      top: 15%;
      left: 55%;
    }
    .place-pear {
      top: 70%;
      left: 60%;
    }

    .speech-bubble {
      position: absolute;
      top: 26%;
      left: 80%;
      width: 256px;
      background: white;
      padding: 32px;
      border-radius: $border-r-lg;
      
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      
      text-align: left;
    }

  }
.about-text-container{
  background-color: $primary-c100;
  padding: 115px;
  .about-text {
    width: 788px;
    margin: 115px auto;
    color: $black;
    
  }
  }
}
.mayor-intro {
  background-color:$primary-c25;
  padding: 40px 20px;
  text-align: center;
  margin: 0px 360px;
  .leader-info {
    
    margin-bottom: 40px;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 447px;
      height: 60px;
      background-color: $primary-c100;
      transform: translateY(-50%);
      z-index: 1;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  .intro-section {
  margin: 0 auto;
  gap: 24px;

  .images {
    position: relative;
    

    .img-large {
      position: relative;
      width: 990px;
      height: 350px;
      border-radius: $border-r-lg;
      overflow: hidden;
    }

    .img-small {
      position: absolute;
      width: 480px;
      height: 260px;
      border-radius:$border-r-lg;
      overflow: hidden;
      right: 30px;
      top:300px;
      transform: translateY(-50%);
      border: 3px solid white;
      background: white;
    }
    img{
      width: 100%;
    }
  }

}
  .text-content {
    position: relative;
    margin-top: 100px;
    text-align: left;
    padding: 0 20px;

    .text-content-title{
      margin-bottom: 65px;
    }

    ul {
      margin-left: 16px;
      list-style:disc;

      li {
        margin-bottom: 8px;
      }
    }
  }

  .contacts {
    display: flex;
    justify-content: center;
    gap: 100px;
    margin: 40px 0;
      >.contact-item:nth-child(2){
        padding-left: 80px;
      }

    .contact-item {
      display: flex;
      flex-direction: column;
      align-items: center;

    
      
      img {
        width: 36px;
        margin-bottom: 8px;
      }
      > div:nth-child(2) {
        
        margin-bottom: 4px;
      }
    }
  }

  .back-to-top {
    cursor: pointer;
    text-decoration: underline;
    text-align: right;
  }
}
a{
  color: $black;
}
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
