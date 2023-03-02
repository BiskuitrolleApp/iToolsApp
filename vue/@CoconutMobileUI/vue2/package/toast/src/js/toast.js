import vue from 'vue'
import toastComponent from '../main.vue'

// 创建构造器
const toastConstructor = vue.extend(toastComponent)
let seed = 1
function toastCreator(toastObject = {}) {
  return new Promise((res, rej) => {
    const toastDom = new toastConstructor({
      el: document.createElement('div'),
      data() {
        return {
          visible: false,
          isComponent: false,
          toastContent: {
            content: '',
            iconName: '',
            duration: 2000,
            type:'none',
            ...toastObject
          }
        }
      },
      // methods: {
      //   confirmClick(...args) {
      //     console.log('click confirmClick2222')
      //     res(...args)
      //     this.closeDialogFunction()
      //   },
      //   cancelClick(...args) {
      //     rej(...args)
      //     this.closeDialogFunction()
      //   }
      // }
      mounted() {
        this.show()
      }
    })
    let toastDomId = 'coo-toast__' + seed++
    document.body.appendChild(toastDom.$el)
    toastDom.id = toastDomId
  })
}

function cooDialog() {
  window.$cooDialog = vue.prototype.$cooDialog = toastCreator
}

export default cooDialog
