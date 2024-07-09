/*
 * @Author: your name
 * @Date: 2020-12-09 09:53:52
 * @LastEditTime: 2021-03-02 17:48:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/layouts/admin.js
 */
import vHeader from "~/components/vHeader/index.vue";

export default {
  components: {
    vHeader
  },
  data() {
    return {
      thisUserId:
        (this.$store.state.auth &&
          this.$store.state.auth.userInfo &&
          this.$store.state.auth.userInfo.info &&
          this.$store.state.auth.userInfo.info.id + "") ||
        "",
      isBusiness:
        (this.$store.state.auth &&
          this.$store.state.auth.userInfo &&
          this.$store.state.auth.userInfo.info &&
          this.$store.state.auth.userInfo.info.is_auth &&
          this.$store.state.auth.userInfo.info.is_auth + "") ||
        "",
      collapsed: false,
      isme: false
    };
  },
  mounted() {
    this.isme = this.ismeFunc();
    // if (!this.thisUserId) {
    //   this.$router.replace("/foryou");
    // }
  },
  methods: {
    ismeFunc() {
      return (
        (this.$route.query.userId &&
          this.thisUserId == this.$route.query.userId) ||
        !this.$route.query.userId
      );
    },
    getRouter(router) {
      if (this.$route.query.userId) {
        return (
          router +
          "?userId=" +
          this.$route.query.userId +
          "&isMe=" +
          this.ismeFunc()
        );
      } else {
        return router;
      }
    }
  }
};
