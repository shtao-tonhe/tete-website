/*
 * @Author: your name
 * @Date: 2020-11-13 18:03:53
 * @LastEditTime: 2021-01-30 16:53:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-admin/src/components/videoPlay/index.js
 */
// 在这里根据环境引入wow.js
var Player
if (process.browser) {
  // 在这里根据环境引入wow.js
  Player = require("xgplayer");
}
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.player = new Player({
        id: "videoItem1",
        // el: document.querySelector(".mse" + this.index),
        url:  this.item.file.m3u8url,
        videoInit: true,
        preload: true,
        autoplay: true,
        lang: "en",
        loop: true,
        volume: 1,
        keyShortcut: "on",
        height: "100%",
        width: "100%"
      });
    }
  }
};
