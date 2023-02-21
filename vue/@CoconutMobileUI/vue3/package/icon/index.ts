// import mixin from "/common/mixins/index";
import mixin from "../../common/mixins/index";
import Icon from "./src/main.vue";
// import * as ElIconModules from "@element-plus/icons-vue";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// const hasOwnProperty = Object.prototype.hasOwnProperty;
// const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key);

// function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
//   return key in object;
// }

/* istanbul ignore next */
Icon.install = function (Vue: any) {
  // Object.keys(ElIconModules).forEach(function (key) {
  //   if (hasOwn(ElIconModules, key)) {
  //     console.log("ElIconModules[key]", ElIconModules[key]);
  //     // Vue.component(ElIconModules[key].name, ElIconModules[key]);
  //   }
  // });
  // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //   Vue.component(key, component);
  // }
  Vue.mixin(mixin);
  Vue.component(Icon.name, Icon);
};

export default Icon;
