<script setup>
  import { RouterLink } from 'vue-router';
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  // 開啟子選單
  const isOpen = ref(false);
  const openDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  // 隱藏導覽列
  const isHidden = ref(false);
  const hideHaeder = () => {
    const scrollY = window.scrollY;
    const scrollLimit = window.innerHeight / 4;
    isHidden.value = scrollY > scrollLimit;
    isOpen.value = false;
  };
  onMounted(() => {
    window.addEventListener('scroll', hideHaeder);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', hideHaeder);
  });

  // 開關導覽海報
  const isShow = ref(false);
  const showPoster = () => {
    isShow.value = !isShow.value;
  };
  const hidePoster = () => {
    isShow.value = false;
  };
</script>

<template>
  <header :class="{ hidden: isHidden }">
    <div class="mainbar">
      <div class="mainbar__logo">
        <RouterLink to="/">
          <img
            src="/src/assets/logo/logo.png"
            alt="logo"
          />
        </RouterLink>
      </div>
      <ul
        class="mainbar__list"
        role="navigation"
      >
        <li class="mainbar__item">
          <RouterLink to="/news">
            <img
              src="/src/assets/icon/icon_news.png"
              alt="news-icon"
            />
            <h5 class="medium">最新消息</h5>
          </RouterLink>
        </li>
        <li class="mainbar__item">
          <RouterLink to="/about">
            <img
              src="/src/assets/icon/icon_about.png"
              alt="about-icon"
            />
            <h5 class="medium">關於社區</h5>
          </RouterLink>
        </li>
        <li
          class="mainbar__item dropdown"
          @click="openDropdown"
        >
          <a>
            <img
              src="/src/assets/icon/icon_service.png"
              alt="service-icon"
            />
            <h5 class="medium">里民服務</h5>
          </a>
          <ul
            class="dropdown__list"
            :style="{ display: isOpen ? 'flex' : 'none' }"
          >
            <li class="dropdown__item">
              <RouterLink to="/events">
                <h5 class="medium">活動報名</h5>
              </RouterLink>
            </li>
            <li class="dropdown__item">
              <RouterLink to="/repair">
                <h5 class="medium">維修通報</h5>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li class="mainbar__item">
          <RouterLink to="/community">
            <img
              src="/src/assets/icon/icon_community.png"
              alt="community-icon"
            />
            <h5 class="medium">里民開講</h5>
          </RouterLink>
        </li>
        <!-- <li class="mainbar__item">
          <RouterLink to="/member">
            <img
              src="/src/assets/icon/icon_member.png"
              alt="members-icon"
            />
            <h5 class="medium">帳戶管理</h5>
          </RouterLink>
        </li> -->
        <li class="mainbar__item">
          <RouterLink to="/login">
            <img
              src="/src/assets/icon/icon_member.png"
              alt="members-icon"
            />
            <h5 class="medium">里民登入</h5>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="infobar">
      <a
        class="infobar__mobile"
        href="tel:+886987654321"
      >
        <img
          src="/src/assets/icon/icon_mobile.png"
          alt="mobile-icon"
        />
        <h5 class="medium">電話：0987654321</h5>
      </a>
      <a
        class="infobar__mail"
        href="mailto:konlongzhood@gmail.com?subject=空瀧浪里"
      >
        <img
          src="/src/assets/icon/icon_mail.png"
          alt="mail-icon"
        />
        <h5 class="medium">電子信箱</h5>
      </a>
    </div>
  </header>
  <header class="m">
    <div class="mobilebar">
      <div class="mobilebar__logo">
        <RouterLink to="/">
          <img
            src="/src/assets/logo/logo2.svg"
            alt="logo"
          />
        </RouterLink>
      </div>
      <div
        class="mobilebar__burger"
        @click="showPoster"
      >
        <span class="l1"></span>
        <span class="l2"></span>
        <span class="l3"></span>
      </div>
    </div>
    <div
      class="mposter"
      :style="{ display: isShow ? 'flex' : 'none' }"
    >
      <div
        class="mposter__cross"
        @click="hidePoster"
      >
        x
      </div>
      <div class="mposter__top">
        <div class="mposter__images">
          <div class="mposter__image">
            <img
              src="/src/assets/image/about_01.jpg"
              alt="image"
            />
          </div>
          <div class="mposter__image">
            <img
              src="/src/assets/image/about_pear_btn02.jpg"
              alt="image"
            />
          </div>
        </div>
        <div class="mposter__slogan">
          <p class="body--b3">
            <span>雨</span>
            過天青 瀧瀧山林 天色清 空色靜
          </p>
          <p class="body--b3">
            方是
            <span>空瀧浪</span>
            好里
          </p>
        </div>
      </div>
      <div class="mposter__mid-1">
        <div class="mposter__pattern">
          <svg
            viewBox="0 0 123 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="pears"
                patternUnits="userSpaceOnUse"
                width="123"
                height="124"
              >
                <image
                  href="/src/assets/image/about_03.jpg"
                  x="0"
                  y="0"
                  width="123"
                  height="124"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <path
              d="M121.923 74.0129C116.777 104.879 83.627 127.608 55.0325 123.525C15.2045 121.483 -4.60633 88.8155 0.90728 60.7416C5.50282 28.0739 34.5597 0 64.7342 0C94.9087 0 129.582 28.0739 121.923 74.0129Z"
              fill="url(#pears)"
            />
          </svg>
        </div>
        <div class="mposter__list">
          <div class="mposter__item">
            <RouterLink
              to="/events"
              @click="hidePoster"
            >
              <img
                src="/src/assets/icon/icon_activity.png"
                alt="service-icon"
              />
              <h5 class="medium">活動報名</h5>
              <img
                src="/src/assets/icon/icon_arrow-left.svg"
                alt="arrow-icon"
              />
            </RouterLink>
          </div>
          <div class="mposter__item">
            <RouterLink
              to="/repair"
              @click="hidePoster"
            >
              <img
                src="/src/assets/icon/icon_repair.png"
                alt="service-icon"
              />
              <h5 class="medium">維修通報</h5>
              <img
                src="/src/assets/icon/icon_arrow-left.svg"
                alt="arrow-icon"
              />
            </RouterLink>
          </div>
          <div class="mposter__item">
            <RouterLink
              to="/community"
              @click="hidePoster"
            >
              <img
                src="/src/assets/icon/icon_community.png"
                alt="community-icon"
              />
              <h5 class="medium">里民開講</h5>
              <img
                src="/src/assets/icon/icon_arrow-left.svg"
                alt="arrow-icon"
              />
            </RouterLink>
          </div>
          <div class="mposter__item">
            <RouterLink
              to="/login"
              @click="hidePoster"
            >
              <img
                src="/src/assets/icon/icon_member.png"
                alt="members-icon"
              />
              <h5 class="medium">里民登入</h5>
              <img
                src="/src/assets/icon/icon_arrow-left.svg"
                alt="arrow-icon"
              />
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="mposter__mid-2">
        <div class="mposter__quicklinks">
          <div class="mposter__quicklink">
            <RouterLink
              to="/news"
              @click="hidePoster"
            >
              <svg
                viewBox="0 0 89 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.344153 49.7946C0.301803 49.3839 0.261711 48.9612 0.224872 48.5291C0.184872 48.4076 0.167376 48.1416 0.164443 47.7708C-0.0365464 45.057 -0.093219 42.0459 0.224872 39.348C0.260093 39.0493 0.299908 38.7544 0.34463 38.4642C1.59131 30.374 3.11624 26.4377 4.47082 23.87C5.98812 20.9938 9.65971 18.5854 11.4717 16.3212C13.8881 13.3018 14.6796 13.2274 17.4724 11.7921C20.5302 10.2205 21.6034 7.5129 24.4733 6.75961C27.3433 6.00632 30.4741 4.74641 35.4747 1.72714C42.7944 -2.69235 56.7047 2.5675 59.9777 4.24327C63.2507 5.91905 68.4788 8.1939 70.5656 9.70375C74.392 12.4723 73.8272 14.9508 75.9797 16.3212C78.2408 17.7607 80.3394 21.6065 82.7616 22.7637C84.9808 23.8239 86.0781 27.3927 86.9811 31.0126C89.3418 40.4771 89.8918 50.3091 87.2247 56.3823C84.5577 62.4554 81.9529 69.956 77.98 72.6849C71.6508 77.032 69.6901 78.2188 66.9786 80.2336C63.3584 82.9234 59.8736 81.8529 57.4774 83.62C54.8753 85.539 40.4753 85.3793 28.3083 83.62C25.394 83.1986 20.479 83.5081 17.4724 80.2336C15.3598 77.9326 10.2495 76.6927 8.97138 72.6849C8.32944 70.6719 6.54689 68.0117 4.47082 65.1363C2.57074 62.5045 1.61321 59.0125 0.34463 56.0312C-0.0354239 54.7069 0.359502 51.7314 0.344153 49.7946Z"
                  fill="#2aa7ff"
                />
              </svg>
              <h5 class="medium">最新消息</h5>
            </RouterLink>
          </div>
          <div class="mposter__quicklink">
            <RouterLink
              to="/"
              @click="hidePoster"
            >
              <svg
                viewBox="0 0 89 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.344153 49.7946C0.301803 49.384 0.261711 48.9613 0.224872 48.5291C0.184872 48.4076 0.167376 48.1416 0.164443 47.7709C-0.0365463 45.057 -0.0932187 42.046 0.224872 39.348C0.260093 39.0493 0.299908 38.7544 0.34463 38.4642C1.59131 30.3741 3.11624 26.4378 4.47082 23.87C5.98812 20.9938 9.65971 18.5854 11.4717 16.3212C13.8881 13.3019 14.6796 13.2274 17.4724 11.7921C20.5302 10.2206 21.6034 7.51293 24.4733 6.75964C27.3433 6.00635 30.4741 4.74644 35.4747 1.72717C42.7944 -2.69232 56.7047 2.56753 59.9777 4.24331C63.2507 5.91908 68.4788 8.19392 70.5656 9.70378C74.392 12.4723 73.8272 14.9508 75.9797 16.3212C78.2408 17.7608 80.3394 21.6065 82.7616 22.7637C84.9808 23.8239 86.0781 27.3927 86.9811 31.0126C89.3418 40.4771 89.8918 50.3092 87.2247 56.3823C84.5577 62.4554 81.9529 69.956 77.98 72.6849C71.6508 77.032 69.6901 78.2188 66.9786 80.2336C63.3584 82.9235 59.8736 81.8529 57.4774 83.62C54.8753 85.539 40.4753 85.3793 28.3083 83.62C25.394 83.1986 20.479 83.5082 17.4724 80.2336C15.3598 77.9326 10.2495 76.6928 8.97138 72.6849C8.32944 70.6719 6.54689 68.0118 4.47082 65.1363C2.57074 62.5046 1.61321 59.0125 0.34463 56.0313C-0.0354239 54.7069 0.359502 51.7314 0.344153 49.7946Z"
                  fill="#f55b34"
                />
              </svg>
              <h5 class="medium">首頁</h5>
            </RouterLink>
          </div>
          <div class="mposter__quicklink">
            <RouterLink
              to="/about"
              @click="hidePoster"
            >
              <svg
                viewBox="0 0 89 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.344153 50.3293C0.301803 49.9186 0.261711 49.4959 0.224872 49.0638C0.184872 48.9422 0.167376 48.6762 0.164443 48.3055C-0.0365464 45.5916 -0.093219 42.5806 0.224872 39.8827C0.260093 39.584 0.299908 39.2891 0.34463 38.9989C1.59131 30.9087 3.11624 26.9724 4.47082 24.4047C5.98812 21.5285 9.65971 19.12 11.4717 16.8559C13.8881 13.8365 14.6796 13.7621 17.4724 12.3267C20.5302 10.7552 21.6034 8.04757 24.4733 7.29428C27.3433 6.54099 30.4741 5.28108 35.4747 2.26181C42.7944 -2.15768 56.7047 3.10217 59.9777 4.77794C63.2507 6.45372 68.4788 8.72856 70.5656 10.2384C74.392 13.007 73.8272 15.4855 75.9797 16.8559C78.2408 18.2954 80.3394 22.1411 82.7616 23.2983C84.9808 24.3586 86.0781 27.9273 86.9811 31.5473C89.3418 41.0117 89.8918 50.8438 87.2247 56.9169C84.5577 62.9901 81.9529 70.4907 77.98 73.2195C71.6508 77.5667 69.6901 78.7535 66.9786 80.7682C63.3584 83.4581 59.8736 82.3876 57.4774 84.1547C54.8753 86.0736 40.4753 85.914 28.3083 84.1547C25.394 83.7333 20.479 84.0428 17.4724 80.7682C15.3598 78.4673 10.2495 77.2274 8.97138 73.2195C8.32944 71.2066 6.54689 68.5464 4.47082 65.6709C2.57074 63.0392 1.61321 59.5472 0.34463 56.5659C-0.0354239 55.2415 0.359502 52.2661 0.344153 50.3293Z"
                  fill="#a4ec92"
                />
              </svg>
              <h5 class="medium">關於社區</h5>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="mposter__bottom">
        <div class="mposter__info">
          <a href="tel:+886987654321">
            <img
              src="/src/assets/icon/icon_mobile.png"
              alt="mobile-icon"
            />
            <p class="body--b3">電話：0987654321</p>
          </a>
          <a href="mailto:konlongzhood@gmail.com?subject=空瀧浪里">
            <img
              src="/src/assets/icon/icon_mail.png"
              alt="mail-icon"
            />
            <p class="body--b3">電子信箱：konlongzhood@gmail.com</p>
          </a>
        </div>
        <!-- <div class="mposter__logo">
          <RouterLink to="/" @click="hidePoster">
            <img src="/src/assets/logo/logo.png" alt="logo"/>
          </RouterLink>
        </div> -->
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/style';

  header {
    position: fixed;
    top: 1.5625vw;
    left: 3.125vw;
    width: calc(100% - 6.25vw);
    z-index: 99;
    transition: transform 0.5s ease;

    .mainbar {
      @include flex-space-between;
      padding: 0.4168vw 2.084vw;

      border-radius: $border-r-md;
      border-bottom-left-radius: 0;
      background-color: $white;
      &__logo {
        width: 21vw;
        img {
          width: 100%;
          height: auto;
        }
      }
      &__list {
        display: flex;
        gap: 4.168vw;
        img {
          width: 3.125vw;
          height: auto;
          margin: auto;
        }
        h5.medium {
          color: black;
          font-size: clamp(15px, 1.25vw, 25px);
          font-weight: 500;
          letter-spacing: 0.1em;
        }
        :nth-child(1){
          &:hover{
            img{
            content: url(/src/assets/icon/news.gif);
            width: 3.125vw;
            height: auto;
            margin: auto;
            }
          }
        }
        :nth-child(2){
          &:hover{
            img{
            content: url(/src/assets/icon/about.gif);
            width: 3.125vw;
            height: auto;
            margin: auto;
            }
          }
        }
        :nth-child(3){
          &:hover{
            img{
            content: url(/src/assets/icon/service.gif);
            width: 3.125vw;
            height: auto;
            margin: auto;
            }
          }
        }
        :nth-child(4){
          &:hover{
            img{
            content: url(/src/assets/icon/community.gif);
            width: 3.125vw;
            height: auto;
            margin: auto;
            }
          }
        }
        :nth-child(5){
          &:hover{
            img{
            content: url(/src/assets/icon/login.gif);
            width: 3.125vw;
            height: auto;
            margin: auto;
            }
          }
        }    
      }
      &__item {
        &:hover {
          // border-radius: 50%;
          // background-color: $primary-c000;
          // box-shadow: 0 0 16px $primary-c500;
        }
      }
      .dropdown {
        position: relative;
        cursor: pointer;

        &__list {
          display: none;
          flex-direction: column;
          position: absolute;
          // top: 132%;
          left: -1.042vw;
          width: calc(100% + 2.084vw);
          margin-top: 1.042vw;
          padding: 1.042vw 1.042vw;
          gap: 1.042vw;
          border-radius: 0 0 15px 15px;
          background-color: $white;
        }
      }
    }

    .infobar {
      display: flex;
      width: 30vw;
      gap: 2.084vw;
      padding: 0.521vw 2.084vw;
      border-radius: 0 0 15px 15px;
      background-color: $white;
      &__mobile,
      &__mail {
        display: flex;
        align-items: center;
        img {
          height: 1.5vw;
        }
        h5.medium {
          color: $black;
          font-size: 1.25vw;
          font-weight: 500;
          letter-spacing: 0.1em;
        }
      }
    }
  }

  header.hidden {
    transform: translateY(-91%);
  }

  header.m {
    display: none;
  }

  @include desktop {
    header {
      .mainbar {
        &__list {
          gap: 3.126vw;
        }
      }
    }
  }
  @include mobile {
    header {
      display: none;
    }

    header.m {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;

      .mobilebar {
        @include flex-space-between;
        padding: 10px 8%;
        background-color: $white;
        border-radius: 0 0 15px 15px;
        &__logo {
          width: 100px;
          img {
            width: 100%;
            height: auto;
          }
        }
        &__burger {
          display: flex;
          flex-direction: column;
          gap: 4.8px;
          cursor: pointer;
          span {
            width: 32px;
            height: 4px;
            border-radius: 2px;
            background-color: $primary-c700;
          }
          .l2 {
            background-color: $primary-c500;
            &:hover {
              box-shadow: 0 0 1.25em $primary-c500;
            }
          }
          .l1 {
            background-color: $primary-c100;
          }
        }
      }

      .mposter {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 100vw;
        padding: clamp(32px, 10vw, 48px) clamp(16px, 5vw, 24px);
        gap: clamp(40px, 12.5vw, 60px);
        z-index: 100;
        border: 2.5vw solid $primary-c700;
        background-color: $white;

        overflow-y: auto; // 允許垂直滾動
        overscroll-behavior: contain; // 手機上避免背景滑動
        -webkit-overflow-scrolling: touch; // iOS 上更順暢

        &__cross {
          position: fixed;
          top: 4px;
          right: 8%;
          font-size: clamp(40px, 12.5vw, 60px);
          font-weight: 900;
          color: $primary-c700;
          cursor: pointer;
        }

        &__top {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: auto;
          gap: 4px;
        }
        &__images {
          @include flex-center;
          width: 100%;
          gap: clamp(20px, 6.25vw, 30px);
        }
        &__image {
          width: 45%;
          max-width: 216px;
          aspect-ratio: 4 / 3;
          &:hover {
            opacity: 80%;
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
        }
        &__slogan {
          @include flex-center;
          width: 100%;
          flex-direction: column;
          gap: 4px;
          p {
            font-size: clamp(12px, 3.75vw, 18px);
          }
          span {
            font-size: clamp(18px, 5.625vw, 28px);
            font-weight: bold;
            color: $primary-c500;
          }
        }

        &__mid-1 {
          @include flex-center;
          width: 100%;
          margin-bottom: auto;
          gap: clamp(24px, 7.5vw, 36px);
        }
        &__pattern {
          width: 45%;
          max-width: 216px;
          &:hover {
            opacity: 80%;
          }
          svg {
            width: 100%;
            height: auto;
          }
        }
        &__list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 5vw, 24px);
        }
        &__item {
          a {
            display: flex;
            flex-direction: row;
            gap: 2px;
            padding: 2px 0;
            border-bottom: 4px dotted $black;
          }
          img {
            width: clamp(16px, 5vw, 24px);
            height: auto;
            margin: auto;
          }
          h5.medium {
            color: black;
            font-size: clamp(16px, 5vw, 24px);
            font-weight: 500;
            letter-spacing: 0.1em;
          }
        }

        &__mid-2 {
          @include flex-center;
          width: 100%;
        }
        &__quicklinks {
          @include flex-center;
          width: 100%;
          gap: clamp(12px, 3.75vw, 18px);
        }
        &__quicklink {
          width: 30%;
          max-width: 144px;
          &:hover {
            opacity: 80%;
          }
          a {
            position: relative;
            @include flex-center;
          }
          svg {
            width: 100%;
            height: auto;
          }
          h5.medium {
            position: absolute;
            top: 50;
            left: 50;
            color: $white;
            font-size: clamp(16px, 5vw, 24px);
            font-weight: 500;
            letter-spacing: 0.1em;
          }
        }

        &__bottom {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: auto;
          margin-bottom: auto;
          gap: clamp(40px, 12.5vw, 60px);
        }
        &__info {
          @include flex-center;
          width: 100%;
          flex-direction: column;
          gap: 4px;
          a {
            @include flex-center;
          }
          img {
            width: clamp(12px, 3.75vw, 18px);
            height: auto;
          }
          p {
            font-size: clamp(12px, 3.75vw, 18px);
            font-weight: 500;
            color: $black;
            cursor: pointer;
          }
        }
        &__logo {
          width: 90%;
          max-width: 432px;
          margin: auto;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>
