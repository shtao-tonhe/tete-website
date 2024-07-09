<!--
 * @Author: your name
 * @Date: 2020-10-24 21:13:40
 * @LastEditTime: 2020-12-07 08:16:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/videoLoading/index.vue
-->
<template>
  <div
    class="tete-ui-loading-container tete-loading"
    style="width: 48px; height: 48px"
  >
    <div class="tete-ui-loading" style="transform: scale(0.24)">
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 160 90"
        width="160"
        height="90"
      >
        <defs>
          <mask id="redhole">
            <rect width="100%" height="100%" fill="white"></rect>
            <circle
              fill="black"
              class="tete-ui-loading-red tete-ui-loading-black"
            ></circle>
          </mask>
          <mask id="greenhole">
            <rect width="100%" height="100%" fill="white"></rect>
            <circle
              fill="black"
              class="tete-ui-loading-green tete-ui-loading-black"
            ></circle>
          </mask>
        </defs>
        <circle
          stroke-width="2"
          stroke="#3AF2FF"
          class="tete-ui-loading-black-circle"
        ></circle>
        <circle class="tete-ui-loading-green" mask="url(#redhole)"></circle>
        <circle class="tete-ui-loading-red" mask="url(#greenhole)"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
