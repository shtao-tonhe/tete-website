/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2020-11-11 16:11:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/privacy-policy/index.js
 */
import videoItem from "~/components/videoItem/index.vue";
export default {
  components: {
    videoItem
  },
  data() {
    return {
      OtherExtZH2: ""
    };
  },
  async asyncData({ app, store, route }) {
    // 获奖案例
    let OtherExtZH2 = await app.$api.guest_OtherExt_getList({
      name: "CommunityGuidelines"
    });

    if (
      OtherExtZH2 &&
      OtherExtZH2.data &&
      OtherExtZH2.data[0] &&
      OtherExtZH2.data[0].val
    ) {
      let val2 = OtherExtZH2.data[0].val;
      OtherExtZH2 = val2;
    }
    return {
      OtherExtZH2
    };
  },
  mounted() {},
  methods: {}
};
