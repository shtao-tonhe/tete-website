<!--
 * @Author: your name
 * @Date: 2020-09-23 16:18:33
 * @LastEditTime: 2020-11-26 18:59:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/layouts/error.vue
-->
<template>
  <div>
    <div
      class="jsx-3521819458 main-body page-with-header"
      v-show="error.statusCode == 404"
    >
      <div
        class="jsx-1138300191 error-container"
        :class="isMobile ? 'mobile' : ''"
      >
        <h1 class="jsx-1138300191 not-found">
          <span class="jsx-1138300191">4</span
          ><span class="jsx-1138300191 hidden">0</span
          ><img
            src="~/assets/images/smile404.png"
            alt="0"
            class="jsx-1138300191"
          /><span class="jsx-1138300191">4</span>
        </h1>
        <p class="jsx-1138300191 not-found-desc">Couldn't find this page</p>
        <p class="jsx-1138300191 recommend-desc">
          Check out more trending videos on TETE
        </p>
        <div class="jsx-762000590 menu-item visible">
          <nuxt-link
            to="/foryou"
            class="jsx-762000590 menu-item-link watch-now error-button"
          >
            <img
              src="~/assets/images/watch-icon.svg"
              alt="watch now"
              class="jsx-762000590"
            />
            <span class="jsx-762000590 text">Watch now</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <a-result
      v-show="error.statusCode == 500"
      status="500"
      title="500"
      sub-title="Sorry, the server is wrong."
    >
      <template #extra>
        <nuxt-link
            to="/"
          >
        <a-button type="primary"> Back Home </a-button>
        </nuxt-link>
      </template>
    </a-result>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: ["error"],
  data() {
    return {
      isMobile: false,
      screenWidth: 0,
    };
  },
  components: {},
  mounted() {
    this.init();
    window.addEventListener("resize", this.init);
  },
  methods: {
    init() {
      if (process.browser) {
        this.screenWidth = document.documentElement.clientWidth;
        if (this.screenWidth < 991) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.error-container.mobile h1 {
  font-size: 144px;
  line-height: 144px;
}
.error-container.mobile h1 img {
  width: 111px;
  height: 111px;
}
.error-container.mobile {
  padding-top: 46px;
}
.error-container.mobile .not-found-desc {
  margin: 16px auto 0;
  font-size: 15px;
  line-height: 18px;
}
.error-container.mobile .recommend-desc {
  font-family: "proxima-regular", PingFangSC, sans-serif;
  font-weight: 400;
  margin: 24px auto 0;
  max-width: 90%;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
}
.error-container.mobile .error-button {
  width: 250px;
  height: 48px;
  margin: 20px auto 32px;
}
.error-container {
  flex: 1;
  padding-top: 116px;
  background: url("../assets/images/bg404.png") transparent center no-repeat;
  background-size: cover;
  text-align: center;
  font-family: "sofiapro-medium", PingFangSC, sans-serif;
  font-weight: 500;
}
.error-container h1 {
  font-size: 300px;
  line-height: 244px;
  white-space: nowrap;
}
.error-container .not-found-desc {
  font-family: "proxima-regular", PingFangSC, sans-serif;
  font-weight: 400;
  margin: 24px auto 0;
  font-weight: 600;
  font-size: 18px;
  color: rgba(22, 24, 35, 0.5);
  line-height: 25px;
}

.error-container .recommend-desc {
  font-family: "sofiapro-bold", PingFangSC, sans-serif;
  font-weight: 700;
  margin: 40px auto 0;
  max-width: 622px;
  font-size: 24px;
  line-height: 28px;
  word-break: break-word;
}

.error-container h1 .hidden {
  display: none;
}
.error-container h1 img {
  width: 244px;
  height: 244px;
  vertical-align: middle;
}
.error-container .error-button {
  width: 360px;
  height: 48px;
  margin: 24px auto 130px;
}
@media (max-width: 991px) {
}
</style>
