/*
 * @Author: your name
 * @Date: 2020-11-10 21:14:02
 * @LastEditTime: 2020-12-11 06:50:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/layouts/foryou.js
 */
import Vue from "vue";
import vHeader from "~/components/vHeader/index.vue";
import backTop from "~/components/backTop/index.vue";

export default {
  data() {
    return {
      recommendUserList: [],
      showTopData: false,
      showRecommendUser: false,
      showFollowList: false,
      FollowListList: [],
      moreFollow: false,
      moreRecommendUser: false,
      moreRecommendUserData: false
    };
  },
  mounted() {
    this.$store.commit("setVolumeStatus", 'hidden');
    this.$utils.mapinit(this);
    this.getRecommendUser();
    if (this.$store.state.auth.token) {
      this.getFollowList();
    }
    console.log(this.$route.path);
  },
  components: {
    vHeader,
    backTop
  },

  methods: {
    gologin() {
      this.$loginModal(this);
    },
    showmore() {
      this.moreFollow = true;
    },
    showmoreRecommendUser() {
      this.moreRecommendUser = true;
    },

    async getFollowList() {
      let followList = await this.$api
        .front_user_getFollowList({
          followsType: "2",
          perPage: 10,
          page: 1
        })
        .catch(err => {
          this.showTopData = true;
        });
      this.showTopData = true;
      this.FollowListList = (followList.data && followList.data.data) || [];
    },
    async getRecommendUser() {
      let recommendUserList = await this.$api
        .front_main_recommendUser()
        .catch(err => {
          this.showRecommendUser = true;
        });
      this.showRecommendUser = true;
      this.recommendUserList =
        (recommendUserList.data && recommendUserList.data.data) || [];
    }
  }
};
