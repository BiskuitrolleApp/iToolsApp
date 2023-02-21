/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-11-15 10:12:10
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-11 16:05:29
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import bus from '@/libs/bus'
import Util from '@/assets/js/Util'
import { _loadLocalConfigAsync } from '@/assets/js/initLocalDirectory'

import GPS from '@/libs/GPS'
import './global.scss'
import '../coconutMobile/index'


import "../@CoconutMobileUI/vue2/package/theme/index.scss";
import cocoInstall from "../@CoconutMobileUI/vue2/index";

Vue.use(cocoInstall);

import {
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  NavBar,
  Field,
  Popup,
  Form,
  Picker,
  Icon,
  Popover,
  Switch,
  ShareSheet,
  Search,
  ActionSheet,
  DatetimePicker
} from 'vant'

Vue.use(DatetimePicker)
Vue.use(ActionSheet)
Vue.use(Tabbar)
Vue.use(Search)
Vue.use(TabbarItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Switch)
Vue.use(ShareSheet)

Vue.config.productionTip = false

window.$bus = bus
window.$Util = Util
window.$GPS = GPS

Vue.prototype.$bus = bus
Vue.prototype.$Util = Util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

_loadLocalConfigAsync()

// // 更新app
// function onFail() {
//   console.log("失败", JSON.stringify(arguments), arguments);
// }
// function onSuccess() {
//   console.log("成功", JSON.stringify(arguments), arguments);
// }
// document.addEventListener("deviceready", function() {
//   // window.AppUpdate.checkAppUpdate(
//   //   onSuccess,
//   //   onFail,
//   //   webConfig.appInfo.updateUrl
//   // );
// });
