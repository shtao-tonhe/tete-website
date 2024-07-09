/*
 * @Author: your name
 * @Date: 2020-11-30 16:05:12
 * @LastEditTime: 2020-12-10 23:08:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/swiperHome/index.js
 */
import VideoOneItem2 from "~/components/VideoOneItem2/index.vue";
import { mapState } from "vuex";
import vDrawerLeft from "@/components/vDrawerLeft/index.vue";
let timer2 = null;
export default {
  name: "swiper-example-grab-cursor",
  title: "Grab cursor",
  components: {
    VideoOneItem2,
    vDrawerLeft
  },
  data() {
    return {
      commentData: [],
      currentList: [],
      currentVideo: 0,
      loading: false,
      page: 1
    };
  },
  computed: {
    ...mapState("auth", ["userInfo"])
  },
  mounted() {},
  methods: {
    search() {
      this.$searchBox(this);
    },
    async getfront_comment_getlist() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await this.$api
        .front_comment_getlist({
          video_id: this.currentList[this.currentVideo].id,
          page: this.page,
          prePage: 10
        })
        .catch(err => {
          this.loading = false;
        });
      this.loading = false;
      if (res.code === 0 && res.data.data && res.data.data.length > 0) {
        this.commentData = res.data.data;
      }
      if (
        res.data &&
        res.data.total &&
        res.data.total > 10 &&
        res.data.last_page !== res.data.current_page
      ) {
        timer2 = setTimeout(() => {
          this.commentData = [];
          this.page++;
          this.getfront_comment_getlist();
        }, 10000);
      } else {
        if (res.data.total > 10 && this.page === res.data.last_page) {
          timer2 = setTimeout(() => {
            this.page = 1;
            this.commentData = [];
            this.getfront_comment_getlist();
          }, 10000);
        }
      }
    },
    getStyle(index) {
      let left = Math.floor(Math.random() * 50 + 20);
      return {
        left: `${left}%`,
        animationDelay: index + "s"
      };
    },
    update() {
      if (this.currentList.length === this.currentVideo + 1) {
        this.currentVideo = 0;
      } else {
        this.currentVideo++;
      }
      this.$refs &&
        this.$refs.carousels &&
        this.$refs.carousels.goSlide(this.currentVideo);
    },
    go(router, type) {
      if (!this.$store.state.auth.token && !type) {
        this.$loginModal(this);
        return;
      }
      this.$router.push(router);
    },

    logout() {
      this.$utils.removeAuthInfo(this, true);
    },
    showDrawer() {
      this.$refs.vDrawerLeft.showDrawer();
    },
    setModal1Visible() {
      this.$loginModal(this);
    },
    test(){
      console.log('1212')
    },
    onSlideChange(val) {
      if (val < 0) {
        val = 0;
      }
      this.currentVideo = val;
      timer2 && clearTimeout(timer2);
      this.page = 1;
      this.commentData = [];
      this.getfront_comment_getlist(this.currentVideo);
    },
    init(videoList) {
      this.currentList = videoList;
      console.log(videoList);
      setTimeout(() => {
        this.$refs && this.$refs.carousels && this.$refs.carousels.goSlide(0);
      }, 100);
    }
  }
};
