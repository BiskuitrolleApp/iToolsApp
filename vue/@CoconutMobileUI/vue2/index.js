/*
 * @Descripttion:
 * @version:
 * @Author: kevinzheng
 * @Date: 2021-10-08 14:32:11
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-06-06 09:56:17
 */
import Vue from "vue";
import {
  CooTabbar,
  CooButton,
  CooTabberItem,
  CooIcon,
  CooTransfer,
  CooDialog,
  CooOverlay
} from "./package/index";
import "./package/theme/index.scss";

import cooDialog from "./package/dialog/src/js/dialog";
Vue.use(cooDialog);

Vue.use(CooButton);
Vue.use(CooTabbar);
Vue.use(CooTabberItem);
Vue.use(CooIcon);
Vue.use(CooTransfer);
Vue.use(CooDialog);
Vue.use(CooOverlay);
