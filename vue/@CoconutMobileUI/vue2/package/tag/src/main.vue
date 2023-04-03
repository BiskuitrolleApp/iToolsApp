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
    <div class="coo-tag__closeWrapper" v-if="closeable" @click="closeableClick">
      <coo-icon name="close-line" :size="20"></coo-icon>
    </div>
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
    closeable: Boolean,
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
  //方法集合
  methods: {
    closeableClick() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
