/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2020-11-08 08:32:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/store/auth.js
 */
export const state = () => ({
  cookieMaxExpires: new Date(Date.now() + 8.64e7 * 365 * 10), // cookies 过期时间
  userInfo: null, // 登录用户信息
  userId: "",
  token: ""
});

export const mutations = {
  UPDATE_USERINFO(state, payload) {
    state.userInfo = payload;
  },
  UPDATE_USERID(state, payload) {
    state.userId = payload;
  },

  UPDATE_TOKEN(state, payload) {
    state.token = payload;
  }
};
