/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:07
 * @LastEditors: kevinzheng
 * @LastEditTime: 2021-08-19 17:15:54
 */
import Select from './src/main';

/* istanbul ignore next */
Select.install = function(Vue) {
  Vue.component(Select.name, Select);
};

export default Select;
