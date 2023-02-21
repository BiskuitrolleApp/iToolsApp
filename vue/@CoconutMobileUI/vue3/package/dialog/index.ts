/*
 * @Descripttion: 弹出框提示组件
 * @version:
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:07
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-08-08 16:42:08
 */
import Dialog from "./src/index.vue";

/* istanbul ignore next */
Dialog.install = function (Vue: any) {
  Vue.component(Dialog.name, Dialog);
};

export default Dialog;
