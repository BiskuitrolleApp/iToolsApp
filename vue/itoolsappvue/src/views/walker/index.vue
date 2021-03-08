<template>
  <div class="map">
    <van-nav-bar
      title="步行者"
      left-text="返回"
      right-text="设置"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
    />
    <map-view class="map" start="isStart"></map-view>
    <van-popup
      v-model="showPopup"
      round
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
      ><popup-form @visiblePopup="visiblePopup"></popup-form
    ></van-popup>
    <div>
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
      <van-button
        type="info"
        class="sideBtn reload"
        round
        @click="reloadMap"
        :disabled="showPause"
        >{{ getOnlineMapUrl.icon }}
      </van-button>
      <van-button
        icon="aim"
        type="info"
        class="sideBtn mesidebtn"
        round
        @click="panToMyPostion"
      >
      </van-button>
      <van-button
        icon="eye-o"
        type="info"
        class="sideBtn recall"
        round
        @click="recallMap"
      />
    </div>
  </div>
</template>
<script>
import mapView from "./mapView";
import popupForm from "./components/popupForm";
import { onlineDomUrl } from "@/config/mapConfig.js";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    mapView,
    popupForm
  },
  data() {
    return {
      mapIndex: 2,
      showPause: false,
      showStop: false,
      showPopup: false,
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
    ...mapGetters("map", ["getOnlineMapUrl", "getMapCurrentStatus"])
  },
  watch: {
    getMapCurrentStatus(newVal) {
      console.log("newVal :>> ", newVal);
      if (newVal == "start") {
        this.showPause = false;
        this.showStop = true;
      } else if (newVal == "pause") {
        this.showPause = true;
        this.showStop = true;
      } else {
        this.showPause = false;
        this.showStop = false;
      }
    }
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
      this.setWalkerStatus("pause");
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
      // console.log("panToMyPostion :>> ", window.$GPS);
      let data = await window.$GPS.getPosition();
      // console.log('panToMyPostion data :>> ', data);
      if (!data.longitude && !data.latitude) {
        this.currentPostion = [data.longitude, data.latitude];
      }
      this.$bus.$emit("panTo", this.currentPostion);
    },
    beforeDestroy() {
      console.log("stop :>> ");
      this.setWalkerStatus("stop");
    },
    //右边设置按钮
    onClickRight() {
      this.showPopup = true;
    },
    visiblePopup(value) {
      this.showPopup = value;
    },
    recallMap() {}
  }
};
</script>
<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
  .recall {
    top: 220px;
  }
}
</style>
