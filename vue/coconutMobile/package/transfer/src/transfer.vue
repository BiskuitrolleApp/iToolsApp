<!--
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:22
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-05-08 13:16:23
-->
<template>
  <div class="coo-transfer" :class="[name ? 'coo-' + name + '--' + type : '']">
    {{ name }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'coo-transfer',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'in',
    },
  },
  data() {
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>