<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2021-03-07 22:16:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <div v-if="modal1Visible">
    <a-modal
      destroyOnClose
      forceRender
      v-model="modal1Visible2"
      :footer="null"
      @cancel="afterClose"
      :width="810"
      @ok="() => (modal1Visible = false)"
    >
      <a-spin :spinning="fbloading">
        <div class="tete-app-container-12zKy">
          <div
            class="back-modal-3gZXj"
            @click="saveLastType"
            v-if="loginType !== 'kj'"
          ></div>
          <div class="login-title-container-MsJ7l">
            <div class="login-title-1FcQm">
              {{ ctx.$t("components.loginModal.title") }}
            </div>
            <div class="login-desc-32c-y">
              {{ ctx.$t("components.loginModal.desc") }}
            </div>
          </div>
          <div class="tete-web-body-33PDi tete-web-body-modal-2N5Wt">
            <div v-if="loginType === 'sms'">
              <div class="title-wrapper-20kdP">
                <a>{{ ctx.$t("components.loginModal.phone") }}</a>
                <a class="">{{
                  ctx.$t("components.loginModal.userPhoneOrUserNameLogin")
                }}</a>
              </div>
              <div class="input-field-19_1L input-field-pc-19hEk">
                <div class="container-3nzOL">
                  <div class="select-container-36J-Y">+61</div>
                </div>
                <p class="separator-6WiN4"></p>
                <input
                  v-model="username"
                  :placeholder="ctx.$t('components.loginModal.phoneNum')"
                  value=""
                />
              </div>
              <div class="digit-code-container-GBZyT">
                <div class="input-field-19_1L input-field-pc-19hEk">
                  <input
                    :maxlength="6"
                    :placeholder="ctx.$t('components.loginModal.phoneFourNum')"
                    v-model="sms"
                  />
                </div>
                <a-button
                  v-if="showCode"
                  class="login-button-Rt4Hk"
                  type="danger"
                  :loading="sendloading"
                  @click="sendlogin"
                >
                  {{ ctx.$t("components.loginModal.sendSms") }}
                </a-button>
                <a-button
                  disabled
                  v-else
                  class="login-button-Rt4Hk"
                  type="danger"
                >
                  {{ count }} s
                </a-button>
              </div>
              <a
                @click="setLoginType('pwd')"
                class="small-_0fcp grey-33rXK"
                style="margin-top: 12px"
              >
                {{ ctx.$t("components.loginModal.usePwdLogin") }}
              </a>
              <a-button
                class="login-button-Rt4Hk"
                type="danger"
                @click="loginsms"
                :loading="loading"
              >
                {{ ctx.$t("common.login") }}
              </a-button>
            </div>

            <div v-if="loginType === 'pwd'">
              <div class="title-wrapper-20kdP">
                <a>username</a>
                <a class="">{{
                  ctx.$t("components.loginModal.userPhoneOrUserNameLogin")
                }}</a>
              </div>
              <div class="input-field-19_1L input-field-pc-19hEk">
                <input
                  v-model="username"
                  :placeholder="ctx.$t('components.loginModal.phoneNum')"
                  name="username"
                />
              </div>
              <div
                class="input-field-19_1L input-field-pc-19hEk move-warning-3A55C"
              >
                <p
                  @click="showpwd = !showpwd"
                  :class="
                    showpwd ? 'show-password-3tQA5' : 'hide-password-2kwkO'
                  "
                ></p>
                <input
                  v-model="password"
                  :placeholder="ctx.$t('components.loginModal.inputPwd')"
                  :type="showpwd ? 'text' : 'password'"
                  autocomplete="password"
                  name="password"
                />
                <div class="after-1fZJ6"></div>
              </div>
              <div>
                <!-- <a class="small-_0fcp grey-33rXK" style="margin-top: 12px">{{
                ctx.$t("components.loginModal.forgetPwd")
              }}</a>
              <div class="separator-1vmQ9"></div> -->
                <a
                  class="small-_0fcp grey-33rXK"
                  @click="setLoginType('sms')"
                  style="margin-top: 12px"
                >
                  {{ ctx.$t("components.loginModal.userSmsLogin") }}
                </a>
              </div>
              <a-button
                class="login-button-Rt4Hk"
                type="danger"
                :loading="loading"
                @click="login"
              >
                {{ ctx.$t("common.login") }}
              </a-button>
            </div>

            <div class="tete-web-login-2P7wd" v-if="loginType === 'kj'">
              <div
                class="login-container-4HZX- modal-container-fsYki"
                style="max-height: calc((100vh - 150px) - 70px)"
              >
                <div class="social-container-NE2xk">
                  <div
                    class="channel-item-wrapper-2gBWB"
                    @click="setLoginType('sms')"
                  >
                    <div
                      class="channel-item-3Q5iu"
                      style="
                        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAANlBMVEVHcEwAAAAJChIMDBkWGCIOEBcOEBcJCg8QEhwNDxQUFiAAAAAAAAAVFyMDBAYQEhsWGCMAAAD5xs1FAAAAEHRSTlMA7zAQ33+jXkIgxt/B72+Q9PCfEQAAASBJREFUSMftVMsSgyAM5CUEENT//9k2aEesQNLeOtM9EciSLCwI8cd30GDNugbrmPnwzN5hWJRprTB9mM9guD0NhFC2DIEgYP9G7WNfAkYB/4oUXQLbsGe4XMMGwnVLIHvCHuorfItJgiAJpta8q06khul6aGFIyLilfkXlIsZ+0gn3PBga6yXPsJKB07WkmUJxUAohlUGgX4+pzRo8470tZ/6iWU/O29JOssB/1grA//K35LONctvkHDJHB8xbhZn6mdQlHRGHVbLc7sgD5x19ZKXxh81HuWmcP0N95yOGwzX5ptKVJpvSfcR8dTsGZMiWCUt11Tg4nG/8Zr7bbG7vhAViWxwe1nKbjT1tz8tHFbdZ2S3QWXNRdn0zWvtFPAAmbxZPKTUEzQAAAABJRU5ErkJggg==');
                        border-radius: 50%;
                      "
                    ></div>
                    <div class="channel-name-2qzLW">
                      {{ ctx.$t("components.loginModal.iphoneLogin") }}
                    </div>
                  </div>
                  <!-- <div class="channel-item-wrapper-2gBWB" style="display: none">
                  <div
                    class="channel-item-3Q5iu"
                    style="
                      background-image: url('//sf16-scmcdn-sg.ibytedtos.com/goofy/ies/tete_webapp_login/svgs/kakaotalk_circle.656b88d1.svg');
                      border-radius: 50%;
                    "
                  ></div>
                  <div class="channel-name-2qzLW">使用 KakaoTalk 登入</div>
                </div> -->
                  <g-signin-button
                    :params="googleSignInParams"
                    @success="onGoogleSignInSuccess"
                    @error="onGoogleSignInError"
                  >
                    <div
                      data-onsuccess="onSignIn"
                      class="g-signin2 channel-item-wrapper-2gBWB"
                      style="display: flex"
                      @click="fbClick"
                    >
                      <div
                        class="channel-item-3Q5iu"
                        style="
                          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAjVBMVEVHcEwwnU/VPjYvnk/VPjUvnVDWSDRQcKehaUFQcKhOc6Iunk7VPTXVPjVQcKdQcKjZWDMvnU7VPTXvtikwnVDWPTXvtSnurSpQcKfVPjYunk7ttChQcajstSgwn0zttCjvtShQcKlQcKgvnk/VPjbvtSnjfi7bsy07n009inXYTTSDqD6bqzqnrTdTokc44COHAAAAInRSTlMAPc/b5r4jPxC/oJBVkIjlQGOjtyC/0/cggIB7X2BQoJ/Psru6sQAAAUhJREFUSMftlduWgiAUhjGBoRTT0uw4B8Gp5vT+jzeGOggCC5vb/iuX6/vYe6MoAI/cFRLTGeScw4LGHnha8EHgCk/BRZwK5YZAa2Ok4OZYDDKz8DNiFqbyu0HXNMY4jVfQxWOJp3IRaOUB/NvGIYGpjT+9d/zO831Y1+WHWN+Tx3WTpgjEnsKpbg0KvDsSKWWB7ZMeRdi0wkbeWVRa3hShbIW1Q1gqQsvXB4dQ/U/oWnr1FjyGVmd4aYWzfHOSeZ9lK8wV4SD4r8ve8Iw6IVFP2235T8ZYPuKPXUtH/VGffxqeIVuBaqt9X74vTERvKqlMIzRBrEtETLzeEQBBL7AwkzeReVNFIiaV6DnIgywKm+urcQK1KTXX8Z72WxuaDWbhG8NSgy2sB29v5DPHUc3HRVDgPt0BmoSLKlmEbvOHYZSRxx/8rvwCaQpYY51gRIUAAAAASUVORK5CYII=');
                          border-radius: 50%;
                        "
                      ></div>
                      <div class="channel-name-2qzLW">使用 Google 登入</div>
                    </div>
                  </g-signin-button>
                  <fb-signin-button
                    :params="fbSignInParams"
                    @success="onFBSignInSuccess"
                    @error="onFBSignInError"
                  >
                    <div
                      @click="fbClick"
                      class="channel-item-wrapper-2gBWB"
                      style="display: flex"
                    >
                      <div
                        class="channel-item-3Q5iu"
                        style="
                          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAALVBMVEVHcEwYdfEYdvIXd/IYd+8Xd+8Xd/IXd/IQcO8Yd/IXd/EXd/IYdvMXdvIYd/JU6UsnAAAADnRSTlMAgKDGQCFa7xDfkK9/bxPrucEAAAFTSURBVCjPbdM/S8NAFADwh9Ua/Idx6lSKOEuhg+IQMjtIKWRxKNncOokIQhCcXKSfIIsgTqGrS/ETCH4Da/+EtHKfwbvkvcu75t5ydz+Ou5d3eQBFOJcfUdp5ewQjNs9EHqvQUE9gZMy3tMr9Xc03gsUd6Z4w4hP5y+Q/62baPtDrh+NOLIdFnkZMeqJSlWOqktkgvQVk0eZnhJpnckJn/ILmKY4q5iULvzx6qPD7KJ+3YJt4JPkU5/dwRdwCqNN8Bk2aHrLvXYLHWN+zsnMGkY1TEDYWyPMgkI/uBMG1wT/0UrvIsck1vHJs8oEoapWY3MfPGZhc1GIBL/k4cV1f1sR1x1jkmi3vNuzbOAQnqnImL2lWWf0oz1UeQvnGjH2VarLOE1YGxqOimzyTp9hXTyafUyESzkvdO/W45JS1Wq/kd96YvbjgtLHWxq+Sdy58XP4DJ30Z99MJep4AAAAASUVORK5CYII=');
                          border-radius: 50%;
                        "
                      ></div>

                      <div class="channel-name-2qzLW">使用 Facebook 登入</div>
                    </div>
                  </fb-signin-button>

                  <div style="display: block">
                    <!-- <div class="channel-item-wrapper-2gBWB">
                    <div
                      class="channel-item-3Q5iu"
                      style="
                        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAKlBMVEVHcExVrO5Vre5Uq+1VrO5VrO5Tqe9VrO5Qre9VrO9VrO5UrO5Tqu9VrO5XKaJ3AAAADXRSTlMA26M7gO8gYBBvv5BQFItffAAAASNJREFUOMtjYBgCoGXp1ZUJWMQ5Y+/evXsFKF8A4lUjJHTvgoDyrItgXbIOMHHuu1BwHcTjAOmFgFqYhEM7kMd89+4GqIQsVPzWrGsQCYiRIBYMTABy2SAOAbkJLg7hg5woDmKwwMSvgl3LsBfEFkpAkrgEsdIWzLm4x4ATTQLuelFUCQ4O2btoAGI388qD6BI3wRJsdzHAHQa4c1HBZYiEL4ZEAESiFUNCASLBjiFRwIDDrAaoBBuaRy7BY5QZVeYaTJxVFqvdSKEKBfD0gxZYVxCpJhFFQgAhwaaLJH4ROSXy6GIEFEaSgnsbArrh4uGoiRwe9BcNkITZihBRooEQthJEcpIwsjlVCHFJVBclQX1+VRk9IzFXL4y9K6hpMPiLAgAShJKTONKnlQAAAABJRU5ErkJggg==');
                        border-radius: 50%;
                      "
                    ></div>
                    <div class="channel-name-2qzLW">使用 Twitter 登入</div>
                  </div> -->
                    <!-- <div class="channel-item-wrapper-2gBWB">
                    <div
                      class="channel-item-3Q5iu"
                      style="
                        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAATlBMVEVHcEw6zgA5zgA6zgA5zQA5zwBAzwA5zgA6zwA6zgA6zgH////n+d/O879r2kCI4ma17aBS1CHz/O+c5oCp6pB33VBG0RHb9tBf1zDC8K+kvbdFAAAACnRSTlMAz1Cwr3UQ5V+Kd4vKYgAAAYZJREFUSMe9lsmigyAMRWvryCAz6v//6BN4tghB6aZ3J+RIIhl8PH6lvmsHVFTTjon988I6aDghE6pQ97HvUJWmw35ElXr+A0MtMPTfHXCE0abLK9OcUq7Zmu68PNCc1mYu8VuEz2efPHAypzgRFfF+AliNAekiIAgGtQgYKNnvoVgQKNrvgUCAwhdiOSCu7LG0GeA/kGTOr0Vh6s7TG1aMsS06IgKW4Kvym2R2L0Az8XcTRfEBLE6A/Q0OMIT4m5cpIFLACumAValw+fYO0MjELmFxB2CDHDBTGpIxC1oGwHBOAiCFB/Znnx4ZwN/LjCFpkKODS8bt8AwInm6cc0koJi7Shfhn8gnhlBr06qY5kEurLNsTAWUrKwMGLiB1l6tZiRqwJORcrGkkOOD/Wm4CvsuUCxoE9lPYtsAtowDE8UuDKgELNLE3ADXv1ddrPrrgZhwSTtt8+VWcP4JZyNMw5/r6gXKM0Fpg/GqIRkOxkpjiQT3eD/Zn8i8wts2Fddv1P/uL+QNiY0+L/361HAAAAABJRU5ErkJggg==');
                        border-radius: 0px;
                      "
                    ></div>
                    <div class="channel-name-2qzLW">使用 LINE 登入</div>
                  </div> -->
                    <div class="channel-item-wrapper-2gBWB" @click="goApple">
                      <div
                        class="channel-item-3Q5iu apple-icon"
                        style="border-radius: 50%"
                      ></div>
                      <div class="channel-name-2qzLW">使用 Apple 登入</div>
                    </div>
                    <!-- <linkedin-signin-button
                    :params="LNSignInParams"
                    @success="onLNSignInSuccess"
                    @error="onLNSignInError"
                  > -->
                    <div class="channel-item-wrapper-2gBWB" @click="goLinkedin">
                      <div
                        class="channel-item-3Q5iu"
                        style="
                          width: 28px;
                          height: 28px;
                          background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2NzgwNzI2ODgwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTQiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBlbGVtZW50LWljb25zOyBzcmM6IHVybCgiY2hyb21lLWV4dGVuc2lvbjovL21vb21iZW9kZm9tZHBqbnBvY29iZW1vaWFlbWVkbmtnL2ZvbnRzL2VsZW1lbnQtaWNvbnMud29mZiIpIGZvcm1hdCgid29mZiIpLCB1cmwoImNocm9tZS1leHRlbnNpb246Ly9tb29tYmVvZGZvbWRwam5wb2NvYmVtb2lhZW1lZG5rZy9mb250cy9lbGVtZW50LWljb25zLnR0ZiAiKSBmb3JtYXQoInRydWV0eXBlIik7IH0KPC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMi4yNjcyMzQgOTU5LjU2OTk2OGMyNDcuMjIzMjU1IDAgNDQ3LjU3MjAxNi0yMDAuNDAwOTc5IDQ0Ny41NzIwMTYtNDQ3LjU4MjI1NSAwLTI0Ny4xNzEwMzctMjAwLjM0NzczNy00NDcuNTU4NzA1LTQ0Ny41NzIwMTYtNDQ3LjU1ODcwNS0yNDcuMTk0NTg2IDAtNDQ3LjU2ODk0NCAyMDAuMzg3NjY5LTQ0Ny41Njg5NDQgNDQ3LjU1ODcwNSAwIDI0Ny4xODIzIDIwMC4zNzMzMzQgNDQ3LjU4MjI1NSA0NDcuNTY4OTQ0IDQ0Ny41ODIyNTUiIGZpbGw9IiMxMjg0QzciIHAtaWQ9IjUzMTUiPjwvcGF0aD48cGF0aCBkPSJNMzg3LjAxMzI5NSA2OTkuMTg4NzYzaC04Ny4yNDkzNjVWNDE5Ljk5OTgwOGg4Ny4yNDkzNjV2Mjc5LjE4ODk1NXogbS00NS44NjA4NDgtMzE0LjExNDcwN2gtMC42Mjg2NjZjLTMxLjU3MDQ4IDAtNTIuMDQyMDQzLTIxLjM0MTg2Ni01Mi4wNDIwNDMtNDguMzc4NTgyIDAtMjcuNTczMjMyIDIxLjA4NjkxOC00OC40Nzg5MjIgNTMuMjg2MDY0LTQ4LjQ3ODkyMiAzMi4xNzU1OTYgMCA1MS45NzU0OTEgMjAuODUyNDQ5IDUyLjYwNzIyOCA0OC40MDIxMzEgMC4wMDEwMjQgMjcuMDQ2OTU1LTIwLjQzMDYwOCA0OC40NTUzNzMtNTMuMjIyNTgzIDQ4LjQ1NTM3M3ogbTM5NC44OTkyNTkgMzE0LjExNDcwN0g2MzcuMTI1OTU0VjU1NC43MTEzNzZjMC0zNy44MTUxNTctMTUuNDU3NTk3LTYzLjYxODA5MS00OS40OTY2NjQtNjMuNjE4MDktMjYuMDMxMjYgMC00MC40ODg1MjEgMTcuNDEwMTQ2LTQ3LjIzMzg3OCAzNC4yMDQ5MzctMi41MTg3NTggNi4wMTMyNzktMi4xMzM3NzcgMTQuNDA1MDQzLTIuMTMzNzc3IDIyLjgyMDM1NnYxNTEuMDY5MTZoLTk4LjAwMTE4NHMxLjI3MzcxMy0yNTUuOTIxMTYxIDAtMjc5LjE4ODk1NWg5OC4wMDExODR2NDMuODE1MTI1YzUuNzk0MTY3LTE5LjE1NzkxOCAzNy4wOTc0MTMtNDYuNTAxOCA4Ny4wOTM3MzMtNDYuNTAxOCA2MS45ODYwMTggMCAxMTAuNjk2MzM4IDQwLjE2ODA0NSAxMTAuNjk2MzM4IDEyNi42MzAwNDF2MTU1LjI0NjYxM3oiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjUzMTYiPjwvcGF0aD48L3N2Zz4=');
                          border-radius: 0px;
                        "
                      ></div>
                      <div class="channel-name-2qzLW">使用 LinkedIn 登入</div>
                    </div>
                    <!-- </linkedin-signin-button> -->
                    <!-- <div class="channel-item-wrapper-2gBWB">
                    <div
                      class="channel-item-3Q5iu"
                      style="
                        background-image: url('data:image/png;base64,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');
                        border-radius: 0px;
                      "
                    ></div>
                    <div class="channel-name-2qzLW">使用 Instagram 登入</div>
                  </div> -->
                  </div>
                </div>
              </div>
              <!-- <div class="footer-wrapper-xil5O">
              <div class="to-login-1hkoq">
                {{ ctx.$t("components.loginModal.noaccount") }}
                <a
                  class
                  href="/signup?lang=zh_Hant&amp;redirect_url=https%253A%252F%252Fwww.tete.com%252Fupload%252F%253Flang%253Dzh_Hant&amp;enter_method=click_navigation_bar&amp;enter_from=home&amp;is_modal=1&amp;hide_close_btn=1"
                >
                  {{ ctx.$t("components.loginModal.Registration") }}
                </a>
              </div>
            </div> -->
            </div>
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
