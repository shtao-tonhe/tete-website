<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2020-11-12 08:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div class="jsx-179283987 main-body2 page-with-header">
    <div>
      <div class="jsx-2239022432 contact-container">
        <h1 class="jsx-2239022432">{{ $t("page.Contact") }}</h1>
        <div class="jsx-2239022432 contact-wrapper">
          <div class="jsx-2239022432 contact-row">
            <div class="jsx-2239022432 contact-card support">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJeSURBVHgB7Zk9UiMxEIXfbm20CXuCXe0Jlr3BJMTACRhuYE6AOYHhBKMbADGBzQlwQD4TkmESEgJQIzUjT2k0+hlTFMVX9YDSqOVn/bTaBnBzrFQrPQdo4oj/ZcaYK91bfW+UzpVKBPLN0TYzL7pSusAwl1Y/NsamaYxGaWmeCaVt84zaT5QkIiih3+k54hFoZ51mrvD0K62+FbT5IE5NkEAcAnopSZOIGIl26YNMckAMAu1sbCOeqYmdhXSWiDdYof+wELWRj7kZoxjoF21QoF2iPkIMCujtMR/oF21wYvrvIR9pxvpjN35HHrvoT0cCevlJtL+GDgGPsW83/kAedCiWPc8KrCdkyrm+E87jCLsxdwZpVh56nkloU3wZbMFP4+qXa3Dj5Bps0NnUGXAOXVuRXIPXZuDgq8oDG1zYjbkGF+Z36PXm46AzphOJuDxIM8d3cHcWS7jLs9rTt+q+QG6aoRxIJdPM6NB6RmlDeuIYAV2iNWYsLxLxd7EddxwXtlZolCEBEmkGaclu0NaSIiCmQGtuikAk0gwyXE/yfqI72t5vAvpAcfVCe7dEBBJ5BonCMtAnMkZvZjA95R4SFwsjAW2W8htfX5SE6fBQYbBCAhL5Mzgqn/4u3jjvZZDSSdJ1+F4GhdI/JPC1xLl8Gcyl7yYp8UHoM1jhg+A0WOE/xuTQ+82IH6fBEr8xJjkGkw/JX1y9atM4Da7whLFo8Mh/PiCBrkFJP45wOxhYY+dVQ1hjLZGA60t0qXQg8FNVmluq5E2vaS9wx6txhnE+O78xRfi/IXyqEfGByMULfUm7R8a64kEAAAAASUVORK5CYII="
                alt="Support"
                class="jsx-2239022432"
              />
              <div class="jsx-2239022432 contact-desc">
                <p class="jsx-2239022432">
                  <strong class="jsx-2239022432">Visit the Help Center</strong>
                </p>
                <nuxt-link to="/using-tete?name=UsingTETEAddaneffect" class="jsx-2239022432"
                  >Help Center</nuxt-link
                >
              </div>
            </div>
          </div>

          <div class="jsx-2239022432 contact-row">
            <div class="jsx-2239022432 contact-card">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AE8gAArvAErfAEW/ADtbABs1ABCQACwQAAXPAEBwACNNeDH9AAAAEXRSTlMAIIDfv0AQ71+gkE9wMLDPb/v+GPMAAALbSURBVGje7ZjJUuMwAAW1eE+coLAz8//fOSBwkqmH1BZVTnFQnzjk0XHcjsGmUqlUKpUKwbTu0BzurLkxtgmfjLdVz31Y8Lc02+jdwmzz+HBNY/MUaH1Ywf3r0+t9WIHv1oqbVd6H0+n0uMo8rRWvOuDH0wdPYQXNWrELzMvpk7fADGvF3XT0y1H3XohJP3+JX+JZVC7z476s62VphOFaHE/yDHNAfnuk1W+P8M7bQ/Q+xtfAvAifKSN+1n8/vA/38hKYE2040yXie/5zenqReGCOjPHdxkNzGl8frvEwL09rcIk+9v+JLcyL0/Km0z70Sh9oXpzWaEyT6mNY6vEzzovTsvGHRB82ftz9UD7ntM5Xjktm4EvmjL2cO+mDxDzntN6RPlDMc04rIn2AmOecVkT6QDHPOS3pA8QwX5+W9sFinnNa0geIec5pObOgfahY04I5pCV9gBjnnNZB7vuOxJqWzjmtndyKehBLWjCHNqQPEvOc05I+WKxp6ZzT0j5YzHNOS/tAsaalc05L+2CxpqVzTkv7QDHPOS3oQ8SSVlFeO2lD+siJW5onOUha0oeIJS2YQ1rQh4o1LZ3DP+TuOybpQ8UDztNpAY2IfzTXBJBOxGXzH4stiGm+yRHPRXOt0n3PuHQpYpxf6jIJ+szHscO4eH7MPtHbZ25bU07M8zF7HTeZS20n4tJ5rq42cdviby6aS1t8F7HLfUfEMj/CPHPILnGKYjh8d5p4rjSpPyH0HauY53DIMU0deoviGeb8xNhdddA1y2MlEF8egE3X84PMExdcxA/2a+f6oGdexTwHumP4opmcm+LR6lDFPEfzFJRlqGIhOWec7PqdQTHPGTsuE2kFxDhntV9m/lI4i3nOzDvn3F2sk8U8LwfESBVXcRVXcRVXcZIqruLfLrbtwhDF7RlrtsSFNHuzHTZk6M12zPAUazM6n/EezIbYsUnhOlOpVCqVSqWyin8WVJcC86v3IgAAAABJRU5ErkJggg=="
                alt="Legal Inquiry"
                class="jsx-2239022432"
              />
              <div class="jsx-2239022432 contact-desc">
                <p class="jsx-2239022432">
                  <strong class="jsx-2239022432">Legal Inquiries</strong>
                </p>
                <nuxt-link
                  to="/privacy-policy?name=LawEnforcement"
                  class="jsx-2239022432"
                  >Law Enforcement Guidelines</nuxt-link
                ><br class="jsx-2239022432" /><nuxt-link
                  to="/privacy-policy?name=IntellectualPropertyPolicy"
                  class="jsx-2239022432"
                >Intellectual Property</nuxt-link>
              </div>
            </div>
            <div class="jsx-2239022432 contact-card">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAWlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+K1UAAAAAAAAAAAAAAAD/K1T+LFT/KFAAAAAAAAD+LFUAAAAAAAD8KlX/K1b/KFj/KFD+LFQAAAD+LFVgGUfCAAAAHHRSTlMAv4DfIGAB76BA3xDPn5DPgBAwUL9wr2BfICC/4hypnQAAAmhJREFUaN7t2u2S2iAUgGEOH0WERE2Mu23J/d9mZxAXp2NBcoCtu7z/lnHzSBIxakjvm6dGkNYlYZw1aZMar2hoUKR+HOyDYCJ109T+o4GTinETJMkMMBn+ZhUnPckbOgg/QT7vmPUtpFKz9CzV5D5xo6kfqDTfwN7RFefMmT+UsYNf4zhfXaPJ43bXp6WLuzS4MXks7XLpJhR7sRonq4JomA9PPzcoPOFn9uNSYcrC7+h4bhm/FIXZUyfO7JYXXXxPc5LKHeW59J4Gkmws/Yq6hJU4va9NQRjC6Zo+JLIgLN0hzn4gPnduPXn2t4fDMelwhzvcYR/n/l3xiRwsONdoVYDdlBEoVoPdHOMI2FhETCMuPFBR5ITZhizusm/7dTKX7l8xsEF88hAYGDrc4fawuoBoDIePK8MnwMwvL63hybpoc3i2LvFZM+aN4fCFR3tYuLO6wx3ucIc3wCq66cWtp1VgQqNfW45WLqQsHNIkktYECW+uwx3OhbVaaNlm/gSsqbTlG3gK1sZWSU4JeGcrJXUUVrZaNAL7CcuBFm1kbqtRGCJvSdjfiKOw/5WldOYBLFvA8Bfs9sBlVko1hsHeYrwpPNmPxqYwWcKa1hYOd9OIVnCgRwC4KNIWDv2P8Ol4XtfDO8kbxcM/96tr/ytrFA/vV9/+lDOKht/Wj445o2j4EDZ2zhlFw+tdOaOvC5/Dtg45o2j4GDb2njOKhk/hJZIz+soLCCFvh3X9fTzljL72m0SHO9zhB5kkDFvuf/yRarJJmLqHMCiauW40cf9jtUTqjuJKsfSd5VUynKRSUJ5llPR6X7c/tfYHdFLA9zcAAAAASUVORK5CYII="
                alt="Privacy"
                class="jsx-2239022432"
              />
              <div class="jsx-2239022432 contact-desc">
                <p class="jsx-2239022432">
                  <strong class="jsx-2239022432">Privacy</strong>
                </p>
                <nuxt-link
                  to="/privacy-policy?name=PrivacyPolicy"
                  class="jsx-2239022432"
                  >Learn more</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videoPlay from "~/components/videoItem/index.vue";

export default {
  components: {
    videoPlay,
  },
  data() {
    return {
      screenWidth: 0,
      show2: true,
    };
  },
  mounted() {
    if (process.browser) {
      this.screenWidth = document.documentElement.clientWidth;
      window.onresize = () => {
        // 定义窗口大小变更通知事件
        this.screenWidth = document.documentElement.clientWidth; //窗口宽度
        if (this.screenWidth < 1200) {
          this.show2 = false;
          console.log("小于");
        } else {
          this.show2 = true;
          console.log("大于");
        }
      };
    }
  },
  methods: {},
};
</script>

<style lang="less">
@import "./index.less";
</style>
