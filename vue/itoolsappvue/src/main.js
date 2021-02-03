import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";
import bus from "@/libs/bus";

import GPS from "@/libs/GPS";

import {
  Button,
  Tabbar,
  Toast,
  TabbarItem,
  Cell,
  CellGroup,
  NavBar,
  Field,
  Popup
} from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
Vue.use(Popup);

Vue.config.productionTip = false;

Vue.prototype.$bus = bus;
window.$bus = bus;

window.$GPS = GPS;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

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
