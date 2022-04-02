<template>
  <div class="asidex">
    <el-menu
      default-active="/main/find"
      class="el-menu-demo"
      mode="vertical"
      background-color="#ffffff"
      active-text-color="#000"
      :router="true"
    >
      <el-menu-item index="/main/find">发现音乐</el-menu-item>
      <el-menu-item index="/main/test">播客</el-menu-item>
      <el-menu-item index="3">视频</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.asidex {
  position: fixed;
  width: 200px;
  left: 0;
  border-right: 1px solid #e0e0e0;
}
.el-menu {
  // width: 190px;
  height: 95.2vh;
  --el-menu-border-color: #fff !important;
}
.el-menu /deep/ .el-menu-item.is-active {
  background-color: #f6f6f7;
  font-size: 18px;
  font-weight: 600;
}
</style>
