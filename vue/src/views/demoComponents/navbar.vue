<template>
  <div>
    <h1 class="title">demo navbar</h1>
    <van-nav-bar
      title="navTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <coo-navbar
      left-text="返回"
      right-text="搜索"
      title="title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></coo-navbar>
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
