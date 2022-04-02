<template>
  <div>
    <div
      class="music-table"
      v-loading="load"
      element-loading-text="加载中"
    >
      <el-table
        :data="musicList"
        stripe
        style="width: 100%"
        @cell-dblclick="playSong"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          prop="name"
          label="标题"
          width="1020"
        />
        <el-table-column
          prop="ar[0].name"
          label="歌手"
          width="580"
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
      </el-table>
    </div>

  </div>

</template>
<script>
import { useStore } from "vuex";
import { nextTick, onMounted, watch, ref } from "vue";
import { getSongInfo, getLyric } from "../../../api/songs";
export default {
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    // !时长的数据格式化
    const timeFormat = (row) => {
      // !时间戳一般是毫秒,将毫秒转换成秒
      let time = row.dt / 1000;
      let m = Math.floor(time / 60);
      m = m > 10 ? m : "0" + m;
      let s = Math.floor(time) % 60;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    };
    // !双击播放时将歌曲的URL传到vuex中
    const playSong = (row) => {
      store.commit("music/setSongInfo", row);
      console.log(row);
      store.commit("music/setIsPlaying", true);
      store.commit("music/setCurrentSongIndex", row.index);
      store.commit(
        "music/setCurrentPlayingSongs",
        store.state.music.allSongsList
      );
      nextTick(() => {
        // !获取播放链接
        getSongInfo({ id: row.id }).then((res) => {
          console.log("歌曲详情", store.state.music.songUrl);
          store.commit("music/setPlayUrl", res.data[0].url);
        });
        // !获取歌词
        getLyric({ id: row.id }).then((res) => {
          console.log("歌词", res);
          store.commit("music/setLyric", res.lrc.lyric);
        });
      });
    };
    const load = ref(true);
    const tableRowClassName = ({ row, rowIndex }) => {
      // console.log(rowIndex, "rowIndex");
      row.index = rowIndex; //拿到的索引赋值给row的index,在这个表格中能拿到row的里面都会包含index
      return "row-remarks";
    };
    onMounted(() => {
      tableRowClassName;
    });
    watch(
      () => props.musicList,
      (val) => {
        load.value = false;
      }
    );
    return {
      load,
      timeFormat,
      playSong,
      tableRowClassName,
    };
  },
};
</script>
