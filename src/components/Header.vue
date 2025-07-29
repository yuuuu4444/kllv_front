<script setup>
  import { RouterLink } from 'vue-router';
  import { ref, onMounted, onBeforeUnmount } from 'vue'

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
    isHidden.value = (scrollY > scrollLimit);
  };
  onMounted(() => {
    window.addEventListener('scroll', hideHaeder)
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', hideHaeder)
  });
</script>

<template>
  <header :class="{ hidden: isHidden }">
    <div class="mainbar">
      <div class="mainbar__logo">
        <RouterLink to="/index">
          <img src="/src/assets/image/logo.png" alt="logo">
        </RouterLink>
      </div>
        <ul class="mainbar__list" role="navigation">
          <li class="mainbar__item">
            <RouterLink to="/news">
              <img src="/src/assets/icon/icon_news.png" alt="news-icon">
              <h5 class="medium">最新消息</h5>
            </RouterLink>
          </li>
          <li class="mainbar__item">
            <RouterLink to="/about">
              <img src="/src/assets/icon/icon_about.png" alt="about-icon">
              <h5 class="medium">關於社區</h5>
            </RouterLink>
          </li>
          <li class="mainbar__item dropdown" @click="openDropdown">
            <a>
              <img src="/src/assets/icon/icon_services.png" alt="services-icon">
              <h5 class="medium">里民服務</h5>
            </a>
            <ul class="dropdown__list" :style="{ display: isOpen ? 'flex' : 'none' }">
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
              <img src="/src/assets/icon/icon_community.png" alt="community-icon">
              <h5 class="medium">里民開講</h5>
            </RouterLink>
          </li>
          <li class="mainbar__item">
            <RouterLink to="/member">
              <img src="/src/assets/icon/icon_member.png" alt="members-icon">
              <h5 class="medium">帳戶管理</h5>
            </RouterLink>
          </li>
        </ul>
    </div>
    <div class="infobar">
        <a class="infobar__mobile" href="tel:+886987654321">
          <img src="/src/assets/icon/icon_mobile.svg" alt="mobile-icon">
          <h5 class="medium">電話：0987654321</h5>
        </a>
        <a class="infobar__mail" href="mailto:konlongzhood@gmail.com?subject=空瀧浪里">
          <img src="/src/assets/icon/icon_mail.svg" alt="mail-icon">
          <h5 class="medium">電子信箱</h5>
        </a>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @import "@/assets/scss/style";

  
  header {
    position: fixed;
    top: 1.5625vw;
    left: 3.125vw;
    width: calc(100% - 6.25vw);
    z-index: 99;
    transition: transform 0.5s ease;

    .mainbar {
      padding: 0.4168vw 2.084vw;
      @include flex-space-between;

      border-radius: $border-r-md;
      border-bottom-left-radius: 0;
      background-color: $white;
      // background-color: $primary-c000;

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
          font-size: 1.25vw;
          font-weight: 500;
          letter-spacing: 0.1em;
        }
      }
      .dropdown {
        position: relative;

        &__list {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 132%;
          left: -0.521vw;
          width: calc(100% + 1.042vw);
          gap: 1.042vw;
          padding: 1.042vw 0.521vw;
          border-radius: 0 0 15px 15px;
          background-color: $white;
          // background-color: $primary-c000;
        
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
      // background-color: $primary-c000;

      &__mobile, &__mail {
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
</style>
