/*
 * @Descripttion: 弹出框提示组件
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:07
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-05-08 13:46:10
 */
import Dialog from './src/index'

/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog)
}

export default Dialog
