/*
 * @Author: your name
 * @Date: 2020-10-18 22:01:31
 * @LastEditTime: 2021-01-30 16:31:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/components/videoPlay/index.js
 */
// pluginName.js
import videoLoading from "@/components/videoLoading/index.vue";
var Player
if (process.browser) {
  // 在这里根据环境引入wow.js
  Player = require("xgplayer");
}
export default {
  components: {
    videoLoading
  },
  props: {
    index: {
      default: 0,
      type: Number
    },
    list: {
      default: () => [],
      type: Array
    },
    currentIndex: {
      default: 0,
      type: Number
    },
    lastIndex: {
      default: 0,
      type: Number
    },
    volume: {
      default: 0,
      type: Number
    },
    showVideoModal: {
      default: false,
      type: Boolean
    },
    currentVideo: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      player: {},
      current: 0,
      pause: true,
      length: 0,
      play: false,
      showVideo: false,
      loading: false,
      showLoading: false
    };
  },
  watch: {
    currentVideo(newVal, val) {
      console.log(newVal);
      if (this.currentVideo === this.index) {
        this.showVideo = false;
        if (!this.player) {
          this.initVideo();
        } else {
          this.player.replay();
        }
      }
    }
  },
  mounted() {
    this.current = 0;
    this.length = this.list.length;
    this.initVideo();
  },
  methods: {
    test() {
      console.log("122222222");
    },
    initVideo() {
      try {
        this.player = new Player({
          // id: 'mse',
          el: document.querySelector(".mse" + this.index),
          url: this.list[this.current].file.m3u8url,
          videoInit: true,
          autoplay: true,
          lang: "en",
          loop: true,
          poster: this.list[this.current].cover,
          volume: this.volume,
          height: "100%",
          controls: false,
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
          disableProgress: true,
          allowPlayAfterEnded: true,
          allowSeekAfterEnded: true,
          playsinline: true
        });

        this.player.on("play", this.playFun);
        this.player.on("pause", this.pauseFun);
        this.player.on("timeupdate", this.timeupdate);
        this.player.on("waitting", this.waitingFun);
        this.player.on("ended", this.ended);

        this.player.once("ready", () => {
          this.index === this.currentVideo && (this.showLoading = true);
        });
      } catch (error) {
        console.error(error);
      }
    },
    mouseOver() {
      this.$emit("mouseOver", this.index);
    },
    mouseLeave() {
      this.$emit("mouseLeave", this.index);
    },
    showItemModal() {
      try {
        this.showVideo &&
          this.player &&
          this.player.destroy &&
          this.player.destroy(true);
      } catch (error) {
        console.error(error);
      }

      this.showVideo = false;
      this.$emit("showItemModal", this.index);
    },
    ended() {
      try {
        this.$emit("callback", this.index);
        if (this.current + 1 < this.length) {
          this.current++;
        } else {
          this.current = 0;
        }
      } catch (error) {
        console.error(error);
      }
    },
    togglePlay() {
      if (this.pause) {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    setVolume() {
      this.$emit("setVolume");
      this.player.volume = this.volume ? 0 : 1;
    },

    timeupdate() {
      if (this.player.currentTime > 0) {
        if (
          this.player.currentTime + 1 > this.player.duration &&
          !this.loading
        ) {
          this.loading = true;
          console.log(this.index, this.currentVideo);
          this.index === this.currentVideo && this.$emit("update");
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }

        this.showVideo = true;
        this.showLoading = false;
      }
    },
    waitingFun() {},
    pauseFun() {
      this.pause = true;
      this.play = false;
    },
    playFun() {
      this.pause = false;
      this.play = true;
    }
  }
};
