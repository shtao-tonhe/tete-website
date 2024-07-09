const moment = require("moment");
moment.locale("zh-CN");
import * as Cookies from "js-cookie";

export default {
  mapinit(ctx) {
    let $cookies, $store;
    // 客户端
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store;
    }
    // 服务端
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }
    $.ajax({
      url:
        "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD6C4HP3fbie1YL9-9pxojmuiQ6JCyWD1I",
      type: "post",
      dataType: "json",
      success: resp => {
        $cookies.set("lon", (resp.location.lng + "").substring(0, 10));
        $cookies.set("lat", (resp.location.lat + "").substring(0, 10));
        ctx.$store.commit("setLatlngInfo", resp.location);
        console.log(resp.location, "0000000000000000");
        this.setAddressInfoData(resp.location, ctx, $cookies);
      }
    });
  },

  setAddressInfoData(obj, ctx, $cookies) {
    $.ajax({
      url:
        "https://maps.google.com/maps/api/geocode/json?latlng=" +
        (obj.lat + "").substring(0, 10) +
        "," +
        (obj.lng + "").substring(0, 10) +
        "&language=en&sensor=false&result_type=street_address&key=AIzaSyD6C4HP3fbie1YL9-9pxojmuiQ6JCyWD1I",
      type: "get",
      dataType: "json",
      success: resp => {
        $cookies.set(
          "addressInfo",
          resp && resp.results[0] && resp.results[0].formatted_address
        );
        ctx.$store.commit(
          "setAddressInfo",
          resp && resp.results[0] && resp.results[0].formatted_address
        );
      }
    });
  },
  /**
   * 格式化时间
   * @param {number} timestamp - 13位时间戳
   */
  formatTime(timestamp) {
    const date = new Date(timestamp);
    if (date == "Invalid Date") {
      return "";
    }
    return moment([
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ]).fromNow();
  },
  /**
   * 格式化日期
   * @param {string} format - 格式
   * @param {number} timestamp - 13位时间戳
   */
  formatDate(format, timestamp) {
    if (!timestamp) {
      return "";
    }
    return moment(timestamp).format(format);
  },
  /**
   * 匹配文本中的url
   * @param {string} str
   * @return {array}
   */
  matchUrl(str) {
    if (typeof str !== "string") {
      return [];
    }
    return (
      str.match(
        /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
      ) || []
    );
  },
  /**
   * 处理文本（分割文本和链接）
   * @param {string} str
   * @return {array}
   */
  splitContentToArray(str) {
    if (typeof str !== "string") {
      return [];
    }
    let i = 1;
    // 提取链接
    let urls = this.matchUrl(str);
    if (urls.length === 0) {
      return [{ id: i, type: "text", value: str }];
    }
    let splitContent = str.split(
      /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
    );
    // 分隔文本和链接
    splitContent = splitContent.reduce((prev, curr) => {
      if (curr === "") {
        return prev;
      }
      if (/^(https?|ftp|file)$/.test(curr)) {
        let url = urls.shift() || "";
        prev = prev.concat({
          id: i++,
          type: "url",
          value: url.length > 40 ? url.slice(0, 40) + "..." : url,
          url
        });
      } else {
        prev = prev.concat({ id: i++, type: "text", value: curr });
      }
      return prev;
    }, []);
    return splitContent;
  },
  /**
   * 设置登录验证信息
   * @param {object} ctx - 服务端传入context 客户端传入this
   * @param {object} res - 登录验证信息
   */
  setAuthInfo(ctx, res) {
    let $cookies, $store;
    // 客户端
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store;
    }
    // 服务端
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }
    if ($cookies && $store) {
      // const expires = $store.state.auth.cookieMaxExpires;
      $cookies.set("userId", res.id || res.info.id);
      $cookies.set("token", res.token);
      $cookies.set("is_auth", res.is_auth || res.info.is_auth || "1");
      localStorage.setItem("userInfo", JSON.stringify(res));
      $store.commit("auth/UPDATE_USERINFO", res);
      $store.commit("auth/UPDATE_TOKEN", res.token);
      $store.commit("auth/UPDATE_USERID", res.id || res.info.id);
    }
  },
  async loginSuccess(res, that, cb) {
    that.$utils.setAuthInfo(that, res.data);
    let res2 = await that.$api.guest_user_info();
    if (res2.code === 0) {
      that.$utils.setAuthInfo(that, {
        ...res2.data,
        token: Cookies.get("token")
      });
    }
    that.$message.success(that.$t("components.loginModal.loginSuccess"), 3);
    cb && cb();
  },
  /**
   * 移除登录验证信息
   * @param {object} ctx - 服务端传入context 客户端传入this
   */
  removeAuthInfo(ctx, type) {
    let $cookies, $store;
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store || ctx.store;
    }
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }
    if ($cookies && $store) {
      $cookies.remove("userInfo");
      $cookies.remove("token");
      $cookies.remove("userId");
      localStorage.clear();
      $store.commit("auth/UPDATE_USERINFO", null);
      $store.commit("auth/UPDATE_TOKEN", "");
      $store.commit("auth/UPDATE_USERID", "");
    }
    setTimeout(() => {
      console.log("刷新");
      !type && location.reload();
    }, 100);
  }
};
