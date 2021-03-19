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
      v-model="showSetPopup"
      round
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
      ><popup-form @visiblePopup="visiblePopup"></popup-form
    ></van-popup>

    <van-action-sheet v-model="showRcallPopup" title="标题">
      <div class="timeFormContent">
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="timeForm.start"
          label="开始时间"
          placeholder="点击选择时间"
          @click="openTimePopup('start')"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="timeForm.end"
          label="结束时间"
          placeholder="点击选择时间"
          @click="openTimePopup('end')"
        />
        <van-button
          block
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          size="small"
          class="timeFormBtn"
          @click="clickTimeForm"
          round
        >
          确认范围
        </van-button>
      </div>
    </van-action-sheet>
    <van-popup
      v-model="showTimePopup"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择完整时间"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelTimePicker"
        @confirm="confirmTimePicker"
    /></van-popup>
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
import api from "@/libs/api";

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
      showSetPopup: false,
      showRcallPopup: false,
      showTimePopup: false,
      currentPostion: [113.32053, 23.12504],
      timeForm: {
        timeSelect: "",
        start: "",
        end: ""
      },
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2200, 10, 1),
      currentDate: new Date(),
      filterList: []
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
      this.showSetPopup = true;
    },
    visiblePopup(value) {
      this.showSetPopup = value;
    },
    //打开回放数据
    recallMap() {
      this.showRcallPopup = true;
      this.timeForm.start = "";
      this.timeForm.end = "";
    },
    //取消日期选择器
    cancelTimePicker() {
      this.showTimePopup = false;
    },
    //打开日期选择器
    openTimePopup(state) {
      this.showTimePopup = true;
      this.timeForm.timeSelect = state;
    },
    //确定日期选择器数据
    confirmTimePicker(e) {
      this.currentDate = e;
      let date = this.curentTime(e);
      if (this.timeForm.timeSelect == "start") {
        this.timeForm.start = date;
      } else if (this.timeForm.timeSelect == "end") {
        this.timeForm.end = date;
      }
      if (!this.tabTime(this.timeForm.start, this.timeForm.end)) {
        let item = this.timeForm.start;
        this.timeForm.start = this.timeForm.end;
        this.timeForm.end = item;
      }
      this.showTimePopup = false;
    },
    //获得当前时间
    curentTime(d) {
      var now = new Date(d);
      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日
      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分
      var clock = year + "-";
      if (month < 10) clock += "0";
      clock += month + "-";
      if (day < 10) clock += "0";
      clock += day + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (mm < 10) clock += "0";
      clock += mm;
      return clock;
    },
    //判断时间大小
    tabTime(start, end) {
      if (start == "" || end == "") {
        return true;
      }
      var oDate1 = new Date(start);
      var oDate2 = new Date(end);
      if (oDate1.getTime() < oDate2.getTime()) {
        return true;
      } else {
        return false;
      }
    },
    //点击时间范围
    async clickTimeForm() {
      let timeForm = this.timeForm;
      // let lists = await api.walker.getFileList();
      let lists = [
        {
          fullPath: "itools/walker/walkerLine20210305.json",
          name: "walkerLine20210305.json",
          nativeURL:
            "file:///storage/emulated/0/itools/walker/walkerLine20210305.json"
        },
        {
          fullPath: "itools/walker/walkerLine20210225084201.json",
          name: "walkerLine20210225084201.json",
          nativeURL:
            "file:///storage/emulated/0/itools/walker/walkerLine20210225084201.json"
        }
      ];
      let filterItem = [];
      lists.forEach(list => {
        let nameTime =
          list.name.slice(10, 14) +
          "-" +
          list.name.slice(14, 16) +
          "-" +
          list.name.slice(16, 18);
        if (
          this.tabTime(timeForm.start, nameTime) &&
          this.tabTime(nameTime, timeForm.end)
        ) {
          filterItem.push(list);
        }
        // console.log("clickTimeForm :>> ", nameTime);
      });
      // console.log("filterItem :>> ", filterItem);
      this.filterList = filterItem;
      this.showRcallPopup = false;
      // console.log("clickTimeForm :>> ", nameTime);
    }
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
  .timeFormContent {
    height: calc(100vh - 300px);
    padding: 15px;
    .timeFormBtn {
      margin-top: 15px;
    }
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
