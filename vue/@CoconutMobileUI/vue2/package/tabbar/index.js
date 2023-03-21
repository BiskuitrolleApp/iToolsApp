import Tabbar from './src/tabbar'

/* istanbul ignore next */
Tabbar.install = function(Vue) {
  Vue.component(Tabbar.name, Tabbar)
}

export default Tabbar
