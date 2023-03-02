import Overlay from './src/main'

/* istanbul ignore next */
Overlay.install = function (Vue) {
  Vue.component(Overlay.name, Overlay)
}

export default Overlay
