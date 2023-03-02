import index from '@/views/demoComponents/index.vue'
import navbar from '@/views/demoComponents/navbar.vue'
import toast from '@/views/demoComponents/toast.vue'
import icon from '@/views/demoComponents/icon.vue'

const demoComponents = [
  { path: '/', component: index },
  { path: 'navbar', component: navbar },
  { path: 'icon', component: icon },
  { path: 'toast', component: toast }
]

export default demoComponents
