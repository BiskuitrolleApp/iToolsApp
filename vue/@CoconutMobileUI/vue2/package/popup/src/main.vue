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
      :visible="overlayVisible"
      :position="overlayPosition"
      @close="close"
    >
      <coo-transfer
        :name="transferAnimationName"
        :type="visible ? 'in' : 'out'"
        :duration="duration"
      >
        <div class="coo-popup__contentWrapper" :class="[positionClassName]">
          <div
            class="coo-popup__contentWrapper--topbar"
            v-if="position != 'top'"
          >
            <div
              class="coo-popup__contentWrapper--topbar--icon"
              v-if="closeble"
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
              v-if="closeble"
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
    closeble: {
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
    }
  },
  data() {
    //这里存放数据
    return {
      duration: 200,
      overlayVisible: false, //遮罩层显示控制器
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
        this.overlayVisible = val
      } else {
        setTimeout(() => {
          this.overlayVisible = false
        }, this.duration)
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
      this.visible = true
      this.getToastContent()
      if (this.toastContent.duration == 'infinite') {
        return
      } else if (
        this.toastContent.duration &&
        !isNaN(Number(this.toastContent.duration)) &&
        typeof Number(this.toastContent.duration) === 'number'
      )
        setTimeout(() => {
          this.visible = false
        }, Number(this.toastContent.duration))
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
