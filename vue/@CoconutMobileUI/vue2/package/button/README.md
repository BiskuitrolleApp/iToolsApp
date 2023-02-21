# CooButton

描述：按钮主键

## 使用

```javascript
// index.js
import { CooButton } from './package/index'
Vue.use(CooButton)
```

```vue
// index.vue
<coo-button>CooButton</coo-button>
```

## attributes

| 参数       | 说明         | 数据类型 | 可选值                                           | 默认值  |
| ---------- | ------------ | -------- | ------------------------------------------------ | ------- |
| type       | 类型         | String   | default, primary, success, warning, danger, info | default |
| size       | 按钮大小     | String   | large, medium, small                             | -       |
| nativeType | 按钮原生类型 | String   | -                                                | button  |
| loading    | 加载中       | Boolean  | -                                                | -       |
| disabled   | 是否禁用     | Boolean  | -                                                | -       |
| plain      | 朴素按钮     | Boolean  | -                                                | -       |
| round      | 椭圆按钮     | Boolean  | -                                                | -       |

## 插槽

```vue
// 支持插槽，是用默认插槽
<coo-button type="primary">
  <div>test</div>
</coo-button>
```





