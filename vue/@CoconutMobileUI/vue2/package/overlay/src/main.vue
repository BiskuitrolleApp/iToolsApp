<template>
  <div
    class="coo-overlay"
    @click.stop="clickOverlay"
    v-show="visible"
    :class="[
      ...positionClassName,
      customClass,
      {
        'is-mark': mark
      }
    ]"
    :style="[customStyle]"
  >
    <coo-transfer :duration="100">
      <div class="coo-overlay__slot">
        <slot></slot>
      </div>
    </coo-transfer>
  </div>
</template>

<script>
export default {
  name: 'CooOverlay',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mark: {
      type: Boolean,
      default: true
    },
    // horizontal-vertical
    // vertical:top, middle, bottom
    // horizontal:left, center, right
    position: {
      default: 'center-middle',
      type: String
    }
  },
  data() {
    //这里存放数据
    return {
      transferType: 'in'
    }
  },
  methods: {
    // 点击遮罩层
    clickOverlay() {
      // this.visible = false
      this.$emit('close')
      console.log('clickOverlay :>> ')
    }
  },
  mounted() {},
  //监听属性 类似于data概念
  computed: {
    positionClassName() {
      let positionList = this.position.split('-')
      let clasList = []
      positionList.forEach(item => {
        clasList.push('is-' + item)
      })
      return clasList
    }
  },
  //监控data中的数据变化
  watch: {
    visible(val) {
      if (val) {
        //在打开遮罩层时：
        document.body.style.overflow = 'hidden'
        this.transferType = 'in'
      } else {
        // 在关闭遮罩层时：
        document.body.style.overflow = ''
        this.transferType = 'out'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
