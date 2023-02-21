<template>
  <div class="coo-tabbar" :class="[{ 'is-safetyArea': safetyArea }, customClass]" :style="[customStyle]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "coo-tabbar",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    active: {
      type: String,
      default: "",
    },
    safetyArea: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      rootMenu: this,
    };
  },
  data() {
    return {
      tabberActive: this.active,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    tabberActive(newVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
