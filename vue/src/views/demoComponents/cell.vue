<template>
  <div class="bg">
    <h1 class="title">cell</h1>
    <coo-cell>
      <coo-cell-item label="测试" value="下一步" :rightIcon="false">
        <div>我是aa</div>
      </coo-cell-item>
      <coo-cell-item label="测试" value="下一步" leftIcon="arrow-left-s-line">
        <div slot="left">
          我是最左
        </div>
        <div slot="right">
          我是最右
        </div>
        <div>我是aa</div>
        <div>我是aa</div>
        <div>我是aa</div>
        <div>我是aa</div>
        <div>我是aa</div>
        <div>我是aa</div>
      </coo-cell-item>
    </coo-cell>
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
}
</style>
