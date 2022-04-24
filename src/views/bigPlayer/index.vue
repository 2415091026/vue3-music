<template>
  <div class="big-player">
    <div class="container">
      <div class="top-player">
        <div class="record">
          <div class="first">
            <div
              class="second"
              :class="{'isZhuang': !isPlaying}"
            >
              <div class="third">
                <div class="four">
                  <img
                    :src="imgUrl"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lyric">
          <div class="title">{{title}}</div>
          <div class="author">{{author}}</div>

          <div class="song-lyric">
            <ul :style="{transform: test}">
              <li
                v-for="(item,index) in lyric"
                :class="{'active': index == currentIndexs,gundong: index == currentIndexs}"
                :key="index"
              >{{item.text}}</li>
            </ul>
          </div>
        </div>
        <div class="source">789</div>
      </div>
      <div
        class="dicuss-player"
        v-if="comments.length > 0"
      >
        <div
          class="title"
          v-show="comments"
        >
          全部评论({{total}})
        </div>
        <div class="dicuss-list">
          <dicuss-lists :comments="comments"></dicuss-lists>
        </div>
      </div>

      <div
        class="load"
        v-else
      >
        <el-icon class="is-loading">
          <loading />
        </el-icon>
        加载中
      </div>

    </div>

  </div>

</template>
<script>
import { useStore } from "vuex";
import { computed, ref, watch, onMounted } from "vue";
import { paesrLyric } from "../../utils/parse-lyric";
import DicussLists from "../../components/dicuss-lists";
import { getSongDiscuss } from "../../api/main";
import { Loading } from "@element-plus/icons-vue";
export default {
  components: {
    DicussLists,
    Loading,
  },
  setup(props) {
    const store = useStore();
    const imgUrl = computed(() => {
      return store.state.music.songInfo.bgImg;
    });
    const isPlaying = computed(() => {
      return store.state.music.isPlaying;
    });
    const title = computed(() => {
      return store.state.music.songInfo.songName;
    });
    const author = computed(() => {
      return store.state.music.songInfo.songer;
    });
    const lyric = computed(() => {
      return paesrLyric(store.state.music.lyric);
    });
    const currentIndex = ref();

    const currentIndexs = computed(() => {
      return store.state.music.currentIndexs;
    });
    const test = computed(() => {
      return `translateY(${store.state.utils.test})`;
    });
    // !歌曲全部评论
    const comments = ref([]);
    const total = ref(0);
    const songId = computed(() => {
      return store.state.music.songInfo.songId;
    });
    const getDicussList = () => {
      getSongDiscuss({ id: store.state.music.songInfo.songId }).then((res) => {
        console.log("歌曲评论", res);
        comments.value = res.comments;
        total.value = res.total;
      });
    };

    onMounted(() => {
      getDicussList();
    });
    watch(
      () => store.state.music.songUrl,
      () => {
        getDicussList();
      }
    );
    return {
      test,
      imgUrl,
      isPlaying,
      title,
      author,
      lyric,
      currentIndex,
      currentIndexs,
      comments,
      total,
      songId,
    };
  },
};
</script>
<style lang="less" scoped>
.big-player {
  width: 100%;
  display: flex;
  flex-flow: column;
  .load {
    position: absolute;
    left: 48%;
  }
  .container {
    width: 80%;
    margin: 0 auto;
    .top-player {
      padding: 40px 20px;
      // width: 80%;
      flex: 4;
      display: flex;
      justify-content: space-around;
      .record {
        flex: 3;
        display: flex;
        justify-content: center;
        .first,
        .second,
        .third,
        .four {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .first {
          width: 370px;
          height: 370px;
          background-color: #e2e2e2;
          .second {
            width: 330px;
            height: 330px;
            background-color: #17181a;
            animation: moveTurn 30s linear infinite;
            animation-fill-mode: forwards;
            animation-play-state: paused;
            &.isZhuang {
              animation-play-state: running;
            }
            .third {
              width: 310px;
              height: 310px;
              background-color: #252527;
              .four {
                width: 260px;
                height: 260px;
                border-radius: 50%;
                background-color: #191a20;
                img {
                  width: 260px;
                  height: 260px;
                  border-radius: 50%;
                }
              }
            }
            @keyframes moveTurn {
              0% {
                transform: rotate(0deg);
              }
              /*25%{transform:rotate(90deg)}
            50%{transform:rotate(180deg)}
            75%{transform:rotate(270deg)}*/
              100% {
                transform: rotate(360deg);
              }
            }
          }
        }
      }
      .lyric {
        flex: 4;
        display: flex;
        flex-flow: column;
        align-items: center;
        .title {
          font-size: 26px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .song-lyric {
          margin-top: 50px;
          width: 80%;
          height: 540px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          ul {
            display: flex;
            flex-flow: column;
            align-items: center;
            transition: all 0.3s;
            li {
              line-height: 45px;
              color: #9a9a9a;
              transition: all 0.3s;
              &.active {
                color: #000;
                font-size: 20px;
                font-weight: 600;
              }
              &.gundong {
                // transform: translateY(50px);
              }
            }
          }
        }
      }
      .source {
        flex: 3;
      }
    }
    .dicuss-player {
      flex: 6;
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      .title {
        width: 40%;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .dicuss-list {
        width: 40%;
      }
    }
  }
}
</style>
