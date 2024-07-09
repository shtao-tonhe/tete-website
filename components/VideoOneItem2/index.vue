<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2021-01-30 16:36:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <div
    class="video-img m3u8Video"
    :style="{
      backgroundImage: `url(${
        list && list[current] && list[current].cover && list[current].cover
      })`,
    }"
  >
    <div class="loadingbox2" v-show="showLoading">
      <videoLoading></videoLoading>
    </div>
    <div @click="test" class="item-x"></div>
    <div :class="'mse' + index" v-show="showVideo"></div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
