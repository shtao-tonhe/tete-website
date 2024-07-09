<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2020-12-03 13:43:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div class="share-layout-content jsx-683523640">
    <main
      class="share-layout-main share-layout-main_v2 foryou layout-box"
      id="scrollView"
    >
      <modalVideo
        @closeModal="closeModal"
        @nextVideo="nextVideo"
        @updateData="updateData"
        @preVideo="preVideo"
        :item="arrList[index2]"
        :lastIndex="arrList.length - 1"
        v-if="showVideoModal"
        :currentIndex="index2"
      ></modalVideo>
      <div class="loading-data" v-show="!showData">
        <a-skeleton
          v-show="!showData"
          active
          :avatar="{
            size: 56,
          }"
          :paragraph="{ rows: 4 }"
        />
      </div>
      <a-empty v-if="noData" :description="$t('common.noData')" />
      <div v-if="showData">
        <videoPlay
          @updateData="updateData"
          :key="index"
          @changeIndex="changeIndex"
          v-for="(item, index) in arrList"
          :showVideoModal="showVideoModal"
          :ref="'videoItem' + index"
          @showItemModal="showItemModal"
          :item="item"
          :index="index"
          :currentIndex="index2"
          :lastIndex="arrList.length - 1"
        ></videoPlay>
        <div v-if="loadEnd" class="end">end</div>
        <div v-if="title || id || nickname" @click="seemore" class="seemore">See more</div>
        <div v-if="showLoading" class="list-loading">
          <videoLoading></videoLoading>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import "./index.less";
</style>
