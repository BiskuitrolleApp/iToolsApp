import defaultLayer from '@/layout/default.vue'
import index from '../index.vue'
import navbar from '../navbar.vue'
import toast from '../toast.vue'
import icon from '../icon.vue'
import popup from '../popup.vue'
import tag from '../tag.vue'
import cell from '../cell.vue'

const demoComponents = {
  component: defaultLayer,
  children: [
    { path: '/', component: index },
    { path: 'navbar', component: navbar },
    { path: 'icon', component: icon },
    { path: 'toast', component: toast },
    { path: 'tag', component: tag },
    { path: 'cell', component: cell },
    { path: 'popup', component: popup }
  ]
}

export default demoComponents
