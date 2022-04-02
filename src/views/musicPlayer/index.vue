<template>
  <div class="music-player">
    <audio
      ref="player"
      :src="playUrl"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @pause="onPause"
      @play="onPlay"
    ></audio>
    <!-- <audio-player ref="player"></audio-player> -->
    <div
      class="123"
      v-if="isShow"
      @click="chulaiba"
      style="flex:2"
    >12312</div>
    <div
      class="song-info"
      v-else
    >
      <!-- 封面 -->
      <div class="song-image">
        <!-- 遮罩层 -->
        <div
          class="keep-out"
          @click="keepOutClick"
        >
          <el-icon>
            <arrow-up-bold />
          </el-icon>
        </div>
        <img
          :src="bgImg"
          alt=""
        >
      </div>

      <div class="song-name">
        <p class="songname">{{songName}}</p>
        <p class="username">{{songer}}</p>
      </div>
    </div>

    <div class="player-control">

      <div class="piayer-btn">
        <!-- 上一曲 -->
        <el-button
          circle
          @click="prevn"
        >
          <el-icon>
            <arrow-left-bold />
          </el-icon>
        </el-button>
        <!-- 播放按钮 -->
        <el-button
          size="large"
          circle
          v-if="playing"
          @click="plays"
        >
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-bofang1"></use>
          </svg>
        </el-button>
        <!-- 暂停按钮 -->
        <el-button
          size="large"
          circle
          v-else
          @click="stop"
        >
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </el-button>
        <!-- 下一曲 -->
        <el-button
          circle
          @click="next"
        >
          <el-icon>
            <arrow-right-bold />
          </el-icon>
        </el-button>
        <!-- 歌词 -->
        <div
          class="song-words"
          @click="showWords"
        >词</div>
      </div>
      <!-- 进度条 -->
      <div class="time-progress ">
        <div class="current-time">{{currentTime}}</div>

        <el-slider
          v-model="sliderTime"
          size="small"
          @change="changeCurrentTime"
          :format-tooltip="formatProcessToolTip"
        />

        <div class="total-time">{{totalTime}}</div>
      </div>

    </div>
    <div class="voice-control">
      <div class="play-song-list">
        <el-icon @click="drawer=true">
          <operation />
        </el-icon>
      </div>

    </div>
    <!-- 弹出的当前播放的抽屉 -->
    <div class="playing-drawer">
      <el-drawer
        v-model="drawer"
        size="20%"
      >
        <div class="playing-list">
          <div class="title">
            <p class="words">当前播放</p>
            <span class="count">总32首</span>
          </div>
          <div class="list">
            <ul>
              <li
                v-for="(item,index) in currentPlaying"
                :key="index"
                :class="{'playing': index == currentIndex}"
                @click="nameTest(index,item)"
              >
                <span class="song-name">{{item.name}}</span>
                <span class="user-name">{{item.ar[0].name}}</span>
                <span class="time">03:10</span>
              </li>

            </ul>
          </div>
        </div>
      </el-drawer>
    </div>
    <!-- <div class="lyric">
      {{curretntLyrics}}
    </div> -->

  </div>
