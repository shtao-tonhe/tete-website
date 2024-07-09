/*
 * @Author: your name
 * @Date: 2020-10-17 14:40:18
 * @LastEditTime: 2020-10-18 17:58:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/plugins/localStorage.js
 */
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

let cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key);
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, { expires: 3, secure: false });
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};

export default context => {
  createPersistedState({
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem
  })(context.store);
};
