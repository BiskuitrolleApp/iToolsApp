<template>
  <div>
    <h1 class="title">toast</h1>
    <coo-button type="danger" @click="toastClick"
      >click me showToast</coo-button
    >
    <!-- <coo-toast content="测试toast"></coo-toast> -->
    <!-- <coo-navbar
      left-text="返回"
      right-text="搜索"
      title="title"
      @click-left="onClickLeft"
      customClass="testBox"
      :customStyle="{ color: '#0f0' }"
    ></coo-navbar> -->
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft(e) {
      console.log('onClickLeft')
      this.copy('onClickLeft')
    },
    onClickRight(e) {
      console.log('onClickRight')
      this.copy('onClickRight')
    },
    toastClick() {
      console.log('click me showToast :>> ')
      this.$cooToast({
        // id: 'tempToast',
        content: '成功',
        type: 'loading',
        duration: 10000
      })
      setTimeout(() => {
        // console.log('手动hide')
        // this.$cooToastHide('tempToast')
        this.$cooToastHide()
      }, 3000)
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
