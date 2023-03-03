<template>
  <div
    class="coo-transfer"
    :class="[
      name ? 'coo-' + name + '--' + type : '',
      {
        'is-slow': durationType == 'slow',
        'is-fast': durationType == 'fast'
      },
      customClass
    ]"
    :style="[durationStyle, customStyle]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CooTransfer',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    name: {
      type: String,
      default: 'fade'
    },
    type: {
      type: String,
      default: 'in'
    },
    // 毫秒速度，slow，fast，normal三个值
    duration: {
      type: [Number, String],
      default: 'normal'
    }
  },
  data() {
    return {}
  },
  //监听属性 类似于data概念
  computed: {
    durationType() {
      let typeList = ['slow', 'fast', 'normal']
      if (typeList.indexOf(this.duration) >= 0) {
        return this.duration
      } else {
        return 'normal'
      }
    },
    durationStyle() {
      if (typeof this.duration == 'number') {
        console.log('durationStyle', this.duration)
        return {
          '-webkit-animation-duration': this.duration + 'ms',
          'animation-duration': this.duration + 'ms'
        }
      } else {
        return {}
      }
    }
  },
  //监控data中的数据变化
  watch: {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
