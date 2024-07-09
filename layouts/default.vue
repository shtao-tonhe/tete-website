<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2020-11-24 15:06:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/layouts/default.vue
-->
<template>
  <div>
    <v-header></v-header>
    <nuxt />
    <backTop></backTop>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Vue from "vue";
import vFooter from "~/components/vFooter/index.vue";
import vHeader from "~/components/vHeader/index.vue";
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
    vHeader,
    backTop,
  },
  methods: {},
};
</script>
