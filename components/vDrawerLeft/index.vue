<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2020-12-22 10:16:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <a-drawer
    placement="left"
    width="340"
    closable
    :visible="visible"
    :after-visible-change="afterVisibleChange"
    @close="onClose"
  >
    <nav class="jsx-2153194595 drawer-content drawer-enter-done">
      <span class="jsx-3865220200 logo-container-drawer" @click="onClose">
        <nuxt-link title="TETE" class="jsx-3865220200 logo-link" to="/">
          <img
             src="~/assets/images/IMG_1403.png"
            alt="TETE"
            class="jsx-1009840709 logo-text"
          />
          <strong class="jsx-1009840709">{{ $t("common.MAIN") }}</strong>
        </nuxt-link>
      </span>
      <span @click="onClose">
        <nuxt-link to="/" class="jsx-2153194595 item-sub-column to-other">
          <h5 class="jsx-2153194595">{{ $t("menu.home") }}</h5>
        </nuxt-link>
      </span>

      <span @click="onClose">
        <nuxt-link to="/foryou" class="jsx-2153194595 item-sub-column to-other">
          <h5 class="jsx-2153194595">{{ $t("menu.forYou") }}</h5>
        </nuxt-link>
      </span>
      <div class="footer-content-column">
        <h4>{{ $t("menu.company") }}</h4>
        <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/about">
            <h5>{{ $t("menu.about") }}</h5>
          </nuxt-link>
        </span>
        <span>
          <nuxt-link class="item-sub-column" to="/contact">
            <h5>{{ $t("menu.contact") }}</h5>
          </nuxt-link>
        </span>
      </div>
      <div class="footer-content-column">
        <h4>{{ $t("menu.programme") }}</h4>
        <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/forgood" target="_blank">
            <h5>{{ $t("menu.forGood") }}</h5>
          </nuxt-link>
        </span>
        <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/developers" target="_blank">
            <h5>{{ $t("menu.forDevelopers") }}</h5>
          </nuxt-link>
        </span>
        <!-- <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/contact" target="_blank">
            <h5>{{ $t("menu.ad") }}</h5>
          </nuxt-link>
        </span> -->
      </div>
      <div class="footer-content-column">
        <h4>{{ $t("menu.Resources") }}</h4>
        <span @click="onClose">
          <nuxt-link
            class="item-sub-column"
            to="/using-tete?name=UsingTETEAddaneffect"
          >
            <h5>{{ $t("menu.helpCenter") }}</h5>
          </nuxt-link>
        </span>
        <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/privacy-safety?name=Homepage">
            <h5>{{ $t("menu.securityCenter") }}</h5>
          </nuxt-link>
        </span>
        <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/community-guidelines">
            <h5 class="line1">{{ $t("menu.communitySelfDisciplineConvention") }}</h5>
          </nuxt-link>
        </span>
        <span @click="onClose">
          <nuxt-link class="item-sub-column" to="/transparency">
            <h5>{{ $t("menu.Transparency") }}</h5>
          </nuxt-link>
        </span>
      </div>
      <div class="footer-content-column">
        <h4>{{ $t("menu.law") }}</h4>
        <!-- <span @click="onClose">
          <nuxt-link
            class="item-sub-column"
            to="/privacy-policy?name=CookiesPolicy"
          >
            <h5>{{ $t("menu.CookiesPolicy") }}</h5>
          </nuxt-link>
        </span> -->
        <span>
          <nuxt-link
            class="item-sub-column"
            to="/privacy-policy?name=PrivacyPolicy"
          >
            <h5>{{ $t("menu.privacyPolicy") }}</h5>
          </nuxt-link>
        </span>
        <span @click="onClose">
          <nuxt-link
            class="item-sub-column"
            to="/privacy-policy?name=TermsofService"
          >
            <h5>{{ $t("menu.termsOfUse") }}</h5>
          </nuxt-link>
        </span>
      </div>
      <div
        class="jsx-2153194595 footer-content-column"
        v-show="userInfo && userInfo.token"
        @click="logout"
      >
        <span class="jsx-2153194595" @click="onClose">
          <nuxt-link class="jsx-2153194595 item-sub-column" to="">
            <h5 class="jsx-2153194595">{{ $t("common.logout") }}</h5>
          </nuxt-link>
        </span>
      </div>
    </nav>
  </a-drawer>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "vDrawerLeft",
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState("auth", ["userInfo"]),
  },
  mounted() {},
  methods: {
    logout() {
      this.$utils.removeAuthInfo(this);
      this.visible = false;
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>
