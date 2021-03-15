<template>
  <div>
    <h2 class="van-popup-block__title ">设置</h2>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="timeInterval"
        type="digit"
        name="timeInterval"
        label="间隔"
        placeholder="间隔"
        :rules="[{ required: true, message: '请输入秒数' }]"
        input-align="right"
      >
        <template #extra><span style="margin-left: 16px;">秒</span></template>
      </van-field>
      <van-field name="centerModal" label="显示路径点">
        <template #input>
          <van-switch v-model="centerModal" size="20" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" size="small"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import { Toast } from "vant";

export default {
  data() {
    return {
      timeInterval: 0,
      centerModal: false
    };
  },
  computed: {
    ...mapGetters("map", ["getMapSettings"])
    // timeInterval: function() {
    //   return this.getMapSettings / 1000;
    // }
  },
  mounted() {
    let newSettings = _.cloneDeep(this.getMapSettings);
    this.timeInterval = _.cloneDeep(newSettings.timeInterval) / 1000;
    this.centerModal = _.cloneDeep(newSettings.centerModal);
  },
  methods: {
    ...mapMutations("map", ["setMapSettings"]),
    onSubmit(values) {
      let currSetting = {
        timeInterval: parseInt(values.timeInterval) * 1000,
        centerModal: values.centerModal
      };
      let setting = _.cloneDeep(this.getMapSettings);
      let newSting = _.assignIn(setting, currSetting);
      // console.log("newSting :>> ", newSting, values);
      this.setMapSettings(newSting);
      this.$emit("visiblePopup", false);
      Toast.success({
        message: "修改完成"
      });
      // console.log("getMapSettings :>> ", this.getMapSettings);
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  padding: 0px 10px;
}
</style>
