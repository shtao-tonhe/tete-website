<!--
 * @Author: your name
 * @Date: 2020-10-22 11:29:03
 * @LastEditTime: 2020-11-22 22:10:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/loadmore/index.vue
-->
<template>
  <div>
    <div class="r-inputs">
      <div>
        经度：<input type="" v-model="lng" name="" value="经度" /> 纬度：<input
          type=""
          v-model="lat"
          name=""
          value="纬度"
        />
      </div>
      地址：<input type="" v-model="address" name="" class="r-address" />
    </div>
    <input
      id="pac-input"
      class="controls"
      type="text"
      placeholder="Search Box"
    />
    <div id="map" style="width: 700px; height: 550px"></div>
  </div>
</template>

<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
