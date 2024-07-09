/*
 * @Author: your name
 * @Date: 2020-11-22 14:19:04
 * @LastEditTime: 2020-11-24 12:41:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/plugins/global.js
 */
import Vue from "vue";
import config from "~/utils/config";

Vue.prototype.global = {
  ...config
};
