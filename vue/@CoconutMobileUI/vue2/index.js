import Vue from 'vue'

import './package/theme/index.scss'
// import * as componentPackags from './package/install'
import componentPackags from './package/install'
import cooDialog from './package/dialog/src/js/dialog'

import mixin from './common/mixins/index.js'
Vue.mixin(mixin)

for (const key in componentPackags) {
  Vue.use(componentPackags[key])
}
Vue.use(cooDialog)
