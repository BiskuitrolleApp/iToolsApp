/*
 * @Descripttion:
 * @version:
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:07
 * @LastEditors: kevinzheng
 * @LastEditTime: 2021-08-19 17:15:54
 */
import Navbar from './src/main'

/* istanbul ignore next */
Navbar.install = function(Vue) {
  Vue.component(Navbar.name, Navbar)
}

export default Navbar
