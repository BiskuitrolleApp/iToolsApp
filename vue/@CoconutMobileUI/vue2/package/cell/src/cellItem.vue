<template>
  <div class="coo-cellItem" :class="[customClass]" :style="[customStyle]">
    <div class="coo-cellItem__left" @click="clickValue('left')">
      <slot name="left"></slot>
      <div class="coo-cellItem__right--icon" v-if="leftIcon">
        <coo-icon :name="leftIcon" :size="24"></coo-icon>
      </div>
      <div class="coo-cellItem__main">
        <div class="coo-cellItem__main--label">
          <slot name="label">
            <span>{{ label }}</span>
          </slot>
        </div>
        <div class="coo-cellItem__main--description">
          <slot> </slot>
        </div>
      </div>
    </div>
    <div class="coo-cellItem__right" @click="clickValue('right')">
      <div class="coo-cellItem__right--value">
        <slot name="value">
          <span>{{ value }}</span>
        </slot>
      </div>
      <div class="coo-cellItem__right--icon" v-if="rightIcon">
        <coo-icon :name="rightIcon" :size="24"></coo-icon>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CooCellItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: [String, Boolean],
      default: false
    },
    rightIcon: {
      type: [String, Boolean],
      default: 'arrow-right-s-line'
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    clickValue(value) {
      this.$emit('click', value)
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
