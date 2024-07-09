/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2020-10-27 13:17:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/store/locale.js
 */
export const state = () => ({
  locales: ['zh', 'en'],
  locale: 'en'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
