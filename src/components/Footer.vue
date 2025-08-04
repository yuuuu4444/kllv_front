<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <footer>
    <div class="wave">

    </div>
    <div class="mainblock">
      <div class="mainblock__logo">
        <RouterLink to="/">
          <img src="/src/assets/logo/logo.png" alt="logo">
        </RouterLink>
      </div>
      <ul class="mainblock__list" role="navigation">
        <li class="mainblock__item">
          <RouterLink to="/news">
            <h5 class="medium">最新消息</h5>
          </RouterLink>
        </li>
        <li class="mainblock__item">
          <RouterLink to="/about">
            <h5 class="medium">關於社區</h5>
          </RouterLink>
        </li>
        <li class="mainblock__item">
          <RouterLink to="/events">
            <h5 class="medium">活動報名</h5>
          </RouterLink>
        </li>
        <li class="mainblock__item">
          <RouterLink to="/repair">
            <h5 class="medium">維修通報</h5>
          </RouterLink>
        </li>
      </ul>
      <div class="mainblock__info">
        <h5 class="medium">聯絡資訊</h5>
        <h5 class="regular">聯絡電話：0987654321</h5>
        <h5 class="regular">聯絡信箱：konlongzhood@gmail.com</h5>
        <h5 class="regular">聯絡地址：桃園市中壢區空瀧浪里孔融路1號</h5>
      </div>
    </div>
    <div class="disclaimer">
      <p class="body--c1">
        本網站為緯育 TibaMe 前端工程師專業技術養成班第 92 期學員專題成果作品，本平台僅供學習、展示之用。
        若有抵觸有關著作權，或有第三人主張侵害智慧財產權等情事，均由學員負法律上責任，緯育公司概不負責。
        若有侵權疑慮，請私訊緯育 TibaMe，後續會由專人協助處理。
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  @import "@/assets/scss/style";

  footer {
    width: 100%;
    z-index: 99;
    
    // position: relative;
    background-color: $primary-c000;
    background-image: url("/src/assets/image/footer4.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-position-x: 0%;

    animation: wave 30s linear infinite;
    
    @keyframes wave {
      0% {
        background-position-x: 0%;
      }
      100% {
        background-position-x: 100%;
      }
    }

    .mainblock {
      @include flex-space-between;
      width: 100%;
      padding: 10vw 2.5vw 10vw 10vw;

      &__logo {
        width: 21vw;

        img {
          width: 100%;
          height: auto;
        }
      }

      &__list, &__info {
        display: flex;
        flex-direction: column;
        gap: 1.5vw;
        h5 {
          font-size: 1.25vw;
          // font-size: clamp(16px, 1.25vw, 24px);
          color: $primary-c700;
        }
        h5.medium {
          font-weight: 500;
          letter-spacing: 0.1em;
          color: $primary-c700;
        }
      }
    }

    .disclaimer {
      padding: 12px;
      border-top: 1px solid $primary-c000;
      @include flex-center;

      p {
        font-size: clamp(8px, 0.625vw, 12px);
        color: $primary-c700;
      }
    }
  }
  @include mobile {
    footer{
      .mainblock {
        @include flex-center;
        flex-direction: column;
        padding: 40px 2%;
        gap: 40px;

        &__logo {
          width: 290px;
        }

        &__list {
          display: none;
        }
        &__info {
          h5 {
            font-size: 12px;
            font-weight: 500;
            line-height: 24px;
          }
          h5.medium {
            display: none;
          }
        }
      }        
    }
  }
</style>
