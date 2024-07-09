
import videoItem from "~/components/videoItem/index.vue";
export default {
  components: {
    videoItem
  },
  data() {
    return {
      screenWidth: 0,
      show2: true,
      OtherExtZH2: "",
      videoList: [],
      isType: "2",
    };
  },
  async asyncData({ app, store, route }) {
    // 获奖案例
    let OtherExtZH2 = await app.$api.guest_OtherExt_getList({
      name: "aboutUs"
    });
    if (
      OtherExtZH2 &&
      OtherExtZH2.data &&
      OtherExtZH2.data[0] &&
      OtherExtZH2.data[0].val
    ) {
      let val2 = JSON.parse(OtherExtZH2.data[0].val);
      OtherExtZH2 = val2;
    }
    return {
      OtherExtZH2
    };
  },
  mounted() {
    this.getList();
    window.addEventListener("resize", this.init);
  },
  methods: {
    init() {
      if (process.browser) {
        this.screenWidth = document.documentElement.clientWidth;
        console.log(this.screenWidth,'999')
        if (this.screenWidth <= 1200) {
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
      if (time && Number(time) + 60 <= +new Date() && data) {
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
    // init() {
    //   if (process.browser) {
    //     this.screenWidth = document.documentElement.clientWidth;
    //     if (this.screenWidth < 1200) {
    //       this.show2 = false;
    //       console.log("小于");
    //     } else {
    //       this.show2 = true;
    //       console.log("大于");
    //     }
    //     window.onresize = () => {
    //       // 定义窗口大小变更通知事件
    //       this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    //       if (this.screenWidth < 1200) {
    //         this.show2 = false;
    //         console.log("小于");
    //       } else {
    //         this.show2 = true;
    //         console.log("大于");
    //       }
    //     };
    //   }
    // }
  }
};
