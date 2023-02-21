/*
 * @Descripttion:
 * @version:
 * @Author: kevinzheng
 * @Date: 2022-04-11 14:35:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-08-08 16:46:17
 */
import TabberItem from "../tabbar/src/tabberItem.vue";

/* istanbul ignore next */
TabberItem.install = function (Vue: any) {
  Vue.component(TabberItem.name, TabberItem);
};

export default TabberItem;
