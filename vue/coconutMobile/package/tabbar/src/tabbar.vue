<!--
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:22
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-05-05 15:44:53
-->
<template>
  <div class="coo-tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'coo-tabbar',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    active: {
      type: String,
      default: '',
    },
  },
  provide() {
    return {
      rootMenu: this,
    }
  },
  data() {
    return {
      tabberActive:this.active,
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    tabberActive(newVal) {
      this.$emit('change', newVal)
    },
  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>