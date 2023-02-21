/*
 * @Descripttion:
 * @version:
 * @Author: kevinzheng
 * @Date: 2022-04-11 14:35:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-08-08 16:46:44
 */
import Transfer from "./src/transfer.vue";

/* istanbul ignore next */
Transfer.install = function (Vue: any) {
  Vue.component(Transfer.name, Transfer);
};

export default Transfer;
