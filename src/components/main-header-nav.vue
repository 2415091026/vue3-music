<template>
  <div class="header-nav">
    <p>{{title}}</p>
    <slot />
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.header-nav {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
