<!--
 * @Descripttion: 弹出框提示组件
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-08-19 17:12:22
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-07-23 18:21:14
-->
<template>
  <div class="coo-dialog">
    <coo-overlay
      :visible="overlayVisible"
      @click="closeDialogFunction"
      @close="overlayCloseEvent"
    >
      <template>
        <div class="coo-dialog-wrapper" @click.stop>
          <div class="coo-dialog__title" v-if="title || dialogContent.title">
            <span>{{ title || dialogContent.title }}</span>
          </div>
          <div class="coo-dialog__content">
            {{ content || dialogContent.content }}
          </div>
          <!-- {{ dialogContent }}{{ isComponent }} -->
          <div class="coo-dialog__buttonWrapper">
            <div
              class="
                coo-dialog__buttonWrapper--button
                coo-dialog__buttonWrapper--cancel
              "
              v-if="cancelShow"
              @click="cancelClick"
            >
              {{ cancelShowText }}
            </div>
            <div
              class="
                coo-dialog__buttonWrapper--button
                coo-dialog__buttonWrapper--confirm
              "
              v-if="confirmShow"
              @click="confirmClick"
            >
              {{ confirmShowText }}
            </div>
          </div>
        </div>
      </template>
    </coo-overlay>
  </div>
</template>

<script>
export default {
  name: 'CooDialog',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: '确认',
    },
  },
  //监听属性 类似于data概念
  computed: {
    cancelShow() {
      if (this.isComponent) {
        return this.showCancelButton
      } else {
        return this.dialogContent.showCancelButton
      }
    },
    confirmShow() {
      if (this.isComponent) {
        return this.showConfirmButton
      } else {
        return this.dialogContent.showConfirmButton
      }
    },
    cancelShowText() {
      if (this.isComponent) {
        return this.cancelText
      } else {
        return this.dialogContent.cancelText
      }
    },
    confirmShowText() {
      if (this.isComponent) {
        return this.confirmText
      } else {
        return this.dialogContent.confirmText
      }
    },
  },
  data() {
    //这里存放数据
    return {
      transferType: 'in',
      overlayVisible: false,
      isComponent: true, // 是否为组件赋值
      dialogContent: {
        title: '',
        content: '',
        showCancelButton: true,
        showConfirmButton: true,
        confirmText: '确认',
        cancelText: '取消',
      },
    }
  },
  methods: {
    // 遮罩层关闭实践
    overlayCloseEvent() {
      this.closeDialogFunction()
    },
    // 弹出框关闭方法
    closeDialogFunction() {
      this.overlayVisible = false
    },
    // 点击确认事件
    confirmClick(e) {
      this.$emit('confirm', e)
      console.log('click confirmClick')
      // this.closeDialogFunction()
    },
    // 点击取消事件
    cancelClick(e) {
      this.$emit('cancel', e)
      this.closeDialogFunction()
    },
  },
  //监控data中的数据变化
  watch: {
    visible(val) {
      this.overlayVisible = val
    },
    overlayVisible(val) {
      if (!val) {
        this.$emit('close')
      }
    },
  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>