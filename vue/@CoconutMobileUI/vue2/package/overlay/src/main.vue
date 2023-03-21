<template>
  <div
    class="coo-overlay"
    @click.stop="clickOverlay"
    v-show="overlayVisible"
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
    // 是否显示mark层级
    mark: {
      type: Boolean,
      default: true
    },
    // 是否点击内容slot基于页面位置信息
    // horizontal-vertical
    // vertical:top, middle, bottom
    // horizontal:left, center, right
    position: {
      default: 'center-middle',
      type: String
    },
    // 是否点击mark层级关闭
    clickMarkToClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    //这里存放数据
    return {
      transferType: 'in',
      overlayVisible: false
    }
  },
  methods: {
    // 点击遮罩层
    clickOverlay() {
      this.$emit('click:mark')
      // this.visible = false
      if (this.clickMarkToClose) {
        this.overlayVisible = false
      }
    },
    /**
     * 开启overlay方法
     */
    show() {
      this.$emit('before:show')
      //在打开遮罩层时：
      document.body.style.overflow = 'hidden'
      this.transferType = 'in'
      this.overlayVisible = true
      this.$emit('showed')
    },
    /**
     * 关闭overlay方法
     */
    hide() {
      this.$emit('before:hide')
      // 在关闭遮罩层时：
      document.body.style.overflow = ''
      this.transferType = 'out'
      this.overlayVisible = false
      this.$emit('hidden')
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
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
