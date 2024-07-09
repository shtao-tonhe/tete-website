<!--
 * @Author: your name
 * @Date: 2020-10-22 11:29:03
 * @LastEditTime: 2020-10-22 11:29:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/loadmore/index.vue
-->
<template>
  <div class="loadMore">
    <vue-data-loading
      :loading="loading"
      :completed="completed"
      :offset="-1"
      :listens="['infinite-scroll', 'pull-down']"
      :init-scroll="false"
      @infinite-scroll="infiniteScroll"
      @pull-down="pullDown"
    >
      <div>
        <slot></slot>
      </div>
      <div slot="infinite-scroll-loading">loading...</div>
      <div slot="completed">到底啦__</div>
    </vue-data-loading>
    <div class="backTop" :class="{ active: (page > 1) & !isBack }">
      <img src="/static/backTop.png" @click="backPage" />
    </div>
  </div>
</template>

<script>
import VueDataLoading from "vue-data-loading";
export default {
  name: "loadMore",
  props: {
    completed: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueDataLoading,
  },
  data() {
    return {
      loading: false,
      page: 1,
      isBack: false,
    };
  },
  methods: {
    pullDown() {
      this.page = 1;
      this.$emit("changeData", 1);
    },
    infiniteScroll() {
      //到底触发的事件
      this.page++;
      this.$emit("changeData", this.page);
    },
  },
};
</script>
