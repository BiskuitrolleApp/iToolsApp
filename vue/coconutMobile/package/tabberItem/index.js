/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2022-04-11 14:35:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-15 16:07:30
 */
import TabberItem from '../tabbar/src/tabberItem'

/* istanbul ignore next */
TabberItem.install = function (Vue) {
  Vue.component(TabberItem.name, TabberItem)
}

export default TabberItem
