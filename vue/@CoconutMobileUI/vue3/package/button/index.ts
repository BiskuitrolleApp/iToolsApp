import Button from "./src/button.vue";
/* istanbul ignore next */
Button.install = function (Vue: any) {
  Vue.component(Button.name, Button);
};
export default Button;
