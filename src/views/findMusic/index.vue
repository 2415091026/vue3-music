<template>
  <div class="music">
    <div class="top-tabs">
      <el-tabs
        class="demo-tabs"
        v-model="activeName"
      >
        <el-tab-pane
          label="个性推荐"
          name="first"
        >
          <recommend></recommend>
        </el-tab-pane>
        <el-tab-pane
          label="专属定制"
          name="second"
        >专属定制</el-tab-pane>
        <el-tab-pane
          label="歌单"
          name="third"
        >歌单</el-tab-pane>
        <el-tab-pane
          label="排行榜"
          name="fourth"
        >排行榜</el-tab-pane>
        <el-tab-pane
          label="歌手"
          name="fifth"
        >歌手</el-tab-pane>
        <el-tab-pane
          label="最新音乐"
          name="sixth"
        >最新音乐</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Recommend from "../../views/recommend";
export default {
  components: {
    Recommend,
  },
  setup(props) {
    const activeName = ref("first");
    return {
      activeName,
    };
  },
};
</script>
<style lang="less" scoped>
.el-tabs /deep/ .el-tabs__nav-wrap::after {
  content: none !important;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  font-size: 22px;
  font-weight: 600;
  color: #000;
}
.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #ec4141;
}
</style>
