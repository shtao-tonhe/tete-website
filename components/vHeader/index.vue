<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2021-01-30 16:45:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <div>
    <div
      class="jsx-4096498568 header-container white"
      :class="
        $route.path === '/foryou' ||
        $route.path === '/profile' ||
        $route.path === '/following'
          ? 'middle'
          : ''
      "
    >
      <div class="jsx-4096498568 header-content">
        <div class="jsx-4096498568 hamburger-wrapper">
          <!-- hamburger-sidenav -->
          <span
            class="jsx-319605352 hamburger-menu"
            v-if="
              $route.path !== '/foryou' &&
              $route.path !== '/profile' &&
              $route.path !== '/following'
            "
            @click="showDrawer"
          >
            <span class="jsx-319605352 hamburger-menu-wrapper">
              <span class="jsx-319605352"></span>
              <span class="jsx-319605352"></span>
              <span class="jsx-319605352"></span>
            </span>
          </span>
          <span class="jsx-3865220200 logo-container">
            <nuxt-link
              title="TETE"
              class="jsx-3865220200 logo-link"
              replace
              to="/"
            >
              <img
                src="~/assets/images/IMG_1403.png"
                alt="TETE"
                class="jsx-1009840709 logo-text"
              />
              <strong class="jsx-1009840709">TETE</strong>
            </nuxt-link>
          </span>
        </div>
        <div class="jsx-2365341634 menu-right">
          <div class="jsx-3228136473 upload-wrapper">
            <a-tooltip placement="bottomRight">
              <template slot="title">
                <span>Search video</span>
              </template>
              <div class="jsx-3228136473">
                <a @click="search">
                  <a-icon
                    type="search"
                    class="icon-search"
                    :style="{
                      fontSize: '30px',
                    }"
                  />
                </a>
              </div>
            </a-tooltip>
          </div>
          <div class="jsx-3228136473 upload-wrapper">
            <a-tooltip placement="bottomRight">
              <template slot="title">
                <span>{{ $t("header.upload") }}</span>
              </template>
              <div class="jsx-3228136473">
                <a @click="go('upload')">
                  <a-icon
                    class="icon-search"
                    type="cloud-upload"
                    :style="{
                      fontSize: '30px',
                    }"
                  />
                </a>
              </div>
            </a-tooltip>
          </div>
          <a-popover
            trigger="hover"
            placement="bottomRight"
            v-show="userInfo && userInfo.token"
          >
            <template slot="content">
              <div
                class="ivu-select-dropdown ivu-dropdown-transfer"
                data-transfer="true"
                x-placement="bottom"
              >
                <div class="ivu-dropdown-menu">
                  <nuxt-link to="/profile">
                    <div class="ivu-dropdown-item">
                      {{ $t("header.viewProfile") }}
                    </div>
                  </nuxt-link>
                  <div
                    v-show="userInfo && userInfo.token"
                    @click="logout"
                    class="ivu-dropdown-item"
                  >
                    {{ $t("common.logout") }}
                  </div>
                </div>
              </div>
            </template>
            <div class="jsx-2505920267 profile">
              <span
                class="tete-avatar tete-avatar-circle"
                style="width: 40px; height: 40px"
              >
                <img
                  v-show="
                    userInfo && userInfo.info && userInfo.info.head_portrait
                  "
                  :src="
                    userInfo &&
                    userInfo.info &&
                    userInfo.info.head_portrait || ''
                  "
                />
                <img
                  v-show="
                    !userInfo || !userInfo.info || !userInfo.info.head_portrait
                  "
                  src="~/assets/images/tx.png"
                />
              </span>
            </div>
          </a-popover>
          <button
            v-show="!userInfo || !userInfo.token"
            @click="setModal1Visible"
            type="button"
            class="login-button jsx-1697954604 tete-btn-pc tete-btn-pc-medium tete-btn-pc-primary"
          >
            {{ $t("common.login") }}
          </button>
        </div>
      </div>
      <vDrawerLeft ref="vDrawerLeft" />
    </div>
  </div>
</template>
<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
