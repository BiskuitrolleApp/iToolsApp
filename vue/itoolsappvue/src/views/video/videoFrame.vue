<template>
  <iframe
    :src="src"
    width="100%"
    height="100%"
    name="iframe名称"
    scrolling="no"
  />
</template>
<script>
export default {
  data() {
    return {
      src: "https://kevinjiezheng.github.io/"
    };
  }
};
</script>
