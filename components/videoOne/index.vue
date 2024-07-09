<!--
 * @Author: your name
 * @Date: 2020-11-03 15:11:34
 * @LastEditTime: 2020-12-02 15:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/videoOne/index.vue
-->
<template>
  <div class="inherit">
    <div
      class="m3u8Video"
      v-show="showVideo"
      :class="['mse' + currentIndex, isHorizontal ? 'horizontal' : '']"
    ></div>
    <div
      class="reload-box"
      @click.stop="reload(true)"
      v-if="showError && time === 5"
    >
      <a-icon
        type="sync"
        :style="{
          fontSize: '30px',
          color: '#fff',
        }"
      />
    </div>
    <videoLoading v-if="showLoading"></videoLoading>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import "./index.less";
</style>
