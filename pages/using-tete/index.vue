<!--
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2020-11-12 08:02:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/privacy-policy/index.vue
-->
<template>
  <div class="jsx-1671784627 article-wrapper">
   <article v-if="OtherExtZH2" v-html="OtherExtZH2"></article>
    <article v-else>
      {{ $t("common.noData") }}
    </article>
  </div>
</template>

<script src="./index.js">
</script>

<style>
</style>
