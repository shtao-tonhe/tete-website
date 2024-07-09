/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2020-11-16 10:48:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/plugins/i18n.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: app.$cookies.get('lang') || 'en',
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en.json'),
      zh: require('~/locales/zh.json')
    }
  })
}
