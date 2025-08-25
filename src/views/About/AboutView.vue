<script setup>
  import MainBanner from '@/components/MainBanner.vue';
  import { onMounted, onUpdated } from 'vue';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  function scrollToTop() {
    const mapContainer = document.querySelector('.about-section');
    if (mapContainer) {
      mapContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  onMounted(() => {
    AOS.init({
      once: false,
      duration: 900,
      offset: 80,
    });

    setTimeout(() => {
      AOS.refreshHard();
    }, 250);
  });
</script>

<template>
  <main>
    <MainBanner
      image="assets/banner/banner_about.jpg"
      title="空瀧浪里 就像這樣"
      titleAos="fade"
    />
    <!-- <section class="banner-container">
     <img :src="banner" alt="" />
    <div class="overlay">
    </div>
    <div class="text-overlay">
      <h1 class="bold">空瀧浪里 就像這樣</h1>
    </div>
  </section> -->
    <section class="about-section" id="about-section">
       <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">
        <p class="body--b3">首頁</p>
      </RouterLink>
      <p class="body--b3">/</p>
      <RouterLink to="/about">
        <p class="body--b3">關於社區</p>
      </RouterLink>
    </div>
    </div>

      <div class="map-container">
      <img src="../../assets/image/about_map.png" alt="社區地圖" class="map-image" />
      <img src="../../assets/image/about01.gif" alt="動態圖" class="custom-gif01" />

        <div class="location-marker location-center" data-aos="zoom-in">
          <img src="../../assets/image/about_center.png" alt="活動中心" class="location-icon clickable "   @click="scrollToSection('mayor-intro3')" />
          <div class="location-label-center">活動中心</div>
          <div class="speech-bubble">
            <p>社區活動多元，聚會聯誼好去處，里民互動成長，歡迎參加每場活動！</p>
          </div>
        </div>

        <div class="location-marker location-office" data-aos="zoom-in">
        <img src="../../assets/image/about_office.png" alt="里辦公室" class="location-icon clickable" @click="scrollToSection('mayor-intro')"/>
          <div class="location-label-office">里辦公室</div>
          <div class="speech-bubble">
            <p>您的社區好厝邊，辦事親切有效率，活動服務樣樣通，歡迎隨時來坐坐！</p>
          </div>
        </div>

        <div class="location-marker location-farm" data-aos="zoom-in">
        <img src="../../assets/image/about_farm.png" alt="有機梨園" class="location-icon clickable" @click="scrollToSection('mayor-intro2')"/>
          <div class="location-label-farm">有機梨園</div>
          <div class="speech-bubble">
            <p>自然農法共耕，農事體驗，親近自然，親子踏青，樂在美好生活。</p>
          </div>
        </div>
      </div>


      <!-- 下方描述文字 -->
      <div class="about-text-container">
        <img src="../../assets/image/about02.gif" alt="動態圖" class="custom-gif02" />
        <div
          class="about-text"
          data-aos="fade"
        >
          <p class="body--b2">
            空瀧浪里是深山老林中的一個小村莊，人口約800人。
            <br />
            四周群山環繞，村民們充滿活力。
            <br />
            這裡沒有紅綠燈，也沒有便利商店，卻充滿了笑容和豐富的自然風光。
            <br />
            何不在這個時間緩慢流逝的村莊體驗自然的生活方式呢？
          </p>
        </div>
      </div>
    </section>
    <section class="mayor-intro" id="mayor-intro">
      <div class="leader-info">
        <h2 class="bold">里長簡介</h2>
      </div>

      <div
        class="intro-section"
        data-aos="fade"
      >
        <div class="images">
          <div class="img-large">
            <img
              src="../../assets/image/about_01.jpg"
              alt="梨樹"
            />
          </div>
          <div class="img-small">
            <img
              src="../../assets/image/about_02_leader.jpg"
              alt="里長"
            />
          </div>
        </div>
      </div>
      <div
        class="text-content"
        data-aos="fade"
      >
        <div class="text-content-title">
          <h3 class="regular">孔融郎 里長</h3>
        </div>
        <div class="text-content-inner">
          <p class="body--b2">
            孔融郎里長，自上任以來，里長致力於打造一個溫暖、有教育力的社區，讓「空瀧浪里」成為真正值得驕傲的美德家園。出身在地家庭的孔融郎里長，深知社區的每一分土地與人情，將「教育即生活」作為施政核心，推動多項以品格與環保為主軸的社區建設與活動，包括：
          </p>

          <ul>
            <li><p class="body--b2">推廣有機梨園教育體驗，讓孩子認識土地、尊重自然</p></li>
            <li><p class="body--b2">設立「活動中心」，定期舉辦親子共學與長者共伴課程</p></li>
            <li><p class="body--b2">提倡世代共融、鄰里互助，建立更具人情味的里民關係</p></li>
          </ul>
          <p class="body--b2">
            以謙遜為本、服務為志，致力於讓每一位居民都能在空瀧浪里找到歸屬與驕傲。
          </p>
        </div>
      </div>
      <div
        class="contacts"
        data-aos="fade"
      >
        <div class="contact-item">
          <img
            src="../../assets/image/tel.png"
            alt="電話"
          />
          <div><h4 class="regular">里辦電話</h4></div>
          <div><p class="body--b2">0987654321</p></div>
        </div>
        <div class="contact-item">
          <img
            src="../../assets/image/mail.png"
            alt="信箱"
          />
          <div><h4 class="regular">里辦信箱</h4></div>
          <div><p class="body--b2">konlongzhood@gmail.com</p></div>
        </div>
        <div class="contact-item">
          <img
            src="../../assets/image/map.png"
            alt="地址"
          />
          <div><h4 class="regular">里辦地址</h4></div>
          <div><p class="body--b2">桃園市中壢區<br></br>空瀧浪里孔融路1號</p></div>
        </div>
      </div>

      <div class="back-to-top">
        <p class="body--b2">
          <a
            href="#"
            @click.prevent="scrollToTop"
          >
            TOP
          </a>
        </p>
      </div>
    </section>
    <section class="mayor-intro2" id="mayor-intro2">
      <div class="leader-info">
        <h2 class="bold">特色農產</h2>
      </div>

      <div
        class="intro-section"
        data-aos="fade"
      >
        <div class="images">
          <div class="img-large">
            <img
              src="../../assets/image/about_03.jpg"
              alt="梨"
            />
          </div>
          <div class="img-small">
            <img
              src="../../assets/image/about_04.jpg"
              alt="房梨"
            />
          </div>
        </div>
      </div>
      <div
        class="text-content"
        data-aos="fade"
      >
        <div class="text-content-title">
          <h3 class="regular">傳承孔融精神的甜美果鄉</h3>
        </div>
        <div class="text-content-inner">
          <p class="body--b2">
            「空瀧浪里」這個溫馨的名稱，源自東漢時期流傳千古的美德故事──孔融讓梨。年僅四歲的孔融，懂得將大梨讓給哥哥們，自己選擇較小的，展現出尊重長輩、禮讓他人的品德。這段故事深入人心，也成為本里推廣倫理教育、社區文化的重要象徵。
            如今的「空瀧浪里」不僅是品德教育的起點，更是天然美味的故鄉。這裡擁有一片片用心耕作的有機梨園，農民秉持對土地與健康的尊重，採用友善環境的方式種植每一顆梨子，讓自然風味回歸舌尖。
            無毒栽種、不施化肥，造就了果實甜潤多汁的特色。每一口梨子，都像是延續了孔融的心意──溫柔、純淨、值得分享。
            歡迎走進梨子里，不只是品嚐梨子，更是品味一段源遠流長的文化記憶。
          </p>
        </div>
      </div>
      <RouterLink
        to="/Events"
        class="about-btn"
      >
        <div class="btn-img">
          <img
            src="../../assets/image/about_pear_btn01.jpg"
            alt=""
          />
        </div>
        <span>活動體驗</span>
      </RouterLink>

      <div class="back-to-top">
        <p class="body--b2">
          <a
            href="#"
            @click.prevent="scrollToTop"
          >
            TOP
          </a>
        </p>
      </div>
    </section>
    <section class="mayor-intro3" id="mayor-intro3">
      <div class="leader-info">
        <h2 class="bold">活動中心</h2>
      </div>

      <div
        class="intro-section"
        data-aos="fade"
      >
        <div class="images">
          <div class="img-large">
            <img
              src="../../assets/image/about_05.jpg"
              alt=""
            />
          </div>
          <div class="img-small">
            <img
              src="../../assets/image/about_06.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        class="text-content"
        data-aos="fade"
      >
        <div class="text-content-title">
          <h3 class="regular">孔融的精神，在教育社區延續</h3>
        </div>
        <div class="text-content-inner">
          <p class="body--b2">
            空瀧浪里，這個充滿故事與希望的社區名字，來自家喻戶曉的典故──孔融讓梨。小小年紀的孔融主動將較大的梨子讓給哥哥，展現了尊重與分享的美德。這不只是中華傳統文化的一段佳話，更成為梨子里推動品格教育的根基。
            本社區以「禮讓」、「尊重」、「分享」作為教育核心，推動多元社區學習活動：
          </p>

          <ul>
            <li>
              <p class="body--b2">
                品格故事講堂：透過說故事與角色扮演，讓孩子從生活中實踐孔融的精神。
              </p>
            </li>
            <li>
              <p class="body--b2">
                代間學習計畫：長者與孩童一同參與梨園志工服務，促進世代交流與理解。
              </p>
            </li>
          </ul>
          <p class="body--b2">
            空瀧浪里相信，教育不只是學校的責任，更是整個社區共同的使命。我們用一顆顆親手種下的有機梨，傳遞禮讓與關愛；用一場場溫暖的活動，培養下一代的品格力量。
          </p>
        </div>
      </div>
      <RouterLink
        to="/Events"
        class="about-btn"
      >
        <div class="btn-img">
          <img
            src="../../assets/image/about_pear_btn02.jpg"
            alt=""
          />
        </div>
        <span>課程報名</span>
      </RouterLink>

      <div class="back-to-top3">
        <p class="body--b2">
          <a
            href="#"
            @click.prevent="scrollToTop"
          >
            TOP
          </a>
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

  body {
    font-family: 'Noto Sans', sans-serif;
  }
  main {
    background-color: $primary-c000;
  }

  // 共用樣式
  a {
    color: $black;
  }
  .section-title {
    max-width: 1920px;
    margin: 0 auto;
    margin-bottom: 40px;
    position: relative;
    text-align: center;
    h2 {
      font-weight: bold;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 35%;
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

// 麵包屑
.container{
      padding: 1.5625vw 18.75vw 0 ;
      @include desktop {
        padding-left: 10%;
        padding-right: 10%;
      }
.breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      
  p {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.2em;
  }
}
}

  // 地圖區塊

  .map-container {
      position: relative; 
      max-width: 683px;
      margin: 0 auto; 
    .map-image {
        position: relative; 
        top: 100px;
        display: block;
        width: 100%;
        height: auto; 
        z-index: 1;
     }
    .location-marker {
      position: absolute;
        .speech-bubble {
          position: absolute;
          bottom: 120%; 
          left: 50%;
          transform: translateX(-50%);
          display: none; 
          width: 180px;
          background: #ffffff;
          color: #000000;
          padding: 8px 12px;
          border-radius: 8px;
          text-align: left;
          font-size: 14px;
          line-height: 1.4;
        }
        .speech-bubble::after {
          content: "";
          position: absolute;
          top: 100%; 
          left: 50%;
          transform: translateX(-50%);
          border-width: 10px;
          border-style: solid;
          border-color: #ffffff transparent transparent transparent;
        }
    }
    .location-marker:hover .location-icon {
    transform: scale(1.1);
    }
    .location-marker:hover .speech-bubble {
    display: block;
    @include mobile{
            display: none;
        }
    }
    .location-center { top: 17%; left: 51%; 
      z-index: 2;
    @include mobile{
        top: 8%; left: 50%;
       }}
    .location-office { top: 35%; left: 15%; 
      z-index: 2;
    @include mobile{
        top: 25%; left: 15%;
       }}
    .location-farm  { top: 55%; left: 63%; 
      z-index: 2;
    @include mobile{
        top: 45%; left: 63%;
       }}
    .location-icon {
      width: 90%;  
      height: auto; 
      transition: transform 0.2s ease-in-out;
      @include mobile{
        width: 50%;
       }
    }
    .location-label-office {
      position: absolute;
      top: 105%;
      left: 21%;
      text-align: center;
      font-size: 20px;
      color: #333;
      margin-top: 4px;
      font-weight: bold;
      @include mobile{
        font-size: 16px;
        top: 105%;
        left: 5%;
       }
    }
    .location-label-center {
      position: absolute;
      top: 105%;
      left: 1%;
      text-align: center;
      font-size: 20px;
      color: #333;
      margin-top: 4px;
      font-weight: bold;
      @include mobile{
        font-size: 16px;
        top: 106%;
        left: -10%;
       }
    }
    .location-label-farm {
      position: absolute;
      top: 105%;
      left: 20%;
      text-align: center;
      font-size: 20px;
      color: #333;
      margin-top: 4px;
      font-weight: bold;
       @include mobile{
        font-size: 16px;
        top: 105%;
        left: 5%;
       }
    }
}

  // 關於社區簡介
  .about-text-container {
    max-width: 1920px;
    margin: 0 auto;
    background-color: $primary-c100;
    padding: 115px;
    text-align: center;
    position: relative;
    @include flex-center;
    .about-text {
      width: 788px;
      color: $black;
    }
  }

  // 里長、特色農產、活動中心三個 section 共用
  .mayor-intro,
  .mayor-intro2,
  .mayor-intro3 {
    background-color: $primary-c000;
    padding: 40px 15vw;
    text-align: center;
    line-height: 1.4;
    // margin: 0 10%;
    @include mobile{
      margin: 0 5%;
    }
    .leader-info {
      @extend .section-title;
      // 可根據不同 section 用不同底色
      &.mayor-intro2 &,
      &.mayor-intro3 & {
        &::before,
        &::after {
          background-color: $secondary-c;
        }
      }
      &.mayor-intro3 & {
        &::before,
        &::after {
          background-color: $highlight-c50;
        }
      }
    }

    .intro-section {
      max-width: 69vw;
      .images {
        display: grid;
        grid-template-columns: repeat(5, 0.5fr);
        grid-template-rows: repeat(6, 0.5fr);
        position: relative;
        height: 400px;
        
        .img-large,
        .img-small {
          border-radius: $border-r-lg;
          overflow: hidden;
        }
        .img-large {
          grid-column: 1 / 5;
          grid-row: 1 / 5;
        }
        .img-small {
          grid-column: 4 / 6;
          grid-row: 3 / 7;
          border: 3px solid white;
          z-index: 1;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
    }

    .text-content {
      position: relative;
      margin-right: 40%;
      text-align: left;
      padding: 40px 20px;
      .text-content-title {
        margin-bottom: 65px;
      }
      ul {
        margin-left: 16px;
        list-style: disc;
        li {
          margin-bottom: 8px;
        }
      }
    }

    .contacts {
      display: flex;
      justify-content: center;
      gap: 4.17vw;
      margin: 40px 0;
      > .contact-item:nth-child(2) {
        padding-left: 4.17vw;
      }
      .contact-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        h4{
          font-size: clamp(20px,1.46vw,28px);
        }
        p{
          font-size: clamp(13px,1vw,20px);
        }
        img {
          width: 36px;
          margin-bottom: 8px;
        }
        > div:nth-child(2) {
          margin-bottom: 4px;
        }
      }
    }

    .about-btn {
      display: flex;
      align-items: center;
      background-color: $secondary-c;
      border-radius: $border-r-lg;
      text-decoration: none;
      color: $black;
      width: 41.35vw;
      margin: 60px auto 10px;

      .btn-img {
        width: 15.89vw;
        height: 13.89vh;
        border-radius: 30px 0 0 30px;
        overflow: hidden;
        @include mobile{
          border-radius: 1.563vw 0 0 1.563vw;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
      span {
        margin: 0 auto;
        display: flex;
        align-items: center;
        font-size: 28px;
      }
    }

    .back-to-top,.back-to-top3{
      cursor: pointer;
      text-decoration: underline;
      text-align: right;
      margin-bottom: 240px;
    }
    
  }
  .mayor-intro2 {
    .intro-section {
      .images {
        .img-large {
          grid-column: 2 / 6;
        }
        .img-small {
          grid-column: 1 /3;
          grid-row: 3/7;
        }
      }
    }
    .about-btn {
      background-color: $secondary-c;
      &:hover {
        background-color: darken($secondary-c, 10%);
      }
    }
    .text-content {
      margin-right: 0;
      margin-left: 45%;
    }
    .leader-info {
      &::before,
      &::after {
        background-color: $secondary-c;
      }
    }
  }
  .mayor-intro3 {
    .about-btn {
      background-color: $highlight-c50;
      &:hover {
        background-color: $highlight-c100;
      }
    }
    .leader-info {
      &::before,
      &::after {
        background-color: $highlight-c50;
      }
    }
  }
  @include desktop {
    .leader-info {
        &::before,
        &::after {
        display: none;
        }
      }
  }
  // RWD
  @include mobile {
    .about-section {
      padding: 8vw 0;

      .breadcrumb {
        align-items: flex-start;
        gap: 1vw;
        p {
          font-size: 12px;
          line-height: 168%;
          letter-spacing: 0.1em;
        }
      }
      .map-container {
        max-width: 90vw;
        .map-image {
          top: 4vw;
          border-radius: 4vw;
        }
        .speech-bubble {
          width: 188px;
          height: 154px;
          left: 5vw;
          top: 56%;
          padding: 32px;

          p {
            font-size: 14px;
            line-height: 168%;
            letter-spacing: 0.1em;
          }
        }
      }
      .about-text-container {
        padding: 6vh 8vw;
        p {
          text-align: center;
        }
        .about-text {
          width: 100%;
          font-size: 4vw;
        }
      }
    }

    .mayor-intro,
    .mayor-intro2,
    .mayor-intro3 {
      padding: 0 10px;
      .intro-section {
        .images {
          
          width:85vw;
          .img-large {
            grid-row: 1 / 5;
          }
          .img-small {
            grid-column: 3 / 7;
            grid-row: 4 / 7;
          }
        }
      }
      
      .leader-info {
        &::before,
        &::after {
      display: none;
        }
      }
      .text-content {
        margin: 0;
        padding: 2vh 0;
        .text-content-title {
          margin-bottom: 4vw;
        }
        ul {
          margin-left: 4vw;
          li {
            margin-bottom: 2vw;
          }
        }
      }
      .about-btn {
        width: 240px;
        height: 77px;
        overflow: hidden;
        border-radius: $border-r-md;
        span {
          font-size: 18px;
          line-height: 168%;
          letter-spacing: 0.1em;
        }
      }

      .back-to-top {
        margin-bottom: 8vw;
        text-align: right;
      }
      .back-to-top3 {
        text-align: right;
        margin-bottom: 0px;
        padding-bottom: 15px;
      }
    }
    .mayor-intro2 {
      .intro-section {
        .images {
          .img-large {
            grid-column: 2 / 6;
            grid-row: 1 / 5;
          }
          .img-small {
            grid-column: 1 / 4;
            grid-row: 4 / 7;
          }
        }
      }
    }
    .contacts {
      margin: 0px;
      display: flex;
      flex-direction: column;
      > .contact-item:nth-child(2) {
        padding-left: 0px !important;
      }
      .contact-item {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    }
  }

  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  
  .clickable {
  cursor: pointer;
  transition: transform 0.2s;
  }

  .clickable:hover {
    transform: scale(1.1);
  }
  
  .custom-gif01 {
  position: absolute;
  top: 25%;    
  right: -20%;   
  width: 172px; 
  height: auto;
  // z-index: 10; 
  pointer-events: none; 
  @include mobile{
    display: none;
   }
  }
  .custom-gif02 {
    position: absolute;
    top: -20%;    
    left: 5%;   
    width: 172px; 
    height: auto;
    z-index: 10; 
    pointer-events: none; 
    @include mobile{
    display: none;
   }
  } 
</style>
