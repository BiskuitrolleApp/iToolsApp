<template>
  <div class="card_base">
    <div class="van-cell van-cell--large">
      <img :src="bg" :class="disabled ? 'img_disabled' : ''" />
      <div
        class="van-cell__title"
        :class="disabled ? 'vant-cell_disabled' : ''"
      >
        <span>{{ title }}</span>
        <div class="van-cell__label">{{ subtitle }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "subtitle", "bg", "disabled"]
};
</script>
<style lang="scss" scoped>
.card_base {
  // position: absolute;
  width: 90vw;
  margin: 0px auto;
  // left: 5vw;
  padding: 10px 0px;
  z-index: 2;
  position: relative;
  .van-cell {
    position: relative;
    border-radius: 8px;
    height: 100px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 16px;
    .van-cell__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      z-index: 4;
      span {
        height: 45px;
        line-height: 45px;
        font-size: 33px;
        font-weight: 700;
      }
      .van-cell__label {
        font-size: 16px;
        line-height: 16px;
        color: #666;
      }
    }
    .vant-cell_disabled {
      color: #ccc;
      .van-cell__label {
        color: #ccc;
      }
    }
  }
  img {
    width: 100%;
    position: absolute;
    top: -100px;
    z-index: 2;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  .img_disabled {
    opacity: 0.1;
    filter: alpha(opacity=10);
  }
}
</style>
