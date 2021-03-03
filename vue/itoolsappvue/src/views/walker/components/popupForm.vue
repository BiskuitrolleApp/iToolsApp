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
      timeInterval: 0
    };
  },
  computed: {
    ...mapGetters("map", ["getMapSettings"])
    // timeInterval: function() {
    //   return this.getMapSettings / 1000;
    // }
  },
  mounted() {
    this.timeInterval = _.cloneDeep(this.getMapSettings.timeInterval) / 1000;
  },
  methods: {
    ...mapMutations("map", ["setMapSettings"]),
    onSubmit(values) {
      let currSetting = {
        timeInterval: parseInt(values.timeInterval) * 1000
      };
      let setting = _.cloneDeep(this.getMapSettings);
      let newSting = _.assignIn(setting, currSetting);
      // console.log("newSting :>> ", newSting);
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
