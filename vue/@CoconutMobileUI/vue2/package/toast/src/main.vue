<template>
  <div
    class="coo-toast"
    :class="[
      positionClassName,
      customClass,
      { 'is-rolling': getType == 'loading' }
    ]"
    :style="[customStyle]"
  >
    <coo-overlay :visible="visible" :mark="false">
      <!-- <coo-overlay
      :visible="visible"
      @click="closeDialogFunction"
      @close="overlayCloseEvent"
    > -->
      <div class="coo-toast__content">
        <slot name="content">
          <slot name="icon">
            <div
              class="coo-toast__content--icon"
              v-if="this.toastContent.iconName"
            >
              <coo-icon
                :name="this.toastContent.iconName"
                :size="40"
              ></coo-icon>
            </div>
          </slot>
          <div class="coo-toast__content--content">
            {{ content || this.toastContent.content }}
          </div>
        </slot>
      </div>
    </coo-overlay>
  </div>
</template>

<script>
export default {
  name: 'CooToast',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    position: {
      default: 'center',
      type: String
    },
    content: {
      default: '',
      type: String
    },
    iconName: {
      default: false,
      type: [Boolean, String]
    },
    duration: {
      default: 2000,
      type: [Number, String]
    },
    type: {
      default: 'none',
      type: String
    }
  },
  data() {
    //这里存放数据
    return {
      visible: false,
      isComponent: true, // 是否直接组件赋值
      toastContent: {
        content: '',
        iconName: false,
        type: 'none',
        duration: 2000
      }
    }
  },
  //监听属性 类似于data概念
  computed: {
    positionClassName() {
      return 'is-' + this.position
    },
    getType() {
      if (this.type == 'none' || !this.type) {
        if (this.toastContent.type == 'none' || !this.toastContent.type) {
          return 'none'
        } else {
          return this.toastContent.type
        }
      } else {
        return this.type
      }
    }
  },
  //监控data中的数据变化
  watch: {
    content(val) {
      this.toastContent.content = val
    },
    iconName(val) {
      this.toastContent.iconName = val
    },
    duration(val) {
      this.toastContent.duration = val
    },
    type(val) {
      this.toastContent.type = val
    }
    // visible(val) {
    //   if (val) {
    //     setTimeout(() => {
    //       this.visible = false
    //     }, this.toastContent.duration)
    //   }
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成 （可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    getToastContent() {
      let type = this.getType
      if (type == 'none') {
        this.toastContent = { ...this.toastContent, iconName: false }
      } else if (type == 'success') {
        this.toastContent = {
          content: '成功',
          ...this.toastContent,
          iconName: 'check-fill'
        }
      } else if (type == 'fail') {
        this.toastContent = {
          content: '错误',
          ...this.toastContent,
          iconName: 'error-warning-line'
        }
      } else if (type == 'loading') {
        this.toastContent = {
          content: '加载中...',
          ...this.toastContent,
          iconName: 'loader-4-line'
        }
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
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
