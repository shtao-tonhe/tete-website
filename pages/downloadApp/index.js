/*
 * @Author: your name
 * @Date: 2020-12-23 22:55:25
 * @LastEditTime: 2020-12-30 17:08:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/myQrcode/index.js
 */

export default {
  components: {},
  computed: {},
  layout: "empty",
  data() {
    return {};
  },
  head() {
    return {
      script: [
        {
          src: "/flexible.js",
          type: "text/javascript",
          charset: "utf-8"
        }
      ]
    };
  },
  mounted() {
    document.body.style.fontSize = "36px";
  },
  methods: {
    // 获取机型
    getDeviceType() {
      const u = navigator.userAgent;
      const osType =
        u.indexOf("Android") > -1 || u.indexOf("Adr") > -1
          ? "ANDROID"
          : u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          ? "IOS"
          : "PC";
      return osType;
    },
    download() {
      if (this.getDeviceType() === "IOS") {
        this.$message.info("uploading...");
        return;

        location.href = "https://itunes.apple.com/cn/app/id1439290777?mt=8";
      } else {
        location.href =
          "https://play.google.com/store/apps/details?id=com.tete.ugc";
      }
    }
  }
};
