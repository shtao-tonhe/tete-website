/*
 * @Author: your name
 * @Date: 2020-10-18 22:01:31
 * @LastEditTime: 2021-01-30 16:52:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/components/videoPlay/index.js
 */
var loading = false;
var HlsPlayer = "";
let copyLoading = false;
import videoLoading from "@/components/videoLoading/index.vue";
import * as Cookies from "js-cookie";
var Player
if (process.browser) {
  // 在这里根据环境引入wow.js
  Player = require("xgplayer");
}
import { mapState } from "vuex";

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
    typeRouter: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      player: {},
      pause: true,
      perPage: 10,
      visible: false,
      showError: false,
      reportLoading: false,
      play: false,
      showVideo: false,
      showLoading: false,
      isHorizontal: false,
      editModal: false,
      isPoint: false,
      pointLoading: false,
      point_praise_num: 0,
      confirmLoading: false,
      show: false,
      commentcontent: "",
      time: 0,
      submitting: false,
      listloading: false,
      nodata: false,
      commentData: [],
      share_num: 0,
      loadEnd: false,
      formLayout: "vertical",
      reportContent: "",
      page: 1,
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  mounted() {
    this.$nextTick(() => {
      try {
        let tableWith = document.querySelector(".video-card-container")
          .offsetWidth;
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

        this.initVideo();
        this.isPoint = this.item.points;
        this.point_praise_num = this.item.point_praise_num;
        this.item.commentNum > 0
          ? this.getfront_comment_getlist()
          : (this.nodata = true);
      } catch (error) {
        console.error(error);
      }
    });
  },
  watch: {
    playStatus(curval, oldval) {
      if (!curval) {
        this.player.pause();
      } else {
        this.player.play();
      }
    },

    volumeStatus(curval, oldval) {
      if (curval === 1) {
        this.player.volume = 1;
      } else {
        this.player.volume = 0;
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
  methods: {
    togglePlay(type) {
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
    },
    //页面滚动触发
    onPageScroll(event) {
      if (loading) {
        return;
      }
      if (
        !this.listloading &&
        !this.loadEnd &&
        this.commentData &&
        this.commentData.length > 0 &&
        !loading
      ) {
        loading = true;
        this.listloading = true;
        this.page = this.page + 1;
        this.getfront_comment_getlist();
      }
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
    handleChange(e) {
      this.commentcontent = e.target.value;
    },
    async handleSubmit() {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this);
        return;
      }
      if (!this.commentcontent) {
        this.$message.error(this.$t("page.plInputComment"));
        return;
      }

      this.submitting = true;
      let res = await this.$api
        .front_comment_add({
          video_id: this.item.id,
          content: this.commentcontent,
          parent_id: 0
        })
        .catch(err => {
          this.submitting = false;
        });
      this.submitting = false;

      if (res.code === 0) {
        this.commentcontent = "";
        this.getfront_comment_getlist(true);
        this.$emit("updateData", {
          index: this.currentIndex,
          type: "comment",
          status: true
        });
        this.$message.success(this.$t("components.tips.commentTips"));
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
            index: this.currentIndex,
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
            index: this.currentIndex,
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
    handleSelectChange(value) {
      this.form.setFieldsValue({
        state: value
      });
    },
    handleOk() {
      this.form.validateFieldsAndScroll(async (err, values) => {
        this.confirmLoading = true;
        let res = await this.$api
          .front_video_edit({
            id: this.item.id,
            title: this.item.title,
            cover: this.item.cover,
            describe: this.item.describe,
            video_id: this.item.video_id,
            reward_integral: Number(this.item.reward_integral),
            state: values.state
          })
          .catch(() => {
            this.confirmLoading = false;
          });
        this.confirmLoading = false;
        if (res.code === 0) {
          this.editModal = false;
          this.$emit("updateData", {
            index: this.currentIndex,
            type: "edit",
            status: 2
          });
          this.$message.success(this.$t("components.tips.videoeditTips"));
        } else {
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      });
    },
    settings() {
      this.editModal = true;
      setTimeout(() => {
        console.log(this.item);
        this.form.setFieldsValue({
          state: this.item.state + ""
        });
      }, 100);
    },
    showConfirm() {
      if (this.show) {
        return;
      }
      setTimeout(() => {
        this.show = false;
      }, 3000);
      this.show = true;
      this.$confirm({
        title: this.$t("components.videoModal.delTipsTitle"),
        content: this.$t("components.videoModal.delTipsContent"),
        onOk: async () => {
          this.show = false;
          let res = await this.$api.front_video_delete({
            id: this.item.id
          });
          this.closeModal("delete");
          if (res.code === 0) {
            this.closeModal("delete");
          } else {
            this.$message.error(res.msg || this.$t("common.systemError"));
          }
        },
        onCancel: () => {
          this.show = false;
        }
      });
    },
    setVolume(type) {
      this.$store.commit("setVolumeStatus");
    },
    async getfront_comment_getlist(type) {
      if (type) {
        this.page = 1;
        this.commentData = [];
      }
      this.nodata = false;
      this.listloading = true;
      let res = await this.$api
        .front_comment_getlist({
          video_id: this.item.id,
          page: this.page,
          prePage: this.perPage
        })
        .catch(() => {
          this.noData = false;
          loading = false;
          this.listloading = false;
          this.showData = true;
        });
      setTimeout(() => {
        loading = false;
      }, 400);
      this.listloading = false;
      this.showData = true;
      if (res.data && res.data.data && res.data.data.length > 0) {
        this.page = res.data.current_page;
        let thisArr = res.data.data || [];
        this.commentData = this.commentData.concat(thisArr);
      }
      if (res.data && res.data.data && res.data.data.length < this.perPage) {
        this.loadEnd = true;
      }
      if (this.commentData.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    },
    nextVideo() {
      this.player && this.player.destroy && this.player.destroy(true);
      this.$emit("nextVideo");
    },
    preVideo() {
      this.player && this.player.destroy && this.player.destroy(true);
      this.$emit("preVideo");
    },
    closeModal(type) {
      this.$emit("closeModal", type);
    },
    initVideo() {
      try {
        this.player = new Player({
          // id: 'mse',
          id: "msemodal",
          url:  this.item.file.m3u8url,
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
        this.player.on("waiting", this.waitingFun);
        this.player.on("error", this.error);
        this.player.on("seeking", this.seeking);

        this.player.once("ready", () => {
          this.showLoading = true;
          this.player && (this.player.volume = this.volumeStatus);
        });
      } catch (error) {
        this.showError = true;
        console.error(error);
      }
    },
    seeking() {
      setTimeout(() => {
        this.$store.commit("setPlayStatus", true);
      }, 300);
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
    error() {
      this.showLoading = false;
      this.showError = true;
      console.log("错误", err);
      this.reload();
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
      this.$store.commit("setPlayStatus", true);
    },

    // togglePlay() {
    //   if (this.pause) {
    //     this.player.play();
    //   } else {
    //     this.player.pause();
    //   }
    // },

    timeupdate() {
      if (this.player.currentTime > 0) {
        if (
          this.player.currentTime + 1 > this.player.duration &&
          !this.loading &&
          Cookies.get("addressInfo")
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
        this.showError = false;
        this.showVideo = true;
        this.showLoading = false;
      }
      // console.log('111')
    }
  }
};
