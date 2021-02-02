<template>
  <div class="map">
    <van-nav-bar
      title="步行者"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <map-view class="map" start="isStart"></map-view>
    <div>
      <van-button
        :icon="isStart ? 'pause-circle-o' : 'play-circle-o'"
        type="info"
        class="startBtn"
        round
        @click="startWalker"
      />
    </div>
  </div>
</template>
<script>
import mapView from "./mapView";
export default {
  components: {
    mapView
  },
  data() {
    return {
      isStart: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    startWalker() {
      this.isStart = !this.isStart;
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
  .startBtn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    z-index: 999;
    font-size: 40px;
  }
}
</style>
