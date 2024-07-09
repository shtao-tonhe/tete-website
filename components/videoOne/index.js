var Player = ''
if (process.browser) {
  // 在这里根据环境引入wow.js
  Player = require("xgplayer");
}
import * as Cookies from "js-cookie";

import videoLoading from "@/components/videoLoading/index.vue";
import { mapState } from "vuex";

export default {
  name: "videoOne",
  components: {
    videoLoading
  },
  data() {
    return {
      player: {},
      showVideo: false,
      showLoading: false,
      loading: false,
      showError: false,
      time: 0
    };
  },
  props: {
    item: {
      default: () => {},
      type: Object
    },
    currentIndex: {
      default: 0,
      type: Number
    },
    index: {
      default: 0,
      type: Number
    },
    isHorizontal: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    showLoading(newVal) {
      this.$emit("setloading", newVal);
    },
    volumeStatus(curval, oldval) {
      if (curval === 1) {
        this.player.volume = 1;
      } else {
        this.player.volume = 0;
      }
    },
    playStatus(curval, oldval) {
      if (!curval) {
        this.player.pause();
      } else {
        this.player.play();
      }
    }
  },
  computed: mapState({
    volumeStatus: function(state) {
      return state.volumeStatus;
    },
    playStatus: function(state) {
      return state.playStatus;
    }
  }),
  mounted() {
    this.$emit("setloading", false);
    // this.player && this.player.destroy && this.player.destroy(true);
    this.initVideo();
  },

  destroyed() {
    this.player && this.player.destroy && this.player.destroy();
  },
  methods: {
    reload(type) {
      if (type) {
        this.time = 0;
      }
      if (this.time < 5) {
        if (this.player) {
          this.player && this.player.pause();
          setTimeout(() => {
            this.initVideo();
          }, 300);
        }

        console.log("重试~", this.time);
        this.time++;
      }
      // this.player && this.player.reload();
    },
    initVideo() {
      try {
        console.log( this.item.file.m3u8url,'---------------------')
        this.player = new Player({
          // id: 'mse',
          el: document.querySelector(".mse" + this.currentIndex),
          url: this.item.file.m3u8url,
          videoInit: true,
          autoplay: true,
          lang: "en",
          loop: true,
          poster:  this.item.cover,
          volume: this.volumeStatus,
          height: "100%",
          controls: true,
          ignores: [
            "definition",
            "error",
            "fullscreen",
            "i18n",
            "loading",
            "mobile",
            "pc",
            "play",
            "poster",
            "replay",
            "volume"
          ],
          "x5-video-player-type": "h5",
          "x5-video-orientation": "portraint",
          width: "100%",
          closeVideoClick: true,
          closeVideoDblclick: true,
          closeVideoTouch: true,
          closePlayerBlur: true,
          closeControlsBlur: true,
          closeFocusVideoFocus: true,
          closePlayVideoFocus: true,
          enableContextmenu: true,
          disableProgress: this.item.is_ad === 2,
          allowPlayAfterEnded: true,
          allowSeekAfterEnded: true,
          playsinline: true
        });

        this.player.on("play", this.playFun);
        this.player.on("pause", this.pauseFun);
        this.player.on("timeupdate", this.timeupdate);
        this.player.on("waitting", this.waitingFun);
        this.player.on("error", this.error);
        this.player.once("ready", () => {
          this.showLoading = true;
          this.player && (this.player.volume = this.volumeStatus);
        });
      } catch (error) {
        console.error(error, "00000");
        this.showError = true;
        this.showLoading = false;
      }
    },
    error(err) {
      this.showLoading = false;
      this.showError = true;
      console.log("错误", err);
      this.reload();
    },
    timeupdate() {
      if (this.player.currentTime > 0) {
        if (
          this.player.currentTime + 1 > this.player.duration &&
          !this.loading
        ) {
          this.loading = true;

          this.$api
            .front_video_addWatchAdInfo({
              video_id: this.item.id,
              position_name: Cookies.get("addressInfo") || "",
              lon: Cookies.get("lon"),
              lat: Cookies.get("lat")
            })
            .then(res => {
              if (
                res.code === 0 &&
                res.data &&
                res.data.integral > 0 &&
                res.data.is_ad === 2
              ) {
                this.$message.success(
                  `Congratulations on getting ${res.data.integral}TB`
                );
              }
            })
            .catch(err => {
              setTimeout(() => {
                this.loading = false;
              }, 3000);
            });
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        }
        this.showVideo = true;
        this.showError = false;
        this.showLoading = false;
      }
      // console.log('111')
    },

    waitingFun() {
      console.log("等待");
      this.showLoading = true;
      this.$store.commit("setPlayStatus", false);
    },
    pauseFun() {
      this.$store.commit("setPlayStatus", false);
    },
    playFun() {
      this.index === this.currentIndex &&
        this.$store.commit("setPlayStatus", true);
    }
  }
};
