<!--
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2022-04-11 15:58:54
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-15 17:00:47
-->
<template>
  <i :class="name" class="iconfont"></i>
</template>

<script>
export default {
  name: 'coo-icon',
  props: {
    name: String,
  },
}
</script>