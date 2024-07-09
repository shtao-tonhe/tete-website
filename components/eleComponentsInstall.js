/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2020-10-18 20:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/components/eleComponentsInstall.js
 */
import { Input, Button, Select, Message } from 'ant-design-vue'

export default {
  install(Vue) {
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Button)
    Vue.prototype.$message = Message
  }
}
