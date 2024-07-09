<!--
 * @Author: your name
 * @Date: 2020-11-19 14:03:03
 * @LastEditTime: 2020-12-31 00:10:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/user/index.vue
-->
<template>
  <div class="">
    <div class="account-settings-info-title">
      <span data-v-05334a82=""
        >  {{ isme ? $t("page.myQrcode") : $t("page.TQrcode") }}
        <a-button @click="$router.go(-1)" class="btn-white fr">
          Back
        </a-button>
      </span>
    </div>
    <div class="text-center" v-if="link2">
      <me-qrcode
        :qr-url="link2"
        :qr-size="250"
        :qr-logo-size="60"
        :qr-logo="logo"
      ></me-qrcode>
    </div>

  </div>
</template>

<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
