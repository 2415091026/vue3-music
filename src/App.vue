<template>

  <router-view />
</template>
<script>
import { onMounted } from "vue";
// import { getLoginStatus } from "./api/login";
export default {
  setup(props) {
    // onMounted(() => {
    //   getLoginStatus().then((res) => {
    //     console.log(res, "状态");
    //   });
    // });
  },
};
</script>
<style lang="less">
</style>
