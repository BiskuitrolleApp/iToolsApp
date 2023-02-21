<template>
  <!-- <i :class="name" class="iconfont"></i> -->
  <Icon :name="name" :title="title" :scale="scale" :spin="spin" :inverse="inverse" :flip="flip" :label="label" />
</template>

<script>
import Icon from "vue-awesome/components/Icon";
export default {
  components: {
    Icon,
  },
  name: "coo-icon",
  //   ### Props
  // * `name: string`
  //   图标名称。如果本组件没有用作图标堆栈的容器，那么这个字段是必须的。所有合法的值都对应于图标文件相对于 `icons` 目录的路径。请注意当你在 FontAwesome 官网查找到图标名词后，需要确认一下图标集的名称。比如，在 [`500px` 这个图标的详情页](https://fontawesome.com/icons/500px?style=brands)会有一个 URL 参数 `style=brands`，故图标名称就是 `brands/500px`。
  //   默认情况下，只能使用 FontAwesome 的免费图标，另外由于 `solid` 样式中的图标最多，我们将其设为了默认图标集，所以路径前缀可以省略。
  //   当传入 `null` 时，整个组件将不会渲染。
  // * `scale: number|string`
  //   用来调整图标尺寸，默认值为 `1`。
  // * `spin: boolean`
  //   用来指定图标是否需要旋转。默认值为 `false`。（不能与 `pulse` 一同使用。）
  // * `pulse: boolean`
  //   用来指定图标是否有脉冲旋转的效果。默认值为 `false`。（不能与 `spin` 一同使用。）
  // * `inverse: boolean`
  //   为 `true` 时图标颜色将被设置为 `#fff`。默认值为 `false`。
  // * `flip: 'vertical'|'horizontal'|'both'`
  //   用来指定图标是否需要翻转。
  // * `label: string`
  //   当指定时会设置图标的 `aria-label`。
  // * `title: string`
  //   为图标设置标题。
  // >  当 `label` 与 `title` 均不存在时，图标将会包含 `role="presentation"` 声明，无法从辅助设备访问。

  props: {
    name: {
      type: String,
    },
    title: String,
    scale: [Number, String],
    spin: Boolean,
    inverse: Boolean,
    pulse: Boolean,
    flip: {
      validator(val) {
        return val === "horizontal" || val === "vertical" || val === "both";
      },
    },
    label: String,
  },
};
</script>
