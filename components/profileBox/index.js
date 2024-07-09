/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2020-11-29 17:46:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/pages/foryou/index.js
 */
import profileVideo from "~/components/profileVideo/index.vue";
import modalVideo from "~/components/modalVideo/index.vue";
import videoLoading from "~/components/videoLoading/index.vue";

let meigeSP = []; //每个视频的距离顶部的高度
let distance = 0; //标记页面是向下还是向上滚动
let indexKey = 0; //标记当前滚动到那个视频了
let loading = false;
import * as Cookies from "js-cookie";
let that = "";
export default {
  components: {
    profileVideo,
    modalVideo,
    videoLoading
  },
  props: {
    videoType: {
      default: "1",
      type: String
    }
  },
  data() {
    return {
      videoList: [], //视频数据
      index2: 0, //当前正在播放视频的数组下标
      currentIndex: 0,
      volume: 0,
      prePage: 10,
      page: 1,
      showVideoModal: false,
      userInfo: {},
      videoPointList: [],
      loadEnd: false,
      showLoading: false,
      showData: false,
      noData: false
    };
  },
  layout: "foryou",
  watch: {
    videoType() {
      this.init();
    },
    "$route.query": () => {
      that.init();
    }
  },
  mounted() {
    that = this;
    this.init();
    window.addEventListener("scroll", this.onPageScroll, false);
  },
  methods: {
    init() {
      this.page = 1;
      this.videoList = [];
      this.showData = false;
      this.noData = false;
      this.loadEnd = false;
      this.showLoading = false;
      this.front_video_getlist();
      loading = false;
    },
    onPageScroll() {
      let scrollTop2 =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        scrollHeight > clientHeight &&
        scrollTop2 + clientHeight === scrollHeight &&
        !this.showLoading &&
        !this.loadEnd &&
        this.videoList &&
        this.videoList.length > 0 &&
        !loading
      ) {
        loading = true;
        this.showLoading = true;
        setTimeout(() => {
          console.log("到底部");
          this.page = this.page + 1;
          this.front_video_getlist();
        }, 500);
      }
    },
    getA() {
      return (
        this.videoType === "1" &&
        ((!this.$route.query.userId && Cookies.get("userId")) ||
          (this.$route.query.userId &&
            this.$route.query.userId == Cookies.get("userId")))
      );
    },
    async front_video_getlist() {
      let res = {};
      if (this.videoType === "1") {
        res = await this.$api
          .front_video_getlist({
            user_id: this.$route.query.userId || Cookies.get("userId"),
            perPage: this.prePage,
            page: this.page,
            searchParam: []
          })
          .catch(() => {
            this.noData = false;
            loading = false;
            this.showLoading = false;
            this.showData = true;
          });
      }
      if (this.videoType === "2") {
        res = await this.$api
          .front_video_pointList({
            user_id: this.$route.query.userId || Cookies.get("userId"),
            perPage: this.prePage,
            page: this.page,
            searchParam: []
          })
          .catch(() => {
            this.noData = false;
            loading = false;
            this.showLoading = false;
            this.showData = true;
          });
      }
      loading = false;
      this.showLoading = false;
      this.showData = true;
      if (res.data && res.data.data && res.data.data.length > 0) {
        let thisArr =
          this.videoType === "2"
            ? res.data.data.map(item => {
                return item.video;
              })
            : res.data.data;
        this.videoList = [...this.videoList, ...thisArr];
      }
      if (
        this.videoList.length > 0 &&
        res.data &&
        res.data.data &&
        res.data.data.length === 0
      ) {
        this.loadEnd = true;
      }
      if (this.videoList.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    },

    closeModal(type) {
      this.showVideoModal = false;
      if (type === "delete") {
        this.videoList.splice(this.index2, 1);
        this.videoList = [...this.videoList];
        return;
      }
      this.$nextTick(() => {
        let str = `videoItem${this.index2}`;
        this.$refs[str][0].reloadVideo();
      });
    },
    mouseOver(index) {
      console.log(index);
      if (loading) {
        return;
      }
      this.index2 = index;
    },
    mouseLeave(index) {
      console.log(index);
    },
    showItemModal(index) {
      this.showVideoModal = true;
      this.index2 = index;
    },
    resizeFun() {
      window.scrollTo(0, 0);
    },
    setVolume() {
      if (this.volume === 1) {
        this.volume = 0;
      } else {
        this.volume = 1;
      }
    },
    preVideo() {
      this.showVideoModal = false;
      this.$nextTick(() => {
        this.index2 = this.index2 - 1;
        this.showVideoModal = true;
        window.scrollTo(0, meigeSP[this.index2] - 70);
      });
    },
    nextVideo() {
      this.showVideoModal = false;
      this.$nextTick(() => {
        this.index2 = this.index2 + 1;
        this.showVideoModal = true;
        window.scrollTo(0, meigeSP[this.index2] - 70);
      });
    },
    getViewport() {
      if (document.compatMode == "BackCompat") {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      } else {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        };
      }
    },
    getElementViewTop(element) {
      var actualTop = element.offsetTop;
      var current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      if (document.compatMode == "BackCompat") {
        var elementScrollTop = document.body.scrollTop;
      } else {
        var elementScrollTop = document.documentElement.scrollTop;
      }

      return actualTop - elementScrollTop;
    },
    getDMOlocation(index) {
      // 获取元素的相关数据
      let DOMobj = document.querySelector(".tt-feed" + index);

      return this.getElementViewTop(DOMobj);
    },
    winScroll(e) {
      // 距离顶部位置
      let arr = this.getElementViewTop(this.DOMobj) - 70 - 300;
      let arr2 = this.getElementViewTop(this.DOMobj) - 70 - 80;
      if (arr <= this.cliHeight && -arr2 <= this.DOMobj.offsetHeight / 2) {
        this.showVideo = true;
        // this.initVideo();
      } else {
        this.showVideo = false;
        this.getDMOlocation();
      }
    },
    callback(key) {
      console.log(key);
    }
  }
};
