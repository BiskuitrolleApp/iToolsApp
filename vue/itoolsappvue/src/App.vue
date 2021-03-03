<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
.van-popup-block__title {
  margin: 0;
  padding: 32px 16px 16px;
  color: #323233;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
}
</style>
