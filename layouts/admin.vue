<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-01-10 08:47:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/layouts/default.vue
-->
<template>
  <a-layout id="components-layout-demo-top-side">
    <vHeader></vHeader>
    <a-layout-content class="admin-box" style="padding: 0 20px">
      <a-layout style="padding: 14px 0; background: #fff; position: relative">
        <a-layout-sider class="menu-left" width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="[$route.path]"
            style="height: 100%"
          >
            <a-menu-item key="/myQrcode">
              <nuxt-link replace :to="getRouter('/myQrcode')">
                {{ isme ? $t("page.myQrcode") : $t("page.TQrcode") }}
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="/user" v-if="isme">
              <nuxt-link replace :to="getRouter('/user')">
                {{ $t("page.personalData") }}
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="/preferences" v-if="isme">
              <nuxt-link replace :to="getRouter('/preferences')">
                {{ $t("page.likesetting") }}
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="/qrcodeMng" v-if="isme && isBusiness === '4'">
              <nuxt-link replace :to="getRouter('/qrcodeMng')">
                {{ $t("page.qrCodeMng") }}
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="/goods" v-if="isme && isBusiness === '4' || !isme">
              <nuxt-link replace :to="getRouter('/goods')">
                {{ isme ? $t("page.goods") : $t("page.Tgoods") }}
              </nuxt-link>
            </a-menu-item>

            <a-menu-item key="/order" v-if="isme">
              <nuxt-link replace :to="getRouter('/order')">
                {{ $t("page.myOrder") }}
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="/userOrder" v-if="isme && isBusiness === '4'">
              <nuxt-link replace :to="getRouter('/userOrder')">
                {{ $t("page.userOrder") }}
              </nuxt-link>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content
          class="menu-content"
          :style="{ padding: '0 24px', minHeight: '580px' }"
        >
          <nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      ©copyright PA Technology Pty Ltd
    </a-layout-footer>
  </a-layout>
</template>
<script src="./admin.js"></script>
<style lang="less">
@import url("./admin.less");
</style>
