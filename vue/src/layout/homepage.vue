<!--
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-11-15 10:12:10
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-15 15:53:22
-->
<template>
  <div>
    <router-view></router-view>
    <!-- <van-tabbar v-model="active" style="z-index:10">
      <van-tabbar-item icon="wap-home">主页</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
}
</script>
