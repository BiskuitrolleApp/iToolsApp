import Popup from './src/main'

/* istanbul ignore next */
Popup.install = function(Vue) {
  Vue.component(Popup.name, Popup)
}

export default Popup
