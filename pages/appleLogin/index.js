/*
 * @Author: your name
 * @Date: 2020-12-09 09:55:41
 * @LastEditTime: 2021-08-01 14:06:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/admin_home/index.js
 */
import qs from "qs";
export default {
  data() {
    return {};
  },
  mounted() {
    this.gologin();
  },
  methods: {
    async gologin() {
      let obj = qs.parse(location.href.split("?")[1]);
      if (obj && obj.code) {
        let res = await this.$api.guest_front_oath_apple({
          code: obj.code,
          appid: "com.teteday.clientid",
          auth_type: "web"
        });
        if (res && res.code === 0) {
          this.$message.error("login success");
        }
      } else {
        this.$message.error("login fail");

      }
    }
  }
};
