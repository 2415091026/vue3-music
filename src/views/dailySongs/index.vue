<template>
  <div class="dailySong">
    <audio-player ref="player"></audio-player>
    <div class="title">
      <h2>每日歌曲推荐</h2>
      <P>根据你的口味生成，每天6：00更新</P>
    </div>
    <div class="dailySong-table">
      <el-table
        stripe
        style="width: 100%"
        :data="dailySongList"
        @cell-dblclick="playSong"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="name"
          label="音乐标题"
          width="1100"
        />
        <el-table-column
          :formatter="arFormat"
          prop="ar"
          label="歌手"
          width="380"
        />
        <el-table-column
          prop="al.name"
          label="专辑"
          width="380"
        />
        <el-table-column
          :formatter="timeFormat"
          prop="dt"
          label="时长"
        />
        <el-table-column label="操作">
          <template #default="scope">

            <el-button
              circle
              v-if="isShow == scope.row.id"
              @click="stopLike"
            >
              <el-icon>
                <star-filled />
              </el-icon>
            </el-button>
            <el-button
              circle
              @click="like(scope.row.id)"
              v-else
            >
              <el-icon>
                <star />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed, nextTick, watch } from "vue";
import { useStore } from "vuex";
import { getRecommendDaily } from "../../api/main";
import { getLyric } from "../../api/songs";
import { Star, StarFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getSongInfo } from "../../api/songs";
import AudioPlayer from "../../components/audio-player";
export default {
  components: {
    Star,
    StarFilled,
    AudioPlayer,
  },
  setup(props) {
    const store = useStore();
    const dailySongList = ref([]);
    onMounted(() => {
      getRecommendDaily().then((res) => {
        console.log("每日歌曲", res);
        dailySongList.value = res.data.dailySongs;
        store.commit("music/setAllSongsList", res.data.dailySongs);
      });
    });
    const arFormat = (row) => {
      let arr = [];
      row.ar.forEach((item, index) => {
        if (index > 2) {
          return;
        }
        arr.push(item.name);
      });
      return arr.join("/");
    };
    const timeFormat = (row) => {
      let time = row.dt / 1000;
      let m = Math.floor(time / 60);
      m = m > 10 ? m : "0" + m;
      let s = Math.floor(time) % 60;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    };
    const isShow = computed(() => {
      return store.state.utils.isLike;
    });
    const like = (id) => {
      console.log(id);
      store.commit("utils/setIsLike", id);
      ElMessage({
        message: "已添加到我喜欢的音乐",
        type: "success",
      });
    };
    const stopLike = () => {
      store.commit("utils/setIsLike", "");
      ElMessage({
        message: "取消喜欢成功",
        type: "success",
      });
    };
    // !双击时将歌曲信息传到vuex中
    const player = ref();
    const playSong = (row) => {
      store.commit("music/setSongInfo", row);
      console.log(row.index);
      store.commit("music/setCurrentSongIndex", row.index);
      store.commit(
        "music/setCurrentPlayingSongs",
        store.state.music.allSongsList
      );
      nextTick(() => {
        const { id } = row.id;
        // !获取歌曲播放的url
        getSongInfo({ id: row.id }).then((res) => {
          console.log("歌曲详情", store.state.music.songUrl);
          store.commit("music/setPlayUrl", res.data[0].url);
        });
        getLyric({ id: row.id }).then((res) => {
          console.log(res);
          store.commit("music/setLyric", res.lrc.lyric);
        });
      });
    };
    const tableRowClassName = ({ row, rowIndex }) => {
      // console.log(rowIndex, "rowIndex");
      row.index = rowIndex; //拿到的索引赋值给row的index,在这个表格中能拿到row的里面都会包含index
      return "row-remarks";
    };

    return {
      dailySongList,
      isShow,
      player,
      arFormat,
      like,
      stopLike,
      timeFormat,
      playSong,
      tableRowClassName,
    };
  },
};
</script>
<style lang="less" scoped>
.dailySong {
  margin-bottom: 60px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    width: 100%;
    height: 165px;
    border-bottom: 1px solid #e5e5e5;
    p {
      margin-top: 12px;
    }
  }
}
</style>
