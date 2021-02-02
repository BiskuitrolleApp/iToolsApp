import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
