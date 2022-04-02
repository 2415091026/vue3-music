<template>
  <div class="music-list">
    <div class="music-tabs">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="歌曲列表"
          name="first"
        >
          <music-table :musicList='musicList'></music-table>
        </el-tab-pane>
        <el-tab-pane
          label='评论'
          name="second"
        >
          <music-dicuss
            :hotComments="hotComments"
            :newComments="newComments"
            :commentCount="commentCount"
            :id="songListId"
          ></music-dicuss>
        </el-tab-pane>
        <el-tab-pane
          label="收藏者"
          name="third"
        >Role</el-tab-pane>

      </el-tabs>
      <div class="search-input">
        <el-input
          class="w-50 m-2"
          placeholder="搜索歌单音乐"
          @input="search"
          v-model="keywords"
        >
          <template #suffix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import MusicTable from "./music-table.vue";
import { Calendar, Search } from "@element-plus/icons-vue";
import { searchMusic } from "../../../api/songs";
import { getDiscuss } from "../../../api/main";
import MusicDicuss from "./music-dicuss";
export default {
  components: {
    MusicTable,
    MusicDicuss,
    Calendar,
    Search,
  },
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: () => "",
    },
  },
  setup(props) {
    const activeName = ref("first");
    const keywords = ref("");
    // !热门评论
    const hotComments = ref([]);
    // !最新评论
    const newComments = ref([]);
    const commentCount = ref();
    const handleClick = (tab) => {
      switch (tab.index) {
        case "1":
          getDiscuss({ id: props.id }).then((res) => {
            console.log("评论", res);
            hotComments.value = res.hotComments;
            newComments.value = res.comments;
            commentCount.value = res.total;
          });
          // console.log(props.id);
          break;
      }
      // console.log(tab.index);
    };
    const search = () => {
      console.log(keywords.value);
      searchMusic({ keywords: keywords.value }).then((res) => {
        console.log(res);
      });
    };
    const songListId = computed(() => {
      return props.id;
    });
    return {
      activeName,
      hotComments,
      keywords,
      newComments,
      commentCount,
      handleClick,
      search,
      songListId,
    };
  },
};
</script>
<style lang="less" scoped>
.music-list {
  margin-bottom: 30px;
  .music-tabs {
    position: relative;
    .music-tabs {
      width: 100%;
    }
    .search-input {
      position: absolute;
      top: 0;
      right: 0;
      width: 190px;
      height: 30px;
    }
  }
}
.el-tabs /deep/ .el-tabs__nav-wrap::after {
  content: none !important;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  font-size: 20px;
  font-weight: 600;
  color: #000;
}
.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #ec4141;
}
</style>
