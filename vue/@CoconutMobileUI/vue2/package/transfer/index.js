/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2022-04-11 14:35:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-05-08 13:14:58
 */
import Transfer from './src/main'

/* istanbul ignore next */
Transfer.install = function(Vue) {
  Vue.component(Transfer.name, Transfer)
}

export default Transfer
