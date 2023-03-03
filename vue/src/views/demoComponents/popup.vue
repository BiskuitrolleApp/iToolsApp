<template>
  <div>
    <h1 class="title" @click="toastClick">popup</h1>
    <coo-button @click="toastClick('left')">left</coo-button>
    <coo-button @click="toastClick('right')">right</coo-button>
    <coo-button @click="toastClick('bottom')">bottom</coo-button>
    <coo-button @click="toastClick('top')">top</coo-button>
    <coo-popup
      position="top"
      title="测试toast"
      :visible="visible.top"
      :safetyBottomArea="true"
      :closeble="true"
      @close="close('top')"
    >
      <div>i am popup top content</div>
    </coo-popup>

    <coo-popup
      position="bottom"
      title="测试toast"
      :visible="visible.bottom"
      :safetyBottomArea="true"
      :closeble="true"
      @close="close('bottom')"
    >
      <div>i am popup bottom content</div>
    </coo-popup>

    <coo-popup
      position="left"
      title="测试toast"
      :visible="visible.left"
      :safetyBottomArea="true"
      :closeble="true"
      @close="close('left')"
    >
      <div>i am popup left content</div>
    </coo-popup>

    <coo-popup
      position="right"
      title="测试toast"
      :visible="visible.right"
      :safetyBottomArea="true"
      :closeble="true"
      @close="close('right')"
    >
      <div>i am popup right content</div>
    </coo-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: {
        left: false,
        bottom: false,
        top: false,
        right: false
      }
    }
  },
  methods: {
    onClickLeft(e) {
      console.log('onClickLeft')
      this.copy('onClickLeft')
    },
    onClickRight(e) {
      console.log('onClickRight')
      this.copy('onClickRight')
    },
    toastClick(val) {
      this.visible[val] = true
    },
    close(val) {
      this.visible[val] = false
    },
    copy(data) {
      let url = data
      let oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      console.log(oInput.value)
      document.execCommand('Copy') // 执行浏览器复制命令
      // this.$message({
      //   message: '复制成功',
      //   type: 'success'
      // })
      oInput.remove()
    }
  }
}
</script>
<style lang="scss" scoped>
.testBox {
  background: red;
}
</style>
