<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-03-02 08:15:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div style="width: 100%">
    <div class="share-layout-content jsx-683523640">
      <input v-model="code" />
      <button @click="go">跳转</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      code: "",
    };
  },
  mounted() {},
  methods: {
    go() {},
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
