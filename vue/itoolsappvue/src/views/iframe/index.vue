<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <iframe :src="src" width="100%" name="iframe名称" class="iframeBox" />
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      src: "https://kevinjiezheng.github.io/"
    };
  },
  mounted() {
    if (!_.isNil(this.$route.query) && !_.isNil(this.$route.query.url)) {
      let url = this.$route.query.url;
      if (url != "") this.src = url;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.iframeBox {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
