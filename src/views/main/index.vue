<template>
  <div class="main">
    <el-container>
      <!-- 头部 -->
      <el-header v-if="!show">
        <div class="header">
          <main-header></main-header>
        </div>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style=" border-right: .5px solid #dcdfe6"
          v-if="!show"
        >
          <main-aside></main-aside>
        </el-aside>
        <el-container>
          <el-main v-if="!show">
            <router-view></router-view>
            <div class="login-box">
              <login></login>
            </div>

          </el-main>
          <el-footer>
            <music-player></music-player>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!-- 遮罩层 -->
  <div
    class="zhezhao "
    v-if="show"
  >
    <big-player></big-player>
  </div>
  <!-- 歌词 -->
  <div
    class="songs-words"
    v-show="isShow"
    :style="{'right': show ? '37%': '34%'}"
  >
    {{curretntLyrics}}
    <div
      class="close"
      @click="close"
    >
      <el-icon>
        <close-bold />
      </el-icon>
    </div>
  </div>
  <!-- 搜索框 -->
  <div
    class="search-box"
    v-if="searchShow"
  >
    <search></search>
  </div>
</template>
<script>
import MainHeader from "../../components/main-header";
import MainAside from "../../components/main-aside";
import Login from "../login/index";
import MusicPlayer from "../musicPlayer/index";
import BigPlayer from "../bigPlayer/index";
import { useStore } from "vuex";
import { computed } from "vue";
import { CloseBold } from "@element-plus/icons-vue";
import Search from "../search/index";
export default {
  components: {
    MainHeader,
    MainAside,
    Login,
    MusicPlayer,
    BigPlayer,
    Search,
    CloseBold,
  },
  setup(props) {
    const store = useStore();

    const show = computed(() => {
      return store.state.utils.isShow;
    });
    const curretntLyrics = computed(() => {
      return store.state.music.curretntLyrics;
    });
    const isShow = computed(() => {
      return store.state.utils.isShowSongWords;
    });
    // !关闭歌词框
    const close = () => {
      store.commit("utils/setSongWordsShow", false);
    };
    const searchShow = computed(() => {
      return store.state.utils.searchShow;
    });
    return {
      show,
      curretntLyrics,
      isShow,
      searchShow,
      close,
    };
  },
};
</script>
<style lang="less" scoped>
.main {
  position: relative;
  .header {
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #ec4141;
    z-index: 999;
  }
  .login-box {
    position: absolute;
    top: 30%;
    left: 47%;
    background-color: #fff;
    z-index: 999;
    border-radius: 10px;
  }
}
.zhezhao {
  // position: absolute;
  // // top: 0;
  // bottom: 75px;
  // width: 100%;
  // height: 100vh;
  // z-index: 99999;
  // // background-color: #000;

  // padding-top: 90px;
  // display: flex;
  // justify-content: center;
  // transition: all 5s;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  // transition: bottom 0.5s;
}
.songs-words {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  // right: 37%;
  width: 662px;
  height: 117px;
  cursor: pointer;
  font-size: 38px;
  color: #c2b0b0;
  z-index: 999;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .close {
    position: absolute;
    right: 30px;
    top: 10px;
    opacity: 0;
    font-size: 16px;
    z-index: 9999;
  }
  &:hover .close {
    opacity: 1;
  }
}
.search-box {
  position: fixed;
  top: 68px;
  left: 239px;
  width: 350px;
  // height: 80%;
  background-color: #fff;
  z-index: 9;
  border-radius: 10px;
  box-shadow: #8d8d8d 0px 0px 4px;
}
.el-header {
  --el-header-padding: 0 !important;
}
.el-main {
  padding: 0 !important;
}
.el-footer {
  position: fixed;
  bottom: 0;
  // background-color: pink !important;
  z-index: 99;
  width: 100%;
  height: 75px;
  --el-footer-padding: 0 !important;
}
</style>
