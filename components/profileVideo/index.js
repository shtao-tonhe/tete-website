/*
 * @Author: your name
 * @Date: 2020-10-18 22:01:31
 * @LastEditTime: 2021-01-30 16:53:18
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
    item: {
      default: () => {},
      type: Object
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
    }
  },
  data() {
    return {
      player: {},
      pause: true,
      play: false,
      showVideo: false,
      showLoading: false,
      isHorizontal: false,
      time: 0
    };
  },
  watch: {
    currentIndex(newVal, val) {
      this.time = 0;
      if (this.currentIndex === this.index && !this.showVideoModal) {
        this.showVideo = false;
        this.showLoading = false;
        this.initVideo();
      } else {
        setTimeout(() => {
          this.showVideo = false;
          this.showLoading = false;
          this.player && this.player.destroy && this.player.destroy(true);
        }, 10);
      }
    }
  },
  mounted() {
    try {
      if (this.item.width < this.item.height) {
        this.isHorizontal = false;
      } else if (this.item.width >= this.item.height) {
        this.isHorizontal = true;
      }
    } catch (error) {
      console.error(error);
    }
    if (this.currentIndex === this.index) {
      this.initVideo();
    }
  },
  methods: {
    reloadVideo() {
      this.showVideo = true;
      this.initVideo();
    },
    initVideo() {
      try {
        this.player = new Player({
          // id: 'mse',
          el: document.querySelector(".mse" + this.index),
          url:  this.item.file.m3u8url,
          videoInit: true,
          autoplay: true,
          lang: "en",
          loop: true,
          poster:  this.item.cover,
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
        this.player.on("error", this.error);
        this.player.on("pause", this.pauseFun);
        this.player.on("timeupdate", this.timeupdate);
        this.player.on("waitting", this.waitingFun);
        this.player.once("ready", () => {
          this.showLoading = true;
        });
      } catch (error) {
        console.error(error);
      }
    },
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
    error(err) {
      this.showLoading = false;
      this.showError = true;
      console.log("错误", err);
      this.reload();
    },
    mouseOver() {
      this.$emit("mouseOver", this.index);
    },
    mouseLeave() {
      this.showLoading = false;
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
    setVolume() {
      this.$emit("setVolume");
      this.player.volume = this.volume ? 0 : 1;
    },
    timeupdate() {
      if (this.player.currentTime > 0) {
        this.showVideo = true;
        this.showLoading = false;
      }
    },
    waitingFun() {
      console.log("等待");
      this.showLoading = true;
    },
    pauseFun() {
      console.log("暂停");
      this.pause = true;
      this.play = false;
    },
    playFun() {
      console.log("播放");
      this.pause = false;
      this.play = true;
    }
  }
};
