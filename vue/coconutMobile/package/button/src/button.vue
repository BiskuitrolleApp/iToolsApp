<!--
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-24 10:07:14
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-11 14:37:33
-->
<template>
  <button
    class="coo-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :type="nativeType"
    :class="[
      type ? 'coo-button--' + type : '',
      buttonSize ? 'coo-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <span v-if="$slots.default" class="coo-button--text"><slot></slot></span>
  </button>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'CooButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
  },
  //监听属性 类似于data概念
  computed: {
    buttonDisabled() {
      return this.disabled
    },
    buttonSize() {
      return this.size
    },
  },
  //方法集合
  methods: {
    handleClick(evt) {
      if (this.disabled) {
        return
      }
      this.$emit('click', evt)
    },
  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>