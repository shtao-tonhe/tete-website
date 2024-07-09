<!--
 * @Author: your name
 * @Date: 2020-11-16 22:39:16
 * @LastEditTime: 2020-12-09 08:10:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/vip/index.vue
-->
<template>
  <div class="jsx-179283987 main-body2 page-with-header">
    <div class="App">
      <div class="wrapper"></div>
      <div class="w">
        <div class="member-floor">
          <div class="member-hd">入驻商家</div>
          <ul class="member-bd clearfix">
            <li
              class="member-bd-item"
              clstag="pageclick|keycount|sp|icon2"
              style="width: calc(25%)"
            >
              <i class="right-icon icon4"></i>
              <p class="right-hd">客户口碑系统</p>
              <p class="right-bd">客户信任感倍增</p>
            </li>
            <li
              class="member-bd-item"
              clstag="pageclick|keycount|sp|icon3"
              style="width: calc(25%)"
            >
              <i class="right-icon icon3"></i>
              <p class="right-hd">专属曝光</p>
              <p class="right-bd">助你轻松曝光</p>
            </li>

            <li
              class="member-bd-item"
              clstag="pageclick|keycount|sp|icon7"
              style="width: calc(25%)"
            >
              <i class="right-icon icon2"></i>
              <p class="right-hd">你的专属客服</p>
              <p class="right-bd">随时随地线上咨询问题</p>
            </li>

            <li
              class="member-bd-item"
              clstag="pageclick|keycount|sp|icon9"
              style="width: calc(25%)"
            >
              <i class="right-icon icon1"><i class="new-icon"></i></i>
              <p class="right-hd">尊贵商户标识</p>
              <p class="right-bd">彰显尊贵提升影响力</p>
            </li>
          </ul>
          <div class="right-content"></div>
          <a class="right-btn" @click="go">立即入驻</a>
        </div>
      </div>
      <div class="side-nav-app"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async go() {
      let res = await this.$api.front_user_applyMerchants();
      if (res.code === 0) {
        this.$message.success(this.$t("components.tips.applyMerchants"));
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>

<style lang="less">
@import url("./index.less");
</style>
