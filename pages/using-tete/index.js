/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2020-11-19 13:28:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/privacy-policy/index.js
 */
import videoItem from "~/components/videoItem/index.vue";
export default {
  watchQuery: ["name"],
  components: {
    videoItem
  },
  data() {
    return {
      OtherExtZH2: ""
    };
  },
  layout: "helpCenter",
  async asyncData({ app, store, route }) {
    let OtherExtZH2 = await app.$api.guest_OtherExt_getList({
      name: route.query.name
    });
    let val2 = "";
    if (
      OtherExtZH2 &&
      OtherExtZH2.data &&
      OtherExtZH2.data[0] &&
      OtherExtZH2.data[0].val
    ) {
      val2 = OtherExtZH2.data[0].val;
    }
    return {
      OtherExtZH2: route.query.name && val2
    };
  },
  mounted() {},
  methods: {}
};
