/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2021-08-01 14:44:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/plugins/api.js
 */
import config from "../utils/config";
export default ({ app: { $request } }, inject) => {
  inject("api", {
    // /**
    //  * 登录验证
    //  * @param {string} password - 密码
    //  * @param {string} phoneNumber - 手机号码
    //  */
    // loginAuth(data) {
    //   return $request.post("/v1/auth/login", data);
    // },

    linkedin(data) {
      return $request.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        data
      );
    },

    guest_front_oath_apple(data) {
      return $request.post("/guest/front/oath/apple", data);
    },
    front_order_business(data) {
      return $request.post("/front/order/business", data);
    },
    front_order_del(data) {
      return $request.post("/front/order/del", data);
    },
    front_order_deliverGoods(data) {
      return $request.post("/front/order/deliverGoods", data);
    },
    front_order_create(data) {
      return $request.post("/front/order/create", data);
    },
    front_order_business(data) {
      return $request.get("/front/order/business", data);
    },
    front_order_user(data) {
      return $request.get("/front/order/user", data);
    },

    front_goods_getlist(data) {
      return $request.get("/front/goods/getlist", data);
    },

    front_goods_edit(data) {
      return $request.post("/front/goods/edit", data);
    },
    front_goods_add(data) {
      return $request.post("/front/goods/add", data);
    },
    front_goods_del(data) {
      return $request.post("/front/goods/del", data);
    },

    front_statistics_index(data) {
      return $request.get("/front/statistics/index", data);
    },
    front_user_edit(data) {
      return $request.post("/front/user/edit", data);
    },
    front_qrcode_del(data) {
      return $request.post("/front/qrcode/del", data);
    },
    front_qrcode_add(data) {
      return $request.post("/front/qrcode/add", data);
    },
    front_qrcode_getlist(data) {
      return $request.get("/front/qrcode/getlist", data);
    },
    front_user_applyMerchants(data) {
      return $request.post("/front/user/applyMerchants", data);
    },

    guest_front_video_search(data) {
      return $request.get("/guest/front/video/search", data);
    },
    guest_front_oath_linkedin(data) {
      return $request.post("/guest/front/oath/linkedin", data);
    },
    upload_file(data) {
      return $request.post("/upload/file", data);
    },
    front_user_setHeadPortrait(data) {
      return $request.post("/front/user/setHeadPortrait", data);
    },

    front_integral_getlist(data) {
      return $request.get("/front/integral/getlist", data);
    },
    front_video_share(data) {
      return $request.post("/front/video/share", data);
    },
    front_video_addWatchAdInfo(data) {
      return $request.post("/front/video/addWatchAdInfo", data);
    },
    guest_front_login_sendCode(data) {
      return $request.post("/guest/front/login/sendCode", data);
    },
    guest_front_login_phone(data) {
      return $request.get("/guest/front/login/phone", data);
    },

    front_video_getCollectionVideo(data) {
      return $request.get("/front/video/getCollectionVideo", data);
    },
    front_user_getFollowList(data) {
      return $request.get("/front/user/getFollowList", data);
    },
    front_feedback_getlist(data) {
      return $request.get("/front/feedback/getlist", data);
    },
    front_feedback_add(data) {
      return $request.post("/front/feedback/add", data);
    },
    front_user_cancelFollow(data) {
      return $request.post("/front/user/cancelFollow", data);
    },
    front_user_follow(data) {
      return $request.post("/front/user/follow", data);
    },
    guest_front_oath_google(data) {
      return $request.post("/guest/front/oath/google", data);
    },
    guest_front_oath_facebook(data) {
      return $request.post("/guest/front/oath/facebook", data);
    },

    guest_front_login_username(data) {
      return $request.post("/guest/front/login/username", data);
    },
    front_video_add(data) {
      return $request.post("/front/video/add", data);
    },

    front_main_followVideo(data) {
      return $request.get("/front/main/followVideo", data);
    },
    front_main_recommendVideo(data) {
      return $request.get("/front/main/recommendVideo", data);
    },
    guest_OtherExt_getList(params) {
      return $request.get("/guest/OtherExt/getlist", params);
    },
    front_main_recommendUser(params) {
      return $request.get("/front/main/recommendUser", params);
    },
    guest_video_homeRecommendList(params) {
      return $request.get("/guest/video/homeRecommendList", params);
    },
    front_video_addReport(params) {
      return $request.post("/front/video/addReport", params);
    },
    front_comment_add(params) {
      return $request.post("/front/comment/add", params);
    },
    front_comment_getlist(params) {
      return $request.get("/front/comment/getlist", params);
    },

    front_tag_getlist(params) {
      return $request.get("/front/tag/getlist", params);
    },
    guest_user_info(params) {
      return $request.get("/guest/user/info", params);
    },
    front_video_getlist(params) {
      return $request.get("/front/video/getList", params);
    },
    front_video_pointList(params) {
      return $request.get("/front/video/pointList", params);
    },
    front_video_point(params) {
      return $request.post("/front/video/point", params);
    },
    front_video_cancelPoint(params) {
      return $request.post("/front/video/cancelPoint", params);
    },
    front_video_edit(params) {
      return $request.post("/front/video/edit", params);
    },
    front_video_delete(params) {
      return $request.post("/front/video/delete", params);
    },
    front_tag_editUser(params) {
      return $request.post("/front/tag/editUser", params);
    },
    front_live_getPushUrl(params) {
      return $request.get("/front/live/getPushUrl", params);
    },
    front_live_getPullUrl(params) {
      return $request.get("/front/live/getPullUrl", params);
    },

    // /**
    //  * 身份验证
    //  */
    isAuth() {
      return $request.get("/v1/auth/authentication");
    }
  });
};
