<template>
  <i :class="name" class="iconfont"></i>
</template>

<script>
export default {
  name: 'coo-icon',
  props: {
    name: String,
  },
}
</script>