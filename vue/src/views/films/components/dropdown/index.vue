<template>
  <div class="dropdown">
    <div class="dropdown-mask" @click="handlerMask"></div>
    <div class="ul" :style="{ color: fontColor, 'background-color': bgColor }">
      <div
        class="li"
        v-for="item in list"
        :key="item.value"
        @click="handlerItem(item.value)"
      >
        <coo-icon size="20px" :color="fontColor" :name="item.icon"></coo-icon>
        <div class="li-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    fontColor: {
      type: String,
      default: '#000000'
    }
  },
  methods: {
    handlerItem(value) {
      this.$emit('select', value)
    },
    handlerMask() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  z-index: 100;
  .ul {
    position: relative;
    z-index: 101;
    list-style: none;
    // background-color: #fff;
    border-radius: 2px;
    padding-left: 0;
    box-shadow: 5px 5px 10px rgba(224, 32, 32, 0.2);
    .li {
      display: flex;
      align-items: center;
      min-width: 100px;
      // color: #000;
      padding: 10px;
      border-bottom: 1px solid #e6eaeb;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      .li-name {
        margin-left: 5px;
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
  .dropdown-mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    touch-action: none;
  }
}
</style>
