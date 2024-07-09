<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2020-12-10 13:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/layouts/default.vue
-->
<template>
  <div class="home-body">
    <nuxt />
    <backTop></backTop>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Vue from "vue";
import vFooter from "~/components/vFooter/index.vue";
import backTop from "~/components/backTop/index.vue";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$utils.mapinit(this);
  },
  components: {
    vFooter,
    backTop,
  },
  methods: {},
};
</script>
<style  scoped>
.home-body {
  min-height: 100vh;
  background-color: #25377d;
}
</style>
