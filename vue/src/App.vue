<template>
  <div id="app" class="normalcontent">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import "./global.scss";
* {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Moon, QingNingYouYuan, Avenir, Helvetica, Arial, sans-serif;
  color: $fontColor;
}

.van-popup-block__title {
  margin: 0;
  padding: 32px 16px 16px;
  color: #323233;
  line-height: 20px;
}
</style>
