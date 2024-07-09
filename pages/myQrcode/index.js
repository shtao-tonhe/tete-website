/*
 * @Author: your name
 * @Date: 2020-12-23 22:55:25
 * @LastEditTime: 2020-12-31 00:07:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/myQrcode/index.js
 */
import * as Cookies from "js-cookie";
import meQrcode from "./meQrcode";
import logo from "./logo.png";
export default {
  layout: "admin",
  components: {
    meQrcode
  },
  computed: {},
  data() {
    return {
      logo: logo,
      thisUserId:
        (this.$store.state.auth &&
          this.$store.state.auth.userInfo &&
          this.$store.state.auth.userInfo.info &&
          this.$store.state.auth.userInfo.info.id + "") ||
        "",
      userInfo: {},
      isme: this.$route.query.isMe === "true" || !this.$route.query.isMe,
      link2: "" // 二维码2
    };
  },

  mounted() {
    this.guest_user_info();

    //   this.userInfo &&
    //   this.userInfo.info &&
    //   `https://teteday.com/profile?userId=${this.userInfo.info.id}`;
    // "https://d2l551ph0httbq.cloudfront.net/img/20201222/5fe15e9fc20f8.jpg";
    // console.log(this.userInfo, "0000");
  },
  methods: {
    async guest_user_info() {
      let res = await this.$api.guest_user_info({
        user_id: this.$route.query.userId || this.thisUserId
      });
      if (res) {
        this.userInfo = res.data;
        this.link2 =
          (this.userInfo &&
            this.userInfo.info &&
            `${this.global.domain}/profile?userId=${this.userInfo.info.id}`) ||
          "";
      }
    }
  }
};
