/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2022-04-11 14:35:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-11 17:37:56
 */
import Tabbar from './src/tabbar'

/* istanbul ignore next */
Tabbar.install = function(Vue) {
  Vue.component(Tabbar.name, Tabbar)
}

export default Tabbar
