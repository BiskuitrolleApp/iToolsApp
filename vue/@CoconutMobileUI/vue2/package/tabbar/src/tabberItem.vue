<template>
  <div
    class="coo-tabbarItem"
    :name="name"
    :class="{ 'is-active': activekey == name }"
    @click.stop="toggleActiveTabber"
  >
    <div class="coo-tabbarItem__icon">
      <coo-icon v-if="!$slots.icon" :name="icon"></coo-icon>
      <slot name="icon" v-else></slot>
    </div>
    <div class="coo-tabbarItem__text">
      <slot name="text" v-if="$slots.text"></slot>
      <span v-else-if="text != ''">{{ text }}</span>
      <slot v-else-if="$slots.default"></slot>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CooTabbarItem',
  inject: ['rootMenu'],
  props: {
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  mounted() {},
  methods: {
    toggleActiveTabber() {
      this.rootMenu.tabberActive = this.name || ''
    },
  },
  //监听属性 类似于data概念
  computed: {
    activekey() {
      let activekey = this.rootMenu.tabberActive || ''
      return activekey
    },
  },
  //监控data中的数据变化
  watch: {},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>