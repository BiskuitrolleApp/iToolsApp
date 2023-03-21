<template>
  <div
    class="coo-tag"
    :class="[
      type ? 'coo-tag--' + type : '',
      size ? 'coo-tag--' + size : '',
      {
        'is-plain': plain,
        'is-round': round
      },
      customClass
    ]"
    :style="[
      {
        color: color,
        ...getBgColorStyle
      },
      customStyle
    ]"
  >
    <slot>
      {{ value }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CooTag',
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    plain: Boolean,
    round: Boolean
  },
  data() {
    //这里存放数据
    return {}
  },
  //监听属性 类似于data概念
  computed: {
    getBgColorStyle() {
      let style = {}
      if (this.bgColor) {
        style['border-color'] = this.bgColor
        if (!this.plain) {
          style['background'] = this.bgColor
        }
      }
      return style
    }
  },
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
