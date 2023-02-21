# 引入

```javascript
// 全部引入
// main.js文件中调用
import 'coconutMobile/index'

// 部分引入
// 引入css文件
import 'coconutMobile/package/theme/index.scss'
// 再引入组件
import { CooTabbar, CooButton } from 'coconutMobile/package/index'
// 再vue 装载组件
Vue.use(CooButton)
Vue.use(CooTabbar)
```

# 全局方法
## dialog
```
 this.$cooDialog({ title: '标题', content: '内容' }).then(() => {
    console.log('objecontentct :>> ')
  }).catch(() => {
    console.log('objecontentct 2:>> ')
  })
