<template>
  <div class="coo-icon" :class="[customClass]" :style="[customStyle]">
    <i :class="name" class="iconfont" :style="[fontStyle, customStyle]"></i>
    <!-- <v-icon :name="name" :title="title" :scale="scale" :spin="spin" :inverse="inverse" :flip="flip" :label="label" /> -->
    <!-- <el-icon :size="size" :color="color">
    <component class="coo-icon" :is="name"></component>
  </el-icon> -->
  </div>
</template>

<script>
// import vIcon from "vue-awesome/components/Icon";
export default {
  // components: {
  //   vIcon,
  // },
  name: "coo-icon",
  props: {
    name: {
      type: String,
    },
    color: String,
    size: [Number, String],
  },
  computed: {
    fontStyle() {
      let style = {};
      style.color = this.color ? this.color : "";
      style.fontSize = this.size ? this.size : "";
      return style;
    },
  },
};
</script>
