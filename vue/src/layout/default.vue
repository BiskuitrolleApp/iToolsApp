<template>
  <div>
    <!-- <van-nav-bar
      :title="navTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <router-view></router-view>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      active: 0,
      navTitle: '标题',
      meta: {}
    }
  },
  mounted() {
    let meta = _.get(this.$route, 'meta', {})
    if (!_.isNil(meta.title)) {
      this.navTitle = meta.title
    }
    this.meta = meta
  },
  methods: {
    onClickLeft() {
      let { meta } = this
      if (!_.isNil(meta.back)) {
        this.$router.push(meta.back)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
