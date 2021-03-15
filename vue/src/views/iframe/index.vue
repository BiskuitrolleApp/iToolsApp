<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <!-- <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
        >
          <template #reference> -->
        <van-icon name="ellipsis" size="18" @click="openSharte" />
        <!-- </template> </van-popover> -->
      </template>
    </van-nav-bar>
    <iframe :src="src" width="100%" name="iframe名称" class="iframeBox" />
    <van-share-sheet
      v-model="showShare"
      title="更多"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      showShare: false,
      // showPopover: false,
      src: "https://kevinjiezheng.github.io/",
      actions: [{ text: "外部应用打开", value: "inappbrowser" }],
      options: [
        { name: "复制链接", icon: "link", value: "link" },
        {
          name: "其他浏览器打开",
          icon: "link",
          value: "browser"
        }
      ]
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
    },
    onSelect(action) {
      console.log("action :>> ", action);
      if (action.value === "browser") {
        cordova.InAppBrowser.open(this.src, "_system", "location=yes");
      }
    },
    openSharte() {
      this.showShare = true;
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
