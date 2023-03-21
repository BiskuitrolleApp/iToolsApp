<template>
  <div class="bg">
    <h1 class="title">tag</h1>
    <div class="tagBox">
      <coo-tag></coo-tag>
    </div>
    <div class="tagBox">
      <coo-tag position="bottom-right"></coo-tag>
    </div>
    <div class="tagBox">
      <coo-tag position="bottom-left"></coo-tag>
    </div>
    <div class="tagBox">
      <coo-tag position="top-left"></coo-tag>
    </div>
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
.bg {
  background-color: #eee;
  min-height: 100vh;
  .tagBox {
    width: 30px;
    height: 30px;
    background-color: #fff;
    margin: 10px;
  }
}
</style>
