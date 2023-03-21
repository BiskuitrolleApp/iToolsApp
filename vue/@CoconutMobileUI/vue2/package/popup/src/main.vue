<template>
  <div
    class="coo-popup"
    :class="[
      {
        'is-round': round,
        'is-safetyBottomArea': safetyBottomArea,
        'is-safetyTopArea': safetyTopArea
      },
      customClass
    ]"
    :style="[customStyle]"
  >
    <coo-overlay
      :position="overlayPosition"
      :clickMarkToClose="false"
      @click:mark="clickMark"
      ref="overlay"
    >
      <coo-transfer
        :name="transferAnimationName"
        :type="popupVisible ? 'in' : 'out'"
        :duration="duration"
      >
        <div class="coo-popup__contentWrapper" :class="[positionClassName]">
          <div
            class="coo-popup__contentWrapper--topbar"
            v-if="position != 'top'"
          >
            <div
              class="coo-popup__contentWrapper--topbar--icon"
              v-if="closeable"
            >
              <coo-icon name="close-line" :size="24"></coo-icon>
            </div>
            <div class="coo-popup__contentWrapper--topbar--title" v-if="title">
              {{ title }}
            </div>
          </div>
          <div class="coo-popup__content">
            <slot> </slot>
          </div>
          <div
            class="coo-popup__contentWrapper--topbar"
            v-if="position == 'top'"
          >
            <div
              class="coo-popup__contentWrapper--topbar--icon"
              v-if="closeable"
            >
              <coo-icon name="close-line" :size="24"></coo-icon>
            </div>
            <div class="coo-popup__contentWrapper--topbar--title" v-if="title">
              {{ title }}
            </div>
          </div>
        </div>
      </coo-transfer>
    </coo-overlay>
  </div>
</template>

<script>
export default {
  name: 'CooPopup',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    title: {
      default: '',
      type: String
    },
    closeable: {
      default: false,
      type: Boolean
    },
    safetyBottomArea: {
      default: false,
      type: Boolean
    },
    safetyTopArea: {
      default: false,
      type: Boolean
    },
    round: {
      default: true,
      type: Boolean
    },
    position: {
      default: 'bottom',
      type: String
    },
    visible: {
      default: false,
      type: Boolean
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
      popupVisible: false,
      duration: 200,
      // overlayVisible: false, //遮罩层显示控制器
      positionClassName: 'is-popup-bottom',
      overlayPosition: 'center-bottom',
      transferAnimationName: 'slideDown'
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    position(val) {
      this.getPositionOption(val)
    },
    visible(val) {
      if (val) {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成 （可以访问DOM元素）
  mounted() {
    this.getPositionOption(this.position)
  },
  //方法集合
  methods: {
    getPositionOption(position = 'bottom') {
      this.positionClassName = 'is-popup-' + position
      switch (position) {
        case 'bottom':
          this.overlayPosition = 'center-bottom'
          this.transferAnimationName = 'slideDown'
          break
        case 'top':
          this.overlayPosition = 'center-top'
          this.transferAnimationName = 'slideUp'
          break
        case 'left':
          this.overlayPosition = 'left-middle'
          this.transferAnimationName = 'slideLeft'
          break
        case 'right':
          this.overlayPosition = 'right-middle'
          this.transferAnimationName = 'slideRight'
          break
        default:
          this.overlayPosition = 'center-bottom'
          this.transferAnimationName = 'slideUp'
          break
      }
    },
    show() {
      this.$emit('show')
      this.$refs.overlay.show()
      this.popupVisible = true
    },
    clickMark() {
      if (this.clickMarkToClose) this.hide()
    },
    hide() {
      this.$emit('hide')
      this.popupVisible = false
      setTimeout(() => {
        // this.overlayVisible = false
        this.$refs.overlay.hide()
      }, this.duration)
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
