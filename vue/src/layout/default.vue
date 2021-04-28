<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" style="z-index:10">
      <van-tabbar-item icon="wap-home">主页</van-tabbar-item>
      <!-- <van-tabbar-item icon="friends">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
