<template>
  <div class="search-list">
    <div class="title">
      <h3>搜索 {{keyWords}}</h3>
    </div>
    <div class="search-tab">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
      >
        <el-tab-pane
          label="单曲"
          name="first"
        >User</el-tab-pane>
        <el-tab-pane
          label="Config"
          name="second"
        >Config</el-tab-pane>
        <el-tab-pane
          label="Role"
          name="third"
        >Role</el-tab-pane>
        <el-tab-pane
          label="Task"
          name="fourth"
        >Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { sendSearch } from "../../../api/search";
export default {
  setup(props) {
    const route = useRoute();

    // keyWords.value = route.query.keywords;
    const keyWords = computed(() => {
      return route.query.keywords;
    });
    const activeName = ref("first");
    onMounted(() => {
      sendSearch({ keywords: route.query.keywords }).then((res) => {
        console.log(res);
      });
    });
    return {
      keyWords,
      activeName,
    };
  },
};
</script>
<style lang="less" scoped>
.search-list {
  padding: 28px;
  .search-tab {
    margin-top: 20px;
  }
}
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

