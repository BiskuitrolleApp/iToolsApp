import mixin from "./common/mixins/index";
import CooButton from "./package/button/index";
import CooTabbar from "./package/tabbar/index";
import CooTabberItem from "./package/tabberItem/index";
import CooIcon from "./package/icon/index";
import CooTransfer from "./package/transfer/index";
import CooDialog from "./package/dialog/index";
import CooOverlay from "./package/overlay/index";

const components = [CooButton, CooTabbar, CooTabberItem, CooIcon, CooTransfer, CooDialog, CooOverlay];
const install = function (app: any) {
  components.map((component) => app.component(component.name, component));
  app.mixin(mixin);
};
export { CooButton, CooTabbar, CooTabberItem, CooIcon, CooTransfer, CooDialog, CooOverlay };
export default {
  install,
};

// export { CooButton, CooTabbar, CooTabberItem, CooIcon, CooTransfer, CooDialog,CooOverlay }
