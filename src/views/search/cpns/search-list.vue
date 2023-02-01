<template>
  <div class="search-list">
    <div class="title">
      <h3>搜索 {{keyWords}}</h3>
    </div>
    <div class="like-title">
      <p>你可能感兴趣</p>
    </div>
    <div class="like">
      <!-- 歌手 -->
      <div
        class="like-songer"
        v-for="item in likeSonger"
      >
        <img
          :src="item.img1v1Url"
          alt=""
        >
        <div class="desc">
          <p class="name">歌手:{{item.name}}</p>
          <p class="fans">粉丝:{{formatCount(item.fansSize)}} 歌曲:{{item.musicSize}}</p>
        </div>
      </div>
      <!-- 专辑 -->
      <div class="like-album">
        <img
          src="https://p2.music.126.net/rYYhHXZHwCfizE0N46F37Q==/109951166115911716.jpg"
          alt=""
        >
        <div class="desc">
          <p class="name">歌手:陈奕迅</p>
          <p class="fans">粉丝:737万 歌曲:1760</p>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="like-song-list">
        <img
          src="https://p2.music.126.net/rYYhHXZHwCfizE0N46F37Q==/109951166115911716.jpg"
          alt=""
        >
        <div class="desc">
          <p class="name">歌手:陈奕迅</p>
          <p class="fans">粉丝:737万 歌曲:1760</p>
        </div>
      </div>

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
import { sendSearch, getMultimatch } from "../../../api/search";
import { formatCount } from "../../../utils/format";
export default {
  setup(props) {
    const route = useRoute();
    // keyWords.value = route.query.keywords;
    const keyWords = computed(() => {
      return route.query.keywords;
    });
    const activeName = ref("first");
    const likeSonger = ref([]);
    const likeAlbum = ref();
    const likeSongList = ref([]);
    onMounted(() => {
      sendSearch({ keywords: route.query.keywords }).then((res) => {
        console.log(res);
      });
      getMultimatch({ keywords: route.query.keywords }).then((res) => {
        console.log("多", res);
        likeSonger.value = res.result.artist;
        likeAlbum.value = res.result.album;
        likeSongList.value = res.result.playlist;
      });
    });

    return {
      keyWords,
      activeName,
      likeSonger,
      likeAlbum,
      likeSongList,
    };
  },
};
</script>
<style lang="less" scoped>
.search-list {
  padding: 28px;
  .like-title {
    margin-top: 18px;
    p {
      font-size: 12px;
      color: #676767;
    }
  }
  .like {
    display: flex;
    .like-songer,
    .like-album,
    .like-song-list {
      display: flex;
      align-items: center;
      margin-top: 16px;
      margin-right: 16px;
      width: 290px;
      height: 65px;
      background-color: #f4f4f4;
      border-radius: 5px;
      img {
        margin: 0 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        font-size: 14px;
        color: #000;
      }
      .desc {
        font-size: 12px;
        color: #676767;
      }
    }
  }
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

