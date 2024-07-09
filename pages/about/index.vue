<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2020-11-07 10:55:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div class="jsx-179283987 main-body   page-with-header">
    <div class="about-container">
      <div class="jsx-2842284147 about-content">
        <section class="jsx-2842284147 about-mobile-title">
          <h1 class="jsx-2842284147 title1">{{ OtherExtZH2.title }}</h1>
        </section>
        <div class="jsx-2842284147 about-img">
          <div class="jsx-1994528170 banner-video-container">
            <videoItem ref="oneItem"  v-if="isType === '1'" :istype="3"></videoItem>
            <videoItem ref="twoItem" v-if="isType === '2'" :istype="2"></videoItem>
          </div>
        </div>
        <article class="jsx-2842284147 about-article">
          <h1 class="jsx-2842284147 title2">{{ OtherExtZH2.title }}</h1>
          <div v-html="OtherExtZH2.content"></div>
        </article>
      </div>
    </div>
  </div>
</template>

<script src="./index.js">

</script>

<style lang="less">
@import "./index.less";
</style>
