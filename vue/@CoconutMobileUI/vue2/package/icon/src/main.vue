<template>
  <i
    class="coo-icon remixicon"
    :class="[iconName, customClass]"
    :style="[{ 'font-size': size + 'px' }, customStyle]"
  ></i>
</template>

<script>
export default {
  name: 'CooIcon',
  //   ### Props
  // * `name: string`
  //   图标名称。图标来源于remixicon，官方地址为https://remixicon.com/ 查询对应图标可以去官方地址查询
  // * `size: number|string`

  props: {
    name: {
      type: String
    },
    size: {
      type: [Number, String],
      default: 14
    }
  },
  computed: {
    iconName() {
      return 'ri-' + this.name
    }
  }
}
</script>
