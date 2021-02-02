<template>
  <div class="homepage">
    <van-nav-bar title="主页" />
    <div v-for="(lItem, lIndex) in views" :key="lIndex">
      <div>
        <h2 class="home_lable">{{ lItem.title }}</h2>
      </div>
      <span v-for="(pItem, pIndex) in lItem.list" :key="pIndex">
        <card
          :title="pItem.title"
          :subtitle="pItem.subTitle"
          :bg="pItem.bgi"
          :disabled="pItem.disabled"
          @click.native="jumbToUrl(pItem)"
        ></card>
      </span>
    </div>
  </div>
</template>
<script>
import card from "@/components/card";
import { views } from "@/assets/js/pageList.js";

export default {
  components: {
    card
  },
  data() {
    return {
      active: 0,
      views
    };
  },
  methods: {
    jumbToUrl(pageInfo) {
      if (pageInfo.disabled) {
        this.$toast("当前地址无法进入");
        return;
      }
      this.$router.push(pageInfo.page);
      // window.location.href = "http://www.baidu.com";
    }
  }
};
</script>
<style lang="scss" scoped>
.homepage {
  width: 100vw;
  height: calc(100vh + 120px);
  // background: #ccc;
}
.home_lable {
  width: 80vw;
  padding: 10px 30px 0px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
</style>
