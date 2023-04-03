<template>
  <div
    class="listItem"
    @click="clickItem(value)"
    :style="{ color: fontColor, 'background-color': bgColor }"
  >
    <coo-cell>
      <coo-cell-item :description="value.subtitle" :rightIcon="false">
        <div>{{ value.subtitle }}</div>
        <div slot="label" class="u-slot-title">
          <img
            :src="value.thumbnail"
            style="background-color: #ccc;margin: -3px 5px -3px 0;width:30px;height:30px;"
          />
          <!-- <u-avatar
        slot="icon"
        shape="square"
        size="50"
        :src="value.thumbnail"
        customStyle="background-color: #ccc;margin: -3px 5px -3px 0"
      ></u-avatar> -->
          <span>{{ value.title }}</span>
          <div class="tag_wrapper" v-if="value.type">
            <coo-tag
              value="NEW"
              bgColor="#1890ff"
              color="#fff"
              size="small"
              v-if="value.type == 'new'"
            ></coo-tag>
            <coo-tag
              value="HOT"
              bgColor="#eb6159"
              color="#fff"
              size="small"
              v-if="value.type == 'hot'"
            ></coo-tag>
          </div>
        </div>
      </coo-cell-item>
    </coo-cell>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    fontColor: {
      type: String,
      default: '#000000'
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    clickItem(item) {
      // console.log("path", path);
      // uni.navigateTo({
      //   url: path,
      // });
      this.$emit('click', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.listItem {
  width: 100%;
  .u-slot-title {
    display: flex;
    justify-items: flex-start;
    .tag_wrapper {
      margin-left: 10px;
    }
  }
  .avatar_wrapper {
    // background-color: #ccc;
  }
}
//@import url(); 引入公共css类
</style>
