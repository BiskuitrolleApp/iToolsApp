/*
 * @Descripttion: 遮罩组件
 * @version:
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:07
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-08-08 16:47:02
 */
import Overlay from "./src/index.vue";

/* istanbul ignore next */
Overlay.install = function (Vue: any) {
  Vue.component(Overlay.name, Overlay);
};

export default Overlay;
