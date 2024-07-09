/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2020-12-01 21:05:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/plugins/vue-global.js
 */
import Vue from 'vue'
import myComponentsInstall from '~/components/myComponentsInstall'
// import eleComponentsInstall from '~/components/eleComponentsInstall'
import loginModal from '~/components/common/loginModal.js'
import searchBox from '~/components/common/searchBox.js'
import picturesModal from '~/components/common/picturesModal'
// import '~/assets/scss/element-variables.scss' // elementUI 自定义主题色
import utils from '~/utils/utils'
Vue.use(searchBox)
Vue.use(loginModal)
Vue.use(picturesModal)
Vue.use(myComponentsInstall)
// Vue.use(eleComponentsInstall)

Vue.filter('formatTime', d => utils.formatTime(d))

export default function (context, inject) {
  inject('utils', utils)
}
