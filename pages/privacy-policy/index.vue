<!--
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2020-12-20 18:18:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/privacy-policy/index.vue
-->
<template>
  <div class="jsx-1671784627 article-wrapper">
    <article v-if="OtherExtZH2" v-html="OtherExtZH2" class="article-p"></article>
    <article v-else>
      {{ $t("common.noData") }}
    </article>
  </div>
</template>

<script src="./index.js">
</script>


<style lang="less" scoped>
.article-p{
  line-height: 30px;
}

</style>
