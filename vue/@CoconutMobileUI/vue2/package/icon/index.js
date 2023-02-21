import Icon from './src/main'
// 使用 vue-awesome 支持icon库，后面可以更新自定义icon库 
import 'vue-awesome/icons'

/* istanbul ignore next */
Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon)
}

export default Icon
