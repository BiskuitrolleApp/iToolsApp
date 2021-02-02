<template>
  <div class="videoframe">
    <van-nav-bar
      title="视频解析"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="videoForm">
      <van-field
        v-model="address"
        name="地址"
        label="地址"
        placeholder="地址"
        style="margin:10px 0px"
      />
      <van-button type="info" block @click="openAddress" round>解析</van-button>
      <van-button
        icon="plus"
        type="info"
        class="plusBtn"
        style="width:40px;height:40px;"
        round
        @click="addAddress"
      />
    </div>
    <van-popup
      v-model="showPopup"
      round
      :lock-scroll="true"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-nav-bar title="添加新链接" />
      <div style="width:90%;margin:0 auto">
        <van-field
          v-model="newAddress"
          name="新地址"
          label="新地址"
          placeholder="新地址"
          style="margin:10px 0px"
        />
        <van-button type="info" block @click="openAddress" round
          >解析</van-button
        >
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: "https://www.baidu.com",
      showPopup: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    openAddress() {},
    addAddress() {
      this.showPopup = !this.showPopup;
    }
  }
};
</script>
<style lang="scss" scoped>
.videoframe {
  height: 100vh;
  width: 100vw;
  .videoForm {
    height: calc(100vh - 60px);
    width: 90vw;
    margin: 0 auto;
  }
  .plusBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>
