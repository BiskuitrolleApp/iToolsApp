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
      <!-- <van-button
        :icon="isStart ? 'pause-circle-o' : 'play-circle-o'"
        type="info"
        class="bottmBtn startBtn"
        round
        @click="startWalker"
      /> -->
      <van-button
        icon="play-circle-o"
        v-if="!showPause"
        type="info"
        class="bottmBtn startBtn"
        round
        @click="pauseWalker"
      /><van-button
        icon="pause-circle-o"
        v-if="showPause"
        type="info"
        class="bottmBtn pauseBtn"
        round
        @click="startWalker"
      />
      <van-button
        icon="stop-circle-o"
        type="danger"
        v-if="showStop"
        class="bottmBtn endBtn"
        round
        @click="endWalker"
      />
    </div>
    <div>
      <van-button type="info" class="sideBtn reload" round @click="reloadMap"
        >{{ getOnlineMapUrl.icon }}
      </van-button>
      <van-button
        icon="aim"
        type="info"
        class="sideBtn mesidebtn"
        round
        @click="panToMyPostion"
      />
    </div>
  </div>
</template>
<script>
import mapView from "./mapView";
import { onlineDomUrl } from "@/assets/js/config";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    mapView
  },
  data() {
    return {
      mapIndex: 2,
      showPause: false,
      showStop: false,
      currentPostion: [113.32053, 23.12504]
    };
  },
  async mounted() {
    this.setWalkerStatus("stop");
    let data = await window.$GPS.getPosition();
    console.log("当前地址 :>> ", data);
    this.currentPostion = [data.longitude, data.latitude];
    this.setCurrentPostion(this.currentPostion);
  },
  computed: {
    ...mapGetters("map", ["getOnlineMapUrl"])
  },
  methods: {
    ...mapActions("map", ["setCurrMapUrl", "setWalkerStatus"]),
    ...mapMutations("map", ["setCurrentPostion"]),
    onClickLeft() {
      this.$router.back(-1);
      this.setWalkerStatus("stop");
    },
    //暂停行走
    pauseWalker() {
      this.showPause = false;
      this.setWalkerStatus("start");
    },
    //开始行走
    async startWalker() {
      this.showPause = true;
      this.showStop = true;
      let data = await window.$GPS.getPosition();
      this.currentPostion = [data.longitude, data.latitude];
      this.setWalkerStatus("start");
    },
    //结束行走
    endWalker() {
      this.showPause = false;
      this.showStop = false;
      this.setWalkerStatus("end");
    },
    reloadMap() {
      this.mapIndex++;
      if (this.mapIndex >= onlineDomUrl.length) {
        this.mapIndex = 0;
      }
      // console.log("this.mapIndex :>> ", this.mapIndex);
      this.setCurrMapUrl(onlineDomUrl[this.mapIndex]);
      // this.$bus.$emit("reloadMap", onlineDomUrl[this.mapIndex]);
    },
    async panToMyPostion() {
      let data = await window.$GPS.getPosition();
      if (!data.longitude && !data.latitude) {
        this.currentPostion = [data.longitude, data.latitude];
      }
      this.$bus.$emit("panTo", this.currentPostion);
    },
    beforeDestroy() {
      console.log("stop :>> ");
      this.setWalkerStatus("stop");
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
  .bottmBtn {
    position: fixed;
    bottom: 40px;
    left: 50%;
    width: 60px;
    height: 60px;
    z-index: 999;
    font-size: 60px;
  }
  .startBtn {
    margin-left: -30px;
  }
  .pauseBtn {
    margin-left: -30px;
  }
  .endBtn {
    margin-left: 60px;
  }
  .sideBtn {
    position: fixed;
    right: 10px;
    width: 40px;
    height: 40px;
    z-index: 999;
    font-size: 20px;
  }
  .reload {
    top: 100px;
  }
  .mesidebtn {
    top: 160px;
  }
}
</style>
