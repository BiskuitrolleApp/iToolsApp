<template>
  <div class="coo-navbar" :class="[customClass]" :style="[customStyle]">
    <div class="coo-navbar__left" @click="clickLeft">
      <slot name="left">
        <coo-icon :name="leftIconName" size="24"></coo-icon>
        <div class="coo-navbar__left--title">
          {{ leftText }}
        </div>
      </slot>
    </div>
    <div class="coo-navbar__center">
      <slot name="title">
        <div>{{ title }}</div>
      </slot>
    </div>
    <div class="coo-navbar__right" @click="clickRight">
      <slot name="right">
        <div class="coo-navbar__right--title">
          {{ rightText }}
        </div>
        <coo-icon :name="rightIconName" size="20"></coo-icon>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CooNavbar',
  props: {
    title: {
      default: '',
      type: String
    },
    leftText: {
      default: '',
      type: String
    },
    rightText: {
      default: '',
      type: String
    },
    leftIcon: {
      default: true,
      type: [Boolean, String]
    },
    rightIcon: {
      default: true,
      type: [Boolean, String]
    }
  },
  data() {
    //这里存放数据
    return {}
  },
  //监听属性 类似于data概念
  computed: {
    // 是否是路由栈底
    // isRouterStackBottom() {
    //   return window.history.length <= 1
    // },
    leftIconName() {
      let name = ''
      if (window.history.length <= 1) {
        name = 'home-8-line'
      } else {
        name = 'arrow-left-s-line'
      }
      if (this.leftIcon) {
        name = typeof this.leftIcon === 'string' ? this.leftIcon : name
      } else {
        name = ''
      }
      return name
    },
    rightIconName() {
      let name = 'search-line'
      if (this.rightIcon) {
        name = typeof this.rightIcon === 'string' ? this.rightIcon : name
      } else {
        name = ''
      }
      return name
    }
  },
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    clickLeft(event) {
      this.$emit('click-left', event)
    },
    clickRight(event) {
      this.$emit('click-right', event)
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
