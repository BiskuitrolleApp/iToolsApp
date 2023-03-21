<template>
  <div class="coo-cell" :class="[customClass]" :style="[customStyle]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CooCell'
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
