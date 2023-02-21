/*
 * @Descripttion:
 * @version:
 * @Author: kevinzheng
 * @Date: 2022-04-11 14:35:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-08-08 16:42:34
 */
import Tabbar from "./src/tabbar.vue";

/* istanbul ignore next */
Tabbar.install = function (Vue: any) {
  Vue.component(Tabbar.name, Tabbar);
};

export default Tabbar;
