<template>
  <div>
    <h1 class="title">icon</h1>
    <div class="search"></div>
    <div class="iconList">
      <div
        class="iconList__type__wrapper"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="iconList__type__content">- {{ index }}</div>
        <div class="iconList__wrapper">
          <!-- {{ item }} -->
          <div
            class="iconList__item"
            v-for="(item2, index2) in item"
            :key="index2"
          >
            <div
              class="iconList__item__line iconList__item__box"
              v-if="index != 'Editor'"
              @click="selectItem(index2 + '-line')"
            >
              <div class="iconList__item__wrapper">
                <coo-icon :name="index2 + '-line'" :size="30"></coo-icon>
                <div>{{ index2 + '-line' }}</div>
              </div>
            </div>
            <div
              class="iconList__item__fill iconList__item__box"
              v-if="index != 'Editor'"
              @click="selectItem(index2 + '-fill')"
            >
              <div class="iconList__item__wrapper">
                <coo-icon :name="index2 + '-fill'" :size="30"></coo-icon>
                <div>{{ index2 + '-fill' }}</div>
              </div>
            </div>
            <div
              class="iconList__item__fill iconList__item__box"
              v-if="index == 'Editor'"
              @click="selectItem(index2)"
            >
              <div class="iconList__item__wrapper">
                <coo-icon :name="index2" :size="30"></coo-icon>
                <div>{{ index2 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tags from './common/iconTags.json'
export default {
  data() {
    return {
      list: {}
    }
  },
  mounted() {
    this.list = tags
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
    toastClick() {
      console.log('1 :>> ')
    },
    selectItem(name) {
      let content = `<coo-icon name="${name}" :size="30"></coo-icon>`
      this.copy(content)
      this.$cooToast({
        content: '成功',
        iconName: 'book-fill',
        type: 'success',
        duration: '2000'
      })
      // .then(() => {
      //   console.log('objecontentct :>> ')
      // })
      // .catch(() => {
      //   console.log('objecontentct 2:>> ')
      // })
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
.iconList__type__wrapper {
  .iconList__type__content {
    font-size: 18px;
    font-weight: bolder;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .iconList__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    justify-content: space-around;

    .iconList__item {
      text-align: center;
      &__box {
        height: 100px;
        width: 100px;
        margin-bottom: 3px;
        border: 1px solid #000;
        border-radius: 8px;
        display: table;
      }
      &__wrapper {
        display: table-cell;
        vertical-align: middle;
        padding: 5px;
      }
    }
  }
}
</style>
