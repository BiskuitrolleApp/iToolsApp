/*
 * @Descripttion: 遮罩组件
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:07
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-05-20 14:01:20
 */
import Overlay from './src/index'

/* istanbul ignore next */
Overlay.install = function (Vue) {
  Vue.component(Overlay.name, Overlay)
}

export default Overlay
