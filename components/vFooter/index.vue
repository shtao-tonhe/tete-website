<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2020-12-20 19:08:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <div class="jsx-3271757193 footer-container">
    <div class="jsx-3935933093 download-container">
      <div class="jsx-3935933093 download-content download-link">
        <span class="jsx-3935933093">Download now</span>
        <div class="jsx-3935933093 download-wrapper">
          <!-- <div class="jsx-2653796327 qr-btn">
            <img
              src="https://s16.tetecdn.com/musical/resource/mtact/static/images/share/video/ic-qrcode.svg"
              class="jsx-2653796327 qr-image"
            />
            <span class="jsx-2653796327">QR CODE</span>
          </div>
          <div class="jsx-1285478177 modal">
            <div class="jsx-1285478177 modal-wrapper">
              <div class="jsx-1285478177 modal-mask">
                <div class="jsx-1285478177 close"></div>
              </div>
              <div class="jsx-1285478177 modal-content qr-modal jsx-1936451428">
                <p class="jsx-2653796327 qr-title">將相機對準 QR Code 下載 TeTe</p>
                <img
                  src="https://s16.tetecdn.com/tete/falcon/_next/static/images/white_qr_code-33bea7a2e60d6b047acb2dea29021e98.png"
                  class="jsx-2653796327 qr-pic"
                />
              </div>
            </div>
          </div> -->
          <a
            href="http://teteday.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            class="jsx-3935933093"
          >
            <img
              src="~/assets/images/nothing.png"
              alt="apple-store"
              class="jsx-3935933093 apple jsx-3812584957"
            />
          </a>
          <a
            href="http://teteday.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            class="jsx-3935933093"
          >
            <img
              src="~/assets/images/nothing.png"
              alt="google-store"
              class="jsx-3935933093 google jsx-3812584957"
            />
          </a>
          <a
            href="http://teteday.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            class="jsx-3935933093"
          >
            <img
              src="~/assets/images/nothing.png"
              alt="amazon-store"
              class="jsx-3935933093 amazon jsx-3812584957"
            />
          </a>
        </div>
      </div>
    </div>
    <footer class="jsx-3271757193 footer-content-wrapper">
      <div class="jsx-3271757193 tete-logo">
        <div class="jsx-1929089525 logo-container jsx-997609344 footer-logo">
          <!-- <img
            src="../../assets/images/logo-tete.png"
            title="TeTe"
            class="jsx-1929089525 logo-icon"
          /> -->
          <img
            src="../../assets/images/IMG_1403.png"
            title="TeTe"
            class="jsx-1929089525 logo-text"
          />
        </div>
        <strong class="jsx-3271757193">TeTe</strong>
      </div>
      <div class="footer-content-column">
        <h4>{{ $t("menu.company") }}</h4>
        <span>
          <nuxt-link class="item-sub-column" to="/">
            <h5>{{ $t("menu.home") }}</h5>
          </nuxt-link>
        </span>
        <span>
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
        <span>
          <nuxt-link class="item-sub-column" to="/forgood" target="_blank">
            <h5>{{ $t("menu.forGood") }}</h5>
          </nuxt-link>
        </span>
        <span>
          <nuxt-link class="item-sub-column" to="/developers" target="_blank">
            <h5>{{ $t("menu.forDevelopers") }}</h5>
          </nuxt-link>
        </span>
      </div>
      <div class="footer-content-column">
        <h4>{{ $t("menu.Resources") }}</h4>
        <span>
          <nuxt-link
            class="item-sub-column"
            to="/using-tete?name=UsingTETEAddaneffect"
          >
            <h5>{{ $t("menu.helpCenter") }}</h5>
          </nuxt-link>
        </span>
        <span>
          <nuxt-link class="item-sub-column" to="/privacy-safety?name=Homepage">
            <h5>{{ $t("menu.securityCenter") }}</h5>
          </nuxt-link>
        </span>
        <span>
          <nuxt-link class="item-sub-column" to="/community-guidelines">
            <h5>{{ $t("menu.communitySelfDisciplineConvention") }}</h5>
          </nuxt-link>
        </span>
        <span>
          <nuxt-link class="item-sub-column" to="/transparency">
            <h5>{{ $t("menu.Transparency") }}</h5>
          </nuxt-link>
        </span>
      </div>
      <div class="footer-content-column">
        <h4>{{ $t("menu.law") }}</h4>
        <!-- <span>
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
        <span>
          <nuxt-link
            class="item-sub-column"
            to="/privacy-policy?name=TermsofService"
          >
            <h5>{{ $t("menu.termsOfUse") }}</h5>
          </nuxt-link>
        </span>
      </div>
    </footer>
    <div class="jsx-3271757193 footer-bottom-wrapper">
      <div class="jsx-3271757193 copyright">© 2020 TeTe</div>
      <div class="jsx-3271757193 copyright">©copyright PA Technology Pty Ltd</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vFooter",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less">
@import "./index.less";
</style>
