<template>
  <div class="songer-info">
    <div class="user">
      <div class="user-img">
        <img
          :src="cover"
          alt=""
        >
      </div>
      <div class="user-desc">
        <h3 class="name">{{songerList.name}}</h3>
        <span
          class="nickname"
          v-for="(item, index) in alias"
          :key="index"
        >{{item}}</span>
        <div class="btn">
          <el-button round>
            <el-icon>
              <folder-add />
            </el-icon>
            收藏
          </el-button>
        </div>
        <div class="count">
          <span class="music">单曲数:{{musicSize}}</span>
          <span class="album">专辑数:{{albumSize}}</span>
          <span class="video">MV数:{{videoCount}}</span>
        </div>
      </div>
    </div>
    <div class="songer-tabs">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
      >
        <el-tab-pane
          label="专辑"
          name="first"
        >
          <album></album>
        </el-tab-pane>
        <el-tab-pane
          label="MV"
          name="second"
        >Config</el-tab-pane>
        <el-tab-pane
          label="歌手详情"
          name="third"
        >Role</el-tab-pane>
        <el-tab-pane
          label="相似歌手"
          name="fourth"
        >Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getSongerInfo } from "../../api/main";
import { useStore } from "vuex";
import { FolderAdd } from "@element-plus/icons-vue";
import Album from "./cpns/album.vue";
export default {
  components: {
    FolderAdd,
    Album,
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const songerList = ref({});

    const cover = ref("");
    const musicSize = ref();
    const albumSize = ref();
    const videoCount = ref();
    const activeName = ref("first");
    onMounted(() => {
      let id = route.query.id;
      getSongerInfo({ id: id }).then((res) => {
        console.log("歌手", res);
        songerList.value = res.data.artist;
        cover.value = res.data.artist.cover;
        musicSize.value = res.data.artist.musicSize;
        albumSize.value = res.data.artist.albumSize;
        videoCount.value = res.data.videoCount;
      });
    });
    const alias = computed(() => {
      return store.state.user.songerInfo;
    });
    return {
      songerList,
      cover,
      alias,
      musicSize,
      albumSize,
      videoCount,
      activeName,
    };
  },
};
</script>
<style lang="less" scoped>
.songer-info {
  padding: 20px;
  .user {
    display: flex;
    .user-img {
      width: 185px;
      height: 185px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .user-desc {
      margin-left: 16px;
      .name {
        font-size: 20px;
      }
      .nickname {
        font-size: 13px;
        margin-right: 8px;
        margin-top: 8px;
      }
      .btn {
        margin-top: 8px;
        span {
          font-size: 20px;
        }
        .el-icon {
          font-size: 20px;
        }
      }
      .count {
        font-size: 14px;
        margin-top: 20px;
        span {
          margin-left: 10px;
          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }
  }
  .songer-tabs {
    margin-top: 20px;
  }
}
</style>
