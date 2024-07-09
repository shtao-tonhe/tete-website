<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2020-12-04 14:02:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <div>
    <div class="video-box">
      <div class="video-box-bg" v-if="istype === 5">
        <a-row>
          <a-col :span="span" v-for="(item, index) in currentList" :key="index">
            <div class="jsx-762000590 menu-item visible small-box">
              <nuxt-link
                to="/foryou"
                class="jsx-762000590 menu-item-link watch-now watch-now-home-pc"
              >
                <!-- <img
                  src="~/assets/images/watch-icon.svg"
                  alt="watch now"
                  class="jsx-762000590"
                /> -->
                <span class="jsx-762000590 text">Watch now</span>
              </nuxt-link>
            </div>
          </a-col>
        </a-row>
      </div>
      <a-row class="row">
        <a-col
          class="col current"
          :span="span"
          v-for="(item, index) in currentList"
          :key="index"
        >
          <VideoOneItem :index="index" :list="item"></VideoOneItem>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
