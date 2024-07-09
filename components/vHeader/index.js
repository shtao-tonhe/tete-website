/*
 * @Author: your name
 * @Date: 2020-12-01 20:55:41
 * @LastEditTime: 2020-12-01 21:09:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/vHeader/index.js
 */

import { mapState } from "vuex";
import vDrawerLeft from "../vDrawerLeft/index.vue";

export default {
  name: "vHeader",
  components: {
    vDrawerLeft,
  },
  data() {
    return {
      mode:'title',
      showSearch: false,
    };
  },
  computed: {
    ...mapState("auth", ["userInfo"]),
  },
  mounted() {},
  methods: {
    search() {
      this.$searchBox(this);
    },
    go(router) {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this);
        return;
      }
      this.$router.push(router);
    },
    selectChange(value) {
      this.mode = value;
    },
    onSearch() {
      this.arrList = [];
      this.page = 1;
      this.id = "";
      this.showLoading = false;
      this.loadEnd = false;
      this.showData = false;
      this.noData = false;
      this.getList();
    },

    logout() {
      this.$utils.removeAuthInfo(this);
    },
    showDrawer() {
      this.$refs.vDrawerLeft.showDrawer();
    },
    setModal1Visible() {
      this.$loginModal(this);
    },
  },
};
