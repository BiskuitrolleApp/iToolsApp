import { toTopStep } from '@/config/animationConfig.js'

function pageToTopFuntion() {
  // 动画
  let currentTop = document.documentElement.scrollTop || document.body.scrollTop
  let timer = setInterval(function() {
    let osTop = document.documentElement.scrollTop || document.body.scrollTop
    let ispeed = Math.floor(-osTop / 5)
    if (currentTop != osTop) {
      //被滚动了，取消置顶操作
      clearInterval(timer)
    }
    currentTop = osTop + ispeed
    document.documentElement.scrollTop = document.body.scrollTop = currentTop
    if (osTop === 0) {
      clearInterval(timer)
    }
  }, toTopStep)
}

export { pageToTopFuntion }
