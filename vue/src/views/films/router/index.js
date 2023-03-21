import defaultLayer from '@/layout/default.vue'
import index from '../index.vue'

const demoComponents = {
  component: defaultLayer,
  children: [{ path: '/', component: index }]
}

export default demoComponents
