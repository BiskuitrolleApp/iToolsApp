<template>
  <div class="theme-popup">
    <coo-popup
      :visible="show"
      @close="close"
      :safetyBottomArea="true"
      :round="true"
      :closeable="true"
      position="bottom"
      :clickMarkToClose="true"
      title="暗夜模式"
    >
      <div class="themelist-wrapper" :style="{ color: fontColor }">
        <div
          class="themelist-item"
          @click="select(item)"
          :class="{ active: item.key == value }"
          v-for="(item, index) in list"
          :key="index"
        >
          <img :src="item.image" class="themelist-item__image"></img>
          <div class="themelist-item__tips">{{ item.name }}</div>
        </div>
      </div>
    </coo-popup>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: 'day'
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
  data() {
    return {
      // show: false,
    }
  },
  watch: {
    show(val) {
      console.log('theme', val)
    }
  },
  methods: {
    select(item) {
      this.$emit('select', item)
      // console.log('open');
    },
    close() {
      this.$emit('close')
      // console.log('close');
    }
  }
}
</script>
<style lang="scss" scoped>
$primary: #7575ff !default;
.theme-popup {
  .themelist-wrapper {
    height: 200px;
    padding: 10px 0px 10px 0px;
    // background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 120px 120px 120px;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    justify-items: center;
    align-items: start;
    .themelist-item {
      padding: 10px;
      width: 100px;
      height: 120px;
      text-align: center;
      &__image {
        border-radius: 5px;
        width: 100px;
        height: 100px;
      }
      &__tips {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .active {
    border: $primary 2px solid;
    border-radius: 5px;
  }
}
</style>
