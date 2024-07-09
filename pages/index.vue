<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-03-01 22:11:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div>
    <vHeader v-show="isType === '1'"></vHeader>
    <div
      class="jsx-45460717 main-body main-body"
      :class="isType === '1' ? 'page-with-header' : ''"
    >
      <img
        style="display: none"
        src="http://www.mysecuressls.com/images/seals/crazy_secure_01.png"
        border=" 0"
      />
      <div class="home-container" style="padding-top: 0">
        <div class="home-content">
          <div class="banner-video-small">
            <div class="jsx-1994528170 banner-video-container">
              <videoItem
                ref="oneItem"
                v-if="isType === '1'"
                :istype="1"
              ></videoItem>
            </div>
          </div>
          <swiperHome v-if="isType === '2'" ref="twoItem"></swiperHome>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "~/components/vHeader/index.vue";
import qs from "qs";
import videoItem from "~/components/videoItem/index.vue";
import swiperHome from "~/components/swiperHome/index.vue";
export default {
  name: "home",
  layout: "home",
  components: {
    videoItem,
    swiperHome,
    vHeader,
  },
  data() {
    return {
      screenWidth: 0,
      videoList: [],
      isType: "2",
    };
  },
  mounted() {
    this.isType = "2";
    this.getList();
    window.addEventListener("resize", this.init);

    if (this.$route.query.code && !this.$store.state.auth.token) {
      this.$api
        .guest_front_oath_linkedin({
          appid: "86gyxelb6wsdsz",
          auth_type: "web",
          redirect: "https://teteday.com/",
          state: this.$route.query.state,
          code: this.$route.query.code,
        })
        .then((res) => {
          this.$utils.loginSuccess(res, this);
        });
    }
  },

  methods: {
    init() {
      if (process.browser) {
        this.screenWidth = document.documentElement.clientWidth;
        if (this.screenWidth < 991) {
          this.isType = "1";
        } else {
          this.isType = "2";
        }
        this.$nextTick(() => {
          this.initVideo();
        });
      }
    },
    initVideo() {
      try {
        if (this.isType === "2") {
          this.$refs.twoItem.init(this.videoList);
        } else {
          this.$refs.oneItem.init(this.videoList);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getList() {
      let data = localStorage.getItem("homeRecommendList");
      let time = localStorage.getItem("homeRecommendListTime");
      if (time && Number(time) + 60000 >= +new Date() && data) {
        this.videoList = JSON.parse(data);
        this.init();
      } else {
        let res = await this.$api
          .guest_video_homeRecommendList()
          .catch(() => {});
        if (res.data.length > 0) {
          localStorage.setItem("homeRecommendList", JSON.stringify(res.data));
          localStorage.setItem("homeRecommendListTime", +new Date());
          this.videoList = res.data;
          this.init();
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