</template>
<script>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { formatMusicTime } from "../../utils/format";
import { paesrLyric } from "../../utils/parse-lyric";
import {
  ArrowLeftBold,
  ArrowRightBold,
  CaretRight,
  Operation,
  ArrowUpBold,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { isValidComponentSize } from "element-plus/lib/utils";
import { getSongInfo, getLyric } from "../../api/songs";
// import AudioPlayer from "../../components/audio-player";
import { ElMessage } from "element-plus";
export default {
  components: {
    ArrowLeftBold,
    ArrowRightBold,
    CaretRight,
    Operation,
    ArrowUpBold,
  },
  setup(props) {
    // !操作audio的DOM
    const player = ref();
    const store = useStore();
    // !歌曲的播放地址
    const playUrl = computed(() => {
      return store.state.music.songUrl;
    });
    // !播放的方法
    const plays = () => {
      player.value.play();
    };
    // !暂停方法
    const stop = () => {
      player.value.pause();
      // playing.value = !playing.value;
    };
    // !在播放时
    const onPlay = () => {
      playing.value = false;
      store.commit("music/setIsPlaying", false);
    };
    const onPause = () => {
      playing.value = true;
      store.commit("music/setIsPlaying", true);
    };
    // !是否在播放
    const playing = ref(true);
    // !当前播放的时间
    const currentTime = ref("00:00");
    // !滑块的时间
    const sliderTime = ref(0);
    const lyric = computed(() => {
      return paesrLyric(store.state.music.lyric);
    });
    let lyricInfo = ref("");
    // !当前播放歌曲的当前句歌词
    const curretntLyrics = ref();
    // !当前播放歌曲的歌词的数组下标
    const currentIndexs = ref();
    const onTimeupdate = (res) => {
      // console.log(lyric);
      // !当前播放时间
      currentTime.value = formatMusicTime(res.target.currentTime);
      store.commit("utils/setCurrentTime", res.target.currentTime);
      // !当音频当前时间改变后，进度条也要改变
      sliderTime.value = parseInt(
        (res.target.currentTime / res.target.duration) * 100
      );
      // !歌曲播放后调用下一首的方法
      if (sliderTime.value == 100) {
        next();
      }
      // !处理歌词
      for (let i = 0; i < paesrLyric(store.state.music.lyric).length; i++) {
        const lyricInfo = paesrLyric(store.state.music.lyric)[i];
        // console.log("lyricInfo", lyricInfo.time,);
        // !如果当前歌曲的当前播放时间小于歌词数组里面的时间
        if (res.target.currentTime * 1000 < lyricInfo.time) {
          const currentIndex = i - 1;
          // !console.log(store.state.utils.test, "currentIndex");
          currentIndexs.value = currentIndex;
          // !当前播放歌曲的信息
          const surrentLyricInfo = paesrLyric(store.state.music.lyric)[
            currentIndex
          ];

          // const curretntLyric = surrentLyricInfo.text;
          // console.log(surrentLyricInfo);
          // !当前播放歌曲的当前句歌词
          if (surrentLyricInfo.text) {
            curretntLyrics.value = surrentLyricInfo.text;
          }

          break;
        }
      }
      // !保存当前播放歌曲的当前句歌词
      store.commit("music/setCurretntLyrics", curretntLyrics.value);
      // !保存当前播放歌曲的歌词的数组下标
      store.commit("music/setCurrentIndexs", currentIndexs.value);

      store.commit(
        "utils/setTest",
        `${170 - 35 * (store.state.music.currentIndexs + 1)}px`
      );
    };
    onMounted(() => {});
    // !总时长
    const totalTime = computed(() => {
      return formatMusicTime(store.state.utils.totalTime);
    });
    const onLoadedmetadata = (res) => {
      store.commit("utils/setMusicTotalTime", parseInt(res.target.duration));
      test.value = parseInt(res.target.duration);
    };
    // !拖动滑块时时间改变
    const changeCurrentTime = (index) => {
      player.value.currentTime = parseInt((index / 100) * test.value);
    };

    const formatProcessToolTip = (index = 0) => {
      index = parseInt((test.value / 100) * index);
      return formatMusicTime(index);
    };
    const test = ref();

    // !歌曲名称
    const songName = computed(() => {
      return store.state.music.songInfo.songName;
    });
    // !歌手
    const songer = computed(() => {
      return store.state.music.songInfo.songer;
    });
    // !歌曲封面
    const bgImg = computed(() => {
      return store.state.music.songInfo.bgImg;
    });
    const drawer = ref(false);
    // !当前播放列表
    const currentPlaying = computed(() => {
      return store.state.music.currentPlaying;
    });
    // !弹出来的抽屉的方法
    const nameTest = (index, item) => {
      // console.log(item);
      store.commit("music/setCurrentSongIndex", index);
      index = currentIndex;
      // !设置歌曲信息
      store.commit("music/setSongInfo", item);
      // !设置歌曲URL
      getSongInfo({ id: item.id }).then((res) => {
        store.commit("music/setPlayUrl", res.data[0].url);
      });
      // !获取歌词
      getLyricList();
    };
    const currentIndex = computed(() => {
      return store.state.music.currentSongIndex;
    });
    // !获取歌词
    const getLyricList = () => {
      getLyric({ id: store.state.music.songInfo.songId }).then((res) => {
        console.log(res, "下一曲歌词");
        store.commit("music/setLyric", res.lrc.lyric);
      });
    };
    // !下一曲
    const next = () => {
      // !歌曲下一曲的时候也要调用歌词
      store.commit(
        "music/setCurrentSongIndex",
        store.state.music.currentSongIndex + 1
      );
      nextTick(() => {
        console.log(store.state.music.currentSongIndex);
        getLyricList();
      });
    };
    // !上一曲
    const prevn = () => {
      if (store.state.music.currentSongIndex == 0) {
        return ElMessage.error("已经是第一首啦");
      } else {
        store.commit(
          "music/setCurrentSongIndex",
          store.state.music.currentSongIndex - 1
        );
      }
      nextTick(() => {
        console.log(store.state.music.currentSongIndex);
        getLyricList();
      });
    };
    // !封面遮罩层
    const keepOutClick = () => {
      console.log("点击了封面遮罩层");
      store.commit("utils/setShow", true);
    };
    const isShow = computed(() => {
      return store.state.utils.isShow;
    });
    const chulaiba = () => {
      store.commit("utils/setShow", false);
    };
    // !歌词框的显示

    const showWords = () => {
      // showSongWords.value = !showSongWords.value;
      store.commit("utils/setSongWordsShow", true);
    };
    // !监听播放歌曲url的变化
    watch(
      () => store.state.music.songUrl,
      (val) => {
        plays();
        player.value.autoplay = true;
        sliderTime.value = 0;
        if (playing.value == true) return;
        deep: true;
      }
    );
    watch(
      () => store.state.music.currentSongIndex,
      (val) => {
        console.log(val);
        // !判断是不是最后一首歌
        // !val是当前播放歌曲的index
        if (val == store.state.music.currentPlaying.length) {
          store.commit("music/setCurrentSongIndex", 0);
          store.commit(
            "music/setSongInfo",
            store.state.music.currentPlaying[0]
          );
          getSongInfo({ id: store.state.music.currentPlaying[0].id }).then(
            (res) => {
              store.commit("music/setPlayUrl", res.data[0].url);
            }
          );
        } else {
          store.commit(
            "music/setSongInfo",
            store.state.music.currentPlaying[val]
          );
          getSongInfo({ id: store.state.music.currentPlaying[val].id }).then(
            (res) => {
              store.commit("music/setPlayUrl", res.data[0].url);
            }
          );
        }
      }
    );

    return {
      showWords,
      getLyricList,
      curretntLyrics,
      chulaiba,
      keepOutClick,
      prevn,
      next,
      nameTest,
      player,
      playing,
      isShow,
      plays,
      stop,
      onTimeupdate,
      currentTime,
      totalTime,
      onLoadedmetadata,
      changeCurrentTime,
      sliderTime,
      formatProcessToolTip,
      onPlay,
      onPause,
      drawer,
      test,
      songName,
      songer,
      bgImg,
      playUrl,
      currentPlaying,
      currentIndex,
      lyric,
      lyricInfo,
    };
  },
};
</script>
<style lang="less" scoped>
.music-player {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #dcdfe6;
  height: 100%;
  background-color: #ffffff;
  padding: 3px 5px 0px 5px;
  .song-info {
    position: relative;
    display: flex;
    flex: 1;
    .song-image {
      overflow: hidden;
      margin: 0 10px;
      img {
        width: 50px;
        height: 50px;
        background-size: cover;
        border-radius: 5px;
      }
      .keep-out {
        opacity: 0;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        border-radius: 5px;
        cursor: pointer;
        color: #f4f4f4;
      }
      &:hover .keep-out {
        opacity: 1;
        transition: all 0.5s;
      }
    }
    .song-name {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      p.username {
        font-size: 13px;
      }
    }
  }
  .player-control {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 7;
    flex-flow: column;
    .piayer-btn {
      display: flex;
      align-items: center;
      .icon {
        width: 16px !important;
        height: 16px !important;
      }
      .song-words {
        margin-left: 10px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: #ec4141;
        }
      }
    }
    .time-progress {
      display: flex;
      justify-content: space-around;
      position: relative;
      width: 24%;
      .current-time {
        padding-right: 12px;
      }
      .total-time {
        padding-left: 10px;
      }
    }
  }
  .voice-control {
    flex: 2;
    .play-song-list {
      cursor: pointer;
    }
  }
  .playing-drawer {
    z-index: 99999;
    .playing-list {
      .title {
        padding: 20px 0 20px 20px;
        border-bottom: 1px solid #cfcfcf;
      }
      .title p {
        font-weight: 600;
        margin-bottom: 8px;
      }
      .title span {
        font-size: 13px;
        color: #cfcfcf;
      }
      .list {
        ul {
          li {
            display: flex;
            justify-content: space-around;
            height: 35px;
            line-height: 35px;
            padding-left: 15px;
            &:nth-child(even) {
              background-color: #f9f9f9;
            }
            &:hover {
              background-color: #f4f4f4;
            }
            span {
              font-size: 12px;
            }
            .song-name {
              flex: 6;
            }
            .user-name {
              flex: 3;
            }
            .time {
              flex: 1;
            }
            &.playing {
              background-color: red;
            }
          }
        }
      }
    }
  }
  .lyric {
    position: absolute;
    top: 0;
  }
}
.el-slider /deep/ .el-slider__button {
  width: 13px !important;
  height: 13px !important;
  border: 2px solid #ec4141 !important;
}
.el-slider /deep/ .el-slider__bar {
  background-color: #ec4141 !important;
}
.el-drawer /deep/ .el-drawer__body {
  padding: 0 !important;
}
</style>
