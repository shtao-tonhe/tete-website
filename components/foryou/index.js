/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2020-12-11 07:13:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/pages/foryou/index.js
 */
import videoPlay from "~/components/videoPlay/index.vue";
import modalVideo from "~/components/modalVideo/index.vue";
import videoLoading from "~/components/videoLoading/index.vue";
import { mapState } from "vuex";
let loading = false;
export default {
  components: {
    videoPlay,
    videoLoading,
    modalVideo
  },
  props: {
    type: {
      default: "foryou",
      type: String
    }
  },
  data() {
    return {
      mode: "title",
      arrList: [], //视频数据
      index2: 0, //当前正在播放视频的数组下标
      currentIndex: 0,
      volume: 0,
      showVideoModal: false,
      showData: false,
      noData: false,
      page: 1,
      perPage: 10,
      showLoading: false,
      loadEnd: false,
      id: "",
      title: "",
      nickname: ""
    };
  },
  layout: "foryou",
  watch: {
    foryouTitleObj(curval, oldval) {
      if (JSON.stringify(curval) !== JSON.stringify(oldval)) {
        this.init();
        this.title = curval.title;
        this.nickname = curval.nickname;
        this.getList();
      }
    }
  },
  computed: mapState({
    foryouTitleObj: function(state) {
      return state.foryouTitleObj;
    }
  }),
  mounted() {
    this.init();
    this.getList();

    window.addEventListener("scroll", this.onPageScroll);
    // window.addEventListener("visibilitychange", this.visibilitychange, false);
  },
  methods: {
    init() {
      this.showData = false;
      this.arrList = [];
      this.page = 1;
      this.loadEnd = false;
      this.noData = false;
      this.showLoading = false;
      this.title = "";
      this.nickname = "";
      this.id = this.$route.query.id || "";
    },
    visibilitychange(index) {
      try {
        if (document.visibilityState === "visible") {
          let str = `videoItem${this.index2}`;
          this.$refs[str][0].togglePlay("visible");
        } else {
          let str = `videoItem${this.index2}`;
          this.$refs[str][0].togglePlay("hidden");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getList() {
      let obj = {
        perPage: this.perPage,
        page: this.page
      };
      if (this.title || this.$route.query.title) {
        obj.title = this.title || this.$route.query.title;
      }
      if (this.nickname || this.$route.query.nickname) {
        obj.nickname = this.nickname || this.$route.query.nickname;
      }
      if (this.id) {
        obj.id = this.id || "";
      }

      let url =
        this.type === "follow"
          ? "front_main_followVideo"
          : "front_main_recommendVideo";
      let res = await this.$api[url](obj).catch(() => {
        this.noData = false;
        loading = false;
        this.showLoading = false;
        this.showData = true;
      });
      setTimeout(() => {
        loading = false;
      }, 400);
      this.showLoading = false;
      this.showData = true;
      if (res.data && res.data.data && res.data.data.length > 0) {
        this.page = res.data.current_page;
        let thisArr = res.data.data;
        this.arrList = [...this.arrList, ...thisArr];
      }
      if (res.data.current_page >= res.data.last_page) {
        this.loadEnd = true;
      }
      if (this.arrList.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    },
    closeModal() {
      this.showVideoModal = false;
      document.getElementsByTagName("body")[0].className = "";
      $("html,body").animate(
        { scrollTop: $(".tt-feed" + this.index2).offset().top },
        0
      );
    },
    seemore() {
      that.ctx.$store.commit("setForyouTitleObj", {});
      this.title = "";
      this.nickname = "";
      this.id = "";
    },
    updateData(obj) {
      switch (obj.type) {
        case "share":
          this.arrList.forEach((element, index2) => {
            if (index2 === obj.index) {
              element.share_num++;
            }
          });

          break;
        case "edit":
          this.arrList.forEach((element, index2) => {
            if (index2 === obj.index) {
              element.state = obj.status;
            }
          });

          this.$nextTick(() => {
            this.arrList = [...this.arrList];
          });
          break;
        case "point":
          this.arrList.forEach((element, index2) => {
            if (index2 === obj.index) {
              element.points = obj.status;
              obj.status
                ? element.point_praise_num++
                : element.point_praise_num--;
            }
          });
          this.$nextTick(() => {
            this.arrList = [...this.arrList];
          });
          break;
        case "comment":
          this.arrList.forEach((element, index2) => {
            if (index2 === obj.index) {
              obj.status ? element.commentNum++ : element.point_praise_num--;
            }
          });
          break;
        case "follow":
          this.arrList.forEach((element, index2) => {
            console.log(element);
            if (element.user_id + "" == obj.user_id + "") {
              element.follows = obj.status;
            }
          });
          this.$nextTick(() => {
            this.arrList = [...this.arrList];
          });
          break;

        default:
          break;
      }
    },
    showItemModal(index) {
      this.showVideoModal = true;
      this.index2 = index;
    },
    preVideo() {
      this.showVideoModal = false;
      this.$nextTick(() => {
        this.index2 = this.index2 - 1;
        this.showVideoModal = true;
      });
    },
    nextVideo() {
      this.showVideoModal = false;
      this.$nextTick(() => {
        this.index2 = this.index2 + 1;
        this.showVideoModal = true;
      });
    },

    changeIndex(index) {
      this.index2 = index;
    },
    //页面滚动触发
    onPageScroll(event) {
      let scrollTop2 =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (loading) {
        return;
      }
      if (
        scrollHeight > clientHeight &&
        scrollTop2 + clientHeight === scrollHeight &&
        !this.showLoading &&
        !this.loadEnd &&
        this.arrList &&
        this.arrList.length > 0 &&
        !loading
      ) {
        loading = true;
        this.showLoading = true;
        console.log("到底部");
        this.page = this.page + 1;
        this.getList();
      }
    }
  }
};
