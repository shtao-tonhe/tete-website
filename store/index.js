/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2020-12-11 06:50:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/store/index.js
 */
import config from "@/utils/config";
export const state = () => ({
  isTopbarBlock: true, // 顶部栏是否显示
  userInfo: {},
  volumeStatus: 0,
  playStatus: false,
  showVideoModal: false,
  addressInfo: {},
  latlngInfo: {},
  foryouTitleObj: {}
});

export const mutations = {
  UPDATE_TOPBAR_BLOCK(state, payload) {
    state.isTopbarBlock = payload;
  },
  userInfo(state, object) {
    state.userInfo = object;
  },
  setVolumeStatus(state, type) {
    if (type === "hidden") {
      state.volumeStatus = 0;
    } else if (state.volumeStatus === 1) {
      state.volumeStatus = 0;
    } else {
      state.volumeStatus = 1;
    }
  },
  setPlayStatus(state, object) {
    state.playStatus = object;
  },
  setShowVideoModal(state, object) {
    state.showVideoModal = object;
  },
  setAddressInfo(state, object) {
    state.addressInfo = object;
  },
  setLatlngInfo(state, object) {
    state.latlngInfo = object;
  },
  setForyouTitleObj(state, object) {
    state.foryouTitleObj = object;
  }
};
