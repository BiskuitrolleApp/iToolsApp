<template>
  <div class="videoframe">
    <van-nav-bar
      title="视频解析"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="videoForm">
      <van-form @submit="openAddress">
        <van-field
          v-model="address"
          clearable
          name="address"
          label="地址"
          placeholder="地址"
          style="margin:10px 0px"
          :rules="[{ required: true, message: '请填写地址' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="pickerValue"
          label="解析路径"
          placeholder="点击选择解析路径"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请填写路径' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
            >解析</van-button
          >
        </div>
      </van-form>
      <van-button
        icon="plus"
        type="info"
        class="plusBtn"
        style="width:40px;height:40px;"
        round
        @click="addAddress"
      />
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="selectLabel"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-popup
      v-model="showPopup"
      round
      :lock-scroll="true"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-nav-bar title="添加解析地址" />
      <div style="width:90%;margin:0 auto">
        <van-form @submit="saveCrackAddress">
          <van-field
            v-model="crackAddress"
            name="crackAddress"
            label="解析地址"
            placeholder="解析地址"
            style="margin:10px 0px"
            :rules="[{ required: true, message: '请填写解析地址' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit"
              >添加解析地址</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>
<script>
import api from "@/libs/api";
export default {
  data() {
    return {
      address: "",
      pickerValue: "",
      pickerUrl: "",
      crackAddress: "",
      showPopup: false,
      showPicker: false,
      // urlList: []
      urlList: [{ name: "线路三", type: "1", url: "https://z1.m1907.cn/?jx=" }]
    };
  },
  async mounted() {
    try {
      let _list = await api.video.listEstate("saveUrl");
      if (_list != "" && _list != [] && _list.constructor == Array)
        this.urlList = _list;
    } catch (error) {
      Notify({ type: "danger", message: "读取解析文件失败：" + error });
    }
  },
  computed: {
    selectLabel() {
      let data = [];
      console.log("urlList :>> ", this.urlList);
      if (this.urlList.constructor == Array)
        this.urlList.forEach(element => {
          data.push(element.name);
        });
      return data;
    },
    selectValue() {
      let data = [];
      if (this.urlList.constructor == Array)
        this.urlList.forEach(element => {
          data.push(element.url);
        });
      return data;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    openAddress(value) {
      let newUrl = this.pickerUrl + value.address;
      console.log("object :>> ", newUrl != "");
      if (newUrl != "")
        this.$router.push({
          path: "/iframe",
          query: {
            url: newUrl
          }
        });
    },
    saveCrackAddress(value) {
      api.video.save("saveUrl", value.crackAddress);
      // console.log("crackAddress :>> ", value);
    },
    addAddress() {
      this.showPopup = !this.showPopup;
    },
    onConfirm(value, index) {
      this.pickerValue = value;
      this.pickerUrl = this.selectValue[index];
      console.log("onConfirm :>> ", value, index);
      this.showPicker = false;
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
