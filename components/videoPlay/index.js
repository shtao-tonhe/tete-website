/*
 * @Author: your name
 * @Date: 2020-10-18 22:01:31
 * @LastEditTime: 2020-12-11 06:44:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/components/videoPlay/index.js
 */
// pluginName.js
let copyLoading = "";
import "intersection-observer";
/**
 * inview 某一dom元素进入视窗后，触发一次事件
 *
 * @param {Element} el DOM元素
 * @param  {Function} callback 回调
 */
function inview(el, callback) {
  if (!el || !callback) {
    throw new Error("inview needs el && callback! ");
  }
  const options = {
    root: null,
    threshold: [0.5],
    rootMargin: "-70px 0px 0px"
  };
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      callback();
      // io.disconnect();
    }
  }, options);
  io.observe(el);
}
import videoOne from "@/components/videoOne/index.vue";
import { mapState } from "vuex";
export default {
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
  components: {
    videoOne
  },
  data() {
    return {
      thisUserId:
        (this.$store.state.auth &&
          this.$store.state.auth.userInfo &&
          this.$store.state.auth.userInfo.info &&
          this.$store.state.auth.userInfo.info.id + "") ||
        "",
      player: {},
      pause: true,
      play: false,
      showVideo: false,
      imgWidth: 0,
      imgHeight: 0,
      imgHeight2: 0,
      isHorizontal: false,
      lastNum: 0,
      showLoading: false,
      pointLoading: false,
      isPoint: false,
      isFollow: false,
      point_praise_num: 0,
      visible: false,
      reportContent: "",
      reportLoading: false,
      share_num: 0
    };
  },
  watch: {},
  computed: mapState({
    volumeStatus: function(state) {
      return state.volumeStatus;
    },
    playStatus: function(state) {
      return state.playStatus;
    }
  }),

  mounted() {
    try {
      if (this.item.width && this.item.height) {
        let tableWith = document.querySelector(".tt-feed").offsetWidth - 58;
        if (this.item.width < this.item.height) {
          this.isHorizontal = false;
          this.imgWidth = (600 / this.item.height) * this.item.width;
          this.imgHeight = "600";
          this.imgHeight2 = "620";
        } else if (this.item.width >= this.item.height) {
          this.imgHeight2 = (tableWith / this.item.width) * this.item.height;
          this.isHorizontal = true;
          this.imgWidth = tableWith;
          this.imgHeight = (tableWith / this.item.width) * this.item.height;
        }
      } else {
        this.imgHeight2 = "620";
        this.imgWidth = 330;
        this.imgHeight = 600;
      }
      const dom = document.querySelector(".item-video-container" + this.index);
      inview(dom, () => {
        !this.showVideoModal && this.$emit("changeIndex", this.index);
      });
      this.showVideo = true;
      this.isPoint = this.item.points;
      this.isFollow = this.item.follows;
      this.share_num = this.item.share_num;
      this.point_praise_num = this.item.point_praise_num;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    setloading(val) {
      this.showLoading = val;
    },
    async hideModal() {
      this.reportLoading = true;
      let res = await this.$api
        .front_video_addReport({
          video_id: this.item.id,
          content: this.reportContent
        })
        .catch(() => {
          this.reportLoading = false;
        });
      this.reportLoading = false;
      if (res.code === 0) {
        this.$message.success(this.$t("components.tips.reportTips"));
        this.visible = false;
      } else {
        this.$message.error(res.msg || this.$t("common.systemError"));
      }
    },
    report() {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this);
        return;
      }
      this.visible = true;
    },
    async front_user_follow() {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this);
        return;
      }
      this.$message.loading(this.$t("common.loadingData"));
      if (this.item.follows) {
        let res = await this.$api
          .front_user_cancelFollow({
            user_id: this.item.user_id
          })
          .catch(err => {
            this.$message.destroy();
          });
        this.$message.destroy();

        if (res.code === 0) {
          this.$emit("updateData", {
            user_id: this.item.user_id,
            type: "follow",
            status: false
          });
        } else {
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      } else {
        let res = await this.$api
          .front_user_follow({
            user_id: this.item.user_id
          })
          .catch(err => {
            this.$message.destroy();
          });
        this.$message.destroy();

        if (res.code === 0) {
          this.$emit("updateData", {
            user_id: this.item.user_id,
            type: "follow",
            status: true
          });
        } else {
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      }
    },
    async shareFunc(type) {
      copyLoading = this.item.id;
      await this.$api
        .front_video_share({
          id: this.item.id,
          platform: type
        })
        .catch(() => {
          setTimeout(() => {
            copyLoading = "";
          }, 3000);
        });
      setTimeout(() => {
        copyLoading = "";
      }, 3000);
      this.$emit("updateData", {
        index: this.index,
        type: "share",
        status: true
      });
      this.share_num++;
      switch (type) {
        // case "linkedin":
        //   try {
        //     $.ajax({
        //       url: "/linkedinUrl/v1/people/~/shares?format=json",
        //       type: "POST",
        //       dataType: "json",
        //       data: {
        //         content: {
        //           title: this.item.title,
        //           description: this.item.describe,
        //           "submitted-url":
        //             this.global.domain + "/foryou?id=" + this.item.id,
        //           "submitted-image-url":
        //             this.item.cover && this.global.imgCover + this.item.cover
        //         },
        //         comment:
        //           "TETE " + this.global.domain + "/foryou?id=" + this.item.id,
        //         visibility: {
        //           code: "anyone"
        //         }
        //       }
        //     });
        //   } catch (e) {
        //     console.error(e);
        //   }
        //   break;
        case "copyUrl":
          try {
            await this.$copyText(location.href);
            this.$message.success(this.$t("components.tips.copySuccess"));
            if (copyLoading && this.item.id === copyLoading) {
              return;
            }
          } catch (e) {
            console.error(e);
          }
          break;

        default:
          break;
      }
    },
    async point() {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this);
        return;
      }
      if (this.pointLoading) {
        return;
      }
      this.pointLoading = true;
      this.$message.loading(this.$t("common.loadingData"));
      if (this.isPoint) {
        let res = await this.$api
          .front_video_cancelPoint({
            video_id: this.item.id
          })
          .catch(err => {
            this.pointLoading = false;
            this.$message.destroy();
          });
        this.pointLoading = false;
        this.$message.destroy();

        if (res.code === 0) {
          this.$emit("updateData", {
            index: this.index,
            type: "point",
            status: false
          });
          this.isPoint = false;
          this.point_praise_num--;
        } else {
          this.isPoint = true;
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      } else {
        let res = await this.$api
          .front_video_point({
            video_id: this.item.id
          })
          .catch(err => {
            this.pointLoading = false;
            this.$message.destroy();
          });
        this.$message.destroy();
        this.pointLoading = false;
        if (res.code === 0) {
          this.$emit("updateData", {
            index: this.index,
            type: "point",
            status: true
          });
          this.isPoint = true;
          this.point_praise_num++;
        } else {
          this.isPoint = false;
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      }
    },
    reloadVideo() {
      this.showVideo = false;
    },
    closeModal() {
      this.$emit("showItemModal", false);
    },
    showItemModal() {
      document.getElementsByTagName("body")[0].className = "overhide";
      this.$nextTick(() => {
        this.$emit("showItemModal", this.index);
      });
    },
    setVolume(type) {
      this.$store.commit("setVolumeStatus");
    },
    togglePlay(type) {
      if (!this.showLoading) {
        if (type === "hidden" || type === "visible") {
          if (type === "hidden") {
            this.$store.commit("setPlayStatus", false);
          } else {
            this.$store.commit("setPlayStatus", true);
          }
          return;
        }
        if (this.playStatus) {
          this.$store.commit("setPlayStatus", false);
        } else {
          this.$store.commit("setPlayStatus", true);
        }
      }
    }
  }
};
