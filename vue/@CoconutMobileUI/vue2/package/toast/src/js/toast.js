import vue from 'vue'
import toastComponent from '../main.vue'

/**
 * 手动关闭toast
 * @param {*} id toast id
 */
function toastCleaner(id = 'cooToastWrapper') {
  let toastDomId = id || 'cooToastWrapper'
  let toastElement = document.getElementById(toastDomId)
  if (toastElement) {
    toastElement.remove()
  }
}

// 创建构造器
const toastConstructor = vue.extend(toastComponent)
/**
 * 构造器创建toast
 * @param {*} toastObject toast对象
 * @returns
 */
function toastCreator(toastObject = {}) {
  // 关闭toast
  let toastDomId = toastObject.id || 'cooToastWrapper'
  toastCleaner(toastDomId)
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
            type: 'none',
            ...toastObject
          }
        }
      },
      mounted() {
        this.visible = true
      }
    })
    document.body.appendChild(toastDom.$el)
    toastDom.$el.id = toastDomId
    res(toastDomId)
  })
}

function cooToast() {
  window.$cooToast = vue.prototype.$cooToast = toastCreator
  window.$cooToastHide = vue.prototype.$cooToastHide = toastCleaner
}

export default cooToast
