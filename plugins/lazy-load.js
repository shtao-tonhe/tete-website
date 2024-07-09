/*
 * @Author: your name
 * @Date: 2020-06-22 07:45:22
 * @LastEditTime: 2020-11-03 10:41:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /thg-pc/plugins/lazy-load.js
 */
import Vue from "vue";
import VueLazyLoad from "vue-lazyload";

Vue.use(VueLazyLoad, {
  preLoad: 2,
  loading: require("~/assets/images/default.jpg"),
  error: require("~/assets/images/default.jpg"),
  attempt: 3
});
